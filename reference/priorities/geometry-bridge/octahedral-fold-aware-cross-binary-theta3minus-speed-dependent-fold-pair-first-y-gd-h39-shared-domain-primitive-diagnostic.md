# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D H39 Shared-Domain Primitive Diagnostic

Promotion status: `priority-only`.

This packet records the executable replay layer after the h39
root-tangent Cauchy-majorant reduction. It does not certify a new interval
enclosure. Its purpose is to prevent a false closure move: the h39 scalar
reducer may be applied only when the primitive quantities

$$
E_R,\quad \nu_J,\quad L_J,\quad \rho_X,\quad r_X,\quad M_G,\quad M_R
$$

come from one shared graph-centered domain. The diagnostic consumes supplied
values, replays the h39 reducer, and separates a conditional scalar pass from
the still-open directed-rounded shared-domain proof.

The coefficient provenance for those future primitive values is now supplied
by the companion packet
[octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-coefficient-series-engine](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-coefficient-series-engine.md).
That engine constructs the coefficient rows for $R_{\varepsilon,43}$,
$\partial_XR_{\varepsilon,43}$, $y\,\partial_yR_{\varepsilon,43}$, and $N_G$
from one declared h39 expansion. The present diagnostic still requires a
directed-rounded same-domain source certificate before it promotes a row, but
that certificate is now executable at the evaluator boundary: complete
coordinate-Cauchy, denominator-Cauchy, and branch-coordinate
$K_\varepsilon$ inputs can be certified into $E_R$, $\nu_J$, $L_J$, $M_G$,
and $M_R$ witnesses without a manual provenance wrapper.

## Shared-Domain Replay Theorem

Let a graph-centered backend work on one shared first-y domain, one certified
speed-ratio enclosure, one $X$ center, one $X$ radius $\rho_X$, and one graph
enclosure radius $r_X<\rho_X$. Suppose it supplies directed-rounded bounds

$$
|R_{\varepsilon,43}(y,X_c,\nu)|\le E_R,
$$

$$
|\partial_XR_{\varepsilon,43}(y,X_c,\nu)|\ge\nu_J,
\qquad
|\partial_XR_{\varepsilon,43}(y,X,\nu)
-\partial_XR_{\varepsilon,43}(y,X_c,\nu)|
\le L_J|X-X_c|,
$$

and

$$
\sup|N_G|\le M_G,
\qquad
\sup|y\,\partial_yR_{\varepsilon,43}|\le M_R,
$$

on that same domain. Define

$$
J_R=\nu_J-L_J\rho_X,
\qquad
\sigma_R=\rho_X-r_X,
\qquad
\Gamma_R=\nu_Jr_X-E_R-\frac12L_Jr_X^2.
$$

For $s=\rho/Y>1$, define the h39 Rouché-primitive replay ratio

$$
\Lambda_{39}^{\mathrm R}
=
\frac{
M_G
\left(
40+
\frac{M_R}{J_R\sigma_R}
+
\frac{1}{s-1}
\right)
}{
B_{D,39}Y^{41}s^{40}(s-1)
}.
$$

If

$$
0<r_X<\rho_X,
\qquad
J_R>0,
\qquad
\Gamma_R>0,
\qquad
\Lambda_{39}^{\mathrm R}<1,
$$

then the h39 correlated $G,D$ Cauchy-majorant tail closes on the first-y
collar. The theorem is conditional on the shared-domain hypothesis: it is not
valid to mix $E_R$, $\nu_J$, $L_J$, $\rho_X$, $r_X$, $M_G$, and $M_R$ from
different radius choices, branch centers, speed cells, or $y$ domains.

## Diagnostic Decision Rule

The diagnostic emits one of four decisions:

| Decision | Meaning |
| --- | --- |
| `open-missing-primitive-bounds` | At least one of $E_R,\nu_J,L_J,\rho_X,r_X,M_G,M_R$ is missing, so no explicit shared-domain replay can close. |
| `open-shared-domain-not-certified` | The supplied numbers pass the h39 reducer, but their provenance is only `provided-unverified`, so the result is not a certificate. |
| `passes-provided-primitive-bounds` | The supplied numbers pass the h39 reducer and are labelled `directed-rounded-external-unverified-by-this-artifact`; this is a replay pass, not a proof that this artifact generated the bounds. |
| `fails-provided-primitive-bounds` | The supplied complete primitive bounds fail the Rouché graph lift or the h39 scalar ratio. |

This gives the closure workstream an executable status check without adding a
new obligation gate. A future directed-rounded backend can write its primitive
bound report, invoke this diagnostic, and immediately see whether the h39
ratio is closed, still open because provenance is missing, or numerically
failed.

The coefficient-side evaluator now emits a companion profile-vector readiness
status before the primitive diagnostic is allowed to make a replay decision.
The vector is

$$
\mathfrak P_{39}^{\mathrm{cand}}
=
(E_R,\ M_R,\ M_G,\ \nu_J,\ L_J),
$$

with each component understood as a finite-prefix primitive plus its declared
analytic-remainder pressure. The field
\texttt{candidate\_h39\_full\_cauchy\_primitive\_profile\_vector\_status}
has three candidate-only outcomes:
\texttt{h39-full-cauchy-primitive-profile-vector-candidate-incomplete},
\texttt{h39-full-cauchy-primitive-profile-vector-candidate-scale-inequalities-open},
and \texttt{h39-full-cauchy-primitive-profile-vector-candidate-closes}. The
first outcome carries an explicit missing-component list. The latter two are
only certificate-readiness states: they say the declared vector is complete
and either fails or passes the h39 profile-scale replay, while all
directed-rounded shared-domain and retained-branch flags remain false.

The coefficient artifact now also emits a primitive-vector backend artifact
that translates the completed candidate vector into the primitive diagnostic's
input shape:

$$
(E_R,\ M_R,\ M_G,\ \nu_J,\ L_J)
\mapsto
(E_R,\ \nu_J,\ L_J,\ M_G,\ M_R,\ \rho_X,\ r_X).
$$

Its provenance label remains \texttt{provided-unverified}. Therefore a
profile-vector pass is still only a reducer-ready candidate unless a
directed-rounded same-domain backend upgrades every vector component and the
declared $\rho_X,r_X$ radii. This makes the interface useful immediately:
missing components block the diagnostic input, complete coefficient-side
vectors create a replayable primitive-bound tuple, and only a future
provenance upgrade can promote that tuple into a primitive certificate.

## Primitive-Vector Promotion Theorem Bridge

The exact promotion theorem is now executable without overclaiming the
primitive-vector artifact. Let the primitive-vector artifact supply

$$
\mathfrak P_{39}
=
(E_R,\ M_R,\ M_G,\ \nu_J,\ L_J)
$$

