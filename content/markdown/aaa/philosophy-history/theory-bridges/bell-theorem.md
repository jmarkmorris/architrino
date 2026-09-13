# Bell's Theorem: Traditional Derivation and Architrino Assembly Architecture Response

This bridge presents the standard derivation and physical content of Bell's theorem, then states how the Architrino Assembly Architecture ($\mathbb{A}\mathbb{A}\mathbb{A}$) approaches the experimentally observed violations of Bell inequalities. It is not the final mechanism. The final account must be rebuilt from the architrino-level angular-momentum and spin ledger developed in [Angular Momentum and Spin](./angular-momentum-and-spin.md).

The phrase "hidden variable" is inherited from the Bell literature. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the relevant variables are not hidden from nature. They are unresolved by the observer-level quantum abstraction. The task is therefore not to defend a vague hidden-variable category, but to identify the exact architrino, Noether braid, causal-wake, and measurement-apparatus variables whose coarse description becomes quantum spin statistics.

The fastest way to misunderstand Bell is to treat it as a slogan about reality being impossible. Bell is more precise than that. It rules out a class of explanations in which each detector outcome is screened off by a local package of variables that is independent of the distant setting. The experimentally observed correlations tell $\mathbb{A}\mathbb{A}\mathbb{A}$ exactly what kind of recovery target must be met: reproduce the joint records, preserve no-signaling, respect measurement-independence bounds, and explain why the observer-level compression is not Bell-factorizable.

That is why this page is a benchmark page rather than a mechanism page. It keeps the theorem sharp so that the later assembly account cannot slide into loose common-cause language. A shared source event helps only if the retained pair-provenance ledger gates a coupled substrate-response law on the declared $c_f$ coordination channel that produces the quantum joint law without restoring Bell's product factorization.

## Traditional Statement of Bell's Theorem

### The EPR Argument (Precursor)

Einstein, Podolsky, and Rosen (1935) argued from two premises:

- **Realism**: If, without disturbing a system, the outcome of a measurement can be predicted with certainty, there exists an element of physical reality corresponding to that outcome.
- **Locality**: No action performed on one system can instantaneously affect a distant system.

In the later spin-pair version, perfect anticorrelation expresses the EPR tension; the original paper used position and momentum correlations. The argument produces a fork. If Alice's choice among incompatible measurements does not physically disturb Bob's distant system, then Bob's system must already carry enough structure to answer the corresponding measurement. If Alice's choice really changes Bob's distant physical state, the theory has accepted a nonlocal influence. EPR used that fork to argue that quantum mechanics, which does not assign all such values inside the wavefunction, is incomplete.

Schrodinger's later language of steering usefully names the operational tension without turning it into a signal. Alice's measurement context can change which conditional description is assigned to Bob's system, but the no-signaling theorem prevents her from using that dependence to transmit a controllable message. That distinction matters for $\mathbb{A}\mathbb{A}\mathbb{A}$ because the Bell closure target is not superluminal communication. It is a joint-record law whose one-wing marginals remain setting-independent while the two-wing correlations fail Bell factorizability.

Bohr challenged the EPR inference about independently assignable physical properties. Bell (1964) subsequently supplied a quantitative constraint on local completions; its theorem depends on explicit probabilistic assumptions, not on settling the philosophical meaning of reality.

### Bell's Derivation

Consider a source that produces pairs of particles sent to two distant detectors. Detector $A$ measures along axis $\hat{m}_A$ and records outcome $a = \pm 1$; detector $B$ measures along $\hat{m}_B$ and records $b = \pm 1$.

**Assumption 1 (Deterministic special case).** For the elementary derivation, suppose there is a complete pre-setting specification $\lambda$ (drawn from some space $\Lambda$ with distribution $\rho(\lambda)$) such that the outcomes are deterministic functions:

$$
a = A(\hat{m}_A, \lambda), \quad b = B(\hat{m}_B, \lambda)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1006346b3e1950a7)

**Assumption 2 (Bell Locality).** The outcome at each detector depends only on the local measurement setting and the shared hidden variable, not on the distant setting:

$$
A(\hat{m}_A, \lambda) \text{ is independent of } \hat{m}_B, \quad B(\hat{m}_B, \lambda) \text{ is independent of } \hat{m}_A
$$

[View →](../../../../../equation-mapping.html#corpus-equation-640ecc71275003eb)

Together with deterministic outcomes this gives product factorization. The general stochastic Bell-local assumption is the following factorization of conditional probabilities; it does not need an additional deterministic-value or philosophical “realism” postulate:

$$
P(a, b \,|\, \hat{m}_A, \hat{m}_B, \lambda) = P(a \,|\, \hat{m}_A, \lambda)\; P(b \,|\, \hat{m}_B, \lambda)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dee07ba7c14fc214)

**Assumption 3 (Measurement Independence).** The hidden variable $\lambda$ is statistically independent of the freely chosen measurement settings:

$$
\rho(\lambda \,|\, \hat{m}_A, \hat{m}_B) = \rho(\lambda)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-913721470d021a70)

### The CHSH Inequality

From Bell-local factorization and measurement independence for normalized binary-outcome laws, the CHSH bound follows. Deterministic responses are a convenient special case; local stochastic mean responses in the interval from minus one to one obey the same bound. Define the correlation function:

$$
E(\hat{m}_A, \hat{m}_B) = \int_\Lambda A(\hat{m}_A, \lambda)\, B(\hat{m}_B, \lambda)\, \rho(\lambda)\, d\lambda
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cbf23f5828ec3492)

For any four measurement settings $\hat{m}_A, \hat{m}_A', \hat{m}_B, \hat{m}_B'$, the Clauser–Horne–Shimony–Holt (1969) combination:

$$
S = E(\hat{m}_A, \hat{m}_B) - E(\hat{m}_A, \hat{m}_B') + E(\hat{m}_A', \hat{m}_B) + E(\hat{m}_A', \hat{m}_B')
$$

[View →](../../../../../equation-mapping.html#corpus-equation-18fc91eefed223a9)

satisfies:

$$
|S| \leq 2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d5a62cdcec08ec08)

This bound holds for any Bell-factorizable, measurement-independent model with the stated binary outcomes, regardless of the specific form of $A$, $B$, or $\rho$. The measure is normalized; a density notation is optional.

### Quantum Mechanical Prediction

For the spin-singlet state $|\Psi^-\rangle = \frac{1}{\sqrt{2}}(|\!\uparrow\downarrow\rangle - |\!\downarrow\uparrow\rangle)$, quantum mechanics predicts:

$$
E_{\text{QM}}(\hat{m}_A, \hat{m}_B) = -\hat{m}_A \cdot \hat{m}_B = -\cos\theta_{AB}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-160b39564a6c579f)

where $\theta_{AB}$ is the angle between the two measurement axes. With the optimal choice of settings ($\theta = \pi/4$ increments), this yields:

$$
|S_{\text{QM}}| = 2\sqrt{2} \approx 2.828
$$

