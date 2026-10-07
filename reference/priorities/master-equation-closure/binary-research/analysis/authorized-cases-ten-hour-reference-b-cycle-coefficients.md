# Blind fourth/fifth coefficient and central-cycle reference

**Derived and independently symbolically checked before access to the associated new B subject.** Retain the same fixed-receiver gradient, autonomous substitution and actual preparation. Put $r=|y|$, $p=r'$, and t equal to the tangential velocity component in this document. The symbol t below is a velocity coordinate, not time.

The present-source coefficient has a convenient finite polynomial expression. For $q(u)=2re_r-vu+\mathcal J_2u^2/2-\mathcal J_3u^3/6+\cdots$, differentiate with respect to the receiver before inserting the jets. Then

$$
\mathcal C_n=4(n-1)[u^n]\{q(u)[q(u)\cdot q(u)]^{(n-3)/2}\}.
$$

The central rotating-frame derivative of a vector $(f_r,f_t)$ is $(\mathcal D_0 f_r-tf_t/r,\mathcal D_0 f_t+tf_r/r)$, with

$$
\mathcal D_0=p\partial_r+(t^2/r-r^{-2})\partial_p-(pt/r)\partial_t.
$$

This supplies the central source jets needed through fifth order. The autonomous corrections are $F_4=\mathcal C_4+PF_2/r$ and $F_5=\mathcal C_5+PF_3/r-(4/3)\mathcal D_0^{\rm vector}F_2$, where P projects onto the tangent. Expanding these finite polynomials gives

$$
F_{4,r}=\frac{-32p^2r-3r^2t^4+32rt^2-8}{8r^4},\qquad
F_{4,t}=\frac{pt(14-3rt^2)}{2r^3},
$$

$$
F_{5,r}=\frac{4p(-8p^2r+17rt^2+1)}{5r^4},\qquad
F_{5,t}=\frac{2t(54p^2r-21rt^2+2)}{15r^4}.
$$

At the unit central circular state these reduce to the previously independently derived radial fourth $21/8$ and tangential fifth $-38/15$. The present-source fifth tangent is instead $-68/15$; omitting autonomous replacement would fail this control.

The separate [symbolic coefficient reference](../evidence/authorized-cases-ten-hour-reference-b-cycle.py) uses a truncated binomial polynomial and the independently written rotating derivative, with no subject imports. Before its general symbolic evaluation it passed the already analytically known circular present-source coefficients at orders two through five and the central jerk formula. The shared venv completed the known run and then the general run in less than one second each. Local receipts `reference/b-cycle-known-v1.json` and `reference/b-cycle-coefficients-v1.json` preserve the outputs. These are formal algebra checks, not a trajectory or physical target.

## Raw angular coordinates

Set $w=h^2/r$, $P=hp$, $d=\epsilon/h$ and $k=(\log h)_\phi$. The fourth and fifth parameter coefficients of k are

$$
k_4=\frac12Pw(14-3w),\qquad
k_5=\frac2{15}w(54P^2-21w^2+2w).
$$

The corresponding coefficients of $r^2F_r$ are

$$
a_4=-4P^2w-\frac38w^4+4w^3-w^2,\qquad
 a_5=\frac45Pw(-8P^2+17w^2+w).
$$

Thus $w_\phi$ has coefficients $2wk_j$ and $P_\phi$ has coefficients $a_j+Pk_j$. These are exact coordinate changes of the finite autonomous row. They do not yet account for deformation of a central cycle under lower-order terms or for variation of d during that cycle.

## Bare central-cycle controls and their limitation

On the fixed central conic $w=1+e\cos\phi$, $P=e\sin\phi$, let angle brackets denote the mean over $2\pi$. Odd sine parity gives $\langle k_4\rangle=0$ and a zero fourth-order mean for $I=(P^2+(w-1)^2)/2$. Direct polynomial integration gives

$$
\langle k_5\rangle=-\frac{38+7e^2}{15},\qquad
\left\langle (I_\phi)_5\right\rangle
=-\frac{e^2(268+7e^2)}{60}.
$$

For the second identity use $(I_\phi)_5=P a_5+[P^2+2w(w-1)]k_5$. The leading cubic controls are $\langle k_3\rangle=4/3$ and $\langle(I_\phi)_3\rangle=2e^2$, giving the known leading ratio $dI/d\log h=3I$.

The [independent moment reference](../evidence/authorized-cases-ten-hour-reference-b-cycle-moments.py) first passed the exact means of one, cosine, cosine squared and cosine fourth. It then reduced the two fifth-order polynomials using $\langle\cos^{2j}\phi\rangle=\binom{2j}{j}/4^j$, producing the displayed means. Its known and result receipts are `reference/b-cycle-moments-known-v1.json` and `reference/b-cycle-moments-v1.json`. Both short shared-venv processes completed; no process remains active.

These bare means are analytical controls, not the fifth-order secular coefficient of the actual prepared member. The reversible quadratic deformation of the orbit, the variation of the raw parameter, changes of the clock/angle and use of corrected H can all combine with the cubic term at the same fifth order. A claimed corrected-cycle coefficient must explicitly include those contributions and its fixed sections. Even their successful reconstruction would not replace the uniform accumulated phase/sensitivity theorem or last-passage account margin. A wrong fixed-gradient order, missing rotating-frame derivative or missing autonomous replacement falsifies the local coefficients; identifying a bare central mean with the full map without those corrections exceeds this reference's scope.
