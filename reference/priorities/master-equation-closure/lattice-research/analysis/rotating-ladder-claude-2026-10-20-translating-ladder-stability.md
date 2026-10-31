# Translating ladder: setting up its delayed linear stability problem

Worker note for the Principal Investigator (PI), written 2026-10-20 by the twisted-geometry worker (Claude). It covers the delayed linear stability of the non-rotating translating ladder found in the [twisted-geometry note](rotating-ladder-claude-2026-10-20-twisted-geometry.md), Section 9.

Sections 1 to 8 were written before the spectrum was computed: the derivation and the validated instrument. The PI then admitted the balance, which is now certified (self-reviewed, review pending) in the [translating-ladder certificate](rotating-ladder-claude-2026-10-20-translating-ladder-certificate.md): at $\delta_*$ there is exactly one balance speed $u_*\in[0.8433854,0.8433856]$. Section 9 reports the census of growing roots about that balance, evaluated at $u=-0.8433854760673117$, which lies inside the certified interval. **Every stability statement in Section 9 is conditional on that certificate.**

## Result

1. **Symmetries (derived).** The configuration is invariant under four operations: a shift by $d$ with a half turn; a half turn with polarity exchange; reflection in the plane that contains the axis and the members; and the comoving time shift. Reflection $z\to-z$ is not a symmetry when $u\ne0$; it maps the ladder at $u$ to the ladder at $-u$.
2. **Reduction (derived).** Normal modes reduce to a three-by-three characteristic matrix $\Delta(\lambda;q,p)$ with wavenumber $q$ and sector $p=\pm1$. The reflection splits it into a two-by-two block (radial and axial) and a one-by-one block (tangential). Complex conjugation reduces $q$ to $[0,\pi]$. The ladders at $+u_*$ and $-u_*$ have identical spectra.
3. **Domain (derived).** The defining series converges absolutely for $\operatorname{Re}\lambda\ge0$ and diverges for $\operatorname{Re}\lambda<0$.
4. **Root bound (derived form, measured value).** Every root with $\operatorname{Re}\lambda\ge0$, in every sector and at every $q$, satisfies $\lvert\lambda\rvert\le\Lambda$ with $\Lambda\le2.3966\,c_f/R$. The value comes from float sums plus a proved tail bound.
5. **Symmetry roots (derived and measured).** The symmetries force four zero roots:
   - in the sector $q=0$, $p=+1$: axial translation in the two-by-two block, and rigid rotation about the axis in the one-by-one block;
   - in the sector $q=\pi$, $p=-1$: the two transverse translations, one in each block.

   All four are simple. The rotation root exists only because the radial acceleration vanishes: $\Delta_{yy}(0;0,+1)=-A_r$ exactly.
6. **Instrument validated (measured).** `translating_char.py` passed every control below before any target use. The most stringent is a direct finite-difference check against exact rows evaluated on perturbed paths, which agrees to $10^{-10}$ relative.
7. **Optional check (measured).** At $R=100$ the returning branch also ends at the translating ladder: rotation stops at $\alpha=\pi$ with $d/R=2.508315$ and $\lvert u\rvert\to0.8434$.

## 1. Configuration

Units are $c_f=1$, $K=1$, with lengths and times in units of $R$, so growth rates come out in units of $c_f/R$; there is no angular rate to scale by.

- **Members.** For each rung $k$, member $(\nu,k)$ follows $\mathbf X_{\nu,k}(t)=(\nu(-1)^k,\,0,\,k\delta_*+ut)$, where $\nu=+1$ is positive and $\nu=-1$ negative. Every member has velocity $u\mathbf e_z$ and zero acceleration.
- **Spacing.** $\delta_*=2\pi/\operatorname{arccosh}(3+\sqrt{10})=2.5083135333021804$.
- **Axial speed.** $u=\pm u_*$ with $u_*=0.8433854760673117$ (measured).
- **Closed form for $Z_u$ (derived).** $Z_u(\delta,\pi)=(\pi^2/\delta^2)\bigl[1/6-\cosh y/\sinh^2y\bigr]$ with $y=2\pi/\delta$. Differentiate $\sum_k(-1)^kc/(k^2+c^2)=\pi/\sinh\pi c$ with respect to $c$, using $(c^2-k^2)/(c^2+k^2)^2=-\partial_c[c/(k^2+c^2)]$ and $c=2/\delta$. Setting $\cosh y/\sinh^2y=1/6$ gives $\cosh^2y-6\cosh y-1=0$, hence $\cosh y=3+\sqrt{10}$.
- **Check of that closed form.** Control V0 compares it with the direct series at $\delta=2$, $\delta_*$ and $3.34528$; the differences are below $10^{-12}$, the truncation of the series.
- **The balance at $\delta_*$, $u_*$.** At these values the acceleration at every member is $(9.5\times10^{-17},\,0,\,-4.1\times10^{-17})$ with $\lvert k\rvert\le32000$.

