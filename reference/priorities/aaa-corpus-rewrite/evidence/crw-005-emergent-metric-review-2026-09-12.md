# CRW-005 Emergent Metric bounded review and repair — 2026-09-12

Status: bounded chapter review and local repair complete, with the validation limits recorded below. This disposition applies to the reviewed bytes and the demonstrated defects listed here. It is not theory closure, recovery of general relativity, or acceptance of a constitutive model. Shared review-board and queue integration belongs to the coordinator.

## Scope, ownership, and exact bytes

This worker was assigned only [Emergent Metric](../../../../content/markdown/aaa/spacetime/emergent-metric.md) and this report. The chapter was read in full, its local repairs were reviewed through the complete scoped Git diff, and its critical revised passages were reread. This is one worker's review and self-check, not an independent second reviewer.

| Item | Receipt |
|---|---|
| Chapter baseline | SHA-256 `0f970b44565e9dfcfd2407e4344341d4f44ad0c0d582290ed38f93ea8d504f72`; 53,364 bytes; 984 lines |
| Chapter final | SHA-256 `47441fb210ec54d13e64888c9aa85f0d7257cc8c3d68da97d8992b687ab659b0`; 67,981 bytes; 996 lines |
| Report baseline | Absent by the initial `ls -l` result, which returned ENOENT; created exclusively with Node `writeFileSync(...,{flag:'wx'})` |
| Baseline corroboration | `git show HEAD:content/markdown/aaa/spacetime/emergent-metric.md \| shasum -a 256` returned the baseline chapter digest |
| Scoped working state | Initial `git --no-optional-locks status --short -- <chapter> <report>` returned no entries; final scoped status is recorded below |
| Scope binding | The assigned review-board snapshot listed this chapter as unread item 21; the operator's exclusive file assignment authorized this worker's edits |
| Concurrent-work safeguard | Both scoped files were checked against their recorded hashes before each mutation; exact replacement assertions also had to pass |
| Inventory limit | The app task inventory did not expose an active owner for this chapter, but that inventory was not an exhaustive ownership instrument; it did not supply edit authority |
| Report digest | Report the final digest outside this file; embedding its own final SHA-256 would make the receipt self-referential |

Final line references below are for the final chapter digest. Baseline references are for the baseline digest, not for a moving branch. The review changed no shared board, queue, canon guide, validator, generated asset, neighboring chapter, Git branch, index, or publication record. No additional agent or linked worktree was created. Final scope claims are limited to the worker's writes, not to other agents' concurrent repository changes.

## Governing sources and boundary checks

The review followed the live repository AGENTS, generated startup router, [review skill owner](../../../op/skills/skill-architrino-review.md), corpus-reviewer and integrator-reviewer procedures, [operator explanation standard](../../../op/operator-explanation-standard.md), and [theory orientation](../../../op/theory-orientation.md). The mathematical comparison used the applicable Foundations definitions, the [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), [Noether Sea](../../../../content/markdown/aaa/spacetime/noether-sea.md), [Observer Framework](../../../../content/markdown/aaa/spacetime/observer-framework.md), [PPN Parameters](../../../../content/markdown/aaa/spacetime/ppn-parameters.md), [Proper Time and Time Dilation](../../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md), and the admitted axisymmetric branch in [Braid Envelope Geometry](../../../../content/markdown/aaa/noether-braid/braid-envelope-geometry.md). These were read-only authorities; this review does not certify their complete contents.

The primitive interaction remains acceleration-first, with a sum over retained transmitter-root pairs and per-hit weight $W_s^{\mathrm{acc}}=c_f/|D_{t,s}|$. No mass, force law, thermodynamic law, relativistic spacetime, or Einstein equation was added as an architrino-level premise. Every numerical witness below uses normalized wake speed $c_f=1$; $c_0=1$ is separately chosen only for the mathematical comparison. No EOM solver, physical calibration, population simulation, or empirical fit produced these witnesses.

## Findings and smallest repairs

“High” marks a demonstrated mathematical error or a passage that could falsely certify a recovery; “medium” marks a missing domain, normalization, or claim boundary that changes interpretation; “low” marks local definitions needed to read the argument. Mathematical statements labeled derived are conditional on their stated effective-metric or probability assumptions. Native constitutive proposals remain guessed hypotheses; comparison requirements are effective-level recovery targets.

