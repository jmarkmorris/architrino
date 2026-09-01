# Platonic Moving-History Reduction

- **Status:** priority-stage exact reduction packet; no retained-branch, binding, stability, particle-identity, or formation claim is made.
- **Scope:** vertex-only Platonic assemblies, with complete treatment of the balanced regular-octahedral stationary chart and exact symmetry/root reduction for rigid sub-field-speed octahedral histories.
- **Claim level:** derived finite-group classification, exact stationary exclusions, and conditional complete-root reduction; the remaining scalar moving-balance equations are closure targets.
- **Assumptions:** equal-magnitude polarities, normalized $c_f=1$, the canonical regular-domain Master Equation, positive circumradius, rigid co-rotation where stated, and no external or Noether-sea acceleration contribution.
- **Primary owner:** [Shared-Sphere Assemblies](shared-sphere-assemblies.md).

## Exact Calculation Object

A Platonic drawing becomes a calculation only after its point selection, polarity, relationships, motion, scale, and history are separated. Use the specification

$$
\mathcal C=(P,\Lambda,\chi,E,\hat{\mathbf n},R,\mathcal H),
$$

where $P$ is the finite member set, $\Lambda$ is an optional containing lattice or periodic point set, $\chi:P\to\{-1,+1\}$ is the polarity word, $E$ is an optional declared relationship graph, $\hat{\mathbf n}$ is the motion axis when one exists, $R$ is the geometric scale, and $\mathcal H$ is the complete member path history. The Master Equation reads $P$, $\chi$, and $\mathcal H$; it does not infer an interaction cutoff from $E$ or promote unused sites of $\Lambda$ into members.

Plainly: a lattice, a selected solid, the lines drawn between its vertices, and the moving assembly are four different objects. A calculation must say which dots are members and how every member moved throughout the required past interval.

The *vertex-only* program sets $P$ equal to the Platonic vertex set. The *shell-complete* program instead declares every occupied site in the chosen shell family as a member. For a finite union of shells, its receiver row may be grouped as

$$
\mathbf A_i^{(\leq M)}(T)
=
\sum_{m=0}^{M}\mathbf A_i^{(m)}(T),
$$

but each term must still include the polarity and complete causal-root contribution of every transmitter on shell $m$. The vertex-only residual is not the $m=M$ term of a shell-complete residual unless all nonvertex contributions have been explicitly removed from the latter specification.

Plainly: unused lattice sites are excluded members in one program and active transmitters in the other. They cannot be treated as harmless background while their acceleration contributions are silently omitted.

## Coloured-History Equivariance

Let $V\subset S^2$ be a Platonic vertex set and let $G_V\subset O(3)$ be its full point group. A global polarity conjugation leaves every pair product $\chi(u)\chi(v)$ unchanged. The equation-symmetry group of a polarity word is therefore

$$
G_\chi
=
\left\{
g\in G_V:
\chi(gu)=\varepsilon_g\chi(u)
\text{ for every }u\in V,
\ \varepsilon_g\in\{-1,+1\}
\right\}.
$$

The sign $\varepsilon_g=-1$ records a combined spatial transformation and global polarity conjugation. It is an equation symmetry, not an assertion that the two polarities are physically identical.

For a rigid history with angular-velocity vector $\boldsymbol\Omega=\omega\hat{\mathbf n}$,

$$
\mathbf X_u(T)=\mathbf X_0+R\exp\!\left(T[\boldsymbol\Omega]_\times\right)u,
$$

an orthogonal map acts on $\boldsymbol\Omega$ as an axial vector. The complete coloured-history stabilizer is

$$
G_{\chi,\boldsymbol\Omega}
=
\left\{
g\in G_\chi:
\det(g)g\boldsymbol\Omega=\boldsymbol\Omega
\right\}.
$$

This determinant factor is necessary. Treating the rotation axis as an ordinary polar vector gives the wrong stabilizer whenever an improper point-group operation participates.

Plainly: a mirror changes the handedness of an ordinary rotation. The determinant factor keeps track of that change, while the polarity-conjugation flag keeps track of whether all plus and minus labels exchange together.

**Equivariant residual-reduction theorem.** Let $\boldsymbol{\mathcal R}_u(T)$ be the difference between the complete Master-Equation acceleration of member $u$ and the acceleration required by its prescribed rigid history. On a regular causal-root chart preserved by $G_{\chi,\boldsymbol\Omega}$,

$$
\boldsymbol{\mathcal R}_{gu}(T)=g\boldsymbol{\mathcal R}_u(T)
\qquad
(g\in G_{\chi,\boldsymbol\Omega}).
$$

