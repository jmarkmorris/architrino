# Root and axial constraints on a translating planar carrier

## Model and geometry

Use the unchanged Master Equation, with numerical wake-speed units $c_f=1$. Consider a finite isolated inventory with paths

$$
\mathbf X_i(T)=(UT+\chi_i)\hat{\mathbf x}+\mathbf y_i(T),
\qquad \mathbf y_i\cdot\hat{\mathbf x}=0.
$$

Here $U=c_\gamma/c_f$ is constant, the axial offsets $\chi_i$ are constant over the entire relevant past, and transverse histories are continuously differentiable. This fixed-plane assumption excludes axial internal motion. It includes the prescribed moving pair, but not every possible photon history. Sources outside this inventory are absent.

For delay $u=T-S>0$, define $\delta_{ij}=\chi_i-\chi_j$, $\boldsymbol\rho_{ij}(T,u)=\mathbf y_i(T)-\mathbf y_j(T-u)$ and $r=|\mathbf X_i(T)-\mathbf X_j(S)|$. The causal equation is

$$
r^2=(\delta_{ij}+Uu)^2+|\boldsymbol\rho_{ij}(T,u)|^2=u^2.
$$

The transverse separation generally depends on the unknown delay. Treating it as constant can give a false explicit root count. An ordinary root has $r>0$ and $D_t=1-\mathbf n\cdot\mathbf V_j(S)\ne0$, where $\mathbf n=(\mathbf X_i(T)-\mathbf X_j(S))/r$. Its acceleration contribution is $\sigma_{ij}K\mathbf n/(r^2|D_t|)$, with $K>0$ and $\sigma_{ij}=q_iq_j$. Include every admitted positive-delay self root with $\sigma_{ii}=1$.

Claim grade: derived on this declared ordinary chart, self-reviewed here, without independent adjudication or a numerical target run. Persistent singular contacts require the governing regularized treatment; this note does not assign them zero acceleration or an extra response rule.

## Leading-plane obstruction at wake speed

At $U=1$ the root equation becomes

$$
\delta_{ij}^2+2\delta_{ij}u+|\boldsymbol\rho_{ij}(T,u)|^2=0.
$$

For $\delta_{ij}>0$ every term is nonnegative and the first is positive, so no positive root exists. For $\delta_{ij}=0$, a root requires $\boldsymbol\rho_{ij}=0$. Then $r=u$, $\mathbf n=\hat{\mathbf x}$ and $D_t=1-V_{j,x}=0$. These contacts are singular, including any positive-delay self contact. For $\delta_{ij}<0$, a possible root satisfies

$$
u=\frac{\delta_{ij}^2+|\boldsymbol\rho_{ij}(T,u)|^2}{2|\delta_{ij}|},
$$

which remains implicit when the transverse history changes.

A finite inventory has a leading plane $\chi_i=\max_j\chi_j$. Its members have no ordinary received contribution at wake-speed translation. On a history where the ordinary equation applies and no singular contact needs additional treatment, their acceleration must therefore vanish. A nontrivial transverse circle requires $\ddot{\mathbf y}_i=-\omega^2\mathbf y_i\ne0$ and cannot satisfy that equation. If transverse recurrence creates singular contacts instead, the simple-root sum ceases to apply; that is an obstruction to an ordinary solution, not a cancellation proving zero acceleration.

For $U>1$, the causal equation at the leading plane has the additional positive term $(U^2-1)u^2$, so even the equal-offset contacts are absent. Thus an isolated fixed-plane circular pair with curved leading histories can only seek an ordinary solution at $0\leq U<1$. This is not a universal carrier-speed bound: other longitudinal geometry, external sources and a separately justified generalized response lie outside the proof. Nor does it establish a unique environmental route to observed light speed.

## Why the helical boundary example is singular

For a nonzero-radius circular transverse path with angular frequency $\omega\ne0$, the self-root equation at $U=1$ reduces to

$$
4R^2\sin^2(\omega u/2)=0.
$$

Positive roots occur at $u=mP$, where $P=2\pi/|\omega|$ and $m$ is a positive integer. Each has $D_t=0$; they recur at every reception time, rather than being an isolated ordinary caustic transit. A straight transverse-constant path instead has a continuum of singular self contacts. Neither permits replacing $1/|D_t|$ with zero.

