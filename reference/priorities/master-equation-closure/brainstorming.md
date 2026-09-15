# Master-Equation Closure: Geometry, Accounts, and Provisional Extensions

This synthesis isolates explanatory results and unaccepted mechanism ideas surrounding the acceleration-first Master Equation. Canonical dynamics, focused proof packets, and accepted executable objects retain their existing owners.

## How the small-system question guides closure

The immediate physical question is whether two initially separated, distinct architrinos can share one position at one absolute time under their own delayed evolution. Its scientific purpose is to expose what the Master Equation permits and whether the equation remains predictive at the events it permits. The intended two-particle stationary or collinear control must specify the entire input history. Additional prescribed trajectories are useful only when they settle an identifiable question that the existing controls cannot settle.

There are three possible kinds of progress. A contact construction demonstrates attainability within its assumptions. An invariant exclusion theorem demonstrates that a specified class cannot reach contact. An earlier loss of continuation identifies a limit of the equation's predictive domain; stopping there does not prove that physical motion avoids contact. Determining whether that limit requires a changed admissible class, an additional state variable, or a changed update is a subsequent research question, not a conclusion supplied by the stoppage itself.

The current parallel efforts have different roles. The quintic boundary assessment tests whether an existing, unadopted candidate actually determines an outgoing two-particle evolution at the identified obstruction; even a successful short continuation does not establish eventual contact. Population analysis tests whether infinitely many delayed contributions define a finite and continuously varying update and can support a mutually evolving environment. It must distinguish finite source modifications from independently prescribed coordinated changes throughout an infinite population. Account analysis asks whether independently defined conserved quantities can accompany the same update; it does not decide coordinate contact by itself. These are related closure questions with separate acceptance conditions, not interchangeable evidence for the two-particle question.

Cancellation needs the same distinction. A stationary alternating lattice has the reviewed grouped convergence property. The [summation adjudication](analysis/population-summation-independent-adjudication.md) exhibits admitted histories whose emission positions remain at the anchors but whose source velocities destroy the required weighted cancellation. That is a derived obstruction to the broad proposed history class. It does not establish that disturbing two particles and then solving the coupled equations generates those coordinated histories. Establishing the environmental response requires an actual coupled evolution theorem.

The scientific motivation is to identify the law's domain, allowed events, robustness and continuation requirements, thereby reducing the choices left open in Master Equation closure. The accepted contact and mirror results support their stated local conclusions; the present population restriction, quintic rule and account-sector representation remain proposals. A universal singularity-free claim would require control of all admitted failure mechanisms throughout the claimed evolution interval. Neither no-contact in one class nor finite contact in another supplies that control. A complete unchanged-law continuation on the identical mirror history would challenge the accepted obstruction; a different candidate law would address a different premise.

## Returned pulse and the separation estimate — 2026-09-14

The [next-feedback analysis](analysis/smooth-two-particle-next-feedback.md) distinguishes arrival of a pulse feature from reversal of the resulting motion. The first zero of the old pulse velocity is not a zero of the environmental acceleration; the target subsequently receives the integrated environmental history. Receipt of the complete pulse endpoint is a useful event because the remaining source displacement and velocity then reflect the whole driving pulse. The [independent assessment](analysis/smooth-two-particle-next-feedback-independent-adjudication.md) accepts continuation through $21\ell/16$ and the exact anchor comparison, which sums all four sources before taking bounds and is positive through both pulse lobes, including the transverse contributions. The subsequent [signed-error assessment](analysis/smooth-two-particle-signed-error-independent-adjudication.md) accepts an actual-history error enclosure over the unchanged $0<g\le16$ domain and proves transient approach at $g=16$, followed by renewed separation by the latest pulse-end reception. Source-time shifts and transmitter/range weights supply opposing terms that a positive source sum misses. Increasing separation remains proved for every coupling through $17\ell/16$; the later full coupling classification remains open. The mathematical treatment is in the [signed-error analysis](analysis/smooth-two-particle-signed-error.md) and [manuscript Section 6.15](manuscript.md#615-signed-reception-error-and-a-transient-approach).

### The signed environmental receiver coefficient

Claim grade: derived amplitude coefficient. The [signed-error independent assessment](analysis/smooth-two-particle-signed-error-independent-adjudication.md) reconstructs the source coefficients and their subsequent target transfer; the earlier next-feedback assessment did not cover them. Introduce $\lambda p$ only as an auxiliary differentiation family, with the physical supplied pulse recovered at $\lambda=1$; this adopts no changed history. For the four environmental offsets $k=(1,0,\pm1),(1,\pm1,0)$, write $d_0=\sqrt2$, $L=1/4$, $F(u)=\int_0^up(v)\,dv$ and $J(u)=\int_0^u(u-v)p(v)\,dv$. The first-amplitude old-pulse field and receiver response are

$$
\begin{gathered}
q_1(u,y)=A(R)p(u-\|R\|+d_0)+B(R)p'(u-\|R\|+d_0),\qquad R=k+y,\\
A(R)=\frac{3RR_3}{\|R\|^5}-\frac{e_3}{\|R\|^3},\qquad B(R)=\frac{RR_3}{\|R\|^4},\\
Y_k^{[1]}=g[A(k)J+B(k)F],\qquad
D_yq_1=DA\,p+DB\,p'-(Ap'+Bp'')n^{\mathsf T}.
\end{gathered}
$$

