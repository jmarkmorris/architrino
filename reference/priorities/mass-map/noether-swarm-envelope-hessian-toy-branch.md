# Noether Swarm Envelope Hessian Toy Branch

This priority packet supplies the first reduced Hessian calculation behind the Noether-Sea pressure modulus. It is report material, not reader-facing canon. Its purpose is to turn the open branch stiffness $H_{\mathrm{env}}$ into an explicit two-variable toy branch that can be checked, falsified, and later replaced by a certified Noether swarm branch calculation.

## Claim Level

- **Status:** toy branch Hessian and stability classifier.
- **Main claim:** for a reduced oblate-envelope branch with active variables $(\ln R_\perp,\ln\xi)$, the scalar packing-volume stiffness is a constrained projection of a $2\times2$ envelope Hessian. It is positive only when the branch Hessian is positive on the retained non-symmetry subspace.
- **Open burden:** derive the entries of $H_{\mathrm{env}}$ from a finite Noether swarm branch calculation instead of assigning them as toy stiffnesses.
- **Promotion target:** none until the Hessian entries are extracted from an accepted branch and the pressure, tensor, and null-sector residuals remain below bound.

## Source Anchors

- [Noether-Sea Pressure Modulus and Packing Headroom](noether-sea-pressure-modulus-and-packing-headroom.md) defines $K_{\mathrm{pack}}=K_{\text{sea}}/\kappa_n$ and requires $H_{\mathrm{env}}$ to compute $K_{\mathrm{env}}$.
- [Noether Swarm Scaling and Packing Scaffold](../dyadic-lock/noether-swarm-scaling-and-packing.md) defines the oblate envelope, support-function lattice-cell bound, and same-level packing scalings.
- [Pressure-Response Coefficient Closure](pressure-response-coefficient-closure.md) records how shape response feeds $\chi_{\text{sea}}$, $\Gamma_N$, and $\mathcal{M}_{\text{sea}}^{ab}$.

## Runtime Artifact

Run the priority-side scanner with:

```text
node scripts/mass-map/noether-swarm-envelope-hessian-scanner.mjs --pretty
```

For branch-promotion checks, require finite-branch evidence explicitly:

```text
node scripts/mass-map/noether-swarm-envelope-hessian-scanner.mjs --require-branch-evidence --pretty
```

The script consumes:

```text
scripts/mass-map/noether-swarm-envelope-hessian-scan.mock.json
```

and emits one result row per Hessian scenario, with candidate rows for fixed-core, transverse-radius, volume-equivalent, and parallel-radius $R_{\text{core}}$ readouts. It reports $\Delta_H$, $D_H$, $k_{\mathrm{env}}^{(V)}$, $A_H$, $B_H$, the affine residual $c_RA_H+c_\xi B_H-1$, scalar feasibility residuals, $\kappa_n$, branch-evidence status, and the induced $\xi$ residual. The default run evaluates toy algebra. The `--require-branch-evidence` run fails any row whose Hessian entries are not declared as accepted finite-branch output.

## Reduced Branch Variables

Use the active log-coordinate vector

$$
\boldsymbol{\theta}
=
\begin{pmatrix}
r\\
x
\end{pmatrix}
\equiv
\begin{pmatrix}
\delta\ln R_\perp\\
\delta\ln\xi
\end{pmatrix}.
$$

For an aligned oblate cell with two transverse support directions and one parallel support direction,

$$
V_{\mathrm{cell}}^{\mathrm{sf}}
\propto
R_\perp^3\xi,
$$

so the support-function volume map is

$$
\delta\ln V_{\mathrm{cell}}^{\mathrm{sf}}
=
\mathbf{c}^T\boldsymbol{\theta},
\qquad
\mathbf{c}
=
\begin{pmatrix}
c_R\\
c_\xi
\end{pmatrix}
=
\begin{pmatrix}
3\\
1
\end{pmatrix}.
$$

For a mixed-orientation support-function cell, keep the same formula but replace $c_\xi=1$ by the branch derivative

$$
c_\xi
\equiv
\left.
\frac{\partial\ln V_{\mathrm{cell}}^{\mathrm{sf}}}
{\partial\ln\xi}
\right|_{\Lambda_{\mathrm{NC}}},
\qquad
0\le c_\xi\le1
$$

