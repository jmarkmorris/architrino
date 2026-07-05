# Mass-Trace Composition Proof Chain

This priority packet synthesizes the current mass-map advances into one proof chain. It is proof-synthesis material, not a new gate. Its purpose is to show how scalar mass trace is forced to pass through exposed-source descent, reversible symmetric medium response, pressure-row composition, and packing-headroom hardening without creating hidden fit handles.

## Claim Level

- **Status:** priority-side theorem target with a reader-facing compact form promoted into [Particle Masses](../../../content/markdown/aaa/assemblies/particle-masses.md).
- **Main claim:** in a branch-preserving reversible response record, scalar mass trace factors through a quotient-visible exposed source and the rotational trace of the exposed inertial-response tensor. Antisymmetric response, unlogged transport loss, and pressure-row splits cannot contribute to scalar rest mass. Only the trace-free exposure components visible to the retained reversible response directions can affect the scalar trace.
- **Open burden:** extract $E_{\text{internal}}(A)$, $\zeta(A)$, $\mathcal{Z}_{\mathrm{tf}}^{ab}(A)$, $\mathcal{M}_{+}^{ab}$, the retained trace-free response directions, and pressure coefficients from accepted branch records rather than benchmarks. For the receiver-normal successor, the same branch records must also carry same-record $D_s$, $D_T$, and $W^{\mathrm{rec}}=\lvert D_T/D_s\rvert$ for the retained roots consumed by the exposed-source and response rows.

## Inputs

The chain consumes the following already-staged artifacts:

1. scalar exposed-source descent:

$$
M_0^{\mathrm{src}}(A)
=
\overline{\mathcal{B}}_0(\mathcal{E}_0(A))
=
\zeta(A)E_{\text{internal}}(A);
$$

2. exposed-response tensor:

$$
\mathcal{Z}_{A}^{ab}
=
\zeta(A)h^{ab}
+
\mathcal{Z}_{\mathrm{tf}}^{ab}(A),
\qquad
h_{ab}\mathcal{Z}_{\mathrm{tf}}^{ab}(A)=0;
$$

3. reversible symmetric medium response:

$$
\mathcal{M}_{+}^{ab}
=
\frac{1}{2}
\left(
\mathcal{M}_{\text{sea}}^{ab}
+
\mathcal{M}_{\text{sea}}^{ba}
\right);
$$

4. trace / trace-free medium split:

$$
\mathcal{M}_{+}^{ab}
=
\frac{1}{c_{\text{eff},0}^{2}}
\left[
(1+\delta\mathcal{M}_{0})h^{ab}
+
\delta\mathcal{M}_{\mathrm{tf}}^{ab}
\right]
+
\mathcal{R}_{\mathcal M,+}^{ab}.
$$

## Receiver-Normal Successor Target

The generic composition lemma below is not a license to reuse older
source-normal or quotient-only force weights. The receiver-normal successor
theorem target replaces the exposed-source and trace-free exposure inputs by
their same-record receiver-normal versions:

$$
M_0^{\mathrm{src}}(A)
\mapsto
M_{0,\mathrm{rec}}^{\mathrm{src}}(A),
\qquad
\mathcal{Z}_{\mathrm{tf}}^{ab}(A)
\mapsto
\mathcal{Z}_{\mathrm{tf,rec}}^{ab}(A).
$$

For every retained row $\rho$ used by those objects, the retained branch record
must carry

$$
D_{s,\rho},
\qquad
D_{T,\rho},
\qquad
W_{\rho}^{\mathrm{rec}}
=
\left|
\frac{D_{T,\rho}}{D_{s,\rho}}
\right|,
$$

and the same record must bind the energy ledger, exposure quotient chart,
Noether sea response record, retained response direction, and null-sector
status. If any factor is imported from an H39/theta3minus quotient certificate,
source-normal denominator, shell-braid force residue, fixture, or cross-row
bundle without that same-record binding, the successor theorem fails with
`receiver_normal_same_record_missing` rather than producing a mass trace.

The closure equation to prove is therefore the same trace composition with the
receiver-normal source:

$$
m_{\mathrm{tr}}^{\mathrm{rec}}(A)
=
\alpha_{\mathrm{m}}
\frac{1}{c_{\text{eff},0}^{2}}
\left[
M_{0,\mathrm{rec}}^{\mathrm{src}}(A)(1+\delta\mathcal{M}_{0})
+
\frac{1}{3}
E_{\text{internal}}(A)
\mathcal{Z}_{\mathrm{tf,rec},ab}(A)
\delta\mathcal{M}_{\mathrm{tf}}^{ab}
\right]
+
\mathcal{R}_{\mathrm{chain,rec}}.
$$

