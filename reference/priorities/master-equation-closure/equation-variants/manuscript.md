# The Master Equation and its research variations

The Master Equation specifies how arriving causal wakes accelerate an architrino. Its research variations change the response to an arrival, the permitted path speed, or the information carried and exchanged by wakes. This document places their equations side by side using shared notation. Sections 2–6 explain the baseline and already selected research specifications. Sections 7–15 formulate additional proposals, including deliberate departures from the current response vision. The [authorization index](README.md) owns standing research scopes; adding a proposal here does not select its coefficients, event rules or execution. The canonical equation remains the baseline of $\mathbb{A}\mathbb{A}\mathbb{A}$, and authorization to investigate an equation does not adopt it as the physical law.

## Taxonomy at a glance

In the path-speed column, “no limit” means no ceiling imposed by the equation; it does not promise that every history has a defined acceleration. Wake propagation retains speed $c_f$ in every row. The amplitude-gradient row's strict subfield bound is its selected research domain, rather than a mechanism enforcing a ceiling.

| Equation or specification | Architrino path speed | Response to an ordinary arrival | Response at the speed boundary | Scope and location |
| --- | --- | --- | --- | --- |
| Canonical Master Equation | No limit | Inverse-square, transmitter weighted | No added response | Baseline; Section 2 |
| Logarithmic response | No limit | Inverse-distance, transmitter weighted | No added response | Authorized research; Section 3 |
| Canonical equation with a strict ceiling | $\|\mathbf V_i\| < c_f$ | Canonical response in the open domain | Equality excluded; no continuation supplied | Authorized ceiling family; Section 4 |
| Canonical equation with an inclusive ceiling, domain only | $\|\mathbf V_i\| \le c_f$ | Canonical response wherever defined | Inequality alone supplies no replacement acceleration | Authorized ceiling family; Section 4 |
| Canonical equation with the examined projected ceiling | $\|\mathbf V_i\| \le c_f$ | Canonical partner sum below the boundary | Remove the net forward component after summation | Examined zero-self-response specification; Section 4 |
| Logarithmic response with a strict ceiling | $\|\mathbf V_i\| < c_f$ | Logarithmic response in the open domain | Equality excluded; no continuation supplied | Authorized combination; Section 5 |
| Logarithmic response with an inclusive ceiling, domain only | $\|\mathbf V_i\| \le c_f$ | Logarithmic response wherever defined | Inequality alone supplies no replacement acceleration | Authorized combination; Section 5 |
| Logarithmic response with a selected projected ceiling | $\|\mathbf V_i\| \le c_f$ | Logarithmic sum below the boundary | Remove the net forward component after summation | Requires the explicit projection and self clauses; Section 5 |
| Amplitude-gradient response | $\|\mathbf V_i\| \le (1-\eta)c_f < c_f$, $\eta>0$, in the selected investigation | Spatial derivative of the transmitter-weighted inverse-range amplitude | No boundary response selected | Authorized bounded regular-pair investigation; Section 6 |
| Complete Maxwell-shaped transmitter response | Defined here on uniformly subfield histories; no limit, $\le c_f$ and $<c_f$ are proposed comparisons | Amplitude gradient plus time derivative of a velocity-carrying wake | Equality and superfield extensions unresolved | Proposed acceleration law; Section 7 |
| Complete Maxwell-shaped receiver response | Same proposed regimes as Section 7 | Complete transmitter response plus receiver-velocity turning term | Same unresolved extensions | Proposed acceleration law; Section 8 |
| Weber-inspired relative-motion response | No limit, $\le c_f$ or $<c_f$, to be selected | Radial response depends on relative separation rate and acceleration | Implicit acceleration must be solvable; ceiling response separate | Constitutive family, coefficients unresolved; Section 9 |
| Darwin-inspired interaction comparison | Low-speed subset in any regime label | Instantaneous velocity-coupled variational interaction | No near-ceiling or superfield authority | Approximate comparison; Section 10 |
| Finite-width wake reception | No limit, $\le c_f$ or $<c_f$, to be selected | Integrate a declared reception window rather than sample exact roots | Finite input must be established before projection | Window/core family, scales unresolved; Section 11 |
| History-based self response and emission recoil | No limit, $\le c_f$ or $<c_f$, to be selected | Add an explicitly defined self-history response; emission recoil requires an exchange rule | Does not automatically enforce a ceiling | Illustrative response family; Section 12 |
| Transported wake state and reciprocal exchange | No limit, $\le c_f$ or $<c_f$, to be selected | Coupled propagation, emission and reception update | Boundary update and accounts unresolved | Formulation with unspecified constitutive maps; Section 13 |
| Time-symmetric direct interaction | No limit, $\le c_f$ or $<c_f$, to be selected | Weighted past- and future-supported radial contributions | Root events and future boundary conditions unresolved | Boundary-value comparison family; Section 14 |
| Other radial powers | No limit, $\le c_f$ or $<c_f$, to be selected | Replace inverse-square falloff by a fixed exponent | Distance and arrival singularities remain separate | Exponent and normalization unresolved; Section 15 |

The table distinguishes selected investigations from proposed families. The quarantined quadratic receiver-speed multiplier remains only a side note in Section 6. The [Maxwell assessment](../analysis/maxwell-derived-response-assessment-2026-10-03.md) and [comparison-only yardstick](../analysis/maxwell-yardstick-ledger-2026-10-04.md) retain their original evidence and scope. Sections 7 and 8 now explain how their response formulas could be examined as alternative acceleration laws; the mechanism, complete domain and execution remain choices.

For Sections 7–15, the proposed coverage is:

| Proposal | No limit, including superfield histories | Inclusive $\le c_f$ | Strict $<c_f$ |
| --- | --- | --- | --- |
| Maxwell-shaped transmitter and receiver responses | Define all-root and singular extensions first | Define equality input and boundary response first | Begin on separated compatible uniformly subfield histories |
| Weber-inspired response | Establish the implicit acceleration solve | Same solve plus boundary response | Same solve on the strict domain |
| Darwin-inspired comparison | Low-speed controls only | Low-speed controls only | Low-speed subset only |
| Finite-width reception, self-history response, transported wake state and radial powers | Proposed after full constitutive definition | Proposed with explicit boundary clauses | Proposed on a declared strict domain |
| Time-symmetric direct interaction | Future boundary data and complete root support required | Same plus ceiling clauses | Same on the strict domain |

