# Independent assessment of the exact zero-speed radial asymptotics

## Verdict and inherited scope

**Derived verdict: the stated member-radius, radial-speed, total-speed and remaining-angle asymptotics are valid for every zero-terminal-speed member admitted by the fixed-power global and selection theorems, for each fixed $1<p\le2$.** Their constants have the correct physical normalization. The proof also supplies the stated conditional extension to $1<p<3$ under its explicit hypotheses; it does not establish that the selected noncollinear preparation supplies such a member for $2<p<3$. No load-bearing mathematical repair is required.

The [reviewed source](alternatives-screen-2026-10-05-radial-zero-speed-asymptotics.md) was measured by `shasum -a 256` as `e8dcbdd10993c150e304f3aa020d8757d4acc9e169db705393e98929d445b5bb`. The preceding [collinear critical-escape assessment](../../collinear-research/analysis/alternatives-screen-2026-10-05-radial-critical-escape-adjudication.md) was written, checked and frozen before this source was opened. That earlier result is not a premise here: the delayed vector geometry and radial/angular integrations below are reconstructed directly for this noncollinear family. The Hale role is a lens for checking the history domain and continuation assumptions, not an acceptance authority.

Fix one admitted positive launch parameter $\epsilon$ and one exponent $p\in(1,2]$. The scenario is the opposite-polarity mirror planar pair $q(T),-q(T)$ under radial magnitude $R^{-p}$, with $K=R_*=c_f=1$, the unchanged transmitter factor and every ordinary self/partner root. The [complete circle-tail preparation](alternatives-screen-2026-10-05-radial-power-family-preparation.md), its compatibility patch and the actual generated future remain the complete source data. No conserved physical energy or angular momentum is used.

## Checking the inherited hypotheses and units

The [global theorem](alternatives-screen-2026-10-05-radial-power-family-global.md) and its [independent assessment](alternatives-screen-2026-10-05-radial-power-family-adjudication.md) supply a separated ordinary solution for all physical time, one common strict speed bound $b<1$ over the supplied past and generated future, a unique partner root and no positive-delay self root. Their finite weighted endpoint has

$$
z\to0,\qquad y\to y_\infty\ge0,\qquad
a\to a_\infty\in(0,\infty),\qquad
\theta\to\theta_\infty.
$$

Here $z$ is the reciprocal relative-radius coordinate of that theorem, $y$ its scaled radial speed, $a=h^{2/(3-p)}$ its changing scale, and $h=Y\times dY/ds$ its dimensionless areal rate. Its ordinary physical time tends to infinity at the weighted endpoint. These are inherited analytical results with a separately recorded proof; the present assessment does not replace their transition or global-existence proof by an asymptotic assumption.

The physical/scaled conversion needs to be explicit because a finite scaled areal rate alone would not identify the angular coefficient. From

$$
q(T)=r_0Y(s),\qquad s=\epsilon T/r_0,
$$

one obtains $q'(T)=\epsilon Y_s$ and therefore

$$
H(T):=q(T)\times q'(T)=\epsilon r_0h(s),\qquad
H_\infty=\epsilon r_0a_\infty^{(3-p)/2}\in(0,\infty).
$$

All factors here are fixed for the selected member. This is a geometric areal-rate identity, not a conservation statement. The factor $\epsilon r_0$ must be retained; dropping it would alter the remaining-angle coefficient.

For the zero-speed endpoint, the inherited terminal vector formula gives $q'(T)\to0$ and $y_\infty=0$. The global theorem's final equation gives $y\asymp\chi_\infty-\chi>0$ sufficiently late. Since physical radial speed is $\epsilon a^{-(p-1)/2}y$, the physical radius $r(T)=|q(T)|$ is eventually increasing and tends to infinity. Thus the source uses every global hypothesis within the exact admitted domain. The [selection assessment](alternatives-screen-2026-10-05-radial-power-family-zero-speed-adjudication.md) establishes that such parameters exist arbitrarily near zero in this same family; no parameter value or numerical threshold is supplied by that statement.

