# Nested Shell Braid Radial Support Functional

Promotion status: `priority-only`. This packet closes the local definition gap in [Nested Shell Braid Model Card](nested-shell-swarm-model-card.md): the shorthand shell radius $R_a(t)$ is not a primitive object of the base branch. It must be extracted from the free-support descriptor and the closed arclength curves of [free-support-bounded-speed-dynamics.md](../shell-swarm/free-support-bounded-speed-dynamics.md).

It does not retain a branch, choose a final binary-partition notation policy, or authorize corpus migration. Its purpose is to make radius-spread, nested shell, shell braid, and transition rows differentiable proof objects rather than visual labels.

---

## 1. Support Descriptor And Shell Radius Map

Let the branch sites be $(a,\sigma)$ with $a\in\{1,2,3\}$ and $\sigma\in\{+,-\}$. The base variables are closed arclength curves

$$
\mathbf{Y}_{a,\sigma}:\mathbb{R}/L_{a,\sigma}\mathbb{Z}\to\mathbb{R}^3,
\qquad
\|\mathbf{Y}_{a,\sigma}'\|=1,
$$

with support descriptor

$$
\mathcal{D}_{\mathrm{supp}}
=
\left(
\mathbf{C},
R_{a,\sigma}^-,
R_{a,\sigma}^+,
\delta_{a,\sigma},
\Pi_{\mathrm{case}}
\right).
$$

Define the site support radius

$$
r_{a,\sigma}(\lambda)
=
\|\mathbf{Y}_{a,\sigma}(\lambda)-\mathbf{C}\|.
$$

A nested shell braid packet must declare one radial support functional

$$
\boxed{
R_a
=
\mathcal{S}_a[\mathbf{Y},\nu,\mathcal{D}_{\mathrm{supp}}]
}
$$

before using $R_a$ in nested shell, shell braid, transition, or radius-spread rows. The admissible default is the arclength mean

$$
R_a^{\mathrm{mean}}
=
\frac{1}{2}
\sum_{\sigma=\pm}
\frac{1}{L_{a,\sigma}}
\int_0^{L_{a,\sigma}}
r_{a,\sigma}(\lambda)\,d\lambda.
$$

A support-band midpoint convention is also admissible:

$$
R_a^{\mathrm{band}}
=
\frac{1}{4}
\sum_{\sigma=\pm}
\left(
\overline R_{a,\sigma}^+
+
\overline R_{a,\sigma}^-
\right),
$$

where $\overline R_{a,\sigma}^{\pm}$ are declared support-band representatives. An interval-center convention is admissible only if the packet emits interval endpoints

$$
R_a^-\le R_a\le R_a^+
$$

and uses interval inequalities in every case row.

No packet may mix these conventions inside one branch certificate.

---

## 2. First Variations

For a chart direction $v=(\delta\mathbf{Y},\delta\nu,\delta\mathbf{C},\delta\mathcal{D}_{\mathrm{supp}})$, the arclength-mean radius variation is

$$
D_vR_a^{\mathrm{mean}}
=
\frac{1}{2}
\sum_{\sigma=\pm}
\frac{1}{L_{a,\sigma}}
\int_0^{L_{a,\sigma}}
\mathbf{n}_{a,\sigma}\cdot
\left(
\delta\mathbf{Y}_{a,\sigma}
-
\delta\mathbf{C}
\right)
d\lambda
+\mathcal{B}_{a}^{L}[v],
$$

where

$$
\mathbf{n}_{a,\sigma}
=
\frac{\mathbf{Y}_{a,\sigma}-\mathbf{C}}{r_{a,\sigma}}.
$$

The term $\mathcal{B}_{a}^{L}[v]$ records endpoint or length-gauge contributions. It vanishes in a fixed arclength-domain chart with fixed $L_{a,\sigma}$; otherwise it must be emitted explicitly.

The mean radius is independent of $\delta\nu$ except through the chart convention. If a packet reports time-weighted shell radii, it must declare instead

$$
R_a^{u}
=
\frac{1}{2}
\sum_{\sigma=\pm}
\frac{1}{H_{a,\sigma}}
\int_0^{H_{a,\sigma}}
r_{a,\sigma}(\Lambda_{a,\sigma}(u))\,du,
$$

and include the clock variations $D_v\Lambda_{a,\sigma}$ and $D_vH_{a,\sigma}$. The arclength and causal-time conventions are different rows.

For the shell-radius gaps

$$
G_{ab}^{R}=R_b-R_a,
$$

the first variation is

$$
D_vG_{ab}^{R}=D_vR_b-D_vR_a.
$$

For the mean shell radius

$$
\bar R=\frac13\sum_aR_a,
$$

the radius-spread numerator

$$
S_a=R_a-\bar R
$$

has variation

$$
D_vS_a
=
D_vR_a
-
\frac13\sum_bD_vR_b.
$$

---

## 3. Second Variations And Shell Margins

For arclength-mean radii, the second variation in directions $v,w$ is

$$
D^2_{v,w}R_a^{\mathrm{mean}}
=
\frac{1}{2}
\sum_{\sigma=\pm}
\frac{1}{L_{a,\sigma}}
\int_0^{L_{a,\sigma}}
\frac{
\left(P_{S,a,\sigma}\Delta_v\mathbf{Y}_{a,\sigma}\right)
\cdot
\left(P_{S,a,\sigma}\Delta_w\mathbf{Y}_{a,\sigma}\right)
}{r_{a,\sigma}}
d\lambda
+\mathcal{B}_{a}^{L,2}[v,w],
$$

where

$$
\Delta_v\mathbf{Y}_{a,\sigma}
=
\delta_v\mathbf{Y}_{a,\sigma}-\delta_v\mathbf{C},
\qquad
P_{S,a,\sigma}=I-\mathbf{n}_{a,\sigma}\mathbf{n}_{a,\sigma}^{T}.
$$