## 2. Symmetries (derived)

Let $\mathcal R$ be the half turn about the axis. The history is invariant under four operations.

- **Screw $S$.** $\mathcal R$ composed with translation by $\delta_*$ along the axis, relabelling $k\to k+1$.
- **Polarity half turn $P$.** $\mathcal R$ with every polarity exchanged, relabelling $\nu\to-\nu$; all polarity products are unchanged.
- **Reflection $M_y$.** $y\to-y$, in the plane that contains the axis and all members. It fixes every member and its velocity $u\mathbf e_z$.
- **Comoving time shift $T_{t_0}$.** $t\to t+t_0$ composed with translation by $-ut_0$.

Reflection in the $yz$ plane is $M_y\circ\mathcal R$ and so equals $P\circ M_y$ up to the polarity exchange; it adds nothing new.

Reflection $z\to-z$ is not a symmetry for $u\ne0$. It maps the configuration with speed $u$ onto the one with speed $-u$ and relabels $k\to-k$. It therefore relates the two signs of $u_*$ and does not act within either.

The time shift is continuous. In the comoving frame the configuration is static, every delay $\tau_j$ is constant, and the first variation has constant coefficients. Unlike the rotating ladder, no rotating frames and no generator $J$ appear.

## 3. Characteristic matrix and its reduction (derived)

**Frames and Bloch ansatz.** Give member $(\nu,k)$ the frame $Q_{\nu,k}=\operatorname{diag}((-1)^m,(-1)^m,1)$ with $m=k+[\nu=-1]$. This is the image of the receiver's frame under $S^kP^{[\nu=-1]}$, and its first axis points radially outward at every member. Because $S$ and $P$ commute and $P^2=1$, normal modes take the form

$$
\boldsymbol\xi_{\nu,k}(t)=p_\nu\,e^{iqk}\,Q_{\nu,k}\,\mathbf c\,e^{\lambda t},\qquad p_+=1,\quad p_-=p=\pm1,\quad q\in(-\pi,\pi].
$$

**First variation of one row.** Take the receiver to be the positive member of rung $0$ at $t=0$. For source $j$, the adjudicated first variation is $\delta\mathbf a_j=L_{u,j}(\boldsymbol\xi_0(t)-\boldsymbol\xi_j(t-\tau_j))+L_{w,j}\,\dot{\boldsymbol\xi}_j(t-\tau_j)$. The matrices $L_u$ and $L_w$ are those of the [independent adjudication](rotating-ladder-delayed-stability-independent-adjudication-2026-10-03.md), with $\mathbf A=0$ and $\mathbf V=u\mathbf e_z$:

$$
L_u=\frac{\sigma}{\tau^2\kappa}\Bigl[I+\frac{(\mathbf V-2\mathbf n)\mathbf n^{\mathsf T}}{D}-\frac{\mathbf r}{\kappa}\Bigl(\frac{1-u^2}{D}\mathbf n^{\mathsf T}-\mathbf V^{\mathsf T}\Bigr)\Bigr],\qquad L_w=\frac{\sigma\,\mathbf r\mathbf r^{\mathsf T}}{\tau^2\kappa^2},\qquad \kappa=\tau D.
$$

The causal delay has the closed form for a uniformly moving source, $\tau=[\mathbf r_0\cdot\mathbf V+\sqrt{(\mathbf r_0\cdot\mathbf V)^2+(1-u^2)r_0^2}]/(1-u^2)$, with $\mathbf r_0$ the present separation. Then $\mathbf r=\mathbf r_0+\mathbf V\tau$.

**The matrix.** Substituting the ansatz into $\ddot{\boldsymbol\xi}_0=\sum_j\delta\mathbf a_j$ gives $\Delta(\lambda;q,p)\,\mathbf c=0$ with

$$
\Delta(\lambda;q,p)=\lambda^2I-\sum_jL_{u,j}+\sum_jp_j\,e^{iqk_j-\lambda\tau_j}\bigl(L_{u,j}-\lambda L_{w,j}\bigr)Q_j .
$$

The perturbed second derivative enters only at the reception time, so the equation is of delayed type, not neutral type.

**Reductions.**
- **Block split.** Every $\mathbf r_j$ lies in the $xz$ plane and $\mathbf V$ is axial, so $L_u$ and $L_w$ have no $y$-coupling, and every $Q_j$ is diagonal. Hence $\Delta$ is block diagonal: a two-by-two block in (radial, axial) and a one-by-one block in tangential. This is the $M_y$ reduction. Measured coupling: exactly $0$.
- **Conjugation.** Because the coefficients are real, $\Delta(\bar\lambda;-q,p)=\overline{\Delta(\lambda;q,p)}$, so $q\in[0,\pi]$ suffices. Roots at a given $q$ need not come in conjugate pairs unless $q\in\{0,\pi\}$. Measured relative difference: exactly $0$.
- **Sign of $u$.** Reflection $z\to-z$ gives $\Delta_{-u}(\lambda;q,p)=Z\,\Delta_u(\lambda;-q,p)\,Z$ with $Z=\operatorname{diag}(1,1,-1)$. Together with conjugation, the spectra at $+u_*$ and $-u_*$ coincide. Measured: $1.9\times10^{-15}$ relative.

