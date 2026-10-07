# Independent review of centered crossing enclosures on 473 frozen leaves

**Computer-assisted derived and independently accepted for exactly the assigned 473 leaves:** the independent target excludes zero torque on every original unresolved leaf, with no subdivision or pending index. The analytical proof, retained enclosures and scoped limitations follow. This acceptance does not establish the original complete-domain cover.

## Assigned scope and preparation record

This review concerns exactly the 473 original depth-limited unresolved leaves of the authenticated crossing-cover receipt, with every leaf bound unchanged. It does not adjudicate the original 5,521 subject-excluded leaves or thirteen pending larger boxes, and cannot establish a complete-domain cover. The [frozen centered subject](overnight2-b-centered-crossing.md) proposes implicit-root gradients and a centered mean-value enclosure for torque and axial acceleration at the descending height zero. Numerical acceptance remains pending at preparation.

The [independent companion](overnight2-b-independent-centered-crossing.py) imports no subject or root-contractor code. It uses explicit analytic derivatives, a factored scalar kernel, interval Newton on the squared-distance equation with a globally proved secant fallback, and 50-decimal mpmath intervals. This avoids the subject's dual-number implementation and frozen root dependency. The only subject data used as target input are the exact rational bounds and indices of the original 473 unresolved leaves, authenticated by receipt SHA-256 `e160c922d9b2c3652d37934e71b85956d9cab61b24579c62cfc1fe65c1602339`.

The source was prepared while the parent held the numerical slot. Before any numerical stage, the parent explicitly reported that its target had closed and released the slot. The declared independent sequence is known controls, a measured eight-leaf pilot on indices zero through seven, then all 473 leaves without subdivision if the pilot supports the budget. Each numerical stage has an 840-second internal deadline within a 900-second supervisor deadline, 512 MiB resident cap, 8 MiB receipt cap and one numerical thread. Advancing leaf/root counts are emitted every five seconds. Routine known controls may run synchronously; supervised pilot/target execution will retain owned leases and logs when needed.

Known controls cover exact leaf parsing and rejection, interval square versus product, a nonzero coordinate map with exact rational partials, all five static chord squares, static fields and gradients $T_\beta=19/12$, $Z_\eta=-133/48$, a nonstatic closed-form crossing root and its three implicit derivatives, and a known quadratic centered inclusion. Known success and matching source identity gate both later stages; a matching pilot receipt additionally gates the full target. Operational completion and scientific exclusion flags are separate. Partial rows and pending original indices are retained on caught failures. Existing receipts are never overwritten.

Only this new report, its independent companion and fresh evidence under `.local-data/master-equation-closure/overnight2-b/independent-centered-crossing/` are assigned to this reviewer. All original subjects, root code, prior reports, receipts, parent account and shared owners remain read-only. No Git mutation, generator, delegation or orbit evolution is part of the work.

The independent known stage passed every declared control before pilot or target use. It returned exit zero in 0.015615 internal seconds with 27,672,576 bytes peak resident memory under the shared executable venv and one numerical thread. Instrument SHA-256 is `f15fe190bb85be4b8a7f1b8140c1748db04f540e5f5fa510a6705f180b56156a`; known receipt SHA-256 is `0bf66457595c64ff4a0c90867b36dc75dbc14078cd3e45ed6610f8eb4c697a8f`. The built-in compile check accepted the source before this execution without writing bytecode. This recorded pass licenses the predeclared eight-leaf pilot only.

The supervised eight-leaf pilot completed all assigned indices with strict torque exclusion and no pending index. It measured 0.192543 internal seconds, 45,154,304 bytes peak resident memory and 63,259 receipt bytes. Receipt SHA-256 is `71c1e1e8e53311e778db2699813e517841bca33986fe33b8c4e8b20cbdb6669b`. Supervisor run `be5cdb80-c357-4d21-a7ed-18f83ac9ad5c` returned exit zero, zero stderr and a closed process group in 0.248 supervised seconds. Linear projection to 473 leaves is about 11.4 internal seconds and 3.8 MB of output, within the declared limits. These are planning projections rather than measured target cost or a guarantee of its signs. The recorded pilot supports running the unchanged full 473-leaf target sequentially.

## Complete chart and the moving reception convention

