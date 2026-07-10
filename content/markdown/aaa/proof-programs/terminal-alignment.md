# Terminal Alignment

This proof program carries the strong-field endpoint of the braid stack: the braid symmetry-breaking point, the local black-hole duality target, and the horizon-interface entropy counting whose comparison target is the area-normalized label entropy $\bar\alpha_{\mathrm{align}}\to1/4$. The program was developed on the nested shell braid realization of [Explored Braid Geometries](../noether-braid/explored-braid-geometries.md#nested-shell-braid) — its labels and restrictions are stated on that family's three-band scaffold and closure label $\Lambda_{\text{NS}}$ — and it is stated here so that its targets, transfer-matrix machinery, and recorded negative results survive that family's demotion intact. The alignment condition itself (coplanarity and co-linearity at field speed, precession ceasing) is a whole-assembly statement that any retained braid family must either realize or replace; re-hosting the program onto the [spindle braid](../noether-braid/spindle-braid.md) terminal behavior is an open obligation of the leading-candidate track.

Downstream consumers: [Entropy](../dynamics/entropy.md) consumes the label-count target; [Master Equation](../dynamics/master-equation.md) consumes the common-center stationarity obstruction lemma; [Black Holes](../spacetime/black-holes.md), [Singularity Resolution](../spacetime/singularity-resolution.md), and [Horizon Chirality](../spacetime/horizon-chirality.md) consume the alignment condition and duality pattern.

## Braid Symmetry-Breaking Point

The **braid symmetry-breaking point** is the braid-level version of the single-binary field-speed threshold. A single binary crosses the symmetry-breaking point when its branch reaches the $c_f$ hinge and same-source roots can turn on. A whole nested shell braid reaches its braid symmetry-breaking point only when the outer coupling layer is also driven into terminal alignment with the middle hinge while the inner binary remains in the self-hit interior row.

The working condition is

$$
s_I>c_f,
\qquad
s_M=c_f,
\qquad
s_O\to c_f,
\qquad
d_{\mathrm{align}}(q)\to0,
$$

with $d_{\mathrm{align}}$ measuring coplanarity, co-linearity, and precession cessation in the declared branch coordinates. This is not the statement that all three binaries become identical. Since

$$
s_\ell=\omega_\ell\rho_\ell,
$$

the middle and outer binaries can share the same threshold speed while retaining different frequencies, effective lever arms, energies, or action shares. Equality of speed is a causal-regime statement. Equality of radius, frequency, energy, or action would be additional branch structure that must be derived from the retained energy/action ledger.

At the braid symmetry-breaking point, the outer binary stops functioning as an ordinary sub-field-speed shielding envelope and becomes part of the interface row. The middle binary remains the hinge. The inner binary does not need to "reach" the hinge because it is already beyond it: it supplies the self-hit, maximal-curvature, history-supported row. This is why the threshold is the natural local precursor to horizon-interface language rather than a mere three-frequency coincidence.


## Local Black-Hole Duality Target

The nested shell braid should also be read as carrying the local black-hole dual inside its branch structure. This is not the claim that every Noether braid is an astrophysical black hole, and it does not import conventional primordial-black-hole population models. The claim is narrower: the nested shell braid already contains the same regime split that a macroscopic black hole exposes at large scale.

| Nested shell braid row | Local branch condition | Black-hole dual row |
| :--- | :--- | :--- |
| Inner binary | $s_I>c_f$ with accepted same-source roots | interior self-hit and maximal-curvature row |
| Middle binary | $s_M=c_f$ in the accepted threshold limit | horizon-interface and symmetry-breaking row |
| Outer binary | $s_O<c_f$ in ordinary operation, with $s_O\to c_f$ under terminal strong-field alignment | exterior coupling row driven toward the interface during collapse |

In this precise sense, a nested shell braid contains a primordial black-hole analogue: a finite local version of the horizon/interior split before that split is amplified into an observer-level compact object. The middle binary supplies the threshold interface, while the inner self-hit binary supplies the beyond-threshold interior row. The phrase "primordial black-hole analogue" is therefore a statement about nested shell braid ontology, not a claim that the standard primordial-black-hole model supplies the source mechanism.

The exact-duality theorem target is to construct a map from one retained branch record to one strong-field horizon record,

$$
\mathcal{D}_{\mathrm{BH}}:
B_q
\longmapsto
\left(
\mathcal{B}_{H}^{(q)},
\mathcal{L}_{\mathrm{int}}^{(q)},
\mathcal{L}_{\mathrm{rel}}^{(q)}
\right),
$$

where $\mathcal{B}_{H}^{(q)}$ is the horizon-interface label set inherited from the branch, $\mathcal{L}_{\mathrm{int}}^{(q)}$ is the retained self-hit interior ledger, and $\mathcal{L}_{\mathrm{rel}}^{(q)}$ is the release or exterior-coupling ledger. A useful residual has to vanish on the same root ledger:

$$
\mathcal{R}_{q\leftrightarrow H}
=
\max\left(
\left|1-\frac{s_M}{c_f}\right|,
\max\left(0,1-\frac{s_I}{c_f}\right),
d_{\mathrm{align}}(q),
d_{\mathrm{led}}\left(\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)},0\right),
d_{\mathrm{rel}}\left(\mathcal{L}_{\mathrm{rel}}^{(q)},\mathcal{B}_{H}^{(q)}\right)
\right).
$$

Here $d_{\mathrm{align}}$ measures coplanarity, co-linearity, and precession cessation in the declared branch coordinates; $d_{\mathrm{led}}$ measures energy, momentum, and angular-momentum ledger closure; and $d_{\mathrm{rel}}$ measures whether the release or exterior-coupling rows are inherited from the same horizon-interface label set rather than added as a second story. The duality claim is retained only if this residual closes with the branch dynamics. Otherwise the black-hole comparison remains a suggestive regime analogy, not an exact result.


## Terminal Alignment Label-Count Target

The intuition is that a horizon-adjacent region should not be counted by arbitrary visual tiles. It should be counted by the retained branch labels that can actually sit next to one another without breaking layer closure, wake exchange, chirality, or the observer record. The formal set and transfer matrix below are a way to count only compatible branch records.

The black-hole entropy route requires a dynamics-side label calculation. Once a nested shell braid branch is driven to terminal alignment, the dynamics should output the admissible alignment-restricted closure labels and their neighbor-compatibility rules. For a connected block $U$ of horizon-adjacent alignment patches, the object is

$$
\mathcal{L}_U(\theta)
=
\left\{
\left(\Lambda_{\text{NS},a}^{\mathrm{align}}\right)_{a\in U}
:
\text{all layer ledgers close, edge wake ledgers match, and } \theta \text{ is preserved}
\right\}
/
\sim_{O,\theta,W}
$$

The first calculation route is a transfer-compatibility problem. Fix a local strip direction $\nu$ on the horizon-adjacent interface. Let $\Lambda_{\theta}^{\mathrm{loc}}$ be the set of one-patch labels $\lambda$ obtained from $\Lambda_{\text{NS}}^{\mathrm{align}}$ after imposing one-patch layer closure, terminal-alignment conditions, and the Physical Observer quotient for the declared record $\theta$. Each $\lambda\in\Lambda_{\theta}^{\mathrm{loc}}$ carries two edge projections $\mathcal{E}_{\nu}^{-}(\lambda)$ and $\mathcal{E}_{\nu}^{+}(\lambda)$: the active causal-root, winding, emission-order, Jacobian-branch, and wake-exchange data presented to the two neighboring patches in the $\nu$ direction.