**Domain of absolute convergence.** At large $\lvert k\rvert$, $\lVert L_u\rVert=O(\lvert k\rvert^{-3})$ and $\lVert L_w\rVert=O(\lvert k\rvert^{-2})$. The constants depend on direction, because $D$ ranges over $[1-u_*,1+u_*]=[0.157,1.843]$: sources toward which the ladder moves have the small $D$. For $\operatorname{Re}\lambda\ge0$, $\lvert e^{-\lambda\tau_j}\rvert\le1$, so the series converges absolutely, uniformly on compact sets, and $\Delta$ is analytic in the open half-plane and continuous up to $\operatorname{Re}\lambda=0$. For $\operatorname{Re}\lambda<0$ the factor $e^{\lvert\operatorname{Re}\lambda\rvert\tau_j}$ grows exponentially with $\lvert k\rvert$ while the matrices decay only as powers, so the series diverges. Any root with $\operatorname{Re}\lambda<0$ would have to be defined by continuation, which is not attempted. A census must therefore use contours inside $\operatorname{Re}\lambda\ge\varepsilon>0$.

## 4. Root bound (derived form; measured value)

Let $\operatorname{Re}\lambda\ge0$ and $\Delta\mathbf c=0$ with $\lvert\mathbf c\rvert=1$. Every $\lvert p_je^{iqk_j-\lambda\tau_j}\rvert\le1$ and $\lambda^2I$ has smallest singular value $\lvert\lambda\rvert^2$, so

$$
\lvert\lambda\rvert^2\le b_0+b_1\lvert\lambda\rvert,\qquad b_0=\Bigl\lVert\sum_jL_{u,j}\Bigr\rVert+\sum_j\lVert L_{u,j}\rVert,\qquad b_1=\sum_j\lVert L_{w,j}\rVert,
$$

and hence $\lvert\lambda\rvert\le\Lambda=\tfrac12\bigl(b_1+\sqrt{b_1^2+4b_0}\bigr)$. This holds for every $q$ and both sectors, and the norms are unchanged by the orthogonal $Q_j$.

**Tail.** Below wake speed $\tau\ge r_0/(1+V)\ge\lvert k\rvert\delta/(1+V)$ and $D\ge1-V$. Therefore $\lVert L_w\rVert\le(1+V)^2/((1-V)^2k^2\delta^2)$ and $\lVert L_u\rVert\le[1+3(1+V)/(1-V)]/((1-V)\tau^3)$. Summed over $\lvert k\rvert>N$ and both polarities, the tail of $b_1$ is at most $4(1+V)^2/((1-V)^2\delta^2N)$, which is $8.8\times10^{-4}$ at $N=10^5$. The tail of $b_0$ is below $10^{-7}$.

**Values.** The float sums give:

| $N$ | $b_0$ | $b_1$ | $\Lambda$ |
| --- | --- | --- | --- |
| $4000$ | $1.28885249$ | $1.85766$ | $2.39565$ |
| $20000$ | $1.28885251$ | $1.85778$ | $2.39576$ |
| $100000$ | $1.28885251$ | $1.85781$ | $2.39578$ |

Including the tails, $\Lambda\le2.3966$ in units of $c_f/R$. The sums are float, not outward rounded, so this bound is measured in value and derived in form.

## 5. Symmetry roots (derived; measured multiplicity)

Each continuous symmetry produces a solution of the linearized equation with $\lambda=0$:

- **Axial translation** of the whole history. In the sector $q=0$, $p=+1$, two-by-two block, $\mathbf c=\mathbf e_z$, because $Q_j\mathbf e_z=\mathbf e_z$. This is also the comoving time shift.
- **Rigid rotation about the axis.** In the sector $q=0$, $p=+1$, one-by-one block, because $Q_j\mathbf e_y=(-1)^{m_j}\mathbf e_y$ is the rotational displacement of each member.
  - Here $\Delta_{yy}(0;0,+1)=\sum_jL_{u,j,yy}((-1)^{m_j}-1)=-2\sum_{m_j\ \mathrm{odd}}\sigma_j/(\tau_j^2\kappa_j)=-A_r$, since $r_x=1-(-1)^m$.
  - The rotation mode is a root only because the radial acceleration vanishes. Away from the balance it is not a root: at $u=0$ the instrument returns $\Delta_{yy}=0.148256=-A_r$.
- **Transverse translations** by $\mathbf e_x$ and $\mathbf e_y$. In the sector $q=\pi$, $p=-1$, because $p_je^{i\pi k_j}Q_j$ acts as the identity on the transverse directions.

