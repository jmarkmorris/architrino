# CRW-005 Independent Review — Delay Dynamics Energy

## Scope and source identity

This is a report-only independent corpus review for CRW-005. It assesses whether [Delay Dynamics Energy](../../../../content/markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md) correctly frames energy construction for finite-memory delayed dynamics, keeps the action-boundary, work-integral, and boundary-flux routes distinct, preserves the root-resolved work ledger and branch/regulator/boundary requirements, and prohibits observer-level potential energy from entering as a substrate primitive. It is evidence for HQ adjudication, not acceptance, correction, theory closure, or solver certification.

The reviewed source was `content/markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md`, 297 lines and SHA-256 `2d6184d8c36e6dd33149953b381016e764d7486f65f12c46966fbb8636d3d5e8`. The source was byte-stable across the review read and final identity check. The destination was absent before this report was created. The active CRW-005 board listed this chapter as open/unread; no competing report at this exact destination existed at the ownership check.

The review used the current [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), [Energy](../../../../content/markdown/aaa/dynamics/energy.md), [Causal Action Functional](../../../../content/markdown/aaa/dynamics/causal-action-functional.md), [Effective Lagrangian](../../../../content/markdown/aaa/dynamics/effective-lagrangian.md), [Binary Dynamics](../../../../content/markdown/aaa/dynamics/binary-dynamics.md), [Emergence of Structure](../../../../content/markdown/aaa/foundations/emergence-of-structure.md), and [Architrino](../../../../content/markdown/aaa/foundations/architrino.md) owners, together with the current corpus-review procedure and geometry/dynamics review lenses. Standard-physics expressions were used only as explicitly prohibited comparison targets where the chapter itself names them; no observer-level law was used as a substrate premise. The only new numerical check used normalized $c_f=1$.

## Executive disposition

The chapter has the right overall architecture and does not overclaim conservation closure. It explicitly treats the wake-energy term as a same-record construction, retains the root-resolved work ledger before superposition, routes finite-window exchange through a boundary account, states a no-double-counting rule, and rejects observer-level gravitational potential energy as a primitive. Four defects nevertheless prevent the displayed standard from being internally reproducible as written: the action-boundary sign is inconsistent with the current action owner, the action-boundary integral is not restricted to the declared finite-memory state, the conservation residual mixes an acceleration residual with an unweighted energy increment, and the boundary-flux route is not typed or connected consistently to the later boundary terms. Four additional closure obligations remain open, chiefly independent action/Noether construction, finite-regulator root attribution, complete exchange routing, and a lower-bound/sharp-limit result. Two lower-severity editorial/source issues concern notation aliases and terminology/self-contained symbol definitions.

Counts: demonstrated mathematical/bookkeeping defects **4**; open conservation/closure obligations or unsupported generalizations **4**; editorial/source issues **2**; preserved/non-findings **6**.

## Demonstrated mathematical or bookkeeping defects

### DDE-1 — Action-boundary route has an unresolved sign mismatch

- **Severity:** High.
- **Claim grade:** Measured cross-owner inconsistency, with a derived sign consequence.
- **Exact references:** Assigned chapter lines 55–71, especially the positive prefactor at lines 59–67; current [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) lines 4831–4876; current [Effective Lagrangian](../../../../content/markdown/aaa/dynamics/effective-lagrangian.md) lines 527–561.
- **Finding:** The assigned chapter writes the candidate action-boundary term with `+1/2` multiplying the ordered double integral. The current action owner defines the same positive-kernel convention with an outer `-1/2` and states that this sign is required by the action convention and the static like-polarity sign. The assigned chapter says its kernel is chosen by the same action but does not define an opposite-sign kernel. If `\mathcal K^E` means the current owner’s kernel, the two routes disagree on the sign of the interaction charge; this is not merely an unproved conservation claim.
- **Smallest repair or disposition:** Make the chapter inherit the owner’s exact kernel definition and outer sign, or explicitly define `\mathcal K^E` as the negative of that kernel and provide the corresponding static sign derivation. Until one choice is fixed, the action-boundary route remains unusable as a reproducible energy row.
- **Operator-checkable falsifier:** Re-read the live kernel definition at Master Equation lines 4833–4847. A definition showing that the chapter’s `\mathcal K^E` is intentionally the negative of the owner’s kernel, with a rederived static sign and the same acceleration action, would remove this finding; otherwise the displayed sign mismatch remains.

