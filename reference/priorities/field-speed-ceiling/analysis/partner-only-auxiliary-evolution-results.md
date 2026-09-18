# Partner-only auxiliary evolution through crossover

## Scope and result

### Accepted evidence boundary

**Operator decision, 2026-09-16:** use the sharp Master Equation for conclusions; use smoothing only as an explicitly labeled comparison with its modifications and limitations attached to every reported result; require a demonstrated limiting argument before transferring a smoothed result to the sharp equation. Numerical refinement at fixed smoothing only checks the modified calculation.

Every numerical result below belongs to the finite-width, core-softened, finite-memory, mirror-constrained auxiliary model with zero self response. The trajectories do not establish reversal, repeated crossings, sticking, or once-only reception for the sharp Master Equation with the authorized ceiling. A transfer argument must identify the converging quantity and domain, control the removal of the auxiliary modifications, and establish that the limit satisfies the sharp equation on the claimed domain; agreement on regular separated roots alone does not settle crossover. No such crossover argument is supplied here.

**Correction to the earlier discussion:** the claim that the generated turn demonstrated no double-counting was too strong. Finite-width reception spreads a contribution over time and does not itself establish the sharp equation's once-only reception account. The exact geometric no-recrossing result remains separate from these numerical observations.

**Measured diagnostic, 2026-09-15:** the explicit-use [instrument](../../../../scripts/field-speed-ceiling/partner-only-auxiliary-evolution.mjs) evolves a mirror pair with zero self acceleration, capped speed, finite source memory, and the Master Equation's auxiliary smoothing. It generates a finite-duration first reversal followed by repeated crossings. Smaller equal smoothing scales shorten and shrink the first excursion. Changing the profile or the ratio of smoothing scales changes the motion. These observations concern the finite auxiliary equations; they neither adopt smoothing nor establish a unique sharp-law continuation. The [receipt](../evidence/partner-only-auxiliary-evolution-receipt.json) records exact instrument hash, known-case checks, parameters, events, and summaries.

## Defined input and equation

Use $c_f=1$, $K=1$, memory horizon $h=1$, and inspect $0\le t\le0.2$. Supply the incoming history $X_A(s)=s$, $X_B(s)=-s$ for $-1\le s\le0$, with $v_A(0)=1$. Thus A approaches from the left and B from the right; both meet at the origin. This is prescribed history, not a derived all-past approach. Enforce $X_B(t)=-X_A(t)$ throughout the diagnostic. No transverse perturbations are examined.

Writing $x=X_A$, the auxiliary partner acceleration is

$$
a(t)=-K\int_{t-h}^{t}\frac{x(t)+x(s)}{\bigl([x(t)+x(s)]^2+\epsilon_c^2\bigr)^{3/2}}\frac1\eta\phi\!\left(\frac{|x(t)+x(s)|-(t-s)}{\eta}\right)ds.
$$

The velocity obeys the capped equation: $\dot v=a$ in $-1<v<1$, $\dot v=\min(a,0)$ at $v=1$, and $\dot v=\max(a,0)$ at $v=-1$; $\dot x=v$. Self acceleration is identically zero. The two normalized comparison profiles are $\phi_G(z)=e^{-z^2/2}/\sqrt{2\pi}$ and $\phi_H(z)=z^2\phi_G(z)$. The latter is an auxiliary comparison, not another physical emission rule. The finite-memory, core-softened integral is the type of auxiliary construction specified in the [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md); no finite parameter is asserted to be physical.

The instrument uses projected Heun time stepping, trapezoidal position updates, linear history interpolation, and composite four-point Gauss source quadrature. It retains the continuously indexed partner history within the declared memory window and applies no consumed-front flag, event kick, or restart. Gaussian tails outside ten widths are discarded with an acceleration envelope recorded per run. This finite-width response is not an exact sharp-front crossing ledger: a front has a spread-out response. Therefore the run alone cannot prove the desired once-only sharp-event accounting.

## Verification before target runs

The instrument passed six known cases before any target evolution: degree-six Gauss integration; the exact partner incidence antiderivative; the hollow profile's zero incidence value; a static separated source's softened row; constant-acceleration capped reversal; and zero-acceleration inertial motion. The incidence relative error was $6.77\times10^{-14}$ or less. A JavaScript signed-zero assertion was corrected before the successful verification; no target result preceded the successful receipt. These independent closed forms check components, not the complete delayed trajectory or its singular limit.

## Measured first excursions

Times and positions below are rounded from the receipt. Each position is A's coordinate; pair separation there is twice its magnitude. Fine runs are used where available.