The tilts of the axis about $x$ and $y$ are also symmetries. They generate perturbations growing linearly in $k$ and in $t$, so at fixed $q$ they act as derivatives with respect to $q$ of the transverse-translation roots at $q=\pi$; they force no additional root at fixed $q$. No Galilean boost exists, because a change of $u$ breaks the radial balance.

Measured at $N=4000$:
- **Residuals at $\lambda=0$.** $\lvert\Delta(0)\mathbf c\rvert$ is $0$, $3.4\times10^{-12}$, $2.8\times10^{-17}$ and $1.5\times10^{-17}$ for the four modes. The $3.4\times10^{-12}$ equals $-A_r$ at that truncation.
- **Derivatives at $\lambda=0$.** The $\lambda$-derivatives of the relevant block determinants are $0.2828$ ($q=0$, two-by-two block), $0.1585$ ($q=0$, one-by-one block), $0.2828$ ($q=\pi$, two-by-two block) and $0.3644$ ($q=\pi$, one-by-one block), so all four roots are simple.
- **Unexplained coincidence.** The two two-by-two derivatives agree to $10^{-9}$. I have not derived why; it is plausibly a consequence of the tilt symmetry.

The roots near $q=0$ and $q=\pi$ that continue these four zero roots lie near $\lambda=0$, so a contour at $\operatorname{Re}\lambda=\varepsilon$ can miss growing roots with growth below $\varepsilon$ there. The census will have to report that limit.

## 6. Instrument and controls (measured)

`translating_char.py` builds every source's delay in closed form, its $L_u$ and $L_w$, and $\Delta(\lambda;q,p)$ as above, with $\lvert k\rvert\le N$. One evaluation of $\Delta$ takes $1.3$ ms at $N=4000$, $20$ ms at $N=20000$ and $77$ ms at $N=10^5$. `controls_char.py` ran before any other use, with results in `controls_char_receipt.json`:

- **V0, closed form.** $Z_u(\delta,\pi)$ closed form against the direct series: agreement below $10^{-12}$. $\delta_*=2.5083135333021804$.
- **V1, roots and balance.** Closed-form delays satisfy the root equation to $1.2\times10^{-15}$ relative and agree with an independent 200-step bisection to $1.2\times10^{-15}$. Acceleration at $(\delta_*,u_*)$: below $10^{-16}$ at $N=32000$.
- **V2, static limit, $u=0$.** $L_u$ reduces to $\sigma(I-3\mathbf n\mathbf n^{\mathsf T})/\tau^3$ and $L_w$ to $\sigma\mathbf n\mathbf n^{\mathsf T}/\tau^2$, to $3.5\times10^{-18}$. With $N=12$, $\Delta(0;q,p)\mathbf c$ equals minus the finite-difference response of a separately coded static field to the Bloch displacements, to $2\times10^{-11}$ against entries of size $0.15$ to $0.26$, at $(q,p)=(0,1)$, $(\pi,-1)$, $(0.7,1)$ and $(2.1,-1)$. The static ladder is not a balance; this case tests the matrix only, and no spectrum is claimed for it.
- **V3, direct perturbed-path finite difference at $(\delta_*,u_*)$.** Every source path was perturbed by $\eta\operatorname{Re}[p_je^{iqk_j}Q_j\mathbf c\,e^{\lambda t}]$ and the receiver by $\eta\operatorname{Re}\mathbf c$. Each causal root was re-solved by bisection on the perturbed path, the exact rows were summed with $N=20$, and a central difference was taken with $\eta=10^{-5}$, for both real and imaginary parts. The comparison is with $-(\Delta-\lambda^2I)\mathbf c$ at $(\lambda,q,p)=(0.3+0.7i,0.9,-1)$, $(0.05,0,1)$ and $(0.6-0.4i,\pi,-1)$, with complex $\mathbf c$. The relative differences are $4.2\times10^{-11}$, $8.2\times10^{-11}$ and $6.5\times10^{-11}$, the size of the $\eta^2$ error.
- **V4, symmetry roots.** As in Section 5.
- **V5, closed-form derivatives.** For uniform motion, the derivative of the closed-form row $\sigma(\mathbf r_0+\mathbf V\tau)/(\tau^2\rho)$ with respect to the present separation equals $L_u$. Its derivative with respect to $\mathbf V$ at fixed present position equals $\tau L_u+L_w$. Over 20 random draws with speeds $0.05$ to $0.9$, the largest relative difference is $1.6\times10^{-9}$ (finite-difference step $10^{-6}$).
- **V6 and V7.** The mirror relation for $u\to-u$ holds to $1.9\times10^{-15}$, and the conjugation relation holds exactly.

## 7. Returning branch at $R=100$ (measured)

