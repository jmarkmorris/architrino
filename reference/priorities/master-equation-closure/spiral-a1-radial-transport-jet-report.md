# Spiral A1 Radial Transport Jet Report

Status. Sampled one-sided radial-jet diagnostic for the A1 retained-memory
tangential-transport profile. This consumes
[spiral-a1-finite-memory-transport-sampled-report](spiral-a1-finite-memory-transport-sampled-report.md)
and the `radial_jet` diagnostic mode in
[spiral_a1_finite_memory_transport.py](spiral_a1_finite_memory_transport.py).
It is not an interval certificate and does not reject every nonconstant A1
continuation.

Command:

```bash
/Users/markmorris/vibe/.venv/bin/python reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-hi 0.005 --delta-steps 2048 --integration-panels 512 --profile-mode tangential_transport --transport-steps 320 --diagnostic-mode radial_jet --jet-levels 5
```

Cross-check command on the larger collar:

```bash
/Users/markmorris/vibe/.venv/bin/python reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-hi 0.02 --delta-steps 2048 --integration-panels 256 --profile-mode tangential_transport --transport-steps 320 --diagnostic-mode radial_jet --jet-levels 7
```

Convergence wrapper smoke command:

```bash
/Users/markmorris/vibe/.venv/bin/python reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-hi 0.005 --delta-steps 1024 --integration-panels 256 --profile-mode tangential_transport --transport-steps 160 --diagnostic-mode radial_convergence --jet-levels 5 --convergence-levels 2 --refinement-factor 2
```

Endpoint-slope sensitivity command:

```bash
/Users/markmorris/vibe/.venv/bin/python reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-hi 0.005 --delta-steps 2048 --integration-panels 512 --profile-mode tangential_transport --transport-steps 320 --diagnostic-mode radial_sensitivity --sensitivity-theta 0.0003125
```

Endpoint-slope cancellation command:

```bash
/Users/markmorris/vibe/.venv/bin/python reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-hi 0.005 --delta-steps 2048 --integration-panels 512 --profile-mode tangential_transport --transport-steps 320 --past-profile endpoint_slope_cancel --diagnostic-mode radial_jet --jet-levels 5
```

Endpoint-slope cancellation convergence command:

```bash
/Users/markmorris/vibe/.venv/bin/python reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-hi 0.005 --delta-steps 1024 --integration-panels 256 --profile-mode tangential_transport --transport-steps 160 --past-profile endpoint_slope_cancel --diagnostic-mode radial_convergence --jet-levels 5 --convergence-levels 2 --refinement-factor 2
```

Endpoint-slope cancellation finite-collar command:

```bash
/Users/markmorris/vibe/.venv/bin/python reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-lo 0 --theta-hi 0.02 --theta-samples 9 --delta-steps 2048 --integration-panels 256 --profile-mode tangential_transport --transport-steps 320 --past-profile endpoint_slope_cancel --diagnostic-mode evaluate
```

## Diagnostic

