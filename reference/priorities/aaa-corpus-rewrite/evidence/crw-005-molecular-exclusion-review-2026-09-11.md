# CRW-005: Independent Review of Molecular Exclusion and Noether Sea Response

Review date: 2026-09-11. Assignment: independent, whole-chapter corpus review in the existing shared Architrino checkout. Disposition: revisions recommended; the worked occupancy calculation is sound at its declared comparison level, but the membrane example, propagation scope, notation, and handoff to the revised medium-response test need repair. No corpus correction or tracker update is made by this report.

## Scope, provenance, and independence

The reviewed source is [Molecular Exclusion and Noether Sea Response](../../../../content/markdown/aaa/spacetime/molecular-exclusion-and-noether-sea-response.md). All chapter line numbers below refer to its 132-line snapshot. The complete source, including every paragraph, list, equation, and link, was read with `nl -ba`. The complete revised [Noether Sea](../../../../content/markdown/aaa/spacetime/noether-sea.md) was read in numbered ranges 1–310, 310–660, 661–985, and 986–1271. Its SHA-256 matches the assignment exactly by `shasum -a 256` and the independently called Node crypto implementation.

| Source | Lines | SHA-256 |
| --- | ---: | --- |
| Assigned chapter, live | 132 | `92cd94305e5ddc4ababce879fa2d5a872947738b3ca09985c772494431518c10` |
| Revised `spacetime/noether-sea.md`, live | 1271 | `ce5cbbcd3860dd8092d101a4354b27c71ceeb38f7187a9fe44c3e6712950d2d9` |
| Assigned chapter at `897fe1aa7` | 129 | `342cfb2220dcf99ee8093b7ef7adbdf4ab7b86282ee8054ba5d011fb1a5bd715` |

Claim grade: measured. The live counts are newline counts from `wc -l`, cross-checked by Node; all three sources end with a newline. Historical bytes were read with `git show 897fe1aa7:content/markdown/aaa/spacetime/molecular-exclusion-and-noether-sea-response.md`. The historical commit resolves to `897fe1aa79be7ae1e77144d52ef396d209645323` by `git rev-parse --verify`. A provenance observation at `2026-09-11T05:06:01Z` recorded checkout HEAD `8f07f380f832dc9d1bb332382097fbc40731b8c6`; source hashes, rather than HEAD alone, identify this review. Falsifier: different bytes, line counts, or commit resolution under the recorded commands invalidate the corresponding snapshot assertion.

The live procedure was selected through `AGENTS.md`, the generated startup router, the architrino-review skill and its maintained owner, and the current [corpus reviewer procedure](../../../office-of-research/cto/prompts/corpus-reviewer.md). The review also consulted the operator explanation and execution standards, theory orientation, About Architrino source policy, academic and mathematical style guides, mathematical terminology, terminology usage, comparative glossary, and geometry/dynamics review lens. Live sources govern; role names and prior review outcomes supply no scientific evidence.

Nearby canon was checked at the passages relevant to this chapter: all of Molecular Geometry and Noether Sea Pro/Anti Coupling; the opening ontology/coordinate passages of all seven foundation anchors named in the review procedure; the opening postulate and causal-law passages of Master Equation; Emergent Metric lines 1–65; Gravitational Waves lines 1–58; Condensed Matter's opening closure boundary and targeted exclusion/transport passages; and the opening referent/scope passages of Neutrinos and Dark Matter. These are consistency checks, not full reviews of those other chapters. No other review report, shared campaign tracker, reviewer message, or reviewer conclusion was consulted. The review remained single-agent; independence comes from the derivations and external evidence identified below.

The full pre-campaign assigned chapter is available. `git diff 897fe1aa7 -- content/markdown/aaa/spacetime/molecular-exclusion-and-noether-sea-response.md` shows only three added blank lines after equation-view links. Thus its substantive wording was already present at that historical snapshot. This comparison does not identify when that wording originated or who caused a defect. The historical Noether Sea composition passage was separately inspected with `git show`: its joint visibility/response formula had two maximum arguments; the current owner separates visibility into two independently normalized arguments and retains a third response argument.

## Findings

Severity convention: P1 would invalidate the central argument or require urgent correction; P2 is a substantive factual, mathematical-scope, evidence, or canon defect; P3 is a localized explanatory or editorial improvement. No P1 finding is established. The following findings distinguish demonstrated errors from missing support and ambiguous scope; they are recommendations, not accepted edits.

### F1 — P2: Oxygen is not generally excluded by lipid membranes pending protein assistance

Location: chapter line 109; the material-boundary generalization recurs at line 130.