[View →](../../../../../equation-mapping.html#corpus-equation-02ca713a5d1fe762)

which violates the CHSH bound. The value $2\sqrt{2}$ is the **Tsirelson bound**, the maximum for this CHSH scenario with local dichotomic observables and the standard quantum composition rule; it is not the maximum of every Bell functional.

### Bell-Family Strengthenings: GHZ and Hardy

The CHSH inequality is the main statistical benchmark, but it is not the only Bell-family validation target. Two primary-source strengthenings are useful because they expose failures that can be hidden by fitting one averaged correlation curve.

**GHZ perfect-correlation benchmark.** For a calibrated three-party GHZ state, choose local Pauli-type settings $X$ and $Y$ and define the four product contexts
$$
\mathcal{C}_{\mathrm{GHZ}}=\{XXX,XYY,YXY,YYX\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d37a0ffe81d173e2)

Quantum mechanics assigns product signs $\chi_C\in\{-1,+1\}$ for those contexts such that
$$
\prod_{C\in\mathcal{C}_{\mathrm{GHZ}}}\chi_C=-1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5c587e011fd281ef)

Any context-independent local assignment of predetermined values $x_A,y_A,x_B,y_B,x_C,y_C\in\{-1,+1\}$ gives product $+1$, because every local value appears twice when the four context products are multiplied. This is the all-or-nothing GHZ obstruction: a model cannot pass by reproducing only a Bell average while carrying one fixed local value table across all contexts.

For an $\mathbb{A}\mathbb{A}\mathbb{A}$ record model, the corresponding residual is
$$
\Delta_{\mathrm{GHZ}}
=
\max_{C\in\mathcal{C}_{\mathrm{GHZ}}}
\left[
1-\chi_C E_\theta(C)
\right]_+
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ce48d89e43da7413)

where $E_\theta(C)$ is the product expectation of the three declared apparatus records in context $C$ and $[x]_+\equiv\max(x,0)$. Passing this benchmark means deriving the context-indexed joint record distribution from pair or multiplet provenance and the coupled substrate-response kernels on the declared $c_f$ coordination channel, not assigning context-independent substrate values to all effective $X$ and $Y$ operators.

**Hardy zero/positive event benchmark.** Hardy's two-particle proof uses binary observables $U_i,D_i$ and a nonmaximally entangled state to combine three zero-probability constraints with one positive-probability event. In one common convention the quantum target is
$$
P(U_1=1,U_2=1)=0,
\qquad
P(D_1=1,U_2=0)=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-84c44955b3870301)

$$
P(U_1=0,D_2=1)=0,
\qquad
P(D_1=1,D_2=1)>0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7dc9328b2315179f)

Local realism turns the positive $D_1=D_2=1$ event into a forbidden $U_1=U_2=1$ event. A compact validation margin is
$$
\Delta_{\mathrm{Hardy}}
=
\left[
P_\theta(D_1=1,D_2=1)
-
P_\theta(U_1=1,U_2=1)
-
P_\theta(D_1=1,U_2=0)
-
P_\theta(U_1=0,D_2=1)
\right]_+
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0c1e63f033c00ce8)

The target is not to import Hardy's notation as ontology. The target is to make the declared joint record measure reproduce the zero constraints and the positive event while preserving measurement independence and no-signaling.

### Experimental Status

Experiments beginning with Freedman and Clauser (1972) and Aspect, Dalibard, and Roger (1982) tested Bell inequalities. The 2015 tests by [Hensen and colleagues](https://arxiv.org/abs/1508.05949), [Giustina and colleagues](https://arxiv.org/html/1511.03190v2), and [Shalm and colleagues](https://arxiv.org/html/1511.03189v2) reported statistically significant violations while jointly addressing the principal locality and detection loopholes. Hensen tested CHSH; the photon experiments used CH–Eberhard-type probability inequalities, so their results should not all be reported as measurements of the same CHSH statistic.

- **Locality:** setting choices and outcome intervals are arranged to exclude ordinary light-speed communication in the declared spacetime model.
- **Detection:** event-ready sampling or sufficiently efficient detection permits testing without a fair-sampling assumption for discarded pairs.
- **Setting independence:** random-setting generation and causal timing constrain specified dependencies, but do not empirically exclude every possible hidden common cause.

[Cosmic setting-choice tests](https://arxiv.org/abs/1808.05966) push possible common-cause origins into earlier spacetime regions under a cosmological model and assumptions about photon propagation and setting generation. The quasar test retains fair sampling and explicitly stated photon assumptions. Such geometric exclusions are not a direct bound on the total-variation distance between an arbitrary complete hidden state and the settings. Connecting them to a model's measurement-independence residual requires its explicit source/setting mechanism.

The evidence rejects the tested Bell-local, measurement-independent models at the reported statistical levels and under the declared experimental assumptions. “Loophole-free” does not mean that an experiment proves independence of every conceivable hidden variable.

---

## The Logical Structure of the Theorem

Bell's theorem is a **no-go theorem**: it excludes a class of theories, not a specific model. It also does not show that hidden-variable completions are impossible as a category. Bohmian mechanics was already a counterexample to that reading: empirically adequate in its intended nonrelativistic domain while explicitly nonlocal. Bell's result is sharper and narrower. A completion that retains measurement independence and reduces to local factorizable response functions cannot reproduce the quantum correlations.

That distinction is especially important because Bell's theorem is a physical theorem, not only an abstract mathematical exercise. The mathematical derivation can be sound while its physical force depends on how the premises are mapped onto preparations, detector settings, outcome records, and hidden-variable descriptions. In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, the proof does not license vague escape language. It fixes the required diagnostic: identify which observer-level compression fails product screening, while separately checking no-signaling, measurement independence, ordering leakage, and the correlation law.

For the deterministic special case, retain “Realism” below solely as shorthand for the declared deterministic response representation, not as a separate necessary premise of the stochastic theorem. Its logical skeleton is:

$$
\text{(Realism)} \;\wedge\; \text{(Bell Locality)} \;\wedge\; \text{(Measurement Independence)} \;\Rightarrow\; |S| \leq 2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bbb443ff089f30f7)

The contrapositive is:

$$
|S| > 2 \;\Rightarrow\; \neg\text{(Realism)} \;\vee\; \neg\text{(Bell Locality)} \;\vee\; \neg\text{(Measurement Independence)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-748eb1c8a377b1fc)

A statistically established violation rejects the conjunction of the relevant response, independence, sampling, and outcome assumptions. In particular, dropping a philosophical realism label alone does not evade the stochastic factorization theorem.

The following are broad interpretive comparisons, not an exhaustive classification of every formulation:

| Response | Assumption Denied | Representative Framework |
|:---|:---|:---|
| Orthodox QM (Copenhagen) | Does not supply Bell-local hidden responses; avoids universal unmeasured-value assignments | Standard textbook QM |
| Many-Worlds | Single-outcome and subsystem interpretations differ; branching alone is not a proof of Bell locality | Everettian formulations |
| Pilot-Wave | Bell Locality (explicitly) | de Broglie–Bohm |
| Superdeterminism | Measurement independence is relaxed in the candidate hidden-state law | Setting-correlated deterministic models |
| Retrocausal | Depends on the specified hidden-state conditioning and causal model; may alter measurement independence | Future-boundary or backward-causal models |

The 't Hooft comparison should be read with this distinction intact. A deterministic hidden-state program can deny measurement independence, but determinism itself does not force that denial. $\mathbb{A}\mathbb{A}\mathbb{A}$ uses the comparison historically and logically while choosing a different closure route: preserve measurement independence, preserve no-signaling, and make the product-screening failure explicit.

---

## Architrino Assembly Architecture Placement

### What The Bell Abstraction Can And Cannot Decide

At the Bell-abstraction level, any $\mathbb{A}\mathbb{A}\mathbb{A}$ completion that reproduces the experiments cannot reduce to a local factorizable response model with measurement-independent variables. That is the hard constraint. It does not decide what angular momentum is, what spin is, or how a Noether braid responds to a detector. Those questions belong one level lower, in the architrino and causal-wake dynamics.

The current placement is therefore:

- **Realism is retained**: every architrino possesses a definite position $\mathbf X_i(T)$, velocity $\mathbf V_i(T)$, polarity $q_i$, and path-history ledger along admitted absolute-time histories. The ontology is independent of observation; global existence for every candidate history is a separate theorem target.

- **Measurement independence is retained**: detector settings are not assumed to be pre-correlated with the source microstate. $\mathbb{A}\mathbb{A}\mathbb{A}$ does not invoke superdeterminism.

- **Bell factorizability is a closure target, not a slogan**: if the completed substrate model is compressed into Bell variables, it must fail the factorized local-response form

$$
P(a, b \,|\, \hat{m}_A, \hat{m}_B, \lambda) \neq P(a \,|\, \hat{m}_A, \lambda)\; P(b \,|\, \hat{m}_B, \lambda)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3a2e237ea5aa9fad)

