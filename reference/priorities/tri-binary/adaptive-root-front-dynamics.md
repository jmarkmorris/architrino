# Adaptive Root-Front Dynamics

Promotion status: `priority-only`. This packet develops the dynamics of finite-memory root frontiers for the exact-antipodal $M=3$ arclength-inverse path in [arclength-inverse-m3-root-frontier.md](arclength-inverse-m3-root-frontier.md). It does not retain a branch.

The goal is to distinguish three events that look similar in a fixed-window solver:

1. a true root event, such as merger, annihilation, or Jacobian-floor loss;
2. a finite-memory chart exit, where a smooth root crosses the declared $\eta_{\max}$ boundary;
3. an active-window screen, where emitted roots are inside the chosen window but the support-complete tail is not certified.

The $M=3$ evidence supports the second interpretation for the first apparent root loss.

---

## 1. Root-Front Velocity

In the arclength-inverse chart, the delayed root equation is

$$
G_{ij}(\lambda,\eta;\alpha)
=
\|\mathbf{Y}_i(\lambda;\alpha)
-
\mathbf{Y}_j(\lambda-\eta;\alpha)\|
-
\eta.
$$

Let

$$
\mathbf{R}_{ij}
=
\mathbf{Y}_i(\lambda;\alpha)
-
\mathbf{Y}_j(\lambda-\eta;\alpha),
\qquad
\widehat{\mathbf{R}}_{ij}
=
\frac{\mathbf{R}_{ij}}{\eta},
$$

on a positive root. The root Jacobian is

$$
J_{ij}
=
1-
\mathbf{T}_j(\lambda-\eta;\alpha)\cdot\widehat{\mathbf{R}}_{ij},
$$

so

$$
\partial_{\eta}G_{ij}=-J_{ij}.
$$

For a one-parameter continuation $\alpha(s)$, write

$$
\mathbf{V}_k(\xi)
=
\partial_s\mathbf{Y}_k(\xi;\alpha(s))
$$

at fixed arclength argument. If $J_{ij}\ne0$, the implicit root velocity is

$$
\frac{d\eta_{ij}}{ds}
=
\frac{
\widehat{\mathbf{R}}_{ij}\cdot
\left[
\mathbf{V}_i(\lambda)
-
\mathbf{V}_j(\lambda-\eta)
\right]
}{
J_{ij}
}.
$$

This equation is the local root-front law. A root crossing a finite window is therefore controlled by the memory margin

$$
m_{\mathrm{mem}}(s)
=
\eta_{\mathrm{mem}}(s)-\eta_{ij}(s).
$$

A fixed-window exit occurs when

$$
m_{\mathrm{mem}}(s_*)=0,
\qquad
\frac{dm_{\mathrm{mem}}}{ds}(s_*)<0,
\qquad
J_{ij}(s_*)\ne0.
$$

This is not a root annihilation. A true root event requires at least one of the root-chart guardrails to fail: Jacobian floor, bracket separation, excluded-interval gap, noncollision floor, or the declared source-pair policy.

---

## 2. Observed $M=3$ Root Front

The first missing labels under the fixed $\eta_{\max}=4$ ledger are

$$
+3\leftarrow+2,
\qquad
-3\leftarrow-2.
$$

For the tracked same-sign label, the observed active root moves almost linearly through the $\eta=4$ frontier:

| Radius interval | Root-front speed $\Delta\eta/\Delta\rho$ |
| ---: | ---: |
| $0.30\to0.32$ | $0.8644152600$ |
| $0.32\to0.34$ | $0.8627874100$ |
| $0.34\to0.40$ | $0.8597680567$ |
| $0.40\to0.80$ | $0.8436366550$ |

Linear interpolation between $\rho=0.32$ and $\rho=0.34$ gives the fixed-window crossing

$$
\rho_{\eta=4}
\approx
0.3205574954.
$$

The least-squares linear fits over the local triples give the same crossing to the displayed accuracy:

| Fit interval | Slope | Crossing radius |
| --- | ---: | ---: |
| $\rho=0.30,0.32,0.34$ | $0.8636013350$ | $0.3205695363$ |
| $\rho=0.32,0.34,0.40$ | $0.8603487015$ | $0.3205347794$ |
| $\rho=0.30,0.32,0.34,0.40,0.80$ | $0.8463443418$ | $0.3202958756$ |

Thus the old fixed-window status

$$
\texttt{root-count-loss-at-rho-0p4}
$$

is better resolved as

$$
\texttt{memory-window-exit-near-rho-0p32056}.
$$

The refined scan already supplies the decisive check: the roots reappear under $\eta_{\max}=4.5$ with positive finite delays. The event is therefore a solver-window event unless a later interval packet finds a Jacobian or gap failure at the crossing.

---

## 3. Active Window Versus Support Tail

The same path has two memory scales:

1. the largest active root, $\eta_{\mathrm{act}}$;
2. the support-bound tail, $2r_{\max}$.

The observed values are:

