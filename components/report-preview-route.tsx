'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Activity, Bell, FileCheck2, Gauge, LayoutDashboard, Search, ShieldCheck } from 'lucide-react'
import { DynamicReportPreview as ReportPreview } from '@/components/dynamic-report-preview'
import { InspectorWorkspace } from './inspector-workspace'

type ReportCase = { id?: string; status: string; reportGenerated: boolean; reportUnlocked: boolean; ownerRole?: string; reportId?: string; updatedAt?: string; events?: unknown[] }

export default function ReportPreviewRoute() {
  const { caseId } = useParams<{ caseId: string }>()
  const [item, setItem] = useState<ReportCase | null>(null)
  const [events, setEvents] = useState<unknown[]>([])
  const [error, setError] = useState('')
  const [role, setRole] = useState('Inspector')

  const reload = async () => {
    const response = await fetch(`/api/workflow/cases/${encodeURIComponent(caseId)}`, { cache: 'no-store' })
    if (!response.ok) throw new Error('Report case could not be loaded.')
    const data = await response.json()
    setItem(data)
    setEvents((data.events || []).map((event: any) => ({ ...event, timestamp: event.timestamp || event.createdAt || event.created_at || event.created_at_timestamp })))
  }

  useEffect(() => { const saved = window.localStorage.getItem('trustgate-selected-role'); if (['Inspector', 'Lab Verifier', 'Officer', 'Admin'].includes(saved || '')) setRole(saved as string); reload().catch(error => setError(error.message)) }, [caseId])

  const shell = (content: React.ReactNode) => <div className="app-shell report-app-shell"><aside className="sidebar"><div className="brand-row"><div className="brand-mark"><Gauge size={20}/></div><div><div className="brand-name">PramaanSetu</div><div className="brand-subtitle">NAWI Reporting Portal</div></div></div><div className="department-chip"><div className="ashoka-mark"><ShieldCheck size={14}/></div><div><strong>Legal Metrology</strong><span>Department of Consumer Affairs</span></div></div><nav className="nav-area" aria-label="Primary navigation"><div className="nav-group"><div className="nav-label">Workspace</div><a className="nav-item" href="/dashboard"><LayoutDashboard size={16}/>Dashboard</a><a className="nav-item" href="/dashboard?step=Inspection%20Cases"><FileCheck2 size={16}/>Inspection Cases</a><a className="nav-item active" href={`/reports/${caseId}`}><FileCheck2 size={16}/>Reports</a><a className="nav-item" href={`/audit?caseId=${caseId}`}><Activity size={16}/>Audit Trail</a></div></nav></aside><div className="main-content"><header className="topbar"><div className="breadcrumbs"><span>PramaanSetu</span><strong>›</strong><strong>Reports</strong></div><div className="topbar-actions"><button className="icon-button" aria-label="Search unavailable" disabled><Search size={17}/></button><button className="icon-button" aria-label="Notifications"><Bell size={17}/></button><span className="role-pill">{role}</span></div></header>{content}</div></div>

  if (role === 'Inspector') return <InspectorWorkspace initialSection="report" initialCaseId={caseId} />
  if (error) return shell(<main className="report-route-shell"><div className="validation" role="alert">{error}</div></main>)
  if (!item) return shell(<main className="report-route-shell" aria-busy="true" />)

  const approved = ['APPROVED', 'REPORT_GENERATED', 'CLOSED'].includes(item.status)
  return shell(<main className="report-route-shell">
    <ReportPreview role={role as 'Inspector' | 'Lab Verifier' | 'Officer' | 'Admin'} caseId={caseId} generated={item.reportGenerated} approved={approved} serverCase={item as never} serverEvents={events as never[]} onGenerate={async () => {
      if (role !== 'Officer' || !item || item.status !== 'APPROVED' || item.reportGenerated) throw new Error('Only an Officer can generate a report after approval.'); const response = await fetch(`/api/workflow/cases/${encodeURIComponent(caseId)}/generate-report`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ actor: { role: 'Officer', name: 'Officer' } }) })
      if (!response.ok) throw new Error((await response.json()).error || 'Report generation failed.')
      await reload()
    }} />
  </main>)
}
