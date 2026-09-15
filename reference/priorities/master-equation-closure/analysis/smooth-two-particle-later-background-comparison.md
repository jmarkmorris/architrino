# Error caused by omitting the stationary background in the later comparison

## Scope and conditional result

Consider the unchanged fixed two-target control at $g=16$ and $c_f=1$. Let $\mathbf y_i$ solve its exact equation with the prescribed stationary block field $\mathbf S_0$, and let $\widetilde{\mathbf y}_i$ solve the equation with precisely that term omitted. The supplied complete pasts, finite changed-source corrections, causal roots, transmitter denominators and coupled source histories remain identical in definition. The second path is an exact mathematical comparison; it is not the output of a numerical integration scheme by definition.

Claim grade: **derived candidate, conditional on the continuation and correction estimates in the [later-continuation subject](smooth-two-particle-later-continuation.md), awaiting separate assessment**. For each target, suppose the exact comparison obeys

$$
\sup_{0\le t\le2}\|\widetilde{\mathbf y}_i(t)\|\le9\times10^{-6}.
\tag{1}
$$

Then throughout $0\le t\le2$,

$$
\boxed{\|\mathbf y_i-\widetilde{\mathbf y}_i\|<6\times10^{-8},
\qquad \|\mathbf y_i'-\widetilde{\mathbf y}_i'\|<1.2\times10^{-7}.}
\tag{2}
$$

Positions here are measured in units of $\ell$, and velocities in normalized wake-speed units. These bounds isolate the effect of omitting $\mathbf S_0$. They do not bound numerical integration, interpolation, finite-difference, root-solve or amplitude-truncation errors. A measured maximum below the threshold in (1) does not prove (1). For a numerical trajectory $\widehat{\mathbf y}$, a complete estimate must add a separately certified bound for $\widetilde{\mathbf y}-\widehat{\mathbf y}$.

## 1. Exact comparison and uniform source bounds

Use $E=\{0,e_1\}$ and the stationary-block decomposition

$$
\mathbf y_i''=g\mathbf S_0(\mathbf y_i)+g\sum_j\sigma_i\sigma_j\mathbf Q_{ij}(t,\mathbf y_i;\mathbf y_j),
\qquad
\widetilde{\mathbf y}_i''=g\sum_j\sigma_i\sigma_j\mathbf Q_{ij}(t,\widetilde{\mathbf y}_i;\widetilde{\mathbf y}_j).
\tag{3}
$$

Each $\mathbf Q$ is the exact changed transmitter row minus its stationary source row, as defined in the continuation subject. The infinite stationary tail is the one term omitted on the comparison side. Every received change from every required source remains present. In particular, a source receiving two different original target pulses retains both parts of its history.

The source cut used for target reception through $t=2$ is

$$
a_0=33/32,\qquad
b_s=1/60000,\qquad v_s=1/16000,
\qquad A_s=1/400.
$$

The continuation subject proves that through $a_0$ all receiver equations contain only original supplied-pulse corrections. Every evolved environmental source satisfies position, speed and acceleration bounds $b_s,v_s,A_s$. The same bounds apply to the exact comparison: remove the positive stationary-field majorants from that subject's first-exit proof. All its strict inequalities remain valid. The two target futures are stationary through this source cut on both sides. The input pulse itself has displacement at most $A_p=1/314928$, speed at most $\nu=1/8192$, and acceleration at most $3/8$.

The existence argument through $t=2$ also applies to the comparison by omitting its stationary majorants. Thus the new hypothesis (1) is a sharper tube for the two target comparison paths, not an assertion that the comparison exists only when a numerical plot happens to fit the tube.

## 2. Difference of old-pulse source histories

For a source path evaluated through $a_0$, its original exciting histories are exactly the same on both sides of (3). Only receiver motion and the omitted stationary field differ. The correction derivative estimate from the continuation subject is

$$
\mathcal L(P,V,A,r)=\frac{24P}{r^4}
+\frac2{r^3}\big[(1-V)^{-2}-1\big]
+\frac{Vr^{-3}+Ar^{-2}}{(1-V)^3}.
\tag{4}
$$