| ID / severity | Baseline lines and finding | Repair and final lines | Grade, check, and falsifier |
|---|---|---|---|
| EM-01 / high | 945–980: the leading coordinate acceleration omitted a lapse factor, while the claimed correction depended on $\lvert1-\xi^2\rvert$ and could vanish for $N=\Omega\ne1$; $dx^0/dt$ was described as approximate | 956–992: define the reference gradient, use $dx^0/dt=c_0$ exactly, retain $-N^2\gamma^{-1}\nabla\Phi_{\mathrm{eff}}$ at zero velocity, state the velocity terms, and bound the dropped lapse and velocity contributions; the earlier benchmark at 308–319 now has acceleration units | Derived within a stationary zero-shift effective metric; the smooth conformal counterexample below disproves the old bound. Reopen if direct Christoffel evaluation for an admitted smooth metric disagrees with the corrected expression |
| EM-02 / high | 984: $U_\Phi=U+O(U^3/c_0^6)$ added a dimensionless remainder to a potential, obscuring the coefficient conversion needed for $\beta_{\mathrm{PPN}}$ | 996: write $U_\Phi=U+D_2U^2/c_0^2+O(U^3/c_0^4)$, derive $\beta_{\mathrm{PPN}}=1-D_2$ in the declared isolated comparison, and state the normalized equivalent | Derived by dimensions and exponential expansion; reopen if the coefficient of $U^2/c_0^4$ in $g_{00}$ fails the stated dictionary or other PPN potentials have not been reduced as assumed |
| EM-03 / high | 603–613: the Unruh magnitude used $\gamma_{ij}a^ia^j$ with no instantaneous-rest-frame restriction | 612–624: use the Lorentzian norm of covariant four-acceleration; explain when a spatial sum is valid | Derived effective-level identity, not a derivation of Unruh response; the accelerated-observer witness below distinguishes the two norms. Reopen if the projected observer data do not supply proper acceleration |
| EM-04 / high | 835–842: the time-of-flight integral used $ds_{\mathrm{eff}}$, already the spacetime interval and zero on a null ray | 834–853: derive the static isotropic optical factor and use explicitly defined Euclidean reference length $d\ell_h$; distinguish reference-path perturbation from extremizing the full path functional | Derived conditional on a shared null channel; a flat finite path must give length divided by $c_0$, whereas the old null-interval reading gives zero. Reopen if a retained signal channel fails the independent null-speed comparison |
| EM-05 / medium | 34–58, 119–177: number-density units, coordinate map, coframe domain, clock trajectory, and null-channel identification were insufficiently explicit | 34–60, 121–181: state positive density and speed references, the open substrate-to-observer chart map, invertible real coframe and positive lapse, metric signature, smoothness, timelike domain, and coordinate versus locally measured speed | Lorentzian signature is derived algebraically; chart construction and shared physical channels remain hypotheses/targets. Reopen on lapse zero, coframe rank loss, inadequate smoothness, or independently extracted photon disagreement |
| EM-06 / medium | 101–115: scalar amplitudes were squared despite direction-dependent cancellation language; receiver/root indexing, averaging, coefficient units, and homogeneous potential reference were incomplete | 103–117: use the Euclidean norm of the vector acceleration sum, retain the canonical per-root kernel, define the absolute-time average and finite second moment, give coefficient units, preserve the sign hypothesis, and require homogeneous reference normalization | The vector expression is a well-defined candidate, not a derived sea response. Opposing and perpendicular vector controls below expose why scalar magnitudes cannot encode the claimed geometry; reopen if root completeness, finite RMS, common reference calibration, or shared-channel response fails |
| EM-07 / medium | 184–243: $w$ denoted both clock motion through the sea and sea drift in a comparison frame; naked inverse powers of dimensionful $c_0$ did not specify the retained expansion or stress units | 184–247: distinguish $\mathbf v_{\mathrm{clk}}$ from $w^i$, declare dimensionless PN order and coefficient units, use dimensionally appropriate remainder scales, and identify $\varphi=\ln N$ as dependent; 785 limits the scalar scaffold's 1PN coverage | Derived bookkeeping, not recovered coefficients; reopen if any retained term has incompatible units/order or a full PPN claim is made without the missing current and nonlinear source terms |
| EM-08 / medium | 276, 358–402: mixed-unit residuals, potential zero points, anisotropic stress, a general slip-to-PPN identification, and cross-covariance were not adequately delimited | 280, 365–409: define covariance weighting, nonnegative penalties, the negligible-stress comparison domain, potential-unit tolerance, constant leading slip reduction, and joint covariance when required | Diagnostic definitions and effective comparison targets; reopen if an observational reconstruction violates these source/zero-point/covariance assumptions or the same parameters cannot serve both channels |
| EM-09 / medium | 406–429, 523: generic matter-first authority and “validated” photon language exceeded the supplied evidence; the hydrodynamic metric residual could compare an output with itself | 413–436, 532: restrict the cone comparison to admitted signal channels, state the missing equations and instruments, and require independently reconstructed observer data on one side of the hydrodynamic residual | No physical validation is claimed. A zero residual from identical computational outputs is only an identity; reopen when independent instruments become available or a claimed pass uses the same path twice |
| EM-10 / medium | 450–482, 883–907: all Noether braids were described as oblate; a diagonal metric was offered for rotating sources; $N=\Omega\xi$ could look like a consequence of zero shift, and its asymptotic normalization was hidden | 457–491, 894–918: restrict the envelope to the admitted axisymmetric branch, delimit the static diagonal example and rotating cross term, distinguish $\Omega$ from envelope scale $\lambda$, identify the additional lapse ansatz, and expose the spherical-reference restriction | The implication $N,\Omega\to1\Rightarrow\xi\to1$ is derived; physical shape response and speed-budget compliance remain hypotheses. Reopen if a general oblate rest branch is asserted without a reference-normalized map |
| EM-11 / medium | 452–527: the translated Einstein relation was verbal, external support was imprecise, and the entropy comparison risked becoming an extra required theory | 459–468, 495–538: show the effective Einstein equation with units and local cosmological-constant restriction, verify the two primary references, and keep entropy comparison optional | Effective-level recovery/comparison only. Neither source derives a Noether sea map; reopen if source assumptions are imported as primitive laws or a microscopic derivation is claimed from analogy |
| EM-12 / high | 537–576, 633–651: boundary-record cardinality was used as entropy without specifying alternative histories, weights, or a differentiable limit; naming one shared record was presented too close to providing a derivation | 546–548, 587, 644–662: define a finite nonempty distinguishability quotient over alternative histories, state uniform weights for counting/statistical equivalence, distinguish the null history from its cut, and require the missing continuum and horizon-equilibrium conditions | Counting identities are derived; a thermodynamic identification is a guessed candidate. The nonuniform two-label witness below rejects unconditional equivalence; reopen if cardinality, weights, or area derivatives depend arbitrarily on readout/binning |
| EM-13 / high | 547–553, 613–629: a four-dimensional stress-flux expression was integrated over an unspecified horizon patch; $\Delta E+dQ$ omitted the required current normalization and other transfers | 549–564, 624–640: integrate over the directed null three-surface, declare outward boost-energy flow and common normalization, and restrict two-term balance to negligible other flux/work/non-Killing terms | Derived divergence identity at effective grade; observer-level conservation is still a recovery requirement. Reopen when the omitted volume source or another boundary transfer exceeds the declared energy tolerance |
| EM-14 / medium | 706–734: the block entropy-density limit sent block size to infinity inside a fixed finite record without an explicit family or scale separation | 717–755: distinguish block $\mathcal U$ from potential $U$, require compatible enlarged records, edge-to-area ratio tending to zero, uniform correlation control, and a finite-window estimate | Conditional limiting argument; no factorization theorem or universal quarter coefficient is proved. Reopen if the limit does not exist, correlations are not controlled, or the coefficient varies with admitted state/observer |
| EM-15 / low | 3–5, 18, 86: the opening assumed several bridge terms, and the Earth example stated the unconstructed distributed-source response too directly | 3–5, 18, 88: define GR/PPN and the primitive/assembly bridge in place; preserve the Newtonian density-length comparison while stating that the sea response still has to be recovered | Editorial clarification and effective comparison; reopen if reader-facing prose again presents the source-response proposal as a derived constitutive law |

