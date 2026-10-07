# Radius-weighted value transfer and the finite phase-map route

**Status: derived candidate, unreviewed.** The member is exactly $\epsilon=2^{-200000}$, $K=c_f=1$, $R_0=2^{399998}$, with the unchanged complete [case preparation](authorized-cases-ten-hour-b-case.md). The cutoff, compatible degree-five polynomial, original constant past and all propagated sixth seams remain present. The [independently accepted value theorem](authorized-cases-ten-hour-reference-b-value-adjudication.md) is the analytical starting point. No numerical target or modified preparation is used.

The new actual-history claim proposed here is a radius-weighted extension of that value theorem. The later total-angle coefficient is separately labeled a central comparison calculation. Neither claim assigns the actual member's terminal branch.

## 1. Radius scaling extends the value estimate

Work from the initial controlled layer through any interval on which the actual generated path has

$$
r\ge2^{-13},\qquad |y'|\sqrt r\le32,
\qquad |y'|\le2^{13}.
\tag{1}
$$

These bounds include the already admitted parabolic part of the dispersal proof, up to its transition to the positive-account ballistic cone. They are not assumptions about the ballistic future. Fix one reception radius $a=r(s_*)$ and use

$$
y=aZ,\qquad s-s_*=a^{3/2}\tau,
\qquad \zeta=\epsilon/\sqrt a.
\tag{2}
$$

At reception $|Z|=1$, $|Z'|\le32$ and $\zeta\le2^7\epsilon$. Over a frozen interval of original length $20\epsilon a$, the global speed bound gives $|r(t)/a-1|\le20\cdot2^{13}\epsilon$. Consequently source radii lie between $a/2$ and $2a$, and (1) gives frozen source speeds below 64. The buffered finite-field construction may therefore use $1/4\le|Z|\le8$, $|V|\le128$. The original component-width budget $2^{-10}$ and the field bound $2^{30}$ still give a cost below $2^{58}$ per state derivative: enlarging the velocity bound from 16 to 128 does not approach the acceleration contribution to that cost. Fourteen derivatives in each of eight triangular iterations still give jets below $2^{1000}$ and leave complex width greater than $2^{-11}$.

The safe parameter disk remains $2^{-5010}$. Finite polynomial source displacements there are much smaller than the spatial buffer, and the exact row is bounded by $2^{12}$. Thus the same finite coefficient bounds and comparison consistency constant apply:

$$
|F_n|\le2^{30+5010n},\qquad
|\mathcal T_\zeta[W]-F^{[16]}(Z,V;\zeta)|
\le2^{86000}\zeta^{17}.
\tag{3}
$$

Here $W$ is the short analytic comparison flow attached to reception, with the same present position and velocity. It is discarded after estimating the row. The actual history is not replaced by it.

