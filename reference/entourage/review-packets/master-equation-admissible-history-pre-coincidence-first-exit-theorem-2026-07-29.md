# Research findings

## Result and claim boundary

The proposed first-exit ordering is **proved for a sharply delimited
admissible class**, not for every mirror-symmetric starting history. The proof
uses the canonical sharp-root Master Equation at normalized wake speed
$c_f=1$. It requires an active positive-delay partner root with a retained
history bracket and a nonzero attractive opposite-polarity contribution.

For that class, same-event coordinate coincidence cannot be the first event.
Before $q=0$, either the mirror receivers reach $u=1$ at positive present and
delayed separation, or the declared regular chart has already ended at a
certified root-topology, retained-history, or other regularity boundary.

Claim class: **derived theorem on the admissible maximal regular interval**.
It supplies no continuation through either alternative and no statement about
excluded initial data.

Plainly: The theorem says a regular attractive approach cannot quietly reach
the common coordinate while remaining below field speed. It either reaches
field speed first or leaves the chart for a separately recorded reason.

## Admissible maximal regular history class

Let $\mathcal H_{\mathrm{att}}^{\mathrm{reg}}$ consist of histories with the
following properties.

1. The two persistent labels are mirror symmetric on a fixed line:

   $$
   \mathbf X_-(T)=-q(T)\mathbf e,
   \qquad
   \mathbf X_+(T)=q(T)\mathbf e,
   \qquad
   q(T_0)>0.
   $$

2. Their inward speed is

   $$
   u(T)=-\dot q(T),
   $$

   and the relevant initial retained interval is monotone inward and strictly
   subfield:

   $$
   0\le u(T)<1.
   $$

   On each compact retained root interval, continuity turns this strict
   inequality into a positive subfield margin.

3. The labels have opposite polarity and the admitted partner root supplies
   a fixed nonzero inward coupling magnitude $K>0$ under the canonical
   sharp-root acceleration law.

4. At $T_0$, each ordered partner channel has a positive-delay causal-root
   bracket inside retained history. The active and inactive ledgers are
   complete, and the retained-history margin is positive. A history with no
   bracket is not silently treated as having no causal partner; it is either
   outside this class or already at a retained-history or causal-contact
   boundary.

5. The history is evolved by the canonical regular branch sum on the maximal
   interval

   $$
   I_{\max}=[T_0,T_{\mathrm{ex}})
   $$

   on which mirror symmetry, persistent labels, $q>0$, monotone inward motion,
   complete root census, positive delayed ranges, simple-root factors,
   retained-history margin, and finite regular acceleration rows all remain
   certified.

6. The first-exit ledger treats the following as distinct events: current
   receiver field-speed arrival, same-event coordinate coincidence,
   partner-root fold or birth, self-root birth, root accumulation, retained
   history edge, delayed-range boundary, loss of monotonicity, or another
   explicitly identified regularity failure.

This is a maximal **regular interval** definition, not a claim that these
conditions cover every possible initial history. It does not assume one
partner root globally; uniqueness is derived below while the class remains
strictly subfield.

Plainly: The theorem applies to complete, attractive, inward-moving histories
whose arriving partner root is actually present and certified. The interval
ends as soon as any fact needed by the proof stops being true.

## Partner-root existence, uniqueness, and simplicity

For reception at $T$ by the left label from the right label at emission time
$s<T$, the causal-root equation is

$$
F_T(s)
=
q(T)+q(s)-(T-s)
=
0.
$$

Its emission-time derivative is

$$
\partial_sF_T(s)=1-u(s).
$$

Before current receiver field-speed arrival, every relevant retained emission
speed remains below one. Therefore

$$
\partial_sF_T(s)>0.
$$

The retained-history sign bracket required by
$\mathcal H_{\mathrm{att}}^{\mathrm{reg}}$ gives existence, and strict
monotonicity gives uniqueness. The transmitter-side factor on this root is

$$
D_t^{\mathrm{partner}}=1-u(s)>0,
$$

so the root is simple. Mirror symmetry gives the corresponding unique root in
the opposite ordered channel.

Claim class: **derived root-census result**. Initially multi-root data are not
inside this chart. A later loss of monotonicity of $F_T$, root at the history
edge, or zero transmitter factor is a certified sector exit rather than an
unrecorded exception.

