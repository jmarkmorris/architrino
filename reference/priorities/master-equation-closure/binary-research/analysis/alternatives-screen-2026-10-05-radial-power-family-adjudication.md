# Independent assessment of the fixed radial-power preparation, transition and dispersal theorem

## Verdict and exact scope

**Claim grade: derived.** The three frozen sources support the following statement: for every fixed $p\in(1,2]$, there is a positive launch threshold, depending on $p$, below which every member of the specified complete compatible circle-tail family reaches a fixed nonzero radial-oscillation amplitude in finite time and subsequently has a unique separated ordinary mirror-planar continuation for all physical future time. That continuation stays uniformly below $c_f=1$, disperses, accumulates finite total polar angle, and approaches a radial velocity vector of nonnegative magnitude. The proof permits both positive and zero terminal speed; it does not establish the existence of a launch selecting either alternative for a general exponent.

This assessment independently reconstructs the delayed response, changing-scale coefficients, amplitude estimate, entire-window tail estimates, orbit corrector and physical endpoint integrals. No load-bearing mathematical objection was found in that reconstruction. The verdict applies to the exact preparation and sufficiently small positive launch parameter for each fixed exponent. It supplies no numerical admission threshold, uniform threshold as $p\downarrow1$, arbitrary-history robustness, nonmirror stability, physical conserved energy or selection theorem for terminal speed. It does not promote the radial variation into the canonical equation.

The sources assessed are the [preparation](alternatives-screen-2026-10-05-radial-power-family-preparation.md), [finite transition](alternatives-screen-2026-10-05-radial-power-family-transition.md), and [global dispersal proof](alternatives-screen-2026-10-05-radial-power-family-global.md). The direct mathematical checks below are the evidence for the verdict; the role assignment and agreement with an earlier exponent are not evidence of correctness.

## Equation, preparation and hereditary domain

The selected law is the opposite-polarity radial response of magnitude $R^{-p}$, with $K=R_*=c_f=1$ and the ordinary transmitter factor. For the mirror pair $q,-q$, a complete strict-subfield history has one partner delay and no positive-delay self root. To check the former, the physical delay residual $u-|q(T)+q(T-u)|$ starts negative at a separated receiving point and increases at least at rate $1-b$ when the complete history has speed bound $b<1$. It tends to positive infinity. To check the latter, the strict chord inequality gives $|q(T)-q(T-u)|<u$ for every positive delay. These arguments retain all roots rather than excluding a self channel by convention.

The normalization is fixed by the central comparison balance

$$
\frac{\epsilon^2}{r_0}=(2r_0)^{-p},\qquad
r_0=(2^p\epsilon^2)^{-1/(p-1)},\qquad
s=\epsilon T/r_0,\qquad q=r_0Y.
$$

Consequently the actual scaled acceleration is $Y''=-2^pN/(R_d^pD)$, where $R_d=|Y(s)+Y(\sigma)|$, $s-\sigma=\epsilon R_d$ and $D=1+\epsilon N\cdot Y'(\sigma)$. The coefficient $2^p$ follows from scaling physical acceleration by $r_0/\epsilon^2$; no receiver multiplier is introduced.

For the circular tail, the unique release root is $\sigma=-2\xi$, where $\xi=\epsilon\cos\xi$. Its direction is $(\cos\xi,-\sin\xi)$ and its transmitter factor is $1+\epsilon\sin\xi$. Thus the exact circular received acceleration in the preparation is correct. The polynomial patch $\phi_d=(d^2/2)z_p^3(1-z_p)^2$, with $d=\epsilon/16$ and $z_p=1+s/d$, has zero value, first derivative and second derivative at the old seam; at release its value and first derivative vanish and its second derivative equals one. Multiplication by $B_p=(1,0)+A_{c,p}$ therefore produces precisely the claimed compatible release acceleration.

For $\epsilon\le1/16$, the bounds on $B_p$ and the patch derivatives keep the complete supplied speed below two in scaled units, the acceleration below eight, and the signed areal rate positive. The release source lies below $-\epsilon<-d$, so the patch changes none of its sampled source data. Monotonicity of the delay residual then verifies that the unchanged circular root remains the only root after patching. The old path is supplied data, not an asserted solution of the future law.

