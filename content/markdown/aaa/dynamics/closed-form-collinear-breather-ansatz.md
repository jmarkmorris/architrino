# Closed-Form Collinear Breather Ansatz

This note starts a parallel ansatz program for the 1D collinear breather. It does not replace the fixed-point proof architecture in [collinear-breather.md](./collinear-breather.md). Its purpose is to generate certificate data for that proof program. A closed-form or closed-by-quadrature orbit is useful only insofar as it produces a candidate cycle, a branch chart, a mesh, and return residuals with strict audit slack.

This program is optional for the existence proof. The proof does not need an elementary closed-form orbit; it needs one candidate certified cycle and a finite certificate for the return map on a closed convex tame domain.

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
\right),
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

- below field speed, the active causal roots are tame and the force may reduce to a small number of effective $1/r$ potential curves;
- at field speed, the sorting maps become marginal and the orbit passes through a metastable separator;
- above field speed, the active branch structure changes and must be matched by explicit crossing laws rather than by one smooth formula.

If a closed-form collinear breather exists, it is likely not one elementary expression on the whole line. The more plausible object is a piecewise analytic orbit whose pieces are joined by causal matching conditions at the field-speed separators and at origin crossings.

## Status

This is an ansatz document, not a theorem. It records the first closed-form search path and the algebraic tests needed before it can feed the finite certificate program in [collinear-breather.md](./collinear-breather.md).

The target object is a candidate history
$$
\phi_{\mathrm{cyc}},
$$
because the finite Schauder audit now needs an instantiated center history, a mesh, and certificate data. A closed-form ansatz is useful exactly if it can produce that
$$
\phi_{\mathrm{cyc}}
$$
without first solving the return-map fixed point abstractly. A numerical enclosure, validated quadrature orbit, or other certified construction would serve the same proof role if it supplies the same certificate rows.

The governing law for that certification is the dual-mollified absolute-time integral law from [collinear-breather.md](./collinear-breather.md). Branch-sum formulas inside this note are working reductions on finite simple-root charts, not replacements for the integral law through separator layers or causal folds.

## Variables and Speed Classes

Work in the same reflection-symmetric 1D reduction as the main note:
$$
x_1(t)=-x(t),
\qquad
x_2(t)=x(t),
$$
with field speed
$$
c_f>0.
$$
For this ansatz it is useful to introduce the radial speed
$$
u(t)\equiv |\dot x(t)|
$$
and the field-speed shorthand
$$
v_f\equiv c_f.
$$

The three speed classes are:

1. **sub-field branch**
   $$
   u(t)<v_f;
   $$
2. **field-speed separator**
   $$
   u(t)=v_f;
   $$
3. **super-field branch**
   $$
   u(t)>v_f.
   $$

The signed sorting maps from the main proof remain the natural branch variables:
$$
w(t)=x(t)+c_f t,
\qquad
z(t)=x(t)-c_f t.
$$
On an outbound right branch,
$$
\dot z(t)=\dot x(t)-c_f.
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
v=\dot x(t).
$$
For a partner hit, the causal equation is
$$
x(t)+x(t_0)=c_f(t-t_0).
$$
Writing
$$
\tau=t-t_0,
$$
gives
$$
2x=(c_f+v)\tau,
\qquad
\tau_p=\frac{2x}{c_f+v}.
$$
The causal partner distance is therefore
$$
r_p=c_f\tau_p=\frac{2c_f x}{c_f+v},
$$
and the branch Jacobian is
$$
J_p=1+\frac{v}{c_f}.
$$
Ignoring the short-distance core for a moment, the partner force scale becomes
$$
A_p
\sim
\frac{\kappa\epsilon^2}{r_p^2J_p}
=
\frac{\kappa\epsilon^2(c_f+v)}{4c_f x^2}.
$$
With
$$
\beta\equiv \frac{v}{c_f},
\qquad
g\equiv \kappa\epsilon^2,
$$
this reads
$$
A_p
\sim
\frac{g(1+\beta)}{4x^2}.
$$

