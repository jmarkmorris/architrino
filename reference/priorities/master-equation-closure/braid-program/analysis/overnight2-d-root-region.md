# A complete ordinary-root region for the early eight-member history

## Conditional theorem and its purpose

The signed finite-history comparison needs an admitted root throughout every receiver translation, not just at the nominal endpoints. On a complete reference whose speed is uniformly below one, that admission follows from a simple global bound. The theorem below applies to the original inclusive-ceiling scenario with $K=c_f=c_a=1$, original partner weights and zero self acceleration. It is conditional on a proposed history neighborhood; it does not establish that the original solution belongs to that neighborhood.

Let every reference source path $\mathbf x_j(s)$ be defined for all $s\le T$, continuous at zero, piecewise continuously differentiable, and globally $L$-Lipschitz with $L<1$. Velocity may have its prescribed jump at zero. Assume the present reference separations satisfy $|\mathbf x_i(t)-\mathbf x_j(t)|\ge d>0$ for every distinct pair and every $0\le t\le T$. Fix bounds $P<d$ and $Z<1-L$ on the receiver translation and independent source-velocity addition in the reviewed row homotopy.

Then every translated partner channel has exactly one positive-delay root, throughout $|\mathbf p|\le P$, and every such root obeys

$$
\tau\ge\frac{d-P}{1+L},\qquad
\gamma=1-\mathbf n\cdot\dot{\mathbf x}_j(s)\ge1-L,\qquad
D=1-\mathbf n\cdot(\dot{\mathbf x}_j(s)+\mathbf z)\ge1-L-Z.
$$

These inequalities hold on each smooth piece and for both velocity traces at a jump. They supply complete root admission and positive coefficient denominators. They do not bound the variation of derivative matrices across source knots or replace the kick correction.

## Proof by monotonicity and two triangle inequalities

For fixed reception $t$ and translation $\mathbf p$, write $\mathbf y=\mathbf x_i(t)+\mathbf p$ and define

$$
F(\tau)=\tau-|\mathbf y-\mathbf x_j(t-\tau)|,\qquad \tau\ge0.
$$

For $\tau_2>\tau_1$, the reverse triangle inequality and the source Lipschitz bound give

$$
F(\tau_2)-F(\tau_1)\ge(1-L)(\tau_2-\tau_1)>0.
$$

Thus $F$ is strictly increasing even across derivative discontinuities. Put $d_0=|\mathbf y-\mathbf x_j(t)|\ge d-P>0$. Then $F(0)=-d_0<0$ and $F(\tau)\ge(1-L)\tau-d_0$ tends to infinity. Continuity yields exactly one zero. At that zero, comparing the delayed source position with its current position gives

$$
d_0-L\tau\le\tau\le d_0+L\tau,
\qquad
\frac{d_0}{1+L}\le\tau\le\frac{d_0}{1-L}.
$$

This proves the delay floor and uniqueness without a sampled root search or a truncated source history. The factor floors follow from the unit normal and the speed/addition bounds. The root displacement under a translation satisfies $|s(\mathbf p)-s(0)|\le|\mathbf p|/(1-L)$, either by integrating the smooth implicit derivative piecewise or directly using the strict monotonicity estimate and the perturbation of $F$.

## Consequence for any exact history within the proposed tube

Suppose an exact compatible history has position error at most $\epsilon_x$ and velocity error at most $\epsilon_v$ relative to the reference on $[0,T]$, while retaining its original complete prescribed negative past. Suppose that negative past also has speed at most $L$. Set $L_*=L+\epsilon_v<1$ and assume $2\epsilon_x<d$. Its current pair separations are at least $d-2\epsilon_x$. The same proof applied to its exact sources yields one partner root and

$$
\tau_{\mathrm{exact}}\ge\frac{d-2\epsilon_x}{1+L_*},\qquad
D_r,D_t\ge1-L_*>0.
$$

Almost everywhere on each ordinary branch its source clock satisfies

$$
\frac{dS}{dt}=\frac{D_r}{D_t}\ge\frac{1-L_*}{1+L_*}>0.
$$

The positive one-sided bounds at prescribed jumps give transverse passage there as well. A source clock cannot freeze at an ordinary interpolation knot within this region. This does not select the ordering of different channels' crossings or eliminate the finite error produced when their crossing times differ.

The strict-interior speed follows from $|\mathbf V_i|\le L_*<1$, so the ceiling reaction vanishes throughout this proposed early-history tube. Original negative-time exact velocities have the rigid speed $r_j|\omega|$; a constant position translation used only for the reference join does not alter that speed. Initialization and actual tube membership remain separate. The root theorem supplies one component of a simultaneous finite-history bootstrap, not the bootstrap itself.

## Interval instrument and arithmetic boundary

The [root-region instrument](overnight2-d-root-region.py) imports only the frozen outward-interval primitives, not an evolution or root solver. It treats stored binary64 history nodes and literal rigid parameters as exact encodings. On every whole or endpoint-clipped Hermite segment it encloses the midpoint position and velocity, bounds affine acceleration by its endpoint norms, and uses those bounds to enclose all positions and velocities on the segment. Present pair separation is bounded below by the midpoint difference norm minus both position excursion radii. Complete negative-time speed is bounded by interval multiplication of $r_j|\omega|$.

It uses the previously stated finite IEEE binary64 elementary-operation contract with adjacent-float outward inflation and verified square-root brackets. The unchanged primitive's rational arithmetic, square-root, linear/cubic whole-segment and other analytical controls ran first. New collinear constant-speed controls attain the two delay endpoints $d_0/(1\pm L)$, checking the range inequality orientation. Target execution and its measured bounds will be recorded in the main report; this note asserts no unrun target result.

For the primary test the proposed neighborhood has $\epsilon_x=0.1$, $\epsilon_v=0.001$, $P=0.2$, $Z=0.001$, over the full prefix through time 67. The value 67 reaches the earliest old-source cutoff of the tail test; it does not cover that test's entire required finite history through its much later entry time. Later ceiling phases need their own comparison and root treatment. A successful prefix certificate therefore cannot establish complete escape by itself.

## Falsifiers and remaining obligations

The theorem would fail if a complete continuous $L$-Lipschitz source with $L<1$ and positive translated present separation had zero, multiple, or smaller-than-bounded positive-delay roots. An incorrect interval speed/separation bound would invalidate its numerical application. A loss of actual tube membership would remove its premise, not refute the conditional theorem. The remaining admission work is to bound residual transport and all source-time/event/knot corrections, initialize the exact preparation, prove the tube and continue through the rest of the finite history required by the tail theorem.
