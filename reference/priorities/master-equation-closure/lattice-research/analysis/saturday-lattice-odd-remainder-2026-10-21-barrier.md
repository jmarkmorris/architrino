# The signed odd remainder completed: a smaller assembled estimate and barriers at seed sizes 0.053 and 0.064 (2026-10-21)

## Result

**In words.** The [companion note](saturday-lattice-odd-remainder-2026-10-21.md) computes the cubic term of the reflected odd remainder of the localized lattice family exactly and sums it over the lattice with its signs: for a pure staggered mode the summed cubic is fixed by three cubic-symmetric lattice tensors of norms at most $10.9259$, $1.9832$ and $0.0962$. This note completes the bound. It bounds the part of the odd remainder beyond the cubic term, which is of fourth and fifth order, and the two deviations of the actual seed from the pure mode, which are the spread of growth rates within the band and the variation of the envelope across a mirror pair. It assembles the result with the accepted source-difference brackets and the accepted receiver cubic. The new estimate is about $40$ percent smaller than the accepted one at the accepted endpoint, and it continues the same complete-past solution further.

1. **The remainder beyond the cubic (derived).** For every offset, $\lvert\mathcal O_\ell-2C_\ell\rvert$ is bounded by an explicit sum of terms of degree at least four in the receiver displacement and the source sizes, each containing a source factor, with the rest derivatives of the row, the slow-source constants of Lemma H.1 and fourth-order row constants from a majorant series (Lemmas K and R).
2. **The assembled estimate (derived; numbers by exact arithmetic).** $\lVert\mathcal N[\tilde u^t]\rVert_{0,2a}\le F_{\rm odd}(d,y)=g[c_{E3}^*A^3+\Sigma_{\rm br}+\mathcal O_{\rm odd}(A,d)]$, where $\mathcal O_{\rm odd}$ is the signed main term plus the deviation and remainder sums (Theorem F). At the accepted endpoint $(d,y)=(0.047,0.011045)$, $C_LF_{\rm odd}\le0.0063115$ against $C_LF_{\rm H}=0.0107938$.
3. **A barrier at seed size $0.053$ inside the accepted chart (derived; exact arithmetic).** With coefficient $2.5$: $C_LF_{\rm odd}\le0.0068708<0.0070225$; displacement at most $0.0600225\le1/16$, speed at most $0.18071\le3/16$. The same solution exists to $T_O(\varepsilon)=\ln(0.053/(0.0983\varepsilon))/2.8033\ge T_H(\varepsilon)+0.0428$ (Theorem B.1).
4. **A barrier at seed size $0.064$ on the chart with caps $(1/12,\,0.3)$ (derived; exact arithmetic).** With coefficient $4.25$: $C_LF_{\rm odd}\le0.0172118<0.017408$; displacement at most $0.081408$, speed at most $0.26634$; the same solution exists to $T_{O'}(\varepsilon)=\ln(0.064/(0.0983\varepsilon))/2.8033\ge T_{H'}(\varepsilon)+0.0740$ (Theorem B.2).
5. **Central growth (derived).** At $T_O$ the central displacement is at least $0.032134$ for $\varepsilon=10^{-4}$, a growth factor of at least $3537$ over the largest displacement at time zero; the lower bound at $T_O$ is positive for every $10^{-37}\le\varepsilon\le0.00646$, and, at a suitable earlier time of the same interval, for every tabulated amplitude down to $10^{-300}$ (Proposition G). Growth to a size bounded below uniformly in $\varepsilon$ is not obtained, and the obstruction is stated precisely.
6. **Where this estimate stops (derived; exact certificates).** No barrier at seed size $d\ge0.0558$ inside the accepted chart, and none at $d\ge0.0805$ on any chart with displacement cap below one half and speed cap below one (Proposition H). The summed odd part is no longer the largest part of the bound: at the accepted-chart endpoint it is about $30$ percent, against $42$ percent for the source-difference brackets and $29$ percent for the receiver cubic.

Claim grade: derived for Lemmas K and R, Theorem F, Theorems B.1 and B.2, Propositions G and H, by the hand arguments below, relying on the accepted notes and on the companion note (under independent review). The barrier, certificate and table numbers are exact rational polynomial arithmetic with outward-rounded interval exponentials and lattice sums, from a session instrument that passed known cases first; among them is a sampled floating comparison of the remainder bound with the true remainder, whose root and row are computed internally at 50 digits. Declared lattice sums, contour constants and the linear-inverse norm keep their interval-library conditionality. Nothing is measured on solutions. Falsifiers are in Section 8.

The scenario is unchanged: the canonical Master Equation at $g=16$, unit spacing, $c_f=1$, every member dynamical, every causal root and tail retained, the original eight-source block summation for the receiver field, the contour of radius $1/10$, the accepted seed class, and the complete-past family $u^\varepsilon=\varepsilon\phi+v^\varepsilon$, $0<\varepsilon\le0.00646$, with its unique charted continuation. The actual correction enters only through its first two derivatives, in the accepted brackets; the odd remainder contains no correction at a source.

## 1. Setting

The notation is that of the companion note. In the translated frame at a time $t\ge0$ of the barrier argument, $d=\tilde\Delta(t)$, $y=y(t)$, $A=d+y$, $X=e^{aT}$ for $T\le0$, $\rho_P=0.09085/0.0983$, $\underline\lambda=2.7872$, $\overline\lambda=2.8033$. For declared sizes $(d_*,y_*)$ the tube quantities of Lemma T.1 (accepted chart) or Lemma G.2 (chart with caps $(\rho_c,\varpi_c)$) are $\delta_*$, the bound on every delay deviation $\lvert\tau-r\rvert$; $\kappa_*=1-\delta_*$, the range factor; $v_*$, the bound on every source speed at emission, including the signed pure-seed comparison histories $\pm\bar\Phi$ (item 4 of Lemma T.1); and $\eta_*$, $s_{1,*}$, $\mu_*$, $c_{E3}^*$.

