# Weak Mixing and CKM

This chapter is the main bridge from Standard Model CKM language to the assembly-level weak-mixing picture. It distinguishes which ingredients are standard, which are geometric reinterpretations, and which closure relations remain postulates or fit targets. The adjacent accounts are [Weak Mixing Angle](../../assemblies/fermions/weak-mixing-angle.md), [Electroweak Bosons: Photons, W/Z, and Higgs](../../assemblies/bosons/electroweak-bosons.md), and [Quantum Number Mapping](../../assemblies/fermions/quantum-number-mapping.md).

The reader-facing idea is simple: the CKM matrix is not treated as a mysterious table pasted onto quarks. Its measured entries are interpreted here through a proposed overlap between effective bases associated with assembly geometry. The Standard Model comparison concerns the relative left-chiral rotations of the up-type and down-type sectors; identifying their common three-dimensional state space from assembly dynamics remains necessary. One organization is the weak-coupling triad that a charged weak corridor can access. The other is the shielding and mass-basis structure that fixes the externally observed generation state. The bridge asks whether those two organizations can be derived from one geometry rather than separately fitted.

This preserves the Standard Model success. CKM already works as precision bookkeeping for charged-current reactions, rates, and CP-violating interference. The $\mathbb{A}\mathbb{A}\mathbb{A}$ task is narrower and harder: recover that bookkeeping from axial-frame geometry, weak-coupling-triad exposure, shielding eigenstates, and reaction provenance without changing definitions between channels.

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
| $W^\pm$ exchange | Transient corridor assembled during interaction in the Noether sea | $\mathbb{A}\mathbb{A}\mathbb{A}$ descriptive hypothesis |

### The Cabibbo–Kobayashi–Maskawa matrix (CKM) in the Standard Model
In the Standard Model with three quark generations, charged-current flavor mixing is governed by a unitary matrix. The following equations are effective comparison targets, not substrate laws:
$$
V_{\mathrm{CKM}}=U_{uL}^\dagger U_{dL}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7b8be66f867c0c43)

It enters the Lagrangian as
$$
\mathcal{L}_{CC}=\frac{g}{2\sqrt{2}}\;\bar u_i\gamma^\mu(1-\gamma^5)V_{ij}d_j\,W^+_\mu+\text{h.c.}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f7a10c055cd7875b)

Here $g$ is the conventional weak gauge coupling and $P_L=(1-\gamma^5)/2$; the overall interaction sign is a field convention. The mismatch is between weak and mass bases. These conventions and the standard parameterization below follow the [PDG 2024 CKM review](https://pdg.lbl.gov/2024/reviews/rpp2024-rev-ckm-matrix.pdf), Eqs. (12.1)–(12.5).

Interpretation of the angles and phase (with the hierarchical view used in this document):
- $\theta_{12}$ (Cabibbo angle): dominant mixing between generations 1 and 2.
- $\theta_{23}$: next-largest mixing between generations 2 and 3.
- $\delta$: CP-violating phase; it controls interference signs and produces CP-asymmetric reaction observables.
- $\theta_{13}$ (small): direct 1↔3 mixing; in the minimal $\mathbb{A}\mathbb{A}\mathbb{A}$ reduction below it is treated as a suppressed composite channel.

Overall physics interpretation: CKM is not an extra force. It is the measurable misalignment between the quark mass basis (set by Yukawa diagonalization) and the weak SU(2) interaction basis. Experimentally, this misalignment sets charged-current transition rates via $\lvert V_{ij}\rvert^2$ and fixes CP-violating interference through rephasing-invariant combinations such as the Jarlskog invariant.

The Standard Model source of this matrix is the separate biunitary diagonalization of two generally complex Yukawa matrices. After electroweak symmetry breaking one may diagonalize
$$
y_u\mapsto D_u,\qquad y_d\mapsto D_d
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b33805adf4132204)

but the left-handed rotations need not agree:
$$
V_{\mathrm{CKM}}=U_{uL}^{\dagger}U_{dL}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b3e33e4cd1ba5a4e)

The $\mathbb{A}\mathbb{A}\mathbb{A}$ translation must recover the two left-chiral mass-sector bases and their charged-current identification; a weak-basis/mass-basis overlap representation must implement that same identification. If the assembly model fits CKM entries without first defining those two bases from the same shielding and weak-coupling-triad record, it has only reproduced a table of numbers.

### How to read CKM rows (first-year guide)
Mass eigenstates are the definite-mass quark states $(u,c,t)$ and $(d,s,b)$. A charged-current interaction does not couple an up-type quark to only one down-type mass eigenstate; it couples to a superposition weighted by one CKM row:
$$
\lvert d^{(w)}_u\rangle=V_{ud}\lvert d\rangle+V_{us}\lvert s\rangle+V_{ub}\lvert b\rangle
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ad80150ad80f4e50)

$$
\lvert d^{(w)}_c\rangle=V_{cd}\lvert d\rangle+V_{cs}\lvert s\rangle+V_{cb}\lvert b\rangle
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1f85f1480ff6459f)

$$
\lvert d^{(w)}_t\rangle=V_{td}\lvert d\rangle+V_{ts}\lvert s\rangle+V_{tb}\lvert b\rangle
$$

