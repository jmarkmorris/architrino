# Continuation through the remaining target pulse-end receptions

## Result and scope

The fixed-history evolution continues under the unmodified Master Equation through

$$
H=\frac{259}{128},\qquad T=H\ell,
$$

with the same infinite alternating cubic lattice, prescribed eight-source block sum, coupling $g=16$ and normalized wake speed $c_f=1$. The eight remaining original-pulse paths **per target**, representing sixteen directed target pulse-end receptions globally, all finish between $t=2$ and $t=H$. Their environmental source histories remain within the already constructed prefix $s\le a=33/32$. No new received-source family enters the population before this horizon.

Claim grade: **derived continuation and conditional residual-propagation extension, submitted for independent reconstruction**. The accepted [continuation through $2\ell$](smooth-two-particle-later-independent-adjudication.md) and [full-law vertical certificate](smooth-two-particle-later-certification-independent-adjudication.md) are unchanged inputs. This subject does not supply numerical residual certificates. It proves the continuation and moving pulse-end enclosure, and shows that the existing sufficient target error budgets remain valid when the target polynomial and its full-law residual certificate are extended through $H$.

The supplied complete past is preserved, including its established preparation restriction. Pulse-end reception is an event in the received history; it does not make an evolved environmental source stationary. No asymptotic damping, eventual settling or arbitrary populated-universe behavior follows.

## 1. Unchanged equation and known prefix

Use dimensionless time $t=T/\ell$ and displacement $\mathbf y_i=(\mathbf X_i-\ell i)/\ell$, with $i\in\mathbb Z^3$, targets $E=\{0,e_1\}$ and polarity $\sigma_i=(-1)^{i_1+i_2+i_3}$. The complete supplied target histories are $p(s+11/8)e_3$, where

$$
p(u)=-(1-8u)u^4(1-4u)^4\quad(0\le u\le1/4),
$$

and zero outside that support. Every environmental supplied past is stationary. The original pulse ends at source emission time $-9/8$.

The stationary block field $\mathbf S_0$ remains in every receiver equation. A changed source contributes

