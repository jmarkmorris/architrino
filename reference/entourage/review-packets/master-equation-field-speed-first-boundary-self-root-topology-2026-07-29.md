# Research findings

## Authority and scope

This packet independently checks the reported first-boundary result against
the live canonical Master Equation and its causal-root conventions. The
external audit is treated as research guidance, not acceptance authority. The
derivations below use only the canonical acceleration kernel, causal-root
constraint, transmitter-side Jacobian, persistent labels, mirror symmetry,
stationary retained history, and normalized wake speed $c_f=1$.

Claim class: **derived on the declared regular chart** where stated;
**conditional local geometry** for any prescribed post-threshold extension;
and **unresolved** wherever the canonical law supplies no boundary value or
outgoing retained history.

Plainly: The incoming theorem can be checked from the current equation. The
geometry can also say which roots would appear just beyond the threshold, but
that does not mean the equation has supplied a legal way to evolve through the
threshold.

## Declared mirror chart

Let the persistent left and right labels have positions

$$
\mathbf X_-(T)=-q(T)\mathbf e,
\qquad
\mathbf X_+(T)=q(T)\mathbf e,
$$

and define the inward speed

$$
u(T)=-\dot q(T).
$$

On the incoming monotone strict-subfield chart,

$$
q(T)>0,
\qquad
0\le u(T)<1.
$$

For the partner root received by the left label at $T_r$ from the right label
at $T_t<T_r$, define

$$
R=T_r-T_t,
\qquad
u_r=u(T_r),
\qquad
u_t=u(T_t).
$$

The partner line of action and velocities are

$$
\hat{\mathbf r}=-\mathbf e,
\qquad
\mathbf V_t(T_t)=-u_t\mathbf e,
\qquad
\mathbf V_r(T_r)=u_r\mathbf e.
$$

Therefore the canonical transmitter and receiver factors are

$$
D_t=1-\hat{\mathbf r}\cdot\mathbf V_t=1-u_t,
\qquad
D_r=1-\hat{\mathbf r}\cdot\mathbf V_r=1+u_r.
$$

The attractive partner contribution points in the positive $\mathbf e$
direction for the left label and has magnitude

$$
\frac{\mathrm du}{\mathrm dT_r}
=
\frac{K}{R^2(1-u_t)},
\qquad
K>0.
$$

Plainly: The arriving partner root depends on the transmitter's earlier
speed. Current receiver speed affects how that root is replayed, but it does
not enter the canonical acceleration numerator.

## Independent verification of the reduced identity

The canonical root-playback identity gives

$$
\frac{\mathrm dT_t}{\mathrm dT_r}
=
\frac{D_r}{D_t}
=
\frac{1+u_r}{1-u_t}.
$$

Since $R=T_r-T_t$,

$$
\frac{\mathrm dR}{\mathrm dT_r}
=
1-\frac{\mathrm dT_t}{\mathrm dT_r}
=
-\frac{u_r+u_t}{1-u_t}.
$$

After motion has begun, $u_r+u_t>0$. Dividing the canonical acceleration
component by the range derivative yields

$$
\boxed{
\frac{\mathrm du}{\mathrm dR}
=
-\frac{K}{R^2(u_r+u_t)}
}.
$$

Claim class: **independently rederived identity on the canonical monotone,
one-partner-root, strict-subfield branch**. The derivation fails at the initial
instant if $u_r=u_t=0$, where $R$ is momentarily stationary, but it holds on
every later regular section with $u_r+u_t>0$, $R>0$, and $D_t>0$.

Plainly: As the delayed range decreases, the inward speed must increase. The
transmitter bunching factor cancels from this particular derivative because
the same factor controls how fast the root range is replayed.

## Positive-range field-speed first boundary

Choose any regular incoming section $(R_0,u_0)$ after motion has begun. While
the strict-subfield chart persists,

$$
0<u_r+u_t<2.
$$

Hence

$$
-\frac{\mathrm du}{\mathrm dR}
=
\frac{K}{R^2(u_r+u_t)}
>
\frac{K}{2R^2}.
$$

