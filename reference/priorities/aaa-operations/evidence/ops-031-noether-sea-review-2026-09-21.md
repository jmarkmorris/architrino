# OPS-031 — Noether Sea review, 2026-09-21

## Scope and disposition

✓ Full chapter reviewed, report-only. The complete [Noether Sea](../../../../content/markdown/aaa/spacetime/noether-sea.md) source was read in consecutive `sed` windows 1–240, 241–490, 491–760, 761–1020, and 1021–1271, including every displayed equation and source note. `wc -l` reports 1,271 lines. `shasum -a 256` before and after review returns `ce5cbbcd3860dd8092d101a4354b27c71ceeb38f7187a9fe44c3e6712950d2d9`. Scoped `git --no-optional-locks status --short` returned no target change. No corpus source or shared control record was edited.

One medium-severity wording correction is proposed below; it is not accepted implementation. The earlier CRW-005 dispositions remain closed. This review does not establish physical realization of the medium, an energy law, or an executable constitutive prediction. Reviewer: delegated Codex agent `ops_031_noether_sea`; model/build settings were not independently logged. No change of model or model-superiority claim is made. Review time and operator burden were not measured.

The review used the live AGENTS, startup router, corpus-review skill owner, corpus-reviewer, periodic-review procedure, and theory orientation. Relevant style and terminology passages were inspected for claim levels, source attribution, medium/background separation, native versus observer coordinates, and the density/delay/cadence distinction. Foundation openings and the live Master Equation transmitter-weight passage were checked; the clock/sea mismatch definition and its restriction in Proper Time and Time Dilation were read directly. These dependency reads are not whole-document review coverage of those owners.

## Proposed correction

### NSR-01 — Medium: the final expansion condition excludes channels retained by the chapter's own transport formula

**Location:** line 1183, immediately after the received-frequency formula. The sentence says a Hubble-like slope appears “only if” a persistent cadence-space current or source-relaxation imbalance projects into the path functional. The path rate at lines 914–963 separately permits flow divergence and anisotropic stress. The final sentence turns two candidate mechanisms into a necessary condition without deriving a restriction that removes those other channels.

**Independent mathematical counterexample at the stated candidate-equation level:** consider a bounded spatial window and finite absolute-time interval with constant positive inverse-time scale $H$, a smooth positive integrable cadence profile $F(\nu)$, and

$$
\mathbf u_{\mathrm{sea}}=H\mathbf X,\qquad f_N(\nu,\mathbf X,T)=e^{-3HT}F(\nu),\qquad J_\nu=S_{\mathrm{pop}}=S_{\mathrm{GW}}=R_{\mathrm{eq}}=r_f=0.
$$

Direct differentiation gives $\partial_T f_N=-3Hf_N$ and $\nabla\cdot(\mathbf u_{\mathrm{sea}}f_N)=3Hf_N$, so the chapter's kinetic equation holds exactly and its population zeroth moment also holds. The source-balanced rate $\mathcal C_N$ is zero, while the flow divergence is $3H$. Set the constant gradient row and anisotropic coefficient to zero, take $p_{u,X}>0$, and set the coherence remainder to zero. The candidate transport formula then gives

$$
\alpha_{\mathrm{prop},X}=3Hp_{u,X},\qquad Y_{X,E\to R}=3Hp_{u,X}L,
$$

for Euclidean path length $L$. This is a positive linear propagation log-redshift slope with neither cadence-space current nor source-relaxation imbalance. The parameter $p_{u,X}$ has the chapter's time-per-length units, so the exponent is dimensionless. The window can be restricted so the flow stays below wake speed; all numerical instantiation would use $c_f=1$. Endpoint and launch factors remain separately extracted as required by the chapter.

This is a counterexample to the claimed necessity within the displayed ansatz, not a construction of a physical Noether sea solution or an independently calibrated Hubble law. In particular, selecting a coefficient demonstrates what the proposed formula admits; it does not supply evidence that nature selects it. The chapter already imposes physical calibration and independent response obligations, which remain intact.

**Smallest proposed repair:** replace the final sentence with: “Within this candidate propagation mechanism, a Hubble-like path contribution requires a signed, persistent contribution to the independently calibrated photon path-rate functional while preserving image sharpness, line coherence, and packet time-dilation consistency. The candidate channels above include cadence redistribution or source imbalance, flow divergence, and anisotropic response; their physical realization remains to be derived.” This preserves the correct preceding statement that local equilibrium alone does not imply expansion, and introduces no new mechanism.

**Claim grade:** derived for the internal mathematical counterexample; inferred for the recommendation to broaden the sentence. **Falsifier:** an additional stated constitutive theorem tying every admitted persistent flow/stress response to nonzero cadence current or source imbalance would justify the narrower necessity. No such theorem is supplied in this chapter. Route to the existing Noether sea constitutive-response owner; substantive source editing remains pending acceptance.

## Previous-repair and no-change rechecks

