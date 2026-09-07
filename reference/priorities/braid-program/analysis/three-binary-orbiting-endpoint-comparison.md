# Pair-Conjugate And Sector-Differential Three-Binary Geometry

## Status And Decision

- Owner: [Braid Program](../priorities.md)
- Kind: focused priority-side geometry derivation and pre-EOM comparison
- Created: 2026-08-24
- Configuration name: `centered five-coordinate representative`, meaning sector-differential three-pair geometry
- Claim level: exact prescribed geometry, measured geometry-instrument checks, and one explicit no-go for the requested matched EOM comparison
- Scope: the declared orthonormal three-axis comparison, its pair-conjugate orthogonal-axis three-binary chart, its cyclic sector-differential chart, and the optional three-of-four tetrahedral-axis comparison
- Exclusions: no binding, retention, stability, periodic or relative-periodic return, fermion or generation identity, accessory storage, spin, electromagnetic recovery, mass, Lorentz recovery, energy closure, or comparison with a retained asymmetric counter-breathing representative branch

**Decision: no-go for either EOM solver search in the requested matched form.** The pair-conjugate candidate occupies the axially separated orthogonal-axis three-binary chart, with phase-compensated equal-geometry, coincident-midpoint, and coincident-axis boundaries under the conditions derived below. The cyclic sector-differential candidate is also a coherent six-member map, but exact whole-centroid reduction leaves only five independent internal tangent directions. Its sixth declared sector parameter is a common translation along the cyclic axis. Keeping that direction as an internal coordinate makes the declared center differ from the whole centroid; removing it restores exact centering but prevents a six-to-six matched internal-coordinate comparison.

Plainly: the first candidate is already a well-defined nine-coordinate orthogonal-axis three-binary geometry. The second can use six raw parameters or five centered shape parameters, but not six independent centered shape parameters. Running both as if they had the same six internal controls would compare unlike motions, so the geometry must be repaired before either EOM solver search begins.

Follow-on status: [Five-Coordinate Matched Three-Binary Initialization Ledger](../evidence/three-binary-five-coordinate-initialization-ledger.md) completes the required repair. It supplies injective five-coordinate position and rate maps with exact centering, equal $6I_5$ tangent metrics, exact inverse maps, and a three-coordinate memberwise common locus. It also proves that the remaining two directions cannot be memberwise identical: the Candidate-A complement is polarity antisymmetric and the centered five-coordinate representative midpoint complement is polarity symmetric. The six-to-six no-go therefore remains exact, while the five-coordinate geometry prerequisite is closed for authoring a separate bounded EOM solver protocol.

Plainly: the original comparison remains a no-go as written. A later focused artifact now provides the fair five-to-five replacement and records the unavoidable difference in the last two motions instead of disguising it as a match.

| Comparison row | Candidate A: pair conjugate | centered five-coordinate representative: sector differential |
| --- | --- | --- |
| inventory | three declared neutral pairs | three positive and three negative members with module pairing labels |
| declared internal parameters | nine axially separated orthogonal-axis coordinates and nine rates; three plus three on the phase-compensated equal-geometry sublocus | six named sector parameters and rates |
| injective centered shape count | nine on the generic axially separated chart; three on the phase-compensated equal-geometry sublocus | five on the cyclic centered quotient |
| exact whole centering | automatic pair by pair | requires subtraction of the raw centroid |
| antipodality | exact for every pair | only on the pair-conjugate reduction |
| polarity dipole | generally nonzero | generally nonzero but constrained to the cyclic axis |
| rank-three data | three declared binary axes | the same three declared module axes |
| generic finite fixed-history group | $\mathbb Z_2$ from inversion plus polarity exchange | $C_3$ from cyclic module permutation |
| asymmetric counter-breathing representative identities | neutral inventory and rank-three prescribed axes only | neutral inventory, cyclic equal-sector radii/speeds, and rank-three prescribed axes only |
| pre-EOM status | fully defined | coherent only as five shape coordinates plus one translation coordinate |

Plainly: the table isolates the decisive difference. Candidate A spends its coordinates on three antipodal binary shapes; centered five-coordinate representative spends one of its six raw directions moving the assembly center, leaving five internal shape directions after centering.

## Declared Matched Frame

The primary comparison uses

$$
\hat{\mathbf n}_1=\hat{\mathbf e}_x,
\qquad
\hat{\mathbf n}_2=\hat{\mathbf e}_y,
\qquad
\hat{\mathbf n}_3=\hat{\mathbf e}_z.
$$

Let $Q(x,y,z)=(z,x,y)$. Then $Q^3=I$ and $Q\hat{\mathbf n}_a=\hat{\mathbf n}_{a+1}$ with cyclic indices. Choose base transverse frames

$$
(\tilde{\mathbf u}_1,\tilde{\mathbf v}_1)=(\hat{\mathbf e}_y,\hat{\mathbf e}_z),
\quad
(\tilde{\mathbf u}_2,\tilde{\mathbf v}_2)=(\hat{\mathbf e}_z,\hat{\mathbf e}_x),
\quad
(\tilde{\mathbf u}_3,\tilde{\mathbf v}_3)=(\hat{\mathbf e}_x,\hat{\mathbf e}_y),
$$