| Radius $\rho$ | $\eta_{\mathrm{act}}$ | $2r_{\max}$ | $2r_{\max}-\eta_{\mathrm{act}}$ | $4.5-\eta_{\mathrm{act}}$ |
| ---: | ---: | ---: | ---: | ---: |
| $0.30$ | $3.9822306948$ | $4.9587752224$ | $0.9765445276$ | $0.5177693052$ |
| $0.34$ | $4.0167747482$ | $5.0024465240$ | $0.9856717758$ | $0.4832252518$ |
| $0.40$ | $4.0683608316$ | $5.0690728448$ | $1.0007120132$ | $0.4316391684$ |
| $0.80$ | $4.4058154936$ | $5.5211575250$ | $1.1153420314$ | $0.0941845064$ |

The active roots stay below $\eta_{\max}=4.5$ through $\rho=0.8$, but the margin is already only

$$
0.0941845064.
$$

At the same time the support-complete tail grows. A linear fit to $2r_{\max}$ over these rows gives approximate slope

$$
\frac{d(2r_{\max})}{d\rho}\approx1.1265802095,
$$

which is larger than the active-root-front speed near the same rows. This explains the current proof burden:

$$
\eta_{\max}=4.5
\quad
\text{is an active-window screen, not a support-complete certificate.}
$$

The uncertified tail at $\rho=0.8$ is

$$
(4.5,\ 5.5211575250].
$$

A retained continuation must either set

$$
\eta_{\mathrm{mem}}
\ge
2r_{\max}+m_{\eta}
$$

after in-window enumeration, or provide an interval proof that every required source-pair row is root-free in the remaining tail.

---

## 4. Force And Scale Consequence

A delayed root cannot be silently omitted from a dynamics row. If a retained root $a=(i,j,\lambda,\mu)$ is outside a shallow cutoff but inside the declared physical memory row, the missing force contribution is

$$
\Delta\widetilde{\mathbf{F}}_{i,a}
=
\frac{\sigma_i\sigma_j}{\eta_a^2|J_a|}
\widehat{\mathbf{R}}_{a}.
$$

The retained intrinsic residual changes by

$$
\Delta\mathcal{R}_{K,i}
=
-
\Gamma_K
P_i^\perp
\Delta\widetilde{\mathbf{F}}_{i,a}
-
\Delta\Gamma_K
P_i^\perp\widetilde{\mathbf{F}}_i
-
\Delta\Gamma_K
P_i^\perp
\Delta\widetilde{\mathbf{F}}_{i,a}.
$$

For the fitted diagnostic scale

$$
\Gamma_K
=
\frac{\langle\mathbf{K},P^\perp\widetilde{\mathbf{F}}\rangle}
{\langle P^\perp\widetilde{\mathbf{F}},P^\perp\widetilde{\mathbf{F}}\rangle},
$$

the first variation under a force-ledger change is

$$
\delta\Gamma_K
=
\frac{
\langle\mathbf{K},P^\perp\delta\widetilde{\mathbf{F}}\rangle
-
2\Gamma_K
\langle P^\perp\widetilde{\mathbf{F}},P^\perp\delta\widetilde{\mathbf{F}}\rangle
}{
\langle P^\perp\widetilde{\mathbf{F}},P^\perp\widetilde{\mathbf{F}}\rangle
}.
$$

Thus changing $\eta_{\mathrm{mem}}$ changes both the force vector and the scale diagnostic. The corresponding action row must use the same memory ledger, or the packet has status

$$
\texttt{force-action-ledger-mismatch}
$$

or

$$
\texttt{gamma-diagnostic-only}.
$$

---

## 5. Continuation Theorem Target

**Theorem target: fixed-window exits are chart exits under root-front regularity.** Fix a source-pair policy and an arclength-inverse coefficient path $\alpha(s)$. Suppose that for a retained label $a$:

1. $G_a(\eta_a(s);\alpha(s))=0$ on an open interval around $s_*$;
2. $J_a(s)$ stays bounded below by $\epsilon_J>0$;
3. bracket endpoint signs and excluded-interval gaps stay positive in an extended window;
4. noncollision and support floors stay positive;
5. $\eta_a(s_*)=\eta_{\max}$ for a fixed solver window.

Then the change of root count inside $[0,\eta_{\max}]$ at $s_*$ is a finite-memory chart exit, not a root annihilation or branch pruning event. The correct continuation is to either reject the step under the fixed-window convention or declare a deeper $\eta_{\mathrm{mem}}$ and rerun roots, force, $\Gamma_K$, action, and event ledgers under that convention.

The $M=3$ root-frontier rows satisfy the numerical shape of this theorem target: the root front crosses $\eta=4$ near $\rho\approx0.32056$, and the roots are recovered under $\eta_{\max}=4.5$. What remains open is an interval root-chart packet proving the bracket, gap, and tail-exclusion rows.

Failure/status codes:

$$
\texttt{memory-window-exit-near-rho-0p32056},
\qquad
\texttt{active-window-certified},
\qquad
\texttt{tail-interval-uncertified},
$$

$$
\texttt{support-complete-memory-open},
\qquad
\texttt{action-gamma-rerun-required},
\qquad
\texttt{not-retained}.
$$

Unsupported codes for this event remain:

$$
\texttt{root-annihilation},
\qquad
\texttt{source-pair-pruned},
\qquad
\texttt{m3-left-null-pair-even}.
$$
