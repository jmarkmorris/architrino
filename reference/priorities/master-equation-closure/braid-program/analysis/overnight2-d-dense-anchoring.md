# Endpoint anchoring of a degree-seven comparison reference

## Purpose and claim boundary

A dense Runge–Kutta position polynomial is useful for measuring a delayed-law residual because its derivative supplies a compatible source velocity. Stored floating coefficients can nevertheless have tiny endpoint mismatches when interpreted as exact real numbers: the sum of the coefficients at the right endpoint need not equal the separately stored next node. Such a representation does not acquire an exact global Lipschitz constant merely because the mismatch is small. The construction below defines a piecewise polynomial with exact position and velocity joins from the declared node data. It is a comparison reference for the original eight-member release, not a change to its equation, source kick or ceiling rule.

The claim is **derived polynomial algebra**. It assumes finite node data, a positive cell width and the stated polynomial coefficients. It supplies continuity and explicit derivative bounds; it does not establish a numerical residual, a trajectory error, or actual entry into the previously checked tail neighborhood.

## Anchored polynomial

Let a cell have endpoints $a,b$, width $h=b-a>0$ and normalized coordinate $q=(t-a)/h$. Write its chosen endpoint positions and velocities as $\mathbf x_0,\mathbf x_1,\mathbf v_0,\mathbf v_1$. Let $\mathbf H_3(q)$ be their unique cubic Hermite interpolant, with the velocities interpreted as derivatives with respect to $t$. Suppose an unanchored degree-seven dense polynomial has coefficients $\mathbf c_0,\ldots,\mathbf c_7$ in powers of $q$. Choose four new stored vectors

$$
\begin{aligned}
\mathbf r_3&=\mathbf c_7,\\
\mathbf r_2&=\mathbf c_6+2\mathbf c_7,\\
\mathbf r_1&=\mathbf c_5+2\mathbf c_6+3\mathbf c_7,\\
\mathbf r_0&=\mathbf c_4+2\mathbf c_5+3\mathbf c_6+4\mathbf c_7.
\end{aligned}
$$

Define the anchored reference by

$$
\mathbf Q(q)=\mathbf H_3(q)+q^2(1-q)^2\bigl(\mathbf r_0+\mathbf r_1q+\mathbf r_2q^2+\mathbf r_3q^3\bigr).
$$

The added term and its first derivative vanish at both endpoints. Therefore $\mathbf Q$ takes precisely the chosen endpoint positions and velocities in exact arithmetic. Adjacent cells using common node data join as a $C^1$ path. The original prescribed velocity jump at time zero remains a two-sided trace and is not removed by this construction.

Multiplication shows that the coefficients of $q^7,q^6,q^5,q^4$ in the added term are respectively

$$
\mathbf r_3,\qquad
\mathbf r_2-2\mathbf r_3,\qquad
\mathbf r_1-2\mathbf r_2+\mathbf r_3,\qquad
\mathbf r_0-2\mathbf r_1+\mathbf r_2.
$$

The displayed choice gives $\mathbf c_7,\mathbf c_6,\mathbf c_5,\mathbf c_4$ exactly. Thus the anchored polynomial changes only the cubic part needed to impose the four endpoint constraints. If the original dense polynomial already has those endpoint data, uniqueness of the cubic Hermite correction makes the anchored and original polynomials identical. When the four stored $\mathbf r_k$ are formed in floating arithmetic, the definition uses their exact binary encodings; the endpoint constraints still hold algebraically, although equality of the highest coefficients to an earlier floating representation then carries its rounding discrepancy.

## Derivatives and whole-cell bounds

Put $f(q)=q^2(1-q)^2$ and $\mathbf R(q)=\sum_{k=0}^3\mathbf r_kq^k$. Derivatives with respect to time are

$$
\dot{\mathbf Q}=\dot{\mathbf H}_3+\frac{f'\mathbf R+f\mathbf R'}h,
\qquad
\ddot{\mathbf Q}=\ddot{\mathbf H}_3+\frac{f''\mathbf R+2f'\mathbf R'+f\mathbf R''}{h^2}.
$$

These expressions define the compatible source velocity and acceleration on a cell. At an endpoint the added acceleration is $2\mathbf R(0)/h^2$ or $2\mathbf R(1)/h^2$. Acceleration continuity is not asserted; a derivative estimate crossing a cell boundary must use both traces or an integrated bound.

For a simple entire-cell bound, define

$$
R_0=\sum_{k=0}^3|\mathbf r_k|,\qquad
R_1=\sum_{k=1}^3 k|\mathbf r_k|,\qquad
R_2=\sum_{k=2}^3 k(k-1)|\mathbf r_k|.
$$

On $0\le q\le1$, $|f|\le1/16$, $|f'|\le1/2$ and $|f''|\le2$. Triangle inequalities give

$$
|\mathbf Q-\mathbf H_3|\le R_0/16,
\qquad
|\dot{\mathbf Q}-\dot{\mathbf H}_3|\le\frac{R_0/2+R_1/16}{h},
$$

$$
|\ddot{\mathbf Q}-\ddot{\mathbf H}_3|\le\frac{2R_0+R_1+R_2/16}{h^2}.
$$

An outward implementation may replace each Euclidean norm by the sum of absolute coordinate bounds. These inequalities are conservative; they avoid assuming that sample points attain extrema. Combined with whole-cell cubic bounds, they can certify a subunit speed and present-pair separation for the reference. The [complete root-region theorem](overnight2-d-root-region.md) then applies to the specified error tube, subject to its remaining premises. Neither that implication nor the anchoring algebra proves that the exact release occupies the tube.

## Independent controls and falsifiers

A degree-five example gives an exact control. For $Q(q)=q^5$ with $h=1$, the endpoint Hermite polynomial is $-2q^2+3q^3$ and $(r_0,r_1,r_2,r_3)=(2,1,0,0)$. Substitution gives $-2q^2+3q^3+q^2(1-q)^2(2+q)=q^5$. Differentiation checks the first and second derivatives without an evolution calculation.

Any nonzero endpoint position or velocity correction falsifies the anchoring implementation. A highest-degree coefficient different from the declared algebraic value falsifies the exact conversion statement. A polynomial sample outside a verified whole-cell bound falsifies that bound or its outward evaluation. Ordinary source-front crossings require explicit residual treatment even when they occur inside a smooth comparison cell; the construction does not impose smoothness on the actual acceleration or justify nominal integration order across the original source kick.

## Development disposition

This note is a proposed improvement to the high-order comparison representation, prepared before target interpretation. It has not yet been implemented or independently reviewed. Its intended consumer is `overnight2-d-dense-reference.py`; the parent owns that instrument and the [current research account](overnight2-d-followup-and-research-2026-10-07.md). No prior scientific subject or runtime evidence is changed by this derivation.