The stationary field is cubic at the anchor, so it contributes at neither first nor second amplitude order. Direct differentiation and summation over the four offsets yield the second-order receiver contribution, after extracting $g^2$,

$$
R_2(u)=-\frac{96}{d_0^{12}}Jp-\frac{48}{d_0^{11}}Jp'-\frac8{d_0^{10}}Jp''
-\frac{36}{d_0^{11}}Fp-\frac{20}{d_0^{10}}Fp'-\frac4{d_0^9}Fp''.
$$

Because $p,p'$ vanish at the endpoints and $F(0)=F(L)=0$, integration by parts gives $\int Jp=-\int F^2$, $\int Jp'=0$, $\int Jp''=I_0$, $\int Fp=0$, $\int Fp'=-I_0$, and $\int Fp''=0$, with all integrals on $[0,L]$ and $I_0=\int p^2$. Thus

$$
\int_0^L R_2(u)\,du=\frac32\int_0^LF^2+\frac38I_0>0.
$$

The exact primitive $F(u)=-u^5(1-4u)^5/5$ gives $\int F^2=(3/1120)I_0$. Combining this with the anchor coefficient gives the formal four-source terminal first-velocity sum

$$
\sum_k\partial_uY_{k,1}(u;\lambda)
=\lambda^2I_0\left[\frac{3g}{d_0^7}+\frac{849g^2}{2240}\right]+o(\lambda^2),
\qquad u\ge L,
$$

at the stated orders before those sources receive new generated channels. The linear first-coordinate sum cancels. This positive receiver contribution belongs in the signed estimate, but positivity of the terminal source coefficient does not prove target separation through the pulse. The accepted signed-error proof constructs second-degree comparison histories, matches the full equations through degree two, and bounds their finite-amplitude residual with implicit-root derivatives over $0\le\lambda\le1$ and $0<g\le16$. It includes moving pulse endpoints and subsequent source-to-target roots and weights. Its target velocity error is below $10^{-11}$ through all pulse-end receptions, with a sharper $4\times10^{-13}$ bound through target offset $3/25$ at $g=16$. At that event the actual velocity is negative. A missing derivative term, incorrect endpoint integration or a residual exceeding the certified bounds would invalidate the corresponding conclusion.

The original bounded algebra check used the shared venv and SymPy, first verifying the known derivative of $1/x$ in a separate invocation, then differentiating $q_1$, substituting the four offsets and checking the polynomial integrals. That check covers the displayed algebra only. Its derivation and evidence remain in `.tmp/mec-008-next-feedback/pulse-integral.md`. The later independent coefficient and residual reconstruction is recorded in the signed-error adjudication; current acceptance rests on that larger argument.

### Preparation limits the physical interpretation

The [preparation analysis](analysis/smooth-two-particle-preparation.md) and its [independent assessment](analysis/smooth-two-particle-preparation-independent-adjudication.md) prove that the exact prescribed past cannot satisfy the unforced Master Equation. The targets' smooth departure from stationary history contradicts local uniqueness while every received source is stationary. A specified environmental receiver also receives a nonzero pulse acceleration before release despite its stationary prescribed history. Smooth acceleration and jerk matching at release do not remove either contradiction. The forward result remains a valid conditional initial-history theorem; neither its early separation nor its later reversal establishes typical behavior in a self-consistently prepared population. A different earlier coupled history must be specified before that interpretation can be examined.

