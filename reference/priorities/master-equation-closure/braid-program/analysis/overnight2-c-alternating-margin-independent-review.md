# Independent reconstruction of the alternating-sector residual margin

## Verdict and discharged certificate premise

**Derived verdict:** the [frozen alternating residual-margin theorem](overnight2-c-alternating-residual-margin.md) is correct for arbitrary distinct-member alternating equal-radius configurations in the selected logarithmic three-neutral-antipodal-pair class. Its speed-certificate premises are already satisfied by the completed independent certificate. No defect was found.

With common radius $a>0$, common speed $0\le v\le1$, $K_{\log}=c_f=1$, unchanged transmitter factor, and complete circular histories, the maximum absolute component of the six positive-receiver balance residuals is at least

$$
\frac{23}{6400a}.
$$

For $9/16\le v\le1$, some positive receiver has $A_{i,t}>9/(100a)$, which implies the subject's weaker displayed non-strict bound. For $0\le v\le9/16$, every positive receiver has $F_{i,r}=A_{i,r}+v^2/a\le-23/(6400a)$. These are statements about arbitrary configurations in this sector; no exact-balance hypothesis is used to derive the margins. No new numerical target was run.

The completed full receipt was reread with `jq` and retained the global lower bound $S\ge0.466441426429203602$. This exceeds $9/50$ by the exact positive rational amount

$$
\frac{466441426429203602-180000000000000000}{10^{18}}
=\frac{286441426429203602}{10^{18}}>0.
$$

The same receipt retains $Q_v'(\pi/2)\ge0.058906929447920082>0$ on all 448 closed cells covering $[9/16,1]$. Its SHA-256 remains `cdc6c3a32427fbd15f6f3e62d95e0c9e13866f3fdb6515086e790ef849caa48a` by a fresh `shasum -a 256` read. Thus the stronger numerical premise is discharged by exact comparison with a saved certified lower bound, without rerunning the certificate.

## Independent own-antipode estimate

At present clockwise separation $\pi$, let $\alpha$ be the unique complete chart root of $H_v(\alpha)=\pi$, where $H_v(\alpha)=\alpha-2v\sin(\alpha/2)$. For $v>0$, $H_v(\pi)=\pi-2v<\pi$, so $\pi<\alpha<2\pi$. Integrating $H_v'=D\le1+v$ from $\pi$ to $\alpha$ gives

$$
2v=H_v(\alpha)-H_v(\pi)
\le(1+v)(\alpha-\pi),\qquad
\alpha-\pi\ge\frac{2v}{1+v}.
$$

The function $2v/(1+v)$ increases because its derivative is $2/(1+v)^2>0$. At $v=9/16$ its value is $18/25$. Writing $z=(\alpha-\pi)/2\in(0,\pi/2)$, it follows throughout the high-speed range that $z\ge9/25$. The tangent inequality follows directly by integrating $d(\tan z-z)/dz=\tan^2z\ge0$ from zero. Consequently

$$
-B_v(\pi)=\frac{-\cot(\alpha/2)}D
=\frac{\tan z}{D}
\ge\frac{z}{2}\ge\frac9{50},
$$

using the actual positive source factor $D\le1+v\le2$. The angle domain makes the tangent finite and positive. Every inequality concerns the original own-antipode causal root; no substitute response or angle was introduced.

## Cyclic crossing and a positive tangential component

The independently proved strict convexity and endpoint divergence give $Q_v$ one minimum $m_v$. The certified derivative sign at $\pi/2$ gives $m_v<\pi/2$. For any alternating complementary gaps $x_i>0$ with $x_1+x_2+x_3=\pi$, complete source summation gives

$$
T_i:=2aA_{i,t}
=Q_v(\pi-x_{i-1})-Q_v(x_i)-B_v(\pi).
$$

This formula remains true without any balance assumption. Since $\pi-x_{i-1}=x_i+x_{i+1}>x_i$, a gap $x_i\ge m_v$ places both arguments on the increasing side, with strictly different values. Therefore $T_i>-B_v(\pi)\ge9/50$ in this first case, including when $x_i=m_v$ exactly.

In the other case all three gaps lie below $m_v$. Their average is $h=\pi/3$, so necessarily $h<m_v$. There is a cyclic index with $x_{i-1}\le h\le x_i$. To prove this independently, if all gaps equal $h$, any index works. Otherwise their fixed mean forces at least one gap below $h$ and at least one above $h$. Start at a below-average gap and move forward around the finite cycle until first reaching a gap at least $h$; its predecessor is below $h$. This constructs the desired transition even if an intermediate gap equals the average. No assumption about the order of the three magnitudes is needed.

For that index, $h\le x_i<m_v$ lies on the decreasing branch of $Q_v$, while $\pi-x_{i-1}\ge2\pi/3>m_v$ lies on its increasing branch. Thus

