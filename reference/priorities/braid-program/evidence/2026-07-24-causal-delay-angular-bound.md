# Causal-Delay Angular Approximation Bound and Independent Audit

Status: DERIVED BOUND; INDEPENDENT PRESCRIBED-PATH CHECK PASS; EVOLVED-BRANCH TEST NOT YET REACHABLE (2026-07-24).

## Claim and Scope

This packet separates two approximations that had previously been grouped together:

1. the finite enclosing sphere approaching the compact-source far field; and
2. the exact direction-dependent emission time being replaced by its first position-acceleration correction.

The bounds below are derived in normalized units $c_f=1$. The numerical audit is measured by the independently implemented [`independent-causal-delay-bound-audit.mjs`](../../../../scripts/prescribed-path-analysis/independent-causal-delay-bound-audit.mjs). The result applies to the active prescribed two-component circular paths only. No path was evolved, and no binding, stability, energy, retention, shielding, particle-identity, or physical-realization claim follows.

## Exact Setup

Let source $s$ have signed polarity $q_s$ and a $C^3$ prescribed path $\mathbf x_s(t)$. Assume throughout the retained root interval that

$$
\|\mathbf x_s\|\le a<R,
\qquad
\|\mathbf v_s\|\le \nu<1,
\qquad
\|\mathbf a_s\|\le A_*,
\qquad
\|\mathbf j_s\|\le J_*,
$$

and define $q_*=\sum_s|q_s|$. For a receiver at $R\hat{\mathbf n}$ and reception time $T_r=T_0+R$, write the finite-radius emission time as $T_{t,s}=T_0+\delta_{R,s}$. It obeys

$$
\delta_{R,s}
=
R-
\left\|
R\hat{\mathbf n}
-
\mathbf x_s(T_0+\delta_{R,s})
\right\|.
$$

The far-root delay $\delta_{\infty,s}$ is the unique fixed point

$$
\delta_{\infty,s}
=
\hat{\mathbf n}\mathbin{\cdot}
\mathbf x_s(T_0+\delta_{\infty,s}).
$$

Sub-field speed makes the far-root map a contraction and makes both transmitter factors positive.

For unit coupling and positive unit virtual-probe polarity, let $F_R=R^2a_r$ be the exact rescaled signed radial acceleration pattern. Let

$$
H(\hat{\mathbf n},T_0)
=
\sum_s
\frac{q_s}{
1-\hat{\mathbf n}\mathbin{\cdot}
\mathbf v_s(T_0+\delta_{\infty,s})
}
$$

be the exact compact-source far pattern.

## Theorem 1 — Finite-Radius Bound

Define

$$
d_R
=
\frac{a^2}{
2(R-a)(1-\nu)
},
\qquad
h_R
=
\frac{2a}{R-a},
\qquad
\Lambda_R
=
\left(\frac{R}{R-a}\right)^2,
$$

and

$$
g_R
=
(\Lambda_R-1)+\Lambda_Rh_R.
$$

Then

$$
\left|
\delta_{R,s}-\delta_{\infty,s}
\right|
\le d_R
$$

and

$$
\left|
F_R-H
\right|
\le
E_R
\equiv
q_*
\left[
\frac{g_R}{1-\nu}
+
\frac{A_*d_R+\nu h_R}{(1-\nu)^2}
\right].
$$

### Proof

For any admissible delay,

$$
\left|
R-
\left\|R\hat{\mathbf n}-\mathbf x\right\|
-
\hat{\mathbf n}\mathbin{\cdot}\mathbf x
\right|
\le
\frac{a^2}{2(R-a)}.
$$

The finite and far delay maps are both $\nu$-Lipschitz, so the standard contraction perturbation inequality supplies the factor $(1-\nu)^{-1}$ and gives $d_R$.

Let $\mathbf N_R$ be the unit vector from the transmitter to the receiver. The elementary bounds

$$
\left\|\mathbf N_R-\hat{\mathbf n}\right\|
\le h_R,
\qquad
\frac{R^2}{r_R^2}\le\Lambda_R,
$$

give

$$
\left|
\frac{R^2}{r_R^2}
\hat{\mathbf n}\mathbin{\cdot}\mathbf N_R
-1
\right|
\le g_R.
$$

The velocity change between the two roots is at most $A_*d_R$. Applying

$$
\left|
\frac{1}{1-z_1}-\frac{1}{1-z_2}
\right|
\le
\frac{|z_1-z_2|}{(1-\nu)^2}
$$

to the transmitter factors and summing absolute-polarity contributions proves the field bound.