## Local Wake Geometry and Superposition

On one connected regular moving-simple-root chart, the canonical per-root acceleration row has a derived scalar-gradient representation. Finite scalar superposition is conditional on every row occupying one shared retained-history and boundary chart; it does not license an independently postulated vector-superposition law.

The derived treatment belongs in [receiver-wake-gradient-closure.md](analysis/receiver-wake-gradient-closure.md) and the canonical Master Equation chapter. Singular sources, folds, coincidences, the self diagonal, chart gluing, and infinite-source limits require separate prescriptions or theorems.

Plainly: a local scalar description can be exact on one regular branch without automatically extending across every singularity or infinitely many sources.

## Reception Geometry and Root Playback

The canonical root normal, delayed range, transmitter factor $D_t$, receiver playback ratio $D_r/D_t$, and complete root multiplicity should be exhausted before introducing a new inside-versus-outside wake-side variable. The instantaneous acceleration row and root playback are distinct: $D_r$ can reverse the direction in which a root is traversed without becoming another acceleration multiplier.

At sharp width, one causal hit is associated with a source-history point selected by the root equation. Certification nevertheless requires a surrounding path segment to establish continuity, root identity, gaps, and Jacobian floors. A finite-width regularization replaces the point by a small source-path neighborhood.

## Causal-Root Correspondence

For each ordered pair of worldlines, the delayed root condition defines a possibly multivalued correspondence between emission and reception times. Regular branches, folds, coincidences, and finite-width neighborhoods are different strata of this correspondence.

This viewpoint may support composition and global closure statements more naturally than a receiver-time list, but triple composition is not established. Any sheaf-like or category-like construction must preserve label identity, boundary ownership, root multiplicity, and the event ledger rather than hiding them behind abstract notation.

## Photon and Field-Speed Separation

A photon-channel carrier has centerline propagation speed $c_\gamma$, while its constituent histories can include transverse internal motion. In an orthogonal idealization,

$$
\mathbf v_a
=
c_\gamma\hat{\mathbf e}+\mathbf v_\perp,
\qquad
\|\mathbf v_a\|^2
=
c_\gamma^2+\|\mathbf v_\perp\|^2.
$$

Plainly: an observer-facing carrier speed and a constituent's absolute path speed are different quantities. The causal-root ledger must expose any self-hit, partner-hit, inactive, or caustic rows created by the constituent histories.

The middle-support field-speed hinge supplies a related provisional diagnostic. If a retained history crosses $v_M^{\mathrm{rel}}=c_f$, its root-count word may switch between absent, ordinary, and degenerate rows. Such a word is a topology diagnostic, not a communication code, action quantum, or accepted Switch mechanism.

## Conservation as Slice Accounting

Conservation candidates should be formulated as absolute-time slice functionals containing both assembly-held and in-flight wake assignments. Emission provenance is well defined for an in-flight record; pairing every emission with a unique future settlement is generally not, because future reception is state-dependent and one expanding isochron may reach many receivers.

Plainly: the books can be balanced at each time without pretending that every emitted entry has one predetermined future recipient.

Candidate ledger rows include energy, momentum, angular momentum, and net polarity, with exterior-boundary flux where the retained domain is finite. Observer-level boost and Lorentz rows remain recovery targets because $c_f$ anchors the substrate frame.

## Density and Constant Discipline

Absolute density is a coarse count against Euclidean void volume, while observed density uses assembly-defined rulers. The dimensionless occupancy $\rho R_M^3$ is a candidate control for sea-mediated response, but no claim that particle structure is density-independent or that cosmological behavior depends only on this combination is derived.

Numerical instantiations use $c_f=1$. A complete constant audit must derive the dimensions and independent dimensionless combinations of $\kappa$, $\varepsilon$, density, and initial-distribution data before any remaining number is identified with the fine-structure coupling or another observed constant.

## Populated Histories: Current Mathematical Synthesis

The [independent adjudication](analysis/mec-008-independent-adjudication.md) accepts the finite distinct-label coordinate-contact theorem and its retained unchanged-oracle prefix, but rejects this construction as completion of MEC-008: no near-diagonal self root is born or accumulates in its incoming EOM future. Equal coordinates do not merge primitive labels. MEC-008 remains mathematically unresolved at its named same-transmitter target; the missing result is an EOM-evolved self-channel event or an invariant exclusion theorem, not another review of this contact certificate.

