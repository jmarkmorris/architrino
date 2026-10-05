# Far mean interaction of two prescribed co-rotating hexagons

Date: 2026-10-03. Scenario: unchanged Master Equation, every positive-delay self root, no cap, multiplier, exclusion or event rule. All numerical instantiations have $K=c_f=1$. **Grade: derived fixed-parameter asymptotic with an explicit conservative remainder, frozen for separate independent adjudication.** The component circles are the accepted six-member exact references; the combined histories are prescribed and generally imbalanced. No pair stability or evolution is calculated.

## Result and interpretation

Take two coaxial equal-radius alternating hexagons, each circulating with angular rate $\Omega>0$, separated by $h>0$, with fixed relative phase $\phi$ and aligned polarity labels. Put $\beta=\Omega R/c_f$ and $d=h/R$. At fixed positive $\beta$, as $d\to\infty$, their mean centroid axial acceleration contributions are

$$
\overline A_{z,A}=-\frac{27K\beta^3}{4R^2d^5}\sin[3(\phi-\beta d)]
+O_\beta\!\left(\frac K{R^2d^6}\right),
$$

$$
\overline A_{z,B}=-\frac{27K\beta^3}{4R^2d^5}\sin[3(\phi+\beta d)]
+O_\beta\!\left(\frac K{R^2d^6}\right).
$$

The bars are exact time means of the prescribed histories. Their axial contributions are in fact constant in time because the whole two-ring geometry rotates rigidly. The same-component acceleration is horizontal by each ring's exact isolated balance. Every member in a component has the displayed common axial contribution by alternating sixfold relabeling. Conjugating one ring's polarity reverses every displayed mutual contribution.

In dimensional variables, the lower leading term is

$$
-\frac{27K\Omega^3R^6}{4c_f^3h^5}\sin[3(\phi-\Omega h/c_f)].
$$

This is a specific coaxial co-rotating asymptotic, at fixed radius and angular rate. It is not a universal distant-pair law. In particular, the common phase, equal rates and coaxial geometry matter. A moving or off-axis pair has another delayed geometry and is not inferred from a fixed probe's mean.

At phase zero, the demanded gap acceleration is

$$
\overline A_{z,B}-\overline A_{z,A}
=-\frac{27K\beta^3}{2R^2d^5}\sin(3\beta d)
+O_\beta\!\left(\frac K{R^2d^6}\right).
$$

Its sign alternates along arbitrarily large declared separations. The leading oscillation has spacing $2\pi c_f/(3\Omega)$ in physical $h$. Away from its nodes the full asymptotic gives both positive and negative prescribed mean gap accelerations arbitrarily far away, so there is no finite distance beyond which the interaction is identically absent, or an eventual single attraction sign. This says nothing about the fate of a released pair. At $\phi=\pi/6$ the gap acceleration is exactly zero by the inherited full-kernel phase symmetry, while the common axial acceleration can remain nonzero. A vanishing centroid gap contribution is insufficient for full member balance.

For contra-rotation on a complete nonsingular full-phase chart, the [separately adjudicated phase anti-periodicity](coaxial-ring-independent-adjudication-2026-10-03.md) instead gives exactly zero mean axial centroid and gap contributions. That result is not transferred to co-rotation. Both classes can have nonzero instantaneous member residuals and no balanced pair.

**Falsifier:** an omitted causal branch, a transmitter zero in the stated far domain, a failure of the arrival-variable substitution, a wrong third-harmonic coefficient, or a violation of the explicit remainder below overturns the relevant formula. A derived released trajectory with capture would not refute a statement about these externally prescribed complete histories; it would answer a different evolution question.

## Complete far root chart

Use the [full coaxial paths and residual owner](coaxial-ring-mutual-residual-2026-10-03.md). For a lower receiver and source label $j$, let $x=c_f\Delta/R$ and $\theta=\phi+j\pi/3-\beta x$. Then

$$
x^2=d^2+2-2\cos\theta,\qquad
d\le x\le\sqrt{d^2+4},\qquad
D=1+\frac{\beta\sin\theta}{x}.
$$

