# Photon, Measurement, and Bell Gate Packet

This proof packet sharpens the downstream side of [Photon, Measurement, and Bell Gates](photon-measurement-bell-gates.md). It does not edit $\mathbb{A}\mathbb{A}\mathbb{A}$ prose. Its role is to turn the current Gate B, measurement-response, pair-provenance, and Bell scaffolds into explicit pass/fail gates.

## Status Convention

Fix tolerances
$$
\varepsilon_{\perp},\varepsilon_A,\varepsilon_{\text{basin}},
\varepsilon_{\text{pol}},\varepsilon_{\text{SG}},
\varepsilon_{\text{prov}},\varepsilon_{\text{MI}},
\varepsilon_{\text{NS}},\varepsilon_{\text{Bell}}>0.
$$

A gate is `pass` only when the named residuals are below tolerance and all input dependencies are available. A gate is `fail` when a residual exceeds tolerance or when a candidate route violates a declared exclusion, such as creating a free longitudinal photon mode or using setting-dependent pair provenance. A gate is `blocked` when its residual can be written but the lower angular-momentum, spinor, material-analyzer, or pair-provenance object needed to evaluate it is not yet derived.

## Gate B Input Contract

Gate B may consume only a Gate A-admissible photon branch:
$$
\mathcal{G}_A
=
\left(
\hat{\mathbf e},
c_\gamma,
\omega,
d(\omega,\delta_\gamma),
\phi_{\text{geom}},
E_\gamma^2-\|\mathbf p_\gamma\|^2c_\gamma^2=0,
\Delta_{\text{disp}},
\Delta_{\text{leak}}
\right).
$$

The branch is eligible for Gate B only if
$$
\Delta_A
=
|\Delta_{\text{disp}}|+|\Delta_{\text{leak}}|
+\mathbf{1}_{\text{rest branch}}
+\mathbf{1}_{\text{rest proper-time clock}}
\le \varepsilon_A.
$$

If $\Delta_A > \varepsilon_A$, the candidate fails Gate A and must not be repaired by a polarization or measurement rule.

## Transverse Projector Support Gate

With spatial metric $h^{ab}$ and Gate A propagation axis $\hat e^a$, define
$$
P_{\perp}^{ab}=h^{ab}-\hat e^a\hat e^b,
\qquad
P_{\parallel}^{ab}=\hat e^a\hat e^b.
$$

For an incoming coaxial contra-rotating polarity-conjugate planar-pair ledger $a^a$, the accepted free-photon ledger is
$$
a_{\perp}^a=P_{\perp}^{a}{}_{b}a^b,
\qquad
\mathcal I_{\perp}
=
h_{ab}\overline{a_{\perp}^a}a_{\perp}^b.
$$

The projector algebra residual is
$$
\Delta_{P}
=
\|P_{\perp}^{2}-P_{\perp}\|
+\|P_{\perp}^{\dagger}-P_{\perp}\|
+|\operatorname{tr}P_{\perp}-2|
+\|P_{\perp}P_{\parallel}\|.
$$

The longitudinal-support residual is
$$
\Delta_{\parallel}
=
\frac{
h_{ab}\overline{(P_{\parallel}a)^a}(P_{\parallel}a)^b
}{
h_{ab}\overline{a^a}a^b
}
$$
when the denominator is nonzero.

Pass criteria:

- $\Delta_P\le\varepsilon_{\perp}$.
- $\Delta_{\parallel}\le\varepsilon_{\perp}$ for every free Gate A photon branch.
- The helicity basis
  $$
  \boldsymbol{\epsilon}_{\pm}
  =
  \frac{1}{\sqrt{2}}
  \left(\hat{\mathbf u}\pm i\hat{\mathbf v}\right)
  $$
  satisfies
  $$
  P_{\perp}\boldsymbol{\epsilon}_{\pm}=\boldsymbol{\epsilon}_{\pm},
  \qquad
  J_{\gamma,\parallel}=\lambda_{\text{hel}}\hbar,
  \qquad
  \lambda_{\text{hel}}\in\{+1,-1\}.
  $$

