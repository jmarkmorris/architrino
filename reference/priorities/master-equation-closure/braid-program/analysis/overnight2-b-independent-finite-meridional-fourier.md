# Independent finite meridional Fourier obstruction review

## Verdict and exact scope

**Derived and independently accepted without repair.** In the canonical normalized simultaneous limiting equation, a regular periodic radial/axial orbit with positive radius and real finite trigonometric-polynomial radius and height must be the planar constant-radius circle. No finite-degree phase assumption is required. The subject's Laurent-unit lemma and complex continuation argument are valid. An additional independent rational-identity proof below removes the square-root branch choices entirely and confirms the axial obstruction.

The [frozen subject](overnight2-b-finite-meridional-fourier.md) SHA-256 measured by native `shasum -a 256` is `95d12273d48657a8683d1392962c84c74092b7d93e93e59b98c46ec8e24e8c41`, matching the assigned identity. Its conclusions concern $K=c_f=1$, the already reconstructed simultaneous limiting equation and its necessary means. The mathematical proof does not invoke a physical energy premise or the reviewer role as authority. The uniform compact slow-family corollary is accepted under its stated common bounds and fixed radius/height degree limits. No numerical speed threshold or membership of a finite-speed proposal is established.

## Laurent representation and the constant-radicand lemma

Choose a common real phase $\phi=\Omega\chi$ with fixed $\Omega>0$ for the periodic limiting functions. Their finite expansions become Laurent polynomials under $w=e^{i\phi}$. Reality on the unit circle gives $r_{-j}=\overline{r_j}$ and $z_{-j}=\overline{z_j}$. A nonconstant real finite trigonometric polynomial consequently has both a nonzero positive highest degree and its negative counterpart. This remains true for each real radicand $r^2+cz^2$ if it is nonconstant; cancellation may lower its degree but cannot leave a nonconstant Laurent polynomial with only negative degrees while preserving reality.

Fix any real $c>0$. If $r^2+cz^2=C$ on the real phase circle, then it is also an identity of Laurent polynomials. The radius assumption gives $C>0$. Put
$$
f=r+i\sqrt c\,z,\qquad g=r-i\sqrt c\,z,
\qquad fg=C.
$$
Neither factor is zero. If their extreme exponents are $a\le A$ and $b\le B$, the product has nonzero extreme coefficients at $a+b$ and $A+B$. Each is unique at its corresponding extreme, so cancellation cannot remove it. Constancy implies $a+b=A+B=0$, hence $(A-a)+(B-b)=0$. Both widths are nonnegative, so both vanish. Thus
$$
f=\alpha w^j,\qquad g=\gamma w^{-j},\qquad \alpha\gamma=C.
$$
On the unit circle $g=\overline f$, giving $\gamma=\overline\alpha$. Therefore $r(\phi)=\operatorname{Re}(\alpha e^{ij\phi})$. For nonzero integer $j$, this has zero phase mean and takes both signs, contradicting $r>0$ everywhere. Hence $j=0$, and both $r$ and $z$ are constant. The argument includes arbitrary nonzero complex leading coefficients and uses positive radius essentially.

It follows that a nonconstant pair $(r,z)$ with positive radius makes both
$$
Q_4=r^2+4z^2,\qquad Q_1=r^2+z^2
$$
nonconstant. Each then has a positive highest Laurent degree $d_4,d_1\ge1$. They are strictly positive on the real phase circle, so neither has a zero there, although each may have finitely many complex zeros elsewhere.

## Audit of the analytic continuation proof

Assume $z$ is nonconstant with highest positive degree $n\ge1$. Select a point on the unit circle where $z\ne0$; such points exist, and its excluded zeros are finite. Each positive radicand there has a locally holomorphic square root chosen to agree with its positive real value. On a small phase arc, the real axial equation agrees with these branches. The holomorphic identity theorem therefore makes it an identity of germs in $w$, with phase differentiation represented by
$$
\partial_\phi=iw\partial_w,\qquad
\partial_\phi^2=-(w\partial_w)^2.
$$
There is no need for a global logarithm defining $\phi$ to use this operator on Laurent polynomials.

Remove $w=0$ and all zeros of $z,Q_1,Q_4$. This removes only finitely many points, since none of these Laurent polynomials is identically zero. The remaining plane is path-connected. A path from the initial point to an exterior sector can avoid these points. Square-root germs continue along that path because their radicands stay nonzero. Beyond a circle containing every finite zero, choose a simply connected thin sector about an unbounded ray; the two square roots are holomorphic there after continuation. Their signs may depend on the path, but the continued equation remains an identity because both sides were continued along the same path.

