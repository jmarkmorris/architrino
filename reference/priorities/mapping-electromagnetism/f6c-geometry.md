# F6c Geometry

## Document Status

- Kind: focused priority explanation and geometry reference
- Status: active companion to
  [Inferring Braid Requirements](inferring-braid-requirements.md)
- Created: 2026-08-23
- Claim level: exact prescribed geometry and symmetry results, measured bounded
  EOM-solver diagnostics, and explicitly marked inference or speculation
- Scope: F6c construction, coordinates, envelopes, sectors, symmetries,
  invariants, current axis, assembly status, external analogies, and the open
  question of collective six-architrino capture volumes
- Exclusions: no retained-braid, stability, particle-identity, effective-charge,
  effective-mass, spin, or magnetic-field claim

## Short Description

F6c is an eight-architrino candidate geometry organized by four tetrahedral
body axes. Each axis carries one positrino track and one electrino track. The
four positrino tracks share one axial scale, one transverse track radius, and
one phase history; the four electrino tracks share a second set of those three
quantities. The result is a six-coordinate configuration surface.

F6c is not yet a retained braid. It is a symmetry-protected family of complete
eight-member histories on which the Master Equation can be evaluated and from
which a retained branch may be sought.

Plainly: F6c is a precisely defined six-knob motion template for eight
architrinos. It is a candidate architecture, not yet a demonstrated particle
or stable assembly.

## Vocabulary

| Term | Meaning in F6c |
| --- | --- |
| assembly center | The common origin of the two polarity-sector centroids in the internal F6c chart. |
| tetrahedral axis | One of four unit directions from the center toward the vertices of a regular tetrahedron. It is a reference direction, not a material rod. |
| module | The positrino track and electrino track associated with one tetrahedral axis. |
| polarity sector | All members with one primitive polarity. F6c has a four-positrino sector and a four-electrino sector. |
| axial scale \(h_\sigma\) | The distance from the assembly center to the center plane of the tracks in polarity sector \(\sigma\). |
| transverse radius \(\rho_\sigma\) | The radius of each circular track about its local tetrahedral axis in sector \(\sigma\). |
| phase \(\theta_\sigma\) | The shared progress coordinate around the four tracks in sector \(\sigma\), after fixed module signs and phase offsets are applied. |
| cadence \(\dot\theta_\sigma\) | The phase rate. It may change sign, so circulation can slow, stop, or reverse. |
| spherical envelope | The sphere on which every member track of one polarity sector lies at a declared instant. It is a geometric surface, not a material shell. |
| current axis | The body-frame line on which the polarity-weighted internal current moment lies. It is not a translation direction and is not yet a proven spin axis. |

Plainly: a sector is a four-member polarity group, a module is one axis-associated
positrino/electrino track pair, and the word envelope describes where the paths
fit geometrically rather than a substance surrounding them.

## Tetrahedral Frame

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

The angle between any two axes is
\(\arccos(-1/3)\simeq109.47^\circ\). These are the standard directions from the
center of a regular tetrahedron to its four vertices. Their zero sum provides
first-moment cancellation, while their dyadic sum provides an isotropic
second-moment identity.

Plainly: the four arrows are evenly balanced in three dimensions. No arrow is
the preferred one before the circulation decoration is added.

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

Both are perpendicular to \(\hat{\mathbf n}_i\). The track plane for module \(i\)
is therefore perpendicular to its tetrahedral axis.

Plainly: each tetrahedral arrow has a circular clock face mounted at right
angles to it. The architrino moves around that local clock face; it does not
move along the arrow itself.

## Exact Member Map

Let \(\sigma=+1\) label the positrino sector and \(\sigma=-1\) label the electrino
sector. The fixed circulation signs and phase offsets are

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

Thus the four positrino track centers form a regular tetrahedron and the four
electrino track centers form an inverted regular tetrahedron. Each member is
then displaced from its track center by a vector of length \(\rho_\sigma\) in the
perpendicular plane.

Plainly: the regular tetrahedra belong to the four track centers. The moving
architrinos ride around those centers and generally do not themselves form a
regular tetrahedron.

One module is better pictured as two parallel circular track planes than as a
solid skewer:

    electrino track plane          assembly center          positrino track plane
            circle                       O                         circle
               center -h_- n_i ---- axis n_i ---- center +h_+ n_i

The architrinos occupy points on the circles. The line marked as the axis joins
the two track centers; it does not generally pass through both moving members.

## What Six-Coordinate Means

At one instant, eight unconstrained positions would require \(8\times3=24\)
Cartesian numbers. On the F6c configuration surface, all 24 numbers are exact
functions of only

\[
\mathbf z
=
\left(
h_+,\rho_+,\theta_+,
h_-,\rho_-,\theta_-
\right).
\]

The four members inside a polarity sector share its three coordinates. Their
different positions are generated by the fixed axes, circulation signs, and
phase offsets rather than by twelve independent Cartesian coordinates.

Plainly: six-coordinate means six numbers specify the complete instantaneous
eight-member shape inside the declared F6c family.

This does not mean the complete dynamical state has only six numbers. An
instantaneous second-order state also has the six rates

\[
(\dot h_+,\dot\rho_+,\dot\theta_+,
\dot h_-,\dot\rho_-,\dot\theta_-),
\]

and the Master Equation additionally depends on the retained causal history.
The full delayed state is therefore not an ordinary six-dimensional state
vector.

Plainly: six coordinates describe the shape. Shape velocities and the remembered
past are additional dynamical information.

## What Exact Six-Coordinate Means

Exact has three specific meanings here:

1. Every member position is generated by the displayed six-coordinate formula,
   rather than fitted approximately after evolution.
2. The zero-centroid, zero-dipole, equal-sector-radius, and current-axis
   identities follow algebraically for arbitrary differentiable coordinate
   histories.
3. On an ordinary, complete, nondegenerate causal-root branch, a declared
   order-four symmetry makes the Master Equation acceleration tangent to the
   same six-coordinate history surface.

The third statement is the F6c symmetry-closure theorem. If an ideal complete
history begins exactly on F6c, the symmetric law cannot choose one of the four
modules and push it into an independent direction. Numerical calculations can
still show leakage from roundoff, root loss, history interpolation, or an
implementation error, so leakage remains a measured diagnostic.

Plainly: exact does not mean stable, periodic, or physically realized. It means
the reduction and its symmetry identities are mathematical identities rather
than a six-parameter approximation.

## Sector Radii And Spherical Envelopes

Because \(\hat{\mathbf n}_i\) is perpendicular to \(\mathbf r_i\),

\[
\|\mathbf X_{i\sigma}\|^2
=
h_\sigma^2+\rho_\sigma^2.
\]

Consequently all four members in sector \(\sigma\) lie on the sphere

\[
R_\sigma(T)
=
\sqrt{h_\sigma(T)^2+\rho_\sigma(T)^2}.
\]

The entire circular track of every module in that sector lies on the same
sphere, not only the member's current point. F6c therefore has at most two
sector-envelope radii, \(R_+\) and \(R_-\), rather than eight independent
center-to-member radii. When \(R_+=R_-\), all eight tracks lie on one common
sphere.

Plainly: equal distance from one center is exactly why spherical envelope is
the correct phrase. It does not imply that the points are evenly spaced or that
the sphere is filled with matter.

The labels inner sphere, outer sphere, and midband are only instantaneous
geometric labels. During breathing, \(R_+\) and \(R_-\) can approach, become equal,
or exchange order. There is no permanent inner polarity sector unless a
retained branch proves that ordering.

## Does Either Tetrahedron Stay Rigid Or Regular?

The track-center tetrahedron in one sector has vertices
\(\sigma h_\sigma\hat{\mathbf n}_i\). It remains regular because all six of its
edge lengths equal

\[
d_{\mathrm{center},\sigma}
=
h_\sigma\sqrt{\frac83}.
\]

It is not rigid when \(h_\sigma(T)\) changes: it expands or contracts without
changing shape.

The four moving architrinos in that sector generally do not form a regular
tetrahedron. Their six pair distances depend on \(h_\sigma\), \(\rho_\sigma\), and
\(\theta_\sigma\) and generally split into a two-edge symmetry orbit and a
four-edge symmetry orbit. Equal center radii alone do not make four points a
regular tetrahedron; regularity would additionally require all six pair
distances to agree.

Plainly: the four track centers form a breathing regular tetrahedron. The four
riders on those tracks form a deforming tetrahedral constellation on a sphere.

## Common Center And Translation

Within the exact internal chart,

\[
\sum_i\mathbf X_{i+}=\mathbf0,
\qquad
\sum_i\mathbf X_{i-}=\mathbf0.
\]

Both sector centroids and both spherical-envelope centers therefore coincide
at the F6c origin. The complete eight-member centroid is also zero.

One may define a kinematically translated drawing by adding the same
\(\mathbf C(T)\) to every member:

\[
\mathbf X_{i\sigma}^{\mathrm{lab}}(T)
=
\mathbf C(T)+\mathbf X_{i\sigma}(T).
\]

Then both envelope centers and both sector centroids coincide at
\(\mathbf C(T)\). This is a geometric identity, but \(\mathbf C(T)\) is not one of
the six F6c coordinates. A constant spatial shift of a complete record is a
Euclidean translation of the same geometry. A time-dependent translating
branch must be derived under the delayed Master Equation; it cannot be assumed
from the fixed-center theorem, especially because wake propagation is defined
relative to absolute time and the Euclidean void.

Plainly: if the whole picture is moved together, the two centers remain the
same point. Whether such a moving picture is an allowed physical solution is a
separate dynamical question.

## Are The Members Of One Module Antipodal?

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

The track centers are on opposite sides of the assembly center, but the two
transverse displacement vectors are generally not opposite. The moving
electrino, assembly center, and moving positrino therefore do not generally
form one line.

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

More general collinearity through the center requires matching axial/transverse
scale ratios plus the same transverse phase opposition. These conditions are
not F6c invariants.

Plainly: skewer is a useful name for the line through the two track centers,
but it is misleading if taken to mean that the two architrinos remain on that
line.

## Polarity Sectors And Assembly Status

F6c has exactly two polarity sectors:

- the positive sector contains four positrinos, one for each tetrahedral
  module;
- the negative sector contains four electrinos, one for each tetrahedral
  module.

The sectors are bookkeeping and symmetry partitions inside one eight-member
record. They are not presumed to be two separately retained assemblies. Equal
inventory gives four positrinos and four electrinos, but it does not by itself
derive an observer-level electric charge.

The intended object is one assembly candidate. It becomes one physical
assembly only if the eight paths bind, remain root-valid and separated, achieve
a nontrivial complete return, and pass the applicable retention and stability
requirements. None of those physical promotions has yet occurred.

Plainly: today F6c is one eight-member candidate record with two four-member
polarity groups. Calling it a proven assembly would be premature.

## Two-Versus-Two Circulation Pattern

The sign vector

\[
(s_0,s_1,s_2,s_3)=(-1,-1,+1,+1)
\]

