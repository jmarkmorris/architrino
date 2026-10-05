# Independent adjudication of the far coaxial-ring mean

Date: 2026-10-03. Scenario: unchanged Master Equation, all positive-delay self roots included, no cap, multiplier, exclusion or event rule. Every numerical instance has $K=c_f=1$. **Disposition: accepted within the fixed-$\beta$, equal-radius, prescribed coaxial co-rotation domain. Grade: derived asymptotic and remainder, independently checked by the separate mathematical construction below; measured Cartesian comparisons provide additional bounded instrument evidence.** No exact combined pair, released trajectory or stability statement follows.

The frozen [subject](coaxial-ring-far-mean-2026-10-03.md), SHA-256 `0ac432190c09c10ab63560710c6813e5c4b625ec74dfcc5d0948bedda61642bc`, and its wrapper and mutual primitive were not changed. This review uses a separately authored [Cartesian checker](../../../../../scripts/photon-research/coaxial_ring_far_mean_independent_20261003.py) that imports no subject functions, tensors or causal-root implementation. It reads frozen parameter intervals and comparison values as data. The mathematical construction uses a pushforward-density derivative expansion and sharper complex-domain bounds; it does not replay the subject's Fourier-coefficient instrument.

## Complete causal geometry and orientation

**Derived, independently checked.** Fix real $\beta>0$, $R>0$, $d=h/R>\beta$, and a lower receiver at $(1,0,0)$ in radius units. A source has position $(\cos\theta,\sin\theta,d)$, velocity $(-\beta\sin\theta,\beta\cos\theta,0)$, and receiver-relative separation $(1-\cos\theta,-\sin\theta,-d)$. Its normalized delay is

$$
x=\sqrt{d^2+2-2\cos\theta},\qquad \theta=\phi+j\pi/3-\beta x.
$$

Computing the transmitter from the Cartesian dot product gives

$$
D=1-\frac{\mathbf q\cdot\mathbf v}{x}=1+\frac{\beta\sin\theta}{x}\ge1-\beta/d>0.
$$

Every possible mutual delay lies in $[d,\sqrt{d^2+4}]$. The squared causal gap is nonpositive at the lower endpoint, nonnegative at the upper endpoint, and has derivative $2xD>0$ throughout that full interval. Thus exactly one ordinary cross root exists for each source, including a possible simple aligned endpoint root. Six roots per receiver and 72 directed cross hits for the pair are complete. The accepted same-component census remains present; its entire axial contribution vanishes because the isolated exact circles are planar. No self row is excluded. The complete root assertion is analytic over the entire stated far domain, rather than inferred from the six local numerical enclosures.

For the upper receiver, rotate axes through its phase. Its source angle is $-\phi+j\pi/3-\beta x$ and its axial separation is $+d$. This verifies the two different signs and phases without assuming an equal-and-opposite interaction law. Alternating relabeling makes every member's axial mutual acceleration identical within a component. Rigid co-rotation makes these axial components constant in absolute time, so the centroid contributions equal their time means. Their generally nonzero full member residuals prevent treating the prescribed pair as a balance.

## Separate density expansion

**Derived, independently checked.** Put $\varepsilon=d^{-1}$, $t(\theta)=1-\cos\theta$, $A=\sqrt{1+2\varepsilon^2t}$, and $s(\theta)=\beta(x-d)$. The arrival phase is $\chi=\theta+s(\theta)$ and the undivided source density is $g(\theta)=A^{-3}$. Under this orientation-preserving map, its pushforward density is $f(\chi)=g(\theta)/D$. This follows directly from the complete Cartesian kernel and $d\chi=D\,d\theta$.

For a smooth periodic test function $\psi$, expand $\psi(\theta+s)$ in the identity

$$
\int\psi(\chi)f(\chi)\,d\chi=\int\psi(\theta+s(\theta))g(\theta)\,d\theta.
$$

Integration by parts gives the Taylor-coefficient construction

$$
f=\sum_{n\ge0}\frac{(-\partial_\chi)^n}{n!}\,[g\,s^n].
$$

This equality is used coefficient by coefficient through degree three; the analytic branch established below supplies the actual Taylor expansion and remainder. It does not assert convergence of the displayed infinite derivative expansion for arbitrary test functions.

Since

