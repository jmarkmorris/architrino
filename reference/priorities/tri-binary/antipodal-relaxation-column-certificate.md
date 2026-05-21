# Antipodal Relaxation Column Certificate

Promotion status: `priority-only`. This packet states the finite-mode linear algebra certificate required before opening antipodal relaxation as a dynamics route. It complements [exact-antipodal-parity-lemma.md](exact-antipodal-parity-lemma.md), [symmetry-block-decomposition-theorem.md](symmetry-block-decomposition-theorem.md), [support-complete-dynamics-obstruction-certificate.md](support-complete-dynamics-obstruction-certificate.md), [adjoint-cokernel-equations.md](adjoint-cokernel-equations.md), and [antipodal-relaxation-ansatz.md](antipodal-relaxation-ansatz.md). It does not claim that the current $M=3$ data warrants antipodal relaxation.

The principle is:

$$
\text{pair-even residual}
\ne
\text{pair-midpoint degree of freedom required}.
$$

Relaxation is justified only if the newly opened pair-midpoint columns actually span the obstructing cokernel directions on a support-complete ledger.

---

## 1. Exact-Antipodal Cokernel

Let

$$
\mathcal{F}_{\eta}^{\mathrm{anti}}(\alpha)
$$

be the exact-antipodal support-complete dynamics residual. Its reduced derivative is

$$
A
=
D_\alpha
\mathcal{F}_{\eta}^{\mathrm{anti}}(\alpha_0).
$$

Let $P_{\mathrm{cok}}$ be the cokernel projector used by [support-complete-dynamics-obstruction-certificate.md](support-complete-dynamics-obstruction-certificate.md). A certified exact-antipodal obstruction has an obstructing residual

$$
c_0
=
P_{\mathrm{cok}}
\mathcal{F}_{\eta}^{\mathrm{anti}}(\alpha_0)
$$

whose norm exceeds nonlinear, tail, and discretization error envelopes.

Let $E_{\mathrm{even}}$ project the residual space to the pair-even sector. The relaxation gate is relevant only if

$$
\frac{\|E_{\mathrm{even}}c_0\|}{\|c_0\|}
\ge
\chi_{\mathrm{even}}.
$$

Otherwise the obstruction is not primarily a pair-even exact-antipodal limitation.

---

## 2. Relaxation Columns

Introduce pair-midpoint variables $m$ from [antipodal-relaxation-ansatz.md](antipodal-relaxation-ansatz.md). The relaxed residual is

$$
\mathcal{F}_{\eta}^{\mathrm{rel}}(\alpha,m),
\qquad
\mathcal{F}_{\eta}^{\mathrm{rel}}(\alpha,0)
=
\mathcal{F}_{\eta}^{\mathrm{anti}}(\alpha).
$$

The new linear columns are

$$
B
=
D_m
\mathcal{F}_{\eta}^{\mathrm{rel}}(\alpha_0,0).
$$

Only their cokernel projection can address the exact-antipodal obstruction:

$$
B_C
=
P_{\mathrm{cok}}B.
$$

The first-order obstruction cancellation equation is

$$
B_Cm
=
-c_0.
$$

---

## 3. Range Criterion

The pair-midpoint columns pass the linear gate if

$$
\operatorname{dist}
\left(
c_0,\operatorname{ran}B_C
\right)
\le
\epsilon_{\mathrm{rel,lin}},
$$

and the least-norm correction

$$
m_*
=
-B_C^\dagger c_0
$$

obeys the geometric trust bounds:

$$
\|m_*\|\le\rho_m,
$$

with noncollision, support, root/Jacobian, memory, tail, and event-ledger margins preserved to first order.

Equivalently, if $\sigma_{\min}^+$ is the smallest retained singular value of $B_C$ on the obstructing subspace, a sufficient condition is

$$
\sigma_{\min}^+>\epsilon_{\sigma},
\qquad
\|m_*\|\le
\frac{\|c_0\|}{\sigma_{\min}^+}
\le
\rho_m.
$$

If $B_C$ has no stable singular direction aligned with $c_0$, the status is

