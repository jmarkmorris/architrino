# Physical Binary Retained-History Radial Turn

## Claim boundary

**Measured:** the vector-consistent EOM solver trajectory for an initially balanced antipodal binary with each architrino at radius $2\,\mathrm{kpc}$ and speed $100\,\mathrm{km/s}$ turns from outward to inward before reaching $170\,\mathrm{km/s}$. The first radial turn is enclosed between $120.9893390959$ and $120.9909698778$ million years at radius $2.0084009257303923$ to $2.0084009257305273\,\mathrm{kpc}$.

**Measured:** the greatest accepted speed before that turn is $100.0228507706\,\mathrm{km/s}$ at $20.4858820844$ million years. The speed at the radial turn is only $99.7865950290$ to $99.7865977853\,\mathrm{km/s}$.

**Not established:** this calculation does not continue through the inward phase, establish later binary fate, binding, retention, stability, or assign a radius or time to a later hypothetical $170\,\mathrm{km/s}$ crossing.

Plainly: the initial outward departure is real but temporary in this case. There is no $170\,\mathrm{km/s}$ radius or elapsed-time result on the outward branch because the branch turns inward near $121$ million years while moving more slowly than it did initially.

## Admitted initial datum and evolution

The EOM request used normalized wake-speed units $c_f=1$. The physical values are an input/output mapping only:

- empty external environment with only the antipodal pair;
- circular retained prehistory, initial radial velocity zero;
- radius $2\,\mathrm{kpc}$ for each architrino;
- speed $100\,\mathrm{km/s}$ for each architrino;
- target speed $170\,\mathrm{km/s}$;
- physical display conversion of one normalized speed unit to $299792.458\,\mathrm{km/s}$;
- charges $+1/6$ and $-1/6$;
- sharp acceleration chart;
- coupling calibrated from the independently certified release snapshot so the circular endpoint is radially balanced.

The calibrated raw coupling is $1.6022161698524887\times10^{-5}$ and the charge-weighted coupling is $4.4506004718124684\times10^{-7}$. After release, the EOM solver evolves the Cartesian position and velocity vectors. Only accepted cubic path segments enter retained history. Every numerical-control restart consumes the complete accepted histories from a fingerprint-verified checkpoint; it does not recreate a circular orbit or substitute a scalar arc update.

Plainly: radius, radial velocity, tangential velocity, and total speed are all measurements of one evolving vector trajectory. Tangential acceleration can remain forward while total speed falls, because the radial acceleration can have a negative projection along the instantaneous velocity.

## Event measurements

The terminal event is the first accepted sign change $\dot r>0$ to $\dot r\leq0$. The refined bracket is:

| quantity | lower accepted sample | upper accepted sample |
| --- | ---: | ---: |
| solver time $T$ | $18547.75$ | $18548.00$ |
| elapsed years | $120989339.09591454$ | $120990969.87780312$ |
| radius (kpc) | $2.0084009257303923$ | $2.0084009257305273$ |
| total speed (km/s) | $99.786595028955588$ | $99.786597785310150$ |
| radial velocity (km/s) | $+4.2068778177\times10^{-7}$ | $-2.5868958263\times10^{-7}$ |

The earlier speed maximum is:

| solver time $T$ | elapsed years | radius (kpc) | speed (km/s) | radial velocity (km/s) |
| ---: | ---: | ---: | ---: | ---: |
| $3140.5$ | $20485882.084388651$ | $2.000241975156229$ | $100.02285077058522$ | $0.033376173604347879$ |

Plainly: total speed first rises by about $0.02285\,\mathrm{km/s}$, then falls. Radius continues rising much longer and reaches its maximum only at the radial turn. A speed turn and a radial turn are different events.

## Numerical-control chain

The trajectory was advanced through fingerprint-bound retained-history checkpoints. Root-time tolerance was widened only when the accumulated history enclosure, rather than floating-point precision, became the limiting width.

| accepted interval | root tolerance | acceleration tolerance | purpose |
| --- | ---: | ---: | --- |
| $0$ to $3400$ | $10^{-7}$ | $10^{-10}$ | resolve the early speed maximum |
| $3400$ to $5750$ | $10^{-6}$ | $10^{-10}$ | retained-history continuation |
| $5750$ to $9010$ | $10^{-5}$ | $10^{-10}$ | retained-history continuation |
| $9010$ to $12160$ | $10^{-4}$ | $10^{-10}$ | retained-history continuation |
| $12160$ to $16503.2983$ | $10^{-3}$ | $10^{-10}$ | retained-history continuation |
| $16503.2983$ to the turn | $10^{-2}$ | $5\times10^{-10}$ | cross the history-width frontier and refine the event |

