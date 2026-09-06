# Trailing-front delayed-ignition local-existence theorem

**Status:** derived local existence and continuation nonuniqueness inside the proposed exact-mirror restart; independent review complete; operator selected Option A and retained the multivalued relation. **Owner:** FSC-006b/FSC-005. **Primary precursor:** [Jack K. Hale third review](../reviews/jack-k-hale-third-review-2026-08-02.md), finding JKH3-6. **Decision record:** [Continuation-selection operator decision](../continuation-selection-operator-decision-2026-09-02.md). **Claim boundary:** this theorem is conditional on the proposed field-speed response and proposed exact-mirror event completion. It adopts neither law canonically and supplies no selector.

## Purpose and verdict

The proposed exact-mirror event map has zero matched impulse, continuous position and velocity, a complete labeled history splice, and single ownership of the event family. The isolated straight separating trace is one exact continuation. This note proves that it is not the unique continuation in the declared absolutely continuous, almost-everywhere solution class.

For every selected waiting time $u_*>0$, there is a local mirror-collinear solution that agrees exactly with the straight field-speed trace through $u_*$ and then begins continuous braking on one newly activated ordinary partner root per receiver. No external perturbation, row clipping, reweighting, or new contact event is used. The waiting time is not selected by the equation.

This is an existence construction, not an implemented cause of delayed onset. No current FSC theory or hypothesis supplies an evolving variable, wake/action process, perturbation, maturity guard, or other mechanism that keeps the channel inactive and then makes it activate at the prescribed $u_*$. The ordinary partner row supplies the acceleration contribution after activation; it does not cause the choice of activation time.

Plainly: the unchanged post-event wake equation permits the pair to fly straight for any chosen positive time and then begin slowing. It also permits them to continue straight. The current law therefore gives a set of futures rather than one future.

## Declared setting

Use normalized wake-speed units $c_f=1$, put coincidence at $T_{\mathrm c}=0$, and let $K>0$ be the normalized opposite-polarity partner coupling. Work in the isolated two-label exact-mirror class after the proposed zero-impulse restart, with no external remainder rows. Let $\mathbf e$ be the collinear direction and write

$$
\mathbf X_1(t)=x(t)\mathbf e,
\qquad
\mathbf X_2(t)=-x(t)\mathbf e,
$$

$$
x(t)=t-E(t),
\qquad
v(t)=x'(t)=1-m(t),
\qquad
E'(t)=m(t).
$$

The solution class has continuous position, absolutely continuous velocity, $0\le v\le1$ on the local interval, and satisfies the complete-ledger restart equation almost everywhere. The already-owned event family remains silent under the restart ownership rule; every isolated positive-delay post-event root is admitted normally.

Fix $u_*>0$ and prescribe the common straight history

$$
E(t)=m(t)=0
\qquad
\text{for }0\le t\le u_*.
$$

Plainly: both architrinos leave coincidence at field speed and remain exactly straight until the candidate ignition time. The theorem asks whether the existing equation itself can supply a lawful continuation after that time.

## Theorem

**Delayed-ignition local-existence and nonuniqueness theorem.** For every $u_*>0$, there is $h>0$ and a mirror-collinear solution on $[0,u_*+h]$ such that:

1. $E=m=0$ on $[0,u_*]$;
2. $m(t)>0$ for every $t\in(u_*,u_*+h]$, so both architrinos slow below field speed;
3. each receiver has exactly one new isolated positive-delay partner root $s(t)\in(0,u_*)$, with $D_t=2$, $D_r=m(t)>0$, and positive range;
4. neither ordered same-transmitter channel has a new positive-delay root;
5. the complete ordinary ledger contains exactly the two mirror partner rows, one per receiver, and the proposed ceiling response is the identity because each velocity is sub-field-speed and each partner contribution is speed-reducing; and
6. the vector paths solve the full isolated two-label restart equation, not only a scalar diagnostic.

The straight solution and every $u_*$-branch share the same complete event data and the same labeled history through $u_*$. Hence the proposed exact-mirror continuation relation is locally multivalued in the declared solution class.

## Proof

### 1. Exact partner-root equation

For a label-2 emission at $s\in(0,t)$ received by label 1 at $t$, the displacement points along $+\mathbf e$ on the local separating interval and has magnitude

$$
r(t,s)=t+s-E(t)-E(s).
$$

The causal equality $r(t,s)=t-s$ is therefore equivalent to

$$
\boxed{2s=E(t)+E(s).}
$$

Define $H(s)=2s-E(s)$. Wherever $0\le m(s)\le1$,

$$
H'(s)=2-m(s)=1+v(s)\ge1,
$$

so $H$ is strictly increasing and there is at most one post-event partner root for each receiver time.

Plainly: mirror symmetry reduces the complete partner-root search to one increasing scalar function. Root multiplicity cannot hide inside this local branch.

### 2. The first activated root lies in the stored straight segment

Choose a right neighborhood of $u_*$ on which $E(t)<2u_*$. Any root with $s<u_*$ lies in the straight stored history, so $E(s)=0$ and the root equation becomes

$$
\boxed{s(t)=\frac{E(t)}2.}
$$

For $E(t)>0$ this root is new and unowned because $s(t)>0$. It detaches continuously from the coincidence endpoint $s=0$ but does not rebill any emission owned by the event.

### 3. Smooth local ODE

On this first-root chart the stored source speed is $v(s)=1$, the range is $r=t-s$, and the normalized canonical partner-row magnitude is

$$
\frac{K}{(t-s)^2[1+v(s)]}.
$$

Opposite polarity makes this contribution backward, so the speed deficit satisfies

