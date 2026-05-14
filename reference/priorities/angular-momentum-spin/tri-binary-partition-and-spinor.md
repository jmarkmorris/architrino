# Tri-Binary Partition and Spinor Closure

This detailed priority file supports [Angular Momentum and Spin Closure](angular-momentum-spin.md). It preserves the tri-binary partition theorem target, solved minimal transition, ordered Noether-core frame, spinor proof obligations, and component-resolved causal-writhe hypothesis.

## Result 2026-05-12: Tri-Binary Partition Theorem Target

The one-$h$ table in [energy.md](../../../content/markdown/aaa/dynamics/energy.md) should now be read as the seed of a constrained theorem target, not as the final partition. The $f_{\psi}$ row records the initial bookkeeping gauge for an outer-coupled positive transaction: the hit is first logged as $\Delta I_{\text{outer}}^{(0)}=+\hbar$. The final $f$ row asks for the stable post-redistribution branch. The unknown scalar partition is:

$$
\boldsymbol{\Delta I}
=
\left(
\Delta I_{\text{inner}},
\Delta I_{\text{middle}},
\Delta I_{\text{outer}},
\Delta I_{\text{wake}}
\right).
$$

Normalize the energy-table aliases to the bridge convention before using the table as a proof target:

| Energy-table alias | Theorem-target variable | Role |
| --- | --- | --- |
| $\Delta I_{\text{in}}$ | $\Delta I_{\text{inner}}$ | Self-hit / super-field-speed reconfiguration channel. |
| $\Delta I_{\text{mid}}$ | $\Delta I_{\text{middle}}$ | Field-speed separator or fulcrum channel. |
| $\Delta I_{\text{out}}$ and $\Delta I_o$ | $\Delta I_{\text{outer}}$ | Sub-field-speed external interface channel. |
| $\Delta I_{\text{wake}}$ | $\Delta I_{\text{wake}}$ | Causal-wake angular-momentum exchange projected onto the active generator. |

For a pre-transaction stable branch $B$, a candidate post-transaction branch $B'$, a transaction sign $\sigma\in\{+1,-1\}$, and a transaction axis $\hat{\mathbf a}$ supplied by the coupling geometry, the theorem target is the following constrained solve.

1. **Closed-cycle action and scalar rotational action.**
   $$
   \Delta A_{\text{cycle}}=\sigma h,
   \qquad
   \Delta I_{\text{inner}}
   +\Delta I_{\text{middle}}
   +\Delta I_{\text{outer}}
   +\Delta I_{\text{wake}}
   =
   \sigma\hbar.
   $$
   The sign-consistency rule in the energy table is only an admissibility inequality for a net positive or net negative transaction. It does not determine the partition.

2. **Vector angular-momentum conservation.**
   The scalar equation must descend from the vector ledger above:
   $$
   \sum_{\ell\in\{I,M,O\}}
   \Delta\mathbf I_\ell^{\text{mech}}
   +
   \Delta\mathbf L_{\text{tr}}
   +
   \Delta\mathbf L_{\text{wake}}^{\text{core}}
   =
   \Delta\mathbf J_{\text{coupl}}.
   $$
   In the first separated-scale circular scaffold, set $\Delta\mathbf L_{\text{tr}}=0$ and define
   $$
   \Delta I_{\text{inner}}
   =
   \hat{\mathbf a}\cdot\Delta\mathbf I_I^{\text{mech}},
   \quad
   \Delta I_{\text{middle}}
   =
   \hat{\mathbf a}\cdot\Delta\mathbf I_M^{\text{mech}},
   \quad
   \Delta I_{\text{outer}}
   =
   \hat{\mathbf a}\cdot\Delta\mathbf I_O^{\text{mech}},
   \quad
   \Delta I_{\text{wake}}
   =
   \hat{\mathbf a}\cdot\Delta\mathbf L_{\text{wake}}^{\text{core}}.
   $$
   Outside that scaffold, the transport remainder must remain in the vector equation instead of being hidden inside a scalar partition.

