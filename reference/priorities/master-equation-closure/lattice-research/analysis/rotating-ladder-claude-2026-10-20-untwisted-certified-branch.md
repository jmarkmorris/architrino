# A certified continuous branch of untwisted rotating ladders over a range of speeds

## Result

The untwisted rotating alternating ladder has a certified continuous branch of exact balances, under the unchanged Master Equation with $K=c_f=1$, for every member speed $\varepsilon=\omega R$ in $[0.001,\ 0.96548]$. The precise upper end is $\varepsilon_b=0.9654875312951843$, the end of the last certified piece. There is a continuously differentiable function $\delta(\varepsilon)$, the spacing ratio $d/R$, such that the ladder of speed $\varepsilon$, spacing ratio $\delta(\varepsilon)$ and radius $R(\varepsilon)=S(\delta(\varepsilon),\varepsilon)/\varepsilon^2$, with every rung $k\in\mathbb Z$ on both rails retained, satisfies the law exactly at every member and every time.

- **Uniqueness.** At each speed it is the only balance whose spacing ratio lies in that speed's certified interval $\Delta_i$.
- **Enclosures.** The covering consists of 303 glued pieces. Along it, $\delta$ stays within $[2.0466,\ 3.3733]$ and the radius within $[0.3258,\ 191825]$ (rounded outward, units $K/c_f^2$).
- **Every radius in the range is realised.** By continuity of $R$, every radius between $R(\varepsilon_b)$ and $R(0.001)$ is the radius of at least one ladder on the branch. $R(\varepsilon_b)$ lies in $[0.3323,\ 0.3424]$, and $R(0.001)$ lies in the first piece's enclosure $[84997,\ 191825]$.
- **Consistency with the point certificates.** The three point certificates (R = 1000, 1 and 0.4) and the PI's independent R = 1000 reference lie in the corresponding pieces' enclosures.

The [small-speed existence theorem](rotating-ladder-small-speed-existence.md) proves a branch only below an unspecified speed. This certificate proves a single continuous branch from $\varepsilon=0.001$ to $\varepsilon=0.9655$, about 97 percent of wake speed. The covering stopped there because the compute deadline was reached, not because any piece failed for good. Near the end the pieces had shrunk to widths of $3\times10^{-4}$ to $10^{-3}$ and cost three to seven minutes each. The cause is the absolute tail bound on $\partial_\delta G$: it scales as $1/((1-\varepsilon^2)^3N)$ and reached $0.11$ against $\partial_\delta G\approx0.2$ at $N=4\times10^4$. That is a limit of this instrument, not a property of the branch.

**Claim grade.** Derived, as a computer-assisted proof, under the dependencies of the [R = 1000 certificate](rotating-ladder-claude-2026-10-20-untwisted-certificate.md): Lemmas 1 and 2 of the [small-speed existence proof](rotating-ladder-small-speed-existence.md) as adjudicated; mpmath 1.3.0 `iv`; the frozen kernel `ladder_interval_kernel.py` (root enclosure, forward differentiation, tail bounds), imported unchanged; the self-reviewed tail bounds of that note's Section 3; and the new code of `certify_untwisted_branch.py` described below, tested by its self-test but reviewed only by its author. **Claim boundary.** Existence of the stated continuous branch and its uniqueness in the stated tube, for rigid untwisted rotation with complete history under the unchanged law. Nothing about stability, about other branches outside the tube, about twisted or translating structures, or about speeds outside the covered range. Where the covering stops is a limit of this instrument and budget, not a property of the branch.

## Method: a parametric one-dimensional Krawczyk test on pieces

The balance conditions are $G(\delta,\varepsilon)=0$ and $S(\delta,\varepsilon)=R\varepsilon^2$ (Lemma 2(d); notation of the R = 1000 note). Treat the member speed $\varepsilon$ as the parameter. Partition the covered range into pieces $E_i=[e_i,e_{i+1}]$ and choose for each a spacing interval $\Delta_i=[m_i-r_i,m_i+r_i]$. For each piece the instrument encloses, over the whole box, all rungs retained (head $\lvert k\rvert\le N$ in interval arithmetic, tail by the proved bounds of the R = 1000 note):

1. $\mathbf G_i=G(m_i,E_i)$ and $\mathbf D_i=\partial_\delta G(\Delta_i,E_i)$, and checks $\mathbf D_i>0$;
2. $K_i=m_i-\mathbf G_i/c_i+(1-\mathbf D_i/c_i)(\Delta_i-m_i)$, with $c_i$ a float near the midpoint of $\mathbf D_i$, and checks $K_i\subset\operatorname{int}\Delta_i$;
3. $\mathbf S_i=S(\Delta_i,E_i)$, and checks $\mathbf S_i>0$; the radius is then enclosed by $\mathbf S_i/E_i^2$;

