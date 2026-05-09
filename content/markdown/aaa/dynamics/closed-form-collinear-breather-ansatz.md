# Closed-Form Collinear Breather Ansatz

This note starts a parallel ansatz program for the 1D collinear breather. It does not replace the fixed-point proof architecture in [collinear-breather.md](./collinear-breather.md). Its purpose is to ask whether the same delayed geometry might admit a natural closed-form or closed-by-quadrature solution once the motion is decomposed by field-speed regions.

This program is optional for the existence proof. The proof does not need an elementary closed-form orbit; it needs one candidate certified cycle and a finite certificate for the return map on a closed convex tame domain.

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

The governing law for that certification is the dual-mollified absolute-time integral law from [collinear-breather.md](./collinear-breather.md). Branch-sum formulas inside this note are working reductions on simple-root charts, not replacements for the integral law through separator layers or causal folds.

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

## Piecewise Potential-Curve Ansatz

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
On each open region away from the separator, posit an effective energy equation
$$
\frac{1}{2}\dot x^2+U_{\mathcal{R}}(x;\mathcal{I}_{\mathcal{R}})=E_{\mathcal{R}},
$$
where
$$
\mathcal{I}_{\mathcal{R}}
$$
is the finite list of active causal image data on that region. A minimal potential-curve form is
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

This ansatz becomes closed by quadrature:
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

Thus the closed-form search reduces to two questions:

1. Can the active image distances
   $$
   r_p(x),
   \qquad
   r_{s,m}(x)
   $$
   be expressed algebraically on each speed class?
2. Do the separator matching laws close after one full cycle?

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

## Separator Matching Laws

At every separator time
$$
t_\Sigma
$$
where
$$
|\dot x(t_\Sigma)|=c_f,
$$
the ansatz must impose four matching conditions:

1. **position continuity**
   $$
   x(t_\Sigma^-)=x(t_\Sigma^+);
   $$
2. **velocity continuity or controlled jump**
   $$
   \dot x(t_\Sigma^+)-\dot x(t_\Sigma^-)=\Delta v_\Sigma,
   $$
   where
   $$
   \Delta v_\Sigma
   $$
   is finite in the dual-mollified model;
3. **branch-list update**
   $$
   \mathcal{I}_{\mathcal{R}^-}
   \longrightarrow
   \mathcal{I}_{\mathcal{R}^+};
   $$
4. **energy ledger update**
   $$
   E_{\mathcal{R}^+}-E_{\mathcal{R}^-}
   =
   W_\Sigma,
   $$
   where
   $$
   W_\Sigma
   $$
   is the work contributed by the finite separator layer.

If the layer is conservative after dual mollification, then
$$
W_\Sigma=0.
$$
If the path-history image list changes, then
$$
W_\Sigma
$$
may instead encode the finite caustic-transit impulse already isolated in the proof scaffold.

## What Would Count as a Successful Closed-Form Candidate

A closed-form candidate is successful only as a certificate generator. It is not a separate proof route.

A candidate closed-form breather must produce:

1. a history
   $$
   \phi_{\mathrm{cyc}}\in C^1([-h,0]);
   $$
2. a period
   $$
   T>0;
   $$
3. a finite active image list on every arc;
4. algebraic or quadrature formulas for each arc;
5. separator matching laws at every
   $$
   |\dot x|=c_f
   $$
   event;
6. a returned-history residual small enough to feed the finite certificate audit in [collinear-breather.md](./collinear-breather.md).

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

The first concrete guess should be a two-parameter family:
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

1. Derive the exact partner-root algebra for affine and constant-energy arcs, including the core-mollified force coefficient.
2. Determine whether same-side self images on each speed class reduce to a finite image list or require an infinite path-history series.
3. Write the separator matching law at
   $$
   |\dot x|=c_f
   $$
   using the dual-mollified finite impulse from the main proof scaffold.
4. Build the first four-arc quadrature orbit and compute its returned section residual.
5. If the residual can be made small or zero, compute the finite certificate data and test the four audit rows in [collinear-breather.md](./collinear-breather.md).

## Provisional Assessment

The ansatz is plausible because the partner force on a locally affine branch already collapses to a velocity-weighted inverse-square law. That is exactly the sort of structure that can generate a natural
$$
1/r
$$
potential curve.

The hard part is the same-side self-image term. If the self images collapse to a finite branch list across the field-speed separator, a closed-form or closed-by-quadrature breather is credible. If they generate an infinite non-summable path-history series, then the fixed-point envelope route remains the right primary proof strategy.

The next concrete decision is therefore not philosophical. It is algebraic: compute the self-image structure for the four-arc skeleton and see whether the branch list closes.
