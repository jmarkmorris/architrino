# A larger complete-history domain for T02 departure

Date: 2026-10-03. Assignment: Validated ring departure, Jack K. Hale lens, stable agent `/root/ring_axial`. **Scenario: unchanged Master Equation, $K=c_f=1$, every ordinary positive-delay root including the self hit.** This is a new proof subject for separate adjudication. Frozen earlier subjects and instruments are unchanged.

## 1. Result and claim boundary

**Derived with outward computer-assisted bounds, pending separate adjudication:** for every true fast characteristic root in the inherited witness interval, the normalized T02 ancient history extends analytically through $|q|\le0.001$, with $q(T)=q(0)e^{\lambda T}$. Both signs are covered. It has exactly eight ordinary hits per receiver, 48 directed hits, and one positive-delay self hit per receiver throughout its complete past. This enlarges the previous proved radius $10^{-13}$ by $10^{10}$. It is an extension of the same ancient solution, rather than an endpoint-prepared history or a polynomial treated as a trajectory.

Writing its exact series as $p(q)=P_{20}(q)+v(q)$, the remainder on this domain obeys

$$
\|v\|_1<2.894\times10^{-10},\qquad \|\mathcal E^2v\|_1<1.0290\times10^{-7},\qquad \mathcal E=q\partial_q.
$$

Here the vector norm is the maximum of its coordinate absolute coefficient sums on the $q=0.001w$ unit disk. Thus $\|\mathcal Ev\|_1\le\|\mathcal E^2v\|_1/21$. The physical position, velocity and acceleration remainder caps follow by multiplying these three bounds by the displayed rotation/Euler formulas below. These concern the exact polynomial with interval-enclosed coefficients; any rounded display adds its explicitly enclosed rounding error.

**Derived exclusion of events within this domain:** every member remains above wake speed, above $1.80854$; every transmitter satisfies $|D|>0.11406$; simultaneous member separation exceeds $0.97316$. Hence no fold, wake-speed event or collision occurs before this chart endpoint. These are positive margins, not evidence that the same chart remains valid later. No neighbor transfer, long-term dispersal, global stability or eventual fate is concluded.

The [degree-eight rounding subject](ring-departure-followup-coefficient-enclosures-2026-10-03.md), [old quantitative-domain proof](ring-unstable-series-quantitative-domain-2026-10-03.md) and [old separate adjudication](ring-unstable-domain-independent-adjudication-2026-10-03.md) supply the starting branch and its previous limitation. The larger-domain result here requires its own independent review.

## 2. Row-specific analytic delay balls

Work in the coefficient algebra of complex absolutely summable power series in $w$, with zero-constant displacement $p$ and $\|p\|_1\le\eta=0.003$. For each exact reference row retain its own delay $\Delta$, signed $D_0$, and phase $\theta=-2x$. Unlike a bound formed from the shortest range and smallest transmitter factor belonging to different rows, every divisor here retains its matching geometry.

For a proposed delay $d=\Delta+\delta$, write

$$
Q(p,d)=Re_1+p(w)-S(\theta-\Omega\delta)\{Re_1+p(we^{-\lambda d})\},\qquad F(p,d)=Q(p,d)\cdot Q(p,d)-d^2.
$$

The dot product is bilinear in this complex algebra; it is the ordinary Euclidean square on the real slice. At the exact reference $F(0,\Delta)=0$ and $F_d(0,\Delta)=-2\Delta D_0$. Use the preconditioned implicit map

$$
\mathcal T_p(\delta)=\delta+\frac{F(p,\Delta+\delta)}{2\Delta D_0},\qquad \|\delta\|_1\le s=0.04.
$$