Newton's method at $\alpha=0.99\pi$, $R=100$, $N=4000$ gives $d/R=2.5095124$, $\omega R=0.0304288$, $u=-0.5631900$. Pseudo-arclength continuation toward $\alpha=\pi$ (80 steps, residuals below $2.1\times10^{-16}$, Jacobian determinant of one sign) crosses $v=0$ between $\alpha/\pi=0.9996288$ and $1.0003437$. At the crossing $d/R=2.508315$ and $u=-0.84281$ to $-0.84289$. The residual offset from $u_*$ matches the predicted $v^2R/\lvert\partial A_r/\partial u\rvert=5.8\times10^{-4}$ at $v=0.0017$. The $R=100$ returning branch therefore ends at the same translating ladder as at $R=10^3$, as the $R$-independence of the endpoint requires. Receipt: `r100_endpoint_receipt.json`. Run time 202 s, under the owned supervisor, status completed.

## 8. Plan for the census (after admission)

The plan is to run the argument principle on the rectangle $\varepsilon\le\operatorname{Re}\lambda\le1.05\Lambda$, $\lvert\operatorname{Im}\lambda\rvert\le1.05\Lambda$, with $\Lambda=2.3966$:

- **Where.** In both sectors and both blocks, at $q=0,\pi/8,\dots,\pi$.
- **Contour sampling.** Refine until no step changes the argument by more than $0.35$ rad, then confirm by halving every step.
- **The counter.** First validate it on a polynomial with known zeros and on $z=c\,e^{-z}$.
- **Sum length.** $N=20000$, checked at $10^5$ for any count near a contour.
- **Near-zero roots.** Track the continuations of the four symmetry roots near $q=0$ and $q=\pi$ separately, because $\varepsilon$ hides growth below $\varepsilon$.
- **Expected run time.** About 36,000 evaluations at 20 ms, roughly 12 minutes, run under the supervisor.

## Limits and falsifiers

- **Scope.** Float only; $\Lambda$ is not outward rounded. No spectrum has been computed. The formula for $\Delta$ is derived from adjudicated rows; its agreement with the perturbed-path finite difference (V3) tests the implementation and the linearization at sampled points.
- **Falsifiers.**
  - A perturbed-path finite difference at any $(\lambda,q,p)$ with $\operatorname{Re}\lambda\ge0$ disagreeing with $-(\Delta-\lambda^2I)\mathbf c$ beyond the finite-difference error would refute the instrument.
  - A nonzero $y$-coupling would refute the block split.
  - $\Delta_{yy}(0;0,+1)\ne-A_r$ would refute the rotation-root identity.
  - A root with $\operatorname{Re}\lambda\ge0$ and $\lvert\lambda\rvert>2.3966$ would refute the bound.

## Files and reproduction

New files, all in [evidence/rotating-ladder-claude-2026-10-20/translating-ladder-stability/](../evidence/rotating-ladder-claude-2026-10-20/translating-ladder-stability/):
- `translating_char.py`, SHA-256 `f605cc353968906c5f1258dd18f8eff2d61a61da22d669a5b05b4268b3478562`;
- `controls_char.py`, SHA-256 `8136f6acac7feef01a5496d286278554bbdf620ae6ebd64a1eaf77598f5e307d`, with receipt `controls_char_receipt.json`; run time 3 s;
- `root_bound.py` with receipt `root_bound.json`; run time 6 s;
- `r100_endpoint_receipt.json`.

The $R=100$ continuation used the frozen `twisted-geometry/continue_branch.py`, unmodified. Its full log is under `.local-data/master-equation-closure/rotating-ladder/claude-2026-10-20/translating-ladder-stability/`. Run everything with `"${AAA_VENV:-../.venv}/bin/python"` from the evidence directory.

## 9. Census of growing roots (measured; conditional on the certificate)

### What was run

The balance is evaluated at $\delta_*=2\pi/\operatorname{arccosh}(3+\sqrt{10})$ and $u=-0.8433854760673117$. Every result below holds at $+u_*$ too, by the mirror relation of Section 3. Growth rates are in units of $c_f/R$.

**Counter controls.** The counter (`census.py`, functions `count` and `contour`) was run on known cases before the target, and returned the known count in each. Receipt: `counter_controls_receipt.json`.

- A polynomial with a double zero, two simple zeros inside and two outside: expected 4, got 4.
- $z=20e^{-z}$, whose roots are $W_k(20)$ from mpmath, on $0.03\le\operatorname{Re}z\le25$, $\lvert\operatorname{Im}z\rvert\le25$: expected 7, got 7.
- An indented contour with a zero on the imaginary axis at $0$ (to be excluded), two zeros inside and one outside: expected 2, got 2.
- The batched evaluation of $\Delta$ agrees with the validated `Ladder.Delta` to $1.4\times10^{-14}$.

**Contours.** The census used the rectangle $e_0\le\operatorname{Re}\lambda\le1.05\Lambda$, $\lvert\operatorname{Im}\lambda\rvert\le1.05\Lambda$, with $\Lambda=2.3966$.

