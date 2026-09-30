'use client'
import { CompatibilityRedirect } from '@/components/role-route'
export default function InspectionCasesPage() { return <CompatibilityRedirect target={role => role === 'Inspector' ? '/inspector/cases' : role === 'Lab Verifier' ? '/lab/queue' : role === 'Officer' ? '/officer/queue' : '/admin/cases'} /> }
