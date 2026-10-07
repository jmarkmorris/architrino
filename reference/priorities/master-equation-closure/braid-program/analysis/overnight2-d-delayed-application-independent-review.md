# Independent pre-target review of delayed admission

## Disposition and claim boundary

**Derived disposition:** the frozen [delayed variation component](overnight2-d-delayed-variation.py) and [delayed admission application](overnight2-d-delayed-admission.py) implement the reviewed [conditional method-of-steps argument](overnight2-d-delayed-admission.md) consistently. Independent derivation and analytic controls found no required pre-target mathematical or implementation repair. This verdict supports trying the bounded application against complete validated residual input. It does not certify an unrun target, extend actual membership beyond the accepted prefront prefix, or establish time-67 membership or tail admission.

The original balance 1, seed 1, encoded kick and complete prescribed negative histories remain fixed, with $K=c_f=c_a=1$ and the selected inclusive ceiling. The comparison is the exact increment-defined reference, joined continuously to the translated rigid negative history. The application starts from the original initialization bounds and recomputes every selected cell; it does not splice the earlier reference's accepted error endpoint onto a different comparison.

The live Ramon E. Moore role and Specialist charter supplied an analytical lens, not evidence of correctness. The independently derived formulas and controlled code paths below supply the evidence. Only this companion was written. The parent owns target execution, completed-receipt adjudication and integration in the [research account](overnight2-d-followup-and-research-2026-10-07.md). The running residual target was not inspected, replayed or awaited for this review.

## 1. Continuous source position through zero

The original source velocity jumps at zero, but its comparison position is continuous. To compose a polynomial candidate source time whose range crosses zero, `continuous_positions` uses the joined rigid expression as a polynomial enclosure on the whole candidate range. On each intersected positive piece it separately encloses the difference between the actual positive polynomial and that rigid extension, then adds the maximum coordinatewise absolute difference as a uniform value remainder. The extension is exactly the declared negative branch for negative times. Thus the resulting enclosure contains every actual source position, including zero, without differentiating a uniform remainder or smoothing the kick.

Every positive piece from zero through the candidate upper endpoint is examined, with empty intersections skipped. Entirely positive or negative ranges use the previously reviewed source paths directly. Completed-history overflow fails closed. The computation is a value enclosure only: actual velocity and acceleration boxes for the matrix calculation are obtained independently from the complete source-piece routine. Both one-sided velocity and acceleration traces at zero and all relevant ordinary-knot traces are included there.

If $\widehat\tau$ is the candidate delay, the enclosed squared gap is $G=\widehat\tau^2-|R|^2$. For the unique positive true reference root $\tau$, the speed premise $L<1$ gives

$$
|\tau-\widehat\tau|\le\frac{|G|}{\widehat\tau_{\min}(1-L)}.
$$

Indeed $|\widehat\tau-|R||=|G|/(\widehat\tau+|R|)$ and the denominator is at least $\widehat\tau_{\min}$. This weaker denominator is conservative. The root-residual slope bound applies across the continuous position and velocity jump because it uses global Lipschitz continuity, not a derivative at zero. A receiver translation of radius $P$ adds $P/(1-L)$ to the delay displacement bound.

`matrix_region` uses that full displacement to enclose source time, delay and geometric normal; the normal numerator error is bounded by $P+L\delta$. It intersects the delay lower endpoint with $(d-P)/(1+L)$ and requires this floor to be positive. Independent source velocity/acceleration boxes and a velocity perturbation ball of radius $Z$ feed the signed matrix formulas, with complete factor floor $1-L-Z>0$. These intersections are valid for actual vectors in the region; no claim is made that unrelated corners of the Cartesian boxes satisfy every geometric identity.

## 2. Two-pass history bounds and first-exit logic

Let $E_j(T_k)$ denote the stored upper envelope after reception cell $k-1$. The application enforces that each new endpoint is no smaller than its incoming endpoint. Initial errors are nonnegative, and every scalar comparison uses nonnegative growth, forcing and integral budgets. Therefore the stored memberwise envelopes bound the whole earlier positive history and are nondecreasing.