This is the first hint of a potential-curve description. On any branch where
$$
\beta
$$
is constant or slowly varying, the partner attraction behaves like the derivative of an effective
$$
-\frac{\mu_p(\beta)}{x}
$$
potential, with
$$
\mu_p(\beta)=\frac{g(1+\beta)}{4}.
$$

The exact core-mollified version replaces
$$
x^2
$$
by the corresponding branch distance square plus
$$
\epsilon_c^2.
$$
Thus the candidate potential curves should use
$$
R_{\epsilon_c}(r)\equiv \sqrt{r^2+\epsilon_c^2}
$$
rather than a bare
$$
|r|.
$$

### Signed partner branch table

The local affine partner calculation should now be kept as a table of certified branch data. Work on an exterior chart
$$
x(t)=\sigma q(t),
\qquad
q(t)>0,
\qquad
\sigma\in\{-1,+1\},
$$
with radial velocity
$$
u_r(t)\equiv \dot q(t).
$$
On a locally affine same-exterior window,
$$
q(s)\approx q(t)-u_r(t)(t-s),
$$
the partner root has
$$
\tau_p=t-s=\frac{2q}{c_f+u_r},
\qquad
r_p=c_f\tau_p,
\qquad
\hat r_p=\sigma,
\qquad
J_p=1+\frac{u_r}{c_f}.
$$
The signed partner acceleration in the
$$
x
$$
coordinate points as
$$
\operatorname{sgn}(a_p)=-\sigma,
$$
that is, inward toward the origin.

| Arc chart | Radial assumptions | $\tau_p$ | $\hat r_p$ | $J_p$ | Partner sign in $x$ | Validity conditions |
| --- | --- | --- | --- | --- | --- | --- |
| inbound exterior | $q>0$, $u_r<0$ | $\dfrac{2q}{c_f+u_r}$ | $\sigma$ | $1+\dfrac{u_r}{c_f}$ | $-\sigma$ | $c_f+u_r\ge \nu c_f$, no origin crossing inside the affine window |
| field-speed hinge | $u_r=-c_f$ | singular | $\sigma$ before the fold | $0$ | fold-controlled | branch-sum form invalid; use the dual-mollified fold integral |
| origin-crossing layer | $q\lesssim \epsilon_c$ or $\sigma$ changes | not a single affine root | changes by layer | chart-dependent | core-controlled | use the absolute-time integral law, not one exterior branch table |
| outbound exterior | $q>0$, $u_r>0$ | $\dfrac{2q}{c_f+u_r}$ | $\sigma$ | $1+\dfrac{u_r}{c_f}>1$ | $-\sigma$ | same exterior chart and certified active root |
| apocenter sub-field | $q>0$, $|u_r|<c_f$, $u_r\to 0$ | $\dfrac{2q}{c_f+u_r}$ | $\sigma$ | near $1$ | $-\sigma$ | strict sub-field margin and active-root separation on the apocenter window |

This table is only the partner column of the certificate packet. The self-image columns must be produced separately because their source and receiver are the same labeled path and their active roots can change at field-speed separators.

## Why the Field-Speed Separator Matters

For same-side self hits on an affine segment,
$$
|x(t)-x(t_0)|=|v|\tau.
$$
The exact causal shell equation is
$$
|v|\tau=c_f\tau.
$$
For
$$
\tau>0,
$$
this is possible only when
$$
|v|=c_f.
$$
Therefore a perfectly affine segment has no same-side exact self root away from the field-speed separator. Self branches appear because the real trajectory is not globally affine: acceleration, origin crossing, and later return geometry let a present point meet older path-history images.

This suggests a closed-form strategy:

1. solve sub-field and super-field segments as effective potential-curve arcs;
2. treat the field-speed separator as the event where causal images are born, die, or switch branch labels;
3. impose matching laws at those separator events.

The separator is metastable in the sense that small perturbations decide whether the sorting map keeps descending, stalls, or reverses. In the dual-mollified model the separator should become a thin transition layer rather than an infinite impulse.

## Piecewise Chart Ansatz

