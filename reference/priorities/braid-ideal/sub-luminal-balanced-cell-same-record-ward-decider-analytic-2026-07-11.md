# Sub-Luminal Balanced-Cell Same-Record Ward Decider — Analytical Result

Date: 2026-07-11  
Verdict: **UNDECIDED — the requested decider is not identifiable from the canonical retained-root force ledger**  
Claim level: priority-only analytical obstruction. No retained balanced Noether sea state is claimed, no global drain is exhibited or barred, no transport coefficient is extracted, no corpus promotion is authorized, and no score movement follows.

Parent audit: [Independent Audit of the Section 87 Global-Drain Verdict](jh13-section-87-global-drain-verdict-audit-2026-07-11.md).  
Decision rule: [Retained-Sea Angular-Momentum Ward Identity and Transport Kernel](retained-sea-angular-momentum-ward-identity-and-transport-kernel.md).

## Result in One Line

On a resolved sub-luminal periodic balanced cell, the canonical retained-root ledger uniquely determines every directed mechanical torque and power row, but it does **not** determine either wake storage or wake face current. The Ward equations determine only their sum. Therefore the same mechanical record admits both a secular-storage completion and a bounded-current completion unless a same-action Noether pullback or an independently resolved boundary-event ledger fixes the split. Neither theorem-level **BARRED** nor **OPEN** follows from the stipulated calculation.

## 1. Cell and Retained-Root Data

Take a periodic two-sublattice cell with resolved assemblies $A\in\{+,-\}$ and fixed assembly centers $\mathbf X_A$. The result below applies to a pro/anti pair, an axis-reversed pair, or the doubled four-braid alternating-axis representation. Assume the selected record is kinematically consistent and sub-luminal:

$$
\mathbf v_a(T)=\frac{d\mathbf x_a}{dT},
\qquad
\sup_{a,T}\lVert\mathbf v_a(T)\rVert<c_f.
$$

For every receiver $a$, source $b$, periodic image $\mathbf n$, and active root $r$, the retained ledger supplies

$$
\mathscr R_{a\leftarrow b,\mathbf n}^{(r)}(T)
=
\left(
t_{ab,\mathbf n}^{(r)},
\mathbf d_{ab,\mathbf n}^{(r)},
D_{T,ab,\mathbf n}^{(r)},
D_{s,ab,\mathbf n}^{(r)},
W_{ab,\mathbf n}^{(r)}
\right),
$$

with

$$
W_{ab,\mathbf n}^{(r)}
=
\left|\frac{D_{T,ab,\mathbf n}^{(r)}}{D_{s,ab,\mathbf n}^{(r)}}\right|,
$$

and hence the canonical directed force

$$
\mathbf F_{a\leftarrow b,\mathbf n}^{(r)}(T)
=
\sigma_a\sigma_b\kappa
\frac{W_{ab,\mathbf n}^{(r)}}{
\left(\lVert\mathbf d_{ab,\mathbf n}^{(r)}\rVert^2+\varepsilon^2\right)^{3/2}}
\mathbf d_{ab,\mathbf n}^{(r)}.
$$

Sub-luminality removes the named $D_s=0$ obstruction only after the retained chart also supplies a positive source-normal floor, complete active-root count, inactive-root gaps, finite memory, and convergence of the periodic-image sum. It does not add a wake Noether charge to the force ledger.

## 2. Complete Mechanical Angular-Momentum Rows

Use the assembly center $\mathbf X_A$ for the internal axial torque. Translational/orbital angular momentum is a separate linear-momentum Ward row. Every directed cross-assembly torque is

$$
\tau_{A\leftarrow B,z}(T)
=
\sum_{a\in A}
\sum_{b\in B}
\sum_{\mathbf n}
\sum_r
\left[
(\mathbf x_a-\mathbf X_A)
\times
\mathbf F_{a\leftarrow b,\mathbf n}^{(r)}
\right]_z.
$$

The within-assembly pump row is

$$
p_{A,z}(T)
=
\sum_{a,b\in A}
\sum_{\mathbf n}
\sum_r{}'
\left[
(\mathbf x_a-\mathbf X_A)
\times
\mathbf F_{a\leftarrow b,\mathbf n}^{(r)}
\right]_z,
$$

