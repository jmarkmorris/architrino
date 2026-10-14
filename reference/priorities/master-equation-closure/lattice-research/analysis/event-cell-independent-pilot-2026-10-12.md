# Independent event-cell pilot: cell 30 of the later supplied two-target lattice comparison (2026-10-12)

This report gives separately derived, complete-cell enclosures of the three quantities in the propagation inequality $\lvert e''\rvert\le\lambda\lvert e\rvert+q+\rho$ for one load-bearing cell of the frozen supplied-pulse lattice comparison: zero-based cell 30, $[175/32,\,351/64]$, the last cell the stopped proof uses. The Master Equation is unchanged, with numerical $c_f=1$ and $g=16$. Every one of the 1502 receivers, all 149,046 generated source relations of the actual and trial union, the supplied pulse corrections of both centres, and the infinite stationary complement with its tail are included.

**Outcome: a candidate enclosure result for the pilot cell, pending the coordinator's review, with one sufficiency point open (status corrected after review; Section 10 governs where it differs).** For every receiver, the new Jacobian coefficient $\lambda$ and the new source-error term $q$ are at or below the frozen values (largest $176.98$ against $178.80$, and $0.17672$ against $0.17726$). The new defect $\rho$ has a smaller maximum ($0.2335$ against $0.4558$) but is larger than the frozen value at 982 of the 1502 receivers, by at most $0.0027$, because it is obtained by a different and, for small defects, coarser method. With the frozen incoming error majorants at the start of the cell, the tube closes for all receivers with the new values, and the outgoing position majorant exceeds the frozen one at 954 receivers by at most $2.4\times10^{-7}$. So the new bounds do not dominate the frozen ones receiver by receiver, and whether they suffice for the existing propagation argument can only be settled by propagating them through all 31 cells and re-extracting the event margins. That is the later stage and was not started. The result is independent in its arithmetic and formulas and shares its inputs, as listed in Section 2.

## 1. Object and boundary

The object is the frozen [later event comparison](smooth-two-particle-next-event-continuation.md): the infinite alternating unit cubic lattice, coupling $g=16$, numerical $c_f=1$, the supplied negative-time pulses, the unchanged Master Equation, and the stationary grouping of the unchanged complement. Its 1502 receiver curves on $[5,11/2]$ and its 1350 incoming source histories on $[0,5]$ are stored as exact dyadic node values of position, velocity and acceleration on a grid of step $1/1024$. They define piecewise quintic Hermite curves. Nothing here evolves a history, changes a pulse, replaces the infinite population, or supplies a rule after an event.

**The auxiliary equation.** For receiver $i$ with displacement $x$ from its anchor,

$$
F_i(t,x)=16\Big[S_0(x)+\sum_{j}\sigma_{ij}\,C_{ij}(t,x)\Big],\qquad
C=\frac{R}{r^3D}-\frac{R_0}{r_0^3},
$$

where $R_0=i-j+x$ is the vector from the source's anchor, $U$, $v$ are the source's displacement and velocity at the emission time $s$ with $s+r=t$, $R=R_0-U$, $r=\lvert R\rvert$, $n=R/r$, $D=1-n\cdot v$, $\sigma_{ij}=\pm1$ is the product of the two polarities, and $S_0$ is the field of the whole lattice at rest. The sum runs over the 149,046 generated receiver-source relations of the audited actual and trial union and over the supplied pulses of the two centres. Positive own-history roots are left out by the definition of this comparison. It is the Master Equation only before the first global speed-one event, when no such root exists; the frozen analyses place that event in $(87/16,351/64]$. Cell 30 is $[175/32,351/64]$, so it reaches the upper end of that bracket: the enclosures below are statements about the auxiliary comparison on the whole cell, and they bear on the Master Equation only up to the event. I checked the cell's identity against both frozen tables before any target arithmetic.

The three quantities, for the comparison curve $\widehat y_i$ and the error $e_i=y_i-\widehat y_i$ in $\lvert e_i''\rvert\le\lambda_i\lvert e_i\rvert+q_i+\rho_i$:

- $\rho_i$ bounds $\lvert\widehat y_i''-F_i(t,\widehat y_i;\text{comparison sources})\rvert$ on the cell;
- $\lambda_i$ bounds the operator norm of $\partial F_i/\partial x$ on the cell, for every $x$ within the tube radius of the comparison curve and every source history within the accepted error of its comparison history;
- $q_i$ bounds $\lvert F_i(t,x;\text{actual sources})-F_i(t,x;\text{comparison sources})\rvert$ on the cell.

## 2. What is shared and what is new

**New, written for this task:** the interval arithmetic; rational conversion; Hermite evaluation; the pulse; the causal-root contraction; the row and its Jacobian in cancellation-preserving form; the stationary polynomial's gradient and Hessian from its coefficients; the two tail bounds; the source-sensitivity coefficients; the rigorous grouped sums; the majorant step; and a different method for $\rho$ (Section 3.6). No frozen residual, Jacobian, prefix or propagation routine and no existing interval library is imported.

**Shared inputs, which cap the independence of the result.** Each is pinned by hash in the output.

1. The raw receiver and source node archives and the census edge list (the comparison itself).
2. The stationary coefficient intervals for degrees 6 to 14 over the cube of radius 24, and the accepted interval $14.3016\le a\le14.3271$ for the full cubic coefficient.
3. The accepted inherited source error table (position, velocity, acceleration, at multiples of $1/64$).
4. The subject's receiver error majorants at the start of the cell, used as the incoming state of the tube.
5. Two analytic facts about solid harmonics, adopted and only spot-checked in the first version of this report, and since proved in the coordinator's review (Section 10.1): the degree-$l$ axisymmetric solid harmonic $\lvert y\rvert^lP_l$ has gradient norm at most $l\lvert y\rvert^{l-1}$ and Hessian norm at most $l(l-1)\lvert y\rvert^{l-2}$.
6. The vanishing of the constant, linear and odd parts of the stationary field by lattice symmetry and grouping, and the supplied pulse's formula, which is part of the preparation.

The subject's own $\rho$, $\lambda$ and $q$ are read only by a separate comparison step after the new values exist.

## 3. Derivations

### 3.1 Interval arithmetic