If $d>\beta$, $D\ge1-\beta/d>0$ throughout the complete possible delay range. The squared gap has derivative $2xD>0$ and opposite boundary signs, except an aligned endpoint root that is still simple. There is exactly one cross root per source. These six cross roots per receiver, 72 directed cross hits for the pair, supplement every inherited same-component hit. No mutual or positive-delay self contribution is dropped. All formulas below concern this complete far chart.

Set $\varepsilon=1/d$, $t(\theta)=1-\cos\theta$,

$$
A(\theta,\varepsilon)=\sqrt{1+2\varepsilon^2t(\theta)},\qquad
\delta x=x-d=\frac{2\varepsilon t}{A+1},\qquad
\chi=\phi-\beta d.
$$

The exact causal equation is the analytic implicit equation

$$
\theta=\chi+j\pi/3-\beta\delta x(\theta,\varepsilon).
$$

The normalized single-source axial weight is

$$
f(\chi,\varepsilon)=\frac{A(\theta,\varepsilon)^{-3}}
{1+\beta\varepsilon\sin\theta/A(\theta,\varepsilon)},\qquad
W(\chi,\varepsilon)=\sum_{j=0}^5(-1)^j f(\chi+j\pi/3,\varepsilon).
$$

Consequently the exact lower axial acceleration is $-K\varepsilon^2W/R^2$. The denominator is the arrival Jacobian, and is positive on this far real chart. The upper acceleration uses $+K\varepsilon^2W(-\phi-\beta d,\varepsilon)/R^2$. This accounts for both orientation and relative phase rather than assuming an equal-and-opposite mutual acceleration.

## Independent harmonic coefficient construction

For fixed small real $\varepsilon$, write $\chi=\theta+\beta\delta x$. Its derivative is exactly $D$. Changing variable from arrival phase to emission angle in the Fourier coefficient cancels the transmitter factor:

$$
\widehat f_k(\varepsilon)
=\frac1{2\pi}\int_0^{2\pi}A^{-3}
e^{-ik[\theta+\beta\delta x(\theta,\varepsilon)]}\,d\theta.
$$

The expansions required through degree three are

$$
A^{-3}=1-3\varepsilon^2t+O(\varepsilon^4),\qquad
\delta x=\varepsilon t-\tfrac12\varepsilon^3t^2+O(\varepsilon^5).
$$

Every coefficient through degree two is a trigonometric polynomial of harmonic degree at most two. At degree three all terms except the cubic phase term have degree at most two: they are multiples of $t^2$. The cubic phase contribution is $ik^3\beta^3\varepsilon^3t^3/6$. The exact third Fourier coefficient of $t^3=(1-\cos\theta)^3$ is $-1/8$. Therefore

$$
\widehat f_3=-i\frac{9\beta^3}{16}\varepsilon^3+O_\beta(\varepsilon^4),
\qquad \widehat f_{-3}=\overline{\widehat f_3}.
$$

At degree three there is no harmonic of degree greater than three. Alternating six-source summation retains only $k\equiv3\pmod6$, and multiplies such coefficients by six. Hence every lower-order term cancels and

$$
W(\chi,\varepsilon)=\frac{27\beta^3}{4}\varepsilon^3\sin(3\chi)
+O_\beta(\varepsilon^4).
$$

Substitution gives both displayed mean accelerations. This derivation uses the complete arrival Jacobian and the delayed phase; a static spatial moment alone would not establish this coefficient.

## Explicit analytic domain and remainder

Choose $\varepsilon_0=[32(1+\beta)]^{-1}$, with fixed real positive $\beta$. For every real arrival phase, allow complex $|\varepsilon|\le\varepsilon_0$ and $|\theta-\chi|\le1/4$. Then $|\sin\theta|,|\cos\theta|\le e^{1/4}<1.285$ and $|t|<2.285$. Consequently

$$
|2\varepsilon^2t|<4.57/1024,
\quad |A|>0.997,\quad |A+1|>1.997.
$$

The principal analytic square root is well-defined throughout this disk. The map $\theta\mapsto\chi-\beta\delta x$ has image distance from $\chi$ less than $2(2.285)/(32\cdot1.997)<0.072$, and derivative norm at most $1.285/(32\cdot0.997)<0.041$. It is a strict self-map and contraction on the quarter-disk. Iteration gives the unique branch, holomorphic in $\varepsilon$, uniformly in real $\chi$. Its denominator obeys $|D|>0.959$ and

