# Fixed-Law Source Continuation

## Status And Ownership

- Owner: `EMAP-004`, the Noether sea electromagnetic constitutive map.
- Status: executable score-neutral continuation evaluator implemented;
  EOM-solver population remains blocked on an accepted retained
  source--sea--receiver branch.
- Current claim grade: `candidate_only`. The checked-in prescribed return-map
  fixture tests the evaluator and pair gate; it is not retained geometry or
  electromagnetic evidence.
- Numerical convention: $c_f=1$ in every continuation row.

This packet implements the Session 19 continuation contract through the weak
signed response and first recorded geometric transition. It does not insert an
electric field or amplitude-dependent coefficient into the Master Equation.
The source-loading coordinate $\zeta$ changes the declared physical source
preparation while the per-hit law, coefficients, regulator, projection,
tolerances, common history prefix, and architrino identity inventory remain
fixed.

Plainly: the machinery for asking whether one unchanged causal law responds
linearly at first and then reaches a geometric boundary now runs. The present
input is a prescribed diagnostic, not the missing physical branch.

## Executable Artifacts

- Evaluator:
  [fixed-law-source-continuation.mjs](../../../scripts/mapping-electromagnetism/fixed-law-source-continuation.mjs)
- Candidate-only input:
  [fixed-law-source-continuation-candidate.v1.json](../../../scripts/mapping-electromagnetism/fixed-law-source-continuation-candidate.v1.json)
- Test:
  [fixed-law-source-continuation.test.js](../../../tests/fixed-law-source-continuation.test.js)

Run the current diagnostic with:

```bash
node scripts/mapping-electromagnetism/fixed-law-source-continuation.mjs \
  --input scripts/mapping-electromagnetism/fixed-law-source-continuation-candidate.v1.json \
  --require-transition --pretty
```

Plainly: `--require-transition` fails when the input never reaches a declared
native boundary. Reaching a boundary does not by itself make the input retained
or identify the boundary with pair production.

## Fixed-Record Contract

Every amplitude row must bind to the same values of:

| Binding | Meaning |
| --- | --- |
| `lawFingerprint` | Master Equation and per-hit acceleration law identity |
| `coefficientFingerprint` | Fixed native coefficient set |
| `regulatorFingerprint` | Fixed sharp or finite-width regulator convention |
| `projectionFingerprint` | Fixed internal return-section coordinates and readout |
| `toleranceFingerprint` | Fixed numerical and acceptance tolerances |
| `sourceFamilyId` | One physically prepared source family indexed by $\zeta$ |
| `commonHistoryPrefixId` | Common source, sea, receiver, and boundary history prefix |
| `architrinoIdentityDigest` | Fixed pre-continuation architrino inventory |

Each row must also carry source, sea, receiver, and wake-history identifiers;
transmitter tags; a nonempty internal state vector; root identities; $D_t$,
$D_r$, and $W^{\mathrm{acc}}$; and the four transition margins. The evaluator
checks

$$
W^{\mathrm{acc}}=\frac{1}{|D_t|}
$$

because this numerical packet fixes $c_f=1$.

Plainly: changing the source geometry is allowed. Changing the interaction
rule, readout definition, tolerances, inventory, or initial-history family
between amplitudes is hidden retuning and rejects the record.

## Weak Signed Response

Let $z(\zeta)$ denote the declared transverse internal state on the same return
section. From the smallest available signed pair $\pm h$, the evaluator forms

$$
\mathbf b_h
=
\frac{z(h)-z(-h)}{2h}.
$$

It then tests every predeclared weak row against the common tangent:

$$
R_{\mathrm{weak}}(\zeta)
=
\frac{
\left\|
z(\zeta)-z(0)-\zeta\mathbf b_h
\right\|
}{
\left\|\zeta\mathbf b_h\right\|+\epsilon
}.
$$

The weak row passes only when at least two signed pairs are present and the
maximum residual remains below the fixed weak-linearity tolerance. This is the
finite-record implementation of the retained-return-map lemma; it does not
prove that the supplied baseline is retained.

Plainly: one signed pair estimates the local direction of response and another
checks it. A single two-point chord cannot certify a linear regime by checking
itself.

## First Geometric Transition

For every positive-$\zeta$ row, the evaluator reports the geometric departure

$$
R_{\mathrm{geom}}(\zeta)
=
\frac{
\left\|
z(\zeta)-z(0)-\zeta\mathbf b_h
\right\|
}{
\left\|\zeta\mathbf b_h\right\|+\epsilon
}
$$

