# Which inherited errors limit the next-event comparison?

## Scope and conclusion

**Measured diagnostic:** the dominant contribution to the frozen error allowance at $t=5$ is the uncertainty carried by earlier received source histories. For either selected target it accounts for about $94.7\%$ of the position allowance and $95.7\%$ of the velocity allowance. For each of the four environmental numerical event contenders, the corresponding shares are about $87.0\%$ and $87.9\%$. Sharpening the earlier source-history comparison is therefore the first useful intervention. Replacing only the final-quarter residual would remove little of the target allowance.

This is an attribution of the **positive scalar majorant** used by the [accepted continuation through five](smooth-two-particle-through-five-continuation.md), meaning the nonnegative auxiliary comparison that bounds the vector trajectory error. It is not a decomposition of the physical acceleration, a new actual-history error bound, an event certificate, or evidence of physical damping. All numerical histories, old residual certificates and accepted comparison receipts remain unchanged. The fixed supplied past, infinite alternating simple cubic lattice, original stationary sum, $g=16$ and $c_f=1$ retain their previous scope.

The smallest identified earlier interval with substantial unused residual information is $[73/32,13/4]$. Its accepted population residual already has 31 temporal bins; the inherited comparison instead uses much larger two-stage constant allowances. The archived paths covered by those earlier receipts have been checked directly against the current canonical incoming archive, including all position, velocity and acceleration node bits. No new trajectory or residual generation is needed to attempt this earlier refinement. Whether it makes the requested event proof close remains a separate propagation and review question.

## 1. Attribution method

Within each frozen receiver bin of length $h=1/64$, the accepted comparator uses a constant receiver coefficient $\lambda_i\ge0$. Its input is the sum of a constant complete residual bound $\rho_i$ and a varying nonnegative delayed-source error contribution. Let the stored endpoint errors be $w_{i,k}=(p_{i,k},v_{i,k})^T$. Define

$$
M_i(h)=
\begin{pmatrix}
\cosh(\sqrt{\lambda_i}h)&\sinh(\sqrt{\lambda_i}h)/\sqrt{\lambda_i}\\
\sqrt{\lambda_i}\sinh(\sqrt{\lambda_i}h)&\cosh(\sqrt{\lambda_i}h)
\end{pmatrix},
\qquad
b_i(h)=
\begin{pmatrix}
[\cosh(\sqrt{\lambda_i}h)-1]/\lambda_i\\
\sinh(\sqrt{\lambda_i}h)/\sqrt{\lambda_i}
\end{pmatrix}.
$$

The continuous values at $\lambda_i=0$ are used. The new diagnostic reconstructs $\lambda_i$ from the frozen accepted radii, source norm bounds, source error bounds and row selectors. It then defines the delayed-source increment by

$$
d_{i,k}=w_{i,k+1}-M_i(h)w_{i,k}-b_i(h)\rho_{i,k}.
$$

Propagating the inherited start, each direct residual increment and each $d_{i,k}$ with the same later matrices gives their separate contributions to the final recorded allowance. The small difference between the frozen outward step arithmetic and the displayed real-valued matrix propagation remains in $d_{i,k}$. No source contribution is dropped or replaced by a newly evolved trajectory.

This diagnostic uses ordinary binary64 arithmetic and the frozen interval primitives to reconstruct coefficients; it does not produce a new outward certificate. Its algebraic reconstruction of the stored endpoint is a bookkeeping consistency check, not independent evidence that the original comparator or physical equation is correct. The independent controls are exact constant acceleration, the analytic constant-coefficient hyperbolic solution, and a two-bin split with known constant direct and source inputs. These controls passed and were recorded before the target run. All inferred source increments were positive; the smallest was $4.25\times10^{-9}$ in position units. The largest endpoint reconstruction discrepancy was below $7\times10^{-18}$.

## 2. Quantitative budget at five

Position errors are measured in lattice-spacing units and velocity errors in units of the wake speed. The right target represents both targets; the differences between their diagnostic results are below $2\times10^{-12}$. The representative environmental contender is $(0,1,1)$; the other three are $(0,-1,1)$ and $(1,\pm1,1)$.

