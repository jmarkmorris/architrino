# Independent rational meridional obstruction review

## Verdict and exact scope

**Derived and independently accepted without repair.** The [frozen rational meridional theorem](overnight2-b-rational-meridional-obstruction.md) correctly rules out finite nonzero poles of both meridional profiles and reduces them to Laurent polynomials. The accepted finite-Fourier theorem then leaves only the planar constant-radius circle. The conclusion applies to regular periodic normalized simultaneous limiting orbits with radius and height rational in $w=e^{i\phi}$, real and nonsingular on the unit circle, and radius strictly positive there. It imposes no finite-degree phase restriction.

The uniform compact slow-family consequence is expressly conditional on preservation of rational, nonsingular limiting profiles. That qualification is retained here; this review does not infer it for arbitrary rational representations. The scenario is the canonical equation with $K=c_f=1$. Complex poles are tests of mathematical identities, not physical trajectories. No physical conservation law, numerical orbit membership or specified positive-speed exclusion is introduced.

The subject SHA-256 measured by native `shasum -a 256` is `f21a997dfee418f8a71bb265006acef035e8cb022ffcfbbd5831f77c477e07c5`. It and all prior subjects/oracles remain read-only. This report reconstructs the pole orders and adds a separate branch-free radial identity as an independent check.

## Rational identities and local differentiation

Use a common phase $\phi=\Omega\chi$ with $\Omega>0$, and put
$$
Q_4=r^2+4z^2,\qquad Q_1=r^2+z^2.
$$
Both are nonzero rational functions because their real-circle values are strictly positive. A rational identity that holds on a real phase arc away from denominator zeros holds identically: clearing denominators gives a polynomial vanishing at infinitely many distinct points on that arc.

For $z\not\equiv0$, select an arc with $z\ne0$. The real axial equation implies
$$
L=-\Omega^2\frac{z_{\phi\phi}}z=\frac4{Q_4^{3/2}}+\frac1{4Q_1^{3/2}}.
$$
On this arc the square roots are positive. Squaring twice eliminates them and gives the necessary rational identity
$$
\left(L^2-\frac{16}{Q_4^3}-\frac1{16Q_1^3}\right)^2
=\frac4{Q_4^3Q_1^3}. \tag{1}
$$
No converse to this implication is needed. Additional solutions introduced by squaring cannot invalidate its use as a necessary condition. The rational identity principle extends (1) throughout its domain.

Fix a finite point $w=\alpha\ne0$, put $t=w-\alpha$, and let a rational function $f$ have a pole of order $p\ge1$, so $f=c t^{-p}(1+O(t))$ with $c\ne0$. The phase derivative operator is $\partial_\phi=iw\partial_w$, hence
$$
f_{\phi\phi}=-w^2f_{ww}-wf_w
=-\alpha^2p(p+1)c\,t^{-p-2}(1+O(t)),
$$
$$
\frac{f_{\phi\phi}}f=-\alpha^2p(p+1)t^{-2}(1+O(t)).
$$
The leading coefficient is nonzero. Thus the quotient has exactly a double pole, and its square has pole order four. This calculation requires $\alpha\ne0$; it is not asserted at zero or infinity. Those two points are deliberately left for the later Laurent reduction.

## Exhaustive exclusion of finite nonzero height poles

Suppose $z$ has a pole of order $p\ge1$ at $\alpha$. Since
$$
Q_4-Q_1=3z^2
$$
has a pole of order $2p$, the two radicands cannot both be regular there. In particular they cannot both vanish. Neither radicand can be identically zero. Their local integer orders therefore fall into the following exhaustive alternatives.

If neither radicand has a zero at $\alpha$, each is either nonzero regular or has a pole. Both inverse cubes in (1) are consequently bounded. The square $L^2$ has pole order four, so the left side of (1) has pole order eight and the right side is bounded. This is impossible, regardless of any cancellation between leading pole terms of the radicands themselves.

