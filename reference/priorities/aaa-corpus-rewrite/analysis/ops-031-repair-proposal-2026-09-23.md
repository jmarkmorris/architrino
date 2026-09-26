# OPS-031 consolidated repair proposal — September 23, 2026

## Approved decision and historical proposal

**Current disposition: ✓ implemented after operator approval on September 23, 2026.** The before/after blocks below preserve the approved proposal; the implementation record at the end records verification. The approval authorized only the listed replacements and their stated direct propagation, followed by whole-document rereading and focused verification. It would not adopt a new physical mechanism, complete an open derivation, or reopen CRW-005. The neutron dipole completeness question is separate and is not part of the repair approval.

This is the operator's single review surface. The linked evidence receipts retain detailed derivations and provenance; approving their files individually is unnecessary. “Before” blocks are exact excerpts from current source; “After” blocks specify replacement text, with unchanged surrounding text and equation-viewer anchors retained. Relative links inside source blocks are relative to the target chapter, not this proposal.

| Item | Correction | Recommendation and reason |
| --- | --- | --- |
| ✓ 1 | Ontology: introduce joint Bell factorization explicitly | Approve; local marginal independence alone is weaker than the product condition already used later in the chapter. |
| ✓ 2 | Ontology: remove undefined clock-map time symbol | Approve; identify the native and observer layers without choosing one implicitly. |
| ✓ 3 | Observer Framework: distinguish full covariance from its reduced approximation | Approve; preserve the correct nine-term equation and clarify the sentence following it. |
| ✓ 4 | Atomic Structure: call the imported shell diagnostic an energy gap | Approve; its owning definition does not establish dynamical stability. |
| ✓ 5 | Atomic Structure: specify the thermodynamic comparison | Approve; carry the existing downstream owner's temperature, inventory and derivative conventions into this handoff. |
| ✓ 6 | Nucleon Structure: make mass/energy conversion explicit | Approve; compare quantities in the same declared observer calibration. |
| ✓ 7 | Atomic Structure and Braid Envelope Geometry: define a safe perturbation radius | Approve the qualified replacement; one distant passing perturbation does not protect smaller ones. |
| ✓ 8 | Noether Sea: narrow the path-redshift necessity claim | Approve; the existing candidate formula contains channels beyond cadence current and source imbalance. |

## 1. Joint Bell factorization

Target: [Ontology](../../../../content/markdown/aaa/foundations/ontology.md), line 232, two sentences within the introductory paragraph. Evidence: [ONT-20260920-01](../../aaa-operations/evidence/ops-031-ontology-review-2026-09-20.md).

Before:

```markdown
For settings chosen independently of a complete hidden state $\lambda$, Bell-local causality requires each outcome probability to depend only on the local setting and $\lambda$. That factorization implies Bell inequalities.
```

After:

```markdown
For settings chosen independently of a complete hidden state $\lambda$, Bell-local causality requires the joint outcome probability to factor into two local response probabilities, each depending only on its own setting and $\lambda$. This conditional factorization implies Bell inequalities.
```

**Why:** a binary probability law can have setting-independent uniform marginals and still fail the product law. The receipt supplies an explicit table with CHSH value four. This is an algebraic witness, not a physical realization. For deterministic complete local responses the product condition already follows, so the proposal clarifies the general introduction rather than contradicting that special case. The later correct equation and the provisional recovery route remain unchanged. **Falsifier:** an explicit deterministic-only restriction or joint conditional definition in this introductory passage would remove the ambiguity.

## 2. Clock-map routing

Target: [Ontology](../../../../content/markdown/aaa/foundations/ontology.md), line 273. Evidence: [ONT-20260920-02](../../aaa-operations/evidence/ops-031-ontology-review-2026-09-20.md).

Before:

```markdown
- [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md) owns observer clocks and $t\mapsto\tau$ extraction.
```

After:

```markdown
- [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md) owns physical clock readouts, their extraction from native absolute time, and their comparison in effective observer coordinates.
```

**Why:** the owner supports both native and observer-coordinate maps. The replacement names their roles without leaving bare $t$ undefined. No clock-rate equation changes. **Falsifier:** a local declaration already assigning that $t$ an unambiguous layer would remove the need.

## 3. Covariance explanation

Target: [Observer Framework](../../../../content/markdown/aaa/spacetime/observer-framework.md), first sentence at line 312. Evidence: [OBS-20260921-01](../../aaa-operations/evidence/ops-031-observer-framework-review-2026-09-21.md).

Before:

```markdown
The displayed sum is valid when the cross-kernels vanish under the same joint conditional law; otherwise those kernels must be retained.
```

After:

```markdown
The displayed sum retains all cross-kernels under the same joint conditional law. It reduces to the three individual covariance terms when all cross-kernels vanish; otherwise those cross terms must be retained.
```

**Why:** the displayed equation already includes six ordered cross terms. The original sentence is true as a sufficient special case but ambiguously attaches the condition to the full sum. For two identical zero-mean unit-variance components, the total variance is four, whereas retaining only the individual variances gives two. Preserve the equation. **Falsifier:** a displayed equation that omits the cross terms would require a different correction.

## 4. Shell energy-gap terminology

Target: [Atomic Structure](../../../../content/markdown/aaa/nuclear-atomic/atomic-structure.md), table row at line 699 and first sentence at line 750. Evidence: [ASR-03](../../aaa-operations/evidence/ops-031-atomic-structure-review-2026-09-22.md); the [Atomic Spectra review](../../aaa-operations/evidence/ops-031-atomic-spectra-review-2026-09-22.md) independently rechecks the owning definition.

Before, table row:

```markdown
| Electron-envelope branch, shell stability gap, ionization state | Inputs to $\delta\theta_{\mathrm{e-env}}^{(\ell)}$ only after a realized branch is specified. |
```

After:

```markdown
| Electron-envelope branch, conditional shell energy gap, ionization state | Inputs to $\delta\theta_{\mathrm{e-env}}^{(\ell)}$ only after a realized branch is specified. |
```

Before, sentence:

```markdown
Here $C_{\mathrm{shell}}$ is the electron-envelope shell-stability gap defined in [Atomic Spectra](atomic-spectra.md).
```

After:

```markdown
Here $C_{\mathrm{shell}}$ is the conditional electron-envelope energy gap defined in [Atomic Spectra](atomic-spectra.md); dynamical stability requires a separate compatible-history perturbation analysis.
```

**Why:** a list of competitor energies does not specify how perturbations evolve. The owning chapter already distinguishes energy separation from stability. **Falsifier:** a stability theorem for this same admitted history class could justify stronger language; the current definition supplies none.

## 5. Thermodynamic comparison

Target: [Atomic Structure](../../../../content/markdown/aaa/nuclear-atomic/atomic-structure.md). Evidence: [ASR-02](../../aaa-operations/evidence/ops-031-atomic-structure-review-2026-09-22.md).


Exact original Atomic Structure range 752–786:

```markdown
Dense material phases should be read through this record rather than through a bare element label. For a material branch $B$ of element or compound $E$, define the relative dense-medium preference against a comparison phase $Y$ by

$$
\Delta\mu_{E/Y}^{B}
\left(
n,P,T,\mathcal B_{\mathrm{lat}}
\right)
=
\mu_E^{B}
\left(
n,P,T,\mathcal B_{\mathrm{lat}}
\right)
-
\mu_Y
\left(
n,P,T,\mathcal B_Y
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-1e38d24a12c0655c)

Here $\mu_E^B$ and $\mu_Y$ are effective branch free-energy or chemical-potential functionals for the declared material branches. They are constitutive comparison functionals, not the architrino bookkeeping constant $\mu_{\text{arch}}$.

The hypothesis behind dense iron-bearing phases is then not that the element symbol `Fe` directly sources a denser Noether sea. It is that the realized nuclear inventory, electron branch, metallic bonding branch, and pressure state may make the iron-rich branch more compatible with high normalized Noether braid density than a silicate branch:

$$
\frac{\partial}{\partial n}
\Delta\mu_{\mathrm{Fe/silicate}}^{\mathrm{metal}}
<
0
$$

[View →](../../../../equation-mapping.html#corpus-equation-f51858c849c67fb1)

along the relevant planetary-interior branch. This inequality is a constitutive target. It must be derived from assembly packing, exclusion-volume response, metallic bonding, pressure response, and Noether sea coupling; it cannot be assumed from ordinary density alone. [Condensed Matter](condensed-matter.md#earth-core-iron-as-a-boundary-case) carries the Earth-core iron specialization and the packing sufficient condition.
```

Replace that range with:

```markdown
Dense material phases should be read through this record rather than through a bare element label. For a material branch $B$ of element or compound $E$ and a comparison phase $Y$, compare chemical potentials for the same transferred inventory, on one common per-unit energy reference, at specified host compositions. The relative dense-medium cost is

$$
\Delta\mu_{E/Y}^{B}
\left(
n,P,T_{\mathrm{temp}},\mathcal B_{\mathrm{lat}}
\right)
=
\mu_E^{B}
\left(
n,P,T_{\mathrm{temp}},\mathcal B_{\mathrm{lat}}
\right)
-
\mu_Y
\left(
n,P,T_{\mathrm{temp}},\mathcal B_Y
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-1e38d24a12c0655c)

Here $n=\rho_{\mathrm{NS}}/\rho_{\mathrm{NS},0}$ is normalized Noether braid density, $P$ is pressure, and $T_{\mathrm{temp}}$ is thermodynamic temperature, distinct from absolute time $T$. The effective chemical potentials $\mu_E^B$ and $\mu_Y$ are constitutive comparison functions for that common transfer, not arbitrary bulk free energies and not the architrino bookkeeping constant $\mu_{\text{arch}}$. A bulk free-energy comparison instead requires a specified common inventory and thermodynamic potential.

The hypothesis behind dense iron-bearing phases is then not that the element symbol `Fe` directly sources a denser Noether sea. It is that the realized nuclear inventory, electron branch, metallic bonding branch, and pressure state reduce the relative cost of transferring the same iron inventory into the metallic environment rather than the specified silicate host as normalized Noether braid density increases:

$$
\frac{\partial}{\partial n}
\Delta\mu_{\mathrm{Fe/silicate}}^{\mathrm{metal}}
<
0
$$

[View →](../../../../equation-mapping.html#corpus-equation-f51858c849c67fb1)

The partial derivative is taken on a declared branch interval at fixed pressure, temperature, composition, and other independent branch coordinates. Along a planetary profile where these variables change, the total derivative contains their additional chain-rule terms. A negative partial derivative means a decreasing relative cost; it establishes neither a negative cost nor equilibrium existence or preference. This inequality remains a constitutive target to derive from assembly packing, exclusion-volume response, metallic bonding, pressure response, and Noether sea coupling, rather than from ordinary density alone. [Condensed Matter](condensed-matter.md#earth-core-iron-as-a-boundary-case) carries the Earth-core iron specialization and the packing sufficient condition.
```

This imports no thermodynamic law as an architrino premise. It aligns an explicitly effective comparison with the already restricted chemical-potential account in Condensed Matter lines 657–694. Independent support: multiplying an extensive free energy by the sample size while leaving a per-nucleus chemical potential unchanged changes an arbitrary mixed difference, so the original alternative `free-energy or chemical-potential` cannot establish a common phase preference without specifying inventory and units. On a profile $P=P(n)$, the chain rule gives $d\Delta\mu/dn=\partial_n\Delta\mu+(\partial_P\Delta\mu)P'(n)+\cdots$. For $\Delta\mu=-n+2P$ and $P=n$, the fixed-pressure derivative is negative while the profile derivative is positive. For $\Delta\mu=10-n$ on $0<n<1$, the derivative is negative while the cost remains positive. These are elementary effective-function counterexamples, not a new planetary constitutive model.

Falsifier: an existing explicit common-inventory/normalization definition and held-fixed convention governing the original paragraph would remove the ambiguity. The direct consumer Condensed Matter supplies those qualifications precisely because they are needed; its current text requires no duplicate repair. The original bare `T` is also inconsistent with that consumer's explicit thermodynamic-temperature label.

The shell-gap sentence at line 750 belongs to separate ASR-03 and is deliberately outside this replacement. Preserve the equation-view links; generator writes and any binder updates are outside proposal preparation.

## 6. Mass and energy conversion

Evidence: [NUC-01](../../aaa-operations/evidence/ops-031-nucleon-structure-review-2026-09-22.md).


Target: `content/markdown/aaa/nuclear-atomic/nucleon-structure.md:481–490`. SHA-256: `dc8f6687cebdf944892cb47aa40bcb41a66342d772fe675a8b4de80ecc51246d`.

Replace only the introductory sentence and its following display; retain the existing equation link and subsequent definitions of the three energy terms.

**Before (exact source):**

```text
The proton-neutron mass splitting should be read as a competition between at least three effects:
$$
\Delta m_{np}
\equiv
m_n-m_p
\approx
\Delta E_{\text{down-up}}
+\Delta E_{\text{Coul}}
+\Delta E_{\text{flux}}
$$
```

**After (proposed source):**

```text
The proton-neutron mass splitting is a recovery target for the difference between the two assembly response records. For this observer-level comparison, use one matched calibration and environment for both rest masses and the three energy contributions. Under the effective rest-energy relation, with the same assembly-channel speed $c_{\mathrm{eff}}$ for both records, the proposed decomposition is
$$
\Delta m_{np}
\equiv
m_n-m_p,
\qquad
\Delta m_{np}c_{\mathrm{eff}}^2
\approx
\Delta E_{\text{down-up}}
+\Delta E_{\text{Coul}}
+\Delta E_{\text{flux}}
$$
```

