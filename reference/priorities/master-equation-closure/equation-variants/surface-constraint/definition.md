# Master Equation with a surface constraint

## Selected definition and scope

The operator selected fixed smooth closed-surface confinement and requested a named Master Equation variant on 2026-10-10. The family is **Master Equation with a surface constraint**; its initial specification is **Canonical Master Equation with a surface constraint**. The definition owner is `surface-constraint`. This naming follows the existing “Canonical Master Equation with a ceiling” construction: the additional clause is visible in the equation name, while the underlying interaction law remains explicit. The [Surface manuscript](../../../app-surface/manuscript.md) owns the app requirements and complete geometric exposition; [EOM](../../../app-solver/priorities.md) owns numerical implementation.

The selected preparation is three electrinos and three positrinos with continuous retained histories on a fixed sphere, oblate spheroid or ring torus. The surface is a compact smooth two-dimensional manifold without boundary embedded in Euclidean space; the displayed equation requires a regular $C^2$ defining function. The initial equation retains canonical causal propagation, admitted positive-delay self and partner roots, superposition and event obligations. Default path speed is unrestricted and numerical wake speed is $c_f=1$. Surface confinement is an imposed experimental rule, not a derived physical confinement mechanism.

## Ordinary-chart equation

Let $\mathbf A_i$ be the complete interaction acceleration at receiving architrino $i$ under its bound equation definition. For the fixed surface $\phi(\mathbf X)=0$, set $\mathbf g_i=\nabla\phi(\mathbf X_i)\ne0$, $H_i=\nabla^2\phi(\mathbf X_i)$ and $P_i=I-\mathbf g_i\mathbf g_i^{\mathsf T}/\|\mathbf g_i\|^2$. The constrained equation is

$$
\ddot{\mathbf X}_i=P_i\mathbf A_i-\frac{\mathbf V_i^{\mathsf T}H_i\mathbf V_i}{\|\mathbf g_i\|^2}\mathbf g_i.
$$

The first term retains the two tangent interaction components. The second is the normal curvature acceleration needed to keep a moving path on the surface. It follows by differentiating $\phi(\mathbf X_i)=0$ twice, giving $\mathbf g_i\cdot\mathbf V_i=0$ and $\mathbf g_i\cdot\ddot{\mathbf X}_i+\mathbf V_i^{\mathsf T}H_i\mathbf V_i=0$. Normal-only support then fixes the displayed acceleration. The [full derivation](../../../app-surface/manuscript.md#the-normal-only-constrained-equation) includes the spherical reduction and analytical reference.

Track the discarded normal interaction vector $(I-P_i)\mathbf A_i$ only after complete superposition and any selected receiver response, separately for each receiver. It is not the curvature acceleration or the total support. Do not log per-hit or per-source discarded-normal decompositions. Evaluate interactions on the actual constrained histories using ambient Euclidean wake distance, not surface arc length. Root/history provenance otherwise required by the underlying equation remains mandatory.

**Claim grade: derived, independently checked in the [Codex mathematical review](../../../app-solver/analysis/equation-provider-design-review-2026-10-10.md).** The normal-only rule is uniquely fixed on a regular differentiable acceleration chart by the two differentiated constraints. A failed differentiated identity, nonzero tangent support or zero normal gradient falsifies its applicability. No continuation through singular impulses, contact or undefined acceleration is supplied by this ordinary-chart formula. No numerical six-member solution, stability result or physical energy law is established here.

## Existing speed taxonomy and combinations

Use the existing [three speed options](../manuscript.md#three-speed-options): unrestricted, inclusive ceiling $\|\mathbf V_i\|\le c_f$, and strict ceiling $\|\mathbf V_i\|<c_f$. These are selected speed domains, distinct from observed subfield, field-speed and superfield motion. A chosen surface does not itself enforce a speed ceiling or constant speed.

The [examined inclusive response](../manuscript.md#the-examined-inclusive-response) removes the net speed-increasing component after summation on a finite ordinary equality input and separately specifies zero self response. Reusing that model requires explicitly selecting those clauses, their ordering relative to surface support and a compatible history/event domain. Surface confinement alone retains the canonical self policy and selects neither that response nor its zero-self clause. The strict domain excludes equality but supplies no continuing acceleration there; halt where its declared domain or equation ceases to apply unless a further rule is explicitly selected.

Composition with another interaction law remains a separately identified complete specification, for example a logarithmic response with a surface constraint. The family name does not transfer a law's authorization to new geometries or history classes. The design/review obligation SURFACE-001 is complete; target calculations and independently accepted solver support remain open in the [Surface queue](../../../app-surface/work-queue.md) and [staged EOM design](../../../app-solver/contracts/equation-provider-design-v1.md#11-delivery-sequence-and-acceptance).