and for consecutive pieces it checks that $e_{i+1}$ is the common endpoint and that $\Delta_i\cap\Delta_{i+1}\ne\emptyset$. Only $G$, $\partial_\delta G$ and $S$ are needed; the $\partial_\varepsilon G$ tail bound and its $1/\underline\varepsilon$ factors are not used, which is what allows small speeds.

**Proposition (derived).** Suppose checks 1 to 3 hold for every piece and the gluing checks hold for every consecutive pair, the pieces covering $[\varepsilon_a,\varepsilon_b]$ with $0<\varepsilon_a<\varepsilon_b<1$. Then there is a continuously differentiable function $\delta:[\varepsilon_a,\varepsilon_b]\to\mathbb R$ such that, for every $\varepsilon$ in every piece $E_i$, $\delta(\varepsilon)$ is the only zero of $G(\cdot,\varepsilon)$ in $\Delta_i$, and it lies in $K_i\cap\Delta_i$. The ladder with speed $\varepsilon$, spacing ratio $\delta(\varepsilon)$ and radius $R(\varepsilon)=S(\delta(\varepsilon),\varepsilon)/\varepsilon^2\in\mathbf S_i/E_i^2$ satisfies the law exactly; $R$ is continuous; and for each $\varepsilon\in E_i$ it is the only balanced ladder of speed $\varepsilon$ with $d/R\in\Delta_i$.

*Proof.* $G$ is continuously differentiable on $\{\delta>0,\ 0<\varepsilon<1\}$: its terms are analytic there, and the series of their $\delta$- and $\varepsilon$-derivatives converge uniformly on every compact box by the tail bounds of the R = 1000 note (Section 3; the $\varepsilon$-derivative bound needs $\underline\varepsilon>0$, which holds on any compact box in this set). *One piece.* Fix $\varepsilon\in E_i$ and put $\gamma(\delta)=\delta-G(\delta,\varepsilon)/c_i$. For $\delta\in\Delta_i$ the mean value theorem gives $G(\delta,\varepsilon)=G(m_i,\varepsilon)+\partial_\delta G(\xi,\varepsilon)(\delta-m_i)$ with $\xi\in\Delta_i$, so $\gamma(\delta)\in K_i\subset\Delta_i$. The continuous map $\gamma$ of the interval $\Delta_i$ into itself has a fixed point, which is a zero of $G(\cdot,\varepsilon)$; every zero in $\Delta_i$ is a fixed point and so lies in $K_i$; and since $\partial_\delta G>0$ on $\Delta_i\times E_i$, $G(\cdot,\varepsilon)$ is strictly increasing on $\Delta_i$ and the zero is unique. Call it $\delta_i(\varepsilon)$. Given $\varepsilon_0\in E_i$, the implicit-function theorem applied at $(\delta_i(\varepsilon_0),\varepsilon_0)$, where $\partial_\delta G\ne0$, gives a continuously differentiable local solution; it starts in $K_i\subset\operatorname{int}\Delta_i$, so near $\varepsilon_0$ it stays in $\Delta_i$ and equals $\delta_i$ by uniqueness. Hence $\delta_i$ is continuously differentiable on $E_i$. *Gluing.* At a common endpoint $e=e_{i+1}$ let $a=\delta_i(e)\in\Delta_i$ and $b=\delta_{i+1}(e)\in\Delta_{i+1}$. Because $\Delta_i$ and $\Delta_{i+1}$ overlap, $U=\Delta_i\cup\Delta_{i+1}$ is an interval, and $\partial_\delta G(\cdot,e)>0$ on all of $U$, since $e$ lies in both $E_i$ and $E_{i+1}$. So $G(\cdot,e)$ is strictly increasing on $U$, has at most one zero there, and $a=b$. The pieces therefore define one function $\delta$ on $[\varepsilon_a,\varepsilon_b]$; at each junction the implicit-function branch through $(a,e)$ coincides with $\delta_i$ on the left and $\delta_{i+1}$ on the right, so $\delta$ is continuously differentiable across junctions too. *Balance.* By check 3, $S(\delta(\varepsilon),\varepsilon)>0$, so $R(\varepsilon)$ is positive and continuous, and by Lemma 2(d) the ladder $(R(\varepsilon),\ \delta(\varepsilon)R(\varepsilon),\ \varepsilon/R(\varepsilon))$ balances exactly; conversely a balanced ladder of speed $\varepsilon\in E_i$ with $d/R\in\Delta_i$ has $G=0$, hence $\delta=\delta(\varepsilon)$, and $R=S/\varepsilon^2$. $\qquad\blacksquare$