**Reason:** the current left side is a mass, while the three right-side terms are explicitly energy shifts. Independent dimensional checking gives $M$ versus $ML^2/T^2$. Multiplication by a common speed squared supplies the correct dimensions under the stated effective comparison. `nuclear-binding.md:27` expressly requires this common calibration/environment before factoring $c_{\mathrm{eff}}^2$; `assemblies/particle-masses.md:59–96` treats the effective rest-energy relation as a recovery target. The text introduces no substrate $E=mc^2$ premise, no numerical choice other than the standing $c_f=1$ convention, and no identification of $c_{\mathrm{eff}}$ with $c_f$ or photon speed. If the two records require different channel calibrations, the common-factor expression is unavailable and the owner must use their separately calibrated energy readouts instead. The underlying mass decomposition remains schematic and uncomputed.

**Falsifier:** an already declared governing convention that defines the three $\Delta E$ symbols in mass units would remove the mismatch, but the current chapter calls them energies and supplies no such convention.

**Integration note:** preserving the functional equation anchor avoids a routing change; generated equation-content consumers must be inventoried before any eventual source edit and regenerated only under the repository's existing authorization. No generator was run for this proposal.


## 7. Safe perturbation radius

Targets: [Braid Envelope Geometry](../../../../content/markdown/aaa/noether-braid/braid-envelope-geometry.md) and [Atomic Structure](../../../../content/markdown/aaa/nuclear-atomic/atomic-structure.md). Evidence: [ASR-01](../../aaa-operations/evidence/ops-031-atomic-structure-review-2026-09-22.md).


Original exact upstream range, Braid Envelope Geometry lines 567–593:

```markdown
The tolerance scales must be inherited from declared ledger comparisons. Let $\mathcal O_X[\mathcal B]$ be the channel readout produced from the projected branch record, and let $\Delta_X^{\mathrm{tol}}$ be the benchmark sensitivity fixed before the scan. For any retained scalar entry $y_\mu(\mathcal B)$ in channel $X$, the first admissible scale is the local pullback of that readout tolerance,

$$
\epsilon_{\mu,X}^{2}
=
\sup_{\delta y_\mu}
\left\{
\left(\delta y_\mu\right)^2:
\frac{
\left\|
\mathcal O_X[\mathcal B+\delta_\mu\mathcal B]
-
\mathcal O_X[\mathcal B]
\right\|_X
}{
\left\|
\mathcal O_X[\mathcal B]
\right\|_X+\varepsilon_X
}
\le
\Delta_X^{\mathrm{tol}}
\right\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-097fced51c1ca56c)

This definition makes the $\epsilon$ values derived chart scales: they are how far a retained ledger entry may move before the declared channel readout changes by more than the accepted tolerance. The practical first estimates are:
```

Replace that entire range with:

```markdown
The tolerance scales must be inherited from declared ledger comparisons. Let $\mathcal O_X[\mathcal B]$ be the channel readout produced from the projected branch record, and let $\Delta_X^{\mathrm{tol}}\ge0$ be the benchmark sensitivity fixed before the scan. For a retained scalar entry $y_\mu(\mathcal B)$, let $\mathcal D_{\mu,X}\subseteq\mathbb R$ be the declared domain of scalar perturbations $\delta y_\mu$ that remain in the same branch chart, contain the unperturbed value $0$, and admit the channel readout. All other independent ledger coordinates are held fixed. The local tolerance radius is

$$
\epsilon_{\mu,X}^{2}
=
\sup_{r\ge0}
\left\{
r^2:
[-r,r]\subseteq\mathcal D_{\mu,X},\quad
\frac{
\left\|
\mathcal O_X[\mathcal B+\delta_\mu\mathcal B]
-
\mathcal O_X[\mathcal B]
\right\|_X
}{
\left\|
\mathcal O_X[\mathcal B]
\right\|_X+\varepsilon_X
}
\le
\Delta_X^{\mathrm{tol}}
\quad\text{for every }|\delta y_\mu|\le r
\right\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-097fced51c1ca56c)

Here $\varepsilon_X>0$ is the declared readout normalization floor and $\delta_\mu\mathcal B$ is the branch perturbation associated with $\delta y_\mu$. The definition requires the entire centered interval to satisfy the readout bound; a distant passing perturbation cannot hide an intervening failure. Every perturbation with $|\delta y_\mu|<\epsilon_{\mu,X}$ is covered, while a finite supremum endpoint is included only when it also belongs to the chart and satisfies the bound. A zero radius supplies no positive symmetric tolerance. An infinite radius requires every finite scalar perturbation to remain admitted and satisfy the bound; readout insensitivity within a bounded chart alone does not imply an infinite radius.

The normalized diagnostics use positive finite certified scales no larger than these radii, with endpoint admission checked whenever a non-strict bound is used. A zero-radius entry is retained as an explicit admissibility constraint rather than a divisor; an entry certified unconstrained over the declared domain contributes no normalized penalty. Single-entry bounds do not establish stability under simultaneous perturbations of several entries, so the channel readout must still be checked for the joint branch record. The practical first estimates are:
```