After tangential transport is imposed, the cleaner radial row is the substituted
residual
$$
\mathcal R_R^{\mathrm{tr}}(\theta)
=
B_Q(\theta)
-
\Gamma(\theta)\left(s'(\theta)-s(\theta)^2-1\right)
-
s(\theta)T_Q(\theta).
$$
The one-sided radial jet is the leading Taylor behavior of this residual near
the turn center on the future transported chart:
$$
\mathcal R_R^{\mathrm{tr}}(\theta)
=
c_1\theta+O(\theta^2)
\quad(\theta>0)
$$
when the sampled dyadic slopes stabilize. The diagnostic reports
$$
D_h
=
\frac{\mathcal R_R^{\mathrm{tr}}(h)-\mathcal R_R^{\mathrm{tr}}(0)}{h}
$$
along with the retained root count, active Jacobian floor, and tangential
residual.

At the turn center, the same retained A1 constraints fix
$$
B_0=(a-1)\Gamma_\ast,
\qquad
T_0=\Gamma_\ast k_\ast,
\qquad
Q(0)=1,
\qquad
Q'_+(0)=-k_\ast=-\frac{T_0}{\Gamma_\ast}.
$$
Therefore changing `gamma_star` is not an admissible repair for the same A1
continuation; it would define a new candidate that must regenerate the past
memory profile and center rows. Differentiating the substituted radial row gives
the one-sided identity
$$
\left(\mathcal R_R^{\mathrm{tr}}\right)'_+(0)
=
B'_+(0)-(3a-2)T_0.
$$
The radial-jet diagnostic is therefore also a branch-sum derivative diagnostic:
the remaining proof target is to intervalize $B'_+(0)$ and the retained branch
conditions on the same transported chart.

The retained value and moment constraints do not, by themselves, determine the
source-side endpoint slopes $q'(\Delta_\alpha)$. Those slopes enter the
source-speed Jacobian in $B'_+(0)$. Therefore the sampled coefficient below is
fixed for the chosen polynomial witness and its forward tangential transport,
but it is not yet a class-wide obstruction for every positive $C^2$ retained
past profile.

More explicitly, if
$$
d_\alpha=\Delta'_\alpha(0)
$$
is the one-sided retained root motion, then the retained value constraints give
$$
d_\alpha
=
-
\frac{\partial_\theta\Lambda_\alpha(0,\Delta_\alpha)}
{\partial_\Delta\Lambda_\alpha(0,\Delta_\alpha)-1/b_\ast},
$$
because $Q(0)-Q(-\Delta_\alpha)=0$ removes the first memory-integral drift from
the root equation. But the source-speed factor still differentiates as
$$
\left.\frac{d}{d\theta}Q(\theta-\Delta_\alpha(\theta))\right|_{\theta=0}
=
-(1-d_\alpha)q'(\Delta_\alpha).
$$
Thus each branch contribution has the affine form
$$
B'_{\alpha,+}(0)
=
G_\alpha
-
B_\alpha\frac{J_\alpha-1}{J_\alpha}
(1-d_\alpha)q'(\Delta_\alpha),
$$
where $G_\alpha$ is the geometry-only derivative with the endpoint source-speed
factor held fixed. The theorem-grade question is therefore not only whether one
sampled profile has $c_1\ne0$, but whether the affine endpoint-slope expression
can be sign-separated over the declared admissible endpoint-slope class.

## Sampled Result

For the stricter near-turn run, the base residual at the turn center is at
quadrature scale:
$$
\mathcal R_R^{\mathrm{tr}}(0)\approx-4.706489781236556\times10^{-10},
\qquad
\mathcal R_T(0)=0.
$$
The retained chart keeps the expected active count at every sampled point:
$$
3\ \text{partner roots} + 1\ \text{self root}.
$$
The active Jacobian floor remains positive:
$$
\min |J_{\alpha,Q}|\approx1.5990335857619464.
$$

| $h$ | $\mathcal R_R^{\mathrm{tr}}(h)$ | $D_h$ |
| --- | ---: | ---: |
| $0.005$ | $3.33805190357200\times10^{-4}$ | $0.06676113220123563$ |
| $0.0025$ | $1.6932718131154514\times10^{-4}$ | $0.0677310607842093$ |
| $0.00125$ | $8.526552415536685\times10^{-5}$ | $0.06821279584347598$ |
| $0.000625$ | $4.278256369098874\times10^{-5}$ | $0.06845285494394698$ |
| $0.0003125$ | $2.142849353369697\times10^{-5}$ | $0.0685726853845603$ |

The larger-collar cross-check with `integration-panels=256` and
`transport-steps=320` gives the same near-turn slope trend:
$$
D_{0.0003125}\approx0.06857668945332851.
$$
The same smallest-step row gives
$$
B'_+(0)\approx0.07908,
\qquad
(3a-2)T_0\approx0.010529,
\qquad
B'_+(0)-(3a-2)T_0\approx0.06855,
$$
consistent with the finite-difference residual slope.

The convergence wrapper compares `integration-panels=256`,
`transport-steps=160`, `delta-steps=1024` against the doubled refinement
`integration-panels=512`, `transport-steps=320`, `delta-steps=2048` on the same
near-turn grid. It keeps the expected $3+1$ root count at both levels, reports
$$
\min |J_{\alpha,Q}|\approx1.5991338461663067,
$$
and finds adjacent-level changes bounded by
$$
\Delta_{\mathrm{level}}\mathcal R_R^{\mathrm{tr}}
\lesssim3.19\times10^{-7},
\qquad
\Delta_{\mathrm{level}}D_h\lesssim6.52\times10^{-5}.
$$

## Endpoint-Slope Sensitivity

The `radial_sensitivity` diagnostic decomposes the sampled branch-sum slope
against formal endpoint-slope coordinates. At
$\theta=0.0003125$, it reports
$$
B'_+(0)\approx0.07907822444499502,
\qquad
(3a-2)T_0\approx0.010529120029424986,
$$
and hence
$$
\left(\mathcal R_R^{\mathrm{tr}}\right)'_+(0)
\approx0.0685726853845603.
$$
The linearized endpoint-slope coefficients in the branch-sum derivative are:

| Row | Coefficient of $q'(\Delta_\alpha)$ in $B'_+(0)$ | Current $q'(\Delta_\alpha)$ | Formal single-row slope shift to cancel $\mathcal R_R^{\mathrm{tr}}{}'_+(0)$ |
| --- | ---: | ---: | ---: |
| $P_1$ | $-0.14261174129599746$ | $-0.003935409267895651$ | $0.4808347809331801$ |
| $P_2$ | $0.17728288440005283$ | $-0.0001834001718314937$ | $-0.38679811430538674$ |
| $P_3$ | $0.07272969059186842$ | $-4.092726157978177\times10^{-12}$ | $-0.9428430786178417$ |
| $S_1$ | $-0.04288351124006574$ | $-0.00015555627851426834$ | $1.5990454932825873$ |

The last column is a formal coordinate diagnostic, not a constructed profile.
It says that $B'_+(0)$ is sensitive to endpoint-slope data that the retained
moment equations have not fixed. The follow-up construction below realizes this
formal freedom at sampled level.

## Endpoint-Slope Cancellation Witness

The `endpoint_slope_cancel` past profile adds a polynomial perturbation
$$
h(x)=\sum_{n=1}^{14}a_n\left(\frac{x}{\Delta_R}\right)^n
$$
to the retained past inverse-rate witness. The equality rows preserve
$h'(0)=0$, the retained endpoint values $h(\Delta_\alpha)=0$, the retained
moment rows $\int_0^{\Delta_\alpha}h(x)\,dx=0$, and the compact tail rows
$h'(\Delta_R)=h''(\Delta_R)=0$. The final equality row imposes
$$
\sum_\alpha C_\alpha h'(\Delta_\alpha)
=
-\left(\mathcal R_R^{\mathrm{tr}}\right)'_+(0),
$$
using the endpoint-slope coefficients from the default retained witness. The
two remaining polynomial degrees are chosen by a sampled linear program that
maximizes the past-profile positivity margin on the retained interval.

The sampled degree-14 construction succeeds on the positivity grid:
$$
\min_{0\le x\le\Delta_R} q_{\mathrm{cancel}}(x)
\approx0.6519767986610532,
\qquad
\max_{0\le x\le\Delta_R} q_{\mathrm{cancel}}(x)
\approx1.5123313359089798.
$$
The endpoint and moment preservation errors are at numerical scale, with the
largest displayed tail value error about $3.36\times10^{-8}$. The weighted
endpoint-slope shift is
$$
\sum_\alpha C_\alpha h'(\Delta_\alpha)
\approx-0.06857267411399397,
$$
against the target $-0.0685726853845603$.

Running the same near-turn radial-jet diagnostic on this positive sampled
profile keeps the expected retained chart and the tangential row:
$$
\min |J_{\alpha,Q}|\approx1.5990335999362761,
\qquad
\mathcal R_T(0)\approx-8.67\times10^{-19},
\qquad
\text{expected }3+1\text{ roots: true}.
$$
The finite-difference radial slopes are reduced by roughly three orders of
magnitude relative to the default retained witness:

| $h$ | $\mathcal R_R^{\mathrm{tr}}(h)$ | $D_h$ |
| --- | ---: | ---: |
| $0.005$ | $-1.55931827917552\times10^{-5}$ | $-0.0031184011585486116$ |
| $0.0025$ | $-3.7425280558327223\times10^{-6}$ | $-0.001496540422728232$ |
| $0.00125$ | $-8.602543181508368\times10^{-7}$ | $-0.0006872618553109555$ |
| $0.000625$ | $-1.7942547587707774\times10^{-7}$ | $-0.00028519756298389654$ |
| $0.0003125$ | $-2.6235786840765607\times10^{-8}$ | $-0.00008018812105159423$ |

A tighter collar run with `theta-hi=0.001` keeps the same retained count and
tangential closure while the smallest dyadic slopes move through numerical
sampling scale, from about $-5.24\times10^{-4}$ at $h=0.001$ to about
$9.71\times10^{-5}$ at $h=0.0000625$. This is evidence that the leading affine
radial jet has been cancelled for the sampled endpoint-slope profile. It is not
an interval certificate for the whole collar and does not prove an isolated A1
orbit.

The two-level convergence wrapper on the endpoint-cancelled profile keeps
stable expected $3+1$ counts, reports
$$
\min |J_{\alpha,Q}|\approx1.59913282924246,
\qquad
\max |\mathcal R_T|\approx2.60\times10^{-18},
$$
and bounds adjacent-level changes by
$$
\Delta_{\mathrm{level}}\mathcal R_R^{\mathrm{tr}}
\lesssim2.44\times10^{-7},
\qquad
\Delta_{\mathrm{level}}D_h
\lesssim7.62\times10^{-5}.
$$
The sampled positivity margin remains about $0.652$ at both levels.

On the larger sampled future collar $[0,0.02]$, the endpoint-cancelled profile
continues to improve but does not close the radial row. The same nine-sample
finite-collar check reports
$$
\text{expected }3+1\text{ roots: true},
\qquad
\min |J_{\alpha,Q}|\approx1.5990325265875913,
\qquad
\max|\mathcal R_T|\approx6.07\times10^{-18},
$$
but leaves
$$
\max|\mathcal R_R^{\mathrm{tr}}|
\approx2.443507830688996\times10^{-4}.
$$
The endpoint-slope perturbation therefore cancels the leading jet and improves
the finite-collar residual relative to the fixed retained witness, but it is not
a finite-collar closure.

## Degree-16 Finite-Collar Radial Repair Attempt

The next bounded repair was to keep the endpoint-slope cancellation rows locked
and optimize only within their homogeneous polynomial nullspace. The implemented
mode starts from the positive endpoint-cancel seed, preserves the retained
endpoint values, retained moment rows, tail slope and curvature rows, center
slope row, and weighted endpoint-slope cancellation row, then runs a bounded
Powell search over the remaining degree-16 nullspace coordinates. Its objective
is the sampled retained-row maximum of
$|\mathcal R_R^{\mathrm{tr}}|$ on the finite collar after rebuilding the
one-sided tangential-transport profile.

Replay command for the strict check:

```sh
../.venv/bin/python reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-lo 0 --theta-hi 0.02 --theta-samples 9 --delta-steps 2048 --integration-panels 256 --profile-mode tangential_transport --transport-steps 320 --past-profile finite_collar_radial_repair --finite-collar-repair-degree 16 --finite-collar-max-nfev 24 --diagnostic-mode evaluate --pretty
```

On the low-fidelity objective grid used inside the optimizer, the degree-16
repair changed the sampled retained-row objective only from
$2.125034651562505\times10^{-4}$ to
$2.1249456523063023\times10^{-4}$. The nullspace dimension was $4$ and the best
bounded parameter vector was approximately
$(-0.504658430022713,0,0,0)$; the optimizer stopped at the requested evaluation
limit rather than finding a meaningful closure direction.

On the stricter nine-sample replay, the repaired profile still keeps the
expected $3+1$ retained-root count, reports
$$
\min |J_{\alpha,Q}|\approx1.5990317378248133,
\qquad
\max|\mathcal R_T|\approx1.73\times10^{-18},
$$
and keeps the sampled past profile bounded with
$0.7141106883264076\lesssim Q\lesssim1.400410600465848$. The radial row remains
open:
$$
\max|\mathcal R_R^{\mathrm{tr}}|
\approx2.439861159943147\times10^{-4}.
$$
This is only a marginal improvement over the endpoint-cancelled larger-collar
value $2.443507830688996\times10^{-4}$, about $3.65\times10^{-7}$ in absolute
residual. The degree-16 nullspace repair is therefore not a finite-collar
closure and gives no theorem-grade no-go by itself. It does sharpen the next
mathematical branch point: either enlarge or redesign the finite-collar repair
space in a way that changes the retained-row residual, or prove a sign/interval
obstruction showing why endpoint-slope-cancelled positive profiles cannot drive
$\mathcal R_R^{\mathrm{tr}}$ to zero on the collar.

## Degree-18 Linear-Response Follow-Up

A degree-18 version adds two more homogeneous nullspace directions while
preserving the same locked rows. The low-fidelity replay command was:

```sh
../.venv/bin/python reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-lo 0 --theta-hi 0.02 --theta-samples 5 --delta-steps 512 --integration-panels 96 --profile-mode tangential_transport --transport-steps 80 --past-profile finite_collar_radial_repair --finite-collar-repair-degree 18 --finite-collar-max-nfev 36 --finite-collar-max-iter 5 --diagnostic-mode evaluate
```

This preserves the sampled $3+1$ retained-root ledger and machine-scale
tangential transport, but again gives only a small radial improvement. The
degree-18 nullspace has dimension $6$, and the optimizer lowers the sampled
objective from
$2.1103915491651765\times10^{-4}$ to
$2.1102768870129383\times10^{-4}$. The sampled profile remains positive with
$0.7285878563170909\lesssim Q\lesssim1.3438863435173303$.

The more informative diagnostic is the finite-collar linear response:

```sh
../.venv/bin/python reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-lo 0 --theta-hi 0.02 --theta-samples 5 --delta-steps 512 --integration-panels 96 --profile-mode tangential_transport --transport-steps 80 --finite-collar-repair-degree 18 --finite-collar-samples 5 --finite-collar-integration-panels 96 --finite-collar-transport-steps 80 --finite-collar-delta-steps 512 --finite-collar-response-step 0.0001 --finite-collar-repair-bound 2.0 --diagnostic-mode finite_collar_response
```

The sampled response matrix has rank $5$ on the five collar samples, with
singular values approximately
$$
2.94\times10^{-4},\quad 7.74\times10^{-5},\quad
4.88\times10^{-5},\quad 4.32\times10^{-5},\quad
2.12\times10^{-5}.
$$
The bounded linear Chebyshev solve predicts a residual vector with
$$
\max |\mathcal R_R^{\mathrm{tr}}|_{\mathrm{linear}}
\approx2.5025568504544484\times10^{-5},
$$
but the nonlinear replay of that same Chebyshev candidate returns
$$
\max |\mathcal R_R^{\mathrm{tr}}|_{\mathrm{nonlinear}}
\approx2.110369844324743\times10^{-4}.
$$
Thus the degree-18 homogeneous directions are not simply absent: the sampled
linear response sees enough rank to attack the five-point collar residual. The
candidate step needed by that linear solve is too large for the transported
root chart's nonlinear response, with coordinates hitting the imposed repair
bounds. The next repair should therefore not be another blind high-degree
Powell sweep. It should either localize the response by continuation in smaller
trust-region steps, or convert this failure into an obstruction target for the
nonlinear transport/root map after endpoint-slope cancellation.

## Trust-Region Response Sweep

The trust-region follow-up tests whether the finite-collar response matrix gives
a useful local model at smaller nullspace-coordinate bounds. For a repair bound
$b$, define the sampled actual-versus-predicted tracking ratio
$$
\rho_{\mathrm{track}}(b)
=
\frac{
\max|\mathcal R_R^{\mathrm{tr}}|_{\mathrm{base}}
-
\max|\mathcal R_R^{\mathrm{tr}}|_{\mathrm{nonlinear}}(b)}
{
\max|\mathcal R_R^{\mathrm{tr}}|_{\mathrm{base}}
-
\max|\mathcal R_R^{\mathrm{tr}}|_{\mathrm{linear}}(b)}
}.
$$
If $\rho_{\mathrm{track}}(b)\approx1$, the nonlinear replay follows the linear
Chebyshev prediction at that scale. If $\rho_{\mathrm{track}}(b)\ll1$, the
response matrix is only a tangent-space diagnostic and does not provide a
realizable finite-collar repair at that bound.

