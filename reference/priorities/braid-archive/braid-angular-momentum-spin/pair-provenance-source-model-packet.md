# Pair-Provenance Source-Model Packet

Status. Proof packet for `pair_provenance_measure` in [priorities.md](priorities.md). This packet is priority material only. It defines the first worked singlet-like source-model scaffold that can be consumed by [photon-measurement-bell-gate-packet.md](photon-measurement-bell-gate-packet.md) and by the quantum-closure source-measure contract in [dynamic-pair-provenance-source-measure.md](../../quantum-closure/dynamic-pair-provenance-source-measure.md). It does not edit reader-facing $\mathbb{A}\mathbb{A}\mathbb{A}$ prose.

Claim level. The packet specifies source variables, two outgoing branch ledgers, total angular-momentum balance, local Stern-Gerlach-like apparatus-response inputs, measurement-independence and no-signaling residuals, and the Bell correlation residual target. It does not claim Bell success. The source variables below are a worked scaffold until an accepted substrate branch certificate supplies the retained source, wake, phase, and apparatus data.

## Status Convention

Fix tolerances

$$
\varepsilon_{\mathrm{src}},
\varepsilon_{\mathrm{prov}},
\varepsilon_{\mathbf J},
\varepsilon_{\varphi},
\varepsilon_{\mathrm{app}},
\varepsilon_{\mathrm{MI}},
\varepsilon_{\mathrm{NS}},
\varepsilon_{\mathrm{Bell}}>0.
$$

A row is `pass` only when its residual is below tolerance and all substrate inputs are present. A row is `blocked` when the residual can be written but the accepted branch, wake, phase, or apparatus data needed to evaluate it is absent. A row is `fail` when it violates a declared exclusion, including setting-dependent source provenance, distant-setting dependence before causal-wake contact, or product-screened opposite classical-axis response.

## Source Event Variables

The worked source model is a singlet-like preparation protocol

$$
P_{\mathrm{src}}^{\mathrm{sing}}
=
\left(
B_{\mathrm{parent}}^-,
W_{\mathrm{src}},
t_0,
t_{\mathrm{sep}},
\Sigma_{\mathrm{src}},
\mu_{\mathrm{src}},
\Gamma_{\mathrm{src}}^{\mathrm{loc}}
\right).
$$

Here $B_{\mathrm{parent}}^-$ is the incoming parent branch chart, $W_{\mathrm{src}}=[t_0,t_{\mathrm{sep}}]$ is the source-to-separation window, $\Sigma_{\mathrm{src}}$ is the source return section, $\mu_{\mathrm{src}}$ is the source occupation measure on that section, and $\Gamma_{\mathrm{src}}^{\mathrm{loc}}$ collects local source-apparatus or fragmentation data available at the source event. Later detector settings $\hat{\mathbf m}_A,\hat{\mathbf m}_B$ are not fields of $P_{\mathrm{src}}^{\mathrm{sing}}$.

The pair-provenance map is

$$
C_{\mathrm{pair}}^{\mathrm{sing}}
:
\Sigma_{\mathrm{src}}
\longrightarrow
\Pi_{AB}^{\mathrm{sing}},
$$

with pushforward source measure

$$
\rho_{\mathrm{src}}
\left(
\Pi_{AB}^{\mathrm{sing}}
\middle|
P_{\mathrm{src}}^{\mathrm{sing}}
\right)
=
C_{\mathrm{pair}*}^{\mathrm{sing}}\mu_{\mathrm{src}}.
$$

The retained pair-provenance record is

$$
\Pi_{AB}^{\mathrm{sing}}
=
\left(
\Gamma_{\mathrm{parent}}(t_0^-),
\mathfrak B_A^+,
\mathfrak B_B^+,
\mathcal L_{\mathrm{root}}^{AB},
\mathcal W_{AB}[t_0,t_{\mathrm{sep}}],
\mathbf J_{AB}^{\mathrm{bal}},
\Theta_{AB}^{\mathrm{rel}},
\mathcal Q_{AB}^{\mathrm{cons}},
\Xi_{\mathrm{src}}
\right).
$$

