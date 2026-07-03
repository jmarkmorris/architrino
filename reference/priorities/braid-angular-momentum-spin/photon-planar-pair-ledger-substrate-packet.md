# Photon Planar-Pair Ledger Substrate Packet

Status. Priority proof packet for `photon_planar_pair_transverse_ledger` in [priorities.md](priorities.md). This packet replaces the ideal transverse input used by [ideal-analyzer-and-sg-residual-instance.md](ideal-analyzer-and-sg-residual-instance.md) with a substrate contract for the coaxial contra-rotating pro/anti planar pair. It does not edit reader-facing $\mathbb{A}\mathbb{A}\mathbb{A}$ prose.

Claim level. Defer with blocker. The packet defines the exact ledger rows that a Gate A-admissible photon branch must supply before Gate B can claim transverse support, helicity $\pm1$, no physical free longitudinal mode, and analyzer handoff from the planar-pair substrate. It does not populate those rows from a simulation or branch certificate.

## Input Branch

Gate B may consume only a Gate A-admissible photon branch

$$
\mathcal G_A
=
\left(
\hat{\mathbf e},
c_\gamma,
\omega,
d,
\phi_{\mathrm{geom}},
\Delta_{\mathrm{disp}},
\Delta_{\mathrm{leak}},
\Delta_{\mathrm{null}}
\right),
$$

where $\hat{\mathbf e}$ is the propagation axis, $c_\gamma$ is the photon-channel speed in the declared Noether sea state, $\omega$ is the phase frequency, $d$ is the leading/trailing planar-pair spacing, and $\Delta_{\mathrm{null}}$ records the no-rest-branch and no-rest-proper-time rows. The substrate Gate B packet is admissible only if

$$
\Delta_A
=
|\Delta_{\mathrm{disp}}|
+
|\Delta_{\mathrm{leak}}|
+
|\Delta_{\mathrm{null}}|
\le
\varepsilon_A.
$$

If $\Delta_A>\varepsilon_A$, the candidate has failed Gate A and must not be repaired by polarization, helicity, or analyzer arithmetic.

## Planar-Pair State Variables

Choose a Gate A transverse frame

$$
(\hat{\mathbf e},\hat{\mathbf u},\hat{\mathbf v}),
\qquad
\hat{\mathbf u}\times\hat{\mathbf v}=\hat{\mathbf e}.
$$

The substrate record for one photon branch is

$$
\mathfrak P_\gamma
=
\left(
\mathcal P_{\mathrm{pro}},
\mathcal P_{\mathrm{anti}},
\mathcal W_\gamma,
\mathcal J_\gamma,
\mathcal Q_\gamma,
\lambda_{\mathrm{hel}},
\Theta_\gamma
\right).
$$

Here $\mathcal P_{\mathrm{pro}}$ and $\mathcal P_{\mathrm{anti}}$ are the pro and anti planar ledgers, $\mathcal W_\gamma$ is the retained photon wake-history record, $\mathcal J_\gamma$ is the photon-side angular-momentum ledger, $\mathcal Q_\gamma$ is the static exposure and polarity-balance record, $\lambda_{\mathrm{hel}}\in\{+1,-1\}$ is the target helicity sign, and $\Theta_\gamma$ collects transverse phase data.

Each planar ledger must expose a transverse action vector and a spin-side angular-momentum contribution:

$$
\mathcal P_{\chi}
=
\left(
\mathbf a_{\chi},
\mathbf J_{\chi},
I_{\chi},
\varphi_{\chi},
s_{\chi}^{\mathrm{plane}},
q_{\chi}^{\mathrm{eff}},
\mathcal R_{\chi}^{\mathrm{act}}
\right),
\qquad
\chi\in\{\mathrm{pro},\mathrm{anti}\}.
$$

The contra-rotating and pro/anti structure is encoded by the substrate signs

$$
s_{\mathrm{pro}}^{\mathrm{plane}}
=
-s_{\mathrm{anti}}^{\mathrm{plane}},
\qquad
q_{\mathrm{pro}}^{\mathrm{eff}}
=
-q_{\mathrm{anti}}^{\mathrm{eff}},
$$