The first sweep used the same five-sample collar and response step
$10^{-4}$:

```sh
../.venv/bin/python reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-lo 0 --theta-hi 0.02 --theta-samples 5 --delta-steps 512 --integration-panels 96 --profile-mode tangential_transport --transport-steps 80 --finite-collar-repair-degree 18 --finite-collar-samples 5 --finite-collar-integration-panels 96 --finite-collar-transport-steps 80 --finite-collar-delta-steps 512 --finite-collar-response-step 0.0001 --finite-collar-trust-bounds 0.01,0.03,0.1,0.3,1.0,2.0 --diagnostic-mode finite_collar_trust_region
```

It finds no useful local tracking. At the smallest tested bound
$b=0.01$, the linear model predicts an improvement of about
$2.89\times10^{-6}$, but nonlinear replay improves by only
$4.26\times10^{-9}$, giving
$\rho_{\mathrm{track}}\approx1.47\times10^{-3}$. The best nonlinear
level in the sweep occurs at $b=1.0$, with
$$
\max|\mathcal R_R^{\mathrm{tr}}|_{\mathrm{nonlinear}}
\approx2.1103278515697405\times10^{-4},
$$
only $6.37\times10^{-9}$ below the base five-sample value.

A second sweep checks that this is not solely a too-small finite-difference
step artifact:

```sh
../.venv/bin/python reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-lo 0 --theta-hi 0.02 --theta-samples 5 --delta-steps 512 --integration-panels 96 --profile-mode tangential_transport --transport-steps 80 --finite-collar-repair-degree 18 --finite-collar-samples 5 --finite-collar-integration-panels 96 --finite-collar-transport-steps 80 --finite-collar-delta-steps 512 --finite-collar-response-step 0.001 --finite-collar-trust-bounds 0.01,0.1,1.0,2.0 --diagnostic-mode finite_collar_trust_region
```

With response step $10^{-3}$, the response singular values shrink to about
$$
2.16\times10^{-5},\quad 1.01\times10^{-5},\quad
6.21\times10^{-6},\quad 2.86\times10^{-6},\quad 9.72\times10^{-7},
$$
showing that the sampled tangent model is step-sensitive. At $b=0.01$, the
linear predicted improvement is only $1.89\times10^{-7}$, while nonlinear replay
improves by $5.44\times10^{-9}$, giving
$\rho_{\mathrm{track}}\approx2.88\times10^{-2}$. Larger
bounds again fail to realize the linear prediction, and $b=2.0$ slightly
worsens the nonlinear replay.

This trust-region packet therefore finds no sampled scale at which the
degree-18 homogeneous nullspace gives a useful local continuation toward radial
closure. The next proof/simulation target is the nonlinear transport/root-map
obstruction itself: explain why the endpoint-slope-cancelled retained profile
class can show finite-difference rank in the collar residual while the actual
transported branch replay remains pinned near
$2.11\times10^{-4}$ on this five-sample collar.