and offsets $\phi_a=2\pi(a-1)/3$. Rotate each displayed local frame by $-\phi_a$ so that

$$
\mathbf r_a(\theta+\phi_a)
=
\tilde{\mathbf u}_a\cos\theta
+
\tilde{\mathbf v}_a\sin\theta,
\qquad
Q\mathbf r_a(\theta+\phi_a)
=
\mathbf r_{a+1}(\theta+\phi_{a+1}).
$$

This convention retains the taxonomy's $120^\circ$ phase offsets while making the order-three spatial action exact. The tangential direction is $\mathbf t_a(\psi)=d\mathbf r_a/d\psi$.

Plainly: the local zero marks are rotated so that the written phases differ by $120^\circ$, yet one physical $120^\circ$ rotation still carries module 1 to 2, 2 to 3, and 3 to 1.

The axis Gram matrix is

$$
G_{ab}=\hat{\mathbf n}_a\mathbin{\cdot}\hat{\mathbf n}_b=\delta_{ab},
\qquad
\det G=1,
\qquad
\operatorname{spec}(G)=(1,1,1),
\qquad
\kappa(G)=1.
$$

Its first and second axis moments are

$$
\sum_a\hat{\mathbf n}_a=(1,1,1)=\sqrt3\,\hat{\mathbf k},
\qquad
\hat{\mathbf k}=\frac{1}{\sqrt3}(1,1,1),
\qquad
\sum_a\hat{\mathbf n}_a\hat{\mathbf n}_a^{\mathsf T}=I.
$$

Claim grade: **derived**. The displayed vectors directly give these identities. A reconstructed Gram matrix, frame handedness, or $Q$ action that disagrees would falsify the declaration.

Plainly: the axes are perfectly conditioned and isotropic at second order, but their arrows do not balance. Their nonzero sum is the centering obstruction that distinguishes three rank-three axes from asymmetric counter-breathing representative's four tetrahedral axes.

## Candidate A: Pair-Conjugate Orthogonal-Axis Three-Binary Geometry

For $a\in\{1,2,3\}$, define

$$
\mathbf d_a
=
h_a\hat{\mathbf n}_a
+
\rho_a\mathbf r_a(\theta_a+\phi_a),
$$

$$
\mathbf X_{a,+}=\mathbf C+\mathbf d_a,
\qquad
\mathbf X_{a,-}=\mathbf C-\mathbf d_a.
$$

Its velocity is

$$
\dot{\mathbf d}_a
=
\dot h_a\hat{\mathbf n}_a
+
\dot\rho_a\mathbf r_a
+
\rho_a\dot\theta_a\mathbf t_a,
\qquad
\dot{\mathbf X}_{a,\sigma}
=
\dot{\mathbf C}+\sigma\dot{\mathbf d}_a.
$$

The three vectors $\hat{\mathbf n}_a$, $\mathbf r_a$, and $\mathbf t_a$ are orthonormal. Therefore each endpoint has internal speed

$$
v_a^2
=
\dot h_a^2
+
\dot\rho_a^2
+
\rho_a^2\dot\theta_a^2.
$$

Every numerical example and guard in the instrument uses $c_f=1$; the geometry does not itself impose $v_a<1$.

Plainly: each binary has an axial speed, a track-radius speed, and a speed around the track. Those three perpendicular contributions exhaust the endpoint speed, but the causal-root program must separately decide whether a guarded sub-field-speed or full-root history is admitted.

### Exact Configuration Boundaries

Candidate A occupies the axially separated orthogonal-axis three-binary chart because it has three persistent neutral-binary indices, one common binary midpoint $\mathbf C$, pair antipodality, the declared orthogonal-axis three-binary axes, and independently assignable $(h_a,\rho_a,\theta_a)$ satisfying $R_a^2=h_a^2+\rho_a^2$. Its generic configuration count is nine and its generic rate count is nine.

All nine functions $h_a(T)$, $\rho_a(T)$, and $\theta_a(T)$ may breathe or change cadence independently without leaving the axially separated orthogonal-axis coordinate chart, provided $\rho_a\ge0$, the declared axes and transverse frames remain fixed, and the paired endpoint rule remains exact. Those histories are prescribed geometry until the Master Equation supplies them.

The phase-compensated equal-geometry orthogonal-axis sublocus is selected by all of the following, not by equal radii alone:

$$
h_1=h_2=h_3=h,
\qquad
\rho_1=\rho_2=\rho_3=\rho,
\qquad
\theta_1=\theta_2=\theta_3=\theta,
$$

with the declared $120^\circ$ offsets, one circulation sense, common cadence, and the frame compatibility $Q\mathbf d_a=\mathbf d_{a+1}$. The rate conditions are $\dot h_a=\dot h$, $\dot\rho_a=\dot\rho$, and $\dot\theta_a=\dot\theta$. This cyclic phase-compensated equal-geometry locus has three configuration coordinates and three rates.

The coincident-midpoint orthogonal-axis boundary is

