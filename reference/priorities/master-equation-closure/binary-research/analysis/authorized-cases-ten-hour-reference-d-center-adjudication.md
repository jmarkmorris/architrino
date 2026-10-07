# Independent assessment of the slow-pair common-center tangent

**Derived verdict: accepted at linear grade.** The subject [center variation](authorized-cases-ten-hour-d-center-variation.md), SHA-256 `3c502ae4f8e3b7d2d883a8f03f1e3beca5a0e775cc622b937cc71d10dba2cadd`, was opened after freezing the [independent center reference](authorized-cases-ten-hour-reference-d-center-variation.md), SHA-256 `9904c409738dd537e2730e9fb1dab523f88c677f1ed016193d1e1057c0940195`. The blind reference independently derives the same tensor, both clock signs, source-acceleration transport and global integrable-coefficient argument. Its generic coefficient estimate is replaced here only for assessment by the subject's explicitly checked slow-regime constants. No source or reference is edited.

## Exact row and seam treatment

The source-time variations are $\delta s_+=-n\cdot d/D$ and $\delta s_-=+n\cdot d/D$. Their opposite base source velocities make both total chord variations equal to $Bd$, and both total source-velocity variations equal to $c'(s)+a_s(n\cdot d)/D$. The range and transmitter variations have opposite signs. Differentiating both rows therefore gives equal accelerations, precisely the displayed $L[c(t)-c(s)]+Vc'(s)$. Expansion of the subject's factored $L$ agrees term by term with the blind reference's four tensor terms. In particular the source-acceleration term is negative, with denominator $R^2D^3$. The stated relative equation has the complementary position sum and reversed delayed-velocity coefficient, so the center estimate is not silently transferred to it.

Constant translation annihilates the equation. At the static affine control, $L=K(3nn^{\mathsf T}-I)/R^3$ and $V=-Knn^{\mathsf T}/R^2$ give the independent center output $K(2nn^{\mathsf T}-I)u/R^2$. This checks the non-Galilean term as well as the moving-source signs. The control is prescribed data, not a purported equilibrium.

For $W^{2,\infty}$ supplied data, the source acceleration is an almost-everywhere coefficient. The strict complete speed margin gives bi-Lipschitz clocks, so source null sets remain receiving null sets. Approximating the bounded source acceleration in $L^1$, or applying dominated convergence to its integrated shifted velocity, gives the displayed chain rule in the time-integrated equation. The prescribed family is differentiable in position and velocity with uniformly bounded local velocity Lipschitz constants; these are sufficient for the finite-prefix difference-quotient argument. Causal linear integral uniqueness completes the variation. No continuous supplied acceleration, jerk, or globally differentiable semiflow in an inappropriate seam topology is asserted.

## Actual source coverage and constants

I checked the original [wider-regime release and future-window construction](slow-binary-wider-regime.md#1-exact-row-complete-roots-and-the-release-layer). Its direct release tube reaches scaled time $10\epsilon$, keeps radius below $1.01R_0$, samples negative sources only inside the supplied recent interval, and has generated source and source-of-source times by that endpoint. Clock monotonicity then preserves generated-source coverage. The supplied physical acceleration conversion is exactly $8\epsilon^2/R_0=2K/R_0^2$. During that tube this is less than $4K/r^2$.

For generated sources, $r_s\ge r-\beta R\ge r(1-3\beta)/(1-\beta)>0.99r$ at $\beta<0.003$. The original generated scaled bound $1.01/\rho^2$ converts to $0.2525K/r_s^2<0.253K/r_s^2$, so its source value is below $K/r^2$. Thus the unified $|a_s|\le4K/r^2$ covers both supplied and generated sources, including acceleration seams almost everywhere. It is not being applied to arbitrary old unsampled history.

The lower radius gives $K/r\le16\epsilon^2/h_0^2$. Hence

$$
R|a_s|\le\frac{128\epsilon^2}{(1-\beta)h_0^2}<\frac1{1000}
$$

through $\epsilon\le1/2000$, $h_0\ge1999/2000$, $\beta<0.003$. With $d=1-\beta$, direct norm estimation of the factored tensor gives

$$
\frac{R^3\|L\|}{K}\le\frac{3d+\beta+1/1000}{d^3}<4,
\qquad \frac{R^2\|V\|}{K}\le d^{-2}<2.
$$

The resulting $6K/R^2$ is already less than $2K/r^2$ by the range lower bound; the subject's $8K/r^2$ is therefore conservative. No sign cancellation is needed for these norm bounds.

The scaling of the integrated coefficient is also correct. With $\tau=\epsilon t/R_0$ and $\rho=r/R_0$, the integral becomes $4\epsilon\int\rho^{-2}d\tau$. Since $h\ge h_0$ and the total angle is below $8/\epsilon^2$, this is below $32/(h_0\epsilon)$. Multiplication by the chosen coefficient eight yields exactly the exponent $256/(h_0\epsilon)$. Its large size does not imply a practical finite perturbation neighborhood, but it is a finite explicit linear bound. The causal Gronwall estimate then bounds every center velocity tangent and makes its acceleration integrable. Its velocity has a finite limit, while its position may grow linearly.

## Phase interpretation and scope

For the idealized complete-history phase variation, after removing a common rotation the two prescribed positions can be written $Q(\delta/2)x$ and $-Q(-\delta/2)x$. Their center is $\sin(\delta/2)Jx$ and their relative half-separation is $\cos(\delta/2)x$. Thus the first-order input lies in the center sector and the relative change begins at second order; physical velocities transform consistently. This algebra does not say the evolved center tangent continues to equal $Jx$, and does not establish that historical tokens define this complete differentiable family. The subject preserves that distinction.

The accepted result controls the global center-velocity first variation along every actually admitted slow mirror reference, including a reference with zero terminal radial speed. It does not prove nonlinear full-Cartesian robustness, bound the full nonlinear coupling or historical remainder, certify positive terminal speed, or establish historical-source membership. Falsifiers are an omitted clock/source term, a failure of the explicit supplied-source coverage, a scaling mismatch, or violation of the causal integral bound. No new numerical target or process was launched.
