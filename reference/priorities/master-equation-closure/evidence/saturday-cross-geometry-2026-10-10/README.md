# Instruments of the cross-geometry comparison (2026-10-10)

This directory holds byte-for-byte copies of the four session instruments used by the [cross-geometry comparison](../../analysis/saturday-cross-geometry-comparison-2026-10-10.md). They are records of what was run. They are not repository tests, they import no solver, oracle or certified instrument, and none of them is a reference for anything other than that note. The copies were compared with their originals in `.tmp/saturday-serial/i4/` by `cmp` when they were made.

## Files

| File | Bytes | SHA-256 | What it does |
| --- | ---: | --- | --- |
| `release_population.py` | 10973 | `495b114a2685420e061d1bbe372cd829fd603125e14f99c0629dfc681edf6041` | Instrument A. Planar population released from uniform-drift pasts, unchanged row law below wake speed, fixed-step fourth-order integration with stored history and Newton roots; stops at the first speed-one time. With no argument it runs the known case only; with the argument `target` it runs the known case and then the two perturbation families. |
| `ring_reference.py` | 5649 | `dad23c6e8392346e98d28cce75fe57e650532fe5b61f366b1fa74a69f457dfc4` | Instrument B. Root ledger, balance sums, fold thresholds and row shares of the rigid six-member ring at 40 digits, from the derivation in its header. |
| `controls_check.py` | 5291 | `3bddeee63461b8a227b146fbe97b8077434289d0625209357b540da69cfc21c4` | Instrument C. Fold coefficient on a line source (exact) and on a circular source; exact rational checks of the four-member construction; own-path row on the model path. |
| `lattice_rate_order.py` | 3706 | `63920e6fb2b7ccf656f33e377c481a5ccebfa8c96ad11aaf964ecd2f252f29bb` | Instrument D. Diagonal entries of the linear mode matrix of the alternating cubic lattice at $g=16$ over the cube of radius 14, in floating point, with a derived bound on the omitted tail; floating signs of the characteristic function at three wavevectors, and a downward scan of $(0.3,6)$ for a sign change at each. |

## Known cases

Each instrument runs its known case before its target and stops if it fails.

- A: the resting mirror release with $K=0.2862286103053385$ and half-separation $0.5$, compared with the terminal values of the separately authored [MEC-007 oracle record](../mec-007-stationary-mirror-incoming-oracle.v1.json) (SHA-256 `7ee71e43d1b0e9dadd19e6241d04788b58ec33b6cacc94a2bd5bcb2a50d5c05d` when read). The record's six terminal numbers are typed into the instrument; the record was not edited. Largest difference at step $10^{-4}$: $1.23\times10^{-10}$.
- B: the root of $2\sin v=v$, $v=1.895494267033980947\ldots$
- C: the exact two-row sum for a source moving on a line at speed $1.7$ past a resting receiver.
- D: the floating characteristic function at the staggered wavevector changes sign between $2.7952306900$ and $2.7952306902$. This is agreement at floating precision with the lattice adjudication's certified enclosure $2.795230690086810814283894<\lambda<\ldots901$; it does not place a floating root inside that enclosure, which is about $7\times10^{-24}$ wide.

## Outputs

Retained as byte copies in the ignored local directory `.local-data/master-equation-closure/saturday-cross-geometry/` relative to the repository root, with `manifest.json` listing every file's byte count and SHA-256. This is local retention, not a backup, and is unavailable in a fresh checkout.

| Output | SHA-256 |
| --- | --- |
| `release_population_known.out` | `93c8f5170312354f23fefcf7e0508a1bb11f6b1cfa782e4b171bdf107d06bcbf` |
| `release_population_known.json` | `9afb3668a1c2fb37d547cbb40f15ca91d6a19ad77223c4692ca7720248582c2e` |
| `release_population_target.out` | `5b75afa9762b979842c7a2eb0fb3ece5da3dadab53898b10e7bdf5238d2744aa` |
| `release_population_target.json` | `621d0d6e3f3c9e80531f17f396f76f3b380ca5c4c641e3b8a11e6e0926391185` |
| `ring_reference.out` | `78f936260bb01c1fd50c29b42baad7e31ccf6f3a859ced12768dede8555f4b5e` |
| `controls_check.out` | `58eab7448cfbd0a1101fb2c064bfaff7de84cd69a6e7c2de85d0408eb0de77c8` |
| `lattice_rate_order.out` | `f233d6b8b47008c58a90ea696746382c15f44a2ecfb02b7e1f9eab79a2ba6eff` |

## Repeating the runs

Use the shared Python environment (`$AAA_VENV`, falling back to `../.venv` from the repository root); the instruments need `mpmath` (B, C) and `numpy` (D), and A needs only the standard library. Instrument A writes `release_population_known.json` or `release_population_target.json` into the current directory, so run it from a new scratch directory, giving the script by path. All four finish in under ten seconds each on the workstation used. Expected text output is the retained `.out` files; timings are not part of them.

## Limits

Instrument A has a fixed step and no error enclosure, and its twelve target runs illustrate the note's stability theorem without testing any constant; a single run is not a counterexample to it. Beyond the first speed-one time it integrates the cross rows only, as the comparison path used in the note's proof; that is not the Master Equation there and is used only inside the window stated in the note. Instrument D evaluates in floating point and has no roundoff enclosure. The line it prints about a float evaluation error "of order 1e-12" is an unverified estimate, not a bound. Its tail bound, below $10^{-15}$ here, is derived. Its endpoint values $-1.7456$ at $2.9$ and $+5.9922$ at $3.5$ are therefore measurements, and the existence of a root between them is conditional on those signs. Its scan covers three wavevectors and a finite grid of rates and does not certify a largest root, although one printed column is headed "largest real root"; read that heading as the first sign change met when scanning down from $6$. The instrument and its output are kept as run. Instrument B compares with documented values and does not certify the ring balance, which remains the result of the ring certificates. The fold thresholds it prints are for the rigid family at fixed angular rate; its phrase "speed margin" is a distance along that one direction and says nothing about the nearest boundary of the ring among all pasts. The header of instrument A calls the supplied pasts uniform-motion pasts; the regularity class used in the note is the one stated there.