$$
h_1=h_2=h_3=0.
$$

It remains generically rank nine when every $\rho_a>0$ because each binary still has three independent instantaneous tangent directions: changing $h_a$ leaves the coincident-midpoint locus but remains an axially separated-chart tangent, while changing $\rho_a$ and $\theta_a$ moves within the displayed orbit variables. If the audit is restricted to the coincident-midpoint submanifold itself, its intrinsic configuration dimension is six.

The coincident-axis three-binary boundary requires more than axis coincidence:

$$
\hat{\mathbf n}_1=\hat{\mathbf n}_2=\hat{\mathbf n}_3=\hat{\mathbf n}_B,
$$

together with the common midpoint, common frequency, common circulation sense, and fixed coincident-axis coordinate relations. The axis Gram determinant then vanishes, so this boundary is not a rank-three frame even though it is a valid coincident-axis three-binary coordinate locus.

Claim grade: **derived** from the displayed map and the existing orthogonal-axis three-binary/B definitions. A taxonomy row with different required coordinates, or a direct member-map check that violates the stated subset relations, would falsify the classification.

Plainly: the axially separated orthogonal-axis configuration is the general pair-conjugate chart. Its phase-compensated equal-geometry restriction is the cyclic three-coordinate locus, its coincident-midpoint restriction is the zero-axial-offset boundary, and its coincident-axis boundary is reached only after the remaining common-axis restrictions are also imposed.

### Pair-Conjugacy Consequences And Limits

Pair conjugacy alone gives

$$
\frac{\mathbf X_{a,+}+\mathbf X_{a,-}}{2}=\mathbf C,
\qquad
\mathbf X_{a,-}-\mathbf C=-(\mathbf X_{a,+}-\mathbf C),
$$

$$
\sum_{a,\sigma}(\mathbf X_{a,\sigma}-\mathbf C)=\mathbf0,
\qquad
\sum_{a,\sigma}\sigma=0.
$$

It also gives persistent geometric binary labels as long as the record preserves the declared member identities. It does not give a polarity-dipole null. Instead,

$$
\mathbf p_A
=
\sum_{a,\sigma}\sigma(\mathbf X_{a,\sigma}-\mathbf C)
=
2\sum_a\mathbf d_a.
$$

The sector centroids are $\mathbf C\pm\frac13\sum_a\mathbf d_a$. The unweighted and polarity-weighted second moments are

$$
M_A
=
2\sum_a\mathbf d_a\mathbf d_a^{\mathsf T},
\qquad
M_{A,p}=\mathbf0.
$$

For the geometry-only motion moment

$$
\mathbf m_A
=
\sum_{a,\sigma}\sigma
(\mathbf X_{a,\sigma}-\mathbf C)
\mathbin{\times}
(\dot{\mathbf X}_{a,\sigma}-\dot{\mathbf C}),
$$

the two members of every conjugate pair cancel exactly, so $\mathbf m_A=\mathbf0$. The unweighted relative area-rate row of binary $a$ is nevertheless nontrivial:

$$
\boldsymbol\ell_a
=
(\mathbf X_{a,+}-\mathbf X_{a,-})
\mathbin{\times}
(\dot{\mathbf X}_{a,+}-\dot{\mathbf X}_{a,-})
=
4\mathbf d_a\mathbin{\times}\dot{\mathbf d}_a.
$$

These are geometric moments only. They are not electric current, magnetic field, spin, or angular momentum.

Plainly: antipodal pairing centers the whole assembly and preserves three visible pair identities. It does not erase the polarity dipole, and polarity weighting cancels the simplest pairwise motion moment even though each binary still sweeps oriented area.

### Pair Distances And Collision Strata

Write endpoint signs as $\epsilon,\eta\in\{+1,-1\}$. Then

$$
d_{a\epsilon,b\eta}^2
=
\|\epsilon\mathbf d_a-\eta\mathbf d_b\|^2
=
R_a^2+R_b^2-2\epsilon\eta\,\mathbf d_a\mathbin{\cdot}\mathbf d_b.
$$

Within one binary,

$$
d_{a+,a-}=2R_a,
$$

so its exact collision stratum is $h_a=\rho_a=0$. For $a\ne b$, collision occurs exactly when $\mathbf d_a=\epsilon\eta\mathbf d_b$. These vector equations, rather than envelope radii alone, are the complete prescribed collision conditions.

Plainly: two endpoints collide only when their actual displacement vectors agree with the required sign. A nonzero radius protects the two members of one binary but does not automatically protect members belonging to different binaries.

## Centered Five-Coordinate Representative: Cyclic Sector-Differential Three-Pair Geometry

Use one circulation sense $s_a=+1$ for all three modules so that the circulation decoration is the same as on the matched phase-compensated equal-geometry locus. Define the raw offsets

$$
\mathbf y_{a,\sigma}
=
\sigma h_\sigma\hat{\mathbf n}_a
+
\rho_\sigma\mathbf r_a(\sigma\theta_\sigma+\phi_a),
\qquad
\mathbf y_{a+1,\sigma}=Q\mathbf y_{a,\sigma}.
$$

