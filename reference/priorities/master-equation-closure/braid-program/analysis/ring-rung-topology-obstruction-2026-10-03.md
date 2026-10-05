# Different ring rungs cannot be joined inside one ordinary bounded cross-root class

## Result and boundary

The cross-member root census separates every pair of adjacent six-member circular rungs. Consequently a continuous family of complete, bounded, noncoincident histories whose cross-member roots stay ordinary cannot join those rungs. This is a topology obstruction to a regular connecting family, not a prohibition on every singular, collisional or unbounded connection. **Grade: derived candidate theorem; separate adjudication pending.** It uses the unchanged Master Equation only to identify the exact endpoint histories; the root-count argument itself applies to their causal geometry.

The statement covers uniformly bounded unequal-radius, phase-deformed, breathing, elliptical and precessing histories if they satisfy the regularity hypotheses below. It does not exclude a local branch that remains in the same cross-root class, a disconnected exact configuration, or a transition needing an additional boundary prescription. It establishes no later fate of an unstable ring. No cap, multiplier, root exclusion or event rule is selected. Symbolic $c_f$ is retained in the proof; all numerical examples set $K=c_f=1$.

## 1. A compact causal-root invariant

Let $a\in[0,1]$ parametrize complete labelled histories $X_i^a(S)$, $S\leq0$. Require:

1. A common finite bound $|X_i^a(S)|\leq B$ for all labels, parameters and past times. A common translation of the coordinate origin is immaterial.
2. Joint continuity of positions and source velocities in $(a,S)$ on each compact past-time interval. Each history is continuously differentiable in time. No differentiability with respect to $a$ is needed.
3. Noncoincidence at reception: $X_i^a(0)\ne X_j^a(0)$ for every $i\ne j$ and every $a$.
4. Every positive-delay cross-member root is ordinary: at a zero of $f_{ij}^a(d)=|X_i^a(0)-X_j^a(-d)|-c_fd$, its signed factor $D=1-n\cdot V_j^a(-d)/c_f$ is nonzero.

Then the number of positive-delay roots in each labelled cross channel $(i,j)$ is independent of $a$.

**Proof.** Compactness and noncoincidence give a positive minimum reception clearance. Joint continuity on a small compact time interval gives a common $d_->0$ on which every cross-channel gap stays positive. For any $d>2B/c_f$, the triangle inequality gives $f_{ij}^a(d)<0$. Choose a strict larger bound $d_+$. All roots therefore lie in the interior of the same compact interval $[d_-,d_+]$.

At a root the separation is $c_fd>0$, so the gap is continuously differentiable in delay near that root and

$$
\partial_d f_{ij}^a(d)=n\cdot V_j^a(-d)-c_f=-c_fD\ne0.
$$

Each root has a unique continuously moving local continuation by the parameter-continuous implicit-root theorem, or equivalently by strict local monotonicity and endpoint sign opposition. At fixed $a$, infinitely many roots in the compact interval would have an accumulation root; its nonzero delay derivative would contradict local uniqueness. Thus the root set is finite.

For a fixed parameter, choose disjoint small intervals around those finitely many roots. The gap has a nonzero minimum absolute value on their compact complement. Continuity preserves the complement sign and the monotone root brackets for nearby parameters. The root number is locally constant. A locally constant integer on the connected parameter interval is constant. This proves the assertion separately for every cross channel. No signed cancellation of acceleration contributions changes this count, and no self-root assumption enters it. $\square$

**Falsifier:** a purported connecting family with different endpoint counts must exhibit failure of at least one stated hypothesis. Check the reception clearance, uniform past bound, source regularity and the cross-channel $D$ margins. A family satisfying all four while changing a channel count would overturn the theorem.

## 2. Adjacent six-member rungs have different cross counts

Consume the complete circular census in the [frequency account](ring-frequency-account-2026-10-03.md) and its [independent adjudication](ring-frequency-and-fast-limit-independent-adjudication-2026-10-03.md). At T$2n$, $n\geq1$, the whole-ring counts are

$$
N_{\rm total}(n)=24(n+1),\qquad
N_{\rm self}(n)=6\left[1+2\left\lfloor\frac{2n-1}{6}\right\rfloor\right],
$$

so

$$
N_{\rm cross}(n)=24(n+1)-6-12\left\lfloor\frac{2n-1}{6}\right\rfloor.
$$

An adjacent rung adds 24 total hits. When $n$ is divisible by three it adds twelve self hits and twelve cross hits; otherwise it adds twenty-four cross hits. Hence every adjacent pair has unequal cross count, and the cross count increases strictly across the ladder. T02 has 48 total hits, six self hits and 42 cross hits; T04 has 72, six and 66. T200 has 2424, 402 and 2022.

These counts distinguish the rungs even though $Rv$ is close to its common high-rung limit. The limit does not supply a continuously varying exact circular speed. A speed crossing that creates recent self roots cannot by itself resolve this cross-count obstruction: the theorem deliberately counts cross channels only.

**Grade: derived integer consequences of the independently checked circular census. Falsifier:** a missing endpoint cross root or an incorrect self congruence would change these integers and require repair before applying the obstruction.

## 3. Scope for an evolving history

The same compact argument applies to reception time $T$ on a finite interval if every receiver position and every source position at all past times $S\le T$ has a common bound $B$, positions and velocities are continuous, receivers never coincide, and all cross roots stay ordinary. A separately proved complete uniform delay bound can replace that all-past bound. Choose $d_+>2B/c_f$ in the former case. Endpoint closeness must then hold in $C^1$ throughout the entire resulting window $[T-d_+,T]$, rather than a shorter circular period or recent-history segment; that shorter comparison alone cannot exclude additional remote-past roots. A history moving between two sufficiently small ordinary neighborhoods of different rungs under these hypotheses must encounter a cross-root singularity, coincidence, or failure of the bounded regular class before reaching the second neighborhood. Uniformly small $C^1$ perturbations on those complete windows preserve the endpoint censuses.

This is a necessary boundary encounter, not a sufficient transfer mechanism. It supplies no impulse threshold, trajectory, fold location, branch selection or continuation through $D=0$. An arbitrarily long drifting history or an unbounded ancient past can fail the common-bound hypothesis and is outside the stated theorem. A finite-time obstruction does not select dispersal over another destination.

The existing [T04 coupled isolation certificate](../evidence/2026-09-02-planar-three-binary-coupled-box-certificate.md) addresses a different issue: local rigid radius and phase uniqueness within a fixed root class. Neither result exhausts arbitrary same-class deformations or time-dependent exact histories. This note does not change qualification, ranking, equation selection or any retained-evolution entry.