$$
\boxed{
E'(t)=m(t),
\qquad
m'(t)=\frac{K}{2\left(t-E(t)/2\right)^2},
\qquad
E(u_*)=m(u_*)=0.
}
$$

The active-branch right-hand side admits a smooth extension to a neighborhood of $(t,E,m)=(u_*,0,0)$ because $u_*>0$. The Picard--Lindelof theorem applied to that extension therefore gives a unique local solution for this fixed $u_*$. The extension value at the single boundary instant $t=u_*$ need not be identified with an active ordinary row: the physical root exists for every $t>u_*$ and the restart equation is imposed almost everywhere. The solution's right-hand onset values are

$$
m'(u_*^+)=\frac{K}{2u_*^2}>0,
$$

$$
m(t)=\frac{K}{2u_*^2}(t-u_*)+O\!\left((t-u_*)^2\right),
\qquad
E(t)=\frac{K}{4u_*^2}(t-u_*)^2+O\!\left((t-u_*)^3\right).
$$

After reducing $h$ if necessary, this solution has $0<m<1$, $0<E<2u_*$, and $t-E/2>0$ throughout $(u_*,u_*+h]$. Concatenating it to the straight trace gives continuous velocity with a bounded jump in acceleration at $u_*$. That velocity is locally Lipschitz and therefore belongs to the declared absolutely continuous solution class. The restart equation is required almost everywhere, so the single ignition instant needs no acceleration atom or new event coefficient.

Plainly: once a positive waiting time is fixed, the first braking interval is not a singular delay problem. It is an ordinary smooth ODE with a positive initial braking slope. The acceleration switches on immediately to the right of $u_*$, while velocity remains continuous.

### 4. Complete local root census

For $t>u_*$, the constructed $E(t)>0$ gives the root $s(t)=E(t)/2\in(0,u_*)$. Strict monotonicity of $H$ proves it is the only post-event partner root. Its factors are

$$
D_t=1+v(s(t))=2,
\qquad
D_r=1-v(t)=m(t)>0,
$$

and its range is $t-s(t)>0$. Its playback derivative also agrees exactly with the implicit-root identity:

$$
s'(t)=\frac{m(t)}2=\frac{D_r}{D_t}.
$$

The owned pre-event partner family cannot reactivate by the owned-family permanence lemma. For a same-transmitter candidate $0\le s<t$,

$$
\left|x(t)-x(s)\right|
\le
\int_s^t v(q)\,dq
<t-s
$$

whenever the interval includes any part of $(u_*,t)$, because $v<1$ there. Thus no new positive-delay same-transmitter root exists. The straight same-transmitter family before ignition remains an already classified noncrossing characteristic family and supplies no ordinary row.

Plainly: after ignition, exactly one genuinely new partner front catches each architrino. No old event wake is charged again, and no self-wake supplies a hidden additional contribution.

### 5. Response and full vector embedding

The partner row points opposite each receiver's velocity and has the magnitude used in the displayed ODE. For $t>u_*$, $v(t)<1$, so the velocity is strictly inside the proposed speed ball and the constrained response leaves the complete ordinary ledger unchanged. Mirror symmetry gives equal and opposite vector accelerations, preserves $\mathbf X_2=-\mathbf X_1$, and produces no transverse component. The scalar solution therefore embeds directly as a solution of both ordered partner equations in the full three-dimensional isolated two-label system.

This completes the local existence proof. Because the straight trace remains an exact solution and the same construction works for every $u_*>0$, local continuation from the proposed event state is not unique. $\square$

## Exact decision

The unchanged ordinary delayed equation does permit a first departure from $c_f$ after any positive waiting time. No external perturbation is mathematically required for existence. Exact straight passage is compatible but is not selected by the current law.

Selecting straight passage would require additional data, such as an activation-continuity or positive-floor postulate, or a separately proved approximation-limit solution criterion that excludes the waiting-time branches. Conversely, retaining the present absolutely continuous, almost-everywhere solution class means accepting a multivalued continuation relation at this proposed event class. This theorem does not choose between those foundational dispositions.

Plainly: the first slowdown is permitted, but its start time is undetermined. The missing object is no longer a perturbation that starts braking; it is a rule that selects one future from the continuum already allowed by the equation.

## Remaining boundaries

- Immediate sustained ignition at $u_*=0$ remains excluded in the declared absolutely continuous class because the row scales as $K/(2t^2)$ and is not locally integrable.
- Event-adjacent thin activation cascades are now excluded in the declared mirror-collinear class by the [no-cascade lemma](event-adjacent-no-cascade-lemma.md); that result does not restore uniqueness.
- This theorem is local. The later [complete-lobe theorem](two-lobe-return-map-and-autonomous-trigger-audit.md) proves turnaround and return under its stronger sufficient bound, but neither result produces an autonomous onset or breather.
- The exact collinear embedding is not a perturbative-stability theorem and says nothing about noncollinear histories.
- The event aggregation, zero-impulse restart, and field-speed response remain proposed laws rather than canonical dynamics.
- Independent theorem and measure-typing review are complete. Broader promotion remains barred because the event law, response, and field-speed ceiling are proposed and Option A supplies no selected physical future.

## Falsifiers

The theorem is overturned by any of the following inside the declared class: a second admitted local root omitted by the census; failure of the partner row to reduce to the displayed ODE; a violation of event-family ownership by the new $s(t)>0$ root; failure of the local ODE solution to satisfy the complete vector restart equation almost everywhere; or an already-adopted solution requirement stronger than absolute continuity that excludes a bounded acceleration jump at an ordinary-root activation time.

## Closure goal

Preserve the reviewed nonuniqueness theorem and operator-selected Option A boundary. Any future selector must be a separately derived and authorized FSC proposal.
