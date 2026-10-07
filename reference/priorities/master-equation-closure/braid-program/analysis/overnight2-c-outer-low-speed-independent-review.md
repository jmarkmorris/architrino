# Independent review of the outer-equal low-speed restrictions

## Verdict and fixed domain

**Derived verdict: supported; no mathematical defect found.** The smaller-pair comparison, both all-phase strip exclusions and the sharper compact containing-domain consequence reconstruct correctly. In original units, the ordered positive outer tangential difference is at least $11/(1896b)$ for $b\ge2$, $0\le v=\omega b\le1/40$, and at least $2819/(118404b)$ for $b\ge3$, $0\le v\le1/8$. Each bound excludes exact circular balance on its stated strip.

The frozen subject is [the outer-equal low-speed note](overnight2-c-outer-equal-low-speed.md). Its SHA-256 measured with `shasum -a 256` is `bb3ed7f05946dadfdeb0929f19c97928ba75bf568bc10ede6c01dea04db8761a`, matching the supplied identity. The fixed class has $r_1=1$, $r_2=r_3=b>1$, distinct simultaneous positions, common nonnegative angular rate, outer speed $v\le1$, persistent unit polarities, unchanged transmitter weighting and complete coefficient-one logarithmic histories with $K_{\log}=c_f=1$. The clock tool returned 2026-10-07 11:45:02 UTC at review start; the live report confirms the original 03:25:15 UTC launch, 13:55:15 UTC exploration stop and 15:25:15 UTC hard deadline. This review uses the live Ramon E. Moore lens and runs no numerical instrument or target.

## Scale and common comparison phase

Write original position and time as $X=b\widetilde X$ and $t=b\widetilde t$. The scaled equal radii become one, the remaining radius is $a=1/b$, and the scaled angular rate is $v=\omega b$. Velocities and transmitter factors are unchanged; original acceleration is scaled acceleration divided by $b$. Thus the strip variable $v$ is the actual outer speed, not the original angular rate.

For a scaled unit receiver at $x=(1,0)$ and a source on radius $a<1$, its causal chord $p=x-y(-\tau)$ has length $\tau$. Triangle inequalities give $1-a\le\tau\le1+a$, so $|\tau-1|\le a$. The actual source emission phase is $\theta-v\tau$. Choose a static comparison source at phase $\theta-v$, with chord $p_*$ and length $d_*\ge1-a$. The arc-length estimate gives

$$
|p-p_*|\le av|\tau-1|\le a^2v.
$$

This shift uses the center one of the causal-distance interval; it does not set the actual delay to one. The negative antipode retains its own actual delay but has comparison phase $\theta+\pi-v$, so the comparison sources form a single antipodal neutral pair. At the two unit receivers their comparison phases differ by exactly the clockwise receiver separation $\beta$. A single common phase determines both values.

## Actual factor and independent error reconstruction

The actual smaller-source speed is $av$, hence its transmitter factor satisfies $D=1-n\cdot v_s\ge1-av>0$ and $|1-D|\le av$. This is a bound on the true source velocity. It remains valid at outer speed $v=1$ because $a<1$.

For arbitrary nonzero vectors, direct squared-norm expansion gives the exact Euclidean inversion identity

$$
\left|\frac p{|p|^2}-\frac{p_*}{|p_*|^2}\right|
=\frac{|p-p_*|}{|p|\,|p_*|}.
$$

Here the inversion difference is at most $a^2v/(1-a)^2$. For signed row $A=\sigma p/(\tau^2D)$ and static comparison $A_*=\sigma p_*/d_*^2$, split their difference into the inversion difference divided by $D$ and the static vector multiplied by $1/D-1$. This gives

$$
|A-A_*|\le\frac{a^2v}{(1-a)^2(1-av)}+\frac{av}{(1-a)(1-av)}
=\frac{av}{(1-a)^2(1-av)}.
$$

The numerator simplifies because $a^2+a(1-a)=a$. Two source polarities give the pair error $E_a(v)=2av/[(1-a)^2(1-av)]$. Two receiver responses contribute at most $2E_a$ to their difference. Projection on either local tangent cannot enlarge the vector error. The comparison therefore includes all four actual source rows, their separate delays and the unchanged source factor.

## Static whole-pair cap and equal-radius contribution

The positive static source tangential row is $-a\sin s/(1+a^2-2a\cos s)$. Its negative antipode contributes $-a\sin s/(1+a^2+2a\cos s)$. Adding yields

$$
G_{a,t}^{(0)}(s)=-\frac{2a(1+a^2)\sin s}{(1-a^2)^2+4a^2\sin^2s}.
$$

For nonzero sine, the square $(1-a^2-2a|\sin s|)^2\ge0$ bounds the denominator below by $4a(1-a^2)|\sin s|$ and gives $|G_{a,t}^{(0)}|\le(1+a^2)/[2(1-a^2)]$. For zero sine the response is zero. The static two-receiver difference is therefore bounded by $(1+a^2)/(1-a^2)$, and the full possible opposing contribution is at most

$$
C_{\rm pair}(a,v)=\frac{1+a^2}{1-a^2}+\frac{4av}{(1-a)^2(1-av)}.
$$