[View →](../../../../../equation-mapping.html#corpus-equation-35e15681477181d8)

For a channel dominated by one charged-current CKM factor, the rate contains $\lvert V_{ij}\rvert^2$ with the appropriate kinematic and hadronic factors. Multiple interfering amplitudes require their coherent CKM products. The kets here define a row-coefficient convention; conjugate amplitudes and conjugate field-state conventions must be transformed consistently. This is the precise meaning of flavor mixing. Provenance lens (interpretive): in $\mathbb{A}\mathbb{A}\mathbb{A}$, $\lvert V_{ij}\rvert^2$ is the observed weight of allowed architrino transport histories that connect weak-basis channel $i$ to mass-basis channel $j$.

In the $\mathbb{A}\mathbb{A}\mathbb{A}$ shielding language used below, these three terms correspond to overlap with down-type states at support vectors $(1,1,1)$, $(1,1,0)$, and $(1,0,0)$. Large CKM entries indicate strong geometric overlap; small entries indicate shielding/transport mismatch. The component order follows the persistent binary indices and does not encode a radius order.

So each row should be read as a routing ledger. The weak interaction opens a charged corridor in one exposed basis, but the detector names the outgoing assembly in the mass basis. CKM entries measure how much of the exposed corridor lands in each mass-basis channel. That is why a high-value $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation cannot stop at the matrix values; it must also explain the two bases whose mismatch the matrix records.

### Weak mixing in $\mathbb{A}\mathbb{A}\mathbb{A}$ terms
- In the Standard Model comparison, charged weak currents connect up-type and down-type quark flavors; strong and electromagnetic vertices preserve quark flavor.
- Each quark has two “bases”: a **weak basis** (set by the weak-coupling triad) and a **mass basis** (set by shielding and medium-dressed inertial response). These bases aren’t aligned.
- When a W acts, it “sees” the weak basis; the chance to land in a particular mass state is set by the overlap between these bases → the CKM numbers.
- Big overlaps (similar shielding) give big CKM entries; mismatched shielding gives tiny entries.

- In this $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology, a $W^\pm$ is not created ex nihilo and is not treated as a preexisting free field quantum; it is a transient “corridor” that associates during a weak interaction:
  - Candidate mechanism: local sea content and the participating triad exchange a net $\pm e$ transaction. The two-neutral-braid and six-excess-charge inventory proposed below is unresolved; its alternative counts cannot yet define one assembly mechanism.
  - Geometrically it’s a short-lived, high-tension bundle (see [assemblies/bosons/electroweak-bosons.md](../../assemblies/bosons/electroweak-bosons.md)) that ferries charge/phase between source and sink.
  - Corridor instability is a proposed origin of a finite lifetime; no instability calculation or Standard Model W width has been recovered here. A low-energy virtual W contribution is not an on-shell W with that lifetime.
  - So: it is a transient, bound excitation of the Noether sea from reconfiguration of participants' wakes and axial structure, not from a standing background field.

## Minimal premises
- **Generations = candidate shielding level:** Gen I uses support vector $(1,1,1)$ for $(u,d)$, Gen II uses $(1,1,0)$ for $(c,s)$, and Gen III uses $(1,0,0)$ for $(t,b)$. These vectors record occupancy of persistent indices and do not assign a braid-taxonomy member or a radius order.
- **Weak basis = weak-coupling triad:** The proposed three-site exposure must recover the action of effective weak SU(2) on left-chiral doublets. Three sites do not themselves define an SU(2) representation, and identifying primitive polarity with $T_3$ requires a representation map. This basis does not align with the shielding (mass) basis once cores differ; the angle-side geometric hypothesis is summarized in [Weak Mixing Angle](../../assemblies/fermions/weak-mixing-angle.md).
- **Mass basis = shielding eigenstates:** Noether braid shielding, a closed internal causal-history ledger, and Noether sea coupling set the externally exposed inertial response; each generation defines a distinct mass eigenstate per flavor type (up-type, down-type), using the same shielding ladder discussed in [Particle Masses: Emergent Inertia in the Noether sea](../../assemblies/particle-masses.md).

Weak-coupling-triad exposure (working hypothesis): in translation, the three **forward** polar sites are more exposed (outside the particle’s own wake), so they form the weak-coupling triad; trailing sites are likely shielded by the wake/slipstream. Needs simulation confirmation. Forward bias also fits the $W$-corridor picture: a transient corridor would form into the Noether sea ahead of the translating quark group, where quark braids are unshadowed and available to couple.

Noether sea sourcing note: in $\mathbb{A}\mathbb{A}\mathbb{A}$ there is no empty background here, only the Noether sea. Weak reconfigurations (e.g., heavy → light generation) may draw assembly parts from the Sea; treat any net architrino “gain” during heavy-to-light weak dissociation as speculative until energy/number flow is explicitly budgeted.

Left/right coupling note (SM statement): the charged current contains left-chiral quark fields and their charge-conjugate antiquark components; right-chiral quark fields are weak SU(2) singlets. Chirality is not helicity for a massive particle: a state of either helicity can contain a left-chiral component.

Left/right coupling note ($\mathbb{A}\mathbb{A}\mathbb{A}$ geometric test): for the inherited left-channel exposure class the weak-coupling triad should face forward, while for the inherited right-channel exposure class it should rotate into the wake/shield. This is not yet a standalone helicity derivation; helicity language is available only when a propagation or momentum-axis record has been supplied by the same branch. Candidate chiral-selection mechanism ($\mathbb{A}\mathbb{A}\mathbb{A}$ hypothesis): in the right-channel exposure class, the weak-coupling triad is rotated into the particle's own wake/slipstream. A charged $W$ corridor cannot dock onto a weak-coupling triad in that hidden coupling posture, which is intended to model suppression of the right-chiral field component, not sterility of every positive-helicity massive fermion.

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
\text{weak-reaction provenance}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-61410d70c0cdf98d)

This is stronger than a loose analogy among chapters, but it is still a derivation target. The accepted synthesis is that weak `V-A` selection, flavor mixing, and weak-corridor bookkeeping are three readouts of the same exposure problem. To close the route, the corpus needs one operator-level model that does four jobs without changing definitions between them:

- identify which polar sites are exposed to a charged corridor for a moving assembly,
- suppress right-handed charged-current docking in the same geometry that allows left-handed docking,
- define the weak-basis states whose overlap with shielding eigenstates yields $V_{\mathrm{CKM}}$ and $U_{\mathrm{PMNS}}$,
- and specify whether the $W^\pm$ corridor carries only the charged transaction payload or also pro/anti Noether braid provenance for the outgoing lepton assemblies.

The minimal mathematical object is therefore not only a mixing matrix. It is a coupled tuple:
$$
\bigl(R_{\mathrm{rel}},\alpha,c;\ \Sigma_{\mathrm{WCT}};\ \mathcal{W}_{\pm};\ \mathcal{P}_{ij}\bigr)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-890da6007ef7d954)

where $R_{\mathrm{rel}}$ records axial-frame orientation relative to the fixed Noether braid frame, $(\alpha,c)$ record the branch and color-sector data, $\Sigma_{\mathrm{WCT}}$ is the weak-coupling-triad domain, $\mathcal{W}_{\pm}$ is the charged-corridor action on that domain, and $\mathcal{P}_{ij}$ is the admissible provenance-path set used in the overlap sum. The first proof step is to define these objects for one controlled channel, such as $d\to u$ in free-neutron beta reaction, before trying to claim the full CKM or PMNS hierarchy.

## First beta exposure operator: $d\to u$

This first model is deliberately local. It defines the operator-level exposure gate for one generation-I down-type quark in free-neutron beta reaction. It is not yet a reaction-rate derivation, a nuclear form-factor model, or a completed lepton-provenance account.

The handedness label in this operator is an inherited observer-level weak-channel label, not a newly derived substrate spin variable. The exposure gate below is a test object that must be supplied by the ordered-frame spinor/helicity ledger in [Angular Momentum and Spin](angular-momentum-and-spin.md) before it can count as a proof of weak handedness.

Let the six polar sites of the active quark be
$$
S=\{H_+,H_-,M_+,M_-,L_+,L_-\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3641b9806abb98dd)

with axial inventory $A_a\in\{E,P\}$ at each site $a\in S$, where $E$ and $P$ denote negative and positive primitive polarities. The retained site-pair names denote persistent indices in this model, not a current radius ordering. Let $\hat{\mathbf n}_a(R_{\mathrm{rel}})$ be the outward polar-site direction after the axial frame is placed relative to the fixed Noether braid frame, and let $\hat{\mathbf v}$ be the quark group-velocity direction through the local Noether sea.

The finite-state exposure score for handedness $h\in\{L,R\}$ is
$$
\eta_a^{(h)}
=E_{\mathrm{front}}\!\left(\hat{\mathbf n}_a(R_{\mathrm{rel}})\cdot\hat{\mathbf v}\right)
E_{\mathrm{phase}}^{(h)}(a)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c10bd549d505fa67)

