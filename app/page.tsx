'use client'

import { useEffect, useState } from 'react'
import { DemoLogin, getSession } from '@/components/demo-login'

export default function Page() { const [ready, setReady] = useState(false); useEffect(() => { const session = getSession(); if (session?.loggedIn) { window.location.href = session.role === 'Inspector' ? '/inspector' : session.role === 'Lab Verifier' ? '/lab' : session.role === 'Officer' ? '/officer' : '/admin' } else setReady(true) }, []); return ready ? <DemoLogin /> : <main className="login-page" aria-busy="true" /> }
