'use client'
import { CompatibilityRedirect } from '@/components/role-route'
export default function CreateCasePage() { return <CompatibilityRedirect target={role => role === 'Inspector' ? '/inspector/create' : role === 'Lab Verifier' ? '/lab' : role === 'Officer' ? '/officer' : '/admin'} /> }
