# Later complete-population comparison and target continuation

## Scope and status

**Developing sufficient conditions, not an acceptance claim.** The [preceding continuation subject](smooth-two-particle-post-restart-continuation.md) is frozen separately. This document develops the actual complete-population state at $15/4$, an a posteriori existence and state certificate through $17/4$, and the subsequent target comparison through $9/2$. The same supplied past, $g=16$, $c_f=1$, infinite alternating lattice, stationary eight-source block sum, causal-root law and original history class remain fixed. The requested next upward maximum is still an event to be established; no later maximum or settling behavior is presumed.

## 1. Why a direct population comparison is the useful next step

The new numerical archive represents all 674 environmental identities and both original targets through $15/4$. Its next append represents all 834 environmental identities and both targets through $17/4$. A numerical archive alone does not extend the actual solution. It supplies a center for a residual-to-solution comparison, with every receiver identity, source history and root retained.

A known-controlled diagnostic of the previous integrated absolute-row estimate on $[15/4,9/2]$ did not close the original environmental displacement ceiling $1/16$. Even with provisional source errors $10^{-5}$ in position and $5\times10^{-5}$ in velocity, $B=1/16$, $V=1/8$, $A=1/2$ and a sharp stationary coefficient $C=18$, it gave generated displacement majorant about $0.0811$, already exceeding the available displacement allowance. This is an ordinary floating-point feasibility calculation, recorded in `.tmp/mec-008-post-restart/hale/onward-probe-target.json`; it is not evidence of actual departure or a failure of the Master Equation. Tighter receiver-speed and acceleration choices still have to pass their own inequalities.

The alternative is to compare the complete numerical population directly with the exact law on $[15/4,17/4]$. The proof stops a hypothetical solution at the first exit from a small tube around the numerical center. If a continuous residual bound and source-error propagation remain strictly inside that tube, the exit cannot occur and ordinary continuation extends the complete population. This does not require a separate a priori global-displacement estimate for the same interval.

## 2. Received-history domains and sufficient source bounds

Put $h=15/4$, $H=17/4$. Preliminary use of the original environmental radius $1/16$ gives positive cross delays at least $7/8$ within the proposed small continuation, and hence source emissions no later than $27/8<15/4$. Thus all incoming histories lie in the already represented population prefix; no unknown source future enters the new comparison.

For receiver comparison radius $B_R=1/64$ and a certified full-source radius $1/500$ through $15/4$, the emission bound improves to

$$
s\le17/4-1+1/64+1/500=3.267625<105/32.
\tag{1}
$$

Only the first additional $1/32$ source interval after $13/4$ is needed for this complete-population continuation. A practical set of prospective actual received-source bounds is

$$
b_s\le1/1800,\qquad v_s\le1/800,\qquad A_s\le1/100\qquad(s\le105/32).
\tag{2}
$$

The outward polynomial norms at that cut must be added to actual propagated errors before (2) is discharged. Nominal source norms or a small endpoint state by themselves are not sufficient. The complete small state at $15/4$ and the shorter incoming prefix in (1) are separate obligations.

For the later target horizon $9/2$, the same initial full-source radius and the original radius $1/16$ give $s\le3.5645<115/32$. Thus incoming prefix norms through $115/32$ suffice after their errors are certified. A proof of the target cone alone would still leave actual existence of the rest of the population open; the direct population comparison through $17/4$ and a subsequent short complete-population continuation supply that missing obligation.

## 3. Complete small state at $15/4$

The independent conditional refresh comparison uses the accepted actual population through $13/4$, all incoming histories through that cut, receiver radius $1/500$, and the source bounds $1/2000$, $1/1000$, $1/100$. Its all-202-shell receiver derivative is below 11. The frozen receipt `.tmp/mec-008-post-restart/moore/refresh-error-target.json` is an explicit independent input to the present theorem; it is conditional on a new environmental residual at most $10^{-6}$. The two original targets use their separately accepted earlier error certificate, not that environmental residual premise.

That conditional comparison gives environmental error ceilings

| Cut | Position | Velocity | Acceleration |
|---|---:|---:|---:|
| $105/32$ | $1.798\times10^{-6}$ | $8.014\times10^{-6}$ | $7.638\times10^{-5}$ |
| $115/32$ | $9.898\times10^{-6}$ | $5.187\times10^{-5}$ | $2.353\times10^{-4}$ |
| $15/4$ | $2.157\times10^{-5}$ | $1.027\times10^{-4}$ | $4.361\times10^{-4}$ |

