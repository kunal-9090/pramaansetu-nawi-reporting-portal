import { RolePortal } from '@/components/role-portal'
import { RoleRoute } from '@/components/role-route'
export default function AdminReportsPage() { return <RoleRoute role="Admin"><RolePortal requiredRole="Admin" initialSection="Reports" /></RoleRoute> }
