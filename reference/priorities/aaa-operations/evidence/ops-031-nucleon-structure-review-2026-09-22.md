# OPS-031 — Nucleon Structure review, 2026-09-22

## Disposition and source boundary

Completed report-only review of all 540 lines of [Nucleon Structure](../../../../content/markdown/aaa/nuclear-atomic/nucleon-structure.md), including every displayed equation, under the live corpus-review skill and periodic review procedure. There is one demonstrated dimensional specification defect and one open completeness question. Neither licenses a substantive edit in this pass. The chapter's numerous explicitly open physical recovery targets remain open. CRW-005 remains closed.

The source SHA-256 measured by `shasum -a 256` before review was `dc8f6687cebdf944892cb47aa40bcb41a66342d772fe675a8b4de80ecc51246d`, matching the [September 12 repair receipt](../../aaa-corpus-rewrite/evidence/crw-005-nucleon-structure-review-2026-09-12.md). The same hash was measured after review. `git --no-optional-locks status --short -- content/markdown/aaa/nuclear-atomic/nucleon-structure.md` returned no entry. Only this evidence receipt was authored; shared records belong to the coordinator.

Reviewer: Codex delegated agent `ops_031_observer`, continuing the existing review lineage. No model adoption, superiority claim, or new model evaluation was performed. Review time and operator burden were not measured.

## NUC-20260922-01 — Mass and energy units are mixed in the splitting equation

**Severity and grade:** moderate; derived dimensional defect in the stated equation, not a numerical mass prediction failure.

**Passage:** lines 479–502 define $\Delta m_{np}=m_n-m_p$ and equate it approximately to three terms explicitly described as energy shifts. Neither this section nor the chapter declares a mass-in-energy-units convention or a mass-to-energy conversion. The earlier trace response at lines 220–244 is a mass response, so it does not establish that the later $m$ is already an energy variable.

**Independent check:** dimensional homogeneity requires both sides of an additive equality to have the same dimensions. A mass difference has dimension $M$; an energy difference has dimension $ML^2/T^2$. Setting the primitive wake speed to the numerical value $c_f=1$ does not itself define the observer-channel mass/energy calibration, and cannot silently identify that calibration with the medium-dependent assembly speed.

**Nearby canon:** [Nuclear Binding](../../../../content/markdown/aaa/nuclear-atomic/nuclear-binding.md), line 27, explicitly requires matched observer calibration and environment before factoring a common $c_{\mathrm{eff}}^2$ from mass differences. [Particle Masses](../../../../content/markdown/aaa/assemblies/particle-masses.md), lines 59–96, grades $M_0c_{\mathrm{eff}}^2$ as an observer-level energy recovery target, not a substrate axiom. These passages support the intended layer; the independent dimensional check is the reason the current equation is incomplete.

**Smallest repair for adjudication:** declare the common observer calibration and write $\Delta m_{np}c_{\mathrm{eff}}^2\approx\Delta E_{\mathrm{down-up}}+\Delta E_{\mathrm{Coul}}+\Delta E_{\mathrm{flux}}$ at that effective comparison level, or explicitly define every $\Delta E$ as an already converted mass-equivalent contribution and rename it accordingly. Do not introduce $E=mc^2$ as a primitive architrino premise. Which convention the owner chooses is an editorial/interface decision; no calculation of the three terms is required merely to fix their units.

**Consequence and falsifier:** an implementer cannot compare the sum to a mass datum without supplying an unstated conversion. The finding is overturned by a governing local definition that already gives the terms common units and identifies the conversion consistently with the neighboring mass map.

## NUC-20260922-02 — State where the braid-core dipole contribution goes

**Severity and grade:** moderate open definition/proof obligation; not a demonstrated nonzero physical neutron EDM.

**Passage:** lines 24–30 retain eighteen neutral-scaffold sites in the 36-site nucleon inventory. Lines 342–358 then correctly define only the eighteen axial sites' first moment, while lines 362–398 call axial plus flux plus local sea the neutron-assembly residual and use it for the experimental target. No term or explicit cancellation statement identifies the three braid cores' own electric first moment under that same observer projection.

**Independent limitation:** neutrality is a zeroth-moment condition. For charges $+\epsilon$ at $+a\hat{\mathbf z}$ and $-\epsilon$ at $-a\hat{\mathbf z}$, total charge is zero but the first moment is $2\epsilon a\hat{\mathbf z}$. Adding two more neutral pairs with opposite first moments preserves a six-site neutral inventory and leaves the first pair's nonzero moment. This is an algebraic witness to what neutrality alone cannot imply; it is not claimed to be an admitted or retained Noether braid trajectory. Time averaging, shielding and the physical readout can remove or suppress that contribution, but require their own stated map or bound.

**Nearby canon:** the [Quarks](../../../../content/markdown/aaa/assemblies/fermions/quarks.md) opening distinguishes the neutral scaffold from its exposed axial layer. That charge decomposition does not alone identify every electric multipole with the axial layer. The target itself correctly says at line 353 that axial neutrality does not prove zero first moment; the same mathematical distinction applies to the core inventory unless additional structure is supplied.

**Smallest repair for adjudication:** explicitly identify whether the core first moment is included in an existing effective term, is canceled under a specified retained-branch/time-average condition, or requires a separate core term in the total target. If absorbed, state the partition to avoid counting it twice. If canceled, retain the cancellation as an open condition until proved. A new ledger or checker is unnecessary.