The fields match the existing pair-provenance contract. $\mathfrak B_A^+$ and $\mathfrak B_B^+$ are the two outgoing branch ledgers, $\mathcal L_{\mathrm{root}}^{AB}$ retains source-side active causal-root rows through separation, $\mathcal W_{AB}$ retains pair wake and path-history data, $\mathbf J_{AB}^{\mathrm{bal}}$ records total angular-momentum balance, $\Theta_{AB}^{\mathrm{rel}}$ records relative orientation and phase data, $\mathcal Q_{AB}^{\mathrm{cons}}$ records conserved energy, momentum, polarity inventory, and reaction provenance, and $\Xi_{\mathrm{src}}$ collects unresolved source variables that are not detector settings.

This use of $\Pi_{AB}^{\mathrm{sing}}$ is deliberate: the proof packet should not compress the pair into a bare hidden-variable label or a preassigned axis.

## Two Outgoing Branch Ledgers

For each daughter $X\in\{A,B\}$, the outgoing branch ledger is a retained branch chart

$$
\mathfrak B_X^+
=
\mathfrak B
\left(
\Gamma_X^+,
\mathcal S_X;
h,\eta,\epsilon_c
\right)
=
\left(
\mathcal R_{X}^{\mathrm{act}},
\mathcal G_{X}^{\mathrm{inact}},
\nu_{J,X},
h_{\mathrm{mem},X},
\mathcal R_{\mathrm{return},X},
\lambda_{\mathrm{sec},X}
\right),
$$

using the branch-chart convention from [fundamental-ledger-branch-chart-packet.md](fundamental-ledger-branch-chart-packet.md). The daughter ledgers must carry, at minimum,

$$
\mathcal J_X^{+}
=
\left(
\{\hat{\mathbf n}_{\ell X}\}_{\ell\in\{I,M,O\}},
\{\phi_{\ell X}\}_{\ell\in\{I,M,O\}},
\{\omega_{\ell X}\}_{\ell\in\{I,M,O\}},
\{I_{\ell X}\}_{\ell\in\{I,M,O\}},
\mathcal R_X^{\mathrm{act}},
\mathcal W_X^{\mathrm{loc}}
\right),
$$

where the entries are layer normals, phases, frequencies, radian-normalized action variables, retained active-root rows, and daughter-side local wake history.

Propagation to the detector entrance is represented by local pullbacks

$$
\Pi_{X}^{\mathrm{ent}}
=
\mathrm{Ent}_{X}
\left(
\Pi_{AB}^{\mathrm{sing}},
t_{\mathrm{ent},X}
\right),
\qquad
X\in\{A,B\}.
$$

Each $\Pi_X^{\mathrm{ent}}$ must be computable from the source record and the daughter branch ledger before the local apparatus response can be evaluated. It may include the local incoming core ledger, local wake history, and source-retained phase data; it must not include the distant detector setting as an input.

## Total Angular-Momentum Balance

The singlet-like source condition is total angular-momentum conservation in the retained pair provenance, not assignment of two opposite classical screen axes. In the source balance frame, define

$$
\Delta\mathbf J_{AB}^{0}
=
\mathbf J_{\mathrm{parent}}(t_0^-)
+\mathbf J_{\mathrm{src}}^{\mathrm{loc}}(t_0^-)
-\mathbf J_A(t_0^+)
-\mathbf J_B(t_0^+)
-\mathbf L_{\mathrm{wake},AB}^{0}
-\mathbf J_{\mathrm{src,rem}}^{0}
-\mathbf J_{\mathrm{sea}}^{0}.
$$

