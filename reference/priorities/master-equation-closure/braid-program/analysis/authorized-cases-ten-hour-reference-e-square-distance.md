# Independent instantaneous square-distance reference

**Derived, frozen before the coordinator's square-distance subject.** Let four labeled positions be $x_0,x_1,x_2,x_3\in\mathbb R^3$. The comparison orbit consists of translations and proper rotations of $(r_*e_1,r_*e_2,-r_*e_1,-r_*e_2)$, with the labels fixed and $r_*>0$ fixed. This is an instantaneous configuration distance, not a history norm or a stability conclusion.

Put $\bar x=(x_0+x_1+x_2+x_3)/4$, $A=(x_0-x_2)/2$, $B=(x_1-x_3)/2$ and $C=(x_0+x_2-x_1-x_3)/4$. The exact least root-mean-square distance is

$$
d_{\rm rms}^2=|C|^2+\frac{|A|^2+|B|^2}{2}+r_*^2-r_*\sqrt{|A|^2+|B|^2+2|A\times B|}.
$$

Indeed the optimal translation is $\bar x$. Expanding the remaining four squared distances reduces the orientation problem to maximizing $A\cdot u+B\cdot v$ over orthonormal $u,v$. This maximum is the sum of the two singular values of the three-by-two matrix $[A\ B]$. Its square equals $|A|^2+|B|^2+2|A\times B|$. A proper three-dimensional rotation always realizes the optimal two-frame by choosing its third column as $u\times v$; no reflection penalty is required, including rank-one and rank-zero cases by continuity.

If each position changes by Euclidean error at most $e$, the configuration RMS error is at most $e$. Distance to a fixed set is one-Lipschitz in that norm, hence $|d_{\rm rms}(x)-d_{\rm rms}(\widetilde x)|\le e$. The minimum maximum-member distance is at least $d_{\rm rms}$. Thus a rigorous trial RMS lower bound minus the actual maximum-position error lower-bounds actual maximum distance to the exact square orbit.

For the exact prescribed initial circle of radius $r$ with only member zero displaced by $b$, choose the comparison translation $b/2$ and the original orientation. Each error then has norm at most $|b|/2+|r-r_*|$. This is a rigorous maximum-distance upper bound; it is smaller than using no translation. Here $b=\epsilon r(1,0.7,1.3)$, so $|b|=\epsilon r\sqrt{3.18}$. A radius interval contributes the maximum of $|r-r_*|$ over that interval. This is an explicit available comparison, not a claim that it is the optimal maximum fit.

Analytical controls precede any target use. An exact translated/rotated labeled square gives zero. If $r_*=r$ and the sole displacement is $b=d e_1$ with $d\ge0$, then the optimal RMS fit has $d_{\rm rms}=\sqrt3\,d/4$; direct centering gives errors $(3d/4,-d/4,-d/4,-d/4)$ along $e_1$, and the unchanged orientation maximizes the diagonal two-frame expression. Four coincident points give $d_{\rm rms}=r_*$. Uniform scaling of an exact square gives $|r-r_*|$. A deliberately permuted noncyclic labeling need not fit, because relabeling is excluded.

For directed evaluation, cancellation in the squared-distance formula requires interval arithmetic and a lower truncation at zero; it must never be evaluated as a signed floating square root. If the certified radius is an interval, bound the expression over the entire interval, or use the independent Lipschitz estimate $|d_{\rm rms}(r_1)-d_{\rm rms}(r_2)|\le|r_1-r_2|$. Falsifiers include a missing factor of two, silently optimizing labels, allowing scale variation instead of the fixed radius, or treating RMS distance as an upper bound on maximum-member distance. No target has been evaluated and no process was launched.
