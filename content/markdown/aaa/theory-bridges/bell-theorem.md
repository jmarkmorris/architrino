# Bell's Theorem: Traditional Derivation and Architrino Assembly Architecture Response

This document presents the standard derivation and physical content of Bell's theorem, then states how the Architrino Assembly Architecture ($\mathbb{A}\mathbb{A}\mathbb{A}$) should approach the experimentally observed violations of Bell inequalities. It is a bridge document, not the final mechanism. The final account must be rebuilt from the architrino-level angular-momentum and spin ledger developed in [Angular Momentum and Spin](./angular-momentum-and-spin.md).

The phrase "hidden variable" is inherited from the Bell literature. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the relevant variables are not hidden from nature. They are unresolved by the observer-level quantum abstraction. The task is therefore not to defend a vague hidden-variable category, but to identify the exact architrino, Noether-core, causal-wake, and measurement-apparatus variables whose coarse description becomes quantum spin statistics.

---

## Traditional Statement of Bell's Theorem

### The EPR Argument (Precursor)

Einstein, Podolsky, and Rosen (1935) argued from two premises:

- **Realism**: If, without disturbing a system, the outcome of a measurement can be predicted with certainty, there exists an element of physical reality corresponding to that outcome.
- **Locality**: No action performed on one system can instantaneously affect a distant system.

Applied to a pair of particles with perfectly anti-correlated spins, EPR concluded that both spin components must possess simultaneous definite values (predetermined by hidden variables $\lambda$), and that quantum mechanics, which assigns no such values, is therefore incomplete.

The quantum formalist response (Bohr) rejected the premise that unmeasured observables possess definite values. The debate remained philosophical until Bell (1964) converted it into a quantitative, experimentally testable constraint.

### Bell's Derivation

Consider a source that produces pairs of particles sent to two distant detectors. Detector $A$ measures along axis $\hat{m}_A$ and records outcome $a = \pm 1$; detector $B$ measures along $\hat{m}_B$ and records $b = \pm 1$.

**Assumption 1 (Realism / Hidden Variables).** There exists a complete specification $\lambda$ (drawn from some space $\Lambda$ with distribution $\rho(\lambda)$) such that the outcomes are deterministic functions:

$$
a = A(\hat{m}_A, \lambda), \quad b = B(\hat{m}_B, \lambda).
$$

**Assumption 2 (Bell Locality).** The outcome at each detector depends only on the local measurement setting and the shared hidden variable, not on the distant setting:

$$
A(\hat{m}_A, \lambda) \text{ is independent of } \hat{m}_B, \quad B(\hat{m}_B, \lambda) \text{ is independent of } \hat{m}_A.
$$

This is the factorizability condition. For stochastic theories it generalizes to:

$$
P(a, b \,|\, \hat{m}_A, \hat{m}_B, \lambda) = P(a \,|\, \hat{m}_A, \lambda)\; P(b \,|\, \hat{m}_B, \lambda).
$$

**Assumption 3 (Measurement Independence).** The hidden variable $\lambda$ is statistically independent of the freely chosen measurement settings:

$$
\rho(\lambda \,|\, \hat{m}_A, \hat{m}_B) = \rho(\lambda).
$$

### The CHSH Inequality

From these three assumptions, Clauser, Horne, Shimony, and Holt (1969) derived the experimentally accessible inequality. Define the correlation function:

$$
E(\hat{m}_A, \hat{m}_B) = \int_\Lambda A(\hat{m}_A, \lambda)\, B(\hat{m}_B, \lambda)\, \rho(\lambda)\, d\lambda.
$$

For any four measurement settings $\hat{m}_A, \hat{m}_A', \hat{m}_B, \hat{m}_B'$, the CHSH combination:

$$
S = E(\hat{m}_A, \hat{m}_B) - E(\hat{m}_A, \hat{m}_B') + E(\hat{m}_A', \hat{m}_B) + E(\hat{m}_A', \hat{m}_B')
$$

satisfies:

$$
|S| \leq 2.
$$

This bound holds for any local, realistic, measurement-independent hidden-variable theory, regardless of the specific form of $A$, $B$, or $\rho$.

### Quantum Mechanical Prediction

For the spin-singlet state $|\Psi^-\rangle = \frac{1}{\sqrt{2}}(|\!\uparrow\downarrow\rangle - |\!\downarrow\uparrow\rangle)$, quantum mechanics predicts:

$$
E_{\text{QM}}(\hat{m}_A, \hat{m}_B) = -\hat{m}_A \cdot \hat{m}_B = -\cos\theta_{AB},
$$

where $\theta_{AB}$ is the angle between the two measurement axes. With the optimal choice of settings ($\theta = \pi/4$ increments), this yields:

$$
|S_{\text{QM}}| = 2\sqrt{2} \approx 2.828,
$$

which violates the CHSH bound. The value $2\sqrt{2}$ is the **Tsirelson bound**, the maximum achievable by any quantum state.

### Bell-Family Strengthenings: GHZ and Hardy

The CHSH inequality is the main statistical benchmark, but it is not the only Bell-family validation target. Two primary-source strengthenings are useful because they expose failures that can be hidden by fitting one averaged correlation curve.

**GHZ perfect-correlation benchmark.** For a calibrated three-party GHZ state, choose local Pauli-type settings $X$ and $Y$ and define the four product contexts
$$
\mathcal{C}_{\mathrm{GHZ}}=\{XXX,XYY,YXY,YYX\}.
$$
Quantum mechanics assigns product signs $\chi_C\in\{-1,+1\}$ for those contexts such that
$$
\prod_{C\in\mathcal{C}_{\mathrm{GHZ}}}\chi_C=-1.
$$
Any context-independent local assignment of predetermined values $x_A,y_A,x_B,y_B,x_C,y_C\in\{-1,+1\}$ gives product $+1$, because every local value appears twice when the four context products are multiplied. This is the all-or-nothing GHZ obstruction: a model cannot pass by reproducing only a Bell average while carrying one fixed local value table across all contexts.

For an $\mathbb{A}\mathbb{A}\mathbb{A}$ record model, the corresponding residual is
$$
\Delta_{\mathrm{GHZ}}
=
\max_{C\in\mathcal{C}_{\mathrm{GHZ}}}
\left[
1-\chi_C E_\theta(C)
\right]_+,
$$
where $E_\theta(C)$ is the product expectation of the three declared apparatus records in context $C$ and $[x]_+\equiv\max(x,0)$. Passing this benchmark means deriving the context-indexed joint record distribution from pair or multiplet provenance and local detector kernels, not assigning context-independent substrate values to all effective $X$ and $Y$ operators.

**Hardy zero/positive event benchmark.** Hardy's two-particle proof uses binary observables $U_i,D_i$ and a nonmaximally entangled state to combine three zero-probability constraints with one positive-probability event. In one common convention the quantum target is
$$
P(U_1=1,U_2=1)=0,
\qquad
P(D_1=1,U_2=0)=0,
$$
$$
P(U_1=0,D_2=1)=0,
\qquad
P(D_1=1,D_2=1)>0.
$$
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
\right]_+.
$$
The target is not to import Hardy's notation as ontology. The target is to make the declared joint record measure reproduce the zero constraints and the positive event while preserving measurement independence and no-signaling.

### Experimental Status

Beginning with Freedman and Clauser (1972) and Aspect, Dalibard, and Roger (1982), and culminating in loophole-free tests (Hensen et al. 2015, Giustina et al. 2015, Shalm et al. 2015), experiments consistently observe $|S| > 2$, in agreement with the quantum prediction. The three principal loopholes have been individually and jointly closed:

- **Locality loophole**: measurement settings chosen and outcomes recorded in spacelike-separated regions.
- **Detection loophole**: sufficiently high detection efficiency to rule out biased subsamples.
- **Freedom-of-choice loophole**: settings determined by sources (distant quasars, cosmic photons) causally disconnected from the particle source.

Cosmic setting-choice tests make the measurement-independence burden concrete. They do not prove metaphysical freedom; they bound the possibility that the apparatus settings and the pair-preparation variables shared an unrecorded common cause inside the relevant past lightcone overlap. In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, any proposed pair-provenance explanation must keep that setting-source correlation inside the declared $\Delta_{\mathrm{MI}}$ tolerance rather than using remote common-cause leakage as an untracked escape route.

The experimental conclusion is unambiguous: at least one of the three Bell assumptions must fail.

---

## The Logical Structure of the Theorem

Bell's theorem is a **no-go theorem**: it excludes a class of theories, not a specific model. Its logical skeleton is:

$$
\text{(Realism)} \;\wedge\; \text{(Bell Locality)} \;\wedge\; \text{(Measurement Independence)} \;\Rightarrow\; |S| \leq 2.
$$

The contrapositive is:

$$
|S| > 2 \;\Rightarrow\; \neg\text{(Realism)} \;\vee\; \neg\text{(Bell Locality)} \;\vee\; \neg\text{(Measurement Independence)}.
$$

Experiment confirms $|S| > 2$. Therefore at least one assumption is false. The interpretive question is: *which one?*

The major responses in the literature are:

| Response | Assumption Denied | Representative Framework |
|:---|:---|:---|
| Orthodox QM (Copenhagen) | Realism | Standard textbook QM |
| Many-Worlds | Bell Locality (implicitly, via branching) | Everettian QM |
| Pilot-Wave | Bell Locality (explicitly) | de Broglie–Bohm |
| Superdeterminism | Measurement Independence | 't Hooft, some retrocausal models |
| Retrocausal | Bell Locality (via future boundary conditions) | Transactional, two-state-vector |

---

## Architrino Assembly Architecture Placement

### What The Bell Abstraction Can And Cannot Decide

At the Bell-abstraction level, any $\mathbb{A}\mathbb{A}\mathbb{A}$ completion that reproduces the experiments cannot reduce to a local factorizable response model with measurement-independent variables. That is the hard constraint. It does not decide what angular momentum is, what spin is, or how a Noether core responds to a detector. Those questions belong one level lower, in the architrino and causal-wake dynamics.

The current placement is therefore:

- **Realism is retained**: every architrino possesses a definite position $\mathbf{x}_i(t)$, velocity $\mathbf{v}_i(t)$, polarity $q_i$, and path-history ledger at every absolute time $t$. The complete microstate exists independently of observation.

- **Measurement independence is retained**: detector settings are not assumed to be pre-correlated with the source microstate. $\mathbb{A}\mathbb{A}\mathbb{A}$ does not invoke superdeterminism.

- **Bell factorizability is a closure target, not a slogan**: if the completed substrate model is compressed into Bell variables, it must fail the factorized local-response form

$$
P(a, b \,|\, \hat{m}_A, \hat{m}_B, \lambda) \neq P(a \,|\, \hat{m}_A, \lambda)\; P(b \,|\, \hat{m}_B, \lambda),
$$

while still preserving no-signaling. The mechanism for that failure must be derived from the angular-momentum ledger and the detector coupling, not inserted by terminology.

A shared past is not enough by itself. If a declared common-past record $C$ screens the two wings into independent one-wing laws while measurement independence and no-signaling hold, the model has re-entered the Bell-local class. A useful residual for this check is

$$
\Delta_{\mathrm{fact}}(C)
=
\sup_{\hat{m}_A,\hat{m}_B}
D_{\mathrm{TV}}\!\left(
P(a,b\mid \hat{m}_A,\hat{m}_B,C),
P(a\mid \hat{m}_A,C)P(b\mid \hat{m}_B,C)
\right).
$$

Here $C$ is not a new substrate object; it is the retained common-past or pair-provenance record used by the proposed Bell closure. A successful $\mathbb{A}\mathbb{A}\mathbb{A}$ route must explain why the declared provenance and apparatus-response compression leaves a nonzero factorization residual while keeping the measurement-independence and no-signaling residuals below tolerance. If $\Delta_{\mathrm{fact}}(C)$ vanishes for the completed hidden-variable record, the closure has not escaped the theorem.

The same point can be stated as a Markov-screening and restartability test. A finite-thickness screening region, common-past record, or pair-provenance ledger screens a Bell experiment only if the retained state at an intermediate time can be used as a restartable effective state for the later detector records. For $t_0<t_s<t_{\mathrm{rec}}$ and a declared Bell coarse-graining $\mathcal{Q}_{AB}$, define

$$
\Delta_{\mathrm{div}}^{AB}(t_0,t_s,t_{\mathrm{rec}};\mathcal{Q}_{AB})
=
\left\|
\mathcal{T}^{\mathcal{Q}_{AB}}_{t_0\to t_{\mathrm{rec}}}
-
\mathcal{T}^{\mathcal{Q}_{AB}}_{t_s\to t_{\mathrm{rec}}}
\mathcal{T}^{\mathcal{Q}_{AB}}_{t_0\to t_s}
\right\|_{\mathrm{TV}\to\mathrm{TV}}.
$$

If $\Delta_{\mathrm{div}}^{AB}\le\varepsilon_{\mathrm{div}}$ and $\Delta_{\mathrm{fact}}(C)=0$ for the completed retained record, the proposed closure has supplied a restartable screened common cause and remains in the Bell-local class. If $\Delta_{\mathrm{div}}^{AB}=O(1)$ for the observer-level Bell variables, then the reduced variables have lost path-history information needed for the joint record law; that is a possible reason the Bell abstraction fails to factorize. This does not weaken Bell's theorem. It states the replacement burden: derive the non-restartable record compression from pair provenance, local apparatus kernels, and finite-time measurement dynamics while still passing the no-signaling, measurement-independence, and correlation gates below.

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
\right),
$$

where $D_{\mathrm{TV}}$ is total-variation distance on the hidden-variable distribution. The $\mathbb{A}\mathbb{A}\mathbb{A}$ route requires $\Delta_{\mathrm{MI}}$ to vanish, or at minimum to remain below an explicitly reported experimental and simulation tolerance $\epsilon_{\mathrm{MI}}$. Otherwise the mechanism has drifted into a measurement-independence denial rather than the pair-provenance route stated above.

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
\right|,
$$