Fail criteria:

- A nonzero free longitudinal branch survives with $\Delta_{\parallel}>\varepsilon_{\perp}$.
- The candidate needs a third free photon polarization.
- A longitudinal or mixed-axis response is not reclassified as a massive $W/Z$-like corridor, material recoupling, gauge redundancy, or Gate A failure mode.

Blocked dependency: deriving $a^a$, the conserved photon-side angular-momentum ledger, and $J_{\gamma,\parallel}$ from the coaxial contra-rotating polarity-conjugate planar pair still depends on the lower fundamental angular-momentum ledger.

## Analyzer Projector And Pass-Basin Gate

For an analyzer axis $\hat{\mathbf a}=P_{\perp}\hat{\mathbf a}$, the accepted material channel must be
$$
\mathcal{C}_{\text{pass}}(\hat{\mathbf a})
=
\{\xi\,\hat a^a:\xi\in\mathbb{C}\}
\subset\operatorname{im}P_{\perp}.
$$

The rank-one projector and rejected complement are
$$
A^a{}_{b}=\hat a^a\hat a_b,
\qquad
R^a{}_{b}=P_{\perp}^{a}{}_{b}-A^a{}_{b}.
$$

The analyzer-projector residual is
$$
\Delta_A^{\text{proj}}
=
\|A^2-A\|
+\|A^\dagger-A\|
+|\operatorname{tr}_{\perp}A-1|
+\|AP_{\perp}-A\|
+\|RP_{\perp}-R\|.
$$

The native accepted positive-action fraction is
$$
\mu_{\text{pass}}(\hat{\mathbf a}\mid a_\perp)
=
\frac{
\overline{a_\perp^a}\,\hat a_a\hat a_b\,a_\perp^b
}{
\mathcal I_{\perp}
},
\qquad
\mu_{\text{rej}}
=
\frac{\overline{a_\perp^a}R_{ab}a_\perp^b}{\mathcal I_{\perp}}.
$$

The pass/reject arithmetic must satisfy
$$
\left|\mu_{\text{pass}}+\mu_{\text{rej}}-1\right|
\le \varepsilon_A.
$$

For linear input $a_\perp^a=\hat e_\gamma^a$, Gate B expects
$$
\Delta_{\text{Malus}}(\theta)
=
\left|
\mu_{\text{pass}}-\cos^2\theta
\right|
\le\varepsilon_A.
$$

For circular helicity input $\boldsymbol{\epsilon}_{\pm}$, Gate B expects
$$
\left|
\mu_{\text{pass}}(\hat{\mathbf a}\mid\boldsymbol{\epsilon}_{\pm})
-\frac12
\right|
\le\varepsilon_A
$$
for every linear analyzer axis.

The material-basin version of the same gate uses the record-window quotient
$$
\Theta_{\hat{\mathbf a}}
=
\mathcal{P}_{\hat{\mathbf a}}/\!\sim_{\hat{\mathbf a}},
$$
the material return map $T_s:\Theta_{\hat{\mathbf a}}\to\Theta_{\hat{\mathbf a}}$, and the invariant analyzer measure
$$
\nu_{\hat{\mathbf a}}(\Theta_{\hat{\mathbf a}})=1,
\qquad
T_{s*}d\nu_{\hat{\mathbf a}}=d\nu_{\hat{\mathbf a}}.
$$

For the pass-basin filtration $\mathcal{B}_{\text{pass}}(\rho;\hat{\mathbf a})$, require monotonicity
$$
\rho_1\le\rho_2
\Longrightarrow
\mathcal{B}_{\text{pass}}(\rho_1;\hat{\mathbf a})
\subseteq
\mathcal{B}_{\text{pass}}(\rho_2;\hat{\mathbf a})
$$
up to a null separatrix set, and define
$$
\eta_{\hat{\mathbf a}}(\zeta)
=
\inf\left\{
\rho\in[0,1]:
\zeta\in\mathcal{B}_{\text{pass}}(\rho;\hat{\mathbf a})
\right\}.
$$

