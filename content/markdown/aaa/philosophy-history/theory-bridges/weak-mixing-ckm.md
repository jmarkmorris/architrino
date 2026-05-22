# Weak Mixing and CKM

This chapter is the main bridge from Standard Model CKM language to the assembly-level weak-mixing picture. Its purpose is to let a reader see, in one place, which ingredients are standard, which are geometric reinterpretations, and which closure relations remain postulates or fit targets. It should be read with [Weak Mixing Angle](../../assemblies/fermions/weak-mixing-angle.md), [Electroweak Bosons: Photons, W/Z, and Higgs](../../assemblies/bosons/electroweak-bosons.md), and [Quantum Number Mapping](../../assemblies/fermions/quantum-number-mapping.md).

## Weak Mixing: $\mathbb{A}\mathbb{A}\mathbb{A}$ to SM

This chapter is written as a bridge text: it first states CKM in standard SM language, then translates each ingredient into $\mathbb{A}\mathbb{A}\mathbb{A}$ geometry. The goal is that a reader with QM and introductory QFT can identify exactly what is standard, what is assumed in $\mathbb{A}\mathbb{A}\mathbb{A}$, and what is predicted.

### Before/after mapping at a glance

| Standard-Model concept | $\mathbb{A}\mathbb{A}\mathbb{A}$ mapping used here | Status in this chapter |
| --- | --- | --- |
| Quark weak basis in charged current | Exposed weak-coupling-triad basis | $\mathbb{A}\mathbb{A}\mathbb{A}$ premise |
| Quark mass basis | Shielding eigenstates by generation tier (Gen I/II/III) | $\mathbb{A}\mathbb{A}\mathbb{A}$ premise |
| CKM entry $V_{ij}$ | Overlap amplitude between weak-basis and mass-basis states | SM object with $\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation |
| $\theta_{12},\theta_{23},\theta_{13}$ | Generation-chain transport amplitudes $(\kappa_{12},\kappa_{23},\sigma)$ via exponential ansatz | $\mathbb{A}\mathbb{A}\mathbb{A}$ postulate + calibration |
| CKM phase $\delta$ | Geometric holonomy angle via closure $\cos\delta=s_{13}/(s_{12}s_{23})$ | $\mathbb{A}\mathbb{A}\mathbb{A}$ postulate leading to prediction |
| Rates $\propto \lvert V_{ij}\rvert^2$ | Overlap-weighted transition probabilities (plus kinematics/hadronic factors) | SM observable mapping |
| $W^\pm$ exchange | Transient corridor assembled during interaction in the Noether Sea | $\mathbb{A}\mathbb{A}\mathbb{A}$ descriptive hypothesis |

### The Cabibbo–Kobayashi–Maskawa matrix (CKM) in the Standard Model
Quark flavor change in charged-current weak interactions is governed by one unitary matrix:
$$
V_{\mathrm{CKM}}=U_{uL}^\dagger U_{dL}.
$$
It enters the Lagrangian as
$$
\mathcal{L}_{CC}=\frac{g}{\sqrt{2}}\;\bar u_i\gamma^\mu(1-\gamma^5)V_{ij}d_j\,W^+_\mu+\text{h.c.}
$$
This is the statement that weak-interaction eigenstates are not aligned with mass eigenstates.

Interpretation of the angles and phase (with the hierarchical view used in this document):
- $\theta_{12}$ (Cabibbo angle): dominant mixing between generations 1 and 2.
- $\theta_{23}$: next-largest mixing between generations 2 and 3.
- $\delta$: CP-violating phase; it controls interference signs and produces CP-asymmetric reaction observables.
- $\theta_{13}$ (small): direct 1↔3 mixing; in the minimal $\mathbb{A}\mathbb{A}\mathbb{A}$ reduction below it is treated as a suppressed composite channel.

Overall physics interpretation: CKM is not an extra force. It is the measurable misalignment between the quark mass basis (set by Yukawa diagonalization) and the weak SU(2) interaction basis. Experimentally, this misalignment sets charged-current transition rates via $\lvert V_{ij}\rvert^2$ and fixes CP-violating interference through rephasing-invariant combinations such as the Jarlskog invariant.

The Standard Model source of this matrix is the simultaneous diagonalization problem for the two quark Yukawa matrices. After electroweak symmetry breaking one may diagonalize
$$
y_u\mapsto D_u,\qquad y_d\mapsto D_d,
$$
but the left-handed rotations need not agree:
$$
V_{\mathrm{CKM}}=U_{uL}^{\dagger}U_{dL}.
$$
The $\mathbb{A}\mathbb{A}\mathbb{A}$ translation must therefore recover one mass-basis operator and one weak-basis operator whose mismatch produces this unitary matrix. If the assembly model fits CKM entries without first defining those two bases from the same shielding and weak-coupling-triad record, it has only reproduced a table of numbers.

### How to read CKM rows (first-year guide)
Mass eigenstates are the definite-mass quark states $(u,c,t)$ and $(d,s,b)$. A charged-current interaction does not couple an up-type quark to only one down-type mass eigenstate; it couples to a superposition weighted by one CKM row:
$$
\lvert d^{(w)}_u\rangle=V_{ud}\lvert d\rangle+V_{us}\lvert s\rangle+V_{ub}\lvert b\rangle,
$$
$$
\lvert d^{(w)}_c\rangle=V_{cd}\lvert d\rangle+V_{cs}\lvert s\rangle+V_{cb}\lvert b\rangle,
$$
$$
\lvert d^{(w)}_t\rangle=V_{td}\lvert d\rangle+V_{ts}\lvert s\rangle+V_{tb}\lvert b\rangle.
$$
The reaction/transition probability into channel $j$ is proportional to $\lvert V_{ij}\rvert^2$ (after kinematic and hadronic factors). This is the precise meaning of flavor mixing.
Provenance lens (interpretive): in $\mathbb{A}\mathbb{A}\mathbb{A}$, $\lvert V_{ij}\rvert^2$ is the observed weight of allowed architrino transport histories that connect weak-basis channel $i$ to mass-basis channel $j$.

In the $\mathbb{A}\mathbb{A}\mathbb{A}$ shielding language used below, these three terms correspond to overlap with down-type states at nested shell swarm (IMO), bi-binary (IM-), and uni-binary (I--) tiers. Large CKM entries indicate strong geometric overlap; small entries indicate shielding/transport mismatch.