Both receiving paths lie in the source ball $b_s$, so their interpolation segment retains old-pulse range greater than $7/5$. There are at most two exciting rows. Their combined receiver Lipschitz bound is

$$
2g\mathcal L(A_p,\nu,3/8,7/5)<6.132446<7=:L_s.
$$

The omitted acceleration along the actual source is bounded by

$$
q_s=gCb_s^3=\frac{22400}{60000^3},\qquad C=1400.
$$

Let $e_j=\mathbf y_j-\widetilde{\mathbf y}_j$. It has zero initial position and velocity and obeys the Volterra norm bound

$$
\|e_j(t)\|\le\int_0^t(t-s)\big[L_s\|e_j(s)\|+q_s\big]ds.
$$

The nonnegative constant-coefficient comparison solves $z''=L_sz+q_s$, $z(0)=z'(0)=0$. Iterating the nonnegative integral operator, or integrating that scalar equation, gives

$$
\|e_j(t)\|\le\frac{q_s}{L_s}\big[\cosh(\sqrt{L_s}t)-1\big],
\qquad
\|e_j'(t)\|\le\frac{q_s}{\sqrt{L_s}}\sinh(\sqrt{L_s}t).
$$

At $a_0$ these bounds are smaller than

$$
E_P=1.1\times10^{-10},\qquad E_V=3.1\times10^{-10},
\tag{5}
$$

respectively. The actual comparison values before rounding are below $9.907\times10^{-11}$ and $2.988\times10^{-10}$. All earlier source times satisfy the same uniform bounds. Supplied histories agree exactly, so (5) remains valid when a received source time is negative.

## 3. Changing the source history at a fixed target position

At a fixed receiver position and time, let $s,\widetilde s$ be the exact roots for the actual and comparison histories of one environmental source. A common subunit source-speed bound and the root equation give

$$
|s-\widetilde s|\le\frac{E_P}{1-v_s}.
$$

Consequently, the two received source positions and velocities differ by at most

$$
\Delta_U\le\frac{E_P}{1-v_s},\qquad
\Delta_W\le E_V+\frac{A_sE_P}{1-v_s}.
$$

If the segment between their two range vectors has range at least $r$, its unit vectors differ by at most $\Delta_U/r$. The product rule and $D\ge1-v_s$ give the changed-row bound

$$
\|\mathbf Q(\mathbf y;\mathbf y_j)-\mathbf Q(\mathbf y;\widetilde{\mathbf y}_j)\|
\le C_P(r)E_P+C_V(r)E_V,
\tag{6}
$$

where

$$
\begin{aligned}
C_P(r)&=\frac{2r^{-3}}{(1-v_s)^2}
+\frac{v_sr^{-3}+A_sr^{-2}}{(1-v_s)^3},\\
C_V(r)&=\frac{r^{-2}}{(1-v_s)^2}.
\end{aligned}
$$

This estimate includes the change of emission time. Comparing only source values at the same numerical time would omit that term.

## 4. Closing the target tube

Use the temporary actual target tube

$$
B_t=10^{-5}.
$$

Together with (1), the segment between target paths stays in that tube until any first exit. Through $t=2$, the complete possible target-source set contains five sources at unit anchor distance, twelve at distance $\sqrt2$, and four at distance $\sqrt3$. Before a source turns on its correction is exactly zero; including it in the bound early only enlarges the majorant. Range lower bounds throughout the tube are

$$
(r_1,r_2,r_3)=(99/100,7/5,12/7),
\qquad (n_1,n_2,n_3)=(5,12,4).
$$

For example, the nearest true range is at least $1-B_t-b_s>99/100$. All interpolation segments obey the same lower bounds. The complete source census has a strict margin to the next excluded family, so interpolating inside the smaller tube does not introduce an omitted source.

The receiver-position contribution to the target difference is bounded by

$$
L_t=g\sum_{j=1}^3 n_j\mathcal L(b_s,v_s,A_s,r_j)<0.611374<1.
\tag{7}
$$