This hard-gate model is restricted to nonzero group velocity and nongrazing site directions. Set $E_{\mathrm{front}}=1$ for positive dot product and $0$ for negative dot product, and let $E_{\mathrm{phase}}^{(h)}\in\{0,1\}$ record candidate phase locking. Rest and zero-dot-product configurations require a separate exposure rule. Even on the stated domain, three forward sites produce a triad only if all three phase gates pass. The exposed weak-coupling-triad domain is then
$$
\Sigma_{\mathrm{WCT}}^{(h)}
=\{a\in S\mid \eta_a^{(h)}=1\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3f1bb375d69f696d)

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
\sum_{a\in S}\left(\eta_a^{(R)}\right)^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-72395bfa90671f75)

For this finite six-site model take $d_\Sigma(A,B)=|A\mathbin{\triangle}B|/6$, with the symmetric difference counting mismatched site memberships. The last term records leakage assigned to the right-channel field label in the hard-gate model; a smooth replacement must define its range, normalization, and exposure-set rule. The weak sector may consume the spinor ledger only when this residual stays below tolerance using the same $\theta$ that also supplies the CKM overlap and beta-reaction provenance record.

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
\varepsilon_{\mathbf J}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2abd51cb0569849e)

If these rows are missing, the weak exposure model remains a validation target for handedness, not an independent derivation of left/right selection.

The beta gate is open only when $h=L$, $\lvert\Sigma_{\mathrm{WCT}}^{(L)}\rvert=3$, and the exposed sites have the down-state inventory $A_{\Sigma}=3\epsilon_-$. The right-handed channel is blocked at this finite-state level:
$$
\mathcal{W}_{-}^{du}\lvert d_R;c,\alpha\rangle=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8a7cfe3867b7abaf)

This zero is imposed by the finite-state gate, so reproducing it with that gate does not derive chiral selection. An independent path-history calculation must supply the exposure before either a hard zero or a quantified effective suppression can be claimed.

For the active left-handed branch, write the down-like and up-like states as
$$
\lvert d_L;c,\alpha\rangle
=\lvert C_{(1,1,1)};\ A_{\mathrm{sh}}=(2\epsilon_+ + 1\epsilon_-),\ A_{\Sigma}=3\epsilon_-;\ c,\alpha\rangle
$$

[View →](../../../../../equation-mapping.html#corpus-equation-aef2661c665e6d0e)

$$
\lvert u_L;c,\alpha\rangle
=\lvert C_{(1,1,1)};\ A_{\mathrm{sh}}=(2\epsilon_+ + 1\epsilon_-),\ A_{\Sigma}=3\epsilon_+;\ c,\alpha\rangle
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1a617773e8655676)

Here $C_{(1,1,1)}$ is the candidate generation-I Noether-braid record with all three persistent support indices occupied, $A_{\mathrm{sh}}$ is the shielded axial inventory outside the exposed triad, and $(c,\alpha)$ records the color-sector branch and axial-frame offset inherited from the weak-mixing-angle program. The support vector does not identify a taxonomy member.

The first beta exposure operator is
$$
\mathcal{W}_{-}^{du}\lvert d_L;c,\alpha\rangle
=g_{\mathrm W}\,\eta_L(R_{\mathrm{rel}},\hat{\mathbf v})\,V_{ud}\,
\lvert u_L;c,\alpha\rangle
\otimes
\lvert W^-;\Delta A_W=3(\epsilon_- - \epsilon_+)\rangle
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1745200abd863634)

Here $g_{\mathrm W}$ is the effective charged-corridor coupling normalization. The factor $\eta_L$ is $1$ when the finite-state gate above is open and $0$ otherwise. $V_{ud}$ is the same weak-basis to shielding-eigenstate overlap used by the CKM section; its observed near-unity magnitude is a calibration target. The common Generation-I support vector $(1,1,1)$ does not determine the overlap of two fully specified states. The $W^-$ label denotes a transaction channel, virtual in the low-energy Standard Model beta amplitude; it is not a factorized on-shell W product. The quark-side $3\epsilon_-\to3\epsilon_+$ inventory change must exchange three departing negative architrinos for three arriving positive architrinos, preserving each primitive identity and polarity. The opposite net transaction is:
$$
\Delta Q_q=3(\epsilon_+-\epsilon_-)=6\epsilon=e,\qquad
\Delta Q_{W^-}=3(\epsilon_- - \epsilon_+)=-6\epsilon=-e
$$

[View →](../../../../../equation-mapping.html#corpus-equation-eeab2194da42da6f)

In a one-active-quark weak-vertex approximation, this operator leaves the spectator quark flavors unchanged. The bound neutron and proton still require strong-interaction rearrangement and hadronic matrix elements; identity on spectator flavor labels is not unchanged spectator motion or assembly history. The conservative provenance stance is the transaction-payload corridor: the $W^-$ carries the charged triad transaction and phase relation, while the electron and antineutrino braid material must still be identified from local Noether sea or incoming-assembly provenance in the reaction ledger.

This operator gives the first closure test for the unified route. It must fail if the same $\Sigma_{\mathrm{WCT}}$ cannot serve the left-handed gate, the $V_{ud}$ overlap, and the beta-reaction provenance record; if it violates the declared spectator-flavor approximation; or if the independently recovered right-chiral current fails the effective suppression target.

## Geometric picture of CKM
- A down-type quark state in the **weak basis** is a weak-coupling-triad configuration living on a specific core (shielding level) but not yet diagonal in mass.
- The **mass basis** is the set of stable shielding eigenstates (Gen I/II/III). The overlap between the weak-basis state and each mass eigenstate gives the CKM elements for that row/column.
- **Suppression intuition:** Larger shielding mismatch → smaller geometric overlap. Thus $\lvert V_{ud}\rvert$ is large (same shielding tier), $\lvert V_{us}\rvert$ smaller (tri ↔ bi), $\lvert V_{ub}\rvert$ tiny (tri ↔ uni). Similar logic for the up-type rows.
- **Provenance lens:** $V_{ij}$ can be read as a coherent sum over admissible architrino transport paths from weak-state geometry to shielding eigenstate geometry; $\lvert V_{ij}\rvert^2$ is the net channel weight after interference.

### Wolfenstein parametrization (to $\mathcal{O}(\lambda^3)$)

Use this as a target when deriving overlaps/angles from shielding geometry and weak-coupling-triad alignment.

The matrix below retains terms through cubic order with an $\mathcal O(\lambda^4)$ remainder. Its rounded parameters illustrate the hierarchy; this truncated matrix is not exactly unitary, and unbarred $(\rho,\eta)$ must not be substituted for global-fit $(\bar\rho,\bar\eta)$ without the standard conversion.

Matrix form (Wolfenstein to $\mathcal{O}(\lambda^3)$):

$$
V \simeq
\begin{pmatrix}
1 - \tfrac12\lambda^2 & \lambda & A\lambda^3(\rho - i\eta)\\
-\lambda & 1 - \tfrac12\lambda^2 & A\lambda^2\\
A\lambda^3(1-\rho - i\eta) & -A\lambda^2 & 1
\end{pmatrix},\quad
\lambda\approx0.225,\ A\approx0.83,\ \rho\approx0.14,\ \eta\approx0.35
$$

[View →](../../../../../equation-mapping.html#corpus-equation-839679e79f1c8fbc)

### Charged $W$ corridor (architrino budget, descriptive)

The inherited corridor proposal combines two different inventories: two neutral six-architrino braids contain twelve architrinos, so adding six same-polarity architrinos would yield eighteen. The following proposed payloads instead each contain twelve architrinos:
- $W^+$ payload: $9\epsilon_+ + 3\epsilon_-$ (net $+6(e/6)=+e$) on the declared exposed sites of the two cores.
- $W^-$ payload: $3\epsilon_+ + 9\epsilon_-$ (net $-6(e/6)=-e$).

The twelve-site counts could represent replacement of three polarities by exchanging identities, or a payload separate from neutral cores; neither interpretation is established here. A complete reaction history must select one inventory, identify the incoming and outgoing primitives, and derive any effective mass, phase stability, lifetime, and relaxation. Forward sourcing and a transient sea excitation remain hypotheses. Net charge arithmetic alone does not close either the particle count or the dynamics.

### CKM Benchmark (Rounded Magnitudes)

$$
\begin{array}{c|ccc}
V_{ij} & d & s & b\\
\hline
u & 0.974 & 0.225 & 0.0037\\
c & 0.225 & 0.973 & 0.041\\
t & 0.0087 & 0.040 & 0.999
\end{array}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6de36216d03e5897)

These retained rounded values are an illustrative benchmark, not an exact PDG global-fit dataset. Their provenance does not support precision residuals; a statistical comparison requires dated inputs, extraction assumptions, and covariance from a named fit.

### $\mathbb{A}\mathbb{A}\mathbb{A}$ indexed shielding-support view

Interpretation (hypothesis): overlaps fall with shielding mismatch. Rows = up-type cores, cols = down-type cores. What “overlap” means here: the projection of a weak-basis state (weak-coupling-triad configuration) onto a mass eigenstate (shielding geometry). In practice it is an inner product of their wavefunctions/configurations; $\lvert\langle \text{mass} | \text{weak} \rangle\rvert^2$ gives the CKM entry’s probability weight. A concrete minimal functional is defined in the next section.

$$
\begin{array}{c|ccc}
V_{ij} & \text{d }(1,1,1) & \text{s }(1,1,0) & \text{b }(1,0,0)\\
\hline
\text{u }(1,1,1) & \text{high overlap} & \text{medium} & \text{tiny}\\
\text{c }(1,1,0) & \text{medium} & \text{high} & \text{medium-low}\\
\text{t }(1,0,0) & \text{tiny} & \text{medium-low} & \text{high}
\end{array}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e2ea8ae41177c961)

