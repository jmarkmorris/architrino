# Maxwell-shaped binary: equation, compatible history and circular obstruction

This source owns the equation/domain and slow-binary part of the operator-selected ten-hour Maxwell investigation. Sections 7 and 8 of the [variation manuscript](../../equation-variants/manuscript.md#7-complete-maxwell-shaped-transmitter-response) are selected for this bounded investigation; selection does not change canon. The investigation starts at 2026-10-05 02:29:32 UTC and ends at 12:29:32 UTC, with its final hour reserved for integration. This source is separate from the independent reference and numerical subject. No numerical target has been evaluated by this source at its initial specification freeze.

## Complete case specification, frozen before numerical target use

The primary analytical family is a finite isolated opposite-polarity pair with equal constant coupling $K=1$, normalized wake speed $c_f=1$, mirror planar positions $\mathbf X_+(T)=\mathbf q(T)$ and $\mathbf X_-(T)=-\mathbf q(T)$, all admitted positive-delay partner and self channels, and complete supplied pasts on $(-\infty,0]$. The selected equations are separately E and E+M, exactly as defined below. The past is separated, uniformly subfield, and locally $C^{2,1}$, meaning twice continuously differentiable with locally Lipschitz acceleration. No velocity projection, clamp, braking multiplier, spatial core, root deletion, impulse, external source or supplementary self response is selected. Histories are preparations and need not solve the equation before release; the endpoint acceleration must match the selected law. The future solves that law while this regular domain holds.

All three speed labels are recorded: unrestricted, inclusive ceiling and strict ceiling coincide on the proved uniformly subfield interval. The labels introduce no different response there. A loss of uniform subfield margin ends the stated guarantee; equality or superfield continuation is not supplied by this investigation. Coincidence, a nonordinary root, or loss of finite-window history regularity is likewise a stopping boundary. Ordinary-root results do not select a continuation at these boundaries.

For numerical release candidates, the frozen family uses $\beta\in\{0.1,0.2,0.3\}$, $r=1/(4\beta^2)$, $\omega=\beta/r$, and the circular old tail $\mathbf q_c(T)=r(\cos\omega T,\sin\omega T,0)$. Each selected equation has its own endpoint patch described below. These radii match the instantaneous leading radial comparison and are not asserted to balance the delayed law. Additional radii, speeds or preparations require their own recorded specification before target use. The analytical circle obstruction covers every $r>0$ and $0<\beta<1$, beyond these numerical releases.

Canonical and amplitude-gradient controls retain their own fixed definitions and existing proof domains. They may be evaluated on identical supplied histories for an input comparison. Their coupled futures are separate cases; no accepted fate theorem is transferred merely by sharing the mirror geometry.

## 1. Selected responses and delayed highest derivative

At a positive-delay partner root $S<T$, put

$$
R=\|\mathbf q(T)+\mathbf q(S)\|=T-S,\qquad
\mathbf n=\frac{\mathbf q(T)+\mathbf q(S)}R,\quad
\mathbf v=-\mathbf q'(S),\quad \mathbf a=-\mathbf q''(S),\quad
D=1-\mathbf n\cdot\mathbf v.
$$

The E kernel and its receiver contribution are

$$
\mathbf E=\frac{(1-\|\mathbf v\|^2)(\mathbf n-\mathbf v)+R[(\mathbf n-\mathbf v)(\mathbf n\cdot\mathbf a)-D\mathbf a]}{R^2D^3},
\qquad
\mathbf M=\mathbf n(\mathbf u\cdot\mathbf E)-(\mathbf u\cdot\mathbf n)\mathbf E,
\quad \mathbf u=\mathbf q'(T).
$$

Opposite polarity gives $\mathbf q''=-K\mathbf E$ or $\mathbf q''=-K(\mathbf E+\mathbf M)$. Both laws therefore sample delayed source acceleration. They are neutral delayed equations in their second-order position formulation: the highest derivative occurs at both reception and emission. The coefficient of $\mathbf a$ in E is

$$
B_E=\frac{(\mathbf n-\mathbf v)\mathbf n^{\mathsf T}-DI}{RD^3}.
$$

It is not a scalar longitudinal coefficient and is not removed when the receiver term is added. The receiver map is $L_{\mathbf u}= (1-\mathbf u\cdot\mathbf n)I+\mathbf n\mathbf u^{\mathsf T}$, so E+M samples $L_{\mathbf u}B_E\mathbf a$. Dotting the acceleration-dependent numerator with $\mathbf n$ gives zero; dotting $\mathbf M$ with $\mathbf u$ also gives zero. These are direct algebraic identities, independent of any standard-physics premise. A stationary source has $\mathbf E=\mathbf n/R^2$. In collinear motion the delayed-acceleration term and M both vanish, but that cancellation does not apply to the planar target.

## 2. Complete census, delays and local continuation

Suppose complete speeds are at most $v_*<1$, and present separation is $d(T)=2\|\mathbf q(T)\|>0$. For a general ordered source/receiver pair, the delay residual is $h(\tau)=\|\mathbf X_i(T)-\mathbf X_j(T-\tau)\|-\tau$. The complete source chord bound makes $h$ strictly decreasing: $h(\tau_2)-h(\tau_1)\le-(1-v_*)(\tau_2-\tau_1)$ for $\tau_2>\tau_1$. At zero it equals $d(T)$ and eventually becomes negative. Consequently there is exactly one partner root, it is ordinary, and

$$
\frac{d(T)}{1+v_*}\le\tau=R\le\frac{d(T)}{1-v_*},\qquad D\ge1-v_*.
$$

The same complete chord bound excludes every positive-delay self root, since $\|\mathbf X_i(T)-\mathbf X_i(T-\tau)\|\le v_*\tau<\tau$. The absence is proved geometrically, not imposed by dropping a channel. The finite upper delay confines needed source values to a compact interval, while the complete older history and speed bound certify that no remote root was missed.

**Local continuation theorem, derived subject.** Locally $C^{2,1}$ complete preparations with a common uniform speed margin, positive endpoint separation and selected-law endpoint compatibility have a unique short $C^{2,1}$ future under either E or E+M. The future depends locally Lipschitz continuously in finite-window $C^2$ norm on histories with common margins and acceleration-Lipschitz bounds. This is a regular-chart theorem, not a global persistence theorem.

The proof repeats the method-of-steps argument of the [accepted amplitude-gradient domain](../../analysis/amplitude-gradient-regular-pair-investigation.md#5-local-coupled-existence-uniqueness-and-seam-propagation), with the changed row checked explicitly. Choose a first step shorter than the positive minimum partner delay and a reception neighborhood with positive range and speed slack. Every sampled source value then belongs to supplied history. Root evaluation is Lipschitz by $D\ge1-v_*$; source acceleration evaluation is Lipschitz because that source history is $C^{2,1}$. E is a rational smooth function of these values with bounded denominators, and E+M adds a polynomial function of the receiver velocity. The first-order reception system is therefore locally Lipschitz in position and velocity; its integral map contracts on a sufficiently short ball. Endpoint compatibility joins old and new accelerations continuously, with local Lipschitz bounds on each side. Restart the same argument at every later time while the margins and finite-history norms remain controlled. A large delayed-acceleration coefficient does not prevent this local construction, because the sampled highest derivative belongs strictly to already determined history. It can matter decisively for long-time amplification and numerical error.

## 3. Compatible near-circular release, with explicit bounds

For fixed $r>0$, $0<\beta<1$, let $\xi$ be the unique solution of $\xi=\beta\cos\xi$ in $(0,\pi/2)$ and let $\tau_0=2r\cos\xi$. On the complete circle the launch partner root is $S_0=-\tau_0$; its delayed source jets are fixed by the circular old tail. Compute the selected law's launch acceleration $\mathbf A_0$ from those jets and the unmodified endpoint $\mathbf q_c(0),\mathbf q_c'(0)$. Put $\Delta\mathbf a=\mathbf A_0-\mathbf q_c''(0)$ and $a_\Delta=\|\Delta\mathbf a\|$.

If $a_\Delta>0$, choose

$$
\delta=\min\left\{\frac{\tau_0}{8},\ \frac{1-\beta}{12a_\Delta},\ \sqrt{\frac{r}{8a_\Delta}}\right\}.
$$

If $a_\Delta=0$, use $\delta=\tau_0/8$ and a zero patch. Define the complete supplied half-history by

$$
\mathbf q_\phi(T)=
\begin{cases}
\mathbf q_c(T),&T\le-\delta,\\
\mathbf q_c(T)+\frac12\Delta\mathbf a\,T^2(1+T/\delta)^3,&-\delta\le T\le0.
\end{cases}
$$

The patch and its first two derivatives vanish at $-\delta$, and its endpoint position and velocity vanish while its endpoint second derivative is $\Delta\mathbf a$. Thus the complete history is $C^{2,1}$ and $\mathbf q_\phi''(0)=\mathbf A_0$. Its displacement is at most $a_\Delta\delta^2/2\le r/16$, and its extra speed is at most $3a_\Delta\delta\le(1-\beta)/4$. Hence

$$
\|\mathbf q_\phi(T)\|\ge\frac{15r}{16},\qquad
\|\mathbf q_\phi'(T)\|\le v_*:=\frac{1+3\beta}{4}<1.
$$

Because $\delta<\tau_0$, the launch root samples the unchanged old circle. The endpoint and sampled jets are unchanged, so $S_0$ still solves the causal equation; the complete strict-speed census makes it the unique root. This proves endpoint compatibility exactly. Throughout the supplied past, $d(T)\ge15r/8$ and $d(T)\le17r/8$, giving the conservative complete bounds

$$
\frac{15r}{8(1+v_*)}\le\tau(T)\le\frac{17r}{8(1-v_*)},\qquad D(T)\ge1-v_*.
$$

These past bounds do not assert that the past solves the equation. Local future bounds follow from the continuation theorem, then require monitoring or proof for every later claimed interval. The circle is an externally supplied old tail, and the patch is a compatible preparation, not an exact circular solution.

E and E+M generally demand different $\Delta\mathbf a$, since the receiver term changes the launch radial acceleration. Therefore their compatible release histories are different even when their endpoint positions and velocities and old tails agree. Evaluating both equations on one identical complete history is the mandatory input ablation. Evolving each equation from its own compatible complete history is a separate coupled comparison, which must retain the patch difference in its interpretation.

## 4. Full antipodal-circle balance and exact exclusion

At a receiver with radial/tangential basis $((1,0),(0,1))$, let $c=\cos\xi$, $s=\sin\xi$ and $D=1+\beta s$. The root and source jets are

$$
R=2rc,\quad\mathbf n=(c,-s),\quad
\mathbf v=(-\beta\sin2\xi,-\beta\cos2\xi),\quad
\mathbf a=\frac{\beta^2}{r}(\cos2\xi,-\sin2\xi),\quad\mathbf u=(0,\beta).
$$

Direct substitution gives the complete E acceleration

$$
A_r^E=-\frac{K N_r}{4r^2c^2D^3},\qquad
A_\theta^E=-\frac{K N_\theta}{4r^2c^2D^3},
$$

where

$$
N_r=c[1+2\beta s-\beta^2\cos2\xi],\qquad
N_\theta=(\beta-s)[1+\beta(\beta+2s)]+2\beta^2sc^2.
$$

For E+M the tangent is unchanged and the radial numerator becomes $DN_r+\beta cN_\theta$, because $M_r=\beta(sE_r+cE_\theta)$ and $M_\theta=0$.

Complete uniform-circle balance requires both $A_\theta=0$ and $A_r=-\beta^2/r$. The latter alone would give the positive radius $r=K N_r/(4\beta^2c^2D^3)$ for E, or $r=K(DN_r+\beta cN_\theta)/(4\beta^2c^2D^3)$ for E+M. Neither radius supplies a solution if the tangent fails.

**Circle exclusion theorem, derived subject.** For every $K>0$, $r>0$ and $0<\beta<1$, neither selected law admits an isolated opposite-polarity uniform antipodal circle on the complete uniformly subfield history domain.

Indeed $\beta-s=(\xi-sc)/c>0$, since $\xi-sc$ is zero at zero and has derivative $2\sin^2\xi>0$. Every term of the displayed $N_\theta$ is then positive. Thus $A_\theta<0$ throughout the interval, and the first balance equation fails. Also $N_r=c[(1-\beta^2)+2\beta s+2\beta^2s^2]>0$, so the radial equation separately permits a positive formal radius; it cannot repair the tangent. At $\beta=0$ the static attraction is nonzero and no separated stationary pair balances. This excludes this circle family, not all persistent binaries, and says nothing about the fate of a released pair. A claimed uniform rotating solution would falsify the theorem only by satisfying the complete E or E+M equation, its causal root equation and both acceleration components on this exact domain.

## Review boundary and next derivation

The circular proof and compatible release are self-reviewed analytical subjects, available for an independently frozen derivation. The sign of the prescribed-circle tangent is not used as a fate proof. A controlled slow-binary statement must account for changing separation, radial motion, delayed source acceleration and propagation of history error. No such all-future conclusion is claimed at this freeze. The immediate decisive target is a coupled slow-scale row with a controlled remainder, followed by either a finite contraction interval ending at a named margin loss or an actual persistent-fate theorem.

## 5. A separately specified slow, high-regularity family

The following analytical family strengthens the history assumptions and is separate from the $C^{2,1}$ numerical launches. Set $R_0=K/(4\epsilon^2)$ with $c_f=1$, and write $\mathbf X_\pm(T)=\pm R_0\mathbf y(s)$, $s=\epsilon T/R_0$. A prime now means differentiation in orbital time $s$. Fix complete scaled speed bound $V\ge2$, complete noncoincidence and sampled recent $C^{5,1}$ history with uniformly bounded derivatives through order six. The sixth derivative may exist only almost everywhere and have bounded jumps; derivatives through order five are continuous. Require compatibility with the selected equation through the fifth position derivative. Fix endpoint $\mathbf y(0)=(1,0)$, $r'(0)=0$ and positive tangential speed $h_0$ specified below. This family is frozen independently of any numerical target or Weber result.

The geometry box is $1/2\le r=\|\mathbf y\|\le2$, recent $\|\mathbf y'\|\le2$, $\epsilon V\le1/8$, and a neighborhood of $h$ near one. The complete past speed bound certifies the one-partner/no-self census; it is not replaced by a recent bound. Let $s_d=s-u$ and

$$
u=\epsilon L,\quad L=\|\mathbf y(s)+\mathbf y(s_d)\|,\quad
\mathbf n=\frac{\mathbf y(s)+\mathbf y(s_d)}L,\quad
\mathbf w=\mathbf y'(s_d),\quad \mathbf b=\mathbf y''(s_d),\quad
D=1+\epsilon\mathbf n\cdot\mathbf w.
$$

The exact E equation in these units is

$$
\mathbf y''=-\frac4{L^2D^3}
\left[(1-\epsilon^2\|\mathbf w\|^2)(\mathbf n+\epsilon\mathbf w)
+\epsilon^2L\{D\mathbf b-(\mathbf n+\epsilon\mathbf w)(\mathbf n\cdot\mathbf b)\}\right].
$$

E+M applies $L_u=(1-\epsilon\mathbf y'(s)\cdot\mathbf n)I+\epsilon\mathbf n\mathbf y'(s)^{\mathsf T}$ to the bracketed E kernel before multiplying by the common negative factor. The acceleration coefficient in E is

$$
B=-\frac{4\epsilon^2}{LD^3}[DI-(\mathbf n+\epsilon\mathbf w)\mathbf n^{\mathsf T}].
$$

The root clock is $s_d'=(1-\epsilon\mathbf n\cdot\mathbf y'(s))/D$. For $\epsilon\le1/16$, the complete and recent speed bounds give $L\ge8/9$, $D\ge7/8$, $|s_d'|\le9/7$, $D\le9/8$, $\|\mathbf n+\epsilon\mathbf w\|\le9/8$ and $\|L_u\|\le5/4$. Therefore every highest delayed derivative coefficient in the $k$th differentiated equation, $0\le k\le4$, has norm at most $64\epsilon^2$: it is $B(s_d')^k$ for E and $L_uB(s_d')^k$ for E+M. Other terms involve derivatives only through order $k+1$. Derivatives of the implicit root use source position derivatives of lower order, so they introduce no hidden second highest derivative at reception.

This gain bound makes the higher-jet estimate triangular. Given bounds through order $k+1$, let $N_k$ be the finite supremum of the remaining terms in the differentiated exact row on the fixed jet/geometry box, and set $M_{k+2}=\max\{M_{k+2}^{\mathrm{past}},2N_k\}$. Choose $64\epsilon^2\le1/2$. On each strictly positive delay step, $\|\mathbf y^{(k+2)}\|\le N_k+\tfrac12\sup_{\mathrm{earlier}}\|\mathbf y^{(k+2)}\|$ preserves $M_{k+2}$. Induction over derivative order and actual delay steps gives a uniform sixth-jet inventory independent of elapsed time within the fixed geometry box. Fifth-order compatibility joins the lower jets through sampled seams. This is the needed neutral-equation control; a speed bound alone does not provide it.

### Nonempty complete preparations with uniform jets

The stronger preparation can be constructed without shrinking a patch to the $O(\epsilon)$ delay. Fix a small orbital interval $[-a,0]$ with $a>0$ independent of $\epsilon$. Use a degree-five vector polynomial with endpoint position/velocity fixed and unknown jets $J_2,\ldots,J_5$. Compute the exact row and its first three reception derivatives at zero from that same polynomial, the unique implicit root and the already specified receiver jets; equate them to $J_2,\ldots,J_5$. The root lies within this polynomial interval for sufficiently small positive $\epsilon$.

This finite compatibility system is smooth in its coefficients and $\epsilon$ near zero. At the auxiliary coefficient endpoint $\epsilon=0$, the root equation is $u=0$, $L=2$ and $D=1$. That endpoint is used only to construct a small-parameter family, not as a selected physical zero-delay hit. The row becomes $A_0(\mathbf y)=-\mathbf y/\|\mathbf y\|^3$. Each compatibility equation then sets one new jet from already fixed lower jets: $J_2=A_0$, $J_3=DA_0\mathbf y'$, $J_4=D^2A_0[\mathbf y',\mathbf y']+DA_0J_2$, and the corresponding differentiated expression for $J_5$. The compatibility Jacobian is block triangular with identity diagonal. The elementary finite-dimensional implicit-function theorem therefore supplies compatible jets near these values for sufficiently small $\epsilon$, with uniform bounds.

Join the polynomial to a complete circular old tail by a fixed smooth cutoff in $[-2a,-a]$. At $\epsilon=0$ the polynomial jets agree with the unit circle through fifth order. Taking $a$ small makes the joined preparation separated and its recent scaled speed strictly below two; continuity preserves these bounds for small $\epsilon$. Its complete circular older tail has finite scaled speed, and the fixed transition supplies a finite common $V$ and sixth-jet inventory. Choosing $\epsilon V\le1/8$ proves the complete strict-speed domain. Thus the class is nonempty. A shrinking endpoint patch with uncontrolled higher derivatives is not used in this theorem.

## 6. Present-source expansion derived from the wake definitions

For a general source $\mathbf z(t)$ at fixed reception position $\mathbf x$, define present range $d=\|\mathbf x-\mathbf z(t)\|$, direction $\mathbf e=(\mathbf x-\mathbf z(t))/d$, velocity $\mathbf v$, acceleration $\mathbf a$ and jerk $\mathbf j=\mathbf z'''(t)$. Use an auxiliary inverse wake-speed parameter $\lambda$ solely to compute the response coefficients. Write $\ell(u)=\|\mathbf x-\mathbf z(t-u)\|$, $u=\lambda\ell(u)$ and $\Psi_\lambda=[\ell(u)(1-\lambda\ell'(u))]^{-1}$. The [fixed amplitude-gradient calculation](../../analysis/amplitude-gradient-controlled-secular-comparison.md#2-controls-and-present-source-expansion) gives

$$
\Psi_\lambda=\frac1d+\frac{\lambda^2}{2}\ell''(0)+\frac{\lambda^3}{6}(\ell^2)'''(0)+O(\lambda^4).
$$

The new vector quantity has, independently by substituting the implicit delay through second order,

$$
\Psi_\lambda\mathbf v(t-u)=\frac{\mathbf v}d-\lambda\mathbf a+O(\lambda^2).
$$

The E definition with restored inverse-speed factors is $-\nabla\Psi_\lambda-\lambda^2\partial_t[\Psi_\lambda\mathbf v(t-u)]$. At fixed $\mathbf x$, $\partial_t(d^{-1})=(\mathbf e\cdot\mathbf v)/d^2$. Combining the scalar gradient with this vector derivative therefore gives the acceleration contribution

$$
\begin{aligned}
\sigma K\mathbf E={}&\frac{\sigma K}{d^2}\mathbf e
+\frac{\sigma K\lambda^2}{2d^2}
\left[(\|\mathbf v\|^2-3(\mathbf e\cdot\mathbf v)^2)\mathbf e
-d\{\mathbf a+\mathbf e(\mathbf e\cdot\mathbf a)\}\right]
+\frac23\sigma K\lambda^3\mathbf j+\mathbf R_4.
\end{aligned}
$$

The scalar gradient supplies $-\sigma K\mathbf j/3$ at cubic order; the vector time derivative supplies $+\sigma K\mathbf j$, leaving $+2\sigma K\mathbf j/3$. This calculation follows the selected wake definitions. It invokes no primitive energy, radiation, mass or standard-physics dynamical law.

The coefficient controls are exact source jets before any coupled use. A stationary source gives only the inverse-square term. An affine source has no linear velocity correction and its quadratic E correction is radial along the present separation. A source with zero present velocity and a transverse quadratic jet has correction $-\sigma K\lambda^2\mathbf a/(2d)$; a source with zero present velocity and acceleration and a transverse cubic jet has correction $+2\sigma K\lambda^3\mathbf j/3$. The latter two follow also by expanding the selected closed-form kernel directly at the unique delayed root. Smooth complete subfield extensions give these prescribed control jets; they are not coupled solutions.

On the fixed separated geometry and sixth-jet box, weighted integral Taylor estimates give $\|\mathbf R_4\|_{W^{2,\infty}}\le C\lambda^4$ in orbital units. Expand source position through cubic order, source velocity through quadratic order multiplied by $\lambda$, and source acceleration through linear order multiplied by $\lambda^2$. Their undifferentiated remainders require at most the fourth source-position derivative. Two further reception derivatives reach at most the sixth. Bounded inverse denominator expansions and the implicit-root margin control their products. This proves the stated remainder without assuming a jerk bound from speed or differentiating the whole sampled-acceleration row four times in the parameter.

## 7. The actual coupled slow rows and corrected angular quantities

Let $\mathbf e=\mathbf y/r$, $p=r'=\mathbf e\cdot\mathbf y'$, $\mathbf v_\perp=\mathbf y'-p\mathbf e$, $q=\|\mathbf v_\perp\|$ and $h=(\mathbf y\times\mathbf y')\cdot\widehat{\mathbf z}>0$, with fixed oriented planar normal $\widehat{\mathbf z}$. This $h$ is a geometric position/velocity quantity, not physical angular momentum. Applying Section 6 to the source $-\mathbf y$ first gives the unreduced E row

$$
\mathbf y''=-\frac{\mathbf e}{r^2}
-\frac{\epsilon^2}{2r^2}
\left[(\|\mathbf y'\|^2-3p^2)\mathbf e+2r\{\mathbf y''+\mathbf e(\mathbf e\cdot\mathbf y'')\}\right]
+\frac83\epsilon^3\mathbf y'''+O_{W^{2,\infty}}(\epsilon^4).
$$

The uniform delayed-jet estimates imply $\mathbf y''=-\mathbf e/r^2+O_{W^{2,\infty}}(\epsilon^2)$ and $\mathbf y'''=-(\mathbf y'-3p\mathbf e)/r^3+O_{W^{1,\infty}}(\epsilon^2)$. Substitution yields the actual coupled E reduction

$$
\mathbf y''=-\frac{\mathbf e}{r^2}
-\frac{\epsilon^2}{2r^2}(q^2-2p^2-4/r)\mathbf e
-\frac83\frac{\epsilon^3}{r^3}(\mathbf y'-3p\mathbf e)+\mathbf Q_E,
\qquad \|\mathbf Q_E\|_{W^{1,\infty}}\le C_Q\epsilon^4.
$$

For the receiver term, the implicit delay expansion gives $\mathbf n=\mathbf e-\epsilon\mathbf v_\perp+\epsilon^2[rP\mathbf y''-q^2\mathbf e/2]+O(\epsilon^3)$, $P=I-\mathbf e\mathbf e^{\mathsf T}$. The E input has no linear term. Hence M contributes $\epsilon^2[p\mathbf v_\perp-q^2\mathbf e]/r^2$ in the coupled acceleration. Its cubic terms cancel exactly even before substituting the leading current acceleration: the transverse acceleration part of the second-order direction and the transverse second-order E input contribute opposite vectors. Thus

$$
\mathbf y''=-\frac{\mathbf e}{r^2}
-\frac{\epsilon^2}{2r^2}(3q^2-2p^2-4/r)\mathbf e
+\frac{\epsilon^2p}{r^2}\mathbf v_\perp
-\frac83\frac{\epsilon^3}{r^3}(\mathbf y'-3p\mathbf e)+\mathbf Q_{E+M},
\qquad \|\mathbf Q_{E+M}\|_{W^{1,\infty}}\le C_Q\epsilon^4.
$$

Both remainders belong to their actual selected-law coupled future and its own complete history. The expansions do not compare two diverged trajectories as though their inputs were identical.

Cross with $\mathbf y$ and put $\gamma=8\epsilon^3/3$. E has $h'=-\gamma h/r^3+O_{W^{1,\infty}}(\epsilon^4)$. E+M has $h'=\epsilon^2ph/r^2-\gamma h/r^3+O_{W^{1,\infty}}(\epsilon^4)$. Define separately

$$
H_E=h,\qquad H_{E+M}=h\exp(\epsilon^2/r).
$$

Each obeys

$$
H'=-\gamma\frac H{r^3}+q_H,\qquad
\|q_H\|_{W^{1,\infty}}\le C_H\epsilon^4.
$$

This removes the reversible quadratic radial modulation from E+M before interpreting cubic evolution. No such modulation occurs for E.

## 8. Finite contraction theorem and exact limitation

The theorem uses the high-regularity family of Section 5 with endpoint speeds

$$
h_{0,E}^2=\frac{1-2\epsilon^2}{1-\epsilon^2/2},\qquad
h_{0,E+M}^2=\frac{1-2\epsilon^2}{1-3\epsilon^2/2}.
$$

These values balance the quadratic radial comparison at $r=1$, $p=0$; they do not assert exact circular balance. Their difference is part of the complete preparation specification. The Section 5 implicit-function construction supplies the actual selected-law terminal jets.

**Finite contraction theorem, derived subject awaiting independent review.** Fix the stated complete history, geometry and derivative inventory. There are constants $c>0$, $C<\infty$ and $\epsilon_0>0$, depending only on that inventory, such that each selected equation with its own compatible preparation has a unique coupled future on $0\le s\le c\epsilon^{-3}$. Throughout that interval it remains separated, uniformly subfield, and on the complete one-partner/no-self ordinary-root chart, and

$$
|r-H^2|\le C\epsilon,\quad
\left|\frac{dH^6}{ds}+16\epsilon^3\right|\le C\epsilon^4,\quad
|H^6(s)-H^6(0)+16\epsilon^3s|\le C\epsilon^4s.
$$

For sufficiently small $\epsilon_0$, the terminal actual radius obeys $r(c\epsilon^{-3})\le1-c$. This proves finite contraction by a fixed fraction under an explicit stronger preparation class. It proves neither capture nor persistent binding nor arrival at coincidence.

### Proof of the radial and hereditary bounds

The E radial equation has central comparison

$$
F_E(H,r)=\frac{H^2}{r^3}-\frac1{r^2}-\frac{\epsilon^2H^2}{2r^4}+\frac{2\epsilon^2}{r^3}.
$$

E+M has

$$
F_{E+M}(H,r)=H^2e^{-2\epsilon^2/r}\left(\frac1{r^3}-\frac{3\epsilon^2}{2r^4}\right)-\frac1{r^2}+\frac{2\epsilon^2}{r^3}.
$$

In either case $r''=F(H,r)+\epsilon^2(r')^2/r^2+2\gamma r'/r^3+q_r$, with $\|q_r\|_{W^{1,\infty}}\le C\epsilon^4$. Let $U_H$ be a mathematical radial comparison scalar defined by $\partial_rU_H=-F$. It is not a physical account of the delayed pair. Near $H=r=1$, it has a smooth strict minimum $\mathcal R(H,\epsilon)$ with uniformly positive curvature. The implicit minimum equations give

$$
\mathcal R_E=H^2+\frac32\epsilon^2+O(\epsilon^4),\qquad
\mathcal R_{E+M}=H^2-\frac32\epsilon^2+O(\epsilon^4).
$$

The chosen $h_0$ makes $\mathcal R(H(0),\epsilon)=1$ exactly in each comparison. Put $w=r-\mathcal R$, $P_r=r'-\mathcal R_HH'$, and $V(H,w)=U_H(\mathcal R+w)-U_H(\mathcal R)$. Uniform curvature implies $V\asymp w^2$ and $|V_H|\le Cw^2$. Define the nonnegative mathematical radial norm $E_r=P_r^2/2+V$.

Differentiating $H'=-\gamma H/r^3+q_H$ gives $H''=-\gamma H'/r^3+3\gamma Hr'/r^4+q_H'$. Subtracting $\mathcal R_HH''+\mathcal R_{HH}(H')^2$ from the radial equation yields $w'=P_r$, $P_r'=-V_w+B_r$. On a provisional neighborhood with $|P_r|\le B_0\epsilon$, the quadratic radial-speed term is bounded by $C\epsilon^3|P_r|+C\epsilon^8$, because $r'-P_r=\mathcal R_HH'=O(\epsilon^3)$. The cubic terms and the differentiated-center terms have the same or smaller bound. Thus

$$
|B_r|\le C_1\epsilon^3|P_r|+C_2\epsilon^4,\qquad
E_r'\le C_3\epsilon^3E_r+C_4\epsilon^4\sqrt{E_r}.
$$

At release $w=0$ and $P_r=O(\epsilon^3)$, so $\sqrt{E_r(0)}=O(\epsilon^3)$. The elementary integrating-factor bound is

$$
\sqrt{E_r(s)}\le e^{C_5\epsilon^3s}
\left[\sqrt{E_r(0)}+C_6\epsilon^4s\right].
$$

Choose a fixed $B_0>0$, then $c>0$ small enough that this bound stays inside half the provisional $B_0\epsilon$ radial-speed/displacement slack and $H$ stays inside its fixed neighborhood. Choose $\epsilon_0$ small enough to absorb the initial $O(\epsilon^3)$ term and the remaining geometry slack. The radius stays separated and recent scaled speed stays below two. Section 5 preserves the sixth-jet bounds independently of elapsed time; the regular local theorem restarts at every attempted first exit. This closes both geometry and hereditary control on the stated interval.

Consequently $r=H^2+O(\epsilon)$, and $6H^5H'=-16\epsilon^3H^6/r^3+O(\epsilon^4)=-16\epsilon^3+O(\epsilon^4)$. Integrating proves the estimates. At the terminal time, $r^3=1-16c+O(\epsilon)$. Taking $c\le1/100$ and the terminal error below $c$ gives $r^3\le1-15c<(1-c)^3$, proving the actual radius decrease. No radius sign alone is used as a persistence argument.

In physical normalized coordinates, the corrected geometric radius $\rho_{\mathrm{slow}}=R_0H^2$ therefore satisfies

$$
\frac{d(\rho_{\mathrm{slow}}^3)}{dT}=-K^2[1+O(\epsilon)],\qquad
\frac{\rho(T)}{\rho_{\mathrm{slow}}(T)}=1+O(\epsilon).
$$

Symbolic restoration gives $-K^2/c_f^3$ for the first rate. Every numerical instantiation retains $c_f=1$. The constant is a geometric drift of the chosen acceleration law, not physical emitted power.

### What can and cannot persist in the slow box

The corrected angular equation gives an additional bounded-domain obstruction. Suppose an actual complete solution remained forever in a fixed separated slow box with $H\ge H_{\min}>0$, $r\le r_{\max}<\infty$ and the same uniform sixth-jet inventory. For sufficiently small $\epsilon$, its remainder satisfies $C_H\epsilon^4\le\gamma H_{\min}/(2r_{\max}^3)$, so $H'\le-\gamma H_{\min}/(2r_{\max}^3)<0$. It must leave that box in finite orbital time. In particular, no nontrivial periodic mirror binary can remain entirely in this class, because its periodic $H$ cannot have strictly negative derivative. This excludes persistence in the stated slow near-circular chart, not all bound binary motion.

The finite contraction proof has no named physical boundary at its terminal time: that endpoint is the proved duration. Extending the same history toward smaller $H$ makes the local propagation ratio $\epsilon/H$ larger. The highest delayed derivative gain scales as $(\epsilon/H)^2$, and the slow expansion loses its small-parameter margin as $H$ approaches $O(\epsilon)$. Coincidence or speed equality has not been shown to occur before, at, or after that loss. A controlled changing-scale theorem or independently verified coupled evolution is required to identify the first actual obstruction. The current exact limitation is loss of the proved slow-history chart, not a selected continuation rule or a stable binding verdict.

## 9. Contraction across changing scales on the same history

This successor strengthens the finite theorem without extrapolating it to zero separation. It keeps the high-compatible complete preparation and the selected E or E+M law fixed. It does not restart from a newly prescribed circle. Its endpoint is a proved smaller angular scale, not a collision, capture or equality event.

### Homogeneous history and error bounds

At a reception time $s_0$, freeze $a=H(s_0)$ solely for estimates and use $\mathbf y(s)=a^2\mathbf Y(\sigma)$, $s=s_0+a^3\sigma$. The exact row becomes the same normalized E or E+M equation with local propagation parameter $\delta=\epsilon/a$. This follows from the scales of position, velocity, acceleration and delay; no coupling is changed. Use the temporary bounds

$$
\frac12<\frac r{H^2}<2,\quad H\|\mathbf y'\|<2,
\qquad H^{3j-2}\|\mathbf y^{(j)}\|\le M_j,quad 2\le j\le6.
$$

Complete older physical speeds and the generated bound $2\epsilon/H$ certify the full root census when $\epsilon/H$ is small. The delay obeys $u\le5\epsilon H^2$, while the corrected angular rate will obey $|H'|\le C\epsilon^3H^{-5}$. Integrating that rate across the actual delay window gives $|H(s_d)/H(s)-1|\le C(\epsilon/H)^4$ on generated positive-time sources. The initial sampled negative-time window lies in the fixed compatible polynomial and has the same bounded source-scale ratio. A factor-two ratio is a safe temporary bound, improved by these estimates. The positive root clock ensures later roots never move backward into an older negative-time segment.

The highest delayed derivative coefficient at order $k$ gains the reception/source weight ratio $(H(s)/H(s_d))^{3(k+2)-2}$. The Section 5 coefficient proof, normalized margins and safe factor-two comparison give the common bound

$$
\|B(s)(s_d')^k\|\left(\frac{H(s)}{H(s_d)}\right)^{3(k+2)-2}
\le C_B\frac{\epsilon^2}{H(s)^2},\qquad C_B=64\,2^{16},\quad 0\le k\le4.
$$

E+M is included in $C_B$. Choose the largest local parameter small enough that $C_B(\epsilon/H)^2\le1/2$. The same triangular derivative induction in the compact normalized geometry box preserves the weighted sixth jets. The finite remainder suprema are uniform in the final angular scale, because source-scale ratios and normalized jets remain in fixed compact sets. Applying the weighted integral Taylor argument in frozen local coordinates gives

$$
\|\mathbf Q\|\le C_Q\epsilon^4H^{-8},\quad
\|\mathbf Q'\|\le C_Q\epsilon^4H^{-11},\quad
|q_H|\le C_H\epsilon^4H^{-6},\quad
|q_H'|\le C_H\epsilon^4H^{-9}.
$$

The corrected angular rate is therefore strictly negative for sufficiently small $\epsilon/H$:

$$
c_0\epsilon^3H^{-5}\le-H'\le c_1\epsilon^3H^{-5}.
$$

Its sign follows from the actual controlled row, not the prescribed-circle tangent. This inequality closes the temporary source-scale comparison. The history remains one actual solution throughout.

### Removing a radial quadratic term before enlarging the interval

An unsigned radial proof must not hide the term $\epsilon^2(r')^2/r^2$. On a shrinking scale it is not uniformly bounded by $\epsilon^3H^{-6}|r'|$. Remove it exactly by a radial coordinate $f_\epsilon$ with derivative

$$
f_\epsilon'(r)=\exp(\epsilon^2/r),\qquad
f_\epsilon''/f_\epsilon'=-\epsilon^2/r^2.
$$

Its additive constant is immaterial. Then $x=f_\epsilon(r)$ obeys $x''=f_\epsilon'F(H,r)+2\gamma x'/r^3+f_\epsilon'q_r$, with no quadratic radial-speed term. In the local normalized box $f_\epsilon'$ and its required scaled derivatives are bounded because $\epsilon^2/r=O((\epsilon/H)^2)$.

Let $x_*(H)=f_\epsilon(\mathcal R(H,\epsilon))$, $z=x-x_*(H)$ and $P_x=x'-x_*'(H)H'$. Define the centered scalar $V(H,z)$ by integrating $-f_\epsilon'(r)F(H,r)$ in the $x$ coordinate from its minimum. It has

$$
E_x=\frac12P_x^2+V(H,z)\asymp P_x^2+H^{-6}z^2,
\qquad |V_H|\le CE_x/H.
$$

These follow by rescaling the local radial integral: it is $H^{-2}$ times a smooth function of $z/H^2$ and $\epsilon/H$, with uniformly positive curvature. The derivative $V_H$ holds the centered $z$ fixed. Also $x_*'=O(H)$ and $x_*''=O(1)$.

Subtract the moving center and use $H''=-\gamma H'/r^3+3\gamma Hr'/r^4+q_H'$. The resulting equations are $z'=P_x$, $P_x'=-V_z+B_x$, with

$$
|B_x|\le C\epsilon^3H^{-6}|P_x|+C\epsilon^4H^{-8}.
$$

The second term includes $x_*'q_H'=O(\epsilon^4H^{-8})$. Contributions of size $\epsilon^6H^{-10}$ are absorbed because $(\epsilon/H)^2$ is small. This estimate remains uniform as $H$ decreases; it uses the coordinate that removed the radial quadratic term.

Put $a=H\sqrt{E_x}$. It measures normalized radial displacement and radial speed: $a\asymp |HP_x|+|z|/H^2$. The centered equations imply the integral inequality

$$
a'\le A_0\epsilon^3H^{-6}a+B_0\epsilon^4H^{-7}.
$$

At zeros interpret it by regularizing the square root and taking the decreasing regularization limit. Set $\zeta=\log(H_0/H)$, where $H_0=H(0)$. The positive angular-rate bound gives $d\zeta/ds\ge c_0\epsilon^3H^{-6}$. Choose fixed constants $A\ge\max\{2,A_0/c_0\}$ and $B\ge B_0/c_0$. Then

$$
\frac{da}{d\zeta}\le Aa+\frac{B\epsilon}{H_0}e^\zeta,
\qquad
a(H)\le\left(\frac{H_0}H\right)^A
\left[a_0+\frac{B\epsilon}{H_0(A-1)}\right].
$$

The specified radial-balance endpoints give $a_0=O(\epsilon^3)$. Thus $a\le C\epsilon(H_0/H)^A$. This is an unsigned bound and does not assign a stability spectrum or a late radial-oscillation growth rate.

### Changing-scale contraction theorem

Fix the compatible family, normalized boxes and finite constants above, and choose

$$
\nu=\frac1{4(A+1)}>0,\qquad H_*=H_0\epsilon^\nu.
$$

**Theorem, derived subject awaiting separate review.** For sufficiently small positive $\epsilon$, each selected equation continues on its original complete history to a finite hitting time $s_*$ with $H(s_*)=H_*$. Throughout it has positive separation, uniformly subfield physical speed, complete one-partner/no-self census and the weighted sixth-jet inventory. It satisfies

$$
\left|\frac r{H^2}-1\right|+|HP_x|\le C\epsilon^{1/2},\quad
\frac{dH^6}{ds}=-16\epsilon^3[1+O(\epsilon^{1/2})],
$$

$$
s_* =\frac{H_0^6-H_*^6}{16\epsilon^3}[1+O(\epsilon^{1/2})],\qquad
r(s_*)=\epsilon^{2\nu}[1+O(\epsilon^{1/2})].
$$

For the proof, the unsigned amplitude bound on $H\ge H_*$ is $a\le C\epsilon^{1-\nu A}$, and $1-\nu A>3/4$. The local parameter obeys $\epsilon/H\le C\epsilon^{1-\nu}$ and also tends to zero. These improve the radial and velocity slacks, the highest delayed derivative gain and the source-scale comparison. The radial minimum contributes only $O((\epsilon/H)^2)$ to $r/H^2$. The original local theorem can restart before any proposed finite first exit, because for each fixed $\epsilon>0$ this entire smaller-scale interval still has a positive separation and delay floor and finite history norms. No actual method step accumulates in finite time there. The negative angular rate reaches $H_*$ in finite time. Finally $6H^5H'=-16\epsilon^3H^6/r^3+O(\epsilon^4/H)$, whose relative error is $O(a+\epsilon/H+(\epsilon/H)^2)$; the closed slacks give the displayed uniform rate and hitting-time estimates.

The terminal radius ratio tends to zero in the slow-parameter limit. For each individual case the theorem ends at a positive radius. In physical coordinates the endpoint is $\rho(T_*)=R_0\epsilon^{2\nu}[1+O(\epsilon^{1/2})]$, and the controlled corrected cubic-radius rate is $d(\rho_{\mathrm{slow}}^3)/dT=-K^2[1+O(\epsilon^{1/2})]$ in $c_f=1$ units. The theorem supplies arbitrarily large contraction factors across a family of very large initial radii; it supplies no contact event at fixed $\epsilon$.

### Signed centered check and the unresolved continuation

The uncentered cubic radial term is $+2\gamma r'/r^3$. In the centered equation, subtracting $\mathcal R_HH''$ contributes $-3\gamma\mathcal R_HH r'/r^4$. At the radial minimum their combined coefficient is

$$
\gamma\left[\frac2{\mathcal R^3}-\frac{3\mathcal R_HH}{\mathcal R^4}\right]
=-\frac{4\gamma}{H^6}[1+O((\epsilon/H)^2)].
$$

This is a derived algebraic check, not a spectrum about the excluded circle. It prevents the uncentered positive coefficient from being used alone to predict growing radial oscillations. Formally retaining only leading small-oscillation cubic terms gives, for $Q=HP_x$ and $Z=z/H^2$, $J=(Q^2+Z^2)/2$ and $J'=\gamma H^{-6}(-5Q^2+2Z^2)$. A fast-phase average would suggest $J\propto H^3$ as $H$ decreases. That average is an inferred diagnostic only: fourth-order forcing, phase error and nonlinear radial terms have not been bounded by a signed action estimate.

The rigorous unsigned estimate $a\le C\epsilon(H_0/H)^A$ loses its small-neighborhood guarantee at sufficiently small $H$ for every fixed $\epsilon$. That loss can precede $H=O(\epsilon)$, where the local propagation parameter itself ceases to be small. Neither is an observed boundary of the actual trajectory. The next decisive theorem is a signed phase/action estimate that preserves a radial neighborhood down to a fixed small local parameter, or an independently checked coupled history that identifies the first actual regular-domain loss. The current bounded fate is contraction across proved scales with an explicit end of proof coverage; persistence, speed equality and singular continuation remain unresolved.

## 10. A signed radial estimate to a fixed local propagation threshold

The unsigned Section 9 estimate locates a proof obstruction, not an observed failure. A bounded oscillatory correction removes that obstruction while the local propagation parameter stays small. This argument controls the indefinite radial norm directly; it does not replace an exact equation by a fast-phase average.

Keep the exact radial coordinate and centered variables of Section 9. Let

$$
J=H^2E_x,\qquad Q=HP_x,\quad Z=z/H^2,\quad
\delta=\epsilon/H,\quad k=\gamma H^{-6},\quad
\kappa=\gamma H^{-3},\quad \gamma=8\epsilon^3/3.
$$

The norm satisfies $J\asymp Q^2+Z^2$, and its square root $a=\sqrt J$ measures the normalized radial departure. The comparison scalar has the homogeneous form $V(H,z)=H^{-2}\widetilde V(\delta,Z)$, where $\widetilde V$ is smooth on the fixed compact neighborhood, with $\widetilde V(\delta,0)=\partial_Z\widetilde V(\delta,0)=0$. At $\delta=0$ it has quadratic part $Z^2/2$. Its departure from this curvature is $O(\delta^2)$; the exact comparison functions depend on $\epsilon$ only through $\delta^2$. Consequently, for small $a$ and $\delta$,

$$
zV_z=2V+O[(a+\delta^2)V],\qquad
V_H=-6V/H+O[(a+\delta^2)V/H].
$$

The second identity holds at fixed centered $z$. It follows by differentiating $H^{-2}\widetilde V(\epsilon/H,z/H^2)$: its numerator is $-2\widetilde V-\delta\widetilde V_\delta-2Z\widetilde V_Z$. Taylor expansion of the smooth normalized scalar makes the error bounded by the indicated multiple of $\widetilde V$. Thus no constant term is concealed at the moving minimum.

The controlled angular law is $H'=-kH[1+O(a+\delta)]$. The centered radial equation has the more precise signed form

$$
P_x'=-V_z-4kP_x
+O[k(a+\delta^2)|P_x|]+O(\epsilon^4H^{-8}).
$$

Its leading coefficient is the exact moving-center check at the end of Section 9. The variations of that coefficient with $r/H^2$, the smooth comparison center and the radial coordinate produce the stated $O(a+\delta^2)$ multiplier. The remaining terms include the row error, $x_*'q_H'$, and $O(\epsilon^6H^{-10})$ center terms; the last are absorbed into $\epsilon^4H^{-8}$ for small $\delta$. This refines the unsigned inequality without modifying the selected law.

Differentiation of $J=H^2(P_x^2/2+V)$ now gives

$$
J'=k[-5Q^2+4H^2V]+\mathcal E_J,\qquad
|\mathcal E_J|\le Ck(a+\delta+\delta^2)J+C\epsilon^4H^{-7}\sqrt J.
$$

The $-5$ coefficient combines the centered $-4kP_x$ with the derivative of the outer factor $H^2$. The $+4$ coefficient combines $V_HH'$ with that same outer-factor derivative. This is a pointwise identity with a controlled error, not an averaged sign claim.

Put $C_x=P_xz/H=QZ$. Its derivative contains the fast conservative difference:

$$
C_x'=H^{-3}[Q^2-2H^2V]+\mathcal E_C,\qquad
|\mathcal E_C|\le CH^{-3}(a+\delta^2)J+CkJ+C\epsilon^4H^{-7}\sqrt J.
$$

This follows directly from $z'=P_x$ and $P_x'=-V_z+B_x$: $C_x'=(P_x^2-zV_z)/H+B_xz/H-(H'/H)C_x$. The first term supplies the displayed difference, the centered damping supplies $O(kJ)$, and the forced part supplies the last bound. Since $\kappa'=O(\kappa k)$, define

$$
\widetilde J=J+\frac72\kappa C_x.
$$

For small $\kappa$ this is a positive norm equivalent to $J$. Its derivative cancels the indefinite quadratic part exactly at leading order:

$$
[-5Q^2+4H^2V]+\frac72[Q^2-2H^2V]
=-3\left(\frac12Q^2+H^2V\right)=-3J.
$$

The accumulated error is pointwise controlled:

$$
\widetilde J'\le-3kJ+Ck(a+\delta+\delta^2+\kappa)J
+C\epsilon^4H^{-7}\sqrt J.
$$

Choose a fixed radial slack $\eta>0$ and a fixed local-parameter ceiling $\delta_0>0$ small enough that the error multiplier inside $a<\eta$, $\delta<\delta_0$ is at most one, the two radial norms are uniformly equivalent, and the highest delayed derivative gain is at most one half. The constant is a finite supremum on the fixed normalized geometry/jet box; no practical numerical value is inferred. With $\widetilde a=\sqrt{\widetilde J}$ and adjusted finite constants, the inequality becomes

$$
\widetilde a'\le-c_a k\widetilde a+C_a k\delta,
\qquad \frac12k\delta\le\delta'\le2k\delta,
$$

where $c_a>0$. The square-root statement uses its regularized integral form at zeros. All bounds apply to the actual delayed history with the weighted sixth jets.

### Forward radial barrier and finite threshold theorem

Choose a fixed $L>2C_a/c_a$, then shrink $\delta_0$ further so $L\delta_0<\eta/2$ and the geometry and derivative-gain slacks hold. The initial norm is $O(\epsilon^3)$ whereas $\delta(0)=\epsilon/H_0$, so $\widetilde a(0)<L\delta(0)$ for sufficiently small $\epsilon$. At any attempted first contact $\widetilde a=L\delta$, its upper derivative is negative by the preceding inequality, while $(L\delta)'$ is positive. Thus the forward barrier

$$
\widetilde a\le L\delta
$$

persists until $\delta=\delta_0$. It preserves the normalized radial and speed slacks rather than assuming them for the remainder of the evolution. The weighted jet induction and actual root-clock/source-scale estimates from Section 9 remain valid throughout this barrier. The finite-clock local theorem therefore continues the same complete prepared history to

$$
H_\dagger=\epsilon/\delta_0.
$$

**Fixed-threshold contraction theorem, derived subject awaiting separate review.** Fix the complete compatible high-regularity preparation and the finite normalized derivative inventory. There is a sufficiently small fixed $\delta_0>0$ such that, for all sufficiently small initial $\epsilon$, each selected equation has a unique coupled evolution to a finite time $s_\dagger$ with $H(s_\dagger)=\epsilon/\delta_0$. It has the full ordinary-root census, positive separation, physical speed uniformly below one, and the weighted sixth-jet bounds throughout. It obeys

$$
\frac r{H^2}=1+O(\delta),\qquad
\frac{dH^6}{ds}=-16\epsilon^3[1+O(\delta)],
$$

$$
s_\dagger=\frac{H_0^6-(\epsilon/\delta_0)^6}{16\epsilon^3}[1+O(\delta_0)],
\qquad
r(s_\dagger)=\frac{\epsilon^2}{\delta_0^2}[1+O(\delta_0)].
$$

The constants are uniform in the initial $\epsilon$ within the prepared class. The radius estimate uses $\mathcal R/H^2=1+O(\delta^2)$ and the radial barrier. The corrected angular rate then supplies the displayed rate; integrating its positive reciprocal magnitude supplies the hitting time. For fixed $\epsilon>0$, the endpoint has a positive delay and separation floor, so no method-step accumulation occurs before it.

In physical normalized coordinates the terminal member radius is

$$
\rho(T_\dagger)=\frac{K}{4\delta_0^2}[1+O(\delta_0)],\qquad
\frac{d(\rho_{\mathrm{slow}}^3)}{dT}=-K^2[1+O(\delta)].
$$

Thus a family beginning at $R_0=K/(4\epsilon^2)$ contracts to a radius bounded independently of that initial size, on one compatible evolving history, while staying well inside the uniformly subfield domain. The fixed $\delta_0$ is a proof-coverage threshold. It is not a contact, root fold or equality event, and no stable binding is established there. The theorem replaces Section 9's unsigned-amplitude proof limitation only in this explicitly small local-parameter class. Actual fate beyond the threshold still requires a new estimate or independently checked coupled history.

The decisive falsifier is a fully compatible solution within the stated normalized boxes and sixth-jet inventory for which the corrected pointwise radial identity or the barrier fails. Merely assigning a growing sign to $+2\gamma r'/r^3$ would not falsify it, because the moving center contributes a larger opposite coefficient. Neither a $C^{2,1}$ preparation outside the high-compatible class nor a numerical finite-speed case outside an established $\delta_0$ is a direct test of this theorem.

## 11. Conditional obstruction at a smooth upward speed crossing

This section investigates a boundary without selecting an outgoing law. The selected Maxwell case is defined on complete uniformly subfield histories. If an incoming path approaches speed one, that class ends. Merely substituting a superfield receiver into a previously partner-only formula would also miss a newly born ordinary self root. The following local geometry states what the displayed per-hit E and E+M expressions would do at a transverse smooth crossing; it does not certify that any measured trajectory reaches that crossing.

Freeze a conditional boundary case with a finite isolated pair, retained positive self coupling $K_{ii}>0$, positive simultaneous partner separation at crossing, regular finite partner-source jets, and no self deletion or event response. Set $c_f=1$, crossing time $T_0=0$, position $\mathbf X(0)=\mathbf X_0$, velocity $\mathbf V(0)=\mathbf e$ with $\|\mathbf e\|=1$, and acceleration $\mathbf A(0)=\mathbf a_0$ with $a_r=\mathbf e\cdot\mathbf a_0>0$. Assume a putative $C^3$ path crosses smoothly, so $\mathbf X(T)=\mathbf X_0+\mathbf eT+\mathbf a_0T^2/2+O(T^3)$. Its complete incoming past has speed strictly below one at every negative time and a uniform gap outside a fixed recent neighborhood. This is a conditional smooth-crossing class, separate from the high-compatible slow family and numerical guard curves.

For reception $T=t>0$, the self causal condition is $\|\mathbf X(t)-\mathbf X(S)\|=t-S$. Writing $S=-ct$ in the local expansion, its residual has leading sign $(a_r/2)(1-c^2)t^2$. Thus a root lies between $S=-2t$ and $S=-t/2$. The incoming strictly subfield chord inequality makes the residual strictly increasing in negative source time, while the remote uniform gap sends it negative in the remote past. There is exactly one negative-time self root. On $0\le S<t$, the local chord average has norm $1+a_r(t+S)/2+O(t^2)>1$, so there is no additional positive-time self root for small $t$. The complete new self census therefore consists of one positive-delay root whose emission lies before crossing.

The root equation then gives $S=-t+O(t^2)$ and the following incoming-source values:

$$
R=t-S=2t+O(t^2),\quad
\mathbf n=\mathbf e+O(t^2),\quad
\mathbf v(S)=\mathbf e-\mathbf a_0t+O(t^2),\quad
\mathbf a(S)=\mathbf a_0+O(t),\quad D=a_rt+O(t^2)>0.
$$

In particular the new hit is ordinary at every fixed $t>0$, although its range and transmitter denominator tend to zero at birth. Its E numerator has leading term

$$
(1-\|\mathbf v\|^2)(\mathbf n-\mathbf v)
=2a_r\mathbf a_0t^2+O(t^3).
$$

The delayed-source-acceleration numerator cancels at this order: $(\mathbf n-\mathbf v)(\mathbf n\cdot\mathbf a)-D\mathbf a=(\mathbf a_0t)a_r-(a_rt)\mathbf a_0+O(t^2)=O(t^2)$, and multiplication by $R$ makes it $O(t^3)$. Since $R^2D^3=4a_r^3t^5[1+O(t)]$, the positive-polarity self contribution is

$$
\mathbf A^E_{\mathrm{self}}(t)
=\frac{K_{ii}\mathbf a_0}{2a_r^2}\,t^{-3}+O(t^{-2}).
$$

For E+M, the receiver velocity is $\mathbf u=\mathbf e+\mathbf a_0t+O(t^2)$, so $1-\mathbf u\cdot\mathbf n=-a_rt+O(t^2)$. The receiver map leaves the leading longitudinal part and removes the transverse leading part:

$$
\mathbf A^{E+M}_{\mathrm{self}}(t)
=\frac{K_{ii}\mathbf e}{2a_r}\,t^{-3}+O(t^{-2}).
$$

Both have longitudinal acceleration $\mathbf e\cdot\mathbf A_{\mathrm{self}}=K_{ii}t^{-3}/(2a_r)+O(t^{-2})$, which is not locally time integrable. To bound the partner rows explicitly, let the simultaneous crossing separation be $d_0>0$. For small $t<d_0/8$ and local receiver speeds at most two, the distance to the partner's crossing endpoint is at least $d_0-2t$. A partner root sampling the incoming source then has $R\ge d_0/4$ by its incoming speed bound at most one, and $S=t-R\le-d_0/8$. No source in $[0,t]$ can bridge the positive partner clearance in its shorter travel time. The time-zero partner root is ordinary, and its positive denominator and complete remote-past margin keep the nearby root in a compact negative-time interval. Source position, velocity and acceleration are bounded there, with a strict denominator floor. Thus both partner rows remain finite and cannot cancel the leading self term.

**Conditional derived obstruction, independent review pending.** A separated $C^3$ path with an upward transverse speed crossing cannot solve the all-root E or E+M ordinary per-hit formula through that crossing while retaining finite acceleration and an integrable finite-velocity evolution. The smooth classical continuation hypothesized to identify the newborn root contradicts its resulting self acceleration. The strict speed domain forbids crossing; the inclusive and unrestricted labels do not supply the missing event or outgoing-history prescription. This theorem diagnoses why a smooth unrestricted partner-only continuation is invalid. It does not exclude every weaker outgoing history, does not choose a boundary response, and does not classify tangential arrival with $a_r=0$ or a simultaneous partner coincidence. An independently certified incoming speed-one event with $a_r>0$ and positive partner separation would connect a particular binary to this obstruction; the retained near-one numerical curves alone do not.

The falsifier is an admissible smooth crossing in this declared case whose complete self census or leading per-hit longitudinal coefficient differs from the displayed result, or a bounded ordinary partner row that cancels the $t^{-3}$ self term despite the stated positive separation and regular jets. Reaching a numerical guard below one does not establish these hypotheses.

## 12. Separate strengthening to continuous-acceleration crossings

This separate subject preserves Section 11's frozen $C^3$ argument and weakens its hypothetical continuation regularity to $C^2$. Keep the same complete past, positive simultaneous partner separation, positive retained self coupling, and transverse crossing $a_r>0$. Continuity of acceleration gives the uniform local Peano expansions

$$
\mathbf X(t)=\mathbf X_0+\mathbf e t+\tfrac12\mathbf a_0t^2+o(t^2),\qquad
\mathbf V(t)=\mathbf e+\mathbf a_0t+o(t),\qquad
\mathbf A(t)=\mathbf a_0+o(1).
$$

For $S=-ct$ with $c$ in a fixed positive compact interval, the chord residual has the same leading term $(a_r/2)(1-c^2)t^2+o(t^2)$. Thus the sign change between $c=1/2$ and $c=2$ persists. The complete root-census argument in Section 11 remains valid because negative-time source speed stays strictly below one, and a positive-time chord is the average of $\mathbf V$ with longitudinal component $1+a_r(t+S)/2+o(t)>1$ uniformly on $0\le S<t$. Consequently its unique self emission satisfies $S=-t+o(t)$.

Averaging the velocity on this actual root interval makes the first-order chord correction $\mathbf a_0(t+S)/2=o(t)$. Normalizing the chord therefore yields

$$
R=2t+o(t),\quad \mathbf n=\mathbf e+o(t),\quad
\mathbf v(S)=\mathbf e-\mathbf a_0t+o(t),\quad
D=a_rt+o(t),\quad \mathbf a(S)=\mathbf a_0+o(1).
$$

These estimates suffice for the decisive cancellation. One has $(1-\|\mathbf v\|^2)(\mathbf n-\mathbf v)=2a_r\mathbf a_0t^2+o(t^2)$, while $(\mathbf n-\mathbf v)(\mathbf n\cdot\mathbf a)-D\mathbf a=o(t)$, and multiplication by $R$ gives $o(t^2)$. Thus the conditional unchanged ordinary per-hit algebra gives

$$
\mathbf A^E_{\mathrm{self}}=
\frac{K_{ii}\mathbf a_0}{2a_r^2}t^{-3}+o(t^{-3}),\qquad
\mathbf A^{E+M}_{\mathrm{self}}=
\frac{K_{ii}\mathbf e}{2a_r}t^{-3}+o(t^{-3}).
$$

The E+M estimate uses $\mathbf u=\mathbf e+\mathbf a_0t+o(t)$ and $1-\mathbf u\cdot\mathbf n=-a_rt+o(t)$, which suppresses the leading E term in that part of the receiver map, while $\mathbf n(\mathbf u\cdot\mathbf E)$ retains the positive longitudinal coefficient. The partner rows stay bounded exactly as in Section 11; only continuous bounded source acceleration on their compact strictly negative sampling interval is needed. The positive longitudinal self term cannot cancel. It contradicts the finite continuous acceleration of the hypothetical $C^2$ path.

**Conditional derived subject, independent review pending.** The unchanged all-root E or E+M ordinary per-hit formula admits no separated classical $C^2$ upward transverse speed-one continuation with the declared complete incoming past and retained positive self coupling. This includes a putative $C^{2,1}$ continuation, and does not require a source jerk or differentiability of acceleration. This is a hypothetical crossing obstruction outside the selected uniformly subfield formulation; it adopts no equality response or superfield future. It excludes neither nondifferentiable event-selected paths nor a tangential arrival with $a_r=0$. The independently certified incoming endpoint, if available, remains a distinct claim whose positive separation and transverse acceleration must be assessed from its own complete history.

A falsifier is a continuous-acceleration transverse crossing satisfying this complete specification whose actual newborn self root does not obey $S=-t+o(t)$ or whose per-hit longitudinal coefficient fails to tend to $K_{ii}/(2a_r)$ after multiplication by $t^3$. No result from the numerical near-one guard enters this derivation.

## 13. Exact response identities for same-history instrumentation

These algebraic controls use the selected response definitions without a slow-speed approximation. For an ordinary hit set $\mathbf b=\mathbf n-\mathbf v$ and $D=1-\mathbf n\cdot\mathbf v>0$. The source-acceleration coefficient and its radial projection are

$$
B_a=\frac{\mathbf b\mathbf n^{\mathsf T}-DI}{RD^3},\qquad
\mathbf n^{\mathsf T}B_a=0,\qquad
B_a\mathbf b=0.
$$

On the transverse plane $\mathbf n\cdot\mathbf a_\perp=0$, $B_a\mathbf a_\perp=-\mathbf a_\perp/(RD^2)$. Thus $B_a$ has rank two and a one-dimensional null direction $\mathbf b$ on the declared subfield chart. The exact radial E component is

$$
\mathbf n\cdot\mathbf E=\frac{1-\|\mathbf v\|^2}{R^2D^2}.
$$

Radial-only checks are therefore insensitive to delayed source acceleration, and a source-acceleration check selected along $\mathbf n-\mathbf v$ would also miss it. A transverse source-acceleration calibration is needed to assess the neutral equation. The collinear cancellation is precisely the acceleration null direction in its own geometry; it does not extend to a generic accelerated planar source.

For fixed receiver velocity $\mathbf u$, the full response map is $L_u=(1-\mathbf u\cdot\mathbf n)I+\mathbf n\mathbf u^{\mathsf T}$. It obeys

$$
L_u\mathbf n=\mathbf n,\qquad
\mathbf u^{\mathsf T}L_u=\mathbf u^{\mathsf T},\qquad
\det L_u=(1-\mathbf u\cdot\mathbf n)^2.
$$

It is invertible while the receiver is strictly subfield. Consequently the rank-two delayed-source-acceleration dependence remains present under E+M; the receiver map does not turn the general equation into an equation without sampled source acceleration. Its contribution also obeys $\mathbf u\cdot\mathbf M=0$ exactly. Therefore on identical complete source histories, identical full root census and identical current receiver state,

$$
\mathbf u\cdot\mathbf A_E=\mathbf u\cdot\mathbf A_{E+M}.
$$

Equivalently the instantaneous derivative of the purely geometric norm $\|\mathbf u\|^2$ agrees for this input comparison. No physical energy account is assumed. Different acceleration directions change the subsequently coupled source histories and receiver states, so this identity does not predict agreement of separately evolved speeds or fates. It is a mandatory-ablation instrumentation control, not evidence for persistence or contraction. The displayed coefficient, null direction, transverse eigenvalue and receiver identities are exact derived controls; a differing implemented identity on its full ordinary input would falsify that implementation or its selected scenario.

## 14. Explicit original-family old-source window at initial speed 0.1

Freeze the original Section 3 complete circular-tail preparations with $K=c_f=1$, $\beta=0.1$, $r=25$, $\omega=0.004$, and each law's own compatible $C^{2,1}$ terminal patch. This is the original leading-radial preparation, not the later radial-balanced family. Its complete supplied speed is at most $0.325$, its separation floor is $46.875$, and its patch width satisfies $\delta\le\tau_0/8\le6.25$. The selected-law futures start at the same $\mathbf q(0)=(25,0,0)$, $\mathbf q'(0)=(0,0.1,0)$; their terminal patches differ because their endpoint accelerations differ. The theorem endpoint is $T_b=35$. It is a proof-window endpoint, not an event or fate statement.

This fixed-speed window is distinct from the independently compared initial-speed-0.3 numerical targets at $T=35$, whose roots sample generated neutral history. No conclusion here reclassifies those targets.

### Bootstrap and shadow-circle root bounds

Stop provisionally at the first receiver speed $0.15$, sampled range $40$, emission $S=-\delta$, or time 35. Initially all three margins hold: the root samples the complete old circle at $S=-\tau_0<-\delta$, the initial speed is $0.1$, and $\tau_0=50\cos\xi>40$ with $\xi=0.1\cos\xi$. Before a provisional stopping event the delayed transmitter has $|\mathbf v|=0.1$, $|\mathbf a|=0.0004$ and $D\ge0.9$. The exact E numerator gives

$$
\|\mathbf E\|\le
\frac{(1+\beta)^2}{R^2(1-\beta)^2}
+\frac{2(1+\beta)\beta^2}{rR(1-\beta)^3}
<0.000964\qquad (R\ge40).
$$

The receiver contribution satisfies $\|\mathbf M\|\le|\mathbf u|\|\mathbf E\|$: in axes parallel/perpendicular to $\mathbf n$, its map annihilates the parallel input and has operator norm $|\mathbf u|$ on the transverse input. Thus both separate selected futures obey the shared conservative acceleration bound

$$
\|\mathbf q''\|\le A_b=0.001109
$$

while the bootstrap holds. The affine reference $\mathbf q_a(T)=(25,0.1T,0)$ then gives $\|\mathbf q-\mathbf q_a\|\le A_bT^2/2$ and $\|\mathbf q'-\mathbf q_a'\|\le A_bT$. In particular speed remains below $0.138815<0.15$ through time 35, and

$$
24.3207375\le\|\mathbf q(T)\|<26.
$$

For the root bound, extend only the old source circle analytically to the reception time, denoting it $\mathbf q_c(T)$. This is a shadow source for evaluating the old-circle root, not an adopted future. The relevant present shadow distance is $d_c=\|\mathbf q(T)+\mathbf q_c(T)\|$, rather than the actual current pair separation $2\|\mathbf q(T)\|$. The exact circle acceleration norm is $0.0004$, so

$$
d_c\ge\|2\mathbf q_a(T)\|-\frac{A_b+0.0004}{2}T^2
\ge50-\frac{0.001509}{2}T^2.
$$

The complete speed-0.1 shadow source has unique root bounds $d_c/1.1\le R\le d_c/0.9$. At time 35 their lower bound is $44.6143068\ldots>40$. It also gives

$$
S\le T-\frac{50-0.001509T^2/2}{1.1}
\le-9.6143068\ldots<-6.25\le-\delta.
$$

Hence neither a range nor emission stopping event can occur. The speed margin, positive separation and finite smooth sampled jets also exclude any other regular-chart stopping event. Continuation closes the bootstrap through time 35. The actual complete past and generated speeds stay at most $0.325$, so the all-root census remains exactly one partner hit per receiver and no positive-delay self hit. The shadow calculation supplies a sharper sampled-source bound inside this already certified complete census; it does not replace the actual full history with an imposed circle future.

### Recorded exact-domain enclosure

**Derived subject, independent review pending.** Both original initial-speed-0.1 laws have a unique coupled future on $[0,35]$ with positive separation, strict complete speed margin, ordinary roots and $C^{2,1}$ history. All sampled delayed source positions, velocities and accelerations on this window belong to the unpatched old circle. Conservative enclosures are

$$
48.641475\le2\|\mathbf q\|<52,\qquad
44.6143<R<57,\qquad D\ge0.9,\qquad
\|\mathbf q'\|\le0.138815,\qquad
\|\mathbf a(S)\|=0.0004.
$$

Let $h=\mathbf q\times\mathbf q'$ denote the scalar planar cross product, with $h(0)=2.5$. Since $|h'|\le26A_b$, the same exact future obeys $1.49081\le h\le3.50919$. Therefore its tangential velocity remains positive, at least $1.49081/26>0.0573$, and at most the speed bound. Its radial velocity has absolute value at most $0.138815$. The unwrapped angle satisfies $\theta'=h/\|\mathbf q\|^2>0$; integration of the displayed bounds yields $0.103<\theta(35)<0.178$ radians. These are enclosure bounds, not precise measured orbital phase or secular contraction rates.

There is no first domain event on the claimed interval. It ends at the chosen time 35 while all geometric margins remain positive; the later old-source-window exit and all nonlinear fate remain unresolved by this theorem. Each full law is a coupled finite-pair evolution, although its finite causal delay makes this initial segment depend only on the prescribed old transmitter jets. Consequently this interval alone cannot validate feedback from newly generated source acceleration. Different-law input comparisons must still retain identical source histories and receiver state; separately evolving E and E+M states are different cases.

A complete compatible speed-0.1 solution with an earlier terminal-patch sample, extra causal root, failed range/denominator margin or a state outside these inequalities falsifies the corresponding exact-window proof. A different initial speed or radius, including the speed-0.3 $T=35$ comparison, is outside this case. No ordinary-root result here decides equality or superfield continuation, and no numerical target is used as a premise.

## 15. First terminal-patch emission entry for the same speed-0.1 case

This successor preserves Section 14's frozen theorem and fixes the same original complete case, with separate E and E+M coupled futures. Its target is the first root emission $S=-\delta$, a named transition from the old circular transmitter to the compatible terminal patch. It is not a dynamical obstruction, a domain boundary, or a capture event. No numerical target or later trajectory is a premise.

First the two patch widths are exactly the same, although their acceleration corrections differ. At launch the shared range exceeds 40 and the source circle has speed 0.1. Section 14's E bound and the sharper launch receiver factor 1.1 give

$$
a_\Delta\le0.000964\times1.1+0.0004=0.0014604.
$$

Both non-geometric width bounds in Section 3 therefore exceed 6.25. Since the tangential residual is nonzero, $a_\Delta>0$ and the minimum selects $\delta=\tau_0/8=(25/4)\cos\xi$ for both laws. With $0<\xi<0.1$,

$$
6.21875<\delta<6.25.
$$

Bootstrap the receiver speed below 0.2, range above 40, old-circle emission before $-\delta$, and time below 46. The exact E bound stays below 0.000964 and the full receiver operator factor is at most 1.2. Thus the common conservative acceleration bound is now $A_c=0.00116$. It gives receiver speed at most $0.15336<0.2$ by time 46, and radius bounds $23.77272\le|\mathbf q|<27$. The old shadow-circle lower distance remains

$$
d_c\ge50-\frac{0.00156}{2}T^2.
$$

Consequently the old sampled range stays above $43.9541>40$ through 46 while the emission remains old. These margins close the provisional speed/range/geometric conditions up to the first entry or time 46. The emission clock is strictly increasing because $S'=(1-\mathbf n\cdot\mathbf q')/D>0$; thus an entry, if present, is the unique first crossing of the patch seam.

An entry by time 38 would give $R=T+\delta\le44.25$, whereas the shadow-circle lower range is at least

$$
\frac{50-0.00156\times38^2/2}{1.1}
=44.4306\ldots,
$$

a contradiction. On the other hand, assume no entry through time 46. At the fixed seam source $S=-\delta$, the causal residual is

$$
g_{-\delta}(46)=|\mathbf q(46)+\mathbf q_c(-\delta)|-(46+\delta).
$$

The affine/acceleration bound and unit circle radius give $|\mathbf q(46)+\mathbf q_c(-\delta)|<27+25=52$, while $46+\delta>52.21875$. Therefore $g_{-\delta}(46)<0$. The old-circle source residual increases strictly with emission time and is zero at its actual root; an actual root before the seam would imply $g_{-\delta}>0$. This contradiction proves first entry before 46.

**Derived subject awaiting independent assessment.** Each selected law has a regular coupled future to a unique first terminal-patch source entry, with

$$
38<T_{\rm patch}<46,\qquad S(T_{\rm patch})=-\delta,
$$

$$
47.54544\le2|\mathbf q(T_{\rm patch})|<54,\quad
44.21875<R(T_{\rm patch})<52.25,\quad
D\ge0.9,\quad |\mathbf q'|\le0.15336.
$$

At entry the sampled source position, velocity and acceleration still match the circle, with $|\mathbf a(S)|=0.0004$; its third derivative may change across the $C^{2,1}$ seam. Complete past speed stays below 0.325, so there remain exactly two directed partner hits and no self hits. The angular variable remains increasing: $h\ge2.5-27A_c46=1.05928>0$, hence tangential velocity exceeds $1.05928/27>0.0392$, while radial speed has absolute value at most 0.15336. The two laws need not have the same entry time or future state. The transition itself causes no loss of the claimed $C^{2,1}$ ordinary-root domain because the sampled acceleration is continuous and locally Lipschitz across the patch seam.

This named first-source-window transition precedes sampling of the generated future at $S=0$. It supplies a concrete next checkpoint for validating history instrumentation, while leaving subsequent neutral feedback and evolved fate to their own cases. A claimed earlier or later first entry for the exact complete preparation, a failed clock monotonicity or the stated shadow-circle residual signs would falsify this theorem; a different preparation or speed is outside its proof domain.

## 16. Piecewise-jet extension for the actual original terminal-patch family

This separate subject asks whether the original $C^{2,1}$ preparations can enter the signed contraction proof. It preserves Sections 5–10 and their stronger preparation class. No numerical launch is silently declared to satisfy a practical smallness threshold. Fix the original complete circle-tail family with initial speed $\epsilon=\beta$, physical radius $R_0=K/(4\epsilon^2)$, $K=c_f=1$ numerically, and each law's own Section 3 patch. In the slow coordinates $\mathbf q=R_0\mathbf y(s)$, $s=\epsilon T/R_0$, with normalized radius $r(s)=|\mathbf y(s)|$, its unpatched circle is $\mathbf y_c(s)=(\cos s,\sin s,0)$, its launch state is $(\mathbf y,\mathbf y')=((1,0),(0,1))$, and the patch correction is exactly the displayed degree-five terminal polynomial. The target is the same fixed-local-parameter contraction endpoint as Section 10, on this original family for sufficiently small $\epsilon$.

### Initial jets and the actual regularity limitation

The exact circular balance coefficients, or their already checked smooth-circle expansion, give the scaled launch mismatch $\Delta\mathbf A=O(\epsilon^2)$ radially and $O(\epsilon^3)$ tangentially. The non-delay width bounds exceed the delay width for sufficiently small $\epsilon$, so its slow width is

$$
d=\epsilon\cos\xi/4,\qquad \xi=\epsilon\cos\xi.
$$

The patch correction's jet of order $j\le5$ is bounded by $C\epsilon^{4-j}$, because it is $\Delta\mathbf A d^2$ times a fixed polynomial in $s/d$. Its sixth derivative is zero inside the patch; the old circle's ordinary sixth derivative is bounded. The actual obstruction to a uniform $C^{5,1}$ inventory is its derivative jumps: third-jet jumps are $O(\epsilon)$, fourth $O(1)$ and fifth $O(\epsilon^{-1})$ at the old-circle seam and the release seam. Position, velocity and acceleration join continuously. The generated right-hand jets at release belong to the smooth selected equation and need not equal the old patch's third through fifth jets. These jumps are not discarded or asserted to vanish by neutral smoothing.

The history is therefore globally $C^{2,1}$, smooth on open pieces, with one-sided jets through order six. Its initial nontrivial seam set consists only of $s=-d$ and $s=0$. Sixth-jet jumps may be bounded conservatively by $C\epsilon^{-2}$ for the jump inventory, although the degree-five old polynomial itself does not have an ordinary sixth derivative of that size. The original launches remain outside Sections 5–10's original $C^{5,1}$ hypothesis.

### Two seam chains and triangular transport

On the uniformly subfield mirror chart, the complete emission clock $s_d(s)$ is strictly increasing. A source seam at $a$ produces a reception seam at the unique $s$ with $s_d(s)=a$, if that value is reached; every coefficient is otherwise smooth. Starting with the two initial seams therefore yields only two forward seam chains. The open delayed-source interval $(s_d(s),s)$ contains at most one seam from each chain: the next seam after an interior $a$ has reception later than $s$, while its preceding seam has source time earlier than $s_d(s)$. At a reception seam both interval endpoints can belong to one chain, so a closed interval is conservatively allowed up to two seams per chain; its endpoints are handled by one-sided traces. The positive delay floor for each fixed case makes both chains locally finite before the Section 10 endpoint. No finite sampled history omits a remote seam or root.

Differentiating the exact scaled response $j-2$ times, $3\le j\le6$, gives a triangular inventory. Its highest source jet $\mathbf y^{(j)}(s_d)$ has coefficient $O(\delta^2)$, the next source jet has coefficient $O(\delta)$, and source jets of order at most $j-2$ have bounded coefficients, where $\delta=\epsilon/H$ in the changing normalization. This follows directly from the response's three source inputs: source position has weight one, source velocity weight $\delta$, and source acceleration weight $\delta^2$. Clock derivatives from the implicit equation have bounded coefficients on the normalized ordinary-root box and do not introduce a source jet of higher order than these. The highest reception jet does not appear on the right; all reception derivatives are lower in this induction. Products involving lower jets have the same or better power count. At the initial patch the potentially large fifth source jet is consequently multiplied by at least $\epsilon$ in the sixth-jet equation, and by $\epsilon^2$ in the fifth-jet equation. The bounded fourth source jet and ordinary sixth source jet cause no blowup. Thus all generated ordinary piecewise jets through six have a finite uniform inventory on the initial regular box.

For jumps, use the frozen-scale weighted norm $H^{3j-2}|[\mathbf y^{(j)}]|$, where brackets denote the right trace minus left trace at a seam. The direct third-jump transport is exactly the delayed-acceleration coefficient times $s_d'$; no lower jump is present because the path is $C^2$. For higher jumps the same triangular response count yields the following normalized induction, with all finite constants uniform on the fixed geometry/jet box:

$$
D_j(s)=\frac{H(s)^{3j-2}|[\mathbf y^{(j)}](s)|}{\delta(s)^{6-j}},
\qquad j=3,4,5,6,
$$

$$
D_j(s)\le C\delta(s)^2\sum_{k=3}^jD_k(s_d)
+C\sum_{k=3}^{j-1}\delta(s)^{j-k}D_k(s).
$$

The source-scale ratio is provisionally confined to the same factor-two box as Section 9; its finite factors are included in $C$. For example the unweighted source-position, velocity and acceleration contributions involving indices $j-2$, $j-1$ and $j$ all acquire the common $\delta^2$ after division by the corresponding $\delta^{6-j}$ jump weight. Lower reception jumps are already known in the ascending induction. At the first generated seam, every initial normalized $D_k$ is at most $C\epsilon^{-2}$ and $\delta=\epsilon[1+O(\epsilon^2)]$, so the source factor cancels that initial growth and gives finite generated $D_j$. Shrinking the fixed $\delta_0$ makes the subsequent source-map multiplier less than one half after the triangular constants are assembled. Taking a supremum over the two locally finite chains then gives

$$
H^{3j-2}|[\mathbf y^{(j)}]|\le C\delta^{6-j},\qquad j=3,4,5,6,
$$

for every generated seam in the changing-scale box. This is a transport bound for persistent derivative jumps, not a claim that the solution becomes globally $C^{5,1}$. The between-seam sixth-jet induction uses the same small delayed highest-derivative gain as Section 9, with the finite initial patch forcing just counted. It supplies a uniform weighted piecewise sixth-jet inventory.

### Broken Taylor formula and response remainder

For a piecewise smooth globally $C^2$ scalar or vector path, Taylor expansion across a finite set of seams includes the explicit jump terms. For a backward interval of length $h$ ending at $s$, the position remainder after degree five is bounded by

$$
\frac{M_6h^6}{6!}
+\sum_{a\in[s-h,s]}\sum_{j=3}^5\frac{|[y^{(j)}](a)|h^j}{j!}.
$$

The velocity and acceleration bounds reduce both the power of $h$ and the factorial index by one and two. These formulas follow by integrating the ordinary piecewise sixth derivative and the derivative jumps, with their actual backward orientation; the bound takes absolute values. One-sided endpoint traces include a seam at the current endpoint when required. In a frozen changing-scale window $h=O(\delta)$, the generated jump bounds make position error $O(\delta^6)$, velocity error $O(\delta^5)$ and acceleration error $O(\delta^4)$. Their source-input weights one, $\delta$ and $\delta^2$ make their contribution to the acceleration response $O(\delta^6)$. Differentiating on the open pieces reduces these estimates by one power, still below the retained fourth-order response bound. At almost every reception there are at most two interior seams in the window; the conservative closed-interval trace bound allows four. Either count is uniform, and all displayed constants allow four, so no unbounded seam count is hidden.

During the initial old-patch sampling layer, the larger initial jumps instead give position/velocity/acceleration errors $O(\epsilon^4)$, $O(\epsilon^3)$ and $O(\epsilon^2)$; the same source weights yield a uniform response error $O(\epsilon^4)$. Its derivative can be $O(\epsilon^3)$, which is the precise initial-layer failure of the old uniform $W^{1,\infty}$ hypothesis. The layer has length at most $4\epsilon$ for sufficiently small $\epsilon$: a short bootstrap gives normalized radius below $3/2$ and complete physical speed below $2\epsilon$, so every scaled delay is below $3\epsilon/(1-2\epsilon)<4\epsilon$. Thereafter every sampled source time is generated. The short-layer derivative contribution is integrable with total size $O(\epsilon^4)$; it must be retained rather than mislabeled a uniform fourth-order derivative bound.

After this layer, the reduced remainder $\mathbf Q=\mathbf y''-\mathbf F_{\rm reduced}(\mathbf y,\mathbf y')$ is continuous because the actual acceleration and reduced smooth position/velocity expression are continuous. Its piecewise derivative has the uniform changing-scale fourth-order bound from the ordinary Taylor terms and the just bounded seams. Therefore $\mathbf Q$ has the required ordinary $W^{1,\infty}$ bound there despite the persistent higher derivative jumps. The analogous corrected angular remainder is also continuous. No distributional acceleration impulse is introduced. This extension claims no uniform global $W^{2,\infty}$ remainder: derivative jumps remain, and the signed radial proof is invoked only through the displayed continuous $W^{1,\infty}$ reduced remainder after the initial layer plus the explicitly integrated earlier defect.

### Initial radial state and contraction consequence

The original leading-radial launch has a centered radial displacement $O(\epsilon^2)$, rather than the specially radial-balanced high-compatible preparation's smaller displacement; its initial centered velocity is $O(\epsilon^3)$. The initial-layer fourth-order response and integrated derivative defect change that inventory only at higher order. At the end of the $O(\epsilon)$ layer the signed radial norm is still $O(\epsilon^2)$, the angular quantity changes by $O(\epsilon^4)$, and $\delta=\epsilon[1+O(\epsilon^2)]$. Thus it lies strictly inside Section 10's forward barrier $\widetilde a\le L\delta$ for sufficiently small $\epsilon$. The weighted piecewise jet, seam and remainder estimates then close the same changing-scale bootstrap and improve the provisional source-scale ratio by the actual corrected angular equation.

**Derived extension subject, independent assessment pending.** There is a sufficiently small fixed $\delta_0>0$ and sufficiently small initial $\epsilon>0$ such that each original complete circle-tail terminal-patch preparation has a unique $C^{2,1}$ coupled evolution to the finite corrected angular threshold $H=\epsilon/\delta_0$. Its complete census remains one ordinary partner hit per receiver and no positive-delay self hit; positive separation, uniformly subfield complete speeds, bounded weighted piecewise jets and the two transported seam chains persist. It obeys the same contraction estimates

$$
\frac r{H^2}=1+O(\delta),\qquad
\frac{dH^6}{ds}=-16\epsilon^3[1+O(\delta)],\qquad
\rho(T_\dagger)=\frac{K}{4\delta_0^2}[1+O(\delta_0)].
$$

The initial $O(\epsilon)$ layer is included in the finite solution and rate inventory; it is not a replacement history. This is one actual original prepared history, with derivative jumps explicitly carried to the endpoint. The threshold remains an existential proof-coverage value rather than a contact, equality or root event. No practical $\epsilon_0$ or $\delta_0$ is supplied, and in particular no recorded speed 0.1, 0.2 or 0.3 trajectory is admitted by assumption. Stable binding and subsequent fate remain unresolved.

The decisive falsifiers are a new uncounted seam chain in the mirror ordinary-root chart, failure of the displayed normalized jump transport, a broken-Taylor contribution larger than the stated weighted power, a nonintegrable initial-layer defect, or a compatible original-family solution violating the signed radial barrier within these inventories. Merely observing a higher derivative jump does not falsify the theorem; such jumps are retained. A generic $C^{2,1}$ history without this complete degree-five patch and seam inventory remains outside the proposed extension.

## Falsifiers and review status of the slow subject

The finite theorem is overturned by an admissible high-regularity compatible history that violates the delayed highest-derivative coefficient bound, the coefficient expansion including the receiver contribution, the $W^{1,\infty}$ remainder, the centered radial inequality or the terminal radius bound. A periodic history satisfying the fixed slow box and uniform jet assumptions would overturn its bounded-domain obstruction. A $C^{2,1}$ numerical launch lacking fifth-order compatibility is outside the secular theorem and cannot serve as its direct verification or falsifier. A numerical radius decrease establishes a measured interval result only. The independently frozen reference must assess these new coefficients and arguments before the coordinator promotes their grade.

## Independent review disposition and scoped validation

The [separately constructed independent reference](maxwell-shaped-overnight-independent-reference.md#4-independently-reconstructed-slow-response) fixed its response coefficients before inspecting the finite subject, its homogeneous weighted estimate before inspecting Section 9, and its pointwise $7/2$ cross correction before inspecting Section 10. Its dated review passages accept the finite contraction, changing-scale contraction and fixed-local-threshold contraction theorems at conditional derived grade on the exact high-compatible preparation and weighted-jet classes. The initial self-review labels above identify the freeze stage; this source-linked disposition records the later assessment. No practical $\epsilon_0$ or $\delta_0$, numerical case membership, contact/equality event or persistent binding is accepted by that review.

The reproducible [symbolic control source](../evidence/maxwell-shaped-overnight-symbolic-controls.py) passed inverse/square-root series controls, then stationary inverse-square and exact affine-collinear row controls, before its general-jet target. Running it with the shared venv verified the direct implicit-root E quadratic/cubic coefficients and the exact cancellation of M's cubic coefficient; the retained output is under `.local-data/master-equation-closure/binary-research/maxwell-shaped-overnight-equation-domain/symbolic-controls.txt`. This is subject algebra verification, not the independent reference or a trajectory certificate.

The scoped command `node .tmp/maxwell-shaped-overnight-equation-domain/check.mjs` passed fenced/math-link, delimiter, display-tag and invalid-TeX controls before rendering this source's mathematical spans and checking local links. It found 445 valid spans and three resolved anchored routes before this disposition paragraph was added. The same command with the collinear and ring source paths validated their 50 and 88 spans and local routes, respectively. `git --no-optional-locks diff --no-index --check /dev/null` on each new Markdown source returned no whitespace diagnostics; its difference exit status is expected for a new file. These are document checks, not mathematical evidence. Frozen subject snapshots and SHA-256 receipts, after the standard `abc` digest control, are retained in this source's matching ignored output owner and dedicated scratch owner. No prior subject, reference, canon or shared integration document is edited by this worker.

The [independent C2 boundary reference](maxwell-shaped-overnight-independent-reference.md#independently-reconstructed-c2-transverse-speed-one-boundary) fixed its Peano/root and response derivation before inspecting the frozen Section 12. Its subsequent review accepts the complete newborn self census, leading longitudinal coefficient and bounded-partner obstruction at conditional derived grade. Thus Sections 11–12 exclude a classical continuous-acceleration transverse outgoing crossing under the unchanged all-root algebra and stated positive clearance; they select no weaker event response. Any particular incoming speed-one event still needs its own compatible-history and interval evidence.

The [independent speed-0.1 first-window reference](maxwell-shaped-overnight-independent-reference.md#independently-bounded-original-beta-01-first-window) fixed its separate shadow-circle and displacement enclosure before reading Section 14, then accepted the sharper affine-shadow range, separation, speed and integrated angular bounds. The [independent first-patch-entry reference](maxwell-shaped-overnight-independent-reference.md#independent-first-entry-into-the-original-beta-01-patch) fixed its wider bootstrap and fixed-seam gap argument before reading Section 15, then accepted the refined interval $38<T_{\rm patch}<46$, shared width and accompanying regular geometry. These are derived exact original-family window/support-transition results, not a neutral-feedback fate theorem or a transfer from another initial speed's numerical comparison.

The [independent original-family piecewise assessment](maxwell-shaped-overnight-independent-reference.md#original-family-piecewise-extension-subject-disposition) fixed its own patch scaling, seam transport and integrated initial-layer inventory before reading the frozen Section 16, then accepted that section at conditional derived grade. Its assessment explicitly preserves the existential thresholds, the four-endpoint conservative seam count, the absence of a global second-derivative remainder estimate and the absence of any admitted measured speed. This disposition supersedes only Section 16's freeze-stage pending label.

## 17. Explicit compact derivative constants and a neutral-gain ceiling

This separately frozen strengthening makes some previous finite suprema computable. It does not identify all smallness gates in the changing-scale radial theorem. The numerical convention remains $K=c_f=1$. Fix an ordinary smooth slow chart with $0<\epsilon\le2^{-40}$, recent scaled velocity norm at most two, $8/9\le L\le32/7$, $7/8\le D\le9/8$, and actual unit $\mathbf n$. The full response uses the same root and source history as E. Bound all supplied past ordinary position jets of orders two through six by

$$
(M_2^{\rm past},M_3^{\rm past},M_4^{\rm past},M_5^{\rm past},M_6^{\rm past})
=(16,256,65536,4294967296,18446744073709551616).
$$

For a $k$th reception derivative, set only the highest source position jet of order $k+2$ to zero, retain every lower source and reception jet in its declared box, and call the resulting lower part $N_k$. The removed term is exactly the affine delayed highest-jet coefficient proved in Section 5. The [directed time/root-jet instrument](../evidence/maxwell-shaped-overnight-jet-majorants.py) composes the retained source jets at the implicit root. Its length-series identity keeps the physical unit-vector relation at its base: if $\Delta\mathbf r$ is the receiver-plus-mirror-source increment, it uses

$$
L(t)=L_0\sqrt{1+2\mathbf n_0\cdot\Delta\mathbf r/L_0+\|\Delta\mathbf r\|^2/L_0^2}.
$$

In this identity the square is the analytic bilinear square for the time series, and $\mathbf n_0$ is an actual unit vector before component enclosure. It is not an unconstrained three-component base whose norm has been replaced by one. At coefficient order $j$, the unknown delay coefficient is obtained from the implicit equation by division by the base $D_0$; all previously determined coefficients are retained. The actual base denominator is also preserved before its interval enclosure.

The separate [integer wrapper](../evidence/maxwell-shaped-overnight-jet-majorants-integer.py) rounds every selected next jet bound upward before computing the subsequent row. It measured the following directed enclosures for both laws on this compact chart:

| Position jet order $j=k+2$ | Integer upper bound for $N_k$ | Preserved receiver bound $M_j$ |
| --- | ---: | ---: |
| 2 | 14 | 28 |
| 3 | 6550 | 13100 |
| 4 | 2558484 | 5116968 |
| 5 | 1203828852 | 4294967296 |
| 6 | 697354379541 | 18446744073709551616 |

The interval component boxes deliberately contain vectors larger than the permitted norm bounds. This makes the lower-part suprema conservative; the physical highest-coefficient proof still uses the actual norm and unit constraints. Since $64\epsilon^2\le64\,2^{-80}<1/2$, the exact triangular estimate $N_k+64\epsilon^2M_j\le M_j$ preserves these bounds by positive-delay steps, provided the declared geometry, velocity and past inventories hold. The table therefore replaces one unspecified fixed-chart jet supremum by explicit constants. It does not certify the compatible preparation's startup inventory or the normalized changing-scale lower-part suprema. In particular the original shrinking patch's ordinary fifth derivative is unbounded as $\epsilon\to0$; Section 16's weighted patch/seam treatment remains necessary for that family.

Independently of this table, the already derived changing-scale highest-source coefficient has bound $64\,2^{16}\delta^2$, where $\delta=\epsilon/H$. Thus the explicit condition

$$
\delta\le2^{-12}=1/4096
\quad\Longrightarrow\quad
64\,2^{16}\delta^2\le1/4
$$

certifies that individual neutral derivative-gain margin on the stated factor-two source-scale chart. It is not an admissible final value of $\delta_0$ unless the radial barrier, remainder, source-scale and startup gates are also met.

### Explicit partial derivatives of the rational response

For independent response inputs $R,D,\mathbf n,\mathbf p,\mathbf b,\mathbf u$, put $\mathbf p=\epsilon\mathbf w$, $\mathbf b=\epsilon^2\mathbf a$ and $\mathbf u=\epsilon\mathbf v$. The mirror scaled response is

$$
\mathbf F_E=-\frac4{R^2D^3}
\big[(1-\mathbf p\cdot\mathbf p)(\mathbf n+\mathbf p)
+R\{D\mathbf b-(\mathbf n+\mathbf p)(\mathbf n\cdot\mathbf b)\}\big],
$$

$$
\mathbf F_{E+M}=(1-\mathbf u\cdot\mathbf n)\mathbf F_E
+\mathbf n(\mathbf u\cdot\mathbf F_E).
$$

On the complex modulus box $1/2\le|R|\le5$, $1/2\le|D|\le3/2$, $|n_i|\le2$, $|p_i|,|u_i|\le1/4$ and $|b_i|\le1$, the [exact Laurent-coefficient instrument](../evidence/maxwell-shaped-overnight-kernel-derivative-majorants.py) measured these integer bounds:

| Law | $K_0$ | $K_1$ | $K_2$ | $K_3$ |
| --- | ---: | ---: | ---: | ---: |
| E | 3714 | 40068 | 496464 | 7026336 |
| E+M | 4710 | 57150 | 784440 | 12032784 |

Here $K_j$ bounds the sum, over all output components and all ordered input derivative indices, of the absolute derivative entries of order $j$. It therefore bounds the corresponding multilinear output norm for input vectors in the component maximum norm. The proof expands each Laurent monomial, takes absolute coefficients, differentiates by multiplying by absolute integer exponents and values positive powers at upper moduli and negative powers at lower moduli. Dropping cancellations only enlarges the bound. No unit-vector identity is needed for this enlarged rational-input box. These are rational-kernel constants; time/root composition and actual source Taylor errors must still be bounded separately.

The jet instrument passed stationary inverse-square, exact affine-collinear root and response derivatives, and highest transverse source-jet controls through sixth order before the compact target. The integer wrapper additionally passed exact positive-third, negative-third and integer-five ceiling controls before its target. The Laurent instrument first failed its known stage because its command-line parser reused the source-velocity symbol name; no target was run at that stage. After changing only that parser variable, it passed the independently known inverse-square derivative sequence $(16,64,384,3072)$, stationary response and transverse acceleration partial $-2$, was separately frozen, and then ran its target. Frozen source copies and directed or exact outputs are retained under `.local-data/master-equation-closure/binary-research/maxwell-shaped-overnight-equation-domain/`; the failed pre-calibration copy remains separate. These are subject calculations with known-case references, pending independent assessment of this new section.

The falsifiers are an exact reception derivative outside the directed lower-part intervals on this declared chart, a missing highest-jet term, or a rational partial exceeding the appropriate Laurent bound within the stated box. Failure of a different speed, initial inventory or source-scale chart is outside this result. The still uncomputed gates for a complete practical contraction threshold are the composed reduced-remainder constants, the signed radial/center transport constants, the complete startup compatibility and original-patch seam constants, and their common margin. This source does not replace those gates with the neutral-gain ceiling.

## 18. A computable smooth-chart angular obstruction

This separate theorem uses a deliberately conservative small parameter and only an undifferentiated response remainder. It supplies an explicit conditional finite chart exit; it does not compute Section 10 or 16's final contraction threshold. Freeze the finite equal-coupling opposite-polarity mirror pair, $K=c_f=1$, with the same scaled coordinates as Section 5. Its complete preparation is separated, uniformly subfield and compatible with the selected equation, its ordinary path is $C^4$ on every sampled source interval and $C^3$ at reception, and its complete scaled speed is at most two. This regularity hypothesis excludes an interval sampling the original $C^{2,1}$ patch seams unless a separate broken-Taylor inventory is supplied. On the prefix under examination require

$$
0<\epsilon\le2^{-128},\qquad
1/2\le r\le2,\qquad |\mathbf v|\le2,\qquad
1/2\le h=\mathbf y\times\mathbf v\le4,
$$

$$
|\mathbf y''|\le28,\qquad |\mathbf y'''|\le13100,\qquad
|\mathbf y^{(4)}|\le5116968
$$

on every current/source interval used below. Cross products here mean the fixed oriented planar scalar; positive $h$ is part of the frozen case. The complete velocity bound gives all positive-delay roots: one partner hit per receiver and no self hit. The scaled delay satisfies $u\le4\epsilon/(1-2\epsilon)<5\epsilon$, and its transmitter denominator is bounded away from zero. Compatible fifth-order preparation plus the Section 17 table can preserve the displayed ordinary jet bounds within its geometry chart when its explicit past inventory is certified. This theorem itself quantifies over compatible histories satisfying the displayed bounds; it does not assert that an arbitrary preparation or a recorded finite-speed case has that inventory.

### An explicit undifferentiated remainder

At a fixed reception freeze its current position, velocity, acceleration and third derivative, and replace its sampled source by the cubic Taylor polynomial

$$
\mathbf P(u)=\mathbf y-\mathbf v u+\mathbf A u^2/2-\mathbf J u^3/6.
$$

Set $\rho=2^{-24}$ and allow a complex propagation parameter $z$ with $|z|\le\rho$. On $|u|\le8\rho$ the displacement from $\mathbf y$ is bounded by

$$
16\rho+896\rho^2+\frac{13100}{6}(8\rho)^3<2^{-18}.
$$

The initial separation $d=2r$ is in $[1,4]$. For the analytic length $L(u)=\sqrt{(\mathbf y+\mathbf P(u))\cdot(\mathbf y+\mathbf P(u))}$, choose the branch with $L(0)=d$. The fractional radicand change is less than $2^{-16}$, so this branch is analytic on the disk, $1/2<|L|<5$ and $|\mathbf n|<2$ in the complex Euclidean component norm. The polynomial source velocity is below three and its acceleration below 29. Thus $|L_u|<6$. The map $u=zL(u)$ maps $|u|\le8\rho$ strictly into $|u|\le5\rho$, with contraction multiplier at most $6\rho<1/2$. Uniform iteration constructs its unique analytic root, including the auxiliary coefficient endpoint $z=0$; that auxiliary zero is not a physical zero-delay hit.

The resulting rational response inputs lie in Section 17's enlarged complex box: $|D-1|\le6\rho<1/2$, source/receiver velocity inputs have component modulus below $1/4$, and $|z^2\mathbf A_s|<1$. Both responses therefore have complex output norm bounded by $K_0\le4710$. Cauchy's coefficient bound and the geometric tail sum show that, for real $0<\epsilon\le\rho/2$, the polynomial-source response differs from its cubic parameter expansion by at most

$$
2K_0\rho^{-4}\epsilon^4<2^{110}\epsilon^4.
$$

Return to the actual smooth source. Its Taylor errors at a real delay $u\le5\epsilon$ are at most $27M_4\epsilon^4$ in position, $(125/6)M_4\epsilon^3$ in velocity and $(25/2)M_4\epsilon^2$ in acceleration, with $M_4=5116968$. Comparing the actual root with the real cubic root uses $|L_u|<6$ and gives root displacement at most $54M_4\epsilon^5$. Composing that displacement into the source jets gives conservative position, scaled-velocity and scaled-acceleration differences of $32M_4\epsilon^4$, $22M_4\epsilon^4$ and $13M_4\epsilon^4$. The normal-vector difference is at most $128M_4\epsilon^4$, while the denominator difference is at most $23M_4\epsilon^4$. The segment between these real input sets stays in the enlarged rational box. Its mean-value response error is therefore at most

$$
K_1\,128M_4\epsilon^4
\le57150\cdot128\cdot5116968\,\epsilon^4
<2^{50}\epsilon^4.
$$

Combining these two errors yields the explicit actual-source bound $|\mathbf R_4|\le2^{111}\epsilon^4$ for the raw cubic expansion. The already independently derived coefficients from Section 6 consequently give, with $p=\mathbf e\cdot\mathbf v$, $\mathbf v_\perp=\mathbf v-p\mathbf e$ and $\gamma=8\epsilon^3/3$,

$$
\mathbf A=-\frac{\mathbf e}{r^2}
-\epsilon^2\left[\frac{(|\mathbf v|^2-3p^2)\mathbf e}{2r^2}
+\frac{\mathbf A+\mathbf e(\mathbf e\cdot\mathbf A)}r\right]
+\gamma\mathbf J+\mathbf R_4
$$

for E; E+M adds $\epsilon^2[p\mathbf v_\perp-|\mathbf v_\perp|^2\mathbf e]/r^2$, with the same bound on its own remainder. Every derivative in this formula is an actual current jet, while its error was computed from the actual delayed source. It uses no source jets inferred solely from speed. The quadratic norm inventory is at most $144\epsilon^2$ for E and $176\epsilon^2$ for E+M. The explicit parameter ceiling therefore gives the common bound

$$
|\mathbf A+\mathbf e/r^2|\le256\epsilon^2.
$$

### Corrected angular identities and bounded exit

Put $a=1+\epsilon^2/r$ and $C=\mathbf y\times\mathbf A$. Crossing the raw E equation with $\mathbf y$ gives exactly

$$
ah'=\gamma C'-\gamma\mathbf v\times\mathbf A
+\mathbf y\times\mathbf R_4.
$$

The raw E+M equation adds $\epsilon^2ph/r^2$ to that right side. Define separate geometric quantities

$$
G_E=h-\gamma C/a,\qquad
G_{E+M}=ah-\gamma C.
$$

Since $a'=-\epsilon^2p/r^2$, their actual derivatives are

$$
G_E'=\frac{-\gamma\mathbf v\times\mathbf A+\mathbf y\times\mathbf R_4}{a}
+\frac{\gamma C a'}{a^2},
$$

$$
G_{E+M}'=-\gamma\mathbf v\times\mathbf A
+\mathbf y\times\mathbf R_4.
$$

These are geometric accounts defined from the selected delayed equations. They import no physical energy or radiation account. The leading scalar is $\mathbf v\times(-\mathbf e/r^2)=h/r^3\ge1/16$. The common negative term is at least $\gamma/32=\epsilon^3/12$, allowing the denominator $a\le2$ for E. Its errors are at most $2^{112}\epsilon^4+2560\epsilon^5$: the acceleration substitution contributes $\gamma\,512\epsilon^2$, and E's extra account term contributes at most $\gamma\,448\epsilon^2$, using $|C|\le56$ and $|a'|\le8\epsilon^2$. Hence the frozen ceiling certifies, for both laws,

$$
G'\le-\epsilon^3/24,\qquad |G|\le6.
$$

**Derived subject awaiting independent assessment.** No complete compatible coupled solution can remain in this exact smooth chart for an interval of slow duration exceeding $288\epsilon^{-3}$. It must first lose at least one stated radius, angular, velocity, source-jet or regularity bound within that time; a periodic solution wholly in this class is excluded because its bounded periodic $G$ cannot have the displayed negative derivative. The all-root ordinary formulation remains valid while the chart is occupied. This is a finite chart-exit obstruction, without a specified exit face or later fate. The conservative value $2^{-128}$ is explicit, but it is not Section 10's contraction threshold, a certificate of an initial preparation or an admission of any retained numerical speed. The original patch family's seam intervals remain governed by Section 16 rather than this smooth Taylor theorem.

The [exact arithmetic companion](../evidence/maxwell-shaped-overnight-explicit-angular-bounds.py) passed a known geometric-series fourth-tail case and exact quartic Taylor cases before testing all displayed numerical margins. During subject self-review its quadratic allowance was enlarged from 144 to 176 to include the full receiver row, then its known cases were rerun and a separate corrected source was frozen before the corresponding target. Both chronology copies remain in the matching ignored owner. That companion checks arithmetic only; the analytic root, Taylor/mean-value proof and geometric account require the separate independent assessment. The theorem's falsifiers are a compatible smooth history within these exact boxes with a larger raw remainder, a failed displayed account identity, or a nonnegative account derivative. An exit from the box is an allowed conclusion, and does not by itself establish capture, contact, stable binding or a speed-one event.

## 19. An explicit nonempty compatible family for the smooth chart

Freeze a separate complete preparation family, $K=c_f=1$, $0<\epsilon\le2^{-192}$ and $a_0=2^{-16}$. The scale is $R_0=1/(4\epsilon^2)$ and $s=\epsilon T/R_0$. The two paths are $\mathbf X_\pm(T)=\pm R_0\mathbf y(s)$ with opposite polarity. They have no self deletion, imposed future constraint or environmental input. The current state is $\mathbf y(0)=(1,0,0)$ and $\mathbf y'(0)=(0,1,0)$. Put $\mathbf c(s)=(\cos s,\sin s,0)$ and let

$$
\mathbf P(s)=(1,0,0)+(0,1,0)s
+\sum_{j=2}^5\mathbf J_js^j/j!,
$$

where all $\mathbf J_j$ are planar. Each selected law determines its own four endpoint jets by its exact compatibility equations below. Define the entire supplied past by

$$
\mathbf y(s)=
\begin{cases}
\mathbf c(s),&s\le-2a_0,\\
\mathbf c(s)+\chi((s+2a_0)/a_0)[\mathbf P(s)-\mathbf c(s)],&-2a_0\le s\le-a_0,\\
\mathbf P(s),&-a_0\le s\le0,
\end{cases}
$$

$$
\chi(z)=462z^6-1980z^7+3465z^8-3080z^9+1386z^{10}-252z^{11}.
$$

The cutoff has $\chi(0)=0$, $\chi(1)=1$, vanishing first through fifth derivatives at both endpoints, and $\chi'(z)=2772z^5(1-z)^5\ge0$ on $[0,1]$. This case fixes the old history before any future use. It is distinct from Section 3's shrinking $C^{2,1}$ patch and from a prescribed circle released without compatibility. Separate E and E+M compatible histories are separate coupled cases; any E ablation still evaluates both input maps on an identical chosen history.

### Quantitative endpoint compatibility

For a formal polynomial receiver and the mirror polynomial source, let $T_k(\epsilon,\mathbf J)$ be the exact scaled response's $k$th reception derivative at zero, including all implicit root dependence, for $k=0,1,2,3$. Solve

$$
\mathbf J_{k+2}=T_k(\epsilon,\mathbf J),\qquad k=0,1,2,3.
$$

The polynomial extends analytically for this auxiliary computation. The actual launch root will lie in the unchanged terminal polynomial interval; the formal extension is never substituted for the complete earlier path. Define the circle jets $\mathbf J^c_2=(-1,0)$, $\mathbf J^c_3=(0,-1)$, $\mathbf J^c_4=(1,0)$ and $\mathbf J^c_5=(0,1)$. At the auxiliary coefficient endpoint $\epsilon=0$, both laws have $N(\mathbf y)=-\mathbf y/|\mathbf y|^3$. Their compatibility derivatives are

$$
T_0=(-1,0),\quad T_1=(0,-1),\quad
T_2=(3,0)+A_0\mathbf J_2,
$$

$$
T_3=(0,9)+B_0\mathbf J_2+A_0\mathbf J_3,
\qquad
A_0=\begin{pmatrix}2&0\\0&-1\end{pmatrix},\quad
B_0=\begin{pmatrix}0&9\\9&0\end{pmatrix}.
$$

These identities follow by differentiating the displayed radial map at $(1,0)$ with endpoint velocity $(0,1)$. Hence $F_0(\mathbf J)=\mathbf J-T(0,\mathbf J)=L_0(\mathbf J-\mathbf J^c)$ is exactly affine, with block-triangular identity diagonal. Its inverse has component-maximum row norm 12: the correction rows are $f_2$, $f_3$, $f_4+A_0f_2$ and $f_5+B_0f_2+A_0f_3$.

For the quantitative complex estimate allow $|t|\le2^{-10}$, $|z|\le\rho=2^{-24}$ and all eight endpoint jet components within $1/4$ of their circle values. Polynomial position increments stay below $1/100$ and its velocity and acceleration norms stay below two and three. On the delay disk $|u|\le8\rho$, the analytic length of $\mathbf P(t)+\mathbf P(t-u)$ therefore has modulus in $(1/2,5)$ and its normal has norm below two. The map $u=zL(t,u)$ has the same strictly interior image and contraction margin as Section 18. It is analytic jointly in time, parameter and endpoint jets. Every response input remains in Section 17's complex box, so its output norm is at most 4710 uniformly on this bidisk and jet polydisk.

Time Cauchy estimates bound the first four derivative outputs by $4710\,k!2^{10k}<2^{45}$ for $0\le k\le3$. Parameter Cauchy estimates then give

$$
|T_k(\epsilon,\mathbf J)-T_k(0,\mathbf J)|<2^{70}\epsilon
$$

for $\epsilon\le\rho/2$. For a real jet box of component radius $1/8$, each jet-component Cauchy disk of radius $1/8$ remains inside the larger $1/4$ polydisk. The eight-input derivative row sum of this difference is bounded by $64\,2^{70}\epsilon$. Consider the preconditioned compatibility map

$$
\Phi_\epsilon(\mathbf J)=\mathbf J^c
+L_0^{-1}[T(\epsilon,\mathbf J)-T(0,\mathbf J)].
$$

Its residual at the circle center is at most $2^{74}\epsilon$ and its Lipschitz multiplier is at most $2^{80}\epsilon$. The explicit ceiling $\epsilon\le2^{-192}$ therefore makes it a strict contraction mapping the closed radius-$1/8$ real box into its interior. It has one fixed point there, and that fixed point satisfies the quantitative endpoint bound

$$
\max_{j,i}|J_{j,i}-J^c_{j,i}|\le2^{75}\epsilon.
$$

This constructs actual compatible endpoint jets through fifth order, rather than only asserting an implicit-function neighborhood. The fixed point specifies the complete source polynomial in the frozen preparation. At launch $u<5\epsilon<a_0$, so its source root samples precisely that polynomial. The compatibility equations computed from the polynomial are consequently the exact equations of the complete supplied past.

### Complete past inventory and the admitted bounded outcome

On the transition interval put $\Delta_J=2^{75}\epsilon$. For $0\le j\le6$, the difference from the circle has the explicit derivative bound

$$
g_j=\frac{(2a_0)^{6-j}}{(6-j)!}
+2\Delta_J\sum_{m=\max(2,j)}^5
\frac{(2a_0)^{m-j}}{(m-j)!}.
$$

An empty sum is zero. The first term is the integral remainder of the fifth-degree circle Taylor polynomial; the second encloses both planar component perturbations. Take $D_0=1$ and $D_k=\sum_{m=k}^{11}|\chi_m|m!/(m-k)!$ for $1\le k\le6$, where the six nonzero $\chi_m$ are the displayed cutoff coefficients. Leibniz's rule gives the complete past ordinary jet bound

$$
|\mathbf y^{(j)}|\le1+\sum_{k=0}^j
\binom jk D_ka_0^{-k}g_{j-k}.
$$

The [exact cutoff/compatibility arithmetic source](../evidence/maxwell-shaped-overnight-explicit-compatible-past.py) fixed the case and bounds before its target, passed the independent Beta derivative/C5-endpoint identities and triangular inverse-row control first, then enclosed these complete past jets by the integers

$$
(|\mathbf y|,|\mathbf y'|,|\mathbf y''|,|\mathbf y'''|,
|\mathbf y^{(4)}|,|\mathbf y^{(5)}|,|\mathbf y^{(6)}|)
\le(2,2,2,2,2,1307,658213251).
$$

The sharper position difference is below $1/4$, giving complete normalized radius in $(3/4,5/4)$ and simultaneous separation above $3/2$. Both terminal and old-circle pieces obey the same or sharper bounds. They are $C^5$ across the fixed cutoff seams, with bounded piecewise sixth derivative, so the complete past is $C^{5,1}$. Its physical speed is below $2\epsilon<1$, its complete delay obeys

$$
\frac{(3/2)R_0}{1+2\epsilon}
<\tau<\frac{(5/2)R_0}{1-2\epsilon},\qquad
D\ge1-2\epsilon,
$$

and its full census is one partner hit per receiver and no positive-delay self hit. The E/full endpoint jets may differ; equality of their states at release is not equality of their later histories.

**Derived subject awaiting independent assessment.** This explicitly specified nonempty family starts strictly inside Section 18's state chart and its supplied past satisfies Section 17's explicit jet inventory. The neutral highest-derivative induction preserves that inventory while the state remains in the chart. Compatible jets and strictly positive delays give continuation at each finite interior state, with no accumulated delay step or unaccounted source seam. Thus its actual coupled future must first reach a state face of the declared radius/angular/velocity chart by slow time $288\epsilon^{-3}$; a jet or regularity failure inside those state margins is excluded by the preserved inventory. This is a computed smallness admission for a separate smooth family, not a replacement of the original short-patch contraction result or an admission of its measured speeds. It supplies neither a specific exit face nor a contact/equality/stable-binding outcome.

The independently assessable falsifiers are an endpoint compatibility map exceeding the bidisk/Cauchy bounds, a failure of its exact affine zero-parameter preconditioner, a complete-past derivative exceeding the Leibniz enclosure, or an actual compatible evolution remaining in the state chart beyond the stated horizon. An arbitrarily chosen endpoint polynomial is outside the family; its jets must be the unique displayed fixed point. The tracked reproducer checks exact arithmetic and elementary identities; it does not replace the independent mathematical assessment of the complex root, contraction, all-root census or continuation argument.

## 20. Explicit lower-part jets with the changing source scale retained

This additional subject closes the distinction left in Section 17 between the fixed and changing lower-jet boxes. Freeze local parameter $\delta\le2^{-40}$, current frozen normalized velocity norm at most two, provisional source-scale ratio between $1/2$ and two, and the same $L,D$ intervals as Section 17. A current jet has norm bound $M_j$; the corresponding source jet in current frozen units has norm bound $2^{3j-2}M_j$. In particular source velocity is allowed to be four, rather than silently replacing it by two. At this tiny local parameter the exact ordinary margins still give $L\in[8/9,32/7]$ and $D\in[7/8,9/8]$, and the previously proved highest weighted coefficient is bounded by $64\,2^{16}\delta^2$.

The separate [changing-scale integer instrument](../evidence/maxwell-shaped-overnight-changing-jet-majorants.py) imports the frozen root/time-jet algebra and upward-rounding wrapper unchanged. It expands each lower source jet by its explicit power of two, omits only the affine highest source jet, and rounds the next current bound before using it at the following order. It passed the original stationary/affine/highest-source controls, exact second/sixth source weight controls, the one-quarter highest-gain case and upward ceiling before its target. Its directed target gives:

| Position jet order | Source weight | Lower-part integer upper $N_k$ | Preserved current weighted bound $M_j$ |
| --- | ---: | ---: | ---: |
| 2 | 16 | 14 | 28 |
| 3 | 128 | 9825 | 19650 |
| 4 | 1024 | 6329704 | 12659408 |
| 5 | 8192 | 9040179265 | 18080358530 |
| 6 | 65536 | 35091844625745 | 18446744073709551616 |

The supplied weighted past bounds are $(16,256,65536,2^{32},2^{64})$, exactly as declared before this target. Because $64\,2^{16}2^{-80}<1/2$, the ascending derivative/positive-delay induction preserves the displayed enlarged current inventory on the provisional normalized geometry/source-scale box. Thus both its highest coefficient and its lower-part derivative constants are computable. This is conditional derived subject algebra pending independent assessment, with the interval arithmetic measured by the named instrument. It does not prove the provisional scale ratio, the signed radial inequality, a practical final $\delta_0$ or an original-patch startup bound. Those remain separate obligations in the contraction theorem. An exact lower term outside the directed intervals or a missing scale factor falsifies this subject; leaving the provisional box is outside its conclusion. Frozen instrument/output receipts are retained in the matching ignored binary owner, preserving the earlier fixed-chart instruments and targets.

## 21. First generated-source entry for the exact original speed-0.1 case

Freeze exactly Sections 14–15's complete original histories: opposite-polarity mirror pair, $K=c_f=1$, $r=25$, $\beta=0.1$, $\omega=0.004$, original leading-radial launch and each selected law's own compatible Section 3 terminal patch. The endpoint state is $(\mathbf q,\mathbf q')=((25,0),(0,0.1))$. The event under examination is the first partner emission $S=0$; no generated-source acceleration is sampled before it. This successor preserves the independently accepted $38<T_{\rm patch}<46$ entry at $S=-\delta$. It does not inspect or use any retained target trajectory as a premise.

### Sharp complete patch bounds

The shared width remains $\delta=\tau_0/8\le6.25$, and the existing complete circle-input bound gives $|\Delta\mathbf a|\le0.0014604$. Write the patch correction as $\Delta\mathbf a\,\delta^2f(z)$, $z=T/\delta$, with $f(z)=z^2(z+1)^3/2$. On $-1\le z\le0$ it obeys

$$
0\le f\le54/3125,\qquad |f'|\le1/4,\qquad |f''|\le1.
$$

For completeness put $w=z+1$. Then $f=w^3(1-w)^2/2$ has its sole interior nonzero maximum at $w=3/5$. The degree-four Bernstein coefficients of $f'$ are $(0,0,1/4,-1/4,0)$, which prove the derivative bound by convexity. Also $f''=3w-12w^2+10w^3$. Its upper bound follows from $1-f''=(1-w)(10w^2-2w+1)\ge0$. The degree-five Bernstein coefficients of $1+f''$ are $(1,8/5,1,1/5,1/5,2)$, all positive, proving $f''\ge-1$. These bounds retain the complete patch rather than dropping its accelerated-source contribution.

They yield complete supplied source speed at most $0.102281875<0.103$, patch displacement at most $0.00098577<0.0011$ and source acceleration at most $0.0018604$. The complete old circle has still smaller speed and acceleration. Until $S=0$ the source denominator is therefore $D\ge0.897$, and the exact E bound is

$$
|E|\le\frac{1.103^2}{R^2\,0.897^2}
+\frac{2(1.103)(0.0018604)}{R\,0.897^3}.
$$

For $R\ge40$ and receiver speed below 0.2, the receiver contribution gives the common E/full bound $|\mathbf q''|\le A_g=0.00131$. Here the exact actual-unit receiver estimate is $\|L_{\mathbf u}\|\le1+|\mathbf u|<1.2$, using Section 14's $\|\mathbf M\|\le|\mathbf u|\|\mathbf E\|$; an enlarged bound $1+2|\mathbf u|$ is not substituted. The source acceleration term is explicitly included. These same complete source histories may be used in the mandatory E/full input comparison, but the separate coupled futures below use each law's own frozen compatible patch.

### Continuation and event enclosure

Stop provisionally at receiver speed 0.2, sampled range 40, receiver radius 28, source emission zero, or time 54. Until that stop the affine reference $\mathbf q_a=(25,0.1T)$ gives

$$
|\mathbf q-\mathbf q_a|\le A_gT^2/2,\qquad
|\mathbf q'-\mathbf q_a'|\le A_gT.
$$

Thus speed is at most $0.17074<0.2$ through 54, receiver radius is below 28 and receiver $x$ coordinate exceeds $23.09002$. Every supplied source radius is below $25.0011$, so sampled range is below $53.0011<54$, and $S=T-R>-54$. While $S\le0$, the old-circle phase has absolute value at most $0.216<1/4$; its $x$ coordinate is at least $25(1-(1/4)^2/2)=24.21875$. The complete patch can lower that coordinate by less than $0.0011$. Consequently sampled range exceeds $23.09002+24.21875-0.0011=47.30767>40$. All provisional state margins improve. Complete generated speeds remain below 0.2, so the full root census is still exactly one directed partner hit per receiver, zero self hits and ordinary denominator. The sampled $C^{2,1}$ acceleration and its finite Lipschitz bounds give regular coupled continuation up to the source event.

Evaluate the fixed source endpoint gap

$$
g_0(T)=|\mathbf q(T)+\mathbf q_\phi(0)|-T
=|\mathbf q(T)+(25,0)|-T.
$$

Its derivative is at most $|\mathbf q'|-1<-0.8$, so it decreases strictly. At time 48, if the source event has not yet occurred,

$$
g_0(48)\ge50-A_g48^2/2-48=0.49088>0.
$$

More explicitly, the same lower function $50-A_gT^2/2-T$ decreases on $0\le T\le48$ and is positive throughout. At any proposed earlier first event its still valid source-old prefix would therefore give $g_0>0$, contradicting $S=0$. Thus an event before 48 is excluded without evaluating the future after an assumed event.

At time 53, assuming no earlier event, the concavity bound $\sqrt{2500+0.01T^2}\le50+0.0001T^2$ gives

$$
g_0(53)\le50+0.0001(53)^2+A_g53^2/2-53
=-0.879205<0.
$$

The root residual at the fixed source time is strictly decreasing in source time within the ordinary domain. The sign change of this endpoint gap therefore encloses the unique first $S=0$ event and contradicts an assumed source-old prefix through 53. Its root clock satisfies $S'=(1-\mathbf n\cdot\mathbf u)/D>0$ throughout the prefix. Both actual selected futures consequently have

$$
48<T_{\rm gen}<53,\qquad S(T_{\rm gen})=0.
$$

At that event the range equals the delay and equals $T_{\rm gen}$. Receiver speed is at most $0.16943$, simultaneous separation is in $[46.32021,54.80339]$, and the sampled source denominator is in $[0.9,1.1]$ because the endpoint source velocity is exactly $(0,-0.1)$. Its sampled source acceleration is each law's compatible launch acceleration, with common bound $0.0010604$. The history is $C^{2,1}$ across release; its third derivative may jump and is not discarded.

The angular inventory also remains regular. Since $|h'|\le28A_g=0.03668$, at this event $h=\mathbf q\times\mathbf q'$ is at least $0.55596>0$, tangential speed exceeds $0.0198$ and radial speed has absolute value at most $0.16943$. On the whole prefix radius is above 23 and below 28. Integrating the time-dependent angular bounds, rather than taking endpoint extrema, yields $0.099<\theta(T_{\rm gen})<0.348$ radians relative to the launch angle. The two laws can have different event times and angles; no equality of their separately coupled inputs is inferred.

**Derived subject awaiting independent assessment.** This is a first regular support transition on the exact original speed-0.1 complete preparation. It is not a contact, speed-one, denominator, root-count or formulation event, and it is not a fate theorem. It marks the first subsequent neutral-feedback interval whose sampled source acceleration is generated by the coupled equation. At its left endpoint acceleration compatibility supplies continuity; further evolution still requires its own proof or independently checked history/root method. An $S=0$ event outside the displayed interval for this exact preparation, a failed complete-past polynomial bound or the stated endpoint-gap signs would falsify this theorem. A different speed or preparation is outside its proof domain.

The [first-generated-source arithmetic source](../evidence/maxwell-shaped-overnight-first-generated-source-controls.py) passed known quadratic/constant/linear Bernstein conversion cases before its target. It then verified the displayed patch polynomial identities, acceleration, displacement, gap and integrated angular margins exactly with rational arithmetic. The target is this frozen source-old analytic case, not a retained trajectory. Its frozen script and outputs are retained in the matching ignored binary owner. A later clarification makes the positive lower gap valid for every $T\le48$, so the lower event exclusion does not evaluate a future after a hypothetically earlier event; the initial and clarified subject freezes are both retained. The independent worker inadvertently read this section during its broader preceding-section review before constructing a separate support-entry reference. Any assessment from that read is therefore unblinded adversarial review and does not count as a separately frozen reference. Section 21 remains pending until an independent route is recorded; the already independent Sections 14–15 assessments are unaffected.

### Independent disposition of the explicit-chart subjects

The [separate compact/account/compatible-family assessment](maxwell-shaped-overnight-independent-reference.md#scale-correction-and-explicit-smooth-chart-assessment) fixed the independent compact rational, raw account and quantitative endpoint constructions before reading Sections 17–19, then accepted their exact bounded conclusions. It preserved and corrected an auxiliary factor-four error in its own generic normalized-root paragraph by the direct scale identity; the selected subject root $u=\epsilon L$ and earlier physical root/evolution references were correct throughout. Agreement after that correction is not treated as evidence for the normalization: the direct scale identity and earlier independent ordinary-root theorem supply that reference. The assessment accepts the explicit jet/kernel constants, Section 18's smooth-chart finite exit and Section 19's nonempty high-compatible complete family at conditional derived grade. The [separate changing-table assessment](maxwell-shaped-overnight-independent-reference.md#changing-scale-lower-jet-table-assessment) accepts Section 20 against its already fixed homogeneous weights and triangular root reference, with the provisional factor-two chart and all unresolved radial/startup/remainder gates retained. The pending labels inside those sections identify their subject-freeze stages; this disposition records their later independent acceptance. Section 21 is not included in that acceptance.

## 22. A bounded actual generated-source feedback window through time 75

Freeze the identical original speed-0.1 complete cases of Section 14, with original leading-radial state, equal fixed $K=c_f=1$, mirror planar geometry and each law's compatible complete terminal patch. This subject's endpoint is $T_f=75$. It uses Section 14's already independently checked actual coupled prefix through source time 35; it does not use the pending Section 21 theorem as a premise. Nor does it replace that generated source prefix with a prescribed circle. Once a root samples $S>0$, it samples that same law's actual coupled source trajectory and acceleration.

There are two distinct supplied/generated source rows, which must retain their paired bounds. For $S\le0$, the explicit complete old-patch identities give source speed below $0.103$, source acceleration at most $0.0018604$, radius below $25.0011$ and displacement from the old circle below $0.0011$. For $0\le S\le35$, Section 14 gives actual generated source speed at most $0.138815<0.14$, acceleration at most $0.001109$, radius below 26 and $x$ coordinate at least $24.3207375$. Combining the larger speed from one row with the larger acceleration from the other would unnecessarily enlarge the estimate; that mixed row is not used.

Bootstrap receiver speed below $0.25$, range above 40, receiver radius below 31, source time below 35, and time at most 75. The exact E bound for each of the two rows is

$$
|E|\le\frac{(1+v_s)^2}{R^2(1-v_s)^2}
+\frac{2(1+v_s)a_s}{R(1-v_s)^3}.
$$

With $\|L_{\mathbf u}\|\le1+|\mathbf u|<1.25$, both paired rows give the common bound $|\mathbf q''|\le A_f=0.0015$. The affine receiver enclosure therefore gives

$$
|\mathbf q'|\le0.2125<0.25,\quad
q_x\ge20.78125,\quad
20.78125\le|\mathbf q|\le30.34375<31
$$

through 75. All possible sampled source radii are below 26, so $R<57$ and $S=T-R>-57$. For negative $S$, the old-circle phase has absolute value below $0.228<1/4$, giving supplied source $x>24.21765$, including the complete patch correction. The generated row's $x$ bound is larger. Thus every sampled source has this same conservative positive coordinate floor, and

$$
R>20.78125+24.21765=44.9989>40,\qquad
S\le T-R<30.0011<35.
$$

These improve all bootstrap margins. Both supplied and generated complete speeds remain strictly below $0.25$, giving the entire one-partner/no-self ordinary root census. Every sampled source acceleration lies in the supplied patch or the already certified generated prefix through 35. Those source accelerations are locally Lipschitz on compact pieces and join continuously at release. Source-root evaluation has a uniform ordinary margin. Positive-delay local continuation therefore closes the same actual coupled future through 75, including its propagated derivative seams. This is one additional history-feedback layer in a method-of-steps proof, not a prescribed transmitter evolution.

At the endpoint, source radius below 26 and receiver radius at most $30.34375$ give the sharper range upper $56.34375$. Consequently

$$
18.65625<S(75)<30.0011,\qquad
44.9989<R(75)<56.34375.
$$

The sampled source is therefore definitely generated, and its delayed acceleration is bounded by $0.001109$. Its transmitter denominator satisfies $0.861185\le D\le1.138815$. Simultaneous separation is in $[41.5625,60.6875]$, and radial speed has absolute value at most $0.2125$. From the accepted initial-window bound $|h'|\le26(0.001109)$ until 35 and $|h'|\le31(0.0015)$ afterward, the current angular quantity at 75 is enclosed by

$$
-0.36919\le h(75)\le5.36919.
$$

Hence tangential velocity lies in $[-0.0178,0.2125]$, with the upper bound also using the actual speed enclosure. Angular position exists throughout because separation stays positive. The pointwise bound $|\theta'|\le0.2125/20.78125<0.0103$, together with the independently accepted $0.103<\theta(35)<0.178$, gives $-0.309<\theta(75)<0.590$. These coarse bounds do not certify positive tangential velocity or monotone angular advance over the whole later interval; that is an explicit unresolved decision, not a claimed angular reversal.

The delayed acceleration coefficient itself remains small on this prefix. In a frame with first axis $\mathbf n$, the exact coefficient $B_E$ has norm $|\mathbf n-\mathbf v_s|/(RD^3)$. Therefore on either paired source row its complete norm, including the receiver map for full, is bounded by

$$
\|L_{\mathbf u}B_E\|\le
\frac{1.25(1.14)}{40(0.86)^3}<0.057.
$$

For E omit the receiver multiplier. This is an undifferentiated delayed-source acceleration gain bound, not a stability or error-tube certificate. It retains every sampled source-acceleration channel.

**Derived subject awaiting independent assessment.** Each exact original prepared binary has a regular ordinary-root coupled evolution through time 75, with a definitely generated source interval at that endpoint and the explicit separation, velocity, angle, root, denominator and delayed-acceleration bounds above. No domain event is proved on this prefix, and its chosen endpoint occurs with positive margins. The theorem proves neither capture nor stable binding nor later fate. A compatible exact solution violating an improved bootstrap bound before 75, sampling an unproved source time above 35, acquiring an extra root or failing the stated complete census would falsify it. Numerical radius decrease alone is neither a verification of this exact prefix nor a fate result.

The [generated-feedback arithmetic companion](../evidence/maxwell-shaped-overnight-generated-feedback-controls.py) passed stationary inverse-square and transverse-source-acceleration coefficient controls and exact affine displacement arithmetic before its target. It then verified both paired source rows and all displayed rational margins. It reads no retained trajectory and supplies no measured history tube. The complete case and theorem were frozen before its target; script/output freezes remain in the matching ignored binary owner. Its correctness checks are scoped arithmetic evidence, with the mathematical continuation and generated-history interpretation awaiting the separately fixed reference.

## 23. Generation refinement needed for the original-patch first-derivative remainder

This focused successor preserves Section 16's original complete preparation and its earlier frozen assessment. It makes explicit a distinction required by the post-initial-layer $W^{1,\infty}$ claim. The generic generated-seam inventory $H^{3j-2}|[\mathbf y^{(j)}]|\le C\delta^{6-j}$ is sufficient for the undifferentiated broken-Taylor error. By itself it is insufficient to bound the derivative of the reduced remainder: since $\mathbf Q=\mathbf y''-\mathbf F_{\rm reduced}(\mathbf y,\mathbf y')$ and the reduced expression has continuous derivative on a $C^2$ path, $[\mathbf Q']=[\mathbf y''']$. A generic current third-jet jump of order $\delta^3$ cannot coexist with a uniform fourth-order bound for both traces of $\mathbf Q'$. The previously accepted wording must therefore be read with the generation distinction proved here, not with that generic jump bound alone.

Call $-d$ and zero generation-zero source seams. Their first receptions are generation one, and successive reception under the strictly increasing source clock increments the generation. During the initial short bootstrap every delay is less than $4\epsilon$, so both generation-one receptions occur before $s=4\epsilon$. At and after $4\epsilon$, the source clock is positive and no reception can sample a generation-zero seam. Thus every current seam after that layer has generation at least two. The locally finite two-chain census from Section 16 is unchanged.

For the normalized seam variables already defined there,

$$
D_j=H^{3j-2}|[\mathbf y^{(j)}]|/\delta^{6-j},
$$

all generation-one source values have a common finite bound $D_j\le C_1$. The triangular jump equation for a generation-two or later current reception has no generation-zero source on its right. Its source part is at most $C\delta^2\sum_{k\le j}D_k(s_d)$, and its lower-current part is at most $C\sum_{k<j}\delta^{j-k}D_k(s)$. Taking the already bounded source-chain supremum, then ascending in $j$, gives $D_j(s)\le C_2\delta(s)^2$ at every generation-two or later seam. The factor-two source-scale comparison is retained in the constants, so no unproved monotonicity of $\delta$ is required in this induction. Shrinking the same existential local ceiling preserves the finite source-chain supremum as before. Consequently after the initial layer the stronger **current reception** jump inventory is

$$
H^{3j-2}|[\mathbf y^{(j)}]|\le C\delta^{8-j},
\qquad j=3,4,5,6.
$$

In particular current third-jet jumps are fifth order, while a source sampled during this later interval may still be a generation-one seam with the weaker third-jet bound of order $\delta^3$. These two statements are compatible. Across an interior source generation-one seam, broken Taylor gives position, velocity and acceleration errors of orders $\delta^6$, $\delta^5$ and $\delta^4$; their response input weights make a sixth-order value error and a fifth-order first-derivative error. A reception at such a source seam is generation two, and its exact acceleration derivative jump is itself fifth order by the displayed refinement. Current-endpoint trace terms use the stronger current inventory. No current third-jet jump of order $\delta^3$ survives outside the initial layer.

On open pieces the existing ordinary weighted sixth-jet Taylor bounds still supply the fourth-order first-derivative remainder. The interior source-seam terms and the refined current traces are of higher order. The continuous reduced remainder therefore has an ordinary $W^{1,\infty}$ fourth-order bound after the initial layer; its derivative jumps are fifth order and remain explicitly present. Initial-layer derivative pulses retain their third-order amplitude and fourth-order integrated contribution. A global second-derivative remainder claim still does not follow and is not made.

**Derived refinement subject, independent assessment pending.** This lemma closes the explicit generation step needed for Section 16's signed contraction argument. It does not change the prepared history, the eventual threshold, the generic $C^{2,1}$ exclusion or any numerical case admission. Earlier subject/reference snapshots are preserved. Its falsifiers are a generation-one reception after the stated short layer, a third-jet reception jump outside the stronger bound despite no generation-zero source, or an additional current trace term invalidating the derivative remainder. Until this focused refinement is independently assessed, the earlier broad post-layer remainder wording should not be treated as justified by the weaker generic jump inventory alone.

### A strict first-generation cutoff without the post-layer remainder premise

The short layer can be closed directly from the exact response and continuous acceleration, without assuming the remainder conclusion under review. Use $0<\epsilon<1/64$ for this initial-layer estimate only. In slow units the circle acceleration is one. On the provisional radius box $1/2<r<3/2$ and complete scaled speed below two, $L\ge1/(1+2\epsilon)$ and $D\ge1-2\epsilon$. The full velocity-dependent part has norm at most

$$
N_0\le4\frac{(1+2\epsilon)^5}{(1-2\epsilon)^2}<8.
$$

The exact sampled-acceleration coefficient, including full's receiver map, has norm at most

$$
4\epsilon^2\frac{(1+2\epsilon)^3}{(1-2\epsilon)^3}
\le32\epsilon^2<1/2.
$$

The complete circle launch consequently has scaled endpoint acceleration below nine and mismatch $|\Delta\mathbf A|<10$. The delay-width choice $d=\epsilon\cos\xi/4$ is the minimum in Section 3: its two alternatives in slow units are at least $(1-\epsilon)/(120\epsilon)$ and $1/\sqrt{80}$, both larger than $\epsilon/4$ in this interval. The exact patch identities from Section 21 give complete supplied scaled speed below $1+10\epsilon/16<2$ and acceleration below eleven; these polynomial identities can also be proved directly and do not use Section 21's pending source-event theorem. Complete supplied radius differs from one by at most $10(\epsilon/4)^2(54/3125)$.

Positive-delay induction now preserves acceleration norm sixteen: every reception acceleration is at most $8+32\epsilon^2\cdot16<16$, and every already supplied acceleration is below eleven. On $0\le s\le4\epsilon$ it follows that

$$
|\mathbf y'|\le1+64\epsilon<2,\qquad
1-4\epsilon-128\epsilon^2\le r\le1+4\epsilon+128\epsilon^2,
$$

which strictly improve the provisional radius margins. All exact source accelerations on this finite initial prefix remain locally Lipschitz; no uniform high-jet or post-layer remainder bound is needed for its $C^{2,1}$ continuation. Its positive delay is bounded above by

$$
u\le\frac{3\epsilon}{1-2\epsilon}<4\epsilon.
$$

At $s=4\epsilon$, its source clock is strictly positive. The clock has remained strictly increasing, starting before $-d$, so both initial seams $-d$ and zero were received exactly once at strictly earlier times. This proves the first-generation cutoff used above. The value $1/64$ certifies only this finite short-layer calculation; it does not admit the original family into the long contraction theorem or supply its eventual existential threshold. The displayed exact-response bounds and polynomial identities are the independently checkable references for this cutoff argument.

### Independent disposition of the actual feedback prefix

The [independent feedback-prefix assessment](maxwell-shaped-overnight-independent-reference.md#feedback-prefix-subject-assessments) fixed its own tighter-circle-input time-70 construction and known-first rational controls before reading Section 22. It then accepted the paired-row time-75 bootstrap, complete roots, actual generated history, support enclosure, velocity/angle inventory and source-acceleration gain at derived bounded-prefix grade. The different frozen reference horizon and tighter supplied-source constants remain in its chronology; agreement is not mislabeled a same-code replay. This acceptance does not include Section 21's sharper first-support-entry interval, which remains separately reviewed at unblinded grade pending a dedicated independent route, or Section 23's newly sharpened seam-generation argument. The supplied patch and independently accepted source interval through 35 remain distinct from their later actual generated-feedback use.

### Independent disposition of the generation correction

The [separately fixed generation-refinement assessment](maxwell-shaped-overnight-independent-reference.md#original-patch-generation-refinement-disposition) reconstructed the first-reception cutoff, triangular weighted jump induction and source/current distinction before reading Section 23. It then accepted the explicit strict cutoff from the exact initial acceleration bootstrap, the post-layer current bounds $\delta^{8-j}$, the sampled source-seam first-derivative contribution of order $\delta^5$ and the continuous reduced $W^{1,\infty}$ fourth-order remainder. This is an appended correction to the earlier wording, with both its earlier acceptance and the subsequent reassessment retained. Section 16's original-family contraction extension is accepted only together with this sharper generation argument; its weaker generic current-jump inventory alone does not justify the first-derivative remainder. No global second-derivative remainder bound, practical final threshold or finite-speed trajectory admission is added. The pending label inside Section 23 identifies its subject freeze; this disposition records the later independent acceptance.

## 24. Independently fixed receiver-skew refinement of an error norm

This lemma was derived from the selected response before reading the comparison worker's new skew instrument or its target outputs. It concerns error bounds on a regular ordinary-root chart, not a certificate of a trajectory. Let $z$ collect the current receiver position, the complete source history, the computed root and its $\mathbf n,R,\mathbf v_s,\mathbf a_s$ values. Holding these inputs fixed, define

$$
K(z)=\mathbf n\mathbf E(z)^{\mathsf T}-\mathbf E(z)\mathbf n^{\mathsf T}.
$$

Then the selected full response is $F(z,\mathbf u)=\mathbf E(z)+K(z)\mathbf u$ and $K(z)^{\mathsf T}=-K(z)$. For actual inputs $(z_A,\mathbf u_A)$ and comparison inputs $(z_C,\mathbf u_C)$, the exact split is

$$
F(z_A,\mathbf u_A)-F(z_C,\mathbf u_C)
=K(z_C)\mathbf e_v+\Gamma,
$$

$$
\mathbf e_v=\mathbf u_A-\mathbf u_C,\qquad
\Gamma=F(z_A,\mathbf u_A)-F(z_C,\mathbf u_A).
$$

The hybrid evaluation $F(z_C,\mathbf u_A)$ is only an algebraic input comparison, not a coupled preparation or a replacement source history. The causal root at a fixed reception depends on receiver position and past source positions, but not the instantaneous receiver velocity when these inputs are held fixed. Thus state-dependent root displacement belongs entirely to $\Gamma$ in this split. Differentiating the root with respect to reception time is a different operation and does not introduce an omitted instantaneous velocity term here.

Let the comparison velocity in the response be the same function whose derivative is used in the error equation, and put $d_v=\mathbf u_C'-F(z_C,\mathbf u_C)$. Then

$$
\mathbf e_v'=K(z_C)\mathbf e_v+\Gamma-d_v,
\qquad
\mathbf e_v\cdot K(z_C)\mathbf e_v=0.
$$

Consequently, in the almost-everywhere or regularized integral form including zeros,

$$
\frac{d}{dT}|\mathbf e_v|\le|\Gamma|+|d_v|.
$$

There is no direct $\|K(z_C)\|\,|\mathbf e_v|$ term in this velocity-norm derivative. However the acceleration-error norm still obeys

$$
|\mathbf e_a|\le\|K(z_C)\|\,|\mathbf e_v|
+|\Gamma|+|d_v|,
$$

when the comparison acceleration is $\mathbf u_C'$. That term must remain when completed acceleration errors are sampled later by the neutral equation. If a retained comparison acceleration differs from $\mathbf u_C'$, its discrepancy is an additional explicit defect. Likewise the position error obeys $\mathbf e_x'=\mathbf e_v-d_x$, with $d_x=\mathbf X_C'-\mathbf u_C$; $d_x$ vanishes only for derivative-compatible comparison paths. The source-history velocity and acceleration supplied to the field must use these same kinematic functions, or retain their mismatch defects explicitly.

Every remaining-input coefficient in a bound for $\Gamma$ must be evaluated on the expanded **actual** receiver-velocity box. Source position, velocity and acceleration errors, source-time displacement and shifted evaluation differences all remain in that bound. Matching complete ordinary root census and positive denominator/range margins are required for a finite Lipschitz envelope. No receiver cancellation removes a delayed source-velocity or source-acceleration error. For a single hit $\|K(z_C)\|=|\mathbf n_C\times\mathbf E_C|\le|\mathbf E_C|$; summing fixed hits preserves skew symmetry. E-only has no instantaneous receiver-velocity term in its selected input map.

**Derived independently fixed input-error lemma.** This justifies removal of the direct receiver term from the velocity-norm inequality while retaining it in acceleration-error propagation. It changes neither the response nor any coupled history and supplies no error-tube certificate without the remaining bounds. Its falsifiers are a nonskew matrix for the selected fixed-input full response, an omitted receiver-velocity dependence of a fixed-position root, or an error equation using inconsistent comparison kinematics. The numerical worker's known forced-rotation case can calibrate a future implementation, but that calibration was not used as a premise for this proof.

## 25. Incoming unit-speed cylinder accepting an original certified prefix

Freeze this generic certificate before any late original target is inspected. The selected case is a finite opposite-polarity equal-coupling mirror binary, $K=c_f=1$, with its original complete compatible past and actual coupled history retained through a time $T_0$. E-only and full are separate law/history cases. The prefix certificate must enclose the **actual** complete histories $\mathbf q,\mathbf v,\mathbf a$ through $T_0$, including all earlier exact preparation pieces, delayed-root census and finite-window $C^{2,1}$ regularity. Every earlier true speed is below one, with a common margin on the completed prefix. A central stored numerical curve without a true-history enclosure is not such a certificate.

Let certified endpoint uncertainty be $\mathbf q(T_0)\in B(\mathbf q_c,e_x)$ and $\mathbf u(T_0)\in B(\mathbf u_c,e_v)$, and obtain $0\le v_-\le|\mathbf u(T_0)|\le v_+<1$ from those balls. Choose a horizon $\Delta>0$ and fixed receiving cylinder

$$
\mathbf q\in B(\mathbf q_c,h_x),\qquad
\mathbf u\in B(\mathbf u_c,h_v),\qquad |\mathbf u|\le1,
$$

with $h_x<|\mathbf q_c|$. In all conditions below, use the entire cylinder and endpoint/history uncertainty, not only the central receiver curve. Source bins contain true position, velocity and acceleration uncertainty at every source time, including shifted evaluation times between central and true roots. Their acceleration Lipschitz regularity is retained from the certified original prefix.

### Complete old-source support and field obligations

Choose $I=[a,b]$ with $b\le T_0$, whose whole source support is covered by completed true-history bins or exact older preparation formulas. For every receiving time $T\in[T_0,T_0+\Delta]$, position in the cylinder and possible completed endpoint source positions, require strict bracket inequalities

$$
|\mathbf q+\mathbf q(a)|-(T-a)<0,
\qquad
|\mathbf q+\mathbf q(b)|-(T-b)>0.
$$

Also enclose every root-consistent source input within this interval, with range $R\ge R_->0$, transmitter denominator $D\ge D_->0$ and completed source speed bounded strictly below one. A root-consistent input satisfies $R=|\mathbf q+\mathbf q(S)|=T-S$ for an $S\in I$ and takes source $X,V,A$ from that completed bin, with all true-prefix and root-shift uncertainty included. Independent interval boxes may enlarge this set, but may not discard a possible true input. A proposed cylinder querying source times beyond $T_0$ fails this criterion; those source values cannot be supplied by a newly prescribed late release or by an uncertified central future.

Let $\mathcal E$ denote the selected **signed** E-only acceleration, including the opposite-polarity coupling; the unsigned outward per-hit field is not substituted. Evaluate the complete selected root and source-acceleration dependence. Require uniform bounds on every root-consistent cylinder input,

$$
2\mathbf u\cdot\mathcal E\ge m>0,
\qquad |\mathcal A|\le A_*<\infty,
$$

where $\mathcal A=\mathcal E$ for E-only and $\mathcal A=\mathcal E+\mathcal M$ for full. The exact identity $\mathbf u\cdot\mathcal M=0$ makes the displayed work quantity the speed-square derivative for either law on identical inputs. It does not make separately evolved histories identical. A conservative norm bound is $A_*=E_*$ for E and $A_*=2E_*$ for full when $|\mathcal E|\le E_*$ and $|\mathbf u|\le1$; tighter checked vector bounds are permitted. No delayed source-acceleration term is omitted.

Require strict receiver-cylinder improvements

$$
e_v+A_*\Delta<h_v,
$$

$$
e_x+\min\{\Delta,\ v_+\Delta+A_*\Delta^2/2\}<h_x,
$$

and the speed-gap crossing condition

$$
v_-^2+m\Delta>1.
$$

These are finite inequalities in declared true-prefix/state/field bounds. They can fail without any conclusion about actual fate. In particular retaining only the small central final displacement or only the central delayed source acceleration would not certify them.

### First incoming event and its domain

Stop the actual original history at its first receiver-cylinder exit, range/denominator/bracket loss, speed-one event, or horizon. Until then $|\mathbf u|<1$. Together with the completed prefix, the entire earlier history has strict speeds, so complete chord monotonicity gives precisely one partner hit and zero self hits. The strict completed brackets place that partner root in $I$. All roots therefore sample the actual already certified original source history, with finite regularity and ordinary margins. The coupled receiving equation on this short segment is an ordinary delay step over completed inputs; local $C^{2,1}$ continuation applies. This does not replace those completed inputs by a new preparation.

The acceleration bound gives velocity drift at most $A_*(T-T_0)$ and position drift at most either $T-T_0$ or $v_+(T-T_0)+A_*(T-T_0)^2/2$. Thus neither receiver-cylinder boundary is reached before the horizon. The field/bracket hypotheses hold on the whole cylinder, so their margins cannot fail there. If speed stayed below one through the horizon, integration of its actual derivative would yield $|\mathbf u(T_0+\Delta)|^2\ge v_-^2+m\Delta>1$, a contradiction. There is consequently a first incoming speed-one time $T_*$ with

$$
T_0+\frac{1-v_+^2}{2A_*}
\le T_*
\le T_0+\frac{1-v_-^2}{m}<T_0+\Delta.
$$

The lower bound uses $|d|\mathbf u|^2/dT|\le2A_*$; the nonzero positive-work hypothesis excludes $A_*=0$. Simultaneous separation is at least $2(|\mathbf q_c|-h_x)>0$, all sampled source inputs remain in completed bins, and the incoming partner root stays ordinary. The incoming continuous acceleration at equality satisfies

$$
\mathbf u(T_*)\cdot\mathbf q''(T_*)\ge m/2>0.
$$

The two mirror members reach the same speed boundary. The complete incoming history still has no positive-delay self root at equality: every earlier speed is strictly smaller than one, so its integrated chord is strictly shorter than the positive delay. This statement is about the incoming history, not an adopted inclusive or superfield continuation.

**Derived generic criterion subject, independent assessment pending.** If all displayed true-prefix, root-support, field and strict-cylinder inequalities are certified, the original coupled binary reaches a transverse incoming unit-speed boundary with positive clearance in the enclosed interval. It loses the claimed strict-subfield formulation domain there. Under an attempted unchanged all-root classical $C^2$ transverse crossing, the independently accepted Section 12 self-birth obstruction then applies; no such outgoing classical crossing exists with these positive-clearance partner inputs and retained self coupling. This conditional obstruction selects no weak, impulsive or capped event response and does not authorize an unrestricted future. The event conclusion concerns the original prefix supplied to this certificate, not the auxiliary late-release cases. E's use of full's completed histories would be only a same-input ablation; its separately coupled fate needs its own original prefix certificate.

The criterion's falsifiers are a root outside the completed support despite the strict brackets, a field input exceeding the universal bounds, a cylinder exit despite strict drift margins, or an actual speed-square derivative inconsistent with the retained signed-work identity. A source support gap, an uncertified prefix or a failed inequality is a failed certificate, not a proved negative fate. No original numerical case is admitted by this generic theorem alone.

The [independently fixed incoming criterion and subsequent assessment](maxwell-shaped-overnight-independent-reference.md#original-prefix-incoming-criterion-assessment) accepts Section 25 at its conditional derived scope. Its reference used a moving receiving cylinder before reading this subject. It also retains the completed-source limitation: a prefix through 35 or 37 is insufficient whenever the final cylinder samples later source times. No original late case was admitted by that assessment.

## 26. Moving incoming cylinder and frozen original-case support screen

The fixed cylinder in Section 25 can be replaced by a moving one centered at the affine endpoint path, without a new preparation. Put $t=T-T_0$, $\mathbf q_0(t)=\mathbf q_c+\mathbf u_c t$, and retain $\mathbf u_0=\mathbf u_c$. Require $\mathbf q\in B(\mathbf q_0(t),h_x)$ and $\mathbf u\in B(\mathbf u_c,h_v)$ until the first incoming unit-speed boundary. The initial endpoint errors, true completed prefix, universal root brackets, whole shifted-source X/V/A uncertainty, signed work lower bound $m$ and acceleration bound $A_*$ remain exactly those of Section 25. Replace its two cylinder inequalities by

$$
e_v+A_*\Delta<h_v,\qquad
e_x+e_v\Delta+A_*\Delta^2/2<h_x,
$$

and require $\min_{0\le t\le\Delta}|\mathbf q_0(t)|>h_x$. Integration gives $|\mathbf u-\mathbf u_c|\le e_v+A_*t$ and $|\mathbf q-\mathbf q_0(t)|\le e_x+e_vt+A_*t^2/2$, so the same first-escape proof applies. The event-time enclosure is unchanged, and simultaneous separation is at least twice the minimum affine-center clearance minus $2h_x$. The minimum of the affine-center norm is obtained by projecting $-\mathbf q_c\cdot\mathbf u_c/|\mathbf u_c|^2$ onto $[0,\Delta]$ (or directly for $\mathbf u_c=0$). This derived moving-cylinder variant is conditional and supplies no original endpoint or source history by itself. Its independently fixed reference is the preceding review's moving-cylinder construction; application still requires independent input enclosures.

Before late central-history arithmetic, freeze the following **measured feasibility screen**, separate from any event certificate. The cases are the original complete circular-tail C2,1 beta-0.3 preparations, $r=1/(4\beta^2)=25/9$, equal opposite polarity, $K=c_f=1$, mirror planar pair, all ordinary positive-delay roots, E and full as separate coupled histories, no self exclusion or cap response. Inputs are each subject's existing `b03-{E,full}-checked-event999-h0.00125.history.json` and matching summary under its ignored owner; no supplied past is replaced. The screen reconstructs the subject's existing quintic source interpolation and uses its existing ordinary-root method only to measure support needs, not to certify true histories. Fixed checkpoints are 35, 37 and the last stored incoming knot for both rows, plus 58 for E. At each checkpoint record X/V/A, radius, speed, delayed source time and acceleration, transmitter denominator and signed speed-square derivative. At the final knot also evaluate the partner gap using completed source endpoints 35 and 37. Negative endpoint gap means the central root is newer than that endpoint; it does not prove an actual trajectory bound. This screen must pass the already known interpolation, stationary, affine and accelerated-source cases first, plus the stationary mirror-pair completed-endpoint gap $g(S)=S-1$ at receiving time three and receiver/source radius one. No actual event or input error is inferred from these central values.

The known-first [support screen](../evidence/maxwell-shaped-overnight-original-event-support-screen.mjs) measured full's last retained source time $37.62380794733$ at receiving time $38.35807291666$, with range $0.73426496933$ and D $0.88293654458$. Its completed-endpoint gaps at source times 35 and 37 are approximately $-2.48538$ and $-0.581640$. Hence even the zero-error central final input fails a completed-source-support certificate ending at 37. At reception 37 its source time is already $35.39871900839$. E's last retained source time is $59.10314621443$ at reception $59.52598864660$, so its required late source prefix is substantially later. These are measured retained-curve feasibility limits, not true original events or rigorous lower bounds on true source times. Their falsifier is a corrected independently reconstructed central root with a nonnegative completed-endpoint gap; true fate still needs actual history uncertainty. The receipt is retained locally as `original-event-support-screen.json` with both complete input specifications and all fixed checkpoints.

## 27. Frozen conditional original full late-window tolerance case

Before directed target arithmetic, fix a conditional application of Section 25 to the **original full beta-0.3 case** of Section 26. Use the last knot of `b03-full-checked-event999-h0.00125.history.json` only as comparison endpoint $(T_0,\mathbf q_c,\mathbf u_c)$. Every knot coordinate and time is interpreted as its exact stored binary rational, and the comparison's late source paths are the exact quintic polynomials matching those coordinates and shared X/V/A jets. This defines a comparison, not a replacement actual history or a compatible late release. The actual endpoint belongs to balls with $e_x=e_v=10^{-5}$. On the entire completed source interval $[37.6178,37.6298]$, require actual original X/V/A errors relative to that exact comparison bounded in Euclidean norm by $10^{-5},10^{-5},10^{-4}$ respectively, together with the original completed-prefix C2,1 regularity, root census and strict subfield history through $T_0$. These premises are not supplied by the measured comparison record and must be established by the original-history tube owner.

Fix $\Delta=0.001$, receiving ball radii $h_x=0.00102$, $h_v=0.01002$, and source interval $I=[37.6178,37.6298]$. For the interval instrument enlarge Euclidean balls to coordinate boxes of the same radius; enlarge the exact comparison's entire source X/V/A boxes by their respective error radii. Receiver time is the whole $[T_0,T_0+\Delta]$. Strict source-bracket signs are evaluated at the interval endpoints including source position errors. Their validity excludes every possible root beyond $37.6298$ before the incoming event. The field instrument must retain the entire enclosed source time interval, actual-unit source signs and delayed acceleration. It reports signed E and full acceleration boxes, signed work $2\mathbf u\cdot\mathcal E$, and a norm upper bound for full acceleration. The work identity is checked on identical input boxes; E on full's prefix is not an E separately coupled event case.

The target arithmetic may establish that these declared endpoint/source tolerances imply an incoming event by Section 25. It cannot establish that the original trajectory satisfies those tolerances. A failure of the bracket, work, drift or speed-gap inequalities leaves this conditional case unadmitted; there is no terminal compatibility patch and no outgoing response. Before target use the instrument must pass outward arithmetic, exact polynomial X/V/A reconstruction and stationary plus accelerated signed response controls. Independent potential differentiation, fixed before these target boxes, will assess the explicit response values separately.

The [new interval subject](../evidence/maxwell-shaped-overnight-original-event-tolerances.mjs) passed its recorded known arithmetic, exact polynomial and signed-response controls before this target. Its outward $10^{-24}$ rational-grid arithmetic encloses all endpoint and source uncertainty, contracts the uniform source bracket only by strict whole-box endpoint signs, and retains all delayed source acceleration. The resulting conditional input certificate has source time in $(37.62216468173,37.62658465055)$, range in $(0.73138813287,0.73700562678)$, D in $(0.87608512660,0.88949630681)$, signed work greater than $2.68466$, and full acceleration norm less than $4.82294$. Its velocity drift margin exceeds $0.005187$, position drift margin is exactly $10^{-5}$, and speed-gap margin exceeds $0.0013675$. Incoming simultaneous separation is greater than $0.50072$.

**Conditional derived target subject, independent input-kernel assessment pending.** If the actual original full history satisfies the frozen endpoint, whole source-interval and complete-prefix premises, Section 25 encloses its first incoming unit-speed boundary in

$$
38.3582053202<T_*<38.3585635256.
$$

This interval is a tolerance implication, not an event enclosure already established for the original launch. The actual prefix through $T_0$, endpoint errors and source X/V/A errors are still obligations. A certified prefix through 38 would cover every source needed here, but the receiving state must also be enclosed from 38 to $T_0$; its existence and uncertainty cannot be inferred from the central endpoint. No terminal compatibility patch, new supplied history or frozen-source outgoing response appears in this application. Applying E to these full inputs is only the identical-history ablation. E's separately coupled late event needs its own certificate. A violated true endpoint/source tolerance or an earlier true domain event would invalidate admission without contradicting the conditional inequality proof.

The complete local receipt `original-full-incoming-tolerances.json` contains exact comparison provenance, physical source X/V/A boxes, receiving boxes, gap signs, margins and directed field enclosures. The comparison history SHA is `c8efbc9f7102661333fff29d0c7bb42c43982cf8740fac4b670953511c4a0af6`; this identifies the numerical comparison, not the actual trajectory. The independent potential-based interval response instrument was frozen and passed controls before receiving these target boxes. Its assessment, when complete, is a separate evidence step.

## 28. Conditional ordinary final-block error transport with completed local source errors

Freeze this generic transport before reading any certified late source-error scales. Let the actual original prefix be certified through a time $T_c$, and consider a receiving block $[T_c,T_b]$ whose **entire uncertain root support** remains at emission times at most $T_c$. A derivative-compatible comparison has $\bar{\mathbf v}=\bar{\mathbf q}'$ and $\bar{\mathbf a}=\bar{\mathbf v}'$, with retained comparison response defect $\mathbf d=\bar{\mathbf a}-F_C$ bounded by $d_*$. Its completed comparison source acceleration is Lipschitz on the whole shifted source support; let comparison source speed, acceleration and acceleration-Lipschitz bounds be $b_c,A_c,J_c$. A piecewise quintic comparison supplies such $J_c$ from its one-sided polynomial jerk bounds despite acceleration-derivative seams. Actual completed source errors at every intervening source time are bounded by $p_x,p_v,p_a$ relative to the same comparison X/V/A functions. These are local completed-bin errors, not necessarily the maxima over an earlier unrelated source support. Actual C2,1 history regularity and strict ordinary margins remain required for existence.

Write the selected signed field as $F(\mathbf r,\mathbf v_s,\mathbf a_s;\mathbf u)$, with $\mathbf r=\mathbf q-\mathbf X_s$, $R=|\mathbf r|$, $\mathbf n=\mathbf r/R$ and $D=1-\mathbf n\cdot\mathbf v_s$. On a declared convex ordinary input enclosure, assume partial operator-norm bounds $L_r,L_v,L_a$ with respect to these three source/geometry inputs. These derivatives include n, R and D dependence; they are not derivatives holding those derived inputs independently fixed. Evaluate the full row's bounds on the expanded **actual** receiver-velocity box. Require a comparison-root derivative floor $D_c\ge d_c>0$ on every emission between the actual and comparison roots. The actual and comparison roots both lie in the declared completed support by strict endpoint gap signs.

At a fixed receiving time, comparison-gap monotonicity and the position error imply

$$
|S_A-S_C|\le\frac{e_x+p_x}{d_c}.
$$

Thus the full remaining-input difference from Section 24 obeys

$$
|\Gamma|\le C_x e_x+P_s,
$$

$$
C_x=L_r(1+b_c/d_c)+(L_vA_c+L_aJ_c)/d_c,
\qquad P_s=C_xp_x+L_vp_v+L_ap_a.
$$

Indeed, the relative-position input changes by at most $e_x+p_x+b_c|S_A-S_C|$, source velocity by $p_v+A_c|S_A-S_C|$, and source acceleration by $p_a+J_c|S_A-S_C|$. The pointwise actual source errors are evaluated at the actual root; only the **comparison** functions are shifted and differentiated. Pointwise acceleration error does not supply an actual jerk bound, and none is inferred here. At a retained comparison seam the same inequalities follow from its global acceleration-Lipschitz bound. No source-acceleration term is dropped. For full, Section 24 removes the direct skew receiver term only from the velocity-error norm derivative; E has no such receiver term.

Consequently $e_x'\le e_v$ and $e_v'\le C_xe_x+f_*$ with $f_*=P_s+d_*$. For constant nonnegative bounds and $k=\sqrt{C_x}>0$, the rigorous scalar majorant is

$$
E_x(t)=e_{x0}\cosh(kt)+e_{v0}\frac{\sinh(kt)}k+f_*\frac{\cosh(kt)-1}{C_x},
$$

$$
E_v(t)=ke_{x0}\sinh(kt)+e_{v0}\cosh(kt)+f_*\frac{\sinh(kt)}k.
$$

For $C_x=0$ use $E_x=e_{x0}+te_{v0}+f_*t^2/2$, $E_v=e_{v0}+f_*t$. These are obtained by the nonnegative two-dimensional differential comparison, or by the exact fundamental matrix, and also hold in integral form at zero norm and source seams. An independently checkable known case is the equality system $e_x'=e_v$, $e_v'=C_xe_x+f_*$ itself; an implementation must reproduce it before target input constants. Variable local-bin bounds can be integrated by a separately certified nonnegative majorant, but are not replaced by central values.

A first-escape closure additionally requires these bounds strictly inside the declared receiver-error radii, positive simultaneous separation, ordinary root/gap margins on the whole expanded enclosure, and comparison speed plus $E_v$ below one throughout the receiving block. Under those hypotheses the final actual endpoint errors are at most $E_x(T_b-T_c),E_v(T_b-T_c)$. Acceleration-error bins generated in this block must retain

$$
e_a\le\|K_C\|e_v+C_xe_x+P_s+d_*.
$$

The skew term cannot be removed there. This lemma advances the original solution over completed old inputs and adds no compatibility patch or new history. It supplies no actual late tube without the certified local errors, response partial bounds, defect and strict bootstrap inequalities. To feed Section 27 at its fixed $T_0$, it would suffice to derive $E_x,E_v\le10^{-5}$ and retain the stated source X/V/A error bounds; those numbers are obligations, not currently proved scales. A prefix through 38 can cover the required final old source interval, but neither support availability nor a small central defect by itself establishes these endpoint errors.

**Conditional derived transport subject, independent assessment pending.** Its falsifiers are an omitted root-shift/source-acceleration term, a partial bound evaluated outside its convex input enclosure, a comparison acceleration that differs from the derivative used in the defect, a completed source-bin error exceeding its local allowance, or a majorant/first-escape inequality that fails. The lemma gives rigorous sensitivity once its constants are certified; a screen with nominal constants is only feasibility evidence.

## 29. Frozen larger original-prefix input tolerance case

The first conditional late window intentionally demands small endpoint errors. Before its larger successor target arithmetic, freeze a second full beta-0.3 case using the **same original comparison endpoint and complete source inventory** as Section 27, without any new release. Set endpoint Euclidean errors $e_x=0.001$, $e_v=0.0005$, local completed source X/V/A errors $p_x=p_v=0.001$, $p_a=0.01$, horizon $\Delta=0.002$, receiver radii $h_x=0.0031$, $h_v=0.0201$, and initial source interval $[37.6038,37.6438]$. Require every actual original source input and root shift in this entire interval to satisfy those errors, and the same complete-prefix C2,1, speed and census premises through the fixed receiving checkpoint. Coordinate interval enlargement again conservatively contains each Euclidean ball. The same universal bracket contraction and Section 25 inequalities decide admission; no central field sign is substituted. This fixes substantially larger position/source tolerances before learning late certified scales. Endpoint speed error is still limited by the chosen near-unit comparison state; failure to admit this box suggests an earlier receiving checkpoint or a trajectory-centered ordinary-step cylinder, not a speed cap or a new past.

Use a new successor instrument/output preserving the smaller case. Its recorded known arithmetic, polynomial and signed response controls must precede target use. The independent potential kernel remains frozen. Successful arithmetic would prove only a larger conditional implication; certified actual original input errors remain the separate admission obligation. Failure of any strict root, drift, work or speed-gap condition is recorded as this case's failed certificate rather than a negative fate.

The known-first [larger-box successor](../evidence/maxwell-shaped-overnight-original-event-tolerances-large.mjs) passes this frozen case's directed subject inequalities: range exceeds $0.72362$, D exceeds $0.85665$, source speed is below $0.66289$, signed work exceeds $1.79766$, and full acceleration norm is below $6.47382$. Velocity-cylinder slack exceeds $0.006652$, position slack is $0.0001$, and speed-gap slack exceeds $0.001299$. It conditionally encloses the event in $(38.3580958965,38.3593502620)$ with simultaneous separation greater than $0.49656$. The exact comparison provenance is unchanged; all enlarged physical source/receiving boxes appear in the separate local `original-full-incoming-tolerances-large.json` receipt. Independent potential-kernel assessment is pending; actual original-history admission is also pending. These are separate obligations. This case preserves the smaller receipt and does not loosen its already frozen statements silently.

## 30. Wider incoming-event criterion using a receiving test curve

Freeze a generic alternative before an earlier receiving checkpoint or extrapolated comparison is used as a target. The near-unit Section 29 center has an absolute initial-error ceiling $e_v<1-|\mathbf u_c|=0.000648778394\ldots$ if its whole endpoint ball is to be strictly subfield. Larger certified velocity error cannot be admitted there merely by enlarging a final cylinder. An earlier certified actual checkpoint and a wider incoming window can instead use a receiving **test curve**, as follows.

Let the actual original solution and its complete subfield past be certified through $T_c$, and select a derivative-compatible C2 test curve $\bar{\mathbf q}$ on $[T_c,T_f]$, with $\bar{\mathbf v}=\bar{\mathbf q}'$ and $\bar{\mathbf a}=\bar{\mathbf v}'$. Fix completed comparison source history through $T_c$, actual local source errors, and uniform source-gap brackets whose entire uncertain support stays at or before $T_c$. Define $F_C(T)$ by the partner input row evaluated at this test receiving state and its root in the completed comparison history. Every such root samples only the fixed old comparison source. The test curve is not supplied as an actual past and is not declared an all-root solution. Its response defect $\bar{\mathbf a}-F_C$ is explicitly retained.

Use positive, continuous error-radius functions $B_x(T),B_v(T)$ and independently certified Section 28 majorants $E_x,E_v$, or its variable-bin counterpart. On every receiving test tube before actual speed one, require strict $E_x<B_x$, $E_v<B_v$, positive clearance $|\bar{\mathbf q}|-B_x>0$, ordinary source margins and universal completed-source support. All response derivatives use the intersection of the expanded test tube with $|\mathbf u|\le1$ for actual receiving velocities, enlarged conservatively where needed. The comparison's own velocity enters its skew matrix and retained defect; the full receiving error identity is still exact for arbitrary finite comparison velocity because the input matrix is skew for every such velocity. No subfield bound on the receiving comparison velocity is needed to state this algebraic error identity. Comparison source velocities remain strictly subfield.

Assume the actual certified starting speed is strictly below one. Suppose the majorants close until $T_f$ and

$$
|\bar{\mathbf v}(T_f)|-E_v(T_f)>1.
$$

If actual speed stayed below one throughout the interval, local ordinary method-of-steps existence over certified old inputs and the strict first-escape inequalities would preserve the error tube through $T_f$. The reverse triangle inequality would then force actual speed above one at $T_f$, a contradiction. There is therefore a first actual incoming unit-speed time in $(T_c,T_f)$ at positive clearance and with complete ordinary partner/no-self census. The test curve may have crossed one earlier, but that algebraic comparison does not assert a continued actual all-root solution; the proof only uses the actual receiving equation before its first equality. Its old comparison sources are never the unadopted post-checkpoint test path.

For a transverse rather than merely first boundary conclusion, additionally enclose the signed E work $2\mathbf u\cdot\mathcal E\ge m>0$ on every possible first-event state in the test tube (or on the whole incoming tube). The exact same-input M cancellation then gives actual incoming longitudinal acceleration at least $m/2$, separately for each coupled history. Under positive self coupling and bounded partner rows the accepted C2 self-birth obstruction excludes an unchanged all-root classical outgoing transverse crossing. Without that work bound the test-curve contradiction still forces a first incoming speed boundary, but does not certify its transversality or the outgoing obstruction. No weak or capped response is selected.

A certified initial block with speed-error upper bound below one and an arbitrary test polynomial may satisfy these obligations even when a receiving center ends above one. Evaluating its algebraic partner row after the comparison's own equality is solely defect/sensitivity arithmetic for a test function. It is not a selected equality/superfield actual continuation, not a reference solution, and not a stability base. An extrapolated test polynomial needs its own exact derivative and defect bounds; calling it the numerical trajectory would be incorrect. The full actual history and every local source error remain those of the original launch.

**Conditional derived wider-event subject, independent assessment pending.** Its falsifiers are any source queried beyond the certified checkpoint, a test/source history substituted for actual completed inputs, an omitted test-curve defect, inconsistent X/V/A derivatives, a failed first-escape inequality, or a final test-speed gap not exceeding the certified velocity error. A nonpositive first-event work bound withdraws the transversality/obstruction conclusion while leaving a separately closed first-boundary contradiction intact. No original numerical checkpoint, test continuation or event horizon has yet been admitted by this theorem.

## 31. Frozen C2 receiving-test construction and broader late case

The next candidate keeps the actual original full beta-0.3 prefix separate from its comparison. Fix $T_c=38.3$ and $T_f=38.4$. On $[T_c,T_0]$ use the exact binary-rational quintic comparison of Sections 27–29, with the same bound history SHA. On $[T_0,T_f]$ define the receiving test polynomial

$$
\bar{\mathbf q}(T)=\mathbf q_c+(T-T_0)\mathbf u_c+(T-T_0)^2\mathbf a_c/2,
\qquad
\bar{\mathbf v}(T)=\mathbf u_c+(T-T_0)\mathbf a_c,
\qquad
\bar{\mathbf a}(T)=\mathbf a_c,
$$

where all three endpoint jets are the exact stored final knot values. This is a derivative-compatible C2 join, generally with a jerk seam; its right jerk is zero. It is an arbitrary receiving test function. The constant acceleration is neither selected as the actual future acceleration nor an adopted outgoing equation. Its exact partner-input defect after $T_0$ is retained, including the quadratic test's generally nonzero difference from the original selected full row. No new source history or compatibility patch is constructed, and the post-$T_0$ test is never queried as a source.

Freeze actual checkpoint errors $e_{x0}=0.001$, $e_{v0}=0.005$, completed local source X/V/A errors $p_x=p_v=0.001$, $p_a=0.01$, and receiver tube radii $B_x=0.01$, $B_v=0.04$. Every actual source interval must be enclosed inside completed original support through $T_c$; source errors apply on all intervening shifted emission times. The case still requires the complete actual original C2,1 subfield prefix and ordinary census through $T_c$. On the whole incoming receiving tube require positive clearance, ordinary root brackets/D/range margins, and a positive signed E work bound for possible first-event states. Compute variable-bin Section 28 majorants on exact receiving time cells of width at most $0.0001$, splitting at the exact join $T_0$ and every original receiving Hermite seam. Exact derivative bounds and the union of one-sided source jerk bounds retain comparison seams. Cells are allowed to have test speed above one because Section 30 stops only the actual trajectory at equality. Partial response boxes enclose actual receiving states before equality and cannot omit delayed source acceleration.

Known controls precede all target arithmetic: an exact quadratic receiving polynomial must reproduce its X/V/A jets and C2 join; the positive ordinary transport must dominate its independently known equality system; stationary and transverse directed response sensitivities must pass. If the directed majorants stay within $B_x,B_v$ and the final test-speed excess exceeds their velocity bound, Section 30 proves the conditional original first boundary. Positive event work supplies transversality separately. If this candidate fails, retain its exact failed inequality without claiming an original negative fate; a smaller initial-error frontier or a different earlier checkpoint would be a separate frozen successor. No target arithmetic has yet admitted the declared actual errors.

The receiving-test instrument's first known quadratic calibration failed because the expected coordinate `2.1` was entered as a binary numeric literal, whereas that analytical control's inputs specify exact decimal rationals. The failed source is retained locally. Correcting only the expected control value to the exact string `'2.1'` made the quadratic/C2-join, directed sensitivity, continuous quadratic-defect and positive equality-system majorant controls pass before target use. No target was run under the failed calibration, and the test construction or response kernel was not changed. Target comparison literals continue to be interpreted as their exact recorded binary rationals.

The first arithmetic launch stopped before its first receiving cell at the comparison's exact binary endpoint: converting that non-grid time to an outward $10^{-24}$ interval extends its upper face slightly beyond the saved last time, so the existing completed-history guard correctly rejected the query. This was a comparison representation failure, not an event/tube result. The pre-change source and log are retained. The corrected representation appends one exact quadratic endpoint jet to the **receiving test only**, so its exact Hermite continuation is the same declared quadratic and permits an outward interval across its C2 join. All source brackets remain before $T_c$ and cannot query that extension. A new known binary-time C2-seam calibration passed before relaunch; the shared source/root/response instruments and the mathematical test case remain unchanged. The new target output has a separate `grid-fixed` filename.

The grid-corrected target was stopped as an owned computation after a scoped process inspection measured elapsed 2:05, CPU time 1:54.46, RSS 135712 KiB and 99.7 percent CPU, before its first 100-cell heartbeat or a completed target receipt. That inspection establishes active computation, not a scientific outcome. The preserved exact rational recurrence can grow numerator/denominator lengths without changing its majorant. Its successor rounds each positive endpoint bound **upward** to the existing $10^{-24}$ grid. Because the positive comparison map is monotone in both incoming errors, induction preserves a conservative upper bound; this rounding changes neither the equation nor the test case. An exact-third upper-rounding control and all earlier transport/response/test controls passed before successor target use. The successor also emits a wall-clock heartbeat at least every 30 seconds after completed cells, and retains a distinct `upper-rounded` target filename. Its source change and interrupted predecessor are preserved rather than attributed to a mathematical defect.

The [independently fixed and assessed local-source transport](maxwell-shaped-overnight-independent-reference.md#accepted-local-source-error-and-final-block-refinements) accepts Section 28 at its conditional derived scope, including the comparison-only jet shift and acceleration-error skew term. The [independently fixed test criterion and larger-tolerance disposition](maxwell-shaped-overnight-independent-reference.md#wider-test-curve-criterion-disposition-and-larger-tolerance-enclosure) accepts Section 30 and independently closes Section 29 with conservative $m=1.59$, $A_*=5.5$, initial speed bounds $0.99885,0.99987$. Its independent conditional event interval is $(38.3580965514,38.3595186258)$. It preserved coarse and sixteen-position-box enclosure failures before a known-first 256-position-box reference refinement. The smaller Section 27 is independently supported by conservative $m=2.26$, $A_*=5$, giving $(38.3581988769,38.3586567948)$ as a broader independent conditional interval. These independently assessed implications retain all original-prefix admission obligations; neither is an accepted original late fate. The tighter subject intervals remain supported by their separately assessed explicit algebra/arithmetic rather than being counted as a second identical independent interval computation.

## 32. Independently frozen cubic receiving-test derivative and successor case

Before a cubic target coefficient is calculated, derive its construction from the selected row. At the original comparison endpoint $T_0$, retain exact stored receiving X/V/A and the complete old comparison source. Let $S$ be its ordinary partner root and $\sigma=(1-\mathbf n\cdot\bar{\mathbf v})/D$. Let $F_r,F_v,F_a,F_u$ denote exact partial derivatives of the signed full row with respect to relative displacement, source velocity, source acceleration and receiving velocity. With completed source velocity/acceleration/jerk $\mathbf v_s,\mathbf a_s,\mathbf j_s$, the ordinary comparison-input derivative is

$$
\mathcal J_C=F_r(\bar{\mathbf v}-\mathbf v_s\sigma)
+F_v\mathbf a_s\sigma+F_a\mathbf j_s\sigma
+F_u\bar{\mathbf a}.
$$

This is the chain rule along a receiving test over old sources, not an assumed actual jerk. It retains the delayed source-acceleration derivative and the full receiving-velocity derivative. If the source-root interval meets a retained source jerk seam, enclose the union of its one-sided comparison jerk values and retain the entire derivative box; no false smooth derivative is inferred at that seam. A sufficiently tight directed root/input enclosure yields a rational interval vector $\mathcal J_C$. Choose the exact rational midpoint $\mathbf j_c$ of each coordinate as the receiving cubic coefficient and keep the enclosure width as a validation check. This midpoint is a test choice, not an actual jet equation solved after speed equality.

Replace only Section 31's post-$T_0$ receiving test by

$$
\bar{\mathbf q}=\mathbf q_c+\eta\mathbf u_c+\eta^2\mathbf a_c/2+\eta^3\mathbf j_c/6,
\quad
\bar{\mathbf v}=\mathbf u_c+\eta\mathbf a_c+\eta^2\mathbf j_c/2,
\quad
\bar{\mathbf a}=\mathbf a_c+\eta\mathbf j_c,
\qquad \eta=T-T_0.
$$

It matches X/V/A and is C2, generally with a jerk seam against the original left interpolation. Its right jerk is exactly the fixed $\mathbf j_c$. Every source bracket is still at or before $T_c=38.3$, so this future cubic is never a supplied source history. Fix the same $T_f=38.4$, incoming and local source errors, receiving error radii and time partition as Section 31. Its new defect must be bounded on every whole cell using its exact derivative jets; no improvement is assumed before computation. It is a separate candidate and preserves the quadratic result or failure unchanged.

Known controls precede coefficient/target use. For a stationary source with relative displacement $(2,0)$, receiving velocity $(0.2,0.3)$ and any receiving acceleration, E/full have ordinary row derivative $(0.05,-0.0375)$ because the acceleration is radial and the receiving skew matrix vanishes. Exact cubic polynomial jets and C2 endpoint matching must also pass. The chain-rule reference is the explicitly displayed derivative identity and these analytical input cases, rather than the later target coefficient. The existing separately assessed directional defect formula supplies another independent assessment route. The cubic itself is not a reference solution or a stability base. A wrong chain-rule sign, omitted source jerk, inconsistent polynomial derivatives, source query newer than the checkpoint or a failed majorant inequality invalidates the corresponding construction/application.

### Fixed receiving-box target disposition

The completed known-first upper-rounded instrument rejects Section 31's declared error tube at receiving time $38.35696666666$, after 574 cells, **before** the original final comparison knot $T_0$ by approximately $0.00110625$. The exact internal test is that its positive velocity-error majorant exceeds the fixed $0.04$ radius; nearest-binary telemetry is $0.04006415$, with position-error telemetry $0.00212825$. Range, D, signed work and clearance remain positive in the checked cells. This is a failed conditional error certificate, not an actual trajectory event or a negative fate. No actual incoming checkpoint/source errors were supplied, and its rejected majorant does not measure true error.

The local receipt contains the final test speed at $T_f$ but its error variables at the earlier stopping time. The displayed numerical `speedGap` therefore has **no final-time acceptance meaning** on this rejected run; it cannot be reused to force an event. The exact `passed:false` decision retains the failed tube condition. A successor must suppress a final event-gap field unless the whole horizon is reached. Scalar `.num()` diagnostics are nearest-binary telemetry, not outward mathematical bounds; the exact internal rational decisions and frozen source are the evidence for this rejection. Future admitted cases must retain exact rational witness fields for any proof bridge.

The Section 32 cubic with the same fixed coefficient boxes, errors and $T_c,T_f$ has an identical comparison prefix up to this stopping time. Every receiving and sampled source polynomial, derivative, root bracket and positive recurrence through that time is unchanged; its modified post-$T_0$ coefficient cannot repair a failed prefix earlier than $T_0$. Thus no duplicate same-box cubic target is needed. This excludes admission by that particular fixed-box proof, not by a sharper method. A local adaptive receiving-error enclosure is a distinct successor, preserving both prior cases.

## 33. Frozen adaptive receiving-cell enclosure and cubic successor

Before adaptive target coefficients, keep Section 32's cubic receiving-test construction and the same original full case, $T_c=38.3$, $T_f=38.4$, initial actual X/V errors $0.001,0.005$, completed source errors $0.001,0.001,0.01$, and global allowed error radii $0.01,0.04$. Replace only the **coefficient expansion** inside each exact receiving cell by a locally self-consistent one. If incoming rational bounds are $e_x,e_v$, choose $r_x=e_x+0.00002$, $r_v=e_v+0.0002$ before deriving that cell's roots or sensitivities. Uniform completed-source support, field derivatives and signed work are evaluated over that local receiving expansion, with actual source errors unchanged. The receiving time cell still has width at most $0.0001$ and is split at every receiving seam. The cubic right jerk is chosen only after its known analytical chain-rule and polynomial controls pass.

Apply the same positive whole-cell recurrence with skew velocity comparison. Its endpoint bounds increase within a receiving cell. Accept that cell only if the new bounds are strictly smaller than $r_x,r_v$ and the global allowed radii. Otherwise reject this fixed adaptive case; do not use the smaller coefficients beyond a failed expansion. This is a first-escape argument within each cell, then induction over the closed cell partition. The source interval is bracketed from the chosen local position radius **before** any new local error is selected, and all source supports must be at or before $T_c$. It is a sharper receiving-input enclosure, not a discarded source-error channel or an equation change. Global input convexity and expanded actual receiving velocities remain mandatory.

Upward rational-grid rounding preserves the nonnegative induction. Known controls include an exact positive ordinary equality system within a declared local expansion, together with all response, chain-rule and cubic-jet controls. Future acceptance records retain exact rational error bounds, work/range/denominator minima, final speed inequality and input bindings; nearest-binary diagnostics are only telemetry. If any cell stops early, report its receiving-error enclosure failure and leave final-time event implication undefined. This complete case is frozen before its coefficient or majorant target use. A different margin, error tolerance, time partition or test would be a separate successor. Actual original input admission remains external even if this conditional adaptive proof closes.

The [adaptive cubic instrument](../evidence/maxwell-shaped-overnight-original-test-event-adaptive.mjs) passed its analytical row-derivative controls, exact cubic Hermite X/V/A/jerk reconstruction, binary-time C2 seam, upward rounding and positive local ordinary expansion controls before target use. The fixed source SHA is `9a4f406740c7f35bd2844f3cc56b9ae3e3804e8b49b962065ccb60f6d290a043`. It retains exact rational witnesses for whole-cell coefficients and errors, all source supports and input binding; scalar numerical fields are explicitly telemetry. Neither this calibration nor an intermediate heartbeat admits the original trajectory or the full conditional receiving horizon.

## 34. Signed receiving-Jacobian error transport over completed source history

Freeze a possible prefix refinement before any matrix target. The scalar $C_x$ norm in Section 28 is conservative and discards the signs and rotation of the receiving position derivative. Its replacement can retain those signs while keeping unknown source-history errors as certified completed forcing. This is error transport along a comparison, not a stability spectrum about a non-solution.

Let $\mathscr F_C(T,\mathbf X,\mathbf u)$ be the selected signed partner response using only fixed completed **comparison** source history. Its ordinary root obeys $g=|\mathbf X-\mathbf X_s(S)|-(T-S)=0$. At fixed receiving time and velocity,

$$
\delta S=-\frac{\mathbf n^{\mathsf T}\delta\mathbf X}{D},\quad
\delta\mathbf r=\left(I+\frac{\mathbf v_s\mathbf n^{\mathsf T}}D\right)\delta\mathbf X,
\quad
\delta\mathbf v_s=-\frac{\mathbf a_s\mathbf n^{\mathsf T}}D\delta\mathbf X,
\quad
\delta\mathbf a_s=-\frac{\mathbf j_s\mathbf n^{\mathsf T}}D\delta\mathbf X.
$$

Consequently its signed receiving position Jacobian is

$$
A_X=F_r\left(I+\frac{\mathbf v_s\mathbf n^{\mathsf T}}D\right)
-\frac{(F_v\mathbf a_s+F_a\mathbf j_s)\mathbf n^{\mathsf T}}D.
$$

All jets in this Jacobian belong to the completed comparison source, not an inferred true source jerk. The comparison source acceleration is Lipschitz; its weak/one-sided jerk values and the whole ordinary root interval must be retained. For piecewise quintic histories the formula holds on open pieces and in the line-integral mean-value representation across seams. A root at a seam does not license omitting its delayed acceleration dependence.

Split actual response errors in this order: actual past versus comparison past at actual receiving X/u; then actual versus comparison receiving position with comparison past and actual receiving velocity fixed; then receiving velocity at comparison receiving position. The first term is a completed-source error $\boldsymbol\eta_s$, bounded by $P_s$ of Section 28 using the whole shifted source interval. The second is $\widehat A_X\mathbf e_x$, where $\widehat A_X$ is the mean of the displayed Jacobian on the position segment; its receiving-velocity input is the expanded actual velocity. The third is exactly $K_C\mathbf e_v$, with $K_C^{\mathsf T}=-K_C$ for full and $K_C=0$ for E. $K_C$ is evaluated at the comparison position/root and is independent of receiving velocity. Thus a derivative-compatible comparison gives the exact error equation

$$
\frac{d}{dT}\begin{pmatrix}\mathbf e_x\\\mathbf e_v\end{pmatrix}
=\begin{pmatrix}0&I\\\widehat A_X&K_C\end{pmatrix}
\begin{pmatrix}\mathbf e_x\\\mathbf e_v\end{pmatrix}
+\begin{pmatrix}0\\\boldsymbol\eta_s-\mathbf d\end{pmatrix}.
$$

The unknown true source acceleration still enters $\boldsymbol\eta_s$ through its local completed error bound. It is not deleted, set equal to comparison acceleration, or smoothed by neutrality. Source intervals may not exceed the completed actual checkpoint. The diagonal receiving blocks do not acquire a source feedback derivative from an uncompleted actual future.

A validated interval matrix propagator or retained correlated error set may bound this equation with less growth than scalar $C_x$. On a receiving cell choose any known matrix generator $M_0$ and a certified whole-cell residual $\Delta M$ enclosing the displayed error matrix minus $M_0$. Variation of constants gives

$$
Z(T)=\Phi_0(T,T_c)Z(T_c)+\int_{T_c}^{T}\Phi_0(T,s)\bigl(\Delta M(s)Z(s)+(0,\boldsymbol\eta_s(s)-\mathbf d(s))\bigr)\,ds.
$$

Its interval/retained-set application must enclose the entire propagator and every intermediate error tube, improve strict root/range/D/clearance margins, and retain old-source acceleration error. Matrix centers, entries and propagators are computational choices for this error identity, not asserted equilibria or adopted equations. A norm of the residual can still be used, but replacing the entire signed generator by $C_x$ returns the earlier conservative method. Comparison source jerk seams are enclosed by their whole matrix hull; no unproved differentiability across them is invoked.

An independently checkable input control is a stationary source at relative displacement $(2,0)$ with zero source V/A and zero receiving velocity, $K=c_f=1$. Both rows have $A_X=\operatorname{diag}(1/4,-1/8)$ and $K_C=0$. The exact constant matrix propagator in coordinate pairs $(e_x,e_{v_x})$ and $(e_y,e_{v_y})$ is

$$
\begin{pmatrix}\cosh(t/2)&2\sinh(t/2)\\\tfrac12\sinh(t/2)&\cosh(t/2)\end{pmatrix},
\qquad
\begin{pmatrix}\cos(\omega t)&\sin(\omega t)/\omega\\-\omega\sin(\omega t)&\cos(\omega t)\end{pmatrix},
\quad\omega=1/\sqrt8.
$$

These are exact linear comparison controls, not a stability conclusion for a held stationary binary. A new propagator instrument must reproduce them and its forcing integral before target use. The receiver-root derivative sign, delayed jerk contribution and signed field derivatives need a separately constructed reference before a matrix target is admitted.

**Derived conditional error-identity subject; no matrix instrument or target admission yet.** Its falsifiers are a wrong root-shift sign, source jerk falsely inferred from true acceleration error, a missing $F_a\mathbf j_s$ or skew term, an error forcing interval excluding a completed source input, a propagator interval missing the known matrix case, or any failed whole-cell first escape. This provides a more decisive next prefix method if scalar enclosures fail; it alone proves no late original event or orbit stability.

## 35. Independently checked adaptive conditional event and complete source-support inventory

Section 33's frozen adaptive cubic receiving test closed all 1006 exact contiguous cells from $T_c=383/10$ to $T_f=192/5$. The fixed analytical comparison is bound to the original full $\beta=0.3$ complete preparation and retained history SHA `c8efbc9f7102661333fff29d0c7bb42c43982cf8740fac4b670953511c4a0af6`. The receiving test is the exact original comparison quintic through its last stored knot $T_0=38.358072916659964$, followed by the exact C2 cubic selected in Section 32; that appended receiving curve is not an adopted outgoing equation or a source future. The unchanged source/error premises are actual original endpoint X/V errors at most $0.001,0.005$ at $T_c$, and completed source X/V/A errors at most $0.001,0.001,0.01$ on every required old source interval.

**Derived conditional certificate, independently assessed:** the retained exact rational final position error is less than $0.002619103$, final velocity error less than $0.038607118$, and the reverse-triangle speed gap exceeds $0.03663846$. Each whole-cell positive majorant strictly improved its preselected local receiving expansion and global $0.01,0.04$ radii. The explicit response instrument gives uniform signed work greater than $1.5759273$, positive transmitter denominator greater than $0.8294363$, sampled range greater than $0.6697868$, and current pair separation greater than $0.4146040$. These displayed decimals round conservatively from the receipt's exact witnesses. The [independent reference](maxwell-shaped-overnight-independent-reference.md#adaptive-receiving-test-target-independent-conditional-acceptance) separately reconstructed the exact time partition, pre-query local expansions and positive ordinary cosh/sinh majorants. Its unchanged differentiated-potential interval instrument over independently reconstructed Hermite/cubic jets gives the coarser but still positive work lower bound greater than $0.9079$, checked directly against its retained exact rational work witness. The larger explicit-row work bound is not attributed to that reference. Exact final-speed and local first-escape witnesses are retained in the ignored `original-full-test-event-adaptive.json` receipt; the independently authored checker retains `reviewed-adaptive-test-conditional.json` under its own ignored evidence owner.

If the actual original checkpoint and complete source errors satisfy those premises, a first incoming unit-speed event occurs in $(38.3,38.4)$ with positive separation and a positive longitudinal acceleration. Under the provisional no-event hypothesis, both complete true source histories remain strictly subfield. The partner gap is then strictly monotone in emission time, so its certified old-source root excludes any additional partner root, including a hypothetical emission after $T_c$. The self chord is shorter than its elapsed time and has no positive-delay root. Thus using completed old source support does not discard uncomputed extra hits; it follows from the complete root census until the first event. The old-source denominator and clearance stay positive at the incoming limit. The selected strict ordinary-root formulation ends there; the C2 all-root self-birth obstruction applies conditionally to an attempted unchanged classical crossing. This conclusion does not assign an outgoing continuation. **Actual original input admission remains unsupplied:** successful analytical receiving-test arithmetic alone does not certify the original launch's late fate.

The separately frozen [exact source-support inventory](../evidence/maxwell-shaped-overnight-adaptive-source-support.mjs) passed its synthetic width and nonempty-intersection diameter controls before the target. It binds the adaptive receipt SHA `5a3e76fdce5adce38aef75f63746c992afca00389c86ffa0ab48ba8274220b6e`. Exact folding of all 1006 contracted supports gives

$$
37.494016152341665292002102\le S\le37.727742612966784080784933.
$$

Initial root faces also require true source-position error bounds. Every interval-Newton step intersects its initial grid bracket, so the nonempty contracted interval lies within that initial bracket. For any initial point, the distance to a contracted point is no greater than the initial bracket's diameter. The exact maximum pre-query bracket half-width is $0.03674200408148544860387$. Enlarging the contracted union by twice this width and two outward $10^{-24}$ grid units encloses every initial bracket in

$$
[37.420532144178694394794360,\ 37.801226621129754977992675].
$$

Thus the clean complete-source guard $[37.42,37.81]$ is sufficient for all channels, and remains strictly below $T_c$. A true prefix certificate must supply all X/V/A errors on every closed-intersecting completed bin of that guard, including seam faces, before any root contraction. The source-position budget must cover initial root faces; narrower contracted support alone is not sufficient for those checks. The exact support inventory was independently assessed after a separately frozen nonempty-intersection diameter argument, with exact reconstruction of every width, union and receipt binding; the independent `reviewed-adaptive-support-diameter.json` retains that assessment. **Accepted derived conditional support inventory:** it does not upgrade the external checkpoint premise. Its falsifiers are an empty/incorrect interval intersection, a width larger than the exact inventory, a missing grid allowance, a source-error bin omitted at a closed face, or original checkpoint/source errors exceeding the declared budgets. The adaptive event implication is falsified by any failed strict majorant, old-source root face, positive-work or terminal speed witness, or a mismatch of the bound comparison/preparation bytes.

## 36. Frozen conditional terminal polar diagnostic

Before a polar target, select exactly Section 35's original full case, immutable adaptive receipt, exact receiving test, 1006-cell partition and original-prefix premises. On receiving cell $[T_j,T_{j+1}]$, the accepted nonnegative error majorant gives whole-cell position and velocity bounds equal to its retained endpoint bounds $e_{x,j+1},e_{v,j+1}$. Reconstruct the exact receiving test, including its cubic append from the retained midpoint jerk, and enlarge each coordinate of its X/V interval by those norm bounds. Such coordinate enlargement safely encloses the Euclidean error balls. Do not replace the source history or claim an actual curve after the first event.

For the resulting intervals $Q,U$, evaluate $r=|Q|$, $p_r=(Q\cdot U)/r$, $p_t=\det(Q,U)/r$, and $\dot\theta=\det(Q,U)/r^2$. Every division requires a strictly positive radius lower bound. An upper bound on $Q\cdot U$ below zero proves strictly inward radial motion throughout the incoming conditional interval; a positive determinant proves increasing angle. A uniform positive phase-rate lower bound and finite upper bound apply up to the unknown first event $T_*\in(38.3,38.4)$. Without a positive event-delay lower bound, this proves $0<\theta(T_*)-\theta(38.3)<0.1\sup\dot\theta$, not a fixed positive lower angle increment. Positive tangent or decreasing radius alone does not establish capture or stable binding.

The known-first wrapper must check signed 3-4-5 orthogonal and inward/outward inputs, nonzero X/V perturbations, positive-radius rejection, exact cubic X/V/A matching and exact contiguous time reconstruction. Its root/source/coupled-future premises remain Section 35's independently assessed conditional certificate. The target's scientific domain ends at the first true unit event even though the analytical receiving test extends farther. Its falsifiers are a coordinate box omitting the norm error ball, a failed radius division, incorrect determinant orientation, an uncovered receiving seam, a target curve inconsistent with the immutable cubic construction, or the unavailable original-prefix bridge. This freezes a conditional solution diagnostic, not a new event theorem or present original-launch admission.

## 37. Frozen conditional pre-event speed guard

Select the identical Section 35 receiving-test case and immutable whole-cell errors. On each exact cell, $|\mathbf u_{\mathrm{true}}|\le\sup|\mathbf u_C|+e_v$. Starting at $38.3$, accept consecutive cells as certainly preceding the first unit event only while this bound is strictly less than one. Stop at the first failed speed enclosure: it says only that this coarse bound cannot exclude an event in that cell. The right face of the last accepted cell is a conditional lower event-time bound. It does not change or discard later error/root cells and does not convert a failed speed enclosure into a measured crossing.

Together with Section 36's positive uniform phase-rate lower bound, a strictly later event gives a positive lower phase increment: $\inf\dot\theta\,(T_{\mathrm{guard}}-38.3)<\theta(T_*)-\theta(38.3)$. Use the independently accepted receiving-test upper event horizon for the upper bound. Similarly a uniform negative radial-velocity upper bound gives a positive decrease from the actual radius at $38.3$ before the event, at least $-\sup p_r\,(T_{\mathrm{guard}}-38.3)$. These are conditional bounds on an incoming interval and do not assert global monotonic radius or stable binding.

A separate successor must preserve the polar target and add known strict/failed/equality first-speed controls before selecting a real guard. Exact partition, derivative-compatible receiving jets, original checkpoint/source admission and whole-cell velocity errors are mandatory. Its falsifiers are a cell skipped after a failed guard, use of a nearest-binary speed as an outward bound, a terminal test velocity treated as an actual post-event velocity, or absent original-prefix tolerances. No particular guard value is selected by this frozen statement.

The [polar predecessor](../evidence/maxwell-shaped-overnight-adaptive-terminal-polar.mjs) and separate [speed-guard successor](../evidence/maxwell-shaped-overnight-adaptive-speed-guard.mjs) passed their signed polar/error, cubic, exact time and strict/equality/failed speed controls before their respective targets. **Accepted derived conditional diagnostics:** all 1006 incoming cells have radius in $(0.2142358,0.2937060)$, radial velocity in $(-0.942509,-0.650675)$, tangential velocity in $(0.566926,0.711205)$ and phase rate in $(2.158321,3.319437)$. The consecutive certainly-subfield prefix ends at the exact time

$$
T_{\mathrm{guard}}=421651958471661843/10995116277760000>38.349.
$$

Hence the conditional first event lies in $(38.349,38.4)$. Its angle increment from $38.3$ lies in $(0.1058057,0.3319437)$, and its radius decreases by more than $0.0318975$ from its actual value at $38.3$. These conservative decimals follow from exact outward interval/rational witnesses; the failed next speed enclosure is not a crossing measurement. This proves sustained inward terminal motion under the stated prefix premises, not all-history monotonic contraction or capture.

The [independent reference](maxwell-shaped-overnight-independent-reference.md) separately reconstructed all exact Hermite/cubic cells through its frozen Gaussian endpoint system, evaluated its own interval polar bounds, checked the same exact first guard, input hashes and whole-cell error use, and accepted the target after independent signed-polar/speed controls. The reference retains `reviewed-adaptive-terminal-polar-guard.json`; our separate predecessor/successor receipts remain in their ignored owner. The original $T_c$ and whole-source-guard tolerances remain unsupplied, so every result here is conditional on that actual-history bridge. At the incoming event, the polar signs follow by continuity; no actual post-event angle or radius is integrated.

## 38. Frozen constant-generator and forcing propagator preparation

Select the signed completed-source error equation of Section 34. On a receiving cell let $B$ be any constant real $4\times4$ matrix and write the true error matrix as $B+\Delta M(T)$. Choosing $B$ is a comparison calculation, not an equation modification, equilibrium or stability claim. For a proposed componentwise whole-cell error envelope $E$ and completed source/defect forcing bound $f$, define $g=|\Delta M|E+f$. Variation of constants yields the componentwise bound

$$
|Z(T_c+t)|\le |\Phi_B(t)|\,|Z(T_c)|+\int_0^t|\Phi_B(s)|\,ds\,g,
\qquad\Phi_B(t)=e^{Bt}.
$$

Unknown forcing can vary in time and change direction. The signed constant-forcing matrix $\Psi_B(t)=\int_0^t\Phi_B(s)\,ds$ cannot in general replace the absolute kernel integral. A simple validated choice is $\int_0^t|\Phi_B(s)|ds\le t\sup_{0\le s\le t}|\Phi_B(s)|$ componentwise. Both whole-cell and endpoint propagation must retain the entire interval, all matrix residual and completed source-acceleration forcing. Accept only if the computed whole-cell envelope strictly improves the proposed envelope and every root/source/domain condition. An exact constant forcing remains a useful separate analytical control for $\Psi_B$, with no transfer to arbitrary source forcing.

For rational $B$, compute a finite interval Taylor matrix through degree $N$ on $t\in[0,h]$. With $a=h\|B\|_\infty$ and $a<N+2$, its discarded exponential tail is bounded in induced infinity norm by

$$
\rho_N=\frac{a^{N+1}}{(N+1)!}\frac1{1-a/(N+2)}.
$$

Indeed successive omitted terms have ratios no greater than $a/(N+2)$; the resulting geometric series supplies the bound without numerical exponentiation. Enlarge every matrix entry by $[-\rho_N,\rho_N]$. The same procedure gives the signed constant-forcing propagator through the augmented matrix $\begin{pmatrix}B&f_0\\0&0\end{pmatrix}$, whose top-right exponential column is exactly $\Psi_B(t)f_0$. All grid roundoff must be outward before adding the rational tail. For arbitrary forcing, the componentwise absolute bound from the whole-time exponential matrix is the production obligation.

Known controls are the stationary comparison Jacobian $A_X=\operatorname{diag}(1/4,-1/8)$, $K=0$ from Section 34, including both exact harmonic and hyperbolic propagator blocks, and a nonzero constant acceleration forcing. Their two-coordinate displacement/velocity responses are $4(\cosh(t/2)-1)a_x$, $2\sinh(t/2)a_x$, and $8(1-\cos(t/\sqrt8))a_y$, $\sqrt8\sin(t/\sqrt8)a_y$. A zero generator gives $\Phi=I$, $\Psi=tI$ and the whole-time absolute forcing bound $tI$. These are separately checkable linear input controls, not stationary-binary solutions. A time-varying forcing control must also expose cancellation danger: one full-period harmonic kernel has zero signed integral but a strictly positive absolute integral, so a signed constant-forcing shortcut would incorrectly suppress an admissible changing input.

**Derived propagator-preparation subject; no trajectory target selected.** A new instrument must pass those controls before any target matrix. A separately frozen root/Jacobian/variation-of-constants reference is required before source review. Its falsifiers are a wrong Taylor factorial or tail, a whole-time matrix interval omitting a harmonic extremum, signed rather than absolute treatment of changing source forcing, loss of a delayed source-A/J or seam term, or failure of the proposed whole-cell first escape. The scalar original-prefix attempt remains separate, and this preparation admits no later original history by itself.

The [constant-generator instrument](../evidence/maxwell-shaped-overnight-constant-matrix-propagator.mjs), source SHA `ebaab701fc930c8da9899625d07cbc6c52fb6fb00371ca9f94e720586096bd86`, passed both exact scalar oscillator blocks, their nonzero constant acceleration response, zero-generator identity/absolute integral, and opposite harmonic quarter-sign controls. The independently evaluated scalar reference solves $x''=a x$ directly with exact rational factorial series and a separate geometric tail; it does not call the matrix exponent routine. The rational matrix uses $N=24$, $h=1/10$ on these controls. Its discarded matrix tail is exactly $1/154515515431643283456000000000000000000000000000000$. The durable ignored `constant-matrix-propagator-known.json` records controls only, with no binary matrix target or true history admission. The [independent reference](maxwell-shaped-overnight-independent-reference.md) froze its root/Jacobian and variation-of-constants argument before reading this subject, then assessed the Taylor/geometric-tail, entire-time absolute forcing and scalar-control sources and reran the controls. **Accepted conditional propagator/control preparation:** no actual trajectory target or efficiency advantage is claimed.

## 39. Frozen broader conditional receiving-test tolerance case

Before target use, retain the same original full $\beta=0.3$ preparation, original fine history bytes, completed checkpoint $T_c=38.3$, original exact quintic through $T_0$ and Section 32's unchanged cubic right-jet selection. Select the separate receiving horizon $T_f=38.45$. Require actual endpoint X/V errors at most $0.005,0.01$ and completed source X/V/A errors at most $0.005,0.005,0.03$ on the entire declared guard $[37.15,38.25]$. These are proposed external input budgets, not observations of the current original-prefix producer.

Use global receiving error radii $0.03,0.15$, exact cells of width at most $0.0001$ split at original receiving seams and $T_0$, and pre-query local margins $r_x=e_x+0.0001$, $r_v=e_v+0.001$. The floating root supplies only a seed. Choose its initial half-width as $4\Delta T+10^{-8}+3(r_x+0.005)$, then require both uniform root faces and every initial bracket to lie inside the declared old-source guard. The multiplier three is an interval seed-bracketing choice, not a response factor; a failed face or old-support check rejects the case. The actual root certificate still comes from strict outward gap faces and interval-Newton intersections, not from that multiplier. Changing this complete case later requires another retained successor.

Retain the full receiving skew transport, completed source-A forcing and all comparison-J root-shift contributions, exact nonnegative whole-cell majorants, upward error rounding, strict local/global first escape, exact speed-gap and positive-work obligations. Test velocities beyond one remain receiving comparison values only. An accepted case would imply a first incoming transverse unit event before $38.45$ only if its true original checkpoint and entire guard budgets are separately admitted. A failed error/support/work or speed gap is an enclosure limitation for these exact proposed tolerances and says nothing about actual capture or fate. The earlier accepted narrow case and its receipts remain unchanged.

The [broader conditional instrument](../evidence/maxwell-shaped-overnight-original-test-event-broad.mjs), source SHA `d2928ff61395e875a780339326cd726ef50dcc42badaedbae9c65bd717866c9f`, passed all unchanged response/root/chain-rule/majorant controls and the exact broader bracket-width control before target. **Measured conditional-enclosure limitation:** its 462-cell target stopped at exact time $3372936636155756993/87960930222080000$, approximately $38.34585$, because its receiving-velocity error reached $75163884104484907048733/500000000000000000000000>0.15$. This occurs before the original last comparison knot. Its accumulated work lower enclosure also became negative; that interval failure does not imply negative actual work. Transmitter denominator, sampled range, current clearance and declared complete old-source support remained positive/valid. The unused future test speed is not combined with a partial error bound: terminal `speedGap` is null. The ignored `original-full-test-event-broad.json` preserves every exact partial row and stopping witness. Independent source/stopping assessment is pending; this target supplies no event certificate or original-prefix admission. The earlier narrower accepted case remains unchanged.

## 40. Frozen conditional original-prefix first-domain-loss lemma

Select an original complete compatible C2,1 preparation and a finite checkpoint $T_c$. A **conditional prefix** is distinct from a successful subfield-prefix certificate. Its proof hypothesis is that no true unit-speed event has occurred up to the time under consideration. The hypothesis gives actual receiving and source speeds strictly below one, although their analytical coordinate/error boxes may include larger speeds. Intersecting actual coordinate-velocity boxes with $[-1,1]$ is then valid; a comparison velocity above one is not an actual history or an outgoing equation.

A conditional prefix must still close every error and geometry obligation. At each exact receiving cell, its chosen input cylinder must contain the initial errors; every whole initial/root-refined source interval must lie strictly inside completed earlier actual history or the complete prepared past; all X/V/A source errors and comparison-J root shifts must be retained; and the positive whole-cell error majorant must strictly improve its chosen local/global envelope. Uniform positive current separation, sampled range and transmitter denominator, bounded acceleration and complete ordinary root census must hold. Under the no-event hypothesis, strict subfield paths give a unique partner root and no positive-delay self root; a certified old-source bracket thus excludes additional uncomputed partner hits. A source interval in an uncompleted future or a failed error bound invalidates the conditional prefix. Omitting only the receiving **speed upper-bound success test** does not excuse any of these other obligations.

On a finite cell with strict positive delay to completed source history, the selected equation is an ordinary differential equation for current X/V with its older C2 acceleration already prescribed. Its root map has positive denominator and the response is locally Lipschitz in current X/V. Bounded errors/acceleration and improving root/clearance margins exclude other finite escape faces inside that cell. The initial C2,1 history and finite delay generations provide the needed local incoming continuity; no true jerk is inferred from an acceleration-error estimate. Therefore cell induction yields this alternative: either the actual original trajectory reaches its first unit boundary during the prefix, or its true state and completed history at $T_c$ satisfy the certified conditional endpoint/source budgets. In the earlier-event alternative, rows after that boundary remain hypothetical conditional data and are not actual retained history.

Now suppose those $T_c$ budgets satisfy an independently assessed Section 30/33 receiving-test theorem with horizon $T_f>T_c$, all sources in its complete earlier guard and a strictly positive terminal reverse-triangle speed gap. If no unit event occurred through $T_f$, the conditional prefix would supply the actual checkpoint/source premises and the receiving-test majorant would contradict strict subfield speed at $T_f$. Hence the actual original strict formulation suffers its first unit boundary no later than $T_f$, either during the conditional prefix or in the receiving-test interval. This is a bounded first-domain-loss theorem only after **all** conditional prefix tolerances and geometry obligations are checked. It does not transform a currently failed v6 receipt into success.

A transverse event and the C2 unchanged all-root crossing obstruction require a separately positive work bound at every possible event location. Section 35's terminal work proves that only for an event after $T_c$ in its certified cylinder; it does not automatically cover a possible earlier prefix event. Positive incoming clearance follows only where the corresponding prefix or receiving-test geometry bounds were actually certified. A speed-one touch without a checked positive longitudinal acceleration is a named strict-domain boundary, with no asserted C2 transverse obstruction or selected continuation.

An exact acceleration-input logical control is $v(t)=0.9+0.2t$: its first unit event is $t=1/2$. A loose enclosing speed upper bound can cross one earlier than the actual speed without identifying an event; conditional no-earlier-event induction is still logically valid, whereas declaring an unconditional subfield prefix from that loose box is not. A future numerical conditional-prefix driver must pass an independently known earlier-event/no-event control before target use and preserve original failed speed/error results unchanged. **Derived logical subject frozen before any conditional original-prefix target.** Its falsifiers are a missing completed source-A input, an uncompleted delayed root, a failed whole-cell error/geometry margin, an unexcluded finite escape, a conditional row used as actual history after an earlier event, or a transverse claim outside a checked positive-work window.

## 41. Frozen account of majorant growth channels

Select only Section 39's retained conditional-enclosure failure, with its exact row coefficients and original receiving test unchanged. This is an account of a **proof bound**, not actual trajectory-error attribution or an equation/source ablation. For a frozen cell of width $h$ and coefficient $C$, the positive ordinary recurrence with no receiving-velocity norm term is linear:

$$
\begin{pmatrix}x_+\\v_+\end{pmatrix}
=\frac1{1-h^2C}\begin{pmatrix}1&h\\hC&1\end{pmatrix}\begin{pmatrix}x\\v\end{pmatrix}
+\frac1{1-h^2C}\begin{pmatrix}h^2\\h\end{pmatrix}c.
$$

Its denominator must be positive. Split initial X and V bounds into separate initial channels and the forcing $c=Cp_x+L_vp_v+L_ap_a+\delta$ into completed source X, source V, source A and comparison-defect channels. Every source contribution remains in the total; no actual source acceleration is set to zero. The exact upward grid pulses are the retained next bounds minus the one-step unrounded recurrence on the retained incoming bounds. These nonnegative pulses form a seventh channel and are propagated by the same positive transfer matrix.

A channel instrument must check exact linear additivity and nonnegative outward rounding on a known synthetic input before the target. To avoid unbounded rational denominator growth, retain each channel in an outward $10^{-24}$ interval after each exact one-step transfer. The sum of all channel intervals must contain the retained exact error witness at every row. Report the last accepted receiving cell separately from the first rejected candidate cell; do not reinterpret the failed cell as an actual history. Channel shares are shares of this fixed majorant only. Dominance can suggest which certificate inventory to tighten, but establishes neither actual error origin nor physical fate, and cannot license a reduced source budget without a separately certified original history.

**Frozen conditional certificate diagnostic before target.** Its falsifiers are a missing source-A or defect channel, negative rounding pulse, denominator at or below zero, failed exact synthetic additivity, channel sum excluding a retained witness, changed input coefficients/case bytes, or physical attribution made from this majorant account. No new response or conditional original-prefix target is selected.

Section 40's conditional-prefix lemma was independently assessed after the separately fixed no-event/existence/first-escape reference and is **accepted conditional derived**. Its proof cannot waive any failed original error or geometry bound. The [independent assessment](maxwell-shaped-overnight-independent-reference.md#conditional-prefix-logic-and-broader-proof-bound-diagnostic-assessment) retains the disjunction and separate work-window requirement.

The [channel account](../evidence/maxwell-shaped-overnight-majorant-channel-account.mjs) passed exact known forced transfer, additivity and directed rounding controls before its target. Its independent Fraction checker, authored after a separately fixed additive reference, checked all 462 exact rows, every nonnegative grid pulse, channel sums, local/global comparisons, exact partition and input binding. **Accepted derived account of this fixed proof bound:** at the 461st accepted cell, initial-position and source-position channels each contribute between $36.5885\%$ and $36.5886\%$ of the velocity majorant. Source velocity contributes between $10.1312\%$ and $10.1314\%$, initial velocity between $8.5646\%$ and $8.5648\%$, source acceleration between $8.1256\%$ and $8.1258\%$, and direct receiving comparison defect between $0.00130\%$ and $0.00131\%$. Upward rounding is below $5\times10^{-18}\%$. The failed 462nd candidate is separately retained, with no physical prefix extension.

The equality of the two position-channel velocity contributions has an exact explanation: when initial-position and source-position budgets both equal $p$, their channel states differ by the constant vector $(p,0)$. The displayed transfer sends this difference to $(p,0)$ after subtracting the source forcing $(h^2Cp,hCp)/(1-h^2C)$. This holds with varying frozen $C,h$; it is not a measured physical error correlation. For this broader certificate, refining the direct receiving comparison defect alone cannot materially reduce the failed velocity bound. Improving certified checkpoint/source spatial uncertainty is the more decisive proof target. That inference concerns the bound and is falsified by a changed majorant/input budget or a channel account inconsistent with the retained rows; it does not identify the true numerical error or justify omitting source acceleration.

## 42. Frozen separate E-only incoming receiving-test case

Select the original E-only $\beta=0.3$, $K=c_f=1$ finite opposite-polarity mirror planar preparation, with its own complete compatible C2,1 past and separate coupled E future. The retained fine incoming history is `b03-E-checked-event999-h0.00125.history.json`, SHA `187bc2739487ff983b3b095451c9b961d1fa5212d70f96a1eb4ebf7721b0a495`; its last stored knot is $T_0=59.5259886465955$. Its complete analytical past and first 10081 exact knot jets agree with the original fine E T35 comparison through the independently checked shared endpoint. It is not the original full history and cannot serve as an identical-history ablation by substitution.

Before target use, select completed checkpoint $T_c=59.5$, receiving-test horizon $T_f=59.57$, actual endpoint X/V tolerances $0.001,0.005$, and completed source X/V/A tolerances $0.001,0.001,0.01$ on the whole declared guard $[58.95,59.35]$. Select global error radii $0.01,0.05$, local margins $e_x+0.00002,e_v+0.0002$, exact cells of width at most $0.0001$ split at receiving seams and $T_0$, and initial root half-width $4\Delta T+10^{-8}+10(r_x+0.001)$. Require every initial/refined source bracket inside the declared guard and strict old-source root/range/D/current-clearance margins. These input tolerances are proposed external premises, not actual original-history measurements.

The receiving test retains the original exact E quintic through $T_0$ and appends a C2 cubic whose rational right jerk is the midpoint of the E ordinary-row derivative enclosure at that literal knot. It uses all delayed source A/J terms through $F_r(\mathbf u-\sigma\mathbf v_s)+F_v\sigma\mathbf a_s+F_a\sigma\mathbf j_s$; $F_u=0$ for E. In particular zero receiving velocity does not remove the $F_v\mathbf a_s$ term. A transverse-source control at $r=(2,0)$, $\mathbf v_s=0$, $\mathbf a_s=(0,0.03)$, $\mathbf j_s=\mathbf u=0$ gives row jerk $(0,0.0075)$, even if the receiving acceleration is nonzero. This is a source-acceleration dependence control, not a prescribed coupled orbit. The future cubic remains a receiving test only, with no adopted outgoing all-root equation or post-checkpoint source.

The conditional receiving-test and conditional-prefix logical lemmas apply separately to this E case. Every whole-cell positive error, exact terminal speed and signed-work witness must pass before an incoming event/transverse C2 obstruction is asserted. Source acceleration remains mandatory in the E ablation. A full field evaluated on these same complete E inputs may be recorded only as an identical-input comparison, not the full law's separate future. The known E chain-rule/cubic/root/majorant controls and independently assessed source mathematics must precede a target. **Separate complete case frozen; no E receiving-test target admitted here.** Its falsifiers are changed E past bytes, confusion with full histories, missing delayed A/J, source outside completed support, failed root/error/work/speed witness or unavailable original E checkpoint/guard budgets.

The [separate E receiving-test instrument](../evidence/maxwell-shaped-overnight-original-E-test-event.mjs), source SHA `0e611d27a6b48ccd20b697be5e21a06ff4c292c4b9fd29e776138e4d7c4ea60f`, passed `--known` before any E target: stationary row derivative, delayed jerk, E transverse-source acceleration derivative, exact cubic jets, binary-time C2 seam, outward positive rounding, ordinary majorant and unchanged field/root controls. Its target remains pending independent source review; the original E checkpoint/source error premises remain unsupplied.

Section 42's source was independently assessed before the target, with E $F_u=0$ and the source-acceleration jerk control separately verified by the frozen potential-derived instrument. **Measured conditional-enclosure limitation:** the selected $59.57$ target stopped at its 658th candidate, exact time $1047887158097457057/17592186044416000$, approximately $59.5654886466$, when velocity error exceeded $0.05$. The exact candidate error is $12539571395239464768083/250000000000000000000000$. Its recorded speed gap is null. Uniform work lower enclosure remained above $0.217658$, range above $0.374627$, denominator above $0.939758$ and current separation above $0.275674$ on its candidate boxes. The original E checkpoint/source budgets remain unsupplied. This is not an actual event or negative fate result; the last rejected candidate cannot extend its earlier accepted conditional error prefix. The separate ignored `original-E-test-event.json` retains all rows and witnesses without replacing the accepted full case.

## 43. Frozen signed spatial and source-translation error transport

Retain a derivative-compatible receiving comparison and completed C2,1 comparison source history on a fixed original-source guard. At the actual root $S_a$, first remove actual source V/A errors directly from the response inputs while keeping that root and separation fixed. Their response difference is bounded by $L_vp_v+L_ap_a$, with actual/nominal velocity and acceleration convex input boxes; no source A is removed from the total. Then put $\boldsymbol\xi=\mathbf X_s^{\rm actual}(S_a)-\mathbf X_s^C(S_a)$ and translate the entire comparison source by this **constant** vector. Its translated root at the actual receiving position is exactly $S_a$. This is a mean-value comparison template, not a new physical past or a coupled-source replacement.

Along translation $\theta\boldsymbol\xi$, $0\le\theta\le1$, the root clock differentiates the comparison source position, whose derivatives are comparison V/A/J. With $D_C=1-\mathbf n\cdot\mathbf v_C$,

$$
\delta S=\frac{\mathbf n^{\mathsf T}\delta\boldsymbol\xi}{D_C},\quad
\delta\mathbf r=-\left(I+\frac{\mathbf v_C\mathbf n^{\mathsf T}}{D_C}\right)\delta\boldsymbol\xi,
\quad
\delta\mathbf v_C=\frac{\mathbf a_C\mathbf n^{\mathsf T}}{D_C}\delta\boldsymbol\xi,
\quad
\delta\mathbf a_C=\frac{\mathbf j_C\mathbf n^{\mathsf T}}{D_C}\delta\boldsymbol\xi.
$$

Thus the translation derivative is exactly $-A_X^C$, where

$$
A_X^C=F_r\left(I+\frac{\mathbf v_C\mathbf n^{\mathsf T}}{D_C}\right)
-\frac{(F_v\mathbf a_C+F_a\mathbf j_C)\mathbf n^{\mathsf T}}{D_C}.
$$

The field partials in this displayed operator use **nominal comparison source V/A**, the translated relative geometry and the actual receiving velocity. In particular its clock denominator is $D_C$, not a borrowed actual-field denominator computed after adding source-velocity error. Every initial bracket, translated root, relative-position segment and comparison-J seam hull must lie in the preselected guard and input box. C2,1 source acceleration permits the weak/a.e. chain rule across its seams. No actual source jerk is inferred from an acceleration-error budget.

The actual-source position forcing can therefore use $L_Xp_x$, with $L_X=\sup\|A_X^C\|_2$, rather than the triangle $C_xp_x$ of Section 28. The receiver-position difference uses the same signed operator over its own position segment, followed by the skew $K_C\mathbf e_v$ at the comparison receiving geometry. A common envelope may cover both position families. The error equation is Section 34's signed $4\times4$ system with source/defect forcing norm at most $L_Xp_x+L_vp_v+L_ap_a+\delta$. This preserves cancellations inside the delayed clock derivative while retaining independent source V/A errors. It changes a certificate bound, not the selected response law or complete histories.

For a constant generator $B=\begin{pmatrix}0&I\\B_X&B_K\end{pmatrix}$ chosen inside a preselected whole-cell input calculation, let $R_X$ bound $\|A_X^C-B_X\|_2$ and $R_K$ bound $\|K_C-B_K\|_2$. Proposed whole-cell norm radii $E_x,E_v$ give lower-block residual/forcing bound $g=R_XE_x+R_KE_v+L_Xp_x+L_vp_v+L_ap_a+\delta$. With $\Phi_B(t)$ partitioned into position/velocity $2\times2$ blocks, whole-cell bounds use the supremum of each block norm on $0\le t\le h$ and absolute forcing-kernel integration. Endpoint bounds may use the sharper endpoint blocks but must retain whole-time forcing kernels:

$$
 e_x(h)\le\|\Phi_{xx}(h)\|_2e_x(0)+\|\Phi_{xv}(h)\|_2e_v(0)+h\sup_{0\le t\le h}\|\Phi_{xv}(t)\|_2g,
$$

$$
 e_v(h)\le\|\Phi_{vx}(h)\|_2e_x(0)+\|\Phi_{vv}(h)\|_2e_v(0)+h\sup_{0\le t\le h}\|\Phi_{vv}(t)\|_2g.
$$

Strict improvement of the proposed whole-cell radii and all old-source/root/clearance bounds is mandatory before accepting even one endpoint. A signed constant-forcing integral cannot replace those absolute kernel bounds. Actual source acceleration remains in $L_ap_a$, and a future coupled-history use must retain the resulting entire-cell acceleration-error inventory too.

Known signed controls are static $A_X^C=\operatorname{diag}(1/4,-1/8)$ and opposite source-translation derivative; an affine source with $\mathbf v_C=(1/5,0)$, delayed range $R=5/2$, $D_C=4/5$, zero A/J/current velocity gives $A_X^C=\operatorname{diag}(6/25,-3/25)$ and the negative translation derivative. A source-J control at $r=(2,0)$, zero V/A/current velocity and $\mathbf j_C=(0,0.05)$ gives the additional entry $(A_X^C)_{21}=-0.025$. The transverse-source-A control $\mathbf a_C=(0,0.03)$ gives $(A_X^C)_{12}=-0.0075$, $(A_X^C)_{21}=-0.015$, while full $K_C$ has off-diagonal entries $0.015,-0.015$. These are response-input controls, not equilibria or trajectories.

**Derived signed spatial/forcing subject frozen before instrument target.** Its independent reference was fixed before reading this argument. A target must separately fix its receiving interval, entire source guard, actual error budgets, proposed envelope, rational generator and full source/defect bindings. Its falsifiers are a wrong translation sign, actual rather than comparison clock/J used in the mean-value family, a missing source-A offset, source/translation path outside the guard, failed signed controls or Taylor tail, or failed whole-cell first escape. No performance or actual original-prefix improvement follows from this identity alone.

The [independent reference](maxwell-shaped-overnight-independent-reference.md) fixed its constant-translation clock argument before reading Section 43 and accepted the nominal-clock derivative, direct V/A offsets, weak seam chain and entire-time first escape at **conditional derived** grade. The [signed spatial helper](../evidence/maxwell-shaped-overnight-signed-spatial-transport.mjs), SHA `199d6ebb45618e70051ad03b111df241e9c60269774696e0c162c98e822a7865`, passed static, affine, transverse A/J, skew, whole-time forcing and rejected-envelope controls before a target. Two initial known-envelope assertions were too sharp for the conservative interval block-norm/grid floor; they were relaxed to valid enclosing controls before target use, preserving the failed local receipt. The helper's independent source assessment is pending. No target or actual checkpoint premise is supplied by this known-only receipt.

## 44. Frozen bounded signed spatial transport case

Select only the original full $\beta=0.3$ complete compatible preparation and fine comparison bytes of Section 33, SHA `c8efbc9f7102661333fff29d0c7bb42c43982cf8740fac4b670953511c4a0af6`. Use the exact original quintic receiving comparison on the single cell $[38.3,38.301]$, with no new receiving append or coupled evolution. Declare the entire completed-source guard $[37.15,38.25]$, initial actual receiving X/V norm errors $0.005,0.01$, completed actual source X/V/A errors $0.005,0.005,0.03$, and proposed whole-cell Euclidean receiving norm radii $0.0051,0.015$. These remain hypothetical error budgets; no actual original prefix currently admits them.

Choose the floating root only as a seed, with initial half-width $4h+10^{-8}+3(E_x+p_x)$; assert its whole bracket lies in the declared guard before root queries. Certify whole-cell root faces and interval-Newton intersections using actual position errors, then enclose all receiving-position and constant-source-translation mean-value families in that same whole guard and relative-input cylinder. Under the no-earlier-unit-event hypothesis, actual coordinate receiving velocities may be clipped to $[-1,1]$; the comparison velocity and comparison-clock V/A/J remain unaltered. Require source guard, positive D/range/current clearance and strict old delay. These are prerequisites for the bounded transport, not inferred from its output.

Use nominal comparison source V/A/J in the signed $A_X^C$ and receiving-skew matrix; use separate convex actual/nominal source V/A input boxes for $L_v,L_a$. Choose the constant rational generator as the midpoint of those preselected signed matrix enclosures, with top blocks exactly $0,I$, and use $N=24$ outward Taylor propagation. Retain the unchanged exact comparison-defect instrument, all completed source-A forcing and whole-time block-norm forcing kernels. Reject if the proposed whole-cell radii fail strict improvement. The same preselected input box also supplies Section 28's triangle spatial coefficient, for a comparison of two certificate coefficients on identical inputs; this is neither a timing claim nor a comparison of physical laws.

**Complete bounded matrix case frozen before target.** Known controls and independent helper/wrapper review must precede the target. Its scope is one conditional receiving cell; it cannot admit the proposed true history, extend the actual original prefix or establish a fate. Falsifiers include a mismatch of original comparison bytes, an initial/translated clock root outside the completed guard, an actual rather than comparison source jerk, altered physical law or omitted source-A forcing, failed signed controls/Taylor tail, or a whole-cell error envelope that does not strictly improve.

Independent pre-target helper review identified two required exported-input guards: the constant generator's top rows must be exactly $(0,0,1,0)$ and $(0,0,0,1)$ because only its lower-block residual is enclosed, and every norm/forcing budget must be nonnegative. The frozen helper bytes remain unchanged. A separate [guarded successor](../evidence/maxwell-shaped-overnight-signed-spatial-guard.mjs), SHA `f37c79b195757bb7b471df28a41fc6047c53fed6272341b49f459cec4e1863b8`, enforces those requirements and passed correct/wrong-top and negative-source-A/initial-norm controls before target. The [one-cell wrapper](../evidence/maxwell-shaped-overnight-signed-spatial-cell.mjs), SHA `7cb6b6b2857972f13f91978399a1c7b248e7bc0654a4b9e3831c98b141d6d313`, passed all known controls and awaits independent source assessment. Earlier known/control receipts and the unguarded helper are preserved; production use is through the guarded successor. Repeated long-window axis resets can discard harmonic cancellation, so this one-cell experiment promises no long-window transport advantage.

Independent guard/wrapper source assessment then accepted the exact kinematic blocks, nominal clock versus direct V/A inputs, full translated/receiving relative cylinder, old-source support and whole-time first escape **before** target. **Accepted derived one-cell conditional transport:** the subject's whole-cell position/velocity errors are below $0.00501363,0.01137169$, strictly improving the proposed $0.0051,0.015$; endpoint errors are below $0.005011555,0.011358290$. Range, both clock/field denominators, current clearance and completed source support remain positive. On this same declared cylinder the subject's signed spatial norm bound is below $89.3924383$, versus its older triangle bound below $149.4508154$. These are instrument-specific certificate coefficients, not actual error magnitudes or two independently sharp measurements of the same norm.

The [independent reference](maxwell-shaped-overnight-independent-reference.md) used its separately frozen nested-potential Cartesian Jacobian, its own Frobenius norm and its own cosh/sinh ordinary majorant on the supplied whole-family physical input boxes. Its independently enclosed spatial coefficient is approximately $96.07$ and its whole-cell velocity bound approximately $0.01132$, independently closing the same proposed radii. A separate successor of its cell checker passed a new zero-crossing interval-square control before its v2 target; earlier diagnostics are preserved. The durable `reviewed-signed-cell-v2.json` binds the subject target receipt SHA `39e1e1834c4d4a9252a6b4422968f447eff5900a6f235e1749fcab66daa6ad97`. Thus the one-cell conclusion has independent support even though the two instruments use different conservative norms. No original-prefix budget is supplied, and no long-window, matrix superiority or resource-cost claim follows.

## 45. Frozen earlier restriction of the E conditional receiving test

Select exactly Section 42's unchanged E receiving test and retained failed $T_f=59.57$ receipt, preserving its selected source guard, initial/source error premises, comparison history bytes and rational cubic jerk. Choose a separate earlier horizon $T_f^{\rm restricted}=59.56$. Use only accepted parent receiving cells; exclude the first failed candidate and every later row. Reconstruct all time faces from exact parent cell widths starting at $59.5$. If the selected horizon lies inside an accepted parent cell, retain that parent's **whole-cell** X/V errors, root/source bounds, signed work and clearance/D/range enclosures on the restricted final cell. The nonnegative error majorant bounds every earlier point in the parent cell, so this is conservative. It cannot establish a later time than the parent's accepted coverage.

Keep the exact original quintic and original selected cubic polynomial. Appending the same cubic's X/V/A endpoint at any later time reconstructs that same degree-three polynomial through degree-five Hermite uniqueness; it must not reselect jerk or change any original knot. Evaluate the receiving test's exact speed at $59.56$ and subtract the inherited final whole-cell velocity error. A strictly positive result after subtracting one gives a conditional first-unit contradiction by the accepted receiving-test argument. Require the original strict initial velocity ball and positive work on every retained cell to attach transversality and the conditional C2 obstruction. The original whole guard $[58.95,59.35]$ and every original true checkpoint/source error premise remain unchanged and unsupplied.

**Separate restricted case frozen before target.** The failed longer horizon and null longer-horizon speed gap remain preserved. Known exact contiguous/truncated cell, exclusion of a failed candidate, monotone inherited error, cubic-identity and strict/equality speed-gap controls must precede this restriction target. Independent generic restriction reasoning was fixed before reading this section. Its falsifiers are a failed parent row included, a time beyond accepted parent coverage, smaller unproved final-cell errors, reselected cubic jerk, altered past bytes, nonpositive retained work/speed gap, or missing true E checkpoint/source budgets. No field rerun, new coupled evolution or original-history admission is selected.

The [E restriction adapter](../evidence/maxwell-shaped-overnight-E-test-restriction.mjs), SHA `06582df7bdde4a79d37e05640d614e12b441053cab3dd811185f0a1b93c5458d`, binds the unchanged longer-horizon receipt SHA `17e5e2d894b2790a48ed13e59a7063455e48f0bc5aeb284a98b65c2cd24164ed`. It passed exact synthetic truncated coverage, rejected candidate exclusion, inherited whole-cell errors, unchanged cubic and strict/equality gap controls before any target. Independent source assessment is pending; no restriction outcome is asserted here.

The source was subsequently accepted before target use. **Accepted derived conditional E event certificate:** the restriction covers 604 exact parent cells through $59.56$ and excludes the failed later candidate. Its inherited position/velocity errors are below $0.002118507,0.041633170$; its exact terminal reverse-triangle speed gap is

$$
15868216130399535079247/500000000000000000000000>0.0317364.
$$

Initial comparison speed plus the declared velocity error is strictly below one. Retained work is above $0.4721694$, denominator above $0.9462361$ and range above $0.3810023$. The [independent reference](maxwell-shaped-overnight-independent-reference.md) checked all 604 exact cells, inherited whole-cell first escape, its own cosh/sinh ordinary majorant, exact Gaussian-Fraction Hermite/cubic reconstruction, byte bindings, strict initial ball and terminal speed gap. Its first two broad potential-work boxes failed by dependency inflation and are preserved; a separately derived E-potential contraction then passed stationary/affine/transverse known controls before target and certified positive work above $1.19$ on these inputs. Its durable `reviewed-E-restricted-test-v3.json` records this assessment. Consequently a first incoming transverse unit event lies in $(59.5,59.56)$ **only if** the declared original E checkpoint and entire $[58.95,59.35]$ source guard errors are separately certified. Those premises remain unsupplied: no original-launch fate or actual event is admitted here. The failed $59.57$ receipt remains unchanged.

## 46. Frozen exact delayed-acceleration operator norms

On one ordinary hit let $R>0$, $\mathbf n$ be its unit direction, $D=1-\mathbf n\cdot\mathbf v_s>0$, and $\mathbf v_T=\mathbf v_s-(\mathbf n\cdot\mathbf v_s)\mathbf n$. Ignoring a polarity sign, the E dependence on delayed source acceleration is the linear operator

$$
B_E=\frac{(\mathbf n-\mathbf v_s)\mathbf n^{\mathsf T}-D I}{R D^3}.
$$

Its output lies in $\mathbf n^\perp$. In the orthogonal decomposition $\mathbb R\mathbf n\oplus\mathbf n^\perp$ its nonzero row block is $(-\mathbf v_T,-D I_T)/(R D^3)$. Thus in three dimensions its two nonzero singular values are

$$
\frac{\sqrt{D^2+|\mathbf v_T|^2}}{R D^3},\qquad\frac1{R D^2};
$$

the first is the operator norm. In the plane there is one nonzero singular value, equal to the first expression. This follows from $B_EB_E^{\mathsf T}=(D^2I_T+\mathbf v_T\mathbf v_T^{\mathsf T})/(R^2D^6)$ on the transverse output. Delayed source acceleration is retained; this gives its exact sensitivity norm rather than deleting its contribution.

For the full row the source-acceleration output is composed with $L_u=(1-\mathbf u\cdot\mathbf n)I+\mathbf n\mathbf u^{\mathsf T}$. With $D_r=1-\mathbf u\cdot\mathbf n$ and $\mathbf u_T=\mathbf u-(\mathbf u\cdot\mathbf n)\mathbf n$, its restriction to a planar transverse unit direction has norm $\sqrt{D_r^2+|\mathbf u_T|^2}$. Consequently the exact planar full source-A norm is

$$
\|B_{E+M}\|_2=\frac{\sqrt{(D^2+|\mathbf v_T|^2)(D_r^2+|\mathbf u_T|^2)}}{R D^3}.
$$

In three dimensions the same product is a sufficient upper bound from the two operator norms; it is not asserted to be the exact combined norm for arbitrary transverse directions. Polarity signs and fixed coupling magnitude one do not change these norms. For the receiver unit ball, $D_r^2+|\mathbf u_T|^2=1-2u_n+|\mathbf u|^2\le2D_r$, but no such bound is imported for a comparison receiver outside that ball.

The identities are algebraic on $R,D>0$; their selected scientific uses here remain the ordinary positive-delay strict-subfield incoming rows. They supply no inclusive/superfield continuation, root exclusion or new self-coupling convention.

Known controls are $R=2$, source at rest, giving E norm $1/2$; receiver $\mathbf u=(1/5,3/10)$ then gives full planar norm $\sqrt{73}/20$. A source $\mathbf v_s=(1/5,3/10)$ at the same direction/range gives E norm $125\sqrt{73}/1280$. These exact response-input controls do not specify a coupled trajectory. **Derived sensitivity-norm subject frozen before a numerical target.** The coordinator separately derived the same transverse operator before this source, providing an independent analytical crosscheck. Its falsifiers are a nonunit direction, zero range/D, incorrect planar/full composition, a three-dimensional product called exact without additional alignment, or omitted source-A forcing. No new target or actual history is selected.

The [planar norm helper](../evidence/maxwell-shaped-overnight-source-acceleration-norm.mjs), SHA `865c1d4a09c68e2972cf5d93f77b1b7c319d3987d259d1858731ae59f096e22c`, passed those three exact controls, quarter-turn invariance, zero-range and zero-D rejection before any target. Its directed input boxes preserve the exact unit direction as a geometric property; they do not assert that every arbitrary combination of interval coordinates is itself unit. The ignored `source-acceleration-norm-known.json` is known-only, with no actual trajectory or new source budget.

The independent worker assessed the exact planar/three-dimensional distinction against its separately fixed transverse-frame operator, reviewed the square-aware interval projections and reran the controls in `reviewed-source-acceleration-norm-known.log`. **Accepted conditional sensitivity-norm preparation:** no numerical target or replacement source budget is selected.

## 47. Frozen signed spatial scalar consequence

On a complete preselected cell cylinder satisfying Section 43, let $C=\sup\|A_X^C\|_2$ cover **both** the receiving-position and constant-source-translation mean-value families. Direct actual source V/A offsets use separate convex sensitivities $L_v,L_a$ as before. For full, the comparison-geometry receiving-velocity difference is exactly skew and has zero projection on the receiving-velocity error. For E its receiving-velocity derivative is zero. Thus the Euclidean norm-error Dini inequalities are

$$
\dot e_x\le e_v,\qquad
\dot e_v\le C e_x+C p_x+L_vp_v+L_ap_a+\delta.
$$

The same $C$ legitimately occurs in the two spatial terms because Section 43's translation derivative is the negative receiving-position clock derivative. It cannot be replaced by a pointwise nominal matrix or a matrix evaluated with actual-source jerk. The whole nominal comparison clock, all seam J hulls, translated roots, receiving segments and strict completed source guard remain mandatory. Source V/A forcing and the acceleration-error inventory for future coupled history are retained.

For a future completed-source inventory, the entire-cell acceleration error still obeys $e_a\le C E_x+\|K_C\|_2E_v+C p_x+L_vp_v+L_ap_a+\delta$, with the full receiving-skew operator norm retained despite its cancellation in the velocity-norm derivative. For E that receiving term is zero. Whole-cell radii, rather than only endpoint errors, must be used when storing these source-A bounds. This permits no true-source jerk inference and no replacement of a closed seam hull by a point value.

Consequently the independently assessed positive ordinary majorant of Section 28 applies with $C$ in place of the older triangle coefficient, and source term $C p_x+L_vp_v+L_ap_a+\delta$. Every positive denominator, exact time face, upward rounding and strict whole-cell local/global first escape is still required. A smaller coefficient is a statement about this certificate bound; it establishes neither actual error reduction nor cost advantage or original-history admission. A finite multi-cell test may still fail as its error cylinder expands or source jets vary.

**Derived conditional scalar consequence frozen before a new scalar target.** The independent worker fixed this norm consequence after its separate translation proof and before reading this section. Its falsifiers are a receiving/translation family omitted from $C$, a triangle/current rather than comparison clock denominator substituted in its signed derivative, non-skew receiving velocity treated as skew, a lost source-A or seam term, an uncompleted source interval, or failed positive whole-cell envelope. No new conditional original-prefix or adaptive event target is selected here.

The [scalar arithmetic helper](../evidence/maxwell-shaped-overnight-signed-scalar-step.mjs), SHA `c131121fc4e305758f218fce387ee79a8cdae6bac699c9a882fdac901db462ad`, passed exact source-V/A/defect forcing, receiving-skew acceleration inventory, rejected negative-A and first-escape controls before any target. Independent assessment correctly requires its caller to bind the actual selected E zero-derivative or full antisymmetric identity: an arbitrary interval matrix does not justify velocity cancellation. The predecessor remains preserved. A separate [selected-law guard](../evidence/maxwell-shaped-overnight-signed-scalar-guard.mjs), SHA `7ac705a628f2c92d8c7706298625a38241b21c9768711c545b93ce884c8ff5c9`, makes that external exact-response premise explicit, requires selected E/full and necessary derivative-box compatibility, and rejects arbitrary-law/incompatible boxes on known controls before target. Box compatibility alone is not asserted to prove skew. No scalar target is selected; a coupled-prefix user must additionally bind its source/history cylinder and entire acceleration inventory.

The independent worker assessed Section 47 against its separately fixed norm consequence and reran the selected-law guard controls. **Accepted conditional scalar preparation:** it retains the exact-response caller premise and does not license arbitrary-matrix cancellation. Section 44's independent scalar proof already closes the same one-cell cylinder, so no duplicate scalar target is required. Full-prefix use remains a separately frozen and assessed history instrument with completed source bins and the required entire-cell acceleration inventory.

## 48. Frozen finite incoming C2,1 regularity inventory

On a finite proposed ordinary-root incoming interval $[0,H]$, assume complete compatible C2,1 past, strict positive partner delay $\tau\ge\tau_0>0$, positive range/current clearance and transmitter denominator $D\ge d>0$, complete partner census with no incoming self root, actual current/source speeds at most one and actual acceleration at most $a_0$. These are whole-domain obligations to certify; a failed error/root enclosure cannot be repaired by this lemma. Let $P_r,P_v,P_a,P_u$ bound the operator norms of the selected response's partials on every actual input in that domain. For E, $P_u=0$; full retains its receiving derivative, since regularity of acceleration does not use velocity-norm skew cancellation.

Along each incoming root, $\sigma=S'=(1-\mathbf n\cdot\mathbf u)/D$ satisfies $|\sigma|\le2/d$. Differentiating the selected acceleration row a.e. gives

$$
\mathbf A'=F_r(\mathbf u-\sigma\mathbf v_s)+F_v\sigma\mathbf a_s+F_a\sigma\mathbf j_s+F_u\mathbf A.
$$

Here $\mathbf j_s$ is the a.e. derivative of the **actual** older Lipschitz acceleration, derived inductively from incoming regularity, not inferred from a source-A error estimate or supplied by a comparison jerk. Therefore

$$
|\mathbf A'|\le C+g J_{\rm old},\qquad
C=P_r(1+2/d)+2a_0P_v/d+a_0P_u,\qquad g=2P_a/d.
$$

Use contiguous method-of-steps blocks of length at most $\tau_0$; every source time in the next block lies on already completed history. To cover sources in **any** earlier block, let $J_k$ bound the Lipschitz acceleration on the entire completed prefix plus past, not just its last block. With $\bar g=\max(1,g)$, continuity at compatible C2 joins and the a.e. chain rule give the safe cumulative recurrence $J_k\le C+\bar g J_{k-1}$. Thus after $N=\lceil H/\tau_0\rceil+1$ blocks a finite conservative bound is

$$
J_N\le\bar g^N J_{\rm past}+C\sum_{j=0}^{N-1}\bar g^j.
$$

The extra block safely covers closed endpoint conventions. No assumption $g<1$ is needed for this **finite** regularity conclusion. It neither provides uniform long-time jets nor the small neutral gain required by the separate secular theorem. For $g<1$, a sharper invariant maximum can be used, but is not required here.

The actual original circle-plus-terminal-patch family has an explicit finite starting Lipschitz bound. With correction $\Delta\mathbf a\,\delta^2 f(S/\delta)$, $f(z)=z^2(z+1)^3/2$, its third derivative is $f'''(z)=30z^2+36z+9$ on $[-1,0]$, with $|f'''|\le9$. Hence $J_{\rm past}\le r\omega^3+9|\Delta\mathbf a|/\delta$. Jerk jumps at the patch seams do not violate C2,1 because acceleration is continuous and piecewise Lipschitz with a finite common bound. This regularity statement includes the complete prepared tail, but admits no later numerical history by itself.

Together with locally Lipschitz current X/V dependence, strict old-source support and uniform finite state/acceleration/geometry bounds, the recurrence excludes a separate finite C2,1 regularity loss inside a certified incoming prefix. Its solution may still meet unit speed at the named strict-domain boundary; this theorem selects no outgoing equation or continuation. **Derived conditional regularity inventory frozen before target; no numerical case admitted.** The independent worker derived the a.e. kernel-chain route before this section after receiving the coefficient proposal, so that chronology is disclosed rather than called blinded. The cumulative-prefix maximum is explicit here. Falsifiers are an omitted earlier source generation, delay without a uniform positive floor, incompatible acceleration at a join, a field partial outside its whole certified domain, source-A error used to infer actual jerk, or failure of any required state/root/census bound.

The independent worker assessed the frozen cumulative-prefix recurrence against that separately fixed kernel-chain route and accepted the closed-step convention, $\bar g$ bound, original patch constant, retained receiving acceleration and whole-domain obligations. **Accepted conditional finite regularity lemma:** it does not admit an original history, waive an error or source-support failure, supply a small-gain secular theorem, or choose a weak/inclusive/outgoing continuation. No numerical regularity target was selected.

## 49. Adversarial mathematical assessment of the signed-clock prefix subject

This is a source review against the earlier fixed Sections 43/47, separate from the independent reference. The frozen [signed-clock coefficients](../evidence/maxwell-shaped-overnight-signed-clock-coefficients.mjs), SHA `c5bc8e4d50504675cd0a9eff32128e28137186550be510374733a79deec7717c`, and [v7 driver](../evidence/maxwell-shaped-overnight-directed-tube-v7-run.mjs), SHA `50cec6267a79bd9d91c0a5b19bed2210bd0e2256f5f37b3a22695c4da2b48c38`, were read after the mathematical identities were fixed; hashes matched by scoped `shasum`. No target or worker source was changed in this review.

**Assessed source mathematics:** the nominal source V/A/J and comparison-clock denominator occur inside signed $A_X$, while actual source V/A offsets use separate convex field partials. Its relative-position cylinder covers receiving-position and constant-translation families. The entire proposed initial source window is inventoried before root queries; the actual root and all mean-value roots remain inside that parameter bracket. Refined source-error budgets decrease inside the original coefficient box, so their use in forcing is conservative rather than a circular root certificate. Closed-intersecting older acceleration bins and past-crossing acceleration hulls are retained by the indexed inventory. X/V errors are monotone endpoint majorants, whereas each stored acceleration error is a whole-cell bound. The full actual-convex receiving derivative norm safely contains the nominal comparison skew norm and remains in future source-A inventory when removed from the velocity-norm derivative. Source J belongs only to the comparison clock; actual J is not inferred from acceleration errors.

One pre-target contract edge was recorded: v7's acceptance permits $p_x\le E_x,p_v\le E_v$, whereas these new proof statements select strict whole-cell improvement. This review identifies a generic acceptance/receipt obligation, not a failed target or retrospective defect in the independently assessed earlier v6. The history worker preserves v7 and prepares a separate strict successor with exact trial/error margins and strict/equality controls before use. Conditional or unconditional prefix admission still requires all completed-source, exact defect/comparison binding, root-census, delay, D/range/clearance and selected speed-domain obligations. A smaller signed coefficient alone does not admit the original event budgets.

The preserved [v8 strict successor](../evidence/maxwell-shaped-overnight-directed-tube-v8-strict-run.mjs), SHA `18d58597a367e14564cad38b96294f55400074ee2f78901a4e5b212155a723e6`, resolves this edge with strict acceptance and exact trial/improvement witnesses. A read-only scoped diff plus known rerun confirmed those additions and preserved coefficient/source paths; `reviewed-v8-strict-known.json` is retained in this worker's ignored owner. **Accepted adversarial source/known review:** a future v8 actual target still requires its own independently assessed complete-case receipt. No actual prefix job was launched by this worker, and no old v6/v7 source or result was overwritten.

Its falsifiers are a translation root outside the pre-query guard, nominal versus actual clock confusion, a missed closed source seam, a refined forcing error larger than its original expansion, loss of the full receiving derivative in source-A inventory, a failed exact positive-majorant denominator or required strict margin, or changed complete input bytes. This is a bounded adversarial mathematical source review, not an additional computation or independent numerical reference.

## 50. Original circular-tail launches initially move radially outward

Retain the original compatible circle-plus-terminal-patch family of Section 2: $K=c_f=1$, opposite polarity, mirror planar pair, $0<\beta\le3/10$, $r=1/(4\beta^2)$, $\omega=\beta/r$, and each selected law's own compatible endpoint-acceleration patch. Its unique incoming partner root at launch samples the old circular portion, with delay $\tau=2r\cos h$ and $h=\beta\cos h$; the patch width obeys $0<\delta\le\tau/8$, with equality on the actual $\beta=3/10$ launches. The complete source histories of the E and full compatible releases differ in that patch. They are separate coupled launches. An identical-input E/full comparison may retain either one complete past unchanged, but it cannot be called the other law's compatible release. Both launch rows here sample the same old-circle coordinates, velocity and acceleration.

The patch is explicitly within its preparation domain throughout this speed interval. The circular source inputs have $c\ge191/200$, $D\ge1$, $D\le109/100$, and $|\mathbf a_s|=\beta^2/r$. The E row norm obeys $|F_E|\le[(13/10)/(4c^2)+(239/100)\beta^2/(2c)]/r^2<(47/100)/r^2$. The full receiving map has norm at most $1+\beta\le13/10$, giving $|F_{E+M}|<(611/1000)/r^2$. Since the endpoint circular acceleration has norm $1/(4r^2)$, both endpoint corrections have $|\Delta\mathbf a|<(861/1000)/r^2$. With $\delta\le r/4$, $|f|\le1/2$ and the conservative $|f'|\le3$, the complete patched past satisfies $|\mathbf V|\le\beta+(2583/1000)\beta^2\le0.53247<1$ and $|\mathbf q|\ge r-861/32000>0$. Its tail is complete, separated and uniformly strict subfield; the retained old-circle launch root remains unique and outside the patch, and there is no positive-delay self root. These bounds construct a compatible release; they do not claim the circular tail itself obeys either equation.

The algebraic circle coefficients were fixed in a staged message before the independently reported point-reference results. Put $c=\cos h$, $s=\sin h$, $D=1+\beta s$ and $A=1+2\beta s-\beta^2\cos(2h)$. The attractive radial coefficients of the full source-acceleration-dependent row are

$$
C_{r,E}=-\frac{A}{4cD^3},\qquad
C_{r,E+M}=-\frac{D^2+\beta^2(s+\beta)^2}{4cD^3}.
$$

At launch $v_r=0$, and the exact geometric radius identity gives $r''(0)=\beta^2/r+C_r/r^2=(1/4+C_r)/r^2$. This is a radius derivative of a compatible solution at launch, not an imposed-circle solution or a tangential-residual fate inference.

There is a direct elementary positive lower bound across the stated speed interval. Since $h\le\beta$, $c\ge1-\beta^2/2$ and $s\ge\beta(1-2\beta^2/3)$, while $s\le\beta$. The full numerator difference is

$$
\Delta=cD^3-D^2-\beta^2(s+\beta)^2
=(c-1)+\beta s(3c-2)+\beta^2s^2(3c-2)+\beta^3s^3c-2\beta^3s-\beta^4.
$$

Here $3c-2>0$, so retaining the first two terms and bounding the two final negative terms gives

$$
\Delta\ge\frac{\beta^2}{2}-\frac{31\beta^4}{6}+\beta^6
\ge\beta^2\left(\frac12-\frac{31\beta^2}{6}\right)>0
\quad(0<\beta\le3/10).
$$

Thus full $r''(0)>0$. Moreover $D^2+\beta^2(s+\beta)^2-A=\beta^2(1+2\beta s+\beta^2)>0$, so E $r''(0)$ is strictly larger and positive too. At the exact original $\beta=3/10$, $r=25/9$, the full lower bound alone gives $r''(0)>5103/64751450>0$. **Derived initial outward motion on a strict-subfield family.** The displayed inequalities were completed after receiving the independent point-reference result; this chronology is explicit, and the reference numbers are not premises of the elementary interval proof.

The independent worker used its previously frozen potential kernel and circular source coordinates, passed stationary and unique half-angle controls before its launch target, and retained `reviewed-launch-radial-sign.json`. Its separately computed exact intervals give E $r''(0)\approx0.00345033011737$ and full $r''(0)\approx0.000450940107939$, both positive. These are bounded launch derivatives, not stability or fate claims. The broader elementary speed-interval proof awaits adversarial assessment; no second blind numerical target is claimed.

The worker then assessed the broader elementary interval proof and the rational preparation bounds, accepting the displayed numerator identities, Taylor inequalities and positive fraction. It identified a scope precision now retained above: the continuous speed family needs only $0<\delta\le\tau/8$, and does not silently assume the width-minimum rule selects equality everywhere. Actual $\beta=3/10$ equality is separately known. **Accepted derived initial radial-sign theorem on $0<\beta\le3/10$:** no source continuation, unique turning point or future fate follows from this launch derivative.

For the original $\beta=3/10$ cases, combine a positive launch second derivative with a separately admitted later negative radial velocity and continuous positive radius. A small outgoing interval follows by continuity of $r''$; the later inward state then gives an interior radial maximum, hence at least one outward-to-inward radial transition. A plateau or multiple turns are not excluded, and no exact transition time or uniqueness is asserted. The [independent reference](maxwell-shaped-overnight-independent-reference.md) reports actual negative radial velocity at $T=20$ for both separately evolved laws, so this corollary gives at least one such transition in $(0,20)$ after those original-history admissions are bound to the same cases. The [evolution owner](maxwell-shaped-overnight-coupled-evolution.md) retains their histories. Falsifiers are a wrong old-circle coefficient or root/patch relation, a noncompatible endpoint acceleration, a history substitution between laws, a failed later true-history radial sign or positive clearance, or an inference of unique turn/capture from these local signs.

## 51. Current original-prefix disposition after the strongest full check

Preserve the historical candidate chronology. The strongest full v6 process first reported a completed candidate on $[0,38]$ with 11072 cells and no failure. The coordinator subsequently reported independent admission of that actual original-history prefix, including separately reconstructed cosh/sinh and whole-bin source-A error recurrences. **Accepted derived finite coupled solution prefix:** it extends the previously admitted original full interval to $T=38$, with complete compatible preparation, ordinary partner root, no self hit, protected strict speed/clearance/range/D domain and completed older source acceleration. It does not change the selected Sections 7/8 into canon.

Its exact endpoint X/V error bounds are $9676503552531676362783/500000000000000000000000$ and $25987588983345520326053/250000000000000000000000$, approximately $0.019353,0.103950$. They exceed the conditional incoming bridge budgets. The receiving-test source guards also require separately admitted complete closed-bin X/V/A errors, not this endpoint alone. Consequently neither Section 35's full event nor Section 45's separate E event becomes an actual original fate from this new full prefix. The full and E futures and their checkpoint/source budgets remain separate.

The durable independent admission is now recorded under [Actual original full prefix through thirty-eight](maxwell-shaped-overnight-independent-reference.md#actual-original-full-prefix-through-thirty-eight), separate from the earlier comparison-input composition. Its independently reconstructed whole guard $[37.42,37.81]$ contains 114 closed-intersecting bins and has maxima approximately X $0.00972056$, V $0.0263627$ and A $0.144526$. These are certified conservative proof bounds. Their excess over the earlier narrow budgets prevents that particular application; it is not an equation obstruction or a proof that every wider incoming criterion must fail.

Section 48 applies logically on this finite admitted prefix: finitely many positive-delay/domain cells provide a positive minimum delay and finite maximum state, acceleration and partial bounds, while the compatible complete past is C2,1. Thus no extra incoming regularity escape is hidden inside the admitted interval, even if its finite acceleration gain exceeds one. This is an application of the accepted regularity lemma, not a new numerical jerk estimate. The unchanged [evolution owner](maxwell-shaped-overnight-coupled-evolution.md) and [independent reference](maxwell-shaped-overnight-independent-reference.md) own the actual receipt and diagnostics. The next decisive target is a tighter original checkpoint plus complete source-guard certificate, using independently assessed signed-clock/source-A bounds; an endpoint or smaller radius alone cannot supply it. Falsifiers are a failed independent row/defect/source binding, an omitted closed acceleration bin, a missing strict domain/root margin, or incorrectly reporting these larger errors as the event criterion's admitted inputs.

## 52. Assessed local delayed-source acceleration diagnostic

The coordinator's [local source-A postprocessor](../evidence/maxwell-shaped-overnight-enclosed-source-local.mjs), SHA `70786de553b359e2b4f620bd98043b223aed00c5a99ff05d4dba0156dfcbb22b`, was reviewed read-only against the earlier closed-bin inventory and Euclidean norm triangle inequalities. This is an adversarial source assessment, separate from the independently fixed diagnostic reference. The frozen ancestor's geometry, phase and full final-receiving-bin source interval remain unchanged. Exact input/tube/row hashes, case identity, final source interval and complete partition bind the same original history. The source interval must lie above minus six and strictly before the final receiving-left face. Independent admission of those actual rows remains a caller premise; a metadata field alone does not certify them.

For the inherited entire source interval $I$, let $e_A$ be the maximum admitted whole-bin acceleration error over every completed bin whose closed interval intersects $I$, including both bins at a seam and supplied-past/initial errors when zero is crossed. If the unchanged comparison enclosure gives $|\mathbf a_c(I)|\in[a_-,a_+]$, then the true delayed source norm lies in $[\max\{0,a_--e_A\},a_++e_A]$. This follows directly at each actual emission time from the triangle inequality and the reverse triangle inequality. The entire inherited root interval already covers emission-time uncertainty; no new root contraction, acceleration transport or actual jerk estimate enters this corollary.

The known-only rerun passed unrelated-spike exclusion, both closed source-seam bins, past crossing and unsupported-source rejection before target; `reviewed-enclosed-source-local-known.log` is retained in this worker's ignored owner. **Accepted conditional diagnostic instrument:** no target source-A value was computed by this worker, no trajectory was evolved, and no sharper event or fate follows from this postprocessing alone. A missed intersecting closed bin, substituted comparison/source interval, uncompleted emission support, missing actual-prefix admission or use of acceleration-error bounds to infer actual jerk falsifies the application.

The coordinator and independent worker subsequently admitted the original full T38 diagnostic's local true delayed-source norm interval $(0.45336518,0.48632594)$, as recorded by the [independent diagnostic assessment](maxwell-shaped-overnight-independent-reference.md#finite-incoming-history-regularity-and-local-source-acceleration-diagnostics). This interval concerns actual acceleration magnitude on the inherited entire final-bin emission box. It is distinct from the source-A approximation error budget and from a bound on a larger future initial source guard. Neither substitution is licensed by the local norm value. The positive lower magnitude confirms that delayed source acceleration cannot be treated as absent in that diagnostic, but does not by itself establish which response contribution dominates or a future event.

## 53. A wider incoming implication from the actual original T38 prefix

The larger admitted T38 errors do not logically rule out an incoming event. The precise next question is whether they can be transported through a receiver-only comparison before any possible emission leaves the already admitted prefix. Retain the original full case $\beta=3/10$, $r=25/9$, $K=c_f=1$, opposite polarity, mirror preparation and its complete compatible C2,1 past. The actual full prefix is exactly the independently admitted interval $[0,38]$ of Section 51. E is a distinct coupled future; this specialization admits no E checkpoint.

Here is a sufficient criterion frozen before any wider target arithmetic. Choose a derivative-compatible C2 receiving test $\mathbf q_c$ equal to the unchanged literal comparison through its final saved time and a separately fixed C2 append afterwards. Its append is only a receiving test and never an actual source or a selected equation beyond unit speed. Start at $T_c=38$ with the exact endpoint error bounds of Section 51. Before each receiving-cell root query, choose proposed current X/V error radii from the previously accepted errors with positive slack and an entire initial source bracket $W_k\subset[-6,38]$. Extract X/V/A budgets from every closed-intersecting admitted source bin on the entire $W_k$, including the prescribed-past and initial guards when applicable. A narrower later root interval may reduce forcing budgets only after the whole initial bracket's input expansion and root-family certificate have been established.

Under the hypothesis that no actual unit-speed endpoint has yet occurred, actual receiving coordinates satisfy $|\mathbf u|<1$. This permits component clipping to $[-1,1]$ inside the current input enclosure, even if the receiving test or its error box extends past unit speed. All ordinary partner roots, comparison-clock translation roots and receiving-position mean-value roots must remain in the selected completed support, with positive delay, range, denominator and same-time pair clearance. Retain nominal comparison V/A/J and its own clock denominator in the signed spatial Jacobian. Direct actual source V/A offsets use their separately expanded field partials. No actual source jerk is inferred from the admitted A-error rows.

Let $C_k$ bound the signed receiving/source-position clock Jacobian over all these families, and let $L_{V,k},L_{A,k}$ bound the direct source V/A offset partials. The accepted skew identity of the full law gives the whole-cell norm comparison

$$
e_x'\le e_v,\qquad e_v'\le C_k e_x+C_k p_{x,k}+L_{V,k}p_{v,k}+L_{A,k}p_{a,k}+\delta_k,
$$

where $\delta_k$ is a certified defect of the exact receiving test. Its positive majorant must improve the preselected local and global error radii strictly on each complete contiguous cell. Receiving derivative norms remain in any future acceleration-error inventory; their removal here uses only the current velocity-norm skew identity. If all cells reach a selected $T_f$ with $|\mathbf q_c'(T_f)|_{\rm lower}-e_v(T_f)>1$, the no-event hypothesis is contradicted. Hence the original solution has a first unit-speed endpoint in $(38,T_f)$, provided all other state/root/source/regularity obligations improve through that contradiction. The admitted prefix itself supplies the strict starting speed domain, so a possibly loose test-plus-error triangle at exactly 38 does not invalidate the already proved launch-to-38 result.

Positive $2\mathbf u\cdot\mathbf E$ on every possible event state separately establishes transverse arrival. Identical-input full work equals E work by the selected algebraic skew contribution, while separate E/full futures remain distinct. Positive clearance and older partner support then connect to the accepted C2 self-birth obstruction of Sections 11/12, without selecting an outgoing continuation. If work is not certified, the contradiction may prove a first domain endpoint but does not supply that transverse obstruction.

Failure has explicit faces: initial source support not completed, clock or field denominator/range/clearance loss, root-family failure, an error majorant failing its preselected cylinder, incomplete contiguous coverage, or a nonpositive terminal speed gap. Any such face is a proof limitation of this candidate. It cannot be labeled an actual event or absence of an event. This criterion preserves all earlier narrow conditional witnesses and their budgets. **Derived conditional specialization frozen; complete wider numerical case and independent source review are required before target arithmetic.**

## 54. Frozen wider T38 receiving-test case

This bounded candidate uses only the unchanged original full comparison input SHA `c8efbc9f7102661333fff29d0c7bb42c43982cf8740fac4b670953511c4a0af6` and the independently admitted strongest v6 actual-prefix metadata/rows of Section 51. It selects $T_c=38$, $T_f=38.5$, maximum receiving step $10^{-4}$, exact original Hermite seam partition, global receiving error radii X $0.2$ and V $0.8$, and local radii previous accepted X plus $0.0001$ and V plus $0.001$. Endpoint errors are the exact admitted fractions, rather than rounded telemetry. The test equals the original exact quintic through its saved final time $T_0$ and uses the unchanged narrow-test cubic append's exact midpoint jerk afterwards; its polynomial is extended to $38.51$ without reselecting that jerk. This is the same receiving comparison, not a new physical preparation or law.

The outer completed-source guard is $[36.3,38]$. Its admitted monotone X error maximum bounds preliminary position uncertainty. Before each root query, select a seed from the fixed floating comparison solely as an uncertified bracket selector and choose half-width $4h+10^{-8}+3(E_x+p_{x,\rm outer})$. Require both whole initial source faces strictly inside the outer guard and below 38. Extract local whole-bin X/V/A error budgets on that entire initial window before root refinement, then certify the root using those budgets and face signs. The factor three is a bracket selection, not an analytic assertion that roots fit; a failed face or any translated/receiving mean-value domain obligation stops the candidate. No emission at or after 38 is permitted as an actual source.

All nominal comparison source V/A/J and receiving-test inputs on the certified root interval enter the already assessed signed-clock partial instrument. Expand direct source V/A offsets by the local whole-window budgets. Preserve separate nominal clock D and actual convex field D, positive range, delay and same-time clearance. Component clipping of actual receiving velocity is used only under the no-earlier-unit hypothesis. The signed scalar majorant carries source-position, source-V and source-A forcing and the exact receiving-test defect; it retains all delayed source acceleration terms. Every accepted cell must improve its preselected local/global radii strictly. Full signed work is evaluated by the identical-input E work identity on the same entire field box.

Fresh output must retain initial and refined source windows, selected closed source bins, exact source budgets, exact coefficients/majorant errors, root/clock/field domain margins, field-input boxes and all immutable comparison/prefix hashes. The first rejected candidate is separated from accepted cells and has a null terminal speed gap. A completed terminal reverse-triangle gap establishes the Section 53 incoming implication; transverse obstruction additionally needs positive whole possible-event work. **Complete case frozen before known controls, independent source review and arithmetic target.** This case makes no prior claim that the larger admitted budgets close, no extrapolation from the narrow conditional witness, and no post-unit solution claim.

The unique [wider receiving-test instrument](../evidence/maxwell-shaped-overnight-T38-wider-receiving-test.mjs) was then frozen at SHA `e86008c516e9be5befeb67b634a6a480d9e5e20382b5cdeb4beb2dde0b420a8f`. Its known-only run passed inherited derivative-compatible cubic/seam, delayed source-A/J chain-rule, exact positive recurrence, signed static/affine clock and closed-source inventory controls before target; `T38-wider-known.log` is retained in this worker's ignored owner. The independent worker accepted Section 53 against its separately fixed no-earlier-unit criterion: strict starting domain comes from the actual admitted prefix, all older source and non-speed state/domain obligations remain mandatory, and signed work is a separate transverse-boundary premise. **Instrument source review pending; no wider arithmetic target yet.**

The independent worker subsequently read the complete frozen wrapper and reran its controls into `reviewed-T38-wider-known.log`, accepting the pre-target instrument. It additionally checked completed support for the nominal defect instrument's internal root queries: their left-point bracket extends by at most $3w_0+10^{-8}$, $w_0=4h+10^{-8}$, whereas the initial whole bracket includes the extra $3(E_x+p_{x,\rm outer})>0.058$. For $h\le10^{-4}$ that extra width exceeds $2w_0+10^{-8}<0.000801$. Thus those nominal queries do not silently sample source history beyond the certified outer bracket. Target admission must separately bind the exact independently admitted prefix/rows hashes. **Accepted conditional source instrument before target:** the bounded receiving-only run was then launched and watched, with no target conclusion yet.

That v6-input target completed and retained `T38-wider-receiving-test.json`, SHA `af32bbd45457d09e6d8540ccd2684090697f2a1329765a487a799ba670ef6288`. It has 976 accepted conditional cells and a separate rejected candidate beginning at $3351034364530464073/87960930222080000$. The accepted X/V error majorants are approximately $0.036455,0.359141$. The next candidate's velocity majorant exceeds its preselected local radius by exactly $2253980607378585272/(5\times10^{23})>0$; its global radii and range/clock/field/clearance margins remain positive. Its selected signed spatial envelope has grown to about $234.73$. Whole possible-event work was not enclosed positively on the preceding accepted cylinder. The terminal speed gap is null. **Measured proof-cylinder limitation pending independent target assessment:** no incoming event, physical approximation error or actual domain loss follows. A larger local slack or another enclosure could change this certificate result, so this failure is not a theorem excluding every wider v6-input criterion. The source and result remain preserved as the distinct larger-input case.

There is also a direct completed-source diagnostic independent of the field majorant. For any incoming mirror path with a first future partner emission $S=38$, its wake equation requires $T-38=|\mathbf q(T)+\mathbf q(38)|$. Therefore a receiver-only enclosure satisfying $|\mathbf q_c(T)+\mathbf q_c(38)|_{\rm lower}-e_x(T)-e_x(38)>T-38$ excludes that emission face throughout the tested interval. The condition is sufficient, not necessary; failure does not prove an actual root has crossed into generated post-38 source history. More conservatively, incoming speed below one gives $|\mathbf q(T)+\mathbf q(38)|\ge2|\mathbf q(38)|-(T-38)$, so every interval with $T-38<|\mathbf q(38)|_{\rm lower}$ keeps that face strictly beyond the root. These bounds expose why an arbitrarily long receiver-only comparison cannot silently use a fixed completed source prefix.

## 55. Directional source-acceleration sensitivity of incoming speed work

This refinement concerns only a work-sign enclosure at fixed actual receiving position/velocity and actual source position/velocity. It changes neither the already frozen wider comparison's transport nor the law. Let $\mathbf n$ be the unit delayed-separation vector, $D=1-\mathbf n\cdot\mathbf v_s>0$, $\mathbf b=\mathbf n-\mathbf v_s$, and delayed range $R>0$. The source-A-dependent E term is $[\mathbf b(\mathbf n\cdot\mathbf a_s)-D\mathbf a_s]/(R D^3)$ before the opposite-polarity sign. Consequently the derivative of the opposite-polarity signed speed work $W=2\mathbf u\cdot\mathbf F$ with respect to source acceleration is the covector

$$
\mathbf g_A=-\frac{2\{(\mathbf u\cdot\mathbf b)\mathbf n-D\mathbf u\}}{R D^3}.
$$

The full row has exactly the same work at identical inputs, so this covector retains its delayed source-A contribution too. Write $\mathbf u=u_n\mathbf n+\mathbf u_\perp$ and $\mathbf v_s=v_n\mathbf n+\mathbf v_\perp$. The numerator simplifies to $(\mathbf u\cdot\mathbf b)\mathbf n-D\mathbf u=-(\mathbf u_\perp\cdot\mathbf v_\perp)\mathbf n-D\mathbf u_\perp$. Hence

$$
|\mathbf g_A|=\frac{2\sqrt{D^2|\mathbf u_\perp|^2+(\mathbf u_\perp\cdot\mathbf v_\perp)^2}}{R D^3}
\le\frac{2|\mathbf u_\perp|\sqrt{D^2+|\mathbf v_\perp|^2}}{R D^3}.
$$

The last inequality is equality in the planar case. If a completed source bin certifies Euclidean acceleration error $|\mathbf a_s-\mathbf a_c|\le e_A$ at the actual uncertain emission time, then $|W(\mathbf a_s)-W(\mathbf a_c)|\le e_A|\mathbf g_A|$ pointwise. Taking a whole-input upper bound on this covector and a whole-input lower bound on nominal-A work gives a valid work lower bound, with every other input/root uncertainty retained. Comparison A must be enclosed over the entire actual source interval; there is no source-jerk estimate or omitted root shift. This support-function inequality is sharper in principle than treating the Euclidean error as an independent component rectangle. It cannot improve spatial transport or source-A error budgets by itself.

The covector vanishes when receiving velocity is parallel to delayed separation, because the source-A contribution is transverse to that separation. At $R=2$, $\mathbf n=(1,0)$, $\mathbf v_s=(0.2,0.3)$ and $\mathbf u=(0.1,0.4)$, the exact attractive work derivative is $(15/64,5/8)$; longitudinal and transverse source-A changes $(0.1,0)$ and $(0,0.1)$ therefore change work by $3/128$ and $1/16$. These are closed analytical controls for a future support-function implementation. **Derived conditional directional-work theorem frozen before implementation or target.** Its falsifiers are nonunit $\mathbf n$, an omitted polarity/coupling factor, source acceleration uncertainty supplied only as a magnitude rather than an error about the stated comparison, a nominal acceleration evaluated at the wrong emission time, or removal of the other source/root/receiving uncertainties. No numerical wider-case improvement is asserted.

The independent worker fixed the same covector from its prior potential/source-A reference before reading this section. The subject [v3 support helper](../evidence/maxwell-shaped-overnight-source-A-work-support-v3.mjs), SHA `5a168dc954d7d279035e6b553fe5f3c8b69cfd9b1c59e6c3a900275385e4cab1`, passed the stated controls plus static work $-0.1$ with Euclidean source-A slack $0.009$ before target; `source-A-work-support-v3-known.log` is retained. Two earlier source/control failures remain preserved: v1 called an unavailable interval `abs` method, and v2 used square-root-of-square whose outward zero floor failed the exact longitudinal-zero control. V3 uses a sign-aware absolute-value interval and passes; no target ran on either failed version. The mathematical reference was not modified, and no target has yet used this work refinement.

The independent worker subsequently assessed Section 55 and reran the helper controls, accepting the physical unit-n projection, polarity, Euclidean support and retained whole other-input/nominal-source-A obligations. Its `reviewed-source-A-work-support-v3-known.log` records that pre-target pass. **Accepted conditional work support instrument:** no numerical target or error-transport improvement is claimed.

## 56. Distinct receiving-test certificate inputs from the admitted signed v8 prefix

The independently admitted strict signed v8 prefix certifies the same actual original full history on $[0,38]$, using the same exact comparison input SHA `c8efbc9f7102661333fff29d0c7bb42c43982cf8740fac4b670953511c4a0af6` and unchanged continuum-defect SHA `16e1ddadee702af7cd4595c3e5ddd70c089903c1386231e389738558abe13843`. Its metadata SHA is `5a48d47aaf435b93c0efc209bb36ebf10a91208971030b41147ab71c33969c94` and row SHA `1d16a4cd6d0437a17f4752019f0596ab9555c555c4048a95b68a513f24907c1c`, with 11072 admitted cells. The [independent reference](maxwell-shaped-overnight-independent-reference.md) owns `reviewed-full-signed-v8-T38-prefix.json`, `reviewed-full-signed-v8-T38-recurrence.json` and `reviewed-full-signed-v8-T38-strict-trial.json`. This is a distinct proof-input certificate, not a new physical launch, comparison evolution or equation row.

Its exact starting X/V errors are $2495499883931708695757/10^{24}$ and $5761630678383156506289/10^{24}$. The admitted cumulative whole-prefix A-error maximum is $29639664233171628258899/10^{24}$. Monotone X/V endpoint majorants and that cumulative A maximum bound every completed source interval in $[36.3,38]$ before any new query. Local closed-bin maxima may subsequently sharpen those budgets without changing the admitted past. The earlier v6 wider receiving case remains intact and watched; its larger proof inputs are not silently replaced by these smaller values.

Freeze a separate bounded receiving-only case with $T_c=38$, $T_f=38.42$, maximum step $0.0005$, exact original seam partition, global X/V error radii $0.05,0.15$, and local radii previous accepted X plus $0.0002$ and V plus $0.002$. Use the same literal quintic and the exact same midpoint-jerk cubic append as Sections 54/35, now represented to $38.43$ without reselecting jerk. The outer source guard remains $[36.3,38]$, whole initial half-width is $4h+10^{-8}+3(E_x+p_{x,\rm outer})$, all source faces must be strictly before 38, and local X/V/A budgets are inventoried on the whole initial bracket before refinement. The factor three remains only an initial bracket selection whose face/domain certificate can fail.

Use precisely the already assessed signed comparison-clock scalar transport, component clipping only under the no-earlier-unit hypothesis, retained convex actual source V/A offsets, old source-A forcing, exact receiving-test defect, positive range/delay/D/clearance and strict local/global majorant improvement. No actual source J is inferred. The nominal defect instrument's internal older brackets fit this candidate's initial bracket: $3(E_x+p_{x,\rm outer})>0.0149$, while $2(4h+10^{-8})+10^{-8}<0.004001$ for the selected maximum step. Terminal gap and possible-event work are separate checks, and every failed candidate is excluded from the accepted-cell induction with null terminal gap. **Complete v8-input case frozen before wrapper controls, independent source review and arithmetic target.** Actual-prefix admission alone proves no incoming endpoint until this separate receiving implication closes.

The [v8-input receiving-test wrapper](../evidence/maxwell-shaped-overnight-T38-v8-receiving-test.mjs), SHA `1087a7e40dfda8a2f5c49ecce5c7ea468a705e49167c70c9d89c8d248caf05bd`, passed its inherited known controls into `T38-v8-known.log`. The independent worker then assessed its exact input/parameter diff and reran controls into `reviewed-T38-v8-receiving-known.log`, accepting the source before target. It separately confirmed that the admitted whole-prefix X/V monotone endpoints and cumulative A maximum supply the initial outer guard without waiting for a narrower diagnostic extraction. The receiving-only arithmetic target was then launched and watched; **no target outcome is asserted yet**.

## 57. An integrated signed-work event criterion on accepted cells

The terminal reverse triangle of Sections 53/56 is sufficient, but it is not the only way to obtain an incoming endpoint from those same input cylinders. Freeze the following corollary before any new target arithmetic. Retain the independently admitted actual strict-subfield prefix through $T_c$, exact derivative-compatible receiving test and only the strictly accepted contiguous conditional cells whose root/source/state/domain first-escape obligations have already been assessed. Exclude every rejected candidate. Let $\ell_0=\max\{0,|\mathbf q_c'(T_c)|_{\rm lower}-e_v(T_c)\}$; this is a true initial speed lower bound by the reverse triangle. Let $w_k$ be a lower bound for actual signed speed work $2\mathbf u\cdot\mathbf E$ on the entire kth accepted field/root/source/current input cylinder, with exact width $h_k$.

Under the hypothesis of no unit endpoint up to the last accepted face $T_n$, the actual selected law is regular there and obeys the geometric differential identity $(|\mathbf u|^2)'=2\mathbf u\cdot\mathbf A$. For full this equals $2\mathbf u\cdot\mathbf E$ at the same inputs; E has that work directly. Integrating only on this hypothetical incoming solution gives

$$
|\mathbf u(T_n)|^2\ge \ell_0^2+\sum_{k=1}^{n}h_k w_k.
$$

Therefore a right side strictly greater than one contradicts the no-unit hypothesis and forces a first unit-speed endpoint in $(T_c,T_n)$. This conclusion can hold even when a terminal receiving-test norm-minus-error gap is nonpositive. The proof uses the actual acceleration equation and Euclidean differentiation, with no physical energy premise. It requires no actual continuation through the event: the integration interval exists only under the hypothesis that is contradicted.

Negative lower work values may be included conservatively in the sum. Transversality and the C2 self-birth obstruction require a separate positive work bound on all possible first-event states. Positivity on all retained cells supplies that condition; alternatively, an independently justified strict-speed guard can remove earlier cells before using positivity on the remaining eligible window. A failed work enclosure, omitted cell width, noncontiguous partition, false initial lower bound, use of a rejected row or absent actual-prefix/root/source admission falsifies the application. **Derived conditional integrated-work criterion frozen:** no new work integral or event target has been evaluated yet, and it does not change any retained reverse-triangle result.

The independent worker assessed this criterion against its pre-read speed-square differential identity and accepted it. The [v2 exact sum helper](../evidence/maxwell-shaped-overnight-incoming-work-sum-v2.mjs), SHA `94633cfd034e621da3f21b3b22560b7050647ff2499fe4341386d6881853d264`, passed exact $1/4+2(1/2)=5/4$, negative-work $7/20$ and noncontiguous-row controls before target. Its preserved v1 failed a serialized interval-constructor control and was never targeted; v2 explicitly constructs the supplied interval endpoints. The [thin work corollary](../evidence/maxwell-shaped-overnight-receiving-work-corollary.mjs), SHA `547dd3233914f987c35ba8d2e426a65f1a6e2c33aa1e6d1fec516bc4893c0384`, independently passed known/source review before target and binds the original receipt, actual prefix/rows/history, exact starting budgets and accepted partition. Root/field/cylinder correctness remains an external admitted premise.

Applying that corollary only to the 718 accepted cells of the earlier Cartesian v8 receiving candidate gives initial speed lower $0.73990303146571329346203$ and final squared-speed lower approximately $0.7514<1$. No intermediate sum exceeded one; `T38-v8-work-corollary.json` retains the exact arithmetic. **Measured work-certificate limitation:** this corollary also supplies no incoming event for that preserved failed candidate. It is not an upper bound on actual speed and proves neither an actual failure nor an absence of an event. Independent target assessment of this sum is still required.

## 58. A physical unit-frame comparison-clock Jacobian

The Cartesian interval derivative can lose algebraic cancellations when the current and source cylinders widen. The following equivalent derivative retains them before arithmetic. It changes no response, source history or domain. Fix physical delayed range $R>0$ and its unit frame $(\mathbf n,\mathbf t)$, where $\mathbf t$ is the planar quarter-turn of $\mathbf n$. Write physical source V/A/J components as $(v_n,v_t),(a_n,a_t),(j_n,j_t)$ and fixed Cartesian receiving velocity components as $(u_n,u_t)$. Put $D=1-v_n>0$, $w=1-v_n^2-v_t^2$, $N=v_ta_n+Da_t$, and retain $\sigma=-1$, $K=c_f=1$. The E components are

$$
e_n=\frac{\sigma w}{R^2D^2},\qquad e_t=-\frac{\sigma}{D^3}\left(\frac{wv_t}{R^2}+\frac{N}{R}\right).
$$

Full components are $(e_n+u_te_t,(1-u_n)e_t)$. These simplifications use the physical unit-vector identity and preserve all source acceleration; the longitudinal E source-A term cancels exactly.

Differentiate the physical vector at fixed Cartesian source V/A and fixed Cartesian receiver U. The radial and angular vector derivatives, expressed in the current frame, are

$$
\mathbf e_R=\sigma\begin{pmatrix}-2w/(R^3D^2)\\2wv_t/(R^3D^3)+N/(R^2D^3)\end{pmatrix},
$$

$$
\mathbf e_\theta=\sigma\begin{pmatrix}3wv_t/(R^2D^3)+N/(RD^3)\\w/(R^2D^3)-3wv_t^2/(R^2D^4)+a_n/(RD^3)-3Nv_t/(RD^4)\end{pmatrix}.
$$

These include output-basis rotation. In obtaining them, $v_n'=v_t,v_t'=-v_n,a_n'=a_t,a_t'=-a_n$ under angular differentiation; the scalar components are not held fixed. Source V/A partials in this unit frame are

$$
E_V=\sigma\begin{pmatrix}
2(w-v_nD)/(R^2D^3)&-2v_t/(R^2D^2)\\
2v_nv_t/(R^2D^3)-3wv_t/(R^2D^4)+a_t/(RD^3)-3N/(RD^4)&(2v_t^2-w)/(R^2D^3)-a_n/(RD^3)
\end{pmatrix},\qquad
E_A=\frac{\sigma}{RD^3}\begin{pmatrix}0&0\\-v_t&-D\end{pmatrix}.
$$

For E take $F_R=e_R,F_\theta=e_\theta,F_V=E_V,F_A=E_A$. For full let $L=\begin{pmatrix}1&u_t\\0&1-u_n\end{pmatrix}$. Then $F_R=Le_R,F_V=LE_V,F_A=LE_A$, while the angular derivative is

$$
F_\theta=\begin{pmatrix}e_{\theta,n}+u_te_{\theta,t}-u_te_n\\(1-u_n)e_{\theta,t}+u_ne_n\end{pmatrix}.
$$

This formula also includes $u_n'=u_t,u_t'=-u_n$ and the output-basis rotation, even though U is fixed as a physical Cartesian vector. Omitting either rotation gives a wrong full derivative.

Now incorporate the ordinary source clock. For a physical receiving-position variation with frame coordinates $(\xi_n,\xi_t)$, $\delta S=-\xi_n/D$, $\delta R=\xi_n/D$, $\delta\theta=(\xi_t+v_t\xi_n/D)/R$, $\delta\mathbf v_s=-\mathbf a_s\xi_n/D$, and $\delta\mathbf a_s=-\mathbf j_s\xi_n/D$. Thus the exact signed comparison-clock Jacobian, expressed in orthonormal input and output frames, has columns

$$
A_{X,n}=\frac{F_R+(v_t/R)F_\theta-F_V\begin{pmatrix}a_n\\a_t\end{pmatrix}-F_A\begin{pmatrix}j_n\\j_t\end{pmatrix}}{D},\qquad A_{X,t}=\frac{F_\theta}{R}.
$$

Its Euclidean operator norm equals the Cartesian Jacobian norm pointwise because both frame transformations are orthogonal. An interval enclosure of these frame entries therefore provides a valid whole-family operator bound even though the frame varies with each actual mean-value input. Compute the frame from physical $\mathbf r/|\mathbf r|$ throughout; an arbitrary direction box is not a unit-frame premise. Nominal comparison V/A/J and its own D enter this clock. Direct actual source V/A sensitivities must be recomputed on their separate convex physical input boxes. Full receiving derivative in this frame is $\begin{pmatrix}0&e_t\\-e_t&0\end{pmatrix}$, with norm $|e_t|$, and remains in source-A error inventory despite current velocity-norm cancellation.

Stationary opposite-polarity $R=2$ gives $A_X=\operatorname{diag}(1/4,-1/8)$; affine $R=2.5,v_n=0.2,v_t=0,a=j=u=0$ gives $\operatorname{diag}(0.24,-0.12)$. A nonzero source-A/J/U control at $R=2,v=0,a=(0,0.03),j=(0,0.05),u=(0.2,0.3)$ gives E matrix $\begin{pmatrix}0.25&-0.0075\\-0.04&-0.125\end{pmatrix}$ and full matrix $\begin{pmatrix}0.238&-0.0075\\-0.032&-0.125\end{pmatrix}$, with full receiving skew entries $K_{12}=0.015,K_{21}=-0.015$. **Exact derivative theorem frozen before implementation/target.** The independent worker separately fixed a directional root-clock/component-variation derivation from its potential reference before reading this section. No sharper numerical case bound is yet asserted. Falsifiers include omission of either frame rotation, source-A/J clock terms, a nominal-versus-actual denominator substitution, a nonunit direction treated as a physical frame, or unsupported initial/translated/receiving root families.

The [unit-frame coefficient instrument](../evidence/maxwell-shaped-overnight-unit-frame-clock.mjs), SHA `9767d1baf6d675a2f47508a5b53d1c6c3c5281f801a10886926396ef542e8874`, then passed stationary, affine, nonzero source-A/J/U, receiving-skew, quarter-turn covariance and invalid-domain controls before target; `unit-frame-clock-known.log` is retained. Its nominal clock uses comparison J. The expanded actual-V/A evaluation contributes only direct V/A partial norms and receiving skew norm; any incidentally returned clock array from that expanded evaluation is unused and carries no actual-J interpretation. **Source review pending; no numerical frame target yet.**

The independent worker subsequently fixed and controlled a directional frame implementation before reading this section, comparing its nonzero source-A/J/U columns against its unchanged nested-potential Cartesian reference. It then assessed the displayed algebra and helper, accepting both frame rotations, exact E/full columns, skew receiving derivative, physical normalized-r family obligations and operator-norm invariance. **Accepted derived unit-frame derivative and conditional instrument:** the independently authored reference was not changed with this subject, and no actual-J or arbitrary-direction assumption was introduced.

## 59. Frozen unit-frame successor of the same v8 receiving case

Preserve both prior receiving-cylinder failures. Select precisely Section 56's already frozen actual-v8 input case and immutable history/metadata/rows, initial errors, $[36.3,38]$ outer source guard, same quintic/cubic receiving test, $T_c=38,T_f=38.42$, maximum step $0.0005$, seam partition, global radii $0.05,0.15$, local slack $0.0002,0.002$, strict initial root support and strict whole-cell majorant improvement. Replace only the equivalent coefficient evaluation with Section 58's physical unit-frame operator bounds. Receiving work and exact test defect retain their existing independently assessed instruments. No new coupled trajectory, past or response law is selected.

Source-root and every receiving/translated mean-value family must fit the same pre-query physical input boxes. Nominal V/A/J and its own D provide the frame clock bound; convex actual V/A offsets provide their separate partials and actual field D. Pointwise orthogonal frame changes preserve operator norms, so interval evaluation of physical normalized-r frame entries is a whole-family bound without pretending an arbitrary interval direction is unit. Full current velocity norm still uses the exact skew identity; source-A terms remain in forcing. Every prior candidate/result stays unchanged. A fresh successor receipt must bind the new coefficient source bytes as well as original input/prefix/rows and retain rejected rows separately. **Complete successor case frozen before wrapper known controls, independent source assessment and target.**

The [unit-frame successor wrapper](../evidence/maxwell-shaped-overnight-T38-v8-unit-frame-receiving-test.mjs), SHA `54b3d66977d2316df724e530a802f8ed179173189da71871227cf0278058eaa2`, passed known controls and independent source/diff review before target. The independent receipt `reviewed-unit-frame-successor-known.log` records its rerun. The watched receiving-only target was then launched; no new actual coupled history was evolved and **its target outcome is pending**.

That target completed with 834 accepted conditional cells and a separately rejected candidate beginning at $337893758736822023/8796093022208000$, approximately 38.414. Accepted errors are approximately X $0.0127871$ and V $0.146407$. The next local/global improvement check failed; final gap is null and whole possible-event work was not positive. `T38-v8-unit-frame-receiving-test.json`, SHA `d518c8046fe086f18de73213a1d331f6aa8b7a5aa32cc534c98adb67afad73c6`, preserves all rows and the failed candidate. **Measured certificate limitation pending independent target assessment:** the equivalent frame derivative improves this candidate's coverage, but supplies no actual unit endpoint, capture or absence of an event. Both prior failures remain unchanged.

## 60. Incoming unit-frame enclosures using the actual no-event hypothesis

Freeze this separate sharpening before target. Sections 53/58 split receiving velocity first and evaluate spatial/source-input changes at fixed actual receiving U. Under the hypothetical no-earlier-unit branch, $|\mathbf u|<1$. For every physical unit frame in these mean-value families, its components therefore lie in $[-1,1]$. Intersecting a computed interval enclosure of $u_n$ or $u_t$ with this range is a valid bound on those actual inputs. It neither modifies velocity nor differentiates a saturated response. The exact angular derivatives still use $u_n'=u_t,u_t'=-u_n$ for fixed physical U. A receiving-only test or defect evaluation after its comparison speed exceeds one cannot use this actual-state intersection.

Likewise physical normalized-r frame orthogonality gives $v_n^2+v_t^2=|\mathbf v_s|^2$. In the closed formulas of Section 58, evaluate $w$ directly as $1-v_{s,x}^2-v_{s,y}^2$ on the same physical source-velocity box. This equivalent expression avoids some dependency from first projecting and then squaring. It does not hold w constant under source-V variation: the already derived $E_V$ and all root-clock source-A/J terms remain unchanged. Nominal comparison and direct convex actual V/A boxes are still separate; source J remains nominal only.

The complete successor selects exactly Section 59's original actual-v8 receiving case, time partition, test, errors, source guard, first-escape margins, work and defect instruments. It replaces only the equivalent coefficient enclosure with direct Cartesian w and the actual-unit frame component intersections. An empty intersection or any root/domain/error margin still rejects the candidate. The independent worker separately fixed these identities and their actual-versus-test scope before reading this section. **Derived conditional bound refinement and complete case frozen before source controls/review/target:** no numerical gain or actual event is asserted.

The independent worker then accepted Section 59's 834 conditional cells using its unchanged Gaussian history reconstruction, closed-source inventory and independently authored analytic majorant checker; `reviewed-full-v8-unit-frame-receiving-test.json` binds the exact reached face and subject receipt. Its separately frozen exact-work checker also found a lower speed-square account of approximately $0.773<1$ and no crossing witness, recorded in `reviewed-full-unit-frame-incoming-work.json`. **Accepted bounded certificate failure:** neither method establishes an actual unit event from this predecessor.

The first incoming-frame source and wrapper were frozen but their known control failed before target: the control demanded an exact projected upper endpoint $-0.8$ despite outward interval normalization of n. Both original sources and `incoming-frame-v1-known-failed.log` are preserved. The [v2 coefficient source](../evidence/maxwell-shaped-overnight-unit-frame-clock-incoming-v2.mjs), SHA `d3c7bdc9fd5d7af3192720d80c58a8faa32fce44bab1d838e41fcd64c6d670e3`, changes only this analytical control to require containment with a tight outward allowance and adds an explicit nominal superunit receiving-field control. In particular, nominal $\mathbf u_c=(-2,0)$ with the transverse-A control gives unclipped full tangential field $0.045$; the actual incoming intersection is not used for this defect input. The [v2 wrapper](../evidence/maxwell-shaped-overnight-T38-v8-incoming-frame-v2-receiving-test.mjs), SHA `bed428ba221c33f7ab58fefab11a56eabfd59cee9c51ac0ae7a630c86b2777a4`, binds this new coefficient source and a fresh output. Known controls passed first, recorded in `incoming-frame-v2-known.log`. **Independent source assessment pending; no target has run.** The physical evaluator was unchanged by this control-only successor.

The independent worker assessed the final v2 source and wrapper against its separately frozen physical-projection and Cartesian-w reference, rerunning known controls in `reviewed-incoming-frame-v2-known.log`. It accepted the actual-versus-test restriction and unchanged derivative algebra. The same-case watched target was launched only after this assessment; its output remains pending. No numerical improvement or actual unit event is inferred from source admission.

## 61. Reverse-triangle witnesses at retained accepted receiving faces

**Derived conditional corollary frozen before target arithmetic.** A failed receiving test's prescribed terminal face need not be used. Suppose the actual strict-domain checkpoint and the contiguous accepted receiving cylinders have been independently admitted under the no-earlier-unit hypothesis, with all completed-source, clearance, denominator, history-regularity and whole-cell error obligations. At any retained accepted right face $t_j$, the same derivative-compatible receiving test satisfies $|\mathbf u(t_j)-\mathbf u_c(t_j)|\le e_{V,j}$. If the independently enclosed test norm has lower endpoint $\ell_j$ and $\ell_j-e_{V,j}>1$, the hypothetical subfield continuation to that face is impossible. Hence the actual first unit endpoint occurs by $t_j$, provided the other first-escape margins have remained closed up to that face. This conclusion uses only the unchanged test and accepted parent rows; it includes no rejected candidate or actual continuation after equality. Checking all accepted faces and retaining the first strict witness is a finite application of this same corollary, rather than an enlarged cylinder.

The test must be reconstructed from the original complete comparison and the exact same selected cubic coefficients, with physical derivative consistency and original input/prefix/row bindings. Inherit each entire parent-cell velocity error at its right face. Negative or inconclusive whole-cell signed work does not prevent this incoming-existence implication, but positive transversality and the C2 self-birth obstruction still require independently positive work on every possible first-event state, or a separate strict speed guard excluding earlier uncovered states. If no accepted face supplies a strict reverse-triangle gap, the corollary establishes only that this diagnostic has no witness. It does not assert that no event occurs. Falsifiers are a modified cubic, a gap computed using smaller unproved face errors, a noncontiguous parent sequence, inclusion of the failed candidate, or loss of any non-speed/source-support margin.

The [accepted-face instrument](../evidence/maxwell-shaped-overnight-accepted-face-speed.mjs), SHA `d2919287542a557d1f8442df37ea08f743c183159c8602a88ac0bf46596fe069`, passed strict-versus-equality, first-witness, exact cubic and noncontiguity controls before target in `accepted-face-speed-known.log`. The independent worker then assessed its source against a separately fixed multi-face reverse-triangle proof and reran those controls in `reviewed-accepted-face-subject-known.log`. Its wrapper admission concerns the selected receiving cases with the prescribed horizon after the original last knot, where the appended endpoint recreates the unchanged exact cubic; it is not a generic wrapper for a horizon inside the original knot sequence.

Applying it to Section 59's independently assessed 834 accepted cells gives no witness: the largest strict gap is $-13691118192189889586723/(5\times10^{23})<0$. `T38-v8-unit-frame-accepted-speed.json` preserves all face errors, norms and gaps, excludes the failed candidate and binds the parent. **Measured accepted-face certificate limitation pending independent target assessment:** this route also fails to force an actual unit endpoint from that predecessor. It neither proves absence of an event nor extends the parent coverage.

Section 60's incoming-frame v2 target completed all 846 conditional cells through exactly $38.42$, with no rejected candidate. `T38-v8-incoming-frame-v2-receiving-test.json`, SHA `1cf152f1f5d213dc1e8458365cb89b9c9f72ab493988888e8b5ee9f62222ff2f`, records endpoint errors $6445710824633765178259/(5\times10^{23})$ and $72178043311327366621687/(5\times10^{23})$. The prescribed-final gap is $-20743076767489928770351/10^{24}<0$ and the whole work minimum is negative. Its accepted-face scan also finds no witness, with maximum gap $-2660723736608020467811/(2\times10^{23})<0$. The independent Gaussian face checker agrees in `reviewed-full-incoming-frame-v2-faces.json`; full cylinder induction assessment is pending. **Bounded certificate limitation:** the new enclosures close the receiving cylinders but neither terminal nor accepted-face comparisons force an actual unit endpoint. All older failures and their input cases remain preserved.

## 62. Physical normalized-direction component boxes

Freeze this geometric refinement before arithmetic targets. Let the whole physical relative-position rectangle be $x\in[x_-,x_+],y\in[y_-,y_+]$, with a strictly positive lower range. Set $m_y=\min|[y_-,y_+]|$, $M_y=\max|[y_-,y_+]|$, and analogously $m_x,M_x$. For the physical direction $n_x=x/\sqrt{x^2+y^2}$, differentiation gives $\partial_x n_x=y^2/R^3\ge0$ and $\partial_{|y|}n_x=-x|y|/R^3$. Thus its lower endpoint is the outward evaluation at $x_-$ and $|y|=M_y$ if $x_-\ge0$, or $m_y$ if $x_-<0$. Its upper endpoint is the outward evaluation at $x_+$ and $|y|=m_y$ if $x_+\ge0$, or $M_y$ if $x_+<0$. A zero numerator has exact value zero; the positive-range premise excludes a simultaneous zero denominator. Interchanging x and y gives the corresponding n-y bounds. These monotonic extrema apply across quadrants and rectangles crossing an axis; they do not require a single quadrant.

The resulting independent component intervals enclose every physical $\mathbf n=\mathbf r/|\mathbf r|$ in the entire original relative-position box. They are tighter bounds on that same constrained physical family, rather than a claim that every vector in the component rectangle is unit. All universal frame formulas, angular/root derivatives, actual incoming receiver constraints and comparison-versus-actual source inventories retain their prior meaning. Range bounds and all initial/translated/receiving root boxes are unchanged. The selected successor uses precisely Section 60's original v8 case and changes only this equivalent normalized-direction enclosure. **Derived geometric component bound and same complete target case frozen before implementation, controls, independent assessment or target:** no improved numerical rate or event is asserted. Falsifiers include selecting the wrong absolute-y endpoint for a negative x numerator, forgetting an axis crossing in the absolute minimum, a zero-range input, or applying tighter direction bounds to only nominal geometry while other mean-value families lie outside the declared rectangle.

The first direction-box implementation and its failed known record are preserved: its exact-axis control expected one while generic outward square-root division returned an interval containing one. A unique successor adds the analytically exact axis evaluation $x/|x|=\operatorname{sign}(x)$ when the transverse endpoint is zero, retaining the already exact zero-numerator case. The [direction-box v2 coefficient source](../evidence/maxwell-shaped-overnight-unit-frame-clock-direction-v2.mjs), SHA `9fef4f68b1f246f27061ca9cff13f55d75f763e12baab40e50560ea1befe8d5a`, passed axis, negative-quadrant, axis-crossing, zero-range rejection and all original nonzero source-A/J/U controls before target in `direction-frame-v2-known.log`. The [same-case receiving wrapper](../evidence/maxwell-shaped-overnight-T38-v8-direction-frame-v2-receiving-test.mjs), SHA `9ab96209fbaf9b131d4c6c183efa1daccf7022baf9b891c679ecb9b4b762e8b9`, selects a fresh output and binds the successor source. **Independent source assessment pending; no direction-box target has run.**

The unchanged known-first integrated-work corollary applied to Section 60's 846 accepted cells also returns no witness; `T38-v8-incoming-frame-v2-work-corollary.json` preserves the exact signed sum and parent bindings. Independent sum/induction assessment remains required. This is a third proof-budget limitation for that fixed receiving test, not evidence of an actual absence of a unit event.

## 63. Planar receiver-map product bounds on the same comparison clock

**Derived prospective coefficient bound frozen before implementation or target.** In the selected planar ordinary full response, write $F=L_u(n)E$, with $L_u=(1-n\cdot u)I+nu^{\mathsf T}$. At fixed physical n its orthonormal-frame matrix is $\begin{pmatrix}1&u_t\\0&1-u_n\end{pmatrix}$. Therefore $L_u-I$ has a single nonzero column $(u_t,-u_n)^{\mathsf T}$ and $\|L_u\|_2\le1+|u|$. At fixed Cartesian u, a physical direction variation satisfies $\delta L_u=-(\delta n\cdot u)I+\delta n\,u^{\mathsf T}$. In two dimensions, with $\delta n=t\delta\theta$, its frame matrix is $\delta\theta\begin{pmatrix}-u_t&0\\u_n&0\end{pmatrix}$, so $\|\delta L_u\|_2=|u|\,|\delta n|$.

The comparison-clock direction derivative is $\delta n=t(\xi_t+v_t\xi_n/D)/R$, retaining the delayed source-position/root shift. Hence its Euclidean operator norm is $\sqrt{1+(v_t/D)^2}/R$. Applying the exact product rule at fixed actual receiving u gives

$$
\|A_{X,\mathrm{full}}\|_2\le(1+|u|)\|A_{X,E}\|_2+|u|\,|E|\frac{\sqrt{1+(v_t/D)^2}}R.
$$

Here E and its signed comparison-clock derivative contain all nominal source V/A/J and the same root, range and source-clock denominator. There is no actual-source jerk substitution. Direct source-V and source-A partials obey $\|F_V\|_2\le(1+|u|)\|E_V\|_2$ and $\|F_A\|_2\le(1+|u|)\|E_A\|_2$, since L does not depend on those inputs when physical n and u are held fixed. Receiving derivative remains the exact skew row, with norm $|e_t|$ in the plane. Under the actual no-earlier-unit branch one may use $|u|\le1$ in these bounds; the receiving test defect remains unclipped and does not use this hypothesis.

These pointwise inequalities can be enclosed over the entire same physical input families and minimized with the independently valid original full coefficient bounds. Both candidates must enclose the whole original family before taking their minimum. The product bounds do not license a narrower nominal root family or remove actual source X/V/A uncertainty. They are planar bounds; no full Cartesian ring derivative assertion follows from their two-dimensional matrix proof. The target case, if used, is exactly Section 62's unchanged original v8 receiving test. No numerical improvement is asserted. An omitted direction/root term, an actual-J substitution, use of $|u|\le1$ for the superunit comparison defect, or a coefficient minimum taken between bounds on different input families falsifies the application.

The independent worker assessed the direction-v2 source and same-case wrapper against its previously fixed rectangle monotonicity proof, inspecting the diff and rerunning known controls in `reviewed-direction-frame-v2-known.log`. It accepted all quadrants, axis crossings, exact axis branches and positive-range rejection, with unchanged actual-U hypothesis and unclipped nominal defect. The watched same-case target was then launched after this admission. **Target pending; no gain or actual unit endpoint is asserted.**

## 64. Signed planar work with Euclidean delayed-source A support

**Derived prospective interval corollary frozen before source implementation or target.** At the same complete physical input, Section 58's unit-frame E components give $W=2(u_ne_n+u_te_t)$; full has the identical signed value by its receiver-map identity. This applies to actual receiving U under the hypothetical incoming unit-speed bound, with every physical normalized n and source V input still ranging over the complete root/input family. No postevent test U is substituted for actual U.

Let $a_c(S)$ be the nominal comparison source acceleration at every actual root S in the retained whole support and let $|a_s(S)-a_c(S)|\le p_A$ be the independently admitted Euclidean completed-source error. Evaluate $W_c$ with that nominal acceleration but the entire actual relative-position, source-velocity and receiving-velocity families. Section 55's exact acceleration covector yields the pointwise support interval

$$
W\in W_c+[-p_A Q_A,p_A Q_A],\qquad Q_A=\frac{2|u_t|\sqrt{D^2+v_t^2}}{RD^3}.
$$

Source-V offsets and their convex input path remain enclosed separately; replacing source A alone does not replace root-shift, source X/V, geometry or receiver uncertainty. Comparison A must be enclosed on the entire possible actual root support, not merely a nominal emission time. The same physical normalized direction is used to project source V/A and receiver U; independent direction boxes remain enclosures of that constrained family. No source jerk is needed for this undifferentiated work bound. The prior comparison-clock J terms in cylinder transport remain unchanged.

If a previous Cartesian response evaluation and this unit-frame/support evaluation each enclose the same whole actual input family, intersect their signed-work intervals: the maximum of the two lower bounds is valid, and an empty intersection rejects the candidate. This is an interval tightening, not an alteration of the response. Use the resulting entire-cell bounds only on independently accepted contiguous receiving cells. A positive minimum on all cells preceding a separately certified first-face or terminal witness establishes transversality; a negative minimum remains inconclusive. Integrated-work existence can use conservative negative lower bounds but still cannot integrate an actual outgoing path. The selected target, if this corollary is used, remains Section 62's unchanged original v8 case. Missing closed source-A bins, an omitted source-V convex family, a nominal-root-only A evaluation, test-U clipping or an interval intersection across different families falsifies the application.

The independent worker subsequently accepted Section 60's complete 846-cell conditional induction and every accepted-face calculation, and independently reconstructed its exact integrated-work sum from Gaussian history coefficients. `reviewed-full-incoming-v2-work.json` binds the corollary ancestor and accepted-only arithmetic, with squared-speed lower approximately $0.77366<1$ and no witness. **Accepted conditional receiving enclosure with no incoming-event consequence:** its endpoint is covered, but terminal gap, all accepted faces and integrated work each remain nonforcing. This does not turn the analytical test into an actual outgoing solution.

## 65. Scalar transverse angular derivative and exact receiver cancellation

**Derived equivalent algebra frozen before implementation or target.** Keep the same physical planar normalized frame and opposite-polarity notation of Section 58. At fixed physical source V/A, the scalar $N=v_ta_n+Da_t$ obeys $N_\theta=-a_n$: the $v_ta_t$ terms cancel and $v_n+D=1$. Also $w_\theta=0$. Therefore the scalar angular derivative of the transverse E component is

$$
p=\partial_\theta e_t=-\frac{wv_n}{R^2D^3}+\frac{3wv_t^2}{R^2D^4}-\frac{a_n}{RD^3}+\frac{3Nv_t}{RD^4}=-\frac{wv_n}{R^2D^3}-\frac{a_n}{RD^3}+\frac{3v_t e_t}{D}.
$$

The physical-vector E angular components are $e_{\theta,n}=-2wv_t/(R^2D^3)-e_t$ and $e_{\theta,t}=e_n+p$. Including both output-basis and receiver-component rotation gives the exactly equivalent full vector

$$
F_\theta=\begin{pmatrix}e_{\theta,n}+u_t p\\e_n+(1-u_n)p\end{pmatrix}.
$$

In particular a stationary source with zero acceleration has $p=0$ and $F_\theta=(0,e_n)$ for every fixed physical receiver U, including algebraic superunit test U. This removes an avoidable dependency between $e_{\theta,t}$ and $e_n$ in Section 58's equivalent expression. It does not discard either frame rotation or any delayed source-A/J/root-clock term. An interval implementation may independently enclose both displayed scalar-p expressions, both E-angular expressions and both full-angular expressions and intersect corresponding components, because each contains the same entire constrained physical input family. An empty intersection rejects the candidate; it cannot be silently repaired or interpreted as a new physical input.

The full clock then retains $(F_R+(v_t/R)F_\theta-F_Va-F_Aj)/D$ and $F_\theta/R$, with nominal comparison V/A/J and its own D. Direct actual V/A sensitivities and receiving skew remain separate. This is a closed-form enclosure refinement on Section 62's unchanged original-v8 receiving case, with the comparison test/defect still unclipped. No numerical improvement or event is asserted. A missed basis rotation, $N_\theta$ sign error, incorrect use of constant w under source-V differentiation, or incompatible-family intersection falsifies the refinement.

## 66. Checked bounded fate of the original full beta-three-tenths binary

Freeze the resulting conclusion for the complete Section 3 original full preparation: opposite polarity, equal fixed $K=1$, $c_f=1$, mirror planar $r=25/9$, $\beta=3/10$, circular complete old tail and the full row's own compatible terminal patch. This is the same actual solution enclosed by the independently admitted v8 prefix through 38, with all 11,072 cells and original input/defect bindings. The receiving test used afterward is only an analytical comparison against completed actual source history; it is not an auxiliary release or an adopted superunit future. Sections 62's equivalent coefficient enclosure changed no physical equation, past or comparison polynomial.

The direction-v2 target completed 846 strict conditional cylinders to exactly $38.42$, retaining all original source-A forcing and nominal comparison-clock J terms. `T38-v8-direction-frame-v2-receiving-test.json`, SHA `f68698721347e857d3ea57abe9996867cbe5f8de10e43ae4a2b2417eb061b2e8`, has final speed gap $3543407019961137476591/(2\times10^{23})>0$. The independent worker assessed the entire induction with its separately authored Gaussian history/closed-source/analytic-majorant checker before admitting any actual event consequence.

More sharply, both the independently frozen Gaussian face checker and the subject [accepted-face instrument](../evidence/maxwell-shaped-overnight-accepted-face-speed.mjs) find the first strict face witness at cell 793, time

$$
T_w=\frac{337713438829866759}{8796093022208000}<38.39357291666,
$$

with whole-cell velocity error $6140083254492307517883/10^{23}$ and test-speed lower $1.061632117497725355635225$. The exact strict reverse-triangle gap is $46256990560456091279/(2\times10^{23})>0$. `T38-v8-direction-frame-v2-accepted-speed.json` preserves all face values and binds the original receiving receipt. The independent receipt `reviewed-full-direction-frame-v2-faces.json` separately reconstructs the same witness. Every possible first-event state from 38 through this face lies in accepted cylinders whose entire-cell signed-work lower bounds have positive minimum

$$
m=\frac{6523273890972389103167}{62500000000000000000000}>0.10437238.
$$

The negative work minimum on the later full 846-cell horizon is irrelevant to this restricted first-event conclusion; no later or rejected state is borrowed. **Derived bounded actual fate with independently checked interval premises:** there is a first incoming unit-speed endpoint $38<T_*<T_w$ at positive current separation, positive delayed range and transmitter denominator, with one ordinary partner root and no positive-delay self root throughout the incoming interval. The no-earlier-unit hypothesis closes every non-speed first-escape, complete-source and history margin before the strict speed contradiction, so this is an actual formulation boundary, not a failed analytical error budget or a retained numerical speed crossing.

The incoming acceleration has a finite continuous limit, and $\gamma=u(T_*)\cdot A(T_*)\ge m/2>0.05218619$. The complete original past is $C^{2,1}$, the actual prefix retains that regularity by Section 48, and completed old sources plus the positive range/denominator margins preserve it on the incoming cylinder. No numerical actual-jerk bound is inferred from acceleration errors. The checked transverse unit endpoint therefore satisfies Section 12's separately proved self-birth hypotheses: **conditional derived obstruction to any C2 classical continuation using unchanged all-positive-root per-hit algebra**, with its newborn self source still sampled on the strict-subfield incoming history. This does not select an equality response, a weak outgoing history, self exclusion, impulse or cap mechanism. It does not assert capture or persistent binding, and it does not classify every other binary preparation.

All three unrestricted/inclusive/strict speed labels agree on the incoming strictly subfield portion. The strict formulation ends at $T_*$. Inclusive or unrestricted labels supply no adopted boundary continuation; the conditional C2 obstruction concerns an attempted unchanged algebraic continuation only. The existing controlled contraction of the actual full binary on $[20,38]$ reaches this sharply delimited incoming event window after its earlier outward-to-inward radial turn. Remaining incoming geometric/polar margins are to be extracted only from the accepted 793-cell prefix and independently checked. A contrary complete original-history certificate satisfying the same response/root equation beyond this bound while staying strictly subfield, a failed source-support or recurrence premise, nonpositive true work at an allowed first endpoint, or a valid C2 all-root transverse continuation overturns the corresponding claim. Look first at the immutable original v8 prefix, the direction-v2 receiving receipt, its accepted-face witness and the independent assessments.

No further full receiving targets are needed. The independently assessed angular/product/work refinements remain unrun prospective alternatives, preserving their mathematical derivations without a numerical gain claim. The earlier v6, Cartesian-v8, incoming-frame-v2 and failed longer tests remain unchanged evidence of their certificate limitations.

## 67. Exact incoming margins and polar continuation to the unknown endpoint

The [first-face domain postprocessor](../evidence/maxwell-shaped-overnight-first-face-domain.mjs), SHA `27aba33a94e34d61cbfc566bcd2a3fcec43780de913e88f87869ebc552b38ed6`, passed signed 3-4-5, Euclidean perturbation containment, exact prefix-minimum exclusion, strict/equality speed guard and uncompleted-source controls before target in `first-face-domain-known.log`. Before reading it, the independent worker fixed a separate Gaussian norm-ball polar construction and controlled that construction, then assessed this subject's exact history/cubic binding, whole-cell rectangles, prefix minima and unknown-endpoint integration in `reviewed-first-face-domain-known.log`. The immutable target then produced `T38-v8-first-face-domain.json`, SHA `b4c390e60d8b0ddc11e21c1aafe9ec5f5252830ed310d491269f2d956aa3003b`. The independent worker subsequently accepted all 793 source/domain/work minima, exact speed guard and conservative polar consequences against its separate references.

**Derived actual incoming bounds with independently checked premises.** The consecutive entire-cell upper-speed triangles prove the strict lower event bound

$$
\frac{33720555608380327}{879609302220800}<T_*<\frac{337713438829866759}{8796093022208000},
$$

so in safe displayed decimals $38.3358333333266<T_*<38.39357291666$. Before and at the incoming limit, the delayed range exceeds $0.6605$, the actual transmitter denominator exceeds $0.8096$, the comparison-clock denominator exceeds $0.8131$, current pair separation exceeds $0.4267$, positive delay exceeds $0.6675$, and every sampled source lies at least $0.2744$ before the completed checkpoint 38. These are deliberately weaker decimal lower bounds on the exact retained rational minima. In particular the endpoint has positive separation and ordinary old-source partner roots; contact, a denominator fold, unfinished source support and history-regularity loss do not precede this named unit boundary on this case.

The rectangle postprocessor bounds the half-pair radius on the entire possible incoming window by $(0.2122381,0.4518705)$, radial velocity by $(-1.030263,-0.4054080)$, tangential velocity by $(0.4869965,0.8146072)$ and phase rate by $(1.3233461,3.8381757)$. The lower radial endpoint is conservative and may exceed the unit-speed constraint in magnitude; no actual superunit incoming velocity is inferred from this interval superset. The exact retained bounds therefore prove strict inward radial motion and positive angular advance throughout $[38,T_*]$. Combined with the independently admitted actual $[20,38]$ window, the original full binary contracts strictly from 20 to its first unit endpoint, after its earlier outward-to-inward turn. This is neither a capture theorem nor a periodic solution.

Phase and radius changes are integrated only to the unknown actual endpoint. The strictly subfield guard gives a positive lower elapsed duration, and the first-face witness gives its upper duration; `T38-v8-first-face-domain.json` records exact phase-increment and radius-decrease bounds from those two durations and the entire incoming polar ranges. The independent norm-ball construction yields separately tighter bounds, with the same guard and conclusion; it is not required to equal this more conservative rectangle calculation. No actual phase or radius is integrated to a postevent receiving-test horizon. Every accepted receiving row also retains its entire source root, nominal delayed source-A box, Euclidean source-A error and expanded actual-A box; these are the delayed-acceleration records for the possible incoming endpoint, not an actual-jerk estimate. Any missing closed source bin, nonpositive true margin, opposite polar sign or false whole-cell speed guard falsifies the corresponding diagnostic.

All owned full receiving computations are closed. The angular coefficient instrument passed independent pretarget assessment and known controls but was not run on an additional full target; the planar product and signed-work refinements likewise remain unused prospective mathematical bounds. Existing failures, the successful nonforcing incoming-frame enclosure and the decisive direction-v2 case preserve their distinct provenance.
