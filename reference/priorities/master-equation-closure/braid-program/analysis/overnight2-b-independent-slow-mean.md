# Independent slow-motion tangential-mean review

## Verdict and scope

Claim grade: independently reconstructed derivation. The first-order canonical row, the five-partner tangential sum, the exact period identity, and the necessary slow-limit mean condition in [the frozen analytical subject](overnight2-b-slow-motion-conditions.md) are correct. The pure sinusoidal mean has exactly one positive zero. These are conditions on prescribed complete histories under the unchanged canonical law with $K=c_f=1$, not an exact spatial solution, stability calculation or evolution result.

One proof-detail qualification is required. The subject attributes the uniform remainder partly to bounded second parameter derivatives. With only $C^2$ profiles, differentiating delayed velocity twice with respect to the slow parameter can require a third profile derivative. That differentiability assertion is not warranted as a general route for the complete row. The stated uniform $O(\epsilon^2)$ remainder nevertheless follows under exactly the stated $C^2$ hypotheses by the position and velocity estimates below. No stronger regularity assumption is needed for the theorem.

The subject SHA-256 at dispatch, measured by `shasum -a 256`, is `01c4a1e72092d6bd2d8f04f08c51411fc35a904d7c5c905baf7fd6565895839a`. It and the previous independent chart files remain unmodified. The present review uses a fresh derivation and a [new standard-library rational instrument](overnight2-b-independent-slow-mean.py), which imports no subject or other research instrument. The Ramon E. Moore role is an analytical lens, not acceptance authority. The parent researcher owns integration into the second-allocation report.

## Complete paths and the exact period identity

Let $R>0$, $\tau=t/R$, $\phi=\epsilon k\tau$, and $\theta_j=\epsilon b\tau+j\pi/3+p(\phi)$. The complete prescribed paths are

$$
X_j(t)=R\big(\rho(\phi)\cos\theta_j,\rho(\phi)\sin\theta_j,(-1)^j\zeta(\phi)\big),\qquad j=0,\ldots,5.
$$

Here $\epsilon>0$ is the slow parameter; $b,k>0$ are fixed rates; and $\rho,p,\zeta$ are real $C^2$, $2\pi$-periodic profiles with $\rho\ge\rho_*>0$. A prime denotes a phase derivative. The radius scale $R$ may depend on $\epsilon$. The instantaneous angular-rate factor in dimensionless coordinates is $\omega=b+kp'$. In the receiver's cylindrical frame the prescribed tangential acceleration is $L_t/R$, with

