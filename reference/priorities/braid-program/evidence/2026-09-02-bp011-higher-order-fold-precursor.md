# BP-011 Higher-Order Fold Precursor

Status: exact first unclaimed fold coefficient derived; balance coefficient and uniform remainder open

## Scope

This packet advances the higher-order equal-radius regular-phase ladder asymptotics with normalized wake speed $c_f=1$. It derives the next exact term in the odd-fold location that underlies each accepted balance. It does not claim the same coefficient for the balance speed, because the balance-to-fold displacement has its own higher-order old-background and newborn-pair corrections.

## Exact odd-fold expansion

For odd fold $q=2n-1$, put

$$
A_n=\frac{\pi(n+1)}3,
\qquad
\xi_q=\frac\pi2-\epsilon_q.
$$

The exact fold equation becomes

$$
\cot\epsilon_q+\epsilon_q=A_n.
$$

With $t=A_n^{-1}$, direct series reversion gives

$$
\epsilon_q
=t+\frac23t^3+\frac{13}{15}t^5+\frac{146}{105}t^7+O(t^9).
$$

Substitution into $\beta_q=\csc\epsilon_q$ yields

$$
\boxed{
\beta_q
=A_n-\frac1{2A_n}-\frac7{24A_n^3}-\frac{83}{240A_n^5}
+O(A_n^{-7})
}.
$$

The $-83/240$ coefficient is the first exact coefficient beyond the fold expansion used in the accepted leading balance law. The symbolic checker [check_braid_fold_series.py](../../../../scripts/equation-mapping/check_braid_fold_series.py) verifies the reversion identity and substitution through this order.

Plainly: the left boundary of every high ladder cell now has one more exact term. The balance sits slightly to the right of that boundary, so its next coefficient cannot be copied from the fold.

## Why this does not yet determine $\beta_n$

The accepted leading displacement is

$$
\beta_n-\beta_q=\frac1{18\beta_q^3}+o(\beta_q^{-3}).
$$

To promote the fold coefficient into the $A_n^{-5}$ coefficient of $\beta_n$, one must expand both the old tangential background and the newborn pair two relative orders further, uniformly over the level lattice. For fixed level $X$, the exact shifted-endpoint pair has the formal expansion

$$
D_\beta(X)
=-\frac1{2X^2}+\frac1{12\beta^2}+O_X(\beta^{-4}).
$$

The $\beta^{-2}$ coefficient is independent of $X$. Therefore termwise summation over a growing alternating lattice is not justified by this fixed-$X$ expansion: the cutoff parity and the fold boundary layer must be retained before taking the limit. This is a derived nonuniformity obstruction to reading the next balance coefficient from a finite collection of endpoint expansions.

The accepted 100-row source record at local analytical path `.local-data/braid-analysis/b13-velocity-search/2026-08-29-b13-equal-radius-100-point-arbitrary-precision.v1.json`, SHA-256 `cd2745bffbe792e7d8030d6382ee7f6b76d3f7670d3292559567c46217c70c6b`, provides only a measured diagnostic. On T200, with fold speed $\beta_q=105.76222504977166\ldots$, the scaled residual

$$
\beta_q^5\left[
(\beta_n-\beta_q)-\frac1{18\beta_q^3}
\right]
\approx-0.0597825
$$

has not stabilized across the finite table. A separate exploratory evaluation at $q=399$ with the frozen local point oracle SHA-256 `f6d592b5682c8e8e5001504d6201b9caa5eef8994cecddb948a86844d1b7f4a3` gives approximately $-0.1509725$. These values warn against assigning a constant $A_n^{-5}$ balance coefficient, but finite measurements cannot prove a logarithmic term or falsify eventual convergence.

Plainly: the next cell-boundary coefficient is exact, while the next balance coefficient remains coupled to a nonuniform alternating sum. The finite numbers are a warning, not a theorem.

## Boundary, blocker, and falsifier

Derived: the displayed fold expansion and the fixed-level $D_\beta$ expansion. Measured: the two scaled balance-offset diagnostics. Open: a uniform Euler--Boole or matched fold-boundary expansion for the complete old background, the corresponding newborn expansion, the next coefficient of $\beta_n$, the induced spacing term, and the compatible-radius correction.

The fold result is falsified by a symbolic residual below order $A_n^{-7}$ or an independently enclosed fold that violates the displayed remainder order. Any proposed balance coefficient is falsified by a uniform derivation producing a different coefficient or a logarithmic/parity term, or by independently certified high-topology cells violating its declared remainder bound.

Closure goal: derive the complete old-background and newborn-pair expansions through the first order that survives in $\beta_n-\beta_q$, with the growing lattice and fold boundary layer controlled uniformly.