Define the pair-compatibility predicate $\mathcal{C}_{\theta,\nu}(\lambda,\lambda')$ to hold exactly when:

- $\mathcal{E}_{\nu}^{+}(\lambda)=\mathcal{E}_{\nu}^{-}(\lambda')$ up to the declared observer tolerance,
- the edge balance satisfies $(\Delta E,\Delta\mathbf{p},\Delta\mathbf{J},\Delta q)_{\lambda,\lambda'}=(0,\mathbf{0},\mathbf{0},0)$,
- the chirality entry $\chi_c$ and axial-frame orientation remain compatible under the coplanar/co-linear terminal-alignment condition,
- and the combined pair projects to the same observer record, $\mathcal{R}_{O,W}(\lambda,\lambda')=\mathcal{R}_{O,W}^{\theta}$.

The first counting matrix is therefore
$$
\left(\mathsf{T}_{\theta,\nu}\right)_{\lambda\lambda'}
=
\begin{cases}
1, & \mathcal{C}_{\theta,\nu}(\lambda,\lambda'),\\
0, & \text{otherwise},
\end{cases}
\qquad
\lambda,\lambda'\in\Lambda_{\theta}^{\mathrm{loc}}
$$
This is a counting matrix, not a thermodynamic weight. For an open strip of $N$ patches,
$$
\left|\mathcal{L}_{[1,N]}(\theta)\right|
=
\mathbf{1}^{T}
\mathsf{T}_{\theta,\nu}^{N-1}
\mathbf{1}
+
\mathcal{O}(\epsilon_{\mathrm{edge}})
$$
while a periodic strip uses $\mathrm{Tr}(\mathsf{T}_{\theta,\nu}^{N})$. If the label set is finite and the transfer rule is local, the strip entropy density is
$$
s_{\mathrm{align}}(\theta;\nu)
=
\lim_{N\to\infty}
\frac{1}{N}
\log\left|\mathcal{L}_{[1,N]}(\theta)\right|
=
\log\rho(\mathsf{T}_{\theta,\nu})
$$
where $\rho$ is the spectral radius. In a two-dimensional patch network the same target becomes the subadditive pressure
$$
s_{\mathrm{align}}(\theta)
=
\lim_{|U|\to\infty}
\frac{1}{|U|}
\log\left|\mathcal{L}_U(\theta)\right|
$$
with the limit taken over blocks whose boundary-to-area ratio vanishes.

One algebraic obstruction fixes the status of the raw label-density target. A single finite unweighted or algebraic-weighted transfer matrix cannot by itself yield an exact raw coefficient $s_{\mathrm{align}}=1/4$: the spectral radius $\rho(\mathsf{T}_{\theta,\nu})$ is algebraic, while $\log\rho=1/4$ would require $\rho=e^{1/4}$, which is transcendental by Lindemann-Weierstrass. The black-hole coefficient is therefore the area-normalized density, not the raw label density by itself. If $A_{\theta}(U)$ is the effective observer-level area represented by a block and $A_{\text{align}}$ is the alignment-area scale from the Planck-alignment map, define
$$
a_{\theta}
=
\lim_{|U|\to\infty}
\frac{A_{\theta}(U)}
{|U|A_{\text{align}}},
\qquad
\bar{\alpha}_{\mathrm{align}}(\theta)
=
A_{\text{align}}
\lim_{|U|\to\infty}
\frac{\log|\mathcal{L}_U(\theta)|}{A_{\theta}(U)}
=
\frac{s_{\mathrm{align}}(\theta)}{a_{\theta}}
$$
The horizon target is
$$
\bar{\alpha}_{\mathrm{align}}(\theta)
\longrightarrow
\frac{1}{4}
$$
The special raw statement $s_{\mathrm{align}}\to1/4$ is valid only when the terminal branch also derives $a_{\theta}\to1$. Exact recovery can therefore come from an asymptotic transfer system, a weighted pressure, a block-density limit with derived area normalization, or an explicitly approximate tolerance target rather than one fixed counting matrix. A finite computation should report a convergence criterion of the form
$$
\left|
\frac{s_N(\theta)}{a_N(\theta)}
-
\frac{1}{4}
\right|
\le
C\frac{|\partial U_N|}{|U_N|}
+
\epsilon_{\mathrm{branch}}
+
\epsilon_{\mathrm{quot}}
$$
where $a_N(\theta)=A_{\theta}(U_N)/(|U_N|A_{\text{align}})$. This tests the area coefficient as a controlled limit rather than hiding it inside one finite count.

**Finite-block coefficient enumerator.** A reduced enumerator can now report the coefficient target without pretending to solve the full terminal dynamics. For a finite connected block $U_N$ of candidate labels, compute
$$
s_N(\theta)
=
\frac{1}{|U_N|}
\log|\mathcal{L}_{U_N}(\theta)|,
\qquad
a_N(\theta)
=
\frac{A_{\theta}(U_N)}
{|U_N|A_{\text{align}}},
\qquad
\bar{\alpha}_N(\theta)
=
\frac{s_N(\theta)}{a_N(\theta)}
$$
The finite-block residual vector is
$$
\mathcal{R}_{\mathrm{coeff}}(U_N,\theta)
=
\left(
\left|\bar{\alpha}_N(\theta)-\frac{1}{4}\right|,
\frac{|\partial U_N|}{|U_N|},
\epsilon_{\mathrm{branch}},
\epsilon_{\mathrm{area}},
\epsilon_{\mathrm{quot}},
\epsilon_{\mathrm{cons}},
\epsilon_{\mathrm{var}}
\right)
$$
Here $\epsilon_{\mathrm{area}}$ records how much the patch-area assignment varies across the retained block, $\epsilon_{\mathrm{cons}}$ is the conservation-ledger residual, and $\epsilon_{\mathrm{var}}$ is the action-variation residual inherited from the terminal branch scaffold below. This object is the right simulation output: it can pass, fail, or converge under refinement without turning the coefficient into a definition.

**Reduced-adapter status.** The reduced circular packet family does not converge to the target coefficient. In the tested $3\le n\le5$ packets, the edge proxy gives
$$
\bar{\alpha}_8=0.22397,
\qquad
\bar{\alpha}_{16}=0.11198,
\qquad
\bar{\alpha}_{32}=0.05599
$$
while the widened $3\le n\le6$ packet gives
$$
\bar{\alpha}_{16}=0.14391,
\qquad
\bar{\alpha}_{32}=0.07196
$$
These values scale like a finite-label open-strip count divided by block length, with asymptotic proxy coefficient $0$, rather than trending toward $1/4$. Coarse and strict quotients coincide on these packets. The action-complete transfer has no accepted transfer edges, so its coefficient is undefined rather than near the target. This is a failure of the reduced adapter as a horizon-coefficient proof, not a failure of the coefficient target itself.

The next diagnostic transfer relation has now been made explicit. For each sampled terminal branch, pair the receiver impulse with the equal-and-opposite source recoil at the emission event and define
$$
\Delta\Pi_b^{\mathrm{pair}}
=
\Delta\Pi_{b,\mathrm{recv}}
+
\Delta\Pi_{b,\mathrm{src}},
\qquad
\Delta\Pi=(\Delta E,\Delta\mathbf{p},\Delta J,\Delta q)
$$
Also record the per-branch stationarity residual
$$
\epsilon_{\mathrm{stat}}(\lambda)
=
\max_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\left\|
\left.
\partial_{T_{\mathrm{em}}}
\left[
\frac{\hat{\mathbf r}_b(T_b,T_{\mathrm{em}})}
{r_b(T_b,T_{\mathrm{em}})J_b(T_b,T_{\mathrm{em}})}
\right]
\right|_{T_{\mathrm{em}}=T_b-\Delta_b}
\right\|
$$
The executable also records the branch-summed receiver residual after the direct inverse-square term is removed:
$$
\epsilon_{\mathrm{sum}}(\lambda)
=
\max_{\alpha}
\left\|
\sum_{b\to\alpha}
\frac{\operatorname{sign}(q_{j_b}q_{i_b})}{|J_b|}
\left.
\partial_{T_{\mathrm{em}}}
\left[
\frac{\hat{\mathbf r}_b(T_b,T_{\mathrm{em}})}
{r_b(T_b,T_{\mathrm{em}})J_b(T_b,T_{\mathrm{em}})}
\right]
\right|_{T_{\mathrm{em}}=T_b-\Delta_b}
\right\|
$$
where $\alpha$ ranges over sampled receiver phase keys. The dynamics-backed transfer predicate is therefore the earlier edge-match condition plus closure of the paired source-recoil ledger, the cycle residual, and $\epsilon_{\mathrm{sum}}$; $\epsilon_{\mathrm{stat}}$ remains an obstruction diagnostic. The current terminal-alignment enumerator packets report zero accepted `terminal_dynamic` transfer edges for the reduced concentric circular family across the tested $3\le n\le5$ and $3\le n\le6$ windows. The edge-only coefficient remains a proxy output, while the terminal-dynamic coefficient is undefined because no transfer edges pass the paired recoil, cycle-support, and branch-summed action-variation tests. Thus the obstruction is not merely the observer quotient or area normalization. The reduced concentric terminal ansatz fails the action-variation and cycle-support tests before it can become a horizon-interface transfer system. The run-level numerics belong in the strong-field terminal-alignment validation packet, not in this mechanism chapter.

The first bounded branch-family variation gives the same conclusion. The executable phase-offset family keeps the centers concentric but changes the layer phases by
$$
\phi_I=-2\pi f,
\qquad
\phi_M=2\pi f,
\qquad
\phi_O=0
$$
with tested offsets $f=1/8$ and $f=1/4$. These packets increase the delayed inter-layer root inventory but still produce zero terminal-dynamic transfer edges under both coarse and strict quotients. The edge-only coefficient remains a proxy result and the stationarity and branch-summed residuals remain large in the validation packet. A bounded phase offset therefore does not rescue the reduced circular terminal ansatz.

The first shifted-center branch family is negative as well. The executable `shifted-center` family keeps the circular speeds and layer phases fixed, but places the three circular centers at
$$
\mathbf{c}_I=(-\epsilon_c R_O,0),
\qquad
\mathbf{c}_M=\left(\frac{\epsilon_c R_O}{2},\frac{\sqrt{3}\epsilon_c R_O}{2}\right),
\qquad
\mathbf{c}_O=\left(\frac{\epsilon_c R_O}{2},-\frac{\sqrt{3}\epsilon_c R_O}{2}\right)
$$
where $R_O=1/\omega_O$ is the outer alignment radius and $\epsilon_c$ is the tested center-shift fraction. The tested shifted-center packets again produce zero terminal-dynamic transfer edges; larger center shifts are empty even at the edge-proxy level, while the smallest tested shift supplies only a widened edge-proxy edge with no terminal-dynamic transfer. The validation packet records large stationarity and branch-summed residuals throughout. Thus small shifted centers make the reduced chart more brittle rather than more entropy-bearing. The next useful variation must change the action kernel, the wake-memory ledger, or the observer quotient, not merely the first-order circular geometry.

At the present derivation level, the admissible one-patch labels can be enumerated as a finite branch-ledger schema, not yet as a numerical table. For a primitive outer-period closure, the integer-lock notation gives
$$
(k_I,k_M,k_O)=(n,m,1),
\qquad
1<m<n
$$
with longer closure periods represented by common integer multiples before reduction to the primitive label. For each layer $\ell\in\{I,M,O\}$, write $\beta_\ell=s_\ell/c_f$ in the circular reduced root chart. The binary root vocabulary supplies finite active branch sets on any resolved terminal branch:
$$
\mathcal{M}_{s,\ell}
=
\left\{
r\in\mathbb{Z}_{\ge0}
:
\tilde{\delta}_{s,\ell}+2\pi r
=
2\beta_\ell\sin(\tilde{\delta}_{s,\ell}/2)
\right\}
$$
$$
\mathcal{M}_{p,\ell}
=
\left\{
r\in\mathbb{Z}_{\ge0}
:
\tilde{\delta}_{p,\ell}+2\pi r
=
2\beta_\ell\cos(\tilde{\delta}_{p,\ell}/2)
\right\}
$$
Branch-birth or grazing cases, where a Jacobian ceases to be transversal, must be split into their own boundary class rather than silently folded into a smooth label.

Thus the current one-patch candidate has the form
$$
\lambda
=
\left(
(n,m,1);\,
(\mathcal{M}_{s,\ell},\mathcal{M}_{p,\ell},J_{\ell},\prec_{\ell})_{\ell=I,M,O};\,
\mathcal{G}_{IM}^{\mathrm{align}},\mathcal{G}_{IO}^{\mathrm{align}},\mathcal{G}_{MO}^{\mathrm{align}};\,
\chi_c;\,
\mathcal{E}_{\nu}^{-},\mathcal{E}_{\nu}^{+};\,
\mathcal{R}_{O,W}^{\theta}
\right)
$$
where $J_{\ell}$ collects the active branch Jacobians and $\prec_{\ell}$ records the emission-order relation within the layer. The finite candidate set is the subset of these labels satisfying exact one-patch phase closure, terminal-alignment conditions, edge conservation, inter-layer wake compatibility, and the observer quotient:
$$
\Lambda_{\theta}^{\mathrm{loc}}
\subseteq
\left\{
\lambda:
\Delta E=\Delta\mathbf{p}=\Delta\mathbf{J}=0,\;
\Delta q=0,\;
\mathcal{R}_{O,W}(\lambda)=\mathcal{R}_{O,W}^{\theta}
\right\}
/
\sim_{O,\theta,W}
$$

This makes the next missing equations precise. To turn the schema into an actual transfer matrix, the dynamics must supply: first, the terminal branch equations fixing $(s_\ell,R_\ell,\omega_\ell,\mathbf{A}_\ell)$ under $v_M=c_f$, $v_O\to c_f$, and coplanar/co-linear alignment; second, the inter-layer maps that reduce $\mathcal{G}_{IM}^{\mathrm{align}},\mathcal{G}_{IO}^{\mathrm{align}},\mathcal{G}_{MO}^{\mathrm{align}}$ to boundary wake data; and third, the observer-record quotient that decides which edge distinctions remain visible in $\theta$.

An edge-map scaffold can be written before the terminal branch is numerically solved. Let $\mathbf{n}_{\nu}$ be the outward unit normal for the chosen local edge direction, and let $\mathcal{B}_{\mathrm{term}}(\lambda)$ be the finite set of active layer and inter-layer causal branches retained by the terminal one-patch label. Each branch $b\in\mathcal{B}_{\mathrm{term}}(\lambda)$ has a source $j_b$, receiver $o_b$, emission time $T_{\mathrm{em},b}$, reception time $T_b$, winding or root index $r_b$, root type $\tau_b\in\{\text{self},\text{partner},\text{inter-layer}\}$, line of action
$$
\hat{\mathbf{r}}_b
=
\frac{\mathbf X_{o_b}(T_b)-\mathbf X_{j_b}(T_{\mathrm{em},b})}
{\left\|\mathbf X_{o_b}(T_b)-\mathbf X_{j_b}(T_{\mathrm{em},b})\right\|}
$$
and source-normal causal Jacobian
$$
J_b
=
1
-
\frac{\mathbf V_{j_b}(T_{\mathrm{em},b})\cdot\hat{\mathbf{r}}_b}{c_f}
$$
with
$$
D_{s,b}
=
c_f-\mathbf V_{j_b}(T_{\mathrm{em},b})\cdot\hat{\mathbf{r}}_b,
\qquad
D_{T,b}
=
c_f-\mathbf V_{o_b}(T_b)\cdot\hat{\mathbf{r}}_b,
\qquad
W_b^{\mathrm{rec}}
=
\left|\frac{D_{T,b}}{D_{s,b}}\right|.
$$
The branch is admissible only when its causal-root equation closes,
$$
\left\|\mathbf X_{o_b}(T_b)-\mathbf X_{j_b}(T_{\mathrm{em},b})\right\|
=
c_f(T_b-T_{\mathrm{em},b}),
\qquad
D_{s,b}\ne0
$$
and the terminal label also satisfies the integer-lock and alignment constraints
$$
\omega_O P_O=2\pi,\qquad
\omega_M P_O=2\pi m,\qquad
\omega_I P_O=2\pi n
$$
$$
s_M=c_f,\qquad
s_O\to c_f,\qquad
\max_{\ell,\ell'}\arccos(\hat{\mathbf{A}}_\ell\cdot\hat{\mathbf{A}}_{\ell'})\to0
$$

For such a branch, define the boundary-facing datum
$$
\mathfrak{d}_{\nu}^{\pm}(b)
=
\left[
\tau_b,\,
\ell(j_b),\ell(o_b),\,
r_b,\,
T_{\mathrm{em},b}\bmod P_O,\,
\operatorname{sgn}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}),\,
J_b,\,
\hat{\mathbf{r}}_b\cdot\mathbf{n}_{\nu},\,
\mathbf{a}_{o_b\leftarrow j_b}(T_b;T_{\mathrm{em},b})\cdot\mathbf{n}_{\nu}
\right]_{O,\theta,W}
$$
whenever $\pm(\hat{\mathbf{r}}_b\cdot\mathbf{n}_{\nu})>0$. Here $q^{\mathrm{pol}}$ denotes the architrino polarity bookkeeping unit carried by the source or receiver, not the branch-chart label $q$ or the terminal integer $k_\ell$, and $[\cdot]_{O,\theta,W}$ means that distinctions erased by the Physical Observer quotient for record $\theta$ are already identified. The edge maps are then the multisets after the observer quotient:
$$
\mathcal{E}_{\nu}^{\pm}(\lambda)
=
\left\{
\mathfrak{d}_{\nu}^{\pm}(b)
:
b\in\mathcal{B}_{\mathrm{term}}(\lambda),\,
\pm(\hat{\mathbf{r}}_b\cdot\mathbf{n}_{\nu})>0
\right\}
$$
This equation is the derived projection target: it reduces each terminal one-patch branch ledger to the wake data presented across one edge. The still-open numerical step is solving $\mathcal{B}_{\mathrm{term}}(\lambda)$ from the full three-layer state-dependent delayed equations, including the regularized action and energy ledger that assigns the conserved increments used in $\mathcal{C}_{\theta,\nu}$.

The reduced terminal branch system can be stated as a finite residual problem on the primitive outer period. Choose $P_O>0$ and integers $1<m<n$, set
$$
\omega_O=\frac{2\pi}{P_O},
\qquad
\omega_M=m\omega_O,
\qquad
\omega_I=n\omega_O
$$
and represent the aligned circular branch by
$$
\mathbf X_{\ell,\alpha}(T)
=
\mathbf{c}_{\ell}
+
\alpha R_{\ell}
\mathbf{e}\!\left(\omega_\ell T+\phi_\ell\right),
\qquad
\ell\in\{I,M,O\},
\qquad
\alpha\in\{+1,-1\}
$$
where $\mathbf{e}(\psi)$ is the unit vector in the common terminal plane. The phase-lock and terminal-alignment constraints are
$$
\phi_M-m\phi_O=\phi_{MO}^{\ast},
\qquad
\phi_I-n\phi_O=\phi_{IO}^{\ast}
$$
$$
R_\ell\omega_\ell=s_\ell,
\qquad
s_M=c_f,
\qquad
s_O\to c_f,
\qquad
\mathbf{A}_I=\mathbf{A}_M=\mathbf{A}_O
$$
up to the declared terminal-alignment tolerance. The intra-layer branches use the self-hit and partner-hit equations above. The inter-layer candidates are the delayed roots
$$
F_b(\Delta_b)
\equiv
\left\|
\mathbf X_{\ell_o,\alpha_o}(T_b)
-
\mathbf X_{\ell_j,\alpha_j}(T_b-\Delta_b)
\right\|
-
c_f\Delta_b
=
0
$$
with $0<\Delta_b\le H_{\lambda}$ for the finite history window assigned to $\lambda$, layer pair $(\ell_j,\ell_o)\in\{(I,M),(I,O),(M,I),(M,O),(O,I),(O,M)\}$, signs $\alpha_j,\alpha_o\in\{+1,-1\}$, and emission phase recorded modulo $P_O$. The branch is kept in $\mathcal{B}_{\mathrm{term}}(\lambda)$ only if it is transversal,
$$
J_b
=
1
-
\frac{\mathbf V_{\ell_j,\alpha_j}(T_b-\Delta_b)\cdot\hat{\mathbf{r}}_b}{c_f}
\ne0
$$
and belongs to the same integer-lock, emission-order, and observer-record class as $\lambda$.

The remaining dynamics are not another gate; they are the equations that decide whether a proposed branch label exists. For each terminal branch label, the cycle-averaged squared residual must vanish:
$$
\mathcal{Q}_{\ell,\alpha}^{\mathrm{term}}(\lambda)
=
\frac{1}{P_O}
\int_0^{P_O}
\left\|
\frac{d^2\mathbf X_{\ell,\alpha}}{dT^2}(T)
-
\sum_{b:\,o_b=(\ell,\alpha)}
\mathbf{a}_{o_b\leftarrow j_b}(T;T-\Delta_b)
\right\|^2
dT
=
0
$$
with the same branch set also satisfying the local conservation ledger
$$
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\left(
\Delta E_b,\Delta\mathbf{p}_b,\Delta\mathbf{J}_b,\Delta q_b
\right)
=
(0,\mathbf{0},\mathbf{0},0)
$$
This defines the reduced solve: $\mathcal{B}_{\mathrm{term}}(\lambda)$ is the finite set of intra-layer and inter-layer roots satisfying the terminal kinematics, transversality, cycle-averaged dynamics, conservation ledger, and observer quotient. A numerical enumeration targets these equations directly; if no solution has $|J_b|$ bounded away from zero, the label must be reclassified as a grazing boundary case rather than counted as an interior transfer-matrix state.

In the symmetric common-center specialization, the inter-layer root problem reduces to scalar root curves over the outer phase. Set
$$
\mathbf{c}_I=\mathbf{c}_M=\mathbf{c}_O,
\qquad
k_I=n,\quad k_M=m,\quad k_O=1,
\qquad
u=\omega_O T\pmod{2\pi}
$$
and introduce dimensionless layer radii
$$
x_\ell
=
\frac{\omega_O R_\ell}{c_f}
=
\frac{s_\ell/c_f}{k_\ell}
$$
For a branch from source layer $\ell_j$ and sign $\alpha_j$ to receiver layer $\ell_o$ and sign $\alpha_o$, write the outer-period delay as $\delta=\omega_O\Delta$. The phase separation is
$$
\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta)
=
(k_o-k_j)u
+
k_j\delta
+
\phi_o-\phi_j
$$
and the causal-root equation becomes
$$
\delta
=
\left[
x_o^2+x_j^2
-
2\alpha_o\alpha_j x_o x_j
\cos\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta)
\right]^{1/2},
\qquad
0<\delta\le \omega_O H_{\lambda}
$$
The corresponding inter-layer Jacobian reduces to
$$
J_{jo}^{\alpha_j\alpha_o}(u,\delta)
=
1
-
\alpha_o\alpha_j
\frac{(s_j/c_f)x_o}{\delta}
\sin\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta)
$$

