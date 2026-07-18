# Implications of a Separated Primitive and Effective Speed

## Finding

Let

$$
q_c\equiv\frac{c_{\mathrm{eff}}}{c_f}
=\frac{1}{\chi_{\mathrm{sea},0}},
$$

where $c_f$ is the primitive causal-wake speed and $c_{\mathrm{eff}}$ is the weak-homogeneous Noether sea dressed assembly-channel speed. The hypothesis in this packet is $q_c\ll1$.

The plain-language consequence is that ordinary center-of-mass drift cannot by itself carry observer-strength magnetic or Lorentz behavior. A primitive delay correction produced by drift $v$ is organized by $v/c_f=q_c(v/c_{\mathrm{eff}})$, whereas the observer-level recovery target is organized by $v/c_{\mathrm{eff}}$. If $q_c\ll1$, the drift-scale primitive correction is too small by one power of $q_c$ at the field-like level and by two powers for a source-drift/receiver-drift magnetic acceleration. The missing factors must come from a derived internal-circulation and Noether sea response; inserting them as fitted coefficients would only restate the target.

The existing [Darwin-order expansion](analysis-darwin-order-branch-expansion.md) is stronger than this scale estimate for the canonical receiver-normal law: on its neutral uniformly drifting infinite-line test, the current coefficient cancels exactly to zero. Therefore $c_f=c_{\mathrm{eff}}$ would remove the scale separation but would **not** repair canonical per-hit magnetism. Under either speed hypothesis, emergent electromagnetism still needs an independently derived assembly, recoil, wake-cargo, or Noether sea constitutive channel.

Claim grades: **derived** for the power-counting relations below and for the exact-zero statement imported from the cited analytic packet; **inferred** for the carrier assignment forced by those relations; **measured** only for live-repository statements explicitly identified as file inspection. No claim in this analysis is graded `guessed`.