while still preserving no-signaling. The mechanism for that failure must be derived from the angular-momentum ledger and the detector coupling, not inserted by terminology.

A shared past is not enough by itself. If a declared common-past record $C$ screens the two wings into independent one-wing laws while measurement independence and no-signaling hold, the model has re-entered the Bell-local class. A useful residual for this check is

$$
\Delta_{\mathrm{fact}}(C)
=
\sup_{\hat{m}_A,\hat{m}_B}
D_{\mathrm{TV}}\!\left(
P(a,b\mid \hat{m}_A,\hat{m}_B,C),
P(a\mid \hat{m}_A,C)P(b\mid \hat{m}_B,C)
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f6e375346c8f5cab)

Here $C$ must specify its relation to the complete pre-setting record. Correlation conditional on an incomplete coarse $C$ can persist even in a Bell-local model. Nonzero residual for such a coarse record is therefore not an escape; even nonfactorizability of one proposed representation is not sufficient to exclude every alternative Bell-local representation. The comparison must hold over the supported records and declared settings. A successful $\mathbb{A}\mathbb{A}\mathbb{A}$ route must explain why the declared provenance and apparatus-response compression leaves a nonzero factorization residual while keeping the measurement-independence and no-signaling residuals below tolerance. If $\Delta_{\mathrm{fact}}(C)$ vanishes for the completed hidden-variable record, the closure has not escaped the theorem.

Restartability is a separate test of information retained by a chosen reduction. Bell factorization does not require a Markovian reduced state: the complete hidden variable can include arbitrary history. A finite-thickness screening region or pair-provenance ledger therefore needs its own sufficiency justification. For $T_0<T_s<T_{\mathrm{fin}}$, with $T_{\mathrm{fin}}$ the absolute time at which both detector records complete, and a declared Bell coarse-graining $\mathcal{Q}_{AB}$, define

$$
\Delta_{\mathrm{div}}^{AB}(T_0,T_s,T_{\mathrm{fin}};\mathcal{Q}_{AB})
=
\left\|
\mathcal{T}^{\mathcal{Q}_{AB}}_{T_0\to T_{\mathrm{fin}}}
-
\mathcal{T}^{\mathcal{Q}_{AB}}_{T_s\to T_{\mathrm{fin}}}
\mathcal{T}^{\mathcal{Q}_{AB}}_{T_0\to T_s}
\right\|_{\mathrm{TV}\to\mathrm{TV}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f68952cfe4b1f884)

The three transfer operators must use the same normalized preparation-conditioned history laws, retained measure space, and restart protocol. A large divisibility residual diagnoses lost information in that reduction and can occur in a fully Bell-local history model. A vanishing factorization residual for a complete measurement-independent record implies the Bell bound whether or not a chosen reduced description restarts. The selected replacement burden is therefore a genuinely nonfactorizable coupled response on the declared $c_f$ channel, not merely non-restartability.

### Bell Closure Diagnostics

The Bell gate should be checked by separate residuals, because different failures mean different physics. A model may fail by correlating the preparation variable with the settings, by allowing a signaling marginal, or by producing the wrong correlation curve. These are not interchangeable.

Measurement-independence leakage is the first guardrail:

$$
\Delta_{\mathrm{MI}}
=
\sup_{\hat{m}_A,\hat{m}_B}
D_{\mathrm{TV}}\!\left(
\rho(\lambda\mid \hat{m}_A,\hat{m}_B),
\rho(\lambda)
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f1660e6e1df3c94d)

where $D_{\mathrm{TV}}$ is total-variation distance on a common hidden-variable space. Here $\lambda$ is the admissible pre-setting history/preparation specification; it must not include later settings or their downstream records, which would make the dependence test trivial. Conditional laws need supported setting contexts. The $\mathbb{A}\mathbb{A}\mathbb{A}$ route requires $\Delta_{\mathrm{MI}}$ to vanish, or at minimum to remain below an explicitly reported experimental and simulation tolerance $\epsilon_{\mathrm{MI}}$. An estimated tolerance is not exact independence. If true leakage is permitted, its contribution must be bounded in the inequality being tested: with the displayed total-variation convention a conservative four-setting local bound is $|S|\le2+8\epsilon_{\mathrm{MI}}$, since each bounded correlator changes by at most twice that distance. Leakage required by the fit changes the stated exact-independence route.

No-signaling leakage is the second guardrail:

$$
\Delta_{\mathrm{NS}}^{A}
=
\sup_{\hat{m}_A,\hat{m}_B,\hat{m}'_B}
\sum_a
\left|
P(a\mid \hat{m}_A,\hat{m}_B)
-
P(a\mid \hat{m}_A,\hat{m}'_B)
\right|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-72733d1e463afa69)

with the analogous $\Delta_{\mathrm{NS}}^{B}$ obtained by exchanging the detector labels. Both must vanish for exact no-signaling; finite data bound them with statistical and calibration uncertainty. These displayed sums are twice total variation, so their tolerances use that normalization.

For binary records, no-signaling has a useful finite-channel decomposition. Any normalized law for $a,b\in\{-1,+1\}$ can be written in Walsh form as

$$
P(a,b|x,y)
=
\frac14
\left[
1
+
a\,m_A(x,y)
+
b\,m_B(x,y)
+
ab\,C(x,y)
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d4088c4e76e8afe8)

where

$$
m_A=\sum_{a,b}aP(a,b|x,y),
\qquad
m_B=\sum_{a,b}bP(a,b|x,y),
\qquad
C=\sum_{a,b}abP(a,b|x,y)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-26c49f80a5def559)

