# CRW-005 Receiver Velocity and Work — Review and Repair

## Assignment and source identity

This is the implementation-owner assurance review for CRW-005 item 12, [Receiver velocity and work](../../../../content/markdown/aaa/validation/simulations/action-energy/receiver-velocity-and-work.md). The operator authorized immediate safe repairs in that chapter and this report only. HQ owns shared-board integration. The review follows the [maintained review skill](../../../op/skills/skill-architrino-review.md), [Corpus Reviewer](../../../office-of-research/cto/prompts/corpus-reviewer.md), and the CRW-005 independent-assurance section of the [work queue](../work-queue.md); the explicit implementation assignment supersedes the procedure's default report-only boundary.

The complete 29-line chapter was read with `cat` and `nl -ba`. `shasum -a 256` measured its initial SHA-256 as `4e71b3605b2819fd4b9a80834093b6ad226a810a3209fe0e60e05696919a367d`; `git rev-parse HEAD` returned `4a8e760bae44dbc868714e579ba60779ae0be9d2`. Scoped `git diff` and `git --no-optional-locks status --short` returned no changes for the two authorized paths, and a destination-existence check found no report at this path. All original line references below refer to that chapter hash. The board read at `corpus-review-status.md` listed the assigned chapter as item 12, unread; that is routing evidence, not a current scientific verdict.

The pre-conversion source is Git object `c973402b9^:content/markdown/aaa/validation/simulations/action-energy/receiver-velocity-and-work.md`, SHA-256 `4f0f199f53e6e8e8dfaef806769f9bfb180dc29df00fc3b804e13de0f019751b` by `git show ... | shasum -a 256`. The complete `git diff c973402b9^ c973402b9 -- <chapter>` shows the conversion added the architrino clue/link and integrated the closing explanation into the opening. It preserved the displayed equation, viewer ID, work statements, and final trend statement. This comparison establishes that the issues below were present before that conversion; it does not attribute their original introduction or authorship.

## Live mathematical authorities

The review uses the current academic edition 1.1 and the mathematical and terminology guides. The historical conversion ledger records edition 1.0. Dependency reads covered the relevant foundation definitions, canonical acceleration law, causal-root and self-hit domains, kinetic-scalar/work account, and action/history-energy boundaries. These are dependency checks, not additional completed chapter reviews.

