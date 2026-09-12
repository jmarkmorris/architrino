# CRW-005 General Relativity bounded review and repair — 2026-09-12

Status: Done for the authorized bounded chapter review and repair, with strict content validation passing and generated equation-registry drift deferred. The disposition is limited to this chapter and its demonstrated defects. It does not establish theory closure, empirical acceptance, Einstein-equation recovery, EOM solver certification, or downstream chapter closure. Shared review-board, queue, and work-log integration belongs to HQ.

## Scope and exact source identity

The authorized write scope is [General Relativity](../../../../content/markdown/aaa/spacetime/general-relativity.md) and this report. The complete baseline and revised chapter were read, with the final one-word correction reread through its exact patch. The parent reviewed the substrate route, live canon, definitions, diagnostic domains, and proposed repairs. One read-only comparison agent, `/root/crw_005_gr_comparison`, independently examined the optical, clock, PPN, EFT, and Schwarzschild comparison formulas. The specialist lens did not confer mathematical authority; the separately checkable derivations and primary sources below supply the evidence.

| Item | Measured record |
|---|---|
| Chapter baseline SHA-256 | `4f4f864761690aea613b8d6a756b4731ac486b3aca47f7a362055b7414126d69` by initial hashing and an asserted hash of the baseline Git object |
| Baseline Git object | `ab3ed93a59e69a5807397c24cefcfcb3a9642487:content/markdown/aaa/spacetime/general-relativity.md` by `git show`; the object identifies these chapter bytes, not all live neighboring owners |
| Chapter final SHA-256 | `60fe1cebac95b016073f0c062f1b815e9b5920d2a4c2c778b23ff89a39de16e9` by the known-case-first Node SHA-256 and math check reproduced below |
| Initial scoped state | `git --no-optional-locks status --short -- <chapter> <report>` returned no entries; the chapter was unchanged and the report destination was absent |
| Edit safeguards | Reread the target and checked its digest before repairs; the final replacement helper was first checked on a known single match and a duplicate-match rejection |
| Final math bindings | All 25 existing display-equation semantic IDs retained, in order, by the baseline/final parser comparison below |
| Write boundary | Only the assigned chapter and this report were written by this worker; the comparison agent wrote no files |

Baseline line references below identify the baseline digest; final line references identify the final digest. A different digest invalidates their exact line mapping and requires rereading the changed passages. No shared status file, priority queue, neighboring chapter, canon guide, checker, source index, fixture, generated artifact, branch, or publication record was edited by this task. Git inspection does not supply authorization for publication.

The governing live sources were AGENTS, the generated startup router, the [corpus-reviewer procedure](../../../office-of-research/cto/prompts/corpus-reviewer.md), [review skill owner](../../../op/skills/skill-architrino-review.md), [theory orientation](../../../op/theory-orientation.md), operator explanation and execution owners, and the applicable academic, mathematical, terminology, and attribution guides. Theory checks used the Foundations definitions, [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), [Observer Framework](../../../../content/markdown/aaa/spacetime/observer-framework.md), [Noether Sea](../../../../content/markdown/aaa/spacetime/noether-sea.md), [Emergent Metric](../../../../content/markdown/aaa/spacetime/emergent-metric.md), [Proper Time and Time Dilation](../../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md), [PPN Parameters](../../../../content/markdown/aaa/spacetime/ppn-parameters.md), and the strong-field alignment owner. These reads do not certify those owners as a whole.

## Findings and smallest repairs

Each source defect below is measured by the complete baseline read and scoped Git diff at the recorded hashes. Its mathematical or inferential significance is graded separately. P2 denotes a substantive definition, domain, or claim-boundary defect; it does not mean a measured failure of nature or of an evolved Architrino candidate.

### GR-01 — The substrate-to-observer route and common-law requirement were underdefined

**P2; repaired. Baseline lines 3–35; final lines 3–41.** The original opening named a Euclidean substrate and medium, but omitted the admitted causal-root acceleration route and the observer reconstruction. Its demand for the same medium record across clock, lensing, and gravitational-wave experiments did not distinguish compatible channels within one experiment from different environmental states under one law.

