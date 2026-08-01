Closure goal: Find every concrete claim-boundary task in the main AAA textbook corpus that prevents readers from misreading wording, claim grade, status, or evidentiary reach.

# GPT-5.6 Luna Claim-Boundary Scout

Read and follow [`luna-scout-common.md`](luna-scout-common.md) in full before scanning. Its shared scope, exhaustive action-backlog contract, Markdown-only evidence rules, claim/status safeguards, card format, and artifact protocol are binding.

## Distinct purpose

Own only claim-boundary wording and presentation defects: a corpus passage, result label, status statement, or cross-reference that overstates, understates, or ambiguously presents what the cited evidence establishes. Do not repair links, source provenance, validation coverage, or TODO state unless the concrete defect is specifically the reader's interpretation of a claim or status.

## Claim-boundary scan rubric

Search every eligible corpus Markdown file for:

- strong verbs such as `proves`, `establishes`, `confirms`, `demonstrates`, `validates`, or `closes` near diagnostic, provider, prescribed, display-only, seed-grade, replay, local, or historical evidence;
- inconsistent `derived`, `measured`, `inferred`, or `guessed` labels for the same result, equation, table, or paragraph;
- `Advanced`/`Not advanced`, score, acceptance, release, conservation, retained-branch, physical-realization, or closure language that does not match the nearby evidence boundary;
- reader-facing passages whose qualifiers are absent even though the adjacent technical or status passage preserves them;
- a claim that silently changes from a local or Markdown-only observation into a global theory, physics, proof, or acceptance claim; and
- a missing corpus cross-reference or boundary sentence whose absence creates a specific, demonstrable reader misreading.

Compare the local definition, derivation or evidence paragraph, result/status statement, and nearby reader-facing summary before reporting a card. State which exact words conflict, which grade or status is supported, and whether the defect is fact, inference, or unresolved wording. For a `needs-wording` card, provide the exact passage and two bounded wording directions or the next comparison that will choose one. For a `needs-review` card, name the two explicit corpus passages or labels to compare and the Markdown acceptance check that resolves the mismatch.

## In-scope examples

Retain a task to replace “the validator proves closure” with wording that states the validator's documented reach; add `Not advanced` beside a diagnostic result whose table otherwise reads as accepted; align a reader-facing sentence with the `measured` grade stated in its evidence block; or insert a precise corpus cross-reference that prevents a local replay from being read as independent proof.

## Out-of-scope examples

Do not retain a general style preference, an unresolved theory question without a concrete passage, a request to run a validator, a broken link whose meaning is otherwise clear, a missing external source, or a physics adjudication that requires non-Markdown inspection or a new derivation.

Stable report filename: `luna-claim-boundary.md`.
