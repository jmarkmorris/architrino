# Research findings

## Scope and result

This packet asks only whether the existing canonical delayed Master Equation
admits a regular mirror-symmetric continuation immediately after the first
receiver field-speed event in the stationary separated-at-rest,
opposite-polarity encounter. It adds no boundary value, core, finite width,
impulse, braking rule, or constitutive factor.

The result is a defined existing-law obstruction:

- the partner root remains positive-range, simple, regular, and
  inward-directed at the threshold;
- no older retained-history self root exists;
- any continuous regular continuation must initially enter $u>1$ because the
  surviving partner contribution is inward and nonzero;
- that entry creates exactly one positive-delay self root per label from the
  excluded diagonal;
- the new self contribution is also inward-directed; and
- its canonical acceleration measure is not locally finite at birth.

Therefore the unmodified canonical sharp-root law does **not** admit a regular
Carathéodory or locally finite measure continuation across this first
threshold. This is not a selected alternative evolution. It is the failure of
the current open-domain row sum to define one.

Claim class: **derived local obstruction for the declared stationary mirror
encounter**. No passage, rebound, coordinate crossing, outgoing history,
boundary value, or wider initial-data theorem follows.

Plainly: The regular partner contribution carries the approach to field
speed. Immediately beyond that event, the law admits a new self root whose
accumulated inward acceleration is infinite. The equation stops being a
regular evolution before it can answer what happens next.

## Canonical row and threshold notation

Set $c_f=1$ and write the persistent mirror histories as

$$
\mathbf X_-(T)=-q(T)\mathbf e,
\qquad
\mathbf X_+(T)=q(T)\mathbf e,
\qquad
u(T)=-\dot q(T).
$$

Let $T_\ast$ be the first reception time at which

$$
u(T_\ast)=1.
$$

The previously verified incoming theorem gives

$$
q(T_\ast)>0,
\qquad
R_{\mathrm p}(T_\ast)>0,
$$

where $R_{\mathrm p}$ is the partner delayed range. For any admitted simple
root with range $R$ and transmitter factor $D_t$, the canonical acceleration
row is

$$
\mathbf A
=
K\,\sigma\,
\frac{\hat{\mathbf r}}{R^2\lvert D_t\rvert},
\qquad
D_t
=
1-\hat{\mathbf r}\cdot\mathbf V_t(T_t),
$$

with fixed $K>0$ for the relevant polarity magnitude. Receiver playback is

$$
\frac{\mathrm dT_t}{\mathrm dT_r}
=
\frac{D_r}{D_t},
\qquad
D_r
=
1-\hat{\mathbf r}\cdot\mathbf V_r(T_r),
$$

but $D_r$ is not an instantaneous acceleration multiplier.

Plainly: The sign and size of each current acceleration row come from
polarity, delayed direction, range, and the transmitter factor. The direction
in which the receiver traverses the root affects playback, not the row's
polarity.

## Partner root through receiver field speed

For the left receiver and right transmitter,

$$
\hat{\mathbf r}_{\mathrm p}=-\mathbf e,
\qquad
\mathbf V_t(T_t)=-u(T_t)\mathbf e,
\qquad
\mathbf V_r(T_r)=u(T_r)\mathbf e.
$$

Thus

$$
D_{t,\mathrm p}=1-u(T_t),
\qquad
D_{r,\mathrm p}=1+u(T_r).
$$

At $T_r=T_\ast$, the partner emission time satisfies $T_t<T_\ast$. The
stationary-release speed is strictly below one at every earlier time, so

$$
D_{t,\mathrm p}(T_\ast)>0,
\qquad
D_{r,\mathrm p}(T_\ast)=2.
$$

The partner root is therefore simple at positive range. The implicit-function
theorem preserves it on any sufficiently small prescribed one-sided history
extension while its retained-history margin remains positive.

Because the labels have opposite polarity,

$$
\sigma_{\mathrm p}=-1.
$$

For the left receiver,
$\sigma_{\mathrm p}\hat{\mathbf r}_{\mathrm p}=+\mathbf e$, which is the
inward direction. The partner contribution is finite, continuous, nonzero,
and inward at $T_\ast$.

Claim class: **derived regular partner-row result**. Receiver field speed is
not a partner fold and supplies no outward acceleration row.