Every binary64 addition, subtraction, multiplication, division and square root is correctly rounded, so widening each computed endpoint by one unit in the last place outward encloses the exact real result. Squares are clipped at zero, and a sum of squares is clipped at zero before a square root, because the exact value is nonnegative. A rational constant is enclosed by its two neighbouring binary64 numbers, found by exact comparison. Sums over a receiver's rows are formed by sequential floating addition of the lower and of the upper endpoints, then widened by $m\,2^{-52}$ times the sum of magnitudes, with $m$ the largest number of rows of any receiver; this dominates the standard bound $\gamma_{m-1}\sum\lvert x_k\rvert$ for sequential summation.

### 3.2 Hermite curves

On a step of length $h$ with node data $(y_0,v_0,a_0)$ and $(y_1,v_1,a_1)$ and $u\in[0,1]$, the quintic $\sum_{k=0}^5c_ku^k$ has $c_0=y_0$, $c_1=hv_0$, $c_2=h^2a_0/2$. The three end conditions at $u=1$ are $c_3+c_4+c_5=d$, $3c_3+4c_4+5c_5=e$ and $6c_3+12c_4+20c_5=f$, with $d=y_1-y_0-hv_0-h^2a_0/2$, $e=h(v_1-v_0)-h^2a_0$, $f=h^2(a_1-a_0)$. Solving, $c_3=10d-4e+f/2$, $c_4=-15d+7e-f$, $c_5=6d-3e+f/2$. Position, velocity and acceleration are continuous across nodes; the third derivative may jump. A query over a time interval is evaluated on every step that can intersect it, taking one extra step on each side of the computed range and clipping $u$ to $[0,1]$, and the hull is taken. Generated source histories are exactly zero at and before time zero; a query that crosses zero includes zero. A query beyond time five, or before the receiver start, is refused. This report's $\rho$ uses no third derivative, so the jerk jump does not enter.

### 3.3 The causal root, and why it is complete

Fix a receiver position and time and one source. With the source's speed at most $w<1$ on its whole history, $g(s)=s+\lvert R_0-U(s)\rvert-t$ has slope at least $1-w>0$, so it has at most one zero. Since $\bigl\lvert\lvert R_0-U\rvert-\lvert R_0\rvert\bigr\rvert\le\lvert U\rvert\le b$, every zero lies in $t-\lvert R_0\rvert+[-b,b]$. For a box of receiver positions and an interval of times, the same holds for the interval hull. If $\mathcal S$ contains every zero, then so does $\mathcal S\cap\bigl(t-\lvert R_0-U(\mathcal S)\rvert\bigr)$, because $U(s)\in U(\mathcal S)$. The contraction is iterated four times; an empty intersection is refused. Existence of a zero follows from $g(-\infty)<0<g(t)$ for separated members. So one root per source is a derived statement, given the speed bound; the speed and displacement bounds of the comparison sources are computed here from every Hermite step (largest speed $0.1605$, largest displacement $0.0594$), and for the actual sources the accepted error bounds are added.

A centre's history is the supplied pulse on $[-11/8,-9/8]$, zero until its generated motion begins after time zero, then its generated history. It has one root. Evaluating a pulse row with the pulse alone and a generated row with the generated history alone and adding them is exact: whichever part does not contain the root sees an unchanged source and contributes exactly zero.

### 3.4 The row and its receiver Jacobian

From $1/D=1+(n\cdot v)/D$ and $R=R_0-U$,

$$
C=R_0\,d_3-\frac{U}{r^3}+\frac{R}{r^3}\,\frac{n\cdot v}{D},\qquad
d_p=\frac1{r^p}-\frac1{r_0^p}=\frac{(r_0-r)\sum_{k=0}^{p-1}r_0^{p-1-k}r^k}{r^pr_0^p},\qquad
r_0-r=\frac{2R_0\cdot U-\lvert U\rvert^2}{r_0+r}.
$$

Every term carries $U$ or $v$, so an unchanged source gives zero on a whole receiver box.

Differentiating $s+r=t$ in the receiver position gives $\partial_xs=-n^{\mathsf T}/D$, hence $\partial_xR=M=I+vn^{\mathsf T}/D$, $\partial_xr=n^{\mathsf T}M$, $\partial_xn=(P/r)M$ with $P=I-nn^{\mathsf T}$, and $\partial_xD=-(v^{\mathsf T}P/r)M+(n\cdot a)\,n^{\mathsf T}/D$, where $a$ is the source acceleration at the root. With $A=(I-3nn^{\mathsf T})/r^3$,

$$
\partial_x\frac{R}{r^3D}=\frac{A}{D}M+\frac{n\,v^{\mathsf T}P\,M}{r^3D^2}-\frac{nn^{\mathsf T}(n\cdot a)}{r^2D^3}.
$$

Subtracting the stationary $A_0=(I-3n_0n_0^{\mathsf T})/r_0^3$ and using $A-A_0=I\,d_3-3\bigl[(RR^{\mathsf T}-R_0R_0^{\mathsf T})/r^5+R_0R_0^{\mathsf T}d_5\bigr]$ with $RR^{\mathsf T}-R_0R_0^{\mathsf T}=UU^{\mathsf T}-R_0U^{\mathsf T}-UR_0^{\mathsf T}$,

$$
\partial_xC=(A-A_0)+A\,\frac{n\cdot v}{D}+\frac{A\,vn^{\mathsf T}}{D^2}+\frac{n\,v^{\mathsf T}P\,M}{r^3D^2}-\frac{nn^{\mathsf T}(n\cdot a)}{r^2D^3}.
$$

These agree with the frozen formulas, as they must; the code is separate. The signed row matrices of a receiver are summed before a norm is taken.

### 3.5 The stationary field and its tails

The field of the lattice at rest is $S_0(x)=-\nabla\sum_{n\ne0}(-1)^{n_1+n_2+n_3}\lvert x-n\rvert^{-1}$. Each site contributes $\sum_l\lvert x\rvert^lP_l/\lvert n\rvert^{l+1}$; odd degrees cancel between $n$ and $-n$, degree two cancels on every cubic shell, and degree four is $-\nabla V_4=a\,T(x)$ with $T_k=\tfrac52x_k^3-\tfrac32x_k\lvert x\rvert^2$. The retained polynomial is $a\,T-\nabla(V_6+\dots+V_{14})$ with the cube-24 coefficients; its gradient and Hessian are formed here from the monomial coefficients.