where the prime applies the retained coincidence and self-image convention. For the two-sublattice bond,

$$
t_{+-,z}
=
\frac{\tau_{+\leftarrow-,z}-\tau_{-\leftarrow+,z}}{2},
\qquad
q_{+-,z}
=
\tau_{+\leftarrow-,z}+\tau_{-\leftarrow+,z}.
$$

These are computable from the retained-root ledger alone. The antisymmetric row $t_{+-,z}$ is the mechanical bond current; the symmetric row $q_{+-,z}$ is the mechanical Ward defect.

## 3. Complete Mechanical Power Rows

Every directed root contributes the receiver power

$$
\pi_{a\leftarrow b,\mathbf n}^{(r)}(T)
=
\mathbf F_{a\leftarrow b,\mathbf n}^{(r)}(T)
\cdot
\mathbf v_a(T),
$$

where $\mathbf F$ is the declared force-like bookkeeping row. If the retained ledger stores acceleration $\mathbf A$ instead, use $\mathbf F=\mu_{\mathrm{arch}}\mathbf A$ for the quadratic bookkeeping proxy or $\mathbf F=\mu_K(\lVert\mathbf v_a\rVert)\mathbf A$ for the primitive kinetic scalar. Thus

$$
\Pi_{A\leftarrow B}(T)
=
\sum_{a\in A}
\sum_{b\in B}
\sum_{\mathbf n}
\sum_r
\pi_{a\leftarrow b,\mathbf n}^{(r)}(T),
$$

and the within-assembly mechanical power is

$$
h_A(T)
=
\sum_{a,b\in A}
\sum_{\mathbf n}
\sum_r{}'
\pi_{a\leftarrow b,\mathbf n}^{(r)}(T).
$$

The directed-pair power defect is

$$
q^E_{+-}(T)
=
\Pi_{+\leftarrow-}(T)
+
\Pi_{-\leftarrow+}(T).
$$

For a fixed-center rigid sublattice,

$$
\mathbf v_a
=
\boldsymbol\Omega_A\times(\mathbf x_a-\mathbf X_A),
$$

so the same-record kinematic identity is exact:

$$
\Pi_{A\leftarrow B}
=
\boldsymbol\Omega_A\cdot\boldsymbol\tau_{A\leftarrow B},
\qquad
h_A
=
\boldsymbol\Omega_A\cdot\mathbf p_A.
$$

For an axis-balanced pair with

$$
\boldsymbol\Omega_+=+\Omega\widehat{\mathbf z},
\qquad
\boldsymbol\Omega_-=-\Omega\widehat{\mathbf z},
\qquad
p_{+,z}=+p,
\qquad
p_{-,z}=-p,
$$

the coarse angular pumps cancel, but the mechanical pump powers add:

$$
p_{+,z}+p_{-,z}=0,
\qquad
h_++h_-=2\Omega p.
$$

The cross-bond power is

$$
\Pi_{+\leftarrow-}+\Pi_{-\leftarrow+}
=
\Omega
\left(
\tau_{+\leftarrow-,z}-\tau_{-\leftarrow+,z}
\right)
=
2\Omega t_{+-,z}.
$$

Therefore the cell's total mechanical power source is

$$
S^E_{\mathrm{mech}}
=
2\Omega\left(p+t_{+-,z}\right),
$$

whereas its mechanical angular-momentum defect is controlled by $q_{+-,z}$. The energy and angular-momentum tests constrain different combinations of the directed torques. Vector-balanced pumps do not imply an energy-balanced cell.

## 4. Wake-Row Non-Identifiability Theorem

Define the mechanical source rows assigned to each sublattice by

$$
S^L_A(T)
=
p_{A,z}(T)
+
\sum_{B\ne A}\tau_{A\leftarrow B,z}(T),
$$

and

$$
S^E_A(T)
=
h_A(T)
+
\sum_{B\ne A}\Pi_{A\leftarrow B}(T).
$$