The parameters are $p=(H,\beta,\eta)$ in
$$
\frac1{10}\le H\le\frac56,\qquad \frac1{20}\le\beta\le\frac45,\qquad \frac1{10}\le\eta\le1,
$$
with
$$
\nu=\frac{19}{20},\qquad s(\beta)=\sqrt{\nu^2-\beta^2},\qquad v=\eta s,\qquad \kappa=\frac{\eta s}{H}.
$$
Since $s^2\ge\nu^2-(4/5)^2=21/80>0$, the map is smooth on a neighborhood of each leaf. The physical speed of the unit-radius cosine-height histories obeys
$$
|V|^2\le\beta^2+H^2\kappa^2=\beta^2+\eta^2(\nu^2-\beta^2)\le\nu^2<1.
$$
At the descending height zero, every equal-time partner chord is at least one. Complete positions lie in a ball of radius $\sqrt{1+H^2}$. The global decreasing-gap argument therefore gives exactly one positive ordinary root per partner, no positive self root and
$$
\frac{20}{39}\le d_j\le2\sqrt{1+H^2},\qquad \frac1{20}\le D_{s,j}\le\frac{39}{20}.
$$
These are uniform chart bounds, not point estimates from a numerical root finder. Every segment from a leaf center to any other point of the leaf stays in the rectangular parameter domain, preserving the speed and divisor bounds.

Reception phase is fixed at $\phi=\pi/2$ while parameters vary. Its physical time may change, but the exact relative geometry already removes the common planar rotation and evaluates the source phase relative to that reception. For partner $j$,
$$
\alpha=\frac{j\pi}{3}-\beta d,\qquad \ell=\kappa d,
\qquad Q=(1-\cos\alpha,-\sin\alpha,-\sigma_jH\sin\ell),\quad\sigma_j=(-1)^j.
$$
Thus
$$
q(d,p)^2=4\sin^2(\alpha/2)+H^2\sin^2\ell.
$$
The delayed source velocity is $(-\beta\sin\alpha,\beta\cos\alpha,-\sigma_jH\kappa\cos\ell)$ in this receiver frame. Its contraction with $Q$ is $-\beta\sin\alpha+H^2\kappa\sin\ell\cos\ell$. At a root $q=d$,
$$
D_s=1+\frac{\beta\sin\alpha-H^2\kappa\sin\ell\cos\ell}{d}.
$$
This is the source divisor from the canonical law; there is no receiver factor. Both prescribed tangential and axial accelerations vanish at this reception. Hence a strict sign of either complete dimensionless component excludes exact balance at every positive scale, regardless of the radial equation.

## Independent root enclosure

The independent implementation starts from the complete chart interval and uses the squared root equation
$$
F(d,p)=4\sin^2[(j\pi/3-\beta d)/2]+H^2\sin^2(\kappa d)-d^2,
$$
whose delay derivative is
$$
F_d=-2\beta\sin\alpha+2H^2\kappa\sin\ell\cos\ell-2d.
$$
For a current interval $I$ containing every root of the leaf and its exact rational midpoint $m$, whenever the interval for $F_d(I,B)$ is strictly negative, the parameterwise mean-value theorem gives
$$
d(p)\in m-\frac{F(m,B)}{F_d(I,B)}.
$$
Intersecting this interval with $I$ preserves every root. Squaring does not select a spurious positive solution because $F=(q-d)(q+d)$ and $q+d>0$ on the positive initial interval.

If the squared derivative interval contains zero, the implementation uses the independently known complete gap secant magnitudes $[1/20,39/20]$:
$$
d(p)\in m+\frac{q(m,B)-m}{[1/20,39/20]}.
$$
This fallback is inclusive without differentiating the norm at an accidental zero separation. Both steps use outward interval evaluation over the full parameter box. A midpoint is represented by an interval containing its exact rational value; this can widen the image but cannot remove the true midpoint evaluation. Finite termination or stagnation retains inclusion and does not imply a precision-based sign result. Empty intersections fail the calculation. No root or contraction result is imported from the subject.

The source records its squared-equation Newton and global-secant step counts, as well as all five root intervals at both the whole box and the exact center. Its use of the known global source-divisor range is an analytical bound on the actual parameterized histories even when independent interval evaluation of $H$, $\beta$ and $\kappa$ loses their correlations.

