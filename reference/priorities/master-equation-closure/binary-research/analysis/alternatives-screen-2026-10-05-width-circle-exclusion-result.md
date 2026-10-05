# Complete bounded radial exclusion for the four finite-width antipodal circle laws

Status: completed computer-assisted exclusion subject, 2026-10-05, pending the coordinator's separate final assessment. The mathematical enclosure method, unchanged interval implementation and complete-cover driver were independently inspected by the coordinator before their respective targets. This source reports the resulting certificate; it does not modify the preceding diagnostic search or any shared owner.

## Result and selected equation

Claim grade: derived by analytical bounds and outward interval enclosures, with the machine assumptions stated below. For each of the four fixed laws

$$
(h,\rho)\in\{1/16,1/32\}\times\{1/32,1/64\},\qquad K_{ij}=c_f=1,
$$

there is no complete all-time antipodal uniform circle with

$$
\frac\pi2\le\beta\le8,\qquad \frac1{512}\le R\le2.
$$

The full radial-balance residual is strictly positive throughout this continuous rectangle. The proof does not require a tangential sign or a sampled zero search. The prior analytical small-radius bound additionally excludes $0<R\le1/512$ at every $\beta\ge\pi/2$, so it joins this certificate without a gap in radius. These are complete boundary-history statements. They do not assert capture from a prescribed past, causal release behavior, stability, noncircular fate or a global classification over all speeds and radii.

The selected reception window and softened acceleration denominator are

$$
\delta_h(z)=\frac1h\left(1-\frac{|z|}{h}\right)_+,
\qquad (r^2+\rho^2)^{3/2}.
$$

At receiver $(R,0)$ and reception time zero, set $\omega=\beta/R$ and $\theta=\omega\tau$. The complete self and opposite-polarity partner displacements are

$$
\mathbf d_s=R(1-\cos\theta,\sin\theta),\qquad
\mathbf d_p=R(1+\cos\theta,-\sin\theta).
$$

With $r_j=|\mathbf d_j|$, the acceleration is exactly

$$
\mathbf A=\int_0^{2R+h}\left[
\frac{\mathbf d_s\,\delta_h(r_s-\tau)}{(r_s^2+\rho^2)^{3/2}}
-\frac{\mathbf d_p\,\delta_h(r_p-\tau)}{(r_p^2+\rho^2)^{3/2}}
\right]d\tau.
$$

All older ages give zero because both chord lengths are at most $2R$. Self input has sign $+1$ and partner input sign $-1$; neither channel is omitted. A circle requires $A_t=0$ and $A_r=-\beta^2/R$. Therefore the residual $F_2=RA_r+\beta^2$ must vanish. The certificate proves that it does not.

## Exact residual and enclosure theorem

Define $q_s^2=2(1-\cos\theta)$, $q_p^2=2(1+\cos\theta)$, $u=\rho/R$, $v=R/h$, $G(z,u)=z/(z+u^2)^{3/2}$ and $W(x)=(1-|x|)_+$. On any parameter rectangle, choose a common phase endpoint satisfying $\Theta\ge\beta_+(2+h/R_-)$. Then

$$
F_2=\beta^2+\frac1{2\beta h}\int_0^\Theta\left[
G(q_s^2,u)W\!\left(v\left(q_s-\frac\theta\beta\right)\right)
-G(q_p^2,u)W\!\left(v\left(q_p-\frac\theta\beta\right)\right)
\right]d\theta.
$$

The factor follows directly from $R d_{r,j}=r_j^2/2$ and $d\tau=R\,d\theta/\beta$. Extending each actual support to the common endpoint adds only zero. The complete age integral is thus represented without root selection or a sharp-window substitution.

The [frozen mathematical protocol](alternatives-screen-2026-10-05-width-circle-exclusion-protocol.md) proves the analytical masks and specifies outward interval integration. On each exact dyadic phase cell, interval ranges enclose both chords, every triangular support or central corner, and every chord cusp. No cell is integrated under an unverified smoothness assumption. The range of $G$ uses its decrease in positive $u$ and its unique maximum at $z=2u^2$. The possibly signed difference of channel integrals is multiplied by its common positive prefactor using signed interval arithmetic.