These are grouped findings, not a claim that each literal replacement is an independent defect. Each repair stays in its existing section and preserves the chapter's mathematical development, heading structure, and equation-viewer identifiers. Larger stylistic reorganization and neighboring-file propagation were excluded.

## Mathematical checks and independent references

### Lorentzian domain and clock/signal map

For a real invertible coframe, $\gamma=e^{\mathsf T}e$ is positive definite. In coordinates $x^0=c_0t$, the change of one-forms to $(Ndx^0,e^a{}_i(dx^i-u^idx^0/c_0))$ is invertible with determinant $N\det e$. The resulting metric therefore has inertia $(-,+,+,+)$ and determinant $-N^2\det\gamma$. This algebra establishes the metric domain; it does not construct the observer chart or a sea equilibrium.

On a clock trajectory with coordinate velocity $v$, $d\tau^2/dt^2=N^2-\gamma_{ij}(v^i-u^i)(v^j-u^j)/c_0^2$. Thus $N$ alone is the clock rate only at $v=u$. In the zero-shift chart, inserting $dx^i=\hat k^i d\ell_h$ into the null quadratic form gives $d\ell_h/dt=Nc_0/\sqrt{\gamma_{ij}\hat k^i\hat k^j}$. The locally calibrated ruler and reference clock instead give $d\ell/d\tau_{\mathrm{ref}}=c_0$. Equating the physical photon channel with this cone requires independent channel data.

### Geodesic counterexample and exact correction

For a stationary zero-shift metric, $g_{00}=-N^2$ gives $\Gamma^i{}_{00}=N^2(\gamma^{-1})^{ij}\partial_j\ln N$. With $\Phi=c_0^2\ln N$ and $x^0=c_0t$, the exact zero-velocity acceleration is $-N^2(\gamma^{-1})^{ij}\partial_j\Phi$. The full coordinate-time equation adds $-\Gamma^i{}_{jk}v^jv^k+2v^iv^j\partial_j\ln N$. The difference from the chapter's leading $-\gamma^{-1}\nabla\Phi$ term is controlled by $|N^2-1|\|\gamma^{-1}\nabla\Phi\|$ and the bounded velocity terms, not by $|1-\xi^2|\|\nabla\Phi\|$ alone.

An analytic counterexample is the smooth weak conformal metric $N(x)=\Omega(x)=e^{-\epsilon x}$ with $\xi=1$, evaluated at $x=1$, $\epsilon=0.001$, and $c_f=c_0=1$. Direct differentiation gives $\partial_x\Phi=-0.001$ and exact acceleration $0.001$. The old leading expression gives $0.0010020020013340003$, while its claimed error bound is zero. The corrected expression gives $0.001$. This is a counterexample within the admitted mathematical conformal family; it is not a GR solution, a sea equilibrium, or measured architrino dynamics. The reference is the separately written Christoffel identity, not a replay of solver output.

### PPN dimensions and coefficients

Potential has dimensions $L^2T^{-2}$. Therefore $U^3/c_0^6$ is dimensionless and cannot be added to $U_\Phi$, while $U^3/c_0^4$ has potential units. Let $u=U/c_0^2$. Expanding $g_{00}=-\exp[-2(u+D_2u^2+O(u^3))]$ gives $-1+2u+(2D_2-2)u^2+O(u^3)$. Comparison with $-1+2u-2\beta_{\mathrm{PPN}}u^2$ gives $\beta_{\mathrm{PPN}}=1-D_2$. This is a coefficient identity for the isolated static reduction stated in the chapter, not a derivation that $D_2=0$.

Similarly, $N=1-u+O(u^2)$ and $\Omega=1+\gamma_{\mathrm{PPN}}u+O(u^2)$ imply $\xi=N/\Omega=1-(1+\gamma_{\mathrm{PPN}})u+O(u^2)$. Truncated-polynomial controls checked the coefficient for $\gamma_{\mathrm{PPN}}\in\{0,1,2\}$ and the second-order identity for $D_2\in\{-1,0,1\}$. The printed second-order numerical identity corroborates the algebra; it is not an independent physical measurement.

