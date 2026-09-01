# Quantum Closure Work Log

This file is the chronological work log for the `mapping-quantum` priority area. Use it for dated agent status, proof-attempt notes, checker narratives, handoffs, failed paths, and operator/developer communication that must remain discoverable but should not crowd the live priority tracker.

Use `brainstorming.md` for provisional ideas, insights, conceptual maps, and draft corpus-promotable text when this priority area has one. Use `priorities.md` for strategy, status, blockers, and promotion routing, and use `work-queue.md` for accepted executable tasks and their local order. Keep focused proof packets, certificates, app specs, and requirement notes in their own sibling files when they need a stable structure.

## Log Entries

- 2026-08-28: The operator selected a dedicated Hilbert-space learning and braid-mapping home; see the [scope decision](#2026-08-28--hilbert-space-learning-and-braid-mapping).

- 2026-07-12: The operator accepted option (a) for `provenance_compliance_bridge`. The [scope decision](pair-provenance-local-compliance-scope-decision.md) rejects ER=EPR as substrate ontology or evidence and retains only a local, setting-independent provenance statistic whose constitutive value must be derived against matched medium-response controls. No implementation or corpus promotion was authorized. `DF-06` was removed from the Operator Discussion Queue.

### 2026-08-28 — Hilbert-space learning and braid mapping

The operator clarified that Hilbert space is not yet understood and that learning it may help decipher the overall braid mapping, explicitly requesting a `mapping-hilbert/` directory at an appropriate level. Created [mapping-hilbert/](mapping-hilbert/README.md) within Quantum Mapping, with an AP-STEM learning path and [initial correspondence questions](mapping-hilbert/brainstorming.md). Converted QC-013 from a discussion reminder to a queued introductory learning task; removed the resolved item from the central Operator Discussion Queue and preserved attention in Current Focus. The introductory task remains open: creating the folder is not evidence of understanding or of a physical mapping. No separate queue, rank, physical recovery claim, corpus promotion, or solver change was introduced.

#### First academic synthesis

The operator requested that [brainstorming.md](mapping-hilbert/brainstorming.md) become the academic synthesis maintained throughout the dialogue. Replaced the seed questions with a first draft covering basis changes, inner products, completeness, functions as vectors, quantum amplitudes, functions on history space, conditional Koopman evolution, and a response-pattern construction. The draft separates exact state reduction from statistical equivalence of preparations, and states the remaining common quantum-representation target. Its elementary basis, norm, phase, quadrature, and Gram identities are comparison mathematics; no physical braid-to-quantum map is claimed. QC-013 is in progress, with operator review and the drawn example still open. The leading next question is which retained causal-wake information can distinguish histories with equal current positions and velocities.

Validation: `node scripts/validate-content.mjs --check` passed with zero errors and zero warnings; `node scripts/validate-priority-ranking.mjs` and `git diff --check` passed. A scoped link audit resolved 24 relative links and eight heading fragments across the synthesis and README. Exact SymPy 1.14.0 arithmetic checked the basis change, state norms and orthogonality, projector probabilities, real quadrature identity, and a finite-response Gram identity; these are mathematical example checks, not independent physical evidence. The full math-preview snapshot parsed 131 expressions with KaTeX 0.16.11; the bounded vector excerpt parsed eight. Browser inspection at 1280 by 720 found loaded fonts, zero math errors, and no overflowing equations, tables, or page width. The saved vector-excerpt PNG was visually inspected. Synthesis source SHA-256: `f670fd9c63af5d2f7ea6b3aca41d404cd2a5155532da39379509c2b59337a6ad`. Preview files are local snapshots with source links inactive; the Markdown remains authoritative. No corpus regeneration or EOM run was performed.

### 2026-07-07 — measurement-ontology.md review integration + closure pass

Integrated an external review of `content/markdown/aaa/quantum/measurement-ontology.md` and did a full closure review. In-file changes: fixed the canonical substrate symbol $\mathbb{U}_{\mathrm{now}}$ to absolute time $T$ (was lowercase $t$) and added a two-tier time-label declaration (substrate flow in $T$; reduced record-channel coordinates and bare times in the effective chart, matching `wavefunction-ontology.md`); declared the trace norm on the Lindblad-fit residual; unified the filtered-record-probability notation ($p_k^{\mathrm{rec}}(\theta)=P_\theta(k)$, with $p_k(\theta)$ the pre-filter statistic); renamed the certainty-level gap to $\delta_{\mathrm{cert}}$ and glossed it (was $\epsilon_C$, which collided across files with the apparatus-channel tolerance $\varepsilon_C$ in `wavefunction-ontology.md`); normalized headings to title case + Schrödinger umlaut; repaired a broken sentence in the observed-observer section; and fixed two mixed-symbol stragglers $\Delta_{\mathrm{div}}(t_0,t,T\to T_W;\mathcal{Q},W)$ left by the in-progress scene-wide $T_W$ window rename.

Two residual items larger than this single-file pass:

1. **Scene-wide substrate-time discipline.** The review flags the same substrate-vs-effective-chart time defect across the quantum scene (`reality-quantum-causality.md` H1, and `wavefunction-ontology.md`). measurement-ontology.md is now clean, but the sibling files need a coordinated pass so $\mathbb{U}_{\mathrm{now}}$/substrate objects consistently carry absolute time $T$ while inherited record-channel times are declared effective-chart. `wavefunction-ontology.md:338` already states the effective-chart inheritance and should be checked against the finalized measurement-ontology convention. Also confirm the scene-wide $T_W$ window rename is finished across all quantum files (it was actively in progress during this pass).

2. **Lifted Stern-Gerlach block drift (review O2).** The lifted-SG derivation in measurement-ontology.md ("Spin / Discrete-Outcome Measurements") substantially develops material the doc says is owned by `angular-momentum-and-spin.md#stern-gerlach-like-measurement-response` (see `braid program` sg-* packets). Needs a line-by-line drift check against the bridge file and a trim to the interface if duplicated, so the substrate SG derivation has one owner. Deferred here rather than done in-pass because it widens beyond the target file.

### 2026-07-07 — scene-wide substrate-time pass (item 1 above: RESOLVED)

Audited `reality-quantum-causality.md` and `wavefunction-ontology.md` against the finalized measurement-ontology time convention. Both siblings were already aligned: `reality-quantum-causality.md` uses absolute time $T$ throughout ($\mathbf X_i(T)$, $\Gamma(T)$) with no $\mathbb{U}_{\text{now}}$ mislabel; `wavefunction-ontology.md` uses $\mathbb{U}_{\text{now}}$ with $\mathbf X_i(T)$, correct $t_{\mathrm{eff}}$ effective-chart usage, and its own effective-chart declaration (line 338). The only outlier was measurement-ontology.md itself, which spelled the canonical symbol $\mathbb{U}_{\mathrm{now}}$ with `\mathrm` (4 instances) against the corpus/canon standard `\mathbb{U}_{\text{now}}` (`\text`, used by 37 files); normalized those to `\text{now}`. Scene now uniform. Also confirmed the $T_W$ window rename is complete across all quantum files and the validation layer (harmonized `T_{\mathrm{run}}` → `T_W`), and $T_W$/$T_{\mathrm{rec}}$ are now defined in `mathematics-terminology.md`.

### 2026-07-07 — Stern-Gerlach block drift (item 2 above: RESOLVED)

Did the line-by-line drift check between the SG block in `measurement-ontology.md#spin--discrete-outcome-measurements` and the owner section `angular-momentum-and-spin.md#stern-gerlach-like-measurement-response`. The measurement-ontology "lifted" block re-derived the owner's construction under a parallel notation: its $\Sigma_{\hat{\mathbf m}}^{\mathrm{SG}}\circ\Phi$ was the owner's signed response functional $\mathcal Q_{\hat{\mathbf m}}$; its $B_\pm^{\mathrm{lift}}$/$P_\pm^{\mathrm{lift}}$ were the owner's kernels $K_\pm^{\mathrm{SG}}$ and probabilities $P_\pm$; and its full/reduced normals plus the invariant-measure coordinate $u_{\hat{\mathbf m}}$ duplicated the owner's reduced-chart machinery. None of the "lifted" symbols were referenced outside the file. Trimmed the block to the interface: it now imports the owner's $K_\pm^{\mathrm{SG}}$, $\mathcal Q_{\hat{\mathbf m}}$, $P_\pm$, $u_{\hat{\mathbf m}}$, $\rho_{\hat{\mathbf m}}^{\mathrm{rec}}$ and keeps only the two genuinely measurement-chapter-specific acceptance gates, renamed off the removed "lift" scheme: record-normalization $\Delta_{\mathrm{norm}}^{\mathrm{SG}}$ (detector-loss guard, consistent with the owner's $K_+^{\mathrm{SG}}+K_-^{\mathrm{SG}}=1$) and half-angle $\Delta_{\mathrm{half}}^{\mathrm{SG}}$. The renaming also removed a $\Delta_{\mathrm{rec}}$ overload (the autonomy residual $\Delta_{\mathrm{rec}}(t;k)$ vs the old normalization residual $\Delta_{\mathrm{rec}}^{\mathrm{lift}}$). Owner file now sole source of the SG derivation.

