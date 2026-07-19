# The Master Equation — Going-Forward Proposal

This document proposes one focused correction to the Master Equation: the receiver's wake-crossing rate does not multiply the base acceleration. The transmitter's motion still matters because it changes how densely successive wake surfaces are laid down in space. The receiver's motion changes how the selected emission time moves through the transmitter's history, but that playback rate is not itself acceleration strength.

The proposed base equation is

$$
\boxed{
\mathbf A_r(T_r)
=
\sum_t
\sum_{T_t\in\mathcal C_{r\leftarrow t}(T_r)}
\kappa\,\sigma_{tr}\,|q_tq_r|
\frac{1}{r^2}
\frac{c_f}{|D_t|}
\hat{\mathbf r}_t
}
$$

This is a working proposal, not yet canon or an executable EOM solver change. Its status is deliberately narrow:

- **Accepted working decision:** the receiver factor $|D_r|/c_f$ is removed from the base acceleration.
- **Conditional derivation:** $c_f/|D_t|$ follows from uniform wake emission in transmitter time and the causal-root change of variables.
- **Retained postulates:** the inverse-square spatial dependence, radial line of action, polarity rule, linear superposition, and uniform emission measure remain model commitments unless separately derived.
- **Open:** singular transitions, conservation on general histories, independent discriminating tests, and any separately derived receiver-velocity-dependent acceleration.

Nothing in this proposal says that receiver velocity can never affect the complete dynamics. It says only that the root-playback identity $D_r/D_t$ does not justify multiplying this base acceleration by $|D_r|/c_f$.

## Terminology

| Symbol or term | Meaning |
| --- | --- |
| $T_r$ | reception time: the absolute time at which acceleration is evaluated |
| $T_t$ | emission time: an earlier absolute time on the transmitter's history |
| transmitter | the architrino whose past emission reaches the receiver; position $\mathbf X_t(T)$, velocity $\mathbf V_t(T)$, polarity $q_t$ |
| receiver | the architrino accelerated at $T_r$; position $\mathbf X_r(T)$, velocity $\mathbf V_r(T)$, polarity $q_r$ |
| $\mathbf r_t$ | emission-event separation $\mathbf X_r(T_r)-\mathbf X_t(T_t)$ |
| $r$ | $\|\mathbf r_t\|$ |
| $\hat{\mathbf r}_t$ | $\mathbf r_t/r$, directed from the transmitter's emission site toward the receiver |
| root | an emission time $T_t$ whose wake surface reaches the receiver at $T_r$ |
| $\mathcal C_{r\leftarrow t}(T_r)$ | the set of all active roots from transmitter $t$ to receiver $r$ at $T_r$ |
| $D_t$ | $c_f-\hat{\mathbf r}_t\cdot\mathbf V_t(T_t)$, the transmitter-side wake-spacing factor |
| $D_r$ | $c_f-\hat{\mathbf r}_t\cdot\mathbf V_r(T_r)$, the receiver-side wake-crossing rate |
| fold | a root birth or death event at which $D_t=0$ |
| $\sigma_{tr}$ | $\operatorname{sign}(q_tq_r)$: positive for like polarity and negative for unlike polarity |

The subscript $t$ means transmitter and the subscript $r$ means receiver. The current canonical symbols $D_s$ and $D_T$ map to $D_t$ and $D_r$, respectively. Terminology migration is separate from equation promotion.

## 1. The Causal Hit

A wake surface emitted by transmitter $t$ at $T_t$ reaches receiver $r$ at $T_r$ only when

$$
g(T_r,T_t)
\equiv
r-c_f(T_r-T_t)
=0.
$$

The equation compares two distances:

- $r$ is the distance from the transmitter's emission site $\mathbf X_t(T_t)$ to the receiver's reception site $\mathbf X_r(T_r)$;
- $c_f(T_r-T_t)$ is the radius reached by the wake surface during the elapsed absolute time.

A solution $T_t$ is a root. Every active root identifies one past emission event that contributes to the receiver's acceleration now. Curved or super-field-speed transmitter history can produce more than one active root, so the equation sums all of them.

Only the emission site enters the acceleration geometry. The transmitter's position at $T_r$ has no causal role in the arriving wake and does not appear in the proposed equation.

For an eternal transmitter history whose speed remains strictly below $c_f$, the causal function is strictly monotone and has one root under the usual reach assumptions. In a finite retained history, no-root intervals and roots crossing the history boundary must be handled explicitly; those are not interior fold events.