### Acceleration norm and entropy counterexamples

In a local Minkowski comparison, choose proper-acceleration magnitude $a=0.02$ and rapidity $\eta=\log2$. A covariant four-acceleration has components $(a\sinh\eta,a\cosh\eta)=(0.015,0.025)$. Its Lorentzian norm squared is $0.0004$, whereas the spatial-only norm squared is $0.000625$. The latter is not the invariant Unruh input except in the instantaneous rest frame. The reference is the hyperbolic identity $\cosh^2\eta-\sinh^2\eta=1$.

For two distinguishable labels, counting entropy in units of $k_B$ is $\log2=0.6931471805599453$. Weights $(0.9,0.1)$ give statistical entropy $0.3250829733914482$. The equality requires uniform weights. No stochastic primitive or thermodynamic law follows from this elementary conditional-probability calculation.

The acceleration RMS similarly retains geometry: equal opposite vectors sum to zero; perpendicular unit vectors have summed norm $\sqrt2$, whereas adding their magnitudes gives $2$. These exact vector examples justify making the proposed acceleration statistic explicit. They do not show that this particular statistic is the constitutive response of a Noether sea. A nonzero homogeneous RMS also needs a common reference subtraction or normalization to satisfy $\Phi_{\mathrm{eff}}(\infty)=0$.

### Flux and limiting-domain checks

For symmetric conserved effective stress, the product rule yields $\nabla_\nu(T^{\mu\nu}\xi_\mu)=T^{\mu\nu}\nabla_{(\nu}\xi_{\mu)}$. Conservation of stress alone therefore does not imply conservation of an arbitrary boost-weighted energy. The two-term balance requires the same current on its caps and boundary, plus negligible other transfers and approximate-Killing error. The chapter now states that scope.

The horizon-cut area integral is two-dimensional, whereas stress flux over the cut's null history uses a three-surface element. A finite set has no intrinsic smooth cardinality derivative. A fixed finite patch decomposition also cannot support $|\mathcal U|\to\infty$. A compatible limiting family, continuum/thermodynamic prescription, and controlled edge/correlation errors are required before the displayed entropy derivatives and densities can be used. These are necessary conditions, not a factorization proof.

### Primary-source verification