Plainly: The partner surface arriving at the threshold was emitted earlier,
while the transmitter was still below field speed. That row continues to push
inward and remains mathematically ordinary.

## Complete local partner census

For a partner emission candidate $s<T_r$, define

$$
F_{T_r}(s)
=
q(T_r)+q(s)-(T_r-s).
$$

On the retained pre-threshold interval,

$$
\partial_sF_{T_r}(s)=1-u(s)>0.
$$

The existing retained-history bracket therefore contains exactly one partner
root. For $T_r>T_\ast$ sufficiently close to $T_\ast$, the old root remains
inside its simple-root tube. On the new short interval
$s\in[T_\ast,T_r)$, both $q(T_r)$ and $q(s)$ remain close to the positive
value $q(T_\ast)$, so

$$
F_{T_r}(s)>0
$$

after shrinking the one-sided interval if necessary. No new near-diagonal
partner root is present there.

Hence the immediate post-threshold partner census remains one root in each
ordered partner channel. A later partner fold, birth, or additional root is
not excluded globally, but it is not the event adjacent to $T_\ast$.

Plainly: The old partner root persists, and the still-positive present
separation prevents a second partner root from appearing right next to the
current event.

## Older retained-history self roots

For either label, choose the scalar coordinate $x(T)$ increasing inward, so
that

$$
\dot x(T)=u(T).
$$

A positive-delay self root $(T_r,T_s)$ satisfies

$$
x(T_r)-x(T_s)=T_r-T_s,
$$

equivalently

$$
\int_{T_s}^{T_r}\bigl(u(\tau)-1\bigr)\,\mathrm d\tau=0.
$$

Before $T_\ast$, the stationary-release retained history has $u<1$, so the
integral is strictly negative for every $T_s<T_r\le T_\ast$. There is no
older positive-delay self root waiting in retained history at the threshold.
The only equality at $T_r=T_\ast$ is the zero-delay diagonal
$T_s=T_r=T_\ast$, which the canonical admission set excludes.

Claim class: **derived complete pre-threshold self-root exclusion**. An older
braking self row is not missing from the ledger.

Plainly: Nothing emitted earlier by the same label has caught it by the
threshold. The only self-root topology available next is birth from the
excluded same-time endpoint.

## Why a regular continuation must enter the superfield side

Assume for contradiction that the canonical equation has a regular
one-sided continuation: velocity is continuous, the complete acceleration
sum defines a locally finite measure, and no new boundary rule is inserted.

At $T_\ast$, the only active rows are the two mirror partner incidences. Each
is finite, nonzero, and inward. The root gaps above exclude an immediate
outward or additional singular row from older history. A locally finite
continuation therefore has

$$
u(T_r)>1
$$

for all sufficiently close $T_r>T_\ast$.

Avoiding $u>1$ would require an outward acceleration contribution or a
velocity jump supported at the threshold. The complete canonical ledger
contains neither: a jump is not a regular continuation, and no undeclared
boundary impulse may be inserted.

Plainly: With only the current law in play, there is nothing finite at the
threshold that can turn the inward acceleration around or hold the speed at
one.

## Exact self-root birth

Define

$$
h(T)=x(T)-T,
\qquad
\dot h(T)=u(T)-1.
$$

The function $h$ decreases strictly before $T_\ast$ and, under the assumed
regular continuation, increases immediately after it. Therefore $h$ has a
strict local minimum at $T_\ast$. For every sufficiently close
$T_r>T_\ast$, there is exactly one $T_s<T_\ast$ such that

$$
h(T_s)=h(T_r).
$$

Equivalently, the exact self-root condition is

$$
\boxed{
\int_{T_s}^{T_r}\bigl(u(\tau)-1\bigr)\,\mathrm d\tau=0
}.
$$

Write

$$
w_-=1-u(T_s)>0,
\qquad
w_+=u(T_r)-1>0,
\qquad
\rho=T_r-T_s>0.
$$

For the left label, the past self-emission point lies farther outward than the
current receiver point. Hence

$$
\hat{\mathbf r}_{\mathrm s}=+\mathbf e.
$$

Self polarity has

$$
\sigma_{\mathrm s}=+1,
$$

so

$$
\sigma_{\mathrm s}\hat{\mathbf r}_{\mathrm s}=+\mathbf e.
$$

