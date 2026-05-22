# Stern-Gerlach Separatrix-Lift Diagnostic

Status. Priority diagnostic for `measurement_response`, downstream of [sg-apparatus-substrate-response-packet.md](sg-apparatus-substrate-response-packet.md), [sg-record-cycle-toy-model.md](sg-record-cycle-toy-model.md), and [ideal-analyzer-and-sg-residual-instance.md](ideal-analyzer-and-sg-residual-instance.md). This file lifts the toy record interval into a separatrix pullback measure formula. It is priority material only and does not claim Stern-Gerlach theorem success, spinor-coordinate success, pair-provenance success, or Bell recovery.

Claim level. Reduced diagnostic / defer with blocker. The diagnostic replaces the hand-set plus interval $[0,2\pi p_{+})$ by a signed separatrix functional and a pullback measure. In the toy reduction it reproduces the same half-angle arithmetic, but the physical row remains blocked until an apparatus model supplies the incoming measure, apparatus return map, separatrix normal, effective spinor coordinate, and branch-sum impulse.

Promotion decision. Priority-only until the substrate apparatus rows are populated. The formula is a useful target for the next apparatus model, not reader-facing measurement ontology.

## Lifted Apparatus State

Let

$$
Z_0\in\mathcal Z_{\hat{\mathbf m}}^{\mathrm{SG}}
$$

be the local incoming apparatus state at $t_{\mathrm{in}}$, including the incoming core ledger, apparatus field/wake input, record phase, and record gate variables from [sg-apparatus-substrate-response-packet.md](sg-apparatus-substrate-response-packet.md). The apparatus return map is

$$
\Phi_{T_{\mathrm{int}}}^{\hat{\mathbf m}}
:
\mathcal Z_{\hat{\mathbf m}}^{\mathrm{SG}}
\longrightarrow
\mathcal Z_{\hat{\mathbf m}}^{\mathrm{SG}}.
$$

A concrete apparatus model must supply a signed separatrix functional

$$
\Sigma_{\hat{\mathbf m}}^{\mathrm{SG}}
:
\mathcal Z_{\hat{\mathbf m}}^{\mathrm{SG}}
\longrightarrow
\mathbb R
$$

and a successful-record gate

$$
G_{\mathrm{rec}}
:
\mathcal Z_{\hat{\mathbf m}}^{\mathrm{SG}}
\longrightarrow
\{0,1\}.
$$

The lifted plus and reject basins are

$$
B_{+}^{\mathrm{lift}}(\hat{\mathbf m})
=
\left\{
Z_0:
G_{\mathrm{rec}}\left(\Phi_{T_{\mathrm{int}}}^{\hat{\mathbf m}}(Z_0)\right)=1,
\quad
\Sigma_{\hat{\mathbf m}}^{\mathrm{SG}}
\left(
\Phi_{T_{\mathrm{int}}}^{\hat{\mathbf m}}(Z_0)
\right)
>0
\right\},
$$

and

$$
B_{-}^{\mathrm{lift}}(\hat{\mathbf m})
=
\left\{
Z_0:
G_{\mathrm{rec}}\left(\Phi_{T_{\mathrm{int}}}^{\hat{\mathbf m}}(Z_0)\right)=1,
\quad
\Sigma_{\hat{\mathbf m}}^{\mathrm{SG}}
\left(
\Phi_{T_{\mathrm{int}}}^{\hat{\mathbf m}}(Z_0)
\right)
<0
\right\}.
$$

The zero set

$$
\mathscr S_{\hat{\mathbf m}}^{\mathrm{SG}}
=
\left\{
Z:
\Sigma_{\hat{\mathbf m}}^{\mathrm{SG}}(Z)=0
\right\}
$$

is allowed to carry zero record measure in the ideal row. If it carries positive record measure, the apparatus response has an unresolved threshold band and the row is blocked or fails calibration.

## Pullback Measure Row

Let $\mu_{\hat{\mathbf m}}^{\mathrm{in}}$ be the incoming local measure on $\mathcal Z_{\hat{\mathbf m}}^{\mathrm{SG}}$ induced by the retained incoming core ledger, the apparatus field/wake input, and the successful local record preparation. The lifted plus probability is

$$
P_{+}^{\mathrm{lift}}(\hat{\mathbf m})
=
\int_{\mathcal Z_{\hat{\mathbf m}}^{\mathrm{SG}}}
\mathbf 1_{B_{+}^{\mathrm{lift}}(\hat{\mathbf m})}(Z_0)
\,d\mu_{\hat{\mathbf m}}^{\mathrm{in}}(Z_0).
$$

The reject probability is

$$
P_{-}^{\mathrm{lift}}(\hat{\mathbf m})
=
\int_{\mathcal Z_{\hat{\mathbf m}}^{\mathrm{SG}}}
\mathbf 1_{B_{-}^{\mathrm{lift}}(\hat{\mathbf m})}(Z_0)
\,d\mu_{\hat{\mathbf m}}^{\mathrm{in}}(Z_0).
$$