Concretely, the next audit should compute the true first variation of the
nonlinear map
$$
p
\longmapsto
\left(\mathcal R_R^{\mathrm{tr}}(\theta_i;p)\right)_i,
$$
where $p$ are homogeneous nullspace coordinates, including the induced
variation of tangential transport $Q$, retained roots $\Delta_\alpha$, and the
substituted radial row. Comparing that variational matrix with the current
finite-difference response matrix separates two failure modes. If the true
variation loses the apparent rank, the rank-$5$ response was a sampled
finite-difference artifact. If the true variation keeps rank but line searches
still fail to track, the obstruction target becomes nonlinear integrability of
the endpoint-slope-cancelled finite-collar chart.

## Interpretation

For the fixed retained past witness and its forward tangential transport, the
radial residual does not merely appear at the endpoint of the collar. It leaves
zero immediately with a stable one-sided first-order slope, numerically
$$
c_1\approx0.0686.
$$
This remains a valid sampled obstruction to that specific witness.

The endpoint-slope construction prevents a stronger conclusion. The retained
moment and endpoint constraints cancel the first root-transport row, but they
do not fix all source-side endpoint slopes entering $B'_+(0)$. A positive
sampled degree-14 perturbation can use those endpoint slopes to cancel the
leading affine radial jet while preserving the retained moment and endpoint
rows, tangential transport, and the sampled $3+1$ retained ledger on the tested
future collar.

