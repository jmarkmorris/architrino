# Separation increases throughout the first environmental-feedback interval

## Result and scope

Keep the complete past, infinite alternating lattice, stationary block prescription and coupling range of the [accepted generated-feedback continuation](smooth-two-particle-generated-feedback-independent-adjudication.md). Use wake-speed units $c_f=1$, lattice spacing $\ell$, dimensionless time $t=T/\ell$, coupling $g=G/\ell\in(0,16]$, and displacement $\mathbf y_i(t)=(\mathbf X_i(\ell t)-\ell i)/\ell$. Write

$$
H=\frac{17}{16},\qquad
\alpha=\sqrt2-\frac{11}{8},\qquad
\beta=\alpha+1=\sqrt2-\frac38,\qquad
\delta=t-\beta.
$$

The accepted continuation already exists through $H$ and places both targets at their anchors until $\beta$. The present result bounds the previously local separation remainder throughout $0<\delta\le H-\beta$. For the right target, $x(\delta)=y_{e_1,1}(\beta+\delta)$, the estimate is

$$
x''(\delta)\ge\frac{g^2}{300}\delta^8.
$$

The accepted reflection identities give equal third components, zero second components and opposite first displacements. Thus the normalized target separation is $d(t)=\|\mathbf X_{e_1}(\ell t)-\mathbf X_0(\ell t)\|/\ell=1+2x(\delta)$, and

$$
d'(t)\ge\frac{g^2}{1350}\delta^9>0,\qquad
d(t)-1\ge\frac{g^2}{13500}\delta^{10}>0.
$$

The targets therefore separate strictly throughout the entire already proved feedback interval. These are conservative bounds, not replacements for the accepted leading coefficients. No longer evolution interval, changed history, new summation prescription, arbitrary-population statement or long-time exclusion follows.

Claim grade: derived, submitted for independent reconstruction. The [earlier subject](smooth-two-particle-generated-feedback-continuation.md) and its independent adjudication are frozen dependencies. This proof controls actual EOM-generated source histories; auxiliary fixed-anchor responses below serve only as analytical comparisons with explicit error bounds.

## 1. The received source interval

Put $U=3/128$. Since $H-\beta=23/16-\sqrt2<U-1/10000$, it suffices to control received source offsets through $U$. The radical comparison follows by squaring the positive rational number $181/128+1/10000<\sqrt2$.

The accepted target equation has no old-pulse correction and at most four generated corrections, each of norm less than $1/9000$ before its factor $g$. Its stationary term is below $1/95000$. Hence, from resting target onset,

$$
\|\mathbf y_{e_1}''\|<g/2000,\qquad
\|\mathbf y_{e_1}(\beta+\delta)\|\le g\delta^2/4000.
$$

The accepted bound on every received generated source displacement is $1/819200$. For a unit anchor channel, the source offset $u=s-\alpha$ therefore obeys

$$
u\le\delta+\frac{g\delta^2}{4000}+\frac1{819200}<U.
$$

The last two terms are together less than $1/10000$ at $g=16,\delta=U$. All histories sampled here belong to the unchanged accepted prefix. On this source interval each of the four relevant environmental receivers sees precisely one nonstationary old-pulse correction. Its other target-source channel has anchor distance one and the old pulse has already passed; newly generated environmental motion has not yet been received there.

## 2. Bounds on the four environmental source histories

All source times in this section are offsets after $\alpha$. The exciting target is the left target. Vertical source anchors have exciting offsets $\mathbf k_z=(1,0,z)$, $z=\pm1$; transverse offsets are $(1,\pm1,0)$. The general reflected vertical case has $\mathbf k_z=(a,0,z)$, $a=\pm1$.

The original pulse as a function of its emission offset $v$ is

$$
p(v)=-(1-8v)v^4(1-4v)^4.
$$

Let $\mathbf U_z(u)$ be an actual vertical source displacement and $\mathbf V_z=\mathbf U_z'$. The bounds needed below are

$$
\begin{gathered}
\|\mathbf U_z\|\le gu^5/10,\quad
\|\mathbf V_z\|\le gu^4/2,\quad
\|\mathbf U_z''\|\le2gu^3,\\
|U_{z,1}|,|U_{z,3}|\le gu^5/16,\quad
|V_{z,1}|,|V_{z,3}|\le5gu^4/16,\\
\frac{gu^8}{20}-\frac7{360}g^2u^9
\le a(U_{+,1}+U_{-,1}),\qquad
|U_{+,1}+U_{-,1}|<gu^8/3.
\end{gathered}
$$

For each actual transverse source $\mathbf U_\perp$,

