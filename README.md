# PramaanSetu

## Evidence-Linked NAWI Inspection & Reporting Portal

PramaanSetu is a role-based Legal Metrology inspection and reporting portal built for NAWI inspection workflows.

NAWI stands for **Non-Automatic Weighing Instrument**, such as shop weighing scales, retail weighing machines, and lab weighing instruments.

The main idea of this project is:

> **Evidence Before Result. AI assists, Officer decides.**

---

## Live Prototype

🔗 **Prototype URL:**  
https://pramaansetu-prototype-development.vercel.app/

---

## Problem Statement

NAWI inspection report generation is not only a report-making task. In real inspection workflows, there are multiple challenges:

- Incomplete test data
- Manual calculation errors
- Scattered evidence and documents
- Changing rule versions
- Weak audit trail
- Lack of traceability from evidence to final approval

Because of these issues, a fast report does not always mean a reliable compliance decision.

---

## Our Solution

PramaanSetu creates a complete evidence-linked workflow from inspection to final report.

The system ensures that final reporting happens only after:

1. Instrument identity is completed
2. Test setup is verified
3. Evidence is captured
4. TrustGate validation is completed
5. Lab Verifier reviews the case
6. Officer gives final approval
7. Report is generated with audit traceability

---

## User Roles

### 1. Inspector

The Inspector can:

- Create inspection cases
- Save draft cases
- Complete identity details
- Complete test setup
- Capture evidence
- Run TrustGate validation
- Submit case to Lab Verifier
- View reports and audit trail

### 2. Lab Verifier

The Lab Verifier can:

- Review cases submitted by Inspector
- Start technical review
- Forward case to Officer
- Send case back to Inspector
- Recommend retest
- View reports and audit trail

### 3. Officer

The Officer is the final authority.

The Officer can:

- Start officer review
- Approve case
- Send case back to Inspector
- Request retest
- Mark potential non-compliance
- Generate final report
- View reports and audit trail

### 4. Admin

The Admin can:

- Monitor all cases
- View all reports
- View users and roles
- View system status
- Track complete audit trail
- Monitor workflow activity

Admin has read-only monitoring access and does not perform inspection decisions.

---

## Core Workflow

```text
Inspector
   ↓
Create Case
   ↓
Complete Identity
   ↓
Complete Test Setup
   ↓
Capture Evidence
   ↓
Run TrustGate
   ↓
Submit to Lab
   ↓
Lab Verifier Review
   ↓
Forward to Officer
   ↓
Officer Review
   ↓
Approve
   ↓
Generate Final Report
   ↓
Admin Monitoring + Audit Trail