## Theorem 2 — First Causal-Delay Correction

At the common time $T_0$, define

$$
L(\hat{\mathbf n},T_0)
=
\sum_s q_s
\left[
1
+
\hat{\mathbf n}\mathbin{\cdot}\mathbf v_s
+
\left(
\hat{\mathbf n}\mathbin{\cdot}\mathbf x_s
\right)
\left(
\hat{\mathbf n}\mathbin{\cdot}\mathbf a_s
\right)
\right].
$$

Then

$$
\left|H-L\right|
\le
E_D
\equiv
q_*
\left[
\frac{\nu^2}{1-\nu}
+
A_*\nu a
+
\frac{J_*a^2}{2}
\right].
$$

Consequently,

$$
\left|F_R-L\right|
\le E_R+E_D.
$$

### Proof

For $z_s=\hat{\mathbf n}\mathbin{\cdot}\mathbf v_s(T_0+\delta_{\infty,s})$,

$$
\frac{1}{1-z_s}
=
1+z_s+\frac{z_s^2}{1-z_s},
\qquad
\left|
\frac{z_s^2}{1-z_s}
\right|
\le
\frac{\nu^2}{1-\nu}.
$$

Taylor expansion of the velocity gives

$$
\left\|
\mathbf v_s(T_0+\delta_{\infty,s})
-
\mathbf v_s(T_0)
-
\mathbf a_s(T_0)\delta_{\infty,s}
\right\|
\le
\frac{J_*a^2}{2}.
$$

The far-root identity and the speed bound give

$$
\left|
\delta_{\infty,s}
-
\hat{\mathbf n}\mathbin{\cdot}\mathbf x_s(T_0)
\right|
\le
\nu a.
$$

Multiplication by the acceleration bound, addition of the transmitter-factor remainder, and summation over $|q_s|$ prove $E_D$.

## Harmonic Corollary

For a neutral source, $\sum_sq_s=0$. Define

$$
\mathbf U
=
\sum_sq_s\mathbf v_s,
\qquad
\mathbf S
=
\operatorname{STF}
\sum_sq_s\,
\operatorname{sym}
\left(
\mathbf x_s\otimes\mathbf a_s
\right).
$$

The degree-$1$ and degree-$2$ pieces of $L$ are exactly

$$
L_1
=
\hat{\mathbf n}\mathbin{\cdot}\mathbf U,
\qquad
L_2
=
\hat{\mathbf n}^{\mathsf T}
\mathbf S
\hat{\mathbf n}.
$$

The sphere identities

$$
\int_{\mathbb S^2}n_in_j\,d\Omega
=
\frac{4\pi}{3}\delta_{ij}
$$

and

$$
\int_{\mathbb S^2}n_in_jn_kn_l\,d\Omega
=
\frac{4\pi}{15}
\left(
\delta_{ij}\delta_{kl}
+
\delta_{ik}\delta_{jl}
+
\delta_{il}\delta_{jk}
\right)
$$

therefore give

$$
P_1(L)
=
\frac{4\pi}{3}
\left\langle
\|\mathbf U\|^2
\right\rangle,
\qquad
P_2(L)
=
\frac{8\pi}{15}
\left\langle
\|\mathbf S\|_{\mathrm F}^2
\right\rangle,
$$

and hence

$$
\frac{P_2(L)}{P_1(L)}
=
\frac{2}{5}
\frac{
\left\langle
\|\mathbf S\|_{\mathrm F}^2
\right\rangle
}{
\left\langle
\|\mathbf U\|^2
\right\rangle
}.
$$

The coefficient $2/5$ is thus exact for $L$, rather than a fitted coefficient.

If $e=\sqrt{4\pi\langle(E_R+E_D)^2\rangle}$, orthogonal projection gives

$$
\left|
\sqrt{P_\ell(F_R)}
-
\sqrt{P_\ell(L)}
\right|
\le e.
$$

When $\sqrt{P_1(L)}>e$, a rigorous ratio enclosure is

$$
\left(
\frac{
\max\{0,\sqrt{P_2(L)}-e\}
}{
\sqrt{P_1(L)}+e
}
\right)^2
\le
\frac{P_2(F_R)}{P_1(F_R)}
\le
\left(
\frac{
\sqrt{P_2(L)}+e
}{
\sqrt{P_1(L)}-e
}
\right)^2.
$$

## Independent Numerical Audit

