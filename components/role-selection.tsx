'use client'

import { ArrowRight, ClipboardCheck, Gauge, Landmark, LockKeyhole, ShieldCheck } from 'lucide-react'

type Role = 'Inspector' | 'Lab Verifier' | 'Officer' | 'Admin'
const roles: { role: Role; title: string; eyebrow: string; description: string; boundary: string; Icon: typeof ShieldCheck; cta: string }[] = [
  { role: 'Inspector', title: 'Inspector', eyebrow: 'FIELD CAPTURE', description: 'Create inspection cases, register NAWI instruments, capture readings and upload evidence.', boundary: 'Creates the source record', Icon: ClipboardCheck, cta: 'Enter field workspace' },
  { role: 'Lab Verifier', title: 'Lab Verifier', eyebrow: 'TECHNICAL VALIDATION', description: 'Review test setup, validate readings, check evidence quality and verify technical observations.', boundary: 'Verifies technical sufficiency', Icon: Gauge, cta: 'Open verification queue' },
  { role: 'Officer', title: 'Officer / Authority', eyebrow: 'DECISION AUTHORITY', description: 'Review TrustGate results, approve reports, request retest or mark potential non-compliance.', boundary: 'Owns final decision', Icon: ShieldCheck, cta: 'Open decision console' },
  { role: 'Admin', title: 'Admin', eyebrow: 'GOVERNANCE', description: 'Manage users, roles, rule versions, settings and system configuration.', boundary: 'Controls operating rules', Icon: LockKeyhole, cta: 'Open governance console' },
]

export default function RoleSelection({ onSelect }: { onSelect: (role: Role) => void }) {
  return <main className="role-gateway premium-gateway"><div className="role-gateway-inner"><a href="/" className="gateway-brand"><span className="landing-mark"><ShieldCheck size={20}/></span><span><strong>TrustGate</strong><small>NAWI Reporting</small></span></a><div className="gateway-heading"><div><p className="landing-kicker">LEGAL METROLOGY INSPECTION SYSTEM</p><h1>Select Role to Access TrustGate</h1><p>Choose your operational role to continue into the NAWI inspection workflow.</p></div><div className="gateway-stamp"><Landmark size={17}/><span>LEGAL METROLOGY<br/><b>CONTROLLED ACCESS</b></span></div></div><div className="gateway-flow" aria-label="Role handoff"><span className="active">Inspector</span><i/><span>Lab Verifier</span><i/><span>Officer</span><i/><span>Admin governance</span></div><section className="role-card-grid premium-gateway-grid" aria-label="Select your role">{roles.map(({ role, title, eyebrow, description, boundary, Icon, cta },index) => <button className={`role-gateway-card gateway-card-${index+1}`} key={role} onClick={() => onSelect(role)}><span className="gateway-card-number">0{index+1}</span><span className="role-gateway-icon"><Icon size={23}/></span><span className="role-gateway-copy"><small>{eyebrow}</small><strong>{title}</strong><span>{description}</span></span><span className="gateway-boundary"><ShieldCheck size={13}/>{boundary}</span><span className="role-gateway-cta">{cta}<ArrowRight size={14}/></span></button>)}</section><div className="gateway-note"><ShieldCheck size={17}/><span><strong>Evidence Before Result</strong> — no final NAWI result is released until it is verified, traceable and officer-approved.</span></div></div></main>
}

export type { Role }
