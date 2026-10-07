# Blind finite autonomous coefficient reference through order sixteen

**Derived reference, frozen before the new construction protocol or higher-coefficient target.** Retain the same amplitude-gradient row and fixed complete preparation. This note specifies finite formal autonomous coefficients and their geometric-angle conversion. It does not supply an actual trajectory, a higher source regularity hypothesis, an averaging map or a terminal phase.

## Receiver gradient and coefficient extraction

Hold the source path fixed and let $q(u)=x+y(s-u)$, $L(u)=|q(u)|$. The implicit positive source-lag parameter satisfies $u=\epsilon L(u)$. Formal change of variables in the residue, or Lagrange coefficient inversion, gives

$$
[\epsilon^n]\frac{f(u)}{1-\epsilon L'(u)}
=\frac1{n!}\left.\partial_u^n[f(u)L(u)^n]\right|_{u=0}.
$$

Taking $f=1/L$ and applying the receiver gradient before setting $x=y(s)$ proves the present-source vector coefficient

$$
C_n=\frac4{n!}\left.\nabla_x\partial_u^n L(u)^{n-1}\right|_{u=0,\ x=y(s)}.
\tag{1}
$$

The gradient includes the root dependence through the already inverted coefficient identity. Setting receiver equal to source before differentiating would give the wrong operation. The first controls are $C_0=-e_r/r^2$ and $C_1=0$.

For a convenient entirely rational form, put $a=1/r$, radial/tangential velocity components $p,t$, and normalized Cartesian source jets $J_m=r^{m-1}y^{(m)}$ in the current polar frame. Let

$$
Q(z)=2e_r+\sum_{m\ge1}\frac{(-z)^m}{m!}J_m.
$$

Differentiating the independent normalized receiver variable first gives

$$
r^2C_n=4(n-1)[z^n]Q(z)[Q(z)\cdot Q(z)]^{(n-3)/2}.
\tag{2}
$$

This also includes $n=0$ and the zero $n=1$ factor. Fractional powers have nonzero constant argument four, so finite binomial expansion has rational coefficients. The alternating signs in $Q$ come from $y(s-u)$ and must be retained. Equation (2) is particularly useful as an independent reference for a constructor based instead on direct gradients or implicit roots.

## Normalized jet recursion and triangular autonomous substitution

Write the finite autonomous field as

$$
F=r^{-2}\sum_{n\ge0}\epsilon^n(f_{n,r}e_r+f_{n,\theta}e_\theta),
\qquad f=\sum\epsilon^nf_n.
$$

For scalar functions of $(a,p,t)$, the normalized time derivative is

$$
\mathscr D=-pa\partial_a+(t^2+af_r)\partial_p+(af_\theta-pt)\partial_t.
$$

For a polar vector $(A,B)$ it acts as $(\mathscr DA-tB,\mathscr DB+tA)$, retaining the rotating frame. Start with $J_1=(p,t)$ and use

$$
J_{m+1}=\mathscr D_{\mathrm{vector}}J_m-(m-1)pJ_m.
\tag{3}
$$

The normalization term is essential: differentiating $r^{m-1}y^{(m)}$ contributes $(m-1)pJ_m/r$. In particular (3) gives $J_2=af$, as it must.

Insert these jets into (2), then collect the total parameter power from both the explicit present-source index and the autonomous jets. Since $C_0$ is independent of acceleration and $C_1=0$, the order-$n$ autonomous field depends only on already determined fields through $n-2$. This makes the finite construction triangular. No degree-$n$ unknown may be solved by silently changing the supplied history.

Assign weights one to $p,t$ and two to $a$. The coefficient of order $n$ in $J_m$ has weight $m+n$; the coefficient $f_n$ has weight $n$. The recursion preserves polynomial dependence on $a,p,t$ and radial reflection parity: $f_{n,r}$ is even in $t$, while $f_{n,\theta}$ is divisible by $t$. There are no negative powers of $a$. These are independently derived structural controls on every emitted order.

## Existing full-row controls

The already independently assessed coefficients give the following normalized exact controls before any new order is used:

$$
f_0=(-1,0),\quad f_1=(0,0),\quad
f_2=(-t^2/2,-pt),\quad f_3=(-8ap/3,4at/3),
$$

$$
f_{4,r}=-3t^4/8+4a(t^2-p^2)-a^2,
\qquad f_{4,\theta}=7apt-3pt^3/2,
$$

$$
f_{5,r}=a(-32p^3+68pt^2)/5+4a^2p/5,
\qquad f_{5,\theta}=a(36p^2t-14t^3)/5+4a^2t/15.
$$

These are full polynomial identities, not a single circular specialization. The circular values $f_{4,r}(1,0,1)=21/8$ and $f_{5,\theta}(1,0,1)=-38/15$ are useful secondary controls. Their autonomous substitutions must remain included; the raw present-source $C_4,C_5$ are different objects.

## Exact geometric-angle conversion

Put $w=h^2/r$, $u=hp$, $\eta=\epsilon/h$, and use the physical geometric angle $\phi$ with $\phi'=h/r^2$. For each monomial $p^jt^{2k}a^\ell$ in $f_{n,r}$, its normalized radial contribution is $\eta^n u^jw^{2k+\ell}$. For each $tp^jt^{2k}a^\ell$ in $f_{n,\theta}$, its normalized angular contribution has that same polynomial form. Denote their respective sums by $G_r(w,u,\eta)=r^2F_r$ and $G_\theta(w,u,\eta)=r^3F_\theta/h^2$. Direct differentiation gives

$$
w_\phi=-u+2wG_\theta,\qquad
u_\phi=w+G_r+uG_\theta,\qquad
\eta_\phi=-\eta G_\theta.
\tag{4}
$$

In (4), $u_\phi$ is the derivative of $u$; the letter denotes the radial scaled coordinate, not a new variable. The central system is $w_\phi=-u$, $u_\phi=w-1$, $\eta_\phi=0$. No division by $w$ remains in these finite fields, including at the limiting parabolic point. Their formal extension there is an algebraic device, not a physical continuation through infinite radius.

A higher-order coefficient inventory can therefore be constructed and checked as exact rational polynomial algebra, subject to known-first controls, explicit degree/parity checks and bounded owned execution. It still requires a separate actual-history remainder and finite averaging/section argument before supporting a phase or terminal claim. Falsifiers are the wrong receiver-gradient order, omission of the normalization term in (3), a hidden same-order autonomous unknown, a negative power of $a$, failed full $F_0$–$F_5$ controls, or a wrong factor of $h$ in (4). No higher-coefficient target or new source preparation was used.
