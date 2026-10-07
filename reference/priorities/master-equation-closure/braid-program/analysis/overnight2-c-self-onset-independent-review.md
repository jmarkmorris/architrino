# Independent review of the superfield self-root onset restriction

## Verdict and scope clarification

**Derived and independently reconstructed:** the [self-root onset theorem](overnight2-c-superfield-self-onset.md) has the stated unique positive self root, exact acceleration components, asymptotic coefficient, finite all-root partner bound and necessary compensation inequality. These claims hold for the selected ordinary circular-reference class with a fixed finite radius bound $R$, receiver radius $a\in[1,R]$ and receiver speed $v=\omega a\in(1,\pi/2)$ approaching one from above. The factor-only consequence additionally requires the stated uniform positive simultaneous partner-separation bound.

One minor justification was corrected by the parent and separately verified here. The initially read subject asserted that every distinct partner starts at positive present separation, while its stated bounded-radius assumptions do not expressly exclude coincident labels from different pairs. The corrected passage uses only the receiver's own antipodal partner, whose simultaneous distance is exactly $2a>0$. Its positive causal root exists by continuity and bounded circular distance. This supplies the required nonemptiness without adding an unspoken separation assumption. The theorem, root bound and compensation inequality are unchanged by this clarification; this reviewer did not modify the subject.

After the parent saved that correction, `rg -n 'finite set is nonempty|antipodal partner|positive present separation'` on the subject returned the corrected justification at line 89. The accompanying `shasum -a 256` returned final subject digest `5b6d3774566809bf647e3a7db8332cdd08e22e90484ad0843e2bccf1b32ef09d`. This is also the first digest measured by this review; it must not be described as a verified pre-correction digest, because the initial source read preceded the hash measurement and the parent's concurrent correction. The current corrected passage is supported by the explicit antipodal-root argument below.

The review reconstructs the claim from the selected logarithmic law and complete circular geometry. It does not use earlier interval code, sampled root lists, numerical optimizer results or a standard-physics law. The finite superfield radius bound is an explicit assumption. The separate bound $r_3<35$ proved in a subfield class does not establish it for arbitrary superfield configurations. Taking $R=35$ would define a selected bounded superfield class, not a global theorem.

## Exact self geometry and uniqueness

Use $K_{\log}=c_f=1$, unit persistent polarities, unchanged absolute transmitter weighting and every admitted ordinary positive-delay root. Put the chosen receiver at $X(0)=(a,0)$ on the complete circular history $X(t)=a(\cos\omega t,\sin\omega t)$, with $\omega>0$. At delay $\tau>0$ define $x=\omega\tau/2$ and $v=\omega a$. The self chord is

$$
X(0)-X(-\tau)=2a\sin x\,(\sin x,\cos x),\qquad |X(0)-X(-\tau)|=2a|\sin x|.
$$

Every causal self root satisfies $\tau\le2a$, so the full infinite past reduces to $0<x\le v<\pi/2$. Sine is positive on that interval and the causal equation becomes $x=v\sin x$. Define $h(x)=\sin x/x$, extended continuously by $h(0)=1$. For $x>0$,

$$
h'(x)=\frac{x\cos x-\sin x}{x^2}<0,
\qquad \sin x-x\cos x=\int_0^x t\sin t\,dt>0.
$$

The value at zero exceeds $1/v$, whereas $h(v)=\sin v/v<1/v$. Hence exactly one root lies in $(0,v)$. No later sine lobe lies in the complete delay interval. The zero at $x=0$ is the same-time endpoint and is not admitted by the selected law.

At the positive root, the chord direction is $n=(\sin x,\cos x)$. The emission velocity is $V(-\tau)=v(\sin2x,\cos2x)$, and the identity $n\cdot V(-\tau)=v\cos x$ gives

$$
D=1-v\cos x=1-x\cot x
=\frac{\sin x-x\cos x}{\sin x}>0.
$$

Thus the unique positive self root is ordinary throughout the open interval $1<v<\pi/2$. With positive self polarity product and $\tau=2a\sin x$, its coefficient-one logarithmic row is

