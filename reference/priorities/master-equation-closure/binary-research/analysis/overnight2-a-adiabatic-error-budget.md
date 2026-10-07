# Conditional integrated bounds for the corrected canonical account

**Subject arithmetic and analytical method, pending independent assessment.** The [formal account](overnight2-a-canonical-adiabatic-account.md) needs bounds on its retained derivative, its sensitivity to actual response errors, and the associated orientation and phase terms. This note records the common conditional domain and known-first calculation. It does not include the original release interval or claim an entry sign.

Work on the already admitted nominal negative-account branch, after the six-generation source condition. Its accepted angular bound and corrected-seed estimate supply the conservative domain

$$
.999\le h\le5000,\qquad |e|\le6\epsilon h,
\qquad h_\theta\ge.98\epsilon,
\qquad 0.00033356410<\epsilon<0.00033356411.
\tag{1}
$$

The upper $h$ bound is weaker than the existing $H<6$ after $H=4\epsilon h$. The bound on $e/h$ follows by undoing the accepted corrected-vector transformation, whose norm is below $3.2\epsilon$, and including its two explicit corrections. It is used as a conservative simultaneous bound, not a changed preparation.

Put $x=Q-1,y=P$. If a derivative term is $c\epsilon^j h^k x^a y^b$, its absolute integral is at most

$$
\frac{|c|6^{a+b}\epsilon_+^{j+a+b-1}}{.98}
\int_{.999}^{5000}h^{k+a+b}\,dh,
\qquad \epsilon_+=0.00033356411,
\tag{2}
$$

when $j+a+b-1\ge0$. Integer-power integrals are rational. For exponent $-1$, use $\log(5000/.999)<9$, proved by the positive exponential series through degree twenty: $\sum_{k=0}^{20}9^k/k!>5000/.999$. Coefficient absolute values in the shifted variables supply a rigorous polynomial majorant; no numerical quadrature is involved.

For $J=\sum_{j=0}^6\alpha^jJ_j$, the actual response error contributes exactly

$$
\mathcal I_{6,\theta}\big|_{\delta a,\delta b}
=h^{-2}\left[J_P\delta a+\frac{G}{Q}\delta b\right],
\qquad G=PJ_P+2QJ_Q-2J-\alpha J_\alpha.
\tag{3}
$$

The polynomial part of the accepted spatial response error has $|\delta a|\le9\times10^{13}\alpha^8$ and $|\delta b|\le2.2\times10^{12}Q\alpha^8$. The $Q$ in the second allowance cancels its denominator in (3). Its separate $2\nu$ isotropic component does not cancel $Q$ and is excluded from the first arithmetic target; it needs a finite-radius budget of its own.

For orientation, write the accepted corrected vector in the instantaneous planar basis as $z=h^{-1}(Z_n n+Z_t t)$, where

$$
Z_n=Q-1+\frac52\alpha^2+\frac\alpha2(-P+2\alpha),
\qquad
Z_t=-P+2\alpha+\frac\alpha2(Q-1+\tfrac52\alpha^2).
$$

Its exact derivative under the finite response polynomial is formed by the chain rule, including the rotation $n_\theta=t,t_\theta=-n$ and the derivatives of $h^{-1}$ and $\alpha$. The coefficients at orders zero and one vanish, and the constant order-two coefficient at $P=0,Q=1$ vanishes as fixed analytical controls. Remaining polynomial terms are integrated using (2). The actual-row contribution to this vector and the conversion of a vector variation to an angle remain separate obligations.

The phase relation $\Theta_2$ from the method is differentiated directly. Its coefficients at orders zero, one and two cancel. Its remaining polynomial terms are likewise integrated using (2). This is a bound on the phase relation's drift, not on the full orbit phase until the account and literal starting value have both been controlled.

**Known-first receipt, 06:37:15 UTC.** The [exact majorant instrument](../evidence/overnight2-a-adiabatic-bounds.py), SHA-256 `a0b96c42349c3621c93edada3dfe08ad6ea8f7c13dc60690a21d5596c9157cbd`, passed constant and inverse-square integrals, the logarithmic bound via the exponential series, a fixed signed-polynomial majorant and the central account. It reuses the frozen root account producer as subject machinery; this is not independence. Receipt `.local-data/master-equation-closure/overnight2-a/adiabatic-bounds-known.json` is retained; supervisor lease `d30253c0-c9dd-459d-88d9-82a517f4c5f2` closed. The target is bounded by the same 90-second internal, 120-second outer, 512 MiB and 1 MiB limits. It will retain exact rational totals as well as diagnostic decimal renderings.

The first target excludes the complete release, separate nonmirror forcing, actual-row contribution to orientation/phase, independent coefficient acceptance and rigorous literal-token enclosures. Falsifiers include an incorrect shifted polynomial, exponent or integral in (2), omitted chain-rule terms in (3), or a domain outside (1). The [main A report](overnight2-a-followup-and-research-2026-10-07.md) owns independent review and integration.

**Target receipt, 06:38:31 UTC.** The exact subject majorants returned the following rationally established upper bounds: account-polynomial residual $3.33\times10^{-21}$; account error from the accepted polynomial response allowance $2.802\times10^{-14}$; corrected-vector polynomial total variation $3.329\times10^{-6}$; phase-relation polynomial total variation $1.299\times10^{-9}$. The receipt retains the unrounded exact rational values and all individual order contributions. These bounds follow from the explicitly conditional domain (1); the listed excluded contributions remain excluded. Supervisor lease `ee872af3-bc3e-49d0-bd10-c90fc4823493` closed successfully, with 1.089 seconds supervisor wall time. The instrument measured 0.8906 seconds and 67,977,216 bytes peak resident memory. Original receipt `.local-data/master-equation-closure/overnight2-a/adiabatic-bounds-target.json` and matching progress log are retained. Independent mathematical and arithmetic assessment remains pending.