Thus an inter-layer entry of $\mathcal{B}_{\mathrm{term}}(\lambda)$ is not an arbitrary phase sample. It is a smooth $2\pi$-periodic root curve $\delta_b(u)$ of the scalar equation above, with $|J_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))|$ bounded away from zero and with the same emission-order class over the full outer period. The intra-layer pieces remain the self-hit and partner-hit equations already listed for each $\ell$. In this symmetric special case, the unknowns left for enumeration are therefore
$$
(m,n),\quad
(x_I,x_M,x_O),\quad
(\phi_{MO}^{\ast},\phi_{IO}^{\ast}),\quad
\{\delta_b(u)\}_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
$$
subject to $x_M=1/m$, $x_O\to1$, branch transversality, the cycle residual $\mathcal{Q}_{\ell,\alpha}^{\mathrm{term}}=0$, and the conservation ledger. This is the first algebraic reduction of the terminal branch problem. It still does not select $(m,n)$ or prove existence; selection requires the residual and conservation equations to admit at least one branch set with a positive Jacobian floor.

The scalar reduction does, however, give an exact no-grazing certificate for a proposed inter-layer branch. Define the squared residual
$$
F_{jo}^{\alpha_j\alpha_o}(u,\delta)
=
x_o^2+x_j^2
-
2\alpha_o\alpha_j x_o x_j
\cos\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta)
-
\delta^2
$$
The causal-root equation is equivalent to $F_{jo}^{\alpha_j\alpha_o}(u,\delta)=0$ with $\delta>0$, and, using $k_jx_j=s_j/c_f$, its delay derivative is
$$
\partial_{\delta}F_{jo}^{\alpha_j\alpha_o}(u,\delta)
=
-2\delta\,
J_{jo}^{\alpha_j\alpha_o}(u,\delta)
$$
Thus the branch Jacobian is exactly the implicit-function denominator for the scalar root. Any nonzero root with $|J_{jo}^{\alpha_j\alpha_o}|>0$ continues locally as a smooth delay curve, and along such a curve
$$
\frac{d\delta_b}{du}
=
\frac{
\alpha_o\alpha_j x_o x_j(k_o-k_j)
\sin\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))
}{
\delta_b(u)
J_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))
}
$$