At a new cell $[a,b]$, each trial $U_j$ is at least an outward four times the incoming envelope, or a strictly positive minimum. Thus all previously admitted positive errors are also below $U_j$. Until a hypothetical first exit in the current cell, $U_j$ bounds its as-yet-unadmitted positive errors as well. This justifies the coarse source-position allowance

$$
P_0=U_i/\alpha+\max(E_x^j,U_j/\alpha)
$$

before knowing where the actual source time lies. The negative error is the fixed initial translation bounded by $E_x^j$. Global subunit actual speed follows from the already admitted history and the current first-exit trial; hence the actual positive root is unique and the exact auxiliary endpoint identity applies.

The code forms the coarse source interval and requires its upper endpoint to be strictly less than $a$. Only then does `past_upper` look up the earlier envelope. Its left-sided insertion index selects the right endpoint of the earlier cell containing the source upper endpoint; monotonicity makes that one value a bound over the entire positive part of the source interval. At an exact earlier node it returns that node's envelope. At source zero it returns the initialized positive allowance; strictly negative intervals return zero velocity/weighted positive-history allowance. This lookup is valid because `main` supplies matching ordered node times and the inductively nondecreasing `saved` array. The helper alone does not validate arbitrary unsorted or nonmonotone external arrays.

Using the selected $W_j$, the code recomputes the position radius with the maximum of the negative translation and positive allowance $W_j/\alpha$ when both branches are possible, and uses $Z=W_j$ when any positive source is possible. It then explicitly checks the refined complete source interval remains inside the coarse interval used to select $W_j$. This is the crucial second-pass containment condition. A source at or beyond the current cell start, or a refined interval escaping the lookup domain, rejects the cell; it is never silently accepted using a nominal delay.

Trials may grow for at most eight attempts, but every attempt recomputes all channel regions and history selections. No failed attempt updates the saved history. All eight member endpoints are returned together only after every strict trial inequality holds; `main` appends that simultaneous update. These properties remove the circular dependence that would arise from using a just-computed member bound inside the same cell.

## 3. Smooth source forcing and finite jump budgets

For the exact auxiliary endpoint, $p=e_i^x(t)-e_j^x(s)$ and $z=e_j^v(s)$ are fixed while the homotopy varies. The source position root changes, but the error vectors are not reevaluated at intermediate source times. At the final endpoint the position and velocity arguments equal the actual source channel exactly. On each smooth homotopy portion the derivative is $Bp+Cz$.

The code sums signed receiver matrices before taking

$$
m_i\ge\tfrac12\left\|\alpha I+\left(\sum_jB_{ij}\right)^\top/\alpha\right\|_2.
$$

For a positive actual source, the delayed term is bounded by $\|[-B/\alpha,C]\|_2W_j$. For a negative actual source it is bounded by $\|B\|_2E_x^j$, with exact zero velocity error. When both signs of source time are possible, the maximum of these two bounds is sufficient: the actual source is on one branch, and both use the same complete matrix region. The code does not sum both branch alternatives as if both were simultaneous sources, nor omit one of them.

`comparison_jump` computes the encoded positive initial velocity minus the exact joined negative derivative and takes an outward norm. It includes the initial velocity representation discrepancy; it does not substitute the literal physical kick.

A source-zero crossing along the homotopy lies on a line/sphere intersection and has at most two crossings. Its row jump norm is bounded by

$$
J=\frac{\|\Delta v_j\|}{t_{\min}^2(1-L-Z)^2}.
$$

The implementation uses the complete channel delay lower bound for $t_{\min}$. This is valid even if it exceeds the cell's left endpoint: at every actual source-zero crossing the delay equals reception time, and that delay belongs to the matrix region. Reception times with no homotopy crossing have no jump contribution to bound.

The reference front bracket enlarged outward by $P/(1-L)$ contains every possible homotopy crossing reception. Intersecting that support with $[a,b]$ gives an outward overlap length $\ell$, and the code returns an upper bound on $2J\ell$. Empty overlap gives a conservative zero-sized allowance up to outward arithmetic inflation. This is the sharpened bracket-overlap alternative in the theorem; it need not equal the broader $2J\min(h,2P/(1-L))$ expression. The current note correctly states the direction for a chosen outward allowance.

