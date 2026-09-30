# TrustGate for NAWI Reporting — Phases

## Phase 0 — Documentation
Create `prd.md`, `architecture.md`, `rules.md`, `phases.md`, `design.md` and `memory.md`.

## Phase 1 — App shell
Build sidebar, header, dashboard, role selector, summary cards and connected demo case list.

## Phase 2 — Case workflow — COMPLETE
Create Inspection Case, NAWI Digital Passport and Test Setup & Traceability with connected mock state, validation, progress stepper, case register and status transitions.

Next: Phase 3 — OIML Applicability Engine, Guided Test Execution and Evidence Capture.

## Phase 3 — Guided testing — COMPLETE
Added OIML applicability engine, guided test stepper, reading entry, evidence capture, quality mock checks, rework validation and connected case status transitions.

## Phase 4 — Validation — COMPLETE
Added Calculation Engine with mock MPE logic, TrustGate Review checks, decision-readiness state, Counter-Evidence Check, rework actions and connected status transitions.

## Phase 5 — Officer workflow — COMPLETE
Added Officer Dashboard with grouped queues, summary cards and filters; Case Detail with evidence, calculations, TrustGate checks, counter-evidence, remarks and audit timeline; and connected officer actions with required decision remarks, approval gating, report lock and status transitions.

## Phase 6 — R 76-2 Report Preview, Evidence-Linked Findings and Complete Audit Trail — COMPLETE
Added an official report register and R 76-2 style preview with instrument identity, traceability, applicability, readings, TrustGate summary, evidence references, officer decision and audit trail. Added evidence-linked finding language, report generation locking until officer approval, mock print/download/share/close actions, and a filterable audit trail screen.

## Phase 7 — Polish — COMPLETE
Final SIH presentation-ready polish: six realistic demo cases across workspace and officer queues, connected Settings placeholder, responsive navigation/layout refinements, Evidence Before Result banners, validation and empty-state language, official report/audit surfaces, and mobile-friendly overflow handling.

Final status: SIH presentation-ready prototype completed.

## Phase R7 — Final role-based demo readiness audit — COMPLETE

Completed the final SIH demo audit across all four roles. The role gateway, role-specific dashboards, permission system, workflow buttons, report approval lock, audit trail updates, route navigation, persistence behavior and responsive mobile surfaces were exercised. Inspector, Lab Verifier, Officer and Admin demo paths are connected and presentation-ready.

Audit result: no confirmed broken routes or browser console errors after the final rebuild. The prototype uses representative localStorage-backed state and mock evidence/calculation behavior; production backend, authentication, durable persistence, real file storage and PDF generation remain future scope.

Final demo status: SIH presentation-ready prototype completed.

Final SIH audit status: COMPLETE. Landing, gateway, role workflows, reports, audit trail, RBAC, persistence, responsive layouts and build validation were checked. No confirmed application or console errors remain. The prototype is ready for SIH presentation and preview publish; production backend, authentication, durable persistence, real evidence services and PDF generation remain out of scope.

## Phase A1 — Alpha testing — COMPLETE
Performed a strict alpha pass across environment smoke tests, landing navigation, role gateway, all four role surfaces, workflow state, officer approval gating, report locking, audit navigation, RBAC visibility, invalid localStorage recovery, direct report-route access, desktop and 390px mobile layouts. Fixed the direct report route gap so users without a valid selected role are redirected to the role gateway. `pnpm build` passed on Next.js 16.3.3.

Alpha verdict: PASS for controlled SIH prototype demonstration. Remaining limitations are documented prototype constraints: localStorage state, mock authentication/RBAC, representative evidence/calculations, no durable backend, no real file storage, and no production PDF generation.

## Phase B1 — Beta testing and final presentation rehearsal — COMPLETE
Ran the exact 2–3 minute SIH presentation path: landing, role gateway, Inspector dashboard and workflow screens, Lab Verifier queue/evidence surface, Officer dashboard and TG-2026-0041 case detail, approval modal, report generation/preview, audit link, and Admin rule versions, evidence thresholds and system settings. Verified every tested click, role switching, selected-role visibility, populated demo cases, approval gating, report locking, reset controls and direct report route guard.

Critical demo fix: role dashboard headings now identify the active role (`Officer dashboard`, `Administration`, `Verification workspace`) instead of always showing the Inspector greeting. No redesign was introduced.

Beta verdict: PASS for controlled SIH presentation. Best demo case is TG-2026-0041 because it reaches approval and report preview; TG-2026-0040 is the backup for demonstrating Needs Evidence gating. Report preview generation, audit link and Admin governance screens are usable. Some browser waits used exact visible labels rather than assumed copy; no dead-end route or confirmed active runtime error remained.