The descriptive formula from Session 22 is $\mathbf X_{a,\sigma}^{\mathrm{raw}}=\mathbf C+\mathbf y_{a,\sigma}$. Its actual whole centroid is

$$
\mathbf C_{\mathrm{actual}}
=
\mathbf C+\boldsymbol\mu,
\qquad
\boldsymbol\mu
=
\frac16\sum_{a,\sigma}\mathbf y_{a,\sigma}.
$$

The exact centered chart is therefore

$$
\mathbf X_{a,\sigma}
=
\mathbf C+\mathbf y_{a,\sigma}-\boldsymbol\mu.
$$

It retains the six named sector parameters $(h_+,\rho_+,\theta_+,h_-,\rho_-,\theta_-)$ as a redundant representation. The next subsection proves that only five combinations are internal shape coordinates.

Plainly: the raw six-parameter picture generally drifts away from the point called $\mathbf C$. Subtracting its exact average restores the declared center, but one parameter combination then becomes a translation label rather than a new internal deformation.

### Centering-Rank Incompatibility

Let $P=I-\hat{\mathbf k}\hat{\mathbf k}^{\mathsf T}$. For a cyclic orbit,

$$
\frac13\sum_{a=1}^3Q^{a-1}\mathbf y_\sigma
=
(\hat{\mathbf k}\mathbin{\cdot}\mathbf y_\sigma)\hat{\mathbf k}.
$$

Define

$$
\zeta
=
\hat{\mathbf k}\mathbin{\cdot}(\mathbf y_+-\mathbf y_-),
\qquad
\gamma
=
\frac12\hat{\mathbf k}\mathbin{\cdot}(\mathbf y_++\mathbf y_-).
$$

After centroid subtraction, every internal member offset has the exact form

$$
\mathbf X_{a,+}-\mathbf C
=
Q^{a-1}P\mathbf y_+
+
\frac{\zeta}{2}\hat{\mathbf k},
$$

$$
\mathbf X_{a,-}-\mathbf C
=
Q^{a-1}P\mathbf y_-
-
\frac{\zeta}{2}\hat{\mathbf k}.
$$

The common scalar $\gamma$ has disappeared because it translates all six raw positions along $\hat{\mathbf k}$ and is absorbed into the center. The centered internal chart therefore contains

$$
2\;\text{components of }P\mathbf y_+
+
2\;\text{components of }P\mathbf y_-
+
1\;\text{differential axial component }\zeta
=5
$$

independent configuration coordinates and five independent rates.

This obstruction is structural for the matched cyclic decoration. More generally, exact separate-sector centering under independent $h_\sigma$ would require

$$
\sum_{a=1}^3\hat{\mathbf n}_a=\mathbf0.
$$

Three vectors satisfying that relation span at most a plane because $\hat{\mathbf n}_3=-(\hat{\mathbf n}_1+\hat{\mathbf n}_2)$. Thus three-member separate-sector centering, independent sector axial scales, and rank-three axes cannot coexist.

Claim grade: **derived**. The projection identities prove the five-coordinate quotient, and the zero-sum equation proves the rank-two boundary. The claim is falsified by six linearly independent centered tangent columns for the declared cyclic member map or by three rank-three axes with zero vector sum.

Plainly: a threefold orbit can move in two sideways directions per polarity sector, while only the separation between the two sector centroids is internal. Their shared motion along the threefold axis is movement of the whole assembly. Four tetrahedral axes avoid this problem because each polarity sector balances independently.

### Retained And Lost Coordinate Properties

Centered centered five-coordinate representative can retain independent named $h_\sigma$, $\rho_\sigma$, and $\theta_\sigma$ histories only with one gauge redundancy. It retains independent sector radii and cadence in the raw cylindrical representation, exact whole centering, a calculable polarity dipole, three persistent module pair labels, and a nondegenerate declared rank-three axis frame. It does not retain six independent internal coordinates or two independent sector-centroid axial translations.

For $\bar{\mathbf y}_\sigma=\frac13\sum_a\mathbf y_{a,\sigma}$, the centered sector centroids are

$$
\mathbf C_+
=
\mathbf C+\frac12(\bar{\mathbf y}_+-\bar{\mathbf y}_-),
\qquad
\mathbf C_-
=
\mathbf C-\frac12(\bar{\mathbf y}_+-\bar{\mathbf y}_-).
$$

The polarity dipole is

$$
\mathbf p_B
=
\sum_a(\mathbf y_{a,+}-\mathbf y_{a,-})
=
3\zeta\hat{\mathbf k}.
$$

It is controlled to the cyclic axis but is not generically zero. Exact dipole null requires $\zeta=0$, which removes the one differential sector-centroid coordinate.

The nominal binary midpoint and antipodality residual are

$$
\mathbf M_a
=
\mathbf C+\frac12(\mathbf y_{a,+}+\mathbf y_{a,-})-\boldsymbol\mu,
$$

$$
\mathbf A_a
=
\mathbf X_{a,+}+\mathbf X_{a,-}-2\mathbf C
=
2(\mathbf M_a-\mathbf C).
$$

