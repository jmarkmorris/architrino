# Continuation toward the next vertical minimum

## Scope and current status

This analysis proves sufficient continuation and error bounds through $H=9/4$, enclosing the proposed next vertical minimum after the accepted endpoint $H_0=259/128$. The fixed infinite alternating cubic lattice, eight-source stationary block prescription, complete supplied past, coupling $g=16$ and wake speed $c_f=1$ are unchanged. The target is a completed fourth turn and its preceding downward excursion.

Claim grade: **derived conditional continuation and residual-propagation theorem, submitted for independent reconstruction**. The [accepted pulse-end continuation](smooth-two-particle-later-pulse-end-independent-adjudication.md) supplies existence and quantitative bounds through $H_0$. A full-law polynomial certificate discharging the conditions below establishes actual existence through $9/4$ and uniform target errors $1.3\times10^{-8}$ in position, $5\times10^{-8}$ in velocity and $2\times10^{-7}$ in acceleration. The turning and excursion conclusions require the separate continuous sign and extremum checks stated in Section 5. Eventual settling and typical preparation remain outside the result.

## 1. Complete histories and the additional source stage

Use dimensionless time $t=T/\ell$, displacement $\mathbf y_i=(\mathbf X_i-\ell i)/\ell$, targets $E=\{0,e_1\}$, and polarity $\sigma_i=(-1)^{i_1+i_2+i_3}$. The two targets have the complete supplied vertical pulse $p(s+11/8)e_3$, where

$$
p(u)=-(1-8u)u^4(1-4u)^4\quad(0\le u\le1/4),
$$

and $p=0$ otherwise. Every environmental supplied past is stationary. All forward positions and velocities vanish at release. These are prescribed pasts with the previously established preparation restriction.

The exact changed row, in addition to the infinite stationary block field $\mathbf S_0$, is

