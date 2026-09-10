# Same-Transmitter Reachability Under the Sharp EOM

## Result and authority

This analysis advances current campaign effort 1 by deriving a quantitative exclusion for an actual evolving self-root branch. A positive-delay self root cannot approach the diagonal while the receiver has bounded velocity, the recent self rows point into one fixed forward cone, and the remaining acceleration has an integrable opposing projection. The proof bounds the total variation of reciprocal delay by the integrated canonical acceleration. It does not assume bounded acceleration, a universal speed ceiling, a prescribed outgoing path, or a boundary update.

The existing stationary-history mirror release supplies the appropriate minimal control. Its accepted EOM future reaches field speed with positive separation and **no** positive-delay self root. Its attempted regular continuation is already excluded by MEC-007. Consequently that release is neither an actual self-root sequence approaching zero delay nor evidence that every admissible history avoids such a sequence. The new result extends the exclusion argument to a quantified regular class and identifies the precise missing hypothesis for a more general claim: control of the opposing acceleration and of self-root lineage through other singular events.

Claim grade: **derived**, conditional on the explicitly stated solution and root hypotheses below; independent acceptance of this new theorem is **unresolved**. The accepted MEC-007 result and its existing independent reference remain inputs. No MEC lifecycle status is changed. A complete EOM branch violating the reciprocal-delay bound while satisfying its hypotheses would falsify the new result.

The only durable output of this assignment is this file. The shared queue, trackers, both synthesis files, MEC-007 owner, historical evidence, and independent instruments remain read-only. Proposed coordinator integration is recorded at the end.

## Causal geometry and the target

We work in normalized wake-speed units with $c_f=1$. All times are absolute time, and all positions belong to the Euclidean void. Fix one persistent label $i$, write its position and velocity as $\mathbf X(T)$ and $\mathbf V(T)$, and let $s<T$ be an emission by that same label. A self root satisfies

$$
\delta=T-s>0,
\qquad
\|\mathbf X(T)-\mathbf X(s)\|=\delta,
\qquad
\mathbf n=\frac{\mathbf X(T)-\mathbf X(s)}{\delta}
$$

Here $\delta$ is delay, equal to range in the chosen units, and $\mathbf n$ is the unit vector from the emission site to reception. The diagonal $s=T$ is excluded from the admitted root set. Equal coordinates of two different labels do not make their partner channel a self channel.

On a simple root, meaning that the emission-time derivative $D_t$ is nonzero, the unchanged canonical law and root playback are

$$
D_t=1-\mathbf n\cdot\mathbf V(s),
\qquad
D_r=1-\mathbf n\cdot\mathbf V(T),
\qquad
\mathbf A_s=\frac{K_i}{\delta^2|D_t|}\mathbf n,
\qquad
\frac{ds}{dT}=\frac{D_r}{D_t},
\qquad
K_i=\kappa|q_i|^2>0
$$

The self polarity factor is positive. Thus every sufficiently recent self row accelerates approximately along the receiver's current velocity; an older self row can have a different direction. The receiver factor governs playback and is not an additional acceleration multiplier. These formulas are the postulated regular law from the [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md); the results below are derived consequences on solutions of that law.

There are three different endpoint questions.

| Question | Required evidence |
| --- | --- |
| An EOM future reaches $\|\mathbf V(T_*)\|=1$ | A finite one-sided velocity limit at a field-speed event |
| An actual self-root branch approaches the diagonal | EOM reception times and same-label emission times with $\delta\to0$, retaining complete root provenance on the evolving side |
| A prescribed extension has a branch attached to that diagonal | A geometric root calculation on the supplied extension; this alone supplies no EOM future |

The first question does not imply the second. The third can expose an obstruction to continuation without constructing the second. First-boundary arrival, existence of a nontrivial incident root stratum, and continuation across that stratum must retain these separate meanings.

## What the accepted mirror release decides

