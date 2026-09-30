import { RolePortal } from '@/components/role-portal'
import { RoleRoute } from '@/components/role-route'
export default function InspectorReportsPage() { return <RoleRoute role="Inspector"><RolePortal requiredRole="Inspector" initialSection="Reports" /></RoleRoute> }
