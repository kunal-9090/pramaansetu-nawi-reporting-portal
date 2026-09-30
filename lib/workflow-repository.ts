import { Pool, type PoolClient } from 'pg'

const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL || process.env.NEON_DATABASE_URL
export function assertDatabaseConfigured() {
  if (!databaseUrl) throw new Error('DATABASE_URL is missing in Vercel environment variables.')
}
const pool = new Pool({ connectionString: databaseUrl, max: 5, idleTimeoutMillis: 10_000 })

export type WorkflowActor = { role: string; name: string }
export type WorkflowCaseRow = Record<string, unknown> & { case_id: string; current_status: string; current_owner_role: string }
export type WorkflowEventRow = Record<string, unknown> & { case_id: string }

function normalizeCase(row: WorkflowCaseRow) {
  return {
    id: row.case_id,
    instrument: row.instrument_type,
    location: row.inspection_location,
    inspector: row.inspector_name,
    ownerRole: row.current_owner_role,
    status: row.current_status,
    evidenceComplete: row.evidence_status === 'COMPLETE',
    evidenceStatus: row.evidence_status,
    trustgateReady: row.trustgate_readiness,
    trustgateResult: row.trustgate_result,
    reportUnlocked: row.report_unlocked,
    reportGenerated: row.report_generated,
    reportId: row.report_id,
    officerDecision: row.officer_decision,
    labReviewStatus: row.lab_review_status,
    reportStatus: row.report_status,
    remarks: row.metadata && typeof row.metadata === 'object' ? (row.metadata as Record<string, unknown>).remarks ?? 'No remarks recorded.' : 'No remarks recorded.',
    updatedAt: row.updated_at,
    manufacturer: row.manufacturer,
    model: row.model,
    serialNumber: row.serial_number,
    accuracyClass: row.accuracy_class,
    maximumCapacity: row.max_capacity,
    minimumCapacity: row.min_capacity,
    verificationScaleInterval: row.verification_scale_interval,
    inspectionDate: row.inspection_date,
    testLocation: row.inspection_location,
    purpose: row.purpose,
    metadata: row.metadata,
  }
}

export async function getAllCases() {
  assertDatabaseConfigured()
  const result = await pool.query<WorkflowCaseRow>('SELECT * FROM workflow_cases ORDER BY updated_at DESC')
  return result.rows.map(normalizeCase)
}

export async function getCaseById(caseId: string) {
  assertDatabaseConfigured()
  const result = await pool.query<WorkflowCaseRow>('SELECT * FROM workflow_cases WHERE case_id = $1 LIMIT 1', [caseId])
  return result.rows[0] ? normalizeCase(result.rows[0]) : null
}

export async function createCase(payload: Record<string, unknown>, actor: WorkflowActor) {
  const caseId = String(payload.id || payload.caseId || `TG-2026-${Math.floor(1000 + Math.random() * 8999)}`)
  const result = await pool.query<WorkflowCaseRow>(`INSERT INTO workflow_cases (case_id, instrument_type, manufacturer, model, serial_number, accuracy_class, max_capacity, min_capacity, verification_scale_interval, district, inspection_location, inspection_date, purpose, current_status, current_owner_role, inspector_name, evidence_status, metadata) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,'DRAFT','Inspector',$14,'INCOMPLETE',$15::jsonb) ON CONFLICT (case_id) DO UPDATE SET metadata = workflow_cases.metadata || EXCLUDED.metadata, updated_at = now() RETURNING *`, [caseId, payload.instrument || payload.instrumentType || 'NAWI instrument', payload.manufacturer || null, payload.model || null, payload.serialNumber || null, payload.accuracyClass || null, payload.maximumCapacity || payload.maxCapacity || null, payload.minimumCapacity || payload.minCapacity || null, payload.verificationScaleInterval || null, payload.district || payload.location || 'Bhubaneswar', payload.testLocation || payload.location || 'Bhubaneswar', payload.inspectionDate || null, payload.purpose || null, actor.name, JSON.stringify(payload)])
  await createAuditEvent({ caseId, actor, action: 'Inspector saved draft case', toStatus: 'DRAFT', metadata: payload })
  return normalizeCase(result.rows[0])
}

export async function updateCase(caseId: string, patch: Record<string, unknown>) {
  const result = await pool.query<WorkflowCaseRow>('UPDATE workflow_cases SET metadata = metadata || $2::jsonb, updated_at = now() WHERE case_id = $1 RETURNING *', [caseId, JSON.stringify(patch)])
  if (!result.rows[0]) throw new Error('Case not found')
  return normalizeCase(result.rows[0])
}

export async function createAuditEvent(input: { caseId: string; actor: WorkflowActor; action: string; fromStatus?: string; toStatus?: string; remarks?: string; metadata?: unknown }) {
  const result = await pool.query<WorkflowEventRow>('INSERT INTO workflow_events (case_id, actor_name, actor_role, action, from_status, to_status, remarks, metadata) VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb) RETURNING *', [input.caseId, input.actor.name, input.actor.role, input.action, input.fromStatus || null, input.toStatus || null, input.remarks || null, JSON.stringify(input.metadata || {})])
  return result.rows[0]
}

