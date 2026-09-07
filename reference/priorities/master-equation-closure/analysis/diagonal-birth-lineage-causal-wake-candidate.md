# Diagonal-Birth-Lineage Causal-Wake Candidate

## Status

- Candidate identity: `CWB-rho5-lineage/v2`
- Claim level: `guessed constitutive candidate with derived local reductions`
- Scope: priority-only construction and falsification for MEC-002, MEC-003, and MEC-004
- Canonical effect: none; no Master Equation, wake ontology, or EOM solver behavior is changed
- Current result: finite-order local birth and receiver-sensitivity tests pass; full continuation and conserved accounts fail to close

This candidate is the first construction authorized after the unchanged sharp-law route closed negatively. It is not a point value at $r=0$. It declares a separate open boundary chart carried by persistent causal-root provenance.

## 1. State

For transmitter $j$ and emission label $e$, retain the regular fixed-center shell state together with source-history values cached at emission:

$$
\mathsf w_{j,e}(T)
=
\left(
j,T_e,q_j,\mathbf C_{j,e},R_{j,e},c_fq_j\,dT_e,
\mathbf V_{j,e},\mathbf A^-_{j,e}
\right).
$$

The cached velocity and one-sided acceleration are redundant values from the retained transmitter history, not independent material content. Emission and free propagation are

$$
\mathbf C_{j,e}=\mathbf X_j(T_e),
\qquad
R_{j,e}(T_e)=0,
$$

$$
\dot{\mathbf C}_{j,e}=\mathbf0,
\qquad
\dot R_{j,e}=c_f,
\qquad
\dot{\mathbf V}_{j,e}
=
\dot{\mathbf A}^-_{j,e}
=
\frac{d}{dT}(c_fq_j\,dT_e)=0.
$$

The new state datum is an immutable root-stratum origin and event owner,

$$
\beta
=
\left(
\text{ordered channel},
\text{root-stratum identity},
\text{origin stratum},
\text{event owner},
\text{release status}
\right).
$$

Only a positive-delay self-root stratum independently certified as incident to the structural same-transmitter diagonal may receive `origin = diagonal_birth`. Numerical root rank or discovery order may not create this label. An ordinary fold at positive separation receives a different origin. A root interval, nonisolated tangent, non-tame accumulation, or missing owner remains `quarantined_unresolved`.

Plainly: the update remembers where a root branch came from. A small denominator by itself cannot distinguish a newborn self branch from an ordinary fold.

Claim grade: **derived need for lineage; guessed state representation**. A tuple-only rule that distinguishes diagonal birth from an otherwise identical ordinary fold would falsify the need for lineage. A smaller persistent representation that preserves incidence, identity, and unique ownership would falsify the inferred minimal tuple.

## 2. Native geometric coordinate

At an admitted reception, define

$$
\mathbf n
=
\frac{\mathbf X_i(T)-\mathbf C_{j,e}}{r},
\qquad
D_t
=
c_f-\mathbf n\cdot\mathbf V_{j,e},
$$

and the emission-label derivative

$$
G_t
=
\partial_{T_e}D_t
=
\frac{\|\mathbf V_{j,e}\|^2-(\mathbf n\cdot\mathbf V_{j,e})^2}{r}
-
\mathbf n\cdot\mathbf A^-_{j,e}.
$$

The transversality-acceleration length and dimensionless coordinate are

$$
\ell_G
=
\frac{c_f^2}{|G_t|},
\qquad
\rho
=
\frac r{\ell_G}
=
\frac{r|G_t|}{c_f^2}.
$$

The quantity $\rho$ is dimensionless and uses only the present reception geometry plus retained transmitter history. The choice $\rho=1$ as the release boundary is a new constitutive choice; its numerical value is not claimed to be derived merely because no dimensional constant is added.

Plainly: $\rho$ compares the actual separation with the local length over which the transmitter factor changes substantially.

Claim grade: **derived invariant coordinate; guessed boundary value**. The coordinate formula is falsified by a dimensional, translation, rotation, or direct differentiation failure. The release boundary is falsified by regulator dependence, discontinuous acceleration, ordinary-fold modification, or a retained birth lineage whose accepted continuation requires a different release state.

## 3. Frozen candidates and successor rule

