# Stern-Gerlach Apparatus Substrate-Response Packet

Status. Priority proof packet for `measurement_response`, downstream of [photon-measurement-bell-gate-packet.md](photon-measurement-bell-gate-packet.md) and [ideal-analyzer-and-sg-residual-instance.md](ideal-analyzer-and-sg-residual-instance.md). This file replaces one ideal Stern-Gerlach assumption with a substrate handoff contract: the local apparatus response must be emitted as branch-sum impulse, record-cycle measure, plus/reject basins, and event recoil/wake ledger rows. It does not edit reader-facing $\mathbb{A}\mathbb{A}\mathbb{A}$ prose.

Claim level. The packet defines the rows that a concrete Stern-Gerlach apparatus model must populate. It does not claim Stern-Gerlach theorem success, spinor-coordinate success, pair-provenance success, or Bell success. A reduced half-angle calculation remains an algebraic check only after the local substrate rows and effective spinor coordinate are both available.

## Status Convention

Fix tolerances

$$
\varepsilon_{\mathrm{app}},
\varepsilon_{\mathrm{rec}},
\varepsilon_{\mathrm{basin}},
\varepsilon_{\mathbf J},
\varepsilon_{E},
\varepsilon_{\mathbf p},
\varepsilon_{\mathrm{row}},
\varepsilon_{\mathrm{SG}},
\varepsilon_{\mathrm{Bell}}>0.
$$

A row is `pass` only when its residual is below tolerance and every substrate input used by that residual is populated from the same local interaction window. A row is `blocked` when the residual can be written but the retained core ledger, apparatus field/wake input, branch-sum impulse, record-cycle measure, separatrix, or event recoil/wake ledger is absent. A row is `fail` when the candidate imports an ideal spin label, a hand-written half-angle threshold, an unreported recoil channel, a distant detector setting, or a Bell probability table in place of the local substrate response.

## Local Incoming Core Ledger

Fix a single measured core $C$, a Stern-Gerlach apparatus $A$, an apparatus setting $\hat{\mathbf m}$, and a local interaction window

$$
W_{\mathrm{SG}}=[t_{\mathrm{in}},t_{\mathrm{out}}].
$$

The local incoming core ledger is

$$
\mathcal J_{C}^{\mathrm{in}}(t_{\mathrm{in}})
=
\left(
B_C^-,
\{\hat{\mathbf n}_{\ell C}\}_{\ell\in\{I,M,O\}},
\{\phi_{\ell C}\}_{\ell\in\{I,M,O\}},
\{\omega_{\ell C}\}_{\ell\in\{I,M,O\}},
\{I_{\ell C}\}_{\ell\in\{I,M,O\}},
\mathcal R_{C}^{\mathrm{act}},
\mathcal W_{C}^{\mathrm{loc}},
\mathbf J_C^{\mathrm{in}},
h_{\mathrm{mem},C},
\mathcal R_{\mathrm{return},C}
\right).
$$

Here $B_C^-$ is the pre-interaction branch chart, $\mathcal R_{C}^{\mathrm{act}}$ is the retained active-root row set on $W_{\mathrm{SG}}$, $\mathcal W_{C}^{\mathrm{loc}}$ is the local wake history carried into the apparatus, and $\mathbf J_C^{\mathrm{in}}$ is the incoming total angular-momentum ledger value. If the event is part of a pair-provenance replay, the detector-entrance pullback is appended as

$$
\mathcal J_{C}^{\mathrm{in},\Pi}
=
\left(
\mathcal J_{C}^{\mathrm{in}},
\Pi_C^{\mathrm{ent}}
\right).
$$

The local response packet may consume $\Pi_C^{\mathrm{ent}}$ only as local entrance data. It must not consume the distant wing setting, a source-side table conditioned on the later setting, or a preassigned opposite classical axis.

## Apparatus Field/Wake Input

The apparatus input is not a bare axis label. It is the local field/wake record

$$
\mathcal A_{\hat{\mathbf m}}^{\mathrm{app}}(t)
=
\left(
\mathcal F_{\hat{\mathbf m}}^{A}(t),
\nabla_{\hat{\mathbf m}}\mathcal F_{\hat{\mathbf m}}^{A}(t),
\Gamma_{C\leftrightarrow A}^{\mathrm{root}}(t),
\mathcal R_{C\leftrightarrow A}^{\mathrm{act}}(t),
\mathcal W_{C\leftrightarrow A}^{\mathrm{app}}(t),
\mathcal C_{\hat{\mathbf m}}^{\mathrm{cal}}(t),
G_{\mathrm{rec}}(t)
\right).
$$