The three module labels persist, but generic partners are not antipodal and their midpoints move as a cyclic three-member orbit. This is a pairing convention, not yet a persistent causal-root binary ledger.

Plainly: centered five-coordinate representative keeps three positive-negative module labels, but the paired members generally orbit around moving midpoints. The dipole is forced onto one body line rather than forced to zero.

### Moments, Distances, And Speeds

With $\mathbf z_{a,\sigma}=\mathbf y_{a,\sigma}-\boldsymbol\mu$, the exact moments are

$$
\sum_{a,\sigma}\mathbf z_{a,\sigma}=\mathbf0,
\qquad
M_B=\sum_{a,\sigma}\mathbf z_{a,\sigma}\mathbf z_{a,\sigma}^{\mathsf T},
$$

$$
M_{B,p}
=
\sum_a
\left(
\mathbf z_{a,+}\mathbf z_{a,+}^{\mathsf T}
-
\mathbf z_{a,-}\mathbf z_{a,-}^{\mathsf T}
\right).
$$

Neither second moment is generically isotropic. Cyclic symmetry constrains each to the form $\alpha P+\beta\hat{\mathbf k}\hat{\mathbf k}^{\mathsf T}$ plus, for polarity-weighted rows, the allowed cyclic-axis structure.

Centroid subtraction cancels from every pair difference, so the exact distance formula is

$$
d_{a\sigma,b\tau}^2
=
\|\mathbf y_{a,\sigma}-\mathbf y_{b,\tau}\|^2.
$$

Every collision stratum is exactly the vector equation $\mathbf y_{a,\sigma}=\mathbf y_{b,\tau}$. In particular, a nominal binary collides when

$$
(h_++h_-)\hat{\mathbf n}_a
+
\rho_+\mathbf r_a(\theta_++\phi_a)
-
\rho_-\mathbf r_a(-\theta_-+\phi_a)
=
\mathbf0.
$$

Before centering, each member in sector $\sigma$ has the asymmetric counter-breathing representative-like raw speed budget

$$
v_{\sigma,\mathrm{raw}}^2
=
\dot h_\sigma^2
+
\dot\rho_\sigma^2
+
\rho_\sigma^2\dot\theta_\sigma^2.
$$

For the centered chart, let $\dot{\boldsymbol\mu}=\frac16\sum_{a,\sigma}\dot{\mathbf y}_{a,\sigma}$. Then

$$
v_{a,\sigma}^2
=
v_{\sigma,\mathrm{raw}}^2
+
\|\dot{\boldsymbol\mu}\|^2
-
2\dot{\mathbf y}_{a,\sigma}\mathbin{\cdot}\dot{\boldsymbol\mu}.
$$

Cyclic symmetry makes this centered speed equal across the three members of one sector. The guarded numerical condition remains $v_{a,\sigma}<c_f=1$; it is not imposed by this geometry audit.

Plainly: subtracting the moving centroid changes every member's speed budget. The members of one cyclic sector still share a common speed, but the simple three-square formula belongs to the raw sector chart and needs the exact centroid-motion correction in the centered chart.

The polarity-weighted geometry-only motion moment

$$
\mathbf m_B
=
\sum_{a,\sigma}\sigma
(\mathbf X_{a,\sigma}-\mathbf C)
\mathbin{\times}
(\dot{\mathbf X}_{a,\sigma}-\dot{\mathbf C})
$$

is invariant under $Q$ and therefore lies on the $\hat{\mathbf k}$ line. Its magnitude is not fixed and may vanish. This is the direct threefold replacement for asymmetric counter-breathing representative's body-axis motion-moment statement, not a recovered current, magnetic moment, or spin.

## Exact Reductions Of centered five-coordinate representative

A sufficient and, away from zero-radius chart degeneracy, necessary sector-coordinate condition for exact pair conjugacy is

$$
h_+=h_-=h,
\qquad
\rho_+=\rho_-=\rho,
\qquad
\theta_++\theta_-=\pi\pmod{2\pi}.
$$

The corresponding rate conditions are

$$
\dot h_+=\dot h_-,
\qquad
\dot\rho_+=\dot\rho_-,
\qquad
\dot\theta_++\dot\theta_-=0.
$$

Then $\mathbf y_{a,-}=-\mathbf y_{a,+}$, $\boldsymbol\mu=0$, and the centered five-coordinate representative lies exactly in the axially separated orthogonal-axis chart. Because it already uses common module geometry and the declared cyclic offsets, this reduction lies on the phase-compensated equal-geometry sublocus. It reaches the coincident-midpoint intersection when $h=0$. It reaches the coincident-axis locus only after the three axes are made coincident and the remaining common-axis constraints are imposed; that operation leaves the matched rank-three frame.

Plainly: the centered five-coordinate representative becomes an orthogonal-axis three-binary configuration only when every negative endpoint recovers the exact opposite position and velocity of its positive partner. Under the cyclic common-coordinate decoration used here, that recovered row is the phase-compensated equal-geometry sublocus rather than a generic point of the axially separated chart.

## Symmetry And Master-Equation Boundary

