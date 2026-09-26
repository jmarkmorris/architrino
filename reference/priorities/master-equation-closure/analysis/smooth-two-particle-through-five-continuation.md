# A time-dependent continuation comparison through $t=5$

## Scope and status

This analysis preserves the original smooth supplied past, infinite alternating simple cubic lattice, one architrino per lattice site, eight-source stationary summation prescription, $g=16$, $c_f=1$, and the unmodified Master Equation. The environmental displacement ceiling remains $1/16$. The two selected histories have the same vertical motion by the original reflection and polarity-product symmetry. No new numerical trajectory is evolved here.

**Status: independently accepted complete-population continuation and strict common target rise through $5$.** The accepted result through $19/4$ remains frozen in the [preceding independent assessment](smooth-two-particle-class-preserving-independent-adjudication.md). The requested next upward maximum remains an open event. A failure of any sufficient bound below is a limitation of that estimate, not a failure of the equation or a demonstrated environmental exit.

## 1. Why the errors must follow individual received histories

The numerical environmental displacement reaches about $0.059305$ by $5$, leaving about $0.003195$ below the original ceiling. A single population-wide error bound carries the largest uncertainty into every receiver and every source time. That bound is unnecessarily expensive here: the most displaced environmental architrino, at $(-1,0,0)$, receives many histories whose errors are substantially smaller than the largest target error.

The new comparison therefore assigns separate position and velocity error bounds to each archived history. It also uses the source's error at its earlier emission time. Receiver radii change between short time intervals instead of charging the final radius over the whole evolution. The first attempts beginning at $17/4$ remained insufficient even with these changes. The final comparison starts at the already accepted common state at $13/4$, reuses the unchanged numerical histories and previously checked residuals, and sharpens the propagated error on those same histories.

The archive allocates 1,350 histories. The exact first-front census admits 1,174 affected identities through $5$, including both selected targets; the remaining 176 environmental trial histories are exactly zero through that time. All 1,350 allocated receivers remain in the comparison. The infinite stationary complement retains its original block sum; it is not discarded or replaced by a finite nearest-neighbor interaction.

## 2. Causal domains and the actual/trial union

Let $y_i(t)$ be the displacement of receiver $i$ from its lattice anchor. On a stopped solution with every relevant displacement below $1/16$, distinct-anchor distances are at least $7/8$. Consequently, every generated emission received by $5$ satisfies

$$
s\le5-\frac78=\frac{33}{8}<\frac{17}{4}.
\tag{1}
$$

The accepted complete histories through $17/4$ therefore cover the entire comparison. Their displacement is below $1/100$, including the numerical centers and their accepted errors. For a receiver radius $B_i\le1/16$ and squared anchor distance $m$, a first range floor is

$$
r_{ij}^{(0)}=\underline{\sqrt m}-B_i-\frac1{100},\qquad
s\le t-r_{ij}^{(0)}\le4.0725<\frac{17}{4}.
\tag{2}
$$

The radical is rounded downward before any binary interval arithmetic. At the earlier source-prefix endpoint enclosing (2), add the certified per-source error to the outward polynomial position, speed and acceleration norms. If these bounds are $(b_j,w_j,a_j)$, the improved range floor is

$$
r_{ij}=\underline{\sqrt m}-B_i-b_j.
\tag{3}
$$

The preliminary prefix used to obtain $b_j$ remains valid when (3) is larger than (2). Thus the refinement is not circular.

There are two source sets. An actual changed row is possible only when the exact first front can arrive by the receiver interval's upper endpoint. A trial row is possible when its archived polynomial is not identically zero over the required source prefix. The receiver derivative uses actual rows; source-error propagation uses the **union** of actual and trial rows. An early nonzero numerical trial remains in that union even when the actual source has not yet begun moving. The earlier four-row target correction and 1,104-edge population correction are therefore retained by construction rather than imported as fixed counts at a different horizon.

All old supplied-pulse rows are retained separately whenever their support can be received. For a pulse source at anchor $c$, a receiver ball of radius $B_i$ and pulse displacement bound $b_*=1/314928$, its reception window is contained in

