# Rotating ladder: certified slow-root counts in all four period-2 sectors (addendum)

## Result

At $R=1000$, uniformly over the balance box B0 ($\delta\in[3.34503529238,3.34503529306]$, $\varepsilon=\omega R\in[0.0138408142416,0.0138408143198]$), the zeros of $\det\Delta(\lambda;q,p)$, counted with multiplicity, in

$$
\Omega_{\rm slow}=\{0.03\,\omega\le\operatorname{Re}\lambda\le3.2865\,\omega,\ \lvert\operatorname{Im}\lambda\rvert\le3.2865\,\omega\}
$$

are as follows.

| Sector | Count | The roots |
| --- | --- | --- |
| $q=\pi$, $p=+1$ | **2** | the two simple real roots already located at $\operatorname{Re}\lambda\ge0.3\,\omega$, $\lambda/\omega\in[0.81948844,0.81948853]$ and $[0.98742965,0.98742981]$; none in $0.03\le\operatorname{Re}\lambda/\omega<0.3$ |
| $q=\pi$, $p=-1$ | **0** | |
| $q=0$, $p=+1$ | **2** | the delay-induced in-step pair, $\lambda/\omega\in[0.06888499,0.06888537]\pm i\,[0.6064445,0.6064450]$ |
| $q=0$, $p=-1$ | **1** | one simple real root, $\lambda/\omega\in[0.04513702,0.04513733]$ |

The $q=0$, $p=+1$ row is the earlier addendum's count. The other three are new, as is the proof that the enclosure they use passes the known cases.

The $q=0$, $p=-1$ root is located as follows. The count is odd and roots come in conjugate pairs, so the root is real. The certified count of $0$ for $\operatorname{Re}\lambda\ge0.3\,\omega$ places it below $0.3\,\omega$. A strict sign change of the real determinant brackets it. At the bracket midpoint the in-plane determinant is enclosed in $[0.01510277,0.01510278]$ and the axial entry encloses zero. That is consistent with the axial block, as the adjudication's real root of this sector (an axial displacement of the two members of each rung in opposite directions) would require; the identification is inferred, not certified over the bracket.

Together with the root bound of the [certified count](rotating-ladder-claude-2026-10-20-spectral-certified-count.md) (no root with $\operatorname{Re}\lambda\ge0$ has $\lvert\lambda\rvert\ge3.13\,\omega$), this gives the following. In the four sectors $q\in\{0,\pi\}$, $p=\pm1$, the delayed linearisation about the certified $R=1000$ balance has exactly **five** characteristic roots with growth rate at least $0.03\,\omega$: two real roots at $q=\pi$, $p=+1$; one complex pair at $q=0$, $p=+1$; and one real root at $q=0$, $p=-1$. These are formal modes; roots with $\operatorname{Re}\lambda<0.03\,\omega$ and other wavenumbers are not covered.

**Claim grade.** Derived by certified interval computation, under the assumptions of the earlier notes: mpmath `iv` is correct; B0 (independently accepted); the adjudication's matrices; and Lemmas 1 and 2 of the existence proof. The block identification of the $q=0$, $p=-1$ root is inferred.

## Known cases through the exact enclosure path (run first)

