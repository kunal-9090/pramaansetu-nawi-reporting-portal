import { RolePortal } from '@/components/role-portal'
export default async function OfficerReviewPage({ params }: { params: Promise<{ caseId: string }> }) { const { caseId } = await params; return <RolePortal requiredRole="Officer" initialSection="Review & Decision" initialCaseId={caseId} /> }
