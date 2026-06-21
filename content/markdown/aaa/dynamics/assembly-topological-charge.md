# Assembly Topological Charge

This chapter gives a first-class home to the candidate topological label of an architrino assembly. The label combines the causal-root ledger of the delayed dynamics with the phase-bundle winding of a resonance-locked nested shell swarm. Its purpose is to state what can be computed from a retained branch chart, what is invariant inside a nondegenerate branch domain, and what remains a theorem target before the label can serve as a topological periodic table of assemblies.

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
where $N_s$ counts active self-hit roots, $M_p$ counts active partner-hit roots, and $c_1$ denotes the phase-bundle winding data of the retained resonance lock. For a tri-binary lock this last entry is usually a pair
$$
c_1=(m,n)\in\mathbb{Z}^2
$$
rather than a scalar integer: $m$ and $n$ are the middle and inner winding numbers over one outer period.

This is a definition and closure target, not a completed classification theorem. It becomes a physical assembly label only after the same retained branch chart supplies positive root floors, finite memory, finite local-to-global gluing, stable return data, and a closed wake-history boundary ledger.

## Source Of The Three Entries

The first two entries come from the causal-root complex of the Master Equation. On a retained branch chart, active roots are split by source identity and by Jacobian sign. For the self-hit sector,
$$
C_{s,+}(\mathfrak B)
=
\mathrm{span}\{s_\ell:\text{self root},\ J_\ell>0\},
\qquad
C_{s,-}(\mathfrak B)
=
\mathrm{span}\{s_\ell:\text{self root},\ J_\ell<0\}.
$$
For the partner-hit sector,
$$
C_{p,+}(\mathfrak B)
=
\mathrm{span}\{s_\ell:\text{partner root},\ J_\ell>0\},
\qquad
C_{p,-}(\mathfrak B)
=
\mathrm{span}\{s_\ell:\text{partner root},\ J_\ell<0\}.
$$
The unsigned ledgers are
$$
N_s
=
\dim C_{s,+}+\dim C_{s,-},
\qquad
M_p
=
\dim C_{p,+}+\dim C_{p,-}.
$$
The signed degrees
$$
D_s
=
\dim C_{s,+}-\dim C_{s,-},
\qquad
D_p
=
\dim C_{p,+}-\dim C_{p,-}
$$
are not extra entries in the compact charge, but they are required side data. A solver that reports only $N_s$ and $M_p$ has counted roots without proving which opposite-sign pairs can be born, die, or persist under deformation.

The third entry comes from the phase bundle of a resonance-locked tri-binary. Let $\theta^O,\theta^M,\theta^I$ be the outer, middle, and inner phase coordinates on the retained return chart. Exact integer closure over one outer period $T_O$ means
$$
\theta_O(t+T_O)=\theta_O(t)+2\pi,
$$
$$
\theta_M(t+T_O)=\theta_M(t)+2\pi m,
\qquad
\theta_I(t+T_O)=\theta_I(t)+2\pi n.
$$
Equivalently, the relative-phase one-forms
$$
\vartheta_M=d\theta^M-m\,d\theta^O,
\qquad
\vartheta_I=d\theta^I-n\,d\theta^O
$$
have integer holonomy and become flat on a promoted phase-locked branch. The shorthand
$$
c_1[\theta^O,\theta^M,\theta^I]=(m,n)
$$
records this phase-bundle winding data. The dyadic candidate is the outer-normalized case $(m,n)=(2,4)$, equivalently canonical `I:M:O` frequency order $4:2:1$.

## Candidate Definition

For a finite-$\eta$ branch chart $\mathfrak B$, the assembly topological charge is admissible only when the following data are present on the same retained row set:

1. Active root rows split by source identity: self-hit and partner-hit.
2. Jacobian-sign grading for those rows: $C_{s,+},C_{s,-},C_{p,+},C_{p,-}$.
3. Positive transversality floors away from declared finite caustic transits.
4. Finite memory depth and positive inactive-root gaps.
5. A finite local-to-global gluing result for the branch chart, or an explicit finite multistability family.
6. For a tri-binary, integer phase closure and flat relative-phase connection.
7. A return-map stability certificate, such as a Floquet or Conley-style branch certificate, after quotienting only true symmetry directions.

Under those conditions the compact topological charge is
$$
[\mathfrak B]_{\mathrm{top}}
=
\left(
N_s,\,
M_p,\,
c_1[\theta^O,\theta^M,\theta^I]
\right)
\in
\mathbb{Z}_{\ge0}\times\mathbb{Z}_{\ge0}\times\mathbb{Z}^2.
$$
For a non-tri-binary branch, the partial charge $(N_s,M_p)$ may be recorded, but $c_1$ is not assigned until a phase-bundle chart exists.

A useful refinement is a branch-preserving chirality label
$$
\chi_{\mathrm{fr}}\in\mathbb{Z}_2.
$$
This is not part of the base triple until the branch chart supplies a deformation-stable handed marker, such as framed self-linking parity or a certified maximal-curvature-binary circulation sign. It is the natural place to record handedness, but it must not be substituted for the root and phase-bundle data.

