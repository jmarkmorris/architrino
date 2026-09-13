# CRW-005 CMB Review — 2026-09-12

## Scope and provenance

This is the bounded review and repair receipt for priority 64, [CMB in the Architrino cosmology](../../../../content/markdown/aaa/cosmology/CMB.md). The assigned editor owns only that chapter and this receipt. Shared disposition and integration belong to the coordinator. This is editorial self-review with independently checkable algebra and source comparisons, not independent physical validation.

The chapter was read completely at baseline, lines 1–857. Scoped `git --no-optional-locks status --short` returned no entries for the two assigned paths before editing. `shasum -a 256 content/markdown/aaa/cosmology/CMB.md` measured baseline SHA-256 `4f6cf1ba420d59917a0cc1e279439a396e227cbf41fcc1359b5e2a95533ed8af`. All baseline line references below refer to these bytes.

## Verification working record

Before using the repository display parser on the chapter, a Node assertion case supplied one `x=1` display with viewer identity `known-one` and a second display inside a Markdown code fence. `parseCorpusDisplayEquations` returned exactly the one real display and its expected identity; the assertions passed. This records the known-case pass before the target inspection. It checks extraction, not mathematical correctness.

The pre-edit binder search used `rg -F 'cosmology/CMB.md'` in `scripts/`, `tests/`, `content/graph/`, and the CRW owner. It found textbook and scene references, conversion provenance, and EQ-22b, EQ-25, and EQ-28a comparison-source references. The equation generator owns `content/generated/equation-mapping/corpus-equations.json`. Inspection of EQ-22b source handling shows that a chapter path is generic source context and does not establish accepted evidence. These consumers and their identifiers will be preserved; none is edited by this worker. An initial search included nonexistent `content/data` and `assemblies/bosons/photon.md`; neither missing path was treated as evidence of absence.

The retained baseline also matches `5549583a1fa498a72e90aa1a170f26bec10dbd54:content/markdown/aaa/cosmology/CMB.md` by direct `git show` byte comparison. The display parser measured 35 baseline displays, each with a viewer identity.

Before the final target checks, Node assertions verified `marked` heading and link traversal against a hand-written one-heading/two-link example with a fenced false link; the expected arrays matched. KaTeX accepted `x+1` and rejected an invalid command. Reduced mathematical instruments passed the analytically known cases: $b(1,1)=1/(e-1)$ for $b(\nu,T_{\mathrm{temp}})=\nu^3/(\exp(\nu/T_{\mathrm{temp}})-1)$; $(3+4)^2=49$ for the correlated-power expansion; and a normalized vorticity ratio of one for $(\omega,c_{\mathrm{ref}},g)=(2,2,1)$. These passes precede the target counterexamples. Numerical illustrations use normalized wake-speed units $c_f=1$ and arbitrary reduced comparison units; they are not physical cosmology or EOM calculations.

One attempted preservation check failed because plain `marked` interpreted TeX lines containing `=` or `-` as Setext headings. Its initial known case had not covered this interaction. This was an instrument limitation, not a damaged chapter heading. The corrected instrument removes display math before Markdown traversal; an expanded known case containing those exact operators passed before the target was retried. The corrected run also compares `existingLink.semanticId` and the complete viewer-link text, not merely the common HTML path. No chapter edit was made to accommodate the false headings.

## Findings and repairs

Disposition: 22 repaired findings, CMB-01 through CMB-22; 17 high and 5 medium impact within this chapter. These are demonstrated formulation, attribution, notation, or claim-scope defects, not 22 established physical failures. “Derived” below means the stated logical or mathematical argument; “measured” identifies a textual comparison with the named source. Baseline and final ranges refer to chapter source lines, not PDF pages. Open physical obligations are listed separately.