The mean-value enclosure in `certified_count_slow2.py` (the intersection of $\det\Delta(B)$ with $\det\Delta(m)+\det'(B)(B-m)$) is a new code path, so it was tested before any new sector was run. `certified_count_slow_all.py` wraps each test function as a $3\times3$ matrix function with the `Ladder.matrix` call signature. The matrix is upper-triangular with the test function's factors on the diagonal and a unit off-diagonal entry, and its exact derivative is supplied. The frozen `certified_count_slow2.make_f` and this driver's `make_f_qp`, which is used for the sectors, are each called on it unchanged. The same `det3`, `ddet3`, centered form, intersection, counter and certification rule are therefore exercised end to end. All six runs passed:

- **Polynomial** with zeros $\{0.5,1\pm i,2.5\pm3i,2,2,4,0.1,1\pm5i\}$ on $[0.3,3.5]\times[-3.5,3.5]$: certified count $7$, as expected, including the double zero; 204 segments; error $1.7\times10^{-18}\pi$. Both paths gave the same result.
- **$z-20e^{-z}$** on $[0.3,3]\times[-12,12]$: certified count $5$, equal to the number of Lambert values inside ($W_0$, $W_{\pm1}$, $W_{\pm2}$), on both paths.
- **Zero on the contour edge**, $(z-0.3)(z-1)$: refused on both paths. One segment failed at the minimum length, no count was certified, and the parity check also flags it.

## Run

Pieces A to E of the upper contour are the same as in the $q=0$, $p=+1$ addendum, at $\sigma_0=0.03$ and $X=Y=3.2865$, with $N\le6000$ and $N_s=20000$. The three sectors ran as fifteen piece tasks on three worker processes inside one owned-compute-supervisor run (`73911aaf…`, 1159 s wall time, deadline 6000 s). Each worker and piece wrote heartbeats at intervals of 30 s or less.

| Sector | Argument change / $\pi$ | Error / $\pi$ | Segments | Bisections | Parity |
| --- | --- | --- | --- | --- | --- |
| $q=\pi$, $p=+1$ | $2.000000$ | $1.5\times10^{-5}$ | 200 | 1 | consistent |
| $q=\pi$, $p=-1$ | $0.000000$ | $2.8\times10^{-4}$ | 207 | 8 | consistent |
| $q=0$, $p=-1$ | $1.000000$ | $1.6\times10^{-5}$ | 199 | 0 | consistent |

No segment failed. The smallest segment needed was $0.0062$, in $q=\pi$, $p=-1$, on the left edge between $\operatorname{Im}\lambda=1.2\,\omega$ and $0.5\,\omega$. That is near the in-plane translation root at $\lambda=\pm i\,\omega$ on the imaginary axis, which the symmetry requires and which lies $0.03\,\omega$ outside $\Omega_{\rm slow}$. The real-axis end values were strictly positive at $\lambda=3.2865\,\omega$ in all three sectors; at $0.03\,\omega$ they were positive for $q=\pi$ and $-3.919\times10^{-6}$ for $q=0$, $p=-1$. The location run for $q=0$, $p=-1$ took 50 s.

## Not shown, and falsifiers

Not shown: roots with $\operatorname{Re}\lambda<0.03\,\omega$, which include the alternating-rung pair at about $0.0045\,\omega$; wavenumbers other than $0$ and $\pi$; a certified block identification for the $q=0$, $p=-1$ root; any nonlinear statement.

Falsifier: an independent evaluation over B0 that finds a zero in $\Omega_{\rm slow}$ in any of the four sectors beyond those listed, or no zero in a listed enclosure, would refute these counts. So would a root with $\operatorname{Re}\lambda\ge0$ and $\lvert\lambda\rvert\ge3.13\,\omega$.

## Files

All new, in `reference/priorities/master-equation-closure/lattice-research/evidence/rotating-ladder-claude-2026-10-20/spectral-certificate/`. Frozen files are untouched.

| File | Content |
| --- | --- |
| `certified_count_slow_all.py` | The driver, including the known-case wrapper. |
| `certified-count-slow-all-known.json` | Known cases on both enclosure paths. |
| `certified-count-slowall-piece-{pi+1,pi-1,0-1}-{A,B,C,D,E}.json` | The fifteen pieces. |
| `certified-count-slowall-summary.json` | The three sector counts. |
| `count_locate_slow_q0m.py`, `certified-count-slowall-locate-0-1.json` | Location of the $q=0$, $p=-1$ root. |

Heartbeat files are in `.local-data/master-equation-closure/rotating-ladder/claude-2026-10-20/spectral-certificate/`. The supervisor output is in `.tmp/rotating-ladder/spectral-certificate/slowall-supervisor.out`.

Reproduction, from the evidence directory:

- `python certified_count_slow_all.py known` takes 3 s.
- `python certified_count_slow_all.py sectors` takes about 19 min, run under the supervisor with `--cwd` set to the evidence directory.
- `python count_locate_slow_q0m.py` takes 50 s.

Nothing is left running.


## Independent review disposition

Codex reviewed the slow-threshold counts as frozen (this note and the earlier $q=0$, $p=+1$ addendum, with their receipts) in the [shared review record](../../../../op/agent-chats/2026-10-20-rotating-ladder-six-hour/chat.md), entry 2026-10-21T00:38:22Z, and **accepted the counts 2, 2, 0, 1** for $(q,p)=(0,+1),(\pi,+1),(\pi,-1),(0,-1)$ uniformly over B0 at $R=1000$ in the region with real part at least $0.03\,\omega$, and therefore exactly five roots with growth at least $0.03\,\omega$ in these four sectors. It accepted the mean-value/intersection enclosure (via the integral form of the mean value, not a single intermediate point), audited all 20 piece receipts with outward-widened argument strings, reran all four sectors as complete upper contours with interval argument bounds after running the known cases through both mean-value paths (repairing the first sector's post-hoc control order), and confirmed that the binary left edge leaves no gap at the literal threshold. **It upgraded the identification of the $q=0$, $p=-1$ root to derived:** over the whole bracket $[0.04513702,0.04513733]\,\omega$, uniformly over B0 with the infinite tails, the in-plane determinant lies in $[0.0151027741,0.0151027814]>0$, so the unique simple zero there is a zero of the axial factor. **Defect recorded:** the generic `combine` command of `certified_count_slow2.py` checks adjacency but not that the pieces form the complete prescribed contour; on a copy of the single open piece B it returned `certified: true`. The frozen counts are unaffected (every sector's five pieces chain from $(3.2865,0)$ to $(0.03,0)$ with no failed segment, as the reviewer verified), but the `certified` flag of that command must not be used as a general acceptance test until it checks the complete contour, its orientation, both real-axis endpoints, common settings and failed-segment status. The assertion of an exactly double zero at $\lambda=0$ in the in-step sector is not needed by the count and is not established here.