The sentence about oxygen being excluded by cellular membranes unless aided by proteins supplies a false general mechanism. A lipid bilayer can itself transmit molecular oxygen. The skin barrier and transport through a single cell membrane are also different physical systems, so skin permeability cannot be inferred from a universal membrane prohibition.

Claim grade: measured for the external comparison; inferred for rejection of the chapter's generalization. Widomska, Raguz, and Subczynski's 2007 study estimates oxygen permeability from saturation-recovery electron paramagnetic resonance measurements of oxygen/spin-label encounters. Its protein-free POPC membrane comparison gives nonzero permeability, reported as 157.4 cm/s at 35 °C. The experiment-derived permeability is a counterexample to a requirement for protein assistance, not a measurement of oxygen flux through intact human skin. The inspected evidence is the indexed primary-paper PubMed abstract, [PMID 17662231](https://pubmed.ncbi.nlm.nih.gov/17662231/), DOI `10.1016/j.bbamem.2007.06.018`.

Smallest repair: replace the oxygen sentence with an accurate channel distinction, for example: “A lipid membrane can transmit oxygen by passive diffusion while strongly restricting other solutes; permeability depends on molecular properties and membrane composition.” If the intended example is specifically skin, identify the skin layer and transported species and supply matching evidence.

The neighboring air–water assertion, that molecules cannot cross without “surface disruption,” needs a narrower meaning rather than being reported here as a second proved biological error. Equilibrium vapor exchange and gas dissolution involve molecular rearrangement without requiring a visible rupture of the interface. If microscopic rearrangement is all “disruption” means, the sentence adds little explanatory content. The chapter's own humidity example at line 55 makes permeability a better teaching contrast than an impermeable molecular wall.

Falsifier: evidence that the cited protein-free membrane has zero oxygen permeability, or an explicit chapter restriction to a barrier for which the protein requirement is demonstrated, would overturn the stated counterexample's application. Neither appears in the reviewed sentence.

### F2 — P2: The shared residual is invoked beyond its declared channel domain

Locations: chapter lines 5 and 132; current Noether Sea lines 154–168; historical Noether Sea “Composition.”

The final sentence requires photon, neutrino-like, clock, and gravitational-wave channels to pass the shared residual. The linked owner explicitly defines its family as $X\in\{\gamma,\mathrm{clk},\mathrm{mat},\nu\}$; it does not include a gravitational-wave member. A formula with a channel index can be extended, but that extension must name its observable, projection, loss/scattering diagnostic, preferred-frame diagnostic, norm, and tolerances. A channel name alone supplies none of those entries.

Claim grade: measured for the domain mismatch by direct comparison of the numbered sources; derived for the failure of an undeclared extension to define a numerical test. The current owner requires

$$
\max\!\left(
\frac{\mathcal R_{\mathrm{loss/scat},X}}{\epsilon_{\mathrm{loss/scat},X}},
\frac{\mathcal R_{\mathrm{LV},X}}{\epsilon_{\mathrm{LV},X}},
\frac{\|O_X^{\mathrm{eff}}-\Pi_X[\Theta_{\mathrm{sea}},\mathcal L_X]\|}{\epsilon_{\mathrm{resp},X}}
\right)\le1
$$

The first ratio bounds loss/scattering, the second preferred-frame visibility, and the third error against an independently specified response observable. All scales are positive and fixed for the stated comparison. These are conditions to evaluate, not evidence that any channel already passes.

Line 5 also retains “two-row” wording from the older owner. Two conceptual concerns—visibility and response—remain, so that phrase alone is not a false theorem. Nevertheless, it is an imprecise description of the current three-term test and fails to explain why loss/scattering and preferred-frame visibility have separate scales.

Smallest repair: call it the “joint visibility and response test,” explain its three checks in one sentence, and restrict the literal invocation to the owner's declared channel family. Route the gravitational-wave comparison to [Gravitational Waves](../../../../content/markdown/aaa/spacetime/gravitational-waves.md), whose lines 39–55 state its conditional common-record timing requirement. An explicit future gravitational-wave extension is an open obligation, not a new test to invent in this chemistry chapter.

The chapter's $\mathcal C_X$ is a locally declared coupling record, whereas the owner uses a medium state $\Theta_{\mathrm{sea}}$ and channel ledger $\mathcal L_X$. These need not be renamed into one symbol, but the chapter should say which information in its coupling record supplies the owner's projection inputs. The record is not a measured scalar coupling constant.

Falsifier: an explicit gravitational-wave instantiation with those inputs and tolerances, in the linked owner or stated locally, would resolve the domain finding. A link to a gravitational-wave chapter alone does not establish that instantiation.

### F3 — P2: A molecular geometric envelope is not the volume excluded to another molecular center

Locations: chapter lines 7, 39, 59, 82, 107, and 130.

The chapter calculates the volume of a union of atomic spheres correctly, but initially describes that volume as the space excluded to neighbors. These are distinct geometric quantities even in an exact hard-sphere model. This is a definitional ambiguity with a demonstrable counterexample, not a factor-of-eight error in the reported packing fraction.

Claim grade: derived, by independent exclusion geometry. Let one hard sphere have radius $r$ and body volume $v=4\pi r^3/3$. The center of an identical non-overlapping sphere cannot approach within $2r$, so the forbidden center-position volume around the first center is

$$
v_{\mathrm{pair}}=\frac{4\pi(2r)^3}{3}=8v
$$

The body's occupied volume, the pair's forbidden relative-position volume, and the low-density hard-sphere second virial coefficient are consequently different: the latter is $B_2=v_{\mathrm{pair}}/2=4v$, where the half avoids double counting unordered pairs in the standard equilibrium comparison. No van der Waals equation-of-state parameter is derived for nitrogen by this example.

For fixed orientations of general hard bodies $K_1$ and $K_2$, forbidden relative translations occupy $K_1\oplus(-K_2)$, the set of all point differences between the bodies. Molecular orientations add another dependence. A union-of-atomic-spheres body volume does not calculate that pair domain.

Smallest repair: introduce $V_{\mathrm{VdW}}$ as a conventional geometric molecular envelope and $n_mV_{\mathrm{VdW}}$ as its approximate occupied-volume fraction; add a sentence distinguishing pair exclusion and thermodynamic excluded volume. Keep the worked nitrogen result. The caveats about overlap conventions and effective boundaries already present at lines 7 and 107 should be retained.

Falsifier: an explicit convention that limits “excluded volume” throughout these passages to the one-body envelope and expressly disclaims pair-center or equation-of-state interpretations removes the ambiguity. It does not change the exact hard-sphere counterexample.

### F4 — P2: The propagation examples omit the energy and path-length dependence central to their lesson

Locations: chapter lines 115–117, with the broad concluding list at line 130.

“Neutrinos pass almost completely unhindered through ordinary matter” has no energy or material-column qualification. It is useful intuition for many ordinary laboratory situations, but is not valid across the later cosmic-scale framing. The IceCube Collaboration's [2017 primary paper](https://arxiv.org/abs/1711.08119), DOI `10.1038/nature24459`, reports Earth absorption from 10,784 upward-going neutrino-induced muon events and a cross-section measurement over 6.3–980 TeV. The inspected abstract explicitly reports attenuation on longer Earth trajectories relative to shorter ones.

Claim grade: measured for the IceCube result; inferred for rejecting the unbounded wording. This observation constrains effective neutrino transport; it supplies no Architrino neutrino assembly derivation and does not imply substantial absorption through every ordinary laboratory sample.

The gamma-ray claim about penetrating meters of concrete is under-specified rather than literally impossible. A nonzero transmitted fraction is different from appreciable transmission. The independently checked attenuation example below shows that a 1 MeV uncollided beam through ordinary concrete has an attenuation length of about 6.69 cm and transmission near $1.06\times10^{-13}$ after two meters under the stated narrow-beam assumptions. Thus “can penetrate” without energy, thickness, and transmission criterion is a poor contrast with molecular exclusion. The preceding text already says photon behavior depends on frequency and material; extend that scope explicitly to thickness and detection criterion.

Smallest repair: say that transmission depends on channel, energy/frequency, material column, and the observable counted. Bound the neutrino example to energies and columns with small interaction probability. Replace the concrete slogan with a qualitative attenuation statement or a specified numerical example. WIMPs, axions, and gravitons are correctly marked hypothetical standard comparisons; retain that distinction and avoid treating existence alone as a measurement of a coupling strength.

Falsifier: a clearly stated energy/column domain in the chapter that excludes the IceCube regime would remove the neutrino overgeneralization. For the concrete example, different photon energy, density, geometry, or inclusion of scattered secondary photons changes the number; the result must be recomputed for that domain.

### F5 — P2: Temperature uses the glyph reserved for absolute time

Location: chapter line 107, “Raising $T$ usually increases vibration”; authority: Mathematics Style Guide line 363 and Absolute Time lines 3–17.

Claim grade: measured by the exact source and live notation owner. The chapter uses bare $T$ for thermodynamic temperature without defining it. Canon reserves $T$ for absolute time and requires $T_{\mathrm{temp}}$ or another explicitly distinguished temperature symbol. This is a direct notation conflict, not a claim that heating changes absolute time physically.

Smallest repair: use the word “temperature,” or define $T_{\mathrm{temp}}$ and use it here. Name $P$ as pressure if retaining the paired symbolic sentence. The chemistry's numerical kelvin values do not conflict with the absolute-time symbol.

Falsifier: a changed live notation owner expressly licensing bare temperature $T$, or replacement of that glyph in the chapter, removes the conflict.

### F6 — P2: The quantitative chemistry inputs need a traceable source note and declared collision convention

Locations: chapter lines 7, 15, 39, 42–55, and 61–70.

Claim grade: measured by full-source inspection and the link inventory: the chapter has no external source citation or source note. It names Bondi, but supplies no identifiable work, table, or dataset. Declaring $r_N$ and $d$ makes the calculation reproducible conditional on those inputs; it does not verify their attribution. Similarly, “standard kinetic estimate” does not specify the collision diameter that produces the quoted 60–70 nm range.

The independent checks below support the radius, bond length, gas-law scale, and humidity arithmetic. They do not turn the chapter's unsourced 78.084% and 20.946% fractions into measurements, nor establish a collision diameter for a particular mixture. The 420 ppm value is acceptable as an explicitly chosen representative carbon-dioxide fraction; it should not silently read as a current global atmospheric measurement. No update to a newer concentration is required for this order-of-magnitude exercise.

Smallest repair: add a compact source note identifying the Bondi radius convention and the nitrogen geometry dataset; declare an effective collision diameter and the moving-molecule factor, or omit the standalone mean-free-path number. Identify composition numbers as adopted dry-air fractions. Name $N_A$ as Avogadro's constant where it first appears. The selected references should support those specific dependencies, not form a general chemistry bibliography.

Falsifier: an inspectable source note covering the named numerical inputs, a declared collision model producing the stated range, or removal of the unsupported attribution would close the relevant support gaps. The present issue is incomplete evidence presentation, not demonstrated false arithmetic.

### F7 — P3: The local medium-availability claim outruns the argument and leaves its central terms unexplained

Locations: chapter lines 5, 57, 84–101, 126, and 132.

Line 57 moves from the small molecular packing fraction to “deeper Noether sea implementation layers remain available for medium-level propagation.” The opening and conclusion correctly deny that packing determines propagation. As written, the intervening availability assertion can be read as the very implication those passages reject. Line 126's realized effective spacetime behavior also needs to preserve the current owner's distinction between the medium ontology and a completed constitutive recovery.

Claim grade: inferred editorial/evidence-boundary finding from the whole chapter, Noether Sea lines 129–178, Molecular Geometry lines 13–15, and Emergent Metric lines 3–13. This is not a proved absence of a medium, nor an objection to using the accepted ontology in ordinary prose. The missing step is a channel-specific inference from that ontology to a usable response in a stated environment.

Smallest repair: make line 57 say that molecular occupancy leaves the medium response undetermined. Briefly define the Noether sea as the emergent population of coupled neutral assemblies in the fixed Euclidean void at its first load-bearing appearance. Explain a “channel” as a specified probe or readout, and describe the joint residual's tests in words before the final symbol. At line 126 identify the constitutive recovery as the intended implementation with its derivation still owed, using one local qualification rather than repeated generic hedges.

The calculation-to-propagation transition can then retain its strong existing point: equal occupancy does not fix equal response. The hypothetical coupling record $\mathcal C_X$ must be distinguished from an evaluated prediction, and the final $\mathcal R_{\mathrm{vis/resp},X}$ should not arrive without a local explanation. The wording about “simulation or synthetic-observable packet” at line 84 is process-facing and can be recast as a comparison of physical observables. The repeated versions of the same sparsity conclusion at lines 5, 45, 57, 82, 101, 130, and 132 can be reduced after those missing explanations are supplied.

Falsifier: a local statement making availability explicitly conditional on the channel response, with the necessary concepts explained before use, would remove this reading. A numerical packing result alone cannot do so.

## Independently checkable mathematics and numerical results

All calculations here are comparison mathematics. Ideal-gas, collision, permeability, and radiation-attenuation laws are used only as effective laboratory comparisons or observational constraints. None is imported as an architrino acceleration law. The scratch instrument declares $c_f=1$; no primitive or observer speed is numerically equated with another. Laboratory length, pressure, temperature, and density units are retained for the chemistry benchmark.

### Sphere overlap and the occupancy calculation

For equal spheres of radius $r$ separated by $0\le d\le2r$, bisect the intersection at the plane halfway between their centers. Each half is a spherical cap extending from axial coordinate $z=d/2$ to $r$ in coordinates centered on its sphere. Disk integration independently gives

$$
V_\cap=2\int_{d/2}^{r}\pi(r^2-z^2)\,dz
=2\pi\left(\frac{2r^3}{3}-\frac{r^2d}{2}+\frac{d^3}{24}\right)
=\frac{\pi(4r+d)(2r-d)^2}{12}
$$

The limits are $4\pi r^3/3$ for coincident centers and zero for touching spheres. At $r=d=1$, the result is $5\pi/12$. These known values were checked before the target calculation. Claim grade: derived for the integral identity and its stated domain. Falsifier: a failure of the cap decomposition or the polynomial integration under those assumptions. The same closed expression is not valid without piecewise treatment at $d>2r$; the chapter's $d=1.10$ Å lies safely inside the domain.

| Quantity and chapter location | Independent calculation | Disposition |
| --- | --- | --- |
| Conversion, line 7 | $1$ Å $=10^{-8}$ cm, hence $1$ Å$^3=10^{-24}$ cm$^3$ | Correct |
| Overlap, lines 17–23 | $7.644542123735166$ Å$^3$ by cap integration | Correct rounded $7.64$ |
| Union, lines 29–35 | $23.55252012396268$ Å$^3$ | Correct rounded $23.6$ |
| Molar envelope volume, line 39 | $14.18365914392359$ cm$^3$/mol | Correct rounded $14.2$ |
| Ideal-gas molar volume at 298 K, 1 atm, line 39 | $24453.095092125986$ cm$^3$/mol | $24000$ is an approximately 1.85% coarse rounding, not a significant error here |
| Packing fraction, lines 39, 57, 132 | $5.800353325616763\times10^{-4}=0.0580035\%$ | Consistent with $0.06\%$ and $6\times10^{-4}$ |
| Number density, line 49 | $2.4627315018045133\times10^{19}$ cm$^{-3}$ | Correct rounded $2.46\times10^{19}$ |
| Adopted nitrogen fraction, line 50 | $1.922999265869036\times10^{19}$ cm$^{-3}$ | Correct multiplication |
| Adopted oxygen fraction, line 51 | $5.158437403679734\times10^{18}$ cm$^{-3}$ | Correct multiplication |
| Adopted 420 ppm carbon dioxide, line 52 | $1.0343472307578956\times10^{16}$ cm$^{-3}$ | Correct multiplication; adopted concentration, not independently measured here |
| Characteristic separation, line 42 | $n_m^{-1/3}=3.4371169652248983$ nm | Correct scale; call it characteristic spacing, not a specified nearest-neighbor statistic |
| Humidity, line 55 | At 298.15 K, $p_{\mathrm{sat}}=3166.74874006291$ Pa; 50% relative humidity gives mole fraction $0.015626690057058527$ and $3.8464980305185683\times10^{17}$ cm$^{-3}$ | Consistent with 1.6%, approximately $3.9\times10^{17}$, and 3.1% at saturation |

Claim grade: measured for these evaluations by the known-case-tested Node scratch instrument, and derived conditional on the declared comparison formulas and inputs. Number density uses $n_m=P/(k_BT_{\mathrm{temp}})$ and molar volume uses $N_Ak_BT_{\mathrm{temp}}/P$, with $P=101325$ Pa, $k_B=1.380649\times10^{-23}$ J/K, and $N_A=6.02214076\times10^{23}$ mol$^{-1}$. The humidity calculation uses the NIST Antoine fit identified below at 298.15 K; the 0.15 K difference from the chapter's 298 K dry-air calculation is explicitly retained. Falsifier: independent evaluation outside the stated rounding intervals, or evidence that the chosen chemical convention is inapplicable. Floating-point digits document the calculation and are not empirical precision claims.

### Collision length, continuum scope, and mixtures

The chapter's lines 62–66 give a legitimate order-of-magnitude stationary-target collision length. A point moving a distance $\ell$ sweeps a collision cylinder of volume $\pi d_m^2\ell$; in a homogeneous dilute target gas, expected collisions are $n_m\pi d_m^2\ell$. Setting this expectation to one gives the displayed scale. For an equilibrium gas of identical hard spheres, the mean relative speed introduces the familiar factor $\sqrt2$, giving $\lambda_m=1/(\sqrt2\pi d_m^2n_m)$. The chapter explicitly allows an order-one relative-motion correction; omission of $\sqrt2$ is therefore not a demonstrated error.

At the checked density, choosing $d_m=0.37$ nm produces $\lambda_m=66.75973678068472$ nm. A 60–70 nm range corresponds to approximately 0.3903–0.3613 nm in this model. These are conditional calculations, not a fit or measurement of air's collision diameter. An envelope radius must not silently become a collision radius.

For a trace species $i$ in a mixture, the collision rate is instead $\nu_i=\sum_j n_j\langle\sigma_{ij}v_{ij}\rangle$ and an associated mean-path convention is $\bar v_i/\nu_i$. This equation states effective dilute-gas collision counting, not substrate dynamics. Taking $n_i\to0$ while a host density stays fixed leaves host collisions finite; a formula using only $n_i$ would incorrectly diverge. Thus lines 61–70 should explicitly select a single-species or effective-air comparison before use with the preceding composition list. This is a scope clarification; the chapter does not actually calculate a trace-species path and is not charged with that unperformed error.

The displayed $\mathrm{Kn}_m=\lambda_m/L$ is dimensionless and the stated small-Knudsen requirement is a valid spatial continuum diagnostic. It does not alone certify local equilibrium during rapid driving, continuum constitutive coefficients, or channel transparency. The chapter says “only when,” not “if and only if”; no false sufficiency theorem is attributed to it. A temporal relaxation condition would be needed for a driven kinetic calculation.

### A direct non-implication and a bounded photon comparison

Claim grade: derived at comparison level. Hold $n_m$, body volume, and path length fixed. In a dilute independent-scatterer comparison, two channels with cross sections $\sigma_1=0$ and $\sigma_2>0$ have the same packing fraction but different transmission, $1$ and $\exp(-n_m\sigma_2\ell)$. Thus occupancy cannot determine transmission without an independently specified interaction rule. This counterexample supports the chapter's central negative conclusion; it predicts no Noether sea coupling.

For the concrete example, the [NIST ordinary-concrete table](https://physics.nist.gov/PhysRefData/XrayMassCoef/ComTab/concrete.html) gives $\mu/\rho=0.06495$ cm$^2$/g at 1 MeV, and [NIST Table 2](https://physics.nist.gov/PhysRefData/XrayMassCoef/tab2.html) gives the tabulated material density 2.300 g/cm$^3$. Therefore $\mu=0.149385$ cm$^{-1}$. Solving the effective narrow-beam removal equation $dI/d\ell=-\mu I$ gives $I/I_0=\exp(-\mu\ell)$: approximately $3.2531\times10^{-7}$ at one meter and $1.0582\times10^{-13}$ at two meters. The numbers describe uncollided intensity in the tabulated homogeneous material; scattered buildup, secondary radiation, source intensity, and detector sensitivity are outside this calculation. Falsifier: a different coefficient at the stated energy/material or disagreement with the exponential under its declared assumptions. This is not a shielding design or dose assessment.

## Whole-chapter coverage and retained strengths

| Chapter lines | Coverage and result |
| --- | --- |
| 1–7 | Title and opening scope reviewed; central occupancy/response separation retained. F2, F3, and F7 cover the residual description, volume definition, and first-use explanations. |
| 9–45 | Nitrogen model, overlap, units, molar calculation, packing, spacing, and mean free path independently checked. Numerical conclusion retained; F6 supplies source and collision-model repairs. |
| 47–59 | All component and humidity arithmetic checked conditional on inputs. F6 covers attribution and adopted concentrations; F7 covers the unsupported availability transition. |
| 61–82 | Collision-length derivation, dimensions, relative-motion factor, Knudsen condition, and non-implication reviewed. No hard equation error; mixture and temporal scopes are stated above. |
| 84–101 | All three entries in the comparison reviewed: dimensionless occupancy, dimensionless Knudsen number, and a nonnumeric coupling record. F2/F7 cover the undeclared handoff and exposition. |
| 105–109 | Fixed geometric convention versus effective boundary reviewed. F3 separates pair exclusion; F5 fixes temperature notation; F1 corrects the biological mechanism. Temperature/pressure trends remain qualitative, material-dependent statements, not derived universal monotonic laws. |
| 113–119 | Photon, neutrino, hypothetical-particle, and GR comparisons reviewed. F4 supplies energy/path scope. Explicitly hypothetical comparisons and the fixed-void/effective-metric distinction are retained. |
| 123–132 | Product background, medium interpretation, concluding channel distinctions, and final residual requirement reviewed. Background ontology agrees with foundation openings; F2/F7 cover scope and grade. |

The chapter does not posit primitive architrino mass, import $F=ma$, assert a Pauli proof, equate a photon speed with $c_f$, or compute a stability spectrum about an unverified equilibrium. These are bounded observations from inspection of this complete 132-line source, not certificates for its linked chapters. Ordinary molecular exclusion is an effective chemistry comparison; it must not be misread as a substrate proof of fermionic statistics. The explicit use of a representative nitrogen molecule is legitimate for this approximate baseline; replacing it with an exhaustive molecular table is not required.

## Source checks

The following sources were inspected for the specific claims stated here. Access date: 2026-09-11. External equations remain effective comparisons or observations. A checked source does not certify the rest of the paper, every linked chapter, or a native constitutive derivation.

| Source | Inspected support and limitation |
| --- | --- |
| A. Bondi, *van der Waals Volumes and Radii*, J. Phys. Chem. 68 (1964), 441–451, DOI [10.1021/j100785a001](https://doi.org/10.1021/j100785a001) | Bibliographic identity checked in ACS search metadata; direct ACS content returned an error. The original paper was not fully inspected, so original-table verification is not claimed. |
| M. Mantina et al., *Consistent van der Waals Radii for the Whole Main Group*, J. Phys. Chem. A 113 (2009), 5806–5812, DOI [10.1021/jp8111556](https://pmc.ncbi.nlm.nih.gov/articles/PMC3658832/) | Inspected Table 6, including its C/N/O column headings and Bondi-radius row: nitrogen is 1.55 Å. This later primary research paper reproduces the adopted Bondi value; it does not make a universal molecular collision diameter from it. |
| [NIST CCCBDB, experimental N2 geometry](https://cccbdb.nist.gov/expgeom2x.asp?casno=7727379), SRD 101 | Inspected the atom-distance table: 1.0977 Å, consistent with the chapter's rounded 1.10 Å; the page identifies Huber and Herzberg (1979). The underlying spectroscopic compilation was not independently remeasured or read in full. |
| [NIST SP 330, section 2](https://www.nist.gov/pml/special-publication-330/sp-330-section-2) | The indexed official text supplies the exact SI Boltzmann and Avogadro constants used in the effective gas calculation. It does not validate ideality of a specific gas sample. |
| [NIST Chemistry WebBook, water Antoine parameters](https://webbook.nist.gov/cgi/cbook.cgi?ID=C7732185&Mask=4&Plot=on&Type=ANTOINE), SRD 69 | Inspected the indexed 273–303 K fit, $\log_{10}(p/\mathrm{bar})=5.40221-1838.675/(T_{\mathrm{temp}}/\mathrm K-31.737)$, attributed to Bridgeman and Aldrich (1964). The evaluated humidity is conditional on ideal partial-pressure conversion. |
| Widomska, Raguz, and Subczynski (2007), DOI `10.1016/j.bbamem.2007.06.018`, [PubMed record](https://pubmed.ncbi.nlm.nih.gov/17662231/) | Indexed primary abstract supplies the membrane compositions, EPR-derived method, and oxygen permeability used in F1. Direct PMC access returned a browser challenge; direct PubMed opens gave no usable body/error. No full-methods or intact-skin review is claimed. |
| IceCube Collaboration (2017), [arXiv:1711.08119](https://arxiv.org/abs/1711.08119), DOI `10.1038/nature24459` | Inspected primary abstract reporting Earth absorption and the energy interval; used only for the bounded observational counterexample in F4. Detector analysis was not reproduced. |
| J. H. Hubbell and S. M. Seltzer, NIST X-ray mass attenuation tables, [ordinary concrete](https://physics.nist.gov/PhysRefData/XrayMassCoef/ComTab/concrete.html) and [material constants](https://physics.nist.gov/PhysRefData/XrayMassCoef/tab2.html) | Inspected the 1 MeV coefficient and density rows used above. This is a database-backed comparison of uncollided attenuation, not a total-transmission or dose calculation. |

The dry-air nitrogen/oxygen percentages were checked arithmetically, not against an independently acquired composition dataset. No precise source was verified for the chapter's implied air collision diameter. These limitations are explicitly retained in F6 rather than being replaced by plausible citations. No full literature search was undertaken.

## Validation commands and results

The disposable checking instrument is `.tmp/crw005-molecular-review/check.mjs`; every substantive formula, result, and limitation it supports is also recorded above, so the report does not rely on scratch as the sole evidence explanation.

| Command or instrument | Observed result | Boundary |
| --- | --- | --- |
| `shasum -a 256 content/markdown/aaa/spacetime/molecular-exclusion-and-noether-sea-response.md content/markdown/aaa/spacetime/noether-sea.md` | Hashes recorded above | Identifies bytes, not correctness |
| `wc -l` on those two files | 132 and 1271 | Counts source newlines, not rendered pages |
| `git --no-optional-locks status --short --` with the two sources and this exact report path | Empty at entry | No tracked differences/untracked report at entry within those paths; no repository-wide cleanliness claim |
| `git rev-parse --verify 897fe1aa7^{commit}` and `git show 897fe1aa7:<assigned-source>` | Historical source available, 129 lines, hash recorded above | Historical content inspected directly, not inferred from a commit message |
| `git diff 897fe1aa7 -- content/markdown/aaa/spacetime/molecular-exclusion-and-noether-sea-response.md` | Three added blank lines only | Establishes comparison to this snapshot, not origin or authorship |
| `node .tmp/crw005-molecular-review/check.mjs --self-test` | PASS before the target run: coincident/touching/partial-overlap known cases; ideal-gas arithmetic; fence/code-aware link and inline extraction; display parser with known line number; TOC traversal; valid and invalid KaTeX cases | Instrument qualification on stated fixtures, not a general parser proof |
| `node .tmp/crw005-molecular-review/check.mjs --target` | Numerical outputs recorded above; target and sea hashes match entry observations | Conditional arithmetic and source inspection, not EOM evolution |
| Same target run, local link resolution | All 15 link occurrences resolve to existing files; the `composition` heading and all five equation IDs resolve | Existing local targets, not browser navigation or public deployment certification |
| Same target run, equation registry comparison | Five display formulas match exact `formulaTeX` and source ranges: 17–23, 29–35, 62–66, 71–76, 85–97 | Scoped registry/formula comparison only; no claim of global registry freshness |
| Same target run, bundled KaTeX 0.16.11 | Five display and 57 inline expressions compile with `throwOnError: true`; no unclosed display delimiter | Compilation using the bundled iOS runtime; no screenshot/layout or deployed web-renderer certification |
| Same target run, textbook TOC traversal | Assigned chapter is present; direct TOC inspection places it after the pro/anti coupling chapter | Requested single-chapter review; no wider review-order claim |
| `git diff --check --` on the two source files | Exit 0, no output | Whitespace check of tracked diffs in those paths, not scientific validation |

No full repository tests, generator writes, EOM simulations, reference-oracle changes, or Git publication were performed. A full build is not necessary to establish the reported factual and mathematical findings. General Markdown parsing is not certified: the scoped extractor covers the simple inline link and dollar-math syntax actually present in the source and was tested with fenced and inline-code exclusions first. Mathematical compilation does not guarantee typography; for example the prose punctuation inside the first display at line 22 remains a P3 style cleanup under the mathematical guide, despite compiling successfully.

## Open obligations and decision boundary

The completed review establishes neither a retained Noether braid medium nor a microscopic derivation of molecular exclusion. Those are existing theory obligations, not demonstrated failures of this comparison chapter. Current Noether Sea lines 129–178 retain population selection, bounded visibility, independent response, and reversible transit as conditional work; Molecular Geometry lines 13–15 explicitly withhold a molecular-shape derivation. A molecular packing computation cannot close those obligations.

For any later physical propagation claim, the existing response owner must provide a declared channel, retained medium/history inputs, independent observable target, projection, positive normalization scales, and bounded errors. A zero-coupling comparison can eliminate visibility while missing a nonzero response target; a fitted response or a record name does not prove that the medium realizes it. No new tracker, validator, or gate is proposed here.

Recommended disposition: repair F1–F6 before treating the chapter as reviewed and ready; incorporate F7's local explanations during the same authorized editorial pass. Preserve the nitrogen calculation, its approximate grade, the observer/substrate separation, and the central conclusion that sparsity alone fixes neither transparency nor opacity. Recheck the repaired text against the source-specific findings, especially the shared residual's domain, without promoting the open medium or statistics derivations.

Final source-stability and report checks are recorded in the completion receipt below.

## Completion receipt

Claim grade: measured. After writing the complete report, `shasum -a 256` and `wc -l` on both reviewed sources returned the same hashes and the same 132/1271 line counts recorded at entry. Scoped `git --no-optional-locks status --short --` on the chapter, Noether Sea, and this report listed only this new evidence file. These observations support source stability through that check; a subsequent source change requires re-evaluating the affected line references.

`node .tmp/crw005-molecular-review/check.mjs --report` passed its additional known existing/missing-file and trailing-whitespace cases before checking the report. It found seven numbered findings, six P2 and one P3, no broken local report links, no trailing whitespace, no unclosed display, and no compilation errors across 111 extracted mathematical expressions. The check uses the same bounded syntax and bundled KaTeX runtime described above. `git diff --no-index --check /dev/null <report>` returned 1 with no diagnostics for the new-file comparison; that exit status is not presented as a successful repository gate. The separately qualified report check supplies the positive whitespace/link/math result.

The only durable file created by this task is this requested evidence report; the additional checking script is confined to the authorized scratch directory. No corpus source, shared tracker, generated artifact, or Git publication state was edited. The report records proposed repairs for a subsequent authorized editor; it does not mark those repairs complete.
