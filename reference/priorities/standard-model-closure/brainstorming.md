# Standard Model Closure Brainstorming

This file preserves ideas and insights that are working toward promotion to an existing or new document or app.

## Routing Rules

- Keep loose ideas here until they have a concrete promotion target, claim level, and owner.
- Promote material into the control file only when it becomes a queue item, proof route, app task, or document/app destination.
- Keep speculative notes claim-limited and identify the existing or new document or app they may support.

## Ideas And Insights

### Dynamo Team Insights Mining

- Derivation-closure target: discrete charge quantization with $\epsilon=e/6$ should be tested as a consequence of six retained polarity sites plus causal linking, winding, and stability selection, not as an arbitrary charge table. Promotion requires a branch-derived sign-pattern rule and a failure case excluding unobserved low-energy stable charge patterns.
- Gauge-structure implication: if causal linking selects allowed six-site sign counts, route the result into the low-energy charge and gauge mapping only after the same branch evidence also satisfies dynamical exclusion of non-Standard-Model stable assemblies.

### Collider-Anomaly Comparison — 2026-07-11

#### LEP bottom forward-backward asymmetry

- **Claim level:** speculation with a derivation-closure target. The long-standing low $A_{\mathrm{FB}}^b$ result is structurally compatible with a small bottom-branch axial-frame exposure rotation that redistributes effective left- and right-channel $Zb\bar b$ coupling while leaving the total neutral-current coupling norm approximately unchanged. This is not a claimed explanation.
- **Trigger:** the precision electroweak fit keeps $R_b$ close to the Standard Model while the asymmetry-derived bottom coupling is low. A norm-preserving rotation has exactly that separation:
  $$
  \begin{pmatrix}g_L^b\\g_R^b\end{pmatrix}_{\mathbb{A}\mathbb{A}\mathbb{A}}
  =
  \begin{pmatrix}
  \cos\phi_b&-\sin\phi_b\\
  \sin\phi_b&\cos\phi_b
  \end{pmatrix}
  \begin{pmatrix}g_L^b\\g_R^b\end{pmatrix}_{\mathrm{SM}},
  \qquad
  (g_L^b)^2+(g_R^b)^2=\text{constant},
  $$
  while
  $$
  A_b=\frac{(g_L^b)^2-(g_R^b)^2}{(g_L^b)^2+(g_R^b)^2}
  $$
  changes at first order by $\delta A_b\simeq-4g_L^bg_R^b\phi_b/[(g_L^b)^2+(g_R^b)^2]$. The observed direction corresponds only to a few-degree effective rotation under the simple two-component model.
- **Assumptions and proof burden:** the same retained Generation-III bottom branch must derive $\phi_b$ from axial-frame orientation, shielding coherence, weak-coupling-triad exposure, and Noether sea response; the rotation must not be fitted from $A_b$; it must preserve $R_b$, other $Z$-pole covariance rows, tree-level flavor diagonality, and electron/muon neutral-current constraints. A comparable unexplained rotation in other down-type branches would falsify bottom-specific shielding as the mechanism.
- **Promotion target:** `content/markdown/aaa/assemblies/fermions/weak-mixing-angle.md`, `content/markdown/aaa/assemblies/fermions/quarks.md`, and `content/markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md` only after a branch-derived operator exists.
- **Completed observer-level artifact:** [Bottom Axial-Frame Exposure Rotation Covariance](bottom-axial-frame-exposure-rotation-covariance.md) derives the exact trigonometric response, consumes the published heavy-flavor correlations without double-counting asymmetry-derived $A_b$, and finds a current-value screening minimum near $\phi_b=-1.78^\circ$ with only a local $1.97\sigma$ preference. The next artifact is branch-native: compute $\phi_b$ from a predeclared Generation-III bottom exposure record without using the asymmetry data as input.

#### $R(D)$ and $R(D^*)$