Original exact Atomic Structure range, lines 333–349:

```markdown
Hydrogen-specific tolerance scales are fixed by the channel readout being protected. For a declared hydrogen channel readout $\mathcal O_{\mathrm H,X}^{(\ell)}$, the admissible tolerance pullback is

$$
\epsilon_{\mu,\mathrm H,X}^{2}
=
\sup_{\delta y_\mu}
\left\{
\left(\delta y_\mu\right)^2:
\Delta_{\mathrm H,X}^{(\mu)}(\ell)
\le
\Delta_{\mathrm H,X}^{\mathrm{tol}}
\right\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e000f86bae992d23)

where $\Delta_{\mathrm H,X}^{(\mu)}$ is the channel stability residual after perturbing only the retained ledger entry $y_\mu$ and projecting back to the same $\mathcal O_{\mathrm H,X}^{(\ell)}$. The supremum may be infinite when the readout is insensitive to the entry $y_\mu$; an unconstrained entry simply imposes no tolerance. In the first hydrogen pass this gives the following routing:
```

Replace that entire range with:

```markdown
Hydrogen-specific tolerance scales are fixed by the channel readout being protected. For a declared hydrogen channel readout $\mathcal O_{\mathrm H,X}^{(\ell)}$, let $\mathcal D_{\mu,\mathrm H,X}^{(\ell)}$ contain the scalar perturbations $\delta y_\mu$ admitted on the same branch chart, with all other independent ledger coordinates held fixed. The unperturbed value must be admitted and satisfy the channel bound. The local tolerance radius is

$$
\epsilon_{\mu,\mathrm H,X}^{2}
=
\sup_{r\ge0}
\left\{
r^2:
[-r,r]\subseteq\mathcal D_{\mu,\mathrm H,X}^{(\ell)},\quad
\Delta_{\mathrm H,X}^{(\mu)}(\ell;\delta y_\mu)
\le
\Delta_{\mathrm H,X}^{\mathrm{tol}}
\quad\text{for every }|\delta y_\mu|\le r
\right\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e000f86bae992d23)

Here $\Delta_{\mathrm H,X}^{(\mu)}(\ell;\delta y_\mu)$ is the channel stability residual after perturbing only $y_\mu$ and projecting back to the same $\mathcal O_{\mathrm H,X}^{(\ell)}$. The entire centered interval must pass, not merely its most distant passing point. The radius covers $|\delta y_\mu|<\epsilon_{\mu,\mathrm H,X}$; a finite boundary value also requires chart admission and the residual test. Zero supplies no positive symmetric tolerance, and infinity requires every finite scalar perturbation to remain admitted and pass. An insensitive readout on a bounded chart remains chart-limited. As in [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md#assembly-noether-sea-interface-diagnostic), use positive finite certified denominator scales, retain zero-radius entries as explicit constraints, and omit a normalized penalty only for an entry certified unconstrained over the declared domain. Joint perturbations still require the joint channel test. In the first hydrogen pass this gives the following routing:
```

### Independent mathematical checks and boundaries

With $c_f=1$ where a physical unit is needed (the following scalar example is dimensionless), take the declared chart $[-3,3]$, residual $\Delta(x)=|x(x-2)|$ and tolerance $1/4$. The original definition admits $x=2$, hence returns a squared scale at least four, although $x=1$ fails. The repaired definition instead stops no later than the first failure encountered from zero. In fact the negative side gives the limiting radius $r_*=(\sqrt5-2)/2$ because $\Delta(-r)=r(r+2)$; for all $|x|\le r_*$ this residual is at most $1/4$. This elementary calculation independently establishes the repair's intended property; it is not a simulated hydrogen response.

The set of passing centered radii is downward closed. If $|x|<\epsilon$, the supremum property gives a passing $r>|x|$, and its all-points condition proves the desired bound at $x$. This proves the strict-interior guarantee even when the endpoint is absent. If $\mathcal D=(-1,1)$ and the residual vanishes identically, the supremum is one although neither endpoint is admitted. If $\mathcal D=\mathbb R$ and the residual vanishes, the radius is infinite. If the only admitted scalar value is zero, the radius is zero. Failure of the baseline readout test means the radius is not defined for an accepted branch; it must not be silently treated as a passing zero tolerance. These are distinct cases.

Separate axis scans cannot certify joint perturbations: $\Delta(x,y)=|xy|$ vanishes on both coordinate axes but can exceed any fixed positive tolerance away from them. Therefore the added joint-readout sentence is a limitation of the existing diagnostics, not a new mathematical gate or a claim that the norm is physically derived. The chapter already calls these norms diagnostics.