The [interval reference](../evidence/alternatives-screen-2026-10-05-width-circle-exclusion-interval.py) expands binary64 basic operations and square root outward with `nextafter`. Its certificate assumes correctly rounded IEEE basic operations and square root with gradual underflow, finite values, and floating reduction by no more than $n-1$ rounded additions for $n$ nonnegative terms. The complete reduction error is expanded by $\gamma_{n-1}$, rather than one last-place step around a whole sum. Cosine uses an outward rational Machin enclosure for $\pi$, a degree-40 Taylor polynomial after checked range reduction, and the analytic remainder plus the phase-cell half-width. Floating trigonometric or logarithm evaluations do not supply bounds. These explicit arithmetic assumptions are part of the claim.

The earlier analytic small-radius mask follows from the nonnegative self radial contribution and the partner upper bound:

$$
\beta^2\le\frac{2R^2}{\rho^3}\left(1+\frac{2R}{h}\right)
$$

is necessary for a circle. At $R\le1/512$ its right side is at most $9/4$ for all four laws, below $\pi^2/4$. The second mask uses the protocol's complete-age logarithmic upper bound on inward radial input. The separately derived [triangular-window sharpening](alternatives-screen-2026-10-05-width-circle-exclusion-analytic-window.md) is useful additional analysis but was not used in the frozen cover, so the numerical certificate does not depend on it.

## Known-first controls and complete parameter coverage

Claim grade: measured verification of the named instruments, with independent mathematical references. The interval reference passed its known cases at 17:52:31 UTC: exact rational arithmetic comparisons, the square-root enclosure of two, signed division across zero, rational Machin bounds, known cosine inequalities, a 10,001-term reduction against exact rational addition, and the independently known constant-chord stationary softened response for all four laws. Stationary enclosures contained their exact references and narrowed under phase refinement. These tests preceded the pilot and full circle targets. The earlier diagnostic instrument separately passed stationary, zero-speed and affine-self controls; its measured grid and optimizer outputs are not an oracle for this certificate.

The pilot completed at 17:55:56 UTC in 0.2202 seconds: 27 of 36 broad boxes were excluded and nine remained unresolved. This was a feasibility measurement, not a complete cover. The coordinator subsequently inspected the unchanged interval implementation, the [complete-cover execution contract](alternatives-screen-2026-10-05-width-circle-exclusion-cover-protocol.md) and the [cover driver](../evidence/alternatives-screen-2026-10-05-width-circle-exclusion-cover.py).

The cover driver passed its known cases at 18:01:17 UTC. An exact three-leaf partition was accepted. Deleting a child, adding an overlapping ancestor, or altering an endpoint was rejected. The driver also verified the frozen reference, protocol and earlier known-control receipt before its target.

The initial cover consists of 640 rectangles: 160 for each law. Speed endpoints are $(3216+823j)/2048$, $j=0,\ldots,16$, and radius shells are $[2^k,2^{k+1}]$, $k=-9,\ldots,0$. Their union is exactly $[201/128,8]\times[1/512,2]$, slightly enlarging the requested speed domain since $201/128<\pi/2$. All subdivisions use exact dyadic midpoints. The final coverage audit independently reconstructs each leaf from its initial root and path using exact rational arithmetic, requires both siblings at each internal node, rejects overlaps or wrong endpoints, and requires every initial root. Thus the audit establishes complete parameter coverage, separately from the interval residual bounds.

The full target completed at 18:06:49.979768 UTC after 5.7247 seconds. Its process exited normally. It processed 1,254 rectangles and produced 947 excluded final leaves, zero unresolved leaves and a passed coverage audit for all 640 initial roots. No processing, depth, wall-time or science cutoff was reached. Every interval leaf used phase density $N=256$; the maximum subdivision depth was five. The following table is measured from the retained target receipt using `jq` grouping by the exact law pair.

