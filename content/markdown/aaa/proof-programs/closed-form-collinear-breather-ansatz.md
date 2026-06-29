# Closed-Form Collinear Breather Ansatz

Receiver-normal restart notice. Candidate ansatz packets, collocation rows, and
finite certificates are closure evidence for the canonical Master EOM only if
they carry receiver-normal branch strength. The ansatz program may reuse
history-space, root-ledger, inactive-gap, finite-memory, and source-normal
transversality structure, but every force, action, returned-history, and margin
row must be rebuilt with $W^{\mathrm{rec}}=\lvert D_t/D_s\rvert$ before
promotion.

This is a restart, not a repair pass. Earlier ansatz constants, collocation
successes, candidate cycles, or finite-certificate verdicts are not inherited as
proof steps unless they are regenerated on the current receiver-normal record.

This note starts a parallel ansatz program for the 1D collinear breather. It does not replace the fixed-point proof architecture in [collinear-breather.md](./collinear-breather.md). Its purpose is to generate certificate data for that proof program. A closed-form or closed-by-quadrature orbit is useful only insofar as it produces a candidate cycle, a branch chart, a mesh, and return residuals with strict audit slack.

This program is optional for the existence proof. The proof does not need an elementary closed-form orbit; it needs one candidate certified cycle and a finite certificate for the return map on a closed convex tame domain.

The external breather literature supplies useful terminology pressure but not a
mechanism that can be imported into this proof. In this chapter, `breather`
means a bounded delayed return-map fixed point in the collinear
$\mathbb{A}\mathbb{A}\mathbb{A}$ reduction. Standard nonlinear-wave breathers
are comparison objects; they do not replace the causal-root ledger, fold-layer
integrals, returned-history residuals, or Schauder-domain audit needed here.

Negative breather results sharpen the same rule. In a nonintegrable wave
equation, a formal expansion can be valid to all orders while the true dynamics
still leak energy and fail to contain an exact localized periodic solution. The
$\mathbb{A}\mathbb{A}\mathbb{A}$ consequence is not to import that radiation
mechanism; it is to refuse promotion from formal closure alone. A candidate
history remains approximate until fold-layer budgets, returned-history
residuals, and the closed convex self-map audit are all certified on the same
packet.

The integrable and near-integrable nonlinear Schrodinger catalogs strengthen
the terminology boundary. Their coherent profiles, Darboux constructions,
rogue-wave limits, and degenerate-breather limits depend on equation classes
and conservation structures not present in the delayed architrino law. They are
useful only as a checklist for native certification: the ansatz must declare
which variables are certificate coordinates, which limit or degeneration is
being taken, and which separator or fold layer remains bounded in the causal-root
ledger. A limit that exists only in the external equation is not an ansatz
transfer.

Perturbation nonpersistence results give the same refusal in another form. If a
candidate survives only because an exact integrable symmetry or cancellation is
kept intact, it is not a proof route for this certificate. The collinear program
must show survival under the dual-mollified delayed law itself, with leakage
channels closed by certificate rows rather than by analogy to a special wave
equation.

The same discipline applies to construction methods. A numerical enclosure,
validated quadrature orbit, or interval-collocation solve is equivalent to a
closed-form ansatz only if it produces the same finite candidate packet:
period, section/symmetry chart, representation coefficients, mesh, residual
targets, causal pre-ledger inputs, and branch-chart inputs on one certified
domain.

The state-dependent-delay periodic-orbit literature gives the methodological
reason for this rule. A periodic boundary-value problem can be reduced locally
to algebraic root finding only when the finite vector is tied to a projection
from histories and a reconstruction back into the history space. For this
collinear certificate, a residual vector is therefore not just a numerical fit:
it must record the projection/reconstruction convention, the local neighborhood
where the reduction is meant to hold, and the regularity assumptions that make
the returned history meaningful.

Collocation adds a second discipline. The piecewise polynomial is a candidate
representation of a periodic boundary-value problem, not a proof object by
itself. A collocation packet must state the subinterval partition, polynomial
degree, collocation nodes, period normalization, and section anchoring used to
remove time-translation symmetry. Mesh-node superconvergence, meaning extra
accuracy at selected nodes, is not assumed as a global bound; separator and
origin layers need interval residual bounds on cells, not only small residuals
at mesh points.

Continuation and finite auxiliary ODE constructions are useful only at the
candidate-source level. A continued branch point or auxiliary-system orbit must
reconstruct to the declared signed history, period, mesh, separator layers, and
causal-root ledger before it can feed the certificate. Nonuniform
transition-layer behavior near separators must be bounded by interval cell
estimates, not inferred from small residuals at isolated nodes.

The accepted output of this note is therefore a certificate packet
$$
\mathfrak{C}_{\mathrm{ans}}
=
\left(
\phi_{\mathrm{cyc}},
T,
\mathcal{B}_{\mathrm{act}},
\{\theta_j\}_{j=0}^{N},
\{R_j^x,R_j^v\}_{j=0}^{N}
\right)
$$
where
$$
\phi_{\mathrm{cyc}}
$$
is the candidate cycle,
$$
T
$$
is its proposed period,
$$
\mathcal{B}_{\mathrm{act}}
$$
is the finite active branch list with inactive complements, and the sampled residuals feed the finite audit in [collinear-breather.md](./collinear-breather.md).

The guiding suspicion is:

- below field speed, the active causal roots are tame and the force may reduce to a small number of effective $1/r$ phase-space curves, with conservative potential curves only as a certified special case;
- at field speed, the sorting maps become marginal and the orbit passes through a metastable separator;
- above field speed, the active branch structure changes and must be matched by explicit crossing laws rather than by one smooth formula.

If a closed-form collinear breather exists, it is likely not one elementary expression on the whole line. The more plausible object is a piecewise analytic orbit whose pieces are joined by causal matching conditions at the field-speed separators and at origin crossings.

## Status

This is an ansatz document, not a theorem. It records the first closed-form search path and the algebraic tests needed before it can feed the finite certificate program in [collinear-breather.md](./collinear-breather.md).

The target object is a candidate history
$$
\phi_{\mathrm{cyc}}
$$
because the finite Schauder audit now needs an instantiated center history, a mesh, and certificate data. A closed-form ansatz is useful exactly if it can produce that
$$
\phi_{\mathrm{cyc}}
$$
without first solving the return-map fixed point abstractly. A numerical enclosure, validated quadrature orbit, or other certified construction would serve the same proof role if it supplies the same certificate rows.

The governing law for that certification is the dual-mollified absolute-time integral law from [collinear-breather.md](./collinear-breather.md). Branch-sum formulas inside this note are working reductions on finite simple-root charts, not replacements for the integral law through separator layers or causal folds.

The first explicit velocity-class packet has sharpened this status without proving a breather. A fixed cosine candidate fails at the parent-complement part of the null-coordinate pre-ledger: after the accepted simple-root windows and fold-layer diagnostics are removed, residual equality cores remain in the parent complements. Those diagnostics are useful, but they do not authorize branch-chart construction. The next candidate source must therefore be a fresh fold-adapted collocation packet, or an equivalent certified construction, whose null-coordinate pre-ledger passes before any active branch chart is built.

## Variables and Speed Classes

Work in the same reflection-symmetric 1D reduction as the main note:
$$
x_1(t)=-x(t),
\qquad
x_2(t)=x(t)
$$
with field speed
$$
c_f>0
$$
For this ansatz it is useful to introduce the radial speed
$$
u(t)\equiv |\dot x(t)|
$$
and the field-speed shorthand
$$
v_f\equiv c_f
$$

The three speed classes are:

