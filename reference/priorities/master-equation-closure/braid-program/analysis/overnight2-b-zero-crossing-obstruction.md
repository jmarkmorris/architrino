# A delayed-height sign obstruction at a zero crossing

## Canonical zero-height identity

Claim grade: derived, pending independent reconstruction. This pointwise argument applies to the canonical equation with $K=c_f=1$ and all ordinary positive-delay roots, including self roots. Unlike the earlier midpoint mean theorem, it needs neither a radius/phase reflection symmetry nor below-wake-speed motion.

Use normalized time $\tau=t/R$ and complete six-member paths
$$
X_j(t)=R\bigl(\rho(\phi)\cos[\beta\tau+j\pi/3+p(\phi)],\rho(\phi)\sin[\beta\tau+j\pi/3+p(\phi)],(-1)^jz(\phi)\bigr),\qquad \phi=\kappa\tau,
$$
with $R,\kappa>0$, positive bounded radius, bounded real height, and $C^2$ profiles. The radius and phase correction may have arbitrary relative phase and shape. Assume the complete causal-root sum at the reception under consideration is finite and ordinary, with no zero source divisor; this assumption does not truncate or omit any root. Write $\Delta_b>0$ for each normalized delay, $D_b$ for its signed source divisor, and $\sigma_b=(-1)^{j_b}$ for its partner polarity, with $\sigma_b=+1$ for self. The dimensionless axial sum is exactly
$$
A_z(\phi)=\sum_b\frac{\sigma_bz(\phi)-z(\phi-\kappa\Delta_b)}{\Delta_b^3|D_b|}.
$$
At a zero height $z(\phi_0)=0$, every polarity disappears from the numerator:
$$
\boxed{A_z(\phi_0)=-\sum_b\frac{z(\phi_0-\kappa\Delta_b)}{\Delta_b^3|D_b|}.}
$$
All weights are strictly positive. This identity retains the canonical absolute divisor and every self/partner root; no receiver factor, cap or event rule is introduced.

If every sampled past height is nonnegative and at least one is strictly positive, then $A_z(\phi_0)<0$. Exact balance requires $A_z=R\kappa^2z''$, so it forces $z''(\phi_0)<0$. If the prescribed zero has $z''(\phi_0)\ge0$, no exact history is possible. Reversing all height signs reverses both inequalities. In particular, a zero that is also an inflection requires either both signs among the sampled past heights or zero at every sampled height. A one-signed delayed height list containing a nonzero value cannot satisfy that zero-inflection balance.

The condition is on emitted heights in the common profile, not on source axial coordinates after multiplication by member parity. Confusing those two signs would destroy the identity.

## A preceding sign interval and a diameter criterion

Suppose $z(\phi_0)=0$, $z''(\phi_0)\ge0$, and $z(\phi)>0$ throughout the preceding phase interval $(\phi_0-L,\phi_0)$, where $L>0$. If every positive root at that reception obeys $\kappa\Delta_b<L$, all its emitted heights are positive and the exact equation is impossible. Thus an exact ordinary history with this zero curvature must have at least one root reaching phase lag $L$ or more. This is a necessary delay reach, not permission to ignore such a root.

Let $\rho\le r_+$ and $|z|\le Z$ on the complete histories. Every root satisfies
$$
\Delta_b=|X_0(t)-X_{j_b}(t-R\Delta_b)|/R\le d_+:=2\sqrt{r_+^2+Z^2}.
$$
This is a global diameter bound, independent of velocity and valid for every positive self and partner root. Therefore
$$
\kappa d_+<L
$$
is a sufficient exclusion condition at the stated zero. At least one positive partner root exists: the unsquared gap is positive at zero delay because the equal-time planar partner chord is nonzero, and negative beyond the bounded diameter. Continuity supplies a root. The assumed ordinary complete chart makes its positive weight legitimate. Nonmonotone gaps may supply additional roots; all of them satisfy the same diameter bound and sign, so they cannot cancel the contradiction.

This proof does not establish that an arbitrary high-speed parameter point has an ordinary finite chart. It establishes that any point which does have such a chart and satisfies the remaining conditions cannot be an exact solution. A nonordinary point has no admissibility conclusion from this theorem.