The central population question is whether the delayed acceleration functional and its full history derivative converge in a stated history norm, and whether the entire EOM population preserves that domain. A current-time density count does not bound the causal emission census. Uniform estimates at the target pair also do not control the independently changing environmental trajectories.

The dyadic estimate in the owner supplies a concrete conditional result: if there are at most order $R^3$ cells in a radius-doubling shell and each complete cell acceleration and history derivative are bounded by order $R^{-p}$ with $p>3$, then their complete-cell tails are bounded by order $R^{3-p}$. At $p=4$ this is an inverse-radius bound. The estimate is derived by summing a geometric series; the delayed moment cancellation needed to attain it is still unproved. A divergent upper majorant at $p=3$ is not proof that the actual sum diverges. Cellwise absolute convergence does not establish arbitrary-source-order or alternative-partition independence.

The full history derivative includes movement of causal emission times and the resulting sampled source-acceleration term. MEC-006's fixed-reception gradient is a starting identity, not the desired infinite-dimensional derivative theorem. A cancellation valid for equal-time positions can fail for unequal nonstationary emission times or for independent perturbations outside the constrained cell class. The population effort must derive these distinctions rather than hide them in a neutrality assumption.

Conserved accounts are separate. Signed acceleration cancellation cannot create finite nonnegative source capacity; the receiver-multiplicity no-go and the nonzero-acceleration/playback-zero control remain applicable to their declared account classes. The required wake outputs are not a proved coordinate-minimal primitive state. The lineage-gated quintic candidate addresses diagonal-born self roots and does not supply the distinct-transmitter continuation needed at the shelf-history collision.