divides the four modules into two circulation-sign pairs. In the positrino
sector, modules \(0\) and \(1\) use one phase sense while modules \(2\) and \(3\) use
the other. The factor \(\sigma\) reverses the coordinate orientation in the
electrino sector. The two members associated with one module therefore
counterrotate when \(\dot\theta_+\) and \(\dot\theta_-\) have the same sign. Because
the two cadences evolve independently and either can reverse, counterrotation
is not an invariant of every F6c history.

This is not a division of two positrinos versus two electrinos. Each polarity
sector separately has two modules of each circulation sign.

The signed axis sum is

\[
\sum_i s_i\hat{\mathbf n}_i
=
-\frac4{\sqrt3}\hat{\mathbf x}.
\]

Thus this particular two-versus-two partition selects the body \(x\) axis. The
other two inequivalent ways to split four modules into two unordered pairs
select the body \(y\) and \(z\) axes. These alternatives are orientations of the
decorated tetrahedral frame, not established color, generation, or particle
labels.

Plainly: the tetrahedral arrows cancel when counted equally, but marking two
with one circulation sign and two with the other leaves one signed body
direction.

## Tetrahedral Faces And Orbit-Area Channels

### Track-Center Face Geometry

For \(h_\sigma>0\), the track centers
\(\mathbf C_{i\sigma}=\sigma h_\sigma\hat{\mathbf n}_i\) form a nondegenerate
regular tetrahedron. The face opposite center \(\mathbf C_{i\sigma}\) has
outward unit normal and area

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

At \(h_\sigma=0\) the tetrahedron collapses, all four face areas vanish, and
the unit face normals no longer describe a full-dimensional tetrahedron.

Plainly: every noncollapsed track-center sector has four equal triangular
faces. The four arrows encoding their areas and outward directions balance
perfectly.

Vertex \(i\) is naturally paired with the face opposite it. This is a
vertex-to-face duality: the architrino at vertex channel \(i\) is not located on
that face, but its track axis \(\hat{\mathbf n}_i\) is perpendicular to it.

### Orbit-Area-Rate Vector

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

Because
\(\mathbf r_i\mathbin{\times}\mathbf t_i=\hat{\mathbf n}_i\) and the radial
breathing term is parallel to \(\mathbf r_i\), this reduces exactly to

\[
\boldsymbol\Lambda_{i\sigma}
=
\sigma s_i\rho_\sigma^2\dot\theta_\sigma
\hat{\mathbf n}_i.
\]

No mass or imported angular-momentum postulate enters this identity. It is the
oriented area-sweep rate of the declared circular track, with twice the
conventional areal-velocity normalization. Radial breathing changes the
radius and therefore the later magnitude, but its instantaneous radial
velocity contributes no cross product.

Plainly: every architrino orbit sweeps area around its skewer axis. Expanding
or contracting directly away from the track center does not itself sweep
additional area.

Projecting the orbit-area-rate vector through the opposite track-center face
gives the signed face channel

\[
q_{i\sigma}
=
\mathbf N_{i\sigma}
\mathbin{\cdot}
\boldsymbol\Lambda_{i\sigma}
=
-s_i\rho_\sigma^2\dot\theta_\sigma.
\]

The polarity sign cancels because the negative-sector orbit vector and its
outward face normal both reverse. For the declared circulation decoration,

\[
(q_{0\sigma},q_{1\sigma},q_{2\sigma},q_{3\sigma})
=
\rho_\sigma^2\dot\theta_\sigma(1,1,-1,-1).
\]

The two-versus-two orbit pattern is therefore also a two-versus-two pattern of
signed face channels.

Plainly: two faces receive one sign and two receive the other. Both polarity
sectors use the same face-sign pattern even though their orbit arrows point in
opposite absolute directions.

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

This is one exact part of the complete \(\mathbf m_{\mathrm{cur}}\) below. It
does not replace the terms coupling the moving track centers to transverse
motion or the complete delayed path-history ledger.

Plainly: the local orbital contributions alone select the same body \(x\) axis
as the complete current moment, but they do not determine its entire
magnitude.

### Cross-Sector Face Matching

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

The scaffold then has four abstract pairs with equal face area, equal signed
face-channel scalar, and oppositely directed area and orbit vectors. The
paired triangles remain in different planes; matching these quantities does
not make them one shared physical face.

Plainly: equal \(h\) matches the face sizes, while equal
\(\rho^2\dot\theta\) matches the orbital circulation assigned to them. These
are exact algebraic matching conditions, not a claim that the interpenetrating
tetrahedra are glued together.

### Instantaneous Moving-Member Faces

The four moving architrinos in one sector generally form a deforming,
nonregular tetrahedron rather than the regular track-center tetrahedron. For
the face opposite member \(i\), let \(j,k,\ell\) denote the other three members and
define

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

These member-face normals generally are not parallel to the fixed axes
\(\hat{\mathbf n}_i\). The difference between
\(\mathbf N^{\mathrm{member}}_{i\sigma}\cdot
\boldsymbol\Lambda_{i\sigma}\) and \(q_{i\sigma}\) measures how member-face
deformation changes the orbit-through-face projection.

Plainly: the regular scaffold supplies the exact reference faces. The moving
members supply a second set of faces that tilt and change size. Their
difference is calculable at every instant.

All identities in this section are **derived geometry or kinematics** of the
declared F6c chart. They are not yet conserved observables. Dynamical promotion
requires a retained complete history on which the face channels remain
well-defined and exhibit a stable transformation rule. A face-channel
interpretation fails if the member tetrahedron repeatedly degenerates, if the
channels have no body-frame-stable history, or if they do not contribute to a
reproducible assembly-level readout.

## Body-Fixed Current Axis

Define the polarity-weighted current moment

\[
\mathbf m_{\mathrm{cur}}
=
\sum_{i,\sigma}
\sigma\mathbf X_{i\sigma}
\mathbin{\times}
\dot{\mathbf X}_{i\sigma}.
\]

For arbitrary differentiable F6c coordinate histories,

\[
\mathbf m_{\mathrm{cur}}(T)
=
m_x(T)\hat{\mathbf x}.
\]

The direction line is exact for the declared sign partition. The magnitude is
not constant and is jointly produced by circulation and breathing shear. It
may change, reverse, or pass through zero. When it is zero, the vector has no
defined direction even though the body \(x\) line remains the symmetry-selected
channel.

This current axis is not the group-translation axis. Exact internal F6c has
zero centroid velocity. It is also not yet a proven assembly-spin axis,
magnetic moment, or spinor axis. Those are downstream recovery targets that
require a retained history and an observer-level projection.

Plainly: the axis tells us where one signed internal-circulation readout points.
It does not tell us where the whole object moves, and it does not yet prove
particle spin.

## Current Persistence Can Be A Sector Handoff

For each polarity sector define

\[
\mathbf q_\sigma
=
(\dot h_\sigma,\dot\rho_\sigma,
\rho_\sigma\dot\theta_\sigma).
\]

The exact axial sector current has the form

\[
I_\sigma
=
s_\sigma\frac43
\mathbf a_\sigma(h_\sigma,\rho_\sigma,\theta_\sigma)
\mathbin{\cdot}\mathbf q_\sigma,
\]

so its derivative separates shape rotation from acceleration of the rate
vector:

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

For the combined six-coordinate rate vector, a specified instantaneous total
current defines a five-dimensional affine hyperplane. The unique
minimum-Euclidean-norm carrier lies parallel to the combined current row; its
orthogonal complement is exactly current-neutral. This leaves five rate
directions available for breathing, corridor protection, and return control
without changing that instantaneous current at fixed shape.

Adding one pair-distance-rate condition leaves a four-dimensional affine rate
space. The minimum-norm joint carrier is obtained by projecting the desired
current and corridor rate through their two exact linear rows. At the selected
guarded release shape, the current-only carrier would close the limiting pair
at rate \(-0.200974\); the observed geometry opened it at \(+0.195976\). The
minimum collective rate norm rose from \(0.333269\) for current alone to
\(0.368445\) for current plus a nonclosing boundary and \(0.455370\) for current
plus the observed opening rate.

Thus current-neutral motion is not merely unused capacity. For this shape it
is required to prevent the current-efficient direction from closing the pair.
The four remaining joint-neutral directions are candidate return-control
coordinates, subject to delayed-history and root-clearance certification.

Across the 2,348-release census, this conflict occurred in 312 of 1,154
measured opening releases, 15 of 19 opening active handoffs, and all 12 active
handoffs that also passed the sector-speed-flow guard. Those 12 retained
51.3%--59.4% of their actual collective rate norm in the four-dimensional
joint-neutral space after measured current and corridor rate were both
removed. The local screen is deliberately oversampled, so these counts define
a motif rather than a basin measure.

Because the field-speed guard applies separately to each sector, the
six-coordinate Euclidean projector is not the final speed optimum. A weighted
two-sector projector can minimize the larger sector speed while holding current
and corridor rate fixed. At the selected release, it balanced both sector
speeds at \(0.341973\) for the observed opening rate, compared with \(0.409796\)
for the Euclidean carrier and \(0.388663\) for the actual release. The analogous
nonclosing-boundary minimum was \(0.280086\). These are fixed-shape lower bounds,
not by themselves root-certified evolved seeds.

The measured-opening minimax vector was then embedded in a harmonic delayed
history by giving the four axial/radial breathing coordinates independent
phase offsets while retaining one common breathing frequency. The largest
required amplitude was \(0.117373\), the release reconstructed both sector
speeds as \(0.341973\), and all 64 release root rows certified at tolerance
\(10^{-5}\).

Ordinary fixed-law evolution of that same record reached \(T=0.28\) with no
rejected step. Positive cadence reversed near \(T=0.194854\); the maximum member
speed over the interval was \(0.403658\); current changed from \(-0.728215\) to
\(-0.627988\); and root-time pressure reached \(0.842014\). The limiting
opposite-polarity pair initially opened, then closed to distance \(0.391664\) at
rate \(-0.420275\).

Plainly: the minimax tangent vector is compatible with one complete causal
prehistory and a substantial strict-contract continuation. It reduces the
speed burden and survives cadence reversal, but it does not regulate the
pair corridor into a return. The next geometry target is dynamic rotation of
the four-dimensional joint-neutral control space, not another static opening
projection.

One bounded root-certified release had sector slopes
\((-0.437531,+0.434729)\), leaving total slope only \(-0.00280243\) on total
current \(-0.723067\). Its EOM continuation through \(T=0.240\) kept total current
within 2.8% while the positive sector contribution grew in magnitude and the
negative contribution declined. The continuation then met a negative-sector
same-polarity causal-root certification boundary before collision, a coordinate
turn, or a \(c_f=1\) speed crossing.

Plainly: a composite braid may keep a nearly steady assembly current by
passing current-supporting work between its conjugate sectors. Each sector can
change substantially even while their total stays nearly fixed. That handoff
still needs protected causal-history spacing and a complete return before it
can count as retained behavior.