Omitted: degrees 6 to 14 from sites outside the cube, and all degrees from 16 up. The shell $\lVert n\rVert_\infty=m$ has $(2m+1)^3-(2m-1)^3=24m^2+2$ sites, each at distance at least $m$, and $\sum_{m>N}m^{-p}\le N^{1-p}/(p-1)$, so $\sum_{\lVert n\rVert_\infty>N}\lvert n\rvert^{-(l+1)}\le24N^{2-l}/(l-2)+2N^{-l}/l$. For degrees from 16, the 26 sites of the nearest cube (6, 12 and 8 at squared distance 1, 2, 3) are summed in closed form, $\sum_{j\ge0}(16+2j)x^j=16/(1-x)+2x/(1-x)^2$ with $x=\lvert y\rvert^2/\lvert n\rvert^2$, and the rest, at distance at least two, by $\sum_{m\ge2}(24m^2+2)m^{-17-2j}\le4^{-j}(24/14+2/16)$. With the adopted gradient bound this gives the field tail; with the adopted Hessian bound and $\sum_j(16+2j)(15+2j)x^j=240/(1-x)+62x/(1-x)^2+4x(1+x)/(1-x)^3$ it gives the derivative tail. Both need $\lvert x\rvert<1$; the displacement domain is $\lvert x\rvert<7/20$. The first agrees in form with the frozen remainder; the derivation is mine and the known cases check each ingredient.

### 3.6 The defect, by direct evaluation

The frozen instrument bounds the defect by its midpoint value plus a bound of its time derivative over the cell. This instrument does not differentiate $F$ in time. Each of the 16 Hermite steps in the cell is cut into equal sub-intervals. On a sub-interval $\tau$ the receiver's position box $\widehat y_i(\tau)$ and acceleration box $\widehat y_i''(\tau)$ are enclosed, every row is evaluated on $(\tau,\widehat y_i(\tau))$ with the root contraction of Section 3.3, and

$$
\rho_i\ \ge\ \max_\tau\Bigl(\bigl\lvert\widehat y_i''(\tau)-16\bigl[\textstyle\sum\sigma C+a\,T-\nabla V\bigr](\tau)\bigr\rvert+16\,\mathrm{tail}\Bigr).
$$

This is a different route to the same quantity, and it needs no jerk. Its cost is width: the enclosure of $F$ over $\tau$ is as wide as $F$ varies there, so the bound improves in proportion to the number of sub-intervals.

### 3.7 Source-history sensitivity

Let two histories of one source differ by $\delta(s)$ with $\lvert\delta\rvert\le E_P$ and $\lvert\delta'\rvert\le E_V$, and follow $X_\theta=X+\theta\delta$. From $s+r=t$, $ds/d\theta=n\cdot\delta/D$; then $dR/d\theta=-\delta-v\,ds/d\theta$ and the velocity at the root changes at rate $\delta'+a\,ds/d\theta$. For $K=R/(r^3D)$ at fixed receiver, $\partial_RK=A/D+n\,v^{\mathsf T}P/(r^3D^2)$ and $\partial_vK=nn^{\mathsf T}/(r^2D^2)$. With range at least $d$, speed at most $w$ and acceleration at most $b_a$ along the whole family, $\lVert A\rVert\le2/r^3$, $D\ge1-w$ and $1+w/D\le1/(1-w)$ give

$$
\lvert\Delta K\rvert\le C_PE_P+C_VE_V,\qquad
C_P=\frac{2}{d^3(1-w)^2}+\frac{w/d^3+b_a/d^2}{(1-w)^3},\qquad C_V=\frac{1}{d^2(1-w)^2}.
$$

The family is the convex set of histories within the accepted error of the comparison history, which contains both the comparison and the actual history; the root enclosure is taken for the whole family, so every member's root is inside it. The supplied pulses are prescribed exactly and add nothing to $q$.

### 3.8 The tube

With incoming scalar majorants $P$, $V$ at the start of the cell, a tube radius is proposed, $\lambda$ and $q$ are computed on the comparison box widened by that radius, and the frozen propagation's scalar comparison $P'=V$, $V'=\lambda P+q+\rho$ is advanced across the cell by the power series of $\cosh$ and $\sinh$ with a geometric tail bound. The radius is accepted only if the advanced $P$ is strictly inside it for every receiver; otherwise it is enlarged and everything is recomputed. The propagation argument itself, that the vector inequality implies these scalar majorants and that a closed tube cannot be left, is the frozen one and is not re-derived here.

## 4. Known cases

Twenty-three known cases passed, and were recorded, before the target ran (`known-run3.json`). Each expected value is obtained without the module under test: exact rational arithmetic, closed forms, a direct lattice sum, or 40-digit implicit solves and differences.

| Group | What is checked |
| --- | --- |
| Arithmetic | 3,000 random dyadic cases of every interval operation against exact rationals; division through zero and a negative square root refused; rational conversion within one unit in the last place, negatives and a 21-digit numerator included, exact for dyadics |
| Hermite | an exact quintic with a nonzero absolute start: values and two derivatives at nodes, inside steps and across a seam, within $3.3\times10^{-12}$; zero prefix exact, and zero included across the start; queries beyond the end or before the start refused |
| Cancellation | an unchanged source gives a zero row and zero Jacobian on a wide receiver box; norms of exactly zero vectors and matrices are defined |
| Analytic geometry | constant-velocity source with speed $1/8$: root $8/7$, range $6/7$, factor $7/8$ and row $5/9$ enclosed within $10^{-11}$ |
| Curved source | row and all nine Jacobian entries for an accelerating curved source against 40-digit implicit differentiation, within $1.5\times10^{-13}$; omitting the source-acceleration term, or reversing the displacement's sign, misses the reference |
| Refusals | a reach too small to hold the root; a source faster than wake speed toward the receiver |
| Pulse | exact displacement and two derivatives at one point, zero outside its window; interval suprema $3.185\times10^{-6}$, $1.223\times10^{-4}$ and $4.28\times10^{-3}$ for displacement, velocity and acceleration, the first within one percent of the sampled maximum $3.1753\times10^{-6}$ |
| Stationary field | the polynomial with its tails encloses a direct sum over the 117,648 sites of the cube of radius 24, field and derivative, at a test point; without the cubic term it does not; shell-count sums lie below their integral bounds; both generating functions match partial sums; the two adopted solid-harmonic bounds hold at 400 sampled directions for degrees 6, 10 and 16 (ratios $0.996$ and $0.998$; a sample, not a proof) |
| Source sensitivity | three finite history changes stay below $C_PE_P+C_VE_V$ and reach $79$, $93$ and $63$ percent of it |
| Majorant step | exact for constant forcing; above the closed form within $10^{-12}$ for $\lambda=100$ |
| Operator norm | two exact cases and 200 random matrices |

