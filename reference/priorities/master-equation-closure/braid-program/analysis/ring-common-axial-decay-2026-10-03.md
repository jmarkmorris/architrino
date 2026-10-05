# Common axial braking at T02, T04 and T06

## Candidate result and exact scope

The common axial first variation of the six-member T02, T04 and T06 rings is stable modulo a fixed axial translation. Its only characteristic root in the stated closed strips is the simple translation zero: every other root lies strictly left of $-0.4$, $-1$ and $-0.5$ respectively, in $K=c_f=1$ units. For a present-time common axial velocity preparation $U$ with a flat past, the linear velocity and acceleration decay exponentially, and the plane displacement tends to $U/[-B]$, where $B=\sum_j w_j\Delta_j<0$.

**Grade: computer-assisted derived complete scalar spectral exclusion and derived linear preparation response, pending independent adjudication.** This is a result about the common axial sector only. Other axial sectors and the common planar sector already have growing roots, so none of these rings is stable as a whole. A finite nonlinear axial preparation changes planar motion at higher order; the linear braking calculation does not certify that finite history for all future time. No baseline equation change, event rule or omitted self hit is introduced.

The [accepted axial first variation](ring-axial-independent-adjudication-2026-10-03.md) and [axial owner](ring-axial-sectors-2026-10-03.md) supply the exact circular references, complete ordinary ledgers and first-step preparation. The present result goes beyond their sampled decaying roots by excluding every nonneutral root in a closed right strip.

**Falsifier:** a missing admitted hit, a failed complete reference, an invalid interval boundary rectangle, a nonzero winding count, failure of the outer dominance inequality, or a nonneutral root in a stated strip overturns its exclusion. The response conclusion additionally fails if the actual preparation differs from its specified flat past or if the inverse-transform argument below is invalid. Look at the binary root, weight, boundary and winding receipts before comparing rounded exponents.

## 1. Remove the exact translation zero

For a common axial displacement $z(T)$, the baseline first variation is the scalar retarded equation

$$
z''(T)=\sum_jw_j[z(T)-z(T-\Delta_j)],\qquad
w_j=\frac{(-1)^{m_j}}{\Delta_j^3|D_j|}.
$$

Its entire characteristic function is

$$
H(s)=s^2-\sum_jw_j(1-e^{-s\Delta_j}).
$$

Constant displacement is an exact Euclidean symmetry, giving $H(0)=0$. Its derivative is $H'(0)=-\sum_jw_j\Delta_j=-B>0$ on these references, so the root is simple. Remove it with the entire function

$$
G(s)=H(s)/s=s-\sum_jw_j\Delta_j\int_0^1e^{-s\Delta_jt}\,dt,
\qquad G(0)=-B.
$$

The quotient expression used away from zero and this integral have the same entire continuation. No pole at zero is counted. The input ledgers include all eight, twelve and sixteen hits per receiver at T02, T04 and T06 respectively, including the positive-delay self hit.

## 2. A complete finite contour for a right strip

For $\Re s\geq-\gamma$, define the outward cap

$$
C_\gamma=\sum_j|w_j|(1+e^{\gamma\Delta_j}).
$$

Then $|H(s)-s^2|\leq C_\gamma$. Choose an integer radius $L$ with $(L-\gamma)^2>C_\gamma$. Outside $|s|^2>C_\gamma$ the characteristic function cannot vanish. Thus a shifted right half-disk centered at $-\gamma$, radius $L$, contains every possible root of the strip; no finite delay or frequency search cutoff is assumed.

On its right semicircle, $|s|\geq L-\gamma$ and

$$
\left|\frac{G(s)}s-1\right|\leq C_\gamma/|s|^2<1.
$$

The semicircle image is homotopic to the image of $s$ without encountering zero, with the endpoint correction continuously fixed inside the open unit disk about one. It suffices to cover the vertical half-boundary $s=-\gamma+i\omega$, $0\leq\omega\leq L$; real coefficients give the lower half by conjugation. The real start value $G(-\gamma)$ is certified positive, and the top image has positive imaginary component by the same outer dominance inequality.

Each boundary panel is enclosed in one complex interval rectangle excluding the origin. Its exact endpoint values are enclosed by the same rectangle. The checker chooses binary midpoint vertices inside those endpoint intervals and independently checks their inclusion in the panel rectangle. Convexity gives a zero-free homotopy from the true curve to the resulting polygon, even if the curve bends or crosses a ray several times within a panel. The start midpoint is positive real and the final midpoint is in the upper half-plane.

Count negative-real-ray crossings of that polygon using outward intersection arithmetic. A downward crossing adds one to the lifted upper argument; an upward crossing subtracts one. If this integer is $k$, the full clockwise contour has winding $2k$, and the number of zeros in the right half-disk is $-2k$. This sign follows by pairing the upper curve with its reversed conjugate and joining them by the semicircle homotopy. A pole-free $G$ makes the argument principle a zero count. Boundary exclusion plus outer dominance also excludes zeros on and beyond the counted contour.

The target evaluates each stated rational strip depth plus $10^{-20}$, so its zero-free domain is strictly stronger than the displayed depth despite point-rounding uncertainty. The new target has no negative-real-ray crossings and hence zero nonneutral roots in each of the three closed strips. Its receipts retain every rectangle and polygon vertex, rather than a sampled phase plot.

