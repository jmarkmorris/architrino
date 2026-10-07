# Independent finite-amplitude ordinary-domain obstruction

## Scope and predeclared method

This review checks the frozen finite-waveform proposal and its parameter box of halfwidth $2^{-20}$ in all nine parameters. It independently reconstructs the scalar squared gap and delay derivative for source $j=2$, without importing the subject's Cartesian evaluator or its floating proposal evaluator. The target is complete causal-root counts at phases $0$ and $\pi/4$, followed by a compactness argument for a nonordinary root between them. A nonordinary root does not by itself establish a generic fold, an acceleration-balance result, or a continuation rule.

The independent instrument is [overnight-b-independent-fold.py](overnight-b-independent-fold.py). It reads only the authenticated literal proposal as mathematical target input. Nominal sign changes from its own scalar expression supply provisional brackets; every root and the entire complementary delay set must then pass uniform interval tests. Known static-root/complement and separate rotation, radius and height derivative controls precede all target work. The shared executable venv, one thread, 85-decimal interval arithmetic and an internal sixty-second deadline bound the check. No long-running process was needed.

## Verdict

Claim grade: computer-assisted derived. For every fixed parameter vector in the stated nine-dimensional box and every positive length scale $R$, source $j=2$ has three ordinary positive-delay roots at deformation phase $0$ and exactly one at deformation phase $\pi/4$. At least one intermediate phase therefore has a positive-delay root with zero transmitter derivative. No history in this box belongs to the ordinary complete-history domain at every phase.

This is a finite-amplitude parameter-box exclusion from that domain. It is independent of whether the prescribed histories satisfy acceleration balance; the proof does not evaluate a balance residual. It does not exclude histories under a separately supplied singular-event extension, does not locate or classify a generic fold, and does not show that an actual initial-value evolution reaches the event. It says that every complete prescribed history in the box contains a nonordinary causal root.

## Exact parameter family

Let $R>0$, $\tau=t/R$ and $\phi=\kappa\tau$. The complete paths are

$$
X_j(t)=R\big(\rho(\phi)\cos[\beta\tau+j\pi/3+p(\phi)],\rho(\phi)\sin[\beta\tau+j\pi/3+p(\phi)],(-1)^j\zeta(\phi)\big),\qquad j=0,\ldots,5,
$$

where

$$
\rho(u)=1+a\cos2u+b\sin2u,\quad p(u)=c\cos2u+d\sin2u,\quad
\zeta(u)=H\cos u+e\cos3u+f\sin3u.
$$

Every parameter below varies independently within the closed interval of halfwidth $2^{-20}$ around its displayed exact decimal center. There are seven Fourier amplitudes and two rate parameters; the nine-dimensional box does not reinterpret the rates as Fourier amplitudes.

| Parameter | Exact decimal center |
| --- | --- |
| $a$ | `0.11997900112386073` |
| $b$ | `-0.0799710538443139` |
| $c$ | `0.02997342993774324` |
| $d$ | `0.024927982505888825` |
| $e$ | `0.039822224742504894` |
| $f$ | `-0.029891781517266583` |
| $\beta$ | `2.3997325538255883` |
| $\kappa$ | `1.000732185870741` |
| $H$ | `0.2` |

The literal input is `.local-data/master-equation-closure/overnight-b/finite-search/search-H0.2-start0.json`. Its decimal tokens are read as strings, so the box centers are not silently redefined by intermediate binary floats. The height fundamental satisfies $H>0.199999$, so this family is at finite height amplitude; it is not an infinitesimal family through a flat reference. The theorem covers arbitrary $R>0$ because the causal equation below is independent of $R$. This is a geometric scale statement and makes no claim that the full acceleration equation has the same scale covariance.

## Scalar equation and derivative

Use dimensionless delay $\delta=(t-t_s)/R>0$. At fixed reception phase $\phi$, write

$$
r=\rho(\phi),\quad s=\rho(\phi-\kappa\delta),\quad z=\zeta(\phi),\quad z_s=\zeta(\phi-\kappa\delta),\quad
\gamma=\frac{2\pi}{3}-\beta\delta+p(\phi-\kappa\delta)-p(\phi).
$$