This symmetric radius deliberately conservatively clips one-sided scalar domains. For a phase entry, the declared local scalar chart must specify its lift and branch range; the formula is not a global winding-angle invariant. Asymmetric directional tolerances would require a separate definition, outside this bounded repair.

Falsifier: a previously declared connected, monotone acceptance domain already restricting every `sup` to the initial passing interval would defeat the counterexample. The inspected formulas and surrounding prose do not impose it. A documented physical constraint eliminating the intermediate failure in one particular channel would fix that channel only, not the general definition.

### Affected consumers and implementation scope

`rg -n 'sup_\{\\delta y|tolerance pullback|local pullback of that readout|epsilon_\{\\mu,[^}]*X' content/markdown/aaa` identifies these two exact definitions; this is a scoped text search, not proof that no semantically equivalent definition exists elsewhere.

Direct in-document consumers inspected: Braid Envelope Geometry channel norms at lines 444–563, first clock/corridor/packing/penetration estimates at 595–660, and regularized mismatch denominators at 662–699; Atomic Structure hydrogen routing table at 351–358 and corridor conjunction at 361–388. None may claim that a far passing point licenses all smaller perturbations. Existing formula estimates remain estimates; their validity as safe scales must be checked against the declared domain and readout. The corrected definition does not by itself validate every displayed estimate.

The two changed equation bodies have equation-view links `097fced51c1ca56c` and `e000f86bae992d23`. Preserve their functional routing identifiers in the proposal; integration must inspect the live equation-mapping owner and binders before applying changes. This drafting task runs no generator and edits no generated artifact. A generated refresh, if required, belongs to its authorized procedure.


## 8. Candidate path-redshift condition

Evidence: [NSR-01](../../aaa-operations/evidence/ops-031-noether-sea-review-2026-09-21.md).


Target: `content/markdown/aaa/spacetime/noether-sea.md:1183`. SHA-256: `ce5cbbcd3860dd8092d101a4354b27c71ceeb38f7187a9fe44c3e6712950d2d9`.

Replace the complete paragraph, preserving its first two sentences.

**Before (exact):**

> The expansionary reading is therefore conditional. Local equilibrium by itself does not imply an effective expansion history. A Hubble-like redshift slope appears only if the coarse-grained transport has a signed, persistent cadence-space current or source-relaxation imbalance that projects into the photon path-rate functional while preserving image sharpness, line coherence, and packet time-dilation consistency.

**After (proposed):**

> The expansionary reading is therefore conditional. Local equilibrium by itself does not imply an effective expansion history. Within this candidate propagation mechanism, a Hubble-like path contribution requires a signed, persistent contribution to the independently calibrated photon path-rate functional while preserving image sharpness, line coherence, and packet time-dilation consistency. The candidate channels above include cadence redistribution or source imbalance, flow divergence, and anisotropic response; their physical realization remains to be derived.

**Reason:** the live candidate rate already has separate divergence and anisotropic-stress channels. On a bounded window, set $\mathbf u=H\mathbf X$ and $f=e^{-3HT}F(\nu)$ with $H>0$ and smooth positive integrable $F$, with cadence current and all source terms zero. Then $\partial_Tf+\nabla\cdot(\mathbf uf)=0$, while $\nabla\cdot\mathbf u=3H$. The stated ansatz permits $\alpha_{\mathrm{prop},X}=3Hp_{u,X}$ and $Y=3Hp_{u,X}L$ when the other rate terms vanish. This disproves the narrow necessary-condition claim within the ansatz, but does not establish a physical sea solution, calibrated coefficient, endpoint relation or cosmological recovery. The proposed wording stays within the candidate path mechanism; it does not assert that every possible redshift mechanism must be a path-rate effect. It leaves every equation and source reference unchanged.

**Falsifier:** a constitutive theorem restricting every admitted divergence/stress path response to nonzero cadence current or source imbalance would justify the original narrower condition. None was identified in the current chapter or its review receipt.


## Separate neutron dipole question — no implementation proposed


The live neutron section defines $\vartheta_n$ from axial sites only (lines 342–358), $\vartheta_{\mathrm{flux}}$ from the strong-sector flux corridor, and $\vartheta_{\mathrm{sea}}$ from local Noether sea response (lines 362–373). It also counts the three neutral braid cores separately in the constituent inventory (lines 24–30). The strong-CP consumer in `philosophy-history/solving-the-crisis.md` routes to this nucleon scaffold; a targeted `rg` search of the two chapters did not identify an explicit core first-moment term or a definition absorbing it into the other terms. This is a bounded definition check, not an exhaustive corpus theorem search.

