# A pointwise torque obstruction with unrestricted height frequency

## Proposed finite-speed region

Claim grade: derived with subject interval evidence, pending independent reconstruction. Keep the canonical equation with $K=c_f=1$ and all ordinary positive-delay partner and self roots. Let $R>0$, normalized time $\tau=t/R$, and prescribe complete paths
$$
X_j(t)=R\bigl(\cos[\beta\tau+j\pi/3],\sin[\beta\tau+j\pi/3],(-1)^jz(\tau)\bigr),\qquad j=0,\ldots,5,
$$
where $z$ is any real $C^2$ function on the entire real line satisfying
$$
\frac{19}{100}\le\beta\le\frac{21}{100},\qquad
|z(\tau)|\le h:=\frac1{50},\qquad |z'(\tau)|\le v_z:=\frac{19}{20}.
$$
No periodicity, reflection symmetry, Fourier restriction or bound on temporal frequency is required for this proposition. Periodic sign-changing heights satisfying these bounds are included. The unit radius and constant angular rate are restrictions; variable-radius histories are outside this result.

Write $A_t$ for the dimensionless tangential acceleration sum in the current receiver frame, so the physical tangential acceleration is $A_t/R^2$. The proposed pointwise conclusion is
$$
A_t(\tau)>\frac3{20}\qquad\text{for every real }\tau.
$$
The prescribed tangential acceleration is identically zero because radius and angular rate are constant. Thus the entire displayed class is excluded from exact canonical balance at every scale, without averaging or a half-cycle delay restriction. The statement is about prescribed histories and does not assert the actual fate of an evolving assembly.

## Complete causal-root chart