$$
\frac{n}{\tau D}
=\left(\frac1{2aD},\frac{\cot x}{2aD}\right).
$$

The second component is tangential in the direction of positive rotation and is strictly positive. The first component is outward radial. Both signs and the absolute source factor follow directly from the selected law; no self suppression is used.

## Onset coefficient and varying radius

As $v\downarrow1$, the unique root tends to zero: any positive limiting root would satisfy $\sin x/x=1$, contrary to strict decrease. Taylor expansion at that endpoint gives

$$
\frac{x}{\sin x}=1+\frac{x^2}{6}+O(x^4),\qquad
1-x\cot x=\frac{x^2}{3}+O(x^4),\qquad
\cot x=\frac1x\bigl(1+O(x^2)\bigr).
$$

Writing $\varepsilon=v-1$, the first identity implies $x^2=6\varepsilon(1+O(\varepsilon))$. The other two identities consequently yield

$$
D=2\varepsilon(1+O(\varepsilon)),\qquad
A_{r,\mathrm{self}}=\frac1{4a\varepsilon}(1+O(\varepsilon)),
$$

$$
A_{t,\mathrm{self}}=\frac3{2ax^3}(1+O(x^2))
=\frac1{4\sqrt6\,a\varepsilon^{3/2}}(1+O(\varepsilon)).
$$

These expansions derive the precise coefficient independently. The dimensionless quantities $x$, $D$ and the relative error depend only on $v$, not on $a$. Therefore the asymptotic equivalence remains uniform when $a$ varies within $[1,R]$, even when the radius sequence itself has not been fixed. The positive tangential acceleration diverges at least at a constant multiple of $1/(R\varepsilon^{3/2})$. If the allowed radius bound grew with the sequence, this uniform conclusion would require a new argument.

This is a parameter limit through ordinary prescribed circular references. The self delay tends to zero and the factor tends to zero at the excluded endpoint. The derivation does not specify an actual trajectory crossing wake speed, an endpoint acceleration, or a singular-event continuation rule. The asymptotic expressions do not supply a numerical finite-parameter error threshold; the exact formulas supply the finite necessary inequality below.

## Complete partner count by repeated Rolle's theorem

For any partner source, let $b\in[1,R]$ and let $\delta$ be its actual present angular separation, including an antipodal shift where applicable. All positive causal roots lie in $0<\tau\le L=a+b\le2R$. Squaring the nonnegative causal distance produces exactly the positive roots of

$$
G(\tau)=\tau^2-a^2-b^2+2ab\cos(\delta-\omega\tau).
$$

Direct differentiation gives

$$
G'=2\tau+2ab\omega\sin(\delta-\omega\tau),\quad
G''=2-2ab\omega^2\cos(\delta-\omega\tau),\quad
G'''=-2ab\omega^3\sin(\delta-\omega\tau).
$$

Here $a,b,\omega$ are positive, so the third derivative is not identically zero. Its successive zeros are separated by exactly $\pi/\omega$. Since $a\ge1$ and $v<\pi/2$, $\omega<\pi/2$ and

$$
\frac{\omega L}{\pi}<R.
$$

If there are $q\ge1$ third-derivative zeros on $[0,L]$, their first and last are separated by $(q-1)\pi/\omega\le L$. Thus $q< R+1$, which certainly implies the subject's deliberately loose upper bound $q\le\lceil R\rceil+1$. This also covers zeros at either endpoint. The bound remains valid for every phase representative $\delta$.

If $G$ has $n$ distinct positive roots, successive applications of Rolle's theorem between those roots supply at least $n-3$ distinct zeros of $G'''$ when $n\ge3$. Thus

$$
n\le q+3\le\lceil R\rceil+4=:N_R.
$$

An infinite positive-root set is impossible by the same argument applied to arbitrarily large finite subsets. The estimate counts distinct roots without any assumption that a particular partner branch is the first root. On the selected ordinary configurations all admitted roots are simple; a singular-root parameter point is outside that equation domain, not a row excluded to make the count smaller. A possible same-time zero for coincident labels is irrelevant to the positive-root count. Roots beyond $L$ are impossible by the circular chord bound.