### 2026-08-28 — Spinor comparison and native-history requirements

#### QC-012 — Spinors, rotations, and history exploration

**Disposition:** Complete at the introductory mathematical acceptance level. Removed `spinors_rotations_and_history_exploration` from the ranked queue; the remaining eleven ranks are unchanged. A completion pointer retains the old queue anchor for existing references. The [expanded synthesis](spinors-rotations-and-history/brainstorming.md) now links directly to this record. QC-002, the ordered-frame physical-spin target, and all detector, exchange, magnetic-response, and candidate acceptance conditions remain open and unchanged.

**Acceptance tested:** Begin with rotations and quaternions; work a one-turn/two-turn comparison; distinguish coordinate sign, phase convention, full labeled history, and measured response; independently check the comparison; give an explicit counterexample to interpreting a sign alone as an observable; record the next mathematical question. All these introductory conditions are satisfied by the synthesis. This is not a particle-spin recovery or a solver acceptance.

**Derived results:** The Pauli-matrix rotation and a separately worked quaternion conjugation produce the same rotated direction. The isolated density matrix is unchanged by a global sign, whereas the explicitly assumed effective interferometer distinguishes a one-arm sign from a common-arm sign. The new conditional proofs exclude a nonzero strictly equivariant spinor amplitude on an ordinary orientation-only state, an endpoint-only classifier of lifted rotation paths, a half-integer sector in a product of two spin-one-half factors with only integer dressing, and a changing central-sign multiplicity within a continuous fixed-space representation family. A frame-compatible accessory deformation retraction preserves frame-loop parity under its stated assumptions. The tensor singlet/triplet calculation supplies scalar and vector controls. None of these proofs establishes their native premises for a registered candidate.

