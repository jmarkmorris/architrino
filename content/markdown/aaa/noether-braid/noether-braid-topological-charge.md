# Noether Braid Topological Charge

This chapter gives a first-class home to the candidate topological label of a Noether braid assembly. The label combines the causal-root ledger of the delayed dynamics with the phase-return degree data of a resonance-locked nested shell braid. Its purpose is to state what can be computed from a retained branch chart, what is invariant inside a nondegenerate branch domain, and what remains a theorem target before the label can serve as a topological periodic table of assemblies. The general search domain that emits candidate Noether braid branch charts is developed in [Noether Braid Configuration Space](noether-braid-configuration-space.md).

The reader-facing idea is that a topological charge is not a decorative name for a braid. It is a proposed invariant label carried by one retained branch chart. Root counts tell which self-hit and partner-hit channels are active; signed degrees say what survives fold-pair surgery; phase-return degree data say how the locked branch winds over one cycle. Only the combination can become a stable assembly label.

This page therefore starts from computation, not classification. A solver must first produce a retained branch with causal-root floors, finite memory, gluing, wake-boundary closure, and stability. The topological label is read from that branch; it does not certify the branch by itself.

The compact notation is
$$
[\mathfrak B]_{\mathrm{top}}
=
\left(
N_s,\,
M_p,\,
c_1
\right)
$$
where $N_s$ counts active self-hit roots, $M_p$ counts active partner-hit roots, and $c_1$ denotes the established phase-entry slot of the retained resonance lock. In this chapter that slot means return-map degree data unless a later two-torus curvature chart is explicitly supplied. For a promoted lock with a three-phase chart this last entry is usually a pair
$$
c_1=(m,n)\in\mathbb{Z}^2
$$
rather than a scalar integer: $m$ and $n$ are the middle and inner winding numbers over one outer period.

This compact form records the count data most directly emitted by a branch solver. The conserved refinement is
$$
[\mathfrak B]_{\mathrm{deg}}
=
\left(
D_t,\,
D_p,\,
c_1
\right),
$$
where $D_t$ and $D_p$ are signed root degrees. The unsigned counts $N_s$ and $M_p$ can change by opposite-sign fold-pair birth or death, while $D_t$ and $D_p$ are the degree-like data preserved by generic fold surgery. A promoted report should therefore carry both the compact assembly topological charge and its signed-degree refinement.

This is a definition and closure target, not a completed classification theorem. It becomes a physical assembly label only after the same retained branch chart supplies positive root floors, finite memory, finite local-to-global gluing, stable return data, and a closed wake-history boundary ledger.