with the analogous $\Delta_{\mathrm{NS}}^{B}$ obtained by exchanging the detector labels. Both must vanish within tolerance.

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
\right],
$$

where

$$
m_A=\sum_{a,b}aP(a,b|x,y),
\qquad
m_B=\sum_{a,b}bP(a,b|x,y),
\qquad
C=\sum_{a,b}abP(a,b|x,y).
$$

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
\right],
$$

with positivity condition

$$
1+a\,m_A(x)+b\,m_B(y)+ab\,C(x,y)\ge0.
$$

For the singlet target,

$$
m_A(x)=0,
\qquad
m_B(y)=0,
\qquad
C(x,y)=-\hat{\mathbf m}_A\cdot\hat{\mathbf m}_B.
$$

Product-screened response is the special subclass

$$
C_{\mathrm{prod}}(x,y)
=
\int
A_x(\Pi)B_y(\Pi)\,
d\rho_{\mathrm{src}}(\Pi).
$$

Thus the non-product burden is sharply located: a successful pair-provenance account must derive a correlation channel $C(x,y)$ that is not reducible to $C_{\mathrm{prod}}(x,y)$, while keeping $m_A$ and $m_B$ local and preserving positivity.

Correlation recovery is the third guardrail:

$$
\Delta_{\mathrm{Bell}}
=
\sup_{\theta\in[0,\pi]}
\left|
E_{\mathbb{A}\mathbb{A}\mathbb{A}}(\theta)+\cos\theta
\right|.
$$

The target is therefore not simply "$|S|>2$." The target is simultaneous recovery of the tested Bell correlations, preservation of no-signaling, and preservation of measurement independence while the observer-level compression still fails Bell's factorized local-response form.

### Record-Reconstruction Guardrail

Bell experiments end in ordinary records: detector clicks, settings logs, coincidence windows, and later statistical summaries. That observation is important because it keeps the evidence at the observer-accessible level. It is not, by itself, an explanation of the correlations. A completed $\mathbb{A}\mathbb{A}\mathbb{A}$ account must explain why the joint record distribution has the tested quantum form, not merely why final records exist.

For a record map
$$
\pi_{AB}:\mathcal{M}_{AB}\to\mathcal{R}_A\times\mathcal{R}_B,
$$
the required joint distribution is
$$
P(a,b\mid\hat{m}_A,\hat{m}_B)
=
\mu_*^{AB}\!\left(
\pi_{AB}^{-1}(a,b;\hat{m}_A,\hat{m}_B)
\right).
$$
The guardrail is that this measure must simultaneously produce the singlet correlation, preserve the one-wing marginals, and avoid measurement-independence leakage:
$$
\Delta_{\mathrm{Bell}}\le\epsilon_{\mathrm{Bell}},
\qquad
\Delta_{\mathrm{NS}}^{A},\Delta_{\mathrm{NS}}^{B}\le\epsilon_{\mathrm{NS}},
\qquad
\Delta_{\mathrm{MI}}\le\epsilon_{\mathrm{MI}},
\qquad
\Delta_{\mathrm{GHZ}}\le\epsilon_{\mathrm{GHZ}},
\qquad
\Delta_{\mathrm{Hardy}}>0
\text{ in the calibrated Hardy regime.}
$$
Thus record reconstruction is the output surface of the Bell program, not a substitute for the pair-provenance and apparatus-response derivation.

### Why Angular Momentum Must Come First

The non-separability of $\lambda$ requires a precise physical account. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the first object is not an abstract spin label. It is the full angular-momentum ledger of a pair-creation event: architrino positions and velocities, binary frequencies, Noether-core orientations, active causal-root branches, self-action terms, and causal-wake history.

**Creation event.** When a parent assembly fragments into daughters $A$ and $B$ at absolute time $t_0$, the Master Equation and conservation laws jointly constrain the daughter microstates $\Gamma_A(t_0)$ and $\Gamma_B(t_0)$. For a spin-singlet-like event, the observer-level summary is

$$
\mathbf{J}_A+\mathbf{J}_B=\mathbf{0}.
$$

That summary is necessary, but it is not the mechanism. The substrate question is how the total angular-momentum functional is conserved while the daughter Noether cores redistribute action across inner, middle, and outer binaries, including self-action and causal-wake terms. The statement $\mathbf{J}_A=-\mathbf{J}_B$ is only the coarse ledger result of that deeper process.

A source-level pair-provenance record should therefore replace the generic $\lambda$ placeholder before any Bell calculation is called physical. For a singlet-like source, write