and radii $(\rho_X,r_X)$ for $\rho=sY$ with $s>1$. The vector promotes from a
candidate replay to an h39 continuous-tail certificate only if every component
of $\mathfrak P_{39}$ and both radii have directed-rounded provenance on one
shared graph-centered complex polydisc: the same centered fold pair, imported
h38 row, center graph $X_c(\nu)$, first-y disc, speed-ratio enclosure,
$X$-disc, and analytic-tail model.

The theorem-level assumptions are

$$
|R_{\varepsilon,43}(y,X_c,\nu)|\le E_R,
$$

$$
|\partial_XR_{\varepsilon,43}(y,X_c,\nu)|\ge\nu_J,
$$

$$
|\partial_XR_{\varepsilon,43}(y,X,\nu)
-\partial_XR_{\varepsilon,43}(y,X_c,\nu)|
\le L_J|X-X_c|,
$$

and

$$
\sup|N_G|\le M_G,
\qquad
\sup|y\,\partial_yR_{\varepsilon,43}|\le M_R
$$

on that same domain, together with the coefficient identities

$$
N_G=y^{41}T_G^{(39)},
\qquad
T_D^{(39)}
=
-40T_G^{(39)}
-\mathcal D_y^{(X_{39})}T_G^{(39)}.
$$

With

$$
J_R=\nu_J-L_J\rho_X,
\qquad
\sigma_R=\rho_X-r_X,
\qquad
\Gamma_R=\nu_Jr_X-E_R-\frac12L_Jr_X^2,
$$

the graph-lift side requires

$$
0<r_X<\rho_X,
\qquad
J_R>0,
\qquad
\Gamma_R>0.
$$

The h39 tail side requires

$$
\Lambda_{39}^{\mathrm R}
=
\frac{
M_G
\left(
40+\frac{M_R}{J_R\sigma_R}+\frac{1}{s-1}
\right)
}{
B_{D,39}Y^{41}s^{40}(s-1)
}
<1.
$$

Equivalently, for $M_G>0$ and $q=Y/\rho$, the primitive numerator must satisfy

$$
M_R
<
(\nu_J-L_J\rho_X)(\rho_X-r_X)
\left(
(1-q)\frac{B_{D,39}\rho^{41}}{M_G}
-40-\frac{q}{1-q}
\right),
$$

with the parenthesized quantity positive.

The executable bridge
\texttt{buildH39SharedDomainPrimitiveDiagnosticFromPrimitiveVectorBackendArtifact}
routes a primitive-vector backend artifact into the h39 primitive diagnostic
and records the exact promotion obstruction. Missing or invalid vector input,
a failed Rouché-primitive reducer replay, and supplied-unverified provenance
remain non-promoting. Even an external directed-rounded replay pass is labelled
as unverified by this artifact unless a future certificate verifies the
same-domain provenance itself. Therefore this bridge proves the promotion
contract and the obstruction class; it does not flip retained-branch,
scaled-remainder, `I1`, or full first-y enclosure flags.

## Same-Domain Provenance Certificate

The next executable layer is the primitive provenance certificate. It consumes
two inputs: the primitive-vector backend artifact and a directed-rounded
provenance report. The provenance report must certify each of

$$
E_R,\quad M_R,\quad M_G,\quad \nu_J,\quad L_J,\quad \rho_X,\quad r_X
$$

on the same declared graph-centered domain. The component relations are fixed:
$E_R$, $M_R$, and $M_G$ are upper bounds, $\nu_J$ is a lower bound, $L_J$ is a
Lipschitz upper bound, $\rho_X$ is the declared outer $X$ radius, and $r_X$ is
the declared inner graph radius.

The verifier rejects promotion if any component is missing, has the wrong
bound relation, is not marked directed-rounded, fails to cover the
primitive-vector input according to its relation, or carries a different
shared-domain signature. Upper-bound witnesses must be no larger than the
primitive reducer input they certify, the $\nu_J$ lower-bound witness must be
no smaller than the primitive reducer input, and the graph radii must match
exactly. It also rejects any fixed speed-band field. When all provenance
checks pass and the embedded Rouché-primitive replay returns
\texttt{passes-provided-primitive-bounds}, the artifact may set exactly the
h39 primitive/shared-domain/continuous-tail claim flags true:
\texttt{verifies\_primitive\_bounds\_provenance},
\texttt{certifies\_continuous\_polydisc\_primitives},
\texttt{certifies\_directed\_rounded\_shared\_domain}, the four h39 primitive
component flags, and
\texttt{certifies\_directed\_rounded\_h39\_polydisc\_Xi\_bound}, and
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_continuous\_successor\_tail\_bound}.

It still must keep
\texttt{certifies\_directed\_rounded\_fold\_pair\_scaled\_remainder=false},
\texttt{certifies\_I1\_regular\_critical\_exhaustion=false}, and
\texttt{retained\_branch=false}. Therefore a passing primitive provenance
certificate would be a real h39 continuous-tail closure result, but not the
end of the fold-collar proof.
The positive result status is
\texttt{h39-shared-domain-primitive-continuous-tail-certified}; all other
outcomes are no-go states such as
\texttt{open-candidate-only-primitive-provenance},
\texttt{open-missing-required-provenance-components},
\texttt{open-provenance-domain-mismatch},
\texttt{open-provenance-value-mismatch}, or
\texttt{open-h39-reducer-replay-not-closed}.

The component-subset composition artifact is the finite producer for this
provenance report. It consumes the certified $R_{\varepsilon,43}$, $N_G$,
center-Jacobian, $L_J$, and graph-radii subset witnesses, assembles
$E_R,M_R,M_G,\nu_J,L_J,\rho_X,$ and $r_X$ with their relation-aware
provenance, and replays the primitive provenance certificate. This makes the
composition theorem executable: if the five subset packets certify all seven
components on one shared signature and the scalar replay is strict, the h39
continuous-tail row certifies. It still leaves full primitive-vector,
scaled-remainder, `I1`, quadrature, and retained-branch claims false.

## Upstream Evaluator Source Composition

The upstream-source composition now consumes one shared-domain evaluator
artifact directly as a source handoff. The evaluator artifact supplies the
coordinate-Cauchy outer-bound candidate, the denominator-Cauchy $N_G$ outer
bound candidate, and the per-branch analytic profile candidates. The composer
conservatively aggregates those profile candidates into the existing source
wrappers:

$$
\max_\varepsilon E_{R,\varepsilon}\mapsto E_R,\qquad
\max_\varepsilon M_{R,\varepsilon}\mapsto M_R,
$$

$$
\min_\varepsilon \nu_{J,\varepsilon}\mapsto \nu_J,
\qquad
\max M_{G}\mapsto M_G.
$$