### Retained Pressure-Row Receiver-Normal Theorem Target

The receiver-normal successor becomes a concrete theorem target only when the
pressure perturbation, exposure quotient, energy ledger, Noether sea response,
and receiver-normal branch weights are all rows of one retained branch identity.
Equivalently, the theorem assumes one accepted non-fixture retained pressure row
with common

$$
\left(
\mathsf{branch\_id},
\mathsf{accepted\_history\_segment\_id},
\mathsf{source\_path},
\mathsf{quotient\_chart\_id},
\mathsf{pressure\_row\_id},
\theta_{\mathrm{sea}},
\mathcal{M}_{+}^{ab},
\Pi,
A,
D_s,
D_T,
W^{\mathrm{rec}}
\right).
$$

Under that same-record assumption, the pressure specialization to prove is

$$
\delta_Pm_{\mathrm{tr}}^{\mathrm{rec}}(A)
=
\alpha_{\mathrm{m}}
\frac{1}{c_{\text{eff},0}^{2}}
\left[
\delta_P M_{0,\mathrm{rec}}^{\mathrm{src}}(A)
+
2M_{0,\mathrm{rec}}^{\mathrm{src}}(A)C_{\chi}^{\mathrm{iso}}\Pi
+
\frac{1}{3}
E_{\text{internal}}(A)
\mathcal{Z}_{\mathrm{tf,rec},ab}(A)
\left(
2C_{\chi}^{\mathrm{aniso}}Q_{\chi}^{ab}
+
m_SS_{\mathrm{dev}}^{ab}
\right)A
\right]
+
\mathcal{R}_{\mathrm{rec}P}.
$$

The simulation form of the same theorem validates the finite difference

$$
m_{\mathrm{tr}}^{\mathrm{rec}}(\Delta P)-m_{\mathrm{tr}}^{\mathrm{rec}}(0)
$$

against the displayed $\delta_Pm_{\mathrm{tr}}^{\mathrm{rec}}(A)$ without
fitting a new scalar mass row. The theorem fails, rather than demotes into a
coefficient estimate, if any term comes from a different row, a fixture, an
H39/theta3minus quotient certificate, a source-normal force residue, or an
unlogged transport channel.

Pass fields:

| Field | Required condition |
| --- | --- |
| `accepted_retained_branch_identity` | the same branch id, history segment, source path, quotient chart, and retained pressure-row id carry every input |
| `receiver_normal_same_record` | $D_s$, $D_T$, and $W^{\mathrm{rec}}$ are recomputed on the retained roots consumed by exposure and response |
| `energy_exposure_binding` | $E_{\text{internal}}(A)$, $M_{0,\mathrm{rec}}^{\mathrm{src}}(A)$, and $\mathcal{Z}_{\mathrm{tf,rec}}^{ab}(A)$ descend through the same exposure quotient |
| `pressure_noether_sea_binding` | $\theta_{\mathrm{sea}}$, $\Pi$, $A$, $C_{\chi}^{\mathrm{iso}}$, $C_{\chi}^{\mathrm{aniso}}$, $m_S$, and $\mathcal{M}_{+}^{ab}$ are branch-emitted on the same pressure row |
| `trace_prediction` | the finite-difference trace residual is below the declared $\mathcal{R}_{\mathrm{rec}P}$ tolerance |
| `domain_and_null` | reversible-domain and null-sector records remain below bound with no unlogged loss |

Current status is `priority-only / defer with blocker`: the theorem statement is
available, but no accepted branch record currently supplies the required
same-row intake.

## Composition Lemma

For an accepted assembly branch $A$ in a branch-preserving reversible response record, the exposed inertial-response tensor is

$$
\mathsf{I}_{A}^{ab}
=
\frac{\alpha_{\mathrm{m}}E_{\text{internal}}(A)}{2}
\left(
\mathcal{Z}_{A}^{a}{}_{c}\mathcal{M}_{+}^{cb}
+
\mathcal{Z}_{A}^{b}{}_{c}\mathcal{M}_{+}^{ca}
\right).
$$

The scalar mass trace is therefore

$$
m_{\mathrm{tr}}(A)
=
\frac{1}{3}h_{ab}\mathsf{I}_{A}^{ab}
=
\alpha_{\mathrm{m}}
\frac{1}{c_{\text{eff},0}^{2}}
\left[
M_{0}^{\mathrm{src}}(A)(1+\delta\mathcal{M}_{0})
+
\frac{1}{3}
E_{\text{internal}}(A)
\mathcal{Z}_{\mathrm{tf},ab}(A)
\delta\mathcal{M}_{\mathrm{tf}}^{ab}
\right]
+
\mathcal{R}_{\mathrm{chain}}.
$$