1. **sub-field branch**
   $$
   u(t)<v_f
   $$
2. **field-speed separator**
   $$
   u(t)=v_f
   $$
3. **super-field branch**
   $$
   u(t)>v_f
   $$

The signed sorting maps from the main proof remain the natural branch variables:
$$
w(t)=x(t)+c_f t,
\qquad
z(t)=x(t)-c_f t
$$
On an outbound right branch,
$$
\dot z(t)=\dot x(t)-c_f
$$
Thus
$$
\dot x<c_f,
\qquad
\dot x=c_f,
\qquad
\dot x>c_f
$$
mean, respectively, that
$$
z
$$
is decreasing, stationary, or increasing. The separator
$$
\dot x=c_f
$$
is therefore not merely a speed value; it is a causal sorting transition.

## Constant-Velocity Causal Algebra

The simplest way to see where a closed form might come from is to freeze the velocity locally. Suppose
$$
x(t_0)\approx x(t)-v(t-t_0),
\qquad
v=\dot x(t)
$$
For a partner hit, the causal equation is
$$
x(t)+x(t_0)=c_f(t-t_0)
$$
Writing
$$
\tau=t-t_0
$$
gives
$$
2x=(c_f+v)\tau,
\qquad
\tau_p=\frac{2x}{c_f+v}
$$
The causal partner distance is therefore
$$
r_p=c_f\tau_p=\frac{2c_f x}{c_f+v}
$$
and the source-normal denominator is
$$
D_s=c_f+v.
$$
The receiver-normal numerator is
$$
D_t=c_f-v,
$$
so the receiver-normal branch strength is
$$
W_p^{\mathrm{rec}}
=
\left|\frac{D_t}{D_s}\right|
=
\frac{c_f-v}{c_f+v}
$$
on this inbound exterior chart. Ignoring the short-distance core for a moment,
the partner force scale becomes
$$
A_p
\sim
\frac{\kappa\epsilon^2 W_p^{\mathrm{rec}}}{r_p^2}
=
\frac{\kappa\epsilon^2}{4x^2}
\left(1-\frac{v^2}{c_f^2}\right).
$$
With
$$
\beta\equiv \frac{v}{c_f},
\qquad
g\equiv \kappa\epsilon^2
$$
this reads
$$
A_p
\sim
\frac{g(1-\beta^2)}{4x^2}
$$

This is not, by itself, a conservative potential curve. The receiver-normal
affine partner row remains velocity dependent:
$$
\ddot x
=
-\frac{g}{4x^2}
\left(1-\frac{\dot x^2}{c_f^2}\right).
$$
Writing
$$
v(x)=\dot x,
\qquad
\ddot x=v\frac{dv}{dx}
$$
gives the separable phase equation
$$
\frac{v}{1-v^2/c_f^2}\,dv
=
-\frac{g}{4x^2}\,dx
$$
Hence the receiver-normal affine partner invariant is
$$
\ln\!\left(1-\frac{v^2}{c_f^2}\right)
=
-\frac{g}{2c_f^2x}+C_{\mathcal{R}}
$$
This implicit phase-space curve replaces the naive energy curve on the affine partner chart. The logarithmic term also exposes a useful topology check: in the unsoftened affine partner model, reaching
$$
v=-c_f
$$
requires
$$
x\to0
$$
Thus the inbound field-speed separator and the origin-crossing layer are tightly coupled in the bare model. The dual core scale
$$
\epsilon_c
$$
and shell width
$$
\eta
$$
soften this coincidence, but the certificate should still treat the separator and origin layer as coupled events unless interval data prove a strict separation.

The exact core-mollified version replaces
$$
x^2
$$
by the corresponding branch distance square plus
$$
\epsilon_c^2
$$
When a conservative approximation is separately certified, the candidate potential curves should use
$$
R_{\epsilon_c}(r)\equiv \sqrt{r^2+\epsilon_c^2}
$$
rather than a bare
$$
|r|
$$

### Sub-field-speed partner-only benchmark