### DDE-2 — The action-boundary candidate is not a functional of the declared finite-memory state

- **Severity:** High.
- **Claim grade:** Measured domain mismatch, with a derived finite-memory consequence.
- **Exact references:** Assigned chapter lines 9–32 declare finite retained history `H_hist`, the finite branch chart, and the state `X_T`; lines 55–71 give the action-boundary integral over `T_t` from `-∞` to `T` and `T_1` from `T` to `∞`; lines 283–291 require a retained history window and memory truncation residual. The current [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) lines 799–814 and 867 identify finite-memory and finite-window leakage as separate admissibility data.
- **Finding:** The promoted functional is introduced as `E_delay[X_T; B, Ω]`, so its available input is the finite segment `X_T`. The action-boundary formula then integrates over unbounded past emissions and unbounded future receptions without an explicit finite-memory support indicator, retained reception horizon, or definition showing that the omitted tails are represented by the listed residuals. The formula therefore cannot be evaluated from the declared finite-memory state as written. Calling the missing contribution “endpoint leakage” later does not define which history rows were discarded or how the future boundary is tied to `H_hist`.
- **Smallest repair or disposition:** Either restrict the action kernel explicitly to the declared retained emission/reception domains and define the associated history-edge terms, or label the untruncated expression as a global action candidate and add a separate finite-memory approximation with an explicit truncation residual and boundary convention. Do not present the unbounded expression as the promoted finite-memory functional without that bridge.
- **Operator-checkable falsifier:** A live owner definition of `\mathcal K^E_{B, H_hist}` with explicit support, finite-window endpoint terms, and a residual that reconstructs the omitted tails from `X_T` would discharge the domain mismatch. No such support declaration appears in the assigned chapter’s action-boundary route.

### DDE-3 — The conservation residual is dimensionally/type ambiguous when `R_i` is an acceleration residual

- **Severity:** High.
- **Claim grade:** Derived dimensional check from the chapter’s own kinetic proxy and the current Energy owner.
- **Exact references:** Assigned chapter lines 34–47 define `K_mu` as a kinetic bookkeeping proxy; lines 219–240 define `R_i` as “the Euler or acceleration residual” and subtract `∫ V_i · R_i dT`; lines 244–275 use that quantity in `epsilon_E`. The current [Energy](../../../../content/markdown/aaa/dynamics/energy.md) lines 128–152 state `dK_mu/dT = mu_arch A · V`.
- **Finding:** If `R_i` is an acceleration residual, `V_i · R_i dT` has velocity-squared units, whereas the change in `K_mu` and the work residual have the additional kinetic weight `mu_arch` (or `mu_K` for a general kinetic scalar). If `R_i` is instead an Euler residual, its type and units are not defined, and the same dot product is not automatically an energy-rate term. The phrase “Euler or acceleration residual” therefore leaves the residual mathematically under-specified and makes the normalized conservation diagnostic non-reproducible.
- **Smallest repair or disposition:** Choose one typed residual. For an acceleration residual, use `mu_arch V_i · R_i^A` for the quadratic proxy or `mu_K(||V_i||) V_i · R_i^A` for the general kinetic scalar. Alternatively define a momentum-weighted residual explicitly and state its units before taking the dot product. Keep Euler residuals as a separate row unless their conversion to power is derived.
- **Operator-checkable falsifier:** A local definition of `R_i` that explicitly includes the kinetic weight and has energy-per-time units would remove the missing-factor objection. Merely calling it an “Euler or acceleration residual” does not.