By continuity of $R$, every radius between the values of $R$ at the two ends of the covered range is the radius of at least one ladder on the branch. Monotonicity of $R(\varepsilon)$, which would make the radius a label of the branch, is not proved here.

## What differs from the point certificates

- **Wide speed intervals.** Each piece evaluates the rows with $\varepsilon$ an interval of relative width up to order one at the smallest speeds. The kernel's direct enclosure $\sin\theta/\theta$ loses all accuracy on such intervals at small $\theta$. The new row function `row_mv` therefore encloses $p=\operatorname{sinc}\theta$ and $p'$ by the mean-value form about the midpoint, using $\operatorname{sinc}x=\int_0^1\cos(xt)\,dt$, hence $\lvert\operatorname{sinc}'x\rvert=\lvert\int_0^1t\sin(xt)\,dt\rvert\le\min(x/3,\ 1/2)$ and $\lvert\operatorname{sinc}''x\rvert=\lvert\int_0^1t^2\cos(xt)\,dt\rvert\le1/3$ (derived), and intersects the result with the kernel's direct enclosure and with $[-0.25,1]\ni\operatorname{sinc}$. Everything else in the row (root enclosure, forward differentiation, the other factors) is the kernel's.
- **Root enclosures over wide parameter boxes.** The kernel's interval Newton started from the Lemma 1 bracket stagnates when $\varepsilon$ is a wide interval (the root set itself is then an interval, and strict containment is never reached). The driver therefore starts each root from a float guess with a radius at least three times the proved radius of the root set ($\lvert\partial_\delta\tau\rvert\le k\sqrt P/L$, $\lvert\partial_\varepsilon\tau\rvert\le1/L$), inflating it fourfold up to five times if the Newton test fails; any success is a Newton certificate, and Lemma 1 makes the certified root the causal root.
- **Adaptive pieces and truncation.** Piece widths start at half the lowest speed, grow by $1.3$ after each success up to $0.004$ (and at most half the current speed), and halve after each failure; every failed attempt is kept in the receipts. The truncation was $N=2000$ for pieces ending at or below $\varepsilon=0.7$, $4000$ to $0.85$, $8000$ to $0.92$, $16000$ to $0.95$ and $40000$ above (job C: $40000$ throughout). Three supervised jobs ran: A on $[0.001,0.85]$, B from $0.85$ upward, and C from $0.955$ upward, started when A finished. B and C ran in parallel past $0.955$.
- **Overlap join (derived).** B continued past $0.955$, so the glue uses B up to its piece $[0.95457,\ 0.95606]$, which contains $0.955$, and then C. The two pieces of that pair share an interval of speeds instead of an endpoint. The gluing argument still applies: at every common speed both zeros lie in the interval $\Delta_i\cup\Delta_j$, which is connected because the $\Delta$ intervals overlap, and $\partial_\delta G>0$ holds on both boxes, so the zeros coincide on the whole common range. The glue checker verifies the start of C lies inside that piece of B and that the two $\Delta$ intervals overlap.

## Known-case controls, run before the covering

- **Self-test (`certify_untwisted_branch.py selftest`, passed at 22:33:25Z, receipt `branch_selftest_receipt.json`).**
  - S1: the one-dimensional parametric Krawczyk test on $\delta^2-2-\varepsilon$ with $\varepsilon\in[0,0.1]$ certified a box containing $\sqrt2$ and $\sqrt{2.1}$; S1b: on a box without zeros it correctly failed.
  - S2: `sinc_mv` contained the 30-digit values of $\operatorname{sinc}$ and $\operatorname{sinc}'$ at 41 sample points of each of six intervals from $[0,0.5]$ to $[100,400]$.
  - S3: `row_mv` overlapped the frozen kernel row at degenerate boxes at the three certified speeds.
  - S4: at speed intervals near $0.01$, $0.3$ and $0.87$, `row_mv` contained the kernel's point rows at five sampled speeds, for $g$, $h$ and $\partial_\delta g$.
  - S5: a piece on $[0.01384,\ 0.01385]$ certified, and its enclosure contains the PI's independent 55-digit R = 1000 reference point (independent of this code).
  - S2 and S4 are falsification tests, not proofs.