Apply (6) to its source-history contribution. With (5), the constant residual bound is

$$
q_t=gCB_t^3+
g\sum_{j=1}^3n_j\big[C_P(r_j)E_P+C_V(r_j)E_V\big]
<9.885\times10^{-8}<10^{-7}.
\tag{8}
$$

The first term bounds the actual stationary field omitted in the comparison. The remaining terms carry the effect of the earlier omitted field on every received source history. Bounding only the direct target stationary term would miss the larger part of this error.

Both target paths remain exactly at rest through $t=1$. Set $w=(t-1)_+\le1$. The target difference therefore obeys, before any exit,

$$
\|\mathbf y_i-\widetilde{\mathbf y}_i\|\le10^{-7}(\cosh w-1),
\qquad
\|\mathbf y_i'-\widetilde{\mathbf y}_i'\|\le10^{-7}\sinh w.
$$

At $w=1$ these are below $5.431\times10^{-8}$ and $1.176\times10^{-7}$, respectively, proving the rounded bounds (2). In particular,

$$
\|\mathbf y_i\|\le9\times10^{-6}+6\times10^{-8}<10^{-5}=B_t.
$$

This strict inequality excludes a first target-tube exit. The bounds therefore hold through $t=2$, conditional on the exact-comparison hypothesis (1).

## 5. What would certify a turn or an amplitude comparison

For any component, (2) bounds its position and velocity error by the same numbers. If the exact comparison vertical velocity at a time is above $1.2\times10^{-7}$, the actual vertical velocity is positive there; if below $-1.2\times10^{-7}$, it is negative. Opposite certified signs bracket at least one actual reversal by continuity. They do not prove uniqueness of that turning point. A bound on its exact time additionally needs a lower bound on the relevant acceleration or another root-isolation argument.

Likewise, two fixed-time exact comparison heights separated by more than $1.2\times10^{-7}$ retain their ordering in the actual dynamics. Comparing the heights of maxima requires enclosing the extrema themselves, not simply subtracting values at numerically estimated turning times.

For a numerical trace, both tests also require its numerical error. The triangle inequality is

$$
\|\mathbf y_i-\widehat{\mathbf y}_i\|
\le\|\mathbf y_i-\widetilde{\mathbf y}_i\|
+\|\widetilde{\mathbf y}_i-\widehat{\mathbf y}_i\|,
$$

with the corresponding velocity statement. This document supplies only the first summand. A convergence comparison between numerical step sizes is evidence about numerical behavior, but is not by itself a certified bound on the second summand.

## Development evidence and falsifiers

The frozen later-continuation subject was not edited during this comparison derivation. The new source and target inequalities are exact rational comparisons except for the elementary nonnegative series for $\cosh$ and $\sinh$. They were enclosed rationally: for $z\ge0$, sum $\sum_{n=0}^{20}z^n/(2n+\epsilon)!$ with $\epsilon=0$ or $1$, then bound the tail by its first omitted term divided by one minus the subsequent term-ratio upper bound. The ratios decrease thereafter, so this is a proved positive-series enclosure.

The scratch instrument `.tmp/mec-008-later-continuation/hale/background.py` passed its `known` mode before target execution: zero-argument values, exact first two coefficients for both series, and positive rational enclosures. `background-known.json` binds that pass to the script hash, and target mode refuses a different hash. `background-target.json` records the exact fraction comparisons behind (5), (7), (8) and the tube closure. This arithmetic check is not independent acceptance of the derivation and does not process numerical trajectories.

Reproduction uses the shared environment:

```bash
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-later-continuation/hale/background.py known
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-later-continuation/hale/background.py target
```

Falsifiers include an omitted exciting history, a source root outside the controlled prefix, a failed receiver derivative or changed-source root estimate, a violation of the actual/comparison source bounds, an exact comparison leaving (1), or a failed rational comparison. The numerical-error boundary is explicit: a sampled trace remaining inside (1) does not establish the exact path's tube, and (2) cannot be described as total numerical error without an additional certificate.
