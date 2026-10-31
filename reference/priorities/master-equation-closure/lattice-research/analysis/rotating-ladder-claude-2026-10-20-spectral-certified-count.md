# Rotating ladder: a certified count of growing characteristic roots at R = 1000

## Result

At $R=1000$, uniformly over the admitted balance box B0 ($\delta\in[3.34503529238,3.34503529306]$, $\varepsilon=\omega R\in[0.0138408142416,0.0138408143198]$), the characteristic determinant $\det\Delta(\lambda;q,p)$ of the delayed first variation has the following numbers of zeros, counted with multiplicity, in the region

$$
\Omega=\{0.3\,\omega\le\operatorname{Re}\lambda\le3.2865\,\omega,\ \lvert\operatorname{Im}\lambda\rvert\le3.2865\,\omega\}.
$$

| Sector | Count in $\Omega$ | Located |
| --- | --- | --- |
| $q=\pi$, $p=+1$ | **2** | two simple real roots, $\lambda/\omega\in[0.81948844,0.81948853]$ and $[0.98742965,0.98742981]$ |
| $q=\pi$, $p=-1$ | **0** | |
| $q=0$, $p=+1$ | **0** | |
| $q=0$, $p=-1$ | **0** | |

A certified root bound, valid for every $q$ and $p$, shows that no root with $\operatorname{Re}\lambda\ge0$ has $\lvert\lambda\rvert\ge3.13\,\omega$. Hence, in these four sectors, the delayed linearisation about the certified $R=1000$ balance has exactly two characteristic roots with $\operatorname{Re}\lambda\ge0.3\,\omega$, both in the sector $q=\pi$, $p=+1$, both real and simple. The larger is the leading in-plane root certified in B1 of the [stage-1 note](rotating-ladder-claude-2026-10-20-spectral-certificate.md). The smaller agrees with the history-flow note's float axial root $0.81949\,\varepsilon$; that it lies in the axial block is inferred from that agreement, not certified here.

**Scope.** The four sectors are the period-2 class of the departure theorem ($q\in\{0,\pi\}$, $p=+1$) and its complement ($p=-1$). Other wavenumbers are not covered. Growth rates below $0.3\,\omega$ are not counted; they include the delay-induced oscillations of order $5\times$speed, such as the in-step pair certified at $0.0689\,\omega$. Every root is a formal mode of the linear equation, with no nonlinear statement.

**Claim grade.** Derived by certified interval computation, under the same assumptions as the stage-1 note: mpmath 1.3.0 `iv` is correct; B0 contains the balance (untwisted-certificate worker, review pending); the adjudication's first-variation matrices; and the existence proof's Lemmas 1 and 2. To my knowledge this is the first rigorous root count for the ladder; the adjudication's census by contour was float.

## Method

**Region and root bound (derived).** For $\operatorname{Re}\lambda\ge0$ every exponential has modulus at most one. Writing $\tilde\Delta=R(\mu I+\varepsilon J)^2+E(\mu)$ with $\mu=\lambda R$, we have $\lVert E(\mu)\rVert_2\le b_0+b_1\lvert\mu\rvert$, with $b_0=\lVert\sum L_u\rVert_F+\sum_j\lVert P_j\rVert_F+\text{tail}$ and $b_1=\sum_j\lVert W_j\rVert_F+\text{tail}$ (tails from Lemma T of the stage-1 note, with $\sigma_0=0$). Since $(\mu I+\varepsilon J)^2$ is normal with smallest singular value at least $(\lvert\mu\rvert-\varepsilon)^2$, $\tilde\Delta$ is invertible whenever $R(\lvert\mu\rvert-\varepsilon)^2>b_0+b_1\lvert\mu\rvert$. This is the adjudication's bound with Frobenius norms; it holds for every $q$ and $p$ because the bound does not depend on the phases. Over B0 the computation gives $b_0\le0.8290$ and $b_1\le0.7861$ (unit coupling), so no root with $\operatorname{Re}\lambda\ge0$ satisfies $\lvert\lambda\rvert/\omega\ge\Lambda_b=3.13$; the float 2-norm version in the adjudication gave $2.92$. $\Omega$ uses $1.05\Lambda_b=3.2865$.

**Choice of $\sigma_0=0.3$.** The adjudication's float census at speed $0.014$ puts the delay-induced oscillations near growth rate $5\times$speed, that is $0.005$ to $0.07\,\omega$, and the real-root families near $0.82$ to $0.99\,\omega$; $0.3$ lies well between them. The certified boundary test confirms the separation: every boundary segment's determinant enclosure excludes zero. The smallest segment needed was $0.0062$ (in $q=0$, $p=+1$); no segment failed.

**Certified winding (derived rule).** For $q\in\{0,\pi\}$ every coefficient is real, so $f(\bar\lambda)=\overline{f(\lambda)}$ for $f=\det\tilde\Delta$. The winding round $\partial\Omega$ is therefore twice the argument change along the upper half path $(X,0)\to(X,Y)\to(\sigma_0,Y)\to(\sigma_0,0)$, and the count is that change divided by $\pi$. The path is cut into segments of length at most $0.05$ in $\lambda/\omega$, and each segment is treated as follows.

1. Enclose $f$ over the whole segment, uniformly over B0, by a complex rectangle. If the rectangle contains $0$, bisect the segment.
2. A rectangle that excludes $0$ lies in an open half-plane through the origin, so $\arg f$ has a branch on it with range below $\pi$. The argument change along the segment then equals the principal angle between the end values.
3. Compute that angle at 50 digits from the midpoints of the end-value enclosures, with error at most $\arcsin(r_0/\lvert m_0\rvert)+\arcsin(r_1/\lvert m_1\rvert)$, where $r$ is the enclosure's half-diagonal.

