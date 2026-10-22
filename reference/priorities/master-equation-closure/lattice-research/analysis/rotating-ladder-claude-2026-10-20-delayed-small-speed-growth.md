# Rotating ladder: why the delay makes the neutral in-step oscillation grow, and at what rate

## Result

The untwisted rotating alternating ladder has, in its zero-delay comparison, a neutral oscillation in which every pair moves in step in the plane of rotation, with frequency $\Omega_0\,\omega$, $\Omega_0=0.5912818181$. Under the delayed Master Equation this oscillation grows. Its growth rate at small member speed $\epsilon=\omega R/c_f$ is

$$
\frac{\operatorname{Re}\lambda(\epsilon)}{\omega}=c_1\,\epsilon+O\bigl(\epsilon^2\log(1/\epsilon)\bigr),\qquad c_1=\frac{\beta_*\delta_*\,(2-\Omega_0^2)}{2\,S_0\,\Omega_0^2}=5.3762712030\pm7.6\times10^{-10},
$$

where $\delta_*=3.3452801576$ is the balanced spacing ratio at zero speed, $\beta_*$ is the slope of the first-order balance bracket there, $S_0=S(\delta_*,0)=0.1915345910$ is the static inward sum, and $\Omega_0^2=4-24T_5/S_0$ with $T_5$ an alternating lattice sum given below. $S_0$ and $T_5$ have exponentially convergent Bessel-series forms, and $\beta_*\delta_*=y_*^2/24+y_*^4\cosh y_*/144$, with $y_*\sinh y_*=6$, is elementary. In the sector of this mode an argument given in outline improves the bound on the correction to $O(\epsilon^2)$. Measured with an exact delayed evaluator written for this note, the root is $\operatorname{Re}\lambda/\omega=5.37625\,\epsilon$ at $\epsilon=10^{-4}$ and the next term is $-2.56\times10^3\,\epsilon^3$, with no detectable $\epsilon^2$ or $\epsilon^2\log\epsilon$ term; the measurements of the 2026-10-03 adjudication ($0.00743\,\omega$ at speed $0.00138$, $0.0689\,\omega$ at $0.0138$) are reproduced to all printed digits.

The mechanism, stated in acceleration-first terms: to first order in the speed the delay adds to every receiver an acceleration proportional to the velocity perturbation of each source, with matrix $\epsilon\,\sigma(I-2\mathbf n\mathbf n^{\mathsf T})/\tau^2$ in units of the static coupling. Most of it is the source's displacement seen one delay late; the rest is the velocity dependence of the factor $D=1-\mathbf n\cdot\mathbf V$. For the in-step oscillation the tangential part of this delayed velocity coupling sums to exactly the first-order balance bracket, which is zero at the balanced spacing. The radial part sums to $-\beta_*\delta_*/S_0=-2.278$: a drag on the radial velocity of each member as measured in the non-rotating frame, of which the rung partner supplies 57 percent. In this oscillation the radial velocity in the non-rotating frame is dominated by the turning of the large tangential excursion and is opposite in phase to the radial velocity seen in the co-rotating frame. The drag therefore pushes along the co-rotating motion and does positive work on an oscillation whose co-rotating energy is positive. That is why the sign is growth.

The same calculation gives every neutral oscillation of the zero-delay comparison a first-order growth coefficient. At the nine wavenumbers $q=0,\pi/8,\dots,\pi$ in both symmetry sectors there are 58 simple neutral roots, excluding the two exact translation roots; 50 have positive coefficient and 8 negative. These 50, with the 21 roots already growing at zero delay, make 71 growing roots, the number that the adjudication's Newton search found at speed $0.014$ at the same wavenumbers. The alternating-rung pair of the adjudication is the $q=0$, $p=-1$ oscillation with $\Omega_0=1.5916652$ and $c_1=0.3274585$; a second $q=0$, $p=-1$ pair, $\Omega_0=0.4006676$, has $c_1=0.1485701$.

**Claim grade.** Derived: the first-order matrix $\Delta_1$ and its decomposition (Section 2); the eigenvalue-shift formula and its $q=0$ reduction (Section 3); the closed form of $c_1$ (Section 4); the remainder bound $O(\epsilon^2\log(1/\epsilon))$ for every sector and the continuation of the root (Section 5, with constants not evaluated). Derived in outline, with the derivative estimate sketched rather than written out: the improved bound $O(\epsilon^2)$ in the sector of the in-step pair (Proposition 5.4). Measured: the enclosure of $c_1$ (interval arithmetic, mpmath 1.3.0 `iv`, a declared primitive dependency); the exact delayed roots, the next-order fit and the $q$-table (float, truncated sums; instruments named in Section 7). Inferred: the absence of an $\epsilon^2$ term in $\operatorname{Re}\lambda$, and the identification of the 71 growing roots with the adjudication's count. All statements concern formal modes $\mathbf c\,e^{\lambda T}e^{iqk}$ of the first variation about the small-speed balance. Nothing here is a nonlinear statement or a complete spectrum. Units: $c_f=1$, $K=1$.

## 1. Setting