## 2. Why Transmitter Velocity Changes the Base Acceleration

Assume the transmitter emits wake uniformly per unit transmitter time. Consider the wake emitted during a small interval $dT_t$. Along the emission ray, the oriented spacing between neighboring wake surfaces is

$$
D_t\,dT_t
=
\left(c_f-\hat{\mathbf r}_t\cdot\mathbf V_t(T_t)\right)dT_t.
$$

If the transmitter moves toward the receiver along the emission ray, its later emission site moves closer while the earlier wake continues expanding. Neighboring wake surfaces are compressed. If it moves away, they are stretched. This is a spatial change in the arriving wake itself, not a change caused by how the receiver moves through it.

The same result follows directly from the hit condition. At fixed reception event,

$$
\frac{\partial g}{\partial T_t}
=
c_f-\hat{\mathbf r}_t\cdot\mathbf V_t(T_t)
=D_t.
$$

Collapsing a uniform transmitter-time wake integral onto its simple roots therefore gives

$$
\int dT_t\,f(T_t)\,\delta\!\left(g(T_r,T_t)\right)
=
\sum_{T_t\in\mathcal C_{r\leftarrow t}(T_r)}
\frac{f(T_t)}{|D_t|}.
$$

The denominator $1/|D_t|$ is thus the change-of-variables factor produced by uniform emission in $T_t$. Multiplication by $c_f$ normalizes a static transmitter, for which $D_t=c_f$, to unit weight.

This derivation is conditional on the uniform transmitter-time emission measure. A different emission measure would define a different model and would have to be justified independently.

## 3. Why Receiver Crossing Rate Does Not Multiply the Base Acceleration

Let an active root move as reception time advances: $T_t=T_t(T_r)$. Differentiating the same hit condition gives

$$
\frac{dT_t}{dT_r}
=
\frac{D_r}{D_t},
$$

where

$$
D_r
=
c_f-\hat{\mathbf r}_t\cdot\mathbf V_r(T_r).
$$

This identity says how many seconds of transmitter history are traversed per second of receiver time. It is required for root tracking:

- $D_r/D_t>0$: the selected emission time advances through transmitter history;
- $D_r/D_t<0$: the selected emission time runs backward through transmitter history;
- $D_r=0$: the selected emission time is instantaneously stationary as reception time advances.

None of those statements determines the instantaneous acceleration magnitude. They describe how the root label changes from one reception time to the next.

The distinction is the same as the distinction between a spatial slope and the rate at which a moving probe reads that slope. A steeper spatial wake changes the acceleration assigned at a location. Moving faster through an unchanged wake changes the time rate of the probe's readout. Converting that playback rate into extra acceleration would require an additional physical rule, such as a fixed impulse per crossed wake surface. No such rule has been derived for the base equation.

The earlier receiver multiplier

$$
\left|\frac{D_r}{D_t}\right|
$$

therefore combined two different operations:

1. the transmitter-time change of variables, which supplies $1/|D_t|$;
2. the receiver-time root-transport rate, which supplies $D_r/D_t$ only to playback and tracking.

The exact root-transport identity remains part of the dynamics machinery. Its promotion into base acceleration strength is rejected.

## 4. The Proposed Acceleration

For each active root, the proposed contribution is

$$
\mathbf A_{r\leftarrow t}(T_r;T_t)
=
\kappa\,\sigma_{tr}\,|q_tq_r|
\frac{1}{r^2}
\frac{c_f}{|D_t|}
\hat{\mathbf r}_t.
$$

The direction and polarity convention are:

- like polarities have $\sigma_{tr}=+1$ and accelerate apart along $\hat{\mathbf r}_t$;
- unlike polarities have $\sigma_{tr}=-1$ and accelerate toward the transmitter's emission site.

The receiver's total acceleration is the sum over every transmitter and every active root. Same-source roots are included whenever the receiver's own past history satisfies the positive-delay hit condition; only the trivial coincident event $T_t=T_r$ is excluded.

This is a delayed, past-history equation. It consumes the receiver's current state and transmitter histories at $T_t<T_r$. It consumes neither a transmitter's future path nor its position at $T_r$.

No additional action-derived correction is included here. The scalar-action investigations remain useful diagnostics, but they do not yet supply a general acceleration computable from retained past history. In a complete variation of the proposed two-time action, a worldline's present emission also couples to a partner's future reception. Until that future dependence is eliminated or rewritten as a causal retained-history state, the result cannot enter the Master Equation.