This turns the symmetric terminal branch problem into a compact root-curve test before the force residual is evaluated. Any inter-layer root must lie in the geometric delay strip
$$
|x_o-x_j|
\le
\delta
\le
\min\{x_o+x_j,\omega_OH_{\lambda}\}
$$
For fixed $(m,n)$, radii, and relative phases, an interior inter-layer ledger is admissible only if its initial roots at one outer phase continue around the full $2\pi$ period as closed curves $\delta_b(u)$ that remain inside this strip, satisfy a uniform floor
$$
\delta_b(u)\ge\epsilon_{\delta}>0,
\qquad
\left|
J_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))
\right|
\ge
\epsilon_J>0
$$
and preserve the declared emission-order and observer-record class. Failure of the delay strip rejects the candidate kinematically; failure of the Jacobian floor places it in the grazing boundary class; failure of closed return changes the root ledger over one outer period. Passing this scalar certificate is still not terminal-branch existence, because $\mathcal{Q}_{\ell,\alpha}^{\mathrm{term}}=0$ and the conservation ledger must still close, but it is the first finite rejection and continuation criterion for candidate $(m,n)$ branch labels.

The same chart projects the force residual once a certified root curve and same-record receiver-normal branch-strength row are supplied. Let $q_{\ell,\alpha}^{\mathrm{pol}}=\sigma_{\ell,\alpha}\epsilon$ denote the polarity bookkeeping unit carried by the architrino on layer $\ell$ and sign $\alpha$, distinguishing it from the layer frequency integer $k_\ell$. Write the signed coefficient inherited from the canonical per-hit law as
$$
\mathcal{K}_{jo}^{\alpha_j\alpha_o}
=
\kappa\,
\operatorname{sign}(q_{\ell_j,\alpha_j}^{\mathrm{pol}}q_{\ell_o,\alpha_o}^{\mathrm{pol}})
\left|q_{\ell_j,\alpha_j}^{\mathrm{pol}}q_{\ell_o,\alpha_o}^{\mathrm{pol}}\right|
\frac{\omega_O^2}{c_f^2}
$$
For a certified inter-layer curve $\delta_b(u)$, the circular-frame radial component, positive outward from the common center of the receiver layer, is
$$
a_{jo,r}^{\alpha_j\alpha_o}(u)
=
\mathcal{K}_{jo}^{\alpha_j\alpha_o}
W_{jo}^{\mathrm{rec},\alpha_j\alpha_o}(u)
\frac{
x_o-\alpha_o\alpha_j x_j
\cos\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))
}{
\left(\delta_b(u)\right)^3
}
$$
and the tangential component, positive in the receiver's instantaneous direction of motion, is
$$
a_{jo,\tau}^{\alpha_j\alpha_o}(u)
=
\mathcal{K}_{jo}^{\alpha_j\alpha_o}
W_{jo}^{\mathrm{rec},\alpha_j\alpha_o}(u)
\frac{
\alpha_o\alpha_j x_j
\sin\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))
}{
\left(\delta_b(u)\right)^3
}
$$
These formulas are the current canonical line-of-action acceleration projected onto the two circular-frame basis vectors. The source-normal denominator remains part of $W^{\mathrm{rec}}$ through $D_s$, so the formulas are not active closure evidence until the same retained row supplies $D_s$, $D_T$, and $W^{\mathrm{rec}}$. The intra-layer self-hit and partner-hit pieces use the same projection after substituting their own certified delay roots from the binary branch chart.