| Contribution at $t=5$ | Target position | Target velocity | Contender position | Contender velocity |
| --- | ---: | ---: | ---: | ---: |
| Inherited state at $13/4$ | $1.20978\times10^{-4}$ | $4.95206\times10^{-4}$ | $8.32075\times10^{-5}$ | $2.89427\times10^{-4}$ |
| Direct complete residuals after $13/4$ | $4.62751\times10^{-5}$ | $2.65393\times10^{-4}$ | $2.93114\times10^{-4}$ | $1.57146\times10^{-3}$ |
| Received source-history errors | $2.97301\times10^{-3}$ | $1.67570\times10^{-2}$ | $2.52875\times10^{-3}$ | $1.34559\times10^{-2}$ |
| Recorded total | $3.14026\times10^{-3}$ | $1.75176\times10^{-2}$ | $2.90507\times10^{-3}$ | $1.53168\times10^{-2}$ |

The complete direct residual has already included the infinite stationary remainder and every required old and generated row. This table does not equate a residual allowance with numerical discretization error alone.

The following table separates direct residuals by the receiver interval in which they enter. Each entry includes its subsequent amplification up to five.

| Receiver interval | Target position | Target velocity | Contender position | Contender velocity |
| --- | ---: | ---: | ---: | ---: |
| $[13/4,15/4]$ | $1.21063\times10^{-6}$ | $4.96224\times10^{-6}$ | $2.45938\times10^{-7}$ | $8.58238\times10^{-7}$ |
| $[15/4,17/4]$ | $1.54296\times10^{-5}$ | $6.38481\times10^{-5}$ | $4.49537\times10^{-7}$ | $1.59493\times10^{-6}$ |
| $[17/4,19/4]$ | $2.47114\times10^{-5}$ | $1.06675\times10^{-4}$ | $2.29647\times10^{-4}$ | $9.27430\times10^{-4}$ |
| $[19/4,5]$ | $4.92340\times10^{-6}$ | $8.99074\times10^{-5}$ | $6.27717\times10^{-5}$ | $6.41574\times10^{-4}$ |

Even setting the last-quarter target residual to zero, while holding all other frozen comparator inputs fixed, would remove only about $0.51\%$ of its final velocity allowance. All direct target residuals combined account for about $1.52\%$. The environmental direct residuals matter more, especially on $[17/4,19/4]$, but remain secondary to received source errors.

Source errors enter at earlier emission times, not at the receiver times heading the next table. The table locates where the receiver accumulates the corresponding allowance; it does not identify an individual emitting history or claim these are disjoint physical mechanisms.

| Reception interval | Target position from source errors | Target velocity from source errors | Contender position from source errors | Contender velocity from source errors |
| --- | ---: | ---: | ---: | ---: |
| $[13/4,15/4]$ | $3.20314\times10^{-4}$ | $1.31265\times10^{-3}$ | $2.25479\times10^{-4}$ | $7.86307\times10^{-4}$ |
| $[15/4,17/4]$ | $6.36394\times10^{-4}$ | $2.63107\times10^{-3}$ | $5.14372\times10^{-4}$ | $1.82299\times10^{-3}$ |
| $[17/4,19/4]$ | $1.42699\times10^{-3}$ | $6.54678\times10^{-3}$ | $1.24020\times10^{-3}$ | $5.10707\times10^{-3}$ |
| $[19/4,5]$ | $5.89312\times10^{-4}$ | $6.26655\times10^{-3}$ | $5.48697\times10^{-4}$ | $5.73954\times10^{-3}$ |

The target coefficient $\lambda_i$ grows from about $4.37454$ to $24.53915$. In its final bin, $23.32829$ comes from the unsigned changed-row derivative bound and $1.21086$ from the stationary derivative. The contender's final coefficient is about $18.59317$, split as $17.17937$ and $1.41380$. Thus retaining matrix signs before taking a norm addresses another identifiable source of conservatism. No physical stability conclusion follows from making this mathematical error bound smaller.

## 3. Earliest economical refinement and available evidence

