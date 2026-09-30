# TrustGate UI/UX Upgrade Audit

## Current UI problems
- Dense one-line CSS and small 9–11px typography reduce scanability.
- Dashboard surfaces rely on near-identical cards and lack enough hierarchy between primary action, status, and supporting data.
- Landing and gateway are structurally strong but need more deliberate spacing, focus states, and premium surface treatment.

## Layout issues
- Fixed desktop proportions need stronger tablet/mobile behavior.
- Workflow and report content can become dense on narrow screens.
- Tables require clear overflow affordance and sticky visual context.

## Typography issues
- Arial feels generic for a government-tech product.
- Small metadata is overused; body copy needs more breathing room and line-height.
- Page titles and section headings need a clearer scale.

## Spacing issues
- Existing spacing is mostly compact and inconsistent across panels, forms, and dashboard sections.
- Cards need consistent radius, padding, and vertical rhythm.

## Component inconsistency
- Legacy custom buttons, badges, panels, and form controls use slightly different borders, shadows, and radii.
- Status colors need consistent semantic application and readable status labels.

## Role-based UX issues
- The role model is implemented, but each role needs stronger visual emphasis for its queue, authority, and next action.
- Restricted actions should remain understandable, not merely absent.

## Dashboard clarity issues
- Summary metrics compete with the workflow area.
- Primary action and decision readiness need stronger visual priority.

## Mobile responsiveness issues
- Dense grids should collapse earlier.
- Topbar, report controls, workflow steppers, and admin tables need predictable wrapping/scroll behavior.

## Priority upgrade plan
1. Establish semantic visual tokens and typography.
2. Improve shell, cards, buttons, badges, panels, forms, and workflow stepper.
3. Upgrade landing and role gateway hierarchy.
4. Improve dashboard and workflow readability without changing state logic.
5. Strengthen report, audit, and governance surfaces.
6. Validate keyboard focus, 390px layouts, build, and existing role flows.

## Design principles
- Evidence Before Result is the recurring product principle.
- Use navy for authority, blue for guidance, green for verified, amber for review, red for blocking, and purple only for TrustGate emphasis.
- Prefer calm surfaces, visible borders, restrained shadows, and generous whitespace.
- Every page should expose current state, next action, and why a result is blocked.
- Preserve the existing workflow state machine and role restrictions.
- Treat status text as essential; never rely on color alone.
- Use semantic landmarks, visible focus, readable contrast, and touch-friendly controls.

## Audit scope
This upgrade changes presentation and interaction polish only. Existing routes, role persistence, RBAC, workflow state, report gating, and audit behavior remain intact.

## Remaining prototype limitations
The app remains a frontend prototype using localStorage/mock evidence and calculations. Production authentication, server-side RBAC, durable storage, real uploads/OCR, and PDF generation are future scope.

## Completion
Premium UI/UX pass applied to the existing TrustGate prototype; validation follows in browser and production build checks.