$$
\begin{gathered}
\mathbf Q(t,\mathbf y;\mathbf U)
=\frac{\mathbf K(\mathbf k+\mathbf y-\mathbf U(s))}{1-\mathbf n\cdot\mathbf U'(s)}-\mathbf K(\mathbf k+\mathbf y),
\qquad \mathbf K(\mathbf R)=\frac{\mathbf R}{\|\mathbf R\|^3},\\
t-s=\|\mathbf k+\mathbf y-\mathbf U(s)\|,
\qquad \mathbf n=\frac{\mathbf k+\mathbf y-\mathbf U(s)}{\|\mathbf k+\mathbf y-\mathbf U(s)\|}.
\end{gathered}
\tag{1}
$$

Thus the full dimensionless acceleration is $g\mathbf S_0(\mathbf y_i)+g\sum_j\sigma_i\sigma_j\mathbf Q_{ij}$. The finite correction sum changes received rows of the infinite block-summed lattice; it is not a finite bare-lattice replacement. The canonical transmitter denominator is retained.

The accepted prefix supplies

$$
a=\frac{33}{32},\quad b_s=\frac1{60000},\quad v_s=\frac1{16000},\quad A_s=\frac1{400},
\tag{2}
$$

as environmental displacement, speed and acceleration bounds through $a$. On that prefix only old supplied-pulse corrections have arrived. Its nonstationary environmental source set $\mathcal A_5$ has 76 labels with first exciting squared distances $2,3,4,5$. All other environmental histories are stationary on the prefix, and the target futures are stationary there. The accepted block estimates, valid inside $B=1/128$, are

$$
\|\mathbf S_0(\mathbf y)\|\le C\|\mathbf y\|^3,
\qquad \|D\mathbf S_0(\mathbf y)\|\le3C\|\mathbf y\|^2,
\qquad C=1400.
\tag{3}
$$

## 2. Actual continuation through the new horizon

The original coarse ball alone narrowly fails to retain the source cut at $H$, since $H-1+B+b_s=a+b_s>a$. This is a failure of that estimate. Tighten the population ball to

$$
B_* =\frac1{132}<B,\qquad h=H-2=\frac3{128}.
$$

The accepted solution through $2$ obeys $\|\mathbf y_i\|<157/22500<B_*$ and $\|\mathbf y_i'(2)\|<0.016858<1/50$. On a receiver bootstrap ball $B_*$, the source-time residual at $s=a$ is negative because

$$
H-1+B_*+b_s
=\frac{131}{128}+\frac1{132}+\frac1{60000}
<\frac{33}{32}.
\tag{4}
$$

The complete known source prefix has subunit speed, so that residual is strictly decreasing in source time. Its unique root lies below $a$ and satisfies $s\le t-1+B_*+b_s$. Consequently the prospective receiver equations use only already constructed histories, including each reused source's second old excitation.

Let $\alpha=\sqrt2-11/8$. A generated correction through $H$ has anchor range at most $H-\alpha+B_*+b_s<2$. Therefore its squared anchor range is $1,2$ or $3$, with multiplicities at most $6,12,8$ per receiver. The inherited time-independent acceleration estimate remains valid on this smaller ball:

$$
\begin{gathered}
d_1=1,\quad d_2=7/5,\quad d_3=12/7,
\qquad (N_1,N_2,N_3)=(6,12,8),\\
Q_k=\frac{2b_s(d_k-B-b_s)^{-3}+v_s(d_k-B-b_s)^{-2}}{1-v_s},
\qquad Q_o=\frac{825}{11238052},\\
\|\mathbf y_i''\|
\le g\left[CB^3+2Q_o+\sum_{k=1}^3N_kQ_k\right]
<0.034573<\frac1{16}.
\end{gathered}
\tag{5}
$$

Here $Q_o$ is the accepted old-pulse pointwise bound. Equation (5) follows from the receiver ball and known source estimates, before it is used in the continuation comparison. For $2\le t\le H$, integration from the accepted state gives

$$
\begin{aligned}
\|\mathbf y_i(t)\|
&<\frac{157}{22500}+\frac{h}{50}+\frac{h^2}{32}
<\frac1{132},\\
\|\mathbf y_i'(t)\|
&<\frac1{50}+\frac h{16}<\frac1{32}.
\end{aligned}
\tag{6}
$$

These strict inequalities prevent a first displacement or speed exit. Locally Lipschitz receiver equations on the regular known-source root domain therefore continue the actual solution through $H$.

Every complete cross history has speed below $1/32$ and separation at least $1-2B_*=65/66$. Its delay residual grows at least $31/32$ times the delay increment, giving exactly one positive root. For self channels the residual is at least $31\tau/32$ for $\tau>0$, so no positive self root occurs. The exact zero-delay diagonal remains unevaluated. The original root tubes of half-width $1/256$ retain transmitter factor at least $31/32$ and complement gap at least $31/(32\cdot256)$.

At most two old and 26 generated corrections occur at a receiver. The inherited time derivative bound below six per correction applies on the present range, speed and source-acceleration bounds. Together with the stationary derivative estimate, it gives complete dimensionless jerk below $169g=2704$. The complete acceleration, including the supplied past, is at most $3/8$. Physical acceleration and jerk are therefore bounded by $3/(8\ell)$ and $2704/\ell^2$, respectively, within the original history-class ceilings. The $C^3$ joins follow from pulse endpoint flatness and the regular source equations. The original displacement, density and separation conditions persist.

Uniqueness is within the identical complete supplied past and fixed block prescription, for classical continuations with displacement at most $B_*$ and speed at most $1/4$. Their cross delay is at least $65/66$. On successive intervals shorter than that delay the source histories are already common, and locally Lipschitz receiver ODE uniqueness applies. This proves equality through $H$ within that regular comparison class.

## 3. Complete census on the extended interval

The nearest excluded **global** generated-entry families have first exciting and return distances $(\sqrt2,2)$ and $(2,\sqrt2)$. Their common anchor onset is $\sqrt2+5/8$. At a source's first nonconstant emission it is still at its anchor, so receiver motion changes this onset by at most $B_*$. Since

$$
H<\sqrt2+\frac58-B_*,
\tag{7}
$$

neither family enters through $H$. All other excluded combinations are later. Thus the accepted generated census is unchanged:

| First exciting squared distance | Source labels | Received generated squared ranges | Directed generated channels |
| --- | ---: | --- | ---: |
| $2$ | 24 | $1,2,3$ | 624 |
| $3$ | 8 | $1,2$ | 144 |
| $4$ | 12 | $1$ | 72 |
| $5$ | 32 | $1$ | 192 |
| Total | 76 | As listed | 1032 |

There remain 184 distinct generated receivers. The old-pulse entry shell of squared radius 12 remains absent, since $H<\sqrt{12}-11/8-B_*$. Old-pulse endpoints at squared radius 10 remain unreceived, since $H<\sqrt{10}-9/8-B_*$. Therefore the old directed-channel census is still 328 entered, 232 completed through squared radius nine, and 96 unfinished at squared radii ten and eleven. Its union still has 206 environmental receiving labels. Generated receptions add only the two targets, so exactly the same 208 histories are nonconstant somewhere on $[0,H]$. The complementary labels remain stationary because no changed row reaches them; their stationary contributions remain in the block field.

Each target still receives 21 environmental identities: five at unit anchor range, twelve at $\sqrt2$ and four at $\sqrt3$. Their complete histories contain 25 original-pulse paths per target. The next global entry statement (7) is not a claim that those later families necessarily add a new target source identity.

## 4. Moving enclosures for the last pulse endpoints

The accepted full-law certificate through $2$ supplies target displacement below $4.711661\times10^{-6}<1/200000$ and target speed below $4.709323\times10^{-5}<1/20000$. These are Euclidean bounds obtained from the certified polynomial norms and their error allowances. Equation (5) then gives, independently of any new polynomial,

$$
\|\mathbf y_i(t)\|
<\frac1{200000}+\frac h{20000}+\frac{h^2}{32}
<b_t:=\frac1{40000},
\qquad 2\le t\le H,\quad i\in E.
\tag{8}
$$

For the right target $i=e_1$, the last eight paths are:

| Original exciting target $c$ | Environmental source $j$ | Exciting range | Return range | Paths |
| --- | --- | --- | --- | ---: |
| $0$ | $(0,\pm1,\pm1)$ | $\sqrt2$ | $\sqrt3$ | 4 |
| $0$ | $(1,\pm1,\pm1)$ | $\sqrt3$ | $\sqrt2$ | 4 |

The second row is a second old excitation of four previously received source identities. The left target has the reflected paths under $x_1\mapsto1-x_1$. There are eight environmental identities globally, eight paths per target, and sixteen directed endpoint receptions globally. Reflection pairs those directed events; no claim that their times are all distinct is required.

Let $s$ be the environmental source's reception of the original pulse endpoint, and let $t$ be that event's subsequent reception by the target. The two exact moving reception equations are

$$
s+\frac98=\|j-c+\mathbf y_j(s)\|,
\qquad
t-s=\|i-j+\mathbf y_i(t)-\mathbf y_j(s)\|.
\tag{9}
$$

The original target pulse displacement is exactly zero at its endpoint. The source event lies within $b_s$ of $\sqrt2-9/8$ or $\sqrt3-9/8$, so it lies strictly inside the known source prefix. Each arrival map is strictly increasing because the relevant source and receiver speeds are subunit. Thus both events exist uniquely when the endpoint residual signs bracket zero. Adding the two range estimates in (9) gives the common target bracket

$$
\left|t-\tau_*\right|\le b_t+2b_s=\frac7{120000},
\qquad \tau_*=\sqrt2+\sqrt3-\frac98.
\tag{10}
$$

The strict inequalities

$$
2<\tau_*-\frac7{120000}
<\tau_*+\frac7{120000}<\frac{259}{128}
\tag{11}
$$

provide those residual signs and put every one of the sixteen directed events after $2$ and before $H$. For a purely rational exterior enclosure, the square-verified bounds $1414213/10^6<\sqrt2<1414214/10^6$ and $1732050/10^6<\sqrt3<1732051/10^6$ imply that every event lies in $(2.02120,2.02133)$; these decimal endpoints denote exact rationals. Equations (10)–(11) are the sharper symbolic enclosure.

All 25 original pulse paths per target that have entered by this horizon have therefore delivered their pulse endpoints. This does not complete the 96 distant old direct receptions counted in Section 3, nor does it erase the subsequent environmental motion carried by any source history.

## 5. The same full-law residual budgets through the new horizon

Retain every source polynomial, its exact early zeros, its complete old-pulse history, and its certificate through $a$. Extend only the target polynomial and its residual certificate through $H$. All conditions of the [accepted residual-propagation theorem](smooth-two-particle-later-residual-propagation.md) remain required: exact initial data and $C^1$ joins with absolutely continuous first derivatives, source displacement/speed/acceleration tubes (2), complete causal roots, continuous-cell Euclidean residual bounds, target polynomial norm at most $9\times10^{-6}$, and inclusion of the full stationary term at both stages. $C^2$ polynomial joins are sufficient. A derivative-based residual checker must respect the same knot and one-sided remainder conditions as that theorem.

The source error proof is unchanged because its interval is unchanged. With source residual $\rho_s\le10^{-10}$, it gives source position and velocity errors $E_P\le\rho_s$ and $E_V\le3\rho_s$. For a temporary actual target tube $B_t=1/100000$, all source roots still lie below $a$, since $H-1+B_t+b_s<a$.

The exact trial-source early-zero cuts remain

$$
\theta_2=1/32,\qquad \theta_3=11/32,\qquad
\theta_4=39/64,\qquad \theta_5=27/32.
$$

The trial census remains 21 source identities. The potentially tight exclusion is a first-$m=4$ source at target distance $\sqrt2$. The old derivative-estimate floor $7/5$ is too coarse to prove this exclusion at $H$; the sharper rational lower bound $140/99<\sqrt2$ gives

$$
H+B_t+b_s-\frac{140}{99}<\frac{39}{64}.
\tag{12}
$$

The $m=5$ exclusion follows from the same left side being below $27/32$. The remaining excluded possibilities obey $H+B_t+b_s-2<1/32$ and $H+B_t+b_s-12/7<11/32$. These cuts exclude premature nonzero trial rows without changing any source polynomial. The actual census was proved separately in Section 3.

All receiver and source-history derivative constants of the preceding theorem are therefore unchanged: source receiver Lipschitz constant $L_s<7$, target receiver Lipschitz constant $L_t<1$, and source-to-target coefficient $H_P+3H_V<940$. The latter includes source-time shifts and the resulting source-velocity change bounded using $A_s$; it must not be replaced by a same-time comparison. For target residual $\rho_t\le10^{-9}$, set

$$
q=\rho_t+940\rho_s\le\frac{95}{10^9}=9.5\times10^{-8},
\qquad w=H-1=\frac{131}{128}.
$$

Exact zero target data through $t=1$ and the full-law Volterra comparison give

$$
\begin{aligned}
\|\mathbf y_i-\mathbf Z_i\|
&\le q(\cosh w-1)<6\times10^{-8},\\
\|\mathbf y_i'-\mathbf Z_i'\|
&\le q\sinh w<1.2\times10^{-7},\\
\|\mathbf y_i''-\mathbf Z_i''\|
&\le\|\mathbf y_i-\mathbf Z_i\|+q<2\times10^{-7}
\end{aligned}
\tag{13}
$$

on the polynomial cells, with one-sided endpoint bounds where necessary. The bounds $\cosh(131/128)<1.572$ and $\sinh(131/128)<1.212$ suffice for (13); they follow by summing the positive rational power series and bounding its decreasing-ratio tail. In particular, retaining $q\le9.5\times10^{-8}$ avoids prematurely rounding it up to $10^{-7}$. The target tube closes because $9\times10^{-6}+6\times10^{-8}<10^{-5}$.

Thus the same sufficient errors as the accepted certificate through $2$ hold through $H$: position $6\times10^{-8}$, velocity $1.2\times10^{-7}$, and acceleration $2\times10^{-7}$. They are dimensionless; physical displacement error is multiplied by $\ell$, velocity is unchanged in $c_f=1$ units, and physical acceleration error is divided by $\ell$. A certified negative polynomial vertical velocity below $-1.2\times10^{-7}$ on the entire new interval excludes an additional vertical turn there. The actual signed conclusion requires the extended polynomial certificate; the absolute continuation and endpoint proof above do not depend on it.

## Evidence boundary and falsifiers

This subject is a contributor derivation using frozen accepted inputs. Its new inequalities are explicit rational comparisons, square comparisons and positive-series bounds. No new numerical instrument was authored or used for this write-only completion. A separate reviewer owns the independent arithmetic and certificate reconstruction. Existing subjects, instruments, numerical receipts and adjudications are unchanged.

An incorrect source-cut inequality, a missed received source or second old excitation, a failed first-exit comparison, a nonpositive root denominator, an event outside (10), a wrong directed-event count, or a failed full-law residual/early-zero/join condition invalidates the corresponding new conclusion. Failure of these sufficient bounds would limit this continuation proof; it would not by itself demonstrate singular dynamics. All conclusions remain tied to the exact supplied past and regular history class.
