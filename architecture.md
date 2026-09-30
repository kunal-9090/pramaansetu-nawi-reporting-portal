# TrustGate for NAWI Reporting — Architecture

## Prototype posture
Frontend-first Next.js/React prototype with typed mock data, local component state and replaceable service boundaries. No backend or external connection is required for the demo.

## Production target stack
- Frontend: React + Vite PWA or Next.js
- Backend: Java + Spring Boot
- Database: PostgreSQL
- Evidence: self-hosted MinIO object storage
- OCR/image processing: Python + FastAPI + OpenCV + Tesseract/PaddleOCR
- Security: Spring Security, JWT and RBAC
- Reports: JasperReports or OpenPDF
- Deployment: Docker Compose

## Logical flow
React UI → mock API/service layer → case model → instrument/passport model → evidence model → TrustGate validation model → officer decision model → report preview model → audit trail model.

## Frontend boundaries
`app/page.tsx` is the presentation shell; domain data and future service calls should remain separable from visual components. Demo records model API responses and state transitions. Later, mock services can be replaced without changing page contracts.

## Future API contract
- `POST /inspection-cases`
- `GET /inspection-cases`
- `GET /inspection-cases/:id`
- `POST /instruments`
- `POST /evidence`
- `POST /tests/readings`
- `POST /trustgate/validate`
- `POST /officer/decision`
- `GET /reports/:caseId`
- `GET /audit/:caseId`

## Core entities
Case, InstrumentPassport, TestSetup, TestDefinition, Reading, EvidenceItem, Calculation, TrustGateResult, CounterEvidence, OfficerDecision, Report and AuditEvent. Each entity carries IDs, timestamps and rule/version references where relevant.

## Security and reliability direction
Production must enforce RBAC server-side, scope records by case and district, validate all inputs, retain immutable audit events, store evidence with access control and use signed report artifacts. UI status is advisory; final decisions are server-authoritative.
