import { RolePortal } from '@/components/role-portal'
import { RoleRoute } from '@/components/role-route'
export default function AdminSystemPage() { return <RoleRoute role="Admin"><RolePortal requiredRole="Admin" initialSection="System" /></RoleRoute> }
