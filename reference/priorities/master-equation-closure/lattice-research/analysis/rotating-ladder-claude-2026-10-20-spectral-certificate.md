# Rotating ladder: an interval evaluator of the delayed characteristic matrix, and certificates B1 and B3

## Result

An outward-rounded interval evaluator of the delayed characteristic matrix $\Delta(\lambda;q,p)$ of the untwisted rotating alternating ladder was built from the unchanged Master Equation, validated on seven groups of known cases, and then applied to the admitted balance box B0 at $R=1000$. Over that whole box it certifies the two numerical inputs that the history-flow note's departure theorem asks of this worker.

- **B1 (derived by certified interval computation).** With the rationals $\lambda_{\rm lo}=0.98742\times0.01384081428=0.0136666968363576$ and $\lambda_{\rm hi}=0.98744\times0.01384081428=0.0136669736526432$ (time in units of $R/c_f$), the determinant of the in-plane block $\Delta_\pi$ of the history-flow note is enclosed in $[-2.7288,-2.7250]\times10^{-12}$ at $\lambda_{\rm lo}$ and in $[2.8817,2.8855]\times10^{-12}$ at $\lambda_{\rm hi}$, for every $(\delta,\varepsilon)$ in B0. Its derivative over the whole bracket lies in $[2.02673,2.02686]\times10^{-5}$, so the bracket holds exactly one root and that root is simple. Interval bisection narrows it to $\mu\in[0.013666830919,0.013666832001]$, that is $\lambda_*/\varepsilon\in[0.98742968,0.98742977]$ over the box.
- **B3 (derived by certified interval computation).** With $\mu_0=2\lambda_{\rm lo}$: $\bar b_0\le5.372925236\times10^{-4}$ ($2.80471\,\varepsilon^2$), $\bar b_1\le2.714576749\times10^{-4}$ ($0.0196128\,\varepsilon$), and $h_0=\mu_0^2+\varepsilon^2-\bar b_0-\bar b_1\mu_0\in[3.9397016552,3.9397016769]\times10^{-4}$, that is $h_0/\varepsilon^2\in[2.0565536,2.0565538]$, positive over the box; $\bar b_0>\varepsilon^2$. Exact rational endpoints are in the receipt `stage2-certificates.json` and are authoritative; every decimal displayed here is rounded outward from them (corrected by the PI after review, which found $\bar b_0$ and two unit-coupling sums displayed with inward rounding). JSON fields ending in `_float` and similar reading fields are approximations, not bounds.

The stage-1 instrument also supplies a vertical-line invertibility method with a far-field perturbation bound, a one-dimensional complex Krawczyk test, and a real sign-change test with a derivative enclosure. Their cost was measured at the recorded float balance, where they were exercised as controls and issue no certificate.

**Claim grade.** B1 and B3 are derived results: outward-rounded enclosures computed by mpmath 1.3.0 `iv` (a declared primitive dependency, assumed correct), with every rung $\lvert k\rvert\le N$ enclosed and every rung $\lvert k\rvert>N$ covered by the tail bound proved in Section 3. They rest on four further assumptions: that B0 (relayed by the PI, under independent review) contains the balance; the first-variation matrices $L_u$, $L_w$ of the adjudication (derived and adjudicated there, re-verified here by control C7); the reductions of the existence proof's Lemmas 1 and 2 (derived and adjudicated); and the correctness of this script's assembly, which controls C2, C3 and C7 test against independent references. Everything about the float balance is measured and carries no certificate. No claim is made about the infinite problem's full spectrum, about growth of nonlinear solutions, or about wavenumbers other than those named.

## 1. Setting, units and the matrix

**Units.** Lengths and times are measured in the pair radius $R$ (the unit ladder of the existence proof): radius $1$, spacing $\delta=d/R$, angular rate and member speed $\varepsilon=\omega R$, with $c_f=1$ and $K=1$. In these units the law reads $\ddot{\mathbf x}=R^{-1}\sum_j\sigma_j\mathbf r_j/(\tau_j^3D_j)$, so the coupling is $g=K/R$; the radius enters only there, and the radial balance is $S(\delta,\varepsilon)=\varepsilon^2R$. The evaluator keeps $R$ explicit and computes