$\mathcal F_{\hat{\mathbf m}}^{A}$ is the local apparatus field chart calibrated to the setting $\hat{\mathbf m}$, $\nabla_{\hat{\mathbf m}}\mathcal F_{\hat{\mathbf m}}^{A}$ is the setting-axis gradient data used by the apparatus response, $\Gamma_{C\leftrightarrow A}^{\mathrm{root}}$ records cross-root geometry, $\mathcal R_{C\leftrightarrow A}^{\mathrm{act}}$ is the retained core-apparatus active row set, $\mathcal W_{C\leftrightarrow A}^{\mathrm{app}}$ is the apparatus-coupled wake history, $\mathcal C_{\hat{\mathbf m}}^{\mathrm{cal}}$ records local calibration fields, and $G_{\mathrm{rec}}$ gates successful macroscopic records.

The substrate state consumed by the response law is

$$
Z_{\hat{\mathbf m}}^{\mathrm{SG}}(t)
=
\left(
\mathcal J_C^{\mathrm{in}}(t),
\mathcal A_{\hat{\mathbf m}}^{\mathrm{app}}(t),
\theta_{\mathrm{rec}}(t),
\zeta_{\mathrm{rec}}(t)
\right),
$$

with $\theta_{\mathrm{rec}}$ and $\zeta_{\mathrm{rec}}$ supplied by the record-cycle section below. The effective spinor coordinate $\psi(Z)$ is not part of this input unless a separate spinor-closure artifact has derived it from the ordered Noether swarm history.

## Apparatus Branch-Sum Impulse

For each retained apparatus row

$$
\rho\in\mathcal R_{C\leftrightarrow A}^{\mathrm{act}}(t),
$$

let

$$
\mathbf a_{i,\rho}^{\mathrm{app}}(t;\hat{\mathbf m})
=
\mathbf a_{i,\rho}^{\mathrm{field}}
\left[
\mathcal F_{\hat{\mathbf m}}^{A},
\nabla_{\hat{\mathbf m}}\mathcal F_{\hat{\mathbf m}}^{A}
\right]
+
\mathbf a_{i,\rho}^{\mathrm{wake}}
\left[
\mathcal W_{C\leftrightarrow A}^{\mathrm{app}}
\right]
+
\mathbf a_{i,\rho}^{\mathrm{root}}
\left[
\Gamma_{C\leftrightarrow A}^{\mathrm{root}}
\right]
$$

be the row-level acceleration contribution to core member $i\in C$. With branch weights $w_\rho(t)$ fixed by the retained row set, define

$$
\mathbf a_i^{\mathrm{app}}(t;\hat{\mathbf m})
=
\sum_{\rho\in\mathcal R_{C\leftrightarrow A}^{\mathrm{act}}(t)}
w_\rho(t)\,
\mathbf a_{i,\rho}^{\mathrm{app}}(t;\hat{\mathbf m}).
$$

The apparatus branch-sum impulse is

$$
\dot{\mathbf J}_{C}^{\mathrm{app}}(t;\hat{\mathbf m})
=
\mu_{\mathrm{arch}}
\sum_{i\in C}
\left(
\mathbf x_i(t)-\mathbf X_C(t)
\right)
\times
\mathbf a_i^{\mathrm{app}}(t;\hat{\mathbf m})
+
\dot{\mathbf L}_{\mathrm{wake},C\leftrightarrow A}^{\mathrm{app}}(t).
$$

The row-set identity residual is

$$
r_{\mathrm{rows}}^{\mathrm{app}}
=
\begin{cases}
0,
&
\mathcal R_{\mathrm{force}}^{\mathrm{act}}
=
\mathcal R_{\mathrm{torque}}^{\mathrm{act}}
=
\mathcal R_{\mathrm{wake}}^{\mathrm{act}}
=
\mathcal R_{\mathrm{rec}}^{\mathrm{act}}
=
\mathcal R_{C\leftrightarrow A}^{\mathrm{act}},
\\
\infty,
&\text{otherwise.}
\end{cases}
$$

The branch-sum impulse residual is

