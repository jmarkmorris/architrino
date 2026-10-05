# Independent assessment of accumulating zero terminal speeds for fixed radial powers

## Verdict, dependencies and proof boundary

**Claim grade: derived.** For every fixed $p\in(1,2]$, zero-terminal-speed parameters accumulate at zero in the unchanged complete compatible radial-power preparation family, within an existential sufficiently small launch interval depending on $p$. The [candidate theorem](alternatives-screen-2026-10-05-radial-power-family-zero-speed.md) establishes this result by a nonvanishing phase coordinate, a signed weighted determinant and local constancy of an integer on the positive-terminal-speed set. The independent reconstruction below found no load-bearing gap.

The preparation, finite-amplitude transition and all-future dispersal premises were independently assessed and frozen in the [trilogy adjudication](alternatives-screen-2026-10-05-radial-power-family-adjudication.md) before this candidate was read. In particular, this terminal-selection argument was not used as a premise for that earlier assessment. Its scope remains the opposite-polarity mirror planar family with the selected $R^{-p}$ response, $K=R_*=c_f=1$, the complete circular tail, the specified compatibility patch and all ordinary roots. No physical conservation law or numerical trajectory enters the proof.

For every fixed zero-speed member, the already assessed global theorem gives radius comparable to $T^{2/(p+1)}$ and finite total angle. The new existence argument locates no parameter and does not establish positive-terminal-speed existence, isolated zeros, a zero set with empty interior, a common sequence across exponents or a numerical admission threshold. All sufficiently small members being zero-speed remains consistent with the theorem.

## Coordinate, scalar gap and finite-prefix phase

Use the candidate's notation $c=p-1$, $k=3-p=2-c$, $A=2/k$, $\ell=1/c$, $\nu=k/c=2\ell-1$, and $\kappa=\sqrt{k}$. Thus $\ell,\nu\ge1$. The actual coordinates are $a=h^{2/k}$, $x=r/a$, $y=a^{c/2}r'$, $\delta=\epsilon a^{-c/2}$, and $z=x^{-c}>0$. The weighted time is $d\chi/ds=a^{-(p+1)/2}x^{-p}$. The accepted late-history estimates supply

$$
\begin{aligned}
z_\chi&=-cy+Ac\delta z+E_z,& |E_z|&\le C_p\delta^2z,\\
y_\chi&=z^\nu-1+C\delta y+E_y,& |E_y|&\le C_p\delta^2,\\
\delta_\chi&=-\frac c k\delta^2+E_\delta,& |E_\delta|&\le C_p\delta^3,
\end{aligned}
\qquad C=\frac{c(p-2)}k.
$$

The errors may depend on complete histories and are not differentiated. The global chart bounds $z,y$, and $\delta\le\epsilon$. Its finite weighted endpoint has $z\to0$, bounded $y$, and positive limiting $\delta$; physical time tends to infinity there.

Let $x_\delta$ be the local corrected-potential minimum, with $x_\delta=1+O_p(\delta^2)$ and $dx_\delta/d\delta=O_p(\delta)$. The proposed complex coordinate is exactly

$$
\mathcal W=\kappa(1-x_\delta z^\ell)
+i(z^\ell y-A\delta z^{\ell+1})
=z^\ell[\kappa(x-x_\delta)+iw],\qquad w=y-A\delta x^{-c}.
$$

The identity uses $x=z^{-\ell}$ and $x^{-c}=z$. The amplitude theorem keeps $(x-x_\delta,w)$ nonzero up to the transition. At release $\operatorname{Im}\mathcal W=-A\epsilon$ and $\operatorname{Re}\mathcal W=O_p(\epsilon^2)$, which selects one initial argument near $-\pi/2$ continuously in positive parameter.

After transition the central scalar $e=y^2/2+z^{2/c}/2-z/c$ stays above its minimum by a fixed positive gap. On the action annulus this follows from the entry gap and the uniformly small difference between increasing corrected action and central action. If the path reaches $e=1$, then $e_\chi=O_p(\delta)$ and the subsequent comparison interval has uniformly bounded length. Hence $e=1+O_p(\delta_b)$ on that interval, which retains a fixed gap from the negative central minimum. This explicitly verifies coverage of the final comparison interval.

A zero of $\mathcal W$ would imply $z=x_\delta^{-1/\ell}=1+O_p(\delta^2)$ and $y=A\delta z=O_p(\delta)$. Its central scalar would differ from the minimum by only $O_p(\delta^2)$, contrary to that gap for small launches. Thus the coordinate is nonzero for the whole generated future. Defining $x_\delta$ as a comparison minimum at large actual radius changes no physical equation.

