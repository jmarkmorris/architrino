# OPS-031 — Eight proposed corrections from October 4–5

Prepared October 6, 2026, at the operator's request. **Current status: approved and implemented October 6; separate verification is recorded in the [closure receipt](../evidence/ops-031-eight-correction-closure-2026-10-06.md).** The before/after proposal below preserves its preparation-time wording. CRW-005 remains closed. The eight items below consolidate the existing review findings, rather than launch a new review or scientific investigation. Each before passage is quoted exactly from the live source; each after passage is the complete proposed replacement for that passage. Multiple passages within one numbered item are propagation of the same correction.

## Source versions and review boundary

Exact-match assertions in the proposal builder confirm every before fragment occurs uniquely in its current source. SHA-256 by Node crypto over the read UTF-8 bytes: [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) `8a106d615611efe5b6baf8705a47f03edcf53ffe13d7998fb7af86432c139f7f`; [Zero-Axial-Offset Three-Binary Dynamics and Interpretation](../../../../content/markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md) `c6eb72681617d1b17432d5a46b9dec1dfb94443b9fd41c3b7d9a3aeb054bed5a`. These equal the October 4–5 review snapshots. The mathematical support below is taken from the independently derived references in the receipts, not from agreement between agents. No solver runs, external-source rechecks, global correctness certification or causal attribution are claimed. A changed source version requires refreshing the corresponding before text before implementation.

Preserve the canonical acceleration law, all unaffected equations, existing functional viewer anchors, historical receipts and open scientific obligations. Item 5 adds an inline definition and clarifies one jet symbol; item 6 distinguishes a statistic from a conditional charge in five existing displays. Existing viewer identities remain assigned to their displays; no generator or viewer registration is performed by this proposal.

## 1. Circular acceleration near a root birth

**Evidence and limit:** Derived: at a positive-separation circular fold, $|J|$ is proportional to $\sqrt\mu$ and branch acceleration magnitude to $\mu^{-1/2}$. The ratio $D_r/D_t=1$ is a playback derivative, not an acceleration multiplier. This is a limit through prescribed simple-root circles, not an evolved transition or transit-impulse theorem. A different selected kernel that cancels $1/|J|$, or a refuted fold expansion, would reopen it.

[Original receipt](../../aaa-operations/evidence/ops-031-master-equation-continuation-review-2026-10-04.md).

**Before — exact source:**

This is therefore a root-transversality and branch-birth statement, not a closure theorem. A circular self branch born on $D_t=0$ marks a chart boundary; it does not supply a singular receiver-side amplitude on the uniform circular ansatz. Any locked-orbit claim must still control the signed radial and tangential sums on a retained branch chart.

**Proposed after:**

This is therefore a root-transversality and branch-birth statement, not a closure theorem. A circular self branch born on $D_t=0$ marks a chart boundary. Its signed root-playback derivative remains one on the nondegenerate circular roots, while its receiver-evaluated branch acceleration diverges as the transmitter Jacobian vanishes. The pointwise simple-root formula does not define the birth event itself. Any locked-orbit claim must still control the signed radial and tangential sums on a retained branch chart.

## 2. Count the scalar root weight once

**Evidence and limit:** Derived from the scalar's current definition: each distinct ordered root contributes $W^{\mathrm{acc}}/(r^2+\epsilon_c^2)$ once. The displayed identity $g'=-J/\beta_f$ remains unchanged. A separately defined functional could have different scaling; it would not alter this statistic.

[Original receipt](../../aaa-operations/evidence/ops-031-master-equation-continuation-review-2026-10-04.md).

### Passage 1

**Before — exact source:**

> The causal-action coarea weight is a separate collapse factor:

**Proposed after:**

> The transmitter-side root derivative is:

### Passage 2

**Before — exact source:**

> so the action-counting density carries an additional $|g_{\beta_f,s_n}'|^{-1}$ and scales as $O(\mu^{-1})$ at fixed nonzero $r_n^\star$. Under the transmitter-side law the acceleration weight is already $W^{\mathrm{acc}}=c_f/|D_t|=1/|J^t|$. Action counting remains a separate variational question and may not be inferred by multiplying the acceleration by signed root playback.
>
> Consequently the circular self-hit combinatorics remain linearly bounded in $\beta_f$. A one-sign subchart has
> $$
> N_{\text{self}}^{(+)}(\beta_f)=\frac{\beta_f}{\pi}+O(1),
> $$