Neutrality alone cannot supply the missing assignment: $+\epsilon$ at $+a\hat z$ and $-\epsilon$ at $-a\hat z$ have zero total charge but first moment $2\epsilon a\hat z$. This is an algebraic counterexample to an inference from charge count, not an admitted Noether braid history or predicted neutron EDM. A retained branch, time averaging, screening and the effective observer response could change the result, but none should be silently assumed.

Recommended follow-up at the existing neutron/strong-CP owner: determine whether the same declared observer projection (1) includes the core response within a currently named effective term, (2) requires an explicit core contribution, or (3) has a proved cancellation/bound on the admitted branch and averaging window. Identify the partition and avoid double counting. Preserve the current provisional scaffold until that question is resolved. This proposal does not add a term, claim cancellation, derive a new bound, or authorize a new research campaign.

The bounded mathematical issue is settled if the owner supplies the projection and a complete partition or a valid core-cancellation/bounding argument. It does not require changing the observational limit, axial count, or charge normalization. Both NUC-01 and NUC-02 passages were present before the September 12 repair by the inspected `66e0e47de^` source; these proposals do not attribute them to that repair or its editor.


## Preparation and implementation boundary

The operator authorized preparation of this proposal. The scheduled review's report-only boundary continues to govern source edits. The subsequent operator instruction “do 1” approved implementation of these eight corrections; the report-only boundary still governs other findings. Preserve concurrent work and recheck the exact source versions before applying any later approval. If a target has changed, reconcile the changed passage rather than applying a stale replacement.

After approval, preserve existing equation-viewer identities, reread every edited chapter, and independently verify the mathematical changes and direct consumers. Use focused Markdown, link and mathematical checks appropriate to these changes; no solver campaign or broad new test regime is implied. Generated writes and publication retain their separate authority. Retain the current coverage schedule and historical receipts.

## Verification and source snapshots

A Node exact-occurrence check was first verified against known repeated and absent strings, then matched all nine fenced before excerpts and the Noether Sea before paragraph exactly once across the six target sources. The initial assembly check caught collapsed display delimiters in the proposal; those were corrected and the complete check passed. No source replacement was executed. A separate reviewer checked items 1–4 against their owners and checked the tolerance proof and thermodynamic comparison; the algebraic references above, rather than reviewer agreement, support the recommendations.

The tolerance consumer review also noted that the direction-scale estimate and its squared denominator deserve a separate normalization assessment. Item 7 does not certify those first estimates or authorize changing them; retain this observation with the Braid Envelope Geometry owner for later scoped assessment.

SHA-256 source versions, measured with Node crypto and compared to the preparation snapshots:

- `content/markdown/aaa/foundations/ontology.md`: `48bf11bec4defceb1a317443928e43ecebfae28340aef02ac2f8c0754e47c43d`.
- `content/markdown/aaa/spacetime/observer-framework.md`: `a762461606eb437bb061399d0ffdc45b24ef14ee10e6fd53781d222f25a7e2ff`.
- `content/markdown/aaa/spacetime/noether-sea.md`: `ce5cbbcd3860dd8092d101a4354b27c71ceeb38f7187a9fe44c3e6712950d2d9`.
- `content/markdown/aaa/nuclear-atomic/atomic-structure.md`: `211304166faf077387833dee25256f893619053e2b3b8034e3dd27c313925d27`.
- `content/markdown/aaa/nuclear-atomic/nucleon-structure.md`: `dc8f6687cebdf944892cb47aa40bcb41a66342d772fe675a8b4de80ecc51246d`.
- `content/markdown/aaa/noether-braid/braid-envelope-geometry.md`: `8a9cc859f4e99b3ff69533f685217f3584acf1858f0384aafb9ad51ccd4960f5`.

## Implementation record

**Disposition:** ✓ all eight approved items implemented on September 23, 2026. The exact proposal replacements were applied across six chapters after their source hashes matched the preparation snapshots. A known-case-first Node extraction/replacement check verified literal dollar-sign preservation and unique matches before writing. The coordinator inspected the full six-file Git diff. This closes the bounded repairs only; CRW-005 remains closed, and the neutron dipole question and direction-scale normalization observation remain separately discussion-scoped.

### Independent mathematical references

The interval definition is supported by the downward-closed-radius proof above, not agreement between the two edited definitions. For any point strictly inside the supremum, a larger passing radius exists; its universal condition supplies the bound at that point. The explicit polynomial counterexample, open-chart endpoint and zero/infinite cases delimit the result. The fixed-pressure example and chain rule distinguish thermodynamic partial and profile derivatives. Dimensional analysis supplies the mass-energy correction; the finite-window continuity example supplies the path-channel counterexample. Probability factorization and covariance bilinearity supply the explanatory corrections. These statements certify mathematical scope, not a physical assembly or constitutive solution.

