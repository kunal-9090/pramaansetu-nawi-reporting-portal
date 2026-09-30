'use client'
import { CompatibilityRedirect } from '@/components/role-route'
export default function ReportsPage() { return <CompatibilityRedirect target={role => role === 'Inspector' ? '/inspector/reports' : role === 'Lab Verifier' ? '/lab/reports' : role === 'Officer' ? '/officer/reports' : '/admin/reports'} /> }
