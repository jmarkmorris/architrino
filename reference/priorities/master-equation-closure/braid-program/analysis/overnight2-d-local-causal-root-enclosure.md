# Local causal-root bounds for a feasible unit-speed history

## Purpose and claim boundary

The existing [delayed admission application](overnight2-d-delayed-admission.md) uses a complete reference-speed bound $L<1$. Its root enlargement divides by $1-L$. That estimate becomes unhelpful when a comparison approaches the selected field-speed ceiling, even if every contributing causal root remains ordinary. The result below replaces that global strict-speed denominator with a positive local causal-factor bound. The [independent component review](overnight2-d-fallback-components-independent-review.md) accepts the conditional derivation and exact controls; no numerical application is complete. It changes neither the selected ceiling nor the original preparation. Units are $c_f=1$.

Global source monotonicity and positive-factor root exclusion already appear in the [earlier tail review](overnight-d-tail-independent-review-2026-10-06.md#root-existence-complete-exclusion-and-the-transmitter-floor), whose local construction also supplies the relevant ordinary normal-cone continuation argument. The extension here is the explicit candidate-error/translation enclosure and its unit-speed controls, not a new existence theorem for the acceleration evolution.

## Assumptions and complete root selection

Fix reception time $t$, a receiver position $x$, and a continuous source history $q(s)$ for every $s\le t$. Assume that $q$ is globally 1-Lipschitz and bounded on the sufficiently distant negative past. The latter assumption holds for the prescribed rigid negative histories in this investigation. Assume $x\ne q(t)$. Define the scalar causal function for delay $\tau\ge0$ by

$$
F_x(\tau)=\tau-|x-q(t-\tau)|.
$$

For $\tau_2>\tau_1$, the triangle inequality and the Lipschitz assumption give $F_x(\tau_2)\ge F_x(\tau_1)$. Thus $F_x$ is globally nondecreasing, though it need not be strictly increasing. Present separation gives $F_x(0)<0$, and bounded distant negative history gives $F_x(\tau)\to+\infty$ as $\tau\to\infty$. At least one causal root exists.

Suppose a finite bracket $0<a<b$ has strict endpoint signs $F_x(a)<0<F_x(b)$. Assume $x-q(t-\tau)\ne0$ throughout this bracket and that, almost everywhere there,

$$
D_x(\tau):=1-n_x(\tau)\cdot q'(t-\tau)\ge d>0,
\qquad
n_x(\tau)=\frac{x-q(t-\tau)}{|x-q(t-\tau)|}.
$$

Absolute continuity gives $F_x(\tau_2)-F_x(\tau_1)\ge d(\tau_2-\tau_1)$ inside the bracket. Hence it contains exactly one root. Global monotonicity and the strict endpoint signs exclude every root outside it. This establishes complete root selection even when the source reaches unit speed elsewhere. An acceleration discontinuity does not affect the argument. At a source-velocity discontinuity both one-sided velocity bounds must satisfy the stated local condition; absolute continuity of position still suffices.

## Validated candidate and receiver-translation enclosure

Let $x_\theta=x_0+\theta p$, with $0\le\theta\le1$ and $|p|\le P$. Suppose a candidate delay $\tau_0$ has $|F_{x_0}(\tau_0)|\le\epsilon$. Choose a positive enlargement $\delta<\tau_0$ and validate the complete region $\tau\in[\tau_0-\delta,\tau_0+\delta]$, $\theta\in[0,1]$. Require nonzero source distance there and a common lower bound $D_{x_\theta}(\tau)\ge d>0$. The reverse triangle inequality gives $|F_{x_\theta}(\tau_0)|\le\epsilon+P$. Therefore the strict numerical condition

$$
d\delta>\epsilon+P
$$

proves opposite strict endpoint signs for every translation. Every translated receiver has one complete causal root, and that root lies in the proposed enlarged interval. The enlargement and factor bound must be verified together; calculating $\delta=(\epsilon+P)/d$ from an unverified nominal value of $d$ is circular and gives no certificate. A practical interval implementation may propose a bracket, bound all its source pieces and directions, then accept only the strict outward inequality above. Failure rejects or enlarges the proposal.

Let $r_\theta$ and $r_\eta$ be the established roots for two translations. At the same delay, $|F_{x_\theta}(r_\eta)-F_{x_\eta}(r_\eta)|\le|\theta-\eta|\,|p|$. Strong monotonicity inside their common bracket therefore gives $|r_\theta-r_\eta|\le|\theta-\eta|\,|p|/d$, and in particular $|r_1-r_0|\le P/d$. This two-point proof needs no finite smooth partition of the Lipschitz source. The root $r_0$ at translation zero is distinct from the candidate $\tau_0$; its candidate error is at most $\epsilon/d$. The complete-bracket proof is required before using these sensitivity estimates.

## Two exact controls at unit source speed

Take $q(s)=(\min(\max(s,0),1),0,0)$ and reception time $t=3$. The source is static before zero, has unit velocity on $(0,1)$, and is static after one. It is globally 1-Lipschitz and has bounded negative history.

For receiver $x=(0,2,0)$, a root with source time in $(0,1)$ satisfies $\tau^2=(3-\tau)^2+4$, giving $\tau=13/6$ and source time $5/6$. The bracket $[2,5/2]$ has endpoint values $2-\sqrt5<0$ and $(5-\sqrt{17})/2>0$. Throughout this bracket the direction's first component is nonpositive, so $D\ge1$ on each source-velocity trace. At the root, $D=18/13$. Thus the theorem establishes a unique ordinary root despite the unit source speed; a bound using only $1-L$ would vanish.

For receiver $x=(3,0,0)$ with the same source and reception time, every delay $\tau\in[2,3]$ is a root: its source time is $3-\tau\in[0,1]$ and its source distance is exactly $\tau$. Present separation remains two. The causal factor is zero on the open root interval. This case fails the strict local-factor premise and demonstrates why global feasibility and strict signs at a wider bracket do not alone establish uniqueness. These are exact analytical controls, not observations from the eight-member target.

## Conditional exclusion of a later birth reception

For an actual receiver that remains 1-Lipschitz after an admitted time $T$, the fixed-birth function $G_{ij}(t)=t-|X_i(t)-X_j(0)|$ is nondecreasing. If a complete validated margin gives $G_{ij}(T)\ge\gamma_{ij}>0$, then the margin persists. For a complete 1-Lipschitz source, $F_t$ is nondecreasing and 2-Lipschitz. Every causal root with delay $r$ satisfies $F_t(r)=0$, whereas $F_t(t)=G_{ij}(t)>0$. Thus $r<t$ and

$$
\gamma_{ij}\le F_t(t)-F_t(r)\le2(t-r),\qquad s=t-r\ge\gamma_{ij}/2.
$$

This is the predecessor's fixed-emission exclusion specialized to source zero. It rules out a later reception of the original birth under the stated premises, without proving future existence or ordinary-root regularity. A zero margin is insufficient. A numerical actual margin must account for both receiver-position error and original birth-position error. Removing a comparison jump budget additionally requires positive source times for every comparison and auxiliary homotopy root used in that decomposition; an actual-root margin alone does not establish this. No complete target margin or budget removal is claimed here.

## What the result does and does not supply

The result supplies a root-selection argument and a locally conditioned enlargement rule. It does not prove the globally feasible reference-speed premise, any positive local factor, the velocity-argument denominator in the acceleration kernel, finite-history error admission, or continuation of the selected ceiling law. Each remains a separate obligation in a later application. In particular, a polynomial comparison with a tiny unbounded speed overshoot cannot use the global monotonicity argument merely because sampled speeds are at most one.

For a numerical application, outward interval bounds must cover every receiver time in its cell, every translation in its trial region, and every intersected source piece. The norm direction uses $|x-q|$, rather than substituting the delay away from a root. Receiver/source separation, strict endpoint signs, complete source coverage and the local derivative inequality must all be retained in the receipt. A missing source piece, a feasible-speed violation, a nonpositive factor, or a second root outside the purported bracket falsifies the proposed application. No such target has been run here.