Physical speed squared is $\beta^2+[z'(\tau)]^2\le0.21^2+0.95^2=0.9466<0.98^2$. Take the common strict speed bound $v_*=0.98$. Each present-time partner separation has planar chord at least one. Complete positions lie in the ball of radius $\sqrt{1+h^2}$, with diameter less than 2.1. The all-past decreasing-gap argument therefore gives exactly one positive partner root per channel, no positive self root, and source divisor $D_s>0.02$. Every normalized delay obeys
$$
\frac1{1.98}<\Delta_j<2.1,
$$
so the coarse interval $[0.5,2.1]$ contains every root. No old root is removed by a finite memory cutoff.

At fixed receiver time, put $\sigma_j=(-1)^j$ and
$$
\alpha_j=j\pi/3-\beta\Delta,qquad Q_z=z(\tau)-\sigma_jz(\tau-\Delta).
$$
The squared distance is
$$
|Q|^2=4\sin^2(\alpha_j/2)+Q_z^2.
$$
The full axial displacement satisfies $|Q_z|\le2h$, irrespective of how much height phase the delay spans.

## Comparing roots without a height-frequency bound

Define two scalar comparison distances for each fixed $j,\beta$:
$$
q_0(d)=2|\sin[(j\pi/3-\beta d)/2]|,
\qquad q_h(d)=\sqrt{4\sin^2[(j\pi/3-\beta d)/2]+4h^2}.
$$
For every trial delay, $q_0(d)\le|Q(d)|\le q_h(d)$. Both comparison distances are Lipschitz with constant at most $\beta\le0.21$: they are norms of a rotating unit planar endpoint chord, with an additional constant axial component for $q_h$. Their gaps $q_0(d)-d$ and $q_h(d)-d$ consequently have descending secant magnitudes in $[0.79,1.21]$, including any nonsmooth zero chord.

Let $d_{0,j}$ and $d_{h,j}$ be their unique positive roots. The same initial-chord and diameter argument places both in $[0.5,2.1]$. Comparing signs at the actual causal root gives
$$
d_{0,j}\le\Delta_j\le d_{h,j}.
$$
This bounds the actual root by two equations that contain no height derivative or frequency. It does not approximate the actual height by a constant.

The [subject interval instrument](overnight2-b-thin-height-torque.py) encloses each comparison root over the full rotation-rate interval. Given a current interval $I$ and its midpoint $m$, it intersects $I$ with
$$
m+\frac{q(m)-m}{[0.79,1.21]}.
$$
For each allowed rate, the descending secant relation between $m$ and its root puts that root in this image. Interval evaluation of the gap includes all rates, so each contraction preserves every root in the parameter family. Thirty-two contractions suffice for the retained enclosure; no convergence-rate assertion is needed. Taking the lower comparison interval's lower endpoint and the upper comparison interval's upper endpoint bounds every actual delay.

## Retaining the axial source velocity in the divisor

In the receiver's cylindrical frame, the source planar velocity is $\beta(-\sin\alpha_j,\cos\alpha_j)$ and its axial velocity is $\sigma_jz'(\tau-\Delta_j)$. Direct contraction gives
$$
Q\cdot V_s=-\beta\sin\alpha_j+Q_z\sigma_jz'(\tau-\Delta_j).
$$
Hence the exact canonical source divisor is
$$
D_s=1+\frac{\beta\sin\alpha_j}{\Delta_j}
-\frac{Q_z\sigma_jz'(\tau-\Delta_j)}{\Delta_j}.
$$
The last numerator lies in $[-2hv_z,2hv_z]=[-19/500,19/500]$. This retains the full allowed axial speed; it neither drops the source velocity nor substitutes receiver velocity. Together with the comparison delay enclosure, it gives a direct positive interval for each divisor.

The tangential separation is $Q_t=-\sin\alpha_j$. Therefore each ordinary partner contributes exactly
$$
A_{t,j}=-\frac{\sigma_j\sin\alpha_j}{\Delta_j^3D_s}.
$$
The instrument encloses this expression separately for all five channels and sums the intervals. All time dependence and every allowed height profile are covered by the stated displacement/velocity norms. Independent treatment of correlated quantities can widen the interval but cannot lose a permitted value.

## Subject evidence and exact margin

Before target use, the instrument checked static comparison roots $1,2,1$ for channels $1,3,5$, exact static tangential cancellation, the source-projection divisor for an independently specified axial vector/velocity pair, and rational speed/diameter inequalities. The known receipt identity is 5ac63871d0eb63512b87d4961510565ab76860b8599a40b2b99446f51b69668f. Its pilot at exact rate 0.2 and height ceiling 0.01 retained a positive torque interval and measured 0.025253 internal seconds and 26,361,856 bytes peak resident memory. Pilot receipt identity is ad9ab3e26d858940879a0e11d943f0b76dd6b067f2856216ee7cbfe55bc257c3.

The declared target covers the full rate interval and height ceiling above. It completed synchronously in 0.007401 internal seconds and 26,148,864 bytes peak resident memory, with no orbit evolution or optimizer. The frozen instrument identity is ec4bee456af7b4d96ee623ece692f0b9724e157eb9954ae6cd916b431354d40e; target receipt identity is d09213aeb11fdae912e7c33906227a91634697638252e3313f18efb7da630618. Its exact lower endpoint is
$$
L=\frac{864870317356003040877398517396898409545092289}
{5708990770823839524233143877797980545530986496}>\frac3{20}.
$$
The inequality follows by positive integer cross multiplication. Thus the subject instrument establishes the proposed pointwise margin, conditional on independent verification of the mathematical enclosure and arithmetic implementation. The whole region is continuous; it was not selected by sampling all heights or frequencies.

Original known, pilot and target receipts remain under `.local-data/master-equation-closure/overnight2-b/thin-height-torque/`. The instrument writes receipts exclusively, rejects reuse of an existing output filename and checks the known receipt's source identity before target stages. Reproduction requires a separate output destination or an explicitly preserved copy; no historical-byte replay or remote-backup claim is made. Arithmetic uses the shared venv's mpmath interval library at 45 decimal digits. Its outward-rounding boundary must remain explicit in independent review.

## Falsifiers and remaining scope

A counterexample satisfying the complete-history amplitude, velocity, radius and rate conditions with tangential acceleration at or below $3/20$ would falsify the conclusion. A wrong comparison-root ordering, omitted partner root, unbounded source product, reversed polarity sign or interval lower endpoint would defeat the corresponding proof step. A rapid height oscillation alone is not outside the theorem; exceeding its height or velocity norm is. The target does not cover the earlier negative-axial-work examples with height 0.2, nor does it exclude variable-radius histories.

This subject has not yet received independent acceptance. The receiving account is the second overnight B report. Existing subjects, references, runtime evidence and shared owners remain unchanged.