The positive torque argument also survives direct reconstruction. The path in a causal interval lies inside the open ball centered at $(q(S)+q(T))/2$ with radius $|q(S)+q(T)|/2$. This follows by adding the two strict path-length bounds from an intermediate point to the interval endpoints. The ball lies in an open half-plane through the origin, and $|q(T)-q(S)|<|q(T)+q(S)|$ gives a positive endpoint dot product. A positive areal rate therefore produces an actual lifted angular increment in $(0,\pi/2)$ and strictly positive received torque. In particular $h=Y\times Y'\ge1$ at generated times. None of this treats $h$ as physical angular momentum.

The complete locally $C^{2,1}$ preparation and the transmitter margin give ordinary local existence and uniqueness. On a compact regular future interval, delay has a positive lower bound and the root depends locally Lipschitz continuously on current position and retained source data. Position-velocity steps are therefore ordinary differential equations against already known history. Bounded acceleration preserves the required compact-history regularity. This is the continuation mechanism used below; no global state-dependent-delay theorem is invoked without its domain conditions.

## Independent second-order response and amplitude reconstruction

Write $r=|Y|$, $u=Y'\cdot n$, $v=Y'\cdot t$ and $h=rv$. Set $\beta=p-1$, $m=3-p$, $\alpha=\beta/2$, $k=2/m$, $d=\beta/m$, and

$$
a=h^{2/m},\qquad x=r/a,\qquad y=a^\alpha u,\qquad
\delta=\epsilon a^{-\alpha},\qquad d\eta/ds=a^{-(p+1)/2}.
$$

Within a fixed neighborhood of $x=1,y=0$, the complete speed bound first gives $r(q)/r(s)=1+O_p(\epsilon)$ on a receiving source interval. Since $r\asymp a$ at all generated points in this neighborhood, it also compares source and receiving scales. Reintegration with the resulting source speed $O_p(a^{-\alpha})$ improves the radius comparison to $1+O_p(\delta)$. If the interval reaches the supplied past, then $s=O_p(\epsilon)$, all scales are near one, and the circle-plus-patch acceleration differs from the central vector by $O_p(\epsilon)$. The same argument applies to a source's own source. Thus integral Taylor expansion works across the seam and release without a jerk bound uniform in $\epsilon$.

Let $\ell=s-\sigma=2\epsilon rL$. In receiving axes the retained Taylor terms are

$$
Y(s)+Y(\sigma)=(2r-\ell u-\ell^2r^{-p}/2)n-\ell vt
+O_p(\delta^3a),
$$

$$
Y'(\sigma)=(u+\ell r^{-p})n+vt+O_p(\delta^2a^{-\alpha}).
$$

Solving the implicit norm relation, whose derivative is bounded away from zero on this chart, gives

$$
L=1-\epsilon u+\epsilon^2(u^2-r^{1-p}+v^2/2)+O_p(\delta^3),
$$

$$
N_t=-\epsilon v+O_p(\delta^3),\qquad
N_r=1-\epsilon^2v^2/2+O_p(\delta^3),\qquad
D=1+\epsilon u+\epsilon^2(2r^{1-p}-v^2)+O_p(\delta^3).
$$

The absence of a quadratic transverse-direction term is a consequence of $\ell=\epsilon R_d$: the leading transverse chord divided by range is exactly $-\epsilon v$. Multiplication of the independently expanded $L^{-p}$, $D^{-1}$ and direction then gives

$$
\begin{aligned}
A_r&=-r^{-p}\left[1+\beta\epsilon u+\epsilon^2\left(\frac{\beta(p-2)}2u^2+(p-2)r^{1-p}-\frac\beta2v^2\right)\right]+O_p(\delta^3a^{-p}),\\
A_t&=r^{-p}(\epsilon v+\beta\epsilon^2uv)+O_p(\delta^3a^{-p}).
\end{aligned}
$$