The two unit-radius pairs supply the complete difference $L=[Q_v(\beta)+Q_v(\pi-\beta)]/2$ after their identical own-antipode terms cancel. The [independently checked convexity](overnight2-c-tangential-convexity-independent-review.md) gives $L\ge Q_v(\pi/2)$. For $v\le1/8$, the complete root at $\pi/2$ lies below $\pi$, with positive cotangent divided by a factor at most one; the root at $3\pi/2$ has negative cotangent of magnitude at least one and factor at most $1+v$. Hence

$$
L\ge\cot(\pi/4+v)+\frac1{1+v}.
$$

The bound $\tan v\le v/(1-v^2/2)\le2v$ and the exact inequality $(1-t)/(1+t)\ge1-2t$ give the coarser $L\ge2-5v$. All cotangent signs and denominators remain as stated throughout this speed interval.

## First strip: exact constant and scaling

For $b\ge2$, $a\le1/2$. The static cap increases with $a$, since its derivative is $4a/(1-a^2)^2>0$, and is at most $5/3$. The positive factors $a$, $(1-a)^{-2}$ and $(1-av)^{-1}$ increase with $a$ for fixed $v\ge0$. Thus the four-row error is at most $8v/(1-v/2)$. On $0\le v\le1/40$, both subtracted speed functions increase, so

$$
\widetilde A_{2,t}-\widetilde A_{3,t}
\ge\frac13-5v-\frac{8v}{1-v/2}
\ge\frac13-\frac18-\frac{16}{79}
=\frac{632-237-384}{1896}=\frac{11}{1896}>0.
$$

Dividing by $b$ proves the first original-unit difference. At least one absolute tangential component is at least $11/(3792b)$, by the triangle inequality.

## Second strip: exact constant and scaling

For $b\ge3$, $a\le1/3$, the static cap is at most $5/4$ and the four-row error at most $3v/(1-v/3)$. The sharper lower bound on $L$ decreases with $v$ and the error increases. At $v=1/8$, $\sin v\le v$ and $\cos v\ge1-v^2/2$ give $\tan v\le16/127$. Consequently

$$
L\ge\frac{1-16/127}{1+16/127}+\frac89
=\frac{111}{143}+\frac89=\frac{2143}{1287},
$$

while the error is at most $9/23$. Thus throughout the second strip,

$$
\widetilde A_{2,t}-\widetilde A_{3,t}
\ge\frac{2143}{1287}-\frac54-\frac9{23}
=\frac{197156-194337}{118404}=\frac{2819}{118404}>0.
$$

Scaling back gives the second difference and a maximum absolute component at least $2819/(236808b)$. In both strips the required circular acceleration is radial, so these are nonzero tangential balance residuals. The statements include all boundary speeds and all noncollision phases, and do not rely on a numerical sample or an arbitrary phase cutoff.

## Compact consequence and complete roots

The [completed radius-five exclusion](overnight2-c-paired-value-full-independent-review.md) supplies $b<5$ for an exact outer-equal configuration. The first new strip then forces $v>1/40$ whenever $b\ge2$, equivalently $\omega>1/(40b)$. If $b\ge3$, the second strip also forces $v>1/8$. Since $b<5$, every exact configuration in this branch satisfies the uniform angular-rate bound $\omega>1/(40b)>1/200$ in the normalization $r_1=1$.

Closing the radius and lower-speed endpoints gives the claimed compact containing set with $2\le b\le5$, $1/(40b)\le\omega\le1/b$, $1/32\le\beta\le\pi-1/32$ and $\chi\in\mathbb T$. This is a subset of the [previously reviewed outer-equal containing domain](overnight2-c-outer-regular-domain-independent-review.md), so its separation floor $1/32$, full delay interval $[1/64,10]$ and factor floor $1/128$ persist. Closing endpoints does not claim an exact state at $b=5$ or $v=1/40$.

The pair-error formula itself applies for every $0<a<1$, $0\le v\le1$. All distinct circles in this closed-subfield class have exactly thirty ordinary positive partner roots and no positive self roots. Each selected outer receiver retains its three equal-radius and two smaller-radius source rows. The comparison only bounds those actual rows; it introduces no truncated history or extra static target root. The other receiver equations remain part of full balance but are not needed for the necessary-condition contradictions.

## Controls, limits and falsifiers

At $v=0$, the shift and both error terms vanish, leaving the exact static pair. Its tangential values at $s=0$ and $s=\pi/2$ are respectively zero and $-2a/(1+a^2)$, confirming the signed sum. The exact inversion norm expansion, numerator cancellation $a^2+a(1-a)=a$, and both rational subtractions above are independent hand checks. No numerical instrument or target was run.

The exclusion strips concern the actual outer speed after scaling. They do not establish exactness or decide the remaining higher-speed regions, $1<b<2$, general unequal radii, stability or actual-time dynamics. A wrong scale conversion, comparison shift other than $\theta-v$, invalid actual-source factor bound, omitted polarity or row, missed positive root, or incorrect rational subtraction would invalidate the corresponding step. An exact configuration in either declared strip would falsify its exclusion. The subject, prior reviews, numerical certificates, main report and shared owners were preserved. Only this new review was written. Parent integration remains separate; this completes the assigned review.