This is not a new gate. It removes a manual handoff. A raw evaluator artifact
can still replay through the coordinate-Cauchy and denominator-Cauchy wrappers
and report the exact missing directed-rounded predicates. When the evaluator
is called with one shared domain signature and complete Cauchy source data, it
now verifies its own source handoffs: the two branch candidates must cover
both fold-pair branches, the source/profile outer-bound formulas must match,
the denominator $N_G$ branch sum must rebuild the emitted outer bound, the
removable-Jacobian radii must be nested, the positive Taylor/geometric-tail
$\sinh$ envelopes must certify the transcendental upper bounds, and no fixed
speed-window field may appear. A passing evaluator source-certificate report
marks the coordinate and denominator source objects as directed-rounded on
the same $\mathfrak S$.

The same evaluator call also emits the two branch-coordinate
$K_\varepsilon$ witness handoffs and, when supplied with declared graph radii
on the same signature, emits the exact graph-radii witness
$(\rho_X,r_X;\mathfrak S)$. Thus, if no external $M_K$ witness is provided,
the upstream composer can replay the evaluator's branch witness set into
$M_K$, then into $L_J=\rho^{41}M_K$, before assembling the seven-input vector

$$
(E_R,M_R,M_G,\nu_J,L_J,\rho_X,r_X;\mathfrak S).
$$

The component composition now records this result as a first-class certified
seven-input primitive witness. The witness is emitted only after the h39
continuous-tail row closes, all seven component proofs are directed-rounded
on the same $\mathfrak S$, the graph radii satisfy their exact value checks,
and the reducer replay matches the component values. Its payload records the
primitive vector, the input field names, the witness family for each
component, the component provenance rows, and the reducer ratio
$\Lambda_{39}^{\mathrm R}$. It is still deliberately weaker than a retained
branch certificate: it certifies the same-domain primitive witness for the
h39 continuous-tail row, not the scaled remainder, `I1` composition,
quadrature, or branch retention.

The composer deliberately does not consume an evaluator primitive-vector
backend merely because the tuple is input-ready. It consumes that backend
automatically only when the evaluator marks the primitive-vector backend as
\texttt{h39-full-cauchy-primitive-vector-candidate-closes}. A complete but
scale-open evaluator vector remains a source-witness handoff, not a reducer
input, because its declared graph radii may not supply the graph-derived
Jacobian floor needed by the h39 reducer. This keeps the current theorem
advance precise: evaluator source profiles can now produce same-domain
primitive witnesses; full h39 continuous-tail closure still additionally
requires value coverage against a reducer-safe primitive vector and the strict
scalar replay.

The component-subset composition now supplies that reducer-safe vector when it
can be derived from the seven certified component proofs. It reads the
relation-aware component values, checks the graph radii satisfy
$0<r_X<\rho_X$, preflights the h39 reducer, and only then synthesizes the
primitive-vector backend consumed by the existing primitive provenance
certificate. This means a reducer-safe row can now close from an evaluator
artifact alone when that artifact carries its evaluator-emitted graph-radii
witness, without manual evaluator-source wrapping, without an external $M_K$
wrapper, without a separate graph-radii object, and without trusting a
candidate primitive vector merely because it is input-ready. The same resolver
also accepts a full shared-domain coefficient artifact as the source boundary.
For one emitted \texttt{h39\_coefficient\_cell}, it unwraps that cell for the
coordinate-Cauchy, denominator-Cauchy, and $K_\varepsilon$ handoffs. For a
multi-row artifact, it aggregates the coordinate-Cauchy source by per-branch
maxima only when the emitted source certificates share the same domain and
Cauchy radii, selects one whole denominator-Cauchy source row with maximal
certified $N_G$ outer bound rather than forming a synthetic branch-sum source,
and canonicalizes the $K_\varepsilon$ witness set back to one `-` and one `+`
branch witness. The graph-radii witness remains at the artifact boundary, and
the resolver still refuses a fixed speed-band field anywhere in the artifact.

There is now an executable reducer-safe evaluator row. With the same h39
coefficient cell, choose the coordinate-Cauchy outer radii

$$
R_R=R_J=0.9,\qquad R_{J,\mathrm{num}}=1.35,
$$

and the denominator-Cauchy outer radius

$$
R_G=0.5.
$$

The evaluator source profiles give the candidate primitive values

$$
E_R\approx 8.756796928907332\times10^{-4},
\qquad
M_R\approx 1.7521426775807315\times10^{-3},
$$

$$
M_G\approx 8.481163734130007\times10^{-94},
\qquad
\nu_J\approx 0.15019186669205686,
$$

and

$$
L_J\approx 1.4249127959663926\times10^{-123}.
$$

For the evaluator-declared graph radii

$$
\rho_X=0.01,\qquad r_X=0.008,
$$

the h39 Rouché graph lift and primitive scalar replay close after the
component witnesses are assembled from the evaluator-emitted source
certificates, branch-coordinate $K_\varepsilon$ witnesses, and graph-radii
witness. Therefore the seven-input primitive vector
$(E_R,M_R,M_G,\nu_J,L_J,\rho_X,r_X;\mathfrak S)$ now has a one-artifact
same-domain source path into the h39 continuous-tail certificate. The source
may be the evaluator cell itself, a one-cell coefficient artifact, or a
multi-row coefficient artifact whose emitted source certificates share the
same domain and Cauchy radii. In the multi-row case the coordinate source is a
per-branch maximum, the denominator source is one whole row with maximal
$N_G$ outer bound, and the $K_\varepsilon$ source is reduced back to one
certified witness for each branch before the max-over-branches replay. The
replay is exact in the radii: if an explicit primitive vector carries one
$(\rho_X,r_X)$ pair while the source artifact graph-radii witness carries
another, the component-subset replay stays open with an
\texttt{open-provenance-value-mismatch} obstruction instead of promoting.
Mixed Cauchy radii in a multi-row coefficient artifact also keep the upstream
composition open instead of creating a larger-domain certificate. A fixed
speed-band field anywhere in the consumed source artifact blocks promotion.
This is still not a retained branch proof: the full first-y quotient
enclosure, scaled remainder, `I1` composition, quadrature, and retained branch
status remain outside this certificate.

The live full-artifact run on the h38 cover has now separated two different
obstructions. The evaluator accepts ordered
\texttt{coordinateSourceEnvelopeCandidates}; if a wide candidate overflows the
positive Taylor/geometric-tail $\sinh$ majorant, the same cell can fall back to
a smaller same-domain coordinate-source radius and record the rejected
candidate as provenance. A read-only full-cover probe with
\texttt{coordinateCauchyOuterRadius=0.01},
\texttt{coordinateJacobianOuterRadius=0.01},
\texttt{coordinateJacobianNumeratorOuterRadius=0.02}, and
\texttt{denominatorCauchyOuterRadius=0.01} emits no source-certificate
obstructions and leaves the upstream-source composer input-ready on the same
domain.

