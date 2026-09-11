# EPR, Bell Correlations, and Physical Record Formation

## 1. From Definite Outcomes to a Joint Law

### 1.1. The explanatory problem

In $\mathbb{A}\mathbb{A}\mathbb{A}$, a detector is a physical assembly whose delayed history produces a persistent record. Observation is not a new primitive interaction. The substrate has definite configurations in Euclidean space and absolute time, and its master equation determines acceleration from causal path history. Quantum states, analyzer operators and measured correlation laws belong to an effective description that the substrate must recover.

A definite outcome is only one part of the Bell problem. A source prepares two systems; two stations select settings and register outcomes. The theory must explain the full joint distribution across all tested setting pairs, not merely why each station records one result. Source conservation, opposite preparation labels and a common environment can constrain that distribution, but they do not determine how each later setting changes the detector response.

The [retained assumption synthesis](brainstorming.md) distinguishes a settled conditional negative result from unresolved positive mechanisms. A passive shared past cannot violate CHSH when Bell factorization, measurement independence and valid trial sampling hold. No positive Architrino route has been derived or selected. Accepted assembly source histories and analyzer-response calculations remain necessary before route adjudication can become a physical result.

### 1.2. EPR completeness and Bell obstruction

The [EPR lecture analysis](tim-maudlin-epr-bell-video-source-mining.md) separates two questions. EPR uses certainty without disturbing a remote system as a sufficient criterion for a physical property, then asks whether the wavefunction is complete. Bell constrains a declared class of setting-indexed response laws. EPR supplies a conditional completeness argument; Bell supplies a quantitative obstruction.

The distinction is already visible in a single-particle screen example. A definite path and local detector response can assign one screen result before the click, making an apparent collapse an update of knowledge. This does not provide a two-wing response table for independently selected settings. Likewise, discomfort with a many-particle configuration-space wavefunction is not evidence that a proposed physical-space replacement recovers the observed statistics.

The [Bell-foundations analysis](tim-maudlin-bell-foundations-2022-video-source-mining.md) retains an EPR-sympathetic discovery history: Bell challenged overstrong earlier exclusions of hidden variables and isolated distant-system independence as the interesting constraint. The paper published in 1966 was written before the 1964 theorem paper. The exploratory route and the published theorem’s deliberate obstruction should not be confused. Neither the historical argument nor Maudlin’s preferred interpretation selects an Architrino mechanism.

### 1.3. What conservation does and does not specify

A source account may impose

$$
C_A(\lambda)+C_B(\lambda)=C_{\mathrm{source}}(\lambda).
$$

This constrains the daughter systems together. It does not specify which variables are available at each detector, how an analyzer setting acts on them, whether any live influence passes between wings, or how the resulting outcomes are sampled.

The required separation is therefore physical: source preparation, locally available state, setting-dependent apparatus response, possible live coordination, and final record selection. A common Noether sea can enter those stages in different roles. Calling all of them a shared background conceals the very dependence that a Bell analysis must identify.

## 2. The CHSH Constraint

### 2.1. Trials, outcomes and correlations

A binary trial records

$$
(x_i,y_i,a_i,b_i),
\qquad x_i,y_i\in\{0,1\},
\qquad a_i,b_i\in\{-1,+1\}.
$$

For a setting pair with a nonzero included count, the empirical correlation is

$$
\widehat E_{xy}
=\frac{N_{++}+N_{--}-N_{+-}-N_{-+}}
{N_{++}+N_{--}+N_{+-}+N_{-+}}.
$$

It estimates the expectation $E_{xy}=\mathbb E[ab\mid x,y]$ under the declared trial model. Matching outcomes contribute positively and unlike outcomes negatively. The theoretical CHSH combination is

$$
S=E_{00}+E_{01}+E_{10}-E_{11}.
$$

The bound below concerns the model’s expectations. A finite sample can fluctuate beyond it under a local null, so an experimental verdict also needs a justified statistical test, including any memory, stopping and trial-selection assumptions. Computing four ratios does not by itself supply that verdict.

### 2.2. Factorization and a common preparation measure

Let $\lambda$ be the complete state declared relevant to the response model. Bell factorization is

$$
P(a,b\mid x,y,\lambda)
=P(a\mid x,\lambda)P(b\mid y,\lambda).
$$

