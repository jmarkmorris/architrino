# CRW-005 Mode Taxonomy — bounded review and repair

## Disposition and scope

Priority 48, reviewed on 2026-09-12. The [Mode Taxonomy chapter](../../../../content/markdown/aaa/reactions/mode-taxonomy.md) received 12 local finding groups, MT-01 through MT-12: six high and six medium. The repairs are complete at the document level, subject to the final validation record below. This is editor self-review supported by explicit mathematical counterexamples and checked external benchmarks, not an independent second-agent physical certification.

The operator authorized changes only to that chapter and creation of this receipt. Shared status, priorities, work queue, work log, conversion ledger, other chapters, code, fixtures, generated artifacts, and publication files were outside the write scope. No staging, commit, push, reset, stash, linked worktree, or regeneration command was performed by this task. Broader concurrent work is not attributed to this task.

## Provenance

The dispatch chapter SHA-256 was `d52cfbe822cec30a191d04887fc142e1aa2941869624bc68eaa150da00d64ead`. Before editing, `shasum -a 256 content/markdown/aaa/reactions/mode-taxonomy.md` returned exactly that digest; scoped `git --no-optional-locks status --short --` over the two authorized paths returned no entries, and `test ! -e reference/priorities/aaa-corpus-rewrite/evidence/crw-005-mode-taxonomy-review-2026-09-12.md` passed. The hash was checked again immediately before the chapter patch. `nl -ba` recorded the full 422-line dispatch source; the baseline references below refer to those bytes.

The immutable baseline is the chapter blob at commit `859f2b07cb17889ca2c239d82fd61455c2ba903c`. `git show 859f2b07cb17889ca2c239d82fd61455c2ba903c:content/markdown/aaa/reactions/mode-taxonomy.md | shasum -a 256` returned the same dispatch digest. This identifies file contents, without attributing their origin from a commit message.

Final chapter SHA-256, measured with `shasum -a 256`:

```text
d7f5d6f56b6f729b49e86fa806c8b02202b1340e36e5c301a31737593e13727e
```

Claim grade: measured for the source identity and command results. A different current chapter digest invalidates this receipt's current-byte coverage and requires a scoped comparison; it does not erase the recorded baseline.

## Sources and owners inspected

