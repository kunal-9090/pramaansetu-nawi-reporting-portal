'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { getSession } from './demo-login'

type Role = 'Inspector' | 'Lab Verifier' | 'Officer' | 'Admin'
const roleRoute: Record<Role, string> = { Inspector: '/inspector', 'Lab Verifier': '/lab', Officer: '/officer', Admin: '/admin' }

export function RoleRoute({ role, children }: { role: Role; children: ReactNode }) {
  const [allowed, setAllowed] = useState(false)
  useEffect(() => {
    const session = getSession()
    if (!session) { window.location.replace('/'); return }
    if (session.role !== role) { window.location.replace(roleRoute[session.role as Role] || '/'); return }
    setAllowed(true)
  }, [role])
  if (!allowed) return <main className="login-page" aria-busy="true" />
  return <>{children}</>
}

export function CompatibilityRedirect({ target }: { target: (role: Role, params: URLSearchParams) => string }) {
  useEffect(() => {
    const session = getSession()
    if (!session) { window.location.replace('/'); return }
    window.location.replace(target(session.role as Role, new URLSearchParams(window.location.search)))
  }, [target])
  return <main className="login-page" aria-busy="true" />
}

export { roleRoute }
