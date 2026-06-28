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
VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-hi 0.005 --delta-steps 2048 --integration-panels 512 --profile-mode tangential_transport --transport-steps 320 --diagnostic-mode radial_jet --jet-levels 5
```

Cross-check command on the larger collar:

```bash
VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-hi 0.02 --delta-steps 2048 --integration-panels 256 --profile-mode tangential_transport --transport-steps 320 --diagnostic-mode radial_jet --jet-levels 7
```

Convergence wrapper smoke command:

```bash
VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-hi 0.005 --delta-steps 1024 --integration-panels 256 --profile-mode tangential_transport --transport-steps 160 --diagnostic-mode radial_convergence --jet-levels 5 --convergence-levels 2 --refinement-factor 2
```

Endpoint-slope sensitivity command:

```bash
VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-hi 0.005 --delta-steps 2048 --integration-panels 512 --profile-mode tangential_transport --transport-steps 320 --diagnostic-mode radial_sensitivity --sensitivity-theta 0.0003125
```

Endpoint-slope cancellation command:

```bash
VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-hi 0.005 --delta-steps 2048 --integration-panels 512 --profile-mode tangential_transport --transport-steps 320 --past-profile endpoint_slope_cancel --diagnostic-mode radial_jet --jet-levels 5
```

Endpoint-slope cancellation convergence command:

```bash
VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-hi 0.005 --delta-steps 1024 --integration-panels 256 --profile-mode tangential_transport --transport-steps 160 --past-profile endpoint_slope_cancel --diagnostic-mode radial_convergence --jet-levels 5 --convergence-levels 2 --refinement-factor 2
```

Endpoint-slope cancellation finite-collar command:

```bash
VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-lo 0 --theta-hi 0.02 --theta-samples 9 --delta-steps 2048 --integration-panels 256 --profile-mode tangential_transport --transport-steps 320 --past-profile endpoint_slope_cancel --diagnostic-mode evaluate
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

## Variational Response Audit

The follow-up variational-response audit treats the central-difference response
matrices
$$
M_h
\approx
D_p\left(\mathcal R_R^{\mathrm{tr}}(\theta_i;p)\right)
$$
as numerical objects that must pass a step-stability test before their rank can
be read as a true first variation. A real local repair direction requires
stable matrices $M_h$, stable singular values and singular subspaces above the
numerical floor, and small-bound nonlinear replay with
$\rho_{\mathrm{track}}\approx1$. If the matrices are step-unstable, the
finite-difference rank is not yet a theorem-grade or repair-grade tangent
direction. If the matrices are stable but replay still fails, the failure mode
shifts to nonlinear integrability of the endpoint-slope-cancelled chart.

Audit command:

```sh
../.venv/bin/python reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-lo 0 --theta-hi 0.02 --theta-samples 5 --delta-steps 512 --integration-panels 96 --profile-mode tangential_transport --transport-steps 80 --finite-collar-repair-degree 18 --finite-collar-samples 5 --finite-collar-integration-panels 96 --finite-collar-transport-steps 80 --finite-collar-delta-steps 512 --finite-collar-variation-steps 1e-5,3e-5,0.0001,0.0003,0.001 --finite-collar-variation-bound 0.01 --diagnostic-mode finite_collar_variational_audit
```

The audit reports
`stable_response_matrix=false` and `useful_tracking=false`. Adjacent response
matrices change by relative Frobenius factors
$$
1.1036,\quad1.0322,\quad0.9164,\quad1.0885,
$$
far above the diagnostic stability tolerance $0.25$. The singular scale also
collapses across the tested central-difference steps: the largest singular
value is about $1.395\times10^{-3}$ at $h=10^{-5}$, but only about
$2.164\times10^{-5}$ at $h=10^{-3}$.

| $h$ | $\|M_h\|_F$ | Largest singular value | $\rho_{\mathrm{track}}(0.01)$ |
| --- | ---: | ---: | ---: |
| $10^{-5}$ | $1.6469\times10^{-3}$ | $1.3950\times10^{-3}$ | $3.98\times10^{-4}$ |
| $3\times10^{-5}$ | $6.0234\times10^{-4}$ | $5.4144\times10^{-4}$ | $8.06\times10^{-4}$ |
| $10^{-4}$ | $3.1137\times10^{-4}$ | $2.9372\times10^{-4}$ | $1.47\times10^{-3}$ |
| $3\times10^{-4}$ | $8.0399\times10^{-5}$ | $7.6304\times10^{-5}$ | $-5.90\times10^{-6}$ |
| $10^{-3}$ | $2.4841\times10^{-5}$ | $2.1637\times10^{-5}$ | $2.88\times10^{-2}$ |