Let
$$
\mathcal{R}
\in
\{<,=,>\}
$$
denote a speed class relative to
$$
v_f.
$$
On each open region away from the separator, first fix a branch chart
$$
\mathcal{I}_{\mathcal{R}}
$$
containing the active partner and self-image data. Only after that chart is fixed may one try to replace the delayed force by an effective potential. The required condition is
$$
F_{\mathcal{R}}(x;\mathcal{I}_{\mathcal{R}})
=
-\partial_x U_{\mathcal{R}}(x;\mathcal{I}_{\mathcal{R}})
$$
along the chart, with the path-history data in
$$
\mathcal{I}_{\mathcal{R}}
$$
held fixed by the certificate.

If that derivative identity is proved, the arc may be represented by an effective energy equation
$$
\frac{1}{2}\dot x^2+U_{\mathcal{R}}(x;\mathcal{I}_{\mathcal{R}})=E_{\mathcal{R}},
$$
with a minimal potential-curve form
$$
U_{\mathcal{R}}(x;\mathcal{I}_{\mathcal{R}})
=
-\frac{\mu_{p,\mathcal{R}}}{R_{\epsilon_c}(r_p(x))}
+
\sum_{m\in\mathcal{I}_{s,\mathcal{R}}}
\sigma_m
\frac{\mu_{s,m,\mathcal{R}}}{R_{\epsilon_c}(r_{s,m}(x))}.
$$
Here:

- the partner term is inward and carries negative potential sign;
- each same-side self image carries a sign
  $$
  \sigma_m
  \in\{-1,+1\}
  $$
  depending on whether it contributes inward or outward in the signed branch convention;
- the image distances
  $$
  r_p(x),
  \qquad
  r_{s,m}(x)
  $$
  are determined by the causal root equations on that branch;
- the coefficients
  $$
  \mu_{p,\mathcal{R}},
  \qquad
  \mu_{s,m,\mathcal{R}}
  $$
  absorb the causal Jacobian factors.

This chart ansatz becomes closed by quadrature:
$$
t-t_i
=
\pm
\int_{x_i}^{x}
\frac{d\xi}{
\sqrt{2\left(E_{\mathcal{R}}-U_{\mathcal{R}}(\xi;\mathcal{I}_{\mathcal{R}})\right)}
}.
$$
The field-speed separator radii are the roots of
$$
2\left(E_{\mathcal{R}}-U_{\mathcal{R}}(x;\mathcal{I}_{\mathcal{R}})\right)
=
c_f^2.
$$

If the delayed force on a chart is not an exact derivative of a one-variable potential, the chart can still be used for certification. In that case the arc should be represented directly by a collocation or validated ODE residual for the dual-mollified absolute-time law rather than by a conservative energy curve.

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
   0<u_\ast<c_f.
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
   regularizes the causal-shell selection.
3. **Outbound super-field or near-field-speed arc**
   The right branch moves outward. If
   $$
   \dot x>c_f,
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
   \dot x<0.
   $$

The periodicity condition is not merely
$$
x(T)=x(0).
$$
It is the returned-history condition
$$
P_\eta(\phi)=\phi.
$$
For the closed-form ansatz, the finite approximation is to require equality on the sampled certificate mesh:
$$
P_\eta(\phi)(\theta_j)=\phi(\theta_j),
\qquad
\partial_\theta P_\eta(\phi)(\theta_j)=\dot\phi(\theta_j),
\qquad
0\le j\le N.
$$

## Four-Arc Self-Image Enumeration

The decisive algebraic test is not the partner root. It is the same-path self-root equation
$$
|x(t)-x(s)|=c_f(t-s),
\qquad
s<t,
$$
across the four-arc skeleton.

Let the candidate cycle be partitioned into four time intervals:
$$
I_1=\text{inbound sub-field},
\qquad
I_2=\text{origin-crossing layer},
$$
$$
I_3=\text{outbound super-field or near-field-speed},
\qquad
I_4=\text{apocenter sub-field recapture}.
$$
For each ordered pair
$$
(\alpha,\beta)\in\{1,2,3,4\}^2,
$$
with
$$
t\in I_\alpha,
\qquad
s\in I_\beta,
\qquad
s<t,
$$
solve the two signed defects
$$
g^{\pm}_{\alpha\beta}(t,s)
\equiv
\pm\bigl(x_\alpha(t)-x_\beta(s)\bigr)-c_f(t-s)
=0,
$$
subject to the sign consistency condition
$$
\pm\bigl(x_\alpha(t)-x_\beta(s)\bigr)>0.
$$
For every root branch, record
$$
\hat r_s=\operatorname{sgn}(x_\alpha(t)-x_\beta(s)),
\qquad
J_s
=
1-\frac{\dot x_\beta(s)\hat r_s}{c_f},
$$
the interval of existence, and the contribution sign in the reduced equation.

