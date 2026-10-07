# An explicit separation bound for exact subfield three-binary circles

## Statement and purpose

Claim grade: derived, pending independent reconstruction. Use the same complete circular six-member histories, three neutral antipodal unit-polarity pairs, common center and plane, $K_{\log}=c_f=1$, unchanged transmitter factor, minimum radius one and maximum radius at most $R\ge1$, with distinct simultaneous member positions (as guaranteed by C's strictly ordered pair radii). Require positive angular rate $u>0$ and strictly subfield speeds $u r_a<1$. All thirty partner roots are included and there are no positive self roots.

Define the positive constants

$$
M=1+768R^2,\qquad
\eta=\frac{1}{448R^2(760M)^3},
$$

$$
\delta=\min\left\{\eta,\frac{1}{1792R^2\left(1+1024R^2/\eta^3\right)^3}\right\}.
$$

Every exact circular configuration in this class has every simultaneous distinct-member separation at least $\delta$. Taking $R=35$ gives an explicit rational bound for the selected ordered-radius class. The estimate is deliberately very small. It supplies a constructive boundary restriction, not a practical full-domain numerical exclusion, an exact reference or a stability result.

The proof combines the [explicit closed-subfield root bounds](overnight2-c-closed-subfield-root-bound.md) with a uniform inverse estimate and a phase-sector sign argument. Both the new ingredients and the composition require independent reconstruction before this statement is counted as checked evidence.

## A response inverse bound for every strictly subfield receiver

At a fixed receiver $x$, let $v=uJx$ be its velocity, $q=|v|<1$, and let $k$ denote an unsigned circular response vector. The [exact inverse formula](overnight2-c-uniform-subfield-separation.md#exact-inverse-of-an-unsigned-circular-response) is

$$
n=\frac{k}{|k|},\quad D=1-n\cdot v,\quad
\tau=\frac1{|k|-v\cdot k},\quad
Y(k)=R(u\tau)(x-\tau n),
$$

$$
DY=\tau^2R(u\tau)\left[(n-v+u\tau Jn)(n-v)^{\mathsf T}-D(I-nn^{\mathsf T})\right].
$$

The inverse is defined for every nonzero $k$. In the following estimates it is not necessary that the reconstructed source $Y(k)$ remain subfield. Assume only $0<u\tau\le2$, and put

$$
\bar v=\frac{x-R(-u\tau)x}{\tau},\quad
L=|n-\bar v|=\frac{|Y(k)-x|}{\tau},\quad d=\tau L.
$$

The elementary bound $1-\operatorname{sinc}(s)\ge s^2/7$ on $0\le s\le1$ gives

$$
L\ge1-q+\frac{q u^2\tau^2}{28},\qquad L\le2.
$$

Also $|v-\bar v|\le u q\tau/2\le u\tau/2$, and hence

$$
D\le L^2+\frac{u^2\tau^2}{4}+(1-q),\qquad
\|DY\|\le\tau^2(3D+u\tau\sqrt{2D}).
$$

If $q\ge1/2$, then $u^2\tau^2\le56L$ and $1-q\le L$, so $D\le17L$. Furthermore $d\ge u^2\tau^3/56$. Therefore

$$
\|DY\|\le51\tau d+\sqrt{34}\,u\tau^{5/2}\sqrt d
\le(51+\sqrt{1904})\tau d<95\tau d.
$$

If $q<1/2$, then $L>1/2$ and $D\le1+q<3/2<3L$. Since $u\tau\le2$,

$$
\|DY\|\le\tau^2(9L+2\sqrt{6L})<16\tau^2L<95\tau d.
$$

Indeed $2\sqrt{6L}/L\le\sqrt{48}<7$ when $L\ge1/2$. Thus the common bound $\|DY\|\le95\tau d$ holds uniformly for every receiver speed below one on this entire inverse domain.

Suppose two actual rows at one receiver obey $|k_2-k_1|\le M$ and have first delay $\tau_1\le1/(760M)$. The radius-one normalization implies $u\le1$, while $M\ge1$. Along $k(t)=k_1+t(k_2-k_1)$, the two-Lipschitz function $|k|-v\cdot k$ remains at least $1/(2\tau_1)$. The segment avoids zero, its delays satisfy $\tau(t)\le2\tau_1$, and $u\tau(t)<2$. Therefore the preceding estimate holds at every segment point, and integration gives

$$
|Y(k_2)-Y(k_1)|\le|Y(k_1)-x|\left(e^{190M\tau_1}-1\right)
<\frac13|Y(k_1)-x|.
$$

For the strict last inequality, $190M\tau_1\le1/4$ and $\log(4/3)=\int_1^{4/3}dt/t>1/4$. No comparable-separation assumption or subfield condition on intermediate reconstructed sources has been used.

## A same-polarity phase sector is excluded

Suppose one member of each antipodal pair has the same polarity and all three of these endpoints have unwrapped phases in an interval of width $W<\pi-2$. Choose the endpoint with the largest phase as receiver and, by global polarity reversal if necessary, take these three members to have positive polarity. For another positive endpoint write its phase difference as $-\alpha$, where $0\le\alpha\le W$. At its partner root the delayed angle is $-\alpha-u\tau$. Since $0<u\tau\le2$ and $W+2<\pi$, its unsigned tangential numerator is positive. Its polarity product is positive as well.

For the negative antipode of that source, including the receiver's own antipode with $\alpha=0$, the delayed angle is $\pi-\alpha-u\tau\in(0,\pi)$. Its unsigned tangential numerator is negative, but its polarity product is negative, so its received tangential row is positive. All source factors and delays are positive. Every one of this receiver's five partner tangential contributions is therefore strictly positive. There is no positive self root, and circular motion requires zero tangential acceleration. Exact balance is impossible in this sector.

This sign exclusion is independent of the radial spacing and holds throughout the declared strictly subfield domain. It is a bounded phase-sector exclusion, not a universal sign assertion for arbitrary phases or a superfield claim.

## Splitting a hypothetical closest pair

Suppose an exact configuration has closest distinct-member distance $d<\delta$, attained at receiver $i$ and partner $j$. Since $\delta\le\eta<1/8$, these cannot be antipodes. If all four other partners of $i$ are at distance at least $\eta$, the [isolated-pair bound](overnight2-c-closed-subfield-root-bound.md#a-uniform-upper-delay-bound-and-an-isolated-pair-restriction) gives

$$
d\ge\frac{1}{1792R^2(1+1024R^2/\eta^3)^3}\ge\delta,
$$

a contradiction. Hence there is a third member $k$ with $|x_i-x_k|<\eta$. It belongs to the remaining antipodal pair: the antipodes of $i$ and $j$ are at distance at least $2$ and $2-d>1$ from $i$. The three selected members contain exactly one endpoint of each pair; every internal separation is below $2\eta$.

Each member of this three-member set is at least $2-2\eta>1$ from each of the three outside antipodes. For example, $|x_p+x_q|\ge2|x_p|-|x_p-x_q|\ge2-2\eta$. The explicit row bound therefore bounds every outside received row by $256R^2$. The required circular acceleration has magnitude at most one. At each receiver, the difference between its required acceleration and its complete outside sum has norm at most $M=1+768R^2$.

If the cluster polarities are mixed, its two majority receivers each have one positive and one negative internal row. Thus each supplies a difference of two unsigned internal rows of norm at most $M$. Every internal delay obeys

$$
\tau\le(224R^2\cdot2\eta)^{1/3}=\frac1{760M}.
$$

Apply the inverse estimate at the two majority receivers. If these are $i',j'$ and the minority member is $k'$, it gives

$$
|x_{j'}-x_{k'}|<\frac13|x_{i'}-x_{j'}|,\qquad
|x_{i'}-x_{k'}|<\frac13|x_{i'}-x_{j'}|.
$$

The triangle inequality contradicts these two inequalities. The notation $i',j',k'$ allows for any polarity arrangement within the selected triple; it need not preserve the closest-pair labels.

If all three polarities agree, use the phase-sector exclusion. For two vectors of radii at least one and shortest angular separation $\theta\in[0,\pi]$, their distance is at least $2\sin(\theta/2)\ge2\theta/\pi$, so $\theta\le\pi d/2$. Both selected partners of $i$ are at distance below $\eta$ from it. Their phases therefore admit representatives within $\pi\eta/2$ of its phase. All three phases lie in an interval of width at most $\pi\eta<\pi/8<\pi-2$. The last inequality follows already from $\pi>3$. Their exact balance is impossible by the preceding sign theorem.

Both polarity cases contradict exactness. Therefore no exact configuration can have $d<\delta$, establishing the displayed explicit lower bound.

## Evidence boundary and falsifiers

This is an analytic proof assembled from exact circular geometry and inequalities. It contains no floating candidate, parameter fitting or numerical target evaluation. The finite $R=35$ choice uses the previous subfield radius theorem only within its proven scope. The explicit constant may be too small to help a numerical cover; no empirical computational-cost conclusion is made from its formula.

Independent reconstruction must check the two receiver-speed cases in the global inverse estimate, the full response segment, the sign of all five phase-sector rows, the closest-pair split, outside-antipode distances, polarity relabeling and the nesting of $\eta$ and $\delta$. Failure of any of these steps, a missed causal root, or an exact configuration below the stated separation floor would falsify this result. The next deciding task after verification is to assess whether a much stronger bound is obtainable on an already selected finite chart; the existence of this explicit floor alone does not authorize an enlarged subdivision run.