## Explicit implicit-root and component gradients

Let $\delta_{iH}$ and $\delta_{i\beta}$ indicate the height and rate coordinates among $(H,\beta,\eta)$. Direct differentiation gives
$$
\kappa_H=-\frac\kappa H,\qquad
\kappa_\beta=-\frac{\eta\beta}{Hs},\qquad
\kappa_\eta=\frac sH.
$$
At fixed delay,
$$
q_{p_i}=\frac{-d\sin\alpha\,\delta_{i\beta}+H\sin^2\ell\,\delta_{iH}+H^2\sin\ell\cos\ell\,d\kappa_i}{q}.
$$
The root equation $q(d(p),p)-d(p)=0$ yields
$$
(q_d-1)d_i+q_{p_i}=0,
\qquad q_d-1=-D_s,
\qquad \boxed{d_i=\frac{q_{p_i}}{D_s}.}
$$
The sign is positive. Using $q=d$ only to evaluate this exact derivative at the root gives the independent implementation's explicit formula
$$
\boxed{d_i=\frac{-\sin\alpha\,\delta_{i\beta}+(H/d)\sin^2\ell\,\delta_{iH}+H^2\sin\ell\cos\ell\,\kappa_i}{D_s}.}
$$
This substitution does not differentiate $q=d$ as if delay were constant. It simplifies a first-derivative expression already evaluated on the implicit root.

For a full parameter derivative, put
$$
\alpha_i=-d\,\delta_{i\beta}-\beta d_i,\qquad
\ell_i=d\kappa_i+\kappa d_i,
\qquad W=dD_s=d+\beta\sin\alpha-H^2\kappa\sin\ell\cos\ell.
$$
Then
$$
\begin{aligned}
W_i={}&d_i+\delta_{i\beta}\sin\alpha+\beta\cos\alpha\,\alpha_i\\
&-(2H\delta_{iH}\kappa+H^2\kappa_i)\sin\ell\cos\ell
-H^2\kappa\cos(2\ell)\ell_i.
\end{aligned}
$$
The two canonical row numerators are $N_T=-\sigma_j\sin\alpha$ and $N_Z=-H\sin\ell$. Their derivatives are
$$
(N_T)_i=-\sigma_j\cos\alpha\,\alpha_i,\qquad
(N_Z)_i=-\delta_{iH}\sin\ell-H\cos\ell\,\ell_i.
$$
For either numerator, the exact row and derivative are
$$
F_j=\frac{N}{d^2W},\qquad
\boxed{(F_j)_i=\frac1{d^2W}\left[N_i-N\left(\frac{2d_i}{d}+\frac{W_i}{W}\right)\right].}
$$
The independent source evaluates these formulas directly for all three coordinates and sums all five rows. It does not implement a dual-number algebra.

At actual roots the computed value interval for $D_s$ may be intersected with $[1/20,39/20]$. Likewise $W$ may be intersected with the product of the root interval and that valid divisor interval. These are inclusions for the values of the original functions. The displayed exact formula supplies $W_i$ without differentiating either intersection. This is the same mathematical distinction required by the subject: differentiating an artificial clipping operation would be invalid, but narrowing a known value range before interval substitution is valid.

The uniform positive divisor and smooth coordinate map make the roots and resulting fields continuously differentiable on neighborhoods of the closed leaves. Parameter endpoints cause no failure of the implicit-function theorem: the speed margin to one persists in a sufficiently small open neighborhood. The derivatives are those of the complete crossing geometry at its parameter-dependent reception, not derivatives of a solution trajectory in physical time.

## Centered mean-value inclusion

For either complete component $F=T$ or $F=Z$, let $c$ be the exact rational leaf center. The straight segment $c+s(p-c)$ stays in the leaf and its admitted chart. Therefore
$$
F(p)-F(c)=\int_0^1\sum_{i=1}^3F_i(c+s(p-c))(p_i-c_i)\,ds.
$$
If $G_i(B)$ encloses each full derivative on the whole leaf, then
$$
F(B)\subseteq F(c)+\sum_iG_i(B)[-r_i,r_i],\qquad r_i=(B_i^+-B_i^-)/2.
$$
The independent center value is computed with its own interval roots at exact rational parameter coordinates. It is not treated as an exact floating sample. Interval integration needs no quadrature: every derivative along the segment lies in its retained interval, and the segment parameter has length one. All coordinate products and their sum are enclosed outward.