## 5. Results for cell 30

**Identity.** Cell 30 is $[5+30/64,\,5+31/64]=[175/32,\,351/64]$; the frozen residual table's row 30 and the frozen comparison's row 30 carry the same endpoints, and the receiver order is the same in all three records. The raw archives match their recorded hashes; the census edge list equals the archive's; the incoming source order equals the population archive's.

**Complete-cell values (measured by outward interval arithmetic; "frozen" is the subject's value, read afterwards).**

| Quantity | New, largest | Frozen, largest | New, median | Receivers where new exceeds frozen | Largest excess |
| --- | --- | --- | --- | --- | --- |
| Defect $\rho$ | $0.23345$ at $(1,-1,1)$ | $0.45572$ | $4.96\times10^{-5}$ | 982 of 1502 | $0.0027$ (ratio up to $5.03$, median ratio $1.66$) |
| Jacobian coefficient $\lambda$ | $176.976$ at $(1,1,1)$ | $178.802$ | $0.0727$ | 0 | none (median ratio $0.81$) |
| Source-error term $q$ | $0.176717$ at $(0,1,1)$ | $0.177264$ | $0.00112$ | 0 | none (median ratio $0.99997$) |
| Outgoing position majorant | $0.0159812$ | $0.0160116$ | | 954 | $2.4\times10^{-7}$ (relative $8.8\times10^{-4}$) |

Per-receiver values of all three, the tube radius and the incoming and outgoing majorants are in `per-receiver.npz`. The ninetieth and ninety-ninth percentiles are $0.0018$ and $0.095$ for $\rho$, $1.87$ and $86.0$ for $\lambda$, $0.036$ and $0.123$ for $q$.

**Hypotheses checked on the whole cell.**

- *Roots.* For the defect, every emission enclosure ends by $4.7592$; for $\lambda$ and $q$, with the tube and the source errors, by $4.7778$. Both are below 5, the end of the retained source histories, so no source query leaves its domain. The smallest range is $0.7251$ and $0.7066$, and the smallest transmitter factor $0.9181$ and $0.9062$. The largest speed of any source enclosure at a root, errors included, is $0.0868$; over whole histories the comparison sources have speed at most $0.1605$. With speed below one the root of each row is unique (Section 3.3); no enclosure was empty.
- *Pulses.* All 3,002 receiver-centre pairs were evaluated; 288 have an emission enclosure that meets the pulse window in this cell. The frozen census lists 1,278 possible pulse rows for the whole of $[5,11/2]$.
- *Tube.* The first proposed radius, the incoming majorant plus one sixty-fourth of the velocity majorant plus $2\times10^{-5}$, failed by up to $3.4\times10^{-4}$. Enlarged by one percent of the computed majorant, it closed for all 1502 receivers, smallest margin $1.65\times10^{-5}$. The comparison displacement plus the position majorant is at most $0.26537$, inside the domain $7/20$; with the tube radius it is at most $0.26838$.
- *Tails.* The field tail, coupling included, is at most $3.6\times10^{-6}$; the derivative tail at most $3.75\times10^{-4}$. Both are added in full. The outgoing velocity majorant is at most $0.19451$ (frozen $0.19843$).

**Is this sufficient for the existing propagation argument?** Not yet decided. The new $\lambda$ and $q$ could replace the frozen ones in this cell with no loss. The new $\rho$ cannot simply replace the frozen one, because it is larger at 982 receivers. Two routes are open and neither was taken: cut the sub-intervals finer until $\rho$ is below the frozen value everywhere (the largest ratio, 5.03, suggests eight sub-intervals per step, at eight times the cost), or propagate the new bounds through all 31 cells and re-extract the event margins, which is what the campaign's last stage asks. On this one cell the outgoing majorants differ from the frozen ones by less than one part in a thousand.

**Resources (measured).** One process, 822 seconds of wall time: 15 seconds of setup, 566 for $\rho$ (16 steps at about 35 seconds), and two passes of $\lambda$ and $q$ at about 125 seconds each. Peak memory 0.92 GB. At that rate 31 cells take about seven hours in sequence. The cells are independent, so six processes would take about 75 minutes and 5.5 GB; I have not tested that.

## 6. Independence, limits and falsifiers

- The result is an independent recomputation of the enclosure arithmetic and of its formulas from the shared inputs of Section 2. It is not independent of those inputs. In particular it does not re-derive the stationary coefficients, the cubic coefficient interval, the inherited source errors, or the incoming receiver majorants.
- The propagation argument is the frozen one.
- A wide enclosure is a limit of the method, not evidence about the event.
- The auxiliary comparison equals the Master Equation only before the first global speed-one event; cell 30 contains the upper end of the accepted event bracket.

**Falsifiers.** A source row or pulse row missing from the sums; an emission time outside $[{-11/8},5]$ for a row counted as evaluated; a Hermite step intersecting a query and not included; an arithmetic step rounded inward; a tail smaller than the omitted terms; a known case that fails when rerun; or independently supported bounds that contradict these.

## 7. Failures and limitations

1. **First known-case run: four failures, all retained.** Three were my misposed expectations: two demanded exact zero where outward rounding gives magnitudes near $5\times10^{-321}$, and one demanded that loosely aimed probes reach five percent of the sensitivity bound. One was a real weakness: the pulse was evaluated from its expanded polynomial, whose coefficients reach 2304 against values near $3\times10^{-6}$, and the enclosure was three times too wide. The pulse now uses factored forms, checked against the expanded second derivative.
2. **First target run stopped during setup**, on the square root of a sum of squares that outward rounding had made slightly negative for an exactly zero vector. The sum is now clipped at zero, with a known case added. Both the core and the known cases were rerun before the second target run. No target value existed before the passing known run.
3. **One clause of the added known case is vacuous** (it compares a range with its own square). The rest of that case is effective. I left the file as run.
4. **A `--refine` option is parsed and unused.**
5. **The comparison with the frozen values ran outside the supervisor**; it reads two files and takes seconds.
6. **Conservative choices that cost sharpness, not validity.** The inherited error table is used without the frozen instrument's extra zeroing of rows whose emission precedes a source's first motion. The broad cubic-coefficient interval is used. The comparison sources' whole-history bounds come from evaluating every Hermite step on its full unit interval.
7. **Reading coverage is partial.** Read in full: the campaign plan, the residual analysis, the continuation analysis, the three frozen residual instruments, the frozen comparison and Jacobian subjects and the error-table subject, lines 1 to 211 of the frozen interval and row library, the reproduction record and the continuation README, and Sections 7 and 8 of the chain assessment. Not read: the history audit, the independent adjudication, Sections 1 to 6 of the chain assessment, the residual replay record and its supplement, the staggered closeout, the lattice work queue and priorities. I did not reread AGENTS.md, the protocol or the compute skill at the start of this direction; I used the supervisor as in the previous series.
8. **No platform, permission or identity limit was met.**

## 8. Retention

Instruments, in `evidence/event-cell-independent-2026-10-12/`: `event_cell_core.py`, `event_cell_known.py`, `event_cell_pilot.py`. Owner `.local-data/master-equation-closure/event-cell-independent-2026-10-12/claude-pilot/`: the three known-case runs (one failed, two passed) and the two target runs (one failed, one completed), each with the instrument sources as they stood (`sources-run1` to `sources-run4`), supervisor records with closed process groups, `cell30-run2/` with `result.json`, `per-receiver.npz`, `rho-first-pass.npz` and `comparison.json`, the progress log, `commands.txt`, and `outputs.sha256` (paths relative to the owner) and `sources.sha256` (paths relative to the repository). The coordinator's `codex-dispatch` folder beside the owner is untouched. No frozen source, archive, reference or receipt was changed.

## 9. Remaining work and proposed integration

**Remaining for the pilot.** The sufficiency point of Section 5. A full read of the sources listed in Section 7, item 7. Nothing else in the pilot's stated scope is open.

**For the all-cell stage, if released.** Run cells 0 to 30 with this instrument in parallel processes under one supervised job; decide beforehand between finer sub-intervals for $\rho$ and propagation of the new bounds; then feed the 31 tables to a separately written propagation and extraction step. Each cell needs the incoming majorants at its start: either the frozen ones, as here, which keeps every cell independent of the others, or the newly propagated ones, which makes the cells sequential.

**Proposed integration, for the coordinator; not applied.** Record that cell 30 has separately computed complete-cell enclosures of all three quantities; that $\lambda$ and $q$ are at or below the frozen values for every receiver; that $\rho$ is not, at 982 receivers, by at most $0.0027$; that the tube closes on this cell with the new values; and that the inputs listed in Section 2 remain shared.

## 10. Corrections after the coordinator's review (2026-10-12)

The coordinator reviewed this report at SHA-256 `e87400724be69d1fa818be6f5946b7bad4ed5d601ad5f7879c15ac5ea1cdb1c1` and raised four comments, EC-01 to EC-04, in its [review](event-cell-independent-pilot-review-2026-10-12.md). Those bytes are retained as `report-as-reviewed-e8740072.md` in the supplement owner of Section 10.6. The three pilot instruments and the pilot owner are unchanged, as run. The corrections are in three new files beside them: `event_cell_core_v2.py`, `event_cell_known_v2.py` and `event_cell_serial.py`. The coordinator's decisions are followed: the new per-receiver $\rho$ is carried as it is, with no eightfold refinement; cells are to run in sequence with consistently propagated incoming errors; no further cell was run.

### 10.1 EC-01: reading, and what it changes

Read in full since the first version: the history and complement audit; the independent adjudication (all thirteen sections); Sections 1 to 6 of the chain assessment, completing it; the staggered closeout; the current collaboration protocol; the current startup router; the compute skill and the long-running job policy it names. AGENTS.md was read in full at the start of this session on 2026-10-10 and its file has not been modified since (its modification time precedes that read); I did not re-read it today. The residual replay record is my own report from the earlier series; I re-read its result section and not its supplement. Of the live lattice queue and priorities I read the event-cell item, the queue's header, and the continuation paragraph.

What the reading changes:

- **Nothing in the derivation or the source-domain argument.** The audit's emission ceiling is $123/25=4.92$; the measured enclosures end by $4.7781$.
- **It supplies the proof for skipping rows (Section 10.4).** The audit establishes, by exact comparison, that every numerical zero cutoff is no later than the source's actual first front. The driver does not rely on that statement: it takes the smaller of its own scanned cutoff and a rigorous lower bound of the front. On the real archive this lowered no cutoff, which agrees with the audit.
- **It fixes the start of the chain (Section 10.3).** The accepted errors at time five are the final prefix-refinement table's last entry; the 152 receivers absent from the incoming archive have zero initial jets and are stationary through five.
- **The solid-harmonic bounds are now proved.** The review's argument uses Laplace's integral $H_l(x)=\frac1{2\pi}\int_0^{2\pi}(u\cdot x+i\,v_\theta\cdot x)^l\,d\theta$ and $\lvert u\cdot z+i\,v_\theta\cdot z\rvert\le\lvert z\rvert$ for orthonormal $u$, $v_\theta$; differentiating under the integral gives both bounds. I checked the argument and adopt it; item 5 of Section 2 is no longer a spot-checked fact.
- **Process.** The supervisor was used as the policy requires: owner task equal to this session, a hard deadline on every job, progress lines flushed per step, closed process groups, closeout before each return.

### 10.2 EC-02: known cases for the driver, and the arithmetic

`event_cell_known_v2.py` has 34 cases: the 23 of the pilot, run against the version-2 core, with the vacuous clause replaced by an effective one (the enclosed range squared must bracket $21/16$), and eleven new ones for the driver's own functions. Its receipt pins the core and the driver by hash, and the driver refuses to run without a passing receipt for its exact bytes.

| New case | What is checked |
| --- | --- |
| Grouped interval sums | exact rational sums of dyadic data with uneven and empty groups; a group $2^{60}+1-2^{60}$, where plain floating addition returns 0 and the enclosure must contain 1; 4,000 random entries in 37 groups |
| Grouped positive sums | a group $2^{53}+1+1$, where floating addition drops both ones; a negative entry refused |
| Error lookup | entry $k$ at exactly $k/64$, entry $k+1$ just above, zero at and before time zero, running maximum past a planted spike, refusal beyond the table |
| Piece selection and bin boxes | the exact quintic at nodes, inside pieces and across seams, by both routes; bins never narrower than pieces; third derivative and out-of-range queries refused |
| Exact defect through the driver | one receiver at rest and one source with constant velocity $1/8$: the defect is $16\,(56/(8-t)^2-1)$; the driver's enclosure is above its supremum and within $0.3$ of it; a sub-interval count that is not a power of two is refused |
| Zero-prefix skipping | a row whose every emission time is in the zero prefix is skipped, and the same row evaluated in full is also zero, in $\rho$, $\lambda$ and $q$; a moving source is never skipped; its $\lambda$ is above the exact axial derivative and within a factor of two |
| Tube | a radius that is too small is rejected and the enlarged one accepted, with the majorant above the closed form; a tube that leaves the domain, and one that never closes in eight attempts, are reported as not closed |
| Initial state | accepted errors mapped by identity; an absent receiver starts at zero only with a zero jet and a first front not before five (a receiver with $m=36$ refused, a nonzero jet refused) |
| Zero cutoffs | last exactly-zero node per path, from position, velocity or acceleration |

**Grouped sums (derivation).** For $m$ floating terms added in sequence, the computed sum differs from the exact one by at most $\gamma\sum\lvert x_k\rvert$ with $\gamma=(m-1)u/(1-(m-1)u)$ and $u=2^{-53}$. The magnitude accumulator $M$ is computed the same way from magnitudes that dominate both endpoint arrays, so $\sum\lvert x_k\rvert\le M/(1-\gamma)$ and the error is at most $\gamma M/(1-\gamma)$. That is below $m\,2^{-52}M$ whenever $mu\le1/4$, which the driver asserts. The allowance used is the upward-rounded product $M\cdot m\,2^{-52}$ plus $10^{-300}$, with $m$ the largest group size. For nonnegative terms the exact sum is at most the computed one divided by $1-\gamma$, which is below the computed one times $1+m\,2^{-52}$.

**Other points.** The actual sources' initial reach, the displacement bound plus the position error bound, is now rounded upward explicitly. Sub-interval counts must be powers of two and the endpoints are checked against exact rationals. The unused refine option is gone.

**Failed known-case runs of version 2, all retained with their sources.** Four runs failed before the fifth passed, each on a control of mine and none on an invalid enclosure: a synthetic source that started from rest at a node, whose crude whole-piece speed bound exceeded one, which the driver correctly refused; an initial-state example whose "accepted" receiver was in fact reachable before five, which the driver correctly refused; six tolerances or examples that were too tight or misposed (three below what outward rounding or the summation allowance permits, two tightness demands on a source displaced by half a unit, and a "never closes" example that did close); and one threshold for "zero" set below the square root of the smallest subnormal. No target ran until the fifth run passed.

### 10.3 EC-03: the start of the chain and its propagation

The pilot driver read the previous cell's frozen profile, which for cell zero wrapped to the last profile and failed. The serial driver has three named sources for a cell's incoming majorants:

- **Cell zero:** the accepted through-five error table's entry at time five, mapped receiver by receiver by exact lattice identity. A receiver absent from that table starts at zero only if its initial jet is exactly zero and $(5+11/8)^2\le m_p$, where $m_p$ is its first-front squared distance; otherwise the driver refuses. On the real archive (a setup check, with no cell evaluated): 1,350 receivers are mapped, 1,174 with a nonzero bound; 152 are absent and all pass both conditions; the largest starting values are $0.000992183$ and $0.00427324$, the accepted figures.
- **Later cells:** the outgoing majorants of the preceding cell of the same chain, or a saved chain state whose next cell matches.
- **Frozen profile:** only as a single-cell conditional check, named as such in the output. It cannot start or continue a chain.

Each cell saves the exact tube radius on which its $\lambda$ and $q$ were computed, and the driver asserts that the incoming majorant is inside that tube and the outgoing one strictly inside. If a tube does not close, the chain stops and that cell is not counted. The new per-receiver $\rho$ is carried as computed. Each cell also saves the comparison boxes and the outgoing position, velocity and acceleration majorants, which is what a separate event extraction needs; no extraction is done here.

### 10.4 EC-04: exact exclusions, cost, and the corrected pilot

**Skipped rows, with the proof.** Before any source curve is evaluated, every root of a row lies in $t-\lvert R_0\rvert+[-b,b]$ (Section 3.3), with $b$ the source's displacement bound, plus its error bound for the actual sources. If the upper end of that interval is at or before the row's cutoff $c_j$, the row is skipped. The cutoff is the smaller of (a) the latest time through which every node of the comparison history is exactly zero, so that the Hermite curve is identically zero up to it, and (b) a rigorous lower bound of the actual first front, $\sqrt{m_p}-11/8$ for an environmental source and $\sqrt2-3/8$ for a target. For such a row the comparison history is identically zero at every possible emission time, so the row is exactly zero in $\rho$; and the actual history is zero there too, by the accepted first-front census, so the row adds nothing to $\lambda$ and its source error is zero, adding nothing to $q$. Nothing is skipped for being small or by sampling. Every call reports rows total, skipped and evaluated, and the three add up to the union. That (b) rests on the accepted first-front statement is a shared input.

**Wide source-time intervals.** The source curves' position, velocity and acceleration are enclosed once per bin of width $1/256$ (four Hermite pieces, each on its whole unit interval). A wide interval takes the hull of the bins it can meet. The root contraction uses coarse bins, then fine bins, then two contractions on the Hermite pieces for $\rho$; $\lambda$ and $q$ use bins throughout, with the error bounds added. A bin hull is never narrower than the curve, which the known cases check.

**Piece selection.** The pilot evaluated one extra Hermite piece on each side of every query. Version 2 selects the pieces from the query's ends with a guard of $10^{-9}$ pieces, far above the rounding of the index; a piece that touches the query only at a node is not needed through the second derivative, and a third-derivative query is refused.

**The corrected pilot, cell 30 (a conditional check with the frozen incoming profile; measured).**

| Quantity | Corrected | First pilot | Frozen |
| --- | --- | --- | --- |
| $\rho$, largest | $0.233507$ | $0.233449$ | $0.455715$ |
| $\lambda$, largest | $178.425$ | $176.976$ | $178.802$ |
| $q$, largest | $0.177146$ | $0.176717$ | $0.177264$ |
| Outgoing position majorant, largest | $0.0159838$ | $0.0159812$ | $0.0160117$ |
| Receivers with $\rho$ above frozen | 982 (by at most $0.0027$) | 982 | |
| Receivers with $\lambda$ or $q$ above frozen | 0 | 0 | |

The corrected values are at or above the first pilot's at every receiver, by at most $8.4\times10^{-5}$ in $\rho$, $1.45$ in $\lambda$ and $4.3\times10^{-4}$ in $q$: the bin hulls are wider than exact intervals. $\lambda$ and $q$ are still at or below the frozen values at every receiver. The tube closed on the second radius with smallest margin $1.65\times10^{-5}$; emission enclosures end by $4.7781$; smallest range $0.7063$, smallest factor $0.9051$; displacement with error at most $0.26537$. Of 149,046 rows, 39,906 were skipped for $\lambda$ and $q$ and between 40,084 and 40,634 for $\rho$, each by the rule above; 288 pulse pairs were active.

**Cost (measured).** Setup 15 seconds, once per process. Cell 30 took 39.0 seconds, 36.4 of them for $\rho$, against 822 for the pilot; peak memory 1.25 GB. In one process, in sequence, 31 cells would take about 21 minutes if the other cells cost what cell 30 does. They may differ: earlier cells have more rows in the zero prefix and smaller tubes. Six parallel processes are not used.

### 10.5 What remains before the all-cell stage

An earlier version of this paragraph said that nothing requested remained undone. That was premature: the live reads of EC-01 were incomplete, and the failed-cell status of EC-05 was not handled. Section 11 records both. I have not run cell zero or any other cell; the chain start is checked only by the setup check and the known case. The sufficiency point of Section 5 is unchanged and will be settled only by the propagated chain and a separate extraction.

### 10.6 Retention

Supplement owner `.local-data/master-equation-closure/event-cell-independent-2026-10-12/claude-supplement-1/`: the report as reviewed; five known-case runs of version 2 with the three source files as they stood at each (`sources-run1` to `sources-run5`); `cell30-frozen-run1/` with `summary.json`, `cell-30.npz` and the chain state; the setup check and its source; supervisor records for all seven jobs with closed process groups; closeout; `commands.txt`; `outputs.sha256` and `sources.sha256`. The pilot owner, its manifests, the three pilot instruments and the coordinator's folders are untouched.

## 11. Second round of corrections: EC-01 completed and EC-05 (2026-10-12)

The coordinator verified the bytes of Section 10 (report SHA-256 `7d908511750b3be67899a8fdc516dea35a61553345487b941ed38374d4f9e9c2`, retained as `report-as-reviewed-7d908511.md` in the owner of Section 11.3), accepted EC-02 to EC-04 for the corrected pilot, and left two comments open. Nothing in `event_cell_core_v2.py`, `event_cell_known_v2.py` or `event_cell_serial.py` was changed; they and the first supplement owner are as verified.

### 11.1 EC-01: the live reads, now complete

Read today, each in full: AGENTS.md (169 lines); the startup router; the workflow it routes this task to, the long-running job policy, and the compute skill that names it; the collaboration protocol; the history and complement audit; the independent adjudication; the chain assessment, all eight sections; the staggered closeout; the residual replay record, with the tails of its long paragraphs, and its supplemental retention record; the live lattice work queue and the live lattice priorities.

Implications, with their scope:

- **AGENTS.md.** Its rules on evidence independence, known cases before targets, measured cost, falsifiers, and not changing a reference together with its subject are the ones this work has been following. Two of its rules bear on wording: a repository-state claim must carry its instrument and scope in the same sentence, and agreement between two runs of one instrument is not evidence. The second is why the bit-for-bit rerun in Section 11.2 is described as a check of the new loop and not as support for the bounds. No change to the derivation or the method.
- **Replay record.** Its last falsifier names what this campaign supplies: a separately authored evaluator of a cell's residual and of its $\lambda$ and $q$. On cell 30 the new $\lambda$ and $q$ are at or below the subject's at every receiver, and the new $\rho$ is above it at 982 receivers. Two valid upper bounds may differ in either direction; neither result contradicts the subject. The record's finding that the frozen instruments no longer run as recorded does not touch this instrument, which loads none of them. Its list of unreplayed inputs (the two node archives, the error table's own inputs, the numerical stationary proposal, the census) is the same boundary as Section 2 here.
- **Lattice queue and priorities.** The event-cell item matches the campaign plan. The other live items (the coupling classification assigned elsewhere, the localized nonlinear family, the release ladder, the rotating ladder) use different preparations or questions and no file of theirs is read or written here.
- **Everything else read:** no change, as stated in Section 10.1.

