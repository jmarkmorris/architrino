# Signed error through the complete returned pulse

## Result, scope and assessment status

This analysis bounds the difference between the actual target velocity and an explicitly derived polynomial approximation through the latest first-pulse endpoint reception. It retains the exact supplied histories, alternating infinite lattice, original stationary block sum, normalized wake speed $c_f=1$ and $0<g=G/\ell\le16$. The approximation is a comparison instrument; the physical histories remain the EOM-generated histories in the accepted continuation.

Claim grade: derived candidate with computer-assisted residual enclosures, pending independent assessment. The preparation question has its separate [subject](smooth-two-particle-preparation.md) and [assessment](smooth-two-particle-preparation-independent-adjudication.md). All earlier accepted subjects and reviews remain unchanged. Numerical interval bounds below are measured by the declared outward-rounded arithmetic instrument, whose reach is the displayed residual inequalities; their mathematical use also requires the coefficient, root and propagation arguments in this document.

The candidate result is a brief interval of actual approach at $g=16$, followed by renewed separation by the latest pulse-end reception. The source-to-target reception shifts and weights supply the opposing terms even though the leading signed environmental displacement remains positive. The bounds below make the finite-amplitude error smaller than the negative midpoint margin. The complete uniform error enclosure covers every $0<g\le16$; a full classification of transition times as a function of coupling is not established.

## 1. Time domains and unchanged causal inputs

Let $t=T/\ell$, $\alpha=\sqrt2-11/8$, $\beta=\alpha+1$, $H=17/16$, and $u_H=H-\beta$. Environmental time $u=s-\alpha$ and target time $u=t-\beta$ are offsets at different receivers. They coincide only in a comparison; actual reception uses the causal root throughout.

The [accepted next-feedback continuation](smooth-two-particle-next-feedback-independent-adjudication.md) exists through $t=21/16$ for the entire coupling range. Set

$$
b_s=9/32,\qquad b_t=17/64,\qquad L=1/4.
$$

The target horizon obeys $\beta+b_t<21/16$. The latest pulse-end reception has offset $u_{\rm end}=\tau_{\rm end}-\beta$ in $[125/512,131/512]$, entirely below $b_t$. Accepted target/source displacement bounds imply that every source offset sampled through $b_t$ is below $277/1024<b_s$. Also $\alpha+b_s<\sqrt3-11/8<h=113/128$. Thus the four relevant environmental sources still receive only their original exciting old pulse and the stationary reference field. The targets still receive exactly the four generated environmental corrections; no new source family is omitted.

The old pulse is

$$
p(v)=-(1-8v)v^4(1-4v)^4\quad(0\le v\le L),
\qquad p(v)=0\quad(v\notin[0,L]).
$$

The auxiliary amplitude $\lambda p$, $0\le\lambda\le1$, defines derivatives of comparison expressions only. The actual input is $\lambda=1$. No statement about an EOM-generated preparation before release is needed or inferred.

## 2. Explicit environmental comparison polynomials

Put $d_0=\sqrt2$. Before $L$, define successive zero-initial primitives $F=\int p$, $J=\int F$, $K=\int J$, $N=\int K$, and $I=\int p^2$, $I_w=\int I$. In particular $F=-u^5(1-4u)^5/5$. Every quantity in this section is a polynomial with coefficients in $\mathbb Q(\sqrt2)$.

For a vertical source $k=(1,0,a)$, $a=\pm1$, define

$$
\begin{gathered}
C=3J/d_0^5+F/d_0^4,\qquad D=J/d_0^5+F/d_0^4,\\
A_x=\sqrt2\,p^2/16+5I/16+9\sqrt2\,I_w/32,\\
A_z=\sqrt2\,p^2/16+I/16-3\sqrt2\,I_w/32.
\end{gathered}
$$

Let $V_x,V_z$ start at rest and solve the polynomial equations

$$
\begin{aligned}
V_x''={}&-36Jp/d_0^{12}-20Jp'/d_0^{11}-4Jp''/d_0^{10}
-18Fp/d_0^{11}-10Fp'/d_0^{10}-2Fp''/d_0^9,\\
V_z''={}&-24Jp/d_0^{12}-16Jp'/d_0^{11}-4Jp''/d_0^{10}
-6Fp/d_0^{11}-6Fp'/d_0^{10}-2Fp''/d_0^9.
\end{aligned}
$$

The vertical comparison is