The first frozen profile was

$$
M_3(\rho)
=
\begin{cases}
\rho^3,&0\le\rho<1,\\
1,&\rho\ge1.
\end{cases}
$$

It makes the quadratic-birth acceleration finite but leaves longitudinal receiver sensitivity proportional to $\tau^{-2}$. Its sensitivity integral diverges, so `CWB-rho3/v0` is rejected without retuning.

The separately frozen successor is

$$
M_5(\rho)
=
\begin{cases}
\rho^5,&0\le\rho<1,\\
1,&\rho\ge1.
\end{cases}
$$

`CWB-rho5-lineage/v2` applies this profile only while $\beta$ identifies an active diagonal-born boundary lineage. Cross-transmitter roots, ordinary self roots, ordinary folds, and released lineages use $M=1$. When an active lineage first reaches $\rho\ge1$ through an owned transverse release event, its release status changes irreversibly to `regular_released`, after which the sharp law applies even if a later ordinary fold has small $\rho$.

The candidate acceleration row is

$$
\mathbf A_h^{(2)}
=
M_\beta(\rho)
\kappa\sigma_{ij}|q_iq_j|
\frac{c_f}{r^2|D_t|}\mathbf n.
$$

The exact structural diagonal remains excluded. The candidate supplies the one-sided positive-delay limit only after the root stratum, diagonal incidence, and event owner are certified.

Plainly: suppression belongs to the newborn branch for as long as its stored birth status remains active. It is not applied to every root that happens to have a small denominator.

Claim grade: **guessed constitutive update with derived regular matching**. Ordinary rows match the canonical acceleration by definition of the lineage gate, while the choice of quintic profile, $\rho=1$ release, and irreversible release are not derived. The candidate is falsified by any future receiver lookup, unowned lineage transition, changed ordinary-fold row, acceleration discontinuity at release, or failure of the local birth tests below.

## 4. Exact finite-order reductions

In normalized units $c_f=1$, consider every finite odd $k\ge1$ in the prescribed collinear family

$$
v_k(t)=1+at^k,
\qquad
x_k(t)=t+\frac{a}{k+1}t^{k+1},
\qquad a>0.
$$

At reception $t=\tau>0$, the self root $s=-\tau$ obeys

$$
r=2\tau,
\qquad
D_t=a\tau^k,
\qquad
|G_t|=ak\tau^{k-1},
\qquad
\rho=2ak\tau^k.
$$

Writing $K=\kappa\sigma_{ii}q_i^2$, the quintic boundary row has magnitude

$$
\|\mathbf A_5\|
=
8|K|a^4k^5\tau^{4k-2},
$$

and the exact root-resolved longitudinal receiver derivative has magnitude

$$
\left\|\partial_{\parallel}\mathbf A_5\right\|
=
4|K|a^3k^5(8k-7)\tau^{3k-3}.
$$

Both are locally integrable for every finite odd $k$. For $k=1$, acceleration vanishes as $\tau^2$ and the longitudinal sensitivity remains bounded. For $k>1$, both vanish faster.

Plainly: the quintic profile passes the finite-order tests that reject the cubic profile. This does not prove that an actual Master-Equation trajectory reaches or leaves the event uniquely.

Claim grade: **derived on the declared prescribed-history family**. An algebraic or independently calculated counterexample to either displayed power falsifies the local result. The family supplies no global continuation, realized trajectory, or stability claim.

## 5. Singular cases and continuation boundary

The candidate remains unresolved in three classes:

1. An infinitely flat isolated birth can have finite candidate acceleration while every event jet vanishes. The lineage classifier must use the retained one-sided root topology, not the jet.
2. A persistent tangent can produce a root interval with $D_t=G_t=0$. Delta collapse and the displayed row are undefined; the case remains quarantined.
3. Multiple simultaneous events, root accumulation, or lineage merger require a separately owned event map.

Finite acceleration and finite receiver sensitivity do not prove unique continuation. Acceptance still requires uniform bounded-variation compactness, regulator and history-family convergence to one limiting integral equation, Osgood or stronger uniqueness, single-valued event maps, stable ordering, and nonaccumulation or a controlled-Zeno theorem.

Plainly: the candidate controls the size of one dangerous contribution. It does not yet prove there is exactly one complete state after the event.