$$
\tilde\Delta(\mu)=R(\mu I+\varepsilon J)^2-\sum_jL_{u,j}+\sum_jp_j\,e^{iqk_j}e^{-\mu\tau_j}\bigl[L_{u,j}Q_j-L_{w,j}Q_j(\mu I+\varepsilon J)\bigr],
$$

with $L_u$, $L_w$ the adjudication's matrices at unit coupling and $\mu=\lambda R$. The history-flow note's matrix is $\Delta=\tilde\Delta/R$ (its $L$'s carry $g=1/R$), and the physical matrix is $\Delta_{\rm phys}(\lambda)=R^{-3}\tilde\Delta(\lambda R)$. The public interface takes the growth variable either as $\Lambda=\lambda/\omega$ (then $\mu=\Lambda\varepsilon$ with $\varepsilon$ an interval) or directly as $\mu$ (`units="lt"`), which is how rational brackets are passed.

**Sources and frames (derived; re-derived here and checked against the history-flow note's Section 4, no discrepancy).** The receiver is the positive member of rung $0$ at $(1,0,0)$, time $0$. Source $(\nu,k)$, $\nu=\pm1$, $(\nu,k)\ne(+1,0)$, moves on $(\nu\cos\varepsilon t,\nu\sin\varepsilon t,k\delta)$, has $\sigma=\nu(-1)^k$, and is a positive member exactly when $\sigma=+1$, so $p_j=1$ for $\sigma_j=+1$ and $p_j=p$ otherwise. At the causal root, with $\theta=\varepsilon\tau$: $\mathbf r=(1-\nu\cos\theta,\nu\sin\theta,-k\delta)$, $\mathbf V=\nu\varepsilon(\sin\theta,\cos\theta,0)$, $\mathbf A=-\varepsilon^2\nu(\cos\theta,-\sin\theta,0)$, and the source's own frame (radial, along motion, axial) at emission, expressed in the receiver's frame at reception, is $Q=\begin{pmatrix}\nu\cos\theta&\nu\sin\theta&0\\-\nu\sin\theta&\nu\cos\theta&0\\0&0&1\end{pmatrix}$. The rotation generator is $J\mathbf e_1=\mathbf e_2$, $J\mathbf e_2=-\mathbf e_1$, $J\mathbf e_z=0$. The member's frame turns at rate $\varepsilon$, so a displacement $F(t)\mathbf c\,e^{\mu t}$ has second derivative $F(t)(\mu I+\varepsilon J)^2\mathbf c\,e^{\mu t}$ and source velocity perturbation $F(\mu I+\varepsilon J)\mathbf c\,e^{\mu t}$, which gives the matrix above.

**Causal roots.** Each delay is enclosed by an interval Newton test on $\Phi(\tau)=\tau^2-k^2\delta^2-2+2\nu\cos(\varepsilon\tau)$, uniformly over the parameter box: $N(X)=m-\Phi(m)/\Phi'(X)$ strictly inside $X$ proves a root in $X$, and Lemma 1 of the existence proof proves that it is the only positive root and that the receiver has no root from its own past.

**Three exact reductions (derived).** (i) The reflection $Z=\operatorname{diag}(1,1,-1)$ maps source $(\nu,k)$ to $(\nu,-k)$ with the same delay, and $L_u(-k)=ZL_u(k)Z$, $L_w(-k)=ZL_w(k)Z$, while $Q$ and $J$ commute with $Z$. Pairing $\pm k$ therefore gives $e^{iqk}X+e^{-iqk}ZXZ=\cos(qk)(X+ZXZ)+i\sin(qk)(X-ZXZ)$, which halves the exponentials and, for $q\in\{0,\pi\}$, makes $\tilde\Delta$ and every tail block-diagonal: an in-plane $2\times2$ block and the axial entry. The instantaneous sum $\sum_jL_{u,j}$ is block-diagonal for every $q$. (ii) For $q\in\{0,\pi\}$ every coefficient is real, so $\tilde\Delta(\bar\mu)=\overline{\tilde\Delta(\mu)}$ and invertibility on $\operatorname{Im}\mu\ge0$ implies it on the whole line. (iii) The in-plane block of $P=L_uQ-\varepsilon L_wQJ$ is $(L_u)_\perp Q_\perp-\varepsilon(L_w)_\perp Q_\perp J_\perp$, and the planar blocks of the sources $(\nu,\pm k)$ coincide, which is what B3 sums.

## 2. The evaluator (API)

Module `ladder_spectral_iv.py` (evidence directory below). Interval precision 70 bits.

- `causal_root(nu, k, delta, eps)` returns an interval enclosing the delay, valid for every parameter in the given intervals.
- `source_rows(nu, k, delta, eps)` returns $\tau$, $\sigma$, $L_u$, $L_w$, $Q$, $P$ and $W=L_wQ$ as $3\times3$ interval matrices.
- `Ladder(delta, eps, R=1000, N=400, Ns=20000)` precomputes, for the balance box, the paired rung data for $\lvert k\rvert\le N$ (delayed sum) and the instantaneous sum $\sum L_u$ over $\lvert k\rvert\le N_s$ plus its tail.
- `Ladder.matrix(re, im, q, p, N=None, deriv=False, units="Lam"|"lt")` returns enclosures of the real and imaginary parts of $\tilde\Delta$ over a rectangle in the growth variable (interval or point), for any $q$ (fast real-phase path at $q\in\{0,\pi\}$), and with `deriv=True` also $d\tilde\Delta/d\Lambda$ (or $d/d\mu$). It requires $\operatorname{Re}\ge0$, and $>0$ for the derivative.
- `det3`, `ddet3`, `planar_det`, `norm2_2x2_upper`, `matvec` are interval helpers.
- `real_root_certificate(L, lo, hi, q, p)` performs the sign-change test plus the derivative enclosure over $[\mathrm{lo},\mathrm{hi}]$, and certifies a unique simple real root when both pass.
- `krawczyk_complex(f_and_df, re, im)` is the one-dimensional complex Krawczyk test $K(B)=m-Yf(m)+(1-Yf'(B))(B-m)$. When $K(B)$ lies strictly inside the rectangle $B$, $f$ has exactly one zero in $B$, and it is simple.
- `box_invertible(L, sigma, y0, y1, q, p, centered=False)` proves invertibility on $\sigma+i[y_0,y_1]$ by $\rho=\lVert I-C\tilde\Delta(B)\rVert_F<1$, with $C$ a float inverse at the centre, and returns $\lVert\tilde\Delta^{-1}\rVert_2\le\lVert C\rVert_F/(1-\rho)$.
- `far_line_bound(L, sigma)` returns $b_0,b_1$ with $\lVert\tilde\Delta-R(\mu I+\varepsilon J)^2\rVert_2\le b_0+b_1\lvert\mu\rvert$ on the line, and the threshold beyond which $\lVert\tilde\Delta^{-1}\rVert_2\le1/(R(\lvert\mu\rvert-\varepsilon)^2-b_0-b_1\lvert\mu\rvert)$. The bound uses that $(\mu I+\varepsilon J)^2$ is normal with eigenvalues $(\mu\pm i\varepsilon)^2,\mu^2$.
- `cover_line(L, sigma, q, p, M, h0)` covers $\sigma+i[0,M]$ by adaptive bisection, keeping unresolved boxes as unresolved.

Every float that serves as a bound is rounded outward (`fup`, `fdn`).

## 3. Tail bound (derived)

**Lemma T.** For every source, with $0\le\varepsilon<1$: $\lVert L_u\rVert_2\le C_u/\tau^3$ and $\lVert L_w\rVert_2\le C_w/\tau^2$, where

$$
C_u=\frac1{D_m}\Bigl[1+\frac{2+2\varepsilon}{D_m}+\frac{1+\varepsilon^2}{D_m^2}\Bigr],\qquad C_w=\frac1{D_m^2},\qquad D_m=1-\varepsilon^2 .
$$

*Proof.* $D\ge1-\varepsilon^2$ by Lemma 1(d) of the existence proof, $\lvert\mathbf V\rvert=\varepsilon$, and $\mathbf r\cdot\mathbf A=\varepsilon^2(1-\nu\cos\theta)\in[0,2\varepsilon^2]$ (the in-plane part of $\mathbf r$ and $\mathbf A$ are as above). With $\kappa=\tau D$, $\lvert\mathbf r\rvert/\kappa=1/D$, $\lvert(1-\varepsilon^2+\mathbf r\cdot\mathbf A)/D\rvert\le(1+\varepsilon^2)/D$ and $\lVert\mathbf x\mathbf y^{\mathsf T}\rVert=\lvert\mathbf x\rvert\lvert\mathbf y\rvert$, the three terms of $L_u$ give the bracket, and $\lVert\mathbf r\mathbf r^{\mathsf T}\rVert/(\tau^2\kappa^2)=1/(\tau^2D^2)$. $\blacksquare$

Each $\lvert k\rvert$ carries four sources (two rails, $\pm k$), each with $\tau\ge\lvert k\rvert\delta$ (Lemma 1(c)). For $\operatorname{Re}\mu\ge\sigma_0\ge0$, $\lvert\mu\rvert\le\bar\mu$, $\lVert\mu I+\varepsilon J\rVert_2\le\bar\mu+\varepsilon$ and $\lvert e^{-\mu\tau}\rvert\le e^{-\sigma_0\lvert k\rvert\delta}$, the part of $\tilde\Delta$ from $\lvert k\rvert>N$ and the part of $\sum L_u$ from $\lvert k\rvert>N_s$ have 2-norm, hence every entry modulus, at most

$$
T(N)=4\sum_{k>N}e^{-\sigma_0k\delta}\Bigl[\frac{C_u}{(k\delta)^3}+\frac{C_w(\bar\mu+\varepsilon)}{(k\delta)^2}\Bigr],\qquad T_s(N_s)=\frac{2C_u}{\delta^3N_s^2},
$$

and the derivative's tail is at most $T'(N)=4\sum_{k>N}e^{-\sigma_0k\delta}[(C_u+C_w)/(k\delta)^2+C_w(\bar\mu+\varepsilon)/(k\delta)]$, which needs $\sigma_0>0$; every summand stays decreasing in $\tau$ after multiplication by $\tau$. The sums are bounded by $\sum_{k>N}e^{-ak}k^{-m}\le(N+1)^{-m}e^{-a(N+1)}/(1-e^{-a})$ and, for $m\ge2$, by $\int_N^\infty x^{-m}dx$, whichever is smaller. At $q\in\{0,\pi\}$ the tail is added to the block-diagonal entries only, by reduction (i).

## 4. Controls (all run and passed before any target computation; final module sha256 `08768074…20e4f`)

**C1, interval Newton and causal roots.** At $\varepsilon=0$ the enclosures contain the exact delays $\lvert k\rvert\delta$ and $\sqrt{k^2\delta^2+4}$ ($\delta=3.3$, $k=1,2,5,100,20000$, both rails). At $\varepsilon=0.5$, $\Phi$ changes strict sign across each enclosure widened by $10^{-10}\tau$, which is a separate inclusion test that does not use Newton. The Newton scheme encloses $\sqrt2$.

**C2, static sums with tail at $\varepsilon=0$.** At $\delta=3.3$, 4000 rungs plus the Lemma T tail, the enclosures contain the closed forms of four sums. On the receiver's rail: $(\sum L_u)_{zz}=3\zeta(3)/\delta^3=0.100347016$ (width $1.4\times10^{-8}$), $(\sum L_u)_{xx}=-\tfrac32\zeta(3)/\delta^3$, and $(\sum L_w)_{zz}=-\pi^2/(6\delta^2)$. On the other rail: $\operatorname{tr}\sum L_w=-\pi/(2\delta\sinh(2\pi/\delta))$. These test the rows and the tail bound against theorems.

**C3, symmetry roots at the R = 1000 float balance.** Evaluated both at the point $(3.345035293,0.01384081428)$ and on the box of $\pm$ half a unit in the last printed digit, with $N=N_s=10^4$, residuals in units of $R\varepsilon^2$ (that is, of $\omega^2$ for $\Delta_{\rm phys}$). $\tilde\Delta(0;0,+1)$ annihilates uniform axial translation and rigid rotation: both enclosures contain $0$, width $2.6\times10^{-6}$. $\tilde\Delta(\mp i;\pi,-1)$ annihilates $(1,\mp i,0)$, the uniform in-plane translations: the enclosures contain $0$, width $1.0\times10^{-5}$, set by the $\sigma_0=0$ tail $\propto\varepsilon/N$. The wrong-sector and wrong-vector cases give residuals of $3.65$ (radial vector at $\Lambda=0$), $1.97$ (in-plane translation at $p=+1$) and $0.69$ (axial translation at $q=\pi$), clearly nonzero. The rotation identity holds only because the summed acceleration is exactly centripetal, so it also tests the balance to the stated width.

**C4, zero-delay limit.** An independent float construction of the zero-delay interaction matrix $Z_0$ was made by central differences of the instantaneous static law, $\lvert k\rvert\le20000$, without the first-variation formula. At $\delta_*=3.3452801575$ and $R=S_0/\varepsilon^2$, the evaluator's interaction part $\tilde\Delta-R(\mu I+\varepsilon J)^2$ differs from $Z_0$ by at most $7.6\times10^{-3}$, $7.7\times10^{-4}$ and $7.7\times10^{-5}$ at $\varepsilon=10^{-2},10^{-3},10^{-4}$ ($\lvert Z_0\rvert\approx0.38$), in three sectors including $q=0.85\pi$. That is first-order convergence, as expected. The zero-delay root at $q=0.85\pi$, $p=+1$ is $0.98804\,\omega$ at $\delta_*$ and $0.98811\,\omega$ at $\delta=3.345035293$, which reproduces the adjudication's $0.98811$ (inferred: the adjudication used the $R=1000$ spacing).

**C5, real-root exercise (not a certificate).** At the float box, $q=\pi$, $p=+1$, the root sits at $\Lambda\approx0.9874297208$, in the in-plane block (the axial entry there is $0.058997$). The sign-change test with derivative enclosure $[0.016550,0.016551]$ passes on brackets of half-width $10^{-4}$ down to $10^{-7}$, at about $1$ s per attempt.

**C6, complex Krawczyk.** Known case: $z=20e^{-z}$. The Krawczyk image contracts on $10^{-3}$ boxes, offset from the reference, around the Lambert values $W_0,W_{\pm1},W_2$ of $20$ (computed by mpmath), and contains each of them. Exercise, not a certificate: the in-step pair at $q=0$, $p=+1$ near $\Lambda=0.068885+0.606445\,i$ contracts on boxes of half-width $10^{-4}$, $10^{-5}$ and $10^{-6}$, giving $K\subset[0.0688850,0.0688853]+i[0.6064446,0.6064449]$. **Preserved failure:** the first attempt with $N=400$ did not contract, because at $\operatorname{Re}\Lambda\approx0.07$ the exponential decays only by $e^{-0.0032}$ per rung and the delayed tail bound was $4\times10^{-6}$. It is kept in the receipt; $N=4000$ fixed it.

**C7, the matrix against a direct evaluation.** In float, every member of rungs $\lvert k\rvert\le1500$ was moved by $\eta\operatorname{Re}[F_j(t)\mathbf c_je^{\mu t}]$ with random complex $\mathbf c$, every causal root was re-solved on the perturbed paths, and the receiver's acceleration was differenced centrally. Five cases were run: $(\Lambda,q/\pi,p)=(0.98743,1,+1)$, $(0.5+0.7i,0.3,-1)$, $(1.2-1.3i,0,+1)$, $(0.3+2i,0.77,+1)$ and $(2+0.4i,1,-1)$. The difference from $-(\tilde\Delta-R(\mu I+\varepsilon J)^2)\mathbf c$ falls by a factor of about 100 per tenfold reduction of $\eta$, to between $2\times10^{-11}$ and $6\times10^{-10}$ at $\eta=10^{-5}$, against responses of order $0.2$ to $0.9$. The same holds through the `units="lt"` entry. This check uses the law alone, not $L_u$, $L_w$, and includes general $q$, both sectors and complex $\Lambda$.

The $2\times2$ norm routine returned $\sqrt{45}$, $2$ and $1$ for $\begin{pmatrix}3&0\\4&5\end{pmatrix}$, $\operatorname{diag}(1,-2)$ and $J_\perp$ before it was used.

## 5. Measured cost and recommended truncation

All times were measured on this machine (some runs in parallel, so they depend on load). Precomputation costs about $0.75$ ms per instantaneous source and $1.25$ ms per delayed source: $N=400$, $N_s=20000$ takes $32$ to $58$ s; $N=600$, $N_s=50000$ takes $84$ s. One evaluation at $N=400$ takes $0.05$ s for real $\Lambda$, $0.09$ s with the derivative, $0.14$ s for complex $\Lambda$, and $0.2$ to $0.45$ s for an invertibility test on one box (the centered form takes $0.5$ to $1$ s and gave no benefit here).

**Line pilot (measured; exercise at the float box, not a certificate).** On $\operatorname{Re}\Lambda=1.97486$ (that is, $2\times0.98743$): $b_0=0.781$, $b_1=0.664$ (unit coupling, Frobenius), far-field threshold $M_*=3.055$; with $M=6.2$ the bound gives $\lVert\tilde\Delta^{-1}\rVert_2\le0.230$ for $\lvert\Lambda\rvert\ge6.2$. Boxes of height $0.1$ in $\Lambda$ all passed at first try ($\rho\approx0.08$ to $0.14$). There were 63 boxes per sector, 10 to 22 s per sector, no bisection and no unresolved box. The worst near-field bounds were $2.88$ ($q=\pi,p=+1$), $1.99$ ($\pi,-1$), $2.85$ ($0,+1$) and $2.18$ ($0,-1$), in $\tilde\Delta$ units; multiply by $R$ for the history-flow note's units (for example $2881=0.552/\varepsilon^2$). A full four-sector certificate on a line therefore costs about 2 minutes.

**Recommendation.** Choose $N$ with $e^{-\sigma_0\delta N}\lesssim10^{-12}$, that is $N\ge28/(\sigma_0\delta)$ for $\sigma_0=\operatorname{Re}\mu$. That gives $N=400$ to $600$ for $\operatorname{Re}\Lambda\ge0.98$ and $N\approx4000$ for the slowly growing complex pairs near $\operatorname{Re}\Lambda\approx0.07$. Take $N_s=20000$ ($T_s=5.4\times10^{-10}$) or $50000$ ($8.6\times10^{-11}$). A pairing of successive alternating rungs would improve $T_s$ to order $N_s^{-3}$ (inferred, not built).

## 6. Stage 2: certificates B1 and B3 over B0

**Input.** B0 as relayed by the PI: $\delta\in[3.34503529238,3.34503529306]$, $\varepsilon\in[0.0138408142416,0.0138408143198]$, $R=1000$, $g=10^{-3}$. Its note is the untwisted-certificate worker's; its review is outside this note. The history-flow note's conventions (Section 4 there: $\tau$, $\sigma$, $\mathbf r$, $\mathbf V$, $\mathbf A$, $\kappa$, $D$, $L_u$, $L_w$, $Q_j$, $J$, $(\mu I+\varepsilon J)^2$, the factor $(-1)^m$ for $q=\pi$, $p=+1$) agree term by term with Section 1 here. The only difference is the factor $R$: $\Delta_{\rm note}=\tilde\Delta/R$, so the in-plane determinant is $\det\tilde\Delta_\perp/R^2$ and $b_0,b_1$ are $g$ times the unit-coupling sums. Run with $N=600$, $N_s=50000$: the delayed tails are $7.6\times10^{-19}$ (value) and $1.6\times10^{-15}$ (derivative), and $T_s=8.6\times10^{-11}$, all at unit coupling.

**B1.** The two determinants are strictly negative and strictly positive, as stated in the Result, with relative width about $1.4\times10^{-3}$. The width comes from the parameter box, since the tails are far smaller. The derivative enclosure excludes zero over the bracket, so the root is unique and simple there. Both bracket endpoints are below $\varepsilon_{\rm lo}$.

**B3.** The unit-coupling parts are: $\lVert(\sum L_u)_\perp\rVert_2\le0.205663$ (the cancellation is enclosed, not replaced by $\sum\lVert L_u\rVert$); $\sum_je^{-\mu_0\tau_j}\lVert P_{j\perp}\rVert_2\le0.331631$; $\sum_je^{-\mu_0\tau_j}\lVert W_{j\perp}\rVert_2\le0.271458$; tails below $10^{-28}$. Each $2\times2$ spectral norm is bounded above by $\sigma_{\max}^2=\tfrac12(F^2+\sqrt{F^4-4\det^2})$ with outward rounding on the certified path (general helper displays elsewhere in the module, such as the far-line bound's returned floats, use nearest conversion and are not bounds). The resulting $\bar b_0$, $\bar b_1$, $h_0$ are given in the Result. They agree with the history-flow note's float values ($2.8047\,\varepsilon^2$, $0.019613\,\varepsilon$, $2.057\,\varepsilon^2$) to the printed digits.

**Use.** `departure_constants.py` can be rerun with the box B0, $\lambda_{\rm lo}$ and $h_0$ (lower endpoint $476280705255093186345/2^{80}$), all taken from `stage2-certificates.json`.

## 7. Not shown, and falsifiers

Not shown: any root census or rightmost-root statement; any statement at wavenumbers or sectors other than those computed; any vertical-line certificate on B0 (method and pilot only); anything nonlinear; the correctness of mpmath `iv` or of B0, both of which are assumed.

Falsifiers:

- A parameter point in B0 at which the in-plane $q=\pi$, $p=+1$ determinant at $\lambda_{\rm lo}$ is non-negative, or at $\lambda_{\rm hi}$ non-positive, would refute B1. An independent evaluator of the history-flow note's $\Delta_\pi$ is the place to look.
- A source with $\lVert L_u\rVert_2>C_u/\tau^3$ or $\lVert L_w\rVert_2>C_w/\tau^2$ at a speed below one would refute Lemma T and every tail.
- A direct finite-difference evaluation, as in C7, that disagrees with the matrix by more than its second-order error would refute the assembly.
- An exact closed form outside a C2 enclosure would refute the rows or the tail.
- A float evaluation with longer sums giving $h_0\le0$ anywhere in B0 would refute B3.

## 8. Files, reproduction and state

Evidence directory: `reference/priorities/master-equation-closure/lattice-research/evidence/rotating-ladder-claude-2026-10-20/spectral-certificate/`.

| File | Content |
| --- | --- |
| `ladder_spectral_iv.py` | The evaluator. |
| `controls_stage1.py`, `controls-stage1.json` | Controls C1 to C7, including the preserved failed first Krawczyk attempt. |
| `pilot_line.py`, `pilot-line-sigma1.97486.json` | The line pilot. |
| `stage2_certificates.py`, `stage2-certificates.json` | B1 and B3, with exact rational endpoints and module hashes. |

Reproduction, from that directory, with `../../../../../../../../.venv/bin/python`:

- `controls_stage1.py newton statics direct` took 62 s.
- `controls_stage1.py symmetry` took 144 s.
- `controls_stage1.py realroot zerodelay` took 79 s.
- `controls_stage1.py krawczyk` took 51 s.
- `pilot_line.py 1.97486 0.1 naive 400 out.json` took 90 s.
- `stage2_certificates.py 600 50000` took 86 s.

Superseded runs on the pre-rounding-patch module, which differed only in rounding float bounds to nearest rather than outward, are kept in `.tmp/rotating-ladder/spectral-certificate/` together with the scratch run directories. Nothing is left running.

## Independent review disposition

Codex reviewed the frozen stage-2 certificate (note SHA-256 `66a10c978e871df881b3b99e4f9ef2f85400642f887285baf9bd8c673fb7ee91`, module `08768074feb8ac9ede6317e0b76b8c57c06b9632b367b49e7086f14102920e4f`, receipt `1cc11750d5b7d434017d2dbda5e15d55001479cae0aa17f0d8427e674e00cf01`) in the [shared review record](../../../../op/agent-chats/2026-10-20-rotating-ladder-six-hour/chat.md), entry 2026-10-20T22:43:41Z, and accepted B1 and B3 as interval-computed derived results, conditional on mpmath 1.3.0 `iv` and on the reviewed balance enclosure. It re-derived the tail lemma, checked the assembly of $\Delta_\pi$ (frame factors, the sign of the velocity term, the in-plane block and the factor $R$ relating this matrix to the departure theorem's), confirmed uniformity over the parameter box, reran the frozen certificate (every non-timing receipt field reproduced) and checked roots and all eighteen entries of $L_u$, $L_w$ for seven source labels at two opposite box corners against its own raw-law evaluation. Its one correction concerned displayed decimals that were rounded inward ($\bar b_0$ and two unit-coupling sums); the PI corrected them above, and the exact rational receipt, which the downstream constants script reads, was always sound.