A separate guarded release showed that the solver's root-time enclosure
pressure can rise toward its declared tolerance budget while pair distance,
root count, and transmitter-factor magnitude remain ordinary. That pressure
is a useful continuation warning, but it is tolerance-relative and is not a
physical F6c invariant. Two histories, ending on different polarity-pair
classes, independently reached pressure \(0.982\) and \(0.999\) immediately before
their known next-step root-enclosure failures.

A matched-input run with twice the root-time tolerance moved the certification
wall from \(T=0.240\) to \(T=0.3025\) and exposed a positive-sector cadence
reversal near \(T=0.296899\). Total current remained within 0.91% of release
because breathing shear and the conjugate sector continued to carry it. This
is an inferred geometry clue from a changed certification fingerprint, not a
tight-tolerance retained result.

At \(T=0.2975\), just after that cadence crossing, the positive-sector current
split into axial-breathing, radial-breathing, and tangential pieces
\((-0.163389,-0.075468,+0.000310)\). Thus almost the entire sector current was
carried by breathing shear at the instant its orbital cadence reversed. A
candidate current channel need not require permanently same-sense orbital
motion.

In the deduplicated 2,299-release census, 29 geometries met the declared active
current-handoff screen. The mechanism is therefore selective but not isolated;
many of those rows still began with closing pair corridors, so handoff does not
replace ordinary spatial and causal-history guards.

A focused \(7\times7\) phase screen around the only initially opening,
nonaccelerating active handoff found 12 active handoffs and 11 that also passed
those immediate corridor and speed-flow guards. The best neighbor then
reproduced a positive-sector cadence reversal under the tighter \(10^{-5}\)
root-time contract at \(T\approx0.252158\). At its final certified
\(T=0.290\), total current retained 83.2% of its release magnitude while the
positive-sector axial, radial, and reversed-tangential contributions were
\((-0.073799,-0.051688,+0.014554)\). Thus breathing shear, not same-sense
circulation, carried the sign of that sector current through the reversal.

This is still not a retained cycle. Root-time pressure reached \(0.990342\) and
the attempted next step met a four-row root-enclosure certification boundary
with finite pair clearance and ordinary transmitter-factor magnitude.

After including the 49-row local screen, all 12 active handoffs that also had
an opening corridor and no positive sector-speed derivative used only
\(59.3\%\)--\(63.8\%\) of their possible alignment with the current row. Their
current-neutral norm fractions were \(77.0\%\)--\(80.5\%\). The selected evolved
neighbor moved from 77.99% current-neutral motion at release to 81.08% at
\(T=0.290\). These are bounded, deliberately oversampled diagnostics, but they
show that efficient current production and geometric control are different
axes of the search.

The evolved neighbor also converted its current-neutral mode. Tangential
motion supplied 76.82% of the neutral squared norm at release, but only 0.83%
at the first sampled frame after cadence reversal; axial and radial breathing
then supplied 99.17%. At the final certified frame, breathing still supplied
94.52%. Orbital cadence, breathing, and current support are therefore coupled
coordinates of one motion, not necessarily separate persistent mechanisms.

Three strict histories at the same breathing-cycle phase and nearby
negative-sector phases all reproduced cadence reversal. Their interpolated
cadence-zero currents agreed within 0.051%, near \(-0.63424\), while sector
currents compensated. Increasing negative-sector phase moved the turn earlier
and the root-enclosure boundary later across this three-row slice. An adjacent
breathing-cycle phase changed the section current, so the near agreement is a
candidate slice property rather than an F6c invariant.

Across five nearby histories, a threshold of at most 1% tangential neutral
power was reached \(0.0347\)--\(0.0409\) before cadence zero in the four histories
that turned. The fifth converted modes but reached its certification boundary
before reversal. Breathing-dominated current-neutral motion is therefore a
measured precursor to cadence reversal in this local family.

Opposite breathing-amplitude signs were only modestly enriched relative to the
sampled baseline, while opening corridors were less common in active handoffs
than in the full archive. The handoff condition is therefore a phase-space
relation among shape, motion, and acceleration, not a sign-pattern shortcut.

