# An all-future uniformly subfield inverse-distance pair cannot have two terminal velocities

## Fixed case and theorem

Fix a finite isolated opposite-polarity pair with equal fixed coupling, the inverse-distance radial response $p=1$, $K=R_*=c_f=1$, and every ordinary self and partner root. Supply complete separated uniformly subfield histories and consider a classical separated future on every $T\ge0$. Assume one common speed bound $|V_i(T)|\le b<1$ covers both complete supplied histories and their full futures. No mirror, plane, common-center or angular assumption is imposed.

**Derived candidate, pending independent assessment:** the two Cartesian limits $\lim_{T\to\infty}V_1(T)$ and $\lim_{T\to\infty}V_2(T)$ cannot both exist. This is a conditional property of an all-future uniformly subfield solution; it does not prove that such a solution exists for arbitrary histories. It does not exclude one velocity limit by itself, a limit only of speed magnitudes, or evolution whose speed approaches one without a common margin.

The [admitted expanding spiral](alternatives-screen-2026-10-05-logarithmic-spiral-adjudication.md) shows that the global uniformly subfield class is nonempty and that constant speeds need not give limiting velocity vectors. The proof below does not use that example or its perturbations as premises. It derives the terminal-velocity obstruction directly from the complete coupled equation.

## Complete root chart and late source times

Let $r(T)=X_1(T)-X_2(T)$ and $d(T)=|r(T)|>0$. The complete strict chord inequality excludes all nonzero self roots. For receiver $i$ and partner $j$, the residual

$$
H_i(S)=T-S-|X_i(T)-X_j(S)|
$$

decreases strictly in $S$ with derivative at most $-(1-b)$ wherever the norm is differentiable; the same monotonicity follows from its Lipschitz chord bound everywhere. Its remote-past value tends to positive infinity, while $H_i(T)=-d(T)<0$. There is exactly one partner root $S_i(T)<T$, with delay $\tau_i=T-S_i$, range $R_i=\tau_i$, direction $n_i$ from source to receiver and

$$
D_i=1-n_i\cdot V_j(S_i)\ge1-b>0,
\qquad A_i(T)=-\frac{n_i}{\tau_iD_i}.
$$

The current separation and speed bound give

$$
\frac{d(T)}{1+b}\le\tau_i(T)\le\frac{d(T)}{1-b}.
$$

Both source times tend to infinity at least linearly in $T$. Indeed $H_i(0)>0$ for sufficiently large $T$, since $|X_i(T)-X_j(0)|\le C+bT$, so the unique source is then positive. On positive source times,

$$
T-S_i=|X_i(T)-X_j(S_i)|\le C+bT+bS_i,
$$

whence $S_i\ge[(1-b)T-C]/(1+b)$. Thus any claimed terminal velocities also control all late delayed source velocities uniformly over their entire source-to-receiver intervals. No old-history segment is silently dropped; the complete root theorem proves that it is no longer sampled in this regime.

## Distinct putative terminal velocities

Suppose first that $V_i(T)\to v_i$ with $v_1\ne v_2$. Integration gives $X_i(T)=v_iT+o(T)$. Put $\lambda_i(T)=S_i(T)/T$. The preceding bounds keep $\lambda_i$ away from zero eventually. The root equation then gives

$$
1-\lambda_i=|v_i-\lambda_i v_j+o(1)|.
$$

The limiting equation $1-\lambda=|v_i-\lambda v_j|$ has exactly one zero in $(0,1)$. Its left-minus-right side is strictly decreasing with slope at most $-(1-b)$, positive at zero and negative at one. Compactness and this uniqueness show that $\lambda_i(T)\to\lambda_i^*\in(0,1)$.

Consequently

$$
n_i(T)\longrightarrow n_i^*=
\frac{v_i-\lambda_i^*v_j}{1-\lambda_i^*},\qquad
D_i(T)\longrightarrow D_i^*=1-n_i^*\cdot v_j>0,
$$

and

$$
T A_i(T)\longrightarrow-
\frac{n_i^*}{(1-\lambda_i^*)D_i^*}\ne0.
$$

