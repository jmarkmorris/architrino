# CRW-005 PPN Parameters review — 2026-09-12

Status: ✓ Done for the bounded chapter review and repair. The mathematical corrections and final reread are complete; the final strict content check passed with zero errors and zero warnings. The earlier failed snapshot is retained below. This disposition does not establish theory closure, experimental acceptance, or downstream corpus closure.

## Scope, provenance, and review method

The assignment permits changes only to [PPN Parameters](../../../../content/markdown/aaa/spacetime/ppn-parameters.md) and this report. Shared review boards, queues, other chapters, generated artifacts, Git publication, and linked worktrees are outside its write authority. The parent coordinator owns the shared disposition.

Baseline SHA-256, measured before editing with `shasum -a 256 content/markdown/aaa/spacetime/ppn-parameters.md`: `ca9c2213f36485970e19ca3d6238c9835293cfb3ae87a3aa3ba58136bb3977c5`. The baseline has 1259 lines by `wc -l`; `git --no-optional-locks diff -- content/markdown/aaa/spacetime/ppn-parameters.md` returned no difference before editing. Original line references below refer to those bytes.

Final SHA-256, measured by the guarded Node write and independently by the supporting review's before/after `shasum -a 256`: `c27680fb472a28708f8fdbb9cd5f5ada6d1c3989f72a17e9f2e183cfc0bc2ed9`. Final references below refer to the 1270-line chapter read back from disk. A different digest invalidates this exact-state attribution.

The root reviewer read the complete baseline, reviewed the canonical anchors, adjudicated the findings, performed all edits, and reread the complete resulting chapter. The read-only supporting review `crw-005 PPN statistics`, role lens `andrey-kolmogorov`, independently examined arithmetic, covariance, and identifiability, then reread the corrected preferred-frame and numerical sections. It reported no remaining actionable mismatch within that statistical scope at the final digest. Multiple agents are editorial checks; the independent mathematical references are the coefficient comparison, series derivations, and counterexamples below.

The review applied the live review workflow, theory-layer discipline, academic and mathematical style guides, terminology usage, comparative glossary, and source-attribution policy. Theory anchors included [Ontology](../../../../content/markdown/aaa/foundations/ontology.md), [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), [Absolute Time](../../../../content/markdown/aaa/foundations/absolute-time.md), [Absolute Timespace](../../../../content/markdown/aaa/foundations/absolute-timespace.md), [Euclidean Void](../../../../content/markdown/aaa/foundations/euclidean-void.md), and the absolute-frame construction/detection discussions. The primitive acceleration law was checked against [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), including its causal-root acceleration sum. Nearby comparison owners were [Noether Sea](../../../../content/markdown/aaa/spacetime/noether-sea.md), [Emergent Metric](../../../../content/markdown/aaa/spacetime/emergent-metric.md), and [Proper Time and Time Dilation](../../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md).

## Findings and dispositions

All rows below are ✓ Repaired in the assigned chapter. P1 identifies a coefficient error that changes downstream preferred-frame outputs; P2 identifies a mathematical, evidentiary, or explanatory defect that affects interpretation. Line ranges are exact reading locations, not claims that every line in each range changed. Derived findings name their argument below; measured source findings name the publication. The falsifier column states how to challenge the repair.