when the branch remains oblate and orientation averaging weakens shape sensitivity. The density strain is the opposite of the support-volume strain at fixed packing fraction:

$$
\epsilon_n
\equiv
\delta\ln n
=
-\mathbf{c}^T\boldsymbol{\theta}.
$$

## Toy Envelope Hessian

Let the branch energy near the reference state be

$$
\delta E_{\mathrm{env}}
=
\frac{1}{2}
\boldsymbol{\theta}^T
H_{\mathrm{env}}
\boldsymbol{\theta}
+O(\|\boldsymbol{\theta}\|^3),
$$

with

$$
H_{\mathrm{env}}
=
\begin{pmatrix}
k_R & k_{R\xi}\\
k_{R\xi} & k_\xi
\end{pmatrix}.
$$

The branch is stable on this reduced subspace only if

$$
\boxed{
k_R>0,
\qquad
k_\xi>0,
\qquad
\Delta_H\equiv k_Rk_\xi-k_{R\xi}^2>0.
}
$$

If $\Delta_H=0$, the toy branch has a floppy envelope mode and reports zero projected stiffness in at least one direction. If $\Delta_H<0$, the reference state is branch-unstable and cannot supply $K_{\mathrm{pack}}$.

## Projected Packing-Volume Stiffness

The least-energy deformation at fixed density strain solves

$$
\min_{\boldsymbol{\theta}}
\frac{1}{2}\boldsymbol{\theta}^TH_{\mathrm{env}}\boldsymbol{\theta}
\quad
\text{subject to}
\quad
\mathbf{c}^T\boldsymbol{\theta}=-\epsilon_n.
$$

The solution is

$$
\boxed{
\boldsymbol{\theta}_{\min}
=
-
\frac{
H_{\mathrm{env}}^{-1}\mathbf{c}
}{
\mathbf{c}^TH_{\mathrm{env}}^{-1}\mathbf{c}
}
\epsilon_n.
}
$$

The scalar stiffness conjugate to $\epsilon_n$ is

$$
\boxed{
k_{\mathrm{env}}^{(V)}
=
\left(
\mathbf{c}^TH_{\mathrm{env}}^{-1}\mathbf{c}
\right)^{-1}.
}
$$

For the $2\times2$ Hessian, this becomes

$$
\boxed{
k_{\mathrm{env}}^{(V)}
=
\frac{
\Delta_H
}{
D_H(\mathbf{c})
},
\qquad
D_H(\mathbf{c})
=
k_\xi c_R^2
-2k_{R\xi}c_Rc_\xi
+k_Rc_\xi^2.
}
$$

On a positive branch, $D_H(\mathbf{c})>0$ for any nonzero $\mathbf{c}$. The aligned-cell result is therefore

$$
\boxed{
k_{\mathrm{env,axis}}^{(V)}
=
\frac{
k_Rk_\xi-k_{R\xi}^2
}{
9k_\xi-6k_{R\xi}+k_R
}.
}
$$

If the Hessian is diagonal, the branch reduces to

$$
\boxed{
k_{\mathrm{env,diag}}^{(V)}
=
\frac{k_Rk_\xi}{9k_\xi+k_R}.
}
$$

The limiting checks are useful:

$$
\lim_{k_\xi\to\infty}k_{\mathrm{env,diag}}^{(V)}
=
\frac{k_R}{9},
\qquad
\lim_{k_R\to\infty}k_{\mathrm{env,diag}}^{(V)}
=
k_\xi.
$$

The first limit recovers the spherical log-radius result; the second says compression can be carried almost entirely by the shape ratio when transverse-radius motion is locked.

## Induced Shape Response

Write

$$
D_H
\equiv
D_H(\mathbf{c}).
$$

The density-constrained deformation components are

$$
\boxed{
\delta\ln R_\perp
=
-
\frac{
k_\xi c_R-k_{R\xi}c_\xi
}{
D_H
}
\epsilon_n,
}
$$

and

$$
\boxed{
\delta\ln\xi
=
-
\frac{
k_Rc_\xi-k_{R\xi}c_R
}{
D_H
}
\epsilon_n.
}
$$

Thus an isotropic density compression can still create a shape-ratio shift unless