- [AGENTS.md](../../../../AGENTS.md), the [generated startup router](../../../op/agent-startup-orientation.generated.md), the [review skill](../../../../.agents/skills/architrino-review/SKILL.md), its [live owner](../../../op/skills/skill-architrino-review.md), the complete [corpus-review procedure](../../../office-of-research/cto/prompts/corpus-reviewer.md), [theory orientation](../../../op/theory-orientation.md), and [operator explanation standard](../../../op/operator-explanation-standard.md). Explicit bounded repair authority in the assignment overrides the review-only default and prohibits shared-record updates.
- [Academic style](../../../../content/markdown/aaa/archie/academic-style-guide.md), [mathematics style](../../../../content/markdown/aaa/archie/mathematics-style-guide.md), [mathematical terminology](../../../../content/markdown/aaa/archie/mathematics-terminology.md), [terminology usage](../../../../content/markdown/aaa/archie/terminology-usage.md), [comparative glossary](../../../../content/markdown/aaa/archie/comparative-glossary.md), and [About Architrino](../../../../content/markdown/aaa/archie/about-architrino.md), including source-selection and AI-assistance boundaries.
- CRW-005 ownership and disposition sections in [priorities](../priorities.md), [work queue](../work-queue.md), the active priority-48 row in [corpus review status](../corpus-review-status.md), and the Mode Taxonomy row in the [conversion ledger](conversion-ledger.md). The ledger records the 2026-09-04 conversion and preservation intent; this task does not claim to repeat a complete pre-campaign conversion audit. Older queue counts were not used as current counts. A README lookup in this lane failed because that path was absent; the named live owners supplied the required routing.
- Task-relevant foundation passages: [Ontology](../../../../content/markdown/aaa/foundations/ontology.md), [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), [Absolute Time](../../../../content/markdown/aaa/foundations/absolute-time.md), [Euclidean Void](../../../../content/markdown/aaa/foundations/euclidean-void.md), [Absolute Timespace](../../../../content/markdown/aaa/foundations/absolute-timespace.md), [Detecting the Absolute Frame](../../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md), and [Constructing the Absolute Frame](../../../../content/markdown/aaa/foundations/constructing-the-absolute-frame.md). The [geometry/dynamics review lens](../../../office-of-research/specialists/roles-geometry-dynamics/system-prompt.md) supplied review perspectives, not independent theory evidence.
- [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), especially lines 83–163 on constituent causal roots, unsigned transmitter weight, playback, and transversality; [Noether Sea](../../../../content/markdown/aaa/spacetime/noether-sea.md), opening density and constitutive distinctions; [Electron](../../../../content/markdown/aaa/assemblies/fermions/electron.md), opening candidate/persistence boundary; [Electroweak Bosons](../../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md), Photon Referent Status and Low-Energy Four-Fermi Limit; [Radiation](../../../../content/markdown/aaa/reactions/radiation.md), opening mechanism boundary and lines 425–482 on effective exchange residuals; and relevant power/pitch-angle and constitutive passages in [Synchrotron](../../../../content/markdown/aaa/reactions/synchrotron.md). These were dependency inspections, not full reviews of those chapters.
- Condon and Ransom, *Essential Radio Astronomy* (2016), [§5.2.3, equations 5.37–5.42](https://www.cv.nrao.edu/~sransom/web/Ch5.html), checked directly for pitch-angle dependence and isotropic averaging. Erler and Freitas, “Electroweak Model and Constraints on New Physics,” *Review of Particle Physics* (2024), [§10.1, equation 10.6 and the following paragraph](https://pdg.lbl.gov/2024/reviews/rpp2024-rev-standard-model.pdf), checked directly for charged-current normalization and the low-momentum limit. Both are observer-level comparison references. No numerical PDG dataset or new physical measurement was imported.
- [Content validator](../../../../scripts/validate-content.mjs), [equation registry generator](../../../../scripts/build-equation-mapping-corpus.mjs), and equation-link validation entry points were inspected for check-only behavior and preservation contracts. The registry generator consumes equation context as well as displayed mathematics, so prose changes can require registry refresh even with every equation preserved.

## Findings and repairs

High denotes a defect that can promote an unsupported mechanism or invalidate a dynamical or conservation interpretation. Medium denotes a local domain, normalization, uncertainty, or presentation condition needed for a reproducible comparison. All findings below are repaired locally; the underlying physical obligations remain open.

| ID | Severity | Dispatch lines | Repaired lines | Local repair |
| --- | --- | --- | --- | --- |
| MT-01 | High | 15–24, 139–146, 195–199, 239–240, 280–283, 387–395 | 15–26, 141–148, 198–200, 243–244, 287–288, 395–403 | Distinguish a diagnostic threshold from capture, a stable branch, heating, and a sustained cascade. |
| MT-02 | Medium | 30–36 | 30–36 | Specify comparison domains and separate physical Noether sea contents from the fixed substrate. |
| MT-03 | High | 61–63 | 61–63 | Treat the assembly tuple and medium variables as summaries with pointers to complete admissible histories. |
| MT-04 | High | 67–92 | 67–92 | Declare center, frame, constituent receiver/transmitter aggregation, and center-weight dependence. |
| MT-05 | High | 65–92, 236 | 65–94, 240 | Limit transverse projection to a diagnostic; retain unsigned root weights, root completeness, and the unclosed constitutive map. |
| MT-06 | High | 137, 178–186 | 139, 180–188 | Require independently evaluated transfers and a closed total residual; distinguish counting from effective conservation. |
| MT-07 | Medium | 122–135 | 124–137 | State the potential-only gauge-test domain and simultaneous matter/boundary transformations. |
| MT-08 | Medium | 246–260 | 250–266 | State isotropic pitch averaging, classical validity, speed calibration, and cooling-time meaning. |
| MT-09 | High | 22, 279–304 | 22–26, 285–312 | Scope the two-photon threshold and two-body balance to the isolated observer limit; include ambient exchange in recruitment models. |
| MT-10 | Medium | 342–357 | 350–365 | Restrict whitening to an appropriate covariance and preserve singular/asymmetric/limit conventions. |
| MT-11 | Medium | 318, 359–368 | 326, 367–376 | Define weak-current normalization and retain corridor-to-Fermi-coupling recovery as open. |
| MT-12 | Medium | 378–383 | 386–391 | Keep the one-percent criterion as presentation guidance and bound the total omitted contribution. |

### MT-01 — threshold, capture, stability, and heating are distinct

The baseline repeatedly says that nucleation proceeds above a threshold and that energy below it enters non-radiative heating or excitation. Yet its own photon carrier note leaves acceleration balance open. A scalar threshold does not specify the vector evolution or its basin of attraction. A path can enter a diagnostic region and leave it without settling; crossing a proposed boundary is not a persistence theorem. Likewise, elastic scattering can change direction without thermalizing the target. The repair retains the vocabulary and scenarios but requires a compatible solution, capture dynamics, and persistence; it keeps recoil, elastic transport, stored excitation, other radiation, and actual thermalization separate. A continuing cascade additionally needs sufficient rates and residence time.

Claim grade: inferred from the stated missing dynamics and the chapter's existing referent boundary; the threshold/capture distinction is definitional. Falsifier: a chapter-local history evolution theorem showing that every specified crossing enters and remains in the stated mode, plus a complete energy routing result excluding the other channels, would support the stronger wording. Such a theorem is not supplied by a threshold name or channel list.

### MT-02 — environment labels do not define approximation domains

The baseline calls the Noether sea the substrate and groups laboratories, beamlines, plasmas, and most astrophysical environments into “low-energy.” The foundation owners distinguish fixed absolute timespace from its contents. A location also supplies no dimensionless expansion parameter: the same apparatus can operate on either side of a mediator or quantum-recoil scale. The repaired assumptions require channel-specific energy and momentum-transfer ranges and the relevant approximation. They retain the same observer comparisons without assigning all scenarios one validity domain.

Claim grade: measured for the local owner conflict by the cited passages; inferred for the missing applicability conditions. Falsifier: a supplied scale and error estimate covering every claimed environment would resolve the domain concern. The controlling foundation definition would have to change to justify identifying the sea with the fixed substrate.

### MT-03 — a summary tuple is not delayed initial data

The tuple omits an explicit requirement to resolve constituent positions, velocities, polarities, and retained histories. Two histories can agree in current aggregate momentum and local density while placing a past transmitter at different emission sites; the Master Equation then selects different roots or acceleration directions. The repaired tuple is a summary with a resolvable history pointer, including boundary inputs, all roots, and an omitted-history bound for truncation. Medium density, normalized density, delay factor, effective potential, and ensemble temperature are defined locally without declaring autonomous evolution for that compressed state.

Claim grade: derived from the delayed argument of the Master Equation; inferred for the insufficiency of an unresolved pointer. Falsifier: an explicit reconstruction of all update-relevant histories from the tuple, or a proved closed reduction with a stated error bound, would remove this insufficiency. Equality of summary values alone is not that reconstruction.

### MT-04 — constituent receivers and assembly centers

The baseline names roots “acting on assembly A” without specifying its receiving constituents or center rule. In normalized wake-speed units with $c_f=1$, a stationary transmitter at the origin and receiver events at native time zero and positions $(1,0,0)$ and $(2,0,0)$ have emission roots $-1$ and $-2$. The arithmetic center would instead select $-3/2$ if incorrectly treated as one primitive receiver. These are kinematic root witnesses, not solutions claimed to be bound assemblies.

For a center $\mathbf X_A=\sum_a w_a\mathbf X_a$ with fixed weights, two derivatives give $\mathbf A_A=\sum_a w_a\mathbf A_a$. If the weights vary, the additional terms are $2\sum_a\dot w_a\mathbf V_a+\sum_a\ddot w_a\mathbf X_a$. For example, $X_1=T$, $X_2=0$, $w_1=T$, and $w_2=1-T$ on $0<T<1$ give $X_A=T^2$ and $A_A=2$, although both constituent accelerations vanish. The repair declares the aggregation and preserves the displayed map by requiring its index to carry the receiver/transmitter pair. It does not introduce physical mass weights.

Claim grade: derived by the causal equation and product rule. Falsifier: a root calculation contradicting the stated stationary-source roots or a center differentiation contradicting the displayed product-rule terms would overturn these witnesses. A physical reduction must separately justify its actual center and weights.

### MT-05 — projection is not magnetic recovery

For a nonzero velocity, $\Pi_\perp=I-\hat{\mathbf V}\hat{\mathbf V}^{\mathsf T}$ gives $\mathbf V\cdot\Pi_\perp\mathbf A=0$ for every input vector. Choosing $\mathbf V=(1,0,0)$ and a comparison electric acceleration $\mathbf A=(0,1,0)$ produces a nonzero transverse result without a magnetic contribution. Thus perpendicularity does not identify a constitutive mechanism. The repair labels the expression a candidate diagnostic, requires charge/velocity/source/frame dependence, and leaves direct-wake versus sea-mediated shares unresolved.

The baseline correctly warned against multiplying a second Jacobian onto the acceleration weight, but its prose described density as $1/D_t$. The owner uses the unsigned $c_f/|D_t|$: at $c_f=1$ and $D_t=-2$ the weight is $1/2$, not $-1/2$. The repair makes that sign, the simple-root domain, full root inventory, singular-root routing, acceleration units, and avoidance of duplicate sea contributions explicit.

Claim grade: derived for projection and weight arithmetic; guessed for the unclosed magnetic/medium interpretation. Falsifier: an independent constitutive derivation from the same complete histories could establish the magnetic identification. A transverse fit or orthogonality check alone cannot do so; a root-weight implementation using signed $1/D_t$ fails the stated negative-denominator witness.

### MT-06 — naming a remainder does not close a balance

The baseline lets a nonzero residual pass when assigned a channel name. Given any discrepancy $r$, defining an unknown “wake” entry as $-r$ makes the sum zero by construction and tests no transfer. The repaired rule requires independently evaluated, nonduplicated exchanges and a total residual within a declared limit or error bound. Charge continuity and gauge dependence cannot be assigned to heating. Primitive identity/polarity counting remains an ontological constraint; four-momentum and angular-momentum balances remain assembly/observer recovery requirements, with explicit boundaries and retained wake changes.

Claim grade: derived false-positive construction and measured comparison with Radiation's field/work/flux definitions. Falsifier: independently computed transfers closing the full residual on the same event domain would support acceptance. A label whose value is defined as the unexplained discrepancy is not independent evidence.

### MT-07 — gauge tests must hold physical inputs fixed

The potential-only expression is useful for functionals whose other dependencies have been consistently included. It is incomplete as an instruction to transform only the potential when explicit charged matter fields remain. In a comparison with $D_\mu=\partial_\mu+iqA_\mu$, the transformations $A'_\mu=A_\mu+\partial_\mu\chi$ and $\psi'=e^{-iq\chi}\psi$ give $D'_\mu\psi'=e^{-iq\chi}D_\mu\psi$ by the product rule. Holding $\psi$ fixed leaves the extra term $iq(\partial_\mu\chi)\psi$. This is an effective gauge-covariance identity, not a substrate law. The repair preserves the equation and states its matter and boundary domain.

Claim grade: derived under the declared comparison convention. Falsifier: cancellation of that extra term for arbitrary nonconstant $\chi$ while the charged field remains fixed would contradict the witness. A formulation that already eliminates matter consistently remains covered by the preserved potential-only expression.

### MT-08 — synchrotron averaging and timing

The displayed $4/3$ coefficient is the isotropic pitch-angle average of the classical fixed-pitch expression. With $u=\cos\alpha$, the normalized average is $\frac12\int_{-1}^{1}(1-u^2)\,du=2/3$. Multiplying the fixed-pitch coefficient 2 by this average gives $4/3$; at perpendicular pitch the power is $3/2$ times the isotropic average at the same speed and field. The source note identifies the checked Condon–Ransom formulas. The repair also states classical/ultrarelativistic limits and defines the comparison cooling timescale, field, electron energy, speed, and Lorentz factor without identifying observer speed with primitive wake speed.

Claim grade: derived arithmetic conditional on the independently checked classical benchmark; no native radiative derivation. Falsifier: a different declared pitch distribution requires its own average and invalidates use of this coefficient for that case. Quantum recoil, strong-field corrections, or another dominant loss channel invalidate the stated power/cooling approximation.

### MT-09 — substrate recruitment requires ambient exchange accounts

The pair scenario combines local recruitment with a balance containing only two incoming photons and two outgoing charged particles. Algebraically, total conservation gives the isolated equality only if the omitted environment has zero net four-momentum change. For an energy-component witness, $4+2=5+1$ is a closed full event while $4\ne5$ is an unclosed restricted event. The repair adds the explicit ambient input/output balance in prose and states the effective chart, signature, photon on-shell condition, angle, and comparison units. Expanding the null four-momenta yields the preserved threshold formula; parallel photons have $s=0$. These are benchmark kinematics and accounting implications, not a recruitment trajectory.

Claim grade: derived from the stated effective event balance and null-photon comparison assumptions. Falsifier: a derived recruitment history showing zero or suitably bounded net ambient/wake/remnant change would justify the restricted two-body balance in that domain. Preserving architrino identity counts alone does not imply that result.

### MT-10 — covariance is not an arbitrary uncertainty rule

An inverse square root requires a specified invertible positive covariance on the residual space. The valid singular covariance with both diagonal and off-diagonal entries equal to 1 has determinant zero and null vector $(1,-1)$; its ordinary inverse square root does not exist. A supported-subspace calculation must also test the null-space constraint rather than silently discard it. The repair restricts the displayed expression, routes limits/asymmetric errors to their declared comparison rule, and requires data version, correlations, theory errors, and fit provenance. It does not introduce a new statistical acceptance threshold.

Claim grade: derived matrix-domain finding. Falsifier: an ordinary inverse for the stated singular matrix would overturn the example. A chapter-local positive-definite covariance or explicitly justified supported-subspace likelihood would discharge the domain obligation for its selected data, not for every uncertainty convention.

### MT-11 — weak normalization and coupling provenance

Each left-chiral current with $P_L=(1-\gamma^5)/2$ is half the corresponding unprojected $1-\gamma^5$ current. Their product is one quarter, so the coefficient $-4G_F/\sqrt2$ is consistent only with the declared projector convention; the other convention uses $-G_F/\sqrt2$. The repair preserves the display and names that convention, low-transfer domain, flavor factors, and precision matching requirements. It also keeps derivation of the Fermi coupling from corridor response open, consistent with the Electroweak Bosons owner. Using measured couplings can compute a benchmark, but cannot derive those same inputs.

Claim grade: derived normalization arithmetic; measured source support from the checked PDG convention; guessed/open for the corridor-to-coupling map. Falsifier: a declared alternative current normalization with its compensating coefficient would resolve the ambiguity. An independently derived corridor response recovering the coupling and channel data without fitting them would discharge the physical obligation.

### MT-12 — many small channels can have a large total

A one-percent per-channel display cutoff does not bound the total missing contribution. One hundred disjoint channels with weight $0.009$ each sum to $0.9$ while each is below the cutoff. The repair retains the existing presentation rule, adds a denominator/regime/source declaration, and requires a bound on omitted totals in precision or conservation calculations.

Claim grade: derived arithmetic counterexample. Falsifier: a bound on the number and cumulative weight of omitted channels, or their explicit inclusion in the event account, would justify a particular truncation. The per-channel cutoff alone supplies neither.

## Validation and generated-artifact status

The complete repaired chapter was reread with `nl -ba` in contiguous ranges 1–115, 116–280, and 281–436, including all 23 display equations and every scenario. The one-sentence cross-section definition was corrected during this reread. No display equation was changed.

The Node check reproduced below first passed positive and negative controls for math extraction, fences, inline code, invalid KaTeX, missing local paths, and changed-equation detection, before reading the chapter. Its chapter result is 161 expressions, 23 displays, and 44 local links. All original display bodies are byte-identical; all 23 original viewer identities and every original link target are retained. Viewer links remain standalone immediately after their display. The path check uses `marked`; KaTeX uses the installed `katex` module with `throwOnError:true` and strict errors. The checker verifies ordinary Markdown heading anchors used here, not every possible renderer-specific anchor syntax. Equation-viewer anchor identity is checked by exact baseline preservation, not by claiming a refreshed registry.

A separate Node arithmetic invocation passed known controls first (dot product 11 and determinant 6), then eight witness groups: projection, constituent roots/center, unsigned weight, singular covariance, pitch average, ambient balance, weak normalization, and cumulative omissions. The exact independent references are the algebra and counterexamples stated above. Native numerical witnesses use $c_f=1$. These arithmetic checks are not an EOM solver run or a proof of a physical assembly.

`node scripts/validate-content.mjs --check --strict` completed with 0 errors, 0 warnings, and 30 informational notes on the first post-chapter run (199 corpus Markdown files; 1,690 repository Markdown files at that snapshot). A final run including this receipt is recorded below. Counts can change under concurrent edits and do not attribute such edits to this review.

`node scripts/build-equation-mapping-corpus.mjs --check` completed with exit 1 and one reported issue: `generated registry is stale: content/generated/equation-mapping/corpus-equations.json` (199 files; 4,685 display equations). Changed chapter context is consumed by this registry, so its freshness is separate from preserved equation bytes. This run does not establish whether all registry drift came from this chapter. Regeneration is outside this assignment. The exact deferred command is:

```bash
node scripts/build-equation-mapping-corpus.mjs --write
```

The authorized regeneration owner should then rerun the corresponding `--check`. No other generated consumer was certified fresh by this receipt.

Final scoped verification: the entire receipt was reread, and `git diff HEAD -- content/markdown/aaa/reactions/mode-taxonomy.md` was inspected against the finding table. `git diff --check HEAD -- content/markdown/aaa/reactions/mode-taxonomy.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-mode-taxonomy-review-2026-09-12.md` exited 0 with no diagnostics. Since the receipt is untracked, `git diff --no-index --check /dev/null reference/priorities/aaa-corpus-rewrite/evidence/crw-005-mode-taxonomy-review-2026-09-12.md` checked it separately: after removal of one extra end-of-file blank line, it returned the normal no-index difference status 1 with no whitespace diagnostics. The control-first script below passed for both paths. `shasum -a 256 content/markdown/aaa/reactions/mode-taxonomy.md` reconfirmed the final digest recorded above. Scoped `git --no-optional-locks status --short --` reported the chapter modified but unstaged and the receipt untracked; no staging was performed.

The final `node scripts/validate-content.mjs --check --strict` run exited 1 with 4 errors, 0 warnings, and 30 notes (199 corpus Markdown files; 1,693 repository Markdown files at that snapshot). All four errors are out-of-scope links to the missing literal path `tests/current-launch-bindings.test.js`:

| Referring file | Validator line |
| --- | --- |
| [Cached root cover cutover](../../development-process-review/analysis/option-b-cached-root-cover-cutover.md) | 53 |
| [Cached root cover full cutover](../../development-process-review/analysis/option-b-cached-root-cover-full-cutover.md) | 51 |
| [Current source cutover inventory](../../development-process-review/analysis/option-b-current-source-cutover-inventory.md) | 85 |
| [Prescribed response and acceleration cutover](../../development-process-review/analysis/option-b-prescribed-response-and-acceleration-cutover.md) | 5 |

`git --no-optional-locks status --short -- tests/current-launch-bindings.test.js` reported an unstaged deletion. That observation establishes its checkout state, not who deleted it or whether deletion is intended; this task did not restore it or alter its referring documents. These failures prevent a repository-wide green validation claim despite the earlier passing snapshot. Their owner must reconcile the intended test location and these links, then rerun the strict command. The scoped checks establish syntax, local path validity, and preservation for the two authorized files, not global repository health.

## Remaining obligations and closure limits

- MT-O1: Exhibit a compatible physical carrier/assembly history before claiming mode existence; demonstrate capture and retained persistence before stability or nucleation claims. The immediate evidence target is a complete acceleration-law history with independently checked roots and perturbations, not a threshold fit.
- MT-O2: Derive constituent-to-center and Noether sea response maps, including direct-wake/sea shares, complete root inventories, singular-event treatment, and finite-history error bounds. Orthogonality is already derived; magnetic recovery remains open.
- MT-O3: Derive conserved assembly/observer quantities and compute full source, recoil, material, sea, wake, remnant, and boundary exchanges independently. Pair recruitment must recover the isolated two-photon benchmark without hiding ambient changes.
- MT-O4: Recover photon kinematics, polarization, interaction rates, weak currents/coupling, and uncertainty-aware observer comparisons from independently fixed assembly data. No physical branch, EOM solver acceptance, theory closure, or downstream closure follows from this editorial receipt.

No blocker prevented the two authorized file changes or their scoped checks. The four out-of-scope broken links block a repository-wide strict pass; registry regeneration and coordinator integration also remain outside this task's authority. The next concrete coordination step is to compare the final chapter digest with this receipt and integrate MT-01–MT-12 into the shared CRW-005 owners when that coordinator is authorized, while routing the broken links to their owner. Those shared owners were not changed here. The review skill governed the complete-chapter scope, stable finding IDs, mathematical checks, and separation of editorial repair from scientific acceptance; the assignment's narrower write boundary governed the handoff.

## Reproducible two-path syntax and preservation check

Run from the repository root. This script performs no writes. It intentionally treats the retained immutable baseline as the comparison source, and the controls run before either real target is inspected.

```bash
node --input-type=module <<'NODE'
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import katex from 'katex';
import {marked} from 'marked';
const chapter='content/markdown/aaa/reactions/mode-taxonomy.md';
const report='reference/priorities/aaa-corpus-rewrite/evidence/crw-005-mode-taxonomy-review-2026-09-12.md';
function scan(source) {
  const plain=source.replace(/^ *(\x60{3,}|~{3,})[^\n]*\n[\s\S]*?^ *\1 *$/gm,'').replace(/(\x60+)[^\n]*?\1/g,'');
  const math=[]; let stripped='',i=0;
  const escaped=n=>{let k=n-1;while(k>=0&&plain[k]==='\\')k--;return (n-k-1)%2===1;};
  while(i<plain.length) {
    if(plain[i]!=='$'||escaped(i)){stripped+=plain[i++];continue;}
    const d=plain[i+1]==='$'?'$$':'$';let j=i+d.length;
    while(j<plain.length&&!(plain.startsWith(d,j)&&!escaped(j)))j++;
    assert.ok(j<plain.length,'unclosed math delimiter');
    const tex=plain.slice(i+d.length,j);
    assert.ok(d==='$$'||!tex.includes('\n'),'multiline inline math');
    math.push({tex,display:d==='$$'});stripped+=' MATH ';i=j+d.length;
  }
  const links=[];
  marked.walkTokens(marked.lexer(stripped),t=>{if(t.type==='link'||t.type==='image')links.push(t.href);});
  return {math,links};
}
function local(source,file){
  const {math,links}=scan(source);
  for(const m of math)katex.renderToString(m.tex,{displayMode:m.display,throwOnError:true,strict:'error'});
  let n=0;
  for(const href of links){
    if(/^[a-z][a-z0-9+.-]*:/i.test(href))continue;
    const [f,frag]=href.split('#'); const p=path.resolve(path.dirname(file),decodeURIComponent(f||path.basename(file)));
    assert.ok(fs.existsSync(p),'missing local target '+href);n++;
    if(frag&&p.endsWith('.md')){
      const headings=fs.readFileSync(p,'utf8').split('\n').filter(x=>/^#{1,6} /.test(x)).map(x=>x.replace(/^#+ /,'').toLowerCase().replace(/[\x60*_]/g,'').replace(/[^\p{L}\p{N}\s-]/gu,'').replace(/\s/g,'-'));
      assert.ok(headings.includes(decodeURIComponent(frag)),'unchecked/missing heading '+href);
    }
  }
  return {expressions:math.length,displays:math.filter(x=>x.display).length,localLinks:n};
}
const good='# Known\n\n$x+1$ and $$x^2$$\n\n[ok](AGENTS.md)\n\n~~~md\n$ignored$ [bad](missing.md)\n~~~\n\n\x60$ignored$\x60';
assert.equal(scan(good).math.length,2);assert.equal(scan(good).links.length,1);
assert.deepEqual(local(good,'control.md'),{expressions:2,displays:1,localLinks:1});
assert.throws(()=>scan('$x'));
assert.throws(()=>local('$\\notARealKatexCommand$','control.md'));
assert.throws(()=>local('[bad](missing-known-negative-control.md)','control.md'));
const preserved=(a,b)=>assert.deepEqual(scan(a).math.filter(x=>x.display),scan(b).math.filter(x=>x.display));
preserved('$$x$$','$$x$$');assert.throws(()=>preserved('$$x$$','$$y$$'));
console.log('CONTROL PASS: math extraction, code fences, inline code, KaTeX rejection, missing link, and preservation mutation.');
const old=execFileSync('git',['show','859f2b07cb17889ca2c239d82fd61455c2ba903c:'+chapter],{encoding:'utf8'});
const current=fs.readFileSync(chapter,'utf8');preserved(old,current);
const views=s=>[...s.matchAll(/^\[View →\]\(([^)]+)\)$/gm)].map(x=>x[1]);
assert.deepEqual(views(old),views(current));
for(const href of scan(old).links)assert.ok(scan(current).links.includes(href),'removed link '+href);
for(const file of [chapter,...(fs.existsSync(report)?[report]:[])]){
  const s=fs.readFileSync(file,'utf8'); console.log(file,local(s,file));
  assert.ok(!/[ \t]+$/m.test(s),'trailing whitespace');
  const blocks=[...s.matchAll(/\$\$[\s\S]*?\$\$/g)];
  if(file===chapter)for(const b of blocks)assert.match(s.slice(b.index+b[0].length),/^\n\n\[View →\]\([^)]+\)/);
}
console.log('PRESERVATION PASS:',views(current).length,'viewer identities; every baseline display and local/external link target retained.');
NODE
```
