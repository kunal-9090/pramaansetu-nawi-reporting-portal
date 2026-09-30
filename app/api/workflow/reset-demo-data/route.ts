import { NextResponse } from 'next/server'
import { resetDemoData } from '@/lib/workflow-repository'
export async function POST() { return NextResponse.json(await resetDemoData()) }
