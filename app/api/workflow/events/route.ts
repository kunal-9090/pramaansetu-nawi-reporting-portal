import { NextResponse } from 'next/server'
import { getAuditEvents } from '@/lib/workflow-repository'
export async function GET(request: Request) {
  const caseId = new URL(request.url).searchParams.get('caseId') || undefined
  return NextResponse.json(await getAuditEvents(caseId))
}