No-signaling is exactly the condition that the local channels reduce to $m_A(x)$ and $m_B(y)$. The only term then allowed to carry both settings without operational signaling is the correlation channel:

$$
P(a,b|x,y)
=
\frac14
\left[
1
+
a\,m_A(x)
+
b\,m_B(y)
+
ab\,C(x,y)
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-79655565ea3b898f)

with positivity condition

$$
1+a\,m_A(x)+b\,m_B(y)+ab\,C(x,y)\ge0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6cf3d3902873db34)

For the singlet target,

$$
m_A(x)=0,
\qquad
m_B(y)=0,
\qquad
C(x,y)=-\hat{\mathbf m}_A\cdot\hat{\mathbf m}_B
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5dba8c19de879071)

Product-screened response is the special subclass

$$
C_{\mathrm{prod}}(x,y)
=
\int
A_x(\Pi)B_y(\Pi)\,
d\rho_{\mathrm{src}}(\Pi)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e088fc72a966092d)

Thus the non-product burden is sharply located: a successful pair-provenance account must derive a correlation channel $C(x,y)$ that is not reducible to $C_{\mathrm{prod}}(x,y)$, while keeping $m_A$ and $m_B$ local and preserving positivity.

Ordering leakage is a separate preferred-frame guardrail. For observer-level spacelike-separated detector records, the substrate still has an absolute-time order. Let $O_{AB}\in\{A\prec_T B,B\prec_T A\}$ denote that order for the two wings. Within a declared regime with matched preparation and apparatus histories, a Bell packet must test whether reversing the order changes the observable joint law:
$$
\Delta_{\mathrm{ord}}
=
\sup_{a,b,x,y}
\left|
P(a,b|x,y,A\prec_T B)
-
P(a,b|x,y,B\prec_T A)
\right|
\le\epsilon_{\mathrm{ord}}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0fa61fc5aabf1a90)

The order sectors must be compared under controlled reversal or matched conditioning: selecting sectors from different source, timing, or loss populations can change their conditional tables without a causal order effect. This condition is not implied by setting-independent marginals. The marginals can be local while a correlation-timing residual still leaks the absolute simultaneity structure. A successful $\mathbb{A}\mathbb{A}\mathbb{A}$ Bell closure must therefore preserve both marginal invariance and ordering invariance.

Correlation recovery is the third guardrail:

$$
\Delta_{\mathrm{Bell}}
=
\sup_{\theta\in[0,\pi]}
\left|
E_{\mathbb{A}\mathbb{A}\mathbb{A}}(\theta)+\cos\theta
\right|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-78799adf149925fc)

Here angular-only notation assumes a derived rotationally covariant singlet response. Without that result, the comparison is over both calibrated axes, including orientations relative to the apparatus and possible preferred frame. A finite settings grid certifies only sampled settings unless interpolation and error bounds control the continuum supremum. The target is therefore not simply "$|S|>2$." The target is simultaneous recovery of the tested Bell correlations, preservation of no-signaling, and preservation of measurement independence while the observer-level compression still fails Bell's factorized local-response form.

### Preferred-Frame Leakage Handoff

No-signaling is also a Lorentz-export condition. The substrate has absolute time, the Euclidean void, and finite $c_f$, so operational Lorentz invariance is an observer-level recovery rather than a substrate symmetry. A candidate Bell packet may use a nonseparable pair-provenance record only if every substrate channel that could reveal the absolute frame cancels at the observer-level cut, is conserved into inaccessible records, or remains below the preferred-frame leakage bound.

The no-signaling row cannot be checked only after the CHSH fit. It requires invariance of each one-wing marginal under changes of the far setting. The setting-conditioned joint record law generally changes, as the singlet correlation itself shows. A common preparation measure and setting-dependent joint record map may realize this target, but full joint-law invariance under setting changes is neither required nor generally compatible with it.

The ordering row requires equality of the matched observer joint laws; it need not assert invariance of the entire substrate measure. For spacelike-separated observer records, exchanging the substrate order sector $A\prec_TB$ with $B\prec_TA$ inside the same prepared Bell regime may not change the observer-accessible joint table beyond $\epsilon_{\mathrm{ord}}$.

The relevant separation condition is set by causal-wake reach, not only by the photon-channel cone used in the observer description. Let the two record-closure windows be $W_A=[T_A,T_A+\tau_A]$ and $W_B=[T_B,T_B+\tau_B]$, with wing separation $d_{AB}=\|\mathbf X_A-\mathbf X_B\|$. For this simple reach formula, assume stationary apparatus positions, fixed positive separation, absolute-time durations, and relevant new setting information first available at each window start. Earlier setting availability, motion, and extended apparatus regions require their actual emission/arrival geometry. Define the wake-reach margins
$$
\Delta_{\mathrm{reach}}^{A\to B}
=
T_B+\tau_B-T_A-\frac{d_{AB}}{c_f},
\qquad
\Delta_{\mathrm{reach}}^{B\to A}
=
T_A+\tau_A-T_B-\frac{d_{AB}}{c_f}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f4c89cf49d574fd7)

