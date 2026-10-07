# A finite-speed open neighborhood with positive axial work

## Proposed quantitative consequence

Claim grade: derived, pending acceptance of the [midpoint axial-work identity](overnight2-b-midpoint-axial-work.md) and independent reconstruction of the perturbation bounds below. The canonical scenario remains $K=c_f=1$ with every ordinary positive-delay partner/self root.

Use normalized time $\tau=t/R$ and the reference paths
$$
x_j(\tau)=\bigl(\cos[0.2\tau+j\pi/3],\sin[0.2\tau+j\pi/3],(-1)^jH\cos(0.15\tau)\bigr),\qquad H\in[0.8,0.85].
$$
Let $y_j$ be any complete $C^2$ paths in the same six-member periodic radius/phase/height class, with the same mean rate $\beta=0.2$ and phase rate $\kappa=0.15$. Do not require reflection symmetry or finite Fourier degree for their profiles. Assume, for every real normalized time and all six members,
$$
|y_j-x_j|\le\epsilon,\qquad |y_j'-x_j'|\le\epsilon,
\qquad \epsilon=10^{-4},
$$
where primes in this document denote derivatives with respect to $\tau$. These are Euclidean vector norms. The reference height $H$ may be any one value in the stated interval for each history; it does not vary in time. The physical paths are $Ry_j(t/R)$, so $y_j'$ is physical velocity.

Then the proposed uniform conclusion is
$$
\left\langle V_{y,z}A_{y,z}\right\rangle>\frac1{2500}>0.
$$
Exact canonical balance would require this axial mean to vanish, because the height velocity and acceleration are periodic. Thus the entire stated open-neighborhood region is excluded at all positive $R$. The nonstrict distance bounds are permitted; the final sign is strict. This is a functional neighborhood in complete paths and velocities, not a sampled closeness test. The fixed rates are essential to the uniform comparison; histories with drifting mean or phase rates are not automatically covered.

## Common complete-past chart

The reference physical speed squared is at most
$$
0.2^2+(0.15\cdot0.85)^2=0.05625625<0.24^2.
$$
Consequently the perturbed speed is below $0.2401<1/4$. Set $v_*=1/4$ and $q_*=1-v_*=3/4$. Reference present-time partner distances are at least one, so perturbed distances are at least $1-2\epsilon=0.9998$. The radius remains positive by its distance from the unit-radius reference.

Reference positions have norm at most $\sqrt{1+0.85^2}<1.313$, since $1.313^2=1.723969>1.7225$. Perturbed positions have norm below $1.3131$, so their full diameter is below $2.6262<2.63$. The complete-past below-wake-speed argument therefore gives exactly five partner roots, no positive self roots, and positive divisors for both histories. Uniformly,
$$
d_-=0.79<\Delta_j<2.63=d_+,\qquad
q_*<D_j<1+v_*=5/4.
$$
Indeed $0.9998/(5/4)=0.79984>0.79$ gives the lower root bound. These estimates cover every phase and the entire ancient-delay complement.

The reference source velocity is Lipschitz in normalized time with constant $1/20$, because
$$
|x_j''|^2\le0.2^4+(0.15^2\cdot0.85)^2
=0.001965765625<0.05^2.
$$
No bound on the perturbed second derivative is needed for the comparison below; only its assumed existence and the stated uniform velocity closeness are used.

## Reference axial-work margin

The reference has even constant radius, zero odd phase correction and cosine height. The midpoint theorem applies because $\kappa d_+<0.4<1$. Its quantitative bound gives
$$
\langle V_{x,z}A_{x,z}\rangle
\ge\frac{5\kappa^2H^2}{2d_+^2(1+v_*)}
\left[1-\frac{(\kappa d_+)^2}{6}\right].
$$
Use $H\ge4/5$, $\kappa=3/20$, $d_+^2<7$ and $1+v_*=5/4$. Since $(\kappa d_+)^2<4/25$, the bracket exceeds $73/75$. Thus
$$
\langle V_{x,z}A_{x,z}\rangle
>\frac9{125}\frac2{35}\frac{73}{75}
=\frac{1314}{328125}>\frac1{250}.
$$
The last comparison has positive cross-product difference $1314\cdot250-328125=375$. This is an exact analytic mean margin over the full reference height interval.

