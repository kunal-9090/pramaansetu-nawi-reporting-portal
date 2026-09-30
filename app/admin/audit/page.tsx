import { RolePortal } from '@/components/role-portal'
import { RoleRoute } from '@/components/role-route'
export default function AdminAuditPage() { return <RoleRoute role="Admin"><RolePortal requiredRole="Admin" initialSection="Audit Trail" /></RoleRoute> }