$$
P_{\mathrm{src}}^{\mathrm{sing}}
=
\left(
B_{\mathrm{parent}}^-,
W_{\mathrm{src}},
t_0,
t_{\mathrm{sep}},
\Sigma_{\mathrm{src}},
\mu_{\mathrm{src}},
\Gamma_{\mathrm{src}}^{\mathrm{loc}}
\right),
$$

where $B_{\mathrm{parent}}^-$ is the pre-fragmentation parent branch, $W_{\mathrm{src}}$ is the source event window, $t_{\mathrm{sep}}$ is the separation time, $\Sigma_{\mathrm{src}}$ is the source separatrix or accepted branch condition, $\mu_{\mathrm{src}}$ is the source-side measure, and $\Gamma_{\mathrm{src}}^{\mathrm{loc}}$ records local source geometry. The retained pair-provenance distribution is

$$
\rho_{\mathrm{src}}
\left(
\Pi_{AB}^{\mathrm{sing}}
\middle|
P_{\mathrm{src}}^{\mathrm{sing}}
\right)
=
C_{\mathrm{pair}*}^{\mathrm{sing}}
\mu_{\mathrm{src}}.
$$

Here $\Pi_{AB}^{\mathrm{sing}}$ is the daughter-pair provenance record and $C_{\mathrm{pair}*}^{\mathrm{sing}}$ is the singlet-pair construction or conditioning map. Later detector settings are excluded fields of $P_{\mathrm{src}}^{\mathrm{sing}}$; if they enter this source record, the model has moved into measurement-independence failure rather than Bell closure.