### DDE-4 — The boundary-flux route is not typed consistently with the wake-energy routes

- **Severity:** Medium.
- **Claim grade:** Measured notation and bookkeeping ambiguity, with an inferred route-separation defect.
- **Exact references:** Assigned chapter lines 51–53 call all three items routes for defining `E_wake`; lines 162–180 provide a balance for an undefined `E_Omega` with `J_E`, `P_ext,Omega`, and `R_E,Omega`; lines 184–215 use `Phi_{∂Omega,E}` in the crosswalk; lines 219–240 instead subtract an undefined `W_{∂Omega}` from the conservation residual. The current [Energy](../../../../content/markdown/aaa/dynamics/energy.md) lines 499–527 distinguishes finite-window energy, total boundary flux, external work, and residual; [Emergence of Structure](../../../../content/markdown/aaa/foundations/emergence-of-structure.md) lines 194–216 uses `W_{∂Omega}` as boundary work.
- **Finding:** The action-boundary and work-integral routes construct or reconstruct an interaction contribution. The boundary-flux equation supplies a finite-window balance, but by itself does not define the wake component of `E_Omega`; it requires a declaration of the retained energy decomposition, initial/reference value, external work, and flux convention. The chapter also does not state whether `W_{∂Omega}` is the same quantity as `Phi_{∂Omega,E}`, its negative, or a separate boundary-work row. Without that typing, a crosswalk can appear to close while the conservation residual either omits or double-counts boundary exchange.
- **Smallest repair or disposition:** Rename the third item as a finite-window balance/reconstruction route, define `E_Omega` in terms of the retained `E_delay` components, and state the sign and relation among `J_E`, `Phi_{∂Omega,E}`, and `W_{∂Omega}`. Explicitly exclude spatial flux from `B_E` if it is carried by `W_{∂Omega}`.
- **Operator-checkable falsifier:** A same-record definition that identifies the three boundary symbols and proves the sign convention on one finite-window ledger would resolve the finding. The current chapter does not provide that identification.

## Open conservation, closure, and unsupported-generalization obligations

### ODE-1 — Root-resolved work ledger still needs an independent finite-regulator certificate

- **Severity:** High.
- **Claim grade:** Open obligation inferred from the chapter’s conditional standard; not a demonstrated defect in the stated requirement.
- **Exact references:** Assigned chapter lines 93–144 define branch power, per-root power, pre-superposition summation, and work reconstruction; lines 283–291 require active roots, inactive gaps, Jacobian and acceleration-weight floors, memory, regulator, and route data. Current [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) lines 480–517 and 775–793 require the transmitter-side root/weight records and regulator recovery.
- **Finding:** The ledger requirement is correctly specified conceptually, but no certified record demonstrates that every finite-`eta` contribution can be partitioned into the displayed root rows without overlap, omission, or fold ambiguity. A mollified finite-width causal surface is not automatically a discrete root sum; the source/root attribution rule, inactive-domain coverage, memory-edge handling, and refinement behavior remain to be supplied on one branch chart.
- **Smallest repair or disposition:** Keep the chapter conditional and require a replayable finite-`eta` ledger that reports root identity, support/partition rule, polarity, emission time or band, `D_t`, `W^acc`, inactive gaps, memory truncation, and independent refinement. Do not treat the scalar branch power as closure evidence by itself.
- **Operator-checkable falsifier:** A same-record finite-`eta` ledger with complete root coverage, an independent root check, and stable refinement of the root-resolved sum would discharge this obligation for that chart only.

### ODE-2 — No action-level or independently derived causal-wake conservation charge has been established

