# Support-Complete $M=3$ Tail Execution Ledger

Promotion status: `priority-only`. This packet is the executable ledger for the first unsolved exact-antipodal $M=3$ row. It turns the support-tail interval from [support-complete-m3-tail-resolution-protocol.md](support-complete-m3-tail-resolution-protocol.md), the interval enclosures from [support-complete-m3-tail-interval-enclosures.md](support-complete-m3-tail-interval-enclosures.md), the interval Newton/Krawczyk tests from [support-complete-m3-tail-newton-certificate.md](support-complete-m3-tail-newton-certificate.md), the sensitivity radii from [support-complete-m3-tail-margin-sensitivity.md](support-complete-m3-tail-margin-sensitivity.md), the owned-cell schedule from [support-complete-m3-tail-slab-schedule.md](support-complete-m3-tail-slab-schedule.md), and the arclength-cell lift from [support-complete-m3-tail-mesh-lift.md](support-complete-m3-tail-mesh-lift.md) into one finite certificate object. It does not retain a branch.

The purpose is to make the next computation mathematically decisive. A run may return tail exclusion, tail-root-sheet assimilation, or an explicit tail certificate failure. It may not return another active-window residual and treat that as support-complete dynamics.

---

## 1. Fixed Ledger Inputs

The execution ledger is local to one declared object

$$
\mathsf{L}_{\mathrm{tail}}
=
\left(
\alpha_0,
X_\alpha,
L_*,
K,
\Pi_{\mathrm{src}},
\Pi_{\mathrm{end}},
\Omega_{\mathrm{row}},
\eta_{\mathrm{mem}},
B_{\mathrm{sup}},
m_\eta,
\epsilon_G,
\epsilon_J,
\epsilon_\lambda,
\epsilon_{\mathrm{anti}},
\epsilon_{\mathrm{round}},
\mathsf{id}_{\mathrm{ledger}}
\right).
$$

Here $\alpha_0$ is the exact-antipodal $M=3$ arclength-inverse coefficient vector, $X_\alpha$ is either the point vector or a coefficient box around it, $L_*$ is the common arclength period, $K$ is the collocation count, $\Pi_{\mathrm{src}}$ is the ordered source-pair policy, $\Pi_{\mathrm{end}}$ is the endpoint convention, and $\Omega_{\mathrm{row}}$ is the row-weight convention. The ledger identity $\mathsf{id}_{\mathrm{ledger}}$ must match the dynamics, action, Krawczyk, event, stability, and inventory rows that consume this certificate.

For the current $\rho=0.8$ exact-antipodal $M=3$ row,

$$
\eta_{\mathrm{mem}}=4.5,
\qquad
B_{\mathrm{sup}}\approx5.5211575250,
$$

so the support-tail interval is

$$
T_{\mathrm{tail}}
=
(4.5,\ 5.5211575250+m_\eta].
$$

The active root margin

$$
4.5-\eta_{\mathrm{act}}
\approx
0.0941845064
$$

is not a support-complete certificate. It only says the currently emitted active roots fit inside the chosen memory window.

---

## 2. Atomic Tail Cells

The run chooses a finite slab cover

$$
T_{\mathrm{tail}}
\subset
\bigcup_q Q_q,
\qquad
Q_q=[a_q,b_q].
$$

The arithmetic slabs $Q_q$ are closed interval hulls, but the ledger also declares disjoint owned sets

$$
O_q\subseteq Q_q,
\qquad
T_{\mathrm{tail}}=\bigsqcup_q O_q.
$$

For the first slab, the owned set must respect the open-left memory boundary:

$$
O_0=(\eta_{\mathrm{mem}},b_0],
$$

while later slabs may use half-open ownership such as

$$
O_q=(a_q,b_q].
$$

Closed hulls are used for outward-rounded interval arithmetic; owned sets decide label assignment. A root whose isolating bracket touches $\eta_{\mathrm{mem}}$ is not automatically a tail root. It must either be matched to an already active bracket on the declared endpoint convention or the row exits with

$$
\texttt{tail-boundary-convention-failed}.
$$

The collocation cells are

$$
\lambda_n=\frac{nL_*}{K},
\qquad
h_K=\frac{L_*}{K},
\qquad
I_n=
\left[
\lambda_n-\frac{h_K}{2},
\lambda_n+\frac{h_K}{2}
\right]\pmod{L_*}.
$$

