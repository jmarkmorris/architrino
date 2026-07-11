# Independent Audit of the Section 87 Global-Drain Verdict

Date: 2026-07-11  
Verdict: **BARRED-pending-one-clean-cell**  
Claim level: priority-only adversarial audit. Section 87 rejects the tested jh11 cage record and the tested prescribed two-sublattice cell, but it does not prove a theorem-level global **BARRED** result. No retained homogeneous Noether sea state is claimed, no global drain is exhibited, no corpus promotion is authorized, and no score movement follows.

Deciding rule: [Retained-Sea Angular-Momentum Ward Identity and Transport Kernel](retained-sea-angular-momentum-ward-identity-and-transport-kernel.md). Parent rule: [Global Angular-Momentum Drain — Adversarial Feasibility Memo](global-angular-momentum-drain-adversarial-feasibility-memo.md).

## Executive Verdict

Do **not** accept Section 87 as theorem-level global **BARRED**.

The defensible result is narrower:

1. the bare prescribed braid has a convergent, bound far-field reconstruction at the measured seed grade, so this reconstruction exhibits no outgoing isolated-braid wake flux;
2. jh11's half-co-orbiting cage is not a certifiable current because that prescribed record crosses a super-field source-normal caustic and its regularized flux magnitude does not converge;
3. the single tested one-dimensional pro/anti cell at $a_{\mathrm{cell}}=4$ fails its modeled local mechanical rows.

Those results bar two realizations. They do not establish either theorem-level condition in the deciding rule: the Ward identity has not forced $\mathcal K_L(\mathbf k,0)=0$ in **every** admissible retained sea state, and the calculation has not proved that **every** nonzero-current solution necessarily carries an intrinsic pump, secular storage, unbounded energy or angular momentum, or no terminal counter-torque.

## Decision-Rule Audit

The deciding memo requires a same-record microscopic continuity completion,

$$
\partial_T\ell_z^{\mathrm{wake}}
+\partial_iJ^i_{L_z,\mathrm{wake}}
=-s_z^{\mathrm{braid}}-s_z^{\mathrm{pair}}+s_z^{\mathrm{wake,ext}},
$$

followed by a bounded balanced-cell test and, only for a cell that passes, a long-wavelength response calculation. A global **BARRED** verdict requires a universal result over admissible retained sea states. A failed finite cage or one failed model cell is not that quantifier.

Section 87 does not complete this chain. Its Phase 1 evaluates a far-field surface-flux proxy. Its Phase 2 inserts $W_+=W_-=0$ rather than deriving the local wake storage/exchange rows on the cell record. It then evaluates one prescribed geometry. This is enough to reject that geometry but not enough to turn the model-cell counterexample search into a theorem.

## Leg 1 — Bare-Braid Bound Flux Is Solid at Measured Grade; Reactive Storage and $\mathcal K_L(0,0)=0$ Are Not Derived

### What survives audit

For the six prescribed rigid braid sites, `genericFieldClosures` reproduces the algebra used by the Section 82 reconstruction:

$$
\mathbf E_{\mathrm{anti}}
=\mathbf E_{\mathrm{full}}-\mathbf E_{\mathrm{static}},
\qquad
W^{\mathrm{rec}}_{\varepsilon}
=\frac{D_s}{D_s^2+\varepsilon^2}.
$$

The bare regression has small causal-root residuals, bound radial falloff, a small far-field flux relative to the $+0.424$ mechanical pump, and no observed $1/r$ radiation tail. The appropriate claim is therefore:

> On the prescribed bare-braid record and declared stress proxy, the reconstructed far-field wake flux converges at seed grade and vanishes with radius.

### What does not survive audit

`genericFieldClosures` is not yet a general same-record Ward completion for arbitrary moving sources.