These entries describe a proposed research reach, not existence or uniqueness results. In particular, a strict inequality is not a uniform history margin, and an inclusive inequality supplies no response to undefined input.

## 1. Shared geometry, notation and field-speed ceiling options

Absolute reception time is $T$, and the earlier emission time is $S$. Position, velocity and acceleration are $\mathbf X_i(T)$, $\mathbf V_i(T)=\mathbf X_i'(T)$ and $\mathbf X_i''(T)$. For receiver $i$ and transmitter $j$, define

$$
\mathbf r_{ij}(T,S)=\mathbf X_i(T)-\mathbf X_j(S),\qquad
R_{ij}=\|\mathbf r_{ij}\|,\qquad
\mathbf n_{ij}=\frac{\mathbf r_{ij}}{R_{ij}}
$$

An emission arrives when its wake has traversed exactly the separation between its emission point and the receiver:

$$
\mathcal C_{ij}(T)=\{S<T:R_{ij}(T,S)=c_f(T-S)>0\},\qquad
D_{t,ij}=c_f-\mathbf n_{ij}\cdot\mathbf V_j(S)
$$

The formulas here concern ordinary roots: positive separation, isolated emission time and $D_{t,ij}\ne0$. The acceleration weight is $c_f/|D_{t,ij}|$. Let $\sigma_{ij}=\operatorname{sign}(q_iq_j)$, $K_{ij}=\kappa|q_iq_j|>0$ and $K_{\log,ij}=\kappa_{\log}|q_iq_j|>0$. Positive polarity product gives repulsion; negative product gives attraction. Unless a selected clause says otherwise, sums include all admitted positive-delay self arrivals with $j=i$. They exclude the same-time endpoint $S=T$. Infinite sums require convergence, and nonordinary events require a separate treatment.

### Three speed options

The field-speed ceiling concerns the architrino's path speed, not a change to wake propagation. The three options are

$$
\boxed{
\begin{aligned}
\text{No path-speed limit:}&\quad \mathbf V_i\in\mathbb R^3\\
\text{Inclusive ceiling:}&\quad \|\mathbf V_i\|\le c_f\\
\text{Strict ceiling:}&\quad \|\mathbf V_i\|<c_f
\end{aligned}}
$$

“No limit” retains subfield, field-speed and superfield histories wherever the response is defined. The inclusive ceiling admits equality; the strict ceiling excludes it. Neither inequality by itself specifies an acceleration response that keeps an evolving path inside the selected domain. In particular, excluding an endpoint is not a prescription for passing through it.

A uniform strict gap is stronger than the strict inequality:

$$
\|\mathbf V_i(S)\|\le(1-\eta)c_f,\qquad \eta>0
$$

The same positive gap must hold over the declared histories. It controls root conditioning in the regular-pair investigation. A path whose speed is below $c_f$ at each finite past time can approach $c_f$ arbitrarily closely in the remote past and fail that uniform-gap condition.

### The examined inclusive response

For a finite ordinary summed input $\mathbf F_i$, define the boundary response

$$
\boxed{
\mathcal P(\mathbf V_i,\mathbf F_i)=
\begin{cases}
\mathbf F_i,&\|\mathbf V_i\|<c_f\\
\mathbf F_i-(\widehat{\mathbf v}_i\cdot\mathbf F_i)_+\widehat{\mathbf v}_i,&\|\mathbf V_i\|=c_f
\end{cases}
\qquad
\widehat{\mathbf v}_i=\frac{\mathbf V_i}{c_f},\quad (z)_+=\max(z,0)
}
$$