Intersecting this centered enclosure with the independently inclusive direct value enclosure remains inclusive. If either resulting component interval excludes zero, the entire leaf is incompatible with the two necessary zero components at the crossing. Interval overestimation may leave a valid leaf unresolved, but may not be interpreted as a physical obstruction without a strict component sign. There is no theorem guaranteeing a fixed improvement in interval width; the measured target determines which leaves close.

## Independent known-case derivations

The known static control is the smooth crossing-chart extension at $\beta=\eta=0$: after choosing the reception phase as $\pi/2$, the relative geometry is a flat static alternating hexagon. This is a closed-form control of the parameterized crossing formulas, not an assertion that the target domain contains zero rates. Its chord lengths are $d_j=1,\sqrt3,2,\sqrt3,1$ and $D_s=1$.

Write $s_j=\sin(j\pi/3)$ and $c_j=\cos(j\pi/3)$. The explicit root derivative gives $d_{j,\beta}=-s_j$, with height and fraction derivatives zero. For $W=d+\beta s_j-H^2\kappa\sin\ell\cos\ell$, one has $W_\beta=d_\beta+s_j=0$ at this static control. Thus
$$
(T_j)_\beta=\frac{\sigma_jc_j}{d_j^2}-\frac{2\sigma_js_j^2}{d_j^4}
=-\frac{\sigma_j}{d_j^2},
$$
using $c_j=1-d_j^2/2$ and $s_j^2=d_j^2-d_j^4/4$. Summing gives
$$
T_\beta=2-\frac23+\frac14=\frac{19}{12}.
$$
Also $\kappa_\eta=\nu/H$, $d_\eta=0$, and $(N_Z)_\eta=-H d_j\kappa_\eta=-\nu d_j$. Hence
$$
Z_\eta=-\nu\sum_jd_j^{-2}
=-\frac{19}{20}\left(2+\frac23+\frac14\right)=-\frac{133}{48}.
$$
The complete static fields vanish; the other two torque derivatives and the height/rate axial derivatives vanish. All these values were checked before target use.

A distinct coordinate control uses $(H,\beta,\eta)=(2,57/100,1/2)$, for which $s=19/25$, $\kappa=19/100$ and $(\kappa_H,\kappa_\beta,\kappa_\eta)=(-19/200,-3/16,19/50)$ exactly.

The nonstatic root control uses $H=1/2$, $\beta=0$, $\eta=10\pi/(19\sqrt5)$, channel $j=1$, $\kappa=\pi/\sqrt5$ and $d=\sqrt5/2$. Then $\alpha=\pi/3$, $\ell=\pi/2$, $q^2=5/4=d^2$ and $D_s=1$. Directly the root derivatives are $d_H=1/\sqrt5$, $d_\beta=-\sqrt3/2$ and $d_\eta=0$. Their signs and exact squared magnitudes were checked independently of the static cancellations. This control still has speed below $19/20$ and a complete ordinary chart. The known stage also checked parsing/rejection and a centered enclosure of a quadratic with an analytically known range.

## Completed target and exact acceptance boundary

The independent target processed all original unresolved indices zero through 472 once. Every one of the 473 exact original boxes had a torque interval strictly excluding zero; none needed the axial alternative, further subdivision or a pending disposition. The target's exact boxes, original indices, direct and center values, full derivative intervals, final centered intersections, and whole-box/center root enclosures are retained in its receipt. That receipt is the detailed sign certificate; no sampled center value substitutes for a full-leaf statement.

Target SHA-256 is `18f127fa738ae3c5ccf9e2cb34a1e1f84917179f1a7107a261314ca79033082f`. It reports completed and successful execution, all assigned leaves excluded, all assigned leaves torque-excluded, 473 rows, zero pending indices and no failure. It measured 10.368807 internal seconds and 45,219,840 bytes peak resident memory. Native `wc -c` measured 3,688,205 bytes for the target receipt; known and pilot receipts are 4,804 and 63,259 bytes, totaling 3,756,268 retained independent receipt bytes.

