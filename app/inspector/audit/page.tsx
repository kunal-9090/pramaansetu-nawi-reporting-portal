import { RolePortal } from '@/components/role-portal'
import { RoleRoute } from '@/components/role-route'
export default function InspectorAuditPage() { return <RoleRoute role="Inspector"><RolePortal requiredRole="Inspector" initialSection="Audit Trail" /></RoleRoute> }