Below the ceiling the response leaves the input unchanged. At the ceiling it removes the net component that would increase speed, preserves transverse turning and permits slowing. This is the response derived within the [examined constrained model](field-speed-ceiling/definition.md#13-the-velocity-constraint-and-response-order), under its absolutely continuous velocity and normal-cone clauses. It is an additional specification, not a consequence of the inequality alone.

Apply this response after summing the admitted contributions. Projecting each hit separately produces a different equation. The map accepts finite ordinary input; it does not make an undefined singular input finite, delete wakes or provide a contact rule. The examined canonical ceiling model also selects zero self acceleration at and below the ceiling, including equality; that clause must be stated separately whenever this particular model is used.

## 2. Canonical Master Equation

$$
\boxed{
\mathbf X_i''(T)=\mathbf A_i^{\mathrm{ME}}(T)
=\sum_j\sum_{S\in\mathcal C_{ij}(T)}
\sigma_{ij}K_{ij}\frac{c_f}{|D_{t,ij}|}
\frac{\mathbf n_{ij}}{R_{ij}^2}
}
$$

Each arriving hit contributes an inverse-square acceleration along the direction from the past emission point to the current receiver. Transmitter motion changes the density of arriving wake surfaces through $c_f/|D_{t,ij}|$. Receiver motion changes which history is encountered and how its roots advance; it supplies no extra receiver-speed multiplier in this equation. The coupling has dimension $[K_{ij}]=L^3T^{-2}$.

This is the [canonical causal-root sum](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), expressed in the shared notation. Its unbounded velocity domain does not remove its positive-separation, root-regularity or convergence obligations. The boxed ordinary-root expression supplies no continuation across a singular root birth or coincidence.

## 3. Logarithmic response

$$
\boxed{
\mathbf X_i''(T)=\mathbf A_i^{\log}(T)
=\sum_j\sum_{S\in\mathcal C_{ij}(T)}
\sigma_{ij}K_{\log,ij}\frac{c_f}{|D_{t,ij}|}
\frac{\mathbf n_{ij}}{R_{ij}}
}
$$

The adjustment replaces $K_{ij}/R_{ij}^2$ by $K_{\log,ij}/R_{ij}$ while retaining causal propagation, polarity, transmitter weighting and addition of admitted hits. Its motivation is to examine a less singular radial response. Changing the distance power also changes the coupling dimension to $[K_{\log,ij}]=L^2T^{-2}$; reusing the inverse-square coupling without a declared length normalization would obscure that change.

The logarithmic name comes from a local scalar representative. On a connected ordinary branch, with $\varepsilon=\operatorname{sign}(D_{t,ij})$ fixed and reference length $R_0>0$, that representative is

$$
\Phi_{ij}^{\log}=-\sigma_{ij}K_{\log,ij}\varepsilon\ln(R_{ij}/R_0),\qquad
-\nabla_{\mathbf x}\Phi_{ij}^{\log}
=\sigma_{ij}K_{\log,ij}\frac{c_f}{|D_{t,ij}|}\frac{\mathbf n_{ij}}{R_{ij}}
$$

The derivative holds reception time and source history fixed and follows the implicit emission root. Changing $R_0$ adds a branchwise constant and leaves the acceleration unchanged. This derived local identity, explained in the [logarithmic definition](logarithmic-potential/manuscript.md#master-equation-before-and-after-a-logarithmic-replacement), supplies neither a global action nor a conserved account for a mutually evolving pair. The response is still singular at zero range and at a zero transmitter factor.

## 4. Canonical Master Equation with a ceiling

The strict and inclusive domain-only choices are

$$
\boxed{
\mathbf X_i''(T)=\mathbf A_i^{\mathrm{ME}}(T),\qquad
\|\mathbf V_i\|<c_f\ \text{or}\ \|\mathbf V_i\|\le c_f
}
$$

Select one inequality for a scenario. The acceleration remains canonical wherever defined. If that acceleration would drive the path outside the domain, the selected specification encounters a boundary obstruction; the inequality supplies no replacement law.

The specifically examined inclusive projected model instead is

$$
\boxed{
\mathbf F_i^{\mathrm{ME}}(T)=
\sum_{j\ne i}\sum_{S\in\mathcal C_{ij}(T)}
\sigma_{ij}K_{ij}\frac{c_f}{|D_{t,ij}|}\frac{\mathbf n_{ij}}{R_{ij}^2},\qquad
\mathbf X_i''(T)=\mathcal P(\mathbf V_i,\mathbf F_i^{\mathrm{ME}}),\qquad
\|\mathbf V_i\|\le c_f
}
$$

The partner-only sum states this examined model's explicit zero-self-response clause. Below the ceiling its partner acceleration equals the canonical partner contribution; at equality it applies Section 1's response to the complete ordinary partner sum. It introduces no velocity jump, frozen-root suppression or nonordinary event prescription. Historical studies that add those rules are distinct models, as the [shared ceiling definition](field-speed-ceiling/definition.md#current-scope-and-evidence-boundary) explains. A projected finite-input response alone does not settle continuation when a whole emission interval arrives at once.

## 5. Logarithmic response with a ceiling

With only a speed-domain restriction, the combination is

$$
\boxed{
\mathbf X_i''(T)=\mathbf A_i^{\log}(T),\qquad
\|\mathbf V_i\|<c_f\ \text{or}\ \|\mathbf V_i\|\le c_f
}
$$

The inverse-distance law applies wherever defined inside the chosen domain. Equality is excluded in the strict case and admitted in the inclusive case, but neither version adds a boundary response.

For a scenario expressly selecting the inclusive projection and zero self response, the complete specification is

$$
\boxed{
\mathbf F_i^{\log}(T)=
\sum_{j\ne i}\sum_{S\in\mathcal C_{ij}(T)}
\sigma_{ij}K_{\log,ij}\frac{c_f}{|D_{t,ij}|}\frac{\mathbf n_{ij}}{R_{ij}},\qquad
\mathbf X_i''(T)=\mathcal P(\mathbf V_i,\mathbf F_i^{\log}),\qquad
\|\mathbf V_i\|\le c_f
}
$$

This combines two changes: inverse-distance partner reception and post-summation removal of forward acceleration at the ceiling. The self clause is explicit, not inferred from the names of the variations. A scenario retaining a different self treatment must declare that treatment and define its summed input before using the projection. The [combination procedure](combined-variations.md) and [collinear treatment](../collinear-research/analysis/logarithmic-collinear-manuscript.md#strict-and-inclusive-speed-ceilings-for-logarithmic-attraction) distinguish these specifications and their separate boundary results. None of the boxes defines an acceleration at a nonordinary equality family.

## 6. Amplitude-gradient response on the selected regular-pair domain

This authorized bounded variation differentiates the entire transmitter-weighted inverse-range amplitude. It is distinct from the quarantined quadratic receiver multiplier in the side note below. For a receiver-position variable $\mathbf x$, use the same causal equation with $\mathbf X_i(T)$ replaced by $\mathbf x$ and define $D=D_t/c_f$ on each admitted branch. The law is

$$
\boxed{
\mathbf X_i''(T)=\sum_{j,S}
\left.
\left(-\sigma_{ij}K_{ij}\nabla_{\mathbf x}\frac{1}{R|D|}\right)
\right|_{\mathbf x=\mathbf X_i(T)}
}
$$

The derivative holds $T$ and the complete source history fixed while following the implicit root $S(T,\mathbf x)$. It acts branchwise on already admitted ordinary hits. With normalized wake-speed units $c_f=1$, let $\mathbf v=\mathbf X_j'(S)$ and $\mathbf a=\mathbf X_j''(S)$. On the selected positive-$D$ domain, the expanded per-hit equation is

$$
\boxed{
\mathbf A_{i\leftarrow j}
=\frac{\sigma_{ij}K_{ij}}{R^2D^3}
\left[(1-\|\mathbf v\|^2)\mathbf n-D\mathbf v
+R\mathbf n(\mathbf n\cdot\mathbf a)\right]
}
$$

For symbolic $c_f$, replace $\mathbf v$ by $\mathbf v/c_f$ and $\mathbf a$ by $\mathbf a/c_f^2$ inside the bracket, with $D=1-\mathbf n\cdot\mathbf v/c_f$. The coupling retains dimension $L^3T^{-2}$. Unlike the canonical row, this response samples the source acceleration as well as its position and velocity. A stationary source still gives the canonical inverse-square acceleration. For an affine subfield source the correction has no term linear in source velocity; that exact control motivated examining whether the canonical slow circular push could be reduced.

The [selected definition](../analysis/amplitude-gradient-regular-pair-investigation.md#1-selected-equation-and-dimensions) and [independent adjudication](../analysis/amplitude-gradient-independent-adjudication.md) restrict the investigation to a finite opposite-polarity pair with complete separated compatible uniformly subfield histories and the stated regularity. On that domain there is one partner root and no positive-delay self root, by causal geometry rather than imposed suppression. The definition is not a gradient of a globally self-inclusive scalar at the receiver's own location, where that scalar is singular. No cap, singular-event continuation, population extension or physical account is selected. The authorization index links the subsequent controlled long-time results and their narrower preparation assumptions.

### Side note: quarantined quadratic receiver-speed multiplier

The historical [quadratic-response examination](../collinear-research/analysis/strict-speed-quadratic-response.md) used

$$
\mathbf X_i''(T)=\left(1-\frac{\|\mathbf V_i(T)\|^2}{c_f^2}\right)\mathbf A_i^{\mathrm{ME}}(T),\qquad
\|\mathbf V_i(T)\|<c_f
$$

This multiplies the complete canonical acceleration by a factor depending on the receiver's present speed. It is neither the amplitude-gradient law nor an automatic consequence of a strict ceiling. The [quarantine disposition](../collinear-research/README.md#quarantined-quadratic-response-examinations) preserves the study as inactive evidence; reuse requires explicit selection for a named scenario. Its results must not be transferred to the canonical, logarithmic or ceiling-only equations.

## 7. Complete Maxwell-shaped transmitter response

This proposal adds a velocity-carrying wake to the scalar amplitude used in Section 6. It asks whether the source's motion should change the arriving acceleration's direction as well as its magnitude. The formulation below is a comparison-inspired acceleration law; it is not a derivation of electromagnetic behavior from the canonical equation.

We work in normalized wake-speed units with $c_f=1$. On an ordinary positive-$D$ root let $\mathbf v=\mathbf X_j'(S)$, $\mathbf a=\mathbf X_j''(S)$, $D=1-\mathbf n\cdot\mathbf v$ and $\Psi=1/(RD)$. Define the transmitter response by

$$
\boxed{
\begin{aligned}
\mathbf E_{ij}&=-\nabla_{\mathbf x}\Psi-\partial_T(\Psi\mathbf v)\\
&=\frac{(1-\|\mathbf v\|^2)(\mathbf n-\mathbf v)
+R\big[(\mathbf n-\mathbf v)(\mathbf n\cdot\mathbf a)-D\mathbf a\big]}{R^2D^3}\\
\mathbf X_i''(T)&=\sum_j\sum_{S\in\mathcal C_{ij}(T)}\sigma_{ij}K_{ij}\mathbf E_{ij}
\end{aligned}
}
$$

Here $\mathbf E_{ij}$ is a response kernel with dimension inverse length squared, not a new independently existing electric field. Both derivatives hold the complete source history fixed; the spatial derivative holds reception time fixed, and the time derivative holds receiver position fixed. Both follow the changing emission root. The first derivative is the amplitude-gradient contribution. The second differentiates the source velocity carried by the same amplitude. Their sum gives the displayed numerator. For symbolic $c_f$, replace source velocity by $\mathbf v/c_f$ and source acceleration by $\mathbf a/c_f^2$ in that numerator and use $D=D_t/c_f$.

A stationary source gives $\mathbf E_{ij}=\mathbf n/R^2$, exactly the canonical stationary response. For a uniformly moving source, the direction $\mathbf n-\mathbf v$ points from its present position rather than its emission position. For an accelerating source, the term proportional to $1/R$ is transverse to $\mathbf n$: dotting its numerator with $\mathbf n$ gives zero. These are derived regular-branch identities. The correspondence to the electric part of the moving point-source Maxwell solution is a labeled comparison, as explained by [Feynman](https://www.feynmanlectures.caltech.edu/II_21.html) and the [existing decomposition](../analysis/maxwell-derived-response-assessment-2026-10-03.md#2-the-three-response-rows).

On the prescribed slow mirror circle, this kernel changes the amplitude-gradient forward cubic tangential residual into a backward cubic residual. The original assessment derives that coefficient at self-reviewed grade and checks it by independently implemented finite differences; it supplies no coupled long-time evolution or stability result. The [yardstick ledger](../analysis/maxwell-yardstick-ledger-2026-10-04.md) also records ring balances at measured grade. A stationary-source mismatch or a nontransverse delayed-acceleration term would falsify the identities above; a growing perturbation of a balanced history would falsify a later stability claim.

The equation is defined here only on separated compatible uniformly subfield histories. There are no positive-delay self roots there, by geometry, rather than an added deletion. The $D^{-3}$ factor makes extension to folds a separate mathematical problem; its numerator and complete branch sum must be evaluated before deciding integrability. Neither inserting an absolute value in the denominator nor extrapolating the displayed formula above wake speed is an established extension. The unrestricted and inclusive-ceiling cases need their own complete-root and singular-event definitions. Strictly subfield research can begin without resolving those extensions, but a ceiling-enforcing mechanism has not been specified.

## 8. Complete Maxwell-shaped receiver response

This proposal adds a dependence on the receiver's present velocity to Section 7. It tests whether turning that depends on both transmitted motion and received motion changes binding or stability. In the same normalized units, let $\mathbf u=\mathbf V_i(T)$ and use the already defined $\mathbf E_{ij}$:

$$
\boxed{
\begin{aligned}
\mathbf M_{ij}&=\mathbf n(\mathbf u\cdot\mathbf E_{ij})-(\mathbf u\cdot\mathbf n)\mathbf E_{ij}\\
\mathbf X_i''(T)&=\sum_j\sum_{S\in\mathcal C_{ij}(T)}
\sigma_{ij}K_{ij}\big[\mathbf E_{ij}+\mathbf M_{ij}\big]
\end{aligned}
}
$$

The magnetic-type contribution $\mathbf M_{ij}$ is written with dot products and directions, so no separate magnetic field is required to evaluate it. It vanishes for a stationary receiver. Its dot product with $\mathbf u$ is identically zero, so each such contribution turns the receiver without directly changing its speed. It need not be perpendicular to the source–receiver separation. For symbolic $c_f$, use $\mathbf u/c_f$ in this expression and the dimensional restoration stated in Section 7 for $\mathbf E_{ij}$.

This is an acceleration-first exploratory law. The classical electromagnetic coupling to a massive body's momentum and its velocity-dependent inertial response are not included. Consequently the proposal must not be called complete classical electrodynamics merely because its response kernel matches that comparison. The [assessment](../analysis/maxwell-derived-response-assessment-2026-10-03.md#6-obstacles-specific-to-this-proposal) also explains why classical radiation self reaction has no automatic counterpart in the positive-delay root sum.

The [identical-history comparison](../analysis/maxwell-yardstick-ledger-2026-10-04.md#37-isolating-transmitter-and-receiver-changes-on-identical-histories) isolates Sections 7 and 8 using independent numerical derivatives of the scalar and vector wake quantities, including the vector quantity's curl. The existing yardstick agrees with its observer-level common-translation target when this term is included, but that agreement inserts the target structure and is not independent recovery evidence. A nonzero $\mathbf u\cdot\mathbf M_{ij}$ would falsify the no-speed-change identity. The same strict-domain, fold and equality limitations as Section 7 apply. The research hypothesis is that the additional turning changes actual coupled structures; the current prescribed-history comparisons do not establish that hypothesis.

### 8.1 What the receiver contribution changes

On the same reception event and source histories, adding the receiver contribution changes acceleration by $\sum_{j,S}\sigma_{ij}K_{ij}\mathbf M_{ij}$. Its projection along the receiver's velocity vanishes exactly. Thus it leaves the instantaneous speed derivative unchanged while changing direction. Once two candidate trajectories diverge, their sampled roots and transmitter input can differ; identical instantaneous speed derivatives do not imply identical future speeds.

| Prescribed history | Adding M to E | Grade and scope |
| --- | --- | --- |
| Stationary receiver | No change | Derived identity |
| Collinear source and receiver motion, including source acceleration | No change | Derived cancellation on an ordinary root |
| Common translation with transverse separation | Multiply transverse acceleration by $1-\beta^2$, where $\beta=\|\mathbf u\|/c_f$ | Derived; at $\beta=0.6$ the normalized response changes from $1.25$ to $0.80$ |
| Opposite-polarity antipodal circle | Tangential input stays identical; radial input changes | Tangential identity derived; inward radial magnitude at $\beta=0.5$ changes from $0.196873$ to $0.261679$, measured with $K=R_0=c_f=1$ |
| Four-member alternating ring at its measured tangential zero | Same zero speed; larger radius needed for circular balance | Measured candidate: radius changes from $2.067839K/c_f^2$ to $2.559211K/c_f^2$ |
| 24-member alternating ring at its measured tangential zero | Same zero speed; radial input changes from outward to inward | Measured candidate: E has no positive balancing radius at this zero; E+M has radius $4.281662K/c_f^2$ |

The complete transmitter response supplies the cancellation of the canonical circle's linear tangential push and the backward cubic residual. The receiver term supplies additional turning. The ring examples show that turning can affect circular balance even though it cannot remove a tangential residual. They are floating-point candidates evaluated on prescribed histories, with no certified zero enclosure, perturbation spectrum or coupled evolution. The 24-member example also retains the missing self-response/account question; it is not full classical electrodynamics.

The [instrument](../evidence/maxwell-transmitter-receiver-controls.mjs) passed stationary and affine exact controls before evaluating the targets. Its [receipt](../evidence/maxwell-transmitter-receiver-controls.json) records potential-derivative discrepancies below $4\times10^{-12}$ on the finite-pair and nonsymmetric controls and below $5\times10^{-11}$ at the two ring zeros. This is measured algebra verification, not a rigorous bound on dynamics or an independent mathematical adjudication. All examples lie in a uniformly subfield domain. Equality, superfield branches and any ceiling-enforcing response remain undefined by these comparisons.

## 9. Weber-inspired relative-motion response

A relative-motion alternative can remain radial while changing the strength of the interaction according to how the separation changes. The historical Weber interaction motivates this structure, but it is instantaneous; inserting causal delays into it would create a different equation. The following boxed family is a proposed acceleration-first comparison, not the historical force law copied into architrino ontology.

For present separation $r=\|\mathbf X_i(T)-\mathbf X_j(T)\|>0$ and direction $\mathbf e=(\mathbf X_i-\mathbf X_j)/r$, define a symmetric pair contribution

$$
\boxed{
\begin{aligned}
\mathbf A_{i\leftarrow j}^{\mathrm W}
&=\frac{\sigma_{ij}K_{ij}}{r^2}
\left[1+\lambda_{\mathrm W}\frac{\dot r^2}{c_f^2}
+\mu_{\mathrm W}\frac{r\ddot r}{c_f^2}\right]\mathbf e\\
\mathbf A_{j\leftarrow i}^{\mathrm W}&=-\mathbf A_{i\leftarrow j}^{\mathrm W}
\end{aligned}
}
$$

The dimensionless constants $\lambda_{\mathrm W}$ and $\mu_{\mathrm W}$ are unresolved constitutive choices. The dot denotes the absolute-time derivative of the present separation. The full acceleration sums the contributions over distinct partners. The simultaneous self pair $r=0$ is outside this definition. This changes causal support to present-time coupling; a delayed variant must separately define which separation and which derivatives it uses. The relative-motion structure can be located in [Assis's Weber discussion, Section 2](https://www.ifi.unicamp.br/~assis/gravitation-4th-order-p314-331%281995%29.pdf); its other physical claims are not premises here.

The equation is implicit because $\ddot r$ contains the unknown accelerations. For an isolated equal-coupling pair write $\mathbf w=\mathbf V_i-\mathbf V_j$ and $\mathbf w_\perp=\mathbf w-(\mathbf e\cdot\mathbf w)\mathbf e$. If $\mathbf A_i=f\mathbf e$ and $\mathbf A_j=-f\mathbf e$, direct differentiation gives $\ddot r=\|\mathbf w_\perp\|^2/r+2f$. Substitution yields

$$
\left(1-\frac{2\sigma_{ij}K_{ij}\mu_{\mathrm W}}{c_f^2r}\right)f
=\frac{\sigma_{ij}K_{ij}}{r^2}
\left[1+\lambda_{\mathrm W}\frac{\dot r^2}{c_f^2}
+\mu_{\mathrm W}\frac{\|\mathbf w_\perp\|^2}{c_f^2}\right]
$$

This algebraic identity is derived here; it has not been independently adjudicated. It exposes a possible singular coefficient even without a causal-root fold. A many-member version requires an invertible coupled acceleration system, not just finite per-pair coefficients. Setting both constants to zero recovers the instantaneous inverse-square comparison, not the delayed canonical ME. Those two controls precede any target trajectory.

All three path-speed regimes are proposed comparisons, subject to the implicit solve. Neither the velocity terms nor the acceleration terms automatically impose a ceiling. The choices needed are instantaneous versus delayed support, fixed coefficients, self treatment and any explicit boundary response. Loss of invertibility is a falsifier of regular evolution in its declared domain; it is not permission to switch branches silently.

## 10. Darwin-inspired low-speed interaction comparison

The ordinary Darwin interaction retains velocity coupling through second order in speed while neglecting radiation. It is a low-speed comparison, not a near-ceiling law. [Essén's paper](https://arxiv.org/abs/physics/0701324) distinguishes that approximation from a separately proposed higher-speed extension. Here only the interaction structure is borrowed; a quadratic mathematical kinetic functional supplies an explicit acceleration-first comparison without introducing architrino mass.

Let $r_{ij}=\|\mathbf X_i(T)-\mathbf X_j(T)\|$ and $\mathbf e_{ij}=(\mathbf X_i-\mathbf X_j)/r_{ij}$ refer to present positions, distinct from the delayed $R_{ij}$ of Section 1. For symmetric pair couplings define

$$
\boxed{
\begin{aligned}
\mathcal L_{\mathrm D}
&=\frac12\sum_i\|\mathbf V_i\|^2
-\sum_{i<j}\frac{\sigma_{ij}K_{ij}}{r_{ij}}\\
&\quad+\sum_{i<j}\frac{\sigma_{ij}K_{ij}}{2c_f^2r_{ij}}
\left[\mathbf V_i\cdot\mathbf V_j
+(\mathbf V_i\cdot\mathbf e_{ij})(\mathbf V_j\cdot\mathbf e_{ij})\right]\\
\frac{d}{dT}\frac{\partial\mathcal L_{\mathrm D}}{\partial\mathbf V_i}
&=\frac{\partial\mathcal L_{\mathrm D}}{\partial\mathbf X_i}
\end{aligned}
}
$$

The functional has dimension $L^2T^{-2}$. Its quadratic velocity term is a selected mathematical normalization, not a physical mass or an assertion of conserved physical energy. The last line defines implicit acceleration equations. The historical relativistic kinetic correction is omitted in this particular adaptation, so this box is a Darwin-inspired interaction comparison, not the full historical Darwin dynamics.

Deleting the velocity-coupling term gives the instantaneous inverse-square equation. The two-body zero-velocity control has an important qualification: the velocity Hessian of the coupling can still modify the acceleration solve even when the velocities vanish. The coupling disappears only in the leading weak-interaction limit. Both $\|\mathbf V_i\|/c_f\ll1$ and small $K_{ij}/(c_f^2r_{ij})$ are therefore appropriate initial comparison conditions, with the acceleration matrix checked for invertibility. Extending the approximation beyond those conditions requires a new justification.

The proposal tests whether a symmetric velocity-coupled particle law produces behavior missing from the delayed canonical comparison. It changes arrival geometry as well as response, so its effects must not be attributed solely to a magnetic term. All three regime labels can contain its low-speed cases, but the approximation establishes nothing at equality or above $c_f$, and not throughout the strict subfield domain. The kinetic normalization, retained order, preparation class and implicit solve must be selected before execution. A singular acceleration matrix or corrections outside the declared approximation bounds defeat the proposed regular comparison.

## 11. Finite-width wake reception

This proposal changes the idealization of reception: a wake contributes over a declared range of causal gap rather than only at an exact root. It can test whether singular behavior comes from point sampling. Finite temporal or range width and a finite spatial core are separate modifications; a spatial core alone does not remove a vanishing root Jacobian.

For an illustrative normalized range-gap window of width $h>0$, define

$$
\delta_h(z)=\frac1h\left(1-\frac{|z|}{h}\right)_+,
\qquad
\int_{-\infty}^{\infty}\delta_h(z)\,dz=1
$$

A concrete two-scale candidate, with spatial core radius $\rho>0$, is

$$
\boxed{
\mathbf X_i''(T)=\sum_j\sigma_{ij}K_{ij}c_f
\int_{-\infty}^{T}
\frac{\mathbf r_{ij}(T,S)}{\big(R_{ij}(T,S)^2+\rho^2\big)^{3/2}}
\delta_h\big(R_{ij}(T,S)-c_f(T-S)\big)\,dS
}
$$

The triangular window is an explicit illustrative choice, not a fitted or authorized response. Its normalization follows by integrating the two linear halves. The width $h$ has length dimension, or reception-duration scale $h/c_f$; $\rho$ has length dimension. The displayed family keeps continuous emission labels and causal past support. It admits a finite range-gap band, including arrivals before or after the ideal exact crossing within that band, so it changes the precise propagation/reception specification rather than merely choosing an integration step.

For a stationary distinct source at range $r\ge h$, changing variable to the causal gap gives $c_f\int\delta_h\,dS=1$. Its acceleration is therefore exactly $\sigma K\mathbf r/(r^2+\rho^2)^{3/2}$. At finite $\rho$ this differs from the canonical stationary response. On separated simple-root charts, taking $h\downarrow0$ and then $\rho\downarrow0$ gives the canonical root weight when the required convergence is justified. That ordinary-root control does not establish the limit at a fold or on the self diagonal.

Using $\rho=0$ is a separate pure-width proposal only where the integral is defined; near-diagonal self reception must be examined rather than omitted implicitly. With finite $\rho$, convergence over the whole past and any infinite population remains an obligation. Fix $h$, $\rho$, the window and self treatment across all comparison histories. The three speed regimes are meaningful once input and any boundary response are defined. A claimed singular completion is falsified by a divergent or nonunique event integral; a finite-width trajectory is evidence for the finite-width law unless a limiting theorem transfers it.

## 12. History-based self response and emission recoil

The canonical self channel concerns older emissions that meet their own transmitter later. An additional emission response would be a different mechanism: it would act when emission occurs, even on strictly subfield histories with no positive-delay self root. Neither mechanism is supplied by importing the point-charge radiation-reaction equation, whose coefficients and inertial assumptions do not define architrino dynamics. [Feynman's classical self-interaction discussion](https://www.feynmanlectures.caltech.edu/II_28.html) provides comparison context, including the difficulties of point-source accounts.

One explicit diagnostic family adds finite-memory response to a selected baseline acceleration $\mathbf A_i^{\mathrm{base}}$:

$$
\boxed{
\begin{aligned}
\mathbf X_i''(T)&=\mathbf A_i^{\mathrm{base}}(T)+\mathbf H_i(T)\\
\mathbf H_i(T)&=-\lambda_i\int_0^\tau
w_\tau(\theta)\big[\mathbf V_i(T)-\mathbf V_i(T-\theta)\big]\,d\theta\\
w_\tau(\theta)&\ge0,\qquad \int_0^\tau w_\tau(\theta)\,d\theta=1
\end{aligned}
}
$$

The response compares present velocity with recent velocity over memory duration $\tau>0$. The coefficient $\lambda_i\ge0$ has dimension inverse time and $w_\tau$ has dimension inverse time. The baseline must be named, including whether its ordinary positive-delay self hits remain; $\mathbf H_i$ does not replace that channel automatically. The extra response is unchanged by a common constant velocity shift and vanishes identically on constant-velocity history. Those are exact algebraic controls. It is an illustrative constitutive hypothesis, not derived emission recoil, and it is not guaranteed to dissipate a physical account or enforce a speed ceiling.

This family makes a history-response experiment definable, but leaves its coefficient, memory kernel and physical interpretation unresolved. A genuine recoil model must instead specify what an emitted wake carries and an equal-and-opposite exchange in an independently defined account. Section 13 describes that larger formulation. No Abraham–Lorentz–Dirac coefficient, primitive mass, or new self rule has been selected here.

All three velocity regimes can be examined, with explicit boundary clauses. The response cannot repair undefined baseline input merely by being finite itself. A constant-velocity history with nonzero $\mathbf H_i$ would falsify the stated control; continued excursion growth or an undefined root event would falsify a claim that this particular addition solves those problems. Any claimed account loss needs the actual account and exchange law, not the negative sign of the coefficient alone.

## 13. Explicit transported wake state and reciprocal exchange

A wake-state formulation asks whether retaining the wake as an evolving state, with source and receiver updates, changes the dynamics or makes its account complete. Merely storing the same canonical history in another representation does not create a new law. The alternative appears when emission, reception or exchange changes.

Let $W_j(T,\mathbf x,\boldsymbol\omega)$ describe the declared wake quantity emitted by source $j$, resolved by propagation direction $\boldsymbol\omega\in S^2$. Let $Q_j(T,\boldsymbol\omega)$ be its source rate and $\mathcal U_j$ its receiver-exchange update. A formulation to be completed is

$$
\boxed{
\begin{aligned}
(\partial_T+c_f\boldsymbol\omega\cdot\nabla_{\mathbf x})W_j
&=Q_j(T,\boldsymbol\omega)\delta^{(3)}(\mathbf x-\mathbf X_j(T))
+\mathcal U_j\big(W,\mathbf X,\mathbf V\big)\\
\mathbf X_i''(T)&=\sum_j\int_{S^2}
\mathcal R_{ij}\big(W,\mathbf X_i(T),\mathbf V_i(T),\boldsymbol\omega\big)\,d\Omega
\end{aligned}
}
$$

The left side transports the declared quantity along rays at wake speed. The source term introduces emissions, and $\mathcal U_j$ permits an explicitly defined update when wakes interact with receivers. The map $\mathcal R_{ij}$ converts the retained wake state to acceleration. Its dependence may be local or nonlocal as declared. $W_j$, $Q_j$, $\mathcal U_j$ and $\mathcal R_{ij}$ have no selected physical quantity, dimensions or constitutive formula yet. The box is a coupled-system template, not an executable equation or evidence for physical energy conservation. Distributional source and reception maps also need their regularity domain.

One possible account target, once its quantities are independently defined, is

$$
\frac{d}{dT}\big(\mathcal C_{\mathrm{path}}+\mathcal C_{\mathrm{wake}}\big)=0
$$

Here the two $\mathcal C$ terms would denote the specified path and wake accounts. This is a target to test against the update, not a premise used to invent whatever exchange achieves a desired orbit. Open boundaries would add a declared flux. The [existing wake-state closure owner](../analysis/independent-causal-wake-state-closure.md) holds the complete-state and account obligations.

All three speed regimes are proposed. The decisions are what the wake carries, whether reception alters it, how emission updates the source, how self reception is defined, and what account measures the reciprocal exchange. First reproduce a stationary ordinary source under the intended maps before studying singular events. Failure of that control, nonunique state evolution, or an unmatched account change falsifies the corresponding claim. A candidate may also be valuable if it proves that additional transported state is unnecessary and reduces to the canonical law on its declared domain.

## 14. Time-symmetric direct interaction

Future-supported interaction is a deliberate departure from past-only wake reception. It asks whether a global consistency problem admits structures that a causal initial-value problem excludes. The [Wheeler–Feynman absorber paper](https://doi.org/10.1103/RevModPhys.17.157) motivates the historical comparison; the radial family below is not that theory and imports none of its massive-particle or absorber assumptions.

Keep the canonical past contribution $\mathbf A_i^{\mathrm{ME}}$. For future emission labels define

$$
\mathcal C_{ij}^{\mathrm{future}}(T)
=\{S>T:R_{ij}(T,S)=c_f(S-T)>0\}
$$

A simple radial comparison family is

$$
\boxed{
\begin{aligned}
\mathbf A_i^{\mathrm{future}}(T)
&=\sum_j\sum_{S\in\mathcal C_{ij}^{\mathrm{future}}(T)}
\sigma_{ij}K_{ij}\frac{c_f}{|c_f+\mathbf n_{ij}\cdot\mathbf V_j(S)|}
\frac{\mathbf n_{ij}}{R_{ij}^2}\\
\mathbf X_i''(T)&=(1-\alpha)\mathbf A_i^{\mathrm{ME}}(T)
+\alpha\mathbf A_i^{\mathrm{future}}(T),\qquad 0\le\alpha\le1
\end{aligned}
}
$$

The future-side weight is derived by differentiating $R-c_f(S-T)$ with respect to $S$: its derivative is $-\mathbf n\cdot\mathbf V_j(S)-c_f$. Taking the magnitude gives the displayed Jacobian. The endpoint $S=T$ is excluded on both sides. On stationary distinct-source histories the two contributions agree with the static inverse-square response. The choice $\alpha=0$ gives the canonical past-only law; $\alpha=1/2$ gives equal past and future weights. Those identities are algebraic controls, not existence or stability results.

With nonzero future weight, supplied past history does not determine the input: future paths enter the present equation. A problem must therefore specify future asymptotic data, endpoint histories, periodicity or another justified boundary formulation. Prescribing a periodic orbit and showing its residual vanishes establishes only that boundary solution; its stability and physical selection remain separate. The time-reversal invariance of the equal-weight equation is distinct from an account of an observed time arrow.

All three speed regimes can be posed as boundary-value comparisons, after complete root and self treatment are defined. Both future and past branches can become singular, so time symmetry alone is not a fold regularization. Required choices are $\alpha$, the underlying radial versus Maxwell-shaped response, future boundary data and singular-event treatment. Failure to admit a consistent boundary solution is a negative result for that specification; nonunique solutions contradict any claim that its boundary data select one physical history.

## 15. Other radial response powers

A radial-power family distinguishes the strength of the distance singularity from the direction and weighting of reception. It extends the existing inverse-square and inverse-distance comparison without changing their causal support. Use a fixed matching length $R_*>0$ and exponent $p>0$:

$$
\boxed{
\mathbf X_i''(T)=\sum_j\sum_{S\in\mathcal C_{ij}(T)}
\sigma_{ij}\frac{K_{ij}}{R_*^2}
\left(\frac{R_*}{R_{ij}}\right)^p
\frac{c_f}{|D_{t,ij}|}\mathbf n_{ij}
}
$$

At range $R_*$ every exponent gives the same acceleration magnitude $K_{ij}/R_*^2$ before transmitter weighting. At $p=2$ the matching length cancels and the canonical law is recovered. At $p=1$ the logarithmic-response kernel is recovered with $K_{\log,ij}=K_{ij}/R_*$. These are exact controls. The matching convention is a proposal, not a redefinition of the coupling used in existing logarithmic evidence. The equivalent dimensional coupling is $K_{p,ij}=K_{ij}R_*^{p-2}$, with dimension $L^{p+1}T^{-2}$.

An initial softer-response comparison could fix one exponent between one and two rather than sweep an arbitrary range and tune a desired structure. The exponent and matching length must remain fixed across encounters, circles and any population comparison. A change to large-range falloff also changes the infinite-population summability problem; a softer near-source singularity need not improve the large-range sum.

All three speed regimes are proposed, with the ceiling response declared separately. This family retains the transmitter Jacobian and emission-position line of action, so it does not automatically remove either a speed-boundary singularity or a tangential push. A claimed improvement must be tied to an actual event or retained coupled structure. Failure at $p=2$ to reproduce a known canonical control falsifies the implementation; a divergent event integral or population sum defeats a closure claim in that declared domain.

## Decisions before additional investigations

The formulas above separate three kinds of readiness. Sections 7, 8 and 14 supply concrete ordinary-root kernels but leave singular extensions or boundary data unresolved. Sections 9, 11, 12 and 15 supply parameterized hypotheses whose choices must be fixed. Section 10 supplies an explicitly adapted approximation. Section 13 is a constitutive template and needs physical definitions before execution. Their proposed research value is at guessed grade; the named algebraic controls are derived identities. Section 8.1 records the operator-selected prescribed-history comparison at measured grade; no coupled target simulation or independent mathematical adjudication has been performed for these additional equations.

| Decision | Choice required | Recommended starting point | What waits on it |
| --- | --- | --- | --- |
| ◐ Research scope | Prescribed-history comparison of Sections 7 and 8 completed; choose any coupled geometry and compatible preparation separately | Retain the uniform subfield margin; use the paired controls to choose a coupled pair study or a separately selected alternating-ring balance certification | New coupled evolution and ring stability investigation under those proposals |
| ○ Speed boundaries | Domain-only restriction versus selected inclusive projection; what to do with undefined equality input | First retain a uniform subfield margin, then examine equality and all-root extension separately | Inclusive-boundary and superfield execution |
| ○ Response and self channel | Keep admitted positive-delay self hits, add an emission response, or select a different clause | Keep the admitted-hit census for the first Maxwell-shaped comparison; it has no self roots in that domain | Transfer to a new history class or an added self mechanism |
| ○ Weber specification | Instantaneous or newly delayed support; fixed relative-motion coefficients | Assess the instantaneous family and its acceleration-matrix singularities before inventing a delayed adaptation | A Weber-inspired trajectory calculation |
| ○ Darwin adaptation | Quadratic comparison normalization versus fuller historical kinetic terms; approximation bounds | Use the stated low-speed, weak-interaction comparison and check its implicit matrix first | Attribution of a result to a particular Darwin formulation |
| ○ Reception resolution | Window shape, width, spatial core and self-diagonal treatment | Keep width and core separate; begin with the declared two-scale family as a labeled comparison if selected | Finite-width target calculations and any zero-width conclusion |
| ○ Self-response mechanism | Diagnostic memory feedback versus a genuine emission-exchange law; fixed coefficients | Use a frozen diagnostic kernel only to test sensitivity; develop recoil with the transported-state account | A physical recoil or conservation claim |
| ○ Wake state | What is carried; emission, reception and reciprocal-update maps; account dimensions | Define one transported quantity and one exchange rule before a general field model | Transported-state dynamics and accounts |
| ○ Future support | Mixing weight, response kernel and future boundary conditions | Defer execution until a bounded boundary-value problem is chosen | Time-symmetric trajectories and selection claims |
| ○ Radial-power comparison | Exponent and one matching length | One fixed intermediate exponent with stationary matching, rather than a fitted sweep | A reproducible additional exponent comparison |

The status marker ○ means unresolved; ◐ means the prescribed comparison is complete while the coupled scope remains unresolved. These are formulation choices for the proposed investigations, not requests to approve the completed manuscript edit. The [scenario-assumption procedure](../../../op/theory-orientation.md#scenario-assumptions) governs later selection and reuse. Results belong with their geometry owners, while this manuscript retains the shared equations and their scope. No standing authorization, quarantined study, priority score or task lifecycle is changed by this explanatory addition.
