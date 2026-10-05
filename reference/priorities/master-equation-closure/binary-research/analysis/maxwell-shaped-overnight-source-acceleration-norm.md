# Exact delayed-source acceleration sensitivity

This coordinator derivation is fixed before any new target use. It concerns the selected ordinary E and E+M responses of [Sections 7 and 8](../../equation-variants/manuscript.md#7-complete-maxwell-shaped-transmitter-response), with $c_f=1$, $R>0$, unit $\mathbf n$, $D=1-\mathbf n\cdot\mathbf v>0$, and fixed receiving/source position and velocity inputs. It retains every delayed source-acceleration component. It is a comparison coefficient, not a stability calculation or a physical continuation rule. Target use requires an independently assessed interval implementation and complete source-error inventory; no target is supplied here.

## E singular values

Write $\mathbf v=v_n\mathbf n+\mathbf v_T$, $P_T=I-\mathbf n\mathbf n^{\mathsf T}$, and $\mathbf b=\mathbf n-\mathbf v=D\mathbf n-\mathbf v_T$. Differentiating the E response with respect to delayed source acceleration gives

$$
B=\frac{\mathbf b\mathbf n^{\mathsf T}-DI}{RD^3}
=-\frac{\mathbf v_T\mathbf n^{\mathsf T}+DP_T}{RD^3},
\qquad
BB^{\mathsf T}=\frac{\mathbf v_T\mathbf v_T^{\mathsf T}+D^2P_T}{R^2D^6}.
$$

The cross terms vanish because $P_T\mathbf n=0$. The output lies in the plane perpendicular to $\mathbf n$. In three dimensions its squared nonzero singular values are $(D^2+\|\mathbf v_T\|^2)/(R^2D^6)$ and $1/(R^2D^4)$; its third is zero. Therefore

$$
\|B\|_2=\frac{\sqrt{D^2+\|\mathbf v_T\|^2}}{RD^3}.
$$

In a planar problem the transverse subspace has dimension one and only the first nonzero singular value remains. This norm includes longitudinal input acceleration: that input contributes $-\mathbf v_T/(RD^3)$ unless the source velocity is collinear with the hit. A radial-only output diagnostic cannot assess this contribution.

## Full receiver map

For E+M write $\mathbf u=u_n\mathbf n+\mathbf u_T$ and $\alpha=1-u_n$. Its fixed receiver map is $L=\alpha I+\mathbf n\mathbf u^{\mathsf T}$. On transverse output $\mathbf z$, $L\mathbf z=\alpha\mathbf z+\mathbf n(\mathbf u_T\cdot\mathbf z)$, so its squared norm is $\alpha^2\|\mathbf z\|^2+(\mathbf u_T\cdot\mathbf z)^2$. In the planar case,

$$
\|LB\|_2=\frac{\sqrt{\alpha^2+u_t^2}\sqrt{D^2+v_t^2}}{RD^3}.
$$

For complete three-dimensional perturbations the product of these two largest norms is a valid upper bound, but need not be attained. An exact general expression follows on the two-dimensional transverse subspace. Set $V=\|\mathbf v_T\|^2$, $U=\|\mathbf u_T\|^2$, $C=\mathbf u_T\cdot\mathbf v_T$, and

$$
\mathcal T=\alpha^2(2D^2+V)+D^2U+C^2,
\qquad
\mathcal P=\alpha^2(\alpha^2+U)D^2(D^2+V).
$$

The two transverse squared singular values of $LB$, multiplied by $R^2D^6$, have trace $\mathcal T$ and product $\mathcal P$. They are nonzero on the selected strictly subfield receiver domain; the formula also permits a degenerate algebraic receiver map outside that domain. This follows by composing the transverse positive matrices $D^2I_T+\mathbf v_T\mathbf v_T^{\mathsf T}$ and $\alpha^2I_T+\mathbf u_T\mathbf u_T^{\mathsf T}$; their product has the same nonzero eigenvalues as the corresponding symmetric positive composition. Thus

$$
\|LB\|_2^2=\frac{\mathcal T+\sqrt{\mathcal T^2-4\mathcal P}}{2R^2D^6}.
$$

This formula assumes the actual unit direction and orthogonal projections, rather than treating independently expanded Cartesian direction intervals as if they were exactly unit. An interval implementation may enclose these constrained scalar invariants, or use the conservative product bound; it must not discard off-plane input or output components.

## Analytical controls and limitation

At a stationary source, $D=1$, $\mathbf v_T=0$, and $B=-P_T/R$, so E's norm is exactly $1/R$. With zero receiver velocity the full map is the identity and gives the same norm. In a planar transverse-velocity case, direct multiplication of the single output column recovers the planar formula above. For a three-dimensional adversarial control take $R=D=\alpha=1$, $\mathbf v_T=(v,0)$ and $\mathbf u_T=(0,w)$ in transverse coordinates. The exact squared full norm is $\max(1+v^2,1+w^2)$, while the product upper bound is $(1+v^2)(1+w^2)$; they differ for nonzero $v,w$. This checks that the product is not mislabeled as an exact three-dimensional norm.

**Derived coefficient identity; separate assessment and numerical target use pending.** It can sharpen a completed-source acceleration forcing coefficient, but cannot remove receiving-position/root sensitivity, actual-source X/V uncertainty, or the neutral history obligation. The broader receiving-test proof-bound account identifies spatial channels as dominant; this identity alone promises no certificate closure or cost reduction. A direct singular-value calculation contradicting these formulas on an admitted input, or an implementation losing an allowed transverse component, falsifies the corresponding identity or application.

## Independent analytical disposition

The independent worker fixed a source-acceleration matrix from its separately differentiated potential response before reading this source. In an orthonormal hit frame it reconstructs the transverse E matrix, composes the receiver map explicitly, and obtains the same trace, determinant and planar/general singular values. It independently checked the stationary, zero-receiver, planar and orthogonal-transverse controls. **Accepted derived coefficient identities:** the result sharpens a possible forcing coefficient only when its actual unit-direction and completed-source error premises are retained. No interval instrument or trajectory target is supplied by this assessment. The original pending label remains freeze chronology, and the [independent reference](maxwell-shaped-overnight-independent-reference.md) records its separate reconstruction.

## Realized planar acceleration contribution: prospective diagnostic

Freeze this corollary before a numerical projection target. Sensitivity norm and source-acceleration norm are distinct from the realized acceleration-dependent contribution. In a physical planar orthonormal hit frame, put $N=v_ta_n+Da_t$. The signed E contribution from source acceleration alone has components $(0,-\sigma K N/(RD^3))$. The full contribution is $-\sigma K N(u_t,1-u_n)/(RD^3)$. Thus their actual magnitudes at the same complete input are

$$
|F_a\mathbf a_s|_E=\frac{K|N|}{RD^3},\qquad
|F_a\mathbf a_s|_{E+M}=\frac{K|N|\sqrt{u_t^2+(1-u_n)^2}}{RD^3}.
$$

On the strict subfield receiver domain, $1-u_n>0$, so both are nonzero exactly when $N\ne0$. A nonzero source acceleration with $a_t=-v_ta_n/D$ lies in the map's null direction. This is why a positive source-A magnitude is insufficient. In a diagnostic, every physical n, source velocity and acceleration, receiving velocity, range and denominator must range over the entire actual input/root enclosure, with source X/V/A errors on all closed intersecting completed bins. Norm bounds for the input alone cannot substitute for this projection. No actual source jerk is required.

Known controls must precede target use. For $R=2$, $D=1$, source velocity zero and source acceleration $(0,0.03)$ in the hit frame, the E contribution has magnitude $0.015$. Receiver components $(0.2,0.3)$ give full magnitude $0.015\sqrt{0.73}$. For $v_n=0,v_t=0.2,a_n=0.5,a_t=-0.1$, the source acceleration is nonzero but $N=0$, and both realized contributions vanish exactly. The prospective target cases are the unchanged independently admitted original full checkpoint at 38 and, if time permits, original E checkpoint at 50; each uses its own complete history and conservative actual input enclosure. There is no identical-history comparison between those two separately coupled futures.

**Derived prospective corollary; independent projection and target assessment pending.** A missed source bin, nonphysical frame, omitted receiving/root uncertainty, null interval containing zero reported as positive, or failed control falsifies its application. A positive contribution would confirm realized neutral input at that checkpoint, but would not establish dominance, capture, later fate or a terminal event.

The equation worker subsequently assessed this generic corollary read-only before any target values were supplied. It accepted the physical-frame map, null direction, strict-domain multiplier and complete actual input/source obligations. The independent worker separately fixed the same map and an acceleration-error support-function bound before reading this subject; its prospective postprocessor must pass transverse and exact nonzero-null-source controls before target. **Accepted derived diagnostic identity; numerical application remains pending.**

## Independently checked actual endpoint projections

The [independent projection postprocessor](../evidence/maxwell-shaped-overnight-independent-realized-source-A.py), SHA `c6eebf2b05a8648d1704907e324ecd4e133529046d6b74383f9782d4e7bd9900`, passed stationary transverse, full turning, affine nonzero-acceleration null-direction, nonzero-error and closed-source controls before targets. It reconstructs comparison jets by its separately authored Gaussian history, expands actual receiving X/U and source X/V over the inherited entire final-bin emission interval, and encloses the nominal source-A projection there. A whole-bin Euclidean acceleration error $p_a$ contributes at most $p_a\sqrt{v_t^2+D^2}$ to the scalar projection error. The physical normalized separation determines the frame; no independent arbitrary direction is declared unit, and no actual source jerk is inferred.

The original full strict-v8 checkpoint at 38 uses every closed intersecting source bin 10760–10763. The separately admitted original E restriction at 50 uses bins 13753–13760. Immutable tube, row and original-history hashes are retained in `reviewed-full-T38-realized-source-A.json` and `reviewed-E-T50-realized-source-A.json` under the independent binary runtime owner. Their exact rational output intervals are enclosed by the widened readable bounds

$$
0.51366<|F_a\mathbf a_s|_{E+M}(38)<0.61101,
\qquad
0.01660<|F_a\mathbf a_s|_E(50)<0.01843.
$$

Root separately assessed the complete source against the previously fixed matrix corollary and the equation worker's adversarial generic review, checked the actual mirrored signs and endpoint/source/root inventory, and reran known controls only into `realized-source-A-known-review.json`. A separate exact-Fraction containment check passed the known one-third and false-enclosure cases before validating these widened decimals. That arithmetic replay validates formatting/control scope; the independently fixed physical-map derivations and whole-input interval proof provide the mathematical evidence.

**Computer-assisted derived actual endpoint feedback:** the realized acceleration-dependent contribution is nonzero at these separate original coupled checkpoints, with all source-acceleration and root uncertainty retained. These are not identical-history comparisons between the two laws, whole-future bounds, dominance estimates or terminal-fate certificates. A failed input/row binding, missing closed source bin, wrong physical projection or invalid source-A support bound would falsify the corresponding application. Earlier norm-only diagnostics retain their narrower meaning.
