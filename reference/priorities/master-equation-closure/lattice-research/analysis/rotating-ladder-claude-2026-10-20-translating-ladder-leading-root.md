# Translating ladder: interval certificate of its leading growing root

Worker note for the Principal Investigator (PI), written 2026-10-20 by the twisted-geometry worker (Claude). It certifies the leading root found in Section 9 of the [translating-ladder stability note](rotating-ladder-claude-2026-10-20-translating-ladder-stability.md), and runs the direct perturbed-path check at that root. The balance about which the system is linearized is the one certified in the [translating-ladder certificate](rotating-ladder-claude-2026-10-20-translating-ladder-certificate.md), which is self-reviewed with review pending. Everything here is conditional on it.

## Result

**Theorem (derived by interval computation).** Consider the non-rotating, untwisted translating ladder. Its spacing is $\delta_*=2\pi/\operatorname{arccosh}(3+\sqrt{10})$, enclosed from the closed form, and its axial speed $\lvert u\rvert$ is any value in $[0.8433854,\,0.8433856]$. Take the delayed first variation with wavenumber $q=0$ in the sector $p=-1$, and its radial-axial block. For every speed in that interval, the determinant of this block has exactly one zero $\lambda$ in $[0.781905,\,0.781907]$, and the zero is simple.

At that zero, $\Delta(\lambda;0,-1)$ is singular. So $\lambda\in[0.781905,0.781907]\,c_f/R$ is a characteristic root, and the first variation has a real, exponentially growing mode with $e$-folding time $1.2789\,R/c_f$ (to the stated bracket). The float value $0.7819060340$ lies inside the bracket. The wider brackets $[0.7819,0.78192]$ and $[0.7818,0.7820]$ are also certified.

**Claim grade.** Derived, by outward-rounded interval arithmetic in mpmath 1.3.0 `iv`, together with proved tail bounds. The correctness of `iv` is a declared primitive dependency. The adjudicated first-variation rows $L_u$ and $L_w$ are taken as the derived linearization; the float control below re-checks them at the root. The theorem is conditional on the balance certificate (self-reviewed, review pending). It is linear only and says nothing about nonlinear growth of nearby solutions.

**How the narrow bracket was certified.** For $[0.7819,0.78192]$ and $[0.781905,0.781907]$, the speed interval was split into 60 equal closed pieces that cover it, and each piece was certified separately as an interval parameter. The bracket $[0.7818,0.7820]$ was certified with the whole speed interval as one parameter.

## Construction (derived)

All quantities are in units with $c_f=1$ and $K=1$, with lengths and times in units of $R$. The member speed below is $V=\lvert u\rvert$.

**Real problem.** At $q=0$ the Bloch phase is $1$ and the sector weight is $p_\nu=\pm1$. Every source's delay, $L_u$, $L_w$ and frame $Q_j=\operatorname{diag}((-1)^m,(-1)^m,1)$ is real. So for real $\lambda$ the matrix $\Delta(\lambda;0,-1)$ is real, and its radial-axial block determinant $f(\lambda)$ is a real function of $\lambda$. For $\lambda>0$ it is continuously differentiable, because the series of $\lambda$-derivatives converges uniformly there: each term carries a factor $e^{-\lambda\tau}$.

**Interval rows.** For each source the following were evaluated in interval arithmetic, with the speed interval as an interval parameter:

- the closed-form causal delay of a uniformly moving source, $\tau=[\mathbf r_0\cdot\mathbf V+\sqrt{(\mathbf r_0\cdot\mathbf V)^2+(1-u^2)r_0^2}]/(1-u^2)$, which is the unique causal root below wake speed;
- the separation $\mathbf r=\mathbf r_0+\mathbf V\tau$, the unit direction $\mathbf n$, $D=1-\mathbf n\cdot\mathbf V$ and $\kappa=\tau D$;
- the rows $L_u$ and $L_w$ with $\mathbf A=0$.

The arccosh is evaluated as $\log(x+\sqrt{x^2-1})$.

**Tail bounds.** Lemma: for a uniformly moving source below wake speed, $r_0/(1+V)\le\tau\le r_0/(1-V)$ and $\kappa=\sqrt{(\mathbf r_0\cdot\mathbf V)^2+(1-V^2)r_0^2}\ge\sqrt{1-V^2}\,r_0$. Bounding each term of the adjudicated $L_u$ with these gives