The following bounds explain exactly what the new [tail-domain instrument](../../../../../scripts/braid-program/ring_departure_followup_tail_domain_20261003.py) encloses. Every symbol on the right denotes a positive upper cap, except the positive lower divisor caps $\Delta_-,d_D\le|D_0|$. Let $c=|\cos\theta|+|\sin\theta|$, $b=e^{\Omega_+s}$ and $\rho=e^{-\lambda_-\Delta_-+\lambda_+s}$. Every row has $\rho<1/2$, so composition and Euler differentiation satisfy $\|p(we^{-\lambda d})\|_1,\|\mathcal Ep(we^{-\lambda d})\|_1\le\eta\rho$. Set

$$
q_p=\eta+cb\eta\rho,\quad v_p=cb(\Omega_++\lambda_+)\eta\rho,\quad Q_*=\|Q(0,\Delta)\|_\infty+cR_+(b-1),\quad V_*=c\beta_+b,
$$

$$
K_*=2R_+^2\Omega_+^2\{|\cos\theta|\cosh(\Omega_+s)+|\sin\theta|\sinh(\Omega_+s)\}+2,
$$

$$
h_d=K_*s+4(Q_*v_p+V_*q_p+q_pv_p),\qquad \kappa=\frac{h_d}{2\Delta_-d_D}.
$$

These follow from $F_{\rm ref}''(d)=2R^2\Omega^2\cos(\theta-\Omega\delta)-2$ and $F_d=2Q\cdot V_{\rm source}-2d$. For the initial image use $q_{p,0}=\eta+c\eta e^{-\lambda_-\Delta_-}$ and

$$
g_0=\frac{2\|Q(0,\Delta)\|_1q_{p,0}+2q_{p,0}^2}{2\Delta_-d_D}.
$$

Every outward row result proves $\kappa<1$ and $g_0+\kappa s<s$. The largest contraction is below $0.405589$ and largest image below $0.035574$. Thus every delay is a unique analytic coefficient-algebra fixed point. At a root $F_d=-2dD$, so the fixed-sign baseline acceleration row is

$$
\frac{\sigma Q}{d^3\operatorname{sgn}(D_0)D}=\frac{-2\sigma Q}{d^2\operatorname{sgn}(D_0)F_d}.
$$

Its coefficient norm is at most $2(Q_*+q_p)/[(\Delta_--s)^2(2\Delta_-d_D-h_d)]$. Summing all eight rows proves a holomorphic acceleration map $B(p)$ with $\|B(p)\|_1\le M<12.794483$ throughout this ball. Signed negative-transmitter rows are included. The bound does not replace $|D|$ with $D$ physically: it uses the analytic continuation of the already fixed ordinary-row sign.

## 3. Degree-twenty tail contraction

The new [degree-twenty interval recurrence](../../../../../scripts/braid-program/ring_departure_followup_jets20_20261003.py) repeats the inherited exact formal recurrence with outward arithmetic, enclosing $u_1,\ldots,u_{20}$. It passes its separately recorded static, exponential, trigonometric and composition controls before its target. This is an extension of the interval adaptation, not an independent implementation of the recurrence theorem. All reference binary intervals and the true fast-root enclosure remain unchanged. Finite coefficients are not a convergence argument by themselves.

Use $q=\epsilon w$, $\epsilon=0.001$, and let $P(w)=\sum_{n=1}^{20}u_n\epsilon^nw^n$. The outward bounds give

$$
\|P\|_1<0.000993656,\qquad \|P(2w)\|_1<0.002025351<\eta.
$$

Let $N(p)=B(p)-B(0)-DB(0)p$. Its degree-$n$ recurrence is $A(n\lambda)u_n=N(p)_n$. On series starting at degree 21 define $\mathcal R$ coefficientwise by $A(n\lambda)^{-1}$. The inherited confinement estimate $\|A(z)^{-1}\|_\infty\le(z^2-34z-318)^{-1}$ gives

$$
B_{21}<0.00002371334,\qquad B_{21,2}:=\sup_{n\ge21}n^2\|A(n\lambda)^{-1}\|_\infty<0.01045758.
$$