The deterministic pass kernel is
$$
K_{\text{pass}}(\hat{\mathbf a};a_\perp,\zeta)
=
G_{\text{mat}}
H\!\left(
\mu_{\text{pass}}(\hat{\mathbf a}\mid a_\perp)
-\eta_{\hat{\mathbf a}}(\zeta)
\right),
$$
with $H(0)=0$.

The basin residual is
$$
\Delta_{\text{basin}}^{\gamma}
=
\sup_{\rho\in[0,1]}
\left|
\nu_{\hat{\mathbf a}}\!\left(
\mathcal{B}_{\text{pass}}(\rho;\hat{\mathbf a})
\right)
-\rho
\right|
+
\sup_{\rho_1\le\rho_2}
\nu_{\hat{\mathbf a}}\!\left(
\mathcal{B}_{\text{pass}}(\rho_1;\hat{\mathbf a})
\setminus
\mathcal{B}_{\text{pass}}(\rho_2;\hat{\mathbf a})
\right)
+
\nu_{\hat{\mathbf a}}(\Sigma_{\text{pass}}).
$$

Pass criteria:

- $\Delta_A^{\text{proj}}\le\varepsilon_A$.
- $\Delta_{\text{basin}}^\gamma\le\varepsilon_{\text{basin}}$.
- For successful material records,
  $$
  \int_{\Theta_{\hat{\mathbf a}}}
  K_{\text{pass}}(\hat{\mathbf a};a_\perp,\zeta)
  d\nu_{\hat{\mathbf a}}(\zeta)
  =
  \mu_{\text{pass}}(\hat{\mathbf a}\mid a_\perp)
  +O(\varepsilon_{\text{basin}}).
  $$
- The rejected transverse component
  $$
  a_{\text{rej}}^a=R^a{}_{b}a_\perp^b
  $$
  routes into reflection, absorption, scattering, heat, or another material ledger update, with no free longitudinal photon identity.

Fail criteria:

- The pass kernel assumes $\cos^2\theta$ rather than deriving it as the basin integral above.
- $A$ is rank zero or rank two while claiming to be a nontrivial ideal linear analyzer.
- Rejected action is not accounted for in energy, momentum, angular momentum, material-record, wake, and Noether sea recoil ledgers.

## Detector-Bias Diagnostic

The ideal analyzer requires
$$
(\eta_{\hat{\mathbf a}})_*d\nu_{\hat{\mathbf a}}=d\eta.
$$

When this is not exact, record
$$
P_{\text{pass}}(\rho)
=
\nu_{\hat{\mathbf a}}
\left(
\{\zeta:\eta_{\hat{\mathbf a}}(\zeta)<\rho\}
\right)
$$
and
$$
\Delta_{\text{pol}}(\rho)
=
P_{\text{pass}}(\rho)-\rho.
$$

The calibration residual is
$$
\|\Delta_{\text{pol}}\|_{\infty}
=
\sup_{\rho\in[0,1]}|\Delta_{\text{pol}}(\rho)|.
$$

Pass criteria:

- $\|\Delta_{\text{pol}}\|_{\infty}\le\varepsilon_{\text{pol}}$ for a claimed ideal analyzer.
- If $\|\Delta_{\text{pol}}\|_{\infty} > \varepsilon_{\text{pol}}$, the model reports a detector-bias or calibration failure and does not alter the photon polarization rule.

## Stern-Gerlach-Like Basin-Measure Handoff

