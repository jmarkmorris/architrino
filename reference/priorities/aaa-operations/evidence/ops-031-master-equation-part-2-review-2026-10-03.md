# OPS-031 — Master Equation, part 2 — 2026-10-03

## Scope and disposition

This is a report-only continuation of the [part 1 review](ops-031-master-equation-part-1-review-2026-10-02.md), covering [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) lines 1363–2887, from “Master Equation and DDE Formulation” through “Connection to Quantum Measurement Uncertainty.” The entire assigned interval was read in four sequential, untruncated `sed` ranges: 1363–1760, 1761–2150, 2151–2530, and 2531–2887. The next unread line is 2888, “Parameters and Numerical Implementation.” This is partial chapter coverage, not a completed chapter or cycle.

The source is 5,887 lines by `wc -l`, with SHA-256 `4389354e42ff3b72d9f3002057491755c25b7558c50ddd2e4bcecd5759dfb8da` by `shasum -a 256` before and after review. The inspected checkout HEAD is `03a03d2cb567a6c668639180b94266b510d401a9` by `git rev-parse HEAD`. Lines below refer to that source hash. No corpus text, shared control record, instrument, or historical receipt was edited by this reviewer. CRW-005 remains closed; proposed corrections route through its existing assurance owner without reopening the campaign.

The reviewer is the delegated Codex OPS-031 Master Equation part-2 agent, with inherited model settings; no model-upgrade superiority claim or comparative model evaluation is made. Mathematical evidence consists of independently checkable differentiation, substitution, and prescribed-history witnesses below. Agreement between agents is not the evidence. No EOM solution, numerical simulation, physical realization, conservation law, or stability certificate is established by these witnesses.

## ME03-01 — receiver radial velocity does not determine the distance trend along successive causal roots

**Severity and grade:** medium; derived error in the claimed local trend. **Location:** lines 1858–1863. The passage says that inward receiver motion decreases hit separation and outward receiver motion increases it between successive hits; it then limits the statement to infinitesimal evolution. The root itself changes at first order, so infinitesimal scope does not justify omitting that change.

Write $s(T_r)$ for a tracked simple emission root and $r(T_r)=\|\mathbf X_i(T_r)-\mathbf X_j(s(T_r))\|$. The unchanged causal equation and playback identity give

$$
\frac{dr}{dT_r}=c_f\left(1-\frac{ds}{dT_r}\right)
=c_f\left(1-\frac{D_r}{D_t}\right)
=\frac{c_f\,\hat{\mathbf r}\cdot(\mathbf V_i-\mathbf V_j)}{D_t}.
$$

Thus $V_r=\mathbf V_i\cdot\hat{\mathbf r}$ alone does not determine this derivative. For an explicit normalized witness, take $c_f=1$, $\mathbf X_i(T)=(1+T/5,0,0)$ and $\mathbf X_j(s)=(4(s+1)/5,0,0)$ near reception $T=0$ and emission $s=-1$. The separation is one and the delay is one; $\hat{\mathbf r}=\hat{\mathbf e}_x$, $D_t=1/5$, $D_r=4/5$. Solving the nearby causal equation gives $s(T)=4T-1$ and $r(T)=1-3T$. The receiver moves outward with $V_r=1/5>0$ while the causal-hit distance decreases at rate three. Direction and transmitter weight remain constant in this example, so the inverse-square contribution increases despite the claimed outward trend.

These are prescribed local histories satisfying the geometric hypotheses; they are not claimed to solve the complete Master Equation. They refute the proposed kinematic implication, which is stated without an acceleration-balance premise. The nearby power identity remains valid: its receiver velocity is evaluated at the current event, rather than used as the total derivative of the delayed distance.