That does not yet supply a certified seven-input primitive witness on the live
h38 cover. The small-radius source certificate makes the raw unshifted Cauchy
pressure enormous: in a one-row radius scan, certified coordinate radii
$0.01,0.02,0.05,0.1,$ and $0.15$ keep the source handoff finite but leave the
profile replay at
\texttt{h39-full-cauchy-primitive-profile-vector-candidate-scale-inequalities-open}.
At radius $0.01$, for example, the unshifted Cauchy route reports
$E_R\approx2.22\times10^{85}$ and
$M_R\approx4.69\times10^{85}$. By radius $0.2$ the coordinate $\sinh$
envelopes overflow again. Thus the current blocker is not merely a missing
radius choice; it is the need for a shifted or cancellation-aware source
envelope for $R_{\varepsilon,43}=F_\varepsilon/y^{43}$ and
$y\,\partial_yR_{\varepsilon,43}$ that avoids the raw $R^{-43}$ Cauchy
penalty while preserving the same-domain provenance contract.

The evaluator now has that shifted-source inlet as an executable candidate
path. A \texttt{coordinateSourceEnvelopeCandidates} row may declare
\texttt{sourceEnvelopeKind=shifted-removable-r43-cauchy-outer-bound}, supply a
direct shifted $R_{\varepsilon,43}$ outer bound and radius, and carry both a
directed-rounded shifted-bound provenance flag and a zero-prefix certificate
for the removable quotient. The finite-prefix sanity check verifies that the
supplied shifted bound dominates the emitted shifted $R_{\varepsilon,43}$
coefficient prefix at the source radius, and the summary then uses Cauchy
shift power $0$ instead of dividing a raw $F_\varepsilon$ bound by
$R^{43}$. On the focused fixture, a supplied shifted bound $10^{-3}$ at radius
$0.01$ reduces the profile inputs to
$E_R\approx6.16\times10^{-7}$ and
$M_R\approx1.92\times10^{-7}$ and moves the complete five-pressure profile
from scale-open to
\texttt{h39-full-cauchy-primitive-profile-vector-candidate-closes}. The claim
boundary remains unchanged: the path is a cancellation-aware primitive-profile
inlet, not retained branch status and not a proof of the shifted bound across
the full h38 cover.

## Candidate Provenance No-Go Report

The current primitive-vector backend now has an executable non-promotion
report. It attempts to build the provenance report from the backend artifact
itself and returns
\texttt{open-candidate-only-primitive-provenance}. The reason is structural:
the source backend marks the primitive bounds as \texttt{provided-unverified},
sets \texttt{candidate\_only=true}, and leaves
\texttt{verifies\_primitive\_bounds\_provenance=false},
\texttt{certifies\_continuous\_polydisc\_primitives=false}, and
\texttt{certifies\_directed\_rounded\_shared\_domain=false}.

Thus, even when the candidate tuple satisfies the strict h39 scalar replay,
the artifact cannot honestly emit
\texttt{directed-rounded-same-domain-primitive-provenance-certified}. Its
strongest proof object is a no-go theorem for the artifact claim level:

$$
\text{candidate primitive vector}+\Lambda_{39}^{\mathrm R}<1
\not\Rightarrow
\text{directed-rounded h39 continuous-tail certificate}.
$$

The no-go report does not disprove the h39 tail. It proves that this backend
has not supplied the same-domain directed-rounded proof object required to
promote it.

## Minimal Primitive-Provenance Witness Set

The directed-rounded backend target is now finite. A proposed h39 primitive
backend must report one domain signature

$$
\mathfrak S
=
(\varepsilon\text{-pair},I_\nu,Y,\rho,\rho_X,r_X,X_c,
R_{\varepsilon,43},N_G,\text{tail model})
$$

and one primitive witness vector

$$
\mathfrak W_{39}
=
(E_R,M_R,M_G,\nu_J,L_J,\rho_X,r_X).
$$

The vector is promotion-complete for the existing h39 Rouché-primitive reducer
only if every component of $\mathfrak W_{39}$ is directed-rounded on the same
signature $\mathfrak S$, has the declared bound relation, and the replayed
strict inequalities hold:

$$
0<r_X<\rho_X,\qquad
J_R=\nu_J-L_J\rho_X>0,
$$

$$
\Gamma_R=\nu_Jr_X-E_R-\frac12L_Jr_X^2>0,
\qquad
\Lambda_{39}^{\mathrm R}<1.
$$

This witness set has five source families:

| Family | Components | Required same-domain witness |
| --- | --- | --- |
| $R_{\varepsilon,43}$ residual/root tangent | $E_R,M_R$ | residual and $y$-root-tangent numerator bounds |
| $N_G$ numerator | $M_G$ | numerator outer bound |
| Center Jacobian | $\nu_J$ | lower bound |
| $X$-Lipschitz kernel | $L_J$ | Lipschitz upper bound, equivalently the $y^{41}K_\varepsilon$ reduction |
| Graph radii | $\rho_X,r_X$ | declared outer and inner $X$ radii |

Omitting any family removes a theorem-level hypothesis even when the scalar
replay can still be evaluated. A domain-signature mismatch in any one
component is also a proof obstruction:

$$
\exists a,b\in\mathfrak W_{39}\quad \mathfrak S(a)\ne\mathfrak S(b)
\quad\Longrightarrow\quad
\mathfrak W_{39}
\not\Rightarrow
\text{directed-rounded h39 continuous-tail certificate}.
$$

The executable witness-set artifact records this reduction with status
\texttt{open-directed-rounded-witness-set-unverified}. It lists the exact
source field, source family, required relation, and first failed promotion
predicate for each of the seven components. This advances beyond the blanket
candidate-only no-go: the remaining backend is no longer "find provenance" in
general, but "supply these five same-signature witness families or accept the
named component obstruction."

The next executable layer now composes those families rather than adding a new
requirement. The component-subset composition packet has status
\texttt{h39-component-subset-composition-continuous-tail-certified} only when
the five subset packets validate, all seven components are certified on the
same $\mathfrak S$, no fixed speed-window field is present, and the embedded
primitive provenance certificate replay closes. Otherwise it remains
\texttt{h39-component-subset-composition-open} with the first failed predicate
named directly.

## Reduced $R_{\varepsilon,43}$ Source-Family Witness