$$
\|\mathbf U_\perp\|\le gu^6/60,\quad
\|\mathbf U_\perp'\|\le gu^5/10,\quad
\|\mathbf U_\perp''\|\le gu^4/2,\quad
|U_{\perp,1}|<gu^9/64.
$$

These statements hold uniformly for $0<g\le16$ and $0\le u\le U$. The next three subsections derive them. In particular, their small first-component bounds do not follow by bounding total displacement alone.

### 2.1. Roots, pulse derivatives and receiver dependence

Write $c=1001/1000$, $c_-=999/1000$, $D_0=8191/8192$ and $d_0=\sqrt2$. The accepted prefix gives the coarse actual receiver bound $\|\mathbf y(u)\|\le gu^2/12800\le u^2/800$. Along the segment between zero and that displacement, the old arrival map for any auxiliary amplitude $\lambda\in[-1,1]$ is

$$
v+\|\mathbf k+\mathbf y-\lambda p(v)e_3\|-d_0.
$$

Its value at zero differs from zero by at most $\|\mathbf y\|$, and its derivative lies between $1-1/8192$ and $1+1/8192$. The unique root for reception offset $u>0$ consequently satisfies $c_-u\le v\le cu<1/40$. All ranges and subtraction segments exceed $7/5$; $|n_3|<3/4$, and the relevant vertical first and third components of $\mathbf K(\mathbf r)=\mathbf r/\|\mathbf r\|^3$ have magnitude below $3/8$.

Direct factorization gives

$$
\begin{aligned}
p'&=-4v^3(1-4v)^3(1-6v)(1-12v),\\
p''&=-12v^2(1-4v)^2(1-32v+288v^2-768v^3).
\end{aligned}
$$

The last cubic is positive, decreasing and at most one on $[0,1/40]$, as follows from its derivative and endpoint values. Hence $|p|\le v^4$, $|p'|\le4v^3$ and $|p''|\le12v^2$ there.

For the old correction $\mathbf Q=\mathbf K(\mathbf R)/D-\mathbf K(\mathbf k+\mathbf y)$, set $\mathbf W=e_3p'$, $\mathbf A=e_3p''$, $\mathbf R=\mathbf k+\mathbf y-e_3p$, $\mathbf n=\mathbf R/r$ and $D=1-\mathbf n\cdot\mathbf W$. Implicit differentiation gives $v_{\mathbf y}=-\mathbf n^{\mathsf T}/D$ and $\mathbf R_{\mathbf y}=I+\mathbf W\mathbf n^{\mathsf T}/D$. Using $\|D\mathbf K\|\le2/r^3$ and $\|D^2\mathbf K\|\le24/r^4$ yields

$$
\|D_{\mathbf y}\mathbf Q\|\le
24(5/7)^4P+
2(5/7)^3W_*(D_0^{-1}+D_0^{-2})
+(5/7)^2\big((5/7)W_*+A_*\big)D_0^{-3},
$$

where $P=c^4u^4$, $W_*=4c^3u^3$ and $A_*=12c^2u^2$. Adding the stationary derivative bound $4200u^4/800^2$, dividing by $u^2$ and evaluating the resulting positive-coefficient bound at $U$ gives

$$
\|D_{\mathbf y}(\mathbf S_0+\mathbf Q)\|\le7u^2.
$$

Here the stationary sum retains its accepted bounds $\|\mathbf S_0(\mathbf y)\|\le1400\|\mathbf y\|^3$ and $\|D\mathbf S_0(\mathbf y)\|\le4200\|\mathbf y\|^2$. The rational coefficient in the derivative comparison is below $6.312$.

For a vertical source the direct correction norm is bounded by

$$
\|\mathbf Q\|\le
\frac{2(5/7)^3c^4u^4+3(5/7)^2c^3u^3}{D_0}.
$$

For either its first or third component, replace $3(5/7)^2$ by $9/8$. Including the stationary cubic term gives actual acceleration bounds $2gu^3$ in norm and $5gu^3/4$ in each named component. Integration from resting onset proves the norm, velocity and component envelopes stated above. Reflection in the second coordinate fixes the vertical source's second component at zero.

### 2.2. A positive integral for the vertical pair

Freeze a source receiver at its anchor only to define an independent analytical comparison. Set

$$
\begin{gathered}
r_\lambda(v)=\sqrt{1+(1-\lambda p(v))^2},\quad
t_\lambda(v)=v+r_\lambda(v)-d_0,\quad
t_\lambda(v_\lambda)=u,\\
b=1-\lambda p(v),\qquad D_\lambda=t_\lambda'(v),\\
Z(\lambda,u)=\int_0^{v_\lambda}
(u-t_\lambda(v))r_\lambda(v)^{-3}\,dv-\frac{u^2}{2d_0^3}.
\end{gathered}
$$

