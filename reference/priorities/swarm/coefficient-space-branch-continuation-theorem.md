# Coefficient-Space Branch Continuation Theorem

Promotion status: `priority-only`. This packet turns the support-complete $M=3$ certificate stack into a continuation theorem. It describes how a certified exact-antipodal arclength-inverse dynamics candidate would be followed as a smooth branch in coefficient space, and how first events are detected without confusing proof-budget failure with branch failure.

The theorem is local to one exact-antipodal $M=3$ chart, one equal-period/gauge convention, one support-complete root ledger, one source-pair policy, one memory convention, one action convention, and one weighted residual norm.

---

## 1. Continuation Variables

Let $u\in\mathbb{R}^{n}$ be the reduced exact-antipodal $M=3$ coefficient vector after equal-period tangent coordinates and gauge removal. Let $\chi$ collect scalar ledger variables that must be recomputed with the same root convention:

$$
\chi
=
\left(
\eta_{\mathrm{mem}},
\Gamma_B,
\Gamma_K,
R_*,
\ell
\right),
$$

where $\ell$ denotes any remaining scalar support, normalization, or pseudo-arclength control variable used by the solver. The full continuation state is

$$
z=(u,\chi).
$$

The exact-antipodal chart imposes

$$
\mathbf{Z}_{a,-}(\theta;\alpha)
=
-
\mathbf{Z}_{a,+}(\theta;\alpha),
\qquad
a=1,2,3,
$$

and the physical curves $\mathbf{Y}_i(\lambda;\alpha)$ are the inverse-arclength representatives of these construction curves.

On a fixed support-complete root stratum, define the certified residual map

$$
\mathcal{G}(z)
=
\left(
\mathcal{F}_{\eta}^{(3)}(u),
\mathcal{R}_{\Gamma}(z),
\mathcal{R}_{\mathrm{curl}}(z),
\mathcal{R}_{\mathrm{action}}(z),
\mathcal{R}_{\mathrm{tail}}(z),
\mathcal{R}_{\mathrm{ep}}(z),
\mathcal{R}_{\mathrm{gauge}}(z)
\right),
$$

where

$$
\mathcal{F}_{\eta}^{(3)}
=
\left(
\mathcal{R}_{\mathrm{tan}}^{(\eta)},
\mathcal{R}_{K}^{(\eta)}
\right).
$$

For a support-complete action-derived branch, the curvature row uses the action coefficient:

$$
\mathcal{R}_{K}^{(\eta)}
=
\mathbf{K}
-
\Gamma_B P^\perp\widetilde{\mathbf{F}}^{(\eta)}.
$$

The fitted coefficient $\Gamma_K$ remains in $\mathcal{R}_{\Gamma}$ as a diagnostic compatibility row, not as the final branch scale.

The rows mean:

| Row | Role |
| --- | --- |
| $\mathcal{F}_{\eta}^{(3)}$ | support-complete tangential and curvature dynamics |
| $\mathcal{R}_{\Gamma}$ | fitted/action scale compatibility |
| $\mathcal{R}_{\mathrm{curl}}$ | finite-mode virtual-work exactness |
| $\mathcal{R}_{\mathrm{action}}$ | same-ledger action/inertia row deriving $\Gamma_B$ |
| $\mathcal{R}_{\mathrm{tail}}$ | tail exclusion or tail assimilation completeness |
| $\mathcal{R}_{\mathrm{ep}}$ | equal-period constraint residual if not already eliminated |
| $\mathcal{R}_{\mathrm{gauge}}$ | center, phase, scale, and coefficient gauge residuals if not already eliminated |

When equal-period and gauges are eliminated by coordinates, the last two rows are omitted from $\mathcal{G}$ and instead appear as chart hypotheses.

---

## 2. Branch Rank Condition

A zero $z_0$ is a regular one-parameter branch point when

$$
\mathcal{G}(z_0)=0
$$

and

$$
\dim\ker D\mathcal{G}(z_0)=1,
\qquad
\operatorname{ran}D\mathcal{G}(z_0)
\ \text{is closed over the certified finite-mode norm}.
$$

In finite dimensions this is the singular-value condition

$$
\sigma_1\ge\cdots\ge\sigma_{m-1}>\epsilon_{\mathrm{br}},
\qquad
\sigma_m\le\epsilon_{\mathrm{null}},
$$

for the derivative after row weighting and coordinate elimination, with exactly one certified tangent null direction.

Let $\tau_0$ be the normalized tangent:

$$
D\mathcal{G}(z_0)\tau_0=0,
\qquad
\|\tau_0\|=1.
$$

A transverse pseudo-arclength hyperplane is any linear functional $\ell_0$ satisfying

$$
\ell_0(\tau_0)\ne0.
$$

The standard choice is

$$
\ell_0(\delta z)=\langle \tau_0,\delta z\rangle.
$$

---

## 3. Pseudo-Arclength Corrector

Given step size $\Delta s$, predict

$$
z_{\mathrm{pred}}
=
z_0+\Delta s\,\tau_0.
$$

The corrected point solves the augmented system

$$
\mathcal{H}(z)
=
\left(
\mathcal{G}(z),
\langle \tau_0,z-z_{\mathrm{pred}}\rangle
\right)
=0.
$$

The corrector derivative is

$$
D\mathcal{H}(z_0)
=
\begin{bmatrix}
D\mathcal{G}(z_0)\\
\tau_0^T
\end{bmatrix}.
$$

If

$$
\sigma_{\min}(D\mathcal{H}(z_0))>\epsilon_{\mathrm{pc}},
$$

and the delayed-force Lipschitz envelope bounds the derivative variation on the step ball, then the Newton/Krawczyk rows from [support-complete-newton-closure-certificate.md](support-complete-newton-closure-certificate.md) certify a unique corrected point on the same support-complete root stratum.

The next tangent is computed by

$$
D\mathcal{G}(z_1)\tau_1=0,
\qquad
\|\tau_1\|=1,
\qquad
\langle\tau_1,\tau_0\rangle>0.
$$

This orientation condition prevents artificial branch reversal.

---

## 4. Event Functions

Continuation is valid only while every event margin remains positive. Define the event vector

$$
\mathcal{E}_{\mathrm{evt}}(z)
=
\left(
m_{\mathrm{act}},
m_{\mathrm{sup/tail}},
J_{\min}-\epsilon_J,
d_{\min}-\epsilon_x,
m_{\mathrm{sep}},
s_{\min}-s_0,
\sigma_{\min}(D\mathbf{L})-\epsilon_L,
m_{\mathrm{band}},
\epsilon_{\mathrm{curl}}-\kappa_{\mathrm{curl}},
\tau_{\Gamma}-\kappa_{\Gamma}
\right).
$$

Here:

| Margin | Meaning |
| --- | --- |
| $m_{\mathrm{act}}$ | active roots remain inside the declared memory depth |
| $m_{\mathrm{sup/tail}}$ | support-bound, tail-exclusion, or tail-assimilation completeness remains positive |
| $J_{\min}-\epsilon_J$ | root Jacobian floor |
| $d_{\min}-\epsilon_x$ | Euclidean noncollision floor |
| $m_{\mathrm{sep}}$ | old and new root brackets remain separated |
| $s_{\min}-s_0$ | inverse arclength chart remains regular |
| $\sigma_{\min}(D\mathbf{L})-\epsilon_L$ | equal-period constraint qualification remains regular |
| $m_{\mathrm{band}}$ | support-band chart remains valid |
| $\epsilon_{\mathrm{curl}}-\kappa_{\mathrm{curl}}$ | finite-mode curl tolerance margin |
| $\tau_{\Gamma}-\kappa_{\Gamma}$ | fitted/action $\Gamma$ compatibility margin |

The first event parameter is

$$
s_*
=
\inf
\left\{
s>s_0:
\min_k\mathcal{E}_{\mathrm{evt},k}(z(s))=0
\right\}.
$$

When a single margin vanishes at $s_*$ with nonzero derivative, the event class is assigned by [branch-event-classification-theorem.md](branch-event-classification-theorem.md), and its local reset rule is supplied by [branch-event-normal-forms.md](branch-event-normal-forms.md). When multiple margins vanish together, the point is a multi-event boundary and must be rescreened before assigning a branch meaning.

---

## 5. Root-Ledger Stability Along The Branch

On any interval where the root brackets, excluded-gap margins, Jacobian floor, noncollision floor, support completeness row, and memory margin remain positive, the active-root ledger is stable. Each root delay satisfies the branch-direction law

$$
\dot\eta_a
=
\frac{
\widehat{\mathbf{R}}_a\cdot
\left(
\dot{\mathbf{Y}}_{i(a)}(\lambda)
-
\dot{\mathbf{Y}}_{j(a)}(\lambda-\eta_a)
\right)
}{J_a}.
$$