For each required ordered pair $(i,j)\in\Pi_{\mathrm{src}}$, node $n$, and slab $q$, the nodewise root function is

$$
G_{ij,n}(\eta)
=
\|\mathbf{Y}_i(\lambda_n)-\mathbf{Y}_j(\lambda_n-\eta)\|
-\eta,
$$

and the arclength-cell root function is

$$
G_{ij}(\lambda,\eta)
=
\|\mathbf{Y}_i(\lambda)-\mathbf{Y}_j(\lambda-\eta)\|
-\eta.
$$

An atomic tail cell is

$$
c=(i,j,n,q,s),
\qquad
\mathcal{Q}_c=I_{n,s}\times Q_{q,s},
$$

where $s$ records any required period-cut or phase-splitting subdivision. Every atomic cell must receive exactly one of the following statuses:

| Atomic status | Meaning |
| --- | --- |
| `tail-cell-empty-distance` | interval distance excludes $G=0$ on the cell |
| `tail-cell-empty-monotone` | monotone endpoint signs exclude $G=0$ on the cell |
| `tail-cell-empty-lipschitz` | a point value and Lipschitz radius exclude $G=0$ on the cell |
| `tail-cell-empty-newton` | interval Newton image is disjoint from the cell delay interval |
| `tail-cell-root-tube` | one root tube is isolated and assimilated on the cell |
| `tail-root-tube-krawczyk` | parametric Krawczyk inclusion certifies a unique root sheet over the arclength cell |
| `tail-cell-uncertified` | no root-free or root-tube certificate passed |

The nodewise statuses in the older protocol are not enough for this ledger. The executable object is cell-level because support-complete force and action rows are curve-level statements.

---

## 3. Certificate Margins

For each atomic cell, the run emits phase intervals, curve intervals, distance intervals, Jacobian intervals, endpoint values, and a selected certificate margin. Let

$$
D_c=[D_c^-,D_c^+]
\supset
\|\mathbf{Y}_i(\lambda)-\mathbf{Y}_j(\lambda-\eta)\|,
\qquad
(\lambda,\eta)\in\mathcal{Q}_c,
$$

and

$$
J_c=[J_c^-,J_c^+]
\supset
1-\mathbf{T}_j(\lambda-\eta)\cdot\widehat{\mathbf{R}}_{ij}(\lambda,\eta).
$$

The distance-exclusion margin is

$$
m_{\mathrm{dist}}(c)
=
\max
\left\{
a_q-\epsilon_G-D_c^+,\,
D_c^- - b_q-\epsilon_G
\right\}.
$$

If $m_{\mathrm{dist}}(c)>0$, then $\mathcal{Q}_c$ is root-free.

For a monotone test, define

$$
m_J(c)
=
\max\{J_c^--\epsilon_J,\,-J_c^+-\epsilon_J\}.
$$

Let endpoint intervals be

$$
G(a_q)\in[\underline{G}_a,\overline{G}_a],
\qquad
G(b_q)\in[\underline{G}_b,\overline{G}_b].
$$

The same-sign endpoint margin is

$$
m_{\mathrm{end}}(c)
=
\max
\left\{
\min\{\underline{G}_a,\underline{G}_b\}-\epsilon_G,\,
\min\{-\overline{G}_a,-\overline{G}_b\}-\epsilon_G
\right\}.
$$

If $m_J(c)>0$ and $m_{\mathrm{end}}(c)>0$, the cell is root-free by monotonicity.

For a point-Lipschitz test, choose $z_c=(\lambda_c,\eta_c)\in\mathcal{Q}_c$, let

$$
G(z_c)\in[\underline{G}_c,\overline{G}_c],
$$

and set

$$
g_c
=
\begin{cases}
\min\{|\underline{G}_c|,|\overline{G}_c|\}, & 0\notin[\underline{G}_c,\overline{G}_c],\\
0, & 0\in[\underline{G}_c,\overline{G}_c].
\end{cases}
$$

If

$$
|\nabla_{\lambda,\eta}G|\le L_c
\quad\text{on}\quad
\mathcal{Q}_c
$$

and $\Delta_c$ is the maximum distance from $z_c$ to any point of the cell in the chosen rectangle norm, then

$$
m_{\mathrm{lip}}(c)
=
g_c-L_c\Delta_c-\epsilon_G.
$$

If $m_{\mathrm{lip}}(c)>0$, the cell is root-free.

The selected empty-cell margin is