The sub-field comparison case must be generated from the receiver-normal force
law, not prescribed as a future path. On the exterior affine partner chart
above, fix initial data
$$
x(0)=x_0>0,
\qquad
\dot x(0)=c_f\beta_0,
\qquad
-1<\beta_0\le0
$$
and evolve by
$$
\ddot x
=
-\frac{g}{4x^2}
\left(1-\frac{\dot x^2}{c_f^2}\right).
$$
A held-release preparation may still supply initial data, but the solved
fixture is purged. The held segment must now be solved from the
receiver-normal equation in
[Collinear Breather](./collinear-breather.md#held-release-restart-target)
before it can initialize this exterior chart.

With
$$
\alpha=\frac{g}{4c_f^2}
$$
the exact receiver-normal phase invariant is
$$
\ln\!\left(\frac{1-\beta^2}{1-\beta_0^2}\right)
=
-2\alpha\left(\frac{1}{x}-\frac{1}{x_0}\right),
\qquad
\beta=\frac{\dot x}{c_f}
$$
For the inbound branch,
$$
\beta_{\mathrm{in}}(x)
=
-\sqrt{
1-(1-\beta_0^2)
\exp\!\left[-2\alpha\left(\frac{1}{x}-\frac{1}{x_0}\right)\right]
}
$$
and $-1<\beta_{\mathrm{in}}(x)<0$ for every $x>0$ on the exterior chart. The
opposite sign supplies the outbound square-root branch when the same invariant
is continued away from the core layer. The branch time is recovered by
$$
t-t_0
=
\int_x^{x_0}\frac{d\xi}{-c_f\,\beta_{\mathrm{in}}(\xi)}
$$

This gives only a receiver-normal restart scaffold for a sub-field-speed
breather search. The exterior partner branch does not reach
$$
|\dot x|=c_f
$$
at any finite $x>0$. Therefore a finite-radius field-speed separator is not
produced by this receiver-normal affine partner chart. It must come from a
core-layer effect, finite shell width, nonaffine path history, a self-image
contribution, or a different certified branch chart.

The same branch also supplies an exact self-root exclusion test in the sharp-shell limit. If a candidate history satisfies
$$
|\dot x(t)|\le c_f-\sigma
\qquad
\text{on a stored interval}
$$
for some $\sigma>0$, then for all $s<t$ in that interval,
$$
|x(t)-x(s)|
\le
(c_f-\sigma)(t-s)
<
c_f(t-s)
$$
Thus the exact same-side self-hit equation has no nontrivial solution there. For finite shell width $\eta$, the possible self contribution is confined to the near-diagonal collar
$$
0<t-s\le \frac{\eta}{\sigma}
$$
and must be bounded from the dual-mollified integral law rather than inserted as an exact simple-root branch. This separates the analytic sub-field test from the field-speed fold program: the test asks whether partner attraction plus the finite-width self-collar can close a return without ever producing a true field-speed separator.

### Signed partner branch table

The local affine partner calculation should now be kept as a table of certified branch data. Work on an exterior chart
$$
x(t)=\sigma q(t),
\qquad
q(t)>0,
\qquad
\sigma\in\{-1,+1\}
$$
with radial velocity
$$
u_r(t)\equiv \dot q(t)
$$
On a locally affine same-exterior window,
$$
q(s)\approx q(t)-u_r(t)(t-s)
$$
the partner root has
$$
\tau_p=t-s=\frac{2q}{c_f+u_r},
\qquad
r_p=c_f\tau_p,
\qquad
\hat r_p=\sigma,
\qquad
D_s=c_f+u_r,
\qquad
D_t=c_f-u_r,
\qquad
W_p^{\mathrm{rec}}=\frac{c_f-u_r}{c_f+u_r}
$$
The signed partner acceleration in the
$$
x
$$
coordinate points as
$$
\operatorname{sgn}(a_p)=-\sigma
$$
that is, inward toward the origin.

| Arc chart | Radial assumptions | $\tau_p$ | $\hat r_p$ | $D_s/c_f$ | $W_p^{\mathrm{rec}}$ | Partner sign in $x$ | Validity conditions |
| --- | --- | --- | --- | --- | --- | --- | --- |
| inbound exterior | $q>0$, $u_r<0$ | $\dfrac{2q}{c_f+u_r}$ | $\sigma$ | $1+\dfrac{u_r}{c_f}$ | $\dfrac{c_f-u_r}{c_f+u_r}$ | $-\sigma$ | $c_f+u_r\ge \nu c_f$, no origin crossing inside the affine window |
| field-speed hinge | $u_r=-c_f$ | singular | $\sigma$ before the fold | $0$ | singular | fold-controlled | branch-sum form invalid; use the dual-mollified fold integral |
| origin-crossing layer | $q\lesssim \epsilon_c$ or $\sigma$ changes | not a single affine root | changes by layer | chart-dependent | chart-dependent | core-controlled | use the absolute-time integral law, not one exterior branch table |
| outbound exterior | $q>0$, $u_r>0$ | $\dfrac{2q}{c_f+u_r}$ | $\sigma$ | $1+\dfrac{u_r}{c_f}>1$ | $\dfrac{c_f-u_r}{c_f+u_r}$ | $-\sigma$ | same exterior chart and certified active root |
| apocenter sub-field | $q>0$, $|u_r|<c_f$, $u_r\to 0$ | $\dfrac{2q}{c_f+u_r}$ | $\sigma$ | near $1$ | near $1$ | $-\sigma$ | strict sub-field margin and active-root separation on the apocenter window |

This table is only the partner column of the certificate packet. The self-image columns must be produced separately because their source and receiver are the same labeled path and their active roots can change at field-speed separators.

## Why the Field-Speed Separator Matters

For same-side self hits on an affine segment,
$$
|x(t)-x(t_0)|=\|\mathbf{v}\|\tau
$$
The exact causal-isochron equation is
$$
\|\mathbf{v}\|\tau=c_f\tau
$$
For
$$
\tau>0
$$
this is possible only when
$$
\|\mathbf{v}\|=c_f
$$
Therefore a perfectly affine segment has no same-side exact self root away from the field-speed separator. Self branches appear because the real trajectory is not globally affine: acceleration, origin crossing, and later return geometry let a present point meet older path-history images.

This suggests a closed-form strategy:

1. solve sub-field and super-field segments as certified phase-space arcs, using receiver-normal phase quadrature where the branch strength remains velocity dependent;
2. treat the field-speed separator as the event where causal images are born, die, or switch branch labels;
3. impose matching laws at those separator events.

The separator is metastable in the sense that small perturbations decide whether the sorting map keeps descending, stalls, or reverses. In the dual-mollified model the separator should become a thin transition layer rather than an infinite impulse.

### Separator normal form and fold scaling

For certificate purposes, the field-speed separator is a codimension-one event surface in the reduced phase data together with an active branch label:
$$
\Sigma_{\mathcal{B}}
=
\{(x,\mathbf{v},\mathcal{B}): \|\mathbf{v}\|=c_f\}
$$
Here
$$
\mathcal{B}
$$
is part of the state description, because crossing
$$
\Sigma_{\mathcal{B}}
$$
can create, annihilate, or relabel path-history roots even when
$$
(x,v)
$$
remains continuous.

Near a separator event, the dual-mollified vector field should be treated as a regularized perturbation of the bare branch-sum field. The shell width
$$
\eta
$$
and core radius
$$
\epsilon_c
$$
are then small but fixed certificate parameters, not limiting symbols to be discarded before the impulse budget is computed.

Let
$$
g(t,s;\lambda)=0
$$
denote one signed causal-root defect on a local chart, with
$$
\lambda
$$
the transverse separator coordinate. A generic branch-topology change has the fold normal form
$$
g(t,s;\lambda)
=
a(s-s_\Sigma)^2+b\lambda
+O(|s-s_\Sigma|^3+|\lambda||s-s_\Sigma|+\lambda^2),
\qquad
ab\ne 0
$$
Thus the active-root change is a saddle-node of branch labels: two simple roots are born or annihilated as the sign of
$$
b\lambda/a
$$
changes. In the dual-mollified chart, the shell support
$$
|g|\lesssim\eta
$$
gives the fold-root thickness
$$
|s-s_\Sigma|=O(\eta^{1/2})
$$
Under a transverse passage through the fold coordinate, the unresolved fold layer has the same
$$
O(\eta^{1/2})
$$
clock-time scale after reparametrizing by the local fold coordinate. If a concrete chart uses a different clock normalization, the certificate must record the interval enclosure directly.

Consequently the fold impulse ceiling is not a free assertion. It must be supplied by an interval bound of the form
$$
|\Delta v_\Sigma|
\le
I^{\mathrm{fold}}_{\eta,\epsilon_c}
\le
C_\Sigma\eta^{1/2}
A_{\Sigma,\eta,\epsilon_c}
$$
where
$$
A_{\Sigma,\eta,\epsilon_c}
$$
is an interval upper bound for the dual-mollified acceleration on the certified fold tube and
$$
C_\Sigma
$$
is the corresponding transversality constant. The certificate may use a sharper direct quadrature bound, but it must expose the normal-form constants and the resulting finite slack.

## Piecewise Chart Ansatz

Let
$$
\mathcal{R}
\in
\{<,=,>\}
$$
denote a speed class relative to
$$
v_f
$$
On each open region away from the separator, first fix a branch chart
$$
\mathcal{I}_{\mathcal{R}}
$$
containing the active partner and self-image data. On that chart the delayed force should first be written as a phase-space law
$$
v\frac{dv}{dx}
=
F_{\mathcal{R}}(x,v;\mathcal{I}_{\mathcal{R}}),
\qquad
v=\dot x
$$
with the path-history data in
$$
\mathcal{I}_{\mathcal{R}}
$$
held fixed by the certificate.

The receiver-normal affine partner calculation gives the model row
$$
v\frac{dv}{dx}
=
-\frac{g}{4x^2}\left(1-\frac{v^2}{c_f^2}\right)
$$
with exact implicit quadrature
$$
\ln\!\left(1-\frac{v^2}{c_f^2}\right)
=
-\frac{g}{2c_f^2x}+C_{\mathcal{R}}
$$
More generally, if the certified branch chart yields a separable
receiver-normal velocity row
$$
\frac{v}{Q_{\mathcal{R}}(v)}\,dv
=
P_{\mathcal{R}}(x)\,dx
$$
the quadrature invariant is
$$
\int^v \frac{\zeta}{Q_{\mathcal{R}}(\zeta)}\,d\zeta
-
\int^x P_{\mathcal{R}}(\xi)\,d\xi
=
C_{\mathcal{R}}
$$
This is the preferred closed-form object for branch charts with
velocity-dependent receiver-normal branch strength.

A conservative potential is allowed only as a special certified reduction. The required condition is
$$
F_{\mathcal{R}}(x,v;\mathcal{I}_{\mathcal{R}})
=
-\partial_x U_{\mathcal{R}}(x;\mathcal{I}_{\mathcal{R}})
$$
with no residual
$$
v
$$
dependence after the active image data are fixed. If that identity is proved, the arc may use the energy equation
$$
\frac{1}{2}\dot x^2+U_{\mathcal{R}}(x;\mathcal{I}_{\mathcal{R}})=E_{\mathcal{R}}
$$
Absent that proof, the chart must use the receiver-normal phase invariant,
direct interval quadrature, or collocation residuals for the dual-mollified
absolute-time law.

Thus the ansatz search reduces to two questions:

1. Can the active image distances
   $$
   r_p(x),
   \qquad
   r_{s,m}(x)
   $$
   be expressed and certified on each fixed branch chart?
2. Do the separator impulse laws and returned-history residuals close after one full cycle?

## Minimal Four-Arc Breather Skeleton

A first closed-form skeleton should use four arcs:

1. **Inbound sub-field arc**
   $$
   x=x_\ast,
   \qquad
   \dot x=-u_\ast,
   \qquad
   0<u_\ast<c_f
   $$
   This arc falls toward the origin under partner attraction and controlled self-image terms.
2. **Origin-crossing layer**
   The signed coordinate changes branch. The dual core scale
   $$
   \epsilon_c
   $$
   regularizes the near-origin amplitude, and the shell width
   $$
   \eta
   $$
   regularizes the causal-isochron selection.
3. **Outbound super-field or near-field-speed arc**
   The right branch moves outward. If
   $$
   \dot x>c_f
   $$
   the sorting map
   $$
   z=x-c_f t
   $$
   reverses monotonicity and the active image list must be updated.
4. **Apocenter sub-field recapture arc**
   The branch enters
   $$
   0\le \dot x<c_f
   $$
   before turning. On this arc the partner term should dominate the outward self-image terms, producing the final turn and return to
   $$
   x=x_\ast,
   \qquad
   \dot x<0
   $$

### Velocity-class itinerary ledger

The four arc names above are a compressed return graph, not yet a complete velocity-class itinerary. Define
$$
\mathfrak{v}(t)\in
\{\mathsf{S}_{\mathrm{sub}},\mathsf{S}_{\mathrm{sep}},\mathsf{S}_{\mathrm{sup}}\}
$$
by
$$
\mathsf{S}_{\mathrm{sub}}:\ |\dot x|<c_f,
\qquad
\mathsf{S}_{\mathrm{sep}}:\ |\dot x|=c_f,
\qquad
\mathsf{S}_{\mathrm{sup}}:\ |\dot x|>c_f
$$
A full origin-crossing breather may pass through more separator events than the compressed four-arc naming suggests. The current self-image table below assumes the simple compressed itinerary in which the apocenter recapture remains sub-field after the outer separator. Before using that table as a certificate input, the ansatz packet must specify the actual itinerary.

Two admissible itinerary templates are:
$$
\mathsf{S}_{\mathrm{sub}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sup}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sub}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sup}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sub}}
$$
the doubled four-arc itinerary, and
$$
\mathsf{S}_{\mathrm{sub}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sup}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sub}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sub}}
$$
a glancing apocenter itinerary in which the path touches the separator without entering another super-field arc. These templates have different self-image tables. The certificate generator should therefore key every branch table by the chosen itinerary
$$
\mathcal{K}
$$
and its ordered interval list
$$
I_1(\mathcal{K}),\ldots,I_m(\mathcal{K})
$$

