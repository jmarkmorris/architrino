# Finite Branch-Candidate Set Packet

Status. Priority proof packet for `tri_binary_partition_rule`, feeding the deterministic residual law in [branch-selection-law-packet.md](branch-selection-law-packet.md). This packet defines the finite retained branch-candidate set that must be generated before residual ranking. It is priority material, not AAA prose, and it does not promote branch uniqueness, spinor closure, measurement response, or Bell recovery to theorem status.

Claim level. The packet replaces the abstract candidate source

$$
\mathcal A(B^-,\Gamma_{\text{coupl}},W)
$$

with a finite retained generator output

$$
\mathcal A_N(B^-,\Gamma_{\text{coupl}},W)
$$

whose records carry row identity, quotient witnesses, interval payloads, and blocked-row diagnostics. It does not add a new gate. The existing branch-selection residual vector $\mathcal R_{\mathrm{sel}}$ and lexicographic selection functional $\mathcal J_{\mathrm{sel}}$ remain the consumer. A theorem-grade branch-selection result still requires evaluated retained rows and either a unique selected post-branch or a declared physical tie-breaking invariant.

## Enumeration Inputs

Fix the transition window

$$
W=[t_i,t_f],
$$

the pre-transaction branch chart $B^-$, and the coupling datum

$$
\Gamma_{\text{coupl}}
=
\left(
\sigma,
\Delta E_{\text{coupl}},
\Delta\mathbf J_{\text{coupl}},
\hat{\mathbf a},
\mathrm{Geom}_{\text{coupl}}
\right),
\qquad
\sigma\in\{+1,-1\}.
$$

The finite enumeration also fixes a retained-row budget

$$
N
=
\left(
N_{\mathrm{act}},
N_{\mathrm{inact}},
N_{\mathrm{fold}},
N_{\mathrm{sep}},
N_{\mathrm{grp}},
N_{\mathrm{route}},
N_{\mathrm{box}}
\right).
$$

Here $N_{\mathrm{act}}$ bounds active retained rows, $N_{\mathrm{inact}}$ bounds inactive-root gap rows retained for exclusion checks, $N_{\mathrm{fold}}$, $N_{\mathrm{sep}}$, and $N_{\mathrm{grp}}$ bound local fold, separator, and grouped-channel updates, $N_{\mathrm{route}}$ bounds declared wake, transport, root-energy, and recoil routing events, and $N_{\mathrm{box}}$ bounds interval solution boxes emitted per generator word. These are enumeration controls, not physical selection weights.

The pre-chart must expose the finite anchor set

$$
\mathfrak X_N(B^-)
=
\left(
\mathcal R_{B^-}^{\mathrm{act},N},
\mathcal G_{B^-}^{\mathrm{inact},N},
\mathfrak H_{B^-}^{N},
\mathcal E_{\mathrm{loc}}^{N},
\mathcal Q_{\mathrm{route}}^{N}
\right),
$$

where $\mathcal R_{B^-}^{\mathrm{act},N}$ is the retained active causal-root row set on $W$, $\mathcal G_{B^-}^{\mathrm{inact},N}$ is the retained inactive-root gap list, $\mathfrak H_{B^-}^{N}$ is the retained path-history record, $\mathcal E_{\mathrm{loc}}^{N}$ is the finite list of local chart neighborhoods eligible for continuation, and $\mathcal Q_{\mathrm{route}}^{N}$ is the finite list of declared source, apparatus, wake, root-energy, and transport routing slots supplied by $\Gamma_{\text{coupl}}$.

If any one of these finite anchor lists is absent, candidate enumeration is blocked:

$$
\mathcal A_N^{\mathrm{blk}}(B^-,\Gamma_{\text{coupl}},W)
\ne
\varnothing.
$$

That verdict is not a forbidden transaction. It says the finite retained candidate set has not been populated.

## Local Generator Alphabet

The local generator alphabet is the finite set

