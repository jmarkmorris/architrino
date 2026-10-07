# Independent finite-speed tangential-mean review

## Scope and known-first record

This review targets the entire exact-rational coefficient box in [the frozen finite-speed subject](overnight2-b-finite-speed-mean.md), with six coefficients independently in $[-1/1000,1/1000]$, $H\in[299/1000,301/1000]$, $\beta\in[249/1000,251/1000]$ and $\kappa\in[149/1000,151/1000]$. Every $R>0$ is included under unchanged canonical $K=c_f=1$. The subject instrument is frozen at `7acbd19f11b324ddf700db796ddb62f6409de466c340b0baac5c5488553c8f23`. The parent owns integration; all subjects, previous oracles and shared owners remain unmodified.

The [independent instrument](overnight2-b-independent-finite-speed.py) uses separately reconstructed scalar chord geometry, a separately bounded speed below $0.26$, and global monotone-slope contraction rather than the subject's Cartesian norm and cell-dependent derivative contraction. It uses 45-decimal mpmath interval arithmetic and a predeclared 384-cell target rather than the subject's 40-decimal, 256-cell calculation. The library is a shared arithmetic primitive; no subject functions, roots or cell results are imported. Exact binary-rational interval endpoints are retained.

Before any target or pilot, the independent known stage exited zero using the executable shared venv with numerical/BLAS thread counts set to one. It checked the sign-changing interval product $[-1,2][-1,2]=[-2,4]$ against the square range $[-1,2]^2=[0,4]$, the exact square root of four, an exact linear root at two, all five static unit-hexagon roots through exact rational endpoint-square inequalities against $1,3,4,3,1$, static tangential cancellation and the independent static radial closed form $-5/4+1/\sqrt3$. Static root widths were required below $10^{-18}$; the static tangential width was required below $10^{-17}$. The known run took 0.095003 internal seconds by `time.monotonic()` and left `.local-data/master-equation-closure/overnight2-b/independent-finite-speed/known.json`, SHA-256 `930af72943131bad97fd4c5dd22a76b4425f2d2a8d3cad3232ab97de27292c64`. This pass is recorded before target use.

The predeclared pilot has eight phase cells. The independent target has 384 phase cells, five partner channels per cell and at most 24 global-slope contraction steps per root. Its internal alarm is 110 seconds and supervisor deadline 120 seconds, with 512 MiB resident and 8 MiB output bounds, one numerical thread and five-second advancing phase progress. The parent has reserved the computational slot. A nonpositive or incomplete enclosure is unresolved, not a balanced-history finding.

The known-stage and pilot instrument identity is `329a21d0f791c80a9dcd6d9604e182bf09f53959027a38a08593567773d84be4`. The pilot completed all eight cells in 0.071972 internal seconds, with 27,213,824 bytes peak resident memory by macOS `getrusage`; supervisor run `c02489e1-f22e-451d-8626-54aa5591beb9` closed after 0.159 supervised seconds with exit zero, zero stderr and closed process group. Its interval straddles zero (display approximately $[-0.07139,0.58075]$), so it makes no exclusion claim. The preserved `pilot.json` supplies the measured cost supporting the predeclared 384-cell target.

## Independent acceptance

Claim grade: computer-assisted derived, independently checked on the full coefficient box and all reception phases. The independent target completed every one of its 384 cells with all five partner channels and no unresolved diagnostic. It encloses the exact dimensionless mean as

$$
L\le\langle\rho A_t\rangle\le U,\qquad L>0,
$$

where the authoritative exact binary-rational endpoints are

$$
L=\frac{4456842077335040347589979943250800202344895461}{22835963083295358096932575511191922182123945984},\qquad
U=\frac{6541169972077876471099879275219724185067337853}{22835963083295358096932575511191922182123945984}.
$$

For orientation only, their decimal displays are approximately $0.19516768620961936$ and $0.28644160739876046$. The positive exact numerator of $L$ establishes the strict sign. This excludes full-vector canonical balance throughout the complete nine-parameter box, at every $R>0$. No speed expansion or unquantified remainder is used. It does not exclude other coefficients, other waveform families or actual trajectories outside this prescribed family.