For the first certificate attempt, use the doubled four-arc itinerary. It is the generic transverse choice: every field-speed separator is treated as a simple fold event, while the glancing itinerary is reserved as a fallback if the generic branch enumeration fails or the corridor arithmetic forces a degenerate outer turn.

The periodicity condition is not merely
$$
x(T)=x(0)
$$
It is the returned-history condition
$$
P_\eta(\phi)=\phi
$$
For the closed-form ansatz, the finite approximation is to require equality on the sampled certificate mesh:
$$
P_\eta(\phi)(\theta_j)=\phi(\theta_j),
\qquad
\partial_\theta P_\eta(\phi)(\theta_j)=\dot\phi(\theta_j),
\qquad
0\le j\le N
$$

## Itinerary-Keyed Self-Image Enumeration

The decisive algebraic test is not the partner root. It is the same-path self-root equation
$$
|x(t)-x(s)|=c_f(t-s),
\qquad
s<t
$$
across the four-arc skeleton.

For the compressed four-arc itinerary, let the candidate cycle be partitioned into four time intervals:
$$
I_1=\text{inbound sub-field},
\qquad
I_2=\text{origin-crossing layer}
$$
$$
I_3=\text{outbound super-field or near-field-speed},
\qquad
I_4=\text{apocenter sub-field recapture}
$$
For any richer itinerary
$$
\mathcal{K}
$$
replace this list by
$$
I_1(\mathcal{K}),\ldots,I_m(\mathcal{K})
$$
and fill the same table over all ordered interval pairs. The sixteen-row table below is therefore not the universal branch table; it is the compressed four-arc case.

For each ordered pair
$$
(\alpha,\beta)\in\{1,2,3,4\}^2
$$
with
$$
t\in I_\alpha,
\qquad
s\in I_\beta,
\qquad
s<t
$$
solve the two signed defects
$$
g^{\pm}_{\alpha\beta}(t,s)
\equiv
\pm\bigl(x_\alpha(t)-x_\beta(s)\bigr)-c_f(t-s)
=0
$$
subject to the sign consistency condition
$$
\pm\bigl(x_\alpha(t)-x_\beta(s)\bigr)>0
$$
On an affine pair of arcs,
$$
x_\alpha(t)=a_\alpha+v_\alpha t,
\qquad
x_\beta(s)=a_\beta+v_\beta s
$$
write the orientation sign as
$$
\chi\in\{-1,+1\}
$$
The signed self-image defect is
$$
g_{\alpha\beta}^{\chi}(t,s)
=
\chi\bigl(x_\alpha(t)-x_\beta(s)\bigr)-c_f(t-s)
$$
If the source-side denominator has a certified floor
$$
\left|c_f-\chi v_\beta\right|\ge \nu_{\alpha\beta}c_f>0
$$
then the affine root is explicit:
$$
s_{\alpha\beta}^{\chi}(t)
=
\frac{(c_f-\chi v_\alpha)t-\chi(a_\alpha-a_\beta)}
{c_f-\chi v_\beta}
$$
The source Jacobian on that row is
$$
J_{\alpha\beta}^{\chi}
=
1-\frac{\chi v_\beta}{c_f}
=
\frac{c_f-\chi v_\beta}{c_f}
$$
Thus every affine self-image row reduces to interval validation of the following predicates:
$$
t\in I_\alpha,
\qquad
s_{\alpha\beta}^{\chi}(t)\in I_\beta,
\qquad
s_{\alpha\beta}^{\chi}(t)<t
$$
$$
0<t-s_{\alpha\beta}^{\chi}(t)\le h,
\qquad
\chi\bigl(x_\alpha(t)-x_\beta(s_{\alpha\beta}^{\chi}(t))\bigr)>0,
\qquad
\left|J_{\alpha\beta}^{\chi}\right|\ge \nu_{\alpha\beta}
$$
If the denominator loses its floor, the row is not a simple affine branch; it is a separator or fold row and must be certified by the dual-mollified fold normal form rather than by the branch-sum formula.

### Null-coordinate causal pre-ledger

