# Final independent audit of the Maxwell E neutral-history comparison

The inspected neutral transformation and aligned radial/component comparison retain delayed physical source acceleration. Their mathematical identities do not require an unproved actual jerk or differentiation of a time-dependent rotated surrogate. This is a derived conclusion for the bounded core identified below. It does not independently recertify every numerical row, transfer, arithmetic primitive, or earlier campaign result, and it establishes no new physical event.

The selected case remains the opposite-polarity mirror-planar Section 7 E equation with $K=c_f=1$ and the complete compatible $C^{2,1}$ circle-tail/patch specified by $\beta=0.3$, $r=25/9$, and $\omega=27/250$. The [current assessment](maxwell-e-first-event-independent-assessment.md) reports the strongest admitted actual prefix through $56.72222$. This audit does not extend that prefix. Its final time-54 comparison stopped at a proposed source-search guard before root-family or receiving-cylinder acceptance; that stop has no physical-event interpretation.

## Independent reference and scope

The [independent reference](maxwell-e-first-event-final-neutral-hale-reference.md) was written and hashed before any subject helper, subject theorem, or coordinator assessment was opened. Its frozen SHA-256, measured by `shasum -a 256`, is `7a47b1a2e379db9dc44259f310f8171d5486e1073e1f1dd71e3a0709932b95b5`. Its input was Section 7 of the [equation manuscript](../../equation-variants/manuscript.md#7-complete-maxwell-shaped-transmitter-response), the assigned mirror signs, and elementary chain rules. The stationary-source and transverse-acceleration controls were established analytically before subject inspection.

The reference derives an additional receiver-dependent coordinate $p=u+Q/W$, with $W=1-n\cdot u$, which fully removes source acceleration from that coordinate's derivative on $W>0$. The campaign subject instead uses the simpler $p=u+Q$ and deliberately retains a reduced source-acceleration coefficient. These are distinct coordinates. The additional coordinate is an unused mathematical reference, not a repair, adopted campaign method, new evolution, or event proof. It suggests a future comparison coordinate whose error bounds and numerical usefulness remain unassessed; it neither replaces the accepted physical-source-A reconstruction nor certifies an event. It should not be substituted into the campaign's existing recurrence or receipts. In particular, its $W>0$ inverse has a narrower boundary domain than the subject's velocity-independent correction.

The core inspected in full consists of the neutral velocity-transform, velocity-error, signed-current, signed-source, nominal-receiver, component-source, radial-receiver-family, integrated-radius, and conditional-first-unit theorem files. Source inspection covered the coefficient-v2 and nominal-receiver coefficient helpers, radial-receiver-family-v4, component-source-v2 and its source-components-v3 dependency, signed-nominal-current, integrated-radius, angular-primitive, root-speed-floor, and conditional-E helpers. The final Cartesian54 driver was inspected for its imports, complete source selector, initialization, root/source family construction, receiving-cell recurrence, physical reconstruction, history storage, and failure path. The stored comparison history evaluator and cache were inspected as ancillary context; their full arithmetic foundation and every imported helper were not rederived. The current assessment's neutral sections and final disposition were read after the reference was frozen. No Weber/Darwin material was used.

## 1. Exact transformation and physical acceleration

Use the subject's physical source notation: $v=Y'(S)$, $a=Y''(S)$, $r=X(T)-Y(S)$, $R=|r|=T-S$, $n=r/R$, $D=1-n\cdot v$, receiving velocity $u=X'(T)$, and opposite polarity $\sigma=-1$. Then the selected physical acceleration is

$$
F=G+Ba,\qquad G=\frac{\sigma(1-|v|^2)(n-v)}{R^2D^3},\qquad B=\frac{\sigma[(n-v)n^\top-DI]}{RD^3}.
$$

The source acceleration $a$ already has the physical negative-label sign; it is not the derivative of an intrinsic velocity component. The subject sets $q=\sigma(v-n)/(RD)$ and $p=u+q$. Direct differentiation gives

$$
q_v=-DB,\qquad S'=\frac{1-n\cdot u}{D},\qquad
q'=L_0-(1-n\cdot u)Ba,
$$

where $L_0$ contains the $R$ and $n$ derivatives at fixed source velocity. Adding $u'=G+Ba$ therefore proves

$$
p'=G+L_0+(n\cdot u)Ba.
$$

This is the exact subject identity. The cancellation is partial, and the factor multiplying $Ba$ is the actual receiving-ray projection. It vanishes only where that projection vanishes. No source-acceleration derivative is taken. Conversely $u=p-q$, followed by the same chain rule, restores $u'=G+Ba$ exactly. An arbitrary comparison's residual is unchanged because the same $q'$ is added to both its kinematic derivative and its transformed response.

The ray-frame helper can also be checked directly. Let $v_n,v_t,a_n,a_t,u_n,u_t$ be physical components in $(n,n^\perp)$, $D=1-v_n$, $R'=(u_n-v_n)/D$, and $\alpha=[u_t-v_t(1-u_n)/D]/R$. Then

$$
q=\left(\frac1R,-\frac{v_t}{RD}\right),\quad
L_r=-\frac{R'}{R^2}+\frac{\alpha v_t}{RD},\quad
L_t=\frac{v_tR'}{R^2D}+\frac{\alpha(D-v_t^2)}{RD^2},
$$

$$
H_r=-\frac{1-v_n^2-v_t^2}{R^2D^2}+L_r,\qquad
H_t=\frac{(1-v_n^2-v_t^2)v_t}{R^2D^3}+L_t+u_n\left(\frac{v_ta_n}{RD^3}+\frac{a_t}{RD^2}\right).
$$

These independently reconstructed expressions match the inspected `neutralFrame` formulas. In particular the nonzero delayed-acceleration row is visible in $H_t$; it has not disappeared behind a geometric bound.

## 2. Why comparison jerk suffices

At fixed reception time, first hold the actual root $S_a$ and actual receiving velocity fixed. Freeze the actual source-position offset $c=Y_a(S_a)-Y_c(S_a)$ and translate the complete comparison history by this constant. Its root at the actual receiver is exactly $S_a$. Replace actual source velocity and acceleration by the comparison values at that same source time, bounding the full independent source V/A differences. Only after that replacement vary the receiving position relative to the fixed translation through the nominal-source root family. Finally vary receiving velocity at the nominal endpoint.

In the spatial step, differentiation of the source clock differentiates comparison acceleration only. To see the exact derivative obligation, let $f$ be a ray-frame vector response, let $\Theta f$ denote its angular derivative including input-component and output-basis rotations, and let $j=Y_c'''(S)$. The nominal-clock spatial columns are

$$
f_{X_n}=\frac{f_R+(v_t/R)\Theta f-f_v a-f_a j}{D},\qquad f_{X_t}=\frac{\Theta f}{R}.
$$

They follow from $\delta S=-\delta X_n/D$, $\delta R=\delta X_n/D$, and $\delta\theta=\delta X_t/R+v_t\delta X_n/(RD)$. The inspected coefficient helper implements these columns, including the rotated receiving-velocity components. Its `clock` evaluation uses comparison V/A/J. Its separate `offset` evaluation expands physical source V/A and supplies the direct derivative bounds. No actual J is supplied or inferred from an acceleration error.

The sequential order also proves the tightened receiver derivative. For a fixed complete source, $H=F+q_T+q_Xu$, so $H_u=q_X$. The receiver step occurs at the nominal source endpoint, allowing `clock.H.Fu`; the spatial family still retains the actual receiving-velocity cylinder, and fixed-root source V/A replacement remains expanded. Interval arithmetic must retain independent combinations of these mean-value coefficients; equality of symbols does not authorize identifying distinct averaged columns.

For a piecewise $C^{2,1}$ comparison, its acceleration is continuous and Lipschitz, and its jerk exists almost everywhere with piecewise bounds. The spatial difference estimate follows by integration along the mean-value path; no classical third derivative at every knot is necessary. All crossed comparison pieces must be included. This regularity fact does not turn a numerical nominal-J enclosure into an actual-J bound.

## 3. Alignment, radial families, and components

At one reception time a single constant rotation aligns receiving rays. The resulting position difference is $\delta r\,n_c(T)$. The radial receiver construction therefore encloses the receiving mean-value segment by $X_c+[-e_r,e_r]n_c(T)$. It does not make the relative source–receiver displacement radial: the frozen source-position offset is independent and may have a transverse part. The inspected radial helper preserves that full offset in both `rootBox` and the relative position supplied to neutral and original-E coefficients.

For this fixed reception rotation, physical source velocity and acceleration rotate as vectors. The residual source angle is the integral of the physical angular-rate difference from source to receiver. The angular primitive includes the supplied negative-time segment, every intervening completed bin, and the current receiving trial. A rotating surrogate assembled across reception times would have extra derivatives; that curve is not used as a source history here.

The differentiated intrinsic error equation does retain the moving-frame contribution. With clockwise $J$, $z=p_{a,\mathrm{intr}}-p_{c,\mathrm{intr}}$ obeys a term $\omega_aJz+(\omega_a-\omega_c)Jp_c$. Only the first term is skew and drops from Euclidean norm growth. The inspected signed block retains the second term, including its $Q_t/r_a$ and $u_{c,t}/(r_ar_c)$ factors and the positive lower-right rank-one contribution. Equal weights on the two p coordinates justify the skew cancellation after scaling radius by $\nu$.

For a fixed-root source derivative row $w$, rotate the intrinsic source error into the nominal source axes. Its radial coefficient is bounded by $\min(\|w\|,|w\cdot n_s|+\|w\|\Psi)$ and its tangential coefficient by the corresponding expression with $n_s^\perp$. The rotated nominal physical vector contributes separately by $\|w\|V_c\Psi$ or $\|w\|A_c\Psi$. This proves the component helper's caps without discarding physical acceleration. Taking the minimum with an independently valid whole-vector bound preserves validity. The source and receiving axes are separately enclosed over the full retained root/time families before projection.

## 4. Closed histories and physical reconstruction

By direct source inspection, `sourceInventory` in the final Cartesian54 driver takes maxima over all overlapping completed bins for radius, full velocity, full acceleration, and their physical radial/tangential components. At an internal point seam it includes both adjacent closed bins; when the source window reaches nonpositive time it includes both supplied-past and initial error bounds. It rejects source windows past the completed face. This is a code-level finding, not a fresh validation of every stored numerical bound.

The same driver's `family` function constructs complete source and angular inventories before calculating the field coefficients. It verifies that both the auxiliary source window and the refined root interval fit the proposed completed guard. The source error bounds selected on the refined window must fit the previously expanded full source family. The root helper proves opposite signs at bracket faces for every parameter member and requires a positive nominal-clock derivative throughout its contraction; a successful Newton contraction alone is not substituted for the face proof.

The original physical E reconstruction is explicit after strict transformed W, radius, and physical-U acceptance. It uses the same certified root family and the full source-position, source-velocity and source-acceleration errors, then adds the unchanged original response residual. The reconstructed acceleration and its components are stored as whole-cell history bounds. Thus future reception consumes physical A, not p derivatives or intrinsic-velocity derivatives. The integrated-radius refinement remains a sufficient scalar inequality with positive denominator and its own strict trial; it does not borrow an unproved smaller cylinder for the root family.

## 5. Continuation and the final guard failure

The conditional first-unit theorem has the necessary local ingredients. Before a first unit-speed event, the complete original past supplies exactly one ordinary partner root and no positive-delay self root. A positive source lag permits sufficiently short method steps with the entire delayed history already completed. Completed $C^{2,1}$ history gives Lipschitz source acceleration; positive range and denominator give a locally Lipschitz source root and response. A local contraction argument then supplies unique continuation, and the response is Lipschitz in time on each compact step, preserving $C^{2,1}$ regularity. Iterating this argument over a finite certified partition is legitimate only while every source, seam, domain and boundedness premise remains true. Finite source acceleration by itself, without that history regularity and root control, would not suffice for uniqueness.

The retained final domain receipt was read directly with `cat`: it has `terminalContradiction: false`, endpoint $7674713329844545/140737488355328$, and separate entries for physical receiver acceleration, physical delayed source acceleration, and comparison source J. Reading those entries verifies what the receipt reports; this audit did not rerun that complete target instrument.

The retained guard-obstruction receipt was also read directly. It records an empty accepted-attempt list and a proposed upper source face $54.694335019974676434786898$ above the completed receiving face by

$$
\frac{1360774524900284947291950467359}{8388608000000000000000000000000}>0.
$$

The inspected driver's guard assertion precedes `neutralTube`, root-family acceptance, and receiving-cylinder acceptance. Therefore the stop establishes only that this proposal exceeded completed history. It does not locate an actual root, show actual loss of history regularity, prove every alternative guard impossible, or establish capture, stable binding, a first endpoint, or all-future fate.

## Validation, source identities, and disposition

Five existing known-case commands were run after the independent derivation and code inspection; each returned exit zero with its own final `passed: true`: `node` applied to `maxwell-e-first-event-neutral-coefficients-v2.mjs --known`, `maxwell-e-first-event-neutral-radial-receiver-family-v4.mjs --known`, `maxwell-e-first-event-neutral-component-source-v2.mjs --known`, `maxwell-e-first-event-neutral-signed-nominal-current.mjs --known`, and `maxwell-e-first-event-angular-primitive.mjs --known`, all under the adjacent `evidence/` directory. These check controlled implementation cases, not target evolution or physical fate. No new instrument, scientific target, existing-source modification, or background job was created. All five known-case processes returned exit zero. `git diff --no-index --check /dev/null` on each new report emitted no whitespace diagnostics; its exit-one status records the added content. Repeated `shasum -a 256` confirmed that the independent reference remained unchanged after subject inspection.

The following identities were measured with `shasum -a 256` on the inspected subjects:

| Subject under `../evidence/` | SHA-256 |
| --- | --- |
| `maxwell-e-first-event-neutral-velocity-transform-theorem.md` | `9d743f67f2ac11cf1293ee557cb1313affb8d3cbdb96c31255946b6ad1181676` |
| `maxwell-e-first-event-neutral-velocity-error-theorem.md` | `8e0694c894911e1d2af379a9e56b53381246a93bdd9f54d5d09f8b58c4c54838` |
| `maxwell-e-first-event-neutral-nominal-receiver-coefficients.mjs` | `9f38e32c218025b5755bce36809443e14529f44574e3732dd15e66ed47191445` |
| `maxwell-e-first-event-neutral-component-source-v2.mjs` | `2f2878922d23f5bc48f4e39d5992e0dc29fe9bf262f0e49e703fcfdb0945ab13` |
| `maxwell-e-first-event-neutral-radial-receiver-family-v4.mjs` | `ce19bcf6cb3c74e6a734056e1c74389f5a0ecbf6c4a28f3eff198ea9fb3c6611` |
| `maxwell-e-first-event-neutral-integrated-radius-Cartesian54-run.mjs` | `e34f47facbca0d34458ecd5e75f54811789775a0c0dd35c38836bcca69eccec7` |
| `maxwell-e-first-event-conditional-first-unit-theorem.md` | `a4f11446d728d34ce4a768e3447054bb8c603e08032f393045a1d841f2ff7654` |

Local retained receipt provenance is `reviewed-fine-neutral-Cartesian54-final-domain-v1.json` and `reviewed-final54-completed-guard-obstruction-v1.json` under the ignored binary Maxwell E evidence owner. Both report subject `854a482aac1b4d063e067be2f3f6585d8ab31f76b0f8384c2c6a0dc8f997147a` and rows `e2450cf4538a47ddd2884bc948ae2cbb50deb4a249716ca9d304743bd413c99c`. The tracked [reproduction procedure](../evidence/maxwell-e-first-event-Cartesian-late-reproduction.md) owns their regeneration; it was not invoked by this audit.

Only this audit and its frozen independent reference were created. No decisive gap was found in the inspected mathematical core. This conclusion is falsified by a missing mean-value source family, an omitted physical-A term, a root interval outside complete support, a seam without required compatibility, a substituted actual-J bound, a missing intrinsic angular-rate term, or reuse of the narrowed receiving geometry without its independent full source offset. A discrepancy in any uninspected arithmetic or retained target row would require reassessing that numerical application; it would not be settled by this core derivation alone. The assigned audit is complete, and no jobs remain owned by it.