$$
\left[\underline{|i-c|}-B_i-b_*-\frac{11}{8},\ \overline{|i-c|}+B_i+b_*-\frac98\right].
\tag{3a}
$$

A receiver interval disjoint from (3a) has exactly zero old-pulse derivative from that source. This matters for the most displaced environmental sites: their supplied pulses ended long before this continuation interval, so charging those derivatives again would unnecessarily amplify their errors. For a row whose window can overlap, the support $[-11/8,-9/8]$ and receiver time at least $13/4$ give causal range at least $35/8>4$, so range floor four remains sufficient. Generated histories from those same two source identities are still included in the actual/trial union.

## 3. Receiver and source error inequalities

For source displacement, speed and acceleration bounds $(b,w,a)$ and range floor $r$, use the previously derived changed-row sensitivities

$$
\begin{aligned}
L(b,w,a,r)&=\frac{24b}{r^4}+\frac2{r^3}\left(\frac1{(1-w)^2}-1\right)+\frac{w/r^3+a/r^2}{(1-w)^3},\\
C_P(w,a,r)&=\frac2{r^3(1-w)^2}+\frac{w/r^3+a/r^2}{(1-w)^3},\\
C_V(w,r)&=\frac1{r^2(1-w)^2}.
\end{aligned}
\tag{4}
$$

The acceleration bound in these coefficients accounts for the change in source velocity when the causal root shifts. It is not a new physical term. The denominator remains positive because the relevant source histories have speed below one.

Let $\delta y_i$ be the vector difference between the actual and numerical receiver paths. On a comparison cell ending at $t_k$, the acceleration-error inequality is

$$
\|\delta y_i''\|\le\lambda_i\|\delta y_i\|+q_{i,k},
\qquad
q_{i,k}=\rho_{i,k}+16\sum_{j\in U_i}
\left[C_{P,ij}E_{P,j}(t_k-r_{ij})+C_{V,ij}E_{V,j}(t_k-r_{ij})\right].
\tag{5}
$$

After integrating this vector inequality twice and taking norms, the positive Volterra comparison gives scalar bounds $p_i,v_i$ satisfying $p_i\ge\|\delta y_i\|$, $v_i\ge\|\delta y_i'\|$, $p_i'=v_i$ and $p_i''=\lambda_i p_i+q_{i,k}$. No second-derivative inequality for the Euclidean norm itself is assumed.

Here $U_i$ is the actual/trial union, $\rho_{i,k}$ bounds the complete numerical residual, and $\lambda_i$ bounds the actual receiver derivative, including both old pulse rows and the infinite stationary field. Source errors are queried at upward-rounded grid endpoints that have already been certified. Every source cut is at least $7/8$ earlier than the current receiver time; no future error or unproved later state enters the calculation.

The [new independent stationary assessment](smooth-two-particle-through-five-independent-adjudication.md) gives

$$
\|DS_0(y)\|\le3a_*|y|^2+983|y|^4,
\qquad a_*=14.3271,
\qquad |y|\le1/16.
\tag{6}
$$

The contribution to $\lambda_i$ is sixteen times the right-hand coefficient in (6). The same independent derivation bounds the fifth-order stationary remainder by $197|y|^5$ on this ball. These are sharper bounds on the original stationary block field, not a replacement interaction.

The start at $13/4$ uses the frozen complete-population position and velocity errors for the 506 then-affected histories. All later newly allocated histories have exactly zero retained numerical and actual prefixes at this start. For every receiver omitted from an earlier residual archive, the instrument checks that its exact first front lies after that archive endpoint and that its authenticated numerical zero prefix covers the endpoint. Its error is then exactly zero on that prefix; this does not assert that the numerical field or numerical residual there vanishes. For received times before $13/4$, the earlier accepted error profiles remain in force. Their acceleration errors initialize the entire cumulative source-acceleration-error prefix; none is replaced by zero. A received source error is set to zero only while both the exact physical first front and the authenticated numerical zero prefix cover that source time. Trial-only motion is never removed by the physical onset test alone. Once the new comparison supplies a sharper prefix, that prefix is used in later received-error terms.