Before running interval root validation, reduce the search by a 1D Minkowski diagnostic. Use null coordinates
$$
u(t)=c_f t-x(t),
\qquad
w(t)=c_f t+x(t)
$$
The self-image equation
$$
|x(t)-x(s)|=c_f(t-s),
\qquad
s<t
$$
splits into two exact ledgers:
$$
x(t)>x(s)
\quad\Longleftrightarrow\quad
u(t)=u(s)
$$
and
$$
x(t)<x(s)
\quad\Longleftrightarrow\quad
w(t)=w(s)
$$
Geometrically, this is just the intersection of the path with the past-directed causal cone from
$$
(x(t),c_f t)
$$
Computationally, it means that each ordered arc pair
$$
(I_\alpha,I_\beta)
$$
should be preclassified by interval ranges of
$$
u(I_\alpha),
\quad
u(I_\beta),
\quad
w(I_\alpha),
\quad
w(I_\beta)
$$
If the relevant null-coordinate ranges are disjoint, that block of the self-image table is empty before any root solve. If the ranges overlap on monotone subarcs, the root count is the number of interval-certified level crossings, and the sign of
$$
\hat r_s
$$
is already known from whether the
$$
u
$$
or
$$
w
$$
ledger is active.

This also fixes the Jacobian sign test in a coordinate-free way:
$$
J_u=\frac{d u/ds}{c_f}=1-\frac{\dot x(s)}{c_f},
\qquad
J_w=\frac{d w/ds}{c_f}=1+\frac{\dot x(s)}{c_f}
$$
The interval validator should therefore start from a causal pre-ledger with three outcomes for each block:

1. null-coordinate ranges disjoint, so the block is certified empty;
2. ranges overlap with monotone source and receiver subarcs, so the root count and sign are bounded before solving;
3. a separator or turning interval is present, so the block must be split or sent to the fold-layer certificate.

> **Target Theorem (Null-Coordinate Causal Pre-Ledger).**
> Fix a proposed velocity-class itinerary
> $$
> \mathcal{K}
> $$
> with ordered arc partition
> $$
> I_1(\mathcal{K}),\ldots,I_m(\mathcal{K})
> $$
> and a compact certificate tube around a candidate history. Suppose the interval enclosures for
> $$
> u=c_f t-x,
> \qquad
> w=c_f t+x
> $$
> split every ordered receiver-source block
> $$
> (I_\alpha,I_\beta)
> $$
> into finitely many subblocks, each of which is either range-disjoint, monotone with a positive derivative floor, or contained in a certified separator/fold layer. Then the self-image equation
> $$
> |x(t)-x(s)|=c_f(t-s),
> \qquad
> s<t,
> $$
> admits a finite causal pre-ledger
> $$
> \mathcal{L}_{\mathcal{K}}
> $$
> assigning each subblock one of three certified statuses:
> empty, simple-root, or fold-layer. Empty subblocks contain no self-image roots. Simple-root subblocks carry interval enclosures for the root count, root sign, source Jacobian floor, memory-depth range, and contribution sign. Fold-layer subblocks are excluded from branch-sum reduction until the dual-mollified fold certificate supplies a parity-preserving incoming-to-outgoing transition.
>
> The finite partition must also consume the parent-complement strips left after accepted simple-root and fold-layer subblocks have been removed. A parent-complement strip
> $$
> B
> $$
> is accepted only if it has strict null-coordinate range separation, endpoint-excluded singleton contact under the declared boundary convention, exact certified fold-layer coverage, or another already accepted same-packet complement predicate. Positive-width null-coordinate overlap, a residual equality core, or an uncertified endpoint-scale gap rejects the candidate before branch-chart certification.
>
> Completing this theorem target is the first seed-chart gate. If
> $$
> \mathcal{L}_{\mathcal{K}}
> $$
> cannot be made finite with strict empty-block gaps, monotone-block floors, and fold-layer bounds, the chosen itinerary or candidate history fails before quadrature, collocation residuals, or coupled-corridor arithmetic become relevant.

Proof route. Range-disjoint blocks are empty by direct interval separation of the relevant null coordinate. On monotone subblocks, the one-dimensional inverse function theorem and interval endpoint tests give finite level crossings, root enclosures, and the corresponding
$$
J_u
\quad
\text{or}
\quad
J_w
$$
floor. Separator and turning blocks are not forced into simple-root charts; they are routed to the fold normal form and must preserve
$$
\Delta N\in 2\mathbb{Z},
\qquad
\Delta D=0
$$
before the pre-ledger can feed the active branch chart.

For every root branch, record
$$
\hat r_s=\operatorname{sgn}(x_\alpha(t)-x_\beta(s)),
\qquad
J_s
=
1-\frac{\dot x_\beta(s)\hat r_s}{c_f}
$$
the interval of existence, and the contribution sign in the reduced equation. Also record the signed degree contribution
$$
D_{\alpha\beta}
=
\sum_{g_{\alpha\beta}^{\pm}(t,s)=0}
\operatorname{sgn} J_s
$$
with the sum taken over certified root branches on that interval pair. On a simple-root chart with a positive Jacobian floor, this degree equals the unsigned root count. Near separators it is the invariant that survives the fold.

#### Separator fold rows and the excluded diagonal