$$
\boxed{
k_Rc_\xi=k_{R\xi}c_R.
}
$$

For the aligned branch this cancellation condition is

$$
\boxed{
k_R=3k_{R\xi}.
}
$$

If the pressure replay or null-sector bounds require no first-order shape response, the Hessian must satisfy this cancellation, lock $\xi$ through a large shape stiffness, or route the mismatch into an explicit anisotropic residual. It cannot simply set $\kappa_\xi=0$ independently of the branch Hessian.

## Normalized Hessian Response Ratios

The pressure replay uses the density-normalized deformation ratios

$$
A_H
\equiv
\frac{
k_\xi c_R-k_{R\xi}c_\xi
}{
D_H
},
\qquad
B_H
\equiv
\frac{
k_Rc_\xi-k_{R\xi}c_R
}{
D_H
}.
$$

They are not independent. Direct substitution gives

$$
\boxed{
c_RA_H+c_\xi B_H=1.
}
$$

Thus a positive reduced Hessian can move the scalar compression between transverse scale and shape ratio, but the support-function volume derivative fixes their affine combination. Positivity of the Hessian is also not, by itself, a falsification of any particular pair $(A_H,B_H)$ on this affine line. For any candidate pair satisfying $c_RA_H+c_\xi B_H=1$, one can choose a positive matrix $H_{\mathrm{env}}^{-1}$ with

$$
H_{\mathrm{env}}^{-1}\mathbf c
\propto
\begin{pmatrix}
A_H\\
B_H
\end{pmatrix},
$$

and hence recover that pair through the normalized projection. The real branch burden is stronger: the finite Noether swarm branch must supply the Hessian entries, and the resulting $B_H$ must pass the retained null-sector bounds.

For a pressure coordinate $\Theta$ with

$$
\delta\ln n=\kappa_n\Theta,
$$

the induced shape-ratio response is

$$
\boxed{
\delta\ln\xi=-\kappa_nB_H\Theta.
}
$$

If the scalar pressure row excludes first-order $-\ln\xi$, the branch must either impose $B_H=0$ or declare a residual tolerance such as

$$
\boxed{
\max_r
\left|
\kappa_nB_H\Theta_r
\right|
\le
\epsilon_{\xi}^{P}.
}
$$

This is not a new validation gate. It is the local null-sector bookkeeping already required when an isotropic pressure row induces a shape-ratio response.

### Positive-Hessian Replay Feasibility Lemma

The reduced Hessian supplies a branch-derived pressure slope only when the replay target lies on the Hessian affine line and the branch has positive density response. Let a scalar replay or shared-row reduction demand a candidate pair

$$
\mathbf{v}_*
=
\begin{pmatrix}
A_*\\
B_*
\end{pmatrix}
$$

for the density-normalized envelope response. A toy positive Hessian can realize this pair only if

$$
\boxed{
c_RA_*+c_\xi B_*=1.
}
$$

Conversely, if this affine condition holds, then there exists a positive matrix $H_{\mathrm{env}}$ realizing $\mathbf{v}_*$ as a toy response. This converse is only an algebraic feasibility statement: it says positive-Hessian sign constraints alone do not falsify $\mathbf{v}_*$. The promotion burden is stronger and branch-specific:

$$
\boxed{
\begin{gathered}
k_R>0,\qquad k_\xi>0,\qquad
\Delta_H>0,\qquad D_H>0,\\
A_H=A_*,\qquad B_H=B_*,\qquad
\text{finite branch evidence accepted.}
\end{gathered}
}
$$

The proof of the algebraic converse is short. Put $M=H_{\mathrm{env}}^{-1}$. The normalized response requires

$$
\frac{M\mathbf c}{\mathbf c^TM\mathbf c}
=
\mathbf v_*.
$$

If $\mathbf c^T\mathbf v_*=1$, choose $\mu>0$ and require $M\mathbf c=\mu\mathbf v_*$. Since $\mathbf c^TM\mathbf c=\mu>0$, a symmetric positive matrix with that action on $\mathbf c$ can be completed by assigning any positive stiffness on the one-dimensional complement. This constructs a toy $M>0$ and therefore a toy $H_{\mathrm{env}}>0$.

