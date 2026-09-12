# CRW-005 Neutrinos Review — 2026-09-12

Status: ✓ Done — bounded chapter review, repair, complete reread and validation execution completed. The final shared strict-content run has an out-of-scope electron-report link failure; generated equation-registry drift is recorded below. This disposition is not an all-repository validation pass.

This assignment owns only [Neutrinos](../../../../content/markdown/aaa/assemblies/fermions/neutrinos.md) and this evidence report. The operator authorized direct repair of demonstrated defects. Shared review status, queues, other chapters, generated artifacts, and publication operations are outside the write boundary. This is a bounded chapter review and repair; its completion does not establish theory closure or downstream corpus closure.

## Baseline and method

- Measured baseline: `shasum -a 256 content/markdown/aaa/assemblies/fermions/neutrinos.md` returned `b6a3358db239d2a48ae7e343b6fa07b52d561aaa905e2213ad0bc9c3e9532150` before editing; repeated immediately before preparing repairs with the same result.
- Measured baseline chapter length: 291 lines by complete `nl -ba` read. Scoped `git --no-optional-locks status --short -- <chapter> <report>` returned no entries; `test ! -e <report>` confirmed this report did not exist.
- The chapter was read completely. Required Foundations anchors were inspected for ontology, absolute coordinates and time, distinct propagation speeds, complete-state versus observer access, and dynamical chirality. The master-equation canonical acceleration sum and its action/energy and quantum-envelope boundaries were inspected directly.
- Nearby controlling comparisons were [Discrete-Symmetry Structure](../../../../content/markdown/aaa/noether-braid/coincident-axis-three-binary-symmetry.md#discrete-symmetry-structure), [Electroweak Bosons](../../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md#photon-referent-status), and the Archie style and terminology authorities. The former explicitly withholds weak-channel parity and CP recovery from primitive-kernel covariance.
- Read-only supporting agent `crw_005_neutrino_math` uses the `terence-tao` analytical lens to derive the mixing-convention and symmetry-orbit checks. Agent count is not independent physical evidence; the algebraic derivations below are the references. The implementing agent owns final adjudication and self-review.
- No EOM simulation, stability calculation, parameter fit, or new physical numerical instantiation is requested. Any formal numerical control uses normalized wake-speed units with $c_f=1$.

## Repaired findings

Baseline line references below identify the hashed original target. All eight findings are repaired within this chapter; their final locations and falsifiers follow. These are editorial and mathematical dispositions, not completion of the associated physical derivations.

| ID | Severity | Baseline lines | Demonstrated issue and smallest repair |
| --- | --- | --- | --- |
| NU-1 | High | 3–49, 62–64, 133–135 | An unexhibited near-photon branch is described as explaining speed, weak coupling, mass and oscillation; line 64 additionally says the declared family does not bind. Preserve the candidate construction and neutral polarity sum, remove unsupported dynamical verdicts, and state the branch, coupling and response obligations. A common phase alone cannot establish group speed or electric response. |
| NU-2 | High | 137–149 | Polarity-dipole handedness is identified with effective helicity/chirality, and kernel covariance is promoted to a derived weak selection rule and effective CP conservation. Preserve the sign transformation, distinguish the quantities, and require a retained branch and source/detector transaction map. |
| NU-3 | High | 66–109 | An oscillation phase correction is equated to exposed internal energy without a map or absolute offset, and internal conservation is asserted without history/boundary closure. Retain the identification and closed-account conservation as conditional hypotheses; define normalization, projector, positivity and offset obligations. The initial dimensional-error concern was rejected after checking normalized absolute time; the residual equation is preserved. |
| NU-4 | High | 163–204 | The ket convention and flavor-basis matrix cannot both use the displayed $U$ for general complex mixing. Choose $H=U\Lambda U^\dagger$, conjugate the flavor-ket coefficients and adjust the CP-odd probability sign consistently. |
| NU-5 | Medium | 111–133, 175–188, 218–260 | Three residual modes are not a derived inventory of the six binaries in the two-braid candidate; Hermiticity, basis, coherent propagation, observer units and nonuniform matter evolution are incompletely specified. Declare a three-mode reduction, real matrix parameters, the observer mapping and the domain of the vacuum/constant-matter formulas. |
| NU-6 | High | 268–276 | A nonzero C-odd sign establishes configuration distinctness only; it neither guarantees four distinct group images nor a Dirac field nor lepton-number conservation. Retain that exact conditional result and state the additional observer-identification and reaction-symmetry obligations. |
| NU-7 | High | 278, 291 | The black-box implication is extended to force C-even geometric handedness and remove exact CP. Neither conclusion follows. Retain the effective Majorana-component implication under its assumptions; separate it from substrate marker parity and CP covariance. |
| NU-8 | Medium | 266–267, 279–291 | An illustrative small-mass normal-ordering benchmark is treated as a universal discriminator, a sterile branch is tied to dark-matter completion, and numerical comparison/source provenance is missing. Label the benchmark and conditional cosmology scope, separate sterile and dark-matter tests, and cite inspected source material where consequential. |

## Mathematical evidence

Claim grade: derived, conditional linear algebra. For orthonormal flavor basis vectors and $H=U\Lambda U^\dagger$, the eigenvectors are the columns of $U$, so $|\nu_\alpha\rangle=\sum_iU_{\alpha i}^*|\nu_i\rangle$. The transition amplitude is $A_{\beta\alpha}=\sum_iU_{\beta i}U_{\alpha i}^*e^{-i\lambda_i L/(2E)}$. With $K_{ij}=U_{\alpha i}U_{\beta i}^*U_{\alpha j}^*U_{\beta j}$ and $\Delta_{ij}=(\lambda_i-\lambda_j)L/(4E)$, the cross term is $2\Re(K_{ij}^*e^{-2i\Delta_{ij}})=2\Re K_{ij}\cos(2\Delta_{ij})-2\Im K_{ij}\sin(2\Delta_{ij})$. Unitarity gives the usual Kronecker term and the negative imaginary term. Falsifier: a complex unitary matrix with these definitions for which this expansion disagrees with the amplitude squared. A real two-flavor example cannot test the imaginary sign.

Claim grade: derived, exposure-map limitation. For a normalized state and a dimensionless orthogonal projector, $\Pi_W^2=\Pi_W$ gives $\langle\psi|\Pi_W(H+aI)\Pi_W|\psi\rangle=\mu_{\nu,W}^2+a\langle\psi|\Pi_W|\psi\rangle$. A common real spectral offset therefore changes the proposed energy-facing account while preserving every eigenvalue gap and vacuum flavor probability. Positivity requires a nonnegative operator on the exposed subspace; Hermiticity alone supplies reality. Falsifier: an independently calibrated absolute operator and exposure-energy map remove this ambiguity for the specified branch. The projected expectation is deliberately not divided by the projected-state norm: it already includes exposure weight.

Rejected candidate, preserved for review provenance: the original residual was initially suspected to add energy to energy/time. The live [Absolute Time dimensionalization](../../../../content/markdown/aaa/foundations/absolute-time.md#dimensionalization), lines 93–143, and Mathematics Terminology, line 10, normalize $T$ by $\hat T=T_0T$. Consequently $dE/dT$ has energy units. The chapter now states that local convention and the factor $T_0$ needed when differentiating with respect to dimensional time; no residual rescaling or new tolerance scheme was introduced.

Claim grade: derived, group-action counterexample. Let configurations be the two signs $x\in\{+1,-1\}$ and let both $C$ and $P$ act by $x\mapsto-x$. Then $\chi(x)=x$ is C-odd and P-odd, while $CP$ fixes every configuration. The orbit has two members, although the sign has exactly the character asserted in the baseline. Thus the character does not prove a four-member orbit. More generally, $\chi(Cx)=-\chi(x)\ne\chi(x)$ proves $Cx\ne x$ on the complete configuration space only. A many-to-one observer map can identify these configurations; a field-level Majorana condition is not the requirement that every microscopic configuration be pointwise C-fixed. Falsifier: extra assumptions proving the observer map separates the images and the physical branch orbit has trivial stabilizer. No such assumptions or proof appear in the baseline argument.

Claim grade: derived, independence boundary. Covariance under a discrete operation maps solutions to solutions. It supplies neither a continuous lepton-number symmetry nor an additive conserved lepton charge. A reaction-account conservation theorem and a mass/field map are additional obligations. The live symmetry chapter itself keeps effective weak selectivity and CP recovery open.

Claim grade: derived, propagation limitation. A scalar phase rate contributes a common factor $e^{-i\omega_{\nu0}T}$, which cancels in every flavor probability. If independent of wave number, that offset has zero dispersion derivative even when arbitrarily large. This directly defeats the baseline inference from a large common term to high speed. A dispersion derivative is only an effective comparison here; the physical assembly needs its own group-motion and observer travel-time map.

The mixing sign also has an independent exact witness. With indices $\alpha,i\in\{0,1,2\}$ solely for this formal example, set $\omega=e^{2\pi i/3}$ and $U_{\alpha i}=\omega^{\alpha i}/\sqrt3$. Choose eigenphase factors $(1,\omega^{-1},\omega^{-2})$. Then the amplitude for $0\to1$ under $H=U\Lambda U^\dagger$ is $\sum_i\omega^i\omega^{-i}/3=1$. The original ket convention instead gives $\sum_i\omega^{-2i}/3=0$. The real part of the probability is $1/2$; the imaginary term distinguishes the two signs. This is a symbolic roots-of-unity counterexample, not an EOM calculation. The no-mixing identity matrix and a real two-state rotation give the expected no-transition and $\sin^2(2\theta)\sin^2\Delta$ controls, but cannot expose the complex sign error on their own.

## Final locations, consequences and falsifiers

All final line references below are in the chapter at SHA-256 `ee219810d2e4a46e911ae72acae88b001005def722b8cd8bf8a5b677921db2cf`.

| ID and disposition | Final lines | Why the repair matters; grade and reopening test |
| --- | --- | --- |
| NU-1 — ✓ Done | 3–58, 129–131 | Prevents a candidate shape or scalar phase offset from being reported as physical propagation, mass or interaction evidence. Derived logical limitation, with guessed assembly identification retained. Reopen upon a retained branch and independent speed/response derivation; mere visual proximity is insufficient. |
| NU-2 — ✓ Done | 133–141 | Prevents an invariant of polarity labels from being counted as a measured weak spinor selection rule or exact effective CP. Derived sign bookkeeping, guessed physical map. Reopen with a retained nonzero marker, observer spin map and source/detector rates; a contrary rate or a degenerate marker rejects that realization. |
| NU-3 — ✓ Done | 60–105 | Separates phase energy from exposed energy and conservation, fixing the risk of silently fitting an absolute physical quantity using only gaps. Derived offset/positivity limitation, guessed physical identification. Reopen with a calibrated operator and a closed account of wake/history/medium exchange; a residual above declared tolerance falsifies the proposed identification. |
| NU-4 — ✓ Done | 153–206 | Makes the matrix, flavor kets and probability one consistent complex convention. Derived by amplitude expansion and the Fourier witness. Reopen if that exact amplitude fails to reproduce the displayed formula for an admissible unitary matrix. |
| NU-5 — ✓ Done | 107–129, 155–169, 210–254 | Prevents three collective modes from becoming a missing-constituent inventory or an assumed observer dynamics. It also prevents replacing varying-matter evolution by a local gap. Derived formal domain conditions; reduction and response remain guessed. Reopen with six-binary-to-three-mode projection, controlled omitted modes and a declared matter/observer path map. |
| NU-6 — ✓ Done | 262–264 | Removes the false inference from a two-valued sign to a four-state Dirac spectrum and conserved lepton charge. Derived group counterexample and observer-map limitation. Reopen only with orbit stabilizers, observer distinguishability, spin/charge-conjugation and reaction/mass maps, not the sign alone. |
| NU-7 — ✓ Done | 266, 279 | Keeps a consequential experimental implication at its effective scope without changing substrate sign laws by assertion. Inferred applicability of the checked effective black-box statement; no substrate theorem. A confirmed signal falsifies an exact lepton-conserving effective model; it does not choose the polarity marker or invalidate kernel CP covariance. |
| NU-8 — ✓ Done | 260–281 | Avoids rejecting an entire geometry because one illustrative mass sum or dark-matter assignment fails. Approximate empirical comparison scales and conditional inference, not new measurements. Reopen a specific realization when its calibrated mass spectrum, rates or population conflict with the same declared data and inference assumptions. |

## Source checks

The external search is limited to consequential claims already in the chapter, under the selective-reference policy in [About Architrino](../../../../content/markdown/aaa/archie/about-architrino.md#sources-references-and-attribution). Standard neutrino theory is an observer-level comparison here, never a substrate premise.

- Inspected selected passages in M. C. Gonzalez-Garcia and R. Wendell, *Neutrino Masses, Mixing, and Oscillations*, PDG 2025 review: [source](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-neutrino-mixing.pdf), sections 14.1–14.2, 14.4–14.5, 14.7 and 14.9. Its oscillation conventions are compared explicitly rather than copied without tracking conjugation. Numerical gaps are approximate comparison scales, not a fresh fit or current global-likelihood claim. The independent amplitude derivation above, not source prestige, decides the repaired sign convention.
- Inspected the abstract of M. Duerr, M. Lindner and A. Merle, *On the Quantitative Impact of the Schechter–Valle Theorem*, arXiv:1105.0901: [source](https://arxiv.org/abs/1105.0901). It states the effective black-box Majorana contribution and warns that its small size does not determine the dominant mass term or reaction mechanism. The requested HTML full-text route failed; no full-paper verification is claimed.

## Known-case-first validation and limits

The in-session math extractor was run on a known specimen before the chapter. `node` with the installed `katex` package returned exactly one inline and one display expression; it ignored a fenced invalid macro, rejected the same macro outside the fence, and rejected an unmatched dollar. The pass was recorded in the tool transcript before the target command. The subsequent target run parsed and rendered 117 expressions, comprising 103 inline and 14 display expressions, with `throwOnError: true` and `strict: 'error'`. That first target run was on hash `4e80643bce2dffe0dcfd2c4b2675584b325140a56afdf29b725ad2dc33d0b985`; the final run is recorded below.

This is syntax evidence, not visual-layout or mathematical-correctness evidence. The extractor is limited to this chapter's dollar-delimited math, standalone display delimiters and simple backtick fences/code spans. It is not a general Markdown parser. No other custom checker, source-index parser, EOM instrument, numerical oracle or link repair instrument was constructed. The group and mixing controls above are algebraic derivations, not computational passes.

The following command reproduces the known-case-first KaTeX check without creating files:

```bash
node <<'NODE'
const fs = require('fs'), assert = require('assert/strict'), katex = require('katex');
function extract(text) {
  const formulas = []; let fenced = false, display = false, buffer = '';
  for (const line of text.split('\n')) {
    if (/^\s*\x60\x60\x60/.test(line)) { fenced = !fenced; continue; }
    if (fenced) continue;
    if (line.trim() === '$$') {
      if (display) { formulas.push([buffer, true]); buffer = ''; }
      display = !display; continue;
    }
    if (display) { buffer += line + '\n'; continue; }
    const ordinary = line.replace(/\x60[^\x60]*\x60/g, ''); let start = -1;
    for (let i = 0; i < ordinary.length; i++) {
      if (ordinary[i] !== '$' || (i > 0 && ordinary[i - 1] === '\\')) continue;
      if (start < 0) start = i + 1;
      else { formulas.push([ordinary.slice(start, i), false]); start = -1; }
    }
    if (start >= 0) throw Error('Unclosed inline math');
  }
  if (display) throw Error('Unclosed display math');
  return formulas;
}
function check(text) {
  const formulas = extract(text);
  for (const [tex, displayMode] of formulas)
    katex.renderToString(tex, { displayMode, throwOnError: true, strict: 'error' });
  return { math: formulas.length, display: formulas.filter(x => x[1]).length,
    inline: formulas.filter(x => !x[1]).length };
}
const fence = String.fromCharCode(96).repeat(3);
const known = 'Text $x^2$.\n$$\n\\frac{1}{2}\n$$\n' + fence +
  '\n$\\invalidcontrol$\n' + fence;
assert.deepEqual(check(known), { math: 2, display: 1, inline: 1 });
assert.throws(() => check('$\\invalidcontrol$'));
assert.throws(() => check('$x'));
console.log('Known-case-first PASS; target not yet read.');
console.log(check(fs.readFileSync('content/markdown/aaa/assemblies/fermions/neutrinos.md', 'utf8')));
NODE
```

## Validation receipt

| Check | Measured result and boundary |
| --- | --- |
| `node scripts/validate-content.mjs --check --strict` | Initial post-repair run exited 0: 0 errors, 0 warnings, 30 informational notes; 391 scene files, 199 content Markdown files and 1,667 repository Markdown files audited. This measures that invocation's shared checkout, not global scientific validity or an immutable cross-worker snapshot. |
| `node scripts/validate-content.mjs --check --strict` — final chapter and completed report body | Exited 1: 1 error, 0 warnings, 30 notes; 391 scenes, 199 content Markdown files, 1,668 repository Markdown files. The sole error names `reference/priorities/aaa-corpus-rewrite/evidence/crw-005-electron-review-2026-09-12.md:25`: Markdown link target `y` resolves to missing `reference/priorities/aaa-corpus-rewrite/evidence/y`. This path is outside the assigned write scope; no causal attribution to a worker or commit is made. |
| `git --no-optional-locks diff --check -- content/markdown/aaa/assemblies/fermions/neutrinos.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-neutrinos-review-2026-09-12.md` | Initial run exited 0 with no whitespace diagnostics. The report was untracked; final report whitespace is also checked separately. |
| Final chapter KaTeX check, known controls first | Exited 0 on final chapter hash `ee219810d2e4a46e911ae72acae88b001005def722b8cd8bf8a5b677921db2cf`: 122 expressions, 108 inline and 14 display; no parse/render errors. This repeats the controls before target use and does not claim visual QA. |
| `git --no-optional-locks diff --no-index --check /dev/null reference/priorities/aaa-corpus-rewrite/evidence/crw-005-neutrinos-review-2026-09-12.md` | No whitespace diagnostics; exit 1 reports the file difference from `/dev/null`. It is not recorded as an exit-0 test pass. |
| `node scripts/build-equation-mapping-corpus.mjs --check` | Exited 1: generated registry stale at `content/generated/equation-mapping/corpus-equations.json`; scanned 199 Markdown files and 4,685 display equations. Regeneration is outside this assignment. Exact deferred command: `node scripts/build-equation-mapping-corpus.mjs --write`. This check does not attribute all shared registry drift to this chapter. |
| Complete final chapter reread | The complete 281-line chapter, including final definition additions, was reread with `nl -ba`; final `shasum -a 256` confirmed the recorded hash. The read-only supporting agent also reread that hash and found no remaining demonstrated defect within its algebra/inference scope. |

The original fourteen equation-view links were preserved, as checked by the complete baseline/final reads. Display-math changes are limited to making the internal-energy argument $T$ explicit, conjugating the flavor-ket coefficient, and changing the corresponding imaginary probability term. No generated link identifier was replaced. This preserves routing but does not make the stale generated equation body current.

## Unresolved scientific obligations and reopening conditions

- ○ **Retained object:** exhibit a dynamically retained photon reference branch and a neighboring neutrino candidate with complete causal history and independent evolution evidence. Prescribed histories or a fitted response matrix are not sufficient.
- ○ **Spin and weak response:** recover the fermionic spin/statistics and observer chirality/helicity map, weak-coupling-triad response, source and detector rates, and any medium/gravitational response from that branch. The argument must not use Standard Model laws as primitive assembly premises.
- ○ **Mode and mass map:** derive the six-binary-to-three-mode reduction, excluded-mode control, energy allocation, projector, positive response domain, absolute spectral offset, observer units and dispersion/travel-time map. Oscillation gaps alone cannot close these accounts.
- ○ **Conservation and reactions:** establish history/boundary/medium accounting, nonzero allowed conversion amplitudes, effective charge conjugation, lepton-number behavior, and CP-sensitive event response. A discrete covariance theorem does not provide these.
- ○ **Empirical mapping:** specify the data selection, apparatus response, cosmological assumptions and tolerances before asserting a quantitative match. Sterile-branch existence and dark-matter abundance remain separate questions.

These obligations are retained in this report and the scoped chapter passages; shared queue and status integration belongs to the coordinating task. Optional work deferred: a quantitative neutrino fit, a complete black-box-paper review, additional source acquisition, visual page inspection, and a downstream consumer audit. No such work is represented as completed.

## Exact changes and bounded disposition

Only these paths were written by this assignment:

1. `content/markdown/aaa/assemblies/fermions/neutrinos.md`
2. `reference/priorities/aaa-corpus-rewrite/evidence/crw-005-neutrinos-review-2026-09-12.md`

The target was reread before each edit and guarded by the expected SHA-256 plus a second unchanged-byte comparison immediately before writing. Baseline target hash: `b6a3358db239d2a48ae7e343b6fa07b52d561aaa905e2213ad0bc9c3e9532150`. Final target hash: `ee219810d2e4a46e911ae72acae88b001005def722b8cd8bf8a5b677921db2cf`. The report has no baseline hash because it was created by this assignment.

Final scoped `git --no-optional-locks status --short -- <chapter> <report>` observed the chapter as ` M` and this report as `AM`. This worker performed no staging; the report's working copy continued to change after the staged snapshot. The integration owner must consume the final working copy and its status, not assume the staged draft is the final report. The index was preserved.

A cross-task status notification was attempted and rejected by automatic approval review, which treated repository paths, hashes, validation findings and staging state as private data sent to an unverified destination. No notification was delivered and no retry or alternate sending route was used. This durable report and the final task receipt carry the required handoff.

No other chapter, report, generated artifact, source index, fixture, status board, priority list, work queue or log was edited. No staging, commit, push, PR mutation, merge, worktree creation or generator write was run. Bounded repair completion leaves the scientific obligations above open and establishes neither theory closure nor downstream corpus closure.