| ID / impact | Baseline → final lines | Evidence, repair, and operator-checkable falsifier |
|---|---|---|
| CMB-01 / high | 17–21, 98–141 → 19–23, 100–148 | Derived scope correction: an unbounded time coordinate does not establish eternal galaxies, steady populations, or local release durations. The timeline now labels epoch windows as approximate standard comparisons, including speculative high-energy extensions, and keeps source formation and clock mapping conditional. Overturning this limitation requires a retained source-population solution and a derived observer-time map, not an epoch label. |
| CMB-02 / high | 107–123 → 110–128 | Measured canon mismatch against the photon construction and three-binary braid definition: a base braid has six architrinos, not a pair or quartet; the proposed photon is a twelve-worldline planar pair. Corrected the inventories and removed deductions of exclusive stability, absent interactions, or maximal self-hit strength from neutrality, density, or speed alone. A counterexample to the repair would require an accepted alternate canonical inventory or a causal-root derivation establishing those stronger implications. |
| CMB-03 / high | 134–216 → 140–231 | Derived inventory-versus-dynamics distinction: axial polarity arithmetic does not establish lepton, hadron, neutrino, nuclear, or bound photon branches. Same-polarity six-site charge and proton/neutron counts are retained, with formation, persistence, coupling, and BBN rates left as recovery targets. Recombination is not derived from neutral coaxial geometry. Overturning the boundary requires those branch and rate calculations from admissible histories. |
| CMB-04 / medium | 222–231, 258–264 → 237–247, 274–280 | Derived scope and comparison correction: the hot Big Bang account is not an established ultimate spacetime-origin explanation; a proposed microscopic source does not grant a weaker observational test than QSSC. Replaced categorical origin language and unsupported comparative superiority with matched source/transport obligations. A contrary comparison must identify a particular model and its independent evidence. |
| CMB-05 / medium | 23–57 → 25–59 | Derived dimensional/statistical repair: source-count dipoles must be compared with the fractional temperature dipole, not kelvin. Defined catalogue projection and retained intrinsic clustering in the null distribution. A sea contribution inferred by subtraction is not a medium measurement. Check the catalogue conventions and the joint structure/selection covariance; an independently predicted sea response is required to attribute a residual. |
| CMB-06 / high | 59–94 → 61–96 | Derived null-model correction: Planck and WMAP observe the same random sky, and a statistical cosmology supplies no particular realization to subtract. Defined filtering and normalization, joint simulations, signed templates, nonduplicated features, and the complete search domain. Two cold amplitudes also yield a positive product. Falsifier: show that the implemented null actually includes the common sky and all selection trials; independent instrument noise alone is insufficient. |
| CMB-07 / high | 218–220, 279–283 → 233–235, 295–301 | Derived counterexamples: identical local laws need not yield an isotropic finite source population, and mixing thermal sources at different temperatures need not be Planckian. A Planck maximum-entropy statement requires its ensemble constraints; gravitational smoothness alone defines no entropy. Added these distinctions. A source calculation that proves its directional correlations, transported common temperature, and entropy measure would discharge the relevant obligations. |
| CMB-08 / medium | 281–287, 349–353 → 297–305, 367–371 | Measured source correction: the entropy chapter already defines temperature as a same-record ensemble variable. Fixsen 2009 distinguishes a combined temperature estimate from FIRAS/WMAP recalibration. The 1965 detection was one-frequency excess with uncertainty, not a measured full blackbody. The accessible 1948 publisher preview supports a matter-density/curvature correction, not the removed detailed numerical condensation summary. Added exact source links and restricted statements to checked material. Falsifier: inspect the linked passages or a fuller primary text contradicting these bounded descriptions. |
| CMB-09 / high | 308–337 → 326–353 | Derived accounting repair: cumulative energy processed by thermalization is not net stored photon energy and can be counted repeatedly. Defined the existing budget term as stored-energy change, specified source supply, disjoint non-photon transfer, outward boundary flux, and dimensional tolerances. The displayed balance remains conditional on an effective energy law. Falsifier: trace one packet through repeated internal transfers and verify that the proposed bookkeeping counts each physical transfer only once. |
| CMB-10 / high | 338–347 → 355–365 | Derived independence boundary: an endpoint-clock frequency difference does not by itself establish deposited medium energy. Preserved the two-term path identity as conditional on a common energy convention and complete accounting; requiring an independently evaluated sea update prevents a subtraction tautology. A separately established conserved functional with all relevant terms could justify a stronger balance. |
| CMB-11 / medium | 289–306, 351–386 → 307–324, 371–406 | Derived notation/inference repair: defined the photon-to-baryon number ratio explicitly as the reciprocal of the conventional BBN ratio, retained intervening photon production, and specified positive common-unit growth ratios. Equality and curvature estimates are model conditioned, not direct readings transferable unchanged into another cosmology; equality is not a universal start of growth. Falsifier: inspect the actual parameter inference and reaction history for consistent conventions and covariance. |
| CMB-12 / high | 388–401, 448–460 → 408–421, 469–479 | Derived thermalization limitation: photon-number-conserving scattering can equilibrate energy without relaxing chemical potential to zero. Large interaction count or one relaxation depth does not prove a Planck spectrum. Distinguished collision-operator relaxation modes, number-changing processes, detailed balance, and photon recovery conditions. Falsifier: derive the collision operator and demonstrate decay of every relevant non-Planck mode over the observed band. |
| CMB-13 / high | 403–446 → 423–467 | Derived transport repair: opacity must use the local frequency on the path; extinction depth is not thermalization. Declared straight-path scope, the empty-threshold value, visibility width, Euclidean versus observer angular distance, and calibrated side-effect tolerances. Failure of a finite photosphere excludes that subclass, not all optically thin source models. A complete emissivity/opacity/trajectory calculation is the test of these conditions. |
| CMB-14 / high | 448–508 → 469–539 | Derived Planck-map/notation repair: energy density differs from intensity; a frequency shift alone misses the cubic amplitude transformation. Defined nondispersive calibration, spectral norm, bandpass integration, and total covariance. Temperature uses a disambiguated subscript instead of bare absolute-time notation in the transport and fit displays. Falsifier: test the full amplitude and frequency identity, then the detector-integrated transported spectrum, rather than refitting temperature alone. |
| CMB-15 / high | 509–523, 537–559, 651–683 → 531–579, 674–708 | Derived statistical repair: FIRAS 95% limits are not Gaussian standard deviations; spectral parameters, the full spectrum, EE-derived optical depth, scalar summaries, and acoustic positions can reuse the same information. Labeled diagonal sums as diagnostic and required joint covariance or nonoverlapping likelihood components. Falsifier: supply the full covariance or a demonstrably independent decomposition, including fixed feature matching. |
| CMB-16 / high | 524–535 → 544–555 | Derived visibility/notation repair: equality of scattering and evolution rates at one instant does not determine last-scattering width. Defined the complete visibility density and distinguished absolute event time from decoupling temperature; rates must share an effective clock. Falsifier: two histories agreeing at the crossing but differing away from it generally have different visibility widths; a width claim must evaluate the full history. |
| CMB-17 / high | 579–587 → 599–610 | Derived correlation repair: the original auto-power-only definition could not represent signed TE. Replaced it with the general ensemble cross-spectrum and stated isotropy, finite-sky estimation, and masks. PDG §§29.3 and 29.7.1 independently support the effective comparison. Oppositely signed temperature and E coefficients provide an immediate counterexample to nonnegative TE. |
| CMB-18 / high | 591–649 → 614–672 | Derived power/likelihood repair: a sum of correlated amplitudes has a cross-power term. Added it, its Cauchy-Schwarz bound, and the requirement for source-matched tensor templates. Defined scalar pivot/running domains and distinguished active unequal-time sources from an initial-spectrum ansatz. A zero cross term is justified only by a decorrelation argument; a low-frequency forecast is not an observed pass. |
| CMB-19 / high | 685–702 → 710–727 | Derived dimensional repair: squared vorticity over squared density gradient carries speed squared. Dividing vorticity by a declared positive effective reference speed makes the ratio dimensionless; the integrated floor has length units. A velocity-vorticity diagnostic does not bound all vector metric or stress sources. Falsifier: repeat the unit calculation and propagate those sources to polarization before asserting an observational bound. |
| CMB-20 / high | 721–738 → 745–762 | Derived norm/scope repair: Lorentzian tensor contractions need not be positive norms and can vanish for nonzero tensors. Defined positive component norms in a declared observer frame and smoothing prescription, with an inverse-length integrated floor. The ratio is neither an entropy measurement nor a direct CMB observable. Falsifier: inspect the norm implementation and its observer/regularization dependence, then supply a transfer calculation for any claimed observable implication. |
| CMB-21 / high | 739–759 → 763–782 | Derived coverage repair: the composite inequality omits several conditions it previously purported to establish. Stated its omitted spectral, opacity, energy, reionization, dipole, and localized-feature comparisons; zero weights omit conditions and uncomputed values cannot count as zero. Falsifier: enumerate terms against the claimed conclusion; no implication exists for an omitted freely varying residual. |
| CMB-22 / medium | 761–857 → 784–881 | Derived mechanism/provenance repair: naming a forward map or a clock response function does not derive it. Defined the clock symbols, source-history components, and observer comparison roles; separated local SZ exchanges from between-event propagation and endpoint clocks, with disjoint recoil/medium/remnant terms. A single-packet ledger is not an ensemble SZ prediction. Falsifier: supply the retained source, transfer, scattering distribution, and independently evaluated local exchange law. |