Plainly: several shortcuts are now ruled out, but no braid has been identified as a fermion. The proofs say which extra history, response, or composition structure a successful candidate must supply.

**Coverage and owner boundaries:** The synthesis separates rotations, internal phase, parity, charge conjugation, chirality, helicity, exchange, and antiparticle relations; distinguishes spatial from weak SU(2); treats Weyl/Dirac equations as effective comparisons; and supplies a compact requirement matrix for every requested Standard Model family, color/conjugate sector, and massive-vector/scalar control. Neutrino flavor preparation is separated from propagation mass eigenstates, and Dirac/Majorana identity remains unresolved. Hadronic composition is a separate test. The actual A/B/C, centered five-coordinate representative, F-family, and accessory registry scopes were read without selecting or promoting a core. Cross-owner concerns about return equivalence, polar versus axial frames, exchange/rotation correspondence, neutrino/photon sectors, and magnetic coupling are captured only in this synthesis. No other queue, registry, corpus, solver, score, generated artifact, or geometric-phase file was edited.

**External verification:** Inspected Steane's original arXiv PDF (explicit rotations and Weyl/Dirac sections); Woit's author-hosted quaternion and representation constructions; Rauch et al.'s original institution-hosted 1975 neutron-interferometer paper, pp. 425–427; the publisher abstract of Pauli's 1940 paper (not its full proof); versioned PDG 2025 lepton and gauge/Higgs tables plus electroweak, QCD, neutrino, and quark-model reviews; and the ATLAS 2015 spin/parity paper's stated result and tested-alternative scope. Exact links and claim-specific uses are in the synthesis's [source section](spinors-rotations-and-history/brainstorming.md#sources-and-verification-scope). These sources establish comparison mathematics and external effective targets, not native laws. AI assistance in source selection, synthesis, drafting, and checking is not evidence of correctness.

**Reproducible arithmetic audit:** The following temporary SymPy calculation was executed with the shared environment using `"${AAA_VENV:-../.venv}/bin/python" /tmp/spinor-qc012-check.py`. It passed under SymPy 1.14.0. Angular parameters are exact symbols, wake speed is normalized to one, and the joint generators are dimensionless comparison generators in units of the effective angular-action scale. The independent mathematical references are the distinct quaternion derivation and published representation construction; this script is an arithmetic check of the displayed examples, not a separate physical oracle.

```python
import sympy as s
from sympy.algebras.quaternion import Quaternion
th, delta = s.symbols('theta delta', real=True)
cf = s.Integer(1)
I = s.eye(2)
sx = s.Matrix([[0,1],[1,0]])
sy = s.Matrix([[0,-s.I],[s.I,0]])
sz = s.diag(1,-1)
U = s.diag(s.exp(-s.I*th/2), s.exp(s.I*th/2))
psi = s.Matrix([1,1])/s.sqrt(2)
expected = s.Matrix([s.cos(th),s.sin(th),0])
actual = s.Matrix([s.simplify(((U*psi).conjugate().T*a*(U*psi))[0].expand(complex=True)) for a in (sx,sy,sz)])
assert s.simplify(actual-expected) == s.zeros(3,1)
q = Quaternion(s.cos(th/2),0,0,s.sin(th/2))
vq = q*Quaternion(0,1,0,0)*q.conjugate()
assert s.simplify(s.Matrix([vq.b,vq.c,vq.d])-expected) == s.zeros(3,1)
assert U.subs(th,2*s.pi) == -I and U.subs(th,4*s.pi) == I
assert (-psi)*(-psi).T == psi*psi.T
out = (U*psi+s.exp(s.I*delta)*psi)/2
p = s.simplify((out.conjugate().T*out)[0].expand(complex=True))
assert s.trigsimp(p-(1+s.cos(delta)*s.cos(th/2))/2) == 0
assert [p.subs({th:k*s.pi,delta:0}) for k in (0,2,4)] == [1,0,1]
rx = s.Matrix([[1,0,0],[0,0,-1],[0,1,0]])
ry = s.Matrix([[0,0,1],[0,1,0],[-1,0,0]])
ez = s.Matrix([0,0,1])
assert rx*ry*ez == s.Matrix([1,0,0])
assert ry*rx*ez == s.Matrix([0,-1,0])
J = [(s.kronecker_product(a,I)+s.kronecker_product(I,a))/2 for a in (sx,sy,sz)]
casimir = sum((a*a for a in J),s.zeros(4))
singlet = s.Matrix([0,1,-1,0])/s.sqrt(2)
triplets = [s.Matrix([1,0,0,0]),s.Matrix([0,1,1,0])/s.sqrt(2),s.Matrix([0,0,0,1])]
assert all(a*singlet == s.zeros(4,1) for a in J)
assert all(casimir*v == 2*v for v in triplets)
assert s.kronecker_product(-I,-I) == s.eye(4)
assert s.Rational(1,2)*(1+s.Rational(1,2)) == s.Rational(3,4)
assert s.Rational(1,2)*(1+s.Rational(1,2)**3) == s.Rational(9,16)
print('PASS: exact matrix/quaternion/Rz agreement; 2pi/4pi signs; isolated-sign null; interferometer 1,0,1; rotation-order control; singlet/triplet generators; probability counterexample. cf=1. SymPy',s.__version__)
```

Plainly: exact arithmetic confirms the examples and controls under their declared equations. It does not test retained assembly dynamics, apparatus interactions, or a probability law derived from native histories.

**Next selected mathematical construction:** Define an apparatus-relative rotation transport on one admissible labeled-history domain and prove whether its effective comparison descends through the allowed quotient. The construction must include a frame extraction, a lawful driven path, composition of operations, and a response that distinguishes constant-path, one-turn, and common-arm controls without inserting a sign bit. Until an appropriate retained branch exists, the strongest available deliverable is a conditional theorem with explicit native hypotheses. This is a recorded question, not a new accepted task or additional queue item.

**Validation receipt:** `node scripts/validate-content.mjs --check` passed with zero errors and zero warnings (1206 repository Markdown files audited); `node scripts/validate-priority-ranking.mjs` passed; and `git diff --check` passed. A scoped Markdown-It/KaTeX audit of the three changed files resolved 44 relative links, including 24 heading fragments, and parsed 360 math expressions without error. The primary document's full math-preview snapshot parsed 317 expressions with KaTeX 0.16.11; the worked-rotation excerpt parsed 19. Browser inspection found loaded fonts, zero KaTeX error elements, no overflowing display equations or tables, and no page-width overflow at the ordinary 1280-pixel viewport. The family matrix and the saved bounded rotation PNG were visually inspected for readable math and unclipped columns. Final primary-source SHA-256: `895788a2ad2db239294fdb85ac53060b39b2b606b4ba30bb4c2ca3b86e51aaeb`. The disposable full HTML and excerpt PNG are static previews; source links are inactive in those previews and remain available in the authoritative Markdown. No corpus regeneration, simulation campaign, commit, or push was performed.

Plainly: the checks verify the edited documents, links, arithmetic examples, and rendered presentation. They do not validate native particle physics. The scientific next step remains the explicitly defined history-to-response construction above.