Projecting onto the fixed direction $n_i^*$ gives $n_i^*\cdot A_i(T)\le-c/T$ eventually, for some $c>0$. Its time integral diverges negatively, contradicting bounded, let alone convergent, $n_i^*\cdot V_i(T)$. Distinct terminal velocities are impossible.

## Equal putative terminal velocities and an exact common-drift cancellation

It remains to exclude $V_1(T),V_2(T)\to v$ with the same $|v|<1$. Let $e=r/d$ and set

$$
\epsilon(T)=\sup_{s\ge cT-C}\max_j|V_j(s)-v|\longrightarrow0,
$$

where $c>0$ is any valid source-time lower-bound coefficient. For each actual source interval,

$$
X_j(T)-X_j(S_i)=v\tau_i+E_i\tau_i,
\qquad |E_i|\le\epsilon(T).
$$

Writing $a_i=d/\tau_i\in[1-b,1+b]$, the two unit chord equations become

$$
n_1=a_1e+v+E_1,\qquad
n_2=-a_2e+v+E_2,\qquad |n_i|=1.
$$

Consider first the exact common-drift geometry $E_i=0$. Put $u=e\cdot v$ and $w=\sqrt{1-|v|^2+u^2}>0$. The unique positive solutions are

$$
a_1=w-u,\qquad a_2=w+u.
$$

The exact transmitter factors satisfy

$$
D_1=1-|v|^2-a_1u=a_1w,\qquad
D_2=1-|v|^2+a_2u=a_2w.
$$

Since $\tau_i=d/a_i$, both products $\tau_iD_i$ equal $dw$. The complete relative acceleration therefore simplifies exactly to

$$
A_1-A_2=-\frac{n_1-n_2}{dw}=-\frac{(a_1+a_2)e}{dw}
=-\frac{2e}{d}.
$$

This is an algebraic cancellation for the declared delayed inverse-distance law. It invokes neither a change to a moving reference frame nor a physical boost symmetry. The individual accelerations still depend on the common drift.

For the actual late histories, the same scaled algebra is a uniform perturbation of this result. The positive root of $|ae+v+E|=1$ has derivative in $a$ bounded away from zero on the compact domain $e\in S^2$, $|v|\le b$ and sufficiently small $|E|$; explicitly its relevant square root is at least a fixed fraction of $\sqrt{1-b^2}$. The source velocities in $D_i$ differ from $v$ by at most $\epsilon(T)$ as well. All scaled ranges, denominators and algebraic functions therefore stay on one compact regular set. Uniform smooth dependence gives

$$
d(A_1-A_2)=-2e+O_b(\epsilon(T)),\qquad
r\cdot(A_1-A_2)=-2+O_b(\epsilon(T)).
$$

This estimate is independent of the size or limit of $d(T)$; the division by $d$ was performed before taking the uniform perturbation bound. It applies equally to growing, bounded or shrinking positive separation.

Now $r'=V_1-V_2\to0$, and direct differentiation gives

$$
\frac{d^2}{dT^2}|r(T)|^2
=2|V_1-V_2|^2+2r\cdot(A_1-A_2)
\longrightarrow-4.
$$

In particular this second derivative is at most $-2$ beyond some finite time. Integrating twice makes $|r(T)|^2$ negative at a later finite time, contradicting separated all-future classical evolution. Equal terminal velocities are also impossible.

## Interpretation and falsifiers

Every all-future uniformly subfield solution of this fixed isolated pair law must retain nonconvergent Cartesian velocity behavior in at least one member. This does not mean its speed magnitude grows, that its separation remains bounded, or that it is unstable. The exact expanding spiral is a compatible example with constant speeds and endlessly rotating velocities, while the general theorem imposes no mirror or planar symmetry. The collinear finite-unit theorem and sufficiently fast-decaying radial-power scattering examples retain their distinct hypotheses.

The conclusion is falsified by a complete separated global uniformly subfield $p=1$ pair with both velocity limits, a wrong source-time lower bound, a missing ordinary root on that speed domain, an incorrect exact common-drift cancellation, or failure of the uniform scaled perturbation estimate as positive separation changes. No acceleration or energy conservation law is imported. No numerical instrument, target evolution or altered history is used. This source is frozen pending separate mathematical review before shared integration.
