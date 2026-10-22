# Rotating ladder: certified count of slow growing roots, q = 0, p = +1, R = 1000 (addendum)

## Result

At $R=1000$, uniformly over the balance box B0 ($\delta\in[3.34503529238,3.34503529306]$, $\varepsilon=\omega R\in[0.0138408142416,0.0138408143198]$), $\det\Delta(\lambda;0,+1)$ has exactly **2** zeros, counted with multiplicity, in

$$
\Omega_{\rm slow}=\{0.03\,\omega\le\operatorname{Re}\lambda\le3.2865\,\omega,\ \lvert\operatorname{Im}\lambda\rvert\le3.2865\,\omega\}.
$$

These two zeros are the delay-induced in-step pair. The [growing-roots note](rotating-ladder-claude-2026-10-20-spectral-certificate-growing-roots.md), case (b), certifies one simple root in the box $[0.06888499,0.06888537]+i[0.6064445,0.6064450]$ in units of $\omega$ over B0, and by conjugate symmetry its conjugate is a second simple root. Two simple roots account for the whole count. Hence in this sector, apart from these two, the delayed linearisation has no root with $\operatorname{Re}\lambda\ge0.03\,\omega$. The root bound of the [certified count](rotating-ladder-claude-2026-10-20-spectral-certified-count.md) ($\lvert\lambda\rvert<3.13\,\omega$ for every root with $\operatorname{Re}\lambda\ge0$) closes the region. This agrees with the count of $0$ for $\operatorname{Re}\lambda\ge0.3\,\omega$ in the same sector.

**Claim grade.** Derived by certified interval computation, under the assumptions of the earlier notes: mpmath `iv` is correct; B0 (independently accepted, per the PI); the adjudication's matrices; and Lemmas 1 and 2 of the existence proof. The roots are formal modes, and the count covers this one sector only.

## Method and the change from the first count

The counter, the upper-contour symmetry and the certification rule are those of `certified_count.py`, imported unchanged. Two things change for the low left edge.

**Truncation.** At $\operatorname{Re}\lambda=0.03\,\omega$ the exponential factor decays by only $e^{-0.0014}$ per rung, so up to $N=6000$ rows are carried (tail about $10^{-10}$). The instantaneous sum is carried to $N_s=20000$ (tail $5.4\times10^{-10}$).

**Enclosure.** A pilot with the first count's naive enclosure, recorded in `certified_count_slow.py` and `certified-count-slow-pilot-s00.03.json` and kept as a failed approach, showed a width floor of about $5\times10^{-4}$ on the left edge near $\operatorname{Im}\lambda=0.6\,\omega$. The determinant there is about $10^{-4}$, because the in-step root lies $0.04\,\omega$ inside the edge, and the floor did not shrink when the segment was shortened from $0.05$ to $0.01$. The cause is dependency loss in a $3\times3$ determinant whose entries are about $0.4$ while the determinant is small. The new driver `certified_count_slow2.py` therefore encloses each segment by the intersection of the naive enclosure with the mean-value form $\det\Delta(m)+\det'(B)(B-m)$, where $\det'$ is enclosed over the segment; both enclosures are valid. Its pilot excluded zero on every tested left-edge segment of length $0.05$ except the one touching the real axis. There the determinant is about $2\times10^{-8}$, because of the exact double zero at $\lambda=0$, and segments down to $0.0063$ were needed.

**Run.** The upper path $(X,0)\to(X,Y)\to(0.03,Y)\to(0.03,0)$, with $X=Y=3.2865$, was split into five consecutive pieces, A to E, each run under the owned compute supervisor with 60 s heartbeats. A `combine` step checks that the pieces chain, then adds their argument changes and error bounds.

- Argument changes, in units of $\pi$: $2.97881$, $-0.00990$, $-0.02022$, $0.76652$ and $-1.71522$, summing to $2.000000$.
- Total error bound: $2.3\times10^{-4}\pi$.
- No failed segments; 217 segments, 18 bisections.
- Parity check: $\det$ is $+9.269$ at $(X,0)$ and $+1.8747\times10^{-8}$ at $(0.03\,\omega,0)$, consistent with an even count.

**Choice of $\sigma_0=0.03$.** It lies between the double zero at $\lambda=0$, which the symmetry roots require, and the in-step pair at $0.0689\,\omega$. The boundary test then certified the edge at that value, so smaller values down to $0.02$ were not needed.

## Measured cost

| Piece | Wall time (s) | Precomputation (s) |
| --- | --- | --- |
| A | 94 | 43 |
| B | 348 | 47 |
| C | 247 | 50 |
| D | 151 | 25 |
| E | 436 | 29 |

Supervisor run ids: `694c22ab…`, `ea80153c…`, `a344e929…`, `6959aa0b…`, `e8df4935…`. The five pieces ran one after another, from 23:26 to 23:48Z. A left-edge segment costs about 11 to 12 s at $N=6000$, and the bottom piece dominated. The pilots took 189 s (naive) and 116 s (centered).

## Not shown, and falsifiers

Not shown: roots with $\operatorname{Re}\lambda<0.03\,\omega$; other sectors at this threshold; any nonlinear statement.

Falsifier: an independent evaluation over B0 that finds a third zero of $\det\Delta(\cdot;0,+1)$ in $\Omega_{\rm slow}$, or no zero in the case (b) box, would refute the count. The pieces' segment records are in the receipts, so a disputed segment can be rechecked directly.

## Files

All new, in `reference/priorities/master-equation-closure/lattice-research/evidence/rotating-ladder-claude-2026-10-20/spectral-certificate/`. Earlier files are untouched.

| File | Content |
| --- | --- |
| `certified_count_slow.py`, `certified-count-slow-pilot-s00.03.json` | The naive version and its pilot, kept as the failed approach. |
| `certified_count_slow2.py`, `certified-count-slow2-pilot-s00.03.json` | The centered-form driver and its pilot. |
| `certified-count-slow2-piece-{A,B,C,D,E}.json` | The five pieces. |
| `certified-count-slow2-q0-p+1-s00.03.json` | The combined count. |

Reproduction: `python certified_count_slow2.py piece 0.03 TAG 6000 <corners>`, with the corners recorded in each piece receipt, run under the supervisor with `--cwd` set to the evidence directory; then `python certified_count_slow2.py combine 0.03 A B C D E`. Nothing is left running.
