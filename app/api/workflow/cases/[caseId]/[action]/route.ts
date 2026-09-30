import { NextResponse } from 'next/server'
import { getCaseById, updateCaseStatus, type WorkflowActor } from '@/lib/workflow-repository'

const actions: Record<string, { status: string; role?: string; ownerRole?: string; report?: boolean; label: string; from?: string[]; evidenceRequired?: boolean }> = {
  'complete-passport': { status: 'IDENTITY_COMPLETED', label: 'NAWI Passport completed by Inspector', from: ['DRAFT'] },
  'complete-test-setup': { status: 'TEST_SETUP_COMPLETED', label: 'Test setup completed by Inspector', from: ['IDENTITY_COMPLETED'] },
  'open-evidence': { status: 'EVIDENCE_CAPTURE_IN_PROGRESS', label: 'Evidence capture opened by Inspector', from: ['TEST_SETUP_COMPLETED', 'NEEDS_EVIDENCE', 'SENT_BACK_TO_INSPECTOR'] },
  'capture-evidence': { status: 'EVIDENCE_COMPLETED', label: 'Evidence captured by Inspector', from: ['EVIDENCE_CAPTURE_IN_PROGRESS'] },
  'run-trustgate': { status: 'TRUSTGATE_PASSED', label: 'TrustGate validation passed', from: ['EVIDENCE_COMPLETED'], evidenceRequired: true },
  'submit-to-lab': { status: 'SUBMITTED_TO_LAB', ownerRole: 'Lab Verifier', label: 'Inspector submitted case to Lab Verifier', from: ['TRUSTGATE_PASSED'] },
  'start-lab-review': { status: 'LAB_REVIEW_IN_PROGRESS', label: 'Lab Verifier started technical review', from: ['SUBMITTED_TO_LAB'] },
  'send-back-to-inspector': { status: 'SENT_BACK_TO_INSPECTOR', ownerRole: 'Inspector', label: 'Case sent back to Inspector', from: ['LAB_REVIEW_IN_PROGRESS', 'OFFICER_REVIEW_PENDING', 'OFFICER_REVIEW_IN_PROGRESS'], evidenceRequired: false },
  'recommend-retest': { status: 'LAB_RETEST_RECOMMENDED', ownerRole: 'Officer', label: 'Lab Verifier recommended a retest', from: ['LAB_REVIEW_IN_PROGRESS'], evidenceRequired: false },
  'forward-to-officer': { status: 'OFFICER_REVIEW_PENDING', ownerRole: 'Officer', label: 'Lab Verifier forwarded case to Officer', from: ['LAB_REVIEW_IN_PROGRESS'] },
  'start-officer-review': { status: 'OFFICER_REVIEW_IN_PROGRESS', label: 'Officer started review', from: ['OFFICER_REVIEW_PENDING'] },
  approve: { status: 'APPROVED', label: 'Officer approved case', from: ['OFFICER_REVIEW_IN_PROGRESS'] },
  'generate-report': { status: 'REPORT_GENERATED', report: true, label: 'Final report generated', from: ['APPROVED'] },
  'request-retest': { status: 'RETEST_REQUESTED', ownerRole: 'Inspector', label: 'Officer requested retest', from: ['OFFICER_REVIEW_IN_PROGRESS'] },
  'mark-potential-non-compliance': { status: 'POTENTIAL_NON_COMPLIANCE', ownerRole: 'Officer', label: 'Officer marked potential non-compliance', from: ['OFFICER_REVIEW_IN_PROGRESS'] },
  close: { status: 'CLOSED', label: 'Officer closed case', from: ['APPROVED', 'REPORT_GENERATED'] },
}

export async function POST(request: Request, { params }: { params: Promise<{ caseId: string; action: string }> }) {
  const { caseId, action } = await params
  const config = actions[action]
  if (!config) return NextResponse.json({ error: 'Unknown workflow action' }, { status: 404 })
  const body = await request.json().catch(() => ({}))
  const actor: WorkflowActor = body.actor || { role: config.ownerRole === 'Officer' ? 'Lab Verifier' : config.ownerRole || 'Inspector', name: config.ownerRole === 'Officer' ? 'R. Das' : 'Ananya Sharma' }
  const item = await getCaseById(caseId)
  if (!item) return NextResponse.json({ error: 'Case not found' }, { status: 404 })
  if (config.from && !config.from.includes(item.status)) return NextResponse.json({ error: `Invalid transition from ${item.status}` }, { status: 409 })
  if (config.evidenceRequired && !item.evidenceComplete) return NextResponse.json({ error: 'Evidence must be complete' }, { status: 409 })
  if (action === 'generate-report' && item.status !== 'APPROVED') return NextResponse.json({ error: 'Case must be approved' }, { status: 409 })
  return NextResponse.json(await updateCaseStatus(caseId, config.status, actor, { ownerRole: config.ownerRole, action: config.label, remarks: String(body.remarks || ''), reportGenerated: config.report, reportUnlocked: action === 'approve' ? true : undefined, evidenceComplete: action === 'capture-evidence' ? true : undefined, trustgateReady: action === 'run-trustgate' ? 96 : undefined, trustgateResult: action === 'run-trustgate' ? 'Ready for Lab Verification' : undefined, metadata: body }))
}