## Invariance And Allowed Transitions

The charge is designed to be locally invariant. Between branch boundaries, the implicit-function theorem transports each simple active root continuously, so $N_s$, $M_p$, $D_s$, and $D_p$ remain constant. At a generic fold, one positive and one negative root are created or annihilated. Therefore
$$
\Delta N_s\in 2\mathbb{Z}
\quad\text{or}\quad
\Delta M_p\in 2\mathbb{Z},
\qquad
\Delta D_s=\Delta D_p=0
$$
for an ordinary fold-pair event in the corresponding sector.

Cusp or higher singular strata are not automatically governed by the generic fold law. They require a separate regularized normal form before their ledger surgery can be promoted. Likewise, $c_1=(m,n)$ remains fixed under deformation only while the phase connection stays flat and the phase torus returns without monodromy. A loss of resonance lock, a plane-degeneracy transition, or a branch-fold event that changes the return chart can change the phase-bundle entry.

The transition catalogue therefore has a native form:

| Event | Charge effect | Required certificate |
| --- | --- | --- |
| Branch-preserving deformation | No change to $(N_s,M_p,c_1)$ | Positive floors, finite memory, stable gluing |
| Self-root fold | $\Delta N_s=\pm2$ generically | Fold normal form and post-transit chart |
| Partner-root fold | $\Delta M_p=\pm2$ generically | Fold normal form and post-transit chart |
| Phase-lock jump | $\Delta c_1\ne0$ | Holonomy change and return-map transition |
| Framing or chirality flip | $\Delta\chi_{\mathrm{fr}}\ne0$ | Framed-linking or handedness transition certificate |
| Cusp or deeper singular stratum | Not inferred from fold law | Singular-stratum chart and regulator-stable transition data |

This is why the triple belongs in one object. The root ledgers describe which delayed causal channels are live, while the phase-bundle entry describes how the multi-layer branch returns to itself. Both are characteristic data of the same retained causal-root sheaf: local root sections, overlap gluing, and phase holonomy must agree before an assembly label is promoted.

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
- $c_1=(m,n)$ records the resonance-lock winding of a promoted tri-binary branch.
- $\chi_{\mathrm{fr}}$ records handedness only after a framed handed marker is certified.
- Physical particle identity, generation structure, spin-statistics, exclusion, and Standard Model quantum numbers are downstream mappings, not consequences of the notation alone.

Thus $(N_s,M_p,c_1)$ is the candidate conserved label that says when two assemblies occupy the same topological sector. It is not yet a proof that a given sector is an electron analogue, photon analogue, or quark analogue.

## Simulation Extraction

A branch solver should extract the charge in this order:

1. Build the finite-$\eta$ retained branch chart and declare its memory window.
2. Find active causal roots on the same retained row set.
3. Label each root by source identity: self or partner.
4. Record the Jacobian sign and compute $C_{s,+},C_{s,-},C_{p,+},C_{p,-}$.
5. Compute $N_s$, $M_p$, $D_s$, and $D_p$.
6. Track fold, caustic, cusp, or inactive-gap transition metadata.
7. For tri-binary branches, compute phase holonomy $(m,n)$ from the returned phase chart.
8. Test gluing and finite continuation cardinality for the local charts.
9. Test the return-map stability gap off true symmetry directions.
10. Report $[\mathfrak B]_{\mathrm{top}}$ only after the same retained rows pass these checks.

The failure modes are equally important. A candidate is not promoted if the roots are counted without signs, if self and partner rows are mixed, if the phase lock is inferred from frequency ratios without holonomy recurrence, if local branch charts do not glue, or if the continuation family is empty, infinite, or unlabeled.

## Current Status

The established pieces are local:

- The delay-map theorem pack in [Master Equation](master-equation.md#delay-map-theorem-pack-formalized) proves signed degree invariance on regular families and the generic opposite-sign fold-pair law.
- The signed causal-root complex in [Master Equation](master-equation.md#signed-causal-root-complex) supplies the local chain-complex reading of active roots.
- [Binary Dynamics](binary-dynamics.md#super-field-speed-root-ledgers-and-resonance-lock) supplies the self-hit and partner-hit ledger notation used by $(N_s,M_p)$.
- [Dyadic Resonance Lock](dyadic-resonance-lock.md#exact-integer-phase-closure) supplies the integer phase-closure data whose winding is recorded as $c_1=(m,n)$.
- [Effective Lagrangian](effective-lagrangian.md#topological-constraints-and-assembly-stability) uses the same topological sector in the action and mass-gap theorem target.

The open proof burden is global:

- prove that a stable assembly realizes a fixed charge over a finite branch domain;
- prove gluing of the local causal-root charts into a finite labeled continuation family;
- prove a positive stability gap for the charge sector;
- determine whether the entries are independent or constrained by radial balance, phase flatness, and Noether sea response;
- map any certified sectors to observer-level particle quantum numbers without fitting the labels afterward.

The chapter should therefore be read as the canonical definition and proof target for assembly topological charge, not as the completed topological periodic table.
