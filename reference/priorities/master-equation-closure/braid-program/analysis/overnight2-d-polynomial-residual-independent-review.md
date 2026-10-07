# Independent review of polynomial delayed-residual certification

## Disposition and scope

**Derived result:** the squared-gap estimate, off-root derivative, common-denominator identity and resulting residual bound in the [frozen proposal](overnight2-d-polynomial-residual.md) are correct on their explicitly completed domains. This is a viable conditional certificate route. It is not an implemented enclosure, actual-history admission or escape result. The Ramon E. Moore role was used as an interval-certification lens under the Specialist charter; it supplies no acceptance authority.

**Required domain correction:** add positive current pair separation, or separately assume an admitted positive root, before asserting that the causal gap has a unique positive zero. Global source Lipschitz constant less than one alone permits a zero-delay collision. Require coverage and velocity regularity on the entire candidate-to-root source-time bridge. The proposal already excludes velocity jumps from differentiation, but that exclusion must apply to this bridge, not merely to the exact source clock over the reception interval. Receiver acceleration at ordinary receiver knots is interpreted by one-sided pieces or almost everywhere.

The subject remained read-only. Only this new companion was authored. The parent owns integration in the [research account](overnight2-d-followup-and-research-2026-10-07.md), any subject corrections and any implementation. No target, evolution computation or numerical certification ran in this review.

## 1. Squared gap and complete positive root

Fix reception time $t$, let $d(t)=|\mathbf Q_i(t)-\mathbf Q_j(t)|$, and suppose the complete source is continuous and globally $L_j$-Lipschitz, with $L_j<1$. For $v>u\ge0$, the reverse triangle inequality gives

$$
G_j(v)-G_j(u)\ge(1-L_j)(v-u).
$$

If $d(t)>0$, then $G_j(0)=-d(t)<0$ and $G_j(v)\ge(1-L_j)v-d(t)\to\infty$. Continuity proves a unique positive root. On a compact reception interval with continuous reference positions, pointwise positive separation supplies a positive minimum; a certificate should retain its verified lower bound. This is the separation premise in the [complete root-region theorem](overnight2-d-root-region.md).

For any positive candidate $\widehat\tau$, strong monotonicity implies

$$
(1-L_j)|\tau_j-\widehat\tau|
\le |G_j(\widehat\tau)|
=\frac{|\widehat\tau^2-|\widehat{\mathbf R}|^2|}
{\widehat\tau+|\widehat{\mathbf R}|}.
$$

Thus the proposal's $\delta_j=\varepsilon_j/[(a_j+b_j)(1-L_j)]$ is correct, including $b_j=0$, provided $a_j>0$. Squaring has not admitted a negative-delay root because the candidate and admitted root are positive. A computable enclosing delay interval is $[\widehat\tau-\delta_j,\widehat\tau+\delta_j]$ intersected with any independently proved root domain, enlarged as necessary to contain the candidate itself. The derivative argument needs a strictly positive lower endpoint for the entire connecting interval; positivity of the candidate alone does not supply it.

**Counterexample to the omitted premise:** take stationary coincident receiver and source. Then $L_j=0$, $G_j(\tau)=\tau$, and there is no positive root. A positive constant candidate $\eta$ has $H_j=\eta^2$, so even an arbitrarily small squared defect does not establish a nonsingular positive root. The resulting bound includes zero and cannot support the acceleration denominator. This does not refute the corrected theorem.

## 2. Derivative and ordinary source knots

At fixed $t$, differentiation with respect to increasing delay gives $d\mathbf Q_j(t-\tau)/d\tau=-\mathbf V_j$ and $d\mathbf V_j(t-\tau)/d\tau=-\mathbf A_j$. Consequently

$$
\mathbf R'=\mathbf V_j,\qquad
w'=1-|\mathbf V_j|^2+\mathbf R\cdot\mathbf A_j,
$$

and the exact derivative is