while the surviving photon branch must still produce a nonzero transverse oscillatory ledger. Static cancellation and oscillatory survival are therefore different rows, not the same assertion.

## Integer Phase-Lock And Analyzer-Arrival Hypothesis

Priority-only hypothesis. A viable planar-pair photon branch may require the `I`, `M`, and `O` binaries to close on a shared commensurate phase ledger before their branch sums can supply a clean transverse polarization state. The candidate frequency condition is

$$
f_I:f_M:f_O=n_I:n_M:n_O,
\qquad
n_I,n_M,n_O\in\mathbb Z_{>0}.
$$

This is not a theorem row by itself. It is a substrate mechanism candidate for making $\Theta_\gamma$ reproducible across the leading and trailing planar ledgers.

For each layer $k\in\{I,M,O\}$, the leading/trailing phase relation must also compensate the propagation delay across the pair spacing $d$. In the first fixed-$c_f$ app model, the candidate analyzer-arrival phase mismatch is

$$
\Delta\Phi_k
=
2\pi f_k\frac{d}{c_f}
+
\phi_{k,\mathrm{trailing}}
-
\phi_{k,\mathrm{leading}}.
$$

A later local-$c$ branch should replace $c_f$ with the declared photon-channel speed or local propagation record from Gate A. In either convention, a clean branch must show that the relevant $\Delta\Phi_k$ rows close modulo $2\pi$ in the same event window used for $\mathbf a_{\perp}^{\mathrm{sub}}$, $\mathbf J_{\gamma}^{\mathrm{sub}}$, and $\mathcal W_\gamma$.

The polarization interpretation of this hypothesis is:

| Candidate | Phase-lock meaning | Observer-level target |
| --- | --- | --- |
| Linear | The branch-sum transverse ledger collapses to one stable analyzer axis. | The fitted $E_y/E_z$ trace is a line and the analyzer response has a preferred axis. |
| Circular | Two transverse components survive with equal amplitude and relative phase $\pm90^\circ$. | The fitted transverse trace is a circle and an ideal linear analyzer gives equal pass fraction for every analyzer angle. |
| Elliptical | Two transverse components survive with stable unequal amplitudes and/or a stable non-special phase lag. | The fitted transverse trace is an ellipse, with linear and circular behavior recovered as limiting cases. |

The proof burden is to compute these cases from the delayed branch sums of the twelve architrinos and the material analyzer handoff, not by inserting polarization vectors, analyzer pass rules, or source-side polarization parameters by hand. A good visual fit in the photon app can nominate a parameter regime, but this packet can consume it only after the branch supplies the corresponding phase-lock, transverse-survival, longitudinal-leakage, helicity, and event-ledger rows.

The next useful app-side input is not a better hand-selected phase preset. It is a retained-root phase ledger: source phase-at-hit, receiver phase-at-hit where the receiver is a modeled binary, root kind, cycle index, and phase-spread summaries. A phase-lock claim should be accepted here only when the delayed branch geometry supplies a low-spread causal family across cycles, including any partner-hit or same-source round-trip rows needed for the candidate polarization state.

## Local-c Helical Self-Hit Hypothesis

Priority-only hypothesis. When a photon branch is carried by a local Noether sea, the packet center should move at the declared photon-channel speed $c_\gamma$, while each architrino also carries transverse orbital motion in its planar braid. For layer $k$,

$$
\mathbf v_{k,\mathrm{abs}}
=
c_\gamma\hat{\mathbf e}
+
\mathbf v_{k,\perp},
\qquad
v_{k,\perp}=2\pi f_k R_k.
$$

For orthogonal propagation and transverse orbit,

$$
\left(\frac{v_{k,\mathrm{abs}}}{c_f}\right)^2
=
\left(\frac{c_\gamma}{c_f}\right)^2
+
\left(\frac{2\pi f_kR_k}{c_f}\right)^2.
$$

Thus the same layer is sub-field-speed only when

$$
2\pi f_kR_k
<
\sqrt{c_f^2-c_\gamma^2}.
$$

