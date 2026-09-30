import { RolePortal } from '@/components/role-portal'
import { RoleRoute } from '@/components/role-route'
export default function OfficerReportsPage() { return <RoleRoute role="Officer"><RolePortal requiredRole="Officer" initialSection="Reports" /></RoleRoute> }
