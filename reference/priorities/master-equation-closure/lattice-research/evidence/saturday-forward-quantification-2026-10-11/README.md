# Evidence: Saturday forward quantification, task 1 (2026-10-11)

This directory holds the three session instruments used by the [quantification note](../../analysis/saturday-localized-forward-quantification-2026-10-11.md) and the sources of their earlier versions. It was corrected after the [Codex review](../../analysis/saturday-localized-forward-quantification-codex-review-2026-10-11.md) (findings QF2, QF3, QF5): the first two instruments and all their outputs are unchanged, and a third instrument, `declared_cascade_witness.py`, was added. **The numbers displayed in the note are the declared values of the third instrument, not the printed values of the first.** The note's results are hand derivations; the instruments supply arithmetic. They were written in the same session as the derivations and have had no independent review, so agreement between the note's formulas and these numbers is not independent evidence. Nothing here integrates the equation, evaluates a history or its correction, or measures anything on a solution.

## Instruments

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| `forward_quantification_constants.py` | 17,678 | `4f1e7f2d40af8c6c6dc629bddc53e567304d943c6d8eebd2d8a0ecc36460cb08` |
| `row_derivative_sample_check.py` | 3,750 | `ad5afae399889380d46ca667081c3bc6d93b5fc7f5e03bfe9f4b3cd67814f9fb` |
| `declared_cascade_witness.py` | 15,088 | `b7e95fddadd45cf7db417f79d90dff19d6f20af3854d46396844a8736ed74f2c` |
| `history/forward_quantification_constants.attempt1.py` | 14,594 | `d8e27e6425fb2cd4c44cb130820cd55bf62332cdda0799abba07eed1fab07b50` |
| `history/forward_quantification_constants.attempt2.py` | 14,669 | `d1f6d52f047fdd521d03a97232c2c658ad86583621beaacb071e6a8955a73492` |
| `history/declared_cascade_witness.attempt1.py` | 14,938 | `20824f1de8ba7dedb9c352c796c435edf3b0e3699e7fd89f1ba5abf37bcd6c8c` |

Environment: the shared virtual environment, Python 3.13.2, mpmath 1.3.0. No SciPy or NumPy is imported.

### `forward_quantification_constants.py`

**What it computes.** Upper endpoints of the constants of the note's Sections 2 to 9 and lower endpoints of the radii, margins and times, from the closed formulas stated there.

**Arithmetic and rounding (corrected statement).** Exponentials, square roots, logarithms, lattice sums and the products and sums built from them are `mpmath.iv` interval operations at 40 decimal digits, which round outward. Not every operation is an interval operation: the endpoints of the rate interval (for example `mp.mpf("2.7952") - mp.mpf(1)/10`), the arguments $a-\tfrac14$, $2a-\tfrac14$ and $2a$, and the comparisons in the known cases are formed in 60-digit binary floating point from decimal strings, rounded to nearest, before conversion to intervals; the relative error of such a value is near $10^{-60}$ and is not enclosed. Printed values are interval endpoints shown to ten or twelve figures by `mpmath.nstr`, which rounds to nearest in the last printed figure. The printed values are therefore close approximations of interval endpoints and are **not** certified endpoints; an earlier version of this README and of the note treated them as such. The note no longer quotes them as bounds. The instrument does not certify the interval library.

**Finite sums and truncation.** Lattice sums run over the cube of half-width $40$ about the origin ($81^3-1=531{,}440$ sites), grouped by squared distance. Tails are bounded analytically and added to the upper endpoint only:

- exponential sums $\sum e^{-xr}r^{-p}$, $p\ge-1$, $x>1/2$: at most $26\,e^{-(x-1/2)\cdot41}/(1-e^{-(x-1/2)})$, because the sites of largest coordinate $m$ number $24m^2+2\le26m^2$, lie at distance between $m$ and $\sqrt3m$, and $m^2\le e^{m/2}$ for $m\ge9$, $\sqrt3m^3\le e^{m/2}$ for $m\ge20$. At $x=2.4$ this is below $4.6\times10^{-33}$ (the first instrument printed its upper endpoint as $4.506\times10^{-33}$, rounded to nearest).
- $Z_p=\sum r^{-p}$, $p\ge4$: at most $24/((p-3)40^{p-3})+2/((p-1)40^{p-1})$, which is exactly $12/40^2+1/(2\cdot40^4)=0.0075001953125$ for $p=5$ (at most $0.00751$) and exactly $0.6+1/96000$ for $p=4$ (at most $0.600011$).