Changing from reception to emission time in the twice-integrated anchor equation cancels the transmitter denominator exactly. The two vertical anchor first displacements are $gaZ(1,u)$ and $gaZ(-1,u)$, with $Z(0,u)=0$. Differentiation in $\lambda$, retaining the moving upper boundary, gives

$$
\begin{aligned}
\partial_\lambda^2Z={}&
\frac{b(v_\lambda)^2p(v_\lambda)^2}
{r_\lambda(v_\lambda)^5D_\lambda(v_\lambda)}\\
&+\int_0^{v_\lambda}
\left[
\frac{(6b^2-1)p^2}{r_\lambda^6}
+(u-t_\lambda)\frac{(12b^2-3)p^2}{r_\lambda^7}
\right]dv.
\end{aligned}
$$

Every term is nonnegative because $b^2>1/4$, $D_\lambda>0$ and $u-t_\lambda\ge0$. The boundary term is positive for $u>0$. Moreover

$$
Z(1,u)+Z(-1,u)
=\int_{-1}^1(1-|\lambda|)\partial_\lambda^2Z(\lambda,u)\,d\lambda.
$$

The triangular weight integrates to one. With $P_U=(cU)^4$, $W_U=4(cU)^3$ and $d_0<99/70$, the boundary term alone gives

$$
Z(1,u)+Z(-1,u)\ge
u^8\frac{(1-P_U)^2c_-^8(1-8cU)^2(1-4cU)^8}
{(99/70+P_U)^5(1+W_U)}
>\frac{u^8}{20}.
$$

For the upper bound, $b^2<101/100$ bounds the boundary term by $(101/100)c^8(5/7)^5u^8/D_0$. The two integrals are bounded by $6c^9u^9/9$ and $10c^9u^{10}/9$, respectively. Their sum with the boundary term is less than $u^8/4$ on $[0,U]$. These exact rational comparisons retain the pulse shape throughout the interval, avoiding an uncontrolled Taylor remainder.

Let $\mathbf U_z^A$ denote the twice-integrated anchor field. Actual receiver dependence costs at most

$$
\|\mathbf U_z(u)-\mathbf U_z^A(u)\|
\le g\int_0^u(u-v)7v^2\frac{gv^5}{10}\,dv
=\frac7{720}g^2u^9.
$$

Adding both errors gives the claimed signed lower bound and absolute upper bound for the actual vertical pair.

### 2.3. The transverse first component

For a transverse anchor $\mathbf k=(a,\pm1,0)$, the anchor range is $r=\sqrt{2+p^2}$, the denominator is $D=1+pp'/r\ge1$, and its anchor root obeys $0\le v\le u$. The first-component correction has sign opposite $a$ and satisfies

$$
|Q_1(u,0)|\le u^7+\frac{3u^8}{2d_0^5}
\le(1+3U/8)u^7.
$$

The anchor vector bound is $\|\mathbf Q(u,0)\|\le u^4/(2\sqrt2)+\sqrt2(1+3u/8)u^7<2u^4/5$. The receiver derivative estimate above and a first-exit argument give $\|\mathbf U_\perp''\|<gu^4/2$, $\|\mathbf U_\perp'\|\le gu^5/10$ and $\|\mathbf U_\perp\|\le gu^6/60$. Twice integrating the anchor first-component bound and the receiver error gives

$$
|U_{\perp,1}|
\le\frac{1+3U/8}{72}gu^9+\frac7{5400}g^2u^{10}
<\frac{gu^9}{64}.
$$

This last statement is an absolute bound for the moving source, not an assertion that its first component retains the anchor comparison's sign.

## 3. Target displacement and received-time bounds

In this section $\mathbf y=\mathbf y_{e_1}(\beta+\delta)$. For each target channel let $u_j=s_j-\alpha$ be its actual received source offset. Both vertical and transverse sources obey the weaker common bounds $\|\mathbf U\|\le gu^5/10$ and $\|\mathbf V\|\le gu^4/2$.

The coarse target displacement from Section 1 gives

$$
u_j\left(1-\frac{gU^4}{10}\right)
\le\delta\left(1+\frac{g\delta}{4000}\right),
\qquad 0<u_j\le q_0\delta,\quad q_0=\frac{1001}{1000}.
$$