$$
\mathfrak G_N^{\mathrm{loc}}
=
\mathfrak G_{\mathrm{cont}}
\cup
\mathfrak G_{\mathrm{fold}}
\cup
\mathfrak G_{\mathrm{sep}}
\cup
\mathfrak G_{\mathrm{grp}}
\cup
\mathfrak G_{\mathrm{retune}}
\cup
\mathfrak G_{\mathrm{wake}}
\cup
\mathfrak G_{\mathrm{route}}
\cup
\mathfrak G_{\mathrm{refl}}.
$$

Each generator is tied to a retained anchor in $\mathfrak X_N(B^-)$ and must report its row-lineage map

$$
\lambda_g:
\mathcal R_{B^-}^{\mathrm{act},N}
\dashrightarrow
\mathcal R_{B_g^+}^{\mathrm{act},N}.
$$

The allowed local generators are:

1. $\mathfrak G_{\mathrm{cont}}$: root-continuation generators. They continue an active row $\rho$ from $B^-$ to $B^+$ without changing the root-ledger class, phase cell, endpoint convention, or wake pullback domain.
2. $\mathfrak G_{\mathrm{fold}}$: fold or unfold generators. They add or remove active roots only through a declared fold chart, and they must report the Jacobian floor interval and the inactive-root gap interval on both sides of the event.
3. $\mathfrak G_{\mathrm{sep}}$: raw separator generators. For self-hit rows on raw simple-root separator charts they must obey
   $$
   \Delta N_{\text{self}}\in2\mathbb Z,
   \qquad
   \Delta D=0.
   $$
   A raw separator generator with odd $\Delta N_{\text{self}}$ or nonzero $\Delta D$ is locally excluded, not merely blocked.
4. $\mathfrak G_{\mathrm{grp}}$: grouped-channel generators. They replace a raw set of simple roots by one declared grouped channel only when the grouped channel carries the same source/receiver identities, phase-cell data, and wake pullback contribution needed by the partition rows.
5. $\mathfrak G_{\mathrm{retune}}$: layer retune generators. They emit interval boxes for
   $$
   \left(
   \Delta R_\ell,
   \Delta\omega_\ell,
   \Delta\hat{\mathbf n}_\ell
   \right)_{\ell\in\{I,M,O\}}
   $$
   and compute the corresponding $\Delta\mathbf L_{\mathrm{mech},\ell}^{B^+}$ rows. A retune generator may not adjust $\hat{\mathbf a}$, $\sigma$, or source recoil data; those are fixed by $\Gamma_{\text{coupl}}$.
6. $\mathfrak G_{\mathrm{wake}}$: normalized delayed-interior characteristic-tail wake generators. They declare the retained wake source for
   $$
   \Delta\mathbf J_{\mathrm{wake},B^+}^{(\eta)}[W],
   \qquad
   \Delta E_{\mathrm{wake},B^+}^{(\eta)}.
   $$
   A nonzero wake term without this retained action-kernel pullback is hidden routing slack and is locally excluded.
7. $\mathfrak G_{\mathrm{route}}$: transport and root-energy routing generators. They declare nonzero $\Delta\mathbf L_{\mathrm{tr}}^{B^+}$ or $\Delta E_{\mathrm{root}}^{B^+}$ with a row source in the branch chart. An unsourced transport or root-energy term is locally excluded.
8. $\mathfrak G_{\mathrm{refl}}$: reflection or recoil generators. They produce stable recoil branches with no accepted core partition change and an outgoing source or apparatus channel carrying the reflected angular momentum. They are blocked if $\mathrm{Geom}_{\text{coupl}}$ does not provide a recoil channel.

A generator word is a finite sequence

$$
\mathbf g
=
\left(g_1,\ldots,g_q\right),
\qquad
q\le N_{\mathrm{fold}}+N_{\mathrm{sep}}+N_{\mathrm{grp}}+N_{\mathrm{route}}+3,
$$

where the final $+3$ allows one layer-retune block for each of $I$, $M$, and $O$. The word is admissible only if every intermediate chart preserves the declared endpoint convention, retained row budget, and row-lineage map.

The finite generator-word set is

$$
\mathfrak W_N(B^-,\Gamma_{\text{coupl}},W)
=
\left\{
\mathbf g:
\mathbf g\text{ is an admissible word in }\mathfrak G_N^{\mathrm{loc}}
\right\}.
$$

