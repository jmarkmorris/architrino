# A finite-duration residual bound near the excluded spatial family

## Statement and causal domain

The independently accepted [smooth functional transfer](overnight2-b-independent-superwake-functional-transfer.md) excludes exact balance on an unbounded future. Its long-time argument can be strengthened because the planar integration boundary term is the radial product $\rho\dot\rho$, which is uniformly small throughout the selected neighborhood. The following derived subject proposes a strictly positive full-equation residual over just one reference deformation cycle. Independent analytical reconstruction is pending.

Retain the canonical scenario $K=c_f=1$, every positive-delay partner and self root, and absolute source divisors. Fix
$$
H\in[1/20,1/9],\qquad \beta\in[73/40,457/250],\qquad \kappa\in[1/2,3],\qquad R>0.
$$
In normalized time $\tau=t/R$, let the reference height be
$$
z_0(\tau)=H\left(\cos\kappa\tau-\frac18\sin3\kappa\tau\right),
$$
and let actual normalized member $\ell$ be
$$
x_\ell(\tau)=\bigl(\rho\cos(\beta\tau+p+\ell\pi/3),\rho\sin(\beta\tau+p+\ell\pi/3),(-1)^\ell z\bigr).
$$
The functions $\rho,p,z$ are complete $C^2$ histories, with $p$ a globally chosen real correction. They need not be periodic. Choose any normalized reception interval $J=[a,b]$ of length
$$
T=b-a=\frac{2\pi}{\kappa}>1.
$$
Assume the following nine absolute scalar bounds hold for every $\tau\le b$:
$$
|\rho-1|,\ |\dot\rho|,\ |\ddot\rho|,\ |p|,\ |\dot p|,\ |\ddot p|,
\ |z-z_0|,\ |\dot z-\dot z_0|,\ |\ddot z-\ddot z_0|
\le\eta,\qquad
0\le\eta\le\frac1{30000000000}. \tag{1}
$$
Dots denote normalized-time derivatives. No norm or exactness condition is required after $b$. The entire past is constrained by (1), so an older unbounded source excursion cannot add an unaccounted causal root.

Let $A_\ell$ be the complete dimensionless canonical acceleration sum. The normalized equation residual is
$$
E_\ell(\tau)=R\ddot x_\ell(\tau)-A_\ell(\tau).
$$
The proposed conclusion, already for member zero, is
$$
\boxed{\sup_{\tau\in J}|E_0(\tau)|>\frac1{400}.} \tag{2}
$$
Thus no history in this neighborhood can satisfy the exact canonical equation throughout a whole reference cycle, at any positive scale. The physical acceleration residual is $E_0/R^2$; (2) is a normalized residual bound and does not assert a scale-independent physical acceleration error.

## Previously accepted bounds and their finite-time use

The independent functional-chart theorem and functional-transfer proof establish, for all these histories,
$$
7/20<d<2,\qquad |D|>1/20,\qquad \text{source counts }(1,3,1,1,1,1),
$$
and
$$
|A_0|\le M:=\frac{64000}{49},\qquad
|A_t-A_t^0|<73000000\eta,\qquad
|L_t|\le5\eta. \tag{3}
$$
Here $L_t$ is the tangential component of $\ddot x_0$, and the two tangential accelerations use their respective actual and reference bases. At $\eta=0$ the differences and $L_t$ vanish exactly; the displayed strict difference estimate is understood as equality zero in that case.

These estimates require only receiving and earlier path values. At a reception $\tau\le b$, every source time is $\tau-d<\tau\le b$. The complete past supplies the position, velocity and acceleration bounds used by the geometric guards and Cartesian interpolation. Restricting the reception set to $J$ therefore leaves every proof step valid. No future continuation inside the neighborhood is needed. The accepted eight-root chart ensures $A_0$ is continuous on $J$; finite $C^2$ kinematics then make the residual continuous and its supremum finite.

For the actual planar coordinate $Y=\rho e^{i(\beta\tau+p)}$, the same admitted bounds give
$$
|Y|\le B:=\frac{1001}{1000},\qquad
|\dot Y|\ge v_*:=\frac{363}{200},\qquad
Y\cdot\dot Y=\rho\dot\rho,\qquad
|Y\cdot\dot Y|\le B\eta. \tag{4}
$$
The last two identities expose the small boundary term. Bounding it merely by $|Y||\dot Y|$ would lose this information.

