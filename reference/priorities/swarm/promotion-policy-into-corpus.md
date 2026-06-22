# Promotion Policy Into Corpus

Promotion status: `priority-only`. This packet decides how neutral braid, shell braid, nested shell braid, validation, and closure material can move from `reference/priorities/swarm/` into reader-facing corpus prose without overclaiming a retained branch. It does not itself promote material into `content/markdown/aaa`, does not modify any corpus file, and does not retain a branch.

The policy follows the active braid terminology in [Braid](swarm.md): `neutral braid`, `shell braid`, and `nested shell braid` are the reader-facing case terms. Priority packets may link to each other for workstream bookkeeping. Corpus pages must remain self-contained and must not link to `reference/priorities`.

---

## 1. Scope And Status

This policy answers one question:

$$
\text{when may a priority-side braid statement become reader-facing corpus content?}
$$

It does not answer:

1. whether a neutral braid branch has been retained;
2. whether a shell braid or nested shell braid reduction passes;
3. whether observer exports such as Lorentz recovery, photon closure, mass-map rows, color, strong-field continuation, or cosmology pass;
4. whether a validation run proves existence rather than supplies a diagnostic, candidate, or failure status.

For any proposed material item $M$ and corpus destination $D$, the promotion predicate is

$$
\mathrm{Promote}_{\mathrm{corpus}}(M,D)
\Longleftrightarrow
\mathrm{ClaimLevel}(M)\ \text{is declared}
\wedge
\mathrm{Prereq}(M)\ \text{is satisfied}
\wedge
\mathrm{Language}(M,D)\ \text{is self-contained}
\wedge
\mathrm{NoOverclaim}(M)\ \text{passes}.
$$

`NoOverclaim` means that reader-facing prose must not imply retained-branch existence, observer-export recovery, or model closure unless the corresponding live-ledger rows have closed and are named in the same corpus passage. If the live ledger is still open, the corpus material can only be promoted as a theorem target, validation target, effective summary, or speculation/comparison.

The default decision for current braid priority material remains `priority-only` unless a packet explicitly satisfies this policy. The strongest near-term promotable material is reader-safe theorem-target language: definitions, residuals, proof routes, validation criteria, and first-failure statuses that help a reader understand the proof stack without claiming the proof has succeeded.

---

## 2. Claim-Level Classes

Every promoted braid statement must carry one of four claim levels.

| Claim level | Meaning | Corpus permission |
| --- | --- | --- |
| `theorem-result` | A result whose hypotheses, proof route, and required certificate rows are closed or explicitly proven in the same corpus scope. | May be stated as established under its hypotheses. |
| `theorem-target` | A precise statement still requiring proof, certification, simulation, or ledger closure. | May be stated as an open theorem target, closure target, residual, or proof program. |
| `effective-summary` | Observer-level or coarse-grained language summarizing what a closed or target row would mean after averaging, constitutive mapping, or export. | May be used only with explicit level marking and without treating the summary as substrate ontology. |
| `speculation-comparison` | A comparison, heuristic, analogy, external-framework bridge, or possible extension. | May be included only when clearly marked as comparison or speculation and not made into a proof obligation unless it protects tested physics or an accepted consistency condition. |

The rule is monotone downward: if a packet cannot satisfy the prerequisites for `theorem-result`, it may still be promoted as `theorem-target` if it has a concrete mathematical object. If it lacks a precise object but helps interpret a later export, it may only be `effective-summary`. If it mainly compares or suggests, it is `speculation-comparison` or remains priority-only.

Retained-branch language is allowed only at `theorem-result` level after the retained-branch certificate closes. Until then, use "branch candidate", "case reduction", "theorem target", "validation target", "diagnostic row", "first-failure status", or "not retained" as appropriate.

---

## 3. Promotion Prerequisites By Material Type

### 3.1 Neutral Braid Material

Neutral braid material may promote as a `theorem-target` when it states the irreducible six-site base object without imposing binary partition, shell support, or nested radial ordering:

$$
I=\{1,\ldots,6\},
\qquad
\sigma:I\to\{+1,-1\},
\qquad
\#\{i:\sigma_i=+1\}=\#\{i:\sigma_i=-1\}=3.
$$

