import { RolePortal } from '@/components/role-portal'
import { RoleRoute } from '@/components/role-route'
export default function AdminCasesPage() { return <RoleRoute role="Admin"><RolePortal requiredRole="Admin" initialSection="All Cases" /></RoleRoute> }
