# Noether Braid Configuration Space

This chapter gives the Noether braid search space for cases where three retained angular-momentum rows may form a full internal 3D frame. It comes after the family map in [Noether Braid](noether-braid.md) and the base branch definitions in [Neutral Braid](neutral-braid.md), [Shell Braid](shell-braid.md), and [Nested Shell Braid](nested-shell-braid.md), and before any named configuration such as the doubling-frequency `4:2:1` lock, an iso-frequency candidate, or a field-speed hinge-occupancy candidate. Within that sublocus, a rank-three branch candidate is a three-row retained state whose energies, phase offsets, angular-momentum rows, plane orientations, causal-root ledgers, frequencies, radii, speeds, and whole-branch group velocity must be solved together.

This is a search architecture and theorem target, not a completed classification theorem. The goal is to find which regions of the Noether braid configuration space support stable retained branches in a Noether sea populated by like assemblies, identify which branches remain candidate braids and which can be promoted to certified braids, and then use those branches as the entry point for assembly topological charge, energy differentials, shielding, and accessory-architrino capture.

## Document Role

This chapter owns the rank-three angular-momentum-frame search variables: unordered layer labels, angular-momentum two-form rows, the plane-frame determinant, group velocity, energy/frequency/speed/radius ledgers, role assignment, and permutation accounting. It is the place to ask whether a candidate branch supplies three retained angular-momentum rows with enough conditioning to form a volumetric internal frame.

It does not exhaust the full Noether braid class, certify nested shell support, or make `I:M:O`, `4:2:1`, iso-frequency, or field-speed hinge assumptions the default. Those are specializations that must declare their support base and same-record branch rows before they can be mapped onto a Proof ID in [Noether Braid Taxonomy](noether-braid-taxonomy.md).

## Scope Of The Hypothesis

The three-row exact-binary hypothesis is a decomposition strategy, not an exhaustion theorem. There may be stable Noether braid configurations that do not admit a clean split into three persistent binary rows. The reason to study this decomposition first is that three independent angular-momentum directions are enough to span the orientation data of Euclidean three-space. In that sense, the three-row exact-binary decomposition is the minimal exact-binary architecture that can test whether a stable assembly carries a full three-dimensional internal frame.

This also means that the word `binary` names a retained angular-momentum row, not necessarily a perfectly circular two-body orbit at every instant. A certified row may have a conserved or slowly bounded angular-momentum ledger while the actual architrino paths on the retained support are quasiperiodic, braided, or chaotic. On such a row, $f_a$ is a return or winding frequency, $r_a$ is a characteristic lever arm, $s_a$ is a speed row or speed statistic, and $E_a$ is the retained branch-energy row. A circular carrier chart is the cleanest comparison case, not the only admissible path geometry.

In geometric language, the three rows are derived from three retained angular-momentum two-form classes on the branch, not from three assumed circular sub-orbits. Write these classes schematically as
$$
[\omega_J^{(a)}],
\qquad
a\in\{1,2,3\}.
$$
The plane normal $\hat{\mathbf n}_a$ is the Euclidean Hodge-dual direction extracted from that class,
$$
\hat{\mathbf n}_a
=
\frac{\star[\omega_J^{(a)}]}
{\|\star[\omega_J^{(a)}]\|},
$$
whenever the numerator is nonzero. Thus axis language means a ledger direction derived from the retained branch record. It is not an assumption that constituent paths are axial, circular, or disjoint.

## Why Three Retained Rows

The reason to begin with three retained rows is geometric. Euclidean space has three independent spatial directions, and a stable three-dimensional assembly needs enough internal direction data to define an orientation frame rather than only a planar cycle. A single binary row supplies one orbital plane and one plane normal. Two rows can define a relative angle, but they do not by themselves supply a full nondegenerate three-axis frame. Three retained rows can, when their plane normals are independent, define a local three-dimensional frame.

Let the three retained binary planes have unit normals
$$
\hat{\mathbf n}_1,\,
\hat{\mathbf n}_2,\,
\hat{\mathbf n}_3.
$$
The plane-orientation nondegeneracy measure is
$$
D_{\mathrm{plane}}
=
\det\!\begin{bmatrix}
\hat{\mathbf n}_1 & \hat{\mathbf n}_2 & \hat{\mathbf n}_3
\end{bmatrix}.
$$
The branch is genuinely three-dimensional only when $D_{\mathrm{plane}}\ne0$. Near $|D_{\mathrm{plane}}|=1$, the three planes are close to mutually orthogonal. Near $D_{\mathrm{plane}}=0$, the rank-three frame degenerates toward a coplanar or lower-dimensional support. This determinant is therefore a natural order parameter for the transition between a volumetric Noether braid branch and a planar or horizon-aligned branch.