$$
m_{\emptyset}(c)
=
\max
\left\{
m_{\mathrm{dist}}(c),\,
\min\{m_J(c),m_{\mathrm{end}}(c)\},\,
m_{\mathrm{lip}}(c),\,
m_{\mathrm{Newt}}(c)
\right\}.
$$

The status is an empty status only when $m_{\emptyset}(c)>0$ and the row identifies which predicate attained the positive margin.

---

## 4. Root-Tube Assimilation Margins

If a sign change occurs and the Jacobian interval excludes zero, the ledger may assimilate a root tube. A root tube is a pair

$$
\mathcal{T}_u
=
\{(\lambda,\eta):\lambda\in I_{n,s},\ \eta\in I_u(\lambda)\},
$$

with center sheet $\eta_u(\lambda)$ satisfying

$$
G_{ij}(\lambda,\eta_u(\lambda))=0.
$$

The tube row must emit:

| Field | Required payload |
| --- | --- |
| `root_tube_label` | source pair, node cell, slab, and antipodal mate |
| `tube_interval` | $\eta$ interval enclosing $\eta_u(I_{n,s})$ |
| `jacobian_floor` | $|J_{ij}|\ge J_u^->\epsilon_J$ on the tube |
| `jacobian_sign_stratum` | fixed $\zeta_u=\operatorname{sign}J_u$ with $\zeta_uJ_u\ge J_u^-$ |
| `tube_gap` | excluded-gap lower bound on $\mathcal{Q}_c\setminus\mathcal{T}_u$ |
| `tube_separation` | separation from active tubes, other tail tubes, and slab boundaries |
| `sheet_slope` | bound for $|\eta_u'(\lambda)|$ |
| `sheet_variation` | pointer to derivative rows consumed by [support-complete-m3-root-sheet-variations.md](support-complete-m3-root-sheet-variations.md) |

The sheet derivative is

$$
\eta_u'(\lambda)
=
\frac{
\widehat{\mathbf{R}}_u\cdot
\left(
\mathbf{T}_i-\mathbf{T}_j^-
\right)
}{
J_u
}.
$$

With a cellwise derivative bound $|\partial_\lambda G|\le L_{\lambda,c}$ and Jacobian floor $J_u^-$, define the tube-continuation margin

$$
m_{\mathrm{tube}}(u)
=
\Delta_u
-
\frac12
\frac{L_{\lambda,c}}{J_u^-}
h_{K,s}
-
\epsilon_\lambda,
$$

where $\Delta_u$ is the minimum room between the node bracket and the tube boundary or any competing root label. The root tube is assimilated only when

$$
J_u^->\epsilon_J,
\qquad
m_{\mathrm{tube}}(u)>0,
\qquad
g_u^{\mathrm{comp}}>\epsilon_G,
$$

where $g_u^{\mathrm{comp}}$ is the excluded-gap margin on the complement of all retained tubes in the atomic cell.

---

## 5. Exact-Antipodal Pairing Row

The exact-antipodal chart requires every tail tube to have a paired image under the declared antipodal involution. If $u^\iota$ is the matched tube, define

$$
d_{\mathrm{anti}}(u)
=
\operatorname{dist}\big(I_u,\iota I_{u^\iota}\big),
$$

using the same delay interval metric as the bracket ledger. The pairing margin is

$$
m_{\mathrm{anti}}(u)
=
\epsilon_{\mathrm{anti}}-d_{\mathrm{anti}}(u).
$$

The pairing row passes only if

$$
m_{\mathrm{anti}}(u)>0
$$

for every assimilated tail tube and the source-pair labels match the declared pair policy. Failure here is

$$
\texttt{tail-antipodal-closure-failed}.
$$

It is not relaxation evidence. It means the exact-antipodal tail ledger has not been certified.

### Symmetry Compression Row

When the source-pair policy, endpoint convention, cell cover, and arclength grid are closed under the involution $i\mapsto\iota i$, one atomic cell may be certified as the representative of its antipodal mate. For

$$
c=(i,j,n,q,s),
\qquad
c^\iota=(\iota i,\iota j,n,q,s),
$$

exact antipodality gives

$$
\mathbf{R}_{c^\iota}(\lambda,\eta)
=
-\mathbf{R}_{c}(\lambda,\eta),
\qquad
\widehat{\mathbf{R}}_{c^\iota}(\lambda,\eta)
=
-\widehat{\mathbf{R}}_{c}(\lambda,\eta),
$$

