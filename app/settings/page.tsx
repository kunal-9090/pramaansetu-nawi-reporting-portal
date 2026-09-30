'use client'
import { CompatibilityRedirect } from '@/components/role-route'
export default function SettingsPage() { return <CompatibilityRedirect target={role => role === 'Inspector' ? '/inspector' : role === 'Lab Verifier' ? '/lab' : role === 'Officer' ? '/officer' : '/admin'} /> }