For promotion work this becomes a nondegeneracy floor:
$$
|D_{\mathrm{plane}}|
\ge
\delta_{\mathrm{plane}}>0.
$$
It is the frame-bundle analogue of the Jacobian and separatrix floors used elsewhere: the map from three retained plane normals to an oriented internal frame loses conditioning when this determinant approaches zero. The wall $D_{\mathrm{plane}}=0$ is therefore the coplanar or horizon-aligned stratum where the frame ceases to be rank three. In current sector language, this is the boundary between a volumetric near-orthogonal sector and a planar cyclic sector; the solver must determine which side a retained branch actually occupies.

This is a statement about a derived orientation frame, not a claim that the constituent architrino paths are axial. The actual six paths may be braided, quasiperiodic, chaotic, shell-supported, or otherwise noncircular while still emitting retained angular-momentum rows from which principal directions can be extracted. Axis language in this chapter therefore means a ledger or envelope direction derived from the branch record, not a primitive path pattern.

The claim is not that every stable assembly must have three exact binary rows. The broader [Noether braid](noether-braid.md) class permits six-body branches before exact binary grouping is certified. The three-row exact-binary search inside that class is the minimal exact-binary architecture that can test full three-dimensional frame closure.

Equivalently, the three-row exact-binary locus is a sublocus of the six-body Noether braid configuration class:
$$
\mathcal{T}_{3B}^{\mathrm{locus}}
\subset
\mathcal{N}_{6\text{-body}}.
$$
A six-body branch belongs to this sublocus only when its retained angular-momentum record admits three independent rows, or equivalently a rank-three frame extraction with $D_{\mathrm{plane}}\ne0$. A planar, oblate, or lower-rank Noether braid may still be stable, but it is not a promoted rank-three Noether braid branch until the three-row frame condition is met.

## General Branch State

Use generic layer labels $a\in\{1,2,3\}$ before assigning nested `I:M:O` roles. These labels are bookkeeping labels only. They do not imply an ordering of frequency, radius, energy, speed, phase, plane orientation, or root-ledger complexity. The minimal branch record for this sublocus is
$$
\mathcal{T}_{3B}
=
\left\{
\left(
f_a,\,
r_a,\,
E_a,\,
s_a,\,
\phi_a,\,
\hat{\mathbf n}_a,\,
\mathcal{L}_a
\right)
\right\}_{a=1}^{3}.
$$
Here $f_a$ is the layer frequency or return rate, $r_a$ is the characteristic radius or retained lever arm, $E_a$ is the retained branch-energy row, $s_a=\|\mathbf{v}_a\|$ is the scalar tangential speed or speed statistic, $\phi_a$ is the phase origin or offset, $\hat{\mathbf n}_a$ is the orbital-plane normal, and $\mathcal{L}_a$ is the active causal-root ledger data for that layer. On a circular carrier chart,
$$
s_a=2\pi f_a r_a.
$$
This identity is kinematic only. It does not select the frequencies, radii, speeds, energies, phase offsets, plane orientations, or causal-root ledgers.

The practical search should treat the branch energy row $E_a$, angular-momentum row, phase data, and causal-root ledger $\mathcal{L}_a$ as primary retained data. The radius and speed are then constrained by the selected carrier chart, conservation laws, and the branch's energy closure. In simple circular rows, fixed $f_a$ and $E_a$ may determine an admissible $r_a$ and $s_a$ after the kinetic, binding, and wake-energy terms are specified. In noncircular rows, the same energy may correspond to a bounded family of paths with the same return frequency but different local speed profile. Thus energy is central, but it is not by itself a complete coordinate on the Noether braid configuration space.

## Branch Group Velocity