$$
\Delta_{\mathrm{app}}
=
\frac{
\left\|
\dot{\mathbf J}_{C}^{\mathrm{app}}
-
\mu_{\mathrm{arch}}
\sum_{i\in C}
\left(
\mathbf x_i-\mathbf X_C
\right)
\times
\sum_{\rho}w_\rho\mathbf a_{i,\rho}^{\mathrm{app}}
-
\dot{\mathbf L}_{\mathrm{wake},C\leftrightarrow A}^{\mathrm{app}}
\right\|_{L^1(W_{\mathrm{SG}})}
}{\varepsilon_{\mathrm{app}}}
+
r_{\mathrm{rows}}^{\mathrm{app}}.
$$

A pass requires $\Delta_{\mathrm{app}}\le 1$. At the current packet level this row is a formula, not a pass: no concrete apparatus model has supplied $\mathcal R_{C\leftrightarrow A}^{\mathrm{act}}$, $w_\rho$, row-level accelerations, or the wake-impulse term.

## Full Separatrix And Normal

Let

$$
\Phi_{T_{\mathrm{int}}}^{\hat{\mathbf m}}
:
\mathcal Z_{\hat{\mathbf m}}^{\mathrm{SG}}
\longrightarrow
\mathcal Z_{\hat{\mathbf m}}^{\mathrm{SG}}
$$

be the local apparatus return map over the interaction time $T_{\mathrm{int}}=t_{\mathrm{out}}-t_{\mathrm{in}}$. A concrete apparatus model must define a scalar signed separatrix functional

$$
\Sigma_{\hat{\mathbf m}}^{\mathrm{SG}}
:
\mathcal Z_{\hat{\mathbf m}}^{\mathrm{SG}}
\longrightarrow
\mathbb R
$$

whose zero set

$$
\mathscr S_{\hat{\mathbf m}}^{\mathrm{SG}}
=
\left\{
Z\in\mathcal Z_{\hat{\mathbf m}}^{\mathrm{SG}}
:
\Sigma_{\hat{\mathbf m}}^{\mathrm{SG}}(Z)=0
\right\}
$$

separates the plus record basin from the reject basin. The full substrate separatrix normal is the cotangent row

$$
\mathcal N_{\hat{\mathbf m}}^{\mathrm{SG}}(Z,t)
=
D_Z\Sigma_{\hat{\mathbf m}}^{\mathrm{SG}}(Z(t)).
$$

When a normalized normal is required for numerical comparison, use

$$
\widehat{\mathcal N}_{\hat{\mathbf m}}^{\mathrm{SG}}
=
\frac{
D_Z\Sigma_{\hat{\mathbf m}}^{\mathrm{SG}}
}{
\left\|
D_Z\Sigma_{\hat{\mathbf m}}^{\mathrm{SG}}
\right\|_*
}
$$

only on rows where the denominator is bounded away from zero. A candidate with an undefined normal on positive record measure is blocked or fails calibration; it cannot be repaired by substituting the reduced spinor normal.

The signed response functional is

$$
\mathcal Q_{\hat{\mathbf m}}^{\mathrm{SG}}
\left(
Z_{\hat{\mathbf m}}^{\mathrm{SG}}(t_{\mathrm{in}})
\right)
=
e^{\Lambda_{\hat{\mathbf m}}(t_{\mathrm{in}},t_{\mathrm{out}})}
\Sigma_{\hat{\mathbf m}}^{\mathrm{SG}}
\left(
Z_{\hat{\mathbf m}}^{\mathrm{SG}}(t_{\mathrm{in}})
\right)
+
\int_{t_{\mathrm{in}}}^{t_{\mathrm{out}}}
e^{\Lambda_{\hat{\mathbf m}}(s,t_{\mathrm{out}})}
\mathcal N_{\hat{\mathbf m}}^{\mathrm{SG}}(Z(s),s)
\cdot
\dot{\mathbf J}_{C}^{\mathrm{app}}(s;\hat{\mathbf m})
\,ds.
$$

The reduced normal from the ideal packet,

$$
\mathcal N_{\hat{\mathbf m}}^{\mathrm{SG,red}}
=
dp_{+}
-
\frac{1}{2\pi}d\theta_{\mathrm{rec}},
$$

is a comparison target only after $\psi(Z)$ and $p_+(Z;\hat{\mathbf m})$ are derived. It is not an allowed substitute for $\mathcal N_{\hat{\mathbf m}}^{\mathrm{SG}}$ in the substrate row.