## Independently checkable mathematical witnesses

These witnesses test the formulations, not the existence of the proposed photon or cosmological source. They use standard mathematics on explicitly effective comparison objects, not imported architrino equations of motion.

1. Planck transport: direct substitution into $b(\nu,T_{\mathrm{temp}})=\nu^3/(\exp(\nu/T_{\mathrm{temp}})-1)$ gives $b(\nu,T_{\mathrm{temp}}/\lambda)=\lambda^{-3}b(\lambda\nu,T_{\mathrm{temp}})$ for positive arguments. The Node comparison passed 36 combinations using frequencies 0.1, 1, 3, 10; temperatures 0.5, 2, 4; and scale ratios 0.5, 2, 3. Maximum measured relative floating-point discrepancy was `2.8073766007768153e-16`. This checks the algebraic implementation against substitution, not the physical transport operator.
2. Thermal mixture: equal weights at reduced temperatures 1 and 3 fix a putative common temperature at 2 in the Rayleigh-Jeans limit, while the high-frequency exponential tail has temperature 3. Thus the mixture is not any single Planck curve. At reduced frequencies 1 and 6, Node measured mixture-to-temperature-2 ratios `1.008665299223496` and `1.5173245615033035`. The limit argument, not fitting only those two points, establishes the counterexample.
3. Tensor power: expanding $\langle|a+b|^2\rangle$ gives the individual powers plus twice the real cross-correlation. Unit equal and opposite amplitudes have total powers 4 and 0, respectively; discarding correlation gives 2 in both cases. The bound follows from Cauchy-Schwarz. These are analytic controls and their Node arithmetic passed.
4. Correlated residuals: for residual vector $(1,1)$ and unit marginal variances with correlation 0.9, the inverse-covariance quadratic form is $2/(1+0.9)=20/19$, not the diagonal sum 2. Node measured `1.0526315789473684`. A marginal upper limit or a duplicated compressed summary cannot be treated as an independent Gaussian likelihood by notation alone.
5. Energy accounting: source supply 10, stored increase 6, non-photon gain 1, and outward flux integral 3 give zero balance. Internal scattering that transfers already counted energy again changes throughput but not this balance. The Node arithmetic passed; it establishes bookkeeping consistency only, not a conserved microscopic energy.
6. Units: vorticity has inverse-time units and a dimensionless density gradient has inverse-length units. Their squared integrated ratio has speed-squared units before the reference-speed correction. After correction, both integrals have length units. Squared curvature integrated over three-volume has inverse-length units. These dimension calculations justify the two floor conventions independently of numerical cosmology.
7. Thermalization: maximizing an effective bosonic ensemble entropy at fixed energy and fixed particle number leaves two Lagrange multipliers, temperature and chemical potential. Number conservation therefore does not require zero chemical potential. Number-changing equilibration is a separate condition; frequent scattering alone cannot close it. This is an effective recovery test, not a postulate for individual architrinos.