## 5. Singular Events and Boundaries

The sharp root formula is valid only for simple roots with

$$
D_t\ne0
$$

and nonzero separation. The following cases require separate treatment.

### 5.1 Transmitter-side folds

At $D_t=0$, the source-time change of variables fails. Two roots can be born or die at an interior fold. The sharp contribution diverges there and must be replaced by a finite-width wake calculation across the transition.

### 5.2 Receiver turning points

At $D_r=0$ with $D_t\ne0$, the root is instantaneously stationary as a function of reception time. This is not a fold and does not make the proposed acceleration vanish. It is a root-transport turning point that the root tracker must preserve.

### 5.3 Coincident endpoints and self-root birth

When an accelerating architrino crosses from below to above $c_f$, it can overtake wake surfaces emitted moments earlier. The newborn same-source root approaches the coincident endpoint with $D_t\to0$. Removing the former vanishing receiver numerator makes the local sharp impulse more singular, not less.

The existing frozen-history calculation finds a divergent, refinement-path-dependent impulse as wake width and core scale are removed. That calculation does not yet include the complete self-consistent feedback during root birth, so it establishes a promotion blocker rather than a final physical prediction. A finite physical wake width, a self-consistent cancellation, or another derived transition law is required.

### 5.4 Finite retained history

Roots may enter or leave the retained history window even when no interior fold occurs. The EOM solver must distinguish a genuine root birth or death from a memory-boundary event and must fail closed when the available history is insufficient.

## 6. Evidence Required Before Promotion

The proposal is not selected merely because it is simpler than the current receiver-weighted law. Promotion requires evidence that addresses the law rather than reproducing its own output.

### 6.1 Mathematical checks

1. The uniform-emission finite-width equation and its $c_f/|D_t|$ simple-root limit are derived in [Source-Density Finite-Width Equation and Simple-Root Limit](analysis-source-density-finite-width-simple-root-limit.md). This closes the algebraic reduction, but it still requires independent review and does not cover folds or coincident endpoints.
2. Produce a finite, regulator-independent treatment of transmitter-side folds and the coincident same-source transition, or establish a finite physical wake width with an independently constrained value.
3. Prove that every acceleration contribution is computable from current receiver state plus retained past histories, with no prescribed future path.
4. Construct energy, momentum, and angular-momentum wake accounts on the same past-history records and show that their balances close beyond symmetry-degenerate examples.

### 6.2 Discriminating tests

At least one independently checkable configuration must distinguish

$$
\frac{c_f}{|D_t|}
\qquad\text{from}\qquad
\left|\frac{D_r}{D_t}\right|
$$

while holding the root, emission geometry, transmitter history, separation, polarity, and numerical regulators fixed. A stationary receiver cannot perform this test because $D_r=c_f$ makes the two expressions identical.

Useful tests must not use an oracle derived from either candidate law. A closed form from an independently justified wake model, a separately authored instrument with declared reach, or a downstream recovery calculation can supply independent evidence.

### 6.3 Recovery obligations

Observer-level electrodynamics, magnetism, Lorentz behavior, and assembly dynamics remain downstream recovery targets. They are not premises that may be inserted into the architrino-level equation. If receiver-velocity-dependent acceleration is required for those recoveries, it must be derived through an architrino-native mechanism, assembly dynamics, or Noether sea response rather than restored by reusing the unsupported receiver playback multiplier.

## 7. Migration Plan

Nothing migrates merely because this proposal has been rewritten.

The equation change and the terminology change are separate decisions. The equation must pass the promotion gates in Section 6. The terminology migration may be prepared in parallel, but it must not silently alter equations, machine contracts, or historical evidence.

### 7.1 Proposed terminology map

The proposed reader-facing map is

$$
D_s\mapsto D_t,
\qquad
D_T\mapsto D_r.
$$

The meanings, not merely the letters, must remain fixed:

- $D_t=c_f-\hat{\mathbf r}_t\cdot\mathbf V_t(T_t)$ is evaluated at the transmitter's past emission event and controls wake spacing and the emission-time change of variables;
- $D_r=c_f-\hat{\mathbf r}_t\cdot\mathbf V_r(T_r)$ is evaluated at the receiver's current reception event and controls root playback as reception time advances;
- $T_t$ always denotes emission time and $T_r$ always denotes reception time;
- $\mathbf r_t$ always runs from the transmitter's emission site to the receiver's reception site.