Choose one representative $u_a$ from each orbit of $G_{\chi,\boldsymbol\Omega}$ on $V$, and let $G_{u_a}$ be its site stabilizer. The entire $3|V|$ residual vanishes if and only if the representative residuals vanish in

$$
\bigoplus_a \operatorname{Fix}(G_{u_a}),
\qquad
\operatorname{Fix}(G_{u_a})
=
\{\mathbf y\in\mathbb R^3:g\mathbf y=\mathbf y\text{ for every }g\in G_{u_a}\}.
$$

Consequently the exact number of independent scalar residual channels is

$$
N_{\mathrm{ch}}
=
\sum_a \dim\operatorname{Fix}(G_{u_a}).
$$

*Proof.* Orthogonal covariance carries every receiver, transmitter, causal root, separation direction, transmitter velocity, and required path acceleration into the corresponding transformed row. The common factor $\varepsilon_g$ cancels from each polarity product. Residuals on one site orbit are therefore determined by one representative, while an operation fixing that representative constrains its residual to the operation's fixed vector subspace. The direct sum contains exactly the free representative components. $\square$

Plainly: symmetry does not set the remaining numbers to zero. It proves exactly how many numbers must be calculated and prevents equivalent receiver rows from being counted as independent evidence.

> **Claim grade: derived.** The theorem follows from orthogonal covariance of the regular-domain Master Equation and the displayed group action. A transformed causal root that fails the same root equation, a polarity product that changes under the admitted combined action, or a residual row outside the stated fixed subspace would falsify it. A fold, collision, incomplete history, or added asymmetric provider exits its assumptions rather than refuting it.

## Exact Octahedral Word and Axis Census

Order the regular-octahedral vertices as

$$
(+\mathbf e_x,-\mathbf e_x,+\mathbf e_y,-\mathbf e_y,+\mathbf e_z,-\mathbf e_z).
$$

The unchanged balanced-word enumerator proves that the twenty $3{:}3$ words form two classes under the full octahedral point group and global polarity conjugation. Representatives are `+++---` and `+-+-+-`. In coordinates, the positive sites of `+++---` are $+\mathbf e_x,-\mathbf e_x,+\mathbf e_y$. The second word is antipodal-alternating: its positive sites are $+\mathbf e_x,+\mathbf e_y,+\mathbf e_z$ and form one face, while its negative sites form the opposite face.

Plainly: one class contains a same-polarity antipodal pair for each polarity. The other assigns opposite polarity to every antipodal pair and separates the two polarities onto opposite triangular faces.

The full exact coloured-axis census is as follows. An axis is *generic* in this table when it lies outside every nontrivial fixed-axis line of the displayed word's equation-symmetry group; geometric vertex, edge, or face axes not listed in a special row belong to that generic stratum.

| Balanced word | Angular-velocity-axis stratum, up to coloured equation symmetry | $|G_\chi|$ | $|G_{\chi,\boldsymbol\Omega}|$ | Site orbits | Independent scalar channels |
|---|---:|---:|---:|---:|---:|
| `+++---` | generic | $8$ | $1$ | $6$ | $18$ |
| `+++---` | same-polarity vertex axes $\mathbf e_x$ or $\mathbf e_z$ | $8$ | $2$ | $5$ | $11$ |
| `+++---` | mixed-polarity vertex axis $\mathbf e_y$ | $8$ | $4$ | $2$ | $4$ |
| `+++---` | edge axes $\mathbf e_x\pm\mathbf e_z$ | $8$ | $2$ | $3$ | $9$ |
| `+-+-+-` | generic | $12$ | $2$ | $3$ | $9$ |
| `+-+-+-` | mixed-ring edge axes $\mathbf e_x-\mathbf e_y$, $\mathbf e_x-\mathbf e_z$, or $\mathbf e_y-\mathbf e_z$ | $12$ | $4$ | $2$ | $5$ |
| `+-+-+-` | monochromatic-face axis $\mathbf e_x+\mathbf e_y+\mathbf e_z$ | $12$ | $6$ | $1$ | $3$ |

The generic antipodal-alternating row retains a two-element history symmetry because inversion combined with global polarity conjugation fixes every axial vector and pairs antipodal receiver rows. The monochromatic-face row is the segregated two-triangle history already excluded by the axial sign theorem. Its three channels are the axial, radial, and tangential components of one representative row; symmetry makes every other receiver row equivalent but does not remove any of those three components.

Plainly: there is no finite list of all rotation axes. There is a finite list of axes with extra symmetry, plus a continuous generic stratum. The table completely closes that symmetry stratification for both balanced octahedral words.

