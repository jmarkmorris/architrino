# Borg Display-Grade Scale and Operating Contract

## Scope

This packet owns the display-grade scale, memory, accuracy-labeling, and
forward protocol rules used by Borg. It does not weaken certified-grade
publication or change the master equation.

## Display accuracy claim

Display grade is a watchable numerical trajectory, not evidence. Its declared
`5%` target is a preset-calibration condition, not a universal error bound.
For a named seed, population, model controls, initial datum, horizon $T$, and
controller ceiling $h$, let $x_i^{(h)}(T)$ and $x_i^{(h/2)}(T)$ be the endpoint
positions from otherwise identical display runs. With spherical envelope
radius $R$, define

$$
E_{\mathrm{track}}(T;h)
=
\frac{1}{R}\max_i
\left\|x_i^{(h)}(T)-x_i^{(h/2)}(T)\right\|_2.
$$

The default preset is calibrated only on controls for which
$E_{\mathrm{track}} \le 0.05$. This is a step-height self-convergence check:
it detects material height sensitivity, but it is not independent evidence of
the true solution and does not bound every seed or later time. The UI and
response provenance therefore remain `display-only` and promotion-ineligible.

Claim grade: `derived-design`. Falsifier: the default preset is presented as a
global 5% guarantee, a recorded control exceeds `0.05`, or display output is
accepted as evidence.

## Physical-input separation

Run grade selects numerical authority only. Changing `display` to `certified`
must not change coupling, polarity counts, initial positions or velocities,
minimum separation, seeding radius, field speed, core scale, or any other
physical input. Borg's interactive initial-condition values are one app preset
shared by both grades. The grade toggle marks the next run pending but does not
rewrite those values.

Claim grade: `derived-design`. Falsifier: toggling grade changes any physical
control or regenerates a different initial datum before the operator starts a
new distribution.

## Indexed pair ledgers

For $N$ paths there are $P=N^2$ ordered pairs. Warning deduplication, warned-
pair persistence, and warm-root lookup use indexed keys rather than linear
searches through $P$-row vectors. Their bookkeeping work is therefore
$O(P\log P)$ with deterministic ordered maps, rather than $O(P^2)=O(N^4)$.
Serialized output remains in deterministic pair order.

Claim grade: `derived-design`. Falsifier: any per-pair loop performs a linear
scan of the complete warning, persistence, or warm-root ledger.

## Incremental retained history

The persistent Borg worker owns the complete accepted retained history after a
successful request. Protocol `PATH` rows carry an exact cached-prefix segment
count and only the appended suffix. A prefix mismatch is a protocol error; the
worker never guesses, clamps, or evaluates against a different segment. A new
worker receives a zero-prefix full history. The response continues to publish
only newly accepted extensions.

The display evaluator reads numeric coefficients already parsed by each cubic
segment. It does not rebuild a second numeric copy of every historical segment
for every endpoint correction. Accepted chunk-boundary display snapshots may
be reused only when the reception time, model key, and complete history
fingerprints match.

Claim grade: `derived-design`. Falsifier: a suffix is accepted against a
different prefix, a restarted worker receives an incremental-only request, or
a reused snapshot has a mismatched history fingerprint.

## Memory envelope

Every request carries one positive memory budget. Before evolution, the EOM
solver computes a conservative request working-set estimate consisting of the
retained cubic rows, display numeric pair workspace or certified pair ledger,
path-level state, and protocol/cache overhead. If the estimate exceeds the
budget, the request halts as `memory_budget_exhausted` with no extension
published. The response reports both budget and estimate.

Claim grade: `derived-design`. Falsifier: a request whose declared estimate is
above its budget enters evolution or publishes a segment.

## Display root isolation

Far-subluminal sources keep the unique monotone bracket. Other display sources
use adaptive subdivision. A cell is discarded only when a binary64
residual-variation bound, formed from the cached cubic velocity and
acceleration bounds, excludes zero. Sign-changing cells are solved by
safeguarded Newton/bisection. A source-normal sign change also isolates a
multiple-root contact; the residual-tolerance neighborhood around that one
located contact is treated as one display-resolution stratum. The exact
coincident zero-delay self endpoint remains excluded, while delayed self roots
remain in the search. A near-tangent cell that reaches the declared time
resolution without a resolved root fails as
`display_root_isolation_unresolved`; it is never silently omitted.

This remains an uncertified binary64 route. The rule prevents the former fixed
four-samples-per-segment omission path but does not create a root certificate.

Claim grade: `derived-design`. Falsifier: the implementation retains a fixed
sample count as root-completeness authority or publishes after an unresolved
adaptive cell.

Each display snapshot records the root count for every ordered pair. When an
accepted-step candidate changes that count, the existing `FWC-ENTRY-02`
warning is emitted immediately; display grade does not run the finite-width
certification ladder. A regulated pair without a count change emits
`DISPLAY-REGULATOR-01`.

Claim grade: `derived-design`. Falsifier: a display step changes a pair's root
count without a warning, or dispatches the certified finite-width ladder.

## Forward protocol

`EOM_BORG_NATIVE_V5` is the only accepted protocol. Its `RUN` row has exactly
24 fields, adding the declared core scale and memory budget. Its `PATH` row has
exactly six fields: record tag, path id, charge, state flags, cached-prefix
segment count, and appended-segment count. There is no V4 or full-history
fallback parser.

Claim grade: `derived-design`. Falsifier: a different field count or older
magic is accepted.

## Display replacement time domain

A visual replacement transform applies only at and after its recorded start
time. Scrubbing to an earlier frame displays the original solver position.
The transform never changes retained history or EOM input.

Claim grade: `derived-design`. Falsifier: a frame before the transform start
uses the replacement offset.

## Certified pair-selection cascade

Certified snapshots apply pair selection in this order: certified traversal
exclusion, certified per-pair far-field enclosure on traversal survivors, then
exact root search for the remaining pairs. The complete ledger remains

$$
P_{\mathrm{logical}}
=P_{\mathrm{excluded}}+P_{\mathrm{enclosed}}
+P_{\mathrm{exact}}+P_{\mathrm{unresolved}}.
$$

Failure of either optional optimization sends its affected pair to the next
more exact stage or leaves it unresolved fail-closed; it never omits a pair.

Claim grade: `derived-design`. Falsifier: enabling far-field enclosure disables
traversal, or the reported ledger does not equal $P_{\mathrm{logical}}$.