Claim grades: the conditional cell-tail estimate and root-equation distinctions are derived. The proposed population class is nonempty by its explicit prescribed controls; its stationary absolute-shell lower bound obstructs arbitrary-source ordering, while stationary complete-block cancellation is narrower. Candidate selection remains provisional and independent adjudication remains outstanding. Delayed cancellation, coupled evolution, population contact transfer, and a physically selected grouping remain proof targets. Falsifiers include a failed shell/root inequality, a contradicting exact block moment, an uncontrolled history variation, or evolution leaving the declared domain. The [current queue](work-queue.md#coordinated-campaign-execution-order) owns further work.

## Reuse Of Existing Analytical Results

| Analytical input | What can be reused | Boundary retained |
| --- | --- | --- |
| MEC-006 regular gradient and scalar representation | Simple-root position sensitivity and general root variation | No singular value, full-history tail theorem, or infinite scalar/action |
| MEC-007 mirror encounter | First boundary and unchanged-law obstruction on the stated history | No universal speed ceiling, populated exclusion, or outgoing law |
| MEC-005 and topological ledger | Complete roots/complements, multiplicity, incident-boundary ownership, refinement tests | Structural record checks are not raw-history geometry; topology cancellation is not acceleration or account cancellation |
| Characteristic-tail analysis | Regular scalar-kernel receiver identity and two negative whole-action obstructions | CT-FH-1 supplies no action repair or Noether-account input |
| A1/VP-1 packets | Conditional root tubes, finite-memory inequalities, and dependent implicit transport | Historical numbers need current reproduction; no population-uniform memory, EOM orbit, or acceleration result from receiver playback |
| Branch, pressure, and Lorentz/GR packets | Existing downstream dependency and extraction definitions | No constitutive or observer coefficient follows from population admissibility |

The compact-torus topology control and bounded spiral histories are useful laboratories but do not define a complete-past Euclidean population limit. Their domain sizes and retained horizons must be tracked explicitly if used as finite approximants. Geometric shape weights are extraction choices, not constituent masses.

## Rejected and Limited Mechanism Ideas

A reception-active wake-maturity proposal can regularize a coincident endpoint only by introducing new scale and capacity parameters. Its conditional momentum-like integration weight is numerical bookkeeping, not architrino mass or ontology. Until those parameters and the full account law are derived and independently varied, the proposal remains weaker than the existing obstruction it was meant to address.

Likewise, the conjecture that super-field-speed episodes create a restoring self-debt is not implied by the existence of folds or later self-hits. A trajectory may fail to encounter its earlier wake, and polarity and geometry can change the sign of later contributions.

## Assessment and Promotion Boundary

Promoted scalar-gradient and orientation material remains with its focused proof and corpus owners. Accepted causal-wake, coincidence, conservation, and source-law tasks remain in [work-queue.md](work-queue.md). The ideas below are neither queue acceptance nor canonical dynamics.

## Unresolved Ideas

- **[closure target] Singular scalar-chart extension.** Construct compatible scalar descriptions or an impossibility result across folds, coincidences, source singularities, and the self diagonal, then prove chart gluing and an infinite-source limit under explicit bounds.
- **[guessed] Oriented wake-side dependence.** Exhaust paired canonical root controls first; only a residual under inside/outside reversal would justify a new constitutive variable, which then requires an independent falsifier.
- **[guessed] Causal-root correspondence composition.** Determine whether ordered-pair settlement correspondences compose across triples while retaining label, multiplicity, boundary, and event ownership; likely destination is a focused mathematical packet.
- **[guessed] Field-speed hinge word.** Derive a retained middle-support history whose root-status sequence is stable under refinement and test whether its action increments are $h$-scale, $2h$-scale, or neither.
- **[guessed] Equivalent-source reduction.** Test whether one virtual source history can reproduce an arbitrary receiver acceleration record through the unchanged delayed law; zero crossings, folds, and causal consistency are the principal falsifiers.
- **[closure target] Dimensionless constant audit.** Derive the complete independent parameter set after the $c_f=1$ convention and reject any proposed observed-constant identification that lacks a same-record assembly map.
- **[closure target] Polarity-resolved conserved-account reduction.** Determine whether separate electrino and positrino entries are required inside the MEC-004 motion, wake, and boundary accounts before any symmetric reduction; the reduction fails if two ledgers with the same aggregate account produce different accepted updates or observer-level conservation rows.
- **[closure target] Scalar wake sufficiency.** Prove whether a scalar wake map plus explicit causal-root provenance reconstructs every required acceleration contribution on its declared domain; falsifier: two admissible histories with the same scalar map but different received acceleration ledgers.
- **[closure target] Self-hit bifurcation classification.** Track root births, mergers, transversality loss, multistability, and scattering near field-speed thresholds on one complete retained-history family without assigning particle identity; failure to preserve root identity or event ownership under refinement blocks the classification.

## First-wave provenance boundary

The [raw-history affine result](analysis/pairwise-causal-root-ledger-closure.md#exact-ten-branch-control) derives ten branches, including four positive-delay self branches, and eighteen uniquely owned point events. It distinguishes same-label diagonal attachment from different-label partner events even at equal coordinates. Exact subdivision and traversal permutation preserve identities. These are prescribed continuous corner histories; their branch incidence is not smooth EOM birth lineage. The instrument leaves degenerate root intervals unresolved and supplies no acceleration cancellation, source debit, or conserved account. Independent adjudication of this frozen result precedes stronger reuse.

## Minimal coincidence-control preference

Operator direction, 2026-09-09: reduce proliferation of prescribed-path examples and prioritize a plus/minus pair released from rest or collinear velocities with an explicit shared history contract. The four-particle construction retains its value as a finite populated distinct-label existence result, but does not settle generic two-body behavior or self-birth. Review existing MEC-007 stationary/mirror results before designing another control. A single admitted EOM contact is an existential witness; a non-contact pair trajectory is not universal exclusion. A solver halt at an earlier singularity is neither contact nor dynamical avoidance. This preference changes control selection, not the frozen subjects of the authorized reviews.

## Second-wave mathematical integration

The [independent population review](analysis/population-independent-adjudication.md) accepts the prescribed class, density/root counts, stationary and bump nonemptiness, stationary block convergence and arbitrary-source-order obstruction. Uniform relaxed margins persist; exact class constants need uniform slack. Nonstationary summation, partition equality, infinite derivatives and EOM preservation remain open.

The [independent affine review](analysis/mec-005-affine-independent-adjudication.md) accepts ten branches, four self branches, eighteen boundary points and complete complements/incidence at bounded prescribed-corner scope. It does not supply smooth EOM self-birth lineage, general-envelope certification or physical accounts.

The allocation analysis derives a conditional finite-aggregate-budget obstruction even for receiver-dependent/nonlocal sharing, provided funded acceleration is bounded by a population-independent function vanishing at zero allocation. That observation assumption is additional, not a consequence of the Master Equation. Nondepleting observation and separate account channels remain open; independent review is now required.

## Third-wave disposition

The [allocation adjudication](analysis/allocation-independent-adjudication.md) accepts finite-sharing and playback-throughput obstructions, boundary additivity and complete-past accumulation at their stated conditional scope. These additional account-architecture assumptions are not EOM primitives. No conserved accounts or general impossibility of account construction follows. The new [summation candidate](analysis/population-delayed-summation.md) reports admissible small history changes causing signed block-sum divergence; the [derivative candidate](analysis/population-history-derivative.md) reports a discontinuity obstruction in the same reviewed norm. Both remain derived candidates pending independent xhigh adjudication. Population evolution and exhaustion must not proceed on assumed convergence or continuity.

## Accepted population obstructions

Independent xhigh adjudications accept the [signed summation obstruction](analysis/population-summation-independent-adjudication.md) at receiver zero under every complete eight-source-block ordering and the [history discontinuity obstruction](analysis/population-derivative-independent-adjudication.md) for extensions respecting canonical finite source modifications. Arbitrarily small admitted perturbations defeat the proposed neighborhood sum/continuity premises. These are accepted obstructions on the unchanged class and norm, not nonexistence of individual dense EOM solutions or a coincidence exclusion. Coupled population evolution remains blocked; no replacement class, partition or account assumption is selected.

## Rigid cells and delayed cancellation

The [independently accepted owner derivation](analysis/coincide-or-not.md#rigid-cell-moment-cancellation-and-its-delayed-obstruction) tests the stronger suggestion that preserving exact cell geometry could protect spatial cancellation. A common rigid translation preserves all alternating eight-source moments through quadratic order at every time, but the receiver samples its velocity at eight different emission times. A complete-history pulse construction makes the resulting transmitter-weight corrections have one positive projection, causing signed divergence with uniformly regular roots. Growing finite cell perturbations also disprove continuity and a bounded history derivative in the original norm. Claim grade: derived at the prescribed-history scope accepted in the [independent adjudication](analysis/population-rigid-cell-independent-adjudication.md); the exact pulse, root and shell inequalities are its falsifiers.

A viable cell theorem instead needs cancellation or sufficient decay of the actual delayed transmitter-weighted moments, together with their admissible history derivatives. The owner derives sufficient conditions for inverse-fourth-power cells and inverse-radius tails. The review clarifies that the differentiability remainder must survive summation, or follow from a suitable parameter-chart argument; unweighted cellwise smallness alone is insufficient. Neither rigid correlation nor those conditional estimates establish an EOM invariant class. The separately accepted integrable-past-envelope proposal and fixed finite-support evolution retain their scopes; no new probability model, physical grouping, contact exclusion or reachability claim is adopted.

## Accepted self-delay floor and chord quantifiers

The [independent self-delay adjudication](analysis/mec-008-self-delay-independent-adjudication.md) accepts a uniform positive delay floor for recent simple self roots on the declared sharp-EOM class: bounded velocity on recent chord intervals, a common forward cone, locally absolutely continuous receiver velocity, integrable negative projection of the actual remaining acceleration, complete finite simple recent-root sections, and regular initial/cutoff sections with positive entrance delay. No uniform root-count or transmitter-factor margin is assumed. This excludes isolated regular self-diagonal approach under those hypotheses. Singular lineages, uncontrolled opposing remainders, and endpoints without finite continuous velocity remain unresolved. MEC-007 and the finite distinct-label contact result retain their accepted scopes; general MEC-008 remains open.

Fixed-reception self-root accumulation requires field speed and vanishing quadratic and cubic chord coefficients. Moving-reception accumulation instead satisfies the joint residual equation; continuous endpoint velocity requires field speed, and incoming C2 accumulation additionally requires zero endpoint speed derivative. Cubic vanishing is not generally necessary for a moving-reception sequence. These geometric conditions establish neither EOM reachability nor a universal speed ceiling.

## Parallel closure fronts

The [finite-event independent review](analysis/mec-008-self-complement-independent-adjudication.md) accepts its conditional finite-event delay floor, transverse-fold integral and endpoint-velocity estimate. It rejects interpreting them as a continuation or new self-root reachability result for the stationary mirror control. Its positive-delay transverse-fold hypotheses do not cover that zero-delay endpoint birth. General MEC-008 remains open; the existing quintic candidate is now being assessed without adopting it.

Operator explicitly requested greater parallel progress. Population admissibility proposals, nondepleting account construction and the existing quintic mirror-boundary assessment can be developed independently. Proposal development is authorized; changed domain or physical assumptions remain decisions, not automatically accepted inputs.
