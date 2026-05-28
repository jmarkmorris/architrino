# $A_0$ Medium-Response Tensor Probe

## Purpose

This packet defines the Tier 3 probe for the homogeneous medium-response tensor $\mathcal{M}_{\text{sea}}^{ab}$ after a stable $A_0$ branch has passed closure, stability, energy extraction, and shielding extraction.

The goal is to keep the mass map from becoming a shielding-only formula. Inertial and gravitational response require a response map from shielded internal energy into momentum, acceleration, and gradient response.

## Inputs

Required inputs:

- accepted $A_0$ branch packet;
- accepted energy and shielding packet;
- $E_{\text{internal}}(A_0)$;
- $\zeta(A_0)$;
- residual anisotropy $\mathcal{L}_{\text{aniso}}$;
- homogeneous Noether sea cell data with $u^i_{\text{sea}}=0$, $G_{\text{grad}}=0$, $n=1$, and $\chi_{\text{sea}}=1$.

## Response Target

The tensor target is

$$
p_{\text{int}}^a
\approx
\alpha_{\mathrm{m}}\,\zeta(A_0)E_{\text{internal}}(A_0)\,
\mathcal{M}_{\text{sea}}^{ab}V_{\text{cm},b},
\qquad
\mathcal{M}_{\text{sea}}^{ab}
\to
\frac{h^{ab}}{c_{\text{eff}}^2}
$$

in the homogeneous isotropic limit.

This target is a constitutive closure problem. It is not a new fit parameter and not a replacement for the branch certificate.

## Tensor Projection Contract

For a small perturbation around the homogeneous reference cell, define the dimensionless tensor residual

$$
\Delta_{\mathcal M}^{ab}
\equiv
c_{\text{eff},0}^2
\left(
\mathcal{M}_{\text{sea}}^{ab}
-
\frac{h^{ab}}{c_{\text{eff},0}^2}
\right),
$$

where $c_{\text{eff},0}=c_f$ in the required input cell. Split this residual into its trace and trace-free pieces:

$$
\delta\mathcal{M}_{0}
\equiv
\frac{1}{3}h_{ab}\Delta_{\mathcal M}^{ab},
\qquad
\delta\mathcal{M}_{\mathrm{tf}}^{ab}
\equiv
\left(
\delta^a{}_c\delta^b{}_d
-
\frac{1}{3}h^{ab}h_{cd}
\right)
\Delta_{\mathcal M}^{cd}.
$$

For any retained probe direction $\hat e$, the directional response channel is

$$
\delta\mathcal{M}_{2}(\hat e)
\equiv
\hat e_a\hat e_b\delta\mathcal{M}_{\mathrm{tf}}^{ab}.
$$

The tensor sampled by a directional channel is the trace-free quadrupole

$$
E_{\hat e}^{ab}
\equiv
\hat e^a\hat e^b-\frac{1}{3}h^{ab},
\qquad
\delta\mathcal{M}_{2}(\hat e)
=
E_{\hat e,ab}\delta\mathcal{M}_{\mathrm{tf}}^{ab}.
$$

These tensors define the probe-dual span

$$
\mathcal{W}_{A_0}
\equiv
\operatorname{span}
\{E_{\hat e}^{ab}\ \text{for retained acceleration, gradient, pressure, and strain probes}\}.
$$

The retained trace-free response directions themselves are the branch-emitted or reconstructed tensors $B_r^{ab}=\delta\mathcal{M}_{\mathrm{tf},r}^{ab}$ in the reversible response record. A directional probe records the pairing $\langle E_{\hat e},B_r\rangle_h$, not automatically the full $B_r^{ab}$. A full trace-free reconstruction requires the retained probe-dual span $\mathcal{W}_{A_0}$ to have rank five.

The acceleration and gradient probes must agree on these projected coefficients, not only on the scalar normalization:

$$
\left(
\delta\mathcal{M}_{0},\,
\delta\mathcal{M}_{2}(\hat e_1),\,
\delta\mathcal{M}_{2}(\hat e_2),\,
\delta\mathcal{M}_{2}(\hat e_3)
\right)_{\mathrm{accel}}
=
\left(
\delta\mathcal{M}_{0},\,
\delta\mathcal{M}_{2}(\hat e_1),\,
\delta\mathcal{M}_{2}(\hat e_2),\,
\delta\mathcal{M}_{2}(\hat e_3)
\right)_{\mathrm{grad}}
+\mathcal{R}_{\mathrm{AG}}.
$$

The certificate must bound $\mathcal{R}_{\mathrm{AG}}$ and must report whether any trace-free signal is sourced by branch strain, Noether sea delay anisotropy, or unresolved leakage. A null directional sector is admissible only when the trace-free projection is below the declared signal, birefringence, dispersion, and preferred-frame residual budgets.

## Exposed Inertial-Response Trace Invariant

The medium-response tensor is not consumed by the mass map by itself. The mass-facing object is the product of the exposed assembly pattern and the reversible symmetric medium response.

For an angular scalar far-field ledger, extract the trace-free exposure moment

$$
\mathcal{Z}_{\mathrm{tf}}^{ab}(A_0)
=
\frac{1}{4\pi\|\mathcal{L}_{\text{naive}}\|}
\int_{S^2}
\left(
3\hat R^a\hat R^b-h^{ab}
\right)
\mathcal{L}_{A_0}(\hat R)\,d\Omega,
\qquad
h_{ab}\mathcal{Z}_{\mathrm{tf}}^{ab}(A_0)=0,
$$

and define the total exposed-response tensor

$$
\mathcal{Z}_{A_0}^{ab}
=
\zeta(A_0)h^{ab}
+
\mathcal{Z}_{\mathrm{tf}}^{ab}(A_0).
$$

