# F6c Geometry

## Document Status

- Kind: dependency-ordered priority textbook unit and evidence reference
- Status: active companion to [Inferring Braid Requirements](inferring-braid-requirements.md)
- Created: 2026-08-23
- Claim level: exact prescribed geometry and symmetry results, measured bounded EOM-solver diagnostics, and explicitly marked inference or speculation
- Scope: exact F6c construction and geometry; causal-speed, motion-moment, return, and bounded-search evidence; then physical-clock, Lorentz-recovery, strong-field, particle-facing, radiation-facing, and collective six-architrino capture hypotheses
- Exclusions: no retained-braid, stability, particle-identity, effective-charge, effective-mass, spin, magnetic-field, black-hole-carrier, or singularity-resolution claim

## Chapter Overview

F6c is an eight-architrino candidate geometry organized by four tetrahedral body axes. Each axis carries one positrino track and one electrino track. The four positrino tracks share one axial scale, one transverse track radius, and one phase history; the four electrino tracks share a second set of those three quantities. The result is a six-coordinate configuration surface.

F6c is not yet a retained braid. It is a symmetry-protected family of complete eight-member histories on which the Master Equation can be evaluated and from which a retained branch may be sought.

Plainly: F6c is a precisely defined six-coordinate motion template for eight architrinos. It is a candidate architecture, not yet a demonstrated particle or stable assembly.

## Instructional Sequence

The chapter is organized into three dependency-ordered parts. Each later part uses results or definitions established in the preceding part:

1. **Part I — Exact Geometry.** Four tetrahedral axes define the body frame; the exact member map places eight architrinos on six shared sector coordinates; and the resulting paths yield the two-sphere distinction, clearance conditions, face channels, opposite-edge rank-three frame, invariants, and symmetries.
2. **Part II — Dynamics And Evidence.** The guarded and full causal-root regimes delimit the admitted histories. The motion-moment channel and sector handoff describe exact or measured behavior on those histories, while the return tests and evidence boundary state what has and has not closed dynamically.
3. **Part III — Recovery And Physical Interpretation.** Only after the evidence boundary is fixed does the chapter introduce response coordinates, derived clock readout, Lorentz recovery, strong-field continuation, particle-facing roles, radiation-facing roles, and collective six-member capture hypotheses.

Appendix A supplies historical geometry, Appendix B gives an explicitly comparative spin-foam discussion, and Appendix C provides concise cross-topic reference answers. None of the appendices is needed to follow the dependency chain.

Plainly: the chapter first establishes the shape, then asks what the dynamics and calculations support, and only afterward asks what physical jobs a retained F6c history might perform.

## Reader Orientation

The vocabulary and symbol guide define the terms needed throughout the chapter. They are collected here so the geometric derivation can proceed without repeatedly interrupting its dependency chain.

Plainly: this orientation section is a reference desk for the chapter. Readers can return to it whenever a symbol or F6c-specific term needs clarification.

### Vocabulary

| Term | Meaning in F6c |
| --- | --- |
| assembly center | The common origin of the two polarity-sector centroids in the internal F6c chart. |
| tetrahedral axis | One of four unit directions from the center toward the vertices of a regular tetrahedron. It is a reference direction, not a material rod. |
| module | The positrino track and electrino track associated with one tetrahedral axis. |
| polarity sector | All members with one primitive polarity. F6c has a four-positrino sector and a four-electrino sector. |
| axial scale \(h_\sigma\) | The signed coordinate locating the track centers along the sector's tetrahedral axes; \(|h_\sigma|\) is their distance from the assembly center. |
| transverse radius \(\rho_\sigma\) | The radius of each circular track about its local tetrahedral axis in sector \(\sigma\). |
| phase \(\theta_\sigma\) | The shared progress coordinate around the four tracks in sector \(\sigma\), after fixed module signs and phase offsets are applied. |
| cadence \(\dot\theta_\sigma\) | The phase rate. It may change sign, so circulation can slow, stop, or reverse. |
| track-center circumsphere | The sphere through the four circular-track centers in one noncollapsed polarity sector. Its radius is \(|h_\sigma|\). |
| orbit spherical envelope | The sphere on which every complete circular track of one polarity sector lies at a declared instant. Its radius is \(\sqrt{h_\sigma^2+\rho_\sigma^2}\); it is a geometric surface, not a material shell. |
| current axis | Short local label for the body-frame line selected by the polarity-weighted internal motion-moment diagnostic. It is not a translation direction, a demonstrated electric-current direction, or a proven spin axis. |
| charge-facing addition | An additional architrino whose primitive polarity participates in a candidate observer-level charge projection. It is a dynamical member, not a passive charge label. |
| propagating phase cadence | A coherent phase advance carried through source, path, and receiver histories. It is not a rest-frame orbit or material clock. |

Plainly: a sector is a four-member polarity group, a module is one axis-associated positrino/electrino track pair, and the word envelope describes where the paths fit geometrically rather than a substance surrounding them.

Throughout this document, `current moment`, `sector current`, and `current axis` are compact names for the derived F6c motion-moment diagnostic defined below. They do not assert effective electric-charge transport, amperage, a magnetic moment, or a magnetic field.

Plainly: in this file, “current” is shorthand for a specific signed geometry calculation. Whether that calculation becomes an observer-level electric or magnetic source remains an open recovery target.

### Symbol Guide

| Symbol | Meaning |
| --- | --- |
| \(i\in\{0,1,2,3\}\) | Module index. Each value selects one tetrahedral axis and its two polarity-associated tracks. |
| \(\sigma\in\{+1,-1\}\) | Primitive-polarity label: \(+1\) for a positrino and \(-1\) for an electrino. |
| \(\hat{\mathbf n}_i\) | Unit vector along module \(i\)'s tetrahedral axis. A hat marks a unit vector. |
| \(\mathbf u_i,\mathbf v_i\) | Two perpendicular unit vectors spanning the circular track plane normal to \(\hat{\mathbf n}_i\). |
| \(s_i\) | Fixed circulation sign assigned to module \(i\). |
| \(\phi_i\) | Fixed phase offset locating module \(i\) around its track. |
| \(h_\sigma,\rho_\sigma,\theta_\sigma\) | Sector axial scale, transverse radius, and shared phase. |
| \(R_{\mathrm{center},\sigma}=|h_\sigma|\) | Radius of the track-center tetrahedron's circumsphere, or its chart-defined zero-radius limit when the track centers coincide. |
| \(R_{\mathrm{orbit},\sigma}=\sqrt{h_\sigma^2+\rho_\sigma^2}\) | Radius of the sector's orbit spherical envelope, also denoted compactly by \(R_\sigma\). |
| \(\mathbf X_{i\sigma}(T)\) | Position in the Euclidean void of member \((i,\sigma)\) at absolute time \(T\), measured from the F6c assembly center unless a lab-frame translation is explicitly added. |
| \(\dot h_\sigma,\dot\rho_\sigma,\dot\theta_\sigma\) | Absolute-time derivatives. A dot means \(d/dT\). |
| \(\mathbf r_i(\psi),\mathbf t_i(\psi)\) | Unit radial and tangential directions in module \(i\)'s track plane at phase \(\psi\). |
| \(\mathbf m_{\mathrm{cur}}\) | Polarity-weighted internal motion moment. The name is local shorthand, not a measured electric current. |
| \(I_\sigma\) | Sector \(\sigma\)'s contribution to the \(x\)-component of \(\mathbf m_{\mathrm{cur}}\). |
| \(\mathbf q_\sigma=(\dot h_\sigma,\dot\rho_\sigma,\rho_\sigma\dot\theta_\sigma)\) | Sector rate vector in axial, radial, and circulation-speed coordinates. |
| \(\mathbf a_\sigma\) | Geometry coefficient vector satisfying \(I_\sigma=s_\sigma(4/3)\mathbf a_\sigma\mathbin{\cdot}\mathbf q_\sigma\), with the sector sign \(s_+=-1\), \(s_-=+1\). |
| \(\mathbf W_{a,\sigma}\) | Geometric area-normal vector made from the two opposite edges in matching \(a\in\{x,y,z\}\). |
| \(\boldsymbol\ell_{ij,\sigma}\) | Unweighted relative areal-rate vector of same-sector edge \((i,j)\), equal to relative separation crossed with relative velocity. |
| \(\mathbf K_{a,\sigma}\) | Symmetry-adapted signed combination of the two \(\boldsymbol\ell\) rows in opposite-edge matching \(a\). It is a kinematic circulation row, not yet an action-derived angular-momentum row. |
| \(\kappa_{K,\sigma}\) | Conditioning ratio comparing the weakest and strongest nonzero \(\mathbf K\) row magnitudes in one sector. |
| \(\chi_\sigma\) | Body-frame angle of sector \(\sigma\)'s two transverse opposite-edge circulation rows about the common \(x\)-axis. |
| \(\zeta_\sigma=h_\sigma\dot\rho_\sigma-\dot h_\sigma\rho_\sigma\) | Axial--radial shear coefficient used in the opposite-edge circulation rows. |
| \(z_{\mathrm{even}},z_{\mathrm{odd}}\) | Common and polarity-differential combinations of a paired sector variable \(z_+,z_-\). |
| \(\mathbf Z_{z,\sigma}\) | Three-component body vector reconstructed from four zero-sum module perturbations of variable \(z\). |
| \(\tau_{\mathrm{F6c}}\) | Candidate derived clock time obtained by counting complete declared F6c returns. It is not absolute time. |
| \(g_H^{\mathrm{F6c}}\) | Effective ratio between F6c clock ticks received by an exterior observer and ticks generated by the source clock. It includes source, path, Noether-sea, and receiver records. |
| \(\Theta_{\mathrm{F6c}}^H(W)\) | Complete candidate F6c strong-field record over absolute-time window \(W\), including member histories, causal roots, F6c coordinates when defined, and surrounding Noether-sea boundary data. |
| \(\mathcal R_{\mathrm{chart}}^{\mathrm{F6c}}\) | Best-fit residual measuring whether a strong-field eight-member history remains on the strict six-coordinate F6c chart after translation and rotation are removed. |
| \(\Theta_{F,g},\mathcal D_F\) | Complete candidate history for fermion sector \(F\) and generation \(g\), together with its fixed representation-facing decoration or projection. |
| \(\hat{\mathbf k},P_\perp,P_\parallel\) | Declared propagation direction and projectors onto its perpendicular plane and parallel line. |
| \(n_T,n_L\) | Resolved transverse and longitudinal response ranks measured at one declared threshold. |
| \(\mathbf V_{\gamma,\mathrm{group}}\) | Native group velocity of a candidate photon-like traveling packet, defined by the absolute-time motion of its packet center. |
| \(\boldsymbol\delta_\nu,v_i\) | Candidate neutrino mismatch from a neutral photon-like lock and its three proposed collective propagation eigenrecords. |
| \(Q_{A,ij},S_{A,ij},H_{A,ij}^{\mathrm{TT}}\) | Cycle-averaged second moment, symmetric trace-free shape, and transverse-trace-free diagnostic of candidate cell \(A\). |
| \(\overline H_{ij}^{\mathrm{TT}}\) | Coarse-grained tensor diagnostic obtained by applying one frozen interpolation rule to the cell-indexed \(H_{A,ij}^{\mathrm{TT}}\) records. |
| \(\mathcal B_{n,\alpha}^{\mathrm{ret}}\) | Positive-width retained basin for \(n\) charge-facing additions in symmetry-inequivalent history class \(\alpha\). |
| \(d_{-,2},d_{-,4},d_{\pm,4}\) | Representative same-sector and opposite-sector pair distances used to define exact clearance corridors. |
| \(c_f\) | Primitive causal-wake speed. Numerical records in this document use normalized units with \(c_f=1\). |

Plainly: \(i\) answers “which of the four axes?”, while \(\sigma\) answers “which polarity on that axis?” The shape symbols describe the eight-member geometry; the later clock, mode, response, and basin symbols describe the tests that ask whether this geometry can support a physical role.

## Part I — Exact Geometry

Part I constructs F6c from its tetrahedral body frame and derives the identities that follow from the six-coordinate member map. It distinguishes the prescribed configuration surface from a complete dynamical state, then establishes the two sector spheres, member relationships, face channels, opposite-edge frame, invariants, and symmetries. No binding, return, stability, or particle identity is assumed in this part.

Plainly: this part answers what F6c is and what its geometry guarantees before asking whether the Master Equation produces a lasting physical assembly on that geometry.

### Tetrahedral Frame

The four ordered unit axes are

\[
\begin{aligned}
\hat{\mathbf n}_0&=(1,1,1)/\sqrt3,\\
\hat{\mathbf n}_1&=(1,-1,-1)/\sqrt3,\\
\hat{\mathbf n}_2&=(-1,1,-1)/\sqrt3,\\
\hat{\mathbf n}_3&=(-1,-1,1)/\sqrt3.
\end{aligned}
\]

They obey

\[
\sum_{i=0}^{3}\hat{\mathbf n}_i=\mathbf0,
\qquad
\hat{\mathbf n}_i\mathbin{\cdot}\hat{\mathbf n}_j=-\frac13
\quad(i\ne j),
\]

and

\[
\sum_{i=0}^{3}
\hat{\mathbf n}_i\hat{\mathbf n}_i^{\mathsf T}
=
\frac43I.
\]

The angle between any two axes is \(\arccos(-1/3)\simeq109.47^\circ\). These are the standard directions from the center of a regular tetrahedron to its four vertices. Their zero sum provides first-moment cancellation, while their dyadic sum provides an isotropic second-moment identity.

Plainly: the four arrows are evenly balanced in three dimensions. No arrow is the preferred one before the circulation decoration is added.

For each module choose an orthonormal transverse frame

\[
\mathbf u_i
=
\frac{\hat{\mathbf z}\mathbin{\times}\hat{\mathbf n}_i}
{\|\hat{\mathbf z}\mathbin{\times}\hat{\mathbf n}_i\|},
\qquad
\mathbf v_i=\hat{\mathbf n}_i\mathbin{\times}\mathbf u_i,
\]

and define the radial and tangential directions

\[
\mathbf r_i(\psi)
=
\mathbf u_i\cos\psi+\mathbf v_i\sin\psi,
\qquad
\mathbf t_i(\psi)
=
-\mathbf u_i\sin\psi+\mathbf v_i\cos\psi.
\]

Both are perpendicular to \(\hat{\mathbf n}_i\). The track plane for module \(i\) is therefore perpendicular to its tetrahedral axis.

Plainly: each tetrahedral arrow has a circular clock face mounted at right angles to it. The architrino moves around that local clock face; it does not move along the arrow itself.

### Exact Member Map

Let \(\sigma=+1\) label the positrino sector and \(\sigma=-1\) label the electrino sector. The fixed circulation signs and phase offsets are

\[
(s_0,s_1,s_2,s_3)=(-1,-1,+1,+1),
\]

\[
(\phi_0,\phi_1,\phi_2,\phi_3)
=
\left(0,\pi,\frac{4\pi}{3},\frac{\pi}{3}\right).
\]

The member position is

\[
\mathbf X_{i\sigma}(T)
=
\sigma h_\sigma(T)\hat{\mathbf n}_i
+
\rho_\sigma(T)
\mathbf r_i\!\left(
\sigma s_i\theta_\sigma(T)+\phi_i
\right).
\]

The center of its circular track is

\[
\mathbf C_{i\sigma}(T)
=
\sigma h_\sigma(T)\hat{\mathbf n}_i.
\]

Thus the four positrino track centers form a regular tetrahedron and the four electrino track centers form an inverted regular tetrahedron. Each member is then displaced from its track center by a vector of length \(\rho_\sigma\) in the perpendicular plane.

Plainly: the regular tetrahedra belong to the four track centers. The moving architrinos ride around those centers and generally do not themselves form a regular tetrahedron.

One module is better pictured as two parallel circular track planes than as a solid skewer:

    electrino track plane          assembly center          positrino track plane
            circle                       O                         circle
               center -h_- n_i ---- axis n_i ---- center +h_+ n_i

The architrinos occupy points on the circles. The line marked as the axis joins the two track centers; it does not generally pass through both moving members.

### What Six-Coordinate Means

At one instant, eight unconstrained positions would require \(8\times3=24\) Cartesian numbers. On the F6c configuration surface, all 24 numbers are exact functions of only

\[
\mathbf z
=
\left(
h_+,\rho_+,\theta_+,
h_-,\rho_-,\theta_-
\right).
\]

The four members inside a polarity sector share its three coordinates. Their different positions are generated by the fixed axes, circulation signs, and phase offsets rather than by twelve independent Cartesian coordinates.

Plainly: six-coordinate means six numbers specify the complete instantaneous eight-member shape inside the declared F6c family.

This does not mean the complete dynamical state has only six numbers. An instantaneous second-order state also has the six rates

\[
(\dot h_+,\dot\rho_+,\dot\theta_+,
\dot h_-,\dot\rho_-,\dot\theta_-),
\]

and the Master Equation additionally depends on the retained causal history. The full delayed state is therefore not an ordinary six-dimensional state vector.

Plainly: six coordinates describe the shape. Shape velocities and the remembered past are additional dynamical information.

### What Exact Six-Coordinate Means

Exact has three specific meanings here:

1. Every member position is generated by the displayed six-coordinate formula, rather than fitted approximately after evolution.
2. The zero-centroid, zero-dipole, equal-sector-radius, and current-axis identities follow algebraically for arbitrary differentiable coordinate histories.
3. On an ordinary, complete, nondegenerate causal-root branch, a declared order-four symmetry makes the Master Equation acceleration tangent to the same six-coordinate history surface.

The third statement is the F6c symmetry-closure theorem. If an ideal complete history begins exactly on F6c, the symmetric law cannot choose one of the four modules and push it into an independent direction. Numerical calculations can still show leakage from roundoff, root loss, history interpolation, or an implementation error, so leakage remains a measured diagnostic.

Plainly: exact does not mean stable, periodic, or physically realized. It means the reduction and its symmetry identities are mathematical identities rather than a six-parameter approximation.

### Fixed Surface, Moving State, And Changing Tangent Basis

The F6c surface is not a physical membrane that moves through Euclidean space. It is the fixed image of the six-coordinate member map inside the 24-dimensional instantaneous position space. Equivalently, in delayed-history space it is the fixed subset of histories whose member positions obey that map at every admitted time. The coordinates \(h_\sigma(T)\), \(\rho_\sigma(T)\), and \(\theta_\sigma(T)\) move the state through this fixed family; they do not carry the family itself through a larger configuration space.

Plainly: the rule describing all allowed F6c shapes stays fixed. The assembly changes because its six coordinate values change with time, like a point moving across a fixed map whose local coordinate directions rotate from place to place.

To display that rotation, define

\[
\psi_{i\sigma}(T)
=
\sigma s_i\theta_\sigma(T)+\phi_i.
\]

Using \(d\mathbf r_i/d\psi=\mathbf t_i\) and \(d\mathbf t_i/d\psi=-\mathbf r_i\), the exact member velocity is

\[
\dot{\mathbf X}_{i\sigma}
=
\sigma\dot h_\sigma\hat{\mathbf n}_i
+
\dot\rho_\sigma\mathbf r_i
+
\sigma s_i\rho_\sigma\dot\theta_\sigma\mathbf t_i,
\]

and the exact member acceleration is

\[
\ddot{\mathbf X}_{i\sigma}
=
\sigma\ddot h_\sigma\hat{\mathbf n}_i
+
\left(\ddot\rho_\sigma-\rho_\sigma\dot\theta_\sigma^2\right)\mathbf r_i
+
\sigma s_i
\left(2\dot\rho_\sigma\dot\theta_\sigma+\rho_\sigma\ddot\theta_\sigma\right)\mathbf t_i.
\]

The terms \(-\rho_\sigma\dot\theta_\sigma^2\mathbf r_i\) and \(2\dot\rho_\sigma\dot\theta_\sigma\mathbf t_i\) arise solely because the radial and tangential basis directions change along the history. For \(\rho_\sigma>0\), the three vectors \(\hat{\mathbf n}_i\), \(\mathbf r_i\), and \(\mathbf t_i\) are precisely the local axial, radial, and phase tangent directions generated by the sector coordinates. Thus the changing basis does not require a new coordinate or an independently moving surface. The phase chart degenerates at \(\rho_\sigma=0\), which is one reason the symmetry-closure statement is restricted to an ordinary nondegenerate branch.

Plainly: staying on F6c does not mean keeping a fixed tangent plane. The permitted directions turn as the member circulates, but their turning produces radial and tangential acceleration contributions that are already represented by the same three sector coordinates.

Because those three velocity directions are orthogonal, every member in sector \(\sigma\) has

\[
v_\sigma^2
=
\dot h_\sigma^2
+
\dot\rho_\sigma^2
+
\rho_\sigma^2\dot\theta_\sigma^2,
\]

and therefore

\[
\frac12\frac{d v_\sigma^2}{dT}
=
\dot h_\sigma\ddot h_\sigma
+
\dot\rho_\sigma\ddot\rho_\sigma
+
\rho_\sigma\dot\rho_\sigma\dot\theta_\sigma^2
+
\rho_\sigma^2\dot\theta_\sigma\ddot\theta_\sigma
=
\dot{\mathbf X}_{i\sigma}\mathbin{\cdot}\ddot{\mathbf X}_{i\sigma}.
\]

This is a derived kinematic identity for the change in member speed squared. In particular, radial breathing changes the circulation contribution \(\rho_\sigma^2\dot\theta_\sigma^2\) even when the phase cadence is momentarily unchanged. It is therefore an exact input to an eventual energy accounting, but it is not itself a physical energy law: architrinos have no primitive mass, and F6c still lacks a complete action, wake, Noether-sea, energy, and angular-momentum ledger for a retained branch.

Plainly: the formula tells us exactly when the motion is speeding up or slowing down and which coordinate coupling causes the change. Calling that change energy would add physics that has not yet been derived; the complete delayed-interaction ledger must show what quantity is transported, stored, or returned.

Claim grade: the fixed-family distinction and the velocity, acceleration, and speed-squared identities are derived from the member map. Their use as an energy-facing diagnostic is inferred. A physical F6c energy exchange remains open and would require a root-complete retained history whose action, wake, boundary, Noether-sea, and angular ledgers close on the same record.

### Constraint Basis For Six-Coordinate F6c

F6c is selected by a sequence of geometric and dynamical constraints rather than imported from an academic tetrahedral model.

1. The tetrahedral axis set has zero vector sum and isotropic second moment, so it cancels the leading axial dipole while treating the three body directions equally.
2. The two-versus-two circulation partition and fixed phase offsets give exact sector centering, exact dipole cancellation, a nonzero body current channel, and positive prescribed-path clearance.
3. A fixed circular history with one shared cadence is not acceleration-compatible: projection of the evaluated Master Equation acceleration onto its common three-coordinate tangent leaves \(68.408\%\) of the acceleration norm outside that tangent on the declared record.
4. Separate axial, radial, and phase histories for the two polarity sectors reduce the measured normal fraction to \(2.31\times10^{-15}\) on the same root ledger.
5. The exact order-four symmetry proves that tangency of the six-coordinate history surface is structural on the declared complete ordinary root branch rather than a numerical coincidence.

Plainly: the Master Equation needs the positive and negative sectors to breathe and change cadence separately, but it does not require eight unrelated member motions. Six shared sector coordinates are the symmetry-compatible enlargement selected by the acceleration calculation.

Bounded EOM-solver records support that inference. Uniform fixed-ring motion does not approach a relative equilibrium in the searched domain, while ordinary evolutions produce axial turns, radial turns, cadence exchange, and sector-selective circulation reversal while preserving the exact geometry to roundoff. No evolved record supplies a nontrivial direct or reflected full return. Two leading records approach the causal boundary through different channels: one primarily through circulation cadence and one primarily through radial collapse.

Claim grade: inferred. The geometry and symmetry statements are derived; the stated EOM behavior is measured on bounded declared records; retention and physical role remain open.

Plainly: symmetry proves why the six-coordinate surface is the right acceleration-compatible enlargement of F6b, and simulations confirm the expected breathing and cadence exchange locally. They do not yet show that an F6c history binds and repeats as a physical assembly.

### Sector Radii And Spherical Envelopes

Because \(\hat{\mathbf n}_i\) is perpendicular to \(\mathbf r_i\),

\[
\|\mathbf X_{i\sigma}\|^2
=
h_\sigma^2+\rho_\sigma^2.
\]

Consequently all four members in sector \(\sigma\) lie on the sphere whose orbit-envelope radius is denoted explicitly by

\[
R_{\mathrm{orbit},\sigma}(T)
=
\sqrt{h_\sigma(T)^2+\rho_\sigma(T)^2}
=
R_\sigma(T).
\]

Plainly: \(|h_\sigma|\) is the distance from the assembly center to a track center, while \(\rho_\sigma\) is the sideways track radius. Those two perpendicular lengths form a right triangle, so every point on every track is \(R_{\mathrm{orbit},\sigma}\) from the assembly center.

#### Two Different Sector Spheres

The four track centers \(\mathbf C_{i\sigma}=\sigma h_\sigma\hat{\mathbf n}_i\) form a regular tetrahedron whenever \(h_\sigma\ne0\). Its track-center circumsphere is

\[
\mathcal S_{\mathrm{center},\sigma}(T)
=
\left\{
\mathbf X\in\mathbb R^3:
\|\mathbf X\|
=
R_{\mathrm{center},\sigma}(T)
\right\},
\qquad
R_{\mathrm{center},\sigma}(T)
=
|h_\sigma(T)|.
\]

The complete circular member tracks lie on the generally larger orbit spherical envelope

\[
\mathcal S_{\mathrm{orbit},\sigma}(T)
=
\left\{
\mathbf X\in\mathbb R^3:
\|\mathbf X\|
=
R_{\mathrm{orbit},\sigma}(T)
\right\}.
\]

Their radii obey

\[
R_{\mathrm{orbit},\sigma}^2
=
R_{\mathrm{center},\sigma}^2
+
\rho_\sigma^2,
\]

so the two spheres coincide exactly when \(\rho_\sigma=0\). The phrase **virtual sphere** is therefore ambiguous unless it specifies the track-center circumsphere or the orbit spherical envelope.

Plainly: the smaller sphere passes through the four centers of the circular tracks. The larger sphere passes through the circular tracks themselves. When the tracks have nonzero radius, these are different geometric surfaces even though they share the same center.

#### What Path Data Determines The Orbit Sphere?

At one absolute time \(T\), the complete circular track of module \(i\) is

\[
\Gamma_{i\sigma}(T)
=
\left\{
\mathbf C_{i\sigma}(T)
+
\rho_\sigma(T)\mathbf r_i(\psi):
0\le\psi<2\pi
\right\}.
\]

One nondegenerate circle \(\Gamma_{i\sigma}\) does not determine a unique containing sphere. The center of any sphere containing that circle can lie anywhere on the circle's normal line

\[
\mathcal L_{i\sigma}(T)
=
\left\{
\mathbf C_{i\sigma}(T)
+
\lambda\hat{\mathbf n}_i:
\lambda\in\mathbb R
\right\}.
\]

For two different F6c modules \(i\ne j\), the tetrahedral normals are not parallel and both normal lines pass through the assembly center because \(\mathbf C_{i\sigma}=\sigma h_\sigma\hat{\mathbf n}_i\). Their unique intersection is therefore the assembly center. Once that center is fixed, any point on either circle fixes the radius \(R_{\mathrm{orbit},\sigma}\). Thus any two nondegenerate complete F6c tracks with distinct module axes determine the common orbit sphere; the four tracks determine it redundantly.

Plainly: one latitude-like circle could belong to many differently sized spheres whose centers lie along its axle. A second F6c circle has a different axle. The two axles cross only at the assembly center, so together the circles identify both the sphere's center and its radius.

The instantaneous moving-member positions provide a different determination route. Four noncoplanar points determine one unique circumsphere. Therefore, when

\[
\det
\begin{bmatrix}
\mathbf X_{1\sigma}-\mathbf X_{0\sigma}&
\mathbf X_{2\sigma}-\mathbf X_{0\sigma}&
\mathbf X_{3\sigma}-\mathbf X_{0\sigma}
\end{bmatrix}
\ne0,
\]

the moving-member tetrahedron uniquely determines \(\mathcal S_{\mathrm{orbit},\sigma}\) from its four simultaneous vertices. When this determinant is zero, the tetrahedron is degenerate and those simultaneous points alone need not select a unique sphere. The F6c chart still defines \(\mathcal S_{\mathrm{orbit},\sigma}\) through its declared assembly center, \(h_\sigma\), and \(\rho_\sigma\).

Plainly: four genuinely three-dimensional member positions determine their sphere without additional information. If the four positions flatten into one plane, collapse, or coincide, the point pattern loses that uniqueness; the full F6c coordinate record can still supply the intended sphere.

The zero-track-radius case is also distinct. When \(\rho_\sigma=0\) and \(h_\sigma\ne0\), each circular track has collapsed to its track center, but the four noncoplanar track centers still determine their common sphere of radius \(|h_\sigma|\). When \(h_\sigma=\rho_\sigma=0\), all four centers and members coincide at the assembly center. The chart has the well-defined zero-radius limit \(R_{\mathrm{center},\sigma}=R_{\mathrm{orbit},\sigma}=0\), but the coincident point data by itself does not determine a unique containing sphere.

Plainly: a collapsed circle is only a point, so its missing plane and axle cannot help reconstruct a sphere. Four separated tetrahedral points still can; four copies of the same point cannot.

#### Fixed Sphere Versus A Time-Indexed Family

The complete instantaneous track \(\Gamma_{i\sigma}(T)\) must not be confused with the one-dimensional worldline \(T\mapsto\mathbf X_{i\sigma}(T)\). If \(h_\sigma\) and \(\rho_\sigma\) remain constant, every track and member position stays on one fixed orbit sphere while \(\theta_\sigma\) advances. If either scale changes, the history defines a time-indexed family

\[
T
\longmapsto
\mathcal S_{\mathrm{orbit},\sigma}(T),
\qquad
R_{\mathrm{orbit},\sigma}(T)
=
\sqrt{h_\sigma(T)^2+\rho_\sigma(T)^2},
\]

rather than one permanent sphere. During such breathing, the actual member worldline samples one point from a changing instantaneous track at each time; it need not trace any one frozen circle or remain on any one fixed-radius sphere.

Plainly: the instantaneous track is the whole circle available at one frame of the F6c movie. The worldline is the one moving dot followed through many frames. If the assembly breathes, those frames contain different circles and different envelope spheres.

The determination boundary can be summarized as follows:

| Available geometric data | What it determines |
| --- | --- |
| One nondegenerate complete circular track | A one-parameter family of containing spheres, not one sphere |
| Two complete F6c tracks with distinct tetrahedral axes | The unique common orbit spherical envelope at that instant |
| Four noncoplanar simultaneous member positions | The unique moving-member circumsphere, equal to the F6c orbit spherical envelope |
| Degenerate simultaneous member positions without the F6c chart | No guaranteed unique sphere |
| Complete F6c coordinates and assembly center | The orbit spherical envelope at every admitted instant, including degenerate limits |
| A breathing F6c history | A time-indexed family of orbit spheres, not generally one fixed sphere |

Plainly: “the paths determine the virtual sphere” is exact only after saying which path data is available. Complete F6c track geometry determines the envelope; sparse or degenerate point data may not.