$$
\texttt{antipodal-relaxation-column-defect}.
$$

---

## 4. Nonlinear Relaxed Closure

Passing the linear gate does not retain the relaxed branch. The relaxed system must rerun the same support-complete closure stack with variables $(\alpha,m)$:

1. root/Jacobian and memory certificates;
2. tail exclusion or tail error bound;
3. delayed-force Lipschitz envelope;
4. collocation-refinement envelope;
5. support-complete Newton/Krawczyk closure;
6. action, $\Gamma$, Noether conservation, and stability rows;
7. topology/spin rows affected by breaking exact antipodality.

The relaxed Newton certificate uses

$$
A_{\mathrm{rel}}
=
\left[
A\quad B
\right],
$$

with its own range/cokernel split. The exact-antipodal cokernel is only a diagnostic for deciding whether to open the chart.

---

## 5. Theorem Target

**Lemma target: antipodal relaxation column necessity.** Suppose exact-antipodal dynamics is support-complete and locally obstructed by $c_0=P_{\mathrm{cok}}\mathcal{F}_{\eta}^{\mathrm{anti}}(\alpha_0)$, and suppose that $c_0$ is stably pair-even under refinement. If the projected pair-midpoint matrix $B_C=P_{\mathrm{cok}}D_m\mathcal{F}_{\eta}^{\mathrm{rel}}(\alpha_0,0)$ has stable range containing $c_0$ within tolerance and the least-norm correction stays inside all first-order branch floors, then antipodal relaxation is a mathematically justified next chart to test.

If the range condition fails, antipodal relaxation is not the missing local degree of freedom for that obstruction.

Proof route:

1. exact-antipodal variables cannot change $c_0$ to first order because $P_{\mathrm{cok}}A=0$;
2. pair-midpoint variables can change only the component $P_{\mathrm{cok}}Bm$;
3. the linear cancellation equation is solvable precisely when $c_0$ lies in the range of $P_{\mathrm{cok}}B$;
4. floor and trust inequalities decide whether the correction stays in the same branch chart;
5. nonlinear retention still requires a full relaxed Newton/closure certificate.

---

## 6. Current $M=3$ Reading

The current $M=3$ rows do not meet the preconditions for this certificate. They have not certified an exact-antipodal support-complete obstruction. The observed root issue is a memory-window event, and the restricted exact-antipodal matrix has a strong range signal.

Therefore the correct status is still

$$
\texttt{continue-exact-antipodal},
\qquad
\texttt{antipodal-relaxation-column-certificate-open},
\qquad
\texttt{not-retained}.
$$

---

## 7. Required Output Fields

Future relaxation-gate packets should emit:

| Field | Required payload |
| --- | --- |
| `exact_obstruction_vector` | $c_0=P_{\mathrm{cok}}\mathcal{F}^{\mathrm{anti}}$ and certified obstruction margin |
| `pair_even_fraction` | $\|E_{\mathrm{even}}c_0\|/\|c_0\|$ and threshold $\chi_{\mathrm{even}}$ |
| `relaxation_columns` | $B=D_m\mathcal{F}^{\mathrm{rel}}$ with root sensitivities included |
| `projected_relaxation_columns` | $B_C=P_{\mathrm{cok}}B$ and singular spectrum |
| `linear_cancellation` | $\operatorname{dist}(c_0,\operatorname{ran}B_C)$ and least-norm $m_*$ |
| `relaxation_trust` | support, noncollision, root/Jacobian, memory, tail, and topology margins under $m_*$ |
| `relaxation_decision` | `open-antipodal-relaxation`, `continue-exact-antipodal`, or first failure code |

Failure/status codes:

$$
\texttt{antipodal-relaxation-column-certificate-open},
\qquad
\texttt{antipodal-relaxation-column-defect},
\qquad
\texttt{relaxation-trust-floor-fail},
$$

$$
\texttt{exact-antipodal-obstruction-required-first},
\qquad
\texttt{continue-exact-antipodal},
\qquad
\texttt{not-retained}.
$$