Plainly: Below field speed, the partner root equation rises steadily with
emission time. A complete sign bracket therefore contains exactly one partner
root, not an assumed or selectively retained one.

## Self-root exclusion before field speed

For either label, use the scalar coordinate $x(T)$ increasing in its inward
direction, with

$$
\dot x(T)=u(T).
$$

A positive-delay self root $(T,s)$ would require

$$
x(T)-x(s)=T-s,
$$

or

$$
\int_s^T\bigl(u(\tau)-1\bigr)\,\mathrm d\tau=0.
$$

On the strict-subfield retained interval the integrand is negative, so the
integral is negative for every $s<T$. No positive-delay self root exists.
The zero-delay diagonal $s=T$ is excluded by the canonical root-admission law.

Claim class: **derived complete self-root exclusion on the stated interval**.
The result ends at receiver field-speed arrival or an earlier history or
regularity boundary.

Plainly: A label moving below field speed over the whole candidate interval
cannot catch one of its own earlier causal surfaces.

## Current receiver speed and emission-time transmitter factor

Let $T_t(T_r)$ be the unique partner emission root and define

$$
R=T_r-T_t,
\qquad
u_r=u(T_r),
\qquad
u_t=u(T_t).
$$

The partner direction for the left receiver gives

$$
D_t=1-u_t,
\qquad
D_r=1+u_r.
$$

These quantities have different event meanings. The receiver reaches the
kinematic threshold when $u_r=1$. A partner transmitter fold occurs when
$D_t=0$, equivalently $u_t=1$ on this chart. The two times are not
interchangeable because $T_t<T_r$.

Before the first receiver field-speed event, the complete retained history has
$u_t<1$, so $D_t>0$. At the receiver threshold itself, the emission time is
strictly earlier and remains subfield; hence the partner root is still simple
there.

Plainly: The receiver can reach field speed while the arriving partner surface
was emitted earlier at a lower speed. Receiver threshold does not manufacture
a transmitter fold.

## Exact partner geometry

On the mirror branch, the causal equation gives

$$
R=q(T_r)+q(T_t).
$$

Define the average inward speed over the root interval by

$$
\bar u
=
\frac{1}{T_r-T_t}
\int_{T_t}^{T_r}u(\tau)\,\mathrm d\tau.
$$

Since

$$
q(T_t)=q(T_r)+\bar uR,
$$

the root equation becomes

$$
R=2q(T_r)+\bar uR.
$$

Thus

$$
\boxed{
R=\frac{2q(T_r)}{1-\bar u}
},
\qquad
\boxed{
q(T_r)=\frac{1-\bar u}{2}R
}.
$$

While the retained interval is strictly subfield, $\bar u<1$. Therefore a
positive-delay regular partner root has $q>0$. Coordinate coincidence cannot
occur inside the open chart with $R>0$ and $\bar u<1$.

Claim class: **derived geometric obstruction**. By itself it allows the
partner root to collapse toward the excluded endpoint at the same time as
$q\to0$. The positive-range strict ordering requires the nonzero attractive
acceleration used next.

Plainly: A regular delayed partner root and an average speed below field speed
cannot coexist with present coordinate coincidence.

## Reduced range evolution

The canonical partner acceleration magnitude for the left label is

$$
\frac{\mathrm du}{\mathrm dT_r}
=
\frac{K}{R^2(1-u_t)}.
$$

The root-playback identity gives

$$
\frac{\mathrm dT_t}{\mathrm dT_r}
=
\frac{D_r}{D_t}
=
\frac{1+u_r}{1-u_t},
$$

and therefore

$$
\frac{\mathrm dR}{\mathrm dT_r}
=
1-\frac{\mathrm dT_t}{\mathrm dT_r}
=
-\frac{u_r+u_t}{1-u_t}.
$$

On any regular section after inward motion begins,
$u_r+u_t>0$. Division yields

$$
\boxed{
\frac{\mathrm du}{\mathrm dR}
=
-\frac{K}{R^2(u_r+u_t)}
}.
$$

This identity is branch-local but sufficient because the admissible
subfield census has already proved that exactly one partner root is active and
that no self root is active.

