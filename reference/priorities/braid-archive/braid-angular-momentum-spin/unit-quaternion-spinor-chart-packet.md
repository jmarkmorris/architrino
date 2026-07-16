# Unit-Quaternion Spinor Chart Packet

Status. Priority proof packet for the `spinor_closure` row in [priorities.md](priorities.md), supporting [noncoplanar-spinor-transport-certificate.md](noncoplanar-spinor-transport-certificate.md), [spinor-holonomy-control-table.md](spinor-holonomy-control-table.md), and [nontrivial-spinor-support-row-attempt.md](nontrivial-spinor-support-row-attempt.md). This file is priority material only. It does not edit or canonize reader-facing $\mathbb{A}\mathbb{A}\mathbb{A}$ prose.

Claim level. Coordinate-chart scaffold / defer-with-blocker. Unit quaternions are useful as the visible rotation chart for the ordered-frame path because $S^3$ double-covers $SO(3)$. They do not supply spinor support by themselves. A quaternion endpoint sign change is evidence only for the visible lifted rotation coordinate; spinor support still requires a populated retained active-root row with physical branch-history parity, quotient witness, doubled-path restoration, and angular-momentum compatibility.

Promotion decision. Priority-only. Do not promote quaternion language into reader-facing spinor closure until a populated non-coplanar branch chart passes the existing retained-row certificate. The useful corpus-level statement later would be only that unit quaternions are an efficient chart for the recovered ordered-frame lift, not that quaternions are substrate ontology.

## Chart Object

Let $q\in\mathbb H$ be a unit quaternion,

$$
q=q_0+q_1\mathbf i+q_2\mathbf j+q_3\mathbf k,
\qquad
\|q\|^2=q_0^2+q_1^2+q_2^2+q_3^2=1.
$$

For a spatial vector $\mathbf v\in\mathbb R^3$, represented as a pure imaginary quaternion, the visible rotation chart is

$$
R(q)\mathbf v=q\,\mathbf v\,q^{-1}.
$$

The chart map satisfies

$$
R(q)=R(-q),
$$

so the quaternion chart is a double cover of the visible ordered-frame orientation. This is exactly why the chart is useful for the ordered-frame spinor target. It records the distinction between a continuous lifted path that ends at $-q_0$ after one visible $2\pi$ loop and a doubled path that returns to $q_0$ after $4\pi$.

The chart is not a new branch-history row. It can populate the visible path record in the non-coplanar certificate, but it cannot populate

$$
\Delta k_r,\qquad
\Delta e_r,\qquad
\Delta w_r,\qquad
\Delta\chi_r,
\qquad
q_r,
\qquad
\Delta_{\mathbf J}.
$$

Those quantities remain physical row data.

## Visible Rotation Extraction

For a stable non-coplanar ordered branch, collect the transported layer normals as

$$
N_B(s)
=
\begin{bmatrix}
\hat{\mathbf n}_H(s)&
\hat{\mathbf n}_M(s)&
\hat{\mathbf n}_L(s)
\end{bmatrix},
\qquad
D_{HML}(s)=\det N_B(s).
$$

The quaternion chart is admissible only in the same non-coplanar domain used by the transport certificate:

$$
\inf_{s\in[0,2]}|D_{HML}(s)|\ge\varepsilon_{\mathrm{nc}}>0.
$$

If $N_B(s)$ is invertible, define the visible triad map

$$
A_B(s)=N_B(s)N_B(0)^{-1}.
$$

When $A_B(s)$ is not an exact rotation, extract the nearest proper rotation by the positive polar factor

$$
R_B^{\mathrm{vis}}(s)=\operatorname{polar}_+(A_B(s)),
$$

and keep the branch-deformation residual

$$
\Delta_{\mathrm{def}}^{q}
=
\sup_{s\in[0,2]}
\left\|
A_B(s)-R_B^{\mathrm{vis}}(s)
\right\|_F.
$$

The quaternion chart may be used as the visible-path coordinate only if

$$
\Delta_{\mathrm{def}}^{q}\le\varepsilon_q^{\mathrm{def}},
$$

or if the residual is explicitly carried as branch deformation that is not hidden inside the rotation chart. This prevents the quaternion coordinate from erasing real non-rigid ordered-frame transport.

Choose a continuous lift

$$
q_B:[0,2]\to S^3,
\qquad
R(q_B(s))=R_B^{\mathrm{vis}}(s),
$$

with $q_B(0)$ fixed by the branch chart. The visible generator and doubled-path tests are

$$
\delta_q^{2\pi}
=
\left\|q_B(1)+q_B(0)\right\|,
\qquad
\delta_q^{4\pi}
=
\left\|q_B(2)-q_B(0)\right\|.
$$

The quaternion visible-path row passes only when

$$
\delta_q^{2\pi}\le\varepsilon_q,
\qquad
\delta_q^{4\pi}\le\varepsilon_q.
$$

This row says the visible ordered-frame path is the nontrivial $SO(3)$ loop in lifted coordinates. It does not say the branch has spinor support.

## Compatibility Lemma

**Lemma.** A passing quaternion visible-path row with $q_B(1)\simeq -q_B(0)$ and $q_B(2)\simeq q_B(0)$ does not imply spinor support unless at least one retained non-gauge active-root row has odd physical parity after $2\pi$ and even parity after $4\pi$.