With the response split above, the first-order inertial-response tensor is

$$
\mathsf{I}_{A_0}^{ab}
=
\frac{\alpha_{\mathrm{m}}E_{\text{internal}}(A_0)}{2}
\left(
\mathcal{Z}_{A_0}^{a}{}_{c}\mathcal{M}_{+}^{cb}
+
\mathcal{Z}_{A_0}^{b}{}_{c}\mathcal{M}_{+}^{ca}
\right),
\qquad
\mathcal{M}_{+}^{ab}
\equiv
\frac{1}{2}
\left(
\mathcal{M}_{\text{sea}}^{ab}
+
\mathcal{M}_{\text{sea}}^{ba}
\right).
$$

The scalar mass readout is its rotational trace:

$$
m_{\mathrm{tr}}(A_0)
\equiv
\frac{1}{3}h_{ab}\mathsf{I}_{A_0}^{ab}
=
\alpha_{\mathrm{m}}
\frac{E_{\text{internal}}(A_0)}{c_{\text{eff},0}^{2}}
\left[
\zeta(A_0)(1+\delta\mathcal{M}_{0})
+
\frac{1}{3}
\mathcal{Z}_{\mathrm{tf},ab}(A_0)
\delta\mathcal{M}_{\mathrm{tf}}^{ab}
\right].
$$

This gives the probe a non-fitting invariant. In a homogeneous isotropic medium, $\delta\mathcal{M}_{0}=0$ and $\delta\mathcal{M}_{\mathrm{tf}}^{ab}=0$, so the roadmap scalar mass reduces to $\alpha_{\mathrm{m}}\zeta(A_0)E_{\text{internal}}(A_0)/c_{\text{eff},0}^{2}$. Pure exposure anisotropy changes direction-dependent inertia through $\mathsf{I}_{A_0}^{ab}$ but does not change the scalar trace unless a trace-free medium response is present. Conversely, pure trace-free medium response does not change scalar mass for scalar exposure. The scalar anisotropic correction is only the contraction $\mathcal{Z}_{\mathrm{tf},ab}\delta\mathcal{M}_{\mathrm{tf}}^{ab}/3$.

In quotient language, this contraction is a retained-response-direction statement. A representative label is a scalar mass handle only if it changes $M_0^{\mathrm{src}}$ or changes the projection of $E_{\text{internal}}\mathcal{Z}_{\mathrm{tf}}^{ab}$ onto the span of retained reversible trace-free response tensors $B_r^{ab}$. Trace-free differences orthogonal to those retained response directions remain unobserved by the scalar trace until a retained probe supplies a tensor that contracts with them.

Any antisymmetric response residue $\mathcal{M}_{-}^{ab}=(\mathcal{M}_{\text{sea}}^{ab}-\mathcal{M}_{\text{sea}}^{ba})/2$ drops out of the reversible quadratic kinetic scalar $V_{\text{cm},a}\mathsf{I}_{A_0}^{ab}V_{\text{cm},b}$. It therefore belongs to orientation, transport, or loss accounting rather than to scalar rest mass.

## Probe Families

### Acceleration Probe

Perturb the accepted rest branch by a small center velocity and acceleration:

$$
\mathbf{V}_{\text{cm}}
\mapsto
\mathbf{V}_{\text{cm}}+\delta\mathbf{V},
\qquad
\dot{\mathbf{V}}_{\text{cm}}
\mapsto
\dot{\mathbf{V}}_{\text{cm}}+\delta\mathbf{a}.
$$

Report the internal relocking work, phase residuals, root-ledger changes, and extracted momentum response.

### Gradient Probe

Perturb the homogeneous Noether sea cell by a small matched gradient:

$$
G_{\text{grad}}
\mapsto
G_{\text{grad}}+\delta G.
$$

Report whether the same shielded-energy lock controls the response to acceleration and to a weak gradient.

### Anisotropy Probe

Repeat both probes along at least three independent axes in the center-of-closure frame. Emit the symmetric tensor part, antisymmetric residue if present, and anisotropy residual relative to $h^{ab}/c_{\text{eff}}^2$.

## Acceptance Gates

Tier 3 passes only if:

1. the accepted branch remains in the same basin under small acceleration and gradient probes;
2. the response is linear over the declared perturbation range;
3. the homogeneous isotropic limit approaches $h^{ab}/c_{\text{eff}}^2$ within tolerance;
4. acceleration and gradient probes agree on the shielded-energy coefficient to first order;
5. anisotropy and leakage residuals are reported, not absorbed into $\alpha$.
6. trace and trace-free tensor projections are reported with the same direction labels used by the pressure-response replay.

## Failure Codes

| Failure code | Meaning |
| --- | --- |
| `basin-loss` | probe leaves the accepted branch basin |
| `nonlinear-response` | response is not linear over the declared small-probe range |
| `tensor-anisotropy` | homogeneous limit does not approach $h^{ab}/c_{\text{eff}}^2$ |
| `accel-gradient-mismatch` | acceleration and gradient probes do not share the shielded-energy coefficient |
| `projection-incomplete` | trace or trace-free projections are missing or use inconsistent direction labels |
| `null-sector-leakage` | a directional tensor residual exceeds signal, birefringence, dispersion, or preferred-frame bounds |
| `response-fit-contaminated` | $\alpha$ or tensor entries absorb unresolved leakage or particle benchmark data |

## Promotion Rule

Only after this packet passes can the mass map claim a medium-dressed response tensor for $A_0$. Until then, the scalar formula remains a roadmap expression and the equivalence-principle route remains open.