The internal plane data do not encode group velocity. The plane normals $\hat{\mathbf n}_a$ describe the assembly's internal angular-momentum frame. The group velocity is the drift of the retained branch envelope or response center through the local Noether sea:
$$
\mathbf{V}_{\mathrm{grp}}
=
\frac{d\mathbf{X}_{\mathrm{resp}}}{dt}
\quad
\text{relative to the declared Noether sea record.}
$$
The full branch record should therefore be read as
$$
B_{3B}
=
\left(
\mathcal{T}_{3B},\,
\mathbf{X}_{\mathrm{resp}},\,
\mathbf{V}_{\mathrm{grp}},\,
\mathbf{P}_{\mathfrak B},\,
\mathbf{J}_{\mathfrak B},\,
\theta_{\mathrm{sea}}
\right),
$$
where $\mathbf{P}_{\mathfrak B}$ and $\mathbf{J}_{\mathfrak B}$ are the branch-total momentum and angular-momentum ledgers, and $\theta_{\mathrm{sea}}$ is the local Noether sea response record used to compare moving branches.

This distinction matters for the equivalence-principle and Lorentz-closure programs. In a validated low-energy regime, uniform group velocity should not become an observable composition-dependent force merely because two assemblies carry different internal plane orientations. That is an effective recovery target: the moving branch must retune its clock, ruler, and signal rows so that preferred-frame leakage stays below the declared bounds. It is not a reason to omit $\mathbf{V}_{\mathrm{grp}}$ from the dynamics. The correct statement is that $\mathbf{V}_{\mathrm{grp}}$ is a separate branch-transport variable whose observable leakage must be suppressed by common-channel closure.

This variable is unambiguous only when the response-center theorem target closes on the same branch. The exposed-energy response center, inertial response center, and wake-momentum boundary ledger must agree up to the declared response residual $\mathcal R_{\mathrm{resp}}$. If they do not, the phrase "group velocity of the branch" can point to different moment maps, and the candidate is not ready for certified-braid promotion. Thus $\mathbf{V}_{\mathrm{grp}}$ is part of the retained record, but its use as a single transport velocity is conditional on center-of-response closure.

## Candidate And Certified Braids

A **candidate braid** is a proposed Noether braid branch or branch family whose certificate rows have not all closed. A **certified braid** is a theorem-target status for a Noether braid branch, not a new primitive substance. A branch is certified only when its full retained record returns to itself under the delayed dynamics, up to declared symmetries, and its required stability, alignment, and observer-export rows close on the same record.

The retained record is not an arbitrary internal diary and it is not an arbitrary collection of architrinos. It is the finite branch chart for one Noether braid: the six-body polarity-neutral inventory of three positive-polarity and three negative-polarity architrinos, together with the path-history rows, causal-root ledger, wake-tail rows, energy/action rows, momentum and angular-momentum rows, phase data, plane-orientation data, response-center data, group-velocity row, and Noether sea record that can still affect the next delayed update of that same six-body branch. A path-history segment belongs to the retained record only while it can still enter a self-hit, partner-hit, wake-tail, boundary, or branch-return row on the declared memory window.

Let $P_T^{(\mathbf{V})}$ be the finite-memory return map over one branch period $T$, including translation by the branch group velocity $\mathbf{V}_{\mathrm{grp}}$. Let $\mathcal G_{\mathrm{sym}}$ contain only declared neutral symmetries such as global phase shift, rigid spatial rotation, translation of the response center, and permitted $S_3$ layer relabeling. A rank-three Noether braid branch $B_{3B}$ is a candidate for certified-braid promotion when there exists $g\in\mathcal G_{\mathrm{sym}}$ such that
$$
\mathcal R_{\mathrm{cert}}
=
d_{\mathfrak B}
\left(
P_T^{(\mathbf{V})}(B_{3B}),\,
g\cdot B_{3B}
\right)
\le
\epsilon_{\mathrm{cert}},
$$
on the same retained branch chart $\mathfrak B$, with the non-symmetry return directions carrying a positive stability margin. The metric $d_{\mathfrak B}$ must compare the same branch rows: causal-root ledger, energy/action ledger, angular-momentum rows, phase data, plane-orientation data, response-center motion, group velocity, Noether sea record, and assembly topological charge.

The quotient group $\mathcal G_{\mathrm{sym}}$ is not a convenience list. It must be the neutral group of the retained return map: directions removed from the stability test have zero Floquet exponent because they are declared symmetries of the full branch chart. A direction that is neutral in an isolated sub-row but unstable in the enclosing rank-three Noether braid chart is not quotiented. In that sense, the certified-braid certificate is the branch-symplectic-promotion test evaluated on the retained branch chart: the finite-memory return map must recur modulo true neutral symmetries while contracting or bounding every non-symmetry direction.