**Measurement geometry.** When detector $A$ measures along axis $\hat{\mathbf m}_A$, the apparatus does not read a tiny arrow. It drives the local assembly through a finite-time coupling process whose outcome depends on the full spin ledger: ordered binary-plane geometry, phase, active causal wakes, local Noether-Sea state, and the apparatus potential. The Stern-Gerlach-like scaffold in [Angular Momentum and Spin](./angular-momentum-and-spin.md#stern-gerlach-like-measurement-response) formulates this as apparatus potential-gradient coupling, basin-boundary crossing, angular-momentum exchange, and wake / Noether-Sea recoil. A correct theory must derive how that coupling produces the two observed outcomes called spin-up and spin-down along $\hat{\mathbf m}_A$.

**Why this is not action at a distance.** No usable signal, energy, or causal wake is allowed to pass from one detector to the other during spacelike-separated measurement. The Bell-level difficulty is therefore not solved by adding a signal. It must be solved by showing that the full pair provenance and each local measurement interaction do not compress into the factorizable local-response model that Bell excludes.

### Reproducing the Quantum Correlation Function

The central quantitative test is whether the $\mathbb{A}\mathbb{A}\mathbb{A}$ hidden-variable structure reproduces the singlet correlation:

$$
E(\hat{\mathbf m}_A, \hat{\mathbf m}_B) = -\cos\theta_{AB}.
$$

**Classical-axis failure mode.** Suppose each daughter merely carries an opposite internal angular-momentum direction, distributed uniformly over the unit sphere:

$$
\hat{\mathbf n}_A=-\hat{\mathbf n}_B.
$$

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

gives the conserved-opposite-axis correlation

$$
E_{\mathrm{axis}}(\theta)
=
-1+\frac{2\theta}{\pi},
$$

which is **linear** in $\theta$ and does not violate the CHSH bound. This is the well-known failure of all local hidden-variable models with sharp basin boundaries.

This calculation is important because it shows what not to claim. Angular-momentum conservation at creation is not enough if it is reduced to preassigned opposite local axes. Simple smoothing of a local axis response is also not automatically enough; it must be checked against the full correlation function.

A sharper obstruction is product screening. Even a model with an explicit finite pair-provenance ledger and local apparatus kernels fails Bell closure if the completed table can be reconstructed as
$$
P_\theta(\mathbf{r}|\mathbf{s})
=
\int_{\Pi}
\prod_i
K_i(r_i|s_i,\Pi)\,
d\rho_{\mathrm{prov}}(\Pi).
$$
That form can preserve no-signaling and measurement independence while still staying inside the Bell-local bound. The validation harness records this as `bell.product_screening_collapse`, so pair provenance is useful only if the retained record law avoids this compression without introducing setting-dependent provenance or distant signaling.

### Threshold-Pullback Product-Screening No-Go

The one-wing threshold-pullback theorem target from [Angular Momentum and Spin](angular-momentum-and-spin.md#helicity-and-vector-modes) is not, by itself, a Bell solution. It proves how a deterministic basin kernel can reproduce a declared one-wing probability after pushing forward an invariant record-window measure. If two wings use independent copies of that construction over a setting-independent source measure, the result is exactly the Bell-local form.

Let $x,y$ denote detector settings and let $\Pi$ denote the retained source or pair-provenance record. Suppose the two-wing kernel factorizes as

$$
K_{ab}^{\mathrm{prod}}(x,y;\Pi,\zeta_A,\zeta_B)
=
K_A^a(x;\Pi,\zeta_A)
K_B^b(y;\Pi,\zeta_B),
$$

with $d\nu_{A,x}$, $d\nu_{B,y}$, and $d\rho_{\mathrm{src}}(\Pi)$ setting-independent in the Bell sense. After integrating unresolved local record variables, define

$$
p_A(a|x,\Pi)
=
\int K_A^a(x;\Pi,\zeta_A)\,d\nu_{A,x}(\zeta_A),
\qquad
p_B(b|y,\Pi)
=
\int K_B^b(y;\Pi,\zeta_B)\,d\nu_{B,y}(\zeta_B).
$$

Then the observed law becomes

$$
P(a,b|x,y)
=
\int
p_A(a|x,\Pi)
p_B(b|y,\Pi)
d\rho_{\mathrm{src}}(\Pi).
$$

For $\pm1$ outcomes, set

$$
A_x(\Pi)=\sum_{a=\pm1}a\,p_A(a|x,\Pi),
\qquad
B_y(\Pi)=\sum_{b=\pm1}b\,p_B(b|y,\Pi),
$$

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
\le 2.
$$

Integrating over $d\rho_{\mathrm{src}}(\Pi)$ gives the CHSH bound $|S|\le2$. Therefore independent local threshold-pullback kernels can recover one-wing probabilities but cannot recover the singlet Bell law. A successful $\mathbb{A}\mathbb{A}\mathbb{A}$ Bell packet must locate nonseparability in the derived joint response kernel, in a non-restartable pair-provenance compression, or in another explicitly stated structure that is not equivalent to the product form above, while still preserving measurement independence and no-signaling.

The no-go is quantitative in the natural per-cell residual. If a candidate table is within $\Delta_{\mathrm{prod}}$ of a product-screened table for each outcome-setting cell, then each correlator differs by at most $4\Delta_{\mathrm{prod}}$, and the CHSH expression obeys

$$
|S|\le 2+16\Delta_{\mathrm{prod}}.
$$

At the CHSH-optimal singlet settings, a completed table within $\Delta_{\mathrm{joint}}^{\mathrm{sing}}$ of the singlet joint law must therefore satisfy

$$
\Delta_{\mathrm{prod}}
+
\Delta_{\mathrm{joint}}^{\mathrm{sing}}
\ge
\frac{2\sqrt2-2}{16}
=
\frac{\sqrt2-1}{8}.
$$

Thus exact singlet recovery requires

$$
\Delta_{\mathrm{prod}}
\ge
\frac{\sqrt2-1}{8}
\approx
0.0518
$$

in this residual normalization. Driving the product-screening residual to zero and driving the singlet residual to zero are mutually incompatible closure targets.

The candidate $\mathbb{A}\mathbb{A}\mathbb{A}$ route lies in the finite-time measurement interaction of a full Noether-core ledger rather than in a preassigned spin label. The ingredients to derive are:

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
T
\right),
$$

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
\sum_{a,b=\pm1}K_{ab}^{\theta}=1.
$$

The record law is

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
\right).
$$

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
\right|.
$$

If this residual is small, normalization, unbiased one-wing marginals, and the correlation

$$
E_\theta(\hat{\mathbf m}_A,\hat{\mathbf m}_B)
=
\sum_{a,b=\pm1}ab\,P_{\theta}(a,b|\hat{\mathbf m}_A,\hat{\mathbf m}_B)
=
-\hat{\mathbf m}_A\cdot\hat{\mathbf m}_B
$$

follow as consequences. The local Stern-Gerlach kernels are deterministic basin indicators derived from the architrino-level angular-momentum and measurement-response dynamics, not ready-made spin-projection rules. The remaining Bell-level task is to derive the preparation and pair-provenance measures that make those local kernels reproduce the joint law while preserving no-signaling and measurement independence and while failing the product-screened local reconstruction above.

**Status:** This derivation is a **target**, not a completed result. The immediate prerequisite is the angular-momentum and spin program: derive how total angular momentum is conserved and redistributed in a changing-frequency Noether core, use the Master-Equation apparatus impulse and record-cycle invariant measure to realize $K_{\pm}^{\text{SG}}$, and then derive the pair-provenance measure for correlated cores. The single-core half-angle basin arithmetic and the external apparatus-term origins are now available in the reduced Stern-Gerlach chart, but this is not yet a Bell-pair correlation proof.

---

## Comparison with Other Hidden-Variable Frameworks

### de Broglie–Bohm (Pilot-Wave) Theory