This separates the current failure mode. The apparent degree-18 rank-$5$
finite-collar response is not stable enough to count as the first variation of
the nonlinear transport/root map on this low-fidelity chart, and the poor
tracking ratios prevent reading the Chebyshev solve as a local continuation.
The next target is therefore not another bounded repair search in the same
finite-difference basis. It is a noise-controlled variational backend: tighten
transport, integration, and root-solve tolerances or derive the tangent
transport/root equations directly, then repeat the matrix-stability and
small-bound tracking tests.

## Variational Refinement Smoke Audit

A first solver-noise wrapper keeps the same collar samples and response steps
but scales the transport, quadrature, and root-grid knobs across refinement
levels. The diagnostic intentionally treats the whole variational-response audit
as the unit under refinement, so it measures total numerical sensitivity rather
than isolating one solver component.

Smoke command:

```sh
../.venv/bin/python reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-lo 0 --theta-hi 0.02 --theta-samples 5 --delta-steps 256 --integration-panels 64 --profile-mode tangential_transport --transport-steps 60 --finite-collar-repair-degree 18 --finite-collar-samples 5 --finite-collar-integration-panels 64 --finite-collar-transport-steps 60 --finite-collar-delta-steps 256 --finite-collar-variation-steps 0.0001,0.001 --finite-collar-variation-bound 0.01 --convergence-levels 2 --refinement-factor 2 --diagnostic-mode finite_collar_variational_refinement_audit
```

The fixed-step response scale is reasonably stable across this two-level
refinement smoke: the maximum cross-level Frobenius change is about
$0.0722$, the maximum largest-singular-value change is about $0.0716$, and the
base finite-collar residual changes by about $0.0601$. This weakly rules out a
single-level transport or quadrature glitch as the whole explanation for the
response signal.

That does not reopen continuation. Within each level, the response remains
step-unstable:
$$
\|M_{10^{-4}}\|_F\approx3.06\times10^{-4},
\qquad
\|M_{10^{-3}}\|_F\approx2.23\times10^{-5}
$$
on the coarse level, and
$$
\|M_{10^{-4}}\|_F\approx2.85\times10^{-4},
\qquad
\|M_{10^{-3}}\|_F\approx2.07\times10^{-5}
$$
after refinement. Both levels therefore keep
`stable_response_matrix=false`. Small-bound tracking also remains unusable:
the coarse-level tracking ratios are about $2.71\times10^{-4}$ and
$2.91\times10^{-2}$, while the refined-level ratios are negative, about
$-3.21\times10^{-3}$ and $-3.55\times10^{-2}$.

This smoke result narrows the next target. The finite-difference response is
not merely a one-level solver-fidelity accident, but its scale still depends
strongly on the finite-difference step and does not produce replay tracking.
The next mathematical artifact should be either a fuller noise-floor study of
the central-difference probes or, preferably, an analytic tangent equation for
the coupled tangential-transport, retained-root, and substituted radial-row
variation.

## Analytic Tangent Equation Target

The next priority-only mathematical artifact is the tangent system for the map
$$
p
\longmapsto
\left(\mathcal R_R^{\mathrm{tr}}(\theta_i;p)\right)_i
$$
on the endpoint-slope-cancelled finite-collar chart. Here $p$ denotes a
homogeneous nullspace coordinate in the retained polynomial past profile. The
unknown tangent fields are
$$
\delta Q(\theta)=\left.\frac{d}{d\varepsilon}
Q(\theta;p+\varepsilon v)\right|_{\varepsilon=0},
\qquad
\delta\Delta_\alpha(\theta)=
\left.\frac{d}{d\varepsilon}
\Delta_\alpha(\theta;p+\varepsilon v)\right|_{\varepsilon=0},
$$
for each retained row $\alpha$. The past segment $\delta Q(\theta)$ for
$\theta<0$ is fixed by the chosen homogeneous polynomial direction; the future
segment $\theta>0$ must be solved by the linearized tangential-transport
equation.

For each retained row, the root equation is
$$
\Phi_\alpha(\theta,\Delta,Q)
=
\Lambda_\alpha(\theta,\Delta)
-
\frac{1}{b_\ast\sigma(\theta)}
\int_{\theta-\Delta}^{\theta} Q(u)\,du
=0.
$$
At fixed $\theta$, its tangent row is
$$
\left(
\partial_\Delta\Lambda_\alpha
-
\frac{Q(\theta-\Delta_\alpha)}{b_\ast\sigma(\theta)}
\right)
\delta\Delta_\alpha
=
\frac{1}{b_\ast\sigma(\theta)}
\int_{\theta-\Delta_\alpha}^{\theta}\delta Q(u)\,du.
$$
This is the retained-root motion equation that the finite-difference response
was approximating implicitly.