## Record-Cycle Measure

The record cycle is a quotient of successful local record windows,

$$
\Theta_{\hat{\mathbf m}}^{\mathrm{rec}}
=
\mathcal P_{\hat{\mathbf m}}^{\mathrm{rec}}
/\!\sim_{\hat{\mathbf m}}^{\mathrm{rec}},
$$

with return map

$$
T_{\hat{\mathbf m}}^{\mathrm{rec}}
:
\Theta_{\hat{\mathbf m}}^{\mathrm{rec}}
\longrightarrow
\Theta_{\hat{\mathbf m}}^{\mathrm{rec}}.
$$

The apparatus must supply an invariant record measure

$$
\nu_{\hat{\mathbf m}}^{\mathrm{rec}}
\left(
\Theta_{\hat{\mathbf m}}^{\mathrm{rec}}
\right)
=1,
\qquad
T_{\hat{\mathbf m}*}^{\mathrm{rec}}d\nu_{\hat{\mathbf m}}^{\mathrm{rec}}
=
d\nu_{\hat{\mathbf m}}^{\mathrm{rec}}.
$$

When the quotient has a phase coordinate $\theta_{\mathrm{rec}}\in[0,2\pi)$,

$$
d\nu_{\hat{\mathbf m}}^{\mathrm{rec}}
=
\rho_{\hat{\mathbf m}}^{\mathrm{rec}}(\theta_{\mathrm{rec}})
\,d\theta_{\mathrm{rec}},
\qquad
\int_0^{2\pi}
\rho_{\hat{\mathbf m}}^{\mathrm{rec}}(\theta)
\,d\theta
=1.
$$

The ideal uniform record row is the special case

$$
\rho_{\hat{\mathbf m}}^{\mathrm{rec}}(\theta)
=
\frac{1}{2\pi}.
$$

The record-cycle residual is

$$
\Delta_{\mathrm{rec}}^{\mathrm{SG}}
=
\left\|
T_{\hat{\mathbf m}*}^{\mathrm{rec}}
\nu_{\hat{\mathbf m}}^{\mathrm{rec}}
-
\nu_{\hat{\mathbf m}}^{\mathrm{rec}}
\right\|_{\mathrm{TV}}
+
\sup_{I\subset[0,2\pi)}
\left|
\int_I
\rho_{\hat{\mathbf m}}^{\mathrm{rec}}(\theta)
\,d\theta
-
\frac{|I|}{2\pi}
\right|
$$

when an ideal-uniform record phase is claimed. If a nonuniform record measure is retained, the second term is a calibration diagnostic rather than a failure by itself, but the half-angle residual cannot be claimed from the uniform chart.

## Plus/Reject Basin Residual

For a successful two-record Stern-Gerlach apparatus define

$$
\mathcal B_{+}^{\mathrm{SG}}(\hat{\mathbf m}),
\qquad
\mathcal B_{\mathrm{rej}}^{\mathrm{SG}}(\hat{\mathbf m})
$$

as the plus and reject record basins in $\Theta_{\hat{\mathbf m}}^{\mathrm{rec}}$ after pullback through $\Phi_{T_{\mathrm{int}}}^{\hat{\mathbf m}}$. The local kernels are

$$
K_{+}^{\mathrm{SG}}
=
G_{\mathrm{rec}}
H
\left(
\mathcal Q_{\hat{\mathbf m}}^{\mathrm{SG}}
\right),
\qquad
K_{\mathrm{rej}}^{\mathrm{SG}}
=
G_{\mathrm{rec}}
H
\left(
-\mathcal Q_{\hat{\mathbf m}}^{\mathrm{SG}}
\right),
$$

with the boundary convention $H(0)=0$. For a monotone plus-basin filtration

$$
\mathcal B_{+}^{\mathrm{SG}}(\rho;\hat{\mathbf m})
\subseteq
\Theta_{\hat{\mathbf m}}^{\mathrm{rec}},
\qquad
\rho\in[0,1],
$$

require

$$
\rho_1\le\rho_2
\Longrightarrow
\mathcal B_{+}^{\mathrm{SG}}(\rho_1;\hat{\mathbf m})
\subseteq
\mathcal B_{+}^{\mathrm{SG}}(\rho_2;\hat{\mathbf m})
$$