$$
|f|<\frac1{0.997^3\,0.959}<1.06,\qquad |W|<7.
$$

These inequalities can be proved with rational bounds and a positive Taylor remainder for $e^{1/4}$; the controlled numerical inequality receipt independently records the displayed conservative caps. Since the contraction has strict margins, holomorphic dependence holds on an open neighborhood of every slightly smaller disk. Cauchy's coefficient bound therefore gives $|W_n|\le7\varepsilon_0^{-n}$ by taking disk radii up to $\varepsilon_0$.

For $|\varepsilon|\le\varepsilon_0/2$, the remainder beyond the exact cubic term is at most $14\varepsilon^4\varepsilon_0^{-4}$. Thus, explicitly for

$$
d\ge64(1+\beta),
$$

each centroid formula has absolute error bounded by

$$
\frac{14K}{R^2d^6\varepsilon_0^4}.
$$

This bound is intentionally conservative and does not promise useful relative accuracy at the smallest permitted gap. It is uniform in phase, including leading-term nodes, but no sign is assigned at a node. At phases and sequences where the leading sine has unit magnitude, its $d^{-5}$ term eventually dominates the explicit $d^{-6}$ error. This proves both signs along arbitrarily large phase-zero gaps without a sampled sign extrapolation. The correction bounds require fixed $\beta$; no simultaneous high-rung/far-gap uniform limit is claimed.

## Controlled measured comparisons

The new [comparison wrapper](../../../../../scripts/photon-research/coaxial_ring_far_mean_20261003.py) consumes only the frozen accepted T02/T04 parameter intervals and the admitted complete mutual-root implementation. This declared implementation reuse is not independent adjudication. Before any target, the final wrapper checks a stationary source at axial gap two and transverse chord two, with exact root $\sqrt8$ and axial acceleration $-1/(8\sqrt2)$; the exact Laurent coefficient $-1/8$; and all displayed analytic domain inequalities. The known receipt binds the current wrapper and frozen method identities.

The target compares complete lower/upper axial residuals against the leading formulas at $d=300,1000,10000$, phases $0,\pi/6$, T02/T04. Every target has six mutual roots per receiver and retains parameter uncertainty and transmitter margins. These are measured outward comparisons of prescribed residuals, not released motion or independent theorem validation. Original binary results, absolute leading-term differences and differences normalized by the leading coefficient scale are retained under `.local-data/ring-exploration/coaxial-far-mean/`.

All twelve targets passed. At $d=10000$ the lower-component difference divided by the positive leading coefficient scale lies within $[-0.000703,-0.000702]$ at T02 phase zero and $[-0.000308,-0.000307]$ at phase $\pi/6$; the corresponding T04 intervals lie within $[-0.000134,-0.000133]$ and $[0.001018,0.001019]$. These are signed differences scaled by the coefficient envelope, not relative errors at a possibly small sine. The owned run `710a3e06-b2cb-444b-877a-b6b3bef2c1c5` completed in 6.045 wall seconds, exit zero, stderr zero and closed process group by its final supervisor lease. Frozen wrapper SHA-256 is `9b958af9690c531c7979a9fda3a6295c206b66b723c30afe0e94723fc99f2ace`; frozen mutual primitive is `d4ee50325b693a385432ff110b32d05f582afd4a589a380a215177b56ab351c2`; known receipt is `5018e903df472cf506f6613ca4c1e64e35d8464b05c13e444c13b76ab8e5f58e`; target receipt is `3626ad0e9252ec39e8e905de207da6fdb257b440f117de3ffb64928a5c23c52b`.

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/photon-research/coaxial_ring_far_mean_20261003.py --stage known
"${AAA_VENV:-../.venv}/bin/python" scripts/photon-research/coaxial_ring_far_mean_20261003.py --stage target
```

The subject, wrapper, known and target are frozen for separately constructed review. The coordinator integrates accepted results into Photon and Braid owners and both indexes. No finite-spacing exact pair, equilibrium spectrum, retained structure, equation selection, rank or score follows from this asymptotic.