This explains the exact geometry behind zero phase spread in the [historical sweep's boundary example](../evidence/helical-self-hit-phase-lock-sweep.receipt.v1.json). The stored finite-root count and nonzero numerical minimum Jacobian remain historical diagnostic outputs, not exact root counts or an exact evaluation of $D_t$. No raw rows or sweep were recomputed here.

## Exact axial balance identity

At any ordinary root $r=u$, so

$$
n_x=U+\frac{\delta_{ij}}r.
$$

Define the signed total scalar weight and the cross-plane axial correction by

$$
S_i=\sum_{j,u}\frac{\sigma_{ij}K}{r^2|D_t|},\qquad
C_i=\sum_{j,u:\chi_j\ne\chi_i}\frac{\sigma_{ij}K\delta_{ij}}{r^3|D_t|}.
$$

Then

$$
A_{x,i}=US_i+C_i.
$$

Constant axial translation requires this to vanish for every member and every reception time. In a single plane $C_i=0$. The Braid Program's [translation-speed chart](../../braid-program/evidence/2026-09-01-planar-three-binary-axial-translation-speed-chart.md) certifies negative axial weight for the eighteen tangential/radial screw candidates generated from stationary balances T02 through T36, uniformly for $|U|\leq0.9$. It excludes nonzero translation on those specific branches. It is not a sign certificate for all speeds and radii in those topology cells or every single-ring geometry.

For two planes separated by $d>0$, define

$$
H_i=\sum_{\text{opposite plane roots}}\frac{\sigma_{ij}K}{r^3|D_t|}.
$$

The leading and trailing identities are $A_{x,L}=US_L+dH_L$ and $A_{x,T}=US_T-dH_T$. For $U>0$ and verified total weights $S_L,S_T<0$, steady translation requires $H_L>0$ and $H_T<0$: repulsive and attractive signed cross weights, respectively. The sign premise concerns the total weights including cross-ring roots; it cannot be imported from isolated-ring weights. Without that premise, the displayed balance equations, rather than those two signs, are the necessary conditions.

Equivalently, separating same-plane and cross-plane axial accelerations gives $A_{x,i}=US_i^{\mathrm{same}}+A_{x,i}^{\mathrm{cross}}$. A negative same-plane weight requires positive cross-plane axial acceleration. That conclusion alone does not fix the sign of $H_i$, because the additional $U$-weighted cross term also contributes. No cross sums for the twelve-member candidate are evaluated here.

## An exact phase symmetry for a regular counter-rotating pair

This additional result needs a more restricted geometry than the app's general three-layer paths. Each component is now one equal-radius regular hexagon with angles $\alpha_j=\alpha_0+j\pi/3$ and alternating charges $q_j=q_0(-1)^j$. The two components rotate with angular frequencies $+\omega$ and $-\omega$, have fixed axial gap and constant translation, and supply their all-past prescribed histories. Radii and phase offsets may differ between components. Assume the complete ordinary-root sums remain defined over the compared phases.

In a receiver's rotating frame, the other ring's source phase at delay $u$ is

$$
(\Omega_b-\Omega_a)T-\Omega_bu+\alpha_j-\alpha_i,
\qquad \Omega_b=-\Omega_a,\quad |\Omega_a|=\omega.
$$

Advance reception time by $\Delta T=\pi/(6\omega)$. Relative phase changes by $\pm\pi/3$. Relabeling the source index by one restores every source position, velocity, range, causal root and transmitter factor in the receiver frame. The relabeled source has the opposite charge. The complete cross-ring acceleration therefore obeys

$$
\mathbf A_i^{\mathrm{cross}}(T+\Delta T)
=-\mathbf A_i^{\mathrm{cross}}(T).
$$

It is anti-periodic at $\Delta T$ and periodic at $2\Delta T=\pi/(3\omega)$. The same-ring acceleration and required circular acceleration are constant in that frame. If their sum with the cross-ring contribution satisfies the rigid circular equation at every phase, that cross-ring contribution must be constant. Anti-periodicity then requires it to vanish identically, leaving each ring to satisfy the isolated screw-path balance on its own.

Consequently, where those isolated screw candidates fall within the cited negative-weight certificate, no ordinary rigid counter-rotating pair at $0<|U|\leq0.9$ can repair their axial mismatch through cross coupling. This is a derived symmetry consequence combined with an existing computer-assisted bounded result; it is not a new numerical certificate. It neither excludes deformed or modulated histories nor proves a retained periodic orbit exists. Co-rotating rings have constant relative phase and do not obey this charge-flipping time symmetry.

A periodic or more general modulated-history search is therefore a plausible next mathematical target after a rigid residual screen, not a proved replacement carrier. Unequal layer frequencies, irregular phases, changing axial offsets, environmental sources, singular histories or nonrigid motion require their own analysis. In particular, the app's three layers cannot be treated as one regular hexagon without checking their radii, phases and frequencies.

## Checks that can overturn the results

An ordinary $D_t\ne0$ root at the fixed leading plane with $U=1$ overturns the root exclusion. A complete signed root ledger violating the axial identity overturns that derivation. For the regular pair, a complete ledger failing the one-index source bijection and charge reversal at $\Delta T$ overturns the anti-periodicity proof; a retained history outside its assumptions does not. A numerical evaluator must first pass the straight-path root equation, the exact helical self contacts and the phase-bijection control before being applied to a candidate.