Finiteness comes from the finite retained anchors, finite generator counts, and finite interval-box cap $N_{\mathrm{box}}$. The continuum branch variables are not enumerated as point samples; they are retained as interval boxes attached to generator words.

## Candidate Record

For each generator word $\mathbf g\in\mathfrak W_N$, the enumerator emits zero or more candidate records

$$
\mathfrak a_N
=
\left(
B^+,
\boldsymbol{\Delta I},
\kappa,
\mathfrak m_{B^+},
\lambda_{\mathbf g},
\mathcal P_{\mathrm{num}},
\mathcal Q_{\mathrm{iso}},
\upsilon
\right).
$$

The first four entries match the branch-selection law packet:

$$
\boldsymbol{\Delta I}
=
\left(
\Delta I_{\text{inner}},
\Delta I_{\text{middle}},
\Delta I_{\text{outer}},
\Delta I_{\text{wake}}
\right),
$$

$\kappa\in\{\mathrm{core},\mathrm{wake},\mathrm{refl}\}$ is the declared outcome class, and $\mathfrak m_{B^+}$ is the post-branch microstate data retained for physical tie-breaking.

The new entries are enumeration payload:

- $\lambda_{\mathbf g}$ is the complete row-lineage map, including continued rows, newly active rows, dropped rows, grouped rows, and inactive-gap witnesses.
- $\mathcal P_{\mathrm{num}}$ is the interval or numerical payload needed to evaluate $\mathfrak C_{\mathbf J}$ and $\mathcal R_{\mathrm{sel}}$.
- $\mathcal Q_{\mathrm{iso}}$ is the quotient witness used for deduplication.
- $\upsilon\in\{\mathrm{evaluable},\mathrm{blocked},\mathrm{locally\_excluded}\}$ is the enumeration verdict before residual ranking.

The finite retained branch-candidate output is partitioned as

$$
\mathcal A_N
=
\mathcal A_N^{\mathrm{eval}}
\cup
\mathcal A_N^{\mathrm{blk}}
\cup
\mathcal A_N^{\mathrm{excl}},
$$

where the three subsets are separated by $\upsilon$. Only $\mathcal A_N^{\mathrm{eval}}$ is passed to the existing residual ranking. The blocked and locally excluded subsets remain part of the audit trail.

## Retained Row-Set Constraints

A candidate can enter $\mathcal A_N^{\mathrm{eval}}$ only when the retained active rows used by force, torque, normalized tail-wake pullback, and partition residuals are identical:

$$
\mathcal R_{\mathrm{force}}^{\mathrm{act}}
=
\mathcal R_{\mathrm{torque}}^{\mathrm{act}}
=
\mathcal R_{\mathrm{wake}}^{\mathrm{act}}
=
\mathcal R_{\mathrm{part}}^{\mathrm{act}}
=
\mathcal R_N^{\mathrm{act}}(B^+).
$$

This is a row-identity requirement, not a residual tolerance. If the row sets differ, the candidate is locally excluded because it would let one ledger borrow rows from another ledger.

The candidate must also provide the post-branch retained chart object

$$
\mathfrak{B}_{N}^{+}
=
\left(
\mathcal{R}_{N}^{\mathrm{act}}(B^+),
\mathcal{G}_{N}^{\mathrm{inact}}(B^+),
\nu_J(B^+),
h_{\mathrm{mem}}(B^+),
\mathcal{R}_{\mathrm{return}}(B^+),
\lambda_{\mathrm{sec}}^{B^+}
\right),
$$

with the same $\eta$, $\epsilon_c$, endpoint convention, and history window used by the wake pullback and torque rows. Missing values in this object make the candidate blocked. Negative certified margins, such as a certified nonpositive inactive gap or a certified nonpositive Jacobian floor, make the candidate locally excluded.

Row lineage is recorded as

$$
\lambda_{\mathbf g}(\rho)
=
\begin{cases}
\rho',
&\rho\text{ continues as a retained active row},\\
\bot_{\mathrm{drop}}(r),
&\rho\text{ is dropped by declared reason }r,\\
\bot_{\mathrm{grp}}(U),
&\rho\text{ is absorbed into grouped channel }U.
\end{cases}
$$

