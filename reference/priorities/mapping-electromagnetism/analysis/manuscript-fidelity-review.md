# Electromagnetism Manuscript Independent Fidelity Review

## Review decision and frozen candidate

The full source-to-manuscript and manuscript-to-source review accepts the repaired manuscript for editorial fidelity within the reading boundary below. All three actionable findings are closed by direct review of the coordinator's changes. This is not a verdict on physical electromagnetic recovery.

The reviewer is separate from the manuscript writer and owns only this report and disposable review scratch. The reviewer read the full [manuscript](../manuscript.md) and [coverage record](manuscript-source-coverage.md), and did not edit either. The coordinator owns bounded repairs. Direct `shasum -a 256` measured the reviewed manuscript as `3ccbdbc1abcd285c6b1de270d07435c4e29b906575bbea90ce3a30294f98a49f` and coverage as `8b7bb45fa046bc73a19a6d735ed89371265575aff8c90a9d3669c4423c1f0717`. The manuscript was read in untruncated ranges 1–175, 176–350 and 351–506; coverage in ranges 1–96 and 97–184. Truncated combined outputs received no reading credit and were repeated separately.

## Reading and preservation boundary

All 13 original lane files were freshly read in full for this independent review. The known-case-tested inventory measured 329,781 bytes. Its fixture contained three nested, hidden and non-Markdown files totaling seven bytes with a known `abc` digest; that fixture passed before enumeration of this lane. A concurrent draft appeared in the initial inventory and was explicitly excluded from the 13-original source baseline. Enumeration alone received no semantic reading credit.

| Original source | Complete direct reading |
| --- | --- |
| [Strategy](../priorities.md), [queue](../work-queue.md), [brainstorming](../brainstorming.md), [Maxwell exploration prompt](../campaigns/fine-grained-braid-maxwell-exploration-prompt.md) | Full untruncated `cat` of each |
| [Source/moment/field matrix](../evidence/common-axis-source-moment-field-matrix.md) | All 122 lines |
| [Background JSON](../evidence/adaptive-cubic-background-o0-audit-2026-08-25.json), [site-local release JSON](../evidence/adaptive-cubic-site-local-release-ladder-audit-2026-08-25.json) | All 59 and 86 lines as structured text |
| [Fixed-law continuation](fixed-law-source-continuation.md) | All 220 lines |
| [Multi-receiver response](e0-e4-multi-receiver-electric-response.md) | 1–185 and 186–327 |
| [Fine structure](fine-structure.md) | 1–220, 221–435, 436–620 and 621–734 |
| [Adaptive kinematics](adaptive-cubic-medium-kinematics-and-ledger-contract.md) | 1–180, 181–365 and 366–478 |
| [Cubic lattice](f6c-cubic-lattice.md) | 1–180, 181–365, 366–520 and 521–664 |
| [Work log](../work-log.md) | 1–85, 86–175, 176–265, 266–355, 356–430 and 431–478 |

The reviewer had read the shared Mapping README and work log before this assignment, and had only partially read the method. For this review all three were freshly read in full: [README](../../mapping/README.md), [work log](../../mapping/work-log.md), and [method](../../mapping/contracts/mapping-method.md), the latter through consecutive ranges 1–250, 251–500, 501–750, 751–1000 and 1001–1219. The writer's inherited full reading of these documents is a separate receipt and is not used to establish the reviewer's reading.

For the outside [inverse requirements packet](../../mapping-equations/analysis/inferring-braid-requirements.md), the reviewer fully read exactly lines 1–205, 5095–5504 and 5654–6042: 1,004 of 9,726 lines. The additional 6013–6042 passage was read for the collision finding; it does not increase the original writer's stated 974-line reading. The remaining 8,722 lines were not fully read. Heading navigation and isolated search hits outside these ranges, including angular-coordinate matches, are search-only evidence and do not receive full-passage credit. Direct hashing matched `14d619486d4c40672fb9dad8ccddccaf2958c8221dc64d454d6d0a60ab35721f`.

No linked scientific code, runtime population, outside retained evidence collection, current Braid owner or external paper was independently read in full or executed by this reviewer. The writer's coverage reports bounded primary numerical inspection of the NIST CODATA 2022 table and the PDG 2024 five-flavor coupling paragraph; this reviewer checked the manuscript's attribution and agreement with the fully read fine-structure packet, not those external papers. Neither receipt amounts to experimental reanalysis or full primary-literature mining.

After source and manuscript review, `shasum -a 256 -c` returned all 13 original paths and all three shared Mapping paths unchanged against the review scratch baselines. These scoped digest checks establish preservation of those 16 inputs, not of every linked external artifact. The inverse digest was separately matched. The earlier Equation Mapping extraction remains frozen outside this review.

