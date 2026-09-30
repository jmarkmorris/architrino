# Continuation toward the next vertical maximum

## Scope and current status

This analysis continues the same fixed-history infinite alternating cubic lattice beyond the [accepted minimum and endpoint $9/4$](smooth-two-particle-next-minimum-independent-adjudication.md). The objective is the next vertical maximum and a comparison of the completed rise with the preceding fall. The unmodified Master Equation, prescribed eight-source stationary block sum, supplied complete past, $g=16$ and normalized wake speed $c_f=1$ are retained.

Claim grade: **derived finite-interval continuation, independently accepted through $13/4$**. The [independent assessment](smooth-two-particle-next-maximum-independent-adjudication.md) accepts the sufficient continuation and propagation results in Sections 3–7 together with the separate full residual and continuous sign certificates. Actual common height continues rising through that horizon; no next maximum has occurred. Section 8 records the failure of the present sufficient population estimate at the later numerical horizon $15/4$. The requested maximum remains open. No shrinking-excursion or settling premise is imposed.

## 1. Equation and causal stages

Use $t=T/\ell$, $\mathbf y_i=(\mathbf X_i-\ell i)/\ell$, target labels $E=\{0,e_1\}$, and checkerboard polarity $\sigma_i=(-1)^{i_1+i_2+i_3}$. The unchanged supplied target pulse is $p(s+11/8)e_3$, with

$$
p(u)=-(1-8u)u^4(1-4u)^4\quad(0\le u\le1/4),
$$

and zero elsewhere. Environmental supplied pasts are stationary. Forward initial displacement and velocity are zero for every label; the supplied past retains its established preparation restriction.

The exact changed row is