**Domain coverage.** No domain is sampled. The contour and wavevector margins are analytic inequalities valid on the whole circle and the whole ball; the rate $a$ enters through an interval, with each factor evaluated at the end of the interval that makes the bound larger.

**No history or continuous error.** Nothing is integrated.

**Known cases, asserted before any target, so a failure stops the run.**

1. K1: the identity $((1+z)/(1-z))^3-(1+2z)^3=19$ at $z=1/2$; $e$; $(\sqrt2)^2$.
2. K2: the census against the classical numbers of representations by three squares for $n=1,\dots,9$; shell counts $24m^2+2$ for $m=1,\dots,40$; the total count; an exact rational separable sum over the cube of half-width $6$ against its closed form.
3. K3: the preparation note's hand majorant against the four values recorded independently in the Codex preparation review, $S_2(5.05)\le0.04937679$, $S_3(5.05)\le0.04493254$, $q^\omega(5.3)\le0.20024896$, $C_L\le0.04451367$, to $6\times10^{-9}$.
4. K4: the enclosure of $Z_4$ against the literature value $16.5323$; the direct enclosures of $S_p$ at $2.4$ and $5.05$ against the majorant.
5. K5: $h(2.7952)<0<h(2.7953)$, and the enclosures of $h'(\lambda_g)$ and $\lambda_gh'(\lambda_g)$ against the float values $2.7952306901$, $4.280$, $11.964$ of the accepted preparation note.

**Targets.** T1 row-derivative constants; T2 $Z_5$ and the lattice sums; T3 constants uniform for $a\in[2.65,3]$ with the hand majorant, and the five inequalities for the declared radii; T4 the contour of radius $1/10$, the invertibility margins and the seed-norm bound; T5 constants for that contour with enclosed sums, the five inequalities, $\varepsilon_0$ and $T_*$; T6 the real-root and residue margins and the growth table.

### `row_derivative_sample_check.py`

Central differences of $\Psi$ in double precision with step $10^{-3}$, at 4000 sampled arguments with $\lvert v\rvert\le3/16$ (one in four with the velocity along the range at the cap, where the transmitter factor is smallest) and twelve direction pairs each, fixed seed `20261011`. Known cases, asserted first: the exact second derivatives $6$ and $2$ at rest and the first velocity derivative $1/D^2$ along the range, each to a stated tolerance. It asserts that no sampled value exceeds a bound of Lemma Q1 by more than $10^{-3}$. The truncation and roundoff errors of the differences are not enclosed, so its exit establishes only that: no sampled exceedance beyond the $10^{-3}$ slack. The largest sampled value for the third bound, $3.72874$, is about $2\times10^{-5}$ above the exact bound $8192/2197$; that is inside the slack and consistent with finite-difference error at an argument where the bound is attained, but the instrument does not prove that attribution. It is a finite sample: it could expose a grossly wrong bound and cannot prove a correct one. The analytic proof of Lemma Q1 is the authority.

### `declared_cascade_witness.py` (added after review)

**Purpose.** To make every number displayed in the note follow literally from displayed inputs. It does not repair or replace the first instrument.

**Method.** Inputs are exact rationals (`fractions.Fraction`), converted to intervals by interval division. (A) Each declared value that needs a transcendental function or a lattice sum is taken from an `mpmath.iv` endpoint at 50 digits, converted exactly to a rational, and rounded outward to a short decimal by integer floor or ceiling: upper bounds up, lower bounds down. (B) Every later step, including $C_{\rm src}$, $C_N$, $C_N'$, their products with $C_L$, the five inequalities, and the contour cascade to $m_F$, $\bar\Lambda_0$, $\varepsilon_0$, $p_0$, is exact rational arithmetic on declared values only, with each result rounded outward again. (C) The growth table is evaluated at the declared constants and the declared time $T_*$, with interval logarithm and exponential.