In low-density Noether sea, $c_\gamma\approx c_f$, so the available transverse speed budget is small and ordinary orbital motion can push the source history into candidate self-hit. In dense or strong-field Noether sea, a reduced $c_\gamma$ opens a larger sub-field-speed window, so outer or retuned layers may leave the self-hit candidate regime.

Equivalently, define

$$
\beta_\gamma=\frac{c_\gamma}{c_f},
\qquad
u_k=\frac{2\pi f_kR_k}{c_f}.
$$

Then the layer speed budget is

$$
\beta_{k,\mathrm{abs}}^2=\beta_\gamma^2+u_k^2,
$$

with the speed-budget self-hit candidate threshold

$$
u_k\gtrsim\sqrt{1-\beta_\gamma^2}.
$$

In the current photon app calibration, the default layer speeds before translation are $u_I=1.2$, $u_M=1.0$, and $u_O=0.8$. Therefore the inner layer remains super-field-speed for any nonzero $c_\gamma$, the middle layer becomes super-field-speed for any positive $c_\gamma$, and the outer layer is sub-field-speed only when $\beta_\gamma<0.6$. This app calibration is a diagnostic stress setting, not a physical proof that every photon branch must use those exact layer speeds.

The same-source self-hit condition is not the speed inequality alone. A retained row requires a source-history root

$$
\|\mathbf r_{k}(t)-\mathbf r_{k}(\tau)\|=c_f(t-\tau),
\qquad \tau<t,
$$

with a usable Jacobian and transversality floor. For a helical source history, the approximate threshold can be read as

$$
v_{k,\perp}
\gtrsim
\sqrt{c_f^2-c_\gamma^2},
$$

but the actual row must be solved from the delayed branch geometry.

Mechanism candidate. Managed self-hit may be part of how a photon branch maintains a transverse wake ledger while moving at local $c$; in that reading it is better described first as branch maintenance or wake-coupled propagation, not literal rocket propulsion. The candidate loss condition is not merely $v_{k,\mathrm{abs}}<c_f$. It is the disappearance or rejection of the relevant same-source roots after the Jacobian floor, transversality floor, phase-lock rows, transverse-survival residual, longitudinal-leakage residual, helicity ledger, and event-balance ledger are all evaluated.

A horizon or strong-gravity transition should therefore be treated as a possible failure or reorganization of the outward photon-channel branch, not simply as the point where $v_{k,\mathrm{abs}}$ becomes less than $c_f$. If a future black-hole interpretation is attempted, the horizon-side condition should be phrased as an outward-branch ledger condition: no stable outward photon channel, or failed Gate A displacement/null rows, under the local Noether sea state. The raw speed-budget threshold can nominate where a layer changes regime, but it cannot by itself identify the event horizon.

## Static Exposure And Transverse Survival

Define the static exposure residual

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
}.
$$

This row must be small for a neutral free photon channel, but a small $\Delta_Q^\gamma$ is not enough. The transverse oscillatory action ledger is

$$
\mathbf a_{\gamma}^{\mathrm{sub}}
=
\mathbf a_{\mathrm{pro}}
+
\mathbf a_{\mathrm{anti}}
+
\mathbf a_{\mathrm{wake}},
$$

with $\mathbf a_{\mathrm{wake}}$ the retained wake contribution from $\mathcal W_\gamma$. The projected free-photon ledger is

$$
\mathbf a_{\perp}^{\mathrm{sub}}
=
P_{\perp}\mathbf a_{\gamma}^{\mathrm{sub}},
\qquad
P_{\perp}=I-\hat{\mathbf e}\hat{\mathbf e}^{\flat},
$$

and the longitudinal component is

$$
\mathbf a_{\parallel}^{\mathrm{sub}}
=
P_{\parallel}\mathbf a_{\gamma}^{\mathrm{sub}},
\qquad
P_{\parallel}=\hat{\mathbf e}\hat{\mathbf e}^{\flat}.
$$

The transverse-survival residual is

