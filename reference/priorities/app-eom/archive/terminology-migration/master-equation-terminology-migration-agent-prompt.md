Closure goal: migrate the approved transmitter/reception terminology throughout the corpus and reader-facing apps without changing Master Equation physics, EOM solver semantics, frozen evidence, or external machine contracts.

Use the AAA corpus advancement skill in edit-batch mode.

## Context

The approved conceptual notation distinguishes the two causal events explicitly:

$$
T_t=\text{transmitter emission time},
\qquad
T_r=\text{receiver reception time}.
$$

Use transmitter subscript $t$ and receiver subscript $r$ consistently:

$$
\mathbf r_t
=
\mathbf X_r(T_r)-\mathbf X_t(T_t),
$$

$$
D_t
=
c_f-\hat{\mathbf r}_t\cdot\mathbf V_t(T_t),
$$

$$
D_r
=
c_f-\hat{\mathbf r}_t\cdot\mathbf V_r(T_r).
$$

The conceptual mappings are

$$
D_s\mapsto D_t,
\qquad
D_T\mapsto D_r,
\qquad
T_{\mathrm{em}}\text{ or unambiguous emission }S\mapsto T_t,
\qquad
\text{reception }T\mapsto T_r
$$

when the symbols have those meanings.

The physics decision is separate and must not be changed in this migration. The current canon and EOM solver still use the receiver-weighted acceleration. The priority proposal removes receiver playback from base acceleration, but that proposal has not passed every promotion gate. Preserve whichever equation a document is intentionally describing; change only its names and explanatory clarity.

## Required reading

Before editing, read completely:

- `AGENTS.md`
- `reference/op/agent-startup-orientation.generated.md`
- `reference/entourage/archie/prompts/corpus-advancement-pass.md`
- `content/markdown/aaa/archie/academic-style-guide.md`
- `content/markdown/aaa/archie/mathematics-style-guide.md`
- `content/markdown/aaa/archie/mathematics-terminology.md`
- `content/markdown/aaa/archie/terminology-usage.md`
- `content/markdown/aaa/archie/comparative-glossary.md`
- `reference/priorities/app-eom/master-equation-import-audit-walkthrough-2026-07-18.md`
- `reference/priorities/app-eom/master-equation-transmitter-side-impact-inventory.md`
- `reference/priorities/app-eom/master-equation-frozen-evidence-disposition-ledger.md`
- `reference/priorities/app-eom/master-equation-machine-field-disposition.md`
- `reference/priorities/app-eom/master-equation-promotion-readiness-matrix.md`

Run `git status --short` before edits. Preserve all unrelated and ambient changes.

## Task

Perform a repository-wide, meaning-aware terminology migration across:

- `content/markdown/aaa`
- reader-facing Markdown under `reference` when it states current terminology
- app and scene UI text under `src`, `content/scenes`, and adjacent app assets
- explanatory comments, test names, and internal identifiers when renaming is safe and does not change a compatibility boundary
- terminology validators and controlled glossary entries needed to enforce the new current usage

Update controlled terminology definitions first, then dependent equations and prose, then reader-facing app text, then safe internal identifiers and tests.

## Meaning rules

1. **Transmitter** means the architrino at its past emission event $T_t$ whose wake arrives now.
2. **Receiver** means the architrino at its current reception event $T_r$ whose acceleration is being evaluated.
3. The separation vector always runs from the transmitter's emission site to the receiver's reception site.
4. $D_t$ is the transmitter-side wake-spacing and emission-time Jacobian factor.
5. $D_r$ is the receiver-side wake-crossing and root-playback factor.
6. The exact transport identity is
   $$
   \frac{dT_t}{dT_r}=\frac{D_r}{D_t}.
   $$
7. Do not describe the transmitter's position at $T_r$ as part of an arriving hit unless a separate present-position diagnostic is explicitly being discussed.
8. Do not use `source` as an automatic synonym for transmitter when `source` has a different established meaning, such as a document source, software source, evidence source, radiation source class, or generic source term in an equation.
9. Do not use a blind search-and-replace. The symbols $t$, $r$, $T$, $S$, `source`, and `receiver` have unrelated meanings in many files.
10. In reader-facing prose and UI, replace unexplained jargon such as `row` with the actual object: `causal hit`, `acceleration contribution`, `root record`, `ledger entry`, or `table entry`, as context requires. Preserve literal schema fields and historical quotations.

## Physics and evidence boundaries

- Do not change the acceleration numerator, absolute-value convention, polarity rule, inverse-square kernel, root set, same-source admission rule, or any other dynamics semantics.
- Do not implement the transmitter-side proposal in the EOM solver.
- Preserve $D_r/D_t$ wherever it is required for root continuation, branch orientation, or existing receiver-weighted acceleration being described.
- Do not relabel an old-law result as evidence for the proposed law.
- Do not rewrite frozen evidence, hashes, provenance records, historical decision records, or archived run outputs.
- Published schema keys, command-line fields, certificate fields, serialized data, URL parameters, and compatibility APIs remain unchanged unless the repository already has an authorized version transition. If a reader-facing label can change while a machine key remains, change only the label and document the compatibility mapping.
- When an internal identifier can be renamed without changing a machine contract, update all producers, consumers, tests, and comments together.
- If an occurrence is ambiguous, preserve it and add it to the disposition report rather than guessing.

## Execution order

1. Produce a reproducible occurrence inventory using `rg`; classify each hit as current reader terminology, current internal terminology, historical evidence, compatibility contract, generated artifact, or unrelated use.
2. Update Archie terminology definitions and glossary entries to establish the approved map. This terminology-policy update is explicitly authorized by the operator.
3. Update current AAA prose and equations in conceptual dependency order: definitions, Master Equation, action and energy discussions, dependent dynamics, validation prose, and reader summaries.
4. Update reader-facing application and scene language, including labels, help text, diagnostics, tables, and error explanations.
5. Rename safe internal identifiers and test descriptions only where no external contract or frozen record changes.
6. Update or add a focused terminology audit that rejects stale current-prose uses while allowing declared historical and compatibility locations.
7. Run before-and-after searches. Old notation may remain only in an explicit allowlist with a reason.
8. Run repository validation and relevant app or test checks. Use generator `--check` commands only; do not regenerate unless the operator separately authorizes it or the final branch/PR procedure requires it.

## Required deliverables

- The completed terminology edit batch.
- A concise mapping table showing old term, new term, meaning, and compatibility treatment.
- An occurrence disposition report for every preserved old term.
- A list of machine contracts deliberately left unchanged.
- Exact validation commands and results.
- A final search showing that stale current reader-facing uses are gone outside the declared allowlist.
- A clear statement that terminology changed but Master Equation physics and EOM solver semantics did not.

## Claim and promotion discipline

Treat the terminology migration as a naming migration, not equation promotion. Do not claim canon acceptance of the transmitter-side acceleration proposal, conservation closure, coincident-birth closure, complete recovery, or solver readiness. If existing prose overclaims one of those while being edited, correct the claim level without changing the underlying equation unless the correction is mechanically required for truthful terminology.

## Final handoff

Report:

- files changed by category;
- current-prose occurrences migrated;
- historical and compatibility occurrences preserved;
- ambiguous occurrences deferred;
- validation results;
- generated drift, if any, with the exact `--write` command but without running it;
- the next closure goal, if any.
