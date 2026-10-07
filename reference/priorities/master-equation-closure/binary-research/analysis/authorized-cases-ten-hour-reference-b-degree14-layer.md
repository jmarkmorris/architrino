# Blind reference for a finite degree-fourteen preparation layer

**Derived reference, frozen before the proposed higher-coefficient subject or target.** Retain the original compatible degree-five recent polynomial, fixed smooth older cutoff, exact selected amplitude-gradient row and $\epsilon=2^{-200000}$. The question is a finite expansion on $0\le\sigma\le200$, not a smoother past, a terminal phase classification or a global analytic actual trajectory. The original compatibility germ and the independently accepted first layer kernel are premises.

## Scaled equation and triangular construction

Put $Y(\sigma;\epsilon)=y(\epsilon\sigma;\epsilon)$, $q=\sigma-L$, $L=|Y(\sigma)+Y(q)|$, $n=[Y(\sigma)+Y(q)]/L$ and $D=1+n\cdot Y_\sigma(q)$. The unchanged equation becomes

$$
Y_{\sigma\sigma}=-\frac{4\epsilon^2}{L^2D^3}
\left[(1-|Y_\sigma(q)|^2)n+D Y_\sigma(q)
-Ln(n\cdot Y_{\sigma\sigma}(q))\right]. \tag{1}
$$

Its delayed-acceleration coefficient is $4\epsilon^2nn^{\mathsf T}/(LD^3)$, of order $\epsilon^2$. All numerical wake-speed units remain one.

Seek $Y^{[14]}=\sum_{k=0}^{14}\epsilon^kY_k(\sigma)$. The original past coefficients are obtained from

$$
e_1+\epsilon\sigma h_0(\epsilon)e_2+
\sum_{m=2}^5\frac{\epsilon^m\sigma^m}{m!}J_m(\epsilon),
$$

using the original analytic compatibility branch. They are polynomials in negative $\sigma$ of degree at most five. No missing sixth-degree monomial may be supplied. At positive $\sigma$, the coefficient of degree $k$ on the left is $Y_k''$, while the right side requires only degree $k-2$ in its bracket and rational factors. Those use already constructed $Y_j$, $j\le k-2$, including their delayed acceleration. Thus the parameter-order recurrence is triangular. Integrate each resulting coefficient twice with the exact release coefficients: $Y_0(0)=e_1$, $Y_k(0)=0$ for $k>0$, and $Y_k'(0)$ equal to the coefficient of degree $k$ in $\epsilon h_0e_2$. The four compatibility traces must agree with the original past jets; they are checks on the same germ, not four new free data choices.

The required low controls are

$$
Y_0=e_1,\quad Y_1=\sigma e_2,\quad
Y_2=-\frac{\sigma^2}{2}e_1,\quad
Y_3=\left(\frac\sigma4-\frac{\sigma^3}6\right)e_2.
$$

They hold on both sides of release. Direct norm expansion gives $L_0=2$, $L_1=0$ and $L_2=-1$: the radial degree-two chord term is $-\sigma^2+2\sigma-2$, and the squared tangential degree-one term contributes $(\sigma-1)^2$. In particular the source-argument perturbation $L-2$ begins at order two, not order one.

## Which argument derivatives are actually licensed

Write $A_k=Y_k''$. In a source-acceleration expansion

$$
\epsilon^2\epsilon^k A_k(\sigma-2-[L-2]),
$$

an argument derivative of order $m$ can first occur at parameter degree $k+2+2m$. Through degree fourteen only derivatives with $k+2+2m\le14$ are required. Polynomial low coefficients may be differentiated freely. The first genuine release seam occurs in $Y_6$: its missing past sixth jet creates a fourth-degree truncated-power term in $A_6$, so $A_6\in C^{3,1}$ across that seam. The maximum requested derivative is $A_6^{(3)}$, which is continuous and Lipschitz. A fourth derivative is bounded almost everywhere and is used only for the uniform Taylor remainder; no fifth derivative or delta distribution is required.

The first propagated contribution enters $A_8$ at nominal source-clearance coordinate two. Later clock corrections shift this seam and make its parameter coefficients less smooth at the fixed nominal knot. It is therefore incorrect to assign $C^{5,1}$ regularity to every coefficient of the expansion. Safe coefficient regularities and maximal required derivatives are:

| Source acceleration coefficient | Sufficient regularity at its earliest relevant knots | Largest argument derivative needed in degree fourteen |
| --- | --- | --- |
| $A_6,A_7$ | $C^{3,1}$ | $3,2$ respectively |
| $A_8,A_9$ | $C^{3,1}$ | $2,1$ respectively |
| $A_{10},A_{11}$ | $C^{2,1}$ | $1,0$ respectively |
| $A_{12}$ | $C^{1,1}$ | $0$ |