- **Sums.** $N=20000$.
- **Wavenumbers.** $q\in\{0,0.02,0.05,0.1,0.2,\pi/8,\dots,7\pi/8,\pi-0.2,\pi-0.1,\pi-0.05,\pi-0.02,\pi\}$, in both sectors and both blocks.
- **Left edge.** Two choices: $e_0=0.01$ (the planned $\varepsilon$) and $e_0=0$. The second puts the left edge on the imaginary axis, where the series still converges absolutely, and so counts every root with positive real part.
- **Indentation.** At $q\in\{0,\pi\}$ and $e_0=0$, the left edge is indented by a half-circle of radius $0.02$ around the simple symmetry root at $\lambda=0$. Because $\det$ behaves as $a\lambda+o(\lambda)$ there with $a\ne0$ (Section 5), no other root lies in a small enough half-disc.
- **Sampling.** Refined until no step changed the argument by more than $0.35$ rad, then every step was halved and the count repeated. The two counts agree on all 68 contours.
- **Recount.** The 11 near-axis cases were recounted with $e_0=0$ at $N=10^5$ (`census_check.py`); every count is unchanged.
- **Root location.** Roots were located by batched Newton iteration from a $9\times17$ seed grid at $N=4000$, polished at $N=20000$ (`roots.py`), and repolished at $N=10^5$ and $2\times10^5$ (`polish.py`). Every polished root changes by less than $10^{-11}$ between $N=20000$ and $2\times10^5$. The located roots account for every counted root above $e_0=0.01$. A few roots below $0.01$ were found only by the contour. The Newton search clamps iterates to $\operatorname{Re}\lambda\ge10^{-4}$ and keeps only roots above $2\times10^{-4}$, so it could not have found them. That their real parts are below $2\times10^{-4}$ is inferred from that filter and from the small-$q$ scaling laws below.
- **Run times.** The two $N=20000$ censuses took 259 s and 242 s, the $N=10^5$ recount 323 s, and the root location 740 s, all under the owned supervisor with status completed. Polishing took 75 s.

### Counts

Counts per wavenumber, sector and block. Each cell gives the number with growth rate above $0.01$, then, after the slash, the number with positive growth rate.

| $q$ | $p=+1$, (radial, axial) | $p=+1$, tangential | $p=-1$, (radial, axial) | $p=-1$, tangential |
| --- | --- | --- | --- | --- |
| $0$ | $1/3$ | $0/0$ | $3/3$ | $2/2$ |
| $0.02$ | $1/4$ | $0/1$ | $3/3$ | $2/2$ |
| $0.05$ | $1/4$ | $1/1$ | $3/3$ | $2/2$ |
| $0.1$ | $1/4$ | $1/1$ | $3/3$ | $2/2$ |
| $0.2$ | $1/3$ | $1/1$ | $3/3$ | $2/2$ |
| $\pi/8$ | $2/2$ | $1/1$ | $3/3$ | $1/1$ |
| $\pi/4$ | $2/2$ | $1/1$ | $3/3$ | $1/1$ |
| $3\pi/8$ | $2/2$ | $1/1$ | $3/3$ | $1/1$ |
| $\pi/2$ | $2/2$ | $1/1$ | $3/3$ | $1/1$ |
| $5\pi/8$ | $2/2$ | $1/1$ | $2/2$ | $1/1$ |
| $3\pi/4$ | $3/3$ | $2/2$ | $2/2$ | $1/1$ |
| $7\pi/8$ | $2/2$ | $2/2$ | $2/2$ | $1/1$ |
| $\pi-0.2$ | $2/2$ | $2/2$ | $1/2$ | $0/1$ |
| $\pi-0.1$ | $1/2$ | $2/2$ | $1/2$ | $0/1$ |
| $\pi-0.05$ | $1/1$ | $2/2$ | $1/2$ | $0/1$ |
| $\pi-0.02$ | $1/1$ | $2/2$ | $1/2$ | $0/1$ |
| $\pi$ | $1/1$ | $2/2$ | $1/1$ | $0/0$ |

At the nine wavenumbers $0,\pi/8,\dots,\pi$, the number of roots with growth rate above $0.01\,c_f/R$ is 17, 11, 22 and 9 in the four columns, 59 in all.

### Largest growth

The largest growth rate found is $\lambda=0.7819060340\,c_f/R$. It is real, so the mode grows without oscillating, with an $e$-folding time of $1.28\,R/c_f$. It sits at $q=0$, $p=-1$, in the (radial, axial) block, and the largest rate along that branch occurs at $q=0$ (it falls to $0.7115$ at $q=\pi/2$ and $0.6633$ at $q=\pi$).

Its eigenvector is $(c_x,c_z)=(-0.3413,1)$. In the laboratory frame:

- every positive member moves axially by $+1$ and every negative member by $-1$, the same on every rung, so the positive and negative members slide axially against each other;
- every member also moves sideways by $0.341$ toward the side of its rung's negative member, so each rung shifts sideways as a whole.

The next-largest growth rates, by sector and block:

- **$p=+1$, (radial, axial):** a real root rising from $0.5976$ at $q=0$ to $0.7535$ at $q=\pi$. At $q=0$ its eigenvector is $(-0.555,1)$; at $q=\pi$ it is $(-0.402,1)$.
- **$p=+1$, tangential:** up to about $0.243$, with frequency $-0.43$, at $q=5\pi/8$.
- **$p=-1$, tangential:** up to about $0.090$, with frequency $0.44$, at $q=3\pi/8$.

Oscillatory roots with growth near $0.2$ also exist, for example $0.1996\pm0.6223i$ at $q=0$, $p=-1$, and $0.1935\pm0.5816i$ at $q=\pi$, $p=+1$, tangential.

### What the symmetry roots become

All four symmetry roots (Section 5) move into the right half-plane as $q$ leaves $0$ or $\pi$. These roots have growth below about $0.01$ and were tracked by Newton's method and by the $e_0=0$ census.

- **Axial translation** ($p=+1$, (radial, axial)): a real root with $\lambda\approx0.104\,q^2$. Measured values: $2.6\times10^{-4}$ at $q=0.05$, $1.04\times10^{-3}$ at $q=0.1$, $4.08\times10^{-3}$ at $q=0.2$, and $0.0147$ at $q=\pi/8$.
- **Rotation about the axis** ($p=+1$, tangential): $\lambda=0.0050-0.0272i$ at $q=0.02$, $0.0208-0.0568i$ at $q=0.05$, and $0.046-0.088i$ at $q=0.1$. Its growth rises to $0.24$ by $q=5\pi/8$.
- **Transverse translations** ($p=-1$, $q$ near $\pi$): growth $\approx0.034(\pi-q)^2$ in the (radial, axial) block and $\approx0.095(\pi-q)^2$ in the tangential block, with frequencies $\approx0.34(\pi-q)$. Measured values: $0.00135+0.0695i$ and $0.0038+0.0668i$ at $q=\pi-0.2$; $0.0003+0.0339i$ and $0.00095+0.0336i$ at $q=\pi-0.1$.

There is also a weakly growing oscillation $0.00222\pm0.5808i$ at $q=0$, $p=+1$, (radial, axial), unchanged from $N=20000$ to $2\times10^5$.

### What this establishes

The census gives growing characteristic roots with real parts from $10^{-4}$ to $0.78\,c_f/R$, in every sector and at every sampled wavenumber. These are measured roots of the truncated determinant. Each is confirmed to better than $10^{-11}$ at sums of $2\times10^5$ rungs, each lies well inside the region where the series converges absolutely, and each is counted by a validated argument principle.

They establish that the first variation about the translating ladder has exponentially growing formal modes, at about the light-crossing rate of the pair radius, under the following conditions:

- the balance holds, which is certified, self-reviewed, review pending;
- the adjudicated row variation is correct;
- the float evaluations are correct.

They do not establish:

- a complete spectrum: the counts are complete only at the sampled $q$ and only for growth above the contour edge, and roots with growth below about $10^{-4}$ near the symmetry points could be missed;
- anything nonlinear: there is no history-flow argument here;
- that the counts hold between the sampled wavenumbers;
- anything certified: there is no interval enclosure of these roots.

Instability does not depend on completeness, because a single confirmed growing root suffices. The leading root $0.7819$ is real and isolated, its determinant block has a nonzero $\lambda$-derivative, and it is reproduced to ten digits at three sum lengths.

### Comparison with the rotating ladder

The rotating ladder's largest growth rates are recorded in units of its angular rate. They are $0.988\,\omega$ at small speed and $0.567\,\omega$ at speed $0.978$. In units of $c_f/R$, with $\omega=v/R$, these become $0.988v$ and $0.555$ respectively. At small speed $0.988v$ is tiny: $0.0137$ at $R=10^3$.

The translating ladder's $0.782\,c_f/R$ is larger than every growth rate recorded for the rotating ladder when both are expressed at the same pair radius. The mechanism also differs.

- **Rotating ladder at small speed:** its leading mode is the zero-delay reciprocal exchange between neighbouring pairs, at the rotation rate.
- **Translating ladder:** it has no rotation, and its leading mode is the axial sliding of the positive members against the negative members, together with a sideways shift of each rung, all in phase along the ladder.

The translating ladder therefore is not a more stable alternative to the rotating one. Its balance is exact and certified, but it is more violently unstable, with an $e$-folding time of $1.28\,R/c_f$.

### Falsifiers

- An evaluation of $\det\Delta$ in the (radial, axial) block at $q=0$, $p=-1$ that does not vanish at $\lambda=0.7819060340$ beyond float rounding would remove the leading mode. The same holds for any other tabulated root.
- An interval enclosure of the balance excluding $u=0.8433854760673117$ would void the referent. The certificate's interval includes it.
- A perturbed-path finite difference disagreeing with $\Delta$ at the leading root would indicate an instrument error. Control V3 was run at three nearby points, not at the root itself.

