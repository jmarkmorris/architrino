# Independent review of the zero-crossing obstruction

## Verdict and the boundary qualification

**Derived and independently accepted:** the [frozen zero-crossing subject](overnight2-b-zero-crossing-obstruction.md) correctly proves its canonical zero-height identity, curvature restriction, necessary delay reach, velocity-independent diameter criterion, and explicit original-box application with third-sine coefficient zero. None of these conclusions requires a radius/phase reflection symmetry or a below-wake-speed hypothesis in the general conditional theorem. All positive self roots must remain in the sum.

One qualification concerns the phrase “exact piecewise conditions” for the third-cosine height. The displayed strict inequalities are valid sufficient conditions, but are not necessary for positivity on the open half-cycle: when $e>0$, the boundary $H=3e$ gives $z=4e\cos^3\phi>0$ throughout $(-\pi/2,\pi/2)$. It satisfies the zero-inflection argument too. The subject's explicit coefficient region lies strictly inside its sufficient conditions, so this boundary wording does not affect any claimed exclusion. The exact open-half-cycle conditions are recorded below rather than silently changing the frozen subject.

The general theorem is conditional on a finite complete ordinary causal-root chart at the reception being tested. It does not prove that an arbitrary high-speed history has such a chart, and it does not settle a nonordinary reception. The explicit low-speed application additionally uses the previously accepted [independent full-period chart](overnight2-b-independent-chart.md). There is no numerical target in this review.

## Canonical identity with every root retained

Use complete paths
$$
X_j(t)=R\bigl(\rho(\phi)\cos[\beta t/R+j\pi/3+p(\phi)],\rho(\phi)\sin[\beta t/R+j\pi/3+p(\phi)],(-1)^jz(\phi)\bigr),
\qquad \phi=\kappa t/R,
$$
with $R,\kappa>0$, positive bounded radius, bounded real height and $C^2$ profiles. Radius and phase need not be even, odd, periodic or aligned with the height for the one-reception argument. Alternating interaction polarities and axial signs are part of the scenario. The canonical constants are $K=c_f=1$.

At receiver zero and phase $\phi$, label every admitted positive root by $b$, retaining its source label $j_b$ and normalized delay $\Delta_b$. Set $\sigma_b=(-1)^{j_b}$, including $\sigma_b=+1$ when $j_b=0$ is self. The dimensionless endpoint vector $Q_b$ has axial component
$$
Q_{b,z}=z(\phi)-\sigma_b z(\phi-\kappa\Delta_b),\qquad |Q_b|=\Delta_b.
$$
The [canonical branch sum](../../../../../content/markdown/aaa/dynamics/master-equation.md) assigns the vector contribution $\sigma_bQ_b/(\Delta_b^3|D_b|)$, where $D_b=1-\widehat Q_b\cdot V_{s,b}$ is the signed source divisor. Therefore
$$
A_z(\phi)=\sum_b w_b\,[\sigma_bz(\phi)-z(\phi-\kappa\Delta_b)],
\qquad w_b=\frac1{\Delta_b^3|D_b|}>0.
$$
The equality uses $\sigma_b^2=1$. It is valid for every self and partner root, including ordinary roots with negative signed source divisor. Replacing $|D_b|$ by $D_b$ in a general-speed argument would be a different law and would destroy the positive-weight inference.

At $z(\phi_0)=0$ the current-height term vanishes independently of polarity:
$$
\boxed{A_z(\phi_0)=-\sum_b w_b\,z(\phi_0-\kappa\Delta_b).}
$$
The sampled quantity here is the common profile height, not the source's parity-multiplied axial coordinate. The chart assumption ensures that the complete list is finite and every divisor is nonzero. Thus each weight is finite and positive at this reception; no uniform-in-time divisor floor is needed for this pointwise statement.

If all sampled profile heights are nonnegative and one is positive, then $A_z<0$. If they are all nonpositive and one is negative, then $A_z>0$. Exact balance requires
$$
\frac{A_z}{R^2}=\frac{\kappa^2}{R}z'',\qquad A_z=R\kappa^2z'',
$$
so the first case forces $z''(\phi_0)<0$, and the second forces $z''(\phi_0)>0$. In particular a zero with $z''=0$ can balance only if the sampled list contains both strict signs or every sampled height vanishes. Both signs alone do not guarantee the required weighted cancellation.

This reasoning needs no claim about the direction of the zero crossing or whether it is transverse. A zero at which $z'=0$ remains covered. The curvature and delayed signs are the relevant data.

## Nonempty root list and necessary reach into the past

Nonemptiness is not assumed silently. Fix a partner $j\ne0$ at reception time $t_0$. Its unsquared gap is
$$
G_j(\Delta)=\frac{|X_0(t_0)-X_j(t_0-R\Delta)|}{R}-\Delta.
$$
At zero delay the planar chord is $2\rho(\phi_0)|\sin(j\pi/6)|>0$. If $\rho\le r_+$ and $|z|\le Z$ on the complete histories, every position has normalized norm at most $B=\sqrt{r_+^2+Z^2}$. Hence $G_j(\Delta)<0$ whenever $\Delta>2B$. Continuity gives at least one positive root for every partner. The root belongs to the complete chart and is ordinary by the stated hypothesis. No monotonicity of $G_j$ or bound on speed was used. Additional roots, including self roots, are not excluded or omitted.