| Owner | Relevant authority | SHA-256 at review read, measured by `shasum -a 256` |
| --- | --- | --- |
| [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) | Signed acceleration, transmitter Jacobian, playback, total roots, and excluded coincidence | `bb7357868a4f900aa566b8a43107d111dcd435cab677361f9bba3dceaadb384b` |
| [Energy](../../../../content/markdown/aaa/dynamics/energy.md#workenergy-relation-and-per-hit-power) | Optional quadratic kinetic chart and general speed-dependent kinetic scalar | `0916f6bf30d4944b41b0c02b55dc1403740ef46a4f9263a32d2b15bcf82c59b2` |
| [Causal Action Functional](../../../../content/markdown/aaa/dynamics/causal-action-functional.md#reduced-branch-certificate-targets) | Sign-blind statistic is not a proved variational generator; work reconstruction is not independent conservation | `7e585c26bd6702dcb01efbf329431ae17295d3293d19d373816c7c28657d62dd` |
| [Delay Dynamics Energy](../../../../content/markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md#work-integral-route) | Root-resolved power, work reconstruction, motion residual, and boundary/continuation obligations | `26de0339f1aa7a5b0997a53e557e2e9daf03e0038c3e33eb8117cf9d0acac665` |

The independent reference for the mathematical claims is the explicit Euclidean chain-rule derivation and exact prescribed-path witnesses below. A separate read-only agent, **receiver mathematics audit**, stable tool ID `/root/receiver_math_audit`, checks those derivations; agent agreement alone is not independent mathematical evidence. No standard-physics law, external observational datum, or physical mass is used as a substrate premise. Under [About Architrino](../../../../content/markdown/aaa/archie/about-architrino.md#sources-references-and-attribution), the elementary derivations require their premises and reasoning rather than ornamental external citations.

## Findings and dispositions

Legend: ✓ Done; ◐ Partial; ○ Not done. All six rows below are within the authorized repair scope. There are five demonstrated mathematical or definitional findings and one explanatory improvement. The regular-hit acceleration direction, polarity sign, and signed dot-product power in the original are preserved strengths.

| ID | Importance and original location | Finding and smallest repair | Disposition |
| --- | --- | --- | --- |
| RVW-1 | Medium; lines 3–21 | The per-hit derivative notation does not state that the line is held fixed. It is valid as an instantaneous acceleration projection, but a moving-basis derivative includes direction-change terms. Define the restricted derivative and show the ordinary derivatives separately. | ✓ Done; chapter lines 11–37 |
| RVW-2 | Medium; lines 28–29 | Receiver radial velocity alone does not determine delayed-distance change or later strength. Replace the general trend with the causal-branch derivative and retain the fixed-transmitter special case. | ✓ Done; chapter lines 65–82 |
| RVW-3 | Medium; lines 3–12 and 26 | The chapter uses an undefined sharp weight without stating its simple-root domain or admitting/excluding self roots. Define the delayed chord, retained history, positive delay/separation, transmitter Jacobian, and playback distinction. State endpoint/singular limits. | ✓ Done; chapter lines 3–7 |
| RVW-4 | Medium; line 25 | An unqualified derivative of the receiver's kinetic proxy is assigned to one hit. The derivative uses the total actual acceleration; one hit supplies one summand only, and a prescribed path can have a nonzero motion residual. Separate these statements explicitly. | ✓ Done; chapter lines 43–45 |
| RVW-5 | Medium; line 25 | “Must … use” a universal quadratic conversion excludes the general kinetic chart allowed by Energy. Make the quadratic chart optional and identify the general chain-rule coefficient, without deriving primitive physical energy. | ✓ Done; chapter lines 47 |
| ERVW-1 | Low; lines 23–26 | The fixed-transmitter potential comparison leaves the sign and reference value implicit. Give the signed radial work integral and potential difference in the chosen quadratic chart, then preserve the general history-energy limitation. This is an explanatory improvement, not a demonstrated sign error in the original dot product. | ✓ Done; chapter lines 49–63 |

## Derivations and falsifiers

### RVW-1: fixed projection versus a turning line

Let $\mathbf n=\hat{\mathbf r}$ be the unit delayed chord, $\mathbf V$ the receiver velocity, $V_r=\mathbf V\cdot\mathbf n$, and $\mathbf V_\perp=\mathbf V-V_r\mathbf n$. Write a dot for the total derivative with respect to reception time along a smooth causal-root branch. Direct differentiation, using $\mathbf n\cdot\dot{\mathbf n}=0$, gives

$$
\dot V_r=\mathbf A_{\mathrm{tot}}\cdot\mathbf n+\mathbf V\cdot\dot{\mathbf n},
\qquad
\dot{\mathbf V}_\perp
=\mathbf A_{\mathrm{tot}}-(\mathbf A_{\mathrm{tot}}\cdot\mathbf n)\mathbf n
-(\mathbf V\cdot\dot{\mathbf n})\mathbf n-V_r\dot{\mathbf n}
$$

Here $\mathbf A_{\mathrm{tot}}=\dot{\mathbf V}$ is the actual acceleration. A radial hit contributes zero to the first two terms of the transverse derivative after projection; it does not eliminate the two basis-motion terms. The existing restricted equation is retained with its intended frozen-direction meaning defined, so no change to the canonical acceleration law is involved.

An exact geometric witness is a fixed transmitter at the origin and prescribed receiver path $\mathbf X(T)=(1,T,0)$, with $c_f=1$. The causal root is $T_t=T-\sqrt{1+T^2}$ and is simple. At $T=0$, $\mathbf V=(0,1,0)$, $\mathbf n=(1,0,0)$, $\dot{\mathbf n}=(0,1,0)$, and actual acceleration is zero. Nevertheless $\dot V_r=1$ and $\dot{\mathbf V}_\perp=(-1,0,0)$. This is a prescribed-path check of coordinates, not an EOM trajectory or a transverse primitive acceleration.

Claim grade: derived. Falsifier: a differentiable unit chord and velocity violating the two product-rule identities above. The original statement is not rejected when explicitly read as a fixed-direction per-hit projection; its missing domain is the finding.

### RVW-2 and RVW-3: causal playback and strength

Let $g=r-c_f(T_r-T_t)$, $v_t=\mathbf V_o(T_t)\cdot\mathbf n$, $V_r=\mathbf V_{o'}(T_r)\cdot\mathbf n$, $D_t=c_f-v_t$, and $D_r=c_f-V_r$. At an interior simple root, $\partial_{T_t}g=D_t\ne0$ and $\partial_{T_r}g=-D_r$. Differentiating $g=0$ gives $m=dT_t/dT_r=D_r/D_t$. The changing chord therefore obeys

$$
\dot{\mathbf r}=\mathbf V_{o'}-m\mathbf V_o,
\qquad
\dot r=V_r-mv_t=\frac{c_f(V_r-v_t)}{D_t},
\qquad
\dot{\mathbf n}=\frac{\dot{\mathbf r}-\dot r\mathbf n}{r}
$$

The acceleration magnitude for a fixed-polarity pair is $\|\mathbf A_{o'\leftarrow o}\|=\kappa|q_oq_{o'}|c_f/(r^2|D_t|)$. On a smooth branch with $D_t\ne0$, its logarithmic derivative is

$$
\frac{d}{dT_r}\log\|\mathbf A_{o'\leftarrow o}\|
=-2\frac{\dot r}{r}-\frac{\dot D_t}{D_t}
$$

Both distance and transmitter-weight evolution matter. This derivative does not cross a caustic, a coincidence, or a retained-history boundary; a finite sum also requires root coverage and integrability. A self-hit has the same identity at two different times and $\sigma_{q_oq_o}=+1$; the zero-delay root is excluded by $H(0)=0$, which supplies no continuation rule through its birth.

An exact normalized counterexample uses prescribed line paths $\mathbf X_o(s)=(-1-s/2,0,0)$ and $\mathbf X_{o'}(T)=(2-T/4,0,0)$ near $T=0$. The branch has $T_t=5T/6-2$, $r=2+T/6$, $D_t=3/2$, and $W^{\mathrm{acc}}=2/3$. The receiver has $V_r=-1/4$, yet $\dot r=1/6>0$ and the inverse-square contribution weakens. With the comparison normalization $\kappa|q_oq_{o'}|=1$, its magnitude at zero is $1/6$ and derivative is $-1/36$. This algebraic witness disproves the claimed inference from $V_r<0$ on arbitrary supplied regular histories; it does not exhibit a solved physical trajectory.

Claim grade: derived. Falsifier: a regular root violating implicit differentiation of $g=0$, or an arithmetic error in the explicit path witness. The simpler inward/stronger rule is valid for a stationary transmitter over the entire sampled emission interval, where $v_t=0$, $D_t=c_f$, $W^{\mathrm{acc}}=1$, and $\dot r=V_r$.

### RVW-4 and RVW-5: a kinetic choice and an evolved trajectory

For the defined scalar $K_{\mathrm{spec}}=\tfrac12\|\mathbf V\|^2$, the chain rule gives $\dot K_{\mathrm{spec}}=\mathbf V\cdot\dot{\mathbf V}$. If the modeled sum is $\mathbf A_{\mathrm{sum}}=\sum_h\mathbf A_h$, where $h$ labels every retained transmitter/root contribution, define the motion residual $\mathbf R^A=\dot{\mathbf V}-\mathbf A_{\mathrm{sum}}$. Then

$$
\dot K_{\mathrm{spec}}=\sum_h\mathbf A_h\cdot\mathbf V+\mathbf R^A\cdot\mathbf V
$$

Thus each hit is one power summand. The sum equals the actual derivative when the same supplied path satisfies the complete modeled acceleration law. For example, $\mathbf V=(1,0,0)$ with modeled hits $(2,0,0)$ and $(-1,0,0)$ gives hit powers $2$ and $-1$, and total modeled power $1$. The first hit's power cannot stand for the total derivative. If the supplied path instead has constant velocity, its actual power is zero and the residual contributes $-1$.

A positive constant $\mu_{\mathrm{arch}}$ defines the optional quadratic chart $K_\mu=\mu_{\mathrm{arch}}K_{\mathrm{spec}}$. For a differentiable isotropic scalar $K(s)$ at nonzero speed $s=\|\mathbf V\|$, the general coefficient is $\mu_K(s)=K'(s)/s$. A continuous extension at rest needs separate regularity. As a mathematical witness, $K(s)=\alpha s^4/4$ with a fixed positive coefficient $\alpha$ of the required units gives $\mu_K(s)=\alpha s^2$, which is not a universal constant. This witness checks the chain rule; it asserts neither that this candidate is realized nor that a universal physical kinetic scalar exists.

Claim grade: derived for the chain-rule identities; guessed for a physical interpretation of any uncalibrated kinetic choice. Falsifier: a differentiable $K$ violating the stated chain rule, or independently certified branch evidence establishing a unique physical kinetic chart and its energy map. The original signed power is correct: $\mathbf A_h\cdot\mathbf V=\sigma_h\|\mathbf A_h\|V_r$, so orthogonality gives zero instantaneous power without giving zero future work.

### ERVW-1: signed fixed-transmitter work

For a stationary transmitter on the complete sampled history and one admitted partner root, $W^{\mathrm{acc}}=1$ and $\dot r=V_r$. On a positive-separation interval with endpoints $r_a$ and $r_b$, the delivered quadratic-proxy work is

$$
\int_{T_a}^{T_b}\mu_{\mathrm{arch}}\mathbf A_h\cdot\mathbf V\,dT
=\mu_{\mathrm{arch}}\kappa\sigma_h|q_oq_{o'}|
\left(\frac1{r_a}-\frac1{r_b}\right)
=-\Delta U,
\qquad
U(r)=\frac{\mu_{\mathrm{arch}}\kappa\sigma_h|q_oq_{o'}|}{r}+C
$$

Here $C$ is a fixed additive reference. This follows by integrating $\dot r/r^2=-d(1/r)/dT$, even if the radius reverses direction while staying positive. For attraction and inward motion the work is positive. With $c_f=1$, comparison scales $\mu_{\mathrm{arch}}=\kappa|q_oq_{o'}|=1$, $\sigma_h=-1$, $r_a=2$, and $r_b=1$, the work is $1/2$ and $\Delta U=-1/2$.

This is delivered work from one benchmark contribution. It gives the receiver's total kinetic-proxy change if that contribution supplies the entire actual acceleration. In the general case, include the work of the remaining contributions and any acceleration residual; equality with this single contribution requires their combined integrated power to vanish. Holding the transmitter fixed is prescribed input; no two-body equilibrium, self-hit absence for an arbitrary receiver history, or isolated-system conservation follows. For a moving history, the independent energy account must retain its own history and boundary terms. Defining an interaction entry as minus the trajectory work makes a sum constant by construction and proves no independent conserved quantity.

Claim grade: derived on the stated benchmark. Falsifier: a positive-separation stationary-transmitter history for which the integral and endpoint expression differ, with the same polarity and units.

## Open obligations and limits

| ID | Status and obligation | Reopening evidence or falsifier |
| --- | --- | --- |
| ORVW-1 | ○ Open: an independently constructed physical kinetic/wake/boundary energy account | A compatible action variation or independent wake balance on the same history, with matching work and controlled boundaries, would establish a stronger conservation claim. A persistent unmatched residual rejects that construction. |
| ORVW-2 | ○ Open: complete root coverage and continuation through singularities, coincidence, or memory-edge events | Supply an independently checked complete root record and finite continuation/limit rule; a missed root, lost Jacobian floor, or regulator-dependent limit defeats the corresponding claim. |
| ORVW-3 | ○ Open: evolved-EOM realization, stable assemblies, and physical recovery | Supply a realized branch satisfying the complete acceleration law, followed by its separate stability and observer-map derivations. A nonzero acceleration residual invalidates the proposed trajectory before any stability claim. |

The [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) receiver-component summary and [mathematics style guide](../../../../content/markdown/aaa/archie/mathematics-style-guide.md) repeat the abbreviated projection/trend language. `rg -n` and direct passage reads find those instances; the authoritative root derivatives and acceleration law support the qualified interpretation developed here. Their broader documentation reconciliation is deferred to an authorized owner because this assignment permits only the chapter and this report. No controlled guide or other chapter is edited, and no additional document-review completion is counted.

## Validation and owner-authorized closeout

**✓ Done at the bounded chapter-review, repair, and disposition level for CRW-005 item 12.** RVW-1 through RVW-5 and ERVW-1 are implemented: one false general trend, four mathematical-domain or definition corrections, and one signed-work explanation. No finding is rejected or left partially implemented. ORVW-1 through ORVW-3 remain open scientific obligations; the upstream repeated wording and repository-wide validation failures below are outside this assignment's write scope. This receipt does not establish theory closure, solver certification, or empirical acceptance.

This implementation owner changed exactly the canonical chapter and this evidence report. No shared board, priority, work log, queue, other chapter, generated artifact, or software source was edited by this owner. No staging, commit, push, reset, stash, regeneration, or worktree operation was performed. Scoped `git --no-optional-locks status --short --untracked-files=all -- <chapter> <report>` identifies the chapter as modified and this report as untracked.

The complete revised chapter was reread with `cat`; `wc -l` measured 82 lines and `shasum -a 256` measured SHA-256 `e52f5974f554f1cf29bced6c1b427d47a164666207186cfa513fd6109485ce8a`. The read-only receiver mathematics audit independently rechecked the identities, recommended distinguishing sufficient single-contribution work equality from the general zero-remaining-work condition, and confirmed that correction at this final hash. This was mathematical self-review supported by a separate derivation audit, not an independent physical validation campaign.

### Validation receipt

| Check and instrument | Result and scope |
| --- | --- |
| `git diff --check` | ✓ Pass for the current tracked diff. This does not inspect an untracked report by itself. |
| `git diff --no-index --check -- /dev/null reference/priorities/aaa-corpus-rewrite/evidence/crw-005-receiver-velocity-and-work-review-2026-09-11.md` | ✓ Pass for the complete untracked report, including its closeout and reproduction command. |
| Known-case-first in-memory Markdown/KaTeX/link check, reproduced below | ✓ Pass, reconfirmed after the closeout and reproduction command were appended: chapter 79 expressions, including four displays, and nine local links; report 86 expressions, including five displays, and eleven local links. Chapter six and report five link fragments resolve under the stated heading/explicit-anchor/registry checks. |
| Existing equation and viewer link comparison using `parseCorpusDisplayEquations` against `git show HEAD:<chapter>` | ✓ Pass: the original equation TeX and `corpus-equation-79f5d2581fbf221a` link text are unchanged. The three additional displays now have viewer links. |
| Known-case-first Node mathematical checks | ✓ Pass: derivative and quadrature witnesses compare with the exact derivations in this report. They establish only elementary numerical agreement with those references, not evolved-EOM behavior. |
| `node scripts/validate-content.mjs --check --strict` | Failed, exit 1: latest captured run audited 199 corpus Markdown files and 1,637 repository Markdown files, reporting eight errors, zero warnings, and 30 notes. Every reported error is outside the two authorized paths; exact paths follow. The whole repository is not green. |
| `node scripts/build-equation-mapping-corpus.mjs --check` | Failed, exit 1: latest captured run counted 4,684 display equations and reported a stale `content/generated/equation-mapping/corpus-equations.json`. No missing canonical source links were reported in that run. |

The focused instrument first tested a known string containing two real math spans, one display, one real link, and code containing fake links/math. It also checked a known heading and explicit HTML anchor, and confirmed that invalid KaTeX throws. Only after that recorded pass did it read the chapter and report. Its first trial could not validate this report's newly authored work-queue fragment under its heading-normalization rule; the report uses a file link to that owner instead. This was not treated as a demonstrated defect in the work queue or repaired outside scope.

The finite-difference instrument first returned the known derivative of a linear polynomial, and Simpson quadrature first returned the known integral of a quadratic. Then, with normalized wake speed one, step 0.00001 and derivative tolerance 0.00000001, it measured playback 0.8333333333276903 against 5/6, delayed-distance rate 0.1666666666566563 against 1/6, and strength rate -0.027777777775184195 against -1/36. The turning-line witness returned radial-component rate 0.99999999995 against 1 and transverse-component rate -0.9999999999 against -1. A 1,024-interval Simpson calculation gave attractive work 0.5000000000001172 against 1/2 with tolerance 0.0000000001. The nonquadratic kinetic witness gave 8.00000000025225 against 8. The sign, summed-hit, zero-residual, nonzero-residual, and orthogonal-power cases also passed.

### Repository-wide validation failures outside this edit scope

The latest strict validator reported these eight source/target pairs. Paths are literal evidence rather than links because the target paths were missing at that scan. Their history and causal attribution were not established.

| Source and line, relative to repository root | Missing target, relative to repository root |
| --- | --- |
| `reference/priorities/braid-program/analysis/manuscript-source-coverage.md:367` | `reference/priorities/braid-program/evidence/2026-08-28-f5-unattended-certification-session.md` |
| `reference/priorities/braid-program/evidence/2026-08-28-f5-observation-blocker-successor-prompt.md:17` | `reference/priorities/braid-program/evidence/2026-08-28-f5-unattended-certification-session.md` |
| `reference/priorities/development-process-review/analysis/f5-current-handoff.md:3` | `reference/priorities/development-process-review/evidence/f5-current-handoff/admission.json` |
| `reference/priorities/development-process-review/analysis/f5-remaining-callers.md:46` | `reference/priorities/development-process-review/evidence/f5-remaining-callers/current-api-independent-review.md` |
| `reference/priorities/development-process-review/analysis/f5-remaining-callers.md:56` | `reference/priorities/development-process-review/evidence/f5-remaining-callers/current-build-admission.json` |
| `reference/priorities/development-process-review/analysis/full-root-cover-current-migration.md:7` | `reference/priorities/development-process-review/evidence/full-root-cover-migration/run-f6c-cached-root-cover-full.mjs.20c8d44ee55f.source` |
| `reference/priorities/development-process-review/analysis/root-cover-current-migration.md:11` | `reference/priorities/development-process-review/evidence/root-cover-migration/prepare-current-plans.mjs` |
| `reference/priorities/development-process-review/work-log.md:115` | `reference/priorities/development-process-review/evidence/variable-cell-migration/validation-runs.json` |

The earlier strict scan reported nine errors over 1,640 repository Markdown files. Four earlier missing-target diagnostics concerned the streamed-leaf transport result and three variable-cell migration files; those were absent from the later error list, while the two remaining-callers rows and work-log row appeared. This changing population is recorded as concurrent repository state, without assigning its cause or claiming these files were repaired.

### Generated state and concurrent changes

The first equation-registry check found missing links for new displays, including this chapter's three additions, and a stale registry. Between that check and the focused reread, three viewer links appeared in the chapter and the registry gained their entries without a write call by this implementation owner. The retained IDs are `corpus-equation-7a25c80f14107f73`, `corpus-equation-e50758fe29868a74`, and `corpus-equation-ae727b229e000f82`. The later focused check resolves all four chapter viewer IDs, but ID existence is not registry freshness. The later whole-registry check still reports drift.

The required regeneration command is `node scripts/build-equation-mapping-corpus.mjs --write`, followed by `node scripts/build-equation-mapping-corpus.mjs --check`, for the authorized regeneration/publication owner. Neither write mode nor another generator was run here. No claim is made that all other generated surfaces are current.

Closeout `shasum -a 256` matches the initial Master Equation, Energy, and Causal Action Functional hashes above. Delay Dynamics Energy changed to `1bceeeea7483b1f6666b579f0a3d4c4ef33f24be6f83c86a5ed0fc4e7a3f5157`; the current work-integral, root-resolved, and conservation-residual passages were reread before closeout. They retain the distinction required here between delivered work, actual motion, and independently constructed conservation. These hashes identify read snapshots in a shared checkout, not frozen ownership of other documents.

### Reopening and handoff

Reopen a repaired finding if the chapter changes its root domain, acceleration weight, projection convention, kinetic chart, or history-energy claim; if one of the stated counterexamples or identities fails on its declared domain; or if the focused checks fail against the identified source. Revisit ORVW-1 through ORVW-3 only with their stated constructive evidence. HQ can integrate this bounded completion into the shared CRW-005 board, while keeping the failed global gate and stale registry separate from the chapter's mathematical disposition. No additional chapter is reviewed or started by this receipt.

### Focused reproduction command

Run from the repository root. This command reads source and generated data, prints its known-case results before target results, and writes no files. It checks the actual local link targets and the fragments used by these two documents; it is not a general proof of every renderer's heading behavior.

```bash
node --input-type=module <<'NODE'

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {protectMath} from './.agents/skills/architrino-math-preview/scripts/render-preview.mjs';
import {loadVendoredCommonJsBundle} from './scripts/load-vendored-commonjs-bundle.mjs';
import {parseCorpusDisplayEquations} from './scripts/build-equation-mapping-corpus.mjs';
const md=loadVendoredCommonJsBundle(path.resolve('vendor/markdown-it/markdown-it.min.js'))({html:true});
const katex=loadVendoredCommonJsBundle(path.resolve('apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js'));
const links=text=>{const out=[];const walk=tokens=>{for(const t of tokens){if(t.type==='link_open')out.push(t.attrGet('href'));if(t.children)walk(t.children);}};walk(md.parse(protectMath(text).markdown,{}));return out;};
const slug=v=>v.replace(/`([^`]+)`/g,'$1').replace(/\$([^$]+)\$/g,'$1').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').replace(/-+/g,'-');
const anchors=text=>{const result=new Set();const tokens=md.parse(text,{});for(let i=0;i<tokens.length;i++)if(tokens[i].type==='heading_open')result.add(slug(tokens[i+1].content));for(const m of text.matchAll(/\bid=["']([^"']+)["']/g))result.add(m[1]);return result;};
const known='$T$\n\n$$\n1+1=2\n$$\n\n[good](AGENTS.md) '+String.fromCharCode(96)+'[$bad$](absent)'+String.fromCharCode(96)+'\n\n'+String.fromCharCode(96).repeat(3)+'md\n[bad](absent) $notmath$\n'+String.fromCharCode(96).repeat(3);
assert.equal(protectMath(known).segments.length,2);
assert.deepEqual(links(known),['AGENTS.md']);
assert.equal(parseCorpusDisplayEquations('known.md',known).length,1);
assert(anchors('# Known Heading\n\n<a id="fixed"></a>').has('known-heading'));
assert(anchors('# Known Heading\n\n<a id="fixed"></a>').has('fixed'));
assert(!anchors('# Known Heading').has('absent'));
assert.match(katex.renderToString('1+1=2',{throwOnError:true}),/katex/);
assert.throws(()=>katex.renderToString('\\notacommand',{throwOnError:true}));
console.log('KNOWN CASE PASS before target reads: 2 math spans, 1 display, 1 actual link; literal code ignored; heading and explicit anchors; invalid KaTeX detected.');
const chapter='content/markdown/aaa/validation/simulations/action-energy/receiver-velocity-and-work.md';
const report='reference/priorities/aaa-corpus-rewrite/evidence/crw-005-receiver-velocity-and-work-review-2026-09-11.md';
const registryJson=JSON.stringify(JSON.parse(fs.readFileSync('content/generated/equation-mapping/corpus-equations.json','utf8')));
for(const file of [chapter,report]){
 const text=fs.readFileSync(file,'utf8'), parsed=protectMath(text), failures=[];
 for(const s of parsed.segments)katex.renderToString(s.tex,{displayMode:s.display,throwOnError:true,strict:'error'});
 let count=0, fragments=0;
 for(const href of links(text)){
  if(/^[a-z]+:/i.test(href))continue;
  const [filePart,fragment]=href.split('#');const target=filePart?path.resolve(path.dirname(file),decodeURIComponent(filePart.split('?')[0])):path.resolve(file);
  count++;
  if(!fs.existsSync(target)){failures.push(href);continue;}
  if(fragment){fragments++;if(target.endsWith('.md')){if(!anchors(fs.readFileSync(target,'utf8')).has(decodeURIComponent(fragment)))failures.push(href);}else if(path.basename(target)==='equation-mapping.html'){if(!registryJson.includes('"'+fragment+'"'))failures.push(href);}}
 }
 assert.deepEqual(failures,[]);
 console.log(JSON.stringify({file,math:parsed.segments.length,displays:parsed.segments.filter(s=>s.display).length,localLinks:count,fragments,failures}));
}
const source=fs.readFileSync(chapter,'utf8');
const baseline=execFileSync('git',['show','HEAD:'+chapter],{encoding:'utf8'});
const before=parseCorpusDisplayEquations(chapter,baseline),after=parseCorpusDisplayEquations(chapter,source);
assert.equal(before.length,1);assert.equal(after.length,4);
assert.equal(after[0].tex,before[0].tex);assert.equal(after[0].existingLink.text,before[0].existingLink.text);
console.log(JSON.stringify({originalEquationPreserved:true,originalViewerLinkPreserved:after[0].existingLink.text,newDisplaysAwaitingGeneration:after.filter(b=>!b.existingLink).map(b=>({line:b.startLine,heading:b.heading}))}));
const close=(actual,expected,tol=1e-8)=>assert(Math.abs(actual-expected)<tol,actual+' != '+expected);
const derivative=f=>(f(1e-5)-f(-1e-5))/(2e-5);
const simpson=(f,n=1024)=>{let s=f(0)+f(1);for(let i=1;i<n;i++)s+=(i%2?4:2)*f(i/n);return s/(3*n);};
close(derivative(T=>3*T+4),3);close(simpson(T=>T*T),1/3,1e-12);
console.log('KNOWN CASE PASS before mathematical targets: derivative(3T+4)=3; Simpson integral(T^2,0,1)=1/3.');
const root=T=>5*T/6-2,range=T=>2+T/6,amplitude=T=>(2/3)/range(T)**2;
for(const T of [-.01,0,.01])close((2-T/4)-(-1-root(T)/2)-(T-root(T)),0,1e-12);
const numeric={playback:derivative(root),rangeRate:derivative(range),strengthRate:derivative(amplitude)};
close(numeric.playback,5/6);close(numeric.rangeRate,1/6);close(numeric.strengthRate,-1/36);
close(amplitude(0),1/6,1e-12);
const vr=T=>T/Math.hypot(1,T);
const perp=T=>[-T/(1+T*T),1/(1+T*T)];
numeric.rotatingRadialRate=derivative(vr);numeric.transverseXRate=derivative(T=>perp(T)[0]);
close(numeric.rotatingRadialRate,1);close(numeric.transverseXRate,-1);close(derivative(T=>perp(T)[1]),0);
close(2+(-1),1);close(2+(-1)+(-1),0);
for(const sign of [-1,1])for(const velocity of [-2,0,3])close((sign*2)*velocity,sign*Math.abs(sign*2)*velocity);
numeric.attractiveWork=simpson(T=>1/(2-T)**2);close(numeric.attractiveWork,.5,1e-10);close(simpson(T=>-1/(2-T)**2),-.5,1e-10);
numeric.quarticKineticRate=derivative(T=>(2+T)**4/4);close(numeric.quarticKineticRate,8);
console.log(JSON.stringify({mathematicalWitnesses:'PASS',wakeSpeed:1,centralDifferenceStep:1e-5,derivativeTolerance:1e-8,workQuadratureIntervals:1024,workTolerance:1e-10,...numeric}));

NODE
```