Here $\mathbf L_{\mathrm{wake},AB}^{0}$ is the retained wake angular-momentum term generated across $W_{\mathrm{src}}$, $\mathbf J_{\mathrm{src,rem}}^{0}$ is any local source remnant or recoil angular momentum, and $\mathbf J_{\mathrm{sea}}^{0}$ is the local Noether sea recoil term when the source model retains it.

The angular-momentum balance residual is

$$
\Delta_{\mathbf J}^{0}
=
\left\|
\Delta\mathbf J_{AB}^{0}
\right\|
+\left\|
\mathbf J_A(t_0^+)
+\mathbf J_B(t_0^+)
+\mathbf L_{\mathrm{wake},AB}^{0}
+\mathbf J_{\mathrm{src,rem}}^{0}
+\mathbf J_{\mathrm{sea}}^{0}
\right\|_{\mathrm{sing}},
$$

where the second term is evaluated in the declared singlet-like balance frame. Passing requires

$$
\Delta_{\mathbf J}^{0}\le\varepsilon_{\mathbf J}.
$$

At this packet's current claim level, this row is blocked: no accepted source branch certificate has yet supplied $\mathbf J_A(t_0^+)$, $\mathbf J_B(t_0^+)$, $\mathbf L_{\mathrm{wake},AB}^{0}$, $\mathbf J_{\mathrm{src,rem}}^{0}$, and $\mathbf J_{\mathrm{sea}}^{0}$ from one retained source event.

## Relative Phase Certificate Target

The first non-axis singlet-like datum should be extracted from the retained pair provenance. When the daughter separation axis is nonzero, define

$$
\hat{\mathbf a}_{AB}
=
\frac{
\mathbf X_A(t_{\mathrm{sep}})
-\mathbf X_B(t_{\mathrm{sep}})
}{
\left\|
\mathbf X_A(t_{\mathrm{sep}})
-\mathbf X_B(t_{\mathrm{sep}})
\right\|
}.
$$

For each daughter $X\in\{A,B\}$ and layer $\ell\in\{I,M,O\}$, define the source-to-separation phase ledger

$$
\Theta_{\ell X}^{AB}
=
\phi_{\ell X}(t_0^+)
+\int_{t_0}^{t_{\mathrm{sep}}}\omega_{\ell X}(t)\,dt
+\Phi_{\ell X}^{\mathrm{root}}
+\Phi_{\ell X}^{\mathrm{frame}}.
$$

Let $\mathbf J_{\ell X}^{\mathrm{bal}}$ denote the layer contribution to $\mathbf J_{AB}^{\mathrm{bal}}$, and let $\mathbf L_{\mathrm{wake},X}^{AB}$ denote the daughter-side wake contribution retained by $\mathcal W_{AB}[t_0,t_{\mathrm{sep}}]$. The angular-momentum-weighted phase phasor is

$$
Z_X^{AB}
=
\sum_{\ell\in\{I,M,O\}}
\left(
\hat{\mathbf a}_{AB}\cdot\mathbf J_{\ell X}^{\mathrm{bal}}
\right)
e^{i\Theta_{\ell X}^{AB}}
+
\left(
\hat{\mathbf a}_{AB}\cdot\mathbf L_{\mathrm{wake},X}^{AB}
\right)
e^{i\Theta_{\mathrm{wake},X}^{AB}}.
$$

The singlet-like relative phase candidate is

$$
\varphi_{\Pi}
\left(
\Pi_{AB}^{\mathrm{sing}}
\right)
=
\arg
\left(
-Z_A^{AB}\overline{Z_B^{AB}}
e^{i\Phi_{AB}^{\mathrm{wake}}}
\right).
$$

The minus sign records the singlet-like phase inversion associated with total angular-momentum balance. It is not a quantum-postulate insertion and not an opposite-axis screen rule.

The phase certificate has residuals

$$
m_Z
=
\min
\left(
\left|Z_A^{AB}\right|,
\left|Z_B^{AB}\right|
\right),
\qquad
\Delta_Z^{0}
=
\mathbf 1_{m_Z\le\epsilon_0},
$$