## 6. Independent shell-account attempt

The smallest non-residual shell-account sector assigns finite emission measures

$$
d\mu_E
=
\varepsilon(q_j)\,dT_e\frac{d\boldsymbol\omega}{4\pi},
\qquad
d\boldsymbol\mu_P
=
p(q_j)\boldsymbol\omega\,dT_e\frac{d\boldsymbol\omega}{4\pi},
$$

and derives the orbital angular account about $\mathbf O$ as

$$
d\boldsymbol\mu_{J,\mathbf O}
=
(\mathbf Y_{j,e}-\mathbf O)\times d\boldsymbol\mu_P
=
(\mathbf C_{j,e}-\mathbf O)\times d\boldsymbol\mu_P.
$$

Free transport preserves these measures, and uniquely owned domain exit gives exact retained-versus-boundary partition identities. Translation and rotation covariance also hold, including

$$
\boldsymbol\mu_{J,\mathbf O+\mathbf a}
=
\boldsymbol\mu_{J,\mathbf O}
-
\mathbf a\times\boldsymbol\mu_P.
$$

These are genuine account-transport identities but do not close motion accounts. A finite angular patch traversed in receiver time carries the factor

$$
\left|\frac{dT_e}{dT_r}\right|
=
\left|\frac{D_r}{D_t}\right|,
$$

whereas receiver acceleration carries $1/|D_t|$ and remains generally nonzero at $D_r=0$. Matching the two requires an unbounded $1/|D_r|$ allocation. Direct receiver-conditioned graph measures remove that mismatch only by copying source capacity as receivers are added. Finite depletion either changes later acceleration or becomes dynamically inert.

Plainly: the account carried by a finite piece of emitted shell and the acceleration read at a point receiver transform differently when the receiver clock grazes the root. The near-birth modifier cannot fix this because the obstruction already occurs on exterior rows where $M=1$.

The shell-account candidate is therefore rejected for MEC-004. The only surviving results are covariant free transport and explicit boundary export. The coefficients $\varepsilon(q)$ and $p(q)$ remain unselected and no conserved-account value is assigned.

Claim grade: **derived conditional transport identity and derived no-go for finite absolutely continuous source-clock allocation**. The no-go is falsified by a bounded receiver-independent allocation that supplies nonzero finite transfer at $D_r=0$, survives arbitrary finite receiver multiplicity, and preserves the same acceleration update.

## 7. Disposition

`CWB-rho5-lineage/v2` is a concrete priority-only successor that survives the currently derived finite-order near-birth magnitude and receiver-sensitivity tests while remaining transparent to ordinary folds through persistent provenance. It is not a complete MEC-002 update because diagonal-incidence certification still depends on unfinished MEC-005 mathematics, persistent tangencies remain quarantined, release and event-map uniqueness are unproved, and the independent shell-account sector fails MEC-004.

MEC-002 remains `In progress`. MEC-003 and MEC-004 remain `Deferred / blocked`. No candidate is eligible for corpus promotion or EOM solver use.

The next decisive construction must change more than the near-birth scalar profile. It must supply either a reception-population-dependent allocation, a dynamically visible depletion response that changes the acceleration update consistently, or a separately derived action or boundary-charge sector. Each would be another explicit theory choice and a new candidate identity.

## Falsification Packet

The executable candidate packet must cover:

1. the quadratic birth and full receiver derivative;
2. odd orders $k=3,5,9$;
3. an infinitely flat isolated birth;
4. a persistent tangent/root interval;
5. an ordinary partner fold;
6. an ordinary same-transmitter fold with no diagonal incidence;
7. release at $\rho=1$;
8. lineage identity under root-rank permutation and refinement;
9. shrinking-bump regulators;
10. the Osgood waiting-family nonuniqueness control;
11. the $D_r=0$ account-allocation obstruction; and
12. arbitrary finite receiver multiplicity.

Any unresolved lineage, tangent, event owner, regulator limit, or account row must report `Not advanced` rather than selecting a value.

Closure goal: determine whether a provenance-complete `CWB-rho5-lineage/v2` event map has a unique regulator-independent continuation, while treating the failed shell-account sector as a requirement for a genuinely different account architecture.