The preserved [CRW-005 review and closeout](../../aaa-corpus-rewrite/work-queue.md#crw-005-packet-3-document-1--noether-sea-assurance-review-2026-09-10) supplies the original findings and accepted disposition. The source hash also matches the revised companion hash recorded in the [September 11 pro/anti review](../../aaa-corpus-rewrite/evidence/crw-005-noether-sea-pro-anti-coupling-review-2026-09-11.md). Historical records were not rewritten.

| Recheck | Independent reasoning and present result | Correctness, meaning, and usefulness |
| --- | --- | --- |
| NS-5 accepted detailed-balance repair; current lines 593–609 | A forward cadence interval of width $d\nu$ maps under $F$ to width $\lvert F'\rvert d\nu$. Equating number fluxes therefore requires the printed Jacobian. For $F(\nu)=2\nu$, reverse density-rate product one-half times width two equals forward product one. The printed three-state example also has pair fluxes one-half on both edges and drifts $(2,0,-2)$, whose probability-weighted sum is zero. | Correctness survives; equilibrium pair balance retains its intended meaning without falsely setting local drift to zero. The two compact examples explain why the distinctions matter. |
| NS-9 accepted endpoint-gradient repair; current line 984 | For constant $\mathbf p_X$, integration of $\mathbf p_X\cdot d\boldsymbol\vartheta/ds$ gives the endpoint difference. In a shared scalar component, $b(\vartheta_E-\vartheta_R)+p(\vartheta_R-\vartheta_E)$ depends only on $b-p$, so adding the same constant to both coefficients leaves it unchanged. | Correctness survives; the useful gradient contribution remains, with its calibration degeneracy exposed. More path samples cannot identify the two coefficients separately. |
| Previously retained assembly-level mass interpretation; current lines 1201–1215 | The earlier review explicitly retained this passage. Current text assigns inertia to assemblies and lists medium-dressed response, internal energy, shielding, and closure as candidate dependencies. Foundation Architrino states that primitive architrinos have no mass; the two statements concern different objects. | No correction required. Meaning remains an assembly-response target, not primitive mass or a completed mass derivation. The link to Particle Masses preserves the explanation's scope. |

These checks would fail if the source removed the Jacobian, inferred zero local drift from pair balance, treated a constant exact gradient as independent interior information, or assigned physical mass to individual architrinos. They do not certify unsampled physical claims or measure corpus-wide error prevalence.

## Other reviewed mathematics and preserved boundaries

- The shell variance argument at lines 20–56 makes an explicit conditional mean-square claim. Summable shell variances plus absolutely summable cross-shell covariance make the tail second moment vanish; completeness of $L^2$ gives the stated limit. The text does not turn this into almost-sure, uniform, differentiated, rearrangement-independent, or weak-gradient gravity closure. The live Master Equation uses the same transmitter weight $c_f/|D_t|$.
- Population smoothing, positive-density cadence extraction, and the integrated kinetic equation use compatible number-density measures. Integrating the cadence derivative contributes the stated endpoint current with the correct sign. The separate cadence-resolved spatial-flux alternative prevents an unjustified common-velocity assumption.
- The subtracted susceptibility test retains the instantaneous contact term separately and explicitly declares transform and principal-value conventions. The constant contact response has zero subtracted response; it no longer supplies the historical false rejection.
- The jump expansion retains the diffusion derivative and a third-order weak remainder. Taylor's theorem gives the stated factor of one-sixth; this is a weak test-function bound, not a general pointwise current claim. Action-unit calibration and branch-energy equality remain hypotheses.
- Clock conversion gives the factor $C_E/C_R=(\Gamma_R/\Gamma_E)e^{\Delta_E-\Delta_R}$. Taking minus its logarithm yields the chapter's redshift signs. Independent source-envelope duration is retained rather than inferred from carrier frequency. The live clock owner requires those same mismatch terms.
- The constant-gradient reduction, weighted cadence projection, dimensional coefficient assignments, positive-density floor bound, and midpoint quadrature bound are consistent with the declared candidate map. For the latter, integrating the Lipschitz error $M|s-s_{\mathrm{mid}}|$ over a segment gives $M(\Delta s)^2/4$.
- Elastic parting remains explicitly a candidate effective mechanism. The later packet/medium energy-account requirement at line 1165 prevents the transport fit from certifying lossless physical propagation. No native dissipation or transparent retained branch was established by this review.

## Primary sources and limits

The named comparisons were checked against the primary pages during this review. [Visser, theorem and equation (4)](https://arxiv.org/html/gr-qc/9712010) supplies the barotropic, inviscid, locally irrotational acoustic-potential assumptions and the displayed metric. [Hu and Verdaguer, section 3.2, equations (3.11)–(3.12)](https://arxiv.org/html/0802.0658) defines the centered, symmetrized quantum stress covariance. The chapter correctly treats its classical history covariance as a separate observable, not that quantum kernel. These sources support the comparisons only.

The chapter source was unchanged by hash and scoped Git inspection. Mathematical checks above are direct derivations, not new parsers or numerical instruments. No EOM run, full-repository test, generated write, publication, or automatic substantive repair was performed. This is full source review with one proposed correction and explicit no-change dispositions, not certification of every linked document, every rendering surface, or physical constitutive closure.
