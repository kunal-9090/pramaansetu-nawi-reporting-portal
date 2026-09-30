import { NextResponse } from 'next/server'
import { getAuditEvents, getCaseById, updateCase } from '@/lib/workflow-repository'

export async function GET(_: Request, { params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params
  const item = await getCaseById(caseId)
  if (!item) return NextResponse.json({ error: 'Case not found' }, { status: 404 })
  return NextResponse.json({ ...item, events: await getAuditEvents(caseId) })
}
export async function PATCH(request: Request, { params }: { params: Promise<{ caseId: string }> }) {
  const { caseId } = await params
  return NextResponse.json(await updateCase(caseId, await request.json()))
}