Legend: $(1,1,1)$, $(1,1,0)$, and $(1,0,0)$ are candidate occupancy vectors on persistent support indices $1,2,3$. They do not encode inner/middle/outer radius roles. Qualitative “high/medium/tiny” encodes the shielding-match hypothesis; actual values must be derived from overlap integrals.

The qualitative words are relative descriptions, not uniform numerical bins: the entry labeled “medium” for $|V_{us}|$ is about $0.225$ in the retained benchmark. Each predicted overlap must be compared with its own channel value and uncertainty.

### Using CKM in amplitudes (quick examples)

- **Rule:** For the charged-current orientation written in the Lagrangian, use $V_{ij}$ with $i$ up-type and $j$ down-type; the Hermitian-conjugate vertex uses $V_{ij}^*$. A single-factor amplitude gives rates proportional to $\lvert V_{ij}\rvert^2$. Neutral currents ($Z/\gamma$) are flavor-diagonal at tree level (no CKM factor at tree level); flavor-changing neutral currents appear only via loops.
- **Beta reaction (SM label: `beta decay`):** $d \to u\,e^- \bar\nu_e$ uses $V_{ud}\approx0.974$; $\mathcal{M}\propto G_F V_{ud}$, rate $\propto \lvert V_{ud}\rvert^2$ times nuclear form factors.
- **Semileptonic $B$ reaction:** $b \to c\,\ell^- \bar\nu_\ell$ uses $V_{cb}\approx0.041$; $\Gamma \propto \lvert V_{cb}\rvert^2 G_F^2 m_b^5$ in an inclusive heavy-quark approximation, including phase space and QCD corrections; exclusive channels require their own form factors.
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
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-61c1fc60661a2dd6)

and the Standard Model recovery target is
$$
\mathcal{R}_{\mathrm{FCNC}}^{\mathrm{tree}}(\theta)=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-07fa5f8de8678db0)

Loop-level flavor-changing neutral currents are not zero; they are suppressed by unitarity and mass splittings. For a benchmark such as $b\to s\gamma$, the branch must reproduce the GIM cancellation structure
$$
\mathcal{M}_{b\to s\gamma}^{\theta}
\propto
\sum_{i=u,c,t}
V_{ib}(\theta)V_{is}^{*}(\theta)\,f_i(\theta)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0d900c75c6325d3a)

with exact cancellation when the loop functions are equal:
$$
\sum_{i=u,c,t}V_{ib}V_{is}^{*}=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4238bf980a5a0ed4)

The nonzero Standard Model amplitude is then controlled by mass-dependent differences among the $f_i$, not by a tree-level neutral weak corridor. In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, this is a provenance gate: the effective neutral current must satisfy the stated Standard Model cancellation structure. A substrate reaction history need not contain literal Standard Model loop particles, but its coarse-grained amplitude must recover the CKM-weighted mass differences.

## CKM geometric-overlap minimal model

Bridge note: equations in this section keep SM unitary CKM structure, while provenance/path language is the $\mathbb{A}\mathbb{A}\mathbb{A}$ interpretive layer.

For each up-channel $i\in\{u,c,t\}$, define the down-type weak state as a superposition of down-type mass eigenstates:
$$
\lvert d_i^{(w)}\rangle=\sum_{j\in\{d,s,b\}}V_{ij}\lvert d_j^{(m)}\rangle,\qquad
V_{ij}\equiv\langle d_j^{(m)}\vert d_i^{(w)}\rangle
$$

[View →](../../../../../equation-mapping.html#corpus-equation-165d504b5f1278b7)

On the weak-coupling-triad domain $\Sigma_{\mathrm{WCT}}$, model this overlap as
$$
V_{ij}=\int_{\Sigma_{\mathrm{WCT}}}\psi_{j,m}^{d*}(x)\,\psi_{i,w}^{d}(x)\,d\mu(x)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8b533fb1f4dbfd8d)

Candidate path-sum view (interpretive): $V_{ij}=\sum_{p\in\mathcal{P}_{ij}} a_p e^{i\phi_p}$ over admissible provenance paths $p$; its equivalence to the integral requires a derived measure, amplitudes, phases, and coarse-graining map. $a_p$ is a nonnegative transport weight (magnitude), $\phi_p$ is the path phase (holonomy/precession contribution), and admissible paths in $\mathcal{P}_{ij}$ are those that satisfy boundary matching and conservation constraints for the channel. The integral yields a unitary matrix only when the two families are complete orthonormal bases of the same three-dimensional subspace for one positive inner product. A restricted exposure domain can lose amplitude outside that subspace. Row and column norm sums equal to one are necessary but insufficient: the matrix with all entries $1/\sqrt3$ satisfies both yet has $V^\dagger V$ equal to the all-ones matrix. Full orthogonality, $\sum_iV_{ij}^*V_{ik}=\delta_{jk}$, is required. Once unitarity holds, quark-field rephasings allow the standard decomposition
$$
V=R_{23}(\theta_{23})\,R_{13}(\theta_{13},\delta)\,R_{12}(\theta_{12}),
\qquad s_{ij}\equiv\sin\theta_{ij}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4237f713a0df97de)

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
+\mathcal R_{\mathrm{null}}(\theta)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e779845e1f2a805d)