The repair defines the layer assignments, retained path history, simple-root acceleration weight, and reconstruction of clock/ruler/signal records. It defines the local terms and distinguishes a common constitutive law from identical experimental histories. The proposed Noether-sea realization is explicitly guessed; selected comparison identities remain effective recovery targets. No standard-physics equation is added to the primitive acceleration law.

**Grade and falsifier.** The missing distinctions are measured editorial defects; the need to separate different experimental states is inferred from the meaning of a constitutive law. An explicit record equivalence showing that those experiments share the same full history would overturn that particular concern. Recovery itself requires independently evolved admissible records meeting the specified constraints; copying the comparison metric into their construction would not supply that evidence.

### GR-02 — Network and causal diagnostics did not define an acceptance test

**P2; repaired. Baseline lines 37–75; final lines 43–81.** The network expression used an inverse covariance without specifying residual units, independent residual space, sampling law, or threshold. The causal diagnostic described its weighted preferred-frame term as keeping coefficients below observational bounds without relating its weights to those bounds.

The repair defines residuals, covariance scope, invertibility, fixed positive weights, observation sample, and the additional statistical specification an acceptance claim needs. CMB comparisons retain their cosmological and foreground assumptions. A weighted sum supplements individual bounds. Unsupported historical nuisance parentheticals were removed while the calibration/source-error argument remains.

**Grade and falsifier.** The diagnostic limitations are derived. For any nonzero coefficient and positive aggregate tolerance, a sufficiently small positive weight makes its weighted square pass regardless of an independently tighter coefficient bound. Duplicating a residual can make its covariance singular. A specified full-rank residual construction, sampling distribution, threshold, and proved implication for each individual bound would discharge these concerns. None was supplied by the baseline expression.

### GR-03 — Finite continuation needed the live dynamics domain and noncircular data

**P2; repaired. Baseline lines 77–96; final lines 83–104.** The continuation map lacked definitions for its history and boundary inputs and did not state the regularization and branch hypotheses owned by the Master Equation. A sea history over the whole future window could be mistaken for a prediction of that same history. The original restriction on using global-hyperbolicity comparisons before recovery was stronger than the actual distinction between using a comparison and proving its physical realization.

The repair defines each input, separates the medium record from metric lapse, and requires consistent evolution or an explicit prescribed environment. It retains the live finite-family criterion as a conditional target and identifies its compatible-history, distance, transversality, regularization, and bounded-branch hypotheses. Global hyperbolicity, Cauchy surfaces/horizons, and cosmic censorship receive local definitions.

**Grade and falsifier.** The missing qualifications are measured; supplying desired future data is insufficient for predicting it by definition. The general continuation theorem remains open. A theorem covering the stated candidate domain, including its singular events and branch selection, would strengthen this status. Finite substrate time or Euclidean void alone proves neither unique continuation nor censorship.

### GR-04 — The clock shift lacked endpoints, chart definitions, and adequate source identification

**P2; repaired. Baseline lines 100–120; final lines 108–130 and 480.** The positive clock-rate shift was not an algebraic sign error. Its endpoint convention was absent, allowing it to be confused with the opposite received-photon shift. The sea-relative velocity lacked an explicit projected chart and norm; the displayed square root could be overread as fixing second-order PPN coefficients. The measurement reference was only a “Bothwell-class” label.

The repair defines the weak stationary zero-shift comparison, projected sea-relative velocity, reference norm, potential sign, positive calibrated reference speed, and small-parameter domain. It gives the clock endpoints and received-photon convention separately, limits the square root to its leading terms, and identifies the Bothwell spectroscopy source. Primitive wake speed remains distinct from the measured comparison speed.

**Grade and falsifier.** The endpoint correction is derived by the stationary lapse calculation below; the Bothwell claim is measured by spatially resolved optical-clock spectroscopy, limited to the observed clock gradient. A different explicitly declared endpoint comparison can change the sign, so neither sign is universal. The source does not measure a Noether-sea mechanism. The baseline estimates of roughly 1.1 × 10⁻¹⁹ for 1 mm and 3.6 × 10⁻¹⁷ for 33 cm were removed in favor of the symbolic local gradient; they were not recomputed or classified as false in this review.

