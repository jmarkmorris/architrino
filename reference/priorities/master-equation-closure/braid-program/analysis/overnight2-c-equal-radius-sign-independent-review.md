# Independent interval check of a negative equal-radius tangential sum

## Result and scientific boundary

**Measured interval certificate:** the separately authored instrument encloses the total of the three positive receivers' signed local tangential acceleration sums at $a=1$, $v=3/4$, positive phases $(0,\pi/8,\pi/4)$ and negative antipodes in

$$
\sum_{i:q_i=+1} A_{i,t}\in
[-0.364369107351350557194449,\,-0.364369107351350557194448].
$$

In particular the exact sum lies strictly between $-0.365$ and $-0.364$. All fifteen positive-receiver partner rows were enclosed, with strictly positive delay and transmitter-factor intervals. The independently proved antipodal symmetry supplies the corresponding fifteen negative-receiver rows, and the complete angle theorem excludes every positive self hit. The law is unchanged coefficient-one logarithmic reception, $K_{\log}=c_f=1$.

**Derived implication:** an unrestricted assertion that this signed total is positive on every distinct equal-radius three-pair configuration is false. This is a sum of signed local tangential components, not a global Cartesian vector sum. The chosen positive phases lie in an arc of width $\pi/4$; the configuration is nonalternating and already excluded by the radial theorem. This certificate supplies no counterexample in the alternating sector, no exact equilibrium, no stability result, and no phase-wide sign conclusion beyond falsifying the unrestricted positive-total assertion.

## Known-first execution record

Before any target execution, the separately authored [interval instrument](../evidence/overnight2-c-equal-radius-sign-independent-check.py) passed its `--stage known` controls under the shared venv. The local receipt is `.local-data/master-equation-closure/overnight2-c/review-equal-sign-known.json`. The controls checked exact binary endpoint decoding, outward decimal rounding of both signs of one third, enclosure of $\sin(\pi/2)=1$, a manufactured root $\alpha=\pi/2$, $v=1/2$, $\beta=\pi/2-\sqrt2/2$ with negative-polarity radial and tangential row $-1/[2(1-\sqrt2/4)]$, and all fifteen positive-receiver rows of the static regular alternating hexagon. For that static control each radial sum encloses $-1/2$ and each tangential sum encloses zero with magnitude below $10^{-23}$.

The measured known-stage execution took 0.06475283391773701 seconds with peak resident memory 23,150,592 bytes, reported by `time.perf_counter` and `resource.getrusage` inside the instrument. The shared venv supplied `mpmath 1.3.0`; the instrument uses its 80-decimal-digit interval context for transcendental arithmetic and exact rational arithmetic for root endpoints and outward decimal output. No subject or parent probe code is imported. This known-pass paragraph was written before the target was run; the target result above was added subsequently.

The unchanged limits for this one-point check are 30 instrument seconds, 400 MB resident memory, 100 kB output, and one thread. The allocation's 13:55:15 UTC exploration stop and 15:25:15 UTC hard deadline remain unchanged.

## Why the instrument encloses the complete selected sum

The independent reference is the [geometric causal-angle derivation](overnight2-c-equal-radius-chart-independent-review.md): for each directed partner, the unique angle $\alpha\in(0,2\pi)$ solves $H_v(\alpha)=\beta$, with $H_v(\alpha)=\alpha-2v\sin(\alpha/2)$. The local row at $a=1$ is

$$
D=1-v\cos(\alpha/2),\quad \tau=2\sin(\alpha/2),\quad
A_r=\frac{q_iq_j}{2D},\quad
A_t=\frac{q_iq_j\cos(\alpha/2)}{2\sin(\alpha/2)D}.
$$

The instrument forms the six persistent member phases as exact rational multiples of $\pi$, creates negative antipodes by adding $\pi$, and computes each clockwise separation as $(\theta_i-\theta_j)\bmod2\pi$. Distinctness is checked before enumeration. The loops include all three negative sources and both other positive sources for each positive receiver; only that receiver's own zero-delay label is skipped. The analytical complete-root theorem, rather than a search grid, establishes that no other positive partner or self root exists.

