import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'TrustGate NAWI Reporting Portal | Legal Metrology',
  description: 'Official Legal Metrology inspection portal for Non-Automatic Weighing Instruments, officer review, and R 76-2 reporting.',
  applicationName: 'TrustGate for NAWI Reporting',
  keywords: ['Legal Metrology', 'NAWI', 'R 76-2', 'inspection workflow', 'audit trail', 'TrustGate'],
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