For $R<R_0$, integration gives

$$
u(R)-u_0
\ge
\frac{K}{2}
\left(
\frac{1}{R}-\frac{1}{R_0}
\right).
$$

The right-hand side reaches $1-u_0$ at the positive range

$$
\underline R_{\mathrm{fs}}
=
\left[
\frac{1}{R_0}
+
\frac{2(1-u_0)}{K}
\right]^{-1}
>0.
$$

Therefore the regular strict-subfield branch cannot reach $R=0$: if no root,
history, or regularity boundary occurs earlier, continuity forces

$$
u(T_\ast)=1
$$

at some

$$
R_\ast\ge\underline R_{\mathrm{fs}}>0.
$$

For the stationary-history monotone release, the incoming complete census
supplies exactly one partner root and no positive-delay self root before
$T_\ast$. Indeed, the partner root function has emission-time derivative
$1-u(T_t)>0$, while any self-root interval would require an average speed of
exactly one and is impossible when every speed on that interval is strictly
below one. A finite retained-history implementation must additionally certify
that its history margin stays positive through $T_\ast$.

Claim class: **derived first-boundary theorem under the complete-census and
retained-history assumptions**. The first exit is the receiver's
strict-subfield kinematic threshold at positive delayed range. It is not a
zero-range event.

The exact partner geometry also gives

$$
R=\frac{2q(T_r)}{1-\bar u},
\qquad
\bar u
=
\frac{1}{T_r-T_t}
\int_{T_t}^{T_r}u(\tau)\,\mathrm d\tau.
$$

At $T_\ast$, every earlier speed on the partner interval is below one, so
$1-\bar u>0$. Thus $R_\ast>0$ also implies $q(T_\ast)>0$: the field-speed
threshold precedes present-coordinate coincidence on this chart.

Plainly: The incoming calculation reaches field speed while both the present
half-separation and the partner's delayed range are still positive. The event
is not a coordinate crossing or a delayed-range collision.

## Partner root at the threshold

At the threshold, $T_t<T_\ast$. Because this is the first time the current
speed reaches one and the incoming speed is monotone,

$$
u(T_t)<1.
$$

Consequently

$$
D_t^{\mathrm{partner}}
=
1-u(T_t)
>0,
\qquad
D_r^{\mathrm{partner}}
=
1+u(T_\ast)
=
2.
$$

The existing partner root remains positive-range, simple, and covered by the
canonical regular-root formula at $T_\ast$. The implicit-function theorem
continues that root locally for any prescribed one-sided history extension
that keeps $D_t^{\mathrm{partner}}>0$, retains the emission point, and
introduces no additional root boundary.

Claim class: **derived threshold result**. The field-speed exit is not a
transmitter-side partner fold. A later partner fold is possible only if an
admitted partner emission reaches $D_t=0$; it is not selected as the next
event by the threshold theorem.

Plainly: The receiver reaches field speed, but the partner's arriving causal
surface was emitted earlier when the transmitter was still below field speed.
That arriving partner root is ordinary at the threshold.

## Self-root census at the threshold

For either persistent label, choose the scalar coordinate $x(T)$ increasing
along its inward direction, so that

$$
\dot x(T)=u(T).
$$

A positive-delay self root $(T_r,T_s)$ with $T_s<T_r$ must satisfy

$$
x(T_r)-x(T_s)=T_r-T_s,
$$

or equivalently

$$
\int_{T_s}^{T_r}\bigl(u(\tau)-1\bigr)\,\mathrm d\tau=0.
$$

At $T_r=T_\ast$, the integrand is strictly negative for every
$\tau<T_\ast$ and vanishes only at the endpoint. Therefore

$$
\int_{T_s}^{T_\ast}\bigl(u(\tau)-1\bigr)\,\mathrm d\tau<0
\qquad
\text{for every }T_s<T_\ast.
$$

There is no positive-delay self root exactly at the threshold. The only
zero-delay solution is $T_s=T_\ast$, which the canonical admission set
excludes by the strict condition $T_s<T_r$.

