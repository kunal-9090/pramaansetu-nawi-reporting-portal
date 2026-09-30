import { RolePortal } from '@/components/role-portal'
import { RoleRoute } from '@/components/role-route'
export default function InspectorCreatePage() { return <RoleRoute role="Inspector"><RolePortal requiredRole="Inspector" initialSection="Create Case" /></RoleRoute> }