For the left and right opposite-polarity labels, [MEC-007](mirror-close-approach-causal-root-boundary.md) uses $\mathbf X_-= -q\mathbf e$, $\mathbf X_+=q\mathbf e$, and inward speed $u=-\dot q$. The independent instrument declares the complete stationary past $q=1/2$, $u=0$ through release $T=0$, represented from $T=-20$ with all-earlier stationary exclusion. Its reduced coupling is $K=0.2862286103053385$. This prescribed past is input to future evolution; it is not asserted to solve the EOM before release.

On the accepted incoming chart, the unique partner root and acceleration obey

$$
q(T)+q(s_p)=T-s_p=R,
\qquad
\dot u=\frac{K}{R^2[1-u(s_p)]}>0
$$

The accepted first-boundary theorem gives $u(T_*)=1$ with $q(T_*)>0$, $R_*>0$, and $1-u(s_p)>0$. The [independent incoming ledger](../evidence/mec-007-stationary-mirror-incoming-ledger-2026-09-02.md) reports $T_*\simeq1.5726396643$, $q_*\simeq0.0515067031$, and $R_*\simeq0.2912646145$. These are retained measurements from the existing oracle, not new integrations or interval enclosures in this assignment.

Choose the coordinate $x$ increasing inward for either label. Every self candidate at or before the endpoint has

$$
x(T)-x(s)-(T-s)=\int_s^T[u(v)-1]\,dv<0
\qquad(s<T\le T_*)
$$

Strict negativity follows from the complete strict-sub-field earlier history; equality of speed at the final time does not change the integral. Hence the actual incoming EOM has zero positive-delay self roots throughout, including the endpoint. Its closure in the space of admitted incoming self roots is empty: there is no incoming self sequence to certify.

The already accepted [post-threshold obstruction](../../../office-of-research/research-history/review-packets/master-equation-post-field-speed-existing-law-continuation-obstruction-2026-07-29.md) also rules out a regular plateau or reversal on this same record. The old partner row remains nonzero and inward; any newly admitted local self row is inward too. A continuous-velocity continuation satisfying the complete sharp row sum would therefore enter $u>1$. Its geometric self match then has $s<T_*<T$, one root per label, and the exact measure

$$
A_s\,dT=\frac{K_i}{\delta^2(w_-+w_+)}\,d\delta,
\qquad
w_-=1-u(s)>0,
\qquad
w_+=u(T)-1>0
$$

That measure has infinite inward integral at birth. This is the accepted contradiction to a regular unchanged-law continuation, not an outgoing trajectory. No rerun, new geometry, boundary value, or reconsideration of MEC-007 acceptance is needed here.