The future tangential transport is
$$
Q'
=
2A\sin\theta\,Q
-
\frac{Q^3}{\Gamma_\ast\sigma(\theta)^3}T_Q,
\qquad
T_Q=\sum_\alpha T_\alpha.
$$
Therefore the tangent transport equation is
$$
\delta Q'
=
2A\sin\theta\,\delta Q
-
\frac{3Q^2T_Q}{\Gamma_\ast\sigma^3}\delta Q
-
\frac{Q^3}{\Gamma_\ast\sigma^3}\delta T_Q,
$$
with $\delta Q(0)=0$ for the retained homogeneous directions that preserve the
center value. Each branch variation should be evaluated from the executable
branch expression
$$
T_\alpha
=
\frac{N^T_\alpha(\theta,\Delta_\alpha)}
\Lambda_\alpha(\theta,\Delta_\alpha)^3\,|J_\alpha|},
\qquad
B_\alpha
=
\frac{N^R_\alpha(\theta,\Delta_\alpha)}
\Lambda_\alpha(\theta,\Delta_\alpha)^3\,|J_\alpha|},
$$
so that
$$
\delta T_Q=\sum_\alpha\delta T_\alpha,
\qquad
\delta B_Q=\sum_\alpha\delta B_\alpha
$$
include both $\delta\Delta_\alpha$ and the source-value term
$\delta Q(\theta-\Delta_\alpha)$ inside $J_\alpha$.

Finally, the substituted radial row is
$$
\mathcal R_R^{\mathrm{tr}}
=
B_Q
-
\Gamma(\theta)(A\cos\theta-A^2\sin^2\theta-1)
-
A\sin\theta\,T_Q,
\qquad
\Gamma(\theta)=\Gamma_\ast\frac{\sigma(\theta)^3}{Q(\theta)^2}.
$$
The analytic response vector should therefore be assembled from
$$
\delta\mathcal R_R^{\mathrm{tr}}
=
\delta B_Q
-
A\sin\theta\,\delta T_Q
+
2\Gamma(\theta)(A\cos\theta-A^2\sin^2\theta-1)
\frac{\delta Q(\theta)}{Q(\theta)}.
$$

Validation criterion. The analytic tangent backend is not accepted merely
because it produces a matrix. It must reproduce a stable response matrix above
the numerical floor, match finite differences only on a demonstrated stable
step window, and produce small-bound nonlinear replay with
$\rho_{\mathrm{track}}\approx1$ before it can reopen finite-collar continuation.
If the analytic tangent matrix is stable but every admissible tangent direction
fails positivity, inactive gaps, Jacobian floors, finite memory, tangential
transport, the $3+1$ retained ledger, or radial-residual reduction, the target
becomes a true tangent obstruction rather than a numerical artifact.

## Semi-Analytic Tangent Backend Smoke

The first semi-analytic tangent backend implements the linearized retained-root
motion, linearized tangential transport, branch-sum variations, and substituted
radial-row variation. It remains sampled support rather than an interval
certificate because the branch partial derivatives are still evaluated
numerically in the local branch coordinates.

Outcome gate. The backend has three priority-only outcomes. If it agrees with
finite differences on a stable step window and nonlinear replay tracks, A1
finite-collar continuation reopens as a repair-grade tangent problem. If it
agrees with finite differences but replay still fails, the target shifts to
nonlinear integrability of the endpoint-slope-cancelled chart. If it disagrees
with finite differences after solver-noise controls, the previous
finite-difference rank remains a numerical artifact and the response diagnostic must
be replaced before another repair search.

Smoke command at the same five-sample collar and response step used by the
degree-18 finite-difference response packet:

```sh
../.venv/bin/python reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-lo 0 --theta-hi 0.02 --theta-samples 5 --delta-steps 512 --integration-panels 96 --profile-mode tangential_transport --transport-steps 80 --finite-collar-repair-degree 18 --finite-collar-samples 5 --finite-collar-integration-panels 96 --finite-collar-transport-steps 80 --finite-collar-delta-steps 512 --finite-collar-response-step 0.0001 --finite-collar-variation-bound 0.01 --diagnostic-mode finite_collar_analytic_tangent
```

The semi-analytic matrix is effectively zero at the diagnostic rank floor
$10^{-9}$:
$$
\|M_{\mathrm{tan}}\|_F\approx6.12\times10^{-12},
\qquad
\sigma(M_{\mathrm{tan}})
\approx
(5.92\times10^{-12},1.53\times10^{-12},9.85\times10^{-15},
4.03\times10^{-16},7.53\times10^{-19}).
$$
By contrast, the profile-level central-difference matrix at $h=10^{-4}$ has
effective rank $5$ at the same floor:
$$
\|M_{\mathrm{fd}}\|_F\approx3.11\times10^{-4},
\qquad
\sigma(M_{\mathrm{fd}})
\approx
(2.94\times10^{-4},7.74\times10^{-5},4.88\times10^{-5},
4.32\times10^{-5},2.12\times10^{-5}).
$$
The relative Frobenius mismatch is about $1.0$, so the semi-analytic tangent
does not agree with the finite-difference response. The analytic Chebyshev
solve predicts only
$$
\Delta_{\mathrm{pred}}\approx6.74\times10^{-14},
$$
below the declared tracking-improvement floor, so its large displayed
tracking ratio is not meaningful. Nonlinear replay improves the residual by
only about $1.09\times10^{-9}$ and remains at
$$
\max|\mathcal R_R^{\mathrm{tr}}|\approx2.11038\times10^{-4}.
$$