At complex infinity on this sector,
$$
z(w)=z_nw^n(1+O(w^{-1})),\quad Q_j(w)=q_jw^{d_j}(1+O(w^{-1})),\qquad z_nq_j\ne0.
$$
Consequently $z_{\phi\phi}/z\to-n^2$. Any continued square root $S_j$ satisfies $S_j^2=Q_j$, so $|S_j|=|Q_j|^{1/2}$ independently of branch. Thus the magnitude of $S_j^{-3}$ decays as $|w|^{-3d_j/2}$. This remains valid for odd $d_j$ because the sector supplies a branch; an integer power is not required. Dividing the continued axial identity by $z$ now gives a nonzero limit $-\Omega^2n^2$ on the left and zero on the right, a contradiction.

The subject's continuation is therefore legitimate. It does not assume that positive square roots can be continued as globally single-valued functions on the punctured plane, nor that complex leading coefficients have a preferred real sign.

## Independent elimination of the square roots

There is a second proof of the consequential axial contradiction that requires no branch continuation. On a real phase arc with $z\ne0$, define the rational Laurent function
$$
L(w)=-\Omega^2\frac{z_{\phi\phi}(w)}{z(w)}.
$$
The axial equation says, on that arc,
$$
L=\frac4{Q_4^{3/2}}+\frac1{4Q_1^{3/2}}=A+B,
$$
where the real positive square roots are used. Since $A^2=16/Q_4^3$ and $B^2=1/(16Q_1^3)$, squaring twice gives the necessary identity
$$
\left(L^2-\frac{16}{Q_4^3}-\frac1{16Q_1^3}\right)^2
=\frac4{Q_4^3Q_1^3}.
$$
Both sides are now rational Laurent functions. Clearing their finitely many denominators and multiplying by a suitable power of $w$ gives an ordinary polynomial identity, because it vanishes on a real phase arc with infinitely many distinct $w$ values. Thus this necessary rational identity holds wherever its denominators are nonzero. Squaring may introduce additional algebraic solutions, but cannot remove this necessary consequence of the original equation.

As $w\to\infty$, the positive Laurent degrees $d_1,d_4$ make $Q_j^{-3}\to0$, whereas $L\to\Omega^2n^2\ne0$. The left-hand side tends to $\Omega^8n^8>0$ and the right-hand side to zero. This is impossible. It independently rules out nonconstant $z$ using only rational identities and Laurent leading terms, and confirms the branch-sensitive proof by a method that has no square-root branch ambiguity.

## Constant height and all remaining radial cases

If $z$ is constant, its real axial equation becomes
$$
0=-z\left[\frac4{(r^2+4z^2)^{3/2}}+\frac1{4(r^2+z^2)^{3/2}}\right].
$$
The bracket is strictly positive at positive radius, so $z=0$. This includes the case where both initial profiles are constant; a nonzero constant height is impossible regardless of radial variation.

The remaining radial equation is
$$
\Omega^2r_{\phi\phi}=\frac{\ell^2}{r^3}-\frac{c_0}{r^2},\qquad
c_0=\frac54-\frac1{\sqrt3}>0.
$$
One can avoid continuation entirely in this case as well. Multiplication by $r^3$ gives the exact Laurent identity
$$
\Omega^2r^3r_{\phi\phi}=\ell^2-c_0r.
$$
If $r$ has actual positive degree $m\ge1$ and coefficient $r_m\ne0$, its left-hand side has a nonzero highest coefficient $-\Omega^2m^2r_m^4$ at degree $4m$. The right-hand side has degree at most $m$. Since $4m>m$, equality is impossible. This also confirms the subject's rational-growth argument without requiring a branch choice or an exterior path.

Therefore $r=r_0>0$ is constant. Radial balance gives $\ell^2=c_0r_0>0$, so the angular constant cannot vanish. The angular equation gives $\dot\theta=\ell/r_0^2$ constant, yielding a planar circle with either orientation. These circles solve the simultaneous limiting equation; they are not thereby exact solutions of the causal-delay equation. The theorem has no exceptional nonplanar constant pair or zero-angular-constant finite-Fourier orbit left over.

## Uniform compact slow-family consequence

Now impose the previously accepted compact exact-family hypotheses: a common positive radius floor, common $C^2$ bounds on all real periodic profiles, and base rotation and deformation rates in fixed compact subsets of $(0,\infty)$. Require fixed finite maximal degrees only for radius and height. The periodic phase correction may have infinitely many Fourier modes, provided the common bounds still hold.

If exact members existed with $\epsilon_n\to0$, the [compact reduction and exact-balance convergence upgrade](overnight2-b-independent-compact-slow-scale.md) would supply a subsequence with $R_n\epsilon_n^2\to\lambda\in(0,\infty)$, positive limiting rates and $C^2$ limiting profiles. Fixed finite-degree spaces are closed under uniform convergence: each finite Fourier coefficient converges through its integral, and passage to the limit in the finite sum preserves the degree ceiling. Thus the limiting radius and height are finite trigonometric polynomials in $\phi=\Omega\chi$, with $\Omega=k\sqrt\lambda>0$. The common radius floor remains positive.