The enumeration deliverable is the following table, filled with exact formulas or interval-validated enclosures:

| Receiver arc $I_\alpha$ | Source arc $I_\beta$ | Root count | Root formula or enclosure | $\hat r_s$ | $J_s$ floor | Contribution sign | Certificate status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| $I_1$ | $I_1$ | target | target | target | target | target | open |
| $I_1$ | $I_2$ | target | target | target | target | target | open |
| $I_1$ | $I_3$ | target | target | target | target | target | open |
| $I_1$ | $I_4$ | target | target | target | target | target | open |
| $I_2$ | $I_1$ | target | target | target | target | target | open |
| $I_2$ | $I_2$ | target | target | target | target | target | open |
| $I_2$ | $I_3$ | target | target | target | target | target | open |
| $I_2$ | $I_4$ | target | target | target | target | target | open |
| $I_3$ | $I_1$ | target | target | target | target | target | open |
| $I_3$ | $I_2$ | target | target | target | target | target | open |
| $I_3$ | $I_3$ | target | target | target | target | target | open |
| $I_3$ | $I_4$ | target | target | target | target | target | open |
| $I_4$ | $I_1$ | target | target | target | target | target | open |
| $I_4$ | $I_2$ | target | target | target | target | target | open |
| $I_4$ | $I_3$ | target | target | target | target | target | open |
| $I_4$ | $I_4$ | target | target | target | target | target | open |

If this table closes to a finite branch list with strict separation, memory-depth, and Jacobian floors, the ansatz can feed the finite certificate audit. If the self images do not close algebraically into a finite list, the next certificate generator should be a piecewise Chebyshev or cubic
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
|\dot x(t_\Sigma)|=c_f,
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
a^{\mathrm{fold}}_{\eta,\epsilon_c}(t)\,dt.
$$

The ansatz must impose four matching conditions:

1. **position continuity**
   $$
   x(t_\Sigma^-)=x(t_\Sigma^+);
   $$
2. **controlled velocity increment across the fold layer**
   $$
   \dot x(t_\Sigma+\Delta)-\dot x(t_\Sigma-\Delta)=\Delta v_\Sigma,
   $$
3. **branch-list update**
   $$
   \mathcal{I}_{\mathcal{R}^-}
   \longrightarrow
   \mathcal{I}_{\mathcal{R}^+};
   $$
4. **certificate budget update**
   $$
   |\Delta v_\Sigma|
   \le
   I^{\mathrm{fold}}_{\eta,\epsilon_c},
   $$
   where
   $$
   I^{\mathrm{fold}}_{\eta,\epsilon_c}
   $$
   is the finite caustic-transit impulse ceiling imported from the proof scaffold.

This formulation keeps the separator tied to the same estimates used in [collinear-breather.md](./collinear-breather.md). Energy constants on the adjacent arcs may still be useful bookkeeping devices, but they are not the primitive matching data at
$$
|\dot x|=c_f.
$$

## What Would Count as a Successful Closed-Form Candidate

A closed-form candidate is successful only as a certificate generator. It is not a separate proof route.

A candidate ansatz packet must produce:

1. a history
   $$
   \phi_{\mathrm{cyc}}\in C^1([-h,0]);
   $$
2. a period
   $$
   T>0;
   $$
3. a finite active branch list
   $$
   \mathcal{B}_{\mathrm{act}}
   $$
   on every arc, together with inactive branch complements;
4. a certificate mesh
   $$
   \{\theta_j\}_{j=0}^{N}
   \subset[-h,0];
   $$
5. algebraic, quadrature, Chebyshev, cubic
   $$
   C^1,
   $$
   or other interval-validated formulas for each arc;
