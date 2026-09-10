Closure goal: Determine whether a mirror-symmetric attractive two-architrino close approach admits an intrinsic, mathematically well-posed continuation derived from the regular delayed interaction, or whether the strongest defensible result is a precise nonuniqueness or no-go theorem.

Act as an independent mathematical research reviewer. Bring your strongest perspective from delayed functional equations, singular differential equations, geometric analysis, distribution theory, matched asymptotics, topology of root families, and well-posedness. Seek a rigorous foothold rather than a preferred physical story. A supporting technical note accompanies this request, but the definitions and claim boundaries needed for the review are reproduced here.

Before answering the focused questions, give your overall insights, corrections, and possible mathematical advances. Identify any hidden assumption, malformed limit, missing solution space, or stronger formulation that would materially change the problem. Then return exactly eight numbered substantive comments, one for each focused question below. Within every comment, label each major statement as one of:

- **Derived result:** follows from the stated equations and hypotheses.
- **Plausible inference:** supported by the structure but not proved.
- **Proposed innovation:** adds a candidate formulation that still requires proof.
- **Unresolved question:** not determined by the current mathematics.

Where appropriate, supply derivations, explicit counterexamples, competing continuations, and operator-checkable falsifiers. A concise proof or decisive obstruction is more valuable than a broad survey.

Plainly: first tell us what is wrong, missing, or promising in the problem as posed. Then answer eight precise mathematical questions without treating an attractive interpretation as evidence.

## Mathematical setting

The substrate is Euclidean three-space with absolute time. Architrinos have polarity but no primitive mass. The fundamental law is acceleration-first: each admissible delayed causal root contributes directly to acceleration. No force law, collision law, conserved account, quantum postulate, relativistic spacetime rule, or finite-sized particle model may be imported as a premise.

Use normalized wake-speed units \(c_f=1\). For an ordered receiver-transmitter pair \(i\leftarrow j\), reception time \(T\), and transmitter time \(s<T\), define

$$
\mathbf R_{ij}(T,s)
=
\mathbf X_i(T)-\mathbf X_j(s),
\qquad
r_{ij}(T,s)
=
\|\mathbf R_{ij}(T,s)\|,
$$

$$
\mathbf n_{ij}(T,s)
=
\frac{\mathbf R_{ij}(T,s)}{r_{ij}(T,s)},
\qquad
g_{ij}(T,s)
=
r_{ij}(T,s)-(T-s).
$$

A causal root is a solution \(s\) of \(g_{ij}(T,s)=0\). With transmitter velocity \(\mathbf v_j(s)=\dot{\mathbf X}_j(s)\), define

$$
D_{ij}(T,s)
=
1-\mathbf n_{ij}(T,s)\cdot\mathbf v_j(s)
=
\frac{\partial g_{ij}}{\partial s}(T,s).
$$

For a simple root satisfying \(r_{ij}>0\) and \(D_{ij}\neq0\), the declared per-root acceleration contribution is

$$
\mathbf A_{ij}(T;s)
=
C_{ij}
\frac{\mathbf n_{ij}(T,s)}
{r_{ij}(T,s)^2\,|D_{ij}(T,s)|}.
$$

Here \(C_{ij}\) is a fixed coupling with its polarity sign. For the opposite-polarity attractive control, use \(C_{12}=C_{21}<0\). The total regular acceleration is the sum over the complete set of admissible roots; no root may be discarded merely because another root is nearby.

Plainly: a receiver responds to every past transmitter point whose delayed sphere reaches it at time \(T\). The inverse-square factor measures spatial dilution, while \(1/|D|\) is the root-density factor produced when transmitter time is collapsed onto the causal roots. The formula is defined only when the past point is separated from the receiver and the root is simple.

## Attractive mirror control

Consider a collinear mirror-symmetric history along a fixed unit vector \(\widehat{\mathbf e}\):

$$
\mathbf X_1(t)=-z(t)\widehat{\mathbf e},
\qquad
\mathbf X_2(t)=+z(t)\widehat{\mathbf e},
\qquad
z(t)>0
$$

on an initial history interval. Begin at a large but finite separation and choose inward histories so that the two positions approach one another while the regular delayed-root conditions hold initially. The control must be posed as a genuine delayed-history problem: it needs a declared history space, a finite initial history segment or another mathematically sufficient initialization, a complete root census, and a stopping rule at the first event outside the proved regular domain.

The one-dimensional symmetry is a restriction of the full vector delayed-root law above. It is not permission to replace that law with an unrelated scalar inverse-square ordinary differential equation.

Plainly: the smallest useful control should remove unnecessary geometry while preserving the actual delayed roots, their multiplicities, their directions, and their inverse-square weights. A scalar look-alike that has no delayed-root census would answer a different problem.

## Singular events

Three boundaries can arise during close approach:

1. **Ordinary fold:** \(g=0\), \(D=\partial_s g=0\), and two simple roots merge or are born.
2. **Coincident root:** \(r=0\), so the direction \(\mathbf n\) is undefined.
3. **Combined or higher-order event:** fold, coincidence, tangency, or several root events occur together.