3. **Energy conservation.**
   $$
   \omega_I^{\ast}\Delta I_{\text{inner}}
   +
   \omega_M^{\ast}\Delta I_{\text{middle}}
   +
   \omega_O^{\ast}\Delta I_{\text{outer}}
   +
   \Delta E_{\text{wake}}
   =
   \Delta E_{\text{coupl}},
   $$
   with
   $$
   \Delta E_{\text{coupl}}
   =
   f_{\text{coupl}}\Delta A_{\text{cycle}}
   =
   \omega_{\text{coupl}}\sigma\hbar.
   $$
   The $\omega_\ell^{\ast}$ terms are branch-local effective angular frequencies across the discrete step. A full derivation must replace them with the appropriate cycle integral if $\omega_\ell$ changes appreciably during the transition.

4. **Root-ledger admissibility.**
   The candidate branch must move from one admissible causal-root ledger to another:
   $$
   \mathcal R(t_i)\longrightarrow\mathcal R(t_f),
   \qquad
   \mathcal H_{\ell,\alpha}(t_i)\longrightarrow\mathcal H_{\ell,\alpha}(t_f).
   $$
   On a raw self-root separator chart, the known parity guardrail is $\Delta N\in2\mathbb Z$ with $\Delta D=0$; on a grouped channel ledger, the same event may be recorded as one newly active channel. The partition theorem must state which chart is being used and which ledger jump produces each $\Delta I_\ell$.

5. **Phase-lock constraints.**
   The post-transaction branch must close the active causal roots over a full tri-binary cycle:
   $$
   \Psi_{\ell\alpha\leftarrow m\beta}^{(b)}(t_f)
   \equiv0\pmod{2\pi},
   \qquad
   \Phi_\ell(B')-\Phi_m(B')=2\pi k_{\ell m}.
   $$
   The phase functions must include geometric phase, wake-return delay, and causal-root ledger contribution for the chosen branch chart.

6. **Coupling geometry.**
   The external or internal transaction supplies boundary data:
   $$
   \left(
   \Delta E_{\text{coupl}},
   \Delta\mathbf J_{\text{coupl}},
   \hat{\mathbf a}
   \right)
   =
   \mathrm{Geom}_{\text{coupl}}
   (\text{exposed layer},\text{incidence direction},\text{impact parameter},\text{orientation data},\text{wake recoil channel}).
   $$
   For the first worked transition, use the outer-exposed case from the energy table. The outer-first entry is an initial condition, not a license to assign the final $\hbar$ entirely to $\Delta I_{\text{outer}}$.