export async function getAuditEvents(caseId?: string) {
  assertDatabaseConfigured()
  const result = caseId ? await pool.query<WorkflowEventRow>('SELECT * FROM workflow_events WHERE case_id = $1 ORDER BY created_at DESC', [caseId]) : await pool.query<WorkflowEventRow>('SELECT * FROM workflow_events ORDER BY created_at DESC')
  return result.rows.map(row => ({ id: row.id, caseId: row.case_id, actorName: row.actor_name, actorRole: row.actor_role, action: row.action, fromStatus: row.from_status, toStatus: row.to_status, remarks: row.remarks, metadata: row.metadata, createdAt: row.created_at }))
}

export async function updateCaseStatus(caseId: string, toStatus: string, actor: WorkflowActor, options: { ownerRole?: string; action: string; remarks?: string; metadata?: unknown; reportGenerated?: boolean; reportUnlocked?: boolean; evidenceComplete?: boolean; trustgateReady?: number; trustgateResult?: string } ) {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const current = await client.query<WorkflowCaseRow>('SELECT * FROM workflow_cases WHERE case_id = $1 FOR UPDATE', [caseId])
    if (!current.rows[0]) throw new Error('Case not found')
    const fromStatus = current.rows[0].current_status
    const result = await client.query<WorkflowCaseRow>(`UPDATE workflow_cases SET current_status = $2, current_owner_role = COALESCE($3, current_owner_role), report_generated = COALESCE($4, report_generated), report_unlocked = COALESCE($5, report_unlocked), evidence_status = CASE WHEN $6::boolean IS NULL THEN evidence_status WHEN $6::boolean THEN 'COMPLETE' ELSE 'INCOMPLETE' END, trustgate_readiness = COALESCE($7, trustgate_readiness), trustgate_result = COALESCE($8, trustgate_result), officer_decision = CASE WHEN $2 = 'APPROVED' THEN 'Approved' ELSE officer_decision END, report_status = CASE WHEN $2 = 'REPORT_GENERATED' THEN 'REPORT_GENERATED' ELSE report_status END, report_id = CASE WHEN $2 = 'REPORT_GENERATED' THEN COALESCE(report_id, 'RPT-' || case_id) ELSE report_id END, updated_at = now() WHERE case_id = $1 RETURNING *`, [caseId, toStatus, options.ownerRole || null, options.reportGenerated ?? null, options.reportUnlocked ?? null, options.evidenceComplete ?? null, options.trustgateReady ?? null, options.trustgateResult || null])
    await client.query('INSERT INTO workflow_events (case_id, actor_name, actor_role, action, from_status, to_status, remarks, metadata) VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb)', [caseId, actor.name, actor.role, options.action, fromStatus, toStatus, options.remarks || null, JSON.stringify(options.metadata || {})])
    await client.query('COMMIT')
    return normalizeCase(result.rows[0])
  } catch (error) { await client.query('ROLLBACK'); throw error } finally { client.release() }
}

export async function resetDemoData() {
  await pool.query('DELETE FROM workflow_events')
  await pool.query('DELETE FROM workflow_cases')
  const seeds = [
    ['TG-2026-DEMO','Retail weighing scale','Bhubaneswar','Ananya Sharma','DRAFT','Inspector'],
    ['TG-2026-0040','Retail weighing scale','Cuttack','Rahul Das','NEEDS_EVIDENCE','Inspector'],
    ['TG-2026-0039','Table-top scale','Rourkela','Maya Behera','LAB_REVIEW_IN_PROGRESS','Lab Verifier'],
    ['TG-2026-0038','Platform scale','Sambalpur','Arjun Patnaik','SENT_BACK_TO_INSPECTOR','Inspector'],
    ['TG-2026-0037','Retail scale','Puri','Ananya Sharma','APPROVED','Officer'],
    ['TG-2026-0036','Bench scale','Berhampur','Ananya Sharma','REPORT_GENERATED','Officer'],
  ]
  for (const [caseId, instrument, district, inspector, status, ownerRole] of seeds) {
    await pool.query('INSERT INTO workflow_cases (case_id, instrument_type, district, inspection_location, inspector_name, current_status, current_owner_role, metadata, evidence_status, trustgate_readiness, report_generated, report_unlocked) VALUES ($1,$2,$3,$3,$4,$5,$6,$7::jsonb,$8,$9,$10,$10)', [caseId, instrument, district, inspector, status, ownerRole, JSON.stringify({ seeded: true }), status === 'DRAFT' ? 'INCOMPLETE' : 'COMPLETE', status === 'REPORT_GENERATED' || status === 'APPROVED' ? 96 : 58, status === 'REPORT_GENERATED'])
    await createAuditEvent({ caseId, actor: { role: 'Admin', name: 'System' }, action: 'Demo case seeded', toStatus: status })
  }
  return getAllCases()
}

export { pool }