and, for the allowed branch-preserving gauge action $G_{\mathrm{pair}}$ on the retained pair record,

$$
\Delta_{\varphi}^{\mathrm{gauge}}
=
\sup_{g\in G_{\mathrm{pair}}}
\operatorname{dist}_{S^1}
\left(
\varphi_{\Pi}(g\cdot\Pi_{AB}^{\mathrm{sing}}),
\varphi_{\Pi}(\Pi_{AB}^{\mathrm{sing}})
\right).
$$

Passing the phase-certificate row requires

$$
\Delta_Z^{0}=0,
\qquad
\Delta_{\varphi}^{\mathrm{gauge}}\le\varepsilon_{\varphi},
$$

and a substrate-derived wake phase ledger for $\Phi_{AB}^{\mathrm{wake}}$ and $\Theta_{\mathrm{wake},X}^{AB}$. This row is blocked until an accepted pair-source certificate supplies the layer phase ledgers, wake phase ledger, angular-momentum projections, and gauge probes.

## Local Apparatus-Response Inputs

For a Stern-Gerlach-like detector setting $\hat{\mathbf m}_X$, the local response input at wing $X$ is

$$
Z_{X,\hat{\mathbf m}_X}(t_{\mathrm{in},X})
=
\left(
\mathcal J_X(t_{\mathrm{in},X}),
A_{X,\hat{\mathbf m}_X}(t_{\mathrm{in},X}),
\mathcal W_{\mathrm{loc},X}(t_{\mathrm{in},X}),
\Pi_X^{\mathrm{ent}}
\right).
$$

The local response row must provide the same objects as the Stern-Gerlach handoff:

$$
\mathcal Q_{X,\hat{\mathbf m}_X}
=
e^{\Lambda_{X,\hat{\mathbf m}_X}(t_{\mathrm{in},X},t_{\mathrm{out},X})}
\Sigma_{X,\hat{\mathbf m}_X}
\left(
Z_{X,\hat{\mathbf m}_X}(t_{\mathrm{in},X})
\right)
+
\int_{t_{\mathrm{in},X}}^{t_{\mathrm{out},X}}
e^{\Lambda_{X,\hat{\mathbf m}_X}(s,t_{\mathrm{out},X})}
\mathcal N_{X,\hat{\mathbf m}_X}(Z_X(s),s)
\cdot
\dot{\mathbf J}_{C_X}^{\mathrm{app}}(s)\,ds.
$$

The apparatus impulse is local:

$$
\dot{\mathbf J}_{C_X}^{\mathrm{app}}(t;\hat{\mathbf m}_X)
=
\mu_{\mathrm{arch}}
\sum_{i\in C_X}
\left(
\mathbf x_i(t)-\mathbf X_{C_X}(t)
\right)
\times
\mathbf a_i^{\mathrm{app}}(t;\hat{\mathbf m}_X)
+
\dot{\mathbf L}_{\mathrm{wake},C_X\leftrightarrow A_X}(t).
$$

The successful-record kernels are

$$
K_{X,+}^{\mathrm{SG}}
=
G_{\mathrm{rec},X}
H
\left(
\mathcal Q_{X,\hat{\mathbf m}_X}
\right),
\qquad
K_{X,-}^{\mathrm{SG}}
=
G_{\mathrm{rec},X}
H
\left(
-\mathcal Q_{X,\hat{\mathbf m}_X}
\right).
$$

A local apparatus row is ready for pair-provenance replay only if it supplies $\Pi_X^{\mathrm{ent}}$, $\Sigma_{X,\hat{\mathbf m}_X}$, $\Lambda_{X,\hat{\mathbf m}_X}$, ordered integrand samples for $\mathcal N_{X,\hat{\mathbf m}_X}\cdot\dot{\mathbf J}_{C_X}^{\mathrm{app}}$, $G_{\mathrm{rec},X}$, a record-cycle phase $\theta_{\mathrm{rec}}^X$, and same-window local residuals