The frozen subject implementation also has a valid inclusion and averaging argument, as audited below. Its distinct 256-cell enclosure is wider and positive. Agreement is not inferred from matching output bytes: the independent calculation changes the norm formula, root slope enclosure, divisor algebra, precision and phase partition, and imports no subject code or retained roots. Both calculations use mpmath 1.3.0 interval primitives; this shared arithmetic dependency is explicit.

## Complete histories and tighter independent chart

For all real times, put $\tau=t/R$, $\phi=\kappa\tau$ and prescribe

$$
X_j(t)=R\big(\rho(\phi)\cos[\beta\tau+j\pi/3+p(\phi)],\rho(\phi)\sin[\beta\tau+j\pi/3+p(\phi)],(-1)^j\zeta(\phi)\big),
$$

$$
\rho=1+a\cos2\phi+b\sin2\phi,\qquad p=c\cos2\phi+d\sin2\phi,\qquad
\zeta=H\cos\phi+e\cos3\phi+f\sin3\phi.
$$

All nine parameters range independently over the exact intervals stated above. For this smaller box, $0.998\le\rho\le1.002$, $|\zeta|\le0.303$, $|\rho'|,|p'|\le0.004$ and $|\zeta'|\le0.307$. The physical velocity components in a member's instantaneous cylindrical frame are $\kappa\rho'$, $\rho(\beta+\kappa p')$ and $(-1)^j\kappa\zeta'$. Their magnitudes are bounded by the exact rationals

$$
0.000604,\qquad1.002(0.251+0.151\times0.004)=0.252107208,\qquad0.151\times0.307=0.046357.
$$

The independent target checks by exact `Fraction` arithmetic that the sum of their squares is below $0.26^2$. Thus speed is strictly below $v_*=13/50$, uniformly over the complete past and independent of $R$. The present partner separation is at least $0.998R$. Every path lies in a ball of radius $R\sqrt{1.002^2+0.303^2}$. For dimensionless delay $\delta=d/R$, the exact rational comparisons

$$
0.79(1+0.26)<0.998,\qquad4(1.002^2+0.303^2)<2.1^2
$$

give the common root bracket $(0.79,2.1)$. These inequalities were checked independently in the target arithmetic; no subject root enclosure was reused.

For a fixed receiver event, the source-distance function changes by at most $v_*$ times a change in delay. Therefore the causal gap $g(\delta)=|Q(\delta)|-\delta$ has every nonzero secant slope in $[-1.26,-0.74]$. It is positive at zero, negative beyond the enclosing diameter and strictly decreasing. Each of the five partner channels has exactly one positive root; the source's own displacement is strictly smaller than every positive delay, so no positive self root exists. At an ordinary root the exact source divisor is $D=1-\widehat Q\cdot V_s\in(0.74,1.26)$. This supplies complete source complements and a positive divisor without root sampling or a finite-memory cutoff.

## Independent scalar geometry and root inclusion

Let $r,z,p$ denote reception values, and $s,z_s,p_s$ the source profile values at phase $\phi-\kappa\delta$. For source $j$ set $\sigma=(-1)^j$ and

$$
\gamma=j\pi/3-\beta\delta+p_s-p.
$$

The independently implemented scalar distance is the exact chord identity

$$
|Q|^2=(r-s)^2+4rs\sin^2(\gamma/2)+(z-\sigma z_s)^2.
$$

All squares use even interval powers, retaining a nonnegative square range. The independent root method uses only the global secant bounds. If the current interval $I$ contains every allowed root and $m\in I$, then for each fixed parameter/phase point

$$
\delta_*=m+\frac{g(m)}{d_m},\qquad d_m\in[0.74,1.26].
$$

When $\delta_*=m$, the equality holds with zero gap; otherwise it follows from the secant slope between $m$ and the root. Thus intersecting $I$ with the outward interval $m+g(m)/[0.74,1.26]$ preserves all allowed roots. This works even if separation vanishes elsewhere, because the secant bound uses the source Lipschitz estimate rather than differentiability at zero separation. A rounded midpoint interval encloses an actual midpoint in $I$; evaluating the gap on that interval remains an inclusion. Stopping after finitely many contractions leaves a valid enclosure, regardless of its width.

At the final root interval, independently expand the source dot product from the scalar geometry. With source phase derivatives $s',p_s',z_s'$ and angular rate $\Omega_s=\beta+\kappa p_s'$, it is

$$
Q\cdot V_s=\kappa s'(r\cos\gamma-s)-rs\Omega_s\sin\gamma
+\kappa z_s'(\sigma z-z_s).
$$