If one radicand has a zero of order $k\ge1$, the other has a pole of exactly order $2p$, by the displayed difference. The inverse cube of the zero radicand has pole order $3k$, and the inverse cube of the pole radicand has zero order $6p$. Inside the squared expression in (1), the singular orders are four from $L^2$ and $3k$ from one inverse cube. Since $3k=4$ has no integer solution, these leading terms cannot cancel. The left side thus has pole order $2\max(4,3k)$.

The right side has signed pole order $3k-6p$, meaning that a negative value is a zero order and zero is a nonzero regular order. It cannot match the left side because
$$
2\max(4,3k)>3k-6p.
$$
Both possibilities for which radicand vanishes give the same conclusion; their different nonzero numerical prefactors do not change an order. This rules out every finite nonzero pole of $z$. If $z\equiv0$, regularity of height at all such points is immediate and no division by $z$ is used.

## Radius-pole contradiction and audit of continuation

Now $z$ is regular at every finite nonzero point. If $r$ has a pole of order $p$ at such a point, each $Q_j$ has a pole of order $2p$ with leading term equal to $r^2$. The regular $z^2$ term cannot cancel it. In the limiting radial equation
$$
\Omega^2r_{\phi\phi}=\frac{\ell^2}{r^3}+\frac1{\sqrt3r^2}
-\frac r{Q_4^{3/2}}-\frac r{4Q_1^{3/2}},
$$
the left side has pole order $p+2$. On any continued local square-root branch, $|Q_j^{1/2}|=|Q_j|^{1/2}$ grows like $|t|^{-p}$. The square-root terms therefore vanish in magnitude like $|t|^{2p}$, as does $1/r^2$; $\ell^2/r^3$ vanishes at least like $|t|^{3p}$ or is identically zero. The right side tends to zero, contradicting the left side.

The subject's continuation justification is valid. Start on a nonsingular real arc with positive square roots, and avoid the finite zeros and poles of the relevant nonzero rational functions along a path to a punctured sector at $\alpha$. Each nonvanishing radicand has square-root germs that continue along that path, and the original germ identity continues with them. The sector permits local branches even though a global square root need not exist. Branch signs cannot change the magnitude estimates. In the identically planar case no path avoiding zeros of the identically zero height is needed; only the nonzero functions occurring in denominators matter. Thus the continuation does not tacitly exclude that case.

There is also an independent rational check of this entire radius step. Rearrange the real radial equation and divide by $r>0$ on the circle:
$$
Y=\frac{\ell^2}{r^4}+\frac1{\sqrt3r^3}-\Omega^2\frac{r_{\phi\phi}}r
=\frac1{Q_4^{3/2}}+\frac1{4Q_1^{3/2}}.
$$
Squaring twice gives the necessary rational identity
$$
\left(Y^2-\frac1{Q_4^3}-\frac1{16Q_1^3}\right)^2
=\frac1{4Q_4^3Q_1^3}. \tag{2}
$$
At a radius pole of order $p$, the first two terms defining $Y$ vanish, while its final term has exactly pole order two. Therefore $Y^2$ has pole order four. Each inverse radicand cube has zero order $6p$, so the left side of (2) has pole order eight and its right side has zero order $12p$. They cannot agree. This confirms the exclusion without square-root continuation and works also when $z\equiv0$ or $\ell=0$.

## Zero, infinity and reduction to the finite-Fourier theorem

The preceding argument excludes precisely finite nonzero poles. It neither assumes nor proves that there are no poles at zero or infinity. For a rational function with only those possible poles, choose a nonnegative integer $N$ large enough that $w^Nf(w)$ has no pole at zero. It has no finite poles anywhere. In a reduced polynomial numerator/denominator representation, a nonconstant denominator would have a finite complex root and hence a pole. Its denominator is therefore constant, so $w^Nf(w)$ is polynomial and $f$ is Laurent polynomial.