### GR-05 — The Shapiro integration measure and ray domains were ambiguous

**P2; repaired. Baseline lines 122–177; final lines 132–189.** The time integral used `ds_eff` without identifying whether it was a null interval, local ruler distance, or reference path length. Those choices are inequivalent. The endpoint distances, impact parameter, and domain of the logarithm were not locally defined.

The repair uses the Euclidean-reference path element, defines coordinate signal speed, and conditions the formula on a stationary isotropic zero-shift chart and a signal sharing its effective null paths. It names the endpoint distances and reference separation, keeps the ray outside the source, requires a positive weak-field impact parameter and logarithm denominator, and identifies the asymptotic lensing formula's domain. The coefficients are preserved.

**Grade and falsifier.** The measure distinction is derived from the null metric calculation below and agrees with the live Emergent Metric owner. An explicitly different speed defined relative to local ruler length would require a different integral; finding that definition would require reevaluating the formula. No signal propagation law was derived from the master equation here.

### GR-06 — The acceleration residual and perihelion formula were broader than their mathematics

**P2; repaired. Baseline lines 179–260; final lines 191–278.** The acceleration diagnostic did not define its norm or acceleration-valued denominator floor and could be mistaken for a full 1PN test. The perihelion formula stated only the gamma/beta reduction without its test-body and additional-parameter assumptions. The projection symbols were not locally defined.

The repair specifies the common observer record, lapse/drift/coframe/spatial metric, dimensionless residuals, fixed uncertainty scales, and independently projected trajectory. The acceleration floor has acceleration units and needs an absolute-error companion near zero comparison acceleration. The leading Newtonian term is separated from the exact zero-velocity lapse factor and velocity-dependent connection terms. The orbital formula is restricted to a weak-field test body, a spherical nonrotating source, an eccentric bound orbit, other PPN coefficients at their GR values, and separate source multipoles; the remaining PPN tests stay linked.

**Grade and falsifier.** The lapse-factor qualification is derived from the metric connection below. Will's general PPN perihelion expression includes additional coefficients and finite-mass-ratio and quadrupole contributions, so the reduced expression does not cover that general case. A separately derived full-motion bound below a fixed tolerance, or explicit specialization removing the extra terms, discharges the corresponding concern. Setting the trajectory from the comparison acceleration only verifies the imposed model.

### GR-07 — The EFT residual lacked a fixed prescription and was treated as an unconditional classical gate

**P2; repaired. Baseline lines 262–301, 406–454; final lines 280–319, 426–474 and 481.** The baseline potential coefficients had no declared coordinate, momentum, particle-content, or iteration prescription. A raw potential mismatch was therefore not a fully specified observable mismatch. The quantum correction also appeared in the mandatory classical acceptance list and intersection without distinguishing theoretical EFT recovery from tested classical recovery.

The schematic potential and its residual remain. The repair requires matched prescriptions, a controlled long-distance expansion, and the resulting scattering or interference observable, including the necessary kinetic and iteration terms. It explicitly labels the correction as a theoretical conditional target. Claiming recovery of that EFT limit still entails the comparison; classical observational acceptance does not silently entail it. The common-law requirement survives both scopes.

**Grade and falsifier.** Prescription dependence of a displayed classical potential coefficient is derived below and documented in the primary calculation. This is not a claim that the long-distance quantum coefficient is freely adjustable: the cited calculation fixes it in its specified momentum convention. A nonzero matched-observable discrepancy beyond controlled extraction/truncation errors falsifies the claimed EFT recovery. An unmatched potential difference does not. No Architrino quantum potential was constructed.

### GR-08 — Equivalence diagnostics omitted domains and did not appear in the final acceptance set

