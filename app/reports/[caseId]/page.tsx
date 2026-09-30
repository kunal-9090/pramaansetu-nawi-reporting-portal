'use client'
import { use } from 'react'
import { CompatibilityRedirect } from '@/components/role-route'
export default function ReportPage({ params }: { params: Promise<{ caseId: string }> }) { const { caseId } = use(params); return <CompatibilityRedirect target={role => role === 'Inspector' ? `/inspector/reports?caseId=${encodeURIComponent(caseId)}` : role === 'Lab Verifier' ? `/lab/reports?caseId=${encodeURIComponent(caseId)}` : role === 'Officer' ? `/officer/reports?caseId=${encodeURIComponent(caseId)}` : `/admin/reports?caseId=${encodeURIComponent(caseId)}`} /> }