Measurement independence requires the same normalized preparation measure for all tested setting pairs:

$$
\rho(d\lambda\mid x,y)=\rho(d\lambda).
$$

These are distinct assumptions. The first restricts the conditional response; the second permits one common ensemble to be used in all four correlations. A failure of measurement independence changes that ensemble without necessarily changing factorization at fixed state.

Completeness has to be defined relative to a physical causal model. Adding relevant apparatus variables can improve the state declaration, but adding variables that determine the settings need not preserve measurement independence. A “complete past” is not permission to assume both independence and its negation under an unexplained expansion of the conditioning set.

### 2.3. The bound, including stochastic response

For deterministic local outcomes $A_x,B_y\in\{-1,+1\}$,

$$
s(\lambda)
=A_0B_0+A_0B_1+A_1B_0-A_1B_1
=A_0(B_0+B_1)+A_1(B_0-B_1).
$$

One bracket vanishes and the other has magnitude two. Averaging with the same probability measure therefore gives

$$
S=\int s(\lambda)\,\rho(d\lambda),
\qquad |S|\le2.
$$

Determinism is not required. Under stochastic factorization, put

$$
\alpha_x(\lambda)=\sum_a aP(a\mid x,\lambda),
\qquad
\beta_y(\lambda)=\sum_b bP(b\mid y,\lambda),
\qquad |\alpha_x|,|\beta_y|\le1.
$$

The conditional CHSH expression obeys

$$
\left|\alpha_0(\beta_0+\beta_1)
+\alpha_1(\beta_0-\beta_1)\right|
\le|\beta_0+\beta_1|+|\beta_0-\beta_1|
=2\max(|\beta_0|,|\beta_1|)
\le2.
$$

The same-measure average proves the same bound. Equivalently, suitable local random seeds can dilate these response kernels to deterministic ones without changing the stipulated setting independence. Local dice, more detailed histories, braid structure or more complex detectors do not evade the result while its assumptions remain intact.

### 2.4. The passive-record negative control

“Decided at entanglement” becomes a definite two-wing claim only after specifying whether $a=A(x,\lambda)$ and $b=B(y,\lambda)$ and whether the later settings select the same state distribution. If those conditions and valid sampling hold, the passive source record is inside the class just bounded.

The negative result neither denies definite substrate states nor rules out every hidden-variable theory. It excludes this Bell-local, measurement-independent class as an explanation of a statistically established violation. A proposal that changes response dependence, preparation dependence or trial validity must name the changed condition and its physical mechanism. “Realism,” free will and determinism are not substitutes for those equations.

## 3. The Observer-Level Recovery Target

### 3.1. Spin and polarization conventions

For the effective spin-singlet comparison, let $\theta_{xy}$ be the angle between unit spin-measurement axes $\hat{\mathbf x}$ and $\hat{\mathbf y}$. With binary outcomes $a,b$, the target joint law is

$$
P_{\mathrm{singlet}}(a,b\mid x,y)
=\frac14\left(1-ab\,\hat{\mathbf x}\cdot\hat{\mathbf y}\right).
$$

Summing this table gives

$$
P(a\mid x)=P(b\mid y)=\frac12,
\qquad
E(\theta_{xy})=\sum_{a,b}abP_{\mathrm{singlet}}(a,b\mid x,y)
=-\cos\theta_{xy}.
$$

This is an observer-level quantum target, not a substrate probability postulate. It specifies the entire angular table, including matched-axis anticorrelation, off-axis behavior and unbiased marginals.

Linear polarization uses a different analyzer-angle convention. The particular state and outcome labeling discussed in the [Bell-theorem source analysis](stanford-encyclopedia-bell-theorem-source-mining.md) has $E(\theta)=\cos(2\theta)$. Another entangled state or a reversed binary label can change the sign or axis relation. The carrier, state, analyzer and labeling must be stated before assigning a correlation law; the spin angle is not one universal substrate angle.

### 3.2. Why aligned anticorrelation is insufficient

Rotational symmetry and perfect aligned anticorrelation do not alone select the cosine. An explicit local comparison illustrates the missing constraint. Draw a unit vector $\mathbf n$ uniformly on the sphere and let