**P2; repaired. Baseline lines 303–353, 406–454; final lines 321–371, 426–474.** The composition ratio needed a common signed measurement convention and nonzero denominator. The scale-gradient diagnostic reused an unspecified epsilon even though its denominator has inverse-length units; it was described as forbidding apparatus-dependent response without an apparatus map. The microscopic common-response proposal was stated as a necessary mechanism. The self-gravity diagnostic lacked signed binding energy and nonzero-fraction conventions and was exported to compact bodies without a response calculation. Equivalence tests were absent from the concluding list/intersection.

The repair defines positive source-axis accelerations, positive dimensionless calibration factors, reference-chart gradient, inverse-length scale floor, and the limited meaning of a small diagnostic. It names the invisible constant-ratio case and retains separate differential-acceleration and clock tests. The common internal response remains a candidate mechanism. The binding-energy sensitivity is limited to weak self-gravity with a separate compact-body export obligation. The classical list and intersection now include composition, self-gravity, and consistent mass calibration.

**Grade and falsifier.** Dimensional and constant-ratio limitations are derived: a spatially constant material ratio has zero logarithmic gradient regardless of that ratio's value. A quantitative apparatus derivation linking the diagnostic to an experimental bound would discharge the missing implication. A universal response theorem could promote the microscopic proposal. A small scalar residual alone establishes neither.

### GR-09 — Preferred-frame coefficients were mislabeled as group-speed parameters

**P2; repaired. Baseline lines 355–366; final lines 373–384 and 478.** Will's PPN definitions identify alpha-one, alpha-two, and alpha-three as preferred-frame coefficients; alpha-three also diagnoses effective momentum nonconservation. They are not group velocities. The baseline also used any measurable residue as the rejection condition instead of the applicable bound.

The repair uses the correct coefficient names, states bound-dependent rejection, and preserves the distinction between weak-field PPN parameters and body-dependent strong-field extensions for pulsar tests.

**Grade and falsifier.** This is a measured terminology mismatch against the primary PPN definition. A different observable carrying the same symbol would need its own definition and map before replacing that definition; no such map was supplied. A predicted coefficient below the applicable bound is not rejected merely because it is nonzero.

### GR-10 — Gravitational-wave statements exceeded the specified timing and polarization tests

**P2; repaired. Baseline lines 368–379; final lines 386–399 and 482.** The baseline treated unsuppressed scalar/vector/longitudinal response as excluded without the measurement model or mode-mixture domain. It gave a symmetric timing summary without explaining source-delay or asymmetric-bound limits. Collective medium propagation was asserted without a constitutive derivation.

The repair defines the group-speed calibration and bounds the symmetric summary by the actual selected timing likelihood. It distinguishes a guessed medium interpretation from measured signal propagation and detector response. The source note states that the cited GW170817 polarization analysis compares pure hypotheses and leaves mixed-mode content outside that test.

**Grade and falsifier.** The measurement boundary is measured by the cited collaboration analysis; the limitation of pure-hypothesis comparison is also a logical inference from its tested alternatives. A mixture-sensitive detector analysis with the declared source assumptions may strengthen the exclusions. This review makes no claim to survey every later dataset or to select the newest bounds.

### GR-11 — The strong-field comparison conflated an alignment candidate with a global horizon

**P2; repaired. Baseline lines 381–404 and 453–454; final lines 401–424 and 474.** Naming the canonical alignment condition as an event-horizon condition promoted a local constitutive candidate before a global outgoing-signal calculation. The three Schwarzschild radii lacked their areal-coordinate definition. The closing acceptance intersection was not explicitly scoped to a candidate family or distinguished from an unsuccessful construction/search.

The repair preserves the alignment link and the coefficients 2, 3, and 6 while stating the spherical, nonrotating, uncharged, asymptotically flat comparison and sphere-area definition. It distinguishes horizon, null orbit, and massive-body ISCO from their unproved substrate realization. Strong-field departures must still satisfy the measurements in their tested domains. The acceptance sets now have explicit meanings; proved emptiness rejects the declared family, whereas missing construction leaves existence unresolved.