## Complete late-source control

Let $S(T)<T$ be the unique partner emission time, $\tau=T-S=|q(T)+q(S)|$ its delay and range, and $n(T)=q(T)/r(T)$ the current radial unit vector. The complete speed margin yields

$$
\tau\le2r(T)+|q(S)-q(T)|\le2r(T)+b\tau,
\qquad
\tau\le\frac{2r(T)}{1-b}.
$$

This bound includes the entire interval between source and receiver. It does not presume that the source is already in the late tail. Since $q'(T)\to0$, integration and division by $T$ first give $q(T)/T\to0$, hence $r(T)/T\to0$. The delay bound then gives $\tau/T\to0$ and $S(T)/T\to1$. In particular $S(T)\to\infty$.

Now define $m(T)=\sup_{w\in[S(T),T]}|q'(w)|$. The full interval lies beyond any fixed time for sufficiently large $T$, so the velocity limit implies $m(T)\to0$. Consequently

$$
\frac{|q(S)-q(T)|}{r(T)}
\le\frac{m(T)\tau}{r(T)}
\le\frac{2m(T)}{1-b}\to0.
$$

Thus $q(S)=q(T)+o(r(T))$, $\tau/(2r)\to1$, and the actual hit direction $N=(q(T)+q(S))/\tau$ satisfies $N-n\to0$. Since the partner source velocity is $-q'(S)$, its exact transmitter factor is

$$
D=1+N\cdot q'(S)\to1.
$$

The exact physical acceleration $q''=-N/(\tau^pD)$ therefore obeys

$$
q''\cdot n=-2^{-p}r^{-p}[1+o(1)].
$$

This controls the entire receiving window before taking the limit. It rules out a late reception that still samples a fast old segment, and it derives the coefficient $2^{-p}$ from the actual partner range. The scaled coefficient $2^p$ in the normalized equation cannot be carried into this physical-time formula.

## Radial integration and monotonicity

For a planar path at positive radius, differentiating $r=|q|$ twice gives the exact kinematic identity

$$
r''=q''\cdot n+\frac{|q'|^2-(q'\cdot n)^2}{r}
=q''\cdot n+\frac{H^2}{r^3}.
$$

The second term is the geometric contribution of transverse motion, not an added interaction. Since $H$ is bounded and $p<3$, its ratio to $r^{-p}$ is $H^2r^{p-3}\to0$. Therefore

$$
r''=-2^{-p}r^{-p}[1+o(1)].
$$

The inherited eventual positivity of $u=r'$ makes radius an invertible time coordinate. The last display makes $u$ eventually decreasing; $|u|\le|q'|\to0$ supplies its terminal value. There is no inference that radial speed was monotone throughout the earlier oscillatory evolution. As an additional local check, once $r''<0$ and $u\to0$, a nonpositive value of $u$ on that late tail would contradict its strictly decreasing approach to zero; hence the late positivity is consistent without any ordering assumption on earlier turns.

With $U(r)=u(T(r))$, the chain rule gives

$$
\frac{d}{dr}U(r)^2=2r''(T(r)).
$$

For any $\eta\in(0,1)$ choose a sufficiently late whole tail where the radial acceleration lies between $-(1+\eta)2^{-p}r^{-p}$ and $-(1-\eta)2^{-p}r^{-p}$. Integrating from $r$ to infinity with $U(\infty)=0$ gives

$$
(1-\eta)\frac{2^{1-p}}{p-1}r^{1-p}
\le U(r)^2\le
(1+\eta)\frac{2^{1-p}}{p-1}r^{1-p}.
$$

The integral converges precisely because $p>1$. Letting $\eta$ decrease to zero proves the claimed squared-speed equivalent directly from the delayed trajectory; no differentiation of an unspecified asymptotic remainder or mechanical energy law is involved.