Let $L_A^{\mathrm w}$ and $E_A^{\mathrm w}$ be the local wake-history storage assignments, and let $\Phi^L_A$ and $\Phi^E_A$ be the corresponding signed net face currents under one fixed periodic unwrapping convention. The required local balances are

$$
\frac{dL_A^{\mathrm w}}{dT}+\Phi^L_A=-S^L_A,
\qquad
\frac{dE_A^{\mathrm w}}{dT}+\Phi^E_A=-S^E_A.
$$

**Theorem.** The retained-root force ledger and these Ward equations do not uniquely determine any of the four wake rows $L_A^{\mathrm w}$, $\Phi_A^L$, $E_A^{\mathrm w}$, or $\Phi_A^E$.

**Proof.** If $(L_A^{\mathrm w},\Phi_A^L)$ is one angular-momentum completion, then for every differentiable periodic assignment $f_A(T)$,

$$
L_A^{\mathrm w}\mapsto L_A^{\mathrm w}+f_A,
\qquad
\Phi_A^L\mapsto\Phi_A^L-\dot f_A
$$

leaves the same Ward equation and the same mechanical retained-root record unchanged. The energy pair has the independent transformation

$$
E_A^{\mathrm w}\mapsto E_A^{\mathrm w}+g_A,
\qquad
\Phi_A^E\mapsto\Phi_A^E-\dot g_A.
$$

More sharply, for a known periodic source $S_A^L$ the two completions