## 4. Integral propagation, widths and continuation

The application validates complete residual member/cell inventory, exact encoded endpoints, each segment's seven ordered partners and the outward partition integral. It rejects a recorded residual integral smaller than recomputation by the reviewed aggregator. Inputs need not be disjoint in reception time for different members, but duplicate `(cell, receiver)` rows across receipts are rejected.

For each member, let $R_i$ be that residual integral, $A_i$ the summed jump allowance and $f_i$ the smooth source forcing. The code uses the outward exact endpoint difference $h=b-a$, forms $E_i(a)+R_i+A_i$, and invokes the reviewed scalar upper step:

$$
E_i(b)\le e^{m_ih}\bigl(E_i(a)+R_i+A_i\bigr)+h\phi(m_ih)f_i.
$$

Putting the full nonnegative integral budgets at the comparison start bounds every interior reception time. This explains both the strict endpoint test and the nondecreasing stored envelope. These are comparison budgets, not physical impulses or changes to the receiver velocity. The scalar routine fails closed when its series domain $m_ih<1$ is not met. The application does not automatically subdivide a rejected reception cell; such a failure is an unresolved bound or requested refinement, not evidence of physical departure.

The source-before-cell condition gives the method-of-steps existence argument: throughout the cell the actual source histories are already defined. Away from the original source-zero reception surfaces their bounded acceleration gives locally Lipschitz source velocity, and strict root/factor margins give locally Lipschitz receiver dynamics. At a birth reception, $t-|X_i(t)-X_j(0)|$ increases at a rate bounded below by $1-V_{\max}>0$. Every ordered birth event is therefore transverse and occurs at most once. At simultaneous events all affected signed rows have their corresponding outgoing traces, while receiver position and velocity remain continuous. There are finitely many such events; piecewise continuation is unique in the ordinary strict region. The complete matrix/jump bounds cover every channel without needing a numerically guessed ordering of simultaneous events. A successful application must still retain all source, range, ceiling and scalar margins in its completed receipt; code review alone does not establish those numerical premises.

## 5. Provenance and execution boundary

The runner binds domain and residual dependencies, requires all receipts to refer to the same comparison NPZ, checks the literal preparation and original seed/balance, and uses the preserved pre-execution-guard initializer source when resolving its older receipt. Its selected domain source checks initial node equality with the original stored preparation. The default new residual application uses the current guarded front helper. Older adaptive pilots bound to the pre-guard helper are not automatically accepted by this runner's `bind`; they would fail explicitly unless a corresponding preserved-source mapping were supplied. This does not affect the intended current residual input.

Dependency identities, exact parsed arguments, initialized envelopes, reference front brackets and comparison-jump upper bounds are retained in the partial input record. Completed rows are appended locally, all identities are checked again before final JSON creation, and the completed output records the full arguments and all member/channel bounds. This includes the adaptive trial and width inputs needed for later audit. Frozen inputs during the run remain a procedural premise; a completed receipt must be checked against those identities and its actual complete inventory.

No delayed target receipt was available or claimed in this assignment. The separate active residual run and any subsequent delayed scientific target remain outside this pre-target verdict. The previously accepted actual prefix through `4.300000000000001` retains its original source snapshot and evidence unchanged.

## 6. Independent controls

The ordinary shared-venv command `overnight2-d-delayed-admission.py controls` exited zero, exercising all included variation, matrix, history, jump, initialization, residual inventory and budget-placement controls. No scientific target was run.

Separate inline checks derived their expected values independently:

- A source stationary before zero and then three continuous positive polynomial pieces, with two quadratic pieces and a final linear piece, checked the new cross-zero position enclosure against exact rational values over the whole intersected inventory.
- A stationary receiver at two with source velocity zero before birth and $1/4$ afterward checked the matrix region across the actual front. It contains incoming $B=\operatorname{diag}(-1/4,1/8,1/8)$ and outgoing $B=\operatorname{diag}(-4/9,1/6,1/6)$, and the corresponding $C_{11}=1/4,4/9$. The source interval and piece inventory explicitly straddle zero.
- An encoded positive velocity $1/4+2^{-30}$ over a zero incoming velocity verified that the comparison jump retains the $2^{-30}$ discrepancy.
- For a point front at two, $P=1/8$, jump norm $1/4$, delay lower bound $3/2$, $L=1/4$, $Z=1/8$ and reception cell $[2,3]$, the exact clipped allowance is $64/675$. The interval result encloses it from above. A disjoint cell gives only negligible outward zero inflation.
- Nonuniform stored history times $0,1/4,1,2$ checked the earlier-cell right-endpoint lookup at negative times, zero, interior points and exact nodes.
- The actual `cell_step` consumer was isolated with separately specified exact linear comparison operators. The positive-source case uses $B=0,C=I$, giving receiver growth $1/4$ at $\alpha=1/2$ and forcing seven times the selected earlier envelope. The negative-source case uses $B=I,C=0$ for each channel, giving growth $29/4$ and forcing seven times the initial position allowance. Independent exact-rational 60-term exponential/phi bounds verify every returned endpoint. The saved input history remains unchanged, and current-cell source times and escaping refined intervals are rejected. These in-memory fixtures test the comparison consumer, not an EOM trajectory; production sources were not edited.

One deliberately broad front-region control was rejected because its enlarged source enclosure exceeded the completed reference. Narrowing the known reception interval around the same exact front produced the stated passing matrix control; the original rejection is correct fail-closed behavior. An initial consumer-control sharpness tolerance of $10^{-12}$ was narrower than the spectral routine's deliberate outward inflation near $29/4$; using a $10^{-9}$ sharpness tolerance preserved the exact lower-bound requirement and all independent rational endpoint inequalities. Neither event is a target failure or a discovered subject defect.

## 7. Identities and falsifiers

Direct SHA-256 reads give:

| Artifact | SHA-256 |
| --- | --- |
| Delayed variation component | `7cf2b81572afb2a54f3d8c1f22c4e3e3975c6620914122043932e73cf2367c04` |
| Delayed admission application | `e51dbb8d6d9bda6ffe3efaa5ca9dfe60137a81bfb2e648f16333c907e03f2513` |
| Updated delayed mathematical note | `6f1e8e3929bc9bf8d8156f5a3e1bab51c9d32db1796cbb7f7a2661d0466de93f` |
| Adaptive residual application | `3676397915b444f2d6dd317610a50349b281723c2f340dfcd2cf576acb116e1b` |
| Guarded front helper | `4763d2e72f988f31d8452d6fcb0c514b6bd0913b577e9fa73636c270e556bdb8` |
| Signed interval variation | `a1d59de294381bec198247039ce7a67781d0cbf31832a378b7c10e95cdbea5f1` |
| Interval matrix norm | `c026c2689ee0b222f00cbfeb7beb56f42f3423a39b13dae82588cb8def978775` |
| Scalar barrier step | `65a39e2dc851a1af5c2d8459bdd1fcd7a2fdffda3572bd3bee797b896cd62943` |

Only this review companion was authored. Subjects, mathematical dependencies, earlier accepted reviews, local source snapshots and runtime evidence remained unchanged. Inline checks suppressed bytecode and wrote no control artifacts. No target replay, recursive agent, sidebar message or Git mutation occurred.

Falsifiers include an actual source outside its coarse trial interval, a refined source outside the bound-selection interval, a nonmonotone or uncovered earlier envelope, a lost source piece or velocity/acceleration trace, an actual jump outside its support/height budget, a missing residual member/channel/cell, an inward integral or spectral bound, or a completed scalar endpoint failing its trial. A future target must be audited for every one of these numerical premises and its identities before its actual-prefix conclusion is accepted. The bounded pre-target review is complete; target execution, receipt review and parent integration remain separate obligations.

Closing validation reproduced all eight listed source identities unchanged. Explicit filesystem checks passed for all four distinct relative-link destinations. Scoped `git diff --no-index --check /dev/null` emitted no whitespace diagnostics; its difference exit status is expected for a new companion.