The independent 624-leaf torque cover also supplies a common margin $m>1/200$. For each fixed reference parameter triple at least one deciding phase from $0,\pi/2,\pi/4,3\pi/4$ has $|A_t^0|\ge m$. Every interval of length $2\pi/\kappa$ contains a reception with that phase modulo $2\pi$. The reference scalar geometry repeats, so the same margin applies there even when actual perturbations are aperiodic.

## Scale estimate allowing a nonzero residual

Put
$$
\epsilon=\sup_{\tau\in J}|E_0(\tau)|\ge0.
$$
The planar residual equation is $R\ddot Y=A_p+E_p$. Dot with $Y$, integrate by parts on $J$, and use (3)–(4):
$$
\frac R T\int_a^b|\dot Y|^2\,d\tau
=-\frac1T\int_a^bY\cdot(A_p+E_p)\,d\tau+
\frac R T[Y\cdot\dot Y]_a^b
\le B(M+\epsilon)+\frac{2RB\eta}{T}.
$$
Consequently
$$
R\left(v_*^2-\frac{2B\eta}{T}\right)\le B(M+\epsilon). \tag{5}
$$
Since $T>1$ and $\eta\le1/2000$, the coefficient in parentheses exceeds
$$
C:=v_*^2-\frac B{1000}
=\frac{411653}{125000}>0.
$$
The exact rational comparison
$$
\frac BC=\frac{125125}{411653}<\frac{61}{200}
$$
follows from $25025000<25110833$. Therefore (5) gives
$$
R<\frac{61}{200}(M+\epsilon)
=\frac{19520}{49}+\frac{61}{200}\epsilon
<400+\frac{\epsilon}{3}. \tag{6}
$$
This uses neither exactness nor a convergent time average, and the interval is finite. The bound is an inequality for the fixed proposed scale $R$ and the actual residual of that history.

## A uniform residual cannot be too small

At a deciding reference reception in $J$, project the residual onto the actual tangential direction. From (3) and (6),
$$
\epsilon\ge |RL_t-A_t|
\ge m-73000000\eta-5R\eta
\ge m-73002000\eta-\frac53\eta\epsilon.
$$
Weak inequalities suffice here; the accepted strict margin $m>1/200$ will make the final conclusion strict. Thus
$$
\boxed{\epsilon\ge
\frac{m-73002000\eta}{1+5\eta/3}.} \tag{7}
$$
For every allowed $\eta$, this is strictly larger than $1/400$. One exact arithmetic check at the largest tolerance is enough:
$$
\frac1{200}-\frac{73002000}{30000000000}
>
\frac1{400}\left(1+\frac{5}{90000000000}\right).
$$
After multiplication by positive denominators the comparison reduces to
$$
90000000000>87602400005.
$$
The numerator in (7) decreases and its positive denominator increases with $\eta$, so the endpoint is the weakest permitted bound. At $\eta=0$, (7) gives $\epsilon\ge m>1/200$ directly. This proves (2).

## Interpretation and verification boundary

The result prohibits staying within the specified complete-history neighborhood for a full reference cycle while satisfying the exact canonical equation on that cycle. It does not establish existence of an actual solution, specify which norm it would leave, prove a later fate, or supply continuation through a nonordinary event. The physical duration is $2\pi R/\kappa$. A short near-match before a full cycle, a history whose older past violates (1), or a profile outside the tiny declared neighborhood is outside this conclusion.

The evidence dependencies remain frozen: the independent functional chart proves completeness and ordinariness; the independent torque cover supplies the measured continuous margin; the independently reconstructed functional transfer supplies causal sensitivity estimates. The new step is the finite-interval boundary identity and a residual-aware scale estimate, proved analytically above. No new numerical target is needed.

Independent review must check the causal restriction to $\tau\le b$, the actual tangential-basis comparison, the rational value of $C$, every inequality leading to (6), the residual sign in the integration identity, and the deciding-phase recurrence on an arbitrary closed interval of length $2\pi/\kappa$. A history satisfying every premise with normalized supremum residual at most $1/400$ would directly refute the conclusion. Shared interval-library assumptions in the accepted margin remain unchanged.

Parent integration belongs in [the current research account](overnight2-b-followup-and-research-2026-10-07.md). Frozen earlier subjects and reviews are not rewritten to claim this stronger finite-duration result.