$$
\Phi_A^L=0,
\qquad
L_A^{\mathrm w}(T)
=
L_A^{\mathrm w}(0)-\int_0^T S_A^L(T')\,dT',
$$

and

$$
L_A^{\mathrm w}=\text{constant},
\qquad
\Phi_A^L=-S_A^L
$$

obey the same local Ward equation. The first is secular storage whenever $\overline{S_A^L}\ne0$; the second is instantaneous face transport. Identical alternatives exist for energy. Hence the force ledger fixes only storage-rate plus current, not their physical partition. $\square$

The theorem is not a conventional superpotential ambiguity applied to an already known Noether current. Here no action-derived or event-resolved wake current has yet been supplied. The ambiguity therefore includes the physical distinction the requested decider is supposed to measure: bounded storage versus transport.

## 5. Consequence for the Proposed Local Boundedness Equations

If the symbols $W_\pm$ denote the combined wake row

$$
W_A
=
\frac{dL_A^{\mathrm w}}{dT}+\Phi_A^L,
$$

then

$$
p+\tau_{+\leftarrow-,z}+W_+=0,
$$

$$
-p+\tau_{-\leftarrow+,z}+W_-=0
$$

close identically once $W_A=-S_A^L$ is defined. They are bookkeeping identities, not boundedness tests. Boundedness additionally requires the separately extracted storage to satisfy

$$
L_A^{\mathrm w}(T+P)=L_A^{\mathrm w}(T)
$$

on the retained period, while transport requires a separately extracted face current with consistent opposite-face signs and convergent periodic-image limit.

The cell Ward identity similarly tests only the total completed row. It cannot decide whether cancellation came from bounded reactive storage, a circulating face current, secular storage hidden inside the averaging window, or an imposed completion.

## 6. Why the Available Analytical Routes Do Not Supply the Missing Split

### 6.1 Force-ledger route

The canonical receiver-normal root ledger supplies forces, torques, and delivered power. It does not supply a time-translation or rotation Noether charge density. A force value at reception does not identify which part of the causal-history record is stored inside a chosen cell or crosses a chosen face.

### 6.2 Work-integral route

The realized-trajectory energy construction gives

$$
U_{A,\mathrm{work}}(T)
=
U_A(T_\ast)-\int_{T_\ast}^T S_A^E(T')\,dT'.
$$

This is the storage-only representative. It is useful because it exposes secular energy immediately when $\overline{S_A^E}\ne0$, but it does not derive the boundary-current representative or prove that the stored functional is bounded below. The analogous torque integral has the same limitation for angular momentum.

### 6.3 Far-field reconstruction

A vanishing far-field surface flux constrains the outer boundary of that reconstruction. It does not fix the local storage/current partition within a periodic cell and cannot be imported as $\Phi_A^L=0$ or $\Phi_A^E=0$ on a different cell record.

### 6.4 Action-boundary route

An action-derived split would be decisive, but the current scalar causal-action statistic is explicitly not the exact variational action. The missing object is a symmetry-preserving nonlocal action whose same regularization produces the canonical receiver-normal force and whose rotation and time-translation pullbacks produce the wake angular-momentum and energy rows on the same retained chart.

## 7. Transport and Terminal Calculation Are Not Licensed

Because no bounded balanced base state has been established independently of the ambiguous wake completion, there is no defined linearized state about which to extract

$$
\mathcal K_L^{(1)}(\mathbf k,0)
$$

or

$$
\mathcal K_L^{(2)}(0;\Omega,-\Omega).
$$

Assigning the whole defect to face current would manufacture a nonzero transport coefficient; assigning it to wake storage would manufacture a pinned or secular response. Both assignments satisfy the uncompleted Ward equation. An axial twist cannot remove this ambiguity because the response of the missing wake functional to the twist is itself part of the unknown constitutive law.

The localized-pump solve is therefore also premature. A terminal counter-torque can close an imposed current, but it cannot establish that the cell produces that current. Likewise, setting the terminal power to $\Omega\tau_{\mathrm{term}}$ closes only the mechanical endpoint row unless the same wake-energy current has been derived between source and terminal.

## 8. Exact Missing Producer Contract

The first proof-moving object is not another spacing, fraction, or prescribed cell sweep. It is one of the following on a single sub-luminal retained chart:

1. **Same-action Noether pullback:** a symmetry-preserving regularized nonlocal action that reproduces the canonical receiver-normal force and emits both rotation and time-translation boundary charges, including cell-face currents and vanishing endpoint leakage.
2. **Resolved boundary-event ledger:** a realized-trajectory construction that assigns every retained emission, in-flight interval, reception, and periodic-face crossing to angular-momentum and energy storage/current rows, with a crosswalk to delivered torque and power and with regulator, memory, image-radius, and resolution convergence.

Either producer must return, without fitting separate completions,

$$
\left(
L_A^{\mathrm w},
\Phi_A^L,
E_A^{\mathrm w},
\Phi_A^E
\right)
$$

for both sublattices, plus the common residuals

$$
\epsilon_L\to0,
\qquad
\epsilon_E\to0,
\qquad
\Delta_{E,\mathrm{cross}}\to0.
$$

Only then can one cell be classified as bounded-insulating, bounded-transporting, or intrinsically pumped.

## 9. Fail-Closed Verdict

- **OPEN:** not established. No nonzero regulator-stable material current, terminal counter-torque, and same-record energy current have been derived.
- **Theorem-level global BARRED:** not established. Non-identifiability of the current completion is not a proof that every admissible balanced retained branch has zero transport or unavoidable secular storage.
- **One clean-cell failure:** not established. The requested wake rows cannot be extracted from the stipulated canonical retained-root force ledger, so no cell can pass or fail the stated complete test on that input alone.
- **Analytical result established:** the proposed decider is underdetermined, and the energy row exposes an independent obstruction: pro/anti angular-pump cancellation generically adds, rather than cancels, the two rigid-rotation pump powers.

The defensible global status is therefore **UNDECIDED — blocked at the same-record wake Noether pullback**, not theorem-level **BARRED** and not **OPEN**. The §87 phrase **BARRED-pending-one-clean-cell** is too optimistic about the available input: the first missing accepted object is the wake storage/current producer that makes a clean-cell decision well-defined.

## Promotion Disposition

- Classification: **priority-only**.
- Promotion: **defer with blocker**.
- No script, solver, generator, or reader-facing canon change follows.
- Likely eventual corpus destinations remain the Master Equation, Energy, and Noether sea transport sections, but only after a same-action or resolved-event producer closes the common angular-momentum and energy residuals.

Closure goal: construct one same-record wake Noether pullback or resolved boundary-event ledger that uniquely separates bounded storage from periodic-face current for both angular momentum and energy on a sub-luminal balanced cell.