## Root and divisor perturbations

Fix receiver time and source index. Denote the two roots by $\Delta_y,\Delta_x$. At the same trial delay, the separation vectors differ by at most $2\epsilon$, hence so do their lengths. The perturbed gap has absolute descending slope at least $q_*$. Evaluating it at the reference root gives
$$
|\Delta_y-\Delta_x|\le b:=\frac{2\epsilon}{q_*}=\frac1{3750}.
$$
At their respective roots, the separation-vector difference is at most
$$
|Q_y-Q_x|\le2\epsilon+v_*b=b.
$$
For unit directions $n_y=Q_y/\Delta_y$, $n_x=Q_x/\Delta_x$, normalization gives $|n_y-n_x|\le2b/d_-$. Source velocities evaluated at their respective delays differ by at most $\epsilon+b/20$: use uniform velocity closeness at one time and the reference acceleration bound to account for the shifted source time. Therefore
$$
|D_y-D_x|\le\frac{2v_*b}{d_-}+\epsilon+\frac b{20}<\frac3{10000}.
$$
For an explicit comparison, $d_->3/4$ makes the right side before the final bound less than $(2/3)b+\epsilon+b/20=131/450000<3/10000$.

## Acceleration-kernel and work perturbations

For one ordinary hit, write the unsigned vector kernel as $K=n/(\Delta^2D)$. The polarity factor has absolute value one. The lower root/divisor bounds and the mean-value estimate for $s^{-2}$ give
$$
|K_y-K_x|
\le\frac{4b}{d_-^3q_*}
+\frac{|D_y-D_x|}{d_-^2q_*^2}.
$$
The first two contributions are respectively the unit-direction change and inverse-square delay change; each is bounded by $2b/(d_-^3q_*)$. The final contribution is the inverse-divisor change. This estimate uses full vectors, so it also bounds their axial components.

Since $d_-^2>3/5$, $d_-^3>49/100$, and $q_*=3/4$,
$$
|K_y-K_x|<\frac{32}{11025}+\frac1{1125}<\frac{19}{5000}.
$$
Summing all five partners gives $|A_{y,z}-A_{x,z}|<19/1000$. The complete reference sum has magnitude at most
$$
|A_{x,z}|\le|A_x|\le\frac5{d_-^2q_*}<\frac{100}{9}.
$$
The perturbed axial velocity obeys $|V_{y,z}|\le0.15(0.85)+\epsilon=0.1276<16/125$, and its difference from the reference is at most $\epsilon$. Hence, pointwise in phase,
$$
|V_{y,z}A_{y,z}-V_{x,z}A_{x,z}|
\le|V_{y,z}|\,|A_{y,z}-A_{x,z}|+|V_{y,z}-V_{x,z}|\,|A_{x,z}|
<\frac{304}{125000}+\frac1{900}<\frac9{2500}.
$$
Averaging preserves this bound. Subtract it from the strict reference margin to obtain
$$
\langle V_{y,z}A_{y,z}\rangle
>\frac1{250}-\frac9{2500}=\frac1{2500}.
$$
This proves the proposed exclusion, conditional only on the independent acceptance of the midpoint identity and these explicit comparison steps.

## Scope, falsifiers and preservation

The conclusion covers arbitrary smooth perturbations satisfying the uniform complete-history position and velocity bounds, including parity-breaking profiles and infinite Fourier tails. It does not assert that every coefficient box with coordinates of size $10^{-4}$ lies inside this vector-norm neighborhood; translating coefficient bounds into these norms is a separate calculation. Nor does it classify a numerical path from finitely many samples. The ongoing interval work enclosure concerns a different, explicitly parameterized box and varying rates.

A wrong midpoint identity, invalid root perturbation inequality, source/receiver velocity confusion, missing root, wrong normalization of $x_j''$, or incorrect rational comparison would defeat the corresponding result. Any exact canonical history meeting all stated uniform bounds would falsify the final positive mean. This is a fixed finite-speed claim, not a limiting approximation, and it relies on the unchanged transmitter weighting.

No numerical instrument or target was required. The subject and midpoint proof await independent reconstruction. Previous evidence remains unchanged; the receiving account is the second-allocation B report.
