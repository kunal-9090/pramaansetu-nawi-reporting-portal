'use client'

import { FormEvent, useState } from 'react'
import { Check, FlaskConical, LockKeyhole, LogIn, Mail, Settings, ShieldCheck, UserRound, UsersRound } from 'lucide-react'

export const DEMO_USERS = [
  { email: 'inspector@pramaansetu.gov', password: 'Inspector@123', name: 'Ananya Sharma', role: 'Inspector' as const, route: '/inspector' },
  { email: 'lab@pramaansetu.gov', password: 'Lab@123', name: 'Rakesh Mishra', role: 'Lab Verifier' as const, route: '/lab' },
  { email: 'officer@pramaansetu.gov', password: 'Officer@123', name: 'S. Patnaik', role: 'Officer' as const, route: '/officer' },
  { email: 'admin@pramaansetu.gov', password: 'Admin@123', name: 'Admin User', role: 'Admin' as const, route: '/admin' },
]

export function DemoLogin() {
  const [selectedRole, setSelectedRole] = useState<(typeof DEMO_USERS)[number]['role']>('Inspector')
  const [email, setEmail] = useState(DEMO_USERS[0].email)
  const [password, setPassword] = useState(DEMO_USERS[0].password)
  const [error, setError] = useState('')
  const selectRole = (user: typeof DEMO_USERS[number]) => { setSelectedRole(user.role); setEmail(user.email); setPassword(user.password); setError('') }
  const roleClass = (role: string) => role.toLowerCase().replace(/\s+/g, '-')
  const submit = (event: FormEvent) => { event.preventDefault(); const user = DEMO_USERS.find(item => item.email === email.trim().toLowerCase() && item.password === password); if (!user) { setError('Invalid demo credentials. Check the selected role, email, and password.'); return } localStorage.setItem('pramaan-session', JSON.stringify({ loggedIn: true, userName: user.name, userEmail: user.email, role: user.role, loginTime: new Date().toISOString() })); window.location.href = user.route }
  return <main className="login-page"><div className="login-watermark login-watermark-left" aria-hidden="true"><ShieldCheck size={170}/></div><div className="login-watermark login-watermark-right" aria-hidden="true"><FlaskConical size={150}/></div><div className="login-card login-card-wide"><div className="login-brand"><span className="brand-mark"><ShieldCheck size={22}/></span><div><strong>PramaanSetu</strong><small>NAWI Reporting Portal</small></div></div><div className="login-copy"><p className="eyebrow">LEGAL METROLOGY · DEPARTMENT OF CONSUMER AFFAIRS</p><h1>Secure workspace access</h1><p>Choose a demo role, then sign in with its attached credentials.</p></div><div className="role-chooser" aria-label="Choose your role">{DEMO_USERS.map(user => <button key={user.role} type="button" className={`role-card role-${roleClass(user.role)} ${selectedRole === user.role ? 'selected' : ''}`} onClick={() => selectRole(user)}><span className="role-icon">{user.role === 'Inspector' ? <UserRound size={17}/> : user.role === 'Lab Verifier' ? <FlaskConical size={17}/> : user.role === 'Officer' ? <UsersRound size={17}/> : <Settings size={17}/>}</span>{selectedRole === user.role && <span className="role-check"><Check size={12}/></span>}<strong>{user.role}</strong><span>{user.name}</span><small>{user.email}</small><em>Use demo credentials <span aria-hidden="true">→</span></em></button>)}</div><form onSubmit={submit} className="login-form"><label><span>Email / user ID</span><span className="input-with-icon"><Mail size={16}/><input value={email} onChange={event => setEmail(event.target.value)} autoComplete="username" required placeholder="name@pramaansetu.gov"/></span></label><label><span>Password</span><span className="input-with-icon"><LockKeyhole size={16}/><input value={password} onChange={event => setPassword(event.target.value)} type="password" autoComplete="current-password" required placeholder="Enter demo password"/></span></label>{error && <div className="validation" role="alert">Invalid demo credentials. Check the ID and password.</div>}<button className="primary-button login-submit" type="submit">Sign in as {selectedRole} <LogIn size={16}/></button></form><div className="login-note"><ShieldCheck size={17}/><div><strong>Demo access only</strong><span>Use demo role credentials below. This prototype does not collect real credentials.</span></div></div></div><div className="login-wave" aria-hidden="true"/></main>
}

export function logout() { localStorage.removeItem('pramaan-session'); window.location.href = '/' }
export function getSession() { if (typeof window === 'undefined') return null; try { return JSON.parse(localStorage.getItem('pramaan-session') || 'null') } catch { return null } }