If both margins are negative, neither wing's causal wake can enter the other wing's record-closure window before the relevant record closes. If either margin is nonnegative, the experiment lies in a wake-reach exposure window. This matters whenever $c_f>c_\gamma$: a pair can be spacelike by the dressed photon-channel record while still allowing primitive causal-wake reach during the measurement window. Under the selected route, mutual $c_f$ disconnection together with measurement independence and local response cannot reproduce a Bell violation; disconnection is a rejection condition for that regime, not an alternative escape. When reach exists, the coupled law must still satisfy no-signaling, ordering, and correlation constraints. Positive reach margins establish possible arrival only, not adequate coupling or the quantum law. The [selected route](../../foundations/ontology.md#bell-nonlocality-placement) also owes a response to the [Bancal finite-speed multipartite obstruction](https://arxiv.org/abs/1110.3795); two-wing no-signaling alone does not settle that theorem.

Using the preferred-motion null-test residual $\mathcal{R}_{\mathrm{PF\text{-}bundle}}$ from [PPN Parameters](../../spacetime/ppn-parameters.md#preferred-motion-null-test-bundle), a Bell candidate $\theta$ over a validity window $W$ must therefore satisfy

$$
\Delta_{\mathrm{Bell}}\le\epsilon_{\mathrm{Bell}},
\qquad
\Delta_{\mathrm{NS}}^{A},\Delta_{\mathrm{NS}}^{B}\le\epsilon_{\mathrm{NS}},
\qquad
\Delta_{\mathrm{ord}}\le\epsilon_{\mathrm{ord}},
\qquad
\Delta_{\mathrm{MI}}\le\epsilon_{\mathrm{MI}},
\qquad
\mathcal{R}_{\mathrm{PF\text{-}bundle}}(\theta;W)\le\epsilon_{\mathrm{PF}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f3b7ed10741376df)

Here $\epsilon_{\mathrm{PF}}$ is a separately declared acceptance threshold for the PPN owner's covariance-weighted quadratic residual and regularization convention, with its nuisance model. It is not an additive metric-leakage amplitude or a second normalization by such an amplitude. This is the intersection of the Bell and Lorentz recovery surfaces, not a separate escape route. A global record that reproduces the CHSH value by inserting frame-dependent analyzer calibration, coincidence-window bias, clock drift, or signal-timing leakage has failed the preferred-frame leakage handoff even if its probability table looks quantum.

### Record-Reconstruction Guardrail

Bell experiments end in ordinary records: detector clicks, settings logs, coincidence windows, and later statistical summaries. That observation is important because it keeps the evidence at the observer-accessible level. It is not, by itself, an explanation of the correlations. A completed $\mathbb{A}\mathbb{A}\mathbb{A}$ account must explain why the joint record distribution has the tested quantum form, not merely why final records exist.

For a record map
$$
\pi_{AB}:\mathcal{M}_{AB}\to\mathcal{R}_A\times\mathcal{R}_B
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9b3b03195c45671d)

the required joint distribution is
$$
P(a,b\mid\hat{m}_A,\hat{m}_B)
=
\mu_*^{AB}\!\left(
\pi_{AB}^{-1}(a,b;\hat{m}_A,\hat{m}_B)
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ac83dd80104abf75)

The guardrail is that this measure must simultaneously produce the singlet correlation, preserve the one-wing marginals, and avoid measurement-independence leakage. The measure must be a physically selected normalized preparation law, and the record map is a measurable family indexed by the settings. If conditioning is used, its normalization and acceptance rule must be stated. Marginal preservation is a property of the induced record laws; it is not full invariance of their setting-dependent joint distribution:
$$
\Delta_{\mathrm{Bell}}\le\epsilon_{\mathrm{Bell}},
\qquad
\Delta_{\mathrm{NS}}^{A},\Delta_{\mathrm{NS}}^{B}\le\epsilon_{\mathrm{NS}},
\qquad
\Delta_{\mathrm{ord}}\le\epsilon_{\mathrm{ord}},
\qquad
\Delta_{\mathrm{MI}}\le\epsilon_{\mathrm{MI}},
\qquad
\Delta_{\mathrm{GHZ}}\le\epsilon_{\mathrm{GHZ}},
\qquad
\Delta_{\mathrm{Hardy}}>0
\text{ in the calibrated Hardy regime.}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-935d0e4ce997bbfd)

Thus record reconstruction is the output surface of the Bell program, not a substitute for the pair-provenance and apparatus-response derivation.

### Why Angular Momentum Must Come First

The nonfactorizable joint response requires a precise physical account; a correlated or indivisible label $\lambda$ alone is insufficient. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the first object is not an abstract spin label. It is the full angular-momentum ledger of a pair-creation event: architrino positions and velocities, binary frequencies, Noether braid orientations, active causal-root branches, self-action terms, and causal-wake history.

**Creation event.** When a parent assembly fragments into daughters $A$ and $B$ at absolute time $T_0$, the Master Equation and any independently established motion/wake/boundary conservation identities constrain the daughter microstates $\Gamma_A(T_0)$ and $\Gamma_B(T_0)$. For a spin-singlet-like event, the observer-level summary is

$$
\mathbf{J}_A+\mathbf{J}_B=\mathbf{0}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-68633e25abee2239)

This is an ideal closed two-daughter effective summary only when orbital, apparatus, and wake/boundary contributions are absent or already included in the defined quantities. For the quantum singlet, the precise comparison is annihilation by the total spin operator, not preassigned vectors for every measurement axis. That summary is not the mechanism. The substrate question is how the total angular-momentum functional is conserved while the daughter Noether braids redistribute action across all three indexed binaries, including self-action and causal-wake terms. The statement $\mathbf{J}_A=-\mathbf{J}_B$ is only the coarse ledger result of that deeper process.

A source-level pair-provenance record should therefore replace the generic $\lambda$ placeholder before any Bell calculation is called physical. For a singlet-like source, write

$$
P_{\mathrm{src}}^{\mathrm{sing}}
=
\left(
B_{\mathrm{parent}}^-,
W_{\mathrm{src}},
T_0,
T_{\mathrm{sep}},
\Sigma_{\mathrm{src}},
\mu_{\mathrm{src}},
\Gamma_{\mathrm{src}}^{\mathrm{loc}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8bec4e03dd6f2929)

where $B_{\mathrm{parent}}^-$ is the pre-fragmentation parent branch, $W_{\mathrm{src}}$ is the source event window, $T_{\mathrm{sep}}$ is the separation time, $\Sigma_{\mathrm{src}}$ is the source separatrix or accepted branch condition, $\mu_{\mathrm{src}}$ is the source-side measure, and $\Gamma_{\mathrm{src}}^{\mathrm{loc}}$ records local source geometry. The retained pair-provenance distribution is

$$
\rho_{\mathrm{src}}
\left(
\Pi_{AB}^{\mathrm{sing}}
\middle|
P_{\mathrm{src}}^{\mathrm{sing}}
\right)
=
C_{\mathrm{pair}*}^{\mathrm{sing}}
\mu_{\mathrm{src}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ab42fd245c52acfb)

Here $\Pi_{AB}^{\mathrm{sing}}$ is the daughter-pair provenance record and $C_{\mathrm{pair}*}^{\mathrm{sing}}$ is the singlet-pair construction or conditioning map. Later detector settings are excluded fields of $P_{\mathrm{src}}^{\mathrm{sing}}$. Excluding them syntactically does not prove statistical independence; the selected preparation law must establish it. A later response kernel may depend on both settings through the declared coordination channel without redefining the pre-setting source record.

**Measurement geometry.** When detector $A$ measures along axis $\hat{\mathbf m}_A$, the apparatus does not read a tiny arrow. It drives the local assembly through a finite-time coupling process whose outcome depends on the full spin ledger: ordered binary-plane geometry, phase, active causal wakes, local Noether sea state, and the apparatus potential. The Stern-Gerlach-like scaffold in [Angular Momentum and Spin](./angular-momentum-and-spin.md#stern-gerlach-like-measurement-response) formulates this as apparatus potential-gradient coupling, driven reduced-chart threshold crossing, angular-momentum exchange, and wake / Noether sea recoil. A correct theory must derive how that coupling produces the two observed outcomes called spin-up and spin-down along $\hat{\mathbf m}_A$.

**Causal coordination and no-signaling.** The selected proposal permits live causal-wake coordination outside the effective photon cone while forbidding faster-than-$c_f$ influence and controllable observer signaling. Thus effective spacelike separation does not prohibit every substrate wake or exchange. Pair provenance gates this proposed coupling; it does not replace it with two Bell-local response laws. The mechanism and its multipartite consistency remain open.

### Reproducing the Quantum Correlation Function

The central quantitative test is whether the $\mathbb{A}\mathbb{A}\mathbb{A}$ hidden-variable structure reproduces the singlet correlation:

$$
E(\hat{\mathbf m}_A, \hat{\mathbf m}_B) = -\cos\theta_{AB}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f4f11b30b3b118e4)

**Classical-axis failure mode.** Suppose each daughter merely carries an opposite internal angular-momentum direction, distributed uniformly over the unit sphere:

$$
\hat{\mathbf n}_A=-\hat{\mathbf n}_B
$$

[View →](../../../../../equation-mapping.html#corpus-equation-422826c8b83cfee1)

The deterministic local response

$$
A(\hat{\mathbf m}_A,\hat{\mathbf n}_A)
=
\operatorname{sgn}
\left(
\hat{\mathbf m}_A\cdot\hat{\mathbf n}_A
\right),
\qquad
B(\hat{\mathbf m}_B,\hat{\mathbf n}_B)
=
\operatorname{sgn}
\left(
\hat{\mathbf m}_B\cdot\hat{\mathbf n}_B
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a0d0371b5075b00b)

gives the conserved-opposite-axis correlation

$$
E_{\mathrm{axis}}(\theta)
=
-1+\frac{2\theta}{\pi}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6ba11a7a2e93fb53)

which is **linear** in $\theta$ and does not violate the CHSH bound. This linear curve belongs to this uniform-axis sign model. Other local response models need not have this curve, but all measurement-independent Bell-factorizable models obey CHSH regardless of whether their basin boundaries are sharp or smooth.

This calculation is important because it shows what not to claim. Angular-momentum conservation at creation is not enough if it is reduced to preassigned opposite local axes. Simple smoothing of a local axis response is also not automatically enough; it must be checked against the full correlation function.

A sharper obstruction is product screening. Even a model with an explicit finite pair-provenance ledger and local apparatus kernels fails Bell closure if the completed table can be reconstructed as
$$
P_\theta(\mathbf{r}|\mathbf{s})
=
\int_{\Pi}
\prod_i
K_i(r_i|s_i,\Pi)\,
d\rho_{\mathrm{prov}}(\Pi)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3a62c5825ec300d8)

