# Tail-Root Assimilation Theorem

Promotion status: `priority-only`. This packet complements [tail-interval-root-exclusion-certificate.md](tail-interval-root-exclusion-certificate.md) and [unresolved-tail-force-error-bound.md](unresolved-tail-force-error-bound.md). Tail roots are not automatically a branch failure. If they can be bracketed, isolated, counted, and action-ledgered on the same source-pair policy, they can be assimilated into a deeper support-complete ledger.

The theorem is local to one exact-antipodal arclength-inverse chart, one memory convention, one source-pair policy, one collocation grid, and one action convention.

---

## 1. Tail Assimilation Problem

For receiver $i$, source $j$, and node $\lambda_n$, write

$$
G_{ij,n}(\eta;\alpha)
=
\|\mathbf{Y}_i(\lambda_n;\alpha)
-
\mathbf{Y}_j(\lambda_n-\eta;\alpha)\|
-
\eta.
$$

Let $\Pi$ denote the declared source-pair policy: it fixes which ordered source rows are required and how root multiplicity labels $\mu$ are recorded. Suppose the current active ledger is complete up to $\eta_{\mathrm{mem}}$ for $\Pi$ but not support-complete because

$$
\eta_{\mathrm{mem}}<2r_{\max}+m_\eta.
$$

Let the unresolved support tail be

$$
T_{ij,n}
=
(\eta_{\mathrm{mem}},\,\eta_{\mathrm{sup}}],
\qquad
\eta_{\mathrm{sup}}=2r_{\max}+m_\eta.
$$

The exclusion route proves $G_{ij,n}\ne0$ on this interval. The assimilation route instead proves that every zero in $T_{ij,n}$ allowed by $\Pi$ is bracketed, isolated, closed under the exact-antipodal involution when the chart requires it, and included in a new ledger. Assimilation cannot add a new ordered source row that the policy excluded; that would be a source-pair policy change, not a deeper same-policy ledger.

---

## 2. Tail Root Cover

Cover each tail interval by finitely many slabs

$$
Q_q=(a_q,b_q).
$$

Each slab must be assigned exactly one of two statuses:

| Slab status | Required certificate |
| --- | --- |
| `tail-slab-empty` | one of the distance, monotone-endpoint, or Lipschitz point exclusion tests passes |
| `tail-root-bracketed` | there is a bracket $(\eta_q^-,\eta_q^+)\subset Q_q$ with $G(\eta_q^-)G(\eta_q^+)<0$, a Jacobian interval satisfying $|J|\ge J_q>0$, and positive excluded-gap margins on $Q_q\setminus(\eta_q^-,\eta_q^+)$ |

The bracketed slab then contains exactly one tail root. The proof is the intermediate value theorem plus monotonicity from the Jacobian floor. If the slab contains multiple sign changes, it must be subdivided until each bracketed subslab contains one root and each remaining subslab is empty.

For a node and ordered pair, define the assimilated tail set

$$
\mathcal{U}_{ij,n}^{\mathrm{tail}}
=
\left\{
\eta_q:
Q_q\ \text{has status }\texttt{tail-root-bracketed}
\right\}.
$$

Equivalently, let $I_a$ be the isolating intervals for the old active roots and let $I_u$ be the isolating intervals for the assimilated tail roots. The complement

$$
E_{ij,n}^{+}
=
(0,\eta_{\mathrm{sup}}]
\setminus
\bigcup_{a\in\mathcal{A}_{\eta_{\mathrm{mem}},ij,n}}I_a
\setminus
\bigcup_{u\in\mathcal{U}_{ij,n}^{\mathrm{tail}}}I_u
$$

must be root-free:

$$
\inf_{\eta\in E_{ij,n}^{+}}
|G_{ij,n}(\eta;\alpha)|
>
\epsilon_G.
$$

The new and old brackets must also remain separated:

$$
m_{\mathrm{sep}}^{+}
=
\min_{a\ne b}
\operatorname{dist}(I_a^{+},I_b^{+})
>
0,
$$

where $I_a^{+}$ ranges over all active and assimilated brackets.

The extended active ledger is

$$
\mathcal{A}_{\eta}^{+}
=
\mathcal{A}_{\eta_{\mathrm{mem}}}
\cup
\mathcal{U}^{\mathrm{tail}}.
$$

This union is valid only when every source pair required by the policy is treated with the same cover rule and every excluded subslab has a positive gap margin.

