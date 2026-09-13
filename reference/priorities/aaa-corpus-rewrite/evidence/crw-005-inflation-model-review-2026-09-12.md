# CRW-005 Inflation Model Review — 2026-09-12

## Scope and provenance

This receipt records the bounded review and repair of priority 62, [Inflation Model](../../../../content/markdown/aaa/cosmology/inflation-model.md). The finding set is IM-01–IM-15: nine High and six Medium findings. High denotes an omitted condition or overstatement capable of changing a mathematical or physical conclusion; Medium denotes an ambiguous comparison, normalization, or interpretation. The editor performed the complete chapter review and self-review. Independent checks below establish specific algebraic facts and comparison conditions; they do not constitute an independent physical validation of the proposed cosmology.

The assignment authorizes only the chapter and this new receipt. Shared status, priorities, queue, log, conversion ledger, generated outputs, fixtures, other chapters, code, and publication files are outside the write scope. This task used no staging, commit, push, reset, stash, regeneration, or linked worktree. Shared disposition remains the coordinator's responsibility.

Measured before editing by scoped `git --no-optional-locks status --short -- content/markdown/aaa/cosmology/inflation-model.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-inflation-model-review-2026-09-12.md`, neither authorized path had a status entry. The receipt's absence was separately confirmed by `test ! -e`. Repeated pre-edit `shasum -a 256` checks matched the dispatch baseline:

```text
f51f88d7fd739cc4c8359b5bb01a039bdd5adef0a5bc4fc64591063a455cc0af
```

The same bytes are retained at `72847589ba73d0bf81d07ca5b27d98072659cee9:content/markdown/aaa/cosmology/inflation-model.md`; `git show` piped to `shasum -a 256` confirmed that match. Baseline references below refer to the complete `nl -ba` read, lines 1–324. Repaired references refer to the delivered chapter, lines 1–336. This review uses the explicit dispatch baseline, not an inferred historical conversion state or a commit-message attribution.

Final chapter SHA-256, measured by `shasum -a 256`:

```text
f9d74f49f7ec5cc78c5d30980bece6faada653a8bcc196e014da0bce1fce3eb9
```

Claim grade: measured for hashes, file state, and preservation under the commands identified here. Falsifier: the retained object or delivered chapter yields different bytes, or the scoped diff contains an unrecorded change. Live checks are snapshots of a shared checkout; other workers' output is not attributed to this assignment.

## Sources and owners inspected

The complete [AGENTS.md](../../../../AGENTS.md), [startup router](../../../op/agent-startup-orientation.generated.md), [review skill](../../../../.agents/skills/architrino-review/SKILL.md), [skill owner](../../../op/skills/skill-architrino-review.md), [Corpus Reviewer](../../../office-of-research/cto/prompts/corpus-reviewer.md), [Theory Orientation](../../../op/theory-orientation.md), repository skills policy, operator explanation standard, execution template, and geometry/dynamics role packet supplied the workflow. The explicit repair assignment supersedes the review-only default without broadening the two-file scope.

The academic style guide, mathematics style guide, mathematical terminology, terminology usage, comparative glossary, and [About Architrino](../../../../content/markdown/aaa/archie/about-architrino.md) supplied authoring and evidence rules. Where guide summaries differ in notation or claim posture, the specific source owner and narrower demonstrated scope govern. No guide was edited.

The [active board](../corpus-review-status.md), lines 1–13 at inspection, assigned Inflation Model priority 62. The [CRW-005 queue](../work-queue.md), lines 37–47, and [priorities](../priorities.md), beginning at line 40, distinguished assurance findings from physical closure. The [conversion ledger](conversion-ledger.md), line 109, recorded the earlier editorial disposition. Historical counts were not used as current measurements.