$$
\Delta_{\mathrm{surv}}^\gamma
=
\mathbf 1_{\|\mathbf a_{\perp}^{\mathrm{sub}}\|\le\varepsilon_{\mathrm{amp}}}.
$$

The longitudinal free-mode residual is

$$
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

The free Gate B branch requires

$$
\Delta_Q^\gamma\le\varepsilon_Q,
\qquad
\Delta_{\mathrm{surv}}^\gamma=0,
\qquad
\Delta_{\parallel}^{\mathrm{sub}}\le\varepsilon_{\parallel}.
$$

If the longitudinal component is nonzero above tolerance, the branch must be classified as a Gate A failure, a massive $W/Z$-like corridor, a material recoupling, or another bound/medium response. It is not a third free photon polarization.

## Helicity Ledger

The substrate photon angular-momentum ledger is

$$
\mathbf J_{\gamma}^{\mathrm{sub}}
=
\mathbf J_{\mathrm{pro}}
+
\mathbf J_{\mathrm{anti}}
+
\mathbf J_{\mathrm{wake}}
+
\mathbf J_{\mathrm{src,rem}},
$$

where $\mathbf J_{\mathrm{wake}}$ is the retained wake-history contribution and $\mathbf J_{\mathrm{src,rem}}$ is any source or remnant term still carried inside the declared photon branch window. For a clean free branch after source separation, $\mathbf J_{\mathrm{src,rem}}$ must vanish or be explicitly routed outside the photon ledger.

The helicity row is

$$
\Delta_{\mathrm{hel}}^\gamma
=
\left|
\frac{\hat{\mathbf e}\cdot\mathbf J_{\gamma}^{\mathrm{sub}}}{\hbar}
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

The first term recovers the observer-level photon helicity value. The second term blocks a hidden transverse spin vector from being misreported as a pure free-photon helicity. A candidate may have transverse polarization ledger $\mathbf a_{\perp}^{\mathrm{sub}}$, but the spin-side angular-momentum ledger of the free branch must project to helicity along $\hat{\mathbf e}$.

Circular bridge states are admissible only after this substrate helicity row is present. In the transverse frame, define

$$
\boldsymbol{\epsilon}_{\lambda}
=
\frac{1}{\sqrt{2}}
\left(
\hat{\mathbf u}
+
i\lambda\hat{\mathbf v}
\right),
\qquad
\lambda\in\{+1,-1\}.
$$

The bridge-state residual is

$$
\Delta_{\epsilon}^{\gamma}
=
\frac{
\left\|
\mathbf a_{\perp}^{\mathrm{sub}}
-
A_\gamma\boldsymbol{\epsilon}_{\lambda_{\mathrm{hel}}}
\right\|
}{
\left\|
\mathbf a_{\perp}^{\mathrm{sub}}
\right\|
+
\varepsilon_{\mathrm{amp}}
},
$$

where $A_\gamma$ is the best-fit complex amplitude in the declared transverse chart. Linear polarization records are real transverse combinations of the same substrate ledger; they are not separate ontology.

## Gate B Substrate Residual

The substrate Gate B residual vector is

$$
\mathcal R_{\gamma B}^{\mathrm{sub}}
=
\left(
\Delta_A,
\Delta_Q^\gamma,
\Delta_{\mathrm{surv}}^\gamma,
\Delta_{\parallel}^{\mathrm{sub}},
\Delta_{\mathrm{hel}}^\gamma,
\Delta_{\epsilon}^{\gamma},
\Delta_{\mathbf J}^{\gamma},
\Delta_{\mathrm{handoff}}^\gamma
\right).
$$

The event angular-momentum residual is

$$
\Delta_{\mathbf J}^{\gamma}
=
\frac{
\left\|
\mathbf J_{\mathrm{src}}^-
-
\mathbf J_{\mathrm{src}}^+
-
\mathbf J_{\gamma}^{\mathrm{sub}}
-
\mathbf J_{\mathrm{mat,sea}}^{\mathrm{recoil}}
\right\|
}{
1+\left\|\mathbf J_{\mathrm{src}}^-\right\|
}.
$$