For a second direct check, differentiating the displayed squared-distance expression with respect to delay gives twice this dot product, since the derivative of the delayed source phase is $-\kappa$ and the angle derivative is $-\Omega_s$. At a root $|Q|=\delta$, so

$$
D=1-\frac{Q\cdot V_s}{\delta},\qquad
A_{t,j}=-\frac{\sigma s\sin\gamma}{\delta^3D}.
$$

The independent instrument evaluates this scalar dot product, intersects the divisor with its proved global interval and includes every $j=1,\ldots,5$. Intersections discard only values forbidden by a proved bound, never a required physical source. Multiplying the summed tangential interval by the reception-radius interval encloses $\rho A_t$ throughout the phase cell and parameter box.

## Audit of the frozen subject and outward arithmetic

The subject evaluates the same delayed geometry in Cartesian components. Its interval Newton sign is correct: $\partial_\delta g=\widehat Q\cdot V_s-1=-D$, hence the Newton inclusion is $m+g(m)/D(I)$. When its separation interval is strictly positive, its direct derivative interval contains all intervening derivatives. When separation cannot be separated from zero, its fallback global slope interval remains valid by the secant argument above. The broader clamp $[0.199,1.801]$ is licensed by the earlier independent complete-history speed bound below $0.801$. The starting delay interval $[0.488,2.789]$ is likewise already globally proved. Its final divisor formula substitutes $|Q|=\delta$ only at roots, where this equality is exact. The geometric derivative divisor is used for contraction; the root-specific divisor is used for acceleration, so the two roles are not confused.

The subject's products `q*q` are generic interval products. If $q$ straddles zero, the product can have a negative lower bound; for example $[-1,2][-1,2]=[-2,4]$, whereas the square range is $[0,4]$. The wider product still contains every actual square. Thus this dependency loss can make a norm estimate wider or a computation unresolved, but cannot remove a true value. The completed target returns real interval results throughout its executed norm calculations. No code path converts an invalid or incomplete cell into a successful enclosure. The independent chord expression avoids that particular widening with even powers.

Both instruments construct decimal inputs from strings or exact integers rather than rounded binary64 parameter values. Their arithmetic remains in the mpmath interval context. Source inspection of the installed `mpmath/libmp/libmpi.py` verified floor/ceiling endpoint rounding in addition, subtraction, multiplication, division, integer powers, square root and interval $\pi$, together with extremum handling and outward finalization for sine/cosine. The independent known controls specifically check the product-versus-square distinction. This inspection and the controls support the use of the installed interval library; they are not a formal proof of the entire arithmetic library. The positive target conclusion depends on that stated library and the reproducible arithmetic record.

Exact endpoint serialization decodes the interval's binary sign, integer mantissa and exponent into a rational number. Display floats are explicitly diagnostic only. Subject floating conversion occurs in its known-width check, not in scientific target bounds; the independent display floats likewise do not decide positivity or contraction. Intersections compare interval endpoints as points, and every arithmetic operation preceding them is outward.

## Exact phase weights and the balance contradiction

For fixed parameters, define $f(\phi)=\rho(\phi)A_t(\phi)$. The relative geometry is $2\pi$-periodic in phase even if $\beta/\kappa$ is irrational. Uniqueness of each causal root makes its continuation periodic with that relative geometry. Partition the exact interval $[0,2\pi]$ into equal mathematical cells $J_i=[2\pi i/N,2\pi(i+1)/N]$. The interval-$\pi$ endpoints used by either instrument contain those exact endpoints; tiny outward overlaps enlarge pointwise domains but do not change the mathematical integration weights.

If the cell evaluation gives $f(J_i)\subseteq[L_i,U_i]$, then integrating on the exact cell gives

$$
\frac1N\sum_iL_i\le\frac1{2\pi}\int_0^{2\pi}f(\phi)\,d\phi
\le\frac1N\sum_iU_i.
$$

The subject sums $[L_i,U_i]/N$ and the independent instrument sums first and divides by $N$ once; both are outward versions of this exact inequality. The intervals enclose every coefficient vector in the box, so the averaged enclosure is simultaneous over that entire continuum. No trapezoidal approximation, sampled quadrature error assumption or stochastic coverage claim enters it.