$$
\mathbf F'=\sigma_{ij}\left[
\frac{\mathbf V_j}{\tau^2w}
-\frac{2\mathbf R}{\tau^3w}
-\frac{\mathbf R(1-|\mathbf V_j|^2+\mathbf R\cdot\mathbf A_j)}{\tau^2w^2}
\right].
$$

Triangle inequalities yield exactly the displayed $K_j$. The signs and powers of delay are correct. The use of $1+L^2+R_0M$ is conservative; since $L<1$, $1+R_0M$ also bounds the last scalar factor, but this optional sharpening is not needed for validity.

The required domain is the entire fixed-$t$ bridge from candidate delay to true delay, uniformly for $t\in J$: positive delay and $w$ floors, complete source coverage, position and velocity bounds, and absolutely continuous source velocity with essentially bounded derivative on each jump-free bridge. A finite partition into continuously joined polynomial or smooth source pieces satisfies the latter condition. Merely naming a bounded piecewise derivative without a finite partition or absolute-continuity condition is insufficient in a general function class.

Across an ordinary acceleration knot, $\mathbf Q_j$ and $\mathbf V_j$ remain continuous. Therefore $\mathbf F$ is continuous when its denominators stay positive, and integrating its bounded derivative over the pieces proves $|\mathbf F(\tau_j)-\mathbf F(\widehat\tau_j)|\le K_j\delta_j$. No acceleration trace jump term is necessary. Both one-sided acceleration bounds must be included in $M$.

## 3. Source velocity jumps and reception slabs

An exact source clock on one side of zero does not guarantee that its approximate candidate is on the same side. The uncertainty bridge must avoid the source-zero jump, or the row error must include a jump term. At a continuous source-position jump time $s_*$, set $\tau_*=t-s_*>0$, $\mathbf R_*=\mathbf Q_i(t)-\mathbf Q_j(s_*)$ and $w^\pm=\tau_*-\mathbf R_*\cdot\mathbf V_j(s_*\pm)$. The source-trace difference of the off-root extension is

$$
\mathbf F^+-\mathbf F^-
=\frac{\sigma_{ij}\mathbf R_*\,[\mathbf R_*\cdot(\mathbf V_j^+-\mathbf V_j^-)]}
{\tau_*^2 w^+w^-}.
$$

It follows that a bridge crossing finitely many velocity jumps satisfies

$$
|\mathbf F(\tau_j)-\mathbf F(\widehat\tau_j)|
\le K_j\delta_j+\sum_*\frac{|\mathbf R_*|^2|\Delta\mathbf V_j|}{\tau_*^2 w^+w^-},
$$

using positive bounds on both trace denominators and uniform smooth-piece bounds. Increasing delay traverses source time backwards; that reverses the oriented trace difference but not this norm estimate. At a causal front the expression reduces to the previously used ordinary acceleration jump. Alternatively a separately bounded reception slab may cover these times. The slab's certified width and residual bound must both enter an integral estimate. A numerical event time or zero-width event record does not establish either.

## 4. Common denominator and polynomial enclosures

The residual numerator follows by multiplication of each signed row by the other denominators. No sign or partner index is missing. With every $D_j\ge d_j>0$, dividing the vector numerator norm bound by $\prod_jd_j$ and applying the triangle inequality only to the candidate-to-root row corrections proves the proposed result. Signed cancellation is retained in the numerator; it need not survive the correction budget to preserve validity.

Polynomial composition is valid on each reception region whose candidate source-time maps use the declared source pieces. If a candidate crosses a knot, one needs a complete piecewise enclosure or a validated enclosure across the union. Monotonicity of the candidate map is not assumed and cannot be inferred from root samples. Isolated candidate-knot crossing times alone do not establish a complete partition unless all preimages are covered. The enlarged source-time bridge has a separate coverage obligation for the row correction.

An analytic negative source requires enclosed position, velocity and acceleration errors adequate for both the candidate numerator and bridge bounds. Rounding the exact increment-defined reference into independent absolute endpoint caches would change the object being certified. Its exact cumulative-node representation, floating evaluation errors, polynomial coefficient errors and Taylor remainders must be bound to the same object throughout. Each coefficient operation and denominator product requires outward arithmetic; a norm upper bound must enclose the vector norm, not merely its largest component.

