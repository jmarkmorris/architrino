# Independent integral check of the local coupled fold path

**Date:** 2026-10-02. **Status:** ✓ Done for the supplied local coupled receiver. **Grade:** independently measured integral/velocity agreement, conditional on a fixed retained source history and supplied local receiver. **Scope:** the first partner fold over a reception window of half-width 0.002. This neither certifies the selected release's entire past nor establishes later turns or returns.

The local coupled receiver's velocity change agrees with the independently integrated complete acceleration to approximately $7\times10^{-11}$ at the finest receiver interpolation. Receiver refinement improves that residual. This closes the assigned numerical integral-consistency check for this local calculation, conditional on its source history. It does not erase the [earlier negative result](multiplier-free-linear-partner-fold-integral-check.md): those three frozen full-history trajectories had nonmonotone velocity-increment discrepancies near the same fold.

## Independent inputs, oracle and root scope

The new [wrapper](../../../../../scripts/collinear-research/linear-partner-fold-coupled-integral-check.py) calls the unchanged [source-time integral oracle](../../../../../scripts/collinear-research/linear-partner-fold-independent-integral.py). The oracle retains its exact unequal-curvature fold control and absolute source weights. Its source-time transformation cancels the source derivative from the integration density, preserving both fold branches. No receiving-speed factor, cap, softening or event impulse is introduced.

The fixed source history is `.local-data/collinear-research/multiplier-free-linear/delayed-h4096.npz`, restricted through seed time 13.0400390625. The local receiver is `.local-data/collinear-research/multiplier-free-linear-fold/coupled-h4096-tol1e-10.npz`, using its final 4001 incoming and 1001 outgoing samples. Only `T,x,v,Tout,xout,vout` are read for the integral calculation. Parent arrays `Jpair,Jregular,Jout` are never read or used to tune an expectation. The independent receipt binds both input hashes and the unchanged oracle hash.

Incoming samples are sorted by reception time and the outgoing samples are appended after omitting the duplicated fold endpoint. The current file's incoming times already increase; ordering by measured times avoids assuming an orientation of its source parameter. Cubic Hermite interpolation uses the supplied positions and velocities, with continuous position and velocity at the fold. The fold time supplied by this local receiver is 13.100018660794511. The checked interval is that time plus or minus 0.002.

All admissible sources on that interval precede the seed; this is independently checked rather than accepted as a root omission. The retained receiver polynomial has maximum velocity -1.945007288 over the entire seed-to-window interval, including its polynomial velocity extrema. Thus $P=T+x$ strictly decreases and $Q=T-x$ strictly increases there. For recent source times, the positive-distance partner's required $Q(T)$ lies above the greatest recent $P(S)$ by at least 0.280775; the negative-distance partner's required $P(T)$ lies below the least recent $Q(S)$ by at least 0.164816. Neither recent partner equation can hold. Strict monotonicity makes each recent same-clock self equation have only its excluded diagonal. No no-self scenario is imposed.

The earlier fixed source clocks are inspected in full, including the held tail and every polynomial extremum. For efficiency, the wrapper passes the oracle only contiguous source-polynomial blocks whose range meets the receiver-clock range. A block is discarded only after endpoint and interior-extremum evaluation excludes that range. This is numerical domain reduction on the declared interpolant, not a physical root-exclusion rule. The greatest contributing source time is 12.98311843703, below the seed.

At offsets $-10^{-3}$ and $-10^{-4}$, the independent census finds two positive-distance partner roots, one negative-distance partner root and one negative-distance self root. At offsets $+10^{-4}$ and $+10^{-3}$, the positive-distance fold pair has disappeared; the other partner and self roots remain. Positive-distance self reception has no earlier root. This complete interpolant census accounts for the three-to-one partner transition and the surviving self channel.

## Known controls before target

The unchanged oracle's exact piecewise-parabolic fold with curvatures $B=0.6$, $b=1.4$ first passed again, with integral error $3.05\times10^{-16}$. The wrapper then independently checked its receiver mapping and polynomial-range reduction against that same exact integral, using 61, 121 and 241 samples per side. The largest error was $3.05\times10^{-16}$. These checks were completed and recorded before opening the coupled target for numerical validation. They test the integration service and sampling transformation, not the upstream trajectory.

## Measured local integral agreement

The supplied dense receiver is resampled independently. On the incoming side, reception distances from the fold are quadratic in a uniformly sampled parameter to resolve the fold endpoint; outgoing reception times are uniform. The fold point occurs once and retains its supplied continuous position and velocity. This receiver interpolation is refined with 61, 121 and 241 samples per side. At each refinement the complete channel integral is calculated with Gaussian quadrature orders eight and sixteen, using the unchanged oracle.

| Samples per side | Complete acceleration integral | Receiver endpoint velocity increment | Velocity increment minus integral |
| --- | ---: | ---: | ---: |
| 61 | -0.0191137796443711 | -0.0191137803692056 | $-7.25\times10^{-10}$ |
| 121 | -0.0191137801652659 | -0.0191137803692056 | $-2.04\times10^{-10}$ |
| 241 | -0.0191137803017649 | -0.0191137803692056 | $-6.74\times10^{-11}$ |

Quadrature orders eight and sixteen differ by at most $1.04\times10^{-17}$ on each sampled receiver polynomial. The receiver-refinement difference is larger and decreases, so receiver sampling determines the visible numerical uncertainty. This is observed refinement, not a rigorous error bound.

At 241 samples per side, the channel integrals are:

| Channel | Signed acceleration integral |
| --- | ---: |
| Positive-distance partner fold pair | -0.0157370128364595 |
| Surviving negative-distance partner | +0.0000473288757785 |
| Negative-distance self | -0.0034240963410839 |
| Positive-distance self | 0, by the complete earlier-root census |

The fold pair reinforces under absolute source weighting; the self contribution is retained and materially changes the total. The zero self channel is a geometric result of this particular history, not an adopted self-silencing clause.

## Conclusion, reproduction and limits

The local coupled candidate satisfies this independent narrow-window integral check to the displayed refinement accuracy. Its source past remains the fixed saved h4096 history and its receiver begins at a supplied seed state. This check therefore supports local numerical transit conditional on those inputs. It is not an independent convergence proof for the selected rest release through self birth to the seed, nor a uniqueness theorem for generalized solutions. It establishes no new later passage, turn, return or indefinite behavior. The mathematical local-continuation argument and source-history acceptance remain distinct from this numerical receipt.

Reproduce with the executable shared venv:

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-partner-fold-coupled-integral-check.py --known
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-partner-fold-coupled-integral-check.py --target
```

Receipts are `coupled-wrapper-known.json` and `coupled-h4096-tol1e-10-independent.json` under `.local-data/collinear-research/multiplier-free-linear-fold-independent/`. The target completed as a watched foreground job with exit zero in 9.608 seconds; a ten-second heartbeat was installed for longer work. No job remains active.

Before wrapper/report creation, basename `rg` searches under `scripts`, `tests` and `reference` returned no existing consumers or binders in that scope. The original oracle, earlier reports, both trajectory instruments and all source paths remain unchanged. Scoped file-link and whitespace checks are recorded in the handoff; document checks do not validate the mathematics.

Falsifiers are a missing admissible source under the polynomial range bounds, a failed exact wrapper control, a wrong channel sign or absolute weight, disagreement exceeding receiver-refinement uncertainty in an independently integrated window, or a loss of position/velocity continuity at the supplied fold. Additional sources or changed input hashes require a new check. Improving this local receipt does not resolve uncertainty in an earlier source trajectory automatically.