The accepted target-error profile through $15/4$ has endpoint ceilings $2.438\times10^{-5}$, $1.029\times10^{-4}$ and $3.358\times10^{-4}$. The parent outward norm receipt `.local-data/master-equation-closure/post-restart/population-check/polynomial-bounds.json` represents all 674 environmental histories and both targets. Its full-prefix norms are below $0.001586032$, $0.004784579$, $0.017559236$. Adding the error ceilings therefore proves, conditionally on the stated residual, the complete actual state and prefix bounds

$$
|y_i|<1/600,\qquad |y_i'|<1/200,\qquad |y_i''|<1/50\qquad(t\le15/4\text{ on the newly certified suffix}).
\tag{3}
$$

All earlier histories retain their accepted bounds. In particular the full source radius $1/500$ used in (1) is discharged. At $105/32$, the outward polynomial norms are below $0.000447963$, $0.001033040$, $0.005155400$. Environmental errors above and the accepted target profile give whole-source errors below $5\times10^{-6}$ in position, $2.5\times10^{-5}$ in velocity and $3.358\times10^{-4}$ in acceleration. These discharge (2). Through $115/32$, whole-source position and velocity errors are below $1/40000$ and $1/9000$; the acceleration error is below $1/2000$. Adding them to the corresponding continuous polynomial norms discharges

$$
b_s\le1/1000,\qquad v_s\le1/250,\qquad A_s\le1/50\qquad(s\le115/32).
\tag{4}
$$

The complete state, shorter prefix, source errors and polynomial norms are separate inputs. The source norm is not inferred from a target-only state or a sampled maximum.

## 4. Direct a posteriori existence through $17/4$

Take receiver ball $B_R=1/64$ and (2)'s incoming source bounds. The original pulse rows received on this interval have range at least $15/4+9/8=39/8>4$. For a deliberately conservative global receiver inventory retain every lattice position at squared anchor range at most 18, totaling 340 generated positions, in addition to the two possible old pulse rows. The actual generated inventory is a subset: sources have zero future before their first onset, and the remaining infinite stationary field is kept exactly in the equation. The earliest future onset and the range test exclude all larger squared ranges.

Use the accepted receiver and source-shift coefficients

$$
\begin{aligned}
L(P,V,A,r)&=24Pr^{-4}+2r^{-3}[(1-V)^{-2}-1]+\frac{Vr^{-3}+Ar^{-2}}{(1-V)^3},\\
C_P(V,A,r)&=\frac{2r^{-3}}{(1-V)^2}+\frac{Vr^{-3}+Ar^{-2}}{(1-V)^3},\qquad C_V(V,r)=\frac{r^{-2}}{(1-V)^2}.
\end{aligned}
\tag{5}
$$

They include the change of emission time caused by source and receiver displacement; the term containing $A$ controls source velocity at shifted times. The stationary receiver derivative on $1/64$ is at most $16\cdot100B_R^2$. Exact rational arithmetic with range floors $r_m=\underline{\sqrt m}-B_R-1/1800$ gives a full receiver derivative below $13.917607<14$.

For explicit reproducibility, let $F_P,F_V$ bound every received-source error. For emission times at most $13/4$ use the accepted uniform ceilings $1.6\times10^{-6}$ and $5.7\times10^{-6}$. For later emissions, use the maximum of the independently derived environmental refresh profile and the previously accepted target profile. Evaluate each by the upper endpoint of its $1/2048$ source-time cell. This intentionally loses some earlier time dependence and is still sufficient. The two frozen inputs are `refresh-error-target.json` above and `.tmp/mec-008-population-restart/moore/target-error-target.json`. Their environmental residual premise is retained explicitly.

At $15/4$ use initial errors $e_P\le1/40000$, $e_V\le1/9000$. If the entire new population residual is at most $1/25000$, each reception cell of width $1/256$ obeys

$$
e_P'=e_V,\qquad e_V'\le14e_P+\rho+16\sum_mN_m[C_PF_P(t-r_m)+C_VF_V(t-r_m)].
\tag{6}
$$

The source profiles are nondecreasing; replacing their values by the cell's upper source-time endpoints is therefore an upper bound. The exact hyperbolic propagator for constant forcing, with its positive-series tail bound and upward $10^{-15}$ state rounding, gives on the whole half interval