This formula is valid while

$$
r_{a,\sigma}(\lambda)\ge r_0>0.
$$

The shell margins are:

$$
\mathcal{M}_{\mathrm{same}}
=
\epsilon_{\mathrm{same}}
-
\sup_W
\max_a
\frac{|R_a-\bar R|}{\bar R},
$$

and, for an ordered nested shell braid,

$$
\mathcal{M}_{ab}^{R}
=
\inf_W
\frac{R_b-R_a}{\bar R}
-
\epsilon_R.
$$

A transition event is a zero of one of these margins with a declared transversality row:

$$
D_\tau\mathcal{M}_{\mathrm{same}}\ne0
\qquad\text{or}\qquad
D_\tau\mathcal{M}_{ab}^{R}\ne0
$$

for the branch-continuation tangent $\tau$.

---

## 4. Radial Support Residual Rows

The radial support functional emits the residual block

$$
\mathcal{R}_{\mathrm{shellR}}
=
\left(
\mathcal{R}_{\mathrm{conv}},
\mathcal{R}_{R\mathrm{def}},
\mathcal{R}_{R\mathrm{gap}},
\mathcal{R}_{R\mathrm{spread}},
\mathcal{R}_{R\mathrm{der}},
\mathcal{R}_{R\mathrm{mix}}
\right).
$$

The entries mean:

| Row | Meaning |
| --- | --- |
| $\mathcal{R}_{\mathrm{conv}}$ | declares arclength-mean, causal-time-mean, support-band midpoint, or interval-center convention |
| $\mathcal{R}_{R\mathrm{def}}$ | verifies every emitted $R_a$ equals $\mathcal{S}_a[\mathbf{Y},\nu,\mathcal{D}_{\mathrm{supp}}]$ |
| $\mathcal{R}_{R\mathrm{gap}}$ | nested shell gap rows $R_b-R_a$ with margins |
| $\mathcal{R}_{R\mathrm{spread}}$ | shell braid spread row using the declared radius convention |
| $\mathcal{R}_{R\mathrm{der}}$ | first and second derivative rows used by Newton, Krawczyk, event, and stability packets |
| $\mathcal{R}_{R\mathrm{mix}}$ | all terms introduced when a simplified shell equation drops radius-functional derivatives |

The nested shell braid dynamics shorthand

$$
\mathbf{x}_{a,\sigma}
=
\mathbf{C}+R_a\mathbf{U}_{a,\sigma}
$$

is allowed only as a local parametrization if $\mathcal{R}_{R\mathrm{def}}=0$ and the omitted terms in $\mathcal{R}_{R\mathrm{mix}}$ are bounded below tolerance. Otherwise the branch must use the direct curve acceleration row from the free-support packet.

---

## 5. Theorem Target

**Theorem target: nested shell braid radial support functional.** Fix one nested shell braid branch chart, one support descriptor, one shell-radius convention, one binary-partition notation policy, and one coefficient box. Suppose:

1. every site radius satisfies $r_{a,\sigma}\ge r_0>0$;
2. the radial support functional $\mathcal{S}_a$ is declared and used consistently for all $a$;
3. first and second variation formulas for $R_a$, $\bar R$, $G_{ab}^{R}$, and $S_a$ are emitted on the coefficient box;
4. nested shell, shell braid, or transition rows use the emitted margins rather than visual labels;
5. any simplified shell dynamics row either includes the induced radius-functional derivatives or places their omission in $\mathcal{R}_{R\mathrm{mix}}$ with a certified bound.

Then the radial support functional is a differentiable residual subblock of the bounded-speed branch certificate. The branch may be classified as nested shell braid, shell braid, or transition on that coefficient box without treating shell radii as primitive ontology.

Proof route:

1. the lower radius floor makes $r_{a,\sigma}$ smooth in curve and center variables;
2. differentiating the declared functional gives $D_vR_a$ and $D^2_{v,w}R_a$;
3. gap and spread rows are algebraic functions of $R_a$ and inherit differentiability;
4. positive shell margins persist on a small coefficient box by the derivative bounds;
5. transition events are exactly margin-zero events with a transversality row;
6. the residual $\mathcal{R}_{R\mathrm{mix}}$ prevents a simplified parametrization from hiding radial support dynamics.

---

## 6. Output Schema

A nested shell braid branch packet using shell radii must emit:

| Field | Required payload |
| --- | --- |
| `shell_radius_convention` | arclength mean, causal-time mean, support-band midpoint, or interval center |
| `support_descriptor` | $\mathbf{C}$, support bands, binary-partition labels, and radius floors |
| `shell_radius_values` | $R_a$, $\bar R$, $G_{ab}^{R}$, $S_a$, and interval bounds if used |
| `shell_radius_derivatives` | $D_vR_a$, $D^2_{v,w}R_a$, derivative bounds, and length/clock correction status |
| `shell_margins` | shell braid spread margin, nested shell gap margins, transition event surfaces, and transversality rows |
| `mixing_residual` | $\mathcal{R}_{R\mathrm{mix}}$ and every dropped radius-functional derivative term |
| `status` | first failed status or `nested-shell-swarm-radial-support-certified` |

Status ordering:

1. `shell-radius-convention-open`
2. `shell-radius-floor-failure`
3. `shell-radius-definition-mismatch`
4. `shell-radius-derivatives-open`
5. `radius-spread-row-open`
6. `radius-gap-row-open`
7. `radius-transition-transversality-open`
8. `radius-mix-residual-open`
9. `nested-shell-swarm-radial-support-certified`

Current status:

$$
\texttt{radial-support-functional-open},
\qquad
\texttt{not-retained}.
$$