Now assume
$$
z(\phi_0)=0,\qquad z''(\phi_0)\ge0,\qquad
z(\phi)>0\quad\hbox{for }\phi_0-L<\phi<\phi_0,
$$
with $L>0$. If every positive root had $\kappa\Delta_b<L$, every sampled profile height would be strictly positive. The nonempty positive-weight sum would then give $A_z(\phi_0)<0$, contrary to $A_z=R\kappa^2z''\ge0$. The necessary condition for exact balance is consequently
$$
\boxed{\text{some admitted positive root has }\kappa\Delta_b\ge L.}
$$
This is only a necessary reach condition. Equality may sample a zero at the preceding sign boundary, but does not ensure cancellation of other positive samples. If $L$ merely marks a shorter known positive interval rather than its maximal boundary, the same necessary reach inequality remains valid. No root at or beyond $L$ may be discarded in evaluating the exact equation.

Every positive root, independently of speed and source identity, satisfies the diameter bound
$$
\Delta_b=\frac{|X_0(t_0)-X_{j_b}(t_0-R\Delta_b)|}{R}
\le d_+:=2\sqrt{r_+^2+Z^2}.
$$
Thus $\kappa d_+<L$ excludes exact balance at the specified zero. High-speed nonmonotonicity can increase the number of roots, but all ordinary roots then have the same offending numerator sign and positive weight; adding them cannot cancel the contradiction. A zero divisor or an infinite/nonordinary complete sum is outside this theorem, not evidence that the theorem has excluded that history.

## Cosine and even anti-periodic height

For $z=H\cos\phi$, $H>0$, take $\phi_0=\pi/2$. Both $z(\phi_0)$ and $z''(\phi_0)$ vanish. Height is strictly positive on the preceding interval $(-\pi/2,\pi/2)$ of length $\pi$. At that reception,
$$
A_z(\pi/2)=-H\sum_b\frac{\sin(\kappa\Delta_b)}{\Delta_b^3|D_b|}<0
$$
whenever all positive roots have $0<\kappa\Delta_b<\pi$. The sum is nonempty by the partner argument. This contradicts zero required axial acceleration. It suffices to establish these delay inequalities at this one reception. The global bound $2\kappa\sqrt{r_+^2+H^2}<\pi$ is a sufficient way to do so.

More generally, let real $C^2$ height obey
$$
z(-\phi)=z(\phi),\qquad z(\phi+\pi)=-z(\phi),\qquad
z(\phi)>0\quad(-\pi/2<\phi<\pi/2).
$$
Evenness and anti-periodicity give $z(\pi-\phi)=-z(\phi)$. At $\phi=\pi/2$ this forces $z=0$. Differentiating once gives $z'(\pi-\phi)=z'(\phi)$, and differentiating again gives $z''(\pi-\phi)=-z''(\phi)$, so $z''(\pi/2)=0$ too. The preceding sign interval therefore has length $\pi$ and the same one-reception contradiction applies.

First-quarter concavity is unnecessary. Neither radius nor phase correction needs a reflection center, and neither needs to share the height's center. This extends the class excluded at a zero; it does not independently supply the earlier positive period-work margin.

For $z=H\cos\phi+e\cos3\phi$, factorization gives
$$
z(\phi)=\cos\phi\,[H-3e+4e\cos^2\phi].
$$
On the open positive half-cycle, $\cos\phi>0$ and $x=\cos^2\phi$ ranges over $(0,1]$. Thus $H>3|e|$ is sufficient, and the subject's piecewise strict conditions $H-3e>0$ for $e\ge0$ and $H+e>0$ for $e<0$ are also sufficient. The exact positivity conditions on this open interval are
$$
\begin{cases}
H-3e\ge0,& e>0,\\
H>0,& e=0,\\
H+e>0,& e<0.
\end{cases}
$$
For $e>0$ the infimum occurs as $x\downarrow0$, which is not in the open interval, so equality is allowed: $H=3e$ gives $4e\cos^3\phi$. For $e<0$ the minimum occurs at $x=1$, attained at $\phi=0$, so equality is not allowed. This is the sole boundary qualification to the subject's wording. All its displayed strict cases remain accepted. In the accepted cases $H>0$ and $|z|\le H+|e|$ supplies the diameter bound.

## Explicit original-box slice with third-sine coefficient zero

