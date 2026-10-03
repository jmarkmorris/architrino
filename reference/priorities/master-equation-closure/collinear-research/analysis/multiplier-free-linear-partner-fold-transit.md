# Coupled transit through the linear law's inherited partner fold

The inherited partner fold permits unique local passage with continuous velocity under explicit complete-history and transversality hypotheses. The [independent theorem](multiplier-free-linear-partner-fold-independent-check.md) proves this for the corrected multiplier-free law, including unequal source curvatures. A new coupled numerical calculation crosses the event using the supplied retained past and the complete partner/self ledger. Neither result certifies the upstream exact stationary-release history or its later outer turn. The subsequent [resolved-release continuation](multiplier-free-linear-self-birth-to-fold.md) replaces this supplied-history numerical seed by evolving from the held release through third contact and the fold, at measured numerical grade with separate independent checks; it still does not supply a continuous rigorous enclosure or later outer turn.

This answers the accepted next step after the [shim repair](shim-repair-and-geometry-reassessment.md). The [complete selected law](multiplier-free-linear-delayed-comparison.md#preparation-and-complete-law) retains the signed linear numerator, absolute transmitter weight, every positive-delay causal root and the held preparation. Its numerical units are $c_f=1$, $a=0.5$, $k=0.2862286103053385$. No response factor, cap, softening, impulse, prescribed reversal or additional root exclusion is selected.

## Why a singular acceleration need not stop motion

The source clock $P(S)=S+x(S)$ develops a maximum at the first crossing of $v=-1$. Two positive-distance partner roots satisfy $P(S)=Q(T)$, where $Q(T)=T-x(T)$. As the receiver approaches that maximum, the source denominators vanish and both acceleration contributions point inward. For a transverse receiver, their sum grows as the inverse square root of the remaining reception time. Its time integral is finite. The mathematical issue is whether the evolving receiver reaches a unique finite endpoint and leaves with the correct remaining roots; integrating along an externally prescribed receiver path alone cannot answer it.

Let $P_*=P(S_*)$ and $r=\sqrt{P_*-Q(T)}$ on the incoming side. Write $A_f$ for the positive magnitude of the two folding partner contributions and $R$ for the signed acceleration from every other root. The identity $x=T-P_*+r^2$ gives the exact coupled equations

$$
\frac{dT}{dr}=-\frac{2r}{1-v},\qquad \frac{dv}{dr}=\frac{2(G-rR)}{1-v},\qquad G=rA_f.
$$

If the source maximum has one-sided curvatures $B,b>0$, the finite endpoint value is

$$
G(0,T)=\frac{k(T-S_*)}{\sqrt2}\left(B^{-1/2}+b^{-1/2}\right).
$$

The [independent derivation](multiplier-free-linear-partner-fold-independent-check.md#coupled-incoming-dynamics-in-the-square-root-coordinate), completed before its author consulted numerical fold states, proves local existence and uniqueness in this coordinate. With a positive lower bound on $1-v$ and regular remaining roots, its right side is locally Lipschitz. The receiver reaches finite $T_f,v_f$. On the outgoing side $Q>P_*$ the two fold roots have no causal solutions, and the remaining regular equation has a unique continuation. Position is continuously differentiable and velocity locally absolutely continuous. No finite acceleration atom supplies a velocity jump.

The theorem requires separated source times, nonzero one-sided source curvature, transverse reception, a complete three-partner/one-self incoming census, regular remaining roots and gaps in inactive root sectors. It proves the transition to one partner and one self root only under these full-history hypotheses. It does not cover tangencies, simultaneous additional caustics, zero delay, characteristic intervals or root accumulation.

## Coupled numerical subject and its complete local ledger

The distinct [local-transit instrument](../../../../../scripts/collinear-research/linear-partner-fold-transit.py) uses a retained past through $T_0=13.0400390625$ from each of the earlier $1/1024$, $1/2048$, $1/4096$ histories. It evolves the receiver rather than replaying that history after $T_0$. Source clocks are cubic Hermite polynomials with every derivative-critical point separating their monotone sectors; all roots in those sectors and the analytic held tail are checked. Position signs and positive delay select the admitted channels.

Every contributing emission remains before $T_0$ during the measured local passage. This is a method-of-steps calculation: the law uses already determined source history while the receiver evolves. The unrecorded interval between $T_0$ and current reception cannot supply an additional earlier root in the declared local tube. Indeed $x(T_0)<0$ gives $Q(T_0)>P(T_0)$, and $v<-1$ makes $P$ decrease and $Q$ increase. These same-map and cross-map inequalities exclude all four new source families; the exact current self diagonal remains excluded by the law. The numerical instrument asserts these conditions at its integration stages. This exclusion argument is derived; the sampled margins are measured rather than continuous certified bounds.

Incoming integration retains both positive partner roots in $G$, one negative partner root and one negative self root in $R$. At the isolated fold instant the numerical receiver equation uses the finite coordinate limit; it does not assign a finite pointwise value to the divergent physical acceleration. Outgoing integration uses $Q$ as coordinate, with $T_Q=(1-v)^{-1}$ and $v_Q=R/(1-v)$. Its initial derivative is the remaining-root right limit. For $Q>P_*$ the complete source search has no positive partner roots. Removing roots at this event is therefore a consequence of the causal equation, not a suppression rule.

Inside the smooth interpolating cell containing the source maximum, the code evaluates $G$ using scaled cubic source offsets. This avoids subtracting nearly equal clock levels and dividing tiny numbers. It is an exact algebraic evaluation of that cubic, not a denominator floor or regularized physical response. Its endpoint curvature is the **single Hermite interpolant curvature**, not the physical unequal acceleration traces $B,b$. The analytical theorem addresses those unequal traces separately. The fixed-step source data do not establish their exact application to the selected release.

## Controls before targets and measured event

Before target use, the new instrument passed an independently soluble normal form with $G=C$, $R=0$. For $w=1-v$, the exact solution obeys $w^2=w_0^2+4C(r_0-r)$; direct integration also gives the exact reception-time increment. Maximum state/integral error was $2.02\times10^{-15}$. A parabolic two-root case checks both the polynomial-root service and the actual monotone-sector enumeration, including the held tail; affine sector/held-tail cases also pass. The first polynomial control incorrectly assumed returned roots were ordered; sorting repaired that control before any target use. The enumeration control was rerun after the implementation changed to sector bracketing. All final targets below follow the completed control receipt.

| Supplied history step | Measured fold time $T_f$ | Measured position $x_f$ | Measured velocity $v_f$ |
| --- | --- | --- | --- |
| $1/1024$ | 13.1000296091 | -0.1736478438 | -2.0958510360 |
| $1/2048$ | 13.1000277199 | -0.1736492037 | -2.0958529637 |
| $1/4096$ | 13.1000186608 | -0.1736586747 | -2.0958657834 |

These are conditional numerical event locations on three supplied histories, not certified bounds on the exact selected release. Their differences include upstream source-history error. On the finest history, receiver transversality $1-v$ is at least 2.945 at the retained sample points; the measured smallest regular source denominator is 0.55129 and the smallest gap of an admitted source before the seed is 0.03660. The incoming and outgoing root counts are three/one and one/one respectively by complete monotone-sector enumeration plus the preceding new-interval exclusion. The short outgoing endpoint is $T=13.1129164450$, $x=-0.2007608905$, $v=-2.1067480274$; no later turn or return is sought in this bounded calculation.

The instrument accumulates the pair and regular acceleration integrals while evolving velocity. From seed to fold on the finest supplied past, these are -0.1001190939 and -0.0507394015, with total -0.1508584955. Their sum agrees with its own velocity increment to roundoff. This is internal consistency, **not independent evidence**: those quantities share the same right side. Tightening the local integrator tolerance from $10^{-9}$ to $10^{-10}$ changes the fold velocity by approximately $1.59\times10^{-9}$, which checks local numerical consistency only.

## Independent integral audit and the retained trajectory's limitation

The separately authored [source-time integral audit](multiplier-free-linear-partner-fold-integral-check.md) uses polynomial root extraction and a source-time change of variables. Absolute transmitter weights are converted into $k\,\mathrm{sign}\,(T-S)/|H_{\rm receiver}'(T)|\,dS$ on each source sector. No singular source denominator remains, and both fold branches are included. Its exact unequal-curvature control passed before target use, with integral error below $3.2\times10^{-16}$.

Applied to the **old retained receiver paths**, this independent instrument verifies finite fold integrals and the three-to-one partner transition with one self root. It also rejects using the sampled fixed-step passage as an accurate integrated solution. Across a symmetric reception-time window of half-width 0.01, the difference between recorded velocity increment and the complete acceleration integral is approximately +0.00734630, +0.000733994, -0.00188400 at the three history steps. The integral itself varies by only a few millionths. These residuals do not converge monotonically to zero, and shrinking the finest window leaves a residual near -0.0019. The independently computed finite tail decreases with the expected square-root scale. Consequently a finite integral is established on each interpolant, but the old fixed-step receiver does not gain a validated fold transit or later-turn claim.

The [independent coupled-path report](multiplier-free-linear-partner-fold-coupled-integral-check.md) records the separately authored [coupled-path integral wrapper](../../../../../scripts/collinear-research/linear-partner-fold-coupled-integral-check.py) leaves that controlled source-time oracle unchanged and does not read the parent instrument or its accumulated-integral arrays. Its exact fold and receiver-map controls passed before target use. On the new finest-history receiver across $T_f\pm0.002$, independent integrals with 61, 121 and 241 samples per side are -0.01911377964437, -0.01911378016527 and -0.01911378030176; the independently reconstructed endpoint velocity increment is -0.01911378036921. Residual magnitudes decrease from $7.25\times10^{-10}$ to $2.04\times10^{-10}$ to $6.74\times10^{-11}$. This independently supports the local coupled numerical passage on supplied past, rather than merely its internal balance. The wrapper checks the recent-source exclusion with extrema of the receiver polynomials and clock-range gaps before restricting sources to the preseed history. Its source-time mapping, complete sectors and signed contributions are retained in a separate receipt. This check still cannot certify the upstream selected-release history or replace the exact theorem hypotheses with an enclosure of that release.

## Disposition, reproduction and falsifiers

**Derived:** unique short coupled passage for histories satisfying the theorem's complete local hypotheses, with continuous velocity and the stated root transition. **Measured:** a coupled passage on each supplied Hermite history and independent finite fold integrals on those histories. **Unresolved:** continuous enclosure from the exact stationary release through the self birth and third contact to this fold, with the correct unequal source traces and controlled complete history. Later outer-turn and return candidates remain unvalidated. No genuine no-continuation obstruction is proved under the fold theorem's hypotheses.

This advances the conditional local mechanism through the inherited partner fold. It does not promote the entire selected-release trajectory beyond its earlier numerical and analytical grades. The original inverse-square, logarithmic and cap-only scenarios retain their separate dispositions; this linear-law calculation changes none of them.

Run from the repository root using the executable shared venv:

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-partner-fold-transit.py --known
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-partner-fold-transit.py --n 4096 --tol 1e-10
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-partner-fold-independent-integral.py --known
```

The coupled receiver audit is reproduced by `linear-partner-fold-coupled-integral-check.py --target`, which reruns its known controls before opening the target. The independent audit owns its remaining reproduction commands. Coupled receipts, dense local states, known controls, input hashes and the frozen source are retained under `.local-data/collinear-research/multiplier-free-linear-fold/`; independent integral receipts are under `multiplier-free-linear-fold-independent/`. Historical instruments and histories are preserved. No production EOM edit, standing test, generator write or Git publication is included.

A missed admissible source sector, a post-seed root despite the asserted inequalities, a nonintegrable fold with the stated nondegeneracy, two different local continuous-velocity transits with the same complete past, or a nonzero limiting acceleration-integral discrepancy in the new coupled path would overturn the corresponding claim. Inspect the clock sectors, delay/sign filters, one-sided source curvatures, receiver transversality and independent integral receipts. Violating a theorem hypothesis withdraws its application to that history; it does not establish a no-go theorem.

## Bounded verification record

The existing scoped link/anchor checker passed its known exclusion/anchor cases before checking the integrated owner documents; its final receipt is retained with the local coupled outputs. `node scripts/validate-content.mjs --check --strict` completed with zero errors, zero warnings and 30 informational notes; `content-check.log` retains that result. Shared-venv `py_compile` and scoped `git diff --check` check syntax and whitespace. These do not establish scientific correctness. A read-only mathematical audit checked the coordinate signs, right-limit endpoint, complete new-source exclusion and exact controls; its requested cross-map/monotonicity conditions and actual-sector control were applied before final reruns. The independent integral instruments were not changed to match the coupled subject. Source snapshots and hashes distinguish them from prior exploratory instruments.

The final scoped link/anchor run checked 226 local targets across 12 integrated documents with zero unresolved targets after its known controls. Shared-venv `py_compile` passed for all three new fold instruments; scoped `git diff --check` returned no whitespace errors. The independent mathematical review found no material scope issue in this treatment. Before current-consumer edits, `rg` under `scripts/config`, `tests`, `src/documentation` and historical AWT evidence found the manuscript's historical migration/file-map records, which remain preserved; no path or historical byte record was changed. These measured filing checks do not replace the conditional theorem, the known numerical references or the independently checked coupled integral.