This selects the third outcome in the gate. The previous rank-$5$
finite-difference response is not reproduced by the semi-analytic tangent
backend and remains classified as a numerical response artifact. The next
implementation target is not a repair search; it is a response-diagnostic
replacement or audit that explains why profile-level central differences
produce $O(10^{-4})$ columns while the coupled tangent equations produce no
effective first-order finite-collar control.

## Response-Noise Replacement Audit

The replacement audit compares profile-level central differences $M_h$ against
the semi-analytic tangent matrix $M_{\mathrm{tan}}$ across response steps and
adds a policy gate: profile-level finite-difference columns may be used for a
repair search only if they match the analytic tangent on a stable response-step
window and then produce meaningful nonlinear replay tracking.

Audit command at the same five-sample collar:

```sh
../.venv/bin/python reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-lo 0 --theta-hi 0.02 --theta-samples 5 --delta-steps 512 --integration-panels 96 --profile-mode tangential_transport --transport-steps 80 --finite-collar-repair-degree 18 --finite-collar-samples 5 --finite-collar-integration-panels 96 --finite-collar-transport-steps 80 --finite-collar-delta-steps 512 --finite-collar-response-steps 0.0001,0.001 --finite-collar-variation-bound 0.01 --diagnostic-mode finite_collar_response_noise_audit
```

The audit classifies the old response as
`finite_difference_noise_artifact`. The analytic tangent remains effective rank
$0$ with
$$
\|M_{\mathrm{tan}}\|_F\approx6.12\times10^{-12}.
$$
The finite-difference matrices remain effective rank $5$, but their scale is
not step-stable:

| $h$ | $\|M_h\|_F$ | $h\|M_h\|_F$ | Relative mismatch to $M_{\mathrm{tan}}$ | $\rho_{\mathrm{track}}$ |
| --- | ---: | ---: | ---: | ---: |
| $10^{-4}$ | $3.1137\times10^{-4}$ | $3.1137\times10^{-8}$ | $1.0000000027$ | $1.47\times10^{-3}$ |
| $10^{-3}$ | $2.4841\times10^{-5}$ | $2.4841\times10^{-8}$ | $0.9999998847$ | $2.88\times10^{-2}$ |

The adjacent finite-difference Frobenius change is about $0.996$, and the
largest-singular-value change is about $0.926$, so there is no stable response
window at the declared tolerance $0.25$. The products $h\|M_h\|_F$ remain at
the $10^{-8}$ scale, which is the diagnostic signature that small residual
evaluation changes are being divided by the central-difference step. The
profile-level finite-difference matrix therefore fails all three gates:
step-stability, analytic-tangent agreement, and useful replay tracking.

Policy replacement. Future finite-collar repair searches must not use
profile-level finite-difference response columns as repair directions unless a
response-noise audit first reports a stable finite-difference window, agreement
with the semi-analytic tangent matrix, matching effective rank, and meaningful
nonlinear replay tracking. For the current endpoint-slope-cancelled A1 chart,
the valid response backend is the semi-analytic tangent, which has no effective
first-order radial-control rank on the tested collar.

## Second-Order Response Audit

The second-order audit tests the first available continuation channel after the
semi-analytic first-order tangent gives effective rank $0$ on the
endpoint-slope-cancelled A1 collar. It estimates the symmetric directional
second response
$$
Q_a(v)
=
\frac{R(a v)+R(-a v)-2R(0)}{a^2},
$$
where $R(p)$ is the sampled finite-collar radial residual vector in homogeneous
nullspace coordinates. It also records the odd finite-amplitude response
$$
L_a(v)
=
\frac{R(a v)-R(-a v)}{2a}
$$
against the semi-analytic tangent $M_{\mathrm{tan}}v$, and then runs a
nonnegative diagonal quadratic Chebyshev replay. A second-order continuation
target is accepted only if the symmetric response is stable across amplitude,
the central second difference scales like $a^2$, the replay gives material
nonlinear improvement on the same retained chart, and the sampled past-profile
bounds remain admissible.

Audit command at the same five-sample collar:

```sh
../.venv/bin/python reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-lo 0 --theta-hi 0.02 --theta-samples 5 --delta-steps 512 --integration-panels 96 --profile-mode tangential_transport --transport-steps 80 --finite-collar-repair-degree 18 --finite-collar-samples 5 --finite-collar-integration-panels 96 --finite-collar-transport-steps 80 --finite-collar-delta-steps 512 --finite-collar-second-order-steps 0.0025,0.005,0.01,0.02 --finite-collar-variation-bound 0.01 --diagnostic-mode finite_collar_second_order_response_audit
```