and

$$
G_{c^\iota}(\lambda,\eta)=G_c(\lambda,\eta),
\qquad
J_{c^\iota}(\lambda,\eta)=J_c(\lambda,\eta).
$$

Therefore distance bounds, endpoint signs, monotonicity margins, Lipschitz constants, root brackets, Jacobian floors, and normalized tail errors are copied exactly from $c$ to $c^\iota$:

$$
m_{\emptyset}(c^\iota)=m_{\emptyset}(c),
\qquad
E_{\emptyset}(c^\iota)=E_{\emptyset}(c),
$$

and, for a root tube,

$$
m_{\mathrm{root}}(u^\iota)=m_{\mathrm{root}}(u),
\qquad
E_{\mathrm{tube}}(u^\iota)=E_{\mathrm{tube}}(u).
$$

The force vectors remain pair-odd, because the polarity product is pair-even while $\widehat{\mathbf{R}}$ is pair-odd:

$$
\mathbf{f}_{u^\iota}=-\mathbf{f}_u.
$$

This row is a computation reduction, not a proof shortcut. The ledger must still emit both labels and both owned cells. If any source pair, endpoint ownership, period split, or coefficient-box inflation differs between $c$ and $c^\iota$, the copied certificate is invalid and the row exits with

$$
\texttt{tail-antipodal-compression-invalid}.
$$

---

## 6. Normalized Tail Error

Every atomic certificate is recorded as a positive margin plus a certified numerical error. For an empty cell, let

$$
e_{\emptyset}(c)
=
\epsilon_{\mathrm{round}}(c)
+\epsilon_{\mathrm{phase}}(c)
+\epsilon_{\mathrm{coeff}}(c)
+\epsilon_{\mathrm{mesh}}(c),
$$

where the four terms bound outward-rounding, inverse-phase endpoint uncertainty, coefficient-box inflation, and arclength-cell lift error. The normalized empty-cell error is

$$
E_{\emptyset}(c)
=
\frac{e_{\emptyset}(c)}{m_{\emptyset}(c)}.
$$

For an assimilated tube, define

$$
e_{\mathrm{tube}}(u)
=
\epsilon_{\mathrm{round}}(u)
+\epsilon_{\mathrm{phase}}(u)
+\epsilon_{\mathrm{coeff}}(u)
+\epsilon_{\mathrm{sheet}}(u),
$$

and

$$
m_{\mathrm{root}}(u)
=
\min
\left\{
J_u^- - \epsilon_J,\,
m_{\mathrm{tube}}(u),\,
g_u^{\mathrm{comp}}-\epsilon_G,\,
m_{\mathrm{anti}}(u)
\right\}.
$$

The normalized tube error is

$$
E_{\mathrm{tube}}(u)
=
\frac{e_{\mathrm{tube}}(u)}{m_{\mathrm{root}}(u)}.
$$

The executable tail error is

$$
E_{\mathrm{tail}}^{\mathrm{exec}}
=
\max
\left\{
\max_{c\in\mathcal{C}_{\emptyset}}E_{\emptyset}(c),\,
\max_{u\in\mathcal{U}^{\mathrm{tail}}}E_{\mathrm{tube}}(u)
\right\}.
$$

A cell or tube with nonpositive denominator is not assigned a large finite value. It is assigned status `tail-cell-uncertified` or `tail-root-tube-uncertified`, and the whole row fails before any dynamics/action row is interpreted.

This is the tail entry that feeds the master error in [support-complete-m3-master-retention-theorem.md](support-complete-m3-master-retention-theorem.md):

$$
E_{\mathrm{tail}}
=
E_{\mathrm{tail}}^{\mathrm{exec}}.
$$

The same export must declare whether the certificate is pointwise or ball-persistent:

$$
\operatorname{persist}(\mathsf{L}_{\mathrm{tail}})
\in
\{
\texttt{pointwise},
\texttt{coefficient-box}
\}.
$$

The status `pointwise` is acceptable for deciding whether the current sampled branch row is still active-window-only, but it is not enough for a Krawczyk or master-retention proof. Those rows require `coefficient-box`, meaning every empty-cell or root-tube predicate remains true for all $\alpha\in X_\alpha$ under the arclength-inverse coefficient-box inflation, including inverse-phase and tangent variation terms. If a certificate is pointwise only, the downstream primary status is