The executable audit `scripts/prescribed-path-analysis/oracle/octahedral_word_axis_reduction.py` enumerates the $48$ signed-permutation matrices, applies the axial-vector action, constructs every special-axis orbit, and computes the site-orbit fixed spaces. It is an implementation audit of the displayed algebra, not independent authority for the theorem.

> **Claim grade: derived, with exact executable audit.** The two word classes are independently supplied by the unchanged balanced-word enumerator. The group orders, axis orbits, and channel counts follow from the finite signed-permutation calculation and the theorem above. A missing signed-permutation matrix, another balanced-word orbit, another nontrivial fixed-axis orbit, or a direct fixed-space calculation with a different channel count would falsify the corresponding row.

## Complete Stationary Octahedral Exclusion

At unit circumradius and with the common positive coupling factor suppressed, the antipodal-alternating word gives, at $+\mathbf e_x$,

$$
\mathbf A_{+x}
=
-\frac14\mathbf e_x
-\frac1{\sqrt2}(\mathbf e_y+\mathbf e_z),
\qquad
\|\mathbf A_{+x}\|=\frac{\sqrt{17}}4.
$$

For the other word `+++---`, the $+\mathbf e_y$ receiver row is simply

$$
\mathbf A_{+y}=-\frac14\mathbf e_y.
$$

Both are nonzero. Because the two representatives exhaust all balanced $3{:}3$ words up to octahedral symmetry and global polarity conjugation, no balanced polarity assignment on a stationary regular octahedron has zero acceleration at every member under the declared unsoftened partner row.

Plainly: the earlier stationary calculation excluded one of the two color patterns. The second exact row closes the other pattern, so stationary balance is now completely excluded for a regular octahedron with three members of each polarity.

> **Claim grade: derived, complete within the stationary regular-octahedron chart.** Direct substitution into the signed inverse-square row gives the two displayed vectors. A third balanced-word orbit or a zero recomputation of either representative receiver row would falsify completeness. The result does not exclude deformed six-point geometries, moving histories, external constraints, or Noether-sea contributions.

## Complete Partner-Root Reduction for Rigid Sub-Field Histories

Let every octahedral member follow the rigid history above and suppose

$$
v_{\max}
=
\max_{u\in V}\|\boldsymbol\Omega\times Ru\|
<1.
$$

For distinct receiver $u$ and transmitter $v$, write the positive delay as $\Delta=T_r-T_t$ and define

$$
f_{uv}(\Delta)
=
\|\mathbf X_u(T_r)-\mathbf X_v(T_r-\Delta)\|-\Delta.
$$

At $\Delta=0$, rigid-body separation gives $f_{uv}(0)>0$. The separation is at most $2R$, so $f_{uv}(\Delta)<0$ for $\Delta>2R$. Moreover,

$$
f_{uv}'(\Delta)
=
\hat{\mathbf r}_{uv}\mathbin{\cdot}\mathbf V_v(T_r-\Delta)-1
\leq v_{\max}-1<0.
$$

Thus every ordered partner pair has exactly one causal root in $(0,2R]$, and its transmitter-side Jacobian satisfies

$$
D_{t,uv}
=
1-\hat{\mathbf r}_{uv}\mathbin{\cdot}\mathbf V_v
\geq1-v_{\max}>0.
$$

For a same-transmitter row and any $\Delta>0$, the chord traversed by a path with speed bounded by $v_{\max}<1$ is shorter than $\Delta$; hence there is no nontrivial self-hit root. The complete ledger therefore contains exactly $6\times5=30$ partner roots and no nontrivial self roots at every reception event. A prehistory of depth $2R$ is sufficient; an eternal periodic continuation is one exact way to supply it.

Plainly: below field speed, each of the other five members contributes once to each receiver, no member contributes a delayed hit to itself, and no relevant partner root can lie more than $2R$ into the past.

Rigid rotation also gives the time-uniform simultaneous clearance

$$
d_{\min}=\sqrt2R,
$$

the octahedron's edge length. This excludes coordinate collision without appealing to a sampled trajectory.

> **Claim grade: derived.** Strict monotonicity of $f_{uv}$ proves root existence, uniqueness, and the Jacobian floor; the Lipschitz chord bound excludes self hits; rigid isometry gives clearance. A second positive-delay partner root, a nontrivial self root, a Jacobian below $1-v_{\max}$, or a simultaneous pair distance below $\sqrt2R$ under the stated speed and rigid-history assumptions would falsify the corresponding result. The theorem does not cover a member reaching field speed, a fold, non-rigid motion, incomplete prehistory, or a history with an added provider.

## Dimensionless Complete-Root Residual