This is the compact mass-trace composition formula. It says that scalar mass has three allowed first-order sources:

- the quotient-visible scalar source $M_0^{\mathrm{src}}(A)$;
- the trace medium response $\delta\mathcal{M}_{0}$ multiplying that source;
- the trace-free contraction $\mathcal{Z}_{\mathrm{tf},ab}\delta\mathcal{M}_{\mathrm{tf}}^{ab}/3$.

No separate scalar fit row remains in the branch-preserving reversible regime.

The composition formula is usable as a positive scalar mass only inside the scalar-positivity window

$$
M_{0}^{\mathrm{src}}(A)(1+\delta\mathcal{M}_{0})
>
\frac{1}{3}
\left|
E_{\text{internal}}(A)
\mathcal{Z}_{\mathrm{tf},ab}(A)
\delta\mathcal{M}_{\mathrm{tf}}^{ab}
\right|.
$$

Equivalently, in the $\zeta E_{\text{internal}}$ notation with $1+\delta\mathcal{M}_0>0$, a conservative sufficient condition is

$$
\zeta(A)
>
\frac{
\left\|\mathcal{Z}_{\mathrm{tf}}(A)\right\|_h
\left\|\delta\mathcal{M}_{\mathrm{tf}}\right\|_h
}{
3(1+\delta\mathcal{M}_0)
}.
$$

This turns shielding into a bounded window. If a branch is strongly trace-free in its exposed pattern, it cannot also take $\zeta$ arbitrarily small while remaining a positive scalar mass source in an anisotropic medium-response record.

## Composed Trace Quotient-Descent Test

The scalar no-hidden-mass-handle condition is necessary but not sufficient once tensor or pressure response is retained. The whole composed trace must descend through the same quotient.

For restored representatives $d_1,d_2$ with

$$
Q_0\Pi_0\mathcal{L}_A[d_1]
=
Q_0\Pi_0\mathcal{L}_A[d_2],
$$

define the representative difference operator

$$
\Delta_dF
\equiv
F[d_1]-F[d_2].
$$

The first-order composed trace descends through the scalar quotient only if

$$
\Delta_{\mathrm{tr}}(d_1,d_2)
\equiv
(1+\delta\mathcal{M}_0)\Delta_dM_0^{\mathrm{src}}
+
\frac{1}{3}
\delta\mathcal{M}_{\mathrm{tf}}^{ab}
\Delta_d
\left(
E_{\text{internal}}\mathcal{Z}_{\mathrm{tf},ab}
\right)
$$

is below the declared trace tolerance.

This is a stronger invariant than scalar source descent. It allows the scalar source test to pass while the tensor-composed trace fails. In particular, if

$$
\Delta_dM_0^{\mathrm{src}}=0
\qquad\text{but}\qquad
\delta\mathcal{M}_{\mathrm{tf}}^{ab}
\Delta_d
\left(
E_{\text{internal}}\mathcal{Z}_{\mathrm{tf},ab}
\right)
\ne0,
$$

then the discarded representative label is invisible to the homogeneous scalar source but visible to anisotropic inertia. The scalar mass map is then outside its regime; the response must retain the label, promote to tensor exposure, or fail the branch-preserving trace claim.

## Response-Span Quotient-Descent Refinement

The composed trace test should not be stronger than the branch record can justify. The trace-free term is visible to scalar mass only through contraction with retained reversible medium-response tensors. Work in the trace-free symmetric tensor space

$$
\mathrm{Sym}^{2}_{0}(h)
=
\{X^{ab}=X^{ba}\mid h_{ab}X^{ab}=0\}.
$$

Define the trace-free exposure numerator

$$
\mathcal{N}_{\mathrm{tf},ab}(A)
\equiv
E_{\text{internal}}(A)\mathcal{Z}_{\mathrm{tf},ab}(A),
\qquad
h^{ab}\mathcal{N}_{\mathrm{tf},ab}(A)=0,
$$

and let $R_+(A)$ be the retained below-threshold reversible response rows for that branch and medium state. Each row $r\in R_+(A)$ supplies a trace part and trace-free part

$$
\left(
\delta\mathcal{M}_{0,r},
B_r^{ab}
\right),
\qquad
B_r^{ab}\equiv\delta\mathcal{M}_{\mathrm{tf},r}^{ab},
\qquad
h_{ab}B_r^{ab}=0.
$$

The response span is the linear span of these retained rows:

$$
\mathscr{S}_{+}(A)
\equiv
\operatorname{span}
\left\{
\left(
\delta\mathcal{M}_{0,r},
B_r^{ab}
\right)
\right\}_{r\in R_+(A)}.
$$

With the $h$-inner product

$$
\langle X,Y\rangle_h
\equiv
X_{ab}Y^{ab},
\qquad
\|X\|_{h}^{2}
\equiv
\langle X,X\rangle_h,
$$

the scalar trace descends through the quotient along the retained reversible response rows when

$$
\Delta_{\mathrm{tr}}^{(r)}(d_1,d_2)
\equiv
(1+\delta\mathcal{M}_{0,r})\Delta_dM_0^{\mathrm{src}}
+
\frac{1}{3}
\langle B_r,\Delta_d\mathcal{N}_{\mathrm{tf}}\rangle_h
$$

is below tolerance for every $r\in R_+(A)$ used by the branch-preserving response record.

Equivalently, once the scalar source already descends within its declared tolerance, the remaining trace-free condition is the projected one. Let

$$
\mathcal{V}_{\mathcal M}(A)
\equiv
\operatorname{span}
\left\{
B_r^{ab}
\right\}_{r\in R_+(A)}.
$$

Then scalar mass requires

$$
\operatorname{proj}_{\mathcal{V}_{\mathcal M}(A)}
\left(
\Delta_d\mathcal{N}_{\mathrm{tf}}
\right)
=0
$$

within the declared trace tolerance. A scale-independent tolerance form is

$$
\sup_{\substack{B\in\mathcal{V}_{\mathcal M}(A)\\ \|B\|_h\le1}}
\left|
\left\langle
B,\Delta_d\mathcal{N}_{\mathrm{tf}}
\right\rangle_h
\right|
\le
\epsilon_{\mathrm{tf,span}}.
$$

If $\mathcal{V}_{\mathcal M}(A)$ spans the full five-dimensional trace-free symmetric tensor space on $\Sigma_t$, then the whole tensor $\mathcal{N}_{\mathrm{tf},ab}$ must descend. If $\mathcal{V}_{\mathcal M}(A)$ is lower-dimensional, only its response-visible projection is constrained by scalar mass. Orthogonal components may still matter for direction-dependent inertia or later branch probes, but they are not scalar mass handles until a retained response tensor can contract with them.

This refinement prevents two opposite errors. It forbids discarding a label that changes a response-visible trace-free numerator, and it also forbids demoting a scalar mass result merely because an unprobed orthogonal trace-free component differs across representatives.

## Proof Route

1. The exposure quotient supplies a source function $M_0^{\mathrm{src}}$ on the scalar-visible quotient. If a discarded representative changes $M_0^{\mathrm{src}}$, the label is mass-visible and the scalar quotient fails.
2. The inertial response is tensorial because external acceleration or motion probes a medium response tensor, not a scalar denominator alone.
3. The reversible kinetic scalar can consume only $\mathcal{M}_{+}^{ab}$ because $V_{\text{cm},a}\mathcal{M}_{-}^{ab}V_{\text{cm},b}=0$.
4. Contracting $\mathsf{I}_{A}^{ab}$ with $h_{ab}/3$ kills trace-free terms unless trace-free exposure and trace-free medium response are both present.
5. Subtracting two quotient-equivalent representatives in the trace formula yields $\Delta_{\mathrm{tr}}^{(r)}$ for each retained reversible response row. The medium state is common to the comparison, so any nonzero defect comes from the exposed source or the projection of the exposed trace-free tensor numerator onto $\mathcal{V}_{\mathcal M}(A)$.
6. The displayed formula follows by expanding the trace / trace-free split and collecting all unproven higher-order, loss, threshold, and extraction terms into $\mathcal{R}_{\mathrm{chain}}$.

## Pressure Specialization

In a branch-preserving pressure row below the transport threshold, the medium-response tensor projections satisfy

$$
\delta_P\delta\mathcal{M}_{0}
=
2C_{\chi}^{\mathrm{iso}}\Pi
+
\mathcal{R}_{\mathcal M0},
$$

and

$$
\delta_P\delta\mathcal{M}_{\mathrm{tf}}^{ab}
=
\left(
2C_{\chi}^{\mathrm{aniso}}Q_{\chi}^{ab}
+
m_SS_{\mathrm{dev}}^{ab}
\right)A
+
\mathcal{R}_{\mathcal M,\mathrm{tf}}^{ab}.
$$

Substitution into the composition lemma gives

