# A1.1 Receiver-Phase Projection Monotonicity Certificate

Date: `2026-07-28`

Status: `evaluated-diagnostic`, `continuous-positive-projection`,
`null-score`, `prescribed-path-only`, `diagnostic-only`, and `priority-only`.

## Scope and fixed geometry

This receipt records a continuous certificate for the map from emission phase
$\epsilon$ to reception phase $\theta$ on the six A1.1 channels whose
complete root inventory uses an emission-fixed chart. It seals the existing
$36$-channel inventory and structural ledger. The frozen radius box remains

$$
\frac78\le\alpha_1\le\frac{15}{16},
\qquad
\alpha_2=1,
\qquad
\frac{17}{16}\le\alpha_3\le\frac98.
$$

The relative braid phases remain exactly
$(0,2\pi/3,4\pi/3)$. Only the common cycle coordinate varies. No relative
phase offset, radius boundary, history reach, source identity, or geometry
family changes.

Plainly: the certificate follows the approved circular drawing around one
cycle. It does not vary the drawing's three relative phase placements or
search a larger family.

The diagnostic owner is the
[projection protocol](../../../../src/prescribed-path-analysis/protocols/a1-1-receiver-phase-projection-monotonicity-protocol.v1.json)
executed by the prescribed-only
[certifier](../../../../src/prescribed-path-analysis/A11ReceiverPhaseProjectionMonotonicityCertifier.mjs).
It does not evolve a path, invoke the EOM solver or its interval machinery,
calculate energy or action, or assign a candidate score.

## Projection derivative

Let $r$ be the inner receiver radius, $t$ the transmitter radius, $\delta$ the
positive dimensionless delay, and $q$ the signed shared-coordinate dot
component of the two prescribed circle points. The squared causal root
condition is

$$
G=r^2+t^2-2rtq-\delta^2=0,
$$

so every root satisfies

$$
q=\frac{r^2+t^2-\delta^2}{2rt}.
$$

For fixed reception phase, write
$q_\delta=\left.\partial_\delta q\right|_\theta$. The exact orthogonal-circle
forms are either a signed $\sin A\cos B$ product with
$q_\delta$ proportional to $\sin A\sin B$, or a signed
$\cos A\sin B$ product with $q_\delta$ proportional to
$-\cos A\cos B$. Hence

$$
q^2+q_\delta^2\le1.
$$

Plainly: the dot component and its reception-fixed delay derivative are
orthogonal components of the same unit-circle factor. Their squared
magnitudes cannot sum to more than one.

Define

$$
P(r,t,\delta)
=
4\delta^2
-
\bigl((r+t)^2-\delta^2\bigr)
\bigl(\delta^2-(t-r)^2\bigr).
$$

At a causal root,

$$
\delta^2-r^2t^2q_\delta^2
\ge
\frac{P}{4}.
$$

Writing $x=\delta^2$ gives

$$
P=x^2+x\bigl(4-2(r^2+t^2)\bigr)+(r^2-t^2)^2.
$$

For $t=1$, this convex polynomial increases over the admitted causal interval,
so its minimum is the lower causal endpoint:

$$
P\ge4(1-r)^2\ge\frac1{64}.
$$

For $17/16\le t\le9/8$, a boundary minimum is at least $1/16$. If the convex
vertex lies inside the causal interval, its value is

$$
4(t^2-1)(1-r^2)
\ge
\frac{1023}{16384}.
$$

Therefore $P$ is strictly positive throughout both transmitter classes.

Plainly: the frozen unequal-radius gaps keep the root away from the geometric
condition that could let the reception derivative flatten or reverse.

The reception-fixed squared-root derivative is

$$
\left.\partial_\delta G\right|_\theta
=
-2(\delta+rtq_\delta).
$$

The preceding bound yields the continuous margins

$$
\left.\partial_\delta G\right|_\theta
\le
\begin{cases}
-1/368, & t=1,\\[4pt]
-341/34048, & 17/16\le t\le9/8.
\end{cases}
$$

At fixed emission phase
$\epsilon=(\theta-\delta)\bmod2\pi$, only the inner receiver moves as
$\delta$ varies. Its prescribed speed satisfies $r\le15/16$, so the causal
residual derivative is at most $-1/16$. On the root sheet this gives

$$
\left.\partial_\delta G\right|_\epsilon
\le
\begin{cases}
-1/128, & t=1,\\[4pt]
-1/64, & 17/16\le t\le9/8.
\end{cases}
$$