$$
\Delta_{\mathrm{rec}}^X,
\quad
\Delta_{\mathrm{div}}^X,
\quad
\Delta_{\mathrm{event}}^X.
$$

This packet does not supply those rows. The existing [ideal-analyzer-and-sg-residual-instance.md](ideal-analyzer-and-sg-residual-instance.md) supplies a reduced half-angle arithmetic check, not a substrate apparatus response for either wing.

## Joint Record Law

The joint record law must be emitted from the pair provenance and the two local apparatus measures:

$$
P(a,b|\hat{\mathbf m}_A,\hat{\mathbf m}_B)
=
\int
K_{ab}^{AB}
\left(
\hat{\mathbf m}_A,\hat{\mathbf m}_B;
\Pi_{AB}^{\mathrm{sing}},
\zeta_A,\zeta_B
\right)
d\nu_{A,\hat{\mathbf m}_A}(\zeta_A)
d\nu_{B,\hat{\mathbf m}_B}(\zeta_B)
d\rho_{\mathrm{src}}
\left(
\Pi_{AB}^{\mathrm{sing}}
\middle|
P_{\mathrm{src}}^{\mathrm{sing}}
\right).
$$

The local apparatus measures $d\nu_{A,\hat{\mathbf m}_A}$ and $d\nu_{B,\hat{\mathbf m}_B}$ may depend on the local setting and local apparatus calibration. They must not depend on the distant setting before causal-wake contact. The joint basin kernel $K_{ab}^{AB}$ may depend on the retained pair provenance and the two actual local record channels; it must not be supplied as a hand-written Bell probability table.

For compression audits, use the full record measure

$$
d\mu_{AB}^{\mathrm{rec}}
=
d\nu_{A,\hat{\mathbf m}_A}(\zeta_A)
d\nu_{B,\hat{\mathbf m}_B}(\zeta_B)
d\rho_{\mathrm{src}}
\left(
\Pi_{AB}^{\mathrm{sing}}
\middle|
P_{\mathrm{src}}^{\mathrm{sing}}
\right).
$$

## Measurement-Independence Residual

The source model's measurement-independence residual is

$$
\Delta_{\mathrm{MI}}^{\mathrm{prov}}
=
\sup_{\hat{\mathbf m}_A,\hat{\mathbf m}_B}
D_{\mathrm{TV}}
\left(
\rho_{\mathrm{src}}
\left(
\Pi_{AB}^{\mathrm{sing}}
\middle|
\hat{\mathbf m}_A,\hat{\mathbf m}_B,
P_{\mathrm{src}}^{\mathrm{sing}}
\right),
\rho_{\mathrm{src}}
\left(
\Pi_{AB}^{\mathrm{sing}}
\middle|
P_{\mathrm{src}}^{\mathrm{sing}}
\right)
\right).
$$

The row passes only if

$$
\Delta_{\mathrm{MI}}^{\mathrm{prov}}\le\varepsilon_{\mathrm{MI}}.
$$

The source section above excludes later settings by construction, but a numerical pass remains blocked until an emitted source artifact demonstrates that no setting fields, context table labels, or setting-conditioned weights enter $\rho_{\mathrm{src}}$.

## No-Signaling Residual

For outcomes $a,b\in\{-1,+1\}$, define