That form can preserve no-signaling and measurement independence while still staying inside the Bell-local bound. The Bell-family probability-table harness uses `bell.product_screening_collapse` when supplied screening records reproduce the supplied contexts within tolerance. Contexts without screening records are excluded from this comparison, so a partial set can trigger the label. It does not search all Bell-local decompositions or prove a native mechanism; absence of supplied screening records leaves that check unperformed. Pair provenance is useful only if the full law avoids every relevant Bell-local representation without setting-dependent source provenance or controllable signaling.

### Threshold-Pullback Product-Screening No-Go

The one-wing threshold-pullback theorem target from [Angular Momentum and Spin](angular-momentum-and-spin.md#helicity-and-vector-modes) is not, by itself, a Bell solution. It gives conditional one-wing basin arithmetic under an admitted preparation measure; it does not prove that the Master Equation supplies that measure or response. If two wings use independent copies of that construction over a setting-independent source measure, the result is exactly the Bell-local form.

Let $x,y$ denote detector settings and let $\Pi$ denote the retained source or pair-provenance record. Suppose the two-wing kernel factorizes as

$$
K_{ab}^{\mathrm{prod}}(x,y;\Pi,\zeta_A,\zeta_B)
=
K_A^a(x;\Pi,\zeta_A)
K_B^b(y;\Pi,\zeta_B)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7817346c53ea8fe7)

with a normalized setting-independent source measure $d\rho_{\mathrm{src}}(\Pi)$ and normalized local conditional measures $d\nu_{A,x}$ and $d\nu_{B,y}$ that may depend on their own settings but not the remote one, independent between wings conditional on $\Pi$. Such local apparatus dependence is compatible with measurement independence of the source record. After integrating unresolved local record variables, define

$$
p_A(a|x,\Pi)
=
\int K_A^a(x;\Pi,\zeta_A)\,d\nu_{A,x}(\zeta_A),
\qquad
p_B(b|y,\Pi)
=
\int K_B^b(y;\Pi,\zeta_B)\,d\nu_{B,y}(\zeta_B)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-15ded3e0c815a133)

Then the observed law becomes

$$
P(a,b|x,y)
=
\int
p_A(a|x,\Pi)
p_B(b|y,\Pi)
d\rho_{\mathrm{src}}(\Pi)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9c5f49030d686dfd)

For $\pm1$ outcomes, set

$$
A_x(\Pi)=\sum_{a=\pm1}a\,p_A(a|x,\Pi),
\qquad
B_y(\Pi)=\sum_{b=\pm1}b\,p_B(b|y,\Pi)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b0e86f246f3a8ce6)

so $A_x(\Pi),B_y(\Pi)\in[-1,1]$. For each $\Pi$,

$$
\left|
A_xB_y
+
A_xB_{y'}
+
A_{x'}B_y
-
A_{x'}B_{y'}
\right|
\le 2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-02130c4c444e307c)

Integrating over $d\rho_{\mathrm{src}}(\Pi)$ gives the CHSH bound $|S|\le2$. Therefore independent local threshold-pullback kernels can recover one-wing probabilities but cannot recover the singlet Bell law. A successful $\mathbb{A}\mathbb{A}\mathbb{A}$ Bell packet must derive a joint law that has no equivalent Bell-local product representation while preserving measurement independence and no-signaling. A non-restartable coarse compression alone does not meet that requirement.

The no-go is quantitative in the natural per-cell residual. If a candidate table is within $\Delta_{\mathrm{prod}}$ of a product-screened table for each outcome-setting cell, then each correlator differs by at most $4\Delta_{\mathrm{prod}}$, and the CHSH expression obeys

$$
|S|\le 2+16\Delta_{\mathrm{prod}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-58f695e1c89c407d)

At the CHSH-optimal singlet settings, a completed table within $\Delta_{\mathrm{joint}}^{\mathrm{sing}}$ of the singlet joint law must therefore satisfy

$$
\Delta_{\mathrm{prod}}
+
\Delta_{\mathrm{joint}}^{\mathrm{sing}}
\ge
\frac{2\sqrt2-2}{16}
=
\frac{\sqrt2-1}{8}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-59a14007401f52a4)

Thus exact singlet recovery requires

$$
\Delta_{\mathrm{prod}}
\ge
\frac{\sqrt2-1}{8}
\approx
0.0518
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e791e27245a15289)

in this residual normalization. Driving the product-screening residual to zero and driving the singlet residual to zero are mutually incompatible closure targets.

The candidate $\mathbb{A}\mathbb{A}\mathbb{A}$ route lies in the finite-time measurement interaction of a full Noether braid ledger rather than in a preassigned spin label. The ingredients to derive are:

1. **Angular-momentum ledger geometry**: the internal spin ledger includes ordered binary-plane geometry, binary frequencies, causal-root branches, and causal-wake angular momentum.

2. **Self-hit memory**: the daughter assembly's response is history-dependent, so the measurement interaction is not a memoryless readout of one vector.

