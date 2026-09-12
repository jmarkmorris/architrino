# CRW-005 — Gravitational Waves Review and Repair

**Disposition:** ✓ Done for the bounded chapter review and repair. Scoped mathematical parsing, links, and whitespace checks pass by the instruments below. The final repository-wide strict check fails on two links outside the assigned paths; this record does not certify repository-wide validation, a native gravitational-wave solution, a detector result, or theory closure.

**Date:** 2026-09-12. **Scope:** [Gravitational Waves](../../../../content/markdown/aaa/spacetime/gravitational-waves.md) and this dedicated evidence report only. Shared review status, priorities, queue, work log, other chapters, and generated outputs remain the coordinator's responsibility. The assignment is CRW-005; the source task's displayed title was `crw-015-HQ` when inspected with `list_threads`, so the assignment identifier governs this report.

The chapter now begins with constituent path histories and identifies effective metric, gauge, radiation, source, and detector formulas as conditional recovery targets. The repairs address a wrong source sign, insufficient polarization premises, detection and statistical overclaims, double detector projection, ambiguous state and residual definitions, an adjustable dipole denominator, and unsupported KaTeX notation. They preserve useful effective comparisons without treating those comparisons as substrate laws.

## Identity, authority, and evidence scope

| Item | Measured record or boundary |
| --- | --- |
| Baseline chapter SHA-256 | `fd69c94d897d88884b06720ec3b32144acf96a5004241b1ccf249861f3ebbb40`, measured with `shasum -a 256` before edits and confirmed by `git show HEAD:content/markdown/aaa/spacetime/gravitational-waves.md \| shasum -a 256` during review |
| Repaired chapter SHA-256 | `88d94988ad83fdf22a52a85d34675933f45624c8645a70ed0ceb425e57e1cfd1`, measured with `shasum -a 256` after the final equation repair |
| Baseline references | The 389-line chapter, inspected in full; the baseline hash above identifies the source for all baseline line ranges below |
| Repaired references | The 417-line chapter, inspected with `nl -ba` in two contiguous ranges and the subsequent one-line derivative repair; repaired line references below identify this hash |
| Baseline write risk | Scoped `git --no-optional-locks status` returned no target change, and the report was absent; exact live passages were reread before patches |
| Write inventory | The chapter and this report are the only paths written by this task; no staging, publication, regeneration, or shared tracking edit was performed |
| Review instrument | Complete textual and equation review, task-relevant live canon reads, explicit algebra and counterexamples below, primary-source browsing, existing strict content validator, and scoped KaTeX/link checks |
| Specialist contribution | Read-only `crw_005_gw_source_review`, using the `albert-einstein` role lens, checked external comparisons and then reread the repaired chapter at SHA-256 `a5061200e735f6e36c076dda80ae9da48247d7eaa53daf27a848d87b7c68cd6d`; its last chapter finding was the Dyson manuscript year, subsequently corrected. Its later complete report read found no substantive contradiction with the source audit; it did not certify the validation measurements. |
| Independence limit | The specialist's agreement is corroborating review, not an independent physical experiment. The independent references are the stated comparison equations, analytic counterexamples, and primary observations; no strain reanalysis or native simulation was run |

The live `AGENTS.md`, generated startup router, corpus-review skill owner, corpus reviewer, theory orientation, execution procedure, and operator explanation standard governed the work. The academic, mathematics, terminology, and comparative glossary owners were consulted for the changed concepts. The [corpus reviewer](../../../office-of-research/cto/prompts/corpus-reviewer.md) supplies the review coverage; explicit assignment authority permits the chapter repair and this report while leaving shared tracking to the coordinator.

The task-relevant foundational checks covered [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), [Euclidean Void](../../../../content/markdown/aaa/foundations/euclidean-void.md), [Absolute Time](../../../../content/markdown/aaa/foundations/absolute-time.md), the native and observer coordinate distinctions, and the canonical root and acceleration passages of the [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md). Nearby checks covered the population and closure passages of [Noether Sea](../../../../content/markdown/aaa/spacetime/noether-sea.md), the chart conventions in [Emergent Metric](../../../../content/markdown/aaa/spacetime/emergent-metric.md), and the gravitational-wave comparison context in [General Relativity](../../../../content/markdown/aaa/spacetime/general-relativity.md), [PPN Parameters](../../../../content/markdown/aaa/spacetime/ppn-parameters.md), and the public benchmark protocol. This was a targeted anchor review, not a claim to have reread every line of those larger chapters.

