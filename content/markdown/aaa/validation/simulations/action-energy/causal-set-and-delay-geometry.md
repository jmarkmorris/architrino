# Causal set and delay geometry

An [architrino](../../../foundations/architrino.md) emits causal wake surfaces that expand from its emission positions at the fixed speed $c_f>0$. Let $o$ label the transmitter and $o'$ the receiver, with paths $\mathbf X_o(T)$ and $\mathbf X_{o'}(T)$ in the Euclidean void, parametrized by absolute time $T$. At a fixed reception time $T_r$, the kinematic causal set contains the earlier emission times $T_t$ whose wake surfaces reach the receiver:

$$
\mathcal{C}_o(T_r)
=
\big\{\,T_t<T_r\mid \|\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)\|=c_f(T_r-T_t)\,\big\}.
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-9435e7c724a2ce9d)

Here $\|\cdot\|$ is Euclidean distance, and the receiver label is suppressed in $\mathcal C_o$. A finite retained history restricts this set to the declared searched interval; an empty set on that interval says nothing about omitted history. Numerical instantiations use $c_f=1$, while the symbolic equations retain its dependence.

Membership nominates a candidate root. An ordinary acceleration contribution additionally requires the [Master Equation's branch conditions](../../../dynamics/master-equation.md#conventions-and-exclusions): positive delay and controlled separation, a nonzero transmitter-side root derivative with controlled acceleration weight, complete active-root accounting and exclusions for inactive roots, and the applicable self-hit and event conditions. A degenerate root or an interval of roots cannot be inserted into an ordinary finite branch sum. This chapter derives kinematic facts; it does not certify a complete acceleration ledger or its evolution.

The term `causal set` here means only this delayed interaction set in absolute time and the Euclidean void. It does not establish the recovery of an observer-level causal order or metric. Those remain separate derivation targets.

## Geometry of Delay and Roots

Define the delay $\Delta=T_r-T_t$, the separation $r=\|\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)\|$, and the root function $F(T_t;T_r)=r-c_f\Delta$. A causal root satisfies $F=0$ with $\Delta>0$. The receiver lies on the forward causal wake surface of radius $c_f\Delta$ centered at the transmitter's emission position $\mathbf X_o(T_t)$. Equivalently, the emission position lies on a backward sphere of the same radius centered at the receiver's reception position. The latter is a geometric way to search the history; the wake itself expands from the emission position.

### Local Branches and Root Existence