The $E_R$ and $M_R$ members now have a two-component subset theorem. On the
shared graph-centered signature $\mathfrak S$, let the shifted
$R_{\varepsilon,43}$ coefficient prefix be
$\{r_{\varepsilon,m}\}_{m=0}^K$ on the target first-y radius $\rho$, and let
$B_{R,\varepsilon}^{\mathrm{out}}$ be a directed-rounded outer bound on the
same shifted analytic function on outer radius $R_y$, with $q=\rho/R_y<1$.
Then a same-domain shifted Cauchy witness supplies

$$
E_R
\ge
\max_\varepsilon
\left(
\sum_{m=0}^K |r_{\varepsilon,m}|\rho^m
+
\frac{B_{R,\varepsilon}^{\mathrm{out}}}{R_y^{43}}
\frac{q^{K+1}}{1-q}
\right),
$$

and

$$
M_R
\ge
\max_\varepsilon
\left(
\sum_{m=0}^K m|r_{\varepsilon,m}|\rho^m
+
\frac{B_{R,\varepsilon}^{\mathrm{out}}}{R_y^{43}}
\frac{q^{K+1}((K+1)-Kq)}{(1-q)^2}
\right).
$$

The executable \texttt{R43} source-family witness subset records this theorem.
It accepts a directed-rounded same-domain shifted Cauchy prefix-tail witness,
emits component provenance for $E_R$ and $M_R$, and certifies no other
primitive component. Candidate analytic profiles remain open until they carry
directed-rounded shared-domain provenance, but a certified source-family
subset can now feed the relation-aware primitive provenance certificate as a
stronger upper-bound witness for the primitive reducer input.

## Reduced $N_G$ Numerator Witness

The $M_G$ component now has the same narrow proof shape. Suppose

$$
N_G(y)=y^{41}\sum_{m\ge0}g_my^m,
\qquad
q=\rho/R_y<1.
$$

If a directed-rounded same-domain Cauchy witness proves an outer bound
$B_{N_G}^{\mathrm{out}}$ on the shared graph-centered signature
$\mathfrak S$, then the shifted prefix-tail estimate certifies

$$
M_G
\ge
\sum_{m=0}^K |g_m|\rho^{41+m}
+
B_{N_G}^{\mathrm{out}}
\frac{q^{41+K+1}}{1-q}.
$$

The executable \texttt{N\_G} numerator witness subset accepts exactly this
profile and emits component provenance only for $M_G$. It restores the
$y^{41}$ scale before the primitive-vector replay, rejects a wrong shift,
rejects $q\ge1$, rejects prefix-plus-tail undercoverage, rejects domain
mismatch, and rejects fixed speed-window fields. It does not certify the
branch denominator floors that may have produced $B_{N_G}^{\mathrm{out}}$;
those remain upstream same-domain obligations.

The denominator-Cauchy upstream route now has its own executable witness
wrapper. The \texttt{N\_G} denominator-Cauchy $M_G$ witness consumes the two
branch denominator candidates, requires positive speed, $\delta_\varepsilon$,
and Jacobian floors on both branches, checks that the branch majorants plus
$L_*$ and $R_y^2A_*$ compose the declared $N_G$ outer bound, and then generates
the same shifted prefix-tail profile consumed by
\texttt{buildH39NGNumeratorWitnessSubset}. This is not a sixth component
family: it is a finite upstream source for the existing $N_G$ numerator
family, and its positive claim is still only the $M_G$ primitive component.

## Reduced Center-Jacobian Floor Witness

The $\nu_J$ component is a lower-bound witness, so its inequality points in the
opposite direction from $E_R,M_R,M_G$, and $L_J$. If

$$
\partial_XR_{\varepsilon,43}(y,X_c(\nu),\nu)
=j_0+\sum_{m\ge1}j_my^m
$$

on the shared centered graph, and a directed-rounded Cauchy floor proves

$$
F_J
=
\operatorname{dist}(0,j_0)
-
\sum_{m=1}^K |j_m|\rho^m
-
B_{J}^{\mathrm{out}}\frac{q^{K+1}}{1-q}
>0,
$$

then any supplied primitive value satisfying $\nu_J\le F_J$ is a certified
same-domain lower bound for the retained center Jacobian. The executable
Jacobian-floor subset therefore certifies only the $\nu_J$ component and the
relation-aware provenance checker consumes it by requiring the witness value
to be at least as strong as the reducer input. The subset rejects nonpositive
floors, tail-loss undercoverage, candidate-only profiles, domain mismatch,
and fixed speed-window fields.

## Coordinate-Cauchy Source and Jacobian Upstream Witness

The coordinate-Cauchy route is now an upstream producer for two existing
component families, not a sixth primitive family. Suppose a directed-rounded
same-domain profile proves, for both fold-pair branches on one graph-centered
signature $\mathfrak S$,

$$
B_R\ge\max_\varepsilon B_{F,\varepsilon}^{\mathrm{out}},
\qquad
B_J\ge\max_\varepsilon B_{J,\varepsilon}^{\mathrm{out}},
$$

where $B_R$ is the shifted $R_{\varepsilon,43}$ source outer bound and $B_J$
is the removable center-Jacobian outer bound. If the shifted
$R_{\varepsilon,43}$ prefix-tail profile uses the same $B_R$ and outer radius,
and the center-Jacobian floor profile uses the same $B_J$ and outer radius,
then the coordinate-Cauchy wrapper may generate the two existing subset
replays:

$$
W_{\mathrm{coord}}
\Longrightarrow
W_{R43}(E_R,M_R;\mathfrak S),
\qquad
W_{\mathrm{coord}}
\Longrightarrow
W_J(\nu_J;\mathfrak S).
$$

The executable \texttt{coordinate-Cauchy R43/Jacobian} witness checks branch
coverage, source/profile outer-bound equality, nested removable-Jacobian
radii, shared-domain identity, directed-rounded provenance, and absence of a
fixed speed-window field. Its strongest positive claim is exactly the
certified component provenance for $E_R,M_R,\nu_J$. It does not certify
$M_G$, $L_J$, $\rho_X,r_X$, the full primitive vector, scaled remainder,
\texttt{I1}, quadrature, retained branch, or the h39 continuous-tail row.

## Graph-Radii Witness

The graph radii are exact declaration witnesses rather than analytic
majorants. On the same shared signature $\mathfrak S$, the graph-radii subset
may certify only

$$
0<r_X<\rho_X
$$

and exact equality between the directed-rounded witness values and the
primitive reducer inputs for $\rho_X$ and $r_X$. This subset does not prove the
Rouché graph lift by itself: $J_R>0$, $\Gamma_R>0$, and
$\Lambda_{39}^{\mathrm R}<1$ remain reducer replay conditions. Its purpose is
to prevent radius provenance from being silently inherited from a candidate
backend row.

## Reduced Lipschitz Component Witness

