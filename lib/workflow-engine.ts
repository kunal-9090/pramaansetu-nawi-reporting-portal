export type WorkflowRole = 'Inspector' | 'Lab Verifier' | 'Officer' | 'Admin'
export type CaseStatus = 'DRAFT' | 'IDENTITY_IN_PROGRESS' | 'IDENTITY_COMPLETED' | 'TEST_SETUP_IN_PROGRESS' | 'TEST_SETUP_COMPLETED' | 'EVIDENCE_CAPTURE_IN_PROGRESS' | 'EVIDENCE_COMPLETED' | 'TRUSTGATE_CHECK_PENDING' | 'TRUSTGATE_PASSED' | 'NEEDS_EVIDENCE' | 'SUBMITTED_TO_LAB' | 'LAB_REVIEW_IN_PROGRESS' | 'LAB_RETEST_RECOMMENDED' | 'LAB_APPROVED_FOR_OFFICER' | 'SENT_BACK_TO_INSPECTOR' | 'OFFICER_REVIEW_PENDING' | 'OFFICER_REVIEW_IN_PROGRESS' | 'APPROVED' | 'POTENTIAL_NON_COMPLIANCE' | 'RETEST_REQUESTED' | 'REPORT_GENERATED' | 'CLOSED'
export type WorkflowCase = { id:string; instrument:string; location:string; inspector:string; ownerRole:WorkflowRole; status:CaseStatus; evidenceComplete:boolean; evidenceStatus:'INCOMPLETE'|'COMPLETE'; trustgateReady:number; trustgateResult:string; reportUnlocked:boolean; reportGenerated:boolean; reportId?:string; officerDecision?:string; labReviewStatus?:string; reportStatus?:string; remarks:string; updatedAt:string; manufacturer?:string; model?:string; serialNumber?:string; accuracyClass?:string; maximumCapacity?:string; minimumCapacity?:string; verificationScaleInterval?:string; inspectionDate?:string; testLocation?:string; environmentalNotes?:string; testMassReference?:string; oimlRule?:string; selectedChecks?:string; readingsSummary?:string; calculationSummary?:string }
export type AuditEvent = { id:string; caseId:string; actorName:string; actorRole:WorkflowRole; action:string; fromStatus?:CaseStatus; toStatus?:CaseStatus; remarks?:string; timestamp:string }
export type Notification = { id:string; caseId:string; targetRole:WorkflowRole; title:string; message:string; type:'info'|'warning'|'success'|'danger'; read:boolean; createdAt:string; actionLink:string }
export const workflowStatusLabel = (status?: string) => status ? status.replaceAll('_',' ').toLowerCase().replace(/(^| )\w/g, letter => letter.toUpperCase()) : 'Not recorded'
export const workflowRoleForStatus = (status: string): WorkflowRole => status.startsWith('LAB_') || status === 'SUBMITTED_TO_LAB' ? 'Lab Verifier' : status.includes('OFFICER') || ['APPROVED','REPORT_GENERATED','POTENTIAL_NON_COMPLIANCE','RETEST_REQUESTED','CLOSED'].includes(status) ? 'Officer' : 'Inspector'
export const isRoleAllowed = (role: WorkflowRole, status: string) => role === 'Admin' || workflowRoleForStatus(status) === role
export const labQueueStatuses: CaseStatus[] = ['SUBMITTED_TO_LAB','LAB_REVIEW_IN_PROGRESS','LAB_RETEST_RECOMMENDED']
export const officerQueueStatuses: CaseStatus[] = ['OFFICER_REVIEW_PENDING','OFFICER_REVIEW_IN_PROGRESS','APPROVED','REPORT_GENERATED','POTENTIAL_NON_COMPLIANCE','RETEST_REQUESTED','LAB_RETEST_RECOMMENDED']
export const reportStatuses: CaseStatus[] = ['APPROVED','REPORT_GENERATED']
export const auditActionGroups = { evidence: ['Evidence','TrustGate','Test'], lab: ['Lab','Forward','Retest'], officer: ['Officer','Approved','Non-Compliance','Sent Back'], report: ['Report','Generated'] } as const
export const workflowRoles: WorkflowRole[] = ['Inspector','Lab Verifier','Officer','Admin']
export const workflowStatuses: CaseStatus[] = ['DRAFT','IDENTITY_IN_PROGRESS','IDENTITY_COMPLETED','TEST_SETUP_IN_PROGRESS','TEST_SETUP_COMPLETED','EVIDENCE_CAPTURE_IN_PROGRESS','EVIDENCE_COMPLETED','TRUSTGATE_CHECK_PENDING','TRUSTGATE_PASSED','NEEDS_EVIDENCE','SUBMITTED_TO_LAB','LAB_REVIEW_IN_PROGRESS','LAB_RETEST_RECOMMENDED','LAB_APPROVED_FOR_OFFICER','SENT_BACK_TO_INSPECTOR','OFFICER_REVIEW_PENDING','OFFICER_REVIEW_IN_PROGRESS','APPROVED','POTENTIAL_NON_COMPLIANCE','RETEST_REQUESTED','REPORT_GENERATED','CLOSED']
export const canGenerateReport = (role: WorkflowRole, status: string, generated: boolean) => role === 'Officer' && status === 'APPROVED' && !generated
export const canViewReport = (status: string, generated: boolean) => generated || status === 'REPORT_GENERATED'
export const roleRoute = (role: WorkflowRole) => role === 'Inspector' ? '/inspector' : role === 'Lab Verifier' ? '/lab' : role === 'Officer' ? '/officer' : '/admin'
export const isClosedStatus = (status: string) => status === 'CLOSED'
export const isReviewStatus = (status: string) => status.includes('REVIEW')
export const isReturnedStatus = (status: string) => ['SENT_BACK_TO_INSPECTOR','LAB_RETEST_RECOMMENDED','RETEST_REQUESTED','POTENTIAL_NON_COMPLIANCE'].includes(status)
export const isWorkflowStatus = (value: string): value is CaseStatus => workflowStatuses.includes(value as CaseStatus)
export const isWorkflowRole = (value: string): value is WorkflowRole => workflowRoles.includes(value as WorkflowRole)
export const getCasesForRole = (cases: WorkflowCase[], role: WorkflowRole) => role === 'Admin' ? cases : cases.filter(item => item.ownerRole === role)
export const getReportsForCases = (cases: WorkflowCase[]) => cases.filter(item => canViewReport(item.status, item.reportGenerated))
export const getAuditEventsForCase = (events: AuditEvent[], caseId?: string) => events.filter(item => !caseId || item.caseId === caseId).sort((a,b) => b.timestamp.localeCompare(a.timestamp))
export const getDashboardStats = (cases: WorkflowCase[]) => ({ total: cases.length, open: cases.filter(item => !['REPORT_GENERATED','CLOSED'].includes(item.status)).length, approved: cases.filter(item => item.status === 'APPROVED').length, reports: cases.filter(item => item.reportGenerated).length })
export const workflowStorageKey = 'neon-workflow-repository'
export const statusLabel = workflowStatusLabel
export const roleForStatus = workflowRoleForStatus
export const canAccessRole = isRoleAllowed
export const isReportReady = canViewReport
export const isReportGenerationAllowed = canGenerateReport
export const getReports = getReportsForCases
export const getAuditTrail = getAuditEventsForCase
export const getCases = getCasesForRole
export const getCase = (cases: WorkflowCase[], caseId: string) => cases.find(item => item.id === caseId)
