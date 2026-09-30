'use client'
import { use } from 'react'
import { CompatibilityRedirect } from '@/components/role-route'
export default function CasePage({ params }: { params: Promise<{ caseId: string }> }) { const { caseId } = use(params); return <CompatibilityRedirect target={role => role === 'Inspector' ? `/inspector/cases/${caseId}` : role === 'Lab Verifier' ? `/lab/review/${caseId}` : role === 'Officer' ? `/officer/review/${caseId}` : `/admin/cases?caseId=${encodeURIComponent(caseId)}`} /> }