For the prescribed finite-speed profiles, the tangential demand obeys $\rho L_t=\kappa[\rho^2(\beta+\kappa p')]'$. Exact canonical balance $RL=A$ would force $\langle\rho A_t\rangle=0$ after period integration. The strictly positive independent enclosure contradicts this identity at every $R>0$. The proof covers relative-periodic and genuinely periodic members; it requires no rational rotation ratio.

## Receipts, resources and preservation

The independent target completed in 3.558760 internal seconds with 29,392,896 bytes peak resident memory by macOS `getrusage`. Supervisor run `d98b225b-62e4-4b5a-ba11-044a361bfc5a` records 3.644 elapsed seconds, exit zero, zero stderr and a closed process group. It completed before the first five-second progress interval; no missed heartbeat or detached continuation is implied. Its full receipt records 384 completed cells and `failure: null`. Both reviewer-owned supervised runs are terminal with closed groups; this review did not close or signal another task's computation.

| Item | SHA-256 by native `shasum -a 256` |
| --- | --- |
| Frozen subject Markdown | `1424a0b5c99fa83398493895c03ad83addece57afdfa06da6c3f05a57f2c8bfb` |
| Frozen subject instrument | `7acbd19f11b324ddf700db796ddb62f6409de466c340b0baac5c5488553c8f23` |
| Subject target receipt | `6a1b918f05a12a2b2d937733c454adc2401a34def030e0b44897bcb5d265aa1a` |
| Independent instrument | `329a21d0f791c80a9dcd6d9604e182bf09f53959027a38a08593567773d84be4` |
| Independent known receipt | `930af72943131bad97fd4c5dd22a76b4425f2d2a8d3cad3232ab97de27292c64` |
| Independent pilot receipt | `14fa26233cd8ea519e3e7cc9794d3195875dd8201f4c28913abe557b9e3cc77e` |
| Independent target receipt | `a74b5b81af11f566eb6565ebabaebbbf2908733d72b5d735add614d069951c12` |

The three original independent receipts remain under `.local-data/master-equation-closure/overnight2-b/independent-finite-speed/`. Native `wc -lc` measured 50 lines and 1,967 bytes for the known receipt, 618 lines and 29,060 bytes for the inconclusive pilot, and 26,186 lines and 1,256,418 bytes for the successful target. Every cell, root and divisor enclosure is retained, including the pilot's nonpositive result. The durable proof and standalone reproducer are the two reviewer-owned analysis files. No existing evidence was overwritten, moved or deleted.

This is accepted local retained evidence under the [preservation owner](../../../../op/machine-artifact-retention.md#preservation-from-creation-through-closeout), not a remote-backup claim. Practical replay has not been performed; initial measured runtime does not prove recovery of historical bytes, and volatile timestamps/runtime would change. Preserve the originals. A reproduction uses a fresh output directory containing its own known receipt, because the instrument checks that receipt's instrument identity before any target:

```bash
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/analysis/overnight2-b-independent-finite-speed.py --stage known --output .local-data/master-equation-closure/overnight2-b/independent-finite-speed/replay/known.json
# Inspect and record the known pass before the bounded supervised target.
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --owner-thread "$CODEX_THREAD_ID" --deadline-seconds 120 --heartbeat-seconds 5 -- env OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/analysis/overnight2-b-independent-finite-speed.py --stage target --output .local-data/master-equation-closure/overnight2-b/independent-finite-speed/replay/target.json
```

An in-box exact mean outside the stored interval, a root discarded by contraction, an incorrect scalar dot product, a non-outward primitive operation, a missing source or an invalid phase weight would falsify the corresponding certificate. The proof and retained per-cell intervals identify where to check each issue. Larger boxes or other waveforms are outside the result. The parent owns integration of this independently supported continuous finite-speed exclusion; no mathematical blocker remains for this bounded review, and the broader research allocation continues.

Scoped validation: the shared-venv Python built-in `compile` accepted the independent source without creating a bytecode artifact, and native `git diff --no-index --check /dev/null` emitted no whitespace diagnostic for either reviewer-owned file. The subject identities and all three independent receipt hashes were checked with native `shasum -a 256`; known controls, the inconclusive pilot and the positive target retain their separate outcomes. No regular tests, generator writes, Git mutations or recursive reviewer were introduced. The two authored changes are exactly `overnight2-b-independent-finite-speed.md` and `overnight2-b-independent-finite-speed.py`.