Native claims use delayed path-history interaction, all admitted causal roots, transmitter-side acceleration weight, and the distinction between Euclidean void, Noether sea, and effective observer chart. Standard metric dynamics, quantum states, detector mass, Planck length, quadrupole power, and cosmological energy density enter only as labeled effective comparisons or recovery targets. The only new numerical counterexample explicitly uses $c_f=1$; symbolic propagation speeds retain their distinct roles.

## Findings and implemented repairs

Severity ranks the consequence for the chapter's claim, rather than the cost of changing prose. **High** identifies a wrong equation, invalid implication, or misclassified evidence. **Medium** identifies a missing definition, domain restriction, or renderable expression needed to make the proposed comparison checkable. Every finding below is ✓ Done within this chapter's repair scope; the open native obligations are listed separately.

| ID | Severity | Baseline lines | Repaired lines | Demonstrated issue and smallest sufficient repair |
| --- | --- | --- | --- | --- |
| GW-01 | Medium | 3–33, 143–171 | 3–7, 26–38, 150–180 | The presentation starts with effective metric and transport machinery without explaining its native carrier or coordinate map. Add a short path-history and observer-map account, define strain and chart coordinates, and distinguish $c_f$, $c_0$, and effective channel speeds. This is an exposition and layer-boundary repair, not a newly derived carrier. |
| GW-02 | High | 21–38, 59–88 | 26–40, 64–95 | The source sign is positive for an operator with negative time second derivative; the spatial coefficient is an unspecified inverse effective metric in an otherwise flat partial-derivative expression. State signature and constant Cartesian patch, correct the source sign, condition the gauge and corollary, and identify causal boundary data as a separate requirement. |
| GW-03 | High | 40–55 | 45–60 | Independently adjustable speeds were said to fail timing before evaluation, and one medium was treated as forcing one delay law. Separate the measured speed interval from common-response derivation; retain common delay as a constitutive target and quote the actual asymmetric GW170817 interval with its assumptions. |
| GW-04 | Medium | 90–139 | 97–146 | The phase integral left frequency transport and path equivalence unspecified, and its summed tolerances lacked a statistical or budget interpretation. Define received-frequency labeling, local redshift, shared-ray approximation, positive tolerances, and a conservative joint budget; distinguish forecasts from measured limits. |
| GW-05 | Medium | 143–171 | 150–180 | Population variables, units, cadence boundary currents, and the state omitted by a scalar distribution were unclear. Define each quantity, enforce the count-balance interpretation, and state that scalar cadence inputs do not determine tensor orientation or a full photon response. |
| GW-06 | High | 175–195 | 184–204 | Parity-even isotropy and an informal gauge count do not establish the full radiative spectrum of a medium. Replace the lemma with a stronger conditional recovery target, derive the two-entry TT count explicitly, give the scalar counterexample, and restrict the extra-power ratio to a positive tensor denominator. |
| GW-07 | High | 199–223, 246 | 208–232, 255 | A vector containing speed and polarization residuals was made a universal event-acceptance test, and single-instrument excesses were categorically excluded. Separate search acceptance from theory recovery, represent unavailable evidence honestly, and retain GW190425 as a primary-source counterexample to universal coincidence. |
| GW-08 | Medium | 225–246 | 234–255 | A timing window was subtracted as if it were a signed predicted delay; template and covariance definitions were incomplete, and correlated timing information could be counted twice. Define incoming strain, one response map, signed delay, positive covariance, and calibrated diagnostic status. |
| GW-09 | High | 250–271 | 259–280 | The occupation lower bound assumes an undeclared mode volume, and large occupation was asserted to establish a classical field. Define one-quantum energy density using a declared volume, retain wavelength scaling conditionally, and separate occupation from quantum-state classicality. |
| GW-10 | High | 271–293 | 282–306 | A prepared-one-quantum interferometric screen was applied to all detector routes and treated as detection authority. Scope it to its design, define sensitivity and strict compactness, demonstrate that its background term is not confidence, and distinguish detector transitions from evidence of field quantization. |
| GW-11 | High | 301–321 | 314–334 | The strain modes were already detector-projected and were projected again; the observed quantity included metadata that cannot be subtracted from strain. Define incoming angular modes and a strain-only data vector, apply detector response once, condition on calibration and covariance, and normalize label distances without treating unconstrained charge as measured. |
| GW-12 | Medium | 323 | 336 | Population and cosmological analyses were assigned to one source-event ledger, alongside event-level observables and a proposed direct-wave interpretation. Separate event consistency from ensemble inference and leave the latter interpretation explicitly hypothetical. |
| GW-13 | Medium | 327–340 | 340–353 | A stochastic spectral bound lacked its model and confidence scope; a null was said to close an amplitude. Define the spectrum, normalization, foreground dependence, and conservative budget, and state exclusion only above the applicable limit. |
| GW-14 | Medium | 344–389 | 357–404 | Quadrupole and flux conventions were incomplete, and an unspecified additive dipole denominator could suppress the tested ratio. Define source regime, trace-free quadrupole, derivative frame, common GR speed, corrected period derivative, and averaging scale; remove the adjustable floor and require an absolute bound when quadrupole power vanishes. Native energy balance remains open. |
| GW-15 | Medium | 350 | 363 | The vendored KaTeX parser rejects `\dddot`. Replace the two unsupported commands with explicit third derivatives while preserving the quadrupole formula and existing equation identifier. |