3. **Contextual apparatus coupling**: a detector axis defines a real local interaction geometry, not merely an argument inserted into a probability formula.

4. **Pair provenance**: the two daughter ledgers come from one creation event and may retain relational constraints that are lost when one tries to split the state into two independent local packages.

The quantitative closure target is therefore the full singlet joint law, not only the correlation curve. For a Bell packet

$$
\theta=
\left(
P_{\mathrm{src}}^{\mathrm{sing}},
\mathcal{K}_A,
\mathcal{K}_B,
W,
T_W
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-41cea2ce322ae0ff)

let the derived joint response kernel satisfy

$$
K_{ab}^{\theta}
\left(
\hat{\mathbf m}_A,
\hat{\mathbf m}_B;
\Pi,
\zeta_A,
\zeta_B
\right)\ge0,
\qquad
\sum_{a,b=\pm1}K_{ab}^{\theta}=1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-02573f2a94e738c9)

The record law below uses normalized source preparation and normalized local conditional apparatus measures, which may depend on their own settings and on the retained source record. Their product declares conditional independence of incoming apparatus preparation; any shared preparation variables must be included in the source record or a declared joint preparation measure. This preparation assumption does not factorize the coupled response kernel. The record law is

$$
P_{\theta}(a,b|\hat{\mathbf m}_A,\hat{\mathbf m}_B)
=
\int
K_{ab}^{\theta}\,
d\nu_{A,\hat{\mathbf m}_A}\,
d\nu_{B,\hat{\mathbf m}_B}\,
d\rho_{\mathrm{src}}
\left(
\Pi
\middle|
P_{\mathrm{src}}^{\mathrm{sing}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b580a5a75e5b9905)

The singlet residual is

$$
\Delta_{\mathrm{joint}}^{\mathrm{sing}}
=
\sup_{a,b,\hat{\mathbf m}_A,\hat{\mathbf m}_B}
\left|
P_{\theta}(a,b|\hat{\mathbf m}_A,\hat{\mathbf m}_B)
-
\frac14
\left(
1-ab\,\hat{\mathbf m}_A\cdot\hat{\mathbf m}_B
\right)
\right|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-eeb7103ae33f6ef8)

Normalization follows from the normalized measures and joint kernel. If the joint residual is at most $\delta$, each one-wing probability differs from the ideal marginal by at most $2\delta$ and each correlator by at most $4\delta$. The following exact correlation is the zero-residual target:

$$
E_\theta(\hat{\mathbf m}_A,\hat{\mathbf m}_B)
=
\sum_{a,b=\pm1}ab\,P_{\theta}(a,b|\hat{\mathbf m}_A,\hat{\mathbf m}_B)
=
-\hat{\mathbf m}_A\cdot\hat{\mathbf m}_B
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3a065485e6a52b69)

The local Stern-Gerlach kernels remain candidate basin indicators requiring derivation from the retained dynamics. The remaining Bell-level task is the normalized joint coordination kernel and preparation law; a change of source measure alone cannot make two independent Bell-local kernels violate CHSH while retaining measurement independence.

This derivation is a **target**, not a completed result. The immediate prerequisite is the angular-momentum and spin program: derive how total angular momentum is conserved and redistributed in a changing-frequency Noether braid, use the Master-Equation apparatus impulse and physically selected incoming preparation measure to realize $K_{\pm}^{\text{SG}}$, and then derive the pair-provenance measure for correlated braids. The reduced Stern-Gerlach chart supplies the single-assembly half-angle basin arithmetic and the external apparatus-term origins, but it is not a Bell-pair correlation proof.

---

## Comparison with Other Hidden-Variable Frameworks

### de Broglie–Bohm (Pilot-Wave) Theory

This is the closest structural relative in the inherited taxonomy. Both $\mathbb{A}\mathbb{A}\mathbb{A}$ and Bohmian mechanics are deterministic and realistic; any successful $\mathbb{A}\mathbb{A}\mathbb{A}$ Bell account will also be nonlocal in Bell's technical sense. Key differences:

| Feature | de Broglie–Bohm | $\mathbb{A}\mathbb{A}\mathbb{A}$ |
|:---|:---|:---|
| Hidden variables | Particle positions in 3D | Full admitted path history and retained environment, with positions, velocities, and polarities in 3D |
| Guidance mechanism | Pilot wave $\psi$ on configuration space $\mathbb{R}^{3N}$ | Superposed causal-wake geometry in physical 3D space |
| Ontological economy | Particles plus wave in the field reading; nomological readings treat the wave differently | One category (architrinos); wake structure is generated by architrinos |
| Nonlocality mechanism | Entangled $\psi$ can couple configuration velocities across particles | Proposed live coordination gated by pair provenance, still to be derived |
| Spacetime | Ordinary nonrelativistic time in the basic theory; relativistic extensions require a specified formulation | Euclidean void + absolute time (fundamental) |
| Memory | Markovian (given $\psi$) | Non-Markovian (self-hit, path-history dependence) |

In Bohmian mechanics, the pilot wave on $\mathbb{R}^{3N}$ provides nonlocal guidance: the full configuration helps determine the velocity field. In $\mathbb{A}\mathbb{A}\mathbb{A}$, it is premature to say that the entire Bell burden resides only in initial conditions. A pure initial-condition account that compresses into independent local response functions would fall back into the class excluded by Bell. The open task is to determine how the full angular-momentum ledger, pair provenance, and local measurement coupling appear when translated into Bell's variables.

### Superdeterminism

Superdeterministic models relax measurement independence through correlations between the source description and settings. Determinism alone does not imply such correlations or decide philosophical freedom. The selected Architrino route retains measurement independence as a model requirement; causal separation, distant-quasar settings, or excluding setting fields from a source record does not prove exact independence of arbitrary hidden variables. Its source/setting law and uncertainty budget must support the claim.

### Retrocausal Models

Retrocausal interpretations allow influences from future measurement settings to propagate backward in time to the source, effectively setting $\lambda$ in response to $\hat{m}_A$ and $\hat{m}_B$. $\mathbb{A}\mathbb{A}\mathbb{A}$'s absolute-time ontology categorically forbids backward-in-$T$ causation. All causal influences propagate forward in absolute time at or below $c_f$. The correlations in $\lambda$ are forward-causal consequences of the creation event, established before any measurement setting is chosen.

Temporal-nonlocality language is therefore a comparison diagnostic, not a mechanism to import. In a relativistic observer description, different frames may assign different time orderings to spacelike-separated measurement records; that does not license future-boundary variables in the substrate ledger. A candidate Bell record should evaluate pair provenance, $\Delta_{\mathrm{MI}}$, $\Delta_{\mathrm{NS}}^{A}$, $\Delta_{\mathrm{NS}}^{B}$, and $\Delta_{\mathrm{Bell}}$ on the absolute-time record. If the correlation fit requires $\lambda$ to depend on later settings, the record has left the stated $\mathbb{A}\mathbb{A}\mathbb{A}$ route and should be classified with retrocausal or measurement-independence-denying comparison models.