The audit classifies the tested diagonal second-order response as
`second_order_noise_artifact`. The first-order analytic tangent remains
effective rank $0$ with
$$
\|M_{\mathrm{tan}}\|_F\approx6.12\times10^{-12}.
$$
The base finite-collar residual is still
$$
\max|\mathcal R_R^{\mathrm{tr}}|\approx2.1103915491651765\times10^{-4}.
$$
Using a material-improvement floor of $1\%$ of the base residual gives
$$
\Delta_{\mathrm{mat}}\approx2.1103915491651764\times10^{-6}.
$$
Every tested quadratic or coordinate replay improves the residual only at the
$10^{-8}$ to $10^{-9}$ scale, far below that floor.

| $a$ | $\|Q_a\|_F$ | $a^2\|Q_a\|_F$ | Adjacent change | Predicted improvement | Nonlinear improvement |
| --- | ---: | ---: | ---: | ---: | ---: |
| $0.0025$ | $5.3775\times10^{-3}$ | $3.3610\times10^{-8}$ | -- | $9.62\times10^{-9}$ | $7.03\times10^{-9}$ |
| $0.005$ | $1.0405\times10^{-3}$ | $2.6011\times10^{-8}$ | $0.964$ | $1.18\times10^{-8}$ | $4.47\times10^{-9}$ |
| $0.01$ | $2.7048\times10^{-4}$ | $2.7048\times10^{-8}$ | $0.915$ | $9.82\times10^{-9}$ | $-1.90\times10^{-9}$ |
| $0.02$ | $8.4007\times10^{-5}$ | $3.3603\times10^{-8}$ | $0.887$ | $1.40\times10^{-8}$ | $6.92\times10^{-9}$ |

The decisive pattern is that $a^2\|Q_a\|_F$ stays near the same
$3\times10^{-8}$ residual-evaluation scale while $\|Q_a\|_F$ collapses as the
amplitude grows. Adjacent relative changes in the estimated second-order
matrix remain order one, with maximum Frobenius change about $0.964$ and
maximum largest-singular change about $0.834$, above the stability tolerance
$0.25$. The best one-coordinate replay improves the residual by only
$1.02\times10^{-8}$, and the best quadratic replay improves it by only
$7.03\times10^{-9}$. This does not reopen A1 as a second-order finite-collar
continuation target.

This audit still does not prove a structural obstruction. It says that the
tested diagonal second-order channel behaves like another residual-evaluation
artifact rather than a stable curvature response. The next obstruction-side
proof target is to decide whether first-order tangent nullity is structural:
either derive and bound the second variation or finite-amplitude remainder for
$\mathcal R_R^{\mathrm{tr}}$ on the endpoint-slope-cancelled retained chart, or
expand the executable search to controlled mixed second-variation directions
before attempting an interval obstruction.

## Mixed Second-Variation Audit

The mixed second-variation audit closes the immediate loophole left by the
diagonal second-order audit. The first pass tested deterministic rays in
homogeneous nullspace coordinates: six coordinate rays for calibration and six
pair-sum rays of the form
$$
v_{ij}=\frac{e_i+e_j}{\sqrt2}.
$$
For each amplitude it estimates $Q_a(v)$ as above and also forms the mixed
second-term proxy
$$
H_{ij,a}
\approx
Q_a(v_{ij})
-
\frac12 Q_a(e_i)
-
\frac12 Q_a(e_j).
$$
A mixed response can reopen A1 only if a mixed direction is stable across
amplitude, separates from the residual-evaluation scale, preserves sampled
admissibility, and gives material nonlinear replay improvement on the same
endpoint-slope-cancelled retained chart.

Initial audit command:

```sh
../.venv/bin/python reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-lo 0 --theta-hi 0.02 --theta-samples 5 --delta-steps 512 --integration-panels 96 --profile-mode tangential_transport --transport-steps 80 --finite-collar-repair-degree 18 --finite-collar-samples 5 --finite-collar-integration-panels 96 --finite-collar-transport-steps 80 --finite-collar-delta-steps 512 --finite-collar-second-order-steps 0.0025,0.005,0.01,0.02 --finite-collar-mixed-ray-count 12 --diagnostic-mode finite_collar_mixed_second_order_response_audit
```

The first audit classifies the tested mixed response as
`mixed_second_order_noise_artifact`. The analytic first-order tangent remains
effective rank $0$ with
$$
\|M_{\mathrm{tan}}\|_F\approx6.12\times10^{-12}.
$$
The material-improvement floor remains
$$
\Delta_{\mathrm{mat}}\approx2.1103915491651764\times10^{-6},
$$
while the estimated residual-evaluation noise floor from scaled second
differences is only
$$
\Delta_{\mathrm{noise}}\approx1.2087888439396842\times10^{-8}.
$$
The best mixed-direction replay is the pair ray `pair_plus_0_4` at amplitude
$0.02$, but it improves the maximum residual by only
$$
1.5208707275331246\times10^{-8},
$$
which is about $0.00721$ of the material floor and about $1.26$ noise floors.