The $L_J$ member of the witness vector has a smaller conditional theorem than
the full h39 backend. On the shared graph-centered signature $\mathfrak S$,
define

$$
K_\varepsilon
=
\frac{2}{\nu^2}
-\sin\delta_\varepsilon
-\sin\phi_\varepsilon .
$$

The coefficient-series identity gives

$$
\partial_X^2R_{\varepsilon,43}=y^{41}K_\varepsilon .
$$

Therefore, if a directed-rounded same-domain certificate proves

$$
M_K\ge\max_\varepsilon\sup_{\mathfrak S}|K_\varepsilon|
$$

and the final multiplication is outward-rounded, then any value satisfying

$$
L_J\ge \rho^{41}M_K
$$

is an admissible primitive witness for the $L_J$ component:

$$
|\partial_XR_{\varepsilon,43}(y,X,\nu)
-\partial_XR_{\varepsilon,43}(y,X_c(\nu),\nu)|
\le L_J|X-X_c(\nu)|.
$$

The finite-only coordinate-seminorm helper still does not certify this
component. It supplies a candidate $M_K$ using elementary majorants and a
candidate $L_J=\rho^{41}M_K$, but it does not attach a same-domain signature,
analytic tail certificate, or directed-rounded transcendental enclosure. The
evaluator's branch-coordinate witness route supplies the certifiable
replacement when its coordinate Cauchy envelopes and positive-Taylor $\sinh$
envelopes are present. The executable
\texttt{L\_J} kernel witness subset records both sides of this boundary:
\texttt{open-L\_J-kernel-witness-unverified} for the current candidate row,
and
\texttt{directed-rounded-same-domain-L\_J-component-witness-certified} only
when an external $M_K$ witness satisfies the same-domain, analytic-tail, and
outward-rounded predicates. This is the first single-component promotion route;
it still does not certify $E_R,M_R,M_G,\nu_J,\rho_X,r_X$ or the full h39
continuous-tail row.

## $K_\varepsilon$ Majorant Witness

The $L_J$ subset now has its own immediate upstream witness. For each branch
$\varepsilon\in\{-,+\}$ on the same graph-centered signature $\mathfrak S$,
suppose a directed-rounded branch witness supplies

$$
\nu\ge\nu_->0,\qquad
|\delta_\varepsilon|\le D_\varepsilon,\qquad
|\phi_\varepsilon|\le \Phi_\varepsilon,
$$

with analytic-tail coverage, an outward-rounded majorant

$$
B_\nu\ge \frac{2}{\nu_-^2},
$$

and outward-rounded transcendental enclosures

$$
S_{\delta,\varepsilon}\ge\sinh(D_\varepsilon),
\qquad
S_{\phi,\varepsilon}\ge\sinh(\Phi_\varepsilon).
$$

The evaluator now sources these two scalar enclosures from the positive
Taylor series for $\sinh$ with a geometric omitted-tail majorant: after a
finite odd prefix, the first omitted term is divided by
$1-q_N(A)$, where $q_N(A)=A^2/((2N+4)(2N+5))<1$. Thus the branch witness
stores the partial sum, first omitted term, tail ratio, and tail majorant for
$A=D_\varepsilon$ and $A=\Phi_\varepsilon$ instead of relying on a bare
transcendental-provenance flag.

Then the triangle estimate for the structural kernel gives

$$
|K_\varepsilon|
\le
B_\nu+S_{\delta,\varepsilon}+S_{\phi,\varepsilon}.
$$

Therefore a directed-rounded value satisfying

$$
M_K
\ge
\max_{\varepsilon\in\{-,+\}}
\left(
B_\nu+S_{\delta,\varepsilon}+S_{\phi,\varepsilon}
\right)
$$

is a same-domain $K_\varepsilon$ majorant and can be passed directly to the
$L_J$ subset. The executable
\texttt{buildH39KepsilonMajorantWitness} artifact enforces exactly this
conditional theorem: both branches must be present, the branch signatures must
match $\mathfrak S$, the coordinate Cauchy envelope predicates and the two
Taylor-tail $\sinh$ envelope predicates must be true, and the emitted witness
may certify only $M_K$. Its
embedded $L_J$ replay may separately certify the $L_J$ component, but the
$K_\varepsilon$ artifact itself keeps all $L_J$, full primitive-vector,
continuous-tail, and retained-branch claim flags false. With no branch
coordinate witnesses, or with the current coordinate-seminorm candidate row
alone, the status remains
\texttt{open-K\_epsilon-majorant-witness-unverified}.

The shared-domain evaluator now supplies the corresponding branch-coordinate
producer. Its output is not a new closure certificate; it is the finite handoff

$$
(\nu_-,D_\varepsilon,\Phi_\varepsilon,B_\nu,
S_{\delta,\varepsilon},S_{\phi,\varepsilon};\mathfrak S)
$$

for each branch. The producer keeps finite-only coordinate seminorms open,
requires coordinate Cauchy prefix-plus-geometric-tail envelopes for
$D_\varepsilon$ and $\Phi_\varepsilon$ on the shared $\mathfrak S$, and
requires the Taylor-tail $\sinh$ envelopes before its branch witnesses can be
fed to
\texttt{buildH39KepsilonMajorantWitness}. When these branch witnesses certify,
the downstream majorant artifact may certify only $M_K$; $L_J$ remains the
separate subset replay and full h39 primitive closure remains open.

## Upstream-Source Composition

The upstream-source composition packet is the replay-only closure layer above
the current source producers. It consumes raw same-domain source inputs for the
existing $R_{\varepsilon,43}$, $N_G$, center-Jacobian, $K_\varepsilon/L_J$,
and graph-radii families, rebuilds their wrappers, extracts only the resulting
subset replays, and then feeds those subsets to the component-subset
composition artifact.

The packet may certify the h39 continuous-tail row only by producing
relation-aware witnesses for

$$
E_R,\quad M_R,\quad M_G,\quad \nu_J,\quad L_J,\quad \rho_X,\quad r_X
$$

on one shared $\mathfrak S$ and replaying the primitive provenance certificate
with $\Lambda_{39}^{\mathrm R}<1$. It is not a sixth source family and it does
not trust a prebuilt provenance report supplied by the caller; the validator
rebuilds the coordinate-Cauchy, denominator-Cauchy, $K_\varepsilon$ majorant
when branch witnesses are supplied, $L_J$, graph-radii, and
component-composition replays from the raw source fields.