**Window sizes of the pure seed.** At a source time $T'$ within $\delta_*$ of $T-r$, Lemma B.2's proof, which holds for every number $n$ of time derivatives, gives $\lvert\bar\Phi^{(n)}(T')\rvert\le M_n(t+T')\le\overline\lambda^{\,n}\rho_Pde^{\underline\lambda T'}$, and $e^{\underline\lambda T'}\le Xe^{-\underline\lambda(r-\delta_*)}$ because $\underline\lambda T\le aT$ for $T\le0$. So
$$
\lvert\bar\Phi^{(n)}\rvert\le\overline\lambda^{\,n}\,\pi_r\,X\quad\text{on the window},\qquad\pi_r:=\rho_P\,e^{\underline\lambda\delta_*}\,d\,e^{-\underline\lambda r}.
$$
Write $P,V,W,U,U_4,U_5$ for the window suprema of $\lvert\bar\Phi^{(n)}\rvert$, $n=0,\dots,5$, and $m=\lvert\alpha\rvert+P$. Every configuration used below has its spatial argument within $m\le\delta_*$ of the anchor offset $\ell$, hence range at least $\kappa_*r$, and its velocity argument at most $v_*$; this is Lemma T.1, items 2–5, for the comparison histories.

## 2. Row constants of fourth order

**Lemma K (derived).** For $R\ne0$, $\lvert v\rvert\le v<1$, $D=1-v$, $\rho=\lvert R\rvert$, and $i+j\le4$, $\lvert\partial_R^i\partial_v^j\Psi\rvert\le c_{ij}(v)/\rho^{2+i}$ with
$$
c_{ij}(v)=i!\,[t^i]\Bigl(\hat G(t)\,\hat N(t)^j\cdot\hat F_j\bigl(v(\hat N(t)-1)\bigr)\Bigr),\qquad\hat G(t)=\sum_{m\ge0}(m+1)t^m,\quad\hat N(t)=\sum_{p\ge0}\frac{\nu_p}{p!}t^p,\quad\hat F_j(s)=\sum_{q\ge0}\frac{(j+q)!}{q!\,D^{j+q+1}}s^q,
$$
where $[t^i]$ takes the coefficient of $t^i$, $\nu_0=\nu_1=1$, $\nu_2=1.1548$, $\nu_3=3$ and $\nu_4=240/9$.

*Proof.* As in Lemma H.1, $\partial_v^j\Psi[k_1,\dots,k_j]=Q_j\,f^{(j)}(w)$ with $Q_j=G\,(n\cdot k_1)\cdots(n\cdot k_j)$, $G=R/\rho^3$, $w=n\cdot v$ and $f(w)=1/(1-w)$. By Leibniz' rule $\lvert\partial^iQ_j\,f^{(j)}\rvert\le\sum_m\binom im\lvert\partial^mQ_j\rvert\lvert\partial^{i-m}f^{(j)}(w)\rvert$. *The factor $Q_j$.* $\lvert\partial^mG\rvert=(m+1)!/\rho^{m+2}$ (Legendre); $\partial^p(n\cdot k)=\partial^{p+1}\rho[\cdot,k]$ has norm at most $\nu_p/\rho^p$, where $\nu_p$ bounds the $(p+1)$-st derivative of $t\mapsto\lvert x+th\rvert$ at unit range. Since $\lvert x+th\rvert=\sum_mC^{(-1/2)}_m(-\cos)t^m$ with $C_m^{(-1/2)}=(P_{m-2}-P_m)/(2m-1)$ for $m\ge2$ and $\lvert P_m\rvert\le1$, $\nu_p\le2(p+1)!/(2p+1)$; this gives $\nu_4=240/9$, and the sharper values $1,1.1548,3$ for $p=1,2,3$ are those of Lemma H.1. Leibniz' rule over the $1+j$ factors gives $\lvert\partial^mQ_j\rvert\le m![t^m](\hat G\hat N^j)/\rho^{m+2}$. *The factor $f^{(j)}(w)$.* $\lvert f^{(j+q)}\rvert\le(j+q)!/D^{j+q+1}$ and $\lvert\partial^pw\rvert\le\nu_pv/\rho^p$ for $p\ge1$; Faà di Bruno's formula with absolute values gives $\lvert\partial^pf^{(j)}(w)\rvert\le p![t^p]\hat F_j(v(\hat N-1))/\rho^p$. Multiplying the two majorant series gives the stated coefficient. In each product the norm of a mixed term is at most the product of the norms. $\blacksquare$

The majorant reproduces Lemma H.1 exactly for $c_{20}$ and $c_{30}$ and exceeds it for the mixed constants, because it bounds $\lvert\partial P_k\rvert$ by $3$ where Lemma H.1 uses the sharper $2$; at rest $c_{40}=120$, the exact norm. At the endpoint speeds $v_*\approx0.0108$ and $0.0143$ the instrument gives $(c_{40},c_{31},c_{22},c_{13},c_{04})\le(123.41,54.13,38.46,31.61,25.34)$ and $(124.54,54.86,39.07,32.15,25.79)$.