The active proof burden has therefore changed. A theorem-grade A1 rejection
cannot rely on the fixed-witness radial jet alone; it must sign-separate the
radial residual over a declared endpoint-slope class, including positivity,
inactive gaps, Jacobian floors, finite memory, tangential transport, and full
finite-collar radial control. The competing existence route is no longer merely
formal: it now starts from the positive sampled endpoint-slope cancellation
witness, but the first larger-collar check still leaves a residual of order
$2.44\times10^{-4}$, and the first degree-16 homogeneous nullspace repair only
lowers that value marginally. The next repair must introduce stronger
finite-collar control, or the obstruction route must prove that the retained
endpoint-slope-cancelled class cannot make the finite-collar radial row vanish.
The degree-18 response diagnostic sharpens this into a trust-region problem:
linearized nullspace control appears on the sampled collar, but the nonlinear
transport replay does not realize the predicted cancellation at the needed
bounded step. The trust-region sweep then fails to find a smaller sampled bound
where nonlinear replay tracks the linear Chebyshev prediction, so the active
target shifts from repair search toward the nonlinear transport/root-map
obstruction.
Varying
$\Gamma_\ast$ is still not a legitimate same-candidate repair because
$\Gamma_\ast$ participates in the center radial equality and the required local
angular-rate slope.

