# OPS-031 — Braid Mathematics review, October 23, 2026

## Scope and disposition

Report-only whole-chapter review of [Braid Mathematics](../../../../content/markdown/aaa/noether-braid/braid-mathematics.md), all 339 source lines, in the core-theory due order (sequence 28). The source was read in overlapping, unclipped sections 1–189 and 190–339. Native shasum -a 256 measures SHA-256 a6e4179656c373c65caec6c4186235b1606539a0e2ec229e8045999843cc4db4. A frozen copy is retained at .tmp/ops-031-oct23/math/braid-mathematics.before.md. No corpus text, independent reference, generated artifact, scientific output or shared queue is changed by this worker.

Four bounded correction groups are proposed: two mathematical scope/warrant corrections, one recovery-target qualification, and one notation group. An additional hinge clarification remains optional. No retained braid, spectrum discreteness, observer clock law, physical action unit or dynamical continuation is established. The coordinator owns final adjudication, existing-owner referrals and coverage reconciliation; CRW-005 remains closed.

| Inspected source or independent owner | SHA-256 by native shasum -a 256 |
| --- | --- |
| Braid Mathematics | a6e4179656c373c65caec6c4186235b1606539a0e2ec229e8045999843cc4db4 |
| Coincident-Axis Three-Binary Symmetry | af14cfdb690db58dac54a77ddc347baf039d4633d16d6160d9114361e7745a5c |
| Binary Dynamics | badb0e8089a652c6d8787783b9ddb6bc5c1a22c7fa758caa368587c461e8d322 |
| Mathematics Terminology | 29fa65e516f1c014e9cc557ed2994213f40d80d0a875da44306c7fee0b2608ef |
| Noether Braid overview | fc4606a3fdf670df93ee39d15af262920be517d6b2b02beb6a7316daf8905d31 |

## Proposed corrections

### BM23-01 — Medium: axial exclusion is restated as planarization

**Passage, line 292:** “The axial no-balance derivation above forces the tested fixed-coordinate single-frequency family planar, and the anti-damping indications, where they hold, disfavor it further.”