This result is a measured bounded diagnostic, not a retention or particle
claim. The full derivation, census, numerical check, and falsifier are in
[Current Transport, Guard Flow, And A Causal-History Boundary](inferring-braid-requirements.md#current-transport-guard-flow-and-a-causal-history-boundary).

## Exact Invariants And Identities

The word invariant can mean either a quantity that remains fixed or a surface
that the dynamics cannot leave. The currently established F6c results include
both kinds. The list below is scoped to the declared F6c chart and its complete
ordinary causal-root branch.

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
| electric dipole | \(\mathbf p=0\) identically | This is a simple polarity dipole null, not a complete effective-charge result. |
| phase-averaged sector second moment | A complete uniform phase average equals \((4/3)(h_\sigma^2+\rho_\sigma^2)I\) | A phase average is not automatically a time average when breathing and cadence vary. |
| current-axis line | \(\mathbf m_{\mathrm{cur}}=m_x\hat{\mathbf x}\) | The magnitude and sign are not invariant. |
| equal sector-member speed | Every member in sector \(\sigma\) has \(v_\sigma^2=\dot h_\sigma^2+\dot\rho_\sigma^2+(\rho_\sigma\dot\theta_\sigma)^2\) | This is a speed identity, not a conserved speed. |
| edge-orbit equality | Symmetry-related two-edge and four-edge pair classes have identical distances | The distances change with the six coordinates and can approach coincidence. |
| conjugation parity | Common coordinates are even and polarity-differential coordinates are odd under sector exchange | Effective charge from the odd coordinates remains inferred. |
| singlet/triplet split | Four module values split into one common value plus a three-dimensional sum-zero directional part | The response interpretation of those parts is inferred. |
| invariant history surface | The Master Equation acceleration is tangent to F6c when the complete ordinary causal-root branch remains nondegenerate | Does not establish recurrence, attraction, or stability. |
| return-action order | Direct chart returns have order one; reflected shape returns have order one for scalar shape but order two for cadence and fixed-frame axial current | A symmetry return is not automatically a labeled path-history return. |

Plainly: F6c exactly protects its bookkeeping, centers, dipole null, sector
shells, current-axis line, and six-coordinate symmetry surface. It does not
protect the sizes, speeds, pair separations, current magnitude, or recurrence.

The following are specifically not known invariants:

- \(h_\sigma\), \(\rho_\sigma\), \(\theta_\sigma\), or their rates;
- the two envelope radii;
- any individual pair distance or minimum clearance;
- the sign or magnitude of \(m_x\);
- a simple orbital frequency;
- energy, action, or angular-momentum ledgers for a retained F6c branch;
- binding, retention, stability, particle identity, effective charge, mass,
  spin, or magnetic moment.

## Exact Symmetries

### Undecorated Tetrahedral Frame

The four regular tetrahedral axes admit 24 signed-coordinate orthogonal maps.
This is the full tetrahedral point-group structure of the undecorated axis set.
The circulation signs and phase offsets reduce that symmetry: exactly eight of
the 24 maps preserve the F6c common-phase chart.

Those eight maps form the order-eight \(D_{2d}\) pattern after the conventional
point-group axes are relabeled so that the F6c current axis is \(x\). Four maps
are proper rotations and four are improper maps. This classification agrees
with the independently enumerated matrices in
[the F6c return-group instrument](../../../scripts/mapping-electromagnetism/f6c-identity-return-group.mjs).

Plainly: a plain tetrahedral frame has 24 rigid spatial symmetries. Adding the
F6c circulation pattern keeps only eight.

### Complete Eight-Map Chart Symmetry

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

Each row is a combined spatial transformation and module relabeling. A
reflected phase action maps a generic F6c state to another state on the chart;
it does not leave the original phase coordinates unchanged.

Plainly: every surviving symmetry must move space and relabel the tetrahedral
modules consistently. A spatial rotation by itself is not enough.

### Symmetry-Closure Generator

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

for arbitrary six-coordinate histories. Because the Master Equation uses
Euclidean vector differences, scalar distances, polarity products, and causal
path history, it is equivariant under this time-independent orthogonal map and
label permutation. This is the exact source of the invariant F6c history
surface.

Plainly: the law treats all four symmetry-related modules the same, so an ideal
history cannot develop a one-module-only acceleration while the root record
remains complete.

### Proper Return Actions

The four proper rotations give two distinct return types:

- identity and \(C_{2x}\) use the direct phase action;
- \(C_{2y}\) and \(C_{2z}\) use the reflected phase action, exchange
  same-polarity modules, reverse both cadences, and reverse the fixed-frame
  current vector.

A reflected relative return can repeat orientation-quotiented scalar shape
after one step while cadence and axial current require two steps. It is not
automatically a return of the eight labeled path histories because module
exchange requires a separate identity-history argument.

Plainly: the visible shape can repeat before the detailed motion and current
posture repeat.

### Global Polarity Conjugation

Global polarity conjugation is separate from the eight spatial chart maps. It
flips every persistent architrino polarity without changing the unlabeled
paths. Since each ordered interaction carries a polarity product, both signs
flip and the product is unchanged. On the F6c coordinates,

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

The polarity-weighted current moment also reverses. This is an exact
field-free comparison theorem for the complete globally conjugated record. It
does not establish that F6c is charged or identify a particle/antiparticle
pair, and it does not apply unchanged when only the receiver is conjugated
while an external source is held fixed.

Plainly: swapping every positrino for an electrino and every electrino for a
positrino leaves the unlabeled field-free paths available but reverses every
polarity-odd readout.

## Why This Geometry Was Introduced

F6c was constraint-generated inside the F6 program rather than imported from
an academic tetrahedral model.

1. The F6 tetrahedral axis set was chosen because its vector sum cancels leading
   axial dipoles and its second-moment sum is isotropic.
2. F6b added the two-versus-two circulation partition and fixed phase offsets.
   That produced exact sector centering, exact dipole cancellation, a nonzero
   body current channel, and positive prescribed-path clearance.
3. The fixed circular F6b history failed the member-level acceleration test.
   Its geometry was useful, but constant radii and one shared cadence were too
   restrictive.
4. Projection of the evaluated acceleration onto one common three-coordinate
   tangent left \(68.408\%\) of the acceleration norm outside that tangent.
5. Giving the two polarity sectors separate axial, radial, and phase histories
   reduced the measured normal fraction to \(2.31\times10^{-15}\) on the same
   root ledger. The exact order-four symmetry later proved that tangency was
   structural rather than a numerical coincidence.

Plainly: the Master Equation response itself indicated the minimal repair. The
positive and negative sectors needed to breathe and change cadence separately;
eight independent member motions were not required.

The subsequent bounded searches reinforced that inference. Uniform fixed-ring
motion did not approach a relative equilibrium in the searched domain.
Ordinary evolutions produced axial turns, radial turns, cadence exchange, and
sector-selective circulation reversal while preserving the exact geometry to
roundoff. No evolved record has yet supplied a nontrivial direct or reflected
full return. Two leading records approached the causal boundary through
different channels: one primarily through circulation cadence and one
primarily through radial collapse.

Claim grade: the geometry and symmetry statements are derived; the stated EOM
behavior is measured on bounded declared records; retention and physical role
remain open.

## Related Ideas In Mathematics, Science, And Engineering

These are comparison tools and explanatory analogies. None is an
architrino-level premise and none independently validates F6c.

| Related idea | Genuine connection | Limit of the analogy |
| --- | --- | --- |
| regular simplex and spherical design | The tetrahedral directions have zero first moment and isotropic second moment, the same finite-averaging property studied in spherical-design mathematics. See Delsarte, Goethals, and Seidel, [Spherical Codes and Designs](https://doi.org/10.1007/BF03187604). | Spherical-design theory supplies geometry, not the Master Equation dynamics or retention. |
| \(D_{2d}\) point group | The eight decorated F6c chart maps match the order-eight \(D_{2d}\) operation pattern after axis relabeling. See the [Bilbao Crystallographic Server point-group table](https://www.cryst.ehu.es/cgi-bin/rep/programs/sam/point.py?num=14&sg=111). | A shared finite group does not make F6c a crystal or molecule. |
| invariant subspaces in equivariant dynamics | Symmetry-fixed subspaces of equivariant systems remain invariant under the flow. This is the general mathematical pattern used by the F6c symmetry-closure theorem. See Golubitsky and Stewart, [Dynamics and Bifurcation in Networks](https://doi.org/10.1137/1.9781611977332.ch13). | F6c has delayed causal history, so its full state is not an ordinary finite-dimensional ODE state. |
| tetrahedral molecular vibration | Tetrahedral molecules separate common breathing and symmetry-classified directional modes; methane provides a familiar example of nondegenerate and multiply degenerate vibrational families. See Jahn and Childs, [Structure of the Methane Molecule](https://doi.org/10.1038/141916a0). | Molecular modes assume molecular constituents, effective masses, and a Hamiltonian not available as F6c premises. |
| tetrahedral reaction-wheel arrays | Aerospace engineering places four wheels in a tetrahedral arrangement so combinations of internal wheel rates can control body-axis response. See NASA's [Tetrahedron Array of Reaction Wheels for Attitude Control and Energy Storage](https://ntrs.nasa.gov/citations/19860040135). | Reaction wheels use macroscopic rigid-body mechanics. F6c current is a polarity-weighted path functional, not mechanical wheel torque. |
| relative periodic orbits and Poincare maps | A shape may return only after a spatial symmetry and member permutation. This is the correct mathematical language for direct versus reflected F6c returns. | A relative return still needs complete causal roots, labeled-history interpretation, and stability; symmetry alone does not produce it. |

Plainly: academic and engineering examples show that tetrahedral balancing,
symmetry-protected motion, breathing modes, and signed internal rotors are
well-developed ideas. F6c combines analogous geometry with a different native
law and therefore must earn its own dynamics.

## Are There Neutral Volumes That Could Capture Six Architrinos?

### Intended Meaning Of The Earlier Lagrange-Like Question

The intended fermion-facing target is not primarily a set of point
equilibria, and it is not the capture of only one ninth member. It is a set of
finite regions within or around the eight-member structure that can receive
**six additional architrinos** with a particle-dependent polarity inventory.
The six captured members must remain mutually separated, associated with the
F6c host, and compatible with one collective delayed-history solution.

This document uses **neutral volume** as a working description for such a
candidate region. “Neutral” does not mean zero primitive polarity, empty
space, or exactly zero acceleration everywhere. At the first diagnostic rung,
it means low net acceleration for one declared probe polarity, velocity, path
history, and phase of the F6c source record. At the six-member rung, neutrality
is collective: each captured member must receive a compatible acceleration
from the eight host members and the other five captured members. The visible
regions may move, breathe, split, merge, or disappear during one F6c cycle.

Plainly: the picture is six places or pathways that work together, not one
magic dot. A location that looks calm for one architrino may fail after five
others arrive, and six individually poor locations may become viable through
their combined response.

### Six-Member Polarity Inventory

Label the captured members by \(a\in\{1,\ldots,6\}\) and write their polarity
vector as

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

There are seven unsigned count classes \((N_+,N_-)\), from \((0,6)\) through
\((6,0)\). If the six sites are labeled, one class contains
\(\binom{6}{N_+}\) polarity assignments and all classes together contain
\(2^6=64\) assignments. These are combinatorial possibilities, not 64
particles. Spatial symmetry, axial-dyad organization, history, and ordinary
dynamics must identify equivalent assignments and reject unretained ones.

The current charged-fermion candidate catalog uses the count classes as
follows:

| Captured inventory \((N_+,N_-)\) | Current particle-facing bookkeeping | Status in this F6c capture proposal |
| --- | --- | --- |
| \((0,6)\) | negatively charged leptons | literal six-member candidate inventory |
| \((1,5)\) | conjugates of up-type quarks | literal six-member candidate inventory |
| \((2,4)\) | down-type quarks | literal count, with more than one possible axial-dyad partition requiring dynamical selection |
| \((3,3)\) | neutrino weak-exposure bookkeeping | not currently a literal six-site neutrino inventory in the owning fermion documents |
| \((4,2)\) | conjugates of down-type quarks | literal count with the conjugate selection burden |
| \((5,1)\) | up-type quarks | literal count, with the exceptional mixed dyad supplying the candidate color axis |
| \((6,0)\) | positively charged leptons | literal six-member candidate inventory |

Thus “all combinations depending on the particle” should initially mean that
the search instrument accepts every declared six-member polarity vector while
the particle map selects only declared inventory and geometry classes. It
must not assume that every permutation inside a count class is a distinct
species, or that net count alone determines a fermion.

Plainly: six seats can be filled with every mixture from six electrinos to six
positrinos. The mixture fixes a candidate charge count, but which seat holds
which polarity can also control color, weak exposure, and whether the object
survives. The present corpus treats the neutral neutrino row differently, so
the \(3+3\) case is a deliberate architecture question rather than an already
accepted literal picture.

### One Volume, Six Volumes, Or Six Paths?

The word “volumes” must not prejudge the topology. A six-member captured state
could project into ordinary three-dimensional space as:

- six disjoint moving pockets;
- a two-pocket plus four-pocket symmetry arrangement;
- one connected region containing six separated recurrent paths; or
- a time-dependent exchange network in which member labels circulate through
  a smaller number of visible lobes without collisions.

The actual capture basin lives in the configuration-history space of six
members. Its ordinary-space picture is only a projection. In particular, six
architrinos cannot all occupy one point or one identical path while satisfying
the required member-clearance and labeled-history conditions.

Plainly: “six capture volumes” is a useful first sketch, not a law. The final
geometry may look like six pockets, or like one larger chamber containing six
coordinated tracks.

### Why Classical Lagrange Points Are Only An Analogy

Classical Lagrange points are equilibrium locations in a rotating restricted
three-body model with a declared instantaneous gravitational potential and a
specific co-rotating frame. Their count of five follows from that model, not
from the general existence of rotating sources. A standard comparison source
is NASA's [Restricted Three-Body Problem note](https://science.nasa.gov/wp-content/uploads/2023/07/3322_lagrange.pdf).

F6c instead has eight delayed sources, two breathing polarity sectors,
independent cadences, no derived rigid rotation of the entire body, no accepted
time-independent assembly potential, and no retained periodic branch.
Therefore neither the classical count nor the classical point construction
transfers. The useful part of the analogy is only the search for locations or
regions where additional members could remain body-associated.

Plainly: “Lagrange-like” names the capture question, not the equation used to
answer it. F6c must derive its own neutral regions from delayed architrino
paths.

### Instantaneous Neutral-Volume Diagnostic

Let \(p\in\{+1,-1\}\) be the polarity of a probe architrino. For a declared F6c
source history \(\mathcal H_{\mathrm{F6c}}\), probe history
\(\mathcal H_{\mathrm p}\), probe velocity \(\mathbf V_{\mathrm p}\), and time
\(T\), write its Master Equation acceleration as

\[
\mathbf A_p
\left(
\mathbf y,\mathbf V_{\mathrm p},T;
\mathcal H_{\mathrm p},
\mathcal H_{\mathrm{F6c}}
\right).
\]

For a declared diagnostic threshold \(\varepsilon_A\), an instantaneous
low-acceleration region is

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

The threshold is an instrument resolution, not a new physical constant.
Candidate volumes must also exclude points without valid causal roots and
points inside the required clearance from an existing member path. Changing
probe polarity, velocity, prehistory, or F6c phase can change the region.

Plainly: freeze one fully specified probe experiment and shade every location
where its calculated acceleration is small. Connected shaded regions are
single-seat candidates for that experiment only. Repeating this for both
polarities provides a site atlas from which six-member configurations can be
proposed; it does not test the completed six-member state.

An exact zero-acceleration set can consist of isolated points, curves, surfaces,
or volumes. A finite low-acceleration volume can surround a lower-dimensional
exact zero set. Neither object by itself proves capture: a moving architrino
can coast through a perfectly neutral region and leave on the other side.

### Capture Is A Stronger Dynamical Condition

Let \(\mathbf C(T)\) be the assembly-center path and \(Q(T)\) a declared
body-frame orientation. Captured member \(a\) has body-frame position

\[
\boldsymbol\xi_a(T)
=
Q(T)^{\mathsf T}
\left(
\mathbf Y_a(T)-\mathbf C(T)
\right).
\]

A candidate six-member basin \(\mathfrak V_{\boldsymbol p}(T)\) captures a set
of initial histories only if the tuple
\((\boldsymbol\xi_1,\ldots,\boldsymbol\xi_6)\) remains in that basin, or returns
to it under a declared recurrent rule, while maintaining causal-root validity,
all pairwise member clearances, and the \(c_f=1\) speed margin. Capture
therefore belongs to position-velocity-history space for the full tuple, even
when its visible projection is drawn as several three-dimensional volumes.

Plainly: a map of small acceleration is like a map of calm water. Collective
capture is the stronger claim that six objects placed in a whole range of
starting positions and velocities neither drift away nor disrupt one another.

A useful candidate need not have zero acceleration throughout its interior.
The central part may be nearly neutral while the boundary supplies an inward
or phase-averaged restoring response. Because the F6c source breathes and its
cadences change, a capture volume may be dynamically maintained rather than
static.

A one-way probe calculation can locate possible seats without letting a probe
change the eight-source record. A stronger fixed-host diagnostic evolves six
captured members, including their mutual delayed contributions, while holding
the F6c history prescribed. Both are diagnostic approximations. If all eight
F6c members remain in the completed object, a physical capture claim requires
full **fourteen-member** evolution: every added architrino contributes its own
delayed history and may deform, destroy, or reorganize the original F6c motion.

Plainly: first map possible seats one probe at a time. Next test six mutually
interacting additions against a fixed host. Finally let all fourteen members
respond and ask whether they coexist as one retained history.

### Architecture Fork: Fourteen Members Versus The Current Fermion Counts

An unchanged eight-member F6c host plus six captured members contains

\[
N_{\mathrm{total}}=8+6=14
\]

architrinos. The current charged-fermion catalog instead combines a coherent
neutral scaffold of 6, 4, or 2 architrinos with a six-site axial layer, giving
candidate totals of 12, 10, or 8 across Generations I, II, and III. Therefore
the F6c capture picture is not yet a drop-in realization of that catalog.

At least three architecture branches remain open:

1. **Fourteen-member alternative:** the F6c host remains intact and the
   particle catalog's constituent counts must be revised after comparative
   retention and recovery tests.
2. **Capture-then-reorganize:** F6c is a transient eight-member capture frame,
   after which two or more host members leave, merge into another association,
   or lose coherent scaffold membership through a fully ledgered event.
3. **Effective-site interpretation:** some F6c members organize the capture
   geometry without remaining separate constituents of the final fermion;
   this requires a native event/history explanation and cannot be asserted by
   relabeling the count.

Plainly: six additions to F6c make fourteen, while the current fermion tables
say twelve, ten, or eight. Either this is a new particle architecture or the
host must lawfully reorganize after capture. That mismatch is a testable clue,
not a bookkeeping detail.

### What Symmetry Can Say Before Dynamics

The \(D_{2d}\) chart symmetry constrains the multiplicities and shapes of
candidate neutral volumes but does not prove that any exist:

- a central neutral volume can be invariant under all eight chart maps;
- an off-center pocket on the current-axis line requires a paired pocket on the
  opposite side;
- pockets centered on special transverse axes or mirror planes can occur in
  four-member symmetry orbits; and
- generic off-symmetry pockets occur in eight-member orbits.

These are orbit sizes of symmetry-related candidates, not counts of capture
volumes. A positive probe's neutral region also need not equal a negative
probe's region unless a complete polarity-conjugation relation is imposed on
the source and probe histories.

Exactly six distinct generic pockets cannot form one generic eight-member
symmetry orbit. A natural fully decorated candidate is instead a sum of a
two-member orbit and a four-member orbit. Other six-member arrangements may
break part of \(D_{2d}\), use a connected multi-path volume, or exchange member
labels over a cycle. The polarity decoration can reduce the spatial symmetry
further even when the undecorated six-path set is symmetric.

Plainly: symmetry says how copies of a discovered pocket must be arranged. Six
separate symmetric seats most naturally split into a pair plus a group of four;
otherwise the captured pattern must use a different symmetry or a shared
volume. Symmetry does not guarantee that any seat exists.

### Strongest Six-Seat Seed: The Central Octahedral Axes

At the equal-scale track-center reference \(h_+=h_-=h\), the two solid
tetrahedra intersect in the regular octahedron derived in Appendix A. Its six
vertices are

\[
\mathcal S_{\mathrm{oct}}(h)
=
\left\{
\pm\frac{h}{\sqrt3}\mathbf e_x,
\pm\frac{h}{\sqrt3}\mathbf e_y,
\pm\frac{h}{\sqrt3}\mathbf e_z
\right\}.
\]

These are a natural **seed set** for a six-member neutral-volume search. Under
the decorated F6c symmetry, the two \(x\)-axis sites form the distinguished
two-member orbit and the four \(y\)- and \(z\)-axis sites form the transverse
four-member orbit. More generally, the symmetry-compatible axial seed can be
written

\[
\mathcal S_{2+4}(a_\parallel,a_\perp)
=
\left\{
\pm a_\parallel\mathbf e_x,
\pm a_\perp\mathbf e_y,
\pm a_\perp\mathbf e_z
\right\},
\]

with positive search radii \(a_\parallel\) and \(a_\perp\). Equality at
\(h/\sqrt3\) recovers the regular central octahedron; unequal values give a
tetragonally deformed six-site seed while preserving the distinguished-axis
partition.

The six octahedral vertices also have an edge interpretation. Each is the
crossing point, in the equal-scale compound, of one cube-face diagonal from
the positive-sector tetrahedron and one from the negative-sector tetrahedron.
Equivalently, the six sites index the six edges of either tetrahedron. They do
not index its four faces one-to-one.

This construction is **derived reference geometry**, not a neutral-acceleration
result. The Master Equation must still determine whether low-acceleration
volumes occur around these points, whether their centers move away from the
static octahedral values over an F6c cycle, and whether any particle-dependent
polarity decoration remains captured. A decorated polarity vector can also
break the full \(2+4\) spatial symmetry.

Plainly: the equal-size double tetrahedron already marks six especially natural
places—left and right, up and down, front and back. They are the best first
places to search for six capture pockets, but geometry alone does not say the
pockets are calm or binding.

### Inside, Between, Or Outside The Sector Envelopes

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

For the equal-scale octahedral seed with \(h>0\), every seed center has radius
\(h/\sqrt3\), while either sector envelope has radius
\(R_\sigma=\sqrt{h^2+\rho_\sigma^2}\). Hence

\[
\frac{h}{\sqrt3}<R_\sigma,
\]

so all six seed centers lie inside both sector envelopes. This is a derived
location statement about the reference points, not evidence that a finite
capture volume exists around any of them.

Plainly: the six octahedral search points start well inside both reference
spheres. If real capture pockets form around them, their boundaries or moving
centers could still cross a sphere as F6c breathes.

One connected neutral volume can straddle more than one band. A body-frame
pocket can also change band labels as the two sector envelopes breathe through
it. When \(R_+=R_-\), the midband has zero width and the inner/outer polarity
ordering exchanges. None of the envelope surfaces is a wall.

Plainly: a capture pocket may sit inside, between, or outside the two reference
spheres, or cross them. The sphere labels describe where the pocket is at one
instant; they do not confine it.

### Calculation Ladder

The investigation can begin before a retained periodic F6c branch exists, but
its early products must remain diagnostic:

1. On one immutable root-complete F6c record, sample
   \(\mathbf A_p\) for both probe polarities over a three-dimensional body-frame
   domain, several probe velocities, declared probe prehistories, and enough
   F6c phases to resolve breathing and cadence changes.
2. Extract connected low-acceleration regions, root-valid regions, and
   clearance-valid regions separately, then intersect them. Measure whether
   each candidate's boundary acceleration is inward, outward, or phase
   alternating.
3. Transport the connected regions through F6c phase and identify persistent
   components rather than treating one favorable snapshot as a volume.
4. Construct six-seat or six-path candidates for each declared polarity vector
   \(\boldsymbol p\). Quotient spatial assignments by the surviving decorated
   F6c symmetry, while retaining distinct axial-dyad partitions.
5. Integrate one-way probe ensembles through each persistent component. Report
   finite-time residence and escape basins, not physical capture.
6. Evolve all six additions together, including their mutual contributions,
   against the same fixed F6c host history. Reject collisions, member exchange
   that violates the declared label contract, and apparent closure caused by
   omitted captured-to-captured contributions.
7. After a root-complete retained periodic or relative-periodic F6c branch is
   available, seek collective periodic or relative-periodic six-member
   histories and compute a return-map result only about paths that are actual
   solutions.
8. Promote a candidate only after full fourteen-member evolution preserves
   roots, clearance, speed margin, bounded association, polarity inventory,
   and a nonzero basin of captured initial histories—or after a fully ledgered
   reorganization establishes a different final member count.
9. Classify every member path by its \(D_{2d}\) symmetry orbit and by the
   portions lying inside, between, and outside the breathing sector envelopes.

The first concrete artifact should be a polarity-resolved three-dimensional
single-seat atlas over one declared F6c phase cycle. Its values would be
**measured diagnostics** of that prescribed source record. The next artifact
should be a symmetry-reduced six-member configuration atlas covering all seven
polarity-count classes and the inequivalent site decorations inside each
class. A persistent fixed-host collective basin would be an **inference**
about the prescribed source. Only a root-complete, backreacting fourteen-member
retained history—or an equally complete capture-and-reorganization history—
would establish physical fermion-facing capture.

The neutral-volume idea is falsified for a declared F6c branch and six-member
inventory class if every root-valid low-acceleration component disappears over
phase, no clearance-valid six-path assignment exists, every collective ensemble
escapes or collides, or every apparent basin vanishes when fourteen-member
backreaction is enabled. A successful single-probe pocket with no viable
six-member occupation would falsify the fermion-facing use while leaving the
single-capture observation intact.

## Question-By-Question Answers

| Question | Current answer |
| --- | --- |
| What does six-coordinate mean? | Six scalar configuration values determine all 24 Cartesian member-position components on F6c. Rates and causal history remain additional state information. |
| What does exact six-coordinate mean? | The member map, its cancellations, and conditional Master Equation tangency are algebraic symmetry results, not a best-fit six-parameter approximation. It does not mean retained or stable. |
| Why call the sector locus a spherical envelope? | All four tracks in one sector have the same center and radius \(R_\sigma=\sqrt{h_\sigma^2+\rho_\sigma^2}\). |
| Does either tetrahedron stay rigid and regular? | The four track centers remain a regular tetrahedron but breathe with \(h_\sigma\). The four moving members generally form a nonregular, deforming tetrahedral constellation. |
| Do both spheres have one coincident center? | Yes in the internal chart. A common kinematic translation preserves coincidence, but a translating EOM branch is an additional dynamical problem. |
| Is the eight-member object one assembly? | It is one assembly candidate and one top-level record. Binding, recurrence, retention, and stability are not established. |
| What is a polarity sector? | One of two four-member groups: four positrinos or four electrinos. |
| Are module partners antipodal through the center? | Not generically. Their track centers are opposite, but the moving members are antipodal only under special equal-scale and phase-opposition conditions. |
| What is two-versus-two circulation? | Inside each polarity sector, two modules carry one fixed circulation orientation and two carry the other. The polarity factor reverses the coordinate orientation between sectors, although independent cadence reversal means actual counterrotation is not guaranteed at every time. |
| What is the body-fixed current axis? | The exact line of the polarity-weighted internal current moment for the chosen circulation partition. It is neither a translation axis nor yet a proven spin axis. |
| What are tetrahedral axes? | The four center-to-vertex directions of a regular tetrahedron, used as body-frame reference directions and local track normals. |
| What are the invariants? | The complete current list appears in [Exact Invariants And Identities](#exact-invariants-and-identities); sizes, speeds, current magnitude, binding, and recurrence are specifically not included. |
| What are the symmetries? | The undecorated axes have 24 tetrahedral maps; exactly eight preserve the decorated F6c chart, with four proper and four improper maps, plus a separate global polarity-conjugation comparison. |
| Why was F6c introduced? | It was the minimal symmetry-preserving repair after the F6b fixed-circle acceleration residual demanded separate axial, radial, and cadence motion for the two polarity sectors. |
| Are there neutral volumes that could capture six architrinos? | None have been calculated or proved. The strongest seed is the equal-scale central octahedron's six axial vertices: a symmetry-natural pair plus four transverse sites, all inside both reference spheres. The fermion-facing target is a collective basin with a declared particle-dependent polarity vector, not six independent point equilibria. A physical claim requires backreacting fourteen-member retention if F6c remains intact, or a fully ledgered capture-and-reorganization history. |

## Current Evidence Boundary

The strongest current statement is:

> F6c is an exact symmetry-invariant six-coordinate history surface with two
> co-centered polarity-sector envelopes, exact sector centering and dipole
> cancellation, and one body-fixed polarity-weighted current channel.

The current EOM-solver evidence shows finite ordinary evolutions that remain on
the surface to numerical precision and develop nontrivial breathing and cadence
exchange. The existing-record return census found no nonzero direct winding and
no reflected full-state return. Current failures approach a sector-local causal
boundary rather than establishing collision, breakup, or global nonexistence.

The following remain open:

- an ordinary nontrivial periodic or relative-periodic return;
- positive-width binding and retention;
- stability about an actual retained return;
- a complete action, energy, and angular ledger;
- an effective charge or mass-facing projection;
- spinor behavior and observer-level spin/magnetic recovery;
- a Standard Model or Noether sea particle role; and
- any collective six-member neutral-capture basin, retained fourteen-member
  capture branch, or ledger-complete capture-and-reorganization branch.

Plainly: F6c is a strong geometry result and a disciplined search space. It is
not yet a physical braid result.

## Appendix A — History Of Two Intersecting Tetrahedra

### The Classical Equal-Scale Compound

Two congruent regular tetrahedra in dual position form the classical
*stella octangula*, also called the compound of two tetrahedra or the stellated
octahedron. In the F6c coordinate language, this object appears at the level of
the **track centers** when

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

of one cube. One tetrahedron occupies the four vertices with one sign parity;
the other occupies the alternating four vertices. This gives three exact
derived relationships:

- the convex hull of the union is the cube;
- the six edges of each tetrahedron together form the cube's twelve face
  diagonals; and
- the intersection of the two **solid** tetrahedra is the regular octahedron
  with vertices
  \((\pm h/\sqrt 3,0,0)\), \((0,\pm h/\sqrt 3,0)\), and
  \((0,0,\pm h/\sqrt 3)\).

The cube side, tetrahedron edge, and central-octahedron edge are respectively

\[
\frac{2h}{\sqrt 3},
\qquad
h\sqrt{\frac{8}{3}},
\qquad
h\sqrt{\frac{2}{3}}.
\]

Plainly: at equal axial scale, the two four-center tetrahedra are the familiar
eight-pointed star. Its outside corners define a cube, and the region shared by
the two filled tetrahedra is an octahedron.

This is the simplest of the five regular polyhedral compounds in the standard
classification: two tetrahedra, five tetrahedra, ten tetrahedra, five cubes,
and five octahedra. “Regular” here means that the full compound's symmetry
treats vertices alike, edges alike, and faces alike; it does not merely mean
that each constituent is regular. The classical identities above agree with
the geometric summary in Wolfram MathWorld's
[Stella Octangula](https://mathworld.wolfram.com/StellaOctangula.html), while
the five-compound classification is the one catalogued by Coxeter in
*Regular Polytopes*, section 3.6.

### Before Kepler

**Historical fact.** The figure predates Johannes Kepler. Luca Pacioli included
it in the 1509 printed edition of *De divina proportione* under the name
*octaedron elevatum*. The drawings for that work were prepared by Leonardo da
Vinci. Wenzel Jamnitzer included the form in his 1568 visual study
*Perspectiva corporum regularium*. The 1509 identification is also noted in a
modern study in the
[Archive for History of Exact Sciences](https://doi.org/10.1007/s00407-024-00331-7),
and the Rijksmuseum and Smithsonian preserve catalog records for Jamnitzer's
[1568 work](https://www.rijksmuseum.nl/en/collection/object/Perspectiva-corporum-regularium--ade596df0aa4d6ea1b2710563cc86661).

Plainly: Kepler did not discover the picture from nothing. Renaissance artists
and geometers had already drawn it; his distinctive contribution was to name
and place it in a broader theory of regular and star-shaped bodies.

### Kepler's Name And The Date Disagreement

**Historical fact with a bibliographic discrepancy.** Sources agree that the
name *stella octangula* is due to Kepler, but they do not agree on whether to
date that naming to 1609 or 1611. MathWorld gives 1611. Other reference accounts
give 1609. The title page of Kepler's *Strena seu de Nive Sexangula* bears the
date 1611, visible in the
[Latin transcription](https://la.wikisource.org/wiki/Strena_seu_de_nive_sexangula).
Without a primary 1609 passage that contains the name, this appendix preserves
the discrepancy and uses **1611 as the publication-secure date**, not as proof
that no earlier manuscript use occurred.

Plainly: “Kepler, 1611” is the safer citation for the printed record. “Kepler,
1609” should remain a reported alternate date until it is tied to a specific
primary page.

### Why The Figure Belonged In Kepler's Program

The surviving works support three contexts for Kepler's interest. Calling
these his “obsessions” is a useful informal summary, but the causal link to
this particular name is a historical interpretation rather than a theorem.

1. **Polyhedra as cosmic architecture.** In *Mysterium Cosmographicum* (1596),
   Kepler nested the five Platonic solids between six planetary spheres in an
   attempt to explain the number and spacing of the known planets. The
   [Bodleian Library record](https://www.cabinet.ox.ac.uk/keplers-mysterium-cosmographicum-1596)
   documents the 1596 work and its model; the
   [Bibliotheque nationale de France](https://expositions.bnf.fr/monde-en-spheres/grand/mes_176.php)
   describes the solids as the structural framework between the planetary
   spheres. For Kepler, regular geometry therefore carried explanatory and
   theological weight, rather than serving only as decoration.

2. **Why unformed matter acquires regular shape.** *Strena seu de Nive
   Sexangula* asks why snow crystals have sixfold form. Kepler's investigation
   passes through packed equal spheres and the tetrahedral and octahedral gaps
   that such packing produces. The booklet is the origin of the sphere-packing
   problem now called the Kepler conjecture; Oxford's
   [St Edmund Hall account](https://www.seh.ox.ac.uk/blog/johannes-kepler-on-snowflakes)
   reproduces its packing diagrams, and the Mathematical Association of
   America gives a concise
   [bibliographic account](https://old.maa.org/press/periodicals/convergence/mathematical-treasure-kepler-and-sphere-packing).

3. **Stellation as a route beyond Euclid's five convex solids.** In Book II of
   *Harmonices Mundi* (1619), Kepler treated the extension of edges or faces as
   a generative geometric operation and recognized two regular star
   polyhedra. In this setting the *stella octangula* is the octahedron's only
   stellation and the cube's corresponding faceting. A historical timeline of
   this development is given in
   [Stellating and Facetting — a Brief History](https://www.steelpillow.com/polyhedra/StelFacet/history.html).

Plainly: the eight-pointed star sat at the meeting point of three Keplerian
questions: whether regular solids organize the cosmos, how matter develops
symmetry, and how regular geometry extends beyond the five convex Platonic
solids.

### Relative Twist And Later Uses

Holding one regular tetrahedron fixed and applying a rotation
\(Q\in SO(3)\) to the other produces a continuous three-parameter family of
relative orientations. Choosing one rotation axis and one angle \(\alpha\)
gives a one-parameter “twisted” slice:

\[
\{h\hat{\mathbf n}_i\}_{i=0}^{3}
\cup
\{-hQ(\alpha)\hat{\mathbf n}_i\}_{i=0}^{3}.
\]

At the dual orientation this reduces to the *stella octangula*. At a generic
twist, both constituents are still regular tetrahedra, but the compound is no
longer the regular two-tetrahedron compound: the eight vertices generally do
not have a cube as convex hull, the common solid generally is not a regular
octahedron, and the full octahedral symmetry is lost.

Plainly: twisting does not deform either tetrahedron. It changes how the two
rigid tetrahedra pass through one another, and most twist angles sacrifice the
special cube-and-octahedron relationships.

M. C. Escher made the **classical dual-position** compound prominent in modern
art. It appears in his 1948 *Stars* and is the organizing solid of his 1949
*Double Planetoid*. The Museum Escher in The Palace describes the latter as two
regular tetrahedra penetrating one another and forming one interwoven world;
see its [Double Planetoid record](https://escherinhetpaleis.nl/en/about-escher/escher-today/double-planetoid).
This evidence supports an Escher connection to the compound, but not the
stronger claim that his depicted tetrahedra belong to a generic twisted
family.

Relative twist also occurs in tensegrity and deployable-structure design, where
bars and tendons use prestress to hold selected orientations. For example,
NASA describes octahedral tensegrity subunits whose end planes carry a relative
rotation, and UC San Diego describes a vehicle made from nested tetrahedra with
controllable relative orientation; see the
[NASA technical report](https://ntrs.nasa.gov/citations/20110020432) and the
[UC San Diego robotics description](https://www.ucsdrobotics.org/tensegrity).
These are related construction ideas, not historical continuations of Kepler's
solid and not evidence for an F6c acceleration law.

### Exact Boundary Between The Classical Compound And F6c

| F6c condition or object | Relation to the historical compound |
| --- | --- |
| Track centers with \(h_+=h_-\) | Exactly the classical equal-scale *stella octangula*. |
| Track centers with \(h_+\ne h_-\) | Two concentric, oppositely oriented regular tetrahedra of unequal scale; not the classical regular compound, and their hull need not be a cube. |
| Moving architrino positions | Generally not vertices of either regular tetrahedron, even when \(h_+=h_-\), because the local track displacements deform the instantaneous member constellations. |
| F6c breathing | Changes \(h_+\) and \(h_-\) without rotating one track-center tetrahedron relative to the other. |
| A relative twist \(Q(\alpha)\) | A possible extension outside the present exact F6c chart; its invariant surface and symmetry group would require a new derivation. |
| Cube hull and octahedral intersection | Track-center reference geometry only; neither surface is a wall, binding mechanism, equilibrium certificate, or dynamical trajectory. |

Plainly: the historical star is an exact special case of the F6c **center
scaffold**, not a complete description of the eight moving architrinos. F6c
breathes the two tetrahedral scales; it does not currently twist the two
tetrahedral frames against each other.

### Historical Claim Boundary

The coordinate identities in this appendix are **derived** directly from the
F6c tetrahedral vectors. The publication dates, names, and artwork connections
are **historical reports** tied to the cited records. The three-part explanation
of Kepler's motivation is an **inference** from the themes of his works. The
connection to tensegrity is a **comparison**, not a lineage or dynamics claim.

The historical synthesis would need revision if a primary pre-1611 Kepler text
establishes the disputed 1609 naming, if the Pacioli or Jamnitzer attribution is
corrected by the cited scholarship, or if an Escher source documents a generic
relative-twist construction rather than the dual compound.

## Appendix B — Possible Relation To Spin-Foam Theory

### Governing Comparison Boundary

Spin networks and spin foams belong to loop quantum gravity, where geometry is
quantized and spacetime is not treated as a fixed background. F6c belongs to a
lower \(\mathbb{A}\mathbb{A}\mathbb{A}\) layer: eight architrinos move in a
continuous Euclidean void under delayed path-history acceleration. Therefore
spin labels, intertwiners, area spectra, Regge curvature, and spin-foam
amplitudes cannot be imported as F6c premises.

The possible relation is instead **structural and reconstructive**. Spin-foam
geometry supplies a developed mathematical language for:

- turning four closing vectors into a tetrahedral geometry;
- distinguishing local tetrahedra from consistently glued tetrahedra;
- storing relative-angle information between neighboring cells; and
- testing whether a discrete description is independent of a chosen
  triangulation.

Those are useful comparison problems for a future effective geometry derived
from F6c or larger architrino assemblies. They are not evidence that F6c is a
spin network, that its members carry quantum spins, or that the Euclidean void
is made of spin-foam cells. This follows the corpus-level treatment of spin
networks as possible effective adjacency and geometry summaries rather than
substrate ontology.

Plainly: spin-foam theory may offer good bookkeeping for geometry that emerges
from architrino assemblies. It does not replace the Master Equation or explain
why the F6c motion exists.

### Why A Four-Valent Node Represents A Tetrahedron

In a spin network dual to a tetrahedral spatial decomposition, a four-valent
node has four incident links, one for each face of a tetrahedron. Each link
carries an \(\mathrm{SU}(2)\) representation label \(j_f\), called a spin. In the
usual loop-quantum-gravity interpretation, \(j_f\) fixes a discrete face-area
eigenvalue, up to the theory's constants and conventions.

The quantum state at the node is an **intertwiner**: an invariant tensor that
combines the four link representations without leaving an unbalanced
\(\mathrm{SU}(2)\) direction. For fixed spins its state space is

\[
\mathcal H_T
=
\operatorname{Inv}
\left(
V_{j_1}\otimes V_{j_2}\otimes V_{j_3}\otimes V_{j_4}
\right).
\]

Plainly: an intertwiner is the rule that combines the four incoming quantum
labels into one rotation-invariant node state. It carries more information
than the four labels by themselves.

Classically, associate to each face a positive area \(A_f\) and outward unit
normal \(\mathbf N_f\), and define the area-normal vector

\[
\mathbf E_f=A_f\mathbf N_f.
\]

The closure constraint is

\[
\sum_{f=1}^{4}\mathbf E_f=\mathbf 0.
\]

Minkowski's polyhedron theorem says that positive face areas and outward
normals that span three dimensions and satisfy closure determine a unique
full-dimensional convex polyhedron up to translation. With four nondegenerate
faces, that polyhedron is a tetrahedron. The qualification matters: four
arbitrary vectors that sum to zero do not define a unique tetrahedron if their
directions are coplanar, repeated, or otherwise degenerate.

Plainly: multiply each face's size by the direction in which that face points.
If the resulting four arrows balance and genuinely span three dimensions,
they reconstruct one convex tetrahedron, apart from where it is placed.

The space of closed area-normal polygons with the areas fixed, modulo one
common spatial rotation, is the Kapovich–Millson shape phase space:

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

For generic fixed areas this tetrahedral shape space has two dimensions. One
may use the length of a diagonal of the closed vector polygon and a conjugate
bending angle as coordinates. Quantizing this phase space yields the
intertwiner space. Barbieri introduced the quantum-tetrahedron construction;
Baez and Barrett developed its geometric quantization; and Bianchi, Donà, and
Speziale generalized the result to arbitrary convex polyhedra. See
[Barbieri](https://arxiv.org/abs/gr-qc/9707010),
[Baez and Barrett](https://arxiv.org/abs/gr-qc/9903060), and
[Bianchi, Donà, and Speziale](https://arxiv.org/abs/1009.3402).

Plainly: the four spin labels set four face sizes, while the intertwiner stores
the remaining ways those faces can close into a three-dimensional shape. A
tetrahedron is not obtained from “four” alone; closure and nondegeneracy turn
the algebra into geometry.

### F6c Face Data Used By This Comparison

The main body derives the complete F6c-native geometry in
[Tetrahedral Faces And Orbit-Area Channels](#tetrahedral-faces-and-orbit-area-channels).
For each noncollapsed track-center sector, the four face area-normal vectors
satisfy

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

Plainly: the F6c calculation itself now establishes both pieces of face data
used here: a balanced area-and-direction vector and a signed measure of the
orbit around the axis perpendicular to that face.

The area-normal equation is a genuine Minkowski closure relation for each
regular track-center tetrahedron. The orbit-to-face expression is a separate
derived kinematic identity. Together they provide a stronger comparison object
than vertex counting alone, but they do not quantize either the face area or
the circulation.

Corresponding polarity-sector channels satisfy

\[
q_{i+}=q_{i-},
\qquad
\boldsymbol\Lambda_{i-}=-\boldsymbol\Lambda_{i+}
\]

when \(\rho_+^2\dot\theta_+=\rho_-^2\dot\theta_-\). If also \(h_+=h_-\),
the corresponding faces have equal areas and opposite area-normal vectors.
The ideal scaffold then has four abstract matched face pairs. The faces remain
spatially separated and are not shared boundary triangles.

Plainly: F6c can reproduce the algebra of equal magnitudes viewed with opposite
orientations from two sides. It still does not reproduce the topology of two
tetrahedra glued on one face.

This comparison has strict limits:

- \(A_\sigma\) and \(|q_{i\sigma}|\) are continuous F6c quantities, not measured
  quantum eigenvalues.
- A spin-network label \(j_f\) is a nonnegative representation magnitude, whereas
  \(q_{i\sigma}\) is signed. Its sign belongs with circulation orientation, not
  directly with \(j_f\).
- Neither \(|q_{i\sigma}|\) nor a function of it has been shown to be invariant,
  discrete, or related to \(A_\sigma\) by a derived action rule.
- The instantaneous moving-member faces generally depart from the regular
  scaffold faces, as quantified by the main-body member-face construction.
- No F6c variable has been shown to inhabit an intertwiner Hilbert space or a
  Kapovich–Millson quantum state space.

The defensible research hypothesis is not \(j_f=q_{i\sigma}\). It is that a
dimensionless magnitude derived from the complete F6c face-channel history
could become a \(j_f\)-like effective label, while \(s_i\) and the face normal
retain orientation information. No loop-quantum-gravity area spectrum or
quantum of action may be inserted to complete that map.

The F6c face closure and orbit channel are **derived geometry and kinematics**.
Treating corresponding sector faces as two ends of a link is a **structural
comparison**. Identifying any function of \(|q_{i\sigma}|\) with an effective
spin label is a **guess** whose proof burden is a retained complete-history
derivation. The guess fails if retained histories do not produce a
body-frame-invariant face magnitude, if the magnitude has no stable relation
to effective face area, or if the complete \(2\pi/4\pi\) transformation record
cannot be reconstructed from the face-channel data.

If a retained complete history establishes those properties, the promotion
target is the corpus treatment of
[Angular Momentum And Spin](../../../content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md).
Until then the spin-label interpretation remains in this priority-level
comparison.

### How Six Captured Orbits Could Enter A Face Calculation

The six-seat seed in the main body is naturally edge-indexed, not face-indexed.
For one tetrahedral sector, label an edge by the unordered vertex pair
\(e=\{i,j\}\). There are exactly six such pairs. A captured member associated
with that edge has body-frame path \(\boldsymbol\xi_e(T)\) and the native
orbital area-rate vector

\[
\boldsymbol\lambda_e^{\mathrm{cap}}(T)
=
\boldsymbol\xi_e(T)
\mathbin{\times}
\dot{\boldsymbol\xi}_e(T).
\]

For tetrahedral face \(f\), let \(\mathbf N_f(T)\) be its declared outward unit
normal. The edge-orbit projection into that face channel is

\[
q_{ef}^{\mathrm{cap}}(T)
=
\mathbf N_f(T)
\mathbin{\cdot}
\boldsymbol\lambda_e^{\mathrm{cap}}(T),
\qquad
e\subset\partial f,
\]

and a polarity-weighted three-edge face readout can be defined diagnostically
as

\[
Q_f^{\mathrm{cap}}(T)
=
\sum_{e\subset\partial f}p_e q_{ef}^{\mathrm{cap}}(T).
\]

These expressions use orbital circulation around the assembly center; they do
not assign intrinsic spin to an architrino. They are kinematic definitions on
a declared six-path record. A physical face observable would additionally
need a retained body-frame history, a derived normalization, and a proof that
the result is invariant under allowed member relabelings and complete-history
returns.

Plainly: a tetrahedron has six edges and four faces. Put one captured orbit on
each edge channel, then each face reads the three orbit channels around its
boundary. That creates a concrete face calculation without pretending that
six captured members are four spin-network links.

There are two distinct possible outputs:

1. **Geometric face reconstruction.** The actual instantaneous positions of
   the host and captured members may deform an effective cell. Its face edge
   lengths, areas, normals, and closure are calculated directly from those
   positions.
2. **Circulation-facing effective label.** A complete-history functional built
   from \(Q_f^{\mathrm{cap}}\), the host channel \(q_{i\sigma}\), and the face
   geometry may supply a discrete or recurrent effective label after the
   dynamics is solved.

The first route is ordinary derived geometry. The second is a research guess.
Neither route licenses setting a spin-foam label \(j_f\) equal to one captured
architrino's orbital rate. In particular, the six edge channels couple the four
face readouts because every tetrahedral edge belongs to two faces. Closure,
symmetry, and shared-edge consistency must be checked rather than fitting each
face independently.

The particle-dependent polarity inventory matters because it changes the
signed face readouts and, more importantly, changes the delayed accelerations
that determine whether the six paths exist. Two spatially identical seat
patterns with different polarity vectors are therefore different dynamical
problems. The seven inventory-count classes are only the first quotient; axis
partitions and inequivalent spatial decorations remain to be resolved.

Plainly: the polarity mixture affects both the answer read from each face and
whether the six-orbit structure survives long enough to have a meaningful
answer. Counting pluses and minuses is necessary bookkeeping, not the full
calculation.

### Why Two Glued Tetrahedra Matter

In the dual geometric picture of a spin network, a link joining two
four-valent nodes represents a triangular face shared by two tetrahedra. The
single spin on that link gives the same face area when read from either node.
The two tetrahedra nevertheless reconstruct their local shapes independently.
Equal area does not determine a triangle's three edge lengths, so the two
reconstructions can assign different intrinsic shapes to the nominally shared
triangle.

This is the central local issue in **twisted geometries**. A link carries:

- one common area;
- one face normal in the frame of each adjacent polyhedron; and
- an additional twist variable related, after the appropriate geometric
  constraints, to extrinsic curvature.

The local polyhedra may each be well defined while failing to glue into one
continuous piecewise-flat metric. **Shape-matching constraints** require the
shared triangle's full two-dimensional geometry—not only its area—to agree
from both sides. Imposing those additional relations selects Regge geometries
from the larger twisted-geometry phase space. The relevant primary sources are
[Freidel and Speziale](https://arxiv.org/abs/1001.2748) and the area-angle
formulation of [Dittrich and Speziale](https://arxiv.org/abs/0802.0864).

Plainly: two surveyors can agree that a triangular property has one acre while
disagreeing about its three boundary lengths. Spin-network kinematics ensures
the acreage; shape matching is the extra agreement needed for one actual
triangle.

The spin-foam twist variable must not be confused with either:

- the relative rigid rotation \(Q(\alpha)\) of the interpenetrating tetrahedra in
  Appendix A; or
- an F6c phase \(\theta_{i\sigma}\) around a member's local circular track.

The spin-foam quantity is a canonical link variable paired with the face area.
Only after geometric and connection constraints does it acquire the standard
extrinsic-curvature interpretation. No such canonical pairing or curvature
map has been derived for F6c.

### Gluing Versus Interpenetration

This is the decisive geometric caveat. Spin-foam tetrahedra **tile** or glue:
two neighboring tetrahedra meet on one boundary triangle and occupy opposite
sides of it. The two F6c polarity-sector tetrahedra are co-centered and
interpenetrating. They share an interior volume region when equal-scale, not a
boundary face.

At \(h_+=h_-\), the two F6c track-center tetrahedra have equal face areas and
congruent equilateral face shapes. A chosen abstract pairing of their faces
would therefore pass area and intrinsic-shape matching. But those paired faces
are not the same triangle in the Euclidean void: they lie in different planes
and do not define a glued interface. For \(h_+\ne h_-\) even the corresponding
track-center face areas differ.

Plainly: equal-scale F6c can imitate the *data equality* of two matching
regular faces, but it does not supply the shared face itself. The classical
*stella octangula* and a two-tetrahedron spin-foam cell are different
topological constructions.

### Dihedral Angles And Regge Curvature

Regge calculus approximates geometry with flat simplices and places curvature
on codimension-two hinges. In four dimensions the hinges are triangles. For
an interior triangle \(t\), the deficit angle is

\[
\epsilon_t
=
2\pi
-
\sum_{s\supset t}\Theta_t^{(s)},
\]

where \(s\) runs over the 4-simplices meeting at \(t\) and
\(\Theta_t^{(s)}\) is the four-dimensional dihedral angle between the two
tetrahedral boundary cells of \(s\) that meet on \(t\).

In three dimensions the hinges are edges, not triangles:

\[
\epsilon_e
=
2\pi
-
\sum_{\tau\supset e}\theta_e^{(\tau)},
\]

where \(\theta_e^{(\tau)}\) is the dihedral angle between two triangular faces
inside tetrahedron \(\tau\). Thus “the angle between two tetrahedra” identifies
a real primitive ingredient in four dimensions, but curvature is the complete
deficit assembled from many such angles, not any one angle. It is not the
literal three-dimensional formula.

Plainly: flat building blocks can assemble into a curved whole because the
angles around an internal hinge fail to complete one full turn. The relevant
hinge is a triangle in 4D and an edge in 3D.

F6c currently has Euclidean angles among track-center vectors and local track
frames, but no derived effective metric, simplicial complex, hinge, or deficit
angle. Calling any F6c inter-sector angle “curvature” would therefore skip the
required observer-geometry reconstruction.

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

These identities say that the simplex's dihedral-angle variations are not
independent. When the Regge action is varied, the terms containing variations
of the dihedral angles cancel simplex by simplex, leaving the variations of
the hinge measures to carry the equations of motion. Haggard, Hedeman, Kur,
and Littlejohn gave a symplectic and semiclassical interpretation for the
special case of flat three-dimensional tetrahedra in
[Symplectic and Semiclassical Aspects of the Schläfli Identity](https://arxiv.org/abs/1409.7117).

Plainly: changing the edge lengths changes all the angles together. The
Schläfli identity is the exact bookkeeping rule that prevents those linked
angle changes from being counted as independent variations.

There is no current F6c Schläfli identity. A meaningful analogue would first
require a derived assembly action and a set of effective hinge measures and
dihedral variables. The existing six-coordinate invariant-surface theorem
does not provide those objects.

### The Pachner 2–3 Move And The \(6j\) Identity

In a three-dimensional triangulation, two tetrahedra glued on one triangular
face fill a triangular bipyramid. The Pachner 2–3 move removes that internal
face and inserts the edge joining the two opposite vertices, producing three
tetrahedra around the new internal edge. The boundary of the bipyramid stays
the same:

\[
2\text{ tetrahedra sharing a face}
\quad\longleftrightarrow\quad
3\text{ tetrahedra sharing an edge}.
\]

In the Ponzano–Regge state sum, one \(6j\) symbol is associated with each
tetrahedron. The Biedenharn–Elliott, or pentagon, identity equates the product
of the two tetrahedral amplitudes with a weighted sum of products of the three
amplitudes on the other triangulation. It is therefore the algebraic statement
of the 2–3 move.

This does not by itself make every naive Ponzano–Regge sum finite or fully
triangulation-independent. The complementary 1–4 move and divergent sums
require regularization or additional hypotheses. Barrett and Naish-Guzman's
[Ponzano–Regge analysis](https://arxiv.org/abs/0803.3319) proves
triangulation independence for its defined regularized cases and explicitly
separates the valid 3–2 identity from the regularization problem.

Plainly: the 2–3 move is a consistency check saying that two different ways of
filling the same boundary give the same amplitude. The pentagon identity is
the exact algebra that makes that local check work; it is not a general proof
that every unregulated state sum is well defined.

F6c has no triangulation, \(6j\) symbol, state sum, or alternative two-versus-
three decomposition of one boundary. The Pachner move is therefore a possible
comparison for a future refinement test on a network of effective assembly
cells, not a present identity of the eight-member geometry.

### Where Four-Dimensional Spin Foams Enter

The 2–3 move above belongs to the three-dimensional Ponzano–Regge model. In a
four-dimensional simplicial spin foam, the elementary simplex is a
4-simplex. Its boundary contains five tetrahedra and ten triangular faces. A
boundary spin network assigns one spin to each triangle and one four-valent
intertwiner to each tetrahedron. A spin-foam vertex amplitude then couples the
five tetrahedral states.

The \(\mathrm{SU}(2)\) \(15j\) symbol packages this boundary data in the
four-dimensional topological model. Barrett, Fairbairn, and Hellmann showed
that, for appropriate nondegenerate boundary data and in the large-spin
regime, its phase is governed by the Regge action of a Euclidean 4-simplex;
see [Quantum gravity asymptotics from the SU(2) 15j symbol](https://arxiv.org/abs/0912.4907).
Perez's [spin-foam review](https://arxiv.org/abs/gr-qc/0301113) explains how
such state sums serve as histories between spin-network boundary states while
also documenting the unresolved four-dimensional issues.

Plainly: a three-dimensional model assigns an amplitude to each tetrahedron.
A four-dimensional model treats tetrahedra as boundary cells of a larger
4-simplex event. Mixing those two uses of “tetrahedron” hides an important
change of dimension.

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

### The Most Productive Research Direction

The closest defensible relation is not “F6c is a spin foam.” It is that
spin-foam geometry exposes an ordered set of consistency questions that a
tetrahedral effective geometry must answer:

1. **Local reconstruction:** compute face areas, normals, edge lengths, and
   volume for each instantaneous F6c member tetrahedron, not only its regular
   track-center scaffold.
2. **Orbit-to-face history:** record \(\mathbf a_{i\sigma}\),
   \(\boldsymbol\Lambda_{i\sigma}\), and \(q_{i\sigma}\) along one retained
   complete history; test cross-sector matching, body-frame invariance, and
   whether scaffold-to-member face deformation remains bounded.
3. **Interface declaration:** identify whether larger retained assemblies have
   any actual shared boundary data. Without an interface, gluing language has
   no referent.
4. **Six-member edge-to-face reconstruction:** for every declared polarity
   inventory, test the octahedral \(2+4\) seed and other symmetry-inequivalent
   six-path assignments; calculate \(q_{ef}^{\mathrm{cap}}\),
   \(Q_f^{\mathrm{cap}}\), face deformation, and complete-history return data
   without assigning a spin label.
5. **Matching:** if an interface exists, test area agreement first and full
   intrinsic shape agreement second.
6. **Conjugate angle:** derive from an action whether any relative phase or
   orientation is canonically paired with the interface measure. Do not name it
   extrinsic curvature before that derivation.
7. **Effective curvature:** reconstruct an observer-level metric and hinge
   geometry before defining deficit angles.
8. **Refinement:** only for a network of effective cells, ask whether alternate
   decompositions preserve a derived amplitude or observable.

Plainly: the spin-foam literature suggests what must be checked between
tetrahedral pieces. F6c currently establishes the first scaffold-level closure
fact and none of the later gluing, curvature, quantization, or refinement
steps. The orbit-to-face map adds exact kinematic data between scaffold closure
and any later interface claim. The captured edge-to-face construction adds a
specific six-member calculation target, but neither map by itself supplies
gluing, quantization, or a spin transformation law.

### Spin-Foam Claim Boundary

The F6c area-normal closure calculation is **derived geometry**, and the
orbit-to-face channel is **derived kinematics**. The captured edge-to-face
readout is a **kinematic definition on a proposed six-path record**, not a
measured or retained branch result. The
descriptions of intertwiners, twisted geometries, Regge calculus, Schläfli
variation, Pachner moves, and \(6j\)/\(15j\) asymptotics are **external mathematical
and model-specific results** documented by the cited primary literature. The
proposed F6c correspondences are **comparisons or research targets**, not
derived identifications.

This appendix would be falsified or materially revised by any of the following:

- an error in the F6c face-area or outward-normal calculation;
- an error in the exact orbit-area-rate or face-projection calculation;
- an inconsistency in the proposed captured edge-to-face projection or its
  shared-edge bookkeeping;
- a retained F6c or multi-assembly construction that supplies a genuine shared
  face and changes the current interpenetration-only boundary;
- an action derivation identifying an F6c variable with a canonical area-angle
  pair; or
- a proof that a proposed effective assembly network does or does not satisfy a
  declared local refinement identity.

## Local Provenance

- The owning derivation and diagnostic record is
  [Inferring Braid Requirements](inferring-braid-requirements.md#seed-f6c--polarity-resolved-breathing-tetrahedron).
- Dated campaign changes are recorded in [work-log.md](work-log.md).
- Exact return-group enumeration is implemented by
  [f6c-identity-return-group.mjs](../../../scripts/mapping-electromagnetism/f6c-identity-return-group.mjs).
- EOM coordinate reconstruction is implemented by
  [f6c-eom-coordinate-analysis.mjs](../../../scripts/mapping-electromagnetism/f6c-eom-coordinate-analysis.mjs).

Closure goal: find one root-complete nontrivial F6c return, then test whether
the symmetry-natural six-seat seed supports any root-valid collective capture
basin before attempting stability, particle identification, or effective-field
recovery.
