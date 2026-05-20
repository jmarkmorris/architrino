# AAA Corpus Change Recommendations 2026-05-20

Status. Priority recommendation packet for `angular-momentum-spin`. This file records corpus-change recommendations for `content/markdown/aaa` from the team-agent review. It does not edit reader-facing $\mathbb{A}\mathbb{A}\mathbb{A}$ prose.

Claim level. Editorial and derivation-closure recommendations. The recommended AAA changes should promote guarded theorem-target language, residual definitions, and blocker statements only. They should not promote any branch-selection, spinor-support, photon Gate B, Stern-Gerlach, Bell-correlation, or weak-handedness result as completed.

Promotion rule. If these recommendations are applied in `content/markdown/aaa`, restate the needed equations and assumptions in the target corpus documents. Do not link reader-facing corpus prose back to this priority packet.

## Summary Recommendation

The team-agent pass found enough aligned material for a low-risk AAA corpus edit batch. The best corpus change is not a new proof claim. It is a guarded residual layer that makes the current proof state visible in the reader-facing documents:

1. `angular-momentum-and-spin.md` should state the minimal four-substep branch as a conditional certificate, add the row-local causal-writhe spinor extractor, and add the gauge-control residual that blocks coordinate artifacts.
2. `electroweak-bosons.md`, `mode-taxonomy.md`, and `reaction-ledger.md` should expose photon Gate B substrate, helicity, and event-balance residuals while marking physical Gate B as blocked until source, recoil, wake, and handoff rows are populated.
3. `measurement-ontology.md`, `bell-theorem.md`, and `entanglement-nonlocality.md` should replace reduced or product-compressed statements with lifted apparatus, source-provenance, joint-record, and full singlet-joint-law targets.
4. `quantum-statistics.md`, `weak-mixing-ckm.md`, and `horizon-chirality.md` should inherit the same spinor/gauge-control blocker so exchange sign, weak exposure, and horizon chirality cannot consume an unproven spinor row.

The recommended claim level is `derivation-closure target` or `guardrail`, not `derived result`.

## Edit Batch A: Core Spinor And Branch-Selection Guardrails

Target: [angular-momentum-and-spin.md](../../../content/markdown/aaa/theory-bridges/angular-momentum-and-spin.md).

Recommendation A1. Revise the solved four-substep branch so it reads as a conditional certificate, not as branch uniqueness. The corpus can safely add the energy row

$$
\mathcal R_E^{B_{\min}}
=
\left(
\omega_\ast-\omega_{\text{tx}}
\right)\hbar,
\qquad
\omega_\ast
=
\frac{
\omega_O^\ast+\omega_M^\ast+2\omega_I^\ast
}{4}.
$$

The surrounding prose should say that scalar and vector rows pass only in the fixed-normal, no-retained-wake chart. Root replay, phase lock, torque consistency, tail-wake pullback, stability, and nonzero energy mismatch remain blocked unless a retained branch chart supplies those rows.

Recommendation A2. Add the comparator object as a blocker against treating the minimal branch as physical branch selection:

$$
\mathfrak K_{\min,\mathrm{wr}}
=
\left(
B_{\min}^-,
\Gamma_{\min},
W_{\min},
\mathfrak a_{\min},
\mathfrak a_{\mathrm{wr}},
\Theta_{\min,\mathrm{wr}},
\mathcal R_{\mathrm{cmp}},
\mathcal V_{\mathrm{cmp}}
\right).
$$

The edit should keep any claim of $\operatorname{Sel}_{B,N}=\mathfrak a_{\min}$ deferred until a concrete wake/recoil competitor $\mathfrak a_{\mathrm{wr}}$ exists with populated residuals and a quotient witness.

Recommendation A3. Add the row-local causal-writhe spinor-support extractor:

$$
\widetilde r(s)
=
\left(
t_{0,r}(s),
k_r(s),
\mathcal E_r(s),
\Xi_r(s),
\mathcal C_r(s)
\right),
\qquad
\Xi_r
=
\left(
\xi_{r,H},
\xi_{r,M},
\xi_{r,L}
\right).
$$

$$
\Pi_{W,r}^{2\pi}
=
W_r(1)-W_r(0)
\pmod 2,
\qquad
\Pi_{W,r}^{4\pi}
=
W_r(2)-W_r(0)
\pmod 2.
$$

The pass condition should be stated as a proof obligation:

$$
\Pi_{W,r_\star}^{2\pi}=1,
\qquad
\Pi_{W,r_\star}^{4\pi}=0,
\qquad
\Delta_{\Pi_W}(r_\star)\le\varepsilon_{\Pi_W}.
$$

The corpus should also say that no retained row in the present priority bucket has populated this condition.

Recommendation A4. Add the gauge-control residual:

$$
\Delta_{\mathrm{gc}}(r)
=
\Delta_{\mathrm{rig}}(r)
+
\Delta_{\mathrm{flip}}(r)
+
\Delta_{\mathrm{phys}}(r)
+
\Delta_{\mathrm{quot}}(r)
+
\Delta_{\mathrm{dbl}}(r)
+
\Delta_{\mathbf J}(r).
$$

The null rigid row should satisfy

$$
\Pi_{W,r,\mathrm{rig}}^{2\pi}=0,
\qquad
\Pi_{W,r,\mathrm{rig}}^{4\pi}=0,
$$

and any allowed gauge probe with

$$
\delta_g\Pi_{W,r}^{2\pi}=1
$$

should classify the proposed parity as a gauge artifact, not spinor support.

Decision. Promote-now as guarded theorem-target prose and residual definitions. Do not promote as a proof of spinor support.

## Edit Batch B: Photon Gate B Residuals

Targets: [electroweak-bosons.md](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md), [mode-taxonomy.md](../../../content/markdown/aaa/interactions/mode-taxonomy.md), and [reaction-ledger.md](../../../content/markdown/aaa/validation/reaction-ledger.md).

Recommendation B1. In `electroweak-bosons.md`, add the substrate-amplitude decomposition:

$$
\mathbf a_{\gamma}^{\mathrm{sub}}
=
\mathbf a_{\mathrm{pro}}
+
\mathbf a_{\mathrm{anti}}
+
\mathbf a_{\mathrm{wake}},
\qquad
\mathbf a_{\perp}^{\mathrm{sub}}
=
P_{\perp}
\mathbf a_{\gamma}^{\mathrm{sub}},
\qquad
\mathbf a_{\parallel}^{\mathrm{sub}}
=
P_{\parallel}
\mathbf a_{\gamma}^{\mathrm{sub}}.
$$

Then add charge-cancellation and longitudinal-support residuals:

$$
\Delta_Q^\gamma
=
\frac{
\left|
q_{\mathrm{pro}}^{\mathrm{eff}}
+
q_{\mathrm{anti}}^{\mathrm{eff}}
\right|
}{
\left|
q_{\mathrm{pro}}^{\mathrm{eff}}
\right|
+
\left|
q_{\mathrm{anti}}^{\mathrm{eff}}
\right|
+
\varepsilon_Q
},
\qquad
\Delta_{\parallel}^{\mathrm{sub}}
=
\frac{
\left\|
\mathbf a_{\parallel}^{\mathrm{sub}}
\right\|
}{
\left\|
\mathbf a_{\gamma}^{\mathrm{sub}}
\right\|
+
\varepsilon_{\mathrm{amp}}
}.
$$

The prose should say that a free photon branch requires small $\Delta_Q^\gamma$, nonzero transverse support, and small longitudinal support.

Recommendation B2. Add the helicity ledger and residual:

$$
\mathbf J_{\gamma}^{\mathrm{sub}}
=
\mathbf J_{\mathrm{pro}}
+
\mathbf J_{\mathrm{anti}}
+
\mathbf J_{\mathrm{wake}}
+
\mathbf J_{\mathrm{src,rem}}.
$$

