import { RolePortal } from '@/components/role-portal'
export default async function InspectorCasePage({ params }: { params: Promise<{ caseId: string }> }) { const { caseId } = await params; return <RolePortal requiredRole="Inspector" initialSection="Case Workflow" initialCaseId={caseId} /> }