Here the dot means differentiation along the coefficient-space branch. If the continuation changes $\eta_{\mathrm{mem}}$, tail status, or source-pair policy, then the force, fitted $\Gamma_K$, action-derived $\Gamma_B$, curl, and event rows must be recomputed on the new ledger before the branch can continue.

---

## 6. Proof-Budget Stall Versus Branch Event

Let $B_\rho(z)$ be the certified corrector ball and let $\rho_{\mathrm{chart}}$ be the smallest chart radius allowed by root, support, tail, noncollision, speed, and action margins. The continuation step is a proof-budget stall if:

$$
\rho<\rho_{\mathrm{chart}},
$$

all event margins remain positive on $B_\rho(z)$, but the sufficient Krawczyk or Kantorovich inequalities fail:

$$
Y+Z\rho\ge\rho
\quad\text{or}\quad
Z\ge1.
$$

It is a true branch event only if some event margin reaches zero or a support-complete cokernel obstruction is certified. In particular,

$$
\texttt{newton-krawczyk-proof-budget-open}
$$

does not imply

$$
\texttt{exact-antipodal-obstructed}.
$$

The obstruction status requires the lower bound

$$
\left\|
P_{\mathrm{cok}}\mathcal{F}_{\eta}^{(3)}(z)
\right\|
>
\epsilon_{\mathrm{nl}}
+
\epsilon_{\mathcal{F}}^{\mathrm{tail}}
+
\epsilon_{\mathrm{disc}}
+
\tau_{\mathrm{dyn}}.
$$

---

## 7. Return-Map And Stability Hook

After dynamics and action closure, the coefficient continuation feeds the root-ledger Floquet row through

$$
z
\mapsto
(\mathbf{Z}_{a,\pm})
\mapsto
(\mathbf{Y}_i,\theta_i)
\mapsto
\mathcal{A}_{\eta}
\mapsto
(\widetilde{\mathbf{F}},\mathbf{K},P^\perp)
\mapsto
(\mathcal{G},\mathcal{E}_{\mathrm{evt}})
\mapsto
(P_B,M_B).
$$

Here $P_B$ is the root-ledger-preserving return map and

$$
M_B
=
\Pi_{\mathrm{ng}}\Phi_B(L)\Pi_{\Sigma}.
$$

The local stable-branch row requires the declared gauge-neutral multipliers plus either

$$
\max_{\mu\in\operatorname{spec}_{\perp}(M_B)}
|\mu|
\le
1-\epsilon_{\mathrm{stab}},
$$

or the corresponding NHIM domination row from [root-ledger-floquet-stability-certificate.md](root-ledger-floquet-stability-certificate.md).

---

## 8. Continuation Theorem Target

**Theorem target.** Suppose $z_0$ is a support-complete exact-antipodal $M=3$ dynamics/action zero with a one-dimensional regular tangent kernel, positive event margins, a delayed-force Lipschitz envelope, and a collocation refinement certificate. Then there exists a local smooth curve

$$
z:(-\epsilon,\epsilon)\to\mathbb{R}^{n+\dim\chi}
$$

such that

$$
z(0)=z_0,
\qquad
\mathcal{G}(z(s))=0,
\qquad
\dot z(0)=\tau_0.
$$

The curve can be followed by pseudo-arclength correctors as long as the augmented derivative $D\mathcal{H}$ remains nonsingular and all event margins remain positive. The first simple failure is classified by the event theorem. A failed corrector bound with all event margins positive is only a proof-budget stall. If all event margins remain positive but $D\mathcal{G}$ develops one additional certified kernel direction beyond the branch tangent, the branch-switching alternatives are classified by [branch-switching-bifurcation-theorem.md](branch-switching-bifurcation-theorem.md).

The proof is the implicit function theorem on the augmented pseudo-arclength system, plus the root/Jacobian barrier lemma for smooth root labels, the tail exclusion or tail assimilation theorem for support completeness, and the delayed-force Lipschitz envelope for Newton/Krawczyk verification.

The derivative entries used by $D\mathcal{G}$, by event prediction, and by the Floquet linearization are supplied by [branch-tangent-sensitivity-equations.md](branch-tangent-sensitivity-equations.md).

---

## 9. Current Status

No current $M=3$ row satisfies the hypotheses of this continuation theorem because no support-complete dynamics/action zero has been certified. The theorem nevertheless fixes the next mathematical target:

1. produce one support-complete successor certificate;
2. compute the regular tangent kernel of the full dynamics/action map;
3. follow the branch by pseudo-arclength continuation until the first classified event.

Until step 1 is achieved, the present continuation data remain residual-descent screens rather than a certified branch curve.