$$
\Delta_{\mathrm{hel}}^\gamma
=
\left|
\frac{
\hat{\mathbf e}\cdot\mathbf J_{\gamma}^{\mathrm{sub}}
}{\hbar}
-
\lambda_{\mathrm{hel}}
\right|
+
\frac{
\left\|
P_{\perp}\mathbf J_{\gamma}^{\mathrm{sub}}
\right\|
}{
\hbar+\varepsilon_J
},
\qquad
\lambda_{\mathrm{hel}}\in\{+1,-1\}.
$$

The edit should state that a clean free branch must route $\mathbf J_{\mathrm{src,rem}}$ outside the photon ledger or prove that it vanishes.

Recommendation B3. In `reaction-ledger.md`, add the photon event-balance row:

$$
\Delta\mathbf J_{\mathrm{src}}^{0}
=
\mathbf J_{\mathrm{src}}^-
-
\mathbf J_{\mathrm{src}}^+,
$$

$$
\Delta\mathbf J_{\mathrm{src}}^{0}
=
\mathbf J_{\gamma}^{\mathrm{sub}}
+
\mathbf J_{\mathrm{recoil}}^{0}
+
\mathbf J_{\mathrm{wake}}^{0}
+
\mathbf J_{\mathrm{handoff}}^{0}.
$$

The corresponding residual is

$$
\Delta_{\mathrm{bal}}^\gamma
=
\frac{
\left\|
\Delta\mathbf J_{\mathrm{src}}^{0}
-
\mathbf J_{\gamma}^{\mathrm{sub}}
-
\mathbf J_{\mathrm{recoil}}^{0}
-
\mathbf J_{\mathrm{wake}}^{0}
-
\mathbf J_{\mathrm{handoff}}^{0}
\right\|
}{
1+\left\|\Delta\mathbf J_{\mathrm{src}}^{0}\right\|
}.
$$

Recommendation B4. In `mode-taxonomy.md`, expose the Gate B event residual vector:

$$
\mathcal R_{\gamma B}^{\mathrm{event}}
=
\left(
\Delta_A,
\Delta_Q^\gamma,
\Delta_{\mathrm{surv}}^\gamma,
\Delta_{\parallel}^{\mathrm{sub}},
\Delta_{\mathrm{hel}}^\gamma,
\Delta_{\epsilon}^{\gamma},
\Delta_{\mathrm{src}}^\gamma,
\Delta_{\mathrm{recoil}}^\gamma,
\Delta_{\mathrm{wake}}^\gamma,
\Delta_{\mathrm{handoff}}^\gamma,
\Delta_{\mathrm{bal}}^\gamma
\right).
$$

Decision. Promote-now as Gate B closure-target and ledger-contract prose. Do not promote symbolic equalities such as $\mathbf J_{\gamma}^{\mathrm{sub}}=\lambda_{\mathrm{hel}}\hbar\hat{\mathbf e}$ as physical results unless Gate A and the event-balance rows have passed.

## Edit Batch C: Measurement And Bell Guardrails

Targets: [measurement-ontology.md](../../../content/markdown/aaa/quantum/measurement-ontology.md), [bell-theorem.md](../../../content/markdown/aaa/theory-bridges/bell-theorem.md), and [entanglement-nonlocality.md](../../../content/markdown/aaa/theory-bridges/entanglement-nonlocality.md).

Recommendation C1. In `measurement-ontology.md`, add the lifted Stern-Gerlach pullback measure:

$$
P_{+}^{\mathrm{lift}}(\hat{\mathbf m})
=
\int_{\mathcal Z_{\hat{\mathbf m}}^{\mathrm{SG}}}
\mathbf 1_{B_{+}^{\mathrm{lift}}(\hat{\mathbf m})}(Z_0)
\,d\mu_{\hat{\mathbf m}}^{\mathrm{in}}(Z_0),
$$

