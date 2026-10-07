# Exact autonomous coefficients for the retained gradient comparison

**Status: method specification, before instrument target use.** This calculation retains the fixed [case](authorized-cases-ten-hour-b-case.md), its original complete compatible history, $\epsilon=2^{-200000}$, and $K=c_f=1$. It constructs the finite autonomous comparison already admitted by the [degree-sixteen value assessment](authorized-cases-ten-hour-reference-b-value-adjudication.md). It supplies coefficients for a proposed finite phase calculation, not a substitute acceleration law or a terminal-speed verdict. The actual original-history layer is separately constructed and checked; no analytic autonomous history is assigned as its past.

## Receiver gradient before source substitution

For a smooth finite comparison path, keep the receiver $x$ independent of the source while differentiating. Let $q(u)=x+y(s-u)$ and $L(u)=|q(u)|$. Its positive delay satisfies $u=\epsilon L(u)$, and the scalar retarded amplitude is $1/[L(u)(1-\epsilon L'(u))]$. Formal Lagrange inversion gives

$$
\frac1{L(u)(1-\epsilon L'(u))}
=\sum_{n\ge0}\frac{\epsilon^n}{n!}\partial_u^n L(u)^{n-1}\big|_{u=0}.
$$

Taking four times the receiver gradient before setting $x=y(s)$ gives the coefficient identity

$$
C_n=\frac{4(n-1)}{n!}\partial_u^n\{L(u)^{n-3}q(u)\}\big|_{u=0}.
\tag{1}
$$

The $n=1$ term is zero. For $n=0$, (1) is the central row. At $n=4,5$ it gives exactly the separately assessed present-source controls $C_4=\tfrac12\partial_u^4(Lq)$ and $C_5=\tfrac2{15}\partial_u^5((q\cdot q)q)$ in the [fifth-order calculation](authorized-cases-ten-hour-b-fifth-order-cycle.md). Formula (1) is a finite formal identity; it asserts no higher derivatives of the actual prepared history.

## Polynomial jet construction

Write $a=1/r$, $p=r'$ and $t=h/r$, where $t$ here is the tangential speed. Let the finite comparison acceleration be $r^{-2}(P,Q)$ in the rotating polar frame, with coefficients in $\mathbb Q[a,p,t][[\epsilon]]$. Set $Z_m=r^{m-1}y^{(m)}$ and $J(P,Q)=(-Q,P)$. Then

$$
Z_1=(p,t),\quad Z_2=a(P,Q),\quad
Z_{m+1}=\mathcal D Z_m+tJZ_m-(m-1)pZ_m,
$$

$$
\mathcal D=-pa\partial_a+(t^2+aP)\partial_p+(-pt+aQ)\partial_t.
\tag{2}
$$

These are exact polar differentiation identities. For the central field they reproduce the explicit second through fifth Cartesian jets in the fifth-order control before use on a target coefficient.

Introduce an auxiliary $z$ and

$$
q_*(z)=2e_r+\sum_{m\ge1}\frac{(-z)^m}{m!}\epsilon^m Z_m.
$$

For a requested total parameter degree $N$, every series is truncated at degree $N$. Formula (1) becomes the finite algebraic update

$$
(P_N,Q_N)=\sum_{k=2}^N4(k-1)\,[\epsilon^N z^k]\,
(q_*\cdot q_*)^{(k-3)/2}q_*.
\tag{3}
$$

Here $P_0=-1,Q_0=0$ and $P_1=Q_1=0$ are fixed. The constant squared range is four, so generalized binomial coefficients in (3) are rational. An autonomous change first enters the response at two additional parameter powers; already admitted triangularity therefore lets degree $N$ use only lower field coefficients through $N-2$. This is the same finite field as the eight substitutions in the accepted value theorem, evaluated degree by degree. A wrong receiver-gradient order or a missing polar-frame term would change the field and invalidate the calculation.

The output will retain every rational monomial of $P_N,Q_N$ through $N=16$. A separate conversion sends a radial monomial $a^\ell p^j t^{2k}$ to $w^{\ell+2k}u^j$, and a tangential monomial $a^\ell p^jt^{2k+1}$ to $w^{\ell+2k}u^j$, using $w=h^2/r$, $u=hp$, $\eta=\epsilon/h$. If $A_n,B_n$ denote those converted polynomials, the degree-$n$ angle rows are $(2wB_n,uB_n+A_n)$ and logarithmic parameter row $-B_n$, added to the central field $(-u,w-1,0)$. This follows from the exact polar equations and retains the factor of $w$ in the first component. It supplies no final normal-form or phase estimate by itself.

## Known controls and owned execution

Before any degree-six or higher target, a frozen instrument must pass exact polynomial arithmetic, differentiation and binomial controls; the central Cartesian jets; and the full independently assessed $F_0$ through $F_5$. The control compares all monomials, not one circular evaluation. It also checks the full quadratic and cubic angle rows in the [map controls](authorized-cases-ten-hour-b-map-known-controls.md). Their independent assessment remains distinct from this producer consistency check.

The target mode requires a successful known receipt carrying the same source digest. It checks homogeneity, reflection parity, central and first-degree identities, and preserves an output checkpoint for each completed coefficient. Those checks do not replace a separately authored reference. No coefficient is used for actual terminal-branch selection before independent checking and the remaining phase/remainder/section admission.

The coordinator owns execution through the repository owned-compute supervisor, with a finite internal deadline earlier than its supervisor deadline, advancing stage heartbeats, a 2 GiB resident-memory bound and a 32 MiB output bound. Bulk results stay under the matching ignored binary geometry owner. An incomplete bounded run records its last exact coefficient and the unmet obligation; it is neither a physical event nor an excuse to change the fixed member. No production solver, long actual trajectory, generated rewrite or publication is selected.

Falsifiers are failure of (1)'s receiver-gradient identity, a wrong source jet in (2), disagreement with any full low-order control, dependence of degree $N$ on its own unknown coefficient, a failed polynomial grading or reflection identity, or disagreement with the independent reference. Even complete coefficient agreement establishes only the finite comparison field; the original-history error and terminal fate require their separate proofs.