and selects the smallest sampled $\zeta>0$ at which at least one declared
native margin reaches its boundary:

$$
\zeta_*
=
\min\left\{
\zeta>0:
\nu_J\le\tau_*,
\ g_{\mathrm{inactive}}\le\tau_*,
\ \lambda_{\mathrm{sec}}\le\tau_*,
\ d_{\mathrm{collision}}\le\tau_*,
\ \text{or the retained branch status changes}
\right\}.
$$

The transition classification remains explicit:

- causal-root transversality boundary;
- inactive-root gap closure;
- return-section stability boundary;
- collision boundary requiring quarantine; or
- another declared branch-status change.

Plainly: the first transition is whatever native certificate changes status
first. It is not automatically a strong-field threshold, branch decay, or
electron--positron pair event.

## Pair-Capture And Backreaction Gate

Pair capture is eligible only when the same record supplies all of the
following:

1. an accepted retained source--sea--receiver branch;
2. a certified retained electron basin with protected polarity inventory
   $-6$;
3. a certified retained positron basin with protected polarity inventory
   $+6$;
4. reciprocal electron/positron conjugate-branch identifiers; and
5. one common record identifier for the continuation and both basin
   certificates.

If any item is absent, an included pair-attempt record is rejected and no
backreaction row is evaluated. If the gate passes, a supplied attempt must
retain the fixed-law and identity bindings, exact identity partition, net
polarity, source/sea/product/remnant/boundary continuation, and event-ledger
residual. The evaluator never manufactures an attempt merely because basin
certificates exist.

Plainly: the code can neither call a geometric transition “pair production”
nor evaluate screening unless independently certified electron and positron
destinations already exist on the same retained record.

## Current Candidate-Only Result

The prescribed input has source-preparation rows

$$
\zeta\in
\{-0.10,-0.05,0,0.05,0.10,0.30,0.50,0.70\}.
$$

The executable report returns:

| Output | Candidate-only result |
| --- | --- |
| Input digest | `700ae368ccaa4568ce776c61cb3e662e7548a4985407065d6691741413f26c03` |
| Fixed-record invariants | pass for the prescribed input |
| Weak tangent | $(2,-0.99975)$ from $h=0.05$ |
| Maximum weak residual | $0.013421270833935123<0.02$ |
| First sampled transition | $\zeta_*=0.70$ |
| Transition class | inactive-root gap closure |
| Previous retained sample | $\zeta=0.50$ |
| Pair gate | skipped: certified conjugate basins absent |
| Pair capture attempted | no |
| Backreaction evaluated | no |
| Overall status | `candidate_only_first_transition_reached` |
| Score decision | no score change |

Plainly: the candidate data exercise the complete weak-response and
first-transition calculation. They say nothing about where a real retained
assembly would transition because the data were prescribed to test the
instrument.

## Verification Reach

The test suite establishes implementation behavior for:

- weak-tangent and residual calculation;
- rejection when four weak rows do not contain two actual signed pairs;
- earliest-transition selection;
- rejection of amplitude-specific coefficient retuning;
- rejection of a pair attempt without certified conjugate basins;
- rejection when either conjugate basin belongs to another record;
- opening the pair gate without manufacturing a pair attempt;
- pair and backreaction evaluation after every gate condition passes; and
- failure when no first transition is supplied.

These same-change tests verify the implementation contract. They are not an
independent physical oracle and do not validate the prescribed return map, a
retained assembly, a Noether sea constitutive law, or pair production.

Plainly: the tests show that the evaluator follows its declared rules,
including the refusal to overclaim. The next evidence must come from an EOM
solver record rather than another hand-authored fixture.

## EOM-Solver Population Boundary

The next admissible input is a normalized manifest assembled from one
EOM-solver source-loading family. It must provide:

- an accepted retained baseline and complete retained-history prefix;
- EOM-solver continuation rows for the signed weak pair and increasing
  positive $\zeta$;
- fixed per-hit, coefficient, regulator, projection, tolerance, and inventory
  fingerprints;
- transmitter-tagged root and wake ledgers at every row;
- an accepted return-section derivative or an equivalent accepted transverse
  state projection; and
- the first EOM-certified transversality, inactive-gap, stability, collision,
  or branch-status boundary.

The evaluator deliberately has no fallback that upgrades a prescribed input.
Until this manifest exists, the current blocker remains
`missing_accepted_eom_evolved_retained_source_sea_receiver_branch`.

Plainly: implementation closure is complete for the evaluator. Physical
continuation remains blocked on the branch that the EOM solver must actually
evolve.