$$
A(\hat{\mathbf x},\mathbf n)=\operatorname{sgn}(\hat{\mathbf x}\cdot\mathbf n),
\qquad
B(\hat{\mathbf y},\mathbf n)=-\operatorname{sgn}(\hat{\mathbf y}\cdot\mathbf n).
$$

Zero dot products have measure zero. For axes separated by $0\le\theta\le\pi$, the two unsigned hemisphere tests disagree on a fraction $\theta/\pi$ of the sphere. Since Bob reverses the sign, the correlation is

$$
E_{\mathrm{local}}(\theta)=-1+\frac{2\theta}{\pi}.
$$

This model is rotationally invariant, has unbiased marginals and gives perfect anticorrelation at equal axes. Its off-axis curve differs from the singlet target and it obeys CHSH. The construction is a mathematical negative-control example, not a native assembly model. It qualifies the source log’s shorthand that symmetry and aligned anticorrelation “give” the cosine: the effective quantum structure or an actual recovery derivation is additional input to that conclusion.

For coplanar spin axes at Alice’s $0$ and $\pi/2$ and Bob’s $\pi/4$ and $-\pi/4$, the singlet table yields three correlations $-1/\sqrt2$ and the fourth $+1/\sqrt2$, hence $S=-2\sqrt2$. This is one algebraic check of the target convention. It does not derive the full quantum Tsirelson bound or prove that a candidate physical model cannot exceed it elsewhere.

### 3.3. One physical family behind every diagnostic

A proposed recovery begins with accepted pair histories and local analyzer kernels. Schematically, for a declared preparation/window measure $\mu_W$, unresolved apparatus state included in $\zeta$, and outcome maps $A_x,B_y$, a candidate pushforward is

$$
P_\mu(a,b\mid x,y)
=\int
\mathbf1_{\{A_x(\zeta)=a,\ B_y(\zeta)=b\}}\,
\mu_W(d\zeta\mid x,y).
$$

This formula defines what an outcome map and measure would produce; it supplies neither. Live coordination would require the corresponding jointly setting-dependent maps or histories, and trial inclusion would require its own conditioning. One must not insert the desired quantum table into the measure or maps and then call the resulting replay a derivation.

The same record family must determine the angular curve, local marginals, CHSH, trial selection, persistent outcome closure, conditional factorization, setting dependence, operational no-signaling and preferred-time ordering. Its quantum comparison also includes the Tsirelson ceiling and the separately specified GHZ/Hardy cases. A threshold fixture or separate fitted tables cannot replace this shared construction.

The division of work follows the physics: Quantum Closure supplies source measures, detector kernels and record calculations; the present analysis identifies the assumptions those records preserve or violate. There is no accepted positive spin-singlet assembly export here.

## 4. Conditional Dependence and Causal Routes

### 4.1. Decomposing factorization

Parameter independence requires

$$
P(a\mid x,y,\lambda)=P(a\mid x,\lambda),
\qquad
P(b\mid x,y,\lambda)=P(b\mid y,\lambda).
$$

Outcome independence requires

$$
P(a,b\mid x,y,\lambda)
=P(a\mid x,y,\lambda)P(b\mid x,y,\lambda).
$$

Together these give Bell factorization on the declared support. Their interpretation as causal locality and common-cause screening is a further physical interpretation of the probability law, not another algebraic theorem.

For a genuinely complete deterministic state, each conditional outcome is fixed, so outcome independence holds. A deterministic candidate retaining measurement independence and valid trials can violate the Bell bound only by changing conditional factorization, hence parameter independence in that complete-state description. Merely relabeling a residual correlation as an unscreened common cause does not avoid the completeness issue.

### 4.2. No-signaling and access

Operational no-signaling concerns the averaged observable law:

$$
\sum_bP(a,b\mid x,y)=P(a\mid x),
\qquad
\sum_aP(a,b\mid x,y)=P(b\mid y).
$$

Remote-setting dependence at fixed hidden state can average out of both local marginals. Bell-factorization failure, an observer-visible marginal dependence and a usable communication channel are therefore distinct verdicts. Inferring communication additionally requires specifying access to or control over the variables carrying the dependence, together with the relevant preparation and readout protocol.

An information-theoretic notation can diagnose these distinctions:

$$
\begin{aligned}
I(A:B\mid X,Y,\Lambda)&=0 &&\text{(outcome independence)},\\
I(A:Y\mid X,\Lambda)=I(B:X\mid Y,\Lambda)&=0
&&\text{(parameter independence)},\\
I(\Lambda:X,Y)&=0 &&\text{(measurement independence)},\\
I(A:Y\mid X)=I(B:X\mid Y)&=0
&&\text{(operational no-signaling)}.
\end{aligned}
$$

These equalities refer to a specified joint probability law and its supported conditioning events. For finite tested settings with positive probabilities, zero conditional mutual information expresses the corresponding conditional independence almost surely. It says nothing about untested or zero-probability settings without an extension of the model. Information is a diagnostic of physical records, not a new substrate substance.

### 4.3. Distinct unresolved mechanisms

| Route | Mathematical change | Physical boundary |
| --- | --- | --- |
| Passive shared history | No change to the Bell premises | A negative control under local response, setting independence and valid trials. |
| Live finite-speed coordination | Conditional remote-setting dependence and factorization failure | Forward-causal in a preferred frame, but requires a derived channel, reach law and multipartite account. |
| Measurement dependence | Different preparation measures for different setting pairs | Requires a physical common-past joint law and a quantitative discriminator. |
| Retrocausal dependence | Change to forward-only causal support | A comparison route requiring an explicit ontology/dynamics change. |
| Deterministic global nonseparability | Parameter independence and finite-speed screening change | Requires a new or changed primitive law. |
| Irreducible stochastic joint law | Outcome independence or complete-state screening change | Requires primitive stochasticity or an explicitly incomplete state in the present deterministic ontology. |
| Apparatus or trial effect | Inclusion, timing, pairing, sampling or statistical map changes | Requires a specific mechanism surviving the applicable experiment controls. |

These options are not interchangeable descriptions of a shared sea. In particular, irreducible stochastic joint probabilities are not automatically a message traveling between wings, and a deterministic global law is not automatically a finite-speed channel. None is selected by this classification.

## 5. Detectors and Valid Trial Tables

### 5.1. Selection changes the analyzed ensemble

Let $D_A,D_B\in\{0,1\}$ denote inclusion. The selected distribution is

$$
P_{\mathrm{obs}}(a,b\mid x,y)
=P(a,b\mid x,y,D_A=1,D_B=1),
$$

when the conditioning event has positive probability. If inclusion depends on the setting, would-be outcome, hidden state or local apparatus state, the retained ensemble can differ across setting pairs. A local full ensemble can then produce an apparently violating selected table.

A physical proposal must specify inclusion laws such as $D_A(x,a,\lambda,\eta_A)$ and $D_B(y,b,\lambda,\eta_B)$ or their stochastic counterparts, with local apparatus states $\eta_A,\eta_B$. It must predict an efficiency, threshold, window, orientation, material-state or setting-rate dependence that can be tested independently. Detector complexity alone does not change CHSH; a strictly local response remains inside its factorized model.

### 5.2. From heralding to persistent outcome closure

A defensible trial map declares source heralding, setting generation, time tags, coincidence or event-ready rules, missed detections, no-click treatment, channel-dependent delays, memory, postselection and stopping rules. It also identifies the spacelike intervals relevant to the chosen null model. High efficiency and event-ready preparation constrain particular selection explanations; neither phrase substitutes for the complete analysis.

The physical outcome event matters especially for a finite-speed proposal. The model must identify when a unique binary record becomes persistent under its declared assembly criterion. Detector interaction, amplification, timestamp registration and record closure need not be identical events. Choosing a convenient early or late proxy changes the available coordination time and is not an independent detector derivation.

The breadth of Bell platforms—spin, polarization, interferometric phase, internal state, spatial mode and motion—makes accepted source states and analyzer responses prior to a universal apparatus explanation. One local detector model cannot be transferred to every platform without its observable and record map.

### 5.3. A concrete historical apparatus lesson

The encyclopedia packet retains the Holt–Pipkin polarization anomaly and Clauser’s 1976 repetition as a source-bound mechanism example. It reports restored agreement with the quantum comparison and a proposed stress-induced optical activity in the Pyrex source bulb as a possible explanation of the earlier discrepancy.

The lesson is the specificity of the proposed material state, optical pathway and polarization bias. It is not a new verification of that historical explanation, nor evidence that modern violations share the same artifact. Clocks, cables, setting generators, detector thresholds and shared-sea correlations require equally explicit variables and predicted signatures.

