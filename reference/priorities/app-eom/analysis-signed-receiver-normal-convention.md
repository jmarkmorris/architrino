# Signed Versus Unsigned Receiver-Normal Convention

Status: analysis-only arbitration specification. No convention is promoted by
this file.

Claim level: the root-transport identity and the local sign-change comparison
are derived. The current unsigned acceleration convention is chosen, not
derived from the causal action. Existing negative-receiver-normal records are
measured executable or display diagnostics, not a conservation-ledger
adjudication.

## Finding

The two conventions do not differ merely because $D_T<0$. They differ exactly
when the signed root-transport rate

$$
m=\frac{D_T}{D_s}
$$

is negative. On the intended arbitration chart, where the retained simple root
has a certified positive source-normal floor $D_s\ge\nu_s>0$, this is equivalent
to $D_T<0$. Outside that chart the distinction matters: if $D_T<0$ and $D_s<0$,
then $m>0$ and the signed and unsigned acceleration rows agree.

This qualification removes the uniform circular self-hit chart as a decisive
case. Its rotational symmetry gives $D_T=D_s$ and therefore $m=+1$ on every
nondegenerate root, even when the architrino speed is super-field-speed. The
arbitration record must instead contain a sign-stable $D_s>0$ branch whose
$D_T$ crosses zero.

The current repository does not contain a same-action retained record that
closes the energy, momentum, and angular-momentum wake ledger for either
choice. The convention winner is therefore **not yet measured**. The runnable
test below is the minimum decisive arbitration.

## Geometry of the Negative-Orientation Stratum

For a retained causal root $S=S_\ell(T)$, define

$$
\mathbf r(T,S)=\mathbf X_i(T)-\mathbf X_j(S),
\qquad
\hat{\mathbf r}=\frac{\mathbf r}{\|\mathbf r\|},
$$

$$
D_s=c_f-\hat{\mathbf r}\cdot\mathbf V_j(S),
\qquad
D_T=c_f-\hat{\mathbf r}\cdot\mathbf V_i(T).
$$

Implicit differentiation of

$$
\|\mathbf X_i(T)-\mathbf X_j(S)\|-c_f(T-S)=0
$$

on a simple root gives

$$
\dot S_\ell(T)=m_\ell(T)=\frac{D_T}{D_s}.
$$

Thus $m<0$ means that increasing receiver time moves the selected emission time
backward along the source history. This is an orientation reversal of the
root-transport map. It is not a source-normal fold: the test chart keeps
$D_s$ bounded away from zero and keeps the root count and root id fixed.

On the positive-$D_s$ chart,

$$
D_T<0
\quad\Longleftrightarrow\quad
\hat{\mathbf r}\cdot\mathbf V_i(T)>c_f.
$$

Therefore a super-field-speed receiver speed $\|\mathbf V_i\|>c_f$ is
necessary but not sufficient. The receiver must recede from the historical
emission point faster than the causal-wake speed **along that branch's line of
action**. Large transverse speed alone does not enter this stratum.

### Geometry classes