### 11.2 EC-05: failure status, index limits and guarded resumption

The serial driver's not-closed branch left the run without writing its summary. The loop over cells now lives in a new file, `event_cell_chain.py`. It adds no arithmetic: it imports `event_cell_serial.py` unchanged, after checking its hash, and calls that module's functions for every enclosure, for the tube, and for the chain start.

- **Summary on every outcome.** `summary.json` is written before the first cell, after every cell, and again on any stop, including an exception. It names the requested cells, the completed cells, the failed cell with its attempts, and the cells not attempted.
- **Failure.** A tube that does not close ends the chain. The failed cell gets no cell file and is not counted, and the last valid chain state is left in place.
- **Index limits.** Requested cells must satisfy $0\le\text{first}\le\text{last}\le30$.
- **Chain state and its provenance.** A state is written only by a chain that started at cell zero from the accepted through-five table, or that resumed from such a state. It records the next cell, the completed cells, the digest of the state arrays, and the name and digest of the predecessor cell file. The frozen-profile mode writes no state.
- **Resumption.** A resumed run checks that the state is a chain state, that its next cell is the requested first cell, that its completed cells are $0,\dots,\text{first}-1$ with no gap, that the state arrays match their recorded digest, that the predecessor cell file matches its digest, that the receiver identities agree, and that the state's incoming arrays equal the predecessor's outgoing arrays exactly. Any failure refuses the run.
- **Cell files are never overwritten.**