Positivity follows as well: if $u_j\le0$, its source is still at its anchor and $u_j\ge\delta-\|\mathbf y\|>0$, a contradiction. Initially, all actual and subtraction ranges exceed $\rho_0=99999/100000$. The common source correction bound is

$$
\|\mathbf Q_j\|
\le gu_j^4
\frac{U/(5\rho_0^3)+1/(2\rho_0^2)}
{1-16U^4/2}
<\frac{51}{100}gu_j^4.
$$

The stationary term evaluated using $\|\mathbf y\|\le g\delta^2/4000$, together with four such corrections, gives $\|\mathbf y''\|<(15/7)g^2\delta^4$. Integrating twice yields

$$
\|\mathbf y\|\le\frac{g^2\delta^6}{14}.
$$

Substituting this sharper bound into the range equation improves the source-time comparison to

$$
u_j\le\delta\left[1+\frac{g^2U^5}{14}
+\frac{gq_0^5U^4}{10}\right]
<q\delta,\qquad q=\frac{1000001}{1000000}.
$$

Consequently every actual range and subtraction range exceeds $\rho=9999999/10000000$, while every sampled source speed is below $v_*=1/400000$. Define

$$
m=\frac{100001}{100000},\qquad m_2=\frac{1001}{1000},\qquad
F_j=\frac{r_j^{-3}}{D_j},\qquad
f_j=\|\mathbf n_j+\mathbf y\|^{-3},
$$

where $\mathbf n_j=e_1-j$ is the unit anchor channel vector and $D_j$ uses the actual range direction. In particular $|F_j|\le m$.

## 4. Signed target acceleration and its error

Every target/source polarity product is negative, and all four anchor channel vectors have zero first component. The exact first-component equation can therefore be written

$$
x''=A(\delta)+b(\delta)x,\qquad
A=g\sum_j U_{j,1}(u_j)F_j,
$$

where

$$
b=g\left[\int_0^1
\partial_1 S_{0,1}(\theta x,0,y_3)\,d\theta
+\sum_j(f_j-F_j)\right].
$$

The stationary first component vanishes on $x=0$ by its accepted coordinate-reflection symmetry. This form keeps the common third displacement out of a spurious large first-component error.

### 4.1. The two vertical channels

For these channels put $a_\delta=g\delta^5/16$ and $z_\delta=g^2\delta^6/14$. The source component bounds and the range identity, including its transverse-square term, give

$$
|u_j-\delta|
\le z_\delta+q^5a_\delta+(z_\delta+q^5a_\delta)^2
\le m(a_\delta+z_\delta).
$$

The squared term follows from $|\|\mathbf n+\mathbf y-\mathbf U\|-1|\le |y_3-U_3|+(y_1-U_1)^2$; the denominator in the difference-of-squares identity exceeds one on these ranges. All second components here vanish by reflection.

The weight estimate is

$$
|F_j-1|\le
m_2\left[\frac5{16}g\delta^4+3a_\delta+3z_\delta\right].
$$

To verify it, write $\mathbf N_j=(\mathbf n_j+\mathbf y-\mathbf U_j)/r_j$. Then $|\mathbf N_j\cdot\mathbf V_j|\le|V_{j,3}|+2\|\mathbf y-\mathbf U_j\|\|\mathbf V_j\|/\rho$, use $|r^{-3}-1|\le3\rho^{-4}|r-1|$, and divide by $1-v_*$. The rational constants $q,\rho,m,m_2$ leave strict room in both contributions.

Compare to both source displacements evaluated at the same offset $\delta$:

$$
\begin{aligned}
&\left|\sum_{j\ {\rm vertical}}U_{j,1}(u_j)F_j
-\sum_{j\ {\rm vertical}}U_{j,1}(\delta)\right|\\
&\quad\le
m^2q^4\left[\frac5{128}g^2\delta^9+
\frac5{112}g^3\delta^{10}\right]\\
&\qquad\quad+
m_2\left[\frac5{128}g^2\delta^9+
\frac3{128}g^2\delta^{10}+
\frac3{112}g^3\delta^{11}\right]\\
&\quad<
\frac2{25}g^2\delta^9+\frac{23}{500}g^3\delta^{10}.
\end{aligned}
$$

The first line of the bound uses the source velocity and root shift, multiplied by $F_j$. The second uses the source displacement at $\delta$ and $F_j-1$. This explicitly controls the generated-root changes and nonlinear transmitter weights that the earlier local expansion left in its remainder.

### 4.2. The transverse channels and receiver term

The two transverse sources satisfy

$$
\left|\sum_{j\ {\rm transverse}}U_{j,1}(u_j)F_j\right|
\le\frac{mq^9}{32}g\delta^9<\frac{g\delta^9}{30}.
$$