Plainly: Complete root accounting turns the full regular branch sum into the
one partner contribution used here. The reduction is derived, not assumed.

## First-exit theorem

Choose a regular section $(R_1,u_1)$ after inward acceleration has begun.
While no certified sector boundary and no receiver field-speed event has
occurred,

$$
0<u_r+u_t<2.
$$

Hence

$$
-\frac{\mathrm du}{\mathrm dR}
>
\frac{K}{2R^2}.
$$

For $R<R_1$, integration gives

$$
u(R)-u_1
\ge
\frac{K}{2}
\left(
\frac{1}{R}-\frac{1}{R_1}
\right).
$$

The lower bound reaches $1-u_1$ at

$$
\underline R_{\mathrm{fs}}
=
\left[
\frac{1}{R_1}
+
\frac{2(1-u_1)}{K}
\right]^{-1}
>0.
$$

Therefore, if no root-topology, retained-history, or other regularity boundary
occurs first, continuity forces a receiver field-speed event

$$
u(T_{\mathrm{fs}})=1
$$

with

$$
R(T_{\mathrm{fs}})
\ge
\underline R_{\mathrm{fs}}
>0.
$$

The root interval ending at $T_{\mathrm{fs}}$ is compact and has
$u(\tau)<1$ for every $\tau<T_{\mathrm{fs}}$. Thus $\bar u<1$, and the exact
geometry gives

$$
q(T_{\mathrm{fs}})
=
\frac{1-\bar u}{2}R(T_{\mathrm{fs}})
>0.
$$

Let $T_q$ be the first same-event coordinate coincidence and $T_b$ the first
certified non-field-speed regular-sector boundary. The proved ordering is

$$
\boxed{
\min(T_{\mathrm{fs}},T_b)<T_q
}
$$

whenever $T_q$ exists and the history begins inside
$\mathcal H_{\mathrm{att}}^{\mathrm{reg}}$. If $T_b$ does not occur first,
then $T_{\mathrm{fs}}<T_q$.

Claim class: **proved admissible-history theorem**. No in-class counterexample
exists unless one of the stated root, history, sign, regularity, or evolution
assumptions fails; such a failure is itself the theorem's certified
alternative.

Plainly: The inverse-square attractive row makes the speed reach one while the
delayed range is still bounded away from zero. Coordinate coincidence cannot
win the race on this chart.

## Provenance and first-exit ledger

The proof consumes and preserves the following distinct rows:

- both ordered partner roots, related by mirror symmetry but retained as
  separate receiver/transmitter incidences;
- the inactive self-root complements before field speed;
- partner delayed range $R$, current half-separation $q$, receiver speed
  $u_r$, emission speed $u_t$, $D_t$, and $D_r$;
- any partner or self endpoint, fold, birth, or accumulation;
- the retained-history edge and positive history margin; and
- loss of mirror symmetry, persistent labels, monotone inward motion, or
  regular acceleration as explicit exits.

Deleting a root, treating current receiver speed as $D_t$, or reading an
incomplete history as a zero-root proof invalidates the theorem record.

Plainly: The theorem depends on knowing every active and inactive causal root
and on keeping current and delayed quantities separate.

## Outside-class counterexamples and exclusions

The theorem is not universal. The following classes are excluded for precise
reasons.

### No active attractive root

If the partner-root bracket or nonzero attractive contribution is removed, a
subfield affine inward history

$$
q(T)=q_0-v(T-T_0),
\qquad
0<v<1,
$$

reaches $q=0$ without reaching $u=1$. This is an exact kinematic
counterexample to the broader claim. It is not an in-class canonical
attractive solution because it omits the required nonzero partner
acceleration.

Plainly: Inward motion alone does not prove the theorem. The active canonical
attraction is essential.

### Initially superfield history

If $u\ge1$ already occurs in the relevant retained interval, then
$D_t=1-u_t$ can vanish or change sign, self roots can be admitted, and the
subfield uniqueness proof does not apply. Such data already contain the event
the theorem was meant to order.

Plainly: A history that starts beyond the threshold cannot test which event a
subfield approach reaches first.

### Nonmonotone history

If the labels reverse, overshoot, or retrace, the fixed line-of-action and
positive inward-coordinate assumptions can fail. Root directions can change,
and the scalar mirror identities no longer define one regular approach
interval. Prescribed nonmonotone paths can cross the common coordinate with
subfield instantaneous speed, so they refute any purely kinematic universal
no-crossing claim.