**Known cases, eight of eight passed on the first run** (`event_cell_known_v3.py`; its receipt pins the chain runner, the serial driver, the core and the passing version-2 receipt, and the chain runner refuses other bytes). They use a synthetic problem with one receiver held at displacement $0.3$ and a source whose every emission time is negative, so each cell's $\rho$, $\lambda$ and $q$ are zero and the position majorant advances by exactly one sixty-fourth of the velocity majorant per cell.

| Case | Outcome checked |
| --- | --- |
| Index limits | 0 to 30 accepted; negative, beyond 30, reversed and non-integer requests refused |
| Success | three cells completed; majorant equal to the exact value within $10^{-12}$; summary and state name every cell |
| Failure at the second cell | summary on disk names completed cell 0, failed cell 1 with its reason, unattempted cell 2; no file for the failed cell; the state at next cell 1 is kept and loads |
| Failure at the first cell | summary written; no state and no cell file |
| Planted exception in the second cell | the exception propagates; the summary names one completed cell and the exception |
| Resumption | a chain 0 to 1 resumed at 2 equals the uninterrupted chain 0 to 2 bit for bit; refused: wrong next cell, wrong identities, a frozen run's directory, changed state arrays with and without a matching digest, a changed predecessor file, a relabelled mode, a gap in the completed cells |
| No overwrite | a second run into a directory holding the cell file is refused |