| Geometry | Can it reach $m<0$? | Reason and current status |
| --- | --- | --- |
| Strictly sub-field-speed receiver | No. | Derived: $\hat{\mathbf r}\cdot\mathbf V_i\le\|\mathbf V_i\|<c_f$, so $D_T>0$. With $D_s>0$, $m>0$. |
| Straight constant-velocity same-source history with $\|\mathbf V\|>c_f$ | No nontrivial self root. | Derived: for $T>S$, the self-root equation becomes $\|\mathbf V\|(T-S)=c_f(T-S)$, impossible unless $\|\mathbf V\|=c_f$. This is the `VAL-02` control in [evolution-contract-v0.md](evolution-contract-v0.md#validation-ladder). |
| Uniform circular same-source history | Not a discriminator. | Derived in the canonical circular benchmark: $D_T=D_s$ and $m=+1$ away from the common degeneracy. A negative $D_T$ accompanied by negative $D_s$ would still leave $m>0$. |
| Accelerating or otherwise nonuniform curved same-source history | Yes. | The receiver can outrun a wake emitted by its own earlier path while the source-normal row remains positive. The existing accelerating circular diagnostic realizes $D_T<0<D_s$, but it is explicitly display-only and not retained evidence. |
| Uniform circular opposite-polarity partner branch | Not on the canonical principal branch. | Derived: the source and receiver velocity projections are equal and negative on the line of action, giving $D_T=D_s=c_f(1+\beta\sin\xi)>0$. Tightness or super-field-speed tangential motion alone does not produce the sign change. |
| Noncircular close binary | Constructible, not established as a retained occurrence. | A close approach is neither necessary nor sufficient. A partner row enters the stratum only when the receiver's outward projection from the source's historical position exceeds $c_f$ while $D_s>0$. A rebound, forced separation, or sufficiently nonuniform curved passage can supply that geometry. Close separation only amplifies the inverse-square row; it does not set the sign of $D_T$. |
| Stationary source with a super-field-speed receiver receding along $+\hat{\mathbf r}$ | Yes, and analytically simple. | With $\mathbf V_j=0$, $D_s=c_f>0$. If $\hat{\mathbf r}\cdot\mathbf V_i>c_f$, then $D_T<0$ and $m<0$. This partner-history chart is the cleanest manufactured sign control, provided the root lies inside the retained source history. |
| General curved super-field-speed partner or self history | Yes, branch by branch. | Super-field-speed motion can create multiple roots, but each retained row must be classified separately. Some roots may have $m<0$, others $m>0$, and source-normal folds remain a different event class. |

### Repository record classes

The following existing record classes either already expose the negative row or
can carry the arbitration record:

1. The display-only schema
   `prescribed-path-analysis/moving-circular-same-source-causal-roots.v1` emits
   `signedBranchOrientation`, `receiverNormalNumerator`,
   `sourceNormalDenominator`, and unsigned `branchWeight`. The accelerating
   same-source unit case in
   [prescribed-orbit-causal-roots.test.js](../../../tests/prescribed-orbit-causal-roots.test.js)
   has $D_T<0<D_s$. Its library contract explicitly bars retained-branch and
   dynamical-evidence use, so it is a construction seed only.
2. The EOM solver's `eom_native_exact_pair_certificate/v0` and
   `eom_native_pair_acceleration_certificate/v0` classes can retain a sharp
   simple root and its source-normal, receiver-normal, signed-orientation, and
   unsigned-strength intervals. The live implementation evidence in
   [eom-native-acceleration-layer-apple-m3-2026-07-13.json](evidence/eom-native-acceleration-layer-apple-m3-2026-07-13.json)
   records an active unclamped super-field-speed receiver, and
   [work-log.md](work-log.md) states that its receiver-normal interval is
   negative with nonzero branch strength. This is executable acceleration-layer
   evidence, not a same-action wake-ledger closure.
3. The accepted-step and coupled-evolution records specified by
   [evolution-contract-v0.md](evolution-contract-v0.md) retain all ordered pairs,
   including self-pairs, and require $D_s$, $D_T$, $m$, $W^{\mathrm{rec}}$,
   root identity, regulator state, acceleration, and immutable accepted-history
   provenance. `VAL-06` already names the accelerating $m<0$ benchmark. This is
   the natural realized-trajectory carrier for the arbitration.
4. The target
   [receiver-normal branch-strength certificate](../master-equation-closure/receiver-normal-branch-strength-certificate.md)
   supplies the same-record derivative fields needed by an action or wake
   consumer. It is presently a certificate shape rather than a populated
   negative-orientation conservation pass.
5. The root row bound by
   [master-eom-binding-v0.md](master-eom-binding-v0.md#root-and-acceleration-evidence)
   is the minimum common row: source and receiver ids, history segment,
   emission and reception times, root enclosure, $D_s$, $D_T$, $m$,
   $W^{\mathrm{rec}}$, polarity, charge product, regulators, vector
   contribution, reduction group, and acceptance status.

## Acceleration Predictions Across the Sign Change

Let

$$
\mathbf a_0(T)
=
\kappa\,\sigma_{ij}\frac{|q_iq_j|}{r^2(T)}\hat{\mathbf r}(T).
$$

The candidate branch rows are

$$
\mathbf a_{\mathrm{signed}}=m\,\mathbf a_0,
\qquad
\mathbf a_{\mathrm{unsigned}}=|m|\,\mathbf a_0.
$$

They agree for $m>0$. For $m<0$,

$$
\mathbf a_{\mathrm{signed}}=-\mathbf a_{\mathrm{unsigned}},
\qquad
\mathbf a_{\mathrm{unsigned}}-\mathbf a_{\mathrm{signed}}
=2|m|\mathbf a_0.
$$

The physical direction consequence is exact:

| Polarity row | Unsigned $|m|$ when $m<0$ | Signed $m$ when $m<0$ |
| --- | --- | --- |
| Like polarity, including self-hit ($\sigma_{ij}=+1$) | Remains along $+\hat{\mathbf r}$: repulsive relative to the historical emission point. | Reverses to $-\hat{\mathbf r}$: attractive relative to the historical emission point. |
| Unlike polarity ($\sigma_{ij}=-1$) | Remains along $-\hat{\mathbf r}$: attractive relative to the historical emission point. | Reverses to $+\hat{\mathbf r}$: repulsive relative to the historical emission point. |

Assume one simple receiver-normal crossing at $T=T_*$ with

$$
D_T(T_*)=0,
\qquad
D_s(T_*)\ne0,
\qquad
\dot D_T(T_*)\ne0,
\qquad
r(T_*)>0.
$$

Holding only the leading term,

$$
m(T)
=
\frac{\dot D_T(T_*)}{D_s(T_*)}(T-T_*)
+O((T-T_*)^2).
$$

Hence

$$
\mathbf a_{\mathrm{signed}}(T)
=
\frac{\dot D_T(T_*)}{D_s(T_*)}(T-T_*)\mathbf a_0(T_*)
+O((T-T_*)^2),
$$

while

$$
\mathbf a_{\mathrm{unsigned}}(T)
=
\left|\frac{\dot D_T(T_*)}{D_s(T_*)}\right|
|T-T_*|\mathbf a_0(T_*)
+O((T-T_*)^2).
$$

Both branch accelerations are continuous and vanish at the receiver-normal
null. Their regularity and direction differ:

- The signed row reverses direction through zero and is differentiable at a
  simple crossing when the other row fields are smooth.
- The unsigned row approaches and leaves zero on the same polarity-selected
  ray. It is continuous but generically has a cusp, so its first time
  derivative jumps.
- At $T_*$ the zero vector has no direction. The statements above concern the
  one-sided nonzero limits.
- If $D_s=0$, $r=0$, root identity changes, or the crossing is higher order,
  this local comparison does not apply. Those cases require their own caustic,
  core, or nonsmooth chart route.

The signed orientation is therefore not a small correction to the unsigned
law on this stratum. It changes attraction to repulsion or repulsion to
attraction, whereas the unsigned law changes only the magnitude and introduces
a modulus kink.

## Conservation-Ledger Arbitration Test

### Governing rule

Freeze one causal action convention before either branch law is evaluated. The
same action source hash, kinetic/conjugate-momentum convention, regulator,
history boundary, spatial window, boundary-flux construction, and Noether
charge definitions must be used for both replays. No energy, momentum, angular
momentum, wake, or boundary term may be refit separately for a convention.

The action instrument must be independent of the acceleration consumer. In
particular, a ledger reconstructed by integrating the tested acceleration and
then defining the missing wake term as the negative residual is circular and
does not arbitrate anything.

### Input record

Use one accepted EOM-evolved retained branch-family record with:

1. one stable root id $\rho=(i,j,\ell,T,S_\ell(T))$ on a window
   $I=[T_* - \delta,T_*+\delta]$;
2. a certified simple-root floor $D_s\ge\nu_s>0$ on all of $I$;
3. exactly one enclosed transverse receiver-normal crossing
   $D_T(T_*)=0$ with $\dot D_T(T_*)$ excluding zero;
4. nonempty subwindows with $m>0$ and $m<0$;
5. unchanged active-root list, inactive-gap certificate, source/receiver ids,
   polarity, and history-segment ids across $I$;
6. $r\ge r_{\min}>0$, declared $\eta$ and $\epsilon_c$, no source-normal fold,
   no coordinate coincidence, and no memory-boundary contact;
7. same-record $D_s$, $D_T$, $m$, $|m|$, their first branch derivatives,
   direction, kernel, acceleration contribution, and deterministic reduction
   membership;
8. one declared finite spatial window $W$, one origin $\mathbf X_0$, one
   retained wake boundary record, and explicit external work, impulse, and
   torque rows, preferably certified zero;
9. the frozen action artifact and source hash that independently generate the
   kinetic, conjugate-momentum, wake-history, and boundary-flux rows.

The cleanest first record is a two-path partner case with a stationary source
and an accelerating receiver that crosses
$\hat{\mathbf r}\cdot\mathbf V_i=c_f$ while receding, because it keeps
$D_s=c_f>0$ analytically and avoids the extra root census of self-history.
After that success marker, repeat the same test on the existing accelerating
circular same-source geometry after it has been promoted from prescribed
display history to an accepted EOM-evolved retained record. A close-binary
record is a later stress case, not the first discriminator.

### Instrument

Use two independently authored components:

1. **EOM replay component.** From the same immutable accepted history at the
   left boundary, run two counterfactual replays with identical numerical
   controls. The only changed expression is the branch multiplier: $m$ for the
   signed replay and $|m|$ for the unsigned replay. Each replay must emit the
   existing exact-pair, pair-acceleration, coupled-step, and branch-family
   checksum records. The replays must not consume prescribed future paths.
2. **Action/Noether ledger component.** Independently evaluate the frozen
   action's time-translation, spatial-translation, and rotation charges and
   its wake boundary fluxes on each replay. It consumes the emitted retained
   histories and root rows, but it does not import either replay's aggregate
   acceleration or define a compensating wake term from the observed deficit.
   Its construction follows the same-record Noether pullback requirement in
   [Causal Action Functional](../../../content/markdown/aaa/dynamics/causal-action-functional.md#reduced-branch-certificate-targets)
   and the finite-window balance equations in
   [Energy](../../../content/markdown/aaa/dynamics/energy.md#energy-conservation-and-exchange).

The frozen action must first pass an independent positive-orientation control
on the same record class, where $m>0$ and both acceleration conventions agree.
Otherwise failure on the $m<0$ window cannot be assigned to the sign choice.

### Residuals

For each replay $c\in\{\mathrm{signed},\mathrm{unsigned}\}$, the independent
ledger evaluator emits outward enclosures for

$$
R_E^{(c)}
=
\Delta E_W^{(c)}
+\int_I\!\int_{\partial W}\mathbf J_E^{(c)}\cdot\hat{\mathbf n}\,dA\,dT
-\int_I P_{\mathrm{ext},W}\,dT,
$$

$$
\mathbf R_P^{(c)}
=
\Delta\mathbf P_W^{(c)}
+\int_I\!\int_{\partial W}\boldsymbol\Pi^{(c)}\hat{\mathbf n}\,dA\,dT
-\int_I\mathbf F_{\mathrm{ext},W}\,dT,
$$

$$
\mathbf R_L^{(c)}
=
\Delta\mathbf L_W^{(c)}
+\int_I\!\int_{\partial W}\boldsymbol\Lambda^{(c)}\hat{\mathbf n}\,dA\,dT
-\int_I\boldsymbol\tau_{\mathrm{ext},W}\,dT.
$$

Here $E_W$, $\mathbf P_W$, and $\mathbf L_W$ include the mechanical and
retained wake-history terms supplied by the frozen action. The test must not
assume the quadratic kinetic proxy $\tfrac12\mu_{\mathrm{arch}}\|\mathbf V\|^2$
or a momentum proxy unless that same action convention derives or explicitly
binds it.

The evaluator also emits an action/EOM consistency residual: the interior
Euler coefficient from the frozen action, including any retained
derivative-of-delta or recoil-inclusive wake term, minus the replay's consumed
branch acceleration row. This prevents a numerically balanced boundary ledger
from hiding an interior equation mismatch.

### Pass/fail rule

A convention passes only if all of the following hold:

1. the action hash, input-history hash, initial record, retained branch-family
   checksum, window, boundary record, origin, regulators, tolerances, and
   external rows are identical between convention replays;
2. root completeness, branch identity, $D_s>0$, and the single $D_T$ crossing
   remain certified throughout the comparison window;
3. the action/EOM consistency residual and every component of $R_E$,
   $\mathbf R_P$, and $\mathbf R_L$ contain zero inside separately declared
   tolerances;
4. residual widths contract at the declared order under time-step refinement,
   history-depth extension, and the same regulator-refinement ladder;
5. no residual is repaired by convention-specific boundary terms, wake terms,
   origins, coarse-graining windows, or kinetic/momentum definitions;
6. missing or mismatched $D_T$, root id, branch checksum, action hash, or
   boundary record fails closed.

The outcome classification is:

| Result | Adjudication |
| --- | --- |
| Signed passes all rows; unsigned has at least one residual bounded away from zero under refinement | Signed convention wins on this action and record; the unsigned convention is falsified there. |
| Unsigned passes all rows; signed has at least one residual bounded away from zero under refinement | Unsigned convention wins on this action and record; the signed convention is falsified there. |
| Both fail | Neither convention is accepted. First localize whether the frozen action, wake pullback, boundary record, or both branch laws are incomplete; do not select the smaller residual. |
| Both pass | The record or ledger instrument is not discriminating despite $m<0$, or a hidden convention-dependent term remains. Fail the arbitration as inconclusive. |
| Root identity, $D_s$ sign, window, action, or boundary data differ between replays | Invalid comparison; no convention verdict. |

No fitted parameter, residual ranking, or single terminal total can replace the
componentwise zero-enclosure and refinement requirements.

## Claim Grades and Falsifiers

| Claim | Grade | Observation that would overturn it |
| --- | --- | --- |
| $m=dS/dT=D_T/D_s$ on a simple retained root | Derived. | A retained smooth root with $D_s\ne0$ whose independently differentiated root path lies outside the outward enclosure of $D_T/D_s$. |
| The conventions differ exactly for $m<0$ | Derived algebraically. | None within the definitions $m=D_T/D_s$ and $W=|m|$; changing either definition would be a different convention. |
| On a certified $D_s>0$ chart, $D_T<0$ is equivalent to the discriminating stratum | Derived. | A same-record interval proving $D_s>0$ and $D_T<0$ while $m\ge0$, or the converse, would expose a row-construction error. |
| Super-field-speed receiver motion is necessary but not sufficient for $D_T<0$ | Derived from projection geometry. | A certified row with $\|\mathbf V_i\|\le c_f$ and $D_T<0$ under a valid unit direction would falsify the geometry or arithmetic. A super-field-speed row with transverse or inward velocity and $D_T>0$ is expected and does not falsify it. |
| Uniform circular partner and self charts do not arbitrate the sign choice | Derived for the canonical uniform circular geometry. | A nondegenerate uniform circular retained root with independently computed $D_T\ne D_s$. |
| Accelerating curved same-source histories can realize $D_T<0<D_s$ | Measured diagnostic, not retained evidence. | Independent replay of the stated prescribed case that cannot reproduce a complete root with those signs; promotion still requires an EOM-evolved retained record. |
| A close binary reaches the stratum merely because it is close | Rejected. | No observation can restore this as a geometric implication; a close binary can realize the stratum only through its velocity projection. A certified family in which closeness mathematically forces that projection would be a new theorem with extra assumptions. |
| The signed row reverses acceleration direction through a simple $D_T$ crossing | Derived. | An independently action-derived negative-$m$ branch acceleration aligned with $+\sigma_{ij}\hat{\mathbf r}$ rather than $-\sigma_{ij}\hat{\mathbf r}$ falsifies the signed convention on that action. |
| The unsigned row remains on the same polarity-selected ray and has a generic cusp | Derived for a transverse zero with smooth nonzero $D_s$ and $r$. | An independently action-derived negative-$m$ acceleration with the opposite ray falsifies the unsigned convention. A differentiable unsigned crossing with $\dot D_T(T_*)\ne0$ would falsify the stated modulus regularity. |
| The unsigned convention closes the conservation ledger | Unmeasured. | It is falsified on the frozen action and record if any action/EOM, energy, momentum, or angular-momentum residual stays bounded away from zero under refinement while the signed replay passes all rows. |
| The signed convention closes the conservation ledger | Unmeasured. | It is falsified on the frozen action and record if any corresponding residual stays bounded away from zero under refinement while the unsigned replay passes all rows. |
| A current repository record already adjudicates the convention | Rejected by the present repo audit. | A same-action accepted artifact with one negative-orientation retained branch, independent Noether wake rows, common boundary data, componentwise residual enclosures, negative controls, and refinement convergence would overturn this repo-state finding. |

## Disposition

This analysis is `priority-only`. It supplies the discriminating stratum,
local derivation, and runnable arbitration specification, but no convention
promotion. The first executable target is one positive-$D_s$ partner record
that crosses $D_T=0$, followed by independent same-action Noether-ledger replay
of signed $m$ and unsigned $|m|$. Until one replay uniquely closes all three
conservation rows and the action/EOM residual, signed $m$ remains root-transport
orientation and unsigned $W$ remains the chosen canonical acceleration
magnitude rather than an adjudicated consequence of the action.