The chapter now cites [Jacobson, Thermodynamics of Spacetime: The Einstein Equation of State (1995)](https://arxiv.org/abs/gr-qc/9504004). The arXiv abstract and PDF discussion on pages 1–5 were checked for the local-equilibrium, area-entropy, heat/temperature, approximate boost-generator, and all-null-direction assumptions. The comparison supports a conditional effective argument; it supplies no microscopic Noether sea derivation.

The chapter now cites [Donoghue, General Relativity as an Effective Field Theory: The Leading Quantum Corrections (1994)](https://arxiv.org/abs/gr-qc/9405057). The arXiv abstract and PDF opening on pages 1–3 were checked for the separation between unknown high-energy local effects and long-distance contributions from massless fields with specified low-energy couplings. No numerical correction coefficient was independently recomputed in this review.

## Validation and known-case-first record

The focused instrument uses the repository's display-equation parser and relative-link audit, the bundled KaTeX renderer, and an in-memory fenced-code-aware math extractor. Before reading the target, controls established the SHA-256 of `abc`, successful and intentionally invalid KaTeX rendering, exactly two planted math expressions with fenced/inline code excluded, one repository display equation, and exactly one planted missing link with a fenced false positive excluded. A literal `rg` control returned only `1:emergent-metric.md` from two known input lines before the scoped search.

Before the mathematical target witnesses, controls checked polynomial multiplication/reciprocal, dimension subtraction, deterministic and equal-weight entropy, heading normalization/fence exclusion, and Git whitespace detection. The valid synthetic patch passed `git apply --check --whitespace=error -`; its planted trailing-space counterpart returned exit 128 with “trailing whitespace,” as expected. Both were check-only stdin patches and applied nothing.

Control failures were stopped and repaired before target use: the repository parser returns an array rather than an object with an equations field; a strict JavaScript assertion distinguished signed zero; and a proposed `/dev/stdin` no-index whitespace check was unusable. A string-template dollar escape also stopped edit preflight before a source write. Later self-validation found two display openers reduced from double to single dollars by JavaScript replacement-string semantics; both were repaired with literal callback replacements and the full focused check rerun. These are harness/editing incidents, not pre-existing repository defects or scientific evidence.

| Instrument / exact command | Result and scope |
|---|---|
| `shasum -a 256 content/markdown/aaa/spacetime/emergent-metric.md` | Final digest in the byte table; source alone |
| Focused Node command in Appendix A | Baseline: 263 math expressions, 61 displays, 77 links; no math/link errors or warnings, missing display links, duplicate IDs, or formula drift |
| Focused Node command in Appendix A | Final source: 375 math expressions, 61 displays, 83 links; zero math errors, link errors/warnings, missing display links, or duplicate equation IDs. The first final-source comparison found 14 changed generated formulas; a later read at the same source digest found 0 after the shared registry changed |
| Heading-fragment check in Appendix C | 8 chapter Markdown heading-fragment links checked; 0 unresolved, exit 0 |
| Report math/link check in Appendix C | 92 report math expressions and 12 links checked; 0 math errors, local-link errors/warnings, or trailing-whitespace lines, exit 0 |
| Mathematical witness command in Appendix B | Exit 0 after known controls; values and mathematical limits stated above |
| `git diff --check -- content/markdown/aaa/spacetime/emergent-metric.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-emergent-metric-review-2026-09-12.md` | Exit 0 with no output; tracked chapter diff only, supplemented by the report whitespace scan in Appendix C |
| `node scripts/validate-content.mjs --check --strict` | Baseline exit 0: 391 scene configurations, 199 corpus Markdown files, 1,646 repository Markdown files; 0 errors, 0 warnings, 30 notes |
| `node scripts/validate-content.mjs --check --strict` (earlier post-repair snapshot) | Exit 1: 391 scene configurations, 199 corpus Markdown files, 1,647 repository Markdown files; 1 error, 0 warnings, 30 notes. The error was the separate report link listed immediately below |
| `node scripts/validate-content.mjs --check --strict` (final completed run) | Exit 0: 391 scene configurations, 199 corpus Markdown files, 1,647 repository Markdown files; 0 errors, 0 warnings, 30 notes |
| `node scripts/build-equation-mapping-corpus.mjs --check` | Exit 1: generated registry stale at `content/generated/equation-mapping/corpus-equations.json`; scan reported 199 files, 4,685 displays, 23 promoted equations, 30,403 symbol definitions |
| `node scripts/build-equation-mapping-corpus.mjs --check` (intermediate shared snapshot) | Exit 1: the same registry remained globally stale; 199 files, 4,685 displays, 23 promoted equations, 30,408 symbol definitions |
| `node scripts/build-equation-mapping-corpus.mjs --check` (final completed run) | Exit 0: 199 files, 4,685 displays, 23 promoted equations, 30,408 symbol definitions; 0 errors. No regeneration was run by this worker |
| Final `git --no-optional-locks status --short -- <chapter> <report>` | Chapter modified; this report untracked. The scoped chapter diff reports 95 insertions and 83 deletions by `git diff --stat -- <chapter>` |

An earlier post-repair strict content run reported a missing target in `reference/priorities/aaa-corpus-rewrite/evidence/crw-005-lorentz-kinematics-review-2026-09-12.md:35`: `../../../../content/markdown/aaa/spacetime/proper-time.md` resolved to a nonexistent corpus path. That report is outside this worker's two-file scope and was not edited here. The later completed strict run returned zero errors; the historical failure is retained to distinguish that full pass from the earlier passing subset. The live clock chapter read in this review is `proper-time-and-time-dilation.md`.

KaTeX acceptance checks renderability, not mathematical validity. The link audit checks local targets; the separate fragment check checks the chapter's Markdown heading fragments, and source verification checks the two added external references. The repository validator is a content-integrity instrument, not a physics proof or full repository test suite. A later edit or a newly demonstrated defect overturns this byte-bound review disposition.

### Generated drift and binders

The repository equation parser reports 61 retained display identifiers in the final source, with none missing or duplicated. The first focused comparison at the final source digest against `content/generated/equation-mapping/corpus-equations.json` reported the following 14 changed formulas, all of whose identifiers already existed. A subsequent read at the same source digest found zero formula mismatches because the shared registry had changed. This table preserves the observed repair-to-record delta; it is not a claim that these formulas remain stale:

| Final display start | Retained identifier |
|---|---|
| 104 | `corpus-equation-28ee266019bf0cc0` |
| 184 | `corpus-equation-686bee199bdbc652` |
| 206 | `corpus-equation-2167007e26378c1d` |
| 219 | `corpus-equation-36fc405532a4696e` |
| 235 | `corpus-equation-b8321393ecb536b5` |
| 309 | `corpus-equation-a35d6c93159ee4b3` |
| 460 | `poisson-einstein-weak-gravity` |
| 549 | `corpus-equation-64e42d358483a2dd` |
| 612 | `corpus-equation-cbe51d89696051e8` |
| 718 | `corpus-equation-cc5176b20f81a9de` |
| 731 | `corpus-equation-eda386d9c5d781c2` |
| 847 | `corpus-equation-365cb6acc6ef920c` |
| 970 | `corpus-equation-60769808bf61c478` |
| 981 | `corpus-equation-f80bc28ba0203090` |

An intermediate global generator check still reported stale registry bytes after the focused formula comparison had reached zero mismatches. Its `shasum -a 256 content/generated/equation-mapping/corpus-equations.json` snapshot was `13cfa30f5670920277ac108a308190cc213a393aa1e8836ae6e71f2f7d214265`, illustrating that formula equality does not establish freshness of all generated metadata. The registry subsequently changed again to `166b34152c0ca6ac9fcf912d24d6386de6f4675e67c0b5b243fd2f56f97221d1` by the same SHA-256 command, and the final completed `node scripts/build-equation-mapping-corpus.mjs --check` returned exit 0. No generated drift remains in that final check's scope. If later source edits reopen drift, the authorized runner's command is `node scripts/build-equation-mapping-corpus.mjs --write`, followed by the corresponding `--check`. This worker ran no write command and makes no authorship or causal attribution for either shared registry refresh.

## Open obligations, excluded work, and reopening

The repaired chapter still needs a primitive-history-derived constitutive map for clock, ruler, signal, drift, and stress channels; a demonstrated homogeneous sea equilibrium; a calibrated chart and common reference; a root-complete finite excitation statistic; and independent channel predictions without observable-by-observable fitting. The metric's algebraic signature does not prove any of these.

The complete PPN comparison still needs its source-current and nonlinear-potential terms, preferred-frame control, the $U_\Phi$ conversion, and the relevant observational instruments. The oblate envelope-to-lapse ansatz remains restricted and unproved. No Noether braid family, particle identity, dark-sector mechanism, universal gravitational coupling, or Einstein dynamics was derived here.

The horizon program still needs an admitted measure and distinguishability quotient, continuum limit, universal area coefficient, factorization/correlation estimates, common acceleration-temperature response, and current-consistent energy balance. The rewritten residuals state necessary comparison conditions. They do not establish equilibrium, conservation, thermodynamics, or a theorem from a fitted zero.

Optional improvements excluded from this repair include a complete prose reorganization, removal of all legacy procedural headings/row vocabulary, a chapter-wide display-punctuation pass, visual math-preview production, and propagation into PPN, observer, thermodynamic-residual, Noether Sea, or braid-envelope owners. The source has more explanatory prose because the repaired equations need their assumptions stated in place; no new corpus-wide terminology or style policy was introduced.

Reopen this review if the chapter hash changes; an admitted counterexample defeats a corrected identity or bound; the shared-channel tests require independent tuning; reference normalization, correlation control, or equilibrium fails; a source verification contradicts the stated comparison; or validation of these scoped files fails. A future scientific recovery requires its own proof and independent evidence, even if all content checks remain green.

## Coordinator handoff

Exactly two files were written by this worker: the chapter and this report. No shared status file was updated. The bounded disposition is “reviewed and repaired at the recorded source bytes; constitutive and thermodynamic recovery obligations remain open.” The coordinator can use this receipt to update the shared review status and retain the final generated-index check alongside the earlier drift history. No additional work in this file scope is requested from another worker while that byte-bound handoff is being reconciled.

## Appendix A — reproducible focused content command

Run from the existing Architrino checkout. The command reads only and executes its controls before reading the chapter.

```bash
node --input-type=module - <<'NODE'
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {parseCorpusDisplayEquations} from './scripts/build-equation-mapping-corpus.mjs';
import {loadVendoredCommonJsBundle} from './scripts/load-vendored-commonjs-bundle.mjs';
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
assert.equal(hash('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
const katex=loadVendoredCommonJsBundle(path.resolve('apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js'));
assert.ok(katex.renderToString('a^2+b^2=c^2',{throwOnError:true}).includes('katex'));
assert.throws(()=>katex.renderToString('\\thisIsNotACommand',{throwOnError:true}));
const strip=s=>s.replace(/^\s*(```|~~~)[^\n]*\n[\s\S]*?^\s*\1\s*$/gm,m=>m.replace(/[^\n]/g,' ')).replace(/`[^`\n]*`/g,m=>' '.repeat(m.length));
const maths=s=>[...strip(s).matchAll(/\$\$([\s\S]*?)\$\$|(?<![\\$])\$(?!\$)((?:\\.|[^$\n])+)\$/g)].map(m=>({tex:m[1]??m[2],display:m[1]!==undefined,line:1+s.slice(0,m.index).split('\n').length-1}));
const fixture='# Known\n$a=b$\n$$\nc=d\n$$\n[View →](../../../../equation-mapping.html#known)\n```tex\n$$ignored$$\n```\n~~~text\n$x$\n~~~\n`$also$`';
assert.deepEqual(maths(fixture).map(m=>[m.tex.trim(),m.display,m.line]),[['a=b',false,2],['c=d',true,3]]);
const p=parseCorpusDisplayEquations('content/markdown/aaa/test/known.md',fixture);
console.log('Parser control shape:',JSON.stringify(p).slice(0,550));
assert.equal(p.length,1);
const source=fs.readFileSync('scripts/validate-content.mjs','utf8');
const start=source.indexOf('function stripMarkdownLinkTarget('),end=source.indexOf('function stripMarkdownFencedCodeBlocks(');
assert.ok(start>0&&end>start);
const context={path,rootDir:'/known',errors:[],warnings:[],normalizePath:s=>s.replaceAll('\\','/'),fs:{existsSync:p=>p==='/known/ok.md',statSync:()=>({isDirectory:()=>false})}};
vm.createContext(context);vm.runInContext(source.slice(start,end),context);
context.auditMarkdownRelativeLinks(['source.md'],new Map([['source.md','[valid](ok.md)\n[broken](missing.md)\n```\n[example](also-missing.md)\n```']]));
assert.equal(context.errors.length,1);assert.match(context.errors[0],/source.md:2.*missing.md/);assert.equal(context.warnings.length,0);
console.log('KNOWN CASES PASS: SHA256 abc; valid/invalid KaTeX; 2 math expressions with fenced/inline code excluded; 1 repository display equation; repository relative-link audit detects only planted missing target.');

const target='content/markdown/aaa/spacetime/emergent-metric.md';
const text=fs.readFileSync(target,'utf8');
const math=maths(text);
let errors=[];
for(const m of math){try{katex.renderToString(m.tex,{throwOnError:true,displayMode:m.display,strict:'error'});}catch(e){errors.push({line:m.line,error:e.message})}}
const equations=parseCorpusDisplayEquations(target,text);
const links=context.extractMarkdownLinks(text);
context.rootDir=process.cwd();context.fs=fs;context.errors.length=0;context.warnings.length=0;
context.auditMarkdownRelativeLinks([target],new Map([[target,text]]));
const registry=JSON.parse(fs.readFileSync('content/generated/equation-mapping/corpus-equations.json','utf8'));
const ids=equations.map(e=>e.existingLink?.semanticId);
const drift=[];
for(const e of equations){const r=registry.records.find(r=>r.semanticId===e.existingLink?.semanticId);if(!r||r.formulaTeX!==e.tex.trim()||r.source.sourcePath!==target)drift.push({line:e.startLine,id:e.existingLink?.semanticId,missing:!r})}
console.log(JSON.stringify({sha256:hash(text),lines:text.trimEnd().split('\n').length,math:math.length,displays:equations.length,mathErrors:errors,links:links.length,linkErrors:context.errors,linkWarnings:context.warnings,missingDisplayLinks:ids.filter(id=>!id).length,duplicateEquationIds:ids.filter((id,i)=>ids.indexOf(id)!==i),registryFormulaDrift:drift},null,2));
assert.equal(errors.length,0);assert.equal(context.errors.length,0);assert.equal(context.warnings.length,0);assert.equal(ids.filter(id=>!id).length,0);assert.equal(ids.filter((id,i)=>ids.indexOf(id)!==i).length,0);
NODE
```

