# Coordinator saddle and scattering reconstruction above radial exponent three

## Fixed case and independence boundary

**Grade: derived candidate, pending reconciliation with a separately authored full proof.** Fix $p>3$, $c=p-1$, $k=p-3>0$, $\kappa=\sqrt{k}$ and $K=R_*=c_f=1$. Use the same exact complete mirror circle-tail preparation and compatibility patch, evaluated at this fixed exponent, with $r_0=(2^p\epsilon^2)^{-1/c}$ and $s=\epsilon T/r_0$. The old circle is prescribed preparation only. The candidate conclusion is global uniformly subfield positive-speed scattering for every sufficiently small positive launch in this family, with

$$
V_\infty=\epsilon\sqrt{\frac{p-3}{p-1}}
+O_p\!\left(\epsilon^2\log(1/\epsilon)\right).
$$

The coordinator derived the saddle selection, outgoing continuation and comparison-scalar route before reading a new full above-three source. A concurrent independent worker then reported matching leading conclusions and a direct moving-saddle coordinate. This note records a separately expanded shifted-coordinate proof and a possible sharper scalar asymptotic; the worker's full subject has not been read during authoring. Constants depend on the fixed exponent, without a uniform limit as $p\downarrow3$ or $p\to\infty$.

## Complete preparation and response estimates

The complete scaled equation is $Y''=-2^pN/(R_d^pD)$, where $s-\sigma=\epsilon R_d$, $R_d=|Y(s)+Y(\sigma)|$ and $D=1+\epsilon N\cdot Y'(\sigma)$. The preparation correction is $B_p\phi_d$ with $d=\epsilon/16$, $\phi_d=(d^2/2)z_p^3(1-z_p)^2$ and

$$
B_p=(1,0)-\frac{(\cos\xi,-\sin\xi)}{\cos^p\xi(1+\epsilon\sin\xi)},
\qquad \xi=\epsilon\cos\xi.
$$

For each fixed $p$, $B_p=O_p(\epsilon)$, the release source $-2\xi$ is before the patch, and its jets preserve position and velocity while correcting acceleration exactly. The complete old history is separated, locally $C^{2,1}$ and uniformly subfield for small $\epsilon$. The exact release data are $r=|Y|=1$, $u=r'=0$, $h=Y\times Y'=1$. A complete strict speed margin gives exactly one partner source and excludes every positive-delay self source. Positive complete past rotation and the causal half-plane argument preserve exact positive torque, hence $h\ge1$.

On a provisional region $r\ge r_{min}>0$, $h\le H_{max}$, $|u|\le U_{max}$, all constants fixed, physical speed is $O_p(\epsilon)$. The complete source interval has length $O_p(\epsilon r)$, source radius ratio $1+O_p(\epsilon)$, and positive transmitter margin. The integrated first-order range and transmitter expansions are

$$
\frac{R_d}{2r}=1-\epsilon u+O_p(\epsilon^2),\qquad
D=1+\epsilon u+O_p(\epsilon^2),\qquad N_r=1+O_p(\epsilon^2).
$$

These follow from first-order position integration with bounded source acceleration, including the old patch; they do not differentiate acceleration. The remainder is uniform at large radius because $r^{1-p}$ is bounded above on this region. The complete angular integral and torque give the relative transverse bound as in the cubic reconstruction. Therefore