| $h$ | $\rho$ | Excluded leaves | Interval leaves | Analytical leaves | Minimum certified lower $F_2$ |
| --- | --- | ---: | ---: | ---: | ---: |
| $1/16$ | $1/32$ | 182 | 97 | 85 | 0.013463449478149413 |
| $1/16$ | $1/64$ | 232 | 179 | 53 | 0.013325738906860351 |
| $1/32$ | $1/32$ | 228 | 171 | 57 | 0.006288992633606937 |
| $1/32$ | $1/64$ | 305 | 273 | 32 | 0.012171158899193733 |

These minima are conservative enclosure margins, not measured physical extrema. The weakest leaf has $(h,\rho)=(1/32,1/32)$, $\beta\in[2.3740234375,2.77587890625]$ and $R\in[0.03125,0.03515625]$. Its 2,132 phase cells yield $F_2\in[0.006288992633606937,10.395319285162074]$. Its positive lower endpoint is sufficient even though the enclosure is broad.

## Frozen provenance and reproduction

The SHA-256 identities below were measured with `shasum -a 256`. Bulk receipts remain local provenance under the ignored owner `.local-data/master-equation-closure/binary-research/`; they are not fresh-checkout dependencies or independent references. The tracked protocols and reproducers specify the derivation and computation.

| Source | SHA-256 |
| --- | --- |
| Mathematical protocol | `a75663155b367dc11f7778d21d9cf2ea57c56f089c17ffff3b85afc637c3e719` |
| Interval reference | `fc6a985d0b1e9e71fb6b03fb932296ec6d2173ec962833630108e67f49186145` |
| Cover execution contract | `eb24b7072b2237417c0699c2906dce6d9a9b67c0277212a5e14eed55b1f1788b` |
| Cover driver | `a5dee699e74b863db8d5f262a1fe5e89167e150e2183339c7e1375315f967c78` |
| Additional triangular-window derivation | `5d90b8d2235b73cb9dcf2958b8eb6cbf6657147535cdb6849a477d4027beddb2` |

All receipt basenames begin `alternatives-screen-2026-10-05-width-circle-exclusion-`.

| Receipt suffix | SHA-256 |
| --- | --- |
| `known.json` | `4812c3766b99854bc8caf69bc140b7cc709d9db8a897c89c9788600d4ccab70f` |
| `pilot.json` | `0a93b2e0032bdcb2e6c59129e706c16a2cc50350a008664d267bb647a6056e98` |
| `cover-known.json` | `dfe2a02ff6b4a41ec6986834921b895ddedc1302ae3c7e864a312b5e94420cb4` |
| `cover-target.json` | `fe35060409cb6f099458715da019cebd9d5156a86a371eb556c0468dc41923de` |

From the repository root, with a fresh receipt owner, the reproduction sequence uses the mandated environment:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-width-circle-exclusion-interval.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-width-circle-exclusion-interval.py pilot
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-width-circle-exclusion-cover.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-width-circle-exclusion-cover.py target
```

The instruments refuse to overwrite existing receipts and retain the assignment's fixed science cutoff. A later rerun needs a separately frozen successor with new output names and a newly authorized runtime bound; the frozen evidence must remain intact. Receipt timestamps and wall times are naturally run-specific. The substantive comparison concerns complete cover, enclosure signs and source identity.

## Limits and falsifiers

There are no unresolved boxes in the assigned rectangle. Radii above two, speeds beyond eight outside the already derived analytical regions, different window/core laws, non-antipodal or nonuniform motions, and dynamical stability remain outside this result. The preceding positive-tangent exclusion for $0<\beta\le\pi/2$ remains a distinct analytical theorem; the current higher-speed certificate does not assume that tangent stays positive, and the earlier diagnostic sign change is compatible with this radial obstruction.

An operator-checkable falsifier is an antipodal circle satisfying the full selected integral and radial balance inside any certified box. More locally, an incorrect factor in the phase residual, a nonzero source contribution beyond $2R+h$, a failure of a documented outward enclosure or reduction assumption, a missing corner-containing phase cell, or a missing parameter region in the rational leaf audit invalidates the corresponding proof step. Replaying the same code is only reproducibility. The independent evidence is the explicit mathematical inequalities and known closed-form controls, together with the coordinator's separate reconstruction of the frozen method and implementation.
