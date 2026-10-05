# Vertical Cartesian variation of the four-member Maxwell-shaped ring

This is a reviewer crosscheck of the [Cartesian subject](maxwell-shaped-overnight-ring-equation-domain.md), not its independent reference. It is conditional on a certified complete four-member alternating-ring solution under E or E+M from Sections 7–8 of the equation-variant manuscript, $K=c_f=1$, with all three ordinary partner roots at each receiver and no positive-delay self roots. The base has radius $r$, speed $0<\beta<1$, angular rate $\omega=\beta/r$ and polarity $(-1)^i$. No spectrum or stability verdict is asserted here. The base's full acceleration equation must be satisfied before using this variation to assess stability.

## 1. Vertical jets leave the root unchanged to first order

Let the independent vertical perturbations be $z_i(T)$. Base separation, receiver velocity, source velocity and source acceleration all lie in the plane. Hence the first variation of root time, range and transmitter denominator is zero. At a partner root $S=T-\tau$,

$$
\delta n_z=\frac{z_i(T)-z_j(S)}R,\quad
\delta v_z=z_j'(S),\quad
\delta a_z=z_j''(S),\quad
\delta S=\delta R=\delta D=0.
$$

Put $C=1-\beta^2+R\mathbf n\cdot\mathbf a$, using the actual delayed circle acceleration. Direct vertical differentiation of the E numerator gives

$$
\delta E_z=\frac{C}{R^3D^3}[z_i(T)-z_j(S)]
-\frac{C}{R^2D^3}z_j'(S)-\frac1{RD^2}z_j''(S).
$$

The delayed second derivative is essential. For the full response, base planarity cancels terms containing the vertical receiver-velocity variation, while the changed direction multiplies the base scalar $\mathbf u\cdot\mathbf E$. Thus

$$
\delta(E+M)_z=(1-\mathbf u\cdot\mathbf n)\delta E_z
+\frac{\mathbf u\cdot\mathbf E}{R}[z_i(T)-z_j(S)].
$$

The signed coupled row is the sum over all three partners with $\sigma_{ij}=(-1)^{i+j}$ and coupling $K$. These independently variable vertical coordinates leave the imposed planar ring symmetry; removing them would discard a required perturbation sector.

## 2. Circulant characteristic equations

For E define $W_j=C_j/(R_j^3D_j^3)$, $V_j=C_j/(R_j^2D_j^3)$ and $A_j=1/(R_jD_j^2)$. For E+M instead define

$$
W_j=\frac{(1-\mathbf u\cdot\mathbf n_j)C_j}{R_j^3D_j^3}
+\frac{\mathbf u\cdot\mathbf E_j}{R_j},\quad
V_j=\frac{(1-\mathbf u\cdot\mathbf n_j)C_j}{R_j^2D_j^3},\quad
A_j=\frac{1-\mathbf u\cdot\mathbf n_j}{R_jD_j^2}.
$$

All coefficients are constant in this inertial vertical sector because the base rotates rigidly and only scalar planar products enter. For mode $k=0,1,2,3$ take $z_i(T)=e^{\lambda T}e^{ik\alpha_i}$, with $\alpha_i=i\pi/2$ and $g_j=e^{-\lambda\tau_j}e^{ikj\pi/2}$. The scalar characteristic is

$$
F_k(\lambda)=\lambda^2-
K\sum_{j=1}^3(-1)^j
\left[W_j(1-g_j)-V_j\lambda g_j-A_j\lambda^2g_j\right].
$$

This characteristic includes all delayed-acceleration terms. A root of a version omitting $A_j\lambda^2g_j$ refers to another equation. The four sectors together span every vertical Cartesian perturbation; planar perturbations require the remainder of the full Cartesian operator. A validated growing vertical root would establish a linear instability of the certified base, without determining its nonlinear fate or certifying the remaining spectrum.

## 3. Exact symmetry checks before a target root search

Common vertical translation gives $F_0(0)=0$. For E, $W_j\tau_j=V_j$ per hit, so $F_0'(0)=0$ as well. For E+M the additional derivative is proportional to $\sum_j(-1)^j\mathbf u\cdot\mathbf E_j$, which is zero at complete tangential balance; again $F_0'(0)=0$. This is a first-order common vertical-velocity direction, not a claim of an exact finite boosted ring.

Rigid rotation of the base plane gives $F_1(i\omega)=0$ and its real-conjugate partner $F_3(-i\omega)=0$. These checks require full balance and follow from the selected law's Euclidean rotational symmetry. A failure beyond a certified arithmetic enclosure invalidates the characteristic instrument before any target search. A passed symmetry check alone is insufficient independent validation of every coefficient.

**Falsifiers and limitations:** a missing source-acceleration variation, a first-order root shift for a purely vertical perturbation on the planar base, disagreement with the complete Cartesian vertical block, or failed translation/tilt identities overturns this crosscheck. All target searches remain conditional on a full balance certificate and a separately verified characteristic instrument. No nonlinear persistence, attracting basin or terminal departure is implied.
