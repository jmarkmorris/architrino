# Assessment of complete Cartesian scattering robustness

**Accepted derived result:** every fixed admitted positive-terminal-speed member at $p=3$ or separately fixed $p>3$ has a relative-open neighborhood of complete compatible Cartesian histories whose futures are global, separated, uniformly subfield and scatter with distinct nonzero terminal velocities. Perturbations need not preserve mirror symmetry or a plane. This is robustness of a fate, not stability of one trajectory or binding.

The coordinator froze its [independent complete-history reference](alternatives-screen-2026-10-05-radial-scattering-robustness-coordinator-reference.md), SHA-256 `4081c7d7db766530f7f77dade3ff9eea7bbfa2962f8174c4177ce65f58608ae2`, before reading the worker's [full proof](alternatives-screen-2026-10-05-radial-scattering-robustness-independent.md), SHA-256 `8a57b464970eed294e695c038dc572643cf29e52dcb9b96891a2724bf30d65a1`. Its [fixed specification](alternatives-screen-2026-10-05-radial-scattering-robustness-specification.md) has SHA-256 `325b16aba8bc7ba08b74b72853b156fb403489f68e46f99c2fcb707c99425ee7`. The subject gives a more explicit finite-prefix continuity radius; that part was subsequently reconstructed directly by the coordinator.

## Full-history outgoing criterion

For the sharp radial row with $K=R_*=c_f=1$, complete speed below $b<1$ implies one simple partner root and no positive-delay self root. If $d$ is the present separation, complete speed chords give

$$
\frac d{1+b}\le R_i\le\frac d{1-b},\qquad
D_i\ge1-b,\qquad |A_i|\le C_bd^{-p},\quad C_b=\frac{(1+b)^p}{1-b}.
$$

This uses the entire source history. In particular an old circular source need not be distant. At an entry time choose a fixed unit vector $e$, projected separation $z>0$, projected relative velocity $w$, and $v>0$. If the complete incoming speed is at most $b_0<b$ and

$$
I=\frac{C_bz^{1-p}}{(p-1)v}<\min\{b-b_0,(w-v)/2\},
$$

then the actual future remains below speed $b$ and its projected gap grows at least as $z+v(t-T)$. Indeed the acceleration integral is at most $I$, so individual speeds stay below $b_0+I$ and relative projected velocity exceeds $w-2I>v$. The strict bootstrap and positive range/denominator continuation prove a global future. This analytical criterion is valid for each fixed $p>1$; its present family application is $p\ge3$.

Velocity convergence follows from the integrable acceleration bound. For $p>2$, its first moment is also integrable, giving actual affine scattering

$$
X_i(t)=U_i(t-T)+a_i+O(t^{2-p}),\qquad V_i(t)=U_i+O(t^{1-p}).
$$

The distinct terminal velocities have projected difference greater than $v$. For $p\ge3$ the relative direction has finite total spherical angular variation, since the cross product of relative position and velocity is bounded while separation grows linearly. The source clocks advance at rates between $(1-b)/(1+b)$ and $(1+b)/(1-b)$, eventually traversing every retained finite old source segment.

## Why the near-circular family enters and nearby histories follow

For a fixed assessed mirror member, write its terminal velocities as $u,-u$ with $s=|u|>0$. Its complete speed bound is $B<1$. Choosing $e=u/s$ gives projected separation asymptotic to $2st$ and projected relative velocity tending to $2s$. Thus some finite entry time satisfies the strict criterion with slack. No uniform entry time as $s$ tends to zero is asserted.

The initial topology is uniform position and velocity difference over the entire supplied past, restricted to separated compatible locally $C^{2,1}$ histories. The circle-tail base has a positive complete gap floor. On any fixed finite prefix, let $E(t)$ bound the complete position/velocity difference, $k=1-b_1>0$ the provisional speed margin and $a>0$ the minimum range. Direct residual comparison gives $|R_i-\bar R_i|\le2E/k$ and $|n_i-\bar n_i|\le4E/(ka)$. To compare source velocities at different clocks, shift the reference source using its bounded acceleration $M$, rather than demanding a uniform bound on the perturbed acceleration. Consequently

$$
|D_i-\bar D_i|\le\left(1+\frac{4b_1}{ka}+\frac{2M}{k}\right)E.
$$

Differentiating $R^{-p}D^{-1}$ on the positive-range chart yields the subject's explicit finite constant $L$ and $E(t)\le E(0)e^{(1+L)t}$. The root delay and advancing-clock bounds permit repeated short steps whose sources remain in already supplied or generated history. The implicit root is locally Lipschitz and the integral map contracts on a sufficiently short step. This establishes finite-time existence, uniqueness and continuity without replacing the complete history by present coordinates.

For a sufficiently small initial neighborhood this finite-prefix bound puts every compatible perturbation inside the same outgoing criterion at the chosen entry time. The subject's radius formula is positive and explicit in the reference constants, but those constants have not been numerically enclosed. By choosing the tail impulse smaller than $s/8$, both perturbed terminal speeds remain nonzero, as well as being distinct.

Exactly compatible nonmirror and noncoplanar histories exist in this neighborhood: put independent small smooth normal bumps on the labels, avoiding zero and both release source events. Release jets and sampled source positions/velocities are unchanged, while complete monotonicity preserves the same release roots. Bumps between a release source event and zero are traversed at finite future reception, so the construction is not restricted to permanently inaccessible past data.

Uniform integrable tails combine with finite-prefix continuity to prove continuity of terminal velocities and, for $p>2$, affine offsets. The chosen complete uniform position norm excludes a nonzero affine remote-past drift; no weaker topology is silently claimed. The neighborhood is memberwise, not uniform in launch speed or exponent. Zero-terminal-speed histories lack the decisive positive outgoing margin and are excluded from this application.

The root-range inequalities, finite-prefix denominator comparison, strict impulse criterion and complete-history compatibility are explicit falsifiers. A trajectory with a different terminal velocity can depart linearly from the reference while satisfying this theorem; that is consistent with robust scattering and does not supply asymptotic stability of the reference. The evidence consists of the independent outgoing derivations and checked finite-history estimates, with no numerical target or spectrum.