The frozen inherited `population_error.py` applies residual $10^{-6}$ over $(73/32,89/32]$ and $2\times10^{-6}$ over $(89/32,13/4]$. By comparison, the accepted continuous environmental receipt starts at $1.76534\times10^{-10}$, rises to $3.19604\times10^{-8}$ in the bin ending at $89/32$, and reaches $1.62254\times10^{-6}$ only in the last bin ending at $13/4$. Its 31 bins provide a much less uniform source of error than the two inherited constants.

The inherited lookup used by the through-five comparison also assigns the constant endpoint errors $(2.01843\times10^{-8},8.29090\times10^{-8})$ to positive source times below $73/32$, until an exact physical-and-numerical zero-prefix test removes that source. This is another potential refinement, but starting at $73/32$ uses a complete population residual already in hand and limits the first additional comparison interval. The diagnostic has not proved that this start alone is sufficient to close the event theorem.

| Frozen receipt, under `.local-data/master-equation-closure/` | Covered component and interval | Available bound |
| --- | --- | --- |
| `population-restart/check/population-residual.json` | Complete environmental population, $[73/32,13/4]$ | 31 temporal bins; maximum $1.622541657\times10^{-6}$; per-environmental maxima also retained |
| `next-maximum/bridge-check/both-residual.json` | Target, $[9/4,11/4]$ | Stage maximum $7.392320728\times10^{-9}$ |
| `next-maximum/later-check/both-residual.json` | Target, $[11/4,13/4]$ | Stage maximum $4.319966234\times10^{-7}$ |
| `next-maximum/later-check/both-residual.json` | Environmental source prefix, $[57/32,73/32]$ | Tail maximum $1.455248075\times10^{-10}$; earlier environmental maximum $9.471748029\times10^{-11}$ |

The target stage maxima are separate from the environmental receipt; the target does not inherit an environmental-only residual. The relevant acceptance owners are the [population restart assessment](smooth-two-particle-population-restart-independent-adjudication.md#51-accepted-population-residual-and-restart) and the [preceding next-maximum assessment](smooth-two-particle-next-maximum-independent-adjudication.md). The continuous norm file `through-five/history/fine-source-prefix-norms.json` already begins at $73/32$ and provides 126 bins of width $1/64$ through $17/4$ for 836 identities.

The independent read-only archive check in `earlier_receipts.py` measured the following exact binary identities against `post-restart/approximant/population-h21-4.npz`:

- `population-restart/approximant/candidate.npz`: all 505 stored source histories and the separately stored target agree through $13/4$.
- `next-maximum/approximant/bridge-h13-4.npz`: all 247 source histories agree through $73/32$ and the target agrees through $13/4$.
- `next-maximum/approximant/bridge-h11-4.npz`: all 151 source histories agree through $57/32$ and the target agrees through $11/4$.

Each identity covers position, velocity and acceleration node bytes after explicit anchor-label mapping. Exact signed-zero and permutation controls preceded the target check. This result authenticates the existing polynomial prefixes; it does not certify an equation by numerical agreement.

## 4. Retained instruments, limits and falsifiers

All new instruments and receipts are retained under the literal local owner `.local-data/master-equation-closure/next-event/history/budget/`: `budget-instrument.py`, `known.json`, `target.json`, `earlier-receipts-instrument.py`, `earlier-known.json`, `earlier-target.json` and `MANIFEST.sha256`. Working entrypoints remain in `.tmp/mec-008-next-event/history/budget/`. The retained instruments use repository-relative input paths and run from the repository root with the shared venv.

The attribution target took $0.91$ seconds internally; the earlier archive comparison took $1.23$ seconds. These are measured times for these two bounded diagnostics, not estimates for a new propagation or residual computation. The receipts bind their inputs by SHA-256. No old numerical archive, comparator, certificate or accepted receipt was edited.

Falsifiers for the attribution include a wrongly reconstructed receiver coefficient, a misassigned direct residual, or a different inherited endpoint. The endpoint reconstruction is automatic by the definition of the inferred source increment and cannot falsify those inputs by itself. Falsifiers for the proposed earlier refinement route include a failed node-byte mapping, an omitted population identity, or any emission or target interval outside the stated accepted residual coverage. A sharper actual error bound still requires outward propagation, causal coverage and independent review; the budget diagnosis alone supplies none of those conclusions.