**Smallest proposed repair:** distinguish a receiver displacement with the emitting point held fixed from evolution along a moving causal root. Keep the fixed-emitting-point partial trend, but give the total derivative above when discussing successive hits. Preserve the kinetic-proxy power formula. **Falsifier:** an additional stated hypothesis fixing the emitting point, or forcing the transmitter-root term to vanish, would justify the restricted trend; the current generic successive-hit wording supplies neither. Direct differentiation of the displayed local histories checks the contradiction.

**Owner and disposition:** existing corpus assurance owner, with Master Equation scientific adjudication. ○ Proposed; no source repair is authorized by this receipt.

## ME03-02 — the causal-root relabeling uses the opposite permutation convention

**Severity and grade:** medium; derived inconsistency in the relative-periodic record. **Location:** closure convention at lines 2225–2247 and root map at lines 2265–2275. The declared convention is $\boldsymbol\xi_a(T+P)=\boldsymbol\xi_{\pi(a)}(T)$. Consequently,

$$
\boldsymbol\xi_{\pi^{-1}(a)}(T+P)=\boldsymbol\xi_a(T).
$$

The source and receiver positions of a root at $(a,j,T,s)$ are therefore recovered, up to the common translation, by $(\pi^{-1}(a),\pi^{-1}(j),T+P,s+P)$. The printed forward map applies $\pi$ twice when substituted into the position convention. Transpositions conceal the mismatch because their inverse is identical; a general allowed permutation need not be an involution.

An explicit prescribed-history witness uses three identical labels $a=0,1,2$, $\pi(a)=a+1\pmod3$, $P=1$, zero group translation, and

$$
\mathbf X_a(T)=A f(T+a)\hat{\mathbf e}_x,\qquad
f(t)=\cos(2\pi t/3)+\frac{\sin(2\pi t/3)}{\sqrt3},\qquad
A=\frac{1}{4(1-1/\sqrt3)}.
$$

The three-periodicity of $f$ gives the declared position and velocity permutation identities. With $c_f=1$, receiver $a=0$ at $T=0$ and transmitter $j=1$ at $s=-1/4$, the separation is $A(1-1/\sqrt3)=1/4$, exactly the delay. Its transmitter factor is $1+2\pi A/3>0$, so this is a simple positive-distance geometric root. The printed forward map produces receiver 1 at time 1 and transmitter 2 at time $3/4$. Their separation is $A(1+1/\sqrt3)>1/4$, so this is not a causal root at the retained delay. The inverse map produces receiver 2 at time 1 and transmitter 0 at time $3/4$, preserving the original separation. No self-consistent orbit or global collision-free history is claimed or needed for this algebraic convention check.

**Smallest proposed repair:** retain the earlier position, velocity, and pair-distance conventions and use $\pi^{-1}$ in the forward-time causal-root map; alternatively reverse the relabeling convention consistently everywhere. Do not restrict the allowed permutations merely to hide the error. **Falsifier:** an explicitly imposed involution-only domain, or a consistent alternative definition of $\pi$ throughout the section, would remove the mismatch. Direct substitution of the three-cycle witness checks it without a solver.

**Owner and disposition:** existing corpus assurance owner with the delayed-history/relative-periodic mathematical owner. ○ Proposed. No runtime permutation implementation was inspected, so this is not a claimed software defect.

## ME03-03 — transmitter-root tangency is described as receiver tangency

**Severity and grade:** medium; derived mismatch of the two differentiation variables. **Location:** lines 2792–2810, especially line 2810. The defined $J_{ii}=D_t/c_f$ uses the velocity at emission, but its zero is described as the receiver trajectory becoming tangent to the one wake emitted in its past. Tangency to that fixed emitting sphere is determined by the current receiver velocity and $D_r$.

For the self-history gap $F(T,s)=\|\mathbf X(T)-\mathbf X(s)\|-c_f(T-s)$,

$$
\partial_sF=D_t,\qquad \partial_TF=-D_r.
$$