## 4. Continuous propagation and first-exit closure

On each dyadic step of length $h=1/2048$, positive kernels give

$$
\begin{aligned}
p_{i,+}&=c_i p_i+s_i v_i+d_iq_{i,k},\\
v_{i,+}&=\lambda_i s_i p_i+c_i v_i+s_iq_{i,k},\\
a_{i,+}&=\lambda_i p_{i,+}+q_{i,k},
\end{aligned}
\tag{7}
$$

where $c_i=\cosh(\sqrt{\lambda_i}h)$, $s_i=\sinh(\sqrt{\lambda_i}h)/\sqrt{\lambda_i}$ and $d_i=(c_i-1)/\lambda_i$, with the continuous zero-$\lambda_i$ limits. The instrument evaluates positive Taylor series with a geometric bound for every remaining term. It forms $d_i$ from its own positive series, avoiding subtraction of two nearly equal rounded numbers.

The receiver radii are fixed within each interval of length $1/64$. Outward Bernstein control vectors bound every three-coordinate quintic polynomial throughout that interval. If its position norm bound is $P_{i,k}$, the strict inequality

$$
P_{i,k}+p_i(t_k)<B_{i,k}\le1/16
\tag{8}
$$

excludes a first exit from the chosen receiver ball. Successive intervals may use different radii, because each begins with the actual state established by its predecessor. A heuristic used to propose a radius has no proof authority; (8) must pass. In particular, an initially proposed radius larger than $1/16$ is capped at $1/16$ and actually tested before declaring that comparison insufficient.

Every source accumulation contains at most 1,024 nonnegative floating-point summands. Its computed sum is divided outward by $1-2^{-43}$, which dominates the standard finite-sum rounding factor for unit roundoff $2^{-53}$; an added $10^{-300}$ exceeds the possible accumulated subnormal error. This is an arithmetic enclosure, not numerical agreement with another implementation. The independent assessment checks the resulting sums and propagation by a separate route.

Continuous target signs follow by subtracting the appropriate endpoint velocity-error bound from the smallest vertical derivative Bernstein control value on each receiver interval. Endpoint height, velocity and acceleration intervals use the exact archived dyadic endpoint values and their corresponding outward error bounds. Positive velocity over the entire new interval excludes a new maximum there. It does not prove a later maximum exists.

## 5. Residual evidence and its scope

The complete population residual on $[19/4,5]$ uses the exact stationary cubic coefficient interval $[14.3016,14.3271]$ and the independently proved remainder allowance $197|y|^5$. It includes both old pulse rows and all 71,884 selected numerical generated edges. Their source histories are the unchanged canonical prefix through $17/4$. The source displacement bound $0.005$ follows from the earlier polynomial prefix, and every required emission remains inside that prefix.

On a reception cell crossing finitely many $C^2$ quintic joins, the acceleration defect is absolutely continuous. Its enclosure is the midpoint defect plus the integral of the interval containing the polynomial jerk minus the derivative of the evaluated acceleration. Both one-sided jerks are included. The 64 cells have width $4/1024$ and cover the complete interval without a gap. The pointwise stationary remainder is then added outward. This method avoids using a second-order midpoint formula across a jerk jump.

The measured complete environmental residual is below $0.004498697$, with a separate allowance for every environmental receiver in each of eight temporal bins. The new population residual is recorded under the literal local directory `.local-data/master-equation-closure/through-five/population-check/`. Earlier environmental residuals on $[13/4,15/4]$, $[15/4,17/4]$ and $[17/4,19/4]$ remain frozen. Their per-path maxima and temporal maxima may be intersected because both independently bound the same residual on each smaller receiver interval. The copied selected-target histories use their own residual certificates. A new short check of their unchanged $[13/4,15/4]$ prefix replaces the old stationary allowance $22400|y|^3$ by the independently sufficient full-field allowance $240|y|^3$. It gives residual below $1.090401\times10^{-6}$ in sixteen temporal bins. It changes no archived node or equation.

## 6. Closed comparison and continuous motion

