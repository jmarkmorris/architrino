Closure goal:
Record the wake-reception research findings about the independent causal wake-state route, and route every surviving result to an exact corpus or priority destination.

# Wake Reception Transfer, Motion Accounts, and Coincident-Birth Maturity: Research Findings and Proposed Changes

## Research framing and authority

- **Date:** 2026-07-28
- **Artifact type:** research findings and proposed changes
- **Owning object:** `causal_wake_update_law` (MEC-002), local rank `1` of the
  Master-Equation closure workstream, rank `3` program-wide.
- **Research lens:** analysis and well-posedness of reception transfer,
  account measures, and coincident-root birth. The filename is an internal
  routing label, not an attribution to Terence Tao or any other external
  human.
- **Claim level:** `priority-only`. It proposes changes; it makes none. No
  ontology change, no Master Equation change, and no terminology change is
  applied here.
- **Net effect on the blocker:** MEC-002 is **sharpened, not advanced**. The
  account densities are pinned to two constants; a missing object not previously
  on the list is identified and named; and the three natural ways of supplying
  that object are all eliminated. The route is not closed, but its remaining
  freedom is now a single undeclared constant rather than an open field.

Plainly: the useful outcome is a clean elimination. We can now say exactly what
is missing and exactly why the obvious ways of supplying it fail, which is worth
more than the partial positive result an earlier draft of this document claimed.

The directly amended packets are [Independent Causal Wake-State Minimum and
Obstruction](../../../priorities/master-equation-closure/analysis-independent-causal-wake-state.md),
[Independent Causal Wake-State
Closure](../../../priorities/master-equation-closure/independent-causal-wake-state-closure.md),
and [Characteristic-Tail Action
Repair](../../../priorities/master-equation-closure/characteristic-tail.md). The
corpus destinations are the state-reduction section and the receiver-turning
section of the [Master
Equation](../../../../content/markdown/aaa/dynamics/master-equation.md).

### Relation to the parallel research packet

A second analysis of the same owning object is
recorded in [Causal Wake-State Closure: Research Findings and Proposed
Incorporation](terence-tao-causal-wake-state-closure-research-findings-and-proposed-incorporation-2026-07-28.md).
Overlap is **corroboration, not independent physical evidence**. Two of its
results are adopted here and supersede earlier positions:

- The necessity direction of $M=O(T^{2+\delta})$ is **false**. The sharp
  condition is $\int_0^LM(T)T^{-3}\,dT<\infty$, with a narrow-spike
  counterexample and the monotone counterexample $M(T)=T^2/\log^2(eL/T)$.
- Its linear-$P$ theorem states the oblique-pair hypothesis that F4 leaves
  implicit, and records that $P'(s)=K'(s)/s$ is **already live** in the Energy
  chapter, so that relation is a duplicate rather than a new derivation.

---

## 1. Finding in plain language

1. The account densities are **dimensionally unique up to two positive
   constants**. No free function, no dimensionless group. If the constants are
   equal, $\boldsymbol\pi=(e/c_f)\boldsymbol\omega$ emerges rather than being
   assumed.
2. Under the promoted isotropic label an un-intercepted shell carries **zero net
   momentum and zero net angular momentum**, and there is **no intrinsic wake
   spin**. The entire wake momentum budget is reception-generated.
3. The object missing from the packet's list is an **allocation rule**: how much
   of a shell's stored account a single reception may claim.
4. **All three natural allocation rules are eliminated** — by measure count, by
   a double-drain counterexample, and by promoted canon respectively. A maturity
   law therefore cannot be derived from an emission capacity; it requires a new
   declared angular-allocation constant.
5. Coincident same-transmitter birth on the exact quadratic control is exactly
   the event $\|\mathbf V\|=c_f$, with an exact local normal form and the
   playback identity $dT_e/dT_r=-1$.
6. Regulator-path independence **holds at impulse level** for non-negative $M$
   within dominated regulator classes. What remains open is uniqueness of the
   nonlinear post-birth continuation, which integrability cannot supply.
7. If an allocation postulate is ever adopted, it predicts a **separation floor**
   $r_*\propto z^{-1/2}$ at classical-radius scale — a testable consequence, not
   a convention.

Plainly: an earlier draft claimed the suppression law near self-hit birth had
become derivable. That claim is withdrawn. Every way of turning a finite energy
budget into a suppression factor either yields nothing, contradicts the theory's
own insistence on direction-resolved wake state, or contradicts a rule already
written into the canonical dynamics chapter.

---

## 2. Verified results

Each was re-derived from the promoted material before acceptance. `Sources`
records corroboration versus single-sourcing.

### F1 — Exact quadratic self-hit normal form

On $\mathbf X(T)=\mathbf X_0+\mathbf V_0T+\tfrac12\mathbf A_0T^2$, with
$s=T_r-T_e$ and $T_m=\tfrac12(T_r+T_e)$,

$$
\mathbf X(T_r)-\mathbf X(T_e)
=
\mathbf V_0s+\tfrac12\mathbf A_0\left(T_r^2-T_e^2\right)
=
s\,\mathbf V(T_m).
$$

Plainly: on a path with constant acceleration, the straight-line gap between two
moments equals the elapsed time times the velocity at the *midpoint* between
them. Exact, not an approximation.

The self-hit condition $\|\mathbf X(T_r)-\mathbf X(T_e)\|=c_fs$ therefore reduces
exactly to $\|\mathbf V(T_m)\|=c_f$.

Plainly: a carrier catches its own wake exactly when its midpoint-time speed
equals the wake speed. Coincident birth is a speed-crossing event, not a separate
geometric coincidence.

With $g(T)=\|\mathbf V(T)\|-c_f$ having a simple zero at $T_c$, $g'(T_c)\ne0$,
and $\tau=T_r-T_c$:

$$
s=2\tau,
\quad
r=2c_f\tau,
\quad
\hat{\mathbf r}=\hat{\mathbf V}(T_c),
\quad
D_t=\tau g'(T_c),
\quad
D_r=-\tau g'(T_c),
\quad
\frac{dT_e}{dT_r}=-1,
$$