The new direct $K_\varepsilon$ handoff removes the last manual bridge in the
$L_J$ route. If a caller supplies no external $M_K$ witness but does supply the
evaluator's branch-coordinate witness-set artifact, or the two certified
branch-coordinate witnesses extracted from it,
$(\nu_-,D_\varepsilon,\Phi_\varepsilon,B_\nu,S_{\delta,\varepsilon},S_{\phi,\varepsilon};\mathfrak S)$,
the upstream-source composition first replays
\texttt{buildH39KepsilonMajorantWitness}, extracts its generated $M_K$
witness, feeds that witness into \texttt{buildH39LJKernelWitnessSubset}, and
then continues the seven-component composition. If any branch predicate fails,
the obstruction is recorded at the $K_\varepsilon$ replay and the $L_J$
component remains open. This is a theorem bridge, not a new gate: the
composition still certifies only the embedded h39 continuous-tail row, and only
when the other six primitive witnesses and the strict scalar replay also close.

The evaluator source-certificate report removes the manual bridge in the
$E_R,M_R,M_G,\nu_J$ route as well. A shared-domain evaluator artifact with a
passing report supplies directed-rounded coordinate-Cauchy source handoffs for
$E_R,M_R,\nu_J$ and a directed-rounded denominator-Cauchy source handoff for
$M_G$. The upstream composer consumes those source objects directly, consumes
the evaluator's $K_\varepsilon$ branch witness set for $L_J$, consumes the
evaluator's graph-radii witness for $\rho_X,r_X$, and synthesizes the
primitive backend from the resulting seven component proofs only after the
reducer preflight closes.

The exact fixed-radii primitive-profile boundary in the h39 root-tangent
reducer is a candidate-scale diagnostic for the same replay. It may identify
the first strict obstruction among $J_{\min}$, the graph Rouché margin, and the
h39 scalar margin for simultaneous $E_R,\nu_J,L_J,M_G,M_R$ profile pressures at
fixed $\rho_X,r_X$, but it does not weaken the provenance rule. Candidate-only
profile inputs, mismatched domains, or relation-unaware values still cannot
promote the continuous-tail row even when the numerical scale satisfies
$\lambda<\lambda_*^{\mathrm{multi}}$. The associated $\lambda=1$
headroom/deficit may be logged as a candidate success marker for scalar replay
feasibility, but it is not a new gate and cannot promote candidate-only inputs.

Its open states are the expected proof obstructions: missing upstream source,
candidate-only provenance, domain mismatch, value-coverage failure, nonpositive
floor, failed envelope predicate, failed graph-lift margin, failed scalar
replay, or any forbidden fixed speed-window field. Its non-claims stay fixed:
no scaled remainder, no \texttt{I1}, no quadrature, no full first-y enclosure,
no full primitive-vector status, and no retained branch.

## Executable Artifact

The executable diagnostic is
[octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.mjs).
It wraps the h39 reducer
[octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-root-tangent-cauchy-majorant-tail-budget.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-root-tangent-cauchy-majorant-tail-budget.mjs),
copies the Rouché graph-lift status, the $\Lambda_{39}^{\mathrm R}$ ratio, the
Rouché-form $M_R$ ceiling, and the scalar radius-optimization statuses, and
validates that those copied fields match a fresh reducer replay.
It also exports
\texttt{buildH39SharedDomainPrimitiveProvenanceCertificate}, which rebuilds the
primitive-vector bridge, checks same-domain directed-rounded provenance, and
promotes only the h39 primitive continuous-tail row when the existing reducer
replay is strict.
The same module now exports
\texttt{buildH39CandidatePrimitiveProvenanceReportFromPrimitiveVectorBackendArtifact}
and \texttt{validateH39CandidatePrimitiveProvenanceReport}; these emit and
validate the candidate-only no-go report before the certificate checker tries
to promote anything.
It also exports
\texttt{buildH39PrimitiveProvenanceWitnessSetFromPrimitiveVectorBackendArtifact}
and \texttt{validateH39PrimitiveProvenanceWitnessSet}; these emit and validate
the minimal seven-component witness set.
It now also exports \texttt{buildH39LJKernelWitnessSubset} and
\texttt{validateH39LJKernelWitnessSubset}; these emit and validate the
single-component $L_J$ reduction from a directed-rounded $K_\varepsilon$
majorant witness, while keeping the current candidate kernel row open.
It now also exports \texttt{buildH39R43SourceFamilyWitnessSubset} and
\texttt{validateH39R43SourceFamilyWitnessSubset}; these emit and validate the
two-component $E_R,M_R$ reduction from a directed-rounded shifted
$R_{\varepsilon,43}$ Cauchy prefix-tail witness.
It now also exports \texttt{buildH39NGNumeratorWitnessSubset} and
\texttt{validateH39NGNumeratorWitnessSubset}; these emit and validate the
single-component $M_G$ reduction from a directed-rounded shifted $N_G$
prefix-tail witness.
It now also exports \texttt{buildH39NGDenominatorCauchyMGWitness} and
\texttt{validateH39NGDenominatorCauchyMGWitness}; these validate the
denominator-Cauchy upstream source, generate the shifted $N_G$ prefix-tail
witness, and replay the existing $N_G$ numerator subset without certifying any
non-$M_G$ primitive component.
It now also exports \texttt{buildH39JacobianFloorWitnessSubset} and
\texttt{validateH39JacobianFloorWitnessSubset}; these emit and validate the
single-component $\nu_J$ reduction from a positive directed-rounded
center-Jacobian Cauchy floor witness.
It now also exports \texttt{buildH39CoordinateCauchyR43JacobianWitness} and
\texttt{validateH39CoordinateCauchyR43JacobianWitness}; these validate the
coordinate-Cauchy upstream source, generate the shifted
$R_{\varepsilon,43}$ and center-Jacobian profile witnesses, and replay the
existing $R_{\varepsilon,43}$ and center-Jacobian subsets without certifying
any non-$E_R,M_R,\nu_J$ primitive component.
It now also exports \texttt{buildH39GraphRadiiWitnessSubset} and
\texttt{validateH39GraphRadiiWitnessSubset}; these emit and validate exact
same-domain provenance for the $\rho_X,r_X$ graph-radius declarations.
It now also exports \texttt{buildH39ComponentSubsetComposition} and
\texttt{validateH39ComponentSubsetComposition}; these assemble the five
component witness subsets into the primitive provenance report, replay the
existing primitive provenance certificate, and certify only the h39
continuous-tail row when all subset, domain, value-coverage, no-speed-window,
and scalar replay predicates pass.
It now also exports \texttt{buildH39KepsilonMajorantWitness} and
\texttt{validateH39KepsilonMajorantWitness}; these emit and validate the
two-branch $M_K$ witness that can feed the $L_J$ subset without certifying
$L_J$ inside the $K_\varepsilon$ artifact.
It now also exports \texttt{buildH39UpstreamSourceComposition} and
\texttt{validateH39UpstreamSourceComposition}; these consume the raw
coordinate-Cauchy, denominator-Cauchy, $K_\varepsilon/L_J$, and graph-radii
handoffs, rebuild the upstream wrapper replays, optionally replay the
evaluator's certified $K_\varepsilon$ branch witness set into the generated
$M_K\to L_J$ subset,
extract their component subsets, synthesize the primitive-vector backend from
the certified component values when the reducer preflight closes, replay the
component-subset composition, and certify no claim stronger than the embedded
h39 continuous-tail row.
The shared-domain evaluator now exports
\texttt{buildH39KepsilonBranchCoordinateWitness} and
\texttt{buildH39KepsilonBranchCoordinateWitnessSet}; these prepare the branch
coordinate witnesses consumed by the $K_\varepsilon$ majorant artifact. It now
also emits an evaluator source-certificate report that marks its coordinate
and denominator Cauchy source handoffs as same-domain directed-rounded when
their structural and transcendental-envelope predicates close, and exports
\texttt{buildH39EvaluatorGraphRadiiWitness} for the exact
$(\rho_X,r_X;\mathfrak S)$ declaration consumed by the graph-radii subset.

