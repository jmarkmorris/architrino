# Exact degree-two and degree-three controls for the proposed map

**Status: derived analytical controls, unreviewed.** Keep the same fixed member and complete preparation. This supplies explicit low-order generators for the [correlated-map recursion](authorized-cases-ten-hour-b-correlated-map-contract.md). It is intended as a known input/output control before any implementation evaluates the missing higher coefficients. No coefficient instrument is run here.

Write $z=(x,u)$, $x=w-1$, $Jz=(-u,x)$, $g=4/3$, and use the raw parameter $\eta=\epsilon/h$ before transformation. The accepted angular quadratic and cubic rows give

$$
\begin{aligned}
f_2&=(-2u-2xu,\;-u^2-\tfrac12-x-\tfrac12x^2),
&b_2&=u,\\
f_3&=(2g+4gx+2gx^2,\;-gu-gxu),
&b_3&=-g(1+x),
\end{aligned}
\tag{1}
$$

where $(\log\eta)_\phi=\eta^2b_2+\eta^3b_3+\cdots$. The group means are

$$
\overline f_2=\tfrac12Jz,\qquad \overline b_2=0,
\qquad \overline f_3=\tfrac32g z=2z,
\qquad \overline b_3=-g.
\tag{2}
$$

For the convention in the contract, let $\mathcal L P=DP\,Jz-JP$. The unique zero-group-mean generators through these degrees are

$$
\boxed{
P_2=
\left(\frac12+\frac34x+\frac32x^2,
-\frac34u+xu\right),
\qquad p_2=-x,
}
\tag{3}
$$

$$
\boxed{
P_3=
\left(\frac54g u+gxu,
2g+\frac54g x+g(x^2+u^2)\right),
\qquad p_3=-gu.
}
\tag{4}
$$

Here the extended degree-n generator is $\eta^n(P_n,\eta p_n)$. Direct polynomial differentiation checks

$$
\mathcal L P_2=f_2-\tfrac12Jz,
\qquad \mathcal L_{\rm rot}p_2=b_2,
$$

$$
\mathcal L P_3=f_3-\tfrac32g z,
\qquad \mathcal L_{\rm rot}p_3=b_3+g.
\tag{5}
$$

There is no cross contribution from the degree-two step at degree three: its first bracket with a noncentral degree-two field is degree four. Thus (3)–(4) test the sequential pullback convention as well as the averaging operator. A sign-reversed pullback would fail (5) rather than merely choose a different notation.

The means of the generators themselves are zero. Their constants and quadratic vectors have zero rotational group mean. Their linear vector matrices are respectively diagonal with zero trace and off-diagonal symmetric with zero trace, so neither has a rotationally invariant linear part. The scalar means of $x$ and $u$ vanish.

## Initial-coordinate and parameter controls

For the time-one coordinate convention, the old coordinate equals the new coordinate plus its generator to first relevant degree. The constant in $P_2$ therefore maps the new center to the original $x=\eta^2/2$ through quadratic order. This agrees with the exact prepared release value $x_0=h_0^2-1=\epsilon^2/2+O(\epsilon^4)$. The constant in $P_3$ maps its velocity center to $u=2g\eta^3$, so release $u_0=0$ becomes a negative new velocity coordinate

$$
u_{\rm new}(0)=-\frac83\epsilon^3+O(\epsilon^4).
\tag{6}
$$

This returns the protected cubic seed rather than introducing a freely chosen phase.

The scalar generator also distinguishes the map's parameter from the previous corrected angular variable. From $p_2=-x$,

$$
\log\delta_{\rm map}
=\log\eta+\eta^2x+O(\eta^3),
\qquad
\log(\epsilon/H)=\log\eta+\eta^2(1+x).
\tag{7}
$$

Their first difference is the constant quadratic kernel term. Therefore a fifth-order coefficient expressed in $\epsilon/H$ cannot be compared directly with a zero-group-mean normal-form coefficient without applying (7). The two coordinates describe the same path; this is not a new preparation or parameter choice.

The known-control output is the full polynomial tuple (3)–(5), together with the initial center and parameter checks (6)–(7). It is stronger than comparing only the scalar means in (2). Its falsifiers are a failed displayed polynomial identity, a nonzero group mean of a generator, or a low-order transformed seed inconsistent with the exact release state. No higher target coefficient, scalar phase, numerical trajectory, physical premise, source-history edit or active process was introduced.