| $a$ | $\|Q_a\|_F$ over tested rays | $a^2\|Q_a\|_F$ | $\|H_a\|_F$ | $a^2\|H_a\|_F$ | Best nonlinear improvement |
| --- | ---: | ---: | ---: | ---: | ---: |
| $0.0025$ | $7.5271\times10^{-3}$ | $4.7045\times10^{-8}$ | $4.3778\times10^{-3}$ | $2.7361\times10^{-8}$ | $9.32\times10^{-9}$ |
| $0.005$ | $1.5484\times10^{-3}$ | $3.8711\times10^{-8}$ | $9.9985\times10^{-4}$ | $2.4996\times10^{-8}$ | $1.02\times10^{-8}$ |
| $0.01$ | $4.1249\times10^{-4}$ | $4.1249\times10^{-8}$ | $2.5828\times10^{-4}$ | $2.5828\times10^{-8}$ | $1.03\times10^{-8}$ |
| $0.02$ | $1.0632\times10^{-4}$ | $4.2526\times10^{-8}$ | $8.3069\times10^{-5}$ | $3.3228\times10^{-8}$ | $1.52\times10^{-8}$ |

The mixed-term matrix is not stable: the maximum adjacent Frobenius change is
about $1.148$, and the maximum adjacent largest-singular change for the tested
ray matrix is about $0.798$. The scaled mixed numerators remain at the
$10^{-8}$ residual-evaluation scale while the raw mixed norms collapse with
amplitude.

A widened follow-up tests the complete quadratic mixed basis supported by the
current retained nullspace chart: six coordinate rays, all fifteen pair-sum
rays, all fifteen pair-difference rays, and two aggregate rays. The diagnostic
now reports the actual ray-family counts and classifies the mixed verdict from
non-coordinate rays, so coordinate calibration rays cannot by themselves drive
a mixed-continuation classification.

Widened quadratic-basis command:

```sh
../.venv/bin/python reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-lo 0 --theta-hi 0.02 --theta-samples 5 --delta-steps 512 --integration-panels 96 --profile-mode tangential_transport --transport-steps 80 --finite-collar-repair-degree 18 --finite-collar-samples 5 --finite-collar-integration-panels 96 --finite-collar-transport-steps 80 --finite-collar-delta-steps 512 --finite-collar-second-order-steps 0.01,0.02 --finite-collar-mixed-ray-count 38 --diagnostic-mode finite_collar_mixed_second_order_response_audit
```

This wider basis also classifies as `mixed_second_order_noise_artifact`. Its
ray counts are
$$
6\ \text{coordinate},\quad 15\ \text{pair-sum},\quad
15\ \text{pair-difference},\quad 2\ \text{aggregate}.
$$
At the two tested amplitudes the material-improvement floor remains
$2.1103915491651764\times10^{-6}$ and the best non-coordinate replay is still
`pair_plus_0_4` at $a=0.02$, with improvement
$1.5208707275331246\times10^{-8}$. This is about $0.00721$ of the material
floor and about $1.31$ noise floors. Pair-difference and aggregate rays do not
produce a stronger finite-amplitude replay.

| $a$ | Ray count | $\|Q_a\|_F$ | $a^2\|Q_a\|_F$ | $\|H_a\|_F$ | $a^2\|H_a\|_F$ | Best nonlinear improvement |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| $0.01$ | $38$ | $7.1674\times10^{-4}$ | $7.1674\times10^{-8}$ | $5.2264\times10^{-4}$ | $5.2264\times10^{-8}$ | $1.16\times10^{-8}$ |
| $0.02$ | $38$ | $1.9140\times10^{-4}$ | $7.6562\times10^{-8}$ | $1.7886\times10^{-4}$ | $7.1542\times10^{-8}$ | $1.52\times10^{-8}$ |

The widened basis stays amplitude-unstable: the adjacent second-order matrix
Frobenius change is about $0.936$, the adjacent largest-singular change is
about $0.764$, and the adjacent mixed-term change is about $1.093$. These are
well above the stability tolerance $0.25$.

A final signed-combo replay screen requests all $68$ deterministic projective
directions available under the current de-duplication policy: the $38$
quadratic-basis rays plus $30$ deterministic signed-combo probes. At
$a=0.02$, this full ray family still selects `pair_plus_0_4` as the best
direction, with the same $1.5208707275331246\times10^{-8}$ residual
improvement. The screen is a finite-amplitude material-improvement check, not
a stability certificate, because it uses one amplitude; its role is only to
verify that optional signed-combo probes do not expose a missed material repair
direction.

