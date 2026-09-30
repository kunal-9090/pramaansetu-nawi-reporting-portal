import { RolePortal } from '@/components/role-portal'
import { RoleRoute } from '@/components/role-route'
export default function LabQueuePage() { return <RoleRoute role="Lab Verifier"><RolePortal requiredRole="Lab Verifier" initialSection="Lab Queue" /></RoleRoute> }
