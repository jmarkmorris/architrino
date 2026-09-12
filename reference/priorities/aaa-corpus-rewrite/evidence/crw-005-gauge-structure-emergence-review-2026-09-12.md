# CRW-005 Gauge Structure Emergence Review — 2026-09-12

Status: ● Done — bounded chapter review and repair. Gauge emergence, branch persistence, and downstream corpus closure remain open.

The review corrected mathematical overclaims in loop holonomy, characteristic-number normalization, and the electroweak comparison action, then clarified the hypotheses and domains of the remaining emergence map. The chapter now separates conditional effective mathematics from the assembly dynamics that would have to recover it. Completion applies to this review assignment, not to the proposed physical mechanisms.

## Scope and reproducible baseline

The only files written by this assignment are [Gauge Structure Emergence](../../../../content/markdown/aaa/assemblies/gauge-structure-emergence.md) and this report. Shared trackers, queues, other chapters, generated artifacts, and publication were outside the write boundary. No generator write command, Git mutation, linked worktree, or EOM simulation was used.

| Item | Measured record |
| --- | --- |
| Chapter baseline SHA-256 | 68e203a503866421fe71c4a7ae1d16f1b0ef12e9e8c35574e77a41ded496e61b |
| Chapter final SHA-256 | 91f4531aa3ae3a009002399abc0e82e8ad6296ef3eeb3337d7e0575b407ee83b |
| Baseline reference | ab3ed93a59e69a5807397c24cefcfcb3a9642487 |
| Baseline chapter length | 592 lines by numbered source read |
| Final chapter length | 616 lines by numbered source read |
| Initial report state | Absent, established by test ! -e on this exact path |

Both chapter digests were measured with shasum -a 256. The baseline digest also matches git show ab3ed93a59e69a5807397c24cefcfcb3a9642487:content/markdown/aaa/assemblies/gauge-structure-emergence.md piped to shasum -a 256. Baseline line references below therefore identify those exact bytes, not a commit-message attribution. Initial scoped git --no-optional-locks status --short returned no entries for the two assigned paths. The chapter hash was checked again before edits and after the final reread; the report write checked its own preceding digest before replacement. These observations establish only the inspected paths and times.

The complete chapter was read before repair and reread after repair. The review followed the live repository startup router, corpus-review procedure, theory orientation, operator explanation standard, and applicable authoring guides. Its read-only anchors included Foundations definitions of architrino, Euclidean void, absolute time, and observer projection; the canonical Master Equation regular-root domain; Gauge Symmetries; Color Charge SU(3); Weak Mixing Angle; Particle Masses; Effective Lagrangian; and Noether Sea Pro/Anti Coupling. Their authority and scope were preserved; none was edited.

A read-only specialist, crw-005 gauge geometry check (/root/crw_005_gauge_geometry_check, Elie Cartan lens), independently examined connections, holonomy, and characteristic numbers. The specialist's annulus and finite-window counterexamples are recorded below. The evidence is the displayed mathematics and its stated domain; agent agreement alone is not an independent reference.

## Findings and smallest repairs

Severity describes the consequence of the baseline statement, not the importance of solving the associated research program. High means that a displayed criterion rejects admissible comparison data or fails its claimed covariance. Medium means a missing domain, unsupported inference, or convention can change the interpretation or numerical conclusion. Low means explanatory incompleteness.