$$
\widehat U_k(\lambda,u)
=\lambda g(aC,0,D)
+\lambda^2\{g(A_x,0,aA_z)+g^2(V_x,0,aV_z)\}.
$$

For a transverse source $k=(1,a,0)$, define $A_t=-I/8-3\sqrt2 I_w/16$ and the resting primitive $V_t''=-3Jp/d_0^8-Jp'/d_0^7$. Then

$$
\widehat U_k(\lambda,u)
=-\lambda gJe_3/d_0^3+\lambda^2(1,a,0)(gA_t+g^2V_t).
$$

For $u\ge L$, continue each individual source coefficient by $f_+(u)=f(L)+f'(L)(u-L)$. This continues the coefficient equation; it does not assert zero acceleration of an actual environmental source. The exact old pulse in the residual retains its moving endpoint. Values and first and second derivatives match at $L$; the coefficient curves have the additional piecewise regularity needed below.

### 2.1. How the coefficients follow from the equation

For $R=k+y$, the first amplitude coefficient of the old correction at a fixed receiver is

$$
q_1(u,y)=A(R)p(u-\|R\|+d_0)+B(R)p'(u-\|R\|+d_0),
$$

where $A(R)=3RR_3/\|R\|^5-e_3/\|R\|^3$ and $B(R)=RR_3/\|R\|^4$. Therefore the first receiver displacement is $g[A(k)J+B(k)F]$. Receiver dependence in the second coefficient is

$$
D_yq_1=DA\,p+DB\,p'-(Ap'+Bp'')n^{\mathsf T},
\qquad n=k/d_0.
$$

Twice integrating $gD_yq_1\widehat U^{[1]}$ gives the displayed $g^2V$ terms. Expanding the fixed-receiver causal root and transmitter-weighted kernel to second order gives the $gA$ terms. The stationary receiver field has vanishing jets through degree two, so it enters the residual, not these coefficients. These operations retain the implicit old emission-time shift and its transmitter denominator.

## 3. The target comparison and the opposing terms

Let $C_s=2V_x+2V_t$ and

$$
A_2=p^2/d_0^5+3I/d_0^6+3I_w/d_0^7.
$$

These are the first-coordinate sums of the four source quadratic coefficients after extracting $g$ and $g^2$. Their positivity does not decide the received target impulse. The common target-height coefficient is

$$
Z=-\sqrt2 N-(1+1/(2\sqrt2))K-J/2.
$$

Define $X=g^2X_2+g^3X_3+g^4X_4$ with resting initial data and

