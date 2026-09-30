import { RolePortal } from '@/components/role-portal'
import { RoleRoute } from '@/components/role-route'
export default function LabReportsPage() { return <RoleRoute role="Lab Verifier"><RolePortal requiredRole="Lab Verifier" initialSection="Reports" /></RoleRoute> }