## Actionable findings

### EM-F1: Collision period wording — closed

The first writer freeze described equal-speed counter-rotating members as meeting twice per relative cycle. Inverse-packet lines 6013–6042 give angular separation advancing at twice either member's angular speed. A full relative-phase cycle therefore has one coincidence, whereas one individual orbital period has two. The coordinator changed manuscript §2.2, line 72 in the reviewed candidate, to “twice per individual orbital period.” Direct rereading of that line and the source equations closes the wording defect. The collision obstruction and source bytes remain unchanged.

### EM-F2: The circular contribution needs an explicit center convention — closed after repair

Manuscript §2.1 defines internal positions and velocities relative to the full assembly's geometric centroid. Section 2.2, lines 60–67, then states that direct substitution for two opposite-polarity circular members gives a pointwise nonzero countercirculation moment. Inverse-packet lines 5907–5965 also name centroid-relative coordinates, but state a cycle-averaged proportional result and leave the common-circle-center convention implicit. The manuscript strengthens that already ambiguous source statement.

There is a direct counterexample to an unqualified isolated-binary reading. For an equal-weight two-member assembly, centroid-relative coordinates obey

$$
\mathbf r_-=-\mathbf r_+,
\qquad
\mathbf u_-=-\mathbf u_+.
$$

Consequently the manuscript's own signed internal moment is

$$
\frac e2\left(\mathbf r_+\times\mathbf u_+-\mathbf r_-\times\mathbf u_-\right)=\mathbf0,
$$

even if the two trajectories counterrotate about some other fixed center. A nonzero moment computed about that other center includes terms removed by recentering; it is a different diagnostic. This algebra is an operational-definition check, not a new primitive law or a physical no-go for larger assemblies.

The displayed circular formula is valid as the pair's contribution when both circles are explicitly centered at the full assembly centroid with constant radius, fixed axis, constant signed angular velocities and equal exposure. A balanced larger assembly can satisfy that condition while a subpair's own centroid moves. The coordinator now states these assumptions, derives the constant cross product, distinguishes the isolated moving-pair-centroid cancellation, and explicitly contrasts the source's cycle-averaged proportional statement with this normalized conditional equality. Coverage records the implicit-center source tension. Direct rereading and the vector triple-product identity close this finding; no physical binary moment or new primitive law is claimed.

### EM-F3: Neighbor timing evidence is disjunctive — closed after repair

The first reviewed manuscript §7.2, line 345, required a bracketed swap **and** a dwell interval. Adaptive source line 268 requires a bracket **or** dwell record; line 451 repeats bracket-or-dwell timing evidence. Requiring both silently strengthened the protocol and excluded one source-admitted timing route. Direct rereading of the coordinator's replacement confirms the source disjunction while preserving reciprocity, persistent identities and continued root/account provenance. This closes the fidelity defect in the new prose without changing the frozen contract.

## Two-way substantive audit

The table records what was checked against the full originals. Supporting detail remains substantive source material; the coverage record supplies precise locations and reasons for keeping that detail outside the main chapters. A complete manuscript need not reproduce every historical command or numerical row, but it must retain each distinct result or an explicit support disposition.