For joint arguments $\zeta_q=(h_q,k_q)$ (spatial part, velocity part) the $N$-th derivative obeys $\lvert\partial^N\Psi[\zeta_1,\dots,\zeta_N]\rvert\le\sum_{S}c_{N-\lvert S\rvert,\lvert S\rvert}\rho^{-(N+2-\lvert S\rvert)}\prod_{q\notin S}\lvert h_q\rvert\prod_{q\in S}\lvert k_q\rvert$, the sum over the sets $S$ of velocity slots. Write $J_N^{\rm w}$ for this majorant with the constants at speed $v_*$ and range $\kappa_*r$ (Lemma H.1 for $N=3$, Lemma K for $N=4$), and $J_N^{\rm rest}$ for it at $(\ell,0)$ with the rest values $(6,2,2)$ and $(24,6,6,6)$.

## 3. The remainder beyond the cubic

The reflected odd remainder has, by the proof of Lemma L.2, the exact form
$$
\mathcal O_\ell=\bigl[H(\zeta_+)-H(-\zeta_-)\bigr]-\bigl[H(b)-H(-b)\bigr]+T_\ell\bigl[\bar\Phi(s_+)+\bar\Phi(s_-)-2P_0\bigr]+B_\ell\bigl[\bar\Phi'(s_+)+\bar\Phi'(s_-)-2P_1\bigr],
$$
where $H(\zeta)=\Psi(\ell+\zeta)-\Psi(\ell,0)-\partial\Psi(\ell,0)\zeta$ is the row's remainder after its linear part, $\zeta_\pm=(\alpha-\bar\Phi(s_\pm),\bar\Phi'(s_\pm))$, $b=(\alpha,0)$, $s_\pm=T-r-\delta_\pm$ are the two sampling times and $\delta_\pm$ the two delay deviations. Put $\bar\zeta=\tfrac12(\zeta_++\zeta_-)$ and $\omega=\tfrac12(\zeta_+-\zeta_-)$, so that $\zeta_+=\bar\zeta+\omega$ and $-\zeta_-=-\bar\zeta+\omega$. Then the first two brackets equal $O(\bar\zeta)-O(b)+\Delta(\omega)$, with $O(\zeta)=H(\zeta)-H(-\zeta)$ the odd part of $H$ and $\Delta(\omega)=\int_0^1[\partial\Psi(\ell+\bar\zeta+\theta\omega)-\partial\Psi(\ell-\bar\zeta+\theta\omega)][\omega]\,d\theta$.

The cubic of Lemma O.1 is matched piece by piece: $O(\bar\zeta)-O(b)$ against $\tfrac13(G_3[z_1^3]-G_3[b^3])$, $\Delta(\omega)$ against $2G_2[z_1,z_2]$, and the two delay brackets against their Taylor terms. Each difference is a remainder of fourth or fifth order. The auxiliary sizes, all bounds, are
$$
\begin{aligned}
\sigma&=\tfrac12\Bigl(\frac{m^2}{\kappa_*r}+2Vm\Bigr)\ \ \bigl(\ge\tfrac12\lvert\delta_++\delta_-\rvert,\ \text{Lemma L.2}\bigr),\qquad
e_R=V\sigma+\tfrac12Wm^2,\qquad e_v=W\sigma+\tfrac12Um^2,\\
\epsilon_\Delta&=e_R+\frac{1.1548}6\frac{m^3}{(\kappa_*r)^2}+\frac{Vm^2}{\kappa_*r},\qquad
\omega_R=Vm,\quad\omega_v=Wm,\\
\bar\omega_R&=V\epsilon_\Delta+Wm\sigma+\tfrac16Um^3,\qquad\bar\omega_v=W\epsilon_\Delta+Um\sigma+\tfrac16U_4m^3,\\
e_\delta&=\frac{m^4}{4(\kappa_*r)^3}+\frac{(Vm)^2}r+\frac{1.1548}{(\kappa_*r)^2}\Bigl(m^2+\tfrac13(Vm)^2\Bigr)Vm,\\
\Delta_2&=\frac{2me_R}r+2V\epsilon_\Delta+2Wm\sigma+\tfrac13Um^3+e_\delta,\qquad\Delta_q=\sigma^2+2m\epsilon_\Delta,\qquad\Delta_c=6\sigma m^2 .
\end{aligned}
$$

**Lemma R (the remainder; derived).** Under the hypotheses of Lemma O.1, $\lvert\mathcal O_\ell-2C_\ell(\alpha;J)\rvert\le R_a+R_b+R_c+R_d+R_e+R_f$ with
$$
\begin{aligned}
R_a&=\tfrac13J_4^{\rm w}\bigl((m,V)^3,(P,V)\bigr),&
R_b&=J_3^{\rm rest}\bigl((m,V),(m,V),(e_R,e_v)\bigr),\\
R_c&=J_3^{\rm w}\bigl((\omega_R,\omega_v),(m,V),(\omega_R,\omega_v)\bigr)+\tfrac13J_4^{\rm w}\bigl((m,V)^3,(\omega_R,\omega_v)\bigr),&
R_d&=2J_2^{\rm rest}\bigl((e_R,e_v),(\omega_R,\omega_v)\bigr)+2J_2^{\rm rest}\bigl((m,V),(\bar\omega_R,\bar\omega_v)\bigr),\\
R_e&=\frac2{r^3}\Bigl[V\Delta_2+W\Delta_q+\tfrac16U\Delta_c+\tfrac1{12}U_4m^4\Bigr],&
R_f&=\frac1{r^2}\Bigl[W\Delta_2+U\Delta_q+\tfrac16U_4\Delta_c+\tfrac1{12}U_5m^4\Bigr].
\end{aligned}
$$