For an ordinary transverse fold, a local root coordinate can have the normal form

$$
g(u,\lambda)=u^2-\lambda.
$$

For \(\lambda>0\), the two roots are \(u_\pm=\pm\sqrt{\lambda}\). Because the regular law uses \(|D|^{-1}\), their magnitudes reinforce rather than cancel:

$$
\mathbf A_+ + \mathbf A_-
=
O(\lambda^{-1/2}).
$$

The pointwise acceleration therefore diverges at the fold. Along a transverse time crossing, however, a \(\lambda^{-1/2}\) divergence is locally integrable in time, so a finite integrated event update is not ruled out by that power count alone. Tangential crossings, simultaneous coincidence, or higher degeneracy can change the exponent and the conclusion.

Plainly: the regular value can blow up while its time integral remains finite. That observation makes an event map conceivable, but it does not prove that the event map is unique, path independent, compatible with coincidence, or determined by the original equation.

At a coincident root, the inverse-square factor and the undefined direction create a separate obstruction. Smoothing only the causal defect \(g\) does not automatically smooth \(\mathbf n/r^2\). Fold regularization and near-origin regularization are therefore different operations.

Plainly: making the root merger finite does not by itself make zero separation finite.

## What is already established and what is not

The following distinctions are part of the question:

- **Derived on the regular domain:** the displayed per-root acceleration is well-defined for every isolated simple root with \(r>0\) and \(D\neq0\); the complete regular value is the sum over all such roots.
- **Derived local obstruction:** the open-domain expression alone does not select a unique value supported on a fold or coincidence boundary. If one boundary distribution or counterterm is admitted, another boundary-supported term can be added without changing any regular-domain value.
- **Derived regulator warning:** normalized smoothings can recover the same sharp regular formula away from the event while giving different fold coefficients or finite boundary parts. A positive smoothing width, profile, support rule, or core radius is therefore extra input unless derived independently.
- **Plausible but unproved:** mirror symmetry and a complete root census may constrain root pairing, parity, and any admissible event map more strongly than a generic encounter.
- **Proposed but unselected:** distributional continuation, an integrated event map, a matched-asymptotic inner problem, or a new intrinsic state variable might supply a continuation.
- **Unresolved:** whether any such continuation is uniquely forced by the delayed interaction and its symmetries, whether only a restricted class of close approaches is continuable, or whether nonuniqueness is unavoidable without new constitutive input.

No continuation is currently selected. Returning an unresolved boundary event rather than a numerical value is the only permitted default.

Plainly: the regular equation is known, and several ways of adding a boundary rule are imaginable. The missing result is a proof that one rule follows from the equation—or a proof that none can.

## Focused questions

### 1. Smallest well-posed attractive control

Specify the smallest delayed-history initial-value or boundary-value problem that genuinely tests the attractive mirror close approach. State:

- the function space and regularity of the prescribed histories;
- the minimum initialization interval or other sufficient history data;
- the precise mirror and polarity constraints;
- how every causal root and its multiplicity are enumerated;
- the regular evolution interval;
- the first stopping event; and
- the existence, uniqueness, and continuous-dependence theorem that is available before that event.

Can the control be reduced further without becoming a scalar surrogate or preselecting the singular answer? Give either a theorem-ready formulation or a counterexample showing why a proposed minimal formulation is underdetermined.

### 2. Exact power and limits of symmetry plus complete root census

Derive exactly what mirror symmetry, opposite polarity, collinearity, and exhaustive root enumeration imply for:

- pairing of the two ordered root sets;
- equality or sign relations among the two acceleration histories;
- preservation of the mirror subspace before the first singular event;
- multiplicity and parity at a root birth; and
- the form of any admissible boundary update.

Then state what these facts do **not** prove. In particular, do they imply neither boundedness nor a unique continuation? Can you exhibit two inequivalent boundary rules that preserve all proved symmetries and the complete root identities while agreeing with every regular-domain value?

### 3. Intrinsic weak or distributional continuation

Is there a natural weak formulation in which the complete root sum has a canonical extension through a fold or coincidence? If yes, define:

- the solution and test-function spaces;
- the measure or distribution being extended;
- the topology of convergence;
- the treatment of \(|D|^{-1}\);
- the treatment of \(\mathbf n/r^2\);
- the admissibility or entropy-like condition, if any; and
- the uniqueness statement.

If no canonical weak extension exists, prove the sharpest nonuniqueness result you can. A useful no-go would construct at least two extensions that share the regular law, mirror covariance, root-relabeling invariance, and all declared local symmetries but disagree at the event.

### 4. Event-map formulation

Can one derive a single-valued event map by integrating the complete regular acceleration through a shrinking time window around the first transverse fold?

Analyze the limit

$$
\Delta\mathbf V_\varepsilon
=
\int_{T_\ast-\varepsilon}^{T_\ast+\varepsilon}
\sum_{s\in\mathcal R(T)}
\mathbf A(T;s)\,dT,
$$