Let $\boldsymbol\Omega=\omega\hat{\mathbf n}$ and define $\beta=|\omega|R$. For each ordered pair $u\ne v$, the unique dimensionless delay $s_{uv}=\Delta_{uv}/R$ is the root of

$$
s_{uv}
=
\left\|
u-Q_{\hat{\mathbf n}}(-\beta s_{uv})v
\right\|,
\qquad
0<s_{uv}\leq2,
$$

where $Q_{\hat{\mathbf n}}(\theta)$ is rotation by $\theta$ about $\hat{\mathbf n}$. Define

$$
\begin{aligned}
\mathbf d_{uv}&=u-Q_{\hat{\mathbf n}}(-\beta s_{uv})v,\\
\widehat{\mathbf r}_{uv}&=\frac{\mathbf d_{uv}}{s_{uv}},\\
D_{uv}&=1-\widehat{\mathbf r}_{uv}\mathbin{\cdot}
\left[\beta\hat{\mathbf n}\times Q_{\hat{\mathbf n}}(-\beta s_{uv})v\right],\\
\mathbf F_u(\beta)&=
\sum_{v\ne u}
\chi(u)\chi(v)
\frac{\mathbf d_{uv}}{s_{uv}^3D_{uv}}.
\end{aligned}
$$

If the common charge magnitude is absorbed into $\kappa$, rigid balance is equivalent to

$$
\mathbf F_u(\beta)
=
\lambda\,
\hat{\mathbf n}\times(\hat{\mathbf n}\times u),
\qquad
\lambda=\frac{\beta^2R}{\kappa}>0,
$$

for every vertex $u$, with the $\beta=0$ stationary case treated separately. The equivariant theorem reduces these vector equations to the scalar channel count in the axis table. Because the entire history advances by one common spatial rotation, one reception phase determines every other phase on this rigid periodic chart.

Plainly: for a chosen word and axis, the dynamics problem is now explicit. Solve one monotone delay equation for each ordered pair, add the five delayed contributions at each representative receiver, and test only the independent scalar channels in the table. A small total norm without the individual channel zeros is not balance.

This equation stack closes the residual definition and complete-root census for rigid sub-field-speed octahedral histories. It does not establish that any remaining channel system has a zero. The monochromatic-face axis is already excluded for every ordinary simple-root rigid speed by the one-signed axial theorem; the other special-axis and generic-axis residual systems remain to be solved or bounded.

> **Claim grade: derived residual reduction; existence remains a closure target.** Substitution of the rigid worldlines into the canonical per-hit acceleration gives the displayed dimensionless equations. A direct complete-root evaluation that disagrees with these equations inside the strict speed domain would falsify the reduction. One independently certified common zero would establish prescribed balance at its declared $(\chi,\hat{\mathbf n},\beta,\lambda)$ point but would not establish retention or stability.

## Lattice-Restriction Result and Next Calculation

For the axis-aligned simple-cubic octahedral ladder, neither current periodic polarity map reaches either balanced word class: alternating planes give $6{:}0$ for even scale index and $4{:}2$ for odd index, while the three-dimensional checkerboard is monochromatic at every scale. The balanced octahedral calculation is therefore vertex-only unless a different periodic decoration or the ideal-HCP local $3{:}3$ octahedron is specified explicitly.

The next exact dynamics task is the five-channel antipodal-alternating edge-axis system, followed by the four-channel `+++---` mixed-polarity vertex-axis system. These are the smallest unexcluded rigid strata. A certified zero requires all scalar channels, the thirty-root ledger, the positive $D_{uv}$ floor, and the inferred positive scale $R=\kappa\lambda/\beta^2$ to agree. A positive lower bound on either reduced residual over its complete open speed interval would exclude that stratum. The continuous generic-axis charts and non-rigid histories remain separate programs rather than hidden members of this finite special-axis calculation.

Plainly: the theory has advanced from “try other axes” to two exact low-dimensional systems with a complete root count and clear success or failure certificate. The lattice colorings currently in the app do not supply those balanced octahedral words automatically.

## Closure Boundary

This packet closes four items: the exact calculation object, the stationary balanced-octahedron chart, the coloured rigid-axis symmetry census, and the complete partner-root criterion for every rigid sub-field-speed octahedral history. It does not close moving balance, non-rigid octahedral motion, shell-complete dynamics, retained EOM-solver evolution, or stability. Release under the EOM solver is admissible only after one prescribed residual actually vanishes with its root ledger certified. Linear stability is admissible only after that balance or a genuine periodic solution exists.

Plainly: the bookkeeping and reduction are complete, and stationary octahedra are ruled out. The remaining question is no longer what to calculate; it is whether either of the smallest reduced moving systems has a real zero.