$$
A_r=-r^{-p}[1+c\epsilon u+O_p(\epsilon^2)],\qquad
\frac{h'}h=\epsilon r^{-p}[1+O_p(\epsilon)].
$$

The first signed velocity coefficient is needed for local branch selection: a merely unsigned $O(\epsilon)$ radial error would be too large to decide a seed of order $\epsilon$. The transverse factor is retained uniformly through infinite radius.

## A shifted hyperbolic coordinate selects the outward branch

The instantaneous central comparison has saddle radius $r_c(h)=h^{-2/k}$. This radius is not a delayed solution. Put $w=r-r_c(h)$ and $B_0=2/k$. Exact differentiation, using the actual torque, gives

$$
w'=u+\epsilon B,\qquad
B=\frac2k r_c r^{-p}[1+O_p(\epsilon)].
$$

Near $r=h=1$, $B=B_0+O_p(|w|+|h-1|+\epsilon)$. Taylor expansion of the exact polar equation at its central saddle gives

$$
u'=\kappa^2w+E,
$$

$$
|E|\le C_p\left[w^2+|h-1||w|+\epsilon|u|+\epsilon^2\right].
$$

No derivative of the history-dependent errors is taken. Define two shifted coordinates

$$
Z=u+\kappa w+\epsilon B_0,\qquad
W=u-\kappa w+\epsilon B_0.
$$

They begin at $Z=W=\epsilon B_0>0$ and obey

$$
Z'=\kappa Z+E+\kappa\epsilon(B-B_0),\qquad
W'=-\kappa W+E-\kappa\epsilon(B-B_0).
$$

The subtraction of the constant torque drift is exact. In the limiting fixed-time linear equations, $Z=\epsilon B_0e^{\kappa s}$ and $W=\epsilon B_0e^{-\kappa s}$. Consequently

$$
\frac w\epsilon\longrightarrow\frac{2\sinh(\kappa s)}{\kappa^3},\qquad
\frac u\epsilon\longrightarrow\frac{2[\cosh(\kappa s)-1]}{\kappa^2}
$$

on every fixed positive scaled-time interval. The exact release radial acceleration can be inward; its order is $\epsilon^2$ and does not remove this positive order-$\epsilon$ branch selection.

For a complete local proof, choose a fixed small threshold $j>0$ for $Z$ and use the cone $|W|\le2Z$. On $Z\ge c_0\epsilon$, this cone bounds $|u|+|w|$ by $C_p(Z+\epsilon)$. Torque gives $|h-1|\le C_p\epsilon s$ while the local chart holds. For $s\le C\log(1/\epsilon)$ the two remainders are bounded by

$$
C_p(j+\epsilon\log(1/\epsilon))Z+C_p\epsilon^2(1+s).
$$

Choose $j$ and then $\epsilon$ small. This makes $Z'\ge\kappa Z/2>0$ and makes both cone boundary derivatives point inward. The seed floor cannot fail. Thus either $Z=j$ is reached or exponential growth contradicts $Z<j$ within time $O_p(\log(1/\epsilon))$, before the provisional time restriction can fail.

The stable ratio has the differential estimate obtained from $(W/Z)'$; its absolute value is bounded by an exponentially decaying initial term plus $C_pj+o(1)$. At $Z=j$ it is therefore smaller than $1/2$ after reducing $j$ and the launch threshold. It follows that $w$ and $u$ are strictly positive of fixed size at this event. Since $r_c=1+O_p(\epsilon\log(1/\epsilon))$, the actual exit has $r\ge1+d_p$ and $u\ge v_p>0$ for fixed positive constants.

The sharper exit time follows by integrating the logarithmic $Z$ equation. Its nonlinear error contributes $O_p(\int Z,ds)=O_p(j)$ because $Z$ grows at a positive exponential rate. The areal-rate drift contributes $O_p(\epsilon s_b^2)=o(1)$, and the additive error divided by the growing seed integrates to $O_p(\epsilon)$. Thus

$$
s_b=\frac1\kappa\log(1/\epsilon)+O_p(1).
$$

This establishes an actual finite outward transition from the compatible delayed history, rather than stability analysis about a nonexistent delayed circle.

## Outgoing continuation closes without a radius ceiling

After this exit, the exact radial equation gives

$$
u'=r^{-3}\left[h^2-r^{3-p}(1+c\epsilon u+O_p(\epsilon^2))\right].
$$

For $r\ge1+d_p$, $h\ge1$ and bounded $u$, the bracket is strictly positive for sufficiently small $\epsilon$, because $r^{3-p}\le(1+d_p)^{-k}<1$. Thus $u$ cannot drop below its positive exit value and $r$ keeps increasing. Meanwhile

$$
\log\frac{h(s)}{h(s_b)}
\le C_p\epsilon\int_{s_b}^s r^{-p}\,ds
\le\frac{C_p\epsilon}{v_p}\int_{r_b}^\infty r^{-p}\,dr
=O_p(\epsilon).
$$

This closes a fixed upper bound for $h$. Since $A_r<0$, $u'\le h^2/r^3$; integration of $d(u^2)/dr=2u'$ then closes a fixed upper bound for $u$. All provisional bounds can be chosen strictly wider than these estimates. The complete physical speed remains below one, separation stays positive, and every finite source interval remains regular. Ordinary continuation yields a global physical future with $r\to\infty$, positive finite $u_\infty$, and positive finite $h_\infty$. The angle tail is finite because $\int h/r^2,ds\le C_p\int r^{-2}dr/v_p<\infty$.

## Terminal coefficient and total angle

Define the comparison scalar along the actual trajectory

$$
\mathcal E=\frac{u^2}{2}+\frac{h^2}{2r^2}-\frac{r^{1-p}}{p-1}.
$$

It is not conserved. Exact differentiation gives

$$
\mathcal E'=u(A_r+r^{-p})+\frac{hh'}{r^2}.
$$