### Checkable reasoning and falsifiers

**GW-01 — inferred exposition deficiency, measured canon alignment.** Direct reading of the baseline introduction shows no causal-root or observer-map explanation there. The repair follows the named foundational passages: an arriving wake changes later receiver history and thus later emissions; it does not scatter an already emitted wake. The reception weight is the transmitter-side $c_f/|D_t|$ on simple roots, while receiver motion affects playback and later history. The falsifier is a conflicting definition or acceleration factor in the canonical Master Equation or a change that silently identifies the observer chart with absolute coordinates. None of these statements establishes a collective tensor response.

**GW-02 — derived comparison correction.** With signature $(-,+,+,+)$, Lorenz-gauge linearized GR gives $G^{(1)}_{\mu\nu}=-\Box\bar h_{\mu\nu}/2$. Equating this to $8\pi G T_{\mu\nu}/c_0^4$ gives the negative source coefficient in the repaired equation. This is the effective comparison documented in [Carroll, section 6](https://ned.ipac.caltech.edu/level5/March01/Carroll3/Carroll6.html), not a substrate derivation. Substituting $e^{i(kx^3-\omega t)}$ into the source-free operator yields $(\omega^2/c^2-k^2)e^{i(kx^3-\omega t)}$ and therefore the displayed dispersion relation. The latter inference requires the constant-coefficient equation and a nonzero wave amplitude. A declared opposite curvature convention with a consistently changed field equation could change the sign argument; the baseline supplied no such convention. A variable background or a different native kinetic law would require a new derivation, rather than reuse of this corollary.

**GW-03 — derived counterexample and source-reported measurement.** Two freely fitted channel speeds can be chosen equal, so tunability alone cannot imply violation of a measured difference bound. Likewise, a medium can support distinct response modes, so a shared medium does not algebraically imply equal channel delay factors. The [GW170817 primary paper](https://arxiv.org/abs/1710.05834) reports the interval $-3\times10^{-15}\le(c_{\mathrm{GW}}-c_\gamma)/c_\gamma\le7\times10^{-16}$ for its stated distance and source-lag assumptions; the chapter's symmetric $10^{-15}$ scale is only an order-of-magnitude description. A calculated difference outside the applicable source-conditioned interval overturns timing compatibility; equal fitted speeds do not establish the common-response derivation.

**GW-04 — derived domain and budget conditions.** Wave number has inverse-length units, so integrating its difference against calibrated length produces a phase. On an evolving background, one received frequency labels differing local frequencies along the ray; holding local frequency fixed would omit that evolution. A common-path integral is adequate only at the retained approximation order. The curvature indicator is dimensionless because $[\omega/c_0^2]=T/L^2$ and $[\partial_k^2\omega]=L^2/T$. For nonnegative residual terms, a sum no larger than one implies each term is no larger than one; the converse fails. Full propagation giving a different retained-order phase, or a covariance analysis incompatible with a proposed confidence interpretation, overturns that use of the diagnostic.

**GW-05 — derived balance constraint and inferred state insufficiency.** Integrating the cadence divergence gives $\int_0^\infty\partial_\nu J_\nu\,d\nu=J_\nu(\infty)-J_\nu(0)$. With no endpoint current, redistribution alone cannot create a net braid population. A nonzero integrated source needs a declared population transfer. Separately, differently oriented populations can have the same scalar cadence distribution; a tensor response cannot be uniquely reconstructed from that scalar without further state or a proven closure. The falsifier of sufficiency is two admitted states with identical scalar inputs but different shear or photon response. The chapter explicitly leaves those orientation and history variables in the full medium state.

**GW-06 — derived TT count, not a spectrum theorem.** For propagation along the third axis, a symmetric transverse matrix has the form with rows $(a,b,0)$, $(b,d,0)$, and $(0,0,0)$. Zero trace sets $d=-a$, leaving two entries. This establishes the displayed TT component count. Adding an independent scalar wave equation to a parity-even isotropic tensor model preserves those symmetries and adds a radiative response; TT projection does not remove that scalar from the physical model. The native recovery target therefore needs actual constraints and exclusion of additional branches. The [GW170814 paper](https://arxiv.org/abs/1709.09660) supports the stated comparison of pure polarization alternatives, not a bound on every small mixed-mode admixture. Extra response above a calibrated mixed-mode limit falsifies two-mode recovery in that band.

**GW-07 and GW-08 — source-reported detection and derived diagnostic distinction.** [GW190425](https://arxiv.org/abs/2001.01761) was accepted from its search evidence despite observation by one of the LIGO instruments; this refutes universal multi-instrument coincidence as a necessary definition of every accepted event. A speed or mixed-polarization quantity can be unavailable for an accepted event and must not be filled with zero. For timing, a window half-width is not the signed delay predicted for a source direction. Reusing fitted timing and the strain fit from which it was obtained also creates correlation, so the displayed sum alone supplies no calibrated likelihood. These repairs are overturned by an actual missing-response inconsistency or a specified joint analysis showing that the proposed statistic has the claimed coverage; no such analysis was performed here.

**GW-09 and GW-10 — derived estimates and analytic counterexamples.** An effective packet energy $E=\rho_{\mathrm{GW}}V_{\mathrm{mode}}$ gives occupation estimate $E/(\hbar\omega)$; the density ratio needs that volume. Wavelength-volume scaling does not supply a volume-independent theorem. A high-occupation number state is a counterexample to classicality inferred from occupation alone. In normalized wake-speed units $c_f=1$, setting expected signal and background counts to one passes $B/S^2\le1$, yet a Poisson background of mean one has probability $\Pr(N\ge2)=1-e^{-1}(1+1)=1-2/e$, about one quarter. This screen is therefore insufficient for a strong detection claim. Equality in a spherical compactness ratio also cannot establish a detector lies outside its gravitational radius. A quantized detector can absorb individual excitations from a highly occupied incident field; that route does not require total incoming occupation near one. [Carney, Domcke, and Rodd](https://arxiv.org/html/2308.12988v1) distinguishes field quantization from quantum detector response. The linked [Dyson manuscript](https://albert.ias.edu/bitstreams/dd422d6a-70ed-4de1-97da-a9a995a0a1e6/download) gives a restricted sensitivity comparison, not a universal detector impossibility proof; [IAS metadata](https://albert.ias.edu/entities/publication/8cbff2f4-238f-4cfd-93f1-f6ba6697767f) dates that manuscript to 2012. A claim of incoming-field quantization requires a stated observable and source/detector model that excludes classical driving; a coincidence or occupation estimate alone does not supply it.

**GW-11 — derived response and data-type correction.** Let an elementary detector response be multiplication by an antenna factor $F$. If a mode is already projected, applying the map again gives $F^2h$, whereas the physical response is $Fh$. They differ for generic $F$, so the baseline's two descriptions cannot both be used. Keeping incoming modes before one map resolves this. Calibration metadata and a covariance matrix are conditions of the strain comparison, not entries that can be subtracted from a strain vector. Distances between remnant labels need units removed and the supported labels identified; charge unconstrained by the analysis is not a measured zero. Residual agreement is overturned by incompatible response predictions, undefined distances, or an independently calibrated joint statistic showing excess. This review does not provide such a likelihood.

**GW-12 — source-reported product scope and inferred interpretation boundary.** The [GWTC-5.0 release](https://gwosc.org/GWTC-5.0/) has event and ensemble products. Population reconstruction and catalog cosmology depend on event samples, selection, and shared parameters; they are not one event's data. The [GW250114 primary paper](https://arxiv.org/abs/2509.08054) supports the Kerr and area comparisons stated in the chapter. Source browsing verifies that these are real named comparison products; it does not reproduce their inference. The specialist also inspected the proposed near-horizon direct-wave interpretation and its dispute; the chapter preserves it only as a hypothesis and does not adjudicate it. An event-to-ensemble analysis that fails its declared selection or shared-parameter model would overturn the claimed comparison; this repair provides no population fit.

**GW-13 — derived inference boundary.** An upper limit supplies an excluded region under its spectral and noise model. A null observation does not identify one exact amplitude and does not eliminate amplitudes below that limit. A power-law-integrated sensitivity or model-conditioned exclusion cannot automatically be read as a simultaneous pointwise bound on every spectrum. A significant stochastic signal requires foreground separation before it constrains early-universe interpretation. A valid likelihood for the actual proposed spectrum is the required instrument; disagreement with that likelihood overturns use of the compact residual.

**GW-14 — derived effective identities with an open native balance.** For positive quadrupole power, adding an unrestricted positive denominator floor can reduce $P_{\mathrm{dip}}/(P_{\mathrm{quad}}+\varepsilon)$ without changing either predicted power. The repaired ratio removes that freedom; zero quadrupole power calls for an absolute dipole bound. The trace-free quadrupole normalization is stated explicitly so the factor $G/(5c_0^5)$ has a checkable convention. With TT entries $(a,b;b,-a)$, contraction gives $\dot h_{ij}\dot h^{ij}=2(\dot a^2+\dot b^2)$, retaining the chapter's polarization-summed flux factor. That algebra verifies the factor within the effective flux comparison, not the microscopic energy current. A different trace convention, failed source balance, unmodeled redshift, or inconsistent source and receiver energies overturns application of these targets.

**GW-15 — measured rendering defect and repair.** After the known-case checks below, the scoped vendored KaTeX run rejected display 23 with `Undefined control sequence: \dddot`. `git show HEAD:...` at the verified baseline hash contains that command at line 350, establishing that the expression was present in the reviewed baseline without attributing it to an author or causal commit. Explicit third derivatives preserve the mathematics and render under the same KaTeX invocation. A failure of the same strict rendering command on the final expression would reopen this finding. This is parser verification, not a visual-layout certification of every application surface.

## Validation and reproducibility

### Known cases recorded before target use

The session ran the following controls before applying the corresponding extraction and render instruments to the target. The first returned exactly one display with TeX `a=b`, accepted a valid equation, and rejected an invented command. The second returned only the intended inline equation and only the intended link, excluding inline and fenced code. Both passes were recorded in tool output before the target checks.

```javascript
import assert from 'node:assert/strict';
import {parseCorpusDisplayEquations} from './scripts/build-equation-mapping-corpus.mjs';
import {loadVendoredCommonJsBundle} from './scripts/load-vendored-commonjs-bundle.mjs';
const katex = loadVendoredCommonJsBundle(
  'apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js'
);
const control = '# Control\n\n$$\na=b\n$$\n\n`$$ignored$$`\n\n```tex\n$$not real$$\n```\n';
const blocks = parseCorpusDisplayEquations('control.md', control);
assert.equal(blocks.length, 1);
assert.equal(blocks[0].tex, 'a=b');
assert.doesNotThrow(() => katex.renderToString('a=b', {throwOnError: true, strict: 'error'}));
assert.throws(() => katex.renderToString('\\notarealcommand', {throwOnError: true, strict: 'error'}));

function stripCode(s) {
  return s.replace(/^\s*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\s*\1\s*$/gm, '')
    .replace(/`[^`\n]*`/g, '');
}
function inlineMath(s) {
  return [...stripCode(s).replace(/\$\$[\s\S]*?\$\$/g, '')
    .matchAll(/(?<!\\)\$(?!\$)([^$\n]+?)(?<!\\)\$/g)].map(m => m[1]);
}
function links(s) {
  return [...stripCode(s).matchAll(/\[[^\]\n]*\]\(([^\s)]+)\)/g)].map(m => m[1]);
}
assert.deepEqual(inlineMath('$a=b$\n$$\nc=d\n$$\n`$skip$`\n```tex\n$skip$\n```'), ['a=b']);
assert.deepEqual(links('[ok](../known.md)\n`[skip](bad.md)`\n```md\n[skip](bad.md)\n```'), ['../known.md']);
```

For reproduction from the repository root, use those imports and helper functions in `node --input-type=module`, run the controls first, and then run this target check:

```javascript
import fs from 'node:fs';
import path from 'node:path';
const file = 'content/markdown/aaa/spacetime/gravitational-waves.md';
const source = fs.readFileSync(file, 'utf8');
const displays = parseCorpusDisplayEquations(file, source);
const inline = inlineMath(source);
for (const tex of [...displays.map(x => x.tex), ...inline]) {
  katex.renderToString(tex, {throwOnError: true, strict: 'error'});
}
const targets = links(source);
const local = targets.filter(x => !/^https?:/.test(x));
for (const target of local) {
  assert.ok(fs.existsSync(path.resolve(path.dirname(file), decodeURIComponent(target.split('#')[0]))), target);
}
const ids = local.filter(x => x.includes('equation-mapping.html#')).map(x => x.split('#')[1]);
assert.equal(new Set(ids).size, ids.length);
console.log({displayMath: displays.length, inlineMath: inline.length,
  katexPasses: displays.length + inline.length, localFilesResolved: local.length,
  equationIds: ids.length, uniqueEquationIds: new Set(ids).size,
  externalLinks: targets.length - local.length});
```

The custom extractors cover the chapter's simple dollar-delimited math and inline Markdown links; they are not general Markdown parsers. File existence does not establish anchor identity or external availability. The three non-equation local anchor targets were separately checked against the destination headings by `rg`: the canonical Master Equation, Theorem G, and Public Gravitational-Wave Benchmark Protocol. The same known-case-tested link extractor and `assert.deepEqual` confirmed that all 25 equation `View →` links are identical to the verified baseline's links; generated formula content has a separate check below.

| Check | Actual outcome and limitation |
| --- | --- |
| Baseline `node scripts/validate-content.mjs --check --strict` | Exit 0; 0 errors, 0 warnings, 30 notes; 391 scene files, 199 indexed Markdown files, and 1649 repository Markdown files audited at that snapshot. This is content validation, not physics verification. |
| Post-repair strict content check before final TeX spelling change | Exit 0; 0 errors, 0 warnings, 30 notes; 1651 repository Markdown files audited at that later shared-checkout snapshot. No attribution of the inventory difference is inferred. |
| Scoped KaTeX and local-link check after final TeX repair | Exit 0; all 170 extracted expressions passed: 25 displays and 145 inline expressions. All 36 local file targets resolved; 25 equation identifiers were unique; 8 external links were inventoried. The earlier failed `\dddot` run is retained as GW-15 evidence. |
| `node scripts/build-equation-mapping-corpus.mjs --check` | Exit 1; reported stale `content/generated/equation-mapping/corpus-equations.json`, after examining 199 Markdown files and 4685 displays at that snapshot. This is generated drift, not proof of an equation defect. No generated file was written. |
| Final `node scripts/validate-content.mjs --check --strict` | Exit 1; 2 errors, 0 warnings, 30 notes, with 1655 repository Markdown files audited. Both errors name paths outside this task's two write targets; exact diagnostics follow. This run supersedes the earlier passing snapshot for repository-wide validation. |
| Scoped whitespace checks | `git --no-optional-locks diff --check -- content/markdown/aaa/spacetime/gravitational-waves.md` returned exit 0 with no diagnostic. `git --no-optional-locks diff --no-index --check /dev/null reference/priorities/aaa-corpus-rewrite/evidence/crw-005-gravitational-waves-review-2026-09-12.md` returned exit 1 with no whitespace diagnostic; no-index reports the added file as a difference. The explicit no-index check includes the untracked report. Separate standard-CLI probes confirmed exit 1 without a diagnostic for an ordinary one-line addition and exit 3 with a trailing-whitespace diagnostic for the same line ending in a space. These exit-code probes followed the target run and clarify Git behavior; they are not the preceding custom-extractor controls. |
| Report local links and source identity | The known-case-tested link extractor resolved all 10 report-local file links; `shasum -a 256` and `wc -l` confirmed the repaired chapter hash above and 417 lines after the final equation edit. |

The final strict validator reported `content/markdown/aaa/spacetime/black-holes.md:535`: link `../assemblies/photons.md` resolves to missing `content/markdown/aaa/assemblies/photons.md`. It also reported `reference/priorities/development-process-review/analysis/option-b-remaining-migration-plan.md:5`: link `option-b-prescribed-response-and-acceleration-cutover.md` resolves to a missing file in that same analysis directory. These are observations from this run, not attribution to an author or a causal commit. They were absent from the earlier passing validator output, but the intervening history was not investigated. Repair of those links is outside the assigned write scope and belongs with their current owners before any repository-wide green result is claimed.

The generated equation registry stores source equations and context, so edits to its source can require regeneration. The exact deferred command is `node scripts/build-equation-mapping-corpus.mjs --write`, followed by its `--check` command, within the authorized regeneration or final publication procedure. This task does not claim that the global stale registry has only this chapter as its cause. No baseline registry check established the complete drift transition. Existing equation IDs were preserved; no `--write` command, iOS snapshot export, or generated-source edit was run.

## Remaining obligations and bounded disposition

The review repairs prose, equations, definitions, and evidence boundaries. It supplies neither an evolved source–sea–detector solution nor an independently measured residual for such a solution. The following remain open research obligations rather than failed repairs:

1. ○ Establish an admissible Noether sea equilibrium and its retained orientation and history variables before linearization; a configuration that does not satisfy its own dynamics cannot support the proposed spectrum.
2. ○ Derive the tensor kinetic operator, gauge constraints, signed source coupling, and common observer map from native delayed histories, including exclusion or calibrated bounds for additional radiative branches.
3. ○ Derive causal source radiation and a balance connecting source loss, medium transport, boundary exchange, and receiver response; the effective quadrupole and flux formulas do not establish this balance.
4. ○ Compute waveform, timing, polarization, generation, and any low-frequency residuals from one declared constitutive model and evaluate them against the existing versioned benchmark protocol with appropriate covariance and statistical coverage.
5. ○ Treat occupation estimates, individual detector transitions, and evidence of incoming-field quantization as separate claims; any stronger quantum comparison needs a discriminating observable and a modeled detector response.

No optional style proposal is required to finish this bounded review. The proposed medium carrier remains inferred, scalar transport and response functionals remain guessed hypotheses until derived, the conditional algebra above is derived only within its stated effective assumptions, and the cited observations are source-reported measurements rather than measurements made by this task. Any new source-conditioned counterexample or changed canonical equation reopens the affected finding; it does not retrospectively turn this report into physical acceptance evidence.

Only the coordinator should integrate this receipt into shared review status and queues. No adjacent chapter review or follow-on research was launched by this assignment.