The branch-intrinsic conserved record must also export Lorentz-compatible observer rows before certification. In the homogeneous moving-branch regime, the same retained record must recover the ruler and clock deformation laws,
$$
\xi
=
\frac{R_{\parallel}}{R_{\perp}}
\to
\frac{1}{\gamma},
\qquad
\frac{d\tau}{dt}
\to
\frac{1}{\gamma},
$$
with preferred-frame leakage bounded by the declared $\epsilon_{\mathrm{LV}}$ or two-way anisotropy diagnostic. The observer components are produced through a derived moving-assembly map,
$$
C_{\mathrm{obs}}
=
\Lambda_{\mathrm{eff}}
\left(
\mathbf{V}_{\mathrm{grp}},
\theta_{\mathrm{sea}}
\right)
C_{\mathrm{branch}}
+O(\epsilon_{\mathrm{LV}}),
$$
when Lorentz closure applies. The export may dress energy-momentum, angular-momentum components, clock rates, and ruler geometry, but it does not replace the branch record itself. Topological rows such as assembly topological charge remain branch-intrinsic invariants unless the branch crosses a fold, reconnection, or other declared surgery event.

## Momentum And Principal-Direction Decomposition

A candidate for certified-braid promotion should also say how its three retained rows align with the conserved momentum ledgers. A branch whose retained record returns but whose axes do not align with branch-total momentum and angular momentum remains a return-map candidate, not a promoted certified braid. The branch-total momentum and angular momentum should be computed on the same finite window as the return map:
$$
\mathbf{P}_{\mathfrak B}
=
\mathbf{P}_{\mathrm{mech}}
+
\mathbf{P}_{\mathrm{wake}},
\qquad
\mathbf{J}_{\mathfrak B}
=
\mathbf{J}_{\mathrm{mech}}
+
\mathbf{J}_{\mathrm{wake}}.
$$
The mechanical and wake terms must use the same endpoint convention as the retained branch chart; otherwise the axis comparison is only a visualization.

When $\|\mathbf{P}_{\mathfrak B}\|>0$, the unit vector
$$
\hat{\mathbf e}_{P}
=
\frac{\mathbf{P}_{\mathfrak B}}{\|\mathbf{P}_{\mathfrak B}\|}
$$
is the transport axis. When $\|\mathbf{J}_{\mathfrak B}\|>0$, the unit vector
$$
\hat{\mathbf e}_{J}
=
\frac{\mathbf{J}_{\mathfrak B}}{\|\mathbf{J}_{\mathfrak B}\|}
$$
is the branch's total angular-momentum axis. The three retained plane normals $\hat{\mathbf n}_a$ should then be read as a principal-direction decomposition of $\mathbf{J}_{\mathfrak B}$, not as arbitrary visual decoration and not as a claim that the paths themselves lie on axes. A simple diagnostic is the angular-momentum closure vector
$$
\mathcal{R}_{J\mathrm{-axis}}
=
\left\|
\hat{\mathbf e}_{J}
-
\frac{\sum_{a=1}^{3}w_a\hat{\mathbf n}_a}
{\left\|\sum_{a=1}^{3}w_a\hat{\mathbf n}_a\right\|}
\right\|,
$$
where the weights $w_a$ are declared branch-action, branch-angular-momentum, or energy-row weights and the weighted normal sum is required to be nonzero. This is not yet a theorem: it is the axis-alignment row a solver must populate before claiming that the three retained rows faithfully decompose the assembly's conserved angular momentum.

The stronger faithful-decomposition test is spectral. Build the symmetric branch angular-momentum frame tensor
$$
\mathsf{J}_{\mathfrak B}^{ij}
=
\sum_{a=1}^{3}
J_a\,\hat n_a^i\hat n_a^j,
$$
with $J_a$ supplied by the retained branch-angular-momentum or action row. A promoted rank-three Noether braid branch should show that this tensor has three nonzero eigenvalues and that its eigenframe agrees with the retained normal frame up to the allowed $S_3$ relabeling and sign conventions. If diagonalizing $\mathsf{J}_{\mathfrak B}^{ij}$ produces a different frame, then $\mathcal{R}_{J\mathrm{-axis}}$ is not a mere visualization error: the three retained rows are not a faithful decomposition of the conserved angular-momentum ledger.

