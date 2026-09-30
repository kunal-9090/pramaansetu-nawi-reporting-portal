import { NextResponse } from 'next/server'
import { createCase, getAllCases } from '@/lib/workflow-repository'

export async function GET() { return NextResponse.json(await getAllCases()) }
export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json(await createCase(body, body.actor || { role: 'Inspector', name: 'Ananya Sharma' }), { status: 201 })
}