### Weak mixing in $\mathbb{A}\mathbb{A}\mathbb{A}$ terms
- The weak force is the only one that swaps quark types (down ↔ up, strange ↔ charm, etc.).
- Each quark has two “bases”: a **weak basis** (set by the weak-coupling triad) and a **mass basis** (set by shielding and medium-dressed inertial response). These bases aren’t aligned.
- When a W acts, it “sees” the weak basis; the chance to land in a particular mass state is set by the overlap between these bases → the CKM numbers.
- Big overlaps (similar shielding) give big CKM entries; mismatched shielding gives tiny entries.

- In this $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology, a $W^\pm$ is not created ex nihilo and is not treated as a preexisting free field quantum; it is a transient “corridor” that associates during a weak interaction:
  - Assembly mechanism: localized polarization of the Noether Sea provides two neutral swarms, while the interacting weak-coupling triad transfers a six-charge excess ($\pm e$ net) into the corridor.
  - Geometrically it’s a short-lived, high-tension bundle (see [assemblies/bosons/electroweak-bosons.md](../../assemblies/bosons/electroweak-bosons.md)) that ferries charge/phase between source and sink.
  - It dissociates quickly (lifetime set by corridor instability), matching the short-lived SM W.
  - So: it is a transient, bound excitation of the Noether-Sea medium from reconfiguration of participants’ wakes and axial structure, not from a standing background field.

## Minimal premises
- **Generations = shielding level:** Gen I nested shell swarm (u,d), Gen II bi-binary (c,s), Gen III uni-binary (t,b).
- **Weak basis = weak-coupling triad:** SU(2) acts on the exposed three polar sites (polarity = $T_3$). This basis does not align with the shielding (mass) basis once cores differ; the angle-side geometric hypothesis is summarized in [Weak Mixing Angle](../../assemblies/fermions/weak-mixing-angle.md).
- **Mass basis = shielding eigenstates:** Noether swarm shielding, trapped internal causal history, and Noether-Sea coupling set the externally exposed inertial response; each generation defines a distinct mass eigenstate per flavor type (up-type, down-type), using the same shielding ladder discussed in [Particle Masses: Emergent Inertia in the Noether Sea](../../assemblies/particle-masses.md).

Weak-coupling-triad exposure (working hypothesis): in translation, the three **forward** polar sites are more exposed (outside the particle’s own wake), so they form the weak-coupling triad; trailing sites are likely shielded by the wake/slipstream. Needs simulation confirmation.
Forward bias also fits the $W$-corridor picture: a transient corridor would form into the Noether Sea ahead of the translating quark group, where cores are unshadowed and available to couple.

Noether-Sea sourcing note: in $\mathbb{A}\mathbb{A}\mathbb{A}$ there is no empty background here, only the Noether Sea. Weak reconfigurations (e.g., heavy → light generation) may draw assembly parts from the Sea; treat any net architrino “gain” during heavy-to-light weak dissociation as speculative until energy/number flow is explicitly budgeted.

Left/right coupling note (SM statement): charged-current SU(2), and therefore CKM mixing, act only on left-handed quarks (equivalently right-handed antiquarks). Right-handed quarks are SU(2) singlets and do not mix via CKM.

Left/right coupling note ($\mathbb{A}\mathbb{A}\mathbb{A}$ geometric test): for the inherited left-channel exposure class the weak-coupling triad should face forward, while for the inherited right-channel exposure class it should rotate into the wake/shield. This is not yet a standalone helicity derivation; helicity language is available only when a propagation or momentum-axis record has been supplied by the same branch.
Candidate chiral-selection mechanism ($\mathbb{A}\mathbb{A}\mathbb{A}$ hypothesis): in the right-channel exposure class, the weak-coupling triad is rotated into the particle's own wake/slipstream. A charged $W$ corridor cannot dock onto a weak-coupling triad in that hidden coupling posture, so right-handed fermions are sterile to charged-current interactions.

This left/right exposure criterion is a downstream consumer of [Angular Momentum and Spin](angular-momentum-and-spin.md). Until the spinor and helicity ledger is derived, the weak-sector model should treat helicity exposure as a validation target rather than as an independent explanation of handedness.

Validation task: simulate exposure vs helicity to confirm or falsify this geometric criterion.

## Unified weak-sector closure route

The comparison with the fermion dictionary, weak-mixing angle note, neutrino chapter, and reaction ledger suggests one shared closure route rather than four unrelated open problems. The same exposed axial geometry should carry:

1. the left-channel selection rule,
2. the weak-basis versus mass-basis overlap,
3. the CKM/PMNS matrix weights and phases,
4. and the event-level provenance of weak reactions.

In compact form, the proof route is:
$$
\text{axial-frame geometry}
\longrightarrow
\text{weak-coupling-triad exposure}
\longrightarrow
\{V_{\mathrm{CKM}},U_{\mathrm{PMNS}}\}
\longrightarrow
\text{weak-reaction provenance}.
$$

This is stronger than a loose analogy among chapters, but it is still a derivation target. The current accepted synthesis is that weak `V-A` selection, flavor mixing, and weak-corridor bookkeeping are three readouts of the same exposure problem. To close the route, the corpus needs one operator-level model that does four jobs without changing definitions between them:

- identify which polar sites are exposed to a charged corridor for a moving assembly,
- suppress right-handed charged-current docking in the same geometry that allows left-handed docking,
- define the weak-basis states whose overlap with shielding eigenstates yields $V_{\mathrm{CKM}}$ and $U_{\mathrm{PMNS}}$,
- and specify whether the $W^\pm$ corridor carries only the charged transaction payload or also pro/anti Noether swarm provenance for the outgoing lepton assemblies.

The minimal mathematical object is therefore not only a mixing matrix. It is a coupled tuple:
$$
\bigl(R_{\mathrm{rel}},\alpha,c;\ \Sigma_{\mathrm{WCT}};\ \mathcal{W}_{\pm};\ \mathcal{P}_{ij}\bigr),
$$
where $R_{\mathrm{rel}}$ records axial-frame orientation relative to the fixed Noether swarm frame, $(\alpha,c)$ record the branch and color-sector data, $\Sigma_{\mathrm{WCT}}$ is the weak-coupling-triad domain, $\mathcal{W}_{\pm}$ is the charged-corridor action on that domain, and $\mathcal{P}_{ij}$ is the admissible provenance-path set used in the overlap sum. The first proof step is to define these objects for one controlled channel, such as $d\to u$ in free-neutron beta reaction, before trying to claim the full CKM or PMNS hierarchy.

## First beta exposure operator: $d\to u$

This first model is deliberately local. It defines the operator-level exposure gate for one generation-I down-type quark in free-neutron beta reaction. It is not yet a decay-rate derivation, a nuclear form-factor model, or a completed lepton-provenance account.

