'use client'
import { CompatibilityRedirect } from '@/components/role-route'
export default function AuditPage() { return <CompatibilityRedirect target={role => role === 'Inspector' ? '/inspector/audit' : role === 'Lab Verifier' ? '/lab/audit' : role === 'Officer' ? '/officer/audit' : '/admin/audit'} /> }