The oblate spheroidal envelope is the coarse geometry associated with this decomposition. In the rest branch, $\mathbf{P}_{\mathfrak B}=0$, so the internal angular-momentum axes and plane determinant describe the retained three-dimensional support. In a moving branch, $\hat{\mathbf e}_{P}$ marks the drift direction relative to the Noether sea, and Lorentz-closure asks whether the envelope deforms with a longitudinal-to-transverse ratio
$$
\xi
=
\frac{R_{\parallel}}{R_{\perp}},
\qquad
R_{\parallel}\ \text{measured along }\hat{\mathbf e}_{P},
$$
while the same internal angular-momentum ledger remains retained. Thus the retained-row picture is also a disciplined way to visualize an oblate spheroidal Noether braid: the three retained rows decompose the internal angular momentum into principal directions, while group velocity and total momentum select the moving-envelope axis.

## Unordered Layer Semantics

The search must not assume that one binary is inner, middle, outer, high-frequency, low-frequency, high-energy, low-energy, fast, slow, or geometrically privileged before the retained branch supplies that role. The raw search domain is therefore the labeled but unordered product
$$
\widetilde{\mathcal C}_{3B}
=
\left\{
(\mathcal T_1,\mathcal T_2,\mathcal T_3):
\mathcal T_a=(f_a,r_a,E_a,s_a,\phi_a,\hat{\mathbf n}_a,\mathcal L_a)
\right\}.
$$
The symmetric group $S_3$ acts on this space by permuting the three binary records:
$$
\pi\cdot(\mathcal T_1,\mathcal T_2,\mathcal T_3)
=
(\mathcal T_{\pi^{-1}(1)},\mathcal T_{\pi^{-1}(2)},\mathcal T_{\pi^{-1}(3)}),
\qquad
\pi\in S_3.
$$
Two rows may therefore be the same physical candidate up to a relabeling even when they appear as distinct solver outputs.

The default search policy is to keep $\widetilde{\mathcal C}_{3B}$ unquotiented. Repeated $S_3$-related solutions are useful confirmation that the solver is finding a symmetric sector rather than a one-off artifact. An analysis tool may later isolate one representative sector by computing a permutation-invariant key,
$$
\operatorname{key}(B)
=
\operatorname{sort}_{a=1}^{3}
\operatorname{fingerprint}(\mathcal T_a),
$$
but that quotient is an analysis summary, not the search domain. No branch is rejected merely because a symmetric relabeling has already appeared.

When branch counts, continuation-family cardinalities, or basin weights are reported, the quotient must be applied explicitly. If a physical branch has stabilizer subgroup $\operatorname{Stab}_{S_3}(B)$, then its orbit size in the unquotiented cover is
$$
\frac{|S_3|}
{|\operatorname{Stab}_{S_3}(B)|}.
$$
The unquotiented solver rows are useful evidence, but they are not independent physical branches. Any comparison to the finite-continuation family $\mathfrak S_{\Omega,W}^{\mathrm{ME},\eta}$ or to basin measures must reduce by the same $S_3$ orbit accounting rather than overcounting six label copies as six distinct certified braids.

The general configuration ratios are
$$
f_1:f_2:f_3,
\qquad
r_1:r_2:r_3,
\qquad
E_1:E_2:E_3,
\qquad
s_1:s_2:s_3.
$$
These ratios are reported in the current layer labels. They are not sorted ratios and they carry no inequality unless a retained branch later assigns a role order.

The branch-search problem is to find retained stable states
$$
\mathcal{T}_{3B}
\in
\widetilde{\mathcal C}_{3B}
$$
over this full variable set, then compare their energy differentials
$$
\Delta E_{ab}=E_a-E_b
$$
and ledger decompositions on the same retained row set. The doubling-frequency, iso-frequency, and broader integer-ratio families are subfamilies of $\widetilde{\mathcal C}_{3B}$, not definitions of it. Field-speed hinge occupancy is a separate speed-regime axis on the same branch rows, not a frequency-ratio family.

## Super-Field-Speed Carrier Rows

The general search naturally includes carrier speeds above the causal wake propagation speed. Since
$$
s_a=2\pi f_a r_a,
$$
fixing one row of the search does not fix the others. Even an iso-frequency family
$$
f_1=f_2=f_3
$$
can have different radii, energies, speeds, phases, and active root ledgers:
$$
r_1:r_2:r_3
\ne
1:1:1,
\qquad
s_1:s_2:s_3
\ne
1:1:1.
$$
If one retained lever arm is large enough at the common frequency, then that layer has $s_a>c_f$.