- **Claim level:** speculation with a reaction-provenance derivation target. A lepton-only enhancement is not a viable $\mathbb{A}\mathbb{A}\mathbb{A}$ explanation because the shared charged-lepton axial inventory and weak-coupling-triad rule must also satisfy tau, muon, electron, and $W$ universality constraints. Any admissible route must instead be a nonfactorizable finite-event effect coupling the $b\to c$ hadronic transition record to the outgoing tau shielding branch.
- **Trigger:** the 2025 HFLAV central values correspond roughly to rate multipliers $R(D)_{\mathrm{obs}}/R(D)_{\mathrm{SM}}\simeq1.21$ and $R(D^*)_{\mathrm{obs}}/R(D^*)_{\mathrm{SM}}\simeq1.11$, or amplitude shifts near $10\%$ and $5\%$. Their unequal sizes disfavor one universal tau-coupling rescaling.
- **Candidate mathematical form:** keep the shared weak normalization fixed and test
  $$
  \mathcal M_{D^{(*)},\ell}^{\mathbb{A}\mathbb{A}\mathbb{A}}(q^2)
  =
  \mathcal M_{D^{(*)},\ell}^{\mathrm{SM}}(q^2)
  +
  \Delta\mathcal M_{\mathrm{corr}}
  \!\left[
  \mathcal B_{b\to c},
  \mathsf s_{\mathrm{sh}}(\ell),
  \Sigma_{\mathrm{WCT}},
  \mathcal W_-,
  \theta_{\mathrm{sea}};
  q^2
  \right],
  $$
  with $\Delta\mathcal M_{\mathrm{corr}}\to0$ when the hadronic remnant and charged-lepton branch factorize. The same correction must predict the different $D$ and $D^*$ responses rather than fitting two constants.
- **Assumptions and proof burden:** derive the correction from one event record; preserve light-lepton universality; reproduce differential $q^2$ shapes, tau polarization, $D^*$ polarization, $B_c$ lifetime pressure, and independent tau/$W$ decay constraints; do not insert observed $R(D^{(*)})$ values into the shielding or corridor map.
- **Promotion target:** `content/markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md`, `content/markdown/aaa/assemblies/fermions/muon-tau.md`, and the reaction-ledger corpus only after the nonfactorizable term is derived.
- **Next artifact:** build one amplitude-level $b\to c\tau\bar\nu$ versus $b\to c\ell\bar\nu$ comparison using the existing weak-coupling-triad and reaction-provenance objects, then test whether the same predeclared kernel can produce both rate ratios and the differential observables.

#### Hadronic-vacuum-polarization data disagreement and muon $g-2$

- **Claim level:** effective-summary recovery target, not an anomaly explanation. Current $\mathbb{A}\mathbb{A}\mathbb{A}$ material can reinterpret hadronic vacuum polarization as an observer-level aggregate of charged-hadron assembly channels and Noether sea response, but it does not yet calculate the required $e^+e^-\to\text{hadrons}$ spectral function. A disagreement among experiments measuring the same cross section is not evidence for substrate dynamics unless a detector- or preparation-dependent residual survives ordinary calibration analysis.
- **Assumptions and proof burden:** recover the measured spectral ratio and its dispersion contribution from the same photon/charge, hadron, and detector-provenance record; preserve analyticity/dispersion benchmarks at the observer level; do not use the lattice-versus-data disagreement to select a native carrier. The 2025 muon $g-2$ comparison is consistent with the updated Standard Model evaluation, so the composite correction in `gauge-structure-emergence.md` should presently be treated as bounded rather than detected.
- **Promotion target:** the gauge-running and precision-interface chapters only after a native photon/charge carrier and hadronic spectral calculation exist.
- **Next artifact:** express the existing `vacuum_polarization_wake_dressing_row` as a recovery of the measured hadronic spectral function with experiment and lattice inputs kept as separate comparison surfaces; do not create a new anomaly gate.