| ID | Severity | Exact baseline lines | Final chapter lines | Finding and smallest supported repair |
| --- | --- | --- | --- | --- |
| GSE-01 | Medium | 3–9, 31–34, 82–92, 174–230 | 3–9, 31–34, 87–89, 177–232 | The emergence map lacked local definitions and a fully specified connection-test domain. Defined substrate, assembly, effective record, fiber, connection, and holonomy; restricted potential-gradient language to electrostatics; distinguished physical branch changes from passive basis changes; specified effective coordinates, fixed coupling, unitary representation, test sections, norms, regulator units, path ordering, and chart transitions. Handedness or noncommutativity alone no longer identifies SU(2). |
| GSE-02 | High | 232–248 | 234–250 | The characteristic integral used curvature defined with an explicit coupling but omitted its squared normalization, and treated a declared window as sufficient for integrality. Restored the factor of the coupling squared and specified an SU(N) bundle, fundamental trace, Hermitian generators, curvature two-form, closed oriented comparison manifold, and boundary/completion limitations. |
| GSE-03 | High | 380–412 | 377–415 | The loop criterion demanded trivial phase for every loop and thereby rejected nontrivial Aharonov–Bohm holonomy. Replaced it with equality of independently obtained wake and connection phases modulo a full turn. Restricted Stokes' theorem to an admissible chart and placed flux integrality on a closed two-cycle, not arbitrary open surfaces. |
| GSE-04 | High | 466–483 | 469–490 | The comparison action paired a universal weak derivative and bare fermion mass matrix with a chiral electroweak target. Made the derivative representation dependent and replaced the bare mass term with an effective Higgs kinetic term, potential, and gauge-invariant Yukawa sector. Explicitly left color and the chosen neutrino completion to their own terms. |
| GSE-05 | Medium | 466, 485–495 | 469, 492–503 | Probe momentum and internal frequency were compared without a common clock/unit map; the composite correction lacked an operator-dimension and matching contract. Stated frequency and spatial-scale separation, effective natural units, and a dimension-six/dimension-eight illustrative expansion with dimensionless coefficients. Other allowed dimensions remain possible. |
| GSE-06 | Medium | 94–114, 138–154 | 95–115, 121–147 | Charge units, hypercharge conventions, anomaly multiplicities, and recovery-residual normalization were underspecified. Distinguished dimensionful charge from dimensionless generators, hypercharge from electromagnetism, local algebra from global quotient, and fixed the coupling convention. Required the full left-Weyl representation inventory, conjugated right fields, and the singlet/doublet scope of the parity test. Labeled the proposed channel sequence a hypothesis. |
| GSE-07 | Medium | 435–466 | 438–469 | The displayed Master Equation did not state its regular-root and complete-sum domain at the point of use. Preserved both formulas and added causal root times, separation, direction, polarity sign, admitted self-hits, nonzero root denominator, convergence, and the caustic/tail handoff. The subsequent action remains a recovery target. |
| GSE-08 | Medium | 23, 296–306 | 23, 298–306 | Opposite braid labels and occupied medium were allowed to carry unsupported cancellation, stable-sea, and nonzero Higgs-VEV inferences. Made pairing conditional on relative axes, phases, and histories, and separated occupancy from an electroweak order parameter. Photon transport and inertial response remain distinct unproved recovery targets. |
| GSE-09 | Medium | 310–315 | 310–312 | The Unruh discussion treated different particle descriptions as a disagreement over detector events and presented a medium interpretation as a resolution. Corrected agreement on the same detector's response, specified the trajectory/gap/switching/rate/energy obligations, and graded the proposed sea mechanism as guessed. Removed the blanket experimental-status assertion. |
| GSE-10 | Medium | 319–376 | 316–373 | Six-slot charge algebra was mixed with an unsupported inference that arbitrary alternative clusters are unstable. Preserved the charge table and its derivation while making additive projection and six-slot selection explicit assumptions. Complete-state access does not establish stability or exclude other inventories. |
| GSE-11 | Medium | 519–554 | 527–566 | Geometric weak mixing, tree mass identities, and the mass handoff were insufficiently distinguished from established observer records. Graded the overlap equality as guessed, defined the single-doublet background and tree order, stated weak-angle scheme dependence, and aligned the scalar mass roadmap with Particle Masses without introducing primitive architrino masses or a proved two-body potential. |
| GSE-12 | Medium | 565–590 | 577–606 | The magnetic-moment and cross-section illustrations did not fix their normalization, matching assumptions, or evidential scope. Defined the anomalous moment and effective units, made the form factor an independent full-amplitude ansatz, corrected the dimensionless remainder, supplied checked numerical examples, and identified the tolerance as illustrative. A fitted free coefficient cannot determine a radius; failure of a chosen averaging reduction does not refute every possible reduction. |
| GSE-13 | Medium | 250–262 | 252–264 | The strong-angle magnitude lacked a principal representative, mass-phase contribution, and the inference from neutron-EDM evidence. Added these conventions and retained hadronic uncertainty, with the order-of-magnitude bound attributed to the PDG comparison. |