The local phase equation also applies on the entire pre-transition interval. Direct differentiation gives its error as $O_p(J+\delta+\delta^3/J)$. The seed floor $J\ge c_p\epsilon$ makes $\delta^3/J=O_p(\epsilon^2)$, so fixed small amplitude followed by small launch gives a uniformly negative phase rate there. The final fixed-amplitude band has duration comparable to $\epsilon^{-(p+2)/p}$; its negative phase gain cannot be cancelled by a positive earlier prefix.

## Independent weighted determinant calculation

At $\delta=0$ write $U_0=\kappa(1-z^\ell)$ and $V_0=z^\ell y$. Under the central field $z_\chi=-cy$, $y_\chi=z^\nu-1$, the relation $c\ell=1$ gives

$$
(U_0)_\chi=\kappa z^{\ell-1}y,\qquad
(V_0)_\chi=-z^{\ell-1}y^2+z^\ell(z^\nu-1).
$$

Multiplication and cancellation of the two $z^{2\ell-1}y^2$ terms gives

$$
D_0=U_0(V_0)_\chi-V_0(U_0)_\chi
=-\kappa\left[z^{\ell-1}y^2+z^\ell(z^\ell-1)(z^\nu-1)\right].
$$

For positive $z$ the bracket vanishes only at $(1,0)$, since the two power differences have the same sign.

To check the actual perturbation, put $U=\operatorname{Re}\mathcal W$ and $V=\operatorname{Im}\mathcal W$. The explicit coordinate corrections are

$$
U-U_0=O_p(\delta^2z^\ell),\qquad
V-V_0=O_p(\delta z^{\ell+1}).
$$

The parameter dependence of the minimum gives $(x_\delta)_\chi=O_p(\delta^3)$. Product differentiation of $U$ therefore yields

$$
U_\chi-(U_0)_\chi\big|_{F_0}
=O_p(\delta z^\ell+\delta^2z^{\ell-1}|y|).
$$

For $V$, differentiate $z^\ell y-A\delta z^{\ell+1}$. The three first-order perturbation contributions are $A\delta z^\ell y$, $C\delta z^\ell y$, and $Ac(\ell+1)\delta z^\ell y$. All remaining terms are bounded by $C_p\delta^2z^\ell$ on the fixed box, including the terms with $E_z$ because that error contains $z$. Thus

$$
V_\chi-(V_0)_\chi\big|_{F_0}
=O_p(\delta z^\ell|y|+\delta^2z^\ell).
$$

In the full determinant $UV_\chi-VU_\chi$, the least power requiring attention is $\delta^2z^{2\ell-1}y^2$, from multiplying the corrected real component or its derivative with the central terms. The inequality $2\ell-1\ge\ell$ and bounded $z,y$ control it by a constant times $\delta z^\ell$ for small $\delta$. Every other perturbation has at least this weight. Consequently the candidate's decisive estimate is correct:

$$
\operatorname{Im}(\overline{\mathcal W}\mathcal W_\chi)
=-\kappa\left[z^{\ell-1}y^2+z^\ell(z^\ell-1)(z^\nu-1)\right]
+O_p(\delta z^\ell).
$$

For $0<z\le1/2$, the central bracket is at least $z^{\ell-1}y^2+z^\ell/4$. For $z\ge1/2$ in the fixed box, its only zero is excluded by the scalar gap; compactness supplies a positive minimum. Small enough fixed-power launch therefore makes the actual determinant negative throughout the post-transition path. Since $\mathcal W\ne0$, the lifted phase strictly decreases there.

No differentiability of the delayed errors was used. The powers are differentiated only at positive $z$, and the estimates remain uniform toward zero because $\ell\ge1$. An analytic continuation of $\mathcal W$ through the terminal boundary is unnecessary.

## The terminal integer and its parameter dependence

The pre-transition phase estimate gives $\psi_b\le C_p-b_p\epsilon^{-(p+2)/p}$, and post-transition monotonicity gives $\psi_\infty\le\psi_b$. Since $z\to0$ with bounded $y,\delta$, the coordinate tends to $\kappa>0$. A small disk around that limit lies in one argument chart, so the lifted phase has a finite limit and cannot perform further whole turns there. Thus

$$
\psi_\infty=2\pi N_p(\epsilon),\qquad N_p(\epsilon)\in\mathbb Z,
\qquad N_p(\epsilon)\longrightarrow-\infty\quad\text{as }\epsilon\downarrow0.
$$

This integer exists even at zero-terminal-speed members. Its local constancy is required only at positive-terminal-speed members, which is a weaker and justified statement.

Fix $\epsilon_0>0$. The physical circular scale, frequency and patch depend smoothly on parameter nearby. The patch correction and its first two derivatives vanish at its moving old seam, so complete histories vary continuously in $C^2$ on every fixed compact physical old-time interval. They need not converge uniformly on the infinite past.