The [straight-line causal-shadow analysis](coincide-or-not.md#locally-affine-root-existence-classification) and its [independent finite adjudication](mec-008-independent-adjudication.md) answer a different question. Their target receivers have a uniformly super-field inward velocity on the new segment, so recent same-label chord lengths exceed their delays. Old self roots stay at positive delay while different-label coordinates reach contact. A bi-infinite affine super-field history can have no self roots, but its unbounded spatial history differs from the bounded stationary-shelf class. Neither version produces the requested evolving self sequence.

Claim grade: **derived** for the incoming channel exclusion and the separation of mathematical targets; **measured** only for the explicitly attributed retained endpoint numbers. Falsifiers are an extra admitted incoming self root on the frozen mirror record, a failure of its strict integral inequality, or a nonzero-delay self sequence in the independently adjudicated finite contact construction. A different history is not such a falsifier.

## Fixed reception and moving reception are different limits

The [local chord expansion](coincide-or-not.md#same-transmitter-local-chord-expansion) fixes reception $T$ and varies delay. For a $C^4$ path, with $v=\|\mathbf V\|>0$, acceleration $\mathbf A=\dot{\mathbf V}$, and jerk $\mathbf J=\dot{\mathbf A}$, it gives

$$
\frac{G(T,\delta)}{\delta}
=v(T)-1-\frac{\mathbf V(T)\cdot\mathbf A(T)}{2v(T)}\delta+C_3(T)\delta^2+O(\delta^3)
$$

Here $G$ is chord length minus delay and

$$
C_3(T)=\frac{\|\mathbf A(T)\|^2}{8v(T)}
+\frac{\mathbf V(T)\cdot\mathbf J(T)}{6v(T)}
-\frac{[\mathbf V(T)\cdot\mathbf A(T)]^2}{8v(T)^3}
$$

For infinitely many roots at that **one fixed reception**, the first nonzero coefficient cannot keep a fixed sign. The stated vanishing tests follow. They must not be applied unchanged to $G(T_n,\delta_n)=0$ when both variables move.

For moving reception, continuous endpoint velocity alone gives a simpler necessary condition:

$$
\mathbf n_n=\frac{1}{\delta_n}\int_{T_n-\delta_n}^{T_n}\mathbf V(v)\,dv
\longrightarrow\mathbf V_* =\lim_{T\to T_*}\mathbf V(T),
\qquad
\|\mathbf V_*\|=1
$$

The averaging interval shrinks to $T_*$, and every $\mathbf n_n$ has norm one. No Taylor expansion or universal speed bound is required. Moreover, all sufficiently recent self rows near this endpoint lie in a common cone about the fixed unit vector $\mathbf e=\mathbf V_*$. For example, continuity supplies a neighborhood in which $\|\mathbf V-\mathbf e\|<1/2$, giving $\mathbf e\cdot\mathbf n>1/2$ on every contained self-root chord.

The existing mirror transverse normal form already shows why moving-reception coefficients cannot simply be set to zero: on its conditional $C^2$ extension, $a_* =\dot u(T_*)>0$, $\delta=2(T-T_*)+o(|T-T_*|)$, and $G(T,\delta)=0$ by cancellation between the varying linear and quadratic terms. The acceleration at the endpoint need not vanish. This statement concerns the existing prescribed extension, not an EOM witness.

For an **incoming** sequence $T_n<T_*$ with a $C^2$ endpoint, a nonzero $a_*=v'(T_*)$ does exclude sufficiently recent roots. Write $h=T-T_*<0$. The second-order chord expansion, uniform on a shrinking endpoint neighborhood, gives $0=a_*(h-\delta/2)+o(|h|+\delta)$. Since $|h-\delta/2|\ge(|h|+\delta)/2$, this is impossible for sufficiently small $|h|+\delta$. This does not extend the fixed-reception cubic test to moving receptions. To see the remaining algebraic distinction without prescribing another path, let $\epsilon=T_*-T$, $v(T)=1+b\epsilon^2+o(\epsilon^2)$, and $v'(T)=-2b\epsilon+o(\epsilon)$ on a $C^4$ endpoint germ. For a candidate $\delta=z\epsilon$ the leading root equation is

$$
b+bz+C_3(T_*)z^2=0
$$

For $b>0$ and $C_3(T_*)<0$, this equation has a positive solution $z$ although $C_3(T_*)\ne0$. The coefficients are not algebraically incompatible: at $v=1$, $v'=0$, they obey $C_3=v''/6-\|\mathbf A\|^2/24=b/3-\|\mathbf A\|^2/24$. This is a compatibility calculation for a local root equation, not a constructed history, EOM existence proof, or accepted reachability result. It shows why the cubic vanishing statement requires its fixed-reception qualifier.

Claim grade: **derived** for the averaging limit, common cone, fixed-versus-moving distinction, and stated coefficient calculation. Falsifiers are a continuous-velocity moving-root sequence with endpoint speed different from one, or a failure of the displayed substitutions. The reciprocal-delay theorem below avoids assuming any endpoint acceleration or jerk exists.

## Exact reciprocal-delay estimate

Follow one simple same-label root $s=s(T)$ on a connected reception interval. Differentiating $\delta=T-s(T)$ and using signed playback gives

$$
\dot\delta=1-\frac{D_r}{D_t}
=\frac{\mathbf n\cdot[\mathbf V(T)-\mathbf V(s)]}{D_t}
$$

Therefore the following identity holds, including at a delay turning point where its two sides vanish:

$$
\|\mathbf A_s\|\,
\big|\mathbf n\cdot[\mathbf V(T)-\mathbf V(s)]\big|
=K_i\frac{|\dot\delta|}{\delta^2}
=K_i\left|\frac{d}{dT}\frac{1}{\delta}\right|
$$

This is the useful form because it does not divide by a possibly zero velocity difference. If both endpoint velocities of every considered chord satisfy $\|\mathbf V\|\le M$, with $0<M<\infty$, then their difference has norm at most $2M$. Thus

$$
\|\mathbf A_s\|\ge\frac{K_i}{2M}
\left|\frac{d}{dT}\frac{1}{\delta}\right|
$$

No monotonicity of delay or sign of $D_t$ is assumed. No uniform lower bound on $|D_t|$ is used. A transmitter factor tending to zero does not invalidate the estimate while the branch remains simple at every interior reception.

Now suppose every self root with $0<\delta<\delta_0$ lies in a fixed cone $\mathbf e\cdot\mathbf n\ge c>0$, where $\mathbf e$ is a constant unit vector and $\delta_0>0$ is a chosen recent-delay cutoff. Let $\mathbf S(T)$ be the sum of **all** such recent self rows. Write the actual receiver equation as

$$
\dot{\mathbf V}=\mathbf S+\mathbf R,
\qquad
P(T)=\mathbf e\cdot\mathbf V(T),
\qquad
b(T)=\max\{0,-\mathbf e\cdot\mathbf R(T)\}
$$

The remainder $\mathbf R$ includes every partner row and every older self row. It is not set to zero or defined as a new physical account. The scalar $b$ is only the negative part of its projection along $\mathbf e$. Since every term in $\mathbf e\cdot\mathbf S$ is nonnegative, any one tracked recent root satisfies, almost everywhere,

$$
\frac{cK_i}{2M}\left|\frac{d}{dT}\frac{1}{\delta}\right|
\le\mathbf e\cdot\mathbf S
=\dot P-\mathbf e\cdot\mathbf R
\le\dot P+b
$$

Let the receiver velocity be locally absolutely continuous and obey the sharp EOM on compact subintervals. Integration along a branch between $T_1<T_2$ yields

$$
\frac{cK_i}{2M}\operatorname{Var}_{[T_1,T_2]}(\delta^{-1})
\le P(T_2)-P(T_1)+\int_{T_1}^{T_2}b(T)\,dT
$$

The variation is the integral of the absolute derivative; it counts both increasing and decreasing reciprocal delay. Its finiteness follows from the actual acceleration balance, not from a desired terminal state. If $|P|\le M$ and the negative remainder has total integral at most $B$ on the full reception interval, then

$$
\operatorname{Var}(\delta^{-1})\le C,
\qquad
C=\frac{2M}{cK_i}(2M+B)
$$

Consequently every connected portion of a recent root satisfies the explicit floor

$$
\delta(T)\ge\left[\frac{1}{\delta(T_0)}+C\right]^{-1}>0
$$

The inequality holds in either reception direction from any reference point $T_0$ on that portion. It forbids approach to zero delay at either end of the branch. Oscillating delay cannot evade it because variation dominates the absolute endpoint change.

Claim grade: **derived** for simple root branches of actual solutions under the displayed finite-speed, cone, and integrable-opposing-remainder hypotheses. A violating branch with a complete canonical row sum and those same bounds is an operator-checkable falsifier. This is an integrated dynamical estimate; pointwise divergence of a formula alone would not prove it.

## Uniform exclusion across a regular self-root census

The one-branch estimate also excludes a sequence that changes branch identity, provided its provenance has the following stated regularity. Fix a finite reception interval $I=[a,T_*)$. Require a $C^1$ path on the recent history domain $[a-\delta_0,T_*)$, locally absolutely continuous receiver velocity, and:

1. $\|\mathbf V\|\le M$ on that domain, and $\mathbf e\cdot\mathbf n\ge c>0$ at every self root with $0<\delta\le\delta_0$.
2. The complete recent self-root set is finite at each reception, every such root is simple, and the actual EOM retains all of them. No uniform root count or transmitter-factor margin is assumed as $T\uparrow T_*$. Regularity at the initial section and at $\delta=\delta_0$ is included.
3. The initial recent roots have a positive minimum delay $\delta_{\mathrm{in}}$; put $\delta_{\mathrm{in}}=\delta_0$ if there are none.
4. The remainder defined above is locally integrable, and $\int_a^{T_*}b(T)\,dT\le B<\infty$.

These conditions define a conditional solution class. They do not amend the admitted population class or assert that every admitted initial history preserves them.

Set $\delta_{\mathrm{entry}}=\min\{\delta_{\mathrm{in}},\delta_0\}$. Then every recent self root on $I$ obeys

$$
\boxed{\displaystyle
\delta(T)\ge\delta_{\min}
=\left[\delta_{\mathrm{entry}}^{-1}
+\frac{2M}{cK_i}(2M+B)\right]^{-1}>0}
$$

To prove the statement, start at any recent root and follow its simple-root graph backward in reception time until it meets the initial section or the cutoff $\delta_0$. A graph cannot end at an interior positive-delay point: continuity of the root residual and $D_t\ne0$ give a unique local extension there. Nor can it end at the diagonal: the preceding variation estimate applied from its chosen interior point bounds reciprocal delay before that endpoint. More explicitly, the same estimate bounds total variation on every compact backward interval, so reciprocal delay has a finite positive limit at any earlier finite endpoint; unless the cutoff was met, the limiting positive-delay simple root continues by the implicit-function argument. The only remaining backward entrances are therefore $T=a$ and $\delta=\delta_0$. Both have delay at least $\delta_{\mathrm{entry}}$. Applying the bound from that entrance proves the displayed uniform floor.

This argument makes the provenance obligation explicit. A positive-delay fold with $D_t=0$, a continuum of roots, or an unresolved self-root event invalidates the stated simple-root census hypothesis. Such an event is not evidence that the floor was violated within its class. Extension of the theorem through independently certified fold lineages is not proved here.

For a putative finite continuous-velocity endpoint with recent self roots, the earlier averaging lemma supplies the cone and finite $M$ on a sufficiently late interval. The remaining substantive checks are complete simple-root lineage and the negative remainder bound. In particular, a finite population with at most $N_R$ remainder rows, each with range at least $r_0>0$, transmitter magnitude at least $d_0>0$, and coupling coefficient at most $K_{\max}$ has

$$
b(T)\le\|\mathbf R(T)\|
\le\frac{N_RK_{\max}}{r_0^2d_0},
\qquad
B\le\frac{N_RK_{\max}(T_*-a)}{r_0^2d_0}
$$

Thus an isolated same-label diagonal approach with all other rows uniformly regular is excluded on this quantified finite class. Finite population alone does not establish the row count or these margins. The theorem also permits an unbounded remainder whose opposing projection is integrable; a bounded remainder is a sufficient condition, not the theorem's necessary assumption.

Claim grade: **derived**, conditional uniform exclusion on the specified regular solution class. Falsifiers are a fully traced recent self root below $\delta_{\min}$, an interior endpoint of a simple root graph not covered by the continuation argument, or a failure of the projection inequality under the stated complete EOM. This is a positive separation from the self diagonal, not a present-coordinate separation theorem for distinct labels.

## The precise remaining obstruction

The same inequality quantifies what would be required to overcome the exclusion while keeping finite velocity. For a connected simple branch,

$$
\int_{T_1}^{T_2}b(T)\,dT
\ge\frac{cK_i}{2M}
\left|\frac{1}{\delta(T_2)}-\frac{1}{\delta(T_1)}\right|-2M
$$

A finite-velocity branch approaching $\delta=0$ would therefore require a nonintegrable negative projection from the remainder. Recent self rows cannot cancel it because they all have positive projection in the common cone. Cancellation between the two labels of a mirror pair in a population-wide vector sum cannot cancel the receiver-local equation either. Older self rows and partner rows must be kept in the remainder and assessed individually or by a justified sum.

For the stationary mirror input, the persistent partner row is inward, the incoming self census is empty, and the conditional newborn self row is inward. The accepted no-continuation result is consistent with this bound. Reaching $u=1$ itself remains possible because the floor constrains admitted positive-delay roots, of which the incoming mirror solution has none.

For a general admitted finite population, an actual self-channel sequence is still unresolved if other singular rows supply a nonintegrable opposing contribution, if the recent self census passes through folds or nonisolated roots without the required lineage theorem, or if velocity has no finite continuous endpoint. These are explicit unresolved complements, not demonstrated mechanisms or licensed cancellations. A complete finite signed row sum on each open time section does not itself bound the negative remainder integral.

The accepted failure of an infinite population's proposed history norm supplies none of these missing finite-population estimates. It neither proves finite contact exclusion nor constructs the required cancellation. No new population class, cell grouping, account assumption, maturity factor, or boundary law is selected here.

## Verification and frozen inputs

The mathematical reference boundary is fixed. The canonical self row and signed playback are read from the unchanged Master Equation; the independently authored mirror packets and incoming oracle remain unchanged. On the mirror branch, $\mathbf n\cdot[\mathbf V(T)-\mathbf V(s)]=w_-+w_+$ and $D_t=w_-$, so the new delay identity reduces algebraically to the accepted exact mirror measure. This reduction checks signs and normalization against an existing independent reference. It does not constitute independent adjudication of the new general cone and branch-continuation theorem.

No future path is prescribed for an EOM reachability test in this assignment. No new numerical EOM experiment, solver acceptance, oracle replay, or Python execution is claimed. The new conclusion is a shown mathematical inequality; independent acceptance remains a separate review of these proofs with the existing subjects frozen.

Input identities were recorded with `shasum -a 256`, copied into task scratch, and checked with `shasum -a 256 -c` before drafting. The full manifest is retained at `.tmp/mec008-self-channel-reachability/input-sha256.txt`. The following table is the durable record; paths are relative to the repository root.

| Input | SHA-256 |
| --- | --- |
| `AGENTS.md` | `248f07e14349c3601fc74106f7219ceae4184e7ef2f9405ee9c1ebd634ae1476` |
| `reference/priorities/master-equation-closure/analysis/mirror-close-approach-causal-root-boundary.md` | `00db04b895b4b22eec7103bbb424d22b423e56ef1701b48c5da23f20a1e90781` |
| `reference/priorities/master-equation-closure/analysis/coincide-or-not.md` | `c98ef7e2a9baa274ac8f61ae655e536f53fe694a93b8d1f30b32b65dd3ae2e7c` |
| `reference/priorities/master-equation-closure/analysis/mec-008-independent-adjudication.md` | `30a11666d60bc26e830980e2c8c963dc9a9e59df2824caee5b8c880fe0a452c8` |
| `content/markdown/aaa/dynamics/master-equation.md` | `6a9675f6a6e193e939f20e78f11ed65a881b75bafde695677604656ab145d865` |
| `reference/priorities/master-equation-closure/evidence/mec-007-stationary-mirror-incoming-ledger-2026-09-02.md` | `be1e5fb35ba705830df5fb4b240d6eade499da6e30816374608dd3a524d0ce34` |
| `reference/priorities/master-equation-closure/evidence/mec-007-stationary-mirror-incoming-oracle.v1.json` | `7ee71e43d1b0e9dadd19e6241d04788b58ec33b6cacc94a2bd5bcb2a50d5c05d` |

| Additional frozen input | SHA-256 |
| --- | --- |
| `reference/office-of-research/research-history/review-packets/master-equation-field-speed-first-boundary-self-root-topology-2026-07-29.md` | `5a4fcb571f4d27a775c0aa28d4f6a70a6dd5084209cf2dbbb56a095dbbf44352` |
| `reference/office-of-research/research-history/review-packets/master-equation-post-field-speed-existing-law-continuation-obstruction-2026-07-29.md` | `b68a3abb1e022876399ec6a303ce6de9c28c8e5309813f31c7b04f47ab2acd35` |
| `scripts/eom/stationary-mirror-incoming-oracle.py` | `e60336c1d5bfa6ccd1796fb661dd24f694aae19165766e7d9ac76cc01799bf1d` |
| `tests/test_mec007_stationary_mirror_incoming_oracle.py` | `b33dc89d8c8b4a7273ca48f41df49700648ef1a91f9fa31715be8f7387aa155b` |

Before running the document instrument on this file, its known control returned exactly two mathematical expressions, one display, and one existing file link while ignoring inline and fenced code; four negative controls rejected invalid TeX, an unmatched dollar delimiter, a missing file, and trailing whitespace. Instrument: `node .tmp/mec008-self-channel-reachability/check-document.mjs --known`; the pass was recorded in scratch before the target run. This instrument checks syntax and file existence only, not mathematical correctness or fragment-anchor resolution.

Measured structural verification: `node .tmp/mec008-self-channel-reachability/check-document.mjs reference/priorities/master-equation-closure/analysis/mec-008-self-channel-reachability.md` accepted 133 expressions, including 20 displays, and seven existing relative file targets with no delimiter, KaTeX, terminology, or trailing-whitespace error. The two fragment destinations were checked separately by exact heading `rg` in coincide-or-not.md. `git diff --no-index --check -- /dev/null reference/priorities/master-equation-closure/analysis/mec-008-self-channel-reachability.md` emitted no whitespace diagnostics; its exit 1 records the new-file difference. `shasum -a 256 -c .tmp/mec008-self-channel-reachability/input-sha256.txt` returned `OK` for all eleven frozen inputs after drafting. These checks establish document structure and input identity, not independent mathematical acceptance. The exact target-check receipt is retained in task scratch.

## Proposed coordinator integration

**Derived candidate to integrate after independent review:** “The same-transmitter analysis derives a reciprocal-delay variation bound for actual sharp-EOM self roots. On a finite-velocity regular root chart whose recent self rows share a forward cone and whose remaining acceleration has integrable negative projection, every root delay has an explicit positive floor. The result excludes isolated same-transmitter diagonal approach when all other rows remain regular. It supplies no universal speed ceiling, distinct-label separation floor, continuation law, or general populated-domain closure.”

**Required quantifier correction:** In the same-transmitter chord section and its summaries, qualify the vanishing quadratic/cubic coefficient test as a test for accumulation at one fixed reception. A sequence with moving reception times requires the joint root equation. With continuous endpoint velocity it requires field speed; the additional jet conclusions depend on the side of approach and higher hypotheses. The new proof does not rely on the stronger unqualified jet assertion.

**Keep accepted MEC-007 unchanged:** Its stationary release reaches a root-free field-speed endpoint at positive separation. The post-threshold geometry and divergent measure remain a conditional obstruction, with no admitted outgoing EOM self-root branch. This effort neither reopens that result nor upgrades it into literal self-channel reachability.

**Current disposition:** Accept the preserved mirror and finite-contact results at their independently accepted scopes. Submit the new variation bound and uniform-floor theorem as derived candidates for independent adjudication. Reject using field-speed arrival, different-label coordinate equality, or a prescribed extension as the missing self-sequence certificate. Leave global MEC-008 acceptance unresolved on simultaneous singular remainders, unresolved self-root lineages, and non-finite-velocity endpoints. No queue completion, score change, or downstream dispatch is proposed by this worker.
