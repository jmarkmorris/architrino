# Independent assessment of the two conditional escape theorems

This supplement independently reconstructs the [rotating mirror radial theorem](../binary-research/analysis/alternatives-screen-2026-10-05-radial-rotating-class.md) and the [finite-width collinear escape criterion](../collinear-research/analysis/alternatives-screen-2026-10-05-width-escape-criterion.md). Both arguments are valid under their complete stated hypotheses. Neither proves that an arbitrary preparation enters or remains in its required domain. No additional numerical target was run for this assessment, and the two subjects were not edited.

## Correction to the frozen first assessment

The [first assessment](alternatives-screen-2026-10-05-adjudication-first.md#circle-root-coverage-and-existence) incorrectly says that the secondary partner function's derivative “decreases initially and then increases.” The correct statement is that $g(x)=x+b\cos x$ first decreases and then increases, while $g'(x)$ is strictly increasing throughout $(\pi/2,4)$ because $g''(x)=-b\cos x>0$ there. The same paragraph already supplied this positive second derivative. This is a wording correction; the unique minimum, two secondary roots and complete census are unchanged. The frozen checkpoint is preserved.

## Rotating mirror radial class

The equation is $q''=-g(R)n/D$ for a complete planar mirror pair $X_+=q$, $X_-=-q$, with $R=T-S=|q(T)+q(S)|$, $n=[q(T)+q(S)]/R$ and $D=1+n\cdot q'(S)$. The selected radial magnitude $g$ is continuous and strictly positive on positive ranges, with enough local regularity for the ordinary delayed equation. Wake speed is one. The supplied complete past is separated, locally $C^1$, uniformly subfield, and has nonnegative signed geometric areal rate $h=q\times q'$ with $h(0)>0$. The scalar cross product is its component perpendicular to the fixed plane; it is not an imported physical angular-momentum law.

**Causal geometry.** Write $a=q(S)$, $b=q(T)$ and $C=(a+b)/2$. Every intermediate point obeys

$$
2|q(u)-C|\le |q(u)-a|+|q(u)-b|\le\int_S^T|q'(s)|\,ds<T-S=2|C|.
$$

The first inequality follows by adding the two displacement vectors and using the triangle inequality. The second splits the path length at $u$. The strict inequality uses the strict speed bound on the completed compact causal interval. Thus the entire path segment lies inside a ball whose boundary touches the origin, wholly in the open half-plane $C\cdot q>0$. Its angular lift lies inside one interval of length $\pi$. Meanwhile $|a-b|<|a+b|$ implies $a\cdot b>0$. Therefore the endpoint angular difference is strictly less than $\pi/2$ in absolute value on the actual lifted path, not only modulo a full turn. These are geometric consequences of the causal chord and do not require a small delay.

**Preservation of rotation and finite endpoints.** On a nonnegative-rotation history the angular increment is nonnegative. It is strictly positive over every receiving causal interval at release because $h(0)>0$ and continuity provide a positive interval immediately before zero. The same argument propagates as long as the future retains positive $h$. Directly taking the cross product of $q$ with its equation gives

$$
h'(T)=\frac{g(R)}{DR}|q(T)|\,|q(S)|\sin[\theta(T)-\theta(S)]>0.
$$

A first loss of positive areal rate contradicts this identity. Hence $h\ge h_0=h(0)$ throughout the maximal strict-subfield future, and $r=|q|>h_0$ because $h\le r|q'|<r$. This excludes contact. The root triangle inequality $2r\le R+|q(T)-q(S)|<2R$ gives the uniform source-delay floor $R>r>h_0$ without needing a uniform future speed gap.

At a proposed finite endpoint, bounded speed bounds the receiving positions. The old complete uniform subfield margin bounds source times below; the delay floor bounds them away from that endpoint. The sampled source times therefore lie in a compact already regular interval with strict source speed margin. Denominators and response coefficients are bounded there, and the ordinary local continuation theorem applies unless receiver speed reaches one. No extra smoothness of the old source acceleration is needed for this radial position/velocity law beyond the declared local regularity. A finite maximal endpoint is consequently unit speed at positive separation. This conclusion does not define the equation's singular continuation.

**Bounded global futures.** If a global strict-subfield future satisfied $r\le M$, an old source time $S\le0$ would imply $T\le M+r(0)+(1-b_0)S\le M+r(0)$, where $b_0<1$ is the old complete speed bound. Thus sufficiently late causal windows contain only generated future. Their radii lie in $(h_0,M]$, and

$$
\Delta\theta\ge h_0R/M^2,\qquad
h'\ge\frac{g_*h_0^3}{\pi M^2},\qquad
 g_*:=\min_{h_0\le R\le2M}g(R)>0.
$$

The second inequality uses $D<2$ and $\sin\Delta\theta\ge2\Delta\theta/\pi$ on the already proved angular range. It forces linear growth of $h$, contradicting $h<r\le M$. This exclusion remains valid even when the future speed margin tends to zero.

**Return exclusion with a uniform margin.** Now assume a global future with $|q'|\le b<1$. At a late return $r(T)\le L$, root geometry gives $R\le2L/(1-b)$, and all intermediate radii are bounded above by $L+2bL/(1-b)$. The same torque estimate therefore provides a fixed positive lower bound on $h'$ throughout sufficiently late visits to a bounded radius range. Infinitely many returns to $r\le L$, together with the $b$-Lipschitz radius, give disjoint time intervals of fixed positive length on which $r\le2L$. Each increases $h$ by a fixed positive amount. But monotonicity and the infinitely many subsequent visits require $h(T)\le bL$ for every $T$. This contradiction proves $r(T)\to\infty$.

> Claim grade: derived, independently reconstructed after disclosure. No missing hypothesis was found for these statements. Their essential hypotheses are complete nonnegative past rotation, positive release areal rate, strict subfield causal windows, positive radial magnitude, and mirror planar geometry; the limit $r\to\infty$ additionally requires global existence and a uniform future speed bound. Falsifiers: a causal segment violating the open-half-plane inequality, nonpositive torque with a positive causal angular increment, a bounded global strict-subfield solution, or infinitely many bounded returns with the fixed margin. The theorem proves neither global existence for a specified release nor terminal velocity nor finite total angular change.

## Finite-width post-passage escape criterion

The equation retains both self and partner integrals for mirror paths $x,-x$, with spatial response $f_\rho(z)=z/(z^2+\rho^2)^{3/2}$ and triangular reception window $\delta_h(g)=h^{-1}(1-|g|/h)_+$. Positive $h,\rho$ remain fixed. The supplied past through entry time $t_0$ is continuously differentiable and nonincreasing, bounded above by $a$. Write $y=-x$ and $u=-x'$. The entry conditions are exactly the subject's $y_0>a$, $u_0>U>1$, recent-window speed floor, and strict comparison $S_*(U)>(y_0-a)^{-2}$. The equation must already hold on the whole recent interval used for the acceleration estimate.

**Uniform acceleration bound.** The maximum spatial response magnitude is $2/(3\sqrt3\rho^2)$. For ages $0\le w\le2h$, multiplying this by $1/h$ and integrating gives $4/(3\sqrt3\rho^2)$ per channel. For $w\ge2h$, nonzero window weight implies range at least $w-h\ge w/2$, so the integrand is at most $4/(hw^2)$ and its tail integral is at most $2/h^2$. Two channels give the stated constant

$$
C=2\left[\frac4{3\sqrt3\rho^2}+\frac2{h^2}\right].
$$

It applies to every actual solution independently of the size of its speed or past duration.

**Partner braking.** Until a proposed downward crossing of $u=U$, the complete path remains nonincreasing. Since $x(t)+x(s)\le-y(t)+a<0$, the partner acts as braking. Its window argument is $Q(s)+y(t)-t$, with $Q=s-x(s)$ and $Q'=1+u(s)\ge1$. Changing variable to this argument therefore bounds its complete received triangular mass above by one, without requiring the map's image to cover the entire band. Its range is at least $y(t)-a$, giving $0\le P(t)\le[y(t)-a]^{-2}$.

**Self lower bound at a first crossing.** Put $\ell=\min(U/C,h/(4U))$. At the first hypothetical downward crossing time $T$, the declared recent-window hypothesis and the speed floor since entry give $u(T-w)\ge U$ for $0\le w\le\ell$. The acceleration bound gives $u(T-w)\le U+Cw\le2U$. Consequently $Uw\le R(w)\le2Uw$ and $0\le R(w)-w\le h/2$. The window is at least $1/(2h)$, and the spatial numerator and denominator can be bounded separately to obtain

$$
S(T)\ge\frac1{2h}\int_0^\ell\frac{Uw}{(\rho^2+4U^2w^2)^{3/2}}\,dw
=\frac1{8hU}\left[\frac1\rho-\frac1{\sqrt{\rho^2+4U^2\ell^2}}\right]=S_*(U).
$$

This is a lower bound even though the spatial response is not monotone over all ranges; no monotonicity of that response was assumed. The strict entry inequality gives $u'(T)=S(T)-P(T)>0$, contradicting a first downward crossing. Global finite-width solvability then gives $u>U$ and $y\ge y_0+U(t-t_0)$ for all future time.

**Unbounded speed.** The partner input has finite total braking, $\int_{t_0}^\infty P\,dt\le[U(y_0-a)]^{-1}$. Since $u+\int P$ is nondecreasing, $u$ has an extended-real limit. If its limit were finite $L\ge U>1$, its displacement on every compact age interval would converge uniformly to $Lw$. The same core and age-tail majorants used above permit dominated convergence of the whole self integral. Direct integration of the affine input yields

$$
\lim S(t)=\frac1{hL\rho}\left[1-\frac{\operatorname{arsinh}z}{z}\right]>0,
\qquad z=\frac{Lh}{\rho(L-1)}>0.
$$

The positivity follows from $\operatorname{arsinh}z<z$ for $z>0$. Meanwhile $P(t)\to0$, so $u'$ tends to a strictly positive constant, contradicting finite limiting speed. Hence $u\to+\infty$ and averaging its integral gives $y(t)/t\to+\infty$. The result is asymptotic growth, not finite-time blowup; the global acceleration bound remains valid.

> Claim grade: derived, independently reconstructed after disclosure. No missing hypothesis was found in the stated sufficient criterion. Complete past monotonicity, the upper position bound, the recent speed floor and applicability of the equation on the recent interval are essential; checking only current position and velocity would not suffice. Falsifiers: failure of the partner variable change, a self input below the proved bound at a first downward crossing, or a bounded limiting speed despite entry and complete hypotheses. No exact selected release has been certified to enter this region by this adjudication. Finite trajectory refinement remains measured candidate evidence and cannot establish entry by itself.

## Disposition

Both new conditional results are suitable for the coordinator's bounded scientific synthesis with their hypotheses intact. The rotating theorem applies to the expressly listed sharp radial laws on mirror strict-subfield histories; it must not be transferred to amplitude gradient, Maxwell, memory or finite-width response. The finite-width escape criterion applies after superfield post-passage entry and needs a proof or an error enclosure for the actual complete history before it can decide the selected release's fate. These domains differ and should remain separate rows. This supplement adds no computed target, modifies no subject or reference, and leaves no owned process running.
