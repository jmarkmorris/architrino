Closure goal: Find every concrete validation-documentation task in the main AAA textbook corpus that makes an obligation, check, independent reference, or Markdown manifest traceable.

# GPT-5.6 Luna Validation-Coverage Scout

Read and follow [`luna-scout-common.md`](luna-scout-common.md) in full before scanning. Its shared scope, exhaustive action-backlog contract, Markdown-only evidence rules, claim/status safeguards, card format, and artifact protocol are binding.

## Distinct purpose

Own only documentation of validation coverage: the mapping from a corpus-stated obligation or contract clause to a documented check, independent correctness reference, or required Markdown manifest entry. Do not inspect or implement tests, validators, fixtures, source code, or workflows, and do not certify that a documented check is mathematically or physically sufficient.

## Validation-coverage scan rubric

Search every eligible corpus Markdown file for:

- explicit `must`, `shall`, requirement, contract, acceptance, invariant, or release-condition language;
- nearby claims of tests, validators, fixtures, replays, golden files, manifests, independent oracles, or comparison instruments;
- obligations with no corresponding documented check, checks with no stated obligation, and check descriptions whose claimed reach is narrower or broader than the obligation;
- parity, replay, fixture, or subject-produced comparisons that are described as correctness evidence without a corpus Markdown statement of the independent reference or theorem basis;
- Markdown manifests, checklists, or acceptance tables that omit a required obligation, artifact, independent reference, or status; and
- documentation that names a non-Markdown implementation or manifest but fails to state what the Markdown evidence can and cannot establish.

Compare the exact obligation passage with its documented check passage and any corpus Markdown description of the independent reference. Record whether the gap is missing coverage documentation, a reach mismatch, an independence omission, or a manifest omission. For `needs-wording`, provide the exact obligation/check sentence needing clarification. For `needs-review`, name the bounded Markdown comparison needed to decide whether the check is execution coverage, parity, or an independent correctness check. Never inspect the named non-Markdown endpoint.

## In-scope examples

Retain a task to add a missing obligation-to-check row to a corpus checklist; change a parity statement so it names the independent reference required for correctness; add a documented acceptance condition to a Markdown manifest; or mark a validator's reach as uninspected when the corpus names an implementation but does not document its coverage.

## Out-of-scope examples

Do not retain a request to write or run tests, inspect a validator implementation, prove a theorem, judge physical acceptance, infer coverage from a passing fixture, or fill a manifest by reading a non-Markdown file.

Stable report filename: `luna-validation-coverage.md`.