The first derivative varies the emission event while reception is fixed; the second follows the receiver relative to the fixed emitted wake. They are different geometric operations. A normalized explicit witness is $\mathbf X(T)=(T+T^2-T^3,0,0)$ near $[0,1]$. At $s=0$, $T=1$, separation and delay equal one. The emission velocity is one and reception velocity is zero, so $D_t=0$ and $D_r=1$. With reception fixed, $F(1,s)=-s^2+s^3$ near zero, hence $F_{ss}=-2\ne0$; $F_T=-1\ne0$. This is the ordinary local fold geometry in the emission variable, while the receiver crosses the fixed sphere transversely rather than tangentially.

The later uniform-circular exception at line 2820 already notes that $D_t=D_r$ on that special chart. That equality can support coincident tangency statements there, but it does not apply to the preceding general definition or its explicitly discussed off-circular case. The polynomial witness is a geometric counterexample, not an accepted evolved self-hit trajectory or continuation prescription.

**Smallest proposed repair:** explain $J=0$ as loss of emission-root transversality; reserve receiver grazing of a fixed emitted wake for $D_r=0$, and state the special circular equality only on its declared chart. Preserve the amplitude-pole and unresolved event-treatment distinctions. **Falsifier:** an explicit domain restriction establishing $D_t=D_r$ for every history covered by the sentence would remove this error; the present general and off-circular scope does not supply one.

**Owner and disposition:** existing corpus assurance owner with Master Equation singular-event adjudication. ○ Proposed. The neighboring “hard wall” heading and candidate-radius language require continued care, but this review does not infer a new hard exclusion law or expand the repair to a physical continuation proposal.

## Existing repair family: stationary playback is not necessarily reversal