Disposition: **priority-only**. The speed separation is a hypothesis, not current canon. In particular, [Mathematics Terminology](../../../content/markdown/aaa/archie/mathematics-terminology.md) and [Energy](../../../content/markdown/aaa/dynamics/energy.md) currently state $c_{\mathrm{eff}}\to c_f$ in weak homogeneous conditions, while the equation-mapping [speed-symbol audit](../equation-mapping/equation.md#speed-symbol-audit-target) allows a weak homogeneous branch with $c_\gamma=c_{\mathrm{eff}}=c_0$ and $c_f$ still distinct. The conflict must be adjudicated by a common-record constitutive derivation, not by notation.

## Layer and symbol discipline

| Symbol | Role in this analysis | Status |
| --- | --- | --- |
| $c_f$ | Primitive causal-wake speed in the master equation and causal-root condition. It is not an architrino speed limit. | measured by live-file inspection |
| $c_{\mathrm{eff}}$ | Noether sea dressed assembly-channel speed used by clocks, rulers, and observer metric comparisons. | measured by live-file inspection; its value is open |
| $c_\gamma$ | Photon-channel group speed. Equality $c_\gamma=c_{\mathrm{eff}}$ is a photon Gate A closure target, not a definition. | measured by live-file inspection |
| $c_0$ | Weak-homogeneous observer calibration, $c_0=c_{\mathrm{eff}}(\infty)$ after the clock/ruler/photon map closes. | measured by live-file inspection |
| $q_c$ | Dimensionless ratio $c_{\mathrm{eff}}/c_f$. | defined here; derived once the constitutive map is known |
| $\chi_{\mathrm{sea},0}$ | Homogeneous Noether sea delay factor, $c_f/c_{\mathrm{eff}}=q_c^{-1}$. | existing canonical symbol |

Standard electromagnetic and Lorentz formulas enter below only as observer-level recovery targets. They are not premises in the architrino acceleration law.

## 1. Scaling derivation

### 1.1 One delayed source: the primitive drift parameter

For a source with approximately constant velocity $\mathbf u$ over one causal delay, write the current separation as $\mathbf R$ and the delayed separation as

$$
\mathbf r
=
\mathbf R+\frac{r}{c_f}\mathbf u,
\qquad
r=\|\mathbf r\|.
$$

If $\|\mathbf u\|/c_f\ll1$, then $r=R+O(Ru/c_f)$ and

$$
\widehat{\mathbf r}
=
\widehat{\mathbf R}
+O\!\left(\frac{u}{c_f}\right),
\qquad
\frac{1}{r^2}
=
\frac{1}{R^2}
\left[1+O\!\left(\frac{u}{c_f}\right)\right].
$$

The source-normal and receiver-normal factors have the same expansion scale,

$$
\frac{D_s}{c_f}
=1-O\!\left(\frac{u}{c_f}\right),
\qquad
\frac{D_T}{c_f}
=1-O\!\left(\frac{v}{c_f}\right).
$$

Hence any non-cancelling first-order, drift-odd distortion of the primitive central acceleration row must have the form

$$
\frac{\delta A_{\mathrm{odd}}}{A_{\mathrm{static}}}
=
C_f^{(1)}\frac{u}{c_f}
+O\!\left(\frac{u^2}{c_f^2}\right),
$$

where $C_f^{(1)}$ is a dimensionless coefficient derived from the branch and population sum. This statement is power counting, not a claim that the coefficient is nonzero.

Claim grade: **derived** from the causal-root relation and the branch-normal definitions. Falsifier: an analytic expansion of the unchanged primitive law on a simple-root chart contains a first drift-odd term with a different dimensionless small parameter.

### 1.2 Observer-level magnetic field-like target

For the slow-motion Maxwell/Darwin comparison, normalize the field-like magnetic response by $c_{\mathrm{eff}}B/E$. A moving source has the observer-level target scaling

$$
\left(\frac{c_{\mathrm{eff}}B}{E}\right)_{\mathrm{target}}
=
C_{\mathrm{EM}}^{(1)}\frac{u}{c_{\mathrm{eff}}}
+O\!\left(\frac{u^2}{c_{\mathrm{eff}}^2}\right),
$$

with $C_{\mathrm{EM}}^{(1)}=O(1)$ for a geometry whose standard comparison coefficient is nonzero. A drift-carried primitive candidate instead supplies

$$
\left(\frac{c_{\mathrm{eff}}B}{E}\right)_{\mathrm{drift}}
\sim
C_f^{(1)}\frac{u}{c_f}
=
q_c C_f^{(1)}\frac{u}{c_{\mathrm{eff}}}.
$$

The coefficient ratio is therefore

$$
\boxed{
\frac{\text{drift-scale candidate}}
{\text{observer target}}
=
q_c\frac{C_f^{(1)}}{C_{\mathrm{EM}}^{(1)}}.
}
$$

If both coefficients remain finite and order one as $q_c\to0$, the primitive drift carrier is deficient by $q_c$. Matching the target with this carrier would require

$$
C_f^{(1)}
\sim
\frac{C_{\mathrm{EM}}^{(1)}}{q_c},
$$

a large susceptibility that must be derived from assembly/Noether sea dynamics. It cannot come from the bare Taylor expansion itself.

Claim grade: **derived** as a comparison of the primitive expansion with the observer-level Maxwell/Darwin recovery target. Falsifier: the independently derived observer comparison is not organized by $u/c_{\mathrm{eff}}$, or the native assembly reduction produces a controlled $C_f^{(1)}\propto q_c^{-1}$ from the same retained record.

### 1.3 Observer-level magnetic acceleration target

When both a source drift $\mathbf u$ and receiver drift $\mathbf v$ are needed, the slow-motion magnetic acceleration relative to the static electric-like acceleration has the schematic scaling

$$
\frac{A_{\mathrm{mag}}}{A_{\mathrm{elec}}}
=
C_{\mathrm{EM}}^{(2)}
\frac{uv}{c_{\mathrm{eff}}^2}
+O\!\left(\frac{w^3}{c_{\mathrm{eff}}^3}\right),
$$

where $w$ denotes the common slow-speed scale. A primitive delay expansion whose two velocity legs are both carried at $c_f$ gives

$$
\left(\frac{A_{\mathrm{mag}}}{A_{\mathrm{elec}}}\right)_{\mathrm{drift}}
=
C_f^{(2)}\frac{uv}{c_f^2}
=
q_c^2 C_f^{(2)}
\frac{uv}{c_{\mathrm{eff}}^2}.
$$

Thus

$$
\boxed{
\frac{\text{two-leg drift candidate}}
{\text{observer magnetic target}}
=
q_c^2\frac{C_f^{(2)}}{C_{\mathrm{EM}}^{(2)}}.
}
$$

For $q_c\ll1$, an order-one primitive coefficient is too small by $q_c^2$. Matching would require a derived $C_f^{(2)}\sim q_c^{-2}C_{\mathrm{EM}}^{(2)}$.

Claim grade: **derived** as scale comparison. Falsifier: a same-record internal/sea reduction derives the required inverse powers of $q_c$ while preserving all other electromagnetic and preferred-frame residuals.

### 1.4 Canonical-law sharpening: the coefficient is zero

The scale argument above gives the best possible outcome for a generic non-cancelling primitive delay term. The canonical receiver-normal law does worse on the neutral infinite-line discriminator. The [P1 analytic result](analysis-darwin-order-branch-expansion.md) proves

$$
C_{B,\mathrm{can}}=0,
\qquad
C_{B,\mathrm{Darwin}}=1.
$$

Source-label transport cancels the $D_s$ denominator and removes the uniform source drift exactly; common-slice neutrality then removes the remaining response. Consequently:

1. $q_c\ll1$ cannot be rescued by rescaling the canonical per-hit coefficient; zero remains zero.
2. $q_c=1$ also does not recover magnetism from the canonical per-hit law.
3. A nonzero magnetic channel must add independently derived state beyond the present central receiver-normal population sum.

Claim grades: **derived** for items 1 and 2; **inferred** for item 3 because several distinct missing-channel mechanisms remain possible. Falsifier: the unchanged canonical same-record infinite-line sum yields the normalized Darwin coefficient $1$.

## 2. Forced-consequence ledger for $q_c\ll1$

| Sector | What the hypothesis forces | Why | Claim grade | Direct falsifier |
| --- | --- | --- | --- | --- |
| Electromagnetic carrier | Observer-strength magnetic response must be carried by internal assembly circulation, Noether sea polarization/transport, recoil or wake cargo, or a combination of them; center-of-mass drift of bare central hits is insufficient. | Drift power counting loses $q_c$ or $q_c^2$, and the canonical neutral-line coefficient is exactly zero. | inferred from derived results | An unchanged bare-drift reduction recovers all Maxwell/Darwin coefficients with no hidden $q_c^{-1}$ or $q_c^{-2}$ response. |
| Internal speeds | At least one load-bearing internal carrier must have $u_{\mathrm{int}}/c_f=O(1)$, or an equivalent collective susceptibility must generate the missing inverse powers of $q_c$. | Internal circulation at $u_{\mathrm{int}}\sim c_f$ avoids the small primitive parameter that suppresses center-of-mass drift. | inferred | A certified assembly with every internal speed $o(c_f)$ and bounded susceptibility nevertheless recovers the full electromagnetic coefficient set. |
| Electric/magnetic unity | Electric-like static response and magnetic-like current response must be projections of one assembly/sea state, not separately normalized sectors. | A fitted magnetic enhancement could match one coefficient while breaking charge, radiation, energy, or preferred-frame rows. | derivation/closure target | Independent tunings are required for static, current, radiation, and magnetic-moment observables. |
| Maxwell continuum limit | Curl-like, induction, radiation, and wave coefficients must emerge after coarse-graining internal circulation and Noether sea transport; they cannot be read directly from the primitive line-of-action hit. | The primitive hit is central and the P1 current coefficient vanishes. | inferred | The existing central population sum alone yields the full effective field equations and conserved event ledger. |
| Magnetic moments and spin response | Magnetic moments, $g$ factors, and current response must be exposed internal-current observables of retained assemblies plus their Noether sea dressing. | A center-of-mass drift carrier is parametrically suppressed and canonically null in the discriminator. | inferred | A pointlike drift row with no internal current geometry reproduces the same moment and dressing observables. |
| Photon transport | The photon branch must derive $c_\gamma=c_{\mathrm{eff}}$ in the weak homogeneous observer limit while its constituent wakes still propagate at $c_f$. | $c_\gamma$ and $c_{\mathrm{eff}}$ are observer channels; $c_f$ remains the primitive root speed. | derivation/closure target | The photon branch has no common group-speed limit with the clock/ruler channel, or only closes by setting $q_c=1$. |
| Lorentz clock/ruler law | The factor $\gamma_{\mathrm{eff}}=(1-v^2/c_{\mathrm{eff}}^2)^{-1/2}$ must arise from assembly deformation, phase retuning, and Noether sea dressing, not from the primitive delay expansion in $v/c_f$. | At $v=c_{\mathrm{eff}}=q_cc_f$ with $q_c\ll1$, the primitive drift parameter is only $q_c$, so the primitive simple-root expansion has no reason to diverge. | derived scale fact; inferred carrier assignment | A primitive same-root law develops the required common-mode clock/ruler/photon singular response at $v=c_{\mathrm{eff}}\ll c_f$ without an assembly/sea branch transition. |
| Common limiting speed | Clock, ruler, photon, effective mass-shell, and effective gravitational channels must share $c_{\mathrm{eff}}$ after dressing even though the primitive wake channel uses $c_f$. | Different observer limiting speeds leave $O(v^2)$ synchronization and preferred-frame residuals. | derivation/closure target | One common retained response record cannot bring all observer channels to the same speed within their declared bounds. |
| Preferred-frame hiding | A large photon/wake cone separation must be screened from ordinary assembly records or reabsorbed by the same clock/ruler/signal map. | Primitive wakes would otherwise connect events outside the photon-defined observer cone. | inferred | A derived coupling exposes detectable advance signals, sidereal leakage, or ordering dependence above the relevant bounds. |
| Weak-homogeneous canon | The present statement $c_{\mathrm{eff}}\to c_f$ must be replaced by a distinct homogeneous fixed ratio $q_c<1$ if the hypothesis survives. | The two statements are algebraically incompatible. | derived | The homogeneous constitutive derivation gives $\chi_{\mathrm{sea},0}=1$. |

No row above proves which internal carrier is realized. The forced statement is disjunctive: some independently derived assembly/Noether sea state must carry the missing response. Choosing one mechanism before a retained branch and response map exist would be a guess.

## 3. The $v\to c_{\mathrm{eff}}$ divergence is an assembly effect

The observer-level recovery target is

$$
\gamma_{\mathrm{eff}}(v)
=
\frac{1}{\sqrt{1-v^2/c_{\mathrm{eff}}^2}}.
$$

Under $q_c\ll1$,

$$
\left.\frac{v}{c_f}\right|_{v\to c_{\mathrm{eff}}^-}
\to q_c\ll1.
$$

Therefore the primitive causal-root chart is still in a low-drift regime when the observer factor diverges. Unless another branch condition happens to fail at the same speed, neither $D_s=c_f-\widehat{\mathbf r}\cdot\mathbf V_s$ nor $D_T=c_f-\widehat{\mathbf r}\cdot\mathbf V_r$ is driven to zero merely by center-of-mass motion with $v=c_{\mathrm{eff}}\ll c_f$.

Claim grade: **derived**, conditional only on $q_c\ll1$ and bounded internal line-of-action projections in the stated simple-root chart. Falsifier: the same retained primitive chart proves that a source-normal or receiver-normal pole occurs identically at center-of-mass speed $c_{\mathrm{eff}}$ despite $c_{\mathrm{eff}}\ll c_f$.

The divergence must instead be an exported assembly response. Acceptable mathematical realizations include a retained branch whose required internal phase budget approaches a boundary, whose period grows without bound, whose longitudinal envelope collapses, whose Noether sea response tensor develops a pole, or whose finite exposed-energy response makes further center-of-mass acceleration asymptotically costly. These are candidate forms, not established mechanisms. The accepted form must make all of the following use the same singular factor or the same controlled approximation to it:

$$
\frac{T(v)}{T_0}\to\gamma_{\mathrm{eff}},
\qquad
\frac{L_\parallel(v)}{L_0}\to\gamma_{\mathrm{eff}}^{-1},
\qquad
E_{\mathrm{CM}}\to\gamma_{\mathrm{eff}}M_0c_{\mathrm{eff}}^2,
$$

together with photon synchronization and the effective gravitational-channel speed. A clock-only divergence is not Lorentz closure.

Claim grade: **derivation/closure target** for the common-mode limit; **inferred** for the list of possible branch mechanisms. Falsifier: the channels require different poles, different retained records, or independent fitted coefficients.

The divergence must never be described as a substrate speed wall. The live [binary dynamics](../../../content/markdown/aaa/dynamics/binary-dynamics.md) explicitly treats $c_f$ as a wake propagation reference and admits individual architrino motion above $c_f$; the master equation accepts finite velocity below, at, and above $c_f$ subject to actual branch geometry. If $q_c\ll1$, a substrate prohibition at $c_{\mathrm{eff}}$ would add a second primitive speed law absent from the master equation.

Claim grade: **measured** by live-file inspection for the existing speed convention; **derived** that a new substrate cap at $c_{\mathrm{eff}}$ would be an added postulate. Falsifier: the governing primitive dynamics are formally amended and independently justify such a cap.

## 4. Existing anchors and what they do not yet determine

### 4.1 Primitive scale anchor

The [master equation](../../../content/markdown/aaa/dynamics/master-equation.md) contains $c_f$ but no $c_{\mathrm{eff}}$. The live binary chapter defines

$$
R_*\equiv\frac{\kappa\epsilon^2}{c_f^2},
\qquad
T_*\equiv\frac{R_*}{c_f}.
$$

A certified minimum-circular-binary branch would output pure numbers

$$
\rho_{\mathrm{MCB}}
\equiv
\frac{R_{\mathrm{MCB}}}{R_*},
\qquad
\vartheta_{\mathrm{MCB}}
\equiv
\frac{T_0}{T_*},
\qquad
\beta_{\mathrm{MCB}}
=
\frac{2\pi R_{\mathrm{MCB}}}{c_fT_0},
$$

and defines

$$
\boxed{d_0\equiv R_{\mathrm{MCB}}.}
$$

These relations anchor the primitive length and time chart to $(c_f,\kappa,\epsilon)$ once the MCB branch and its stability are certified. They do **not** determine $c_{\mathrm{eff}}$, because no homogeneous Noether sea or photon transport eigenmode appears in the isolated two-body ratios.

Claim grade: **measured** for the live definitions; **derived** for the non-determination statement. Falsifier: the MCB certificate itself contains a same-record homogeneous assembly-channel propagation mode whose group speed is $c_{\mathrm{eff}}$.

### 4.2 Nested assembly and Planck-emergent chain

Let a retained nested shell braid derivation supply

$$
\lambda_{\mathrm{align}}
\equiv
\frac{R_{\mathrm{align}}}{d_0},
\qquad
R_{\mathrm{align}}=\lambda_{\mathrm{align}}d_0,
$$

and one closed-cycle action row

$$
\mathcal A_{\mathrm{align}}^{\mathrm{cycle}}=h.
$$

The current [Planck nested-shell-braid bridge](../../../content/markdown/aaa/philosophy-history/theory-bridges/planck-scale-nested-shell-braid-alignment.md) compares

$$
2\pi R_{\mathrm{align}}
=
\ell_P^{(\mathrm{emp})},
\qquad
\left(\ell_P^{(\mathrm{emp})}\right)^2
=
\frac{hG}{2\pi c_0^3}.
$$

Under the weak-homogeneous observer identification $c_0=c_{\mathrm{eff}}$, these yield the exact comparison ratio

$$
\boxed{
q_{P}
\equiv
\frac{c_{\mathrm{eff}}}{c_f}
=
\left[
\frac{hG}
{8\pi^3R_{\mathrm{align}}^2c_f^3}
\right]^{1/3}
=
\left[
\frac{hG}
{8\pi^3\lambda_{\mathrm{align}}^2d_0^2c_f^3}
\right]^{1/3}.
}
$$

Claim grade: **derived** from the stated observer Planck relation and alignment-circumference mapping. Falsifier: the algebraic substitution fails, or the retained alignment branch rejects either mapping.

Equivalently define the dimensionless same-record compliance coefficient

$$
C_G
\equiv
\frac{Gh}{R_{\mathrm{align}}^2c_f^3}.
$$

Then

$$
\boxed{q_P=\left(\frac{C_G}{8\pi^3}\right)^{1/3}.}
$$

This exposes the normalization burden hidden by the current heuristic formula $G_{\mathrm{eff}}\sim R_{\mathrm{align}}^2c_f^3/\mathcal A_{\mathrm{align}}^{\mathrm{cycle}}$. If $q_c=1$, exact Planck/alignment closure requires $C_G=8\pi^3$ under the displayed circumference and $h$ conventions. If $q_c\ll1$, it requires $C_G=8\pi^3q_c^3\ll8\pi^3$. The existing bridge explicitly treats its $2\pi$ normalizations and its $c\approx c_f$ identification as open, so neither value is presently derived.

Claim grade: **derived** for the coefficient identities; **measured** by live-file inspection that the bridge still assumes the low-energy $c\approx c_f$ match and leaves the exact normalization open. Falsifier: a completed same-record action/compliance derivation yields a different dimensionless relation after all convention factors are fixed.

The Planck chain is an overdetermining check only after $d_0$, $\lambda_{\mathrm{align}}$, $h$, and $G$ are independently derived. If empirical $h$ and $G$ are inserted before those native rows exist, the boxed equation calibrates $q_c$; it does not derive it.

Claim grade: **derived** from evidence independence. Falsifier: an independent native derivation supplies none of those rows yet the ratio follows without empirical calibration.

## 5. Ratio-fixing derivation target

The direct ratio-fixing object is the long-wavelength dispersion relation of a photon/assembly perturbation on one accepted homogeneous Noether sea record $\mathcal B_{\mathrm{sea},0}$. Let

$$
\omega_\gamma
=
\omega_\gamma(\mathbf k;\mathcal B_{\mathrm{sea},0})
$$

be the frequency extracted from the linearized retained return map. Define

$$
c_\gamma^{(0)}
\equiv
\lim_{\|\mathbf k\|\to0}
\frac{\partial\omega_\gamma}{\partial\|\mathbf k\|},
\qquad
q_\gamma
\equiv
\frac{c_\gamma^{(0)}}{c_f}.
$$

The same record must independently export a clock/ruler propagation speed

$$
c_{\mathrm{eff}}^{(0)}
=
\frac{c_f}{\chi_{\mathrm{sea},0}},
$$

and pass

$$
c_\gamma^{(0)}
=
c_{\mathrm{eff}}^{(0)}
=
c_0
\quad\text{within the declared leakage budget}.
$$

The decisive derived ratio is then

$$
\boxed{
q_c
=
\frac{c_{\mathrm{eff}}^{(0)}}{c_f}
=
q_\gamma
=
\chi_{\mathrm{sea},0}^{-1}.
}
$$

This is a derivation only if the homogeneous sea state, photon/assembly mode, return-map frequency, and clock/ruler projection are fixed without fitting $q_c$ to the observed light speed.

Claim grade: **derivation/closure target**. Falsifier: no stable transparent long-wavelength branch exists, the limit is frequency or direction dependent above bounds, or the clock/ruler and photon limits disagree.

The full ratio-fixing chain is therefore:

1. Certify the MCB and derive $(\rho_{\mathrm{MCB}},\vartheta_{\mathrm{MCB}},\beta_{\mathrm{MCB}})$, fixing $d_0$ relative to $(c_f,\kappa,\epsilon)$.
2. Certify the homogeneous Noether sea branch built from retained assemblies.
3. Derive its photon/assembly dispersion and clock/ruler response, fixing $q_c$ directly.
4. Derive the nested alignment ratio $\lambda_{\mathrm{align}}$, closed-cycle action $h$, and Noether sea compliance $G$ from the same compatible branch family.
5. Compare the direct transport ratio $q_c$ with the Planck-chain ratio $q_P$. Require
   $$
   R_q\equiv\left|q_c-q_P\right|\le\epsilon_q
   $$
   with $\epsilon_q$ declared before the comparison.

Claim grade: **derivation/closure target**. The residual is a proposed validation criterion, not a new theory constant.

## 6. Falsifiable comparison: $c_f\gg c_{\mathrm{eff}}$ versus $c_f=c_{\mathrm{eff}}$

| Discriminator | $c_f\gg c_{\mathrm{eff}}$ requires | $c_f=c_{\mathrm{eff}}$ requires | Decisive outcome | Claim grade |
| --- | --- | --- | --- | --- |
| Homogeneous transport ratio | $q_c\ll1$ from the accepted sea/photon dispersion and clock/ruler map. | $q_c=1$ within the same error budget. | A same-record derived interval for $q_c$ that excludes one regime. | derivation/closure target |
| Canonical bare-current coefficient | Still $C_{B,\mathrm{can}}=0$; another carrier must supply magnetism and overcome the scale separation. | Still $C_{B,\mathrm{can}}=0$; equality alone does not supply magnetism. | An unchanged canonical neutral-line calculation yields $C_B=1$, overturning P1. | derived |
| Assembly electromagnetic coefficient | Internal/sea response supplies the missing $q_c^{-1}$ field-like or $q_c^{-2}$ two-velocity scaling without separate fitting. | No large speed-ratio enhancement is required, but the missing nonzero channel and its unit coefficient are still required. | One retained assembly reduction gives the full coefficient set and its $q_c$ dependence. | derivation/closure target |
| Internal circulation | A load-bearing circulation or collective response remains $O(c_f)$ while center-of-mass motion is limited near $c_{\mathrm{eff}}$. | Internal and observer speed scales may coincide on a selected branch, but equality is not automatic for every constituent. | Certified internal speed and susceptibility rows exclude all $O(c_f)$ carriers or require them. | inferred prediction; test is a closure target |
| Lorentz divergence locus | Clock/ruler/energy response becomes singular or loses its retained branch at $v\to c_{\mathrm{eff}}$, while the primitive center-of-mass root chart remains regular because $v/c_f\to q_c\ll1$. | The observer divergence and primitive field-speed hinge coincide numerically, though an assembly derivation is still required and individual architrinos need not be capped. | Continuation of one moving assembly locates the first common-mode pole or branch boundary relative to both speeds. | derived distinction; test is a closure target |
| Photon cone versus wake reach | Primitive wakes have a wider causal reach than photon/observer signals. Ordinary assemblies must not expose unscreened advance signaling or ordering dependence. | The weak-homogeneous photon and primitive cones coincide after channel closure. | A controlled protocol exposes a repeatable assembly-to-assembly influence outside the photon cone, or bounds the accessible coupling below tolerance. Absence bounds accessibility, not $q_c$ by itself. | inferred |
| Dispersion and birefringence | Strong dressing must nevertheless be transparent, nearly nondispersive, and isotropic over tested weak-homogeneous bands. | These residuals must also be small, but no large delay factor must be hidden. | The derived $\omega_\gamma(\mathbf k)$ violates timing, direction, or polarization bounds. This falsifies the derived branch, not automatically every separated-speed model. | derivation/closure target |
| Preferred-frame leakage | The assembly map suppresses leakage despite the large separation of primitive and observer cones. | The common speed removes one source of mismatch, but the absolute frame still has to be hidden dynamically. | Michelson-Morley, Kennedy-Thorndike, Ives-Stilwell, matter-clock, or gravity/photon rows fail on one common record. | derivation/closure target |
| Planck-emergent chain | Same-record coefficients give $C_G=8\pi^3q_c^3$ and $q_P=q_c\ll1$. The current A-cf-match assumption fails. | Same-record coefficients give $C_G=8\pi^3$ and $q_P=1$ under the stated conventions. | Independently derived $(R_{\mathrm{align}},h,G,c_f)$ make the Planck interval exclude one ratio regime. | derived comparison; native inputs open |
| Weak-homogeneous corpus statement | The present $c_{\mathrm{eff}}\to c_f$ sentence must be revised after proof. | The present common-limit sentence survives, subject to photon and Lorentz closure. | The accepted constitutive map gives $\chi_{\mathrm{sea},0}$ with a certified interval. | derived consequence |

## 7. Claim-grade summary

| Claim | Grade | What would overturn it |
| --- | --- | --- |
| Primitive drift corrections are organized by $v/c_f$. | derived | A correct simple-root expansion of the unchanged law yields another dimensionless drift denominator. |
| Observer magnetic comparison terms are organized by $u/c_{\mathrm{eff}}$ and $uv/c_{\mathrm{eff}}^2$. | derived comparison target | The Maxwell/Darwin slow-motion benchmark is shown to have different scaling under the same normalization. |
| Finite order-one drift coefficients are deficient by $q_c$ or $q_c^2$ when $q_c\ll1$. | derived | Algebraic comparison or coefficient normalization is wrong. |
| The canonical neutral-line current coefficient is exactly zero. | derived in P1 | Same-record analytic or independent numerical evaluation gives a nonzero infinite-line bulk coefficient. |
| A separated-speed theory must place electromagnetic and Lorentz recovery in internal assembly/Noether sea response. | inferred | Bare center-of-mass drift rows recover the full coefficient and common-mode Lorentz sets without inverse-ratio enhancement. |
| The Lorentz divergence at $c_{\mathrm{eff}}\ll c_f$ cannot be a center-of-mass primitive root pole merely from speed magnitude. | derived | The primitive branch equations prove an identity placing the pole at $v=c_{\mathrm{eff}}$ while $q_c\ll1$. |
| $d_0=R_{\mathrm{MCB}}$ and the primitive units constrain scale but do not alone fix $q_c$. | derived from measured definitions | The certified two-body packet itself supplies the homogeneous dressed propagation mode. |
| The Planck/alignment comparison gives $q_P=[hG/(8\pi^3R_{\mathrm{align}}^2c_f^3)]^{1/3}$. | derived | The stated circumference or empirical Planck relation is rejected, or the algebra fails. |
| A homogeneous photon/assembly dispersion plus a same-record clock/ruler map is the direct ratio-fixing derivation. | derivation/closure target | A different independent native observable fixes $q_c$ without fitting and is shown sufficient for every consumer channel. |

## Verdict

The hypothesis $c_f\gg c_{\mathrm{eff}}$ is internally intelligible only as a two-layer claim: fast primitive wakes at $c_f$ and a much slower, common observer-channel speed produced by retained assembly and Noether sea dynamics. It cannot use ordinary drift-scale retardation as the source of observed magnetism or the Lorentz factor. The former is parametrically weak and canonically zero on the P1 discriminator; the latter would diverge while the primitive center-of-mass branch remains deep in its low-$v/c_f$ regime.

The hypothesis is not presently established and conflicts with the live weak-homogeneous $c_{\mathrm{eff}}\to c_f$ statement. The deciding calculation is not another speed identification by notation. It is one homogeneous retained Noether sea calculation that derives the photon/assembly dispersion, clock/ruler response, and common observer speed, followed by an independent Planck-chain cross-check using derived $d_0$, $R_{\mathrm{align}}/d_0$, $h$, and $G$.

Promotion disposition: **defer with blocker**. The blocker is the missing homogeneous Noether sea photon/assembly dispersion and common clock/ruler response on one accepted retained record.
