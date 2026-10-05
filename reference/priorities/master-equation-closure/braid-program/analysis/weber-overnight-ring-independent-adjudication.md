# Four-member alternating ring under the fixed instantaneous Weber-inspired law: independent reference and adjudication

**Status.** Independent ring reference fixed at 2026-10-05T14:18Z before exposure to the subject ring analysis; Sections 1–8 are unchanged since then, and the adjudication is written in the final section (2026-10-05). Everything below was derived from the frozen pair law in the [common brief](../../binary-research/evidence/weber-overnight-promoted/pi/common-brief.md) and Section 9 of the [variant manuscript](../../equation-variants/manuscript.md#9-weber-inspired-relative-motion-response) without reading the subject ring analysis, its evidence files, or its runtime outputs. The spot-check instrument is [weber-overnight-ring-reference.mjs](../evidence/weber-overnight-ring-reference.mjs); its run log and JSON record are retained under `.local-data/master-equation-closure/weber-overnight/review/ring/`. Specialist lens: constrained-motion geometry (Gauss role file); the lens confers no authority, and nothing here adopts the law into canon.

Claim grades used: **derived** (follows from the stated law by the algebra shown), **measured** (produced by the named script, with its domain), **inferred**, **guessed**. Mathematical invariants of this adapted law are not primitive physical energy or momentum accounts. The law is an instantaneous comparison structure; it is not the delayed canonical Master Equation, and standard physics enters nowhere as a premise.

## 1. The law and the configuration

For members $i\ne j$ with present separation $r_{ij}=\|\mathbf X_i-\mathbf X_j\|>0$, direction $\mathbf e_{ij}=(\mathbf X_i-\mathbf X_j)/r_{ij}$, polarity sign $\sigma_{ij}=\operatorname{sign}(q_iq_j)$ and coupling $K_{ij}=K>0$, the pair contribution to the acceleration of $i$ is

$$
\mathbf A_{i\leftarrow j}=\frac{\sigma_{ij}K}{r_{ij}^2}\Big[1+\lambda_{\mathrm W}\frac{\dot r_{ij}^2}{c_f^2}+\mu_{\mathrm W}\frac{r_{ij}\ddot r_{ij}}{c_f^2}\Big]\mathbf e_{ij},\qquad \mathbf X_i''=\sum_{j\ne i}\mathbf A_{i\leftarrow j},
$$

with frozen $\lambda_{\mathrm W}=-1/2$, $\mu_{\mathrm W}=1$, $c_f=1$, $K=1$, no self term, no delay, unit integration weights (architrinos have no mass). Dots are absolute-time derivatives of the present separation. Lengths are in units of $K/c_f^2$; the dimensionless ring radius is $x=\rho c_f^2/K$.

Members $m=0,1,2,3$ sit on a circle of radius $\rho$ in the $xy$ plane at angles $\theta_m=m\pi/2$ with polarities $+,-,+,-$. Adjacent pairs are opposite in polarity ($\sigma=-1$) at distance $\sqrt2\rho$; the two diagonal pairs are like in polarity ($\sigma=+1$) at distance $2\rho$. The ring rotates rigidly and counterclockwise about its centre at rate $\Omega$, centre at rest in the absolute frame. Per member, the local radial and tangential unit vectors are $\hat{\boldsymbol\rho}_m=(\cos\theta_m,\sin\theta_m,0)$ and $\hat{\boldsymbol\phi}_m=(-\sin\theta_m,\cos\theta_m,0)$; a quarter turn maps frame $m$ to frame $m+1$ through $\hat{\boldsymbol\rho}_{m+1}=\hat{\boldsymbol\phi}_m$, $\hat{\boldsymbol\phi}_{m+1}=-\hat{\boldsymbol\rho}_m$.

### 1.1 Kinematic identities (derived)

With $\mathbf w_{ij}=\mathbf V_i-\mathbf V_j$ and $\Delta\mathbf a_{ij}=\mathbf X_i''-\mathbf X_j''$, differentiating $r_{ij}^2=\|\mathbf X_i-\mathbf X_j\|^2$ twice gives

$$
\dot r_{ij}=\mathbf e_{ij}\cdot\mathbf w_{ij},\qquad \ddot r_{ij}=\frac{\|\mathbf w_{ij}\|^2-\dot r_{ij}^2}{r_{ij}}+\mathbf e_{ij}\cdot\Delta\mathbf a_{ij}=\frac{\|\mathbf w_{ij,\perp}\|^2}{r_{ij}}+\mathbf e_{ij}\cdot\Delta\mathbf a_{ij}.
$$

These are checked against finite differences of $r(t)$ along a quadratic path in known case K2 below. Because $\ddot r_{ij}$ contains the unknown accelerations, the law is an implicit linear system for them.

## 2. The $12\times12$ acceleration system (derived)

Substituting the identity for $\ddot r_{ij}$ and moving every acceleration to the left side, with $g_{ij}=\sigma_{ij}K\mu_{\mathrm W}/(c_f^2r_{ij})$ and the projector $P_{ij}=\mathbf e_{ij}\mathbf e_{ij}^{\mathsf T}$,

$$
\mathbf X_i''-\sum_{j\ne i}g_{ij}P_{ij}\big(\mathbf X_i''-\mathbf X_j''\big)=\mathbf b_i,\qquad
\mathbf b_i=\sum_{j\ne i}\frac{\sigma_{ij}K}{r_{ij}^2}\Big[1+\lambda_{\mathrm W}\frac{\dot r_{ij}^2}{c_f^2}+\mu_{\mathrm W}\frac{\|\mathbf w_{ij,\perp}\|^2}{c_f^2}\Big]\mathbf e_{ij}.
$$

In block form this is $M\mathbf a=\mathbf b$ with $M_{ii}=I_3-\sum_{j\ne i}g_{ij}P_{ij}$ and $M_{ij}=g_{ij}P_{ij}$; $M$ is symmetric. Each pair enters $M$ as a rank-one update: with the unit $3N$-vector $\mathbf u_{ij}$ that carries $\mathbf e_{ij}/\sqrt2$ in slot $i$ and $-\mathbf e_{ij}/\sqrt2$ in slot $j$,

$$
M=I_{3N}-\sum_{i<j}2g_{ij}\,\mathbf u_{ij}\mathbf u_{ij}^{\mathsf T}.
$$

For an isolated pair this gives $\det M=1-2g=1-2\sigma K\mu_{\mathrm W}/(c_f^2r)$, which is the manuscript's pair denominator; the assembler reproduces it to $4\times10^{-16}$ (known case K1). $M$ depends on positions only; velocities enter $\mathbf b$ alone.

### 2.1 Sector decomposition on the ring

The ring geometry and the polarity pattern are both invariant under the quarter turn $m\mapsto m+1$ (the turn swaps $+$ and $-$, but $\sigma_{ij}$ depends only on whether a pair is adjacent or diagonal), and under the reflection $z\mapsto-z$. Write in-plane displacements in local frames, $\boldsymbol\xi_m=\alpha_m\hat{\boldsymbol\rho}_m+\beta_m\hat{\boldsymbol\phi}_m+\zeta_m\hat{\mathbf z}$, and expand in the $C_4$ characters $\alpha_m=\hat\alpha\,\omega_k^{m}$ with $\omega_k=e^{ik\pi/2}$, $k=0,1,2,3$ (so $c_k=\cos(k\pi/2)$, $s_k=\sin(k\pi/2)$, $\omega_k^2=(-1)^k$). The $k=0$ sector is the symmetric (breathing and common-rotation) sector; $k=2$ is the alternating sector in which the $+$ members move oppositely to the $-$ members; $k=1,3$ are complex conjugates and together carry the two in-plane translations, the two polarization modes and the two tilts.

Every pair operator of the form $\boldsymbol\xi\mapsto\sum_j\gamma_{mj}P_{mj}(\boldsymbol\xi_m-\boldsymbol\xi_j)$ with adjacent weight $\gamma_a$ and diagonal weight $\gamma_d$ has the in-plane sector block (basis $(\hat\alpha,\hat\beta)$)

$$
Q_k[\gamma_a,\gamma_d]=\begin{pmatrix}\gamma_a(1+c_k)+\gamma_d\big(1+(-1)^k\big) & i\gamma_as_k\\ -i\gamma_as_k & \gamma_a(1-c_k)\end{pmatrix},
$$

obtained from $\mathbf e_{m,m+1}=(\hat{\boldsymbol\rho}_m-\hat{\boldsymbol\phi}_m)/\sqrt2$, $\mathbf e_{m,m-1}=(\hat{\boldsymbol\rho}_m+\hat{\boldsymbol\phi}_m)/\sqrt2$, $\mathbf e_{m,m+2}=\hat{\boldsymbol\rho}_m$ and the frame relations above. Since all $\mathbf e_{ij}$ lie in the plane, $M$ acts as the identity on the four $z$ components.

On the ring, $g_a=-\mu_{\mathrm W}K/(c_f^2\sqrt2\rho)=-1/(\sqrt2x)$ and $g_d=+1/(2x)$, and $M_k=I_2-Q_k[g_a,g_d]$:

| sector | $M_k$ | eigenvalues |
| --- | --- | --- |
| $k=0$ | $\operatorname{diag}\!\big(1+\tfrac{\sqrt2-1}{x},\,1\big)$ | $m_0=1+\tfrac{\sqrt2-1}{x}$ (breathing), $1$ (common rotation) |
| $k=2$ | $\operatorname{diag}\!\big(1-\tfrac1x,\,1+\tfrac{\sqrt2}{x}\big)$ | $1-\tfrac1x$ (alternating radial), $m_1=1+\tfrac{\sqrt2}{x}$ |
| $k=1,3$ | $\begin{pmatrix}1-g_a&\mp ig_a\\ \pm ig_a&1-g_a\end{pmatrix}$ | $1$ (translation), $m_1=1+\tfrac{\sqrt2}{x}$ |
| $z$ (all $k$) | $1$ | $1$ (four times) |

**Determinant (derived):**

$$
\det M(x)=\Big(1+\frac{\sqrt2-1}{x}\Big)\Big(1-\frac1x\Big)\Big(1+\frac{\sqrt2}{x}\Big)^{3}.
$$

The trace check $\operatorname{tr}(M-I)=-\sum_{i<j}2g_{ij}=(4\sqrt2-2)/x$ agrees with the listed eigenvalues. Measured: the numerically assembled $12\times12$ determinant agrees with this closed form to $2.3\times10^{-13}$ at nine radii from $0.3$ to $10$, and the Jacobi eigenvalues at $x=1.7$ are $0.4117647059,\ 1\,(\times7),\ 1.243655037,\ 1.831890331\,(\times3)$, exactly the table.

**Invertibility domain:** $M$ is invertible for every $x\in(0,1)\cup(1,\infty)$ and singular only at $x=1$, that is at $\rho=\mu_{\mathrm W}K/c_f^2$, where the diagonal like-polarity distance $2\rho$ equals the pair singular distance $2\sigma K\mu_{\mathrm W}/c_f^2$ of the two-body reduction. Note that the obstruction appears only in the $k=2$ radial direction, where the adjacent-pair contributions cancel because $1+c_2=0$; the pair denominator does not transfer to the other eleven directions.

**Signature:** positive definite for $x>1$ (signature $(12,0)$); for $0<x<1$ exactly one negative eigenvalue, $1-1/x$ (signature $(11,1)$). Measured at $x\in\{0.3,0.457,0.8,0.999\}$: one negative eigenvalue; at $x\in\{1.001,1.7,3,10\}$: none.

**Null vector at $x=1$:** $\mathbf n=(\hat{\boldsymbol\rho}_0,-\hat{\boldsymbol\rho}_1,\hat{\boldsymbol\rho}_2,-\hat{\boldsymbol\rho}_3)$, the alternating radial mode in which the $+$ members move outward while the $-$ members move inward. Measured $\|M\mathbf n\|=7.4\times10^{-16}$ at $x=1$. Since $M$ is symmetric and the balanced right side $\mathbf b$ is purely $k=0$ radial, $\mathbf b\perp\mathbf n$: at $x=1$ the balanced ring still satisfies the law, but its acceleration is determined only up to a multiple of $\mathbf n$. Regular (uniquely determined) evolution therefore excludes $x=1$; silently choosing a branch there is forbidden by the brief.

## 3. Exact balance (derived; residuals measured)

On the rigid rotation $\mathbf X_m=\rho\hat{\boldsymbol\rho}_m(T)$, $\theta_m(T)=m\pi/2+\Omega T$, the velocities are $\mathbf V_m=\rho\Omega\hat{\boldsymbol\phi}_m$ and the accelerations to be found are $\mathbf X_m''=-\rho\Omega^2\hat{\boldsymbol\rho}_m$. Computing the velocity-dependent terms explicitly rather than assuming them:

- $\dot r_{ij}=\mathbf e_{ij}\cdot\mathbf w_{ij}\propto(\hat{\boldsymbol\rho}_i-\hat{\boldsymbol\rho}_j)\cdot(\hat{\boldsymbol\phi}_i-\hat{\boldsymbol\phi}_j)=-\sin(\theta_i-\theta_j)-\sin(\theta_j-\theta_i)=0$.
- $\|\mathbf w_{ij,\perp}\|^2/r_{ij}=\rho^2\Omega^2\|\hat{\boldsymbol\phi}_i-\hat{\boldsymbol\phi}_j\|^2/r_{ij}=\Omega^2r_{ij}$, using $\|\hat{\boldsymbol\phi}_i-\hat{\boldsymbol\phi}_j\|=\|\hat{\boldsymbol\rho}_i-\hat{\boldsymbol\rho}_j\|=r_{ij}/\rho$.
- $\mathbf e_{ij}\cdot\Delta\mathbf a_{ij}=-\rho\Omega^2\,\mathbf e_{ij}\cdot(\hat{\boldsymbol\rho}_i-\hat{\boldsymbol\rho}_j)=-\Omega^2r_{ij}$.

Hence $\ddot r_{ij}=\Omega^2r_{ij}-\Omega^2r_{ij}=0$ for every pair, consistently with the separations being constant on a rigid rotation. On the exact solution the bracket reduces to $1$ and the law coincides with the instantaneous inverse-square sum; the $\lambda_{\mathrm W}$ and $\mu_{\mathrm W}$ terms do not shift the balance radius. They do shape the linearization, through $M$.

**Tangential balance** holds identically: the two adjacent attractions on member $m$ have tangential components $\pm K/(2\sqrt2\rho^2)$ that cancel, and the diagonal repulsion is radial. This is the reflection symmetry of the configuration through the line from the centre to member $m$. Measured tangential residual $\le1.2\times10^{-16}$.

**Radial balance:** the radial acceleration on member $m$ is $-\tfrac{K}{\sqrt2\rho^2}+\tfrac{K}{4\rho^2}=-\tfrac{K}{\rho^2}\cdot\tfrac{2\sqrt2-1}{4}$. Setting it equal to $-\rho\Omega^2$,

$$
\Omega^2(\rho)=\frac{(2\sqrt2-1)K}{4\rho^3},\qquad \Omega^2=\frac{2\sqrt2-1}{4x^3}\ \text{in units } c_f^3/K,\qquad v=\rho\Omega=c_f\sqrt{\frac{2\sqrt2-1}{4x}}.
$$

The member speed reaches $c_f$ at $x_c=(2\sqrt2-1)/4=0.4571067812$ exactly ($v^2=x_c/x$). For $x>x_c$ the ring is admissible under all three speed labels; at $x=x_c$ only under the unrestricted and inclusive-ceiling labels; for $x<x_c$ only under the unrestricted label. The speed comparison uses the absolute frame with the centre at rest, which the conserved $\sum_i\mathbf V_i=0$ (Section 5) preserves for all time. **Excluded radii:** none by balance itself; $x=1$ by loss of invertibility (Section 2); $x\le x_c$ by the ceiling labels. Measured: at $x\in\{1.7,0.8,x_c,0.3\}$ the assembled solve returns the centripetal accelerations with radial residual $\le2.2\times10^{-16}$, and the explicitly computed $|\dot r_{ij}|,|\ddot r_{ij}|$ are $\le6.7\times10^{-16}$.

## 4. Linearization about the balanced ring in the rotating frame

### 4.1 Lagrangian structure (derived)

Because $\mu_{\mathrm W}=-2\lambda_{\mathrm W}$ for the frozen pair, the $N$-member law is the Euler–Lagrange system of

$$
L=\tfrac12\sum_i\|\mathbf V_i\|^2-\sum_{i<j}S_{ij},\qquad S_{ij}=\frac{\sigma_{ij}K}{r_{ij}}\Big(1+\frac{\mu_{\mathrm W}}{2}\frac{\dot r_{ij}^2}{c_f^2}\Big).
$$

Proof: for one pair term, $\partial S/\partial\mathbf V_i=S_{\dot r}\mathbf e$ and $\partial S/\partial\mathbf X_i=S_r\mathbf e+S_{\dot r}\mathbf w_\perp/r$, while $\dot{\mathbf e}=\mathbf w_\perp/r$, so $\tfrac{d}{dt}\partial S/\partial\mathbf V_i-\partial S/\partial\mathbf X_i=(\dot S_{\dot r}-S_r)\mathbf e$ is radial, and with $S=\tfrac{\sigma K}{r}(1+\alpha\dot r^2)$ one finds $-(\dot S_{\dot r}-S_r)=\tfrac{\sigma K}{r^2}(1-\alpha\dot r^2+2\alpha r\ddot r)$, which is the pair law when $\lambda_{\mathrm W}=-\alpha$, $\mu_{\mathrm W}=2\alpha$, that is $\alpha=1/2$. The velocity Hessian $\partial^2L/\partial\mathbf V\partial\mathbf V$ is exactly the matrix $M$ of Section 2, which identifies $M$ as the kinetic matrix of the system and explains why it is indefinite for $x<1$. The identity is purely mathematical; $L$ is not a physical energy account.

### 4.2 The linear system (derived)

In the frame rotating at $\Omega$ about $\hat{\mathbf z}$, positions $\mathbf Y_m$ have absolute velocity $\dot{\mathbf Y}_m+\boldsymbol\Omega\times\mathbf Y_m$, while $r_{ij}$ and $\dot r_{ij}=\mathbf e_{ij}\cdot(\dot{\mathbf Y}_i-\dot{\mathbf Y}_j)$ are frame independent. On the balanced ring $\dot r_{ij}=0$, so every $\dot r$-dependence of $L$ is quadratic in the perturbation $(\boldsymbol\xi,\dot{\boldsymbol\xi})$ and the second-order Lagrangian is

$$
L_2=\tfrac12\dot{\boldsymbol\xi}^{\mathsf T}M_0\dot{\boldsymbol\xi}+\dot{\boldsymbol\xi}^{\mathsf T}\hat\Omega\boldsymbol\xi-\tfrac12\boldsymbol\xi^{\mathsf T}\big(H-\Omega^2P_\parallel\big)\boldsymbol\xi,
$$

where $M_0$ is $M$ on the ring, $\hat\Omega$ is the block-diagonal skew matrix of $\boldsymbol\Omega\times$, $P_\parallel$ projects onto in-plane components, and $H$ is the Hessian of the inverse-distance sum $\sum_{i<j}\sigma_{ij}K/r_{ij}$ at the ring: per pair $h_{ij}=\tfrac{\sigma_{ij}K}{r_{ij}^3}(3P_{ij}-I)$, assembled with edge-Laplacian structure. The Euler–Lagrange equations of $L_2$ are the 24-state linear system

$$
M_0\ddot{\boldsymbol\xi}+2\hat\Omega\dot{\boldsymbol\xi}+\mathcal K\boldsymbol\xi=0,\qquad \mathcal K=H-\Omega^2P_\parallel,
$$

a gyroscopic system with symmetric $M_0$ and $\mathcal K$ and skew gyroscopic term. Its spectrum has the Hamiltonian symmetry $\{\lambda,-\lambda,\bar\lambda,-\bar\lambda\}$, so any eigenvalue off the imaginary axis is an instability. The velocity-dependent part of the law enters the linearization only through $M_0$.

### 4.3 Sector equations (derived)

With $\eta_a=\sigma K/r^3$ on adjacent pairs $=-\sqrt2/(4x^3)$ and $\eta_d=1/(8x^3)$ on diagonals, the Hessian block is $H_k=3Q_k[\eta_a,\eta_d]-R_k[\eta_a,\eta_d]$, where $R_k$ is the block of the scalar edge Laplacian, $R_k=\begin{pmatrix}2\gamma_a+\gamma_d(1+(-1)^k)&2i\gamma_as_k\\-2i\gamma_as_k&2\gamma_a+\gamma_d(1+(-1)^k)\end{pmatrix}$. The gyroscopic block is $\Omega J$ with $J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ in every sector. Writing $\Omega^2=(2\sqrt2-1)/(4x^3)$ throughout:

**$k=0$, in-plane.** $M_0=\operatorname{diag}(m_0,1)$, $\mathcal K_0=\operatorname{diag}(-3\Omega^2,0)$ (using $4(\eta_a+\eta_d)=-2\Omega^2$; the vanishing tangential entry is the common-rotation zero mode, a check that $\Omega$ is the balanced rate). The pencil determinant is $\lambda^2(m_0\lambda^2+\Omega^2)$:

$$
\lambda=0\ (\text{algebraic }2,\ \text{geometric }1),\qquad \lambda=\pm\,i\,\frac{\Omega}{\sqrt{m_0}},\quad m_0=1+\frac{\sqrt2-1}{x}.
$$

The zero chain is the one-parameter family of balanced rings ($\rho\mapsto\rho+\delta$ changes $\Omega$, which in the fixed rotating frame is a secular phase drift). The breathing frequency is below $\Omega$ for every finite $x$; in the inverse-square control ($m_0\to1$) it equals $\Omega$, the familiar closed-epicycle degeneracy.

**$k=2$, in-plane.** $M_2=\operatorname{diag}(m_r,m_1)$ with $m_r=1-1/x$, $m_1=1+\sqrt2/x$; $\mathcal K_2=\operatorname{diag}(\kappa_r,\kappa_t)$ with $\kappa_r=\tfrac{3}{4x^3}>0$, $\kappa_t=-\tfrac{3\sqrt2}{2x^3}<0$. The pencil determinant in $\Lambda=\lambda^2$ is

$$
A\Lambda^2+B\Lambda+C=0,\qquad A=m_rm_1,\quad B=m_r\kappa_t+m_1\kappa_r+4\Omega^2,\quad C=\kappa_r\kappa_t=-\frac{9\sqrt2}{8x^6}.
$$

For $x>1$: $A>0>C$, so one root $\Lambda_+>0$ (a real pair $\pm\sqrt{\Lambda_+}$, unstable) and one root $\Lambda_-<0$ (an oscillation $\pm i\sqrt{-\Lambda_-}$). For $0<x<1$: $A<0$, $B>0$ (each term positive), $C<0$, so both roots have positive sum and positive product; if real they are both positive (two real unstable pairs), if complex they give $\lambda$ with nonzero real part. **The $k=2$ sector is linearly unstable at every regular radius.** The negative stiffness $\kappa_t<0$ is the mode in which members $0,1$ approach each other while $2,3$ do likewise: the ring wants to break into two opposite-polarity pairs. The same sign structure holds in the inverse-square control ($m_r,m_1\to1$), so the Weber terms do not create this instability; they modify its rate.

**$k=1$ and $k=3$, in-plane.** $M_1=\begin{pmatrix}1-g_a&-ig_a\\ig_a&1-g_a\end{pmatrix}$, $H_1=\eta_a\begin{pmatrix}1&i\\-i&1\end{pmatrix}$, $\mathcal K_1=H_1-\Omega^2I$. Writing the pencil as $\begin{pmatrix}D&-u\\u&D\end{pmatrix}$ one has $\det=(D+iu)(D-iu)$ with $D-iu=(\lambda-i\Omega)^2$ and $D+iu=m_1\lambda^2+2i\Omega\lambda-\kappa_1$, $\kappa_1=-(2\eta_a-\Omega^2)=\tfrac{4\sqrt2-1}{4x^3}$. Hence

$$
\lambda=i\Omega\ (\text{algebraic }2,\ \text{geometric }1:\ \text{in-plane translation}),\qquad
\lambda=\frac{-i\Omega\pm\sqrt{m_1\kappa_1-\Omega^2}}{m_1},
$$

and the $k=3$ sector is the complex conjugate. Since $m_1\kappa_1-\Omega^2=\tfrac{1}{4x^3}\big[2\sqrt2+\tfrac{8-\sqrt2}{x}\big]>0$ for every $x>0$, the second pair has nonzero real part: **the $k=1,3$ sector is linearly unstable at every $x>0$**, with the quartet

$$
\lambda=\pm\frac{\sqrt{m_1\kappa_1-\Omega^2}}{m_1}\ \pm\ i\,\frac{\Omega}{m_1}.
$$

The unstable eigenvector is the polarization mode $(\hat\alpha,\hat\beta)=(1,-i)$, the $+$ sub-pair shifting against the $-$ sub-pair, for which the inverse-distance Hessian is already negative ($2\eta_a<0$); the gyroscopic term does not stabilize it. The translation chain at $+i\Omega$ (in $k=1$) is the inertial free motion $\mathbf c_0+\mathbf vT$ seen from the rotating frame.

**Out-of-plane ($z$), all sectors.** By the $z\mapsto-z$ reflection the $z$ components decouple at linear order, with no rotating-frame terms along the axis: $\ddot\zeta_m=\sum_{j\ne m}s_{mj}(\zeta_m-\zeta_j)$, $s_a=-\tfrac{\sqrt2}{4x^3}$, $s_d=\tfrac{1}{8x^3}$, so $\ddot{\hat\zeta}=\big[2s_a(1-c_k)+s_d(1-(-1)^k)\big]\hat\zeta$:

$$
k=0:\ \lambda=0\ (\text{algebraic }2,\ \text{geometric }1:\ z\text{ translation});\qquad
k=1,3:\ \lambda=\pm i\Omega;\qquad
k=2:\ \lambda=\pm i\sqrt{\sqrt2/x^3}.
$$

That the tilt modes ($k=1,3$) oscillate at exactly $\Omega$ is required by rotation invariance about an in-plane axis: a tilted balanced ring is the same solution, and in the frame rotating about $\hat{\mathbf z}$ it appears as a $z$ oscillation at $\Omega$. (An earlier hand evaluation of this formula misassigned the diagonal term between $k=1$ and $k=2$; the numerically assembled Jacobian exposed the slip and the corrected closed forms above are the ones the script checks.)

### 4.4 Full spectrum, multiplicities and Jordan structure (derived; values measured)

| eigenvalue | sector | count | structure |
| --- | --- | --- | --- |
| $0$ | in-plane $k=0$; $z$ $k=0$ | 4 | two Jordan chains of length 2 (balanced-ring family; $z$ translation) |
| $+i\Omega$ | in-plane $k=1$ (chain), $z$ $k=1$, $z$ $k=3$ | 4 | algebraic 4, geometric 3 (one translation chain, two tilts) |
| $-i\Omega$ | in-plane $k=3$ (chain), $z$ $k=1$, $z$ $k=3$ | 4 | algebraic 4, geometric 3 |
| $\pm i\Omega/\sqrt{m_0}$ | in-plane $k=0$ | 2 | simple (breathing) |
| $\pm\dfrac{\sqrt{m_1\kappa_1-\Omega^2}}{m_1}\pm i\dfrac{\Omega}{m_1}$ | in-plane $k=1,3$ | 4 | simple; **unstable** |
| $\pm\sqrt{\Lambda_+}$, and $\pm\sqrt{\Lambda_-}$ or $\pm i\sqrt{-\Lambda_-}$ | in-plane $k=2$ | 4 | simple; **at least one real pair for every $x\ne1$** |
| $\pm i\sqrt{\sqrt2/x^3}$ | $z$ $k=2$ | 2 | simple |

Total 24. The symmetric breathing sector ($k=0$) and the whole $z$ sector are neutrally stable; every instability lives in $k=1,3$ (polarization) and $k=2$ (pairing), which lie outside the imposed ring symmetry.

**Measured values (script, five-point finite-difference Jacobian of the rotating-frame vector field, step $10^{-3}x$, step-halving change $\le4.7\times10^{-12}$; sector off-block coupling $\le1.5\times10^{-12}$; eigenvalues by Faddeev–LeVerrier characteristic polynomial and Durand–Kerner roots per $6\times6$ sector block, each closed form confirmed by inverse iteration on the full $24\times24$ Jacobian with gap $\le3\times10^{-11}$; simple roots agree with the closed forms to $\le2.5\times10^{-12}$, multiple roots to the expected $\varepsilon^{1/m}$):**

| quantity | $x=1.7$ | $x=0.8$ |
| --- | --- | --- |
| $\Omega$ | $0.3050250100$ | $0.9448738974$ |
| breathing frequency $\Omega/\sqrt{m_0}$ | $0.2735177300$ | $0.7669575116$ |
| $k=1,3$ quartet | $\pm0.3187960589\pm0.1665083356\,i$ | $\pm0.8396456240\pm0.3413849191\,i$ |
| $k=2$ real pair(s) | $\pm0.3423386901$ | $\pm0.8631738541$ and $\pm3.431079319$ |
| $k=2$ oscillation | $\pm0.8634888159\,i$ | none (both pairs real) |
| $z$ tilt ($k=1,3$, each) | $\pm0.3050250100\,i$ | $\pm0.9448738974\,i$ |
| $z$ warp ($k=2$) | $\pm0.5365177775\,i$ | $\pm1.661967468\,i$ |
| zero | $0$ ($\times4$) | $0$ ($\times4$) |

At $x=0.8$ the kinetic matrix is indefinite ($m_r=-1/4$) and the fastest growth, $3.43$ per unit time, is about $3.6$ e-foldings per radian of rotation. At $x=1.7$ the fastest rates, $0.342$ ($k=2$) and $0.319$ ($k=1,3$), are about $1.1$ e-foldings per radian; one rotation period multiplies a $k=2$ seed by $e^{7.05}\approx1.2\times10^3$.

## 5. Invariants (derived; conservation measured)

From the Lagrangian of Section 4.1, or directly from the law:

- **Sum of velocities.** $\sum_i\partial L/\partial\mathbf V_i=\sum_i\mathbf V_i$ (the pair terms cancel in pairs), conserved by translation invariance; equivalently $\mathbf A_{j\leftarrow i}=-\mathbf A_{i\leftarrow j}$. The centre therefore moves uniformly and the "centre at rest" assumption is preserved.
- **Angular momentum.** $\sum_i\mathbf X_i\times\partial L/\partial\mathbf V_i=\sum_i\mathbf X_i\times\mathbf V_i$ (since $(\mathbf X_i-\mathbf X_j)\times\mathbf e_{ij}=0$), conserved because every pair acceleration is central.
- **Energy-like integral.** $E=\sum_i\mathbf V_i\cdot\partial L/\partial\mathbf V_i-L=\tfrac12\sum_i\|\mathbf V_i\|^2+\sum_{i<j}\dfrac{\sigma_{ij}K}{r_{ij}}\Big(1-\dfrac{\mu_{\mathrm W}}{2}\dfrac{\dot r_{ij}^2}{c_f^2}\Big)$; note the sign of the $\dot r^2$ term is opposite to that in $L$. Direct check: $\tfrac{d}{dt}\tfrac12\sum\|\mathbf V_i\|^2=\sum_{i<j}A_{ij}\dot r_{ij}$ and $-\tfrac{d}{dt}\big[\tfrac{\sigma K}{r}(1-\tfrac12\dot r^2)\big]=\tfrac{\sigma K\dot r}{r^2}\big[1-\tfrac12\dot r^2+r\ddot r\big]=A_{ij}\dot r_{ij}$.

These hold along any $C^2$ solution on the regular domain. They are mathematical invariants of the adapted law, not primitive physical energy or momentum accounts. Measured: along an RK4 trajectory from a randomly perturbed $x=1.7$ ring, $\sum\mathbf V$ and $\sum\mathbf X\times\mathbf V$ drift by $\le1.2\times10^{-13}$, and the energy drift falls from $1.6\times10^{-13}$ to $1.2\times10^{-14}$ on halving the step (ratio $12.7$, consistent with the integrator's order rather than with a defect in the invariant).

**Symmetric breathing sector.** The $C_4$-symmetric subspace (all four at radius $\rho(t)$, angles $m\pi/2+\theta(t)$) is invariant under the full nonlinear flow. On it $r_a=\sqrt2\rho$, $r_d=2\rho$, and the Lagrangian reduces to

$$
L_{\mathrm{red}}=2\Big(1+\frac{(\sqrt2-1)K}{c_f^2\rho}\Big)\dot\rho^2+2\rho^2\dot\theta^2+\frac{(2\sqrt2-1)K}{\rho},
$$

whose $\dot\rho^2$ coefficient is $2m_0(\rho)$. The angle is cyclic, $\ell=4\rho^2\dot\theta$ is the conserved angular momentum, and the motion is one degree of freedom with reduced energy

$$
E_{\mathrm{red}}=2m_0(\rho)\dot\rho^2+\frac{\ell^2}{8\rho^2}-\frac{(2\sqrt2-1)K}{\rho}.
$$

The effective potential is of inverse-square-law form with its minimum at the balanced radius $\rho_0=\ell^2/\big(4(2\sqrt2-1)K\big)$, and $V''_{\mathrm{eff}}(\rho_0)=4\Omega^2$ reproduces the breathing frequency $\Omega/\sqrt{m_0}$ of Section 4.3. Since $m_0>0$ for all $\rho>0$, symmetric motion with $E_{\mathrm{red}}<0$ and $\ell\ne0$ is confined between two turning points and never reaches $\rho=0$. Measured: a symmetric release from $x=1.7$ with common radial speed $0.15$ stays symmetric to $1.3\times10^{-15}$ and conserves $E_{\mathrm{red}}$ to $1.7\times10^{-14}$ over 600 RK4 steps. This confinement is a statement about the symmetric subspace only; Section 4 shows that subspace is linearly unstable to $k=1,2,3$ perturbations, and a symmetric breathing orbit that crosses $x=1$ passes through a point where the full acceleration solve is non-unique.

## 6. Spot-check record (instrument: `weber-overnight-ring-reference.mjs`, Node v22, run 2026-10-05T14:18Z)

Known cases, run and recorded before any ring quantity:

| id | known case | result |
| --- | --- | --- |
| K1 | $N=2$ assembler determinant versus $1-2\sigma K\mu_{\mathrm W}/(c_f^2r)$, both polarities, four radii | max diff $4.4\times10^{-16}$ |
| K1b | $N=2$ solve versus the manuscript scalar reduction $f$ | max diff $2.8\times10^{-14}$ |
| K2 | $\dot r$, $\ddot r$ identities versus finite differences of $r(t)$ on a quadratic path | $2.6\times10^{-13}$, $3.7\times10^{-10}$ |
| K3 | five random four-member states: solved accelerations re-satisfy the pair law pointwise | max residual $3.6\times10^{-15}$; $M$ symmetric |
| K4 | zero-coefficient control: $M=I$, acceleration equals the inverse-square sum | $5.6\times10^{-17}$ |
| K5 | finite-difference Jacobian on a field with known derivative | $2.5\times10^{-14}$ |

K3 failed on the first draft (residual $0.28$) because the assembler divided the $\mu_{\mathrm W}\|\mathbf w_\perp\|^2$ term by $r$; the correction was made before any ring output was read as a result, and the ring checks R1–R4 then passed without further change to the ring code. Ring checks: R1 determinant closed form (nine radii), signature, null vector; R2 balance residuals at four radii including $v=c_f$ at $x_c$ to $10^{-16}$; R3 sector decoupling and all 24 eigenvalues at $x=1.7$ and $0.8$; R4 invariants and the reduced breathing energy. All pass; the log and JSON record are in `.local-data/master-equation-closure/weber-overnight/review/ring/`.

Domain of the measured claims: double precision, the two radii named, perturbation step $10^{-3}x$, and the deterministic random states in the script. The determinant, balance and spectrum closed forms are derived and hold for every $x>0$ ($x\ne1$ for the spectrum).

## 7. Reference table for the instrument

Closed forms evaluated to ten digits (measured by the script's final table; $c_f=K=1$, time unit $K/c_f^3$):

| $x$ | $\Omega$ | period $2\pi/\Omega$ | $v/c_f$ | $\det M$ | speed labels admitting the ring |
| --- | --- | --- | --- | --- | --- |
| $1.7$ | $0.3050250100$ | $20.59891846$ | $0.5185425169$ | $3.148092341$ | all three |
| $0.8$ | $0.9448738974$ | $6.649760698$ | $0.7558991179$ | $-8.045140998$ | all three ($M$ indefinite but invertible) |
| $(2\sqrt2-1)/4=0.4571067812$ | $2.187672643$ | $2.872086611$ | $1$ exactly | $-155.3275054$ | unrestricted, inclusive |
| $0.3$ | $4.114593635$ | $1.527048808$ | $1.234378091$ | $-1036.369539$ | unrestricted only |

Predicted linear rates per sector at the two spectral radii (growth rates are real parts of unstable eigenvalues; frequencies are imaginary parts):

| sector | $x=1.7$ | $x=0.8$ |
| --- | --- | --- |
| $k=0$ in-plane | neutral; breathing frequency $0.2735177300$; zero chain | neutral; breathing $0.7669575116$; zero chain |
| $k=1,3$ in-plane | growth $0.3187960589$ with frequency $0.1665083356$; translation at $\pm i\,0.3050250100$ | growth $0.8396456240$ with frequency $0.3413849191$; translation at $\pm i\,0.9448738974$ |
| $k=2$ in-plane | growth $0.3423386901$; oscillation $0.8634888159$ | growths $3.431079319$ and $0.8631738541$ |
| $z$ | tilt $0.3050250100$ ($\times2$); warp $0.5365177775$; zero chain | tilt $0.9448738974$ ($\times2$); warp $1.661967468$; zero chain |

For the other two radii the same closed forms give, at $x_c$: $k=2$ growth $3.642998572$, $k=1,3$ growth $1.640706591$; at $x=0.3$: $4.886597325$ and $2.650966806$. Every balanced ring on the regular domain is linearly unstable; no radius is linearly stable.

## 8. Falsifiers

- A $12\times12$ assembly of the same law whose determinant on the ring differs from $(1+\tfrac{\sqrt2-1}{x})(1-\tfrac1x)(1+\tfrac{\sqrt2}{x})^3$, or that is singular at any $x\ne1$, falsifies Section 2; check by evaluating the assembled determinant at $x=1.7$ ($3.148092341$) and $x=0.8$ ($-8.045140998$).
- Any pair on the rigid rotation with $\ddot r_{ij}\ne0$, or a balanced rate differing from $\Omega^2=(2\sqrt2-1)/(4x^3)$, falsifies Section 3; check the rotating-frame residual, which the script measures at $\le6\times10^{-16}$.
- A Jacobian of the rotating-frame vector field at the balanced ring with no eigenvalue of positive real part at $x=1.7$ or $0.8$, or with a $k=2$ real pair different from $0.3423386901$ or $3.431079319$, falsifies Section 4; a disagreement in the sixth digit after accounting for finite-difference step would already count.
- A $C^2$ trajectory of the law on the regular domain along which $\sum\mathbf V_i$, $\sum\mathbf X_i\times\mathbf V_i$ or $E$ changes beyond integrator error falsifies Section 5.
- A valid Lagrangian for the law with $\mu_{\mathrm W}\ne-2\lambda_{\mathrm W}$ would contradict Section 4.1; the frozen pair satisfies the identity, so this falsifier is inactive here but constrains any re-selected coefficients.

## Adjudication of the subject ring analysis (2026-10-05)

**Status of this section.** Written 2026-10-05 (about 15:05Z–15:40Z sandbox clock) after the blind phase closed, against Sections 1–8 above, which were fixed at 14:18Z and are unchanged. Exposure: the subject derivation [weber-overnight-ring.md](weber-overnight-ring.md) (Sections 1–9 and the measured Section 10), the machine record [weber-overnight-ring-runs.json](../evidence/weber-overnight-ring-runs.json), the runner [weber-overnight-ring-runner.mjs](../evidence/weber-overnight-ring-runner.mjs) (read for what it computes, not run as a reference), and the prereg trajectories under `.local-data/master-equation-closure/weber-overnight/ring/`. New checks made for this adjudication are in [weber-overnight-ring-adjudication-checks.mjs](../evidence/weber-overnight-ring-adjudication-checks.mjs), a separately written instrument that imports nothing from the fixed reference script; its three known cases (two-member determinant, circular opposite-polarity pair with its invariant $-K/(2r)$, frequency fitter on a clean cosine) passed and were printed before any target check, and its log and JSON record are retained beside the reference record under `.local-data/master-equation-closure/weber-overnight/review/ring/`. The subject's $x_\ast$ is this document's $x_c=(2\sqrt2-1)/4$; the subject's modes "elliptic", "shear", "sublattice separation" are this document's "alternating radial" ($k=2$ radial), "$k=2$ tangential" and "polarization" ($k=1,3$). Verdict vocabulary: **admitted** (agrees with the fixed reference, or is independently confirmed here), **admitted with correction** (right in substance, one stated defect), **rejected**, **not assessable**.

### Verdict table

| # | Item | Verdict | Reference anchor |
| --- | --- | --- | --- |
| 1a | $12\times12$ matrix (2.1), velocity Hessian identity, position-only dependence | admitted | Section 2, 4.1 |
| 1b | Character reduction and the twelve mode eigenvalues (Section 3.2 table) | admitted | Section 2.1 table |
| 1c | Determinant (3.3), invertibility domain $x\ne1$, signature $(12,0)$ for $x>1$ and $(11,1)$ for $x<1$, kernel at $x=1$ | admitted | Section 2; $\det M(1.7)=3.148092341$, $\det M(0.8)=-8.045140998$ |
| 1d | $x=1$ excluded as a well-posed history (solution exists, not unique) | admitted | Section 2, null vector $\mathbf n$, $\mathbf b\perp\mathbf n$ |
| 2a | Balance lemma: velocity terms cancel on rigid rotation, $\ddot r_{ij}=0$ | admitted with correction (wording) | Section 3 |
| 2b | Tangential balance by reflection symmetry; $\Omega^2=(2\sqrt2-1)K/(4\rho^3)$; $v=c_f\sqrt{(2\sqrt2-1)/(4x)}$; $x_\ast=x_c$ | admitted | Section 3, residual $\le2.2\times10^{-16}$ |
| 2c | Static control (4.5) | admitted with correction (unit slip in the worked number) | check C1, max diff $2.8\times10^{-16}$ |
| 3a | Linearization (5.1), gyroscopic form, $M$ the only Weber trace | admitted | Section 4.2 |
| 3b | Sector blocks and stiffness entries (5.2 table) | admitted | Section 4.3 |
| 3c | Sector polynomials and roots (5.2)–(5.4); sign arguments for $x>1$ and $0<x<1$ | admitted | Section 4.3 |
| 3d | 24-eigenvalue summary (5.4): multiplicities and Jordan structure | admitted | Section 4.4 table |
| 3e | "Linearly unstable at every radius", two independent unstable sectors | admitted (for every regular radius $x\ne1$) | Section 4.3, 7 |
| 3f | Correction history: sublattice stiffness $(1-\sqrt2)/4\to(1-4\sqrt2)/4$ | admitted; corrected value is right | $\kappa_1=(4\sqrt2-1)/(4x^3)=-k_s$ |
| 3g | Rate figures in units of $\Omega$ (1.045, 1.122 at 1.7; 0.750, 0.752, 1.665 at $x_\ast$; 1.243, 1.517 control) | admitted with correction (1.517 should read 1.518) | check C2 |
| 3h | Rates at $x=1.7$ and $0.8$ | admitted; identical to Section 4.4 to ten digits | Section 4.4 |
| 4 | Invariants (6.1), reduced Lagrangian (6.2), reduced energy (6.3), symmetric-sector Lyapunov statement | admitted | Section 5 |
| 5a | Known cases run and recorded first | admitted | runner order; 11/11 pass in the record |
| 5b | Measured rates at $10^{-6}$ amplitude versus this document's closed forms | admitted | check C4; table below |
| 5c | Breathing-displacement miss explained by the Jordan drift of the family radius | admitted | check C3 |
| 5d | First events and fates at $10^{-3}$: speed crossing first; one tight binary plus two unbound, or two receding binaries; like-polarity collapse at $x<1$ | admitted with correction (one range in the refinement column) | check C5; record |
| 5e | "Pairing inference confirmed as a first stage, not an end state" | admitted | check C5 |
| 5f | Anomalies honestly reported; their limits | admitted | record `anomalies` |
| 5g | Labels: inclusive at $x_\ast$, unrestricted at $0.3$ | admitted | Section 3 |
| 5h | Inference "step underflow at $x<1$ marks a finite-time singularity of the law" | admitted as inferred, with the isolated-pair scaling added below | this section |

### 1. The matrix, its reduction, determinant, signature and the singular radius

The subject's (2.1) is the same system as Section 2 above: the subject's unnormalized stacked direction $\mathbf u_{ij}$ with weight $\alpha_{ij}=\sigma_{ij}K\mu_{\mathrm W}/(c_f^2r_{ij})$ equals this document's $2g_{ij}\,\mathbf u_{ij}\mathbf u_{ij}^{\mathsf T}$ with the unit vector carrying $\pm\mathbf e_{ij}/\sqrt2$, because $\alpha_{ij}=g_{ij}$. The velocity-Hessian identification, the position-only dependence of $M$, and the symmetry are the statements of Sections 2 and 4.1. The subject's twelve-mode table agrees entry by entry with the sector table of Section 2.1: breathing $1+(\sqrt2-1)/x$, elliptic $1-1/x$, shear and both sublattice modes $1+\sqrt2/x$, and eigenvalue one on rotation, the two translations, the axial translation, the warp and the two tilts. The trace $12+2(2\sqrt2-1)/x$ is this document's $\operatorname{tr}(M-I)=(4\sqrt2-2)/x$. Determinant (3.3) is identical to the closed form of Section 2, which the fixed reference script confirmed against the assembled $12\times12$ determinant to $2.3\times10^{-13}$ at nine radii; the subject's own instrument confirms it to $10^{-11}$ at twelve radii including $0.999,1,1.001$, and the subject's known case K1 in the machine record reproduces $3.148092340697445$ and $-8.045140997574070$ at $1.7$ and $0.8$, the numbers named as falsifiers in Section 8. Signature and kernel agree: one negative eigenvalue for $0<x<1$, kernel equal to the alternating radial mode at $x=1$. The subject's Fredholm statement at $x=1$ (no solution unless the right side is orthogonal to the kernel, infinitely many when it is) is the correct general statement, and its application to the balanced ring (the centripetal accelerations are one solution among infinitely many) is the statement made with $\mathbf b\perp\mathbf n$ in Section 2. The subject's remark that the pair denominator $1-a/r$ is not transferred wholesale, while the elliptic eigenvalue is exactly the like-pair determinant $1-2K/(c_f^2\cdot2\rho)$, is the observation recorded in Section 2 that the obstruction lives in the $k=2$ radial direction alone. Verdicts 1a–1d: admitted. Grade: derived, independently confirmed by two separately written assemblers.

### 2. The balance lemma, $\Omega^2(\rho)$, the speeds and the static control

The subject proves the cancellation by inserting the centripetal candidate into the implicit system; Section 3 proves it by computing $\dot r_{ij}$ and $\ddot r_{ij}$ on the rigid rotation. Both give $\ddot r_{ij}=0$ for every pair and reduce the bracket to $1$, so the balance condition is that of the instantaneous inverse-square control at every $\lambda_{\mathrm W},\mu_{\mathrm W}$. One wording correction: the subject's generalization says the cancellation holds for any configuration "in uniform rigid rotation about an axis through the origin in its plane"; the identity used, $\|\mathbf w_{ij,\perp}\|=\Omega r_{ij}$, holds for rotation about the axis through the centre perpendicular to the plane, which is the ring's case. The cancellation itself survives any rigid rotation, since every separation is then constant and $\ddot r_{ij}\equiv0$ by definition, so the result is unaffected; only the phrase should read "about the axis perpendicular to its plane" or simply "any rigid rotation". Tangential balance by the reflection through each member's diameter, the radial sum $-(2\sqrt2-1)K/(4\rho^2)$, $\Omega^2$ of (4.3), the member speed and the equality radius $x_\ast=(2\sqrt2-1)/4=0.4571067812$ are the values of Section 3 (this document's $x_c$), and the speed at the singular radius, $0.676\,c_f$, is $\sqrt{x_\ast}$. Verdicts 2a admitted with the wording correction, 2b admitted; grade derived, independently confirmed, residuals $\le2.2\times10^{-16}$ (reference script) and $\le2.7\times10^{-15}$ (subject's K1).

The static control (4.5) was not in the fixed reference. Check C1 solves the static ring with the adjudication assembler at $x\in\{0.5,0.8,1.7,3\}$ and reproduces $A_{\mathrm{static}}=-\tfrac{(2\sqrt2-1)K}{4\rho^2}\cdot\tfrac{x}{x+\sqrt2-1}$ to $2.8\times10^{-16}$ with tangential components at round-off; the mechanism (the static right side is the inverse-square value, the solution lies in the breathing mode, and $M$ divides it by $m_0$) is as stated. The worked number is misprinted: at $x=1/2$ the solved value is $-0.25\,K/\rho^2=-1.0\,K$ against the inverse-square $-0.457\,K/\rho^2=-1.83\,K$; the subject writes "$-K/\rho^2$ against $-1.828K/\rho^2$", attaching the per-$\rho^2$ unit to numbers that are already evaluated at $\rho=1/2$. Verdict 2c: admitted with that correction. Grade: derived, independently confirmed.

### 3. The linearization, the sectors, the spectrum, the instability verdict and the correction history

The subject's (5.1) is Section 4.2's system with the same stiffness $\mathcal K=\nabla^2U-\Omega^2\Pi$ and the same gyroscopic term; the argument that the Weber part of $\Phi$ contributes nothing to $B$ or $C$ on the slice $\dot{\mathbf Y}=\mathbf0$ is the observation of Section 4.2 that $\dot r_{ij}=0$ on the balanced ring makes every $\dot r$-dependence quadratic in the perturbation. The sector table (5.2) agrees with Section 4.3 entry by entry after converting units ($K/\rho^3$ to $1/x^3$): breathing $-3\Omega^2$ with $m_a=m_0$; elliptic $k_A=3/4$ and $m_A=m_r$; shear $k_B=-3\sqrt2/2$ and $m_B=m_1$; warp $\sqrt2$; translation $-\Omega^2$ with $M$-entry $1$; sublattice $k_s=(1-4\sqrt2)/4=-\kappa_1$ with $m_s=m_1$; tilt $+\Omega^2$. The subject's $k=1$ scalar equation $m_sz^2+2i\Omega z+k_s=0$ is this document's $m_1\lambda^2+2i\Omega\lambda-\kappa_1=0$, and (5.3) is the quartet of Section 4.3 with the same discriminant $\tfrac{K}{4\rho^3}[2\sqrt2+(8-\sqrt2)/x]>0$. The quadratic (5.4) in $s=z^2$ is Section 4.3's $A\Lambda^2+B\Lambda+C=0$ with the same coefficients, and the sign arguments are the same ones: for $x>1$ a negative product of roots forces one positive real $s$; for $0<x<1$ a positive product and positive sum force both roots into the right half plane, so some $z$ has positive real part whether the roots are real or complex. The subject's $k=0$ reduction $m_a\ddot a+\Omega^2a=0$, the zero chain (rotation generator with the breathing direction as generalized eigenvector), the translation chain at $\pm i\Omega$, the semisimple tilts at $\pm i\Omega$, the axial zero chain, the warp at $\sqrt{\sqrt2K/\rho^3}$: all are the entries of the Section 4.4 table, with the same counts (4 + 2 + 2 + 4 + 2 + 2 + 4 + 4 = 24) and the same Jordan structure (two zero chains of length 2; $\pm i\Omega$ each of algebraic multiplicity 4 and geometric multiplicity 3). Verdicts 3a–3e: admitted. The verdict "linearly unstable at every radius" is admitted as "at every regular radius", which is how the subject's own Section 5.4 row for the elliptic–shear sector reads ($x\ne1$); the sublattice sector is unstable at every $x>0$ including $x=1$, so the ring at $x=1$, were it well posed, would still be unstable.

The correction history is credible and the corrected value is right. Section 4.3 of this document obtained $\kappa_1=(4\sqrt2-1)/(4x^3)$ independently before exposure, and $k_s=-\kappa_1$. Check C2 confirms the subject's consequence of the slip: with $(1-\sqrt2)/4$ the $k=1$ discriminant $-(\Omega^2+m_sk_s)$ changes sign at $x=\sqrt2-1=0.414214$ (value $-5.6\times10^{-17}$ there), so the sector would have appeared gyroscopically stabilized for $x>\sqrt2-1$; with the correct value it is unstable for every $x>0$. This document's own slip (the $z$-sector diagonal term misassigned between $k=1$ and $k=2$, caught by the assembled Jacobian) is of the same kind; in both lanes the assembled Jacobian, not the hand algebra, settled it. Verdict 3f: admitted.

Rate figures in units of $\Omega$ (check C2, closed forms of Section 4.3): at $x=1.7$ the sublattice growth is $1.0451\,\Omega$ and the elliptic–shear growth $1.1223\,\Omega$ (subject: 1.045, 1.122); at $x_\ast$ the sublattice growth is $0.7500\,\Omega$ and the two $k=2$ growths are $0.7515\,\Omega$ and $1.6652\,\Omega$ (subject: 0.750, 0.752, 1.665); in the control limit $x\to\infty$ the sublattice growth is $1.2438\,\Omega$ (subject: 1.243) and the $k=2$ growth is $1.5180\,\Omega$, which the subject prints as 1.517. Verdict 3g: admitted with that third-digit correction. The two spectral radii: the runner's preregistered predictions at $x=1.7$ and $0.8$ equal the closed forms of this document to $1.8\times10^{-15}$ (check C4), so the subject's Section 5.3 numbers and the Section 4.4 table of this document are the same numbers to every printed digit: $\Omega=0.3050250100$, breathing $0.2735177300$, sublattice $0.3187960589\pm0.1665083356\,i$, elliptic–shear $0.3423386901$ growth with $0.8634888159$ oscillation, warp $0.5365177775$ at $x=1.7$; $\Omega=0.9448738974$, breathing $0.7669575116$, sublattice $0.8396456240\pm0.3413849191\,i$, elliptic–shear growths $3.431079319$ and $0.8631738541$, warp $1.661967468$ at $x=0.8$. Verdict 3h: admitted; grade derived, independently confirmed by two separately written derivations and two separately written Jacobians.

### 4. Invariants and the reduced breathing energy

(6.1) is the $E$ of Section 5, with the sign of the $\dot r^2$ term opposite to its sign in $L$; the ring values $E=-\tfrac12(2\sqrt2-1)K/\rho$ and moment $4\rho^2\Omega$ follow from $2\Omega^2\rho^2=(2\sqrt2-1)K/(2\rho)$. (6.2) and (6.3) are the reduced Lagrangian and reduced energy of Section 5, with $m_a(\rho)=m_0$, the minimum of the effective potential at $\rho_0=\ell^2/(4(2\sqrt2-1)K)$, and $V''_{\mathrm{eff}}(\rho_0)=4\Omega^2$ returning the breathing frequency. The subject's K5 (reduced energy equals the monitored energy function on a symmetric state, $2.2\times10^{-16}$) is the identity $E_{\mathrm{red}}=E$ on the symmetric slice, which holds because $\dot r_{\mathrm{adj}}=\sqrt2\dot\rho$ and $\dot r_{\mathrm{opp}}=2\dot\rho$ make the $\dot r^2$ terms of $E$ sum to $2(\sqrt2-1)K\dot\rho^2/\rho$, the excess of $2m_0\dot\rho^2$ over $2\dot\rho^2$. The Lyapunov statement within the symmetric sector, and its restriction to that sector, are the statements of Section 5. Verdict 4: admitted; grade derived, independently confirmed; the subject's WR-8 evolution check is admitted as the measured confirmation that was listed as missing in both lanes (conserved to $1.4\times10^{-14}$ while symmetric, turning points $1.717000$ and $1.751687$ matched to $10^{-14}$ and $2\times10^{-8}$).

### 5. The measured section

**Known cases first (5a).** The runner's control flow runs `knownCases()` and writes its status before any target phase, and exits on a failure; the record lists eleven known cases, all passing, with the balance residuals ($\le2.7\times10^{-15}$), the fitter recoveries ($\le2.1\times10^{-14}$), the pairing labels on synthetic data, the sector projections, and the reduced-energy identity. The instrument itself is the unmodified pair instrument, identified by SHA-256 in the record, with its own known-case receipt. Admitted. One boundary to note: none of the known cases exercises the integrator on a four-member problem with a known answer; the four-member accuracy is established only through the agreement of the measured rates with the closed forms, which is the comparison this document anchors independently.

**Rates at $10^{-6}\rho$ (5b).** Check C4 compares every recorded fit (rtol $10^{-12}$, $10\epsilon$ window) with this document's closed forms, not with the runner's own prediction block. Relative differences (measured minus reference over reference):

| case | $x=1.7$ | $x=0.8$ |
| --- | --- | --- |
| sublattice growth | $-2.2\times10^{-10}$ | $-4.2\times10^{-8}$ |
| elliptic: $k=2$ roots $s=z^2$ | $-1.1\times10^{-11}$, $+1.1\times10^{-11}$ (growth $-5.5\times10^{-12}$, oscillation $+5.6\times10^{-12}$) | fast growth $-3.1\times10^{-9}$, slow growth $+6.4\times10^{-7}$ (14 samples) |
| shear: $k=2$ roots | growth $+2.5\times10^{-9}$, oscillation $-7.7\times10^{-8}$ | fast $+3.9\times10^{-9}$, slow $+7.2\times10^{-9}$ |
| warp frequency | $-4.3\times10^{-12}$ | $-4.4\times10^{-12}$ |
| tilt frequency | $+1.2\times10^{-11}$ | $-4.0\times10^{-10}$ |
| translation phase rate | $+2.6\times10^{-10}$ | $+1.9\times10^{-10}$ |
| boost modulus slope | $+5.9\times10^{-10}$ | $-2.6\times10^{-12}$ |
| rotation-phase breathing | $-4.6\times10^{-9}$ | $+4.4\times10^{-6}$ |
| breathing displacement | $+2.1\times10^{-5}$ | $+2.1\times10^{-5}$ |

Every unstable-sector rate agrees with this document to $6.4\times10^{-7}$ or better, and all but the slow elliptic root at $0.8$ to $4\times10^{-8}$ or better; the neutral and oscillatory sectors to $10^{-9}$ or better, except the two breathing-frequency fits discussed next. The round-off-seeded WR-0 growth rates ($0.34234$, $3.4315$, $3.6429$, $4.8913$ at the four radii) are this document's fastest rates ($0.3423386901$, $3.431079319$, $3.642998572$, $4.886597325$) to $2\times10^{-5}$, $10^{-4}$, $2\times10^{-5}$ and $10^{-3}$, as a log-linear regression over seven decades of amplitude can be expected to give. Verdict 5b: admitted. Grade of what this establishes: measured, by the subject instrument, now compared against an independent reference; the instrument's early-time dynamics at $x=1.7$ and $0.8$ is the linearized dynamics of Section 4 to the stated precision.

**The breathing-displacement miss (5c).** The subject attributes the $2.1\times10^{-5}$ miss to the Jordan drift: a position-only radial displacement $\epsilon\hat{\boldsymbol\rho}_j$ with velocities unchanged raises $\ell$ by the factor $1+\epsilon/\rho$, moves the family radius to $\rho(1+2\epsilon/\rho)$ and the family rate to $\Omega(1-3\epsilon/\rho)$, so in the frame rotating at $\Omega(\rho)$ the phase drifts as $\delta\varphi=-3(\epsilon/\rho)\Omega T$ and the radial projection $\rho'\cos\delta\varphi-\rho$ carries $-\rho\,\delta\varphi^2/2$, a term absent from the fitted model. Check C3 builds the synthetic signal $2-\cos(\omega_{\mathrm{br}}T)-\tfrac92(\epsilon/\rho)\Omega^2T^2$ on the recorded windows (124 samples to $T=45.57$ at $1.7$; 48 samples to $T=4.609$ at $0.8$) and fits it with an offset-plus-cosine model after that fitter passed a clean cosine to $10^{-16}$: the bias is $+2.18\times10^{-5}$ at $x=1.7$ with an absolute rms residual of $2.4\times10^{-4}\,\epsilon$, against the subject's measured $+2.1\times10^{-5}$ and relative rms $1.15\times10^{-4}$ of a signal of rms $2.1\,\epsilon$ (the same $2.4\times10^{-4}\,\epsilon$); at $x=0.8$ the bias is $+1.46\times10^{-5}$ against the measured $+2.1\times10^{-5}$, with residual $7\times10^{-7}\,\epsilon$ against the subject's $4.5\times10^{-7}$ relative (about $9\times10^{-7}\,\epsilon$). The sign, the order and the residual pattern are reproduced from the stated mechanism alone, so the explanation is admitted as the cause; the subject's WR-5 case, which excites the breathing through a radial velocity and leaves the family radius unchanged at first order, recovers the frequency to $5\times10^{-9}$, as it should on that account. Verdict 5c: admitted.

**First events and fates at $10^{-3}\rho$ (5d, 5e).** The record confirms the subject's table: at $x=1.7$ the first event of all nine runs in both tolerances is a member rising through $c_f$ (at $1.0$–$1.35$ periods for the unstable-sector starts, $2.3$ periods for the tilt, $5.0$–$5.4$ periods for the other stable-sector and round-off-seeded ones), no contact, obstruction or escape precedes it, and $\min|\det M|\ge2.64$ at $1.7$ and $\ge7.87$ at $0.8$. The pairing rule in the record is the subject's stated rule (stable minimal matching, both pairs opposite in polarity, larger pair separation at most a quarter of the pair-centre distance, pair-centre distance growing), which is a proximity-and-recession rule and does not by itself test boundedness. Check C5 supplies that test: on the final recorded state of each $x=1.7$ prereg trajectory it evaluates, for the two pairs of the minimal matching, the isolated-pair invariant $E_{\mathrm{rel}}=\tfrac14\|\mathbf w\|^2+\sigma K(1-\dot r^2/2)/r$, which for $\sigma=-1$ equals $\tfrac14\dot r^2(1+2K/r)+\tfrac14\|\mathbf w_\perp\|^2-K/r$ and therefore bounds $r$ when negative (the other pair is $100$–$900$ units away, so each pair is isolated to one part in $10^4$ of its own acceleration). Result: in the four runs the rule labels as two receding binaries (warp, boost, rotation phase, shear) both pairs are bound, including the wide ones, $(0,3)$ at $r=26.2$ in the boost run with $E_{\mathrm{rel}}=-0.032$ and $(0,1)$ at $r=2.51$ in the rotation-phase run with $E_{\mathrm{rel}}=-0.137$; in the five runs labelled not paired, exactly one pair is bound (the tight one, $E_{\mathrm{rel}}$ from $-2.8$ to $-34$) and the other is unbound ($E_{\mathrm{rel}}$ from $+1.5$ to $+37$ at $r=57$–$1000$). The subject's characterization "two receding binaries, or one tight binary with two unbound members" is therefore confirmed by an invariant, not only by the proximity rule, and the statement that the derived pairing expectation is confirmed as a first stage (a tight opposite-polarity pair forms first in every run) and not as an end state (five of nine runs leave two members unbound) is supported. One correction to the refinement column of the $x=0.8$ row: the subject writes that stable-sector starts agree on the first-event time only to $0.04$–$0.33$; the record shows that this holds for the in-plane stable-sector starts (breathing $0.33$, translation $0.036$, boost $0.29$, rotation phase $0.13$) while the two out-of-plane starts agree to $3\times10^{-12}$ (warp) and $5\times10^{-10}$ (tilt), as well as the unstable-sector starts do. The like-polarity collapse at $x<1$ is as reported: in all nine $0.8$ runs, in both tolerances and in the WR-0 runs at $x_\ast$ and $0.3$, one like pair, $(0,2)$ or $(1,3)$, closes to $3$–$5\times10^{-5}$ (rtol $10^{-12}$) and $7$–$11\times10^{-6}$ (rtol $10^{-10}$) with member speeds $2.8\times10^4$–$2\times10^5\,c_f$, the other like pair at $1.95$–$1.96$ and the adjacent pairs at $0.95$–$1.0$. Verdicts 5d admitted with the refinement-column correction; 5e admitted.

**The finite-time-singularity inference (5h).** The subject grades as inferred that the step underflow at $x<1$ marks a finite-time singularity of the law. The isolated like pair supports this: for $\sigma=+1$ the pair invariant reads $E_{\mathrm{rel}}=\tfrac14\dot r^2(1-2K/r)+\tfrac{L^2}{4r^2}+\tfrac Kr$ with $L=r^2\dot\theta$ conserved, and for $r<2K$ the radial weight is negative, so as $r\to0$ one has $\dot r^2\simeq L^2/(2Kr)$: the pair reaches $r=0$ in finite time with the transverse speed $L/r$ diverging. The diagonal pair of the ring starts at $2\rho<2K$ for every $x<1$, which is exactly the indefinite-$M$ domain of Section 2, and the measured per-member speed at the stop ($4.5\times10^4$ at $r=3\times10^{-5}$) is $L/(2r)$ for $L\approx2.4$, the pair's initial relative angular momentum. The inference is consistent with the law's own pair reduction; what remains unproved is that the four-member solution is governed by that reduction all the way to $r=0$, which the two distant members cannot affect at the measured separations but which no theorem here establishes. Verdict 5h: admitted as inferred, consistent with the derived isolated-pair scaling.

**Anomalies (5f).** The record's `anomalies` list and the subject's 10.6 agree: the breathing-fit miss (explained, 5c), the step cap lowered from 40,000 to 15,000 after the first three $10^{-3}$ runs (affects where runs stop, not what they measured before stopping; the stops are recorded per run), the step underflow at $x<1$ before the contact threshold (the inference is graded), the nonlinear $100\epsilon$ windows at $0.8$ (the $10\epsilon$ windows carry the comparison), the weak sublattice phase check ($0.75\%$, window too short), the $H$ drift up to $10^{-4}$ in the tight-binary phase (the fitted windows have drift below $10^{-10}$), and the sandbox killing background processes (the runner resumes from its record; seventeen resumptions are listed). None of these limits the rate claims, which rest on the early windows; the step caps and the refinement disagreement after breakup limit the fate claims to "within the recorded stop, deterministic but exponentially sensitive after the linear stage", which is how the subject states them. The pair partition is reproducible across tolerances for the unstable-sector starts and not for the round-off-seeded ones, as the subject says. Verdict 5f: admitted.

**Labels (5g).** The speed labels are those of Section 3: at $x_\ast$ the ring sits exactly on the ceiling and is admitted by the unrestricted and inclusive labels only; at $0.3$, with $v=1.234\,c_f$, by the unrestricted label only; at $1.7$ and $0.8$ by all three. The subject's use ("inclusive" at $x_\ast$, "unrestricted" at $0.3$) is right. A consequence the subject states only implicitly belongs in the verdict: under either ceiling label every $x=1.7$ history at amplitude $10^{-3}$ becomes inadmissible at its first event, a member crossing $c_f$ within $1.0$–$5.4$ periods, before any pairing completes; the measured fates are fates under the unrestricted label. Verdict 5g: admitted.

### 6. Graded ring verdict for the PI

- **Exact balanced solution at every $\rho>0$, with $\Omega^2=(2\sqrt2-1)K/(4\rho^3)$ and $\ddot r_{ij}=0$ on it.** Derived; independently confirmed (two separately written derivations and two separately written assemblers agree to round-off). The ring at $x=1$ is a solution whose continuation is not determined by the law; it is excluded from the well-posed family in both lanes.
- **Linear instability at every regular radius.** Derived; independently confirmed. Two independent unstable sectors, the polarization (sublattice) sector for every $x>0$ and the alternating ($k=2$) sector for every $x\ne1$, with growth rates of order $\Omega$ (sublattice from $0.64\,\Omega$ at $x=0.3$ to $1.05\,\Omega$ at $1.7$; the fast $k=2$ rate $1.12\,\Omega$ at $1.7$, $3.6\,\Omega$ at $0.8$, and diverging as $x\to1^-$ with $m_r\to0^-$), tending to $1.24\,\Omega$ and $1.52\,\Omega$ in the control limit; the symmetric breathing sector and the out-of-plane sector are neutral. The Weber terms enter the spectrum only through $M$ and neither create nor remove the instability, which is already present in the instantaneous inverse-square control.
- **Measured departure and fates.** Measured, same lane (subject instrument and runner, 36 perturbed runs plus 8 unperturbed and 2 breathing runs, each to its recorded stop), with the early-time rates now anchored to this independent reference at $\le6.4\times10^{-7}$ and the final-state pair classification confirmed here by the pair invariant. The ring is lost from round-off alone in about $2.5$ periods at $x=1.7$ and in about one period at $x\le0.8$; at amplitude $10^{-3}$ the first event is always a speed crossing, and the fate within 20 periods at $x=1.7$ is two bound receding opposite-polarity pairs (4 of 9) or one bound tight pair with two unbound members (5 of 9); at $x<1$ it is a like-polarity pair collapse with diverging transverse speed, consistent with the isolated-pair reduction.
- **Persistence.** None. No run at any radius, amplitude or tolerance keeps the four members on or near the ring; nothing in the measurements shows a return toward the ring family after departure.

**NO GO.** Under this fixed law (instantaneous support, $\lambda_{\mathrm W}=-1/2$, $\mu_{\mathrm W}=1$, equal coupling, unit weights), a persistent four-member alternating ring does not exist: the exact solution is linearly unstable at every regular radius with $e$-folding times of order one radian of rotation, the measured histories leave the ring family and do not return, and under either speed-ceiling label every measured history is inadmissible before its fate is reached. This is a NO GO for persistence, not for existence or for the derivation chain, both of which stand. What could reopen it, none of which the present evidence shows: (i) a nonlinear bounded fate, a history that leaves the linear neighbourhood and returns to it recurrently, which would require a measured return of all six separations toward their ring values after a departure of order $10^{-3}$; (ii) a change of the law itself (causal delay, other coefficients, a selected ceiling response), which is outside the frozen run and would void every number here; (iii) a different inventory or geometry, which this analysis does not address.

**Falsifiers for this verdict**, in addition to those of Section 8: a Jacobian of the rotating-frame vector field at the balanced ring with no eigenvalue of positive real part at some regular $x$, checked against the $k=2$ pair $\pm0.3423386901$ at $x=1.7$ or $\pm3.431079319$ at $x=0.8$; a rerun of WR-0 at the recorded settings whose symmetry-breaking amplitude stays below $10^{-8}$ for more than five periods at $x=1.7$; a $10^{-3}$-amplitude history at any regular radius in which all six separations return to within $10^{-2}$ of their ring values after having departed by $10^{-1}$; a final state labelled "two binaries" whose pair invariant $E_{\mathrm{rel}}$ is positive, or one labelled "not paired" with both pairs bound; a like-pair approach at $x=0.8$ that turns around above $r=10^{-4}$.

### 7. Addendum to this document's own reference (numbered)

1. **Naming.** This document's $x_c$ is the subject's $x_\ast$; "alternating radial", "$k=2$ tangential" and "polarization" are the subject's "elliptic", "shear" and "sublattice separation". The subject's names are the ones the runner and record use and are adopted in this section.
2. **Completeness of Section 7.** The table of rates at $x_c$ and $x=0.3$ gave only the larger $k=2$ growth; both roots are real there. The slower $k=2$ growths are $1.644023999$ at $x_c$ ($0.7515\,\Omega$) and $2.618202387$ at $x=0.3$ ($0.6363\,\Omega$); the sublattice growths there are $0.7500\,\Omega$ and $0.6443\,\Omega$ (check C2). Nothing in the fixed table is wrong.
3. **Static ring.** Not covered by the fixed reference; now derived and checked (C1). The mechanism is the breathing eigenvalue $m_0$ dividing the inverse-square right side.
4. **Pair invariant as a boundedness test.** Added here (K0b, C5) as the instrument for the fate classification: $E_{\mathrm{rel}}<0$ bounds an isolated opposite-polarity pair under this law, and for a like pair inside $r<2K$ the same invariant gives the finite-time collapse scaling $\dot r^2\simeq L^2/(2Kr)$.
5. **Nothing in Sections 1–8 is shown wrong** by the subject or by the measurements. Every number named as a falsifier in Section 8 is reproduced by the subject's independent assembler and Jacobian, and the measured rates sit within $6.4\times10^{-7}$ of the closed forms at both spectral radii. The fixed reference script was not modified.


## Evidence path promotion, 2026-10-05

The linked scratch files `.tmp/weber-overnight/pi/common-brief.md` were moved byte-identically to the durable paths now linked above. The [closeout promotion map](../../binary-research/analysis/weber-overnight-closeout-verification.md#part-3--promotion-map) records each old path, new path and SHA-256. Historical command text and receipt content retain their recorded paths; ignored scratch aliases preserve those provenance-bound paths without making them the durable owner.


### Durable copies of recorded scratch inputs

Recorded command and provenance text retain their original paths. Byte-identical durable owners are [common-brief.md](../../binary-research/evidence/weber-overnight-promoted/pi/common-brief.md). The [promotion map](../../binary-research/analysis/weber-overnight-closeout-verification.md#part-3--promotion-map) records hashes and the retained scratch aliases.