### Claim grades and operator-checkable falsifiers

| Findings | Grade after repair | Observation that would overturn the bounded conclusion |
| --- | --- | --- |
| GSE-01 | Derived conditionally: the connection transformation follows from covariance for a fixed coupling and representation. Inferred: the extra definitions are needed to make the proposed test executable. Guessed: the assembly carrier of a particular gauge group. | An expansion of the stated derivative produces a different transformation sign, or a proposed branch map changes physical histories under what it calls passive relabeling. Check the covariance equations and branch definitions at final lines 177–214. |
| GSE-02 | Derived conditional normalization and counterexample; no measured topological sector. | A computation using the declared trace and normalized connection contradicts the displayed factor, or an integer claim is asserted on an uncompleted finite window. Check final lines 234–250 and the finite-window construction below. |
| GSE-03 | Derived counterexample and conditional phase compatibility; the wake-to-phase map is open. | A valid nontrivial holonomy is again rejected solely because its phase is nonzero modulo a full turn, or both sides of the repaired comparison come from the same fitted potential. Check final lines 377–415. |
| GSE-04–05 | Derived effective covariance and dimensional checks under the stated field content and units; substrate matching remains guessed/open. | A stated Yukawa term has nonzero total hypercharge, a right-handed singlet carries the doublet generator, or a displayed density term has dimension other than four. Check final lines 469–503 and the algebra below. |
| GSE-06 | Derived convention conversions; anomaly cancellation remains an effective recovery target until representations are supplied. | A proposed representation table fails a listed anomaly sum when multiplicities and conjugations are included, or a residual adds dimensionful and dimensionless terms without normalization. Check final lines 109–147. |
| GSE-07 | Inferred scope correction from the canonical Master Equation; no new dynamical result. | The local text licenses zero separation, a zero root denominator, an unhandled tail, or omits admitted causal/self roots while claiming a complete sum. Compare final line 467 with the canonical Master Equation section. |
| GSE-08–10 | Derived distinction between occupancy and an order parameter; derived six-slot sums conditional on the inventory. Guessed: sea pairing, detector mechanism, and stability selection. | Opposite labels alone determine a unique canceling history; positive occupancy mathematically forces a nonzero signed/order parameter; or a six-slot sign assignment violates the stated sum. Physical recovery instead fails if admitted branches do not obey the assumed charge projection, or detector rates mismatch the declared comparison. |
| GSE-11 | Guessed overlap functional and mass extraction; derived tree identities in the single-doublet comparison. | Independent branch extraction gives a weak-overlap sum outside zero to one or mismatches the fixed weak-angle convention, or the same mass normalization cannot recover the stated weak homogeneous regime. Precision comparisons must include their radiative map. |
| GSE-12 | Derived values of a stipulated polynomial, not measured deviations. Guessed matching coefficients and common amplitude/radius assumptions. | Direct substitution into the stated polynomial changes the recorded examples, or a fixed and independently matched ansatz violates a specified channel benchmark. An adjustable coefficient alone supplies no radius inference. |
| GSE-13 | Inferred observer bound from neutron-EDM limits and hadronic input; no measured strong angle or derived substrate suppression. | The stated PDG inference, principal-angle convention, or hadronic uncertainty is contradicted by the cited review, or branch extraction yields a larger principal angle under the same comparison assumptions. |

## Independent mathematical checks

### Nontrivial holonomy is admissible

On an annulus let the effective electromagnetic connection be $A=(\Phi/2\pi)d\phi$. Then $F=dA=0$ on that annulus, while a loop around its hole has $\oint A=\Phi$. This is a smooth annular connection with no spanning disk in its domain. For the smallest charge in the chapter's six-slot set, $Q_0=|e|/3$, choose $\Phi=\pi\hbar/Q_0$. Its holonomy is $\exp(iQ_0\Phi/\hbar)=-1$.