| Profile | $\eta$ | $\epsilon_c$ | First stop time | A's position at first stop | Next origin crossing |
|---|---:|---:|---:|---:|---:|
| Gaussian | 0.08 | 0.08 | 0.121685 | 0.0953911 | after observation window |
| Gaussian | 0.04 | 0.04 | 0.0491598 | 0.0414336 | 0.0970891 |
| Gaussian | 0.02 | 0.02 | 0.0212351 | 0.0187719 | 0.0419686 |
| Gaussian | 0.01 | 0.01 | 0.00956480 | 0.00874614 | 0.0189443 |
| Hollow | 0.04 | 0.04 | 0.0719632 | 0.0632133 | 0.142829 |
| Hollow | 0.02 | 0.02 | 0.0321248 | 0.0294083 | 0.0637420 |
| Gaussian | 0.04 | 0.02 | 0.0351311 | 0.0305981 | 0.0693161 |

For Gaussian widths 0.04, 0.02, and 0.01, the fine runs respectively contain 3, 13, and 42 velocity sign changes by $t=0.2$. This is repeated turning in the auxiliary model, not a proved oscillatory sharp solution. At that same endpoint their velocities are approximately $-0.9615$, $-0.7553$, and $+0.9902$: the finite sequence does not establish pointwise velocity convergence. It also does not disprove eventual convergence, convergence of position alone, or a weaker limit.

## Numerical refinement versus auxiliary choices

At Gaussian $\eta=\epsilon_c=0.04$, jointly halving time step and source-panel spacing twice moves the first stop from 0.0491602229 to 0.0491599027 to 0.0491598196. The final two runs differ in final position by about $5.95\times10^{-7}$ and final velocity by $4.63\times10^{-5}$. Other paired refinements preserve the listed crossing/turn counts. At width 0.02 the final velocity difference is about 0.00107; at width 0.01 it is about 0.000581. Later phases remain more sensitive than the first turn. These are numerical consistency observations, not independent trajectory certificates or rigorous error bounds.

The first-stop shift caused by changing the 0.04 profile from Gaussian to hollow is about 0.0228, far larger than the observed numerical-refinement changes. This establishes finite-parameter profile dependence at the tested resolutions. It does not establish profile dependence of the limit as both auxiliary scales vanish. Neither the memory horizon nor the incoming history was varied; no all-past independence claim follows.

## What this says about the proposed reversal

**Measured:** finite auxiliary dynamics can generate a positive-duration reversal without prescribing a turnaround curve. For the Gaussian 0.04 example, A first goes right to approximately 0.04143, turns, passes back through the origin at approximately 0.09709, and later turns again on the left. B mirrors it. No self contribution causes this.

**Derived geometric interpretation:** the sharp old partner edge moves left as $-t$. During the first rightward excursion and turn, A develops a positive gap $t+x(t)$. Under the cap its derivative $1+v$ is nonnegative. Thus A cannot close that positive gap and land back on that old sharp front after reversing. The auxiliary response's finite width must be distinguished from this exact-front statement.

**Unresolved:** smaller excursions might approach coincidence while velocity keeps changing rapidly. Neither sticking nor instantaneous reflection has been derived. In particular, finite excursion size tending to zero is not permission to replace the sequence by a stationary path: the singular acceleration must also have a well-defined limiting account. The next mathematical target is a coupled shrinking-scale analysis that distinguishes convergence of position, velocity, and integrated acceleration, and tests independence from profile and core-to-width ratio. No event rule is selected by these runs.

**Falsifiers and checks:** reproduce the commands below with the recorded hash; failure of fixed-parameter refinement would weaken the numerical claims. A sharp-limit theorem or a resolved joint-scale sequence with controlled errors and profile comparison could overturn the present unresolved disposition. A different all-past history or broken mirror symmetry lies outside these runs.

## Reproduction

```bash
node scripts/field-speed-ceiling/partner-only-auxiliary-evolution.mjs --verify --output=.local-data/field-speed-ceiling/partner-only/known-cases.json
node scripts/field-speed-ceiling/partner-only-auxiliary-evolution.mjs --run --verification=.local-data/field-speed-ceiling/partner-only/known-cases.json --eta=.04 --core=.04 --dt=.0000625 --quad=.0025 --output=.local-data/field-speed-ceiling/partner-only/g04finer.json
```

All other cases use the same command with the receipt's `eta`, `core`, `dt`, `quadSpacing` (CLI `--quad`), and `profile`; defaults are $K=h=1$ and end time 0.2. Full sample trajectories remain in ignored `.local-data/field-speed-ceiling/partner-only/`; the compact retained receipt and instrument suffice to reproduce the reported observations. Each run has a 50-second default deadline and a 100000-step bound. No production solver, canonical law, or regular test suite is changed.