The Stern-Gerlach-like handoff is a single-core measurement-response packet, not a Bell proof. The input state for setting $\hat{\mathbf m}$ is
$$
Z_{\hat{\mathbf m}}(t)
=
\left(
\mathcal{J}_{\text{core}}(t),
A_{\hat{\mathbf m}}(t),
\mathcal{W}_{\text{loc}}(t)
\right),
$$
where $\mathcal{J}_{\text{core}}$ retains the layer normals, phases, frequencies, radian-normalized action variables, causal-root ledgers, core wake angular momentum, and self-hit history.

The exact response kernels are basin pullbacks:
$$
K_{\pm}(\hat{\mathbf m};Z_{\hat{\mathbf m}}(t_{\text{in}}))
=
\mathbf{1}\!\left[
\Phi^{\hat{\mathbf m}}_{T_{\text{int}}}
\left(Z_{\hat{\mathbf m}}(t_{\text{in}})\right)
\in B_{\pm}(\hat{\mathbf m})
\right].
$$

The first-order signed response functional is
$$
\mathcal{Q}_{\hat{\mathbf m}}(Z_{\text{in}})
=
e^{\Lambda_{\hat{\mathbf m}}(t_{\text{in}},t_{\text{out}})}
\Sigma_{\hat{\mathbf m}}(Z_{\text{in}})
+
\int_{t_{\text{in}}}^{t_{\text{out}}}
e^{\Lambda_{\hat{\mathbf m}}(s,t_{\text{out}})}
\mathcal{N}_{\hat{\mathbf m}}(Z(s),s)\cdot
\dot{\mathbf{J}}_{C}^{\text{app}}(s)\,ds.
$$

The apparatus angular impulse must be computed from delayed apparatus cross-root hits:
$$
\dot{\mathbf{J}}_{C}^{\text{app}}(t;\hat{\mathbf m})
=
\mu_{\text{arch}}
\sum_{i\in C}
\left(\mathbf{x}_i(t)-\mathbf{X}_{C}(t)\right)
\times
\mathbf a_i^{\text{app}}(t;\hat{\mathbf m})
+
\dot{\mathbf L}_{\text{wake},C\leftrightarrow A}(t).
$$

The record-gated reduced kernels are
$$
K_{+}^{\text{SG}}
=
G_{\text{rec}}H\!\left(\mathcal{Q}_{\hat{\mathbf m}}\right),
\qquad
K_{-}^{\text{SG}}
=
G_{\text{rec}}H\!\left(-\mathcal{Q}_{\hat{\mathbf m}}\right).
$$

For a successful two-channel apparatus, the partition residual is
$$
\Delta_{\text{part}}^{\text{SG}}
=
\int
\left|
K_{+}^{\text{SG}}+K_{-}^{\text{SG}}-G_{\text{rec}}
\right|
d\mu_*
+
\mu_*(\Sigma_{\hat{\mathbf m}}).
$$

The reduced spinor-record chart, when supplied by spinor closure, is
$$
p_{+}(Z;\hat{\mathbf m})
=
\psi^\dagger(Z)\Pi_{+}(\hat{\mathbf m})\psi(Z),
\qquad
\Pi_{\pm}(\hat{\mathbf m})
=
\frac12\left(\mathbf 1\pm\hat{\mathbf m}\cdot\boldsymbol{\sigma}\right).
$$

The reduced separatrix and normal are
$$
\Sigma_{\hat{\mathbf m}}^{\text{SG,red}}(Z,\theta_{\text{rec}})
=
p_{+}(Z;\hat{\mathbf m})
-
\frac{\theta_{\text{rec}}}{2\pi},
$$
and
$$
\mathcal{N}_{\hat{\mathbf m}}^{\text{SG,red}}
=
d p_{+}
-
\frac{1}{2\pi}d\theta_{\text{rec}}.
$$

The record-cycle measure is
$$
d\nu_{\text{rec}}
=
\rho_{\text{rec}}(\theta_{\text{rec}})\,d\theta_{\text{rec}},
\qquad
\frac{d}{d\theta_{\text{rec}}}
\left(
\Omega_{\text{rec}}\rho_{\text{rec}}
\right)=0.
$$