| Reference | $\gamma$ | Outer radius $L$ | Zero-free upper boundary panels | Zeros of $G$ in $\Re s\geq-\gamma$ |
| --- | ---: | ---: | ---: | ---: |
| T02 | 0.4 | 7 | 28 | 0 |
| T04 | 1 | 20 | 30 | 0 |
| T06 | 0.5 | 38 | 27 | 0 |

These are certified strip bounds, not identifications of the slowest mode. Previously checked decaying witnesses remain consistent: T02 has a pair near $-0.448649\pm2.600620i$, and T04 has several pairs left of $-1$. The planar and other axial growing modes are outside this common scalar pencil.

## 3. The flat-past velocity nudge

Prepare $z(T)=0$ for $T\leq0$ and impose the external velocity increment $U$ at zero; thereafter use only the baseline linear equation. This is the explicitly prepared first variation, not a complete autonomous solution across the impulse. Its Laplace transform for sufficiently large real part is

$$
\widehat z(s)=U/H(s),\qquad \widehat {z'}(s)=U/G(s).
$$

The displacement has a single simple pole at zero with residue

$$
C=U/H'(0)=U/(-B).
$$

To justify exponential decay without a non-absolutely integrable residue subtraction, take $a>\gamma$ and use

$$
F(s)=\frac U{H(s)}-\frac Cs+\frac C{s+a},\qquad
V(s)=\frac U{G(s)}-\frac U{s+a}.
$$

Both functions are analytic throughout $\Re s\geq-\gamma$ after removing the apparent zero singularity in $F$. The artificial pole $-a$ is left of this strip. On every vertical line in the strip at sufficiently large $|\Im s|$, the delayed terms are uniformly bounded by $C_\gamma$, so $H=s^2+O(1)$ and $G=s+O(s^{-1})$. Therefore $F,V=O(|s|^{-2})$. Compact boundary portions are bounded by the zero-free certificate. Moving the inverse-transform contour to $\Re s=-\gamma$ gives absolutely convergent integrals, and horizontal closing segments vanish. Consequently

$$
z(T)-C=O(e^{-\gamma T}),\qquad z'(T)=O(e^{-\gamma T}).
$$

For acceleration, its transformed function is $Us/G(s)-U=O(|s|^{-2})$, analytic in the same strip, so $z''(T)=O(e^{-\gamma T})$ as well. Constants depend on the input and the admitted reference and are not numerically enclosed here. The certified rates are lower damping bounds, not exact single-exponential laws. Smooth finite-duration common axial inputs have the same post-input pole and decay interpretation by convolution.

With $K=c_f=1$, the coefficients $-B$ are approximately $6.04394488383$, $28.6606567327$ and $76.2653563368$. Thus the eventual linear displacement per unit prepared $U$ is approximately $0.165455$, $0.0348910$ and $0.0131121$. Those last displays are measured arithmetic and are not a retained nonlinear translation. The first step still starts at zero acceleration and obeys the previously derived $z''=Wz$ until the shortest delay; no memoryless braking rate has been substituted.

**Grade: derived linear preparation response conditional on the complete strip certificates.** It establishes braking of this common first variation. Nonlinear all-future retention and a general axial perturbation remain different questions.

## 4. Controls, failed attempts and receipts

The [new instrument](../../../../../scripts/braid-program/ring_common_axial_count_20261003.py) uses outward complex intervals and imports no axial subject spectrum, tensor or root-count implementation. It consumes accepted exact binary ring intervals through the previously independent Cartesian packet reader. Before ring targets, its complete rectangle/polygon routine returns zero roots for $G=s+1$ and two for $G=[(s-1/2)^2+1]/(s+3)$ in the declared shifted half-plane. The latter has two analytically specified roots $1/2\pm i$ and its pole $-3$ is outside; a separate algebraic inequality controls its outer arc. This detects winding orientation as well as zero-free subdivision.

An initial control serialization failed because real interval objects also expose a complex-storage interface; no ring target had run. The next target failed at an interval/point multiplication before any contour verdict. Both were closed instrument failures. The repaired source reran the analytical controls before its successful target. No subject or oracle was altered to make a target agree.

Independent review corrected the rational known-control outer cap from $3.5|s|+1.25$ to $4|s|+1.25$, since $G-s=(-4s+1.25)/(s+3)$; the corrected bound still holds. Controls were rerun before the strengthened final target. Owned run `0b93a963-dde4-4878-9e32-72d248cdb04b` completed in 0.882 wall seconds, exit zero, with a closed process group. New receipt paths are `.local-data/ring-exploration/common-axial-count/known.json` and `target.json`. Instrument SHA-256 is `0e4fb74fba6ff5a7f74140070ee6b1e7cf9dc5652f822961516c37f80116acf3`; known receipt is `8cab069c7e7b15a5e1bb9be40b1b9cfab00035599ec532f8335435e33c54f5b9`; target is `8a1575a94e53bde4954b3dc3e33e00a6fe56492662f1e7f3665b7afbe1c8fb48`. The target binds each exact reference, its admitted delays and the entire boundary cover. It does not count another sector or prove nonlinear stability.

The subject and this new checker must remain frozen while a separately constructed adjudication checks the weights, complete contour, winding argument and inverse-transform interpretation. Shared owners and indexes are the coordinator's responsibility after that review.