The handedness label in this operator is an inherited observer-level weak-channel label, not a newly derived substrate spin variable. The exposure gate below is a test object that must be supplied by the ordered-frame spinor/helicity ledger in [Angular Momentum and Spin](angular-momentum-and-spin.md) before it can count as a proof of weak handedness.

Let the six polar sites of the active quark be
$$
S=\{H_+,H_-,M_+,M_-,L_+,L_-\},
$$
with axial inventory $A_a\in\{E,P\}$ at each site $a\in S$. Let $\hat{\mathbf n}_a(R_{\mathrm{rel}})$ be the outward polar-site direction after the axial frame is placed relative to the fixed Noether swarm frame, and let $\hat{\mathbf v}$ be the quark drift direction through the local Noether Sea.

The finite-state exposure score for handedness $h\in\{L,R\}$ is
$$
\eta_a^{(h)}
=E_{\mathrm{front}}\!\left(\hat{\mathbf n}_a(R_{\mathrm{rel}})\cdot\hat{\mathbf v}\right)
E_{\mathrm{phase}}^{(h)}(a),
$$
where $E_{\mathrm{front}}=1$ on the leading side and $0$ in the wake in this first model, while $E_{\mathrm{phase}}^{(h)}$ records whether the corridor spiral can lock to the local path-history phase. The exposed weak-coupling-triad domain is then
$$
\Sigma_{\mathrm{WCT}}^{(h)}
=\{a\in S\mid \eta_a^{(h)}=1\}.
$$