- **An earlier self-test run crashed and wrote no receipt.** It ran at 22:33:05Z, and S4 raised an uncertified root. The cause was that the kernel's Lemma-bracket Newton stagnates for wide speed intervals. The robust root start described above fixed it.
- **Glue checker known cases (run before its target).** On a synthetic two-piece receipt the checker reported glued. On copies with disjoint $\Delta$ intervals, with a gap in the speed endpoints, and, after the overlap-join extension, with an overlap join whose $\Delta$ intervals are disjoint, it reported each defect. The known-case files are in `.tmp/rotating-ladder/untwisted-certificate/`.
- **Pilot.** Three single pieces at $\varepsilon\approx0.3$, $0.85$ and $0.93$ ($N=2000$, $6000$, $16000$) certified in 10, 30 and 75 s; these fixed the schedule. An earlier unseeded pilot at $0.3$ raised an uncertified root, which is how the stagnation was found.

## The covering

Glue receipt `branch_glue_receipt.json` (measured by `branch_glue_check.py` from the stored interval strings). It reports 303 pieces glued with no problems over $[0.001,\ 0.9654875312951843]$. Every piece satisfies $\partial_\delta G(\Delta_i,E_i)>0$, $K_i\subset\operatorname{int}\Delta_i$ and $S(\Delta_i,E_i)>0$. Consecutive pieces share their speed endpoint, except the one overlap join, and their $\Delta$ intervals overlap.

| Job | Speeds covered | Pieces kept | Failed attempts (kept) | Truncation $N$ | Wall time | Stop |
| --- | --- | --- | --- | --- | --- | --- |
| A | $[0.001,\ 0.85]$ | 223 | 5 | 2000, 4000 | 3542 s | complete |
| B | $[0.85,\ 0.9609]$ (glue uses up to $0.95606$) | 69 | 27 | 8000, 16000, 40000 | 9116 s | deadline |
| C | $[0.955,\ 0.96549]$ | 16 | 8 | 40000 | 5509 s | deadline |

Every failed attempt is kept in its receipt with its tries, and each failure was followed by a halved piece. Every failure was a test failing at the attempted width: either Krawczyk containment, or, in 11 tries (1 in A, 10 in B), the positivity of $\partial_\delta G$ over a widened box.

- **Piece widths:** from $5\times10^{-4}$ up to the cap $0.004$ in A; from $2.9\times10^{-4}$ to $1.2\times10^{-3}$ in C.
- **Interval sizes along the covering:** the largest $\Delta$ radius was $0.049$ (in A); the smallest certified lower bound of $\partial_\delta G$ on a kept piece was $0.0996$ in A, $0.058$ in B and $0.073$ in C.
- **First and last pieces:**
  - First, $E=[0.001,\ 0.0015]$: $\delta\in[3.34281,\ 3.34775]$ and $R\in[84997,\ 191825]$.
  - Last, $E=[0.96511,\ 0.96549]$: $\delta\in[2.04667,\ 2.05838]$ and $R\in[0.33236,\ 0.34240]$.
- **Pieces containing the point certificates:**
  - $\varepsilon=0.0138408$: piece $[0.01293,\ 0.01693]$, $\delta\in[3.31678,\ 3.37321]$; it contains the R = 1000 enclosure and the PI's reference.
  - $\varepsilon=0.4843985$: piece $[0.48093,\ 0.48493]$, $\delta\in[2.94048,\ 3.01113]$.
  - $\varepsilon=0.8722132$: piece $[0.87072,\ 0.87241]$, $\delta\in[2.20256,\ 2.22877]$.

  These are consistency checks with the same kernel, except the PI's reference.
- **Process and compute state.** All three jobs ran under the owned-compute supervisor with a 60 s supervisor heartbeat; each also flushed its own progress file at least every 30 s. Each script stopped at its internal deadline of 01:08Z after finishing the piece in progress, and all supervisors exited with code 0. The supervisor commands were launched with the session's background facility, because a single foreground tool call cannot exceed ten minutes; each supervisor ran in its foreground form with a hard deadline (9300 s for A and B, 5700 s for C). Nothing is running.

The enclosures here are deliberately coarse: half-widths in $\delta$ up to about $0.05$. The purpose is the topological statement of one continuous branch through the whole range, not precision. Precise values at chosen speeds come from the point certificates.

## What is not shown

- Stability of any ladder on the branch.
- Monotonicity of $R(\varepsilon)$, and therefore uniqueness of the balance at a given radius: the uniqueness proved is at a given speed, within the tube $\bigcup_i\Delta_i\times E_i$.
- Other branches outside the tube; speeds outside the covered range; twisted, translating or unequal-rail ladders.
- The new code (`row_mv`, the mean-value sinc enclosure, the robust root start, the one-dimensional test and the glue checker) has been checked only by its author and by the self-tests below.