$$
e_P<0.001083166,\qquad e_V<0.005291646,\qquad e_A<0.020833945.
\tag{7}
$$

The largest required source time is below $3.266181<105/32$. The numerical append has 834 environmental paths and both targets, the complete first-excitation population because $(17/4+11/8)^2$ lies between 31 and 32 and the squared shell 31 is empty. A sufficient polynomial norm hypothesis is

$$
|\widetilde y_i|\le0.007100,\qquad |\widetilde y_i'|\le0.023755,\qquad |\widetilde y_i''|\le0.066105.
\tag{8}
$$

Adding (7) puts position strictly inside $1/64$, speed below $1/8$ and acceleration below $1/2$. Thus the comparison is a closed first-exit argument, supplying actual existence and uniqueness through $17/4$, not merely a conditional comparison with an assumed later solution. The usual regular-root local continuation extends the path whenever these strict bounds hold. It yields the complete restart state

$$
\boxed{|y_i(17/4)|<1/100,\quad|y_i'(17/4)|<3/100,\quad|y_i''(17/4)|<1/10.}
\tag{9}
$$

The uniform residual in this argument must cover both types of stored path. The newly computed environmental paths include a cubic approximation of the stationary field in their numerical center, while the retained target paths were computed without that term. The full exact field remains in the residual equation in both cases. The environmental budget $10^{-6}$ cannot automatically be assigned to the targets. The larger full-population budget $1/25000$ includes the separately checked target suffix; it is a sufficient condition to be audited against the actual receipts.

## 5. A quarter-step population continuation through $9/2$

Set $h=17/4$, $H=9/2$, $B=1/16$, and use (9)'s initial position and velocity bounds. All future emission times first lie below $H-1+2B=29/8<15/4$ by the original population radius; the certified full-prefix source radius from (3) then places them below $115/32$. Bounds (4) finally give

$$
s\le H-1+B+1/1000=3.5635<115/32.
\tag{10}
$$

At this short step a pointwise acceleration bound suffices. For a generated source at range floor $r=\underline{|i-j|}-B-1/1000$, let $b_j(s)$ and $v_j(s)$ be that persistent path's certified displacement and speed envelopes. The original changed-row identity gives

$$
|Q_{ij}(t)|\le\frac{2b_j(s)r^{-3}+v_j(s)r^{-2}}{1-1/250}.
\tag{11}
$$

Every source time is bounded by (10); each row uses the appropriate prefix ending at the next $1/32$ cut. Through $13/4$ the previously accepted per-path norm and error receipts apply; afterward the full-prefix errors $1/40000$ and $1/9000$ from Section 3 are added to each path's outward norm. Zero-before-onset conditions are enforced by exact radical lower bounds. Squared anchor ranges above 20 cannot receive any generated future by $H$, so the sum is finite without omitting any changed row. The full stationary field is retained separately.

The parent stationary remainder and the sharp cubic norm proved in the preceding subject give, on $B=1/16$,

$$
|S_0(y)|\le\left(14.3977+\frac{7995B^2}{(1-B)^7}\right)|y|^3<70|y|^3.
\tag{12}
$$

The exact source-resolved instrument `quarter_restart.py` first verifies its axial row bound, rounding, radical and time-lookup controls. It authenticates the population archive, rounds per-path norm sums upward to a $10^{-10}$ grid and the nonnegative row coefficients upward to a $10^{-18}$ grid. It checks all **956 affected identities**: the two targets and 954 environmental labels with first squared radius at most 34. The entire available 676-history source table is retained; rows not yet active evaluate to zero. Its maximum generated acceleration is below $0.694342084$. Old pulse rows have range at least $17/4+9/8=43/8>5$ and are bounded separately. Adding them and $16\cdot70B^3$ gives

$$
|y_i''(t)|<0.967937479<1.
\tag{13}
$$

Consequently, throughout $0\le u\le1/4$,

$$
|y_i(h+u)|\le\frac1{100}+\frac3{100}u+\frac{0.967937479}{2}u^2,\qquad
|y_i'(h+u)|\le\frac3{100}+0.967937479u.
\tag{14}
$$

At $H$ these are below $0.047748047<1/16$ and $0.271984370<1/3$. The strict radius and speed margins close another first-exit argument. This shorter step therefore establishes complete-population existence through $9/2$ once Sections 3 and 4's certificate hypotheses have been discharged. It does not use the failed longer integrated estimate as evidence.

## 6. Root completeness, regularity and identity coverage

The first-front triangle argument continues to exclude earlier generated-only first-excitation identities. Every environmental label outside the stated finite first-onset populations remains at its anchor through the corresponding horizon; its exact stationary equation is still part of the infinite model. Old and generated changed channels are admitted by the original causal-root equation. A complete conservative inventory is obtained by retaining every nonself pair whose source first-onset time plus anchor distance is at most $H+B$, and both original supplied-pulse rows when their corresponding old front can have arrived. Ambiguous boundary admissions are evaluated from their full source histories, never silently discarded or assigned an invented state.

On the final quarter step every cross range is at least $7/8$ and complete-history speed is below $1/3$. The root residual is strictly monotone with derivative at least $2/3$, every cross channel has one positive root and the positive self-root set is empty. The original root tube, transmitter floor and complement gaps retain strict margins. The received source acceleration is at most $3/8$, including the old supplied pulse, while received source speed is at most $1/250$. Implicit differentiation gives $|s'|<3/2$, $|R'|<7/20$; direct differentiation of the complete changed row, including its subtracted stationary row, bounds its time derivative by three. There are at most 388 generated lattice positions through squared range 20 plus two old rows. The stationary derivative bound $10000|y|^2$, which follows separately from the accepted Taylor derivative remainder on $1/16$, then bounds complete jerk by

$$
16[390\cdot3+10000(1/16)^2/3]<19000<65536.
\tag{15}
$$

The original environmental displacement ceiling, speed ceiling four, acceleration ceiling 256 and jerk ceiling 65536 are preserved. Earlier supplied and evolved histories retain their accepted regularity. New archive joins must be checked exactly as part of their certificate. Local uniqueness applies on these regular root charts; first departure from the certified solution is excluded by the same local argument. No new equation, source cutoff, boundary prescription or history-class enlargement has been introduced.

## 7. Target comparison through $9/2$

The complete-population result supplies the actual target path. Its separate target-specific census has 113 generated sources, with multiplicities $6,12,8,6,24,24,12,13,4,4$ at squared ranges $1,2,3,4,5,6,8,9,10,11$. Use target ball $1/64$, received-source bounds (4), the source profiles in Section 4, and the independently obtained preceding $33/8$ target error ceilings, safely rounded to $1/8000$ in position and $1/2000$ in velocity. These initial errors are a distinct input from the looser allowances used in the preceding parent sign certificate.

The receiver derivative is below $20.716562<21$. With full target residual at most $1/6250$, the same exact cellwise positive comparison as (6), now starting at $33/8$, gives

$$
e_P<0.001049216,\qquad e_V<0.005909849,\qquad e_A<0.031015671.
\tag{16}
$$

Its largest enclosed source time is $3.516625<115/32$. Safe allowances for the separate continuous sign certificate are

$$
\boxed{\varepsilon_P=0.0011,\quad\varepsilon_V=0.006,\quad\varepsilon_A=0.032.}
\tag{17}
$$

The candidate polynomial norm must satisfy $|\widetilde y|+0.0011<1/64$ throughout the interval. A positive sampled velocity alone is insufficient: the parent or independent sign instrument must enclose the whole polynomial derivative and subtract $0.006$. The resulting finite sign statement, if positive, excludes the requested next maximum only through $9/2$. It does not show that a later maximum exists or that the rising excursion has finished.

## 8. Evidence disposition and falsifiers

The mathematical construction is frozen for independent review. Exact conditional receipts are `.tmp/mec-008-post-restart/hale/later-error-target.json` and `quarter-target.json`, each preceded by its known-control receipt. `later-bounds-target.json` records a coarser uniform-source comparison used only to select practical budgets. The environmental refresh error is the explicitly named independent input in Section 3; both its residual premise and the separately inherited target premises must be discharged. Norm receipts retain their measured grade, and numerical archives require authentication and exact retained-prefix/compatibility checks.

The current acceptance obligations are the environmental refresh residual through $15/4$, the full 836-path residual and continuous norms through $17/4$, original-history and join checks, the full target residual through $9/2$, and independent continuous target signs. These are finite certificate obligations, not an assumption that the numerical center solves the equation. An uncovered source time, omitted identity, invalid interval operation, residual over budget, failed comparison tube or original regularity-class violation falsifies the corresponding sufficient result. Failure of a sufficient estimate does not establish failure of the actual law or exclude a later maximum.
