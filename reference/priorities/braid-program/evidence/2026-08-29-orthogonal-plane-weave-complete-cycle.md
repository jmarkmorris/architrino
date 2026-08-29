# Orthogonal-Plane A1.2/A2-Compatible Weave Acceleration-Balance Diagnostic

**Disposition: unresolved because continuum certification is absent; no bounded candidate was found.** The binary seed $\beta_f=3.070356625390253$ fails the six-worldline prescribed acceleration requirement at ordinary sampled phases, and every sampled $\beta_f$ in the bounded search fails at least one transverse or common-radius condition. Pointwise causal-root completeness passed at every reported sample. The result does not yet reject the complete continuous $\beta_f$ locus because neither the phase continuum nor the intervals between sampled $\beta_f$ values were enclosed.

Plainly: the proposed weave is not balanced at the binary cadence, and the search found no nearby or broader sampled rescue. A proof covering every phase and every speed parameter is still missing, so the correct priority-stage status is unresolved rather than a global no-go theorem.

## Frozen Geometry and Model

The evaluated history contains three polarity-conjugate antipodal binaries with $R=1$ in the root geometry, $c_f=1$, $h_a=0$, $\rho_a=R$, common $\Omega$, phases $0$, $2\pi/3$, and $4\pi/3$, one circulation sense, and the canonical phase-compensated Family-A frames. The selected polarity assignment is $\sigma=+1$ on $\mathbf C+\mathbf d_a$ and $\sigma=-1$ on $\mathbf C-\mathbf d_a$ for every binary, exactly as declared by the target in [brainstorming](../brainstorming.md#recommended-33-generalization-three-dimensional-orthogonal-plane-weave). The targeted test projects the live A1.2 configuration, materializes this zero-offset sublocus through the live A2 cyclic-frame path, and verifies that the resulting six paths and polarities equal the independently written explicit-coordinate paths.

The cyclic coordinate rotation $Q(x,y,z)=(z,x,y)$ maps binary $a$ to binary $a+1$ while preserving endpoint sign, polarity, velocity, acceleration, and circulation. Exact coordinate identities give $\|\mathbf d_a\|=1$, $\mathbf X_{a,+}+\mathbf X_{a,-}=0$, $\mathbf V_{a,\sigma}\cdot\mathbf d_a=0$, and $\mathbf A_{a,\sigma}=-\beta_f^2\mathbf X_{a,\sigma}$. For distinct cross-binary endpoints, $D^2=2\pm\sin(2\beta_fT)$, so the exact same-time separation floor is $1$; antipodal partners remain separated by $2$. The measured geometry residuals are at most $1.26\times10^{-14}$ on the declared check grid.

Plainly: the six prescribed paths meet the requested Family-A coordinate relations and never collide at equal time. Their changing cross-binary distances prove that this is the deforming orthogonal-plane weave, not the rigid two-ring octahedral chart.

The computation uses the default uncapped canonical Master Equation with $W^{\mathrm{acc}}=1/|D_t|$. The field-speed-ceiling variant is not invoked. Exact periodic circular paths supply the full causal delay interval, so no finite retained-history boundary truncates a root. The EOM solver is not invoked, and no release, retention, perturbation, or stability operation is performed.

Plainly: this is a prescribed-history acceleration test in the uncapped model. It asks what acceleration the declared past would produce; it does not show that an unconstrained path would persist.

## Root and Acceleration Instrument

For every sampled reception phase, the focused evaluator computes all $36$ directed receiver-transmitter rows. It excludes only the coincident self root, retains every nontrivial same-transmitter root, reuses the unchanged circular-binary half-lobe enumerator for same-binary rows, and adaptively isolates cross-binary roots on the complete delay domain $0\leq\Delta\leq2$. Each cross-binary interval is accepted only after a Taylor value exclusion or a monotonic derivative enclosure; sign-changing monotonic intervals are bisected. Every recorded root carries its directed identity, multiplicity, emission time, separation, $D_t$, $D_r$, $W^{\mathrm{acc}}$, Jacobian floor, contribution, isolation certificate, and adjacent inactive-root gaps.

At the seed, the $24$-phase detailed ledger contains $864$ directed-pair/phase rows: $600$ have one root and $264$ have three roots. At the best point on the initial $12$-phase scan, $\beta_f=6.53$, its $24$-phase detailed ledger contains $240$ one-root rows, $432$ three-root rows, and $192$ five-root rows. The machine record lists the exact count for every directed pair and phase; no symmetry reduction was used to construct the sums. The targeted test subsequently verifies that the cyclic relations cover all six receivers.

Plainly: every transmitter, including the receiver's own earlier path, is represented in every detailed reception ledger. Root counts change with phase and speed, so a single binary root count cannot stand in for the weave.

The separately expressed test path recomputes the complete detailed ledgers from direct coordinates, checks the causal equation and both Jacobian factors, rebuilds every acceleration contribution, resums all six receivers, and reprojects the sums. This is implementation parity against explicit identities, not an independently authored six-body Master Equation oracle. The unchanged circular-binary root enumerator is independently authored; no corresponding independent full acceleration oracle exists.

Plainly: the root locations and arithmetic have a separate coordinate check, but the decisive six-body acceleration sum still lacks a genuinely independent implementation. That missing oracle blocks promotion beyond bounded diagnostic grade.

## Measured Residuals

All acceleration values below use the dimensionless equation obtained after multiplying the physical residual by $R^2/(\kappa|q|^2)$. At fixed $\beta_f$, a radial sum $A_r<0$ selects $R=-A_r/\beta_f^2$; transverse components must already vanish, and every endpoint and phase must select the same positive $R$.

| $\beta_f$ | phase samples | maximum transverse norm | radial range | maximum full-vector residual at least-squares $R$ | finding |
| ---: | ---: | ---: | ---: | ---: | --- |
| $3.070356625390253$ | $96$ | $13.8318703354$ | $[-5.0367860430,\ 3.3975721153]$ | $13.9082653052$ | seed rejected on sampled phases |
| $6.218454963409138$ | $48$ | $6.8379967848$ | $[-6.3801371193,\ 3.7995998391]$ | $8.5243745321$ | second binary zero rejected |
| $9.376436028216506$ | $48$ | $13.6464519761$ | $[-3.2128430819,\ -0.3874431822]$ | $13.7193794570$ | inward at sampled phases but transverse failure |
| $6.53$ | $12$ | $1.0201785959$ | $[-1.1166169386,\ 0.2978085136]$ | $1.1807800636$ | smallest sampled maximum transverse norm; not a candidate |
| $6.53$ | $96$ | $16.3389680481$ | $[-2.8527032066,\ 2.0338947816]$ | $16.4373176178$ | refinement exposes larger failure |

Plainly: every row has nonzero sideways acceleration, which no choice of radius can repair. Most rows also contain phases where the Master Equation points outward even though circular motion requires inward acceleration.

At phase zero and the seed, receiver `a1+` has $10$ admitted roots and Master Equation projections $(A_r,A_t,A_n)=(-1.4935331664,\ 0.2558648703,\ -1.3301832101)$. The cyclic peers have the same projected values to $2\times10^{-14}$, while antipodal receivers carry the required sign-adjusted normal relation. Because prescribed circular acceleration has exactly zero tangent and plane-normal components, this one ordinary phase already falsifies balance at the seed for every positive $R$.

The coarse scan covers $0.25\leq\beta_f\leq12$ at step $0.05$, with the seed and the first three binary tangential zeros inserted exactly. A refinement covers $6.45\leq\beta_f\leq6.60$ at step $0.002$. All $315$ sampled parameter rows have pointwise-complete, ordinary roots on their $12$-phase grids; none has zero maximum transverse residual or a phase-independent compatible radius.

Plainly: the bounded search was broadened through three binary zero branches and then refined around its least-bad coarse location. The least-bad coarse location worsened sharply when more phases were inspected, so it is not retained as a bounded candidate.

## Certification Boundary, Falsifiers, and Next Artifact

The $12\to24\to48\to96$ phase refinements reveal larger residuals and smaller sampled Jacobian floors rather than convergence to balance. They also reveal phase-dependent root-count changes, so folds lie between ordinary samples even though every reported sample has complete simple roots. No interval continuation currently encloses those fold neighborhoods, and no argument excludes unsampled $\beta_f$ intervals or $\beta_f>12$. The measured root-equation residual is at most $7.94\times10^{-12}$ in the reported binary-zero controls, but that pointwise figure does not certify the phase continuum.

This diagnostic would be overturned if an independent root oracle found an omitted root, an independently authored canonical acceleration oracle disagreed with a recorded contribution, or an interval-certified regular branch made both transverse components and the common-radius radial spread vanish for every phase. A global negative result on this locus additionally requires an interval partition of the $\beta_f$-phase domain with ordinary-root charts separated from explicitly handled fold sets, plus either a declared finite $\beta_f$ scope or an asymptotic exclusion beyond it.

Plainly: the next mathematical artifact is a two-parameter interval certificate with a genuinely independent acceleration oracle. Perturbation and stability work remain ineligible, and no other three-dimensional $3{:}3$ history or any $N>3$ family is adjudicated here.

## Reproduction and Machine Record

- Focused evaluator: `src/prescribed-path-analysis/OrthogonalPlaneWeaveBalance.mjs`
- Evidence generator: `scripts/prescribed-path-analysis/run-orthogonal-plane-weave-balance.mjs`
- Targeted tests: `tests/orthogonal-plane-weave-balance.test.js`
- Machine receipt: [2026-08-29-orthogonal-plane-weave-complete-cycle.receipt.v1.json](2026-08-29-orthogonal-plane-weave-complete-cycle.receipt.v1.json)
- Raw-record reproduction: `node scripts/prescribed-path-analysis/run-orthogonal-plane-weave-balance.mjs --write .local-data/braid-analysis/retained-evidence/orthogonal-plane-weave/2026-08-29-orthogonal-plane-weave-complete-cycle.v1.json`
- Receipt regeneration: `node scripts/build-machine-artifact-receipts.mjs --target=orthogonal --write`

Claim grades: geometry identities are derived; sampled root ledgers and residuals are measured by the focused evaluator; the bounded no-candidate finding is inferred from the declared grids; the continuous-locus decision remains unresolved.
