# A single-reception obstruction near two finite-amplitude proposals

## Mathematical statement and scope

Consider the canonical six-member alternating-polarity class with normalized wake speed and kernel coefficient both one. Write dimensionless time as $\tau=t/R$, deformation phase as $\phi=\kappa\tau$, and the six paths as

$$
\mathbf X_j(t)=R\bigl(\rho(\phi)\cos(\beta\tau+j\pi/3+p(\phi)),\rho(\phi)\sin(\beta\tau+j\pi/3+p(\phi)),(-1)^jz(\phi)\bigr).
$$

All ordinary positive-delay partner and self roots contribute. No receiver factor, speed ceiling or event rule is selected. The waveform family is

$$
\begin{aligned}
\rho&=1+a_2\cos2\phi+b_2\sin2\phi+a_4\cos4\phi+b_4\sin4\phi,\\
p&=(C_2\cos2\phi+D_2\sin2\phi+C_4\cos4\phi+D_4\sin4\phi)/\kappa,\\
z&=H\cos\phi+e_3\cos3\phi+f_3\sin3\phi+e_5\cos5\phi+f_5\sin5\phi.
\end{aligned}
$$

The two closed boxes independently vary $H$ and the fourteen coefficients in the order $(a_2,b_2,C_2,D_2,e_3,f_3,\beta,\kappa,a_4,b_4,C_4,D_4,e_5,f_5)$ by at most $2^{-20}$ about the exact decimal literals recorded in the target receipt. Their centers are the height-0.1 and height-0.25 retained proposals of the [higher-harmonic instrument](overnight2-b-superwake-harmonic-search.py). The receipt reproduces every defining literal and rational endpoint; binary floating-point centers do not define the boxes.

**Measured subject finding:** the [interval instrument](overnight2-b-superwake-determinant.py) certifies a complete ordinary causal-root census at $\phi=0$ for every point in either box and a strictly negative determinant $A_rL_z-A_zL_r$. Here $\mathbf A$ is the dimensionless canonical acceleration sum and $\mathbf L$ is the kinematic acceleration demand. Consequently neither box contains an exact member at any $R>0$. Independent reconstruction is pending. No complete-period ordinary chart, global-family exclusion, stability result or exact spatial reference follows.

## Why one reception is sufficient

In the receiving cylindrical basis, the demanded acceleration is