All distances in this residual must be nonnegative and normalized to declared scales, with calibrated tolerances and input covariance; $\mathcal R_{\mathrm{null}}$ measures leakage into explicitly listed omitted channels. The candidate maps $T_{\mathrm{gen}}^a$ compare the three generation tiers while $\Pi_{\mathrm{gauge}}$ extracts their effective gauge representation; their existence does not postulate an extra generation symmetry. A small residual is a necessary consistency check, not a derivation. It accepts a candidate at its declared tolerances only when the same shielding-tier record gives unitary mixing, the observed CKM hierarchy and CP invariant, unchanged Standard Model gauge representation across the three charged-fermion tiers, and no added-channel leakage. A comparison framework that reproduces one angle, one phase, or the number three is not yet a $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation.

Assumptions introduced in this section ($\mathbb{A}\mathbb{A}\mathbb{A}$ side):
- **H1:** Generation transport is represented by a three-node chain $(1\leftrightarrow2\leftrightarrow3)$.
- **H2:** Mixing-angle magnitudes follow exponential transport-action suppression.
- **H3:** The CP phase is constrained by holonomy closure $\cos\delta=s_{13}/(s_{12}s_{23})$.

Minimal geometric reduction: the generation manifold is the three-node chain $(1\leftrightarrow2\leftrightarrow3)$ with two edge actions $(\kappa_{12},\kappa_{23})$ and one nonlocal torsion penalty $\sigma$ for direct $1\leftrightarrow3$ transport. Define
$$
s_{12}=e^{-\kappa_{12}},\qquad
s_{23}=e^{-\kappa_{23}},\qquad
s_{13}=e^{-(\kappa_{12}+\kappa_{23}+\sigma)}=e^{-\sigma}\,s_{12}s_{23},
\quad e^{-\sigma}\in(0,1]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-58898312379d9609)

Take dimensionless $\kappa_{12},\kappa_{23},\sigma\ge0$ on the finite-action domain; the chain and exponential suppression are model assumptions. This parameterizes a restricted hierarchy with three real parameters for magnitudes. $e^{-\sigma}$ is the **Direct-Transport Suppression Factor** for bypassing the intermediate generation in direct $1\leftrightarrow3$ transport. Provenance interpretation: $\kappa_{12}$ and $\kappa_{23}$ are nearest-neighbor transport costs on the generation chain, while $\sigma$ is the extra nonlocal cost for direct $1\leftrightarrow3$ provenance routes.

Holonomy closure postulate (no extra phase fit):
$$
\cos\delta=e^{-\sigma}=\frac{s_{13}}{s_{12}s_{23}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ccc19aa7c2baec0f)

Conditional on the postulate, the suppression fixes $\cos\delta$, giving $\delta=\pm\arccos(e^{-\sigma})$ modulo $2\pi$. A choice of transport orientation fixing the physical CP sign is additional information. Interpreting that phase as a loop holonomy requires a defined connection; it has not been derived from suppression.

Parameter counting (why three calibration inputs): a unitary $3\times3$ CKM matrix has four physical parameters $(\theta_{12},\theta_{23},\theta_{13},\delta)$. The closure postulate $\cos\delta=s_{13}/(s_{12}s_{23})$ removes one independent degree of freedom, leaving three continuous inputs and a discrete CP-sign branch. This reduction is conditional on the postulate; the three fitted transport parameters remain a reparameterization until independently computed from geometry.

Calibration vs prediction in this section:
- **Calibrated inputs:** $\lvert V_{us}\rvert,\ \lvert V_{cb}\rvert,\ \lvert V_{ub}\rvert$.
- **Conditional on closure + calibration:** $\cos\delta,\ |J|,\ \lvert V_{td}\rvert,\ \lvert V_{ud}\rvert,\ \lvert V_{cd}\rvert,\ \lvert V_{cs}\rvert,\ \lvert V_{ts}\rvert,\ \lvert V_{tb}\rvert$.

For the retained rounded example use the following leading-order angle calibration. Exact calibration instead has $c_{13}=\sqrt{1-|V_{ub}|^2}$, $s_{12}=|V_{us}|/c_{13}$ and $s_{23}=|V_{cb}|/c_{13}$; their covariance must be transformed as well:
$$
s_{12}\approx\lvert V_{us}\rvert=0.225,\quad s_{23}\approx\lvert V_{cb}\rvert=0.041,\quad s_{13}=\lvert V_{ub}\rvert=0.0037
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a1f26ada8d78b598)

gives
$$
\kappa_{12}=1.492,\quad \kappa_{23}=3.194,\quad \sigma=0.914,\quad e^{-\sigma}=0.401
$$

[View →](../../../../../equation-mapping.html#corpus-equation-abbd720bd46fe80f)

> **Conditional numerical example:** The inherited calculation quotes $\delta=66.35^\circ$ on the positive-CP branch. This is an approximate result of the closure postulate and rounded calibration, not a first-principles phase derivation. The unitarity-triangle angle $\gamma=\arg[-V_{ud}V_{ub}^*/(V_{cd}V_{cb}^*)]$ is a different quantity; comparing it directly with $\delta$ cannot establish a one-standard-deviation agreement. A valid test computes the same invariant from the model and a dated independent likelihood.

Retained approximate outputs of the calibrated positive-CP branch (the displayed expressions define the calculation; the inherited rounding is not precision evidence):

$$
\begin{array}{l|l|l}
\text{Quantity} & \text{Model expression} & \text{Value}\\
\hline
\text{CKM phase }\delta & \arccos\!\left(\frac{s_{13}}{s_{12}s_{23}}\right) & 1.158\ \text{rad}=66.35^\circ\\
\text{Jarlskog }J & c_{12}c_{23}c_{13}^2 s_{12}s_{23}s_{13}\sin\delta & 3.04\times10^{-5}\\
\lvert V_{td}\rvert & \left\lvert s_{12}s_{23}-c_{12}c_{23}s_{13}e^{i\delta}\right\rvert & 8.45\times10^{-3}
\end{array}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4c92118f14fe1099)

where $c_{ij}\equiv\sqrt{1-s_{ij}^2}$. The matrix illustrates the observed hierarchy. The phase magnitude and $|J|$ follow from an assumed closure relation; their origin in assembly overlap geometry and the CP sign remain unproved. The same global fit can use both calibration and comparison observables, so its entries are not automatically independent tests.

The basis-invariant CP check is stronger than reading off one phase convention. Here $Y_u=y_u y_u^\dagger$ and $Y_d=y_d y_d^\dagger$ denote Hermitian operators on one common left-chiral flavor space, not the generally complex Yukawa matrices $y_u,y_d$ themselves. Their spectra are squared Yukawa singular values. In that common space define
$$
C_{\mathrm{CP}}(\theta)=[Y_u(\theta),Y_d(\theta)]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d4090a6228c26c78)