## Promotion Decision

- Ontology: none added.
- Derivation/closure target: the next A1 proof target is finite-collar radial
  repair or obstruction after endpoint-slope cancellation, including positivity,
  inactive gaps, Jacobian floors, finite memory, tangential transport, and the
  full radial residual on the same retained branch chart.
- Effective summary: the sampled obstruction has sharpened from finite-endpoint
  radial mismatch to a one-sided first-order radial-jet mismatch for the chosen
  polynomial witness, and the follow-up sampled construction shows that
  endpoint-slope freedom can cancel that leading jet inside a positive retained
  past profile. A first bounded degree-16 finite-collar repair preserves those
  rows but lowers the larger-collar radial residual only marginally. A degree-18
  response diagnostic finds sampled linear rank but failed nonlinear replay at
  the required bounded step, and trust-region sweeps at response steps
  $10^{-4}$ and $10^{-3}$ find no smaller bound with useful local tracking.
- Speculation: no global A1 no-go, isolated spiral certificate, or stability
  claim is promoted.

Promotion decision. Keep the numeric tables priority-only. A cautious
reader-facing theorem-target statement may say that the finite-collar branch
certificate must treat endpoint-slope data as part of the admissible retained
profile class: a sampled positive perturbation cancels the leading radial jet,
so the remaining A1 question is finite-collar certification or failure after
that cancellation, not a fixed-witness first-jet no-go.