The lemma explains why independent pressure fit knobs are not branch evidence. A fitted pair $(A_*,B_*)$ that fails $c_RA_*+c_\xi B_*=1$ cannot come from the declared support-function volume mode. A fitted pair that passes the affine condition is still only a target until an accepted finite branch emits the Hessian entries. The scanner must therefore intake the entries as branch output, not as a row-local replacement for $\kappa_n$, $\kappa_\lambda$, or $\kappa_R$.

## Modulus Handoff

The envelope contribution to the pressure modulus is

$$
\boxed{
K_{\mathrm{env}}
=
\rho_{\text{core},0}n\,k_{\mathrm{env}}^{(V)}.
}
$$

The full support-function modulus remains

$$
\boxed{
K_{\mathrm{pack}}^{\mathrm{sf}}
=
K_{\mathrm{env}}
+K_{\mathrm{contact}}
+K_{\mathrm{wake}}^{\mathrm{rev}}.
}
$$

The density branch therefore uses

$$
\boxed{
\delta\ln n
\approx
s_n
\frac{\delta P}
{K_{\mathrm{pack}}^{\mathrm{sf}}},
\qquad
K_{\text{sea}}
=
\kappa_nK_{\mathrm{pack}}^{\mathrm{sf}}.
}
$$

The induced envelope response can be fed into the pressure coefficient closure through $\delta\ln\lambda$ and $\delta\ln\xi$ only after the branch declares whether $\lambda$ is identified with $R_\perp/R_{\perp,0}$, with another envelope scale, or with a support-cell average.

## Classification Table

| Condition | Reading | Pressure-modulus consequence |
| --- | --- | --- |
| $k_R>0$, $k_\xi>0$, $\Delta_H>0$ | positive reduced branch | $K_{\mathrm{env}}>0$ and the density modulus is admissible |
| $\Delta_H=0$ after symmetry modes are removed | floppy envelope mode | $K_{\mathrm{env}}$ is not accepted; density response is underdetermined |
| $\Delta_H<0$ | branch instability | no modulus; branch must split or fail |
| $k_Rc_\xi=k_{R\xi}c_R$ | first-order shape-ratio cancellation | isotropic density compression does not force $\delta\ln\xi$ |
| $k_Rc_\xi\ne k_{R\xi}c_R$ | density-shape coupling | pressure response must carry $\xi$ shift or anisotropic residual |

## Falsification Conditions

1. **Negative Hessian branch:** a replay needs $K_{\mathrm{pack}}>0$ while the retained Hessian has $\Delta_H\le0$ after symmetry modes are removed.
2. **Hidden shape response:** isotropic pressure data require $\delta\ln\xi=0$ but the declared Hessian has $k_Rc_\xi\ne k_{R\xi}c_R$ and no large shape-locking stiffness.
3. **Modulus mismatch:** $K_{\mathrm{pack}}$ inferred from residual channels disagrees with $\rho_{\text{core},0}n\,k_{\mathrm{env}}^{(V)}+K_{\mathrm{contact}}+K_{\mathrm{wake}}^{\mathrm{rev}}$ for the same branch state.
4. **Null-sector violation:** the Hessian-induced $\delta\ln\xi$ drives birefringence, dispersion, preferred-frame, clock/signal, or tensor anisotropy above the retained bounds.
5. **Coefficient split:** the replay fits $\lambda$ and $\xi$ responses with coefficients inconsistent with the Hessian deformation vector $\boldsymbol{\theta}_{\min}$.

## Scanner Handoff

The first scanner now samples $(k_R,k_\xi,k_{R\xi},c_\xi)$, reports $k_{\mathrm{env}}^{(V)}$, $A_H$, $B_H$, $\delta\ln R_\perp/\epsilon_n$, $\delta\ln\xi/\epsilon_n$, and flags positive, scalar-feasible, density-sign-passing, and null-sector-safe branches. For pressure-row rescue work, it accepts a declared $(q_R,q_\xi)$ readout and reports $Q_H=q_RA_H+q_\xi B_H$.

The default mock packet has two scenarios:

| Scenario | Scanner result | Reading |
| --- | --- | --- |
| `chi_only_falsification_control` | all four readouts fail | the scalar equation is formally underdetermined, but the density denominator is zero, so $\kappa_n$ cannot be positive while $G_\chi\ne0$ |
| `fixed_core_density_rescue_toy` | fixed-core readout passes; transverse-radius, volume-equivalent, and parallel-radius readouts fail scalar feasibility | a positive aligned-cancellation Hessian can rescue the toy row only for the declared fixed-core readout and density-side pressure response |

