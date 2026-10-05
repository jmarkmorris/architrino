# Continuous error enclosure for the selected Maxwell-shaped histories

This source states a conditional comparison theorem and the missing numerical obligations for the [overnight investigation](maxwell-shaped-overnight-investigation.md). It is not a certified error bound for any retained trajectory. The subject and independent numerical sources remain separate and frozen. The equation is E or E+M from manuscript Sections 7–8, with $K=c_f=1$, opposite polarity, complete planar mirror preparation, every ordinary partner root and the geometrically absent positive-delay self channel. No continuation law is added.

## 1. A retained history and an actual solution answer different questions

Let $\widehat{\mathbf q}$ be one retained position history whose first and second derivatives supply velocity and acceleration. A continuum defect bound on an interval $I$ is

$$
\|\widehat{\mathbf q}''(T)-\mathcal F[\widehat{\mathbf q}](T)\|\le\eta(T),\qquad T\in I.
$$

The selected neutral history functional $\mathcal F$ includes the delayed source acceleration at its actual causal root. Quarter-point defects are samples, not the displayed bound. Knot accelerations assigned from the response are identities, not a defect enclosure. Small seams between independently retained polynomials must either be enclosed in a comparison with their piecewise jets or repaired in a separately declared comparison history; they cannot silently be called exact $C^2$ continuity.

The comparison below assumes exact matching complete past, a $C^{2,1}$ comparison history, and an actual compatible solution on a provisional regular tube. An independently bounded past mismatch can be included as the initial error inventory. The complete supplied past is never replaced by a finite list of position/velocity samples.

## 2. Root shift and source-jet shift

**Derived conditional estimate.** On the provisional tube require positive range $R\ge R_*>0$, transmitter denominator $D\ge d_*>0$, positive delay $\tau\ge\tau_*>0$, and complete comparison speed $\|\widehat{\mathbf q}'\|\le b<1$. Write errors at a reception event as $p=\|\mathbf q-\widehat{\mathbf q}\|$, $v=\|\mathbf q'-\widehat{\mathbf q}'\|$, $a=\|\mathbf q''-\widehat{\mathbf q}''\|$. Source errors $p_s,v_s,a_s$ are evaluated at the actual solution's emission time. Let $\Delta S$ be the difference between the two roots. The comparison gap has derivative at least $1-b$, and its residual at the actual root is at most $p+p_s$. Consequently

$$
|\Delta S|\le\frac{p+p_s}{1-b}.
$$

For comparison acceleration and acceleration-Lipschitz bounds $A_*,J_*$ on the source interval,

$$
\|\Delta\mathbf v_s\|\le v_s+A_*|\Delta S|,\qquad
\|\Delta\mathbf a_s\|\le a_s+J_*|\Delta S|.
$$

The unit-range vectors obey the safe normalization estimate

$$
\|\Delta\mathbf n\|\le\frac{2}{R_*}\left[p+p_s+b|\Delta S|\right],
\qquad |\Delta R|=|\Delta S|.
$$

These estimates use comparison-source Lipschitz constants when shifting its emission time; no bound on actual jerk is inferred from its speed. The ordinary-root theorem separately ensures the complete partner census and absence of self roots while the full history remains uniformly subfield.

## 3. Response sensitivities and a method-of-steps enclosure

The delayed-acceleration derivative can be bounded directly. For one hit with polarity sign $\sigma$ its E matrix is

$$
B_E=\frac{\sigma K}{RD^3}\left[(\mathbf n-\mathbf v)\mathbf n^\mathsf T-DI\right].
$$

Resolve source acceleration into its component along $\mathbf n$ and its perpendicular component. Write $\mathbf v_\perp=\mathbf v-(\mathbf n\cdot\mathbf v)\mathbf n$. The bracket maps these components to $-\mathbf v_\perp a_\parallel-D\mathbf a_\perp$, entirely perpendicular to $\mathbf n$. Its exact Euclidean operator norm is therefore