F6c therefore has at most two orbit-envelope radii, \(R_{\mathrm{orbit},+}\) and \(R_{\mathrm{orbit},-}\), rather than eight independent center-to-member radii. When \(R_{\mathrm{orbit},+}=R_{\mathrm{orbit},-}\), all eight tracks lie on one common orbit sphere. The labels inner sphere, outer sphere, and midband are only instantaneous geometric labels. During breathing, the two radii can approach, become equal, or exchange order. There is no permanent inner polarity sector unless a retained branch proves that ordering.

Plainly: equal distance from one center is why spherical envelope is the correct phrase. It does not imply that the points are evenly spaced, that the sphere is filled with matter, or that one polarity sector remains permanently inside the other.

Claim grade: **derived**. The two radii, the normal-line reconstruction, the noncoplanar-point uniqueness condition, and the time-indexed family follow from the exact F6c member map and ordinary Euclidean geometry. No retention or material-shell claim is added. The result would be falsified by an exact F6c track that failed the displayed radius identity, by two nonparallel declared track-normal lines whose common center differed from the assembly center, or by a nondegenerate simultaneous member tetrahedron whose unique circumsphere differed from \(\mathcal S_{\mathrm{orbit},\sigma}\).

Plainly: these are geometry theorems about the declared F6c chart. A direct reconstruction from the member coordinates can check every statement; none says the assembly binds, returns, or forms a physical shell.

### Does Either Tetrahedron Stay Rigid Or Regular?

The track-center tetrahedron in one sector has vertices \(\sigma h_\sigma\hat{\mathbf n}_i\). It remains regular because all six of its edge lengths equal

\[
d_{\mathrm{center},\sigma}
=
|h_\sigma|\sqrt{\frac83}.
\]

It is not rigid when \(h_\sigma(T)\) changes: it expands or contracts without changing shape.

The four moving architrinos in that sector generally do not form a regular tetrahedron. Their six pair distances depend on \(h_\sigma\), \(\rho_\sigma\), and \(\theta_\sigma\) and generally split into a two-edge symmetry orbit and a four-edge symmetry orbit. Equal center radii alone do not make four points a regular tetrahedron; regularity would additionally require all six pair distances to agree.

Plainly: the four track centers form a breathing regular tetrahedron. The four riders on those tracks form a deforming tetrahedral constellation on a sphere.

#### Envelope Radius Does Not Determine Pair Clearance

The common sector radius \(R_\sigma\) says how far four members are from the assembly center. It does not say how far they are from one another. The six edges of one instantaneous member tetrahedron split, under the F6c chart symmetry, into a two-edge orbit and a four-edge orbit. Members in one orbit have exactly equal pair distance, but that distance changes with \((h_\sigma,\rho_\sigma,\theta_\sigma)\).

For the negative sector, let \(d_{-,2}\) be the common distance of pairs \((0^-,1^-)\) and \((2^-,3^-)\). Direct substitution gives

\[
d_{-,2}^2
=
\frac49
\left(\sqrt3h_- - \sqrt6\rho_-\sin\theta_-\right)^2
+
\frac49
\left(
\sqrt3h_- -
\sqrt6\rho_-\cos\left(\theta_-+\frac\pi6\right)
\right)^2.
\]

Because this is a sum of two squares, this pair orbit reaches coincidence if and only if

\[
h_- = \frac{\rho_-}{\sqrt2},
\qquad
\theta_- = \frac\pi6 \pmod{2\pi}.
\]

This is an exact geometric danger condition, not a claim that an evolved F6c history reaches it. The other four negative-sector edges have common squared distance

\[
d_{-,4}^2
=
\frac83h_-^2
+\frac{4\sqrt2}{3}h_-\rho_-
\sin\left(\theta_-+\frac\pi3\right)
+\frac23\rho_-^2
\sin\left(2\theta_-+\frac\pi6\right)
+\frac83\rho_-^2.
\]

Plainly: four members can remain on a large, perfectly defined sphere while two of them approach each other. F6c searches therefore need pair-distance guards in addition to envelope-radius guards.

An important opposite-polarity four-pair orbit has exact squared distance

\[
\begin{aligned}
d_{\pm,4}^2={}&
h_+^2-\frac23h_+h_-+h_-^2+\rho_+^2+\rho_-^2\\
&+\frac{4\sqrt2}{3}h_+\rho_-
\sin\left(\theta_-+\frac\pi3\right)
-\frac{4\sqrt2}{3}h_-\rho_+
\cos\left(\theta_++\frac\pi6\right)\\
&-\frac43\rho_+\rho_-\sin\theta_+\sin\theta_-
+\frac{2\sqrt3}{3}\rho_+\rho_-
\sin(\theta_+-\theta_-).
\end{aligned}
\]

This formula shows why relative polarity-sector phase is a physical shape coordinate rather than a removable choice of time origin. Changing \(\theta_+-\theta_-\) can change which polarity class supplies the limiting pair corridor without changing the interaction law or primitive inventory.

Plainly: sliding one sector around its four tracks relative to the other can redirect the closest approach from two members of one polarity to a positive--negative pair. That phase difference changes the actual geometry.

Claim grade: derived. The displayed distance formulas and the two-edge coincidence condition follow from the exact member map. Their use as search guards is inferred. Bounded EOM-solver histories have measured both same-polarity and opposite-polarity limiting corridors, but no complete return has yet protected either class for a full cycle. A direct member-distance reconstruction that disagrees with these formulas would falsify the algebraic rows.

Plainly: the distance equations are exact consequences of the declared F6c positions, and evolved records have encountered the predicted limiting pair classes. What remains unknown is whether a retained cycle can keep every pair safely separated for its complete history.

### Common Center And Translation

Within the exact internal chart,

\[
\sum_i\mathbf X_{i+}=\mathbf0,
\qquad
\sum_i\mathbf X_{i-}=\mathbf0.
\]

Both sector centroids and both spherical-envelope centers therefore coincide at the F6c origin. The complete eight-member centroid is also zero.

One may define a kinematically translated drawing by adding the same \(\mathbf C(T)\) to every member:

\[
\mathbf X_{i\sigma}^{\mathrm{lab}}(T)
=
\mathbf C(T)+\mathbf X_{i\sigma}(T).
\]

Then both envelope centers and both sector centroids coincide at \(\mathbf C(T)\). This is a geometric identity, but \(\mathbf C(T)\) is not one of the six F6c coordinates. A constant spatial shift of a complete record is a Euclidean translation of the same geometry. A time-dependent translating branch must be derived under the delayed Master Equation; it cannot be assumed from the fixed-center theorem, especially because wake propagation is defined relative to absolute time and the Euclidean void.

Plainly: if the whole picture is moved together, the two centers remain the same point. Whether such a moving picture is an allowed physical solution is a separate dynamical question.

### Are The Members Of One Module Antipodal?

No, not in generic F6c. For module \(i\),

\[
\begin{aligned}
\mathbf X_{i+}
&=
h_+\hat{\mathbf n}_i
+\rho_+\mathbf r_i(s_i\theta_++\phi_i),\\
\mathbf X_{i-}
&=
-h_-\hat{\mathbf n}_i
+\rho_-\mathbf r_i(-s_i\theta_-+\phi_i).
\end{aligned}
\]

The track centers are on opposite sides of the assembly center, but the two transverse displacement vectors are generally not opposite. The moving electrino, assembly center, and moving positrino therefore do not generally form one line.

Exact member antipodality,

\[
\mathbf X_{i-}=-\mathbf X_{i+},
\]

requires the special conditions

\[
h_-=h_+,
\qquad
\rho_-=\rho_+,
\qquad
\theta_++\theta_-=\pi\pmod{2\pi}.
\]

More general collinearity through the center requires matching axial/transverse scale ratios plus the same transverse phase opposition. These conditions are not F6c invariants.

Plainly: skewer is a useful name for the line through the two track centers, but it is misleading if taken to mean that the two architrinos remain on that line.

### Polarity Sectors And Assembly Status

F6c has exactly two polarity sectors:

- the positive sector contains four positrinos, one for each tetrahedral module;
- the negative sector contains four electrinos, one for each tetrahedral module.

The sectors are bookkeeping and symmetry partitions inside one eight-member record. They are not presumed to be two separately retained assemblies. Equal inventory gives four positrinos and four electrinos, but it does not by itself derive an observer-level electric charge.

The intended object is one assembly candidate. It becomes one physical assembly only if the eight paths bind, remain root-valid and separated, achieve a nontrivial complete return, and pass the applicable retention and stability requirements. None of those physical promotions has yet occurred.

Plainly: today F6c is one eight-member candidate record with two four-member polarity groups. Calling it a proven assembly would be premature.

### Two-Versus-Two Circulation Pattern

The sign vector

\[
(s_0,s_1,s_2,s_3)=(-1,-1,+1,+1)
\]

divides the four modules into two circulation-sign pairs. In the positrino sector, modules \(0\) and \(1\) use one phase sense while modules \(2\) and \(3\) use the other. The factor \(\sigma\) reverses the coordinate orientation in the electrino sector. The two members associated with one module therefore counterrotate when \(\dot\theta_+\) and \(\dot\theta_-\) have the same sign. Because the two cadences evolve independently and either can reverse, counterrotation is not an invariant of every F6c history.

This is not a division of two positrinos versus two electrinos. Each polarity sector separately has two modules of each circulation sign.

The signed axis sum is

\[
\sum_i s_i\hat{\mathbf n}_i
=
-\frac4{\sqrt3}\hat{\mathbf x}.
\]

Thus this particular two-versus-two partition selects the body \(x\) axis. The other two inequivalent ways to split four modules into two unordered pairs select the body \(y\) and \(z\) axes. These alternatives are orientations of the decorated tetrahedral frame, not established color, generation, or particle labels.

Plainly: the tetrahedral arrows cancel when counted equally, but marking two with one circulation sign and two with the other leaves one signed body direction.

### Tetrahedral Faces And Orbit-Area Channels

#### Track-Center Face Geometry

For \(h_\sigma>0\), the track centers \(\mathbf C_{i\sigma}=\sigma h_\sigma\hat{\mathbf n}_i\) form a nondegenerate regular tetrahedron. The face opposite center \(\mathbf C_{i\sigma}\) has outward unit normal and area

\[
\mathbf N_{i\sigma}=-\sigma\hat{\mathbf n}_i,
\qquad
A_\sigma=\frac{2h_\sigma^2}{\sqrt3}.
\]

Its four oriented area vectors close exactly:

\[
\sum_{i=0}^{3}A_\sigma\mathbf N_{i\sigma}
=
-\sigma A_\sigma
\sum_{i=0}^{3}\hat{\mathbf n}_i
=
\mathbf0.
\]

At \(h_\sigma=0\) the tetrahedron collapses, all four face areas vanish, and the unit face normals no longer describe a full-dimensional tetrahedron.

Plainly: every noncollapsed track-center sector has four equal triangular faces. The four arrows encoding their areas and outward directions balance perfectly.

Vertex \(i\) is naturally paired with the face opposite it. This is a vertex-to-face duality: the architrino at vertex channel \(i\) is not located on that face, but its track axis \(\hat{\mathbf n}_i\) is perpendicular to it.

#### Orbit-Area-Rate Vector

Define the displacement of member \((i,\sigma)\) from its moving track center by

\[
\mathbf d_{i\sigma}
=
\mathbf X_{i\sigma}-\mathbf C_{i\sigma}
=
\rho_\sigma\mathbf r_i(\psi_{i\sigma}),
\qquad
\psi_{i\sigma}
=
\sigma s_i\theta_\sigma+\phi_i.
\]

Its mass-free kinematic orbit-area-rate vector is

\[
\boldsymbol\Lambda_{i\sigma}
=
\mathbf d_{i\sigma}
\mathbin{\times}
\dot{\mathbf d}_{i\sigma}.
\]

Because \(\mathbf r_i\mathbin{\times}\mathbf t_i=\hat{\mathbf n}_i\) and the radial breathing term is parallel to \(\mathbf r_i\), this reduces exactly to

\[
\boldsymbol\Lambda_{i\sigma}
=
\sigma s_i\rho_\sigma^2\dot\theta_\sigma
\hat{\mathbf n}_i.
\]

No mass or imported angular-momentum postulate enters this identity. It is the oriented area-sweep rate of the declared circular track, with twice the conventional areal-velocity normalization. Radial breathing changes the radius and therefore the later magnitude, but its instantaneous radial velocity contributes no cross product.

Plainly: every architrino orbit sweeps area around its skewer axis. Expanding or contracting directly away from the track center does not itself sweep additional area.

Projecting the orbit-area-rate vector through the opposite track-center face gives the signed face channel

\[
q_{i\sigma}
=
\mathbf N_{i\sigma}
\mathbin{\cdot}
\boldsymbol\Lambda_{i\sigma}
=
-s_i\rho_\sigma^2\dot\theta_\sigma.
\]

The polarity sign cancels because the negative-sector orbit vector and its outward face normal both reverse. For the declared circulation decoration,

\[
(q_{0\sigma},q_{1\sigma},q_{2\sigma},q_{3\sigma})
=
\rho_\sigma^2\dot\theta_\sigma(1,1,-1,-1).
\]

The two-versus-two orbit pattern is therefore also a two-versus-two pattern of signed face channels.

Plainly: two faces receive one sign and two receive the other. Both polarity sectors use the same face-sign pattern even though their orbit arrows point in opposite absolute directions.

The track-relative contribution to the polarity-weighted current moment is

\[
\mathbf m_{\mathrm{orb}}
=
\sum_{i,\sigma}
\sigma\boldsymbol\Lambda_{i\sigma}
=
-\frac4{\sqrt3}
\left(
\rho_+^2\dot\theta_+
+
\rho_-^2\dot\theta_-
\right)
\hat{\mathbf x}.
\]

This is one exact part of the complete \(\mathbf m_{\mathrm{cur}}\) below. It does not replace the terms coupling the moving track centers to transverse motion or the complete delayed path-history ledger.

Plainly: the local orbital contributions alone select the same body \(x\) axis as the complete current moment, but they do not determine its entire magnitude.

#### Cross-Sector Face Matching

Corresponding positive- and negative-sector face channels match exactly when

\[
\rho_+^2\dot\theta_+
=
\rho_-^2\dot\theta_-.
\]

Under that condition,

\[
q_{i+}=q_{i-},
\qquad
\boldsymbol\Lambda_{i-}=-\boldsymbol\Lambda_{i+}.
\]

If also \(h_+=h_-\), the corresponding oriented face-area vectors obey

\[
A_+\mathbf N_{i+}
=
-A_-\mathbf N_{i-}.
\]

The scaffold then has four abstract pairs with equal face area, equal signed face-channel scalar, and oppositely directed area and orbit vectors. The paired triangles remain in different planes; matching these quantities does not make them one shared physical face.

Plainly: equal \(h\) matches the face sizes, while equal \(\rho^2\dot\theta\) matches the orbital circulation assigned to them. These are exact algebraic matching conditions, not a claim that the interpenetrating tetrahedra are glued together.

#### Instantaneous Moving-Member Faces

The four moving architrinos in one sector generally form a deforming, nonregular tetrahedron rather than the regular track-center tetrahedron. For the face opposite member \(i\), let \(j,k,\ell\) denote the other three members and define

\[
\mathbf a_{i\sigma}(T)
=
\frac12
\left(\mathbf X_{k\sigma}-\mathbf X_{j\sigma}\right)
\mathbin{\times}
\left(\mathbf X_{\ell\sigma}-\mathbf X_{j\sigma}\right),
\]

with its sign chosen outward. Its instantaneous area and unit normal are

\[
A^{\mathrm{member}}_{i\sigma}
=
\|\mathbf a_{i\sigma}\|,
\qquad
\mathbf N^{\mathrm{member}}_{i\sigma}
=
\frac{\mathbf a_{i\sigma}}
{A^{\mathrm{member}}_{i\sigma}}.
\]

These member-face normals generally are not parallel to the fixed axes \(\hat{\mathbf n}_i\). The difference between \(\mathbf N^{\mathrm{member}}_{i\sigma}\cdot \boldsymbol\Lambda_{i\sigma}\) and \(q_{i\sigma}\) measures how member-face deformation changes the orbit-through-face projection.

Plainly: the regular scaffold supplies the exact reference faces. The moving members supply a second set of faces that tilt and change size. Their difference is calculable at every instant.

All identities in this section are **derived geometry or kinematics** of the declared F6c chart. They are not yet conserved observables. Dynamical promotion requires a retained complete history on which the face channels remain well-defined and exhibit a stable transformation rule. A face-channel interpretation fails if the member tetrahedron repeatedly degenerates, if the channels have no body-frame-stable history, or if they do not contribute to a reproducible assembly-level readout.

### Opposite-Edge-Pair Rank-Three Frame

The four same-sector member labels form the vertices of the complete graph \(K_4\). Its six edges split exactly into three opposite-edge matchings,

\[
\mathcal M_x=\{(0,1),(2,3)\},
\qquad
\mathcal M_y=\{(0,2),(1,3)\},
\qquad
\mathcal M_z=\{(0,3),(1,2)\}.
\]

This decomposition provides a stronger bridge to the three-row Noether-braid architecture than the mere fact that four tetrahedral channels have one linear closure relation. There are two distinct levels of the bridge: a geometric area-normal frame and a velocity-bearing circulation frame.

Plainly: pair each tetrahedron edge with the edge that does not touch it. Exactly three pairs result. Each pair can supply one internal direction, but a direction drawn from one instant is not yet a remembered dynamical ledger.

#### Exact Geometric Area-Normal Frame

For one sector \(\sigma\), define the three opposite-edge area-normal vectors

\[
\begin{aligned}
\mathbf W_{x,\sigma}
&=
(\mathbf X_{0\sigma}-\mathbf X_{1\sigma})
\mathbin{\times}
(\mathbf X_{2\sigma}-\mathbf X_{3\sigma}),\\
\mathbf W_{y,\sigma}
&=
(\mathbf X_{0\sigma}-\mathbf X_{2\sigma})
\mathbin{\times}
(\mathbf X_{1\sigma}-\mathbf X_{3\sigma}),\\
\mathbf W_{z,\sigma}
&=
(\mathbf X_{0\sigma}-\mathbf X_{3\sigma})
\mathbin{\times}
(\mathbf X_{1\sigma}-\mathbf X_{2\sigma}).
\end{aligned}
\]

Plainly: each \(\mathbf W\) arrow is perpendicular to both edges in one opposite-edge pair. The subscripts \(x\), \(y\), and \(z\) name the three pairings, not an assumption about their directions.

Let

\[
\mathbf u_\sigma=\mathbf X_{1\sigma}-\mathbf X_{0\sigma},
\qquad
\mathbf v_\sigma=\mathbf X_{2\sigma}-\mathbf X_{0\sigma},
\qquad
\mathbf w_\sigma=\mathbf X_{3\sigma}-\mathbf X_{0\sigma},
\]

and let the oriented six-times-volume coordinate be

\[
\Delta_\sigma
=
\det
\begin{bmatrix}
\mathbf u_\sigma&\mathbf v_\sigma&\mathbf w_\sigma
\end{bmatrix}.
\]

Plainly: \(\mathbf u_\sigma\), \(\mathbf v_\sigma\), and \(\mathbf w_\sigma\) are the three edges drawn from member zero in sector \(\sigma\). Their determinant \(\Delta_\sigma\) measures the signed volume of the member tetrahedron, multiplied by six; it is zero exactly when that tetrahedron has no three-dimensional volume.

Direct vector-algebra expansion gives the general tetrahedron identity

\[
\det
\begin{bmatrix}
\mathbf W_{x,\sigma}&
\mathbf W_{y,\sigma}&
\mathbf W_{z,\sigma}
\end{bmatrix}
=
2\Delta_\sigma^2.
\]

Therefore the three opposite-edge normals have rank three if and only if the moving-member tetrahedron is nondegenerate. After inserting the strict F6c member map, the decorated symmetry strengthens this result to

\[
\mathbf W_{x,\sigma}
=(a_\sigma,0,0),
\qquad
\mathbf W_{y,\sigma}
=(0,b_\sigma,c_\sigma),
\qquad
\mathbf W_{z,\sigma}
=(0,c_\sigma,-b_\sigma),
\]

for scalar functions \(a_\sigma,b_\sigma,c_\sigma\) of \((h_\sigma,\rho_\sigma,\theta_\sigma)\). Consequently, whenever the member tetrahedron is nondegenerate,

\[
\widehat{\mathbf W}_{a,\sigma}
\mathbin{\cdot}
\widehat{\mathbf W}_{b,\sigma}
=
\delta_{ab},
\qquad
\det
\begin{bmatrix}
\widehat{\mathbf W}_{x,\sigma}&
\widehat{\mathbf W}_{y,\sigma}&
\widehat{\mathbf W}_{z,\sigma}
\end{bmatrix}
=1.
\]

Plainly: the moving architrinos do not usually make a regular tetrahedron, but their three pairs of opposite-edge plane normals still make an exact perpendicular XYZ frame. That frame disappears only when the four points flatten or otherwise become a degenerate tetrahedron.

This is an exact rank-three **geometric frame**. It is not an angular-momentum ledger because it uses position only and says nothing about circulation, causal roots, action, or return.

#### Exact Velocity-Bearing Circulation Frame

For same-sector edge \((i,j)\), define the unweighted relative areal-rate vector

\[
\boldsymbol\ell_{ij,\sigma}
=
(\mathbf X_{i\sigma}-\mathbf X_{j\sigma})
\mathbin{\times}
(\dot{\mathbf X}_{i\sigma}-\dot{\mathbf X}_{j\sigma}).
\]

This is the Euclidean Hodge dual—the ordinary three-dimensional vector representing the oriented plane—of the kinematic bivector formed by relative separation and relative velocity. It has dimensions of area per absolute time. Because architrinos do not carry primitive mass, \(\boldsymbol\ell_{ij,\sigma}\) must not be called a constituent mechanical angular momentum. An action-derived assembly row could eventually weight or replace it.

Plainly: \(\boldsymbol\ell\) measures how fast the line between two members sweeps area. It is the right geometric precursor to an orbital ledger, but it is not yet the conserved quantity that a completed assembly theory would have to derive.

The symmetry-adapted signed opposite-edge combinations are

\[
\begin{aligned}
\mathbf K_{x,\sigma}
&=
\boldsymbol\ell_{01,\sigma}
+
\boldsymbol\ell_{23,\sigma},\\
\mathbf K_{y,\sigma}
&=
\boldsymbol\ell_{02,\sigma}
-
\boldsymbol\ell_{13,\sigma},\\
\mathbf K_{z,\sigma}
&=
\boldsymbol\ell_{03,\sigma}
-
\boldsymbol\ell_{12,\sigma}.
\end{aligned}
\]

The different signs are part of the two-versus-two circulation decoration. Matching \(\mathcal M_x\) contains the two edges whose endpoints have equal circulation signs, while \(\mathcal M_y\) and \(\mathcal M_z\) contain edges whose endpoints have opposite circulation signs.

Plainly: add the two same-circulation-edge sweeps in the \(x\) row, and subtract the paired edge sweeps in the other two rows. This sign rule follows the fixed F6c circulation pattern; it is not a new interaction law.

Direct substitution of the exact member map gives

\[
\mathbf K_{x,\sigma}
=(A_\sigma,0,0),
\qquad
\mathbf K_{y,\sigma}
=(0,B_\sigma,C_\sigma),
\qquad
\mathbf K_{z,\sigma}
=(0,C_\sigma,-B_\sigma).
\]

When the transverse rows are nonzero, define their body-frame angle by

\[
\chi_\sigma
=
\operatorname{atan2}(C_\sigma,B_\sigma).
\]

Then the normalized transverse rows are

\[
\widehat{\mathbf K}_{y,\sigma}
=
(0,\cos\chi_\sigma,\sin\chi_\sigma),
\qquad
\widehat{\mathbf K}_{z,\sigma}
=
(0,\sin\chi_\sigma,-\cos\chi_\sigma).
\]

The positive and negative sectors therefore share the \(x\)-axis but may carry different transverse-frame angles. Their relative twist \(\chi_+-\chi_-\) is real branch data that a one-frame projection would have to preserve or eliminate by a proved symmetry.

Plainly: each polarity sector has its own perpendicular pair of \(y\)- and \(z\)-like arrows, and that pair can rotate about the common \(x\)-axis. F6c does not yet tell us whether a completed assembly ledger should use the positive frame, the negative frame, or one fixed combination of both.

To display the coefficients compactly, define

\[
\zeta_\sigma
=
h_\sigma\dot\rho_\sigma
-
\dot h_\sigma\rho_\sigma,
\qquad
\alpha_+=\theta_++\frac\pi6,
\qquad
\alpha_-=\theta_-+\frac\pi3.
\]

Plainly: the exact symmetry reduces each row to three scalar coefficients. \(A_\sigma\) is the signed strength of the \(x\) row; \(B_\sigma\) and \(C_\sigma\) set the direction and strength of the two transverse rows. The shear coefficient \(\zeta_\sigma\) measures radial change relative to axial change, and \(\alpha_+\) and \(\alpha_-\) are the sector phases shifted by their fixed F6c offsets.

For the positive sector,

\[
\begin{aligned}
A_+
&=
-\frac{8\sqrt6}{3}
\left(
h_+\rho_+\dot\theta_+\cos\alpha_+
+\zeta_+\sin\alpha_+
+\frac{\rho_+^2\dot\theta_+}{\sqrt2}
\right),\\
B_+
&=
4\sqrt2
\left(
h_+\rho_+\dot\theta_+\sin\alpha_+
-\zeta_+\cos\alpha_+
\right),\\
C_+
&=
\frac{4\sqrt6}{3}
\left(
h_+\rho_+\dot\theta_+\cos\alpha_+
+\zeta_+\sin\alpha_+
-\sqrt2\rho_+^2\dot\theta_+
\right).
\end{aligned}
\]

For the negative sector,

\[
\begin{aligned}
A_-
&=
\frac{8\sqrt6}{3}
\left(
-h_-\rho_-\dot\theta_-\sin\alpha_-
+\zeta_-\cos\alpha_-
+\frac{\rho_-^2\dot\theta_-}{\sqrt2}
\right),\\
B_-
&=
4\sqrt2
\left(
h_-\rho_-\dot\theta_-\cos\alpha_-
+\zeta_-\sin\alpha_-
\right),\\
C_-
&=
\frac{4\sqrt6}{3}
\left(
h_-\rho_-\dot\theta_-\sin\alpha_-
-\zeta_-\cos\alpha_-
+\sqrt2\rho_-^2\dot\theta_-
\right).
\end{aligned}
\]

Plainly: each sector supplies one circulation row on the fixed \(x\)-axis and two equal-strength circulation rows forming a perpendicular pair in the \(yz\)-plane. Breathing, radial motion, and motion around the local tracks all contribute to the row strengths.

The exact frame identities are

\[
\mathbf K_{x,\sigma}\mathbin{\cdot}\mathbf K_{y,\sigma}
=
\mathbf K_{x,\sigma}\mathbin{\cdot}\mathbf K_{z,\sigma}
=
\mathbf K_{y,\sigma}\mathbin{\cdot}\mathbf K_{z,\sigma}
=0,
\]

\[
\|\mathbf K_{y,\sigma}\|
=
\|\mathbf K_{z,\sigma}\|
=
\sqrt{B_\sigma^2+C_\sigma^2},
\]

and

\[
\det
\begin{bmatrix}
\mathbf K_{x,\sigma}&
\mathbf K_{y,\sigma}&
\mathbf K_{z,\sigma}
\end{bmatrix}
=
-A_\sigma
\left(B_\sigma^2+C_\sigma^2\right).
\]

Thus the circulation frame has rank three exactly when

\[
A_\sigma\ne0,
\qquad
B_\sigma^2+C_\sigma^2\ne0.
\]

Plainly: the dot products prove that every pair of rows is perpendicular. The determinant proves that all three directions exist exactly when the \(x\)-row strength \(A_\sigma\) is nonzero and at least one of the two transverse coefficients \(B_\sigma,C_\sigma\) is nonzero.

When those conditions hold, the determinant of the three normalized rows has unit magnitude. F6c therefore loses this frame by making a row's magnitude vanish, not by gradually making two nonzero rows parallel. A magnitude-sensitive conditioning diagnostic is

\[
\kappa_{K,\sigma}
=
\frac{
\min\left\{|A_\sigma|,\sqrt{B_\sigma^2+C_\sigma^2}\right\}
}{
\max\left\{|A_\sigma|,\sqrt{B_\sigma^2+C_\sigma^2}\right\}
}.
\]

A retained rank-three claim requires a declared positive floor \(\kappa_{K,\sigma}\ge\delta_K>0\) throughout the complete return window, together with nonzero absolute row-magnitude floors. The ratio alone cannot protect a history on which all three rows vanish together.

Plainly: whenever all three circulation arrows exist, they are exactly perpendicular. The danger is that one arrow can shrink to zero. A valid retained frame must keep every arrow present and usefully large for the entire cycle.

#### Comparison With The Three-Row Nested-Binary Ledger

The opposite-edge calculation recovers the **linear-algebra function** sought from the three nested binaries: three ordered, noncoplanar Hodge-dual directions capable of carrying an internal orientation frame. It does not recover the same constituent partition or the same retained record.

| Requirement | F6c opposite-edge result | Current determination |
| --- | --- | --- |
| Three ordered spatial rows | \(\mathbf K_{x,\sigma},\mathbf K_{y,\sigma},\mathbf K_{z,\sigma}\) | derived exactly |
| Rank-three orientation when rows are nonzero | normalized determinant has magnitude one | derived exactly |
| Three disjoint opposite-polarity binaries | no; each F6c matching contains two same-sector edges | different member-sharing and polarity structure |
| One member assigned to only one row | no; every tetrahedral member participates in all three matchings | different ledger architecture |
| One branch-level three-row frame | not yet; F6c supplies a positive-sector frame and a negative-sector frame with a relative twist | cross-sector projection remains open |
| Action-derived angular-momentum rows | not supplied by \(\boldsymbol\ell\) or \(\mathbf K\) | open |
| Persistent causal-root ledger for each row | not extracted | open |
| Positive nondegeneracy floor over a complete return | violated by some stored finite histories and untested on any retained return | not established |
| Full finite-memory return and stability | no retained F6c return exists | not established |

Plainly: F6c really does contain the intended three-axis bookkeeping skeleton. It realizes that skeleton with shared tetrahedral relations, however, not with three separate positrino--electrino couples. The skeleton becomes the same **kind of retained ledger** only if the delayed dynamics preserves and returns the three rows with their causal and action records.

#### Existing-Record Diagnostic

A report-only direct reconstruction on 2026-08-24 inspected the 32 currently stored positive-time F6c records that had usable frame streams, totaling 5,597 frame groups. The position-only opposite-edge normals had normalized determinant \(1\) to floating-point precision; the maximum residual in the exact identity \(\det[\mathbf W_x\ \mathbf W_y\ \mathbf W_z]=2\Delta^2\) was \(2.22\times10^{-16}\). The velocity-bearing \(\mathbf K\) rows had maximum normalized off-diagonal Gram entry \(2.75\times10^{-13}\) and maximum error in unit determinant magnitude \(5.55\times10^{-16}\) whenever all rows were nonzero.

The same direct reconstruction found three records in which \(K_{x,\sigma}\) changed sign between adjacent saved frames. Continuity therefore brackets an exact zero of that row inside each interval:

| Stored record | Sector | Bracket in absolute time | Signed \(K_x\) endpoints |
| --- | --- | --- | --- |
| `f6c-nonlinear-return-seed-v1` | negative | \([0.111,0.112]\) | \([-7.47236\times10^{-4},\ 6.51252\times10^{-4}]\) |
| `f6c-current-guard-row15-phase3-evolution-v1` | positive | \([0.09,0.10]\) | \([-5.61788\times10^{-3},\ 8.76433\times10^{-3}]\) |
| `f6c-nonlinear-phase-p21-screen-v1` | negative | \([0.2365,0.2370]\) | \([-3.32860\times10^{-4},\ 3.37344\times10^{-4}]\) |

Plainly: the stored paths confirm the exact perpendicular-frame formulas, but three paths also show one axis disappearing and reappearing with the opposite sign. Those histories cannot satisfy a positive rank-three floor, even before asking whether they return or remain stable.

Claim grade: **derived** for the \(\mathbf W\) determinant identity, the signed \(\mathbf K\) decomposition, the orthogonality identities, and the rank condition. The 32-record reconstruction is **measured** by direct position-and-velocity evaluation of existing EOM-solver frame streams; it checks those stored records but is not an independent oracle for the EOM solver and is not a global search. The statement that F6c supplies the same rank-three representation role as the nested-binary frame is **inferred**. A retained-ledger equivalence is **not established**.

Plainly: the equations prove the frame geometry. The stored-frame calculation checks how 32 particular finite paths used it. Neither result proves that the paths repeat, bind, remain stable, or carry the completed three-row ledger.

The current determination would advance to ledger-level equivalence only if one root-complete F6c return supplies three persistent row identities, a fixed cross-sector projection, action-derived row weights, matching causal-root ledgers, positive row-magnitude and conditioning floors, and stable recurrence modulo declared row permutations and signs. It would fail for that branch if any row vanishes, if the required projection changes during the cycle, if the three row ledgers cannot be separated from one another, or if their action and causal-root records do not return with the member histories.

Plainly: the adjudication is concrete. One complete F6c cycle must keep all three arrows alive, combine the positive and negative sector frames by one unchanging rule, return the delayed-interaction history assigned to every row, and remain stable. Until one history does all of that, the answer is “same three-axis scaffold, not the same retained ledger.”

### Exact Invariants And Identities

The word invariant can mean either a quantity that remains fixed or a surface that the dynamics cannot leave. The currently established F6c results include both kinds. The list below is scoped to the declared F6c chart and its complete ordinary causal-root branch.

| Exact row | Statement | Important boundary |
| --- | --- | --- |
| persistent inventory | Eight labeled architrinos: four positrinos and four electrinos | Persistence is input to the record; binding is not proved. |
| net primitive polarity count | \(\sum_{i,\sigma}\sigma=0\) | Does not by itself determine effective charge. |
| tetrahedral first moment | \(\sum_i\hat{\mathbf n}_i=0\) | Identity of the reference axes. |
| tetrahedral Gram relation | \(\hat{\mathbf n}_i\cdot\hat{\mathbf n}_j=-1/3\) for \(i\ne j\) | Identity of the regular tetrahedral frame. |
| tetrahedral second moment | \(\sum_i\hat{\mathbf n}_i\hat{\mathbf n}_i^{\mathsf T}=(4/3)I\) | Isotropy of the axis frame, not of every instantaneous member constellation. |
| sector radius equality | Every member in sector \(\sigma\) has radius \(R_\sigma=\sqrt{h_\sigma^2+\rho_\sigma^2}\) | \(R_\sigma\) may breathe in time. |
| sector centroid | \(\sum_i\mathbf X_{i\sigma}=0\) separately for each polarity | Holds in the internal center chart. |
| total centroid | \(\mathbf X_{\mathrm{grp}}=0\) | A common translation coordinate is outside the six-coordinate chart. |
| centroid velocity | \(\dot{\mathbf X}_{\mathrm{grp}}=0\) | Internal-chart identity, not a theorem about a translating branch. |
| polarity dipole | \(\mathbf p=0\) identically | This is a simple polarity dipole null, not a complete effective-charge result. |
| phase-averaged sector second moment | A complete uniform phase average equals \((4/3)(h_\sigma^2+\rho_\sigma^2)I\) | A phase average is not automatically a time average when breathing and cadence vary. |
| current-axis line | \(\mathbf m_{\mathrm{cur}}=m_x\hat{\mathbf x}\) | The magnitude and sign are not invariant. |
| equal sector-member speed | Every member in sector \(\sigma\) has \(v_\sigma^2=\dot h_\sigma^2+\dot\rho_\sigma^2+(\rho_\sigma\dot\theta_\sigma)^2\) | This is a speed identity, not a conserved speed. |
| edge-orbit equality | Symmetry-related two-edge and four-edge pair classes have identical distances | The distances change with the six coordinates and can approach coincidence. |
| conjugation parity | Common coordinates are even and polarity-differential coordinates are odd under sector exchange | Effective charge from the odd coordinates remains inferred. |
| singlet/triplet split | Four module values split into one common value plus a three-dimensional sum-zero directional part | The response interpretation of those parts is inferred. |
| invariant history surface | The Master Equation acceleration is tangent to F6c when the complete ordinary causal-root branch remains nondegenerate | Does not establish recurrence, attraction, or stability. |
| return-action order | Direct chart returns have order one; reflected shape returns have order one for scalar shape but order two for cadence and fixed-frame axial current | A symmetry return is not automatically a labeled path-history return. |

Plainly: F6c exactly protects its bookkeeping, centers, dipole null, sector shells, current-axis line, and six-coordinate symmetry surface. It does not protect the sizes, speeds, pair separations, current magnitude, or recurrence.

The following are specifically not known invariants:

- \(h_\sigma\), \(\rho_\sigma\), \(\theta_\sigma\), or their rates;
- the two envelope radii;
- any individual pair distance or minimum clearance;
- the sign or magnitude of \(m_x\);
- a simple orbital frequency;
- energy, action, or angular-momentum ledgers for a retained F6c branch;
- binding, retention, stability, particle identity, effective charge, mass, spin, or magnetic moment.

### Exact Symmetries

#### Undecorated Tetrahedral Frame

The four regular tetrahedral axes admit 24 signed-coordinate orthogonal maps. This is the full tetrahedral point-group structure of the undecorated axis set. The circulation signs and phase offsets reduce that symmetry: exactly eight of the 24 maps preserve the F6c common-phase chart.

Those eight maps form the order-eight \(D_{2d}\) pattern after the conventional point-group axes are relabeled so that the F6c current axis is \(x\). Four maps are proper rotations and four are improper maps. This classification agrees with the independently enumerated matrices in [the F6c return-group instrument](../../../scripts/mapping-electromagnetism/f6c-identity-return-group.mjs).

Plainly: a plain tetrahedral frame has 24 rigid spatial symmetries. Adding the F6c circulation pattern keeps only eight.

#### Complete Eight-Map Chart Symmetry

Define the two phase actions

\[
\mathcal R_{\mathrm{direct}}:
(\theta_+,\theta_-)
\longmapsto
(\theta_+,\theta_-),
\]

and

\[
\mathcal R_{\mathrm{reflected}}:
(\theta_+,\theta_-)
\longmapsto
\left(-\theta_+-\frac\pi3,-\theta_-+\frac\pi3\right).
\]

The full chart-preserving inventory is:

| Type | Coordinate map \((x,y,z)\mapsto\) | Module permutation | Phase action | Effect on \(\hat{\mathbf x}\) |
| --- | --- | --- | --- | --- |
| identity | \((x,y,z)\) | identity | direct | preserved |
| proper half-turn \(C_{2x}\) | \((x,-y,-z)\) | \((0\;1)(2\;3)\) | direct | preserved |
| proper half-turn \(C_{2y}\) | \((-x,y,-z)\) | \((0\;2)(1\;3)\) | reflected | reversed |
| proper half-turn \(C_{2z}\) | \((-x,-y,z)\) | \((0\;3)(1\;2)\) | reflected | reversed |
| improper order-four map \(S_{4x}^{+}\) | \((-x,-z,y)\) | \((0\;3\;1\;2)\) | direct | reversed |
| improper order-four map \(S_{4x}^{-}\) | \((-x,z,-y)\) | \((0\;2\;1\;3)\) | direct | reversed |
| diagonal reflection | \((x,z,y)\) | \((2\;3)\) | reflected | preserved |
| diagonal reflection | \((x,-z,-y)\) | \((0\;1)\) | reflected | preserved |

Each row is a combined spatial transformation and module relabeling. A reflected phase action maps a generic F6c state to another state on the chart; it does not leave the original phase coordinates unchanged.

Plainly: every surviving symmetry must move space and relabel the tetrahedral modules consistently. A spatial rotation by itself is not enough.

#### Symmetry-Closure Generator

One direct improper generator is

\[
S=
\begin{pmatrix}
-1&0&0\\
0&0&-1\\
0&1&0
\end{pmatrix},
\qquad
\det S=-1,
\qquad
S^4=I,
\]

with module cycle \(\pi=(0\;3\;1\;2)\). It obeys

\[
S\mathbf X_{i\sigma}(T)
=
\mathbf X_{\pi(i)\sigma}(T)
\]

for arbitrary six-coordinate histories. Because the Master Equation uses Euclidean vector differences, scalar distances, polarity products, and causal path history, it is equivariant under this time-independent orthogonal map and label permutation. This is the exact source of the invariant F6c history surface.

Plainly: the law treats all four symmetry-related modules the same, so an ideal history cannot develop a one-module-only acceleration while the root record remains complete.

#### Proper Return Actions

The four proper rotations give two distinct return types:

- identity and \(C_{2x}\) use the direct phase action;
- \(C_{2y}\) and \(C_{2z}\) use the reflected phase action, exchange same-polarity modules, reverse both cadences, and reverse the fixed-frame current vector.

A reflected relative return can repeat orientation-quotiented scalar shape after one step while cadence and axial current require two steps. It is not automatically a return of the eight labeled path histories because module exchange requires a separate identity-history argument.

Plainly: the visible shape can repeat before the detailed motion and current posture repeat.

#### Observable-Specific Return Order

Suppose a complete delayed geometry \(Z(T)\) has a relative return

\[
Z(T+\tau)=gZ(T)
\]

under one declared chart symmetry \(g\). An observable \(\mathcal O\) need not be unchanged after that first geometric step. If it transforms through \(D_{\mathcal O}(g)\),

\[
\mathcal O(gZ)=D_{\mathcal O}(g)\mathcal O(Z),
\]

then its symmetry-forced return order is the least positive integer \(k_{\mathcal O}\) for which \(D_{\mathcal O}(g)^{k_{\mathcal O}}\) acts as the identity on that observable. Its corresponding return interval is \(k_{\mathcal O}\tau\). A special state may return sooner, so this is a group- action result rather than a claim about every Fourier component.

For an F6c reflected proper action:

| Projection | Result after one interval \(\tau\) | Return order |
| --- | --- | ---: |
| orientation-quotiented scalar shape | unchanged | 1 |
| sector cadence vector | sign reversed | 2 |
| fixed-frame axial current moment | sign reversed | 2 |

Hence an exact reflected relative orbit would obey

\[
\mathbf m_{\mathrm{cur}}(T+\tau)
=
-\mathbf m_{\mathrm{cur}}(T),
\qquad
\mathbf m_{\mathrm{cur}}(T+2\tau)
=
\mathbf m_{\mathrm{cur}}(T).
\]

If that half-cycle relation holds throughout the history, the fixed-frame current average over \(2\tau\) vanishes. A direct return, by contrast, preserves the current-axis orientation and is the natural return type for a persistent fixed-frame current posture.

Plainly: the object can regain the same visible shape after one step while its circulation and current arrow are reversed. A shape-sensitive instrument can therefore repeat twice as often as a current-sensitive instrument without there being two independent internal clocks.

This is also why F6c does not yet establish fermion spin. The reflected action is an ordinary order-two transformation of spatial vectors. Recovering a \(4\pi\) spinor return requires a separately derived lift of the complete ordered path history; vector reversal after one reflected step is not a spinor sign.

Claim grade: derived. The return orders follow from the exact F6c symmetry action. They would be falsified by a direct transformation of the complete member state or current sum that disagrees with the table. No evolved nontrivial F6c relative return has yet realized either row physically.

Plainly: the symmetry calculation says how shape and current would transform if the required relative return occurred. No evolved F6c history has yet made that return, so the table is a conditional prediction rather than a measured clock cycle.

#### Global Polarity Conjugation

Global polarity conjugation is separate from the eight spatial chart maps. It flips every persistent architrino polarity without changing the unlabeled paths. Since each ordered interaction carries a polarity product, both signs flip and the product is unchanged. On the F6c coordinates,

\[
z_{\mathrm{even}}
=
\frac12(z_++z_-),
\qquad
z_{\mathrm{odd}}
=
\frac12(z_+-z_-),
\]

and

\[
\mathcal C:
(z_{\mathrm{even}},z_{\mathrm{odd}})
\longmapsto
(z_{\mathrm{even}},-z_{\mathrm{odd}}).
\]

The polarity-weighted current moment also reverses. This is an exact field-free comparison theorem for the complete globally conjugated record. It does not establish that F6c is charged or identify a particle/antiparticle pair, and it does not apply unchanged when only the receiver is conjugated while an external source is held fixed.

Plainly: swapping every positrino for an electrino and every electrino for a positrino leaves the unlabeled field-free paths available but reverses every polarity-odd readout.

## Part II — Dynamics And Evidence

Part II asks what the declared F6c surface permits under delayed path-history acceleration and what the existing calculations actually establish. It separates causal-speed regimes, derives the body-fixed motion-moment channel, records sector handoff behavior, and states the return conditions and measured failure boundaries before any observer-level role is considered.

Plainly: exact geometry supplies the allowed motion template; dynamics must still decide whether a complete history stays clear, closes, binds, and returns. The evidence boundary is placed here so later physical interpretations cannot outrun those results.

### Two Causal-Speed Regimes

The primitive field speed \(c_f\) is the expansion speed of each causal wake. It is not, by itself, a universal speed limit on an architrino. For a receiver event at \(T_r\) and a transmitter emission time \(T_t\), the causal-root equation and its transmitter-side derivative are

\[
g_{r\leftarrow t}(T_r;T_t)
=
\left\|
\mathbf X_r(T_r)-\mathbf X_t(T_t)
\right\|
-
c_f(T_r-T_t)
=0,
\]

\[
D_t
=
\partial_{T_t}g_{r\leftarrow t}
=
c_f-\hat{\mathbf r}_t\mathbin{\cdot}\mathbf V_t.
\]

If every F6c member satisfies \(v_\sigma<c_f\), then

\[
D_t
\ge
c_f-\|\mathbf V_t\|
>
0
\]

for every transmitter direction. This is a sufficient single-hit guard: the emission-time map is monotone, active roots stay simple, and a strictly sub-field-speed history cannot contain a nontrivial self-hit. It is a useful restricted F6c program, but it is not the whole causal-root domain.

Plainly: keeping every member below the wake speed gives the simplest causal bookkeeping. Each arriving wake can be traced back along an ordered, nonfolded emission-time branch, but that simplification is a chosen guard rather than a derived prohibition on faster member motion.

The unrestricted causal-root program does not impose \(v_\sigma<c_f\). A super-field-speed member history remains admissible when its complete active-root inventory is certified and every simple root retains

\[
|D_t|
\ge
\kappa_{\mathrm{hit}}
>
0,
\]

or when a loss of that floor is routed through a separately certified finite-width fold or singular-stratum chart. The condition \(\|\mathbf V_t\|=c_f\) is not itself a root event. A transmitter-side fold occurs only when the directional projection \(\hat{\mathbf r}_t\cdot\mathbf V_t=c_f\). Super-field-speed history can permit multiple hits and nontrivial self-hits, but speed alone guarantees neither.

Plainly: an architrino may move faster than its wakes without automatically breaking the law. What becomes more complicated is the wake-intersection ledger: several past emissions may reach the same receiver, branches may fold, and the calculation must keep every contribution rather than selecting one convenient root.

The F6c member map, centering identities, and speed-squared identity remain exact in both regimes. The present symmetry-closure theorem is stated for the declared ordinary, complete, nondegenerate causal-root branch. A full-regime retained claim must separately establish tangent closure on symmetry-complete multi-root branches and through any certified finite-width transition rather than assuming that extension. The energy-facing comparison must therefore use the same geometry and initial-history class in both regimes while recording active-root counts, Jacobian signs and floors, self-hit inventory, wake/action transfer, pair clearance, return action, and the complete energy and angular ledgers.

| F6c program | Member-speed condition | Causal-root structure | What it can establish |
| --- | --- | --- | --- |
| guarded single-hit | \(v_+<c_f\) and \(v_-<c_f\) throughout the admitted history | monotone transmitter-time map; no nontrivial self-hit on a wholly guarded interval | the restricted ordinary-root F6c search |
| full causal-root | no global cap on \(v_\sigma\) | complete simple multi-root ledger, plus certified routing at any fold or deeper singular stratum | whether super-field-speed and self-hit channels support a retained F6c branch |

Plainly: both programs test the same six-coordinate geometry. They differ in which causal histories they admit, so neither result may be silently generalized to the other—especially when interpreting changes in speed squared as part of a future energy ledger.

Claim grade: the causal-root equation, Jacobian condition, sub-field monotonicity bound, and self-hit exclusion on a wholly sub-field interval are derived. Treating the two regimes as parallel F6c search programs is an accepted scope decision. The full-regime retention, fold continuation, and energy consequences remain open. This distinction would be falsified by a derivation showing that the Master Equation itself imposes \(\|\mathbf V\|<c_f\), or by a certified full-regime implementation whose admitted root contract is not the one stated here.

### Body-Fixed Current Axis

Define the polarity-weighted current moment

\[
\mathbf m_{\mathrm{cur}}
=
\sum_{i,\sigma}
\sigma\mathbf X_{i\sigma}
\mathbin{\times}
\dot{\mathbf X}_{i\sigma}.
\]

The F6c member coordinates are measured from the assembly center, so \(\mathbf X_{i\sigma}\) and \(\dot{\mathbf X}_{i\sigma}\) in this equation are internal position and internal velocity. The cross product is a kinematic moment: it weights sideways motion by its lever arm from the center. For a simple transverse circle of radius \(\rho\), its magnitude reduces to

\[
\left\|
\mathbf X_\perp\mathbin{\times}\dot{\mathbf X}_\perp
\right\|
=
\rho^2|\dot\theta|.
\]

No mass, mechanical angular momentum, force, or electromagnetic law enters this definition. In the complete F6c expression, circulation and breathing shear can both contribute because each circular track is offset from the assembly center.

Plainly: “moment” means lever-arm-weighted internal motion. A member moving sideways around the center contributes strongly; translating the whole F6c chart is not the motion being measured.

The factor \(\sigma=+1\) for a positrino and \(\sigma=-1\) for an electrino is what makes the sum polarity-weighted. Equal geometric motions by opposite polarities tend to subtract. Opposite geometric circulation can reverse both the cross-product sign and the polarity sign, allowing the two sectors to add:

\[
(+1)(+\hat{\mathbf x})
+
(-1)(-\hat{\mathbf x})
=
2\hat{\mathbf x}.
\]

This schematic sign example suppresses the unequal magnitudes and breathing terms present in a general F6c state.

Plainly: neutrality counts equal positive and negative inventory. It does not require every polarity-weighted pattern of internal motion to cancel.

For arbitrary differentiable F6c coordinate histories,

\[
\mathbf m_{\mathrm{cur}}(T)
=
m_x(T)\hat{\mathbf x}.
\]

`Axial` means that tetrahedral symmetry cancels the transverse components and leaves only the body-frame \(x\) component. `Nonzero` means only that the eight signed contributions fail to cancel completely, so \(m_x\ne0\). It does not mean that net charge crosses a surface or that an observer would measure an electric current.

Plainly: eight internal motions can balance the assembly center and polarity dipole while leaving one signed, direction-dependent motion remainder along the body \(x\) line.

The internal and axial classifications are directly checkable by substituting the exact member map into the defining sum. Any surviving uniform-translation term or nonzero \(y\) or \(z\) component would falsify those classifications. Whether the remaining \(x\) component predicts an observer-level electric or magnetic response is a separate source--sea--receiver closure test.

Plainly: the geometry calculation is independently checkable. Its proposed electromagnetic significance cannot be accepted until a receiver responds in the required way on the same causal history.

The direction line is exact for the declared sign partition. The magnitude is not constant and is jointly produced by circulation and breathing shear. It may change, reverse, or pass through zero. When it is zero, the vector has no defined direction even though the body \(x\) line remains the symmetry-selected channel.

This current axis is not the group-translation axis. Exact internal F6c has zero centroid velocity. It is also not yet a proven assembly-spin axis, magnetic moment, or spinor axis. Those are downstream recovery targets that require a retained history and an observer-level projection.

Plainly: the axis tells us where one polarity-weighted internal-motion diagnostic points. It does not tell us where the whole object moves, prove electric current or a magnetic field, or establish particle spin.

### Current Persistence Can Be A Sector Handoff

This section has two evidence layers. The rate-space equations are exact instantaneous consequences of the F6c coordinate map. The release censuses and continuations that follow are measured, bounded EOM-solver results. They test particular histories; they do not promote F6c to a retained braid.

Plainly: the first part explains the available directions of motion at one instant. The second part reports what selected complete histories actually did for a finite time.

#### Exact Instantaneous Rate Geometry

For each polarity sector define

\[
\mathbf q_\sigma
=
(\dot h_\sigma,\dot\rho_\sigma,
\rho_\sigma\dot\theta_\sigma).
\]

Let \(I_\sigma\) denote sector \(\sigma\)'s contribution to the axial polarity-weighted motion moment. For compact notation, define

\[
\alpha=\theta_++\frac{\pi}{6},
\qquad
\beta=\theta_-+\frac{\pi}{3}.
\]

The exact shape-dependent coefficient vectors are

\[
\begin{aligned}
\mathbf a_+
={}&
\left(
-\sqrt6\rho_+\sin\alpha,
\sqrt6h_+\sin\alpha,
\sqrt6h_+\cos\alpha+\sqrt3\rho_+
\right),\\
\mathbf a_-
={}&
\left(
\sqrt6\rho_-\cos\beta,
-\sqrt6h_-\cos\beta,
\sqrt6h_-\sin\beta-\sqrt3\rho_-
\right).
\end{aligned}
\]

The exact axial sector contribution then has the form

\[
I_\sigma
=
s_\sigma\frac43
\mathbf a_\sigma(h_\sigma,\rho_\sigma,\theta_\sigma)
\mathbin{\cdot}\mathbf q_\sigma,
\]

so its derivative separates shape rotation from acceleration of the rate vector:

\[
\dot I_\sigma
=
s_\sigma\frac43
\left(
\dot{\mathbf a}_\sigma\mathbin{\cdot}\mathbf q_\sigma
+
\mathbf a_\sigma\mathbin{\cdot}\dot{\mathbf q}_\sigma
\right).
\]

Here \(s_+=-1\) and \(s_-=+1\). The vector \(\mathbf q_\sigma\) lists the sector's axial-breathing rate, radial-breathing rate, and tangential rate. The vector \(\mathbf a_\sigma\) is a shape-dependent coefficient derived from the F6c member map. Its direction tells which mixture of the three rates most efficiently changes \(I_\sigma\). In \(\dot I_\sigma\), the first term changes because the shape-dependent coefficient rotates as the shape changes; the second changes because the Master Equation accelerates the three rates. The sector sign \(s_\sigma\) is distinct from the four module circulation signs \(s_i\) in the member map.

Plainly: a sector can support the same instantaneous diagnostic with different mixtures of axial breathing, radial breathing, and circulation. The diagnostic changes either because the shape changes which mixture matters or because the rates themselves change.

For the combined six-coordinate rate vector, a specified instantaneous total current defines a five-dimensional affine hyperplane: a flat five-dimensional slice of the six-dimensional rate space that need not pass through the origin. The unique rate vector with the smallest Euclidean norm lies parallel to the combined current coefficient direction. Every direction perpendicular to that coefficient is current-neutral, meaning that it changes the internal motion without changing the instantaneous total current diagnostic at fixed shape. There are five such independent directions.

Adding one pair-distance-rate condition leaves a four-dimensional affine rate space. The minimum-norm joint rate vector is obtained by projecting the desired current and corridor rate through their two exact linear coefficient directions. At the selected guarded release shape, the current-only minimum-norm rate vector would close the limiting pair at rate \(-0.200974\); the observed geometry opened it at \(+0.195976\). The minimum collective rate norm rose from \(0.333269\) for current alone to \(0.368445\) for current plus a nonclosing boundary and \(0.455370\) for current plus the observed opening rate.

Thus current-neutral motion is not merely unused capacity. For this shape it is required to prevent the current-efficient direction from closing the pair. The four remaining joint-neutral directions are candidate return-control coordinates, subject to delayed-history and root-clearance certification.

Across the 2,348-release census, this conflict occurred in 312 of 1,154 measured opening releases, 15 of 19 opening active handoffs, and all 12 active handoffs that also passed the sector-speed-flow guard. Those 12 retained 51.3%--59.4% of their actual collective rate norm in the four-dimensional joint-neutral space after measured current and corridor rate were both removed. The local screen is deliberately oversampled, so these counts define a motif rather than a basin measure.

Plainly: the slowest way to produce the desired current-like diagnostic can drive two members together. Protecting their separation requires adding motion that is invisible to that diagnostic. The measured counts show that this conflict recurs in the bounded sample, but they do not say how much of the full F6c state space has this property.

#### Sector Speed Decomposition And Guarded Current Capacity

The three entries of \(\mathbf q_\sigma\) are orthogonal components of every member velocity in sector \(\sigma\). Consequently,

\[
v_\sigma^2
=
\dot h_\sigma^2
+
\dot\rho_\sigma^2
+
(\rho_\sigma\dot\theta_\sigma)^2.
\]

Axial breathing, radial breathing, and circulation therefore share one exact speed decomposition. None is a separately available contribution to member speed. In the guarded single-hit program the additional admissibility condition is \(v_\sigma<c_f=1\); the full causal-root program retains the same decomposition without imposing that cap.

It is useful to display the occupied budget as

\[
(f_{h,\sigma},f_{\rho,\sigma},f_{\theta,\sigma})
=
\frac{1}{v_\sigma^2}
\left(
\dot h_\sigma^2,
\dot\rho_\sigma^2,
(\rho_\sigma\dot\theta_\sigma)^2
\right),
\]

whose three entries are nonnegative and sum to one whenever \(v_\sigma\ne0\). This triangle is a diagnostic projection of how the sector uses its motion; it is not a conserved energy partition.

Plainly: a member can approach or cross the guarded-chart boundary by moving rapidly around its track, by breathing rapidly inward or outward, or by moving axially. The three motions add by the Pythagorean rule, so slowing the orbit does not ensure a large guarded margin if breathing takes over.

The exact current formula and the Cauchy--Schwarz inequality give

\[
|I_\sigma|
\le
\frac43\|\mathbf a_\sigma\|v_\sigma.
\]

Under the normalized guarded condition \(v_\sigma<1\), this further gives

\[
|I_\sigma|
<
\frac43\|\mathbf a_\sigma\|.
\]

Thus

\[
I_{\sigma,\mathrm{cap}}
=
\frac43\|\mathbf a_\sigma\|
\]

is the sector geometry's instantaneous unit-speed current capacity and is an upper bound on \(|I_\sigma|\) only in normalized histories guarded by \(v_\sigma<1\). In the full causal-root regime the exact statement is the speed-dependent bound \(|I_\sigma|\le(4/3)\|\mathbf a_\sigma\|v_\sigma\), with no speed-independent current cap supplied by this geometry alone. At a fixed sector speed, the bound is saturated only when the rate vector is parallel or antiparallel to \(\mathbf a_\sigma\). The two-dimensional plane perpendicular to \(\mathbf a_\sigma\) carries internal motion with zero instantaneous sector-current projection.

A dimensionless alignment diagnostic is

\[
\eta_{I,\sigma}
=
\frac{|I_\sigma|}
{(4/3)\|\mathbf a_\sigma\|v_\sigma},
\qquad
0\le\eta_{I,\sigma}\le1,
\]

for nonzero denominator. It measures how efficiently the sector's current motion uses its available speed at that shape; it is not an efficiency of energy conversion.

Plainly: moving quickly is not enough. One particular blend of breathing and circulation produces the largest current-like readout for a given shape and speed, while two other blends can move just as quickly and produce none.

Two measured causal-boundary records occupied very different corners of the speed triangle. One negative sector used about \(93.659\%\) of its squared speed in circulation; another used about \(99.131\%\) in radial collapse. Their current-alignment fractions were respectively about \(0.142\) and \(0.0116\). These are bounded EOM-solver measurements, not universal F6c ratios, but they demonstrate that a near-unit member speed can be either cadence-dominated or nearly current-null radial motion.

Plainly: two histories can approach the same speed boundary for almost opposite reasons. A return search must inspect the channel allocation and current alignment, not only the total speed.

Claim grade: derived. The speed sum, capacity bound, current-null plane, and alignment range are exact F6c kinematics. The quoted channel fractions are measurements on two declared records. Neither establishes a conservation law, retained cycle, or magnetic observable.

Plainly: the geometry exactly limits how axial, radial, and circulation motion can share one member's speed, and two simulations illustrate different allocations. Those facts do not show that the allocation is conserved, repeats, or already behaves like an observed magnetic quantity.

#### Root-Certified Minimax Continuation

For the guarded single-hit program, the field-speed guard applies separately to each sector, so the six-coordinate Euclidean projector is not the final speed optimum. A weighted two-sector projector can minimize the larger sector speed while holding current and corridor rate fixed. At the selected release, it balanced both sector speeds at \(0.341973\) for the observed opening rate, compared with \(0.409796\) for the Euclidean carrier and \(0.388663\) for the actual release. The analogous nonclosing-boundary minimum was \(0.280086\). These are fixed-shape lower bounds, not by themselves root-certified evolved seeds, and they do not optimize the active-root structure of the full causal-root regime.

The measured-opening minimax vector was then embedded in a harmonic delayed history by giving the four axial/radial breathing coordinates independent phase offsets while retaining one common breathing frequency. The largest required amplitude was \(0.117373\), the release reconstructed both sector speeds as \(0.341973\), and all 64 release root rows certified at tolerance \(10^{-5}\).

Here **minimax** means choosing the admissible rate vector that makes the faster of the two polarity sectors as slow as possible. A **release** is the fully specified state and causal prehistory from which forward evolution starts. Root certification means that the EOM solver found and verified every causal intersection required by that release under the declared tolerance.

Plainly: the optimization did not ask for the smallest average speed. It reduced the worse of the two sector speeds, then checked that the resulting initial history had a complete causal-root ledger.

Ordinary fixed-law evolution of that same record reached \(T=0.28\) with no rejected step. Positive cadence reversed near \(T=0.194854\); the maximum member speed over the interval was \(0.403658\); current changed from \(-0.728215\) to \(-0.627988\); and root-time pressure reached \(0.842014\). The limiting opposite-polarity pair initially opened, then closed to distance \(0.391664\) at rate \(-0.420275\).