In the terminology of [Noether Braid Configuration Space](noether-braid-configuration-space.md#candidate-and-certified-braids), a candidate for certified-braid promotion is the dynamical return-map status of the full retained branch. The assembly topological charge is the branch-intrinsic topological label carried by that candidate. It is not a Lorentz-dressed observer component: moving-assembly export may transform energy-momentum and angular-momentum readouts, but $[\mathfrak B]_{\mathrm{top}}$ changes only when the retained branch crosses a fold, reconnection, or declared surgery event.

## Document Role

This chapter is the downstream classifier for retained Noether braid branch charts. It owns $[\mathfrak B]_{\mathrm{top}}$, the signed-degree refinement, invariance conditions, allowed transitions, and simulation extraction order for the topological label.

It does not certify branch retention by itself and does not create a base classification label. It consumes a same-record branch chart from the neutral, shell, nested shell, rank-three, or lower-rank proof effort; the label becomes physical only after the causal-root, phase-return, gluing, wake-boundary, and stability rows close on that same record.

## Source Of The Three Entries

The first two entries come from the causal-root complex of the Master Equation. On a retained branch chart, active roots are split by transmitter identity and by Jacobian sign. Let $b_\ell$ denote the formal generator attached to active root row $\ell$. The modules below are free $\mathbb{Z}$-modules, so the ledger invariant is their rank. For the self-hit sector,
$$
C_{s,+}(\mathfrak B)
=
\mathbb{Z}\langle b_\ell:\text{self root},\ J_\ell>0\rangle,
\qquad
C_{s,-}(\mathfrak B)
=
\mathbb{Z}\langle b_\ell:\text{self root},\ J_\ell<0\rangle.
$$
For the partner-hit sector,
$$
C_{p,+}(\mathfrak B)
=
\mathbb{Z}\langle b_\ell:\text{partner root},\ J_\ell>0\rangle,
\qquad
C_{p,-}(\mathfrak B)
=
\mathbb{Z}\langle b_\ell:\text{partner root},\ J_\ell<0\rangle.
$$
The unsigned ledgers are
$$
N_s
=
\operatorname{rank}_{\mathbb{Z}} C_{s,+}+\operatorname{rank}_{\mathbb{Z}} C_{s,-},
\qquad
M_p
=
\operatorname{rank}_{\mathbb{Z}} C_{p,+}+\operatorname{rank}_{\mathbb{Z}} C_{p,-}.
$$
The signed degrees
$$
D_t
=
\operatorname{rank}_{\mathbb{Z}} C_{s,+}-\operatorname{rank}_{\mathbb{Z}} C_{s,-},
\qquad
D_p
=
\operatorname{rank}_{\mathbb{Z}} C_{p,+}-\operatorname{rank}_{\mathbb{Z}} C_{p,-}
$$
are not extra entries in the compact assembly topological charge, but they are required side data and form the conserved-degree refinement $[\mathfrak B]_{\mathrm{deg}}$. A solver that reports only $N_s$ and $M_p$ has counted roots without proving which opposite-sign pairs can be born, die, or persist under deformation.

Equivalently, each source sector is a $\mathbb{Z}_2$-graded two-term root module, inheriting the signed causal-root-complex reading from [Master Equation](../dynamics/master-equation.md#signed-causal-root-complex):
$$
C_{\sigma,\bullet}
=
C_{\sigma,+}\oplus C_{\sigma,-},
\qquad
\sigma\in\{s,p\}.
$$
The unsigned ledgers $N_s$ and $M_p$ are ranks of a chosen presentation. They are useful live-channel counts, but they are not the conserved quantities across fold-pair surgery. The conserved local degree is the Euler characteristic
$$
\chi(C_{\sigma,\bullet})
=
\operatorname{rank}_{\mathbb{Z}} C_{\sigma,+}-\operatorname{rank}_{\mathbb{Z}} C_{\sigma,-}
=
D_\sigma.
$$
A generic fold birth adds one positive and one negative generator, so the presentation rank changes by two while $\chi(C_{\sigma,\bullet})$ is unchanged.

The geometric reading is intersection-theoretic. On a lifted finite-memory strip, each connected retained causal-locus component has an oriented intersection number with a generic receiver-time fiber. Let $\mathcal L_\sigma$ be the retained causal-locus chain in sector $\sigma\in\{s,p\}$ and let $F_{T_\ast}$ be a generic receiver-time fiber at fixed absolute time $T_\ast$. Then
$$
D_\sigma
=
\left\langle[\mathcal L_\sigma],[F_{T_\ast}]\right\rangle.
$$
On a regular one-parameter family with parameter $\mu$,
$$
\frac{d}{d\mu}
\left\langle[\mathcal L_\sigma(\mu)],[F_{T_\ast}]\right\rangle
=0.
$$
Fold-pair births and deaths appear as null-homologous bigons with local contributions $+1-1=0$. Summing oriented intersections in the self and partner sectors gives $D_t$ and $D_p$; summing their absolute values gives $N_s$ and $M_p$. This is the bridge to [Causal Action Functional](../dynamics/causal-action-functional.md#geometrictopological-framework): the same causal-locus components that carry action-counting weight also supply the signed root degrees used by the assembly topological charge.

The third entry comes from the phase-return chart of a resonance-locked Noether braid. Let $\theta_O,\theta_M,\theta_I$ be the outer, middle, and inner phase coordinates on the retained return chart. Exact integer closure over one outer period $P_O$ means
$$
\theta_O(T+P_O)=\theta_O(T)+2\pi,
$$
$$
\theta_M(T+P_O)=\theta_M(T)+2\pi m,
\qquad
\theta_I(T+P_O)=\theta_I(T)+2\pi n.
$$
Equivalently, the relative-phase one-forms
$$
\vartheta_M=d\theta_M-m\,d\theta_O,
\qquad
\vartheta_I=d\theta_I-n\,d\theta_O
$$
have integer holonomy and become flat on a promoted phase-locked branch. Let $\rho_O:S^1_O\to\mathfrak B$ be one retained outer return cycle. The shorthand
$$
c_1[\theta_O,\theta_M,\theta_I]
=
\left(
\operatorname{deg}(\theta_M\circ\rho_O),\,
\operatorname{deg}(\theta_I\circ\rho_O)
\right)
=(m,n)
$$
records this phase-return degree data. The doubling-frequency `4:2:1` candidate is the outer-normalized case $(m,n)=(2,4)$, equivalently canonical `I:M:O` frequency order $4:2:1$.

The symbol $c_1$ is retained as the established phase-entry notation, but it should not be read here as a literal first Chern class of principal circle bundles over the outer phase circle. Such bundles over $S^1_O$ are topologically trivial because $H^2(S^1_O;\mathbb{Z})=0$. The claim is the degree-pair claim
$$
(m,n)\in[S^1_O,S^1]\times[S^1_O,S^1]\cong\mathbb{Z}^2,
$$
with flat relative-phase recurrence on the retained return chart. If a later chart supplies a genuine two-torus curvature form, its first Chern number can be compared with this degree pair. Until then, $c_1=(m,n)$ means return-map degree data, not a curvature integral.

The doubling-frequency data $(m,n)=(2,4)$ belong specifically to the frequency-separated `NSH-421` comparison family. They are not generic Noether braid data. In particular, the [spindle braid](spindle-braid.md) is iso-frequency on one shared-axis phase chart: its three path families do not supply three independent orbital-plane normals, so the rank-three phase entry defined here is suspended rather than assigned $(1,1)$ or $(2,4)$. A spindle branch may still report the partial charge $(N_s,M_p)$; a spindle-native lower-rank return invariant would require a separate definition and certificate.

The phase entry is also conditional on the three support-row planes remaining independent. If $\hat{\mathbf n}_O,\hat{\mathbf n}_M,\hat{\mathbf n}_I$ are the retained orbital-plane normals, define
$$
D_{\mathrm{plane}}
=
\det\!\left[
\hat{\mathbf n}_O\ \hat{\mathbf n}_M\ \hat{\mathbf n}_I
\right].
$$
The degree pair is admissible only when
$$
|D_{\mathrm{plane}}|\ge \delta_{\mathrm{plane}}>0.
$$
When this floor fails, the three phases no longer supply an independent return chart, so $c_1$ must be suspended rather than compared across the degeneracy.

## Candidate Definition

For a finite-$\eta$ branch chart $\mathfrak B$, the assembly topological charge is admissible only when the following data are present on the same retained row set:

1. Active root rows split by transmitter identity: self-hit and partner-hit.
2. Jacobian-sign grading for those rows: $C_{s,+},C_{s,-},C_{p,+},C_{p,-}$.
3. Positive transversality floors away from declared finite caustic transits.
4. Finite memory depth and positive inactive-root gaps.
5. A finite local-to-global gluing result for the branch chart, or an explicit finite multistability family.
6. For a rank-three branch, integer phase closure, flat relative-phase connection, and a plane-independence floor $|D_{\mathrm{plane}}|\ge\delta_{\mathrm{plane}}>0$.
7. A return-map stability certificate, such as a Floquet or Conley-style branch certificate, after quotienting only true symmetry directions.
8. If the middle layer is treated as a caustic-grazing carrier, regulator-stable middle-caustic rows showing that the reported root degrees and phase-return entry do not depend on the finite-$\eta$ convention in the promoted limit.

Under those conditions the compact assembly topological charge is
$$
[\mathfrak B]_{\mathrm{top}}
=
\left(
N_s,\,
M_p,\,
c_1[\theta_O,\theta_M,\theta_I]
\right)
\in
\mathbb{Z}_{\ge0}\times\mathbb{Z}_{\ge0}\times\mathbb{Z}^2.
$$
For a Noether braid branch without a phase-return chart, the partial assembly topological charge $(N_s,M_p)$ may be recorded, but $c_1$ is not assigned until that chart exists.

A useful refinement is a branch-preserving chirality label
$$
\chi_{\mathrm{fr}}\in\mathbb{Z}_2.
$$
The richer ordered-braid chirality label $\chi_c$ is introduced in [Nested Shell Braid](braid-families.md#reduced-nested-shell-braid-closure-label). In this chapter, $\chi_{\mathrm{fr}}$ is the certified $\mathbb{Z}_2$ projection of that richer chirality data when the same branch chart supplies a deformation-stable handed marker, such as a framed self-linking sign or a certified maximal-curvature-binary circulation sign. It is not an independent competitor to $\chi_c$, and it is not part of the base triple until the projection is certified. It must be invariant under the same branch-preserving deformations that keep $(N_s,M_p,c_1)$ fixed, and it may flip only at an independent framing wall $\Sigma_{\mathrm{frame}}$ where the nonsingular framing floor fails. It is the natural place to record handedness, but it must not be substituted for the root and phase-return data. The two signs of the maximal-curvature-binary circulation are introduced in [Binary Dynamics](../dynamics/binary-dynamics.md#emergent-properties-and-measurement-standards).

## Invariance And Allowed Transitions

The assembly topological charge is designed to be locally invariant. Between branch boundaries, the implicit-function theorem transports each simple active root continuously, so $N_s$, $M_p$, $D_t$, and $D_p$ remain constant. At a generic fold, one positive and one negative root are created or annihilated. Therefore
$$
\left(\Delta N_s,\Delta M_p\right)\in\{(\pm2,0),(0,\pm2)\},
\qquad
\Delta D_t=\Delta D_p=0
$$
for an ordinary fold-pair event. In the sector where the fold occurs, the unsigned count changes by $\pm2$ while both signed degrees remain unchanged.

Cusp or higher singular strata are not automatically governed by the generic fold law. They require a separate regularized normal form before their ledger surgery can be promoted. Likewise, $c_1=(m,n)$ remains fixed under deformation only while the return-map degree pair is unchanged, the relative-phase connection stays flat, and the plane-independence floor remains positive. A loss of resonance lock, a plane-degeneracy transition, or a branch-fold event that changes the return chart can change the phase entry.

Near generic walls the transition stratification is product-like:
$$
\Sigma_{\mathrm{charge}}
=
\Sigma_{\mathrm{root}}
\cup
\Sigma_{\mathrm{phase}}
\cup
\Sigma_{\mathrm{plane}},
$$
with $\Sigma_{\mathrm{frame}}$ added when $\chi_{\mathrm{fr}}$ is part of the certified report. Away from intersections these are transverse codimension-one walls, so exactly one entry of the compact label or one certified refinement changes. Codimension-two intersections encode simultaneous events, such as a cusp, a root-plus-phase transition, or a plane-plus-phase transition; those require their own normal form before any ledger surgery is inferred.

The transition catalogue therefore has a native form:

| Event | Codimension | Assembly topological charge effect | Required certificate |
| --- | --- | --- | --- |
| Branch-preserving deformation | 0 on the retained chart | No change to $(N_s,M_p,c_1)$ or $(D_t,D_p,c_1)$ | Positive floors, finite memory, stable gluing |
| Self-root fold | 1 generically | $\Delta N_s=\pm2$, $\Delta D_t=0$ generically | Fold normal form and post-transit chart |
| Partner-root fold | 1 generically | $\Delta M_p=\pm2$, $\Delta D_p=0$ generically | Fold normal form and post-transit chart |
| Phase-lock jump | 1 for a resonance crossing | $\Delta c_1\ne0$ | Degree/holonomy change and return-map transition |
| Plane-degeneracy transition | 1 generically, higher with imposed symmetry | Phase-return chart may lose rank before $c_1$ can be compared | Orbital-plane determinant and return-chart continuation |
| Framing or chirality flip | 1 or higher, depending on the framing chart | $\Delta\chi_{\mathrm{fr}}\ne0$ | Framed-linking or handedness transition certificate |
| Cusp or deeper singular stratum | 2 or higher generically | Not inferred from fold law | Singular-stratum chart and regulator-stable transition data |

This is why the triple belongs in one object. The root ledgers describe which delayed causal channels are live, while the phase-return entry describes how the multi-layer branch returns to itself. Both are characteristic data of the same retained causal-root sheaf: local root sections, overlap gluing, and phase degree/holonomy must agree before an assembly label is promoted.

## Role In The Assembly Atlas

The topological atlas of assemblies should not classify objects by visual similarity alone. It should classify retained branches by deformation-stable integers that can be extracted from the same simulation record used to test the dynamics. The candidate atlas entry for a stable assembly is therefore
$$
\mathcal{Q}_{\mathrm{asm}}
=
\left(
N_s,\,
M_p,\,
c_1,\,
\chi_{\mathrm{fr}}\ \text{when certified}
\right)
$$
together with its stability margins, energy/wake ledger, and gluing status.

The intended use is constrained:

- $(N_s,M_p)$ records the binding-channel census: self-hit channels, partner-hit channels, and their signed degrees.
- $c_1=(m,n)$ records the resonance-lock return-map degree pair of a promoted rank-three branch; $(2,4)$ is the `NSH-421` doubling-frequency candidate, not a family-general value.
- $\chi_{\mathrm{fr}}$ records handedness only after a framed handed marker is certified.
- Physical particle identity, generation structure, spin-statistics, exclusion, and Standard Model quantum numbers are downstream mappings, not consequences of the notation alone.

Thus $(N_s,M_p,c_1)$ is the candidate conserved label that says when two assemblies occupy the same topological sector. It is not yet a proof that a given sector is an electron analogue, photon analogue, or quark analogue.
Strictly, the compact count triple is locally conserved only inside one nondegenerate branch domain. Across generic fold-pair surgery the degree-refined data $(D_t,D_p,c_1)$ are the conserved part, while $N_s$ and $M_p$ record how many live channels the retained branch currently carries.

## Simulation Extraction

A branch solver should extract the assembly topological charge in this order:

1. Build the finite-$\eta$ retained branch chart and declare its memory window.
2. Find active causal roots on the same retained row set.
3. Label each root by transmitter identity: self or partner.
4. Record the Jacobian sign and compute $C_{s,+},C_{s,-},C_{p,+},C_{p,-}$.
5. Compute $N_s$, $M_p$, $D_t$, and $D_p$.
6. Compute the lifted-strip fiber-intersection degrees that realize $D_t$ and $D_p$ whenever the causal-locus chart is available.
7. Track fold, caustic, cusp, or inactive-gap transition metadata.
8. For branches with a Noether braid phase-return chart, compute phase degree/holonomy $(m,n)$ from the returned phase chart, verify the floor $|D_{\mathrm{plane}}|\ge\delta_{\mathrm{plane}}>0$, and show that $(m,n)$ comes from the return map rather than from frequency ratios alone.
9. If a middle caustic-grazing carrier is used, test that the signed degrees and phase-return entry are stable under the declared $\eta$ refinement.
10. Test gluing and finite continuation cardinality for the local charts.
11. Test the return-map stability gap off true symmetry directions.
12. Report $[\mathfrak B]_{\mathrm{top}}$ only after the same retained rows pass these checks.

The failure modes are equally important. A candidate is not promoted if the roots are counted without signs, if self and partner rows are mixed, if the phase lock is inferred from frequency ratios without holonomy recurrence, if local branch charts do not glue, or if the continuation family is empty, infinite, or unlabeled.

## Status

The established pieces are local:

- The delay-map theorem pack in [Master Equation](../dynamics/master-equation.md#delay-map-theorem-pack-formalized) proves signed degree invariance on regular families and the generic opposite-sign fold-pair law.
- The signed causal-root complex in [Master Equation](../dynamics/master-equation.md#signed-causal-root-complex) supplies the local chain-complex reading of active roots.
- [Binary Dynamics](../dynamics/binary-dynamics.md#super-field-speed-root-ledgers-and-resonance-lock) supplies the self-hit and partner-hit ledger notation used by $(N_s,M_p)$.
- [Noether Braid Doubling-Frequency Resonance Lock](doubling-frequency-lock.md#assumption-2-exact-integer-phase-closure) supplies the `NSH-421` integer phase-closure data whose return-map degree pair is recorded as $c_1=(m,n)$; the iso-frequency spindle does not inherit that rank-three entry.
- [Effective Lagrangian](../dynamics/effective-lagrangian.md#topological-constraints-and-assembly-stability) uses the same topological sector in the action and mass-gap theorem target.

The open proof burden is global:

- prove that a stable assembly realizes a fixed assembly topological charge over a finite branch domain;
- prove gluing of the local causal-root charts into a finite labeled continuation family;
- prove a positive stability gap for the assembly topological charge sector;
- determine whether the entries are independent or constrained by radial balance, phase flatness, and Noether sea response, starting with the reachable theorem target that for a layer winding $k_a\in\{1,m,n\}$ the layerwise self-hit degree obeys a parity or lower-bound law $D_t^{(a)}\equiv f(k_a)\pmod 2$ derived from the circular self-hit fold-birth sequence and the lifted-strip fiber-intersection formula;
- prove that caustic-grazing middle-carrier rows have regulator-stable signed degrees and phase-return entries, so the assembly topological charge does not depend on the finite-$\eta$ convention used to regularize the hinge;
- map any certified sectors to observer-level particle quantum numbers without fitting the labels afterward.

The chapter should therefore be read as the canonical definition and proof target for assembly topological charge, not as the completed topological periodic table.
