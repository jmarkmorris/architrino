# Independent Causal Wake-State Closure

## Status

- Claim level: `derivation-target`
- Priority rank: `1` within Master Equation closure
- Current result: `regular-kinematic-substate-derived; account-complete-update-closed-negatively-under-current-primitives`
- Canonical regular-domain law: unchanged transmitter-side acceleration
- Required outcome: one causal update that closes the coincident transition and conserved accounts together

## Closure Question

What is the smallest independently evolving wake state, derived from Architrino
primitives, that can be appended to retained path histories so that one causal
update:

1. reproduces $c_f/|D_t|$ acceleration on certified simple-root charts;
2. crosses coincident same-transmitter root birth with finite accumulated
   acceleration and a unique accepted continuation;
3. closes energy, momentum, and angular momentum without defining wake changes
   as the negative residual of the motion changes?

This is a research program, not an accepted ontology change. The state must be
derived before it can be promoted.

The first full attempt is [Independent Causal Wake-State Minimum and
Obstruction](analysis-independent-causal-wake-state.md). It derives directional
surface resolution, a coupling or maturity variable, scalar wake energy, vector
wake momentum, and explicit boundary flux as the smallest necessary state class.
It also proves that the current primitives do not select the coincident-birth
maturity law, the motion-account functions, an emission capacity, or a
reception transfer. The route therefore remains not advanced until one new
Architrino-native construction supplies all four together.

Research input: [Wake Reception Transfer, Motion Accounts, and Coincident-Birth Maturity](../../research-office/research-history/review-packets/terence-tao-wake-reception-transfer-and-maturity-2026-07-28.md) sharpens the allocation, account-measure, birth-integrability, regulator, extraction, and angular-booking questions. It is priority-only research guidance; it does not amend this closure status, select a constitutive update, or establish conservation or unique continuation.

## Regular Kinematic Substate Result

The regular-domain emission, propagation, and reception geometry now has an
explicit autonomous state realization. Each emission label stores the
transmitter identity, emission time, fixed emission-site center, expanding
radius, and polarity-weighted emission measure. After emission,

$$
\dot{\mathbf C}_{t,e}=\mathbf0,
\qquad
\dot R_{t,e}=c_f.
$$

The local reception direction is the expanding surface normal, which is the
canonical emission-site-to-receiver direction. Fixed-reception source-time
collapse of the constant emission measure independently yields
$c_f/|D_t|$. The executable reference is
`scripts/equation-mapping/derive-causal-wake-update-law.mjs`, with focused
checks in `tests/causal-wake-update-law.test.js`.

Claim grade: derived on certified regular support from the existing fixed-speed
causal-surface postulate. This is `promote now` for the regular direction and
weight, and it has been captured in the Master Equation.

The same derivation rejects the inertially extrapolated direction as a local
response of the present wake state. Redirecting only the acceleration breaks
surface-normal response. Moving each emitted center inertially changes surface
element speeds away from the fixed absolute value $c_f$ and produces a
different causal support and collapse denominator.

This does not overturn the negative result below. The transparent kinematic
state has no derived maturity, energy, momentum, reception-transfer, or
account-bearing boundary law. It therefore does not cross coincident
same-transmitter birth or close the three conserved accounts. Promotion
classification for the full packet remains `defer with blocker`.

## Required State And Update

The retained state must be no larger than necessary:

$$
\mathcal S_T
=
\left(\{\mathcal H_i^T\}_{i=1}^{N},\mathcal W_T\right).
$$

The derivation must state every component of $\mathcal W_T$, its units or
nondimensional scaling, and which components are independent initial data. It
must then supply one deterministic or explicitly multivalued causal update

$$
\left(\mathcal S_{T+\Delta T},\Phi_{\partial}[T,T+\Delta T]\right)
=
\mathcal U_{\Delta T}(\mathcal S_T),
$$

including emission, propagation, reception, same-transmitter near-origin
behavior, retained-history truncation, and boundary flux. No update may inspect
a future receiver path.

## Mandatory Reductions And Accounts

Away from singular support, the update must reduce to

$$
\mathbf A_i(T)
=
\sum_j\sum_{T_t\in\mathcal C_{ij}(T)}
\kappa\,\sigma_{ij}|q_iq_j|
\frac{c_f}{r_{ij}^{2}|D_{t,ij}|}
\hat{\mathbf r}_{ij}.
$$

At coincident same-transmitter birth it must certify

$$
\int_{T_0}^{T_0+\epsilon}\|\mathbf A_{ii}(T)\|\,dT<\infty
$$

and convergence to one accepted post-transition state under every declared
numerical refinement.

The same update must derive motion, wake, and boundary accounts satisfying

$$
\Delta E_{\mathrm{motion}}+\Delta E_{\mathcal W}+\Phi_E=0,
$$

$$
\Delta\mathbf P_{\mathrm{motion}}+\Delta\mathbf P_{\mathcal W}
+\boldsymbol\Phi_P=\mathbf 0,
$$

$$
\Delta\mathbf L_{\mathrm{motion}}+\Delta\mathbf L_{\mathcal W}
+\boldsymbol\Phi_L=\mathbf 0.
$$

The motion accounts are not licensed to import single-architrino mass,
$m\mathbf v$, or $\tfrac12mv^2$. Their maps must be derived from the same
Architrino-native construction.

## First Executable Packet

The smallest useful test contains:

1. one regular partner-root control with fixed geometry and varied receiver
   velocity, verifying unchanged instantaneous acceleration and changed signed
   playback;
2. one ordinary transmitter-side fold control, verifying the known finite
   accumulated acceleration;
3. the exact quadratic same-transmitter birth control, verifying a finite,
   regulator-independent complete transition rather than an event-only patch;
4. one nonsymmetric two-architrino retained-history control, so momentum and
   angular-momentum accounts cannot close by symmetry alone;
5. one finite retained-history boundary control, verifying explicit boundary
   flux rather than hidden loss.

Every control must emit the pre-update state, post-update state, wake-state
change, motion-account change, boundary flux, refinement identity, and the
reconstructed conservation residuals.

## Falsifiers

The candidate fails if:

- $\mathcal W_T$ is defined after evolution from the residual it must cancel;
- a present update depends on a future receiver state;
- the regular-domain acceleration differs from $c_f/|D_t|$ at fixed causal
  geometry;
- the same-transmitter transition depends on regulator path or resumes a
  nonintegrable open post-birth branch;
- a reception map claims energy closure without reading the present receiver
  velocity, except under a separately derived constant motion-energy account;
- an allocation rule makes the extraction cap depend on $D_r$ and thereby
  changes regular acceleration at a receiver-side playback fold;
- one reception updates account content away from the intercepted direction
  without a separately derived nonlocal redistribution rule;
- two regulator families inside the declared dominated class produce different
  birth impulses;
- energy closes while momentum or angular momentum does not;
- a boundary loss is omitted rather than emitted as flux;
- the construction imports electromagnetic potentials, gauge theory, Lorentz
  acceleration, physical architrino mass, or another observer-level field law
  as a premise.

## Promotion Boundary

Promotion requires an independent derivation or reference calculation for the
regular control, the coincident transition, and all three accounts. Agreement
between two implementations of the same assumed update checks implementation
parity only. Until these gates pass, this packet remains priority-only and the
EOM solver must continue not to advance at the unsupported coincident event.