- When the causal-root certifier returns more than one active root, the field reconstruction selects only the latest root. The deciding memo requires all active roots from one retained ledger.
- The calculation returns a far-field surface flux but does not construct $\ell_z^{\mathrm{wake}}$, its local time derivative, or the local signed wake transaction that cancels $s_z^{\mathrm{braid}}+s_z^{\mathrm{pair}}$.
- `wardDefectAfterWake` leaves the mechanical source enclosed when the far-field flux vanishes and then classifies that remainder as reactive storage. Vanishing export does not by itself distinguish bounded wake storage from a still-open conservation ledger.
- $\mathcal K_L(0,0)$ is assigned from the bound-flux classification; it is not extracted from the balanced retained-population response with the two orders of limits required by the deciding memo.
- The convergence flag checks the regulator dependence of the falloff slope, one tight-regulator grid refinement, and root residuals. It does not require convergence of the flux magnitude across the regulator sweep. The bare numbers are consistent with convergence, but the guard is not a soft-limit proof.

Accordingly, Leg 1 supports **bound isolated-braid far-field flux at measured grade**, not a theorem that the pump is reactively stored and not a collective $\mathcal K_L(0,0)=0$ result.

## Leg 2 — The Caustic Bars the jh11 Cage Record, Not the Global Route

The $D_s=0$ caustic is physically meaningful for the prescribed jh11 half-co-orbiting record: the equatorial cage motion crosses the field-speed surface, and the regularized flux magnitude grows strongly as the softening is reduced. The reported $-0.65$ therefore cannot be promoted to a regulator-independent transport current.

This is a legitimate **record-specific route-a rejection**. It is not a global **BARRED** contribution. The same existing instrument was audited at lower orbit fractions with the same reduced grids:

| Orbit fraction | Reported maximum cage speed | Wake completion | Antisymmetric soft-sweep ratio | Full-channel soft-sweep ratio |
|---:|---:|---|---:|---:|
| $0.1$ | $0.2423c_f$ | convergent | $1.18$ | $1.12$ |
| $0.2$ | $0.4846c_f$ | convergent | $1.21$ | $1.10$ |
| $0.3$ | $0.7269c_f$ | convergent | $1.26$ | $1.07$ |

Thus a sub-luminal reconstruction is available in the current modeled family. These rows do not establish a drain: they remain prescribed cage records, do not supply a balanced retained cell, and exhibit bound rather than exported far-field flux. They do establish that the non-convergence at `frac=0.5` belongs to that super-field cage geometry rather than to every cage completion.

There is an additional same-record limitation: the cage endpoint position includes the rotating internal dipole offset, while its supplied velocity includes only the cage-center orbital term. The position and velocity functions are therefore not exact derivatives of one another. This does not rescue the half-co-orbiting result; it reinforces the need for a kinematically consistent sub-luminal record before making a theorem claim about the caustic threshold.

## Leg 3 — The Tested Cell Fails, but the Approximately $2\%$ Relay Is Not Fundamental

The $a_{\mathrm{cell}}=4$ result validly rejects that prescribed model cell under its own booked rows:

$$
p_++T_{+\leftarrow-}\ne0,
\qquad
p_-+T_{-\leftarrow+}\ne0.
$$

The stronger inference, “therefore every admissible balanced branch fails,” is unsupported for four independent reasons.

1. **No cell wake completion was computed.** Phase 2 sets $W_+=W_-=0$ using the bare/combined far-field non-export result. A local reactive wake-storage transaction can be nonzero even when the flux at infinity vanishes. The deciding equations require the local $W_\pm$ rows on the same cell record.
2. **Only one spacing and orientation were used for the verdict.** A read-only spacing sweep of the same prescribed two-sublattice model gave cross-hit fractions from $0.0085$ to $1.155$ over $a_{\mathrm{cell}}\in[1,4]$. None of the sampled cells closed both local rows, but the advertised $\approx2\%$ relay is plainly not geometry-invariant. At $a_{\mathrm{cell}}=1.5$, for example, the plus row was near cancellation while the minus row failed strongly; this is evidence of geometry sensitivity, not a universal bound.
3. **The periodic population is truncated.** The calculation includes two neighboring images along one axis and a fixed causal search window. It does not establish convergence of the periodic image sum or cover a non-orbiting axis-reversed lattice, a three-dimensional population, or the four-braid alternating-axis square under its full set of bonds.
4. **The cell is prescribed, not a bounded retained state.** Spin reversal is imposed and the worldlines are not produced by a retained dynamical solution. Failure rejects the prescribed candidate; success would still need retained-state certification.