Final demo path: landing → Enter System → Inspector → Dashboard → Create Case/NAWI Passport/Test Setup/OIML Applicability/Guided Tests/Evidence Capture/Calculation Engine/TrustGate Review → Lab Verifier → Verification Queue/Evidence Review → Officer → Officer Dashboard → TG-2026-0041 → Counter-Evidence/TrustGate → Approve Report → View Report → Generate Report → Audit Trail → Admin → Rule Versions → Evidence Thresholds → System Settings.

Demo avoid list: do not live-fill the full Create Case form, do not demo the corrupt/invalid-storage recovery path, do not rely on Download PDF or Share Report because they are intentionally prototype-disabled, and do not use TG-2026-0040 for the main approval story because it is a Needs Evidence case.

Backup paths: if role switching fails, return to `/dashboard`, clear the selected role through the gateway and select the next role; if report generation fails, show the approved Case Detail plus Report Preview sections and explain that PDF export is prototype-disabled. Reset Demo Data from Admin → System Settings before rehearsal.

Two-minute script: establish the evidence problem; enter as Inspector and show identity, setup, OIML applicability, evidence, calculation and TrustGate gate; switch to Lab Verifier to show technical sufficiency; switch to Officer, open TG-2026-0041, show counter-evidence and approve; generate the report and open audit; finish with Admin rule/threshold governance.

Sixty-second script: show landing principle, Inspector evidence chain, Officer approval lock/unlock, generated report and audit trail, then state that Admin governs rules and thresholds.

Likely judge answers: this is a role-based evidence-before-result workflow; approval is gated by TrustGate/evidence status; R 76-2 applicability and MPE evidence are represented; audit events preserve actor/action/time; production would add server auth, durable database/storage and real PDF/evidence services.

Final limitations to disclose: localStorage prototype state, mock client-side auth/RBAC, representative evidence/calculations, no durable backend, real uploads/OCR or production PDF, and controlled demo data.

Final presentation checklist: reset demo data; confirm 0041 Ready for Decision and 0040 Needs Evidence; test selected role; use light theme and desktop viewport; rehearse the exact path; avoid disabled export controls; keep the 60-second backup script ready.

## Phase C1 — Coordinated workflow engine — IN PROGRESS
Replaced the disconnected dashboard-only model with a centralized backend-ready workflow service at `lib/workflow-engine.ts`. It defines the required case statuses, role-scoped queues, guarded transitions, notifications, audit events, reset behavior, dashboard stats and shared case lookup. Added shared routes for `/cases/[caseId]`, `/audit` and `/settings`; the shared case route now renders role/status-aware case detail and preserves the direct-route role guard.

Officer decision actions now write coordinated workflow transitions for approval, retest, non-compliance and closure, including audit/notification records. The existing UI remains the presentation layer while the service is the single workflow state model for the next integration pass.

Validation: `pnpm build` passed; `/cases/TG-2026-0041`, `/audit`, and `/settings` were smoke-tested; direct case detail rendered for Officer with approval controls.

Next implementation pass: replace remaining legacy presentation arrays with service-backed queue data and bind every Inspector/Lab Verifier step button to the service transitions.

## Phase C3 — Dynamic queue and handoff wiring — COMPLETE
Replaced the officer queue state with workflow-engine-backed role data, added workflow-to-view mapping for case detail/history, and connected the Inspector case intake/passport path to centralized workflow transitions. The production deployment was rebuilt and promoted successfully.

Production smoke validation passed for landing, role gateway, Inspector dashboard, Officer role switching, and direct `/cases/TG-2026-0041` access. Direct case route correctly renders role-aware Case Detail for Officer; Inspector access remains safely constrained to Inspector workspace. Current workflow persistence remains localStorage-backed by design.

## Phase D — Judge-usable guided demo — COMPLETE
Added TG-2026-DEMO as the main resettable case, centralized guided case detail actions, visible workflow stage tracker, role switching, notification links and audit timeline. The full Inspector → Lab Verifier → Officer → report path was exercised in the browser locally, including final report opening. Production build/deploy passed; live demo route self-initializes and direct audit/report routes render.

## Phase C2 — Coordination and notification binding — COMPLETE
Hardened workflow transitions with explicit status guards, closed-case read-only protection and mandatory remarks for send-back, retest and potential non-compliance transitions. Added workflow update broadcasts so all dashboard consumers can refresh from the centralized store. Added role-scoped notification state, unread badge, notification dropdown, read marking and case-link navigation. Reset Demo Data now clears both the legacy presentation state and centralized workflow state.

Validation: `pnpm build` passed. Browser smoke test confirmed the shared Officer case detail renders from `/cases/TG-2026-0041`, role state is preserved, and the notification control is present. The active coordinated workflow remains localStorage-backed and backend-ready as required.

Development rule: complete one phase at a time, keep screens connected, update `memory.md` after each phase, and preserve the Evidence Before Result principle.

Development rule: complete one phase at a time, keep screens connected, update `memory.md` after each phase, and preserve the Evidence Before Result principle.

Development rule: complete one phase at a time, keep screens connected, update `memory.md` after each phase, and preserve the Evidence Before Result principle.