$$
L_t=\epsilon^2\big(2k\rho'\omega+\rho k^2p''\big),\qquad
\rho L_t=\epsilon^2 k(\rho^2\omega)'.
$$

The canonical dimensionless acceleration $A$ gives physical acceleration $A/R^2$. Exact balance requires $RL=A$. Averaging its tangential equation over a full phase cycle gives the exact necessary identity

$$
\langle\rho A_t\rangle=0,\qquad
\langle f\rangle=\frac1{2\pi}\int_0^{2\pi}f(\phi)\,d\phi.
$$

The integral of $(\rho^2\omega)'$ vanishes because its factors are periodic. This is a direct geometric consequence of exact acceleration balance. It requires no imported conservation law and remains valid for relative-periodic positions; a common rotation after one deformation period leaves the cylindrical components unchanged.

## Uniform first-order row under only two profile derivatives

Work at fixed reception phase in the instantaneous receiver frame. Put $x_j=X_j/R$ and let the positive dimensionless delay be $\delta=d/R$. For sufficiently small $\epsilon$, uniform profile bounds give constants $B,V,A$ independent of $\epsilon$, phase and $R$ such that

$$
|x_j|\le B,\qquad |\partial_\tau x_j|\le\epsilon V,\qquad
|\partial_\tau^2x_j|\le\epsilon^2 A.
$$

These bounds follow by differentiating the prescribed paths twice. They use only bounded profiles and two bounded phase derivatives. The simultaneous partner separation is at least $\rho_*$, since the smallest planar hexagon chord equals the radius. When $\epsilon V<1$, the complete-past monotonic-gap argument gives exactly one partner root and no positive self root, and every partner root has $0<\delta\le2B$. Its divisor has the uniform floor $D\ge1-\epsilon V>0$. Thus all five partners remain in the expansion and no self term has been discarded.

For a fixed partner let $Q_0=x_i(\tau)-x_j(\tau)$, $s=|Q_0|\ge\rho_*$ and $n=Q_0/s$. Write the simultaneous source velocity as $\partial_\tau x_j(\tau)=\epsilon V_1$. Taylor's formula in source time, using the acceleration bound, gives

$$
Q=x_i(\tau)-x_j(\tau-\delta)
=Q_0+\epsilon\delta V_1+E_Q,\qquad
|E_Q|\le\tfrac12\epsilon^2 A\delta^2.
$$

It also gives the separate velocity estimate

$$
\partial_\tau x_j(\tau-\delta)=\epsilon V_1+E_V,\qquad
|E_V|\le\epsilon^2 A\delta.
$$

These two estimates replace the unnecessary second-parameter-derivative assertion. First, $|\delta-s|\le\epsilon V\delta=O(\epsilon)$ from the source Lipschitz bound and the root equation $|Q|=\delta$. The ordinary Euclidean norm has bounded second derivatives near $Q_0$, uniformly because $s\ge\rho_*$. Its Taylor expansion, together with the last estimate, then yields

$$
\delta=s+\epsilon s(n\cdot V_1)+O(\epsilon^2),\qquad
\widehat Q=n+O(\epsilon),\qquad
D=1-\epsilon n\cdot V_1+O(\epsilon^2).
$$

All error constants are uniform in reception phase. For a family with common bounds on $B,V,A,\rho_*$ they are uniform over that family too. No $R$ enters them. Smooth scalar operations on positive $\delta$ and $D$ preserve these first-order expansions with quadratic remainders. Applying them to the [canonical source-side row](../../../../../content/markdown/aaa/dynamics/master-equation.md#path-history-sum-and-integral-representation) gives

$$
\frac{Q}{\delta^3D}
=\frac{Q_0}{s^3}
+\frac{\epsilon}{s^2}\big(V_1-2n(n\cdot V_1)\big)+O(\epsilon^2).
$$

To check the coefficient independently, the numerator variation contributes $V_1/s^2$; differentiating $\delta^{-3}$ contributes $-3n(n\cdot V_1)/s^2$; and differentiating $D^{-1}$ contributes $+n(n\cdot V_1)/s^2$. Their sum gives the factor minus two. The ordinary divisor is positive here, so replacing $|D|$ by $D$ is justified.

## Five-partner tangential sum

For receiver zero, define $\alpha=j\pi/3$ and $\sigma=(-1)^j$. The simultaneous partner quantities are

$$
Q_0=\big(\rho(1-\cos\alpha),-\rho\sin\alpha,(1-\sigma)\zeta\big),\qquad
s^2=2\rho^2(1-\cos\alpha)+(1-\sigma)^2\zeta^2,
$$

$$
V_1=\big(k\rho'\cos\alpha-\rho\omega\sin\alpha,
k\rho'\sin\alpha+\rho\omega\cos\alpha,\sigma k\zeta'\big).
$$

The leading zeroth-order tangential row is odd in $\sin\alpha$, so partners $j$ and $6-j$ cancel. In the first-order radial-velocity part, both $V_{1y}$ and the factor $n_y(n\cdot V_1)$ are odd in $\sin\alpha$; the vertical-velocity part has the same odd parity. Their paired sums vanish. Source three has $\sin\alpha=0$, so both such contributions vanish individually there. For the rotation part, direct multiplication gives $Q_0\cdot V_1=-\rho^2\omega\sin\alpha$. Including the canonical polarity $\sigma$ and multiplying the tangential row by $\rho$ leaves

$$
\sigma\omega\left(\frac{\rho^2\cos\alpha}{s^2}
-\frac{2\rho^4\sin^2\alpha}{s^4}\right).
$$

Set $h=\zeta/\rho$. The independent evaluation of all channels is:

| Sources | Polarity | Angle data | Combined coefficient multiplying $\omega$ |
| --- | --- | --- | --- |
| $j=1,5$ | $-1$ | $\cos\alpha=1/2$, $\sin^2\alpha=3/4$, $s^2/\rho^2=1+4h^2$ | $-1/(1+4h^2)+3/(1+4h^2)^2$ |
| $j=2,4$ | $+1$ | $\cos\alpha=-1/2$, $\sin^2\alpha=3/4$, $s^2/\rho^2=3$ | $-2/3$ |
| $j=3$ | $-1$ | $\cos\alpha=-1$, $\sin\alpha=0$, $s^2/\rho^2=4(1+h^2)$ | $1/[4(1+h^2)]$ |

The first table entry simplifies to $(2-4h^2)/(1+4h^2)^2$. Thus the complete sum is

$$
\rho A_t=\epsilon\omega C(h)+O(\epsilon^2),\qquad
C(h)=\frac{2-4h^2}{(1+4h^2)^2}-\frac23+\frac1{4(1+h^2)}.
$$

Define $M=\langle(b+kp')C(\zeta/\rho)\rangle$. Combining the uniform expansion with the exact period identity gives $0=\epsilon M+O(\epsilon^2)$. If fixed profiles and rates have $M\ne0$, division by $\epsilon$ excludes exact balance for all sufficiently small positive $\epsilon$, at every scale $R$. The threshold is unquantified until numerical bounds for the remainder are supplied. If a bounded family has a common positive radius floor, common $C^2$ and rate bounds, and $|M|$ bounded away from zero, it has a common threshold. For profiles converging in $C^2$ and positive rates converging to positive limits, continuity of $M$ forces limiting $M=0$ along any sequence of exact histories with $\epsilon\to0$. None of these statements supplies sufficiency or a finite-speed exclusion without a remainder constant.

## Pure sinusoidal mean and uniqueness, before numerical location

For $\rho=1$, $p=0$ and $\zeta=H\cos\phi$, the condition is $M=b\overline C(H)$. To reconstruct the integral, let $t\ge0$ and set

$$
I(t)=\left\langle\frac1{1+t\cos^2\phi}\right\rangle.
$$

Four quadrant symmetry and $u=\tan\phi$ give $I(t)=(2/\pi)\int_0^\infty du/(u^2+1+t)=1/\sqrt{1+t}$. Differentiation under the integral is legitimate on every bounded $t$ interval because the denominator is at least one. The square-denominator integral is $I(t)+tI'(t)=(2+t)/[2(1+t)^{3/2}]$. Decomposing the neighboring-source fraction as $3/(1+t\cos^2\phi)^2-1/(1+t\cos^2\phi)$ and taking $t=4H^2$ gives

$$
\overline C(H)=\frac{2(1+H^2)}{(1+4H^2)^{3/2}}-\frac23+\frac1{4\sqrt{1+H^2}}.
$$

At $H=0$ its exact value is $19/12$ and as $H\to\infty$ its limit is $-2/3$. Independent differentiation gives

$$
\overline C'(H)=-\frac{4H(5+2H^2)}{(1+4H^2)^{5/2}}-\frac{H}{4(1+H^2)^{3/2}}<0\quad(H>0).
$$

Continuity and strict decrease prove exactly one positive zero before any numerical location is attempted. That zero is the unique leading-order tangential compatibility height in this pure family. It is not a proof of any exact canonical history at that height.

## Known-first numerical record

Before target evaluation, the fresh rational instrument's known stage exited zero at 2026-10-07 03:44:30 UTC under the shared Python venv, with `OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1`. It returned the exact square roots of $0$, $4$, $9/16$, enclosed $\sqrt2$ inside the independent rational interval $(1.4142,1.4143)$, recovered the zero-height mean $19/12$, checked $C(0)=19/12$ and $C(1)=-373/600$, and checked the exact longitudinal-row derivative $-1/4$ at simultaneous separation two. For that last known case a constant source velocity $\epsilon$ gives the exact root $2/(1-\epsilon)$ and row $(1-\epsilon)/4$, so the first derivative is independently known.

The known receipt is `.local-data/master-equation-closure/overnight2-b/independent-slow-mean/known.json`; instrument SHA-256 is `1ddceb157daba7fac2eef7ce01511eecdb8867d478b8bc807dc5e3f0db4fc7f4`. This pass is recorded before the target. The target will locate only the already-proved unique zero, using exact rational interval signs and integer square-root enclosures; no floating quadrature or subject code is involved.

## Certified compatibility height

After the known pass and uniqueness proof were recorded, the target stage exited zero at 2026-10-07 03:45:56 UTC. Its exact rational enclosure is

$$
\frac{878790921}{1073741824}<H_*<\frac{1757581843}{2147483648}.
$$

The enclosure has exact width $2^{-31}$. For orientation its endpoints are approximately $0.8184378230944276$ and $0.8184378235600889$; the rational endpoints, not those displayed decimals, govern the certificate. The outward interval for $\overline C$ at the left endpoint is strictly positive, and at the right endpoint strictly negative. The original full rational numerators and denominators are retained in `target.json`.

The square-root instrument uses only integer and rational arithmetic. For a nonnegative rational $q=N/D$ and $S=10^{24}$, it computes $m=\lfloor\sqrt{\lfloor NS^2/D\rfloor}\rfloor$ by integer square root. Then $m/S\le\sqrt q\le(m+1)/S$, with an exact single-point interval when $(m/S)^2=q$. The positive-denominator expression for $\overline C$ is evaluated by substituting the upper root bounds for its lower value and the lower root bounds for its upper value. Exact rational bisection on the interval $[0,2]$ then retains strict opposite endpoint signs through 32 steps. The uniqueness theorem identifies the enclosed zero; bisection is only its quantitative location.

As a derived corollary, the pure family $\rho=1,p=0,\zeta=H\cos\phi$ with $0\le H\le3/4$ has strictly positive $\overline C(H)$, hence positive $M$ for $b>0$. Fixed such profiles cannot be exact canonical solutions at arbitrarily small positive slow parameter. A common small-parameter exclusion follows over bounded rates with $b$ bounded away from zero and the uniform derivative hypotheses. This does not exclude general radial/phase-modulated profiles or supply a numerical finite-speed threshold.

## Receipts, preservation and falsifiers

| Item | SHA-256 by `shasum -a 256` |
| --- | --- |
| Frozen analytical subject | `01c4a1e72092d6bd2d8f04f08c51411fc35a904d7c5c905baf7fd6565895839a` |
| Independent instrument | `1ddceb157daba7fac2eef7ce01511eecdb8867d478b8bc807dc5e3f0db4fc7f4` |
| Independent `known.json` | `35fff8bb1e36dd14c48917f58568701c247c6acd290ed33226d39f91e61da4e2` |
| Independent `target.json` | `d48ea5910271da975d7f4245b8872f2018491318359691c174c415319a43b446` |

Both receipts remain in `.local-data/master-equation-closure/overnight2-b/independent-slow-mean/`. Native `wc -lc` measured 14 lines and 438 bytes for `known.json`, and 22 lines and 1,384 bytes for `target.json`; native `shasum -a 256` verified both intact payloads at handoff. They contain the instrument identity, arithmetic results, stage, timestamp and measured internal wall time. The known run recorded about 0.000225 seconds and the target about 0.001467 seconds by `time.perf_counter()`. These were synchronous short commands with terminal exit zero; no detached reviewer process was launched. The proof and standalone reproducer are the two reviewer-owned analysis files. Original subject and prior reviewer evidence remain unchanged.

This is accepted local retention under the [preservation owner](../../../../op/machine-artifact-retention.md#preservation-from-creation-through-closeout), not a claimed remote backup. No replay has been run and practical historical-byte recovery is unverified; timestamps and measured runtimes would differ on regeneration. Preserve the original receipts. The instrument creates outputs exclusively, so a replay must choose new filenames. From the repository root:

```bash
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/analysis/overnight2-b-independent-slow-mean.py --stage known --output .local-data/master-equation-closure/overnight2-b/independent-slow-mean/replay-known.json
# Inspect and record the known pass before running the target.
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/analysis/overnight2-b-independent-slow-mean.py --stage target --output .local-data/master-equation-closure/overnight2-b/independent-slow-mean/replay-target.json
```

Falsifiers are an incorrect source-side first-order row, a surviving radial/vertical paired tangential term, failure of the displayed integral or derivative, or an exact sequence satisfying the uniform premises with nonzero limiting $M$. A certified evaluation placing the unique sinusoidal zero outside the rational bracket would overturn its quantitative enclosure. Check the independent proof and original rational receipt at those points; a small sampled full-vector residual does not adjudicate this mean theorem. Removing a positive radius floor, losing uniform $C^2$ bounds, or varying profiles without the stated convergence removes the corresponding uniform conclusion's premises.

The remaining obligations are parent integration of the proof qualification and accepted results, quantitative finite-speed remainder bounds where a finite threshold is needed, and all radial, axial and pointwise tangential balance equations for any putative solution. This bounded review stops after scoped validation; the larger second-allocation investigation continues.

Scoped validation: the shared-venv Python built-in `compile` accepted the independent instrument without creating a bytecode artifact. Native `git diff --no-index --check /dev/null` emitted no whitespace diagnostics for each of the two reviewer-owned files. A final subject hash read matched the dispatch identity. No regular test, generator change, Git mutation, heavy computation or recursive reviewer was introduced. The only new authored files are `overnight2-b-independent-slow-mean.md` and `overnight2-b-independent-slow-mean.py`; the two local receipts are preserved separately as listed above.