Apply this argument to both $r$ and $z$. Reality on the unit circle makes their Laurent coefficients conjugate-symmetric, hence gives real finite trigonometric polynomials. The [independently accepted finite meridional theorem](overnight2-b-independent-finite-meridional-fourier.md) applies exactly: positive radius excludes a nonconstant positive constant-sum-of-squares pair; its rational axial identity rules out nonconstant height at infinity; constant height is zero by the real axial equation; and the planar radial polynomial identity rules out nonconstant radius. Thus
$$
z=0,\qquad r=r_0>0,\qquad
\ell^2=\left(\frac54-\frac1{\sqrt3}\right)r_0.
$$
In particular $\ell\ne0$ and the angular motion is a constant-rate circle. A nonzero constant height is impossible even before Laurent reduction because the real axial bracket is strictly positive. There is no missed constant case or zero-angular-constant rational orbit. The conclusion is about the simultaneous limiting equation and does not make that circle an exact causal-delay solution.

## Conditional compact-family corollary

The usual compact exact-family hypotheses still supply a subsequential regular $C^2$ limiting orbit, finite positive scale limit and positive limiting angular constant. To apply the rational theorem to that subsequence, one additionally needs its radius and height to remain rational and nonsingular on the unit circle. This is a closure condition on the proposed rational family, not a consequence asserted here merely from the word “rational.”

One sufficient setup is a fixed finite-dimensional polynomial numerator/denominator representation whose coefficient vectors lie in a compact set and whose denominator magnitudes have a common positive lower bound on the unit circle. After coefficient subsequence extraction, the limiting denominators remain nonzero on that circle and the limiting functions are rational there. Any common-factor cancellation only simplifies their representation. Together with the common positive radius floor and $C^2$ profile/rate hypotheses, this supplies the required rational limiting pair. No unrestricted theorem about arbitrary degree growth or uncontrolled denominator degeneration is inferred.

For a class satisfying such closure, any exact sequence with $\epsilon\to0$ would have a limiting circle by this theorem. Positive mean rotation forces $\ell>0$, while its necessary leading torque mean is
$$
M_\chi=\frac{19\ell}{12r_0^2}>0,
$$
contrary to the independently required zero. Hence no such sequence exists. If rational-limit closure is ensured throughout the declared compact class, the usual sequence contradiction gives one uniform existential $\epsilon_0>0$ excluding exact members for $0<\epsilon<\epsilon_0$ at every $R>0$. No value for that threshold is established. Without the closure hypothesis, the limiting profiles could lie outside the theorem, so the uniform corollary has not been proved for that broader class.

A rational approximation to a nonrational limiting function is not an exact counterexample. Conversely, merely introducing rational denominators does not evade the theorem if the exact meridional profiles and their compact limit remain in the rational nonsingular class. These distinctions preserve the subject's conditional formulation.

## Falsifiers, validation and preservation

Operator-checkable falsifiers include an error in either twice-squared rational identity; a different local order of $f_{\phi\phi}/f$ at a finite nonzero pole; a missing radicand order case; cancellation of the unequal pole orders four and $3k$; failure of the radius-pole identity (2); or a rational function with only possible poles at zero and infinity that is not Laurent polynomial. A regular nonplanar normalized limiting orbit with rational, real nonsingular meridional profiles and positive radius would directly falsify the final theorem. Loss of rational-limit closure would invalidate the corresponding uniform-family application, not the single-orbit theorem.

Algebraic profiles with noninteger local exponents, nonrational smooth profiles, real-phase singularities, or arbitrary finite-speed causal-delay paths change the hypotheses. No imported physical law, stability result, numerical candidate membership or specified positive-speed threshold is claimed.

The evidence is the analytical reconstruction in this new report. No numerical target, new arithmetic instrument, runtime receipt or empirical resource estimate was needed. This is the only reviewer-authored deliverable. The frozen subject, prior proofs/oracles and receipts, parent report and shared owners were not edited. No recursive agent, production run, regular tests, generator or Git mutation was used. No evidence was deleted, moved or replaced, and no replay or remote-backup claim is made. Parent integration remains the receiving disposition step.

Final scoped verification: native `shasum -a 256` reproduced the frozen subject identity above after the review. Native `git diff --no-index --check /dev/null` emitted no whitespace diagnostics for this report; exit one denotes the new-file difference. Both rational identities, all local pole orders, the separate treatment of zero/infinity and the conditional compact-family implication were checked analytically as displayed. These checks support the theorem and source formatting; they certify no numerical proposal or implementation.