If exact antipodality is imposed, the tail set must be closed under the antipodal pairing map. Failure of this closure has status `tail-antipodal-closure-failed` rather than `tail-roots-assimilated`.

---

## 3. Force Update

For a tail root $u\in\mathcal{U}_{i,n}^{\mathrm{tail}}$, define

$$
\mathbf{R}_u
=
\mathbf{Y}_i(\lambda_n)
-
\mathbf{Y}_{j(u)}(\lambda_n-\eta_u),
\qquad
\widehat{\mathbf{R}}_u
=
\frac{\mathbf{R}_u}{\eta_u},
$$

and

$$
\mathbf{f}_u
=
\frac{\sigma_i\sigma_{j(u)}}{\eta_u^2|J_u|}
\widehat{\mathbf{R}}_u.
$$

The assimilated tail force is

$$
\Delta\widetilde{\mathbf{F}}_{i,n}^{\mathrm{tail}}
=
\sum_{u\in\mathcal{U}_{i,n}^{\mathrm{tail}}}
\mathbf{f}_u.
$$

The extended force row is

$$
\widetilde{\mathbf{F}}_{i,n}^{+}
=
\widetilde{\mathbf{F}}_{i,n}^{\mathrm{act}}
+
\Delta\widetilde{\mathbf{F}}_{i,n}^{\mathrm{tail}}.
$$

If every tail root has

$$
\eta_u\ge\eta_0,
\qquad
|J_u|\ge J_{\mathrm{tail}}>0,
$$

and there are at most $N_{i,n}^{\mathrm{tail}}$ tail roots for receiver $i$ at node $n$, then

$$
\left\|
\Delta\widetilde{\mathbf{F}}_{i,n}^{\mathrm{tail}}
\right\|
\le
\frac{N_{i,n}^{\mathrm{tail}}}{\eta_0^2J_{\mathrm{tail}}}.
$$

This is no longer an omitted-force error when the roots are assimilated; it is a computed force contribution with a verification envelope.

---

## 4. Curvature And $\Gamma$ Update

Let

$$
A=P^\perp\widetilde{\mathbf{F}}^{\mathrm{act}},
\qquad
B=P^\perp\Delta\widetilde{\mathbf{F}}^{\mathrm{tail}},
\qquad
A^+=A+B.
$$

The fitted curvature coefficient must be recomputed as

$$
\Gamma_K^+
=
\frac{\langle \mathbf{K},A^+\rangle}{\langle A^+,A^+\rangle},
$$

and the updated intrinsic residual is

$$
\mathcal{R}_{K}^{+}
=
\mathbf{K}
-
\Gamma_K^+A^+.
$$

The old active-window residual is not a retained residual after tail roots are found. The exact update identity is

$$
\mathcal{R}_{K}^{+}
=
\mathcal{R}_{K}^{\mathrm{act}}
-
\Gamma_K^{\mathrm{act}}B
-
(\Gamma_K^+-\Gamma_K^{\mathrm{act}})A^+.
$$

Writing

$$
\delta\Gamma
=
\Gamma_K^+-\Gamma_K^{\mathrm{act}},
$$

the exact fitted-scale update is

$$
\delta\Gamma
=
\frac{
\langle \mathbf{K},B\rangle
-
\Gamma_K^{\mathrm{act}}
\left(
2\langle A,B\rangle+\|B\|^2
\right)
}{
\|A+B\|^2
}.
$$

If

$$
\|B\|\le\delta,
\qquad
\delta<\|A\|,
$$

then the fitted-scale perturbation obeys

$$
|\Gamma_K^+-\Gamma_K^{\mathrm{act}}|
\le
\|\mathbf{K}\|\,
\frac{\delta(3\|A\|+\delta)}
{\|A\|(\|A\|-\delta)^2}.
$$

This bound is a verification envelope. Branch retention still requires the actual recomputed $\Gamma_K^+$, action-derived $\Gamma_B^+$, and curl row on $\mathcal{A}_{\eta}^{+}$.

---

## 5. Action-Ledger Assimilation

The action ledger must be extended with the same roots:

$$
\mathcal{L}_{\Gamma}^{+}
=
\left(
\eta_{\mathrm{mem}}^{+},
\mathcal{A}_{\eta}^{+},
\mathcal{H}_{\eta}^{+},
\mathcal{S}_{B,\eta}^{+},
\Gamma_K^+,
\Gamma_B^+,
\mathcal{C}^{+}
\right).
$$

The new memory depth must satisfy