The baseline residual, which compared every physical phase to an integer multiple of $2\pi$, returns a maximum residual of $\pi$ over $Q=mQ_0$ for $m=-3,\ldots,3$. It therefore rejects this admissible effective connection. This is a derived comparison-layer counterexample, not an asserted substrate solution. The known zero-flux case gives identity holonomy; changing the flux continuously supplies the nontrivial case. The repaired residual compares independent phase records and can vanish when both correctly give $\pi$.

For two spanning surfaces with the same boundary, their difference is a closed two-cycle. Equality of the resulting phase factors requires $Q\int_C F/(2\pi\hbar)\in\mathbb Z$. No corresponding integrality condition follows for a single arbitrary open surface. Chart transition data supply the correct description when a potential is not globally defined.

### Curvature normalization and finite windows

With $D=d-igA$ and $F=(i/g)[D,D]$, set $B=gA$. Its Hermitian-convention curvature is $H=dB-iB\wedge B=gF$ at fixed coupling. The normalized characteristic integral is therefore $(8\pi^2)^{-1}\int\operatorname{tr}(H\wedge H)=g^2(8\pi^2)^{-1}\int\operatorname{tr}(F\wedge F)$. This derivation fixes the missing factor independently of a numerical fixture.

To test the finite-window assertion, take the oriented unit four-cube and $t=\operatorname{diag}(1,-1)/2$, so $\operatorname{tr}(t^2)=1/2$. Let $B=t(a y_1\,dy_2+b y_3\,dy_4)$. The components commute, so $H=t(a\,dy_1\wedge dy_2+b\,dy_3\wedge dy_4)$ and $\int\operatorname{tr}(H\wedge H)=ab$. The normalized integral is $ab/(8\pi^2)$, a continuously variable real number. The known case $a=0$ gives zero; $a=b=1$ gives a noninteger. No closed-manifold integrality theorem is contradicted: the cube has a boundary. This construction is an effective gauge counterexample, not an EOM branch or empirical apparatus measurement.

### Chiral covariance and dimensions

Using the repaired convention, the left lepton doublet has $Y_L=-1$ and the right charged-lepton singlet has $Y_{e_R}=-2$. A bare bilinear $\bar L e_R$ has total hypercharge $+1-2=-1$ and retains a weak-doublet index. Multiplication by an effective Higgs doublet with $Y_H=+1$ permits the singlet contraction $\bar L H e_R$, with total hypercharge $+1+1-2=0$. The left and right kinetic terms likewise require different weak generators. This is a derived consistency check within the comparison theory, not an import into the architrino equation.

In four effective spacetime dimensions, $[\psi]=3/2$, $[H]=1$, $[F]=2$, and $[R]=-1$ in mass units. Thus $R^2\mathcal O^{(6)}$ and $R^4\mathcal O^{(8)}$ each have density dimension four. This licenses the displayed dimensional organization only; it supplies neither a preferred operator list nor matching coefficients nor the omission of other dimensions.

### Conditional charge algebra and numerical illustration

For six signs with $n_+$ positive entries, the additive bookkeeping gives $Q/\epsilon=2n_+-6$. Enumeration for $n_+=0,\ldots,6$ yields $-6,-4,-2,0,2,4,6$, or charges in steps of $|e|/3$ using $|e|=6\epsilon$. This algebra does not select six sites, prove a persistent assembly, assign a fermion representation, or cancel an anomaly.

For the stipulated amplitude factor let $z=sR^2$ in the declared effective natural units. Direct expansion gives $(1-z/4)^2-1=-z/2+z^2/16$. With $c_f=1$ and the independent observer-unit conversion $\hbar_{\mathrm{eff}}c_{\mathrm{eff}}=1.973269804\times10^{-16}\,\mathrm{GeV\,m}$, the numerical evaluation used $z=(ER/(\hbar_{\mathrm{eff}}c_{\mathrm{eff}}))^2$.

