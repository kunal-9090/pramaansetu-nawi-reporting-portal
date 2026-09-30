import { RolePortal } from '@/components/role-portal'
export default async function LabReviewPage({ params }: { params: Promise<{ caseId: string }> }) { const { caseId } = await params; return <RolePortal requiredRole="Lab Verifier" initialSection="Technical Review" initialCaseId={caseId} /> }