The first local repair to the affine self-image table is to keep the diagonal exclusion and the fold layer in the same calculation. Let
$$
y\in\{u,w\}
$$
be the active null coordinate near a separator source time
$$
s_\Sigma
$$
and assume a nondegenerate local maximum
$$
y'(s_\Sigma)=0,
\qquad
y''(s_\Sigma)=-\alpha,
\qquad
\alpha>0
$$
For a receiver level
$$
y(t)=y(s_\Sigma)-\lambda,
\qquad
\lambda>0
$$
the source-side fold equation has the normal form
$$
y(s)-y(t)
=
\lambda-\frac{\alpha}{2}(s-s_\Sigma)^2
+O(|s-s_\Sigma|^3)
$$
Hence the two local source branches are
$$
s_\pm(t)
=
s_\Sigma\pm\sqrt{\frac{2\lambda}{\alpha}}
+O(\lambda)
$$
Their null-coordinate Jacobians are
$$
J_y(s_\pm)
=
\frac{y'(s_\pm)}{c_f}
=
\mp\frac{\sqrt{2\alpha\lambda}}{c_f}
+O(\lambda)
$$
so the two branches carry opposite signed degree and the fold preserves
$$
\Delta D=0
$$
The memory-depth tests are
$$
0<t-s_\Sigma+\sqrt{\frac{2\lambda}{\alpha}}+O(\lambda)\le h
$$
for
$$
s_-
$$
and
$$
0<t-s_\Sigma-\sqrt{\frac{2\lambda}{\alpha}}+O(\lambda)\le h
$$
for
$$
s_+
$$
When the receiver is still on the same outgoing source arc, the
$$
s_+
$$
branch may coincide with the excluded diagonal
$$
s=t
$$
to leading order. That branch is not an accepted simple-root contribution, but it is still part of the separator fold layer. It becomes a nontrivial branch only after the receiver leaves the outgoing source arc and the memory-depth inequality becomes strict.

Applied to the simplified doubled four-arc affine check, this repairs the apparent odd branch birth at the first and third separators. At
$$
\Sigma_1
$$
the active fold is the
$$
w
$$
ledger. The pre-fold branch has positive degree and matches the nontrivial
$$
w
$$
roots that continue through the adjacent source copies; the post-fold branch has negative degree and is initially diagonal-carried before becoming the second nontrivial
$$
w
$$
root on the later receiver block. At
$$
\Sigma_3
$$
the same calculation holds in the
$$
u
$$
ledger. Thus a one-root affine row immediately after a separator is not by itself a parity violation. It is a separator fold row whose missing opposite-degree partner is carried by the excluded diagonal until it emerges into a later ordered block.

This calculation gives a concrete obstruction to using a piecewise-affine table as a complete certificate: the affine row can identify the visible simple-root branch, but it cannot certify the separator unless the fold-layer chart records the hidden diagonal-carried partner, its opposite Jacobian sign, and its memory-depth exit into a nontrivial source interval.

The enumeration deliverable is the following table, filled with exact formulas or interval-validated enclosures:

| Receiver arc $I_\alpha$ | Source arc $I_\beta$ | Root count $N$ | Signed degree $D$ | Root formula or enclosure | $\hat r_s$ | $J_s$ floor | Contribution sign | Separator jumps | Certificate status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $I_1$ | $I_1$ | target | target | target | target | target | target | target | open |
| $I_1$ | $I_2$ | target | target | target | target | target | target | target | open |
| $I_1$ | $I_3$ | target | target | target | target | target | target | target | open |
| $I_1$ | $I_4$ | target | target | target | target | target | target | target | open |
| $I_2$ | $I_1$ | target | target | target | target | target | target | target | open |
| $I_2$ | $I_2$ | target | target | target | target | target | target | target | open |
| $I_2$ | $I_3$ | target | target | target | target | target | target | target | open |
| $I_2$ | $I_4$ | target | target | target | target | target | target | target | open |
| $I_3$ | $I_1$ | target | target | target | target | target | target | target | open |
| $I_3$ | $I_2$ | target | target | target | target | target | target | target | open |
| $I_3$ | $I_3$ | target | target | target | target | target | target | target | open |
| $I_3$ | $I_4$ | target | target | target | target | target | target | target | open |
| $I_4$ | $I_1$ | target | target | target | target | target | target | target | open |
| $I_4$ | $I_2$ | target | target | target | target | target | target | target | open |
| $I_4$ | $I_3$ | target | target | target | target | target | target | target | open |
| $I_4$ | $I_4$ | target | target | target | target | target | target | target | open |

The parity check is imported from Proposition 3 in [master-equation.md](../dynamics/master-equation.md): generic folds create or annihilate one root pair, so
$$
\Delta N\in 2\mathbb{Z},
\qquad
\Delta D=0
$$
On a closed cycle the branch ledger must return to itself, hence
$$
\sum_{\Sigma}\Delta N=0,
\qquad
\sum_{\Sigma}\Delta D=0
$$
with every local unsigned jump even. This is a discrete consistency test on the ansatz. A candidate branch list that fails it should be rejected before any quadrature or collocation residual is computed.

### Causal-Root Ledger and Action Bookkeeping

The enumeration table is also the bridge to the discrete-step language in [energy.md](../dynamics/energy.md). Let
$$
N_{\alpha\beta}
$$
denote the unsigned self-root count in an itinerary-keyed row, and let
$$
M_{\alpha\beta}
$$
denote the analogous partner-root channel count supplied by the partner branch table. The pair
$$
(N_{\alpha\beta},M_{\alpha\beta})
$$
is the local causal-root ledger for that arc pair.

On a fixed simple-root chart with fixed
$$
(N_{\alpha\beta},M_{\alpha\beta},D_{\alpha\beta})
$$
the motion is still continuous and any energy or phase quadrature is ordinary continuous bookkeeping. No separate energy atom is inserted. A discrete action step enters only when a separator or fold changes the admissible integer ledger. In the raw self-root table, a generic fold changes the unsigned root count by an even jump,
$$
\Delta N\in 2\mathbb{Z}
$$
while preserving
$$
\Delta D=0
$$
When that root pair is grouped as one newly active channel for action-angle bookkeeping, the same event is recorded as one channel update. This is the sense in which an $h$-like transaction can correspond to
$$
N\to N+1
\qquad\text{or}\qquad
M\to M+1
$$
in the grouped causal-root ledger, without treating energy itself as discontinuous at the substrate level.

Thus any claimed $h$-like or $2h$-like energy step must be backed by three certificate facts: the branch-list update across the separator, the parity law for the underlying simple roots, and returned-history closure of the full cycle. This is the precise route by which continuous delayed geometry can produce discrete effective action bookkeeping.

If this table closes to a finite branch list with strict separation, memory-depth, and Jacobian floors, the ansatz can feed the finite certificate audit. If the self images do not close algebraically into a finite list, the next certificate generator should be a piecewise fractionally augmented Chebyshev or cubic
$$
C^1
$$
collocation history
$$
\phi_{\mathrm{cyc}}
$$
with interval validation of the finite active branches and the returned-history residuals. The accepted output is strict residual slack, not a compact symbolic formula.

## Separator Matching Laws

At every separator time
$$
t_\Sigma
$$
where
$$
|\dot x(t_\Sigma)|=c_f
$$
the matching law must come from the dual-mollified fold calculation rather than from an assumed conservative energy jump. Choose a fold layer
$$
[t_\Sigma-\Delta,t_\Sigma+\Delta]
$$
on which the simple-root branch-sum chart is replaced by the dual-mollified integral law. The separator impulse is
$$
\Delta v_\Sigma
=
\int_{t_\Sigma-\Delta}^{t_\Sigma+\Delta}
a^{\mathrm{fold}}_{\eta,\epsilon_c}(t)\,dt
$$

The ansatz must impose four matching conditions:

1. **position continuity**
   $$
   x(t_\Sigma^-)=x(t_\Sigma^+)
   $$
2. **controlled velocity increment across the fold layer**
   $$
   \dot x(t_\Sigma+\Delta)-\dot x(t_\Sigma-\Delta)=\Delta v_\Sigma
   $$
3. **branch-list update**
   $$
   \mathcal{I}_{\mathcal{R}^-}
   \longrightarrow
   \mathcal{I}_{\mathcal{R}^+}
   $$
4. **certificate budget update**
   $$
   |\Delta v_\Sigma|
   \le
   I^{\mathrm{fold}}_{\eta,\epsilon_c}
   $$
   where
   $$
   I^{\mathrm{fold}}_{\eta,\epsilon_c}
   $$
   is the finite caustic-transit impulse ceiling imported from the proof scaffold.

The normal-form section above makes this ceiling an auditable number. For each separator, the ansatz packet must report the local fold coefficients
$$
a,
\qquad
b
$$
the transversality constant
$$
C_\Sigma
$$
the shell and core parameters
$$
(\eta,\epsilon_c)
$$
and either the bound
$$
I^{\mathrm{fold}}_{\eta,\epsilon_c}
\le
C_\Sigma\eta^{1/2}A_{\Sigma,\eta,\epsilon_c}
$$
or a sharper interval quadrature bound over the certified fold layer. The matching law is usable only after this finite impulse estimate has strict slack against the adjacent arc budgets.

This formulation keeps the separator tied to the same estimates used in [collinear-breather.md](./collinear-breather.md). Energy constants on the adjacent arcs may still be useful bookkeeping devices, but they are not the primitive matching data at
$$
|\dot x|=c_f
$$

## Fold-Adapted Fractional Basis

Pure polynomial splines are not the preferred certificate basis near a field-speed separator. The fold normal form produces square-root source-time scaling in the simple-root reduction. In the bare fold model this gives a local hierarchy of the form
$$
\Delta v(\tau)\sim |\tau|^{1/2},
\qquad
\Delta x(\tau)\sim |\tau|^{3/2},
\qquad
\tau=t-t_\Sigma
$$
The dual mollifiers make the actual certificate function smooth at fixed
$$
(\eta,\epsilon_c)
$$
but the unsoftened fold asymptotic remains the right shape for reducing residuals and avoiding artificial derivative ringing.

Near every certified separator, use a fractionally augmented local basis
$$
\phi_{\mathrm{local}}(\tau)
=
a_0+a_1\tau+a_{3/2}|\tau|^{3/2}
+a_2\tau^2+a_{5/2}|\tau|^{5/2}+\cdots
$$
optionally multiplied by a compact blending function that hands off to the ordinary polynomial or Chebyshev basis outside the fold layer. The coefficients
$$
a_{3/2},
\qquad
a_{5/2},
\ldots
$$
are not aesthetic parameters; they encode the known separator singularity budget. The interval report should record which separator layers use the fractional basis, the layer radii, and the residual improvement against the velocity sample budget
$$
R_j^v+L_j^v r_{\mathrm{cert}}<\frac{r_{\mathrm{cert}}}{4}
$$

Away from separators, ordinary Chebyshev, cubic, or other validated bases remain acceptable. The required standard is not polynomial purity; it is strict interval slack in the returned-history residuals and the branch-chart margins.

The parent-complement obstruction gives the fresh collocation packet a concrete construction test, not merely another rejection condition. Let
$$
C(\mathbf a)=0
$$
denote the structural constraints of a candidate packet: section anchoring, symmetry, separator equations, $C^1$ matching, fold nondegeneracy, origin placement, and neutral-coordinate fixing. For each unresolved parent complement
$$
C_m=R_m\times S_m
$$
choose a signed null-coordinate gap
$$
\delta_m(\mathbf a)
$$
that is positive exactly when the receiver and source ranges are strictly separated. A useful collocation basis must admit a tangent direction
$$
DC(\mathbf a_0)\xi=0,
\qquad
D\delta_m(\mathbf a_0)\xi>0
$$
for all unresolved complements at the provisional packet
$$
\mathbf a_0
$$
Then a nearby structural candidate opens those gaps to first order, while already strict margins persist for sufficiently small deformation. This is the mathematical reason the next packet must change the null-coordinate geometry itself; refining the rejected cosine mesh cannot remove fixed-history equality collars.

## What Would Count as a Successful Closed-Form Candidate

A closed-form candidate is successful only as a certificate generator. It is not a separate proof route.

A candidate ansatz packet must produce:

1. a history
   $$
   \phi_{\mathrm{cyc}}\in C^1([-h,0])
   $$
2. a period
   $$
   T>0
   $$
3. a finite active branch list
   $$
   \mathcal{B}_{\mathrm{act}}
   $$
   on every arc, together with inactive branch complements;
4. an itinerary ledger
   $$
   \mathcal{K}
   $$
   and an itinerary-keyed self-image table with root counts, signed degrees, grouped channel counts, and separator parity jumps;
5. a symmetry chart, either apocenter-even in
   $$
   q
   $$
   or origin-crossing-odd in
   $$
   x
   $$
   together with the paired branch-label rule;
6. a neutral-coordinate audit identifying every continuous freedom that leaves the same physical certificate unchanged. At minimum this includes the removed time-shift freedom, any declared reflection or relabeling symmetry, and any ansatz parameter whose first variation is tangent to the candidate branch rather than transverse to it. In finite form, if
   $$
   \alpha^a
   $$
   are ansatz coordinates and
   $$
   Z_a(\theta)\equiv \frac{\partial \phi_{\mathrm{cyc}}(\theta;\alpha)}{\partial \alpha^a}
   $$
   then the certificate must classify each
   $$
   Z_a
   $$
   as section-fixed, symmetry-neutral, or genuinely deforming before monodromy or residual rows are interpreted;
7. a null-coordinate causal pre-ledger in
   $$
   u=c_f t-x,
   \qquad
   w=c_f t+x
   $$
   marking empty, candidate nonempty, and fold-split self-image blocks before interval root solving;
8. a certificate mesh
   $$
   \{\theta_j\}_{j=0}^{N}
   \subset[-h,0]
   $$
9. algebraic receiver-normal phase quadrature, fractionally augmented Chebyshev or cubic
   $$
   C^1
   $$
   or other interval-validated formulas for each arc;
10. separator impulse laws at every
   $$
   |\dot x|=c_f
   $$
   event, including the fold normal-form constants and finite impulse bounds;
11. a bifurcation-parameter sweep over
   $$
   (\eta,\epsilon_c,V_{\max})
   $$
   or a justified lower-dimensional slice, identifying the region where the itinerary is admissible, the required roots exist, inactive-root gaps are positive, and fold impulses are finite;
12. returned-history residuals
   $$
   R_j^x,
   \qquad
   R_j^v
   $$
   small enough to feed the finite certificate audit in [collinear-breather.md](./collinear-breather.md).

The last item is essential. A visually plausible orbit is not enough. The ansatz must produce the certificate data:
$$
\nu_{\mathrm{seed}},
\quad
\gamma_{\mathrm{gap}},
\quad
\gamma_h,
\quad
\gamma_{\mathrm{env}}
$$
the factorized corridor coefficients,
and the returned-sample residuals or boundary budgets.

### Seed-chart pre-ledger acceptance rule

The first machine-checkable gate is the null-coordinate pre-ledger, not the returned residual. For every ordered receiver-source block
$$
(I_\alpha,I_\beta)
$$
define the range gaps
$$
\Delta^u_{\alpha\beta}
=
\operatorname{dist}\!\big(u(I_\alpha),u(I_\beta)\big),
\qquad
\Delta^w_{\alpha\beta}
=
\operatorname{dist}\!\big(w(I_\alpha),w(I_\beta)\big)
$$
The row is empty when the relevant gap is strictly positive. It is a simple-root row only when the corresponding source-side derivative floor is positive:
$$
\inf_{s\in I_\beta}
\left|1-\frac{\dot x(s)}{c_f}\right|>0
\qquad
\text{for the }u\text{ ledger}
$$
or
$$
\inf_{s\in I_\beta}
\left|1+\frac{\dot x(s)}{c_f}\right|>0
\qquad
\text{for the }w\text{ ledger}
$$
Rows that satisfy neither test must be split or routed to a fold-layer certificate. A candidate
$$
\phi_{\mathrm{cyc}}
$$
does not advance to branch-chart certification while any ordered block remains unresolved.

The same acceptance rule applies to parent complements. After accepted simple-root and fold-layer subrows are removed from a parent block, every leftover parent-complement strip must be accepted by strict null-coordinate range separation, endpoint-excluded singleton contact under the declared boundary convention, exact fold-layer coverage, or another already accepted same-packet complement predicate. Any positive-width overlap, residual equality core, or uncertified endpoint-scale gap rejects the packet before branch-chart work.

At a separator row, a single visible simple root adjacent to the fold is not enough to pass the pre-ledger. The fold-layer certificate must also account for any opposite-degree branch that is temporarily carried by the excluded diagonal
$$
s=t
$$
and prove either its continued diagonal exclusion or its later strict memory-depth entry as a nontrivial source branch.

This rule makes the pre-ledger a genuine falsification gate. A failed row rejects the candidate history, the chosen split, or the itinerary before corridor arithmetic, monodromy, or returned-sample preservation is attempted. A passed pre-ledger still does not prove the breather; it only permits construction of the active branch chart with inactive complements, Jacobian floors, memory-depth ranges, and contribution signs on the same sampled domain.

## First Working Guess

Closed-by-quadrature is only one possible certificate generator. A two-parameter family is generally too small unless the cycle symmetry is built into the parametrization: the compressed skeleton has arc-junction conditions, separator impulse conditions, branch-list updates, and a returned-history residual.

The first analytic guess should therefore be at least a three-parameter family:
$$
\phi_{\mathrm{cyc}}(\theta;u_\ast,X_\ast,C_{>})
$$
where
$$
X_\ast=x_\ast,
\qquad
0<u_\ast<c_f
$$
and
$$
C_{>}
$$
is the phase-curve or shape parameter for the super-field arc. It should not be interpreted as a conservative energy unless the fixed branch chart has separately passed the potential-reduction test. In a collocation version,
$$
C_{>}
$$
is replaced by the analogous independent shape coefficient for the inner super-field segment.

On a fixed affine partner chart, the default quadrature arc is generated by the
receiver-normal phase invariant
$$
\ln\!\left(1-\frac{v^2}{c_f^2}\right)
=
-\frac{g}{2c_f^2x}+C_{\mathcal{R}},
\qquad
v=\dot x
$$
When self-image terms are included, this invariant is replaced by the corresponding certified phase quadrature or by interval collocation of the dual-mollified absolute-time law. A potential curve of the form
$$
\frac{1}{2}\dot x^2+U_{\mathcal{R}}(x)=E_{\mathcal{R}}
$$
is admissible only on a fixed branch chart where the delayed force has already been shown to be an exact
$$
-\partial_x U_{\mathcal{R}}
$$
derivative along that chart.

The more certificate-friendly parallel guess is a piecewise fractionally augmented Chebyshev or cubic
$$
C^1
$$
history with unknown coefficients
$$
\phi_{\mathrm{cyc}}(\theta;\mathbf{a})
$$
chosen by collocation against the dual-mollified absolute-time law. In that version, the active branch list and returned residuals are interval-validated directly rather than inferred from symbolic quadrature.

The first reduction should impose cycle-reversal symmetry rather than leave periodicity to unrestricted shooting. One convenient phase choice places the apocenter at
$$
\theta=0
$$
and imposes the radial condition
$$
q(-\theta)=q(\theta),
\qquad
\dot q(0)=0
$$
Equivalently, a signed-coordinate chart centered on an origin crossing may impose the odd sheet condition
$$
x(-\theta)=-x(\theta)
$$
The certificate must state which symmetry chart is used and how the branch labels pair under the symmetry. When the paired branch ledger and regularization preserve this cycle-reversal symmetry, the net-work integral cancels by parity:
$$
\oint F_{\mathrm{net}}\,dx=0
$$
If the causal-delay branch data do not pair in this way, the failure appears as a returned-history residual rather than as an adjustable energy defect. This is why the symmetry constraint belongs in the ansatz, not as a post-hoc interpretation of a numerically closed orbit.

The parameters
$$
u_\ast,
\qquad
X_\ast,
\qquad
C_{>}
$$
are then chosen so that the returned section state satisfies
$$
x(T)=x_\ast,
\qquad
\dot x(T)=-u_\ast
$$
the outer and inner separator impulses match the adjacent arcs, and the sampled history residuals are minimized. In the intended symmetric case,
$$
C_{>}
$$
is determined by separator matching from the apocenter side while
$$
u_\ast
$$
is determined by the outer separator and returned section condition.

In the strict closed-form version, the residuals vanish:
$$
R_{j,\pm}^x=0,
\qquad
R_{j,\pm}^v=0
$$
In a certificate version, they only need to satisfy
$$
R_{j,\pm}^{x}+L_j^x r_{\mathrm{cert}}<\frac{r_{\mathrm{cert}}}{4},
\qquad
R_{j,\pm}^{v}+L_j^v r_{\mathrm{cert}}<\frac{r_{\mathrm{cert}}}{4}
$$

## Immediate Derivation Tasks

1. Rebuild the sub-field analytic baseline from the receiver-normal held-release
   restart equation, the receiver-normal exterior partner branch, and the
   finite-width self-collar before accepting any field-speed separator as
   dynamically produced.
2. Complete the signed partner branch table for affine and fixed-chart arcs, including the core-mollified force coefficient and validity margins.
3. Compute the separator normal-form constants and fold-layer impulse bounds for every proposed
   $$
   |\dot x|=c_f
   $$
   event.
4. Use the doubled four-arc itinerary as the first admissible velocity-class itinerary
   $$
   \mathcal{K}
   $$
   and key the arc partition to that itinerary rather than assuming the compressed four-arc graph by default.
5. Choose the symmetry chart: apocenter-even in
   $$
   q
   $$
   or origin-crossing-odd in
   $$
   x
   $$
   and record the paired branch-label rule.
6. Build and discharge the theorem target `Null-Coordinate Causal Pre-Ledger` in
   $$
   u=c_f t-x,
   \qquad
   w=c_f t+x
   $$
   producing the finite ledger
   $$
   \mathcal{L}_{\mathcal{K}}
   $$
   with certified empty blocks, simple-root blocks, and separator/fold blocks.
6. Use
   $$
   \mathcal{L}_{\mathcal{K}}
   $$
   to fill the itinerary-keyed self-image enumeration table for
   $$
   |x(t)-x(s)|=c_f(t-s)
   $$
   on every ordered arc pair
   $$
   (I_\alpha,I_\beta)
   $$
7. Add the parity ledger
   $$
   \Delta N\in 2\mathbb{Z},
   \qquad
   \Delta D=0
   $$
   at every generic fold and verify that the closed-cycle sums vanish.
8. Record the grouped causal-root ledger
   $$
   (N,M)
   $$
   used for action bookkeeping, distinguishing it from the raw simple-root counts whenever fold pairs are grouped into one active channel.
9. If the pre-ledger or self-image table fails to close with strict finite margins, reject the current itinerary/candidate packet before attempting quadrature or collocation residuals. A fixed candidate whose parent-complement ranges retain positive-width overlap is not rescued by mesh refinement alone.
10. If the current candidate fails at that gate, instantiate a fresh fold-adapted piecewise collocation candidate, with the same-packet null-coordinate pre-ledger as its first acceptance row.
11. If the self-image table closes, convert it into
   $$
   \mathcal{B}_{\mathrm{act}}
   $$
   inactive branch complements, Jacobian floors, separation margins, and memory-depth bounds.
12. If the self-image table closes topologically but does not close algebraically, build a piecewise fractionally augmented Chebyshev or cubic
   $$
   C^1
   $$
   collocation history
   $$
   \phi_{\mathrm{cyc}}
   $$
   and certify the finite active branches numerically by interval validation.
13. Sweep
   $$
   (\eta,\epsilon_c,V_{\max})
   $$
   or a justified lower-dimensional slice to locate the itinerary-admissible parameter region before attempting the full corridor certificate.
14. Build the first certificate packet
   $$
   \mathfrak{C}_{\mathrm{ans}}
   $$
   and compute its returned section residuals.
15. If the residuals have strict slack, compute the finite certificate data and test the five audit rows in [collinear-breather.md](./collinear-breather.md).

## Provisional Assessment

The ansatz is plausible because the partner force on a locally affine branch already collapses to a velocity-weighted inverse-square law with an exact implicit phase invariant. On a fixed branch chart, that is the sort of structure that can generate a natural
$$
1/r
$$
phase-space curve; a conservative potential curve is only a special certified reduction.

The hard part is the same-side self-image term. If the self images collapse to a finite branch list across the field-speed separator, a closed-form or closed-by-quadrature certificate packet is credible. If they do not close algebraically, the next route is still productive: use a spline or collocation
$$
\phi_{\mathrm{cyc}}
$$
and certify the finite active branches numerically.

The first doubled-itinerary affine check has a sharper conclusion: the apparent odd simple-root births at the first and third separators are separator fold rows with one opposite-degree branch carried by the excluded diagonal, not completed branch-chart rows. The first fixed candidate also shows that parent-complement equality cores can remain after useful subrow and fold diagnostics are extracted. The next concrete calculation is therefore not another branch chart on that fixed candidate, but a fresh fold-adapted collocation packet whose null-coordinate pre-ledger consumes every ordered row before any branch-chart, residual, or corridor work begins. The accepted output is the finite audit packet, not an elegant formula.
