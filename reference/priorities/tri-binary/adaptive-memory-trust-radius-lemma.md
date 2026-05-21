# Adaptive Memory Trust-Radius Lemma

Promotion status: `priority-only`. This packet converts the root-front and support-tail observations in [adaptive-root-front-dynamics.md](adaptive-root-front-dynamics.md) into explicit trust-radius inequalities for exact-antipodal continuation. It is a solver guard and proof route. It does not retain a branch.

The purpose is to make the next continuation radius a certified mathematical object rather than a guessed clipping parameter. A step is acceptable only if the same causal-root chart, finite-memory convention, and force/action ledger remain valid after the step.

---

## 1. Continuation Data

Let $\alpha(\rho)$ be a coefficient path in an arclength-inverse chart. For a retained delayed-root label

$$
a=(i,j,n,\mu),
$$

write the root equation as

$$
G_a(\eta;\alpha(\rho))=0,
$$

with root $\eta_a(\rho)$ and Jacobian

$$
J_a(\rho)
=
1-\mathbf{T}_{j(a)}(\lambda_n-\eta_a;\alpha(\rho))
\cdot
\widehat{\mathbf{R}}_a(\rho).
$$

Let the active delay front and support bound be

$$
\eta_{\mathrm{act}}(\rho)
=
\max_{a\in\mathcal{A}_\rho}\eta_a(\rho),
\qquad
B_{\mathrm{sup}}(\rho)=2r_{\max}(\rho).
$$

For a declared memory depth $\eta_{\mathrm{mem}}$, define the active-window margin and support-complete margin

$$
m_{\mathrm{act}}(\rho)
=
\eta_{\mathrm{mem}}-\eta_{\mathrm{act}}(\rho),
\qquad
m_{\mathrm{sup}}(\rho)
=
\eta_{\mathrm{mem}}-B_{\mathrm{sup}}(\rho)-m_\eta.
$$

The active-window row is open when $m_{\mathrm{act}}>0$. The support-complete row is open only when either $m_{\mathrm{sup}}\ge0$ or the tail interval

$$
(\eta_{\mathrm{mem}},\,B_{\mathrm{sup}}+m_\eta]
$$

is certified root-free by [tail-interval-root-exclusion-certificate.md](tail-interval-root-exclusion-certificate.md).

---

## 2. Root-Front Bound

On a smooth root branch with $|J_a|\ge J_0>0$, implicit differentiation gives

$$
\dot{\eta}_a
=
\frac{
\widehat{\mathbf{R}}_a\cdot
\left[
\dot{\mathbf{Y}}_{i(a)}(\lambda_n)
-
\dot{\mathbf{Y}}_{j(a)}(\lambda_n-\eta_a)
\right]
}{J_a}.
$$

Suppose a trial interval $\rho\in[\rho_0,\rho_0+\Delta\rho]$ has computable bounds

$$
|\dot{\eta}_a|\le V_{\eta,a},
\qquad
|\ddot{\eta}_a|\le A_{\eta,a}.
$$

Set

$$
V_\eta=\max_a V_{\eta,a},
\qquad
A_\eta=\max_a A_{\eta,a}.
$$

Then every retained active root obeys

$$
\eta_a(\rho_0+\Delta\rho)
\le
\eta_a(\rho_0)
+
V_\eta\Delta\rho
+
\frac{1}{2}A_\eta(\Delta\rho)^2.
$$

Therefore the active-window labels cannot cross the memory boundary if

$$
V_\eta\Delta\rho
+
\frac{1}{2}A_\eta(\Delta\rho)^2
<
m_{\mathrm{act}}(\rho_0)-\epsilon_\eta.
$$

This inequality is the root-front trust radius. If $A_\eta=0$, it reduces to

$$
\Delta\rho
<
\frac{m_{\mathrm{act}}(\rho_0)-\epsilon_\eta}{V_\eta}.
$$

If $A_\eta>0$, the explicit safe radius is

