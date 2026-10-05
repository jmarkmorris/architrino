# Darwin lane: common brief for every worker

Principal Investigator: `darwin-overnight PI` (Claude, Fable 5.1, high reasoning effort). Run clock: start 2026-10-05T12:50Z, final-hour freeze 19:50Z, deadline 20:50Z. The launch prompt is the section "Darwin launch prompt (Claude, selected 2026-10-05)" at the end of `reference/priorities/master-equation-closure/brainstorming.md`; the shared contract is the section "Proposed ten-hour Maxwell and Weber investigations" in the same file (lines 465–527). Read both before working. This brief restates nothing that overrides them; it fixes the law, the domains, the evidence rules and the file scopes so every worker uses the same ones.

Paths. For the Read/Write/Edit/Glob/Grep tools the repository is `/Users/markmorris/vibe/architrino`. Inside `mcp__workspace__bash` it is `/sessions/upbeat-blissful-allen/mnt/architrino`. Each bash call is independent; always use absolute paths. `node` is v22 and is available in bash.

## 1. The frozen law

Members $i=1,\dots,N$ have present positions $\mathbf X_i(T)\in\mathbb R^3$ and velocities $\mathbf V_i=d\mathbf X_i/dT$ in Euclidean space with absolute time $T$. Present-position pair quantities are $r_{ij}=\|\mathbf X_i-\mathbf X_j\|$ and $\mathbf e_{ij}=(\mathbf X_i-\mathbf X_j)/r_{ij}$ (so $\mathbf e_{ji}=-\mathbf e_{ij}$ and both velocity terms are symmetric in $i\leftrightarrow j$). Polarity sign $\sigma_{ij}=\operatorname{sign}(q_iq_j)$: $\sigma=+1$ same polarity (repulsive pair term), $\sigma=-1$ opposite polarity (attractive pair term). Coupling $K_{ij}=K=1$ for every pair, wake speed $c_f=1$. The functional, exactly as boxed in Section 10 of `reference/priorities/master-equation-closure/equation-variants/manuscript.md`:

$$
\mathcal L_{\mathrm D}=\frac12\sum_i\|\mathbf V_i\|^2-\sum_{i<j}\frac{\sigma_{ij}K_{ij}}{r_{ij}}+\sum_{i<j}\frac{\sigma_{ij}K_{ij}}{2c_f^2r_{ij}}\left[\mathbf V_i\cdot\mathbf V_j+(\mathbf V_i\cdot\mathbf e_{ij})(\mathbf V_j\cdot\mathbf e_{ij})\right],
\qquad
\frac{d}{dT}\frac{\partial\mathcal L_{\mathrm D}}{\partial\mathbf V_i}=\frac{\partial\mathcal L_{\mathrm D}}{\partial\mathbf X_i}.
$$

Fixed selections (no worker may change any of these): unit weights in the quadratic velocity term; inverse-distance pair term; velocity-coupling factor exactly $1/(2c_f^2)$; no historical kinetic correction; instantaneous present-position support (no causal delays anywhere); $c_f=1$; $K=1$ for every pair; the Euler–Lagrange line above defines implicit acceleration equations (the velocity Hessian of $\mathcal L_{\mathrm D}$ multiplies the acceleration vector; it must be solved, not assumed diagonal). The quadratic velocity term is a selected mathematical normalization, not a mass; architrinos have no mass, and the law gives acceleration, not force. Use the words acceleration, unit weight, velocity Hessian, acceleration matrix. Do not write force, mass, inertia as physical statements; do not use the word retarded or its variants anywhere.

Units. With $K=c_f=1$ the length unit is $K/c_f^2$ and the time unit is $K/c_f^3$; speeds are fractions of $c_f$. The dimensionless interaction parameter is $\epsilon_{ij}=K/(c_f^2 r_{ij})=1/r_{ij}$.

Polarity cases. Opposite polarity ($\sigma=-1$) is the target. Same polarity ($\sigma=+1$) is a control. Keep their coefficients and any singular loci separate; never let a result for one be reported as a result for the other.

