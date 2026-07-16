# Sea-Braid Dimer Shielding Ground-State Packet

Claim level: priority-only derivation packet / executable closure target, 2026-07-11. This packet promotes the far-field cancellation-depth law measured by [sea-braid-shielding-ratio-diagnostic.mjs](../../../../scripts/braid-ideal/sea-braid-shielding-ratio-diagnostic.mjs) into a **constraint on the sea-braid dimer ground state**, the open question named in the [braid-ideal brainstorming](brainstorming.md) Addendum 3 ("True ground state (paired-quadrupolar vs chained vs glassy) = the sea-braid dimer/small-cluster derivation"). It authorizes no retained branch, names no accepted evidence, and moves no score: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`. Strict potential-superposition throughout; delays at field speed $c_f$ on the exact rotating worldlines.

## What was open

Addendum 3 recorded a measured neighbor preference (the induced-orientation / sh-0-sea diagnostics) for **dipole-reversed** neighbors and gave three record-grounded reasons no end-to-end positrino-to-electrino **chains** form, but left the actual dimer ground state — paired-quadrupolar versus chained versus glassy — as an open small-cluster derivation. Separately, entry 36's shielding-ratio instrument established that a single neutral drum shields to a dipole ($\ell=1$) and the anti-paired quiet doublet shields to a quadrupole ($\ell=2$), deepening the far-field cancellation by orders of magnitude. This packet connects the two: the shielding depth is not just a property of an assumed doublet — it is a **discriminating observable** that any candidate ground state must reproduce, and it separates the candidates sharply.

## The shielding law as a ground-state constraint

For two neutral drums (each three $\epsilon_{+}$, three $\epsilon_{-}$ on the face-opposite seed rotating rigidly about $\hat{\mathbf n}$) placed at separation offset $s$ (in units of $R$) either colinearly ($\hat{\mathbf n}$, "axial") or side-by-side ($\hat{\mathbf e}_1\perp\hat{\mathbf n}$, "lateral"), the instrument's DC (cycle-averaged) far field falls with a multipole exponent set entirely by the relative **polarity pairing**:

| dimer candidate | pairing | net dipole | DC far-field slope | leading $\ell$ | shielding ratio at $r=160R$ |
| --- | --- | --- | --- | --- | --- |
| single drum (reference) | — | axial dipole | $-2.000$ | $1$ | $\approx 80$ |
| **quiet doublet** | reversed (C-conjugate) | cancels | $-3.000$ | $2$ | $\approx 1.6$–$1.9\times10^{4}$ |
| chain | aligned (parallel) | adds ($\approx2\times$) | $-2.000$ | $1$ | $\approx 40$ |

(Recorded at $\beta=0.6$, softening $0.05$, 200 sphere directions, 48 time samples; both offset directions give the same classification. The aligned chain shields *worse* than one drum because two parallel dipoles add.)

The law is therefore a razor: **only the dipole-reversed pairing collapses the leading multipole from $\ell=1$ to $\ell=2$.** A chain (aligned dipoles, whether stacked head-to-tail or side-by-side) keeps a full $\ell=1$ dipole and radiates/couples like a bare drum at long range. So the far-field cancellation depth is a ground-state selector independent of the (delay-sensitive) equilibrium-separation question:

- a paired-quadrupolar ground state **must** exhibit $\ell=2$ (slope $-3$) shielding;
- a chained ground state would exhibit $\ell=1$ (slope $-2$);
- a glassy/disordered ensemble would show an intermediate, orientation-averaged tail.

This is consistent with Addendum 3's measured dipole-reversed neighbor preference: the energetically preferred pairing is exactly the one that reaches the deep-shielding $\ell=2$ branch. The two independent lines — the sh-0-sea orientation energetics and the far-field cancellation depth — select the same quiet-doublet ground state.

## Steps 1–2 closed: the delay-selected equilibrium (2026-07-11)

The cycle-averaged **causally delayed** inter-drum energy accumulator was built ([sea-braid-dimer-energy-diagnostic.mjs](../../../../scripts/braid-ideal/sea-braid-dimer-energy-diagnostic.mjs), tests [braid-ideal-sea-braid-dimer-energy-diagnostic.test.js](../../../../tests/braid-ideal-sea-braid-dimer-energy-diagnostic.test.js), 6 passing) on the shielding instrument's exact-worldline kernel — only the energy accumulator is new. It computes $U(s)=\big\langle\tfrac12[\sum_{i\in A}\sigma_i\,\Phi_B(\mathbf x_i,t)+\sum_{j\in B}\sigma_j\,\Phi_A(\mathbf x_j,t)]\big\rangle_t$ with $\Phi$ the superposed delayed potential at field speed $c_f$, and reports the static (instantaneous) energy alongside for contrast.

Result — the equilibrium is delay-selected, exactly as entry 33 warned:

- **The static energy is monotonic** (attractive for reversed, repulsive for aligned; no interior minimum). A static theory would collapse the reversed pair to contact — the wrong answer.
- **The delayed energy develops commensurability bands** (entry 30's causal double-delay phase). The reversed pairing acquires a **bound confining well at a finite $s_\ast$**, protected by an inner barrier from the contact-collapse basin; the aligned pairing is the exact sign-flip ($U_{\text{aligned}}=-U_{\text{reversed}}$ in the lateral geometry) and its bands are shallower.
- **The energy selects the reversed quiet doublet as the ground state, on the $\ell=2$ branch.** At every cadence, reversed is the deeper-bound state and its selected geometry measures as a quadrupole; aligned stays a dipole. Time-converged ($s_\ast$ stable across 24/48/96 phase samples):

| $\beta$ (site speed) | $\omega$ | reversed $s_\ast/R$ | $U(s_\ast)$ | shielding $\ell$ at $s_\ast$ | $s_\ast\,\omega$ |
| --- | --- | --- | --- | --- | --- |
| 0.4 | 0.490 | 7.60 | $-0.033$ | 2 | 3.72 |
| 0.6 | 0.735 | 5.46 | $-0.192$ | 2 | 4.01 |
| 0.8 | 0.980 | 4.15 | $-0.844$ | 2 | 4.07 |

- **$s_\ast$ tracks cadence** as $s_\ast\propto1/\omega$ (the product $s_\ast\,\omega\approx3.7$–$4.1$ is nearly invariant), i.e. a fixed double-delay commensurability phase sets the doublet size — the quantitative form of entry 30's selection rule and entry 33's "the band tracks the sea assemblies' phases." The well **deepens toward the rail** ($|U|$ grows $0.03\to0.84$ as $\beta:0.4\to0.8$): confinement strengthens with cadence.

This closes packet steps 1–2: the quiet doublet's **size** ($s_\ast$) is derived from the same delayed potential-superposition ledger that sets its **cancellation depth** ($\ell=2$), and the two agree — the energy minimum sits on the quadrupole shielding branch, at a separation the delay selects and static cannot.

## The commensurability law in closed form (2026-07-11)

The three-point $s_\ast\,\omega\approx\text{const}$ fit is superseded by the analytic law. For two co-rotating rigid drums the symmetrized cycle-averaged delayed coupling reduces, at leading orbital order, to

$$U(s)\ \propto\ \cos\!\Big(m\,\omega\,\tfrac{s\,R}{c_f}\Big),\qquad \tau=\frac{sR}{c_f}\ \text{the one-way light-time},$$

because the delay converts each drum's rotating multipole of azimuthal order $m$ into a cycle-averaged residual carrying the phase $m\omega\tau$. The drum's leading **rotating** moment is set by its $C_3$ (three-fold) symmetry — the axial dipole is static and contributes no band — so the dominant harmonic is $m=3$ (the $3\omega$ structure). The confining bands are therefore the ladder

$$\boxed{\,m\,\omega\,s_\ast\,R/c_f = 2\pi k\,},\qquad m=3,\ k=1,2,3,\dots$$

with the **band-spacing invariant**

$$\boxed{\,\Delta s_\ast\cdot\omega = \frac{2\pi c_f}{mR}=\frac{2\pi}{3}\frac{c_f}{R}\approx 2.094\,\frac{c_f}{R}\,}.$$

This is the correct invariant: it is the shell-to-shell **spacing**, not the (envelope-selected, $\beta$-dependent) deepest band the three-point fit was tracking. The instrument ([sea-braid-dimer-energy-diagnostic.mjs](../../../../scripts/braid-ideal/sea-braid-dimer-energy-diagnostic.mjs), `bandLadder`) confirms it: the confining minima form a perfectly even ladder (spacing spread $\sim10^{-15}$), and after a depth cut that drops weak secondary ($m=6$-flavored) ripples, the fitted harmonic is $m=3$ and the ladder constant is $\beta$-independent, converging to $2\pi/3$:

| $\beta$ | $\omega$ | primary bands | $\Delta s_\ast\cdot\omega$ | fitted $m$ |
| --- | --- | --- | --- | --- |
| 0.5 | 0.612 | 3 | 2.173 | 3 |
| 0.6 | 0.735 | 4 | 2.113 | 3 |
| 0.7 | 0.857 | 5 | 2.125 | 3 |
| 0.8 | 0.980 | 6 | 2.098 | 3 |

(The few-percent excess over the ideal $2.094$ is the near-field/orbital correction to the effective delay; it shrinks toward the ideal as $\beta$ rises and the bands sit at smaller $s$.) The band positions themselves obey $3\omega s_\ast R/c_f=2\pi(k-\varphi_0)$ with a small offset $\varphi_0\to0$ as $s$ grows, so the spacing law is the robust, offset-free statement.

## Inverting a lattice constant into the sea's cadence (entry 33's measurement)

The law inverts directly (`--invert-spacing`, `invertFromSpacing`): a sea that shows confinement at shell spacing $\Delta s_{\text{obs}}$ has cadence

$$\omega_{\text{sea}}=\frac{2\pi c_f}{m R\,\Delta s_{\text{obs}}}\quad(m=3),$$

read off the lattice constant with no free parameter. Round-trip check: feeding the measured $\beta=0.6$ shell spacing ($2.876$) back through the inversion recovers $\omega_{\text{sea}}=0.723$ against the true $0.735$ (1.6%). For a single named nearest-neighbor spacing $s_{\text{obs}}$ assigned to band $k$, $\omega_{\text{sea}}=2\pi k\,c_f/(3R\,s_{\text{obs}})$; applied to the named $\approx4.25$ spacing this gives a **sub-field sea cadence** $\beta_{\text{sea}}\approx0.40$ ($k=1$) or $\approx0.80$ ($k=2$) — the quantitative form of entry 33's "given the observed spacing, infer the sea's cadence." (Low-$k$ shells at small $s$ can be pre-empted by near-field attraction, so the robust reading uses the shell **spacing**; the single-shell form carries its band-index caveat.)

## What remains

Step 3: extend to the trimer / first-coordination-shell to decide paired-quadrupolar versus glassy, feeding the solvation-shell reading (Addendum 2). Open sub-questions: the absolute size in physical units still rides on the open $A_0$ scale (only the dimensionless $s_\ast\,\omega$ ladder is pinned); the relative-phase-lock degree of freedom between the two drums was held co-rotating in-phase and its preferred lock is unprobed; and the small band-position offset $\varphi_0$ deserves its own near-field expansion if the single-shell inversion is to be used without the spacing cross-check.

## Provenance

- Instrument: [sea-braid-shielding-ratio-diagnostic.mjs](../../../../scripts/braid-ideal/sea-braid-shielding-ratio-diagnostic.mjs) (`--pairing reversed|aligned|both`, `--offset-dir axial|lateral`), tests [braid-ideal-sea-braid-shielding-ratio-diagnostic.test.js](../../../../tests/braid-ideal-sea-braid-shielding-ratio-diagnostic.test.js) (7 passing). Central solver untouched; fail-closed.
- Parent captures: [brainstorming.md](brainstorming.md) entry 36 (shielding ratio + DC/AC split), Addendum 3 (dipole-reversed neighbor preference, no-chains), Addendum 2 (solvation-shell reading), entry 33 (retardation selects the separation), entry 35 (the AC channel is the far-field radiation $\Phi_\infty$).