Therefore the tested mixed rays do not reopen A1 as a second-order
finite-collar continuation target.

Promotion status. This audit is priority-only. It updates the A1 continuation
policy but does not promote a reader-facing theorem, A1 no-go, isolated spiral
certificate, or global spiral no-go. The next proof target is to decide whether
the analytic rank-zero first tangent is structural by deriving a controlled
second-variation or finite-amplitude remainder bound for
$\mathcal R_R^{\mathrm{tr}}$ on the endpoint-slope-cancelled retained chart. If
that bound rules out all admissible mixed curvature control, then the interval
obstruction can be attempted; otherwise, the missing admissible
finite-amplitude channel must be identified before any new repair search.

## Controlled Second-Variation / Finite-Amplitude Remainder Packet

The proof target is now staged separately in
[spiral-a1-second-variation-remainder-bound](spiral-a1-second-variation-remainder-bound.md).
It turns the diagnostic evidence into a concrete residual-envelope obligation
on the endpoint-slope-cancelled retained chart. In homogeneous finite-collar
coordinates $p$, the target map is
$$
R_i(p)
=
\mathcal R_R^{\mathrm{tr}}(\theta_i;p),
\qquad
\theta_i\in[0,0.02].
$$
The admissible perturbation class preserves the retained endpoint and moment
rows, the $C^2$ splice rows, and the weighted endpoint-slope cancellation row;
it must also preserve positivity, inactive gaps, Jacobian floors, finite
memory, tangential transport, and the sampled $3+1$ retained ledger.

Because the sampled analytic tangent has effective rank $0$, the obstruction
route must replace sampled ray evidence with one of two bounds. The
second-variation form is
$$
\|R(p)-R(0)\|_\infty
\le
C_1\|p\|+\frac12 C_2\|p\|^2,
$$
where $C_1$ controls the interval first variation and $C_2$ controls the
second variation along the admissible segment. The finite-amplitude form is
$$
|R_\ast(p)-R_\ast(0)|
\le
E_\ast(b)
\qquad(p\in\mathcal A_b),
$$
on a certified collar row or box $\theta_\ast$.

An interval obstruction for the declared class follows if
$$
C_1b+\frac12 C_2b^2<\rho_\ast
\qquad\text{or}\qquad
E_\ast(b)<\rho_\ast,
$$
where $\rho_\ast$ is a certified lower bound for
$|\mathcal R_R^{\mathrm{tr}}(\theta_\ast;0)|$. A material-improvement
exclusion uses the stricter diagnostic target
$$
C_1b+\frac12 C_2b^2
\le
\Delta_{\mathrm{mat}}
\approx
2.1103915491651764\times10^{-6}.
$$

This packet deliberately stops short of an A1 no-go. Its acceptable outcomes
are: an obstruction-ready residual-envelope bound on a declared admissible
class; a specific admissible finite-amplitude channel that the sampled rays
missed; or an interval-control failure identifying which native retained-root,
inactive-gap, Jacobian, transport, or branch-sum bound must be tightened.

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
obstruction. The variational-response audit further downgrades the current
finite-difference response matrix: across $h=10^{-5}$ through $10^{-3}$, the
matrix scale, singular values, and replay tracking are not stable enough to
support a real first-variation claim. The immediate burden is therefore a
noise-controlled or analytic variational backend before any renewed
finite-collar repair attempt. A first two-level refinement smoke shows that
fixed response steps are stable at the $7\%$ scale across numerical refinement,
but the order-one response-step instability and failed replay tracking persist;
this favors deriving the tangent transport/root equations over more blind
finite-difference repair searches.
The analytic tangent target above fixes the next equation-level artifact:
derive and implement the coupled linearized root, transport, branch-weight, and
substituted radial rows, then use it as the response backend.
The first semi-analytic backend does implement that target at sampled level and
selects the disagreement outcome: the tangent matrix is effectively rank zero
at the $10^{-9}$ floor, while the old finite-difference response remains rank
$5$. This keeps the old response rank priority-only as a numerical artifact.
The response-noise replacement audit then formalizes the policy: the
finite-difference columns fail step-stability, analytic-tangent agreement, and
useful replay tracking, so they are disabled as finite-collar repair directions
on this chart. The second-order response audit then checks the first available
post-tangent continuation channel. Its diagonal quadratic response also fails:
the symmetric second differences are step-unstable, their scaled numerators sit
near a fixed $3\times10^{-8}$ residual-evaluation scale, and all nonlinear
replay improvements are far below a material $1\%$ residual-reduction floor.
This supports the obstruction-side reading of the sampled A1 collar but does
not prove it; a structural claim still requires a controlled second-variation
or finite-amplitude bound over the admissible retained profile class. The mixed
second-variation audit then tests the first cross-direction loophole and also
returns a noise-artifact result: mixed terms are amplitude-unstable, scaled
mixed numerators remain near the $10^{-8}$ residual-evaluation scale, and the
best mixed replay improvement is far below the material-improvement floor.
Varying
$\Gamma_\ast$ is still not a legitimate same-candidate repair because
$\Gamma_\ast$ participates in the center radial equality and the required local
angular-rate slope.