For an isolated emitted photon branch, $\mathbf J_{\mathrm{mat,sea}}^{\mathrm{recoil}}$ is the retained local recoil and Noether sea update. For a propagated free branch after source separation, this row is replaced by conservation of $\mathbf J_{\gamma}^{\mathrm{sub}}$ plus the carried wake ledger over the branch window.

The analyzer handoff residual is

$$
\Delta_{\mathrm{handoff}}^\gamma
=
\mathbf 1_{\mathbf a_{\perp}^{\mathrm{sub}}\text{ unavailable}}
+
\mathbf 1_{\mathbf J_{\gamma}^{\mathrm{sub}}\text{ unavailable}}
+
\mathbf 1_{\mathcal W_\gamma\text{ unavailable}}.
$$

Gate B can hand off to the ideal analyzer packet only when $\Delta_{\mathrm{handoff}}^\gamma=0$ and the preceding substrate rows pass.

## Relation To The Ideal Analyzer Rows

If $\mathcal R_{\gamma B}^{\mathrm{sub}}$ passes, the ideal transverse input in [ideal-analyzer-and-sg-residual-instance.md](ideal-analyzer-and-sg-residual-instance.md) may be replaced by

$$
a_{\perp}^a
\leftarrow
\left(\mathbf a_{\perp}^{\mathrm{sub}}\right)^a.
$$

The ideal rows then remain useful as algebraic checks:

$$
\Delta_P=0,
\qquad
\Delta_A^{\mathrm{proj}}=0,
\qquad
\Delta_{\mathrm{Malus}}(\theta)=0,
\qquad
\Delta_{\mathrm{circ}}=0
$$

inside the declared two-axis transverse chart. They still do not close material analyzer dynamics. The material return map, pass/reject recoil ledger, detector-bias diagnostic, and two-wing no-signaling residual remain downstream substrate rows.

## Pass / Fail Outcomes

| Outcome | Meaning | Downstream use |
| --- | --- | --- |
| `planar_pair_substrate_pass` | Gate A passes, static exposure cancels, a nonzero transverse ledger survives, the longitudinal residual is below tolerance, helicity is $\pm1$, and the event angular-momentum ledger closes. | The packet can supply $a_{\perp}^{\mathrm{sub}}$ and $\mathbf J_{\gamma}^{\mathrm{sub}}$ to the analyzer and no-signaling packets. |
| `gate_a_fail` | $\Delta_A>\varepsilon_A$. | Do not repair with Gate B polarization rules. |
| `neutral_but_dark_fail` | Static exposure cancels but $\Delta_{\mathrm{surv}}^\gamma=1$. | The pro/anti cancellation erased the free oscillatory photon ledger; no free photon branch is certified. |
| `longitudinal_free_mode_fail` | $\Delta_{\parallel}^{\mathrm{sub}}>\varepsilon_{\parallel}$ for a claimed free photon. | Reclassify as Gate A failure, massive corridor, material recoupling, or bound/medium response. |
| `helicity_fail` | $\Delta_{\mathrm{hel}}^\gamma$ exceeds tolerance. | The planar pair has not recovered observer-level photon helicity $\pm1$. |
| `event_ledger_fail` | $\Delta_{\mathbf J}^{\gamma}$ exceeds tolerance. | The branch hides missing source, material, wake, or Noether sea angular momentum. |
| `handoff_blocked` | $a_{\perp}^{\mathrm{sub}}$, $\mathbf J_{\gamma}^{\mathrm{sub}}$, or $\mathcal W_\gamma$ is unavailable. | The ideal analyzer arithmetic remains a reduced chart only. |

## Promotion Decision

This packet is priority-only until at least one substrate branch supplies the planar-pair rows. The reader-facing Gate B theorem target in [electroweak-bosons](../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md) already states the correct conceptual burden: derive the transverse ledger, material analyzer projector, helicity, no free longitudinal mode, and probability rule from the planar-pair substrate. The missing work is not more prose. It is a populated branch certificate or simulation packet that evaluates $\mathcal R_{\gamma B}^{\mathrm{sub}}$.