**Grade and falsifier.** The global/local distinction is derived from the event-horizon definition; the alignment realization remains guessed. A compatible global signal continuation can establish or refute the candidate horizon. An exterior observable mismatch overturns a claimed strong-field recovery. An exhaustive emptiness theorem or certified exclusion of the declared candidate family can reject that family; failure to find a member cannot substitute for it.

## Independent mathematical checks and preserved content

The following are analytical comparisons, not EOM solver output, simulations, fitted constitutive laws, or proofs that the comparison metric occurs in the substrate. All uses of standard GR are explicitly at effective comparison grade. No new numerical physical instantiation was run; primitive wake speed remains symbolic, so no non-normalized value was introduced.

### Optical measure and clock endpoints

For a stationary isotropic zero-shift comparison metric,

$$
ds^2=-N^2c_0^2dt_{\mathrm{eff}}^2+B\,d\ell_h^2,
\qquad
B>0,\quad N>0,
$$

the null condition gives

$$
dt_{\mathrm{eff}}=\frac{\sqrt B}{Nc_0}\,d\ell_h.
$$

With $N=1+\Phi_N/c_0^2+O(c_0^{-4})$ and $B=1-2\gamma_{\mathrm{PPN}}\Phi_N/c_0^2+O(c_0^{-4})$, the reference-path index is $1-(1+\gamma_{\mathrm{PPN}})\Phi_N/c_0^2$ at first order. The null interval is zero, whereas local ruler distance is $\sqrt B\,d\ell_h$; neither can replace the reference length under the same index. As an analytical known limit, $N=B=1$ gives the reference travel time and equal static clock rates.

For identically calibrated static clocks, rates relative to one coordinate time are proportional to $N$. Thus $\nu_B^{\mathrm{coord}}/\nu_A^{\mathrm{coord}}=N_B/N_A$. A stationary signal has local received/emitted ratio $N_A/N_B$ instead. This verifies both signs under their distinct endpoint definitions and preserves the original positive clock-rate coefficient.

### Newtonian scope and orbital coefficients

For $g_{00}=-N^2$ in a stationary zero-shift chart with $x^0=c_0t_{\mathrm{eff}}$,