| Radius | Probe energy | Derived fractional cross-section shift within the ansatz |
| --- | --- | --- |
| $10^{-19}\,\mathrm m$ | $10.58\,\mathrm{GeV}$ | $-1.4373642498\times10^{-5}$ |
| $10^{-19}\,\mathrm m$ | $91.19\,\mathrm{GeV}$ | $-1.0675188309\times10^{-3}$ |
| $3\times10^{-20}\,\mathrm m$ | $10.58\,\mathrm{GeV}$ | $-1.2936320550\times10^{-6}$ |
| $3\times10^{-20}\,\mathrm m$ | $91.19\,\mathrm{GeV}$ | $-9.6100040482\times10^{-5}$ |

These values are algebraic evaluations of an assumed polynomial. Their instrument was a Node arithmetic evaluation checked against the independently expanded polynomial; they are not observations, a derived radius, or an EOM measurement.

## Known-case controls and validation

Every constructed checking instrument was exercised on a known case before its target run. The relevant order and limitations are retained here.

1. The Node SHA-256 function returned the standard digest ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad for the string abc before it guarded chapter replacement. The initial exact-replacement helper passed unique/missing/duplicate ASCII controls. Those controls were incomplete: they did not cover JavaScript replacement-string dollar syntax.
2. The full chapter reread detected three standalone display delimiters shortened by that helper. Before correction, a callback replacement helper was tested on literal double-dollar delimiters, backslashes, dollar-ampersand and dollar-backtick replacement metacharacters, and duplicate-source rejection. These known cases passed before the three exact delimiter repairs. They were review-introduced defects, not baseline findings. An earlier unmatched patch attempt left the baseline hash unchanged.
3. The charge enumeration passed the known two-slot inventory $-2,0,2$ before the six-slot target. The polynomial evaluation passed the known cases $z=0$ giving zero and $z=0.2$ giving $-0.0975$ before the radius/energy examples.
4. The constructed math extractor used the repository display-equation parser, masked its display spans, excluded fenced and inline code, and extracted remaining inline dollar math. A known fixture containing exactly one valid display and one valid inline expression returned those counts while excluding deliberately invalid math in code. Strict KaTeX accepted the valid fixture and rejected an unknown command; the extractor rejected a known unmatched delimiter. All controls passed before it read the chapter.
5. The target math run used the vendored KaTeX bundle with throwOnError enabled and strict set to error. It parsed and rendered to markup 37 display and 214 inline expressions, 251 total, without error. It also compared the ordered existing display-equation semantic IDs against the verified baseline and found all 37 preserved. This is syntax and mapping preservation evidence, not a visual-layout inspection or proof of mathematics.

| Instrument and scope | Result | What the result establishes |
| --- | --- | --- |
| Complete source reread of this chapter, including the corrected final sections | Passed bounded editorial/mathematical review | Local reasoning and scope reviewed against the listed anchors; unresolved physics remains explicitly open. |
| Node known-case arithmetic checks, then six-slot and form-factor evaluations | Passed | Conditional combinatorics and the displayed illustrative numbers only. |
| Repository display parser plus controlled inline extractor and strict vendored KaTeX on this chapter | Passed: 37 display + 214 inline expressions | Syntax accepted by this KaTeX version; all 37 existing display IDs retained in order. |
| node scripts/validate-content.mjs --check --strict | Passed with zero errors and zero warnings | Repository content-validator contract at the checked state; this validator alone did not detect the temporary dollar-delimiter defect. |
| git --no-optional-locks diff --check -- content/markdown/aaa/assemblies/gauge-structure-emergence.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-gauge-structure-emergence-review-2026-09-12.md | Passed | Whitespace checks on tracked scoped diffs. The new report was separately reread; an untracked file is not covered by git diff. |
| node scripts/build-equation-mapping-corpus.mjs --check | Drift reported, exit 1 | The final global run scanned 199 files and 4685 display equations; its sole reported error was a stale generated corpus-equations registry. This is not an all-green repository result. |
| shasum -a 256 on the chapter, and scoped status/diff inspection | Final chapter digest matches the table | Exact target bytes and scoped edits at verification time; no assertion about unrelated concurrent work. |

Earlier equation-mapping checks reported missing equation links as well as stale registry content. The final run reported only the stale registry. No causal attribution for those transient global diagnostics is made. The chapter-specific parser/ID comparison is the bounded preservation evidence for this assignment.