$$
g=1-3\varepsilon^2t+O(\varepsilon^4),\qquad s=\beta\varepsilon t-\tfrac12\beta\varepsilon^3t^2+O(\varepsilon^5),
$$

this independent coefficient construction yields

$$
f_0=1,\qquad f_1=-\beta t',\qquad f_2=-3t+\tfrac12\beta^2(t^2)'',
$$

$$
f_3=\tfrac72\beta(t^2)'-\tfrac16\beta^3(t^3)'''.
$$

The first three densities have harmonic degrees at most zero, one and two. The first term of $f_3$ has degree at most two. The exact identity $\cos^3\chi=(\cos3\chi+3\cos\chi)/4$ gives third harmonic $-\cos3\chi/4$ in $t^3$; therefore the third harmonic of $f_3$ is $9\beta^3\sin3\chi/8$. No harmonic above three occurs at this order.

The signed six-source sum kills every harmonic except $k\equiv3\pmod6$ and multiplies the surviving terms by six. Accordingly

$$
W(\chi,\varepsilon)=\frac{27\beta^3}{4}\varepsilon^3\sin3\chi+O_\beta(\varepsilon^4).
$$

The exact lower acceleration is $-K\varepsilon^2W(\phi-\beta d,\varepsilon)/R^2$, while the upper is $+K\varepsilon^2W(-\phi-\beta d,\varepsilon)/R^2$. This proves both subject formulas, including the $d^{-5}$ coefficient, propagation phase, dimensional factor and signs. This construction is independent of a static spatial-moment argument and retains the arrival transmitter exactly.

## Separate analytic bounds and remainder

**Derived, independently checked.** Take $\varepsilon_0=[32(1+\beta)]^{-1}$ and the complex quarter-disk $|\theta-\chi|\le1/4$ for real $\chi$. Here the sharper elementary bounds $|\sin\theta|,|\cos\theta|\le\cosh(1/4)<1.032$ give $|t|<2.032$ and

$$
|2\varepsilon^2t|<\frac{4.064}{1024}<0.004.
$$

The principal square root has $|A|>0.998$ and $\operatorname{Re}A>0.998$, hence $|A+1|>1.998$. The stable increment is $x-d=2\varepsilon t/(A+1)$. The implicit phase map has image distance below $4.064/(32\cdot1.998)<0.064$ and derivative norm below $1.032/(32\cdot0.998)<0.0324$. It is a strict self-map and contraction, uniformly for real $\chi$ and $|\varepsilon|\le\varepsilon_0$. Consequently its unique branch is holomorphic in $\varepsilon$ and $|D|>0.9676$.

More precisely, the independent bound

$$
|f|\le\frac{(1-4.064/1024)^{-3/2}}{1-1.032/(32\cdot0.998)}<1.04
$$

implies $|W|<7$, with a margin stronger than required by the subject. The new known-case receipt checks these outward inequalities before any target. The elementary complex sine/cosine bound and the principal-root inequalities above justify their application to the whole disk; checking numerical constants alone would not prove that domain.

Cauchy estimates on disks tending to $\varepsilon_0$ give $|W_n|\le7\varepsilon_0^{-n}$. After the exact degree-three term, the geometric tail is bounded by $14\varepsilon^4\varepsilon_0^{-4}$ whenever $|\varepsilon|\le\varepsilon_0/2$. Thus the subject's absolute acceleration error bound

$$
\frac{14K}{R^2d^6\varepsilon_0^4},\qquad d\ge64(1+\beta),
$$

is accepted. This is a fixed-$\beta$ asymptotic uniform in real phase. Analyticity applies to the auxiliary function at fixed $\chi$; the rapidly varying physical phase $\chi=\phi-\beta/\varepsilon$ is substituted only into the uniform real-phase estimate. No analyticity at zero is claimed for that physical composite, and no simultaneous high-rung limit is inferred.

## Consequences and falsifiers

**Derived, independently checked.** At $\phi=0$, upper minus lower is $-27K\beta^3\sin(3\beta d)/(2R^2d^5)$ with error at most $28K/(R^2d^6\varepsilon_0^4)$. The sequences $3\beta d=\pi/2+2\pi n$ and $3\beta d=3\pi/2+2\pi n$ therefore have opposite strict signs once $d>56/(27\beta^3\varepsilon_0^4)$ and the far-domain condition also holds. Both subsequences are unbounded. The claimed absence of a finite interaction cutoff and eventual single attraction sign is accepted for these prescribed pairs. No sign is assigned near a leading node, and released capture or dispersal remains unexamined.