$$
\Gamma^i{}_{00}=N^2(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_j\ln N,
\qquad
\left.\frac{d^2x^i}{dt_{\mathrm{eff}}^2}\right|_{\mathbf v=0}
=-N^2(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_j\Phi_{\mathrm{eff}},
\qquad
\Phi_{\mathrm{eff}}=c_0^2\ln N.
$$

The displayed chapter residual omits the lapse factor's higher-order correction and velocity terms; it is a leading Newtonian comparison with controlled remainders. The live Emergent Metric handoff supplies that scope. In the reduced orbital formula, substituting $\gamma_{\mathrm{PPN}}=\beta_{\mathrm{PPN}}=1$ gives the unchanged GR factor $6\pi$. Will's more general PPN expression explains why the restricted formula cannot serve every orbit or coefficient family.

### EFT coordinate control

Take the schematic comparison $V(r)=-K r^{-1}[1+aL/r+O(L^2/r^2)]$, with $K,L$ fixed and $L/r$ small. Under $r=\rho+\lambda L$,

$$
V(\rho)=-\frac K\rho\left[1+(a-\lambda)\frac L\rho+O(L^2/\rho^2)\right].
$$

The displayed classical coefficient shifts, while a consistent transformation of kinetic and other terms leaves the physical comparison invariant. The identity transformation $\lambda=0$ is the analytical known limit. The primary EFT paper separately discusses the scattering/Born-subtracted prescriptions and the momentum convention fixing its quantum term. The repair therefore requests a fixed comparison prescription rather than treating coefficients as tunable.

### Concerns not sustained or not promoted

The positive clock-rate sign, GR lensing coefficient, GR perihelion coefficient, and Schwarzschild values 2, 3, and 6 were retained. No numerical coefficient error was demonstrated in those formulas. The finite-family continuation requirement was also retained after reading the live dynamics owner: this review restores its hypotheses rather than rejecting a canonical conditional target. The potential comparison remains useful under matched conventions. The source-defined quantum correction is not treated as an arbitrary coefficient.

The historical Pound–Rebka thermal-gradient and Eddington-1919 systematics parentheticals were not independently verified here; removing those shorthand examples does not establish that the historical assertions are false. This was a bounded source check, not full source mining or a historical review. Optional wider rewrites, current constraint-ledger updates, constitutive modeling, and neighboring chapter reconciliation remain outside this assignment.

## Primary-source checks

Sources were opened through the web tools on 2026-09-12. The comparison agent independently consulted the GR/PPN and EFT primary texts; the parent checked the live corpus owners and measurement-source boundaries.

| Source | Verified role and limit |
|---|---|
| [Will, The Confrontation between General Relativity and Experiment](https://arxiv.org/abs/1403.7377), sections 3.2 and 4.1–4.2, including the general perihelion expression | PPN parameter meanings and effective weak-field comparisons; no Architrino derivation |
| [Bothwell et al., Resolving the gravitational redshift within a millimeter atomic sample](https://arxiv.org/abs/2109.12238), published in Nature 602 (2022) | Spatially resolved strontium-clock frequency gradient; no microscopic medium identification. The Nature redirect could not be opened, so the primary arXiv record supplied the bounded support |
| [Bjerrum-Bohr, Donoghue and Holstein, Quantum Gravitational Corrections to the Nonrelativistic Scattering Potential of Two Masses](https://arxiv.org/pdf/hep-th/0211072), sections 2.1 and 4.1 | Theoretical EFT potential prescriptions, coordinate freedom, and fixed-convention quantum correction; no measured quantum-gravity correction |
| [Abbott et al., Tests of General Relativity with GW170817](https://dcc-lho.ligo.org/LIGO-P1800059-v9/public), [collaboration PDF](https://dcc.ligo.org/public/0150/P1800059/008/main.pdf), polarization discussion | Pure tensor/vector/scalar hypothesis comparison; mixed-mode content is explicitly outside that comparison |
| [Abbott et al., Gravitational Waves and Gamma-rays from a Binary Neutron Star Merger](https://arxiv.org/abs/1710.05834) | Source-delay-dependent and asymmetric multimessenger speed constraints; no numerical bound was newly transcribed into the chapter |

## Validation working record

The custom math scanner was first run on a known fixture with two expressions and one display equation. It accepted that fixture, rejected invalid TeX, an unmatched delimiter, and a code span, and verified the standard SHA-256 digest of “abc” before reading the target. Its scope explicitly excludes code spans/fences and escaped dollars; the target satisfies those restrictions. The source-equation parser is the existing repository parser, not a newly invented Markdown parser.

An initial ID comparison mistakenly read an absent `id` field and was discarded as inconclusive. A separate known-case control then verified the actual `semanticId` field, accepted unchanged IDs, and rejected a changed ID before the corrected target comparison. The final run printed both known-case passes before its chapter result.

The final chapter passed strict KaTeX rendering for 148 expressions: 123 inline and 25 display. The corrected parser comparison retained all 25 semantic IDs, in order, without missing or duplicate final IDs. Five display equations changed: clock velocity/norm (final line 111), optical path measure (135), acceleration floor (217), scale-gradient floor (333), and the classical acceptance intersection (453). These checks establish parse/render acceptance and identifier preservation, not browser visual QA, physical correctness, or freshness of generated equation destinations.

Before this report was created, `node scripts/validate-content.mjs --check --strict` returned exit 0 with 0 errors, 0 warnings, and 30 informational notes, auditing 391 scene configurations, 199 Markdown content files, and 1,651 repository Markdown files. The final run including this new report is recorded below. The scoped `git --no-optional-locks diff --check` also returned exit 0 before report creation.

`node scripts/build-equation-mapping-corpus.mjs --check` returned exit 1 and reported `content/generated/equation-mapping/corpus-equations.json` stale. The check reported 199 source files, 4,685 display equations, 23 promoted equations, and 30,406 symbol definitions. This task changed fingerprinted equation source, so registry drift is expected; concurrent source edits mean this whole-registry result cannot attribute every stale byte to this task. The exact deferred regeneration command is `node scripts/build-equation-mapping-corpus.mjs --write`, followed by the same `--check`. No generator write was run. The bounded review can complete with this explicitly deferred generated artifact; the generated-surface check itself did not pass.

### Reproduce the focused math and source-identity check

Run from the repository root. This command writes no files and checks its synthetic known cases before the target.

```bash
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import katex from 'katex';
import {parseCorpusDisplayEquations} from './scripts/build-equation-mapping-corpus.mjs';
function scanMath(s) {
  assert(!s.includes('\x60'), 'Scanner scope excludes code spans and fences');
  assert(!s.includes('\\$'), 'Scanner scope excludes escaped dollars');
  const out=[...s.matchAll(/\$\$([\s\S]*?)\$\$|\$([^$\n]+)\$/g)].map(m=>({tex:m[1]??m[2],display:m[1]!==undefined}));
  assert(!s.replace(/\$\$([\s\S]*?)\$\$|\$([^$\n]+)\$/g,'').includes('$'),'Unpaired math delimiter');
  return out;
}
function checkMath(s) {
  const expressions=scanMath(s);
  for(const e of expressions) katex.renderToString(e.tex,{displayMode:e.display,throwOnError:true,strict:'error'});
  return expressions;
}
const known='# Known fixture\n\n$x+1$\n\n$$\nx^2\n$$\n\n[View →](../../equation-mapping.html#known)\n';
assert.deepEqual(scanMath(known).map(x=>x.tex.trim()),['x+1','x^2']);
assert.equal(checkMath(known).length,2);
assert.equal(parseCorpusDisplayEquations('known.md',known).length,1);
assert.throws(()=>checkMath('$\\notARealTeXCommand$'));
assert.throws(()=>scanMath('$unclosed'));
assert.throws(()=>scanMath('\x60$x$\x60'));
assert.equal(crypto.createHash('sha256').update('abc').digest('hex'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
console.log('KNOWN-CASE PASS: 2 valid expressions (1 display); invalid TeX, unpaired delimiter, and code span rejected; SHA-256 abc matches published vector.');

function sameIDs(before,after) {
 assert.equal(before.length,after.length);
 const a=before.map(e=>e.existingLink?.semanticId),b=after.map(e=>e.existingLink?.semanticId);
 assert(a.every(Boolean)&&b.every(Boolean),'Missing semantic ID');
 assert.equal(new Set(b).size,b.length,'Duplicate semantic ID');
 assert.deepEqual(a,b);
}
const k=parseCorpusDisplayEquations('known.md',known);
assert.equal(k[0].existingLink.semanticId,'known');
sameIDs(k,k);
assert.throws(()=>sameIDs(k,parseCorpusDisplayEquations('known.md',known.replace('#known)','#other)'))));
console.log('KNOWN-CASE ID PASS: exact semanticId read as known, unchanged accepted, altered ID rejected.');

const p='content/markdown/aaa/spacetime/general-relativity.md';
const source=fs.readFileSync(p,'utf8');
const baseline=execFileSync('git',['show','ab3ed93a59e69a5807397c24cefcfcb3a9642487:'+p],{encoding:'utf8'});
assert.equal(crypto.createHash('sha256').update(baseline).digest('hex'),'4f4f864761690aea613b8d6a756b4731ac486b3aca47f7a362055b7414126d69');
const expressions=checkMath(source);
const before=parseCorpusDisplayEquations(p,baseline),after=parseCorpusDisplayEquations(p,source);
sameIDs(before,after);
const changes=after.filter((e,i)=>e.tex!==before[i].tex).map(e=>({line:e.startLine,id:e.existingLink.semanticId}));
console.log(JSON.stringify({expressions:expressions.length,display:after.length,inline:expressions.filter(e=>!e.display).length,IDsPreserved:after.length,changedEquations:changes,sha256:crypto.createHash('sha256').update(source).digest('hex')},null,2));

NODE
```

### Final document-integrity receipt

After report creation, `node scripts/validate-content.mjs --check --strict` returned exit 1: 2 errors, 0 warnings, and 30 notes, auditing 391 scene configurations, 199 content Markdown files, and 1,655 repository Markdown files. Its two diagnostics were outside the assigned write scope:

- `content/markdown/aaa/spacetime/black-holes.md:535`: link `../assemblies/photons.md` resolves to missing `content/markdown/aaa/assemblies/photons.md`.
- `reference/priorities/development-process-review/analysis/option-b-remaining-migration-plan.md:5`: link `option-b-prescribed-response-and-acceleration-cutover.md` resolves to the missing same-directory target.

The validator reported no diagnostic against either assigned file in that run. The cause and authorship of these external link transitions were not investigated, and the files were left to their owners. After this report's code-fence correction, the closing `node scripts/validate-content.mjs --check --strict` run returned exit 0 with 0 errors, 0 warnings, and 30 notes, auditing 391 scene configurations, 199 content Markdown files, and 1,656 repository Markdown files. The two external diagnostics were absent in that closing run; this worker did not edit either external file. This is the final strict content result, while the intermediate failure remains recorded as shared-checkout history.

The post-report equation-registry check again returned exit 1 for the same stale generated path, with 199 files, 4,685 display equations, 23 promoted equations, and 30,404 symbol definitions. It requires the deferred command recorded above; the changed symbol count illustrates why whole-corpus output must not be attributed solely to this chapter.

`git --no-optional-locks diff --check -- content/markdown/aaa/spacetime/general-relativity.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-general-relativity-review-2026-09-12.md` returned exit 0 after report creation. This Git check covers tracked diffs; the new report was additionally read in full and its code-fence closure corrected before final delivery. Scoped `git --no-optional-locks status --short` reported the chapter modified and this report untracked. `shasum -a 256` confirmed the chapter's final digest in the identity table.

The additional `git --no-optional-locks diff --no-index --check -- /dev/null reference/priorities/aaa-corpus-rewrite/evidence/crw-005-general-relativity-review-2026-09-12.md` emitted no whitespace diagnostics and returned exit 1 for the new-file comparison. The closing receipt changes only this report's validation history and disposition; the chapter digest remains unchanged.

**Disposition: Done for the authorized bounded chapter review and repair, with strict content validation passing and generated-registry regeneration deferred.** The equation-registry check remains stale, so no claim of all-checks-passed, downstream integration, or scientific closure is made.

## Remaining obligations and reopening conditions

The bounded defects above are repaired. The following are scientific or downstream obligations, not undiscovered proof supplied by this review:

1. Derive a compatible stable assembly/medium branch and its observer map from admitted delayed path-history dynamics, with root coverage, regularization and singular-continuation assumptions explicit. Reopen when independently evolved records or a theorem supplies that branch.
2. Derive the common clock, ruler, signal, mass-calibration, and effective-gravity response, including full applicable PPN, composition, self-gravity, and preferred-frame constraints. Reopen on a constructed constitutive candidate or a demonstrated cross-channel inconsistency.
3. Derive gravitational-wave propagation and detector response over the tested domain; carry the actual source and mixture assumptions when applying constraints. Reopen when those response calculations or a stronger relevant measurement are available.
4. Establish global outgoing-signal continuation before identifying the alignment boundary as an event horizon, and derive exterior orbit and signal observables before claiming strong-field recovery or singularity resolution. Reopen on that global calculation or a measured mismatch.
5. Supply a matched-observable EFT derivation only when claiming the stronger quantum-GR recovery. Reopen on an independently derived candidate, with fixed conventions and controlled errors.
6. Integrate the bounded disposition through HQ's status owners and regenerate equation mappings during authorized regeneration/publication. Reopen this receipt if the assigned chapter digest changes or a downstream check identifies a concrete defect in its repaired passages.

No shared board or queue is marked complete by this report. No complete system validation, solver certification, theory closure, or downstream closure is inferred from these checks.