Let $\kappa$ combine spatial inversion about $\mathbf C$ with global polarity exchange. The generic pair-conjugate axially separated orthogonal-axis map is fixed by $\kappa$, so its exact finite fixed-history group is $\mathbb Z_2$ unless additional coordinate equalities add symmetries. On the phase-compensated equal-geometry sublocus, $Q$ also fixes the history up to the cyclic module permutation and commutes with $\kappa$, giving the declared group

$$
G_A=\langle Q,\kappa\rangle\cong C_3\times C_2.
$$

The generic centered five-coordinate representative is fixed by the cyclic action only:

$$
G_B=\langle Q\rangle\cong C_3.
$$

Polarity inversion maps a generic sector-differential row to a conjugate row rather than fixing the same history. Reflections would reverse the oriented circulation chart and are not included without an additional phase/cadence action. Frozen states may have accidental larger groups; those do not govern generic histories.

On a complete ordinary causal-root branch, the Master Equation is equivariant under these constant orthogonal spatial maps and their declared label permutations because Euclidean differences, distances, polarity products, and the complete transformed causal histories are preserved. Therefore:

- the $\kappa$-fixed axially separated orthogonal-axis history surface has tangent acceleration closure;
- the $(Q,\kappa)$-fixed phase-compensated equal-geometry surface has tangent acceleration closure; and
- the $Q$-fixed centered five-coordinate representative surface has tangent acceleration closure only on its five-dimensional internal quotient.

No asymmetric counter-breathing representative $D_{2d}$ theorem is inherited. If raw six-parameter centered five-coordinate representative is used, its extra direction is group-centroid motion along $\hat{\mathbf k}$, not a sixth internal tangent. A time-dependent translating branch is not supplied by a static Euclidean translation symmetry because causal wakes use absolute time. An eventual EOM solver record would have to report the center acceleration separately and measure every acceleration component normal to the declared internal quotient.

Claim grade: **derived** for the finite map actions and conditional equivariance statement. It is falsified by a complete ordinary-root evaluation that violates the transformed acceleration relation. Tangency through multi-root folds or singular strata remains unproved and must not be inferred from this result.

Plainly: symmetry protects Candidate A and the centered five-coordinate representative on ordinary complete root branches. It does not turn the centered five-coordinate representative's sixth raw parameter into internal breathing, and it does not prove a return or allow the asymmetric counter-breathing representative theorem to be copied over.

## Tangent Bases And Ranks

Candidate A has tangent columns, for each $a$,

$$
\partial_{h_a}\mathbf X_{a,\sigma}=\sigma\hat{\mathbf n}_a,
\qquad
\partial_{\rho_a}\mathbf X_{a,\sigma}=\sigma\mathbf r_a,
\qquad
\partial_{\theta_a}\mathbf X_{a,\sigma}=\sigma\rho_a\mathbf t_a.
$$

They have rank nine for $\rho_a>0$. The phase-compensated equal-geometry sublocus restricts them to three common-coordinate sums. The coincident-midpoint intrinsic tangent has rank six, while the containing axially separated-chart tangent remains rank nine at $h_a=0$ if $\rho_a>0$. A phase column vanishes when its $\rho_a=0$.

centered five-coordinate representative's raw six columns are the positive- and negative-sector axial, radial, and phase columns. They have rank six away from cylindrical degeneracy. After exact centroid projection, their Gram matrix has one exact zero eigenvalue on the cyclic locus and rank five. The null direction is the differential parameter combination that produces the common translation $\gamma\hat{\mathbf k}$.

Plainly: the rank calculation says how many distinguishable instantaneous shape changes the positions can see. centered five-coordinate representative's sixth centered parameter changes only the bookkeeping origin, so the members cannot distinguish it from moving the whole assembly.

## Asymmetric Counter-Breathing Representative Identity Ledger

| asymmetric counter-breathing representative identity or structure | Candidate A | Centered centered five-coordinate representative | Determination |
| --- | --- | --- | --- |
| neutral persistent inventory | three positrinos plus three electrinos | three positrinos plus three electrinos | survives exactly |
| exact whole centroid | pairwise automatic | requires explicit centroid subtraction | survives with different mechanism |
| separate sector centroids at the center | no; sector centroids are opposite | no; sector centroids are opposite | lost |
| zero polarity dipole | no; $\mathbf p_A=2\sum_a\mathbf d_a$ | no; $\mathbf p_B=3\zeta\hat{\mathbf k}$ | lost |
| independent six sector shape coordinates | the axially separated chart has nine binary coordinates; its phase-compensated equal-geometry sublocus has three | only five centered internal coordinates | no direct replacement |
| equal radius within each polarity sector | only on constrained loci | yes under cyclic $Q$ | conditional replacement |
| equal speed within each polarity sector | only by module constraints | yes after the centroid correction | conditional replacement |
| isotropic axis second moment | yes, $\sum_a\hat{\mathbf n}_a\hat{\mathbf n}_a^{\mathsf T}=I$ | same | survives up to normalization |
| zero axis first moment | no | no | lost structurally for rank-three three-axis set |
| $D_{2d}$ eight-map chart group | no | no | lost |
| exact finite replacement group | generic $\mathbb Z_2$; phase-compensated equal-geometry sublocus $C_3\times C_2$ | $C_3$ | direct replacement |
| three opposite-edge $K_4$ matchings | no $K_4$ sector exists | no $K_4$ sector exists | lost |
| rank-three orientation data | declared three binary axes | declared three module axes | survives as prescribed axes, not as asymmetric counter-breathing representative opposite-edge history rows |
| body-axis motion moment | pair-weighted row cancels | cyclic row lies on $\hat{\mathbf k}$ | different replacement |
| asymmetric counter-breathing representative pair-clearance formulas | not inherited | not inherited | replaced by the exact vector distance equations above |
| exact member antipodality | yes | only on the phase-compensated equal-geometry reduction | retained only by Candidate A |
| three persistent neutral-binary identities | exact geometric pairs | persistent module labels but moving midpoints | weakened in centered five-coordinate representative |
| return actions | module identity, $\kappa$, and phase-compensated equal-geometry cyclic permutations are candidates | cyclic module permutations are candidates | conditional geometry actions only |