$$
\Delta\rho
<
\frac{
-V_\eta+
\sqrt{
V_\eta^2+2A_\eta\left(m_{\mathrm{act}}(\rho_0)-\epsilon_\eta\right)
}
}{A_\eta}.
$$

This row protects only the already-emitted active labels. It does not prove that no additional roots exist in the tail.

---

## 3. Support-Memory Bound

Suppose the support radius has bounds

$$
|\dot{B}_{\mathrm{sup}}|\le V_B,
\qquad
|\ddot{B}_{\mathrm{sup}}|\le A_B
$$

on the same trial interval. Then

$$
B_{\mathrm{sup}}(\rho_0+\Delta\rho)
\le
B_{\mathrm{sup}}(\rho_0)
+
V_B\Delta\rho
+
\frac{1}{2}A_B(\Delta\rho)^2.
$$

If no tail-exclusion certificate is supplied, support-complete memory persists only if

$$
V_B\Delta\rho
+
\frac{1}{2}A_B(\Delta\rho)^2
\le
m_{\mathrm{sup}}(\rho_0).
$$

If $m_{\mathrm{sup}}(\rho_0)<0$, no positive radius is support-complete under the declared $\eta_{\mathrm{mem}}$. The solver may still emit an active-window dynamics screen, but a retained row must either enlarge $\eta_{\mathrm{mem}}$ or certify the tail root-free.

---

## 4. Tail-Certificate Persistence

For a tail slab $Q_q$, let $\delta_q$ denote its certificate margin. The margin depends on the certificate type:

| Certificate type | Margin $\delta_q$ |
| --- | --- |
| distance-exclusion low side | $a_q-\epsilon_G-D_q^+$ |
| distance-exclusion high side | $D_q^- - b_q-\epsilon_G$ |
| monotone positive endpoints | $\min\{J_q^- -\epsilon_J,\ G(a_q)-\epsilon_G,\ G(b_q)-\epsilon_G\}$ |
| monotone negative endpoints | $\min\{J_q^- -\epsilon_J,\ -G(a_q)-\epsilon_G,\ -G(b_q)-\epsilon_G\}$ when $J_q^- > \epsilon_J$ |
| monotone reversed endpoints | $\min\{-J_q^+ -\epsilon_J,\ \lvert G(a_q)\rvert-\epsilon_G,\ \lvert G(b_q)\rvert-\epsilon_G\}$ when $J_q^+ < -\epsilon_J$ |
| Lipschitz point | $\lvert G(c_q)\rvert-L_q\Delta_q-\epsilon_G$ |

Only positive $\delta_q$ values are certificates. Suppose each margin varies along the trial interval with

$$
|\dot{\delta}_q|\le V_{\delta,q},
\qquad
|\ddot{\delta}_q|\le A_{\delta,q}.
$$

Let

$$
\delta_{\mathrm{tail}}=\min_q\delta_q,
\qquad
V_\delta=\max_qV_{\delta,q},
\qquad
A_\delta=\max_qA_{\delta,q}.
$$

The tail certificate persists if

$$
V_\delta\Delta\rho
+
\frac{1}{2}A_\delta(\Delta\rho)^2
<
\delta_{\mathrm{tail}}.
$$

This converts the tail certificate from a pointwise check into a continuation guard. If the inequality fails, the step is not rejected as physics; the solver must reslab the tail and reprove root absence.

---

## 5. Combined Trust Lemma

**Lemma target: adaptive-memory trust radius.** Fix an exact-antipodal arclength-inverse chart, a source-pair policy, and a base radius $\rho_0$ with active root ledger $\mathcal{A}_{\rho_0}$. Suppose:

1. active root brackets have positive endpoint, gap, and Jacobian margins as in [root-jacobian-barrier-lemma.md](root-jacobian-barrier-lemma.md);
2. the root-front velocity and acceleration bounds $V_\eta,A_\eta$ are finite on the trial interval;
3. either the support-complete margin $m_{\mathrm{sup}}(\rho_0)$ is nonnegative with support-growth bounds $V_B,A_B$, or the tail slabs have positive certificate margin $\delta_{\mathrm{tail}}$ with variation bounds $V_\delta,A_\delta$;
4. noncollision and pair status floors remain positive under their existing perturbation bounds;
5. the force, $\Gamma_K$, action, variationality, and event rows are recomputed on the same resulting root ledger.

