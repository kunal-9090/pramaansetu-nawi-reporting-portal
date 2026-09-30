import { RolePortal } from '@/components/role-portal'
import { RoleRoute } from '@/components/role-route'
export default function LabAuditPage() { return <RoleRoute role="Lab Verifier"><RolePortal requiredRole="Lab Verifier" initialSection="Audit Trail" /></RoleRoute> }