This is still a toy branch certificate. It should remain priority-side material until a finite Noether swarm branch supplies actual Hessian entries and the induced $\xi$ residual is checked against the retained null-sector bounds.

## Finite-Branch Intake Verdict

The current compact $A_0$ branch material cannot replace the mock Hessian entries. The fold-layer-locked one-period attempt in [A0 Reduced Branch Certificate Packet](a0-reduced-branch-certificate.md) is a direct negative result for the naive root-weighted map: it reports `failed_direct_one_period_residuals`, leaves the quotient monodromy and $\eta$ ladder uncomputed, and gives a relation-weight-only no-go with relative residual about `0.755`. It therefore does not define an accepted history segment and does not emit a finite envelope Hessian.

The finite replacement condition is exact. For an accepted branch $\Lambda$, the scanner row must replace the toy stiffnesses by branch-emitted entries

$$
k_R
=
\frac{\partial^2 E_{\mathrm{env}}^\Lambda}{\partial(\ln R_\perp)^2},
\qquad
k_\xi
=
\frac{\partial^2 E_{\mathrm{env}}^\Lambda}{\partial(\ln\xi)^2},
\qquad
k_{R\xi}
=
\frac{\partial^2 E_{\mathrm{env}}^\Lambda}{\partial(\ln R_\perp)\partial(\ln\xi)}
$$

on the quotient-normal branch chart after symmetry modes are removed. It must also emit the support-volume derivative

$$
c_R
=
\frac{\partial\ln V_{\mathrm{cell}}^{\mathrm{sf}}}{\partial\ln R_\perp},
\qquad
c_\xi
=
\frac{\partial\ln V_{\mathrm{cell}}^{\mathrm{sf}}}{\partial\ln\xi}.
$$

Until those quantities are produced by the same finite branch that passes residual closure, positive $\Delta_{\mathbf{k}}$, and $\eta$-ladder persistence, the compensated-row scanner has only two durable conclusions:

1. the $\chi_{\text{sea}}$-only row is falsified by the pressure denominator and density-sign test;
2. the fixed-core density rescue is a toy witness, not branch evidence.

Running the scanner with finite-branch evidence required currently returns zero passing scenarios and zero passing candidates, because both default scenarios are marked as toy algebra rather than accepted branch output.

## Finite-Branch Intake Contract

This contract is the handoff from the negative `--require-branch-evidence` verdict to the next finite-branch packet. It is an intake contract, not a new validation gate: it states the fields that a finite Noether swarm branch must already have emitted before the Hessian scanner may treat a pressure-row rescue as branch-derived.

### Required Scenario Status

A finite scenario must set `branch_evidence.required: true` or be run with `--require-branch-evidence`. It must then declare the following scanner-visible status:

| Field | Required value | Fail-closed reading |
| --- | --- | --- |
| `branch_evidence.kind` | `finite_branch` | any toy, fitted, inferred, or unspecified kind gives `finite_branch_evidence_missing` |
| `branch_evidence.status` | `accepted_history_segment` | any provisional, failed, diagnostic, or source-mining status gives `accepted_history_segment_missing` unless `accepted_history_segment: true` is also present |
| `branch_evidence.accepted_history_segment` | `true` | no pressure rescue may promote from a failed one-period attempt or unresolved residual ledger |
| `branch_evidence.hessian_entries_derived` | `true` | fitted $(A_H,B_H)$ or hand-assigned stiffnesses remain toy algebra |
| `branch_evidence.hessian_source` | nonempty source string | the emitted Hessian record must be traceable to the accepted branch calculation |
| `branch_evidence.source` | nonempty source string | the accepted-history segment must be traceable to its branch packet |

The current scanner enforces all six rows when branch evidence is required. The `source` string is machine-enforced as a nonempty string so a finite intake packet connects the Hessian entries to the accepted history segment rather than to a row-local pressure fit.

### $A_0$ Carrier-Correction Source Boundary