At a receiver acceleration knot, an unqualified classical $\ddot{\mathbf Q}_i(t)$ may not exist. Split reception cells there and use one-sided traces, or state the uniform residual bound almost everywhere. The latter is sufficient for the residual integral. Summing each certified cell width times its bound, with complete cell and event-slab coverage, gives the claimed integral bound. This controls the residual of the declared comparison only; initialization, error transport, nonlinear remainder and actual trajectory membership remain separate.

## 5. Independent analytic controls

These are exact algebraic substitutions derived in this review, not executions of a target or new numerical instrument.

1. A stationary source at zero and receiver at two gives $\tau=2$, $D=8$, row $1/4$ and stationary residual $-1/4$. Its residual norm is $1/4$, agreeing with the proposal.
2. A source $Q_j(s)=s/2$ and receiver $Q_i(t)=2+t/2$ gives $R(\tau)=2+\tau/2$, $G(\tau)=\tau/2-2$ and true delay four. At the root, $w=2$, $D=32$ and row $1/8$. Choose the nonzero-defect candidate $\widehat\tau=3$. Then $H=-13/4$, $a=3$, $b=7/2$, $L=1/2$ and $\delta=1$, exactly attaining the true root error. This tests more than a zero-defect candidate.
3. For that affine source, $F(\tau)=(2+\tau/2)/[\tau^2(3\tau/4-1)]$. Direct rational differentiation at four gives $F'(4)=-3/32$, matching the independently expanded derivative. On $[3,4]$, using $a=3$, $w_0=5/4$, $R_0=4$, $L=1/2$, $M=0$ gives $K=86/135$. The actual endpoint row difference is $|14/45-1/8|=67/360<K\delta$.
4. The same affine example has $w(4)=2>0$ but $w(1)=-1/4$. Root positivity alone therefore cannot supply a positive off-root denominator on an arbitrary candidate bridge. The proposal correctly demands this separately.
5. For the source born at zero with velocities $-1/2$ before and $+1/2$ after, receiver at two and reception time two, the causal delay is two. The incoming row is $1/6$, outgoing row $1/2$, and jump $1/3$. The jump expression above gives exactly $1/3$, showing why a derivative-only estimate cannot cross this event.
6. For two equal candidate vectors and denominators with opposite weights and zero receiver acceleration, the common numerator is identically zero before a norm is taken. This is an exact cancellation control; summing the row norms would fail to retain it.

## 6. Validation, preservation and falsifiers

Direct `shasum -a 256` measured the reviewed proposal as `71131937b2aed7fda6eb47c069e5eaf7c5e1252e05f84fa43676be9f2232cd20`. Its referenced root-region theorem measured `221c6d17af58884b9e9267d044ae6c8d4347b08f5441075d14ece189986b2293`. The live role and shared Specialist charter were read. No subject, dependency, previous review or runtime evidence was edited, and no numerical certification result is asserted.

Final editorial validation: both hashes were unchanged on the closing `shasum -a 256` read. Explicit `test -f` checks passed for all three distinct relative-link destinations in this review; none uses a fragment. The scoped `git diff --no-index --check /dev/null` invocation on this new review emitted no whitespace diagnostics; its difference exit status is expected for a new file.

The corrected root estimate is falsified by a complete source with the stated Lipschitz and positive-separation premises violating the derived delay-error inequality. The derivative claim is falsified by direct differentiation disagreeing with the exact expanded formula. The piecewise correction fails if a jump-free bridge with the specified regularity and positive margins exceeds $K_j\delta_j$. A crossing velocity jump without its allowance invalidates application of that estimate. The common-denominator result is falsified by an exact polynomial identity failure; a proposed numerical certificate fails if any independent analytic control lies outside its outward enclosure, any source preimage or event slab is omitted, or its encoded reference differs from the one whose residual it claims to bound.
