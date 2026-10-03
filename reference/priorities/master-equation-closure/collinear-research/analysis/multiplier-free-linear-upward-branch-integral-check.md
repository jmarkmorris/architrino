# Independent numerical audit of upward-birth branches

## Question, independence and reach

The [upward-branch comparison](multiplier-free-linear-upward-branch-comparison.md) numerically approximates the larger finite trace and two members of the smaller-trace family. This audit reads frozen outgoing position and velocity arrays, then reconstructs receiver clocks independently. It does not read the subject's acceleration sums, BVP state, source-coordinate acceleration or accumulated integrals. The [separate conditional theorem](multiplier-free-linear-upward-branch-independent-check.md) establishes the family counterexample without these numerical outputs.

The new [audit wrapper](../../../../../scripts/collinear-research/linear-upward-branch-independent-integral.py) uses the unchanged [polynomial root/source-time oracle](../../../../../scripts/collinear-research/linear-partner-fold-independent-integral.py) and [range service](../../../../../scripts/collinear-research/linear-partner-fold-coupled-integral-check.py). Their SHA-256 identities remain `cff2db3b4f06d903de4e6d11145e67503ec484346472c65ae84f5797d166b3cf` and `cdcfae77cffff551a4bf24c35c163b645dbbb221c763061580edd6778281461d`. Agreement is a numerical equation-consistency check on supplied interpolants; it neither proves exact bounded-past family membership nor continuously encloses the exact held-release trajectory. Every calculation uses $c_f=1$.

## Controls before targets

Each final invocation first passes the inherited unequal-curvature source-fold, receiver mapping, range reduction, held-source and diagonal controls. A new exact upward self-row control uses source clock $P_s(S)=2+BS^2/2$ on negative $S$, receiver clock $P_r(T)=2+bT^2/2$, $B=0.6$, $b=1.4$. The source is $S=-\sqrt{b/B}\,T$, so its integrated acceleration is exactly

$$
-k\left(\frac1B+\frac1{\sqrt{Bb}}\right)(T_1-T_0).
$$

On $T_0=0.001$, $T_1=0.01$, the exact value is -0.007104138310550573. Orders 8 and 16 differ from it by $6.71\times10^{-14}$ and $4.33\times10^{-14}$. An independently evaluated reception-time quadrature of the same root also passes the $10^{-11}$ bound. Receiver thinning is checked against an exact quadratic trajectory before target reconstruction. These controls establish the stated mappings and quadratures on known cases, not target accuracy at every conditioning scale.

## Receiver reconstruction and complete roots

The saved outgoing arrays contain logarithmic startup cells whose position changes fall below floating-point resolution. A position Hermite spline across arbitrarily short such cells can create spurious velocity extrema, despite recorded endpoint velocities. The first target attempts exposed this limitation and supplied no accepted event result. The revised reconstruction retains receiver knots spaced by at least $10^{-6}$, with the endpoint included; an exact quadratic control precedes its use. It starts event searching no earlier than $T_u+10^{-5}$ and excludes clock increments below the declared positive cutoff. This audit therefore makes no claim about the excluded birth interval.

At 25 receiver probes per accepted window, the complete frozen-source polynomial census includes all four channels. Exactly one negative partner and two negative self roots are returned, with positive delays and nonzero source weights. The receiver velocity extrema are checked on every polynomial cell in the window. The complete incoming clock bounds and strict receiver gaps exclude postbirth source roots: outgoing $P,Q$ increase, receiver $P$ stays below the old peak and $Q(T_u)$, and receiver $Q$ exceeds the old peak. The diagonal is not an earlier source. These guards supply a conditional complete three-row chart, rather than permission to omit a newborn root.

## Numerical results and conditioning limits

The finest supplied incoming history is h8192. Source-time integration uses receiver grids of 61, 121 and 241 points and Gaussian orders 8 and 16. The measured values below are positive-cutoff checks, not endpoint enclosures.

| Sample | Independent event | Audit window | Clock cutoff | Finest source-time velocity residual |
| --- | --- | --- | ---: | ---: |
| Larger trace | Turn at T≈16.306830704 | 16.166737318 to turn | $10^{-7}$ | $-1.86\times10^{-9}$ |
| Smaller sample A | Turn at T≈16.308998393 | 16.168857075 to turn | $10^{-7}$ | $-2.89\times10^{-11}$ |
| Smaller sample B | Downward recross at T≈16.168637993 | 16.167223555 to 16.168617356 | $3.97\times10^{-11}$ | Not resolved by this source-time service |

The larger-trace residuals at 61, 121 and 241 points are approximately $-1.81\times10^{-9}$, $-1.86\times10^{-9}$ and $-1.86\times10^{-9}$. Sample A gives $-4.90\times10^{-10}$, $-5.69\times10^{-11}$ and $-2.89\times10^{-11}$. Separate reception-time quadrature gives finest residuals $-1.86\times10^{-9}$ and $-2.05\times10^{-11}$. These support numerical equation consistency on those windows. They do not establish the omitted startup or exact family parameter. These final values supersede the initial output-grid audit after the subject's receiver-order repair and complete rerun; the event conclusions are unchanged.

Sample B's whole receiver-clock excursion is only about $4\times10^{-10}$. The unchanged source-time service merges nearby source cuts at a fixed $2\times10^{-10}$ separation; some regular older-source ranges are narrower than that reach. Its residuals, approximately -0.00203, -0.00141 and -0.00130, do not converge to zero and cannot validate this sample. They remain in the receipts. This scale diagnosis follows from inspecting the service's cut-merging contract and the measured source ranges; no oracle tolerance or subject was tuned to make agreement.

A separate reception-time Gaussian quadrature, using the same complete independent polynomial roots with range reduction, gives sample B residuals of approximately $-7.95\times10^{-10}$, $-3.65\times10^{-9}$ and $-2.13\times10^{-9}$ against a velocity increment about $2.09\times10^{-7}$. The residual does not converge monotonically and the near-flat receiver clock remains sensitive to stored-position roundoff. This is limited corroboration, not a resolved independent integrated-equation certificate. The numerical recross approximation retains its subject-control/refinement grade. The independently derived existence of recrossing family members does not depend on promoting this sample.

## Evidence records and falsifiers

Frozen input copies, hashes, known-case receipts, complete probe ledgers, receiver/quadrature refinements and event locations are retained under `.local-data/collinear-research/linear-upward-branch-independent/`. The wrapper's final receipts name their exact source and receiver hashes; preliminary failed searches and the conditioning limitations above are retained in this explanation. The original oracle and range-service sources remain unchanged. An initially expensive full-source reception quadrature was interrupted after 69.499 seconds; the final quadrature uses independently controlled exact polynomial range reduction and completes under observation.

A missing root under the declared gaps, a receiver polynomial extremum outside $-1<v\le0$, failure of a known case, loss of source-time refinement on the turning samples, or a conditioning-resolved disagreement would withdraw the respective numerical consistency conclusion. For sample B, a stable centered-clock or higher-precision independent reference is still needed to upgrade its integrated-equation grade. The mathematical family counterexample is separately falsified by an error in its complete-root signs, bounded-past construction, invariant region or transverse perturbation argument. No global or eventual-turn claim follows from these finite windows.
