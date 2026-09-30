import { RolePortal } from '@/components/role-portal'
import { RoleRoute } from '@/components/role-route'
export default function OfficerQueuePage() { return <RoleRoute role="Officer"><RolePortal requiredRole="Officer" initialSection="Officer Queue" /></RoleRoute> }
