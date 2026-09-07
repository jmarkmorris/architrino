# Development Process Review Priorities

## Current

All five reports and the operator's dictated concerns have been synthesized into the [findings and proposed execution order](analysis/review-and-repair-plan.md). The [cross-report assessment](analysis/cross-report-findings.md) includes targeted historical verification, corrections to overbroad report claims, a plain-language hash/pin explanation, and explicit remaining evidence gaps. The operator subsequently authorized the [first bounded process investigation](analysis/first-process-investigation.md): a minimal normal-return workload reproduces a supervisor failure, an explicit-exit control passes, and a simple in-memory reference-release patch is rejected because the runner is killed. The operator then authorized both the process repair and consequential audit. The [repair validation](analysis/process-repair-validation.md) records 85 passing process regressions and 65 passing source-composition checks; the [audit](analysis/consequential-repair-audit.md) identifies historical-binding corruption and a separate pre-existing preparation-pin failure that remain open.

## Objective

The [operator's concerns](analysis/operator-concerns.md) capture the requested review scope, including trust in failed tests, possible repair-induced damage, hash/pin design, instruction sprawl, and later access and project-configuration questions.

Establish which failures were existing defects, mistaken diagnoses, unavailable prerequisites, or defects introduced by attempted repairs. Develop a prioritized repair proposal and evaluate whether testing, evidence bindings, agent instructions, and publication procedures need simplification or correction. Do not refresh pins, weaken checks, or reverse changes merely because a retrospective recommends doing so.

## Scope and routing

The [work queue](work-queue.md) records the current execution boundary. Existing [operations decisions](../aaa-operations/work-queue.md) remain with their owners; this collection does not duplicate or close them. Proposed first work is a bounded process-termination investigation alongside review of consequential test and pin changes, after preserving available originals. Claude GitHub access and a shared Architrino/MyLists project arrangement remain later, independently schedulable topics. Preserve original sessions; renaming them does not replace their identifying provenance.

## Next decision

Review the completed repair and audit, then prioritize restoration of the historical source/evidence bindings and recovery of the unresolved preparation generation. Urgency and dependencies are listed separately in the plan; the wider repair program, pin redesign, policy changes, and workspace/access setup remain distinct. Missing original evidence is listed in the [assessment](analysis/cross-report-findings.md#evidence-still-needed). The [work log](work-log.md) records completed intake, analysis, and controls.