This is the closest structural relative in the inherited taxonomy. Both $\mathbb{A}\mathbb{A}\mathbb{A}$ and Bohmian mechanics are deterministic and realistic; any successful $\mathbb{A}\mathbb{A}\mathbb{A}$ Bell account will also be nonlocal in Bell's technical sense. Key differences:

| Feature | de Broglie–Bohm | $\mathbb{A}\mathbb{A}\mathbb{A}$ |
|:---|:---|:---|
| Hidden variables | Particle positions in 3D | Full microstate $\Gamma(t)$ (positions, velocities, charges) in 3D |
| Guidance mechanism | Pilot wave $\psi$ on configuration space $\mathbb{R}^{3N}$ | Superposed causal-wake geometry in physical 3D space |
| Ontological economy | Two ontological categories (particles + wave) | One category (architrinos); wake structure is generated by architrinos |
| Nonlocality mechanism | $\psi$ on configuration space couples all particles | To be derived from pair provenance plus measurement-response ledger |
| Spacetime | Minkowski (standard) or absolute time (non-relativistic) | Euclidean void + absolute time (fundamental) |
| Memory | Markovian (given $\psi$) | Non-Markovian (self-hit, path-history dependence) |

In Bohmian mechanics, the pilot wave on $\mathbb{R}^{3N}$ provides nonlocal guidance: the full configuration helps determine the velocity field. In $\mathbb{A}\mathbb{A}\mathbb{A}$, it is premature to say that the entire Bell burden resides only in initial conditions. A pure initial-condition account that compresses into independent local response functions would fall back into the class excluded by Bell. The open task is to determine how the full angular-momentum ledger, pair provenance, and local measurement coupling appear when translated into Bell's variables.

### Superdeterminism

Superdeterministic models deny measurement independence: the detector settings and the hidden variables share a common cause in the remote past, eliminating genuine free choice. $\mathbb{A}\mathbb{A}\mathbb{A}$ explicitly rejects this route. The creation event that sets $\lambda$ is causally disconnected from the apparatus settings (which can be determined by distant quasars or quantum random-number generators). Measurement independence is a structural feature of the theory, not an approximation.

### Retrocausal Models

Retrocausal interpretations allow influences from future measurement settings to propagate backward in time to the source, effectively setting $\lambda$ in response to $\hat{m}_A$ and $\hat{m}_B$. $\mathbb{A}\mathbb{A}\mathbb{A}$'s absolute-time ontology categorically forbids backward-in-$t$ causation. All causal influences propagate forward in absolute time at or below $c_f$. The correlations in $\lambda$ are forward-causal consequences of the creation event, established before any measurement setting is chosen.

Temporal-nonlocality language is therefore a comparison diagnostic, not a mechanism to import. In a relativistic observer description, different frames may assign different time orderings to spacelike-separated measurement records; that does not license future-boundary variables in the substrate ledger. A candidate Bell record should evaluate pair provenance, $\Delta_{\mathrm{MI}}$, $\Delta_{\mathrm{NS}}^{A}$, $\Delta_{\mathrm{NS}}^{B}$, and $\Delta_{\mathrm{Bell}}$ on the absolute-time record. If the correlation fit requires $\lambda$ to depend on later settings, the record has left the stated $\mathbb{A}\mathbb{A}\mathbb{A}$ route and should be classified with retrocausal or measurement-independence-denying comparison models.

---

## The Role of Absolute Time

The existence of a global time parameter $t$ is essential for the internal consistency of the $\mathbb{A}\mathbb{A}\mathbb{A}$ account of Bell violations.

**Problem in relativistic frameworks.** In Minkowski spacetime, spacelike-separated measurements have no invariant temporal ordering. Telling a story about "what happens first" requires selecting a frame, and different frames give different orderings. This makes it conceptually difficult to describe how pre-established correlations are "read out" without invoking some form of action at a distance.

**Resolution via absolute time.** In $\mathbb{A}\mathbb{A}\mathbb{A}$, the temporal ordering of all events is objective. Measurements at $A$ and $B$ occur at definite absolute times $t_A$ and $t_B$, with $t_A < t_B$, $t_A = t_B$, or $t_A > t_B$ as an objective fact. In all three cases the account is the same:

1. At $t_0 < \min(t_A, t_B)$: the creation event establishes $\lambda$.
2. At each measurement time: the local apparatus drives the local assembly across a basin boundary. The one-wing basin crossing is local, but the validated observer-level law is the pushed-forward nonseparable pair-provenance response kernel, not a restartable product of two independent local hidden-variable packages.
3. After both measurements: comparison of results (via sub-$c_f$ classical communication) reveals the correlations.