**The loop is new code, so it was checked against the corrected pilot.** The pilot cell was evaluated once more through the chain runner, in the labelled frozen-profile mode. All sixteen arrays of its cell file (the three bounds, the tube, the incoming and outgoing majorants, and the comparison boxes) are equal bit for bit to those of Section 10.4. That is a deterministic repetition by the same arithmetic: it shows the new loop calls it the same way, and it is not further evidence for the bounds. It took 36.6 seconds for the cell, wrote no chain state, and reported the cell as completed.

### 11.3 Retention, and readiness

Second supplement owner `.local-data/master-equation-closure/event-cell-independent-2026-10-12/claude-supplement-2/`: the report as reviewed; the two new source files as run; the version-3 known receipt and its scratch directory of synthetic runs; the pilot cell through the chain runner; `cell30-equivalence.json`; supervisor records for both jobs with closed process groups; closeout; `commands.txt`; `outputs.sha256` and `sources.sha256`. The pilot owner and the first supplement owner are unchanged. Their manifests verify with one exception, corrected here after review: the first supplement's source manifest has sixteen entries, and its entry for the coordinator's living review file no longer matches, because that file was extended by its owner after the manifest was written. The other fifteen source entries and all 54 output entries verify, as do both pilot manifests. That drift is not a change to any scientific source, and the manifest is left as written.

