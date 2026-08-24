# Trailing-front activation dichotomy

**Status:** focused theorem target; reduced exact-mirror branch derived up to the ignition-instant existence step and numerically reproduced; full-system existence or exclusion not proved. **Owner:** FSC-006b/FSC-005. **Primary review input:** [Jack K. Hale third review](jack-k-hale-third-review-2026-08-02.md), finding JKH3-6.

## Purpose

The proposed exact-mirror event map has a zero matched impulse, continuous position and velocity, a complete labeled history splice, and single ownership of the event family. The isolated straight separating trace is exactly compatible with that map. Compatibility does not yet imply that the trace is the unique continuation.

The decisive question is whether a post-event partner front can become an ordinary root after an arbitrarily long interval of straight motion and start a self-consistent continuous slowdown. This note states that question as one prove-or-refute target. It adopts neither a multivalued continuation law nor an activation floor.

Plainly: the event itself is settled provisionally, but the future may still fork. We must determine whether the delayed wake law permits a pair to fly straight for any chosen time and then begin slowing without a separate kick.

## Exact reduced mirror equations

Normalize $T_{\mathrm c}=0$ and use symbolic $c_f$ in the derivation. On a mirror-collinear candidate trace write

$$
\mathbf V_1(w)=v(w)\mathbf e,
\qquad
\mathbf V_2(w)=-v(w)\mathbf e,
\qquad
0\le v(w)\le c_f,
$$

and define the speed deficit and accumulated distance deficit by

$$
m(w)=c_f-v(w),
\qquad
E(w)=\int_0^w m(u)\,du.
$$

For a label-2 emission at $s>0$ received by label 1 at $w>s$, the causal-root equation reduces to

$$
\boxed{
2c_f s=E(w)+E(s).
}
$$

On the exact straight trace, $E=0$, so no $s>0$ root exists. Its inactive margin is

$$
g(w,s)=2c_f s,
$$

whose infimum over $s>0$ is zero. Therefore the straight chart has no uniform inactive-gap neighborhood.

Plainly: every new partner front stays behind a receiver moving at $c_f$, but fronts emitted arbitrarily soon after coincidence are arbitrarily close to catching it. The ordinary regular-chart theorem requires a positive safety gap, and this chart has none.

## Candidate delayed-ignition branch

Fix an ignition time $u_*>0$. A candidate branch agrees with the straight trace through $u_*$ and has $m(w)>0$ for $w>u_*$. The root then detaches continuously from $s=0$. At onset,

$$
D_t=c_f+v(s)\longrightarrow2c_f,
\qquad
D_r=c_f-v(w)=m(w)>0,
$$

so the detached root is an isolated, positive-delay, ordinary partner root and sweeps new post-event source history. For opposite polarities its acceleration contribution is backward. The formal onset coefficient is

$$
A_0
=
\frac{K}{2c_f^3u_*^2},
$$

with local behavior

$$
m(w)=A_0(w-u_*)+o(w-u_*),
\qquad
E(w)=\frac{A_0}{2}(w-u_*)^2+o((w-u_*)^2).
$$

The independent reduced-system integration recorded in JKH3 reproduced this onset slope and continued one ordinary root monotonically after ignition. That is measured evidence for the reduced equations, not a full existence theorem.

Immediate sustained ignition at $u_*=0$ is excluded in the declared absolutely continuous class: the onset row scales as $w^{-2}$ and is not locally integrable. A sufficiently thin event-adjacent activation cascade has not yet been excluded.

Plainly: beginning the slowdown exactly at coincidence is too singular. Waiting a positive time removes that divergence, and the newly caught partner front then supplies acceleration in the same direction as the slowdown. The open question is whether that formal feedback loop is an exact solution of the full law.

## Required disposition

Exactly one of the following must be established:

1. **Existence.** Prove a Caratheodory solution through the ignition instant, prove the complete reduced root census, and embed the mirror-collinear solution in the full three-dimensional delayed system. The restart then defines a multivalued continuation relation unless another selection law is adopted.
2. **Exclusion.** Identify and prove the existing clause, estimate, or ledger contribution that prevents the branch. The exclusion must apply to a class containing the straight trace and cannot assume a positive inactive margin that this chart lacks.

A third option—postulating a positive activation floor—would select the straight trace locally, but it is new foundational data rather than a proof of either branch above. No such floor is adopted here.

## Acceptance checks

An existence result must provide:

- a precise function space and one-sided ignition trace;
- a complete all-channel root census before, at, and after ignition;
- local integrability of the complete post-sum ledger;
- proof that the owned event family is not re-billed;
- proof that the solution satisfies the speed-ceiling inclusion; and
- a full-system embedding, not only a sampled reduced integration.

An exclusion result must name its falsifier and show exactly where the formal onset expansion fails.

Closure goal: verify or refute the delayed-ignition family at full-system rigor, then state whether the exact-mirror restart is a single-valued local continuation or a multivalued relation requiring a new selection law.