At $\phi=\pi/6$, $W(\chi-\pi/3)=-W(\chi)$ makes the lower and upper axial accelerations exactly equal, hence their gap contribution is zero. Their common value need not vanish. Polarity conjugation reverses the mutual acceleration because it reverses every cross-polarity product. The separately adjudicated contra-rotation full-phase zero mean remains an inherited result, rather than a new claim from this review.

**Falsifiers:** a violation of the complete Cartesian delay chart, an additional far root, a transmitter zero for $d>\beta$, an incorrect pushforward-density coefficient, failure of the complex contraction or Cauchy bound, or an interval comparison contradiction overturns the corresponding acceptance. A released-pair outcome is outside this prescribed-history domain. Finite examples do not prove a global pair balance, instability, binding law or retained three-dimensional structure.

## Controls, measured receipts and reproduction

**Measured by the new independent checker.** Before target execution, the known stage returned the stationary-source axial acceleration $-1/(8\sqrt2)$ for separation $(2,0,-2)$, the signed-transmitter control $D=-1$ with acceleration $(1/4,0,0)$, the zero-speed phase root, the exact third Fourier coefficient $-1/8$, and the sharper analytic caps above. The initial receipt-data reader was corrected before the final controlled run to use the frozen references' binary interval dictionary rather than their display list. The final instrument was rerun on its known controls before the target; the failed reader attempt produced no target result and supports no scientific claim.

The target admits each T02/T04 exact reference and complete same-component census through the frozen independent all-rung admission receipt `5bfed3044a262902b65f4bbba2ede2d18c3c1a9950342bdbed2593de8b718adf`. It checks that the supplied parameter boxes contain the actual binary accepted reference boxes. For each far source it independently encloses the small phase increment with endpoint opposition and positive derivative; a $10^{-22}$ phase half-width is an actual root-enclosure choice, while all inherited parameter uncertainty is retained at 120-digit outward interval precision. The global monotonicity argument above, rather than the root solver's success, establishes completeness.

All twelve examples at T02/T04, $d=300,1000,10000$ and $\phi=0,\pi/6$ passed. All three Cartesian mutual acceleration components overlap the frozen subject binary result intervals; every example has six cross roots per receiver; each axial leading-term difference lies below the independently justified conservative bound. At $d=10000$, the lower error divided by the positive leading coefficient scale lies in the following outward rounded summaries:

| Reference | Phase | Independent error divided by coefficient scale |
|---|---|---|
| T02 | $0$ | $[-0.000702776,-0.000702775]$ |
| T02 | $\pi/6$ | $[-0.000307078,-0.000307077]$ |
| T04 | $0$ | $[-0.000133674,-0.000133673]$ |
| T04 | $\pi/6$ | $[0.001018038,0.001018039]$ |

These measured summaries agree with the subject's wider displayed enclosures; they are coefficient-envelope errors rather than sine-relative errors. The target completed in 0.358 wall seconds by the checker's monotonic clock and returned exit zero under watched `exec_command`; no detached child or outstanding compute job remains. The useful result is the independently established coefficient and bound, rather than the comparatively loose numerical remainder test.

Frozen checker SHA-256 is `5e6ca7addab7754408686caf0324b568eea0dd66d4e101bb0dceff665eb63468`; known receipt is `064a0f371582207f265f726f2110d96b7f90b7dd8f6d51da8cb4304ab3fce5ac`; target receipt is `b5ae8f4c5498ffe381adcf7170f3cb2266ea85790e517219705617f200cbd8c6`. Runtime evidence is under `.local-data/ring-exploration/coaxial-far-mean-independent/`.

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/photon-research/coaxial_ring_far_mean_independent_20261003.py --stage known
"${AAA_VENV:-../.venv}/bin/python" scripts/photon-research/coaxial_ring_far_mean_independent_20261003.py --stage target
```

The subject requires no repair. The coordinator owns integration into the Photon and Braid records and the two cross-geometry indexes. This review changes no shared owner, rank, score, selection, equation or publication state.