This is not a signal-speed claim. The primitive causal wake still propagates at $c_f$. A row with $s_a>c_f$ is a carrier-trajectory row in the retained branch chart. Its importance is dynamical: it changes the causal-root inventory. Super-field-speed carrier motion can create additional self-hit and partner-hit roots, force Jacobian sign changes, and move the branch into the fold and caustic regimes that feed the causal-root ledger. The possibility of one or more super-field-speed layers is therefore a reason to scan the full Noether braid configuration space rather than preselecting a single speed hierarchy.

In a certified row, the important event is not speed alone but the appearance of same-source causal roots with the required transversality floors. Still, $s_a>c_f$ is the natural warning gate for the layer's self-hit signed-root complex:
$$
C_+^{(a)}\oplus C_-^{(a)}.
$$
A branch with one super-field-speed layer can carry a different assembly topological charge structure from a branch with two or three such layers, because the self-hit ledgers and signed degrees are layer-dependent. This is another reason the search must preserve the full unordered speed tuple $s_1:s_2:s_3$ rather than collapsing immediately to a preferred hierarchy.

## Stability In A Sea Of Like Assemblies

An isolated Noether braid return map is not enough for Noether braid promotion. A retained branch must also remain stable when embedded in a Noether sea containing like assemblies. The relevant stability question is not only whether one branch closes, but whether a population of similar branches can coexist without destroying the retained ledgers.

For a candidate branch $B$ over a window $W$, write the stability target schematically as
$$
\mathrm{Stable}_{3B}(B;W,\mathcal{N}_{\mathrm{sea}})
\Longleftrightarrow
P_{\mathrm{root}}
\wedge
P_{\mathrm{phase}}
\wedge
P_{\mathrm{energy}}
\wedge
P_{\mathrm{return}}
\wedge
P_{\mathrm{sea}}.
$$
Here $P_{\mathrm{root}}$ requires persistent causal-root ledgers with positive root floors except at declared caustic transits, $P_{\mathrm{phase}}$ requires bounded phase-offset drift, $P_{\mathrm{energy}}$ requires a closed branch-energy row, $P_{\mathrm{return}}$ requires a Floquet, Conley, or comparable return certificate, and $P_{\mathrm{sea}}$ requires the same branch to remain coherent under the background Noether sea response generated by like assemblies. This last predicate is the bridge from an isolated branch search to a stable medium of assemblies.

The result of this search should be an atlas of stable regions in $\widetilde{\mathcal C}_{3B}$, not a single preferred row. Patterns may include doubling-frequency locks, iso-frequency families, integer-ratio families such as `3:2:1`, field-speed hinge-occupancy regimes, planar degenerations, and mixed regimes where one or more layers run above $c_f$ while the whole assembly remains a retained delayed branch. If a stable region is $S_3$-symmetric, the atlas may also report the corresponding quotient-sector representative, but the unquotiented evidence should remain available.

## Toward A Periodic Table Of The Noether Braid

The phrase "periodic table of the Noether braid" names the classification program, not an already completed table. The proposed atlas should classify retained branches by:

1. The compact assembly topological charge $[\mathfrak B]_{\mathrm{top}}=(N_s,M_p,c_1)$ and its signed-degree refinement.
2. The frequency, radius, energy, and speed ratios of $\mathcal{T}_{3B}$.
3. The plane-orientation determinant $D_{\mathrm{plane}}$ and handedness data.
4. The energy differentials $\Delta E_{ab}$ and their wake-history decomposition.
5. The response of the branch to a sea of like assemblies.
6. The capture or exclusion behavior of additional architrinos near the branch.

The classification is topological only where the entries are invariant under branch-preserving deformation. It is dynamical where the entries depend on energy balance, phase locking, sea response, and return-map stability. A promoted table must therefore carry both topological labels and dynamical margins.

## Accessory-Architrino Capture

After a stable rank-three core has been retained, the next search level asks whether ordinary architrinos can become bound to that core without destroying the core ledger. In this search-stage sense, an **accessory architrino** is not a new ontological species. It is an architrino whose trajectory becomes coupled to an already retained core branch.

For a core branch $B$, define a capture site as a region of phase-position-history space where an added architrino can acquire a bounded return ledger:
$$
\mathcal{C}_{\mathrm{cap}}(B)
=
\left\{
(\mathbf{x},\mathbf{v},q,\phi):
\mathrm{Retain}_{\mathrm{acc}}(B;\mathbf{x},\mathbf{v},q,\phi)=1
\right\}.
$$
The capture predicate must use the same causal-root, action, energy, and return-map conventions as the core branch. A site is not merely a low potential region. It must preserve the core ledger while giving the added architrino a persistent delayed-return row, finite energy exchange, and bounded phase drift.