The Section 8 four-braid square was introduced as a visualization of the doubled two-sublattice model, not as a theorem that every delayed long-range torque and wake transaction is identical to the one-dimensional nearest-image truncation. It remains untested as a full same-record cell.

Leg 3 therefore establishes **current-cell inadmissibility**, not the route-b universal premise.

## Energy Ledger and Terminal Counter-Torque

Their absence does not weaken the rejection of the specific failed cell. If a universal local-admissibility no-go had been proved, the transport, energy, and terminal calculations would be unnecessary.

No such universal no-go was proved. Therefore the omitted rows still matter to the global verdict:

- if a clean balanced cell fails local boundedness under a complete same-record wake and power ledger, that cell family is barred before transport;
- if a clean cell passes, its $\mathcal K_L^{(1)}$ and $\mathcal K_L^{(2)}(0;\Omega,-\Omega)$ must be extracted with both orders of limits;
- if it transports, a localized-pump solve must still exhibit expanding-surface flux, a terminal counter-torque or return branch, and same-record energy export equal to the pump power before the route is **OPEN**.

The missing terminal and energy ledgers therefore prevent an **OPEN** result and remain mandatory after any cell-level admissibility pass. They are not evidence for **BARRED** by omission.

## Exact Remaining Sub-Calculation

The minimum proof-moving calculation is one **kinematically consistent, sub-luminal, convergent balanced-cell Ward solve**:

1. choose a resolved pro/anti or axis-reversed periodic cell, preferably the non-orbiting axis-reversed lattice or the full four-braid alternating-axis square, with $|\mathbf v|<c_f$ for every source and with source velocity equal to the derivative of its worldline;
2. sum every active retained causal root and demonstrate convergence in regulator, time/angular resolution, causal window, and periodic-image radius;
3. compute on that same record every directed torque and power transaction together with signed local wake storage and face-current rows $W_\pm$ and their energy analogues;
4. test separately

   $$
   p_++T_{+\leftarrow-}+W_+=0,
   \qquad
   p_-+T_{-\leftarrow+}+W_-=0,
   $$

   and the cell Ward identity, without importing $W_\pm=0$ from the isolated-braid far field;
5. only if the cell passes, extract $\mathcal K_L^{(1)}$ and $\mathcal K_L^{(2)}(0;\Omega,-\Omega)$ and proceed to the localized-pump, terminal-torque, and energy-ledger solve.

A clean failure would bar that specified balanced-cell family. A theorem-level global **BARRED** result would still require either an analytic bound or a continuation-certified exclusion covering every admissible balanced retained branch. Conversely, one clean passing cell would refute the intrinsic-pump universal claim and reopen the conditional transport route.

## Final Claim Map

| Claim | Audit disposition | Claim level |
|---|---|---|
| Bare prescribed braid has no measured far-field wake export | Accepted | seed-grade reconstruction measurement |
| Bare $+0.424$ pump is proved reactively stored | Not established | inference pending local wake-density continuity |
| $\mathcal K_L(0,0)=0$ for the retained sea | Not established | balanced-population response not computed |
| jh11 half-co-orbiting $-0.65$ is a certified current | Rejected | regulator-non-convergent super-field record |
| $D_s=0$ bars every cage completion | Rejected | geometry-specific caustic; sub-luminal modeled rows converge |
| The $a_{\mathrm{cell}}=4$ prescribed cell is admissible | Rejected | both booked local rows fail |
| Every admissible balanced branch is intrinsically pumped | Not established | one geometry, assumed zero wake rows, no continuation proof |
| Theorem-level global **BARRED** | Rejected | universal decision-rule quantifier unmet |
| **BARRED-pending-one-clean-cell** | Accepted | fail-closed priority verdict |

## Promotion Disposition

- Classification: **priority-only**.
- Promotion: **defer with blocker**.
- No change to the deciding memo, scripts, solver, generators, or reader-facing canon is authorized by this audit.
- Section 87 remains useful as a rejection of the jh11 super-field cage and the tested $a_{\mathrm{cell}}=4$ prescribed cell, but its global language must not be treated as theorem-level evidence.

Closure goal: compute one sub-luminal balanced cell's complete same-record angular-momentum and energy Ward rows, then either continue the admissible cell family to a universal no-go or extract its transport kernel and terminal ledger.