The companion test is
[neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.test.js).
It verifies the missing-bound report, unverified-provenance block, external
directed-rounded replay pass, failing-bound report, overclaim rejection,
speed-band rejection, reducer-drift rejection, and CLI write/validate/schema
behavior. It also verifies the primitive-vector theorem bridge for missing
input, complete-but-unverified candidate input, and external replay-pass input,
while keeping every directed-rounded and retained-branch claim false. The same
test now verifies that a synthetic same-domain provenance report promotes only
the h39 primitive continuous-tail row, and that domain mismatch, overclaim
mutation, candidate-only provenance, missing vector input, and fixed
speed-band fields remain non-promoting.
It also verifies the minimal witness set for complete and missing primitive
vectors, overclaim drift, and speed-band rejection.
It now verifies the $R_{\varepsilon,43}$ source-family witness subset in open
and certified modes: the current analytic profile remains candidate-only,
while a synthetic directed-rounded same-domain shifted Cauchy profile certifies
only $E_R$ and $M_R$ and can feed the relation-aware primitive provenance
certificate as stronger upper bounds.
It now verifies the $N_G$ numerator, center-Jacobian floor, and graph-radii
witness subsets in open and certified modes: the synthetic directed-rounded
profiles certify only $M_G$, only $\nu_J$, and only $\rho_X,r_X$ respectively,
reject fixed speed-window fields, and compose with the $R_{\varepsilon,43}$
and $L_J$ subsets into a full same-domain primitive provenance report.
It now verifies the denominator-Cauchy $M_G$ witness wrapper: a certified
same-domain two-branch denominator source feeds the existing $N_G$ subset,
while candidate-only source provenance, domain mismatch, missing branch data,
overclaim drift, and fixed speed-band fields remain non-promoting.
It now verifies the coordinate-Cauchy $R_{\varepsilon,43}$/Jacobian wrapper:
a certified same-domain two-branch coordinate source feeds the existing
$R_{\varepsilon,43}$ and center-Jacobian subsets, while candidate-only source
provenance, domain mismatch, missing branch data, profile mismatch, overclaim
drift, and fixed speed-band fields remain non-promoting.
It now verifies the component-subset composition packet itself: five certified
same-domain subsets promote through the embedded primitive provenance replay
to the h39 continuous-tail row, while one open subset, a domain mismatch, a
full-vector overclaim, or a fixed speed-band field remains non-promoting.
It now verifies the upstream-source composition packet itself: raw certified
upstream sources rebuild into the five subset replays and certify only the
embedded h39 continuous-tail row; when no external $M_K$ witness is supplied,
the evaluator's certified $K_\varepsilon$ branch-coordinate witness set
replays through the generated $M_K$ witness and then the $L_J$ subset.
It also verifies the reducer-safe evaluator row that closes from one evaluator
artifact carrying source certificates, the $K_\varepsilon$ branch witness set,
and the graph-radii witness, with the primitive backend synthesized from the
certified component provenance rather than supplied manually.
It now verifies that this route emits the explicit certified seven-input
primitive witness for the vector
$(E_R,M_R,M_G,\nu_J,L_J,\rho_X,r_X;\mathfrak S)$, including exact component
value agreement with the provenance report and exact graph-radii replay.
Coordinate-source,
denominator-source, bad $K_\varepsilon$ branch replay, missing kernel-witness,
graph-domain, primitive-value, embedded-replay, overclaim, and fixed
speed-window failures remain non-promoting.
It now verifies the $L_J$ kernel witness subset in both modes: the current
kernel majorant remains open, while a synthetic directed-rounded same-domain
$M_K$ witness certifies only the $L_J$ component and leaves full h39 primitive
closure false.
It now verifies the $K_\varepsilon$ majorant witness in open and certified
modes: missing branch witnesses keep the current row open, complete
same-domain branch witnesses certify only $M_K$, a missing $\sinh$ envelope
proof object remains an exact failed predicate, and domain mismatch, overclaim
drift, and fixed speed-band fields are rejected.
The evaluator companion test also verifies that the branch-coordinate witness
producer leaves finite-only rows open, emits two same-domain branch witnesses
when Cauchy and provenance inputs are supplied, feeds the $M_K$ majorant
without claiming $L_J$ inside the $K_\varepsilon$ artifact, and blocks missing
$\sinh$ envelope provenance. It now also verifies that the evaluator emits
same-domain coordinate-Cauchy and denominator-Cauchy source certificates, with
positive-Taylor $\sinh$ envelope provenance, and emits the exact graph-radii
witness, while keeping retained-branch and full first-y claims false.

## Claim Boundary

This packet may claim:

$$
\texttt{consumes\_primitive\_bounds=true},
$$

and it may claim that the supplied values satisfy or fail the already-proven
h39 scalar reducer.

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_shared\_domain=false},
\qquad
\texttt{certifies\_directed\_rounded\_h39\_polydisc\_M\_G\_bound=false},
$$

$$
\texttt{certifies\_directed\_rounded\_h39\_polydisc\_Xi\_bound=false},
\qquad
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_continuous\_successor\_tail\_bound=false},
$$

$$
\texttt{certifies\_directed\_rounded\_fold\_pair\_scaled\_remainder=false},
\qquad
\texttt{certifies\_I1\_regular\_critical\_exhaustion=false},
\qquad
\texttt{retained\_branch=false}.
$$

The direct successor remains the shared-domain h39 primitive evaluator that
actually computes $E_R$, $\nu_J$, $L_J$, $M_G$, and $M_R$ on the same
graph-centered domain, with the same speed cell, $y$ disc, branch,
$\rho_X$, $r_X$, and center graph data.