where \(\mathcal R(T)\) is the complete root set and \(T_\ast\) is the first singular time. State the hypotheses under which this limit exists, is independent of the shrinking-window shape and approach path, attaches both incident roots exactly once, and produces a unique outgoing history. Test the proposal against tangential folds, simultaneous fold and coincidence, higher-order multiplicity, and accumulation of events. Provide a falsifier that would decisively reject event-map uniqueness.

Plainly: a finite integral is not enough. The same incoming history must lead to one outgoing history, independently of how the event is resolved or approached.

### 5. Matched asymptotics without an arbitrary core or width

Can the regular delayed interaction itself determine an inner scaling near close approach?

Seek a dominant-balance or blow-up formulation in which

$$
T-T_\ast=\varepsilon^\alpha\tau,
\qquad
r=\varepsilon^\beta R,
\qquad
D=\varepsilon^\gamma \mathcal D,
$$

with exponents and matching data fixed by the outer delayed-root geometry rather than by an inserted length, time, or profile. Determine whether the inner problem has a unique solution that matches the regular outer histories on both sides.

If a free scale, profile moment, phase, or subtraction constant survives, identify it explicitly and explain whether that proves the continuation is constitutive rather than intrinsic. Compare transverse folds, coincidence with \(D\neq0\), and combined fold-coincidence events rather than assuming one inner model covers all three.

Plainly: matched asymptotics would be intrinsic only if the original delayed equation fixes the inner variables and their matching constants. Hiding a free core radius inside a rescaling does not derive it.

### 6. Proper future repelling control

Design the minimal future comparison in which the polarity sign is reversed so that \(C_{12}=C_{21}>0\), while all admissible initialization, root-enumeration, stopping, refinement, and measurement rules remain unchanged.

Which quantities can be compared before the two trajectories cease to share the same root geometry? What would the comparison isolate: polarity-sign dependence, attraction-specific access to coincidence, fold topology, or merely different prescribed histories? State why a repelling control cannot be used to infer a missing attractive boundary value by symmetry, post-event matching, or sign reversal alone.

### 7. Minimal predeclared observables and falsifiers

Propose the smallest measurement set that can adjudicate a candidate continuation without importing any conserved account or later fitting. Consider at least:

- first singular time \(T_\ast\);
- complete root count, multiplicity, and identities on both sides;
- \(r_{\min}(T)\) and \(\min|D(T,s)|\);
- the singular exponent or local normal form;
- shrinking-window integrated acceleration;
- mirror-symmetry defect;
- outgoing-history uniqueness and continuous dependence;
- dependence on history refinement and root-isolation tolerance; and
- dependence on inequivalent regulators or approach paths used only as negative controls.

For each retained observable, give a predeclared pass condition and a decisive falsifier. Explain which observables test the regular law, which test event existence, and which test uniqueness. Do not include stability, retention, particle identity, solver acceptance, or a conserved energy, momentum, or angular-momentum account.

### 8. Decision theorem: intrinsic continuation or no-go

Give the strongest theorem statement that this programme should seek next. It may be positive, conditional, or negative.

A positive theorem must identify hypotheses under which one continuation is derived from the delayed interaction, agrees with the complete regular root sum, is unique in a declared solution class, preserves the proved mirror relations, and survives the predeclared falsifiers.

A no-go theorem should identify the smallest assumption set under which no unique boundary continuation can be extracted. Prefer a constructive proof using two inequivalent extensions or event maps satisfying every regular-domain and symmetry condition. If one additional axiom would restore uniqueness, name the weakest such axiom and classify it as new constitutive input rather than a result of the present equations.

End by stating which outcome is presently better supported and the single most decisive derivation or counterexample to attempt next. Do not declare the underlying close-approach problem solved merely because one candidate is mathematically convenient.

## Invalid shortcuts and strict claim boundary

Do not use any of the following as a solution:

- an arbitrary finite spatial core, causal-defect width, delay floor, profile, or matching scale;
- a scalar inverse-square surrogate that omits vector delayed-root geometry;
- deletion of one member of a root pair, incomplete root enumeration, or silent zeroing of an undefined row;
- replacement of \(|D|^{-1}\) by a signed factor solely to force cancellation;
- a post-fit impulse, counterterm, subtraction constant, or boundary coefficient;
- a mollifier that is called intrinsic merely because it recovers the regular law away from the event;
- a fold prescription reused at coincidence without separately treating \(\mathbf n/r^2\);
- a conservation, stability, retention, or particle-identity argument;
- force, mass, momentum, or standard collision framing; or
- numerical agreement between two implementations of the same chosen rule as proof that the rule itself is correct.

The response is research input only. It may sharpen the theorem target, propose candidates, or establish a no-go result. It does not authorize a new interaction, boundary rule, physical interpretation, or solver-acceptance claim.

Plainly: do not repair the singularity by choosing a convenient knob, throwing away a root, or fitting the desired rebound. Either derive the continuation from the delayed mathematics with a uniqueness proof, or explain precisely why new input is unavoidable.
