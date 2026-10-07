# Explicit excluded neighborhoods of two partial-equality boundaries

## Conditional boundary-strip conclusions

**Derived claims pending independent reconstruction and completion of the named boundary reviews:** in the original exact strictly ordered strictly subfield class, normalized by $r_1=1$, the new partial-equality residual margins imply explicit positive distances from the corresponding boundaries. Retain $R=35$ and the independently checked constructive separation floor $\delta$, and set

$$
t_0=\frac\delta4,\qquad d_0=\frac{\delta^2}{512R^2},\qquad
\mu_{\mathrm{in}}=\frac2{585},\qquad
\mu_{\mathrm{out}}=\frac9{320R},
$$

$$
\varepsilon_j=\min\left\{\frac\delta4,\frac{\mu_j d_0^3t_0^2}{212}\right\},
\qquad j\in\{\mathrm{in},\mathrm{out}\}.
$$

Then the proposed necessary conditions are

$$
r_3\ge4\quad\Longrightarrow\quad r_2-1>\varepsilon_{\mathrm{in}},
$$

$$
r_3\ge9\quad\Longrightarrow\quad r_3-r_2>\varepsilon_{\mathrm{out}}.
$$

These are genuine unequal-radius restrictions obtained from partial-equality comparison configurations. They do not exclude the remaining interior domain. Their very small mathematical widths are not estimates of feasible numerical-cover cost. The selected equation and histories remain the coefficient-one logarithmic law with $K_{\log}=c_f=1$, three persistent neutral antipodal pairs, common center, plane and angular rate, and all ordinary positive-delay roots.

## A common complete-root sensitivity estimate

Start with an exact strictly ordered configuration $1<r_2<r_3<R$, separation at least $\delta$, and $\omega r_3<1$. Compare it with a configuration obtained by changing one pair radius by at most $h$, keeping all phases and $\omega$ fixed and interpolating linearly in a parameter $q\in[0,1]$. Suppose every interpolated radius stays in $[1,r_3]$ and $h\le\delta/4$.

Each present point moves by at most $h$. Thus every separation along the comparison is at least $\delta-2h\ge\delta/2$. The complete closed-subfield root theorem gives thirty ordinary partner roots, zero positive self roots, delay $\tau\ge t_0$ and transmitter factor $D\ge d_0$. The histories used for comparison need not satisfy the equation; the geometric root bounds apply to prescribed circles. Both positive lower bounds persist along the entire interpolation.

For completeness, differentiating one row with respect to $q$ gives the same uniform estimate used in the [checked all-equal spread proof](overnight2-c-explicit-spread-independent-review.md). Write the receiving point as $x$, the source path as $y(q,t)$, the causal chord as $p=x-y(q,-\tau)$, its unit direction as $n=p/\tau$, and source velocity as $v_s$. A dot here is a $q$ derivative. At fixed time, both position derivatives have norm at most $h$. Then

$$
D\dot\tau=n\cdot(\partial_qx-\partial_qy),\qquad
|\dot\tau|\le2h/d_0,\qquad
|\dot p|\le4h/d_0,\qquad
|\dot n|\le8h/(d_0t_0).
$$

The source speed is at most one, $\omega\le1$, and its circular acceleration magnitude is at most one. Including the derivative of the emission time in $\dot v_s=\partial_qv_s-\partial_t v_s\dot\tau$ gives $|\dot v_s|\le3h/d_0$. Hence $|\dot D|\le11h/(d_0t_0)$. For a signed logarithmic row $A=\sigma n/(\tau D)$,

$$
|\dot A|\le\frac{21h}{d_0^3t_0^2}.
$$

There are five partner rows at each receiver and no positive self row. The derivative of its required circular term has norm at most $h$. Its local component basis stays fixed because its phase stays fixed. Thus every scalar residual changes by at most

$$
\frac{106h}{d_0^3t_0^2}
$$

over the unit parameter interval. This estimate needs only the radius-displacement, separation and speed bounds, not that all radii move toward one. It therefore applies to each of the following one-pair comparisons. The formulas retain both changing-emission-time terms and the original transmitter factor.

## Approaching equality of the inner radii

Assume $r_3\ge4$ and put $h=r_2-1$. If $h\le\varepsilon_{\mathrm{in}}$, decrease only $r_2$ linearly to one. Every interpolated radius stays in $[1,r_3]$ and every speed stays strictly below one. The comparison endpoint has $r_1=r_2=1$, $r_3\ge4$, distinct positions, and complete roots. The [correlated inner-equal theorem](overnight2-c-inner-equal-tangential-bound.md) gives its maximum absolute residual at least $\mu_{\mathrm{in}}=2/585$.

But the starting residual is zero and the common sensitivity estimate gives endpoint maximum residual at most

$$
\frac{106h}{d_0^3t_0^2}\le\frac{\mu_{\mathrm{in}}}{2},
$$

a contradiction. Therefore $r_2-1>\varepsilon_{\mathrm{in}}$ in this radius sector. The comparison does not change the outer radius or assume that the partially equal endpoint is itself exact.

## Approaching equality of the outer radii

Assume $r_3\ge9$ and put $h=r_3-r_2$. If $h\le\varepsilon_{\mathrm{out}}$, increase only $r_2$ linearly to $r_3$. Although this increases its speed, it never exceeds the original outer speed $\omega r_3<1$. Every interpolated radius is still in $[1,r_3]$, so the same complete-root sensitivity estimate applies.

The endpoint has $r_1=1$, $r_2=r_3=b\ge9$. The [outer-equal theorem](overnight2-c-outer-equal-radius-bound.md), once independently checked, gives maximum residual strictly greater than $9/(320b)$. Since $b=r_3<R$, this is greater than $\mu_{\mathrm{out}}=9/(320R)$. Exactness at the starting point and the sensitivity bound instead make the endpoint maximum residual at most $\mu_{\mathrm{out}}/2$, again a contradiction. Therefore $r_3-r_2>\varepsilon_{\mathrm{out}}$ in this radius sector.

## Evidence scope and falsifiers

The starting radius bound, separation floor and root estimates come from the previously checked original strictly ordered strictly subfield class. The partial-equality exclusions concern arbitrary distinct comparison configurations and supply residual margins, not merely statements of nonexistence. That distinction is needed for a quantitative transfer. The unchanged small positive $\delta$ is used symbolically; no floating evaluation, point search or new numerical instrument is required.

At zero radius displacement the comparison is the identity, giving zero residual change as a hand control of the sensitivity bound. The exact constant $212=2\cdot106$ makes the contradiction strict even at either proposed width. Independent reconstruction must verify that increasing the middle radius in the second comparison does not violate the outer speed bound and that no root is lost on either path.

A failed boundary margin, separation loss, overlooked positive root, wrong emission-time derivative, or exact configuration inside one of the stated forbidden strips would falsify the corresponding conclusion. These conditional strips do not establish a global exclusion, an exact reference, superfield continuation, stability or a practical domain-cover budget. The remaining compact interior and lower-radius partial-equality regions require separate work.