Reader-facing prose may say that a neutral braid branch target uses all ordered cross-site source pairs $i\ne j$, a common ledger convention, finite range, noncollision floors, an all-pairs causal-root ledger, action/Noether rows, event rows, and observer-export statuses. It may not say that a neutral braid branch exists or is retained until those rows close on one live ledger.

Promotion prerequisites:

| Material | Minimum promotion level | Required prerequisite |
| --- | --- | --- |
| six-site neutral inventory | `theorem-target` | site set, polarity map, total neutrality, and no hidden binary labels |
| all-pairs causal-root ledger | `theorem-target` | root equation, active/excluded/tail status, delay floor, Jacobian floor, and source-pair policy |
| hollow support or occupancy rows | `theorem-target` or `effective-summary` | support descriptor, noncollision relation to any central inventory, and statement that occupancy is deterministic coarse-graining, not external probability |
| neutral finite-mode search | `theorem-target` | unknown vector, residual rows, objective hierarchy, derivative matrix, Krawczyk or rejection budget, and first-failure order |
| neutral retained branch | `theorem-result` only | full base certificate plus dynamics, finite-mode convergence, action, Noether, event, stability, inventory, and observer-export statuses on one convention |

### 3.2 Shell Braid Material

Shell braid material may promote as a case-reduction theorem target when it is explicitly a neutral braid branch in a common support-band case. The corpus language must not make shell braid a separate ontology.

The allowed reduction form is:

$$
\mathfrak{R}_{\mathrm{neutral}}^\nu(B)
+
\mathcal{R}_{\mathrm{shell}}
\Longrightarrow
\text{neutral braid branch in the shell braid case}.
$$

Promotion prerequisites:

| Material | Minimum promotion level | Required prerequisite |
| --- | --- | --- |
| shell braid definition | `theorem-target` | common support descriptor, radial band residual, spread row, and no fixed-radius assumption unless separately declared |
| support work | `theorem-target` | one of `support-work-zero`, `support-work-exact`, or `support-work-event-ledgered`; `support-work-open` blocks promotion beyond priority-only |
| occupancy or shielding language | `effective-summary` unless fully ledgered | occupancy scale, coverage row, signed-balance row, and event/action accounting for central inventory or boundary exchange |
| shell retained branch | `theorem-result` only | retained-branch promotion certificate closes geometry, support, roots, dynamics, convergence, action, Noether, event, inventory, and stability rows on one live ledger |

### 3.3 Nested Shell Braid Material

Nested shell braid material may promote only as the stricter case reduction of a neutral braid branch. The corpus must state that nested shell braid failure rejects only the nested reduction unless the broader neutral braid or shell braid rows fail separately.

The allowed reduction form is:

$$
\mathfrak{R}_{\mathrm{neutral}}^\nu(B)
+
\mathcal{R}_{\mathrm{partition}}
+
\mathcal{R}_{\mathrm{nested}}
\Longrightarrow
\text{neutral braid branch in the nested shell braid case}.
$$

Promotion prerequisites:

| Material | Minimum promotion level | Required prerequisite |
| --- | --- | --- |
| binary partition row | `theorem-target` | three two-site opposite-polarity blocks and explicit permission to use binary labels |
| ordered radial support bands | `theorem-target` | radial support functional, gap margins, derivative row, and interval convention when radii are interval-valued |
| inner/middle/outer labels | `effective-summary` or `theorem-target` | label-use status: `geometric-order`, `continuation-history`, `weak-stress-role`, or `rejected-label` |
| nested transition row | `theorem-target` | first radial event surface and transversality or higher-order status |
| nested retained branch | `theorem-result` only | neutral base rows plus partition, nested support, action, Noether, event, stability, inventory, and observer-export statuses on one live ledger |

### 3.4 Validation Material

Validation material promotes only when it teaches the proof method or records a reproducible status without implying more than the validation can prove. A residual decrease, screen, or solver trace is not a retained branch.

Promotion prerequisites:

| Material | Minimum promotion level | Required prerequisite |
| --- | --- | --- |
| residual definition | `theorem-target` | variables, ledger convention, norm, tolerance, and first-failure interpretation |
| finite-mode diagnostic | `effective-summary` or `theorem-target` | chart, truncation, residual rows, root recomputation, and reason it is diagnostic rather than retained |
| certified candidate | `theorem-target` | proof-budget fields, interval/Krawczyk or convergence row, tail treatment, derivative matrix, and first failed row if any |
| certified obstruction | `theorem-result` only under stated scope | proof that chart changes, higher modes, tail assimilation, support convention changes, and declared relaxations cannot remove the failed row |
| negative result | `effective-summary` or scoped `theorem-result` | exact scope of rejection and statement of what broader cases remain viable |