$$
\left\|\mathbf A_{ii}\right\|
=
\frac{\kappa q^2c_f}{r^2\left|D_t\right|}
=
\frac{\kappa q^2}{4c_f\left|g'(T_c)\right|\,\tau^3}.
$$

Plainly: approaching birth, separation and transmitter-side conditioning both
shrink in proportion to the time remaining; the branch runs backward through
source time at exactly unit rate; and the divergence is the $T^{-3}$ the owning
packet asserts, now with its prefactor.

Because $z=|g'|\tau/c_f$ is linear in $\tau$, conditions in $\tau$ and in $z$ are
equivalent on this family — an equivalence the packet assumes without proof.

- **Research status:** multiply derived within the bounded analyses, including
  an independent $z=(\alpha/c_f)T$ derivation.
- **Numerically confirmed 2026-07-28** on a random 3D quadratic control at
  $c_f=1$: the midpoint identity holds to $3.6\times10^{-15}$ over $2\times10^5$
  random time pairs; birth lands at $\|\mathbf V(T_c)\|=1.000000000000000$; and
  over $\tau\in[10^{-4},10^{-1}]$ the ratios $r/(2c_f\tau)$, $D_t/(\tau g')$,
  $D_r/D_t$, and $\|\mathbf A_{ii}\|$ against the displayed prefactor all agree
  to nine digits or better. The playback value was obtained by **independently
  re-solving the causal root** at $T_r\pm d$ and finite-differencing, not by
  substituting the identity, so it is a genuine check rather than a tautology.
  Below $\tau\approx10^{-5}$ agreement degrades to $10^{-6}$–$10^{-3}$ from
  conditioning in the root solve at $r\sim2\times10^{-5}$, not from failure of
  the identity.
- **Claim grade:** derived, exact on the quadratic control, and numerically
  confirmed on the stated range. Genericity of $r\propto z$ on other controls is
  **not** established.
- **Falsifier:** a control with $r\propto z^p$, $p\ne1$, changes the weighted
  condition; a cubic control settles it.
- **Destination:** owning packet §3.

### F2 — The account densities are dimensionally unique

From $[\mathbf A]=LT^{-2}$ and $[c_f/(r^2|D_t|)]=L^{-2}$ — the transmitter-side
factor is itself a speed and carries units — we get $[\kappa q^2]=L^3T^{-2}$,
hence $[\kappa]=L^3T^{-2}Q^{-2}$.

Source-free transport makes each per-label density constant along its ray, so
$e$ cannot depend on $R$. Rotation equivariance with no second vector in the
label makes $e$ independent of $\boldsymbol\omega$. And no dimensionless group
survives: $[\kappa q^2]^xc_f^{\,y}\mu_{\mathrm{arch}}^{\,z}$ dimensionless
requires $z=0$, $3x+y=0$, $2x+y=0$, forcing $x=y=0$.

Plainly: nothing is added to a patch while it coasts, a sphere has no preferred
direction, and there is no dial to turn. Any two ways of combining the available
constants with the same units are the same combination.

$$
e
=
C_e\,\frac{\mu_{\mathrm{arch}}c_f^{\,5}}{\kappa q_t^{\,2}},
\qquad
\boldsymbol\pi
=
C_\pi\,\frac{\mu_{\mathrm{arch}}c_f^{\,4}}{\kappa q_t^{\,2}}\,\boldsymbol\omega,
\qquad
E_{\text{shell}}
=
4\pi C_e\,\frac{\mu_{\mathrm{arch}}c_f^{\,5}}{\kappa q_t^{\,2}}\,dT_e .
$$

If $C_e=C_\pi$ then $e=c_f\|\boldsymbol\pi\|$, i.e.
$\boldsymbol\pi=(e/c_f)\boldsymbol\omega$ — a relation that **emerges** here
rather than being posited.

**On the $q_t^{-2}$ scaling.** Capacity falling as the square of polarity
magnitude is counterintuitive, and its status is now settled. It is forced
because $\kappa q^2$ is the only charge-eliminating combination and nothing else
in the ingredient list carries charge. The physical reading:

$$
\ell_q=\frac{\kappa q^2}{c_f^{\,2}},
\qquad
\text{natural frequency}\;\frac{c_f}{\ell_q},
\qquad
e\sim\mu_{\mathrm{arch}}c_f^{\,2}\cdot\frac{c_f}{\ell_q}.
$$

Plainly: $\ell_q$ is a classical-radius-like length built from the coupling.
Stronger coupling makes that length larger, which lowers the natural frequency,
which lowers the emitted power. The odd scaling is that chain, not an error.

The scaling is **forced relative to the promoted minimal state** and
**symptomatic relative to any extension**: admitting $\beta=\|\mathbf V_t\|/c_f$
as a label breaks uniqueness and admits a free function $g(\beta)$. The promoted
label $(t,T_e,\mathbf C,R,c_fq\,dT_e)$ excludes emission velocity, so $\beta$ is
inaccessible and $q^{-2}$ stands.

One loose end is also closed: $dT_e$ **cannot** appear as an independent factor
in the density, because the density is already defined with respect to
$dT_e\,d\boldsymbol\omega$ and so cannot depend on the size of $dT_e$.

**A consistency failure worth recording.** The capacity used in the maturity
analysis scales as $|q|$, while this analysis demands $q^{-2}$. Both cannot hold
unless $\varepsilon_0$ carries hidden dimensions — that is, unless it is a new
constitutive constant rather than something derivable.

- **Research status:** derived after correcting an earlier coupling-dimension
  error that had reversed the conclusion.
- **Claim grade:** derived, conditional on the ingredient list being exactly the
  promoted label plus $\{c_f,\kappa,\mu_{\mathrm{arch}}\}$.
- **Falsifier:** admitting $\mathbf V_t(T_e)$ or any second vector supplies a
  dimensionless group and destroys uniqueness. Operator decision D1.
- **Destination:** owning packet §1, replacing the statement that the accounts
  are undetermined.

### F3 — Zero pre-reception shell momentum; no intrinsic wake spin

With $\boldsymbol\pi\parallel\boldsymbol\omega$ and $e$ isotropic,
$\mathbf P_{\text{shell}}=(e/c_f)\int_{S^2}\boldsymbol\omega\,d\boldsymbol\omega=\mathbf 0$.
With $\mathbf Y=\mathbf C+R\boldsymbol\omega$,

$$
\mathbf Y\times\boldsymbol\pi
=
\frac{e}{c_f}\,\mathbf C\times\boldsymbol\omega ,
\qquad
\mathbf J_{\mathcal W}=\mathbf C_{t,e}\times\mathbf P_{\text{shell}} .
$$

Plainly: an even outward push in every direction sums to nothing, and the radius
term drops out because a vector crossed with itself is zero. All of a shell's
angular momentum is its birth point crossed into its net momentum — no spin is
stored in the shell.

This does **not** say momentum cannot close: depletion at
$\boldsymbol\omega_{\mathsf h}$ makes the remainder anisotropic, and
$\Delta\boldsymbol\pi$ and $\Delta\mathbf P_{\mathrm{motion}}$ are both parallel
to $\hat{\mathbf r}$ and can cancel. The structural statement is that the wake
momentum account is identically zero until a reception occurs.

This **proves** the item carried as *proposed* in the owning packet — that no
separate intrinsic angular-momentum variable is needed — and names its
hypothesis.

- **Research status:** multiply derived, including the parallel packet's
  reduction lemma.
- **Claim grade:** derived, conditional on $\boldsymbol\pi\parallel
  \boldsymbol\omega$ and isotropic emission.
- **Falsifier:** any non-line-of-action wake exchange reinstates a fourth stored
  variable.
- **Destination:** owning packet §1; Master Equation state-reduction section.

### F4 — Angular closure pins the motion accounts

The wake books its momentum at the frozen center $\mathbf C$; the receiver sits
at $\mathbf C+R\boldsymbol\omega_{\mathsf h}$. With momentum closure,

$$
\Delta\mathbf J_{\mathrm{tot}}
=
R\,\boldsymbol\omega_{\mathsf h}\times\Delta\mathbf P_{\mathrm{motion}} .
$$

Plainly: the two sides use different lever arms — the receiver's reaches where
the receiver is, the wake's only to where the shell was born. The leftover is the
shell radius times whatever part of the momentum kick is not radial.

This vanishes for all configurations iff $\Delta\mathbf P_{\mathrm{motion}}
\parallel\hat{\mathbf r}$. Writing $\mathbf P=(P(v)/v)\mathbf V$ and using
$\Delta\mathbf V\parallel\hat{\mathbf r}$ with $\mathbf V$ arbitrary forces
$(P/v)'=0$, hence

$$
P(v)=\mu_{\mathrm{arch}}v,
\qquad
K(v)=\tfrac12\mu_{\mathrm{arch}}v^2 ,
$$

the second following from the live compatibility relation $K'(v)=vP'(v)$.
Residual for a failing candidate, with $\theta=\angle(\mathbf V_r,\hat{\mathbf r})$:

$$
\left\|\Delta\mathbf J_{\mathrm{tot}}\right\|
=
R\,v\left|\left(P/v\right)'\right|
\left\|\Delta\mathbf V\right\|\cos\theta\,\sin\theta .
$$

Plainly: any account not proportional to speed produces a phantom torque growing
with the age of the intercepted shell. Easy to detect.

$\mu_{\mathrm{arch}}$ is the declared units constant, not a carrier mass; the
input was a statement about lever arms in the void.

- **Research status:** derived here and corroborated by the parallel packet's
  oblique-pair theorem, which supplies the hypothesis this version leaves
  implicit.
- **Claim grade:** derived, conditional on $\boldsymbol\pi\parallel
  \boldsymbol\omega$, momentum closure, and the emission-site line of action.
- **Falsifier:** one certified hit with $\mathbf V_r$ at $45^\circ$ to
  $\hat{\mathbf r}$ and a non-proportional $P$ must show a residual scaling
  linearly in $R$.
- **Destination:** `characteristic-tail.md` §3, upgrading the $K_\mu$,
  $\mathbf P_\mu$, $\mathbf J_\mu$ chart from proxy-grade to derived-conditional.

### F5 — Regulator-path independence: impulse-level yes, continuation-level open

This corrects the earlier position that weighted integrability was
insufficient in general.

**Impulse level.** Because $M$ is a suppression factor it is **non-negative**, so
weighted integrability is *absolute* integrability and conditional-convergence
pathologies cannot arise. For bounded multiplicative regulators and approximate
identities, dominated convergence then gives a family-independent impulse:

$$
M\ge0
\;\wedge\;
\int_0^LM(T)T^{-3}dT<\infty
\;\Longrightarrow\;
\lim_{\eta\to0^+}I(\eta)\ \text{exists and is family-independent}
$$

within any class admitting a uniform dominator. The three declared families —
compact-bump multiplicative cutoff, Gaussian mollification, hard cutoff — all
satisfy uniform domination automatically.

Plainly: because the suppression factor can never be negative, no regulator can
smuggle in a cancellation that survives the limit. Inside the standard families
the birth kick is well defined.

**Scope of the counterexample.** The family
$M_\eta(z)=z^3+a\eta^2\varphi(z/\eta)$, with $\varphi$ supported on $[1,2]$ and
$J=\int\varphi(u)u^{-3}du$, satisfies $\int_0^LM_\eta z^{-3}dz=L+aJ$ while
$M_\eta\to z^3$ pointwise.

Plainly: a bump whose width shrinks exactly as fast as the weight grows leaves a
permanent residue. But such a family *carries mass* and lies outside the
dominated classes. It shows why the regulator class must be declared — not that
integrability fails inside it.

**What remains genuinely open.** For the full nonlinear post-birth state, uniform
$L^1$ domination gives uniformly absolutely continuous trajectories, hence
compactness by Arzelà–Ascoli, hence subsequential limits satisfying the limit
integral equation. Family independence additionally requires **uniqueness of the
limit continuation**. If that problem admits non-unique continuations — an
Osgood-type failure — different regulators can select different branches even
under domination.

Plainly: knowing the kick is finite and well defined does not yet tell you which
trajectory comes out the other side. That is a separate theorem.

**Acceptance condition.** $M\ge0$; $\int_0^LM\,T^{-3}dT<\infty$; regulator class
restricted to the declared dominated families; **and** a uniqueness certificate
for the limit continuation.

- **Research status:** the counterexample and the positive impulse-level result
  were derived separately and agree on this limited scope.
- **Claim grade:** derived at impulse level; the continuation-uniqueness burden
  is a derived open obligation.
- **Destination:** owning packet §3; falsifier list in the closure packet.

### F6 — The allocation rule is the blocker, and all three candidates fail

This is the central result, and it retracts the earlier conclusion recorded in
§4.

**The missing object.** The owning packet lists six missing items. There is a
seventh, logically prior to all of them:

> **An allocation rule** stating how much of a shell's stored account a single
> reception may claim.

Plainly: before asking how much a receiver takes, the theory must say what counts
as its share. That is why the capacity question could not be settled either way.

The difficulty is concrete: the acceleration reads a surface *density* at one
direction, but an account can only be depleted by removing a *measure*, and a
point receiver's intercepted label set has measure zero.

**Rule 1 — strict per-patch, point receiver. Eliminated by measure count.**
Extraction from a zero-measure set is zero, so $M\equiv0$ — killing the
regular-domain law along with the birth divergence, contradicting $m\equiv1$. A
distributional repair fails too: a finite debit concentrated as a Dirac atom at
$\boldsymbol\omega_{\mathsf h}$ leaves the remaining density as
$-\infty\cdot\delta$, so $e$ changes sign. A finite extraction from a
zero-measure patch means the account is not a density at all; it must become a
signed measure, which violates non-negativity at atoms.

**Rule 2 — geometric cross-section $\sigma/R^2$. Eliminated twice.** The $r^2$
factors cancel exactly, leaving a cap ratio proportional to $|D_r|$ and

$$
M\propto z,
\qquad
\int M\tau^{-3}d\tau\sim\int\tau^{-2}d\tau=\infty .
$$

Plainly: once the receiver clips only a shrinking sliver, its budget shrinks
faster than the demand grows. Linear suppression is not enough.

Independently, a cap ratio proportional to $|D_r|$ binds whenever the receiver
co-moves with the wake, and therefore shifts the regular law near
**receiver-side** folds. The Master Equation chapter states the opposite
explicitly: $D_r=0$ is a root-playback turning point, not an acceleration pole,
zero, or chart boundary; a static transmitter supplies $W^{\mathrm{acc}}=1$
whether the receiver is stationary, momentarily satisfies $D_r=0$, or has
$D_r<0$; and there is no receiver-velocity resistance tensor.

Plainly: this rule would make how hard a receiver is pushed depend on how fast
that receiver is moving. Canon says flatly that it does not.

**Rule 3 — whole-label allocation. Eliminated by a double-drain
counterexample.** It gives the required exponent — using $|dT_e/dT_r|=1$ from
F1, the budget rate is constant, so $M=\min(1,(\tau/\tau_*)^3)$ with $k=3$ — but
it **violates surface resolution**, because debiting an entire label is an update
at directions other than the intercepted point. Concretely:

> Two receivers at antipodal directions $\boldsymbol\omega_{\mathsf h}$ and
> $-\boldsymbol\omega_{\mathsf h}$ intercept the same emission label. Under
> whole-label allocation each claims the full per-label budget. Either the first
> reception depletes the label, so the second receiver's acceleration differs
> from an identical geometry with no prior reception — universality fails on the
> regular domain — or the account goes negative. Reception order changes the
> outcome.

Plainly: if one receiver can drain a whole shell's budget, a second receiver on
the far side of that same shell is affected by an event nowhere near it. That is
exactly what direction-resolved wake state was introduced to prevent.

The self-hit case does not escape either: at birth the carrier still intercepts
one point on each shell at radius $r=2c_f\tau$, not the whole shell.

**A fourth option, and why it is not free.** A fixed angular fraction $f$ per hit
recovers $M\propto z^3$, but $f$ is an undeclared scale, it conflicts when
several receivers occupy one angular neighbourhood, and it requires naming which
patch drains. Its constant also depends on $P'(c_f)$, coupling it to F4.

| Allocation rule | $M$ near birth | $k$ | Status |
| --- | --- | ---: | --- |
| strict per-patch, point receiver | $0$ | — | eliminated by measure count; the density framework fails |
| geometric cross-section $\sigma/R^2$ | $\propto z$ | $1$ | eliminated twice — non-integrable, and $D_r$-dependent against canon |
| whole-label | $\min(1,(\tau/\tau_*)^3)$ | $3$ | eliminated by double-drain; violates surface resolution |
| fixed angular fraction $f$ | $\propto z^3$ | $3$ | survives only as a **new declared postulate** |

**Conclusion.** Under the conjunction {surface resolution, point receivers, no
$D_r$-dependence}, capacity limitation does **not** derive a maturity law.
$M\propto z^3$ is **conditional on a new angular-allocation constant**, not
derived from the promoted primitives.

- **Research status:** the allocation analysis supplies the $D_r$ observation;
  this synthesis performs the separate elimination against live canon.
- **Claim grade:** the allocation rule is a **derived necessity**; the three
  eliminations are **derived**; $M\propto z^3$ under a declared fraction is
  **conditional on a new postulate**.
- **Falsifier:** an allocation rule outside these four; or a demonstration that
  surface resolution is not in fact required, which would revive Rule 3.
- **Destination:** owning packet §2 (new missing item), §3, §6.

### F7 — A capacity cap would force a separation floor

Conditional on an allocation postulate surviving F6. The canonical acceleration
diverges as $r\to0$ on the regular domain, so any cap on extraction rate caps
acceleration and forces a floor. Allocating the cap per unit **absolute receiver
time** — the only allocation avoiding the forbidden $D_r$-dependence — gives
$A_{\mathrm{cap}}\sim Cc_f^{\,4}/(\kappa q^2)$ and hence

$$
r_*(z)=\frac{\ell_q}{\sqrt{C\,z}},
\qquad
\ell_q=\frac{\kappa q^2}{c_f^{\,2}} .
$$

Plainly: two carriers could not approach arbitrarily closely without the law
changing, and the closest approach is a classical-radius-scale distance that
shrinks as the geometry becomes better conditioned.

This is a **clean dichotomy and a testable prediction**: either there is no
capacity cap and the canonical law holds down to $r\to0$, or a cap exists and
there is a floor with this scaling. The certified regular domain currently
declares only $z\ge z_{\min}$; a floor $r\ge r_{\min}$ is declared nowhere.

- **Research status:** derived in the capacity-bound analysis.
- **Claim grade:** derived, conditional on an allocation postulate and on
  per-receiver-time capacity.
- **Falsifier:** probing the canonical law at separations below
  $\ell_q/\sqrt{Cz}$ and finding no departure.
- **Destination:** owning packet §3; operator decision D3.

### F8 — Emission alone makes wake energy grow without bound

With $e$ fixed by F2 and emission uniform in absolute time, the wake energy of an
isolated stationary transmitter grows linearly, at rate
$4\pi C_e\mu_{\mathrm{arch}}c_f^{\,5}/(\kappa q_t^{\,2})$, unless $C_e=0$.

Plainly: if every shell carries a fixed amount of energy and shells are emitted
continuously, stored energy climbs forever, even for a carrier that never moves
and never meets anything.

So either $C_e=0$ — the wake carries no energy account and the conservation
programme is vacuous — or an emission debit is mandatory. If that debit comes
from the transmitter's motion account at rate $\varepsilon_0|q|$, then with
$K=\tfrac12\mu_{\mathrm{arch}}v^2$,

$$
v^2(T)=v_0^2-\frac{2\varepsilon_0|q|}{\mu_{\mathrm{arch}}}T,
\qquad
T_{\text{stop}}=\frac{\mu_{\mathrm{arch}}v_0^2}{2\varepsilon_0|q|} .
$$

Plainly: a fixed energy bill per second for merely existing would bring every
free carrier to a halt on a fixed schedule. Nothing in the substrate permits
that.

The pressure therefore lands on the **named constant-time emission postulate**,
not on the wake state: either emission is not uniform in absolute time at fixed
capacity, or the debit comes from elsewhere, or $C_e=0$.

- **Research status:** independently re-derived within the bounded source
  analyses.
- **Claim grade:** derived, conditional on F2 and uniform-in-$T$ emission.
- **Destination:** owning packet §6, replacing the two-horn argument.

### F9 — Non-circularity, and the receiver-velocity requirement

Two complementary criteria:

- **Identity in unconstrained variables.** The balances must hold as identities
  in variables the acceleration law does not constrain. At fixed
  $(r,\hat{\mathbf r},D_t)$ those are $\mathbf V_r$ (three parameters) and
  $\mathbf A_t(T_e)$ and higher transmitter derivatives. Varying shell age at
  fixed $r$ is an **empty test**, because reception locks $T_r-T_e=r/c_f$.
- **Independent falsifiable content.** A debit *defined* as the negative of the
  motion change is circular; a debit that follows from an independent extraction
  rule and merely *happens* to match is a theorem. Being bounded above by
  remaining capacity is what supplies that content.

Plainly: the first asks whether the books balance for reasons the motion law did
not already guarantee. The second asks whether the ledger entry could ever have
come out wrong. A rule that cannot fail is not doing work.

**Derived consequence.** To first order
$\Delta E_{\mathrm{motion}}=K'(v_r)\hat{\mathbf V}_r\cdot\Delta\mathbf V_r$,
while $\Delta\mathbf V_r$ is fixed by geometry. Varying $\mathbf V_r$ over
$\mathbb R^3$ at fixed geometry varies the debit, so closure without reading
$\mathbf V_r$ requires $K'(v)\hat{\mathbf V}\cdot\Delta\mathbf V$ constant for
all $\mathbf V_r$ — impossible unless $K'\equiv0$. Hence **energy closure at a
single hit requires the reception map to read the present receiver velocity.**

This is a **present-time input to the account**, not a receiver-velocity term in
the acceleration. The canonical magnitude remains free of $\mathbf V_r$ and $D_r$
remains playback only — the same boundary that eliminates Rule 2 in F6.

- **Research status:** the two criteria were derived separately and are
  complementary.
- **Claim grade:** derived, to first order in $\|\Delta\mathbf V\|$.
- **Destination:** owning packet §4; falsifier list in the closure packet.

---

## 3. Trilemma status

The trilemma in the owning packet §5 is **not a theorem as written**. It requires
an unstated hypothesis:

> **(V) Visibility.** The map $\mathcal W\mapsto\mathbf A$ has trivial kernel on
> $\{z\ge z_{\min}\}$: no stored component is dynamically inert there.

Plainly: the argument assumes anything the wake stores must show up in the
acceleration somewhere in the ordinary regime. If a stored quantity may matter
only near birth, the argument does not apply.

Separately, universality can never be asserted for all $z>0$: a finite birth
impulse forces $\exists z_*>0$ with $M\not\equiv1$ on $(0,z_*)$. Every
universality statement must be quantified as $z\ge z_{\min}>0$.

The fourth branch — reception visible only on singular support — is logically
valid but carries four costs:

1. $z_{\min}$ is a new threshold not fixed by primitives.
2. The birth impulse becomes history-dependent, so the continuation is no longer
   a function of local geometry alone.
3. **$z\to0$ is not confined to self-hits.** It requires only that the
   transmitter's velocity component along the receiver direction equal $c_f$ at
   emission, which two distinct carriers can arrange. The branch's
   "invisible except at birth" premise is false as stated.
4. **The extraction dilemma.** On the regular domain with $m\equiv1$, the
   canonical law permits unbounded cumulative extraction from one transmitter
   through repeated like-polarity hits. Finite per-shell capacity then forces a
   choice: capacity exhausts and universality fails, or per-shell capacity is
   unbounded and boundedness fails.

Item 4 was stated but **never computed**. It requires evaluation on a
nonsymmetric two-carrier retained history, where symmetry cannot do the work.

- **Destination:** owning packet §5.

---

## 4. Retracted and rejected

**Retracted from the earlier draft.** The draft recorded that
whole-label allocation "survives" and that $M\propto z^3$ was therefore
**derived** from capacity plus geometry. F6 withdraws that. The double-drain
counterexample shows whole-label allocation violates surface resolution, and the
exponent is recoverable only by declaring a new angular fraction. The transition
scale $\tau_*$ is likewise conditional.

**Rejected research claims.**

- **$[\kappa q^2]=L^2T^{-1}$.** Wrong — the dimension of
  $|D_t|$ was dropped. The corrected dimension is $L^3T^{-2}$, and the
  conclusion that a new constant is *dimensionally forced* is false; F2
  exhibits the unique admissible forms.
- **"Momentum closure fails outright."** Overreach — depletion
  makes the remainder anisotropic, and the two increments are both radial and can
  cancel. F3 records the correct weaker statement.
- **"No $\beta\to1$ barrier, therefore births are generic."**
  Unsafe import: $K$ is a bookkeeping account, not a dynamical barrier, and
  nothing in the substrate says an account limits a speed. Motion is determined
  by the acceleration law alone. The kinematic fact that birth requires reaching
  $c_f$ stands independently as F1.
- **Anisotropic emission with $\mathbf V_t(T_e)$ as a shell label** (both).
  Changes a named postulate, alters the $\varrho^{\mathrm{surf}}$ form on which
  the inverse-square argument rests, and destroys F2's uniqueness. Operator
  decision D1, not a safe correction.
- **$M=O(T^{2+\delta})$ as a necessity.** Superseded by the parallel note's
  weighted-integrability correction, adopted throughout above.

---

## 5. Unresolved constitutive choices

| ID | Decision | Why it blocks | Cost of deferring |
| --- | --- | --- | --- |
| D1 | May $\mathbf V_t(T_e)$ enter the shell label? | Voids F2's uniqueness and F3's zero-momentum result | Account densities revert to undetermined |
| D2 | **Declare an angular-allocation constant $f$?** | F6 eliminates all three natural rules; only a declared fraction recovers $k=3$ | The maturity law stays underivable and MEC-002 cannot close |
| D3 | **Declare a separation floor $r_{\min}$?** | F7 makes it a consequence of any cap; canon declares only $z_{\min}$ | F7's prediction cannot be stated or tested |
| D4 | Is capacity built from F2's constants, or a new $\varepsilon_0$? | F2 shows $\lvert q\rvert$-scaling and $q^{-2}$-scaling are inconsistent | An avoidable constant may be introduced silently |
| D5 | Where is the emission debit taken from? | F8 shows the motion-account option halts free carriers | The bounded-energy obligation stays open |

Plainly: D2 is one decisive unresolved branch in the current capacity route.
The eliminations narrow that route, but D1 and D3 through D5, the update law,
birth continuation, provenance, and the conserved accounts remain open.

---

## Proposed Changes

**Readiness gate.** The retained items are negative results, scope corrections,
missing-object declarations, or acceptance conditions that do not choose a wake
representation, allocation law, capacity law, birth continuation, or conserved
account. Every proposed change that would make one of those choices or promote
its consequence is moved to
[Disposition of Open Questions](#disposition-of-open-questions).

No reader-facing corpus change is applied by this packet.

**Applied disposition, 2026-07-29.** P3, P4, P5, P6, P8, P10, P11, P13, and
Leg 0 now live in the mathematical and queue owners named below. Every deferred
item and open question is recorded in the canonical [wake-reception review
action register](../../../priorities/master-equation-closure/work-queue.md#wake-reception-review-action-register).
This packet is reference evidence only and owns no outstanding action.

**Sequencing constraint.** Reconcile this change batch with the parallel
causal-wake-state packet before editing
`analysis-independent-causal-wake-state.md` §3. Apply the shared
weighted-integrability and account-measure corrections first, then land the
allocation eliminations and regulator acceptance condition below. The two
documents remain separate research records because their scopes and
derivations differ.

Plainly: two threads reached this file at once. Their conclusions mostly agree,
but their edits target the same paragraphs, so the edits have to be reconciled
even though the findings do not.

### Owning packet — `analysis-independent-causal-wake-state.md`

| # | Section | Change | Grade after |
| --- | --- | --- | --- |
| P3 | §2 | Insert the **allocation rule** as item 0 of the missing-objects list, with the density-versus-measure difficulty that motivates it | derived necessity |
| P4 | §3 | Replace the bare $T^{-3}$ assertion with F1's normal form, including $dT_e/dT_r=-1$ and the prefactor | derived on the quadratic control |
| P5 | §3 | Add F6's elimination table and the double-drain counterexample; state $M\propto z^3$ as conditional on a declared angular fraction, **not** as derived | derived eliminations |
| P6 | §3 | Add F5's corrected acceptance condition — $M\ge0$, weighted integrability, declared dominated regulator class, plus a continuation-uniqueness certificate — retaining the spike family as the reason the class must be declared | derived |
| P8 | §4 | Add F9's two non-circularity criteria and the receiver-velocity requirement, with the note that this does not put $\mathbf V_r$ into the acceleration; delete the empty shell-age variation | derived |
| P10 | §6 | Replace the two-horn positive-energy argument with F8's trilemma and the finite-time-halt calculation; relocate the pressure onto the uniform-emission postulate | derived conditional |

### Closure packet — `independent-causal-wake-state-closure.md`

| # | Change |
| --- | --- |
| P11 | Add four falsifier rows: a reception map claiming energy closure without reading receiver velocity; an allocation rule whose extraction cap depends on $D_r$; an allocation rule that updates the account away from the intercepted direction; regulator families inside the declared class giving different birth impulses |

### Characteristic-tail packet

No apply-now change. P12 is deferred because its grade depends on unresolved
momentum and angular-momentum accounts.

### Work queue

| # | Change |
| --- | --- |
| P13 | Append the allocation rule to MEC-002's missing-objects list, marked as prior to the other six |

### Reader-facing corpus changes

None apply now. P14 and P15 are preserved in the deferred-change table because
their reader-facing authority depends on the unresolved MEC-002 representation
and reception rule.

Plainly: the negative constraints remain useful now, but the textbook should
not present their wake-account consequences before the update and representation
that give those accounts meaning.

---

### Readiness-Gate Priority Impact

P13's blocker clarification is applied to the existing MEC-002 row. No rank,
lifecycle status, theory disposition, or completion boundary changes.

- **No rank change.** Nothing closed. MEC-002 stays local rank `1`; MEC-003 and
  MEC-004 stay blocked behind it.
- **The blocker line gains one item.** The **allocation rule** joins the
  missing-objects list as a prerequisite to any capacity, maturity, or account
  consequence.
- **No `Intuition` reduction should be booked.** An earlier draft argued the
  conceptual-invention burden had dropped because the maturity law had become
  derivable. F6 withdraws that. The burden is *relocated*, not reduced: from
  "choose among infinitely many suppression laws" to "declare one angular
  constant, or accept that capacity yields no suppression law."
- **MEC-004 can gain one independent check after its prerequisites close:**
  F4's $R$-linear angular residual, distinct from the three balance equations.

---

### Immediate Diagnostic Calculation

**Leg 0 — playback identity.** On the quadratic self-hit control, verify
$dT_e/dT_r=-1$, $r/(2c_f\tau)\to1$, $D_t/(\tau g')\to1$. Minutes, no accounts
needed. Fails only if F1 is wrong.

## Deferred Acceptance Calculations

Legs 1–3 are preserved here as research designs and are routed explicitly in
the deferred-change table below. They must not be run or interpreted as account,
birth, or conservation evidence before their named owners close.

**Leg 1 — deferred to MEC-002, MEC-005, and MEC-004: the cumulative extraction bound.** This calculation remains open. On
a **nonsymmetric two-carrier retained history**
— transmitter at rest at the origin, receiver released from rest at $r_0$, like
polarity so the canonical law repels — compute total energy extracted over a
window $W$ and test the §3 item-4 dilemma. **Pass:** the total is bounded by a
per-shell capacity without the acceleration departing from canonical anywhere on
$z\ge z_{\min}$. **Fail:** either capacity exhausts, killing the fourth branch
outright, or the bound requires unbounded per-shell capacity. The radial
equation still lacks the closing term needed to complete the calculation;
supplying that closure is part of the proposed research.

**Leg 2 — deferred to MEC-003: continuation uniqueness.** With $M\ge0$ and weighted integrability
assumed, establish or refute uniqueness of the limit continuation through birth
(local Lipschitz or Osgood away from the singular time, plus the finite-impulse
crossing property). This is the only remaining gap in F5. **Fail:** different
dominated regulators select different branches, and the birth transition stays
fail-closed regardless of $M$.

**Leg 3 — deferred to MEC-004 after MEC-005: the angular pin.** Evaluate
$\|\Delta\mathbf J_{\mathrm{tot}}\|=R\,v|(P/v)'|\|\Delta\mathbf V\|\cos\theta\sin\theta$
across $\theta\in[0,\pi/2]$ and three shell ages, for $P=\mu_{\mathrm{arch}}v$
and one non-proportional $P$. Confirms or kills F4.

All numerics at $c_f=1$.

---

## Disposition of Open Questions

### Deferred Proposed Changes

| Deferred item | Live owner and status | Reason it is not apply-now | Next acceptance test and backlink |
| --- | --- | --- | --- |
| P1 — replace undetermined accounts with the F2 monomials and charge-scale interpretation | [`MEC-002` causal wake update law](../../../priorities/master-equation-closure/work-queue.md#mec-002--causal-wake-update-law), status `In progress`; mathematical owner [Independent Causal Wake-State Closure](../../../priorities/master-equation-closure/independent-causal-wake-state-closure.md) | The dimensional result is conditional on the unresolved emission label and account representation. Applying it as the account form would select a constitutive representation. | Derive the label and measure class from the same independently evolving update, then recheck the no-dimensionless-group and scaling arguments. The MEC-002 owner already backlinks this packet. |
| P2 — promote zero pre-reception momentum and no intrinsic wake spin | `MEC-002`, status `In progress` | The conclusion depends on the isotropic shell label challenged by D1 and on the unresolved account representation. | Accept the emission label and account observation map first, then independently verify the conditional angular identity without defining momentum from a conservation residual. |
| P7 — add the conditional separation floor | [`MEC-003` finite coincident same-transmitter transition](../../../priorities/master-equation-closure/work-queue.md#mec-003--finite-coincident-same-transmitter-transition), status `Deferred / blocked`, downstream of MEC-002 | A floor is a consequence only of an accepted capacity law; writing it now risks turning the consequence into a premise. | Derive capacity on MEC-002, then test $r_*=\ell_q/\sqrt{Cz}$ under normalized $c_f=1$ controls and reject any post-fit floor. |
| P9 — add axiom (V), quantify universality, and state the fourth-branch costs | `MEC-002`, status `In progress`, with birth consequences owned by `MEC-003`, status `Deferred / blocked` | Adding axiom (V) would choose the missing constitutive branch. The fourth-branch costs remain conditional research consequences. | Supply one Architrino-native allocation and maturity rule, then test the stated universality and birth consequences without inserting them as axioms. |
| P12 — upgrade the characteristic-tail angular chart | [`MEC-004` same-update conserved accounts](../../../priorities/master-equation-closure/work-queue.md#mec-004--same-update-conserved-accounts), status `Deferred / blocked`, after [`MEC-005`](../../../priorities/master-equation-closure/work-queue.md#mec-005--pairwise-causal-root-ledger-closure), status `Queued`; any acceleration-gradient input must respect `MEC-006`, status `Awaiting verification` | F4 assumes momentum closure and a valid account map. Its $R$-linear residual is a useful falsifier, not authority to upgrade the account chart. | Run the angular-pin control on the same MEC-002 update and MEC-005 provenance ledger, with independently accepted gradient rows where used, and require momentum and angular momentum to close together. |
| P14 — promote zero pre-reception shell momentum and no intrinsic wake spin into `master-equation.md` | `MEC-002`, status `In progress` | Reader-facing promotion would make the unresolved label and account representation look canonical. | Pass the P2 acceptance test, then promote only the resulting scoped theorem and falsifier. |
| P15 — promote the $D_r$-independent allocation-cap constraint into `master-equation.md` | `MEC-002`, status `In progress`; `MEC-006`, status `Awaiting verification`, owns receiver/self acceleration-gradient distinctions where they are invoked | The current acceleration law excludes a receiver factor from hit strength, but no accepted reception allocation exists. The constraint belongs first to the MEC-002 candidate test. | Test each proposed reception rule with unchanged canonical regular acceleration and independently accepted receiver/self derivative rows where relevant; promote only after the update survives. |
| Leg 1 — cumulative extraction bound | `MEC-002`, status `In progress`, with later MEC-005 provenance and MEC-004 account checks | No accepted capacity, reception update, or account ledger exists, so the calculation cannot yet distinguish physical exhaustion from a bookkeeping choice. | Execute the declared nonsymmetric two-carrier history only after the update, root ownership, and account maps are predeclared. |
| Leg 2 — continuation uniqueness | `MEC-003`, status `Deferred / blocked` | Finite impulse and weighted integrability do not select a unique regulator-independent post-birth branch. | Prove the Osgood or local-Lipschitz control and finite-impulse crossing for the full admitted regulator class, returning `Not advanced` if branches differ. |
| Leg 3 — angular pin | `MEC-004`, status `Deferred / blocked`, after MEC-005 | The test is account evidence only when each root and boundary contribution has unique provenance and the same update supplies the account maps. | Run the oblique control on a nonsymmetric MEC-005 ledger and require independent momentum and angular-momentum closure. |

Plainly: the deferred changes remain research results or test designs. They are
not rejected wholesale; each waits only on the owner whose missing object it
actually consumes.

| Open question | Live owner and status | Next acceptance test | Routing disposition |
| --- | --- | --- | --- |
| D1. May $\mathbf V_t(T_e)$ enter the shell label? | [`MEC-002` causal wake update law](../../../priorities/master-equation-closure/work-queue.md#mec-002--causal-wake-update-law), status `In progress`; mathematical owner [Independent Causal Wake-State Closure](../../../priorities/master-equation-closure/independent-causal-wake-state-closure.md) | Derive any transmitter-velocity label dependence from Architrino primitives before evolution and recheck the surface-density uniqueness, zero pre-reception momentum, fixed-speed propagation, and regular-chart reduction. | Unresolved theory decision. It is not adopted here because it changes the declared emission label and invalidates F2/F3. |
| D2. Is there an Architrino-native angular-allocation constant or rule? | `MEC-002`, status `In progress` | Supply a predeclared reception allocation that survives the singleton-measure obstruction, the double-drain control, direction resolution, and the prohibition on $D_r$-dependent acceleration strength. | Decisive MEC-002 blocker. Merely declaring $f$ would be a theory choice, not an accepted derivation. |
| D3. Does a capacity law derive a separation floor $r_{\min}$? | [`MEC-003` finite coincident same-transmitter transition](../../../priorities/master-equation-closure/work-queue.md#mec-003--finite-coincident-same-transmitter-transition), status `Deferred / blocked` | Derive the floor from the same accepted update and allocation law, then test $r_*=\ell_q/\sqrt{Cz}$ under normalized $c_f=1$ controls without inserting the floor as a premise. | Deferred behind MEC-002; no canonical separation floor is created. |
| D4. Is capacity fixed by F2's constants or by a new $\varepsilon_0$? | Primary owner `MEC-002`, status `In progress`; downstream account owner [`MEC-004`](../../../priorities/master-equation-closure/work-queue.md#mec-004--same-update-conserved-accounts), status `Deferred / blocked` | Derive one capacity map and its charge scaling from the same update, then require consistent energy, momentum, angular-momentum, and boundary rows with no post-fit constant. | Cross-owner dependency, not a new queue: MEC-002 must define the update before MEC-004 can test the accounts. |
| D5. Where is the emission debit taken from? | `MEC-004`, status `Deferred / blocked`, with provenance dependency on queued [`MEC-005`](../../../priorities/master-equation-closure/work-queue.md#mec-005--pairwise-causal-root-ledger-closure) | On one predeclared nonsymmetric two-Architrino retained history, bind emission, reception, wake, motion, and boundary debits to the MEC-002 update and MEC-005 root provenance, then close all three accounts under independent checks. | Open. F8 excludes a simple motion-account debit but supplies no replacement. |
| Is $r\propto z$ generic at coincident birth? | `MEC-003`, status `Deferred / blocked` | Repeat the local asymptotic derivation on cubic and higher-order controls, classify the possible $r\propto z^p$ charts, and update the weighted-integrability condition without selecting a favorable exponent. | Open beyond the exact quadratic control. |
| Is cumulative extraction from one transmitter bounded without changing the canonical regular acceleration? | `MEC-002`, status `In progress`, with later MEC-005/MEC-004 provenance and account checks | Execute Leg 1 on the declared nonsymmetric two-carrier retained history and show either a predeclared per-shell bound with unchanged regular acceleration or a clean exhaustion/unbounded-capacity falsifier. | Open; raised twice and not yet computed. |
| Is continuation through coincident birth unique and regulator-path independent? | `MEC-003`, status `Deferred / blocked` | Under $M\ge0$ and the exact weighted-integrability condition, prove local Lipschitz or Osgood control away from birth plus a unique finite-impulse crossing, then compare every regulator in the declared class. | Open. Finite impulse alone does not select a continuation. |
| Does momentum closure hold under the assumptions used by F4? | `MEC-004`, status `Deferred / blocked`, with queued MEC-005 provenance first | Run the oblique angular-pin control and a nonsymmetric pairwise ledger; require the same update to close momentum and angular momentum without symmetry-only cancellation or residual-defined wake values. | Open. F4 remains conditional and cannot be cited as conservation. |
| Does the admitted regulator class include finite-core regularizations that change the birth limit? | `MEC-003`, status `Deferred / blocked`; any action-level core change must also respect the separately owned characteristic-tail adjudication | Predeclare the regulator class, include finite-core candidates if admitted, and require the birth impulse and continuation branch to agree under refinement; otherwise narrow the class before testing. | Protocol gate. If the class is too broad, no maturity choice can earn regulator-path independence. |

Plainly: the five constitutive decisions and five unresolved calculations stay in the existing MEC-002 through MEC-005 ownership graph. The routing adds no queue and changes no status. The regulator-class row remains the quiet gate: an overbroad class can defeat every maturity proposal before any physics conclusion is available.