In the notation of the non-coplanar certificate, the support condition remains

$$
\eta_B^{\mathrm{table}}(\gamma_{2\pi})
=
\left[
\sum_{r\in\mathscr K_B}
\epsilon_r^{2\pi}
\right]_2
=1,
\qquad
\eta_B^{\mathrm{table}}(\gamma_{4\pi})=0.
$$

The quaternion row is a base-path row. It is not a summand in $\eta_B^{\mathrm{table}}$. Therefore, if every retained row satisfies

$$
\Delta k_r^{2\pi}
=
\Delta e_r^{2\pi}
=
\Delta w_r^{2\pi}
=
\Delta\chi_r^{2\pi}
=0
\qquad
\text{after quotient},
$$

then

$$
\eta_B^{\mathrm{table}}(\gamma_{2\pi})=0
$$

even when the continuous quaternion lift has $q_B(1)=-q_B(0)$. This is ordinary $SO(3)$ closure in the physical branch-history table, not a spinor-support row.

## How The Chart Can Help

The quaternion chart is useful in four narrow ways.

1. It gives a coordinate-stable representation of the visible ordered-frame loop without Euler-angle singularities.
2. It supplies a concrete check that the chosen path is the generator of $\pi_1(SO(3))\cong\mathbb Z_2$.
3. It separates visible rotation extraction from branch deformation through $\Delta_{\mathrm{def}}^{q}$.
4. It gives future simulation packets a clean endpoint test, $\delta_q^{2\pi}$ and $\delta_q^{4\pi}$, before they evaluate active-root rows.

The chart becomes physically useful only when consumed by the retained-row certificate. A future branch packet may use the quaternion path as the declared $\gamma_{2\pi}$ / $\gamma_{4\pi}$ base path, then test whether some

$$
r_\star\in\mathscr K_B
$$

has

$$
\epsilon_{r_\star}^{2\pi}=1,
\qquad
\epsilon_{r_\star}^{4\pi}=0,
\qquad
\Delta_{\mathbf J}^{2\pi},\Delta_{\mathbf J}^{4\pi}\le\varepsilon_{\mathbf J}.
$$

The accepted support row must still identify which physical entry is odd:

$$
\Delta k_{r_\star}^{2\pi},
\qquad
\Delta e_{r_\star}^{2\pi},
\qquad
\Delta w_{r_\star}^{2\pi},
\qquad
\Delta\chi_{r_\star}^{2\pi},
$$

and why that odd entry survives the allowed quotient.

## Failure And No-Go Table

| Case | Quaternion result | Verdict |
| --- | --- | --- |
| Visible lift only | $q_B(1)\simeq -q_B(0)$ and $q_B(2)\simeq q_B(0)$, with all retained history rows zero | Ordinary visible double-cover chart; no spinor support. |
| Gauge sign choice | The sign of $q_B$ is selected after seeing the endpoint rather than by a continuous lift from fixed $q_B(0)$ | Chart failure. |
| Coplanar or fixed-normal branch | $D_{HML}(s)=0$ or below margin | Outside the non-coplanar spinor-test domain. |
| Non-rigid transport hidden by the chart | $\Delta_{\mathrm{def}}^{q}>\varepsilon_q^{\mathrm{def}}$ and the residual is not carried separately | Fail; real branch deformation has been erased by a best-fit rotation. |
| Quaternion sign used as row parity | $q_B(1)=-q_B(0)$ is inserted as $\epsilon_r^{2\pi}=1$ without $\Delta k$, $\Delta e$, $\Delta w$, or $\Delta\chi$ data | Imported $SU(2)\to SO(3)$ comparison, not $\mathbb{A}\mathbb{A}\mathbb{A}$ support. |
| Imaginary quaternion units treated as physical axes | $\mathbf i,\mathbf j,\mathbf k$ are read as substrate directions rather than chart basis symbols | Ontology overread. |
| Lorentz or Dirac closure claimed | Unit-quaternion chart is used to infer $SL(2,\mathbb C)$, Dirac dynamics, or fermion matter closure | Overclaim; the effective relativistic spinor target remains separate. |
| Spin-statistics claimed | Quaternion sign change is used to derive Pauli exclusion or exchange sign | Overclaim; exchange must consume the same retained non-gauge ordered-frame row. |

## Interface With Spinor And Metric Consumers

The spatial unit-quaternion chart belongs only to the $Spin(3)\to SO(3)$ part of the problem. It can help organize the ordered-frame $2\pi/4\pi$ test, but it does not close the Lorentz-sector extension

$$
SL(2,\mathbb C)\simeq Spin^+(1,3)\to SO^+(1,3),
$$

and it does not prove that fermion stress, weak chirality, helicity, or metric matter channels consume the same record. Those consumers remain blocked until the same branch record supplies the spinor, weak-coupling-triad, event-balance, and metric residuals required by the angular-momentum bridge.

## Current Blocker

This packet improves the coordinate discipline of the spinor-closure lane but does not change the support verdict. The next admissible proof or simulation run may use a unit-quaternion chart to declare the visible path, but it must still populate the non-coplanar retained-row certificate:

$$
\boxed{
\text{defer with blocker: quaternion lift visible, retained active-root support row still unpopulated.}
}
$$
