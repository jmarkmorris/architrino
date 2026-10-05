# Maxwell-derived response rows: decomposition, controls and selection assessment

**Status: unselected proposal assessment.** On 2026-10-03 the operator asked whether a further research variation of the Master Equation could be built from Maxwell's equations, and what that would mean. This document answers the second question exactly and assesses the first. It selects nothing. The [canonical Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) remains the baseline, the [authorized variations](../equation-variants/README.md) are unchanged, and the decision belongs to the [response-law decision row](../work-queue.md#decide-whether-to-investigate-additional-response-law-proposals).

The principal finding is that the proposal is not a single modification. For point transmitters with causal delay it separates into three independent changes to the per-hit acceleration, and the first of them is the [amplitude-gradient row](amplitude-gradient-regular-pair-investigation.md#1-selected-equation-and-dimensions) already selected for bounded investigation. The "magnetic field" is the third change, and it can be written without any field or cross product, as a dependence of the receiver's acceleration on the receiver's own velocity.

All numerical statements use $c_f=1$. Standard electromagnetic results appear here only as clearly marked comparison structures and as the observer-level recovery target that the corpus already names; none is used as a premise about architrinos.

## 1. What Maxwell's equations do and do not supply

Maxwell's equations relate an electric field and a magnetic field to charge density and current density. They are field equations for a continuum description. By themselves they do not say how a body moves: a separate coupling law (the Lorentz law) and a separate inertial law are needed. A proposal to "use Maxwell's equations" at the architrino level therefore has to make three distinct choices.

1. **Which solution of the field equations.** For point transmitters, keeping only the causally delayed solution and discarding free fields that have no transmitter, the field equations reduce to a statement about each transmitter's expanding wake. Nothing else in the field equations is left to use. Admitting free fields would instead make the field an independent substance with its own degrees of freedom, which contradicts the $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology in which wakes exist only as emitted by architrinos; that option is not considered further.
2. **Which receiver law.** The coupling law adds a term depending on the receiver's velocity. This is where a magnetic field enters.
3. **Which inertial law.** The standard coupling law gives a rate of change of momentum for a body with mass. Architrinos have no mass and the Master Equation gives acceleration directly, so this ingredient has no counterpart to import. It is discussed in [Section 6](#6-obstacles-specific-to-this-proposal).

## 2. The three response rows

Use the notation of the amplitude-gradient treatment. A receiver at position $\mathbf x$ and absolute time $T$ admits a causal root at emission time $S<T$ from transmitter $j$ when

$$
R=\|\mathbf x-\mathbf X_j(S)\|=T-S>0,
\qquad
\mathbf n=\frac{\mathbf x-\mathbf X_j(S)}{R},
\qquad
D=1-\mathbf n\cdot\mathbf v,
$$

where $\mathbf v=\mathbf X_j'(S)$ and $\mathbf a=\mathbf X_j''(S)$ are the transmitter's velocity and acceleration at emission, $K=\kappa|q_iq_j|$, and $\sigma=\operatorname{sign}(q_iq_j)$. On a regular branch with $D>0$ define the root-dependent scalar

$$
\Psi=\frac{1}{RD}.
$$

The canonical per-hit acceleration is $\sigma K\,\mathbf n/(R^2D)$: the transmitter-side weight $1/D$ multiplying an inverse-square density along the line of action from the emission position.

Below, a *row* means one such formula: the acceleration that a single arriving hit contributes to the receiver. The total acceleration is always the sum of the chosen row over all admitted hits, so changing the row changes the law while leaving the causal-root bookkeeping alone. The *complete transmitter row* is the row obtained by adding Rows G and V; it is everything the comparison theory says a transmitter's wake does to a receiver at rest. Adding Row M extends it to a moving receiver.

**Row G, the scalar wake gradient (already selected, bounded).** The amplitude-gradient row is the fixed-time receiver-position gradient of $\Psi$, following the implicit root:

$$
\mathbf G=-\nabla_{\mathbf x}\Psi
=\frac{1}{R^2D^3}\Big[(1-\|\mathbf v\|^2)\,\mathbf n-D\,\mathbf v+R\,\mathbf n\,(\mathbf n\cdot\mathbf a)\Big].
$$

This is the [independently adjudicated](amplitude-gradient-independent-adjudication.md) result, restated. In the comparison theory, $\Psi$ has the same form as the scalar potential of a moving point charge, so Row G corresponds to one of the two parts of that theory's electric field. The project derived Row G without that identification, and the identification is not needed for anything below.

**Row V, the velocity-carrying wake (new here).** Suppose the wake carries, in addition to the scalar $\Psi$, the vector $\Psi\mathbf v$: the same amplitude multiplied by the transmitter's velocity at emission. Row V is minus its rate of change in absolute time at a fixed receiver position, again following the root. The required derivatives follow from the causal equation: $\partial_TS=1/D$, $\partial_TR=-(\mathbf n\cdot\mathbf v)/D$, and $\partial_T\mathbf n=-P\mathbf v/(RD)$ with $P=I-\mathbf n\mathbf n^{\mathsf T}$. Then $\partial_TD=\|P\mathbf v\|^2/(RD)-(\mathbf n\cdot\mathbf a)/D$, and using $\mathbf n\cdot\mathbf v=1-D$,

$$
\partial_T(RD)=\frac{D-(1-\|\mathbf v\|^2)-R\,(\mathbf n\cdot\mathbf a)}{D}.
$$

Consequently

$$
\mathbf W=-\partial_T(\Psi\mathbf v)
=\frac{1}{R^2D^3}\Big[D\,\mathbf v-(1-\|\mathbf v\|^2)\,\mathbf v-R\,\mathbf v\,(\mathbf n\cdot\mathbf a)-RD\,\mathbf a\Big].
$$

**The complete transmitter row.** Adding the two,

$$
\boxed{
\mathbf E=\mathbf G+\mathbf W
=\frac{1}{R^2D^3}\Big[(1-\|\mathbf v\|^2)(\mathbf n-\mathbf v)
+R\big((\mathbf n-\mathbf v)(\mathbf n\cdot\mathbf a)-D\,\mathbf a\big)\Big].
}
$$

The $-D\mathbf v$ term of Row G cancels exactly against the $+D\mathbf v$ term of Row V. The result agrees with the textbook field of a moving point charge ([Feynman, *Lectures* II-21](https://www.feynmanlectures.caltech.edu/II_21.html)), which serves here as an independent closed-form reference for the algebra and not as a premise. Restoring dimensions replaces $\mathbf v$ by $\mathbf v/c_f$ and $\mathbf a$ by $\mathbf a/c_f^2$ in the bracket.

**Row M, the receiver-velocity response (the "magnetic" part).** Let $\mathbf u=\mathbf X_i'(T)$ be the receiver's velocity at reception. In the comparison theory the magnetic field of a point transmitter is $\mathbf n\times\mathbf E$, so the velocity-dependent term $\mathbf u\times(\mathbf n\times\mathbf E)$ expands by the triple-product identity into

$$
\mathbf M=\mathbf n\,(\mathbf u\cdot\mathbf E)-(\mathbf u\cdot\mathbf n)\,\mathbf E .
$$

No separate magnetic vector and no right-hand rule is required. The full receiver acceleration contribution under the complete proposal is

$$
\mathbf A_{i\leftarrow j}=\sigma K\Big[(1-\mathbf u\cdot\mathbf n)\,\mathbf E+\mathbf n\,(\mathbf u\cdot\mathbf E)\Big],
$$

and $1-\mathbf u\cdot\mathbf n$ is the receiver-side factor $D_{r,ij}/c_f$ that the canonical equation already defines for signed root playback. Two exact properties follow by inspection. Row M vanishes for a receiver at rest. Row M is perpendicular to $\mathbf u$, since $\mathbf u\cdot\mathbf M=0$ identically, so it can turn the receiver but never changes its speed.

## 3. What each row changes relative to the canonical equation

| Property of one hit | Canonical | Row G only | Complete transmitter row $\mathbf E$ | $\mathbf E$ with Row M |
| --- | --- | --- | --- | --- |
| Line of action for a non-accelerating transmitter | $\mathbf n$, from the emission position | Present-position direction plus a component along $\mathbf v$ | $\mathbf n-\mathbf v$, exactly from the transmitter's linearly extrapolated present position | Same, plus a component along $\mathbf n$ |
| Transmitter-side weight | $1/D$ | $1/D^3$ | $(1-\|\mathbf v\|^2)/D^3$ | Same |
| Term linear in transmitter velocity (affine transmitter) | Present | Absent | Absent | Absent |
| Reads transmitter acceleration | No | Yes; contribution along $\mathbf n$, falling as $1/R$ | Yes; contribution perpendicular to $\mathbf n$, falling as $1/R$ | Same |
| Reads receiver velocity | No | No | No | Yes |

Three structural observations follow from the table and the boxed row. They are **derived** on a regular $D>0$ branch.

First, the largest difference between the canonical equation and the comparison theory is not magnetic. It is the line of action. The canonical hit points away from where the transmitter was; the complete transmitter row points away from where a uniformly moving transmitter now is. That removes every correction of first order in speed. The receiver-velocity row is a second-order effect.

Second, the delayed-acceleration coupling changes direction. In Row G the $1/R$ term is $R\,\mathbf n(\mathbf n\cdot\mathbf a)$, directed along the line of action. In the complete row it is $(\mathbf n-\mathbf v)(\mathbf n\cdot\mathbf a)-D\mathbf a$, whose component along $\mathbf n$ is $D(\mathbf n\cdot\mathbf a)-D(\mathbf n\cdot\mathbf a)=0$. Row V therefore cancels the longitudinal delayed-acceleration coupling of Row G and replaces it by a purely transverse one.

Third, the canonical statement that receiver velocity is absent from the instantaneous multiplier survives Rows G and V and is given up only by Row M.

## 4. Controls on existing reference histories

These are residual evaluations on prescribed histories, in the same sense as the amplitude-gradient circle control. A prescribed circle or translating pair is not asserted to solve any of the equations, and no stability statement is made.

### Common translation

Two members translate with the same constant velocity $\mathbf b=\beta\hat{\mathbf e}$ and fixed separation $d$; the receiver is co-moving, $\mathbf u=\mathbf b$. Entries are the acceleration contribution in units of $\sigma K/d^2$. The canonical column restates [Proposition 5](../../../../content/markdown/aaa/dynamics/master-equation.md#moving-transceiver-geometry-and-received-branch-strength) of the Master Equation chapter; with $\gamma_f=(1-\beta^2)^{-1/2}$ as defined there.

| Orientation of separation | Canonical | Row G | $\mathbf E$ | $\mathbf E$ with Row M | Observer-level comparison target stated in the corpus |
| --- | --- | --- | --- | --- | --- |
| Perpendicular, transverse component | $1/\gamma_f$ | $\gamma_f$ | $\gamma_f$ | $1/\gamma_f$ | $1/\gamma_f$ |
| Perpendicular, longitudinal component | $\beta$ | $0$ | $0$ | $0$ | $0$ |
| Parallel, trailing receiver | $1+\beta$ | $1$ | $1-\beta^2$ | $1-\beta^2$ | $1-\beta^2$ |
| Parallel, leading receiver | $1-\beta$ | $1$ | $1-\beta^2$ | $1-\beta^2$ | $1-\beta^2$ |
| Sum over the ordered pair | $2\beta\hat{\mathbf e}$ (perpendicular) | $0$ | $0$ | $0$ | $0$ |

The canonical equation already reproduces the transverse target exactly, by a different mechanism, and fails in the longitudinal and parallel entries. Row G removes the first-order longitudinal residual and the nonzero pair sum but moves the transverse entry from $1/\gamma_f$ to $\gamma_f$. Only the complete row with Row M meets every entry.

### Mirror circle

Two opposite-polarity members move on one circle of radius $R_0$ at diametrically opposite points with speed $\beta<1$, as in [Section 7 of the amplitude-gradient treatment](amplitude-gradient-regular-pair-investigation.md#7-exact-accelerated-circle-the-push-is-cubic-not-absent), with the same root parameter $\xi=\beta\cos\xi$. The tangential acceleration contribution, positive in the receiver's direction of motion, is to leading order:

| Row | Leading tangential contribution | Direction |
| --- | --- | --- |
| Canonical | $+K\beta/(4R_0^2)$ | Forward |
| Row G (amplitude gradient) | $+K\beta^3/(3R_0^2)$ | Forward |
| Complete transmitter row $\mathbf E$ | $-2K\beta^3/(3R_0^2)$ | Backward |
| $\mathbf E$ with Row M | $-2K\beta^3/(3R_0^2)$ | Backward |

The exact tangential component of the complete transmitter row is

$$
A_\theta=-\frac{K\Big[(1-\beta^2+2\beta^2\cos^2\xi)(\beta\cos2\xi-\sin\xi)+2\beta^2(1+\beta\sin\xi)\cos\xi\,\sin2\xi\Big]}{4R_0^2\cos^2\xi\,(1+\beta\sin\xi)^3}.
$$

With $\sin\xi-\beta\cos2\xi=\tfrac43\beta^3+O(\beta^5)$ and $2\beta^2\cos\xi\sin2\xi=4\beta^3+O(\beta^5)$, the bracket is $\tfrac83\beta^3+O(\beta^5)$, giving the tabulated coefficient. Row M adds nothing tangential because it is perpendicular to the receiver's velocity. The leading coefficient is **derived** by Taylor expansion and **measured** by direct evaluation ([validation record](#development-and-validation-record)); no rigorous remainder bound has been proved, unlike the amplitude-gradient coefficient.

Under every one of the four rows the tangential residual is nonzero, so none admits an exact uniform subfield mirror circle. What changes is the sign: the canonical and amplitude-gradient rows push the receiver forward, and the complete row pushes it backward. In the comparison theory this backward term is the familiar loss associated with radiation from a rotating pair. What the sign reversal implies for the long-time evolution of a coupled pair is **not derived here**; it needs its own controlled secular calculation and belongs to [binary research](../binary-research/priorities.md).

## 5. What agreement with the comparison target would and would not show

The complete row meets every entry of the common-translation target because it is the comparison theory's own row. That agreement is by construction. Under the [evidence-independence rule](../../../../AGENTS.md), it is evidence that the algebra was transcribed correctly and nothing more. It cannot count as recovery of electromagnetic behavior from $\mathbb{A}\mathbb{A}\mathbb{A}$ primitives, because the behavior was inserted.

This is the central scientific cost. The corpus position is that [an architrino never receives an electric or magnetic field](../../../../content/markdown/aaa/foundations/architrino.md#wake-response-and-effective-electromagnetic-fields) and that magnetic behavior must be recovered from organized delayed geometry; the Master Equation chapter states that failure of the electromagnetic residual is a magnetic-emergence failure and not a reason to insert a velocity-dependent term. A scenario using Row M would stop testing that claim and start assuming its conclusion. It could still be informative as a control, answering what the target law itself does on the project's geometries, provided it is labeled as such.

## 6. Obstacles specific to this proposal

**Delayed acceleration (derived).** Rows G and V both sample the transmitter's acceleration at the earlier emission time. The amplitude-gradient treatment already had to prove a new local evolution theorem for this reason. The same method of steps should extend to the complete row on the same separated, uniformly subfield domain, since the receiver-velocity dependence of Row M is linear and bounded there; this extension is **inferred**, not proved.

**Transmitter folds become non-integrable (inferred).** The canonical [finite-impulse result](../../../../content/markdown/aaa/dynamics/master-equation.md#caustic-transit-and-finite-impulse) relies on the weight $1/|D|$ scaling as $|T-T_\ast|^{-1/2}$ near an ordinary fold, which is integrable in reception time. Rows G, V and $\mathbf E$ carry $1/D^3$, which scales as $|T-T_\ast|^{-3/2}$ on each branch and is not integrable. The comparison theory never meets this because its charged bodies cannot reach the propagation speed; $\mathbb{A}\mathbb{A}\mathbb{A}$ histories that cross the field speed do. Unless the two branches born at a fold cancel to an integrable remainder, which has not been examined, these rows are defined only on strictly subfield histories. In practice they would have to be paired with the [strict field-speed ceiling](../equation-variants/field-speed-ceiling/definition.md) domain, and they offer nothing for self-hit or super-field-speed questions. The factor $1-\|\mathbf v\|^2$ also changes sign above the field speed, so even the direction of a hit from a faster transmitter would need a fresh definition.

**No inertial law is supplied (derived).** The comparison theory obtains its relativistic behavior only when the coupling law acts on a momentum that grows with speed. The Master Equation is acceleration-first with no mass, so adopting the complete row does not deliver Lorentz behavior: the co-moving transverse entry above is $1/\gamma_f$, whereas the comparison theory's transverse *acceleration* carries a further factor from the inertial law. Supplying that factor is a receiver braking response, which is a separate proposal currently deferred in the response-law decision row.

**Collective sums (inferred).** The delayed-acceleration term falls as $1/R$ instead of $1/R^2$. Population sums over a Noether sea, whose convergence under the canonical $1/R^2$ rows is already a controlled question, would need a new summability analysis.

**No self row on the subfield domain (inferred).** In the comparison theory, energy balance for a radiating body uses a self term arising from the body's own field. On uniformly subfield histories the Master Equation admits no positive-delay self root, so the complete row has no counterpart. A Maxwell-row scenario would therefore not be standard electrodynamics either, and its account closure would be an open problem of its own.

## 7. Options and assessment

| Option | What it is | Needs a new selection | Assessment |
| --- | --- | --- | --- |
| A. Comparison ledger | Keep every authorized equation as is. Use the complete row with Row M purely as the labeled observer-level target, and report on each reference history the decomposition canonical → G → $\mathbf E$ → $\mathbf E$+M as above. | No. Standard physics in its recovery-target role is already permitted. | **Recommended.** It states exactly which term the assembly and Noether-sea response must supply for magnetic recovery, at no cost to the theory's claims. Selected by the operator on 2026-10-04; see the [yardstick ledger](maxwell-yardstick-ledger-2026-10-04.md). |
| B. Velocity-carrying wake, bounded | Extend the selected amplitude-gradient investigation by Row V on the same regular finite-pair domain. The receiver law stays velocity-independent. | Yes. | Reasonable if the long-time amplitude-gradient comparison proves worthwhile. It is the smallest step, has a native reading (the wake carries the transmitter's velocity), and reverses the circle residual's sign. |
| C. Complete row as a control | Add Row M as well, on the same domain, labeled as a control that inserts the target behavior. | Yes, with an explicit scenario exception to the rule against receiver-velocity terms. | Informative only as a calibration of what the target law does on these geometries. Not a candidate law. |
| D. Third standing variation | Authorize a "Maxwell variation" alongside the ceiling and logarithmic variations for all geometries. | Yes. | **Not recommended.** It is three modifications under one name, is undefined at folds and above the field speed, forfeits the emergence claim wherever used, and its agreement with electromagnetic targets would not be evidence. |

A native question sits behind option B and is recorded as **guessed**: whether an $\mathbb{A}\mathbb{A}\mathbb{A}$ primitive, such as a wake that transports its transmitter's velocity along with its amplitude, would produce Row V without reference to the comparison theory. If such a derivation existed, Row V would become a consequence to test and not an import.

## 8. Falsifiers

- An independent fixed-position time differentiation of $\Psi\mathbf v$ on an accelerated transmitter that disagrees with the displayed Row V overturns the decomposition.
- A nonzero component of the complete row's acceleration term along $\mathbf n$ overturns the transverse-coupling statement.
- Any history with $\mathbf u\cdot\mathbf M\neq0$ overturns the statement that Row M cannot change receiver speed.
- An exact evaluation of the complete row on the mirror circle with tangential contribution $\geq0$ at small $\beta$, or a leading coefficient different from $-2/3$, overturns the circle result.
- A demonstration that the two branches at an ordinary fold sum to a reception-time-integrable contribution under the $1/D^3$ rows overturns the fold obstruction as stated.

## Development and validation record

The Row V derivative, the boxed sum and the circle expansion were derived by hand in the session that wrote this document and have not been separately adjudicated; they are at self-reviewed derived grade.

A finite-difference instrument, `.tmp/maxwell-variation/check.mjs` run with Node, root-solves the causal equation, forms $\Psi$ and $\Psi\mathbf v$, and differentiates them numerically with fourth-order central differences. It is authored separately from the closed forms it checks. Its known cases were run first: the stationary inverse-square row, the adjudicated affine-source identity (difference $5\times10^{-13}$) and the adjudicated quadratic accelerated control (agreement to nine decimals). The first run of the quadratic control failed because the unbounded quadratic history is not subfield over the default root bracket; restricting the bracket to the subfield portion fixed the control without changing the instrument's differentiation. On the targets, the numerical gradient plus time derivative agreed with the boxed complete row to $1.4\times10^{-12}$ on a generic accelerated history, and the mirror-circle ratios at $\beta=0.02$ were $0.24993$ for the canonical row over $\beta$, $0.33288$ for Row G over $\beta^3$, and $-0.66592$ for the complete row over $\beta^3$, with and without Row M. The common-translation table was evaluated at $\beta=0.6$ and matches the closed-form entries. These are measured checks of the algebra on prescribed histories; they establish no coupled evolution, secular fate or physical account.
