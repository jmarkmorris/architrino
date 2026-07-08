# Branch-Event Classification Theorem

Promotion status: `priority-only`. This packet classifies the first ways an exact-antipodal $M=3$ arclength-inverse continuation can stop being the same certified branch. It separates true chart or dynamics events from proof-budget failures, so a solver does not mistake failed sufficient bounds for a mathematical obstruction.

The theorem is local to one equal-period arclength-inverse chart, one exact-antipodal coefficient path, one source-pair policy, one memory convention, one support-band convention, and one action ledger.

---

## 1. Setup

Let

$$
\alpha(s)
$$

be a smooth exact-antipodal $M=3$ continuation path in the equal-period arclength-inverse chart. Let the declared memory depth be $\eta_{\mathrm{mem}}$, let $\mathcal{A}_{\eta}(s)$ be the active delayed-root ledger, and write the support-complete dynamics residual as

$$
\mathcal{F}_{\eta}^{(3)}(\alpha)
=
\left(
\mathcal{R}_{\mathrm{tan}}^{(\eta)}(\alpha),
\mathcal{R}_{K}^{(\eta)}(\alpha)
\right).
$$

Let $s_*$ be the first parameter value where the retained-branch certificate cannot continue without changing at least one of:

$$
\text{chart},
\quad
\text{support band},
\quad
\text{memory policy},
\quad
\text{source-pair policy},
\quad
\text{action ledger}.
$$

If all event margins cross simply, the first event is one of the classes below. If two or more margins vanish at the same $s_*$, the point is a multi-event boundary and must be ledgered as such before any branch interpretation is made.

---

## 2. Event Classes

| Event | Diagnostic condition | Interpretation |
| --- | --- | --- |
| `memory-window-exit` | For some retained root $a$, $G_a(\eta_a(s_*);\alpha(s_*))=0$, $|J_a(s_*)|>\epsilon_J$, bracket and excluded-gap margins remain positive, but $m_{\mathrm{act}}=\eta_{\mathrm{mem}}-\eta_a=0$ with $\dot m_{\mathrm{act}}<0$. Equivalently, a step violates $V_\eta\Delta s+\frac{1}{2}A_\eta(\Delta s)^2<m_{\mathrm{act}}-\epsilon_\eta$. | The root continues smoothly by the implicit function theorem. The declared memory window failed; the root did not disappear. |
| `support-band-escape` | The band margin $m_{\mathrm{band}}=\min_{i,\lambda}\{\|\mathbf{Y}_i\|-(R-\delta),\,(R+\delta)-\|\mathbf{Y}_i\|\}$ reaches zero, or $r_{\max}$ exceeds the declared support row. | The curve leaves the declared same-level support-band chart. Widening the band is a new ledger and forces memory, action, and $\Gamma$ recomputation. |
| `jacobian-root-fold` | Some retained root has $|J_a|\le\epsilon_J$. A true fold has $G_a=0$, $J_a=0$, $\partial_{\eta\eta}G_a\ne0$, and a transverse continuation derivative. | Root sensitivities are no longer certified because the source-normal root-chart derivative divides by $J_a$; force/action derivatives must be restarted on same-record $W^{\mathrm{rec}}$ rows after the fold-layer continuation is rebuilt. |
| `root-merger-collision` | Root-label separation satisfies $m_{\mathrm{sep}}=\min_{a\ne b}|\eta_a-\eta_b|-\epsilon_{\eta,\mathrm{merge}}\le0$, an excluded-gap margin collapses, or Euclidean noncollision reaches $d_{\min}\le\epsilon_x$. | Isolated root labels or the Euclidean noncollision chart fail. This stops retention even if residuals decrease. |
| `chart-speed-failure` | The construction-speed floor satisfies $s_{\min}=\min_{i,\theta}\|\partial_\theta\mathbf{Z}_i\|\le s_0$, or the equal-period constraint loses qualification, for example $\sigma_{\min}(D\mathbf{L})\le\epsilon_L$. | The inverse arclength maps cease to be certified diffeomorphisms, so tangent, curvature, root, and Krawczyk derivatives are invalid in this chart. A nonzero construction-speed residual alone is not this event. |
| `tail-certificate-failure` | $m_{\mathrm{sup}}=\eta_{\mathrm{mem}}-2r_{\max}-m_\eta<0$ and the tail slabs fail all exclusion rows: distance exclusion, monotone endpoint exclusion, and Lipschitz point exclusion. If no tail root-count or Jacobian envelope exists, $\epsilon_{\mathcal{F}}^{\mathrm{tail}}$ is unbounded. | The active window is not support-complete. Possible omitted roots cannot be set to zero in force, $\Gamma$, curl, or action rows. |
| `newton-krawczyk-proof-budget-open` | All chart and root margins remain positive, but a sufficient existence bound fails: $h_R>1/2$, $r_R>\rho_{\mathrm{chart}}$, $Y+Z\rho\ge\rho$, or $Z\ge1$. It is proof-budget only when the obstruction inequality also fails. | Failed contraction bounds do not prove dynamics obstruction. The status is `descent-without-closure` unless a separate support-complete cokernel lower bound holds. |
| `action-gamma-curl-obstruction` | On a support-complete root-regular chart, $\|\mathcal{C}\|_{\mathrm{F}}/(1+\|W\|_{\mathrm{F}})>\epsilon_{\mathrm{curl}}$, or $\Gamma_B$ lies outside the fitted compatibility band, or the force and action ledgers use different roots. | A scalar history action or action-derived branch scale is not certified on this ledger. Dynamics descent remains diagnostic until action compatibility is restored. |