## 2. Domains

Declared approximation domain of the comparison (from Section 10): slow, $\|\mathbf V_i\|\ll c_f$ for every member, and weak, $K/(c_f^2r_{ij})\ll1$ for every pair. Both must hold. A history that leaves this domain is still a history of the adapted law; a result there is a statement about the adapted law, not about Darwin's approximation. The instrument must therefore keep running past the domain boundary when asked, while recording the crossing as an event.

For every history record: the supremum over the history and over members of $\|\mathbf V_i\|$, and the maximum over the history and pairs of $K/(c_f^2r_{ij})$. Provisional declared bounds for approximation-domain event detection in round 1 are speed $0.1$ and $K/(c_f^2 r)=0.05$; the preregistration will freeze the final values and the instrument must take them as parameters.

Speed labels. Three labels receive a coverage entry for every history: unrestricted ($\mathbf V_i\in\mathbb R^3$), inclusive ceiling ($\|\mathbf V_i\|\le c_f$), strict ceiling ($\|\mathbf V_i\|<c_f$). This law has no boundary response, so a history whose speed never reaches $c_f$ supports all three labels on its whole interval; a crossing of $c_f$ is an event to record, after which only the unrestricted label applies. A domain ceiling does not modify acceleration. No velocity clamp, projection, braking multiplier, softened core, root deletion, impulse or self response is selected.

## 3. Evidence rules (binding on every claim in every file you write)

1. Grade every claim where it is made: derived (checkable derivation from the frozen law), measured (names its instrument and what that instrument can establish), inferred (needs further proof or test), guessed. A measured claim names the file and settings that produced it.
2. Instrument order is fixed: before any target use, run the instrument on a case whose answer is known independently, record that pass with its numbers in the working record and the receipt, then run the target. An instrument that has not passed a known case has no results.
3. Known cases available to everyone: (a) the zero-coupling control, obtained by deleting the velocity-coupling term only (keep the inverse-distance term), is the instantaneous inverse-square two-weight problem with closed-form circular orbits, Kepler-type period and radial free-fall time; (b) the uncoupled free member ($K=0$ entirely) moves in a straight line; (c) exact invariants of the frozen law itself, once derived, are a necessary check but never a sufficient one; (d) a closed-form circular solution of the frozen law, if one is derived, with its residual computed in Node from the formula.
4. Separate four statements and never let one stand in for another: exact solution (a configuration satisfying the full equations), local linear stability (a spectrum about an exact solution only; never linearize about a non-solution), finite numerical survival (a measured interval result), global persistence (a theorem or nothing). "Bounded for the integration interval" is a measured interval claim.
5. Invariants of this functional (energy-like function, generalized momentum sum, angular momentum) are invariants of an adapted law, not physical energy, momentum or angular-momentum accounts. Say so where you state them.
6. Every claim carries its falsifier in checkable terms: what observation, and in which file, would overturn it.
7. Agreement is evidence only between independent sides. Replay of your own code, or agreement with a worker you have read, is not independent. The independent reference worker is blind to the subject workers; subject workers do not read the reference files. Do not read any file whose name you are not told to read.
8. Repository-state claims carry their command and scope in the same sentence.
9. Any numerical value offered as a prediction carries at least 10 significant digits and the script that produced it.

## 4. Tool rules

- Node.js only (`node` v22 in bash). No Python of any kind, including system `python3`. No Git commands that write (no add, commit, stash, checkout, etc.); `git --no-optional-locks status` and `git diff` are permitted for inspection only.
- No browser tools of any kind (no `claude-in-chrome`, `Claude_Browser`, `computer-use`). The only internet access is `mcp__workspace__web_fetch`, and only the source worker uses it. Never ask the operator for internet or browser permission; if a fetch fails, record the failure and continue.
- No Artifact, docs, Gmail or memory tools. Write plain Markdown and `.mjs` files with the Write/Edit tools; write JSON receipts with Node.
- Do not launch sub-agents. Do the work yourself.
- Do not read or change any file whose name contains `weber-overnight` or `maxwell`, and do not use Weber or Maxwell results as premises.
- Do not edit any shared document: no geometry manuscripts, no Section 10, no registry, no findings ledger, no priorities, work queue, work log or brainstorming files. Codex owns shared-document integration. If you believe a shared document needs a change, write the proposed change into your own file under a heading "Propagation list" and stop there.