**Controls, asserted before any target.** C1: the directed-rounding functions on known rationals, including a negative number, an exact decimal, and results needing negative decimal places. C2: an interval for $1/3$ converts to rationals that bracket $1/3$ to $10^{-45}$; the interval for $1/4$ is exact; $\exp(\log 2)$ contains $2$. C3: six exact values stated in the Codex review of this note are reproduced exactly: $12/40^2+1/(2\cdot40^4)=0.0075001953125$; $2.6952\times0.40416=1.089292032$; $8[2(0.69831)+2.8953(0.89283)]=31.853045592$; the time-zero bounds $1.14300909288504\times10^{-7}$ and $1.1430000909288504\times10^{-9}$ for the first submission's constants; and $1/(2.7953\times4.2803)<0.083581$. C4: the lattice census against representation counts and shell counts.

**Boundaries.** Roundoff of the transcendental functions is enclosed by `mpmath.iv`, which the script does not certify. Lattice tails are bounded as in the first instrument and added to upper endpoints. Steps (B) are exact. Nothing is integrated or sampled. The declared values are printed by a 14-figure formatter, which is exact for these short decimals.

**Relation to the first instrument.** The two share formulas and an author; their agreement is a consistency observation, not independent evidence. Every declared value lies on the safe side of the corresponding printed value of the first instrument. The growth table differs slightly from the first instrument's T6, because T6 used its own unrounded seed-norm bound (about $0.11429$) and hence a slightly different time, whereas the witness uses the declared $0.1144$, $0.0763$, $0.9308$ and $69.7$ at the declared $T_*$. The note's table is the witness's.

## Retained runs

All runs went through the owned-compute supervisor in the foreground, on 2026-10-11. Outputs are retained outside Git in `.local-data/aaa-work-threads/saturday-quantitative/claude-task-1/`.

| Run | Source | Supervisor record | Outcome |
| --- | --- | --- | --- |
| `run1` | attempt 1 | 22:07:10.597Z to 22:07:10.863Z, 0.278 s | exit 1 at known case K1; no target computed |
| `run2` | attempt 2 | 22:07:31.120Z to 22:07:32.624Z, 1.515 s | exit 0; targets T1 to T5 of that version |
| `run3` | final version of the first instrument | 22:09:25.394Z to 22:09:27.064Z, 1.682 s | exit 0; all targets; the figures quoted in the note as first submitted, now superseded there by the declared values of `witness2` |
| `sample1` | sample check | 22:10:17.463Z to 22:10:18.293Z, 0.844 s | exit 0; no sampled exceedance beyond the slack |
| `witness1` | witness attempt 1 | 22:27:46.077Z to 22:27:47.116Z, 1.053 s | exit 1 after three table rows; no JSON written |
| `witness2` | witness, final | 22:27:59.211Z to 22:28:00.272Z, 1.074 s | exit 0; the declared values and table quoted in the note |

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| `witness2.out` | 4,292 | `2b82f6d7b0161df49690da37d01e1195bfbee7ace59debe0f1888f73deb419f1` |
| `witness2.json` | 8,884 | `782a3652b0b6ee987c85c9d7ae54dbaf595713b4ab9c5a9d72dfceef9fe3f2f8` |
| `witness2.supervisor.json` | 2,351 | `4a351b0b5450f157218b84d93564a5548621a51aee2ffb8e7f3016e4696492df` |
| `witness1.out` | 662 | `70d923f6d9f7343fe0cf63dcd6800e4cac30801d131cdc76331c3bd5ab810157` |
| `witness1.stderr.log` | 1,657 | `0559baceb9f7006c3bc677bcefc084a2e066eadcbab8b1f0a0fe786009a08918` |
| `witness1.supervisor.json` | 2,350 | `c1ec7c5ba55d5dbaa89d0598f788e6bf678f7a6171e9f7e0a35c3f75f6b68bf2` |
| `run3.out` | 3,114 | `c7a74cbc3d99b1def1ded647d09765fd49739c2d7468e3a2b7abb82db0463264` |
| `run3.json` | 6,748 | `76d84767428aedc1a02e5eac3629dca4f146cfc639c53f047fa690c434ecd7d9` |
| `run3.supervisor.json` | 2,359 | `dca60053ff9afb533734927d6600448efbab68ad4d76ad527c543778004bdd3f` |
| `sample1.out` | 578 | `244204acc85a9a5884cc2ede35b3ff66e9dbaf6f8f67847e23ac64d6464fa720` |
| `sample1.json` | 783 | `4954e1f46466b9cca3dfe9776c97bf540629e04faa892b35c6d92ad9e5fdcc87` |
| `sample1.supervisor.json` | 2,354 | `93904ce1c64bb9c44bba4de77e465e7256cc26ead0dc0a4f7a68072f6e14fdb7` |
| `run2.out` | 1,388 | `54efa288c38c8e2f2281b5efdeb0f96f388cbe2eecd866e1bdd5f9ee825b5a2f` |
| `run2.json` | 4,759 | `4fdecd2257bf3dd2bac9da84975b43f30116095ce280b6a6b24aef8eeb6227d5` |
| `run2.supervisor.json` | 2,359 | `79742efab23ab7a2a450b092f8ca00d9170a588f8b2e45de3d9f2c2aa75c0808` |
| `run1.stderr.log` | 445 | `1d85d81007ddd120559d2fc709a55bdae8d013b9d6e38264827502405bebfd4f` |
| `run1.supervisor.json` | 2,355 | `a6bd353b99da28e117553670ba342755e5102d4717dd392c2fc9c16be991e7f9` |