For the scalar receiver coefficient, the common source bounds give

$$
|F_j-f_j|\le
\frac{3\rho^{-4}\|\mathbf U_j\|+\rho^{-3}\|\mathbf V_j\|}
{1-v_*}.
$$

Adding four rows and $4200\|\mathbf y\|^2$ for the stationary derivative proves $|b|\le3g^2\delta^4$.

To control the remaining $bx$ term without replacing $x$ by the much larger common displacement, use the source-pair upper bound:

$$
|A|\le g^2\delta^8
\left[\frac13+\frac2{25}g\delta+
\frac{23}{500}g^2\delta^2+\frac{\delta}{30}\right]
<\frac12g^2\delta^8.
$$

The accepted local first-component expansion starts strictly inside $|x|\le g^2\delta^{10}/64$. On a first interval satisfying that bound, $|bx|\le3g^4\delta^{14}/64<g^2\delta^8/2$, so twice integrating $|x''|<g^2\delta^8$ gives $|x|<g^2\delta^{10}/90$. The strict improvement prevents a first exit, proving

$$
|x|\le\frac{g^2\delta^{10}}{64},\qquad
|bx|\le\frac3{64}g^4\delta^{14}
<\frac1{250}g^4\delta^{10}
$$

through the full target interval. For each fixed $g>0$, the accepted local expansion supplies the initial interval; its length need not be uniform in $g$ for the first-exit conclusion.

## 5. Closing the finite-interval sign

Combine the vertical source lower bound, its actual receiver error, the target comparison, the transverse bound and $bx$. Relax $\delta/30$ to $\delta/10$ to display a simple rational margin:

$$
\begin{aligned}
x''&\ge g^2\delta^8
\left[
\frac1{20}
-\left(\frac7{360}+\frac2{25}\right)g\delta
-\frac{\delta}{10}
-\left(\frac{23}{500}+\frac1{250}\right)g^2\delta^2
\right]\\
&=g^2\delta^8
\left[\frac1{20}-\frac{179}{1800}g\delta
-\frac{\delta}{10}-\frac{g^2\delta^2}{20}\right].
\end{aligned}
$$

All subtracted terms increase with $g$ and $\delta$. At $g=16$ and $\delta=U=3/128$, the bracket is exactly $1/300$. Thus $x''\ge g^2\delta^8/300$ throughout $0<\delta\le H-\beta<U$.

Resting target onset and the accepted reflections now imply the separation bounds in the result statement. In physical units, $d\|\mathbf X_{e_1}-\mathbf X_0\|/dT=d'(t)$; the displacement increase is at least $\ell g^2\delta^{10}/13500$. Separation is constant before $\beta$ and strictly increasing afterwards through $17\ell/16$.

This statement concerns one specified disturbance and the environment it actually generates. It does not follow from infinite population size, stationary cancellation alone, or an imposed environmental response. The independent complete-root and original-class preservation results remain the ones supplied by the accepted continuation. No coincidence occurs on this interval; possible later reversal, contact under other admitted histories, history stability and arbitrary-population continuation remain unresolved.

## Development, preservation and falsifiers

The operator selected control of separation over the entire already proved feedback interval. Five scientific source files were frozen with shasum -a 256 in .tmp/smooth-two-particle-feedback-separation/frozen-inputs.sha256. An exact-name rg search under scripts, tests, src, .github, .githooks, this workstream's evidence directory and reference/op/skills returned no generated-feedback-subject or manuscript-path binder; this measured search does not exclude consumers elsewhere. No reference, physical input, generator or solver was changed.

The read-only mec-008 feedback source bounds worker independently developed Section 2's source estimates using the ramon-e-moore lens. Its source comparison is conditional on the accepted prefix, not an adjudication of this combined theorem. The coordinator independently differentiated its amplitude integral and developed Sections 3–5. Both fresh rational instruments passed known arithmetic controls before their target comparisons. Their BigInt comparisons supplement the displayed mathematical derivation; they are not EOM simulations or independent theorem certificates. The source worker's scratch derivation and exact-constants.mjs and the coordinator's check.mjs are under .tmp/smooth-two-particle-feedback-separation/. The combined subject awaits separate reconstruction.

Falsifiers are an additional active source channel, a sampled source offset outside the proved interval, failure of the pulse or root envelopes, a missing term in the amplitude derivative, incorrect receiver sensitivity, a source-pair sign or component bound violating Section 2, a target comparison exceeding Section 4's constants, loss of the accepted reflection identities, or failure of the final rational margin. The result does not classify any history or time outside its fixed premises.