## 5. Forbidden moves

- No causal delays. The law is instantaneous by selection.
- No fitting: no coefficient, coupling, weight or exponent is tuned to obtain binding or any other outcome. Any other coefficient is a different case and is out of scope.
- No kinetic correction is restored.
- No branch switching across a singular acceleration matrix: when the velocity Hessian is singular or its condition number exceeds the declared threshold, the history ends with an obstruction event. Do not regularize, pseudo-invert, continue by another branch or step over it.
- No velocity clamp, projection or domain enforcement that changes acceleration.
- No reading of other workers' files beyond those your assignment names.

## 6. File scopes (disjoint; each file has exactly one write owner)

Relative to `reference/priorities/master-equation-closure/`:

| Worker | Write scope |
| --- | --- |
| `darwin-overnight reduction` (lens `emmy-noether`) | `binary-research/analysis/darwin-overnight-investigation.md`, `collinear-research/analysis/darwin-overnight-collinear-approach.md`, scratch `.tmp/darwin-overnight/reduction/` (Node spot-check scripts live there; a prediction script that must be retained goes to `binary-research/evidence/darwin-overnight-reduction-predictions.mjs`) |
| `darwin-overnight instrument` (lens `henri-poincare`) | `binary-research/evidence/darwin-overnight-pair-instrument.mjs`, `binary-research/evidence/darwin-overnight-pair-instrument-controls.json`, `binary-research/evidence/darwin-overnight-pair-instrument.md`, scratch `.tmp/darwin-overnight/instrument/`, runtime `.local-data/master-equation-closure/darwin-overnight/instrument/` |
| `darwin-overnight reference` (lens `ramon-e-moore`) | `binary-research/analysis/darwin-overnight-independent-adjudication.md`, `binary-research/evidence/darwin-overnight-independent-reference.mjs`, `binary-research/evidence/darwin-overnight-independent-reference-controls.json`, scratch `.tmp/darwin-overnight/reference/`, runtime `.local-data/master-equation-closure/darwin-overnight/reference/` |
| `darwin-overnight source` | read-only in the repository; scratch `.tmp/darwin-overnight/source/` only |
| PI | `.tmp/darwin-overnight/pi/`, `binary-research/analysis/darwin-overnight-preregistration.md`, PI-labelled notes in the investigation file's adjudication and source sections |

Scratch: `.tmp/darwin-overnight/<worker>/` (repository-relative; create it). Runtime output: `.local-data/master-equation-closure/darwin-overnight/<worker>/` (ignored by Git; bulky JSON goes here, never into `evidence/`). Keep evidence files compact: scripts, small control receipts, and Markdown.

## 7. Writing

Academic style for durable Markdown (`content/markdown/aaa/archie/academic-style-guide.md` governs; you need not read it in full: define symbols at first use, one paragraph per idea, no hedging filler, no checklists in explanatory prose, `$...$` inline math and `$$...$$` display math, one paragraph per physical source line, relative links). Every durable Markdown file begins with a status block: run, worker, lens, UTC start and end of the work, claim grade summary, and what remains open. Keep operational notes (decisions, blockers, to-do) in a clearly separated section after the academic treatment.

## 8. Return form and time limit

Return to the PI, in under 700 words: derived findings; measured findings (with the known-case pass stated first); inferences; proposals; unresolved questions and falsifiers; exact files written; validation run (`node <file>` commands and their outcome); blockers; whether work continues and from which file a resumer should start. Hard time limit: stated in your assignment. Return before the limit even if work remains, with your files left in a resumable state and the status block saying what is done and what is not.