$$
\mathbf L=\bigl(\kappa^2\rho''-\rho(\beta+\kappa p')^2,\;2\kappa\rho'(\beta+\kappa p')+\rho\kappa^2p'',\;\kappa^2z''\bigr).
$$

The physical demand is $\mathbf L/R$ and the canonical sum is $\mathbf A/R^2$. Exact balance therefore requires $R\mathbf L=\mathbf A$ at every phase. The radial and axial equations imply $A_rL_z-A_zL_r=0$, independently of whether either demand component vanishes. A nonzero determinant at one reception disproves balance at every common scale.

For delay $\delta>0$, define the source angle relative to the receiver at phase zero by $\alpha_j=j\pi/3-\beta\delta+p(-\kappa\delta)-p(0)$, and let $s_j=(-1)^j$. Then

$$
\mathbf Q_j=(\rho(0)-\rho(-\kappa\delta)\cos\alpha_j,-\rho(-\kappa\delta)\sin\alpha_j,z(0)-s_jz(-\kappa\delta)).
$$

If $\mathbf V_j$ is the differentiated source path in this fixed receiving basis, the squared causal gap and its delay derivative are

$$
G_j=|\mathbf Q_j|^2-\delta^2,\qquad \partial_\delta G_j=2\mathbf Q_j\cdot\mathbf V_j-2\delta.
$$

At a root, $D_j=1-\mathbf Q_j\cdot\mathbf V_j/\delta$ and $\partial_\delta G_j=-2\delta D_j$. Each contribution is $s_j\mathbf Q_j/(\delta^3|D_j|)$. The absolute divisor is essential above wake speed.

## Completeness of the single-reception census

A recent interval $(0,1/100]$ is removed analytically, not by an unchecked numerical cutoff. With a uniform speed lower bound $v_-$ and acceleration norm upper bound $M$, the self chord divided by delay is at least $v_- - M\delta/2>1$. This follows by integrating the difference between source velocity and its reception value. For a partner, the simultaneous planar separation is at least the common radius lower bound $r_-$; a source speed upper bound $v_+$ gives $|\mathbf Q_j|-\delta\ge r_--(v_++1)\delta>0$. Both strict margins are stored in the receipt.

All paths stay within a ball of radius $\sqrt{r_+^2+z_+^2}$. No root can exceed twice that radius. The numerical domain ends a further $1/100$ beyond its outward-rounded upper bound, so the remote complement is covered geometrically.

Floating roots from the frozen proposal evaluator supply bracket guesses only. Each protected bracket is independently required to have opposite uniform endpoint signs and a uniform nonzero gap derivative. The intermediate-value theorem and strict monotonicity then give exactly one root for every parameter vector. Inclusive interval Newton contractions enclose that root uniformly in the coefficient box. Every interval between protected brackets is recursively covered either by a gap interval that omits zero, or by a nonzero derivative and same-sign endpoint gaps. The near, protected, complementary and remote pieces exhaust every positive delay. Thus omitted or spurious floating guesses cannot produce a passing certificate.

The resulting source-count vector is $(1,3,1,1,1,1)$ in each box, including the positive self root at source zero. All stored divisor intervals omit zero. Interval evaluation of the complete sum and demanded acceleration then excludes zero from the determinant.

## Controls, resources and evidence

The first known invocation failed on a missing `math` import before any target. Its preparation source is retained in the task scratch directory. After the import repair, the known stage passed the five analytically known static partner-root censuses, static alternating-ring acceleration $-5/4+1/\sqrt3$, zero transverse components, the exact diametric gap derivative, and separately specified waveform derivative values. The successful known receipt predates both pilot and target.

The one-box pilot measured 0.796489 internal seconds, 0.903 supervised seconds and 79,773,696 bytes peak RSS. Its 61 complementary leaves and determinant passed. That measured cost supported the unchanged two-box allocation: 120 internal seconds, 180 supervisor seconds, 512 MiB, sixteen MiB per receipt and one numerical thread. The target measured 1.397052 internal seconds, 1.506 supervised seconds and 80,166,912 bytes peak RSS, with 127 complementary leaves across both boxes and no failure or pending box. Both supervisors closed with exit zero, zero stderr and closed process groups.

Local receipts live under `.local-data/master-equation-closure/overnight2-b/superwake-determinant/`; these retained local artifacts are not public CI dependencies. The tracked instrument provides reproduction using the shared repository venv and its frozen proposal/input dependencies. All old artifacts and failed/inconclusive evidence remain unchanged. No remote backup or archive-recovery claim is made.

| Artifact | SHA-256 |
| --- | --- |
| Subject instrument | `2050ae06ece7a6e0ba5172c83ab2354be9ddf68fa3e5870f233e00c47ed4f4a3` |
| Known receipt | `8eed24cdc9de313c30692a5b066a00c3bb5716bfaff44c02184492486e7bb655` |
| Pilot receipt | `99081c9b3607a9b598880023e1ff5d4f22c1b5a622fa0331199d4791be7c918d` |
| Target receipt | `7b99be2a4e9338e705b40c53c87da3a433306251470b151a0d478682f19bef7f` |
| Frozen proposal instrument | `8523e295cca3c44c2fb0a36ed7bee27c94c63b4f1e510c4047689b8bc32e56b1` |
| Frozen proposal target | `539e3603aa6454c9d77379c94d2aae74384e90a4599d1d7af92ec81cba53efa3` |

The arithmetic boundary is mpmath interval arithmetic at 55 decimal digits; this is not a formal proof assistant certificate. A counterexample to a guard, root/complement cover, waveform derivative, interval enclosure or the scale identity would overturn the corresponding claim. Independent review must reconstruct the geometry and census without importing the subject implementation. The parent owns integration into [the current research account](overnight2-b-followup-and-research-2026-10-07.md).
