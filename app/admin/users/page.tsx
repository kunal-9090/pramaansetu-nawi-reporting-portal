import { RolePortal } from '@/components/role-portal'
import { RoleRoute } from '@/components/role-route'
export default function AdminUsersPage() { return <RoleRoute role="Admin"><RolePortal requiredRole="Admin" initialSection="Users & Roles" /></RoleRoute> }
