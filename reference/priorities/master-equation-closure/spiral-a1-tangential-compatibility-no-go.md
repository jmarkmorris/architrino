# Spiral A1 Tangential Compatibility No-Go

Status. Consumed proof packet for exact prescribed-curve tangential
compatibility of the A1 retained branch chart. This packet is now consumed by
[spiral_branch_chart_certificate.py](spiral_branch_chart_certificate.py), the
A1 interval sidecar/report, the priority queue, and the authored A1 benchmark
paragraph in [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md).

Claim level. Interval no-go for the constant-$\Omega$ prescribed A1 history at
the turn center $\theta_\ast=0$, under the same equal-magnitude isolated
opposite-polarity two-body normalization used by the A1 radial and tangential
drive packets. This is stronger than the negative weighted tangential-drive
row: the exact branch-force tangential component is required to vanish at the
turn center, and the retained A1 branch chart gives a strictly negative
pointwise residual there.

## Candidate History

The A1 candidate is the variable-pitch spiral
$$
r(\theta)=R_\ast\exp(a(1-\cos\theta)),
\qquad
p(\theta)=-\frac{r'(\theta)}{r(\theta)}=-a\sin\theta,
\qquad
t(\theta)=\frac{\theta}{\Omega},
$$
with
$$
a=a_{\mathrm{A1}}=0.204,
\qquad
b_\ast=\frac{7}{2},
\qquad
I_\ast=\left[-\frac{\pi}{6},\frac{\pi}{6}\right].
$$
At the turn center,
$$
p(0)=0,
\qquad
\dot\theta(0)=\Omega,
\qquad
\ddot\theta(0)=0,
\qquad
\dot r(0)=r'(0)\Omega=-p(0)r_\ast\Omega=0.
$$

## Exact Tangential Compatibility Condition

For a prescribed polar history
$$
\mathbf{x}(t)=r(t)\mathbf{e}_r(\theta(t)),
$$
the kinematic acceleration is
$$
\mathbf{a}_{\mathrm{kin}}
=
(\ddot r-r\dot\theta^2)\mathbf{e}_r
+
(r\ddot\theta+2\dot r\dot\theta)\mathbf{e}_\theta.
$$
Therefore the prescribed constant-$\Omega$ A1 history has
$$
a_{\theta,\mathrm{kin}}(0)
=
r_\ast\ddot\theta(0)+2\dot r(0)\dot\theta(0)
=0.
$$
At the same point the variable-pitch tangent frame satisfies
$$
\hat{\mathbf{T}}(0)
=
\frac{-p(0)\mathbf{e}_r+\mathbf{e}_\theta}{\sqrt{1+p(0)^2}}
=\mathbf{e}_\theta,
$$
so the force-side Frenet tangential projection used in
[master-equation.md](../../../content/markdown/aaa/dynamics/master-equation.md)
is exactly the polar tangential component at $\theta_\ast=0$.

Under the retained equal-magnitude branch normalization, the force-side
tangential component at the turn center is
$$
a_{T,\mathrm{force}}(0)
=
\frac{\kappa q_1^2}{r_\ast^2}
T_0(C_{\mathrm{A1}}),
$$
where
$$
T_0(C_{\mathrm{A1}})
\equiv
\sum_{P_i}
\frac{S_T^p(0,\Delta_{P_i})}{\Lambda_{p,i}^3 |J_{12,i}|}
+
\sum_{S_j}
\frac{S_T^s(0,\Delta_{S_j})}{\Lambda_{s,j}^3 |J_{11,j}|}.
$$
Because $\kappa q_1^2/r_\ast^2>0$, exact compatibility with the prescribed
constant-$\Omega$ history requires the pointwise balance
$$
T_0(C_{\mathrm{A1}})=0.
$$
The weighted drive condition
$$
D_T(I_\ast)<0
$$
is not a substitute for this pointwise balance: it proves net negative
weighted drive over the corridor, while exact prescribed-curve compatibility
requires zero tangential acceleration at the turn center.

At $\theta_\ast=0$, both tangential numerators reduce to
$$
S_T^p(0,\Delta)=S_T^s(0,\Delta)=\rho(0,\Delta)\sin\Delta.
$$
Thus the exact center residual is determined by the retained delayed-root
offsets and their Jacobian weights.

## A1 Center Residual Interval

Using the retained A1 active rows
$$
P_1=[2.55,2.69],
\qquad
P_2=[4.00,4.34],
\qquad
P_3=[6.78,7.12],
\qquad
S_1=[4.82,5.02],
$$
a read-only local import of
[spiral_branch_chart_certificate.py](spiral_branch_chart_certificate.py) with
`select_candidate("a1")` gives the following outward center enclosures at
$\theta_\ast=0$ with root pad $10^{-8}$:

| Label | $\Delta$ interval | Tangential contribution interval | $J$ interval |
| --- | ---: | ---: | ---: |
| $P_1$ | $[2.6459754351052864,2.645975455105287]$ | $[0.42022288212424147,0.42022297136573594]$ | $[3.8434172296227684,3.8434174798139584]$ |
| $P_2$ | $[4.145702914734943,4.1457029347349446]$ | $[-0.37906730687961343,-0.37906724575000506]$ | $[-1.8324468327625067,-1.8324466925008982]$ |
| $P_3$ | $[6.8374027371194845,6.837402757119486]$ | $[0.04551452486608856,0.045514528384792495]$ | $[1.5990335643769507,1.5990336140163282]$ |
| $S_1$ | $[4.898122153956867,4.898122173956868]$ | $[-0.09425600188735157,-0.09425599488732674]$ | $[4.492697981252946,4.492698075757034]$ |

The retained-chart pointwise tangential residual is therefore
$$
T_0(C_{\mathrm{A1}})
\in
[-0.007585901776635041,-0.007585740886803276].
$$
The interval excludes zero with negative upper endpoint
$$
T_0^+
=-0.007585740886803276<0.
$$
Equivalently,
$$
a_{T,\mathrm{force}}(0)
\in
\frac{\kappa q_1^2}{r_\ast^2}
[-0.007585901776635041,-0.007585740886803276],
$$
while the prescribed constant-$\Omega$ kinematics require
$$
a_{T,\mathrm{kin}}(0)=0.
$$

## Decision

The exact prescribed-curve tangential compatibility row fails for A1:
$$
a_{T,\mathrm{force}}(0)\ne a_{T,\mathrm{kin}}(0)
$$
on the retained branch chart. The failure is not merely diagnostic; the center
outward interval excludes zero using the same active labels, root-boundary
verification method, and positive active Jacobian support used by the A1
priority packets. The sampled report value
$$
T_0^{\mathrm{samp}}=-0.007585821332780289
$$
lies inside the interval and should be treated only as a diagnostic check.

This does not reject every nearby non-circular spiral history. It rejects the
stronger claim that the retained A1 constant-$\Omega$ prescribed history is an
exact isolated bare two-body solution at the turn center. A compatible
variable-angular-rate history would have to satisfy
$$
r_\ast\ddot\theta(0)=a_{T,\mathrm{force}}(0),
$$
because $\dot r(0)=0$. Thus the retained branch chart would require a negative
angular acceleration at the turn center, or an additional positive tangential
contribution from structure outside the isolated two-body A1 ansatz.

## Relation To Existing Rows

The existing A1 weighted tangential-drive row remains true:
$$
D_T(I_\ast)
\in[-0.0015572472070875527,-0.00023480430280344085].
$$
That row proves a negative weighted integral and can still be useful as a drive
diagnostic. It is weaker than exact prescribed-curve compatibility in the
specific sense needed here: a closed prescribed branch at fixed angular rate
needs $T_0(C_{\mathrm{A1}})=0$, not merely $D_T(I_\ast)<0$.

The radial row has been resolved by
[spiral-a1-kinematic-gamma-closure](spiral-a1-kinematic-gamma-closure.md):
$$
\Gamma\in[0.007531050241046427,\ 0.007531144882881889],
$$
with
$$
B_r(C_{\mathrm{A1}};0)=(a_{\mathrm{A1}}-1)\Gamma.
$$
Thus the combined A1 verdict is no longer radial-blocked. The radial row passes
for the prescribed constant-$\Omega$ history, and the exact tangential
compatibility row supplies the theorem-grade rejection.

## Promotion Decision

Promoted. The mathematical result is recorded as a proof packet and promoted
into the A1 benchmark paragraph in `content/markdown/aaa`. The promoted wording
distinguishes:

1. negative weighted tangential drive, which A1 passes;
2. exact prescribed-curve tangential compatibility at $\theta_\ast=0$, which
   A1 fails for constant $\Omega$;
3. possible continuation to a variable-angular-rate or externally supplemented
   history, with the local variable-angular-rate target now stated separately in
   [spiral-a1-variable-rate-turn-target](spiral-a1-variable-rate-turn-target.md).