- **Severity:** High.
- **Claim grade:** Open theorem obligation; the chapter correctly grades its displayed routes as candidate or diagnostic.
- **Exact references:** Assigned chapter lines 5, 53, 71, 91, 160, 215, 275, and 293; current [Causal Action Functional](../../../../content/markdown/aaa/dynamics/causal-action-functional.md) lines 183–193 and [Effective Lagrangian](../../../../content/markdown/aaa/dynamics/effective-lagrangian.md) lines 465–597.
- **Finding:** The same action or independently derived causal-wake update must supply the acceleration contribution, wake-energy row, endpoint functional, and boundary convention. The live owners still identify the action scaffold’s variation obstruction and treat the work reconstruction as trajectory bookkeeping. The assigned chapter therefore does not establish a conserved charge, a no-runaway theorem, or equivalence of the three routes.
- **Smallest repair or disposition:** Preserve the conditional wording. HQ should require complete variation on the retained branch, including transmitter variation, admitted self-history, ordered-pair normalization, regulator symmetry, endpoint terms, and a separately derived boundary ledger, before promoting any conservation or no-runaway claim.
- **Operator-checkable falsifier:** A completed independent action/Noether derivation or an independently derived causal-wake update that closes the stated residuals on a certified branch would discharge the obligation at that scope; a zero work residual alone would not.

### ODE-3 — Sea, external, and finite-window exchange channels are not yet closed on the same record

- **Severity:** Medium.
- **Claim grade:** Open ledger obligation inferred from the optional `E_sea` and boundary terms.
- **Exact references:** Assigned chapter lines 34–49 include optional `E_sea,Omega`; lines 162–180 introduce external power and causal-wake flux; lines 219–240 include sea energy, endpoint terms, and boundary work; lines 277–279 state the no-double-counting rule.
- **Finding:** The chapter correctly says that sea degrees of freedom are optional and that boundary exchange may not be hidden, but it does not provide the same-record partition for a case in which `E_sea` is retained. The root-resolved work ledger is architrino-hit based, while medium exchange, external controls, assembly crossings, and wake escapement are named at the balance level. Whether a given contribution belongs in `E_wake`, `E_sea`, `P_ext`, `J_E`, `B_E`, or an outgoing event row remains an unresolved closure question.
- **Smallest repair or disposition:** Require one declared inventory for each retained window that partitions architrino motion, wake history, sea update, external work, mechanical transport, assembly crossings, and outgoing wake/event channels exactly once. Keep the current no-double-counting rule and do not infer closure from naming the channels.
- **Operator-checkable falsifier:** A finite-window ledger whose independently derived rows sum to the same balance with no overlap and stable refinement would discharge this obligation for that window and sea state.

### ODE-4 — Lower-bound, memory-refinement, and sharp-limit conditions remain targets, not results

- **Severity:** Medium.
- **Claim grade:** Open closure obligation; the chapter states the required conditions but supplies no certificate.
- **Exact references:** Assigned chapter lines 215 and 275 require crosswalk refinement; lines 283–293 require memory truncation, regulator, branch floors, boundary rows, and a lower bound; current [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) lines 775–793 and 816–867 separate finite-`eta` admissibility from the sharp limit.
- **Finding:** The chapter’s promotion and failure conditions correctly name a lower bound for no-runaway use and convergence of `epsilon_E` and the crosswalk residual, but no lower-bound construction, memory-tail estimate, `eta`/core-limit theorem, or history-resolution certificate is supplied. The displayed requirements therefore remain closure targets and cannot support a conservation, stability, or no-runaway verdict.
- **Smallest repair or disposition:** Retain the fail-closed disposition. Require the lower-bound proof or bounded certified interval, explicit memory-tail residual, and separate `eta` and `epsilon_c` refinement statements on the same branch before promoting the charge.
- **Operator-checkable falsifier:** An independent lower-bound and refinement packet with stable active-root floors and vanishing declared residuals would discharge the obligation; a smaller plotted residual without those controls would not.

## Editorial and source issues

### EDE-1 — Memory-depth symbols are not explicitly identified