Plainly: the minimax tangent vector is compatible with one complete causal prehistory and a substantial strict-contract continuation. It reduces the speed burden and survives cadence reversal, but it does not regulate the pair corridor into a return. Return closure therefore requires dynamic rotation of the four-dimensional joint-neutral control space rather than another static opening projection.

#### Measured Sector Handoff

In this section, **sector handoff** means that the positive- and negative-sector contributions change substantially and oppositely while their sum changes much less. It describes compensation inside the polarity-weighted motion diagnostic. It does not describe a transfer of primitive architrinos between sectors.

One bounded root-certified release had sector slopes \((-0.437531,+0.434729)\), leaving total slope only \(-0.00280243\) on total current \(-0.723067\). Its EOM continuation through \(T=0.240\) kept total current within 2.8% while the positive sector contribution grew in magnitude and the negative contribution declined. The continuation then met a negative-sector same-polarity causal-root certification boundary before collision, a coordinate turn, or a \(c_f=1\) speed crossing.

Plainly: this candidate history kept the total diagnostic nearly steady because one polarity sector compensated for the other. Each sector changed substantially even while their sum changed little. That handoff still needs protected causal-history spacing and a complete return before it can count as retained behavior.

A separate guarded release showed that the solver's root-time enclosure pressure can rise toward its declared tolerance budget while pair distance, root count, and transmitter-factor magnitude remain ordinary. That pressure is a useful continuation warning, but it is tolerance-relative and is not a physical F6c invariant. Two histories, ending on different polarity-pair classes, independently reached pressure \(0.982\) and \(0.999\) immediately before their known next-step root-enclosure failures.

A matched-input run with twice the root-time tolerance moved the certification wall from \(T=0.240\) to \(T=0.3025\) and exposed a positive-sector cadence reversal near \(T=0.296899\). Total current remained within 0.91% of release because breathing shear and the conjugate sector continued to carry it. This is an inferred geometry clue from a changed certification fingerprint, not a tight-tolerance retained result.

At \(T=0.2975\), just after that cadence crossing, the positive-sector current split into axial-breathing, radial-breathing, and tangential pieces \((-0.163389,-0.075468,+0.000310)\). Thus almost the entire sector current was carried by breathing shear at the instant its orbital cadence reversed. A candidate current channel need not require permanently same-sense orbital motion.

Plainly: the finite continuation did not end because two members collided or because a member crossed the guarded \(c_f=1\) boundary. It ended where the declared numerical contract could no longer certify the next causal-root enclosure. Changing that tolerance exposed more of the candidate geometry, but the looser run cannot be promoted to a tight-contract retained result.

#### Local Census And Mode Conversion

In the deduplicated 2,299-release census, 29 geometries met the declared active current-handoff screen. The mechanism is therefore selective but not isolated; many of those rows still began with closing pair corridors, so handoff does not replace ordinary spatial and causal-history guards.

A focused \(7\times7\) phase screen around the only initially opening, nonaccelerating active handoff found 12 active handoffs and 11 that also passed those immediate corridor and speed-flow guards. The best neighbor then reproduced a positive-sector cadence reversal under the tighter \(10^{-5}\) root-time contract at \(T\approx0.252158\). At its final certified \(T=0.290\), total current retained 83.2% of its release magnitude while the positive-sector axial, radial, and reversed-tangential contributions were \((-0.073799,-0.051688,+0.014554)\). Thus breathing shear, not same-sense circulation, carried the sign of that sector current through the reversal.

This is still not a retained cycle. Root-time pressure reached \(0.990342\) and the attempted next step met a four-row root-enclosure certification boundary with finite pair clearance and ordinary transmitter-factor magnitude.

After including the 49-row local screen, all 12 active handoffs that also had an opening corridor and no positive sector-speed derivative used only \(59.3\%\)--\(63.8\%\) of their possible alignment with the current coefficient direction. Their current-neutral norm fractions were \(77.0\%\)--\(80.5\%\). The selected evolved neighbor moved from 77.99% current-neutral motion at release to 81.08% at \(T=0.290\). These are bounded, deliberately oversampled diagnostics, but they show that efficient current production and geometric control are different axes of the search.

Plainly: nearby examples repeatedly showed compensation between sectors, but most of their motion was serving geometric control rather than maximizing the current-like diagnostic. A handoff therefore identifies one useful relation among motions; it does not solve separation, return, or retention.

The evolved neighbor also converted its current-neutral mode. Tangential motion supplied 76.82% of the neutral squared norm at release, but only 0.83% at the first sampled frame after cadence reversal; axial and radial breathing then supplied 99.17%. At the final certified frame, breathing still supplied 94.52%. Orbital cadence, breathing, and current support are therefore coupled coordinates of one motion, not necessarily separate persistent mechanisms.

Three strict histories at the same breathing-cycle phase and nearby negative-sector phases all reproduced cadence reversal. Their interpolated cadence-zero currents agreed within 0.051%, near \(-0.63424\), while sector currents compensated. Increasing negative-sector phase moved the turn earlier and the root-enclosure boundary later across this three-row slice. An adjacent breathing-cycle phase changed the section current, so the near agreement is a candidate slice property rather than an F6c invariant.

Across five nearby histories, a threshold of at most 1% tangential neutral power was reached \(0.0347\)--\(0.0409\) before cadence zero in the four histories that turned. The fifth converted modes but reached its certification boundary before reversal. Breathing-dominated current-neutral motion is therefore a measured precursor to cadence reversal in this local family.

Plainly: before circulation reversed, the part of the motion that did not change the current diagnostic shifted from mostly tangential motion to mostly breathing. That repeatable ordering is a local measured precursor, not an exact law for every F6c history.

Opposite breathing-amplitude signs were only modestly enriched relative to the sampled baseline, while opening corridors were less common in active handoffs than in the full archive. The handoff condition is therefore a phase-space relation among shape, motion, and acceleration, not a sign-pattern shortcut.