## 6. Finite Influence, Reach and Multipartite Constraints

### 6.1. A directional reach condition

In a declared preferred frame, a simple Alice-to-Bob channel can act only if

$$
T_B^{\mathrm{out}}-T_A^{\mathrm{set}}
\ge \tau_A^{\mathrm{emit}}+\frac{L_{AB}}{v_{\mathrm{inf}}}
+\tau_B^{\mathrm{resp}},
$$

with nonnegative emission/processing and receiving-response latencies, the effective propagation path length and a stated outcome-closure event. Motion, geometry and uncertainty can require a more detailed travel-time model. Bob-to-Alice reach is a separate condition; a general trial can have neither, one or both directional opportunities.

The source’s expression with $L_{AB}/c_f$ is the zero-additional-latency special case after identifying the influence with primitive wakes. That identification is a model bridge, not an experimental fact. Published preferred-frame influence-speed lower bounds constrain their declared hypothetical influence, timing convention and model assumptions. They do not directly measure a universal $c_f$. Any new numerical substrate instance uses $c_f=1$; no numerical influence-speed estimate is made here.

### 6.2. Reachable and unreachable laws

For a chosen binary reach partition, let $r_{xy}$ be its conditional reachable fraction for setting pair $(x,y)$. With reachable and fallback laws $P_1$ and $P_0$,

$$
P(a,b\mid x,y)
=r_{xy}P_1(a,b\mid x,y)
+(1-r_{xy})P_0(a,b\mid x,y).
$$

Writing $c_{00}=c_{01}=c_{10}=1$ and $c_{11}=-1$ gives

$$
S=\sum_{x,y}c_{xy}
\left[r_{xy}E^{(1)}_{xy}+(1-r_{xy})E^{(0)}_{xy}\right].
$$

Only when a common fraction $r$ applies does this reduce to

$$
S=rS_1+(1-r)S_0.
$$

The fallback law must be supplied. Failed reach does not imply $S_0=2$: even a valid Bell-local fallback only satisfies a bound, and need not saturate it. A reach-conditioned subensemble is not automatically measurement independent or validly sampled, so that bound itself needs its premises checked on the conditioned law.

Setting-dependent mixture weights can also disturb no-signaling even when both component laws are individually no-signaling but have different local marginals. The full mixture, its direction classes and its timing uncertainty must therefore be evaluated from the same trial family. A proposed degradation law must predict how these quantities change with baseline, setting rate, orientation and latencies.

Frequency-dependent photon propagation or a frequency crossover requires its own constitutive equation and evidence. A speed hierarchy alone supplies neither dispersion nor a Bell-correlation crossover.

### 6.3. The Bancal boundary

The retained source synthesis describes a four-party obstruction for a specified class of finite-speed hidden-influence models. In the relevant preferred-frame arrangement, two later parties lie outside each other’s influence cones. After the earlier data are fixed, the model imposes conditional local screening between those later parties.

The obstruction combines that screening with measurement independence, specified quantum marginals and exact operational no-signaling. The resulting inequality is violated by the comparison distribution. This manuscript retains the premise-level source account; it does not reproduce or independently verify the primary theorem’s full inequality or multipartite construction.

The implication is narrower than a ban on every conceivable medium and stronger than an invitation to invoke unspecified shielding. A proposed escape must identify the precise screening, independence, marginal or no-signaling premise changed, then derive the replacement multipartite joint law and observable consequence. Preserving only a two-wing table cannot settle that question.

## 7. Measurement Dependence and Physical Typicality

### 7.1. A common past must produce a particular dependence

A forward-causal measurement-dependent candidate requires a physical joint law

$$
P(d\lambda,x,y),
\qquad
P(d\lambda\mid x,y)\ne P(d\lambda)
$$

for at least one relevant setting pair. Universal common ancestry or a shared medium is insufficient. The dependence must have the magnitude and structure needed to recover the angular joint table and one-wing marginals, with an independently testable response to setting source, rate, baseline, orientation or sea state.

Determinism alone does not entail that dependence. A deterministic setting generator can be effectively independent of the variables relevant to pair preparation under a declared preparation model. Conversely, chaos does not by itself prove exact statistical independence. The source’s “forgetting” analogy is a method intuition whose quantitative validity depends on the actual generator and state measure.

