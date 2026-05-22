# Stern-Gerlach Record-Cycle Toy Model

Status. Priority toy model for `measurement_response`, downstream of [sg-apparatus-substrate-response-packet.md](sg-apparatus-substrate-response-packet.md) and [ideal-analyzer-and-sg-residual-instance.md](ideal-analyzer-and-sg-residual-instance.md). This file isolates the record-cycle measure row in a reduced Stern-Gerlach-like chart. It is priority material only and does not prove apparatus coupling, effective spinor-coordinate derivation, pair provenance, or Bell recovery.

Claim level. Reduced toy model / defer with blocker. The model shows how the record-cycle partition row can reproduce a half-angle basin measure once $p_{+}$ is supplied. It does not derive $p_{+}$ from a Noether swarm ledger or a concrete apparatus impulse.

Promotion decision. Priority-only until a substrate apparatus model and effective spinor coordinate exist. The toy model is useful as a consistency target for the record-cycle row, but it is not reader-facing measurement ontology.

## Toy Record Space

Fix an apparatus setting $\hat{\mathbf m}$ and a reduced record phase

$$
\theta_{\mathrm{rec}}\in[0,2\pi).
$$

The toy record space is

$$
\Theta_{\hat{\mathbf m}}^{\mathrm{rec,toy}}=S^1,
$$

with invariant measure

$$
d\nu_{\mathrm{toy}}
=
\frac{d\theta_{\mathrm{rec}}}{2\pi}.
$$

The record-cycle return map is the rigid rotation

$$
T_{\hat{\mathbf m}}^{\mathrm{rec,toy}}
\left(
\theta_{\mathrm{rec}}
\right)
=
\theta_{\mathrm{rec}}
+
\Omega_{\mathrm{rec}}T_{\mathrm{rec}}
\pmod{2\pi}.
$$

The map preserves $d\nu_{\mathrm{toy}}$:

$$
\left(T_{\hat{\mathbf m}}^{\mathrm{rec,toy}}\right)_*
\nu_{\mathrm{toy}}
=
\nu_{\mathrm{toy}}.
$$

## Basin Partition

Let $\alpha$ be the angle between the effective incoming spinor coordinate and the apparatus setting in the reduced ideal chart. The toy model takes

$$
p_{+}=\cos^2\left(\frac{\alpha}{2}\right)
$$

as an input, not as a substrate derivation. Define the plus and reject basins by

$$
B_{+}^{\mathrm{toy}}
=
[0,2\pi p_{+}),
\qquad
B_{-}^{\mathrm{toy}}
=
[2\pi p_{+},2\pi).
$$

Then

$$
\nu_{\mathrm{toy}}
\left(
B_{+}^{\mathrm{toy}}
\right)
=
p_{+},
\qquad
\nu_{\mathrm{toy}}
\left(
B_{-}^{\mathrm{toy}}
\right)
=
1-p_{+}.
$$

The partition residual is

$$
\Delta_{\mathrm{part}}^{\mathrm{toy}}
=
\left|
\nu_{\mathrm{toy}}(B_{+}^{\mathrm{toy}})
+
\nu_{\mathrm{toy}}(B_{-}^{\mathrm{toy}})
-1
\right|
=0.
$$

The reduced half-angle residual is

$$
\Delta_{\mathrm{half}}^{\mathrm{toy}}
=
\left|
\nu_{\mathrm{toy}}(B_{+}^{\mathrm{toy}})
-
\cos^2\left(\frac{\alpha}{2}\right)
\right|
=0.
$$

## What The Toy Model Does Not Supply

The toy construction has no native rows for

$$
\dot{\mathbf J}_{C}^{\mathrm{app}}(t;\hat{\mathbf m}),
\qquad
\mathcal N_{\hat{\mathbf m}}^{\mathrm{SG}},
\qquad
\mathcal J_C^{\mathrm{in}},
\qquad
\mathcal A_{\hat{\mathbf m}}^{\mathrm{app}},
\qquad
\psi(Z).
$$

It therefore does not evaluate the apparatus branch-sum impulse, full separatrix normal, incoming core ledger, apparatus field/wake input, or effective spinor coordinate. It also has no event recoil/wake ledger and no pair-provenance input.

The model's useful residual vector is only

$$
\mathcal R_{\mathrm{rec}}^{\mathrm{toy}}
=
\left(
\Delta_{\mathrm{part}}^{\mathrm{toy}},
\Delta_{\mathrm{half}}^{\mathrm{toy}}
\right)
=
(0,0),
$$

after $p_{+}$ is supplied by the ideal half-angle chart.

## Workstream Verdict

The toy model sharpens the next apparatus task: a concrete substrate model must replace the hand-set basin size $p_{+}$ with a measure induced by retained apparatus rows and the effective spinor coordinate,

$$
p_{+}
\quad
\leadsto
\quad
\nu_{\hat{\mathbf m}}^{\mathrm{SG}}
\left(
B_{+}[\mathcal J_C^{\mathrm{in}},\mathcal A_{\hat{\mathbf m}}^{\mathrm{app}},\psi(Z)]
\right).
$$

Until that replacement exists, the Stern-Gerlach half-angle row remains a reduced consistency check rather than a derived measurement-response theorem.