The denominators are positive, and both rational upper functions decrease over these integers. Since $B(P(2w))$ has coefficient norm at most $M$, its degree-21-and-higher tail on the unit disk is at most $M2^{-21}$. Both the constant and $DB(0)P$ have no such tail. Consequently

$$
\|\mathcal R\Pi_{>20}N(P)\|_1\le b_0:=B_{21}M2^{-21}<1.446724\times10^{-10}.
$$

Take the tail ball $\|v\|_1\le t_0=2b_0$. The margin $m=\eta-\|P\|_1-t_0$ exceeds $0.0020063441$. A Banach-space Cauchy circle of radius $m/2$ bounds $\|DB(P+v)\|\le2M/m$. The exact frozen linear row matrices give

$$
\|DB(0)\|\le L_0:=\sum_m\{\|C_m\|_\infty+e^{-\lambda_-\Delta_m}(\|F_m\|_\infty+\lambda_+\|H_m\|_\infty)\}<166.742355.
$$

Here $n\rho^n\le\rho$ for every $n\ge1$ and each reference $\rho<1/2$ supplies the delayed derivative bound; the norm includes every row. Thus the tail map

$$
v\longmapsto\mathcal R\Pi_{>20}N(P+v)
$$

has contraction at most $B_{21}(2M/m+L_0)<0.306395$, and image norm below $2.333259\times10^{-10}<t_0$. Its unique fixed point gives the claimed analytic history and omitted-tail norm. Applying the twice-weighted inverse to the same forcing bounds $\|\mathcal E^2v\|_1\le B_{21,2}\{M2^{-21}+(2M/m+L_0)t_0\}<1.0290\times10^{-7}$. These bounds also give the first weighted norm because the tail begins at degree 21.

Every degree through twenty matches the old ancient branch. The new analytic solution agrees with it near zero by the accepted normalized coefficient construction and local uniqueness; the identity principle therefore makes this a continuation of that branch. It is not a different solution chosen at the new endpoint.

## 4. Complete real root chart and no event yet

The coefficient and weighted bounds give displacement norms $p_0,p_1,p_2$. For the physical history, the Euclidean deviations from the T02 circular history are at most

$$
b_0^{\rm phys}=\sqrt2p_0<0.001405242,\quad b_1^{\rm phys}=\sqrt2(\lambda_+p_1+\Omega_+p_0)<0.017883572,
$$

$$
b_2^{\rm phys}=\sqrt2(\lambda_+^2p_2+2\lambda_+\Omega_+p_1+\Omega_+^2p_0)<0.230710487.
$$

These hold for the entire past, since $|q(T-d)|\le|q(T)|$. The new [real-chart instrument](../../../../../scripts/braid-program/ring_departure_followup_real_chart_20261003.py) uses the squared reference gap

$$
H_j(d)=2R^2[1-\cos(j\pi/3-\Omega d)]-d^2
$$

on $0.1\le d\le3$. Reference root brackets are widened to $\pm0.04$. The history tube changes $H$ by at most $8b_0^{\rm phys}+4(b_0^{\rm phys})^2<0.011249832$, and $H'$ by at most $4\beta_+b_0^{\rm phys}+4R_+b_1^{\rm phys}+4b_0^{\rm phys}b_1^{\rm phys}<0.080182609$. Every widened bracket retains opposite endpoint signs and one strict derivative sign after these changes. An outward adaptive cover of every complementary interval exceeds the gap-change cap, so there are no omitted roots in this interval. The derivative margins imply $|D|>0.11406$ at every continued root.

For $0<d\le0.1$, the old self secant's current-tangent component is at least $\beta_-[1-(\Omega_+d)^2/6]$; changing velocity by at most $b_1^{\rm phys}$ leaves a margin above wake speed greater than $0.79788$. Hence no extra recent self hit occurs. Every recent partner has range-minus-delay margin above $0.68873$. All ranges are at most $2(R_++b_0^{\rm phys})<1.954764$, excluding roots at $d\ge3$. These three regions establish the complete eight-hit census, not just persistence of a chosen list.