$$
\begin{gathered}
\mathbf Q(t,\mathbf y;\mathbf U)
=\frac{\mathbf K(\mathbf k+\mathbf y-\mathbf U(s))}{1-\mathbf n\cdot\mathbf U'(s)}-\mathbf K(\mathbf k+\mathbf y),
\quad \mathbf K(\mathbf R)=\frac{\mathbf R}{\|\mathbf R\|^3},\\
t-s=\|\mathbf k+\mathbf y-\mathbf U(s)\|,
\quad \mathbf n=\frac{\mathbf k+\mathbf y-\mathbf U(s)}{\|\mathbf k+\mathbf y-\mathbf U(s)\|},\\
\mathbf y_i''=g\mathbf S_0(\mathbf y_i)+g\sum_j\sigma_i\sigma_j\mathbf Q_{ij}.
\end{gathered}
\tag{1}
$$

The transmitter denominator in (1) is the canonical one. Receiver playback does not supply an extra acceleration multiplier. Every source relationship remains represented either by its changed row or by its stationary row inside $\mathbf S_0$.

The earliest old-pulse environmental response starts at $\alpha=\sqrt2-11/8$. The accepted old-pulse-only source prefix ends at $a_0=33/32$ and has

$$
b_0=1/60000,\qquad v_0=1/16000,\qquad A_0=1/400.
\tag{2}
$$

The first generated environmental reception occurs near $\alpha+1$. Extending a target past $H_0$ can sample environmental times beyond $a_0$, so these histories must evolve with their own received generated rows. A continuation that merely extrapolates the old-pulse-only source equation does not retain (1).

Take $H=9/4$, $a_1=41/32<H_0$, and source bounds $b_1=1/200000$, $v_1=1/16000$, $A_1=1/400$. With population receiver ball $B=1/64$, the source cut satisfies

$$
H-1+B+b_1<a_1,
\tag{3}
$$

where $B$ bounds every continued receiver displacement and $b_1$ bounds the source histories through $a_1$. The actual population through $a_1$ already exists by the accepted theorem. If source histories through $a_1$ obey

$$
a_1-1+b_1+b_0<a_0,
\tag{4}
$$

their generated rows sample the known prefix (2). Thus the new target computation has three causal stages: the original supplied pulse, the old-pulse-only source prefix, and the environmental source extension including its generated feedback. Conditions (3)–(4) are evaluated at moving-root ranges; they do not replace moving reception times by anchor times.

## 2. Residual propagation with source-time shifts

All source and target approximants must have exact supplied pasts, exact initial positions and velocities, exact $C^1$ joins and absolutely continuous velocities. Exact $C^2$ nodal Hermite joins suffice. Residual bounds are continuous-cell Euclidean norms, including all one-sided derivative enclosures needed at polynomial knots. Both source stages and the target retain $g\mathbf S_0$ inside their residual enclosure.

For a source speed bound $V<1$, source acceleration bound $A$, source displacement bound $P$, and a common range floor $r$, the inherited derivative estimates are

$$
\begin{aligned}
\mathcal L(P,V,A,r)
&=24Pr^{-4}+2r^{-3}\big[(1-V)^{-2}-1\big]
+\frac{Vr^{-3}+Ar^{-2}}{(1-V)^3},\\
C_P(V,A,r)
&=\frac{2r^{-3}}{(1-V)^2}+\frac{Vr^{-3}+Ar^{-2}}{(1-V)^3},\\
C_V(V,r)&=\frac{r^{-2}}{(1-V)^2}.
\end{aligned}
\tag{5}
$$

Here $\mathcal L$ bounds the changed row's receiver derivative. If two source histories differ by position and velocity errors $E_P,E_V$, their root times differ by at most $E_P/(1-V)$. Their received positions differ by at most $E_P/(1-V)$, and their received velocities by at most $E_V+AE_P/(1-V)$. Consequently their row difference at a common receiver position is bounded by $C_PE_P+C_VE_V$. The acceleration term is necessary because the velocities are evaluated at different emission times.

Write

$$
K_L(u)=\frac{\sinh(\sqrt L u)}{\sqrt L},\qquad
J_L(u)=\cosh(\sqrt L u),\qquad u\ge0,
\tag{6}
$$

with $K_0(u)=u$. For an acceleration residual envelope $q(t)$ and receiver Lipschitz constant $L$, zero initial error gives

$$
E_P(t)\le\int_0^t K_L(t-s)q(s)\,ds,
\qquad
E_V(t)\le\int_0^t J_L(t-s)q(s)\,ds.
\tag{7}
$$

These are positive Volterra majorants obtained by iterating the integral inequality for the displacement error. Nonzero initial enclosures at a later cut add the homogeneous terms $e_0J_L+v_0K_L$ and $e_0L K_L+v_0J_L$ respectively.

For the first source stage the accepted constant $L=7$ gives, at every sampled emission time $s\le a_0$,

$$
E_{0P}(s)\le\frac{\rho_0}{7}\big[\cosh(\sqrt7 s_+)-1\big],
\qquad
E_{0V}(s)\le\frac{\rho_0}{\sqrt7}\sinh(\sqrt7 s_+),
\tag{8}
$$

where both errors vanish for $s\le0$. Retaining this dependence on source time is useful: an early generated reception cannot incur the largest error at the end of the source prefix.

For an extended environmental receiver $i$, let $\mathcal J_i$ include every possible received generated identity through $a_1$, with actual and trial early-zero exclusions checked separately. If $s_{ij}^+(t)$ encloses both source roots above, its full-law residual $\rho_1(t)$ yields

$$
q_{1i}(t)=\rho_1(t)
+g\sum_{j\in\mathcal J_i}\left[C_{P,ij}E_{0P}(s_{ij}^+(t))+C_{V,ij}E_{0V}(s_{ij}^+(t))\right].
\tag{9}
$$

The receiver constant includes the stationary derivative, both original supplied-pulse rows when present, and all generated changed-row derivatives. Equations (7) and (9), or their restarted form at $a_0$, bound the actual source extension. Rows whose complete source is still exactly stationary contribute zero to (9); an upper-bound inventory may include them early, but a residual checker must not discard a row whose trial source is nonzero.

The target error has the same structure, now using the certified source-extension errors at its received emission-time upper bounds. This staged estimate includes the indirect influence of every source residual on the target. A direct target residual bound alone is insufficient.

### 2.1. Explicit sufficient source and target error budgets

Require the continuous polynomial certificate to establish the following bounds. They are sufficient conditions, not sampled maxima.

| Quantity | Required bound |
| --- | ---: |
| Frozen first-stage source residual $\rho_0$ through $a_0$ | $10^{-10}$ |
| All intermediate-source full residuals $\rho_1$ through $a_1$ | $10^{-10}$ |
| Full target residual $\rho_t$ through $H$ | $10^{-9}$ |
| Intermediate polynomial position norm | $4\times10^{-6}$ |
| Intermediate polynomial velocity norm | $3\times10^{-5}$ |
| Intermediate polynomial acceleration norm | $10^{-3}$ |
| Final target polynomial position norm | $9\times10^{-6}$ |

The intermediate certificate covers all 100 environmental identities and both target prefixes. One target may be represented by exact reflection of the other, provided the actual coefficient identities and its full-law residual are checked. This is not an independently prescribed future.

On an intermediate actual/approximate receiver tube of radius $b_1$, at most six generated unit-range rows are nonzero, and all of them sample the frozen first stage below $a_0$. Using (5), their full receiver Lipschitz bound is

$$
L_1\le2g\mathcal L(1/314928,1/8192,3/8,7/5)
+6g\mathcal L(b_0,v_0,A_0,99/100)+3g(1400)b_1^2
<6.448264<7.
\tag{10}
$$

For the final target tube $B_t=1/100000$, the 26 generated identities have range floors and multiplicities

$$
(d_1,d_2,d_3)=(99/100,7/5,12/7),\qquad(n_1,n_2,n_3)=(6,12,8).
$$

Their receiver constant satisfies

$$
L_t\le g\sum_{k=1}^3 n_k\mathcal L(b_1,v_1,A_1,d_k)+3g(1400)B_t^2
<0.679279<1.
\tag{11}
$$

The stationary derivative constant 1400 is used only on these small tubes, which lie within the accepted radius $1/128$. Section 3 uses the separate bound 1500 on the larger population ball.

Define $A_7(t)=[\cosh(\sqrt7t)-1]/7$ and use $*$ for convolution on nonnegative time. All functions below are set to zero for negative arguments. Put $d_0=99/100$, $c_0=C_P(v_0,A_0,d_0)$, $v_0^*=C_V(v_0,d_0)$, and $u=(t-d_0)_+$. Equation (9) has the explicit source position majorant

$$
E_{1P}(t)=\rho_1 A_7(t)
+6g\rho_0\left[c_0(K_7*A_7)(u)+v_0^*(K_7*K_7)(u)\right].
\tag{12}
$$

Its first and second derivatives bound source velocity and acceleration errors. The latter also follows directly from $7E_{1P}+q_1$. The relevant positive series are

$$
\begin{aligned}
(K_7*A_7)(u)&=\sum_{m\ge0}(m+1)7^m\frac{u^{2m+4}}{(2m+4)!},\\
(K_7*K_7)(u)&=\sum_{m\ge0}(m+1)7^m\frac{u^{2m+3}}{(2m+3)!}.
\end{aligned}
\tag{13}
$$

For instance, convolution of $t^a/a!$ and $t^b/b!$ is $t^{a+b+1}/(a+b+1)!$, by direct integration. Equation (13) follows by collecting the $m+1$ pairs of nonnegative indices having sum $m$. At $a_1$ the bounds are

$$
E_{1P}<2.468\times10^{-10},\qquad
E_{1V}<1.105\times10^{-9},\qquad
E_{1A}<5.855\times10^{-9}.
\tag{14}
$$

The actual source-prefix solution already exists. A first displacement exit contradicts $4\times10^{-6}+E_{1P}<b_1$. Velocity and acceleration then satisfy $3\times10^{-5}+E_{1V}<v_1$ and $10^{-3}+E_{1A}<A_1$. Thus the certificate supplies the source norms used in the population continuation, without presupposing a final target trajectory.

To display the final convolution compactly, define

$$
M_p(u)=\sum_{m\ge0}\left(\sum_{k=0}^m7^k\right)\frac{u^{2m+p}}{(2m+p)!},\qquad
N_p(u)=\sum_{m\ge0}\left(\sum_{k=0}^m(k+1)7^k\right)\frac{u^{2m+p}}{(2m+p)!}.
\tag{15}
$$

These are, respectively, the convolutions with $K_1$ of a single first-stage kernel and of the paired kernels in (13), with the indicated total degree. For each target shell put $c_k=C_P(v_1,A_1,d_k)$ and $v_k^*=C_V(v_1,d_k)$. A target position-error majorant is

$$
\begin{aligned}
E_{tP}(t)={}&\rho_t[\cosh((t-1)_+)-1]\\
&+g\rho_1\sum_{k=1}^3n_k\left[c_kM_4(t-d_k)+v_k^*M_3(t-d_k)\right]\\
&+6g^2\rho_0\sum_{k=1}^3n_k\left[
c_kc_0N_6(t-d_k-d_0)
+(c_kv_0^*+v_k^*c_0)N_5(t-d_k-d_0)
+v_k^*v_0^*N_4(t-d_k-d_0)\right].
\end{aligned}
\tag{16}
$$

The target residual starts at one because both exact and polynomial target paths are identically at rest through one. The last line retains the two successive positive delays before an intermediate-stage source error reaches the final target. Only the unit-distance shell has $H-d_k-d_0>0$ here. This is a positive upper majorant; it does not approximate the physical kernel or substitute numerical anchor delays in (1).

At $H$, exact positive-series bounds give

$$
E_{tP}<1.21611\times10^{-8},\qquad
E_{tP}'<4.61690\times10^{-8},\qquad
E_{tP}''<1.83247\times10^{-7}.
\tag{17}
$$

All coefficients are nonnegative, so these are uniform bounds through $H$. Rounded allowances $\varepsilon_P=1.3\times10^{-8}$, $\varepsilon_V=5\times10^{-8}$ and $\varepsilon_A=2\times10^{-7}$ suffice. The target tube closes because $9\times10^{-6}+\varepsilon_P<B_t$. Both the source and target error proofs include the complete stationary field in their residuals; their small constants do not assert that this field is zero.

## 3. Actual population continuation through $9/4$

The accepted block estimate gives, on $\|\mathbf y\|\le B=1/64$,

$$
\|\mathbf S_0(\mathbf y)\|\le C\|\mathbf y\|^3,
\quad\|D\mathbf S_0(\mathbf y)\|\le3C\|\mathbf y\|^2,
\quad C=1500>\frac{1309}{(1-B)^5}.
$$

Take the simultaneous population bootstrap

$$
Y(t)=b+K(t-1)_+^2,\qquad b=1/25000,\quad K=1/144,\quad
\|\mathbf y_i'\|\le V=1/32.
\tag{18}
$$

Its final radius is below $B$, with margin $34087/7200000$. Each full source root is below the already existing source cut because

$$
H-1+B+b_1<a_1,\qquad a_1-(H-1+B+b_1)=781/50000.
\tag{19}
$$

The generated anchor range is at most $H-\alpha+B+b_1<\sqrt5$. Therefore only squared ranges $1,2,3,4$ need enter the uniform population bound. Use rational floors $d=(1,7/5,12/7,2)$ and full lattice multiplicities $N=(6,12,8,6)$. Set

$$
Q_k=\frac{2b_1(d_k-B-b_1)^{-3}+v_1(d_k-B-b_1)^{-2}}{1-v_1}.
\tag{20}
$$

Each generated row vanishes before $t=d_k$, since its first possible source emission is at least $\alpha$ and $\alpha>B$. These facts apply also to the targets as generated transmitters, whose future motion starts later than $\alpha$. Thus a row's integrated displacement and velocity bounds are $gQ_k(t-d_k)_+^2/2$ and $gQ_k(t-d_k)_+$.

Old supplied-pulse rows have anchor range at least $\sqrt2$ whenever active after release. On the enlarged ball their range exceeds $11/8$. Put $k_o=8/11$, $\nu=1/8192$, $A_p=1/314928$ and $I_p=1/2621440$. Their pointwise bound is $Q_o=(2A_pk_o^3+\nu k_o^2)/(1-\nu)$. Before using any receiver acceleration assumption in an integrated pulse estimate, compute

$$
\|\mathbf y_i''\|
\le g\left[CB^3+2Q_o+\sum_kN_kQ_k\right]
<0.112563<1/8=:A.
\tag{21}
$$

The integrated old-pulse identity from the [accepted later continuation](smooth-two-particle-later-continuation.md#2-an-integrated-old-pulse-bound) remains valid with this new range floor. For clarity, its constants are

$$
\begin{aligned}
M&=(1+\nu)/(1-V),\\
D_F&=\frac{2k_o^3VM}{1-V}
+\frac{k_o^2}{(1-V)^2}\left[k_o(VM+\nu)V+AM\right],\\
E&=D_F+\frac{k_o^3V(1+\nu)}{(1-V)^2},\\
O_H&=2gI_p\left[\frac{2k_o^3H+k_o^2M}{1-V}+EH\right]
<3.17577\times10^{-5}.
\end{aligned}
\tag{22}
$$

This bound retains the pulse support and zero endpoint displacement by integration before taking the absolute estimate. It applies to both old rows in their actual moving receiver geometry.

Write $W=H-1=5/4$ and $w=(t-1)_+$. The inequality $(t-d_k)_+\le(H-d_k)w/W$ bounds the generated displacement by $G w^2$, where

$$
G=\frac g2\sum_kN_kQ_k\left(\frac{H-d_k}{W}\right)^2
<0.005526106.
$$

The stationary-field double integral is at most

$$
gC\left[\frac{b^3H^2}{2}+
\left(\frac{b^2KW^2}{4}+\frac{bK^2W^4}{10}+\frac{K^3W^6}{56}\right)w^2\right].
$$

Consequently

$$
\begin{gathered}
O_H+gCb^3H^2/2<b,\\
G+gC\left[\frac{b^2KW^2}{4}+\frac{bK^2W^4}{10}+\frac{K^3W^6}{56}\right]
<0.006085028<K.
\end{gathered}
\tag{23}
$$

The strict margins are greater than $8.2384\times10^{-6}$ and $8.5941\times10^{-4}$, respectively. One integration gives the speed bound

$$
\begin{aligned}
\|\mathbf y_i'\|\le{}&
\frac{2g(2k_o^3I_p+4k_o^2A_p)}{1-V}
+gC\left[b^3H+b^2KW^3+\frac{3bK^2W^5}{5}+\frac{K^3W^7}{7}\right]\\
&+g\sum_kN_kQ_k(H-d_k)
<0.022766<V.
\end{aligned}
\tag{24}
$$

The accepted solution lies inside (18) on its earlier interval. Equations (23)–(24) exclude a first displacement or speed exit. The finite receiving equations use only the already existing complete source prefix through $a_1$, have positive range and transmitter margins, and are locally Lipschitz in receiver position on an open neighborhood. Ordinary continuation therefore extends the actual population through $H$.

The auxiliary ball $B=1/64$ is an estimate for this same solution. It lies strictly inside the original environmental envelope $1/16$ and does not alter the original class. Every complete history has speed below $1/32$, so every cross delay residual increases by at least $31/32$ times the delay increment. Cross range is at least $31/32$, and every cross channel has exactly one positive root. Every self residual is at least $31\tau/32$ for $\tau>0$, excluding positive self roots. The exact zero-delay diagonal remains unevaluated. The original half-width $1/256$ root tubes retain transmitter factor at least $31/32$ and complement margin at least $31/(32\cdot256)$.

There are at most 34 changed rows at a receiver. The inherited per-row time-derivative bound below six applies because complete source acceleration is at most $3/8$, both speeds are below $1/4$, and range exceeds $7/8$. Including the stationary derivative gives dimensionless jerk below $205g=3280$. Complete acceleration is at most $3/8$, including the supplied past. The original acceleration, jerk, density and spatial conditions are therefore retained, with $C^3$ joins inherited from the smooth supplied endpoints and identical regular equations. Uniqueness holds among classical continuations with the identical complete past and block prescription, displacement at most $1/64$ and speed at most $1/4$: their minimum cross delay is $31/32$, so successive shorter intervals have identical already constructed source histories and ordinary receiver ODE uniqueness applies.

## 4. Complete identities, events and trial-path exclusions

At $a_1=41/32$, direct old pulses have entered squared-distance shells $2,3,4,5,6$ around the two original targets. Their union contains 100 environmental identities. The 24 first-$m=2$ sources supply exactly 144 generated unit-distance channels to 76 receivers. Those receivers add just the two targets to the old union, giving 102 nonconstant prefixes in total. Only old-source times below $a_1-1+b_1+b_0<0.282$ can enter this generated stage, safely inside $a_0$. A first-$m=3$ source is still stationary there; no further generation can enter the prefix.

At $H=9/4$, the complete generated source/receiver census is:

| First nonconstant source onset | Sources | Generated squared receiver ranges | Directed channels |
| --- | ---: | --- | ---: |
| $\sqrt2-11/8$ | 24 | $1,2,3,4$ | 768 |
| $\sqrt3-11/8$ | 8 | $1,2,3$ | 208 |
| $2-11/8$ | 12 | $1,2$ | 216 |
| $\sqrt5-11/8$ | 32 | $1$ | 192 |
| $\sqrt6-11/8$ | 24 | $1$ | 144 |
| Target futures, $\sqrt2-3/8$ | 2 | $1$ | 12 |
| Total | 102 | As listed | 1540 |

For a source's first nonconstant emission, its displacement is zero. The first generated reception therefore differs from its source onset plus anchor range by at most $B$. All included families lie before $H-B$. The nearest excluded global families have summed anchor onset $\sqrt2+\sqrt5-11/8$, greater than $H+B$. These strict inequalities establish the displayed count without partially entered families.

Old pulse entries extend through squared radius 13, excluding the nonexistent integer shell seven, and no shell beyond 13 enters. In particular, the latest included onset obeys $\sqrt{13}-11/8+B<H$, whereas the next possible onset obeys $\sqrt{14}-11/8-B>H$. There are 392 old directed channels to 246 environmental receivers. Exactly 328 have completed their original pulse reception, through squared radius eleven; the 64 channels at squared radii twelve and thirteen remain unfinished. The generated rows reach 216 distinct receivers and add only the two targets to the old receiver union. Thus 248 histories are nonconstant somewhere on $[0,H]$. The complement remains stationary because no changed row reaches it, while its stationary rows remain in $\mathbf S_0$.

Each target receives 26 distinct generated identities: six unit neighbors, twelve face diagonals and eight body diagonals. The six unit neighbors now include the other target's generated future. The new body-diagonal return has anchor onset $2\sqrt3-11/8$ and pulse endpoint $2\sqrt3-9/8$; the onset is before $H$ and its endpoint after $H$, even allowing the moving-range margins. This interval includes those new unfinished pulse paths while the next target minimum is sought. An environmental source reused by several original exciting paths retains its complete history; path count and source-identity count are different inventories.

The nonconstant-history assertion uses the inherited onset argument, not the inventory alone. Every newly included environmental label has a first direct old-pulse onset with nonzero fifth-order displacement coefficient when its excitation vector has a third component, or nonzero sixth-order transverse coefficient otherwise. The triangle inequality prevents a generated path from preceding that direct onset. A tied collinear generated path begins at higher order and cannot cancel its leading coefficient. The targets are already known to be nonconstant. Integer enumeration of these finite sets fits inside the anchor cube $[-5,5]^3$ by the displayed shell and range bounds.

Actual and polynomial censuses require separate checks. Retain exact polynomial early-zero cuts $\theta_2=1/32$, $\theta_3=11/32$, $\theta_4=39/64$, $\theta_5=27/32$, $\theta_6=17/16$, and target-future cut one. All source values and first derivatives must vanish there. For the intermediate stage, a nonunit generated row is sampled before zero, and a unit row from $m\ge3$ is sampled before $\theta_3$. For the final target, integer geometry excludes a first-$m=2$ source at anchor squared range four. Every excluded first-$m=2$ identity has range at least $\sqrt5$; the rational floor $20/9<\sqrt5$ gives $H+B_t+b_1-20/9<\theta_2$. Excluded first-$m=3$ identities have range at least two and are sampled before $\theta_3$. Excluded first-$m=4$ identities have range at least $\sqrt3$ and are sampled before $\theta_4$. The remaining excluded classes are sampled before their cuts using $140/99<\sqrt2$. All inequalities are strict. Thus the required 26-row trial target equation is complete, and the source table may conservatively contain additional exactly zero rows without changing the residual.

## 5. What establishes the next minimum and excursion comparison

Let $Z(t)$ denote the target polynomial's vertical component. A rational interval $I_4=[l_4,u_4]\subset(H_0,H)$ certifies exactly one new minimum if continuous polynomial bounds prove

$$
Z'(l_4)<-\varepsilon_V,\qquad Z'(u_4)>\varepsilon_V,
\qquad Z''>\varepsilon_A\ \hbox{throughout }I_4.
$$

Velocity negativity on the whole interval from the previous accepted third maximum window through $l_4$ excludes an intervening extra turn. The final segment after $u_4$ needs its own positive sign enclosure if no later turn through $H$ is claimed. Grid signs alone do not establish these statements.

If $M_3$ is the preceding maximum and $m_4$ this minimum, continuous polynomial window ranges enlarged by $\varepsilon_P$ enclose them. The new downward excursion is $D_2=M_3-m_4$; the preceding upward excursion is $U=M_3-m_2$, where $m_2$ is the preceding minimum. Therefore $D_2<U$ follows from the single strict inequality $m_4>m_2$, with both minima enclosed against the same actual law. A numerical minimum time itself is not an exact extremum. Valid interval division may supply a quantitative ratio once the denominator is strictly positive. These are finite-excursion conclusions only.

## Development boundary and falsifiers

The task-scoped arithmetic instrument `.tmp/mec-008-next-minimum/hale/bounds.py` passed known cases before its target runs: exact cubic shells, the zero changed-row derivative, an integrated constant residual, and low-degree convolution identities. It then checked the displayed rational continuation margins, integer census and positive-series bounds. Fresh known controls precede target execution; recorded script hashes are provenance only. For the series, summation through index 24 is followed by a geometric tail enclosure: each coefficient ratio is at most 16, and the subsequent factorial term ratios decrease. The instrument supplies arithmetic evidence for this derivation, not an independent dynamics reference or a residual check on the proposed path.

The frozen preceding proofs and numerical inputs are unchanged. The separate full-law residual instrument must still verify all cell enclosures, exact joins, exact early zeros, source history coverage, both target prefixes and final target norm. Independent review must reconstruct the continuation and propagation before an actual next-minimum claim is accepted.

At subject freeze, the parent certificate `next-minimum/check/both-residual.json` in the established local evidence directory reports full source residual below $9.471749\times10^{-11}$, full target residual below $1.539527\times10^{-11}$, source polynomial norms below $3.116196\times10^{-6}$, $2.771665\times10^{-5}$ and $0.000691546$, and target position norm below $4.651661\times10^{-6}$. These satisfy the numerical conditions in Section 2.1. Its 136 environmental generated edges are the 144 physical prefix channels with the four receptions to each target handled by the inherited target certificate. Exact reflection and prefix equality preserve that target residual below $10^{-10}$ on the intermediate interval. The certificate also reports the exact early-zero cuts and prior node preservation. This is the parent's full-law instrument result; the independent assessment owns acceptance of its cell enclosures and final turn claims.

A missed changed row, invalid source-cut inequality, omitted transmitter factor, absent stationary term, unverified trial early zero, defective polynomial join, omitted source-time shift, failed positive-series bound, failed source or target norm condition, or acceleration interval containing zero in a claimed unique turn invalidates the corresponding conclusion. Failure of a sufficient bound does not prove failure of the actual evolution. A later larger excursion or lack of eventual settling would not falsify this finite-interval theorem.