$$
\begin{aligned}
X_2''&=A_2,\\
X_3''&=C_s-2[(C'+3C)D+CD'],\\
X_4''&=2(C'+3C)Z.
\end{aligned}
$$

The target comparison is $\widehat y=(\lambda^2X,0,\lambda g^2Z)$. To see the two transfer terms, a vertical channel has source offset shift $a(z-gD)$ at first order, and weight shift $a[3(z-gD)-gD']$. Its first source displacement is $agC$. Adding the two channels therefore contributes $2g^2[(C'+3C)z-g(C'+3C)D-gCD']$ to target acceleration at second order. Substitution of $z=g^2Z$ gives the displayed equations. The scalar receiver term multiplying $x$ has no second-order contribution. Reflection makes target height odd and target first displacement even in amplitude.

After $L$, use $F=p=0$, $J=J_L=-1/56770560$, $K=K_L+J_L(u-L)$ and $N=N_L+K_L(u-L)+J_L(u-L)^2/2$. The source coefficients, hence $A_2,C_s$, continue linearly. The constants $C_+=3J_L/d_0^5$ and $D_+=J_L/d_0^5$ give

$$
X_+''=g^2A_{2,+}+g^3(C_{s,+}-6C_+D_+)+6g^4C_+Z_+.
$$

Match each coupling coefficient's value and velocity at $L$. These definitions supply the comparison on the entire target interval without changing the actual pulse or assigning its moving completion time the anchor value.

At $g=16$, $u=3/25$, exact polynomial evaluation with an outward radical enclosure gives

$$
-3.811\times10^{-12}<X'(3/25;16)<-3.810\times10^{-12}.
$$

The signed negative value belongs to the complete target coefficient, including reception. The four-source anchor comparison alone is positive there.

## 4. Certifying the nonlinear residual

For an old-source comparison at fixed environmental time, its emission offset $v$ solves

$$
u=v+\|k+\widehat U(\lambda,u)-\lambda p(v)e_3\|-d_0.
$$

For a generated-source comparison at fixed target time, it solves

$$
u=v+\|n+\widehat y(\lambda,u)-\widehat U(\lambda,v)\|-1.
$$

Every comparison displacement is bounded by its reception offset divided by 1000 on the stated domains. The old pulse obeys $|p(v)|\le v/8192$ for $v\ge0$. The root in either comparison is therefore in $[998u/1000,1003u/1000]$. These brackets are proved from the triangle inequality and monotone residual; a numerical root finder is not used.

At any base amplitude in $[0,1]$, let a Taylor coefficient of order $n$ mean derivative divided by $n!$. Start with the enclosed zero-order root. Compute range coefficients recursively through order three. With coefficient $v_n$ temporarily zero and the preceding root coefficients fixed, let $r_n^*$ be the range coefficient. The omitted root coefficient enters the causal residual linearly with the transmitter factor $D_0$, so

$$
v_n=-r_n^*/D_0\qquad(n=1,2,3).
$$

Substitute these coefficients into the full vector row $K(R)/D-K(R_0)$. The first three coefficients, orders zero through two, are already matched by the polynomial equations. The remaining value at $\lambda=1$ is bounded by the supremum of the absolute third coefficient over $0\le\lambda\le1$, by Taylor's integral remainder. Add $1400g\|\widehat y\|^3$ or $1400g\|\widehat U\|^3$ for the unchanged stationary field. Summing absolute component residuals safely bounds the Euclidean residual norm.

At the pulse endpoint, use the polynomial derivatives on the part of the root interval inside $[0,L]$ and zero derivatives on its outside part, taking their interval hull. The pulse is $C^3$ with piecewise bounded fourth derivative. The row's second amplitude derivative is absolutely continuous across the finitely many endpoint crossings, so the same integral remainder applies. The source coefficient functions are treated with their own matching piecewise polynomials. A root crossing is not silently evaluated with an extrapolated pulse.

Outward-rounded interval arithmetic at 40 decimal digits encloses each time cell and the full amplitude interval. For uniform coupling, retain the separate powers of $g$, evaluate their time polynomials first, and then enclose $g\in[0,16]$. This avoids replacing polynomial cancellation by unrelated coefficient intervals. The time partition has width $1/1024$ for the full source and target domains. A midpoint-specific calculation uses 256 equal source cells on $[0,13/100]$ and 128 equal target cells on $[0,3/25]$.

### 4.1. Source residual and propagation

The coefficient and pulse bounds give $|p|<1/262144$, $|p'|\le1/8192$ and $|p''|<1/200$. With $B=1/8192$, $\rho=7/5$, $D_*=8191/8192$, define

$$
L_Q=24\rho^{-4}P+2\rho^{-3}W(D_*^{-1}+D_*^{-2})
+\rho^{-2}(\rho^{-1}W+A)D_*^{-3},
$$

where $P,W,A$ are the three pulse bounds. The exact rational inequality $16(L_Q+4200B^2)<1/20$ bounds the environmental acceleration's Euclidean receiver derivative. The actual sources lie inside $B$ by the accepted prefix; the comparison is below $1.7\times10^{-6}$ by the interval polynomial enclosure.

Let $r_s$ bound one source's residual norm. The measured full-domain enclosures, uniform in coupling, are

$$
\int_0^{b_s}r_s<1.4\times10^{-12},\qquad
\int_0^{b_s}(b_s-u)r_s<2\times10^{-13}.
$$

Position error satisfies $e(u)\le\int_0^u(u-v)r_s(v)\,dv+(1/20)\int_0^u(u-v)e(v)\,dv$. Taking the supremum and using $b_s^2/40<1$ gives

$$
\|U-\widehat U\|<3\times10^{-13},\qquad
\|U'-\widehat U'\|<2\times10^{-12}
\quad(0\le u\le b_s,\ 0<g\le16).
$$

For the midpoint-specific calculation at $g=16$, the residual integrals are respectively below $6.5\times10^{-13}$ and $2.5\times10^{-14}$ on $[0,13/100]$. The same argument gives the sharper bounds

$$
\|U-\widehat U\|<3\times10^{-14},\qquad
\|U'-\widehat U'\|<7\times10^{-13}.
$$

### 4.2. Target propagation and finite-amplitude sign

For the target set $B=1/8192$, $\rho=D_*=999/1000$, $P=B$, $W=1/1000$ and $A=1/200$. The actual source speed and acceleration are below $W,A$ by the accepted prefix. Exact polynomial enclosures put the approximate source speed below $2.664\times10^{-5}<W$ and acceleration below $0.000978<A$, uniformly in coupling and amplitude. Straight interpolation between the two source curves retains these ceilings. Every unit-anchor range and subtraction segment is above $1-2B>\rho$.

Using these constants in the derivative formula of Section 4.1, four generated corrections and the stationary term give

$$
L_t\le16(4L_Q+4200B^2)
=\frac{433804636525371871850525}{521150125842101174796288}<1.
$$

This is a Euclidean receiver-position Lipschitz bound for the target acceleration. It includes implicit source-root motion and the sampled source acceleration.

For two source histories with position and velocity errors $\epsilon_P,\epsilon_V$, keep the receiver state fixed. Their emission roots differ by at most $e_s=\epsilon_P/D_*$. At those unequal roots define

$$
e_U=\epsilon_P+We_s,\qquad e_V=\epsilon_V+Ae_s,
\qquad e_D=e_V+We_U/\rho.
$$

The source-row error before its outer coupling is at most

$$
e_{\rm row}=2e_U/(\rho^3D_*)+e_D/(\rho^2D_*^2).
$$

The first component has the smaller bound

$$
e_{{\rm row},1}=e_U/(\rho^3D_*)
+2B\{3e_U/(\rho^4D_*)+e_D/(\rho^3D_*^2)\}.
$$

Indeed its numerator is $x-U_1$, since every anchor channel vector has first component zero. The weight error is therefore multiplied by $|x-U_1|\le2B$. This retains the small separation component rather than replacing it by the complete acceleration norm. The direction estimate behind $e_D$ follows by integrating $Dn=(I-nn^{\mathsf T})/r$ along the range-safe segment.

Exact rational substitution gives the convenient conservative constants:

| Source estimate | $e_{\rm row}$ | $e_{{\rm row},1}$ |
| --- | ---: | ---: |
| Full interval, every $0<g\le16$ | $<3\times10^{-12}$ | $<4\times10^{-13}$ |
| Midpoint-specific estimate, $g=16$ | $<10^{-12}$ | $<4\times10^{-14}$ |

The measured target residual enclosures against the polynomial source curves are:

| Domain | $\int\|r_t\|$ | $\int(b-u)\|r_t\|$ | $\int|r_{t,1}|$ |
| --- | ---: | ---: | ---: |
| $b=b_t$, every $0<g\le16$ | $<9\times10^{-13}$ | $<9\times10^{-14}$ | $<8\times10^{-14}$ |
| $b=3/25$, $g=16$ | $<6.5\times10^{-14}$ | $<1.3\times10^{-15}$ | $<1.5\times10^{-15}$ |

The full target comparison has norm below $3.2\times10^{-6}$. For the full interval, the four history errors after their factors $g\le16$ sum to less than $2\times10^{-10}$ in acceleration norm. If $e_y$ is the target position error, the resting initial data and $L_t<1$ give

$$
\sup e_y\le
\frac{9\times10^{-14}+b_t^2(2\times10^{-10})/2}{1-b_t^2/2}
<8\times10^{-12}.
$$

This estimate is initially conditional on remaining in the target ball. The comparison norm plus the strict error bound is less than $B$, excluding a first exit and closing the estimate. The first-coordinate velocity error is then bounded separately:

$$
|x'(u;g)-X'(u;g)|
<8\times10^{-14}+b_t\{64(4\times10^{-13})+8\times10^{-12}\}
<10^{-11}.
$$

This holds at every $0\le u\le b_t$, uniformly over the full coupling range. The midpoint calculation uses history acceleration error below $7\times10^{-11}$ and gives

$$
\sup_{u\le3/25}e_y
\le\frac{1.3\times10^{-15}+(3/25)^2(7\times10^{-11})/2}{1-(3/25)^2/2}
<6\times10^{-13},
$$

and consequently

$$
\sup_{u\le3/25}|x'(u;16)-X'(u;16)|
<1.5\times10^{-15}+(3/25)\{64(4\times10^{-14})+6\times10^{-13}\}
<4\times10^{-13}.
$$

Both estimates include the full stationary field, actual generated histories, unequal source times, transmitter/range weights and receiver-position feedback.

## 5. The requested signed integral enclosure

Let $\mathcal Z$ be the exact four-anchor comparison of the [accepted next-feedback analysis](smooth-two-particle-next-feedback.md#4-signed-response-of-the-entire-first-pulse), and let $\mathcal E$ be its exact actual-history error. The accepted identity is

$$
x'(u;g)-x'(u_H;g)
=g^2\int_{u_H}^u\mathcal Z(v)\,dv
+\int_H^{\beta+u}\mathcal E(t)\,dt.
$$

Define the explicit center

$$
\mathcal C(u,g)=X'(u;g)-X'(u_H;g)
-g^2\int_{u_H}^u\mathcal Z(v)\,dv.
$$

The last integral retains the exact accepted comparison, including its moving endpoint terms. It can equivalently be evaluated from that comparison's defining one-dimensional integrals; no replacement by a quadratic anchor expansion is made. The new uniform bound is

$$
\boxed{
\mathcal C(u,g)-2\times10^{-11}
<\int_H^{\beta+u}\mathcal E(t)\,dt
<\mathcal C(u,g)+2\times10^{-11}
}
$$

for every $0<g\le16$ and $u_H\le u\le b_t$, hence through every admissible latest pulse-end reception. At $g=16$, the shorter interval $u_H\le u\le3/25$ has radius $8\times10^{-13}$. The bounds follow by subtracting the two velocity-error enclosures. This is a signed enclosure centered on the full reception correction, rather than an assertion that the correction is nonnegative.

The uniform radius is an absolute error bound. It becomes uninformative about the sign as $g$ tends to zero, because the true velocity scales with $g^2$. It therefore does not classify separation for every coupling. It does enclose the requested integral on the unchanged full domain, and the refined bound permits a decisive finite-amplitude counterexample to continued separation throughout that domain.

## 6. Approach and renewed separation at the admitted coupling 16

At $g=16$, the midpoint coefficient and its complete error give

$$
-4.211\times10^{-12}<x'(3/25;16)<-3.410\times10^{-12}.
$$

The exact reflection identity is $d(t)=1+2x(t-\beta)$, where $d$ is physical target separation divided by $\ell$. Therefore at

$$
T_*=(\sqrt2-51/200)\ell
$$

the physical separation velocity equals $d'(t)=2x'(3/25;16)<-6.8\times10^{-12}$. The targets are approaching. Continuity gives an open interval of negative velocity containing this event. The accepted positive velocity through $H$ implies at least one intervening zero. This proof does not locate a unique first zero or assume transversality of every zero.

On the whole endpoint enclosure $125/512\le u\le131/512$, a separate outward polynomial enclosure gives $X'(u;16)>1.9\times10^{-10}$. The uniform finite-amplitude error is below $10^{-11}$, so

$$
x'(u_{\rm end};16)>1.8\times10^{-10},
\qquad d'(\tau_{\rm end})>3.6\times10^{-10}.
$$

Thus separation has resumed by the latest pulse-end reception. Positive endpoint velocity would by itself have missed the earlier approach. The result is a reversal of velocity within this finite interval, not a coincidence construction or a statement that separation has fallen below its initial value. The accepted positive range and equal-time separation floors remain intact.

The preparation assessment separately shows that this particular complete past is not an unforced all-past history. The present result concerns its accepted forward initial-history problem. It supplies no typicality statement or claim that another physically prepared history has the same reversal.

## Development and falsifiers

The operator requested both the signed error integral through the latest reception and examination of preparation. This document is the coordinator's mathematical subject; the preparation subject and its independent review are separate. Source-response and coefficient-continuation contributions are retained in `.tmp/mec-008-signed-error/`, together with exact coefficient inputs, arithmetic scripts, known controls, target receipts and preservation manifests. Their successful author checks do not constitute independent acceptance.

Known controls preceded each instrument's target use: symbolic differentiation and integration; interval rational and square-root enclosures; Taylor coefficients of a known square root; a constant-pulse causal root with an exact affine answer; a known shifted cubic; and a piecewise $C^3$ polynomial crossing. The source contributor additionally checked the vector coefficients by separate kernel differentiation and the rational Bernstein inequalities. The first expanded-polynomial interval attempt was too wide; evaluating the same pulse in factored form reduced that enclosure. This changed the instrument's bound, not the physical input.

A missing coefficient, source-root term or transmitter factor; a root outside its certified bracket; an incorrect piecewise endpoint enclosure; a failed outward inequality; a receiver comparison leaving its derivative ball; or a residual exceeding its claimed integral invalidates the corresponding conclusion. A local sign result does not establish contact, typicality, an all-past preparation, or a sign for every other coupling. The original accepted separation theorem through $17\ell/16$ remains an unchanged dependency.