The count $n$ is certified when $\lvert\sum\text{angles}-n\pi\rvert+\sum\text{errors}<\pi/2$. As a consistency check, the end values on the real axis are real, and $\operatorname{sign}f(X)\cdot\operatorname{sign}f(\sigma_0)=(-1)^n$ held in all four sectors.

**Truncation.** The rows carried explicitly per segment number $\min(1000,\max(150,\lceil14/(\operatorname{Re}\mu_{\rm lo}\,\delta)\rceil))$, with the Lemma T tail added; at $\operatorname{Re}\lambda=0.3\,\omega$ that is $1000$, with tail about $10^{-12}$. The instantaneous sum is carried to $N_s=50000$, with tail $8.6\times10^{-11}$.

**Location.** In $q=\pi$, $p=+1$ the determinant is real on the real axis. Strict signs were certified on the grid $0.3,0.31,\dots,3.29$ (no undetermined point), and two sign-change brackets were found and refined by bisection. Each bracket holds at least one root and the certified count is two, so each holds exactly one root of multiplicity one, and there is no other root in $\Omega$.

## Controls (run before the ladder; all passed)

- **Real polynomial with known zeros** $\{0.5,1\pm i,2.5\pm3i,2,2,4,0.1,1\pm5i\}$ on $[0.3,3.5]\times[-3.5,3.5]$: certified count $7$, as expected, including the double zero; 204 segments; error $3.5\times10^{-18}\pi$.
- **$z-20e^{-z}$** on $[0.3,3]\times[-12,12]$: certified count $5$, equal to the number of Lambert values $W_k(20)$ inside, computed separately by mpmath: $W_0$, $W_{\pm1}$, $W_{\pm2}$.
- **Negative control.** A polynomial with a zero on the contour edge is correctly refused: one segment fails at the minimum length and no count is issued.
- The evaluator's own controls are those of the stage-1 and growing-roots notes (same frozen module, sha256 `08768074…`).

## Measured cost

The four sectors were run under the owned compute supervisor (run ids `a504eb22…`, `83c4570d…`, `e33e94e3…`, `fdfacaf9…`) with heartbeat files. Wall times were 247, 336, 377 and 244 s; precomputation took 126 to 146 s and the contour 100 to 250 s. The contours needed 192 to 283 segments and 0 to 91 bisections. Location took 67 s.

## Not shown, and falsifiers

Not shown:

- roots with $\operatorname{Re}\lambda<0.3\,\omega$;
- wavenumbers other than $0$ and $\pi$;
- an independent check of B0 or of mpmath;
- that the $0.81949$ root is axial.

Falsifiers:

- An independent evaluation that finds a root of $\det\Delta(\cdot;q,p)$ in $\Omega$ in any of the four sectors, beyond the two listed, for some parameter in B0, would refute the count.
- So would a root with $\operatorname{Re}\lambda\ge0$ and $\lvert\lambda\rvert\ge3.13\,\omega$, at any $q$ or $p$, which would refute the root bound.
- So would a certified determinant enclosure that excludes zero but disagrees in sign with the recorded end values.

## Files and reproduction

Evidence directory: `reference/priorities/master-equation-closure/lattice-research/evidence/rotating-ladder-claude-2026-10-20/spectral-certificate/` (new files only; earlier files untouched).

| File | Content |
| --- | --- |
| `certified_count.py` | The counter and its known cases. |
| `certified-count-known.json` | Known-case receipt. |
| `certified-count-qpi-p+1.json`, `certified-count-qpi-p-1.json`, `certified-count-q0-p+1.json`, `certified-count-q0-p-1.json` | The four counts, with region, box, root bound and segment statistics. |
| `count_locate.py`, `certified-count-locate-qpi-p+1.json` | Location of the two counted roots. |

Heartbeat files are in `.local-data/master-equation-closure/rotating-ladder/claude-2026-10-20/spectral-certificate/`.

Reproduction, from the evidence directory:

- `python certified_count.py known` takes 1 s.
- `python certified_count.py ladder Q P 0.3` takes 4 to 6 min per sector, run under the supervisor with `--cwd` set to the evidence directory.
- `python count_locate.py` takes 67 s.

Nothing is left running.


## Independent review disposition

Codex reviewed this count as frozen (note SHA-256 `7e86430762b018ccc73d68b046512d6600926ececf9b07bdfe3c5a3796032496`) in the [shared review record](../../../../op/agent-chats/2026-10-20-rotating-ladder-six-hour/chat.md), entry 2026-10-20T23:55:33Z and accepted the four counts (2, 0, 0, 0), the all-wavenumber outer bound (valid for $\lvert\mu\rvert\ge\varepsilon$, which is where it is used) and the two real simple roots. It found the winding rule sound and the symmetric-half and parity arguments valid at $q\in\{0,\pi\}$, and that no indentation is needed at the real-axis edges. Because the original angle computation used point transcendental functions with an underived $10^{-40}$ allowance, it reran all four contours with interval angle arithmetic (interval `atan2` and square roots), after the known cases, and obtained the same counts with strict margins. Corrections: the balance box B0 is independently accepted (packet 2), superseding "review pending" above; any statement that this is the first rigorous root count beyond this project's record is withdrawn; the axial identity of the $0.819\,\omega$ root remains inferred.