Plainly: the six-member candidates retain neutral inventory, rank-three declared axes, and exact finite symmetries. They lose the four-axis balance, separate-sector centering, dipole null, and opposite-edge construction that make asymmetric counter-breathing representative special.

## Optional Three-Of-Four Tetrahedral Axes

For any three axes retained from the asymmetric counter-breathing representative tetrahedral frame,

$$
G_{3\mathrm{tet}}
=
\begin{pmatrix}
1&-1/3&-1/3\\
-1/3&1&-1/3\\
-1/3&-1/3&1
\end{pmatrix}.
$$

Its eigenvalues are $(4/3,4/3,1/3)$ and

$$
\det G_{3\mathrm{tet}}=\frac{16}{27}.
$$

If $\hat{\mathbf n}_3$ is omitted,

$$
\sum_{a=0}^{2}\hat{\mathbf n}_a=-\hat{\mathbf n}_3,
\qquad
\sum_{a=0}^{2}\hat{\mathbf n}_a\hat{\mathbf n}_a^{\mathsf T}
=
\frac43I-\hat{\mathbf n}_3\hat{\mathbf n}_3^{\mathsf T}.
$$

The second moment has eigenvalue $1/3$ along the missing-axis direction and $4/3$ in its transverse plane. The preferred direction is therefore **derived geometry**. Its usefulness as response structure is only **inferred**; at the current evidence grade it is uncontrolled anisotropy because no retained branch or observer-facing response shows that the direction is selected, suppressed, or exported lawfully.

Plainly: the tetrahedral subset remains rank three, but it remembers exactly which fourth direction was removed. That memory could someday become a response channel, yet today it is simply a large built-in anisotropy.

## Instrument And Independent Checks

The focused instrument is [three-binary-orbiting-endpoint-geometry.mjs](../../../../scripts/mapping-electromagnetism/three-binary-orbiting-endpoint-geometry.mjs). It constructs the pair-conjugate and raw/centered sector-differential maps, uses normalized $c_f=1$, and reports inventory, centroids, polarity dipole, binary midpoints, antipodality, axis Gram data, first and second moments, all 15 pair distances, member speeds, the polarity-weighted motion moment, cyclic-symmetry residual, tangent Gram spectrum, and tangent rank. It fails closed on nonfinite coordinates, negative radii, malformed axes, local-frame errors, or a rank-degenerate declared frame.

The independent test file is [three-binary-orbiting-endpoint-geometry.test.js](../../../../tests/three-binary-orbiting-endpoint-geometry.test.js). Its expected phase-compensated equal-geometry, axially separated, and coincident-midpoint relations, $16/27$ tetrahedral determinant, tetrahedral eigenvalues, pair-conjugate reduction, rank-five centered sector chart, collision control, and malformed-frame rejection are specified independently of the instrument's JSON output. Agreement tests implementation of the displayed derivation; it does not independently validate the Master Equation or any physical interpretation.

The 2026-08-24 declared run measured:

| Sample | Key measured result |
| --- | --- |
| symmetric phase-compensated equal-geometry locus | centroid residual $0$; cyclic residual $3.11\times10^{-17}$; containing axially separated-chart tangent rank $9$; minimum pair distance $0.3094823279$ |
| generic axially separated locus | centroid and antipodality residuals $0$; tangent rank $9$; minimum pair distance $0.1493046076$ |
| coincident-midpoint boundary | centroid residual $0$; containing axially separated-chart tangent rank $9$; minimum pair distance $0.1623165942$ |
| coincident-axis boundary | declared axis Gram determinant $0$; rejected as a rank-three comparison frame |
| generic raw sector-differential row | tangent rank $6$ with nonzero declared-center offset |
| generic centered sector-differential row | centroid and cyclic residuals at floating-point scale; tangent rank $5$; minimum pair distance $0.3113252867$ |
| pair-conjugate sector reduction | maximum antipodality residual $6.21\times10^{-17}$; tangent rank $5$ in the redundant sector coordinates |
| three-axis tetrahedral subset | determinant $0.592592592592593$; eigenvalues $(1/3,4/3,4/3)$; identity residuals below $7.70\times10^{-16}$ |
| deliberate collision | minimum pair distance $0$; phase tangent also loses rank at the zero-radius member |