Suppose both paths are $C^1$, meaning continuously differentiable, near a specified positive-delay root $(T_{t,*},T_{r,*})$. At positive range define the unit direction $\hat{\mathbf r}=(\mathbf X_{o'}(T_r)-\mathbf X_o(T_t))/r$ and the transmitter velocity $\mathbf V_o=d\mathbf X_o/dT$. Differentiation gives $D_t\equiv\partial_{T_t}F=c_f-\hat{\mathbf r}\cdot\mathbf V_o(T_t)$. A root is simple, or transverse, when $D_t\ne0$: changing emission time crosses the zero of $F$ with nonzero slope. The implicit function theorem then gives a unique local $C^1$ branch $T_t(T_r)$. Continuity allows the neighborhood to be chosen with $r\ge r_{\min}>0$, $\Delta\ge\Delta_{\min}>0$, and $|D_t|\ge d_{\min}>0$, where the three minima are fixed positive bounds. Higher smoothness requires correspondingly smoother paths. Local sub-field speed is sufficient for $D_t>0$; it is not necessary for a simple root.

For a $C^1$ transmitter history with $\|\mathbf V_o\|<c_f$ throughout a connected searched interval, there is at most one root at fixed $T_r$. To see why, take two emission times $s_1<s_2$. The reverse triangle inequality gives $F(s_2;T_r)-F(s_1;T_r)\ge c_f(s_2-s_1)-\|\mathbf X_o(s_2)-\mathbf X_o(s_1)\|>0$, since the path length between those times is less than $c_f(s_2-s_1)$. Thus $F$ is strictly increasing, including where the distance derivative is undefined. Existence needs an additional condition: on a closed bracket $[a,b]$ with $b<T_r$, continuity and $F(a;T_r)\le0\le F(b;T_r)$ give exactly one root. For example, with $c_f=1$, $T_r=0$, a fixed receiver at the origin and a stationary transmitter at distance two, $F(s;0)=2+s$ has no root on $[-0.5,-0.1]$; its root is $s=-2$.

These are derived local-branch and interval root-count results. They neither enumerate roots outside the searched interval nor provide continuation through a singular event. Two roots on an interval satisfying the strict speed hypothesis would contradict the monotonicity proof.

### Field-Speed and Super-Field-Speed Multiplicity

Multiple emission times at one fixed reception event require the transmitter history to reach or exceed $c_f$ somewhere on the interval between those emission times. Looping alone does not defeat the strict sub-field-speed proof. Equality can produce a characteristic family, meaning a nonisolated interval of roots: with $c_f=1$, $T_r=0$, a unit vector $\mathbf e$, and the prescribed same-transmitter path $\mathbf X_o(s)=-s\mathbf e$ on $[-2,0]$, every $s\in[-2,0)$ satisfies $F(s;0)=0$ and $D_t=0$. These are not ordinary simple branches. Super-field-speed motion permits loss of monotonicity and folds, where isolated roots meet at a zero derivative, but does not guarantee a root. The same-transmitter path $\mathbf X_o(s)=-2s\mathbf e$ on $[-2,0]$ has speed two and $F(s;0)=-s>0$ for every $s<0$ in that interval.

For a self-root, $o'=o$, the emission-to-reception interval imposes a stronger restriction. If $\|\mathbf V_o\|\le c_f$ throughout that interval, the root equality forces $c_f\Delta=\|\int_{T_t}^{T_r}\mathbf V_o(s)\,ds\|\le\int_{T_t}^{T_r}\|\mathbf V_o(s)\|\,ds\le c_f\Delta$. Equality throughout, with a $C^1$ path, requires constant velocity $c_f\hat{\mathbf r}$ along the entire straight chord. Every intermediate emission is then also a root and $D_t=0$. Consequently a simple positive-delay self-root requires a strict super-field-speed segment somewhere between emission and reception. This is a necessary history condition, not a sufficient existence criterion or a restriction on current receiver speed. The [self-hit condition](../../../dynamics/master-equation.md#self-hit-condition) gives a prescribed straight, variable-speed example; dynamical realization still requires the complete acceleration record.

### Singular Cases and Continuation

The strict inequality $T_t<T_r$ excludes the instantaneous diagonal. It is consistent with the [Master Equation's Heaviside endpoint convention](../../../dynamics/master-equation.md#conventions-and-exclusions), $H(0)=0$, where $H$ is one for positive delay and zero for nonpositive delay. At an exact sharp root, $r=c_f\Delta$ and $c_f>0$ imply that $r=0$ occurs only at $\Delta=0$, outside the set. This conclusion follows directly from the root equality.

Endpoint exclusion supplies no transition law. Passage through a fold, a nonisolated positive-delay family, or a root born at the excluded diagonal requires a separate rule specifying the outgoing history and root census. Mollification, the replacement of a sharp wake surface by a finite-width kernel, also requires declared positive-delay support, near-origin control, and a verified limit for that kernel and geometry. A finite sample or a chosen value of $H(0)$ does not establish such a limit. These continuation and regularization obligations remain open here; the local branch theorem stops when its hypotheses fail.

### Outrunning One's Own Wake: A Speedboat Analogy
Picture an idealized speedboat laying down circular ridges at constant emission cadence, each centered at the boat's position when emitted and expanding at a fixed speed $c_w$. This is a geometric analogy, not a model of water dynamics. If the boat stays strictly slower than $c_w$ throughout an emission-to-reception interval, its displacement is less than the ridge radius, so it cannot meet that ridge again. A faster segment followed by slowing or turning makes a later crossing possible without guaranteeing it. In the intended self-hit comparison, an admitted crossing contributes outward acceleration along the radius from the earlier emission position. The analogy's crossing geometry alone does not calculate an acceleration.

The constant emission cadence is distinct from the spacing encountered at reception. Transmitter motion determines the arriving acceleration weight $W^{\mathrm{acc}}=c_f/|D_t|$ on a simple branch. Receiver motion enters the signed root-playback derivative $dT_t/dT_r=D_r/D_t$, where $D_r=c_f-\hat{\mathbf r}\cdot\mathbf V_{o'}(T_r)$ and $\mathbf V_{o'}=d\mathbf X_{o'}/dT$. This identity follows by differentiating $F(T_t(T_r);T_r)=0$, for which $\partial_{T_r}F=-D_r$. Playback describes the order and rate at which emission history is encountered; it supplies no second instantaneous acceleration multiplier.

### Four Successive Crossings as a Prescribed-Path Proposal

The following maneuver is a guessed construction within the analogy. It describes a target of four successive reception events, not four simultaneous roots of one fixed $\mathcal C_o(T_r)$.

1. Sprint above $c_w$ and mark four distinct emission times. The ridges have different emission centers along the track; they are not concentric.
2. Let each ridge expand from its own center with radius $c_w$ times its elapsed age. Ridge spacing depends on the emission times and path.
3. Turn or slow along a smooth return path toward the earlier track. A turn shape alone does not determine which ridges are crossed or in what order.
4. Seek four distinct reception times $T_{r,k}$ paired with the marked emission times $T_{t,k}<T_{r,k}$, for $k=1,2,3,4$. Each pair must satisfy its own distance-delay equality. Each reception event has its own full root set, which may contain additional roots.
5. To establish the proposed pattern in the architrino geometry, supply the $C^1$ path with $c_f=1$, all eight times, positive ranges, nonzero transmitter derivatives, and a complete root census at each reception event. For transverse crossings of the four marked ridges, also require $D_r\ne0$ at each event, since the derivative with respect to reception time at fixed emission is $-D_r$. This distinguishes a crossing from tangency or riding and is specific to this proposed pattern; it is not an additional acceleration multiplier. To establish admitted self-hit contributions, also supply the applicable branch and acceleration-weight controls. No such four-event record is supplied here.

Failure of any of the four proposed root equalities would reject that candidate maneuver. Without a strict super-field-speed segment, the simple self-hit pattern is excluded by the interval argument; exact-speed motion can instead give the degenerate characteristic family. Even a verified prescribed path would establish only its kinematics and declared branch properties. Realization by the delayed dynamics, stability, and any physical interpretation require separate evidence.