Every newly active row $\rho'\in\mathcal R_N^{\mathrm{act}}(B^+)$ not in the image of $\lambda_{\mathbf g}$ must have a provenance label

$$
\pi(\rho')
\in
\{\mathrm{fold},\mathrm{separator},\mathrm{grouped},\mathrm{wake},\mathrm{recoil}\}.
$$

A row with no provenance label is blocked if the chart data needed to decide it is absent, and locally excluded if it is used in a residual without provenance.

## Quotient And Deduplication Rules

Two records $\mathfrak a_N$ and $\mathfrak b_N$ are duplicate representatives only if there is a declared chart isomorphism

$$
\Theta:
\mathfrak a_N
\longrightarrow
\mathfrak b_N
$$

that maps all of the following data onto one another:

$$
\left(
\mathcal R_N^{\mathrm{act}},
\mathcal G_N^{\mathrm{inact}},
\mathfrak H_N,
\lambda_{\mathbf g},
\text{phase cells},
\Delta\mathbf J_{\mathrm{wake},B}^{(\eta)}[W],
\mathcal R_{\mathrm{part}},
\mathfrak m_{B^+}
\right).
$$

The quotient may remove:

- arbitrary internal row identifiers;
- ordering of commuting independent generator updates;
- duplicate interval boxes produced by the same local equation solve;
- smooth phase reparameterization inside the same declared phase cell;
- member relabeling inside a binary only when the path-history records, phase-cell orientation, wake pullback, and projected angular-momentum rows are carried by the same isomorphism.

The quotient may not remove:

- permutations of the layer roles $I$, $M$, and $O$;
- reversal of $\hat{\mathbf a}$, $\sigma$, or the supplied coupling geometry;
- reversal of oriented normal data when it changes $\Delta\hat{\mathbf n}_\ell$ or the transverse residual;
- a raw separator event versus a grouped-channel event when their residual rows differ;
- branch-changing causal-root relabeling;
- source, apparatus, recoil, wake, or transport routing differences.

Let

$$
\operatorname{Can}_N(\mathfrak a_N)
$$

be the canonical quotient key after the allowed isomorphism. The deduplicated evaluable set is

$$
\mathcal A_N^{\mathrm{eval}}/\!\cong_B
=
\left\{
\operatorname{Can}_N(\mathfrak a_N):
\mathfrak a_N\in\mathcal A_N^{\mathrm{eval}}
\right\}.
$$

Exact duplicates do not create branch dependence. Non-isomorphic candidates with equal or overlapping residual intervals are retained separately and passed to the branch-selection law as a tolerance tie or exact physical tie candidate.

If two records claim the same canonical key but carry incompatible interval payloads, the key is not silently merged. The quotient row is blocked:

$$
\upsilon=\mathrm{blocked},
\qquad
\mathrm{reason}=\mathrm{quotient\_payload\_conflict}.
$$

## Interval And Numerical Payload

The payload $\mathcal P_{\mathrm{num}}$ must be large enough to evaluate the residual vector in the branch-selection law without returning to generator labels. A retained candidate row should contain:

| Payload field | Required content | Consumer |
| --- | --- | --- |
| `generator_word` | Ordered local generators and commuting-update normalization. | Quotient and audit trail. |
| `outcome_class` | $\kappa\in\{\mathrm{core},\mathrm{wake},\mathrm{refl}\}$. | Outcome priority in $\mathcal J_{\mathrm{sel}}$. |
| `row_set` | $\mathcal R_N^{\mathrm{act}}(B^+)$, $\mathcal G_N^{\mathrm{inact}}(B^+)$, endpoint convention, $\eta$, $\epsilon_c$, and history window. | $r_{\mathrm{rows}}$, $r_{\mathrm{root}}$, $r_{\mathrm{pull}}$. |
| `root_payload` | Interval enclosures for $\epsilon_{\mathrm{root}}(B^\pm)$, $\epsilon_{\mathrm{rt}}(B^\pm)$, $\nu_J(B^\pm)$, and $g_{\mathrm{inact}}(B^\pm)$. | $r_{\mathrm{root}}$. |
| `phase_payload` | Interval enclosures for $\epsilon_{\Phi}(B^\pm)$ and phase-cell labels. | $r_{\Phi}$ and quotient. |
| `retune_payload` | Interval boxes for $\Delta R_\ell$, $\Delta\omega_\ell$, $\Delta\hat{\mathbf n}_\ell$, speed-regime rows, and $\Delta\mathbf L_{\mathrm{mech},\ell}^{B^+}$. | $r_{\mathrm{part}}$, $\mathcal D_{\mathrm{cont}}$. |
| `separator_payload` | $\Delta N_{\text{self}}$, $\Delta D$, self-delay root intervals, and raw-versus-grouped chart declaration. | Local exclusion and branch-chart replay. |
| `wake_payload` | $\Delta\mathbf J_{\mathrm{wake},B^+}^{(\eta)}[W]$, $\Delta E_{\mathrm{wake},B^+}^{(\eta)}$, $\mathcal R_{\mathrm{wake}}^{B^+}$, and the retained action-kernel pullback domain. | $r_{\mathrm{pull}}$, $r_{\mathrm{route}}$, $\mathcal D_{\mathrm{route}}$. |
| `torque_payload` | $\mathcal R_{T,\ell}^{B^+}$ for $\ell\in\{I,M,O\}$. | $r_{\mathrm{pull}}$. |
| `partition_payload` | $\boldsymbol{\Delta I}$, $\mathcal R_{\mathbf J}^{B^+}$, $\mathcal R_I^{B^+}$, $\mathcal R_{\perp}^{B^+}$, and $\mathcal R_E^{B^+}$. | $r_{\mathrm{part}}$. |
| `route_payload` | $\Delta\mathbf L_{\mathrm{tr}}^{B^+}$, $\Delta E_{\mathrm{root}}^{B^+}$, recoil channel data, and $\chi_{\mathrm{undecl}}$. | $r_{\mathrm{route}}$, $\mathcal D_{\mathrm{route}}$. |
| `stability_payload` | $\mathcal R_{\mathrm{return}}(B^+)$, $\rho(M_{\mathcal S}\vert_{E_\perp})$, $\lambda_{\mathrm{sec}}^{B^+}$, or a declared positive trapping replacement. | $r_{\mathrm{stab}}$. |
| `tie_payload` | $\tau_{\mathfrak m}$ or an explicit reason it is absent. | Final tie-breaking entry in $\mathcal J_{\mathrm{sel}}$. |

Each numerical scalar used in ranking should be an interval

$$
[x^- ,x^+]
$$

or a point value with a declared error enclosure. Point values with no error enclosure are acceptable only for symbolic rows that are exact inside the declared chart, such as the clean scalar partition in the minimal four-substep instance.

The residual law consumes interval payloads by interval extension. A candidate passes a hard residual row only if the entire interval is at or below tolerance. A candidate fails a hard residual row only if the entire interval is above tolerance or violates a certified sign condition. If the interval straddles the tolerance and no refinement policy is supplied, the candidate remains evaluable but can produce a tolerance tie under the branch-selection law.

## Blocked Versus Forbidden

Enumeration has three pre-ranking verdicts.

A record is `evaluable` when all inputs needed by $\mathfrak C_{\mathbf J}$ and $\mathcal R_{\mathrm{sel}}$ are present, the retained row-set identity holds, no local exclusion is certified, and the quotient witness is populated.

A record is `blocked` when the generator word is allowed but one of the following data requirements is missing or undecidable:

- retained active rows or inactive-gap rows;
- row-lineage map or new-row provenance;
- endpoint convention, $\eta$, $\epsilon_c$, or history window;
- root replay, root transport, phase lock, torque consistency, normalized tail-wake pullback, or section-stability rows;
- declared source, apparatus, wake, transport, recoil, or root-energy routing data;
- quotient witness or $\tau_{\mathfrak m}$ needed to separate non-isomorphic ties.

A record is `locally_excluded` when the retained data certify a hard violation before residual ranking, including:

- force, torque, wake, and partition rows are not the same retained active row set;
- a raw self-root separator row has $\Delta N_{\text{self}}\notin2\mathbb Z$ or $\Delta D\ne0$;
- a nonzero wake, transport, recoil, or root-energy term has no declared branch-chart source;
- the candidate changes $\sigma$, $\hat{\mathbf a}$, $\Delta E_{\text{coupl}}$, or $\Delta\mathbf J_{\text{coupl}}$ instead of holding $\Gamma_{\text{coupl}}$ fixed;
- an interval certificate proves $\nu_J\le0$, $g_{\mathrm{inact}}\le0$, or $1-\lambda_{\mathrm{sec}}^{B^+}\le0$;
- the reflection generator lacks a physical outgoing source or apparatus channel but still claims $\kappa=\mathrm{refl}$.

The transaction verdict `forbidden` belongs only after the existing residual law evaluates all evaluable candidates:

$$
\mathcal A_{\mathrm{core}}^{\mathrm{pass}}
=
\mathcal A_{\mathrm{wake}}^{\mathrm{pass}}
=
\mathcal A_{\mathrm{refl}}^{\mathrm{pass}}
=
\varnothing,
\qquad
\mathcal A_N^{\mathrm{blk}}=\varnothing.
$$

Locally excluded records may appear in the audit trail, but they do not by themselves prove a forbidden transaction if any allowed candidate remains blocked.

## Definition Of The Finite Candidate Set

Let

$$
\operatorname{Emit}_N(\mathbf g;B^-,\Gamma_{\text{coupl}},W)
$$

be the finite interval-box emitter for an admissible generator word. The retained pre-quotient set is

$$
\widetilde{\mathcal A}_N(B^-,\Gamma_{\text{coupl}},W)
=
\bigcup_{\mathbf g\in\mathfrak W_N(B^-,\Gamma_{\text{coupl}},W)}
\operatorname{Emit}_N(\mathbf g;B^-,\Gamma_{\text{coupl}},W).
$$

After applying the quotient rule above, define

$$
\boxed{
\mathcal A_N(B^-,\Gamma_{\text{coupl}},W)
=
\left(
\widetilde{\mathcal A}_N^{\mathrm{eval}}/\!\cong_B,
\widetilde{\mathcal A}_N^{\mathrm{blk}},
\widetilde{\mathcal A}_N^{\mathrm{excl}}
\right).
}
$$

The branch-selection law consumes

$$
\mathcal A_N^{\mathrm{eval}}/\!\cong_B
$$

in place of the abstract $\mathcal A(B^-,\Gamma_{\text{coupl}},W)$. As $N$ is refined, the theorem target is branch-selection stability:

$$
\operatorname{Sel}_{B,N}
\left(
\Gamma_{\text{coupl}},
\mathfrak m_{B^-};W
\right)
\longrightarrow
\operatorname{Sel}_{B}
\left(
\Gamma_{\text{coupl}},
\mathfrak m_{B^-};W
\right),
$$

provided the same physical retained row class persists and the quotient key does not change. This is a convergence target, not a theorem proven by this packet.

## Minimal Four-Substep Calibration Family

The first calibration family is seeded by [minimal-four-substep-certificate-instance.md](minimal-four-substep-certificate-instance.md). It uses the generator word

$$
\mathbf g_{\min}^{\mathrm{core}}(\sigma)
=
\mathsf C_{\mathrm{rows}}
\circ
\mathsf T_O(\sigma)
\circ
\mathsf T_M(\sigma)
\circ
\mathsf S_I(2\sigma)
\circ
\mathsf T_I(\sigma),
$$

where $\mathsf C_{\mathrm{rows}}$ keeps the declared retained rows, $\mathsf T_O$ is the outer interface retune, $\mathsf T_M$ is the middle hinge retune, $\mathsf S_I(2\sigma)$ is the raw two-self-hit separator update, and $\mathsf T_I$ is the inner fixed-radius retune.

For $\sigma=+1$, the clean core candidate payload is

$$
\boldsymbol{\Delta I}_{\min}
=
\left(
\frac{\hbar}{2},
\frac{\hbar}{4},
\frac{\hbar}{4},
0
\right),
$$

with

$$
\Delta\mathbf J_{\text{coupl}}=\hbar\hat{\mathbf a},
\qquad
\Delta\mathbf L_{\mathrm{tr}}^{B_{\min}}=\mathbf 0,
\qquad
\Delta\mathbf J_{\mathrm{wake},B_{\min}}^{(\eta)}[W]=\mathbf 0.
$$

The sign-reflected symbolic calibration row, when the same chart orientation supports it, is

$$
\boldsymbol{\Delta I}_{\min}(\sigma)
=
\left(
\frac{\sigma\hbar}{2},
\frac{\sigma\hbar}{4},
\frac{\sigma\hbar}{4},
0
\right),
\qquad
\Delta\mathbf J_{\text{coupl}}=\sigma\hbar\hat{\mathbf a}.
$$

This sign-reflected row is not automatically accepted. Its retune intervals, speed-regime rows, self-delay rows, and stability rows must be evaluated in the supplied chart.

The calibration family is

$$
\mathcal F_{\min,N}(\sigma)
=
\left\{
\mathfrak a_{\min}^{\mathrm{clean}},
\mathfrak a_{\min}^{\mathrm{wakeE}},
\mathfrak a_{\min}^{\mathrm{rootE}},
\mathfrak a_{\min}^{\mathrm{refl}}
\right\}.
$$

The four entries have distinct enumeration purposes:

| Calibration row | Generator content | Enumeration verdict before residual ranking |
| --- | --- | --- |
| $\mathfrak a_{\min}^{\mathrm{clean}}$ | Clean four-substep core retune with $\Delta\mathbf L_{\mathrm{tr}}=\mathbf 0$ and $\Delta\mathbf J_{\mathrm{wake}}^{(\eta)}=\mathbf 0$. | Evaluable only when root, phase, torque, wake pullback, energy, and stability payloads are populated. Otherwise blocked. |
| $\mathfrak a_{\min}^{\mathrm{wakeE}}$ | Same mechanical four-substep retune with declared wake-energy payload closing $\mathcal R_E$. | Outcome class $\mathrm{wake}$ when $\Delta E_{\mathrm{wake},B}^{(\eta)}$ is nonzero and evaluated; blocked if the normalized wake pullback is absent. |
| $\mathfrak a_{\min}^{\mathrm{rootE}}$ | Same mechanical four-substep retune with declared root-energy payload closing $\mathcal R_E$. | Outcome class $\mathrm{core}$ with non-clean routing if $\Delta E_{\mathrm{root}}^{B}$ has a retained source; locally excluded if the root-energy term is unsourced. |
| $\mathfrak a_{\min}^{\mathrm{refl}}$ | No accepted core partition change; outgoing source or apparatus recoil carries the angular momentum. | Outcome class $\mathrm{refl}$ only when $\mathrm{Geom}_{\text{coupl}}$ supplies a recoil channel and the same root, wake, torque, and stability rows close. |

For the clean row, the required energy-frequency interval is

$$
\mathcal R_E^{B_{\min}}
=
\left(\omega_\ast-\omega_{\text{tx}}\right)\sigma\hbar,
\qquad
\omega_\ast
=
\frac{\omega_O^\ast+\omega_M^\ast+2\omega_I^\ast}{4}.
$$

The clean row can enter $\mathcal A_N^{\mathrm{eval}}$ as a passing core candidate only if

$$
\left|\omega_{\text{tx}}-\omega_\ast\right|\hbar
\le
\varepsilon_E
$$

after interval evaluation, and if the blocked branch-chart rows in the minimal certificate are populated. If the interval for $\left|\omega_{\text{tx}}-\omega_\ast\right|\hbar$ straddles $\varepsilon_E$, the row is evaluable but cannot be used to claim theorem-grade uniqueness.

The minimal calibration family therefore tests three things at once:

1. whether the finite generator alphabet can reproduce the known symbolic four-substep branch;
2. whether energy mismatch is routed explicitly rather than hidden in the scalar partition;
3. whether reflection is treated as an evaluated recoil branch rather than as the absence of a core row.

## Handoff To Branch-Selection Law

The existing branch-selection law is applied after enumeration by replacing

$$
\mathcal A(B^-,\Gamma_{\text{coupl}},W)
$$

with

$$
\mathcal A_N^{\mathrm{eval}}(B^-,\Gamma_{\text{coupl}},W)/\!\cong_B.
$$

For each outcome class,

$$
\mathcal A_{\kappa,N}^{\mathrm{pass}}
=
\left\{
\mathfrak a_N\in\mathcal A_{\kappa,N}^{\mathrm{eval}}/\!\cong_B:
\left\|\mathcal R_{\mathrm{sel}}(\mathfrak a_N)\right\|_{\infty}\le1
\right\}.
$$

The selected finite-row candidate is

$$
\operatorname{Sel}_{B,N}
\left(
\Gamma_{\text{coupl}},
\mathfrak m_{B^-};W
\right)
=
\operatorname{lexmin}_{\mathfrak a_N\in\mathcal A_{\kappa_\star,N}^{\mathrm{pass}}}
\mathcal J_{\mathrm{sel}}(\mathfrak a_N),
$$

where $\mathcal A_{\kappa_\star,N}^{\mathrm{pass}}$ is the highest-priority nonempty passing outcome class, using the same priority order as the branch-selection law packet.

This handoff is valid only after quotienting. If two non-isomorphic candidates remain tied by interval residuals, the finite packet returns

$$
\operatorname{Tie}_{\varepsilon,N}
\left(
\mathfrak a_{N,1},
\mathfrak a_{N,2}
\right),
$$

not a unique selection. If two non-isomorphic passing candidates have identical residual payload and no valid $\tau_{\mathfrak m}$, the finite packet returns an exact physical tie, not theorem-grade branch uniqueness.

## Failure Modes Sharpened By This Packet

1. **Enumeration blocked.** $\mathfrak X_N(B^-)$ is missing retained active rows, inactive-gap rows, path-history records, local chart neighborhoods, or routing slots.
2. **Generator overreach.** A generator changes $\Gamma_{\text{coupl}}$ or adjusts $\hat{\mathbf a}$ instead of holding the coupling geometry fixed.
3. **Row-set mismatch.** Force, torque, normalized tail-wake pullback, and partition residuals do not use the same retained active rows.
4. **Unsourced routing.** Wake, root-energy, recoil, or transport terms are present without a declared branch-chart source.
5. **Separator violation.** A raw self-root separator update violates $\Delta N_{\text{self}}\in2\mathbb Z$ or $\Delta D=0$.
6. **Quotient collapse.** Non-isomorphic candidates are merged because their residuals look equal even though their path histories, phase cells, wake pullbacks, or routing sources differ.
7. **Quotient undermerge.** The same candidate is counted more than once because only row labels or commuting generator order differ.
8. **Payload underfill.** The candidate record names a post-branch but lacks the interval fields needed by $\mathcal R_{\mathrm{sel}}$.
9. **Minimal-branch overreach.** The clean four-substep branch is treated as universal before the finite family evaluates energy mismatch, wake/root-energy routing, reflection, and blocked branch-chart rows.

## Promotion Decision

Promotion decision: priority-only now, with a defer-with-blocker path for theorem-target promotion.

The safe theorem-target material is the definition of the finite retained enumeration object

$$
\mathcal A_N(B^-,\Gamma_{\text{coupl}},W)
$$

and its handoff into the existing branch-selection residual law. That material should remain priority-only until at least one finite candidate family emits evaluated rows for root replay, phase lock, torque consistency, normalized tail-wake pullback, energy routing, quotient witnesses, and section stability.

The blocker for reader-facing promotion is exact: no evaluated finite row set has yet shown

$$
\left|
\operatorname{arglexmin}_{\mathfrak a_N\in\mathcal A_{\kappa_\star,N}^{\mathrm{pass}}}
\mathcal J_{\mathrm{sel}}(\mathfrak a_N)
\right|
=1
$$

after quotienting, and no valid physical tie-breaking invariant $\tau_{\mathfrak m}$ has been populated for a non-isomorphic tie. Until those rows exist, this packet advances branch-selection by making enumeration concrete, not by claiming branch uniqueness.
