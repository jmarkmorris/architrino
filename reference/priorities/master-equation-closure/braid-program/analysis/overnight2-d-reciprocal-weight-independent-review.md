# Independent review of reciprocal-weight comparison

## Scope and disposition

This is a derived, conditional mathematical review of [the reciprocal-weight note](overnight2-d-reciprocal-weight-comparison.md), using the Ramon E. Moore lens and retained Specialist charter. The frozen subject SHA-256 is `c5bd9aec2014fe7ff06ed2b029dfc835e79f8d3e1347cec194fcf94e07161540`. The role is an analytical lens, not acceptance authority. No executable, scientific target, preparation, accepted history, or tail certificate is changed by this review. The [third-prefix input review](overnight2-d-third-prefix-admission-independent-review.md) remains a separate task awaiting the completed trajectory receipt.

The receiver formula, monotonicities, reciprocal switch, free propagator and physical conversions are correct under the stated hypotheses. One displayed delayed contribution requires a dimensional correction before use: a $3\times6$ matrix cannot multiply the scalar $Y_j(S)$ to give the actual vector contribution. Define

$$
H_{ij}(S)=\left[-\overline B_{ij}/\alpha(S)\quad\overline C_{ij}\right],\qquad z_j(S)=(\alpha(S)e_j^x(S),e_j^v(S)).
$$

The vector is $H_{ij}(S)z_j(S)$; its scalar allowance is $\|H_{ij}(S)\|_2Y_j(S)$. The parent accepted this correction and will apply it after the frozen-stage preservation receipt. This review does not pre-certify that later edit.

## Independent derivation

For $z=(\alpha e^x,e^v)$, differentiating the first component contributes $\beta z_x+\alpha e^v-\alpha\rho_x$ almost everywhere. The symmetric receiver matrix has diagonal blocks $\beta I,-\lambda I/2$ and off-diagonal blocks $H/2,H^\top/2$, where $H=\alpha I+B^\top/\alpha$. Singular-vector transformations give the real symmetric blocks $\left(\begin{smallmatrix}\beta&s/2\\s/2&-\lambda/2\end{smallmatrix}\right)$. Their largest eigenvalue is increasing in $s\ge0$, so with $\sigma=\|H\|_2$ it is exactly

$$
\mu=\frac{\beta-\lambda/2+\sqrt{(\beta+\lambda/2)^2+\sigma^2}}2.
$$

Put $d=\sqrt{(\beta+\lambda/2)^2+\sigma^2}$. For $d>0$, the derivatives with respect to $\beta,\sigma,\lambda$ are respectively $(1+(\beta+\lambda/2)/d)/2$, $\sigma/(2d)$ and $(-1+(\beta+\lambda/2)/d)/4$. They have the claimed signs; continuity covers $d=0$. Hence upper bounds for $\beta,\sigma$ and a lower bound for $\lambda$ are the correct enclosure directions. At $\sigma=0$ the result is $\max(\beta,-\lambda/2)$. A negative value is possible. Replacing a valid upper bound by its positive part is conservative when a consumer requires nondecreasing envelopes and nonnegative budgets.

Positive locally absolutely continuous $\alpha$, locally bounded reciprocal and the stated derivative control suffice on each finite interval for this change of coordinates and its integrated energy inequality. A continuous weight with a derivative corner has no error-norm jump. A reception interval crossing the switch must include both derivative ratios, including the old value zero; it cannot use only the later negative ratio.

Retaining $\alpha_*$ on the old history and setting $\alpha=\alpha_*/(1+\alpha_*(t-T_*))$ later gives $\beta=-\alpha$ and leaves all previously saved norms and the switching value unchanged. In the free case, $B=0$, $\lambda=0$, $\sigma=\alpha$, so $\mu=(\sqrt2-1)\alpha/2$. Integration gives the displayed power bound; dividing by current $\alpha$ adds one to the position-error exponent. These bounds do not assert growth of the true free velocity error, which is constant.

For $T_*\le s\le t$, write $a=\alpha(t)/\alpha(s)$. Direct integration of the free errors gives $P_a=\left(\begin{smallmatrix}aI&(1-a)I\\0&I\end{smallmatrix}\right)$ because $\alpha(t)(t-s)=1-a$. In one coordinate the Gram matrix has entries $a^2,a(1-a),(1-a)^2+1$. The diagonal conditions for $2I-P_a^\top P_a\succeq0$ hold on $0\le a\le1$, and its determinant is $a(4-3a)\ge0$. Thus the claimed $\sqrt2$ bound follows independently of the note's convexity proof. It is sharp as $a\downarrow0$ on pure initial velocity error. At $a=1/2$, the Gram trace is $3/2$ and determinant $1/4$, giving eigenvalues $(3\pm\sqrt5)/4$.