Supervisor run `72d19200-0e60-4098-be35-b46d4bcf243c` closed with exit zero, zero stderr and `processGroupClosed: true` in 10.440 supervised seconds. Its advancing progress outputs recorded 229 then 457 completed and excluded leaves, followed by the final 473-leaf result. The pilot supervisor was already terminal before this target began. No reviewer-owned numerical job remains running; the slot was explicitly released to the parent after target closure. The supervisor establishes lifecycle completion, while the separately derived interval formulas and known-first result establish this bounded scientific claim.

The accepted conclusion is exactly the exclusion of these 473 original unresolved leaves in the canonical crossing geometry. It neither accepts the original 5,521 subject-excluded leaves nor disposes of the thirteen pending larger boxes. It also does not validate the original cover's complete partition, impose a global compact-domain obstruction, or establish any exact orbit or stability conclusion. Those are separate obligations even though this method closes its assigned input collection.

## Arithmetic boundary, provenance and falsifiers

The independent source uses mpmath 1.3.0 outward interval primitives, as does the subject. This shared arithmetic library is an explicit dependency rather than a second independent rounding implementation. The distinct root equation contractor, explicit derivative formulas, factored kernel, precision and retained known cases provide implementation independence above that layer. The relevant interval arithmetic, powers and transcendental primitives were inspected in the preceding thin-height review and remain the same installed library; this is not formal verification of every mpmath routine. Exact rational endpoints determine every recorded sign, and the successful source was unchanged after its known pass.

Native `shasum -a 256` records the following frozen identities:

| Item | SHA-256 |
| --- | --- |
| Subject Markdown | `a928ffcd9958dff20069bc3e455ba605e2b7410ff2412d86f88ebc77e39d1bc3` |
| Subject centered instrument | `f72acdc4025c8ee4e401ea1d7005e236e0776918ed9ce5e0ea07d85ec085265f` |
| Subject root dependency, not imported | `8f2716b7d0819970a63d5b5bbc67246503d147b66b766122c52dd4e4c52b244b` |
| Original input cover receipt | `e160c922d9b2c3652d37934e71b85956d9cab61b24579c62cfc1fe65c1602339` |
| Subject centered target receipt | `0ecfd0c21a13268e3901756c14b4a8f8ee7ba6ac24eed4304e62751e9f73eb21` |
| Independent instrument | `f15fe190bb85be4b8a7f1b8140c1748db04f540e5f5fa510a6705f180b56156a` |
| Independent known receipt | `0bf66457595c64ff4a0c90867b36dc75dbc14078cd3e45ed6610f8eb4c697a8f` |
| Independent pilot receipt | `71c1e1e8e53311e778db2699813e517841bca33986fe33b8c4e8b20cbdb6669b` |
| Independent target receipt | `18f127fa738ae3c5ccf9e2cb34a1e1f84917179f1a7107a261314ca79033082f` |

An admitted parameter point in one of the retained boxes with zero torque would falsify its independently signed enclosure. Other direct falsifiers are a missing root, a root outside its retained interval, a wrong implicit derivative sign, a source/receiver divisor substitution, an invalid differentiation of a clamp, a parameter derivative outside its whole-box interval, or a direct/centered range failing to contain the actual field. Wrong input identity, a changed box, a missing original index or an unrecorded pending index would invalidate the asserted 473-leaf disposition. Agreement with the subject alone is not evidence for any of these obligations.

Only this report and its independent companion were authored, with fresh assigned receipts and supervisor-managed operational leases/logs. No prior receipt was overwritten or removed. The original partial cover, unresolved leaves, pending boxes, subject outputs and all failed or incomplete historical outcomes remain preserved. The parent account and shared owners were read-only. Source compile and native whitespace checks cover these two new files only; no repository-wide check or generator was run. Final native hashes verify the stated immutable source and receipt identities. No Git mutation, recursive agent, orbit solver or numerical proposal search was used.

The instrument refuses reuse of retained receipt paths. A future reproduction needs its own explicitly assigned fresh execution/evidence arrangement and known-first sequence; this review authorizes no alteration or deletion of the frozen successful source or receipts. Parent integration is the remaining disposition step for this accepted bounded result. Wider cover verification remains open outside this review.