For each receiver $(\ell_o,\alpha_o)$, sum all admitted branch contributions into
$$
\mathcal{A}_{\ell_o,\alpha_o}^{r}(u)
=
\sum_{b:\,o_b=(\ell_o,\alpha_o)}
a_{b,r}(u),
\qquad
\mathcal{A}_{\ell_o,\alpha_o}^{\tau}(u)
=
\sum_{b:\,o_b=(\ell_o,\alpha_o)}
a_{b,\tau}(u)
$$
On the symmetric terminal circle, with $\mathbf{e}_{\perp}(\psi)=d\mathbf{e}(\psi)/d\psi$, the target acceleration has only inward radial component,
$$
\frac{d^2\mathbf X_{\ell_o,\alpha_o}}{dT^2}(T)
\cdot
\alpha_o\mathbf{e}(k_{\ell_o}u+\phi_{\ell_o})
=
-R_{\ell_o}(k_{\ell_o}\omega_O)^2,
\qquad
\frac{d^2\mathbf X_{\ell_o,\alpha_o}}{dT^2}(T)
\cdot
\alpha_o\mathbf{e}_{\perp}(k_{\ell_o}u+\phi_{\ell_o})
=
0
$$
Thus the vector residual $\mathcal{Q}_{\ell,\alpha}^{\mathrm{term}}$ reduces in this chart to the two scalar residual functions
$$
\mathcal{R}_{\ell_o,\alpha_o}^{r}(u)
=
-R_{\ell_o}(k_{\ell_o}\omega_O)^2
-
\mathcal{A}_{\ell_o,\alpha_o}^{r}(u),
\qquad
\mathcal{R}_{\ell_o,\alpha_o}^{\tau}(u)
=
-
\mathcal{A}_{\ell_o,\alpha_o}^{\tau}(u)
$$
Equivalently,
$$
\mathcal{Q}_{\ell_o,\alpha_o}^{\mathrm{term}}
=
\frac{1}{2\pi}
\int_0^{2\pi}
\left[
\left(\mathcal{R}_{\ell_o,\alpha_o}^{r}(u)\right)^2
+
\left(\mathcal{R}_{\ell_o,\alpha_o}^{\tau}(u)\right)^2
\right]
du
$$
Since the integrand is non-negative on a smooth certified branch, $\mathcal{Q}_{\ell_o,\alpha_o}^{\mathrm{term}}=0$ is equivalent to $\mathcal{R}_{\ell_o,\alpha_o}^{r}(u)=0$ and $\mathcal{R}_{\ell_o,\alpha_o}^{\tau}(u)=0$ for the full outer period. This is the residual projection that can select or reject candidate integer locks after the scalar root curves are known. The remaining missing closure is the signed branch-strength and conservation assignment: without the polarity factors, regularized intra-layer branch weights, and conserved increments $(\Delta E_b,\Delta\mathbf{p}_b,\Delta\mathbf{J}_b,\Delta q_b)$, the chart can reject kinematic and force-residual failures but cannot yet prove that a particular $(m,n)$ is the terminal solution.

The branch-strength closure data can be stated without adding another gate. For every admitted branch $b$, the terminal ledger must record
$$
b
\mapsto
\left(
j_b,o_b,\tau_b,\delta_b(u),\hat{\mathbf{r}}_b(u),J_b(u),
D_{s,b}(u),D_{T,b}(u),W_b^{\mathrm{rec}}(u),
q_{j_b}^{\mathrm{pol}},q_{o_b}^{\mathrm{pol}},w_b^{(\eta)}(u)
\right)
$$
where $j_b$ and $o_b$ are the source and receiver architrinos, $\tau_b$ is the hit type, $D_{s,b}$ is the source-normal denominator, $D_{T,b}$ is the receiver-normal numerator, $W_b^{\mathrm{rec}}=\lvert D_{T,b}/D_{s,b}\rvert$, and $w_b^{(\eta)}$ is the regularized inverse-square receiver-normal weight assigned to that branch. On a sharp transversal inter-layer branch,
$$
w_b^{(0)}(u)
=
\frac{\omega_O^2}{c_f^2}
\frac{W_b^{\mathrm{rec}}(u)}
{\left(\delta_b(u)\right)^2}
$$
while intra-layer self-hit and partner-hit entries use the corresponding binary-root delay, source-normal denominator, and receiver-normal numerator. The branch acceleration is then the canonical per-hit law in ledger form,
$$
\mathbf{a}_b^{(\eta)}(u)
=
\kappa\,
\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|
w_b^{(\eta)}(u)
\hat{\mathbf{r}}_b(u)
$$
The sharp limit is acceptable only when the positive delay and Jacobian-floor certificate above holds; otherwise the branch must retain its regularized weight and remain a boundary case rather than an interior terminal label.

The conservation increments attached to a branch must separate mechanical exchange from wake-history bookkeeping. Over one outer period,
$$
\Delta E_{b}^{\mathrm{mech}}
=
\frac{\mu_{\mathrm{act}}}{\omega_O}
\int_0^{2\pi}
\mathbf{a}_b^{(\eta)}(u)\cdot\mathbf V_{o_b}(u)\,du
$$
$$
\Delta\mathbf{p}_{b}^{\mathrm{mech}}
=
\frac{\mu_{\mathrm{act}}}{\omega_O}
\int_0^{2\pi}
\mathbf{a}_b^{(\eta)}(u)\,du,
\qquad
\Delta\mathbf{J}_{b}^{\mathrm{mech}}
=
\frac{\mu_{\mathrm{act}}}{\omega_O}
\int_0^{2\pi}
\mathbf X_{o_b}(u)\times\mathbf{a}_b^{(\eta)}(u)\,du
$$
Here $\mu_{\mathrm{act}}$ is an action-scaffold normalization that converts the variational ledger back into the acceleration units used by the Master EOM. It is not a primitive mass assigned to an architrino.

Because delayed momentum and energy are not purely instantaneous mechanical quantities, the full ledger entries are
$$
\Delta E_b
=
\Delta E_b^{\mathrm{mech}}
+
\Delta E_b^{\mathrm{wake}},
\qquad
\Delta\mathbf{p}_b
=
\Delta\mathbf{p}_b^{\mathrm{mech}}
+
\Delta\mathbf{p}_b^{\mathrm{wake}}
$$
$$
\Delta\mathbf{J}_b
=
\Delta\mathbf{J}_b^{\mathrm{mech}}
+
\Delta\mathbf{J}_b^{\mathrm{wake}}
$$
For an internal causal-wake hit, $\Delta q_b=0$ because no architrino identity is created, destroyed, or transferred; nonzero charge-bookkeeping entries belong only to a declared provenance crossing of the patch boundary. The terminal conservation ledger is therefore the simultaneous closure condition
$$
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\Delta E_b
=
0,
\qquad
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\Delta\mathbf{p}_b
=
\mathbf{0}
$$
$$
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\Delta\mathbf{J}_b
=
\mathbf{0},
\qquad
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\Delta q_b
=
0
$$
This completes the local bookkeeping needed for terminal enumeration: a candidate $(m,n)$ must pass scalar root continuation, force-residual cancellation, and the history-aware conservation ledger on the same branch set. What remains unsolved is not another requirement artifact but the derivation of $w_b^{(\eta)}$ and the wake-history increments from a time-translation- and Euclidean-invariant regularized action for the coupled three-layer branch.