---

## The Role of Absolute Time

A global time parameter $T$ belongs to the chosen substrate ontology and indexes the proposed coordination law; it is not required by Bell's theorem itself.

**Problem in relativistic frameworks.** In Minkowski spacetime, spacelike-separated measurements have no invariant temporal ordering. Telling a story about "what happens first" requires selecting a frame, and different frames give different orderings. Relativistic quantum predictions for separated records remain consistent without an invariant measurement order. The absence of that order is not a mathematical inconsistency or an explanation of Bell violation.

**Resolution via absolute time.** In $\mathbb{A}\mathbb{A}\mathbb{A}$, the temporal ordering of all events is objective. Measurements at $A$ and $B$ occur at definite absolute times $T_A$ and $T_B$, with $T_A < T_B$, $T_A = T_B$, or $T_A > T_B$ as an objective fact. The proposed account has the following structure, subject in each ordering to the actual finite setting-to-record windows and wake reachability. Equal final record times do not establish an available coordination channel:

1. At $T_0 < \min(T_A, T_B)$: the creation event establishes $\lambda$.
2. At each measurement time: the local apparatus drives the assembly through a reduced-chart threshold toward a persistent record. That local transition is apparatus-dependent, but the target observer-level law must be produced by the proposed coupled response kernel on the admitted coordination channel, not a restartable product of two independent local hidden-variable packages.
3. After both measurements: comparison of results (via sub-$c_f$ classical communication) reveals the correlations.

No step may involve faster-than-$c_f$ signal transfer. The correlations are visible only upon comparison. The objective temporal ordering removes one frame-dependence puzzle, but it does not by itself solve Bell's theorem. The missing work is the lower-level derivation of the spin ledger and measurement-response kernel.

**Emergent Lorentz invariance.** Physical Observers, who lack access to absolute time and use assembly-based clocks and rulers, are intended to recover an effective Minkowski geometry in which the temporal ordering of spacelike-separated events is frame-dependent. This does not contradict the underlying absolute ordering; it creates the ordering-invariance burden above. The observer-accessible Bell table must not reveal whether $A\prec_TB$ or $B\prec_TA$ in the substrate; see [Observer Framework](../../spacetime/observer-framework.md).

---

## Observables, Falsifiability, and Failure Modes

**Closure target:** $\mathbb{A}\mathbb{A}\mathbb{A}$ must reproduce all experimentally observed Bell-family correlation constraints from architrino-level angular-momentum and measurement-response dynamics, without superluminal signaling or denial of measurement independence.

**Assumptions:**
- The full microstate $\Gamma(T)$ is definite at all $T$ (realism).
- Conservation constraints at creation establish a joint pair ledger, but the detailed angular-momentum distribution must be derived.
- Measurement is threshold resolution in the coupled substrate response (no controllable observer signaling and no faster-than-$c_f$ input; any distant substrate input must be the declared $c_f$ coordination channel).
- Measurement independence holds (no superdeterminism, no retrocausation).
- The measurement-response kernel of a Noether braid assembly interacting with an apparatus is a deterministic basin indicator, not a primitive $\cos^2(\alpha/2)$ rule. The single-assembly half-angle law is conditional arithmetic in the reduced Stern-Gerlach chart; the Master-Equation burden is to derive the effective spinor coordinate, apparatus impulse, and incoming preparation measure. A post-record invariant cycle measure does not by itself supply that preparation law.

**Required recoveries:**
- The ideal singlet target at optimal settings is $|S| = 2\sqrt{2}$; actual noisy preparations and detectors require their calibrated joint-law predictions rather than universal saturation.
- No violation of the Tsirelson bound: $|S| \leq 2\sqrt{2}$. Observing $|S| > 2\sqrt{2}$ would falsify both QM and any $\mathbb{A}\mathbb{A}\mathbb{A}$ model that reproduces QM.
- GHZ product-sign contexts are recovered without assigning one context-independent local value table across all $X/Y$ settings.
- Hardy's zero-probability constraints and positive event margin are recovered for the calibrated nonmaximally entangled regime.
- No-signaling is exact: no measurement protocol on $A$ can alter the marginal statistics at $B$.
- Ordering invariance is exact within the declared Bell regime: observer-level spacelike-separated joint tables do not expose whether $A\prec_TB$ or $B\prec_TA$ in absolute time.
- Preferred-frame leakage remains below the Lorentz-test residual bound on the same observer export that supplies detector timing, analyzer calibration, and coincidence-window records.
- Measurement-independence leakage is explicitly bounded by $\Delta_{\mathrm{MI}}\le\epsilon_{\mathrm{MI}}$ rather than absorbed into the pair-provenance explanation.
- Correlation recovery is checked through $\Delta_{\mathrm{Bell}}$ against the full $-\cos\theta$ curve, not only by a single CHSH setting choice.
- A proposed additional medium contribution to decoherence must be derived and distinguished from ordinary effective quantum environmental sensitivity (shared target with [Entanglement and Nonlocality](./entanglement-nonlocality.md)).

**Failure Modes:**
- If a claimed single-wing prepared-spin benchmark misses $\cos^2(\alpha/2)$ beyond its calibrated tolerance, that single-wing mechanism fails. Its marginal alone neither determines nor certifies the two-wing Bell correlation; the joint law must also be checked.
- A separable initial distribution alone does not imply Bell locality if later responses are coupled. Conversely, a correlated initial distribution alone does not evade locality. The failure condition is a measurement-independent source law together with a Bell-factorizable complete response.
- If the retained pair-provenance ledger and apparatus kernels reduce to the product-screened form $\int_{\Pi}\prod_iK_i\,d\rho_{\mathrm{prov}}$, then the model has explicit common-past data but still remains Bell-local. This is a failure even when no-signaling and measurement independence pass.
- If $\Delta_{\mathrm{MI}}$ is nonzero in a way that is necessary for the correlation fit, the model has abandoned the stated $\mathbb{A}\mathbb{A}\mathbb{A}$ Bell route and must be reclassified before any corpus claim is promoted.
- If any experiment demonstrates genuine **signaling** via entanglement (information transfer at $B$ contingent on the setting choice at $A$, without a classical channel), the selected no-signaling realization fails; such evidence would require revising that premise rather than logically excluding every substrate ontology.
- If the joint table changes with substrate absolute-time ordering for observer-level spacelike-separated records, the Bell packet leaks preferred simultaneity even if the one-wing marginals remain local.
- If the CHSH fit requires an observer-accessible preferred-frame drift in clocks, analyzer calibration, coincidence windows, or signal timing, the Bell packet fails the Lorentz handoff even if $\Delta_{\mathrm{Bell}}$ is small.
- A demonstrated setting–source dependence revises the independence model for that experiment and candidate description. Cosmic timing constraints alone do not establish or falsify independence for every hidden-state completion or interpretation.

The Bell claim therefore stops at the closure target and failure conditions. A completed account requires lower-level angular-momentum, Stern-Gerlach response, source-measure, and pair-provenance derivations before this chapter can report success or failure.