The same tube proves speed $\ge\beta_--b_1^{\rm phys}>1.80854$ and simultaneous pair separation $\ge R_--2b_0^{\rm phys}>0.97316$. A fold, wake-speed event and collision are thereby excluded on the proved domain. The chart itself remains nonsingular at the endpoint; stopping there is a proof-domain boundary, not a dynamical obstruction.

## 5. Controls, immutable receipts and remaining work

All new numerical instruments pass known controls before targets. The tail majorant checks a static squared-gap contraction, an independently summed inverse-square Taylor tail against its scaled coefficient bound, and the rational weighted inverse monotonicity. The physical-chart instrument passes the static unique-root complement and exact static squared-gap perturbation identity. An initial hyperbolic-function API failure produced no target receipt; it was corrected by exponential definitions and known controls rerun before the successful targets. An initial static equality comparison used two upper endpoints differing by an outward ulp; it was replaced by interval overlap, and the physical target guard prevented running before that corrected known stage passed. Neither failure changes an earlier frozen instrument.

Frozen new instruments and local receipts:

| Item | SHA-256 |
| --- | --- |
| Degree-twenty instrument | `50bafec4a4c4595f4204af46207f8ea046814528f581f4c721fbad871d4e98ac` |
| Degree-twenty known | `8441ca1d9762efc73cbf159b99c7d60f5c88901475ab445b66d581a63f0ecfbc` |
| Degree-twenty target | `1b637b65fc1a4bcf9e442390a5f8fb8f8a413ee25be7ea97b4af06dbe8a7ec18` |
| Tail-domain instrument | `64abb690e7f78ab623e4eb7b2ba90848b0bad0c7e6b35988adab4b689a290289` |
| Tail-domain known | `b6599812782f05c3572e64702a5981ec9f1837729b495f571298ae8d64afd150` |
| Tail-domain accepted candidate | `6943ba0aefe09dc01a74a0583c0937c7a770e10e60a8eddc47ac81486ef87de5` |
| Real-chart instrument | `62c06395bfe49d9e88bb30fa2b102006289e01e97740e365462563c03e758b27` |
| Real-chart known | `82be973be8f0bfad058af9a42b04e1ec2aa389107113a210900b1848ca1cf62a` |
| Real-chart target | `237563a62f18efbc5d0d8f383b609fa2d19db420a9a22dc554d0a7c5245cc72d` |

The receipts live under `.local-data/ring-followup/departure/interval-jets20/`, `tail-domain/` and `real-chart/`. The tail candidate is `candidate-001.json`; binary endpoints rather than decimal displays are authoritative. The reference certificate remains `ca1673b65e8dab0e0e602c4156e59deb3008c0d40fb52ee0dbcf8f8cc0591ff6`. Degree-twenty owned run `e2015d33-3051-4314-91ed-16cdbb4fdf1a` completed exit zero with no stderr and closed group in 216.553 wall seconds by its lease; no operational success is used as a mathematical premise.

**Remaining:** construct successively centered analytic charts or a more accurate delay-polynomial preconditioner to go past this larger domain; at present no decisive event or intrinsic continuation obstruction has been validated. Generic analytic-ball candidates with larger $\eta$ fail at the two near-fold rows, so their failure is recorded as a limitation of this sufficient bound. An actual fold claim requires an enclosed zero of the full history-dependent transmitter factor, with the complete census up to its boundary; no polynomial outside the proved domain can supply it.

**Falsifiers:** a failed inherited exact balance/census or fast-root enclosure; a non-outward interval coefficient; an incorrect squared-gap derivative or missing derivative term; failure of the analytic coefficient-algebra ball, Cauchy or tail recurrence; an uncovered complementary delay interval; or a history in this domain with an extra ordinary hit or a stated margin violated defeats the affected claim. Check the exact binary target fields and the separate adjudication, rather than treating point residuals, finite coefficients, or the known controls as independent verification of this theorem.
