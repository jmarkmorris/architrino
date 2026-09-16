# Population state certificate and a half-interval restart

## Scope and status

This derivation continues the same fixed supplied-history problem from the [accepted rising continuation through $h=13/4$](smooth-two-particle-next-maximum-independent-adjudication.md). The objective is an actual continuation through $H=15/4$ based on a certificate for the entire population at $h$. The infinite alternating cubic lattice, complete supplied past, fixed eight-source stationary block sum, unmodified Master Equation, $g=16$ and $c_f=1$ are unchanged. No eventual maximum, reversal, growth or settling premise enters the argument.

Claim grade: **derived sufficient conditions in development**. A polynomial approximation is a proposal until the independent continuous residual, norm, history and root checks discharge the conditions below. Earlier accepted analyses and instruments are frozen inputs.

## 1. Full-population first-excitation census

Let $E=\{0,e_1\}$ be the two original targets. For an environmental label $i\notin E$, define

$$
m_i=\min\{\|i-e\|^2:e\in E,\ \|i-e\|^2\ge2\},\qquad
\tau_i=\sqrt{m_i}-11/8.
\tag{1}
$$

Squared distances zero and one do not create a postrelease old-pulse excitation. Environmental supplied pasts are stationary, even where an earlier dynamically reconstructed past would not have been; the fixed preparation assumption remains unchanged. Both target future onsets are $\beta=\sqrt2-3/8$.

Every environmental first excitation occurs at (1). Before it, the receiver is at its anchor and the old source is at its anchor at pulse entry, so this first reception time is exact. Any finite chain of generated first-entry fronts from an old pulse has total anchor length at least the direct source-to-receiver distance by the triangle inequality. It cannot precede that direct onset. The exceptional environmental sites at unit distance from a target have a second-target exciting distance $\sqrt2$ or two, giving onset at most $5/8$; every generated onset is at least $\sqrt2-3/8>1$, so they likewise excite directly first. A positive lower cross delay excludes an infinite chain in finite elapsed time. In an equality case, the previously accepted onset expansion puts the generated correction at higher order than the nonzero direct leading term. Thus it cannot cancel the first direct excitation.

Consequently the complete nonconstant population through $h=13/4$ is

$$
\mathcal P_h=E\cup\{i\notin E:m_i\le21\}.
\tag{2}
$$

The cutoff follows from $\sqrt{21}<h+11/8=37/8<\sqrt{22}$. All other labels remain exactly at their stationary anchors through $h$. There are no additional environmental labels first excited only by a generated path. This assertion concerns first onset; the complete history of every included label still contains every subsequent old and generated response.

The known-controlled integer-shell enumeration in `restart.py` gives 504 environmental identities in (2), hence 506 nonconstant histories including both targets. The enumeration is arithmetic evidence for (2); its explanation of why there are no additional generated-only identities is the preceding first-entry argument.

## 2. Causal source coverage for the state certificate

The accepted actual population exists through $h$. Its received source prefix ends at $a_2=73/32$ with actual bounds $b_2=1/40000$, $v_2=1/8000$, $A_2=1/400$. A proposed small comparison radius $b_P$ for all histories in (2) must satisfy

$$
h-1+b_P+b_2<a_2.
\tag{3}
$$

For example, $b_P=1/2000$ has a strict margin. Then every generated source root required by the full-population certificate samples the already accepted prefix; no newly prescribed future is introduced. The complete incoming table includes both target paths, with one supplied by exact reflection only after checking that reflection against the retained polynomial data. All remaining incoming labels are exactly stationary on the relevant prefix and contribute through the stationary block field.

Write $y_i=X_i-i$ and $K(R)=R/|R|^3$. The actual equation and the polynomial residual use the same unchanged row