Both derivatives are therefore strictly negative over the complete declared
root sheets.

Plainly: neither the emission-fixed root coordinate nor the reception-fixed
coordinate can turn vertical or reverse anywhere in the frozen family.

Since

$$
\theta(\epsilon)=\epsilon+\delta(\epsilon),
\qquad
\frac{d\theta}{d\epsilon}
=
\frac{\left.\partial_\delta G\right|_\theta}
{\left.\partial_\delta G\right|_\epsilon},
$$

the receiver-phase projection is strictly increasing. Conservative
continuous enclosures are

$$
\frac8{22103}
\le
\frac{d\theta}{d\epsilon}
\le736
$$

for the middle-transmitter class and

$$
\frac1{798}
\le
\frac{d\theta}{d\epsilon}
\le399
$$

for the outer-transmitter classes.

Plainly: the lower bounds are deliberately loose, but they are positive. The
map preserves phase order continuously; the earlier node samples are no
longer carrying this conclusion.

## Six-channel disposition

| Receiver class | Transmitter class | Ordered channels | Continuous lower bound |
| --- | --- | ---: | ---: |
| Inner layer | Middle layer | $2$ | $8/22103$ |
| Inner layer | Outer layer | $4$ | $1/798$ |

Three endpoint-inversion representatives carry the exact bounds. Their three
paired channels reuse the same certified identity, with all six ordered rows
retained in the result.

The phase seam obeys
$\theta(\epsilon+2\pi)=\theta(\epsilon)+2\pi$. Strict positivity and the
degree-one seam relation make the projection an orientation-preserving
one-to-one map of the phase circle. Thus the already certified one-root
emission sheet also supplies one prescribed root at each reception phase for
these six channels.

Plainly: every reception phase meets each declared sheet once. This completes
the chart conversion inside the imposed circular family; it does not establish
an EOM-retained trajectory.

## Controls and falsifiers

All predeclared controls passed:

- the base protocol, complete $36$-channel inventory, structural-ledger
  protocol, result, summary, and raw-ledger hashes matched;
- the structural ledger's $5{,}204$ independent residual rows remained sealed;
- $324$ endpoint-inversion comparisons had zero enclosure-endpoint
  difference;
- $36$ phase-seam replays had maximum enclosure-endpoint difference
  $1.865174681370263\times10^{-14}$ against the $10^{-12}$ tolerance;
- twelve minimum/maximum-delay witnesses were independently recomputed, with
  maximum normalized residual $4.1107755093159406\times10^{-16}$;
- finite-difference reception and emission squared-derivative differences
  were respectively at most $2.3372859203618646\times10^{-10}$ and
  $3.6065195274659345\times10^{-10}$ against the $10^{-6}$ tolerance; and
- synthetic positive, negative, indeterminate, and resource-exhaustion
  controls returned their required dispositions.

A radius or relative-phase change, a nonpositive polynomial bound, either
root derivative reaching zero, a failed seam or provenance check, an
independent residual or derivative miss, or a resource-exhausted fallback
would falsify or fail closed the corresponding conclusion. The score remains
null in every disposition.

Plainly: the negative controls can distinguish a positive certificate from a
counterexample, an unresolved sign, and insufficient resources. No failure is
converted into candidate rejection or acceptance.

## Evidence identity

The protocol hash is
`6dc5b65ae6d8ffce78018c75142a74ba02169522e34eb191c4b7c441caabc237`.
The result hash is
`75de3038ee36b4058ae86a44f1045b421a344f4cd3c91cb1cf080ba00758a447`.
The [durable summary](a1-1-receiver-phase-projection-monotonicity-summary.v1.json)
hash is
`15a8c88c64792797f6b4bae16cd9876ad1cde4a3a56bac7133a09382fa9152df`.
The ignored complete ledger is
`.local-data/braid-program/a1-1/a1-1-receiver-phase-projection-monotonicity.v1.json.gz`.

## Closure boundary

The continuous receiver-phase projection obligation is complete at
prescribed-path diagnostic grade for the six emission-fixed classes. This
closes the sampled-versus-continuous chart gap identified by the structural
ledger.

It does not establish retention, stability, binding, physical
superluminal transport, physical realization, energy, action,
angular-momentum dynamics, radiation, pressure, GR recovery, or physical
candidate selection.

Plainly: the causal-root bookkeeping for the imposed circular family is now
consistent in both emission and reception phase coordinates. Nothing here
says that the EOM solver or nature produces the family.