Source $j=2$ has the same polarity and height sign as receiver zero. Squaring the causal equation gives exactly

$$
F(\phi,\delta)=r^2+s^2-2rs\cos\gamma+(z-z_s)^2-\delta^2=0.
$$

Let primes on $\rho,p,\zeta$ mean differentiation with respect to their phase argument, evaluated at the source argument when subscripted by $s$. Holding reception phase fixed gives $s_\delta=-\kappa\rho'_s$, $(z_s)_\delta=-\kappa\zeta'_s$ and $\gamma_\delta=-\beta-\kappa p'_s$. Direct scalar differentiation therefore yields

$$
F_\delta=-2\kappa(s-r\cos\gamma)\rho'_s
-2rs(\beta+\kappa p'_s)\sin\gamma
+2\kappa(z-z_s)\zeta'_s-2\delta.
$$

This derivative is independently implemented from the scalar formula, not assembled from the subject's Cartesian velocity-dot-product evaluator. If $Q$ is the dimensionless source-to-receiver separation and $V_s$ is the physical source velocity, differentiating $Q$ with respect to dimensionless delay gives $V_s$. Hence $F_\delta=2Q\cdot V_s-2\delta$. At a positive root $|Q|=\delta$, the canonical transmitter derivative is

$$
D=1-\frac{Q\cdot V_s}{\delta}=-\frac{F_\delta}{2\delta}.
$$

Thus an interior positive root with $F_\delta=0$ is precisely a nonordinary transmitter root. Squaring has introduced no extra positive root, since both the causal range and $\delta$ are nonnegative and $\delta>0$.

## Independent complete endpoint counts

The independent evaluator first finds provisional brackets from its own nominal scalar gap on a dyadic grid. Those nominal evaluations have no certification authority. Each entire parameter box must then give opposite strict signs at the bracket endpoints and a delay-derivative interval excluding zero throughout the bracket. Every complementary interval is separately proved root-free by a strict gap sign or by monotonicity and equal strict endpoint signs. The instrument verifies that the accepted root and complement intervals form a gap-free partition of $[0,4]$.

| Reception phase | Certified root intervals in dimensionless delay | Sign of $F_\delta$ in order | Complement leaves |
| --- | --- | --- | ---: |
| $0$ | $[0.609375,0.625]$, $[1.609375,1.625]$, $[1.890625,1.90625]$ | negative, positive, negative | 18 |
| $\pi/4$ | $[0.625,0.640625]$ | negative | 14 |

All listed endpoints are exact dyadic values. These are enclosures of one root each, not approximate root coordinates. Counts, derivative signs and complement coverage hold uniformly over the full nine-dimensional box. The receipt contains every outward interval and every accepted leaf. No root enumeration or count from the frozen subject is used as numerical input.

Uniform geometry completes the delay domain. The inequalities $\rho\ge1-|a|-|b|$ and $|\zeta|\le|H|+|e|+|f|$ give, throughout the box and at every phase,

$$
\rho>0.8000480,\qquad F(\phi,0)=3\rho(\phi)^2>1.9202305,
$$

and

$$
\delta\le2\sqrt{(1+|a|+|b|)^2+(|H|+|e|+|f|)^2}<2.459783
$$

for every causal root. The displayed lower bounds round downward and the upper bound rounds upward. Thus no root is at zero, and there are no roots at or beyond $4$. These same guards hold at intermediate phases, not merely at the certified endpoints.

## Why the count change forces a nonordinary root

Fix any one parameter vector in the box. Its $F$ is a smooth function on the compact rectangle $[0,\pi/4]\times[0,4]$. The positive lower boundary gap and strictly negative upper boundary gap prevent its zero set from meeting either delay boundary. Suppose every zero on the rectangle had $F_\delta\ne0$. The implicit function theorem would then continue each root uniquely as a graph of phase in a neighborhood of every zero.

At a fixed phase, the zero set in delay is finite: infinitely many zeros in the compact interval would accumulate at another zero, contradicting its nonzero derivative. Around the finite roots, choose disjoint neighborhoods where the implicit continuations apply. The remaining compact delay complement has a nonzero gap minimum, so no new root can appear there at sufficiently nearby phases. The number of roots is consequently locally constant as a function of phase. A locally constant integer-valued function on the connected interval $[0,\pi/4]$ is constant, contradicting the independently certified endpoint counts three and one.

Therefore there is a phase $\phi_*\in(0,\pi/4)$ and delay $\delta_*\in(0,4)$ with $F=F_\delta=0$. Endpoint certificates exclude nonordinary roots at either endpoint, so the phase is strictly interior. Since $\kappa>0$ and $R>0$, this phase corresponds to a reception time $t_*=R\phi_*/\kappa$ of the complete prescribed history. The divisor identity above proves $D=0$.

The argument is repeated mathematically for each fixed vector; it does not interpolate between different parameter vectors or assume that one common event location works for the entire box. It establishes at least one nonordinary event, but supplies neither $F_{\delta\delta}\ne0$ nor a transverse phase derivative. Generic fold order is therefore unproved and is not part of the verdict.

## Execution record

Known controls passed before target execution under `OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/analysis/overnight-b-independent-fold.py --stage known`, exit zero. The receipt `.local-data/master-equation-closure/overnight-b/independent-fold/known.json` has SHA-256 `633cbcfdb3f7762a9a9fecfb8cea2da1cd174da389dce7a42671ed15cab66440`; the instrument measured 0.0226 seconds wall time. This paragraph was recorded before the first target invocation.

The static control uses $F=4-\delta^2$, proves its unique root at two and covers the complementary intervals. The derivative controls separately exercise the rotation term with value $-4$, the radial term with value $-1$, and the axial term together with the delay term with value $2-\pi$. Their interval results agree with those independently derived analytical values. Nominal bracket discovery is also checked on the exact positive root $\sqrt2$ of $2-\delta^2$, followed by complete interval certification.

The target command used the identical environment prefix and script with `--stage target`, exit zero. The receipt `.local-data/master-equation-closure/overnight-b/independent-fold/target.json` has SHA-256 `c860ac236028ce626ae98b26fdc9ba68a586470631e0a8858846f07679fe4512`. It records 1.3453 seconds wall time and macOS `ru_maxrss=27033600` bytes. The returned execution session `27623` subsequently returned exit zero; no scientific process remains from this review.

| Artifact | SHA-256 |
| --- | --- |
| Independent instrument | `f43d7cc3760d0a6210b532f06bf6d5b3c1d71b562bcf1e04bb4c379edd1b9a4f` |
| Literal proposal, authenticated before target evaluation | `84bbc04c3f65beee68864e7609951fbf31a647b0f20901fb74bc577662f213de` |
| Frozen subject instrument, read but not imported or executed | `a0265df52e9899b9ee5a9bb8e9ddb72823f0ec3e533d61265855117c1cd4629d` |
| Frozen subject target receipt, identified but not mathematical input | `c5d978ce100523ee00a5ef7ce98d5e50140a16af77f9585ffcc4d6b3f50f6e90` |

Known and target runs used the same independent instrument identity. `shasum -a 256` recorded the listed identities. The tracked independent instrument is the reproducer; the authenticated ignored proposal is a required local input. No subject evaluator, subject receipt, or prior oracle was modified. Source inspection served only to identify the declared family and review target.

Scoped whitespace validation ran `git diff --no-index --check /dev/null` separately on the two new owned source files. Both emitted no whitespace diagnostics; exit one is the expected new-file difference from `/dev/null`. The independent Python file executed successfully in both stages. No regular test suite was added or run.

## Boundaries and falsifiers

A missed endpoint root, failed complement interval, incorrect scalar derivative, failed parameter enclosure, mismatch of the literal input, or failure of the uniform boundary guards would defeat its corresponding certificate. A parameter vector in the stated box whose complete source-$j=2$ root set remained ordinary throughout the phase interval would contradict the count-continuation conclusion. A history outside the box is not a falsifier. The interval library is shared infrastructure; independence here consists of a separate mathematical scalar evaluator, separate derivative controls, fresh brackets and complete interval coverage, not a second arbitrary-precision library.

Only this report, its independent instrument and the two ignored receipts were written. No production solver, corpus, shared ledger, regular tests, publication state or scheduler was changed. The mathematical review has no remaining blocker within its declared scope; generic singularity classification and any continuation beyond the ordinary domain remain outside it.