There are five partner labels at the selected receiver, so there are at most $5N_R$ admitted partner rows. The estimate is conservative and is not a measured root census, an attained maximum or a claimed optimal bound.

## Necessary compensation and separation-dependent factor bound

The actual positive partner-root set is nonempty. To see this without requiring all different labels to be instantaneously separated, take the receiver's own opposite-polarity antipodal member. Its distance-minus-delay starts at $2a>0$ and is nonpositive at delay $2a$, so it has a positive causal root. In an ordinary exact reference that root is among the admitted rows.

Let $m$ be the actual partner-root count and let $s$ be the minimum of $\tau|D|$ over those roots. Finiteness, positive delays and ordinariness give $0<s<\infty$. Circular motion requires zero tangential acceleration, while the self term is positive. The exact tangential equation and the triangle inequality give

$$
A_{t,\mathrm{self}}=\left|\sum_{\mathrm{partner\ roots}}A_t\right|
\le\sum_{\mathrm{partner\ roots}}|A_t|
\le\sum_{\mathrm{partner\ roots}}\frac1{\tau|D|}
\le\frac{m}{s}\le\frac{5N_R}{s}.
$$

The norm identity $|A|=1/(\tau|D|)$ uses a unit chord direction and unit polarity magnitude. It remains valid for either sign of the transmitter factor. It is an upper bound on tangential magnitude, not an assumption that every partner row is purely tangential. Rearranging proves

$$
s\le\frac{5N_R}{A_{t,\mathrm{self}}}
=10N_R aD\tan x
\sim20\sqrt6\,N_Ra\varepsilon^{3/2}.
$$

This is the asserted necessary small-product condition. The minimizing root may change with the parameter; it is not a tracked branch or a continuation prescription. A small denominator alone need not have the tangential sign needed for cancellation, so the inequality supplies no existence claim.

Suppose additionally that every simultaneous partner distance from this receiver is at least a fixed $d_0>0$. Every source speed satisfies $\omega b\le\omega R<\pi R/2$. At any root, a causal triangle inequality gives

$$
d_0\le|x_i-X_j(-\tau)|+|X_j(-\tau)-X_j(0)|
\le\tau(1+\omega b)
\le\tau(1+\pi R/2).
$$

This estimate uses a finite upper speed bound and does not assume that the partner is subfield. The root attaining $s$ therefore obeys

$$
|D|\le\frac{5N_R(1+\pi R/2)}{d_0A_{t,\mathrm{self}}}
=O(\varepsilon^{3/2}),
$$

with a uniform implied constant for fixed $R,d_0$ because $a\le R$. Without that separation floor, only the product statement follows. If a limiting factor vanishes at a limiting positive delay, $G'=2\tau D$ identifies a multiple root; its higher derivatives would still have to be checked before classifying a generic fold. A collapsing delay is a different possible degeneracy. Neither outcome defines the equation at the boundary.

## Evidence boundary and falsifiers

This review used hand derivation and direct source reading. No Python command, numerical root search, interval replay, automatic theorem checker or CPU-heavy worker was run; no new arithmetic instrument was needed. The Taylor coefficients, root count and norm inequality were reconstructed above rather than inferred from agreement between implementations. The only authored artifact is this assigned review report; frozen subjects, previous reviews and shared owners remain outside its write scope.

Falsifiers are a second positive self root in the complete interval, failure of the source-factor or chord-direction identity, a different leading Taylor coefficient, an allowed sequence for which the radius-dependent relative error is not uniform, a partner count exceeding the repeated-Rolle bound, a row norm exceeding $1/(\tau|D|)$ under the selected normalization, or an exact reference approaching onset with both partner delays and absolute factors uniformly bounded away from zero. A factor-only conclusion without fixed $d_0$ or a global superfield radius bound inferred from the subfield result would exceed the proved scope rather than follow from it.

The recommended integration is to retain the analytic necessary condition at the independently reconstructed grade, use the guaranteed antipodal partner to justify nonemptiness, and keep the explicit fixed-radius and optional separation assumptions beside every application. The constants are exact/asymptotic as labeled; no exact circular reference or physical acceptance is established.