$$
Q_{ij}=\frac{K(i-j+y_i(t)-y_j(s))}{1-n\cdot y_j'(s)}-K(i-j+y_i(t)),\qquad
t-s=|i-j+y_i(t)-y_j(s)|.
\tag{4}
$$

The total acceleration is $gS_0(y_i)+g\sum_j\sigma_i\sigma_jQ_{ij}$. The infinite stationary field $S_0$ is retained. With source/receiver radii inside the accepted population ball, every cross root is unique, positive and transverse; the positive self-root set remains empty. Root-time error is part of the source comparison, rather than an additional residual that may be omitted.

## 3. Restart quantities

The state certificate must give uniform bounds for $|y_i(h)|$ and $|y_i'(h)|$ over all labels in (2), together with small complete received-source history bounds through $a_3=89/32$. The population outside (2) has zero initial displacement and velocity at the restart, although it can begin moving later. A complete past is retained for every label. The restart is an integration base for estimates, not a replacement of hereditary state by position and velocity alone.

The previously accepted vector-source integration identity must keep both source endpoint terms on $[h,H]$. If $J,D$ are its positive row coefficients, then

$$
\left|\int_h^tQ(u)\,du\right|
\le J\int_{s(h)}^{s(t)}|y_j(s)|\,ds
+D\bigl(|y_j(s(h))|+|y_j(s(t))|\bigr).
\tag{5}
$$

In particular, the lower source-time primitive cannot be discarded when estimating accumulated displacement. The remaining sections supply explicit budgets and a strict continuation comparison after the new certificate has been enclosed.

## 4. Certifying the complete environmental state through $13/4$

Use the positive-kernel construction in [Section 7 of the preceding continuation](smooth-two-particle-next-maximum-continuation.md#7-four-stage-residual-comparison-through-134). The accepted environmental-only source residual through $c=73/32$ is below $2\times10^{-10}$: its new tail is below $1.456\times10^{-10}$ and its inherited environmental prefix below $9.472\times10^{-11}$. The larger inherited partner residual need not be assigned to every environment path from release. Retaining the preceding $E_0,E_1$ and the delayed operators there, define

$$
\widehat E_2=2\times10^{-10}A_8+K_8*\mathcal T_{56,v_1,A_1}[E_1],\qquad
E_b=10^{-8}A_1(t-1)+K_1*\mathcal T_{36,v_1,A_1}[E_1],
\qquad F=\widehat E_2+E_b.
\tag{6a}
$$

Here the 56-row and 36-row range/multiplicity lists are exactly the source and target inventories of the preceding theorem. The environmental error is bounded by $\widehat E_2$; the target error through $c$ is bounded by the bridge expression $E_b$. Their sum $F$ is a uniform incoming bound for all 248 histories, with no assumption that their errors are equal. At $c$, the sharper environmental initial bounds are

$$
e_P<2.637\times10^{-8},\qquad e_V<1.023\times10^{-7},\qquad e_A<4.095\times10^{-7}.
\tag{6}
$$

The retained incoming environmental histories cover all nonconstant environmental paths through $c$; other newly constructed paths are exactly zero there. The targets through $h$ retain their accepted polynomial and actual-motion certificate. The new environmental residual only needs checking on $[c,h]$, after exact retained-prefix equality and exact initial-zero compatibility have been checked for every label.

For the new suffix use the comparison radius $b_P=1/2000$, source bounds $b_2,v_2,A_2$ and receiver-sensitivity coefficients

$$
\begin{aligned}
\mathcal L(P,V,A,r)&=24Pr^{-4}+2r^{-3}[(1-V)^{-2}-1]
+\frac{Vr^{-3}+Ar^{-2}}{(1-V)^3},\\
C_P(V,A,r)&=\frac{2r^{-3}}{(1-V)^2}+\frac{Vr^{-3}+Ar^{-2}}{(1-V)^3},\qquad
C_V(V,r)=\frac{r^{-2}}{(1-V)^2}.
\end{aligned}
\tag{7}
$$

The last term in $C_P$ retains the source velocity change caused by a root-time shift. The source time shift is bounded by source position error divided by $1-V$. For each old supplied-pulse root on the suffix, the moving range is at least $c+9/8>3$ and its stationary subtraction segment also exceeds three. Thus its receiver derivative can use range three, rather than carrying the earliest pulse range through the entire calculation.

All possible generated source rows through $h$ lie in squared shells $1,2,3,4,5,6,8,9,10$. Use

$$
\begin{aligned}
d&=(99/100,7/5,12/7,199/100,20/9,12/5,14/5,299/100,22/7),\\
N&=(6,12,8,6,24,24,12,30,24).
\end{aligned}
\tag{8}
$$

Including both original pulse rows, every generated row and the stationary derivative gives

$$
L_P\le2g\mathcal L(A_p,\nu,3/8,3)
+g\sum_jN_j\mathcal L(b_2,v_2,A_2,d_j)
+3g(1400)b_P^2<2.984344<3.
\tag{9}
$$

Define $K_3(u)=\sinh(\sqrt3u)/\sqrt3$, $A_3(u)=[\cosh(\sqrt3u)-1]/3$ and

$$
\mathcal T[E](t)=g\sum_jN_j[C_P(v_2,A_2,d_j)E(t-d_j)+C_V(v_2,d_j)E'(t-d_j)].
$$

For a new full-law environmental residual at most $\rho_P=10^{-6}$ through $a_3=89/32$ and at most $2\rho_P$ afterward, a sufficient position-error majorant on $[c,h]$ is

$$
\mathcal E_P(t)=e_P\cosh(\sqrt3(t-c))+e_VK_3(t-c)
+\rho_PA_3(t-c)+\rho_PA_3(t-a_3)+(K_3*\mathcal T[F])(t).
\tag{10}
$$

The final convolution is taken from zero as a conservative positive overestimate of the required integral from $c$. It does not assume error-free source histories or omit the prefix error. Bounds for velocity and acceleration follow by differentiating this positive majorant. The same comparison covers labels whose first excitation occurs after $c$, because their actual and trial initial values agree exactly and using (6) only increases the bound.

`state_error.py` passes exact restarted-position, restarted-velocity, constant-acceleration and zero-row-derivative controls before its target run. It uses the accepted positive-kernel series with a geometric remainder after index 24. Its sufficient bounds are

| Domain endpoint | Environmental position error | Velocity error | Acceleration error |
| --- | ---: | ---: | ---: |
| $a_3=89/32$ | $6.161\times10^{-7}$ | $2.492\times10^{-6}$ | $9.855\times10^{-6}$ |
| $h=13/4$ | $3.647\times10^{-6}$ | $1.296\times10^{-5}$ | $4.362\times10^{-5}$ |

For the two targets, retain the accepted residual budget $10^{-8}$ through $11/4$ and $10^{-6}$ thereafter, rather than assigning the latter from time one. With the preceding 60-row operator and receiver constant two, their refined majorant is

$$
G(t)=10^{-8}A_2(t-1)+(10^{-6}-10^{-8})A_2(t-11/4)
+K_2*\mathcal T_{60,v_2,A_2}[F](t).
\tag{10a}
$$

At $a_3$ its position, velocity and acceleration bounds are below $3.968\times10^{-7}$, $1.724\times10^{-6}$ and $7.794\times10^{-6}$. At $h$ they are below $2.734\times10^{-6}$, $1.043\times10^{-5}$ and $3.711\times10^{-5}$. These refine the previous allowances using the same accepted actual solution and full residual receipts; they do not replace any retained trajectory or residual instrument.

Consequently continuous environmental polynomial norms below $0.00045$, $0.00098$, $0.0099$, together with the accepted target certificates, suffice to close whole-population bounds

$$
|y_i(t)|<1/2000,\qquad |y_i'(t)|<1/1000,\qquad |y_i''(t)|<1/100
\quad(c\le t\le h).
\tag{11}
$$

Sharper endpoint or received-prefix bounds may be used when independently enclosed. The sufficient tolerances above are not measured polynomial norms and do not assert that the new archive has passed. Every residual retains both the infinite stationary contribution and all active old/generated rows. An equality of sample values cannot substitute for exact retained-prefix and compatible-join checks.

## 5. Sixteen received-history bounds and the population restart

The largest received environmental displacement is larger than the target displacement. Separating the two targets alone therefore does not repair the former uniform-source estimate. Instead retain the actual time dependence of the uniform source bound. In addition to the accepted ceilings $5\times10^{-6}$ through $41/32$, $10^{-5}$ through $57/32$ and $25\times10^{-6}$ through $73/32$, impose the following sufficient actual prefix-position ceilings:

| Prefix endpoint $n/32$ | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Ceiling in units $10^{-6}$ | 25 | 25 | 27 | 32 | 37 | 42 | 47 | 53 | 58 | 64 | 70 | 76 | 85 | 94 | 104 | 114 |

These are required upper bounds, not interpolated observations. Each includes every environmental history and both targets. A corresponding independently enclosed polynomial prefix norm below the displayed ceiling minus $10^{-6}$ suffices, since both source position-error profiles in Section 4 remain below $10^{-6}$ through $a_3$. The uniform received-source speed and acceleration ceilings are

$$
b_s=1/8000,\qquad v_s=1/2500,\qquad A_s=1/400.
\tag{12}
$$

For example, polynomial prefix speed below $0.00039$ and acceleration below $0.0024$, together with Section 4, close the latter two bounds. Complete negative-time source histories retain their original pulse ceilings.

Define a nondecreasing source-position envelope $b(s)$ as follows. It is zero before $1/32$, $5\times10^{-6}$ up to $41/32$, $10^{-5}$ up to $57/32$, and $25\times10^{-6}$ up to $73/32$. On $((n-1)/32,n/32]$, $74\le n\le89$, use the corresponding table ceiling. At a jump use the larger value. Let $B_1,B_2$ be its first and second primitives, vanishing before zero. Equivalently, if the envelope has nonnegative increments $\delta b_q$ at times $q$, then

$$
B_1(s)=\sum_q\delta b_q(s-q)_+,\qquad
B_2(s)=\frac12\sum_q\delta b_q(s-q)_+^2.
\tag{13}
$$

Take the restart initial bounds from (11) and the bootstrap

$$
\begin{gathered}
p_0=1/2000,\quad v_0=1/1000,\quad
Y(h+u)=p_0+Ku,\quad K=29/1000,\quad0\le u\le\Delta=1/2,\\
B=1/64,\quad V=1/16,\quad A=1/2,\quad C=1500.
\end{gathered}
\tag{14}
$$

Here $V$ and $A$ are auxiliary proof bounds. They remain within the original history class and change no parameter of the law. The final source cut is strict:

$$
H-1+B+b_s=2.76575<a_3=89/32<h.
\tag{15}
$$

Hence every source value needed for this entire half interval is already in the certified past. A receiver may have generated rows only at squared anchor ranges $1,2,3,4,5,6,8,9,10,11,12,13$. Use lower and upper anchor brackets

$$
\begin{aligned}
d&=(1,7/5,12/7,2,20/9,12/5,14/5,3,22/7,33/10,69/20,18/5),\\
\bar d&=(1,99/70,26/15,2,161/72,49/20,99/35,3,19/6,199/60,97/28,649/180),\\
N&=(6,12,8,6,24,24,12,30,24,24,8,24).
\end{aligned}
\tag{16}
$$

For each shell put $k=(d-B-b_s)^{-1}$, $M=(1+v_s)/(1-V)$ and

$$
\begin{aligned}
E&=\frac{2k^3VM}{1-V}
+\frac{k^2}{(1-V)^2}[k(VM+v_s)V+AM]
+\frac{k^3V(1+v_s)}{(1-V)^2},\\
J&=\frac{2k^3}{1-V}+E,\qquad D=\frac{k^2}{1-V}.
\end{aligned}
\tag{17}
$$

These are exactly the coefficients obtained by changing from reception time to emission time in the unmodified row and integrating its source-velocity term by parts. Set $S^+(t)=t-d+B+b_s$ and $S^-=h-\bar d-B-b_s$. The total generated displacement and velocity bounds at $H$ are

$$
\begin{aligned}
G_P=g\sum_jN_j\{&J_j[B_2(S_j^+(H))-B_2(S_j^+(h))-\Delta B_1(S_j^-)]\\
&+D_j[B_1(S_j^+(H))-B_1(S_j^+(h))]
+D_jb(S_j^+(h))\Delta\},\\
G_V=g\sum_jN_j\{&J_j[B_1(S_j^+(H))-B_1(S_j^-)]
+D_j[b(S_j^+(H))+b(S_j^+(h))]\}.
\end{aligned}
\tag{18}
$$

Both restart source endpoint terms and the lower emission-time primitive are retained. The source-position envelope is nondecreasing, so the displacement expression divided by elapsed time is nondecreasing; its endpoint bound controls every proposed earlier first exit.

Old supplied-pulse ranges after $h$ exceed $h+9/8=35/8$, including a safe subtraction-segment floor four. With $(J_o,D_o)$ from (17) at $k=1/4$, $v_s=\nu=1/8192$, a sufficient old-row velocity increment is $O_V=2g(2D_oA_p+J_oI_p)$. The stationary displacement and velocity terms are

$$
\begin{aligned}
S_P&=gC[p_0^3\Delta^2/2+p_0^2K\Delta^3/2+p_0K^2\Delta^4/4+K^3\Delta^5/20],\\
S_V&=gC[p_0^3\Delta+3p_0^2K\Delta^2/2+p_0K^2\Delta^3+K^3\Delta^4/4].
\end{aligned}
\tag{19}
$$

Exact rational arithmetic in `restart.py`, after its known shell, radical-bracket and integrated-step controls, gives

$$
\begin{gathered}
G_P<0.012645595,\quad G_V<0.040688579,\quad O_V<0.000014460,\\
S_P=0.001083525,\quad S_V=0.010474125,\quad Y(H)=0.015<1/64,\\
K-v_0-O_V-(G_P+S_P)/\Delta>0.000527301,\\
V-v_0-O_V-G_V-S_V>0.010322837.
\end{gathered}
\tag{20}
$$

The independent point-acceleration estimate is

$$
g\left[CB^3+2\frac{2A_p/64+\nu/16}{1-\nu}
+\sum_jN_j\frac{2b_sk_j^3+v_sk_j^2}{1-v_s}\right]
<0.419783873<1/2.
\tag{21}
$$

These strict comparisons close displacement, speed and acceleration simultaneously. Thus, once the complete state and the received-prefix hypotheses are certified, the actual complete population continues through $H=15/4$.

## 6. Complete roots, event inventory and original class

Through $H$, the first-excitation argument of Section 1 gives 674 environmental identities with $m_i\le26$, together with both targets, for 676 nonconstant histories. The next first-old shell is 27 and begins after $H$. The old directed channels through squared distance 26 are all admitted by $H-B$, while shell 27 begins after $H+B$. Their complete count is 1160.

All generated source histories needed at $H$ are among the 360 environmental first-excitation classes through 17 and both targets. For environmental classes $m=2,3,4,5,6,8,9,10,11,12,13,14,16$, the largest certainly admitted squared receiving shell is respectively $13,11,9,8,6,5,4,3,3,2,2,1,1$; all existing smaller shells are included. Both target futures admit existing shells through six. These give 17204 certainly admitted directed generated channels. The 56 sources of first class 17 can each additionally contribute their six unit rows near the endpoint, giving a complete possible inventory of 17540. Their onset $\sqrt{17}-3/8$ lies inside the coarse endpoint margin, so no exact admission count for those 336 rows is inferred from anchor timing. Their unique moving roots and the complete source histories remain in the equations. Every other generated family is excluded by a strict onset margin. This distinguishes complete equations from an unjustified count of nonzero rows.

The new actual displacement and speed bounds yield cross ranges at least $31/32$ and a complete positive-delay residual increasing at least $15/16$ times the delay increment. Thus every cross channel has exactly one positive root, and every self channel has none. On the original half-width root tubes $w=1/256$, the transmitter floor is at least $15/16$ and the complement gap at least $15w/16>w/4$. The self residual is at least $15\tau/16$, retaining the original normalized self margin. No diagonal value is assigned.

At most 204 changed rows occur at one receiver. Every received source acceleration is at most $3/8$, including the negative-time pulse; newly generated source values all lie before $a_3$. The inherited per-row time derivative below six therefore applies despite the enlarged auxiliary receiver-acceleration bound. Including the stationary derivative gives complete jerk below $(204\cdot6+1)g=19600$. Complete acceleration is below $1/(2\ell)$ and jerk below $19600/\ell^2$, within the original ceilings $256/\ell$ and $65536/\ell^2$. The regular actual histories retain $C^3$ joins, spatial envelopes, separation and anchor-cube density bounds.

Uniqueness remains among classical continuations with the identical complete supplied past, fixed block prescription, displacement at most $1/64$ and speed at most $1/4$. Such a competitor agrees with the accepted solution through $h$. Its minimum cross delay is $31/32$, so every source emission on $[h,H]$ is at or before $H-31/32=89/32<h$. Both solutions therefore satisfy the same locally Lipschitz receiver equations with the same already fixed histories and restart state. Ordinary uniqueness proves their equality. This is a finite continuation within the original comparison boundary.

## 7. Target residual propagation through $15/4$

For the final target comparison use radius $B_t=1/256$, received-source ceilings (12), and all 202 possible generated shell positions from (16) as a conservative row inventory. For error delays and row sensitivities replace exact integer-distance floors one, two and three by $99/100$, $199/100$ and $299/100$; retain the other lower floors in (16). These remain below every moving range in the target comparison. Including the stationary derivative gives

$$
L_t\le g\sum_jN_j\mathcal L(b_s,v_s,A_s,d_j)
+3g(1400)B_t^2<3.843524<4.
\tag{22}
$$

There are no nonzero old-pulse corrections at either target on this interval. Let $F_{3,P}=\widehat E_2+\mathcal E_P+G$ and let $F_{3,V}$ be the sum of the corresponding ordinary velocity-error expressions. In these expressions, a restarted initial-state term is set to zero before its restart time, and uses its usual right-hand formula afterward; it is an upper-bound function, not a physical path. The term $\widehat E_2$ covers early environmental errors, $\mathcal E_P$ covers the later environmental suffix and $G$ covers both targets. Adding them supplies a uniform bound without an unproved equality between the histories.

With target residual at most $\rho_t=10^{-4}$ on $[h,H]$, define

$$
\begin{aligned}
\mathcal E_t(t)={}&G(h)\cosh(2(t-h))+G'(h)\frac{\sinh(2(t-h))}{2}
+\rho_t\frac{\cosh(2(t-h))-1}{4}\\
&+g\sum_jN_j\int_0^t K_4(t-u)
\big[C_P(v_s,A_s,d_j)F_{3,P}(u-d_j)
+C_V(v_s,d_j)F_{3,V}(u-d_j)\big]du.
\end{aligned}
\tag{23}
$$

The required source-error integral begins at $h$; starting this positive bound at zero is conservative. Every queried source time is below $H-1+B_t+b_s<a_3$. Both old target initial errors are taken from the refined accepted profile $G(h)$ and $G'(h)$, not set to zero.

The polynomial-kernel arithmetic treats a restarted initial-position term correctly: the ordinary derivative of $e_P\cosh(\sqrt L u)$ is $e_PLK_L(u)$; it does not insert a spurious velocity impulse at its activation cut. `target_error.py` checks this on a constant source-position error with zero velocity before calculating the target. Its other controls are exact nonzero initial state under constant acceleration and zero-before-restart terms. The complete positive series includes the same rigorous geometric remainder as the state comparison.

The sufficient uniform target allowances on $[h,H]$ are

$$
\varepsilon_P=7.4\times10^{-5},\qquad
\varepsilon_V=3.1\times10^{-4},\qquad
\varepsilon_A=1.2\times10^{-3}.
\tag{24}
$$

A continuous polynomial position norm at most $0.0017$ plus (24) closes $B_t$. A continuous lower bound on the polynomial vertical velocity exceeding $3.1\times10^{-4}$ would prove actual strictly rising common height on the entire half interval. That sign is a separate numerical enclosure condition, not an inference from endpoint samples. Even after it is discharged, the next maximum and every later excursion remain unresolved.

## Evidence and falsifiers

The three new arithmetic instruments and their known-before-target receipts are owned in `.tmp/mec-008-population-restart/hale/`: `state_error.py`, `restart.py` and `target_error.py`. Their role is to evaluate the displayed sufficient comparisons. They do not independently certify the numerical trajectories. The separate residual instrument must authenticate the retained archives, check exact inherited prefixes and compatible joins, retain all old/generated rows and the stationary field, enclose all roots and verify the displayed continuous residual and norm budgets. Source-code hashes are provenance only.

The conditional continuation is falsified by an omitted first-excitation identity, an uncovered source time, an incorrect root-time sensitivity, a missing restart endpoint/lower-primitive term, failure of any strict first-exit margin or failure of the independent full-law residual and norm conditions. The conditional rising-motion conclusion additionally requires the continuous velocity sign enclosure. Different histories, summation prescriptions, coupling or comparison class are outside this theorem; neither a passing finite extension nor a failed estimate supplies a typical-population or all-time claim.