The frozen receiver-resolved calculation gives, throughout the new continuation,

$$
\max_i|y_i|<0.062304433<\frac1{16},\qquad
\max_i|y_i'|<0.177391005<\frac12,\qquad
\max_i|y_i''|<0.611649869<256.
\tag{9}
$$

The largest position upper bound occurs at $(-1,0,0)$ and its reflected counterpart. At $5$, its outward numerical norm is below $0.059304651518$ and its position error is below $0.002999782$. The environmental class margin is greater than $0.000195567$. Every one of the 1,350 allocated histories passes its own continuous tube inequality; 1,174 identities can actually have been affected by this time.

Subtracting the target-specific error bounds from the continuous Bernstein enclosures gives

$$
\dot y_{e_1,3}(t)>0.0459,\qquad
\ddot y_{e_1,3}(t)>0.1925,
\qquad \frac{19}{4}\le t\le5.
\tag{10}
$$

Thus the two selected architrinos are still moving upward and their upward velocity increases throughout this newly certified interval. Conservative endpoint enclosures are

$$
\begin{aligned}
y_{e_1,3}(5)&\in[0.03488,\ 0.04118],\\
\dot y_{e_1,3}(5)&\in[0.1180,\ 0.1531],\\
\ddot y_{e_1,3}(5)&\in[0.3819,\ 0.6117].
\end{aligned}
\tag{11}
$$

The actual endpoint error allowances for this target are below $(0.003140263,0.017517641,0.114827531)$. The exact dyadic interval arithmetic retains these smaller bounds; (11) is rounded outward for readability.

Let $m$ and $M$ be the heights of the preceding minimum and maximum, and $z$ the target height at $5$. Retaining the common $m$ in the ratio gives

$$
47283<\frac{z-m}{M-m}<69711.
\tag{12}
$$

This compares the rise accumulated by $5$ with the preceding fall. The rising excursion has not ended. Equations (10) and the preceding accepted signs exclude a new upward maximum through $5$, but do not assert one later or a long-time damping pattern.

The [independent assessment](smooth-two-particle-through-five-independent-adjudication.md) closes the original-class and causal-root reconciliation. In particular, cross-history roots are unique and simple, positive own-history roots remain absent, and the normalized root margins retain their original strict inequalities. The independently derived jerk bound is below $12481.469<65536$. The finite result concerns this specifically supplied past, not typical populated-universe preparation.

## 7. Evidence and falsifiers

The frozen comparison, exact consequence extractor, known-control receipts and results are retained byte-for-byte under the literal path `.local-data/master-equation-closure/through-five/continuation/`. The main files are `pulse.py`, `pulse-known.json`, `pulse.json`, `outcomes.py` and `outcomes.json`; `retention.json` records hashes and retained source-error inputs. The original working paths remain under `.tmp/mec-008-through-five/hale/`. Each instrument passed exact known controls before its target run: constant acceleration, positive hyperbolic series, exact causal-front equality and exclusion, polynomial Bernstein bounds, positive grouped sums, stationary sensitivities, and a delayed quadratic source with a closed-form integral. Earlier insufficient calculations are retained as diagnostic evidence rather than overwritten or used as acceptance certificates.

Independent history checks under `.local-data/master-equation-closure/through-five/history/` authenticate the full archives, unchanged inherited node bits, reflection, zero newcomers, per-path continuous norms and the complete affected-identity census. These are polynomial and archive facts until combined with the residual and comparison inequalities above. The final independent assessment checks the original range, speed, acceleration, jerk, root-transversality, own-history and complement conditions, and accepts the finite result through $5$.

Falsifiers are an omitted source or receiver identity, an unaccounted trial-only row, an uncovered emission time, a residual above its stated allowance, a false outward arithmetic or stationary bound, an inherited acceleration error omitted from a source prefix, a failure of (8), or a nonpositive continuous target velocity after subtracting its error. Any such finding withdraws the corresponding finite conclusion. None justifies inferring an actual class exit or changing the Master Equation. The next maximum remains open until its actual velocity sign change and the continuous signs preceding it are certified.