Coefficients $A_{13},A_{14}$ do not feed the source-acceleration term through degree fourteen. The resulting receiving $A_{14}$ can be only $C^{0,1}$ at a moving-seam expansion knot. Repeated propagation at nominal knots $2,4,6,8$ does not lower these safe bounds: each neutral transmission spends two parameter degrees, while each source-argument derivative spends at least another two. Further nominal seams on the fixed interval do not appear at this degree unless a retained lower-order coefficient can generate them.

The source-position and source-velocity argument derivatives have respectively two and one more ordinary derivatives than $A_k$, and satisfy the same or a weaker parameter budget. The implicit clock expansion also uses these channels and must retain $L_1=0$. A tool that differentiates a fixed-knot formula beyond this budget can produce artificial singular distributions even though the actual path remains $C^{5,1}$.

The proper uniform Taylor rule is for piecewise-polynomial or truncated-power functions with the stated Lipschitz highest derivative. For example the third-order expansion of $A_6$ has remainder bounded by a constant times $|L-2|^4$, even across its knot. After its parameter weights, that error begins at degree sixteen. The corresponding first omitted shift terms for $A_8,A_{10},A_{12}$ also begin at degree sixteen. Hence an order-fifteen scaled residual does not require an unsupported derivative across any of these seams. It is unnecessary, and generally wrong, to claim that the actual path is analytic in the parameter through every moving seam. One verifies the finite comparison's value residual directly.

## Independent layer check at degree eight

Against the finite autonomous comparison with the same release values, the first scaled acceleration defect is degree eight, with the previously frozen kernel

$$
K(\sigma)=\frac{(\sigma-2)^4[(\sigma-2)^2+12(\sigma-2)+60]}{720}
\quad(0\le\sigma\le2),
$$

and zero afterward at this leading order. Thus the degree-eight scaled velocity coefficient differs by $8e_1/21$ after clearance, while the degree-eight position coefficient differs by $[(8/21)\sigma-2/15]e_1$. Dividing scaled velocity by $\epsilon$ recovers the independent physical velocity kick $(8/21)\epsilon^7e_1$. The compatible-jet leading differences $(8\epsilon^6/9,-8\epsilon^5/5,2\epsilon^4,-4\epsilon^3/3)e_1$ must also be recovered from the original past. These controls distinguish the fixed preparation from a substituted autonomous past.

## What a degree-fifteen residual can prove

Suppose the finite comparison satisfies a uniform scaled-row residual bound $C_R\epsilon^{15}$ on the whole declared interval, with a complete implicit-clock enclosure, and that its supplied position, scaled velocity and acceleration differ from the original polynomial by at most $C_P\epsilon^{15}$ on the full sampled negative interval. Its release scaled velocity error is likewise order fifteen, because the next omitted term of $\epsilon h_0$ has that degree. Every constant must be supplied explicitly before numerical admission.

For the actual/comparison difference on the fixed length-200 scaled interval, integrate the acceleration difference twice. The exact rational row on its strict $L,D$ box is Lipschitz in position, scaled velocity and scaled acceleration, multiplied by $\epsilon^2$. Clock transport uses bounded Lipschitz acceleration; the finite comparison has this regularity despite its fixed-knot coefficient seams. The actual $C^{5,1}$ path has it as well. Thus the acceleration supremum satisfies a value inequality of the form

$$
S\le C_R\epsilon^{15}+C_0C_P\epsilon^{15}
+C_1\epsilon^2(1+200+200^2)S.
$$

Once the last coefficient is strictly below one, this gives scaled acceleration, velocity and position errors of order fifteen, with displayed finite constants after integration. In original dimensionless time, physical velocity is $Y_\sigma/\epsilon$, so the position/velocity state error is order fourteen (position itself is order fifteen). This conversion is legitimate and needs no higher actual source smoothness. It is not automatic from a formal series: missing complete source coverage, uncontrolled implicit clocks, absent residual constants or failure of the neutral contraction would block it. The physical acceleration error would have a further $\epsilon^{-2}$ conversion and must not be mislabeled as order fourteen.

This finite layer does not by itself settle the amplified late near-parabolic phase. No higher-coefficient target was run, and no reference or original history was changed. Falsifiers are an omitted compatibility coefficient, a spurious order-one clock shift, a requested source derivative exceeding the table's budget, or a residual-to-state estimate that drops a velocity/time scaling factor.