up to a $\nu_{\hat{\mathbf m}}^{\mathrm{rec}}$-null separatrix set, and define the threshold coordinate

$$
\eta_{\hat{\mathbf m}}^{\mathrm{SG}}(\zeta)
=
\inf
\left\{
\rho\in[0,1]:
\zeta\in
\mathcal B_{+}^{\mathrm{SG}}(\rho;\hat{\mathbf m})
\right\}.
$$

For an incoming preparation measure $\mu_C^{\mathrm{in}}$ on local ledgers, the plus/reject basin residual is

$$
\Delta_{+/\mathrm{rej}}^{\mathrm{SG}}
=
\int
\left|
K_{+}^{\mathrm{SG}}
+
K_{\mathrm{rej}}^{\mathrm{SG}}
-
G_{\mathrm{rec}}
\right|
d\mu_C^{\mathrm{in}}
d\nu_{\hat{\mathbf m}}^{\mathrm{rec}}
+
\mu_C^{\mathrm{in}}
\nu_{\hat{\mathbf m}}^{\mathrm{rec}}
\left(
\mathscr S_{\hat{\mathbf m}}^{\mathrm{SG}}
\right)
$$

$$
\qquad
+
\sup_{\rho\in[0,1]}
\left|
\nu_{\hat{\mathbf m}}^{\mathrm{rec}}
\left(
\mathcal B_{+}^{\mathrm{SG}}(\rho;\hat{\mathbf m})
\right)
-
\rho
\right|
+
\sup_{\rho_1\le\rho_2}
\nu_{\hat{\mathbf m}}^{\mathrm{rec}}
\left(
\mathcal B_{+}^{\mathrm{SG}}(\rho_1;\hat{\mathbf m})
\setminus
\mathcal B_{+}^{\mathrm{SG}}(\rho_2;\hat{\mathbf m})
\right).
$$

A local basin row passes only if

$$
\Delta_{+/\mathrm{rej}}^{\mathrm{SG}}
\le
\varepsilon_{\mathrm{basin}}.
$$

The single-core response probabilities are then

$$
P_{+}^{\mathrm{SG}}[\mu_C^{\mathrm{in}}]
=
\int
K_{+}^{\mathrm{SG}}
d\mu_C^{\mathrm{in}}
d\nu_{\hat{\mathbf m}}^{\mathrm{rec}},
\qquad
P_{\mathrm{rej}}^{\mathrm{SG}}[\mu_C^{\mathrm{in}}]
=
\int
K_{\mathrm{rej}}^{\mathrm{SG}}
d\mu_C^{\mathrm{in}}
d\nu_{\hat{\mathbf m}}^{\mathrm{rec}}.
$$

Only after spinor closure supplies $\psi(Z)$ and preparation measures $\mu_{\alpha}$ may this packet compare the substrate response with

$$
p_{+}(Z;\hat{\mathbf m})
=
\psi^\dagger(Z)
\Pi_{+}(\hat{\mathbf m})
\psi(Z),
\qquad
\Pi_{\pm}(\hat{\mathbf m})
=
\frac12
\left(
\mathbf 1
\pm
\hat{\mathbf m}\cdot\boldsymbol{\sigma}
\right).
$$

The half-angle residual is therefore only a blocked consumer row:

$$
\Delta_{\mathrm{half}}^{\mathrm{SG}}(\alpha)
=
\left|
P_{+}^{\mathrm{SG}}[\mu_{\alpha}]
-
\cos^2\!\left(\frac{\alpha}{2}\right)
\right|
+
\left|
P_{\mathrm{rej}}^{\mathrm{SG}}[\mu_{\alpha}]
-
\sin^2\!\left(\frac{\alpha}{2}\right)
\right|.
$$

It must not be marked `pass` unless $\mu_{\alpha}$, $\psi(Z)$, $\nu_{\hat{\mathbf m}}^{\mathrm{rec}}$, $\mathcal N_{\hat{\mathbf m}}^{\mathrm{SG}}$, and $\dot{\mathbf J}_{C}^{\mathrm{app}}$ have all been populated from the same accepted local apparatus model.

## Event Recoil/Wake Ledger Rows

For each successful event outcome

$$
o\in\{+,\mathrm{rej}\},
$$

the apparatus model must emit an event ledger