$$
\lVert L_u\rVert\le\frac{C}{r_0^3},\qquad C=\frac{(1+V)^2}{\sqrt{1-V^2}}+\frac{2(1+V)}{1-V}+\frac{1}{\sqrt{1-V^2}},\qquad \lVert L_w\rVert=\frac1{\kappa^2}\le\frac{C_w}{r_0^2},\qquad C_w=\frac1{1-V^2},
$$

with $r_0\ge\lvert k\rvert\delta$. At the upper speed $0.8433856$ and the lower end of $\delta_*$, $C=31.73$ and $C_w=3.464$.

The undamped part $-\sum_jL_{u,j}$ has a tail over $\lvert k\rvert>N$, both polarities, of at most $2C/(\delta^3N^2)$. At $N=3000$ that is $4.47\times10^{-7}$ per entry.

The damped terms obey $e^{-\lambda\tau}\le e^{-ak}$ with $a=\lambda_{\min}\delta/(1+V)\approx1.06$. Their tail, $4\,(C/(N\delta)^3+C_w/(N\delta)^2)\,e^{-a(N+1)}/(1-e^{-a})$, and the corresponding tail of the $\lambda$-derivative are below $10^{-1000}$.

The total tail bound was added as a symmetric interval to every entry of the block and of its derivative. These bounds are proved; their numerical values were computed in interval arithmetic.

**Certificate logic.** The certificate has two parts.

- **Existence.** $f$ has strictly opposite signs at the two rational bracket endpoints. That holds for every speed in the interval, and the endpoint enclosures include the tails. Since $f$ is continuous, the intermediate value theorem gives a zero in the bracket.
- **Uniqueness and simplicity.** The interval evaluation of $f'$ over the whole bracket, again for every speed and including the derivative tail, excludes zero.

## Controls (run first; `leadroot_controls_receipt.json`)

- **C0, spacing enclosure.** The enclosure of $\delta_*$ has width $1.4\times10^{-20}$. The float value $2.5083135333021804$ lies $6.7\times10^{-16}$ below the enclosure. This is float rounding in `math.acosh`, so the control as first written (requiring the float value to lie inside the enclosure) failed. The interval value is the authoritative one. The failure is recorded here and is not hidden.
- **C1, closed-form rows.** For every source with $\lvert k\rvert\le6$, the interval delay satisfies the root equation: $\tau-\lvert\mathbf r\rvert$ encloses $0$. The float rows from the validated `translating_char.py`, at the point speed, lie inside the interval rows to within $10^{-15}$. The largest interval width per row is $1.9\times10^{-5}$, which is interval dependency on the speed interval.
- **C2, static limit $u=0$.** The interval $L_u$ contains $\sigma(I-3\mathbf n\mathbf n^{\mathsf T})/\tau^3$ for every source tested.
- **C3, symmetry roots at $N=300$, with the $\lambda=0$ tail $4C/(\delta^3N^2)$.**
  - At $q=0$, $p=+1$, the radial-axial determinant at $\lambda=0$ encloses $0$ (the axial-translation root), and so do the entries of $\Delta\mathbf e_z$.
  - At $q=0$, $p=+1$, the tangential entry $\Delta_{yy}(0)$ encloses $0$ (the rotation root, which requires the balance).
  - At $q=\pi$, $p=-1$, the radial-axial determinant at $\lambda=0$ encloses $0$ (the transverse-translation root).
- **C4, float inside interval.** The float determinant at $N=300$ lies inside the interval determinant at $\lambda=0.5$ and at $\lambda=0.7819$.

## Certificate with the speed interval as one interval parameter (`leadroot_cert_N3000.json`)

$N=3000$; run time 22 s.

| Bracket | $f$ at left end | $f$ at right end | $f'$ over bracket | Certified |
| --- | --- | --- | --- | --- |
| $[0.7818,0.7820]$ | $[-1.94,-1.52]\times10^{-4}$ | $[1.33,1.74]\times10^{-4}$ | $[1.6321,1.6340]$ | yes |
| $[0.7819,0.78192]$ | contains $0$ | $[0.19,4.36]\times10^{-5}$ | $[1.6330,1.6333]$ | no, sign undecided |