The unresolved generated path is content/generated/equation-mapping/corpus-equations.json. The exact deferred regeneration command is:

~~~sh
node scripts/build-equation-mapping-corpus.mjs --write
~~~

That command was not run because this assignment authorizes check-only validation and only two authored paths. A later authorized regeneration must rerun the corresponding check. Stale fingerprinted content is an expected consequence of editing source equations; this review does not certify generated assets as current.

### Reproduce the chapter math check

Run the following from the repository root. It first runs the known-case controls, then requires the exact final chapter and baseline digests before checking the 251 expressions and 37 ordered IDs. The byte assertions deliberately fail after later edits; such a failure requests a new review rather than validating a different chapter under this receipt.

~~~sh
node --input-type=module <<'NODE'

import assert from 'node:assert/strict';
import {parseCorpusDisplayEquations} from './scripts/build-equation-mapping-corpus.mjs';
import {loadVendoredCommonJsBundle} from './scripts/load-vendored-commonjs-bundle.mjs';
const katex=loadVendoredCommonJsBundle('apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js');
function extract(source) {
 const display=parseCorpusDisplayEquations('control.md',source), chars=source.split('');
 for(const b of display)for(let i=b.openStart;i<b.closeEnd;i++)if(chars[i]!=='\n')chars[i]=' ';
 const stripped=chars.join('');let fence=null;const inline=[];
 for(const line of stripped.split('\n')){
 const f=line.match(/^\s*(\x60{3,}|~{3,})/);
 if(f){if(!fence)fence=f[1][0];else if(fence===f[1][0])fence=null;continue}
 if(fence)continue;
 const s=line.replace(/\x60+[^\x60]*\x60+/g,'');
 const matches=[...s.matchAll(/(?<!\\)\$([^$\n]+)(?<!\\)\$/g)];
 for(const m of matches)inline.push(m[1]);
 const rest=s.replace(/(?<!\\)\$([^$\n]+)(?<!\\)\$/g,'');
 if(/(?<!\\)\$/.test(rest))throw new Error('unmatched math delimiter: '+line);
 }
 return {display,inline};
}
function render(tex,displayMode=false){return katex.renderToString(tex,{displayMode,throwOnError:true,strict:'error'})}
const example='# Example\n$x+1$\n\n$$\n\\frac{1}{2}\n$$\n\n'+String.fromCharCode(96).repeat(3)+'\n$\\notACommand$\n'+String.fromCharCode(96).repeat(3)+'\n'+String.fromCharCode(96)+'$\\bad$'+String.fromCharCode(96)+'\n';
const got=extract(example);
assert.equal(got.display.length,1);assert.deepEqual(got.inline,['x+1']);
render(got.display[0].tex,true);render(got.inline[0]);assert.throws(()=>render('\\notACommand'));
assert.throws(()=>extract('$\nx\n$$'));
console.log('Known-case math controls PASS before chapter run: one display, one inline; fenced and inline-code math excluded; invalid command and lone delimiter rejected. Unicode offsets are code-unit based below.');

const {readFileSync}=await import('node:fs');
const {execFileSync}=await import('node:child_process');
const {createHash}=await import('node:crypto');
const chapter='content/markdown/aaa/assemblies/gauge-structure-emergence.md';
const source=readFileSync(chapter,'utf8');
const expected='91f4531aa3ae3a009002399abc0e82e8ad6296ef3eeb3337d7e0575b407ee83b';
assert.equal(createHash('sha256').update(source).digest('hex'),expected);
const target=extract(source);
for(const b of target.display)render(b.tex,true);
for(const tex of target.inline)render(tex);
assert.equal(target.display.length,37);
assert.equal(target.inline.length,214);
const baseline=execFileSync('git',['show','ab3ed93a59e69a5807397c24cefcfcb3a9642487:'+chapter],{encoding:'utf8'});
assert.equal(createHash('sha256').update(baseline).digest('hex'),'68e203a503866421fe71c4a7ae1d16f1b0ef12e9e8c35574e77a41ded496e61b');
const baselineDisplay=parseCorpusDisplayEquations(chapter,baseline);
for(const b of target.display)assert.ok(b.existingLink?.semanticId);
assert.deepEqual(target.display.map(b=>b.existingLink.semanticId),baselineDisplay.map(b=>b.existingLink.semanticId));
console.log('Chapter PASS: 37 display + 214 inline expressions; 37 ordered baseline IDs preserved; both digests verified.');
NODE
~~~