### 3.5 Closure And Observer-Export Material

Closure material may promote only after the claim level identifies whether it is a base branch row, an action/Noether row, an event row, a stability row, or a downstream observer export. Observer exports cannot rescue a failed branch certificate.

Promotion prerequisites:

| Material | Minimum promotion level | Required prerequisite |
| --- | --- | --- |
| action-derived scale or inertia | `theorem-target` until closed | work-one-form curl row, action-derived $\Gamma_B^\nu$ or inertia operator, and mismatch status for any fitted scale |
| Noether conservation | `theorem-target` until closed | energy, momentum, angular momentum, charge, source provenance, Noether sea exchange, and event rows on the same ledger |
| stability | `theorem-target` until closed | root-dependent variational equation, gauge split, monodromy or return-map data, and declared stability class |
| Lorentz export | `theorem-target` | moving-assembly deformation, clock/ruler extraction, two-way signal synchronization, and bounded preferred-frame leakage |
| photon closure | `theorem-target` | branch-transition row matching the coaxial contra-rotating pro/anti planar pair requirement, event ledger, and photon-channel speed status |
| mass map | `theorem-target` | history-dressed energy, exposure tensor, scalar exposure quotient, and Noether sea medium-response tensor on the same branch |
| color, strong-field, or cosmology export | `speculation-comparison` until computed | continuous phase-bundle or finite-boundary/observer-level recovery rows as appropriate, plus `passed`, `failed`, or `not_computed` status |

---

## 4. Allowed Self-Contained Corpus Language Patterns

When material is promoted, corpus prose should restate the needed priority substance directly. It must not send the reader to `reference/priorities`.

Allowed patterns:

| Situation | Allowed corpus pattern |
| --- | --- |
| theorem target | "The neutral braid proof target is to close the six-site all-pairs causal-root ledger, action/Noether row, event row, and observer-export statuses on one branch convention." |
| case reduction | "A shell braid is treated here as a neutral braid branch in a common support-band case, not as separate ontology." |
| stricter reduction | "A nested shell braid adds a binary partition and ordered radial support-band rows; failure of those rows rejects the nested reduction, not the broader neutral braid case." |
| validation target | "This residual is a validation target: it identifies the first failed row of the branch certificate, but a residual decrease alone does not retain the branch." |
| observer export | "Lorentz behavior remains a closure target until moving-assembly deformation, clock/ruler extraction, two-way synchronization, and preferred-frame leakage rows close on the retained branch." |
| effective summary | "At the effective level, the occupancy measure can look like a smooth support distribution after coarse-graining, while the substrate object remains six deterministic architrino paths." |
| comparison | "This comparison suggests a possible export route; it is not used as ontology or as a retained-branch proof." |

Disallowed patterns:

| Pattern | Reason |
| --- | --- |
| "The braid has a retained branch" when certificate rows are open | overclaims existence |
| "Nested shell braid explains mass/Lorentz/photon behavior" before exports pass | promotes downstream exports by implication |
| "A failed nested row rejects the Noether braid" | confuses a stricter case reduction with the base neutral braid case |
| "Simulation found the branch" from a residual decrease or screen | treats diagnostics as proof |
| "Topology determines generation mass" without mass-map rows | replaces energy, exposure, and Noether sea response with a label |
| corpus links to `reference/priorities` | violates corpus self-containment |

Recommended wording for retained-branch caution:

> The current statement is a theorem target. It identifies the rows a retained branch would have to close, but it does not itself claim that such a branch has been retained.

That sentence is allowed in corpus prose when the local section needs a direct warning. It should be replaced by stronger result language only after the certificate rows close.

---

## 5. Blockers And First-Failure Statuses

Promotion should stop at the earliest unresolved row that affects the claim being promoted. The first-failure status travels with the promoted theorem target or keeps the material priority-only.