The ideal uniform limit is $d\nu_{\text{rec}}=d\theta_{\text{rec}}/(2\pi)$. For preparation angle $\alpha$, the single-core response residual is
$$
\Delta_{\text{SG}}(\alpha)
=
\left|
\int K_{+}^{\text{SG,red}}\,d\mu_{\alpha}\,d\nu_{\text{rec}}
-
\cos^2\!\left(\frac{\alpha}{2}\right)
\right|
+
\left|
\int K_{-}^{\text{SG,red}}\,d\mu_{\alpha}\,d\nu_{\text{rec}}
-
\sin^2\!\left(\frac{\alpha}{2}\right)
\right|.
$$

Pass criteria:

- $\Delta_{\text{part}}^{\text{SG}}\le\varepsilon_{\text{SG}}$.
- $\sup_{\alpha}\Delta_{\text{SG}}(\alpha)\le\varepsilon_{\text{SG}}$ once the reduced spinor coordinate and preparation measures are available.
- The angular-momentum ledger closes:
  $$
  \Delta \mathbf{J}_{C}
  +
  \Delta \mathbf{J}_{A}
  +
  \Delta \mathbf{L}_{\text{wake},C\leftrightarrow A}
  +
  \Delta \mathbf{J}_{\text{sea}}
  =
  \mathbf{0}
  +O(\varepsilon_{\text{SG}}).
  $$

Blocked dependency: the exact kernels and branch-sum impulse are ready as gate formulas, but evaluating $\psi$, $\mu_\alpha$, and the reduction to $\Sigma_{\hat{\mathbf m}}^{\text{SG,red}}$ is blocked by ordered-core spinor closure and a concrete apparatus simulation.

## Pair-Provenance Variables

The Bell handoff must start from a provenance ledger, not from a preassigned opposite classical axis. For a two-wing event, use
$$
\lambda_{\text{prov}}
=
\left(
\Gamma_{\text{parent}}(t_0^-),
\Gamma_A(t_0^+),
\Gamma_B(t_0^+),
\mathcal{L}_{E\mathbf p\mathbf J}^{0},
\mathcal{W}_{AB}^{0},
\mathcal{R}_{AB}^{0},
\Xi_{\text{src}}
\right).
$$

Here $\mathcal{L}_{E\mathbf p\mathbf J}^{0}$ is the creation-event conservation ledger, $\mathcal{W}_{AB}^{0}$ is the retained pair causal-wake history, $\mathcal{R}_{AB}^{0}$ is the source-side root and branch record, and $\Xi_{\text{src}}$ collects unresolved source variables that are not detector settings.

The creation residual is
$$
\Delta_{\text{prov}}
=
|\Delta E_{AB}^{0}|
+\|\Delta\mathbf p_{AB}^{0}\|
+\|\Delta\mathbf J_{AB}^{0}\|
+|\Delta Q_{\text{polarity}}^{0}|
+\|\Delta\mathcal{W}_{AB}^{0}\|.
$$

Pass criteria:

- $\Delta_{\text{prov}}\le\varepsilon_{\text{prov}}$.
- $\lambda_{\text{prov}}$ contains enough information to compute the two local incoming ledgers at the detector entrances after propagation.
- Detector settings $\alpha,\beta$ or $\hat{\mathbf m}_A,\hat{\mathbf m}_B$ are excluded from $\lambda_{\text{prov}}$ except through ordinary later local apparatus states.

Measurement independence is checked by
$$
\Delta_{\mathrm{MI}}^{\mathrm{prov}}
=
\sup_{\alpha,\beta}
D_{\mathrm{TV}}\!\left(
\rho_{\mathrm{prov}}(\lambda_{\text{prov}}\mid\alpha,\beta),
\rho_{\mathrm{prov}}(\lambda_{\text{prov}})
\right).
$$