Line 2380 still says that $D_r=0$ “changes the sign” of branch playback. The earlier [ME-2 accepted integration](../../aaa-corpus-rewrite/work-queue.md#crw-005-master-equation-me-1-through-me-16--accepted-integration-2026-09-10) expressly distinguishes stationary playback from reversal. This is a surviving direct-consumer inconsistency, not a fourth new mathematical finding or evidence of an introduced regression.

For $c_f=1$, a stationary transmitter at zero and receiver $\mathbf X(T)=(1+T-T^3,0,0)$ near zero give the simple emission root $s(T)=T-X(T)=-1+T^3$. Here $D_t=1$, $D_r=3T^2$, and $s'(T)=3T^2$. Playback is stationary at zero but does not change sign. The acceleration weight stays one, preserving the paragraph's main distinction. The smallest follow-up is to say that reversal occurs only when the playback derivative changes sign. A sign-changing hypothesis would overturn this localized criticism; vanishing alone does not. Route as proposed propagation under ME-2, without reopening its historical disposition.

## Valid no-change dispositions and remaining obligations

| Inspected passage | Independent check and disposition |
| --- | --- |
| 1363–1550, canonical law and exclusions | The positive transmitter weight multiplies the polarity sign and radial unit vector; receiver velocity enters playback, not this multiplier. Strict positive delay and $r=c_f\Delta$ exclude ordinary zero-separation hits. No side-study response factor or post-event law is imported. Preserve. |
| 1551–1745, local scalar and finite superposition | Directly differentiating $r-c_f(T-s)=0$ gives $\nabla s=-\mathbf n/D_t$ and $\nabla r=c_f\mathbf n/D_t$. Therefore $-\nabla(C\operatorname{sgn}D_t/r)=Cc_f\mathbf n/(r^2|D_t|)$ on a fixed-sign regular chart. Finite gradient linearity proves the sum; it supplies neither global periods nor conserved energy. Preserve those limits. The stated finite-difference numerical residual was not rerun. |
| 1761–1833, polarity, density, and receiver decomposition | Static opposite ordering reverses the line of action. The absolute-time emission measure and simple-root Jacobian yield the stated weight; this is conditional on that declared emission premise. The instantaneous hit projection is a frozen-direction acceleration contribution, not the full derivative of a rotating decomposition. Do not falsely reject it for omitted basis rotation. |
| 1917–2208, translating point cloud | Solving the quadratic delay and adding the two ordered vectors gives $2\kappa\beta_f w[\hat{\mathbf e}-2(\hat{\mathbf n}\cdot\hat{\mathbf e})\hat{\mathbf n}]$. In the sum, $\mathsf K=W\mathsf I-2\mathsf M$ follows immediately. For isotropic tetrahedral directions $\mathsf M=(W/3)\mathsf I$, the residual is not zero. This checks the algebraic scope; it is not an orbiting-assembly rejection or a run of the named analyzer. |
| 2293–2351, alternative kernel family | Its properties are explicitly conditional on a guessed changed kernel, not the canonical law. Common translation makes the extrapolated separation equal the simultaneous separation, so reversal cancels an even scalar weight. This does not derive the guessed kernel. Preserve its comparison status; do not import it into another scenario. |
| 2386–2558, history state and well-posedness | The instantaneous six-vector is explicitly not the complete history state. The compatible-domain condition $\phi'(0)=\mathcal G(\phi)$ is necessary by equality of one-sided derivatives; stationary opposite histories provide a counterexample to arbitrary-history compatibility. Noncompact Gaussian support is explicitly distinguished from a finite root sum. No applied existence theorem is certified. |
| 2560–2620, finite continuation family | The text distinguishes represented final histories from uniqueness of intervening trajectories and correctly says multiple futures from the same complete data would contradict an applicable uniqueness theorem. A finite count alone is not deterministic multistability or global continuation. Preserve. |
| 2644–2775, self-hit and radial fall | The chord bound requires an interval-wide speed condition; the straight quadratic path gives the stated simple self-root by differentiation. Symmetric delayed fall uses $x(T_r)+x(T_t)$, not $2x(T_r)$, and declares the slow-history substitutions separately. These accepted repairs retain their useful distinctions. |
| 2843–2887, stationary surrogate and quantum comparison | Solving $\|\mathbf A\|=\kappa|q_iq_j|/r_s^2$ fixes $r_s$, and the causal equation then fixes the surrogate emission time. The match is one instantaneous contribution, not a replacement history. The quantum bridge remains explicitly a target. Preserve. |

The unrestricted summary of scalar wake superposition and the listed screening/horizon prescriptions at lines 2624–2642 should remain in the already identified auxiliary-method/global-extension scope family; the earlier exact local scalar theorem and infinite-sum conditions are the relevant boundaries. This receipt neither bans mathematical screening/subtraction nor accepts a changed kernel or finite memory as an exact replacement for the full law. No additional scientific defect count is assigned to this existing family.

## Evidence, attribution, and continuation

The historical ME-1 through ME-16 report and accepted integration were inspected for duplicate disposition, together with the October 2 proposal status and part-1 receipt. The three new issues are not claims that the October 2 repairs introduced errors. No last-editor or causal attribution is made without the relevant before/after transition. The already corrected ME-1, ME-6, and ME-7 statements survive the scoped elementary checks above; this is correctness/meaning preservation at those claims, not re-certification of the chapter.

No new external theorem is required for the three counterexamples. The cited Walther paper, numerical instruments, and global action or continuation application were not reverified or rerun here. Their existing unclosed assumptions stay visible. This review makes no exhaustive link, KaTeX-rendering, all-formula correctness, or downstream-runtime claim. The receipt was checked for whitespace with `git diff --no-index --check /dev/null` and the target source hash was measured again after capture. Review time and operator burden were not measured; line count is coverage scope only.

Remaining cursor: line 2888, “Parameters and Numerical Implementation,” through the end of the 5,887-line chapter. Next scheduled Master Equation continuation belongs to the coordinator's October 4 reservation; the coordinator owns whole-cycle due dates and any additional retrospective sample records. All substantive corrections above are proposed, not implemented.