$$
\eta_{\mathrm{mem}}^{+}
\ge
\max\{\eta_u:u\in\mathcal{U}^{\mathrm{tail}}\}
+
m_{\eta},
$$

and support completeness requires either

$$
\eta_{\mathrm{mem}}^{+}
\ge
2r_{\max}+m_\eta,
$$

or an exclusion cover for the remaining interval beyond the last assimilated root.

The virtual-work row becomes

$$
\delta\mathcal{S}_{\mathrm{hist}}^\perp
\left[
\mathcal{A}_{\eta}^{+}
\right]
=
\frac{R_*E_\epsilon(R_*)}{c_f}
\int
\sum_i
P_i^\perp
\widetilde{\mathbf{F}}_i^{+}
\cdot
\delta\mathbf{Y}_i^\perp
d\lambda.
$$

The curl test must also be recomputed:

$$
\frac{\|\mathcal{C}^{+}\|_{\mathrm{F}}}{1+\|W^{+}\|_{\mathrm{F}}}
\le
\epsilon_{\mathrm{curl}}.
$$

Equivalently, for coefficient coordinates $p$, the work one-form changes by

$$
W_p^{+}
=
W_p
+
\int
\sum_i
P_i^\perp
\Delta\widetilde{\mathbf{F}}_i^{\mathrm{tail}}
\cdot
\partial_p\mathbf{Y}_i^\perp
d\lambda,
$$

with root sensitivities included through [arclength-inverse-variation-formulas.md](arclength-inverse-variation-formulas.md). The old curl row cannot be inherited after assimilation.

If this row is not recomputed, the correct status is

$$
\texttt{tail-roots-found-action-rerun-required}.
$$

---

## 6. Assimilation Theorem Target

**Theorem target.** Fix a coefficient vector $\alpha$, a source-pair policy $\Pi$, and a support tail ending at $\eta_{\mathrm{sup}}\le2r_{\max}+m_\eta$. Suppose every required ordered pair and collocation node has a finite slab cover of the tail, and every slab is certified either empty or one-root bracketed with positive Jacobian and excluded-gap margins. Suppose the union of old and new root brackets has $m_{\mathrm{sep}}^{+}>0$, the complement $E_{ij,n}^{+}$ is root-free for every required ordered pair and node, the assimilated tail set is closed under exact-antipodal pairing when that chart is imposed, and all assimilated roots preserve the noncollision floor, construction-speed floor, and equal-period constraint qualification.

Then the extended ledger $\mathcal{A}_{\eta}^{+}$ is finite, root-isolated, and source-pair complete through $\eta_{\mathrm{sup}}$. The force row computed from $\mathcal{A}_{\eta}^{+}$ has no unresolved omitted-force tail on that support interval. The old active-window dynamics residual is replaced by

$$
\mathcal{F}_{\eta}^{+}
=
\left(
\mathcal{R}_{\mathrm{tan}}^{+},
\mathcal{R}_{K}^{+}
\right),
$$

and every Newton, cokernel, refinement, $\Gamma$, curl, event, and stability certificate must be evaluated against $\mathcal{F}_{\eta}^{+}$ and the extended action ledger.

If the extended residual and action rows pass the support-complete successor certificate, the continuation remains a live exact-antipodal $M=3$ dynamics candidate. If the extended rows fail only by proof-budget inequalities, the status is `descent-without-closure`. If the extended support-complete cokernel lower bound passes, the status is `exact-antipodal-obstructed`.

---

## 7. Status Codes

Use these statuses for tail assimilation:

$$
\texttt{tail-roots-found-rerun-required},
\qquad
\texttt{tail-roots-assimilated},
\qquad
\texttt{tail-assimilated-support-complete-memory},
$$

$$
\texttt{tail-assimilated-active-only},
\qquad
\texttt{tail-root-policy-mismatch},
\qquad
\texttt{tail-antipodal-closure-failed},
$$

$$
\texttt{tail-root-count-open},
\qquad
\texttt{tail-root-jacobian-open},
\qquad
\texttt{tail-root-gap-open},
$$

$$
\texttt{tail-roots-found-action-rerun-required},
\qquad
\texttt{extended-ledger-descent-lost},
\qquad
\texttt{extended-ledger-descent-survives}.
$$

For the current $M=3$ frontier, this theorem gives the exact alternative to tail exclusion: search $(4.5,5.5211575250]$, bracket every actual tail root, and rerun force, $\Gamma$, curl, action, cokernel, and refinement on the extended ledger.
