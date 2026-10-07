# Mixed-speed rigid balances: interval enclosures with a complete causal-root census (2026-10-05)

Status: analyst record, built independently from the problem statement alone in a 45-minute time box. No other balance analysis and no earlier data directory was read. Units throughout: wake speed $c_f=1$, coupling $K=1$. Grades used: **derived** (a proof in this record), **computer-assisted derived** (an interval-arithmetic certificate; it relies on the correctness of mpmath's outward-rounded interval arithmetic `mpmath.iv` and of the script), **measured** (floating-point computation, no error bound).

## Result

**Certified (computer-assisted derived).** For each of three planar arrangements that rotate rigidly about the origin and contain at least one member moving faster than wake speed, there is a parameter box in which exactly one parameter point satisfies the balance equations of the full delayed acceleration law, with every positive-delay causal root of every ordered pair and of every member's own past path counted and enclosed. The three arrangements are T1 (three members, no symmetry, one member above wake speed), T2 (five members: one at rest at the centre and two antipodal like pairs, the outer pair above wake speed) and T3 (four members, no symmetry, two members above wake speed, one ordered pair with three causal roots). All items of the task are finished; nothing is left open inside the stated scope.

Notation for the tables: member $j$ has polarity $s_j=\pm1$, radius $R_j$, angle $\phi_j$ at time zero (with $\phi_1=0$ fixing the orientation), and speed $v_j=wR_j$, where $w$ is the common angular rate. Every value printed with 36 significant digits below is the centre of a decimal interval of half-width $10^{-32}$ that was checked, in interval arithmetic, to contain the certified enclosure; the enclosures themselves are narrower than $2\times10^{-58}$ and are in the raw output.

**T1, three members, polarities $(+1,+1,-1)$.**

| quantity | certified value ($\pm10^{-32}$) |
| --- | --- |
| $R_1$ | 1.70495452579669319499832424479409663 |
| $R_2$ | 0.850818533657743382617693269798519581 |
| $R_3$ | 0.830449243449798906121298544226255137 |
| $\phi_2$ (rad) | 4.64344661463515036766927339495764535 |
| $\phi_3$ (rad) | 0.674039971577187780471414531459502952 |
| $w$ | 0.788632850389504792047616474464619496 |
| $v_1$ | 1.34458314746353263296821773524263949 |
| $v_2$ | 0.670983445362724984425049218204845396 |
| $v_3$ | 0.654919553965622703137336467199496479 |

**T2, five members: centre member $c$ ($+1$, at rest), pair $a_1,a_2$ ($-1$, radius $R_a$, angles $0$ and $\pi$), pair $b_1,b_2$ ($+1$, radius $R_b$, angles $\alpha$ and $\alpha+\pi$).**

| quantity | certified value ($\pm10^{-32}$) |
| --- | --- |
| $R_a$ | 1.45444081574846103910182028433123001 |
| $R_b$ | 2.44889104406982492787531308374102244 |
| $\alpha$ (rad) | 2.56949787675159480029175321071135639 |
| $w$ | 0.574296407385605862625529213694027351 |
| $v_a$ | 0.835280135239331095930125610447051452 |
| $v_b$ | 1.40638932868808585672230416671435050 |

Here $\alpha/\pi=0.817896\ldots$, matching the supplied $0.81790$.

**T3, four members, polarities $(+1,-1,+1,-1)$ in order of increasing speed.** The starting point was found here by a float multi-start search (measured); see "Limits and falsifiers" for what that does and does not establish about its identity with the arrangement named in the task.

| quantity | certified value ($\pm10^{-32}$) |
| --- | --- |
| $R_1$ | 0.509817371507826540721209239162223442 |
| $R_2$ | 0.803064996427121705614947868925278084 |
| $R_3$ | 1.60364893198056343603827014715451544 |
| $R_4$ | 2.14832439629563376799405961614071008 |
| $\phi_2$ (rad) | 2.39505258641349150171421653302631068 |
| $\phi_3$ (rad) | 1.68261919221403711989602400806641711 |
| $\phi_4$ (rad) | 0.997535801459106812550084591339741729 |
| $w$ | 0.903198070161186255661006742590089940 |
| $v_1$ | 0.460466066080517474658455576222175498 |
| $v_2$ | 0.725326754986976259993036583897623994 |
| $v_3$ | 1.44841262058089233968305355288006409 |
| $v_4$ | 1.94036244881441193406314840789992988 |

**Root census per member (computer-assisted derived on the whole certified box, with the derived shortcuts stated in "Root census").** Each entry is the number of positive-delay causal roots; "own" is the member's own past path. The census was run for every receiver that carries a balance equation; in T2 the partners $a_2$, $b_2$ follow from the half-turn symmetry and the centre member is treated by proof.

| target | receiver | roots from each source | own-path roots | rows received |
| --- | --- | --- | --- | --- |
| T1 | member 1 ($+$, $v=1.3446$) | member 2: 1; member 3: 1 | 1 | 3 |
| T1 | member 2 ($+$, $v=0.6710$) | member 1: 1; member 3: 1 | 0 | 2 |
| T1 | member 3 ($-$, $v=0.6549$) | member 1: 1; member 2: 1 | 0 | 2 |
| T2 | $a_1$ ($-$, $v=0.8353$) | $c$: 1; $a_2$: 1; $b_1$: 1; $b_2$: 1 | 0 | 4 |
| T2 | $b_1$ ($+$, $v=1.4064$) | $c$: 1; $a_1$: 1; $a_2$: 1; $b_2$: 1 | 1 | 5 |
| T2 | $c$ ($+$, at rest) | each of $a_1,a_2,b_1,b_2$: 1 (derived) | 0 (derived) | 4, summing to zero |
| T3 | member 1 ($+$, $v=0.4605$) | member 2: 1; member 3: 1; member 4: 1 | 0 | 3 |
| T3 | member 2 ($-$, $v=0.7253$) | member 1: 1; member 3: 1; member 4: 1 | 0 | 3 |
| T3 | member 3 ($+$, $v=1.4484$) | member 1: 1; member 2: 1; member 4: 1 | 1 | 4 |
| T3 | member 4 ($-$, $v=1.9404$) | member 1: 1; member 2: 1; member 3: **3** | 1 | 6 |

**Size of the certified boxes.** Each certificate was run on a tight box (parameter half-width $10^{-40}$, delay half-width $10^{-37}$), which gives the enclosures above, and on successively wider boxes centred on the same point, which give the region of uniqueness. The widest box on which both the existence-and-uniqueness test and the complete census passed is: T1, every parameter within $10^{-6}$ of the tabulated value; T2, within $3\times10^{-6}$; T3, within $10^{-7}$. The next wider box tried failed the contraction test in each case (T1 at $3\times10^{-6}$, T2 at $10^{-5}$, T3 at $10^{-6}$); that failure means only that this test did not decide, not that a second balance exists there.

## Rows and root conditions

**The law.** A receiver of polarity $s_i$ at position $x$ at time $T$ receives from a source of polarity $s_j$ on path $X_j$ one acceleration row for every emission time $T-\tau$ with $\tau>0$ and $\tau=\lvert x-X_j(T-\tau)\rvert$. The number $\tau$ is the causal delay of that root. The row is $a=s_is_j\,r/(\tau^3\lvert D\rvert)$ with $r=x-X_j(T-\tau)$, $n=r/\tau$ and transmitter factor $D=1-n\cdot V_j(T-\tau)$, where $V_j$ is the source velocity. Like polarity repels. The receiver's acceleration is the sum of the rows from all other members over all their causal roots, plus the rows from causal roots on its own past path when such roots exist.

**Rigid rotation (derived).** Member $j$ is at $X_j(t)=R_j(\cos(\phi_j+wt),\sin(\phi_j+wt))$. Rotating the whole history by a fixed angle maps solutions of the root condition to solutions and rotates every row, so it is enough to impose the balance at $T=0$. For receiver $i$ and source $j$ write $\Delta_{ij}=\phi_i-\phi_j$ and the delay angle $\psi=\Delta_{ij}+w\tau$. Then the squared separation is $\lvert r\rvert^2=R_i^2+R_j^2-2R_iR_j\cos\psi=(R_i-R_j)^2+4R_iR_j\sin^2(\psi/2)$, and the root function is

$$
g_{ij}(\tau)=\tau-\sqrt{(R_i-R_j)^2+4R_iR_j\sin^2\!\big((\Delta_{ij}+w\tau)/2\big)} .
$$

In the frame where the receiver sits on the positive first axis, $r=(R_i-R_j\cos\psi,\;R_j\sin\psi)$ and $r\cdot V_j=wR_iR_j\sin\psi$, so the components of a row along the outward radius and along the direction of motion of the receiver are

$$
a_{\mathrm{rad}}=s_is_j\,\frac{R_i-R_j\cos\psi}{\tau^3\lvert D\rvert},\qquad a_{\mathrm{tan}}=s_is_j\,\frac{R_j\sin\psi}{\tau^3\lvert D\rvert},\qquad D=1-\frac{wR_iR_j\sin\psi}{\tau}.
$$

Differentiating $g_{ij}$ gives $g_{ij}'(\tau)=1-wR_iR_j\sin\psi/\lvert r\rvert$, which equals $D$ at a root. Hence a root is simple exactly when its transmitter factor is non-zero (derived). For the own path set $R_j=R_i=R$, $\Delta=0$, $s_is_j=+1$: $g_{\mathrm{own}}(\tau)=\tau-2R\lvert\sin(w\tau/2)\rvert$.

**Balance equations.** A member on a circle of radius $R_i$ at angular rate $w$ has acceleration $-w^2R_i$ along the outward radius and zero along its direction of motion. The balance equations for member $i$ are therefore $\sum a_{\mathrm{tan}}=0$ and $\sum a_{\mathrm{rad}}+w^2R_i=0$, the sums running over all rows received. A source at rest at the centre contributes the exact inverse-square row $a_{\mathrm{rad}}=s_is_j/R_i^2$, $a_{\mathrm{tan}}=0$ (its root function is $\tau-R_i$, one root, $D=1$). T1 has unknowns $(R_1,R_2,R_3,\phi_2,\phi_3,w)$ and six equations; T2 has unknowns $(R_a,R_b,\alpha,w)$ and four equations (members $a_1$ and $b_1$); T3 has unknowns $(R_1,\dots,R_4,\phi_2,\phi_3,\phi_4,w)$ and eight equations.

**T2 symmetry and the centre member (derived).** The T2 arrangement, with its whole history, is unchanged by a half turn about the origin (it exchanges $a_1\leftrightarrow a_2$ and $b_1\leftrightarrow b_2$ and fixes $c$). So the equations of $a_2$ and $b_2$ are those of $a_1$ and $b_1$, and their root census is the same. The total acceleration of $c$ is a vector that the half turn maps to itself, so it is zero: explicitly, each orbiting member is always at distance $R_j$ from the centre, giving one root $\tau=R_j$ with $D=1$ (the line of sight is radial and the source velocity tangential), and the rows of the two members of a pair are equal and opposite. A member at rest has no own-path root, since that would need $\tau=\lvert x-x\rvert=0$.

## Root census

The census is a statement about every parameter point of the box at once: all quantities ($R$, $\phi$, $w$) enter as intervals, and the delay range is cut into subintervals.

**Admissible range (derived).** Any root satisfies $\tau=\lvert r\rvert\le R_i+R_j$, so all positive-delay roots lie in $0<\tau\le R_i+R_j$. The search runs over $[0,R_i+R_j+0.1]$ so that no root can sit on the edge of the searched range.

**Subdivision rule (computer-assisted derived).** A subinterval $I$ is accepted as root-free when the interval value $g(I)$ excludes zero. Otherwise, if the interval value $g'(I)$ excludes zero, $g$ is strictly monotone on $I$ for every parameter point; then $I$ is accepted when $g$ has a definite sign at both ends for the whole parameter box, as holding exactly one simple root if the signs differ and none if they agree. In every other case $I$ is split (at the fraction 0.4871 of its width) and both parts are processed; the routine stops with an error rather than accept an undecided piece. The closed subintervals cover the whole range, so the list of accepted root-holding subintervals is a complete census. For ordered pairs of different members $\lvert r\rvert>0$ on the whole range (different radii in T1 and T3; in T2 the equal-radius antipodal pair has $\lvert r\rvert=2R\lvert\cos(w\tau/2)\rvert>0$ because $w\tau/2<\pi/2$ on the range), so $g$ is differentiable there and $g(0)=-\lvert r(0)\rvert<0$ excludes a root at vanishing delay.

**Own path.** For a member with $v=wR<1$ (certified as an interval bound), $2R\lvert\sin(w\tau/2)\rvert\le v\tau<\tau$ for all $\tau>0$: no own-path root (derived, with the speed bound computer-assisted). For a member with $v>1$ the script first checks $w(2R+0.1)/2<\pi$, so that $\sin(w\tau/2)>0$ and $g_{\mathrm{own}}=\tau-2R\sin(w\tau/2)$ on the range. Delays in $(0,0.25]$ are excluded by $\sin u\ge u(1-u^2/6)$, which gives $g_{\mathrm{own}}/\tau\le1-v\big(1-(0.25\,w)^2/24\big)<0$ (bounds $-0.342$ for T1, $-0.405$ for T2, $-0.445$ and $-0.936$ for T3). The remainder $[0.25,2R+0.1]$ is subdivided as above. An independent derived count agrees: with $u=w\tau/2$ the condition is $\sin u/u=1/v$, and $\sin u/u$ decreases strictly from 1 to 0 on $(0,\pi)$, so there is exactly one own-path root whenever $1<v<\pi$.

**Sources below wake speed.** For such a source $\lvert n\cdot V_j\rvert\le v_j<1$ gives $g'>0$ everywhere and hence exactly one root (derived). The script does not rely on this; it runs the same subdivision for every pair.

**Outcome.** Certified subintervals needed per box: 12 (T1), 17 (T2), 38 (T3); most pairs are decided on a single interval because $g'$ is of one sign on the whole range. The only pair with more than one root is T3 receiver 4 from source 3 (source speed 1.448): three roots, isolated in subintervals that are approximately $[0,0.914]$, $[1.876,2.345]$ and $[2.839,3.852]$, with $g'$ respectively positive, negative and positive. Causal delays and transmitter factors at the certified solution (display rounding to 12 digits; full enclosures in the output):

| target | receiver $\leftarrow$ source | delay $\tau$ | $D$ |
| --- | --- | --- | --- |
| T1 | 1 $\leftarrow$ own | 3.279231634888 | 0.631336362972 |
| T1 | 1 $\leftarrow$ 2 | 2.494648082725 | 1.205845804756 |
| T1 | 1 $\leftarrow$ 3 | 0.874706902020 | 0.979853508068 |
| T1 | 2 $\leftarrow$ 1 | 1.189496525156 | 1.620797436064 |
| T1 | 2 $\leftarrow$ 3 | 1.108461311869 | 1.498375287732 |
| T1 | 3 $\leftarrow$ 1 | 2.457817480591 | 0.770630883401 |
| T1 | 3 $\leftarrow$ 2 | 1.636470086334 | 1.152005769088 |
| T2 | $a_1\leftarrow c$ | $R_a$ (exact) | 1 (exact) |
| T2 | $a_1\leftarrow a_2$ | 2.298153326440 | 1.512065332741 |
| T2 | $a_1\leftarrow b_1$ | 2.366527224620 | 1.808825548430 |
| T2 | $a_1\leftarrow b_2$ | 3.843717293856 | 0.811502304542 |
| T2 | $b_1\leftarrow c$ | $R_b$ (exact) | 1 (exact) |
| T2 | $b_1\leftarrow a_1$ | 3.201221217588 | 1.609594367693 |
| T2 | $b_1\leftarrow a_2$ | 0.994451964361 | 1.002025216995 |
| T2 | $b_1\leftarrow$ own | 4.809999908760 | 0.734924682178 |
| T2 | $b_1\leftarrow b_2$ | 3.091450972609 | 2.090830646053 |
| T3 | 1 $\leftarrow$ 2 | 0.940367657230 | 1.393109935427 |
| T3 | 1 $\leftarrow$ 3 | 1.212644436606 | 1.337453209557 |
| T3 | 1 $\leftarrow$ 4 | 1.743407207851 | 0.690419284955 |
| T3 | 2 $\leftarrow$ 1 | 1.286128063571 | 1.115947352114 |
| T3 | 2 $\leftarrow$ 3 | 2.386749123100 | 0.868389240312 |
| T3 | 2 $\leftarrow$ 4 | 2.782147341039 | 1.389393236687 |
| T3 | 3 $\leftarrow$ 1 | 2.079672913833 | 1.144582777006 |
| T3 | 3 $\leftarrow$ 2 | 0.800676638826 | 0.984403465069 |
| T3 | 3 $\leftarrow$ own | 3.177813236341 | 0.804054606498 |
| T3 | 3 $\leftarrow$ 4 | 3.516793806050 | 1.583325368417 |
| T3 | 4 $\leftarrow$ 1 | 2.645750345451 | 1.090900660477 |
| T3 | 4 $\leftarrow$ 2 | 1.362891128110 | 1.189549762717 |
| T3 | 4 $\leftarrow$ 3, first root | 0.603440843537 | 1.719848057553 |
| T3 | 4 $\leftarrow$ 3, second root | 1.876703144319 | $-0.404043188421$ |
| T3 | 4 $\leftarrow$ 3, third root | 3.602270122257 | 0.531601597707 |
| T3 | 4 $\leftarrow$ own | 4.118386669379 | 1.553108736115 |

## Certificate

**System.** The unknown vector $x$ collects the parameters and one delay per row found by a preliminary float scan (T1: 6 parameters and 7 delays; T2: 4 and 7; T3: 8 and 16). The map $F(x)$ consists of the balance equations, written with $\lvert D\rvert$ replaced by $\sigma D$ for a fixed sign $\sigma=\pm1$ per row, followed by one delay equation $\tau^2-(R_i^2+R_j^2-2R_iR_j\cos\psi)=0$ per row, which for $\tau>0$ is the same condition as $g=0$. Derivatives are computed by forward-mode automatic differentiation, in multiprecision for the Newton refinement and in interval arithmetic for the certificate.

**Newton refinement (measured).** At 60 significant digits, Newton iteration from the supplied start converged quadratically (five steps for T1 and T2 from the five- and ten-digit starts, three for T3 from the float search), reaching residuals below $2\times10^{-59}$. The condition numbers of the Jacobian in the maximum-row-sum norm are about 467 (T1), 2641 (T2) and 1254 (T3).

**Krawczyk test (computer-assisted derived).** With centre $x_0$ (the Newton result), box $X$ around it, $Y$ an approximate inverse of the Jacobian at $x_0$ and $J(X)$ the interval Jacobian over $X$, the script evaluates $K(X)=x_0-YF(x_0)+(I-YJ(X))(X-x_0)$ and checks that $K(X)$ lies in the interior of $X$. By Krawczyk's theorem this proves that $F$ has exactly one zero in $X$ and that the zero lies in $K(X)$. The test passed on the tight box for all three targets ($K$ narrower than $10^{-58}$) and on the wide boxes listed under "Result".

**Joining the certificate to the census (derived, with computer-assisted inputs).** On each box the script also checks, in interval arithmetic: (i) every transmitter factor keeps the sign $\sigma$ used in $F$, so $\sigma D=\lvert D\rvert$ on the box, with $\lvert D\rvert\ge0.6312$ (T1), $0.7348$ (T2), $0.4040$ (T3) on the widest box; (ii) the census over the parameter part of the box finds exactly the rows used in $F$, no more and no fewer; (iii) each delay component of the box lies inside the isolating subinterval of its root, and $g$ has opposite definite signs at the two ends of that component for the whole parameter box, so the root stays inside the delay component for every parameter point. Consequently any parameter point of the box that is a balance of the full law, together with its complete set of causal delays, is a zero of $F$ in $X$, and conversely the zero of $F$ in $X$ is a balance of the full law. The balance in the parameter box therefore exists and is unique.

**Independent re-evaluation (computer-assisted derived).** On the tight enclosure every row was recomputed with a separate interval evaluator that works directly from Cartesian positions and velocities, with no use of the rotating-frame formulas. For every member the sum of rows plus $w^2x$ is an interval that contains zero in both components, of magnitude below $1.1\times10^{-58}$ (T1), $1.4\times10^{-58}$ (T2) and $7.3\times10^{-58}$ (T3).

## Controls

All controls ran before the targets, with the same census routine and the Cartesian interval row evaluator, at 60 digits; all passed.

1. Source at rest: census finds one root on one subinterval; the delay enclosure contains the exact distance $1.36014705087\ldots$; the row enclosure contains the exact inverse-square row, with width $6\times10^{-61}$; $D=1$ exactly.
2. Uniformly moving source at speed 0.632 (below wake speed): one root on $(0,\lvert d\rvert/(1-v)+0.1]$; the delay enclosure contains the positive solution $3.27485177344\ldots$ of the quadratic $(1-v^2)\tau^2-2(d\cdot V)\tau-\lvert d\rvert^2=0$, where $d$ is the present separation and $V$ the source velocity; the row and $D$ enclosures contain the closed forms $(d+V\tau)/(\tau^2S)$ and $S/\tau$, with $S=\sqrt{(d\cdot V)^2+(1-v^2)\lvert d\rvert^2}$.
3. Uniformly moving source at speed 2 (above wake speed): a receiver inside the wake cone gets exactly two roots, whose enclosures contain the two quadratic solutions $1.04257\ldots$ and $2.95742\ldots$, with $D$ certified positive at the first and negative at the second; two receivers outside the cone get exactly zero roots.
4. Own path on a circle of radius 1 at speed $\pi/2$: exactly one own-path root; the delay enclosure contains 2 (width $1.6\times10^{-61}$) and the delay angle enclosure contains $\pi$; radial row contains $1/4$, tangential row contains 0, $D$ contains 1; the Cartesian evaluator returns the same row.
5. Circular source at speed 7.5 seen from a receiver on another circle: the rotating-form census and the Cartesian census both find three roots, with overlapping enclosures that agree with a float scan. Control 5 and the float scan share the same root function, so this is a consistency check of two implementations, not independent evidence.

## Limits and falsifiers

- Nothing is claimed about stability, about whether these balances persist under perturbation of the histories, or about how such a state could be reached; only the existence of a rigidly rotating solution of the stated law with its complete root set.
- Uniqueness holds only inside the stated parameter boxes. Other balances with the same polarities may exist elsewhere, including at nearby speeds.
- The certificates rely on mpmath's interval arithmetic (`mpmath.iv`, outward rounding, including its `sin`, `cos`, `sqrt` and $\pi$) and on the script; neither was independently verified here beyond the controls. All three targets share one code path, so their agreement with each other is not independent evidence. An independent check would be a certificate from a different interval library.
- The law assumed is exactly the one stated above: every positive-delay root contributes, own-path rows included, with weight $1/\lvert D\rvert$ and no exclusion or regularisation. A different treatment of own-path rows or of roots with $D<0$ gives different balances; in T3 one row has $D<0$.
- T3 identity (measured). The task named polarities $(+1,+1,-1,-1)$ and four speeds without an arrangement. The search here fixed the radii from the four speeds and varied $w$ and three angles. With polarities assigned to increasing speed as $(+,+,-,-)$ it found nothing in 1514 starts, and with $(+,-,-,+)$ nothing in 192 starts; with $(+,-,+,-)$ it found the balance above on the 49th start. Its certified speeds round to the four quoted values, and its polarity multiset matches. It is not certified to be the same arrangement the task had in mind, and the failed searches are not proofs of absence.
- Falsifiers. The result is wrong if any of the following is exhibited: a positive-delay root of some $g_{ij}$ or $g_{\mathrm{own}}$ outside the tabulated isolating intervals for a parameter point of the box; a parameter point of the box, other than the enclosed one, satisfying the balance equations; or an evaluation of the rows at the tabulated values, by an independent correctly rounded method, whose residual exceeds the stated bound.

## Reproduction

Directory: `.local-data/master-equation-closure/geometry-session-20261005/mixed-speed-enclosures/`. Interpreter: `/Users/markmorris/vibe/.venv/bin/python` (mpmath, numpy, scipy). Each certificate run takes under three seconds.

- `enclose.py controls` writes `output_controls.txt`.
- `enclose.py T1`, `enclose.py T2`, `enclose.py T3` write `output_T1.txt`, `output_T2.txt`, `output_T3.txt` (Newton history, 45-digit solution, and for each box the contraction test, the transmitter-factor bounds, the census per ordered pair with isolating intervals, the decimal enclosures and the Cartesian re-evaluation). `run_T*.log` are copies of the same output.
- `t3_search.py <seed> <seconds> <polarity string>` is the float search; `t3_search_*.log` are its logs and `t3_start_pmpm.json` is the start used by `enclose.py T3`. The two logs `t3_search_seed1.log` and `t3_search_seed2.log` were produced with a smaller iteration cap (60) and a stricter candidate threshold ($2\times10^{-3}$) than the later runs (120 and $2\times10^{-2}$), which is the version of the script on disk.