## Source comparisons and authority boundary

- Canonical comparisons used the [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), [entropy and temperature definition](../../../../content/markdown/aaa/dynamics/entropy.md#temperature-as-a-same-record-ensemble-variable), [photon theorem targets](../../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md), [Noether sea](../../../../content/markdown/aaa/spacetime/noether-sea.md), [absolute time](../../../../content/markdown/aaa/foundations/absolute-time.md), and [inflation model](../../../../content/markdown/aaa/cosmology/inflation-model.md). These sources were inspected for the affected obligations; they were not edited. The photon source explicitly says its bound branch has not been exhibited.
- The repository's Corpus Reviewer procedure supplied the bounded evidence format. Explicit operator authority supplied permission for these safe repairs. The academic/mathematical style and terminology guides governed definitions, time/temperature disambiguation, effective-level comparisons, and preservation of the proposed source at hypothesis grade. This is not an independent reviewer sign-off or a canon-policy change.
- [Fixsen 2009](https://arxiv.org/abs/0911.1955): checked the primary abstract's combined estimate and separately quoted FIRAS/WMAP recalibration. [Fixsen et al. 1996](https://arxiv.org/abs/astro-ph/9605054): checked primary abstract confidence limits for the distortion parameters. These checks validate attribution, not raw-data reanalysis.
- [Dicke et al. 1965](https://articles.adsabs.harvard.edu/pdf/1965ApJ...142..414D), pp. 415–416, and [Penzias and Wilson 1965](https://articles.adsabs.harvard.edu/pdf/1965ApJ...142..419P), pp. 419–420: checked the original letter texts for thermal-history assumptions, the measured excess and uncertainty, and the need for spectral follow-up.
- [Alpher and Herman 1948](https://doi.org/10.1038/162774b0): checked the accessible Nature publisher preview, which supports the matter-density and effective-curvature correction. The attempted archival PDF was unavailable. No full-paper numerical verification is claimed; unverified detailed numerical interpretation was removed while preserving the source.
- [PDG 2025 CMB review](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-cosmic-microwave-background.pdf), §§29.3 and 29.7.1: checked spherical-harmonic statistics, masking, TE correlation and anticorrelation. These are observer-level reference objects, not premises for the microscopic theory.

## Identity preservation and validation

The corrected Node preservation check against the byte-verified baseline measured 40 unchanged headings, 35 unchanged display-equation viewer identities and link texts, and retention of every one of the 52 original Markdown link targets. The revised chapter has 66 links. All chapter/scene paths, 35 viewer anchors, and the `planck-blackbody-occupancy` identity remain intact; no generated or consuming file was edited by this worker. Eight displays have revised TeX under their existing identities:

| Final display line | Preserved identity | Repair |
|---|---|---|
| 425 | `corpus-equation-810538e241564243` | Local path frequency in opacity |
| 483 | `corpus-equation-d846fa25c465ce88` | Temperature versus absolute-time notation |
| 497 | `corpus-equation-7d35f666919edf64` | Same temperature disambiguation in spectral fit |
| 545 | `corpus-equation-34084353b5f94348` | Absolute event-time argument |
| 560 | `corpus-equation-e6c4f45ccd2d03d9` | Reionization optical depth versus physical clock |
| 603 | `corpus-equation-1ced8de62fcc162b` | General temperature/polarization cross-spectrum |
| 642 | `corpus-equation-f0a1292ed287e3c9` | Tensor cross-power |
| 711 | `corpus-equation-ddf9fcdcab75c536` | Reference-speed normalization and effective gradient |

Validation instruments and boundaries:

- `node scripts/validate-content.mjs --check --strict`: exit 0, 0 errors, 0 warnings on both recorded runs; the later run after receipt completion measured 199 content Markdown files and 1718 repository Markdown files, versus 1716 repository files earlier. Its 30 informational notes concern scene-inventory reporting, not a mathematical acceptance decision. This global inventory can change while other workers edit.
- Scoped Node/KaTeX checks with `throwOnError: true` and `strict: 'error'`: all 35 display and 277 inline expressions in the chapter parsed, as did all 10 inline expressions in the completed receipt. The receipt contains no real display equations; its fenced test fixtures were correctly excluded. All 7 local file links in the receipt resolved. This is syntax and path validation, not visual rendering or correctness proof.
- The Markdown traversal and `fs.statSync` check measured 59 local file links in the chapter, all resolving to files; equation identities were checked separately. File existence alone does not prove every semantic anchor's content or an external source's truth.
- `git --no-optional-locks diff --check -- content/markdown/aaa/cosmology/CMB.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-cmb-review-2026-09-12.md`: exit 0 for tracked-diff whitespace; the scoped Node check additionally passed trailing-whitespace checks on both complete files, including the new untracked receipt. Scoped `git --no-optional-locks status --short` measured the chapter modified and the receipt untracked. `shasum -a 256` independently reproduced the Node chapter digest below.
- `node scripts/build-equation-mapping-corpus.mjs --check`: exit 1, reporting a stale `content/generated/equation-mapping/corpus-equations.json` across its 199-file, 4685-display scan. This chapter changed equation source bytes and context; the global check does not isolate every contributor to drift in the concurrently edited corpus. No registry regeneration was run. The exact deferred command is `node scripts/build-equation-mapping-corpus.mjs --write`, followed by the corresponding `--check`, when the integration/publication owner has regeneration authority.
- No Python, EOM solver, cosmological simulation, likelihood fit, Git write, shared-record edit, or generator write was performed by this worker. The validation harness below is retained in this receipt so no third authored file is required.

### Reproducible scoped check

From the repository root, extract the sole JavaScript fence below and run it with `node --input-type=module`. The fence extractor itself passed a one-block known case before extracting this receipt, and this retained harness completed with exit 0. The harness performs its known cases before inspecting either assigned file. Rerun the two repository check commands above separately. The harness compares against the verified baseline object and validates only syntax, paths, identity preservation, and the reduced algebra described above.

```javascript
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { marked } from 'marked';
import katex from 'katex';
import { parseCorpusDisplayEquations as parse } from './scripts/build-equation-mapping-corpus.mjs';
const chapter = 'content/markdown/aaa/cosmology/CMB.md';
const receipt = 'reference/priorities/aaa-corpus-rewrite/evidence/crw-005-cmb-review-2026-09-12.md';
const withoutDisplays = s => s.replace(/\$\$[\s\S]*?\$\$/g, '\n\n');
function inventory(s) {
  const headings = [], links = [];
  marked.walkTokens(marked.lexer(withoutDisplays(s)), t => {
    if (t.type === 'heading') headings.push(t.raw.trim());
    if (t.type === 'link') links.push(t.href);
  });
  return { headings, links };
}
function inline(s) {
  const cleaned = s.replace(/^\s*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\s*\1\s*$/gm, '').replace(/`[^`\n]*`/g, '');
  return [...withoutDisplays(cleaned).matchAll(/(?<![\\$])\$(?!\$)((?:\\.|[^$\n])+)\$/g)].map(m => m[1]);
}
const sample = '# One\n\n[a](one.md) [b](two.md)\n\nProse\n$$\nx\n=\n1\n-\n0\n$$\n\n```md\n# no\n[x](false.md)\n```\n';
assert.deepEqual(inventory(sample), { headings: ['# One'], links: ['one.md', 'two.md'] });
assert.deepEqual(inline('$a$\n\n$$b$$\n\n`$c$`\n\n```md\n$d$\n```\n'), ['a']);
katex.renderToString('x+1', { throwOnError: true });
assert.throws(() => katex.renderToString('\\notARealCommand', { throwOnError: true }));
const known = parse('known.md', '$$\nx=1\n$$\n\n[View →](equation-mapping.html#known-one)\n\n```md\n$$ignored$$\n```\n');
assert.equal(known.length, 1);
assert.equal(known[0].tex, 'x=1');
assert.equal(known[0].existingLink.semanticId, 'known-one');
const b = (nu, t) => nu ** 3 / Math.expm1(nu / t);
assert.equal(b(1, 1), 1 / Math.expm1(1));
assert.equal(3 ** 2 + 4 ** 2 + 2 * 3 * 4, 49);
assert.equal((2 / 2) ** 2 / 1 ** 2, 1);
console.log('PASS known cases before targets');
const baseline = execFileSync('git', ['show', '5549583a1fa498a72e90aa1a170f26bec10dbd54:' + chapter], { encoding: 'utf8' });
const current = fs.readFileSync(chapter, 'utf8');
assert.equal(crypto.createHash('sha256').update(baseline).digest('hex'), '4f6cf1ba420d59917a0cc1e279439a396e227cbf41fcc1359b5e2a95533ed8af');
const before = inventory(baseline), after = inventory(current);
assert.deepEqual(after.headings, before.headings);
for (const href of before.links) assert(after.links.includes(href), href);
const old = parse(chapter, baseline), now = parse(chapter, current);
assert.equal(now.length, 35);
assert.deepEqual(now.map(d => d.existingLink.semanticId), old.map(d => d.existingLink.semanticId));
assert.deepEqual(now.map(d => d.existingLink.text), old.map(d => d.existingLink.text));
console.log({ headings: after.headings.length, originalLinks: before.links.length, currentLinks: after.links.length, changedDisplays: now.filter((d, i) => d.tex !== old[i].tex).length });
for (const file of [chapter, receipt]) {
  const s = fs.readFileSync(file, 'utf8'), displays = parse(file, s), inlines = inline(s);
  for (const tex of [...displays.map(d => d.tex), ...inlines]) katex.renderToString(tex, { throwOnError: true, strict: 'error' });
  let localLinks = 0;
  for (const href of inventory(s).links) {
    if (/^(?:https?:|mailto:|#)/.test(href)) continue;
    const target = decodeURIComponent(href.split('#')[0]);
    assert(fs.statSync(path.resolve(path.dirname(file), target)).isFile(), href);
    localLinks++;
  }
  assert(!/[\t ]+$/m.test(s));
  console.log({ file, displayMath: displays.length, inlineMath: inlines.length, localLinks, result: 'PASS' });
}
let maxError = 0;
for (const nu of [.1, 1, 3, 10]) for (const temp of [.5, 2, 4]) for (const lam of [.5, 2, 3]) {
  const lhs = b(nu, temp / lam), rhs = lam ** -3 * b(lam * nu, temp);
  const relativeError = Math.abs(lhs - rhs) / Math.max(Math.abs(lhs), Math.abs(rhs));
  maxError = Math.max(maxError, relativeError);
  assert(relativeError < 1e-12);
}
const mix = [1, 6].map(nu => (.5 * b(nu, 1) + .5 * b(nu, 3)) / b(nu, 2));
assert(Math.abs(mix[0] - mix[1]) > .01);
assert(Math.abs(2 / (1 + .9) - 20 / 19) < 1e-14);
assert.equal(1 + 1 + 2, 4);
assert.equal(1 + 1 - 2, 0);
assert.equal(10 - 6 - 1 - 3, 0);
console.log({ reducedPlanckCases: 36, maxError, mix, result: 'PASS' });
console.log('chapter SHA-256', crypto.createHash('sha256').update(current).digest('hex'));
```

## Open obligations and integration handoff

The bounded text repairs do not exhibit a persistent braid/photon branch, an admissible SMBH release population, microscopic energy conservation, a constitutive Noether sea response, or an accepted EOM solver result. The native delayed-history derivations still have to supply the source, clock, energy, collision, and transport objects used in these effective comparisons. A calibrated common-history prediction must additionally recover the spectrum, anisotropy/polarization, acoustic phase, lensing, growth, reionization, source dipoles, and any tested localized features with a nonduplicated likelihood. The chapter supplies no numerical fit or theory-closure claim.

Only the chapter and this dedicated receipt are submitted. The coordinator owns shared CRW-005 disposition, cross-worker reconciliation, and any authorized later regeneration. Useful speculative source possibilities remain discoverable at their existing headings, without promotion to established physical mechanisms. No new project terminology or accepted physical branch is introduced.

Final chapter SHA-256, measured by Node SHA-256 over the complete UTF-8 bytes: `1830a52795893fc0ffeae0098ccf04086fba65f88602a4f734c60821e9e4d89d`. An integration-time hash mismatch requires inspection of the intervening diff before reusing this receipt; it is not by itself evidence of a scientific regression.