| ID / severity | Original lines | Final lines | Finding, grade, and repair | Operator-checkable falsifier |
| --- | --- | --- | --- | --- |
| PPN-01 / P2 | 3–19, 60–126 | 3–23, 66–131 | Inferred explanatory gap: the optical integral mixed substrate and observer symbols without a complete calibration statement. Added the primitive acceleration starting point, open observer map, weak-field/gauge assumptions, density and potential units, normalized delay logarithm, and numerical $c_f=1$ convention. | A canonical observer projection inconsistent with the stated identifications would require revising the branch; compare Emergent Metric's chart and clock/ruler definitions. |
| PPN-02 / P2 | 51–126 | 57–131 | Derived: a straight reference ray is a first-order fixed-endpoint approximation, not a consequence of Euclidean substrate geometry. The old $O(G^2M^2/c_0^5)$ timing remainder lacks an inverse length. Added the approximation, endpoint domain, physical-path obligation, calibrated observation, and dimensionally complete remainder. | Show a nonuniform/near-caustic limit claimed inside the fixed-geometry estimate, or a missing first-order endpoint/path term on the stationary isotropic branch. |
| PPN-03 / P1 | 275–320, 713–722, 826–864, 1051–1061 | 281–326, 720–727, 835–873, 1060–1069 | Derived from the standard PPN metric: the mixed coefficient is $\alpha_1-2\alpha_2$, not $\alpha_1$. Corrected the complete dictionary, repeated equations, affine projection matrix, consistency relation, and synthetic output. | Substitute the final dictionary into all four standard preferred-frame coefficients; any mismatch under the same velocity convention overturns it. |
| PPN-04 / P2 | 460–484 | 468–491 | Derived counterexample: an isotropic nonzero Hessian still permits a speed-dependent clock term. Require the complete Hessian to vanish, with independent source potentials and the PPN consistency relation. | A nonzero retained $w^2U$ coefficient satisfying the final zero-Hessian condition would refute the repair. |
| PPN-05 / P2 | 657–795 | 664–804 | Derived: translate the ADM shift sign from sea-relative-to-chart velocity; its square is one PN order too small to supply retained $\Xi_3,\Xi_4$. The spatial trace amplifies additive metric error by $c_0^2/U_\Phi$ and cannot certify isotropy. Added those restrictions, response definitions, and residual units. | Expand the displayed ADM line element under its ordering; a second-order contribution from the specified shift, or an unamplified additive trace error, would overturn the argument. |
| PPN-06 / P2 | 486–525, 919–925, 993 | 493–532, 926, 1002 | Inferred model boundary: the apparatus response was presented too generally, and spherical geometry does not eliminate preferred-frame dependence. Labeled the apparatus formula phenomenological, defined projection/covariance and regularization assumptions, and restricted the classical projections to the zero-preferred-frame comparison. | A derivation establishing universal apparatus sensitivities could strengthen the grade; a nonzero frame term inside the declared projection would invalidate its zero columns. |
| PPN-07 / P2 | 957–986, 1006–1020, 1069–1077 | 966–993, 1015–1028, 1082–1099 | Derived: second-order frequency transfer is a ratio of endpoint clock rates. Added the transmitter/receiver convention and missing denominator term; corrected synthetic redshift and deflection-uncertainty rounding. | Multiply the ratio by the transmitter clock-rate series through second order, or recompute the fixed-kernel arithmetic. |
| PPN-08 / P2 | 448–458, 545–618, 873–902 | 456–466, 552–623, 882–902 | Measured source attribution plus derived statistical distinction: the $\alpha_2$ scale is pulsar-based; the $\alpha_1$ value is a rounded strong-field envelope. Historical scales mix confidence bounds and uncertainties. Corrected attribution, linked sources, separated tolerance weights from inverse covariance, and labeled the screen illustrative. | Contradictory source tables or a supplied joint likelihood yielding the tolerance matrix would require reassessment. |
| PPN-09 / P2 | 623–650, 797–890 | 625–657, 806–902 | Derived notation repair: ten-component and five-component vectors shared an unqualified symbol; the offset projection was called linear, and cost reused likelihood notation. Distinguished the full vector, affine map, and weighted objective. | A consumer requiring the old ambiguous notation would identify a compatibility obligation; machine identifiers and equation-view targets were retained. |
| PPN-10 / P2 | 1051–1099 | 1060–1110 | Derived: the synthetic calibration fails its $\alpha_3$ screen by a factor 7.5, and parameter-only covariance cannot support observational rejection. Stated the failed screen, correlated predicted errors, and complete residual covariance with a likelihood-based rejection boundary. | Recalculate $\alpha_3/(4\times10^{-20})$, or establish that all excluded uncertainties are zero under the actual error model. |
| PPN-11 / P2 | 1101–1177 | 1112–1188 | Measured/derived: the fit arithmetic is valid for independent Gaussian compressed inputs with fixed nuisances. The precession uncertainty lacked verified experimental provenance; Galileo's fractional violation parameter is not $C_2$. Retained arithmetic, labeled precession synthetic, sourced the other rows, and explained Galileo's exclusion. | A primary likelihood supporting the third row could change its grade; different covariance/nuisance assumptions require a new fit. |
| PPN-12 / P2 | 1188–1259 | 1199–1270 | Derived: rank two is assumed here; positive Fisher information establishes local identifiability under regularity, not a globally bounded/proper posterior. Added independence, variance, nuisance, and local-Gaussian conditions; restricted CMB inconsistency to an adopted CMB-linked profile. | An actual baseline and body/apparatus derivatives could establish rank; a proof controlling global tails could strengthen the local conclusion. |