Scanner, correction-packet, or waveform-replay outputs from the $A_0$ carrier-correction lane, including a Fourier carrier-correction candidate, may be cited only as diagnostic source material until a corrected one-period attempt emits an accepted history segment, quotient chart identity, positive $\Delta_{\mathbf{k}}$, $\eta$-ladder persistence, and finite Hessian entries. This is a fail-closed source-status rule inside the current finite-branch intake contract, not a new gate beyond it: if the rerun has not emitted those branch records, `--require-branch-evidence` must keep the pressure/Hessian row in diagnostic status.

### Accepted-History Source Fields

The source packet behind `branch_evidence.source` must record, at minimum:

| Source field | Required content |
| --- | --- |
| `branch_id` | stable finite-branch label for $\Lambda$ |
| `accepted_history_segment_id` | identifier for the accepted path-history segment used to define the local branch chart |
| `source_path` | priority-side packet or generated report that contains the accepted segment |
| `residual_status` | pass status for the branch residual vector used by the segment |
| `quotient_chart_id` | chart in which $(\ln R_\perp,\ln\xi)$ are retained active coordinates |
| `symmetry_modes_removed` | explicit list of removed translation, rotation, phase, or gauge directions |
| `gap_or_stability_status` | positive retained-branch stability statement, including the relevant $\Delta_{\mathbf{k}}$ or branch-gap diagnostic |
| `eta_ladder_status` | persistence status for the $\eta$ ladder when the branch claim depends on it |
| `hessian_record_id` | identifier for the emitted Hessian source named by `branch_evidence.hessian_source` |

If any of these fields is missing, the row may still be useful as a diagnostic replay, but it is not finite branch evidence. The branch-evidence status should remain toy, provisional, or failed, and `--require-branch-evidence` must keep every candidate failed.

### Required Hessian Record

The source behind `branch_evidence.hessian_source` must emit the retained Hessian record, not only the derived response ratios. Required entries are:

| Hessian entry | Required meaning |
| --- | --- |
| active variables | $r=\delta\ln R_\perp$ and $x=\delta\ln\xi$ on the declared quotient-normal chart |
| energy functional | branch-local $E_{\mathrm{env}}^\Lambda(r,x)$ or generated finite-difference/automatic-differentiation source for it |
| $k_R$ | $\partial^2E_{\mathrm{env}}^\Lambda/\partial r^2$ |
| $k_\xi$ | $\partial^2E_{\mathrm{env}}^\Lambda/\partial x^2$ |
| $k_{R\xi}$ | $\partial^2E_{\mathrm{env}}^\Lambda/\partial r\partial x$ with symmetry modes already removed |
| $c_R$ | $\partial\ln V_{\mathrm{cell}}^{\mathrm{sf}}/\partial\ln R_\perp$ for the same support-function cell |
| $c_\xi$ | $\partial\ln V_{\mathrm{cell}}^{\mathrm{sf}}/\partial\ln\xi$ for the same support-function cell |
| tolerance | numerical tolerance used for Hessian positivity, affine residuals, and scalar feasibility |
| normalization | energy, density, and coordinate normalization used to compare $K_{\mathrm{env}}$ and $\kappa_n$ |

The scanner then recomputes

$$
\Delta_H=k_Rk_\xi-k_{R\xi}^2,
\qquad
D_H=k_\xi c_R^2-2k_{R\xi}c_Rc_\xi+k_Rc_\xi^2,
$$

and accepts the retained Hessian only if

$$
\boxed{
k_R>0,\qquad
k_\xi>0,\qquad
\Delta_H>0,\qquad
D_H>0.
}
$$

The emitted packet may report $A_H$, $B_H$, and $k_{\mathrm{env}}^{(V)}$, but those are derived readouts. If the packet emits only $(A_H,B_H)$ without $(k_R,k_\xi,k_{R\xi},c_R,c_\xi)$, it has not supplied a Hessian intake record.

### Readout Records

Each candidate readout must be declared as branch data, not fitted after seeing the pressure residual. The scanner-visible record is:

```json
{
  "name": "finite_branch_fixed_core_readout",
  "q_R": 0,
  "q_xi": 0
}
```

The source packet must also state:

| Readout field | Required content |
| --- | --- |
| `readout_id` | stable label matching the scanner candidate name |
| `readout_source` | branch packet or calculation that defines the representative $R_{\text{core}}$ readout |
| `q_R` | coefficient of $\delta\ln R_\perp$ in $\delta\ln(R_{\text{core}}/R_{\text{core},0})$ |
| `q_xi` | coefficient of $\delta\ln\xi$ in the same readout |
| `lambda_identification` | whether $\lambda$ is $R_\perp/R_{\perp,0}$ or a different support-cell average |
| `admissible_pressure_segment` | pressure interval over which the readout remains the same branch record |
| `shape_response_policy` | strict scalar condition $B_H=0$ or bounded residual $\max_r|\kappa_nB_H\Theta_r|\le\epsilon_\xi^P$ |

The scanner computes

$$
Q_H=q_RA_H+q_\xi B_H.
$$

A readout change after residual inspection is a branch split or a failed replay, not a successful pressure-row rescue. Multiple readouts may be tested, but the accepted one must have a predeclared branch source.

### Minimal Intake Scenario Shape

A finite replacement scenario should have this shape before any promotion claim:

```json
{
  "name": "finite_branch_<branch_id>_<readout_id>",
  "branch_evidence": {
    "kind": "finite_branch",
    "status": "accepted_history_segment",
    "required": true,
    "source": "source_path=<path>; branch_id=<id>; accepted_history_segment_id=<id>; quotient_chart_id=<id>",
    "accepted_history_segment": true,
    "hessian_entries_derived": true,
    "hessian_source": "source_path=<path>; hessian_record_id=<id>; entries=k_R,k_xi,k_Rxi,c_R,c_xi"
  },
  "c_R": 3,
  "c_xi": 1,
  "hessian": {
    "k_R": 3,
    "k_xi": 1,
    "k_Rxi": 1
  },
  "readout_candidates": [
    {
      "name": "finite_branch_fixed_core_readout",
      "q_R": 0,
      "q_xi": 0
    }
  ]
}
```

The numeric values above are placeholders showing the current scanner schema. A real finite packet must replace them with emitted branch values and must keep the pressure rows, delay rows, cadence rows, tolerance, `strict_scalar`, `epsilon_xi_P`, and `theta_samples` declared before evaluating the rescue.

### Fail-Closed Semantics

The intake fails closed under the following conditions:

| Failure mode | Scanner-visible status | Required interpretation |
| --- | --- | --- |
| toy or provisional branch evidence | `branch_evidence_failed` with `finite_branch_evidence_missing` | diagnostic algebra only |
| no accepted history segment | `branch_evidence_failed` with `accepted_history_segment_missing` | cannot identify a finite branch chart |
| no derived Hessian entries | `branch_evidence_failed` with `hessian_entries_not_derived` | fitted response ratios are not branch stiffness |
| no accepted-history branch source | `branch_evidence_failed` with `branch_source_missing` | no traceable branch packet for the accepted segment |
| no Hessian source | `branch_evidence_failed` with `hessian_source_missing` | no traceable intake record |
| nonpositive retained Hessian | `positive_hessian_failed` | branch is unstable or has an unremoved zero mode |
| scalar equation mismatch | `scalar_feasibility_failed` | declared Hessian/readout cannot supply the pressure row |
| nonpositive density response | `density_sign_failed` | pressure response has the wrong sign or undefined $\kappa_n$ |
| unaccepted shape response | `shape_ratio_not_cancelled` or `shape_ratio_bound_failed` | the induced $\xi$ channel violates the strict scalar or bounded null-sector policy |

These failure modes are not independent knobs to repair by fitting. A finite branch may pass only by changing the accepted history segment, changing the predeclared readout, deriving a different finite Hessian, or routing the mismatch into an explicitly bounded residual or branch transition.

### Validation Commands

Use the following commands after adding any finite intake packet:

```text
git diff --check
node scripts/mass-map/noether-swarm-envelope-hessian-scanner.mjs --pretty
node scripts/mass-map/noether-swarm-envelope-hessian-scanner.mjs --require-branch-evidence --pretty
node scripts/validate-content.mjs --check --strict
```

The current expected branch-evidence result is negative: the first scanner command keeps the toy fixed-core witness, while the `--require-branch-evidence` command must report zero passing scenarios and candidates until a scenario declares accepted finite-branch Hessian evidence.