$$
\Delta_{\mathrm{NS}}^{A}
=
\sup_{\hat{\mathbf m}_A,\hat{\mathbf m}_B,\hat{\mathbf m}'_B}
\sum_{a=\pm1}
\left|
\sum_{b=\pm1}
P(a,b|\hat{\mathbf m}_A,\hat{\mathbf m}_B)
-
\sum_{b=\pm1}
P(a,b|\hat{\mathbf m}_A,\hat{\mathbf m}'_B)
\right|,
$$

and

$$
\Delta_{\mathrm{NS}}^{B}
=
\sup_{\hat{\mathbf m}_B,\hat{\mathbf m}_A,\hat{\mathbf m}'_A}
\sum_{b=\pm1}
\left|
\sum_{a=\pm1}
P(a,b|\hat{\mathbf m}_A,\hat{\mathbf m}_B)
-
\sum_{a=\pm1}
P(a,b|\hat{\mathbf m}'_A,\hat{\mathbf m}_B)
\right|.
$$

Passing requires

$$
\Delta_{\mathrm{NS}}^{A}\le\varepsilon_{\mathrm{NS}},
\qquad
\Delta_{\mathrm{NS}}^{B}\le\varepsilon_{\mathrm{NS}}.
$$

This row is blocked until the joint record law is emitted from the source measure and two local apparatus-response rows.

## Bell Correlation Residual Target

For the spin-$\tfrac12$ singlet-like test, define

$$
E_{\mathrm{SG}}(\hat{\mathbf m}_A,\hat{\mathbf m}_B)
=
\sum_{a,b=\pm1}
ab\,
P(a,b|\hat{\mathbf m}_A,\hat{\mathbf m}_B),
$$

with $\theta_{AB}$ determined by

$$
\hat{\mathbf m}_A\cdot\hat{\mathbf m}_B
=
\cos\theta_{AB}.
$$

The Bell correlation residual target is

$$
\Delta_{\mathrm{Bell}}^{\mathrm{SG}}
=
\sup_{\theta_{AB}\in[0,\pi]}
\left|
E_{\mathrm{SG}}(\theta_{AB})
+\cos\theta_{AB}
\right|.
$$

For standard CHSH settings, report

$$
S
=
E(x,y)+E(x,y')+E(x',y)-E(x',y'),
$$

and the Tsirelson excess diagnostic

$$
\Delta_{\mathrm{Ts}}
=
\max
\left(
0,
|S|-2\sqrt2
\right).
$$

Bell success is not claimed here. The row is blocked until $\rho_{\mathrm{src}}$, both local apparatus measures, the joint record basins, measurement-independence residual, no-signaling residuals, and product-screening audit are populated from substrate data.

## Explicit Failure: Opposite Classical-Axis Screens

The following shortcut is rejected even when creation-level angular momentum is conserved. Suppose a candidate replaces $\Pi_{AB}^{\mathrm{sing}}$ by a single preassigned axis

$$
\hat{\mathbf n}_A=-\hat{\mathbf n}_B,
$$

with local screen responses

$$
A(\hat{\mathbf m}_A,\hat{\mathbf n}_A)
=
\operatorname{sgn}
\left(
\hat{\mathbf m}_A\cdot\hat{\mathbf n}_A
\right),
\qquad
B(\hat{\mathbf m}_B,\hat{\mathbf n}_B)
=
\operatorname{sgn}
\left(
\hat{\mathbf m}_B\cdot\hat{\mathbf n}_B
\right),
$$

and an isotropic source distribution over $\hat{\mathbf n}_A$. This model can preserve source-level $\mathbf J_A+\mathbf J_B=\mathbf 0$ in the narrow classical-axis sense, and it can preserve measurement independence and no-signaling, but it generates

$$
E_{\mathrm{axis}}(\theta)
=
-1+\frac{2\theta}{\pi},
$$

not the singlet target $-\cos\theta$. It is therefore a failed source model for `pair_provenance_measure`, not a partial Bell success.

The product-screening residual for any candidate is

$$
\Delta_{\mathrm{prod}}
=
\inf_{K_A,K_B}
\sup_{a,b,\hat{\mathbf m}_A,\hat{\mathbf m}_B}
\left|
P(a,b|\hat{\mathbf m}_A,\hat{\mathbf m}_B)
-
\int
K_A(a|\hat{\mathbf m}_A,\Pi_{AB}^{\mathrm{sing}},\zeta_A)
K_B(b|\hat{\mathbf m}_B,\Pi_{AB}^{\mathrm{sing}},\zeta_B)
d\mu_{AB}^{\mathrm{rec}}
\right|.
$$

If $\Delta_{\mathrm{prod}}\le\varepsilon_{\mathrm{Bell}}$ for a claimed Bell-violating table, the candidate has product-screened itself and fails the Bell handoff.

## Blocked Rows

| Row | Residual or required field | Current status | Exact blocker |
| --- | --- | --- | --- |
| Source section | $\Sigma_{\mathrm{src}}$, $\mu_{\mathrm{src}}$, $C_{\mathrm{pair}}^{\mathrm{sing}}$ | blocked | No accepted source-return section or source occupation measure has been emitted from a retained substrate branch. |
| Daughter branch ledger $A$ | $\mathfrak B_A^+$ and $\Pi_A^{\mathrm{ent}}$ | blocked | No outgoing accepted daughter branch chart with active causal-root rows, local wake history, and detector-entrance pullback. |
| Daughter branch ledger $B$ | $\mathfrak B_B^+$ and $\Pi_B^{\mathrm{ent}}$ | blocked | Same missing accepted daughter branch data for the $B$ wing. |
| Source angular-momentum balance | $\Delta_{\mathbf J}^{0}$ | blocked | Missing substrate-derived $\mathbf J_A$, $\mathbf J_B$, $\mathbf L_{\mathrm{wake},AB}^{0}$, source remnant recoil, and local Noether sea recoil on one source event. |
| Relative phase certificate | $m_Z$, $\Delta_Z^{0}$, $\Delta_{\varphi}^{\mathrm{gauge}}$ | blocked | Missing layer phase ledgers, wake phase ledger, angular-momentum projections, and branch-preserving gauge probes. |
| Local apparatus response $A$ | $\mathcal Q_{A,\hat{\mathbf m}_A}$, $d\nu_{A,\hat{\mathbf m}_A}$, $\theta_{\mathrm{rec}}^A$, local residuals | blocked | No accepted same-window Stern-Gerlach apparatus-response row for the $A$ wing. |
| Local apparatus response $B$ | $\mathcal Q_{B,\hat{\mathbf m}_B}$, $d\nu_{B,\hat{\mathbf m}_B}$, $\theta_{\mathrm{rec}}^B$, local residuals | blocked | No accepted same-window Stern-Gerlach apparatus-response row for the $B$ wing. |
| Measurement independence | $\Delta_{\mathrm{MI}}^{\mathrm{prov}}$ | ready formula, blocked numerical pass | Need emitted source records proving that settings do not enter source weights, source fields, or context labels. |
| No-signaling | $\Delta_{\mathrm{NS}}^A$, $\Delta_{\mathrm{NS}}^B$ | ready formula, blocked numerical pass | Need probability tables generated from source records and local apparatus measures, not a fitted target table. |
| Opposite classical-axis screen | $E_{\mathrm{axis}}(\theta)=-1+2\theta/\pi$ | fail | Conserving creation-level angular momentum by preassigning opposite axes still gives the linear-correlation failure mode. |
| Bell correlation target | $\Delta_{\mathrm{Bell}}^{\mathrm{SG}}$, $S$, $\Delta_{\mathrm{Ts}}$, $\Delta_{\mathrm{prod}}$ | blocked | Need populated source measure, two local apparatus-response rows, joint record basins, no-signaling, measurement independence, and nonzero product-screening audit. |

## Direct Use

This packet advances `pair_provenance_measure` from field scaffolding to a worked source-model contract. The next valid producer is not another Bell probability table. It is an accepted source-event artifact that fills the two daughter branch ledgers, angular-momentum balance row, phase-certificate row, and two local apparatus-response rows. Only after those rows exist should the Bell-family residual harness consume the resulting $P(a,b|\hat{\mathbf m}_A,\hat{\mathbf m}_B)$.