The emerging self row points inward. Its root factors are

$$
D_{t,\mathrm s}=w_->0,
\qquad
D_{r,\mathrm s}=-w_+<0.
$$

It is a simple positive-delay root for every $T_r>T_\ast$, even though
$\rho$, $D_{t,\mathrm s}$, and $D_{r,\mathrm s}$ all approach zero at the
coincident endpoint birth.

Plainly: The self contribution is acceleration away from the label's past
position. Because that past position lies outward, the contribution points
inward. Negative root playback does not turn it into braking.

## Exact acceleration-measure identity

The canonical self-row magnitude is

$$
A_{\mathrm s}
=
\frac{K_{\mathrm s}}{\rho^2w_-},
\qquad
K_{\mathrm s}>0.
$$

Root playback gives

$$
\frac{\mathrm dT_s}{\mathrm dT_r}
=
\frac{D_{r,\mathrm s}}{D_{t,\mathrm s}}
=
-\frac{w_+}{w_-}.
$$

Therefore

$$
\frac{\mathrm d\rho}{\mathrm dT_r}
=
1-\frac{\mathrm dT_s}{\mathrm dT_r}
=
\frac{w_-+w_+}{w_-}
>0.
$$

Changing variables from reception time to self delay yields the exact
one-sided acceleration measure

$$
\boxed{
A_{\mathrm s}\,\mathrm dT_r
=
\frac{K_{\mathrm s}}
{\rho^2(w_-+w_+)}
\,\mathrm d\rho
}.
$$

As $T_r\downarrow T_\ast$,

$$
\rho\to0,
\qquad
w_-\to0,
\qquad
w_+\to0.
$$

For a sufficiently small root tube,

$$
0<w_-+w_+<1,
$$

so

$$
A_{\mathrm s}\,\mathrm dT_r
>
\frac{K_{\mathrm s}}{\rho^2}\,\mathrm d\rho.
$$

Consequently

$$
\int_{T_\ast}^{T_\ast+\varepsilon}
A_{\mathrm s}(T_r)\,\mathrm dT_r
=
\infty
$$

for every sufficiently small $\varepsilon>0$. The self row has infinite total
variation and, because its direction is fixed inward, an infinite signed
inward integral as well.

Claim class: **derived contact-order-independent local nonintegrability** for
every continuous genuine crossing admitted by the assumed regular
continuation. Unlike the earlier $\delta^{-3}$ transverse model, this measure
proof does not require a finite nonzero right derivative or a particular
power-law contact.

Plainly: Measuring the newborn self root by its own delay makes the divergence
unavoidable. The delay shrinks to zero, and the remaining velocity gap makes
the denominator smaller still.

## Complete sign ledger and absence of finite braking

Immediately after $T_\ast$, the complete local census and directions are:

| Root class | Count per receiver | Range and transmitter factor | Canonical direction |
| --- | ---: | --- | --- |
| Persistent partner root | one | positive and bounded away from zero locally | inward |
| Newly born self root | one | positive for each post-threshold reception, both tending to zero at birth | inward |
| Older self roots | zero | excluded by the complete subfield retained history | none |
| Additional near-threshold partner roots | zero | excluded by the positive local root-function gap | none |

The canonical acceleration weight uses $\lvert D_t\rvert$. The negative
$D_{r,\mathrm s}$ of the self root changes playback direction but not
acceleration direction or magnitude. Every active row is inward, so there is
no same-order outward contribution available for cancellation. In particular,
the current law supplies no finite braking contribution at or immediately
after the threshold.

Claim class: **derived local sign result**. It depends on the stationary
monotone pre-coordinate-crossing geometry and does not extend to arbitrary
nonmonotone or previously superfield retained histories.

Plainly: All admitted rows near the threshold push the same way. The only new
row is not a brake; it is the nonintegrable obstruction.

## Smallest proof route and precise falsifier

The smallest existing-law proof route consists of four checks:

1. certify the positive-range partner root, its positive $D_t$, inward sign,
   and inactive partner-root complement at $T_\ast$;
2. certify absence of every older self root from the stationary subfield
   retained history;
3. prove the unique post-threshold self root from
   $h(T_s)=h(T_r)$ and record its inward sign; and
