# TrustGate for NAWI Reporting — Product Requirements Document

## Overview
TrustGate is an evidence-first inspection copilot for Non-Automatic Weighing Instruments (NAWI), supporting OIML R 76-style verification and audit-ready reporting for Indian Legal Metrology departments.

## Problem
Inspection reports can be weakened by incomplete identity, missing photographs, incorrect test applicability, manual calculation errors, poor traceability, and findings that cannot be reconstructed during review. TrustGate makes evidence, rules, calculations and officer supervision explicit before any result is finalized.

## Users and roles
- **Inspector:** creates cases, registers instruments, captures readings/evidence and submits.
- **Lab verifier:** checks setup, evidence quality and technical readings.
- **Officer / Authority:** reviews TrustGate, counter-evidence and decides the case.
- **Admin:** manages users, rule versions, configurations and audit logs.

## Value proposition
A guided, traceable workflow that prevents premature pass/fail decisions and produces evidence-linked, officer-approved R 76-style reports.

## Key workflow
Intake → Passport → Setup → Applicability → Guided Test → Evidence → Calculation → TrustGate → Counter-Evidence → Officer Decision → Report → Audit Trail.

## Main modules
Dashboard, Create Case, NAWI Passport, Test Setup, Applicability Engine, Guided Tests, Evidence Capture, Calculation Engine, TrustGate Review, Counter-Evidence, Officer Dashboard, Reports and Audit Trail.

## Functional requirements
1. Create and track inspection cases with auto IDs, location, district, purpose and assignees.
2. Maintain a NAWI Digital Passport with identity, capacity, class, interval, tare and attachments.
3. Record traceable setup conditions, test masses, calibration and notes.
4. Determine applicable OIML tests: repeatability, eccentricity, indication error, tare, creep and substitution.
5. Guide load-point readings and evidence capture through a stepper.
6. Calculate error, corrected error and MPE with visible source readings.
7. Evaluate identity, setup, evidence, image quality, readings, calculations, consistency and counter-evidence.
8. Require officer review before report generation; support approve, send back, retest and potential non-compliance.
9. Link each finding to evidence, reading, load point, calculation, rule version, decision and timestamp.
10. Preview an R 76-2 style report and full audit timeline.

## Non-functional requirements
Accessible semantic UI; responsive layout; clear status language; deterministic mock services; privacy-conscious demo data; auditability; replaceable API boundary; usable with keyboard and readable at presentation distance.

## MVP scope
Phase 0 documentation and Phase 1 app shell with connected dashboard, role selector, case summary cards and five realistic demo cases.

## Future scope
Spring Boot APIs, PostgreSQL persistence, MinIO evidence storage, OCR/image quality services, JWT/RBAC, Jasper/OpenPDF reports, offline PWA capture, digital signatures and configurable rule/version management.

## Success metrics
- 100% of final findings have evidence and rule references.
- 0 report generation when TrustGate prerequisites are incomplete.
- Inspectors can create and understand a case workflow without training prompts.
- Officers can identify pending decisions and rework reasons at a glance.
- Every demo case has a reconstructable lifecycle and audit trail.