The narrower brackets fail only because the endpoint enclosures are about $4\times10^{-5}$ wide. That width comes from interval dependency on the speed interval, not from the tail: the tail contributes about $10^{-6}$.

## Perturbed-path check at the root (float; `leadroot_fd_receipt.json`)

The check uses $\lambda=0.7819060339546972$, $q=0$, $p=-1$, at the central speed $0.8433854760673117$ and the float $\delta_*$.

- **Perturbation.** Every source path was perturbed by $\eta\operatorname{Re}[p_jQ_j\mathbf c\,e^{\lambda t}]$ and the receiver by $\eta\operatorname{Re}\mathbf c$. Every causal root was re-solved by bisection, the exact rows were summed over $\lvert k\rvert\le60$, and a central difference was taken with $\eta=10^{-5}$.
- **Eigenvector case.** With the eigenvector $\mathbf c=(-0.34128,0,1)$, the finite difference agrees with the formula $-(\Delta-\lambda^2I)\mathbf c$ to $4.2\times10^{-11}$ relative. It equals $\lambda^2\mathbf c$, which is what a mode requires, to $1.9\times10^{-8}$; that residue is the truncation at 60 rungs. The formula at $N=20000$ gives $\lvert\Delta\mathbf c\rvert=2.5\times10^{-13}$.
- **Random case.** A random complex $\mathbf c$ agrees with the formula to $1.0\times10^{-10}$, and, as it should, it is not a mode.
- **What this establishes.** The exact delayed law, linearized by finite differences of exactly evaluated rows on perturbed paths, reproduces the growing mode itself at the root. This tests the adjudicated linearization at the point that matters, independently of the $L_u$ and $L_w$ algebra.

## Limits and falsifiers

- **Limits.** The certificate is linear and covers one root. Its referent is the balance certificate, which is self-reviewed with review pending. The interval library is a declared dependency.
- **Falsifiers.**
  - An evaluation of $f$ at $\lambda=0.7818$ or $0.7820$, for any speed in the interval, with the same sign at both ends, would refute the certificate.
  - A sharper evaluation of $f'$ that reaches zero inside $[0.7818,0.7820]$ would refute uniqueness.
  - A perturbed-path finite difference at the root that departs from $\lambda^2\mathbf c$ by more than the truncation would indicate a wrong linearization.

## Files

New files, in [evidence/rotating-ladder-claude-2026-10-20/translating-ladder-leading-root/](../evidence/rotating-ladder-claude-2026-10-20/translating-ladder-leading-root/):

- `leadroot_iv.py`, the interval instrument;
- `leadroot_controls.py` and `leadroot_controls_receipt.json`, 2.5 s;
- `leadroot_cert.py` and `leadroot_cert_N3000.json`;
- `leadroot_cert_split.py` and `leadroot_cert_split_N3000_M60.json`, run under the owned supervisor;
- `leadroot_fd.py` and `leadroot_fd_receipt.json`, 2 s.

Run each from that directory with `"${AAA_VENV:-../.venv}/bin/python"`. SHA-256 values are listed in the final section.

## Certificate with the speed interval split into 60 pieces (`leadroot_cert_split_N3000_M60.json`)

$N=3000$; 715 s under the owned supervisor with a 60 s heartbeat, status completed. Every one of the 60 pieces gives strictly opposite endpoint signs and a positive derivative enclosure. The hulls over all pieces are:

| Bracket | $f$ at left end | $f$ at right end | $f'$ over bracket | Certified |
| --- | --- | --- | --- | --- |
| $[0.7819,0.78192]$ | $[-1.10,-0.87]\times10^{-5}$ | $[2.16,2.39]\times10^{-5}$ | $[1.63306,1.63325]$ | yes |
| $[0.781905,0.781907]$ | $[-2.86,-0.58]\times10^{-6}$ | $[0.41,2.69]\times10^{-6}$ | $[1.633115,1.633138]$ | yes |

The tail added to every entry is $4.47\times10^{-7}$ (undamped part); the damped and derivative tails are below $10^{-1000}$. The certified root therefore lies in $[0.781905,0.781907]$ for every speed in $[0.8433854,0.8433856]$. The same holds for the mirror configuration with the opposite sign of $u$, by the reflection relation of the stability note, Section 3.