For $R=Z''-F^{[16]}(Z,Z';\zeta)$ and $S=\sup_{[-20\zeta,0]}|R|$, the same two integrations give position and velocity discrepancies $2t^2S$ and $2tS$ for $t\le10\zeta$. The comparison root derivative is greater than $1/2$, and therefore the delay difference is at most $400\zeta^3S$. The larger comparison speed contributes at most $256\cdot400\zeta^3S$ when transporting the position to the comparison root; this is still less than $\zeta^2S$ at the fixed member. Thus the previous respective-root bounds $2^9\zeta^2S$, $2^5\zeta S$ and $3S$ remain valid. The last one transports only the smooth comparison acceleration and uses its jerk, never an actual seventh derivative.

Connecting source data retain $1/2<L<16$, $|\zeta b|<1/8$, $|\zeta^2A_d|<1/8$ and $D>3/4$. The weighted exact-row Lipschitz constant stays below $2^{20}$. Hence

$$
|R(0)|\le2^{86000}\zeta^{17}
+2^{40}\zeta^2\sup_{[-20\zeta,0]}|R|.
\tag{4}
$$

All integrations and suprema cross the unchanged seams. This proof uses only their acceleration values and the strict root margins.

Let $R_y=y''-F^{[16]}(y,y';\epsilon)$. Homogeneity in (2) gives the global weight

$$
\mathcal R_r(s)=\frac{r(s)^{21/2}}{\epsilon^{17}}|R_y(s)|.
\tag{5}
$$

The radius ratios across the frozen window make the ratio of the $21/2$ powers smaller than two. Consequently (4) implies

$$
\mathcal R_r(s)\le2^{86000}
+2^{41}\zeta^2\sup_{[s-20\epsilon r(s),s]}\mathcal R_r.
\tag{6}
$$

The accepted initial-layer proof supplies $|R_y|<2^{86003}\epsilon^{17}$ throughout $[160\epsilon,200\epsilon]$, where $r^{21/2}<2$. That interval contains the entire first window at $s=200\epsilon$. The left endpoint function now obeys

$$
g(s)=s-20\epsilon r(s),\qquad
 g'(s)=1-20\epsilon p(s)>1/2.
\tag{7}
$$

Later windows therefore cannot reach an uncontrolled earlier layer. Since $2^{41}\zeta^2\le2^{54}\epsilon^2<1/4$, a first exit at $2^{86030}$ contradicts (6). The candidate extension is

$$
\boxed{
|R_y(s)|\le2^{86030}\epsilon^{17}r(s)^{-21/2},
\qquad s\ge200\epsilon,
}
\tag{8}
$$

up to the first failure of the admitted parabolic bounds (1). This estimate does not claim analytic actual source histories. The only enlargement of the earlier finite construction is its velocity buffer, whose operation cost has been accounted for above.

## 2. Exact geometric-angle variables and the remainder near large radius

Let $\phi$ be the actual geometric angle, so $\phi'=h/r^2>0$, and define

$$
w=\frac{h^2}{r},\qquad u=hp,\qquad
\eta=\frac\epsilon h,\qquad
k=\frac{d\log h}{d\phi}=\frac{r^3A_\theta}{h^2}.
\tag{9}
$$

The symbol $\eta$ here uses the raw $h$ and is distinct from the compact-mode parameter $\delta=\epsilon/H$. Direct differentiation gives the exact equations

$$
w_\phi=-u+2wk,\qquad
u_\phi=w+r^2A_r+uk,\qquad
(\log h)_\phi=k.
\tag{10}
$$

Substituting the accepted quadratic and cubic acceleration coefficients, with $g=4/3$, gives

$$
\begin{aligned}
k&=-\eta^2u+g\eta^3w+\text{higher terms},\\
w_\phi&=-u-2\eta^2uw+2g\eta^3w^2+\text{higher terms},\\
u_\phi&=w-1-\eta^2(u^2+w^2/2)-g\eta^3uw+\text{higher terms}.
\end{aligned}
\tag{11}
$$

The exact identity $(\epsilon^2/r)_\phi=-\eta^2u$ shows directly why $H=h\exp(-\epsilon^2/r)$ removes the displayed reversible quadratic term in its logarithmic equation. These identities are transformations of the actual law, not an oscillator substitution.

Write $\Delta k$, $\Delta u_\phi$ and $\Delta w_\phi$ for the effects of the actual remainder (8), after retaining all deterministic coefficients through sixteen. Its weights give

$$
\begin{aligned}
|\Delta k|&\le C\eta^{17}w^{15/2},\\
|\Delta u_\phi|&\le C\eta^{17}
\bigl(w^{17/2}+|u|w^{15/2}\bigr),\\
|\Delta w_\phi|&\le2C\eta^{17}w^{17/2},
\qquad C=2^{86030}.
\end{aligned}
\tag{12}
$$

Indeed $r^3/h^2$ times (8) is $C\eta^{17}w^{15/2}$, and $r^2$ times (8) is $C\eta^{17}w^{17/2}$. On (1), $u^2+w^2\le1024w$. Thus these errors vanish as $w\downarrow0$ inside the parabolic region. In particular, the long physical time of a large-radius passage does not itself blow up this angular remainder. A separate uniform signed last-passage map is still required; (12) only supplies its actual-history perturbation input.

## 3. The suggested leading critical angle is a comparison calculation

The coordinator proposed using the leading central-cycle increments to guide a finite phase-map construction. Its coefficient can be checked directly within that comparison. For the central conic $w=1+e\cos\phi$, $u=e\sin\phi$, with frozen $h$,

$$
\Delta h=\frac{2\pi\gamma}{h^2},\qquad
\Delta E=\frac{2\pi\gamma}{h^5}(1+e^2/2),
\qquad \gamma=\frac43\epsilon^3.
\tag{13}
$$

These follow by integrating $1+e\cos\phi$ and its square over $2\pi$. They are analytical controls for the comparison, not measured increments of the delayed path. Combining (13) with $E=(e^2-1)/(2h^2)$ gives

$$
\frac{d(e^2)}{d\log h}=3e^2,
\qquad
\frac{d(h^3)}{d\phi}=4\epsilon^3.
\tag{14}
$$

The prepared moving-center seed has leading eccentricity magnitude $e_0=(8/3)\epsilon^3$. At the comparison threshold $e=1$, (14) therefore gives $h_c^3\sim(9/64)\epsilon^{-6}$ and

$$
\boxed{\Phi_c\sim\frac9{256\epsilon^9}.}
\tag{15}
$$

Equation (15) is a leading comparison asymptotic. It is not an independently checked actual phase certificate, and its fractional part modulo $2\pi$ cannot be used to classify the member. Even a deterministic relative seed correction of order $\epsilon^2$ changes this leading angle by order $\epsilon^{-7}$. The lower endpoint in the second relation (14) itself contributes an order-$\epsilon^{-3}$ angle. Both dwarf a bounded last-passage phase margin.

## 4. What makes a finite normal form credible, and the exact missing estimate

The value construction removes one specific obstacle: the original $C^{5,1}$ past does not by itself forbid a high-order finite **value** comparison. Equation (8) and its angular version (12) provide a candidate uniform input even at large radius. The number of central cycles therefore does not establish an impossibility result. A finite signed normal form could retain deterministic coefficient effects without iterating every cycle.

Power counting alone remains insufficient. The earlier compact-mode calculation shows that an order-$m$ additive row error can contribute relative seed uncertainty of order $\epsilon^{m-6}$. For $m=17$, the formal relative power is $\epsilon^{11}$; multiplication by the leading angle sensitivity $\epsilon^{-9}$ leaves $\epsilon^2$. This is a favorable power margin for a finite construction, conditional on its explicit constants and sensitivity bounds. It is not yet a theorem that the final phase error has that bound.

The first unsupplied estimate is a correlated finite section map for the deterministic field $F^{[16]}$, together with an explicit stability bound for the actual perturbation (12), from the prepared initial layer to the final near-parabolic passage. It must control the radial amplitude, angle and growing angular scale together. In particular, bounding the retained fourth-through-sixteenth coefficients by magnitude would reproduce the former large phase uncertainty even though the actual remainder is now small.

An adequate finite map has to include the exact preparation-to-$200\epsilon$ input, deterministic seed corrections, reversible angular precession, the signed cycle drift, and a last-section coordinate valid as $e\uparrow1$. It need not express every correction as a pure even-power series: logarithmic or endpoint terms have to be retained if its derivation produces them. A return map asserted only on a compact family of closed central cycles is not uniform at the final parabolic grazing point $w=u=0$.

This is a concrete, finite analytical route, with a now explicit weighted input. No estimate here guarantees that its eventual enclosure separates the selected member from the critical last-passage value. If it did, a signed account/tail argument could classify that member. If its enclosure met the critical value, further precision or an exact identity would remain necessary. Evaluating a large scalar constant to many bits is downstream of this proof obligation; computational size alone neither establishes nor refutes the route.

## Scope, checks and falsifiers

The new candidate result is (8), conditional on the actual parabolic chart (1), together with the exact changes of variables (9)–(12). The coefficient in (15) is comparison-only. The terminal branch remains unresolved. Known analytical controls are the zero-parameter central row, its vanishing first coefficient, the accepted quadratic/cubic coefficients and the two elementary cycle integrals in (13). No target computation, long process, Python invocation or repository publication occurred.

A failure of the enlarged analytic velocity buffer, a frozen window leaving its chart, an incorrect radius homogeneity exponent or an omitted root transport term would falsify (8). An incorrect $r^3/h^2$ or $r^2$ factor would falsify (12). An actual phase claim drawn from (15) without the correlated map and its error bound would exceed this document's claim grade. Independent review is requested only for the new value extension and exact angular transfer, not for an unprovided terminal classification.