## Promotion Decision

- Ontology: none added.
- Derivation/closure target: the next A1 proof target is finite-collar radial
  repair or obstruction after endpoint-slope cancellation, including positivity,
  inactive gaps, Jacobian floors, finite memory, tangential transport, and the
  full radial residual on the same retained branch chart. The immediate
  equation-level artifact is the residual-envelope target in
  [spiral-a1-second-variation-remainder-bound](spiral-a1-second-variation-remainder-bound.md).
- Effective summary: the sampled obstruction has sharpened from finite-endpoint
  radial mismatch to a one-sided first-order radial-jet mismatch for the chosen
  polynomial witness, and the follow-up sampled construction shows that
  endpoint-slope freedom can cancel that leading jet inside a positive retained
  past profile. A first bounded degree-16 finite-collar repair preserves those
  rows but lowers the larger-collar radial residual only marginally. A degree-18
  response diagnostic finds sampled linear rank but failed nonlinear replay at
  the required bounded step, and trust-region sweeps at response steps
  $10^{-4}$ and $10^{-3}$ find no smaller bound with useful local tracking. The
  variational-response audit across $h=10^{-5},3\times10^{-5},10^{-4},
  3\times10^{-4},10^{-3}$ then finds unstable response matrices and no useful
  small-bound tracking, so the sampled rank-$5$ response is priority-only as a
  finite-difference artifact until a noise-controlled or analytic variational
  backend reproduces it. A two-level refinement smoke keeps fixed response
  steps stable at roughly the $7\%$ level across refinement but preserves the
  order-one response-step instability and failed tracking, so it does not
  reopen finite-collar continuation. The analytic tangent-equation target now
  identifies the coupled $\delta Q$, $\delta\Delta_\alpha$, $\delta T_Q$,
  $\delta B_Q$, and $\delta\mathcal R_R^{\mathrm{tr}}$ rows needed for the next
  backend. The first semi-analytic backend gives effective rank $0$ at the
  $10^{-9}$ floor and disagrees with the profile-level rank-$5$ finite
  difference response, so the finite-difference response remains classified as
  a numerical artifact rather than a repair-grade tangent. The response-noise
  replacement audit adds the operative gate: profile-level finite-difference
  columns are not allowed to drive repair searches unless they pass
  step-stability, analytic-tangent agreement, rank agreement, and meaningful
  nonlinear replay tracking. The second-order response audit then finds no
  usable diagonal quadratic continuation: $Q_a$ is not stable across amplitude,
  $a^2\|Q_a\|_F$ stays near the $3\times10^{-8}$ residual-evaluation scale, and
  every replay improvement is far below the material-improvement floor. The
  mixed second-variation audit extends that obstruction-side evidence to the
  first deterministic pair rays: the tested mixed terms are also unstable, their
  scaled numerators stay at residual-evaluation scale, and the best mixed replay
  improvement is only about $1.52\times10^{-8}$.
- Speculation: no global A1 no-go, isolated spiral certificate, or stability
  claim is promoted.

Promotion decision. Keep the numeric tables priority-only. A cautious
reader-facing theorem-target statement may say that the finite-collar branch
certificate must treat endpoint-slope data as part of the admissible retained
profile class: a sampled positive perturbation cancels the leading radial jet,
so the remaining A1 question is finite-collar certification or failure after
that cancellation, not a fixed-witness first-jet no-go. The current
finite-difference response rank is not promoted; the next proof target is the
true variational response of the nonlinear transport/root map, preferably by
analytic tangent equations rather than another finite-difference repair search.
The first sampled semi-analytic tangent implementation is still priority-only,
but it is enough to reject the old finite-difference rank as a first-variation
claim on this chart. The response-noise audit replaces the old repair direction
with a diagnostic gate and leaves no repair-grade tangent direction on the
tested endpoint-slope-cancelled finite collar. The second-order audit is also
priority-only. It updates the continuation policy by ruling out a usable
sampled diagonal quadratic response on the tested collar, but it does not
promote a reader-facing theorem, A1 no-go, or global spiral no-go. The mixed
second-variation audit is likewise priority-only. It updates the continuation
policy by ruling out the tested deterministic mixed rays as material
second-order continuation channels, while leaving the proof burden on a
controlled second-variation or finite-amplitude bound over the admissible
retained profile class. The new remainder-bound packet is also priority-only:
it states the variables, row dependencies, obstruction criterion, and failure
modes, but it does not yet supply an interval bound or promote an A1 no-go.