### Binding inventory and source preservation

Before editing, a scoped `rg -l` search of `scripts/`, `tests/`, `src/` and `.github/` enumerated exact target-path mentions: generated equation registry/build machinery, foundational-impact path contracts, source-index/navigation/MCP fixture consumers and historical scientific source-attempt/negative-control records. This was a path-reference inventory, not a claim of exhaustive semantic dependency discovery. Existing historical hashes and acquisition records were preserved. The equation generator consumes source formulas and contexts; source edits require its normal later authorized refresh. No equation-viewer identity was renamed.

### Checks

- ✓ Known-case-first exact source replacement: nine fenced replacements and one paragraph, realizing the eight approved items.
- ✓ Strict KaTeX rendering: 1,193 extracted expressions across the six edited chapters; the extractor first passed a known inline/display case. Viewer-anchor sequences matched the pre-edit snapshots exactly.
- ✓ `node scripts/validate-content.mjs --check --strict`: 1,867 repository Markdown files, 199 corpus files and 391 scenes; zero errors, zero warnings, 30 informational notes. This check preceded the final control-record updates.
- ✓ `node scripts/validate-equation-mapping-links.mjs`: 23 registered equation links resolve, its declared registry scope.
- `node scripts/build-equation-mapping-corpus.mjs --check` reports stale `content/generated/equation-mapping/corpus-equations.json`; preserve it until the authorized refresh using `node scripts/build-equation-mapping-corpus.mjs --write`, then rerun `--check`. No generated write was performed.

### Final source snapshots

- `content/markdown/aaa/foundations/ontology.md`: `d43ded1af95510794a91c8a74127a66bbd0b46f6f66251d86d56e8d6cdce7af5`.
- `content/markdown/aaa/spacetime/observer-framework.md`: `64eb792c613260c5b2a77e1f834e9da4366bb9cf0dcfe4056a8ebf670bd58c4a`.
- `content/markdown/aaa/spacetime/noether-sea.md`: `e7c3f20e2c7ee883c3bda4b23e747feecc3ea5298ac2b79a346b0dfb8d464c75`.
- `content/markdown/aaa/nuclear-atomic/atomic-structure.md`: `8ff9f9cc3a14938372389b6d5b6e1b8530cf4dbce73a202ae5907fa27f7bfbb0`.
- `content/markdown/aaa/nuclear-atomic/nucleon-structure.md`: `664c1ad83d902e9097d867d9090ee6c63298a78463d643f6e46e968f2b7e9c76`.
- `content/markdown/aaa/noether-braid/braid-envelope-geometry.md`: `42d5974e7e802a0d7538e7453a1390dbbced3181d1f92bc12b16c5f3f000961d`.

### Full-document review and remaining boundary

The Ontology/Observer reviewer read both complete final chapters and found no further correction needed for items 1–3. The Noether Sea/Nucleon reviewer read both complete final chapters, checked the targeted diffs and independently recomputed the continuity and dimensional arguments; no integration regression was identified. The Atomic Structure/Braid Envelope reviewer read both complete pre-edit chapters, the complete final diff and the changed passages with their consumers; ASR-01–03 pass at their stated scope. Reviewers who drafted replacement text are identified as author self-review, not independent second-review validation. A separate reviewer had checked the interval proof and thermodynamic examples before integration, and the coordinator rechecked those arguments and the exact final diff during integration.

Scientific realization, joint-perturbation stability, branch existence, constitutive coefficients and neutron core-dipole accounting are not established by these repairs. An altered final source hash, a mismatch from the approved replacement, or a counterexample to the stated interval/dimensional/continuity arguments would reopen the affected disposition. No review cycle completion or coverage advance is claimed for implementation work.

### Separately approved neutron table clarification

✓ Implemented September 23, 2026 after the operator approved the optional refinement identified in the six-receipt audit. In Nucleon Structure's summary table, “neutral nucleon, stable in nuclei, weakly unstable free” becomes “neutral nucleon, nuclear stability depends on environment, weakly unstable free.” This brings the table into agreement with the existing environment-dependent statement in the Neutron section. The original review receipt remains historical; this is additional to the eight-item batch and does not resolve the neutron dipole question.

The scoped unstaged `git diff` shows only this table-row replacement in the chapter; `git diff --check -- content/markdown/aaa/nuclear-atomic/nucleon-structure.md` passed. No equation, link or table delimiter changed, so no new mathematical or rendering test was needed. The subsequent source SHA-256 measured by `shasum -a 256` is `b83d362a6068b0c7aaef6b989cbb0253d0b99be5c7258c9a5d2eeedda082f91d`; it supersedes the earlier implementation snapshot for this chapter only.