Topologically, capture preserves the assembly topological charge of the core branch while augmenting it with an accessory row. If $B_{\mathrm{core}}$ has assembly topological charge $[\mathfrak B_{\mathrm{core}}]_{\mathrm{top}}$, then an admissible captured branch should have
$$
[\mathfrak B_{\mathrm{core}}\cup\mathrm{acc}]_{\mathrm{top}}
=
[\mathfrak B_{\mathrm{core}}]_{\mathrm{top}}
+\Delta_{\mathrm{acc}},
$$
where $\Delta_{\mathrm{acc}}$ is supplied by the accessory row's own causal-root and return ledger while the core entries are unchanged. If the core values of $N_s$, $M_p$, $c_1$, signed degree, or phase-return data change, the event is not capture in this sense; it is a core reconfiguration through a fold, reconnection, or branch surgery.

The architectural question is therefore:
$$
B
\longrightarrow
\left(
\mathcal{C}_{\mathrm{cap}}(B),
\#\mathrm{captured},
\mathrm{capture\ pattern},
\Delta E_{\mathrm{capture}}
\right).
$$
This gives the next level of search after core rank-three stability: how many accessory architrinos can couple to the retained branch, which phase windows and polar regions they occupy, and how their capture changes the energy ledger. If the captured population becomes the six-site fermion organization, the canonical language is axial architrino, axial layer, polar site, polar dyad, and axial inventory.

The six-site axial-layer target should therefore be read as a derived capture pattern, not as an assumed geometry of the core. The search question is whether there is a maximal accessory population whose capture preserves $[\mathfrak B_{\mathrm{core}}]_{\mathrm{top}}$ and organizes into a protected axial inventory. The arrangement may be axial, polar-dyad-based, planar-degenerate, or another retained capture architecture until the branch certificate decides it.

## Frame Orthogonality And Framing Anisotropy

The configuration-space program also supplies a compact theorem target for anisotropy leakage. A faithful rank-three Noether braid branch has two related order parameters: the frame determinant $D_{\mathrm{plane}}$ and a trace-free framing quadrupole $Q_A$ extracted from the same retained normal/eigenframe data. Schematically,
$$
Q_A^{ij}
=
\sum_{a=1}^{3}
\lambda_a
\left(
\hat n_a^i\hat n_a^j
-\frac{1}{3}h^{ij}
\right),
\qquad
\sum_a\lambda_a=0,
$$
with the weights $\lambda_a$ fixed by the retained action, energy, or angular-momentum tensor row rather than chosen after the fact.

The reachable theorem target is:
$$
|D_{\mathrm{plane}}|\to1
\quad\Longrightarrow\quad
\|Q_A\|\ \text{small under faithful spectral weighting},
$$
while degeneration toward $D_{\mathrm{plane}}=0$ may produce large framing anisotropy. If this implication is proved for a retained branch class, the same geometric row would suppress Lorentz period anisotropy, clock-orientation leakage, Hughes-Drever-type inertial anisotropy, and scalar-mass anisotropy. This chapter does not prove that result; it defines the configuration-space objects on which that proof can be attempted.

## Relation To The Doubling-frequency Chapter

[Noether Braid Doubling-Frequency Resonance Lock](noether-braid-doubling-frequency-resonance-lock.md) studies one restricted family inside this broader configuration space. It asks whether a nested `I:M:O` frequency triplet, especially the doubling-frequency `4:2:1` candidate, can close as an integer phase-bundle lock with a stable return map and controlled caustic behavior.

The doubling-frequency chapter should therefore be read as a specialized search row:
$$
\mathcal{C}_{\mathrm{dbl}}
\subset
\widetilde{\mathcal C}_{3B}.
$$
Iso-frequency, unequal-radius candidates occupy a different row:
$$
\mathcal{C}_{f=f=f}
=
\{B\in\widetilde{\mathcal C}_{3B}:f_1=f_2=f_3\}.
$$
Both rows are legitimate until the retained-branch certificates decide which, if either, survives. The general Noether braid search keeps the mathematics wide enough for the solver to discover stable configurations rather than forcing every stable Noether braid into a preselected frequency pattern.