No cell other than the pilot cell has been evaluated. The intended first packet, cells 0 to 7 starting from the accepted time-five errors, is one command and one supervised job; I will start it only on release and stop for review before cell 8.

## 12. Third round: exception status in the chain runner (2026-10-12)

The coordinator closed EC-01 and accepted the chain runner's failure and resumption guards (report SHA-256 `635ce109584d1d9ad248cb100e1f202e2e127751c63ce550b9a7e9b904b3fc0c`, retained as `report-as-reviewed-635ce109.md` in the third supplement owner), with one status path left: when an exception interrupted a cell, the summary left the failed cell empty and listed the interrupted cell as not attempted.

`event_cell_chain_v2.py` corrects that; `event_cell_chain.py` is preserved as run. The cell in progress is tracked outside the loop. On an exception it is recorded as the failed cell, with the exception as its reason, and is not listed as unattempted; the preceding valid chain state is kept. A cell now counts as completed only once its result, and in chain mode its chain state, is on disk, so an exception while the state is being written also leaves that cell uncounted. The two files differ in 27 lines, all in this bookkeeping; a line-by-line difference is retained. No call into the serial driver's arithmetic was added, removed or reordered, and the serial driver is still imported by its pinned hash. On that basis, and as the coordinator directed, the numerical pilot was not run again.

**Known cases, ten of ten passed on the first run** (`event_cell_known_v4.py`, which replaces the earlier exception case by three; its receipt pins the version-2 chain runner, the serial driver, the core and the passing version-2 arithmetic receipt). The seven unchanged cases are those of Section 11.2. The three new ones:

| Case | Outcome checked |
| --- | --- |
| Planted exception in the second cell | completed cell 0, failed cell 1 with the exception as reason, unattempted cell 2; no file for cell 1; the state at next cell 1 is kept and loads |
| Planted exception in the first cell | no completed cell, failed cell 0, unattempted cells 1 and 2; no chain state and no cell file |
| Planted exception while the second cell's chain state is being written | completed cell 0, failed cell 1 marked as evaluated but not counted, unattempted cell 2; the state still says next cell 1 |

Third supplement owner `.local-data/master-equation-closure/event-cell-independent-2026-10-12/claude-supplement-3/`: the report as reviewed; the two new source files as run; the version-4 known receipt with its scratch directory; the difference between the two chain runners; the supervisor record; closeout; `commands.txt`; `outputs.sha256` and `sources.sha256`.

No target cell was evaluated in this round. The first packet, cells 0 to 7, will use `event_cell_chain_v2.py` with the version-4 receipt.