## Falsifiers

- An independently computed balance at some speed in the covered range whose spacing ratio lies outside that piece's enclosure $K_i\cap\Delta_i$ by more than its own error, or a second zero of $G(\cdot,\varepsilon)$ inside some $\Delta_i$.
- A value of $\operatorname{sinc}$ or $\operatorname{sinc}'$ outside the enclosure returned by `sinc_mv` for an interval containing its argument.
- A pair of consecutive pieces in the receipts whose $\Delta$ intervals are disjoint or whose speed intervals do not share an endpoint, contrary to the glue receipt.

## Reproduction

These files are in [`../evidence/rotating-ladder-claude-2026-10-20/untwisted-certificate/`](../evidence/rotating-ladder-claude-2026-10-20/untwisted-certificate/), run with the shared virtual environment; the kernel is imported unchanged.

- `certify_untwisted_branch.py selftest` writes `branch_selftest_receipt.json` (7.6 s).
- `certify_untwisted_branch.py cover 0.001 0.85 "2000:0.7,4000:0.85" 0.5 branch_cover_A_receipt.json 1792544880` (A).
- `certify_untwisted_branch.py cover 0.85 0.99 "8000:0.92,16000:0.95,40000:0.97,80000:1" 0.0024 branch_cover_B_receipt.json 1792544880` (B).
- `certify_untwisted_branch.py cover 0.955 0.99 "40000:0.97,80000:1" 0.001 branch_cover_C_receipt.json 1792544880` (C). The last argument is the stop time 2026-10-21T01:08:00Z as a Unix epoch.
- `branch_glue_check.py branch_cover_A_receipt.json branch_cover_B_receipt.json branch_cover_C_receipt.json branch_glue_receipt.json`.

Supervisor logs and progress files are in `.local-data/master-equation-closure/rotating-ladder/claude-2026-10-20/untwisted-certificate/`. Float widths and times in the JSON are approximate diagnostics; the certifying comparisons are made in interval arithmetic.


## Independent review disposition and corrections

Codex reviewed this certificate as frozen (note SHA-256 `231300da31f3c973f1cd85256adb0d2be4a8664a5d9c02f79028bb05a0207ad9`) in the [shared review record](../../../../op/agent-chats/2026-10-20-rotating-ladder-six-hour/chat.md), entry 2026-10-21T01:29:21Z and **accepted the single $C^1$ branch on the exact decimal interval $[0.001,\,0.9654875312951843]$**, with uniqueness within the certified spacing tube at each speed, conditional on the interval library and the reviewed kernel and tail premises. It accepted the one-dimensional parametric test, the gluing argument (at any shared speed the overlapping spacing intervals form one interval on which $G$ is strictly increasing, so the zeros coincide; this holds at every speed of the overlap between runs B and C), the $C^1$ argument, the sinc bounds and mean-value enclosure (including an elementary proof of the clip $[-1/4,1]$), and `row_mv`; it audited all 303 kept pieces (smallest derivative lower bound above $0.05828$, smallest strict-containment margin above $3.88\times10^{-5}$) and reran the first, widest and last pieces. These statements supersede the body where they differ:

1. **Endpoints.** The driver's float endpoints are binary values; the original lower one lies slightly above exact $0.001$. Codex reran the first and last pieces with each endpoint widened by one float, on $[0.0009999999999999998,\,0.0015000000000000002]$ and $[0.9651056365465244,\,0.9654875312951844]$; both certify, and with them the 303-piece covering proves the literal interval above (reviewer receipts are the completion). Coverage is to $\varepsilon=0.9654875312951843$, approximately $0.9655$; the exact number $0.9655$ is outside the certified range.
2. **Radii.** Every radius between the two endpoint radii is realised, which gives the explicit interval $[0.3424,\,84997]$; it does not follow that every radius in the global enclosure $[0.3258,191825]$ is realised. No monotonicity or uniqueness at fixed radius is claimed.
3. **Wording.** The guesses for the robust root start are inflated on failure and every accepted row passes the parametric Newton test; the sentence requiring every starting radius to be at least three times a proved root-set radius is withdrawn (explicit caps limit the radii). A second balance outside the spacing tube is not a falsifier of the stated local uniqueness. The certified $R=1000$ box lies inside the corresponding piece and tube, so that balance is on this branch; nothing is claimed below $\varepsilon=0.001$.