The uniform response estimates bound its total change by $O_p(\epsilon\log(1/\epsilon))$ before the fixed exit and by $O_p(\epsilon)$ afterward. At release $\mathcal E(0)=k/(2c)$; at infinity the nonkinetic terms vanish. Hence

$$
u_\infty=\sqrt{k/c}+O_p(\epsilon\log(1/\epsilon)),
$$

giving the proposed physical terminal coefficient. A fixed member has $|q(T)|\sim V_\infty T$, and its exact remaining angle is asymptotic to the physical areal-rate limit divided by $V_\infty^2T$.

The local estimates also give $\int_0^{s_b}|r-1|\,ds=O_p(1)$ and $\int_0^{s_b}|h-1|\,ds=o(1)$. Thus

$$
h_\infty=1+\frac\epsilon\kappa\log(1/\epsilon)+O_p(\epsilon),
\qquad
\theta_\infty=\frac1\kappa\log(1/\epsilon)+O_p(1).
$$

These are scaled $h$ and the angle measured from release. The physical areal rate is $\epsilon r_0h$, with its own fixed normalization. Physical transition time is $(r_0/\epsilon)[\kappa^{-1}\log(1/\epsilon)+O_p(1)]$.

A sharper optional scalar consequence is also visible. The signed radial row gives $\mathcal E'=\epsilon r^{-p}(h^2/r^2-cu^2)+O_p(\epsilon^2r^{-p})$. Subtracting $h'=\epsilon h r^{-p}[1+O_p(\epsilon)]$ and integrating uses the same local integrals and the outgoing bounds, yielding

$$
\mathcal E_\infty-\mathcal E(0)-(h_\infty-1)=O_p(\epsilon).
$$

Therefore, if the displayed sharper signed-row integration is independently admitted, it gives

$$
u_\infty=\sqrt{k/c}
+\frac{\epsilon}{\kappa\sqrt{k/c}}\log(1/\epsilon)+O_p(\epsilon).
$$

This refinement is not needed for the positive-speed fate theorem and should be assessed separately rather than silently added to a source that proves only the leading coefficient.

## Limits and falsifiers

The statement fixes an exponent and a complete preparation formula before use. It proves no uniform passage through three, no arbitrary-history fate and no nonmirror stability. The saddle comparison is a mathematical device, not a delayed circular equilibrium or a physical conserved account. The complete one-partner/no-self census follows throughout from the actual uniform speed margin.

Falsifiers are a wrong signed first-order radial coefficient, an omitted complete source interval, loss of the order-$\epsilon$ torque seed, failure of the local shifted cone, a later radial-velocity turn despite the strict outgoing bracket, failure of either integrable tail bound, or an incorrect comparison-scalar derivative. A sufficiently small member with zero terminal speed would contradict the uniformly positive outgoing cone and terminal coefficient. This source is analytical, creates no numerical target and changes no earlier subject, reference, canon or shared owner.