This reconstruction was frozen in the review communication before consulting any separately authored general-power coefficient reference. Substitution of $p=2$ removes the quadratic $u^2$ and $r^{1-p}$ terms and agrees with the [canonical signed row](slow-binary-wider-regime.md#3-an-implicit-root-residual-and-the-signed-cubic-constants). Substitution of $p=3/2$ gives the coefficients $-1/8,-1/2,-1/4$ in the radial quadratic bracket, agreeing with the [three-halves signed row](alternatives-screen-2026-10-05-radial-rotating-transition.md). These comparisons are algebraic controls after the general derivation, not interpolation or transfer of their quantitative thresholds.

Differentiating the exact scale definitions gives the direct radial first-order coefficient $-\beta$ plus the moving-velocity-unit contribution $\alpha k$. Their sum is

$$
c=\frac{\beta(p-2)}m.
$$

Removing scale drift with $w=y-k\delta x^{1-p}$ adds $k\beta$ to this coefficient. Hence the squared-amplitude growth coefficient is

$$
\gamma_p=c+k\beta=\frac{p(p-1)}{3-p}>0.
$$

The same differentiation gives the constant second-order radial input

$$
G_{0,p}(x)=\left(\frac{2\beta^2}{m^2}+2-p\right)x^{1-2p}
+\frac\beta2x^{-p-2}.
$$

The first coefficient contains $k(c+d)-(p-2)$: the $+kd$ contribution comes from differentiating $\delta$, and cannot be omitted. Integration of this displayed function verifies the source's $G_p$. Subtracting $\delta^2G_p$ from the central potential shifts its minimum by $[(2\beta^2/m^2+2-p+\beta/2)/m]\delta^2+O_p(\delta^4)$.

With $X=x-x_\delta$, the source's corrected quadratic scalar $\mathcal L=E-(\gamma_p/2)\delta Xw$ is positive definite in $(X,w)$ for sufficiently small fixed neighborhood and launch parameter. At release $w=-k\epsilon$ and $X=O_p(\epsilon^2)$, so $J=\sqrt{\mathcal L}=k\epsilon/\sqrt2+O_p(\epsilon^3)$. The launch seed does not come from a spectrum about a nonexistent delayed circular equilibrium.

Direct differentiation leaves the estimate

$$
|\mathcal L_\eta-\gamma_p\delta\mathcal L|
\le C_p\delta(J+\delta)\mathcal L+C_p\delta^3J.
$$

The reason the final remainder has a factor $J$ is substantive: the constant second-order input has been removed by the moving potential, while every remaining acceleration defect is paired with a displacement or velocity in the scalar derivative. Its moving-parameter contribution is $-2\delta\delta_\eta[G_p(x)-G_p(x_\delta)]=O_p(\delta^3|X|)$. No derivative of a history-dependent error is needed.

On the provisional floor $J\ge k\epsilon/(2\sqrt2)$, division by $\delta J$ makes the dangerous remainder $O_p(\epsilon)$. First choose fixed $j_*(p)$ small, then choose the launch threshold small. The resulting lower rate $J_\eta/J\ge\gamma_p\delta/4$ prevents a downward floor crossing. If $J$ never reached $j_*$, the regular chart would continue globally, $a^p\asymp1+\epsilon s$, and $\eta\to\infty$. The two-sided $\delta_\eta\asymp-\delta^2$ estimate would then give $\int\delta\,d\eta=\infty$, contradicting bounded amplitude.

The integrated logarithmic errors are also bounded uniformly up to this event: $\int\delta J\,d\eta=O_p(j_*)$, $\int\delta^2\,d\eta=O_p(\epsilon)$, and $\int\delta^3/J\,d\eta=O_p(\epsilon)$ because the seed survives. Thus $\log[J/J(0)]-[p(p-1)/4]\log a=O_p(j_*+\epsilon)$. This verifies the transition scales, including $a_b\asymp\epsilon^{-4/[p(p-1)]}$, $\delta_b\asymp\epsilon^{(p+2)/p}$, and $T_b\asymp\epsilon^{-2(p+2)/(p-1)}$. Direct phase differentiation gives a nonvanishing oscillator rotation on the final fixed amplitude band; its duration is comparable to $1/\delta_b$. Since $y-w=O_p(\delta_b)$ there, the claimed alternating actual radial turns follow. These are finite-trajectory statements.

## Uniform late-history bounds and the global coordinate equations

The transition alone gives no tail estimate. For the global proof set $z=x^{-\beta}$ and $d\chi/ds=a^{-(p+1)/2}x^{-p}$. On a fixed box $0<z<Z_p$, $|y|<Y_p$, $a\ge1$, the generated scaled speed has a fixed bound and radius has a positive floor. Including the supplied past gives complete physical speed $O_p(\epsilon)<1/2$. Consequently $R_d\asymp_p r$ and $\ell\le C_p\epsilon r$. Since $r(s)\le1+M_ps$, all receiving windows and their nested source windows are generated at sufficiently late times; choosing the threshold smaller makes this true before the transition time $s_b\to\infty$.

A coarse full-window comparison gives $r(q)/r(s)=1+O_p(\epsilon)$. Positivity and monotonicity of $h$ bound the lifted angle by $C_ph(s)\ell/r(s)^2$. Inserting this in the exact torque formula gives $0<h'/h\le C_p\epsilon r^{-p}$. Integration on the full receiving interval, applying the same estimate at its source points, therefore yields

$$
\left|\log\frac{h(q)}{h(s)}\right|\le C_p\epsilon^2r^{1-p}
=C_p\delta^2z.
$$

This is the needed local scale comparison when relative radius is unbounded. The box coordinates now bound source velocity by $O_p(a^{-\alpha})$, and a second integration improves the radius comparison to $1+O_p(\delta)$. The angular integral improves to $\Delta\theta=(h\ell/r^2)[1+O_p(\delta)]$, which gives $N_t=-\epsilon v[1+O_p(\delta)]$. Thus

$$
A_r=-r^{-p}[1+\beta\epsilon u+O_p(\delta^2)],\qquad
A_t=\epsilon vr^{-p}[1+O_p(\delta)].
$$

The transverse factor $v$ is retained throughout. An additive isotropic bound would not justify the next change of clock. Direct coordinate differentiation using these rows gives

$$
\begin{aligned}
z_\chi&=-\beta y+\beta k\delta z+O_p(\delta^2z),\\
y_\chi&=z^{m/\beta}-1+c\delta y+O_p(\delta^2),\\
\delta_\chi&=-d\delta^2+O_p(\delta^3),\\
a_\chi/a&=k\delta+O_p(\delta^2).
\end{aligned}
$$

In particular the first error is proportional to $z$, and no negative power of $z$ occurs in a remainder. These estimates apply to the actual complete delayed history, without treating its errors as an autonomous function.

## Orbit regularity, corrected action and finite weighted endpoint

The auxiliary central extension has potential $\widehat W_p(z)=|z|^{2/\beta}/2-z/\beta$ and vector field $F_0=(-\beta y,\operatorname{sgn}(z)|z|^{m/\beta}-1)$. Since $m/\beta=2/\beta-1\ge1$, this field is $C^1$ and locally Lipschitz, and the potential is $C^2$. This regularity is enough: no analyticity or higher derivative at $z=0$ is required. Every compact annulus away from the unique minimum consists of regular closed ovals. The zero scalar level has an ordinary turning point at $z=0$ because $\widehat W_p'(0)=-1/\beta$; it has no saddle or divergent period.

For $e=y^2/2+\widehat W_p(z)$, define $I(e)=\oint y^2\,d\chi$ and $Q(e)=\oint d\chi$. The action integrals in the source give $I'=Q>0$. A return to the transverse section $z=1,y>0$ makes the period $C^1$ in $e$ by the implicit-function theorem for the $C^1$ flow. On a compact annulus this also supplies a $C^1$ phase parametrization and bounded first derivatives for an orbit primitive. The possible noninteger power at zero causes no missing regularity in these uses.

The actual first-order scalar drift is $\delta F$, where $F=cy^2+k(|z|^{2/\beta}-z)$. Independently integrating the exact derivative $(zy)_\chi$ around a central oval gives

$$
\oint(|z|^{2/\beta}-z)\,d\chi=\beta I(e),\qquad
\oint F\,d\chi=\gamma_p I(e).
$$

Hence $Q(e)F-\gamma_p I(e)$ has zero orbit integral. Integrating it from the transverse section defines a single-valued $C^1$ function $B$; zero integral also makes its level derivative agree across the section seam. Both $B$ and its gradient are bounded on the chosen annulus. For the actual delayed path, the corrected action $\mathcal I=I(e)-\delta B$ then satisfies $\mathcal I_\chi=\gamma_p\delta I(e)+O_p(\delta^2)>c_p\delta$. This is a pointwise estimate, not an averaging assertion transferred from a comparison orbit.

The fixed scalar gap at entry excludes the lower annular exit. Infinite weighted time within the annulus is impossible because $\int\delta\,d\chi$ would diverge while $\mathcal I$ stays bounded. Thus either $z\to0$ at finite $\chi$ or the scalar reaches $e=1$. In the latter case, every point on the compact positive-$z$ central arc crosses zero outward and reaches a negative comparison coordinate within bounded time. Gronwall comparison against the actual bounded history-dependent error excludes continued positive $z$ through that negative sample. The auxiliary negative coordinate is used only for this contradiction; it does not prescribe a physical continuation through infinity.

At a finite weighted endpoint, bounded derivatives give limits of $z,y,\delta$. The differential lower bound for $\delta$ keeps $\delta_\infty>0$ and hence $a_\infty<\infty$. If $z$ stayed positive, physical time and the regular history chart would remain finite and continuation would apply. Therefore $z\to0$, and positivity of the approaching path forces $y_\infty\ge0$. Artificial outer boundaries are excluded by the scalar sublevel and the bounded comparison interval.

## Physical time, angle and terminal alternatives

Let $\Delta=\chi_\infty-\chi$. If $y_\infty>0$, the first coordinate equation gives $z\asymp\Delta$. Since $ds/d\chi=a^{(p+1)/2}z^{-p/\beta}$, integration yields $s\asymp\Delta^{-1/\beta}$ and $r\asymp s$. Physical time diverges.

If $y_\infty=0$, the second equation is bounded between two negative constants sufficiently near the endpoint, so $y\asymp\Delta$. The proportional first remainder makes the first equation exactly $z_\chi=-\beta y+b(\chi)z$ with bounded $b$. Backward integration from $z(\chi_\infty)=0$ gives $z\asymp\Delta^2$. Therefore

$$
s\asymp\Delta^{-(p+1)/\beta},\qquad
r\asymp\Delta^{-2/\beta}\asymp s^{2/(p+1)}.
$$

These comparisons need no limiting value of a history-dependent remainder. In either alternative $T=r_0s/\epsilon\to\infty$. The exact angular identity $\theta_\chi=z^{(2-p)/\beta}$ has a nonnegative exponent and is bounded on a finite weighted interval. Finally the exact velocity formula tends to $\epsilon a_\infty^{-\alpha}y_\infty n(\theta_\infty)$ because its transverse coefficient $z^{1/\beta}$ tends to zero. This closes finite total angle, radial terminal velocity and both conditional radius laws.

Every finite physical interval retains the separation floor, complete strict speed margin, root factor margin and compact accessible old history needed for local continuation. Bounded physical speed prevents divergence of radius in finite physical time. Thus the infinite-radius coordinate boundary is not an unresolved finite physical event.

## Falsifiers and exclusions

The verdict would be overturned by a wrong normalization or patch jet, an additional root despite the complete strict speed bound, failure of the cubic signed response on a supplied or generated window, omission of the $+kd$ drift term, loss of the amplitude seed under its differential inequality, or failure of the integrated logarithmic error bound. For the global part, decisive falsifiers are failure of the torque-derived local scale estimate, a transverse error lacking the factor $v$, an additive $z$ remainder after weighted-clock division, failure of the $C^1$ orbit primitive, a different orbit-integral sign, or a finite physical endpoint with all displayed regular margins intact. Each is localized by the corresponding formulas above and in the frozen subjects.

No conclusion here establishes exceptional zero-speed parameters, positive-speed parameters, their topology or their accumulation. The zero-speed power law is conditional on that terminal alternative occurring. The inverse-square wider theorem retains its distinct explicit threshold and broader preparation domain. At $p=1$ the chosen balance would require $\epsilon^2=1/2$ independently of radius, so this small-speed family has no such endpoint. The proof also does not extend to $p>2$, where its comparison regularity and angular endpoint argument need separate analysis.

## Source identities and scoped validation

The preparation, transition and global hashes below were measured by `shasum -a 256` on the three exact source paths before this assessment was written. They match the assigned freeze:

| Source suffix | SHA-256 |
| --- | --- |
| `preparation.md` | `5bb3bf495cdb40975f86d1c7ff8e14398848f3e094bfcd6a739a8ef215beed04` |
| `transition.md` | `5974cc0f89a7597dd6f765d166735f627361225ac8cafd4de23326d82c37fbb3` |
| `global.md` | `5eb796ea43033ce243560a0220a5e00614a8fc856ed3ac1bc7556b64e1e9b3b1` |

The source prefix is `alternatives-screen-2026-10-05-radial-power-family-`. The [ontology](../../../../../content/markdown/aaa/foundations/ontology.md), [canonical root-weight owner](../../../../../content/markdown/aaa/dynamics/master-equation.md), selected radial source definitions, [rotating-class proof](alternatives-screen-2026-10-05-radial-rotating-class.md), and endpoint signed rows supplied the live mathematical context. This record independently checks the rotating-class geometry rather than using an unassessed role report as a premise.

Validation is analytical, with the explicit calculations above as its instrument and the fixed-power frozen preparation as its domain. No numerical trajectory, new executable checker, Python process or external reference was used. The only authored file is this adjudication; the reviewed subjects, coefficient references, manuscripts, ledgers and queues were not edited. Scientific integration remains with the coordinating investigation.