Claim class: **derived exact root-exclusion result at the threshold**. It does
not assign a value to the excluded diagonal and does not prove a finite
transition through a root born from that diagonal.

Plainly: At the threshold, no earlier emission from the same label has caught
up with it. The same-time diagonal is not an admitted causal hit.

## Exact post-threshold birth condition

Define

$$
h(T)=x(T)-T,
\qquad
\dot h(T)=u(T)-1.
$$

On the incoming side, $h$ decreases strictly toward $T_\ast$. For any
prescribed continuous one-sided extension with $u(T)>1$ immediately after
$T_\ast$, $h$ increases immediately after $T_\ast$. Thus $h$ has a strict
local minimum at the threshold. For every sufficiently close
$T_r>T_\ast$, continuity and strict one-sided monotonicity give a unique
$T_s<T_\ast$ such that

$$
\boxed{
h(T_s)=h(T_r)
}
$$

or, equivalently,

$$
\boxed{
\int_{T_s}^{T_r}\bigl(u(\tau)-1\bigr)\,\mathrm d\tau=0
}.
$$

This is the exact birth condition for the first positive-delay self root. It
states that the average speed over the self-root interval is one. On that
post-threshold root,

$$
T_s<T_\ast<T_r,
\qquad
u(T_s)<1<u(T_r),
$$

and therefore

$$
D_t^{\mathrm{self}}=1-u(T_s)>0,
\qquad
D_r^{\mathrm{self}}=1-u(T_r)<0.
$$

The root is simple on every positive-delay post-threshold section, while its
branch closure at $T_s=T_r=T_\ast$ has zero range and vanishing one-sided
transmitter and receiver factors. It is a coincident same-transmitter endpoint
birth, not an ordinary positive-range partner fold.

Claim class: **exact conditional root-topology theorem** for any prescribed
one-sided history that genuinely crosses from $u<1$ to $u>1$. The canonical
Master Equation does not itself supply that outgoing history.

Plainly: If a path is drawn smoothly beyond the threshold, its first
same-transmitter root appears immediately. The emission lies just before the
threshold and the reception lies just after it.

## Transverse local normal form and singularity

If the prescribed extension is $C^2$ and crosses transversely with

$$
a=\dot u(T_\ast)>0,
$$

write $\delta=T_r-T_\ast$. The matching condition above gives

$$
T_\ast-T_s
=
\delta+O(\delta^2),
$$

so the self delayed range and root factors obey

$$
R_{\mathrm{self}}
=
T_r-T_s
=
2\delta+O(\delta^2),
$$

$$
D_t^{\mathrm{self}}
=
a\delta+O(\delta^2),
\qquad
D_r^{\mathrm{self}}
=
-a\delta+O(\delta^2).
$$

With a nonzero canonical self coupling magnitude $K_{\mathrm{self}}$, the
emerging regular-row magnitude therefore scales as

$$
A_{\mathrm{self}}
\sim
\frac{K_{\mathrm{self}}}{4a\,\delta^3}.
$$

This reproduces the live MEC-006 same-history near-diagonal family. Its
time-integrated absolute acceleration is not locally finite. It therefore
rules out an ordinary $C^2$ transverse continuation that simply evaluates the
bare canonical self row on the emerging branch.

Claim class: **derived conditional local no-go** for the transverse
prescribed-extension class. A tangential crossing, a field-speed plateau,
nonsmooth history, or separately authorized boundary law requires its own
analysis. No finite boundary value is inferred.

Plainly: The post-threshold self root is mathematically simple at every
positive delay, but its acceleration becomes too singular as the delay shrinks
to zero. Ordinary root simplicity does not make the birth integrable.

## What remains possible after the threshold

The exact geometry supports the following bounded conclusions:

- The existing partner root is simple at $T_\ast$ and remains so locally on
  any prescribed extension while its transmitter factor and history margin
  stay positive.
- No positive-delay self root exists at $T_\ast$.
- Any genuine one-sided crossing to $u>1$ creates a positive-delay self root
  immediately after $T_\ast$ under the exact average-speed-one condition.
- A transverse smooth extension encounters the nonintegrable coincident
  self-root birth scaling above.