In the up-diagonal basis, take $Y_d=V\operatorname{diag}(y_d,y_s,y_b)V^\dagger$ and $J=\operatorname{Im}(V_{ud}V_{cs}V_{us}^*V_{cd}^*)$. The determinant identity then fixes the sign:
$$
\det C_{\mathrm{CP}}(\theta)
=
2i\,F_u(\theta)F_d(\theta)J(\theta)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c6753645420b5fa8)

Here the scalar labels $y_u,y_c,y_t$ and $y_d,y_s,y_b$ in the following products denote eigenvalues of those Hermitian operators, distinct from the matrix notation used for the original Yukawa couplings:
$$
F_u=(y_t-y_c)(y_t-y_u)(y_c-y_u),
\qquad
F_d=(y_b-y_s)(y_b-y_d)(y_s-y_d)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2f0031504b7007c0)

Thus this quark-sector CP-odd invariant vanishes when any same-type spectra coincide, a required mixing sine or cosine vanishes, or the physical phase is removable. Degeneracy permits additional basis rotations that can remove physical CKM CP violation even when a conventionally displayed $J$ is nonzero; the full invariant includes the spectral factors. This gives the geometry a falsifier: the proposed transport must recover the rephasing-invariant quartet $J$ together with the full spectral commutator invariant, rather than only an angle in one matrix convention.

### Uncertainty propagation for holonomy closure

Define
$$
x \equiv \cos\delta_{\text{pred}}=\frac{s_{13}}{s_{12}s_{23}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7bcfbc6155d16954)

For input vector
$$
\mathbf{s}=(s_{12},s_{23},s_{13})^\top
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5b3db1c498241e5c)

with covariance matrix $\Sigma_s$, use first-order propagation
$$
\sigma_x^2 = \nabla_{\mathbf{s}}x^\top\,\Sigma_s\,\nabla_{\mathbf{s}}x
$$

[View →](../../../../../equation-mapping.html#corpus-equation-559dae22e5b2e7df)

with Jacobian
$$
\frac{\partial x}{\partial s_{13}}=\frac{1}{s_{12}s_{23}}=\frac{x}{s_{13}},\qquad
\frac{\partial x}{\partial s_{12}}=-\frac{s_{13}}{s_{12}^2s_{23}}=-\frac{x}{s_{12}},\qquad
\frac{\partial x}{\partial s_{23}}=-\frac{s_{13}}{s_{12}s_{23}^2}=-\frac{x}{s_{23}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8c3dc77499c2440a)

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
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-44149cd8a5906d8a)

If correlations are unavailable, zero off-diagonal covariances are an explicit independence approximation, not an inferred property of the data. Report sensitivity to admissible correlations or obtain the joint likelihood before assigning confidence.

Map to phase uncertainty via
$$
\delta_{\text{pred}}=\arccos x,\qquad
\sigma_{\delta,\text{pred}}=\frac{\sigma_x}{\sqrt{1-x^2}}
\quad(\text{radians})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f82449f05dd53124)

valid for sufficiently small uncertainties away from $|x|\approx1$. The nonnegative-action model requires $0<x\le1$. Near its boundary, propagate the joint likelihood and retain out-of-domain draws as evidence against the postulate; clipping them changes the distribution. A conditioned or truncated model must be named and its coverage assessed separately.

### Confidence-interval closure test

Under a locally Gaussian approximation, take $z_p=\Phi^{-1}((1+p)/2)$ for a central two-sided interval. The following intersection is only the displayed Gaussian interval intersected with the mathematical cosine domain, not a new coverage guarantee; an empty intersection remains a failed domain check:
$$
I_x^{(p)}=
\big[\max(-1,x-z_p\sigma_x),\ \min(1,x+z_p\sigma_x)\big]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6dd0f6f6b2fd99c6)

If an external phase estimate $\delta_{\text{ext}}\pm\sigma_{\delta,\text{ext}}$ is available, convert it to
$$
x_{\text{ext}}=\cos\delta_{\text{ext}},\qquad
\sigma_{x,\text{ext}}=|\sin\delta_{\text{ext}}|\,\sigma_{\delta,\text{ext}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fea3a85e7073aaac)

For independent estimates with nonzero combined variance, define residual and pull:
$$
r_x \equiv x-x_{\text{ext}},\qquad
Z_{\text{closure}}\equiv
\frac{|r_x|}{\sqrt{\sigma_x^2+\sigma_{x,\text{ext}}^2}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-81e8dc7f5543860b)

**Conditional consistency criterion (no rejection by this Gaussian pull at level $p$):**
$$
Z_{\text{closure}}\le z_p
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5ae9e3d4365d2966)

If the estimates share data, replace the denominator variance by $\sigma_x^2+\sigma_{x,\text{ext}}^2-2\operatorname{Cov}(x,x_{\text{ext}})$. Interval overlap is a different, weaker criterion for independent Gaussian errors: equal unit standard deviations and residual $1.8$ give overlapping one-sigma intervals but pull $1.8/\sqrt2>1$.

This defines a conditional consistency test once likelihood, covariance, phase convention, and domain handling are specified. Passing it neither proves the closure postulate nor supplies the missing transport derivation.

Post-fit prediction CKM magnitude check (calibrated only on $\lvert V_{us}\rvert,\lvert V_{cb}\rvert,\lvert V_{ub}\rvert$). The remaining entries $\{\lvert V_{ud}\rvert,\lvert V_{cd}\rvert,\lvert V_{cs}\rvert,\lvert V_{td}\rvert,\lvert V_{ts}\rvert,\lvert V_{tb}\rvert\}$ are predictions:

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
\text{Rounded benchmark }V_{ij} & d & s & b\\
\hline
u & 0.974 & 0.225 & 0.0037\\
c & 0.225 & 0.973 & 0.041\\
t & 0.0087 & 0.040 & 0.999
\end{array}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0b4ff7602db8530e)

$^{*}$ calibrated inputs; all other entries are post-fit predictions.

Equivalent one-line prediction:
$$
J^2=c_{12}^2c_{23}^2c_{13}^4\,s_{12}^2s_{23}^2s_{13}^2
\left(1-\frac{s_{13}^2}{s_{12}^2s_{23}^2}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4010f0a861eb22f2)

so the calibration and closure fix $J^2$, or $|J|$; the physical CP sign remains an additional branch choice.

## Working hypotheses
1. **Basis misalignment source:** The weak-coupling-triad orientation couples weakly to shielding-induced response axes, producing a small rotation between weak and mass bases proportional to the shielding contrast.
2. **Matrix structure:** Off-diagonal CKM elements scale as geometric transport amplitudes on the generation chain, with $s_{13}=e^{-\sigma} s_{12}s_{23}$ enforcing the observed hierarchy.
3. **CP phase:** The CKM phase is identified with a transport holonomy angle constrained by $\cos\delta=e^{-\sigma}$.

## What to compute next
- Derive $(\kappa_{12},\kappa_{23},\sigma)$ from first-principles $\mathbb{A}\mathbb{A}\mathbb{A}$ geometry (radii ratios, wake exposure, and triad transport), rather than CKM calibration.
- Prove or falsify the holonomy closure law $\cos\delta=e^{-\sigma}$ from explicit triad transport on the Noether sea background.
- Quantify scale dependence: test whether the fitted actions remain stable under renormalization-scale translation of CKM inputs.
- Simulate wake exposure to confirm/deny a forward-hemisphere weak-coupling triad; falsify the model if trailing-site coupling dominates.
- Extend the same overlap geometry to PMNS and test whether the larger lepton mixing follows from different shielding/transport actions.