$$
\mathcal L_{\mathrm{event},o}^{\mathrm{SG}}
=
\left(
o,
W_{\mathrm{SG}},
B_C^-,
B_{C,o}^{+},
\mathfrak A_{\hat{\mathbf m}}^-,
\mathfrak A_{\hat{\mathbf m},o}^{+},
\Delta E_{C,o},
\Delta E_{A,o},
\Delta E_{\mathrm{wake},o},
\Delta E_{\mathrm{sea},o},
\Delta\mathbf p_{C,o},
\Delta\mathbf p_{A,o},
\Delta\mathbf p_{\mathrm{wake},o},
\Delta\mathbf p_{\mathrm{sea},o},
\Delta\mathbf J_{C,o},
\Delta\mathbf J_{A,o},
\Delta\mathbf L_{\mathrm{wake},o},
\Delta\mathbf J_{\mathrm{sea},o}
\right).
$$

The angular-momentum event residual is

$$
r_{\mathbf J,o}^{\mathrm{event}}
=
\frac{
\left\|
\Delta\mathbf J_{C,o}
+
\Delta\mathbf J_{A,o}
+
\Delta\mathbf L_{\mathrm{wake},o}
+
\Delta\mathbf J_{\mathrm{sea},o}
\right\|
}{\varepsilon_{\mathbf J}}.
$$

The energy and momentum residuals are

$$
r_{E,o}^{\mathrm{event}}
=
\frac{
\left|
\Delta E_{C,o}
+
\Delta E_{A,o}
+
\Delta E_{\mathrm{wake},o}
+
\Delta E_{\mathrm{sea},o}
\right|
}{\varepsilon_E},
$$

$$
r_{\mathbf p,o}^{\mathrm{event}}
=
\frac{
\left\|
\Delta\mathbf p_{C,o}
+
\Delta\mathbf p_{A,o}
+
\Delta\mathbf p_{\mathrm{wake},o}
+
\Delta\mathbf p_{\mathrm{sea},o}
\right\|
}{\varepsilon_{\mathbf p}}.
$$

The same-window event residual vector is

$$
\mathcal R_{\mathrm{event},o}^{\mathrm{SG}}
=
\left(
r_{\mathrm{rows}}^{\mathrm{app}},
r_{\mathbf J,o}^{\mathrm{event}},
r_{E,o}^{\mathrm{event}},
r_{\mathbf p,o}^{\mathrm{event}},
\frac{\Delta_{\mathrm{rec}}^{\mathrm{SG}}}{\varepsilon_{\mathrm{rec}}},
\frac{\Delta_{+/\mathrm{rej}}^{\mathrm{SG}}}{\varepsilon_{\mathrm{basin}}}
\right).
$$

The event row passes only when every finite component of $\mathcal R_{\mathrm{event},o}^{\mathrm{SG}}$ is $\le 1$ and no required row is missing. A candidate that accounts for the core deflection but omits apparatus recoil, wake angular momentum, Noether-Sea recoil, or record-cycle calibration is blocked or fails; it is not a substrate Stern-Gerlach response.

## Handoff To Pair Provenance And Bell

A populated local Stern-Gerlach row for wing $X$ has the form

$$
\mathcal H_{X,\hat{\mathbf m}_X}^{\mathrm{SG}}
=
\left(
\Pi_X^{\mathrm{ent}},
\mathcal J_{C_X}^{\mathrm{in}},
\mathcal A_{\hat{\mathbf m}_X}^{\mathrm{app}},
\dot{\mathbf J}_{C_X}^{\mathrm{app}},
\Sigma_{X,\hat{\mathbf m}_X}^{\mathrm{SG}},
\mathcal N_{X,\hat{\mathbf m}_X}^{\mathrm{SG}},
\nu_{X,\hat{\mathbf m}_X}^{\mathrm{rec}},
K_{X,+}^{\mathrm{SG}},
K_{X,\mathrm{rej}}^{\mathrm{SG}},
\mathcal R_{\mathrm{event},+}^{\mathrm{SG}},
\mathcal R_{\mathrm{event},\mathrm{rej}}^{\mathrm{SG}}
\right).
$$

This object is a local producer for [pair-provenance-source-model-packet.md](pair-provenance-source-model-packet.md), but only after it is populated for both wings from local data. The pair-provenance measure $\rho_{\mathrm{src}}$, measurement-independence residual, no-signaling residuals, product-screening audit, and Bell correlation residual remain blocked here.

