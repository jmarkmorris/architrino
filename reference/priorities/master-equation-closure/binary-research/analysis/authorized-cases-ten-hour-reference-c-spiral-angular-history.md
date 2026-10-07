# Independent angular-history formulation

Claim grade: derived from the unchanged logarithmic mirror equation on the already admitted positive-angular-momentum, acute-lag branch. This reference is frozen before reading the new angular-history subject. It changes neither the complete preparation nor the response law.

Write $p=r'$, $z=h/r>0$ and use the strictly increasing geometric angle $\theta$ as time. Set $y=p/z$ and $\chi=1/z$. Then $r_\theta=ry$ and $t_\theta=r\chi$. If the source angle is $\theta-\delta$, define

$$
\rho=\exp\left(-\int_{\theta-\delta}^{\theta}y(v)\,dv\right),\qquad
l=(1+\rho^2+2\rho\cos\delta)^{1/2}.
$$

The complete clock is exactly

$$
\int_{\theta-\delta}^{\theta}
\exp\left(-\int_u^\theta y(v)\,dv\right)\chi(u)\,du=l.
$$

Subscript $s$ below means evaluation at $\theta-\delta$. Projection of the opposite source velocity gives

$$
D=1+\frac{y_s(\rho+\cos\delta)+\sin\delta}{l\chi_s}.
$$

The current radial and tangential acceleration projections are $-(1+\rho\cos\delta)/(r l^2D)$ and $\rho\sin\delta/(r l^2D)$. Differentiating the two angular variables therefore gives the radius-independent history system

$$
\begin{aligned}
\chi_\theta&=\chi y-\frac{\chi^3\rho\sin\delta}{l^2D},\\
y_\theta&=1+y^2-\frac{\chi^2(1+\rho\cos\delta+y\rho\sin\delta)}{l^2D}.
\end{aligned}
$$

This removes only the overall radius scale. The implicit source angle and its complete sampled history remain essential.

Let $F$ be the clock integral minus $l$. Differentiation in lag yields $F_\delta=\rho\chi_sD>0$, so the ordinary clock is locally unique. This monotonicity in lag does not give an order-preserving response to a history perturbation. At fixed $\chi$ and fixed trial lag, a variation $\dot y$ has

$$
\dot F=\int_{\theta-\delta}^{\theta}
\left[
\frac{\rho(\rho+\cos\delta)}{l}
-\int_{\theta-\delta}^{v}
\exp\left(-\int_u^\theta y\right)\chi(u)\,du
\right]\dot y(v)\,dv.
$$

On the acute branch the bracket is positive at the source end. At the current end, use the clock equality to obtain $-(1+\rho\cos\delta)/l<0$. Thus nonnegative perturbations supported near opposite ends can induce opposite signs of $\dot F$, and hence opposite signs of the lag variation $\dot\delta=-\dot F/F_\delta$. There is no general pointwise monotonicity in the $y$ history.

As a known analytical control, constant $y,\chi$ gives $\rho=e^{-y\delta}$ and clock integral $\chi(1-\rho)/y$. Equilibrium reduces to

$$
y=\frac{\rho\sin\delta}{1+\rho\cos\delta},\qquad
\frac{\chi^2}{l^2D}=\frac1{1+\rho\cos\delta},
$$

together with that clock. These are precisely the constant radial-to-angular and tangential-speed relations of the admitted logarithmic spiral. The formulation selects no new member, return map or spectrum. Falsifiers are a source-velocity sign error, omitted clock variation or an incorrect time-to-angle factor.