## Pointers
- weak-coupling triad & shielding definitions: [assemblies/fermions/quantum-number-mapping.md](../../assemblies/fermions/quantum-number-mapping.md) (Sections on weak isospin, generation hierarchy).
- Gauge-boson couplings: [assemblies/bosons/electroweak-bosons.md](../../assemblies/bosons/electroweak-bosons.md) (W/Z corridors acting on the weak-coupling triad).

_Status: accepted closure route, not a completed derivation. The chapter treats exposure, overlap, and holonomy as one weak-sector proof target. Provenance language below is illustrative only until a reaction ledger supplies the participating braids, architrino inventory, corridor payload, and event residuals._

## Future Capability Illustration: Weak-Reaction Provenance

The conjectural weak-provenance material below is an illustration of what a future $\mathbb{A}\mathbb{A}\mathbb{A}$ reaction ledger should be able to record. It is not a claim that the listed rows are correct. Several rows may be replaced once weak-coupling-triad exposure, corridor sourcing, spin/helicity closure, and event-level residual routing are derived from the same substrate record.

- **Goal:** build a ledger to track weak transmutation events, ensuring charge, shielding, corridor payload, Noether braid sourcing, and architrino counts close. Mark allowed vs. unseen channels and why.
- **Forward axial sites:** the weak-coupling triad uses one forward pole from each indexed polar dyad. Pro/anti is the retained orientation sign $o_{\mathrm{PA}}$, not a radius, energy, or precession ordering and not a matter/antimatter label.
- **Environmental partners:**
  - Photon: a coaxial contra-rotating polarity-conjugate planar pair.
  - Noether sea: hypothesized as paired pro/anti Noether braids; a local interaction could draw neutral braid content to participate while preserving recorded provenance.
- **Architrino budget example:** reacting with a Noether sea super-assembly (4 braids) × (6 architrinos/braid) = 24 architrinos, conditional on six participants per braid. The proposed paired pro/anti orientation balance is distinct from positive/negative primitive polarity. This count alone neither identifies the participants nor establishes that W/Z corridors or other products can form.
- **Capability target:** a mature reaction ledger would state the corridor provenance stance, participating braids/architrinos, candidate products, and forbidden outcomes with reasons such as shielding mismatch, insufficient flux-tube closure, or unmet charge quantization.

### Illustrative Candidate Ledger Rows