**Proposed after:**

> For the declared receiver-time scalar in [Causal Action Functional](../../../../content/markdown/aaa/dynamics/causal-action-functional.md#core-functional-definitions), the transmitter collapse is already counted once through $W^{\mathrm{acc}}=c_f/|D_t|=1/|J^t|$. Its branch magnitudes therefore scale as $O(\mu^{-1/2})$ at fixed positive $r_n^\star$, with no additional $|g_{\beta_f,s_n}'|^{-1}$ multiplier. A distinct variational action must declare its own pre-collapse integrand and measure before a different singular scaling is assigned. The scalar is not a variational action, and neither it nor the acceleration is multiplied by signed root playback. This speed-parameter scaling alone establishes no reception-time integrability result.

## 3. Circular shortcuts on wrapped root sheets

**Evidence and limit:** Derived: circular partner and self chords have lengths $2R|\cos(\Delta/2)|$ and $2R|\sin(\Delta/2)|$. Independent Cartesian velocity projections give the same signed Jacobians on wrapped roots. Preserve all general spiral formulas; a declared restriction excluding those sheets would reduce this to exposition.

[Original receipt](../../aaa-operations/evidence/ops-031-master-spiral-review-2026-10-05.md).

### Passage 1

**Before — exact source:**

which is the non-circular analogue of the circular partner equation $\cos\xi=\xi/\beta_f$.

**Proposed after:**

which is the non-circular analogue of the complete circular partner equation $|\cos\xi|=\xi/\beta_f$, with $\xi=\Delta/2$. On the principal partner sheet, $0<\Delta<\pi$, the cosine is positive.

### Passage 2

**Before — exact source:**

The sign is fixed by the circular limit: when $p_0=0$ and $\rho=1$, this gives $J_{12}=1+\beta_f\sin(\Delta/2)$.

**Proposed after:**

For a uniform circular history, $p_0=0$, $\rho=1$, and $\omega_0=\omega$, the positive chord length gives $J_{12}=1+\beta_f\operatorname{sign}(\cos(\Delta/2))\sin(\Delta/2)$. On the principal partner sheet $0<\Delta<\pi$, this reduces to $J_{12}=1+\beta_f\sin(\Delta/2)$. Wrapped sheets retain the cosine sign; zero-chord roots are excluded.

### Passage 3

**Before — exact source:**

This expression is algebraic once a delayed root $\Delta$ is known. The receiver-side expression remains useful for signed root playback but does not enter this weight. In the uniform circular limit, $W_p^{\mathrm{acc}}=(1+\beta_f\sin(\Delta/2))^{-1}$.

**Proposed after:**

This expression is algebraic once a delayed root $\Delta$ is known. The receiver-side expression remains useful for signed root playback but does not enter this weight. On the principal uniform circular partner sheet, $0<\Delta<\pi$, $W_p^{\mathrm{acc}}=(1+\beta_f\sin(\Delta/2))^{-1}$. Other noncoincident simple circular roots use $W_p^{\mathrm{acc}}=|1+\beta_f\operatorname{sign}(\cos(\Delta/2))\sin(\Delta/2)|^{-1}$.

### Passage 4

**Before — exact source:**

Again the circular limit agrees with the uniform circular self-hit formula, $J_{11}=1-\beta_f\cos(\Delta/2)$.

**Proposed after:**

For a uniform circular history, the complete noncoincident self-hit formula is $J_{11}=1-\beta_f\operatorname{sign}(\sin(\Delta/2))\cos(\Delta/2)$. On sheets with $\sin(\Delta/2)>0$, it reduces to $J_{11}=1-\beta_f\cos(\Delta/2)$.

## 4. Oriented normal versus Frenet principal normal

**Evidence and limit:** Derived: $d\hat{\mathbf T}/d\theta=[(1+p^2+p')/(1+p^2)]\hat{\mathbf N}$. The positive curve $r=e^{\theta^2}$ gives $p=0$, $p'=-2$ at zero, reversing the principal normal relative to the printed normal. This is a kinematic witness, not an EOM orbit. An explicit positive-curvature restriction or defined signed-frame convention would resolve the original scope defect. The final wording change states the frame identity only; it does not decide the separate recurrence question.

[Original receipt](../../aaa-operations/evidence/ops-031-master-spiral-review-2026-10-05.md).

### Passage 1

**Before — exact source:**

The receiver Frenet frame for the variable-pitch spiral is

**Proposed after:**

For $r>0$ and $\dot\theta>0$, the receiver oriented tangent-normal frame for the variable-pitch spiral is

### Passage 2

**Before — exact source:**

where $p=p(\theta)$ and $\hat{\mathbf{N}}$ points inward in the circular limit. Using the branch unit vector

**Proposed after:**

where $p=p(\theta)$ and $\hat{\mathbf{N}}$ points inward in the circular limit. This is an orthonormal tangent and oriented normal. The normal is the Frenet principal normal, the direction in which the unit tangent turns, when $1+p^2+p'>0$, where the prime denotes an angular derivative. It is opposite to the principal normal when that quantity is negative; at zero curvature the principal normal is undefined. These orientation distinctions leave the displayed projection algebra unchanged. Using the branch unit vector

### Passage 3

**Before — exact source:**

Projecting onto the variable-pitch Frenet frame gives

**Proposed after:**

Projecting onto the variable-pitch oriented tangent-normal frame gives

### Passage 4

**Before — exact source:**

The Frenet tangential sum used below is the same information in a rotated basis:

**Proposed after:**

The tangent projection used below is the same information in the oriented frame:

### Passage 5

**Before — exact source:**

so the polar pitch flow and the Frenet obstruction are equivalent statements, not separate tests.

**Proposed after:**

so the displayed tangential sum is the tangent projection of the same polar acceleration record.

## 5. Define the transported radial residual

**Evidence and limit:** Derived: differentiating the declared residual at the even turn, using $\Gamma'=2k\Gamma$ and $\Gamma_*k_*=B_\theta^{\mathrm{rec}}(0)$, reproduces $(3a_{\mathrm{rs}}-2)B_\theta^{\mathrm{rec}}(0)$. This defines rather than changes the coefficient. It supplies no history, root inventory or cancellation result. A different intended residual sign or normalization would require its own derivation before implementation.

[Original receipt](../../aaa-operations/evidence/ops-031-master-spiral-review-2026-10-05.md).

**Before — exact source:**

A local convergence diagnostic can sharpen this finite-collar target, but it does not by itself fix the full continuation class. After the tangential record is imposed on the retained ledger, the transported radial record should be tested through the leading one-sided jet of $\mathcal R_R^{\mathrm{tr}}(\theta)$ near $\theta=0$. For a specified tangential-transport profile, the jet coefficient is
$$
\left(\mathcal R_R^{\mathrm{tr}}\right)'_+(0)
=
B'_+(0)-(3a_{\mathrm{rs}}-2)B_\theta^{\mathrm{rec}}(C_{\mathrm{rs}};0)
$$

[View →](../../../../equation-mapping.html#corpus-equation-bfda6cac91258e09)

The retained endpoint and moment constraints do not yet fix all transmitter-side endpoint-slope data entering $B'_+(0)$. A nonzero sampled coefficient is therefore a local obstruction candidate for that profile, not a theorem that every positive $C^2$ variable-rate continuation fails.

**Proposed after:**

A local convergence diagnostic can sharpen this finite-collar target, but it does not by itself fix the full continuation class. After the tangential record is imposed on the retained ledger, the transported radial record should be tested through the leading one-sided jet of $\mathcal R_R^{\mathrm{tr}}(\theta)$ near $\theta=0$. Define the dimensionless transported radial residual as $\mathcal R_R^{\mathrm{tr}}(\theta)=B_r^{\mathrm{rec}}(C_{\mathrm{rs}};\theta)-\Gamma(\theta)[r''(\theta)/r(\theta)-1+(r'(\theta)/r(\theta))k(\theta)]$, where $k=d\log\omega/d\theta$ and $\Gamma=r^3\omega^2/(\kappa q_1^2)$. Here $B_r^{\mathrm{rec}}$ is the radial acceleration sum from the same transported roots, and the bracket is the radial kinematic requirement in the same normalization. Thus the residual is evaluated acceleration minus required acceleration. Primes denote total angular derivatives along the specified history, transported roots and time profile; the subscript $+$ selects the derivative from positive $\theta$. At the stated even turn, $r'=r'''=0$ and $r''/r=a_{\mathrm{rs}}$. After imposing the center tangential balance, the jet coefficient is
$$
\left(\mathcal R_R^{\mathrm{tr}}\right)'_+(0)
=
\left(B_r^{\mathrm{rec}}(C_{\mathrm{rs}};\theta)\right)'_+(0)-(3a_{\mathrm{rs}}-2)B_\theta^{\mathrm{rec}}(C_{\mathrm{rs}};0)
$$

[View →](../../../../equation-mapping.html#corpus-equation-bfda6cac91258e09)

The retained endpoint and moment constraints do not yet fix all transmitter-side endpoint-slope data entering $\left(B_r^{\mathrm{rec}}(C_{\mathrm{rs}};\theta)\right)'_+(0)$. A nonzero sampled coefficient is therefore a local obstruction candidate for that profile, not a theorem that every positive $C^2$ variable-rate continuation fails.

## 6. Separate the failed candidate statistic from a derived charge

**Evidence and limit:** Derived: ordinary integration of the two-time derivative collapses the candidate integral to half the ordered reception density. For $c_f=1$, a static pair at separation $R$ passes the normalization control. A compact one-member perturbation with speed $\epsilon$ at the reception cut and unchanged incoming emission history gives $E_{\mathrm{stat}}'=-C\epsilon/(2R^2)+O(\epsilon^2)$, whereas the full ordered scalar-action variation requires $-C\epsilon/R^2+O(\epsilon^2)$, with $C=\mu_{\mathrm{arch}}\kappa\sigma_{12}|q_1q_2|$. This is an off-shell identity test, not a solution claim. A full derivation passing that witness with explicitly declared cut terms would reopen it. The proposal retains the kernel and conditional residual form, changes their charge identification, and invents no corrected nonlocal charge. Generic charge-target notation elsewhere remains conditional.

[Original receipt](../../aaa-operations/evidence/ops-031-master-tail-review-2026-10-05.md).

**Before — exact source:**

For the candidate nonlocal action, the proposed time-translation boundary charge has the form

$$
E_{\text{tot}}(T)=K_{\mu}(T)+E_{\text{wake}}(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-2d00bde3ebf3177a)

with

$$
E_{\text{wake}}(T)
=
-\frac{1}{2}\sum_{i,j}
\int_{-\infty}^{T} dT_t
\int_{T}^{\infty} dT_1\,
\partial_{T_1}\mathcal{K}_{ij}(T_1,T_t)
$$

[View →](../../../../equation-mapping.html#corpus-equation-60df624ac580a2e5)

The outer minus sign follows the convention that the interaction enters the action as $-\tfrac12\sum S_{ij}$. It also makes the static like-polarity interaction charge positive, as required by the work integral.

One action convention fixes the interaction units, the static sign, and the boundary charge together.

For $i=j$, the same rule applies with the trivial coincidence branch ($T_1=T_t$) excluded, matching the self-hit convention used throughout this chapter.

The double integral measures interaction links that cross the absolute-time boundary $T$ (past emission side $T_t\le T$ and future reception side $T_1\ge T$). It is the candidate in-flight interaction term for this action scaffold, not yet an energy charge of the canonical Master Equation.

For solutions of an action whose complete variation and boundary treatment are valid, the symmetry-to-conservation argument of [Noether (1918)](https://eudml.org/doc/59024) would give

$$
\frac{d}{dT}\Big(K_{\mu}(T)+E_{\text{wake}}(T)\Big)=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-d18167db9d725e17)

This implication applies to the generating action. Because the scalar action displayed below leaves a nonzero constraint-variation residual on generic branches, the displayed $E_{\text{wake}}$ has not been established as a conserved charge of the canonical Master Equation.

For proof and simulation, the same statement can be written as a residual balance. Let
$$
\mathbf{R}_{A,i}^{(\eta)}(T)
=
\mathbf A_i(T)
-
\mathbf A_{i,\mathrm{act}}^{(\eta)}(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-4452811dbf16959b)

be the acceleration residual of the symmetry-preserving regularized action, where $\mathbf A_{i,\mathrm{act}}^{(\eta)}$ includes the scale term and any nonzero constraint-variation residual from the action. Let $\mathcal{B}_{E}^{(\eta)}(T)$ collect energy flux through finite history-window endpoints, period cuts, and excluded self-coincidence boundaries. Then the candidate action-level energy balance is
$$
\frac{d}{dT}
\left(
K_{\mu}(T)+E_{\text{wake}}^{(\eta)}(T)
\right)
=
\sum_i\mu_{\text{arch}}\mathbf V_i(T)\cdot\mathbf{R}_{A,i}^{(\eta)}(T)
+
\mathcal{B}_{E}^{(\eta)}(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-5504bf1156900600)

For isolated compactly supported or period-matched histories, $\mathbf{R}_{A,i}^{(\eta)}=\mathbf{0}$ and $\mathcal{B}_{E}^{(\eta)}=0$ would give the conserved charge of that action-derived model. A nonzero residual identifies branch-chart loss, nonsymmetric regularization, leakage through the finite memory window, or an unaccounted derivative-of-delta term.

##### Equivalent work-integral form

For direct trajectory evaluation, one may reconstruct a compatible interaction contribution through the accumulated power exchange along the realized trajectory:

$$
U(T)=U_\ast-\int_{T_\ast}^{T}\sum_i \mu_{\text{arch}}\,\mathbf A_i(T')\cdot\mathbf V_i(T')\,dT'
$$

[View →](../../../../equation-mapping.html#corpus-equation-57c967684d4bb221)

This work-integral form is a practical trajectory-level reconstruction when the same action-derived acceleration law and boundary convention are used. It should not be treated as an independent off-shell Noether functional; outside the symmetry-preserving action model it is a diagnostic bookkeeping quantity rather than a proved conserved charge.

In short-delay effective limits, $E_{\text{wake}}$ reduces to an approximate instantaneous pair form

$$
E_{\text{wake}}(T)\approx\sum_{i<j}U_{ij}\big(\mathbf X_i(T),\mathbf X_j(T)\big)
$$

[View →](../../../../equation-mapping.html#corpus-equation-81b824130cd58e2d)

with leading $1/r_{ij}$ behavior plus geometry-dependent self-hit corrections.

**Proposed after:**

For the candidate nonlocal action, define the following candidate interaction statistic and its sum with the quadratic kinetic proxy:

$$
E_{\mathrm{diag}}(T)=K_{\mu}(T)+E_{\mathrm{stat}}(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-2d00bde3ebf3177a)

with

$$
E_{\mathrm{stat}}(T)
=
-\frac{1}{2}\sum_{i,j}
\int_{-\infty}^{T} dT_t
\int_{T}^{\infty} dT_1\,
\partial_{T_1}\mathcal{K}_{ij}(T_1,T_t)
$$

[View →](../../../../equation-mapping.html#corpus-equation-60df624ac580a2e5)

The outer minus sign follows the convention that the interaction enters the action as $-\tfrac12\sum S_{ij}$. It gives the static like-polarity statistic the positive sign of the static work integral. This normalization check does not establish a conserved boundary charge.

A time-translation boundary charge must instead be derived from the complete action variation, including receiver and transmitter appearances and all boundary terms. Denote that as-yet-unsupplied interaction charge by $E_{\mathrm{Noether}}$ to distinguish it from $E_{\mathrm{stat}}$.

For $i=j$, the same rule applies with the trivial coincidence branch ($T_1=T_t$) excluded, matching the self-hit convention used throughout this chapter.

The integration domain contains links with past emission $T_t\le T$ and future reception $T_1\ge T$. Nevertheless, integrating the ordinary derivative of the composed kernel over $T_1$ reduces this statistic, when the upper-time boundary vanishes, to half the ordered reception-time interaction density. On a compact perturbation of a separated static pair, its time derivative differs by a factor of two from the power required by the complete scalar-action variation. Thus this explicit statistic does not satisfy the general action-residual balance below, and $E_{\mathrm{diag}}$ is not thereby a conserved charge.

For solutions of an action whose complete variation and boundary treatment are valid, the symmetry-to-conservation argument of [Noether (1918)](https://eudml.org/doc/59024) would give

$$
\frac{d}{dT}\Big(K_{\mu}(T)+E_{\mathrm{Noether}}(T)\Big)=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-d18167db9d725e17)

This implication requires a boundary charge actually derived from the generating action and closed boundary flux. No such charge is supplied here. Moreover, the scalar action displayed below leaves a nonzero constraint-variation residual on generic branches, so conservation for that action-derived model would not automatically establish conservation for the canonical Master Equation.

Once the complete action variation supplies the time-translation boundary charge $E_{\mathrm{Noether}}^{(\eta)}$, that charge must satisfy a residual balance with the same boundary convention. The explicit statistic above does not supply this charge. Let
$$
\mathbf{R}_{A,i}^{(\eta)}(T)
=
\mathbf A_i(T)
-
\mathbf A_{i,\mathrm{act}}^{(\eta)}(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-4452811dbf16959b)

be the acceleration residual of the symmetry-preserving regularized action, where $\mathbf A_{i,\mathrm{act}}^{(\eta)}$ includes the scale term and any nonzero constraint-variation residual from the action. Let $\mathcal{B}_{E}^{(\eta)}(T)$ collect energy flux through finite history-window endpoints, period cuts, and excluded self-coincidence boundaries. Then the required action-level energy balance is
$$
\frac{d}{dT}
\left(
K_{\mu}(T)+E_{\mathrm{Noether}}^{(\eta)}(T)
\right)
=
\sum_i\mu_{\text{arch}}\mathbf V_i(T)\cdot\mathbf{R}_{A,i}^{(\eta)}(T)
+
\mathcal{B}_{E}^{(\eta)}(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-5504bf1156900600)

If the complete charge derivation is supplied, then for isolated compactly supported or period-matched histories, $\mathbf{R}_{A,i}^{(\eta)}=\mathbf{0}$ and $\mathcal{B}_{E}^{(\eta)}=0$ would give the conserved charge of that action-derived model. A nonzero residual identifies branch-chart loss, nonsymmetric regularization, leakage through the finite memory window, or an unaccounted derivative-of-delta term.

##### Trajectory work-integral reconstruction

For direct trajectory evaluation, one may reconstruct a compatible interaction contribution through the accumulated power exchange along the realized trajectory:

$$
U(T)=U_\ast-\int_{T_\ast}^{T}\sum_i \mu_{\text{arch}}\,\mathbf A_i(T')\cdot\mathbf V_i(T')\,dT'
$$

[View →](../../../../equation-mapping.html#corpus-equation-57c967684d4bb221)

This work-integral form is a practical trajectory-level reconstruction when the same action-derived acceleration law and boundary convention are used. It should not be treated as an independent off-shell Noether functional; outside the symmetry-preserving action model it is a diagnostic bookkeeping quantity rather than a proved conserved charge.

For a separated, slowly varying partner history with controlled delay corrections, the candidate reception-time statistic has an approximate instantaneous pair form

$$
E_{\mathrm{stat}}(T)\approx\sum_{i<j}U_{ij}\big(\mathbf X_i(T),\mathbf X_j(T)\big)
$$

[View →](../../../../equation-mapping.html#corpus-equation-81b824130cd58e2d)

with leading $1/r_{ij}$ behavior. Self-hit contributions and delay corrections require their own root and limit analysis. This approximation does not establish an action-derived charge. Elsewhere in this chapter, $E_{\mathrm{wake}}$ in conditional conservation and no-runaway targets denotes an independently derived interaction charge, not the statistic $E_{\mathrm{stat}}$ displayed here.

## 7. Continuum waves remain a recovery target

**Evidence and limit:** Measured inconsistency: the preceding continuum body asks for a response equation and dispersion derivation, while the summary answers as though wave solutions are available. A supplied independently checked reduction would permit strengthening the summary. No effective wave law is imported into substrate dynamics.

[Original receipt](../../aaa-operations/evidence/ops-031-master-tail-review-2026-10-05.md).

**Before — exact source:**

- **General N‑body analytic solution:** No; the structure is too complex (DDE with state‑dependent delays and self‑hit multiplicity).
- **Idealized / symmetric cases:** Yes, in several important classes:
  - 1D radial two‑body,
  - sub‑$c_f$ circular orbit,
  - uniform circular self‑hit,
  - algebraic maximum‑curvature conditions,
  - continuum/wave limits of the Noether sea.

**Proposed after:**

- **General N‑body analytic solution:** No general closed-form solution is supplied; the law has state-dependent delays and self-hit multiplicity.
- **Idealized / symmetric cases:** Explicit geometric reductions and diagnostic checks are available for one-dimensional radial two-body histories, sub-$c_f$ circular partner geometry, uniform circular self-hit geometry, and algebraic maximum-curvature conditions. These checks do not by themselves establish retained EOM solutions.
- **Effective continuum target:** Derive the Noether sea response equation and its wave solutions from a declared coarse-graining limit.

## 8. Separate continuous retuning from a discrete branch event

**Evidence and limit:** Derived criterion clarification: a static transmitter and receiver range $1+\eta$ have the same unique root identity with emission time $-1-\eta$ and unit transmitter Jacobian for small $\eta$, at $c_f=1$. Continuous constraint data change without a root event. If $\mathcal G$ is intended as an exclusively discrete injective encoding, define it explicitly; the present wording does not do so. Preserve both existing action and closure equations and all open physical obligations.

[Original receipt](../../aaa-operations/evidence/ops-031-nested-shell-dynamics-review-2026-10-05.md).

**Before — exact source:**

If $\Delta\mathcal{C}_{\mathcal{G}}=0$, the retuning stays on the same causal-root ledger. If $\Delta\mathcal{C}_{\mathcal{G}}\neq0$, the event is a branch transition and must be treated as a separator crossing or causal-locus reconnection rather than as smooth single-braid drift.

**Proposed after:**

The first-order closure equation alone does not determine whether the causal-root ledger is preserved. The ledger records the discrete member and root identities and their branch incidence; delays, weights and wake-exchange values are continuous data evaluated on those branches. Smooth retuning must preserve the discrete identities and incidence together with the chart's separation, transversality, separator and stability conditions, while satisfying the continuous closure equation. A nonzero $\Delta\mathcal C_{\mathcal G}$ can be compensated by $D\mathcal C_q[\Delta\mathbf y]$ without changing those identities. A demonstrated change of the discrete branch data requires event analysis; loss of a chart margin requires separate admission or continuation analysis. Neither follows from $\Delta\mathcal C_{\mathcal G}\ne0$ alone.

## Disposition and excluded questions

Recommendation: approve these eight bounded corrections for integration followed by separate verification against their independent references. Approval would cover the explicit replacement passages above, including local propagation within items 3, 4 and 6; it would not authorize a new action derivation or physical result. The failed-statistic counterexample can be included beside item 6 during implementation to make its claim locally checkable; its full derivation remains in the tail receipt.

The tangential-negativity question SP-O1 remains outside this batch: determine whether the controlled spiral cycle is required to return to its initial speed before asserting a universal necessity of negative tangential activity. Item 4 states the frame projection identity and does not resolve that scientific target. The older neutron-dipole and direction-normalization questions and optional scaling exposition also remain separate. Scheduled review coverage and cadence are unchanged.

## Implementation record — October 6

The operator approved all eight corrections and separate verification. All sixteen proposed fragments are implemented with literal TeX preservation. Item 6 additionally propagates the same distinction to the earlier diagnostic cross-reference: the linked nonlocal charge remains a boundary-functional target, and the destination supplies a statistic rather than a derived charge. The [closure receipt](../evidence/ops-031-eight-correction-closure-2026-10-06.md) records both separate reviewers' resolved dispositions, the caught-and-repaired intermediate rendering regression, exact final hashes and focused validation. Earlier before/after text and independent evidence remain preserved. Scientific follow-ups and cadence stay unchanged; CRW-005 remains closed.