Pass requires $\Delta_{\mathrm{MI}}^{\mathrm{prov}}\le\varepsilon_{\text{MI}}$. If a correlation fit requires $\Delta_{\mathrm{MI}}^{\mathrm{prov}}>\varepsilon_{\text{MI}}$, the model has left the intended pair-provenance route.

## Two-Wing No-Signaling And Product-Screening Gate

For outcomes $a,b\in\{\pm1\}$, the joint record law must be derived from the pair provenance and the two local apparatus record channels:
$$
P(a,b\mid\alpha,\beta)
=
\int
K_{ab}^{AB}
\left(
\alpha,\beta;
\lambda_{\text{prov}},\zeta_A,\zeta_B
\right)
d\nu_{A,\alpha}(\zeta_A)
d\nu_{B,\beta}(\zeta_B)
d\rho_{\text{prov}}(\lambda_{\text{prov}}).
$$

Here $d\nu_{A,\alpha}$ and $d\nu_{B,\beta}$ must be local apparatus or analyzer measures derived from their record-window return maps. They are allowed to depend on the local setting and apparatus calibration, but not on the distant setting before causal-wake contact.

The no-signaling residuals are
$$
\Delta_{\mathrm{NS}}^{A}
=
\sup_{\alpha,\beta,\beta'}
\sum_{a=\pm}
\left|
\sum_{b=\pm}P(a,b\mid\alpha,\beta)
-
\sum_{b=\pm}P(a,b\mid\alpha,\beta')
\right|,
$$
and
$$
\Delta_{\mathrm{NS}}^{B}
=
\sup_{\beta,\alpha,\alpha'}
\sum_{b=\pm}
\left|
\sum_{a=\pm}P(a,b\mid\alpha,\beta)
-
\sum_{a=\pm}P(a,b\mid\alpha',\beta)
\right|.
$$

Pass requires
$$
\Delta_{\mathrm{NS}}^{A}\le\varepsilon_{\text{NS}},
\qquad
\Delta_{\mathrm{NS}}^{B}\le\varepsilon_{\text{NS}}.
$$

The product-screening collapse diagnostic is
$$
\Delta_{\mathrm{prod}}
=
\inf_{\bar\lambda,\bar\rho}
\sup_{\alpha,\beta}
\sum_{a,b=\pm}
\left|
P(a,b\mid\alpha,\beta)
-
\int
P_A(a\mid\alpha,\bar\lambda)
P_B(b\mid\beta,\bar\lambda)
d\bar\rho(\bar\lambda)
\right|.
$$

For any model claiming Bell-violating correlations, the product-screening gate fails if $\Delta_{\mathrm{prod}}\le\varepsilon_{\text{Bell}}$. A shared past ledger is therefore not sufficient. The retained pair-provenance and apparatus-response compression must avoid Bell-local product screening while preserving no-signaling and measurement independence.

## Bell Correlation Handoff

The two correlation targets are distinct.

For photon-polarization tests, define
$$
E_{\gamma}(\alpha,\beta)
=
\sum_{a,b=\pm}ab\,P_{\gamma}(a,b\mid\alpha,\beta).
$$

The Gate B photon handoff residual is
$$
\Delta_{\text{Bell}}^{\gamma}
=
\inf_{\sigma_{\gamma}\in\{-1,+1\}}
\sup_{\alpha,\beta}
\left|
E_{\gamma}(\alpha,\beta)
-
\sigma_{\gamma}\cos 2(\alpha-\beta)
\right|.
$$

For spin-$\tfrac12$ Stern-Gerlach singlet tests, define
$$
E_{\text{SG}}(\hat{\mathbf m}_A,\hat{\mathbf m}_B)
=
\sum_{a,b=\pm}ab\,P_{\text{SG}}(a,b\mid\hat{\mathbf m}_A,\hat{\mathbf m}_B),
$$
and
$$
\Delta_{\text{Bell}}^{\text{SG}}
=
\sup_{\theta\in[0,\pi]}
\left|
E_{\text{SG}}(\theta)+\cos\theta
\right|.
$$

For either target, the CHSH value
$$
S
=
E(x,y)+E(x,y')+E(x',y)-E(x',y')
$$
must be reported on standard maximizing settings. The success condition is not merely $|S| > 2$; the full handoff requires
$$
\Delta_{\mathrm{MI}}^{\mathrm{prov}}\le\varepsilon_{\text{MI}},
\qquad
\Delta_{\mathrm{NS}}^{A},\Delta_{\mathrm{NS}}^{B}\le\varepsilon_{\text{NS}},
\qquad
\Delta_{\text{Bell}}^{\gamma}\le\varepsilon_{\text{Bell}}
\quad\text{or}\quad
\Delta_{\text{Bell}}^{\text{SG}}\le\varepsilon_{\text{Bell}},
$$
and
$$
|S|\le 2\sqrt2+\varepsilon_{\text{Bell}}.
$$

The naive opposite-axis model is an explicit failure channel:
$$
E_{\text{axis}}(\theta)
=
-1+\frac{2\theta}{\pi}.
$$

If a candidate pair-provenance route reduces to this curve or to any product-screened local-axis variant, it fails the Bell handoff even if it conserves total angular momentum at creation.

## Ready Versus Blocked

| Artifact | Gate status | Reason |
| --- | --- | --- |
| Transverse projector algebra $P_{\perp}^{ab}=h^{ab}-\hat e^a\hat e^b$ | ready as pass/fail residual | Algebraic support and longitudinal exclusion can be checked once Gate A supplies $\hat{\mathbf e}$ and a candidate ledger $a^a$. |
| Analyzer rank-one projector $A^a{}_{b}=\hat a^a\hat a_b$ | ready as pass/fail residual | Projector, complement, and accepted positive-action fraction are explicit. |
| Analyzer pass basin $\mathcal{B}_{\text{pass}}(\rho;\hat{\mathbf a})$ | ready as a theorem target, blocked for numerical pass | Needs concrete analyzer assembly dynamics to compute $\mathcal{P}_{\hat{\mathbf a}}$, $T_s$, $d\nu_{\hat{\mathbf a}}$, and $\eta_{\hat{\mathbf a}}$. |
| Detector-bias diagnostic $\Delta_{\text{pol}}(\rho)$ | ready | It is a calibration residual, not a photon-law modification. |
| Stern-Gerlach exact kernels $K_{\pm}^{\text{SG}}$ | ready as formal basin pullbacks | Evaluation needs a concrete apparatus branch-sum impulse. |
| Reduced Stern-Gerlach half-angle chart | blocked by spinor closure | The basin arithmetic is explicit, but $\psi$, $\mu_\alpha$, and the validity of $\Sigma_{\hat{\mathbf m}}^{\text{SG,red}}$ depend on ordered-core spinor closure. |
| Pair-provenance variables $\lambda_{\text{prov}}$ | ready as required ledger fields | A worked source model still has to compute $d\rho_{\text{prov}}$ and the two detector-entrance ledgers. |
| No-signaling residuals | ready | They can be evaluated from any proposed joint record law. |
| Bell correlation handoff | blocked for proof, ready for falsification | The residuals are explicit; success is blocked until pair provenance, local apparatus kernels, and lower spinor/photon closure are computed. |

## Immediate Promotion Rule

Nothing in this packet should be promoted into $\mathbb{A}\mathbb{A}\mathbb{A}$ prose as a completed derivation until at least one worked case supplies:

1. a Gate A-admissible photon or spin-pair source branch;
2. a computed invariant or metastable unresolved-material measure;
3. a measurable basin partition with null separatrix;
4. local event-ledger closure for successful and rejected records;
5. no-signaling and measurement-independence residuals below tolerance;
6. a Bell correlation residual below tolerance without product-screening collapse.