$$
\delta_Pm_{\mathrm{tr}}(A)
=
\alpha_{\mathrm{m}}
\frac{1}{c_{\text{eff},0}^{2}}
\left[
\delta_PM_{0}^{\mathrm{src}}(A)
+
2M_{0}^{\mathrm{src}}(A)C_{\chi}^{\mathrm{iso}}\Pi
+
\frac{1}{3}
E_{\text{internal}}(A)
\mathcal{Z}_{\mathrm{tf},ab}(A)
\left(
2C_{\chi}^{\mathrm{aniso}}Q_{\chi}^{ab}
+
m_SS_{\mathrm{dev}}^{ab}
\right)A
\right]
+
\mathcal{R}_{\mathrm{comp}}.
$$

Thus pressure can change scalar mass trace only through the quotient-visible source, the shared isotropic delay-pressure coefficient, and the trace-free exposed/medium contraction. An independent pressure mass row would be a split branch or a hidden fit.

The pressure row specializes the response span rather than replacing it. At first order, the pressure-visible trace-free directions satisfy

$$
\mathcal{V}_{P,A}
\subseteq
\operatorname{span}
\left\{
Q_{\chi}^{ab},
S_{\mathrm{dev}}^{ab}
\right\},
$$

or the smaller span of the declared pressure combination when only one pressure direction is retained. Pressure therefore tests only the projection of $\mathcal{N}_{\mathrm{tf},ab}(A)$ onto $\mathcal{V}_{P,A}$, while other trace-free components remain outside the scalar pressure row until another retained response tensor probes them.

## Packing-Headroom Limit

When the density-only channel is isolated with $M_0^{\mathrm{src}}(A)$ held fixed, the packing-headroom law gives

$$
\left.
\frac{\partial m_{\mathrm{tr}}}{\partial P}
\right|_{n\text{-only}}
=
2\alpha_{\mathrm{m}}
\frac{M_0^{\mathrm{src}}(A)}{c_{\text{eff},0}^{2}}\,
a_n
\frac{s_n}{K_{\mathrm{pack}}}.
$$

Therefore

$$
\lim_{s_n\to0^+}
\left.
\frac{\partial m_{\mathrm{tr}}}{\partial P}
\right|_{n\text{-only}}
=0.
$$

The limit is not a claim that pressure stops mattering. It says the scalar density channel closes as packing headroom closes; any remaining pressure response must route through exposed-source drift, envelope ratios $\lambda$ and $\xi$, trace-free strain, reversible wake/contact stiffness, tensor response, or a threshold/branch event.

## Failure Modes

The proof chain fails or must demote its claim level if any of the following occur:

| Failure mode | Meaning |
| --- | --- |
| `source-nondescent` | $M_0^{\mathrm{src}}$ changes across representatives identified by the scalar quotient. |
| `receiver-normal-same-record-missing` | $D_s$, $D_T$, or $W^{\mathrm{rec}}$ is missing from the retained roots used by the same exposure, pressure, and response rows. |
| `trace-nondescent` | $M_0^{\mathrm{src}}$ descends but the projection of $E_{\text{internal}}\mathcal{Z}_{\mathrm{tf},ab}$ onto $\mathcal{V}_{\mathcal M}(A)$ does not descend. |
| `scalar-positivity-window-fail` | the trace-free contraction overwhelms the scalar exposed source, so $m_{\mathrm{tr}}(A)$ is zero or negative in the retained response record. |
| `response-span-escape` | An unretained trace-free response tensor contributes above $\mathcal{R}_{\mathrm{chain}}$ tolerance. |
| `response-direction-label-drift` | A retained response direction $B_r^{ab}$ depends on the discarded representative label. |
| `coefficient-fit-contamination` | The retained coefficients are tuned after benchmark mass comparison rather than emitted by the branch record. |
| `projection-mismatch` | Pressure replay directions and tensor-extraction directions are not the same retained response directions. |
| `diagnostic-evidence-import` | H39/theta3minus quotient certificates, source-normal force residues, old shell-braid force rows, fixtures, toy rows, empirical rows without branch source, or cross-row bundles are used as pressure or mass evidence. |
| `antisymmetric-mass-leak` | $\mathcal{M}_{-}^{ab}$ is used to change scalar rest mass. |
| `loss-below-threshold` | A branch-preserving row below $\mathcal{R}_{\text{tr},*}$ carries unlogged excitation, heating, radiation-like shedding, or branch-transition energy. |
| `pressure-row-split` | $\delta\mathcal{M}_0$ or $\delta\mathcal{M}_{\mathrm{tf}}^{ab}$ requires pressure coefficients independent of the shared row. |
| `headroom-violation` | The density-only pressure slope remains finite as $s_n\to0^+$ without a retained support-function or branch-transition record. |

These are not additional validation gates. They are the algebraic failure modes of the composition formula itself.