## Independent mathematical checks

### Preferred-frame coefficient dictionary

The independent comparison is Clifford M. Will, [The Confrontation between General Relativity and Experiment (2014), Box 2](https://arxiv.org/pdf/1403.7377v1), PDF page 31. This is an observer-level reference, not an architrino premise. Under its chart-velocity convention, coefficient equality requires

$$
\Xi_1=\alpha_1-2\alpha_2,\qquad
\Xi_2=\alpha_2,\qquad
\Xi_3=\alpha_1-\alpha_2-\alpha_3,\qquad
\Xi_4=2\alpha_3-\alpha_1.
$$

Solving gives $\alpha_1=\Xi_1+2\Xi_2$, $\alpha_3=\Xi_1+\Xi_2-\Xi_3$, and $\Xi_4=\Xi_1-2\Xi_3$. Substitution is the independent algebraic check. The synthetic $\Xi$ values give $(0,-5\times10^{-19},3\times10^{-19})$. With independent $\Xi$ variances $10^{-36}$, its covariance block is $10^{-36}\begin{pmatrix}5&2&3\\2&1&1\\3&1&3\end{pmatrix}$.

A zero traceless Hessian is insufficient even with $\Xi_4$ consistency: choose $\Xi_1=\Xi_2=0$, $\Xi_3\ne0$, and a stationary source with $V_i=0$. Then $g_{00}^{\mathrm{leak}}=-\Xi_3Uw^2/c_0^4$ has nonzero isotropic Hessian $-2\Xi_3U\delta_{ij}/c_0^4$. The revised zero-Hessian condition rejects it.

### ADM order and trace extraction

With $w/c_0=O(\epsilon_{\mathrm{PN}}^{1/2})$ and $U/c_0^2=O(\epsilon_{\mathrm{PN}})$, the displayed preferred-motion shift is $O(c_0\epsilon_{\mathrm{PN}}^{3/2})$. Its squared metric contribution is $O(\epsilon_{\mathrm{PN}}^3)$, whereas $w^2U/c_0^4$ and $w^iV_i/c_0^4$ are $O(\epsilon_{\mathrm{PN}}^2)$. The retained lapse must supply those coefficients. An additive spatial metric error $O(\epsilon_{\mathrm{LV}})$ becomes $O(\epsilon_{\mathrm{LV}}c_0^2/U_\Phi)$ when extracting $\gamma$ by division. A traceless anisotropic perturbation refutes inference of spatial isotropy from the trace alone.

### Endpoint frequency ratio

Write $u_a=U_a/c_0^2$ and $N_a=1-u_a+C_2u_a^2+O(u_a^3)$ for endpoint $a=t,r$. Stationary metric frequency transport gives $z=\nu_t/\nu_r-1=N_r/N_t-1$ under the chapter's calibration. Expanding the reciprocal independently gives

$$
N_t^{-1}=1+u_t+(1-C_2)u_t^2+O(u_t^3).
$$

Multiplication by $N_r$ yields

$$
z=(u_t-u_r)+u_t(u_t-u_r)-C_2(u_t^2-u_r^2)+O(\epsilon_{\mathrm{PN}}^3).
$$

This proves the missing denominator contribution. Equal endpoint potentials give zero. For $u_r=0$ and $C_2=0$, the series becomes the known geometric-series result $u_t+u_t^2$. The synthetic inputs give $2.1200022471640447\times10^{-6}$ with fixed-parameter uncertainty $1.79776\times10^{-17}$. This verifies the conditional metric projection only.

### Statistical counterexamples and reduced fit

A bound magnitude and a likelihood width differ. For example, $\gamma-1=4\times10^{-5}$ lies within one reported Cassini uncertainty of its central estimate but exceeds the symmetric $2.3\times10^{-5}$ screening scale. Likewise, a prediction $O=0$ with zero model variance and an observation $0.1\pm1$ is an ordinary $0.1\sigma$ residual despite lying outside the zero-width prediction-only interval.

For the reduced fit define $x=\gamma-1$ and $y=C_2-\tfrac12$. The first two observations measure $x$; the stipulated third measures $2x-y=0$ with standard deviation $3\times10^{-5}$. Its zero residual gives $\hat y=2\hat x$. If $v$ is the inverse sum of the first two precisions,

$$
\operatorname{Cov}(x,y)=
\begin{pmatrix}
v&2v\\
2v&4v+9\times10^{-10}
\end{pmatrix}.
$$

The separately checked scalar weighted-mean calculation gives $\hat x=1.7421126666220107\times10^{-5}$, $\hat y=3.484225333244021\times10^{-5}$, $v=5.102552079844598\times10^{-10}$, and correlation $0.8330569047177383$. These match the retained rounded values. They are conditional arithmetic, not a fresh experimental analysis.

A positive-semidefinite rank-two Fisher baseline has one null direction. Adding positive weighted gradient outer products makes it positive definite exactly when at least one gradient projects nontrivially onto that direction. This is local. A counterexample to a global posterior claim uses Gaussian unit-variance mean functions $(\Xi_1,\Xi_2,\tanh\Xi_3)$ and zero observations: the Fisher matrix at the origin is the identity, but the likelihood approaches a nonzero constant as $|\Xi_3|\to\infty$ at fixed $\Xi_1,\Xi_2$. A flat-prior posterior is improper. A shared nuisance entering only as $\Xi_3+\nu$ supplies an additional identifiable-combination versus identifiable-parameter counterexample.

## Source verification boundaries

The external checks verified claims already used by this chapter; they were not a latest-bound survey or source-mining campaign. Publication pages/abstracts and the indicated full-text locations were read live.

- Will's Box 2 verifies the metric convention; Table 4 and equation (71) verify historical scales and the pressure relation. This is explicitly a 2014 reference.
- [Shao and Wex (2012)](https://arxiv.org/abs/1209.4503) support the stated 95% strong-field $\hat\alpha_1$ interval. A weak-to-strong-field export is still required.
- [Lambert and Le Poncin-Lafitte's primary conference account](https://syrte.obspm.fr/jsr/journees2011/pdf/lambert1.pdf), page 1, reports the retained 2011 VLBI estimate. The publisher DOI route was unavailable through the web tool; the authors' account supplies verification.
- [Delva and collaborators (2018)](https://arxiv.org/abs/1812.03711) support the Galileo fractional redshift-violation estimate and its $1\sigma$ convention, not a direct measurement of $C_2$.
- [Nagel and collaborators (2015)](https://arxiv.org/abs/1412.6954) support the cavity sensitivity. [Kostelecký and Russell](https://arxiv.org/abs/0801.0287) supply SME comparison-table context.
- [NASA LAMBDA's CMB dipole explanation](https://lambda.gsfc.nasa.gov/education/lambda_graphics/cmb_dipole.html) concerns observer motion inferred from radiation anisotropy, not a Noether sea velocity measurement.

## Validation and instrument controls

Controls passed before their target calculations. An initial edit script refused an unexpected duplicate replacement before writing the chapter; the later write compared the live baseline SHA-256 immediately before saving. An initial KaTeX negative control used incorrectly escaped text and failed its expected-exception assertion before target parsing; it was corrected to an unmatched closing brace and rerun. Neither failed control produced a target finding.

| Check | Result and scope | Limitation / follow-through |
| --- | --- | --- |
| Complete editorial reread | Root read all baseline and final lines; disk bytes matched the prepared candidate exactly. Supporting review reread final preferred-frame/statistical sections and independently checked the digest. | Further counterexamples or changed bytes reopen affected conclusions. |
| Controlled equation parser and KaTeX | The repository `parseCorpusDisplayEquations` parsed one known $x^2+1$ display while ignoring a fenced example; vendored KaTeX accepted it and rejected an unmatched brace. Only then the chapter's 92 displays were parsed and rendered without syntax errors. The same controlled parser compared baseline/final semantic IDs and confirmed all 92 equation-view identifiers retained in order. | Syntax/extraction only; no screenshot/layout or mathematical-validity claim. |
| Controlled arithmetic | Supporting review first passed identity multiplication, known covariance of $(x,2x-y)$, and an equal-weight mean. Root separately checked the equal-weight mean and Simpson integration of $x^2$ as $1/3$ before target calculations. | Conditional arithmetic, not EOM evolution or constitutive evidence. |
| Straight-path integral | With $c_f=1$, impact parameter 1, and longitudinal endpoints $-2,3$, controlled Simpson quadrature gave $3.2620819344108867$; the independent logarithmic endpoint formula gave $3.262081934410875$. | Tests the reference-ray integral, not the native physical trajectory. |
| Fixed-kernel observables | Controlled Node calculation gave $140.8008448$ microseconds, $1.7500105$ arcseconds, $42.9002288$ arcseconds/cy, and the redshift above; uncertainties were $0.000352$, $0.000004375$, $0.00015401571348404682$, and $1.79776\times10^{-17}$ in corresponding units. | Rounded kernels and parameter covariance are stipulated. |
| Scoped whitespace | `git --no-optional-locks diff --check -- content/markdown/aaa/spacetime/ppn-parameters.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-ppn-parameters-review-2026-09-12.md` exited 0. | The additional `git --no-optional-locks diff --no-index --check /dev/null reference/priorities/aaa-corpus-rewrite/evidence/crw-005-ppn-parameters-review-2026-09-12.md` emitted no whitespace diagnostics; exit 1 represents its all-new-file difference. |
| Required strict content check | Final `node scripts/validate-content.mjs --check --strict` exited 0: 0 errors, 0 warnings, 30 notes across 391 scene files, 199 content Markdown files, and 1656 repository Markdown files. | The earlier snapshot exited 1 with two out-of-scope errors, listed below. The current result is a content-validation pass, not scientific or full-suite acceptance. |
| Equation registry freshness | `node scripts/build-equation-mapping-corpus.mjs --check` exited 1: stale `content/generated/equation-mapping/corpus-equations.json`; it read 199 Markdown files and 4685 display equations. | Generated source bindings changed in this edit. Deferred command: `node scripts/build-equation-mapping-corpus.mjs --write`, followed by its `--check`, under authorized regeneration/publication. No generated file was written here. |

At the first strict-check snapshot, the exact errors were:

1. `content/markdown/aaa/spacetime/black-holes.md:535`: relative link `../assemblies/photons.md` resolved to missing `content/markdown/aaa/assemblies/photons.md`.
2. `reference/priorities/aaa-corpus-rewrite/evidence/crw-005-singularity-resolution-review-2026-09-12.md:167`: relative link `target.md` resolved to a missing file in that evidence directory.

These are measured historical snapshots, not causal attribution. The final rerun reported neither failure and the chapter digest remained unchanged; this worker did not edit the two external files. Their authorship and onset were not inferred from last-touch history.

## Remaining theory obligations and handoff

The chapter separates derived effective-formalism identities from unproved native recovery. Open obligations remain: a supported homogeneous Noether sea equilibrium; the common observer chart and clock/ruler/signal response; second-order potential conversion $D_2$; native orbital/orientation/source-current recovery; independent apparatus and compact-body projections; full preferred-location/conservation rows; and a data-backed preferred-frame Fisher matrix with controlled nuisances. Those are scientific obligations retained in the chapter, not successful outcomes of this editorial pass.

The recommended parent disposition is ✓ Done for the bounded chapter repair, with the final passing strict content check, retained earlier failure snapshot, and generated freshness result attached. Shared board updates and cross-chapter propagation belong to the coordinator. No claim is made that the EOM solver, native medium derivation, full corpus, or empirical program passes.