This result is a measured bounded diagnostic, not a retention or particle claim. The full derivation, census, numerical check, and falsifier are in [Current Transport, Guard Flow, And A Causal-History Boundary](inferring-braid-requirements.md#current-transport-guard-flow-and-a-causal-history-boundary).

Plainly: the measured histories support one search lesson—current support, pair protection, and cadence reversal use coupled but distinguishable rate directions. The result is overturned if the named record reconstruction or census fails, or if the reported handoff and mode-conversion signatures do not reappear under the stated selection rules.

### Return Evidence And Failure Boundaries

#### A Generic Breathing Section Has One Scalar Crossing

A fixed-radius circular prehistory imposes four simultaneous section conditions at release,

\[
\dot h_+=\dot h_-=\dot\rho_+=\dot\rho_-=0.
\]

A generic periodic six-coordinate history has only one freely selectable time origin. One time shift can generically place the history on one scalar section, such as \(\dot\rho_+=0\), but not on four independent turning sections at once. Requiring all four zeros therefore selects an exceptional synchronized subset unless a derived symmetry supplies that synchronization. This is a dimension-counting inference, not a nonexistence theorem.

One evolved record provides a measured example. At a positive-radius turning section it had \(\dot\rho_+\approx0\), while

\[
(\dot h_+,\dot h_-,\dot\rho_-)
=
(-0.188826,-0.097687,0.055643).
\]

The other three breathing rates were ordinary nonzero parts of the same motion, as the generic one-section argument permits.

Plainly: a return search should declare one scalar crossing to define where the comparison starts and should normally allow the other three axial and radial rates to remain nonzero. Four simultaneous turning points require an additional proved synchronization.

#### Whole-Cycle Self-Consistency Test

The whole-cycle consistency instrument prescribes one-frequency breathing histories,

\[
\begin{aligned}
h_\sigma(T)&=0.3+A_{h,\sigma}\sin(\Omega T),\\
\rho_\sigma(T)&=0.3+A_{\rho,\sigma}\sin(\Omega T),\\
\theta_+(T)&=\omega_+T,\\
\theta_-(T)&=\theta_{-,0}+\omega_-T,
\end{aligned}
\]

and compares their analytical coordinate accelerations with the Master Equation accelerations generated by the same complete histories. At phase \(\phi_j\), the sector residual is

\[
\mathbf r_\sigma(\phi_j)
=
\begin{pmatrix}
\ddot h_\sigma^{\mathrm{EOM}}\\
\ddot\rho_\sigma^{\mathrm{EOM}}\\
\ddot\theta_\sigma^{\mathrm{EOM}}
\end{pmatrix}_{\phi_j}
-
\begin{pmatrix}
-A_{h,\sigma}\Omega^2\sin\phi_j\\
-A_{\rho,\sigma}\Omega^2\sin\phi_j\\
0
\end{pmatrix}.
\]

The ranking used the RMS of all six components over all certified phases, but maximum component residual, pair clearance, and maximum member speed remained separate guards. A low RMS could not compensate for a failed causal root or an unsafe corridor.

Plainly: this asks whether a proposed periodic motion generates the exact accelerations needed to keep tracing itself. It is stronger than checking one favorable release instant and cheaper than evolving every poor candidate for a whole cycle.

The measured results did not find a self-sustaining harmonic cycle:

| Prescribed-history row | Confirmed RMS residual | Maximum component residual | Minimum clearance | Maximum member speed |
| --- | ---: | ---: | ---: | ---: |
| finite-time double-radial-turn seed, 12 phases | \(9.895\) | reported separately | \(0.1124\) | guarded below \(c_f\) |
| finite-time double-axial-turn seed, 12 phases | \(16.208\) | reported separately | \(0.1111\) | guarded below \(c_f\) |
| best frozen amplitude cluster, 24 phases | \(2.898\) | \(10.427\) | \(0.2154\) | \(0.3194c_f\) |
| cadence-modulated cluster, 24 phases | \(2.816\) | \(10.518\) | \(0.2249\) | \(0.3160c_f\) |

An apparent improvement on an eight-phase grid failed when the phase grid was doubled, demonstrating phase-grid aliasing. The small confirmed improvement from cadence modulation establishes cadence breathing as a useful search coordinate, but the residuals remain far above their numerical enclosures.

Plainly: the bounded phase screens identify a repeatable direction in parameter space, not a cycle. Sampling too few phases makes one candidate look better than it is; denser checking exposes the mismatch.

#### A Section Return Is Not A State Return

The best frozen cadence-modulated row was released into ordinary EOM-solver evolution. Its positive axial coordinate returned to its initial level at

\[
T_{h_+=0.3}\approx0.272382754,
\]

but the RMS mismatch of the other eleven coordinate-and-rate components was \(0.825221\). The largest component was \(\Delta\dot\theta_-=2.591159\). This was therefore one coordinate crossing its starting section, not the eight-member state returning.

The same record remained on the exact F6c surface below \(8.30\times10^{-16}\) normalized velocity leakage, kept minimum pair distance \(0.296293\), and preserved centroid, dipole, and current-axis identities. Yet the negative-sector cadence rose to \(3.616172\), its member speed reached \(0.999765c_f\), and the attempted step after \(T=0.28625\) could not certify the four symmetry-equivalent negative-sector self-history roots.

Plainly: the shape remained beautifully symmetric while its internal motion did not close. Exact symmetry can keep a candidate on F6c all the way to a causal-history certification boundary; symmetry preservation is not return or retention.

An unconstrained first-section search also produced a much smaller residual, \(0.05741\), by recrossing after only \(T=0.04271\). The section excursion was only \(9.41\times10^{-5}\), and the two lifted phase advances were only \(0.03648\) and \(0.03208\) radians. The small residual came from a tiny out-and-back arc near a tangent release, not from a meaningful completed cycle.

Plainly: if a path barely leaves a line and immediately crosses it again, its state has had little time to change. A small difference at that recrossing can be a geometric loophole rather than evidence of a braid period.

#### Nontrivial Return Requirements And Census

A valid F6c return search must therefore declare more than one scalar section. It must include:

- a direct or reflected exact chart action;
- lifted phase windings rather than only wrapped angles;
- return of both axial scales, both radii, both cadences, and all axial/radial rates under that action;
- an explicit decision about whether a module permutation counts as the same labeled history;
- a scale-aware excursion, turn-sequence, or other nontrivial cycle marker; and
- complete causal roots, pair clearance, and the declared causal-speed contract throughout the candidate interval: a \(c_f=1\) margin for the guarded search, or complete multi-root, Jacobian-floor, self-hit, and transition records for the full causal-root search.

The exact action instrument examined 2,451 stored F6c manifests. Only 15 were positive-time evolved records with usable frame streams. None entered a nonzero direct winding cell. The closest reflected-action record reached a minimum RMS of about \(0.535\), but its largest rate mismatches remained order one while one sector approached a radial causal boundary. This census is exhaustive only for the stored archive, not for the continuous F6c state space.

Plainly: none of the stored histories completed a nontrivial direct cycle, and the best rotated-shape comparison still had very different motion. That rejects those records as returns; it does not prove that F6c has no periodic branch.

A 20-row nonlinear return-map screen varied the four independent harmonic breathing-phase offsets, both sector cadences, and the cross-sector phase near the strongest prescribed-history seed. Eleven rows met the declared nontrivial excursion-and-turn marker, three developed a radial turn, nine developed a cadence turn, and none coordinated both kinds of turn on one certified history. No row entered a nonzero direct winding cell. The closest reflected-action event reached RMS residual \(0.4433731616\) at \(T=0.173\), but its positive cadence mismatch remained \(1.238145546\) and its negative radial-rate mismatch remained \(0.315202721\).

The closest row retained 64 certified release root rows, single-root multiplicity on every recorded accepted snapshot, minimum transmitter-factor magnitude \(0.676913\), minimum pair distance \(0.235318\), maximum member speed \(0.568810c_f\), and normalized F6c velocity leakage below \(3.37\times10^{-15}\). A half-step refinement with root tolerance \(5\times10^{-6}\) reproduced the event at the same sampled time with RMS residual \(0.4433731395\); the coarse-to-refined RMS change was \(2.21\times10^{-8}\). The reflected action uses the proper rotation \(\operatorname{diag}(-1,-1,1)\) with same-polarity module permutation \((0,1,2,3)\mapsto(3,2,1,0)\), so it is a quotient-history comparison and not a labeled-history return.

Plainly: changing the four breathing phases produces a closer rotated-shape encounter and the refined calculation reproduces it, so the improvement is geometric rather than a coarse-step accident. It is still far from a return: one sector's spin rate and the other sector's radial rate do not match, no candidate turns radius and cadence together, and the required module permutation does not preserve the member labels.

A subsequent Stage-A campaign broadened the prescribed-history domain to fifteen coordinates: both sector cadences, cross-sector phase, separate axial and radial breathing amplitudes, separate cadence modulations, and four independent breathing phases. The deterministic 24-row attempt budget found 13 radial-turn histories, eight cadence-turn histories, and one guarded history with both turns on the same nontrivial trajectory. Its positive radius turned at \(T=0.0678885761\), its positive cadence turned at \(T=0.1093903409\), and its maximum shape excursion and lifted phase advance were \(0.0284745\) and \(0.235497\). Twenty rows met the 180-second wall cap before the planned \(T=0.30\) endpoint and four met a root-enclosure or minimum-step boundary, so this is finite attempt-budget coverage rather than uniform-time coverage of the full box.

The dual-turn row retained 64 certified release-root rows, zero unresolved release roots, simple root multiplicity on all recorded accepted snapshots, minimum transmitter-factor magnitude \(0.674477\), minimum pair distance \(0.264450\), maximum member speed \(0.877507c_f\), and normalized F6c position/velocity leakage below \(7.96\times10^{-16}\) through its recorded \(T=0.14\) interval. An eight-row local continuation evaluated the next positive-radial initial-level crossing with all other rates free. Two local rows retained both turns, but only the seed supplied an eligible exact reflected-action event; its RMS residual was \(1.4127643702\) at \(T=0.1140798550\), with maximum component mismatch \(3.3157171268\) and winding cell \((1,0)\). The reflected action remains a quotient-history comparison rather than a labeled-history return.

A half-step, half-history-segment, \(5\times10^{-6}\)-root-tolerance refinement completed without rejection through \(T=0.13\). The radial and cadence turn times moved by only \(1.01\times10^{-6}\) and \(8.51\times10^{-8}\); the reflected RMS moved by \(6.94\times10^{-7}\) to \(1.4127650645\). The coordinated turns are therefore a numerically persistent search seed, while the order-one return residual gives no dense-tuning warrant and does not displace the earlier \(0.44337314\) reflected near-miss. The complete campaign packet is [machine-readable](f6c-dual-turn-return-search-2026-08-24.json).

Plainly: broadening the initial histories produced the first recorded F6c path that reverses both radius and cadence while staying inside the declared guards. Refinement confirms that the two reversals are not a coarse-step accident. The state at the chosen section is still very far from its required rotated return, so the result opens a better search coordinate without closing the return problem.

A one-coordinate continuation then separated the radial breathing frequency from the shared axial-and-cadence breathing frequency by the ratio $r_\rho=\omega_\rho/\omega_h$, while fixing all fifteen coordinates of the dual-turn seed. The predeclared ratios $(1,0.95,1.05,0.9,1.1,0.85,1.15,0.8,1.2)$ all passed the prescribed-history speed guard and produced guarded radial and cadence turns. The best full-state reflected-action section occurred at $r_\rho=0.8$, with RMS residual $1.4017247296$ at $T=0.0973940850$ versus the ratio-one control $1.4127643702$.

The relative reduction was $0.781421\%$, below the predeclared 10% continuation threshold of $1.2714879332$, so no refinement was performed. The best row retained 64 certified release-root rows, zero unresolved release roots, minimum pair distance $0.248725$, maximum member speed $0.932090c_f$, fixed member identities, and normalized F6c position/velocity leakage below $7.41\times10^{-16}$. Its maximum return mismatch remained the negative-sector cadence residual $3.2143506592$. The complete packet is [machine-readable](f6c-radial-frequency-continuation-2026-08-24.json).

Plainly: slowing only the prescribed radial breathing moved the chosen section encounter slightly closer, but by less than one percent when ten percent was required to justify more computation. The large cadence mismatch remained, so this coordinate does not convert the dual-turn seed into a materially closer return in the tested interval.

Claim grade: measured. The section-bias argument and exact return requirements are derived or inferred from dimension and symmetry. The residuals, census, nonlinear screens, refinements, and boundary descriptions are bounded EOM-solver measurements on declared records. They are not an independent oracle, global optimization, retained branch, or stability result. Reproducing a nontrivial exact-action return with convergent component residuals and all guards open would supersede the present negative census.

Plainly: every stored evolved record failed the declared full-return test, but the archive is only a finite sample and the comparison instrument is not an independent proof. One new root-complete return with shrinking numerical error would overturn the current negative census.

### Current Evidence Boundary

The strongest current statement is:

> F6c is an exact symmetry-invariant six-coordinate history surface with two co-centered polarity-sector envelopes, exact sector centering and dipole cancellation, exact pair-clearance and sector speed/current-budget formulas, an exact opposite-edge rank-three frame whenever its circulation rows are nonzero, one body-fixed polarity-weighted current channel, and an exact chart of common versus polarity-differential response coordinates.

The current EOM-solver evidence shows finite ordinary evolutions that remain on the surface to numerical precision and develop nontrivial breathing and cadence exchange. Prescribed harmonic histories reduced the confirmed whole-cycle acceleration residual but did not solve it: the best reported phase-grid rows had RMS residuals \(2.898\) and \(2.816\). A scalar-section recrossing was also shown not to be a state return; one positive-axial section recurrence left an 11-component RMS mismatch of \(0.825221\).

The existing-record census inspected 2,451 manifests, of which 15 supplied usable evolved records. It found no nonzero direct winding and no reflected full-state return. The 20-row nonlinear phase-offset continuation improved the closest reflected residual from about \(0.535\) to \(0.44337314\), reproduced to \(2.21\times10^{-8}\) under half-step refinement, but retained order-one positive-cadence mismatch. A later broad 24-row attempt budget produced one refined same-trajectory radial-and-cadence turn seed, yet its declared scalar-section reflected RMS was \(1.41276506\), not an exact return or an improved return lead. These are **measured bounded-search results**, not a proof that no F6c return exists.

Plainly: the guarded evidence rejects scalar crossings, nearly repeating pictures, and low prescribed residuals as full returns. All shape coordinates, rates, member identities, causal roots, clearance, and the declared causal-speed contract must close together. These bounded results do not decide the uncapped F6c program.

The following remain open:

- an ordinary nontrivial periodic or relative-periodic return;
- a matched retained-branch comparison between guarded single-hit F6c and full causal-root F6c, including super-field-speed, multi-hit, self-hit, fold-transition, action, energy, and angular records;
- a retained rest clock followed by a root-complete, stable translating branch family for Lorentz clock, ruler, synchronization, and signal tests;
- a whole-cycle self-consistent prescribed history with vanishing acceleration residual rather than merely a lower residual;
- positive-width binding and retention;
- stability about an actual retained return;
- a complete action, energy, and angular ledger;
- a fixed cross-sector projection that promotes the two F6c opposite-edge circulation frames into one retained rank-three branch ledger with positive row-magnitude and conditioning floors;
- an effective charge or mass-facing projection;
- spinor behavior and observer-level spin/magnetic recovery;
- exactly three retained same-representation fermion-generation modes or basins with no extra surviving family partner;
- a photon-facing source-to-capture record with exactly two free transverse modes, no free longitudinal mode, helicity closure, and no retained rest branch;
- a neutral F6c neutrino continuation with exactly three coherent propagation modes, two relative phase gaps, and a weak-facing posture distinct from observer helicity;
- a root-complete multi-cell transfer of an F6c trace-free deformation with two leading transverse patterns and controlled scalar, vector, longitudinal, attenuation, and dispersion leakage;
- a Standard Model or Noether sea particle role;
- exact-six decoration selection against every admitted non-six count; and
- any collective six-member neutral-capture basin, root-complete fourteen-member literal-addition history, or derived relation between F6c and a Generation I, II, or III branch.

Plainly: F6c is a strong geometry result and a disciplined search space. It is not yet a physical braid result.

## Part III — Recovery And Physical Interpretation

Part III uses the established geometric coordinates and the declared evidence boundary to formulate downstream recovery tests. These sections distinguish absolute time from clock readout, frame Lorentz behavior as an observer-level closure target, map strong-field questions without importing relativistic spacetime as substrate ontology, and state candidate particle, radiation, and capture roles with their falsifiers.

Plainly: the topics in this part are jobs F6c might perform if a retained branch is found. They are tests and interpretations built on Parts I and II, not additional premises used to create the geometry.

### Native Response Coordinates Suggested By F6c

#### Common And Polarity-Differential Coordinates

For a continuous lifted phase and either collective coordinate \(z\in\{h,\rho,\theta\}\), the even/odd split is

\[
z_{\mathrm{even}}
=
\frac12(z_++z_-),
\qquad
z_{\mathrm{odd}}
=
\frac12(z_+-z_-).
\]

The three even coordinates describe common motion of the two polarity sectors; the three odd coordinates describe their relative displacement, scale, and phase. Under complete polarity conjugation the even coordinates remain fixed and the odd coordinates reverse sign.

This gives an exact parity requirement for any proposed effective projection. A charge-facing function must be odd under the sector exchange,

\[
Q_{\mathrm{eff}}
\left(
\mathbf z_{\mathrm{even}},-\mathbf z_{\mathrm{odd}}
\right)
=
-Q_{\mathrm{eff}}
\left(
\mathbf z_{\mathrm{even}},\mathbf z_{\mathrm{odd}}
\right),
\]

whereas a scalar envelope or mass-facing projection must be even. F6c does not yet supply either functional form; both must be derived from the same root- resolved source, wake, and receiver history.

Plainly: motion shared by the positive and negative tetrahedra can control the common size and cadence. Motion that separates their geometries is the natural place to look for a sign-reversing charge readout. The symmetry tells us the required sign behavior, not the value of electric charge.

A symmetry-based branch chart would therefore distinguish:

- \(\mathbf z_{\mathrm{odd}}=\mathbf0\): a symmetric neutral-geometry candidate;
- \(\mathbf z_{\mathrm{odd}}=\pm\mathbf z_*\) with the same even coordinates: a candidate conjugate branch pair; and
- nonzero instantaneous odd motion whose complete-cycle charge projection still vanishes: a weakly exposed neutral candidate.

These are branch shapes, not particle assignments. Equal and opposite effective charge, equal scalar response, compatible current transformation, retention, and reaction provenance would all remain necessary before naming a particle/antiparticle pair.

Plainly: two geometries can be mirror partners in polarity space without yet being an electron and positron. The complete dynamics and observer-facing readouts must make that identification.

#### Tetrahedral Singlet And Directional Triplet

Exact F6c retains only module-common motion. To describe a directional perturbation, allow one module coordinate to vary as

\[
z_{i\sigma}
=
\bar z_\sigma+\delta z_{i\sigma},
\qquad
\bar z_\sigma
=
\frac14\sum_i z_{i\sigma},
\qquad
\sum_i\delta z_{i\sigma}=0.
\]

The four module values split exactly into one common component and one three-dimensional sum-zero component:

\[
\mathbb R^4
=
\operatorname{span}\{(1,1,1,1)\}
\mathbin{\oplus}
\left\{
\boldsymbol\delta:\sum_i\delta_i=0
\right\}.
\]

The common component is often called a **singlet**, meaning that it is unchanged by module permutations. The sum-zero component is a **triplet**, meaning a three-component directional sector. The tetrahedral axes convert it into a body-frame vector,

\[
\mathbf Z_{z,\sigma}
=
\sum_i\delta z_{i\sigma}\hat{\mathbf n}_i.
\]

The tetrahedral identities give both its norm and inverse map:

\[
\left\|\mathbf Z_{z,\sigma}\right\|^2
=
\frac43\sum_i\delta z_{i\sigma}^2,
\qquad
\delta z_{i\sigma}
=
\frac34
\hat{\mathbf n}_i
\mathbin{\cdot}
\mathbf Z_{z,\sigma}.
\]

Thus the three departures from common motion contain exactly the same information as one body-frame vector; no directional component is discarded.

Plainly: if all four modules expand equally, the change has size but no arrow. If some expand more and others less while their average stays fixed, the four changes combine into one arrow showing the direction of the deformation.

Combining this split with polarity conjugation gives

\[
\mathbf Z_{z,\mathrm{even}}
=
\frac12
\left(\mathbf Z_{z,+}+\mathbf Z_{z,-}\right),
\qquad
\mathbf Z_{z,\mathrm{odd}}
=
\frac12
\left(\mathbf Z_{z,+}-\mathbf Z_{z,-}\right).
\]

This creates a disciplined response chart:

| Native coordinate class | Effective role to test | Required control |
| --- | --- | --- |
| common even singlets | scalar loading, common cadence, isotropic envelope response | rotating the source direction leaves the leading scalar row unchanged |
| common odd singlets | charge-facing exposure imbalance or conjugate branch coordinate | complete conjugation reverses the row |
| odd directional triplets | electric-like internal polarization or directional sea strain | source-polarity reversal and spatial reflection produce the declared polar-vector transformation |
| circulation-weighted axial triplets | magnetic-like orientation or current response | circulation reversal and parity distinguish the axial row from the polar row |

The algebraic split is exact. The effective roles in the table are inference targets. In particular, proper rotations treat polar and axial vectors alike; reflection and circulation history are needed to distinguish electric-like from magnetic-like response. The triplet is also a spatial body-frame vector, not a color triplet. Identifying it with color would confuse laboratory orientation with an internal label unless a separate quotient is derived.

Plainly: the tetrahedron naturally separates an all-together response from a directional response. That is enough to organize electric-like and magnetic- like tests, but not enough to prove either field or to turn three spatial components into three colors.

#### Why Three Even Coordinates Do Not Yet Mean Three Modes

If a retained charge branch fixes its polarity-odd exposure basin, its instantaneous charge-preserving configuration tangent is

\[
\mathcal E_{\mathrm{even}}
=
\operatorname{span}
\left\{
\delta h_{\mathrm{even}},
\delta\rho_{\mathrm{even}},
\delta\theta_{\mathrm{even}}
\right\}.
\]

This is three-dimensional as a configuration space, but the native state also contains three rates and a causal history. It follows that three coordinate names do not by themselves imply exactly three dynamical modes.

An exactly three-mode reduction would require an invariant graph \(\iota\) that reconstructs the charge-preserving rates and relevant retained history from those three coordinates on a declared return section. If \(\mathcal R\) is the full return map and \(P_{\mathrm{even}}\) projects back to the three even coordinates, the reduced derivative would be

\[
M_{\mathrm{even}}^{\mathrm{red}}
=
D\!\left(
P_{\mathrm{even}}
\mathbin{\circ}
\mathcal R
\mathbin{\circ}
\iota
\right).
\]

Only after proving closure of this \(3\times3\) operator would the cubic

\[
\det\left(
M_{\mathrm{even}}^{\mathrm{red}}-\lambda I_3
\right)=0
\]

classify at most three reduced eigenmodes. Any proposed generation interpretation would additionally have to keep charge and interaction representation fixed across those modes while deriving their different recurrence, response, lifetime, and reaction-exit records.

Plainly: three adjustable shapes do not guarantee three natural oscillations. The delayed system also remembers velocity and past history. Exactly three physical modes appear only if the full dynamics really collapses to a closed three-variable return rule.

Claim grade: derived. The even/odd parity, \(1\mathbin{\oplus}3\) decomposition, norm, and inverse map are derived algebra. The response roles, invariant reduction, three-mode interpretation, and every particle or generation assignment are inferred or guessed targets. They fail if the source response has the wrong transformation parity, if no invariant reduction exists, or if additional same-representation modes remain admissible.

Plainly: the tetrahedral algebra exactly separates common and directional motion, but it does not prove that the dynamics closes into three modes or that any mode is a particle generation. Extra surviving modes or the wrong symmetry response would reject that interpretation.

### How F6c Describes Time

F6c does not create time or replace it with geometry. Every member history is parameterized by the one native absolute time \(T\), and every causal root connects an earlier transmitter event to a later receiver event in that same ordering. The six F6c coordinates are therefore functions of time,

$$
\mathbf z(T)
=
\left(
h_+(T),\rho_+(T),\theta_+(T),
h_-(T),\rho_-(T),\theta_-(T)
\right),
$$

not coordinates that contain or generate \(T\).

Plainly: absolute time is the master clock used to play the F6c movie. The six coordinates say what the eight-member shape is doing at each frame of that movie.

F6c can nevertheless function as a physical clock if one complete history returns. Let \(\varphi_{\mathrm{clk}}(T)\) be a lifted phase that advances by \(2\pi\) only when the declared clock readout and its required labeled-history rows complete one cycle. If the rest period is \(P_0\), define the clock readout

$$
\frac{d\tau_{\mathrm{F6c}}}{dT}
=
\frac{P_0}{2\pi}
\frac{d\varphi_{\mathrm{clk}}}{dT}.
$$

For an ideal rest return with \(d\varphi_{\mathrm{clk}}/dT=2\pi/P_0\), this normalization gives \(d\tau_{\mathrm{F6c}}/dT=1\). On a translating branch with complete-history period \(P_v\), its cycle average would be \(P_0/P_v\).

Plainly: count complete F6c returns and use the rest return as the clock's unit. If a moving F6c needs more absolute time to complete the same internal return, its derived clock time advances more slowly.

The clock period depends on what the clock is required to restore. A scalar shape may repeat after one reflected interval while cadence and the fixed-frame current channel reverse and return only after a second interval. A clock built from scalar size can therefore tick twice during one complete current-sensitive cycle unless the readout contract explicitly chooses one of those return orders.

Plainly: two instruments watching the same F6c object can count different repetition times if one watches only its outline and the other also watches the direction of circulation. A material clock must state which information defines one tick.

This yields three distinct time notions:

| Time notion | F6c meaning | Status |
| --- | --- | --- |
| absolute time \(T\) | universal native ordering used by every worldline, causal root, and acceleration update | substrate input |
| F6c clock time \(\tau_{\mathrm{F6c}}\) | count of complete declared returns of one retained F6c history | derived only after a retained return exists |
| effective observer time \(t_{\mathrm{eff}}\) | time coordinate reconstructed from clocks, synchronization procedures, signal records, and Noether-sea response | Lorentz-recovery target |

No sphere, tetrahedron, phase coordinate, or current axis is itself time. Those geometric objects can change at different cadences under \(T\) and can be used to build clock readouts. The observer map must then show whether many different assemblies reconstruct one compatible \(t_{\mathrm{eff}}\).

Plainly: F6c supplies possible clockwork, not the universal clock and not a fundamental fourth spatial direction. Observer time is the coordinated reading recovered from many physical clocks and signals.

Claim grade: derived. The role of absolute time and the distinction among coordinate, rate, history, and return order follow from the declared native framework and F6c chart. The clock-readout equation is a definition. Any material-clock operation, clock dilation, synchronization rule, or common effective observer time is **unmeasured and unproved** until retained rest and translating histories exist. The clock hypothesis fails if no nontrivial F6c return exists or if different admissible readouts cannot be joined by one observer-time map without private tuning.

Plainly: absolute time and the proposed clock formula are defined, but no F6c clock has yet completed the required physical return. A successful clock must tick consistently with other clocks and signals without receiving its own special conversion rule.

#### Is The Time Mapping Thorough?

The time map is complete at the level of definitions but incomplete at the level of dynamics. It already distinguishes the universal ordering variable \(T\), the return-count time \(\tau_{\mathrm{F6c}}\), and synchronized observer time \(t_{\mathrm{eff}}\). A thorough physical mapping must additionally separate **tick generation** from **tick reception**, because strong motion or a strong Noether-sea environment can change the source history, the signal path, the receiver history, or all three.

Let the number of source ticks generated by absolute time \(T\) be

$$
N_{\mathrm{clk}}(T)
=
\frac{\varphi_{\mathrm{clk}}(T)}{2\pi}.
$$

For an exterior receiver, define

$$
\nu_{\mathrm{emit}}^{\mathrm{F6c}}
=
\frac{dN_{\mathrm{clk}}}{d\tau_{\mathrm{F6c}}},
\qquad
\nu_{\mathrm{rec}}^{\mathrm{eff}}
=
\frac{dN_{\mathrm{rec}}}{dt_{\mathrm{eff,out}}},
\qquad
g_H^{\mathrm{F6c}}
=
\frac{\nu_{\mathrm{rec}}^{\mathrm{eff}}}
{\nu_{\mathrm{emit}}^{\mathrm{F6c}}}.
$$

The received count \(N_{\mathrm{rec}}\) is not obtained from the source phase alone. It must be reconstructed from the emitted event ledger, every intervening causal-wake and Noether-sea transfer, and the receiver's own clock. In the effective static black-hole comparison, outward ticks emitted ever closer to an event horizon must satisfy \(g_H^{\mathrm{F6c}}\to0\) for a far exterior receiver. That recovery target does not imply \(dT/dT\to0\), and it does not by itself imply that the source cadence \(d\varphi_{\mathrm{clk}}/dT\) vanishes.

Plainly: a distant observer can receive an infalling clock's ticks more and more slowly even though absolute time keeps advancing. The slowdown can come from the clock's changing internal history, the increasingly difficult outward signal path, and the receiver's reconstruction. Saying “the clock freezes” hides those three different mechanisms.

The completed time map therefore has four rows:

| Question | F6c quantity | Current status |
| --- | --- | --- |
| What orders every event? | absolute time \(T\) | ontology |
| What makes one local tick? | one declared complete return counted by \(\tau_{\mathrm{F6c}}\) | defined, but no retained F6c clock exists yet |
| How do separated observers compare ticks? | synchronization and signal map producing \(t_{\mathrm{eff}}\) | Lorentz-recovery target |
| What does a strong field do to a received clock record? | same-record transfer ratio \(g_H^{\mathrm{F6c}}\) | gravitational-redshift and horizon-access recovery target |

Plainly: the conceptual time vocabulary is complete. The missing work is an evolved retained history that calculates the clock rate and the signal transfer from the same substrate record.

### Does F6c Support Lorentz Mathematics?

Yes, but only in a carefully limited sense. F6c supplies enough native geometry and complete-history structure to define a Lorentz-recovery calculation. It does not presently possess Lorentz boosts as exact symmetries, and no translating F6c branch has recovered Lorentz clock, ruler, or signal behavior.

Plainly: F6c gives us a concrete object on which to ask the Lorentz question. It has not yet supplied the Lorentz answer.

#### Native Symmetry Versus Effective Lorentz Symmetry

The substrate coordinates remain absolute time \(T\) and Euclidean position \(\mathbf X\). Their exact continuous symmetry group contains spatial translations, spatial rotations, and absolute-time translations, but no boost that mixes time and space. The exact six-coordinate F6c symmetries derived in Part I are still narrower: they are the eight decorated tetrahedral chart maps, not the continuous Lorentz group.

A Lorentz transformation belongs only to an effective observer chart. Let \(\chi_{\mathrm{eff}}\) be the still-to-be-derived map from one complete native history and its Noether sea record to effective observer coordinates:

\[
\left(t_{\mathrm{eff}},\mathbf x_{\mathrm{eff}}\right)
=
\chi_{\mathrm{eff}}
\left[
T,\mathbf X,\mathcal H^{<T},\mathcal N_{\mathrm{sea}}
\right].
\]

Here \(\mathcal H^{<T}\) is the causal path history before absolute time \(T\), and \(\mathcal N_{\mathrm{sea}}\) is the declared Noether sea record. Only after that map exists may a standard comparison boost along effective coordinate \(x_{\mathrm{eff}}^1\) be applied:

\[
\begin{aligned}
c_\star t_{\mathrm{eff}}'
&=
\gamma_\star
\left(
c_\star t_{\mathrm{eff}}-\beta_\star x_{\mathrm{eff}}^1
\right),\\
x_{\mathrm{eff}}^{1\prime}
&=
\gamma_\star
\left(
x_{\mathrm{eff}}^1-\beta_\star c_\star t_{\mathrm{eff}}
\right),\\
x_{\mathrm{eff}}^{2\prime}&=x_{\mathrm{eff}}^2,
\qquad
x_{\mathrm{eff}}^{3\prime}=x_{\mathrm{eff}}^3,
\end{aligned}
\]

with

\[
\beta_\star=\frac{v}{c_\star},
\qquad
\gamma_\star=\frac{1}{\sqrt{1-\beta_\star^2}}.
\]

The speed \(c_\star\) is the declared comparison-channel speed. It equals \(c_f\) only in a primitive wake-channel test; an observer-level clock, ruler, or photon test must use the effective speed recovered for that channel. The displayed boost is therefore a target transformation of exported records. It must not be used to generate the architrino trajectories.

Plainly: the Master Equation still evolves architrinos using one absolute clock and ordinary three-dimensional positions. A physical observer may eventually reconstruct coordinates that obey the Lorentz formulas, but the conversion from the native history to those observer coordinates has to be derived. Writing a Lorentz matrix beside F6c does not perform that derivation.

#### What F6c Contributes To The Recovery Problem

F6c supplies four ingredients that make a Lorentz calculation well posed:

1. **A centered rest scaffold.** The two sector centroids coincide exactly, and the phase-averaged sector second moment is isotropic. This provides a definite rest-geometry reference, although phase averaging is not yet a retained-cycle time average.
2. **Internal clock candidates.** The lifted sector phases and complete return actions can define a material cycle. The clock period must be the return period of the declared clock readout and labeled history, not merely the first recurrence of one scalar shape coordinate.
3. **A causal speed ledger.** Every sector member obeys the exact speed budget derived in Part II, while every accepted history must retain complete causal roots with normalized primitive speed \(c_f=1\).
4. **Directional response coordinates.** The tetrahedral \(1\mathbin{\oplus}3\) split separates common scalar deformation from a three-component directional deformation. That triplet is the natural place to represent response to an arbitrary drift direction, but it lies outside strict six-coordinate F6c until an enlarged invariant chart is derived.

Plainly: F6c already has a center, possible clock hands, an exact member-speed ledger, and a way to describe an arrow-shaped deformation. The member-speed ledger can be tested under either the guarded single-hit regime or the full causal-root regime. What is missing is a solved moving assembly that makes all four parts agree on one history.

#### F6c Translating-Branch Test

Choose a unit drift direction \(\hat{\mathbf e}\) and a drift speed \(v\). A candidate translating history would have the native form

\[
\mathbf X_{i\sigma}^{(v)}(T)
=
\mathbf C_v(T)
+
\mathbf r_{i\sigma}^{(v)}(T),
\qquad
\sum_{i,\sigma}\mathbf r_{i\sigma}^{(v)}(T)=\mathbf0,
\]

with mean center motion

\[
\frac{1}{P_v}
\left[
\mathbf C_v(T+P_v)-\mathbf C_v(T)
\right]
=
v\hat{\mathbf e}.
\]

The relative paths \(\mathbf r_{i\sigma}^{(v)}\) must be solved from the delayed Master Equation together with their causal roots. They are not obtained by Lorentz-contracting a fixed-center drawing.

Plainly: separate the motion into the center traveling through the Euclidean void and the eight architrinos moving around that center. After one candidate period \(P_v\), the center has advanced by \(vP_v\) along the chosen direction, while the internal labeled history must close under a declared return action.

For a root-complete relative period \(P_v\), define the cycle-averaged shape tensor

\[
Q_{\mathrm{F6c}}(v,\hat{\mathbf e})
=
\frac{1}{8P_v}
\sum_{i,\sigma}
\int_{T_0}^{T_0+P_v}
\mathbf r_{i\sigma}^{(v)}(T)
\mathbf r_{i\sigma}^{(v)}(T)^{\mathsf T}
\,dT.
\]

Its longitudinal and mean transverse size readouts are

\[
R_{\parallel}^2
=
\hat{\mathbf e}^{\mathsf T}
Q_{\mathrm{F6c}}
\hat{\mathbf e},
\qquad
R_{\perp}^2
=
\frac12
\operatorname{tr}
\left[
\left(I-\hat{\mathbf e}\hat{\mathbf e}^{\mathsf T}\right)
Q_{\mathrm{F6c}}
\right].
\]

The tensor \(Q_{\mathrm{F6c}}\) is a cycle average of eight dyadic position products. Its projection along \(\hat{\mathbf e}\) measures squared longitudinal size; the trace over the perpendicular plane measures the mean squared transverse size. These are geometry diagnostics, not a primitive spacetime metric.

Plainly: average the eight-member shape over one complete cycle, then ask how wide it is along the travel direction and how wide it is sideways. This avoids mistaking one unusual phase snapshot for the ruler carried by the whole repeating assembly.

In the simplest zero-extra-scale comparison, one same-record Lorentz residual pair is

\[
R_T^{\mathrm{F6c}}(v)
=
\frac{P_{\mathrm{clk}}(v)}{P_{\mathrm{clk}}(0)}
-
\gamma_\star(v),
\qquad
R_\xi^{\mathrm{F6c}}(v,\hat{\mathbf e})
=
\frac{R_{\parallel}(v,\hat{\mathbf e})}
{R_{\perp}(v,\hat{\mathbf e})}
-
\frac{1}{\gamma_\star(v)}.
\]

Here \(P_{\mathrm{clk}}\) is the complete-history period of the chosen F6c clock readout. For a reflected return, that can be twice the scalar-shape period, as shown in [Observable-Specific Return Order](#observable-specific-return-order). A complete Lorentz recovery must obtain

\[
\max
\left\{
\left|R_T^{\mathrm{F6c}}\right|,
\left|R_\xi^{\mathrm{F6c}}\right|,
\left|\Delta_{\mathrm{tw}}\right|,
\left|\epsilon_{\mathrm{orient}}\right|
\right\}
=
O(\epsilon_{\mathrm{LV}})
\]

from one fixed-law translating branch family. The term \(\Delta_{\mathrm{tw}}\) is the observer-facing two-way signal anisotropy, while \(\epsilon_{\mathrm{orient}}\) measures whether changing the drift direction relative to the decorated body frame changes the exported result. Causal-root completeness, pair clearance, speed margin, identity return, and stability are admission guards rather than terms that may be traded against a small Lorentz residual.

Plainly: a successful moving F6c clock must slow by the Lorentz factor, its cycle-averaged longitudinal size must shrink by the inverse factor, and a round-trip signal test must not reveal which way the assembly points. All of those results must come from the same evolved history; success in one column cannot compensate for failed causal roots or an unstable assembly.

#### Does Strict Six-Coordinate F6c Have Enough Freedom?

That remains open. Strict F6c gives each polarity sector one axial scale, one track radius, and one phase. This preserves the exact decorated tetrahedral surface but does not provide an independent continuous deformation aligned with every possible drift direction. Lorentz recovery can succeed on strict F6c only if its allowed phase, breathing, orientation, and return histories produce the required cycle-averaged tensor for every drift direction without exposing the body-fixed current axis.

If they do not, the already-derived directional triplets provide the smallest natural enlargement to test. A failure of the strict six-coordinate surface would then mean that F6c is the rest scaffold of a larger translating chart, not that Lorentz mathematics is unavailable. Conversely, arbitrarily adding the desired oblate deformation would not count: the Master Equation must select it and the complete delayed history must retain it.

Plainly: the six shared coordinates may be flexible enough to make the moving average look Lorentz-contracted, or the moving object may need extra directional shape controls. The dynamics, not a drawing convention, decide which answer is correct.

Claim grade: inferred. The absence of substrate boosts, the layer separation, the F6c centering identities, and the definitions of the translating history and shape tensor are derived facts or test definitions. The Lorentz residual equations are **observer-level recovery targets**. F6c Lorentz covariance, clock dilation, ruler contraction, signal isotropy, and a Poincare action are **not measured or proved**. The claim would advance only after one retained rest return and a root-complete, stable translating family produce the same \(\gamma_\star\) in the clock and ruler channels together with compatible synchronization and signal closure for multiple drift magnitudes and orientations. It would fail if those channels require independent tuning, if body orientation remains observable above the declared leakage bound, or if no admissible translating continuation exists.

Plainly: F6c supports the mathematics of a decisive Lorentz test. It does not yet support the statement “F6c is Lorentz invariant.” Lorentz recovery requires a family of actual moving returns, not a coordinate transformation of the existing fixed-center geometry. The corpus-wide comparison and acceptance criteria remain in [Lorentzian Conspiracy and Emergent Lorentz Kinematics](../../../content/markdown/aaa/spacetime/lorentz-kinematics.md).

### F6c At A Black-Hole Horizon And In A Candidate Interior

#### The Event Horizon And The Native Horizon Interface Are Different Objects

At the observer-level general-relativity comparison layer, an event horizon is a global causal boundary,

$$
\mathcal H_{\mathrm{event}}^{\mathrm{eff}}
=
\partial J^-
\!\left(\mathscr I^+\right).
$$

It is defined by the complete future escape structure and therefore cannot be identified from one local F6c snapshot. In the native strong-field program, the corresponding local object is the Noether-sea horizon-interface condition \(F_H=0\), with finite boundary data and the terminal-alignment requirements defined in [Singularity Resolution](../../../content/markdown/aaa/spacetime/singularity-resolution.md#canonical-strong-field-alignment-condition). Recovering an effective event horizon from \(F_H=0\) is a same-record projection target, not an identity of definitions.

Plainly: the event horizon answers a global question—can a signal ever reach the distant future? The native interface answers a local materials-and-history question—has the packed Noether-sea state reached its strong-field boundary condition? A successful theory must make both descriptions come from one history, but it must not call them the same equation.

F6c is not presently the canonical horizon carrier. The terminal-alignment condition in the strong-field canon belongs to a declared Noether-braid source record; it cannot be assigned to the four F6c tetrahedral axes merely because both constructions contain internal directions. An F6c object approaching the interface can act as a clock, ruler, receiver, infalling assembly candidate, or constituent of a larger strong-field record only after a retained F6c branch and its coupling to the horizon carrier are demonstrated.

Plainly: the four F6c skewers cannot be assumed to flatten or line up at the horizon, because that behavior belongs to a different candidate assembly. The actual eight-member F6c history must be evolved in the strong-field environment before any such deformation is assigned.

#### What Can Happen To The F6c Geometry At The Interface?

For an absolute-time window \(W\) crossing a candidate interface, define the complete record

$$
\Theta_{\mathrm{F6c}}^H(W)
=
\left(
\left\{
\mathbf X_{i\sigma},
\dot{\mathbf X}_{i\sigma},
\mathcal H_{i\sigma}
\right\}_{i,\sigma},
\mathbf z,
\rho_{\mathrm{NS}},
\Sigma_{\mathrm{sea}},
\mathbf u_{\mathrm{sea}},
\partial\Omega
\right)_W,
$$

where \(\mathcal H_{i\sigma}\) is the member's labeled causal-root, wake, and provenance history. The coordinate vector \(\mathbf z\) is included only while the exact eight-member history remains representable on the strict F6c chart.

Plainly: the strong-field object is not six numbers by themselves. It is the eight paths, their velocities, every delayed interaction and identity record, the surrounding sea state, and the boundary through which the compact region communicates.

Let \(\mathbf X_{i\sigma}^{\mathrm{F6c}}(\mathbf z)\) denote the exact member map defined earlier. A dimensionless chart-survival residual is

$$
\mathcal R_{\mathrm{chart}}^{\mathrm{F6c}}(W)
=
\inf_{\mathbf C,\mathsf R,\mathbf z}
\max_{T\in W,\,i,\sigma}
\frac{
\left\|
\mathbf X_{i\sigma}(T)
-
\mathbf C(T)
-
\mathsf R(T)
\mathbf X_{i\sigma}^{\mathrm{F6c}}\!\left(\mathbf z(T)\right)
\right\|
}{L_{\mathrm{ref}}},
$$

where \(\mathbf C(T)\) removes rigid translation, \(\mathsf R(T)\in SO(3)\) removes rigid orientation, and \(L_{\mathrm{ref}}>0\) is frozen before the test. A small residual shows that the history remains close to the six-coordinate chart; it does not prove retention. Survival also requires pair clearance, member provenance, a finite continuation ledger throughout \(W\), and the causal-speed contract declared for the test: either the sub-field guard or the complete multi-root and transition certificates of the full causal-root regime.

Plainly: first move and rotate the measured eight-member object back onto the reference drawing. The leftover mismatch tells us whether the object is still F6c-shaped. Even a perfect shape match is not enough if members collide, enter an uncertified root transition, lose causal roots, or exchange identities.

The strong-field calculation has three logically distinct outcomes:

1. **Strict-chart continuation:** \(\mathcal R_{\mathrm{chart}}^{\mathrm{F6c}}\) remains below a frozen tolerance and all admission guards remain open. The same F6c chart continues through the tested window.
2. **Eight-member deformation:** the chart residual becomes large, but all eight provenances, causal roots, separation margins, and one retained assembly record survive. The object leaves strict F6c while remaining an eight-member assembly candidate.
3. **Reconfiguration or loss:** provenance, topology, membership, clearance, or root completeness changes. The incoming F6c record becomes a different assembly or ceases to supply an admissible retained object.

Plainly: the horizon does not have one preassigned effect on F6c. The tetrahedral pattern may survive, deform into a larger chart, or reorganize. The EOM solver must decide among those cases from the complete strong-field record.

The interface supplies a radial direction and generally an anisotropic Noether-sea history. That environmental direction is not part of the isolated strict F6c symmetry proof. Consequently, the six-coordinate tangent-closure result cannot be carried into the strong-field problem without checking the module-resolved acceleration residual. The directional triplets defined in the response-coordinate section are the smallest natural enlargement if strict F6c fails, but the Master Equation must select their amplitudes.

Plainly: isolated F6c treats its four tetrahedral directions symmetrically. A horizon environment distinguishes inward from outward, so the earlier symmetry protection may no longer apply.

#### Is There An Inside, And Does Time Continue There?

At the native layer, an “inside” is a compact region \(\Omega_{\mathrm{int}}(T)\) selected by the horizon-interface and exterior-access record in the Euclidean void. Absolute time still orders every admissible interior, boundary, and exterior event. If an F6c-derived eight-member history remains admissible, its positions and causal histories continue as functions of \(T\). This does not guarantee that an interior physical observer, material ruler, or exported clock channel exists.

The safe strong-field boundary condition from the canonical singularity treatment is

$$
\mathrm{Clock}_{\mathrm{PO}}
\!\left(\Omega_{\mathrm{int}}\right)
=
\varnothing
$$

unless a recoverable interior clock-and-ruler carrier is separately demonstrated. For an F6c clock this means that \(\varphi_{\mathrm{clk}}(T)\) may remain mathematically defined on a retained interior history while \(\tau_{\mathrm{F6c}}\) ceases to be an accessible physical-observer time and no outward sequence \(N_{\mathrm{rec}}\) reaches the exterior.

Plainly: “no readable clock inside” does not mean “nothing happens” or “absolute time stops.” It means the ingredients needed for an observer to build, compare, and export a clock record have not survived or have not been proved.

The candidate interior therefore has four allowed descriptions, ordered from strongest to weakest evidence:

- a retained strict-F6c continuation with complete roots and finite ledgers;
- a retained deformed eight-member continuation outside the strict chart;
- a reconfigured maximum-curvature or packed-state continuation whose F6c identity is lost but whose architrino provenance remains ledgered;
- no accepted interior description yet, when the boundary record does not determine a finite continuation.

Plainly: the current theory allows an interior as a finite evolving strong-field region, but it has not shown that F6c remains recognizable there. “There is no accepted interior solution yet” is different from asserting that no inside exists.

#### Does F6c Prevent A Singularity?

The exact F6c geometry does **not** by itself resist collapse. Under a uniform scale change

$$
h_\sigma\mapsto\lambda h_\sigma,
\qquad
\rho_\sigma\mapsto\lambda\rho_\sigma,
\qquad
\mathbf X_{i\sigma}\mapsto\lambda\mathbf X_{i\sigma},
$$

every pair distance scales as

$$
d_{ab}(\lambda)
=
\lambda d_{ab}(1).
$$

Thus the formal six-coordinate map permits \(\lambda\to0\). Its spherical envelopes are descriptive surfaces, not hard shells, and its tetrahedral symmetry supplies no outward acceleration barrier. A declared clearance requirement excludes sufficiently small \(\lambda\) from the admissible braid domain, but exclusion is not a mechanism that turns the collapse around.

Plainly: a perfectly symmetric F6c drawing can be shrunk toward a point. The geometry tells us when members become too close for the candidate to remain valid; it does not push them apart.

Any singularity-avoiding response must come from the Master Equation and the surrounding Noether-sea history. For a self-similar contraction coordinate \(\lambda(T)\), define the acceleration projected onto the scale direction by

$$
A_\lambda(T)
=
\frac{
\displaystyle
\sum_{i,\sigma}
\frac{\partial\mathbf X_{i\sigma}}{\partial\lambda}
\mathbin{\cdot}
\mathbf A_{i\sigma}(T)
}{
\displaystyle
\sum_{i,\sigma}
\left\|
\frac{\partial\mathbf X_{i\sigma}}{\partial\lambda}
\right\|^2
},
$$

where \(\mathbf A_{i\sigma}=d^2\mathbf X_{i\sigma}/dT^2\) is the complete acceleration returned by all ordinary and self-hit causal roots. During inward motion \(\dot\lambda<0\), a positive \(A_\lambda\) is an outward scale response. It becomes evidence for singularity resistance only if the same root-complete history turns before clearance loss, closes its energy, momentum, angular-momentum, wake-boundary, and Noether-sea ledgers, and enters a retained finite state rather than merely bouncing once.

Plainly: add every delayed acceleration contribution and ask whether the total points back toward larger size while the object is shrinking. One outward instant is not enough; the history must actually avoid collision and settle into or pass through a lawful finite continuation.

The black-hole-wide singularity-replacement target remains

$$
F_H=0,
\qquad
\mathcal R_H(\Omega,W)<\infty,
\qquad
0<\left|\mathcal B_H\right|<\infty,
\qquad
\mathcal L_{E\mathbf p\mathbf J}^{(\Omega)}\ \text{closes}.
$$

Here \(\mathcal R_H\) is the finite-interior regularity residual, \(\mathcal B_H\) is the finite horizon-interface continuation-label set, and \(\mathcal L_{E\mathbf p\mathbf J}^{(\Omega)}\) is the complete compact-region ledger. The proposed canonical mechanism is a maximum-curvature regime in which delayed self-hit and collective Noether-sea response prevent an unrestricted zero-volume continuation. F6c contributes to that program only if an admitted strong-field F6c or F6c-descended record satisfies the same boundary and ledger conditions. The live same-carrier equation packet is [EQ-07C](../mapping-equations/eq-07c-black-hole-horizon-interface-noether-braid-map.md).

Plainly: the proposed singularity replacement belongs to the complete black-hole carrier, not to tetrahedral symmetry. F6c can become one tested participant in that mechanism, but today it neither proves nor independently supplies the maximum-curvature core.

Claim grade: derived. Absolute time continues by ontology; the distinction between generated and received ticks is definitional; the uniform-scaling calculation proves that F6c geometry has no hard minimum size; and the chart residual is a declared diagnostic. These statements fail only if the F6c member map or the native time ontology is changed.

Plainly: F6c geometry alone does not stop collapse or stop absolute time; both negative statements follow directly from the scaling construction and the native time definition.

Claim grade: guessed. Strict-F6c survival, deformation, reconfiguration, clock export, interior persistence, outward self-hit response, horizon-interface coupling, and participation in a finite maximum-curvature core are unmeasured strong-field hypotheses. The proposal fails if the first root-complete strong-field record loses F6c admission before the interface, if the event-horizon and local-interface projections require different source histories, if no finite interior continuation exists, or if singularity avoidance requires a hand-inserted barrier rather than the complete Master Equation and Noether-sea record.

Plainly: the possible outcomes and the calculation that separates them are explicit, but no outcome has been selected by a measured strong-field F6c history.

### Candidate Particle-Facing Implementations

The exact F6c response chart supports several concrete particle-facing tests, but it does not identify F6c with any particle. A fermion generation, photon, or neutrino uses a different quotient of the complete history and therefore cannot be obtained by attaching three different names to the same coordinate count. The sections below state the strongest current implementation routes and the dynamical result each route would need.

Plainly: F6c has useful internal motions, but different particles ask those motions to do different jobs. A successful geometry must pass the job-specific test rather than merely resemble the expected picture.

#### Candidate Fermion-Generation Realization

The cleanest F6c generation hypothesis keeps the fermion's charge-facing and representation-facing realization fixed while changing its complete retained core history. For fermion sector \(F\) and candidate generation \(g\in\{1,2,3\}\), write

$$
\Theta_{F,g}
=
\left(
\Theta_{\mathrm{core}}^{(g)},
\mathcal D_F
\right),
$$

where \(\mathcal D_F\) denotes the fixed charge, color, and weak-facing decoration or projection declared for sector \(F\). A generation map must then obey

$$
\Pi_{\mathrm{rep},F}(\Theta_{F,g})
\simeq
\Pi_{\mathrm{rep},F}(\Theta_{F,g'})
\qquad
\text{for all }g,g',
$$

while permitting different mass-facing response, recurrence, lifetime, mixing-overlap, and reaction-exit records.

The corpus-wide representation and exactly-three selection obligations remain in [Quantum Number Mapping](../../../content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md#the-generation-mechanism-mass-hierarchy).

Plainly: an electron, muon, and tau would carry the same charge-facing architecture but occupy three different durable histories of the common core. The same division would apply within the up-type, down-type, and neutral-lepton families.

The three common sector coordinates

$$
\mathbf q_{\mathrm{even}}
=
\left(
h_{\mathrm{even}},
\rho_{\mathrm{even}},
\theta_{\mathrm{even}}
\right)
$$

provide a candidate reduced response space. The reduced operator defined in [Native Response Coordinates Suggested By F6c](#native-response-coordinates-suggested-by-f6c) could possess as many as three isolated modes, but a linear eigenvector is only a local deformation. To carry generation, each mode must continue nonlinearly into a positive-width retained branch or into a spectrally isolated admissible mode of one retained branch.

Plainly: three coordinates can describe three candidate rhythms, but a rhythm becomes a generation only when finite perturbations return to the same durable class instead of drifting continuously or destroying the assembly.

Let \(\mathcal R_F\) be the accepted complete-history set for fixed fermion sector \(F\), and let \(Q_F\) remove only declared spatial, phase, identity, and history redundancies. The exact generation-selection target is

$$
N_{\mathrm{gen}}^{(F)}
=
\#\pi_0^{\mathrm{robust}}
\left(
\mathcal R_F/Q_F
\right)
=3,
$$

or an equivalent exactly-three isolated-mode result on one connected retained branch. Every additional same-representation branch must be absent, transient, confined into another accepted role, or below a declared observer-level resolution bound.

Plainly: displaying three examples does not close the generation problem. The same fixed law must select exactly three durable choices and explain why a fourth same-charge partner does not survive.

The likely F6c mode fingerprints are mixtures rather than one-coordinate labels:

| Candidate core feature | Generation-facing role to test | Required result |
| --- | --- | --- |
| common axial breathing | changes longitudinal exposure and complete-history response | retained nonlinear continuation with unchanged representation-facing rows |
| common transverse breathing | changes envelope and shielding-facing response | a second isolated branch or mode, not a continuously tunable copy of the first |
| common cadence/history mode | changes recurrence and interaction overlap | a third isolated branch or mode with a complete causal-history distinction |

The names in the first column do not preassign the electron, muon, tau, or quark ordering. The eigenvectors may mix all three motions, and the generation index may not be assigned afterward by sorting the recovered mass-facing values.

Plainly: the dynamics must tell which mode is first, second, and third. Matching the lightest calculated mode to the electron only after seeing the answer would not derive the family structure.

The F6 one-versus-three chart has one exceptional module and a three-member \(C_3\) orbit, so it admits a cyclic three-port generation comparison. Strict F6c instead has a two-versus-two circulation decoration and the smaller \(D_{2d}\) chart symmetry. It therefore does not contain three equivalent nonexceptional modules as an exact generation mechanism. Three reduced collective modes or three dynamically selected basins are the defensible F6c route.

Claim grade: guessed. The fixed-representation condition and exactly-three exhaustion equation are observer-level recovery requirements. The placement of the generation carrier in F6c's common coordinates is the guessed mechanism. The hypothesis fails if no retained F6c branch exists, the reduced history does not close, fewer or more than three same-representation modes survive, or changing mode necessarily changes charge, color, or weak-facing identity.

Plainly: F6c offers a specific place to search for three generations, but it has not produced them. The test succeeds only if exactly three durable core histories share the same charge and interaction identity and every extra same-identity history is rejected.

#### Candidate Photon Role

An intact localized F6c assembly is not the strongest photon candidate. F6c is a volumetric six-coordinate candidate retained-assembly chart. A photon-like carrier instead requires source-free propagation, coherent phase cadence, exactly two transverse response channels, a helicity and angular-history ledger, no free longitudinal channel, trivial bosonic exchange holonomy, and no retained rest branch. F6c is therefore better matched to an emitter, receiver, or source geometry that launches a photon-channel packet, unless a distinct propagating F6c continuation removes the extra freedoms.

The layer and ontology rules for this comparison remain in the [Photon Guide](../../../content/markdown/aaa/archie/photon-guide.md).

Plainly: translating the complete eight-member picture does not automatically make a photon. The photon role needs a traveling two-channel history, while an ordinary F6c assembly has more ways to deform.

The body-fixed current axis supplies a candidate propagation direction only after an evolved history actually aligns translation with that axis:

$$
\hat{\mathbf k}
=
\frac{\mathbf m_{\mathrm{cur}}}
{\|\mathbf m_{\mathrm{cur}}\|},
\qquad
P_\perp
=
I-\hat{\mathbf k}\hat{\mathbf k}^{\mathsf T},
\qquad
P_\parallel
=
\hat{\mathbf k}\hat{\mathbf k}^{\mathsf T}.
$$

Here \(P_\perp\) projects a directional F6c response onto the plane normal to the candidate propagation direction. For a response Gram operator \(G\) measured on one complete source-to-receiver record, the photon-facing rank target is

$$
n_T
=
\operatorname{rank}_\tau(P_\perp G P_\perp)
=2,
\qquad
n_L
=
\operatorname{rank}_\tau
\left(
P_\parallel G P_\parallel
\right)
=0.
$$

Plainly: two independent sideways responses must propagate, and no independent along-the-path response may survive as a free photon polarization. The ranks must be measured from native evolution rather than inserted as labels.

Choose an ordered transverse basis \((\hat{\mathbf e}_1,\hat{\mathbf e}_2)\). The candidate exported amplitude is

$$
\boldsymbol\Psi_\perp
=
a_1\hat{\mathbf e}_1
+
a_2\hat{\mathbf e}_2.
$$

At the observer-comparison layer, the circular combinations are

$$
\boldsymbol\Psi_\pm
=
\frac{1}{\sqrt2}
\left(
\hat{\mathbf e}_1
\mathbin{\pm}
i\hat{\mathbf e}_2
\right).
$$

The complex notation summarizes a quarter-cycle phase relationship between two real response histories. It does not introduce a complex substrate field. The sign is a candidate helicity label only after the ordered transverse phase is compared with \(\hat{\mathbf k}\).

Plainly: a fixed sideways direction gives linear polarization. Two sideways responses cycling a quarter-period apart give the two circular polarization patterns. Their handedness is defined relative to the direction of travel.

The phase must advance through source, path, and receiver histories. A compact observer-facing description is

$$
\boldsymbol\Psi_\perp(\ell,T)
=
\operatorname{Re}
\left[
\mathbf a_\perp(\ell,T)
e^{i\Phi(\ell,T)}
\right],
$$

where \(\ell\) is a declared path coordinate and \(T\) is absolute time. The photon frequency is recovered from the phase cadence at the source or receiver; it is not the rest period of a localized F6c assembly.

Plainly: photon frequency counts how rapidly a traveling phase passes a detector. It does not require a small F6c clock to orbit while sitting at rest.

A photon identity also requires the no-rest condition

$$
\mathcal B_\gamma
\left(
\|\mathbf V_{\gamma,\mathrm{group}}\|=0
\right)
=
\varnothing.
$$

Here \(\mathbf V_{\gamma,\mathrm{group}}=d\mathbf C_\gamma/dT\) is the native group-path velocity of the candidate carrier center \(\mathbf C_\gamma(T)\).

If the carrier stops propagating, its history must terminate through capture or reorganize into matter and Noether-sea records. An intact stationary F6c branch with the same exported identity would falsify the photon assignment.

Plainly: a photon may be emitted, propagate, scatter, and be captured, but the same object cannot be slowed into a stationary photon assembly.

The strongest current F6c photon route is therefore an event sequence:

1. a retained matter assembly develops a source transition with a declared phase and angular ledger;
2. its F6c current-axis and directional-response geometry launches a neutral propagating disturbance;
3. only two transverse response combinations continue source-free;
4. their relative phase supplies linear, elliptical, or circular polarization;
5. a receiver captures the disturbance and the free-carrier record ends; and
6. every architrino, wake, recoil, and Noether-sea contribution remains in the same provenance ledger.

The completed record must also recover trivial bosonic exchange for two identical carriers and one universal observer-level relation among phase cadence, transported action, and measured photon energy. Neither property follows from having an even number of architrinos or from displaying two transverse response coordinates.

Plainly: two polarization channels do not by themselves make a photon. Two identical packets must also exchange with bosonic behavior, and the same phase record must explain how observers assign frequency and energy.

This route permits the actual free carrier to be the currently proposed coaxial polarity-conjugate planar-pair train rather than the complete F6c assembly. A direct F6c photon remains an alternative only if a propagating eight-member continuation passes the same rank, helicity, exchange, source, capture, and no-rest tests.

Claim grade: guessed. The two-transverse, no-longitudinal, helicity, provenance, and no-rest conditions are observer-level recovery requirements. The use of the F6c current axis and transverse response plane is an inferred search route; identifying either an intact or emitted F6c-derived record as a photon is the guessed mechanism. It fails if longitudinal leakage persists, transverse degeneracy splits into orientation-dependent propagation, packet identity or helicity is lost, a rest branch survives, or the source and capture ledgers do not close.

Plainly: the photon section defines what an F6c-derived packet would have to do—carry two equivalent sideways responses, preserve handed phase, travel without a rest state, and connect emitter to receiver. No current F6c record passes that full test.

#### Candidate Neutrino Role

The current neutrino architecture is a near-photon, near-planar polarity-conjugate carrier, not an ordinary six-site charged-fermion layer. An F6c neutrino would therefore be an alternative eight-member realization or a source-to-carrier reorganization route. Its strongest interpretation is an undecorated neutral F6c continuation that approaches the photon lock but retains a small internal mismatch carrying weak exposure and three coherent propagation modes.

The owning neutral-lepton construction and its referent boundary remain in [Neutrinos](../../../content/markdown/aaa/assemblies/fermions/neutrinos.md).

Plainly: the neutrino candidate uses the balanced four-positrino and four-electrino F6c core. It does not add a literal \(3+3\) charge decoration; that notation remains weak-interaction bookkeeping.

The complete-history neutrality target is

$$
Q_{\mathrm{eff}}[\Theta_\nu]=0.
$$

A candidate departure from a photon-like sector lock can be parameterized by

$$
\boldsymbol\delta_\nu
=
\left(
h_{\mathrm{odd}},
\rho_{\mathrm{odd}},
\theta_{\mathrm{odd}}
\right)
\ne\mathbf0.
$$

The residual must preserve zero charge while supplying a small mass-facing response, a weak-facing posture, and internal phase differences. This parameterization is referent-pending until a retained or propagating neutral base branch exists; a residual about a non-solution cannot be assigned a spectrum or physical magnitude.

Plainly: the positive and negative sectors would almost lock into one neutral photon-like history but remain slightly out of step. The weak channel could read that small mismatch, but the mismatch cannot be measured until the base history actually exists.

Only after exact acceleration balance or an admissible propagating base record is established may the neutral response be tested for exactly three isolated eigenrecords

$$
v_1,
\qquad
v_2,
\qquad
v_3.
$$

They would be collective mixtures of F6c breathing, cadence, directional, and polarity-differential motion rather than three constituents or three tetrahedral axes. The three phase histories contain two independent relative phases after their common phase is removed:

$$
\Delta\phi_{21}(T)
=
\phi_2(T)-\phi_1(T),
\qquad
\Delta\phi_{31}(T)
=
\phi_3(T)-\phi_1(T).
$$

Plainly: one neutral carrier would travel with three internal rhythms. Only the changing offsets among those rhythms matter for oscillation, so three rhythms produce two independent phase gaps.

At the observer-comparison layer, a source-prepared weak state may be written

$$
|\nu_\alpha;T\rangle
=
\sum_{i=1}^{3}
U_{\alpha i}
e^{i\phi_i(T)}
|v_i\rangle.
$$

The symbols \(|v_i\rangle\) summarize complete propagation eigenrecords and \(U_{\alpha i}\) summarizes source or detector overlap with those records. This equation is a recovery grammar for native histories, not a quantum-state postulate inserted into the Master Equation. Flavor belongs to the source and detector corridor projections; the carrier does not repeatedly rebuild itself as three different assemblies during propagation.

Plainly: the source prepares one mixture, the three internal histories acquire different phases on one common path, and the detector reads another mixture. Oscillation is a changing endpoint projection of one continuous carrier record.

The F6c current axis may supply the common propagation direction if one evolved branch actually aligns its group path with that axis. In contrast with the photon, the neutrino is allowed a small residual longitudinal or polarity-differential response and is not required to lack every rest continuation. That residual is the candidate source of its small mass-facing readout.

| Photon-facing continuation | Neutrino-facing continuation |
| --- | --- |
| complete neutral transverse lock | nearly complete neutral lock |
| exactly two free transverse channels | exactly three coherent internal eigenrecords |
| no free longitudinal response | small residual internal or longitudinal structure may remain |
| no retained rest branch | a rest continuation may exist in principle |
| one traveling phase cadence | two independent relative phase gaps |
| no weak-flavor projection | source and detector weak-corridor projections |

The weak-facing posture must be part of the ordered complete history and must remain distinct from observer helicity. The sign of \(\mathbf m_{\mathrm{cur}}\mathbin{\cdot}\hat{\mathbf k}\) alone cannot derive weak handedness. Global polarity conjugation reverses F6c's odd coordinates and supplies a candidate neutrino/antineutrino comparison, but the transformation character of the ordered weak posture must decide whether the two histories are conjugate-distinct or admit a self-conjugate realization. F6c geometry alone therefore does not settle the Dirac-versus-Majorana branch.

Plainly: traveling clockwise or counterclockwise relative to the flight axis is not enough to explain weak handedness. The weak corridor must read a durable internal history feature, and its behavior under polarity conjugation remains part of the neutrino test.

Propagation coherence and detection access are separate margins. The three phase-bearing eigenrecords must remain coherent across the path even though the localized weak-capture corridor occupies only a small part of the receiver's available history space. A small detection probability is not a short neutrino lifetime, and long coherence does not by itself supply a weak interaction.

Plainly: the neutrino must preserve its internal rhythm for a long trip while still being hard to capture. “Rarely detected” and “quickly destroyed” are different statements and require different calculations.

The minimum F6c neutrino record is schematically

$$
\Theta_\nu
=
\left(
\Theta_{\mathrm{F6c}}^0,
\boldsymbol\delta_\nu,
v_1,v_2,v_3,
\hat{\mathbf k},
\mathcal U_{\mathrm{src}},
\mathcal U_{\mathrm{det}},
\mathcal E_W,
\Theta_{\mathrm{sea}}
\right).
$$

Here \(\Theta_{\mathrm{F6c}}^0\) is the shared neutral carrier, \(\mathcal U_{\mathrm{src}}\) and \(\mathcal U_{\mathrm{det}}\) are weak source and detector projections, \(\mathcal E_W\) is the ordered weak-facing posture, and \(\Theta_{\mathrm{sea}}\) is the Noether-sea history through which the carrier propagates. All entries must arise from one root-complete record.

Plainly: the proposed neutrino needs one neutral support, one small photon-lock mismatch, three internal modes, one common path, two endpoint readouts, and one continuous environmental history.

Claim grade: guessed. Neutrality, three-mode coherence, two relative phase gaps, weak endpoint projection, and handedness distinct from helicity are observer-level recovery requirements. Assigning them to F6c's odd and collective response coordinates is the guessed mechanism. The F6c neutrino route fails if the eight-member branch is not admissible, the charge projection is nonzero, the neutral response has fewer or more than three coherent modes, mode propagation separates into different group paths, weak projection destroys carrier identity, or F6c supplies neither an alternative satisfying the same neutral-lepton requirements nor a ledger-complete reorganization into the current near-planar candidate.

Plainly: the neutrino proposal is a testable architecture, not a result. It must keep one neutral carrier intact while exactly three internal rhythms stay coherent on one path and weak interactions read their changing mixture.

#### Candidate Gravitational-Wave Role For F6c Timespace Histories

The phrase **timespace braid of F6c geometry** is descriptive shorthand for the eight ordered F6c worldline histories

$$
\mathcal B_A
=
\left\{
\left(T,\mathbf X_{A,i\sigma}(T)\right)
\right\}_{i,\sigma}
$$

together with their causal-root and wake record. It does not introduce a fundamental spacetime fabric. The native background remains absolute time plus the Euclidean void, while the Noether sea contains whatever assemblies and histories ordinary dynamics retains.

The observer-level recovery obligations remain in [Gravitational Waves](../../../content/markdown/aaa/spacetime/gravitational-waves.md).

Plainly: an F6c timespace braid is the complete movie of eight paths and their delayed interactions. It is not a material thread from which space or time is woven.

Assume, only for this candidate mechanism, that the Noether sea admits retained F6c-like cells indexed by \(A\), with center paths \(\mathbf C_A(T)\) and relative paths

$$
\mathbf r_{A,i\sigma}(T)
=
\mathbf X_{A,i\sigma}(T)-\mathbf C_A(T).
$$

A gravitational-wave candidate would then be a coherent causally delayed pattern of trace-free shape changes transferred through many complete histories, not one F6c assembly traveling from source to detector. Neighboring cells need not occupy a lattice; adjacency means that the declared causal-root and Noether-sea response record couples their histories.

Plainly: picture many retained F6c-like clockworks distributed through the Noether sea. A wave would be a coordinated pattern in how they deform and retime, with each region responding after the appropriate causal delay.

Two roles must remain separate:

1. **Carrier hypothesis:** coupled F6c-like sea histories transport the trace-free disturbance.
2. **Receiver hypothesis:** another Noether-sea mode transports the disturbance, while F6c assemblies act only as clocks, rulers, source constituents, or detector elements whose histories are modulated at arrival.

The carrier hypothesis requires a root-complete multi-cell transfer result. The receiver hypothesis requires a same-record constitutive map from the arriving sea disturbance into F6c shape and clock channels. A detector response alone cannot distinguish the two roles.

Plainly: F6c could be part of the cable carrying the signal, or it could be an instrument connected to that cable. Showing that the instrument moves does not show what transported the disturbance to it.

For a retained cell \(A\) with complete period \(P_A\), define its cycle-averaged second-moment tensor

$$
Q_{A,ij}
=
\frac{1}{8P_A}
\sum_{i',\sigma}
\int_{T_0}^{T_0+P_A}
r_{A,i'\sigma,i}(T)
r_{A,i'\sigma,j}(T)
\,dT,
$$

and its symmetric trace-free part

$$
S_{A,ij}
=
Q_{A,ij}
-
\frac13\delta_{ij}Q_{A,kk}.
$$

Common breathing changes the trace \(Q_{A,kk}\); directional stretch-and-squeeze changes \(S_{A,ij}\). The exactly phase-averaged strict F6c scaffold is isotropic and has \(S_{A,ij}=0\), so a nonzero tensor channel requires off-surface directional perturbations or a larger retained chart.

Plainly: first separate an all-directions size change from a deformation that stretches one way while squeezing another. Only the second type supplies the candidate gravitational-wave shape signal.

For a declared propagation direction \(\hat{\mathbf k}\), define

$$
P_{ij}
=
\delta_{ij}-\hat k_i\hat k_j,
$$

and the transverse-trace-free diagnostic

$$
H_{A,ij}^{\mathrm{TT}}
=
\left(
P_i{}^aP_j{}^b
-
\frac12P_{ij}P^{ab}
\right)
S_{A,ab}.
$$

This is a projection of measured native shape history, not a primitive metric perturbation. It becomes an observer-level gravitational strain candidate only after a common clock, ruler, signal, and Noether-sea map is derived.

Plainly: remove ordinary breathing, then remove every deformation pointing along the travel direction. The remaining sideways volume-preserving pattern is the part that can be compared with a tensor gravitational wave.

The need for an enlarged chart follows from the tetrahedral response algebra. The zero-sum module perturbations form a three-component directional sector, and their symmetric products split as

$$
\mathbf3
\mathbin{\otimes}_{\mathrm{sym}}
\mathbf3
=
\mathbf1
\mathbin{\oplus}
\mathbf5.
$$

The singlet is the trace, while the five-component sector is the native symmetric trace-free shape candidate before a propagation direction and its constraints reduce the exported response to two transverse patterns. One strict common breathing coordinate cannot supply this tensor sector.

This \(\mathbf1\mathbin{\oplus}\mathbf5\) split is the ordinary Euclidean rotation decomposition of a symmetric rank-two tensor. It is not a statement that the discrete \(D_{2d}\) F6c chart has an irreducible five-dimensional representation; the decorated subgroup may split the five components further.

Plainly: one directional deformation behaves like an arrow. A tensor wave needs correlations between two directional deformations—stretch here while squeezing there—so strict six-coordinate breathing is not enough by itself.

Choose two perpendicular unit vectors \(\hat{\mathbf e}_1,\hat{\mathbf e}_2\) transverse to \(\hat{\mathbf k}\). The observer-level comparison pattern is

$$
H_{ij}^{\mathrm{TT}}
=
h_+
\left(
e_{1i}e_{1j}-e_{2i}e_{2j}
\right)
+
h_\times
\left(
e_{1i}e_{2j}+e_{2i}e_{1j}
\right).
$$

The plus pattern alternates stretch along \(\hat{\mathbf e}_1\) with squeeze along \(\hat{\mathbf e}_2\). The cross pattern is the same trace-free response rotated by \(45^\circ\) in the transverse plane. These are required effective patterns, not currently derived F6c modes.

Plainly: looking into the arriving disturbance, the plus pattern stretches up-down while squeezing left-right and then reverses. The cross pattern does the same along the diagonal directions.

To compare many discrete cells with a traveling pattern, choose one declared nonnegative interpolation kernel \(w\) and define

$$
\overline H_{ij}^{\mathrm{TT}}(T,\mathbf X)
=
\frac{
\displaystyle
\sum_A
w\!\left(\mathbf X-\mathbf C_A(T)\right)
H_{A,ij}^{\mathrm{TT}}(T)
}{
\displaystyle
\sum_A
w\!\left(\mathbf X-\mathbf C_A(T)\right)
},
$$

where the denominator must be nonzero. This is an analysis map from the cell-indexed record to a coarse-grained tensor diagnostic. The kernel width and normalization are frozen before the propagation test and are not new substrate physics.

Plainly: each cell supplies one measured distortion. The averaging kernel specifies how nearby cell readings are combined into a smooth map, much like interpolating readings from a sensor array. Changing that averaging rule after seeing the result would invalidate the comparison.

Native propagation must be a causal progression of complete-history changes. A coarse-grained traveling-pattern test is

$$
\overline H_{ij}^{\mathrm{TT}}
\left(
T+\Delta T,
\mathbf X+c_{\mathrm{tens}}\Delta T\hat{\mathbf k}
\right)
\simeq
\overline H_{ij}^{\mathrm{TT}}(T,\mathbf X)
$$

over a declared weak-amplitude band. The speed \(c_{\mathrm{tens}}\) is the measured native transport rate of that pattern. It is not automatically the primitive wake speed \(c_f\) or the effective gravitational-wave speed.

Plainly: perturb one region and ask whether the same trace-free deformation appears farther away after one measured delay. Propagation must be demonstrated by the delayed multi-cell history, not by shifting a drawing along an axis.

After the observer map is derived, the same record must recover the standard source-free weak-field comparison form

$$
\Box_{c_{\mathrm{GW}}^{\mathrm{eff}}}^{\mathrm{eff}}
h_{ij}^{\mathrm{TT}}
\left(t_{\mathrm{eff}},\mathbf x_{\mathrm{eff}}\right)
=0,
\qquad
\Box_c^{\mathrm{eff}}
\equiv
\nabla_{\mathbf x_{\mathrm{eff}}}^2
-
\frac{1}{c^2}
\frac{\partial^2}{\partial t_{\mathrm{eff}}^2},
$$

with two leading transverse polarizations, small dispersion in the tested band, and an effective speed compatible with the photon channel. This equation is a recovery target; it is not used to evolve architrinos or author the Noether-sea response.

Plainly: the native calculation follows delayed architrino and sea histories. Only afterward may an observer summarize the result with the familiar wave equation. Here \(t_{\mathrm{eff}}\) and \(\mathbf x_{\mathrm{eff}}\) are the observer's derived clock and ruler coordinates, \(h_{ij}^{\mathrm{TT}}\) is the observer-level transverse distortion, and \(c_{\mathrm{GW}}^{\mathrm{eff}}\) is its recovered propagation speed. The operator \(\Box_c^{\mathrm{eff}}\) compares spatial curvature with the second time change of that distortion. All of these quantities must be recovered using the same clocks, rulers, and signal records as the photon test.

At the source, a changing quadrupolar assembly history must launch the trace-free response while its complete source, wake, sea, energy, and angular ledgers suppress disallowed lower-order leakage. At the detector, the required effective strain comparison for arm direction \(\hat{\mathbf n}\) is

$$
\frac{\delta L}{L}
=
\frac12
n^i h_{ij}^{\mathrm{TT}}n^j.
$$

The native mechanism must derive this readout from correlated changes in detector assemblies, clock returns, ruler projections, and light-timing records. It must not describe the Euclidean void itself as stretching.

Plainly: the source launches a four-lobed stretch-and-squeeze response, and the detector compares tiny correlated changes in its physical arms and timing system. Empty Euclidean space remains the fixed container.

Claim grade: guessed. The tensors \(Q_{A,ij}\), \(S_{A,ij}\), and the TT projection are defined geometric diagnostics on any declared retained multi-cell record. The carrier and receiver roles are the guessed mechanisms. Two transverse patterns, photon/gravity effective-speed agreement, weak dispersion, quadrupolar source behavior, and detector strain are **observer-level recovery requirements**. The F6c carrier hypothesis fails if no root-valid trace-free mode exists, no coherent multi-cell transfer occurs, scalar/vector/longitudinal leakage remains large, different orientations require different laws, or detector strain cannot be derived from the same Noether-sea and clock/ruler record.

Plainly: the tensor calculations tell us how to measure an F6c shape distortion, but they do not show that F6c carries gravity. That claim requires one disturbance to cross between retained histories and recover the same two-pattern, speed, source, and detector behavior seen by observers.

The smallest decisive artifact is a two-cell fixed-law transfer calculation:

1. obtain one retained F6c rest return;
2. perturb one cell in a declared trace-free module pattern;
3. evolve both cells with every cross-cell causal root and \(c_f=1\);
4. extract \(Q_{A,ij}\), \(S_{A,ij}\), and \(H_{A,ij}^{\mathrm{TT}}\);
5. measure delay, attenuation, dispersion, polarization leakage, clearance, root completeness, and return survival; and
6. repeat with a rotated source pattern without changing the law or coefficients.

Plainly: the decisive transfer test is whether one lawful F6c trace-free deformation can make a second retained F6c cell reproduce that deformation after the correct causal delay.

### Are There Neutral Volumes That Could Capture Six Architrinos?

#### Definition Of A Lagrange-Like Capture Volume

The fermion-facing target is not primarily a set of point equilibria or the capture of only one ninth member. It is a set of finite regions within or around the eight-member structure that can receive **six additional architrinos** with a particle-dependent polarity inventory. The six captured members must remain mutually separated, associated with the F6c host, and compatible with one collective delayed-history solution.

This document uses **neutral volume** as a working description for such a candidate region. “Neutral” does not mean zero primitive polarity, empty space, or exactly zero acceleration everywhere. At the first diagnostic rung, it means low net acceleration for one declared probe polarity, velocity, path history, and phase of the F6c source record. At the six-member rung, neutrality is collective: each captured member must receive a compatible acceleration from the eight host members and the other five captured members. The visible regions may move, breathe, split, merge, or disappear during one F6c cycle.

Plainly: the picture is six places or pathways that work together, not one magic dot. A location that looks calm for one architrino may fail after five others arrive, and six individually poor locations may become viable through their combined response.

#### Six-Member Polarity Inventory

Label the captured members by \(a\in\{1,\ldots,6\}\) and write their polarity vector as

\[
\boldsymbol p=(p_1,\ldots,p_6),
\qquad
p_a\in\{+1,-1\}.
\]

Its inventory is

\[
N_+(\boldsymbol p)=\#\{a:p_a=+1\},
\qquad
N_-(\boldsymbol p)=6-N_+(\boldsymbol p).
\]

There are seven unsigned count classes \((N_+,N_-)\), from \((0,6)\) through \((6,0)\). If the six sites are labeled, one class contains \(\binom{6}{N_+}\) polarity assignments and all classes together contain \(2^6=64\) assignments. These are combinatorial possibilities, not 64 particles. Spatial symmetry, axial-dyad organization, history, and ordinary dynamics must identify equivalent assignments and reject unretained ones.

The current charged-fermion candidate catalog uses the count classes as follows:

| Captured inventory \((N_+,N_-)\) | Current particle-facing bookkeeping | Status in this F6c capture proposal |
| --- | --- | --- |
| \((0,6)\) | negatively charged leptons | literal six-member candidate inventory |
| \((1,5)\) | conjugates of up-type quarks | literal six-member candidate inventory |
| \((2,4)\) | down-type quarks | literal count, with more than one possible axial-dyad partition requiring dynamical selection |
| \((3,3)\) | neutrino weak-exposure bookkeeping | not currently a literal six-site neutrino inventory in the owning fermion documents |
| \((4,2)\) | conjugates of down-type quarks | literal count with the conjugate selection burden |
| \((5,1)\) | up-type quarks | literal count, with the exceptional mixed dyad supplying the candidate color axis |
| \((6,0)\) | positively charged leptons | literal six-member candidate inventory |

The search instrument must accept every declared six-member polarity vector while the particle map selects only declared inventory and geometry classes. It must not assume that every permutation inside a count class is a distinct species, or that net count alone determines a fermion.

Plainly: six seats can be filled with every mixture from six electrinos to six positrinos. The mixture fixes a candidate charge count, but which seat holds which polarity can also control color, weak exposure, and whether the object survives. The present corpus treats the neutral neutrino row differently, so the \(3+3\) case is a deliberate architecture question rather than an already accepted literal picture.

#### Why Six Is Not Yet A Survival Requirement

The number six enters the proposal for two independent reasons, neither of which proves retention. First, six equal signed polarity units give an economical observer-level charge ladder. With \(\epsilon=|e|/6\), the candidate charge projection is

$$
Q_{\mathrm{eff}}(\boldsymbol p)
=
\epsilon
\sum_{a=1}^{6}p_a.
$$

Its possible values are

$$
Q_{\mathrm{eff}}
\in
\left\{
-|e|,
-\frac{2|e|}{3},
-\frac{|e|}{3},
0,
\frac{|e|}{3},
\frac{2|e|}{3},
|e|
\right\}.
$$

This is observer-facing bookkeeping. Primitive polarity enters the native interaction law, while the normalization to measured electric charge remains a recovery target.

Plainly: six equally normalized signed contributions reproduce the familiar integer and third-integer fermion charge classes. That explains why six is an economical charge count, not why six additional architrinos bind.

Second, the equal-scale intersecting-tetrahedron geometry supplies six central octahedral vertices. Those vertices also index the six edges of either tetrahedron and split under the decorated F6c symmetry into a two-member axial orbit plus a four-member transverse orbit. This makes six a symmetry-natural search seed.

Plainly: the geometry independently marks six attractive places to inspect. The agreement between the charge count and the geometric count is suggestive, but a marked location is not a capture basin.

For a decoration count \(n\), let \(\alpha\) identify a symmetry-inequivalent polarity, placement, phase, and prehistory class, and let \(\mathcal B_{n,\alpha}^{\mathrm{ret}}\) be its positive-width, root-complete, clearance-valid retained basin under fully backreacting \((8+n)\)-member evolution. The statement “only six survives” would require

$$
\mathcal B_{6,\alpha_*}^{\mathrm{ret}}
\ne\varnothing
\quad
\text{for at least one }\alpha_*,
$$

and, over one explicitly declared exhaustive search domain,

$$
\mathcal B_{n,\alpha}^{\mathrm{ret}}
=\varnothing
\qquad
\text{for every }n\ne6
\text{ and every admitted }\alpha.
$$

Plainly: one six-member configuration must possess a real basin, while every other admitted count and arrangement must escape, collide, lose causal roots, or reorganize. No current calculation establishes either half of that result.

A plausible selection mechanism is that full occupation of the octahedral \(2+4\) seed cancels directional acceleration leakage that a partially filled pattern leaves unmatched. That mechanism is only a guess. The F6c symmetry also admits paired and four-member special-position orbits, while generic off-symmetry sites occur in eight-member orbits. Symmetry therefore cannot exclude retained two-, four-, eight-, or symmetry-broken additions. Polarity decoration can further reduce the symmetry even when all six geometric sites are occupied.

Plainly: filling all six seats may balance the structure better than filling some of them, but smaller symmetry-complete groups also exist. The Master Equation must decide which counts actually persist.

Every charge-facing addition is a transmitter and receiver with its own causal history. It may stabilize, destabilize, or reorganize the host; it cannot be treated as a passive charge placed on an unchanged F6c trajectory. If the eight-member host remains intact, six additions produce a fourteen-member candidate history. That arithmetic defines one literal placement test; it neither validates nor rules out F6c relative to other speculative fermion families.

Claim grade: guessed. The charge-count ladder and the six-site reference geometry are derived bookkeeping and geometry. The cancellation-based selection mechanism is the guessed claim. Exact-six survival is unmeasured and unproved. It is falsified by any retained non-six decoration in the declared search domain, and it remains unestablished until at least one fully backreacting six-addition basin or ledger-complete reorganization is exhibited.

Plainly: six is justified as a charge-count and search geometry, but not as the only survivable member count. That stronger statement needs one successful six-addition history and a declared exhaustive failure of every admitted non-six alternative.

#### One Volume, Six Volumes, Or Six Paths?

The word “volumes” must not prejudge the topology. A six-member captured state could project into ordinary three-dimensional space as:

- six disjoint moving pockets;
- a two-pocket plus four-pocket symmetry arrangement;
- one connected region containing six separated recurrent paths; or
- a time-dependent exchange network in which member labels circulate through a smaller number of visible lobes without collisions.

The actual capture basin lives in the configuration-history space of six members. Its ordinary-space picture is only a projection. In particular, six architrinos cannot all occupy one point or one identical path while satisfying the required member-clearance and labeled-history conditions.

Plainly: “six capture volumes” names a candidate organization, not a law. The geometry may consist of six pockets or one larger chamber containing six coordinated tracks.

#### Why Classical Lagrange Points Are Only An Analogy

Classical Lagrange points are equilibrium locations in a rotating restricted three-body model with a declared instantaneous gravitational potential and a specific co-rotating frame. Their count of five follows from that model, not from the general existence of rotating sources. A standard comparison source is NASA's [Restricted Three-Body Problem note](https://science.nasa.gov/wp-content/uploads/2023/07/3322_lagrange.pdf).

F6c instead has eight delayed sources, two breathing polarity sectors, independent cadences, no derived rigid rotation of the entire body, no accepted time-independent assembly potential, and no retained periodic branch. Therefore neither the classical count nor the classical point construction transfers. The useful part of the analogy is only the search for locations or regions where additional members could remain body-associated.

Plainly: “Lagrange-like” names the capture question, not the equation used to answer it. F6c must derive its own neutral regions from delayed architrino paths.

#### Instantaneous Neutral-Volume Diagnostic

Let \(p\in\{+1,-1\}\) be the polarity of a probe architrino. For a declared F6c source history \(\mathcal H_{\mathrm{F6c}}\), probe history \(\mathcal H_{\mathrm p}\), probe velocity \(\mathbf V_{\mathrm p}\), and time \(T\), write its Master Equation acceleration as

\[
\mathbf A_p
\left(
\mathbf y,\mathbf V_{\mathrm p},T;
\mathcal H_{\mathrm p},
\mathcal H_{\mathrm{F6c}}
\right).
\]

For a declared diagnostic threshold \(\varepsilon_A\), an instantaneous low-acceleration region is

\[
\mathcal N_{p,\varepsilon_A}
\left(
T;\mathbf V_{\mathrm p},\mathcal H_{\mathrm p}
\right)
=
\left\{
\mathbf y:
\left\|
\mathbf A_p
\left(
\mathbf y,\mathbf V_{\mathrm p},T;
\mathcal H_{\mathrm p},
\mathcal H_{\mathrm{F6c}}
\right)
\right\|
\le \varepsilon_A
\right\}.
\]

The threshold is an instrument resolution, not a new physical constant. Candidate volumes must also exclude points without valid causal roots and points inside the required clearance from an existing member path. Changing probe polarity, velocity, prehistory, or F6c phase can change the region.

Plainly: freeze one fully specified probe experiment and shade every location where its calculated acceleration is small. Connected shaded regions are single-seat candidates for that experiment only. Repeating this for both polarities provides a site atlas from which six-member configurations can be proposed; it does not test the completed six-member state.

An exact zero-acceleration set can consist of isolated points, curves, surfaces, or volumes. A finite low-acceleration volume can surround a lower-dimensional exact zero set. Neither object by itself proves capture: a moving architrino can coast through a perfectly neutral region and leave on the other side.

#### Capture Is A Stronger Dynamical Condition

Let \(\mathbf C(T)\) be the assembly-center path and \(Q(T)\) a declared body-frame orientation. Captured member \(a\) has body-frame position

\[
\boldsymbol\xi_a(T)
=
Q(T)^{\mathsf T}
\left(
\mathbf Y_a(T)-\mathbf C(T)
\right).
\]

A candidate six-member basin \(\mathfrak V_{\boldsymbol p}(T)\) captures a set of initial histories only if the tuple \((\boldsymbol\xi_1,\ldots,\boldsymbol\xi_6)\) remains in that basin, or returns to it under a declared recurrent rule, while maintaining causal-root validity, all pairwise member clearances, and the \(c_f=1\) speed margin. Capture therefore belongs to position-velocity-history space for the full tuple, even when its visible projection is drawn as several three-dimensional volumes.

Plainly: a map of small acceleration is like a map of calm water. Collective capture is the stronger claim that six objects placed in a whole range of starting positions and velocities neither drift away nor disrupt one another.

A useful candidate need not have zero acceleration throughout its interior. The central part may be nearly neutral while the boundary supplies an inward or phase-averaged restoring response. Because the F6c source breathes and its cadences change, a capture volume may be dynamically maintained rather than static.

A one-way probe calculation can locate possible seats without letting a probe change the eight-source record. A stronger fixed-host diagnostic evolves six captured members, including their mutual delayed contributions, while holding the F6c history prescribed. Both are diagnostic approximations. If all eight F6c members remain while six accessory architrinos are added, the literal-addition diagnostic requires full **fourteen-member** evolution: every added architrino contributes its own delayed history and may deform, destroy, or reorganize the original F6c motion. That fourteen-member calculation tests the literal addition picture; it does not define a final fermion architecture.

Plainly: first map possible seats one probe at a time. Next test six mutually interacting additions against a fixed host. A fully backreacting fourteen-member diagnostic then asks what the literal eight-plus-six system actually does, without assigning it a fermion or generation identity.

#### F6c Accessory-Inventory And Generation Search Questions

Fermion braid geometry remains an open search program. One speculative comparison family uses a $3{:}3$ braid core for Generation I, a $2{:}2$ core for Generation II, and a $1{:}1$ core for Generation III, with six accessory architrinos considered alongside each core. None of those candidate geometries, accessory placements, or generation assignments is established, and that family is not a canonical catalog that every new candidate must reproduce.

F6c supplies a $4{:}4$ candidate braid geometry. It is not currently required to map its eight members into the $3{:}3$ comparison family. Whether F6c can capture or organize six accessory architrinos, and where those accessory histories would lie relative to its two sector envelopes and internal tracks, are open dynamical questions.

If an intact $4{:}4$ F6c braid and six distinct accessory architrinos were all retained, the literal count would be

\[
N_{\mathrm{literal}}=8+6=14
\]

architrinos. This arithmetic identifies one question-generating interpretation of the F6c search. It is not a proposed final fermion architecture and does not contradict an established constituent catalog, because no candidate fermion braid geometry has reached that status.

The generation question is also open. F6c might fail to support any fermion branch, might support a Generation I branch without yielding higher-generation descendants, might reorganize into $3{:}3$, $2{:}2$, or $1{:}1$ descendants under a separately declared and fully ledgered mechanism, or might encode generation through a different set of retained modes or deformations. These are search alternatives, not established branches or required transitions.

No present result establishes F6c capture, binding, retention, accessory storage, fermion identity, a generation mechanism, or any constituent reorganization.

Plainly: $3{:}3$, $2{:}2$, $1{:}1$, and F6c's $4{:}4$ are all candidate braid geometries. Adding six accessories to an intact $4{:}4$ candidate gives fourteen members, but that count only defines one experiment to try. The dynamics must still determine whether the eight-member braid exists, whether six accessories can remain associated with it, and whether generations arise from smaller descendants or from a different mechanism.

#### What Symmetry Can Say Before Dynamics

The \(D_{2d}\) chart symmetry constrains the multiplicities and shapes of candidate neutral volumes but does not prove that any exist:

- a central neutral volume can be invariant under all eight chart maps;
- an off-center pocket on the current-axis line requires a paired pocket on the opposite side;
- pockets centered on special transverse axes or mirror planes can occur in four-member symmetry orbits; and
- generic off-symmetry pockets occur in eight-member orbits.

These are orbit sizes of symmetry-related candidates, not counts of capture volumes. A positive probe's neutral region also need not equal a negative probe's region unless a complete polarity-conjugation relation is imposed on the source and probe histories.

Exactly six distinct generic pockets cannot form one generic eight-member symmetry orbit. A natural fully decorated candidate is instead a sum of a two-member orbit and a four-member orbit. Other six-member arrangements may break part of \(D_{2d}\), use a connected multi-path volume, or exchange member labels over a cycle. The polarity decoration can reduce the spatial symmetry further even when the undecorated six-path set is symmetric.

Plainly: symmetry says how copies of a discovered pocket must be arranged. Six separate symmetric seats most naturally split into a pair plus a group of four; otherwise the captured pattern must use a different symmetry or a shared volume. Symmetry does not guarantee that any seat exists.

#### Strongest Six-Seat Seed: The Central Octahedral Axes

At the equal-scale track-center reference \(h_+=h_-=h\), the two solid tetrahedra intersect in the regular octahedron derived in Appendix A. Its six vertices are

\[
\mathcal S_{\mathrm{oct}}(h)
=
\left\{
\pm\frac{h}{\sqrt3}\mathbf e_x,
\pm\frac{h}{\sqrt3}\mathbf e_y,
\pm\frac{h}{\sqrt3}\mathbf e_z
\right\}.
\]

These are a natural **seed set** for a six-member neutral-volume search. Under the decorated F6c symmetry, the two \(x\)-axis sites form the distinguished two-member orbit and the four \(y\)- and \(z\)-axis sites form the transverse four-member orbit. More generally, the symmetry-compatible axial seed can be written

\[
\mathcal S_{2+4}(a_\parallel,a_\perp)
=
\left\{
\pm a_\parallel\mathbf e_x,
\pm a_\perp\mathbf e_y,
\pm a_\perp\mathbf e_z
\right\},
\]

with positive search radii \(a_\parallel\) and \(a_\perp\). Equality at \(h/\sqrt3\) recovers the regular central octahedron; unequal values give a tetragonally deformed six-site seed while preserving the distinguished-axis partition.

The six octahedral vertices also have an edge interpretation. Each is the crossing point, in the equal-scale compound, of one cube-face diagonal from the positive-sector tetrahedron and one from the negative-sector tetrahedron. Equivalently, the six sites index the six edges of either tetrahedron. They do not index its four faces one-to-one.

This construction is **derived reference geometry**, not a neutral-acceleration result. The Master Equation must still determine whether low-acceleration volumes occur around these points, whether their centers move away from the static octahedral values over an F6c cycle, and whether any particle-dependent polarity decoration remains captured. A decorated polarity vector can also break the full \(2+4\) spatial symmetry.

Plainly: the equal-size double tetrahedron marks six especially natural places—left and right, up and down, front and back. They are the symmetry-preferred locations for a six-pocket diagnostic, but geometry alone does not say the pockets are calm or binding.

#### Inside, Between, Or Outside The Sector Envelopes

For captured member \(a\), define

\[
r_a(T)
=
\|\mathbf Y_a(T)-\mathbf C(T)\|,
\]

and

\[
R_{\min}(T)=\min(R_+(T),R_-(T)),
\qquad
R_{\max}(T)=\max(R_+(T),R_-(T)).
\]

A point of a candidate neutral volume is instantaneously classified as

\[
\begin{cases}
r_a<R_{\min}, & \text{inside both envelopes},\\
R_{\min}<r_a<R_{\max}, & \text{between the envelopes},\\
r_a>R_{\max}, & \text{outside both envelopes}.
\end{cases}
\]

For the equal-scale octahedral seed with \(h>0\), every seed center has radius \(h/\sqrt3\), while either sector envelope has radius \(R_\sigma=\sqrt{h^2+\rho_\sigma^2}\). Hence

\[
\frac{h}{\sqrt3}<R_\sigma,
\]

so all six seed centers lie inside both sector envelopes. This is a derived location statement about the reference points, not evidence that a finite capture volume exists around any of them.

Plainly: the six octahedral search points start well inside both reference spheres. If real capture pockets form around them, their boundaries or moving centers could still cross a sphere as F6c breathes.

One connected neutral volume can straddle more than one band. A body-frame pocket can also change band labels as the two sector envelopes breathe through it. When \(R_+=R_-\), the midband has zero width and the inner/outer polarity ordering exchanges. None of the envelope surfaces is a wall.

Plainly: a capture pocket may sit inside, between, or outside the two reference spheres, or cross them. The sphere labels describe where the pocket is at one instant; they do not confine it.

#### Calculation Ladder

The investigation can begin before a retained periodic F6c branch exists, but its early products must remain diagnostic:

1. On one immutable root-complete F6c record, sample \(\mathbf A_p\) for both probe polarities over a three-dimensional body-frame domain, several probe velocities, declared probe prehistories, and enough F6c phases to resolve breathing and cadence changes.
2. Extract connected low-acceleration regions, root-valid regions, and clearance-valid regions separately, then intersect them. Measure whether each candidate's boundary acceleration is inward, outward, or phase alternating.
3. Transport the connected regions through F6c phase and identify persistent components rather than treating one favorable snapshot as a volume.
4. Construct six-seat or six-path candidates for each declared polarity vector \(\boldsymbol p\). Quotient spatial assignments by the surviving decorated F6c symmetry, while retaining distinct axial-dyad partitions.
5. Integrate one-way probe ensembles through each persistent component. Report finite-time residence and escape basins, not physical capture.
6. Evolve all six additions together, including their mutual contributions, against the same fixed F6c host history. Reject collisions, member exchange that violates the declared label contract, and apparent closure caused by omitted captured-to-captured contributions.
7. After a root-complete retained periodic or relative-periodic F6c branch is available, seek collective periodic or relative-periodic six-member histories and compute a return-map result only about paths that are actual solutions.
8. For the literal unchanged-host placement test, require full fourteen-member evolution to preserve roots, clearance, speed margin, bounded association, polarity inventory, and a nonzero basin of captured initial histories. This can establish or reject accessory association with the eight-member host; it does not decide whether F6c supplies a fermion branch or how any generation family is organized.
9. Classify every member path by its \(D_{2d}\) symmetry orbit and by the portions lying inside, between, and outside the breathing sector envelopes.

The diagnostic output of steps 1--3 is a polarity-resolved three-dimensional single-seat atlas over one declared F6c phase cycle. Its values are **measured diagnostics** of that prescribed source record. Steps 4--6 produce a symmetry-reduced six-member configuration atlas covering all seven polarity-count classes and the inequivalent site decorations inside each class. A persistent fixed-host collective basin is an **inference** about the prescribed source. A root-complete, backreacting fourteen-member history could establish accessory association with an unchanged F6c host, but not fermion identity or a generation mechanism.

The neutral-volume idea is falsified for a declared F6c branch and six-member inventory class if every root-valid low-acceleration component disappears over phase, no clearance-valid six-path assignment exists, every collective ensemble escapes or collides, or every apparent basin vanishes when literal fourteen-member backreaction is enabled. A successful single-probe pocket with no viable six-member occupation would falsify that F6c accessory-placement use while leaving the single-capture observation intact.

Plainly: the calculation order moves from one non-backreacting probe to six mutually interacting additions and then to the fully backreacting literal eight-plus-six system. That last calculation can show whether six accessories remain associated with F6c; it cannot by itself show that the result is a fermion or explain the three generations.

### Related Ideas In Mathematics, Science, And Engineering

These are comparison tools and explanatory analogies. None is an architrino-level premise and none independently validates F6c.

| Related idea | Genuine connection | Limit of the analogy |
| --- | --- | --- |
| regular simplex and spherical design | The tetrahedral directions have zero first moment and isotropic second moment, the same finite-averaging property studied in spherical-design mathematics. See Delsarte, Goethals, and Seidel, [Spherical Codes and Designs](https://doi.org/10.1007/BF03187604). | Spherical-design theory supplies geometry, not the Master Equation dynamics or retention. |
| \(D_{2d}\) point group | The eight decorated F6c chart maps match the order-eight \(D_{2d}\) operation pattern after axis relabeling. See the [Bilbao Crystallographic Server point-group table](https://www.cryst.ehu.es/cgi-bin/rep/programs/sam/point.py?num=14&sg=111). | A shared finite group does not make F6c a crystal or molecule. |
| invariant subspaces in equivariant dynamics | Symmetry-fixed subspaces of equivariant systems remain invariant under the flow. This is the general mathematical pattern used by the F6c symmetry-closure theorem. See Golubitsky and Stewart, [Dynamics and Bifurcation in Networks](https://doi.org/10.1137/1.9781611977332.ch13). | F6c has delayed causal history, so its full state is not an ordinary finite-dimensional ODE state. |
| tetrahedral molecular vibration | Tetrahedral molecules separate common breathing and symmetry-classified directional modes; methane provides a familiar example of nondegenerate and multiply degenerate vibrational families. See Jahn and Childs, [Structure of the Methane Molecule](https://doi.org/10.1038/141916a0). | Molecular modes assume molecular constituents, effective masses, and a Hamiltonian not available as F6c premises. |
| tetrahedral reaction-wheel arrays | Aerospace engineering places four wheels in a tetrahedral arrangement so combinations of internal wheel rates can control body-axis response. See NASA's [Tetrahedron Array of Reaction Wheels for Attitude Control and Energy Storage](https://ntrs.nasa.gov/citations/19860040135). | Reaction wheels use macroscopic rigid-body mechanics. F6c current is a polarity-weighted path functional, not mechanical wheel torque. |
| relative periodic orbits and Poincare maps | A shape may return only after a spatial symmetry and member permutation. This is the correct mathematical language for direct versus reflected F6c returns. | A relative return still needs complete causal roots, labeled-history interpretation, and stability; symmetry alone does not produce it. |

Plainly: academic and engineering examples show that tetrahedral balancing, symmetry-protected motion, breathing modes, and signed internal rotors are well-developed ideas. F6c combines analogous geometry with a different native law and therefore must earn its own dynamics.

## Appendix A — History Of Two Intersecting Tetrahedra

This appendix is optional background. It identifies the classical geometry formed by the F6c track centers at equal axial scale; it does not contribute a binding or acceleration mechanism.

Plainly: the historical eight-pointed star helps identify the scaffold's shape, but it does not explain the architrino motion.

### The Classical Equal-Scale Compound

Two congruent regular tetrahedra in dual position form the classical *stella octangula*, also called the compound of two tetrahedra or the stellated octahedron. In the F6c coordinate language, this object appears at the level of the **track centers** when

\[
h_+=h_-=h.
\]

The eight track centers are then

\[
\{h\hat{\mathbf n}_i\}_{i=0}^{3}
\cup
\{-h\hat{\mathbf n}_i\}_{i=0}^{3},
\]

which are the eight vertices

\[
\left(\pm\frac{h}{\sqrt 3},
      \pm\frac{h}{\sqrt 3},
      \pm\frac{h}{\sqrt 3}\right)
\]

of one cube. One tetrahedron occupies the four vertices with one sign parity; the other occupies the alternating four vertices. This gives three exact derived relationships:

- the convex hull of the union is the cube;
- the six edges of each tetrahedron together form the cube's twelve face diagonals; and
- the intersection of the two **solid** tetrahedra is the regular octahedron with vertices \((\pm h/\sqrt 3,0,0)\), \((0,\pm h/\sqrt 3,0)\), and \((0,0,\pm h/\sqrt 3)\).

The cube side, tetrahedron edge, and central-octahedron edge are respectively

\[
\frac{2h}{\sqrt 3},
\qquad
h\sqrt{\frac{8}{3}},
\qquad
h\sqrt{\frac{2}{3}}.
\]

Plainly: at equal axial scale, the two four-center tetrahedra are the familiar eight-pointed star. Its outside corners define a cube, and the region shared by the two filled tetrahedra is an octahedron.

This is the simplest of the five regular polyhedral compounds in the standard classification: two tetrahedra, five tetrahedra, ten tetrahedra, five cubes, and five octahedra. “Regular” here means that the full compound's symmetry treats vertices alike, edges alike, and faces alike; it does not merely mean that each constituent is regular. The classical identities above agree with the geometric summary in Wolfram MathWorld's [Stella Octangula](https://mathworld.wolfram.com/StellaOctangula.html), while the five-compound classification is the one catalogued by Coxeter in *Regular Polytopes*, section 3.6.

### Before Kepler

**Historical fact.** The figure predates Johannes Kepler. Luca Pacioli included it in the 1509 printed edition of *De divina proportione* under the name *octaedron elevatum*. The drawings for that work were prepared by Leonardo da Vinci. Wenzel Jamnitzer included the form in his 1568 visual study *Perspectiva corporum regularium*. The 1509 identification is also noted in a modern study in the [Archive for History of Exact Sciences](https://doi.org/10.1007/s00407-024-00331-7), and the Rijksmuseum and Smithsonian preserve catalog records for Jamnitzer's [1568 work](https://www.rijksmuseum.nl/en/collection/object/Perspectiva-corporum-regularium--ade596df0aa4d6ea1b2710563cc86661).

Plainly: Kepler did not discover the picture from nothing. Renaissance artists and geometers had already drawn it; his distinctive contribution was to name and place it in a broader theory of regular and star-shaped bodies.

### Kepler's Name And The Date Disagreement

**Historical fact with a bibliographic discrepancy.** Sources agree that the name *stella octangula* is due to Kepler, but they do not agree on whether to date that naming to 1609 or 1611. MathWorld gives 1611. Other reference accounts give 1609. The title page of Kepler's *Strena seu de Nive Sexangula* bears the date 1611, visible in the [Latin transcription](https://la.wikisource.org/wiki/Strena_seu_de_nive_sexangula). Without a primary 1609 passage that contains the name, this appendix preserves the discrepancy and uses **1611 as the publication-secure date**, not as proof that no earlier manuscript use occurred.

Plainly: “Kepler, 1611” is the safer citation for the printed record. “Kepler, 1609” should remain a reported alternate date until it is tied to a specific primary page.

### Why The Figure Belonged In Kepler's Program

The surviving works support three contexts for Kepler's interest. Calling these his “obsessions” is a useful informal summary, but the causal link to this particular name is a historical interpretation rather than a theorem.

1. **Polyhedra as cosmic architecture.** In *Mysterium Cosmographicum* (1596), Kepler nested the five Platonic solids between six planetary spheres in an attempt to explain the number and spacing of the known planets. The [Bodleian Library record](https://www.cabinet.ox.ac.uk/keplers-mysterium-cosmographicum-1596) documents the 1596 work and its model; the [Bibliotheque nationale de France](https://expositions.bnf.fr/monde-en-spheres/grand/mes_176.php) describes the solids as the structural framework between the planetary spheres. For Kepler, regular geometry therefore carried explanatory and theological weight, rather than serving only as decoration.

2. **Why unformed matter acquires regular shape.** *Strena seu de Nive Sexangula* asks why snow crystals have sixfold form. Kepler's investigation passes through packed equal spheres and the tetrahedral and octahedral gaps that such packing produces. The booklet is the origin of the sphere-packing problem now called the Kepler conjecture; Oxford's [St Edmund Hall account](https://www.seh.ox.ac.uk/blog/johannes-kepler-on-snowflakes) reproduces its packing diagrams, and the Mathematical Association of America gives a concise [bibliographic account](https://old.maa.org/press/periodicals/convergence/mathematical-treasure-kepler-and-sphere-packing).

3. **Stellation as a route beyond Euclid's five convex solids.** In Book II of *Harmonices Mundi* (1619), Kepler treated the extension of edges or faces as a generative geometric operation and recognized two regular star polyhedra. In this setting the *stella octangula* is the octahedron's only stellation and the cube's corresponding faceting. A historical timeline of this development is given in [Stellating and Facetting — a Brief History](https://www.steelpillow.com/polyhedra/StelFacet/history.html).

Plainly: the eight-pointed star sat at the meeting point of three Keplerian questions: whether regular solids organize the cosmos, how matter develops symmetry, and how regular geometry extends beyond the five convex Platonic solids.

### Relative Twist And Later Uses

Holding one regular tetrahedron fixed and applying a rotation \(Q\in SO(3)\) to the other produces a continuous three-parameter family of relative orientations. Choosing one rotation axis and one angle \(\alpha\) gives a one-parameter “twisted” slice:

\[
\{h\hat{\mathbf n}_i\}_{i=0}^{3}
\cup
\{-hQ(\alpha)\hat{\mathbf n}_i\}_{i=0}^{3}.
\]

At the dual orientation this reduces to the *stella octangula*. At a generic twist, both constituents are still regular tetrahedra, but the compound is no longer the regular two-tetrahedron compound: the eight vertices generally do not have a cube as convex hull, the common solid generally is not a regular octahedron, and the full octahedral symmetry is lost.

Plainly: twisting does not deform either tetrahedron. It changes how the two rigid tetrahedra pass through one another, and most twist angles sacrifice the special cube-and-octahedron relationships.

M. C. Escher made the **classical dual-position** compound prominent in modern art. It appears in his 1948 *Stars* and is the organizing solid of his 1949 *Double Planetoid*. The Museum Escher in The Palace describes the latter as two regular tetrahedra penetrating one another and forming one interwoven world; see its [Double Planetoid record](https://escherinhetpaleis.nl/en/about-escher/escher-today/double-planetoid). This evidence supports an Escher connection to the compound, but not the stronger claim that his depicted tetrahedra belong to a generic twisted family.

Relative twist also occurs in tensegrity and deployable-structure design, where bars and tendons use prestress to hold selected orientations. For example, NASA describes octahedral tensegrity subunits whose end planes carry a relative rotation, and UC San Diego describes a vehicle made from nested tetrahedra with controllable relative orientation; see the [NASA technical report](https://ntrs.nasa.gov/citations/20110020432) and the [UC San Diego robotics description](https://www.ucsdrobotics.org/tensegrity). These are related construction ideas, not historical continuations of Kepler's solid and not evidence for an F6c acceleration law.

### Exact Boundary Between The Classical Compound And F6c

| F6c condition or object | Relation to the historical compound |
| --- | --- |
| Track centers with \(h_+=h_-\) | Exactly the classical equal-scale *stella octangula*. |
| Track centers with \(h_+\ne h_-\) | Two concentric, oppositely oriented regular tetrahedra of unequal scale; not the classical regular compound, and their hull need not be a cube. |
| Moving architrino positions | Generally not vertices of either regular tetrahedron, even when \(h_+=h_-\), because the local track displacements deform the instantaneous member constellations. |
| F6c breathing | Changes \(h_+\) and \(h_-\) without rotating one track-center tetrahedron relative to the other. |
| A relative twist \(Q(\alpha)\) | A possible extension outside the present exact F6c chart; its invariant surface and symmetry group would require a new derivation. |
| Cube hull and octahedral intersection | Track-center reference geometry only; neither surface is a wall, binding mechanism, equilibrium certificate, or dynamical trajectory. |

Plainly: the historical star is an exact special case of the F6c **center scaffold**, not a complete description of the eight moving architrinos. F6c breathes the two tetrahedral scales; it does not currently twist the two tetrahedral frames against each other.

### Historical Claim Boundary

The coordinate identities in this appendix are **derived** directly from the F6c tetrahedral vectors. The publication dates, names, and artwork connections are **historical reports** tied to the cited records. The three-part explanation of Kepler's motivation is an **inference** from the themes of his works. The connection to tensegrity is a **comparison**, not a lineage or dynamics claim.

The historical synthesis would need revision if a primary pre-1611 Kepler text establishes the disputed 1609 naming, if the Pacioli or Jamnitzer attribution is corrected by the cited scholarship, or if an Escher source documents a generic relative-twist construction rather than the dual compound.

Plainly: the coordinate statements can be checked algebraically. The dates and attributions depend on historical sources, and the claimed motivation is an interpretation of those sources.

## Appendix B — Possible Relation To Spin-Foam Theory

This appendix is an optional advanced comparison. It asks whether some mathematical bookkeeping used for tetrahedral quantum geometry could later help describe an effective geometry recovered from F6c. None of that bookkeeping is used to derive the F6c member paths or their Master Equation acceleration.

Plainly: a reader can skip this appendix without losing the F6c argument. The comparison supplies questions for a later effective theory, not ingredients for the present substrate model.

### Governing Comparison Boundary

Spin networks and spin foams belong to loop quantum gravity, where geometry is quantized and spacetime is not treated as a fixed background. F6c belongs to a lower \(\mathbb{A}\mathbb{A}\mathbb{A}\) layer: eight architrinos move in a continuous Euclidean void under delayed path-history acceleration. Therefore spin labels, intertwiners, area spectra, Regge curvature, and spin-foam amplitudes cannot be imported as F6c premises.

The possible relation is instead **structural and reconstructive**. Spin-foam geometry supplies a developed mathematical language for:

- turning four closing vectors into a tetrahedral geometry;
- distinguishing local tetrahedra from consistently glued tetrahedra;
- storing relative-angle information between neighboring cells; and
- testing whether a discrete description is independent of a chosen triangulation.

Those are useful comparison problems for a future effective geometry derived from F6c or larger architrino assemblies. They are not evidence that F6c is a spin network, that its members carry quantum spins, or that the Euclidean void is made of spin-foam cells. This follows the corpus-level treatment of spin networks as possible effective adjacency and geometry summaries rather than substrate ontology.

Plainly: spin-foam theory may offer good bookkeeping for geometry that emerges from architrino assemblies. It does not replace the Master Equation or explain why the F6c motion exists.

### Why A Four-Valent Node Represents A Tetrahedron

In a spin network dual to a tetrahedral spatial decomposition, a four-valent node has four incident links, one for each face of a tetrahedron. Each link carries an \(\mathrm{SU}(2)\) representation label \(j_f\), called a spin. In the usual loop-quantum-gravity interpretation, \(j_f\) fixes a discrete face-area eigenvalue, up to the theory's constants and conventions.

The quantum state at the node is an **intertwiner**: an invariant tensor that combines the four link representations without leaving an unbalanced \(\mathrm{SU}(2)\) direction. For fixed spins its state space is

\[
\mathcal H_T
=
\operatorname{Inv}
\left(
V_{j_1}\otimes V_{j_2}\otimes V_{j_3}\otimes V_{j_4}
\right).
\]

Plainly: an intertwiner is the rule that combines the four incoming quantum labels into one rotation-invariant node state. It carries more information than the four labels by themselves.

Classically, associate to each face a positive area \(A_f\) and outward unit normal \(\mathbf N_f\), and define the area-normal vector

\[
\mathbf E_f=A_f\mathbf N_f.
\]

The closure constraint is

\[
\sum_{f=1}^{4}\mathbf E_f=\mathbf 0.
\]

Minkowski's polyhedron theorem says that positive face areas and outward normals that span three dimensions and satisfy closure determine a unique full-dimensional convex polyhedron up to translation. With four nondegenerate faces, that polyhedron is a tetrahedron. The qualification matters: four arbitrary vectors that sum to zero do not define a unique tetrahedron if their directions are coplanar, repeated, or otherwise degenerate.

Plainly: multiply each face's size by the direction in which that face points. If the resulting four arrows balance and genuinely span three dimensions, they reconstruct one convex tetrahedron, apart from where it is placed.

The space of closed area-normal polygons with the areas fixed, modulo one common spatial rotation, is the Kapovich–Millson shape phase space:

\[
\mathcal P_{A_1\ldots A_4}
=
\left\{
(\mathbf E_1,\ldots,\mathbf E_4)
\;\middle|\;
\|\mathbf E_f\|=A_f,
\ \sum_f\mathbf E_f=0
\right\}
\big/\mathrm{SO}(3).
\]

For generic fixed areas this tetrahedral shape space has two dimensions. One may use the length of a diagonal of the closed vector polygon and a conjugate bending angle as coordinates. Quantizing this phase space yields the intertwiner space. Barbieri introduced the quantum-tetrahedron construction; Baez and Barrett developed its geometric quantization; and Bianchi, Donà, and Speziale generalized the result to arbitrary convex polyhedra. See [Barbieri](https://arxiv.org/abs/gr-qc/9707010), [Baez and Barrett](https://arxiv.org/abs/gr-qc/9903060), and [Bianchi, Donà, and Speziale](https://arxiv.org/abs/1009.3402).

Plainly: the four spin labels set four face sizes, while the intertwiner stores the remaining ways those faces can close into a three-dimensional shape. A tetrahedron is not obtained from “four” alone; closure and nondegeneracy turn the algebra into geometry.

### F6c Face Data Used By This Comparison

The main body derives the complete F6c-native geometry in [Tetrahedral Faces And Orbit-Area Channels](#tetrahedral-faces-and-orbit-area-channels). For each noncollapsed track-center sector, the four face area-normal vectors satisfy

\[
\sum_{i=0}^{3}A_\sigma\mathbf N_{i\sigma}=\mathbf0,
\qquad
A_\sigma=\frac{2h_\sigma^2}{\sqrt3},
\qquad
\mathbf N_{i\sigma}=-\sigma\hat{\mathbf n}_i.
\]

The orbit around the axis dual to face \(i\) supplies the exact kinematic channel

\[
\boldsymbol\Lambda_{i\sigma}
=
\sigma s_i\rho_\sigma^2\dot\theta_\sigma
\hat{\mathbf n}_i,
\qquad
q_{i\sigma}
=
\mathbf N_{i\sigma}\mathbin{\cdot}
\boldsymbol\Lambda_{i\sigma}
=
-s_i\rho_\sigma^2\dot\theta_\sigma.
\]

Plainly: the F6c calculation establishes both pieces of face data used here: a balanced area-and-direction vector and a signed measure of the orbit around the axis perpendicular to that face.

The area-normal equation is a genuine Minkowski closure relation for each regular track-center tetrahedron. The orbit-to-face expression is a separate derived kinematic identity. Together they provide a stronger comparison object than vertex counting alone, but they do not quantize either the face area or the circulation.

Corresponding polarity-sector channels satisfy

\[
q_{i+}=q_{i-},
\qquad
\boldsymbol\Lambda_{i-}=-\boldsymbol\Lambda_{i+}
\]

when \(\rho_+^2\dot\theta_+=\rho_-^2\dot\theta_-\). If also \(h_+=h_-\), the corresponding faces have equal areas and opposite area-normal vectors. The ideal scaffold then has four abstract matched face pairs. The faces remain spatially separated and are not shared boundary triangles.

Plainly: F6c can reproduce the algebra of equal magnitudes viewed with opposite orientations from two sides. It still does not reproduce the topology of two tetrahedra glued on one face.

This comparison has strict limits:

- \(A_\sigma\) and \(|q_{i\sigma}|\) are continuous F6c quantities, not measured quantum eigenvalues.
- A spin-network label \(j_f\) is a nonnegative representation magnitude, whereas \(q_{i\sigma}\) is signed. Its sign belongs with circulation orientation, not directly with \(j_f\).
- Neither \(|q_{i\sigma}|\) nor a function of it has been shown to be invariant, discrete, or related to \(A_\sigma\) by a derived action rule.
- The instantaneous moving-member faces generally depart from the regular scaffold faces, as quantified by the main-body member-face construction.
- No F6c variable has been shown to inhabit an intertwiner Hilbert space or a Kapovich–Millson quantum state space.

The defensible research hypothesis is not \(j_f=q_{i\sigma}\). It is that a dimensionless magnitude derived from the complete F6c face-channel history could become a \(j_f\)-like effective label, while \(s_i\) and the face normal retain orientation information. No loop-quantum-gravity area spectrum or quantum of action may be inserted to complete that map.

The F6c face closure and orbit channel are **derived geometry and kinematics**. Treating corresponding sector faces as two ends of a link is a **structural comparison**. Identifying any function of \(|q_{i\sigma}|\) with an effective spin label is a **guess** whose proof burden is a retained complete-history derivation. The guess fails if retained histories do not produce a body-frame-invariant face magnitude, if the magnitude has no stable relation to effective face area, or if the complete \(2\pi/4\pi\) transformation record cannot be reconstructed from the face-channel data.

If a retained complete history establishes those properties, the promotion target is the corpus treatment of [Angular Momentum And Spin](../../../content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md). Until then the spin-label interpretation remains in this priority-level comparison.

### How Six Captured Orbits Could Enter A Face Calculation

The six-seat seed in the main body is naturally edge-indexed, not face-indexed. For one tetrahedral sector, label an edge by the unordered vertex pair \(e=\{i,j\}\). There are exactly six such pairs. A captured member associated with that edge has body-frame path \(\boldsymbol\xi_e(T)\) and the native orbital area-rate vector

\[
\boldsymbol\lambda_e^{\mathrm{cap}}(T)
=
\boldsymbol\xi_e(T)
\mathbin{\times}
\dot{\boldsymbol\xi}_e(T).
\]

For tetrahedral face \(f\), let \(\mathbf N_f(T)\) be its declared outward unit normal. The edge-orbit projection into that face channel is

\[
q_{ef}^{\mathrm{cap}}(T)
=
\mathbf N_f(T)
\mathbin{\cdot}
\boldsymbol\lambda_e^{\mathrm{cap}}(T),
\qquad
e\subset\partial f,
\]

and a polarity-weighted three-edge face readout can be defined diagnostically as

\[
Q_f^{\mathrm{cap}}(T)
=
\sum_{e\subset\partial f}p_e q_{ef}^{\mathrm{cap}}(T).
\]

These expressions use orbital circulation around the assembly center; they do not assign intrinsic spin to an architrino. They are kinematic definitions on a declared six-path record. A physical face observable would additionally need a retained body-frame history, a derived normalization, and a proof that the result is invariant under allowed member relabelings and complete-history returns.

Plainly: a tetrahedron has six edges and four faces. Put one captured orbit on each edge channel, then each face reads the three orbit channels around its boundary. That creates a concrete face calculation without pretending that six captured members are four spin-network links.

There are two distinct possible outputs:

1. **Geometric face reconstruction.** The actual instantaneous positions of the host and captured members may deform an effective cell. Its face edge lengths, areas, normals, and closure are calculated directly from those positions.
2. **Circulation-facing effective label.** A complete-history functional built from \(Q_f^{\mathrm{cap}}\), the host channel \(q_{i\sigma}\), and the face geometry may supply a discrete or recurrent effective label after the dynamics is solved.

The first route is ordinary derived geometry. The second is a research guess. Neither route licenses setting a spin-foam label \(j_f\) equal to one captured architrino's orbital rate. In particular, the six edge channels couple the four face readouts because every tetrahedral edge belongs to two faces. Closure, symmetry, and shared-edge consistency must be checked rather than fitting each face independently.

The particle-dependent polarity inventory matters because it changes the signed face readouts and, more importantly, changes the delayed accelerations that determine whether the six paths exist. Two spatially identical seat patterns with different polarity vectors are therefore different dynamical problems. The seven inventory-count classes are only the first quotient; axis partitions and inequivalent spatial decorations remain to be resolved.

Plainly: the polarity mixture affects both the answer read from each face and whether the six-orbit structure survives long enough to have a meaningful answer. Counting pluses and minuses is necessary bookkeeping, not the full calculation.

### Why Two Glued Tetrahedra Matter

In the dual geometric picture of a spin network, a link joining two four-valent nodes represents a triangular face shared by two tetrahedra. The single spin on that link gives the same face area when read from either node. The two tetrahedra nevertheless reconstruct their local shapes independently. Equal area does not determine a triangle's three edge lengths, so the two reconstructions can assign different intrinsic shapes to the nominally shared triangle.

This is the central local issue in **twisted geometries**. A link carries:

- one common area;
- one face normal in the frame of each adjacent polyhedron; and
- an additional twist variable related, after the appropriate geometric constraints, to extrinsic curvature.

The local polyhedra may each be well defined while failing to glue into one continuous piecewise-flat metric. **Shape-matching constraints** require the shared triangle's full two-dimensional geometry—not only its area—to agree from both sides. Imposing those additional relations selects Regge geometries from the larger twisted-geometry phase space. The relevant primary sources are [Freidel and Speziale](https://arxiv.org/abs/1001.2748) and the area-angle formulation of [Dittrich and Speziale](https://arxiv.org/abs/0802.0864).

Plainly: two surveyors can agree that a triangular property has one acre while disagreeing about its three boundary lengths. Spin-network kinematics ensures the acreage; shape matching is the extra agreement needed for one actual triangle.

The spin-foam twist variable must not be confused with either:

- the relative rigid rotation \(Q(\alpha)\) of the interpenetrating tetrahedra in Appendix A; or
- an F6c phase \(\theta_{i\sigma}\) around a member's local circular track.

The spin-foam quantity is a canonical link variable paired with the face area. Only after geometric and connection constraints does it acquire the standard extrinsic-curvature interpretation. No such canonical pairing or curvature map has been derived for F6c.

### Gluing Versus Interpenetration

This is the decisive geometric caveat. Spin-foam tetrahedra **tile** or glue: two neighboring tetrahedra meet on one boundary triangle and occupy opposite sides of it. The two F6c polarity-sector tetrahedra are co-centered and interpenetrating. They share an interior volume region when equal-scale, not a boundary face.

At \(h_+=h_-\), the two F6c track-center tetrahedra have equal face areas and congruent equilateral face shapes. A chosen abstract pairing of their faces would therefore pass area and intrinsic-shape matching. But those paired faces are not the same triangle in the Euclidean void: they lie in different planes and do not define a glued interface. For \(h_+\ne h_-\) even the corresponding track-center face areas differ.

Plainly: equal-scale F6c can imitate the *data equality* of two matching regular faces, but it does not supply the shared face itself. The classical *stella octangula* and a two-tetrahedron spin-foam cell are different topological constructions.

### Dihedral Angles And Regge Curvature

Regge calculus approximates geometry with flat simplices and places curvature on codimension-two hinges. In four dimensions the hinges are triangles. For an interior triangle \(t\), the deficit angle is

\[
\epsilon_t
=
2\pi
-
\sum_{s\supset t}\Theta_t^{(s)},
\]

where \(s\) runs over the 4-simplices meeting at \(t\) and \(\Theta_t^{(s)}\) is the four-dimensional dihedral angle between the two tetrahedral boundary cells of \(s\) that meet on \(t\).

In three dimensions the hinges are edges, not triangles:

\[
\epsilon_e
=
2\pi
-
\sum_{\tau\supset e}\theta_e^{(\tau)},
\]

where \(\theta_e^{(\tau)}\) is the dihedral angle between two triangular faces inside tetrahedron \(\tau\). Thus “the angle between two tetrahedra” identifies a real primitive ingredient in four dimensions, but curvature is the complete deficit assembled from many such angles, not any one angle. It is not the literal three-dimensional formula.

Plainly: flat building blocks can assemble into a curved whole because the angles around an internal hinge fail to complete one full turn. The relevant hinge is a triangle in 4D and an edge in 3D.

F6c currently has Euclidean angles among track-center vectors and local track frames, but no derived effective metric, simplicial complex, hinge, or deficit angle. Calling any F6c inter-sector angle “curvature” would therefore skip the required observer-geometry reconstruction.

### The Schläfli Identity

For a flat four-simplex, the Schläfli identity takes the form

\[
\sum_{t\subset s}
A_t\,d\Theta_t^{(s)}=0.
\]

Its three-dimensional tetrahedral counterpart is

\[
\sum_{e\subset\tau}
\ell_e\,d\theta_e^{(\tau)}=0.
\]

These identities say that the simplex's dihedral-angle variations are not independent. When the Regge action is varied, the terms containing variations of the dihedral angles cancel simplex by simplex, leaving the variations of the hinge measures to carry the equations of motion. Haggard, Hedeman, Kur, and Littlejohn gave a symplectic and semiclassical interpretation for the special case of flat three-dimensional tetrahedra in [Symplectic and Semiclassical Aspects of the Schläfli Identity](https://arxiv.org/abs/1409.7117).

Plainly: changing the edge lengths changes all the angles together. The Schläfli identity is the exact bookkeeping rule that prevents those linked angle changes from being counted as independent variations.

F6c has no derived Schläfli identity. A meaningful analogue requires a derived assembly action and a set of effective hinge measures and dihedral variables. The six-coordinate invariant-surface theorem does not provide those objects.

### The Pachner 2–3 Move And The \(6j\) Identity

In a three-dimensional triangulation, two tetrahedra glued on one triangular face fill a triangular bipyramid. The Pachner 2–3 move removes that internal face and inserts the edge joining the two opposite vertices, producing three tetrahedra around the new internal edge. The boundary of the bipyramid stays the same:

\[
2\text{ tetrahedra sharing a face}
\quad\longleftrightarrow\quad
3\text{ tetrahedra sharing an edge}.
\]

In the Ponzano–Regge state sum, one \(6j\) symbol is associated with each tetrahedron. The Biedenharn–Elliott, or pentagon, identity equates the product of the two tetrahedral amplitudes with a weighted sum of products of the three amplitudes on the other triangulation. It is therefore the algebraic statement of the 2–3 move.

This does not by itself make every naive Ponzano–Regge sum finite or fully triangulation-independent. The complementary 1–4 move and divergent sums require regularization or additional hypotheses. Barrett and Naish-Guzman's [Ponzano–Regge analysis](https://arxiv.org/abs/0803.3319) proves triangulation independence for its defined regularized cases and explicitly separates the valid 3–2 identity from the regularization problem.

Plainly: the 2–3 move is a consistency check saying that two different ways of filling the same boundary give the same amplitude. The pentagon identity is the exact algebra that makes that local check work; it is not a general proof that every unregulated state sum is well defined.

F6c has no triangulation, \(6j\) symbol, state sum, or alternative two-versus- three decomposition of one boundary. The Pachner move is therefore a possible comparison for a future refinement test on a network of effective assembly cells, not a present identity of the eight-member geometry.

### Where Four-Dimensional Spin Foams Enter

The 2–3 move above belongs to the three-dimensional Ponzano–Regge model. In a four-dimensional simplicial spin foam, the elementary simplex is a 4-simplex. Its boundary contains five tetrahedra and ten triangular faces. A boundary spin network assigns one spin to each triangle and one four-valent intertwiner to each tetrahedron. A spin-foam vertex amplitude then couples the five tetrahedral states.

The \(\mathrm{SU}(2)\) \(15j\) symbol packages this boundary data in the four-dimensional topological model. Barrett, Fairbairn, and Hellmann showed that, for appropriate nondegenerate boundary data and in the large-spin regime, its phase is governed by the Regge action of a Euclidean 4-simplex; see [Quantum gravity asymptotics from the SU(2) 15j symbol](https://arxiv.org/abs/0912.4907). Perez's [spin-foam review](https://arxiv.org/abs/gr-qc/0301113) explains how such state sums serve as histories between spin-network boundary states while also documenting the unresolved four-dimensional issues.

Plainly: a three-dimensional model assigns an amplitude to each tetrahedron. A four-dimensional model treats tetrahedra as boundary cells of a larger 4-simplex event. Mixing those two uses of “tetrahedron” hides an important change of dimension.

### Comparison Map

| Spin-network or spin-foam object | Possible F6c comparison | Current status |
| --- | --- | --- |
| Four-valent node dual to a tetrahedron | One four-member polarity-sector track-center tetrahedron | Structural analogy; the F6c sector is a physical-coordinate scaffold, not a graph node. |
| Face area-normal closure | Equal-area normal closure derived above from \(\sum_i\hat{\mathbf n}_i=0\) | Exact for each noncollapsed regular track-center tetrahedron. |
| Spin \(j_f\) setting a face-area eigenvalue | Continuous scaffold area \(A_\sigma=2h_\sigma^2/\sqrt3\) | No quantization rule or \(j_f\) identification. |
| Face-normal orbital channel | \(q_{i\sigma}=-s_i\rho_\sigma^2\dot\theta_\sigma\) from the orbit about the axis dual to face \(i\) | Exact F6c kinematics; signed and continuous, not a derived spin label. |
| Six captured orbital channels | One candidate channel on each tetrahedral edge, with three edge projections combined around each face | Kinematic construction on a declared captured history; no retained six-member branch or effective spin label. |
| Opposite link-end orientations with one shared magnitude | Corresponding sector orbit vectors are opposite and their face projections match when \(\rho_+^2\dot\theta_+=\rho_-^2\dot\theta_-\) | Exact conditional matching of abstract face channels; the faces are not glued. |
| Intertwiner storing tetrahedral shape | F6c radial, axial, and phase variables determine member geometry | No Hilbert-space, invariant-tensor, or quantization correspondence. |
| Link dual to one shared triangular face | A possible declared interface between two effective assembly cells | No shared face exists between the two interpenetrating F6c sectors. |
| Area matching across a link | \(h_+=h_-\) gives equal regular scaffold-face areas | Necessary-looking numerical equality only; it does not create a glued face. |
| Shape matching | Compare the full intrinsic geometry of a declared face from each side | Automatically congruent for abstract equal-scale regular faces, but no physical face pairing is presently defined. |
| Twist angle related to extrinsic curvature | Possible future action-conjugate inter-assembly angle | Neither Appendix A's rigid twist nor an F6c track phase is this variable. |
| Regge deficit angle | Possible effective curvature observable after metric reconstruction | No present F6c hinge or curvature variable. |
| Schläfli identity | Possible variational identity for a derived effective simplex action | No present analogue. |
| \(6j\) pentagon identity and Pachner 2–3 move | Possible refinement check for a future network of assembly cells | No present state-sum or triangulation identity. |
| Spin-foam sum over labeled histories | F6c supplies deterministic delayed evolution for a declared complete causal-history record | Different mathematical objects; no amplitude correspondence. |

Plainly: only the F6c scaffold closure and face-channel kinematics in this table are derived here. Every spin-network identification, quantization rule, shared-face interpretation, curvature variable, or amplitude correspondence remains absent or explicitly proposed.

### The Most Productive Research Direction

The closest defensible relation is not “F6c is a spin foam.” It is that spin-foam geometry exposes an ordered set of consistency questions that a tetrahedral effective geometry must answer:

1. **Local reconstruction:** compute face areas, normals, edge lengths, and volume for each instantaneous F6c member tetrahedron, not only its regular track-center scaffold.
2. **Orbit-to-face history:** record \(\mathbf a_{i\sigma}\), \(\boldsymbol\Lambda_{i\sigma}\), and \(q_{i\sigma}\) along one retained complete history; test cross-sector matching, body-frame invariance, and whether scaffold-to-member face deformation remains bounded.
3. **Interface declaration:** identify whether larger retained assemblies have any actual shared boundary data. Without an interface, gluing language has no referent.
4. **Six-member edge-to-face reconstruction:** for every declared polarity inventory, test the octahedral \(2+4\) seed and other symmetry-inequivalent six-path assignments; calculate \(q_{ef}^{\mathrm{cap}}\), \(Q_f^{\mathrm{cap}}\), face deformation, and complete-history return data without assigning a spin label.
5. **Matching:** if an interface exists, test area agreement first and full intrinsic shape agreement second.
6. **Conjugate angle:** derive from an action whether any relative phase or orientation is canonically paired with the interface measure. Do not name it extrinsic curvature before that derivation.
7. **Effective curvature:** reconstruct an observer-level metric and hinge geometry before defining deficit angles.
8. **Refinement:** only for a network of effective cells, ask whether alternate decompositions preserve a derived amplitude or observable.

Plainly: the spin-foam literature suggests what must be checked between tetrahedral pieces. F6c currently establishes the first scaffold-level closure fact and none of the later gluing, curvature, quantization, or refinement steps. The orbit-to-face map adds exact kinematic data between scaffold closure and any later interface claim. The captured edge-to-face construction adds a specific six-member calculation target, but neither map by itself supplies gluing, quantization, or a spin transformation law.

### Spin-Foam Claim Boundary

The F6c area-normal closure calculation is **derived geometry**, and the orbit-to-face channel is **derived kinematics**. The captured edge-to-face readout is a **kinematic definition on a proposed six-path record**, not a measured or retained branch result. The descriptions of intertwiners, twisted geometries, Regge calculus, Schläfli variation, Pachner moves, and \(6j\)/\(15j\) asymptotics are **external mathematical and model-specific results** documented by the cited primary literature. The proposed F6c correspondences are **comparisons or research targets**, not derived identifications.

This appendix would be falsified or materially revised by any of the following:

- an error in the F6c face-area or outward-normal calculation;
- an error in the exact orbit-area-rate or face-projection calculation;
- an inconsistency in the proposed captured edge-to-face projection or its shared-edge bookkeeping;
- a retained F6c or multi-assembly construction that supplies a genuine shared face and changes the current interpenetration-only boundary;
- an action derivation identifying an F6c variable with a canonical area-angle pair; or
- a proof that a proposed effective assembly network does or does not satisfy a declared local refinement identity.

Plainly: the comparison remains useful only while its boundary stays visible. A matching algebraic pattern is not yet a shared physical object, a quantum label, or an emergent spacetime geometry.

## Appendix C — Consolidated Reference Answers

| Question | Current answer |
| --- | --- |
| What does six-coordinate mean? | Six scalar configuration values determine all 24 Cartesian member-position components on F6c. Rates and causal history remain additional state information. |
| What does exact six-coordinate mean? | The member map, its cancellations, and conditional Master Equation tangency are algebraic symmetry results, not a best-fit six-parameter approximation. It does not mean retained or stable. |
| Why call the sector locus a spherical envelope? | All four complete tracks in one sector have the same center and orbit-envelope radius \(R_{\mathrm{orbit},\sigma}=\sqrt{h_\sigma^2+\rho_\sigma^2}\). |
| Which virtual sphere does one sector define? | Two concentric geometric spheres must be distinguished: the track-center tetrahedron's circumsphere has radius \(R_{\mathrm{center},\sigma}=|h_\sigma|\), while the complete circular tracks lie on the orbit spherical envelope of radius \(R_{\mathrm{orbit},\sigma}=\sqrt{h_\sigma^2+\rho_\sigma^2}\). They coincide only when \(\rho_\sigma=0\). |
| Do the architrino orbit paths determine the orbit spherical envelope? | Two nondegenerate complete F6c tracks with different tetrahedral axes determine its unique common center and radius; four tracks do so redundantly. Four simultaneous member positions determine it uniquely only when they are noncoplanar. Degenerate point data needs the F6c chart, and a breathing history determines a time-indexed family rather than one fixed sphere. |
| Does a common envelope radius guarantee member clearance? | No. Exact pair distances depend separately on \(h_\sigma\), \(\rho_\sigma\), and the phases. One negative-sector edge pair coincides exactly at \(h_-=\rho_-/\sqrt2\), \(\theta_-=\pi/6\pmod{2\pi}\), even though its envelope radius is nonzero. |
| Does either tetrahedron stay rigid and regular? | The four track centers remain a regular tetrahedron but breathe with \(h_\sigma\). The four moving members generally form a nonregular, deforming tetrahedral constellation. |
| Do the positive- and negative-sector orbit spheres have one coincident center? | Yes in the internal chart. Each sector's track-center and orbit spheres also share that center. A common kinematic translation preserves coincidence, but a translating EOM branch is an additional dynamical problem. |
| Is the eight-member object one assembly? | It is one assembly candidate and one top-level record. Binding, recurrence, retention, and stability are not established. |
| What is a polarity sector? | One of two four-member groups: four positrinos or four electrinos. |
| Are module partners antipodal through the center? | Not generically. Their track centers are opposite, but the moving members are antipodal only under special equal-scale and phase-opposition conditions. |
| What is two-versus-two circulation? | Inside each polarity sector, two modules carry one fixed circulation orientation and two carry the other. The polarity factor reverses the coordinate orientation between sectors, although independent cadence reversal means actual counterrotation is not guaranteed at every time. |
| Do the three opposite-edge-pair histories reproduce the intended three-row nested-binary ledger? | They reproduce its rank-three geometric function exactly when their circulation rows are nonzero: the three symmetry-adapted rows are mutually orthogonal. They do not yet reproduce a retained ledger because the rows use shared same-sector edge relations rather than three disjoint opposite-polarity binaries, no action/root ledger has been assigned to them, some stored histories cross a row-zero boundary, and no F6c history has returned as a retained branch. |
| What is the body-fixed current axis? | The body-frame line on which the polarity-weighted internal motion moment lies for the chosen circulation partition. “Nonzero” means incomplete cancellation of the signed internal-motion contributions. It does not establish transported electric charge, an electric current, a magnetic field, or a spin axis. |
| What are tetrahedral axes? | The four center-to-vertex directions of a regular tetrahedron, used as body-frame reference directions and local track normals. |
| What are the invariants? | The complete current list appears in [Exact Invariants And Identities](#exact-invariants-and-identities); sizes, speeds, current magnitude, binding, and recurrence are specifically not included. |
| What are the symmetries? | The undecorated axes have 24 tetrahedral maps; exactly eight preserve the decorated F6c chart, with four proper and four improper maps, plus a separate global polarity-conjugation comparison. |
| Does a shape return always return the current channel? | No. Under a reflected relative return, scalar shape has order one while cadence and fixed-frame axial current have order two. The current reverses after one relative period and is restored after two. |
| Does F6c support Lorentz mathematics? | It supports a well-defined observer-level recovery test using a translating branch, complete clock return, cycle-averaged longitudinal/transverse shape tensor, and signal-isotropy residuals. It does not have native Lorentz boosts, and no F6c Lorentz recovery has been measured or proved. |
| How does F6c describe time? | Absolute time \(T\) parameterizes every native path and causal root. A retained complete return could supply a material clock readout \(\tau_{\mathrm{F6c}}\), synchronized effective observer time is reconstructed from clocks and signals, and the strong-field ratio \(g_H^{\mathrm{F6c}}\) separates generated ticks from ticks received outside. No F6c spatial coordinate is itself time. |
| What happens to F6c at an event horizon? | No outcome has been computed. The effective event horizon is a global escape boundary, while the native horizon interface is the local condition \(F_H=0\). An admitted incoming F6c record may remain on the strict chart, deform while preserving eight-member identity, or reconfigure; the chart residual, causal-root, clearance, speed, provenance, and ledger rows decide among those outcomes. |
| What happens to F6c inside a black hole, if there is an inside? | Absolute time and Euclidean positions remain meaningful for any admitted continuation, but an interior physical-observer clock is not assigned unless a clock-and-ruler channel survives. Strict F6c persistence, deformed eight-member persistence, and F6c-destroying reconfiguration are separate candidate outcomes; none is established. |
| Does F6c prevent a singularity? | No. Uniformly scaling \(h_\sigma\) and \(\rho_\sigma\) scales every pair distance to zero, so tetrahedral symmetry and spherical envelopes provide no hard core or outward acceleration. Singularity avoidance would have to come from root-complete delayed self-hit and Noether-sea acceleration, finite horizon-interface continuation, and closed compact-region ledgers. |
| Do the three even sector coordinates establish three generations? | No. They define a three-dimensional candidate reduced response space. Three actual modes require a closed differentiable return map on that space; identifying those modes with generations would require additional native dynamics and observer-level recovery. |
| How could F6c implement fermion generations? | Keep the fermion's charge and representation realization fixed while ordinary dynamics selects exactly three isolated retained core modes or basins with different mass-facing, recurrence, lifetime, and overlap records. The F6 one-versus-three three-port orbit is not an exact F6c mechanism because F6c uses the two-versus-two \(D_{2d}\) decoration. |
| How could F6c implement a photon? | Most naturally as an emitter or receiver geometry that launches a neutral propagating phase record with exactly two transverse responses, no free longitudinal response, a helicity ledger, complete source/capture provenance, and no retained rest branch. An intact eight-member photon is only an alternative search candidate. |
| How could F6c implement a neutrino? | As an undecorated neutral eight-member continuation near the photon lock, with a small polarity-differential mismatch carrying weak exposure and exactly three coherent internal propagation modes with two relative phase gaps. This is an alternative to, or precursor of, the current near-planar neutrino candidate. |
| How could F6c participate in a gravitational wave? | Either retained F6c-like Noether-sea histories collectively carry a causal trace-free deformation, or F6c assemblies act only as clocks, rulers, sources, and receivers for another sea carrier. A two-cell transfer must produce a transverse-trace-free response before either role is assigned. |
| What selects six-coordinate F6c over a shared three-coordinate F6b history? | The F6b fixed-circle tangent leaves \(68.408\%\) of the measured acceleration norm outside the chart on the declared record, while separate axial, radial, and cadence histories for the two polarity sectors reduce the measured normal fraction to \(2.31\times10^{-15}\); exact order-four symmetry then proves conditional tangency of that six-coordinate surface. |
| Are there neutral volumes that could capture six architrinos? | None have been calculated or proved. The strongest seed is the equal-scale central octahedron's six axial vertices: a symmetry-natural pair plus four transverse sites, all inside both reference spheres. The F6c accessory-placement target is a collective basin with a declared polarity vector, not six independent point equilibria. Backreacting fourteen-member evolution tests literal association with an unchanged $4{:}4$ F6c host; it does not establish fermion identity or a generation mechanism. |
| Why would F6c survive only with six charge-facing additions? | No current result says it would. Six is independently motivated by the observer-level fermion charge ladder and by the central octahedron's six symmetry-natural sites. Exact-six survival requires a retained six-addition basin and exclusion of every admitted non-six count under fully backreacting evolution. |

Plainly: the table is a compact review of the core chain. Its exact statements come from the member map and symmetry; its assembly, capture, and electromagnetic interpretations remain open.

## Local Provenance

- The owning derivation and diagnostic record is [Inferring Braid Requirements](inferring-braid-requirements.md#seed-f6c--polarity-resolved-breathing-tetrahedron).
- Dated campaign changes are recorded in [work-log.md](work-log.md).
- Exact return-group enumeration is implemented by [f6c-identity-return-group.mjs](../../../scripts/mapping-electromagnetism/f6c-identity-return-group.mjs).
- EOM coordinate reconstruction is implemented by [f6c-eom-coordinate-analysis.mjs](../../../scripts/mapping-electromagnetism/f6c-eom-coordinate-analysis.mjs).
- Exact constraint, pair-corridor, and speed/current-capacity calculations are implemented by [f6c-linear-constraint-geometry.mjs](../../../scripts/mapping-electromagnetism/f6c-linear-constraint-geometry.mjs), [f6c-current-transport.mjs](../../../scripts/mapping-electromagnetism/f6c-current-transport.mjs), and [f6c-release-current-capacity-ranking.mjs](../../../scripts/mapping-electromagnetism/f6c-release-current-capacity-ranking.mjs).
- Whole-cycle and return-record diagnostics are implemented by [f6c-harmonic-cycle-residual.mjs](../../../scripts/mapping-electromagnetism/f6c-harmonic-cycle-residual.mjs), [f6c-return-record-ranking.mjs](../../../scripts/mapping-electromagnetism/f6c-return-record-ranking.mjs), and [f6c-nonlinear-return-map-search.mjs](../../../scripts/mapping-electromagnetism/f6c-nonlinear-return-map-search.mjs).
- Symmetry-reduced response and handoff diagnostics are implemented by [f6c-mode-conversion-analysis.mjs](../../../scripts/mapping-electromagnetism/f6c-mode-conversion-analysis.mjs) and [f6c-current-handoff-local-screen.mjs](../../../scripts/mapping-electromagnetism/f6c-current-handoff-local-screen.mjs).
- The canonical strong-field time, horizon-interface, and finite-interior boundaries are defined in [Singularity Resolution](../../../content/markdown/aaa/spacetime/singularity-resolution.md) and [Black Holes](../../../content/markdown/aaa/spacetime/black-holes.md).
- The live same-carrier horizon and interior equation requirements are maintained in [EQ-07C](../mapping-equations/eq-07c-black-hole-horizon-interface-noether-braid-map.md).

Closure goal: find one root-complete nontrivial F6c return, then test whether its response space supports a positive-width retained basin, an exactly-three mode or branch exhaustion result, a lawful two-transverse-channel propagating continuation, or an admitted strong-field continuation, and only then assign a fermion, photon, neutrino, gravitational-wave, effective-field, horizon-probe, or maximum-curvature role.
