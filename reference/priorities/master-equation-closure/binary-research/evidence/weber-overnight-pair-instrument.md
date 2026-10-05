# Weber-overnight pair instrument

This note documents a numerical comparison instrument for the fixed instantaneous Weber-inspired acceleration law of [Section 9 of the equation-variant manuscript](../../equation-variants/manuscript.md#9-weber-inspired-relative-motion-response). The instrument integrates the motion of $N$ members under that law, solves the implicit acceleration system explicitly at every evaluation, monitors mathematical diagnostics, and locates the events that end or mark a history. It is a research comparison instrument written for the weber-overnight investigation. It is not the EOM solver, not a production integrator and not an interval enclosure. The script is [weber-overnight-pair-instrument.mjs](weber-overnight-pair-instrument.mjs) and its known-case receipt is [weber-overnight-pair-instrument-controls.json](weber-overnight-pair-instrument-controls.json).

## The law the instrument evaluates

Each member $i$ has a present position $\mathbf X_i(T)$, velocity $\mathbf V_i(T)$ and polarity $q_i\in\{+1,-1\}$, with $T$ the absolute time. For two distinct members the present separation is $r=\|\mathbf X_i-\mathbf X_j\|>0$, the unit direction from $j$ to $i$ is $\mathbf e=(\mathbf X_i-\mathbf X_j)/r$, the polarity sign is $\sigma_{ij}=\operatorname{sign}(q_iq_j)$ and the coupling is $K_{ij}=K|q_iq_j|$. The relative velocity is $\mathbf w=\mathbf V_i-\mathbf V_j$, its component along the separation is $\dot r=\mathbf e\cdot\mathbf w$, and its transverse part is $\mathbf w_\perp=\mathbf w-\dot r\,\mathbf e$. The pair contribution is

$$
\mathbf A_{i\leftarrow j}=\frac{\sigma_{ij}K_{ij}}{r^2}\Big[1+\lambda_{\mathrm W}\frac{\dot r^2}{c_f^2}+\mu_{\mathrm W}\frac{r\ddot r}{c_f^2}\Big]\mathbf e,\qquad \mathbf X_i''=\sum_{j\ne i}\mathbf A_{i\leftarrow j}.
$$

Support is instantaneous: only present positions and velocities enter, and no causal delay is inserted. Every member receives the full acceleration, which means unit integration weights; architrinos carry no mass. The second derivative of the present separation is obtained by differentiating $r=\|\mathbf X_i-\mathbf X_j\|$ twice,

$$
\ddot r=\mathbf e\cdot(\mathbf A_i-\mathbf A_j)+\frac{\|\mathbf w_\perp\|^2}{r},
$$

where $\mathbf A_i=\mathbf X_i''$. Because $\ddot r$ contains the unknown accelerations, the law is implicit. The instrument moves the unknown part to the left side for every ordered pair and obtains a linear system $M\mathbf A=\mathbf b$ of size $3N\times3N$:

$$
\mathbf A_i-\sum_{j\ne i}g_{ij}\,\mathbf e_{ij}\mathbf e_{ij}^{\mathsf T}(\mathbf A_i-\mathbf A_j)=\sum_{j\ne i}\frac{\sigma_{ij}K_{ij}}{r_{ij}^2}\Big[1+\lambda_{\mathrm W}\frac{\dot r_{ij}^2}{c_f^2}+\mu_{\mathrm W}\frac{\|\mathbf w_{\perp,ij}\|^2}{c_f^2}\Big]\mathbf e_{ij},\qquad g_{ij}=\frac{\sigma_{ij}K_{ij}\mu_{\mathrm W}}{c_f^2r_{ij}}.
$$

The matrix and right side are assembled pair by pair from the boxed law; no pair-reduced scalar formula is used during integration. The system is solved by Gaussian elimination with partial pivoting (an LU factorization). Each solve returns the accelerations, the determinant of $M$, the smallest pivot magnitude, and the exact 1-norm condition number $\|M\|_1\|M^{-1}\|_1$, computed from the explicit inverse. That cost grows as $(3N)^3$ and is negligible for the pair and four-member cases; a case may switch it off.

The numerical instantiation enforces $c_f=1$ and rejects any other value. Coupling defaults to $K=1$, so lengths are measured in units of $K/c_f^2$ and the dimensionless separation is $x=rc_f^2/K$. The frozen benchmark is $\lambda_{\mathrm W}=-1/2$, $\mu_{\mathrm W}=1$; the zero-coefficient case $\lambda_{\mathrm W}=\mu_{\mathrm W}=0$ is the instantaneous inverse-square control, not the delayed canonical Master Equation.

### The pair determinant

For an isolated pair the matrix has a simple structure, which the controls test numerically.

> Claim grade: derived. For two members, $\det M=1-2\sigma_{ij}K_{ij}\mu_{\mathrm W}/(c_f^2r)$, independent of $\lambda_{\mathrm W}$ and of the velocities. Writing $\mathbf S=\mathbf A_i+\mathbf A_j$ and $\mathbf D=\mathbf A_i-\mathbf A_j$, the two block rows of $M$ become $\mathbf S\mapsto\mathbf S$ and $\mathbf D\mapsto(I-2g\,\mathbf e\mathbf e^{\mathsf T})\mathbf D$. The change of variables is a fixed invertible similarity, so the determinant is that of $I-2g\,\mathbf e\mathbf e^{\mathsf T}$, whose eigenvalues are $1-2g$ along $\mathbf e$ and $1$ twice transversely. The power of the factor is therefore one. Falsifier: a pair state at which the computed determinant differs from $1-2\sigma K\mu_{\mathrm W}/(c_f^2r)$ beyond round-off, or varies with $\lambda_{\mathrm W}$ or velocity.

This agrees with the factor that appears in the Section 9 pair identity. For the frozen coefficients it vanishes only for same polarity ($\sigma=+1$) at $r=2K/c_f^2$; for opposite polarity ($\sigma=-1$) the factor is $1+2K/(c_f^2r)>1$ at every positive separation. The singular coefficients of the two polarities are therefore different and are reported separately. The many-member matrix is not reduced to this scalar; the instrument always solves the full system.

## Integrators

Three one-step methods share a common driver.

- **Gragg–Bulirsch–Stoer extrapolation (`gbs`, default).** The modified midpoint rule is evaluated with substep counts $2,4,\dots,18$ and extrapolated in $h^2$. A step is accepted at the first column $j\ge2$ (order at least six) whose difference from the previous column is within tolerance, and the next step size follows from that column's order. This is the high-order adaptive method; it reaches orders up to 18.
- **Dormand–Prince 5(4) (`dp54`).** The standard embedded explicit pair with local extrapolation and the usual step controller.
- **Classical fourth-order Runge–Kutta (`rk4`).** Fixed step, used as the refinement comparison.

The error measure is the maximum over components of the local error divided by $\mathrm{atol}+\mathrm{rtol}\max(|y_0|,|y_1|)$. A step whose stages meet an exactly zero pivot or a non-finite value is rejected and retried at a quarter of the step; repeated failure below the minimum step ends the run with a `step-underflow-singular` termination rather than continuing past the obstruction. No branch is switched and no regularization is applied.

## Events

After every accepted step the driver evaluates event functions at both ends. A sign change is located by an Illinois (modified regula falsi) iteration in which each trial point is obtained by re-integrating from the start of the step with the same method over the shorter interval. The located time therefore carries the same local accuracy as an accepted step. The events are:

| Event | Function | Default action |
| --- | --- | --- |
| Contact | $r_{ij}-r_{\mathrm{contact}}$, default $r_{\mathrm{contact}}=10^{-6}K/c_f^2$ | stop |
| Escape | $r_{\mathrm{escape}}-r_{ij}$, default $10^4K/c_f^2$ | stop |
| Acceleration-matrix obstruction | $\operatorname{sign}(\det M_0)\det M-\delta_{\det}$; smallest pivot $-\,\delta_{\mathrm{piv}}$; $\log\kappa_{\max}-\log\kappa_1(M)$ | stop |
| Speed equality | $\|\mathbf V_i\|-c_f$ in the absolute frame, both directions, with member and direction | record |
| Turning point | $\dot r_{ij}$, minimum when it rises through zero and maximum when it falls | record, with time, separation, relative vector and unwrapped angle |
| Final time | $t=t_{\mathrm{end}}$ | stop |

The signed determinant function also catches a determinant that changes sign inside one step. The unwrapped angle of each pair is accumulated about that pair's initial relative angular-momentum direction (or the $z$ axis for radial preparations), so successive pericentre angles give the apsidal advance. A speed equality is an admissibility label only: the instrument records the crossing and never modifies the acceleration, and each summary reports the centre velocity $\frac1N\sum_i\mathbf V_i$ so that the frame of the speed comparison is explicit. A member whose speed equals $c_f$ exactly at the start is listed in `initialAtSpeedBoundary`, and its later departure from equality is not reported as a crossing.

## Diagnostics

Each recorded state carries the sum of velocities $\sum_i\mathbf V_i$, the sum $\sum_i\mathbf X_i\times\mathbf V_i$, the centre of position $\frac1N\sum_i\mathbf X_i$, the determinant, smallest pivot, condition number and the value of a candidate first integral. Two candidates are built in. For $\lambda_{\mathrm W}=-1/2$, $\mu_{\mathrm W}=1$ the monitored expression is

$$
H=\sum_i\tfrac12\|\mathbf V_i\|^2+\sum_{i<j}\frac{\sigma_{ij}K_{ij}}{r_{ij}}\Big(1-\frac{\dot r_{ij}^2}{2c_f^2}\Big),
$$

the historical Weber-type velocity-dependent expression, used here only as a monitored candidate and not as a premise. For $\lambda_{\mathrm W}=\mu_{\mathrm W}=0$ it is $H_0=\sum_i\frac12\|\mathbf V_i\|^2+\sum_{i<j}\sigma_{ij}K_{ij}/r_{ij}$. A module caller may supply any other function of the state. Summaries report the largest deviations of the vector sums, the deviation of the centre from uniform motion, and the largest relative drift of the candidate. These are mathematical invariants or candidates of an adapted law; they are not primitive physical energy or momentum accounts.

## Known-case controls

The controls were run and recorded before any Weber-coefficient target use, with `node reference/priorities/master-equation-closure/binary-research/evidence/weber-overnight-pair-instrument.mjs controls` on 2026-10-05 (Node v22.23.2, total wall time 0.43 s). All eleven passed. Each reference below is independent of the integration path: a closed form, a quadrature, or a separate numerical differentiation.

For the zero-coefficient opposite-polarity pair with unit weights, each member receives $-K\mathbf e/r^2$ from the other, so the relative coordinate $\mathbf X_1-\mathbf X_2$ obeys an inverse-square law with coupling $2K$. With $K=1$ the relative circular rate is $\omega=\sqrt{2/r^3}$, the radial period is $2\pi\sqrt{a^3/2}$ for semi-major axis $a$, and the radial fall from rest at $r_0$ follows $r=r_0(1+\cos\psi)/2$, $t=\sqrt{r_0^3/16}\,(\psi+\sin\psi)$. These relations are derived from the zero-coefficient law; they are standard Kepler results used here only as closed-form checks of the code.

| Control | Reference | Tolerance | Measured |
| --- | --- | --- | --- |
| a1 circular rate, $r=1$, 10 orbits | $\omega=\sqrt2$ | angle $10^{-9}$, radius $10^{-10}$ | angle error $3.1\times10^{-12}$, radius error $7.1\times10^{-14}$, $H_0$ drift $5.9\times10^{-14}$ |
| a2 eccentric position, $a=3$, $e=0.5$, four times up to $2.5$ periods | Kepler's equation | relative $10^{-9}$ | largest $6.6\times10^{-12}$ |
| a3 radial period and apsides, five orbits | $T=23.085896942914$, $r_{\min}=1.5$, $r_{\max}=4.5$, zero apsidal advance | period $10^{-10}$, apsides $10^{-10}$, angle $10^{-8}$ | period $9.2\times10^{-13}$, apsides $1.2\times10^{-12}$, apsidal angle $7.5\times10^{-13}$ |
| a4 radial fall from rest at $r_0=1$ to $r=10^{-6}$ | contact $t=0.785398163064$; member speed reaches $c_f$ at $t=0.642699081699$ | $10^{-9}$ and $10^{-11}$ | $2.9\times10^{-15}$ and $2.7\times10^{-15}$; both members flagged rising through $c_f$ |
| a5 zero-energy radial escape from $r_0=2$ to $r=50$ | $r^{3/2}=r_0^{3/2}+\tfrac32\sqrt{4}\,t$ | relative $10^{-10}$ | $1.4\times10^{-13}$ |
| g obstruction event, test-only coefficients $\lambda_{\mathrm W}=0$, $\mu_{\mathrm W}=-1$, $\sigma=-1$, from rest at $r_0=3$, threshold $\det M=10^{-3}$ | independent adaptive Simpson quadrature of $\dot r^2/2=\ln\frac{(r_0-2)r}{r_0(r-2)}$, giving $t=1.48775699117271$ | $10^{-9}$ | $4.4\times10^{-16}$; event `obstruction:det` stopped the run |
| b invariants at zero coefficients: eccentric pair with centre drift to $t=50$; random four-member mixed polarity to $t=5$ | antisymmetric central contributions | $\sum\mathbf V$ $10^{-11}$; relative $\sum\mathbf X\times\mathbf V$ $10^{-10}$; centre $10^{-11}$; $H_0$ $10^{-10}$ | pair: $4.1\times10^{-14}$, $2.0\times10^{-13}$, $7.0\times10^{-13}$, $3.5\times10^{-13}$; four members (closest approach $0.042$): $4.8\times10^{-13}$, $1.3\times10^{-11}$, $4.0\times10^{-13}$, $3.4\times10^{-11}$ |
| c pair solve, 2000 random states, $\lambda_{\mathrm W}=-1/2$, $\mu_{\mathrm W}=1$, $r\in[0.05,50]$, both polarities | boxed-law residual with $\ddot r$ recomputed from the solved accelerations; $\ddot r$ by Richardson-extrapolated numerical differentiation of $\|\mathbf d+\mathbf wt+\tfrac12\mathbf at^2\|$; Section 9 scalar identity | $10^{-12}$; $10^{-7}$; $10^{-12}$ | $2.1\times10^{-13}$; $8.6\times10^{-10}$; $2.2\times10^{-13}$; antisymmetry and transverse fraction below $5\times10^{-15}$; largest condition number 818 |
| c determinant form | $1-2\sigma K\mu_{\mathrm W}/(c_f^2r)$ | scaled $10^{-14}$ | scaled error $2.6\times10^{-15}$; fitted power in $[1-3\times10^{-14},1+3\times10^{-14}]$; zero spread over $\lambda_{\mathrm W}\in\{-1/2,0,2\}$ and two velocity sets on a 36-point grid of $\mu_{\mathrm W}\in\{1,0.37,-2\}$, both polarities, $r$ from 0.1 to 100 |
| d four-member solve, 500 random states, mixed polarities | boxed law for every member; numerical $\ddot r$ for every pair | $10^{-11}$; $10^{-7}$; $\sum\mathbf A$ $10^{-12}$ | $7.1\times10^{-15}$; $1.2\times10^{-8}$; $2.6\times10^{-15}$; largest condition number 2506 (states above $10^8$ excluded) |
| e refinement on the eccentric orbit after one period | Kepler's equation | RK4 order in $[3.7,4.3]$; DP5(4) $10^{-8}$; GBS $10^{-10}$ | RK4 errors $1.4\times10^{-6}$ to $2.8\times10^{-10}$ for 400 to 3200 steps per orbit, observed orders 4.13, 4.07, 4.04; DP5(4) $1.6\times10^{-10}$ (2764 evaluations); GBS $1.5\times10^{-13}$ (2804 evaluations) |
| f eigenvalue routine and linearization | prescribed spectrum under a random similarity; companion matrix of $(x-1)(x+2)(x^2+2x+5)(x-\tfrac12)$; circular zero-coefficient pair in the co-rotating frame | $10^{-10}$; $10^{-10}$; $10^{-5}$ | $1.3\times10^{-15}$; $1.3\times10^{-15}$; $5.2\times10^{-7}$ |

> Claim grade: measured. Instrument: this script, double-precision floating point, on exactly the cases in the table. The integrator, event locator and linear solve reproduce the independent references to the stated tolerances on those cases. Falsifier: rerunning `controls` and obtaining a `FAIL` line, or a reference value in the receipt that disagrees with a hand evaluation of the quoted closed form.

The determinant control (c) uses three values of $\mu_{\mathrm W}$ and control (g) uses $\mu_{\mathrm W}=-1$ only to exercise the algebra and the event machinery against independent references. They are not target cases and do not alter the frozen benchmark.

### Linearization helper

The helper forms the Jacobian of the first-order system by central differences at steps $h$ and $h/2$ with a Richardson combination and an error estimate, and computes eigenvalues by balancing, reduction to Hessenberg form and the Francis double-shift QR iteration. It can evaluate the vector field in a frame rotating with angular velocity $\boldsymbol\Omega$, in which $\mathbf X'=\mathbf U$ and $\mathbf U'=\mathbf A(\mathbf X,\mathbf U+\boldsymbol\Omega\times\mathbf X)-2\boldsymbol\Omega\times\mathbf U-\boldsymbol\Omega\times(\boldsymbol\Omega\times\mathbf X)$. This is valid because the law depends only on relative positions and inertial relative velocities. The helper refuses to report a spectrum unless the supplied state is an equilibrium of the chosen frame to a stated balance tolerance, because a spectrum about a non-equilibrium has no referent.

The validation case is the zero-coefficient circular pair at $r=1$ in the frame rotating at $\Omega=\sqrt2$, which is an equilibrium there (balance residual $2.2\times10^{-16}$). Its predicted spectrum consists of the eigenvalue $0$ four times and $\pm i\Omega$ four times each. The in-plane relative motion contributes $0$ twice (motion along the orbit family) and $\pm i\kappa$ with epicyclic frequency $\kappa=\Omega$; the out-of-plane relative tilt contributes $\pm i\Omega$; free translation of the centre contributes $\pm i\Omega$ twice in the plane and $0$ twice out of plane. Several of these eigenvalues are defective, so numerical splitting of order the square root of the Jacobian error ($10^{-8}$) is expected. The computed eigenvalues match the prediction within $5.2\times10^{-7}$. Offsetting the frame rate by one percent produced a balance residual of $0.020$, and the helper correctly declined to report a spectrum.

> Claim grade: measured. Instrument: this helper on the two test matrices and the rotating circular pair. Falsifier: an eigenvalue of either test matrix differing from its prescribed value by more than $10^{-10}$, or a rotating-frame eigenvalue farther than $10^{-5}$ from $\{0,\pm i\sqrt2\}$.

### Code-path smoke tests

After the controls passed, four loose-tolerance runs at $\lambda_{\mathrm W}=-1/2$, $\mu_{\mathrm W}=1$ (`node … smoke`) confirmed that the benchmark code path, the trajectory writer and the summary writer execute for an opposite-polarity planar pair under both adaptive methods, a same-polarity collinear pair and a four-member ring. Their outputs lie under `.local-data/master-equation-closure/weber-overnight/binary/` and `ring/` with `smoke-` names. They are not preregistered target cases and are not interpreted here.

## Limits of what the instrument establishes

The instrument computes floating-point approximations with local error control. It does not enclose the solution, and agreement with a closed form on the control cases does not certify error on other cases. It is a separately authored comparison instrument, so agreement between its target runs and another instrument is evidence only to the extent that the two share no code or derivation. The pair determinant formula is derived above and measured in control (c); the many-member matrix carries no such reduction and is always solved in full.

Event location assumes that an event function changes sign at most once within an accepted step. Two turning points or two speed crossings inside one step would be missed, which `integrator.hmax` controls; a near-circular orbit can produce turning points that are only round-off, which `events.turning.floor` suppresses. An obstruction is detected through the determinant, pivot or condition thresholds; the run stops there, and no continuation, branch choice or boundary response is supplied. A stopped run therefore establishes a regular history only up to its stopping event. Finite numerical survival to $t_{\mathrm{end}}$ is a measured interval result, not persistent binding, and local linear stability requires a certified equilibrium and the helper's spectrum, which is a separate claim from either.

## How to run

All commands run from the repository root with Node 22; the script has no dependencies.

```sh
E=reference/priorities/master-equation-closure/binary-research/evidence
node $E/weber-overnight-pair-instrument.mjs controls            # rewrites the receipt
node $E/weber-overnight-pair-instrument.mjs run case.json       # JSONL trajectory + JSON summary
node $E/weber-overnight-pair-instrument.mjs linearize case.json # balance check, then Jacobian spectrum
node $E/weber-overnight-pair-instrument.mjs smoke               # loose code-path checks
```

A case file has the following fields. Omitted fields take the defaults shown.

```json
{
  "name": "label",
  "members": [{"x": [0, 0, 0], "v": [0, 0, 0], "q": 1}],
  "coefficients": {"lambda": -0.5, "mu": 1, "K": 1, "cf": 1},
  "integrator": {"method": "gbs | dp54 | rk4", "rtol": 1e-12, "atol": 1e-14,
                 "h0": null, "h": "required for rk4", "hmax": "tEnd/20", "hmin": "1e-14*max(1,tEnd)",
                 "kmax": 9, "maxSteps": 5000000},
  "events": {"rContact": 1e-6, "rEscape": 1e4, "detMin": 1e-8, "pivotMin": 1e-10, "condMax": 1e10,
             "contact": {"stop": true}, "escape": {"stop": true}, "obstruction": {"stop": true},
             "speed": {"record": true, "stop": false}, "turning": {"record": true, "floor": 0}},
  "tEnd": 100,
  "candidate": "auto | weber | kepler | none",
  "condition": "exact | none",
  "output": {"subdir": "binary | ring", "dir": "optional path relative to the repository root",
             "stem": "file stem", "every": 1},
  "frame": {"omega": [0, 0, 0]},
  "balanceTol": 1e-10
}
```

`frame` and `balanceTol` are read only by `linearize`. Output defaults to `.local-data/master-equation-closure/weber-overnight/<subdir>/<stem>.trajectory.jsonl` and `<stem>.summary.json`. Trajectory lines are either `state` records (time, positions, velocities, determinant, smallest pivot, condition number, candidate value, vector sums, centre and unwrapped pair angles) or `event` records. The summary holds the termination reason and time, step and evaluation counts, wall time, all events, final state, diagnostic drifts, extreme matrix measures, largest member speeds, the centre velocity and per-pair separation extremes. The module exports `runCase`, `solveAccelerations`, `assemble`, `lawResidual`, `derivative`, `diagnostics`, `candidates`, `linearize`, `jacobian`, `eigenvalues` and `runControls` for use from other scripts.

On the control machine one radial period of the $a=3$, $e=0.5$ zero-coefficient orbit at $\mathrm{rtol}=10^{-13}$ took about 4 ms and between 1600 and 2800 right-hand-side evaluations depending on the step cap and event location; the full control suite takes under half a second.