| Source | Inspected scope and role |
| --- | --- |
| [Ontology](../../../../content/markdown/aaa/foundations/ontology.md) | Lines 1–75: primitive, assembly, effective, and observer layers |
| [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) | Lines 1–110: retained histories, self-hit conditions, acceleration-first law, and independence boundaries |
| [Black Holes](../../../../content/markdown/aaa/spacetime/black-holes.md) | Opening through the collapse-response ladder: proposed recycling, source-index roles, and constitutive limits |
| [Planck-scale geometry mapping](../../../../content/markdown/aaa/philosophy-history/theory-bridges/mapping-planck-scale-to-coincident-midpoint-orthogonal-axis-geometry.md) | Lines 1–80: alignment is a conjectured mapping; prescribed geometry does not establish stability |
| [Cosmology Ontology](../../../../content/markdown/aaa/cosmology/cosmology-ontology.md#prediction-narrowness-and-initial-basin-burden) | Lines 446–520: observed-packet inclusion, predictive region measure, and initial-basin fraction |
| [Expansion Mechanism](../../../../content/markdown/aaa/cosmology/expansion-mechanism.md) | Signed-redshift definition around lines 123–130 and finite-window energy balance at 247–265: logarithmic frequency and boundary-flux conventions |
| [CMB](../../../../content/markdown/aaa/cosmology/CMB.md) | Lines 60–96, 620–650, and 714–764: cross-map localized-feature controls, tensor split, smoothness, and shared residuals |
| [Equation generator](../../../../scripts/build-equation-mapping-corpus.mjs) | Display parser, check/write branching, and generated registry owner; check mode is non-writing |
| [Content validator](../../../../scripts/validate-content.mjs) | CLI mode, repository audit scope, and fenced-code exclusion in link extraction |

The chapter's path appeared in the textbook TOC and scene graph by scoped `rg`. The same search found its generated equation registry entries and conversion provenance. A first search included nonexistent `content/data`; that failed scope was discarded and searches were repeated against the actual registry, scripts, tests, and graph paths. This is a binder inventory for preservation, not a claim of exhaustive consumer absence.

Daniel Baumann, *TASI Lectures on Inflation*, arXiv:0907.5424v2, is the external comparison reference. Its [PDF](https://arxiv.org/pdf/0907.5424) was inspected for §§6.1–6.4 and 13, including equations (61)–(69), (91)–(92), and (222)–(234). It supports the single-field and reheating comparison conditions. Neither this source nor an algebraic witness is evidence for an Architrino release branch. No current cosmological parameter estimate or dataset fit was performed.

## Findings and repairs

### IM-01 — High: recurrence and terminal geometry were promoted beyond their premises

Baseline lines 13–23 inferred continuous population activity from long-lived recycling, while lines 285–291 called terminal alignment the last stable lock. Recurrence can have gaps: a persistent source may release during isolated intervals and remain inactive between them. An aligned prescribed geometry likewise supplies no acceleration balance or persistence proof. Repaired lines 15–25, 37, 293–297, and 324–332 preserve the hypothesis while naming rate, duration, replenishment, balance, and same-history persistence requirements.

Claim grade: derived for the logical counterexamples; inferred for the wording defect; guessed for the proposed physical mechanism. Falsifier: a retained source-population derivation establishing uninterrupted activity and a balanced, persistent terminal branch over the stated domain. A prescribed alignment path alone does not meet that requirement.

### IM-02 — High: the speed boundary did not define self-hit occupancy

Baseline lines 29–41 used self-hit occupancy near an unspecified speed threshold without the causal-root criterion. A uniformly moving architrino with constant speed greater than $c_f$ has no positive-delay self-hit: its self-separation is speed times delay and cannot equal $c_f$ times that positive delay. Repaired lines 5, 35, and 45 define the entities, constituent speed, history window, and same-transmitter root requirement; the Master Equation remains acceleration-first. Energy or expansion readouts require a further assembly/medium map.

Claim grade: derived for the constant-speed counterexample; inferred for the missing condition. Falsifier: a positive-delay same-transmitter solution on the stated uniform straight path with unequal speeds. A curved, changing-speed path is a different case and must be tested through its own history.

### IM-03 — Medium: reheating was described as a change in gravitational coupling

Baseline line 45 suggested that inflationary energy can stop dominating only through a separate coupling rule. Conversion among energy accounts can change dominance without removing their coupling. Repaired lines 49–51 distinguish conversion from the residual-vacuum problem and identify the standard comparison source. The chapter retains its own proposed transfer mechanism without deriving it from this criticism.

Claim grade: inferred from the inspected comparison equations and their transfer interpretation. Falsifier: a specified model in which the stated transition actually requires gravitational decoupling; that would support a criticism of that model, not the original generic statement.

### IM-04 — High: density changes concealed the source sign and volume convention

Baseline lines 47–61 equated exposed-density change to three destination changes without defining the sign or control volume. For supply ten and destination gains three, four, and three, the signed source change is minus ten. A fixed total energy ten in a region whose volume doubles has density five rather than ten even with no transfer. Repaired lines 51–65 keep the equation by explicitly defining its left side as supplied energy per reference volume, the right side as disjoint signed gains, and the open/moving-region extension through integrated energies and boundary accounts.

Claim grade: derived for these arithmetic and volume identities; inferred for the missing accounting convention. Falsifier: a complete original convention demonstrating the same signs, region, and included exchanges, or a nonzero residual after every account in the repaired closed-region identity is correctly included. Physical energy conservation remains an independent obligation.

### IM-05 — Medium: comparison residuals had no common scale or significance contract

Baseline lines 63–79 and 218–229 added unnamed distances and treated a positive localized feature as observational pressure without stating significance controls. Rescaling an unnormalized energy difference from one energy unit to another changes its weight relative to a dimensionless spacing discrepancy. A positive feature selected from many templates can occur under the null. Repaired lines 83 and 235 specify dimensionless, nonnegative, predeclared distances; model-conditioned reconstructions; and CMB mask, foreground, correlation, and template-search controls. The distances remain schematic until supplied by a comparison protocol.

Claim grade: derived for the unit-dependence argument; inferred for the incomplete residual interpretation. Falsifier: a fixed normalization and null protocol already specifying these quantities, or an independently calibrated result invariant under permissible unit changes. No significance value was calculated here.

### IM-06 — High: a tensor upper bound was presented as a target value

Baseline lines 85–99 directed the full scalar/tensor tuple toward an observed tuple ending in $r_{\max}$. A candidate $r=0.01$ satisfies an illustrative upper bound $0.1$ without approaching it. Repaired lines 90–105 retain only scalar entries in the matching tuple, preserve the separate tensor inequality, and define the common pivot, confidence, and nonnegative-power conditions. These example values are arithmetic witnesses, not observational bounds. Gaussianity is also explicitly distinguished from a two-point spectrum.

Claim grade: derived for the inequality/equality distinction and nonnegative ratio; inferred for the comparison ambiguity. Falsifier: an actual tensor detection with a two-sided measured interval replacing the upper-limit contract. Such a new data contract would require a different comparison, not saturation of an upper bound.

### IM-07 — High: narrowness alone allowed empty or arbitrarily retuned prediction regions

Baseline lines 107–126 required a narrow allowed-output set without restating observed-packet inclusion or the adjustable-model domain. On a comparison interval from zero to one, a region within $0.1$ of two is empty and hence has zero measure. Conversely, narrow regions centered on every freely adjustable point can have a union covering the entire interval. Repaired line 130 requires nonemptiness, observed-packet membership, fixed measure, and assessment over all declared adjustable choices. It names the residuals from their live CMB definitions and the finite-measure condition needed by the initial-basin logarithm.

Claim grade: derived for the empty-set and union counterexamples; inferred for the local omission relative to Cosmology Ontology. Falsifier: a predeclared family and measure in which the observed packet is included and the full allowed union demonstrably excludes nearby alternatives. No physical initial-state probability is assigned by this repair.

### IM-08 — Medium: the additive redshift budget lacked its logarithmic convention

Baseline lines 130–142 did not locally define the signed quantity being added. Two successive factors $1.1$ and $1.2$ give a combined factor $1.32$, so the corresponding raw redshifts add to $0.30$ while the actual combined redshift is $0.32$. Their logarithms add exactly. Repaired lines 134–146 define the reference frequency and sign, separate the factors, and require spectral redistribution when one frequency multiplier is inadequate.

Claim grade: derived for logarithmic composition and the sign of a photon frequency gain; inferred for the missing local definition. Falsifier: the stated frequency factors violate the logarithm identity, or the proposed channel fails to admit a scalar frequency map. The latter invalidates the scalar reduction and requires the specified spectral treatment.

### IM-09 — High: accelerated expansion and slow roll had different domains

Baseline lines 142–163 supplied an inequality and divided by the first slow-roll coordinate without defining the positive expansion chart or excluding its zero. With $H=d\ln a/dt_{\mathrm{eff}}$, the chain rule gives $dH/dt_{\mathrm{eff}}=-\varepsilon H^2$ and $a^{-1}d^2a/dt_{\mathrm{eff}}^2=H^2(1-\varepsilon)$. This is kinematics. For the normalized comparison $a=t_{\mathrm{eff}}^2$ on positive time, $\varepsilon=1/2$ and acceleration is positive, but the parameter is not small. At constant positive $H$, $\varepsilon=0$ makes the displayed $\eta$ expression undefined. Repaired lines 134 and 157–169 state the chart, derivation, slow-roll distinction, and singular limit.

Claim grade: derived. Falsifier: a differentiable positive expanding chart satisfying the definitions but violating the chain-rule identity, or a declared limiting construction that assigns the singular coordinate consistently. The latter is extra structure, not automatic evaluation of the original quotient.

### IM-10 — High: a potential surrogate had no canonical normalization

Baseline lines 165–180 treated a generic occupancy surrogate as sufficient for potential slow-roll parameters. Let a positive comparison potential have logarithmic slope $0.2$ in reduced-Planck units. Its parameter is $0.2^2/2=0.02$. Relabeling the coordinate by twice its value gives slope $0.1$ and parameter $0.005$ under the same unadjusted formula. Repaired lines 171–186 define the canonical field, positive potential, reduced Planck mass, derivative convention, and kinetic-normalization burden. The chain-rule example concerns comparison coordinates, not a substrate field.

Claim grade: derived for the reparameterization witness; inferred for the missing normalization. Falsifier: an explicit kinetic and clock map making the proposed variable canonical and preserving physical predictions under a coordinate change. A fitted potential value alone is insufficient.

### IM-11 — High: leading-order spectral formulas were treated as general release outputs

Baseline lines 182–216 asserted amplitude equalities from the release record without the perturbation assumptions or approximation order. Repaired lines 188–222 label the comparison assumptions, observer units, polarization normalization, and leading-order amplitudes. The two equality signs become approximation signs. The repair also requires a release duration, common transport into the CMB, and a fixed bispectrum shape before comparison. Equal two-point information does not establish Gaussianity: symmetric unit-valued outcomes have variance one and fourth moment one, whereas a unit-variance Gaussian has fourth moment three.

The local spectral consistency calculation uses the displayed definitions rather than a second numerical implementation: $d\ln k/dN=1-\varepsilon$ and $d\ln\varepsilon/dN=2(\varepsilon-\eta)$ imply the stated derivative of the leading-order amplitude. This does not make the retained denominator a controlled second-order spectrum prediction. The imported comparison equations remain conditional on their source assumptions.

Claim grade: derived for the differentiation and moment counterexample; inferred for the unsupported applicability; guessed for the physical release-to-spectrum proposal. Falsifier: a derived perturbation normalization and transfer law establishing the quoted formulas on the candidate's domain, or a counterexample to the elementary derivative identities. No CMB fit or branch spectrum was computed.

### IM-12 — Medium: small pre-BBN perturbations did not ensure a good combined fit

Baseline lines 251–266 compared changes with tolerances but left the baseline fit and unavailable frequency bounds implicit. A baseline prediction ten units away from an observation remains wrong when a new sector contributes zero, even though its incremental residual is zero. Repaired line 272 names the baseline, bins, covariances, positive tolerances and frequency domain, the need to test the combined prediction, and the unevaluated status of missing data. Surviving sectors must continue through the common history.

Claim grade: derived for the zero-change counterexample; inferred for the incomplete gate. Falsifier: a baseline and combined prediction shown to fit on the declared domain, with every required term supplied. Passing this finite comparison does not establish physical existence or constrain all untested observables.

### IM-13 — Medium: compact-object weights and release units were unspecified

Baseline lines 268–283 named a mass function, fraction, and release spectrum without a measure, epoch, or spectral unit. One object of mass one and one of mass two have equal number fractions but mass fractions one-third and two-thirds. Repaired line 289 chooses an explicit local mass-fraction measure per logarithmic mass, a reference epoch, and an energy-release convention per object; number weighting and broad formation histories require conversion or additional distributions. These are declared interface conventions, not newly measured properties or modifications to another chapter's definition.

Claim grade: derived for the number/mass weighting distinction; inferred for the ambiguity; guessed for any physical compact branch using this projection. Falsifier: an already supplied measure and unit convention that removes the ambiguity, or a normalization calculation violating the declared integral. Physical production, population abundance, and release remain open.

### IM-14 — Medium: the effective expansion ansatz could encode an arbitrary history

Baseline lines 295–303 did not state reference normalization or the assumptions behind the radiation and matter powers. Setting $a=1$ shows that $H_0=H(1)$ requires the three density entries to sum to one. More generally any chosen positive $H(a)$ defines $\Omega_{\mathrm{eff}}(a)=H^2(a)/H_0^2-\Omega_r a^{-4}-\Omega_m a^{-3}$, so the equation alone cannot predict the history. Repaired lines 301–309 state the normalization, homogeneous separately conserved comparison components, effective curvature handling, and the requirement to derive the remaining function from one history.

Claim grade: derived for the normalization and subtraction identity; inferred for the hidden comparison conditions. Falsifier: a separately derived medium response that restricts the function before comparison. The fixed Euclidean void does not itself establish effective spatial flatness.

### IM-15 — High: the separation-rate toy mixed clocks and did not establish inflation

Baseline lines 305–312 used bare time, added indexed rates to primitive wake speed, and described a rapid separation profile without its acceleration criterion. Repaired lines 311–318 use absolute time explicitly and declare signed separation contributions. In normalized wake-speed units, $c_f=1$, choose $v_1(T)=4e^{-T}$ and $v_3=0$: at $T=0$, $dR/dT=5$ but $d^2R/dT^2=-4$. With effective clock $t_{\mathrm{eff}}=2T$, the corresponding derivatives are $2.5$ and $-1$, before any separate ruler map. For a variable clock factor $q=dt_{\mathrm{eff}}/dT>0$, the exact second derivative is $q^{-2}d^2R/dT^2-q^{-3}(dq/dT)(dR/dT)$. Thus clock calibration can matter to an acceleration claim.

Claim grade: derived for the differentiation and counterexample; guessed for the toy's physical channel assignments. Falsifier: a derived ruler/clock map and separation history satisfying the effective accelerated-expansion criterion and the required perturbation comparisons. Primitive wake propagation alone supplies no baseline assembly-separation rate.

## Preservation and validation

The complete source was read before editing and the complete repaired chapter reread with line numbers. The source owner check corrected a draft gloss of the tensor-split residual before delivery: CMB defines it through tensor-source contributions and B-mode comparisons, not temperature determinations. That self-review correction is not a new baseline finding.

Known-case-first validation used an in-memory Node script with the repository's `parseCorpusDisplayEquations`, installed KaTeX, built-in assertions, and a bounded Markdown scanner. Before examining the chapter, it accepted one inline expression and one display, ignored invalid examples in fenced/inline code, rejected an undefined KaTeX command and an unclosed delimiter, recognized one existing link and a deliberately missing path, and verified that order changes are detected. The control pass was printed before target output. The scanner handles the dollar-delimited mathematics and ordinary inline Markdown links present in these two files; it is not a general Markdown grammar or a theorem prover.

The baseline comparison asserts the retained object's SHA-256 before comparing. It preserves all 17 displayed-equation identities, all 15 original headings, and all 27 original Markdown links. Fourteen displayed formulas remain byte-identical. Exactly three displayed blocks changed:

| Equation identity | Baseline lines | Repaired lines | Authorized change |
| --- | --- | --- | --- |
| `corpus-equation-0cfaf304adff478e` | 86–90 | 90–94 | Remove the tensor upper-bound entry from the equality-like scalar target tuple; preserve the separate tensor inequality |
| `corpus-equation-257753b409ec6a38` | 183–197 | 189–203 | Mark both spectral amplitudes as leading-order approximations |
| `corpus-equation-6d4488b0633aa4b1` | 306–308 | 312–314 | Replace ambiguous time and dot notation with the explicit absolute-time separation derivative |

The control-first arithmetic script used Node assertions with absolute tolerance `1e-12`, first accepting two plus three equals five and rejecting six. It then passed twelve witness groups with $c_f=1$: source balance and volume dilution, one-sided bounds, empty/union prediction regions, logarithmic redshift and blueward gain, acceleration and the zero-parameter singularity, field-coordinate scaling, spectral differentiation, fourth-moment distinction, bad-baseline survival, number/mass weights, reference normalization, and separation/clock conversion. These tests check the numerical instances of the explicit arguments above; they do not sample the EOM solver or infer physical conservation.

Initial post-edit strict validation passed before receipt creation: `node scripts/validate-content.mjs --check --strict` reported 199 corpus Markdown files, 1701 repository Markdown files audited, zero errors, zero warnings, and 30 notes. The first post-receipt run audited 1702 repository Markdown files; the subsequent completed-receipt run audited 1705. Both retained 199 corpus Markdown files, zero errors, zero warnings, and 30 notes. These are snapshots of content validation in the shared checkout, not physical acceptance or attribution of other workers' files.

| Validation command or instrument | Result and boundary |
| --- | --- |
| Complete `nl -ba` chapter reread and complete receipt reread | All 336 chapter lines and the receipt's findings, references, checks, and limitations reviewed; no independent second reviewer is claimed |
| Two-file Node check reproduced below | Control pass precedes target results; KaTeX accepts 137 chapter and 41 receipt expressions; 29 chapter and 21 receipt local path references resolve; all 17 equation identities, 15 original headings, and 27 original links retained |
| Control-first arithmetic check reproduced below | Twelve witness groups pass; absolute tolerance `1e-12`, numerical wake speed `c_f=1`; elementary witnesses only |
| `git --no-optional-locks diff --check HEAD -- content/markdown/aaa/cosmology/inflation-model.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-inflation-model-review-2026-09-12.md` | No diagnostics for the tracked diff; the new untracked receipt is checked separately |
| `rg -n '[[:blank:]]+$' content/markdown/aaa/cosmology/inflation-model.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-inflation-model-review-2026-09-12.md` | No matches, exit 1 as expected for no matches; both paths also pass the Node whitespace assertion |
| `node scripts/validate-content.mjs --check --strict` | Exit 0 after receipt creation; zero errors, zero warnings, 30 informational notes |
| `shasum -a 256 content/markdown/aaa/cosmology/inflation-model.md` | Matches the final chapter hash above and the Node digest |

The bounded link scanner checks destination-file existence, not general anchor resolution or remote availability. The retained Cosmology Ontology fragment was checked against its live heading; the equation viewer identifiers are checked for exact preservation, not regenerated registry freshness. No screenshot-based visual check, EOM solver run, physical simulation, or Python run was performed.

### Reproduce the scoped checks

Run each fenced command from the repository root. Both print control results first and write no files. The first reads the two authorized files and the retained Git object; it requires the repository's installed KaTeX and equation parser. The second evaluates only the stated arithmetic witnesses.

```bash
node --input-type=module <<'NODE'
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import katex from 'katex';
import {parseCorpusDisplayEquations} from './scripts/build-equation-mapping-corpus.mjs';
function clean(s) {
  let fence=null;
  return s.split('\n').map(line=>{
    const m=line.match(/^\s*(\x60{3,}|~{3,})/);
    if(m){ if(!fence) fence=m[1][0]; else if(fence===m[1][0]) fence=null; return ''; }
    return fence?'':line.replace(/(\x60+)[\s\S]*?\1/g,'');
  }).join('\n');
}
function math(s){
  s=clean(s); const out=[]; let i=0;
  const escaped=j=>{let n=0;while(j>0&&s[--j]==='\\')n++;return n%2===1;};
  while(i<s.length){
    if(s[i]!=='$'||escaped(i)){i++;continue;}
    const d=s[i+1]==='$'?'$$':'$'; const start=i; i+=d.length;
    const from=i;
    while(i<s.length&&!(s.slice(i,i+d.length)===d&&!escaped(i)))i++;
    assert(i<s.length,'unclosed math at '+start);
    if(d==='$')assert(!s.slice(from,i).includes('\n'),'multiline inline math');
    out.push({tex:s.slice(from,i),displayMode:d.length===2});i+=d.length;
  }
  return out;
}
function links(s){return [...clean(s).matchAll(/\[[^\]\n]*\]\(([^)\s]+)\)/g)].map(m=>m[1]);}
function localLinks(file,s){return links(s).filter(x=>! /^(https?:|mailto:|#)/.test(x)).map(x=>path.resolve(path.dirname(file),decodeURIComponent(x.split('#')[0])));}
function render(s){ const xs=math(s);xs.forEach(x=>katex.renderToString(x.tex,{displayMode:x.displayMode,throwOnError:true,strict:'error'}));return xs.length;}
function headings(s){return s.split('\n').filter(x=>/^#{1,6} /.test(x));}
const control='# Control\n$x^2$ and [root](AGENTS.md)\n$$\ny=1\n$$\n\x60\x60\x60\n$\\notACommand$\n[ignore](absent.md)\n\x60\x60\x60\n\x60$\\notACommand$ [ignore](absent.md)\x60';
assert.equal(render(control),2);assert.equal(links(control).length,1);
assert(localLinks('control.md',control).every(fs.existsSync));
assert.throws(()=>render('$\\notACommand$'));assert.throws(()=>math('$x'));
assert(!localLinks('control.md','[bad](__crw005_known_missing_9b872__.md)').every(fs.existsSync));
const pc=parseCorpusDisplayEquations('control.md',control);
assert.equal(pc.length,1);assert.equal(pc[0].tex,'y=1');
assert.notDeepEqual(['a','b'],['b','a']);
console.log('CONTROL PASS: good/bad math, code exclusion, existing/missing paths, display extraction, order comparison');
const file='content/markdown/aaa/cosmology/inflation-model.md';
const base=execFileSync('git',['show','72847589ba73d0bf81d07ca5b27d98072659cee9:'+file],{encoding:'utf8'});
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
assert.equal(hash(base),'f51f88d7fd739cc4c8359b5bb01a039bdd5adef0a5bc4fc64591063a455cc0af');
for(const f of [file,'reference/priorities/aaa-corpus-rewrite/evidence/crw-005-inflation-model-review-2026-09-12.md']){
  assert(fs.existsSync(f),'required file absent: '+f);
  const s=fs.readFileSync(f,'utf8');const ls=localLinks(f,s);
  assert(ls.every(fs.existsSync),'missing local path '+ls.filter(x=>!fs.existsSync(x)));
  assert(!/[ \t]+$/m.test(s),'trailing whitespace');
  console.log(JSON.stringify({file:f,math:render(s),localLinks:ls.length,hash:hash(s)}));
}
const live=fs.readFileSync(file,'utf8');
const eqs=s=>parseCorpusDisplayEquations(file,s);
const ids=s=>links(s).filter(x=>x.includes('#corpus-equation-'));
assert.deepEqual(ids(live),ids(base));
assert(headings(base).every(x=>headings(live).includes(x)));
assert(links(base).every(x=>links(live).includes(x)));
const old=eqs(base),now=eqs(live);
assert.equal(old.length,now.length);
const changed=old.flatMap((x,i)=>x.tex===now[i].tex?[]:[{index:i+1,baselineLine:x.startLine,finalLine:now[i].startLine,id:ids(base)[i]}]);
assert.deepEqual(changed.map(x=>x.index),[3,10,17]);
console.log(JSON.stringify({preservation:{displayCount:old.length,ids:ids(live).length,headings:headings(base).length,links:links(base).length,changed}}));

NODE
```

```bash
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
const near=(a,b)=>assert(Math.abs(a-b)<1e-12);
near(2+3,5);assert.throws(()=>near(2+3,6));
console.log('CONTROL PASS: exact known sum and rejected wrong sum; tolerance 1e-12');
const c_f=1;assert.equal(c_f,1);
let groups=0;
near(-10+3+4+3,0);near(10/2,5);groups++;
assert(0.01<0.1&&0.01!==0.1);groups++;
const grid=[0,0.25,0.5,0.75,1];assert.equal(grid.filter(o=>Math.abs(o-2)<=0.1).length,0);
assert(grid.every(o=>Math.abs(o-o)<=0.1));groups++;
near(Math.log(1.1*1.2),Math.log(1.1)+Math.log(1.2));near(1.1*1.2-1,0.32);assert(Math.log(1/1.1)<0);groups++;
const p=2,t=1,H=p/t,eps=1/p;near(H*H*(1-eps),p*(p-1)/(t*t));assert(Number.isNaN(0-0/(2*0)));groups++;
const slope=0.2,b=2;near(slope*slope/2,0.02);near((slope/b)**2/2,0.005);groups++;
const e=0.01,eta=e;near((2*eta-4*e)/(1-e),-2/99);groups++;
const bernoulliFourth=((-1)**4+1**4)/2;near(bernoulliFourth,1);assert.notEqual(bernoulliFourth,3);groups++;
const baseline=10,delta=0,obs=0,tol=1;assert(Math.abs(delta)/tol<=1);assert(Math.abs(baseline+delta-obs)/tol>1);groups++;
near(1/(1+2),1/3);near(2/(1+2),2/3);assert.notEqual(1/2,1/3);groups++;
near(0.1+0.3+0.6,1);assert.notEqual(0.1+0.3+0.7,1);groups++;
const v1=4,v3=0,clock=2;near(v1+c_f+v3,5);assert(-v1<0);near(5/clock,2.5);near(-v1/clock**2,-1);groups++;
console.log('PASS '+groups+' arithmetic witness groups; c_f=1; arithmetic and declared counterexamples only');

NODE
```

## Generated artifacts

The pre-edit `node scripts/build-equation-mapping-corpus.mjs --check` reported zero errors over 199 chapters and 4685 displays. The post-edit check reported the generated registry stale at `content/generated/equation-mapping/corpus-equations.json`. Its source context and three formulas changed in this assignment; concurrent source edits can also affect the shared registry. No exclusive attribution of all registry drift is made.

Deferred, not executed:

```bash
node scripts/build-equation-mapping-corpus.mjs --write
```

The authorized regeneration owner must rerun the corresponding `--check` after regeneration. No generated artifact was edited by this worker. Stable viewer identity is preserved independently of registry freshness.

## Remaining obligations and closure limits

The following remain outside local repair completion:

- IM-O1: a complete causal history supporting a balanced, persistent source assembly and any claimed Planck alignment; prescribed geometry is insufficient.
- IM-O2: a derived transfer and constitutive response with independently checked energy, boundary, recoil, and history accounts.
- IM-O3: source formation, duty cycle, replenishment, and a population-to-observer chronology that supplies correlated perturbations over the required domain.
- IM-O4: derived clock, ruler, kinetic normalization, spectra, and thermal/transport maps connecting the same history to BBN, CMB, growth, and tensor observations.
- IM-O5: fixed data products, likelihoods, measures, priors, compact-object weights, and tolerances that permit actual comparison without per-observable retuning.

These obligations are not counted as repaired findings. A local defect can be resolved by stating its missing condition accurately while the physical condition remains unproved. This receipt establishes neither physical branch existence nor EOM solver acceptance, theory closure, empirical cosmology acceptance, or downstream closure.

The next concrete step is coordinator review of the two-file diff and final hash, followed by the shared CRW-005 disposition under the coordinator's authority. This worker's write scope ends at the chapter and receipt.