Then any step satisfying all relevant inequalities

$$
V_\eta\Delta\rho
+
\frac{1}{2}A_\eta(\Delta\rho)^2
<
m_{\mathrm{act}}-\epsilon_\eta,
$$

$$
V_B\Delta\rho
+
\frac{1}{2}A_B(\Delta\rho)^2
\le
m_{\mathrm{sup}}
\quad
\text{or}
\quad
V_\delta\Delta\rho
+
\frac{1}{2}A_\delta(\Delta\rho)^2
<
\delta_{\mathrm{tail}},
$$

together with the root/Jacobian perturbation inequalities, stays in the same certified adaptive-memory chart. The active root count and labels are preserved, the declared memory row remains valid, and residual descent can be interpreted without changing the force ledger after the fact.

The converse is not claimed. A larger step may still be valid after a fresh root enumeration and certificate pass, but it is not certified by the previous chart.

---

## 6. $M=3$ Numerical Reading

At $\rho=0.8$ in the extended-window screen,

$$
\eta_{\mathrm{act}}\approx4.4058154936,
\qquad
\eta_{\mathrm{mem}}=4.5,
$$

so

$$
m_{\mathrm{act}}\approx0.0941845064.
$$

Using the observed root-front speeds as a first-order envelope,

$$
V_\eta\approx0.8645,
$$

and ignoring second-order terms only for a diagnostic estimate, the remaining active-window radius is roughly

$$
\Delta\rho_{\mathrm{act}}
\lesssim
\frac{0.0941845064}{0.8645}
\approx
0.109.
$$

This means a continuation from $\rho=0.8$ with fixed $\eta_{\mathrm{mem}}=4.5$ is expected to hit another memory-window exit near $\rho\approx0.91$ unless the memory depth is raised or the root-front speed drops.

For support-complete memory at the same row,

$$
B_{\mathrm{sup}}\approx5.5211575250,
$$

so

$$
m_{\mathrm{sup}}
=
4.5-5.5211575250-m_\eta
<
0.
$$

Thus the $\rho=0.8$ row has no positive support-complete trust radius under $\eta_{\mathrm{mem}}=4.5$. Its only branch-certificate route is a tail-exclusion certificate over

$$
(4.5,\ 5.5211575250].
$$

Until that tail certificate or a full enlarged-memory rerun exists, the best status is

$$
\texttt{active-window-certified},
\qquad
\texttt{support-complete-memory-open},
\qquad
\texttt{tail-force-error-unbounded},
\qquad
\texttt{not-retained}.
$$

---

## 7. Solver Output Row

The next exact-antipodal $M=3$ continuation packet should emit:

| Field | Required payload |
| --- | --- |
| `root_front_speed_bound` | $V_\eta,A_\eta$ and the labels that attain them |
| `active_window_trust_radius` | numerical $\Delta\rho_{\mathrm{act}}$ from the root-front inequality |
| `support_growth_bound` | $V_B,A_B$ for $2r_{\max}$ |
| `support_memory_trust_radius` | numerical radius if $m_{\mathrm{sup}}\ge0$, otherwise `none` |
| `tail_certificate_trust_radius` | $\delta_{\mathrm{tail}},V_\delta,A_\delta$ if the tail is certified |
| `accepted_radius` | minimum of the active, support or tail, root/Jacobian, noncollision, and residual-descent radii |
| `ledger_rerun_status` | whether roots, force, $\Gamma_K$, action, variationality, and event rows were recomputed after memory-depth changes |

Failure/status codes:

$$
\texttt{adaptive-memory-trust-radius-open},
\qquad
\texttt{active-window-radius-limited},
\qquad
\texttt{support-memory-radius-none},
$$

$$
\texttt{tail-certificate-radius-open},
\qquad
\texttt{ledger-rerun-required},
\qquad
\texttt{not-retained}.
$$