The record-normalization residual is

$$
\Delta_{\mathrm{rec}}^{\mathrm{lift}}
=
\left|
P_{+}^{\mathrm{lift}}
+
P_{-}^{\mathrm{lift}}
-
\mu_{\hat{\mathbf m}}^{\mathrm{in}}
\left(
G_{\mathrm{rec}}\circ\Phi_{T_{\mathrm{int}}}^{\hat{\mathbf m}}=1
\right)
\right|.
$$

The half-angle comparison residual is

$$
\Delta_{\mathrm{half}}^{\mathrm{lift}}
=
\left|
P_{+}^{\mathrm{lift}}(\hat{\mathbf m})
-
\cos^2\left(\frac{\alpha(Z_0,\hat{\mathbf m})}{2}\right)_{\mu}
\right|,
$$

where the subscript $\mu$ means the average must be computed from the derived effective spinor coordinate and incoming measure, not inserted as an external table.

## Toy Reduction Check

The record-cycle toy model is recovered by taking

$$
\mathcal Z_{\hat{\mathbf m}}^{\mathrm{SG,toy}}
=
S^1,
\qquad
Z_0=\theta_{\mathrm{rec}},
\qquad
d\mu_{\hat{\mathbf m}}^{\mathrm{in}}
=
\frac{d\theta_{\mathrm{rec}}}{2\pi},
$$

and using the signed toy separatrix

$$
\Sigma_{\hat{\mathbf m}}^{\mathrm{toy}}
\left(
\theta_{\mathrm{rec}}
\right)
=
2\pi p_{+}
-
\theta_{\mathrm{rec}},
\qquad
p_{+}
=
\cos^2\left(\frac{\alpha}{2}\right).
$$

Then

$$
B_{+}^{\mathrm{lift,toy}}
=
\left\{
\theta_{\mathrm{rec}}:
0\le\theta_{\mathrm{rec}}<2\pi p_{+}
\right\},
$$

and therefore

$$
P_{+}^{\mathrm{lift,toy}}
=
\int_0^{2\pi p_{+}}
\frac{d\theta_{\mathrm{rec}}}{2\pi}
=
p_{+}.
$$

The lift reproduces the toy half-angle arithmetic while exposing which rows are still imported: $p_{+}$, $\alpha$, the uniform incoming measure, and the separatrix itself.

## Diagnostic Residual Vector

The separatrix-lift residual vector is

$$
\mathcal R_{\mathrm{SG}}^{\mathrm{lift}}
=
\left(
\Delta_{\mathrm{app}},
\Delta_{\mathrm{sep}},
\Delta_{\mathrm{norm}},
\Delta_{\mathrm{rec}}^{\mathrm{lift}},
\Delta_{\psi},
\Delta_{\mathrm{half}}^{\mathrm{lift}},
\Delta_{\mathbf J}^{\mathrm{event}}
\right).
$$

The rows mean:

| Row | Meaning | Current verdict |
| --- | --- | --- |
| $\Delta_{\mathrm{app}}$ | Branch-sum apparatus impulse is computed from retained apparatus rows. | Blocked. |
| $\Delta_{\mathrm{sep}}$ | $\Sigma_{\hat{\mathbf m}}^{\mathrm{SG}}$ and its normal are defined on the successful record domain. | Formula only. |
| $\Delta_{\mathrm{norm}}$ | The zero set has zero record measure or a calibrated threshold rule. | Blocked. |
| $\Delta_{\mathrm{rec}}^{\mathrm{lift}}$ | Plus/reject basins partition successful records. | Toy pass only. |
| $\Delta_{\psi}$ | The effective spinor coordinate $\psi(Z)$ and angle $\alpha(Z,\hat{\mathbf m})$ are derived from the ordered Noether swarm history. | Blocked. |
| $\Delta_{\mathrm{half}}^{\mathrm{lift}}$ | The lifted plus measure matches the derived half-angle target. | Toy pass only after $p_{+}$ is supplied. |
| $\Delta_{\mathbf J}^{\mathrm{event}}$ | Event recoil and wake rows conserve angular momentum through the record event. | Blocked. |

## Workstream Verdict

The separatrix lift is the next honest step beyond the toy interval:

$$
[0,2\pi p_{+})
\quad
\leadsto
\quad
\left\{
Z_0:
\Sigma_{\hat{\mathbf m}}^{\mathrm{SG}}
\left(
\Phi_{T_{\mathrm{int}}}^{\hat{\mathbf m}}(Z_0)
\right)
>0
\right\}.
$$

It turns the half-angle row into a pullback-measure target, but it does not supply the apparatus dynamics or effective spinor coordinate. The current measurement-response status therefore advances from `sg-record-toy-model-populated` to a separatrix-lift diagnostic, still blocked on substrate apparatus rows.