- **Severity:** Medium.
- **Claim grade:** Measured notation ambiguity.
- **Exact references:** Assigned chapter lines 9–16 use `H_hist`; lines 11 and 16 place it in `B` and `X_T`; lines 285–287 switch to `h` and `h_mem` without defining `h = H_hist` or distinguishing the three quantities.
- **Finding:** The chapter uses three memory-depth symbols in the requirements that govern the same finite-memory construction. Current Master Equation notation distinguishes the retained depth `h` from an internal replay margin `h_mem`, but the assigned chapter does not state that correspondence. A reader cannot determine whether the promotion condition is checking the declared `H_hist`, a distinct action-memory horizon, or a smaller replay margin.
- **Smallest repair or disposition:** Declare the aliases and roles in one sentence, for example `h = H_hist` for the retained horizon and `h_mem` for the strict replay margin, or use one canonical retained-depth symbol throughout.
- **Operator-checkable falsifier:** An existing owner contract explicitly mapping `H_hist`, `h`, and `h_mem` for this chapter would remove the ambiguity; no such mapping appears in the assigned source.

### EDE-2 — Boundary and regulator terminology/symbol definitions need a self-contained crosswalk

- **Severity:** Low.
- **Claim grade:** Measured editorial/source issue.
- **Exact references:** Assigned chapter lines 9, 57, 164–180, 184–215, 219–275; current Master Equation lines 654–677 use “causal-wake-surface width,” while the assigned chapter alternates between “causal-surface width,” “causal-delay interaction kernel,” `E_Omega`, `R_E,Omega`, `Phi_{∂Omega,E}`, `W_{∂Omega}`, and `epsilon` without one local notation block.
- **Finding:** The chapter’s concepts are mostly recoverable from owner pages, but its energy standard is not fully self-contained at the exact points where a branch ledger must be reproduced. The terminology should consistently say “causal wake surface” or “causal-wake-surface width,” and the boundary/residual symbols should be mapped locally. This is not a source-support failure for an original derivation; it is a reproducibility and reader-routing issue.
- **Smallest repair or disposition:** Add a compact notation crosswalk or link each symbol to its owning definition, and align the regulator wording with the current causal-wake terminology. Do not introduce `isochron`; it is not needed and is absent from the reviewed chapter.
- **Operator-checkable falsifier:** A refreshed source pass showing a local definition for each symbol and consistent causal-wake terminology would close this editorial issue without changing the mathematics.

## Preserved strengths and non-findings

1. **Energy-construction framing preserved:** Lines 3–5 correctly state that delayed finite-memory dynamics do not inherit a local instantaneous energy merely from time-translation invariance, and require the energy row to use the same causal-history law, regulator, branch chart, and boundary convention.
2. **Root-resolved work ledger preserved:** Lines 93–144 correctly keep transmitter identity, polarity, emission time, Jacobian/acceleration weight, and receiver power before collapsing to branch power. The independent known-case check $V(T)=T$, $A(T)=1$, $c_f=1$, and `mu=1` gave `Delta K=+0.5`, `Delta U=-0.5`, and `Delta(K+U)=0`; this validates only the work-reconstruction identity, not conservation.
3. **Route separation mostly preserved:** Lines 73–91 explicitly call the work-integral route trajectory-local and not an off-shell conserved charge. Lines 162–180 correctly treat boundary flux as finite-window exchange rather than a new substrate field. The issue above is the route typing and symbol connection, not the presence of the distinction.
4. **Branch/regulator requirements preserved:** Lines 283–293 name memory truncation, causal-surface regulator, core cutoff, active/inactive roots, Jacobian and acceleration-weight floors, route, boundary/endpoint rows, crosswalk, and lower-bound conditions. They are requirements, not evidence that those conditions have already closed.
5. **No-double-counting rule preserved:** Lines 277–279 correctly prevent simultaneous counting of equivalent wake, pairwise, sea, or outgoing-ledger content.
6. **Observer-level potential prohibition preserved:** Line 49 correctly treats Newtonian or general-relativistic gravitational potential energy as an effective comparison label requiring same-record reconstruction, not as a primitive term in an $mathbb{A}\mathbb{A}\mathbb{A}$ action. This agrees with the current ontology and Energy owners. The chapter also does not introduce mass, force, spacetime, or conservation as substrate premises.