| Reactant set | Noether braid support vector | weak-coupling-triad polarity | Noether sea braids tapped? | Candidate products | Corridor(s) | Illustrative status | Reason/constraint |
| --- | --- | --- | --- | --- | --- | --- | --- |
| $d$ $(1,1,1)$ → $u$ $(1,1,1)$ + $W^-$ | tri → tri | $\epsilon_-\to\epsilon_+$ triad transition | 0 | $u + e^- + \bar\nu_e$ | $W^-$ | likely | Matches $V_{ud}$; charge quantized |
| $s$ $(1,1,0)$ → $u$ $(1,1,1)$ + $W^-$ | bi → tri | $\epsilon_-\to\epsilon_+$ triad transition | 0 | $u + e^- + \bar\nu_e$ | $W^-$ | allowed (suppressed) | shielding mismatch → $\lvert V_{us}\rvert$ |
| $b$ $(1,0,0)$ → $c$ $(1,1,0)$ + $W^-$ | uni → bi | $\epsilon_-\to\epsilon_+$ triad transition | 0 | $c + \,\, \ell^- + \bar\nu$ | $W^-$ | allowed (suppressed) | shielding mismatch → $\lvert V_{cb}\rvert$ |
| $t$ $(1,0,0)$ → $b$ $(1,0,0)$ + $W^+$ | uni → uni | $\epsilon_+\to\epsilon_-$ triad transition | 0 | $b + W^+$ | $W^+$ | allowed (dominant) | minimal mismatch; $\lvert V_{tb}\rvert\approx1$ |
| $d$ $(1,1,1)$ + Sea (4 cores) → $u$ $(1,1,1)$ + $W^-$ | tri + sea | $\epsilon_-\to\epsilon_+$ triad transition | 4 | $u + W^-$ | $W^-$ | speculative | Sea supplies corridor, check energy budget |
| $q$ + Sea → $q$ (same) + $Z$ | any | none | 4 | $Z$ | $Z$ | speculative | Neutral corridor, no flavor change |
| $d$ $(1,1,1)$ → $u$ $(1,1,1)$ without $W$ | tri → tri | $\epsilon_-\to\epsilon_+$ transition | 0 | forbidden | — | no | Need $W$ to carry charge/spin |
| $t$ $(1,0,0)$; weak-active sites $5\epsilon_+ + 1\epsilon_-$ → $b$ $(1,0,0)$; weak-active $2\epsilon_+ + 4\epsilon_-$ + $W^+$ → $b + e^+ + \nu_e$ | uni → uni | $\epsilon_+\to\epsilon_-$ triad transition | 0–4 (corridor draw) | $b + e^+ + \nu_e$ | $W^+$ forward corridor | allowed (dominant) | CKM $\lvert V_{tb}\rvert\approx1$; forward Sea braids assemble $W^+$; charged-lepton inventory is $6\epsilon_+ + 0\epsilon_-$; its weak representation requires a chiral-field map |
| $t$ $(1,0,0)$; $5\epsilon_+ + 1\epsilon_-$ → $b$ $(1,0,0)$; $2\epsilon_+ + 4\epsilon_-$ + $W^+$ → $b + q\bar q$ (e.g., $u\bar d$ or $c\bar s$) | uni → uni | $\epsilon_+\to\epsilon_-$ triad transition | 0–4 | $b + q\bar q$ | $W^+$ forward corridor | allowed (dominant; SM $W\to q\bar q$ branching $\sim67\%$) | CKM $\lvert V_{tb}\rvert\approx1$; $q\bar q$ from $W^+$ (anti-down weak-active $4\epsilon_+ + 2\epsilon_-$, up $5\epsilon_+ + 1\epsilon_-$); charge hand-off via corridor. The approximately $67\%$ hadronic fraction is a rounded observer-level benchmark supported by the [PDG 2024 W listing](https://pdg.lbl.gov/2024/listings/rpp2024-list-w-boson.pdf), not a substrate prediction. |
| $e^- (0\epsilon_+ + 6\epsilon_-)$ + $e^+ (6\epsilon_+ + 0\epsilon_-)$ → $Z$ → $\nu_\mu + \bar\nu_\mu$ | leptons | WK: $e^-$ has $0\epsilon_+ + 6\epsilon_-$; $e^+$ has $6\epsilon_+ + 0\epsilon_-$ | 0–4 | $\nu_\mu + \bar\nu_\mu$ | neutral corridor ($Z$) | allowed (NC) | $Z$ neutral; couples to L/R leptons; final $\nu,\bar\nu$ weak-active triads are $3\epsilon_-$ and $3\epsilon_+$ |
| $\mu^-$ (Gen II, $0\epsilon_+ + 6\epsilon_-$) → $e^-$ (Gen I, $0\epsilon_+ + 6\epsilon_-$) + $\bar\nu_e + \nu_\mu$ | $(1,1,0)\to(1,1,1)$ | $\epsilon_-\to\epsilon_+$ transition on weak-coupling triad; restore indexed support 3 | 0–4 | $e^- + \bar\nu_e + \nu_\mu$ | $W^-$ corridor | allowed (leptonic) | Shielding change (Gen II→I); forward $W^-$ transfers charge; stripped core re-emerges as $\nu_\mu$, Sea/anti-sea absorbs balance ($\bar\nu_e$) |
| Neutron $n(udd)$ → Proton $p(uud)$ + $e^- + \bar\nu_e$ | tri → tri (one $d\to u$; two spectators) | $\epsilon_-\to\epsilon_+$ transition on one $d$ | 0–4 | $p + e^- + \bar\nu_e$ | $W^-$ forward corridor | allowed (`beta reaction`; SM label: `beta decay`) | spectator flavors unchanged at the weak vertex; $d\to u$ transition; lepton leg weak-active ($0\epsilon_+ + 6\epsilon_-$), $\bar\nu_e$ has candidate exposed inventory $3\epsilon_+$; its participating weak field is not a sterile singlet |
| $W$ corridor budget (generic) | — | — | two-neutral-braid versus twelve-site payload alternatives unresolved | returns neutral braids to Sea; transfers net $\pm e$ | charged corridor | unresolved inventory | $W^+$: 2 neutral braids + ($9\epsilon_+ + 3\epsilon_-$) → +e; $W^-$: 2 neutral braids + ($3\epsilon_+ + 9\epsilon_-$) → –e; braids end neutral |

Notes:
- "Noether sea braids tapped" means how many Noether sea braids are pulled transiently, if any. Default 0 unless the corridor assembly needs external cores.
- Populate further rows for $c\leftrightarrow s$, $b\to u$, rare loop-induced $b\to s$, and anti-quark channels (conjugate CKM amplitudes with the appropriate charge-conjugate chiral fields).

### Provenance

- The target is **provenance**, not only bookkeeping: track every architrino's path through a reaction, so simulations can reproduce PDG observables from first principles.
- Beyond individual architrinos, track **sub-assembly provenance**: entire Noether braids may transfer intact, detach declared indexed binary subassemblies, dissociate, reassociate, or relock into different groupings while their architrino identities persist. Knowing which Noether braids move as units versus fragment gives insight into allowed channels and lifetimes.
- Conservation requires Electrino count in to equal Electrino count out, and likewise for Positrino count. A completed transmutation map must identify each architrino path from reactants to products.
- The remaining spare-polarity question is where an unincorporated Electrino-Positrino pair goes after a reaction: neutral relock, maximal-curvature inward spiral, local photon-mode release, or another declared channel.

### Polarity and Charge Conservation Enforcement

- Suppression of free $\pm\epsilon$ axial architrinos by a sea response is a dynamical hypothesis; no derived response or escape bound is supplied here.
- Candidate routes for spare axial architrinos include:
  - **Product incorporation:** absorbed into a final-state assembly while preserving charge/polarity bookkeeping.
  - **Current carriage:** carried out on charged lepton/neutrino legs as part of the weak-current flow.
  - **Immediate neutral relock:** paired with opposite-polarity architrinos drawn from the Sea, routing energy into short photon modes modeled as coaxial contra-rotating polarity-conjugate planar pairs while all participating identities remain in the ledger.
- A simulation may exclude escape only as an explicit model restriction. It must retain the missing-channel obligation and cannot count suppression caused by that restriction as evidence for the hypothesis. Neutrino electric neutrality does not allow a net charge imbalance to be hidden on a neutrino leg.

Decision cues to log in simulations: initial separation, relative phase, and local Noether braid density. The selected dominant channel must record energy and charge routing.

### Open Provenance Obligations

- Validate the explicit overlap functional in this document by reconstructing $(\kappa_{12},\kappa_{23},\sigma)$ from simulated transport trajectories.
- Build per-architrino tracking in simulations to recover CKM magnitudes and CP phase from first principles.
- Add sub-assembly tracking: which Noether braids move intact vs. fragment in each channel; ensure charge/polarity balances close at both architrino and core levels.

## Closure Integration: CKM-Holonomy and Lepton Handoff

This chapter is the primary quark-mixing closure surface for $\mathbb{A}\mathbb{A}\mathbb{A}$.

### CKM closure target (quark sector)

Compute transport actions from first-principles triad geometry:
$$
\kappa_{ab}=
\int_{\Gamma_{ab}}
\mathcal{L}_{\mathrm{trans}}
\bigl(\rho_{\text{NS}}(\mathbf X,T),\nabla_{\mathbf X}\rho_{\text{NS}}(\mathbf X,T),\text{shielding},\text{wake exposure}\bigr)\,ds
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b86c1979f700b05b)

rather than fitting them from CKM inputs. Here $\kappa_{ab}$ is dimensionless, so $\mathcal L_{\mathrm{trans}}\,ds$ must be dimensionless; if $s$ is length, the integrand has inverse-length units. This functional is an ansatz until its dependence on admitted path history and the medium is derived; the displayed instantaneous density data need not suffice.

Then derive the phase via geometric holonomy:
$$
\delta=\oint_{\mathcal{C}_{123}}\omega
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ffc16c004aa7ee40)

For an Abelian phase connection this integral defines a phase modulo $2\pi$, with its gauge and orientation convention specified. A non-Abelian transport requires a path-ordered holonomy and a defined invariant phase extraction. Test whether
$$
\cos\delta=\frac{s_{13}}{s_{12}s_{23}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a2ce8cd34aa27c67)

is a theorem of the transport bundle, not a postulate.

### Statistical acceptance rule

For
$$
x\equiv \cos\delta_{\mathrm{pred}}=\frac{s_{13}}{s_{12}s_{23}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2f1fb40d3cf8cb4a)

and covariance $\Sigma_s$ from the calibration inputs, require closure pull
$$
Z_{\mathrm{closure}}=
\frac{|x-x_{\mathrm{ext}}|}{\sqrt{\sigma_x^2+\sigma_{x,\mathrm{ext}}^2}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5df55e0f64636f57)

to satisfy $Z_{\mathrm{closure}}\le z_p$ under the independent, locally Gaussian assumptions stated above. Shared inputs require the cross-covariance correction; domain handling and likelihood coverage must be retained. This is statistical consistency, not a theorem of transport.

### PMNS handoff

A lepton extension must derive the relevant charged-lepton and neutrino bases, their common state space, and an effective evolution operator from the substrate; a different Hamiltonian or weaker coupling is a proposed effective description. A unitary three-state PMNS target assumes no unresolved extra-state leakage. Three Dirac neutrinos have one physical mixing phase; three Majorana neutrinos permit two additional phases which cancel from ordinary oscillation probabilities but are not generally removable. This distinction follows the [PDG 2024 neutrino review](https://pdg.lbl.gov/2024/reviews/rpp2024-rev-neutrino-mixing.pdf), Secs. 14.2–14.3. The CKM cosine postulate cannot supply those phases by analogy. The detailed lepton closure model is integrated in:
- [assemblies/fermions/neutrinos.md](../../assemblies/fermions/neutrinos.md)