6. separator impulse laws at every
   $$
   |\dot x|=c_f
   $$
   event;
7. returned-history residuals
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
\gamma_{\mathrm{env}},
$$
the factorized corridor coefficients,
and the returned-sample residuals or boundary budgets.

## First Working Guess

Closed-by-quadrature is only one possible certificate generator. The first analytic guess may be a two-parameter family:
$$
\phi_{\mathrm{cyc}}(\theta;u_\ast,X_\ast),
$$
where
$$
X_\ast=x_\ast,
\qquad
0<u_\ast<c_f,
$$
and each arc is generated by a potential curve of the form
$$
\frac{1}{2}\dot x^2
-
\frac{\mu_{p,\mathcal{R}}}{R_{\epsilon_c}(r_p(x))}
+
\frac{\mu_{s,\mathcal{R}}}{R_{\epsilon_c}(r_s(x))}
=
E_{\mathcal{R}}.
$$
This form is admissible only on a fixed branch chart where the delayed force has already been shown to be an exact
$$
-\partial_x U_{\mathcal{R}}
$$
derivative along that chart.

The more certificate-friendly parallel guess is a piecewise Chebyshev or cubic
$$
C^1
$$
history with unknown coefficients
$$
\phi_{\mathrm{cyc}}(\theta;\mathbf{a}),
$$
chosen by collocation against the dual-mollified absolute-time law. In that version, the active branch list and returned residuals are interval-validated directly rather than inferred from symbolic quadrature.

The parameters
$$
u_\ast,
\qquad
X_\ast
$$
are then chosen so that the returned section state satisfies
$$
x(T)=x_\ast,
\qquad
\dot x(T)=-u_\ast,
$$
and the sampled history residuals are minimized.

In the strict closed-form version, the residuals vanish:
$$
R_{j,\pm}^x=0,
\qquad
R_{j,\pm}^v=0.
$$
In a certificate version, they only need to satisfy
$$
R_{j,\pm}^{x}+L_j^x r_{\mathrm{cert}}<\frac{r_{\mathrm{cert}}}{4},
\qquad
R_{j,\pm}^{v}+L_j^v r_{\mathrm{cert}}<\frac{r_{\mathrm{cert}}}{4}.
$$

## Immediate Derivation Tasks

1. Complete the signed partner branch table for affine and fixed-chart arcs, including the core-mollified force coefficient and validity margins.
2. Fill the four-arc self-image enumeration table for
   $$
   |x(t)-x(s)|=c_f(t-s)
   $$
   on every ordered arc pair
   $$
   (I_\alpha,I_\beta).
   $$
3. If the self-image table closes, convert it into
   $$
   \mathcal{B}_{\mathrm{act}},
   $$
   inactive branch complements, Jacobian floors, separation margins, and memory-depth bounds.
4. If the self-image table does not close algebraically, build a piecewise Chebyshev or cubic
   $$
   C^1
   $$
   collocation history
   $$
   \phi_{\mathrm{cyc}}
   $$
   and certify the finite active branches numerically by interval validation.
5. Write the separator impulse law at
   $$
   |\dot x|=c_f
   $$
   using the dual-mollified finite fold impulse from the main proof scaffold.
6. Build the first certificate packet
   $$
   \mathfrak{C}_{\mathrm{ans}}
   $$
   and compute its returned section residuals.
7. If the residuals have strict slack, compute the finite certificate data and test the four audit rows in [collinear-breather.md](./collinear-breather.md).

## Provisional Assessment

The ansatz is plausible because the partner force on a locally affine branch already collapses to a velocity-weighted inverse-square law. On a fixed branch chart, that is the sort of structure that can generate a natural
$$
1/r
$$
potential curve.

The hard part is the same-side self-image term. If the self images collapse to a finite branch list across the field-speed separator, a closed-form or closed-by-quadrature certificate packet is credible. If they do not close algebraically, the next route is still productive: use a spline or collocation
$$
\phi_{\mathrm{cyc}}
$$
and certify the finite active branches numerically.

The next concrete decision is therefore algebraic: compute the self-image structure for the four-arc skeleton and see whether the branch list closes. The accepted output is the finite audit packet, not an elegant formula.