**Consequence and falsifier:** the current three-term expression cannot be treated as a complete assembly EDM bound without this assignment. The concern is overturned by a referenced core-cancellation theorem valid for the admitted neutron record, a bound below the allocated tolerance, or an explicit existing-term definition covering the core response. It does not refute the present chapter's explicitly provisional scaffold or establish a new experimental conflict.

## Repair survival and history

The accepted charge-unit repair NS-03 survives. `git show 66e0e47de -- content/markdown/aaa/nuclear-atomic/nucleon-structure.md` shows the actual transition from bare $Q_u=2/3$, $Q_d=-1/3$ and bare integer proton/neutron charges to ratios $Q/e$. `git show 66e0e47de^:content/markdown/aaa/nuclear-atomic/nucleon-structure.md | shasum -a 256` returned the recorded pre-repair digest `c59045877b888820184a789dec27289f9898d2319f591c3fb0d0edff24228fe5`; the current digest matches the receipt's final version.

**Independent check:** dividing the charge-valued expressions by the positive charge unit $e$ makes both sides dimensionless. The independent axial counting gives $(5-1)/6=2/3$ and $(2-4)/6=-1/3$; consequently $2(2/3)-1/3=1$ and $2/3+2(-1/3)=0$. Thus correctness survives, the original proton/neutron assignment is preserved, and the repair improves explanatory clarity by making the units explicit. Falsifier: an inconsistent definition of $e$ or the axial signs in the same declared quark record.

NS-08's source qualifier also survives a bounded primary-source check: [Abel et al., Physical Review Letters 124, 081803 (2020), page 081803-5 after equation (7)](https://journals.aps.org/prl/pdf/10.1103/PhysRevLett.124.081803) gives $1.8\times10^{-26}\,e\cdot\mathrm{cm}$ at 90% confidence, as the chapter states. This is the selected experiment's bound, not a claim that it is the newest bound or evidence for the proposed assembly mechanism. The elementary unit conversion $0.8\,\mathrm{fm}=0.8\times10^{-13}\,\mathrm{cm}$ gives $1.35\times10^{-12}$ for the displayed conditional ratio, consistent with its rounding to $1.4\times10^{-12}$.

The parent of the inspected repair commit already contains both the unconverted splitting equation and the axial/flux/sea dipole scaffold at the same lines. `git show` on that parent was read for these exact passages. Therefore these concerns were present before the September 12 repair; they are not demonstrated regressions introduced by that repair. No claim is made about their original author or earliest introduction.

## Whole-chapter coverage and limits

| Lines | Review disposition |
| --- | --- |
| 1–58: candidate architecture, inventory and charge | Conditional inventory $3\times12=36$ and charge arithmetic check out. Candidate status and mass-recovery limits are retained. NS-03 survives. |
| 59–85: color-singlet comparison | Occupancy is explicitly distinguished from a full antisymmetrized map, transport and branch retention. No new repair proposed. Counting one of each color alone is not being accepted as a dynamical proof. |
| 87–213: proton source-envelope interface | The projections and tolerances remain schematic closure targets, with color leakage, refinement and ledger ownership distinguished. Their actual norms, positive denominator scales, admitted window family and dynamics still require specification before numerical use. No passing result is claimed. |
| 214–291: mass and spin budgets | Composite response terms and angular-momentum rows remain open accounting targets. A vector magnitude target does not by itself derive spin-$1/2$ measurement statistics; the page explicitly routes the derivation to the angular-momentum owner. No automatic replacement by a quantum Casimir magnitude is proposed. |
| 293–336: proton and neutron inventory | Axial totals $(12,6)$ and $(9,9)$ give the stated charges. Environment-dependent neutron stability is correctly stated in the prose. |
| 338–418: neutron EDM | Axial neutrality versus first moment is correctly separated; conditional tolerance arithmetic and chosen bound checked. Core-response completeness is NUC-20260922-02. A permanent observer EDM still needs the admitted time averaging and readout map; this review supplies none. |
| 420–478: geometry, spin and magnetic moments | Candidate network, open spin decomposition and magnetic-sign recovery limits preserved. Polarity sites alone are not treated as retained circulating motion. No new repair proposed. |
| 479–502: splitting | NUC-20260922-01; no quantitative splitting was computed or validated. |
| 504–540: nuclear interface, table, targets and navigation | Explicit candidate residual interaction and remaining targets preserved. The table's abbreviated “stable in nuclei” should be read with the environment-dependent prose, not as a theorem for every isotope; that abbreviation is an optional future editorial refinement rather than a new scientific result. |

Supporting source snapshots measured by `shasum -a 256`: Quarks `e4ea5dfe452b20e54055d2694fbfb770a3cdf02fc261c02fb4bea8be217ab028`; Particle Masses `7c12ec4982c88d82c7e0d07af8e6f690f559352a05cbad342024eacecc23e945`; Nuclear Binding `0ea9a4a3d237e770d3fff6e62b3dc16049abb6de2eee6baf737b2014d054ac7d`. Only the cited task-relevant passages of these supporting chapters were reviewed; their full coverage is not claimed.

No source change, generator, numerical simulation, broad test suite or independent physical branch validation was performed. Findings require existing corpus/subject-owner adjudication; source-envelope, confinement, mass, spin, magnetic moment and EDM closure remain unresolved at their stated scopes. The parent runner owns the coverage cursor, referrals and next due date. Receipt-only whitespace validation uses `git diff --no-index --check /dev/null` on this file.