Set $A_p=\sqrt{2^{1-p}/(p-1)}$, $\alpha_p=2/(p+1)$ and $C_p=[(p+1)A_p/2]^{2/(p+1)}$. The positive square root gives $u\sim A_pr^{(1-p)/2}$, whence

$$
\frac{d}{dT}r^{(p+1)/2}\longrightarrow\frac{p+1}{2}A_p.
$$

Integration, followed by substitution in the speed equivalent, yields

$$
r(T)\sim C_pT^{\alpha_p},\qquad
u(T)\sim\alpha_p C_pT^{\alpha_p-1}.
$$

The equality of the two speed-coefficient expressions follows from $C_p^{(p+1)/2}=(p+1)A_p/2$. This is a member radius. Pair separation has coefficient $2C_p$.

The transverse speed satisfies

$$
\frac{H/r}{u}\sim\frac{H_\infty}{A_p}r^{(p-3)/2}\to0.
$$

Thus $|q'|\sim u$ in the same range $p<3$. This also identifies exactly why bounded areal rate alone would not permit the same conclusion at $p=3$.

## Angular tail and the range of the result

The exact angular derivative is $\theta'=H/r^2$. The already verified physical conversion, positive limiting $H$ and radius equivalent give

$$
\theta'(T)\sim\frac{H_\infty}{C_p^2}T^{-2\alpha_p}.
$$

For $p<3$, $2\alpha_p=4/(p+1)>1$, so the derivative is integrable. Integrating its eventual two-sided bounds to infinity gives

$$
\theta_\infty-\theta(T)
\sim\frac{H_\infty}{(2\alpha_p-1)C_p^2}T^{1-2\alpha_p}.
$$

The coefficient and remaining angle are positive in the inherited orientation. Although the radius coefficient depends only on the fixed radial law and exponent, this angular coefficient retains the particular history through $H_\infty$. Finite angular advance also follows from this tail estimate itself; no differentiated angle asymptotic is used as evidence.

These steps work conditionally for $1<p<3$ when an ordinary mirror-planar solution has the complete strict speed margin, $r\to\infty$, $q'\to0$, eventual increasing radius and finite positive $H_\infty$. The inspected global and selection sources establish those assumptions only for their admitted $1<p\le2$ circle-tail family. The larger interval is a conditional theorem, not an extension of that family's existence or admission threshold. At $p=1$ the squared-speed integral diverges. At $p=3$ the transverse geometric term is of the same radial order, so this coefficient calculation no longer applies. Neither endpoint is included.

## Falsifiers, identities and scoped validation

The conclusion would be overturned by a failure of an inherited global hypothesis; a wrong physical/scaled areal-rate conversion; a causal delay that violates $\tau\le2r/(1-b)$; a source window that stays outside the late zero-speed tail despite $S/T\to1$; a different transmitter or range normalization; or failure of either tail sandwich. Those possibilities are localized by the displayed identities. No such failure was found. No positive-terminal-speed parameter, unique zero-speed parameter, parameter location, joint uniform limit, nonmirror stability, capture, or bound binary is established here.

The following dependency hashes were measured with `shasum -a 256` on the exact sibling paths during this assessment:

| Dependency | SHA-256 |
| --- | --- |
| Fixed-power global theorem | `5eb796ea43033ce243560a0220a5e00614a8fc856ed3ac1bc7556b64e1e9b3b1` |
| Fixed-power trilogy assessment | `32bfecc1e93228140377cbd385726b35c20e3a7a6e67d4de59ffcbc949079365` |
| Zero-speed selection assessment | `6ec12814ac6563d5e7d97ee7a5e32e2d7f77f07e40ee844bfdaa02e626efb9b4` |

Validation is the independent physical-unit conversion, complete causal-window estimate, exact radial identity, centrifugal comparison, squared-speed tail integration and angular tail integration above. No numerical trajectory, new executable instrument, Python process or background job was used. Only this new assessment was authored for the second subject; the reviewed source, dependencies and shared owners remain unchanged by this review. Whitespace validation and final identity checks are reported after creation. Scientific integration remains with the coordinating investigation.