The standard-error files of `run2`, `run3`, `sample1` and `witness2`, and the standard output of `run1`, are empty.

## The earlier versions, and what changed

Each earlier source was copied into `history/` before it was edited, so every retained output has the source that produced it.

- **Attempt 1 to attempt 2.** `run1` stopped at the known case comparing the interval for $e$ with the library's value of $e$: the reference had been computed at the same 40 digits as the interval and coincided with the interval's upper endpoint, so a strict inequality failed. This was a defect of the check, not of the interval. The comparison precision was raised to 60 digits and the inequality made non-strict. Nothing else changed.
- **Attempt 2 to final.** After `run2` passed: the declared radii were raised to values just below the computed ones (uniform $1.0\times10^{-4}$, $4.0\times10^{-4}$ to $1.1\times10^{-4}$, $4.7\times10^{-4}$; contour $1.4\times10^{-4}$, $5.6\times10^{-4}$ to $1.8\times10^{-4}$, $7.4\times10^{-4}$); the seed support radius was changed from $1/10$ to $1/20$ with the invertibility margin also evaluated on the ball of radius $3/20$; the tail bound was extended to $p=-1$; and target T6 was added. The known cases and targets T1 to T3 were not changed, and their printed values are identical in `run2` and `run3`. The seed-norm bound, $\varepsilon_0$ and the times differ between the two runs because the seed class differs. After the review the note uses the witness's declared values and not `run3`'s printed ones.
- **Witness attempt 1 to final.** `witness1` computed the whole declared cascade and printed three table rows, then failed in the significant-figure rounding helper at the first result with four integer digits (a growth factor near $2010$), because the helper formed $10^{n}$ as a floating-point number for negative $n$. The helper now uses exact rational powers of ten, and a control with negative decimal places was added. The three rows printed by `witness1` are identical to the corresponding rows of `witness2`.

## Reproduce

From the repository root, with the shared environment:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/lattice-research/evidence/saturday-forward-quantification-2026-10-11/forward_quantification_constants.py .tmp/forward_quantification_constants.json
```

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/lattice-research/evidence/saturday-forward-quantification-2026-10-11/row_derivative_sample_check.py .tmp/row_derivative_sample_check.json
```

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/lattice-research/evidence/saturday-forward-quantification-2026-10-11/declared_cascade_witness.py .tmp/declared_cascade_witness.json
```

Each takes one or two seconds and ends with `ALL PASSED` or `NO VIOLATION IN SAMPLE`. The first and third are deterministic. The second has a fixed seed.

## What this can and cannot establish

The witness can establish, to the extent the interval library rounds outward as documented, that each declared primitive bounds its interval endpoint on the safe side, and, exactly, that every displayed product, sum, quotient and inequality of the note holds with its displayed inputs, including the five inequalities for the declared radii. The first instrument's printed values are approximations of interval endpoints and establish no bound by themselves. It cannot establish that the formulas are the right ones; that is the note's derivations. It does not construct the correction $v^\varepsilon$, does not evaluate any seed, and does not test Theorem Q7 or Proposition Q8 on a history.