The warning about transporting the normal-cone reaction is necessary. In a one-dimensional embedding, take $a=1/2$, $z=(-1,1/4)$ and reaction $\xi=1$. The immediate energy pairing is $z\cdot(0,-\xi)=-1/4$, whereas $z\cdot P_a(0,-\xi)=1/4$. The exact free propagator therefore does not retain the local dissipative pairing automatically. No interacting Duhamel estimate is accepted here.

## Delayed-history and application qualifications

The exact delayed vector uses $\alpha(S)$, while receiver matrices and physical receiver conversion use $\alpha(t)$. A later smaller reception weight could enter an explicitly proved conservative bound, but is not the exact source coordinate identity. For nondecreasing nonnegative saved $E_j$ and nonincreasing positive $\alpha$, $E_j/\alpha$ is nondecreasing. A source bracket ending at $b$ can therefore use the admitted envelope covering $b$ and a downward bound for $\alpha(b)$. The delayed matrix norm still encloses every source-time weight in that bracket. The whole bracket must be contained in admitted history; neither lookup simplification nor changing weight supplies existence or root coverage.

The signed receiver sum must be enclosed on its complete admitted homotopy, with the full weight and derivative-ratio ranges. Source blocks, $\alpha(t)\rho_x$, acceleration residuals, jumps, initialization and representation allowances remain present. Receiver position trials use the minimum weight on the complete reception cell. A tail requirement comparing $V$ with raw $Q'$ still adds $|Q'-W|$ to the feasible-velocity error. The constant-weight runner and its receipts are not implementations of this conditional specialization.

## Independent controls and evidence

Measured: lightweight shared-venv Python `fractions.Fraction` controls passed before any proposed application evaluation. With $\alpha_*=1/5$, $T_*=3$, $s=8$, $t=13$, the exact values are $\alpha(s)=1/10$, $\alpha(t)=1/15$, $a=2/3$ and $\alpha(t)(t-s)=1/3$; direct free propagation agrees for $e^x(s)=(2,-1,0)$ and $e^v(s)=(1,2,3)$. The Gram determinant identity was also checked at $a=0,1/4,1/2,2/3,1$, after the algebraic derivation above. The $a=1/2$ trace, determinant and discriminant were checked exactly.

Measured: the block with $\beta=1$, $\lambda=4$, $\sigma=4$ is $\left(\begin{smallmatrix}1&2\\2&-2\end{smallmatrix}\right)$ and its independently checked eigenpair is eigenvalue $2$, vector $(2,1)$; the other eigenvalue is $-3$. The decoupled case $\beta=-2$, $\lambda=2$, $\sigma=0$ gives $\mu=-1$. Exact quadratic-field arithmetic, with $\sqrt2^2=2$ checked first, verified $4c^2+4c-1=0$ and $0<c<1/4$ for $c=(\sqrt2-1)/2$. This separate actual check supplies the free-characteristic control. The reaction sign reversal above was checked as the exact pair $-1/4,+1/4$. For saved $E=1/10$, division by the source weight gives $1$, whereas division by the later weight gives $3/2$, illustrating the distinction.

Falsifiers are a symmetric-part eigenvalue violating the derived formula, an admissible free error violating the exact propagator, a discontinuous weight passed off as a continuous switch, a saved source norm decoded with an undeclared weight, or any omitted defect/root/history term in an application. No such application was inspected or run. A reduction in a free comparison bound is not a measured cost improvement or a prediction of later admission.

## Preservation and remaining work

The sole authored file is this companion. The frozen subject, code, receipts, earlier reviews and parent research account remain unedited by this reviewer. Closing SHA-256 verification must retain the subject identity above; a later parent correction receives a separate narrow check. Required next work is the dimensional display repair followed, for any actual use, by independent review of a weight-aware implementation and its complete validated application. This review establishes no new actual prefix, ceiling episode, asymptotic behavior or tail admission.

## Narrow correction verification

After frozen-stage completion, the parent changed the contribution description and its display. Measured: the corrected subject SHA-256 is `3b2a97927256ff0be1edd23207fd451012fa61f53d9c63713f591f85d5774acb`. Read-through confirms the exact contribution $H_{ij}z_j(S)$, the correct six-dimensional weighted source vector and the scalar operator-norm allowance. An independent shared-venv text reconstruction replaced only this description/display with its frozen text and recovered the original SHA-256 `c5bd9aec2014fe7ff06ed2b029dfc835e79f8d3e1347cec194fcf94e07161540`; the SHA evaluator first passed the known `abc` digest. Thus the requested correction is closed and all other subject bytes are preserved. The conditional mathematical disposition is accepted with the application limitations above; no numerical or actual-history claim is added. The frozen-stage companion identity before this authorized appendix was `2d70aec396981ed1a4197c68faf8796b8876c90f1d12154f83474c1b3ad8a9ff`.