$$
-Q_v(x_i)\ge-Q_v(\pi/3),\qquad
Q_v(\pi-x_{i-1})\ge Q_v(2\pi/3).
$$

Adding gives

$$
T_i\ge Q_v(2\pi/3)-Q_v(\pi/3)-B_v(\pi)=S(v)>9/50.
$$

The identity on the right follows by expanding the pair functions:

$$
Q_v(2\pi/3)-Q_v(\pi/3)-B_v(\pi)
=-B_v(\pi/3)+B_v(2\pi/3)-B_v(\pi)+B_v(4\pi/3)-B_v(5\pi/3).
$$

This is precisely the complete five-row signed sum at a regular alternating positive receiver. It is used as a comparison value; the arbitrary gaps were not assumed or proved regular. Both exhaustive cases give $T_i>9/50$, hence $A_{i,t}>9/(100a)$ for some positive receiver.

As a hand check on the crossing logic, the nonconstant triple $(\pi/4,\pi/3,5\pi/12)$ has the required transition through an equal-average gap, while the constant triple uses equality on both comparison arguments. This checks the combinatorial assertion independently of any minimum location; applicability of the decreasing-branch comparison still requires the separately stated all-gaps-below-$m_v$ case.

## Independent low-speed radial bound

At a positive receiver in any alternating cyclic arrangement, the five clockwise partner signs are $-,+,-,+,-$. For $v>0$, strict decrease of $R_v$ gives

$$
2aA_{i,r}=-(R_1-R_2)-(R_3-R_4)-R_5<-R_5<-\frac1{1+v}.
$$

The last inequality follows from the interior emission angle: $D<1+v$, so $R_5>1/(1+v)$. Adding the prescribed circular term yields

$$
aF_{i,r}<f(v):=v^2-\frac1{2(1+v)}.
$$

The derivative $f'(v)=2v+1/[2(1+v)^2]$ is positive for every $v\ge0$. Its value at the upper endpoint of the low-speed interval is the exact rational number

$$
f(9/16)=\frac{81}{256}-\frac8{25}
=\frac{2025-2048}{6400}=-\frac{23}{6400}.
$$

Thus the claimed upper bound holds for every positive receiver and every $0<v\le9/16$. At $v=0$, the static chart gives $R_0=1$, and the complete signed radial sum is $-1/(2a)$; this directly satisfies the same bound without pretending that $R_0$ is strictly decreasing. The shared endpoint $v=9/16$ is covered by both arguments, with no interval gap.

Since $9/100=576/6400>23/6400$, the low-speed radial margin and high-speed tangential margin combine to the claimed lower bound on the maximum absolute component. The factor $a$ has been preserved throughout; this is a scale-covariant bound proportional to $1/a$, not a radius-independent acceleration floor.

## Complete roots, scope, and falsifiers

The formulas use the unchanged complete angle chart. For every distinct simultaneous partner at $0\le v\le1$, it provides exactly one positive ordinary root, with no positive self roots. At each positive receiver the two other neutral pairs supply four rows and its own antipode supplies the fifth; half-turn polarity symmetry supplies the other fifteen directed rows. The complete census is therefore thirty partner and zero self roots, including both speed endpoints. No finite history, missing source, radial-balance assumption, or tangential-balance assumption enters the margin proof.

A cyclic triple failing the proved crossing assertion, a wrong sign on either monotone branch, an own-antipode factor or angle violating its bound, or a complete alternating residual smaller than the stated maximum-component margin would falsify the corresponding conclusion. Failure of the previously checked paired convexity or interval certificate would separately reopen the high-speed premise. The saved full lower bound is strictly above $9/50$; positivity alone without that quantitative comparison would not have sufficed.

This review supplies no unequal-radius margin, nonalternating-sector claim beyond its existing separate results, or stability statement. It also does not quantify a neighborhood under changing radii; any such extension needs a separate derivative or continuity argument with a declared domain.

## Provenance and execution

The frozen subject SHA-256 measured with `shasum -a 256` was `e1b77ba12e76ab6f68af3a805c18fd94d9c59ab69611acd426c551069e1800b9`. The only receipt access was a read of the already completed full certificate and its digest. All new comparisons and the cyclic proof above are hand-derived; no numerical target, grid, or process was rerun or launched.

Only this new independent-review Markdown file was written. The subject, certificate sources and receipts, main report, old reviews, shared owners, and other agents' files were preserved. The live clock returned 2026-10-07 07:44:59 UTC at review start; the unchanged allocation retains launch 03:25:15 UTC, exploration stop 13:55:15 UTC, and hard deadline 15:25:15 UTC. This completes the assigned bounded review. The parent owns integration.