*Proof.* Write $\mathcal O_\ell-2C_\ell=R_a'+R_b'+R_c'+R_d'+R_e'+R_f'$ with
$R_a'=[O(\bar\zeta)-O(b)]-\tfrac13(G_3[\bar\zeta^3]-G_3[b^3])$,
$R_b'=\tfrac13(G_3[\bar\zeta^3]-G_3[z_1^3])$,
$R_c'=\Delta(\omega)-2G_2[\bar\zeta,\omega]$,
$R_d'=2G_2[\bar\zeta-z_1,\omega]+2G_2[z_1,\omega-z_2]$,
and $R_e'$, $R_f'$ the two delay brackets minus $T_\ell(P_2\delta_1^2-2P_1\delta_2)$ and $B_\ell(P_3\delta_1^2-2P_2\delta_2)$; here $G_2,G_3$ are the derivatives at $(\ell,0)$, and the identity follows from the decomposition above and the definition of $C_\ell$.

*$R_a'$.* $O(\bar\zeta)-O(b)=\int_0^1\partial O(\xi_\theta)[\bar\zeta-b]\,d\theta$ with $\xi_\theta=b+\theta(\bar\zeta-b)$, and $\partial O(\xi)=\partial\Psi(\ell+\xi)+\partial\Psi(\ell-\xi)-2\partial\Psi(\ell)$. For $e(s)=\partial O(s\xi)[h]$: $e(0)=e'(0)=0$, $e''(0)=2G_3[\xi,\xi,h]$ and $e'''(s)=\partial^4\Psi(\ell+s\xi)[\xi^3,h]-\partial^4\Psi(\ell-s\xi)[\xi^3,h]$; Taylor's formula gives $\lvert e(1)-G_3[\xi,\xi,h]\rvert\le\tfrac13\sup\lvert\partial^4\Psi[\xi^3,h]\rvert$. With $\lvert\xi_R\rvert\le m$, $\lvert\xi_v\rvert\le V$ and $\bar\zeta-b=(-\bar\Phi_s,\bar\Phi'_s)$ of sizes $(P,V)$, this is $R_a$.

*$R_b'$.* $G_3[\bar\zeta^3]-G_3[z_1^3]$ is a sum of three terms, each with one slot $\bar\zeta-z_1$ and two slots of sizes $(m,V)$. Here $\bar\zeta-z_1=(-(\bar\Phi_s-P_0),\bar\Phi'_s-P_1)$ with $\bar\Phi_s=\tfrac12(\bar\Phi(s_+)+\bar\Phi(s_-))$; from $\bar\Phi(T-r-\delta)=P_0-P_1\delta+R_2(\delta)$, $\lvert R_2\rvert\le W\delta^2/2$, and $\lvert\delta_\pm\rvert\le m$, $\lvert\bar\Phi_s-P_0\rvert\le V\sigma+\tfrac12Wm^2=e_R$, and likewise $\lvert\bar\Phi'_s-P_1\rvert\le e_v$.

*$R_c'$.* $\partial\Psi(x+u)-\partial\Psi(x-u)-2G_2[u]=\int_{-1}^1[\partial^2\Psi(x+su)-\partial^2\Psi(\ell+su)][u]ds+\int_{-1}^1[\partial^2\Psi(\ell+su)-G_2-G_3[su]][u]ds$ for $x=\ell+\theta\omega$, $u=\bar\zeta$, the subtracted $G_3$ term integrating to zero. The first integral is at most $2\theta\sup\lvert\partial^3\Psi[\omega,u,\cdot]\rvert$ and the second at most $\tfrac13\sup\lvert\partial^4\Psi[u^3,\cdot]\rvert$; applied to $\omega$ and integrated over $\theta$ this gives $R_c$, with $\lvert\omega_R\rvert\le V\lvert\delta_+-\delta_-\rvert/2\le Vm$ and $\lvert\omega_v\rvert\le Wm$. The points $\ell+\theta\omega+s\bar\zeta=\ell+\tfrac{s+\theta}2\zeta_++\tfrac{s-\theta}2\zeta_-$ have spatial part at most $m$ and velocity part at most $v_*$.

*$R_d'$.* The first term uses $(e_R,e_v)$ and $(\omega_R,\omega_v)$. For the second, $\omega_R-\delta_1P_1=P_1[\tfrac12(\delta_+-\delta_-)-\delta_1]+\tfrac12[R_2(\delta_-)-R_2(\delta_+)]$. Writing $R_2(\delta)=\tfrac12P_2\delta^2+R_3(\delta)$, $\lvert R_3\rvert\le U\lvert\delta\rvert^3/6$, and $\lvert\delta_-^2-\delta_+^2\rvert\le2m\cdot2\sigma$, the last bracket is at most $Wm\sigma+Um^3/6$. For the first, with $x_\pm=\alpha-\bar\Phi(s_\pm)$, $\bar x=\tfrac12(x_++x_-)$ and $e=\tfrac12(x_+-x_-)=\omega_R$: $\delta_+-\delta_-=\lvert\ell+\bar x+e\rvert-\lvert\ell-\bar x+e\rvert$, and $\lvert\ell+\bar x\rvert-\lvert\ell-\bar x\rvert=2n\cdot\bar x+E_3$ with $\lvert E_3\rvert\le\tfrac13\sup\lvert\partial^3\rho\rvert\lvert\bar x\rvert^3\le\tfrac13\cdot1.1548\,m^3/(\kappa_*r)^2$, while the change from adding $e$ is at most $\sup\lvert\partial^2\rho\rvert\cdot2\lvert\bar x\rvert\lvert e\rvert\le2mVm/(\kappa_*r)$; finally $n\cdot\bar x-\delta_1=-n\cdot(\bar\Phi_s-P_0)$. So $\lvert\tfrac12(\delta_+-\delta_-)-\delta_1\rvert\le\epsilon_\Delta$ and $\lvert\omega_R-\delta_1P_1\rvert\le\bar\omega_R$; the velocity part is the same with one more derivative, $\lvert\omega_v+\delta_1P_2\rvert\le\bar\omega_v$.

*$R_e'$.* Taylor's formula to third order with $\lvert R_4\rvert\le U_4\delta^4/24$ gives $\bar\Phi(s_+)+\bar\Phi(s_-)-2P_0=-P_1(\delta_++\delta_-)+\tfrac12P_2(\delta_+^2+\delta_-^2)-\tfrac16P_3(\delta_+^3+\delta_-^3)+R_4(\delta_+)+R_4(\delta_-)$, so $R_e'=T_\ell\{-P_1(\delta_++\delta_--2\delta_2)+P_2[\tfrac12(\delta_+^2+\delta_-^2)-\delta_1^2]-\tfrac16P_3(\delta_+^3+\delta_-^3)+R_4(\delta_+)+R_4(\delta_-)\}$. *The sum of the deviations.* $\delta_++\delta_-=\lvert\ell+\bar x+e\rvert+\lvert\ell-\bar x+e\rvert-2r$. At $e=0$ this is $\lvert\bar x_\perp\rvert^2/r+E_4$ with $\lvert E_4\rvert\le\tfrac1{12}\sup\lvert\partial^4\rho\rvert\lvert\bar x\rvert^4\le m^4/(4(\kappa_*r)^3)$; adding $e$ changes it by $2n\cdot e+\partial^2\rho(\ell)[e,e]+\int R\cdot e$, with $\lvert\partial^2\rho(\ell)[e,e]\rvert\le\lvert e\rvert^2/r$ and $\lvert\int R\cdot e\rvert\le1.1548(\lvert\bar x\rvert^2+\lvert e\rvert^2/3)\lvert e\rvert/(\kappa_*r)^2$. Also $2n\cdot e=(n\cdot P_1)(\delta_+-\delta_-)+n\cdot[R_2(\delta_-)-R_2(\delta_+)]$ and $2\delta_2=2(n\cdot P_1)\delta_1+\lvert x_\perp\rvert^2/r$ with $\lvert\lvert\bar x_\perp\rvert^2-\lvert x_\perp\rvert^2\rvert\le2me_R$. Collecting, $\lvert\delta_++\delta_--2\delta_2\rvert\le\Delta_2$. *The squares and cubes.* With $\sigma_\delta=\tfrac12(\delta_++\delta_-)$ and $\Delta_\delta=\tfrac12(\delta_+-\delta_-)$, $\tfrac12(\delta_+^2+\delta_-^2)-\delta_1^2=\sigma_\delta^2+(\Delta_\delta-\delta_1)(\Delta_\delta+\delta_1)$, at most $\Delta_q$, and $\lvert\delta_+^3+\delta_-^3\rvert\le\lvert\delta_++\delta_-\rvert\cdot3m^2\le\Delta_c$. With $\lvert T_\ell\rvert=2/r^3$ this is $R_e$. *$R_f'$* is the same for $\bar\Phi'$, one derivative higher, with $\lvert B_\ell\rvert=1/r^2$. $\blacksquare$

*Orders.* $R_a$ has minimum degree four and every other term minimum degree five ($R_e$ and $R_f$ also contain terms of degree seven, from the cubic-in-$e$ part of $e_\delta$); every term contains a source factor $P,V,\dots$, which carries $e^{-\underline\lambda r}$. On four sampled configurations at actual amplitude (receiver displacement up to $0.05$, source amplitude $0.04$) the true $\lvert\mathcal O_\ell-2C_\ell\rvert$, from a row and causal root computed at 50 digits and compared in floating arithmetic, lies between $0.36$ and $1.3$ percent of the bound $R_a+\dots+R_f$ (a sample; the lemma is the proof).

## 4. The assembled estimate

**Proposition D (the deviation sum; derived).** With $\pi^0_r=\rho_Pde^{-\underline\lambda r}$, the deviation of Lemma O.2 satisfies $\lvert\mathrm{Dev}\rvert\le X^2\,\mathcal D(A,d)$ with
$$
\mathcal D(A,d)=\sum_{\ell\ne0}\bigl[M_\ell(A;p+\Delta p)-M_\ell(A;p)\bigr],\qquad p_k=\overline\lambda^{\,k}\pi^0_r,\quad\Delta p_k=\bigl[\tilde\omega_k(r)+\tfrac{r^2}{800}\overline\lambda^{\,k}\bigr]\pi^0_r .
$$
*Proof.* Lemma O.2(3), with the factor $X$ of each source and receiver size extracted; every monomial has degree three, so $X^3\le X^2$. $\blacksquare$

The sum over offsets of a monomial $A^i(\pi_r)^jr^{-k}$ is $A^i(\rho_Pe^{\underline\lambda\delta_*}d)^jL(j,k)$, and likewise with $\pi^0_r$, where
$$
L(j,k)=\sum_{\ell\ne0}e^{-j\underline\lambda r}\,r^{-k}
$$
is enclosed by the instrument: exact shell counts over the cube of half-width $8$, interval exponentials, and for the sites with largest coordinate $m\ge9$ the count $24m^2+2$, $r\ge m$ and $r\le\sqrt3m$. As a known case, $L(1,k)\le S_k(a)$ and $L(2,k)\le S_k(2a)$ for $k=2,3,4$, the declared sums of the accepted notes ($L(1,2)\le0.52907$ against $S_2(a)\le0.5897$, because $\underline\lambda>a$).

**Theorem F (the assembled signed estimate; derived).** Let $(d_*,y_*)$ satisfy the hypotheses of Lemma T.1, or of Lemma G.2 on a chart with caps $(\rho_c,\varpi_c)$, and let $t$ be a time at which the solution lies in the chart with $\tilde\Delta(t)\le d_*$, $y(t)\le y_*$. Then
$$
\lVert\mathcal N[\tilde u^t]\rVert_{0,2a}\le F_{\rm odd}(d,y)=g\Bigl[c_{E3}^*A^3+\Sigma_{\rm br}(A,\mu_*d,y)+\mathcal O_{\rm odd}(A,d)\Bigr],
$$
$$
\mathcal O_{\rm odd}(A,d)=N_{21}\rho_PA^2d+N_{12}\rho_P^2Ad^2+N_{03}\rho_P^3d^3+\mathcal D(A,d)+\tfrac12\mathcal R(A,d),\qquad\mathcal R(A,d)=\sum_{\ell\ne0}(R_a+\dots+R_f)\big|_{\lvert\alpha\rvert\to A,\ \text{sources}\to\overline\lambda^{\,n}\pi_r},
$$
where $c_{E3}^*$ and $\Sigma_{\rm br}$ are those of Theorem H.2 (accepted chart) or H.3 (chart $(1/12,0.3)$) at the sizes $(d_*,y_*)$. $F_{\rm odd}$ is a polynomial in $(d,y)$ with nonnegative coefficients and no monomial of degree below two.

*Proof.* By Proposition S.4 each mirror pair contributes $\sigma_\ell$ times two source-difference brackets and $\sigma_\ell\mathcal O_\ell$; the receiver term keeps its eight-source block evaluation. The brackets and the receiver term are bounded exactly as in Proposition T.2 with the constants of Lemma H.1 (accepted). For the odd part, $\tfrac12\sum_\ell\sigma_\ell\mathcal O_\ell=\sum_\ell\sigma_\ell C_\ell+\tfrac12\sum_\ell\sigma_\ell(\mathcal O_\ell-2C_\ell)$ by Lemma O.1, both series converging absolutely. The first is bounded by the companion note's summed signed cubic, $X^3[N_{21}\rho_PA^2d+N_{12}\rho_P^2Ad^2+N_{03}\rho_P^3d^3]+X^2\mathcal D$; the second by $\tfrac12\sum_\ell(R_a+\dots+R_f)$, whose monomials have degree at least four, so that after the window sizes are inserted it is at most $\tfrac12X^2\mathcal R(A,d)$. Dividing by $X^2$ and taking the supremum over $T\le0$ gives the norm. The coefficient signs are checked by the instrument. $\blacksquare$

The main term needs no tube constant: it is evaluated at the rest geometry with the exact jets at the anchor time. The tube constants enter only $\mathcal R$ and the accepted brackets and receiver term.

## 5. Barriers

**Theorem B.1 (derived, relying on the accepted notes and the companion note).** Inside the accepted chart let $(d_*,K)=(0.053,2.5)$, $y_*=0.0070225$, with tube sizes $\delta_*\le0.0647113$, $v_*\le0.0107836$, $\mu_*\le0.91764$, receiver coefficient $14.596$. In exact arithmetic:

- (a) $d_*+y_*=0.0600225\le1/16$, $\bar a(d_*+2y_*)=0.1807063885\le3/16$, $\delta_*<1$;
- (b) $C_LF_{\rm odd}(d_*,y_*)\le0.0068708<y_*$;
- (c) $C_LF_{\rm odd}(d_0,Kd_0^2)<Kd_0^2$ and $C_LF_{\rm odd}(d_0,31.9d_0^2)<31.9d_0^2$ with $d_0=0.0006351$, and $d_0\le d_*$, $31.9d_0^2\le y_*$.

Consequently, for every $0<\varepsilon\le0.00646$, with $T_O(\varepsilon)=\ln(0.053/(0.0983\varepsilon))/2.8033$, the same complete-past solution exists on $(-\infty,T_O]$ with $\lvert u-\varepsilon\phi\rvert\le y<2.5\,\tilde\Delta^2$ on $[0,T_O]$; displacements at most $0.0600225$, speeds at most $0.18071$, accelerations at most $0.58909$, transmitter factors at least $0.81929$, separations at least $0.879955$, each delay within $0.120045$ of the anchor distance; one causal root per ordered pair and no root on a member's own path; finite spatially weighted size (qualitative). $T_O-T_H=\ln(0.053/0.047)/2.8033\ge0.0428$, and $T_O\ge T_N+0.3266$ at $\varepsilon=0.00646$, the difference from $T_N$ increasing with $\ln(1/\varepsilon)$. The pair $(0.050,2.25)$ also passes, with $C_LF_{\rm odd}\le0.0055077<0.005625$.

**Theorem B.2 (derived, relying in addition on the larger-chart note).** On the chart with caps $(1/12,\,0.3)$ let $(d_*,K)=(0.064,4.25)$, $y_*=0.017408$, with $\delta_0\le0.164742$, $\delta_*\le0.0878409$, $v_*\le0.0142608$, $\mu_*\le0.91959$, receiver coefficient $14.885$; and (a) $d_*+y_*=0.081408\le1/12$, $\bar a(d_*+2y_*)=0.2663387648\le0.3$, $\delta_0,\delta_*<1$; (b) $C_LF_{\rm odd}\le0.0172118<y_*$; (c) the start as above. Consequently the same solution exists to $T_{O'}(\varepsilon)=\ln(0.064/(0.0983\varepsilon))/2.8033$, with $\lvert u-\varepsilon\phi\rvert<4.25\,\tilde\Delta^2$, displacements at most $0.081408$, speeds at most $0.26634$, accelerations at most $0.97079$, transmitter factors at least $0.73366$, separations at least $0.837184$, delays within $0.162816$ of the anchor distance, one causal root per ordered pair and no own-path root. $T_{O'}-T_{H'}=\ln(0.064/0.052)/2.8033\ge0.0740$. The pair $(0.060,3.75)$ also passes, with $C_LF_{\rm odd}\le0.0125868<0.0135$.

*Proofs.* Those of Theorems T.3 and G.3 (and H.2, H.3) with $F_{\rm odd}$ in place of $F_{\rm H}$. Along the first-crossing argument and at the start the sizes are at most $(d_*,y_*)$, so the solution stays within the caps, the tube constants and Theorem F apply, and $y(t)\le C_LF_{\rm odd}(\tilde\Delta(t),y(t))$ by Lemma E.1 (Lemma G.1 on the larger chart). The nonnegative coefficients and degree at least two give the scaling from (b) and (c) to every smaller seed size; the start follows by concavity from $y(0)\le31.9\tilde\Delta(0)^2$; the first-crossing argument and maximal continuation give existence and the bound. The items follow from $d_*+y_*$, $\bar a(d_*+2y_*)$, $\bar a^2(d_*+4y_*)$ and the chart facts. $\blacksquare$

| Contribution to $C_LF$ | $(0.047,5)$ accepted | $(0.053,2.5)$ | $(0.064,4.25)$, chart $(1/12,0.3)$ |
| --- | ---: | ---: | ---: |
| receiver cubic | $0.001791$ | $0.001983$ | $0.005046$ |
| source-difference brackets | $0.002888$ | $0.002851$ | $0.006846$ |
| signed odd main term | | $0.001398$ | $0.003058$ |
| deviation sum | | $0.000143$ | $0.000311$ |
| half remainder sum | | $0.000495$ | $0.001950$ |
| half accepted odd bound (same sizes) | $0.006115$ | $0.007632$ | $0.019379$ |
| total $C_LF$ | $0.010794$ | $0.006871$ | $0.017212$ |

The last line but one shows that the accepted estimate fails at both new endpoints: its total would be about $0.0125$ against $y_*=0.0070225$, and about $0.0313$ against $0.017408$.

## 6. Central growth

**Proposition G (derived).** For $0<\varepsilon\le0.00646$ and every time $0\le T\le T_O(\varepsilon)$ with $\tilde\Delta(T)\le d$, where $(d,K)$ is one of the pairs of Theorem B.1, $\lvert u_0(T)\rvert\ge\varepsilon p_0e^{\underline\lambda T}-K\tilde\Delta(T)^2$, $p_0=0.0763$. At the time where $\tilde\Delta=d$ the bound equals $L_{d,K}(\varepsilon)=\varepsilon^{1-\beta}p_0(d/0.0983)^\beta-Kd^2$, $\beta=\underline\lambda/\overline\lambda$; it increases with $\varepsilon$ and is positive at $10^{-37}$ for $(0.053,2.5)$ (at least $0.018287$), hence on $[10^{-37},0.00646]$. Moreover, for every $\varepsilon$ and every $d\in[0.0983\varepsilon,0.053]$, $L_{d,2.5}(\varepsilon)$ is a lower bound at the time where $\tilde\Delta=d$; the instrument evaluates it near its maximizer in $d$ for $\varepsilon=10^{-60},10^{-100},10^{-200},10^{-300}$ and finds it positive in each case.

*Proof.* As Proposition B.7 of the band-envelope note: $\lvert u_0\rvert\ge\mathbf e\cdot\varepsilon\phi_0-\lvert c_0\rvert$, Proposition B.4 for the first term and Theorem B.1, valid at every smaller seed size by scaling, for the second. Monotonicity in $\varepsilon$ holds because $1-\beta>0$. The values are interval evaluations. $\blacksquare$

| $\varepsilon$ | $T_O\ge$ | $\lvert u_0(T_O)\rvert\ge$ | $\sup_j\lvert u_j(0)\rvert\le$ | growth factor $\ge$ | $T_{O'}\ge$ | $\lvert u_0(T_{O'})\rvert\ge$ |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| $0.00646$ | $1.5782$ | $0.033083$ | $5.878\times10^{-4}$ | $56.2$ | $1.6455$ | $0.030969$ |
| $10^{-3}$ | $2.2437$ | $0.032656$ | $9.088\times10^{-5}$ | $359$ | $2.3110$ | $0.030454$ |
| $10^{-4}$ | $3.0651$ | $0.032134$ | $9.086\times10^{-6}$ | $3537$ | $3.1324$ | $0.029825$ |
| $10^{-6}$ | $4.7079$ | $0.031112$ | $9.086\times10^{-8}$ | $3.42\times10^5$ | $4.7752$ | $0.028592$ |
| $10^{-8}$ | $6.3507$ | $0.030117$ | $9.086\times10^{-10}$ | $3.31\times10^7$ | $6.4179$ | $0.027391$ |
| $10^{-12}$ | $9.6362$ | $0.028203$ | $9.086\times10^{-14}$ | $3.10\times10^{11}$ | $9.7035$ | $0.025083$ |

The time-zero bound is $\varepsilon\bar P+2.25(0.0983\varepsilon)^2$, from the start argument of the pair $(0.050,2.25)$. On the chart $(1/12,0.3)$ the central lower bound at $T_{O'}$ uses $K=4.25$ and is positive at $10^{-37}$ (at least $0.013121$). For the smallest amplitudes, the lower bounds near the maximizing seed size are at least $0.011649$ at $\varepsilon=10^{-60}$ (at $d=0.053$), $0.0043211$ at $10^{-100}$ ($d\approx0.04134$), $3.115\times10^{-4}$ at $10^{-200}$ ($d\approx0.01110$) and $2.246\times10^{-5}$ at $10^{-300}$ ($d\approx0.00298$).

**What is not obtained, precisely.** The maximum over $d$ of $L_{d,K}(\varepsilon)$ is attained near $d\propto\varepsilon^{(1-\beta)/(2-\beta)}$ and has size proportional to $\varepsilon^{2(1-\beta)/(2-\beta)}\approx\varepsilon^{0.0114}$, which tends to zero with $\varepsilon$. The loss comes from the two envelope rates used: the central bound grows at the lower edge $\underline\lambda$ of the proved band and the seed-size bound at its upper edge $\overline\lambda$, so $\beta<1$. Changing the correction allowance alone cannot remove it: even with no correction subtracted, the central envelope at seed sizes up to a fixed $D$ is at most $p_0(D/0.0983)^\beta\varepsilon^{1-\beta}$, which tends to zero with $\varepsilon$. A guaranteed central displacement bounded below uniformly in $\varepsilon$ would need a central lower bound and a seed-size bound with the same rate; the proved enclosure of the rates does not supply one, and nothing here decides whether the actual rates on a given seed's support have positive spread. The guaranteed growth factor, the ratio of the central bound to the initial size, does tend to infinity as $\varepsilon\to0$, like $\varepsilon^{-0.9886}$.

## 7. Where this estimate stops

**Proposition H (derived; exact certificates).** (i) Inside the accepted chart there is no barrier for $F_{\rm odd}$ at any seed size $d\ge0.0558$, for any coefficient and any admissible tube constants. (ii) On every chart with displacement cap below one half and speed cap below one there is none at any $d\ge0.0805$.

*Proof.* As Proposition H.4. Coefficientwise, $F_{\rm odd}$ is at least the polynomial whose odd part is the main term alone, because $\mathcal D$ and $\mathcal R$ have nonnegative coefficients and the main term does not depend on the sizes, and whose brackets and receiver term are the accepted lower envelopes of Proposition H.4. On the range of $y$ allowed by the caps the concave-maximum certificate gives an upper bound below $-8.23\times10^{-5}$ at $d=0.0558$ in case (i) and below $-1.56\times10^{-5}$ at $d=0.0805$ in case (ii); monotonicity in $d$ extends both. $\blacksquare$

So the declared $0.053$ lies about five percent below the reach of this estimate inside the accepted chart, where the speed cap $3/16$ leaves room only for $y\le(3/(16\bar a)-d)/2$. With the odd remainder reduced, the largest part is the pair of source-difference brackets, whose correction-at-source products are not reduced by pairing (summed signed-remainder note, Section 4), and then the receiver cubic.

## 8. Instrument, evidence, falsifiers and limits

[`odd_barrier.py`](../evidence/saturday-lattice-odd-remainder-2026-10-21/odd_barrier.py), described in the [evidence README](../evidence/saturday-lattice-odd-remainder-2026-10-21/README.md), imports the companion instrument `odd_cubic.py` and the accepted `sharp_barrier.py` unchanged. It encloses $L(j,k)$, computes the constants of Lemma K, builds $\mathcal R$ and $\mathcal D$ as exact polynomials and sums them, assembles $F_{\rm odd}$ with the accepted brackets and receiver coefficient at the declared tube sizes, and evaluates the barrier conditions, times, growth bounds, all-label bounds and certificates. Known cases, run before its formal barrier target loop (an exploration had evaluated the same functions earlier; see the README): the lattice sums below the declared accepted ones; the majorant constants equal to Lemma H.1 for $c_{20}$, $c_{30}$ and above it for the mixed ones; $c_{40}=120$ at rest; the remainder bound above the true $\lvert\mathcal O_\ell-2C_\ell\rvert$ at four configurations, a sampled floating comparison whose row and root are computed internally at 50 digits; and the accepted value $C_LF_{\rm H}(0.047,0.011045)=0.0107938493\ldots$ reproduced through the same builder.

Falsifiers:

- Lemma K: an argument with $\lvert v\rvert\le v$ at which a fourth derivative of $\Psi$ exceeds $c_{ij}(v)/\rho^{2+i}$.
- Lemma R: a configuration in the tube with $\lvert\mathcal O_\ell-2C_\ell\rvert>R_a+\dots+R_f$.
- Theorem F: histories satisfying the hypotheses with $\lVert\mathcal N[\tilde u^t]\rVert_{0,2a}>F_{\rm odd}(d,y)$; a negative coefficient.
- Theorems B.1–B.2: an exact evaluation in which (a), (b) or (c) fails with the declared constants; a complete-past solution of the family that violates one of their bounds before the stated time. A finite-onset run from the seed alone does not test this.
- Proposition G: an exact evaluation contradicting a table entry.
- Proposition H: a seed size above the stated value and $y$ within the caps with $y\ge C_LF_{\rm odd}(d,y)$ for admissible constants.

Limits: every limit of the accepted notes and of the companion note is inherited, including the dependence of Theorem B.2 on the larger-chart lemma and the interval-library conditionality of the declared constants. The declared pairs are passing choices, chosen by a floating exploration and then checked exactly; the certificates bound this estimate, not the solution. Order-one displacement, the ending of regular evolution and wake-speed arrival are not addressed.