7. **Branch stability.**
   A candidate $B'$ counts as an accepted partition only if it is stable under the delayed dynamics. The certificate should report a Floquet or interval-equivalent condition such as
   $$
   \rho(D\mathcal P_{B'})<1,
   $$
   together with positive root-existence, inactive-root gap, and phase-lock margins.

The theorem target is: solve these constraints over admissible post-branches $B'$. If one stable branch satisfies them, the partition is unique for the supplied coupling geometry. If several stable branches satisfy them, the partition is branch-dependent and the later measurement-response model must carry the branch-selection rule. If no stable branch satisfies them, the transaction is forbidden, reflected, or routed into wake exchange.

### Sharpened Partition Candidate Set

For a pre-transaction branch $B$ and coupling datum
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
$$
define the stable partition candidate set
$$
\mathscr P(B,\Gamma_{\text{coupl}})
=
\left\{
\left(B',\boldsymbol{\Delta I}\right):
C_{\mathbf J}\wedge C_A\wedge C_E\wedge C_R\wedge C_\Phi\wedge C_G\wedge C_S
\right\},
$$
where
$$
\boldsymbol{\Delta I}
=
\left(
\Delta I_{\text{inner}},
\Delta I_{\text{middle}},
\Delta I_{\text{outer}},
\Delta I_{\text{wake}}
\right).
$$

The vector-ledger condition is
$$
C_{\mathbf J}:\quad
\sum_{\ell\in\{I,M,O\}}
\Delta\mathbf I_\ell^{\text{mech}}
+
\Delta\mathbf L_{\text{tr}}
+
\Delta\mathbf L_{\text{wake}}^{\text{core}}
=
\Delta\mathbf J_{\text{coupl}},
$$
with the scalar components defined only by projection onto the supplied transaction axis:
$$
\Delta I_{\text{inner}}
=
\hat{\mathbf a}\cdot\Delta\mathbf I_I^{\text{mech}},
\quad
\Delta I_{\text{middle}}
=
\hat{\mathbf a}\cdot\Delta\mathbf I_M^{\text{mech}},
\quad
\Delta I_{\text{outer}}
=
\hat{\mathbf a}\cdot\Delta\mathbf I_O^{\text{mech}},
\quad
\Delta I_{\text{wake}}
=
\hat{\mathbf a}\cdot\Delta\mathbf L_{\text{wake}}^{\text{core}}.
$$

The scalar action-closure condition is
$$
C_A:\quad
\Delta A_{\text{cycle}}=\sigma h,
\qquad
\Delta I_{\text{inner}}
+
\Delta I_{\text{middle}}
+
\Delta I_{\text{outer}}
+
\Delta I_{\text{wake}}
=
\sigma\hbar.
$$

The energy-closure condition is
$$
C_E:\quad
\omega_I^{\ast}\Delta I_{\text{inner}}
+
\omega_M^{\ast}\Delta I_{\text{middle}}
+
\omega_O^{\ast}\Delta I_{\text{outer}}
+
\Delta E_{\text{wake}}
=
\Delta E_{\text{coupl}},
$$
or, outside the first action-angle approximation,
$$
C_E:\quad
\sum_{\ell\in\{I,M,O\}}
\int_{B\to B'}\omega_\ell\,dI_\ell
+
\Delta E_{\text{root}}
+
\Delta E_{\text{wake}}
=
\Delta E_{\text{coupl}}.
$$

The root-ledger admissibility condition is
$$
C_R:\quad
\left(
\mathcal R_B,\{\mathcal H_{\ell,\alpha}^{B}\}_{\ell,\alpha}
\right)
\longrightarrow
\left(
\mathcal R_{B'},\{\mathcal H_{\ell,\alpha}^{B'}\}_{\ell,\alpha}
\right)
$$
through declared fold, separator, grouped-channel, or branch-continuation rules, with raw self-root jumps obeying $\Delta N\in2\mathbb Z$ and $\Delta D=0$ on charts where that parity guardrail applies.

The phase-lock condition is
$$
C_\Phi:\quad
\Psi_{\ell\alpha\leftarrow m\beta}^{(b)}(t_f;B')
\equiv0\pmod{2\pi},
\qquad
\Phi_\ell(B')-\Phi_m(B')=2\pi k_{\ell m},
$$
including geometric phase, wake-return delay, and causal-root ledger phase for every active branch used by $B'$.

The coupling-geometry condition is
$$
C_G:\quad
\left(
\Delta E_{\text{coupl}},
\Delta\mathbf J_{\text{coupl}},
\hat{\mathbf a}
\right)
=
\mathrm{Geom}_{\text{coupl}}
(\text{exposed layer},\text{incidence direction},\text{impact parameter},\text{orientation data},\text{wake recoil channel}),
$$
so $\hat{\mathbf a}$ and the source recoil are boundary data, not adjustable fit parameters inside the partition solve.

The branch-stability condition is
$$
C_S:\quad
\rho(D\mathcal P_{B'})<1,
\qquad
g_{\text{root}}(B')>0,
\qquad
g_{\text{phase}}(B')>0,
$$
where $g_{\text{root}}$ is the minimum active-root / inactive-root separation margin and $g_{\text{phase}}$ is the minimum phase-lock margin on the regularized chart.

### Branch-Selection Condition

The transaction is **unique** when
$$
\left|\mathscr P(B,\Gamma_{\text{coupl}})\right|=1.
$$
In that case the single element $\left(B',\boldsymbol{\Delta I}\right)$ is the branch-selected partition for the supplied coupling geometry.

The transaction is **branch-dependent** when
$$
\left|\mathscr P(B,\Gamma_{\text{coupl}})\right|>1.
$$
In that case the theorem is incomplete until a deterministic selection map
$$
\operatorname{Sel}_B:
\Gamma_{\text{coupl}}\times\mathfrak m_B
\longrightarrow
\mathscr P(B,\Gamma_{\text{coupl}})
$$
is supplied, where $\mathfrak m_B$ denotes the unresolved microstate data retained by the declared branch chart.

The transaction is **forbidden** when
$$
\mathscr P(B,\Gamma_{\text{coupl}})=\varnothing
$$
and no reflected or wake-exchange branch satisfies vector, energy, root-ledger, phase-lock, and stability closure.

The transaction is **reflected** when no accepted post-branch changes the core partition, but there exists a stable recoil branch $B_{\text{refl}}$ satisfying
$$
\Delta\mathbf L_{\text{mech}}^{\text{core}}
+
\Delta\mathbf L_{\text{tr}}
=
\mathbf 0,
\qquad
\Delta\mathbf J_{\text{coupl}}
+
\Delta\mathbf J_{\text{refl}}
+
\Delta\mathbf L_{\text{wake}}^{\text{core}}
=
\mathbf 0,
$$
with the outgoing source or apparatus channel carrying $\Delta\mathbf J_{\text{refl}}$.

The transaction is **routed into wake exchange** when no stable mechanical redistribution satisfies $C_{\mathbf J}$ and $C_E$, but a stable branch satisfies
$$
\Delta I_{\text{wake}}\ne0
\quad\text{or}\quad
\Delta E_{\text{wake}}\ne0
$$
and the full vector and energy ledgers close after the wake term is retained.

## Result 2026-05-12: Solved Minimal Four-Substep Transition

The bridge now contains one solved separated-scale transition rather than only a symbolic ledger. The solved branch is deliberately narrow: fixed projected normals, no transport remainder, no retained wake angular momentum after closure, one outer substep, one middle hinge substep, and two equal inner self-hit substeps. It is a branch certificate, not the general partition theorem.

Let the common substep be $\iota$. The branch rule is

$$
\Delta I_{\text{outer}}=\iota,
\qquad
\Delta I_{\text{middle}}=\iota,
\qquad
\Delta I_{\text{inner}}=2\iota,
\qquad
\Delta I_{\text{wake}}=0.
$$

The accepted positive transaction fixes the scalar ledger:

$$
\iota+\iota+2\iota=\hbar,
\qquad
\iota=\frac{\hbar}{4}.
$$

The solved partition is therefore

$$
\boxed{
\Delta I_{\text{outer}}=\frac{\hbar}{4},
\qquad
\Delta I_{\text{middle}}=\frac{\hbar}{4},
\qquad
\Delta I_{\text{inner}}=\frac{\hbar}{2},
\qquad
\Delta I_{\text{wake}}=0.
}
$$

Using the linearized mechanical scaffold, the fixed-radius outer retune is

$$
\Delta R_O=0,
\qquad
\Delta\omega_O
=
\frac{\hbar}{8\mu_{\text{arch}}\left(R_O^-\right)^2},
$$

with admissibility condition

$$
R_O^-\left(
\omega_O^-
+
\frac{\hbar}{8\mu_{\text{arch}}\left(R_O^-\right)^2}
\right)<c_f.
$$

The middle hinge remains on $R_M\omega_M=c_f$ to first order:

$$
\Delta R_M
=
\frac{\hbar}
{8\mu_{\text{arch}}R_M^-\omega_M^-},
\qquad
\Delta\omega_M
=
-
\frac{\hbar}
{8\mu_{\text{arch}}\left(R_M^-\right)^2},
$$

so

$$
R_M^-\Delta\omega_M+\omega_M^-\Delta R_M=0.
$$

The fixed-radius inner two-substep retune is

$$
\Delta R_I=0,
\qquad
\Delta\omega_I
=
\frac{\hbar}
{4\mu_{\text{arch}}\left(R_I^-\right)^2},
$$

with self-hit admissibility condition

$$
s_I^+
=
\frac{R_I^-\left(
\omega_I^-
+
\frac{\hbar}{4\mu_{\text{arch}}\left(R_I^-\right)^2}
\right)}
{c_f}
>1,
$$

and self-delay condition

$$
\delta_{\text{self}}^+
=
2s_I^+\sin\!\left(\frac{\delta_{\text{self}}^+}{2}\right).
$$

On a raw simple-root separator chart, the two inner substeps correspond to the minimal even self-root jump

$$
\Delta N_{\text{self}}=+2,
\qquad
\Delta D=0,
$$

provided the active roots remain simple through the regularized transition.

The energy condition is also explicit. In the first action-angle approximation with no retained wake energy and no residual root-energy term, the accepted source channel must have branch-local frequency

$$
\omega_{\text{tx}}
=
\omega_{\ast}
\equiv
\frac{\omega_O^{\ast}+\omega_M^{\ast}+2\omega_I^{\ast}}{4}.
$$

If

$$
\Delta E_{\text{mismatch}}
=
\left(\omega_{\text{tx}}-\omega_{\ast}\right)\hbar
$$

does not vanish, the clean four-substep branch is not energy-closed. For $\omega_{\text{tx}}<\omega_{\ast}$, a low-frequency outer hit cannot produce this positive inner self-hit retune without drawing energy from a root reconfiguration or the wake/internal ledger. For $\omega_{\text{tx}}>\omega_{\ast}$, the surplus must be routed into wake recoil, transport, or another admissible branch.

This result is useful because it gives the first explicit failure gate as well as the first explicit success branch. The transition is allowed in the clean minimal chart only when the angular ledger, speed-regime inequalities, self-root parity, self-delay equation, and energy-frequency condition all hold.

## Result 2026-05-12: Ordered Noether-Core Frame For Spinor Closure

This section defines the ordered-frame target only. It does not prove spin-$\tfrac{1}{2}$ behavior. Use it as the spinor closure target until the holonomy calculation is derived from the delayed dynamics.

The dynamics scaffold above uses $\ell\in\{I,M,O\}$ for inner, middle, and outer. The ordered-frame and chirality literature also uses $\{H,M,L\}$, where $H$ is high / inner, $M$ is middle, and $L$ is low / outer. These are two labels for the same three binary roles, not two different triads.

For each ordered layer $a\in\{H,M,L\}$, let $P_a(t)$ be the instantaneous binary plane and let $\hat{\mathbf n}_a(t)$ be the oriented unit normal selected by that binary's circulation. In the ordinary 3D regime the ordered normal triad is non-coplanar:

$$
\det\!\big[\hat{\mathbf n}_H,\hat{\mathbf n}_M,\hat{\mathbf n}_L\big]\ne0.
$$

The candidate ordered Noether-core frame is the history-lifted object

$$
F_{\text{NC}}(t)=
\big(
\hat{\mathbf n}_H,\hat{\mathbf n}_M,\hat{\mathbf n}_L;\
\mathcal{G}_H,\mathcal{G}_M,\mathcal{G}_L,\
\mathcal{G}_{HM},\mathcal{G}_{HL},\mathcal{G}_{ML};\
\chi_c
\big).
$$

Here $\mathcal{G}_a$ is the causal-root ledger for layer $a$: active self-hit and partner-hit branches, root multiplicities, winding or phase branch, emission-order data, and separator history over the chosen closure period. The inter-layer ledgers $\mathcal{G}_{ab}$ record delayed exchange roots and phase-lock constraints between binary layers. The branch label $\chi_c$ records ordered core chirality, currently the `HML/HLM` datum, with $Wr_c$ or a multi-component causal-writhe parity as the leading formal candidate.

The configuration-space quotient must remove only genuine gauge redundancy: center-of-mass translation, time-origin choice, smooth phase reparameterization inside a closed root-ledger cell, and small deformations that preserve the ordered layer labels, root ledgers, and chirality branch. It must not quotient away permutations of $H,M,L$, reversal of the oriented normals, or branch-changing causal-root relabelings. With those restrictions, the frame has an $SO(3)$ orientation projection but may carry a two-sheet history lift:

$$
\pi:\widetilde{\mathcal Q}_{\text{NC}}^{\text{ord}}
\to
\mathcal Q_{\text{NC}}^{\text{ord}},
\qquad
\mathrm{fiber}\simeq\mathbb{Z}_2.
$$

The spinor closure target is to show that a physical $2\pi$ rotation closes the base frame but transports the history-lifted state to the opposite sheet, while a $4\pi$ rotation closes both:

$$
\tilde q \xrightarrow{2\pi} -\tilde q,
\qquad
\tilde q \xrightarrow{4\pi} \tilde q.
$$

Equivalently, derive a nontrivial holonomy homomorphism

$$
\mu:\pi_1(SO(3))\cong\mathbb{Z}_2
\to
\mathrm{Aut}(\mathcal{G},\chi_c)
$$

from delayed causal-root transport. If $\mu$ is trivial, the ordered-frame route does not supply fermion spinor closure.

**Theorem target (ordered-frame spinor lift).** Let $\tilde q\in\widetilde{\mathcal Q}_{\text{NC}}^{\text{ord}}$ be a stable ordered-core branch with conserved $\mathcal J_B(\mathfrak H_B)$, and let $\gamma_{2\pi}$ be a physical rotation path whose base-frame projection returns the visible ordered normal triad after $2\pi$. The lift is spinor-like only if there is an involution $\iota$ with $\iota^2=\mathrm{id}$ and $\iota\notin G_{\text{gauge}}$ such that
$$
\pi\!\left(\mathcal T_{\gamma_{2\pi}}\tilde q\right)
=
\pi(\tilde q),
\qquad
\mathcal T_{\gamma_{2\pi}}\tilde q
=
\iota(\tilde q)
\ne
\tilde q,
$$
while the doubled path restores the full lifted state:
$$
\mathcal T_{\gamma_{4\pi}}\tilde q
=
\tilde q.
$$
The nontrivial $2\pi$ lift must act on causal-root ledgers, phase branches, causal-writhe parity, or $\chi_c$ in a way that is not removable by the branch-preserving quotient, and the $4\pi$ restoration must preserve the total angular-momentum functional along the entire path.

If $\mathcal T_{\gamma_{2\pi}}\tilde q=\tilde q$, the ordered frame closes as an ordinary $SO(3)$ object. If $\mathcal T_{\gamma_{4\pi}}\tilde q\ne\tilde q$, the proposed two-sheet lift fails as a fermion spinor closure target.

In the planar alignment limit,

$$
\det\!\big[\hat{\mathbf n}_H,\hat{\mathbf n}_M,\hat{\mathbf n}_L\big]\to0,
$$

the ordered 3D frame leaves the spinor-test domain and should reduce to the $SO(2)$ / $U(1)$ phase branch described in the Planck-alignment and horizon-chirality notes.

### Next Proof Obligations For Spinor Closure

1. **Branch-certificate extraction:** for one stable separated-scale Noether-core branch, extract $P_a$, $\hat{\mathbf n}_a$, $\mathcal{G}_a$, $\mathcal{G}_{ab}$, $\chi_c$, phase offsets, and the total angular-momentum ledger over a common closure period.
2. **Quotient lemma:** prove that the branch-preserving quotient above has an $SO(3)$ frame projection while retaining any nontrivial history sheet; state exactly which deformations are gauge and which are physical branch changes.
3. **Holonomy calculation:** transport $F_{\text{NC}}$ around a controlled $2\pi$ rotation path and compute the induced action on causal-root ledgers, causal-writhe parity, and phase-closure residuals. The result must come from delayed root transport, not from the usual spinor analogy.
4. **$4\pi$ restoration test:** show that the same transport over $4\pi$ restores the full history-lifted state, not only the visible normal triad. Failure to restore falsifies the proposed lift; restoration after $2\pi$ collapses the target back to ordinary $SO(3)$ behavior.
5. **Angular-momentum compatibility:** show that the history lift preserves the conserved $\mathbf{L}_{\text{tot}}=\mathbf{L}_{\text{mech}}+\mathbf{L}_{\text{wake}}$ ledger and does not hide unbalanced torque in the quotient.
6. **Planar degeneration check:** drive the same branch toward $\det[\hat{\mathbf n}_H,\hat{\mathbf n}_M,\hat{\mathbf n}_L]\to0$ and verify whether the rotation test transitions from $4\pi$ to $2\pi$ return as the configuration reduces toward the planar $SO(2)$ / $U(1)$ branch.
7. **Measurement handoff:** only after the lift is proved, define how an apparatus axis couples to this full ordered-frame ledger to produce the two observed spin outcomes.

### Partition And Spinor Falsifiers

1. **Missing wake term.** A proposed partition is falsified if $C_{\mathbf J}$ or $C_E$ closes only after setting $\Delta I_{\text{wake}}=0$ or $\Delta E_{\text{wake}}=0$ by assumption while the branch torque integral gives a nonzero wake contribution.
2. **Broken vector ledger.** A scalar solution of $C_A$ is rejected if
   $$
   \sum_{\ell\in\{I,M,O\}}
   \Delta\mathbf I_\ell^{\text{mech}}
   +
   \Delta\mathbf L_{\text{tr}}
   +
   \Delta\mathbf L_{\text{wake}}^{\text{core}}
   -
   \Delta\mathbf J_{\text{coupl}}
   \ne
   \mathbf 0.
   $$
3. **Incompatible phase lock.** A candidate $B'$ is rejected if any active branch has
   $$
   \Psi_{\ell\alpha\leftarrow m\beta}^{(b)}(t_f;B')
   \not\equiv0\pmod{2\pi}
   $$
   after geometric phase, wake-return delay, and causal-root ledger phase are included.
4. **Unstable post-branch.** A candidate $B'$ is rejected if $\rho(D\mathcal P_{B'})\ge1$, $g_{\text{root}}(B')\le0$, or $g_{\text{phase}}(B')\le0$.
5. **Nonunique branch without selection rule.** A branch-dependent partition is rejected as a theorem if $\left|\mathscr P(B,\Gamma_{\text{coupl}})\right|>1$ and no deterministic $\operatorname{Sel}_B$ is supplied.
6. **Failed $4\pi$ restoration.** An ordered-frame spinor candidate is falsified if the visible frame closes after $2\pi$ but $\mathcal T_{\gamma_{4\pi}}\tilde q\ne\tilde q$, or if $\mathcal T_{\gamma_{2\pi}}\tilde q=\tilde q$ in a branch where spinor closure is required.

### Op-Discussion Hypothesis: Component-Resolved Causal Writhe Bridge

Status: hypothesis from the 2026-05-12 Op-discussion pass, not established doctrine and not yet a canon definition.

The working result is that scalar $Wr_c[\gamma]$ is a strong chirality signal but is probably too compressed to carry all three labels by itself. It can plausibly detect handedness of a single causal self-interaction pattern, but a scalar total can alias or vanish when the tri-binary has multiple role-labeled components, balanced pro/anti pairings, mixed planar rows, or a weak-coupling-triad exposure state that depends on wake geometry rather than only on intrinsic handedness.

The stronger candidate is a component-resolved causal-writhe data set, kept as separate projections rather than collapsed into one sign:

$$
\mathcal{W}_{c}^{\text{core}}
=
\left(
\{Wr_c^a\}_{a\in\{H,M,L\}},
\{Wr_c^{ab}\}_{a<b},
\chi_{HML}^{(c)},
\{s_a^{\text{plane}}\}_{a\in\{H,M,L\}},
s_{\text{axial}},
\Sigma_{\mathrm{WCT}}
\right).
$$

Here $Wr_c^a$ records self-causal writhe on a labeled binary layer, $Wr_c^{ab}$ records cross-component causal writhe / linking on the delayed locus between two labeled layers, $\chi_{HML}^{(c)}$ records the ordered 3D `HML/HLM` chirality candidate, $s_a^{\text{plane}}$ records the planar angular-momentum sign of each layer relative to the chosen exterior normal, $s_{\text{axial}}=\operatorname{sgn}(\mathbf{J}_{\text{net}}\cdot\hat{\mathbf V})$ records the high-velocity axial branch when a translation direction exists, and $\Sigma_{\mathrm{WCT}}$ records which weak-coupling-triad sites are forward-exposed rather than wake-hidden.

This tuple gives the desired non-collapse discipline:

- `pro/anti` should be tested against the ordered 3D causal-writhe / cross-link pattern, especially the `HML/HLM` branch history.
- horizon planar signs should be tested against $\{s_a^{\text{plane}}\}$ and the eight-row `CW/CCW` table, with the two uniform rows treated as endpoint candidates rather than forced identifications with `pro/anti`.
- weak left/right exposure should be tested against $s_{\text{axial}}$ plus $\Sigma_{\mathrm{WCT}}$, because the weak gate depends on forward exposure and wake shielding, not on planar boundary helicity alone.

The labels may collapse only under additional proved conditions: axialization drives $\mathbf{J}_{\text{net}}\parallel\pm\hat{\mathbf V}$, the horizon state relaxes to a uniform planar row, and the same sign choice reliably exposes or hides the weak-coupling triad. Until those three conditions are derived or simulated, the bridge should preserve `pro/anti`, `CW/CCW`, and weak `L/R` as related but distinct readouts.

Missing evidence:

1. Evaluate $Wr_c^a$ and $Wr_c^{ab}$ on controlled pro-core and anti-core tri-binary trajectories to see whether the ordered `HML/HLM` distinction survives smooth deformation and flips only through causal-locus reconnection.
2. Test whether scalar $Wr_c[\gamma]$ aliases distinct ordered cores or balanced pro/anti pairings; if it aliases, require the component-resolved data set before using causal writhe as a spin bridge.
3. In horizon-adjacent simulations, track $\{s_a^{\text{plane}}\}$, $\mathbf{J}_{\text{net}}\cdot\hat{\mathbf V}$, mixed-row lifetimes, and branch persistence after re-expansion.
4. In weak-sector exposure tests, verify whether the same $\Sigma_{\mathrm{WCT}}$ that gates left-handed docking also supplies the CKM overlap domain and reaction-provenance payload.
5. Tie every sign to the conserved history-aware angular-momentum ledger, including $\mathbf{L}_{\text{wake}}$, so the bridge is not merely a kinematic normal-vector convention.

Decision question for Op: Should the next proof pass define the bridge object as component-resolved causal-writhe data first, instead of trying to promote scalar $Wr_c$ as the direct `pro/anti` / planar-sign / weak-exposure identifier?