4. verify the exact delay-measure identity

   $$
   A_{\mathrm s}\,\mathrm dT_r
   =
   \frac{K_{\mathrm s}}
   {\rho^2((1-u(T_s))+(u(T_r)-1))}
   \,\mathrm d\rho.
   $$

These checks establish both the absence of a finite canonical braking row and
the failure of local integrability without selecting any boundary
prescription.

The result is falsified by one independently verified, complete canonical
one-sided chart for the same stationary mirror input that simultaneously:

- admits every partner and self root with unchanged canonical signs and
  nonzero $K_{\mathrm s}$;
- preserves the retained-history and inactive-complement certificates;
- uses no added width, impulse, root deletion, playback multiplier, or
  constitutive factor; and
- has

  $$
  \lim_{\epsilon\downarrow0}
  \int_{T_\ast+\epsilon}^{T_\ast+\varepsilon}
  \sum_\ell
  \left\|\mathbf A_\ell(T)\right\|
  \,\mathrm dT
  <\infty.
  $$

An exact canonical outward row with the same singular support would also
falsify the no-braking sign ledger, but it must appear in the complete root
census rather than be inferred from coordinate symmetry or receiver playback.

Plainly: A counterexample must keep the same law and every root, then produce
a genuinely finite complete acceleration measure. A smoother plot or a
deleted self row is not a counterexample.

## Exact existing-law obstruction

The first receiver field-speed event is simultaneously the closure point of a
coincident same-transmitter endpoint birth:

$$
\rho\to0,
\qquad
D_{t,\mathrm s}\to0,
\qquad
D_{r,\mathrm s}\to0.
$$

The diagonal root itself is excluded, but every immediately post-threshold
positive-delay self root is admitted by the existing causal-root law. The
canonical inverse-square row and transmitter-side arrival-density factor then
produce a non-locally-finite inward acceleration measure. Omitting the
diagonal value does not remove the divergent open-side accumulation.

This is the exact obstruction. The law defines regular partner and self rows
away from the birth but does not define a finite velocity update or outgoing
retained history across their singular limit. No repair is proposed here.

Plainly: Assigning no value at the single threshold event cannot cure the
infinite accumulation from all positive-delay events immediately beside it.

No continuation, passage, rebound, coordinate crossing, boundary value,
physical claim, conserved account, stability, MEC-005 closure, MEC closure, or
acceptance is advanced.

# Proposed changes

## Preserve the result as priority-only obstruction evidence

Treat the exact delay-measure identity and complete inward sign ledger as
priority-only evidence that the unmodified sharp-root law does not supply a
regular post-field-speed continuation for this stationary mirror encounter.
Do not promote it into reader-facing corpus material while the coincident
same-transmitter transition remains unresolved.

Plainly: The useful result is a precise stopping reason, not a replacement
evolution.

## No additional MEC-007 queue target

The MEC-007 row owns the one-sided self-root tube, complete root census,
delayed-range and Jacobian asymptotics, signed acceleration integral, total
variation, retained-history margin, and family-independent disposition of any
claimed outgoing history. The calculation above resolves the
local-integrability and sign subquestion negatively for the unchanged
stationary mirror law, so it creates no additional unchanged-law target.

The remaining queue burden is not another audit of the same open-domain
kernel. It is the already-owned question whether any separately authorized
coincident-transition law can be derived and independently accepted. This
packet supplies no candidate.

Plainly: The present queue already asks the right question. This result answers
one branch with `Not advanced` and leaves the boundary-law owner unchanged.

# Items to disposition into the priorities directory

| Item | Live owner | Disposition | Exact result | Claim boundary |
| --- | --- | --- | --- | --- |
| Stationary mirror post-field-speed continuation under the unchanged sharp-root law | `MEC-007` mirror close-approach causal-root boundary | `priority-only` obstruction evidence; status unchanged | One regular inward partner root persists; one inward self root is born per label; older self and additional local partner roots are absent; the exact self delay measure is non-locally-finite | No regular continuation or finite braking contribution under the existing law |
| Coincident same-transmitter transition | MEC-003 transition-law ownership with MEC-007 encounter-boundary evidence | `unresolved`; no new target added | Any finite outgoing history requires a separately derived and authorized boundary law, which this packet does not propose | No passage, rebound, boundary value, physical claim, MEC closure, or acceptance |

Plainly: The existing law supplies a proof of obstruction, not the missing
transition.