### Files

New files, in [evidence/rotating-ladder-claude-2026-10-20/translating-ladder-stability/](../evidence/rotating-ladder-claude-2026-10-20/translating-ladder-stability/), with SHA-256:

| File | SHA-256 |
| --- | --- |
| `census.py` | `31630f450cc0698f7c6c42c2bdd4eb7ed55c924734553d08edb63405d3018ba7` |
| `counter_controls.py` | `859f6c8b06fbf78d456df68b2f721028beef2f311aa5accf0cbf74db344d3bb1` |
| `counter_controls_receipt.json` | `b9a06878f9a83945f2e957ca05c590d43e11752197a18c3d45971c0c8ca3db27` |
| `census_check.py` | `a25188a23410c047aaad428c84be2df969f98e6b0d38e8e29055c86588998c3e` |
| `roots.py` | `6a334966bf9340cfdaaf5b50da7c753c916d13ed908bedf7d5b0c17f21ab9fc0` |
| `polish.py` | `cdd6669ea1bd39162a16c05a8a52cd7b8abe59bb8ddf14e43da855e8109b99bb` |
| `census_receipt.json` (counts) | `1cc066e2648a6c1707889a75dbe9b61bdbd24f556d04e6610a636a0490c7e810` |
| `roots_receipt.json` | `e2b3618e90c767ba41886636366512bafb4d26678c03443ff800df7dead01771` |
| `polish.json` | `d30ec730386a8d5343998d005d15ab5247a771a4547f1b3b6b9b45806232d057` |

Full census output is under `.local-data/master-equation-closure/rotating-ladder/claude-2026-10-20/translating-ladder-stability/`.

**Reproduction.** Run each script from the evidence directory with `"${AAA_VENV:-../.venv}/bin/python"`:

- `counter_controls.py`
- `census.py 20000 0 <out> <progress>`
- `census.py 20000 0.01 <out> <progress>`
- `census_check.py 100000 <out> <progress>`
- `roots.py 4000 20000 <out> <progress>`
- `polish.py <roots.json>`


## Independent review disposition and corrections

Codex reviewed this note as frozen (SHA-256 `cf1702dd474788f46da1fdfad7682f7f77b814479b2b1701de0b9a2484a1e328`) in the [shared review record](../../../../op/agent-chats/2026-10-20-rotating-ladder-six-hour/chat.md), entry 2026-10-20T23:55:33Z. It accepted the first-variation rows (checked against its own differentiation of the closed-form raw row, differences below $7\times10^{-16}$), the block structure, and the reality of the $q=0$ blocks at real $\lambda$; it aggregated the census receipt independently (17, 11, 22 and 9 growing roots, 59 in all, at the nine standard wavenumbers). The PI records the corrections, which supersede the body where they differ.

**Radius scaling (correction, applies throughout this note).** In units of length $R$ and time $R/c_f$ the characteristic pencil is $\mathcal D_R(\ell)=(Rc_f^2/K)\,\ell^2I-\sum_jL_{u,j}+\sum_jw_je^{-\ell\tau_j}(L_{u,j}-\ell L_{w,j})Q_j$, with $\ell=\lambda R/c_f$. The instrument sets the coefficient of $\ell^2$ to one, which is the case $R=1$ at $K=c_f=1$. The balance is the same at every radius (its required acceleration and row sum both vanish), but the first variation is not. Every root bound, count, rate and e-folding time in this note therefore refers to $R=1$, and the statements that these values hold in units $c_f/R$ at every radius, and the comparison with the rotating ladder at the same radius, are withdrawn.

**Growing modes at every radius (derived in review).** Codex enclosed, over the whole certified speed strip and the closed-form spacing, the real radial-axial determinant at wavenumber $0$ in the opposite-motion sector at $\ell=0$ in $[-0.4776880,-0.4775958]$, independent of $R$; for each fixed $R>0$ the delayed sum tends to zero along the positive real axis, so the determinant behaves like $(Rc_f^2/K)^2\ell^4>0$ for large $\ell$, and a positive real characteristic root exists at every radius. No rate bracket, simplicity or ordering at general radius follows.

**Census scope.** The counts are float counts on the sampled contours: refinement agreement and truncation stability are diagnostics, not bounds on unsampled argument excursions or on the infinite determinant, and the observed $10^{-11}$ agreement is not a rigorous error. Running a contour on the imaginary axis is legitimate, but the indentation of radius $0.02$ excludes a half-disc in which roots were not excluded (applied to both blocks in both sectors at $q=0,\pi$, including blocks without a symmetry root); a polynomial control with roots $0$, $0.005$, $0.5$ shows that such an indented counter can miss a small positive root. Failure of a filtered Newton search to find a root is not proof of its absence. "Leading" means the largest growth found in the recorded search. At fixed general $q$, reversing $u$ gives the conjugate spectrum after $q\to-q$, hence the same growth rates.