In particular this packet does not assert

$$
\Delta_{\mathrm{Bell}}^{\mathrm{SG}}
=
\sup_{\theta_{AB}\in[0,\pi]}
\left|
E_{\mathrm{SG}}(\theta_{AB})
+
\cos\theta_{AB}
\right|
\le
\varepsilon_{\mathrm{Bell}}.
$$

That inequality is a later Bell-family test requiring a populated source measure and two populated local apparatus-response rows.

## Blocked Rows

| Row | Required object or residual | Current status | Exact blocker |
| --- | --- | --- | --- |
| Local incoming core ledger | $\mathcal J_C^{\mathrm{in}}$ | ready formula, blocked data | No accepted measured-core branch chart with retained active rows and local wake history for a concrete apparatus event. |
| Apparatus field/wake input | $\mathcal A_{\hat{\mathbf m}}^{\mathrm{app}}$ | ready formula, blocked data | No concrete calibrated Stern-Gerlach apparatus model has emitted field gradient, cross-root, wake, and record-gate rows. |
| Apparatus branch-sum impulse | $\dot{\mathbf J}_{C}^{\mathrm{app}}$ and $\Delta_{\mathrm{app}}$ | ready formula, blocked pass | Missing retained row weights, row-level accelerations, and apparatus wake-impulse term. |
| Full separatrix normal | $\Sigma_{\hat{\mathbf m}}^{\mathrm{SG}}$, $\mathcal N_{\hat{\mathbf m}}^{\mathrm{SG}}$ | ready formula, blocked pass | No substrate flow or separatrix has been computed from the apparatus model. |
| Record-cycle measure | $d\nu_{\hat{\mathbf m}}^{\mathrm{rec}}$, $\Delta_{\mathrm{rec}}^{\mathrm{SG}}$ | ready formula, blocked pass | No record-window quotient or invariant return measure has been emitted. |
| Plus/reject basin | $\Delta_{+/\mathrm{rej}}^{\mathrm{SG}}$ | ready formula, blocked pass | No plus/reject basin filtration or null-boundary certificate exists. |
| Event recoil/wake ledger | $\mathcal R_{\mathrm{event},o}^{\mathrm{SG}}$ | ready formula, blocked pass | No same-window event ledgers for core, apparatus, wake, and Noether-Sea recoil. |
| Effective spinor coordinate | $\psi(Z)$, $p_+(Z;\hat{\mathbf m})$ | not supplied | Ordered Noether swarm spinor closure is still pending. |
| Half-angle residual | $\Delta_{\mathrm{half}}^{\mathrm{SG}}(\alpha)$ | consumer formula, blocked pass | Needs $\psi(Z)$, $\mu_\alpha$, record measure, basin rows, and branch-sum impulse from the same substrate model. |
| Pair provenance | $\rho_{\mathrm{src}}$, $\Pi_{AB}^{\mathrm{sing}}$ | not supplied | Source-event and daughter-ledger rows belong to the pair-provenance packet. |
| Bell success | $\Delta_{\mathrm{Bell}}^{\mathrm{SG}}$ | not claimed | Requires populated source measure, two local response rows, measurement independence, no-signaling, and product-screening audit. |

## Direct Use

This packet is the next producer contract for `measurement_response`: instead of assuming an ideal Stern-Gerlach threshold, populate $\mathcal J_C^{\mathrm{in}}$, $\mathcal A_{\hat{\mathbf m}}^{\mathrm{app}}$, $\dot{\mathbf J}_{C}^{\mathrm{app}}$, $\mathcal N_{\hat{\mathbf m}}^{\mathrm{SG}}$, $d\nu_{\hat{\mathbf m}}^{\mathrm{rec}}$, $\Delta_{+/\mathrm{rej}}^{\mathrm{SG}}$, and $\mathcal R_{\mathrm{event},o}^{\mathrm{SG}}$ from one local apparatus model.

Promotion decision. This artifact is priority-only now, with defer-with-blocker status for reader-facing promotion. The likely corpus promotion target is a future measurement-response subsection after a concrete apparatus model populates the branch-sum impulse, record-cycle measure, separatrix normal, plus/reject basin residual, and event recoil/wake rows. Until then, the safe use is as a blocker-preserving proof packet and residual contract, not as a Stern-Gerlach theorem or Bell-success claim.