- A later partner fold or partner-root birth remains possible when the
  emission-time root geometry develops $D_t=0$, but neither is forced to be
  the next event by the first-boundary theorem.
- A finite retained-history edge, loss of regularity, higher-order
  field-speed contact, root accumulation, or another declared boundary can
  intervene and must remain visible in the complete census.

Because the canonical law supplies no value at the coincident
same-transmitter birth, it does not determine an actual post-threshold
trajectory. Events after that unresolved boundary cannot be chronologically
ordered without adding or deriving a continuation rule.

Plainly: The first new root topology is visible, but the law stops at the
birth singularity. It cannot yet say whether the paths pass, turn, develop a
partner fold, or reach some later boundary.

No continuation, passage, rebound, fold resolution, physical interpretation,
conserved account, stability, MEC-005 closure, MEC-006 closure, or acceptance
is advanced.

# Proposed changes

## Record the theorem and replace the completed incoming proof target

Record under MEC-006 that the canonical identity

$$
\frac{\mathrm du}{\mathrm dR}
=
-\frac{K}{R^2(u_r+u_t)}
$$

is independently verified on the declared incoming branch and, together with
the complete stationary-history root census, proves that the first regular
chart exit is $u(T_\ast)=1$ at $R_\ast>0$. At that event the partner root has
$D_t>0$, remains simple, and no positive-delay self root exists.

Plainly: The incoming question is no longer which boundary occurs first. It
is now what the emerging self-root boundary permits, if anything.

## Smallest post-threshold proof target

Use one certified one-sided threshold tube

$$
[T_\ast-\varepsilon,T_\ast+\varepsilon]
$$

and require:

1. the complete partner-and-self root census on shrinking one-sided sections,
   including inactive-complement proofs;
2. an interval proof that the partner root remains positive-range and simple;
3. an interval proof of existence and uniqueness of the emerging self root
   under

   $$
   \int_{T_s}^{T_r}(u(\tau)-1)\,\mathrm d\tau=0;
   $$

4. certified asymptotics or bounds for
   $R_{\mathrm{self}}$, $D_t^{\mathrm{self}}$, and
   $D_r^{\mathrm{self}}$ for transverse, higher-order, and plateau contacts;
5. the retained-history margin, signed all-root acceleration integral, and
   total variation under section and admissible-history refinement; and
6. a proof of uniqueness and family-independence for any claimed outgoing
   history.

The target returns `Not advanced` if the root census is incomplete, the
history margin closes, the emerging self measure is not locally finite, or a
claimed outgoing history depends on the section sequence, contact order,
regularization, or prescribed extension family.

Plainly: Certify the root that is born at the threshold and test whether its
accumulated acceleration can define one unique outgoing history. If it cannot,
record the obstruction without inventing a continuation.

This is one refinement of the existing MEC-006 boundary program, not a new
gate or a new owner. It preserves the separate MEC-003 coincident-transition
closure burden and supplies no result for MEC-005 consumption.

# Items to disposition into the priorities directory

| Item | Live owner | Disposition | Exact result or next action | Claim boundary |
| --- | --- | --- | --- | --- |
| Positive-range field-speed first boundary | `MEC-006` receiver wake-gradient closure | `derived priority result`; status unchanged | Record that the verified reduced identity and complete stationary-history census force $u(T_\ast)=1$ at $R_\ast>0$, with a simple partner root and no positive-delay self root at the event | Not a partner fold, continuation, passage, or MEC closure |
| Immediate post-threshold self-root topology | `MEC-006` receiver wake-gradient closure, with the existing MEC-003 coincident-transition burden preserved | `priority-only` proof target | Certify the one-sided partner/self root tube, exact average-speed-one self-root birth, contact-order asymptotics, retained-history margin, and signed-integral and total-variation limits | No outgoing history or boundary value unless existence, local finiteness, uniqueness, and family-independence are proved |

Plainly: MEC-006 should record the completed incoming theorem and own the
smallest next root-topology calculation. The unresolved coincident-transition
law remains where it already belongs and is not silently closed.