Maudlin’s preference to retain statistical independence is a methodological position, not a theorem excluding every measurement-dependent model. No philosophical choice about free will is needed to state or test the conditional law.

### 7.2. Allowed histories and a finite comparison measure

Claims that the required histories are rare, typical or fine-tuned need a physical support $\Omega_{\mathrm{phys}}$ and a measure tied to accepted dynamics or preparation. For a finite preparation/window class $\Omega_W$ with

$$
0<\mu_{\mathrm{phys}}(\Omega_W)<\infty,
$$

a probability comparison can use the normalized restriction

$$
\mu_W(A)
=\frac{\mu_{\mathrm{phys}}(A\cap\Omega_W)}
{\mu_{\mathrm{phys}}(\Omega_W)}.
$$

This states a normalization requirement, not a constructed native measure or an assumed uniform distribution on an infinite history space. Conditioning and the tested setting support must remain explicit. A prior over physically excluded states cannot establish physical fine-tuning; restricting the support cannot by itself establish a successful correlation mechanism either.

Stellar and quasar setting sources constrain specified common-cause histories by moving setting provenance into different physical regimes. They do not logically eliminate every form of measurement dependence. A candidate must predict a setting-source dependence that survives those controls rather than redefine its allowed histories after each observed result.

## 8. Evidence, Interpretation and Remaining Recovery

### 8.1. Different experimental questions

Experimental comparisons must separate loophole control, statistical strength, cosmic setting provenance, baseline, conditional finite-influence-speed limits and multipartite relevance. A test leading in one category need not lead in another. Source and detector platforms also interrogate different observables.

The retained source packets do not provide a newly verified numerical frontier here. Their encyclopedia audit rejects “no additional hypothesis” as a description of the 2015 experiments and withholds its rounded experimental values. Strong loophole control still rests on the declared hardware-to-trial map and statistical null. Exact numbers and conditional speed bounds require their own primary-source records; none is refreshed or inferred from a video or encyclopedia in this synthesis.

### 8.2. What the explanatory sources contribute

The local analysis of the July 2026 EPR lecture records that it ends before the promised Bell derivation. It contributes the one-particle/two-wing distinction, epistemic versus physical collapse, the EPR completeness criterion, and the warning that conservation alone is not a response law. It supplies no Bell experiment, finite-speed mechanism or Bancal analysis.

The local analysis of the October 2022 interview contributes explicit detector inclusion, the distinction between determinism and setting independence, and a demand for ontology, dynamics and physical record formation. Its preferred nonlocal interpretation, criticism of retrocausality and methodological rejection of unspecified measurement dependence remain attributed views. Bohmian mechanics illustrates that definite deterministic outcomes do not imply locality; its guidance law and universal wavefunction are not imported into Architrino dynamics.

The 2024-revision encyclopedia packet sharpens factorization, outcome closure, access to hidden variables and the physical state-space measure requirement. Its historical and primary-source leads remain supporting references, not independent experiment verification.

### 8.3. Adjacent constraints retain their own assumptions

The measurement triad distinguishes wavefunction completeness, universal linear evolution and a unique definite outcome. An effective, incomplete wavefunction with definite substrate records rejects one member of that triad but still owes the effective linear regime, Born statistics and record-selection dynamics.

The PBR comparison constrains overlap of ontic distributions for distinct pure states under preparation independence and retained quantum predictions. It does not establish the wavefunction as a primitive field or choose a Bell route. Two-slit interference likewise demands an actual physical carrier of interference-relevant structure, not an assertion that a definite path makes the other alternative irrelevant.

Coordinate choices do not determine physical geometry, and entropy is evaluated along time rather than generating it. Lorentzian reconstruction from causal and clock data is a comparison target, not evidence for an absolute preferred foliation. Unpublished discrete-geometry proposals, historical collapse-model parameter claims, cryptographic applications, weak-measurement variants and altered-topology suggestions do not supply the missing Bell mechanism.

The unresolved physical target is one accepted source-and-detector record family that reproduces the full angular table while exposing its assumptions, timing, sampling and multipartite consequences. The passive-record negative control remains the exact benchmark against which any positive route must explain its departure.