## Appendix B — reproducible mathematical witness command

Run from the existing checkout. This command applies no patch and runs the known controls before the witness calculations.

```bash
node --input-type=module - <<'NODE'
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const mul=(a,b)=>{let c=[0,0,0];for(let i=0;i<a.length;i++)for(let j=0;j<b.length&&i+j<3;j++)c[i+j]+=a[i]*b[j];return c;};
const inv=a=>[1/a[0],-a[1]/a[0]**2,a[1]**2/a[0]**3-(a[2]||0)/a[0]**2];
assert.deepEqual(mul([1,1],[1,1]),[1,2,1]);assert.deepEqual(inv([1,1,0]),[1,-1,1]);
const dim=(d,p)=>d.map(x=>x*p);const sub=(a,b)=>a.map((v,i)=>v-b[i]);
assert.deepEqual(sub([1,0],[0,1]),[1,-1]);
const entropy=p=>-p.reduce((s,x)=>s+(x===0?0:x*Math.log(x)),0);
assert.equal(Math.abs(entropy([1,0])),0);assert.ok(Math.abs(entropy([.5,.5])-Math.log(2))<1e-14);
const clean=s=>s.replace(/^\s*(```|~~~)[^\n]*\n[\s\S]*?^\s*\1\s*$/gm,m=>m.replace(/[^\n]/g,' '));
const slug=s=>s.toLowerCase().replace(/[`*_]/g,'').replace(/[^\p{L}\p{N}\s-]/gu,'').trim().replace(/\s/g,'-');
const anchors=s=>[...clean(s).matchAll(/^#{1,6}\s+(.+)$/gm)].map(m=>slug(m[1]));
assert.deepEqual(anchors('# Alpha Beta\n## Gamma (Delta)\n~~~\n# Ignore\n~~~'),['alpha-beta','gamma-delta']);
const patch=t=>'diff --git a/.tmp/crw-005-em-known-control b/.tmp/crw-005-em-known-control\nnew file mode 100644\n--- /dev/null\n+++ b/.tmp/crw-005-em-known-control\n@@ -0,0 +1 @@\n+'+t+'\n';
const diffGood=spawnSync('git',['apply','--check','--whitespace=error','-'],{input:patch('good'),encoding:'utf8'});
const diffBad=spawnSync('git',['apply','--check','--whitespace=error','-'],{input:patch('bad '),encoding:'utf8'});
console.log('diff controls',diffGood.status,diffBad.status,diffBad.stdout,diffBad.stderr);
assert.equal(diffGood.status,0);assert.notEqual(diffBad.status,0);assert.match(diffBad.stdout+diffBad.stderr,/trailing whitespace/);
console.log('KNOWN CASES PASS: truncated polynomial multiplication/reciprocal; dimension subtraction; deterministic and equiprobable entropy; Markdown heading/fence control; Git whitespace positive and planted-negative controls.');

const c_f=1,c0=1;
const Udim=[2,-2],cdim=[1,-1];
const oldDim=sub(dim(Udim,3),dim(cdim,6)),newDim=sub(dim(Udim,3),dim(cdim,4));
assert.deepEqual(oldDim,[0,0]);assert.deepEqual(newDim,Udim);
for(const gamma of [0,1,2]){
 const xi=mul([1,-1,0],inv([1,gamma,0]));
 assert.equal(xi[1],-(1+gamma));
}
for(const D2 of [-1,0,1]){
 const g00=[-1,2,2*D2-2];
 assert.ok(-g00[2]/2===1-D2);
}
const e=.001,N=Math.exp(-e),omega=N,xi=1,gradPhi=-e;
const actual=-xi*xi*gradPhi,oldPrediction=-gradPhi/(omega*omega),newPrediction=-N*N*gradPhi/(omega*omega);
assert.ok(Math.abs(actual-newPrediction)<1e-15);assert.ok(Math.abs(actual-oldPrediction)>1e-7);
const rapidity=Math.log(2),acc=.02;
const a0=acc*Math.sinh(rapidity),a1=acc*Math.cosh(rapidity);
assert.ok(Math.abs(-a0*a0+a1*a1-acc*acc)<1e-15);
assert.ok(a1*a1>acc*acc);
const count=Math.log(2),weighted=entropy([.9,.1]);assert.ok(weighted<count);
console.log(JSON.stringify({units:{c_f,c0},potentialRemainders:{old:oldDim,corrected:newDim},PPNFirstOrder:'xi coefficient = -(1+gamma)',PPNSecondOrder:'beta = 1-D2',geodesicWitness:{N,omega,xi,gradPhi,actual,oldPrediction,newPrediction,oldErrorBound:0},properAcceleration:{timeComponent:a0,spaceComponent:a1,lorentzianNormSquared:-a0*a0+a1*a1,spatialOnlyNormSquared:a1*a1},entropy:{counting:count,weighted}},null,2));

NODE
```

## Appendix C — report and heading-fragment checks

Run from the existing checkout. The source fragment check is restricted to the chapter's Markdown heading links; it is not a site-wide anchor audit. This command also checks report math, local links, and trailing whitespace after its known controls.

```bash
node --input-type=module - <<'NODE'
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {parseCorpusDisplayEquations} from './scripts/build-equation-mapping-corpus.mjs';
import {loadVendoredCommonJsBundle} from './scripts/load-vendored-commonjs-bundle.mjs';
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
assert.equal(hash('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
const katex=loadVendoredCommonJsBundle(path.resolve('apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js'));
assert.ok(katex.renderToString('a^2+b^2=c^2',{throwOnError:true}).includes('katex'));
assert.throws(()=>katex.renderToString('\\thisIsNotACommand',{throwOnError:true}));
const strip=s=>s.replace(/^\s*(```|~~~)[^\n]*\n[\s\S]*?^\s*\1\s*$/gm,m=>m.replace(/[^\n]/g,' ')).replace(/`[^`\n]*`/g,m=>' '.repeat(m.length));
const maths=s=>[...strip(s).matchAll(/\$\$([\s\S]*?)\$\$|(?<![\\$])\$(?!\$)((?:\\.|[^$\n])+)\$/g)].map(m=>({tex:m[1]??m[2],display:m[1]!==undefined,line:1+s.slice(0,m.index).split('\n').length-1}));
const fixture='# Known\n$a=b$\n$$\nc=d\n$$\n[View →](../../../../equation-mapping.html#known)\n```tex\n$$ignored$$\n```\n~~~text\n$x$\n~~~\n`$also$`';
assert.deepEqual(maths(fixture).map(m=>[m.tex.trim(),m.display,m.line]),[['a=b',false,2],['c=d',true,3]]);
const p=parseCorpusDisplayEquations('content/markdown/aaa/test/known.md',fixture);
console.log('Parser control shape:',JSON.stringify(p).slice(0,550));
assert.equal(p.length,1);
const source=fs.readFileSync('scripts/validate-content.mjs','utf8');
const start=source.indexOf('function stripMarkdownLinkTarget('),end=source.indexOf('function stripMarkdownFencedCodeBlocks(');
assert.ok(start>0&&end>start);
const context={path,rootDir:'/known',errors:[],warnings:[],normalizePath:s=>s.replaceAll('\\','/'),fs:{existsSync:p=>p==='/known/ok.md',statSync:()=>({isDirectory:()=>false})}};
vm.createContext(context);vm.runInContext(source.slice(start,end),context);
context.auditMarkdownRelativeLinks(['source.md'],new Map([['source.md','[valid](ok.md)\n[broken](missing.md)\n```\n[example](also-missing.md)\n```']]));
assert.equal(context.errors.length,1);assert.match(context.errors[0],/source.md:2.*missing.md/);assert.equal(context.warnings.length,0);
console.log('KNOWN CASES PASS: SHA256 abc; valid/invalid KaTeX; 2 math expressions with fenced/inline code excluded; 1 repository display equation; repository relative-link audit detects only planted missing target.');


const slug=s=>s.toLowerCase().replace(/[\x60*_]/g,'').replace(/[^\p{L}\p{N}\s-]/gu,'').trim().replace(/\s/g,'-');
const anchors=s=>[...strip(s).matchAll(/^#{1,6}\s+(.+)$/gm)].map(m=>slug(m[1]));
assert.deepEqual(anchors('# Alpha Beta\n## Gamma (Delta)\n~~~\n# Ignore\n~~~'),['alpha-beta','gamma-delta']);
const trailing=s=>s.split('\n').flatMap((line,i)=>/[ \t]+$/.test(line)?[i+1]:[]);
assert.deepEqual(trailing('good\nbad \n'),[2]);
console.log('KNOWN CASES PASS: heading/fence and planted trailing-space controls.');
const chapter='content/markdown/aaa/spacetime/emergent-metric.md';
const chapterText=fs.readFileSync(chapter,'utf8');
const fragmentLinks=context.extractMarkdownLinks(chapterText).filter(l=>l.target.includes('.md#'));
const fragmentErrors=[];
for(const link of fragmentLinks){
 const [file,fragment]=link.target.split('#');
 const resolved=path.resolve(path.dirname(chapter),decodeURIComponent(file));
 if(!anchors(fs.readFileSync(resolved,'utf8')).includes(decodeURIComponent(fragment))) fragmentErrors.push(link);
}
const report='reference/priorities/aaa-corpus-rewrite/evidence/crw-005-emergent-metric-review-2026-09-12.md';
const reportText=fs.readFileSync(report,'utf8');
const reportMath=maths(reportText), reportMathErrors=[];
for(const m of reportMath){try{katex.renderToString(m.tex,{throwOnError:true,displayMode:m.display,strict:'error'});}catch(e){reportMathErrors.push({line:m.line,error:e.message});}}
context.rootDir=process.cwd();context.fs=fs;context.errors.length=0;context.warnings.length=0;
context.auditMarkdownRelativeLinks([report],new Map([[report,reportText]]));
const reportTrailing=trailing(reportText);
console.log(JSON.stringify({chapterSha256:hash(chapterText),fragmentLinks:fragmentLinks.length,fragmentErrors,reportSha256:hash(reportText),reportMath:reportMath.length,reportMathErrors,reportLinks:context.extractMarkdownLinks(reportText).length,reportLinkErrors:context.errors,reportLinkWarnings:context.warnings,reportTrailing},null,2));
assert.equal(fragmentErrors.length,0);assert.equal(reportMathErrors.length,0);assert.equal(context.errors.length,0);assert.equal(context.warnings.length,0);assert.equal(reportTrailing.length,0);
NODE
```