No step may involve faster-than-$c_f$ signal transfer. The correlations are visible only upon comparison. The objective temporal ordering removes one frame-dependence puzzle, but it does not by itself solve Bell's theorem. The missing work is the lower-level derivation of the spin ledger and measurement-response kernel.

**Emergent Lorentz invariance.** Physical Observers, who lack access to absolute time and use assembly-based clocks and rulers, reconstruct an effective Minkowski geometry in which the temporal ordering of spacelike-separated events is frame-dependent. This does not contradict the underlying absolute ordering; it reflects the epistemic limitations of assembly-based measurement; see [Observer Framework](../spacetime/observer-framework.md).

---

## Observables, Falsifiability, and Failure Modes

**Closure target:** $\mathbb{A}\mathbb{A}\mathbb{A}$ must reproduce all experimentally observed Bell-family correlation constraints from architrino-level angular-momentum and measurement-response dynamics, without superluminal signaling or denial of measurement independence.

**Assumptions:**
- The full microstate $\Gamma(t)$ is definite at all $t$ (realism).
- Conservation constraints at creation establish a joint pair ledger, but the detailed angular-momentum distribution must be derived.
- Measurement is local threshold resolution (no distant causal input at measurement time).
- Measurement independence holds (no superdeterminism, no retrocausation).
- The measurement-response kernel of a Noether-core assembly interacting with an apparatus is a deterministic basin indicator, not a primitive $\cos^2(\alpha/2)$ rule. The single-core half-angle law is now computed in the reduced Stern-Gerlach chart; the Master-Equation burden is to derive the effective spinor coordinate and verify that the branch-sum apparatus impulse and record-cycle invariant measure realize that chart.

**Required recoveries:**
- All standard Bell-CHSH violations are reproduced: $|S| = 2\sqrt{2}$ for singlet pairs with optimal settings.
- No violation of the Tsirelson bound: $|S| \leq 2\sqrt{2}$. Observing $|S| > 2\sqrt{2}$ would falsify both QM and any $\mathbb{A}\mathbb{A}\mathbb{A}$ model that reproduces QM.
- GHZ product-sign contexts are recovered without assigning one context-independent local value table across all $X/Y$ settings.
- Hardy's zero-probability constraints and positive event margin are recovered for the calibrated nonmaximally entangled regime.
- No-signaling is exact: no measurement protocol on $A$ can alter the marginal statistics at $B$.
- Measurement-independence leakage is explicitly bounded by $\Delta_{\mathrm{MI}}\le\epsilon_{\mathrm{MI}}$ rather than absorbed into the pair-provenance explanation.
- Correlation recovery is checked through $\Delta_{\mathrm{Bell}}$ against the full $-\cos\theta$ curve, not only by a single CHSH setting choice.
- Decoherence rates for entangled pairs depend on local Noether-Sea density, providing an environmental sensitivity absent in bare QM (shared prediction with [Entanglement and Nonlocality](./entanglement-nonlocality.md)).

**Failure Modes:**
- If the Master Equation dynamics for a tri-binary measurement interaction yield a response function that is **not** $\cos^2(\alpha/2)$—for instance, a linear or piecewise-linear function—the resulting $E(\theta_{AB})$ will disagree with the quantum prediction and with experiment. This is a falsification of the specific mechanism, requiring revision of the measurement model or the assembly-apparatus coupling.
- If simulations of correlated pair creation under the Master Equation produce a hidden-variable distribution $\rho(\lambda)$ that is **separable** (factorizes into independent local distributions), the theory reduces to a local hidden-variable model and cannot violate the CHSH bound. This would be a fundamental failure requiring revision of the creation-event dynamics or the conservation-law implementation.
- If the retained pair-provenance ledger and apparatus kernels reduce to the product-screened form $\int_{\Pi}\prod_iK_i\,d\rho_{\mathrm{prov}}$, then the model has explicit common-past data but still remains Bell-local. This is a failure even when no-signaling and measurement independence pass.
- If $\Delta_{\mathrm{MI}}$ is nonzero in a way that is necessary for the correlation fit, the model has abandoned the stated $\mathbb{A}\mathbb{A}\mathbb{A}$ Bell route and must be reclassified before any corpus claim is promoted.
- If any experiment demonstrates genuine **signaling** via entanglement (information transfer at $B$ contingent on the setting choice at $A$, without a classical channel), the entire framework fails.
- If measurement independence is empirically falsified (e.g., via cosmic Bell tests showing setting–source correlations at a level incompatible with statistical noise), the assumption structure changes for all interpretations, not only $\mathbb{A}\mathbb{A}\mathbb{A}$.

The Bell claim therefore stops at the closure target and failure conditions. A completed account requires lower-level angular-momentum, Stern-Gerlach response, source-measure, and pair-provenance derivations before this chapter can report success or failure.