$$
\begin{gathered}
\mathbf Q(t,\mathbf y;\mathbf U)=
\frac{\mathbf K(\mathbf k+\mathbf y-\mathbf U(s))}{1-\mathbf n\cdot\mathbf U'(s)}
-\mathbf K(\mathbf k+\mathbf y),\qquad
\mathbf K(\mathbf R)=\frac{\mathbf R}{\|\mathbf R\|^3},\\
t-s=\|\mathbf k+\mathbf y-\mathbf U(s)\|,
\quad\mathbf n=\frac{\mathbf k+\mathbf y-\mathbf U(s)}{\|\mathbf k+\mathbf y-\mathbf U(s)\|},\\
\mathbf y_i''=g\mathbf S_0(\mathbf y_i)+g\sum_j\sigma_i\sigma_j\mathbf Q_{ij}.
\end{gathered}
\tag{1}
$$

The infinite stationary block field $\mathbf S_0$ is retained. Every source relationship is represented by a changed row or by its stationary row inside that field. The canonical transmitter denominator in (1) remains unchanged.

The accepted old-pulse-only prefix ends at $a_0=33/32$, with environmental bounds $b_0=1/60000$, $v_0=1/16000$, $A_0=1/400$. A new intermediate cut $a_1<9/4$ already has actual existence from the accepted theorem. If $H-1+B+b_1<a_1$ and $a_1-1+b_1+b_0<a_0$, every final receiver samples that intermediate cut, and every generated intermediate row samples the old-pulse-only prefix. This yields a finite three-stage error calculation without prescribing any new source future. Both target prefixes must be included as generated source histories when their reception times enter.

## 2. Integrating a general generated row before taking its absolute bound

The source-velocity term in the changed row is large compared with the accumulated source displacement. Treating its absolute maximum as a persistent acceleration discards a useful exact derivative. The cancellation used for the original supplied pulse also applies to an arbitrary vector source path with zero initial displacement.

Let a receiver have speed at most $V<1$ and acceleration at most $A$, and a source have speed at most $v<1$. Suppose both the moving range and the stationary-subtraction segment have length at least $1/k$. Parameterize reception by source time $s$, and define

$$
\begin{gathered}
\mathbf R_0=\mathbf k+\mathbf y(t(s)),\quad
\mathbf R=\mathbf R_0-\mathbf U(s),\quad
\delta=\|\mathbf R_0\|-\|\mathbf R\|,\\
\mathbf F=\frac{\mathbf K(\mathbf R_0)}{1-\mathbf n\cdot\mathbf y'},
\qquad M=\frac{1+v}{1-V}.
\end{gathered}
$$

Then $0<dt/ds\le M$, $|\delta|\le\|\mathbf U\|$, $\|\mathbf n_0-\mathbf n\|\le k\|\mathbf U\|$, and direct differentiation of the two ranges gives

$$
\mathbf n\cdot\mathbf U'=
\delta'-(\mathbf n_0-\mathbf n)\cdot\mathbf y'\frac{dt}{ds}.
$$

Changing variables in the acceleration integral cancels the transmitter denominator and yields the exact identity

$$
\begin{aligned}
\int\mathbf Q\,dt={}&
\int\frac{\mathbf K(\mathbf R)-\mathbf K(\mathbf R_0)}{1-\mathbf n\cdot\mathbf y'}\,ds
+[\mathbf F\delta]-\int\mathbf F'\delta\,ds\\
&-\int\frac{\mathbf K(\mathbf R_0)(\mathbf n_0-\mathbf n)\cdot\mathbf y'(1-\mathbf n\cdot\mathbf U')}{(1-\mathbf n\cdot\mathbf y')^2}\,ds.
\end{aligned}
\tag{2}
$$

No new physical law is used: this is integration by parts of (1). The receiver factor appears only in this change of integration variable, not as an added instantaneous acceleration factor.

Define

$$
\begin{aligned}
D_F&=\frac{2k^3VM}{1-V}
+\frac{k^2}{(1-V)^2}\left[k(VM+v)V+AM\right],\\
E&=D_F+\frac{k^3V(1+v)}{(1-V)^2},\qquad
J=\frac{2k^3}{1-V}+E,\qquad D=\frac{k^2}{1-V}.
\end{aligned}
\tag{3}
$$

Here $D_F$ bounds $\|\mathbf F'\|$, including the moving unit vector and receiver acceleration. If the source is stationary before its first onset $\alpha_j$ and $\mathbf U(\alpha_j)=0$, the lower endpoint term in (2) vanishes. With $I_U(s)=\int_{\alpha_j}^{s}\|\mathbf U(a)\|\,da$, equation (2) gives

$$
\left\|\int\mathbf Q\,dt\right\|
\le J I_U(s(t))+D\|\mathbf U(s(t))\|.
\tag{4}
$$

If $\|\mathbf U\|\le b_1$ and the source-time excess satisfies $(s(t)-\alpha_j)_+\le(t-d)_+$, a second integration gives

$$
\left\|\int_0^t(t-u)\mathbf Q(u)\,du\right\|
\le b_1\left[\frac J2(t-d)_+^2+D(t-d)_+\right].
\tag{5}
$$

Unlike an absolute acceleration integral, this bound charges the source displacement and its integral; a persistent source velocity maximum is not charged over the full reception interval. The source need not return to zero or stop moving. Every subsequent source excitation remains inside its complete $\mathbf U$ and therefore inside (2)–(5).

## 3. A bridge through $11/4$ using the accepted early source bounds

Take

$$
H=11/4,\quad a_1=57/32,\quad B=1/64,\quad C=1500,
\quad b_1=1/100000,\quad v_1=1/16000,\quad A_1=1/400.
\tag{6}
$$

The actual source prefix already exists because $a_1<9/4$. The certificate conditions in Section 4 establish its new small bounds. Its received generated sources lie before $a_1-1+b_1+b_0<a_0$, and every prospective population root through $H$ lies before $H-1+B+b_1<a_1$.

The preceding accepted source certificate gives the sharper actual displacement bound $b_-=1/200000$ through $a_-=41/32$. Thus the source envelope used here is $b_-$ before $a_-$ and $b_1$ afterwards. The additional displacement allowance does not contribute until its delayed reception. Retaining this delay is sufficient to close the population estimate even though using $b_1$ from source time zero is too loose.

Let $\alpha=\sqrt2-11/8$. Every generated source is stationary before $\alpha$. Since $H-\alpha+B+b_1<\sqrt8$, the possible generated squared anchor ranges are $1,2,3,4,5,6$. Their rational range floors and lattice multiplicities are

$$
d=(1,7/5,12/7,2,20/9,12/5),\qquad N=(6,12,8,6,24,24).
$$

Use $k_j=(d_j-B-b_1)^{-1}$ in (3), with receiver ceilings $V=1/32$ and $A=1/4$, and source speed $v_1$. Write the resulting constants as $J_j,D_j$. Define

$$
w_j=(t-d_j)_+,\qquad
u_j=(t-d_j-a_-+B+b_1)_+.
$$

Equation (4) and the two-level envelope give a generated displacement bound

$$
G(t)=g\sum_jN_j\left\{
b_-\left[\frac{J_jw_j^2}{2}+D_jw_j\right]
+(b_1-b_-)\left[\frac{J_ju_j^2}{2}+D_ju_j\right]\right\}.
\tag{7}
$$

Indeed, $s(t)\le t-d_j+B+b_1$. The source integral in (4) is at most $b_-(t-d_j)_++(b_1-b_-)(s(t)-a_-)_+$. The endpoint term uses $b_-$ whenever the source root is before $a_-$ and includes the additional allowance only afterward. Integrating this upper bound in reception time produces (7). The inequality $\alpha>B+b_1$ justifies the first delay $d_j$.

Set the population bootstrap

$$
Y(t)=b+K(t-1)_+,\qquad b=1/20000,\quad K=1/200.
\tag{8}
$$

Then $Y(H)=0.0088<B$. The stationary field satisfies $\|\mathbf S_0\|\le C\|\mathbf y\|^3$ and $\|D\mathbf S_0\|\le3C\|\mathbf y\|^2$ because $C>1309/(1-B)^5$.

The pointwise generated row bound is

$$
Q_j=\frac{2b_1 k_j^3+v_1 k_j^2}{1-v_1}.
$$

Old supplied-pulse rows active after release have range above $11/8$; put $k_o=8/11$, $A_p=1/314928$, $\nu=1/8192$, $I_p=1/2621440$, and $Q_o=(2A_pk_o^3+\nu k_o^2)/(1-\nu)$. Before using the acceleration ceiling in the integrated constants, verify

$$
g\left[CB^3+2Q_o+\sum_jN_jQ_j\right]
<0.125110<1/4.
\tag{9}
$$

The accepted old-pulse integration identity, with $k_o,V,A,\nu$ substituted in (3), gives its twice-integrated contribution

$$
O_H=2gI_p\left[\frac{2k_o^3H+k_o^2(1+\nu)/(1-V)}{1-V}+E_oH\right]
<3.972744\times10^{-5}.
\tag{10}
$$

For $W=H-1=7/4$ and $w=(t-1)_+$, each delayed polynomial in (7), divided by $w$, is nondecreasing. Consequently $G(t)\le G(H)w/W$. Direct cubic integration of (8) gives

$$
gC\int_0^t(t-s)Y(s)^3ds
\le\frac{gCb^3H^2}{2}
+gC\left[\frac{b^2KW^2}{2}+\frac{bK^2W^3}{4}+\frac{K^3W^4}{20}\right]w.
$$

The exact rational comparisons are

$$
\begin{aligned}
O_H+gCb^3H^2/2&<b-1.02612\times10^{-5},\\
G(H)/W&<0.003280709,\\
gC\left[\frac{b^2KW^2}{2}+\frac{bK^2W^3}{4}+\frac{K^3W^4}{20}\right]
&=0.001447490625,\\
G(H)/W+0.001447490625&<K-0.0002718006.
\end{aligned}
\tag{11}
$$

For speed, (4) bounds each generated impulse by $b_-[J_j(H-d_j)+D_j]$, with the additional term $(b_1-b_-)[J_ju_j(H)+D_j]$ only for $u_j(H)>0$. Add the integrated stationary and old-row estimates to obtain

$$
\begin{aligned}
\|\mathbf y_i'(t)\|\le{}&
\frac{2g(2k_o^3I_p+4k_o^2A_p)}{1-V}
+gC\left[b^3H+\frac32b^2KW^2+bK^2W^3+\frac14K^3W^4\right]\\
&+g\sum_jN_j b_-[J_j(H-d_j)+D_j]\\
&+g\sum_{u_j(H)>0}N_j(b_1-b_-)[J_ju_j(H)+D_j]
<0.015539<1/32.
\end{aligned}
\tag{12}
$$

These inequalities exclude a first population exit from (8) or the speed tube. The entire already existing intermediate prefix is inside (8), because its certified actual radius is below $10^{-5}<b$. The integrated comparisons start at release and are valid up to any proposed exit after that prefix; they need not inherit the looser preceding population estimate. All required source histories are already constructed, so regular finite receiver ODE continuation supplies actual existence through $H$.

Complete cross ranges exceed $31/32$ and complete speeds are below $1/32$, including the supplied past. The delay residual increases at least $31/32$ per unit positive delay, giving one positive root per cross channel and no positive self root. The exact zero-delay diagonal remains unevaluated. The original transmitter, root-tube and complement margins persist. There are at most 82 changed rows; the inherited derivative bound below six per row and the stationary derivative give dimensionless jerk below $493g=7888$, still below the original ceiling. Complete acceleration is at most $3/8$, including the supplied past. The original displacement envelopes, density bounds, regularity and comparison-class uniqueness persist. The auxiliary population ball has changed only as a proof estimate, not as a modification of the class or law.

## 4. Three-stage bridge residual propagation

The source-prefix equation through $a_1$ has at most two old rows and at most 26 generated rows, with squared generated ranges $1,2,3$. Every generated source time is within the accepted first stage through $a_0$. The final target has 36 possible generated source identities with range multiplicities $6,12,8,6,4$ at squared distances $1,2,3,4,5$; this includes its partner's forward history.

Use the derivative and source-history comparison coefficients

$$
\begin{aligned}
\mathcal L(P,V,A,r)&=24Pr^{-4}+2r^{-3}[(1-V)^{-2}-1]+\frac{Vr^{-3}+Ar^{-2}}{(1-V)^3},\\
C_P(V,A,r)&=\frac{2r^{-3}}{(1-V)^2}+\frac{Vr^{-3}+Ar^{-2}}{(1-V)^3},\qquad
C_V(V,r)=\frac{r^{-2}}{(1-V)^2}.
\end{aligned}
$$

These include the source-time shift: two received emission times differ by at most source position error divided by $1-V$, and the resulting velocity difference contains the source acceleration times that shift. On the intermediate radius $10^{-5}$ and final target radius $10^{-4}$, use range floors

$$
d^{s}=(99/100,7/5,12/7),\quad N^s=(6,12,8),
$$

$$
d^{t}=(99/100,7/5,12/7,199/100,20/9),\quad N^t=(6,12,8,6,4).
$$

For these small comparison tubes the accepted stationary derivative bound uses $C=1400$; the larger population tube in Section 3 uses $C=1500$. Including the stationary derivative gives source receiver constant below $6.857851<7$ and final target receiver constant below $0.800464<1$.

Let $K_7(t)=\sinh(\sqrt7t)/\sqrt7$, $A_7(t)=[\cosh(\sqrt7t)-1]/7$, and set every shifted function to zero at negative time. If $\rho_0\le10^{-10}$ bounds the accepted first-stage full residual and $\rho_1\le10^{-10}$ bounds every new intermediate full residual, a source position-error majorant is

$$
E_s(t)=\rho_1 A_7(t)
+g\rho_0\sum_jN_j^s\left[
C_{P,j}^s(K_7*A_7)(t-d_j^s)
+C_{V,j}^s(K_7*K_7)(t-d_j^s)\right].
\tag{13}
$$

This is the same positive Volterra construction as the accepted next-minimum theorem, with all three source-shell delays retained. It gives source position, velocity and acceleration errors through $a_1$ below

$$
2.549\times10^{-9},\qquad1.143\times10^{-8},\qquad4.737\times10^{-8}.
\tag{14}
$$

For an explicit final bound, define

$$
M_p(u)=\sum_{m\ge0}\left(\sum_{k=0}^m7^k\right)\frac{u^{2m+p}}{(2m+p)!},\qquad
N_p(u)=\sum_{m\ge0}\left(\sum_{k=0}^m(k+1)7^k\right)\frac{u^{2m+p}}{(2m+p)!}.
$$

With target full residual $\rho_t\le10^{-8}$, its position-error majorant is

$$
\begin{aligned}
E_t(t)={}&\rho_t[\cosh((t-1)_+)-1]\\
&+g\rho_1\sum_jN_j^t[C_{P,j}^tM_4(t-d_j^t)+C_{V,j}^tM_3(t-d_j^t)]\\
&+g^2\rho_0\sum_{j,k}N_j^tN_k^s\big[
C_{P,j}^tC_{P,k}^sN_6(t-d_j^t-d_k^s)\\
&\hspace{38mm}+(C_{P,j}^tC_{V,k}^s+C_{V,j}^tC_{P,k}^s)N_5(t-d_j^t-d_k^s)
+C_{V,j}^tC_{V,k}^sN_4(t-d_j^t-d_k^s)\big].
\end{aligned}
\tag{15}
$$

The target is exactly at rest through one; all actual and trial histories have the original initial data. The three bounds $E_t,E_t',E_t''$ increase with time and at $H$ are below $1.109629\times10^{-7}$, $4.291626\times10^{-7}$ and $1.829413\times10^{-6}$. Therefore the sufficient bridge allowances are

$$
\varepsilon_P=1.2\times10^{-7},\qquad
\varepsilon_V=4.4\times10^{-7},\qquad
\varepsilon_A=1.9\times10^{-6}.
\tag{16}
$$

Required source polynomial norms are at most $9\times10^{-6}$ in position, $6\times10^{-5}$ in velocity and $2\times10^{-3}$ in acceleration. These norms plus (14) close $b_1,v_1,A_1$. A final target polynomial radius at most $9\times10^{-5}$ plus (16) closes the target radius $10^{-4}$. The known prefix can supply sharper norms where needed; neither stage may omit the stationary field from its residual.

The certificate must retain exact initial data and $C^1$ joins with absolutely continuous velocities; exact $C^2$ nodal Hermite joins suffice. All residual bounds are continuous-cell Euclidean norms. Complete root enclosures, source coverage, exact zeros excluding premature trial rows and every retained prefix equality remain required. Both target-prefix residuals must be inherited by an exact checked reflection or certified directly. Script hashes are provenance only; archive identity and exact prefix comparisons remain evidentiary conditions.

## 5. Census boundary at the bridge

The intermediate prefix contains 150 environmental identities with first old squared distances $2,3,4,5,6,8,9$, in counts $24,8,12,32,24,16,34$, together with both targets. The generated intermediate inventory consists of 840 physical channels: first-$m=2$ sources at ranges $1,\sqrt2,\sqrt3$; first-$m=3$ sources at ranges $1,\sqrt2$; and first-$m=4$ sources at range one. The 42 target receptions are handled in the target-prefix certificates, leaving 798 environmental edges. The next first-old identity has onset $\sqrt{10}-11/8>a_1$; its first onset is exact because that receiver remains at its anchor until then. Existing sources' later old excitations remain in their complete histories.

Globally through $H$, the complete receiving equation includes original supplied-pulse rows through squared anchor radius 17, and excludes radius 18 and above. The first old onset at radius 17 is $\sqrt{17}-11/8$, close to $H$. The coarse population ball does not decide every second-excitation admission at that shell. Therefore this complete row inventory is not asserted to be an exact count of admitted directed old rows: the exact moving-root evaluation decides any such endpoint. The equations retain every potentially nonzero row, so this boundary does not weaken completeness or continuation.

The global generated inventory has strict event margins. Its source classes $m=2,3,4,5,6,8,9$ admit squared receiver ranges respectively $(1,2,3,4,5,6)$, $(1,2,3,4,5)$, $(1,2,3,4)$, $(1,2,3)$, $(1,2)$, $(1)$ and $(1)$. The two target futures admit squared ranges one and two. The nearest excluded family is a target future at distance $\sqrt3$, with anchor onset $\sqrt2+\sqrt3-3/8>H+B$. Thus no generated family is partly admitted at the bridge. Each final target receives 36 identities as used in Section 4. Source identity counts do not replace the complete excited history of each reused source.

## 6. Restarting the population comparison through $13/4$

This section is conditional on the separately checked bridge and the complete source-prefix norms stated below. Set

$$
H_2=13/4,\quad c=73/32,\quad b_2=1/40000,\quad v_2=1/8000,\quad A_2=1/400.
$$

The bridge provides actual existence through $c$. Its 246 environmental histories and both target histories cover every nonconstant population member at that time. Certifying their full residuals and norms through $c$ therefore supplies initial population bounds $|y_i(c)|\le b_2$, $|y_i'(c)|\le v_2$; the omitted population is still exactly stationary. Every final received future lies within this prefix because $H_2-1+B+b_2<c$. Intermediate generated rows query at most $c-1+b_2+b_1<57/32$, so they use the already existing bridge source prefix, including both targets.

Restart the first-exit comparison at $c$, with

$$
Y(c+u)=b_2+Ku,\quad K=11/1000,\quad
0\le u\le\Delta=31/32,\quad B=1/64,\quad V=1/32,\quad A=1/4.
\tag{17}
$$

Every future source is zero before $\theta=1/32$; the actual first onset $\sqrt2-11/8$ is later. A valid monotone source-position envelope is

$$
b(s)=5\times10^{-6}\mathbf1_{s\ge\theta}
+5\times10^{-6}\mathbf1_{s\ge41/32}
+15\times10^{-6}\mathbf1_{s\ge57/32}.
\tag{18}
$$

Write its first and second primitives as $B_1(s)=\sum_q\delta b_q(s-q)_+$ and $B_2(s)=\tfrac12\sum_q\delta b_q(s-q)_+^2$. A receiver can have at most the following generated source shells:

$$
\begin{aligned}
d_j&=(1,7/5,12/7,2,20/9,12/5,14/5,3,22/7),\\
\bar d_j&=(1,99/70,26/15,2,161/72,49/20,99/35,3,19/6),\\
N_j&=(6,12,8,6,24,24,12,30,24).
\end{aligned}
\tag{19}
$$

Here $d_j\le\sqrt{m_j}\le\bar d_j$ for squared shells $m_j=1,2,3,4,5,6,8,9,10$; the next existing shell is 11, whose generated onset remains after $H_2$ even under the population displacement margin. Use the coefficients $J_j,D_j$ from Section 2 with $k_j=(d_j-B-b_2)^{-1}$, source speed $v_2$ and receiver bounds $V,A$. At the restart the source displacement need not be zero. Thus the integrated identity retains both endpoint terms:

$$
\left|\int_c^t Q_j\,du\right|
\le J_j\int_{s_j(c)}^{s_j(t)}b(s)\,ds
+D_j[b(s_j(c))+b(s_j(t))].
\tag{20}
$$

Define $S_j^+(t)=t-d_j+B+b_2$ and $S_j^-=c-\bar d_j-B-b_2$. The emission-time bracket gives $S_j^-\le s_j(c)\le S_j^+(c)$ and $s_j(t)\le S_j^+(t)$. After one further integration, the generated displacement contribution at $H_2$ is bounded by

$$
\begin{aligned}
G_P=g\sum_jN_j\{&J_j[B_2(S_j^+(H_2))-B_2(S_j^+(c))-\Delta B_1(S_j^-)]\\
&+D_j[B_1(S_j^+(H_2))-B_1(S_j^+(c))]
+D_jb(S_j^+(c))\Delta\}.
\end{aligned}
\tag{21}
$$

Its velocity bound is

$$
G_V=g\sum_jN_j\{J_j[B_1(S_j^+(H_2))-B_1(S_j^-)]
+D_j[b(S_j^+(H_2))+b(S_j^+(c))]\}.
\tag{22}
$$

Keeping the lower emission bound in (21) is material. Discarding it yields an insufficient position estimate. The displayed integrands are monotone, so $G_P(u)/u$ is nondecreasing; checking the position slope at $\Delta$ controls the whole interval.

For any old supplied-pulse reception after $c$, the moving range is $t-s\ge c+9/8>3$, and the stationary-subtraction segment also exceeds three after subtracting the pulse amplitude. With $J_o,D_o$ from Section 2 at $k_o=1/3$, $v_o=1/8192$, the total old-row velocity increment on any restart subinterval is at most

$$
O_V=2g(2D_oA_p+J_oI_p),\quad A_p=1/314928,\ I_p=1/2621440.
\tag{23}
$$

Both old source endpoint terms are included. Its displacement bound is $O_Vu$. The stationary-field contributions at $\Delta$ are

$$
\begin{aligned}
S_P&=gC[b_2^3\Delta^2/2+b_2^2K\Delta^3/2+b_2K^2\Delta^4/4+K^3\Delta^5/20],\\
S_V&=gC[b_2^3\Delta+3b_2^2K\Delta^2/2+b_2K^2\Delta^3+K^3\Delta^4/4],\quad C=1500.
\end{aligned}
\tag{24}
$$

Exact rational arithmetic in `onward.py`, after its fresh constant-source, delayed-step and squared-distance controls, gives

$$
\begin{gathered}
G_P<0.009092610,\quad G_V<0.016894962,\quad O_V<0.000024661,\\
S_P<0.001378816,\quad S_V<0.007099813,\quad Y(H_2)=0.01068125,\\
K-v_2-O_V-(G_P+S_P)/\Delta>0.000041126,\\
V-v_2-O_V-G_V-S_V>0.007105565.
\end{gathered}
\tag{25}
$$

The independent point-acceleration estimate is

$$
g\left[CB^3+2\frac{2A_p/27+\nu/9}{1-\nu}
+\sum_jN_j\frac{2b_2k_j^3+v_2k_j^2}{1-v_2}\right]
<0.174297774<1/4.
\tag{26}
$$

The strict position, speed and acceleration margins close the first-exit bootstrap. Cross ranges remain at least $31/32$, and the sub-wake-speed bound keeps every transmitter denominator positive and every cross root unique; no positive self-root appears. There are at most 148 changed rows at a receiver. The inherited per-row time derivative below six, together with the stationary derivative, gives jerk below $889g=14224$, retaining the original jerk ceiling 65536. Complete acceleration, including the supplied past, remains at most $3/8$. Hence the same original regularity and comparison class and the finite causal-stage construction continue the complete population to $H_2$, conditional on the source-prefix certification. The complete old-row inventory includes squared anchor distances through 21 and excludes 22 onward; roots on its boundary are evaluated rather than presumed admitted. The complete generated inventory is given by the onset test $\tau_j+\sqrt{|i-j|^2}\le H_2$ with the displayed population margin for undecided boundaries, and contains no shell beyond those retained in (19). Finite-difference stationary block estimates remain uniform in the infinite population.

## 7. Four-stage residual comparison through $13/4$

The new source prefix has at most 56 generated rows per receiver at squared distances $1,2,3,4,5$ and at most two old rows. Each final target has 60 possible received identities at squared distances $1,2,3,4,5,6$, with multiplicities $(6,12,8,6,24,4)$. All 246 environmental source histories and both targets must be covered, including the partner's exact reflected prefix; limiting the source certificate to the 60 direct final contributors would not establish the population restart in Section 6.

Using the coefficients in Section 4 and the range floors below gives

$$
\begin{aligned}
d^1&=(99/100,7/5,12/7),&N^1&=(6,12,8),\\
d^2&=(99/100,7/5,12/7,199/100,20/9),&N^2&=(6,12,8,6,24),\\
d^t&=(99/100,7/5,12/7,199/100,20/9,12/5),&N^t&=(6,12,8,6,24,4),\\
L_2&<7.106573<8,&&L_t<1.159507<2.
\end{aligned}
\tag{27}
$$

Here the source comparison radius is $b_2$, the target comparison radius is $1/2500$, and the stationary derivative constant is 1400 on these tubes. The new source rows use incoming bounds $b_1,v_1,A_1$; target rows use $b_2,v_2,A_2$. Old rows enter the source receiver derivative with the accepted pulse bounds at range $7/5$. Generated rows include the velocity errors caused by the shift in the root time; this is the $A$ term in $C_P$.

Let $K_\lambda(t)=\sinh(\sqrt\lambda t)/\sqrt\lambda$, $A_\lambda(t)=[\cosh(\sqrt\lambda t)-1]/\lambda$, all zero for negative arguments. For any position-error function $E$, define the positive delayed source operator

$$
\mathcal T_{d,N,v,A}[E](t)
=g\sum_jN_j[C_P(v,A,d_j)E(t-d_j)+C_V(v,d_j)E'(t-d_j)].
\tag{28}
$$

With full continuous residual budgets

$$
\rho_0=\rho_1=10^{-10},\qquad\rho_2=10^{-8},\qquad\rho_t=10^{-6},
\tag{29}
$$

an explicit sufficient hierarchy is

$$
\begin{aligned}
E_0&=\rho_0 A_7,\\
E_1&=\rho_1 A_7+K_7*\mathcal T_{d^1,N^1,v_0,A_0}[E_0],\\
E_2&=\rho_2 A_8+K_8*\mathcal T_{d^2,N^2,v_1,A_1}[E_1],\\
E_t&=\rho_t A_2(t-1)+K_2*\mathcal T_{d^t,N^t,v_2,A_2}[E_2].
\end{aligned}
\tag{30}
$$

The two incoming targets through the times queried by $E_2$ are included in $E_1$: their old accepted target residual is below $10^{-10}$ there, their earlier generated inputs lie within the first stage, and their receiver derivative is below the same bound seven. The source majorant $E_2$ covers the new partner prefix even if it inherits the bridge's larger target residual; the uniform budget $10^{-8}$ deliberately permits this. This avoids substituting a late source error for all earlier emission times. Initial position and velocity errors vanish, with the exact compatible polynomial joins required in Section 4.

The scratch instrument `propagation.py` represents each term by its delay, coefficient and successive positive kernels. For kernel parameters $\lambda_1,\ldots,\lambda_q$, its series coefficients are the complete homogeneous polynomials $h_m(\lambda_1,\ldots,\lambda_q)$; the series is $\sum_{m\ge0}h_m u^{2m+p}/(2m+p)!$. A coefficient ratio is bounded by $\sum\lambda_j$, so the geometric remainder after index 24 rigorously encloses the positive tail and its first two derivatives. Closed repeated-kernel, mixed-kernel, constant-acceleration and differentiated-polynomial controls passed before the target run.

At $c=73/32$, the resulting source errors in position, velocity and acceleration are below

$$
4.136\times10^{-7},\quad1.201\times10^{-6},\quad3.518\times10^{-6}.
$$

At $H_2=13/4$, the target errors are below $4.054985\times10^{-5}$, $1.163090\times10^{-4}$ and $3.340452\times10^{-4}$. Thus sufficient reported target allowances are

$$
\varepsilon_P=4.1\times10^{-5},\qquad
\varepsilon_V=1.17\times10^{-4},\qquad
\varepsilon_A=3.4\times10^{-4}.
\tag{31}
$$

These bounds increase monotonically, so they also hold at every earlier time in their respective comparison domains. Source polynomial norms below $1.86\times10^{-5}$, $1.01\times10^{-4}$ and $9\times10^{-4}$ plus the source errors close $b_2,v_2,A_2$. A target polynomial radius below $2.69\times10^{-4}$ plus (31) closes the radius $1/2500$. Continuous polynomial vertical velocity above $1.17\times10^{-4}$ on $[11/4,13/4]$ would therefore prove that the actual common height continues increasing throughout that interval. This last sign is a condition for the separate interval certificate, not a conclusion from sampled motion.

## Development boundary

The requested maximum remains beyond the current bridge unless a separate sign certificate establishes it earlier. The arithmetic instrument `.tmp/mec-008-next-maximum/hale/bounds.py` passed fresh known cubic-shell, zero-derivative, integrated-monomial and positive-series controls before its target calculation. It checks exact rational continuation margins and bounds the positive propagation series by summation through index 24 plus a geometric tail, using coefficient ratio at most 16. This is arithmetic evidence for the displayed derivation, not an independent residual or dynamics reference.

An omitted boundary term, incorrect source-time substitution, missing source history, premature trial motion, failed first-exit comparison or failed full-law residual invalidates the corresponding claim. No eventual settling claim follows from this finite continuation. The next source cut and its additional dependencies must be established before interpreting any later numerical proposal as actual motion.

## 8. Quantified limit of the present estimate at $15/4$

The later numerical proposal remains rising at $15/4$; that proposal does not establish actual continuation or a next maximum there. A bounded scratch calculation identifies why simply repeating the present uniform-source population estimate is insufficient.

Use $H_3=15/4$, restart/source cut $89/32$, population radius $1/64$, speed $1/32$ and acceleration $1/4$. Give the prospective source prefix the conditional ceilings $b_3=1/8000$, $v_3=1/2500$, $A_3=1/400$. These exceed its diagnostic polynomial norms but have not been closed against actual-solution errors. Extend (18) by an increment $10^{-4}$ after $73/32$, and apply the same exact endpoint and lower-emission-time formulas through the additional generated shells 11, 12 and 13. The known-controlled `limit-probe.py` gives

$$
G_P=0.0254336450080\ldots,\qquad G_V=0.0600966156369\ldots.
$$

The radius permits a linear restart slope at most

$$
\frac{1/64-b_3}{15/4-89/32}=0.016,
$$

whereas initial speed and generated displacement alone require a slope greater than $0.0266540851696$. This already fails before including old-pulse and stationary-field terms; the generated velocity allowance also exceeds $1/32$. The causal source cut retains margin $0.0155$. Thus it is the current population estimate, rather than missing source-time coverage or the numerical target radius by itself, that first obstructs this attempted continuation.

This is a failure of a sufficient bound, not evidence that the actual population leaves the tube or that the Master Equation fails. In particular, assigning the target-dominated late displacement maximum to every source discards potentially decisive information. Two concrete routes remain: certify each source's displacement as a function of time and use those individual envelopes in the integrated rows; or certify small position and velocity bounds for the entire affected population at $13/4$, then restart the population comparison there, reducing the remaining accumulation interval to $1/2$. The latter requires all affected population members, rather than only the targets or the source prefix received by them.

Fresh delayed-step integration and squared-distance controls passed before this bounded target probe; `limit-known.json` and `limit-target.json` record that order and the exact rational result. The next maximum remains unresolved beyond the accepted finite continuation. Neither a finite rising interval nor this failed estimate supplies an all-future no-maximum, growth, or settling conclusion.