Measured overlaps were:

- at $T=9060$, the $10^{-5}$ and $10^{-4}$ root controls differed by $4.24\times10^{-9}\,\mathrm{km/s}$ in speed and $2.44\times10^{-10}\,\mathrm{kpc}$ in radius;
- at $T=12160$, the $10^{-4}$ and $10^{-3}$ controls differed by $3.23\times10^{-7}\,\mathrm{km/s}$ in speed and $6.32\times10^{-9}\,\mathrm{kpc}$ in radius;
- the $5\times10^{-10}$ and $10^{-9}$ acceleration tolerances produced the same displayed endpoint values at $T=16600$ and $T=18500$;
- a coarse $5$-unit turn bracket $[18545,18550]$ enclosed the refined $0.25$-unit bracket $[18547.75,18548.00]$.

At $T=16503.2983$, a tighter $10^{-4}$ root request exhausted 512-bit MPFR precision because the retained-history position enclosure prevented an interior partner root from being surrounded. A $10^{-2}$ root enclosure certified the root, after which the original acceleration tolerance rejected because the sharp acceleration enclosure was wider than $10^{-10}$. The two relaxed acceleration tolerances above supplied the overlap check before the run continued.

Plainly: the calculation did not silently step over its certificate failure. It stopped, identified the history-width cause, restarted from the same full history, and compared overlapping controls before accepting the continuation.

## Reproduction record

The inconsistent scalar arc toy was removed. The retained-history instrument is `scripts/eom/antipodal-binary-spiral-law.cpp`; the independent circular release oracle is `scripts/eom/antipodal-binary-hinge-oracle.py`.

- instrument source SHA-256: `74cd85f57c7edd803c4b401f2ae717433039ca032e3eae1e84c68846f970ef9d`
- independent oracle SHA-256: `41d7a95e4347bd100616ae4f4a53e406a66182bb1b49711e1db1e1050c6cca14`
- instrument executable SHA-256: `bcf835c11cd14dfd2c5be750d8c088909ff5f4370095bf924f73de4d4ca75f37`
- EOM library SHA-256: `4e13dcb827bda1154c029f09b361a8b06a6c01b98bc64faeda1bf5569afe88d8`
- early-speed CSV SHA-256: `190f6b3dee8bd7d4f24df8aa4d2d949658506144ee36b5cd12fb927d880bc437`
- refined-turn CSV SHA-256: `8a9ef2bb7408e5d07427819abc2f6b75dcc044ef0b974aeeb89df6cf60b9f7dc`
- refined-turn checkpoint SHA-256: `1e30e1b54803469bb8db49b5dbc02e524d6970d4bfa58f3c6e7734164acd7916`

The local evidence products are:

```text
.local-data/braid-program/physical-target-2kpc-100-to-170-v4-root1e-7/trajectory.csv
.local-data/braid-program/physical-target-turn-refinement-step0p25/trajectory.csv
.local-data/braid-program/physical-target-turn-refinement-step0p25/checkpoint.bin
```

Plainly: the hashes identify the exact executable, EOM library, and retained history products that support the measurements. The local CSV and checkpoint are diagnostic artifacts; this note is the durable claim record.

## Closure and falsifiers

The proposed universal monotonic-outspiral claim is false: this certified sub-$c_f$, one-partner-root release supplies a radial turn. The specific $2\,\mathrm{kpc}$, $100\,\mathrm{km/s}$ outward-branch target is closed by the radial-turn event, not by a $170\,\mathrm{km/s}$ crossing.

The measured turn is falsified by a vector-consistent replay from the same checkpointed histories that either reaches $170\,\mathrm{km/s}$ before the reported radial sign change or excludes zero radial velocity throughout $T\in[18547.75,18548.00]$. The numerical-control assessment is falsified if a tighter independently admissible retained-history enclosure moves the turn outside the coarse bracket $[18545,18550]$.

Plainly: the result settles the direction question for this trajectory and provides an explicit way to overturn it. It does not extend beyond the first radial turn.
