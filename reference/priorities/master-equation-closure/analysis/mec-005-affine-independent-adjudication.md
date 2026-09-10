# Independent Adjudication of the Affine Causal-Root Census

## Scope and verdict

The exact finite, collinear, piecewise-affine root theorem in [the pairwise owner](pairwise-causal-root-ledger-closure.md#bounded-raw-history-reconstruction-and-lineage) passes independent mathematical adjudication at its stated prescribed-history scope. The signed equations below independently reconstruct its ten open branches, four positive-delay self branches, eighteen bundle-local point events, twenty incident half-branches, two structural self-diagonal carriers, and twenty-four signed factors. Corners retain unassigned boundary multiplicity and quarantined evaluation semantics. This accepts the bounded geometry theorem; it does not accept the general MEC-005 certificate or an EOM continuation law.

This is the exclusive analytical output for revised campaign effort 6. The theorem, implementation, and implementation tests are subjects held read-only. The coordinator owns all queue and shared-synthesis changes. No source account, acceleration value, or conserved quantity is inferred from oriented root counting.

> Claim grade: derived. The bounded verdict follows from the complete sign-sector proof, explicit census, and endpoint incidence below. Falsifier: an additional positive-delay zero on the declared causal domain, a listed line failing its signed equation or clipping inequalities, or a wrong endpoint incidence. Each can be checked directly using the histories and tables below. Implementation validation is separately recorded and cannot enlarge the theorem's scope.

## Domain and independent factorization

A reception time is denoted by $T$ and an earlier emission time by $s$. Work at $c_f=1$ on $T_0\le T\le T_1$, $L\le s\le T$, where $L<T_0<T_1$ are rational. The two labeled histories are continuous, collinear, and have finitely many rational affine pieces on $[L,T_1]$. Each receiving history is affine throughout the reception interval. Write its coordinate as $uT+d$ and one transmitting piece as $vs+b$ on $[a,z]$. Require $v\ne\pm1$. Exclude persistent roots on a genuine source knot or memory edge, a genuine receiver knot inside the slab, and persistent partner coincidence from the reconstructible class. These restrictions define an exact geometric class, without declaring the prescribed paths to be EOM solutions.

Let $y=uT+d-vs-b$ be the signed displacement. The causal residual is $G=|y|-(T-s)$. On the sector $\eta y\ge0$, with $\eta=\pm1$, direct expansion gives

$$
G=(1-\eta v)s+(\eta u-1)T+\eta(d-b).
$$

Consequently the candidate zero line and its derivative factors are

$$
s=mT+k,\qquad
m=\frac{1-\eta u}{1-\eta v},\qquad
k=\frac{\eta(b-d)}{1-\eta v},\qquad
D_t=1-\eta v,\qquad D_r=1-\eta u.
$$

The sign-sector identity is $G=D_t[s-(mT+k)]$. At a candidate zero with $s<T$, the signed equation itself gives $\eta y=T-s>0$, so no additional direction test is missing. Conversely, every positive-delay norm root has exactly one such sign. A point with $y=0$ and $s<T$ has $G=-(T-s)<0$ and cannot be a root.

Clipping the line requires exactly

$$
T\in[T_0,T_1],\quad mT+k-a\ge0,\quad z-mT-k\ge0,\quad (1-m)T-k\ge0.
$$

Every condition is a closed half-line, the whole line, or the empty set. Their intersection is therefore empty, a point, or one closed interval. A nonconstant affine inequality nonnegative on an interval can vanish in its interior only if it is identically zero. Thus, after the exact diagonal and persistent-face cases are separated, the interval interior has positive delay and lies strictly inside its source piece. It forms one regular branch. Its endpoints and isolated clipped points are boundary events. The whole domain is covered by the finitely many source pieces and the two displacement signs, so this construction is exhaustive rather than a test of selected reception slices.

At $s=T$, self coincidence supplies the structural diagonal carrier, not active roots. Different-label contact must be found independently from $(u_i-u_j)T+(d_i-d_j)=0$: it can occur without an attached positive-delay branch. Identical receiver lines produce persistent coincidence and require a separate chart. This distinction prevents an empty active-root list from erasing a contact boundary.

> Claim grade: derived. The factorization proves finite branch enumeration and the entire nonzero complement within the declared class, including source-piece boundaries retained as events. Falsifier: a norm zero that escapes the sign-sector dichotomy or survives all clipping inequalities without appearing in the corresponding clipped line. No strictly positive uniform gap is asserted on a complement approaching a root; pointwise nonvanishing is sufficient for this bounded theorem and does not satisfy a stronger envelope requirement for certified gap cells by itself.

## Exact control and all signed candidates

Reuse the existing control with $L=-8$ and $I=[0,1]$:

$$
x_1(t)=\begin{cases}-4,&-8\le t\le-2,\\2t,&-2\le t\le0,\\0,&0\le t\le1,\end{cases}
\qquad x_2(t)=\frac12-x_1(t).
$$

Both receiving coordinates are stationary, so $D_r=1$. Call the source intervals old shelf $[-8,-2]$, ramp $[-2,0]$, and recent shelf $[0,1]$. The following twelve signed equations cover the two representative bundles; reflection gives the remaining twelve by reversing $\eta$ and the source velocity together. Reflection preserves the emission line and $D_t$.

| Bundle | Source piece | $\eta$ | $D_t$ | Candidate line | Complete clipping disposition |
| --- | --- | ---: | ---: | --- | --- |
| $1\leftarrow1$ | Old shelf | $+1$ | $1$ | $s=T-4$ | Branch for $0<T<1$ |
| $1\leftarrow1$ | Old shelf | $-1$ | $1$ | $s=T+4$ | Outside source and causal domain |
| $1\leftarrow1$ | Ramp | $+1$ | $-1$ | $s=-T$ | Branch for $0<T<1$; diagonal attachment at zero |
| $1\leftarrow1$ | Ramp | $-1$ | $3$ | $s=T/3$ | Only the point $(0,0)$ survives source clipping |
| $1\leftarrow1$ | Recent shelf | $+1$ | $1$ | $s=T$ | Excluded diagonal |
| $1\leftarrow1$ | Recent shelf | $-1$ | $1$ | $s=T$ | Excluded diagonal |
| $1\leftarrow2$ | Old shelf | $-1$ | $1$ | $s=T-9/2$ | Branch for $0<T<1$ |
| $1\leftarrow2$ | Old shelf | $+1$ | $1$ | $s=T+9/2$ | Outside source and causal domain |
| $1\leftarrow2$ | Ramp | $-1$ | $-1$ | $s=1/2-T$ | Branch for $1/2<T<1$ |
| $1\leftarrow2$ | Ramp | $+1$ | $3$ | $s=T/3+1/6$ | Outside the ramp throughout the slab |
| $1\leftarrow2$ | Recent shelf | $-1$ | $1$ | $s=T-1/2$ | Branch for $1/2<T<1$ |
| $1\leftarrow2$ | Recent shelf | $+1$ | $1$ | $s=T+1/2$ | Negative delay |

For $2\leftarrow2$ use the first six rows with reversed direction; for $2\leftarrow1$ use the last six with reversed direction. The isolated ramp candidate at $(0,0)$ is the same geometric self boundary as the incident $s=-T$ branch endpoint. It contributes no additional branch or multiplicity. The two recent self factors represent one excluded carrier per self bundle, not duplicate active roots.

There are two self branches per self bundle and three partner branches per partner bundle, hence ten branches in total. Every listed branch has multiplicity one because $D_t\ne0$. Its orientation is $\operatorname{sgn}D_t$ and its signed playback is $m=D_r/D_t$. A negative orientation is not a negative acceleration weight: the regular geometric Jacobian weight is $1/|D_t|$, if an otherwise admitted acceleration row consumes it.

The complement follows from all twenty-four candidate factors and their clipping dispositions. Every interior point off the retained zero lines has a nonzero signed residual in its own sign sector; at zero displacement its residual is strictly negative. No additional example or sampled grid is needed to prove this complement.

## Eighteen point events and twenty incidences

Orient each open branch by increasing reception time. Its initial endpoint has incidence coefficient $-1$, its final endpoint $+1$. Define the unsigned slice-count jump as minus the sum of incidence coefficients and the oriented jump as minus the sum after multiplication by $\operatorname{sgn}D_t$. At the reception interval edges these are domain-entry and domain-exit counts; they make no claim about histories outside the slab.

The next table lists all nine event types. Each self row occurs once in each self bundle, and each partner row once in each partner bundle, yielding eighteen distinct bundle-local points. The germ column gives the number of incident open half-branches.

| Bundles | $(T,s)$ | All meeting faces | Germs | Unsigned jump | Oriented jump |
| --- | --- | --- | ---: | ---: | ---: |
| Each self bundle | $(0,-4)$ | Receiver start | 1 | $+1$ | $+1$ |
| Each self bundle | $(1,-3)$ | Receiver end | 1 | $-1$ | $-1$ |
| Each self bundle | $(0,0)$ | Receiver start, source knot, excluded diagonal | 1 | $+1$ | $-1$ |
| Each self bundle | $(1,-1)$ | Receiver end | 1 | $-1$ | $+1$ |
| Each partner bundle | $(0,-9/2)$ | Receiver start | 1 | $+1$ | $+1$ |
| Each partner bundle | $(1,-7/2)$ | Receiver end | 1 | $-1$ | $-1$ |
| Each partner bundle | $(1/2,0)$ | Source knot | 2 | $+2$ | $0$ |
| Each partner bundle | $(1,-1/2)$ | Receiver end | 1 | $-1$ | $+1$ |
| Each partner bundle | $(1,1/2)$ | Receiver end | 1 | $-1$ | $-1$ |

Each of the ten branches has two ends, producing twenty incidences. The two partner corner events each join two branch starts, so identifying their repeated endpoints reduces twenty endpoints to eighteen event points. The self-diagonal carriers are separate one-dimensional boundary objects and are not included in the point-event count. No root reaches $s=-8$ in this control.

At either partner corner the residual as a function of emission time is $G=1/2-s-T$ for $s<0$ near zero and $G=1/2+s-T$ for $s>0$. Thus it is locally $1/2+|s|-T$: at $T=1/2$ it has a corner, not a differentiable quadratic fold. Its two outgoing roots have opposite orientations and cancel only in the oriented count. Local smooth-fold multiplicity two is not established and must not be assigned. At the self attachment the delay on $s=-T$ is $2T$; it approaches zero at the nonsmooth source corner. This prescribed attachment is not evidence for smooth EOM self-birth lineage.

> Claim grade: derived. The tables give complete bundle-local incidence and count jumps for this control. Falsifier: an endpoint not in the event table, a missing face at $(0,0)$, or assigning the two partner corner germs the same orientation. Direct substitution in the piecewise residual tests each case. Smooth continuation, boundary acceleration, and account values are outside this result.

## Identity under exact subdivision

On any affine interval a subdivision point lies on the same line. Its two child intervals therefore have exactly the same slope and intercept as the parent. Conversely a genuine slope change cannot be removed by joining equal affine coefficients. Repeated merging of adjacent equal lines gives the unique maximal affine decomposition of a continuous finite piecewise-affine function.

Use this decomposition, the labeled histories, and the domain to identify the input. A branch descriptor then consists of its ordered bundle, maximal source interval, displacement direction, emission-line coefficients, and clipped reception endpoints. An event descriptor consists of the ordered bundle and exact coordinates. These descriptors are unchanged by adding collinear subdivision knots or permuting traversal order. Each branch endpoint resolves to the same event descriptor, proving preservation of both directions of incidence. Different ordered bundles remain separate even at equal coordinates.

The implementation hashes normalized input descriptors and serializes branch descriptors into identifiers. The exact mathematical identity is the descriptor; treating its finite SHA-256 digest as unique is an engineering content-addressing assumption, not an injectivity theorem about hashes. No hash agreement is used here to prove the root equations. Equality under subdivision is exact for identical normalized descriptors.

This correspondence concerns different representations of the same history. A changed history has a new input identity and may change topology; continuation through a genuine history-family change requires a separate correspondence proof. Bundle-local root and event uniqueness also does not prove unique emission debiting across different receiver bundles.

> Claim grade: derived. Exact subdivision preserves the canonical geometric descriptors and incidence. Falsifier: two different maximal decompositions of the same finite piecewise-affine function, or an unchanged descriptor whose endpoint resolves to a different bundle-local coordinate. Cryptographic collision resistance and cross-history lineage are not mathematical conclusions of this proof.

## Reused stationary and asymmetric controls

For the existing stationary control, $x_1=0$ and $x_2=2$ on $[-4,1]$, each partner equation is $2=T-s$, giving $s=T-2$ over the whole reception slab. Each self residual is $-(T-s)$, giving no positive-delay self root. There are four endpoint events and two structural self carriers. This was the known-answer case used before the independent checking instrument was run on the target.

For the existing asymmetric control, take $x_1=0$ and $x_2=3+2t$ on $[-4,1]$. The $1\leftarrow2$ equation is $|3+2s|=T-s$. Its positive-source-position sector gives $s=T/3-1$, $D_t=3$, while its negative-source-position sector gives $s=-T-3$, $D_t=-1$. Both survive throughout $0\le T\le1$. The $2\leftarrow1$ receiver has position $3+2T>0$, so its sole partner root is $s=-T-3$, with $D_t=1$, $D_r=-1$, and playback $-1$. Self roots would require $0=T-s$ for the stationary history or $2(T-s)=T-s$ for the moving one, hence neither has positive-delay self roots. The two older partner lines meet $s=-4$ at $T=1$, under different bundle owners. Each endpoint must record both receiver-end and memory-edge faces. These exact three roots test the source/receiver asymmetry that the reflected ten-branch control alone cannot test.

## Conservative unresolved dispositions

At $v=\eta$, the emission coefficient vanishes and the signed equation becomes $(\eta u-1)T+\eta(d-b)=0$, independent of $s$. Whenever it holds with a nonempty clipped emission interval, roots form an interval rather than isolated simple roots. Rejecting every unit-slope source piece as unresolved is conservative: it also rejects cases where that equation has no admissible zero, without falsely certifying emptiness. A receiver piece is also part of its own source history, so the same rejection includes unit-speed receiver pieces.

Persistent roots on source knots or the memory edge require boundary strata of positive dimension. Genuine receiver knots require separate reception charts. Persistent partner coincidence requires a diagonal contact carrier beyond the isolated-point route. Finitely encoded affine knots cannot express an infinite-piece accumulation theorem; unsupported or accumulating representations must remain unresolved. Within the accepted finite non-unit-slope class, each piece contributes at most two clipped lines, so accumulation of isolated root components cannot occur.

The implementation's common `unresolved_strata` label mentions intervals or accumulation even for malformed input or a receiver-knot failure. Its specific `reason` preserves the actual rejection. This generic label must not be interpreted as proof that an interval or accumulation exists. All such failures remain consumer-disabled. Smooth folds, higher multiplicity, and smooth diagonal-birth lineage require new mathematics on the corresponding charts, rather than reinterpretation of this conservative failure route.

## Validation record

Frozen on 2026-09-09 before independent target checking, by byte copies into `.tmp/mec005-affine-independent-adjudication/` and `shasum -a 256`:

| Read-only subject | SHA-256 |
| --- | --- |
| `analysis/pairwise-causal-root-ledger-closure.md` | `65b7c3d6c7dcea3e16abfa3cdf13f7eab0a285be185467c683e38a45847fb5ce` |
| `scripts/eom/verify-mec005-two-history-causal-root-ledger.mjs` | `6ea4cc6054571536bb56d4459d3a90be5ef199c880836332699122bedb5e0558` |
| `tests/mec005-two-history-causal-root-ledger-verifier.test.mjs` | `4afb4a162be3dac2997d2fa855af1e68991b2aea26ce8885f58d59c194bc685d` |

The independent reference is the explicit sign-sector derivation and full tables in this document. The new scratch checker imports the frozen subject implementation solely as the object under test; it imports no subject test expectations and implements no alternate general root finder. Its expected branch lines, signs, transmitter factors, intervals, event faces and jumps, and signed complement candidates are independently transcribed from the displayed mathematics. Subdivision/permutation comparisons test invariance only and are not cited as independent correctness evidence.

Before target execution, `node .tmp/mec005-affine-independent-adjudication/check.mjs known` returned `KNOWN PASS` for the stationary two-branch/four-endpoint case. This known-answer pass was recorded in `known.txt` and in this document before the target run.

After that recorded pass, `node .tmp/mec005-affine-independent-adjudication/check.mjs target` returned `TARGET PASS`. It compared the complete ten-branch tuples, all eighteen event coordinates with their face sets and unsigned/oriented jumps, all twenty-four factor lines and directions, twenty reciprocal incidences, boundary quarantine, and the existing asymmetric three-branch control with its two memory-edge events. Exact subdivision and nested record permutation also passed. The receipt is `target.txt` in the assigned scratch directory. These checks measure implementation agreement with the displayed independent reference on the named controls; they do not prove arbitrary-input software correctness.

The unchanged subject suite passed 15/15 via `node --test tests/mec005-two-history-causal-root-ledger-verifier.test.mjs`; its receipt is `focused.tap` in the same directory. That pass confirms the existing bounded controls and rejection behavior and is not the basis of theorem acceptance. Source inspection of `reconstructMec005AffineHistoryLedger` and `verifyMec005AffineHistoryLedger` separately checked exact rational clipping, exclusion of the exact diagonal, direct partner-contact construction, normalized history descriptors, event deduplication, and the conservative failure routes. The comparison function recomputes its own geometry; replay through it is comparison plumbing, not a second independent oracle.

`shasum -a 256 -c .tmp/mec005-affine-independent-adjudication/frozen.sha256` returned `OK` for all three subjects after these runs. `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/analysis/mec-005-affine-independent-adjudication.md` emitted no whitespace errors; its exit status 1 denotes the added-file difference. No Python, production evolution, generator, or general-envelope mathematical acceptance run was performed.

> Claim grade: measured. The named exact-reference checker and Node suite passed on the frozen subjects within the stated control scope, and the SHA-256 check found no subject-byte change. Falsifier: a repeated command on those bytes fails, an expected tuple disagrees with the displayed independent mathematics, or a subject digest changes. A different input family requires its own evidence; these runs do not certify smooth EOM histories or conserved accounts.

## Remaining dependency and proposed coordinator integration

The next mathematical prerequisite for a positive lineage-gated continuation claim is independent provenance of a smooth EOM-evolved positive-delay self branch approaching zero delay, or a quantified exclusion theorem on the actual admitted class. Neither the self corner attachment nor different-label coordinate contact provides that prerequisite. General MEC-005 acceptance additionally requires raw-history binding to the full envelope, certified domain partition and complement evidence, smooth singular charts and multiplicities, interval/accumulation dispositions, cross-history correspondence, and shared source-emission ownership. P5–P6 require independently derived motion, wake, and boundary maps on the identical accepted update and joint account checks.

Proposed integration text: “Revised effort 6 independently adjudicates the exact affine raw-history theorem positively at its prescribed finite piecewise-affine scope: ten open branches, four positive-delay self branches, eighteen bundle-local point events, twenty incidences, two structural self-diagonal carriers, complete twenty-four-factor exclusion, and subdivision-stable descriptors. Boundary multiplicity and evaluation remain quarantined. This closes the bounded independent-review dependency only; smooth EOM self-birth lineage, the full certificate envelope, shared emission-account ownership, and P5–P6 remain open. MEC-005 remains Queued, Verification incomplete, Not advanced, and consumer-disabled at full scope.”