Each root starts in the rational bracket $[0,7]$, with rigorously opposite interval gap signs. At this target speed $H_v'\ge1-v=1/4$ everywhere, so a unique root remains between the bracket endpoints. Bisection uses exact rational midpoints and updates only when the entire outward interval gap is strictly on one side of zero. An unresolved sign raises an error rather than being assigned a side. Both endpoint signs are checked again after contraction. Each target root required ninety bisections, giving width below $10^{-26}$; the resulting interval is also checked to lie inside $(0,2\pi)$. Interval sine and cosine evaluations on this whole root enclosure supply delay, factor, and both row components.

The interval arithmetic is supplied by `mpmath.iv`, including its enclosing value of $\pi$ and directed endpoint operations. No ordinary floating evaluation is used for a root sign, a row, or its sum. Exact dyadic endpoint values are recovered from the interval representation and converted to the displayed decimal endpoints by integer floor and ceiling, including for negative numbers. Thus display rounding enlarges enclosures. The numerical certificate relies on this interval-library implementation; it is not a formal proof of that library's elementary-function algorithms. The separately derived chart and analytic controls establish the intended mathematical contract independently of the parent's floating probe.

## Target receipt

The local target receipt `.local-data/master-equation-closure/overnight2-c/review-equal-sign-target.json` records all fifteen rows individually, including ordered receiver/source identity, polarity, exact present angle in units of $\pi$, emission-angle enclosure, delay, factor, radial row, and tangential row. Its three receiver tangential sums are

| Positive phase | Outward enclosure of signed tangential sum |
|---|---|
| $0$ | $[-3.231216308417114730195608,-3.231216308417114730195607]$ |
| $\pi/8$ | $[-0.168486222724448018675997,-0.168486222724448018675996]$ |
| $\pi/4$ | $[3.035333423790212191677155,3.035333423790212191677156]$ |

Analytically $D\ge1-v=1/4$ at this target, and every computed factor interval has a strictly positive lower endpoint. The smallest computed lower endpoint is greater than $0.4032$. The target execution measured 0.0684082917869091 seconds and 23,265,280 bytes peak resident memory by the instrument's timing and resource calls. Its output-size assertion passed below 100 kB. The target and known stages both exited successfully; neither spawned another worker or grid.

The executed commands, in this order with the known pass recorded between them, were:

```bash
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight2-c-equal-radius-sign-independent-check.py --stage known > .local-data/master-equation-closure/overnight2-c/review-equal-sign-known.json
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight2-c-equal-radius-sign-independent-check.py --stage target > .local-data/master-equation-closure/overnight2-c/review-equal-sign-target.json
```

## Identities, falsifiers, and preservation

Measured SHA-256 identities from `shasum -a 256`:

- Independent instrument: `3383a68c155a06ea0e7a7493d71d990337bd691776ecbff134b2fcf3aaee0d0a`.
- Known receipt: `c11bed386115fdcddb945a999799bbbb4d50a46e25c26b39c0cf99a33035644f`.
- Target receipt: `82545e7a2dcf0497ac5416bc24388f439ee6de724b5ee6264b9a8c45b0c7f26b`.

The certificate would be overturned by an incorrectly directed interval operation or decimal conversion, a root outside its checked sign bracket, a row polarity or phase convention inconsistent with the geometric chart, an omitted positive hit, or an independent rigorous enclosure of the same complete scalar sum incompatible with this negative interval. Agreement with the parent's approximate number is not the independence argument: separate source authorship, the geometric root theorem, interval enclosure, and recorded analytic controls are.

Only the authorized independent instrument, this review, and the two review-prefixed local receipts were written for this numerical check. Subject proofs, the parent's floating probe, main report, prior evidence and shared owners were untouched. No interpretation beyond the selected single point or broad search follows. The clock tool returned 2026-10-07 05:38:24 UTC after target completion, within the unchanged second allocation.
