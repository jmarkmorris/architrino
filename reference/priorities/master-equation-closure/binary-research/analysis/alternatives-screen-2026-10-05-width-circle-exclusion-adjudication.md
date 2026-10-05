# Coordinator assessment of the complete finite-width circle exclusion

**Disposition: accepted computer-assisted derived exclusion on the stated compact domain, conditional on the explicit arithmetic assumptions.** This assessment reconstructs the equation and bounds independently of the diagnostic search. The coordinator read the frozen mathematical protocol and interval implementation before its pilot, read the cover driver before its target, and then inspected the [completed result](alternatives-screen-2026-10-05-width-circle-exclusion-result.md), receipt and immutable source identities. The unchanged diagnostic values are not premises.

## Independent mathematical reconstruction

For a complete antipodal circle, each self or partner chord obeys $R d_r=r^2/2$. Both source ages are supported in $0\le\tau\le2R+h$. The self radial input is nonnegative, while the opposite-polarity partner input is inward. Substitution $\theta=\beta\tau/R$, $z=r^2/R^2$, $u=\rho/R$ gives the exact signed radial residual

$$
F_2=\beta^2+\frac1{2\beta h}\int\left[
\frac{z_s}{(z_s+u^2)^{3/2}}W\!\left(\frac Rh(\sqrt{z_s}-\theta/\beta)\right)
-\frac{z_p}{(z_p+u^2)^{3/2}}W\!\left(\frac Rh(\sqrt{z_p}-\theta/\beta)\right)
\right]d\theta,
$$

where $z_s=2(1-\cos\theta)$, $z_p=2(1+\cos\theta)$ and $W(t)=(1-|t|)_+$. This verifies the prefactor, polarity and both full source channels. A common phase endpoint above $\beta_+(2+h/R_-)$ includes all support throughout a parameter box; extending an individual support adds zero. Radial balance requires $F_2=0$, independently of the tangential equation.

For the interval range, $G(z,u)=z/(z+u^2)^{3/2}$ decreases with $u>0$, increases with $z$ through $2u^2$ and then decreases. Endpoint minima and the enclosed internal maximum therefore suffice. The triangular window and square-root chord bounds cover cusps and support corners by ranges, without assuming differentiability. Signed interval multiplication after subtracting the two positive channel integrals is necessary and present.

The analytic small-radius bound follows by replacing the partner numerator with $2R$ and denominator with $\rho^3$, bounding the window by $1/h$, and integrating the entire length $2R+h$. It gives $\beta^2\le2R^2(1+2R/h)/\rho^3$ as a necessary balance condition. For all four laws, at $R\le1/512$ the right side is at most $9/4<\pi^2/4$. This is an independent all-small-radii exclusion, not an extrapolation of the numerical rectangle.

The complete-age logarithmic bound follows from $g(r)=r^2/(r^2+\rho^2)^{3/2}\le2/(5\rho)$ and $g(r)\le1/r$ on positive $r$, retaining the full source-age support. The separate [triangular-window sharpening](alternatives-screen-2026-10-05-width-circle-exclusion-analytic-window.md) also checks directly: for $\tau>h$, $\tau W((r-\tau)/h)\le r$. Integrating the constant bound up to $\max(h,5\rho/2)$ and $1/\tau$ thereafter proves its displayed $U_\triangle(R)$. The rational logarithm bounds exclude $\beta\ge13/2$ for $(h,\rho)=(1/16,1/32)$ and $\beta\ge7$ for $(1/16,1/64)$ at $R\le2$. This sharpening was not used by the frozen cover and remains a separate analytical result.

## Arithmetic and coverage assessment

The coordinator inspected the complete interval source `fc6a985d0b1e9e71fb6b03fb932296ec6d2173ec962833630108e67f49186145`. Its elementary operations and square root expand outward. Exact rational alternating Machin bounds enclose $\pi$. Any chosen integer range-reduction index is valid once the resulting interval is checked inside $(-4,4)$; its selection with a floating approximation to $\pi$ therefore supplies no unproved trigonometric bound. The degree-40 cosine polynomial, remainder $4^{41}/41!$ and phase half-width enclose each entire phase cell. Positive reductions use a full $\gamma_{n-1}$ addition bound, not a single final rounding step. These observations establish the formula's implementation subject to correctly rounded finite IEEE binary64 basic operations and square root, gradual underflow, and the documented reduction assumption. The recorded known controls preceded every target and compare against exact rational or closed-form answers.

The separately frozen cover source `a5dee699e74b863db8d5f262a1fe5e89167e150e2183339c7e1375315f967c78` constructs 160 initial rectangles per law with exactly dyadic endpoints. Their union is $[201/128,8]\times[1/512,2]$, containing the assigned $[\pi/2,8]\times[1/512,2]$. Every split has an exact dyadic midpoint. The rational audit rebuilds endpoints from each initial root and path and requires both siblings with the same split coordinate; a leaf cannot coexist with its ancestor or descendant. Thus its accepted tree is a complete cover. Known controls accepted a three-leaf partition and rejected missing, overlapping and altered-endpoint leaves before the target. The coverage audit is mechanical evidence distinct from the analytical residual proof.

The coordinator's `jq` inspection of the retained target receipt found 1,254 processed rectangles, 947 excluded leaves, zero unresolved leaves and a successful audit of all 640 initial roots. Its smallest lower residual is $0.006288992633606937$. `shasum -a 256` confirmed receipt identity `fe35060409cb6f099458715da019cebd9d5156a86a371eb556c0468dc41923de` and both source identities above. The receipt records completion at 18:06:49.979768 UTC and 5.7247046660631895 elapsed seconds. Those are measured execution facts, not estimates inferred from box counts. Replaying the same arithmetic would only reproduce this calculation; the independent mathematical evidence is the reconstruction of the integral, interval ranges, analytic masks and full-cover invariant.

## Admitted conclusion and boundaries

For each fixed $(h,\rho)\in\{1/16,1/32\}\times\{1/32,1/64\}$ with $K_{ij}=c_f=1$, complete antipodal uniform circles are excluded on $\pi/2\le\beta\le8$, $1/512\le R\le2$. Joining the independent small-radius theorem excludes all $0<R\le2$ on that speed interval. The earlier positive-tangential theorem separately excludes every radius at $0<\beta\le\pi/2$. Thus for these four fixed laws there is no antipodal circle at any $0<\beta\le8$ with $R\le2$, while the low-speed theorem itself has no upper radius restriction. These unions are explicit intersections of established domains; they do not extend a numerical box result by continuity or sampling.

Radii above two at higher speeds, other windows or cores, nonuniform or non-antipodal motion, compatible causal launch fate and stability remain separate questions. No spectrum is defined around a circle excluded by balance. An omitted source-age band, a wrong radial prefactor, an under-enclosed range or sum, a failed machine assumption or an incomplete rational cover would falsify the relevant step. A full balanced antipodal circle inside the admitted domain would contradict the assembled theorem. No canon or equation grade is changed.