No numerical instantiation in the reviewed source uses a non-normalized field speed; the report’s only numerical check also used $c_f=1$. No occurrence of the forbidden reader-facing term `isochron` was found in the reviewed source.

## Validation receipt

- **Source identity:** `shasum -a 256 content/markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md` measured SHA-256 `2d6184d8c36e6dd33149953b381016e764d7486f65f12c46966fbb8636d3d5e8`; the final check matched the startup identity. This establishes byte identity only, not mathematical correctness.
- **Ownership/state:** `git --no-optional-locks status --short --untracked-files=all`, the CRW-005 status board, and destination existence check showed the assigned chapter clean at the ownership check, the chapter open/unread, and the requested report destination absent. The checkout had unrelated concurrent edits and reports, which were not staged, modified, or used as acceptance evidence.
- **Content/link/whitespace check:** The pre-write baseline run of `node scripts/validate-content.mjs --check --strict` exited 0 with 0 errors and 0 warnings, auditing 199 indexed Markdown files and 1,634 repository Markdown files. The final run audited 1,638 repository Markdown files and exited 1 on six broken links, all in the concurrently appearing ambient file `reference/priorities/aaa-corpus-rewrite/adjudication-agenda.md`; none named the assigned report. This establishes that the report did not add a validator-reported link error, but the final repository-wide check is not green. Neither run establishes theorem correctness or full TeX semantic correctness.
- **Equation-registry check:** `node scripts/build-equation-mapping-corpus.mjs --check` exited 1 because the generated registry `content/generated/equation-mapping/corpus-equations.json` is stale; it measured 199 Markdown files, 4,661 display equations, 23 promoted equations, and 30,131 symbol definitions. This is a generated-artifact drift result in the ambient checkout, not a defect attributed to the assigned chapter; no regeneration was performed.
- **Independent known-case check:** An in-memory Node calculation with $c_f=1$, $V(T)=T$, $A(T)=1$, and `mu=1` returned `Delta K=0.5`, `Delta U=-0.5`, and `Delta(K+U)=0`. This establishes the sign of the trajectory-local work reconstruction for that elementary case only; it does not validate the delayed action route, root ledger, boundary flux, or conservation claim.
- **TeX/renderer scope:** The in-memory math-preview helper passed a known `$x$` fixture and then rendered the report’s 9 math expressions with no omitted images; no renderer output or generated preview was written. This establishes parse/render success for the report snapshot, not visual inspection or full-corpus KaTeX validity. The equation-registry check reached source enumeration but stopped on generated-registry drift.
- **Report-file checks:** The report contains all requested sections, ten finding records with severity/grade/reference/repair/falsifier fields, separate non-findings and limits, and only relative repository links. A no-output trailing-whitespace scan found no matches; the untracked-file `git diff --no-index --check` form is not reported as a zero exit because it necessarily returns a difference status against `/dev/null`.

## Residual limits

This review does not certify any numerical branch, action, root completeness, conservation law, lower bound, stability result, no-runaway result, or solver output. The action-boundary sign and finite-memory support findings are conditional on the current owner’s stated kernel convention; a future owner-level kernel change would require re-adjudication. The review did not perform a rendered visual inspection, a finite-`eta` root enumeration, a boundary-flux simulation, or an independent nonlocal-action variation. The equation-registry drift was not repaired because generated artifacts are outside this report-only scope.

## Next HQ adjudication boundary

HQ should first decide whether to correct DDE-1 through DDE-4 as chapter-level defects or to assign the shared definitions to their canonical action/energy owners and revise this chapter’s references accordingly. After that decision, the next admissible assurance step is an independent finite-regulator branch packet that closes ODE-1 through ODE-4 on one declared chart. This report authorizes neither source correction nor acceptance; no further work continues in this turn.