with

$$
B_{+}^{\mathrm{lift}}(\hat{\mathbf m})
=
\left\{
Z_0:
G_{\mathrm{rec}}
\left(
\Phi_{T_{\mathrm{int}}}^{\hat{\mathbf m}}(Z_0)
\right)=1,
\quad
\Sigma_{\hat{\mathbf m}}^{\mathrm{SG}}
\left(
\Phi_{T_{\mathrm{int}}}^{\hat{\mathbf m}}(Z_0)
\right)>0
\right\}.
$$

Then state the half-angle expression only as a consistency target:

$$
\Delta_{\mathrm{half}}^{\mathrm{lift}}
=
\left|
P_{+}^{\mathrm{lift}}(\hat{\mathbf m})
-
\cos^2\left(
\frac{\alpha(Z_0,\hat{\mathbf m})}{2}
\right)_{\mu}
\right|.
$$

Recommendation C2. In `measurement-ontology.md`, distinguish the full substrate normal from the reduced comparison normal:

$$
\mathcal N_{\hat{\mathbf m}}^{\mathrm{SG}}(Z,t)
=
D_Z
\Sigma_{\hat{\mathbf m}}^{\mathrm{SG}}(Z(t)).
$$

The reduced normal

$$
\mathcal N_{\hat{\mathbf m}}^{\mathrm{SG,red}}
=
dp_{+}
-
\frac{1}{2\pi}
d\theta_{\mathrm{rec}}
$$

should appear only as a comparison target after $\psi(Z)$ and $p_+(Z;\hat{\mathbf m})$ are derived.

Recommendation C3. In `entanglement-nonlocality.md`, replace product-compressed response-kernel language with a joint-record law:

$$
P(a,b|\hat{\mathbf m}_A,\hat{\mathbf m}_B)
=
\int
K_{ab}^{AB}
\left(
\hat{\mathbf m}_A,
\hat{\mathbf m}_B;
\Pi_{AB}^{\mathrm{sing}},
\zeta_A,
\zeta_B
\right)
d\nu_{A,\hat{\mathbf m}_A}(\zeta_A)
d\nu_{B,\hat{\mathbf m}_B}(\zeta_B)
d\rho_{\mathrm{src}}
\left(
\Pi_{AB}^{\mathrm{sing}}
\middle|
P_{\mathrm{src}}^{\mathrm{sing}}
\right).
$$

Keep product form only as a failure audit:

$$
\Delta_{\mathrm{prod}}
=
\inf_{K_A,K_B}
\sup_{a,b,\hat{\mathbf m}_A,\hat{\mathbf m}_B}
\left|
P(a,b|\hat{\mathbf m}_A,\hat{\mathbf m}_B)
-
\int K_A K_B\,d\mu_{AB}^{\mathrm{rec}}
\right|.
$$

Recommendation C4. In `entanglement-nonlocality.md`, replace the one-outcome Bell target with the full singlet joint law:

$$
P(a,b|\hat{\mathbf m}_A,\hat{\mathbf m}_B)
=
\frac14
\left(
1-ab\,\hat{\mathbf m}_A\cdot\hat{\mathbf m}_B
\right),
\qquad
a,b\in\{-1,+1\}.
$$

The correlation target is then

$$
E_{\mathrm{SG}}
\left(
\hat{\mathbf m}_A,
\hat{\mathbf m}_B
\right)
=
-
\hat{\mathbf m}_A\cdot\hat{\mathbf m}_B.
$$

Recommendation C5. In `bell-theorem.md`, add pair-provenance source variables:

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

The prose should state that later detector settings are excluded fields of $P_{\mathrm{src}}^{\mathrm{sing}}$.

Recommendation C6. In `bell-theorem.md`, add the conserved-opposite-axis failure diagnostic:

$$
\hat{\mathbf n}_A=-\hat{\mathbf n}_B,
\qquad
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
\right).
$$