## Cosine and larger non-sinusoidal families

For $z(\phi)=H\cos\phi$, $H>0$, take $\phi_0=\pi/2$ and $L=\pi$. Then $z(\phi_0)=z''(\phi_0)=0$ and $z$ is strictly positive throughout the preceding interval. The exact axial sum at this reception is
$$
A_z(\pi/2)=-H\sum_b\frac{\sin(\kappa\Delta_b)}{\Delta_b^3|D_b|}<0
$$
whenever every root has $0<\kappa\Delta_b<\pi$. Thus cosine height is excluded without any symmetry restriction on radius or phase correction. It is enough to verify the delay condition at that one reception. The global sufficient condition is $2\kappa\sqrt{r_+^2+H^2}<\pi$.

More generally, let $z$ be even and anti-periodic, $z(\phi+\pi)=-z(\phi)$, with $z>0$ on $(-\pi/2,\pi/2)$. Evenness and anti-periodicity imply $z(\pi-\phi)=-z(\phi)$. Differentiating twice gives $z''(\pi-\phi)=-z''(\phi)$, so $z(\pi/2)=z''(\pi/2)=0$. The same one-reception exclusion applies. No first-quarter concavity is required, and the radius/phase profiles need not share this reflection center.

For example, with $z=H\cos\phi+e\cos3\phi$,
$$
z(\phi)=\cos\phi\,[H+e(4\cos^2\phi-3)].
$$
The sufficient condition $H>3|e|$ makes the bracket positive throughout the required half-cycle. The weaker exact piecewise conditions are $H-3e>0$ for $e\ge0$ and $H+e>0$ for $e<0$. The height bound is $Z\le H+|e|$. These conditions permit much larger third harmonics than the earlier sufficient curvature comparison; the conclusion here is a pointwise exclusion rather than its positive work-mean margin.

As an explicit enlargement of the original low-speed box, allow
$$
\rho=1+a\cos2\phi+b\sin2\phi,\quad p=c\cos2\phi+d\sin2\phi,\quad z=H\cos\phi+e\cos3\phi,
$$
$$
|a|,|b|\le0.06,\quad |c|,|d|\le0.1,\quad |e|\le0.04,
\quad H\in[0.25,0.75],\quad\beta\in[0.15,0.5],\quad\kappa\in[0.08,0.35].
$$
This is the independently admitted original coefficient box with the third-sine height coefficient set to zero. Its complete ordinary chart is already established. Here $r_+\le1.12$, $Z\le0.79$, and $H-3|e|\ge0.13>0$. The diameter is below 2.75 because $4(1.12^2+0.79^2)=7.514<2.75^2$. Hence $\kappa d_+<0.9625<\pi$. The entire displayed region is excluded at every scale, with unrestricted radius and phase asymmetries inside those bounds. This conclusion follows from the zero-crossing identity, not from the earlier failed full-vector searches.

## Relation to the earlier sign-change necessity

The first overnight allocation proved that a nonzero exact periodic height on a finite ordinary complete chart must change sign, using a global minimum and a differential inequality. The present statement begins at a zero of a sign-changing profile and constrains the curvature and how far its causal roots must reach into previous sign intervals. It therefore supplies an additional necessary condition within the class left open by the earlier theorem. It does not claim that every sign-changing waveform has a zero inflection or the required one-signed delayed list.

## Scope, falsifiers and preservation

A wrong parity cancellation, nonpositive canonical weight, omitted root, missing positive partner, invalid diameter bound or wrong zero curvature would defeat the corresponding proof. An exact history with all stated assumptions and no root reaching the preceding sign boundary would falsify the exclusion. General asymmetric height profiles may have negative curvature at a descending zero, consistent with this necessary condition, and remain open. Roots reaching earlier sign lobes may cancel and also remain open.

No numerical instrument is needed for this derivation. The earlier accepted all-past chart is a named dependency only for the explicit low-speed coefficient application; the general implication is conditional on a complete finite ordinary chart. The subject awaits independent adjudication and integration in the second overnight B account. Prior subjects, references, evidence and shared owners remain unchanged.