These definitions must be approved as one notation set before any broad replacement begins. A search-and-replace is unsafe because the existing letter $T$ sometimes means an absolute-time variable rather than a receiver label, while `source` and `receiver` also appear in frozen schema fields and evidence records.

### 7.2 Semantic inventory before edits

The migration begins with a read-only inventory that classifies every affected use into one of these groups:

1. reader-facing definitions, equations, diagrams, and explanations;
2. priority analyses and active proof obligations;
3. EOM solver symbols and internal identifiers;
4. schemas, command-line fields, certificates, and other machine contracts;
5. validators, tests, fixtures, and independent checking instruments;
6. generated artifacts and their canonical source files;
7. frozen evidence, provenance records, hashes, and historical decision records.

Each occurrence receives a proposed disposition: rename, rewrite because its meaning changes, preserve as historical text, preserve as a compatibility field, or retire. This inventory is also where ambiguous uses are resolved before they can spread.

### 7.3 Canonical documents

After the evidence conditions are met, canonical chapters that state the Master Equation should replace the receiver-weighted base factor with $c_f/|D_t|$. The terminology definitions should be updated first, followed by the Master Equation and then every dependent derivation in causal order.

Every affected derivation must be rechecked rather than mechanically relabeled. Statements that rely on a receiver zero, sign reversal, or speed governor change mathematically when the receiver numerator is removed. Historical files whose purpose is to record what was previously tested should remain factually intact and should receive a current disposition rather than rewritten history.

### 7.4 EOM solver and machine contracts

The EOM solver must not change until the finite-width equation, transition behavior, retained-history requirements, and conservation accounts are specified. When implementation is authorized, the solver must retain $D_r/D_t$ for root continuation while excluding $|D_r|/c_f$ from acceleration magnitude.

Before code changes, the migration must decide the exact internal names, external field names, and compatibility policy. Internal identifiers may be renamed together once the consuming code and tests are mapped. Published schema fields and certificate keys require an explicit version transition; compatibility aliases, if any are necessary, must be confined to declared input or output boundaries and assigned a removal condition. Frozen evidence is never rewritten to imitate the new schema.

### 7.5 Existing evidence

Fixtures, simulations, and certificates generated under the receiver-weighted equation do not transfer automatically. Each artifact must declare whether the changed factor affects its consumed acceleration, branch transition, acceptance criterion, or only unused diagnostics. The inventory must distinguish:

- evidence that remains valid because it concerns root geometry independent of acceleration strength;
- diagnostic evidence that remains informative but cannot select the new equation;
- evidence invalidated by the removed receiver multiplier;
- evidence that can be rerun only after a new independent acceptance test exists.

Regenerated artifacts must remain distinguishable from historical evidence and must not reuse a frozen provenance identity.

### 7.6 Validators and generated artifacts

Validators that currently require receiver-normal acceleration are part of the old law, not neutral judges of the new one. They must be inventoried and either retired, renamed as historical checks, or replaced by independently justified tests. The existing receiver-normal clean-slate check is an explicit example: changing its expected factor at the same time as the EOM solver would test implementation agreement, not the physical rule.

Canonical source files are edited before generated copies. Generation occurs only during the authorized migration batch, followed by the corresponding check commands. Before-and-after searches must verify that old symbols remain only in approved historical or compatibility locations.

### 7.7 Execution order

1. Freeze the terminology definitions and exact symbol map.
2. Produce the classified occurrence inventory and resolve every ambiguous use.
3. Complete the equation's promotion evidence independently of the renaming.
4. Update terminology definitions and canonical mathematical documents.
5. Version machine contracts and implement the EOM solver change only after explicit authorization.
6. Update dependent tests and independent checking instruments without using one as an oracle for the other.
7. Regenerate authorized derived artifacts and run the full validation set.
8. Record the disposition of every old-law evidence artifact and every deliberately retained old term.

### 7.8 Promotion gate

No canon or solver migration occurs until all of the following are satisfied:

1. the uniform-emission finite-width law and its proposed simple-root limit have passed independent mathematical review;
2. the fold and coincident-endpoint transitions have a finite accepted treatment;
3. the acceleration is a causal functional of current state and retained past history only;
4. energy, momentum, and angular-momentum accounts close on nondegenerate test histories;
5. at least one independent discriminator has tested the receiver-factor decision;
6. downstream derivations and evidence artifacts affected by the change have been inventoried and given explicit dispositions.

Until then, this document records the working decision and its proof obligations. It does not change canon, code, or accepted evidence.