For any finite physical reception interval, a uniform complete speed bound $b<1$ and a uniform current-radius bound give a common compact source interval by the delay inequality $u\le2r(T)/(1-b)$. The current-radius bound follows already from locally bounded initial radii and bounded speed. The positive separation floor gives a common positive delay floor. The root residual has derivative at least $1-b$, so root displacement is controlled by position discrepancy; bounded source acceleration controls velocity evaluation at the shifted root. On intervals shorter than the delay floor, the source histories are already known. The ordinary integral difference estimate for position and velocity, iterated finitely many times, gives continuous dependence on parameter throughout the requested finite interval. This supplies finite-prefix continuity without a claim about uniform infinite-past norms or endpoint continuity at a zero-speed parameter.

Suppose $y_\infty(\epsilon_0)=Y_*>0$. At a late finite physical time choose $y>3Y_*/4$ and $z=\zeta$ very small. Neighboring parameters have $y>2Y_*/3$ and $0<z<2\zeta$. In the strip $y\ge Y_*/2$, $z\le2\zeta$, the equation $z_\chi=-cy+b(\chi)z$, with bounded $b$, gives $z_\chi\le-cY_*/4$ after reducing $\zeta$. Since $|y_\chi|\le M_p$, the candidate's condition

$$
M_p\frac{8\zeta}{cY_*}<\frac{Y_*}{6}
$$

keeps $y$ above its floor until the terminal boundary. The global theorem excludes another regular-domain endpoint. Hence every sufficiently nearby parameter also has positive terminal speed, and this parameter set is open.

Choose the strip smaller so that $\operatorname{Re}\mathcal W>\kappa/2$. The finite prefix is nonvanishing on a compact interval, so its continuously selected phase depends continuously on parameter. The rest of every neighboring trajectory stays in the same right-half-plane argument chart and tends to its positive real axis. It contributes no integer turn. Therefore $N_p$ is locally constant at each positive-terminal-speed parameter. This verifies both ingredients needed for the topological step, rather than assuming terminal continuity from finite-time continuity alone.

If an interval $(0,\epsilon_1)$ contained no zero-speed parameter, the nonnegative-terminal theorem would make every member positive-speed. A locally constant integer on that connected interval is constant, contradicting $N_p(\epsilon)\to-\infty$. Thus each such interval contains a zero-speed parameter. Repeatedly choosing a smaller parameter below half the preceding one gives a sequence tending to zero.

## Endpoint checks, exclusions and falsifiers

At $p=2$, $c=k=\ell=\nu=\kappa=1$ and $A=2$. The central negative determinant bracket reduces to $y^2+z(z-1)^2$. The smallest perturbation power is then $z^{2\ell-1}=z$, exactly the required weight. The local and global premises apply to this canonical endpoint, so the zero-speed accumulation conclusion includes $p=2$. The threshold for this new selection proof remains existential; the canonical wider dispersal theorem's numerical threshold alone does not admit terminal-selection claims at a specified parameter.

As $p\downarrow1$, the family normalization, amplitude rate, coordinate exponents and estimates are not uniform. This proof makes no assertion at $p=1$, where the selected central balance would require $\epsilon^2=1/2$ independently of radius. The endpoint $p=3/2$ is an algebraic specialization, not the premise from which the general-power theorem is inferred.

Falsifiers are a loss of the global scalar gap during the final bounded comparison interval, a zero of $\mathcal W$ within that gap, a determinant perturbation with smaller power than $z^\ell$, a missing moving-minimum contribution, failure of finite-time complete-source parameter continuity, or loss of the uniform positive-terminal strip. A locally constant integer that diverges toward one endpoint of a connected interval is impossible; any counterexample must break one of the established hypotheses before that last step. The theorem does not imply that the zero set is discrete or has empty interior, and it does not imply that any positive-speed parameter exists.

## Frozen evidence and validation

Before this review, `shasum -a 256` measured the candidate identity as `359f1e30d08863028bbf76d56d372f94874eee8fcb8d5a47fd72f23035830ac5`. The earlier trilogy adjudication had already been frozen as `32bfecc1e93228140377cbd385726b35c20e3a7a6e67d4de59ffcbc949079365`; its source identities and independent coefficient reconstruction are retained there.

Validation is analytical: explicit coordinate identities, independent central determinant and perturbation products, compact-gap and small-$z$ bounds, finite-source method-of-steps continuity, positive-terminal strip and connectedness. No numerical target, Python execution, newly written executable instrument or external reference was used. Only this new adjudication was authored for the second assignment; the terminal-selection candidate and preceding frozen sources were not edited. Integration remains with the coordinating investigation.