Plainly: A path that turns around is not the one-way approach proved here.

### Initially multi-root history

Multiple partner roots require the emission-time root function to lose the
strict monotonicity used above, or require a prior history outside the
subfield monotone chart. The acceleration then contains a complete sum over
branches, and the one-root reduced identity cannot be substituted for that
sum. Any folds or births already belong to a different root-topology sector.

Plainly: Once several delayed emissions arrive together, every branch must be
kept. A single-root proof cannot be promoted by selecting only one of them.

### Incomplete retained history

If the retained interval does not bracket every possible partner and self
root, absence of a root row is not evidence of absence. An implementation
that drops the missing partner contribution can display a subfield coordinate
crossing, but that output is an incomplete-history artifact, not a
counterexample to the theorem.

Plainly: A calculation cannot prove no causal contact when it did not retain
enough history to find the contact.

These exclusions cannot support a universal no-crossing conclusion. They also
cannot be used to refute the theorem on
$\mathcal H_{\mathrm{att}}^{\mathrm{reg}}$ without first supplying an
in-class history satisfying every stated condition.

## Nonclaims

The theorem orders the first exit only. It does not determine what happens at
receiver field-speed arrival, a coincident same-transmitter birth, a partner
fold, a history edge, or any other boundary. It establishes no passage,
rebound, coordinate crossing, outgoing retained history, boundary value,
physical interpretation, conserved account, stability, MEC-005 closure,
MEC-006 closure, or acceptance.

# Proposed changes

## Queue disposition

The newly added MEC-006 priority-only theorem target already states the
necessary admissible class, proof obligations, outside-class exclusions, and
nonclaims. No corrective queue edit is required after this investigation.

Its proof disposition should be read as follows:

- **proved** for $\mathcal H_{\mathrm{att}}^{\mathrm{reg}}$ with an active
  bracketed partner root, complete census, positive history margin, nonzero
  attractive contribution, and canonical regular evolution until first exit;
- **not proved** for initially superfield, nonmonotone, initially multi-root,
  incomplete-history, zero-root, or nonattractive histories; and
- **not a continuation theorem** at either receiver field speed or any other
  certified boundary.

Plainly: The queue wording is already narrow enough. This packet supplies the
proof and the exact limits of that wording.

## Minimal reusable proof certificate

Any later calculation invoking this theorem should provide only the existing
MEC-006 evidence fields needed to instantiate the proof:

1. the initial retained-history partner-root sign bracket;
2. the complete ordered partner and self-root census;
3. positive delayed-range, $D_t$, and retained-history margins;
4. the nonzero attractive $K$ and inward acceleration component;
5. the exact $R$, $q$, $u_r$, $u_t$, $\bar u$, $D_t$, and $D_r$ rows; and
6. the first event among receiver field speed and the predeclared
   root-topology, history, and regularity boundaries.

No new gate, solver fixture, or acceptance surface is needed. Failure of any
field places the history outside the theorem or records alternative
$T_b$; it does not license filling the missing value.

Plainly: A future run needs to show that it is really in the proved class, not
build another layer of process around the theorem.

# Items to disposition into the priorities directory

| Item | Owner | Disposition | Exact result | Boundary |
| --- | --- | --- | --- | --- |
| Admissible-history pre-coincidence first-exit ordering | `MEC-006` receiver wake-gradient closure | `proved priority result` on $\mathcal H_{\mathrm{att}}^{\mathrm{reg}}$; status unchanged | With a complete subfield monotone mirror census, active bracketed partner root, positive history margin, and nonzero attractive canonical contribution, either receiver field speed or a certified regular-sector boundary occurs strictly before $q=0$ | No claim for initially superfield, nonmonotone, initially multi-root, incomplete-history, zero-root, or nonattractive data |
| Post-exit behavior | Existing MEC-006 boundary program and separate coincident-transition owner | `unresolved` | Preserve the first-exit event and all incident root provenance; do not assign an outgoing history | No continuation, passage, physical claim, MEC closure, or acceptance |

Plainly: The theorem closes the ordering question only for its admissible
history class. Every boundary value remains open.