The [fixed-plane axial no-balance lemma](../../../../content/markdown/aaa/noether-braid/coincident-axis-three-binary-symmetry.md#fixed-plane-axial-no-balance-lemma) excludes axial acceleration balance for a polarity-segregated history in two fixed parallel planes at nonzero separation, with a stationary axial center, complete bounded history and ordinary simple roots. It supplies no evolution that drives a released history into the plane. Braid Mathematics line 253 itself says: “It does not force a dynamical history to become planar.” The later sentence obscures both the restricted two-plane domain and the distinction between rejecting a fixed-height candidate and deriving a subsequent fate.

**Independent reference and grade:** derived scope comparison plus the sign proof itself. An opposite-plane hit has axial contribution proportional to $-s_i h W^{\mathrm{acc}}/r^3$, with positive weight; this contradicts zero axial acceleration at fixed nonzero $h$. No equation for a varying $h(T)$, its asymptotics or its eventual value follows. A candidate outside the fixed-plane assumptions is outside that proof.

**Smallest proposed replacement:** “Within the polarity-segregated two-fixed-plane family, the axial no-balance derivation excludes fixed-height acceleration balance at nonzero separation; its planar boundary is not excluded by that argument. This does not force a dynamical history to become planar. The anti-damping indications, where they hold, impose separate restrictions.”

**Falsifier:** a separate derivation establishing planarization for the stated evolving family, or a clearly declared interpretation restricting the original sentence exclusively to elimination of nonzero-height fixed candidates. Even under that latter reading, the proposed wording preserves the useful exclusion without implying a dynamical result.

### BM23-02 — Medium: analyticity is insufficient justification for isolated spectrum rows

**Passage, line 288:** “Discreteness is a target rather than an assumption — the residuals are real-analytic away from caustics and collisions, so solution sets are generically isolated, and a degenerate continuum would itself be a reportable structure.”

Calling discreteness a target is correct. The stated reason does not establish its expected generic dimension without the number of independent conditions, variables and unresolved continuous freedoms. The chapter gives no residual-rank statement or quotient that supplies those missing conditions.

**Independent reference and grade:** derived elementary analytic counterexample. The real-analytic residual map $G(x,y)=(x,0)$ has the whole line $\{(0,y)\}$ as its zero set. More generally, a nonzero gradient for one scalar residual in two variables produces a regular local curve, not isolated zeros. Conversely, after fixing declared continuous freedoms, full column rank of the residual derivative at a zero is a sufficient local isolation condition: its injective linear part bounds the residual away from zero for every sufficiently small nonzero displacement. These statements concern mathematical warrant; they do not exhibit a continuum of actual braid solutions.

**Smallest proposed replacement:** “Discreteness is a target rather than an assumption. Away from caustics and collisions, local isolation must be established for the declared residual system after continuous freedoms are fixed, for example by a full-column-rank residual derivative. Real analyticity alone does not establish isolation; a continuous solution family would itself be a reportable structure.”

**Falsifier:** an independently established rank, dimensional or transversality theorem for the actual declared residual system that justifies its isolated solutions. No such theorem is supplied in this passage. Finding a singular derivative alone would not prove a continuum.

### BM23-03 — Medium: the observer transverse budget needs its target or premise qualification

**Passages, lines 47–70:** under “Transverse Causal Budget Lemma,” “For a branch whose response center moves through the local Noether sea with material group velocity $\mathbf w$, the transverse budget is” introduces $c_\star^2=\|\mathbf w\|^2+c_\perp^2$. “Thus an observer-export clock or ruler row must extract” introduces $c_\perp/c_\star=1/\gamma_\star$.

The channel-speed and same-record requirements are useful and should remain. They do not alone make the stated quadrature a derived property of a moving clock branch. The following internal-motion section correctly declares orthogonality and pinned total site speed as additional hypotheses and grades pinning as guessed; it does not derive a general observer clock or ruler law. [Proper Time and Time Dilation](../../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md), lines 186–217, already calls the same formula a “simple clock-budget target,” requires its extraction from phase dynamics and observer projection, and explicitly says finite wake speed alone establishes neither pinned constituent speed nor transverse internal motion. Its [September 12 review](../../aaa-corpus-rewrite/evidence/crw-005-proper-time-and-time-dilation-review-2026-09-12.md) preserves the conditional budget interpretation.

**Independent reference and grade:** derived logical and algebraic distinction. Orthogonal decomposition gives a squared-speed identity only for the same velocity being decomposed. It does not identify that velocity's magnitude with an independently declared $c_\star$, or identify an internal speed ratio with a clock-rate observable. Those identifications require additional branch and export premises. Equivalently, if $c_\perp$ is defined by the square root, the displayed ratio is a definition-level consequence rather than a derived clock law. No counterexample to an actual admitted clock branch is claimed.

**Smallest proposed replacement of the introductory sentence:** “For a branch whose response center moves through the local Noether sea with material group velocity $\mathbf w$, the transverse-budget recovery target is”

**Smallest proposed replacement of the sentence before the ratio:** “If the same admitted branch and its declared observer export supply that quadrature, its algebraic consequence is”

**Proposed short qualification after the ratio:** “Identifying this ratio with a clock or ruler response remains a recovery requirement. Finite wake speed and a declared channel speed alone establish neither that response nor a pinned transverse constituent speed; the internal-motion hypotheses below are separate.”

The existing same-record and dressing-map warning remains unchanged.

**Falsifier:** a local derivation from the admitted branch and export that establishes the quadrature and its clock/ruler meaning without supplying it as a premise. Alternatively, an explicit definition-only interpretation would remove the unsupported physical inference but should be stated where the identity is introduced. The correction preserves the transverse mechanism as a conditional target.

### BM23-04 — Low: distinguish site speed and absolute time in the two working formulas

**Passage, line 155:** “Equation of motion near the hinge ($v\approx c_f$)”. Canonical [Mathematics Terminology](../../../../content/markdown/aaa/archie/mathematics-terminology.md) reserves $v$ for assembly group speed. The circular self-hit hinge instead concerns the native site speed. A non-translating circular prescription has zero group speed while $\|\mathbf V_i\|$ approaches $c_f$, so the distinction changes which physical motion the threshold concerns.

**Smallest proposed replacement:** “Equation of motion near the site-speed hinge ($\|\mathbf V_i\|\approx c_f$)”.

**Passage, lines 264–267:** the native rotating-wave ansatz is written as $\mathbf X_\ell(t)=\operatorname{Rot}(\hat{\mathbf n},\omega t)\mathbf X_\ell(0)+u\hat{\mathbf n}t$. The same canon and the Master Equation use $T$ for substrate time; bare $t$ is reserved for labeled standard-comparison forms and this is not one.

**Smallest proposed replacement:** replace the three bare time occurrences in that displayed native ansatz by $T$, retaining its geometry, parameters and functional equation-viewer target.

**Independent reference and grade:** derived distinction by differentiating a stationary-center circle, whose internal speed is $R|\omega|$ while its group speed is zero; measured source/canon notation comparison for $T$. These are scope/notation repairs, not a new hinge theorem or a changed equation of motion.

**Falsifier:** an accepted local convention identifying $v$ explicitly as the site speed and explaining its departure from controlled canon, or an explicit observer/standard comparison map for the displayed $t$. Neither is present in the inspected source.

## Optional clarification, excluded from the demonstrated count

**BM23-C1, line 186:** “The symmetry breaking at the hinge is geometric: as $\tilde{\delta}_s\to0^+$ the self-hit radial factor scales like $1/\sin(\tilde{\delta}_s/2)$, turning on a large outward term while the state remains continuous.”

The reciprocal sine is a legitimate geometric radial factor. It need not be a claim about the complete canonical acceleration coefficient, and continuous prescribed circular states need not be an assertion about evolved continuation. Accordingly this review does not classify the sentence as a demonstrated missing-Jacobian error or an introduced regression. Clarification would reduce that ambiguity in an EOM sketch.

Binary Dynamics' [circular threshold calculation](../../../../content/markdown/aaa/dynamics/binary-dynamics.md#circular-self-hit-threshold-at-the-wake-speed) separately supplies $J_s=1-s\cos(\delta_s/2)$, $J_s\sim2\mu$, and $\delta_s\sim\sqrt{24\mu}$ for $\mu=s-1\downarrow0$. Therefore the full canonical radial coefficient includes $1/[\sin(\delta_s/2)|J_s|]$, scaling as $\mu^{-3/2}$, while the geometric reciprocal sine alone scales as $\mu^{-1/2}$. This is a coincident endpoint warning, not the positive-separation ordinary-fold integrability theorem. The branch threshold also does not by itself prove broken symmetry or an accepted EOM continuation.

**Optional proposed wording:** “At the principal circular self-hit onset, the geometric radial factor grows as $1/\sin(\tilde{\delta}_s/2)$. The complete canonical coefficient also contains the transmitter-side Jacobian weight $1/|J_s|$; the circular endpoint singularity requires its own accepted event treatment. Continuity of the prescribed circular chart does not establish dynamical continuation through that onset.”

This clarification may be combined with an accepted hinge repair but is not required to close BM23-01 through BM23-04. A reading confined explicitly to the geometric factor and prescribed-state continuity defeats the stronger missing-coefficient criticism.

## Retrospective samples and no-change dispositions

**Accepted-repair recheck, CAS19-02:** the [October 20 integration](../../aaa-corpus-rewrite/evidence/ops-031-core-geometry-integration-2026-10-20.md) corrected the coincident-axis introductory axial exclusion from the general three-binary locus to the equal-height, polarity-segregated two-plane family. Current Coincident-Axis line 35 retains that restriction and explicitly places unequal-height and mixed-polarity charts outside the lemma. The independent sign proof still yields zero axial same-plane contributions and strictly inward opposite-plane contributions. A same-polarity site at greater axial height than its transmitter instead receives a positive axial separation contribution, showing why unequal heights cannot inherit the same-plane zero argument. **Substantive correctness:** survives. **Preserved meaning:** the exact two-plane exclusion remains strong. **Explanatory usefulness:** the reader sees which candidates it excludes and which require separate analysis. A complete balanced history inside the exact lemma assumptions would overturn the derivation. BM23-01 identifies an unrepaired summary in another chapter, not a regression of this accepted repair.

**Prior no-change recheck:** the [September 21 Noether Braid review](ops-031-noether-braid-review-2026-09-21.md) retained its inventory-versus-acceleration distinction at the overview hash recorded above, still measured unchanged today by shasum. Removing one member from three positive and three negative identities leaves three opposite-polarity and two same-polarity other identities. Changing separation or path history can change every acceleration without changing those counts. **Substantive correctness:** survives by direct finite counting. **Preserved meaning:** inventory remains separate from dynamical sufficiency. **Explanatory usefulness:** the paragraph explicitly blocks a count-based acceleration inference. A changed declared inventory or a claim equating counts to net acceleration would reopen this sample. This does not recertify the whole overview.

Other valid target passages remain unchanged: the native squared-speed decomposition retains its cross term; its orthogonal and pinned-speed consequence is expressly conditional; the scalar escape calculation differentiates $\frac12\dot R^2-K/R$ correctly under its complete projection bound; integer root counts and finite velocity increments are separated from action units; an ordinary interior fold requires nondegeneracy and unfolding and changes local root count by two; the zero-delay endpoint is excluded; accessory moments remain hypothesis-grade readouts rather than confinement or mass derivations. These checks establish their stated local algebra and scope, not physical retention.

## Checks, model and limits

The unchanged .tmp/ops-031-effective-proposal-oct12/validate.mjs first passes known math/code/blockquote/fenced-link and valid/invalid TeX controls, before its target run passes all **89 math spans, 20 displays, 20 equation-viewer links and 40 local-file link occurrences** in Braid Mathematics. This instrument checks strict KaTeX syntax and local file existence; it does not verify fragment destinations, browser layout, complete root inventories, numerical dynamics or scientific truth. Explicit reasoning and the unchanged canonical derivations above are the mathematical references; model agreement is not offered as proof.

This worker uses the current Codex review context; a model identifier/settings were not exposed to it. No materially different reviewer model is adopted or evaluated in this pass. Review duration and operator burden were not separately measured, and no prevalence or performance estimate follows from the findings count. No external benchmark or source quotation is relied on, so no literature acquisition was needed for the elementary algebra and logical scope checks.

All proposals remain unapproved and unapplied by this report. The existing corpus-maintenance owner receives them through coordinator adjudication; broader scientific obligations remain with their existing owners. A changed source hash, a missing local assumption supplying the disputed inference, or an independent contradiction of the displayed references requires reopening the corresponding finding before repair.