## Source support and claim boundaries

- [Tong, Lectures on Gauge Theory, sections 1.1.1–1.1.2](https://davidtong.org/pdfs/teaching/gauge-theory/gauge1.pdf): effective holonomy and closed-cycle compatibility. [Tong, Yang–Mills, sections 2.1.1 and 2.3](https://www.damtp.cam.ac.uk/user/tong/gaugetheory/2ym.pdf): normalization and characteristic-number boundary conditions. These support the comparison mathematics, not assembly emergence.
- [PDG 2025 Electroweak Model and Constraints on New Physics](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-standard-model.pdf), sections 10.1–10.2 and 10.4.5: chiral representations, the effective Higgs comparison, tree masses, and weak-angle scheme dependence. These are recovery targets at effective grade.
- [PDG 2025 axion review](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-axions.pdf), section 89.2.1: principal strong angle, quark-mass phases, and the order-of-magnitude strong-angle bound inferred from neutron-EDM evidence with hadronic input.
- [Crispino, Higuchi, and Matsas, The Unruh Effect and Its Applications](https://arxiv.org/abs/0710.5373), section III.1: agreement of descriptions for the same detector response. It supplies no Noether sea mechanism.
- [NIST 2022 CODATA reduced Planck constant times light speed](https://physics.nist.gov/cgi-bin/cuu/Value?hbcmevf): the observer-unit conversion used in the numerical illustration. It is not a primitive numerical choice for the wake speed.

## Remaining obligations and disposition

The following remain open and are not concealed by successful local consistency checks.

| State | Obligation | Evidence needed to resolve it |
| --- | --- | --- |
| ○ Open | Recover gauge redundancy and the effective representation table from delayed assembly histories. | One explicit branch-to-observable map preserving passive relabelings, with independent effective transport/response comparisons, full anomaly sums, and declared global group/bundle sectors. |
| ○ Open | Establish six-slot selection and persistence, and exclude unwanted accessible inventories. | Admitted causal histories satisfying the Master Equation and appropriate independent persistence/exclusion arguments. The finite sign table is insufficient. |
| ○ Open | Derive sea pairing, the electroweak order parameter, chiral couplings, and the inertial response. | Relative-history response records and a common normalization, with stable branches and controlled effective reduction. Occupancy and opposite labels are insufficient. |
| ○ Open | Match the effective action and precision corrections. | A justified averaging regime, operator content, coefficients, and scale/scheme map independently constrained before comparison. The chosen form factor and overlap functional remain hypotheses. |
| ○ Open | Recover thermal detector response and strong-angle suppression. | Detector excitation/de-excitation rates with an energy account, and a branch-derived principal strong angle with the observer inference and uncertainties retained. |
| ○ Deferred | Refresh the generated equation registry. | Explicitly authorized regeneration followed by its check; no generated write was performed here. |
| ○ Outside assignment | Integrate this disposition into shared CRW status and assess downstream chapters. | Coordinator review of this report and any separately authorized cross-file work. No downstream completion is asserted. |

The Gauss, Maxwell–Ampere, scattering factorization, color/kinematics, and positive-geometry passages were reviewed as comparison targets or explicitly optional comparisons. Their presence does not establish a primitive field ontology, a substrate scattering derivation, or an additional accepted recovery obligation. This review added no new external-theory program.

Disposition: ● Done for the bounded CRW-005 chapter review and repair. The 13 local findings are addressed in the final chapter bytes identified above; the substantive emergence obligations remain open, and generated-registry drift is explicitly deferred. The coordinator can consume this report as a chapter-level review receipt without treating it as theory closure or downstream corpus closure.