The audit instrument independently implements the circular histories, finite and far causal roots, exact radial acceleration rows, Gauss-Legendre sphere quadrature, and degree-$1$ and degree-$2$ tensor projections. It does not import the prescribed wake evaluator, causal-root solver, angular reducer, or prior attribution instrument.

The active $c_f=1$ two-component circular cohort produced:

- $197$ cases and $1{,}361{,}664$ independently evaluated time-direction samples;
- $197/197$ passes for the root, finite-radius, delay-linearization, and combined bounds;
- maximum observed-to-bound ratios $0.5625$ for the root bound, $0.0353$ for the finite-radius field bound, $0.0595$ for the delay-linearization bound, and $0.0272$ for the combined bound;
- maximum relative difference $2.06\times10^{-12}$ between the independent and primary finite-radius $\ell=2/\ell=1$ ratios;
- maximum quadrature-versus-closed-form relative differences $1.43\times10^{-15}$ for $\ell=1$ and $3.05\times10^{-15}$ for $\ell=2$.

The independent exact ratio and the $2/5$ approximation remain strongly related:

| Cohort | Count | Log Pearson correlation | Log-fit slope | Effective coefficient against $\langle\|\mathbf S\|^2\rangle/\langle\|\mathbf U\|^2\rangle$ | Median relative ratio error | Maximum relative ratio error |
|---|---:|---:|---:|---:|---:|---:|
| two-component circular configurations | 197 | $0.99464$ | $1.00668$ | $0.44401$ | $0.1273$ | $0.4162$ |
| C4 | 33 | $0.98930$ | $0.95599$ | $0.43084$ | $0.1419$ | $0.2939$ |

These are prescribed-path measurements. The independently recovered primary ratios establish implementation agreement; the closed-form identities establish the $2/5$ rule for $L$.

## What the Bound Changes

Increasing $R$ suppresses $E_R$, but it does not suppress $E_D$. The active two-component circular cohort has median $\nu=0.543$ and maximum $\nu=0.910$. Its rigorous delay-linearization bound is therefore conservative: relative to the approximation's sampled root-mean-square amplitude, its minimum is $4.07$, median $35.43$, and maximum $271.25$. The resulting theorem-level ratio intervals are vacuous for these draws.

The correct disposition is therefore:

1. the compact-source far limit is controlled;
2. the $2/5$ coefficient is proved exactly for the first causal-delay approximation;
3. an independent implementation reproduces the exact prescribed ratios and confirms that the approximation is a strong predictor;
4. the current worst-case bound does not certify that approximation for any individual active two-component circular draw.

The two-component circular relationship remains a measured prescribed-path regularity with a derived mechanism, not a uniformly error-certified coefficient law for the current speed range.

## EOM-Branch Audit

A live search of `.local-data`, `reference/priorities/braid-program/campaigns`, `reference/priorities/braid-program/evidence`, and the EOM priority records found no legitimate EOM-evolved two-component circular or C4 branch.

The current C1 through C6 records are `chart-hypothesis` / `display-only` prescribed geometry. Campaign 1 is specified and construction-tested but explicitly has no production fate result; it concerns the two-architrino sub-field rung, not two-component circular configurations. The Braid Program method places twelve-architrino evolution after the binary, four-architrino, and six-architrino rungs and requires declared prehistories, root clearance, collapse, refinement, and an independent oracle.

An ad hoc evolution of the prescribed C4 coordinates would therefore not be the “first legitimate EOM-evolved two-component circular branch” and cannot test survival of the position-acceleration relationship.

When an eligible branch exists, the test must use that branch's retained positions, velocities, and acceleration rows to compute $\mathbf U$, $\mathbf S$, the exact exterior degree powers, and the bound terms on the same claim window. It must preserve branch identity across a radius ladder and all collapse/refinement members. A relation seen only in the seed or in one prehistory does not survive the test.

## Artifact and Falsifiers

The local result artifact is:

`./.local-data/braid-analysis/compact-monte-carlo/family-sweep-v1/independent-causal-delay-bound-audit-v1.json`

Its canonical result hash is:

`fdc0307a551d49b23b9280fe50322a376a6c7e3ea3719c6d7ea9a0599628d675`

Reproduce the audit from the repository root with:

```bash
node scripts/prescribed-path-analysis/independent-causal-delay-bound-audit.mjs
```

Reject the theorem if any displayed inequality fails under its hypotheses. Reject the independent audit if its canonical hash fails, if its exact checks fail, or if an independently sampled difference exceeds its declared bound. Reject evolved survival if an eligible EOM-evolved two-component circular branch fails the same-row relation after root clearance, collapse, and refinement.
