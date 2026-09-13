# CRW-005 Expansion Mechanism review and bounded repair — 2026-09-12

This receipt records priority 61's complete chapter review and local repairs. It supplies the coordinator with the findings, their reasoning, preservation evidence, and remaining scientific obligations. The review used the corpus-review skill with explicit operator repair authority. The editor's full reread is self-review; independently checkable algebra and external comparison sources are identified below rather than treating agent identity as mathematical independence.

## Scope and provenance

- Authorized chapter: [Expansion Mechanism](../../../../content/markdown/aaa/cosmology/expansion-mechanism.md).
- Authorized evidence: this receipt. Shared boards, priorities, queues, logs, conversion records, other chapters, fixtures, code, and generated files are outside this worker's write scope.
- Dispatch baseline SHA-256: `518f9a139f1844c7ccae0f262c3062323ec10f3fc8ff6765d8150dbe50faaf05`.
- Baseline recovered independently of changing HEAD with `git show 72847589ba73d0bf81d07ca5b27d98072659cee9:content/markdown/aaa/cosmology/expansion-mechanism.md`; piping those bytes through `shasum -a 256` returned the dispatch hash.
- Before editing, `git --no-optional-locks status --short --` with the two authorized paths returned no entries, the chapter's `shasum -a 256` matched dispatch, and `test ! -e` on this receipt passed.
- References below name physical source lines measured with `nl -ba`. Baseline and final chapter retain the same line numbering; the final preservation instrument also verifies equation identities and heading text.
- Review date is 2026-09-12 in America/New_York. The late validation window crosses 2026-09-13 UTC; `date -u` reported 2026-09-13 00:36:01 UTC during closeout.

No staging, commit, push, reset, stash, linked worktree, or regeneration was performed by this worker. This is a record of this worker's actions, not an assertion that concurrent agents left the shared checkout unchanged.

Closeout integration snapshot: `git --no-optional-locks status --short --` on the two authorized paths subsequently reported a staged chapter and an added receipt with unstaged amendments. `git show :content/markdown/aaa/cosmology/expansion-mechanism.md | shasum -a 256` matched the final chapter hash below, while `git show :reference/priorities/aaa-corpus-rewrite/evidence/crw-005-expansion-mechanism-review-2026-09-12.md | shasum -a 256` returned `62db4d7cc1de697c0d585bad921704c6b1f3212822e49cbf0a6b5185979ec0be`. That staged receipt predates the final hash, validation summary, and strengthened delimiter controls in the working receipt. The index was preserved. The designated integrator must check the latest working receipt rather than treat that earlier staged snapshot as complete.

## Authorities and source inspection

The complete [AGENTS.md](../../../../AGENTS.md), [startup router](../../../op/agent-startup-orientation.generated.md), [review skill](../../../../.agents/skills/architrino-review/SKILL.md), [live skill owner](../../../op/skills/skill-architrino-review.md), [corpus-review procedure](../../../office-of-research/cto/prompts/corpus-reviewer.md), and [theory orientation](../../../op/theory-orientation.md) supplied the workflow. The assignment's explicit two-file repair authority controls over the procedure's review-only default.