The application is the following exact slice of the earlier admitted coefficient box:
$$
\rho=1+a\cos2\phi+b\sin2\phi,\qquad
p=c\cos2\phi+d\sin2\phi,\qquad
z=H\cos\phi+e\cos3\phi,
$$
$$
|a|,|b|\le\frac3{50},\quad |c|,|d|\le\frac1{10},\quad |e|\le\frac1{25},
\quad \frac14\le H\le\frac34,\quad \frac3{20}\le\beta\le\frac12,\quad \frac2{25}\le\kappa\le\frac7{20}.
$$
The frozen independent chart includes these coefficients and also a third-sine coefficient $f\in[-1/25,1/25]$. Setting $f=0$ is a subset operation, so its accepted all-time conclusions apply: speeds below $0.801$, exactly five ordinary partner roots per receiver, no positive self roots and transmitter divisors above $0.199$. This dependency verifies the chart hypothesis here; it is not used to impose a speed restriction on the general theorem.

Direct coefficient bounds give
$$
\rho\le1+\frac3{50}+\frac3{50}=\frac{28}{25},\qquad
|z|\le\frac34+\frac1{25}=\frac{79}{100},\qquad
H-3|e|\ge\frac14-\frac3{25}=\frac{13}{100}>0.
$$
The height is therefore positive on the required half-cycle, and both height and curvature vanish at $\pi/2$. The all-history diameter satisfies
$$
d_+^2\le4\left[\left(\frac{28}{25}\right)^2+\left(\frac{79}{100}\right)^2\right]
=\frac{3757}{500}<\frac{121}{16}=\left(\frac{11}{4}\right)^2.
$$
The cross-product difference is $121\cdot500-3757\cdot16=388>0$. Consequently
$$
\kappa\Delta_b\le\kappa d_+<\frac7{20}\frac{11}{4}=\frac{77}{80}<\pi.
$$
All hypotheses of the zero-inflection obstruction are satisfied at $\phi_0=\pi/2$. Thus the entire displayed region is excluded for every $R>0$, including its parameter boundaries. Radius and phase asymmetries controlled by $b$ and $c$ are unrestricted within these bounds. This conclusion follows from the exact axial row and the admitted chart, not from any unsuccessful numerical search. It does not cover the nonzero third-sine coefficient merely by continuity or proximity.

## Relation to the first-allocation sign-change theorem

The [first-allocation account](overnight-b-canonical-spatial-2026-10-06.md#sign-definite-height-obstruction) proves that a strictly one-signed nonzero periodic height is impossible by examining its global extremum. For a nonnegative profile touching zero, its stronger argument uses the exact inequality $z''\le Wz$ and an explicit finite uniform upper bound $M\ge\max(0,W)$ on the complete periodic chart. Twice integrating from a zero minimum gives $0\le z(t)\le M\int_{t_0}^t(t-s)z(s)\,ds$; a short-interval supremum estimate forces zero, and iteration plus periodicity forces the full height to vanish. Reflection covers nonpositive height.

That bounded-$W$ qualification must remain visible; pointwise finiteness of the root list at one reception alone does not supply it. The earlier theorem's accepted scope requires the stated complete periodic chart and uniform bound. The present proof is separate and pointwise: it starts from a zero, needs only a finite ordinary complete chart there, and constrains the sampled past signs and zero curvature. It therefore excludes some sign-changing classes left open by the first result without claiming that every sign-changing height has a zero inflection. A descending asymmetric zero with negative curvature, or roots sampling earlier opposite-sign lobes, can satisfy this necessary condition and remains undecided.

## Falsifiers, identities and preservation

The direct algebraic falsifiers are a failure of $\sigma_bQ_{b,z}=\sigma_bz-z_{\rm past}$ for the stated parity convention, or a nonpositive ordinary canonical weight. Completeness failures include an omitted positive self or partner root, or treating a nonordinary root as an ordinary weighted row. A valid exact history with the stated zero curvature and positive preceding interval but no root reaching lag $L$ would refute the reach theorem. A permitted member of the explicit $f=0$ coefficient slice satisfying full canonical balance would refute its exclusion. An earlier-lobe cancellation or a singular chart outside the hypotheses does not refute these scoped claims.

Native `shasum -a 256` identifies the frozen subject as `280f2622769c022c9725ff920b01421f12fc779fa4c883eb8d5340bd47edd615`. The inspected independent chart report has identity `b1b714e8bd9db26d446edabe22c0c52934da414b5c69eef2166bfab4a1fd58e2`; the first-allocation account has identity `92f0cd2ae58ba984b4aa20c71e24ebecdd58837bea7a1159a7c80a00978b60c3`. This review uses the current canonical absolute-divisor branch law and an independent analytical reconstruction, with exact rational comparisons displayed in the text. No numerical instrument, target or computational known-first stage was needed.

Only this new independent Markdown report was authored. All frozen subjects, previous reports and instruments, retained evidence, parent account and shared owners were read-only. The previously reported rendering typo in the frozen reflection-height review was not edited. Final native hashes check the stated source identities, and `git diff --no-index --check /dev/null` checks the new report's whitespace, with exit one and no diagnostics denoting its new-file difference. No Git mutation, generator, delegation or runtime evidence write was used. Parent integration should retain the sufficient-versus-sharp third-cosine boundary qualification and the first-allocation bounded-$W$ hypothesis. No mathematical blocker affects the stated zero-crossing exclusion or its explicit box application. The queued thin-height numerical review remains outside this assignment.