**Configuration and balance.** The ladder is that of the [subject document](rotating-alternating-ladder.md#the-configuration). Lengths are measured in the pair radius $R$, so the ladder has radius $1$, spacing $\delta=d/R$ and member speed $\epsilon=\omega R$. By the [small-speed existence theorem](rotating-ladder-small-speed-existence.md) (Theorem, Parts 1 and 3), for $0<\epsilon<\epsilon_0$ there is a unique balanced spacing $\delta(\epsilon)$ in a window $J$ around $\delta_*$, with $\lvert\delta(\epsilon)-\delta_*+\epsilon^2/(6\beta_*)\rvert\le C\epsilon^3$, and the radius is $R=S(\delta(\epsilon),\epsilon)/\epsilon^2$. That is the state about which everything below is linearised, so the linearisation has a referent.

**Receiver and sources.** The receiver is the positive member of rung $0$, at $\mathbf x=(1,0,0)$ at time $0$, with co-rotating frame $(\mathbf e_r,\mathbf e_t,\mathbf e_z)$ equal to the coordinate axes at that instant. A source is labelled $j=(\nu,k)$: rail sign $\nu=\pm1$ and rung $k\in\mathbb Z$, with $(\nu,k)\ne(+1,0)$. Its path is $\nu(\cos\epsilon t,\sin\epsilon t,0)+(0,0,k\delta)$ and its polarity relative to the receiver is $\sigma_j=\nu(-1)^k$. By Lemma 1 of the existence proof it has exactly one causal delay $\tau_j>0$, the root of $\tau^2=k^2\delta^2+2-2\nu\cos(\epsilon\tau)$, and the receiver gets nothing from its own past. Write $\theta_j=\epsilon\tau_j$ for the delay angle. At the emission time,

$$
\mathbf r_j=(1-\nu\cos\theta_j,\ \nu\sin\theta_j,\ -k\delta),\quad \mathbf V_j=\nu\epsilon(\sin\theta_j,\cos\theta_j,0),\quad \mathbf A_j=-\nu\epsilon^2(\cos\theta_j,-\sin\theta_j,0),
$$

and the source's own frame, expressed in the receiver's, is $Q_j=\nu R(-\theta_j)\oplus1$, with $R(\phi)$ the rotation by $\phi$ in the plane of rotation. The zero-speed values are $\tau^0_j=\lvert k\rvert\delta$ and $\mathbf n^0_j=(0,0,-\operatorname{sgn}k)$ for $\nu=+1$, $\tau^0_j=\sqrt{4+k^2\delta^2}$ and $\mathbf n^0_j=(2,0,-k\delta)/\tau^0_j$ for $\nu=-1$, and $Q^0_j=\operatorname{diag}(\nu,\nu,1)$.

**Modes.** A mode displaces every member by $\mathbf c\,e^{\lambda T}e^{iqk}$ in its own frame, multiplied by $p=\pm1$ for negative members. The source weight is therefore $w_j=p_j\,e^{iqk}$ with $p_j=1$ if $\sigma_j=+1$ and $p_j=p$ if $\sigma_j=-1$.

**Characteristic matrix in rescaled units.** Take the time unit $1/\omega$ and write $\hat\lambda=\lambda/\omega$. A delay of geometric length $\tau$ (in units of $R$) is then the time $\epsilon\tau$, the acceleration unit is $\omega^2R$, and the coupling $K/R^2$ becomes $1/S$ because $\omega^2R^3=S$ at balance. A velocity perturbation in units of $c_f$ is $\epsilon(\hat\lambda I+J)$ times the displacement amplitude. With $L_{u,j}$ and $L_{w,j}$ the first-variation matrices of the [adjudication's pre-target reference](rotating-ladder-delayed-stability-independent-adjudication-2026-10-03.md#pre-target-reference), evaluated with the quantities above in units of $R$, the characteristic matrix of the [adjudication](rotating-ladder-delayed-stability-independent-adjudication-2026-10-03.md#characteristic-problem-used-here) becomes (derived)

$$
\Delta(\hat\lambda;q,p,\epsilon)=(\hat\lambda I+J)^2+\frac1S\Bigl[-\sum_jL_{u,j}+\sum_jw_j\,e^{-\hat\lambda\theta_j}\bigl(L_{u,j}Q_j-\epsilon\,L_{w,j}Q_j(\hat\lambda I+J)\bigr)\Bigr],
$$

with $S=S(\delta(\epsilon),\epsilon)$, $\delta=\delta(\epsilon)$ and $J$ the generator of rotation in the plane ($J\mathbf e_r=\mathbf e_t$, $J\mathbf e_t=-\mathbf e_r$, $J\mathbf e_z=0$). The speed now enters only through the delay angles $\theta_j$, the source velocity and acceleration, the explicit factor in front of $L_w$, and $S$ and $\delta$. For $\operatorname{Re}\hat\lambda\ge0$ every $\lvert e^{-\hat\lambda\theta_j}\rvert\le1$ and the sum converges absolutely, dominated by $C/k^2$; for $\operatorname{Re}\hat\lambda<0$ it diverges. $\Delta$ is analytic in $\operatorname{Re}\hat\lambda>0$ and continuous up to the imaginary axis.

**Zero-delay limit.** At $\epsilon=0$: $\theta_j=0$, $\mathbf V_j=\mathbf A_j=0$, $L^0_{u,j}=\sigma_j(I-3\mathbf n^0_j\mathbf n^{0\mathsf T}_j)/\tau_j^{0\,3}$, and

$$
\Delta_0(\hat\lambda;q,p)=(\hat\lambda I+J)^2+M_0,\qquad M_0=\frac1{S_0}\Bigl[-\sum_jL^0_{u,j}+\sum_jw_jL^0_{u,j}Q^0_j\Bigr],
$$

which is the linearisation, in the rotating frame, of the comparison dynamics with instantaneous inverse-square rows at present positions. $M_0$ is Hermitian at every $q$: its only non-symmetric entries are the radial-axial couplings of the far rail, which are real, antisymmetric and odd in $k$, and acquire the factor $i\sin qk$. Hence $\Delta_0(i\Omega)$ is Hermitian for real $\Omega$ (derived).

## 2. The first-order matrix

**Expansion of the ingredients (derived).** Fix a source $j$ and expand at fixed $k$. By Lemma 1(c) of the existence proof, $\tau_j=\tau^0_j(1+O(\epsilon^2))$, so $\theta_j=\epsilon\tau^0_j+O(\epsilon^3\tau^0_j)$. Then $\mathbf r_j=\mathbf r^0_j+\epsilon\tau^0_j\nu\,\mathbf e_t+O(\epsilon^2\tau^{0\,2}_j)$, hence $\mathbf n_j=\mathbf n^0_j+\epsilon\nu\,\mathbf e_t+O(\epsilon^2\tau^0_j)$, the aberration of the emission position. Further $\mathbf V_j=\epsilon\nu\,\mathbf e_t+O(\epsilon^2\tau^0_j)$, $\lvert\mathbf V_j\rvert^2=\epsilon^2$, $\mathbf r_j\cdot\mathbf A_j=O(\epsilon^2)$, and $D_j=1-\nu\epsilon\sin\theta_j/\tau_j=1+O(\epsilon^2)$ by Lemma 2(a) of the existence proof. Also $Q_j=Q^0_j-\epsilon\tau^0_j\nu J+O(\epsilon^2\tau^{0\,2}_j)$ and $e^{-\hat\lambda\theta_j}=1-\epsilon\hat\lambda\tau^0_j+O(\epsilon^2\tau^{0\,2}_j)$.

**The row matrix to first order (derived).** Since $\kappa=\tau D$ and $\mathbf r/\kappa=\mathbf n/D$, the formula for $L_u$ with $D=1+O(\epsilon^2)$, $\lvert\mathbf V\rvert^2,\ \mathbf r\cdot\mathbf A=O(\epsilon^2)$ becomes

$$
L_u=\frac{\sigma}{\tau^3}\bigl[I+(\mathbf V-2\mathbf n)\mathbf n^{\mathsf T}-\mathbf n(\mathbf n^{\mathsf T}-\mathbf V^{\mathsf T})\bigr]+O\Bigl(\frac{\epsilon^2}{\tau^3}\Bigr)=\frac{\sigma}{\tau^3}\bigl[I-3\mathbf n\mathbf n^{\mathsf T}+\mathbf V\mathbf n^{\mathsf T}+\mathbf n\mathbf V^{\mathsf T}\bigr]+O\Bigl(\frac{\epsilon^2}{\tau^3}\Bigr).
$$

In the pre-target derivation the term $\mathbf V\mathbf n^{\mathsf T}$ is $\rho\mathbf V$, the source position moved along its path by the shift of the emission time; $\mathbf n\mathbf V^{\mathsf T}$ is $-\mathbf u\cdot\mathbf V$ in $\delta\kappa$, the change of $D=1-\mathbf n\cdot\mathbf V$ with the separation; and $-3\mathbf n\mathbf n^{\mathsf T}$ carries the aberrated direction. Inserting $\mathbf n=\mathbf n^0+\epsilon\nu\mathbf e_t$ and $\mathbf V=\epsilon\nu\mathbf e_t$,

$$
L_{u,j}=L^0_{u,j}+\epsilon\,\delta L_{u,j}+\dots,\qquad \delta L_{u,j}=\frac{\sigma_j\nu}{\tau^{0\,3}_j}\Bigl[\underbrace{-3(\mathbf e_t\mathbf n^{0\mathsf T}_j+\mathbf n^0_j\mathbf e_t^{\mathsf T})}_{\text{aberration}}+\underbrace{\mathbf e_t\mathbf n^{0\mathsf T}_j}_{\text{emission-time shift}}+\underbrace{\mathbf n^0_j\mathbf e_t^{\mathsf T}}_{D\text{ variation}}\Bigr]=-\frac{2\sigma_j\nu}{\tau^{0\,3}_j}(\mathbf e_t\mathbf n^{0\mathsf T}_j+\mathbf n^0_j\mathbf e_t^{\mathsf T}).
$$

The factor $1/D$ itself contributes nothing at first order, because $D-1=O(\epsilon^2)$. The velocity matrix $L_w=\sigma\mathbf n\mathbf n^{\mathsf T}/(\tau^2D^2)$ is the dependence of $D$ on the source velocity; it enters with an explicit $\epsilon$, so only $L^0_{w,j}=\sigma_j\mathbf n^0_j\mathbf n^{0\mathsf T}_j/\tau^{0\,2}_j$ appears at first order.

**Five pieces (derived).** Collecting the terms linear in $\epsilon$, with $S$ and $\delta$ contributing only at order $\epsilon^2$ (Section 5),

$$
\Delta_1=\frac1{S_0}\bigl[P_1+P_2+P_3+P_4+P_5\bigr],
$$

$$
P_1=-\sum_j\delta L_{u,j},\quad P_2=\sum_jw_j\,\delta L_{u,j}Q^0_j,\quad P_3=-\sum_jw_j\tau^0_jL^0_{u,j}Q^0_jJ,\quad P_4=-\hat\lambda\sum_jw_j\tau^0_jL^0_{u,j}Q^0_j,\quad P_5=-\sum_jw_jL^0_{w,j}Q^0_j(\hat\lambda I+J).
$$

$P_1$ and $P_2$ are the first-order changes of the row matrix at the receiver and at the source. $P_3$ is the turning of the source frame through the delay angle, using $Q^0_jJ=\nu J$. $P_4$ is the emission-time factor $e^{-\hat\lambda\theta}$. $P_5$ is the velocity perturbation. Every term is bounded by $C/k^2$ and the sums converge absolutely.

**The velocity coupling (derived).** $P_3+P_4=-\sum_jw_j\tau^0_jL^0_{u,j}Q^0_j(\hat\lambda I+J)$, because the source frame turns as $Q_j(s)=Q_j(0)e^{Js}$: the source's displacement at the emission time is $Q^0_je^{-(\hat\lambda I+J)\theta_j}\mathbf c$, and to first order the frame rotation and the exponential are one lag of the source's displacement in the non-rotating frame. Since $\tau L^0_u+L^0_w=\sigma(I-3\mathbf n\mathbf n^{\mathsf T}+\mathbf n\mathbf n^{\mathsf T})/\tau^2$,

$$
\boxed{\ \Delta_1(\hat\lambda;q,p)=\frac1{S_0}\Bigl[\sum_j\frac{2\sigma_j\nu_j}{\tau_j^3}(\mathbf e_t\mathbf n_j^{\mathsf T}+\mathbf n_j\mathbf e_t^{\mathsf T})(I-w_jQ^0_j)\Bigr]-\mathcal M_v(q,p)\,(\hat\lambda I+J),\qquad \mathcal M_v=\frac1{S_0}\sum_jw_j\sigma_j\frac{I-2\mathbf n_j\mathbf n_j^{\mathsf T}}{\tau_j^2}Q^0_j\ }
$$

with $\tau_j,\mathbf n_j$ the zero-speed values. $(\hat\lambda I+J)\mathbf c$ is the source's velocity perturbation in the non-rotating frame, written in the source's own frame. So the first-order effect of the delay, apart from the aberration term, is an acceleration on the receiver equal to $+\epsilon\mathcal M_v$ times that velocity: the receiver responds to a source displacement $\tau$ earlier, $\boldsymbol\xi(t-\tau)\approx\boldsymbol\xi-\tau\dot{\boldsymbol\xi}$, and to the source's velocity through $D$.

**Checks of $\Delta_1$ (measured).** The instrument `first_order.py` evaluates the five pieces. Before any target use it passed three known cases (`controls_first_order.py`). (i) Symmetry identities exact in $\epsilon$ hold order by order: $\Delta_1(0;0,+1)\mathbf e_z=0$ to $3\times10^{-33}$, $\Delta_1(0;0,+1)\mathbf e_t=0$ to $8.3\times10^{-11}$ (the pieces are individually of order $1$; truncation $\lvert k\rvert\le2\times10^5$), and $\Delta_1(\pm i;\pi,-1)(1,\pm i,0)=0$ to $2.4\times10^{-16}$. (ii) Its $\Delta_0$ equals the exact evaluator at $\epsilon=0$ to $4\times10^{-12}$. (iii) Against the difference quotient $(\Delta(\epsilon)-\Delta_0)/\epsilon$ of the exact evaluator at the balanced spacing, the largest entry defect is $4.46\times10^{-2}$, $4.46\times10^{-3}$, $4.46\times10^{-4}$ at $\epsilon=10^{-2},10^{-3},10^{-4}$ for the in-step point $\hat\lambda=0.5912818\,i$, and falls in the same proportion at two other points. The hand derivation of $\Delta_1$ and the exact evaluator share only the adjudicated $L_u$, $L_w$; this check tests the expansion, not those formulas.

## 3. The eigenvalue shift

**General formula (derived).** Let $\hat\lambda_0=i\Omega_0$ be a simple zero of $f_0=\det\Delta_0(\cdot;q,p)$, with $\Delta_0(i\Omega_0)\mathbf c=0$ and $\mathbf w^{\mathsf H}\Delta_0(i\Omega_0)=0$. Since $\Delta_0(i\Omega_0)$ is Hermitian, $\mathbf w=\mathbf c$. With $f=\det\Delta$ and $f_1=\partial_\epsilon f$ at $\epsilon=0$, Jacobi's formula and $\operatorname{adj}\Delta_0(i\Omega_0)=\kappa\,\mathbf c\mathbf c^{\mathsf H}$ give

$$
\hat\lambda_1=-\frac{f_1(i\Omega_0)}{f_0'(i\Omega_0)}=-\frac{\mathbf c^{\mathsf H}\Delta_1(i\Omega_0)\mathbf c}{\mathbf c^{\mathsf H}\,2(i\Omega_0I+J)\,\mathbf c},\qquad \operatorname{Re}\hat\lambda_1=-\frac{\operatorname{Im}\bigl(\mathbf c^{\mathsf H}\Delta_1(i\Omega_0)\mathbf c\bigr)}{\mathcal K},\qquad \mathcal K=-i\,\mathbf c^{\mathsf H}2(i\Omega_0I+J)\mathbf c\in\mathbb R .
$$

$\mathcal K$ is the Krein quantity of the neutral root. For the in-step pair it equals $4E/\Omega_0$, with $E$ the time-averaged energy of the oscillation in the co-rotating frame (Section 6), so its sign is the sign of that energy.

**Reduction at $q=0$ (derived).** The reflection $z\to-z$ maps rung $k$ to $-k$ with the same polarity and reverses each frame's axial vector; the $q=0$ mode family is invariant under it. So $\Delta(\hat\lambda;0,p,\epsilon)$ is block diagonal, plane of rotation plus axis, at every speed. In the plane, $M_0=\operatorname{diag}(k_r,k_t)$, because the static matrices have no radial-tangential entry, and the even part of $\mathbf e_t\mathbf n_j^{\mathsf T}+\mathbf n_j\mathbf e_t^{\mathsf T}$ is $n_{j,r}(\mathbf e_t\mathbf e_r^{\mathsf T}+\mathbf e_r\mathbf e_t^{\mathsf T})$. The first bracket of $\Delta_1$ is then a real multiple of $\mathbf e_t\mathbf e_r^{\mathsf T}+\mathbf e_r\mathbf e_t^{\mathsf T}$, and $\mathcal M_v=\operatorname{diag}(m_r,m_t)$. A neutral in-plane mode has $\mathbf c=(a,ib,0)$ with $a,b$ real and $b=(\Omega_0^2+1-k_r)a/(2\Omega_0)$; then $\mathbf c^{\mathsf H}(\mathbf e_t\mathbf e_r^{\mathsf T}+\mathbf e_r\mathbf e_t^{\mathsf T})\mathbf c=0$, so the aberration bracket contributes nothing, and with $\mathbf u=(i\Omega_0I+J)\mathbf c$

$$
\hat\lambda_1=\frac{\mathbf c^{\mathsf H}\mathcal M_v\mathbf u}{\mathbf c^{\mathsf H}2\mathbf u}=\frac{m_r\,a(\Omega_0a-b)+m_t\,b(\Omega_0b-a)}{2\,[a(\Omega_0a-b)+b(\Omega_0b-a)]}\in\mathbb R .
$$

At $q=0$ the first-order shift is a pure growth or decay rate, with no first-order change of frequency.

## 4. The in-step pair: closed form

**Static stiffness (derived).** In the sector $p=+1$ at $q=0$ every weight is $w_j=1$. On the receiver's rail the receiver and source terms cancel. On the far rail $Q^0=\operatorname{diag}(-1,-1,1)$ and $\sigma=-(-1)^k$, so the in-plane entries are $k_r=1-24T_5/S_0$ and $k_t=1$, with

$$
S_0=\sum_k\frac{2(-1)^k}{(4+k^2\delta_*^2)^{3/2}}=\frac{y_*^2}{\pi}\sum_{m\ge0}(2m+1)K_1\bigl((2m+1)y_*\bigr),\qquad T_5=\sum_k\frac{(-1)^k}{(4+k^2\delta_*^2)^{5/2}}=\frac{y_*^3}{24\pi}\sum_{m\ge0}(2m+1)^2K_2\bigl((2m+1)y_*\bigr),
$$

by Poisson summation with the transforms of $(x^2+c^2)^{-3/2}$ and $(x^2+c^2)^{-5/2}$, $c=y_*/\pi$; $K_1$, $K_2$ are modified Bessel functions. $k_t=1$ is the rigid rotation. The in-plane determinant is $\hat\lambda^2(\hat\lambda^2+k_r+3)$ and the axial entry is $\hat\lambda^2$, so

$$
f_0(\hat\lambda)=\hat\lambda^4\bigl(\hat\lambda^2+\Omega_0^2\bigr),\qquad \Omega_0^2=4-\frac{24\,T_5}{S_0},\qquad \mathbf c\propto\Bigl(1,\ \frac{2i}{\Omega_0},\ 0\Bigr),
$$

and $\pm i\Omega_0$ are simple zeros. The tangential excursion is $2/\Omega_0=3.38$ times the radial one.

**Velocity coupling (derived).** On the receiver's rail $\mathbf n_j=\pm\mathbf e_z$ exactly, so $I-2\mathbf n\mathbf n^{\mathsf T}$ is the identity in the plane and the sum is $\sum_{k\ne0}(-1)^k/(k^2\delta^2)=-\pi^2/(6\delta^2)$ in both in-plane entries. On the far rail $n_{j,r}=2/\tau_k$, $Q^0=-I$ in the plane and $\sigma=-(-1)^k$, so the sum is $\sum_k(-1)^k\operatorname{diag}(1-8/\tau_k^2,\,1)/\tau_k^2$ with $\tau_k^2=4+k^2\delta^2$; the radial-tangential entries vanish and the radial-axial ones cancel between $\pm k$. With $\sum_k(-1)^k/(4+k^2\delta^2)=\pi/(2\delta\sinh(2\pi/\delta))$,

$$
S_0\,m_t=\frac{\pi}{2\delta\sinh(2\pi/\delta)}-\frac{\pi^2}{6\delta^2}=B(\delta),\qquad S_0\,m_r=B(\delta)-8\sum_k\frac{(-1)^k}{(4+k^2\delta^2)^2}.
$$

$B$ is the first-order balance bracket of the subject document, so $m_t=0$ at $\delta_*$. Differentiating $\sum_k(-1)^k/(k^2+c^2)=\pi/(c\sinh\pi c)$ in $c$ gives, with $y=2\pi/\delta$, $\sum_k(-1)^k(4+k^2\delta^2)^{-2}=\tfrac1{32}\bigl[y/\sinh y+y^2\cosh y/\sinh^2y\bigr]$, which at $y_*$, where $\sinh y_*=6/y_*$, equals $\beta_*\delta_*/8$ with $\beta_*$ from Lemma 7 of the existence proof. Hence

$$
m_t=0,\qquad m_r=-\frac{\beta_*\delta_*}{S_0}=-\frac{1}{S_0}\Bigl(\frac{y_*^2}{24}+\frac{y_*^4\cosh y_*}{144}\Bigr)=-2.2777955 .
$$

**The coefficient (derived; value measured).** With $b=2a/\Omega_0$, $a(\Omega_0a-b)=a^2(\Omega_0^2-2)/\Omega_0$ and $b(\Omega_0b-a)=2a^2/\Omega_0$, and the formula of Section 3 gives

$$
c_1=\operatorname{Re}\hat\lambda_1=m_r\,\frac{\Omega_0^2-2}{2\Omega_0^2}=\frac{\beta_*\delta_*(2-\Omega_0^2)}{2S_0\Omega_0^2}.
$$

The instrument `closed_form.py` encloses $y_*$ by a sign change of $y\sinh y-6$ at $\pm10^{-30}$, and $S_0$ and $T_5$ between consecutive partial sums at $3000$ and $3001$ rungs (both are alternating series with terms decreasing in $\lvert k\rvert$), all in mpmath interval arithmetic at 45 digits. It returns

$$
S_0\in[0.19153459096,\,0.19153459098],\quad T_5\in[0.029132298054254,\,0.029132298054255],\quad \Omega_0\in[0.59128181808,\,0.59128181816],\quad c_1\in[5.3762712022,\,5.3762712038].
$$

Before this target run the same enclosure routine returned intervals containing $\pi/(0.7\sinh0.7\pi)$ and $-\pi^2/6$ for the two classical alternating sums. The Bessel series give $S_0=0.19153459097059$ and $T_5=0.0291322980542540$, inside the enclosures. The float evaluation of the five pieces gives $c_1=5.37627120236$, also inside.

**Pieces (measured).** The in-step value splits as follows, in units of $\omega$ per unit speed. Aberration $P_1+P_2$: $0$. Emission-time shift of the source position: $-3.2576$; $D$ variation: $+3.2576$; these two cancel exactly, because together they form the symmetric radial-tangential term above. Frame turning $P_3$: $+9.7728$. Emission-time factor $P_4$: $-1.7083$. Velocity perturbation $P_5$: $-2.6881$. Total: $5.3763$. The large $P_3$ is the difference between the oscillation's frequency in the co-rotating frame and its two frequencies $\Omega_0\pm1$ in the non-rotating frame; $P_3+P_4$ is the lag of the source displacement in the non-rotating frame.

## 5. The remainder

Constants $C$ below depend only on a bound $\Lambda_0$ for $\lvert\hat\lambda\rvert$ and on the window $J$ ($\delta_a\le\delta\le\delta_b$), and change from line to line; $0<\epsilon\le\tfrac12$ throughout, and $\operatorname{Re}\hat\lambda\ge0$.

**Lemma 5.1 (termwise remainder; derived).** Let $T_j(\epsilon)$ be the contribution of source $j$ to $S\,[\Delta-(\hat\lambda I+J)^2]$, namely $-L_{u,j}+w_je^{-\hat\lambda\theta_j}(L_{u,j}Q_j-\epsilon L_{w,j}Q_j(\hat\lambda I+J))$, at fixed $\delta\in J$. Then

$$
\lVert T_j(\epsilon)-T_j(0)-\epsilon T_j'(0)\rVert\le C\min\Bigl(\frac{\epsilon^2}{\tau^0_j},\ \frac{\epsilon}{\tau^{0\,2}_j}\Bigr).
$$

*Proof.* By Lemma 1 of the existence proof, $\tau_j/\tau^0_j\in[1,(1-\epsilon^2)^{-1/2}]$, $\partial_\epsilon\theta_j=\tau_j/D_j$ with $D_j\in[\tfrac34,\tfrac54]$, and $\lvert\partial_\epsilon\tau_j\rvert=\lvert\sin\theta_j\rvert/D_j\le\tfrac43\min(\theta_j,1)$. Two regimes. (a) If $\epsilon\tau^0_j\le2$, then $\theta_j\le C$ on $[0,\epsilon]$ and each ingredient is a smooth function whose $\epsilon$-derivatives obey: $\partial^m_\epsilon$ of $\mathbf r_j$ in the plane, of $Q_j$ and of $e^{-\hat\lambda\theta_j}$ is at most $C\tau^{0\,m}_j$ for $m\le2$ (each derivative of a function of $\theta$ brings a factor $\tau$); $\mathbf V_j$, $\mathbf A_j$ and $D_j-1$ are explicit multiples of $\epsilon$, $\epsilon^2$ and $\epsilon\sin\theta/\tau$. The row matrices are $\tau^{-3}$ and $\tau^{-2}$ times smooth functions of $(\mathbf n,\mathbf V,\mathbf r\cdot\mathbf A,D)$, with $\mathbf n=\mathbf r/\tau$ whose in-plane part has $m$-th derivative at most $C\tau^{0\,m-1}$. By the product rule $\lVert\partial^2_\epsilon T_j\rVert\le C/\tau^0_j$; the term $\epsilon L_wQ(\hat\lambda I+J)e^{-\hat\lambda\theta}$ contributes $C(\tau^0_j/\tau^{0\,2}_j+\epsilon)\le C/\tau^0_j$, using $\epsilon\le2/\tau^0_j$. Taylor's theorem gives $C\epsilon^2/\tau^0_j$, which in this regime is also at most $2C\epsilon/\tau^{0\,2}_j$. (b) If $\epsilon\tau^0_j>2$, then $\lVert T_j(\epsilon)\rVert\le C/\tau^{0\,3}_j+C\epsilon/\tau^{0\,2}_j$, $\lVert T_j(0)\rVert\le C/\tau^{0\,3}_j$ and $\epsilon\lVert T'_j(0)\rVert\le C\epsilon/\tau^{0\,2}_j$; each is at most $C\epsilon/\tau^{0\,2}_j$ because $1/\tau^0_j<\epsilon/2$, and $\epsilon/\tau^{0\,2}_j<\epsilon^2/\tau^0_j$. The bound $\lvert e^{-x}-1+x\rvert\le\min(\lvert x\rvert^2/2,\,2+\lvert x\rvert)$ for $\operatorname{Re}x\ge0$ is what makes both regimes uniform in $\hat\lambda$. $\qquad\blacksquare$

**Proposition 5.2 (derived).** Uniformly for $\lvert\hat\lambda\rvert\le\Lambda_0$, $\operatorname{Re}\hat\lambda\ge0$, every $q$ and both sectors,

$$
\Delta(\hat\lambda;q,p,\epsilon)=\Delta_0(\hat\lambda;q,p)+\epsilon\,\Delta_1(\hat\lambda;q,p)+R_2,\qquad\lVert R_2\rVert\le C\epsilon^2\log(1/\epsilon),
$$

with $\Delta_0$, $\Delta_1$ evaluated at $\delta_*$ and $S_0$.

*Proof.* At fixed $\delta$, summing Lemma 5.1 over sources with $\tau^0_j\ge\lvert k\rvert\delta_a$, and the partner $k=0$, $\nu=-1$ with remainder $C\epsilon^2$, gives $\sum_{k\ge1}\min(\epsilon^2/(k\delta_a),\epsilon/(k\delta_a)^2)\le C\epsilon^2(1+\log(1/\epsilon))$. The sum $\sum_k\epsilon^2/k$ for $k\lesssim1/\epsilon$ is the logarithm: it is cut at the rung where the delay phase $\hat\lambda\theta$ becomes of order one. Next, $S(\delta,\epsilon)-S_0(\delta)$ is a sum of the terms $\nu(-1)^k[h_\nu(k\delta,\epsilon)-h_\nu(k\delta,0)]$ of the existence proof, each bounded by $C\min(\epsilon^2/\tau^0,1/\tau^{0\,3})$ (for $\nu=+1$, $h_+=(1-\cos\theta)/(\tau^3D)$; for $\nu=-1$ the difference carries $1-\cos\theta$, $\tau/\tau^0-1$ or $D-1$). So $\lvert S-S_0\rvert\le C\epsilon^2\log(1/\epsilon)$, and $S_0\ge\tfrac12S_0(\delta_*)$ on $J$ once $J$ is taken small enough, by Lemma 8 and continuity. Finally $\lvert\delta(\epsilon)-\delta_*\rvert\le C\epsilon^2$ by Part 3 of the existence theorem, while the terms of $\Delta_0$ and $\Delta_1$ have $\delta$-derivatives dominated by $C/k^2$ on $J$, so changing $\delta(\epsilon)$ to $\delta_*$ costs $C\epsilon^2$. $\qquad\blacksquare$

**Theorem 5.3 (continuation of a neutral root; derived).** Let $i\Omega_0$ be a simple zero of $f_0=\det\Delta_0(\cdot;q,p)$, and let $\hat\lambda_1$ be as in Section 3 with $\operatorname{Re}\hat\lambda_1>0$. There are $\epsilon_2>0$ and $M$ such that for $0<\epsilon<\epsilon_2$ the function $f=\det\Delta(\cdot;q,p,\epsilon)$ has exactly one zero in the disc $\lvert\hat\lambda-i\Omega_0-\epsilon\hat\lambda_1\rvert\le M\epsilon^2\log(1/\epsilon)$, and that disc lies in $\operatorname{Re}\hat\lambda>0$. Consequently the delayed first variation has a growing mode with

$$
\frac{\lambda(\epsilon)}{\omega}=i\Omega_0+\epsilon\hat\lambda_1+O\bigl(\epsilon^2\log(1/\epsilon)\bigr),\qquad\frac{\operatorname{Re}\lambda(\epsilon)}{\omega}=\epsilon\operatorname{Re}\hat\lambda_1+O\bigl(\epsilon^2\log(1/\epsilon)\bigr).
$$

*Proof.* $f$ is analytic in $\operatorname{Re}\hat\lambda>0$ because the series of entire terms converges uniformly there on compacts. Because the determinant is a polynomial in the entries, Proposition 5.2 gives $f=f_0+\epsilon f_1+O(\epsilon^2\log(1/\epsilon))$ uniformly near $i\Omega_0$ in the closed right half-plane, with $f_1=\operatorname{tr}(\operatorname{adj}\Delta_0\,\Delta_1)$ a polynomial in $\hat\lambda$. Compare $f$ with $g(\hat\lambda)=f_0'(i\Omega_0)(\hat\lambda-i\Omega_0)+\epsilon f_1(i\Omega_0)$, whose only zero is $i\Omega_0+\epsilon\hat\lambda_1$. On the circle of radius $\rho=M\epsilon^2\log(1/\epsilon)$ about that zero, $\lvert g\rvert=\lvert f_0'(i\Omega_0)\rvert\rho$, while $\lvert f-g\rvert\le\lvert f_0(\hat\lambda)-f_0'(i\Omega_0)(\hat\lambda-i\Omega_0)\rvert+\epsilon\lvert f_1(\hat\lambda)-f_1(i\Omega_0)\rvert+\lvert f-f_0-\epsilon f_1\rvert\le C\lvert\hat\lambda-i\Omega_0\rvert^2+C\epsilon\lvert\hat\lambda-i\Omega_0\rvert+C\epsilon^2\log(1/\epsilon)$, and $\lvert\hat\lambda-i\Omega_0\rvert\le\epsilon\lvert\hat\lambda_1\rvert+\rho\le C\epsilon$ on the circle, so $\lvert f-g\rvert\le C'\epsilon^2\log(1/\epsilon)$. For $M$ large and $\epsilon$ small, $\lvert f-g\rvert<\lvert g\rvert$ on the circle, and the circle lies in $\operatorname{Re}\hat\lambda\ge\epsilon\operatorname{Re}\hat\lambda_1-\rho>0$. Rouché's theorem applies. $\qquad\blacksquare$

For the in-step pair, $f_0=\hat\lambda^4(\hat\lambda^2+\Omega_0^2)$ has the simple zero $i\Omega_0$, and $\operatorname{Re}\hat\lambda_1=c_1>0$; the theorem applies and gives the displayed result. If $\operatorname{Re}\hat\lambda_1<0$ the predicted root leaves the closed right half-plane, where the characteristic sum diverges, and nothing is claimed.

**Proposition 5.4 (sharper bound for the in-step sector; derived in outline).** In the sector $p=+1$ at $q=0$, the in-plane block satisfies $\lVert R_2\rVert\le C\epsilon^2$, and the in-step root obeys $\operatorname{Re}\lambda/\omega=c_1\epsilon+O(\epsilon^2)$.

*Outline.* There $w_j\sigma_j=\nu(-1)^k$, and the in-plane entries of each source term are even functions of the rung variable, so each rail's remainder is $\sum_k(-1)^kF_\nu(k)$ with $F_\nu$ the remainder of Lemma 5.1 as a function of a continuous rung variable $t$. Summation by parts, as in Lemma 5 of the existence proof, bounds the sum by $\lvert F_\nu(1)\rvert+\int_1^\infty\lvert F_\nu'\rvert\,dt$ on the receiver's rail (and the analogue from $t=0$ on the far rail). Differentiating in $t$ either brings $1/t$ from a power of $\tau$ or $\epsilon\,\partial_t\tau\le C\epsilon$ from a function of $\theta$; the latter acts on $e^{-x}-1+x$ as $\hat\lambda\,\partial_t\theta\,(1-e^{-x})$, bounded by $C\epsilon\min(\epsilon t,1)$. This gives $\lvert F_\nu'\rvert\le C\min(\epsilon^2/t^2,\epsilon/t^3)+C\epsilon\min(\epsilon^2/t,\epsilon/t^2)$, whose integral is $O(\epsilon^2)$; $S-S_0=O(\epsilon^2)$ by the same argument. The derivative bound is stated, not written out entry by entry; that is the step that remains to be checked. In the sector $p=-1$ at $q=0$ the weights do not alternate, but in the plane the two members of a distant rung cancel to leading order in $1/k$; the same improvement is then inferred, not derived.

**What the measurement adds (measured).** The exact roots of Section 7 show that for the in-step pair $\operatorname{Re}\hat\lambda/\epsilon-c_1=-2.564\times10^3\epsilon^2(1+O(\epsilon^2))$. A least-squares fit of $\operatorname{Re}\hat\lambda/\epsilon-c_1$ on $\{\epsilon,\epsilon^2,\epsilon^3,\epsilon^4\}$ over the seven speeds $10^{-4}\le\epsilon\le5\times10^{-3}$ gives coefficients $2.5\times10^{-4}$, $-2.564\times10^3$, $0.9\times10^3$ and $3.0\times10^6$, with largest residual $2.5\times10^{-8}$. Adding $\epsilon\log(1/\epsilon)$ to the basis gives it the coefficient $-4\times10^{-4}$ and changes no other conclusion. The frequency moves at second order: $(\operatorname{Im}\hat\lambda-\Omega_0)/\epsilon^2=92.18$, $92.18$, $92.17$, $92.10$, $91.84$, $90.09$ at $\epsilon=10^{-4}$, $2\times10^{-4}$, $5\times10^{-4}$, $10^{-3}$, $2\times10^{-3}$, $5\times10^{-3}$. So the true remainder in $\operatorname{Re}\lambda$ is $O(\epsilon^3)$, with a large coefficient; neither the $\epsilon^2\log$ of Proposition 5.2 nor the $\epsilon^2$ of Proposition 5.4 is attained. The pattern, real odd orders and imaginary even orders, is what a dissipative first-order perturbation of a conservative neutral oscillation produces; that the pattern persists to all orders is inferred, not shown. The coefficient ratios ($5.4$, $2.6\times10^3$, $3\times10^6$ for orders $1$, $3$, $5$) indicate that the expansion is useful only below a speed of a few hundredths: at $\epsilon=0.0138$ the leading term overstates the growth by 8 percent, at $0.04$ by 43 percent.

## 6. Mechanism

What follows is an acceleration-first reading of Sections 2 to 4. Each statement is a restatement of a derived formula unless marked.

**The delayed term that matters is a velocity coupling.** To first order in the speed, the delay changes the acceleration that a source gives the receiver in two ways. The receiver is accelerated toward or away from where the source was one delay earlier, not where it is. A source displaced by $\boldsymbol\xi(t)$ is therefore felt as if displaced by $\boldsymbol\xi(t-\tau)\approx\boldsymbol\xi(t)-\tau\dot{\boldsymbol\xi}(t)$, measured in the non-rotating frame. And the source's velocity changes the factor $D=1-\mathbf n\cdot\mathbf V$. Together these add to the receiver an acceleration $\epsilon\,\sigma(I-2\mathbf n\mathbf n^{\mathsf T})\dot{\boldsymbol\xi}/\tau^2$ per source, in units of the static coupling. Across the line joining the members a like source pulls the receiver along with its velocity and an unlike source pushes it against. Along the line the sign reverses, because there the lagged position changes the inverse-square strength, by twice the displacement, while the velocity dependence of $D$ restores only half of that. The remaining first-order term, the aberration of the arrival direction, does not act on any $q=0$ oscillation.

**For the in-step oscillation only the radial part survives.** When every member moves in step, each source's velocity perturbation in its own frame equals the receiver's. The delayed coupling then acts on the receiver's own velocity in the non-rotating frame, with tangential coefficient $m_t$ and radial coefficient $m_r$. The tangential coefficient is the sum that also gives the first-order push along the motion of the rigidly rotating ladder, since rigid rotation is itself a tangential velocity shared by every member. The balance condition makes that sum vanish, so $m_t=0$. The radial coefficient is $m_r=-2.278$, a drag. The rung partner contributes $-0.25/S_0$ of it. It is unlike and lies along the line through the axis. When the rung opens, the partner is seen where it was a delay $2R/c_f$ earlier, closer to the receiver, and pulls harder inward. The unlike same-rail neighbours contribute through the term $-\pi^2/(6\delta^2)$ in $S_0m_r$, and the far rail's other rungs a little more.

**Why a drag makes this oscillation grow.** In the co-rotating frame each member traces an ellipse with radial semi-axis $a$ and tangential semi-axis $b=2a/\Omega_0=3.38a$. The radial velocity seen from the non-rotating frame is the co-rotating radial velocity minus $\omega$ times the tangential displacement, $\dot\xi_r-\omega\xi_t$. For this oscillation the second term dominates, because $b$ is large and $\Omega_0^2<2$. The non-rotating radial velocity is therefore opposite in phase to the co-rotating radial velocity, with time-averaged product $a^2\omega^2(\Omega_0^2-2)/2<0$. A drag against the first is a push along the second. In the co-rotating frame the perturbation obeys $\ddot{\boldsymbol\xi}+2J\dot{\boldsymbol\xi}+(J^2+M_0)\boldsymbol\xi=\mathbf f$. The term $2J\dot{\boldsymbol\xi}$ does no work, so $E=\tfrac12\lvert\dot{\boldsymbol\xi}\rvert^2+\tfrac12\boldsymbol\xi^{\mathsf T}(J^2+M_0)\boldsymbol\xi$ changes only through $\dot{\boldsymbol\xi}\cdot\mathbf f$. For the in-step oscillation $E=\tfrac12\Omega_0^2a^2>0$ on average, although $J^2+M_0=\operatorname{diag}(\Omega_0^2-4,0)$ is not positive. The delayed drag does positive work $\epsilon\lvert m_r\rvert a^2(2-\Omega_0^2)/2$ per unit time, and the amplitude grows at the rate of work divided by $2E$, which is $c_1\epsilon$. So the sign is growth because the mode's motion in the non-rotating frame runs against its motion in the co-rotating frame, in the radial direction where the delay produces drag.

**The size.** $c_1$ is large because the oscillation's co-rotating energy per squared amplitude is small. Its Krein quantity is $\mathcal K=0.095$ for unit $\lvert\mathbf c\rvert$, against magnitudes from $0.17$ to $2.6$ for the other simple neutral roots of the $q$-table. The same smallness makes the higher-order coefficients large.

## 7. Other neutral oscillations, and the independent check

**$p=-1$ at $q=0$ (derived; values measured).** Here $w_j\sigma_j=1$ on both rails. The in-plane stiffness is $S_0k_t=\tfrac72\zeta(3)/\delta_*^3-2U_3$ and $S_0k_r=S_0k_t+24U_5$, with $U_m=\sum_{k\ \mathrm{odd}}(4+k^2\delta_*^2)^{-m/2}$. The velocity coupling is

$$
S_0m_r=\frac{y_*^2}{12}+\frac{y_*^4}{144},\qquad S_0m_t=\frac{y_*^2}{12}-\frac{y_*}{4}\coth y_*,
$$

which follows from $\sum_k(4+k^2\delta^2)^{-1}=(y/4)\coth y$ and $\sum_k(4+k^2\delta^2)^{-2}=\tfrac1{32}(y\coth y+y^2/\sinh^2y)$. The numbers are $k_r=0.48752$, $k_t=0.20641$, $m_r=+1.98606$ and $m_t=-1.03401$. The two neutral pairs satisfy $(\Omega^2+1-k_r)(\Omega^2+1-k_t)=4\Omega^2$, giving $\Omega_0=1.5916652$ and $0.4006676$. The formula of Section 3 gives $c_1=0.3274585$ and $0.1485701$, weighting $m_r$ and $m_t$ by $0.559$ and $0.441$ (and the reverse). The first pair is the adjudication's alternating-rung pair: whole rungs move in the plane of rotation, successive rungs in opposite directions in their own frames. Here the delay acts as radial anti-drag and tangential drag, and the radial part wins.

**All wavenumbers (measured).** The instrument `qscan.py` computes every zero of $\det\Delta_0$ at $q=j\pi/8$, $j=0,\dots,8$, in both sectors (truncation $\lvert k\rvert\le5\times10^4$), and $\hat\lambda_1$ for each neutral one. Every $\hat\lambda_1$ is real to rounding, as at $q=0$. Excluding the exact in-plane translation roots $\pm i$ at $q=\pi$, $p=-1$, which are double (Krein quantity $0$) and stay at $\pm i$ at every speed, there are 58 neutral roots. In $p=+1$ there is one pair at each $q$, with $c_1=5.376$, $2.337$, $1.145$, $0.817$, $0.793$, $0.932$, $1.190$, $1.559$, $2.051$ at $q/\pi=0,\tfrac18,\dots,1$; the aberration term contributes between $0$ and $-0.079$. In $p=-1$ there are one to three pairs per $q$. Those with $c_1<0$ are two pairs at $q=3\pi/4$ ($-0.064$, $-0.015$) and two at $q=7\pi/8$ ($-0.237$, $-0.111$). Positive: 50; negative: 8. The zero-delay comparison has 21 roots with positive real part at these wavenumbers. The adjudication's Newton search found 71 growing roots at speed $0.014$ at the same wavenumbers, and $21+50=71$. That the two lists are the same roots, root by root, is inferred from the count and not checked.

**Exact delayed roots (measured).** The instrument `exact_roots.py` solves the balance $\delta(\epsilon)$ with its own exact rows (secant on the tangential sum) and Newton-solves $\det\Delta=0$ with all causal roots found by fixed-point iteration, truncated at $\lvert k\rvert\le2\times10^5$, starting from $i\Omega_0+\epsilon\hat\lambda_1$. In units of $\omega$:

| $\epsilon$ | Balanced $\delta$ | In-step root | $\operatorname{Re}/\epsilon$ | $(\operatorname{Re}/\epsilon-c_1)/\epsilon^2$ | Alternating-rung $\operatorname{Re}/\epsilon$ | $p=-1$, $\Omega_0=0.40$: $\operatorname{Re}/\epsilon$ |
| --- | --- | --- | --- | --- | --- | --- |
| $0.0001$ | $3.3452801448$ | $0.0005376245575+0.5912827400\,i$ | $5.376246$ | $-2563$ | $0.327459$ | $0.148570$ |
| $0.0002$ | $3.3452801064$ | $0.0010752337393+0.5912855054\,i$ | $5.376169$ | $-2563$ | $0.327458$ | $0.148570$ |
| $0.0005$ | $3.3452798381$ | $0.0026878154+0.5913048593\,i$ | $5.375631$ | $-2562$ | $0.327458$ | $0.148570$ |
| $0.001$ | $3.3452788796$ | $0.0053737117+0.5913739179\,i$ | $5.373712$ | $-2560$ | $0.327458$ | $0.148570$ |
| $0.0013841$ | $3.3452777093$ | $0.0074345182+0.5914581049\,i$ | $5.371374$ | $-2557$ | $0.327457$ | $0.148570$ |
| $0.002$ | $3.3452750457$ | $0.0107321443+0.5916491821\,i$ | $5.366072$ | $-2550$ | $0.327455$ | $0.148570$ |
| $0.005$ | $3.3452482076$ | $0.0265708434+0.5935341275\,i$ | $5.314169$ | $-2484$ | $0.327438$ | $0.148570$ |
| $0.01$ | $3.3451523481$ | $0.0514811817+0.5997432162\,i$ | $5.148118$ | $-2282$ | $0.327375$ | $0.148570$ |
| $0.013841$ | $3.3450352862$ | $0.0688859835+0.6064450672\,i$ | $4.976951$ | $-2084$ | $0.327296$ | $0.148569$ |
| $0.02$ | $3.3447687651$ | $0.0934345294+0.6192310560\,i$ | $4.671726$ | $-1761$ | $0.327112$ | $0.148563$ |
| $0.04$ | $3.3432321118$ | $0.1508427917+0.6647736409\,i$ | $3.771070$ | $-1003$ | $0.325989$ | $0.148469$ |

The first-order coefficients are $c_1=5.3762712$, $0.3274585$, $0.1485701$, and $\operatorname{Re}\lambda/(\omega\epsilon)$ converges to each as $\epsilon\to0$. For the two $p=-1$ pairs, $\operatorname{Re}\hat\lambda/\epsilon-c_1$ is $-0.816\epsilon^2$ and $+0.026\epsilon^2$, and their frequencies move by $-1.22\epsilon^2$ and $+0.037\epsilon^2$; the fitted coefficients of $\epsilon$ and $\epsilon\log(1/\epsilon)$ in $\operatorname{Re}\hat\lambda/\epsilon-c_1$ are below $2\times10^{-6}$ in size. Doubling the truncation to $4\times10^5$ at $\epsilon=5\times10^{-4}$ and $10^{-2}$ moved every root by at most $7\times10^{-14}$. The balanced spacings agree with the existence proof's measured branch ($3.3452788796$ at $0.001$, $3.3451523481$ at $0.01$) to all ten printed digits. They also agree with $\delta_*-\epsilon^2/(6\beta_*)$ to $1.3\times10^{-8}$ at $0.01$.

**Comparison with the adjudication (measured, two instruments).** At speed $0.0013841$ (the adjudication's $R=10^5$) the in-step growth here is $0.0074345$, against the adjudication's $0.00743$; at $0.013841$ ($R=1000$) it is $0.0688860$ against $0.0689$, and the root $0.06889+0.60645\,i$ against $0.0689+0.6064\,i$. The alternating-rung growth is $0.000453$ and $0.00453$, against $0.0005$ and $0.0045$. The two instruments were written separately but share the adjudicated $L_u$ and $L_w$, so the agreement tests the assembly, the root solving and the balance, not the first-variation formula. The formula itself is checked here directly by `direct_mode_check.py` (Section 8), which does not use $L_u$ or $L_w$.

## 8. Known-case controls, run before any target evaluation

- `controls.py` (exact evaluator `ladder_char.py`). Root equation: $\lvert\mathbf r_j\rvert=\tau_j$ to $1.3\times10^{-16}$ relative at $\epsilon=0.3$. At $\epsilon=0$ the delays equal $\sqrt{k^2\delta^2+2-2\nu}$ exactly. Static tangential sum against the closed form $B(\delta)$ from the two classical alternating sums: agreement to $10^{-12}$ at $\delta=3$, $\delta_*$ and $4$, with axial component below $10^{-17}$. $S_0(\delta_*)=0.19153459097$, inside the bracket of Lemma 8, $[0.18244,0.19419]$. Symmetry roots at $\epsilon=10^{-3},10^{-2},0.05$: $\Delta(0;0,+1)$ annihilates $\mathbf e_z$ to $3\times10^{-15}$ and $\mathbf e_t$ to $10^{-14}$; $\Delta(\pm i;\pi,-1)$ annihilates $(1,\pm i,0)$ to $1.1\times10^{-14}$. The wrong vectors or the wrong sector leave residuals between $2.8$ and $6.4$. Zero-delay roots at $q=0$, $p=+1$: $\pm0.5912818\,i$ and a fourfold zero, the adjudication's $\pm0.591\,i$.
- `direct_mode_check.py`: every member of rungs $\lvert k\rvert\le6$ is moved along its exact path plus $\eta\operatorname{Re}[Q_j(t)w_j\mathbf c\,e^{\lambda t}]$, every causal root is re-solved on the perturbed paths, and the receiver's summed acceleration is differenced centrally in $\eta$. Against $\operatorname{Re}[-S(\Delta-(\hat\lambda I+J)^2)\mathbf c]$ from `ladder_char.py` truncated at the same rungs, for six random $(\hat\lambda,q,p,\mathbf c)$ with $\operatorname{Re}\hat\lambda\ge0$ at $\epsilon=0.05$ and $0.3$, $\delta=3.3$, the relative difference is $2.9\times10^{-7}$ to $8.3\times10^{-6}$ at $\eta=10^{-3}$ and falls by a factor of $100$ per tenfold reduction of $\eta$, to $3\times10^{-11}$ to $8\times10^{-10}$ at $\eta=10^{-5}$. That is the second-order error of a central difference. This check uses neither $L_u$ nor $L_w$; it confirms the rescaling to $\omega$-units, the emission-time factor, the frames, the velocity term and the weights.
- `controls_first_order.py`: the three checks of Section 2.
- `closed_form.py`: the enclosure routine contains $\pi/(0.7\sinh0.7\pi)$ and $-\pi^2/6$.

## 9. Limits and falsifiers

- Linear only. These are formal modes of the first variation about the exact small-speed balance. Connecting them to growth of nearby solutions of the Master Equation needs a history-flow argument that is not made here.
- Not a spectrum. Only continuations of zero-delay neutral roots are treated. Roots that enter from elsewhere are not excluded, apart from the census by the adjudication.
- The constants in Section 5 are not evaluated, so no numerical speed is given below which Theorem 5.3 holds. Proposition 5.4 is an outline at one step.
- The exact-root table and the $q$-table are float measurements with truncated sums. They are not enclosures.
- Falsifier for $c_1$: an evaluation of $S_0$, $T_5$ or $\beta_*\delta_*$ outside the stated enclosures, or a delayed root at $\epsilon\le10^{-3}$ whose $\operatorname{Re}\lambda/(\omega\epsilon)$ differs from $5.3763$ by more than $0.003$. The place to look is `exact-roots-N200000.json`.
- Falsifier for the mechanism: a value $m_t\ne0$ at $\delta_*$, which would contradict $S_0m_t=B(\delta_*)$; or a nonzero contribution of the aberration term to any $q=0$ in-plane root; or pieces $P_3+P_4\ne-\sum_jw_j\tau_jL^0_{u,j}Q^0_j(\hat\lambda I+J)$. The place to look is `first-order.json`.
- Falsifier for Proposition 5.2: a sequence $\epsilon\to0$ along which $\lVert\Delta-\Delta_0-\epsilon\Delta_1\rVert/(\epsilon^2\log(1/\epsilon))$ grows without bound.
- Falsifier for the count: a growing root at speed $0.014$ at one of the nine wavenumbers that does not continue a zero-delay root with positive real part or a neutral root with $c_1>0$.

## 10. Files and reproduction

Evidence directory: [`../evidence/rotating-ladder-claude-2026-10-20/delayed-growth/`](../evidence/rotating-ladder-claude-2026-10-20/delayed-growth/). Python is the shared environment (Python 3.13, numpy 2.2.4, mpmath 1.3.0); scipy is not used. Run times are wall-clock, from `time`.

- `ladder_char.py`: exact delayed characteristic matrix and rows. `controls.py` writes `controls.json` (34 s).
- `first_order.py`: $\Delta_0$, the five pieces, $\hat\lambda_1$; writes `first-order.json` (17 s). `controls_first_order.py` writes `controls-first-order.json` (32 s).
- `exact_roots.py N eps...`: balance and exact roots. `exact_roots.py 200000 0.0005 0.001 0.0013841 0.002 0.005 0.01 0.013841 0.02 0.04` (123 s) and `exact_roots.py 200000 0.0001 0.0002` (16 s) write `exact-roots-N200000.json`; the second run overwrote the first file, and the two row sets were merged into it by a one-line script after the second run (the first file's copy is in `.tmp/rotating-ladder/delayed-growth/`). `exact_roots.py 400000 0.0005 0.01` writes `exact-roots-N400000.json` (76 s).
- `fit_next_order.py`: writes `fit-next-order.json` (under 1 s).
- `direct_mode_check.py`: writes `direct-mode-check.json` (0.24 s).
- `closed_form.py`: interval enclosure and closed forms; writes `closed-form.json` (321 s). This run exceeded the five-minute threshold above which the supervisor is required. It ran in the foreground without the supervisor because no pilot was timed at 45 digits; it completed, and nothing is left running.
- `qscan.py 50000`: the $q$-table; writes `qscan.json` (128 s). The scratch script `.tmp/rotating-ladder/delayed-growth/count_zd.py` counted the 21 zero-delay growing roots (not timed).

## Independent review disposition and corrections

Codex reviewed this note as frozen (SHA-256 `c76e94261e295b061aaf8d0bfd89e965a9da262aaba8fe74a6989dec69adec4c`, frozen 2026-10-20T22:35:10Z) in the [shared review record](../../../../op/agent-chats/2026-10-20-rotating-ladder-six-hour/chat.md), entry 2026-10-20T22:54:29Z. It accepts the five-piece first-order matrix $\Delta_1$ (checked against a separate high-precision differentiation of the reviewed row ingredients to entry error below $5.7\times10^{-16}$ in three sectors), the eigenvalue-shift formula with the left vector equal to the right because $\Delta_0(i\Omega)$ is Hermitian, and the closed form for $c_1$; its independent 60-digit sums give $S_0=0.19153459097058813842\ldots$, $T_5=0.0291322980542540008370\ldots$, $\Omega_0=0.59128181812009920686\ldots$, $c_1=5.37627120303651884164\ldots$ and the two alternating-rung coefficients $0.32745852285\ldots$ and $0.14857005957\ldots$, all inside the stated enclosures. The PI records the corrections; they supersede the body where they differ.

1. **Lemma 5.1.** The ratio bound $\tau/\tau_0\in[1,(1-\varepsilon^2)^{-1/2}]$ is not supplied by Lemma 1 and fails on the far rail, where $\tau\le\tau_0$. The valid common bound is $\tau/\tau_0\in[(1+\varepsilon^2)^{-1/2},(1-\varepsilon^2)^{-1/2}]$; it supplies exactly the comparability used, so the $O(\varepsilon^2\log1/\varepsilon)$ remainder and the right-half-plane Rouché step survive (the comparison circle lies in the half-plane where the sum is analytic).
2. **Wording.** At $q=0$ the symmetric off-diagonal (aberration) term has zero first-order eigenvalue shift, because its quadratic form on the mode vanishes; the matrix itself acts nontrivially on the mode. The finite-speed fits are consistent with an $O(\varepsilon^3)$ remainder in the real part; they do not prove that order or exclude logarithms. The quadratic energy of the mechanism section is a derived functional of the comparison system, not an imported physical energy of individual members.
3. **Status.** Proposition 5.4's derivative estimate remains an outline in this note; a successor note writes it out and is pending review. The $q$-scan and count instruments were not audited, and no full-spectrum claim is accepted.