The [operator explanation standard](../../../op/operator-explanation-standard.md), [academic style guide](../../../../content/markdown/aaa/archie/academic-style-guide.md), [math style guide](../../../../content/markdown/aaa/archie/mathematics-style-guide.md), task-relevant [mathematical terminology](../../../../content/markdown/aaa/archie/mathematics-terminology.md), [terminology usage](../../../../content/markdown/aaa/archie/terminology-usage.md), [comparative glossary](../../../../content/markdown/aaa/archie/comparative-glossary.md), and [source policy](../../../../content/markdown/aaa/archie/about-architrino.md#sources-references-and-attribution) controlled exposition, coordinate layers, temperature notation, speed distinctions, source selection, and claim grading. The [geometry/dynamics role packet](../../../office-of-research/specialists/roles-geometry-dynamics/system-prompt.md) was a reasoning lens.

Live CRW owners inspected were the [priority board](../corpus-review-status.md), including priority 61 at line 12; [priorities](../priorities.md), CRW-005 status; [work queue](../work-queue.md), lines 37–49; and the [conversion ledger](conversion-ledger.md), line 105. The old counts in the opening queue entry were not used to infer current campaign coverage. None of these shared owners was edited.

Nearby grounding comprised [Ontology](../../../../content/markdown/aaa/foundations/ontology.md), opening layer map; [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), opening acceleration and history contract; [Energy](../../../../content/markdown/aaa/dynamics/energy.md), kinetic-account assumptions; [Noether Sea](../../../../content/markdown/aaa/spacetime/noether-sea.md), constitutive and equilibrium boundaries; [Proper Time and Time Dilation](../../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md), moving-clock and coordinate-export section; and [Dark Energy](../../../../content/markdown/aaa/cosmology/dark-energy.md), opening comparison/constitutive distinction. These were scoped owner inspections, not complete assurance reviews of the neighboring chapters.

External source checks were limited to passages used by this repair:

- LIGO Scientific Collaboration, Virgo Collaboration, Fermi GBM, and INTEGRAL, *Gravitational Waves and Gamma-Rays from a Binary Neutron Star Merger: GW170817 and GRB 170817A* (2017), [arXiv:1710.05834](https://arxiv.org/abs/1710.05834), DOI 10.3847/2041-8213/aa920c. The abstract and timing discussion support the retained event-level speed comparison; this is observational inference with source-delay and distance assumptions, not a local primitive-speed theorem.
- David W. Hogg, *Distance Measures in Cosmology* (1999), [section 7, equations 19–20](https://ned.ipac.caltech.edu/level5/Hogg/Hogg7.html), arXiv:astro-ph/9905116. The luminosity-distance definition and angular-distance relation support the comparison convention used in EXP-16. The decisive correction is also obtained directly by substituting the chapter's own distance relation into the flux definition.

Named SZ, supernova, CMB-temperature, and hydrogen-line examples were retained as observer-level comparisons; this review does not report a fresh analysis of those datasets, a new precision measurement, or an exhaustive bibliography audit. Their quantitative use requires the matching data release, source calibration, and uncertainties.

## Findings and applied repairs

Severity is High for a wrong mathematical result or an unsupported inference that changes scientific authority, and Medium for a missing domain, units, notation, or comparison restriction. All twenty finding groups below have local repairs; the open physical obligations are separately listed at the end.

### EXP-01 — Medium — Scale normalization and comparison limits

Baseline/final lines 15–84 and 1814. A scale factor defined from a ratio needs a positive finite reference and an averaging rule. The proposed inverse-cube-root energy-density parameterization cannot be read as a separation law without an energy-per-assembly assumption. For example, if the energy density scales as separation to the power minus four, its inverse cube root scales as separation to the power four-thirds. Likewise, the oscillatory scale is negative at some phases when the modulation amplitude exceeds one, and a constant logarithmic scale rate in effective time does not prove a constant redshift slope in Euclidean distance.

Repair: state normalization and averaging, require positive time scales and modulation magnitude below one, distinguish local slope matching from the full distance history, and label the constant-density source relation as pressureless effective continuity.

Claim grade: derived for the algebraic domain restrictions; inferred for their necessity in this exposition. Falsifier: a positive all-phase scale with modulation magnitude greater than one under the displayed formula, or a declared alternative averaging/density law that establishes the omitted identification.

### EXP-02 — High — Endpoint-only redshift presented as general transport

Baseline/final lines 90–118, with factorization at 184–206. The equality of redshift to an endpoint clock-rate ratio omits the propagation factor introduced by the same chapter. Equal endpoint rates and a propagation factor of two already distinguish the two predictions: zero endpoint-only shift versus redshift one.

Repair: restrict the equality to stationary, phase-preserving, matched-transition endpoints and explain where the general propagation factor enters.

Claim grade: derived from the two displayed formulas. Falsifier: an additional propagation factor inside the purported endpoint-only identity, with its extraction explicitly defined; no such factor is present in that formula.

### EXP-03 — High — Energy partitions and conservation authority

Baseline/final lines 228–318 and 1010–1031. Architrino, wake, and sea energies overlap unless the microscopic and coarse-grained accounts are partitioned. The master acceleration law does not itself choose a kinetic-energy functional. Time-translation symmetry also does not establish the required local density and flux for a delayed-history law.

Repair: retain the conservation equations as targets; require nonoverlapping accounts, a declared fixed region and outward flux convention, correct tolerance units, and independent extraction of compensating terms. Explain the divergence-theorem relation only after local continuity exists.

Claim grade: derived for the accounting and divergence-theorem implications; inferred for the missing construction identified by comparison with the Energy owner. Falsifier: an independently derived history-energy partition and local current satisfying the displayed balance on the declared domain. Defining a residual term to cancel the others is not that evidence.

### EXP-04 — High — Photon-energy sign and endpoint calibration

Baseline/final lines 320–363. The original positive loss magnitude was named as a signed change and then added to positive sea uptake in a zero-sum balance. With emitted energy ten and received energy five, the original loss plus uptake gives ten rather than zero. Moreover, total observed redshift includes endpoint and launch effects that need not be medium deposition.

Repair: define the signed change as received minus emitted energy, use the propagation-only redshift after corrections, require a common energy calibration, and retain the existing zero-sum balance. Redward transfer then gives photon change minus five and uptake plus five.

Claim grade: derived from subtraction and the factorization. Falsifier: the repaired sign fails that two-account example or a different independently defined common energy convention reverses the specified sign.

### EXP-05 — High — CMB bookkeeping estimate promoted to a universal energy bound

Baseline/final lines 332–351. Recovering CMB temperature, distance, and volume products does not uniquely determine all photon production, absorption, boundary flow, medium storage, or later energy evolution. The retained percent-scale expression concerns a selected present photon inventory and volume normalization. Those restrictions cannot bound every transparent-path history.

Repair: preserve the expression as a restricted heuristic comparison, identify its photon inventory and normalization assumptions, and remove the universal no-go inference. The dark-energy-loading question remains open under the native finite-region energy account.

Claim grade: derived for the insufficiency of the listed inputs; guessed for the retained physical deposition interpretation. Falsifier: an independent theorem mapping all admissible photon and medium histories to precisely that restricted inventory and stored energy.

### EXP-06 — High — Clock extraction and motion counted inconsistently

Baseline/final lines 396–481, 541–622, and 806–843. The chapter correctly supplies the clock-times-launch relativistic recovery product but later calls the unit-clock replay the whole homogeneous relative-motion shift. It also leaves the clock units in the source-branch frequency unspecified, allowing the endpoint factor to be counted twice.

Repair: identify source frequency as a calibrated source-clock quantity, require the moving assembly history for clock extraction, retain the exact order-preserving launch replay on its domain, and distinguish that replay from the finite-speed clock product. A residual preferred-frame dependence needs a measured bound, not the label “bounded.”

Claim grade: derived. For receiver speed ratio 0.6 against the declared homogeneous channel, the launch factor is 0.4 and the conditional moving-clock factor is 1.25; their product is 0.5. Falsifier: the full formula reduces to the launch factor alone under those same nonzero-speed assumptions. Physical recovery of the clock factor remains open.

### EXP-07 — Medium — Temperature collided with absolute event time

Baseline/final lines 641–656. The transport display used the already-defined emission/reception time symbols for a temperature scaling, which would literally rescale the absolute event time. It also assigned a temperature to an arbitrary bundle.

Repair: use temperature-qualified symbols and state the Planck-shape and achromatic-band conditions. Occupation shape remains separate from the phase-space measure needed for photon number and flux.

Claim grade: derived for symbol collision and preservation of the frequency-to-temperature ratio. Falsifier: a nonthermal occupation has the asserted single Planck temperature without an additional fitting convention, or the renamed symbols still collide with the defined event times.

### EXP-08 — High — Dilation covariance is not coherent rescaling

Baseline/final lines 658–685 and 287–298. Commutation with frequency dilation does not exclude diffusion. In logarithmic frequency, dilation is translation, and the second derivative commutes with translation while its heat evolution increases the variance of a Gaussian line. The group-speed derivative was also equated in scale to a dimensionless tolerance without a frequency-band and speed normalization.

Repair: demote commutation to a separate covariance diagnostic, state its norm/domain, give the diffusion counterexample, normalize the speed derivative, and distinguish speed differences from integrated travel-time limits. Retain the GW event constraint with its timing assumptions.

Claim grade: derived for the operator counterexample and dimensions; inferred from the cited timing analysis for the event-level limitation. Falsifier: a proof that translation commutation prohibits nonzero logarithmic-frequency diffusion, or a supplied local transport theorem that upgrades the integrated event constraint to the proposed pointwise bound.

### EXP-09 — High — Equilibration and zero-current inference lack the required moments

Baseline/final lines 691–735. An arbitrary positive equilibration sink removes particle number; redistribution instead needs the appropriate zero integral. A zero frequency current alone does not make the displayed multivariable transport functional vanish. A stationary system can also maintain a current through its boundaries.

Repair: define the cadence distribution, separate the candidate action/energy identification from primitive laws, require number/energy moments, positivity, and boundary conditions, and test the full extracted propagation integral for a null result.

Claim grade: derived for integrating the balance equation and for the functional-dependence counterexample; guessed for the physical transition law. Falsifier: a proved constitutive identity that makes the path functional depend only on the current in the required manner, together with compatible moment and boundary balances.

### EXP-10 — Medium — Weak-potential formulas described as strong-gradient limits

Baseline/final lines 737–781 and 872–898. Small potential relative to the squared comparison speed controls the displayed expansion. A large spatial gradient alone neither establishes nor replaces that condition.

Repair: state the weak-potential, stationary-endpoint domain and exclude extrapolation of the truncated formula to a horizon on that basis.

Claim grade: derived from the expansion parameter. Falsifier: a controlled remainder showing that the same truncated expansion remains valid in the claimed strong-potential region.

### EXP-11 — High — Rotational symmetry does not select the listed first-order terms

Baseline/final lines 950–995 and 1213–1239. A dot product of ray direction with a scalar-state gradient is rotationally invariant and first order, yet it is absent from the supposed symmetry expansion. The static homogeneous null condition does not exclude a static inhomogeneous gradient.

Repair: call the expression a restricted ansatz and require endpoint subtraction, further symmetry, or a bound for omitted gradients. Keep equilibrium and response differentiability conditional.

Claim grade: derived: simultaneous rotation of two vectors preserves their dot product. Falsifier: an additional proved symmetry or extraction identity eliminating every omitted first-order scalar on the admitted domain.

### EXP-12 — Medium — Units and coordinate-time conversions were incomplete

Baseline/final lines 977, 1031–1059, and 1245–1286. Logarithms need dimensionless arguments, the derivative-energy tolerance differs from the integrated-energy tolerance, and absolute-time state rates cannot be identified with effective-time input rates without a clock conversion.

Repair: declare the braid reference length and positive domains, distinguish the tolerance dimensions, use the absolute observation epoch in the two affected displays, define dot derivatives, and include the effective-to-absolute clock conversion in the handoff matrix. Static reference evaluation is distinct from a driven departure.

Claim grade: derived from dimensions and the chain rule. Falsifier: a declared normalization or clock Jacobian already making the omitted conversions identities on the same calculation.

### EXP-13 — High — Frequency variance does not establish image or cadence preservation

Baseline/final lines 1112–1158 and 1241. Across-ray logarithmic-frequency variance is dimensionless and cannot share an inverse-length wave-vector tolerance. It does not measure image blur: angular scattering can leave frequency unchanged. Separate variables for phase and packet cadence also do not imply different predicted transfers.

Repair: introduce a distinct beam-frequency tolerance, preserve angular and phase tests as separate requirements, and make independently predicted transfer disagreement the cadence falsifier.

Claim grade: derived from dimensions and counterexamples. Falsifier: a proved transfer law determining angular/phase observables uniquely from this variance, or actual unequal cadence predictions after the same corrections.

### EXP-14 — High — Solving the dark-energy rate silently dropped other contributions

Baseline/final lines 1321–1352. The continuity equation uses the total effective rate, while the solved expression names only the dark-energy contribution. Writing the total as that contribution plus another rate leaves an additional numerator term. Also, a finite denominator can be zero.

Repair: state the additional equality required for the retained display, give the missing term for a nonzero other contribution, and require a nonzero denominator with an uncertainty margin. At zero denominator the equation is inconsistent or underdetermined depending on its numerator.

Claim grade: derived. Let the equation reduce to $H_{\mathrm{DE}}=N-b(H_{\mathrm{DE}}+H_{\mathrm{other}})$. Then $H_{\mathrm{DE}}=(N-bH_{\mathrm{other}})/(1+b)$. With $N=8$, $b=3$, and $H_{\mathrm{other}}=2$, the answer is 0.5; omitting the other contribution gives 2. Falsifier: direct substitution of the corrected solution fails the original linear equation on a nonsingular input.

### EXP-15 — Medium — Signed distance inversion and logarithmic small terms

Baseline/final lines 858, 1086–1112, and 1383–1391. The small-residual inequality used a signed right-hand side even though the chapter admits blueward path transfer. Division also needs a nonzero coefficient and control of the higher-order error. Separately, a negligible logarithmic term is zero, not one.

Repair: compare against the magnitude of the homogeneous contribution, state local invertibility and error restrictions, and clarify that the multiplicative factor is what becomes one.

Claim grade: derived. A coefficient minus two over distance three gives a logarithmic transfer minus six and correctly reconstructs distance three; the original inequality cannot compare a nonnegative error to a negative leading term. Falsifier: the corrected inverse fails a constant nonzero-coefficient case or remains uniquely informative at zero coefficient without additional data.

### EXP-16 — High — Flux formula conflicts with luminosity-distance reciprocity

Baseline/final lines 1423–1446. The chapter retains $d_L=(1+z)^2D_A$ but its flux denominator originally contained only two powers of $1+z$. Substitution in the defining relation $F=L/(4\pi d_L^2)$ requires four powers.

Repair: correct the exponent, distinguish receiver-side beam area from angular-diameter distance, define bolometric flux and the deceleration coefficient, and keep the metric reciprocity assumptions explicit. Hogg's comparison treatment is linked at the passage.

Claim grade: derived by substitution. With $L=4\pi$, $D_A=1$, and $z=1$, the correct flux is $1/16$, while the old expression gives $1/4$. Falsifier: both original formulas satisfy the defining flux relation for these nonzero-redshift values under the same distance convention.

### EXP-17 — Medium — Local curve remainder and comparison distance lacked a common domain

Baseline/final lines 1450–1539 and 1582–1607. The original remainder uses derivatives of sea variables rather than the fully composed transport coefficient and omits speed, coefficient, mixed-derivative, and direction dependencies. A reference-model distance is not automatically Euclidean ray length.

Repair: restrict the displayed path to a fixed straight ray, use total derivatives of the complete coefficient, state the integrated Taylor remainder bound, and require matched distance and endpoint corrections for the reference curve.

Claim grade: derived. For a twice differentiable path coefficient, integrating its first-order Taylor remainder bounds the transfer error by $D^3\sup|\alpha_X''|/6$. Falsifier: a twice differentiable coefficient violates that bound on the same fixed ray; curved or nonsmooth paths are outside its hypotheses.

### EXP-18 — High — Full and propagation-only logarithmic budgets share one symbol

Baseline/final lines 515–537 and 1565–1578. The earlier definition makes $Y$ propagation-only, but the later display assigns it endpoint, source, launch, and propagation terms. With endpoint ratio two and every other factor one, the earlier definition gives zero while the later one gives $\ln 2$.

Repair: label the later left-hand side with the full-budget variable $Z$ and define the signs of its three nonpropagation components. Keep the segment sum as $Y$.

Claim grade: derived from definitions. Falsifier: the two original values agree in the stated endpoint-only example, or a different scoped definition was supplied before the original later equation.

### EXP-19 — Medium — Toy-model output exceeded the instrument's reach

Baseline/final lines 1609–1714. A quadrature over assigned coefficients tests those coefficients' consequences; it does not establish that a physical relaxation law produces them. Numerical units and independent cadence extraction were also underspecified.

Repair: require normalized wake-speed units, distinct channel calibrations, positive segment lengths summing to the path, refinement of quadrature, and independently calibrated inputs. Limit switched-factor experiments to bookkeeping and sensitivity.

Claim grade: derived for the conditional nature of the calculation; inferred for its explanatory restriction. Falsifier: the proposed toy acquires an independently validated constitutive dynamics and predicts held-out transport evidence without inserting the result through its inputs.

### EXP-20 — Medium — Cosmological projection and falsification claims need their assumptions

Baseline/final lines 11, 1761–1825. A pressure-to-density ratio needs energy-density units; the Friedmann curvature term needs inverse-length-squared curvature when the scale is dimensionless. Homogeneity and isotropy alone do not establish a metric or a shared ruler/clock map. A null environmental measurement does not falsify all state-dependent hypotheses without a specified prediction and sufficient sensitivity.

Repair: define units and nonoverlapping effective densities, keep metric and scale-rate recovery conditional, identify the environmental account as a hypothesis, and state a prediction-specific null test. Add a short opening explanation of the sea and acceleration-first substrate.

Claim grade: derived for dimensional restrictions; inferred for insufficiency of symmetry/fit claims; guessed for the physical environmental hypothesis. Falsifier: a derived common constitutive map and statistically resolved independent tests satisfy the currently missing conditions. The local repair does not supply those results.

## Equation and structure preservation

The controlled parser compares the final source with the immutable baseline. It retains all 117 display equations, their identities and positions in the sequence, all 34 headings, and all 135 original links. Ten display equations change intentionally; 107 are byte-identical in their parsed TeX bodies. These are bounded mathematical/notation repairs, not an assertion of byte-preserving style conversion.

| Baseline/final line | Stable equation ID | Intentional change |
| ---: | --- | --- |
| 322 | `corpus-equation-8f58f2bdd2526ce6` | Signed photon-energy change and propagation-only redshift |
| 643 | `corpus-equation-f2d718dc5b2e9855` | Temperature-qualified endpoint symbols |
| 674 | `corpus-equation-9f87186e4396bc92` | Dimensionless band-normalized speed derivative |
| 1037 | `corpus-equation-76f810ec0832bd2b` | Absolute observation epoch |
| 1051 | `corpus-equation-f0003741b7e5c646` | Absolute observation epoch |
| 1101 | `corpus-equation-e01a73013eb82c67` | Magnitude in signed small-error comparison |
| 1114 | `corpus-equation-fb7d9567c9fdabe9` | Separate dimensionless beam-frequency tolerance |
| 1424 | `corpus-equation-05ee791efa619244` | Correct fourth power in angular-distance flux |
| 1527 | `corpus-equation-14ed45a9b73b826f` | Remainder of fully composed path coefficient |
| 1566 | `corpus-equation-2d63baa0d5860730` | Full budget uses $Z$, segment sum remains $Y$ |

The registry generator source identifies [the generated corpus registry](../../../../content/generated/equation-mapping/corpus-equations.json) as an output consuming equations and nearby prose. Scoped basename searches also found the chapter in generated scene/textbook graphs, the conversion ledger, and [the redshift-budget mock input](../../../../scripts/cosmology/redshift-budget-mock.json). This is a scoped consumer inventory, not an exhaustive assertion that no other byte-binding consumer exists. Those files remain outside the write scope.

## Validation record

Claim grade: measured for command outputs on the inspected snapshots. Falsifier: rerunning the commands on the named final bytes yields a different scoped result, or a later file change invalidates the recorded hash.

- Complete source reread: baseline and repaired chapter inspected with numbered source ranges covering lines 1–1833; the receipt was reread in full and its closeout amendments reread separately. This checks exposition and algebra but is editor self-review.
- Controlled syntax/preservation instrument below: known-case checks pass before target reads. The final two-file run passed KaTeX, relative-path, and trailing-whitespace checks on 465 chapter math expressions and 133 chapter local links, plus 21 receipt math expressions and 27 receipt local links. The earlier 466-expression chapter count preceded the last notation/prose amendments and is superseded.
- Arithmetic instrument below: thirteen witness groups passed after an equality/rejection control. These are elementary algebra checks against the derivations above, not simulations or physical measurements.
- Initial strict content validation, after chapter repairs but before this receipt: `node scripts/validate-content.mjs --check --strict` exited zero with 0 errors, 0 warnings, and 30 notes.
- Generated-equation check, repeated during closeout: `node scripts/build-equation-mapping-corpus.mjs --check` exited one and reported stale `content/generated/equation-mapping/corpus-equations.json` while scanning 199 chapters and 4685 display equations. No regeneration was performed. Deferred exact command: `node scripts/build-equation-mapping-corpus.mjs --write`. This check establishes drift, not which concurrent edit accounts for every registry difference.
- Scoped chapter whitespace check: `git --no-optional-locks diff --check -- content/markdown/aaa/cosmology/expansion-mechanism.md` exited zero.
- Immutable-baseline whitespace check: `git --no-optional-locks diff --check 72847589ba73d0bf81d07ca5b27d98072659cee9 -- content/markdown/aaa/cosmology/expansion-mechanism.md` exited zero. The new receipt's `git --no-optional-locks diff --no-index --check -- /dev/null reference/priorities/aaa-corpus-rewrite/evidence/crw-005-expansion-mechanism-review-2026-09-12.md` returned one with no whitespace diagnostics; both files independently passed the whitespace assertions above.
- Two-file strict validation: `node scripts/validate-content.mjs --check --strict` exited zero with 0 errors, 0 warnings, and 30 notes after the receipt existed. The final closeout rerun uses the same command.
- `rg -c '^### EXP-[0-9]+ — High —'` and the corresponding Medium pattern on this receipt returned 12 and 8. The syntax instrument measured preservation of 117 equation identities, 34 headings, and 135 original links, with exactly ten intentionally changed TeX bodies; the table above lists their identities and source lines.

KaTeX success establishes parsing, not visual typesetting or mathematical truth. Local-link checks establish path existence, not all HTTP responses or dynamic fragments. Equation identity preservation is separate from generated registry freshness. Repo-wide checks observe concurrent files and are not a claim of checkout exclusivity.

Final chapter SHA-256, measured by `shasum -a 256` after the last chapter repair:

```text
08e09f9d940c47c4f3af41f524f0dd8eb6d9f8759350e80490fd87bf1a2dcfc0
```

### Reproducible scoped syntax and preservation instrument

Run the following from the repository root using `node --input-type=module` on standard input. It writes no files. Fenced examples are ignored by the math/link inspection; invalid TeX and missing paths are tested deliberately before the target is read.

```js
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import katex from 'katex';
import {marked} from 'marked';
import {parseCorpusDisplayEquations} from './scripts/build-equation-mapping-corpus.mjs';
const strip=s=>s.replace(/^\s*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\s*\1\s*$/gm,'').replace(/`+[^`]*`+/g,'');
const maths=s=>{const t=strip(s),pattern=/\$\$([\s\S]*?)\$\$|(?<![\\$])\$([^$\n]+)\$|\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g;
 const matches=[...t.matchAll(pattern)],remainder=t.replace(pattern,'');
 assert(!/(?<!\\)\$|\\[()[\]]/.test(remainder),'unpaired math delimiter');
 return matches.map(m=>({tex:m[1]??m[2]??m[3]??m[4],display:m[1]!==undefined||m[4]!==undefined}));};
const links=s=>{const out=[];marked.walkTokens(marked.lexer(s),t=>{if(t.type==='link'||t.type==='image')out.push(t.href)});return out};
const headings=s=>[...strip(s).matchAll(/^(#{1,6})[ \t]+(.+)$/gm)].map(m=>m[0]);
const localExists=(file,l)=>fs.existsSync(path.resolve(path.dirname(file),decodeURIComponent(l.split(/[?#]/)[0])));
const sample='# Control\n\nInline $x+1$.\n\n$$\nx^2\n$$\n\n[View →](../../../../equation-mapping.html#control)\n\n[local](AGENTS.md)\n\n~~~md\n$bad$ [ignore](missing)\n~~~\n';
assert.deepEqual(maths(sample).map(x=>x.tex.trim()),['x+1','x^2']);
assert.deepEqual(maths('\\(y\\) and \\[z^2\\]').map(x=>[x.tex,x.display]),[['y',false],['z^2',true]]);
assert.throws(()=>maths('Unclosed $x'));assert.throws(()=>maths('Unclosed $$\nx'));assert.throws(()=>maths('Unclosed \\(x'));
assert.equal(links(sample).length,2);
assert.throws(()=>katex.renderToString('\\frac{1}{',{throwOnError:true}));
assert.equal(parseCorpusDisplayEquations('content/markdown/aaa/cosmology/control.md',sample)[0].existingLink.semanticId,'control');
assert.deepEqual(headings(sample),['# Control']);
assert(localExists('content/markdown/aaa/cosmology/control.md','../../../../AGENTS.md'));
assert(!localExists('content/markdown/aaa/cosmology/control.md','../../../../AGENTS.md/missing'));
console.log('KNOWN-CASE CONTROLS PASS before target read: math, fences, links, headings, equation IDs, missing-path and invalid-TeX rejection.');
const chapter='content/markdown/aaa/cosmology/expansion-mechanism.md';
const report='reference/priorities/aaa-corpus-rewrite/evidence/crw-005-expansion-mechanism-review-2026-09-12.md';
const baseline=execFileSync('git',['show','72847589ba73d0bf81d07ca5b27d98072659cee9:'+chapter],{encoding:'utf8'});
assert.equal(createHash('sha256').update(baseline).digest('hex'),'518f9a139f1844c7ccae0f262c3062323ec10f3fc8ff6765d8150dbe50faaf05');
const live=fs.readFileSync(chapter,'utf8');
assert.deepEqual(headings(live),headings(baseline));
for(const href of links(baseline))assert(links(live).includes(href),'lost original link '+href);
assert(!links(live).some(l=>l.includes('reference/priorities')));
const a=parseCorpusDisplayEquations(chapter,baseline),b=parseCorpusDisplayEquations(chapter,live);
assert.deepEqual(a.map(x=>x.existingLink?.semanticId),b.map(x=>x.existingLink?.semanticId));
assert.equal(a.length,117);
assert.equal(a.filter((x,i)=>x.tex!==b[i].tex).length,10);
console.log(JSON.stringify({equations:a.length,headings:headings(live).length,originalLinksPreserved:links(baseline).length,changed:a.flatMap((x,i)=>x.tex===b[i].tex?[]:[{id:x.existingLink.semanticId,baselineLine:x.startLine,finalLine:b[i].startLine,before:x.tex,after:b[i].tex}])}));
for(const file of [chapter,report].filter(f=>fs.existsSync(f))){
 const s=fs.readFileSync(file,'utf8'),mm=maths(s);
 for(const x of mm)katex.renderToString(x.tex,{throwOnError:true,displayMode:x.display,strict:'error'});
 const ll=links(s).filter(l=>!/^([a-z][a-z0-9+.-]*:|#)/i.test(l));
 for(const l of ll){assert(!path.isAbsolute(l));assert(localExists(file,l),'missing '+l)}
 assert(!/[ \t]+$/m.test(s),'trailing whitespace');
 console.log(JSON.stringify({file,mathExpressions:mm.length,localLinks:ll.length,katex:'pass',whitespace:'pass',paths:'pass',sha256:createHash('sha256').update(s).digest('hex')}));
}
```

### Reproducible arithmetic witnesses

Run with `node --input-type=module` on standard input. The scalar speed convention is $c_f=1$; comparison coefficients do not identify other channels with that speed. Closed-form reasoning above is the reference for these assertions.

```js
import assert from 'node:assert/strict';
const near=(a,b)=>assert(Math.abs(a-b)<=1e-12*Math.max(1,Math.abs(a),Math.abs(b)),a+' != '+b);
near(1/2,0.5); assert.throws(()=>near(1,2));
console.log('KNOWN-CASE CONTROL PASS: equality accepts 1/2 = 0.5 and rejects 1 = 2, before witnesses.');
const cf=1; assert.equal(cf,1);
const checks=[];
let e0=10,zp=1,er=e0/(1+zp),dg=er-e0,sea=5;
near(dg,-e0*zp/(1+zp));near(dg+sea,0);near((e0-er)+sea,10);checks.push('signed photon energy');
const z=1,da=1,L=4*Math.PI,dl=(1+z)**2*da;
near(L/(4*Math.PI*dl**2),1/16);near(L/(4*Math.PI*da**2*(1+z)**4),1/16);checks.push('flux reciprocity');
const r=2,lr=.5,w=0,other=2,N=8,b=3*r*lr*(1+w),h=(N-b*other)/(1+b);
near(h,.5);near(h,N-b*(h+other));assert.notEqual(N/(1+b),h);checks.push('total versus partial Hubble rate');
const qSecond=x=>12*x*x,shiftedQSecond=(x,a)=>12*x*x+24*a*x+12*a*a;
near(shiftedQSecond(.3,.7),qSecond(.3+.7));
const diffusion=.5,time=1,variance=1+2*diffusion*time,x=.4;
const gaussian=Math.exp(-x*x/(2*variance))/Math.sqrt(2*Math.PI*variance);
const dtGaussian=diffusion*gaussian*(x*x/variance**2-1/variance);
const dxxGaussian=gaussian*(x*x-variance)/variance**2;
near(dtGaussian,diffusion*dxxGaussian);near(variance,2);assert(variance>1);checks.push('diffusion commutes with translations but grows variance');
const dot=(a,b)=>a.reduce((n,x,i)=>n+x*b[i],0);
near(dot([1,0,0],[1,0,0]),dot([0,1,0],[0,1,0]));near(dot([1,0,0],[1,0,0]),1);checks.push('allowed scalar spatial gradient');
const D=.2,a=2,bb=3,c=4,integral=a*D+bb*D**2/2+c*D**3/3;
near(integral-a*D-bb*D**2/2,D**3*(2*c)/6);checks.push('integrated Taylor remainder');
near(1+1.1*Math.cos(Math.PI),-.1);near((-2*3)/(-2),3);checks.push('positive scale and signed distance inverse');
const Y=0,Z=Math.log(2)+Y;
near(Z,Math.log(2));assert.notEqual(Y,Z);checks.push('propagation versus full budget');
const nu0=10,gE=2,gR=1;
near(nu0*gR/gE,5);near(nu0*(5/nu0)*gR/gE,2.5);checks.push('source clock double counting');
const J=x=>1;near(J(1)-J(0),0);assert.notEqual(J(.5),0);
const number=t=>Math.exp(-t);near(number(0),1);near(number(1),.36787944117144233);assert(number(1)<number(0));
const candidateA=state=>state.current+state.source;near(candidateA({current:0,source:2}),2);checks.push('steady boundary current and number sink');
const n=(nu,temp)=>1/Math.expm1(nu/temp);
near(n(3/2,4/2),n(3,4));checks.push('Planck occupation dilation');
near((2**-4)**(-1/3),2**(4/3));assert.notEqual((2**-4)**(-1/3),2);checks.push('energy-density scale exponent');
const beta=.6,dv=1-beta,gamma=1/Math.sqrt(1-beta**2);
near(dv*gamma,Math.sqrt((1-beta)/(1+beta)));near(dv*gamma,.5);checks.push('launch and clock product');
console.log(JSON.stringify({cf,passed:checks.length,checks,scope:'analytic bookkeeping witnesses only; no physical evolution'}));
```

## Remaining obligations and closure limits

| Status | Obligation | Evidence needed |
| --- | --- | --- |
| ○ Open | Constitutive transport and physical branches | Admitted assembly/photon/sea histories deriving the clock, launch, and path maps with the same causal-history inputs |
| ○ Open | Energy conservation and storage | Nonoverlapping kinetic/history/medium functionals, independently extracted exchange and boundary currents, and controlled long-time storage |
| ○ Open | Thermal, angular, phase, and cadence response | A phase-space/beam map and independent predictions satisfying spectral shape, image, travel-time, and arrival-cadence constraints |
| ○ Open | Cosmological comparison | Matched distance/ruler/time maps, declared source and selection calibrations, and held-out multi-observable predictions |
| ○ Open | Downstream assurance | Owner review of dependent code, mock inputs, adjacent cosmology chapters, and generated records under their own authority |
| ○ Pending coordinator | Shared CRW-005 disposition | Review this two-file diff, verify the final hash, and integrate the local findings into the shared board and records |

No physical branch existence, EOM solver acceptance, invariant theorem, empirical cosmological recovery, theory closure, or downstream closure is established here. No bounded two-file repair blocker is known; the generated registry is a deferred reproducible output, and shared integration belongs to the coordinator.

The next concrete step is coordinator verification of this receipt and final chapter hash, followed by the authorized shared disposition. Scientific follow-on work starts with the common clock/transport/energy construction, not a fit whose coefficients already encode the desired redshift.