| Manuscript scope | Independently checked substance and boundary |
| --- | --- |
| §§1–2, source and moment | Raw exposure and moment normalization, transport versus internal circulation, six independent comparison cases, and direct-only/sea-essential/mixed alternatives survive. Total agreement cannot hide privately fitted direct and sea shares. The repaired full-assembly center convention and isolated-pair cancellation close EM-F2. |
| §3, Maxwell and capacitor | One population/window/projection, six source families, exposure-aware continuity, homogeneous edge identities versus sourced constitutive equations, and the two-chain proposal retain target or conditional grade. The capacitor discussion preserves total current through two surfaces, ideal axial null, plate deficit versus carrier ontology, wire drift versus signal propagation, and the open microscopic wire/gap mechanisms. |
| §4, electric receivers | Four distinct receiver classes, including a neutral nucleon surrogate with no neutron identification; passive common-event stage versus coupled common-prefix forks; five controls; source versus receiver conjugation; mass-free centroid and separate rigid orientation, deformation and signed moments; uniform neutral response versus gradients; last-source-wake clearance and acceleration cessation versus erasure of velocity all survive. |
| §5, magnetic receiver | A fixed hit has no primitive receiver-velocity factor; finite-history response and all-velocity weak skew lemma remain conditional. The shared spin/moment/splitting/gradient/history bundle and independent reversals do not become a recovered primitive magnetic law or selected carrier. |
| §6, cubic results | Stationary inversion-paired cancellation under a fixed invertible homogeneous map does not become absolute convergence, elasticity or moving retention. The finite-cube contraction, track-center/member distinction, shared-vertex obstruction, two-site/eight-site distinction and higher-order cubic anisotropy survive. Three negatives remain distinct: finite rigid orbit symmetry leakage, rigid boundary-release ladder, and orientation-balanced site-local release mismatch. None becomes an infinite-medium no-go. |
| §7, adaptive geometry | Persistent identities, derived charts and gauge/degeneracy, history needed for antipodal centers, continuous error enclosures and independent return verification remain explicit. Return, transverse stability and physical response are separate. Orientation second moment and three-direction agreement are not global isotropy. Missing background and physical receivers block the comparison rather than report a failed physical measurement. The repaired timing disjunction closes EM-F3. |
| §8 and detailed chronology coverage | Coordinate-rank/common-locus distinctions, exact clearance versus acceleration mismatch, expanded chart tangency versus retention, breathing/current/reflected return, root-enclosure pressure versus collision, scoped waveform/near-miss negatives and seed speed guards retain their limits. Coverage explicitly retains non-electromagnetic historical families as support, without asserting fresh reading of their moved owners or upgrading a count, topology or diagram to particle identity. |
| §9, action and fine structure | Candidate closed-orbit Poincaré–Cartan period differs from an off-shell action and unrecovered empirical Planck normalization. Fixed matter/sea/charge/action/photon parents differ from scale-response children. Geometry-first action and withheld consumers prevent circular alpha fitting. Scheme-specific anchors, inverse-coupling logarithm, active-inventory limits, off-shell thresholds, recoil disagreement, QED/QCD distinction, optional unification and formal Landau extrapolation retain effective grade. Source tension over mandatory sea response is explicitly disclosed. |
| §10, continuation | Fixed law, history and inventory; two signed pairs with held-out comparison; first sampled boundary versus first continuous threshold; recorded tangent and residual as authored-fixture output; inactive-gap change versus collision; accepted product basins and identity/accounts before pair capture all survive. No physical continuation population, pair capture or backreaction is claimed. A strong-field rate alone does not establish internal speed. |
| Coverage and queue boundary | All 13 originals have full-read receipts and result/support dispositions, including the dense 98 KB work log. The shared-source and selective outside-packet reads are distinguished. Report-only matrix completion does not reactivate deferred execution or transfer equation, benchmark or Braid ownership. |

No further actionable source omission or claim upgrade was found in these fully read scopes. This is a bounded semantic conclusion: a distinct source result with neither a manuscript treatment nor a precise supporting disposition, a stronger claim than its hypotheses, or a source digest delta would overturn the corresponding row.

## Verification reach

The reviewer checked mathematics by direct definition and source comparison, including the collision cadence and centroid cancellation above, and checked source preservation with SHA-256. The writer and coordinator report known-case-first math, link and whitespace checks and a bounded browser preview of §2.1. Those instrument receipts are separate from this semantic audit; this reviewer did not repeat them or claim a full visual, code, runtime or experimental audit.

Direct hashing identifies the accepted repaired manuscript as `92868035eea6ff0db730ddf2f17b589fdf1cfbefd651502ec914c90989d2dac6` and the reviewed coordinator repair coverage as `48cf65bb69b06d8ee55b3b5b08fc13d55cf4ed580fbe1b23d1e5486513104c05`. The reviewer directly reread the complete changed §2.2, changed §7.2 paragraph and both coverage repair paragraphs. Constant signed angular velocities and a fixed axis are explicit in the final §2.2 assumptions. Source digest checks again returned all 13 originals and three shared owners unchanged; the inverse digest also matched. Later validation or navigation receipt additions to coverage need not reopen these mathematical findings, but their bytes must be identified separately.

For this report, the existing scoped link and loose-math instruments were inspected and their known cases rerun before target use. They found 19 existing local link targets, two protected math displays and no loose TeX commands. `git diff --no-index --check /dev/null` emitted no whitespace diagnostics. These checks do not establish semantic fidelity; the independent source reading and explicit algebra above supply that review.

The coordinator reports affected validation against the accepted manuscript hash: 179 math expressions, 29 displays and 16 links, with no missing local target, stray delimiter or trailing-whitespace diagnostic; all 179 expressions rendered through KaTeX 0.16.11 with no omitted image. It also reports a real-browser check of the nine-expression §2.2 excerpt at 1280 by 720, showing the explicit centroid and constant-axis assumptions, displayed moment and isolated-pair cancellation legibly in `centroid-final.html` and `centroid-final.png` under writer scratch. These are named coordinator receipts, not a visual inspection performed by this reviewer. They satisfy the affected validation handoff without implying a full-manuscript visual or scientific audit.