$$
\|B_E\|=\frac{K\sqrt{D^2+\|\mathbf v_\perp\|^2}}{RD^3}.
$$

Indeed the product with its transpose on the transverse plane is $D^2I+\mathbf v_\perp\mathbf v_\perp^\mathsf T$. For E+M, multiply this matrix by $L_u=(1-\mathbf u\cdot\mathbf n)I+\mathbf n\mathbf u^\mathsf T$. On the transverse plane $L_u\mathbf w=(1-\mathbf u\cdot\mathbf n)\mathbf w+\mathbf n(\mathbf u_\perp\cdot\mathbf w)$, so the safe product bound is

$$
\|B_{E+M}\|\le\|B_E\|\sqrt{(1-\mathbf u\cdot\mathbf n)^2+\|\mathbf u_\perp\|^2}.
$$

An enclosed singular value of the actual product may sharpen this bound. These norm identities assume a unit direction. An unconstrained interval box or a straight interpolation between two unit directions can contain nonunit vectors; its matrix must then be enclosed directly, or the comparison must use a justified componentwise path keeping the direction unit during its acceleration-variable change. The unit-direction identity cannot silently bound that larger box. On a strictly collinear input the actual source acceleration is parallel to $\mathbf n$ and $\mathbf v_\perp=0$, so its acceleration contribution vanishes; the full matrix norm still controls perturbations leaving that line. A collinear ablation therefore does not test the neutral transverse coupling.

When the comparison is confined to the selected planar mirror class, the transverse image within that plane is one-dimensional. The displayed product bound is then an equality for the planar acceleration-variable derivative: the nonzero image direction is fixed, and the receiver map multiplies its norm by exactly $\sqrt{(1-\mathbf u\cdot\mathbf n)^2+\|\mathbf u_\perp\|^2}$. This sharpness concerns a unit direction and planar input variations. It does not certify derivative boxes spanning nonunit directions or perturbations outside that plane.

Take independently enclosed response derivative norms $L_R,L_n,L_v,L_a,L_u$ on a compact box containing every intermediate response input between the two histories. They differentiate the full selected signed acceleration with respect to range, unit direction, source velocity, source acceleration and receiver velocity. The dependence of $D=1-\mathbf n\cdot\mathbf v$ belongs in these derivatives. E has $L_u=0$. For both equations source acceleration is affine; its actual matrix must be bounded rather than omitted.

### Receiver turning permits a sharper velocity-error comparison

Holding the current receiver position and complete source history fixed also fixes every partner root, direction and E input. The receiver-velocity derivative of one full hit is

$$
C_u=\sigma K(\mathbf n\mathbf E^{\mathsf T}-\mathbf E\mathbf n^{\mathsf T}),\qquad C_u^{\mathsf T}=-C_u.
$$

Its Euclidean norm is $K\|\mathbf n\times\mathbf E\|$, or $K|\det(\mathbf n,\mathbf E)|$ in the selected plane. The skew identity itself does not require a unit direction. The sum over fixed admitted hits is still skew. Let $\mathbf e_v=\mathbf q'-\widehat{\mathbf q}'$. Decompose the response difference by changing receiver velocity first at fixed comparison root/history inputs, then changing the remaining inputs while holding the actual receiver velocity fixed. The first difference is $C_u\mathbf e_v$, so $\mathbf e_v\cdot C_u\mathbf e_v=0$ exactly. An upper derivative of its norm therefore obeys

$$
D^+v(T)\le\eta(T)+C_p[p(T)+p_s]+L_vv_s+L_aa_s.
$$

The remaining derivative boxes must contain that fixed actual receiver velocity, including its tube error. This cancellation does not omit its effect on the source/position sensitivities. The acceleration-error bound still includes $L_uv(T)$, because the norm of a skew contribution need not vanish. Thus a sharper method-of-steps block uses $\mathsf p'=\mathsf v$, $\mathsf v'=C_p\mathsf p+B_j$ for position/velocity errors, while its completed acceleration bound retains $L_u\sup\mathsf v$. The more conservative block system below remains valid. No target bounds have been instantiated by this lemma; a known forced-rotation comparison and independent algebra assessment should precede its use in a new numerical enclosure.

