import { RolePortal } from '@/components/role-portal'
import { RoleRoute } from '@/components/role-route'
export default function OfficerAuditPage() { return <RoleRoute role="Officer"><RolePortal requiredRole="Officer" initialSection="Audit Trail" /></RoleRoute> }