The theorem just proved forces this limit to be the planar circle. Positive limiting mean rotation gives $\ell>0$. The independently reconstructed necessary torque mean would then be
$$
0=M_\chi=\ell\left\langle\frac{C(z/r)}{r^2}\right\rangle
=\frac{19\ell}{12r_0^2}>0,
$$
an impossibility. This excludes every such exact sequence. If a uniform positive threshold did not exist for the prescribed common bounds and degree limits, selecting exact members with $0<\epsilon_n<1/n$ would give the prohibited sequence. Hence a uniform existential $\epsilon_0>0$ excludes all exact members in this class for $0<\epsilon<\epsilon_0$, at every positive scale $R$.

The conclusion concerns exact histories, the stated compact class and its common slow scaling. It neither asserts a numerical threshold nor classifies any particular finite-speed proposal. It does not require the phase to be a finite polynomial; this is the substantive extension beyond the previous radius/phase obstruction.

## Application to the reciprocal-phase representation

The [independently reviewed reciprocal-phase chart](overnight2-b-independent-reciprocal-phase-chart.md) has radius degree at most two and height degree at most three throughout its compact coordinate box. Its radius floor is positive. The unsmoothed radial amplitude obeys $A\le\sqrt{1/8}<1$, so $\eta=\sqrt{1-A^2}$ has a common positive lower bound. The mapped base rates are continuous positive functions of compact coordinates with denominators bounded away from zero; they therefore lie in positive compact intervals.

Under a common factor $\epsilon$ on both base rates, their ratio remains unchanged. The reciprocal phase correction
$$
p=\frac\beta\kappa(F-\phi)+q
$$
then has uniform $C^2$ bounds. In detail, $F'=\eta^3/\rho^2$ and $F''=-2\eta^3\rho'/\rho^3$ are uniformly bounded by the common radius and coefficient bounds. The periodic value $F-\phi$ is bounded as well: reduce $\psi$ modulo $\pi$ in $\mathcal A(\psi)-\psi$, which is bounded on one period, and bound its remaining rational sine term using the positive radius floor. The ratio $\beta/\kappa$ and the finite correction $q$ and its derivatives have common finite bounds. The zero-amplitude definition and consistent continuous lift remove the apparent parameter branch singularities.

Thus the reciprocal-phase family meets the compact corollary's hypotheses after common slow scaling. Its infinite phase tail removes the earlier angular polynomial incompatibility but leaves the finite radius/height obstruction intact. An exact compact slow limit must permit non-finite Fourier content in at least one of these two meridional profiles. Merely representing an infinite tail numerically does not establish such a limit, and tails tending to zero toward a fixed finite-degree limiting pair retain the same contradiction. No finite-speed chart admission or numerical search outcome is reclassified by this asymptotic statement.

## Falsifiers, scoped validation and preservation

The proof can be falsified by a nonconstant real finite Laurent pair with everywhere positive radius and a constant positive $r^2+cz^2$; an error in the extreme-degree calculation; failure of the displayed necessary rational axial identity; a nonzero exterior limit of the inverse radicand powers despite positive degree; or a regular nonplanar normalized limiting orbit with both profiles finite trigonometric polynomials. The rational elimination and planar polynomial identity make these checks independent of any chosen complex square-root branch. A failure of the compact exact-family extraction or of fixed-degree closure would defeat the corresponding uniform corollary.

Nonpositive radius, a nonperiodic or non-finite Fourier profile, loss of the common bounds, vanishing limiting rate, or an arbitrary finite-speed causal-delay solution changes the hypotheses. Such cases are not counterexamples to this theorem. No physical energy premise, stability conclusion, numerical orbit membership or positive-speed threshold was inferred.

This review is purely analytical. The derivation in this new report is the complete evidence; no numerical instrument, target, runtime receipt or resource claim was needed. The frozen subject, prior reports/oracles and receipts, parent account and shared owners were not edited. No recursive agent, regular tests, production run, generator or Git mutation was used. No existing evidence was deleted, moved or replaced, and no replay or remote-backup claim is made. Parent integration is the remaining disposition step for this bounded review.

Final scoped verification: native `shasum -a 256` reproduced the assigned frozen subject identity after the review. Native `git diff --no-index --check /dev/null` emitted no whitespace diagnostics for this report; exit one denotes the new-file difference. The Laurent-unit proof, continuation audit, independent rational elimination, planar coefficient argument and compact corollary were reconstructed analytically as displayed. These checks support the theorem and file formatting; they certify no numerical proposal or external implementation.
