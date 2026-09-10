# First smooth environmental response to the fixed two-particle past

## Result and scope

The explicit smooth-compatible control in the [independent release adjudication](finite-perturbation-release-independent-adjudication.md#6-concrete-control-assessment) has a nonstationary EOM future after an exactly determined waiting interval. Its first response begins at

$$
T_*=\left(\sqrt2-\frac{11}{8}\right)\ell.
$$

Every particle remains stationary on $[0,T_*]$. At $T_*$ the arriving profile and its relevant derivatives still vanish, so acceleration is zero at the boundary itself. On a common positive interval immediately after it, exactly 24 environmental particles move. Sixteen have displacement beginning at fifth order in $(T-T_*)/\ell$; eight begin at sixth order. The two targets and all remaining environmental particles remain stationary on this interval.

The continuation is globally $C^3$ across both the original release and this response onset. Its complete causal census has exactly one root in every distinct-label channel and no positive-delay self root, with explicit population-uniform margins. Every received emission through this response interval is still earlier than the original release at zero. Thus entry of newly generated source histories is not needed to establish this first actual response.

These are derived conditional results under the same fixed complete-block summation prescription and the same initial control. They are submitted for independent review. No source profile, amplitude, direction, physical law, or history class is changed. The result continues through the onset for a positive duration depending on the declared coupling and uniform bounds; it does not claim completion of the full pulse, later regularity, or contact.

## 1. The fixed input and its early profile

Set $c_f=1$. Labels are $i\in\mathbb Z^3$, anchors are $\mathbf z_i=\ell i$, and polarity signs are $\sigma_i=(-1)^{i_1+i_2+i_3}$. Retain $G=\kappa q_0^2>0$, $\ell>0$, and the two changed labels $E=\{0,e_1\}$. Both target directions are the same vector $\mathbf e=(0,0,1)$. The exact profile, amplitude, and prescribed past are

$$
\psi(v)=
\begin{cases}
v(1-v^2)^4,&|v|<1,\\
0,&|v|\geq1,
\end{cases}
\qquad
\phi(t)=\psi\big(8(t+5/4)\big),\qquad
\varepsilon=2^{-16},
$$

$$
\mathbf X_j(s)=
\begin{cases}
\mathbf z_j+\varepsilon\ell\,\mathbf e\,\phi(s/\ell),&j\in E,\\
\mathbf z_j,&j\notin E,
\end{cases}
\qquad s\leq0.
$$

These are exactly the smooth-compatible pasts fixed by the independent review. The function is $C^3$ at its support endpoints. Its support in emission time is

$$
[s_a,s_b]=[-11\ell/8,-9\ell/8].
$$

The review's direct coefficient bounds give complete-past displacement at most $\varepsilon\ell$, speed at most $\nu=5/512$, acceleration at most $3/(8\ell)$, and jerk at most $27/(2\ell^2)$. These all have strict slack inside the original [population class](population-history-class.md). Endpoint positions are the anchors and all endpoint derivatives through order three are zero. The supplied past is initial data, not asserted to solve the EOM before zero.

Near the beginning of the support, use the dimensionless emission offset $u=(s-s_a)/\ell$. The actual dimensionless target displacement, including its already fixed amplitude, is the polynomial

$$
\begin{aligned}
p(u)&=\varepsilon\phi(-11/8+u)\\
&=(-1+8u)u^4(1-4u)^4\\
&=-u^4+24u^5-224u^6+1024u^7-2304u^8+2048u^9,
\qquad 0\leq u\leq1/4.
\end{aligned}
$$

The factor $\varepsilon$ cancels the factor $16^4$ from the rescaled fourth-order endpoint zero. In these variables the target displacement is $\ell p(u)\mathbf e$, its velocity is $p'(u)\mathbf e$, and its acceleration is $p''(u)\mathbf e/\ell$. In particular,

$$
p(u)=-u^4+O(u^5),\qquad p'(u)=-4u^3+O(u^4).
$$

Useful explicit bounds on the shorter interval $0<u\leq1/64$ are

$$
\frac12u^4\leq-p(u)\leq u^4,\qquad
2u^3\leq-p'(u)\leq4u^3,\qquad
|p''(u)|\leq14u^2.
$$

For the first bound use $(1-8u)(1-4u)^4\geq(7/8)(15/16)^4>1/2$. For the second, differentiate to obtain

$$
p'(u)=-4u^3(1-4u)^3(1-18u+72u^2).
$$

Both factors following $-4u^3$ lie between positive constants and one on the stated interval; their product exceeds $1/2$. Differentiating this expression once more bounds $|p''|$ by $12u^2+120u^3<14u^2$. These estimates concern the fixed control, without an amplitude or profile sweep.

The stationary background uses the existing blocks $P_n=\{2n+\epsilon:\epsilon\in\{0,1\}^3\}$. For $\mathbf K(\mathbf y)=\mathbf y/\|\mathbf y\|^3$, their alternating third finite differences give far-block receiver-derivative bounds $C_kG\ell^3R^{-5-k}$ for $k=0,1,2$. Cubic shell counting makes those block sums and derivatives uniformly convergent away from finitely excluded anchors. Their acceleration at every anchor is zero by the independently reconstructed symmetric-cube boundary estimate. The [admissibility adjudication](population-admissibility-independent-adjudication.md#2-stationary-cancellation-and-its-summation-scope) owns that conditional prescription and its proof; no arbitrary-source rearrangement is used here.

## 2. Exact arrival times and the stationary interval

First evaluate reception at an anchor $\mathbf z_i$. For a distinct changed source $j$, its emission-to-reception map is

$$
\mathcal T_{ij}(s)
=s+\|\mathbf z_i-\mathbf X_j(s)\|.
$$

The derivative is the transmitter factor $1-\mathbf n\cdot\dot{\mathbf X}_j(s)$, at least $1-\nu>0$. Thus the map is strictly increasing. Since the source displacement vanishes at both support endpoints, the exact reception interval of its perturbed portion is

$$
\left[
\ell\|i-j\|-\frac{11\ell}{8},
\ \ell\|i-j\|-\frac{9\ell}{8}
\right].
$$

There is no direction-dependent shift of either endpoint. Source motion changes the map inside this interval, and is retained there.

The nearest distinct-label lattice distance is $\ell$. Its entire perturbed reception interval is $[-3\ell/8,-\ell/8]$, before release. The next distance is $\sqrt2\ell$, whose first endpoint is $T_*$. All other lattice distances are at least $\sqrt3\ell$ and first receive this support at or after $(\sqrt3-11/8)\ell>T_*$. The two targets are separated by $\ell$. Self channels have no positive root because the complete supplied histories, joined to a stationary future, have speed less than one.

It follows directly that the stationary appended paths solve the full EOM for every $0\leq T\leq T_*$. At each reception in the open waiting interval, the unique root from either target samples stationary source position and velocity. At the upper endpoint, an arriving support endpoint has the same stationary jets. Every row is therefore its stationary row, and the prescribed block sum is zero.

Root completeness here follows from more than the support calculation. With $\tau=T-s>0$,

$$
f_{ij,T}(\tau)=
\tau-\|\mathbf X_i(T)-\mathbf X_j(T-\tau)\|
$$

is strictly increasing with slope at least $1-\nu$ in a distinct-label channel. Its value at zero is negative, and bounded displacement makes it positive for sufficiently large delay. It has exactly one root over the entire past. For a self channel, the common speed bound gives $f_{ii,T}(\tau)\geq(1-\nu)\tau>0$. Thus no other causal branch can create an earlier response.

The initially local theorem is not being assumed to cover this longer waiting interval. The stationary solution has just been verified explicitly at every time up to $T_*$. For uniqueness in the accepted bounded classical domain, restart the accepted [local theorem](finite-perturbation-release-compatibility.md#4-a-common-first-interval-of-coupled-evolution) along this explicit solution. Its uniform initial margins and source bounds are unchanged along the waiting interval, so one common positive local length is available and finitely many successive uniqueness neighborhoods cover it.

### The first receiving labels

Define

$$
\mathcal S_j=\{i:\|i-j\|^2=2\},\qquad
\mathcal S=\mathcal S_0\cup\mathcal S_{e_1}.
$$

Each set has 12 labels, obtained by permuting $(\pm1,\pm1,0)$. They are disjoint: equality of both squared distances would require $2i_1-1=0$, impossible for an integer $i_1$. Neither set contains a target. Hence $|\mathcal S|=24$, and each of these receivers has exactly one changed source at distance $\sqrt2\ell$.

For that source let $\mathbf k=i-j$ and $\mathbf n=\mathbf k/\sqrt2$. At eight receivers in $\mathcal S$, $k_3=0$; at the other sixteen, $k_3=\pm1$. This split will determine the first nonzero order of the response. The earlier 32-label release test concerned two different distance shells. The present 24-label count concerns only the first arriving shell of this fixed profile.

**Grade: derived for the exact reception boundary, stationary solution, and label count.** A perturbed arriving row at $0<T<T_*$, a second cross root despite strict monotonicity, or an additional integer label in the first shell would falsify the corresponding conclusion. Acceleration is zero at $T_*$ itself: it is the infimum of times with a nonzero future response, rather than an earliest time with strictly nonzero acceleration attained at the boundary.

## 3. A globally smooth continuation through the onset

Regard the explicitly verified history through $T_*$ as the initial past for a new cut. Every environmental past is still stationary. Only the same two target histories differ from their anchors, through the original old bump. This is exactly the fixed-finite-source setting of the accepted release theorem, translated in absolute time.

All its original quantitative initial conditions hold with slack. Distinct endpoint separation is $\ell>\ell/8$. The complete displacement bound is $\varepsilon\ell$, and speed is at most $\nu<1/4$. Each cross channel has one root. A centered tube of half-width $w=\ell/256$ has transmitter magnitude at least $1-\nu$, and its outside residual has magnitude at least $(1-\nu)w$. Its range is at least $\ell(1-2\varepsilon)>w$. Every self residual is at least $(1-\nu)\tau$, so both the original normalized near-zero condition and its ordinary complement condition hold.

At this cut all left receiver derivatives vanish. At a newly arriving endpoint $s=s_a$, the source displacement, velocity, and acceleration vanish. The complete row therefore equals its stationary value, and its reception-time derivative vanishes. Other channels sample stationary source jets. Both exact cut conditions consequently hold at every label:

$$
\mathbf a_i^-=\mathcal A_i(X_{\leq T_*})=\mathbf0,\qquad
\mathbf j_i^-=
\left.\frac{d}{dT}\mathcal A_i(X_{\leq T})\right|_{T_*^+}
=\mathbf0.
$$

The second identity is evaluated with zero receiver velocity and the known old source acceleration. It does not assume the future to be stationary.

Apply the accepted theorem at this cut. For reference, its construction chooses $a=\ell/8192$, $\rho=\ell/262144$, a common field magnitude bound $K_0$, and a receiver Lipschitz bound $L$. With $K=\max(K_0,\ell^{-1})$ and $\overline V=5$, it supplies any sufficiently small $h>0$ satisfying

$$
\begin{gathered}
h\leq\min(a,\rho),\qquad
\overline Vh\leq\rho/2,\qquad
Kh\leq1/32,\\
(1+2\overline V)h\leq\ell/16,\qquad
Lh^2\leq1.
\end{gathered}
$$

Shrink it also to $h/\ell\leq1/128$ when using the estimates below. The uniform field and derivative bounds are proved in the accepted theorem using the convergent stationary background and the two finite changed-source sums. No new population-history estimate is substituted for them.

The resulting future on $[T_*,T_*+h]$ is $C^3$ on its right side and matches the stationary left acceleration and jerk. Combining this with the already matched cut at zero gives a globally $C^3$ appended history on $(-\infty,T_*+h]$. The prescribed older history remains the same $C^3$ input.

### A stronger complete census for this particular continuation

The local construction gives, with $t=T-T_*$,

$$
\|\dot{\mathbf X}_i(T)\|\leq Kt\leq1/32,\qquad
\|\mathbf X_i(T)-\mathbf z_i\|\leq Kt^2/2\leq\rho/2<\varepsilon\ell.
$$

Together with the old bounds, the entire appended history has speed at most $\widehat\nu=1/32$ and displacement at most $\varepsilon\ell$. Therefore, uniformly over all labels, reception times in the proved interval, and earlier emission times,

$$
\|\mathbf X_i(T)-\mathbf X_j(s)\|
\geq\ell\|i-j\|-2\varepsilon\ell
\quad(i\ne j).
$$

Each cross residual is globally increasing with slope at least $31/32$, has opposite endpoint signs, and has exactly one complete-past root. At that root,

$$
r=\tau\geq\ell(1-2\varepsilon),\qquad
D_t\geq31/32.
$$

The same range and transmitter bounds hold throughout every width-$w$ root tube. Outside it the residual gap is at least $31w/32$. Every self residual obeys

$$
f_{ii,T}(\tau)\geq31\tau/32>0.
$$

Thus the exact zero-delay diagonal remains excluded, and there are no positive-delay self contributions. The original root-width, range, transmitter, and complement conditions are preserved with slack, not merely replaced by relaxed certificates. These statements include the entire old past; no finite-memory root search is used.

Because $T_*/\ell<1/16$ and $h/\ell\leq1/128$,

$$
T\leq T_*+h<9\ell/128<\ell(1-2\varepsilon)\leq r.
$$

Every actual cross emission satisfies $s=T-r<0$. This stronger estimate verifies that the arriving sources belong to the past of the original release, not only to the past of the translated cut at $T_*$.

**Grade: derived conditional continuation and complete census.** Failure of an original root margin at the translated cut, a cut-derivative mismatch, or a positive root inconsistent with the global speed and separation bounds would falsify the corresponding step. The accepted local theorem is consumed only after its hypotheses have been checked anew at $T_*$.

## 4. The actual nonstationary response

The following calculation distinguishes the acceleration evaluated at a stationary test point from the motion of the actual EOM receiver. First compute the former exactly to leading order, then control the receiver's feedback through the full field.

Write

$$
\theta=\frac{T-T_*}{\ell},\qquad
g=\frac G\ell,\qquad
\mathbf y_i(\theta)=\frac{\mathbf X_i(T)-\mathbf z_i}{\ell}.
$$

Here $g$ is the dimensionless form of the already declared coupling, not a new physical parameter. For $i\in\mathcal S$, use its unique first-arriving source $j$, $\mathbf k=i-j$, and $\mathbf n=\mathbf k/\sqrt2$.

### Incoming acceleration at the anchor

At the anchor the dimensionless source emission offset $u$ is the unique solution of

$$
\sqrt2+\theta-u
=R(u):=\|\mathbf k-p(u)\mathbf e\|.
$$

Its reception derivative is $d\theta/du=D(u)$, where

$$
D(u)=1-\frac{k_3-p(u)}{R(u)}p'(u)\geq1-\nu.
$$

In particular, $(1-\nu)u\leq\theta\leq(1+\nu)u$ near the endpoint. Expansion of the exact range gives

$$
\theta=u-n_3p(u)+O(p(u)^2),\qquad
u=\theta+O(\theta^4).
$$

The two labels in a squared-distance-two channel have the same polarity, so $\sigma_i\sigma_j=1$. The dimensionless difference from the stationary row is

$$
\mathbf Q_i(\theta)
=\frac{\mathbf k-p(u)\mathbf e}{R(u)^3D(u)}
-\frac{\mathbf k}{(\sqrt2)^3}.
$$

The other changed target's row is stationary at this anchor over the small interval in question. The stationary complete sum cancels, hence the full anchor acceleration is $G\mathbf Q_i(\theta)/\ell^2$.

For $n_3\ne0$, the transmitter-density change is the leading effect:

$$
\mathbf Q_i(\theta)
=\frac{\mathbf n n_3}{2}p'(u)
+O(u^4)
=-2\mathbf n n_3\theta^3+O(\theta^4).
$$

For $n_3=0$, that cubic term vanishes. The source displacement changes the received direction at fourth order, while $D-1=O(u^7)$. Therefore

$$
\mathbf Q_i(\theta)
=\frac{\mathbf e}{2\sqrt2}\theta^4+O(\theta^5).
$$

These formulas preserve the signed transmitter factor and the source's moving emission time. They do not insert a receiver-side multiplier into the instantaneous acceleration.

### Why receiver motion does not cancel these leading terms

Let $\mathscr F_i(T,\mathbf x)$ be the old-emission field constructed at the translated cut, and define its dimensionless version

$$
\mathbf f_i(\theta,\mathbf y)
=\ell\,\mathscr F_i(T_*+\ell\theta,\mathbf z_i+\ell\mathbf y).
$$

The actual equations on this interval are

$$
\mathbf y_i''(\theta)=\mathbf f_i(\theta,\mathbf y_i(\theta)),
\qquad
\mathbf y_i(0)=\mathbf y_i'(0)=\mathbf0.
$$

They have the accepted common bounded classical uniqueness. The finite source sums and stationary derivative bounds give

$$
\Lambda=\sup\|D_{\mathbf y}\mathbf f_i\|<\infty,\qquad
\|\mathbf f_i(\theta,\mathbf y)-\mathbf f_i(\theta,\mathbf0)\|
\leq\Lambda\|\mathbf y\|.
$$

If the dimensionless acceleration at the anchor is $O(\theta^m)$, integration and this Lipschitz bound give $\mathbf y_i=O_g(\theta^{m+2})$. One direct proof applies the integral iteration to the weighted bound $B\theta^{m+2}$: the integral of the anchor acceleration is bounded by a constant times $\theta^{m+2}/((m+1)(m+2))$, and the receiver feedback gains two more powers of $\theta$. The iteration from zero retains this bound on a sufficiently small common interval, and its unique limit is the already constructed solution. This avoids assuming the improved order before proving it.

Consequently the receiver-position feedback enters its acceleration at order $\theta^{m+2}$ and cannot remove the displayed order-$\theta^m$ incoming term. Integrating twice gives the actual nonlinear EOM displacement:

| Environmental labels | Leading dimensionless acceleration $\mathbf y_i''$ | Leading dimensionless displacement $\mathbf y_i$ |
| --- | --- | --- |
| 16 labels with $n_3=\pm1/\sqrt2$ | $-2g\mathbf n n_3\theta^3+O_g(\theta^4)$ | $-(g/10)\mathbf n n_3\theta^5+O_g(\theta^6)$ |
| 8 labels with $n_3=0$ | $(g/(2\sqrt2))\mathbf e\theta^4+O_g(\theta^5)$ | $(g/(60\sqrt2))\mathbf e\theta^6+O_g(\theta^7)$ |

The remainders are uniform over these finite sets for each fixed $g>0$. Every leading coefficient is nonzero. A further positive common reduction of $h$ makes every listed displacement nonzero for every $0<T-T_*\leq h$. In the third coordinate, the sixteen fifth-order displacements begin with $-g\theta^5/20$, while the eight sixth-order displacements begin with $g\theta^6/(60\sqrt2)$.

For $i\notin\mathcal S$, including the two targets, $\mathscr F_i(T,\mathbf z_i)=0$ throughout this short interval. Its distance-$\ell$ bump receptions have ended before zero; its other perturbed receptions start no earlier than $(\sqrt3-11/8)\ell>\ell/4$, later than the interval under consideration. Its own self channel remains empty. Thus its constant path solves its receiver equation and bounded uniqueness makes it the actual path. Exactly the 24 listed environmental particles move during the constructed response interval. The environment's future was solved; it was not prescribed to have that support.

**Grade: derived actual EOM response at the stated local scope.** Falsifiers are an incorrect exact root or row expansion, receiver feedback of a lower order despite the Lipschitz integral bound, cancellation of a displayed nonzero leading coefficient, or motion of a supposedly stationary receiver whose anchor field is identically zero under the same unique equation.

## 5. Quantitative response bounds and original-class preservation

The onset formulas already prove a nonzero future. The following estimates also bound that future with the original history constraints.

For $0\leq\theta\leq1/128$, the emission comparison gives $u\leq(32/31)\theta<1/64$. Along the first-arriving shell, $R\geq1$ in units of $\ell$. The kernel derivative bound $\|D\mathbf K\|\leq2$ on the relevant short displacement segment, the polynomial bounds in Section 1, and $D\geq31/32$ give

$$
\|\mathbf Q_i(\theta)\|\leq C_m\theta^m,\qquad
\|\mathbf Q_i'(\theta)\|\leq32\theta^{m-1},
$$

where $(m,C_m)=(3,8)$ for $n_3\ne0$ and $(m,C_m)=(4,4)$ for $n_3=0$.

For the first bound in the transverse case, the kernel change is at most $2u^4$ and $|D-1|\leq4u^7$, which together give $3u^4$ before the change to $\theta$. In the other case, $|D-1|\leq4u^3$ gives a bound below $6u^3$ before that change. For the derivative bound, differentiate the exact row at fixed receiver: $ds/dT=1/D$, $\mathbf n'=-P\mathbf W/(rD)$, and $D'=(\|P\mathbf W\|^2/r-\mathbf n\cdot\mathbf A)/D$. The dimensionless velocity and acceleration bounds $4u^3$ and $14u^2$ give a row derivative below $20u^2$ in the general case. When $k_3=0$, $|n_3(u)|\leq u^4$ instead gives a bound below $8u^3$. The coefficient 32 covers the change from $u$ to $\theta$ in both cases.

Set also

$$
M=\sup\|D_{\mathbf y}\partial_\theta\mathbf f_i\|<\infty.
$$

This mixed derivative is part of the uniformly bounded second field derivatives already proved from the fixed source jets and stationary background. Choose a positive $\Theta\leq h/\ell$ with

$$
\Lambda\Theta^2\leq1,\qquad M\Theta^3\leq1.
$$

An absent or zero derivative bound makes its inequality automatic. Weighted integral iteration then gives, for $0\leq\theta\leq\Theta$,

$$
\begin{aligned}
\|\mathbf y_i(\theta)\|
&\leq\frac{2gC_m}{(m+1)(m+2)}\theta^{m+2},\\
\|\mathbf y_i'(\theta)\|
&\leq\frac{2gC_m}{m+1}\theta^{m+1},\\
\|\mathbf y_i''(\theta)\|
&\leq2gC_m\theta^m.
\end{aligned}
$$

For example, applying the map to the first displayed bound contributes at most $\Lambda\Theta^2/((m+3)(m+4))$ times its coefficient from the feedback integral; this is less than one half for both $m=3$ and $m=4$. The zero iterate starts inside the bound, so its limit does too. Differentiation of the integral equation proves the velocity bound, and the equation itself proves the acceleration bound.

Finally,

$$
\begin{aligned}
\|\mathbf y_i'''(\theta)\|
&\leq g\|\mathbf Q_i'(\theta)\|
+M\|\mathbf y_i(\theta)\|
+\Lambda\|\mathbf y_i'(\theta)\|\\
&\leq64g\theta^{m-1}.
\end{aligned}
$$

In the last step the two feedback coefficients are bounded using $M\Theta^3\leq1$ and $\Lambda\Theta^2\leq1$; their sum is smaller than the unused allowance above 32. All other receivers remain stationary and satisfy these bounds trivially.

In physical time these estimates imply the common bounds

$$
\|\ddot{\mathbf X}_i(T)\|
\leq\frac{16g}{\ell}\theta^3,\qquad
\|\mathbf X_i^{(3)}(T)\|
\leq\frac{64g}{\ell^2}\theta^2.
$$

Choose the final $\Theta$ smaller if needed so that

$$
g\Theta^3\leq16,\qquad g\Theta^2\leq1024.
$$

This preserves the original acceleration ceiling $256/\ell$ and jerk ceiling $65536/\ell^2$. The displacement and speed bounds from Section 3 already satisfy the original environmental and target envelopes with slack; the original density inequalities follow from those envelopes by the existing cube-volume argument. The constructed history therefore remains in the original class, including its globally $C^3$ regularity and original root constants, through a positive interval of actual environmental response. This stronger preservation is available because the concrete data have strict slack and zero acceleration and jerk at onset; it is not a claim for arbitrary saturated initial histories.

### An explicit nonzero-response bound

The leading-term remainders can also be bounded without choosing an uncomputed smallness threshold. Write $\mathbf Q_i(\theta)=\mathbf b_i\theta^m+\mathbf R_i(\theta)$, where $\mathbf b_i=-2\mathbf n n_3$ when $m=3$ and $\mathbf b_i=\mathbf e/(2\sqrt2)$ when $m=4$. On the interval already used above,

$$
\|\mathbf R_i(\theta)\|\leq128\theta^{m+1}.
$$

Here is a direct conservative remainder calculation. The exact range equation gives $|u-\theta|\leq|p(u)|\leq u^4$. Absolute coefficient sums of the displayed polynomial then give

$$
|p(u)+\theta^4|\leq40\theta^5,\qquad
|p'(u)+4\theta^3|\leq192\theta^4.
$$

For the cubic case, split the exact row difference as

$$
\mathbf Q_i=
\frac{\mathbf K(\mathbf k-p\mathbf e)-\mathbf K(\mathbf k)}D
+\mathbf K(\mathbf k)\frac{n_3(u)p'}D,
$$

where $n_3(u)=(k_3-p)/R$. Subtracting $\mathbf K(\mathbf k)n_3p'$ leaves a norm below $4u^4$. This follows from $\|\mathbf K(\mathbf k-p\mathbf e)-\mathbf K(\mathbf k)\|\leq2u^4$, $|n_3(u)-n_3|\leq2u^4$, and $|1/D-1|\leq5u^3$. Converting to $\theta$ costs less than $5\theta^4$; the remaining $p'$ coefficient error costs at most $96\theta^4$. Their sum is below the stated 128.

For the transverse case, $\|D^2\mathbf K\|\leq24$ on the short displacement segment where range is at least one. The kernel Taylor remainder is at most $12u^8$, and dividing it by $D$ costs less than $13u^8$. The weight change on its linear term costs less than $10u^{11}$; the stationary kernel's weight correction is at most $(64/31)u^7$. Thus subtracting $-\mathbf e p/(2\sqrt2)$ leaves a norm at most $13u^8+10u^{11}+(64/31)u^7<4u^7$. The displayed bound on $p(u)+\theta^4$ then gives a remainder below $128\theta^5$. All these estimates use the fixed polynomial and positive range and transmitter floors.

Let $\beta_i=\|\mathbf b_i\|$, equal to $\sqrt2$ or $1/(2\sqrt2)$, be the magnitude of the leading acceleration coefficient. Impose the explicit additional common bounds

$$
\Theta\leq\frac1{1024\sqrt2},\qquad
\Lambda\Theta^2\leq\frac14.
$$

The actual acceleration differs from $g\mathbf b_i\theta^m$ by at most

$$
128g\theta^{m+1}
+\frac{2\Lambda gC_m}{(m+1)(m+2)}\theta^{m+2}
\leq\frac12g\beta_i\theta^m.
$$

Indeed, the two terms are each at most one quarter of the leading magnitude: $128\Theta\leq\beta_i/4$, and $\Lambda\Theta^2\leq1/4$ is smaller than $\beta_i(m+1)(m+2)/(8C_m)$ in both cases. Integrating the projection twice proves the positive lower bound

$$
\frac{\mathbf b_i}{\beta_i}\cdot\mathbf y_i(\theta)
\geq
\frac{g\beta_i}{2(m+1)(m+2)}\theta^{m+2}>0,
\qquad 0<\theta\leq\Theta.
$$

This is a quantitative certificate of actual motion for every one of the 24 receivers. Every imposed upper bound has a positive solution for each declared fixed $g>0$. The final continuation interval is $[0,T_*+\ell\Theta]$, with $\Theta$ satisfying all the preceding bounds. It is specified without selecting a numerical value for $G$ or asserting a measured EOM trajectory.

## 6. Original past arrivals versus newly generated emissions

The first response is reception of an old part of the two target histories. Its support endpoint was emitted at $s_a=-11\ell/8$ and first reaches distance $\sqrt2\ell$ at $T_*$. Every received source time through the proved response interval satisfies the stronger inequality from Section 3,

$$
s\leq T_*+\ell\Theta-\ell(1-2\varepsilon)<0.
$$

Thus no emission generated at or after the original release has entered the EOM update on this interval. In a continued stationary lattice, the first cross reception of an emission from $s=0$ would occur at $T=\ell$ between nearest neighbors. The actual future is no longer stationary after $T_*$, so $\ell$ is a reference arrival time, not a proved exact arrival time in the evolving population.

For an actual later reception of a postrelease emission, the exact condition remains

$$
T=s+\|\mathbf X_i(T)-\mathbf X_j(s)\|,\qquad s\geq0.
$$

If a later continuation retained a complete displacement bound $b_{\rm later}$, it would imply $T\geq\ell-2b_{\rm later}$ for any such cross event. The corresponding first emissions from the new environmental motion begin at the later source-time boundary $s=T_*$. Those are distinct from the stationary emissions generated between zero and $T_*$. Locating their eventual first receptions requires that later continuation.

No new coupled estimate is needed to reach or cross the first response onset proved here. When newly generated source segments do enter the received roots, the present argument is insufficient: its field holds the arriving source histories fixed while solving each current receiver. A later proof must bound the effect of changing those source histories as well as the current receiver.

One exact obligation for that later step is a common history sensitivity estimate on a bounded regular interval. At a simple root, for a history difference $\mathbf h$, let $\mathbf q=\mathbf h_i(T)-\mathbf h_j(s)$. The [complete-root derivative](population-history-derivative.md#full-derivative-on-one-simple-root) contains

$$
\delta s=-\frac{\mathbf n\cdot\mathbf q}{D_t},\qquad
\delta\mathbf V_j=
\dot{\mathbf h}_j(s)+\ddot{\mathbf X}_j(s)\,\delta s.
$$

Consequently the later estimate must control source position and velocity differences, source acceleration at a shifted root, root completeness and transmitter floors, and the number of possibly nonstationary incoming sources uniformly over receivers. Under a hypothesized later displacement bound $b_{\rm later}$ and horizon $H$, an emission with $s\geq0$ can only come from anchor distance at most $H+2b_{\rm later}$. Lattice counting then gives a finite per-receiver source count; the two original changed pasts remain additional finite sources. This geometric count is a useful input to a future uniform Lipschitz and continuation estimate, not a proof of its self-map, derivative bounds, or lifespan. Such estimates have not been assumed to follow from the accepted first-interval theorem.

## 7. Working record and review boundary

The sources were frozen before writing this analysis. Only this assigned analysis and its scratch directory are authored. The complete fixed input remains the smooth-compatible specialization already present in the independent release review; no new prescribed population example or profile is introduced.

The mathematical advance is an exact waiting interval followed by a positive interval of actual nonlinear environmental motion with global smooth joining and a complete uniform causal census. The original first-interval theorem supplies local existence at the newly verified cut; the exact arrival calculation, actual-response expansion with receiver feedback, quantitative bounds, and original-class preservation are the new derived work. They await independent adjudication.

The task checker first passed known controls before running on this target: two formulas and one file link; fenced-dollar exclusion; invalid-macro, unescaped-spacing-command, whitespace, and control-character rejection; SHA-256 of a known string; the six unit lattice neighbors; polynomial multiplication, differentiation, and evaluation; inversion of an affine scalar function; and stationary, affine-radial, and instantaneous radial-acceleration jerk substitutions. Its initial stationary comparison distinguished IEEE signed zero from zero; using the mathematically relevant zero norm corrected that known-case assertion. The complete known suite then passed before any target run. Its receipt is `.tmp/smooth-two-particle-first-response/known-check.txt`.

Measured validation by `node .tmp/smooth-two-particle-first-response/check.mjs target` passed 270 KaTeX expressions using KaTeX 0.16.47, five relative file targets, delimiter and whitespace checks, the 24-label first shell and its 16/8 split, the exact onset polynomial and derivative, the conservative inequality constants, and unchanged hashes of all six live and frozen mathematical inputs. The receipt is `validation.txt` in the assigned scratch directory. Link checks verify file targets, not anchor resolution or browser layout.

The same instrument checked the fixed-anchor scalar root and received-row arithmetic for the 12 distinct first-shell orientations at four decreasing positive reception offsets. The normalized differences approach the independently derived leading coefficients, and the sampled rows obey the displayed conservative magnitude, derivative, and remainder bounds. These finite checks test the fixed-profile arithmetic; they neither simulate the receiver's EOM nor establish an inequality between the sampled offsets. The actual-motion result rests on the analytical receiver-feedback and positive-projection bounds above.

`node scripts/validate-content.mjs --check --strict` reported zero errors, zero warnings, and 30 notes in the live repository scope, with output retained as `content-validation.txt` in the assigned scratch directory. `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/analysis/smooth-two-particle-first-response.md` emitted no whitespace diagnostics; its return value 1 denotes the new-file difference. A failed rerun in one of these stated scopes would falsify that validation statement. None of these checks substitutes for independent mathematical review.

Recommended coordinator integration: retain the accepted local release theorem and add this derived fixed-control continuation to and through its first nonstationary environmental response, pending independent adjudication. The exact onset, nonzero motion of the 24 receivers, original-class bounds, and absence of received postrelease emissions belong to this bounded result. Completion of the entire received pulse, later coupled estimates, physical class selection, and contact remain separate. The manuscript and shared trackers are unchanged by this task.