$$
\texttt{tail-certificate-pointwise-only}.
$$

The coefficient-box check imports the fixed-delay, Jacobian, Newton-image, and Krawczyk-image sensitivity bounds from [support-complete-m3-tail-margin-sensitivity.md](support-complete-m3-tail-margin-sensitivity.md). The ledger is master-eligible only after the limiting predicate and positive radius $\rho_{\mathrm{tail}}$ are emitted on the same $\mathsf{id}_{\mathrm{ledger}}$.

The master export also records

$$
\mathsf{E}_{\mathrm{tail}}^{\mathrm{master}}
=
\left(
E_{\mathrm{tail}},
E_{\mathrm{sheet}},
\eta_{\min},
J_{\min},
g_{\min},
s_{\min},
B_{\mathrm{sup}},
\operatorname{persist}(\mathsf{L}_{\mathrm{tail}})
\right),
$$

where $E_{\mathrm{sheet}}=0$ on a pure tail-exclusion row and otherwise comes from the root-sheet variation packet. These fields are the tail and sheet entries of $\mathfrak{E}_{M3}^{\mathrm{EA}}$.

---

## 7. Force Ledger Export

If every atomic cell is empty, the support-complete root ledger remains

$$
\mathcal{A}_{\eta}^{\mathrm{sup}}
=
\mathcal{A}_{4.5},
$$

and the tail force error is

$$
\epsilon_{\mathcal{F}}^{\mathrm{tail}}=0.
$$

The primary tail status is

$$
\texttt{tail-exclusion-restored}.
$$

If one or more root tubes are assimilated, the support-complete ledger becomes

$$
\mathcal{A}_{\eta}^{\mathrm{sup}}
=
\mathcal{A}_{4.5}
\cup
\mathcal{U}^{\mathrm{tail}},
$$

and the force row becomes

$$
\widetilde{\mathbf{F}}_i^{+}(\lambda)
=
\widetilde{\mathbf{F}}_i^{\mathrm{act}}(\lambda)
+
\sum_{u\in\mathcal{U}_i^{\mathrm{tail}}(\lambda)}
\frac{\sigma_i\sigma_{j(u)}}{\eta_u(\lambda)^2|J_u(\lambda)|}
\widehat{\mathbf{R}}_u(\lambda).
$$

The ledger must also emit derivative envelopes

$$
D\widetilde{\mathbf{F}}^{+},
\qquad
D\mathcal{R}_K^{+},
\qquad
D\Gamma_B^{+},
\qquad
L_R^{+}.
$$

The primary tail status is then

$$
\texttt{tail-root-sheet-assimilated}.
$$

The old active-window dynamics, action, and Krawczyk values are stale after this status. Until they are recomputed with $\widetilde{\mathbf{F}}^{+}$ and the root-sheet derivative envelopes, the composite solve status is

$$
\texttt{tail-root-sheet-assimilated-rerun-required}.
$$

If the roots are only found at nodes, the run may emit the diagnostic status

$$
\texttt{tail-roots-assimilated-nodewise}
$$

but this is not a support-complete dynamics input. It must still pass the arclength-cell tube row.

---

## 8. First-Blocker Theorem

**Theorem target: executable support-tail first blocker.** Fix $\mathsf{L}_{\mathrm{tail}}$ and the current exact-antipodal $M=3$ coefficient vector. Suppose the active ledger $\mathcal{A}_{4.5}$ is regular inside the memory window, but the support-tail ledger has at least one atomic cell with status `tail-cell-uncertified` or one root tube with nonpositive root margin. Then every downstream exact-antipodal $M=3$ dynamics, action, Krawczyk, obstruction, mode-refinement, event, or stability row computed without resolving that cell is an active-window diagnostic only. Its primary master status remains

$$
\texttt{active-window-only}.
$$

If instead every atomic cell is either certified empty with $E_{\emptyset}(c)<1$ or assimilated as a paired root tube with $E_{\mathrm{tube}}(u)<1$, then the support-tail row is no longer the first failing master row. The next valid computation is the support-complete corrector on $\mathcal{A}_{\eta}^{\mathrm{sup}}$, followed by action, Krawczyk, convergence, Noether/event, and stability rows on the same ledger identity.

Proof route:

1. The finite cell cover reduces support completeness on $T_{\mathrm{tail}}$ to finitely many root-exclusion or root-tube predicates.
2. Positive empty-cell margins exclude roots by interval containment, monotonicity, or Lipschitz domination.
3. Positive tube margins and $J$ floors give differentiable root sheets by the implicit function theorem.
4. Exact-antipodal pairing preserves the declared chart symmetry.
5. The normalized inequalities $E_{\emptyset}<1$ and $E_{\mathrm{tube}}<1$ absorb the declared numerical errors into the positive margins.
6. Therefore no omitted support-tail contribution remains. Conversely, an uncertified cell can contain an omitted root with unbounded force error under the current data, so downstream residuals cannot be interpreted as support-complete.

---

## 9. Minimal Output Schema

A tail execution run must emit the following fields:

| Field | Payload |
| --- | --- |
| `ledger_id` | shared root, memory, source-pair, endpoint, action, event, inventory, and weight convention |
| `tail_interval` | $(4.5,5.5211575250+m_\eta]$ for the current row, or the declared support-bound interval |
| `tail_cover` | closed arithmetic slabs $Q_q$, disjoint owned sets $O_q$, and endpoint ownership at $\eta_{\mathrm{mem}}$ |
| `atomic_cells` | period-split list of $(i,j,n,q,s)$ cells covering all required pairs and arclength cells |
| `phase_rows` | $\Theta$ intervals, inverse-phase residuals, speed floors, and coefficient-box flags |
| `distance_rows` | $D_c^-,D_c^+$ and $m_{\mathrm{dist}}(c)$ |
| `jacobian_rows` | $J_c^-,J_c^+$, $m_J(c)$, and normalization floors for $\widehat{\mathbf{R}}$ |
| `endpoint_rows` | endpoint intervals and $m_{\mathrm{end}}(c)$ |
| `lipschitz_rows` | $z_c$, $g_c$, $L_c$, $\Delta_c$, and $m_{\mathrm{lip}}(c)$ |
| `newton_rows` | interval Newton images, Krawczyk tube images, $m_{\mathrm{Newt}}(c)$, and $m_{\mathrm{Kraw}}(u)$ when used |
| `selected_cell_status` | one atomic status for every cell, with positive selected margin |
| `root_tubes` | tube labels, delay intervals, $J$ floors, fixed $J$ sign strata, tube slopes, complement gaps, separations, and derivative-envelope pointers |
| `antipodal_pairing` | paired labels and $m_{\mathrm{anti}}(u)$ |
| `antipodal_compression` | representative cells, copied mate cells, and equality of $G$, $J$, margins, and coefficient-box inflation |
| `normalized_tail_error` | $E_{\mathrm{tail}}^{\mathrm{exec}}$ and rowwise denominators |
| `coefficient_box_persistence` | `pointwise` or `coefficient-box`, with arclength-inverse inflation terms |
| `master_error_exports` | $E_{\mathrm{tail}}$, $E_{\mathrm{sheet}}$, $\eta_{\min}$, $J_{\min}$, $g_{\min}$, $s_{\min}$, and $B_{\mathrm{sup}}$ |
| `force_export` | $\mathcal{A}_{\eta}^{\mathrm{sup}}$, $\widetilde{\mathbf{F}}^{+}$, derivative envelopes, and $\epsilon_{\mathcal{F}}^{\mathrm{tail}}$ |
| `tail_status` | `tail-exclusion-restored`, `tail-root-sheet-assimilated`, `tail-root-sheet-assimilated-rerun-required`, `tail-certificate-pointwise-only`, `tail-antipodal-compression-invalid`, or `tail-certificate-failure` |

The schema is deliberately redundant: the same margin appears both in the mathematical predicate and in the normalized error denominator. A run that emits only roots, only plotted signs, or only sampled residuals has not produced this ledger.

---

## 10. Current $M=3$ Reading

The current exact-antipodal $M=3$ branch has not emitted $\mathsf{L}_{\mathrm{tail}}$. Its mathematical status remains

$$
\texttt{active-window-only},
\qquad
\texttt{tail-force-error-unbounded},
\qquad
\texttt{not-retained}.
$$

The next successful mathematical status is one of

$$
\texttt{tail-exclusion-restored}
$$

or

$$
\texttt{tail-root-sheet-assimilated}.
$$

Only after one of those statuses passes with a shared ledger identity may the exact-antipodal $M=3$ corrector, action-scale row, Krawczyk proof budget, and master-retention rows be read as support-complete dynamics rather than active-window diagnostics.