The minimal action-level scaffold is the pullback of the exact causal-delay action in [Master Equation](../dynamics/master-equation.md#exact-nonlocal-lagrangian) to the certified terminal branch chart. For branch $b$, set
$$
T_b(u)=\frac{u}{\omega_O},
\qquad
T_b^0(u)=T_b(u)-\Delta_b(u),
\qquad
r_b(u)=\frac{c_f}{\omega_O}\delta_b(u)
$$
The sharp branch density inherited from the exact $1/r$ causal kernel is
$$
\mathcal{I}_b^{(0)}(u)
=
\frac{1}{c_f}
\frac{1}{r_b(u)|J_b(u)|}
=
\frac{\omega_O}{c_f^2}
\frac{1}{\delta_b(u)|J_b(u)|}
$$
A regularized terminal action for the branch set should therefore have the form
$$
S_{\lambda}^{(\eta)}
=
\int_0^{2\pi}
\frac{du}{\omega_O}
\sum_o
\frac{1}{2}\mu_{\mathrm{act}}
\left\|\mathbf V_o(u)\right\|^2
-
\frac{1}{2}
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\int_0^{2\pi}
\frac{du}{\omega_O}
\kappa\,
\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|
\mathcal{I}_b^{(\eta)}(u)
$$
with $\mathcal{I}_b^{(\eta)}\to\mathcal{I}_b^{(0)}$ weakly on any branch satisfying the positive-delay and Jacobian-floor certificate. Its branch variation must reproduce the terminal acceleration weight,
$$
\left[
\frac{1}{\mu_{\mathrm{act}}}
\frac{\delta S_{\lambda}^{(\eta)}}{\delta\mathbf X_{o_b}}
\right]_{\!b}
\longrightarrow
\kappa\,
\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|
\,w_b^{(0)}(u)
\hat{\mathbf{r}}_b(u)
$$
up to the sign convention fixed by writing the interaction term with a minus sign in the action. In other words, $w_b^{(\eta)}$ is not an independent fitting weight. It is the Euler-Lagrange pullback of the regularized causal kernel on a certified branch chart.

The strongest current action-kernel candidate is not the diagnostic same-support inverse-square adapter. Pull back the delayed-interior characteristic-tail kernel from [Master Equation](../dynamics/master-equation.md#exact-nonlocal-lagrangian) before reducing to a one-period branch density. In this subsection, $\tilde F_b$ denotes the time-normalized branch constraint
$$
\tilde F_b=-\frac{g_b^{\mathrm{ME}}}{c_f}
$$
where $g_b^{\mathrm{ME}}=r_b-c_f(T_1-T_{\mathrm{em}})$ is the length-valued Master Equation causal constraint on the same branch. This convention keeps the time-kernel prefactors explicit and prevents the local branch variable from being confused with the canonically length-valued $g_{ij}$. For the two-time branch, define the local characteristic coordinate
$$
u_b^{\mathrm{c}}(T_1,T_{\mathrm{em}})
=
\tilde F_b(T_1,T_{\mathrm{em}})
+
\frac{r_b(T_1,T_{\mathrm{em}})}{c_f}
$$
After endpoint-clear normalization, the candidate branch kernel is
$$
K_{b,\mathrm{eff}}^{(\eta)}(T_1,T_{\mathrm{em}})
=
\int_{-\infty}^{\tilde F_b(T_1,T_{\mathrm{em}})}
\frac{\delta_\eta(s)}
{c_f\left(u_b^{\mathrm{c}}(T_1,T_{\mathrm{em}})-s\right)^2}
ds
$$
or the finite-endpoint version with lower limit $-h_{+}$ when the endpoint-clearance term is cancelled by the characteristic gauge. Its receiver-gradient identity is
$$
\left(
\partial_{r_b}
-
\frac{1}{c_f}\partial_{\tilde F_b}
\right)
K_{b,\mathrm{eff}}^{(\eta)}
=
-
\frac{\delta_\eta(\tilde F_b)}{r_b^2}
$$
This is the action-level object that can replace the diagnostic inverse-square adapter once the Noether boundary terms below are computed from the same kernel. Until then, terminal enumerator rows using $w_b^{(\eta)}\hat{\mathbf{r}}_b$ remain diagnostic branch-force rows rather than a completed action derivation.

The sharp receiver-side variation can be separated before the root is integrated out. Write the two-time branch kernel as
$$
\mathcal{L}_b^{(0)}(T_1,T_{\mathrm{em}})
=
\frac{1}{c_f}
\Theta(T_1-T_{\mathrm{em}})
\frac{\delta(\tilde F_b(T_1,T_{\mathrm{em}}))}{r_b(T_1,T_{\mathrm{em}})}
$$
with
$$
\tilde F_b(T_1,T_{\mathrm{em}})
=
T_1-T_{\mathrm{em}}
-
\frac{r_b(T_1,T_{\mathrm{em}})}{c_f},
\qquad
r_b(T_1,T_{\mathrm{em}})
=
\|\mathbf X_{o_b}(T_1)-\mathbf X_{j_b}(T_{\mathrm{em}})\|
$$
For a receiver variation at fixed source history,
$$
\delta r_b
=
\hat{\mathbf{r}}_b\cdot\delta\mathbf X_{o_b}(T_1),
\qquad
\delta \tilde F_b
=
-
\frac{1}{c_f}
\hat{\mathbf{r}}_b\cdot\delta\mathbf X_{o_b}(T_1)
$$
Therefore
$$
\delta\!\left(\frac{\delta(\tilde F_b)}{r_b}\right)
=
-
\left[
\frac{\delta(\tilde F_b)}{r_b^2}
+
\frac{\delta'(\tilde F_b)}{c_f r_b}
\right]
\hat{\mathbf{r}}_b\cdot\delta\mathbf X_{o_b}(T_1)
$$
The first term gives the source-normal part of the terminal branch scale after the causal root is selected:
$$
\int dT_{\mathrm{em}}\,
\Theta(T_1-T_{\mathrm{em}})
\frac{\delta(\tilde F_b(T_1,T_{\mathrm{em}}))}{r_b^2(T_1,T_{\mathrm{em}})}
=
\frac{1}{r_b^2(T_1,T_b^0)|D_{s,b}(T_1,T_b^0)|}
=
\frac{\omega_O^2}{c_f^2}
\frac{1}{\delta_b^2(u)|D_{s,b}(u)|}
=
w_{b,\mathrm{src}}^{(0)}(u)
$$

The active force-law branch strength still requires the receiver-normal numerator, so the terminal ledger must promote $w_b^{(0)}=(\omega_O^2/c_f^2)W_b^{\mathrm{rec}}/\delta_b^2$ only after $D_{T,b}$ is recorded on the same retained branch. The second term is the nontrivial root-constraint variation. It cannot be dropped after the branch has been pulled back to $\delta_b(u)$. The terminal-chart variation proof closes exactly when the regularized two-time action satisfies, for every compactly supported or period-matched receiver variation,
$$
\lim_{\eta\to0}
\left[
\int dT_{\mathrm{em}}\,
\Theta(T_1-T_{\mathrm{em}})
\frac{\delta_\eta'(\tilde F_b(T_1,T_{\mathrm{em}}))}{c_f r_b(T_1,T_{\mathrm{em}})}
\hat{\mathbf{r}}_b(T_1,T_{\mathrm{em}})
\right]_{\mathrm{int}}
=
\mathbf{0}
$$
where the subscript $\mathrm{int}$ means after the source-side variation, integration by parts on the root-selected chart, and the Noether boundary term have been accounted for. Equivalently, all interior force density left by varying the causal constraint must cancel into the boundary wake increments rather than adding a second independent line-of-action force. This is the exact missing identity for a complete terminal-chart variation proof. The direct $1/r$ variation supplies the source-normal scale coefficient $w_{b,\mathrm{src}}^{(0)}$; the remaining proof burden is to show that the $\delta_\eta'(\tilde F_b)$ contribution is a boundary/source-side term, vanishes under a local stationarity condition, or is cancelled by a declared counterterm under the same symmetry-preserving regularization used for the conservation ledger while the same branch records $D_{T,b}$ for $W_b^{\mathrm{rec}}$.

This identity can be narrowed one step further. On a transversal branch,
$$
\partial_{T_{\mathrm{em}}}\tilde F_b(T_1,T_{\mathrm{em}})
=
-J_b(T_1,T_{\mathrm{em}})
$$
so
$$
\delta_\eta'(\tilde F_b)
=
-
\frac{1}{J_b}
\partial_{T_{\mathrm{em}}}\delta_\eta(\tilde F_b)
$$
Substituting this into the unresolved term and integrating by parts in $T_{\mathrm{em}}$ gives
$$
\int dT_{\mathrm{em}}\,
\Theta(T_1-T_{\mathrm{em}})
\frac{\delta_\eta'(\tilde F_b)}{c_f r_b}
\hat{\mathbf{r}}_b
=
\mathcal{B}_{b}^{(\eta)}(T_1)
+
\int dT_{\mathrm{em}}\,
\delta_\eta(\tilde F_b)
\partial_{T_{\mathrm{em}}}
\left[
\Theta(T_1-T_{\mathrm{em}})
\frac{\hat{\mathbf{r}}_b}{c_f r_b J_b}
\right]
$$
where $\mathcal{B}_{b}^{(\eta)}(T_1)$ is the endpoint contribution at the history-window, period, or excluded coincidence boundary. The coincidence term is removed by $H(0)=0$; the remaining endpoint term vanishes only for compactly supported variations or for period-matched terminal histories.

Thus the smallest unresolved object is no longer the raw $\delta_\eta'(\tilde F_b)$ term. It is the root-chart interior derivative
$$
\mathbf{C}_{b}^{(\eta)}(T_1)
=
\int dT_{\mathrm{em}}\,
\delta_\eta(\tilde F_b)
\partial_{T_{\mathrm{em}}}
\left[
\Theta(T_1-T_{\mathrm{em}})
\frac{\hat{\mathbf{r}}_b}{c_f r_b J_b}
\right]
$$
The terminal action derives the claimed line-of-action branch law exactly only if
$$
\lim_{\eta\to0}
\left[
\mathbf{C}_{b}^{(\eta)}
+
\mathbf{C}_{b,\mathrm{src}}^{(\eta)}
+
\mathbf{C}_{b,\mathrm{bdry}}^{(\eta)}
\right]
=
\mathbf{0}
$$
where $\mathbf{C}_{b,\mathrm{src}}^{(\eta)}$ is the source-side variation of the same two-time kernel and $\mathbf{C}_{b,\mathrm{bdry}}^{(\eta)}$ is the Noether boundary contribution assigned to the wake-history ledger. This is the precise local closure condition that would be needed for the pure scalar kernel to derive the terminal line-of-action force without an added term. If this cancellation fails, the action-derived terminal force law must include an additional regularized counterterm rather than using $w_b^{(\eta)}\hat{\mathbf{r}}_b$ alone.

The source-side calculation shows why this is a real condition rather than a notational cancellation. Holding the receiver history fixed and varying the emission point gives
$$
\delta r_b
=
-\hat{\mathbf{r}}_b\cdot\delta\mathbf X_{j_b}(T_{\mathrm{em}}),
\qquad
\delta \tilde F_b
=
\frac{1}{c_f}
\hat{\mathbf{r}}_b\cdot\delta\mathbf X_{j_b}(T_{\mathrm{em}})
$$
and therefore
$$
\delta_{\mathrm{src}}\!\left(\frac{\delta_\eta(\tilde F_b)}{r_b}\right)
=
\left[
\frac{\delta_\eta(\tilde F_b)}{r_b^2}
+
\frac{\delta_\eta'(\tilde F_b)}{c_f r_b}
\right]
\hat{\mathbf{r}}_b\cdot\delta\mathbf X_{j_b}(T_{\mathrm{em}})
$$
On a future-reception chart for the same branch,
$$
\partial_{T_1}\tilde F_b(T_1,T_{\mathrm{em}})
=
1-\frac{\hat{\mathbf{r}}_b(T_1,T_{\mathrm{em}})\cdot\mathbf V_{o_b}(T_1)}{c_f}
$$
so the source-side derivative-of-delta contribution becomes
$$
\int dT_1\,
\Theta(T_1-T_{\mathrm{em}})
\frac{\delta_\eta'(\tilde F_b)}{c_f r_b}
\hat{\mathbf{r}}_b
=
\widetilde{\mathcal{B}}_{b}^{(\eta)}(T_{\mathrm{em}})
-
\int dT_1\,
\delta_\eta(\tilde F_b)
\partial_{T_1}
\left[
\Theta(T_1-T_{\mathrm{em}})
\frac{\hat{\mathbf{r}}_b}
{c_f r_b\left(1-\hat{\mathbf{r}}_b\cdot\mathbf V_{o_b}/c_f\right)}
\right]
$$
This is the coefficient of $\delta\mathbf X_{j_b}(T_{\mathrm{em}})$, not the coefficient of $\delta\mathbf X_{o_b}(T_1)$. For arbitrary compactly supported interior variations, the source and receiver variations are independent. The source-side term therefore does not cancel $\mathbf{C}_{b}^{(\eta)}$ pointwise in the receiver Euler-Lagrange equation. Noether boundary terms can cancel endpoint contributions or enforce global time-translation, spatial-translation, and rotation charges, but they cannot remove an interior receiver coefficient for compactly supported variations.

In the sharp positive-delay, transversal limit, the receiver-side interior object reduces to
$$
\mathbf{C}_{b}^{(0)}(T_1)
=
\frac{1}{|J_b(T_1,T_b^0)|}
\left.
\partial_{T_{\mathrm{em}}}
\left[
\frac{\hat{\mathbf{r}}_b(T_1,T_{\mathrm{em}})}
{c_f r_b(T_1,T_{\mathrm{em}})J_b(T_1,T_{\mathrm{em}})}
\right]
\right|_{T_{\mathrm{em}}=T_b^0}
$$
Thus the pure regularized $1/r$ causal kernel is promoted to an exact branch-weight derivation only under the sufficient local stationarity condition
$$
\left.
\partial_{T_{\mathrm{em}}}
\left[
\frac{\hat{\mathbf{r}}_b(T_1,T_{\mathrm{em}})}
{r_b(T_1,T_{\mathrm{em}})J_b(T_1,T_{\mathrm{em}})}
\right]
\right|_{T_{\mathrm{em}}=T_b^0}
=
\mathbf{0}
$$
on each admitted interior branch, or under an explicit action-level counterterm whose receiver Euler derivative is
$$
\left[
\frac{1}{\mu_{\mathrm{act}}}
\frac{\delta S_{b,\mathrm{ct}}^{(\eta)}}{\delta\mathbf X_{o_b}(T_1)}
\right]_{\!b}
=
-
\kappa\,
\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|
\mathbf{C}_{b}^{(\eta)}(T_1)
$$
with the same endpoint convention used for the wake-history ledger. Such a counterterm is admissible only when derived from the same symmetry-preserving action-level mechanism, not when inserted as a fit to the accepted branch law. This is the smallest correction exposed by the variation: it preserves the direct inverse-square branch law when the stationarity condition holds, and otherwise records exactly the residual force density that the scalar kernel leaves behind.

For the same causal-surface local scalar class, this counterterm route is ruled out. A scalar term $a(r_b,J_b)\delta_\eta(\tilde F_b)$ must choose $a=-1/r_b$ to cancel the derivative-of-delta coefficient, but that same choice changes the direct source-normal scale contribution. The finite local delta-jet extension has the same obstruction. In the common-center inter-layer chart, the stationarity option is also ruled out by the lemma below. The terminal branch proof should therefore test branch-summed residual closure directly with $D_s$, $D_T$, and $W^{\mathrm{rec}}$ on the same retained rows; otherwise the remaining action-level option is the nonlocal characteristic-tail repair target from [Master Equation](../dynamics/master-equation.md#exact-nonlocal-lagrangian), or a richer velocity/history-dependent invariant mechanism. Neither option is a fitted scalar patch.

#### Lemma (Common-Center Inter-Layer Stationarity Obstruction)

In the symmetric common-center terminal chart, no positive-delay, non-grazing inter-layer branch with nonzero layer radii and nonzero source speed satisfies the per-branch stationarity condition above. Define the dimensionless separation vector
$$
\mathbf{Y}_b(u,\delta)
=
\alpha_o x_o\mathbf{e}(k_o u+\phi_o)
-
\alpha_j x_j\mathbf{e}(k_j(u-\delta)+\phi_j),
\qquad
\rho_b(u,\delta)
=
\|\mathbf{Y}_b(u,\delta)\|
$$
Since $r_b=(c_f/\omega_O)\rho_b$ and $\hat{\mathbf{r}}_b=\mathbf{Y}_b/\rho_b$, the branch stationarity condition is equivalent up to a nonzero scale to
$$
\left.
\partial_\delta
\left[
\frac{\mathbf{Y}_b(u,\delta)}
{\rho_b^2(u,\delta)J_b(u,\delta)}
\right]
\right|_{\delta=\delta_b(u)}
=
\mathbf{0}
$$
The vector derivative can vanish only if $\partial_\delta\mathbf{Y}_b$ is parallel to $\mathbf{Y}_b$. But
$$
\partial_\delta\mathbf{Y}_b
=
\alpha_j k_j x_j\,
\mathbf{e}_{\perp}(k_j(u-\delta)+\phi_j)
$$
so parallelism forces the separation to be tangent to the source circle:
$$
\mathbf{Y}_b\cdot\mathbf{e}(k_j(u-\delta)+\phi_j)
=
0
\quad\Longleftrightarrow\quad
\alpha_o x_o\cos\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta)
=
\alpha_j x_j
$$
On this tangent subcase, $\rho_{b,\delta\delta}=0$ and $J_b=1-\rho_{b,\delta}$. The remaining scalar stationarity condition reduces to
$$
\partial_\delta(\rho_bJ_b)
=
\rho_{b,\delta}(1-\rho_{b,\delta})
=
0
$$
The first factor would require $\rho_{b,\delta}=0$; with $k_jx_j=s_j/c_f\ne0$ and the tangent condition, that collapses the separation to $\rho_b=0$ and violates the positive-delay floor. The second factor gives $J_b=0$, which violates the Jacobian floor. Therefore per-branch stationarity is not the terminal inter-layer closure mechanism on this chart. The remaining action-level route is branch-summed residual closure over the signed admitted branch set, or a richer invariant action mechanism whose Euler derivative supplies the missing residual without fitting the force law.

**Branch-summed residual closure.** The terminal action scaffold can still close without per-branch stationarity if the receiver-side interior residual cancels across the signed admitted branch set. Define the dimensionless branch residual vector
$$
\mathbf{A}_b(u)
=
\left.
\partial_\delta
\left[
\frac{\mathbf{Y}_b(u,\delta)}
{\rho_b^2(u,\delta)J_b(u,\delta)}
\right]
\right|_{\delta=\delta_b(u)}
$$
Using $T_{\mathrm{em}}=T_1-\delta/\omega_O$, $r_b=(c_f/\omega_O)\rho_b$, and $\hat{\mathbf{r}}_b=\mathbf{Y}_b/\rho_b$, the sharp receiver-side interior term becomes
$$
\mathbf{C}_{b}^{(0)}(u)
=
-
\frac{\omega_O^2}{c_f^2}
\frac{\mathbf{A}_b(u)}{|J_b(u)|}
$$
After the common nonzero scale is removed, the necessary pointwise receiver-side closure equation is
$$
\sum_{b:\,o_b=(\ell_o,\alpha_o)}
\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|
\frac{\mathbf{A}_b(u)}{|J_b(u)|}
=
\mathbf{0}
\qquad
\text{for all }u
$$
This is a different equation from the force residuals $\mathcal{R}_{\ell_o,\alpha_o}^{r}=\mathcal{R}_{\ell_o,\alpha_o}^{\tau}=0$ and from the conservation-ledger sums. The force residual tests whether the accepted Master EOM supplies the terminal circular acceleration. The conservation ledger tests Noether bookkeeping over the same branch set. The branch-summed residual equation tests whether the scalar action scaffold has no leftover Euler derivative on that receiver after the direct inverse-square term has already been accounted for.

The regularization is admissible only if it preserves the symmetries that supply the conservation ledger. In action form this means
$$
\delta_{\tau}S_{\lambda}^{(\eta)}=0,
\qquad
\delta_{\mathbf{b}}S_{\lambda}^{(\eta)}=0,
\qquad
\delta_{\boldsymbol{\Omega}}S_{\lambda}^{(\eta)}=0
$$
for global time translations, spatial translations, and spatial rotations. A sufficient local form is to regularize only the causal scalar
$$
\tilde F_{ij}(T,T')
=
T-T'
-
\frac{\|\mathbf X_i(T)-\mathbf X_j(T')\|}{c_f}
$$
by a normalized $\delta_\eta(\tilde F_{ij})$, while keeping $H(0)=0$ and excluding the trivial coincidence self-branch. Such a regularizer depends on Euclidean distance and absolute-time difference, not on a coordinate origin, absolute phase convention, or observer record.

The wake-history increments are then the Noether boundary terms of this same action. For the time-translation channel, a branch contribution across a time boundary $T_\ast$ has the form
$$
E_{b}^{\mathrm{wake}}(T_\ast)
=
\frac{1}{2}
\int_{\{(T_1,T_{\mathrm{em}})\in b:\,T_{\mathrm{em}}\le T_\ast<T_1\}}
\partial_{T_1}
\mathcal{K}_{b}^{(\eta)}(T_1,T_{\mathrm{em}})\,
dT_{\mathrm{em}}\,dT_1
$$
where $\mathcal{K}_{b}^{(\eta)}$ is the weighted regularized causal kernel restricted to branch $b$,
$$
\mathcal{K}_{b}^{(\eta)}(T_1,T_{\mathrm{em}})
=
\frac{\kappa\,\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|}{c_f}
\Theta(T_1-T_{\mathrm{em}})
\frac{\delta_\eta(\tilde F_b(T_1,T_{\mathrm{em}}))}
{r_b(T_1,T_{\mathrm{em}})}
$$
for the pure scalar scaffold. For the delayed-interior characteristic-tail candidate, the branch kernel is instead
$$
\mathcal{K}_{b,\mathrm{eff}}^{(\eta)}(T_1,T_{\mathrm{em}})
=
\frac{\kappa\,\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|}{c_f}
\Theta(T_1-T_{\mathrm{em}})
K_{b,\mathrm{eff}}^{(\eta)}(T_1,T_{\mathrm{em}})
$$
with the trivial self-coincidence branch excluded in either case. Over one outer period,
$$
\Delta E_b^{\mathrm{wake}}
=
E_{b}^{\mathrm{wake}}(T)-E_{b}^{\mathrm{wake}}(0)
$$
The momentum and angular-momentum wake increments are the corresponding spatial-translation and rotation boundary terms:
$$
\Delta\mathbf{p}_b^{\mathrm{wake}}
=
\mathbf{P}_b^{\mathrm{wake}}(T)-\mathbf{P}_b^{\mathrm{wake}}(0),
\qquad
\Delta\mathbf{J}_b^{\mathrm{wake}}
=
\mathbf{J}_b^{\mathrm{wake}}(T)-\mathbf{J}_b^{\mathrm{wake}}(0)
$$
They are fixed by the coefficients of the boundary variations
$$
\delta_{\mathbf{b}}S_b^{(\eta)}
=
\mathbf{b}\cdot
\Delta\mathbf{p}_b^{\mathrm{wake}},
\qquad
\delta_{\boldsymbol{\Omega}}S_b^{(\eta)}
=
\boldsymbol{\Omega}\cdot
\Delta\mathbf{J}_b^{\mathrm{wake}}
$$
with the mechanical increments already written above. Therefore a terminal branch proof has a precise action-level target: derive $\mathcal{I}_b^{(\eta)}$ from the normalized delayed-interior kernel, prove that its branch variation gives $w_b^{(\eta)}$ with the derivative-of-constraint residual cancelled by the receiver-gradient identity, and show that the Noether boundary terms close over the same certified branch set. Until those three steps are complete, the action scaffold supplies a constrained proof route and a rejection test, not a solved terminal $(m,n)$ selection.

The Master Equation fixes the normalized delayed-interior kernel and its energy, momentum, and angular-momentum wake-history boundary increments. The terminal-alignment proof must pull those increments back to the finite terminal branch chart, evaluate the resulting $\Delta E_b^{\mathrm{wake}}$, $\Delta\mathbf{p}_b^{\mathrm{wake}}$, and $\Delta\mathbf{J}_b^{\mathrm{wake}}$, and prove that the mechanical plus wake ledger closes on the same rows that pass the force-residual and root-ledger tests. Until that branch-summed evaluation passes, the terminal rows remain a diagnostic action packet rather than a solved terminal $(m,n)$ selection.

The concrete terminal-chart conservation test is the pullback of the Master Equation charges to $\mathcal{B}_{\mathrm{term}}(\lambda)$. Each retained row must emit
$$
\left(
j_b,o_b,\tau_b,\ell(j_b),\ell(o_b),T_{\mathrm{em},b},T_b,\Delta_b,
r_b,\hat{\mathbf r}_b,\tilde F_b,u_b,J_b,
K_{b,\mathrm{eff}}^{(\eta)},
\partial_{T_b}\mathcal{K}_{b,\mathrm{eff}}^{(\eta)},
\nabla_{\mathbf X_{o_b}(T_b)}\mathcal{K}_{b,\mathrm{eff}}^{(\eta)}
\right)
$$
using the action-level causal scalar
$$
\tilde F_b(T_b,T_{\mathrm{em},b})
=
T_b-T_{\mathrm{em},b}
-
\frac{r_b(T_b,T_{\mathrm{em},b})}{c_f}
$$
The chart then reports the endpoint totals
$$
\mathcal{E}_{\mathrm{term}}^{(\eta)}
=
K_{\mu,\lambda}
+
E_{\mathrm{wake,eff},\lambda}^{(\eta)},
\qquad
\boldsymbol{\mathcal{P}}_{\mathrm{term}}^{(\eta)}
=
\mathbf{P}_{\mathrm{mech},\lambda}
+
\mathbf{P}_{\mathrm{wake,eff},\lambda}^{(\eta)}
$$
$$
\boldsymbol{\mathcal{J}}_{\mathrm{term}}^{(\eta)}
=
\mathbf{J}_{\mathrm{mech},\lambda}
+
\mathbf{J}_{\mathrm{wake,eff},\lambda}^{(\eta)}
$$
The terminal label is conserved only when the increments of all three totals vanish within the declared branch tolerance, after subtracting the Euler-residual and endpoint-leakage terms. The projected action increment $\Delta I_{\mathrm{ME}}$ and any torque integral remain numerical diagnostics until these three totals close on the same $\mathcal{B}_{\mathrm{term}}(\lambda)$ rows.

This scaffold identifies the smallest missing dynamics. The delayed equations must enumerate $\Lambda_{\theta}^{\mathrm{loc}}$ and derive the edge maps $\mathcal{E}_{\nu}^{\pm}$ from the terminal aligned branch. [Noether Braid Doubling-Frequency Resonance Lock](../noether-braid/noether-braid-doubling-frequency-resonance-lock.md) supplies the candidate integer phase lattice, and [Binary Dynamics](../dynamics/binary-dynamics.md#self-hit-definition-and-diagnostics) supplies the self-hit and partner-hit root vocabulary, but neither document yet computes the terminal aligned edge projections from the full three-layer dynamics.

The local-horizon coefficient requires the area-normalized terminal density
$$
\bar{\alpha}_{\mathrm{align}}(\theta)
=
\frac{s_{\mathrm{align}}(\theta)}{a_{\theta}}
\longrightarrow
\frac{1}{4}
$$
in the equilibrium weak-field horizon-interface limit. This is the precise missing dynamics calculation. It fails if terminal alignment admits many inequivalent local labels with long-range constraints that restore volume or history-length scaling, if the observer quotient erases the labels needed for Page-compatible release accounting, or if the transfer rule must be retuned separately for entropy, flux, and downstream observer-geometry recovery.


## Regime Map for Speed Statements (CFT / Horizon / AdS)

To keep speed claims consistent across documents, all binary-speed statements should be read as **regime-qualified**:

| Regime | Inner binary | Middle binary | Outer binary | Operational meaning |
| --- | --- | --- | --- | --- |
| **Partner/exterior comparison regime** (CFT bridge label) | Typically in self-hit branch ($\|\mathbf V\| \gtrsim c_f$ history-supported) | Near the hinge scale ($\|\mathbf V\| \approx c_f$) in working models | Typically $\|\mathbf V\| < c_f$ | Hierarchical nested shell braid operation and ordinary ladder behavior |
| **Terminal-alignment interface** (holographic bridge label) | Forward-sector components approach $c_f$ | Forward-sector components approach $c_f$ | Forward-sector components approach $c_f$ | 3D precessing structure collapses toward planar lock |
| **Self-hit interior comparison regime** (AdS bridge label) | Self-hit dominated; effective closure may involve super-field effective speed | Strongly coupled to inner/outer delay closure | Can participate in states where combined in-plane effective speed satisfies $v_{\text{eff}} > c_f$ | Mach-wedge-like causal geometry and interior recycling hypotheses |

**Notation guardrail:** "$\|\mathbf V\| < c_f$" or "$\|\mathbf V\| = c_f$" in role summaries refers to a component/regime statement, while $v_{\text{eff}} > c_f$ refers to the **combined in-plane effective motion** used in wake-geometry closure.

**Geometry speed guardrail:** Primitive envelope and closure diagnostics use the causal speed $c_f$. Downstream observer-channel dressing is not part of this branch scan. The corresponding kinematic parameter is
$$
\beta_f=\frac{v_{\text{trans}}}{c_f}
$$
Primitive dynamics scans must not mix $c_f$ and $c_{\text{eff}}$ in the same diagnostic. Any $c_{\text{eff}}$ comparison belongs to a downstream observer-channel map.

---