## SHA-256

| File | SHA-256 |
| --- | --- |
| `leadroot_iv.py` | `f8cfda646e9280df0b55f3ecd49943d3ea50a073207b8d5eaac1e6e3b976222c` |
| `leadroot_controls.py` | `c2a88b71640f898b28af6a55abe4977fff1df8bd6b7ded7bfbf5e37d527c6390` |
| `leadroot_controls_receipt.json` | `1dc9456f836065129fe3d543b2fd7559b4cf75f33f0e6a9b0cbe9bfe60cf9fdc` |
| `leadroot_cert.py` | `40281c3bb0ece02ffbf0b67b81f34c27622bc3d796ba1b8935ce23e446ce59c5` |
| `leadroot_cert_N3000.json` | `af148f7419feec72adbc472daea98f5b3b64161fb55276c39d839479e0b143e4` |
| `leadroot_cert_split.py` | `3e7a604c7fe6f2c222b57d4a153c2bcc9a94882de013b4968992cd8afc3f5a59` |
| `leadroot_cert_split_N3000_M60.json` | `89e3b569aad562462c67174e0480ec7246a1237bb1b3921f076935a8fa0cebec` |
| `leadroot_fd.py` | `bdcfd06c4490df99850e6ffdc1dcd491da3a7ef7f2728ea807d7a937d89cba55` |
| `leadroot_fd_receipt.json` | `4455d58d3e400ec1c5057dddf7e2d2d752bbf7a13843eb8a8fa3a1698bff017a` |


## Independent review disposition and corrections

Codex reviewed this certificate as frozen (note SHA-256 `459a6ffba342b926e9322336c30f3eff930f7e98e215c020ff6b588cee50887c`) in the [shared review record](../../../../op/agent-chats/2026-10-20-rotating-ladder-six-hour/chat.md), entry 2026-10-20T23:55:33Z. It accepted the row formulas, the reality of the block, the local root-certificate logic and the tail lemma (a sharper bound $\lVert L_u\rVert\le r_0^{-3}[(1+V)^2/\sqrt g+(3+V)(1+V)/g]$ with $g=1-V^2$ holds, so $C\le31.73$ is conservative; the damped-tail routine's use of $\lambda\le1$ should be guarded). It found two formal gaps in the frozen split driver: the speed endpoints were converted at default precision before subdivision, so the 60 pieces fell short of the declared upper speed $0.8433856$ by about $4.2\times10^{-17}$, and two tail constants were formed from default-precision conversions that are not guaranteed outward. Its rerun with exact decimal cuts, verified coverage and tail constants built from interval endpoints keeps strict endpoint signs and a positive derivative in all 60 pieces over $[0.781905,0.781907]$, so the bracket is accepted on the provenance of that reviewer receipt. A future driver should use exact cuts and interval tail constants. The derivative proves simplicity in the radial-axial block, not exclusion of other roots of the full matrix.

**Radius scaling (correction, applies throughout this note).** In units of length $R$ and time $R/c_f$ the characteristic pencil is $\mathcal D_R(\ell)=(Rc_f^2/K)\,\ell^2I-\sum_jL_{u,j}+\sum_jw_je^{-\ell\tau_j}(L_{u,j}-\ell L_{w,j})Q_j$, with $\ell=\lambda R/c_f$. The instrument sets the coefficient of $\ell^2$ to one, which is the case $R=1$ at $K=c_f=1$. The balance is the same at every radius (its required acceleration and row sum both vanish), but the first variation is not. Every root bound, count, rate and e-folding time in this note therefore refers to $R=1$, and the statements that these values hold in units $c_f/R$ at every radius, and the comparison with the rotating ladder at the same radius, are withdrawn.

**Growing modes at every radius (derived in review).** Codex enclosed, over the whole certified speed strip and the closed-form spacing, the real radial-axial determinant at wavenumber $0$ in the opposite-motion sector at $\ell=0$ in $[-0.4776880,-0.4775958]$, independent of $R$; for each fixed $R>0$ the delayed sum tends to zero along the positive real axis, so the determinant behaves like $(Rc_f^2/K)^2\ell^4>0$ for large $\ell$, and a positive real characteristic root exists at every radius. No rate bracket, simplicity or ordering at general radius follows.