This gate is the weak-sector term of the spinor-to-metric compatibility residual in [Angular Momentum and Spin](angular-momentum-and-spin.md#spinor-to-metric-compatibility-residual). If $\Sigma_{\mathrm{spin}}^{(h)}(\theta;W)$ is the exposure class predicted by the ordered-frame spinor/helicity ledger on record window $W$, the local mismatch can be written
$$
\Delta_{\mathrm{WCT}}(\theta;W)
=
d_{\Sigma}\!\left(
\Sigma_{\mathrm{WCT}}^{(L)},
\Sigma_{\mathrm{spin}}^{(L)}
\right)
+
d_{\Sigma}\!\left(
\Sigma_{\mathrm{WCT}}^{(R)},
\Sigma_{\mathrm{spin}}^{(R)}
\right)
+
\sum_{a\in S}\left(\eta_a^{(R)}\right)^2.
$$
The last term records right-handed charged-current leakage in the hard-gate model, or its declared smooth replacement if later simulations soften the exposure function. The weak sector may consume the spinor ledger only when this residual stays below tolerance using the same $\theta$ that also supplies the CKM overlap and beta-reaction provenance record.

Equivalently, the handed exposure class must be the weak consumer projection $\Sigma_{\mathrm{spin}}^{(h)}(\theta;W)=\Pi_{\mathrm{weak}}\mathcal L_\star(\theta;W,r_\star)$ of the same retained spinor-label pullback record. It is not a separately selected handedness label that can be tuned after the CKM and beta-reaction rows have been chosen.

That consumer condition inherits the row-local spinor blocker from the angular-momentum ledger. The exposure class $\Sigma_{\mathrm{spin}}^{(h)}(\theta;W)$ may be used in the weak-coupling-triad residual only if the same branch record also supplies a passed causal-writhe and gauge-control row:

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

If these rows are missing, the weak exposure model remains a validation target for handedness, not an independent derivation of left/right selection.

The beta gate is open only when $h=L$, $\lvert\Sigma_{\mathrm{WCT}}^{(L)}\rvert=3$, and the exposed sites have the down-state inventory $A_{\Sigma}=3E$. The right-handed channel is blocked at this finite-state level:
$$
\mathcal{W}_{-}^{du}\lvert d_R;c,\alpha\rangle=0,
$$
with later simulations allowed to replace this hard zero by a bounded suppression factor if the wake geometry requires a smooth exposure model.

For the active left-handed branch, write the down-like and up-like states as
$$
\lvert d_L;c,\alpha\rangle
=\lvert C_{\mathrm{IMO}};\ A_{\mathrm{sh}}=(1E,2P),\ A_{\Sigma}=3E;\ c,\alpha\rangle,
$$
$$
\lvert u_L;c,\alpha\rangle
=\lvert C_{\mathrm{IMO}};\ A_{\mathrm{sh}}=(1E,2P),\ A_{\Sigma}=3P;\ c,\alpha\rangle.
$$
Here $C_{\mathrm{IMO}}$ is the generation-I Noether swarm, $A_{\mathrm{sh}}$ is the shielded axial inventory outside the exposed triad, and $(c,\alpha)$ records the color-sector branch and axial-frame offset inherited from the weak-mixing-angle program.

The first beta exposure operator is
$$
\mathcal{W}_{-}^{du}\lvert d_L;c,\alpha\rangle
=g_{\mathrm W}\,\eta_L(R_{\mathrm{rel}},\hat{\mathbf v})\,V_{ud}\,
\lvert u_L;c,\alpha\rangle
\otimes
\lvert W^-;\Delta A_W=3(E-P)\rangle.
$$
Here $g_{\mathrm W}$ is the effective charged-corridor coupling normalization. The factor $\eta_L$ is $1$ when the finite-state gate above is open and $0$ otherwise. $V_{ud}$ is the same weak-basis to shielding-eigenstate overlap used by the CKM section; it is near unity here because both the incoming $d$ and outgoing $u$ occupy the generation-I nested shell swarm shielding tier. The $W^-$ state records the opposite transaction to the quark-side $3E\to3P$ change:
$$
\Delta Q_q=3(q_P-q_E)=6\epsilon=e,\qquad
\Delta Q_{W^-}=3(q_E-q_P)=-6\epsilon=-e.
$$

In the neutron, this operator acts on one active down-like quark while the spectator $u$ and $d$ assemblies pass through by identity. The conservative provenance stance is the transaction-payload corridor: the $W^-$ carries the charged triad transaction and phase relation, while the electron and antineutrino swarm material must still be identified from local Noether-Sea or incoming-assembly provenance in the reaction ledger.

This operator gives the first closure test for the unified route. It must fail if the same $\Sigma_{\mathrm{WCT}}$ cannot serve the left-handed gate, the $V_{ud}$ overlap, and the beta-reaction provenance record; if it changes the spectator quarks; or if a right-handed $d$ docks to the charged corridor without strong suppression.

## Geometric picture of CKM
- A down-type quark state in the **weak basis** is a weak-coupling-triad configuration living on a specific core (shielding level) but not yet diagonal in mass.
- The **mass basis** is the set of stable shielding eigenstates (Gen I/II/III). The overlap between the weak-basis state and each mass eigenstate gives the CKM elements for that row/column.
- **Suppression intuition:** Larger shielding mismatch → smaller geometric overlap. Thus $\lvert V_{ud}\rvert$ is large (same shielding tier), $\lvert V_{us}\rvert$ smaller (tri ↔ bi), $\lvert V_{ub}\rvert$ tiny (tri ↔ uni). Similar logic for the up-type rows.
- **Provenance lens:** $V_{ij}$ can be read as a coherent sum over admissible architrino transport paths from weak-state geometry to shielding eigenstate geometry; $\lvert V_{ij}\rvert^2$ is the net channel weight after interference.

### Wolfenstein parametrization (to 𝒪(λ³))

Use this as a target when deriving overlaps/angles from shielding geometry and weak-coupling-triad alignment.

With the parameters below, this Wolfenstein form reproduces the PDG magnitudes above to 𝒪(λ³).

Matrix form (Wolfenstein to 𝒪(λ³)):

$$
V \simeq
\begin{pmatrix}
1 - \tfrac12\lambda^2 & \lambda & A\lambda^3(\rho - i\eta)\\
-\lambda & 1 - \tfrac12\lambda^2 & A\lambda^2\\
A\lambda^3(1-\rho - i\eta) & -A\lambda^2 & 1
\end{pmatrix},\quad
\lambda\approx0.225,\ A\approx0.83,\ \rho\approx0.14,\ \eta\approx0.35.
$$

### Charged $W$ corridor (architrino budget, descriptive)

Think of a $W^\pm$ as a short-lived corridor built from **two neutral Noether swarms (3P/3E each)** plus a **six-charge excess** that carries net charge $\pm e$:
- $W^+$ payload: 9 positrinos + 3 electrinos (net $+6(e/6)=+e$) on the outer sites of the two cores.
- $W^-$ payload: 3 positrinos + 9 electrinos (net $-6(e/6)=-e$).

The two cores provide the massive, phase-stable bundle; the charge excess rides on their decorations. During emission/absorption the excess transfers to the quark/lepton legs, and the cores relax back to neutral sea content. Corridor sourcing is assumed forward of the translating assembly (outside its wake); core/charge numbers must close under this budget.
Ontology note ($\mathbb{A}\mathbb{A}\mathbb{A}$): this corridor is a transient bound excitation of the Noether-Sea medium assembled from local polarization + transferred Active-Triad excess, not ex nihilo particle creation.

### PDG CKM (2024 central values, magnitude)

$$
\begin{array}{c|ccc}
V_{ij} & d & s & b\\
\hline
u & 0.974 & 0.225 & 0.0037\\
c & 0.225 & 0.973 & 0.041\\
t & 0.0087 & 0.040 & 0.999
\end{array}
$$
Data note (source/uncertainty): values shown are rounded PDG 2024 central values for readability. For uncertainties and global-fit intervals, see Particle Data Group, *Review of Particle Physics* (2024), CKM quark-mixing review/table.

### $\mathbb{A}\mathbb{A}\mathbb{A}$ shielding-tier view (IMO = Inner/Middle/Outer present)

Interpretation (hypothesis): overlaps fall with shielding mismatch. Rows = up-type cores, cols = down-type cores. What “overlap” means here: the projection of a weak-basis state (weak-coupling-triad configuration) onto a mass eigenstate (shielding geometry). In practice it is an inner product of their wavefunctions/configurations; $\lvert\langle \text{mass} | \text{weak} \rangle\rvert^2$ gives the CKM entry’s probability weight. A concrete minimal functional is defined in the next section.

$$
\begin{array}{c|ccc}
V_{ij} & \text{d (IMO)} & \text{s (IM-)} & \text{b (I--)}\\
\hline
\text{u (IMO)} & \text{high overlap} & \text{medium} & \text{tiny}\\
\text{c (IM-)} & \text{medium} & \text{high} & \text{medium-low}\\
\text{t (I--)} & \text{tiny} & \text{medium-low} & \text{high}
\end{array}
$$

Legend: IMO = Inner+Middle+Outer; IM- = Inner+Middle; I-- = Inner only. Qualitative “high/medium/tiny” encodes the shielding-match hypothesis; actual values must be derived from overlap integrals.

Quantitative target (heuristic): “high” should land near 0.2–1, “medium” ~10⁻²–10⁻¹, “tiny” ~10⁻³–10⁻² to match PDG magnitudes (e.g., $\lvert V_{ud}\rvert$, $\lvert V_{us}\rvert$, $\lvert V_{ub}\rvert$).

### Using CKM in amplitudes (quick examples)

- **Rule:** For a charged-current vertex with $W$, multiply by $V_{ij}$ where $i$ is up-type (u,c,t) and $j$ is down-type (d,s,b); rates scale with $\lvert V_{ij}\rvert^2$. Neutral currents (Z/γ) are flavor-diagonal at tree level (no CKM factor at tree level); flavor-changing neutral currents appear only via loops.
- **Beta reaction (SM label: `beta decay`):** $d \to u\,e^- \bar\nu_e$ uses $V_{ud}\approx0.974$; $\mathcal{M}\propto G_F V_{ud}$, rate $\propto \lvert V_{ud}\rvert^2$ times nuclear form factors.
- **Semileptonic $B$ reaction:** $b \to c\,\ell^- \bar\nu_\ell$ uses $V_{cb}\approx0.041$; $\Gamma \propto \lvert V_{cb}\rvert^2 G_F^2 m_b^5$ (times hadronic form factor).
- **Loop/rare $b\to s$:** factors like $V_{tb} V^*_{ts}$ set the suppression and the CP phase in interference terms.

### Neutral-current and GIM recovery target

The mass-basis rotation must leave the photon and $Z$ currents flavor diagonal at tree level while placing $V_{\mathrm{CKM}}$ only in charged currents. A compact tree-level residual is
$$
\mathcal{R}_{\mathrm{FCNC}}^{\mathrm{tree}}(\theta)
=
\sum_{i\ne j}
\left(
\left|J^{\gamma,\theta}_{ij}\right|^2
\;+\;
\left|J^{Z,\theta}_{ij}\right|^2
\right),
$$
and the Standard Model recovery target is
$$
\mathcal{R}_{\mathrm{FCNC}}^{\mathrm{tree}}(\theta)=0.
$$

Loop-level flavor-changing neutral currents are not zero; they are suppressed by unitarity and mass splittings. For a benchmark such as $b\to s\gamma$, the branch must reproduce the GIM cancellation structure
$$
\mathcal{M}_{b\to s\gamma}^{\theta}
\propto
\sum_{i=u,c,t}
V_{ib}(\theta)V_{is}^{*}(\theta)\,f_i(\theta),
$$
with exact cancellation when the loop functions are equal:
$$
\sum_{i=u,c,t}V_{ib}V_{is}^{*}=0.
$$
The nonzero Standard Model amplitude is then controlled by mass-dependent differences among the $f_i$, not by a tree-level neutral weak corridor. In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, this is a provenance gate: neutral corridors may transmit phase and energy, but they must not directly change generation labels unless the event ledger includes the charged-current loop history that carries the CKM factors.

## CKM geometric-overlap minimal model

Bridge note: equations in this section keep SM unitary CKM structure, while provenance/path language is the $\mathbb{A}\mathbb{A}\mathbb{A}$ interpretive layer.

For each up-channel $i\in\{u,c,t\}$, define the down-type weak state as a superposition of down-type mass eigenstates:
$$
\lvert d_i^{(w)}\rangle=\sum_{j\in\{d,s,b\}}V_{ij}\lvert d_j^{(m)}\rangle,\qquad
V_{ij}\equiv\langle d_j^{(m)}\vert d_i^{(w)}\rangle.
$$
On the weak-coupling-triad domain $\Sigma_{\mathrm{WCT}}$, model this overlap as
$$
V_{ij}=\int_{\Sigma_{\mathrm{WCT}}}\psi_{j,m}^{d*}(x)\,\psi_{i,w}^{d}(x)\,d\mu(x),
$$
Equivalent path-sum view (interpretive): $V_{ij}=\sum_{p\in\mathcal{P}_{ij}} a_p e^{i\phi_p}$ over admissible provenance paths $p$; the overlap integral is a continuum coarse-graining of the same idea.
$a_p$ is a nonnegative transport weight (magnitude), $\phi_p$ is the path phase (holonomy/precession contribution), and admissible paths in $\mathcal{P}_{ij}$ are those that satisfy boundary matching and conservation constraints for the channel.
At the coarse-grained level, unitarity is imposed by CKM normalization conditions $\sum_j \lvert V_{ij}\rvert^2=1$ and $\sum_i \lvert V_{ij}\rvert^2=1$, equivalent to $V^\dagger V=I$.
then use the standard unitary decomposition
$$
V=R_{23}(\theta_{23})\,R_{13}(\theta_{13},\delta)\,R_{12}(\theta_{12}),
\qquad s_{ij}\equiv\sin\theta_{ij}.
$$

The comparison value of any larger generation symmetry is therefore a benchmark, not an import. The CKM/generation closure check should require one shared branch record $\theta$ to satisfy
$$
\mathcal R_{\mathrm{CKM,gen}}(\theta)
=
d_{\mathrm{unit}}\!\left(V^\dagger(\theta)V(\theta),I\right)
+d_{\mathrm{CKM}}\!\left(\{\lvert V_{ij}(\theta)\rvert\},\{\lvert V_{ij}\rvert_{\mathrm{obs}}\}\right)
+d_{\mathrm{CP}}\!\left(J(\theta),J_{\mathrm{obs}}\right)
+\max_{a\in\{0,1,2\}}
d_{\mathrm{rep}}\!\left(
\Pi_{\mathrm{gauge}}T_{\mathrm{gen}}^aA,
\Pi_{\mathrm{gauge}}A
\right)
+\mathcal R_{\mathrm{null}}(\theta).
$$
The residual accepts a candidate only when the same shielding-tier record gives unitary mixing, the observed CKM hierarchy and CP invariant, unchanged Standard Model gauge representation across the three charged-fermion tiers, and no added-channel leakage. A comparison framework that reproduces one angle, one phase, or the number three is not yet a $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation.

Assumptions introduced in this section ($\mathbb{A}\mathbb{A}\mathbb{A}$ side):
- **A1:** Generation transport is represented by a three-node chain $(1\leftrightarrow2\leftrightarrow3)$.
- **A2:** Mixing-angle magnitudes follow exponential transport-action suppression.
- **A3:** The CP phase is constrained by holonomy closure $\cos\delta=s_{13}/(s_{12}s_{23})$.

Minimal geometric reduction: the generation manifold is the three-node chain $(1\leftrightarrow2\leftrightarrow3)$ with two edge actions $(\kappa_{12},\kappa_{23})$ and one nonlocal torsion penalty $\sigma$ for direct $1\leftrightarrow3$ transport. Define
$$
s_{12}=e^{-\kappa_{12}},\qquad
s_{23}=e^{-\kappa_{23}},\qquad
s_{13}=e^{-(\kappa_{12}+\kappa_{23}+\sigma)}=\xi\,s_{12}s_{23},
\quad \xi\equiv e^{-\sigma}\in(0,1].
$$
This captures hierarchy with three real parameters for magnitudes.
Define $\xi\equiv e^{-\sigma}$ as the **Direct-Transport Suppression Factor**: it measures the penalty for bypassing the intermediate generation in direct $1\leftrightarrow3$ transport.
Provenance interpretation: $\kappa_{12}$ and $\kappa_{23}$ are nearest-neighbor transport costs on the generation chain, while $\sigma$ is the extra nonlocal cost for direct $1\leftrightarrow3$ provenance routes.

Holonomy closure postulate (no extra phase fit):
$$
\cos\delta=\xi=\frac{s_{13}}{s_{12}s_{23}}.
$$
Interpretation: the same nonlocal suppression that attenuates direct $1\leftrightarrow3$ overlap fixes the geometric holonomy angle; in provenance terms, $\delta$ is the loop phase accumulated around closed generation-path cycles.

Parameter counting (why three calibration inputs): a unitary $3\times3$ CKM matrix has four physical parameters $(\theta_{12},\theta_{23},\theta_{13},\delta)$. The closure postulate $\cos\delta=s_{13}/(s_{12}s_{23})$ removes one independent degree of freedom, leaving three independent inputs.

Calibration vs prediction in this section:
- **Calibrated inputs:** $\lvert V_{us}\rvert,\ \lvert V_{cb}\rvert,\ \lvert V_{ub}\rvert$.
- **Derived from closure + calibration:** $\delta,\ J,\ \lvert V_{td}\rvert,\ \lvert V_{ud}\rvert,\ \lvert V_{cd}\rvert,\ \lvert V_{cs}\rvert,\ \lvert V_{ts}\rvert,\ \lvert V_{tb}\rvert$.

Using PDG central magnitudes as calibration inputs
$$
s_{12}=\lvert V_{us}\rvert=0.225,\quad s_{23}=\lvert V_{cb}\rvert=0.041,\quad s_{13}=\lvert V_{ub}\rvert=0.0037,
$$
gives
$$
\kappa_{12}=1.492,\quad \kappa_{23}=3.194,\quad \sigma=0.914,\quad \xi=0.401.
$$

> **Key result (holonomy closure):** Using only $\left(\lvert V_{us}\rvert,\lvert V_{cb}\rvert,\lvert V_{ub}\rvert\right)$ as calibration inputs, the model predicts $\delta=66.35^\circ$.
> Compared with the quoted global-fit benchmark $\gamma\approx 65.9^{+3.3}_{-3.5}\,^\circ$ (standard CKM phase convention), this is within $1\sigma$.

Predictions not used in calibration:

$$
\begin{array}{l|l|l}
\text{Quantity} & \text{Model expression} & \text{Value}\\
\hline
\text{CKM phase }\delta & \arccos\!\left(\frac{s_{13}}{s_{12}s_{23}}\right) & 1.158\ \text{rad}=66.35^\circ\\
\text{Jarlskog }J & c_{12}c_{23}c_{13}^2 s_{12}s_{23}s_{13}\sin\delta & 3.04\times10^{-5}\\
\lvert V_{td}\rvert & \left\lvert s_{12}s_{23}-c_{12}c_{23}s_{13}e^{i\delta}\right\rvert & 8.45\times10^{-3}
\end{array}
$$

where $c_{ij}\equiv\sqrt{1-s_{ij}^2}$. The resulting magnitude matrix is numerically close to the PDG central hierarchy, and the phase/Jarlskog emerge from the overlap geometry rather than an independent CP fit parameter.

The basis-invariant CP check is stronger than reading off one phase convention. If $Y_u$ and $Y_d$ are the Hermitian mass-basis operators represented by the branch, define
$$
C_{\mathrm{CP}}(\theta)=[Y_u(\theta),Y_d(\theta)].
$$
The Standard Model comparison requires
$$
\det C_{\mathrm{CP}}(\theta)
\propto
-2i\,F_u(\theta)F_d(\theta)J(\theta),
$$
with
$$
F_u=(y_t-y_c)(y_t-y_u)(y_c-y_u),
\qquad
F_d=(y_b-y_s)(y_b-y_d)(y_s-y_d).
$$
Thus CP violation must vanish if any same-type Yukawa eigenvalues coincide, if any mixing angle collapses, or if the holonomy phase is removable by a basis redefinition. This gives the geometry a falsifier: the proposed CKM holonomy must reproduce $J$ as a rephasing-invariant commutator measure, not merely as a fitted angle in one matrix convention.

### Uncertainty propagation for holonomy closure

Define
$$
x \equiv \cos\delta_{\text{pred}}=\frac{s_{13}}{s_{12}s_{23}}.
$$
For input vector
$$
\mathbf{s}=(s_{12},s_{23},s_{13})^\top
$$
with covariance matrix $\Sigma_s$, use first-order propagation
$$
\sigma_x^2 = \nabla_{\mathbf{s}}x^\top\,\Sigma_s\,\nabla_{\mathbf{s}}x,
$$
with Jacobian
$$
\frac{\partial x}{\partial s_{13}}=\frac{1}{s_{12}s_{23}}=\frac{x}{s_{13}},\qquad
\frac{\partial x}{\partial s_{12}}=-\frac{s_{13}}{s_{12}^2s_{23}}=-\frac{x}{s_{12}},\qquad
\frac{\partial x}{\partial s_{23}}=-\frac{s_{13}}{s_{12}s_{23}^2}=-\frac{x}{s_{23}}.
$$

So
$$
\sigma_x^2
=
x^2\!\left[
\frac{\sigma_{13}^2}{s_{13}^2}
+\frac{\sigma_{12}^2}{s_{12}^2}
+\frac{\sigma_{23}^2}{s_{23}^2}
-2\frac{\mathrm{Cov}(s_{13},s_{12})}{s_{13}s_{12}}
-2\frac{\mathrm{Cov}(s_{13},s_{23})}{s_{13}s_{23}}
+2\frac{\mathrm{Cov}(s_{12},s_{23})}{s_{12}s_{23}}
\right].
$$
If correlations are unavailable, set off-diagonal covariances to zero.

Map to phase uncertainty via
$$
\delta_{\text{pred}}=\arccos x,\qquad
\sigma_{\delta,\text{pred}}=\frac{\sigma_x}{\sqrt{1-x^2}}
\quad(\text{radians}),
$$
valid away from $|x|\approx1$. Near boundaries, use Monte Carlo propagation with clipping $x\in[-1,1]$.

### Confidence-interval closure test

At confidence level $p$ (normal quantile $z_p$):
$$
I_x^{(p)}=
\big[\max(-1,x-z_p\sigma_x),\ \min(1,x+z_p\sigma_x)\big].
$$

If an external phase estimate $\delta_{\text{ext}}\pm\sigma_{\delta,\text{ext}}$ is available, convert it to
$$
x_{\text{ext}}=\cos\delta_{\text{ext}},\qquad
\sigma_{x,\text{ext}}=|\sin\delta_{\text{ext}}|\,\sigma_{\delta,\text{ext}}.
$$
Define residual and pull:
$$
r_x \equiv x-x_{\text{ext}},\qquad
Z_{\text{closure}}\equiv
\frac{|r_x|}{\sqrt{\sigma_x^2+\sigma_{x,\text{ext}}^2}}.
$$

**Pass criterion (closure holds at CL $p$):**
$$
Z_{\text{closure}}\le z_p.
$$
Equivalent interval criterion: $I_x^{(p)}$ overlaps $I_{x,\text{ext}}^{(p)}$.

This upgrades the CKM closure check from central-value comparison to a statistically testable confidence-interval statement.

Post-fit prediction CKM magnitude check (calibrated only on $\lvert V_{us}\rvert,\lvert V_{cb}\rvert,\lvert V_{ub}\rvert$). The remaining entries
$\{\lvert V_{ud}\rvert,\lvert V_{cd}\rvert,\lvert V_{cs}\rvert,\lvert V_{td}\rvert,\lvert V_{ts}\rvert,\lvert V_{tb}\rvert\}$ are predictions:

Calibration anchors: $\lvert V_{us}\rvert,\ \lvert V_{cb}\rvert,\ \lvert V_{ub}\rvert$.

$$
\begin{array}{c|ccc}
\text{Model }V_{ij} & d & s & b\\
\hline
u & 0.97435 & 0.22500^{*} & 0.00370^{*}\\
c & 0.22487 & 0.97353 & 0.04100^{*}\\
t & 0.00845 & 0.04029 & 0.99915
\end{array}
\qquad
\begin{array}{c|ccc}
\text{PDG 2024 }V_{ij} & d & s & b\\
\hline
u & 0.974 & 0.225 & 0.0037\\
c & 0.225 & 0.973 & 0.041\\
t & 0.0087 & 0.040 & 0.999
\end{array}
$$

$^{*}$ calibrated inputs; all other entries are post-fit predictions.

Equivalent one-line prediction:
$$
J^2=c_{12}^2c_{23}^2c_{13}^4\,s_{12}^2s_{23}^2s_{13}^2
\left(1-\frac{s_{13}^2}{s_{12}^2s_{23}^2}\right),
$$
so once $(\lvert V_{us}\rvert,\lvert V_{cb}\rvert,\lvert V_{ub}\rvert)$ are calibrated, $J$ is fixed.

## Working hypotheses
1. **Basis misalignment source:** The weak-coupling-triad orientation couples weakly to shielding-induced response axes, producing a small rotation between weak and mass bases proportional to the shielding contrast.
2. **Matrix structure:** Off-diagonal CKM elements scale as geometric transport amplitudes on the generation chain, with $s_{13}=\xi s_{12}s_{23}$ enforcing the observed hierarchy.
3. **CP phase:** The CKM phase is identified with a transport holonomy angle constrained by $\cos\delta=\xi$.

## What to compute next
- Derive $(\kappa_{12},\kappa_{23},\sigma)$ from first-principles $\mathbb{A}\mathbb{A}\mathbb{A}$ geometry (radii ratios, wake exposure, and triad transport), rather than CKM calibration.
- Prove or falsify the holonomy closure law $\cos\delta=\xi$ from explicit triad transport on the Noether-Sea background.
- Quantify scale dependence: test whether the fitted actions remain stable under renormalization-scale translation of CKM inputs.
- Simulate wake exposure to confirm/deny a forward-hemisphere weak-coupling triad; falsify the model if trailing-site coupling dominates.
- Extend the same overlap geometry to PMNS and test whether the larger lepton mixing follows from different shielding/transport actions.

## Pointers
- weak-coupling triad & shielding definitions: [assemblies/fermions/quantum-number-mapping.md](../../assemblies/fermions/quantum-number-mapping.md) (Sections on weak isospin, generation hierarchy).
- Gauge-boson couplings: [assemblies/bosons/electroweak-bosons.md](../../assemblies/bosons/electroweak-bosons.md) (W/Z corridors acting on the weak-coupling triad).

_Status: accepted closure route, not a completed derivation. The chapter now treats exposure, overlap, and holonomy as one weak-sector proof target. Provenance language below is illustrative only until a reaction ledger supplies the participating swarms, architrino inventory, corridor payload, and event residuals._

## Future Capability Illustration: Weak-Reaction Provenance

The conjectural weak-provenance material below is an illustration of what a future $\mathbb{A}\mathbb{A}\mathbb{A}$ reaction ledger should be able to record. It is not a claim that the listed rows are correct. Several rows may be replaced once weak-coupling-triad exposure, corridor sourcing, spin/helicity closure, and event-level residual routing are derived from the same substrate record.

- **Goal:** build a ledger to track weak transmutation events, ensuring charge, shielding, corridor payload, Noether swarm sourcing, and architrino counts close. Mark allowed vs. unseen channels and why.
- **Forward axial sites:** weak-coupling triad = forward three poles (IMO by radius or H/M/L energy ordering), with pro vs anti set by precession order (HML vs HLM → matter/antimatter).
- **Environmental partners:**
  - Photon: a coaxial contra-rotating pro/anti planar pair.
  - Noether Sea: hypothesized as paired pro/anti Noether swarms; a local interaction could draw neutral swarm content to participate while preserving recorded provenance.
- **Architrino budget example:** reacting with a Noether-Sea super-assembly (4 cores) × (6 architrinos/core) = 24 architrinos (12 pro, 12 anti) available transiently. This allows ephemeral W/Z corridors and other products to form while conserving counts.
- **Capability target:** a mature reaction ledger would state the corridor provenance stance, participating swarms/architrinos, candidate products, and forbidden outcomes with reasons such as shielding mismatch, insufficient flux-tube closure, or unmet charge quantization.

### Illustrative future ledger rows (speculative; not a correctness claim)

| Reactant set | Noether swarm shielding (IMO/HML) | weak-coupling-triad polarity | Sea swarms tapped? | Candidate products | Corridor(s) | Illustrative status | Reason/constraint |
| --- | --- | --- | --- | --- | --- | --- | --- |
| $d$ (IMO) → $u$ (IMO) + $W^-$ | tri → tri | E→P swap | 0 | $u + e^- + \bar\nu_e$ | $W^-$ | likely | Matches $V_{ud}$; charge quantized |
| $s$ (IM-) → $u$ (IMO) + $W^-$ | bi → tri | E→P swap | 0 | $u + e^- + \bar\nu_e$ | $W^-$ | allowed (suppressed) | shielding mismatch → $\lvert V_{us}\rvert$ |
| $b$ (I--) → $c$ (IM-) + $W^-$ | uni → bi | E→P swap | 0 | $c + \,\, \ell^- + \bar\nu$ | $W^-$ | allowed (suppressed) | shielding mismatch → $\lvert V_{cb}\rvert$ |
| $t$ (I--) → $b$ (I--) + $W^+$ | uni → uni | P→E swap | 0 | $b + W^+$ | $W^+$ | allowed (dominant) | minimal mismatch; $\lvert V_{tb}\rvert\approx1$ |
| $d$ (IMO) + Sea (4 cores) → $u$ (IMO) + $W^-$ | tri + sea | E→P swap | 4 | $u + W^-$ | $W^-$ | speculative | Sea supplies corridor, check energy budget |
| $q$ + Sea → $q$ (same) + $Z$ | any | none | 4 | $Z$ | $Z$ | speculative | Neutral corridor, no flavor change |
| $d$ (IMO) → $u$ (IMO) without $W$ | tri → tri | E→P | 0 | forbidden | — | no | Need $W$ to carry charge/spin |
| $t$ (I--; weak-active sites 1/5) → $b$ (I--; weak-active 4/2) + $W^+$ → $b + e^+ + \nu_e$ | uni → uni | P→E swap | 0–4 (corridor draw) | $b + e^+ + \nu_e$ | $W^+$ forward corridor | allowed (dominant) | CKM $\lvert V_{tb}\rvert\approx1$; forward Sea swarms assemble $W^+$; lepton leg is weak singlet (0/6) |
| $t$ (I--; 1/5) → $b$ (I--; 4/2) + $W^+$ → $b + q\bar q$ (e.g., $u\bar d$ or $c\bar s$) | uni → uni | P→E swap | 0–4 | $b + q\bar q$ | $W^+$ forward corridor | allowed (dominant; SM $W\to q\bar q$ branching $\sim67\%$) | CKM $\lvert V_{tb}\rvert\approx1$; $q\bar q$ from $W^+$ (anti-down weak-active 2/4, up 1/5); charge hand-off via corridor. Branching fraction note is an SM reference point, not an $\mathbb{A}\mathbb{A}\mathbb{A}$-derived output. |
| $e^- (6/0)$ + $e^+ (0/6)$ → $Z$ → $\nu_\mu + \bar\nu_\mu$ | leptons | WK: e 6/0, e+ 0/6 | 0–4 | $\nu_\mu + \bar\nu_\mu$ | neutral corridor ($Z$) | allowed (NC) | $Z$ neutral; couples to L/R leptons; final $\nu,\bar\nu$ weak-active 3/0, 0/3 |
| $\mu^- (Gen\ II, 6E)$ → $e^- (Gen\ I, 6E) + \bar\nu_e + \nu_\mu$ | bi → tri | E→P swap on weak-coupling triad; shed outer binary | 0–4 | $e^- + \bar\nu_e + \nu_\mu$ | $W^-$ corridor | allowed (leptonic) | Shielding drop (Gen II→I); forward $W^-$ transfers charge; stripped core re-emerges as $\nu_\mu$, Sea/anti-Sea absorbs balance ($\bar\nu_e$) |
| Neutron $n(udd)$ → Proton $p(uud)$ + $e^- + \bar\nu_e$ | tri → tri (one $d\to u$; two spectators) | E→P on one $d$ | 0–4 | $p + e^- + \bar\nu_e$ | $W^-$ forward corridor | allowed (`beta reaction`; SM label: `beta decay`) | spectators intact; $d\to u$ flip; lepton leg weak-active (6/0), $\bar\nu_e$ weak singlet (0/3) |
| $W$ corridor budget (generic) | — | — | 2 neutral cores + 6 excess decorations | returns neutral cores to Sea; transfers net $\pm e$ | charged corridor | accounting rule | $W^+$: 2 cores + (9P,3E) → +e; $W^-$: 2 cores + (3P,9E) → –e; cores end neutral |

Notes:
- “Sea swarms tapped” = how many Noether-Sea swarms are pulled transiently (if any). Default 0 unless we posit corridor assembly needs external cores.
- Populate further rows for $c\leftrightarrow s$, $b\to u$, rare loop-induced $b\to s$, and anti-quark channels (same CKM but right-handed anti-doublets).

### Provenance

- We ultimately want **provenance**, not just bookkeeping: track every architrino’s path through a reaction, so simulations can reproduce PDG observables from first principles.
- Beyond individual architrinos, track **sub-assembly provenance**: entire Noether swarms may transfer intact, detach outer binaries, dissociate, reassociate, or relock into different groupings while their architrino identities persist. Knowing which Noether swarms move as units vs fragment gives insight into allowed channels and lifetimes.
- Conservation: electrinos IN = electrinos OUT. Same for positrinos. Transmutation: reactants → products; true understanding is to map (simulate) each architrino's path.
- Point to ponder: What becomes of a spare electrino and positrino from a reaction? Do they couple and spiral inward to max curvature? Do they become highly reactive at some point?

Charge Conservation Enforcement (speculative, to simulate):
- Free $\pm\epsilon$ axial architrinos are dynamically suppressed by the strong Noether-Sea dielectric response (no long-lived spare-polarity propagation in the coarse-grained ledger).
- Any spare axial architrinos must close through one of the following channels:
  - **Product incorporation:** absorbed into a final-state assembly while preserving charge/polarity bookkeeping.
  - **Current carriage:** carried out on charged lepton/neutrino legs as part of the weak-current flow.
  - **Immediate neutral relock:** paired with opposite-polarity architrinos drawn from the Sea, routing energy into short coaxial contra-rotating pro/anti planar-pair photon modes while all participating identities remain in the ledger.
- Practical rule for simulations: treat a true long-range "escape" channel as forbidden unless a dedicated high-resolution run demonstrates otherwise.

Decision cues to log in sims: initial separation, relative phase, local Noether swarm density; pick dominant channel based on these and record energy/charge routing.

Provenance TODOs:
- Validate the explicit overlap functional in this document by reconstructing $(\kappa_{12},\kappa_{23},\sigma)$ from simulated transport trajectories.
- Build per-architrino tracking in simulations to recover CKM magnitudes and CP phase from first principles.
- Add sub-assembly tracking: which Noether swarms move intact vs. fragment in each channel; ensure charge/polarity balances close at both architrino and core levels.

## Closure Integration: CKM-Holonomy and Lepton Handoff

This chapter is the primary quark-mixing closure surface for $\mathbb{A}\mathbb{A}\mathbb{A}$.

### CKM closure target (quark sector)

Compute transport actions from first-principles triad geometry:
$$
\kappa_{ab}=
\int_{\Gamma_{ab}}
\mathcal{L}_{\mathrm{trans}}
\bigl(\rho_{\text{core}}(\mathbf{x},t),\nabla\rho_{\text{core}}(\mathbf{x},t),\text{shielding},\text{wake exposure}\bigr)\,ds,
$$
rather than fitting them from CKM inputs.

Then derive the phase via geometric holonomy:
$$
\delta=\oint_{\mathcal{C}_{123}}\omega,
$$
and test whether
$$
\cos\delta=\frac{s_{13}}{s_{12}s_{23}}
$$
is a theorem of the transport bundle, not a postulate.

### Statistical acceptance rule

For
$$
x\equiv \cos\delta_{\mathrm{pred}}=\frac{s_{13}}{s_{12}s_{23}},
$$
and covariance $\Sigma_s$ from the calibration inputs, require closure pull
$$
Z_{\mathrm{closure}}=
\frac{|x-x_{\mathrm{ext}}|}{\sqrt{\sigma_x^2+\sigma_{x,\mathrm{ext}}^2}}
$$
to satisfy $Z_{\mathrm{closure}}\le z_p$ at the chosen confidence level.

### PMNS handoff

Use the same overlap/holonomy machinery in the lepton-neutral sector with a different internal Hamiltonian and weaker exterior coupling. The detailed lepton closure model is integrated in:
- [assemblies/fermions/neutrinos.md](../../assemblies/fermions/neutrinos.md)