---

## 3. Proof Route

The classification follows from the theorem targets already isolated in the same-level braid packet stack.

First, root labels continue smoothly while

$$
G_a(\eta_a(s);\alpha(s))=0,
\qquad
|J_a(s)|>\epsilon_J,
$$

and the bracket and excluded-gap margins remain positive. This is the root/Jacobian barrier regime. A memory-window exit is therefore not a root annihilation: it is only the loss of the declared finite-memory cutoff.

Second, the arclength-inverse chart remains valid while

$$
s_{\min}>s_0,
\qquad
\sigma_{\min}(D\mathbf{L})>\epsilon_L,
$$

and the fixed-arclength variation formulas are used. If either margin fails, the derivative objects entering tangent, curvature, root sensitivity, Krawczyk bounds, and curl rows no longer live in the declared chart.

Third, support completeness is stronger than active-window completeness. The active ledger can be valid while

$$
\eta_{\mathrm{mem}}<2r_{\max}+m_\eta.
$$

In that case a tail-exclusion cover or a full extended-root enumeration is required before omitted force and action terms can be bounded.

Fourth, range Newton and Krawczyk rows are sufficient existence certificates, not necessary conditions. A failed Krawczyk inequality becomes a real exact-antipodal obstruction only after a support-complete cokernel lower bound exceeds the certified nonlinear remainder, tail error, discretization error, and dynamics tolerance.

Finally, action compatibility is a separate branch gate. A row can improve

$$
\mathcal{R}_{\mathrm{tan}},
\qquad
\mathcal{R}_{K},
$$

while still failing the curl or fitted/action $\Gamma$ identity. Such a row may remain a dynamics guide, but it is not a retained action-derived branch.

---

## 4. First-Event Theorem Target

**Theorem target.** Fix an exact-antipodal $M=3$ arclength-inverse continuation path $\alpha(s)$ and suppose all retained-root, chart, support, tail, Newton, cokernel, $\Gamma$, and curl margins are continuous in $s$. Suppose there is an initial interval $[s_0,s_*)$ on which every margin is positive and every certificate row uses the same root ledger. If the branch certificate first fails at $s_*$ and the failing margin is simple, then the failure has exactly one of the event classes in Section 2.

If the event is `memory-window-exit`, `support-band-escape`, `chart-speed-failure`, `tail-certificate-failure`, or `newton-krawczyk-proof-budget-open`, no exact-antipodal dynamics obstruction has been proved. The solver must change chart, memory, support, proof budget, or tail enumeration before drawing a branch-class conclusion.

If the event is `jacobian-root-fold`, `root-merger-collision`, or `action-gamma-curl-obstruction`, the declared retained branch stops unless a regularized fold-layer, collision-avoiding chart, or action-compatible force ledger is supplied on the same event convention.

Only a support-complete cokernel lower bound can produce

$$
\texttt{exact-antipodal-obstructed}.
$$

Only a subsequent projected-column certificate can produce

$$
\texttt{antipodal-relaxation-open}.
$$

---

## 5. Current $M=3$ Classification

The currently documented $M=3$ frontier has already resolved one apparent failure:

$$
\texttt{m3-root-ledger-loss-at-rho-0p4}
\quad\leadsto\quad
\texttt{m3-memory-window-exit-at-eta-4}.
$$

The extended $\eta_{\mathrm{mem}}=4.5$ rows recover the missing roots and preserve $5$-$5$ active counts in the tested rows, so the first event is a memory-window event, not a root fold, root merger, or antipodal-relaxation trigger.

At $\rho=0.8$, the status remains

$$
\texttt{active-window-only},
\qquad
\texttt{tail-force-error-unbounded},
$$

because the unresolved support tail

$$
(4.5,\,5.5211575250]
$$

has no certified exclusion row or finite tail count/Jacobian envelope. The branch is therefore still a live exact-antipodal continuation target, but not a support-complete dynamics candidate.