This gives

$$
E_{\mathrm{axis}}(\theta)
=
-1+\frac{2\theta}{\pi},
$$

so conserved creation-level angular momentum by itself is a failed source model for Bell correlations.

Decision. Promote-now as measurement/Bell guardrail prose. Do not promote the detailed pair-source relative-phase certificate until a source branch supplies layer phase ledgers, wake phase ledger, angular-momentum projections, and gauge probes.

## Edit Batch D: Downstream Spinor Consumers

Targets: [quantum-statistics.md](../../../content/markdown/aaa/quantum/quantum-statistics.md), [weak-mixing-ckm.md](../../../content/markdown/aaa/theory-bridges/weak-mixing-ckm.md), and [horizon-chirality.md](../../../content/markdown/aaa/spacetime/horizon-chirality.md).

Recommendation D1. In `quantum-statistics.md`, add the dependency condition that fermionic exchange-sign recovery is blocked until a retained non-gauge row $r_\star$ satisfies

$$
\Pi_{W,r_\star}^{2\pi}=1,
\qquad
\Pi_{W,r_\star}^{4\pi}=0,
\qquad
\Delta_{\mathrm{gc}}(r_\star)\le\varepsilon_{\mathrm{gc}},
$$

with the angular-momentum residuals below tolerance. This should sit near the exchange residual $\mathcal R_{\mathrm{ex}}$.

Recommendation D2. In `weak-mixing-ckm.md`, require the weak-coupling-triad exposure model to consume $\Sigma_{\mathrm{spin}}^{(h)}$ only when the same branch record $\theta$ supplies a passed spinor row:

$$
\Delta_{\Pi_W}(\theta;W)\le\varepsilon_{\Pi_W},
\qquad
\Delta_{\mathrm{gc}}(\theta;W)\le\varepsilon_{\mathrm{gc}},
\qquad
\Delta_{\mathbf J}^{2\pi},
\Delta_{\mathbf J}^{4\pi}
\le
\varepsilon_{\mathbf J}.
$$

Recommendation D3. In `horizon-chirality.md`, add a compatibility note that horizon `pro/anti`, boundary-helicity, `CW/CCW`, `HML/HLM`, and weak left/right language cannot be identified with each other until a component row supplies $\widetilde r(s)$, $\Pi_{W,r}^{2\pi}$, $\Pi_{W,r}^{4\pi}$, quotient witness, doubled-path restoration, and gauge invariance.

Decision. Promote-now as dependency and speculation-boundary prose. Defer any weak left/right identification from terminal axial sign alone.

## Explicitly Blocked Items

Do not promote these as reader-facing results yet:

- Physical branch selection $\operatorname{Sel}_{B,N}=\mathfrak a_{\min}$ for the minimal branch.
- Photon symbolic equalities as completed Gate B physics without Gate A, source depletion, recoil, wake, handoff, and material analyzer rows.
- The pair-source relative phase certificate
  $$
  \varphi_{\Pi}(\Pi_{AB}^{\mathrm{sing}})
  =
  \arg
  \left(
  -Z_A^{AB}\overline{Z_B^{AB}}
  e^{i\Phi_{AB}^{\mathrm{wake}}}
  \right)
  $$
  before a source branch supplies the needed phase and gauge ledgers.
- Weak left/right exposure from terminal axial sign $\hat J_{\mathrm{net}}\parallel\pm\hat{\mathbf V}$ without the same row-local parity and $\Delta_{\mathrm{WCT}}$ record used in `weak-mixing-ckm.md`.

## Recommended Execution Order

1. Apply Batch A first because it supplies the spinor/gauge-control vocabulary used by the downstream consumer edits.
2. Apply Batch C second because it fixes the most direct Bell-local compression hazard.
3. Apply Batch B third because photon Gate B is a ledger-contract clarification, not a completed physical candidate.
4. Apply Batch D last so downstream documents consume the exact same blocker names introduced in Batch A.

