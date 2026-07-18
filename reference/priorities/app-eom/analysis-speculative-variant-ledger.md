# Speculative Master-Equation Variant Ledger

## Scope and authority

This ledger preserves three alternatives exposed by the 2026-07-18
[master-equation import audit](../master-equation-closure/brainstorming.md#import-audit-of-the-master-equation-main-path-2026-07-18-operator-requested).
It does not adopt any alternative as a law, add any alternative to an owned
queue, or authorize implementation. The canonical comparison is the
[Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md):
constant emission per unit absolute time, linear summation of admitted
source/root acceleration rows, and a finite-width parameter $\eta>0$ used as a
regulator whose simple-root predictions must converge as $\eta\to0^+$.

The three-axis falsification standard is:

1. **Internal closure:** energy, momentum, and angular-momentum wake-history
   rows close on the same retained record and under the same action convention.
2. **Anchored recovery:** the candidate preserves independently accepted
   recovery results, at minimum the static inverse-square limit, and any later
   accepted Darwin-order, Lorentz, or other observer-level recovery.
3. **Discriminating regime:** on identical initial data, the candidate and the
   canonical law predict separated outcomes that an independent oracle, closed
   form, or separately authored instrument can distinguish.

> **No knob-sweep numerical work is authorized from this ledger.** A sweep of
> a candidate over its own cadence, nonlinearity, or width parameters is
> evidence only about that candidate. Numerical work may begin only after the
> variant's form and any new physical scale are derived or explicitly declared
> by a separate operator-approved packet.

Each entry below is `priority-only`: it records a promotion boundary, not an
unowned work order.

## 1. Nonlinear superposition through the Noether sea

### Variant and replaced postulate

Let $a=(j,\ell)$ label one admitted source/root row at receiver $i$, and let
$\mathbf a_{i,a}(T)$ denote its canonical acceleration contribution. The
canonical postulate is

$$
\mathbf A_i^{\mathrm{lin}}(T)=\sum_a\mathbf a_{i,a}(T),
$$

with no interaction among causal wakes before reception. The nonlinear
alternative replaces this sum by a Noether-sea constitutive functional

$$
\mathbf A_i^{\mathrm{NL}}(T)
=
\mathcal S_i^{(\ell)}\!\left(
\mathcal B_{\mathrm{ret}}(T),
\theta_{\mathrm{sea}}^{(\ell)}(T);
\{\mathbf a_{i,a}(T)\}_a
\right),
$$

and defines the non-additivity row

$$
\boldsymbol\Delta_i^{\mathrm{NL}}(T)
\equiv
\mathbf A_i^{\mathrm{NL}}(T)-\sum_a\mathbf a_{i,a}(T).
$$

A genuine nonlinear-superposition member has
$\boldsymbol\Delta_i^{\mathrm{NL}}\ne\mathbf0$ on at least one retained
multi-source record, while reducing to the canonical one-source static row in
the inverse-square control. The functional must be derived from the shared
[Noether sea constitutive response](../master-equation-closure/pressure-dependent-noether-sea-constitutive-response.md),
including any wake-history cross-rows; an arbitrary polynomial, saturation
curve, density coefficient, or fitted response is not an admitted member.

**Claim level: speculation.** The displayed equation declares the eligible
functional form and its comparison row. No nonzero
$\boldsymbol\Delta_i^{\mathrm{NL}}$ has been derived, declared as a physical
law, or measured independently.

### Discriminating regime and instrument reach

The discriminating regime is a branch-preserving, multi-source Noether sea
record in which two or more admitted wake populations overlap strongly enough
to perturb the same constitutive state. On identical retained initial data,
linear superposition predicts $\boldsymbol\Delta_i^{\mathrm{NL}}=\mathbf0$;
a derived nonlinear functional predicts a signed, state-dependent cross-row.
The sharp observable is the acceleration and wake-ledger difference after the
single-source rows and their certified numerical remainders have been removed.

Current instruments cannot adjudicate this regime. The constitutive packet is
blocked because no accepted EOM-evolved retained branch yet binds the pressure
perturbation, receiver-normal branch strength, Noether sea state, and consumer
projections to one record. The EOM solver implements the linear sum, so replay
against that same path is not an independent nonlinear oracle. A toy density
law or a sweep over a chosen nonlinear coefficient would test only the inserted
model.

### Three-axis falsification

1. **Internal closure:** the member is falsified if
   $\boldsymbol\Delta_i^{\mathrm{NL}}$ changes the acceleration row without
   matching cross-terms that close energy, momentum, and angular momentum on
   the same retained wake ledger.
2. **Anchored recovery:** the member is falsified if its one-source or dilute
   limit fails the static inverse-square control, or if it breaks any later
   independently accepted recovery that the linear or another candidate law
   passes.
3. **Discriminating regime:** once $\mathcal S_i^{(\ell)}$ is derived, it is
   falsified if a separately authored same-record instrument encloses
   $\boldsymbol\Delta_i^{\mathrm{NL}}=\mathbf0$ while excluding the derived
   nonzero cross-row. Conversely, a certified nonzero cross-row under a shared
   constitutive record falsifies exact linear superposition on that record.

### Promotion condition

Promote this entry from speculation to an owned proof target only if the
constitutive-sea program produces an accepted shared retained record with a
nonzero cross-response that cannot be represented by the sum of its admitted
source/root rows and requires no consumer-specific fitted coefficient, or if
an AAA-native action/wake derivation independently produces a specific
$\mathcal S_i^{(\ell)}$ and its closing cross-ledger. Until one of those
results exists, there is no nonlinear solver task to own.

## 2. Discrete emission cadence

### Variant and replaced postulate

The canonical law treats emission time $S$ with the continuous measure $dS$:
each architrino emits potential at a constant rate per unit absolute time. A
precise discrete-cadence alternative replaces that measure for source $j$ by

$$
dS
\longrightarrow
d\mu_j^{\mathrm{cad}}(S)
\equiv
\tau_e
\sum_{n\in\mathbb Z}
\delta\!\left(S-S_{j,0}-n\tau_e\right)dS,
\qquad
\tau_e>0.
$$

The universal factor $\tau_e$ preserves unit mean emission per unit absolute
time for every architrino.
Inserted into the same causal-surface integral, this produces wakes only from
$S_{j,n}=S_{j,0}+n\tau_e$ rather than from every $S$. In the sharp-surface
member, reception is an impulse train; any finite pulse profile would be an
additional declared law, not part of the cadence substitution itself. A
physical member must derive both $\tau_e$ and the phase-state rule for
$S_{j,0}$. A numerical emission-time grid is quadrature and is not evidence of
physical cadence.

**Claim level: speculation.** The emission measure above declares the variant
precisely, but no AAA-native derivation fixes a nonzero $\tau_e$ or its
phase state.

### Discriminating regime and instrument reach

The discriminating regime has a reception, orbital, or branch-transition time
scale comparable to $\tau_e$. For a stationary source and receiver separated
by $r$, the closed-form control predicts arrivals at

$$
T_n=S_{j,0}+n\tau_e+\frac{r}{c_f},
$$

so the discrete member has a cadence line and phase-dependent impulses while
the canonical law has a continuous receiver-time acceleration row. In regimes
whose resolved time scales are all much larger than $\tau_e$, only the mean
can survive; those continuum-tested regimes constrain the cadence but do not
derive it.

Current EOM instruments cannot test physical cadence. They sample continuous
emission time to solve causal roots and therefore can test quadrature
convergence only. The stationary control supplies an independent closed form
after a physical $\tau_e$ and phase rule exist, but no present instrument can
discover those quantities by scanning them without making the result
circular.

### Three-axis falsification

1. **Internal closure:** the member is falsified if each emission event lacks
   a same-record source debit and in-flight wake assignment that closes energy,
   momentum, and angular momentum at reception. It is also falsified if the
   arbitrary choice of $S_{j,0}$ changes observables without a dynamical phase
   state that accounts for the loss of continuous time-translation symmetry.
2. **Anchored recovery:** the member is falsified if its continuum average
   misses the static inverse-square row, or if residual cadence impulses,
   dispersion, or phase dependence exceed the certified bounds of an
   independently accepted continuum-tested regime.
3. **Discriminating regime:** after $\tau_e$ and its phase rule are derived,
   the member is falsified if a time-resolved independent instrument excludes
   the predicted arrival line or impulse budget on identical initial history.
   A resolved cadence line with the derived phase and balance per event would
   falsify the exact continuous-emission postulate in that regime.

### Promotion condition

Promote this entry only if the action-transfer or wake-conservation program
derives discrete emission events and fixes their cadence and phase-state rule,
or if an independently measured substrate-level cadence signature is obtained
whose scale was fixed outside the cadence model and cannot be assigned to an
assembly cycle. Continuum agreement alone can set an upper bound on
$\tau_e$; it cannot promote the variant or authorize a cadence sweep.

## 3. Physical nonzero $\eta$

### Variant and replaced postulate

The canonical finite-width chart uses the Gaussian

$$
\delta_\eta(u)
=
\frac{1}{\sqrt{2\pi}\eta}
\exp\!\left(-\frac{u^2}{2\eta^2}\right),
$$

as a regulator and requires convergence to the sharp simple-root law as
$\eta\to0^+$. The precise physical-width alternative available from the
current binding keeps the same Gaussian profile but declares one universal
width

$$
\eta=\eta_\star>0
$$

as part of the exact causal-wake law. The fixed-$\eta_\star$ finite-width
integral is then the physical prediction; the sharp root sum is only its
small-width approximation. A different pulse profile is a different variant
and is not silently included here. The numerical Gaussian convention is not
itself a derivation of either the profile or $\eta_\star$.

**Claim level: speculation.** No AAA-native derivation identifies the Gaussian
as a physical wake profile or fixes a nonzero $\eta_\star$.

### Discriminating regime and instrument reach

There are two discriminating regimes:

- a certified simple-root common domain whose leading fixed-width defect
  $\mathbf D_2(T)$ is nonzero, so the physical member predicts a persistent
  $O(\eta_\star^2)$ acceleration, impulse, and position-moment offset rather
  than refinement to the sharp value; and
- a fold, caustic, or close-approach transit where finite wake thickness
  changes the resolved impulse while the sharp chart is unavailable or
  singular.

Current instruments can evaluate both mathematical finite-width regimes. The
common-domain matching theorem derives the leading defect and the EOM solver
has a certified finite-width route with an $\eta$ refinement ladder. Those
instruments presently test a regulator-limit contract: refinement toward zero
and an outward remainder. They cannot decide that one positive width is
physical, because the same Gaussian kernel generated both the candidate and
its comparison and no independent result fixes $\eta_\star$. Existing
positive-width runs are therefore numerical-chart evidence, not evidence for
a physical wake thickness.

### Three-axis falsification

1. **Internal closure:** the member is falsified if the fixed-width
   acceleration lacks energy, momentum, and angular-momentum wake-history rows
   that close at the same $\eta_\star$ and with the same boundary convention.
   Conservation claimed only after taking $\eta\to0^+$ does not close the
   physical member.
2. **Anchored recovery:** the member is falsified if its fixed
   $O(\eta_\star^2)$ defect or finite-width transit impulse violates the static
   inverse-square control or any independently accepted continuum-tested
   regime after numerical and retained-history remainders are included.
3. **Discriminating regime:** after $\eta_\star$ is independently fixed, the
   member is falsified if a simple-root or caustic instrument excludes its
   fixed-width impulse and position-moment rows while accepting the sharp-limit
   prediction. A persistent, independently reproduced fixed-width row with the
   derived scale would falsify the claim that $\eta$ is only a removable
   regulator.

### Promotion condition

Promote this entry only if an AAA-native action, wake-microstructure, or
well-posedness result derives a nonzero $\eta_\star$ and the physical profile,
or if a continuum-tested accepted record exposes a nonvanishing width
signature whose scale is fixed by an independent derivation and whose ledger
closes at that same width. Failure of one numerical refinement ladder, a
better fit at one positive Gaussian width, or a sweep over $\eta$ is not a
promotion result.

## Ledger disposition

All three entries remain **speculation** and **priority-only**. They preserve
the forms, discriminating regimes, falsifiers, and external promotion
conditions without assigning implementation, simulation, or proof ownership.
No canon change, EOM solver change, or numerical knob sweep follows from this
ledger.