| Status | Blocks | Meaning |
| --- | --- | --- |
| `claim-level-undeclared` | all promotion | the material does not say whether it is result, target, effective summary, or comparison |
| `corpus-self-containment-failed` | all promotion | the proposed corpus prose requires a priority link or unstated priority context |
| `neutral-base-inventory-open` | neutral braid target/result | six-site inventory, polarity balance, or all ordered source-pair policy is missing |
| `all-pairs-root-ledger-open` | dynamics, validation, action, event, exports | ordered source pairs lack active/excluded/tail causal-root status |
| `jacobian-floor-open` | retained-branch and validation claims | active roots lack positive delay or Jacobian floors |
| `tail-ledger-open` | retained-branch and certified obstruction claims | tail cells are not excluded, assimilated, owned, or carried into error bounds |
| `force-action-ledger-mismatch` | dynamics/action promotion | force, root, support, medium, endpoint, or event conventions differ |
| `dynamics-open` | branch retention | tangential speed, speed-ODE, normal curvature, or support-complete force row is open |
| `finite-mode-convergence-open` | theorem-result promotion | finite-mode data do not yet lift to a curve-level branch or certified obstruction |
| `support-work-open` | shell braid retention | support work is untracked by exact action or event rows |
| `partition-case-open` | nested shell braid promotion | binary partition is missing or not certified |
| `nested-radial-gap-open` | nested shell braid promotion | radial functional, gap margins, or derivative rows are missing |
| `action-noether-open` | action, mass-map, observer export | action exactness, action-derived scale, Noether currents, or Noether sea exchange rows are missing |
| `event-ledger-open` | branch retention and exports | endpoint, source provenance, recoil, boundary exchange, topology-change, or fold-layer rows are missing when needed |
| `stability-open` | retained-branch result | stability class is not supported by variational, monodromy, return-map, or energy rows |
| `observer-export-not_computed` | export result | export row was not computed; base branch claims may still be statused |
| `observer-export-failed` | export result | named export fails on the same branch convention |
| `not-retained` | retained-branch result | at least one required retained-branch row is absent, failed, or only diagnostic |

If a blocker affects only a stricter case, the corpus statement must preserve the surviving broader case. For example, `partition-case-open` blocks nested shell braid language, but it does not block a neutral braid theorem target. `observer-export-not_computed` blocks Lorentz, photon, mass-map, color, strong-field, or cosmology result language, but it does not by itself reject the base branch certificate.

---

## 6. Update Policy After Promotion

After any braid material is promoted into `content/markdown/aaa`, update the source priority packet so future workers do not repeat the same triage.

Required priority-side updates:

1. Add or revise a one-line promotion status near the top of the packet: `promoted`, `partially-promoted`, `deferred-with-blocker`, or `priority-only`.
2. Name the corpus destination in priority prose, using a relative link only from the priority packet if a link is helpful.
3. Record the promoted claim level: `theorem-result`, `theorem-target`, `effective-summary`, or `speculation-comparison`.
4. State the remaining first-failure status, if any.
5. If only a safe theorem-target portion was promoted, preserve the remaining retained-branch burden explicitly.
6. If a priority-list item is completed by the promotion, remove it from the priority list and renumber following items.
7. If the promotion changes the status of a validation row, record whether the promoted row is a residual definition, diagnostic result, certified candidate, certified obstruction, negative result, or export status.

Priority packets should keep operational details, solver schemas, scratch diagnostics, and failed exploratory branches out of the corpus unless they supply a reader-useful theorem target, result, validation criterion, or carefully scoped negative result. A successful promotion reduces ambiguity; it does not erase the priority-side audit trail unless the operator explicitly requests cleanup.

Current decision: `priority-only`. This packet is itself a promotion policy and guardrail. Its mathematical advance is the predicate $\mathrm{Promote}_{\mathrm{corpus}}(M,D)$ and the claim-level/prerequisite ladder above.

Applied 2026-05-22: the policy was applied to one concrete destination, [Noether Braid](../../../content/markdown/aaa/noether-swarm/noether-swarm.md). The promoted material was `theorem-target` retained-branch certificate language plus scoped fixed-speed octahedral negative-result boundaries from [Neutral Braid Master Retention Theorem](neutral-swarm/neutral-swarm-master-retention-theorem.md), [all-pairs-root-ledger.md](neutral-swarm/all-pairs-root-ledger.md), and [Neutral Braid First Execution Ledger](neutral-swarm/neutral-swarm-first-execution-ledger.md). The remaining promotion surface should be a dedicated validation-method destination rather than a broad braid corpus migration while retained-branch, validation, and observer-export rows remain open.