Claim grade: **measured** by the named geometry instrument on the declared samples. These values are falsified by rerunning the command and obtaining results outside floating-point tolerance from the same immutable inputs. They establish implementation consistency and the sampled ranks, not dynamics or global clearance.

Plainly: the calculations reproduce every exact control and catch both a collision and a bad frame. Their most important result is not that one sample has good clearance; it is that exact centering removes one centered five-coordinate representative tangent direction on every generic cyclic row tested, exactly as the algebra predicts.

## Go/No-Go Adjudication

The requested outcome is **no-go: geometry requires one further matched-chart derivation**.

The failed identity is the claimed six-dimensional internal tangent for an exactly centered, cyclic, sector-differential, rank-three three-axis chart. The incompatibility affects centering and tangent closure directly, and it affects the interpretation of independent sector axial breathing. It does not arise from one numerical phase choice: it is structural for three rank-three cyclic axes under the matched coordinate count. Choosing unequal circulation signs or noncyclic phase offsets may restore a full-rank centered six-parameter immersion, but that would change an additional variable besides pair conjugacy and sector differentiation and would remove the exact $C_3$ tangent theorem.

The smallest relaxation is to accept the exact five-coordinate centered quotient

$$
(P\mathbf y_+,P\mathbf y_-,\zeta)
$$

and treat $\gamma$ as group translation, not internal breathing. The required repair is implemented in [Five-Coordinate Matched Three-Binary Initialization Ledger](../evidence/three-binary-five-coordinate-initialization-ledger.md). That artifact selects five Candidate-A directions, proves that both seeds use the same centroid, coordinate-unit, tangent-metric, and speed conventions, and records that the final two competitor directions have necessarily different polarity parity. A six-to-six EOM comparison would still silently compare one Candidate-A internal coordinate with centered five-coordinate representative's center motion and remains prohibited.

No long EOM solver campaign was launched in this comparison. The follow-on ledger closes only the five-coordinate initialization prerequisite; a bounded EOM solver protocol remains a separate artifact.

Plainly: the repair is small but necessary. Name the five real shape controls, separate the center coordinate, and then choose five genuinely comparable orthogonal-axis three-binary controls. Only after that can the EOM solver answer a fair dynamical question.

## Claim Boundary And Falsifiers

| Claim | Grade | Operator-checkable falsifier |
| --- | --- | --- |
| Candidate A occupies the axially separated orthogonal-axis chart with the stated phase-compensated equal-geometry, coincident-midpoint, and coincident-axis loci | derived | a direct taxonomy/member-map audit contradicts one required coordinate relation |
| pair conjugacy centers the assembly but does not null its polarity dipole | derived | direct summation disagrees with $\mathbf p_A=2\sum_a\mathbf d_a$ |
| centered cyclic centered five-coordinate representative has five internal tangent directions | derived and measured | analytical projection retains $\gamma$, or the declared tangent Gram matrix has six nonzero eigenvalues |
| centered five-coordinate representative has a controlled axial dipole | derived | direct cyclic summation produces a component perpendicular to $\hat{\mathbf k}$ |
| the ordinary-root Master Equation is equivariant under the declared finite groups | derived conditional statement | a complete ordinary-root transformed evaluation violates the orthogonal/permutation acceleration relation |
| the tetrahedral subset has determinant $16/27$ and a preferred missing-axis direction | derived and independently measured | exact Gram algebra or the focused test disagrees |
| the missing-axis direction may be useful later | inferred | a retained matched response shows it is pure leakage or no response projection uses it |
| either candidate has a dynamical advantage or physical role | guessed and currently unsupported | no supporting record exists; any such claim is premature in this pass |

No equilibrium has been established, so no linearization or stability spectrum is defined for either candidate.

Plainly: every conclusion here can be checked against a displayed sum, matrix, tangent basis, or instrument row. None of those checks says that an assembly binds, returns, survives perturbations, or represents a particle.

## Durable Handoff

- Session 22's coordinate proposal is closed at geometry grade by this document and the focused instrument.
- The pair-conjugate map remains an axially separated orthogonal-axis three-binary chart; no separate catalog record is introduced.
- The speculative sector-differential map remains priority-side and is not promoted into reader-facing corpus canon.
- The owning ranked EM recovery queue is unchanged because this comparison was a direct focused geometry request rather than completion of `EMAP-001`.
- The gauge-fixed five-coordinate matched initialization ledger described in the no-go adjudication is complete in [Five-Coordinate Matched Three-Binary Initialization Ledger](../evidence/three-binary-five-coordinate-initialization-ledger.md).
- The next separate artifact, if requested, is a bounded EOM solver protocol that consumes that ledger without adding or retuning coordinates.

Closure goal: preserve the six-to-six no-go and use only the completed injective five-coordinate ledger when authoring any bounded normalized $c_f=1$ EOM solver comparison.