Put

$$
C_p=\frac{L_R+L_vA_*+L_aJ_*}{1-b}
 +\frac{2L_n}{R_*}\left(1+\frac b{1-b}\right).
$$

Then the continuum acceleration comparison satisfies

$$
a(T)\le\eta(T)+C_p[p(T)+p_s]+L_uv(T)+L_vv_s+L_aa_s.
$$

This is a sufficient bound, not an optimized logarithmic-norm estimate. If a local input box can certify a sharper gap derivative along the whole interval between the roots, that derivative may replace $1-b$ in the root-shift estimate. A sampled denominator is insufficient for that replacement.

Partition the claimed future into blocks of length $h<\tau_*$. Every source in the next block then lies in a completed block. Let $P_j,V_j,A_j$ bound errors over every previously completed time that a next-block root can sample, including the complete supplied past, rather than only the immediately preceding block. Suppose the next block has defect bound $\eta_j$ and the response constants above. Set $B_j=\eta_j+C_pP_j+L_vV_j+L_aA_j$. On that block the nonnegative scalar comparison system

$$
\mathsf p'=\mathsf v,\qquad
\mathsf v'=C_p\mathsf p+L_u\mathsf v+B_j
$$

with the enclosed incoming position/velocity errors bounds $p,v$ by its explicit matrix-exponential solution. The next acceleration bound is $C_p\sup\mathsf p+L_u\sup\mathsf v+B_j$. Induction supplies a finite-interval error enclosure if every computed bound stays strictly inside the provisional geometry, speed and delay slacks. Large $L_a$ worsens the recurrence; it does not alone destroy local method-of-steps existence. A positive common delay floor prevents infinitely many steps in finite time.

**Proof scope:** comparison uses the standard integral inequalities for $p,v$, monotonicity of the scalar positive system and the previously completed source interval. A first-exit argument closes the provisional tube only after all block bounds fit its slacks. No numerical constants or block inventory have been certified here.

## 4. Obligations for the retained targets

A continuous claim for the original $C^{2,1}$ numerical preparations needs all of the following on the complete interval: an enclosed defect, source acceleration-Lipschitz constants including preparation seams, root interval arithmetic, entire-source-history speed bounds, response derivative boxes, retained-history seam errors and integration arithmetic errors. Both numerical methods currently supply independently checked finite comparisons and sampled defects. They do not yet supply this inventory or the closed tube.

A declared $0.999$ margin exit can be certified for a retained polynomial by enclosing its speed polynomial and its derivative and proving all earlier segments below the threshold. To transfer that event to the actual launched solution requires the continuous tube plus a transverse event bound. Positive radius in the numerical terminal record alone is insufficient. A late source-window cylinder may establish an event for a separately compatible release, but does not certify the original launch without its incoming-history enclosure.

**Falsifiers:** a missing delayed-acceleration term in the response Jacobian, a root interval extending outside the bounded source window, a continuum defect exceeding its declared bound, a missed seam or a block bound leaving the regular tube overturns a proposed certification. A failure of this sufficient recurrence only rejects that enclosure; it does not prove failure of the actual solution or select its fate.

## 5. Independent assessment of the sharper receiver comparison

The [independent velocity-error reconstruction](maxwell-shaped-overnight-independent-reference.md#independent-velocity-error-orthogonality-reconstruction) was fixed before this passage was read. It separately obtains the skew map from the selected receiver algebra, checks the upper norm derivative including zero velocity error, and retains the receiver-velocity term in completed acceleration-error bounds. It accepts the conditional sharper comparison, with the actual receiver velocity included in every remaining sensitivity box. This supplies no numerical source/defect bounds or closed target tube.
