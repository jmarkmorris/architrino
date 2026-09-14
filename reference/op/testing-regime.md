# Testing Philosophy and Process

Approved by the operator on September 14, 2026. This approval adopts the process; it does not grant blanket approval to the existing test inventory. Section 6 records current decisions and limits on further process work.

## 1. Purpose and authority

This is the canonical operator/developer process for agreeing, selecting and maintaining Architrino testing, both locally and in GitHub pull requests. Testing must support progress on theory, reliable software or publication by detecting a consequential mistake in something currently used. It must earn its execution and maintenance cost. Passing more tests is not itself a project objective.

The operator's September 14, 2026 direction is that only agreed testing is allowed. Agreement must cover scope, execution trigger and the consequence of failure. Agents may propose testing; they may not independently turn a proposal, an experimental checker, or a one-time diagnostic into a regular obligation. The [operations manuscript](../priorities/aaa-operations/manuscript.md#7-testing-philosophy-and-execution-regimen) retains the explanation, value review and decisions. The [dated testing review](../priorities/development-process-review/analysis/testing-by-situation-review.md) retains the inventory and measurements. Those records support this process; they do not automatically authorize everything they list.

[AGENTS.md](../../AGENTS.md) governs evidence independence and scientific claim boundaries. The [PR lifecycle](git/pr-lifecycle.md#4-run-the-exact-state-pr-gate) owns publication execution, hooks and receipts. [Long-running job supervision](long-running-test-heartbeats.md) owns execution and cleanup of authorized long jobs. This document governs whether testing belongs in those procedures and the agreed scope of its use.

## 2. Philosophy

A value statement names the mistake a test detects, the current reader, researcher or software consumer affected, and the decision improved by detecting it. “Maintains consistency,” “adds coverage,” and “checks a contract” are incomplete justifications until the consequence is explained. A chain of checkers depending on one another is not evidence that their subject is useful. Retire testing obligations when their purpose is retired.

Use the smallest meaningful body of evidence for the agreed decision. Prefer a direct mathematical derivation, known-answer case, focused behavioral check or existing validation over a new framework. Repeated whole-corpus reconstruction, broad discovery, large numerical grids and additional source-binding machinery need a specific benefit beyond narrower existing coverage. A change to a file's bytes does not establish a behavioral defect. Tests must not require preservation of a requirement the operator has removed.

An independent analytical or separately implemented reference can support computational correctness within its tested scope. Agreement with output produced by the same implementation supports repeatability or preservation. A working animation does not establish physical dynamics; a software regression pass does not close a scientific question. Evidence requirements protect the honesty of claims, but do not automatically require running every available instrument before editing, discussing or publishing unrelated work.

Account for elapsed execution, preparation, human investigation of failures, maintenance, storage and delays to other work. State unmeasured costs explicitly. Numerical timeouts are execution bounds, not permission to spend that entire budget on every invocation. Avoid tests that merely restate the implementation or enforce obsolete internal bookkeeping.

## 3. Agreement and changes to scope

Agreement can be a direct operator instruction for a bounded task or a standing operator-approved regimen. Record its source and scope in the relevant row or existing task record. Do not request permission repeatedly for work already covered by that agreement. Approval may cover a coherent test family and its stated behavior, so ordinary maintenance within that scope does not need one approval per assertion.

A one-time instruction to investigate or run a suite authorizes that bounded effort. It does not authorize recurring execution, additional pipelines or making failures block a PR. Likewise, approving a development check does not approve running it locally, again in several CI jobs, and periodically afterward. Identify each execution situation and justify duplication where it is needed.

Adding a test to automatic discovery, a hook, a CI workflow, a required status check or a scheduler changes the regimen. Obtain agreement before doing so, including when the change is achieved indirectly through a filename or a dependency. Expanding the protected requirement, population, cadence, cost budget or blocking status beyond the agreed scope also needs agreement. Place a proposed regular test outside default discovery until agreed; the existing `.manual.js` convention permits explicit execution without enrolling it in regular Node testing.

Use one compact decision table in this document or the relevant owner; link to an existing table rather than creating duplicate registries. Each proposed or approved effort needs these fields:

| Field | Required explanation |
| --- | --- |
| Effort and scope | Exact suite/command or bounded family, covered behavior and dependencies |
| Value and current consumer | Consequential error detected, who uses the result, and what decision depends on it |
| Evidence quality | Origin and independence of the expected answer; important limitations |
| When run | Local change trigger, explicit diagnostic, PR job, deployment or agreed schedule |
| Timing and cost | Measured time, date, host and setup inclusion; failure-investigation/maintenance burden when known; agreed execution bound |
| Result consequence | Whether it informs investigation, supports a scientific claim, or is an agreed blocking publication check |
| Agreement and owner | Operator decision or standing authorization, maintenance owner and scope of approval |
| Continued need | Conditions for narrowing, explicit-use-only status or retirement; existing overlapping coverage |

Unknown information remains unknown. The cost-measurement experiment itself can be a bounded agreed task; a full campaign is not needed merely to propose a test. This is a human-readable decision record, not authorization to build an approval service, source-hash registry or additional gate.

## 4. Philosophy by execution situation

The table below explains how to choose scope. It does not grant blanket approval to all tests in a category.

| Situation | Purpose and value | When an agreed effort runs | Timing and duplication rule | What failure means |
| --- | --- | --- | --- | --- |
| Local development | Catch a concrete regression in the changed behavior before more work depends on it | The agreed change and its affected dependencies | Prefer focused cases; no automatic broad scientific campaign after ordinary edits | Investigate the relevant behavior; unrelated failures do not automatically expand the task |
| Local numerical or scientific validation | Check a calculation against an independent answer before relying on its result | The agreed algorithm change or scientific question | Bound inputs, resolution, resources and stopping point in the selected protocol | Limits the affected computational or scientific claim; does not automatically block unrelated publication |
| Local broad regression | Find interactions not exercised by focused checks | Explicitly agreed baseline or broad-verification invocation | Identify the selection and source state; report setup separately; no automatic repeat on unchanged inputs | Report accounted-for failures and unexecuted coverage; blocking status must have been agreed |
| Local pre-publication | Verify the candidate against the agreed publication requirements | Operator-invoked PR lifecycle | Reuse applicable receipts under their existing rules; avoid repeating equivalent work without a reason | Only agreed required checks block publication through this process |
| GitHub PR validation | Verify the candidate in the declared CI environment independently of the developer's local setup | The agreed PR events and jobs | Justify local/CI overlap and duplicate jobs; use bounded execution; do not append research suites opportunistically | Required versus informational status follows the agreement and actual repository settings |
| Pages/deployment reconstruction | Catch missing deployable files and dependence on local-only artifacts | The agreed packaging or deployment workflow | Complete reconstruction has value distinct from small fixtures; avoid unnecessary repeated builds of the same candidate | An agreed packaging failure blocks the affected deployment |
| Browser appearance, interaction or performance | Observe what a reader actually sees and experiences | Agreed affected UI work or acceptance renewal | Separate fresh observation from checking a saved report; no automatic full visual campaign | Applies to the inspected behavior and environment |
| Specialized research and historical reproduction | Answer a named research question or reproduce a retained result | Explicitly selected, agreed protocol | Use the stated environment and budget; no automatic regular enrollment | Report the bounded result; preserve original evidence and avoid stronger claims |

## 5. Execution and failure handling

Before a run, identify the applicable agreement, selected effort, intended decision and execution bound. Resolve missing prerequisites before launching. Use the established shared Python environment, build prerequisites and supervision procedure where applicable. A missing capability is unexecuted coverage, not permission to substitute a different scientific environment or build a replacement system.

Stop at the agreed boundary. Do not retry indefinitely, enlarge inputs, regenerate chains of artifacts or launch unrelated suites merely to achieve a green summary. Repetition requires a changed input, a diagnosed cause, or another reason within the agreed investigation. An unexpected runtime or recurring false failure is a reason to reassess that effort's cost and scope.

For a failure, first determine whether the protected requirement remains valid, whether the test reached its intended scenario, and whether the source state was stable. Distinguish an implementation defect, an outdated expectation, a missing prerequisite and concurrent change. Repair within the agreed task; otherwise record the issue and continue independent work. Do not weaken a valid correctness assertion just to obtain a pass. Do not let an unapproved diagnostic become a blocking requirement after it fails.

Report what ran, timing, relevant results and their limits. Finish an agreed passing scope without inventing another validation tier. Changes to actual GitHub required checks must go through the authorized publication/settings workflow; this document neither silently bypasses those checks nor certifies their value.

## 6. Current decisions and transition

The operator has explicitly removed these four suites from regular rotation: EQ-21 nonlinear transfer, halo/cluster transfer, shear/RSD transfer, and the prescribed structural-root ledger. Their commands, preserved files and reinstatement requirements are recorded in [manuscript §7.3.4](../priorities/aaa-operations/manuscript.md#734-operator-decision-four-suites-removed-from-rotation). They remain explicit-use only. Earlier execution measured their combined test durations at approximately 1 minute 44 seconds; this is not a new runtime measurement.

The remaining six slow suites have discussed value cases, not blanket approval for every assertion, cadence or publication role. The existing ordinary sweep, local publication aggregate and GitHub workflows also require reconciliation against their actual agreements. Their presence in code does not supply missing approval. Prior explicit authorization remains valid within its scope; where agreement cannot be established, do not launch disputed testing or add it to rotation. Keep independent development moving while resolving that bounded question.

There is no standing requirement to audit, rehabilitate or replace the entire test inventory before resuming project work. Review a disputed effort only when someone proposes to use it, with the burden of justification on that proposal. The project's work does not acquire a new dependency on completing an approval inventory. Existing explicit exclusions remain in effect; existing authorizations remain bounded by their agreed scope. Actual CI configuration changes require a concrete scoped decision, and documentation alone does not change current CI behavior.

Do not turn this process into another campaign. An unapproved test does not create an obligation to investigate its failures, reconstruct its provenance, repair its framework, prove that it is unnecessary, or build a replacement. Continue the intended project work and state any resulting evidence limit honestly. If a particular required GitHub check blocks an actual PR, address that named check and its authorization in the publication task rather than launching a repository-wide testing inquiry.

## 7. Review of continued value

Reconsider an effort when its consumer disappears, its protected requirement changes, its runtime grows, its failures repeatedly reflect obsolete expectations, or equivalent simpler coverage becomes available. The operator may narrow its scope, move it to explicit use or retire it. Retention of scientific records does not require perpetual execution of their original checkers. The outcome sought is reliable progress with justified assurance, including less testing when that is the appropriate result.
