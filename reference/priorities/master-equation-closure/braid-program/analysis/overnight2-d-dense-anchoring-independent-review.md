# Independent review of exact endpoint anchoring

## Verdict and scope

**Derived disposition:** the [frozen anchoring theorem](overnight2-d-dense-anchoring.md) is correct. Its four coefficient identities preserve the degree-four through degree-seven coefficients in exact conversion, its factored correction preserves the chosen position and velocity data at both endpoints, and its derivative and whole-cell bounds follow from direct differentiation and triangle inequalities. The degree-five control is exact. No mathematical defect was found in the stated polynomial theorem.

This acceptance concerns the defined mathematical representation, not an implementation. Exact endpoint anchoring is retained when the reference is defined by its node data and factored correction, even if the four stored correction vectors are rounded encodings. Re-expanding that expression into independently rounded power coefficients and treating those coefficients as a new exact polynomial can reintroduce the original endpoint mismatch. The complete negative-time comparison must also join exactly to the declared first position. Neither issue is solved merely by small floating discrepancies.

No numerical target or implementation control was run for this review. The Germund Dahlquist lens supplied the consistency and representation questions; the following independent polynomial derivation supplies the evidence. The original selected release, prescribed kick, complete past, and acceleration law are unchanged.

## 1. Exact endpoint construction

Fix a cell $[a,b]$ with exact positive width $h=b-a$ and $q=(t-a)/h$. Let the chosen endpoint positions be $\mathbf x_0,\mathbf x_1$ and their time derivatives be $\mathbf v_0,\mathbf v_1$. Their cubic Hermite interpolant is

$$
\begin{aligned}
\mathbf H_3(q)={}&(2q^3-3q^2+1)\mathbf x_0
+(-2q^3+3q^2)\mathbf x_1\\
&+h(q^3-2q^2+q)\mathbf v_0
+h(q^3-q^2)\mathbf v_1.
\end{aligned}
$$

Substitution at $q=0,1$ gives the desired positions. Differentiating in $q$ and dividing by $h$ gives the desired time velocities. These four constraints determine a unique cubic, since a difference satisfying zero position and first derivative at both endpoints would be divisible by $q^2(1-q)^2$, a degree-four polynomial.

Now set

$$
f(q)=q^2(1-q)^2,
\qquad \mathbf R(q)=\mathbf r_0+\mathbf r_1q+\mathbf r_2q^2+\mathbf r_3q^3,
\qquad \mathbf Q=\mathbf H_3+f\mathbf R.
$$

Both $f$ and $f'$ vanish at zero and one. Therefore the added position and time-velocity contributions vanish there, irrespective of the values of the four finite vectors $\mathbf r_k$. This establishes endpoint anchoring without assuming those vectors are accurate approximations to another polynomial.

On a finite increasing mesh, neighboring cells built from the same position and velocity vectors have matching value and first derivative and hence define a $C^1$ positive-time path. This does not assert continuity of acceleration. It also does not remove the intentionally prescribed velocity trace jump at time zero; the negative comparison position must meet the first positive node, with its own declared left velocity.

## 2. Coefficient identities and the exact correction to the old polynomial

Since $f=q^2-2q^3+q^4$, multiplication gives the following high-degree coefficients:

$$
\begin{array}{c|c}
\text{Power}&\text{Coefficient in }f\mathbf R\\
q^7&\mathbf r_3\\
q^6&\mathbf r_2-2\mathbf r_3\\
q^5&\mathbf r_1-2\mathbf r_2+\mathbf r_3\\
q^4&\mathbf r_0-2\mathbf r_1+\mathbf r_2.
\end{array}
$$

Solving this triangular system from highest degree down for prescribed coefficients $\mathbf c_7,\mathbf c_6,\mathbf c_5,\mathbf c_4$ gives

$$
\mathbf r_3=\mathbf c_7,
\quad\mathbf r_2=\mathbf c_6+2\mathbf c_7,
\quad\mathbf r_1=\mathbf c_5+2\mathbf c_6+3\mathbf c_7,
\quad\mathbf r_0=\mathbf c_4+2\mathbf c_5+3\mathbf c_6+4\mathbf c_7.
$$

These independently derived identities agree with the subject. In exact conversion, the old polynomial $\mathbf P(q)=\sum_{k=0}^7\mathbf c_kq^k$ and the anchored polynomial have the same high-degree coefficients, so $\mathbf Q-\mathbf P$ is a cubic. Its four endpoint data are precisely the mismatches between the old polynomial and the desired node values.

More explicitly, define

$$
\begin{aligned}
\Delta\mathbf x_0&=\mathbf x_0-\mathbf P(0),&
\Delta\mathbf x_1&=\mathbf x_1-\mathbf P(1),\\
\Delta\mathbf v_0&=\mathbf v_0-\mathbf P_q'(0)/h,&
\Delta\mathbf v_1&=\mathbf v_1-\mathbf P_q'(1)/h.
\end{aligned}
$$

Then $\mathbf Q-\mathbf P$ is exactly the cubic Hermite polynomial in Section 1 with these four mismatch vectors as its data. This gives a direct interpretation of the anchoring operation: it adds the unique cubic needed to repair the endpoint defects while leaving the higher coefficients fixed. If the defects are zero, the correction is zero and the two polynomials are identical.

If the stored vectors are $\widehat{\mathbf r}_k=\mathbf r_k+\Delta\mathbf r_k$ after floating construction, the reference gains the further term $f\sum_k\Delta\mathbf r_kq^k$. Its endpoints still remain exact because of the factors in $f$, but its high-degree coefficients need not equal the earlier encoded $\mathbf c_k$ exactly. The subject states this qualification correctly. An error estimate comparing anchored and old references should distinguish this conversion error from the cubic endpoint correction; the displayed bounds relative to $\mathbf H_3$ are not automatically bounds on that smaller old-to-new change.

## 3. Compatible derivatives and endpoint acceleration traces

The normalized coordinate has constant derivative $dq/dt=1/h$. Applying the product rule gives

$$
\dot{\mathbf Q}=\dot{\mathbf H}_3+\frac{f'\mathbf R+f\mathbf R'}h,
\qquad
\ddot{\mathbf Q}=\ddot{\mathbf H}_3+\frac{f''\mathbf R+2f'\mathbf R'+f\mathbf R''}{h^2}.
$$

Thus the stated source velocity is the derivative of the declared source position, and the stated acceleration is its second derivative on each cell. No separate velocity interpolant is being substituted.

Direct differentiation gives

$$
f'=2q(1-q)(1-2q),\qquad
f''=2-12q+12q^2.
$$

At either endpoint $f=f'=0$ and $f''=2$. The added acceleration is therefore $2\mathbf r_0/h^2$ at the left endpoint and $2(\mathbf r_0+\mathbf r_1+\mathbf r_2+\mathbf r_3)/h^2$ at the right. These are exactly $2\mathbf R(0)/h^2$ and $2\mathbf R(1)/h^2$. Different adjacent cells need not have equal acceleration traces. Any signed variation that evaluates source acceleration at a knot must retain its one-sided or integrated treatment; anchoring positions and velocities does not cure that separate regularity issue.

## 4. Whole-cell bounds

For $0\le q\le1$, $q(1-q)\le1/4$, hence $0\le f\le1/16$. Also

$$
|f'|=2q(1-q)|1-2q|\le\tfrac12,
\qquad
f''=12(q-\tfrac12)^2-1\in[-1,2].
$$

The stated bounds $|f'|\le1/2$ and $|f''|\le2$ are therefore valid. The first is intentionally conservative and need not be an attained maximum.

With the subject's sums $R_0=\sum|\mathbf r_k|$, $R_1=\sum k|\mathbf r_k|$, and $R_2=\sum k(k-1)|\mathbf r_k|$, each monomial has magnitude at most one on this interval. Consequently $|\mathbf R|\le R_0$, $|\mathbf R'|\le R_1$, and $|\mathbf R''|\le R_2$. Substitution into the product-rule formulas proves

$$
|\mathbf Q-\mathbf H_3|\le R_0/16,
\qquad
|\dot{\mathbf Q}-\dot{\mathbf H}_3|\le(R_0/2+R_1/16)/h,
$$

$$
|\ddot{\mathbf Q}-\ddot{\mathbf H}_3|\le(2R_0+R_1+R_2/16)/h^2.
$$

These bounds hold for all points of the cell, not just sampled points. Replacing a Euclidean vector norm by its coordinate absolute-value sum is conservative. A numerical certificate still requires outward evaluation of the sums, widths, reciprocals, and cubic bounds. Very short cells amplify derivative bounds through $h^{-1}$ and $h^{-2}$; a small position correction alone does not establish a small velocity or acceleration correction.

If validated cubic speed bounds plus these correction bounds remain strictly below one on every finite-prefix cell, the positive reference has a uniform Lipschitz bound. Matching its initial position to a complete negative reference with the same uniform speed bound extends that bound across zero even when velocity jumps there. Present pair separation must likewise be bounded using both members' corrections. The [root-region theorem](overnight2-d-root-region.md) can then be applied with its translation and velocity-addition margins. This implication admits a reference region only; it does not prove that the exact physical history remains in the proposed error tube.

## 5. Independent polynomial controls

For $\mathbf P(q)=q^5$ and $h=1$, the desired endpoint data are $(x_0,v_0,x_1,v_1)=(0,0,1,5)$. The cubic is $-2q^2+3q^3$, and the conversion gives $(r_0,r_1,r_2,r_3)=(2,1,0,0)$. Independently expanding the correction gives

$$
q^2(1-q)^2(2+q)=2q^2-3q^3+q^5.
$$

Adding the cubic leaves exactly $q^5$. Differentiating the resulting identity gives $5q^4$ and $20q^3$, so both derivative controls follow algebraically.

As a check involving all four conversion identities, take $\mathbf P(q)=q^7$ with endpoint velocity seven. The cubic is $-4q^2+5q^3$ and the four correction coefficients are $(4,3,2,1)$. Multiplication gives

$$
q^2(1-q)^2(4+3q+2q^2+q^3)=4q^2-5q^3+q^7,
$$

which again recovers the original polynomial exactly. These are independent exact controls, not numerical observations about the original release or implementation executions.

## 6. Representation obligations and falsifiers

The exact reference should retain the node-defined Hermite term and factored endpoint-vanishing correction as its mathematical definition. A rounded evaluator can approximate that definition with a proved enclosure; it should not silently replace it by the exact interpretation of newly rounded expanded coefficients. Likewise, $h$ in the theorem is the exact difference of the declared endpoint times. If that subtraction is rounded in an implementation, its evaluation error must be enclosed rather than redefining one cell's endpoint or velocity scaling.

The first position must be joined to the negative comparison past exactly in the mathematical representation. The earlier initialization bounds then relate that comparison to the literal original preparation. The theorem does not establish those bounds anew. Actual source-zero acceleration jumps remain part of the residual even if a chosen comparison cell is smooth across their receptions. Endpoint anchoring neither supplies an event law nor licenses a smooth numerical-order claim there.

The theorem is falsified by an exact factored construction that changes a chosen endpoint position or time velocity, by a wrong high-degree coefficient under exact conversion, by a derivative inconsistent with the displayed product rule, or by a polynomial exceeding one of the proved whole-cell bounds with its exact inputs. A floating mismatch without a rounding allowance invalidates an implementation claim; it does not refute the algebraic theorem. Failure to establish a speed margin or actual tube membership leaves the finite-history application unresolved.

## Provenance and validation

The subject SHA-256 measured before review was `1519c42858c4c0d8863dec9cc7ba3cee07991eb36547138bf8bc72750082593e`. Evidence in this review consists of an independent Hermite construction, triangular coefficient solve, product-rule derivation, global scalar bounds, and the exact degree-five and degree-seven polynomial identities. No target, numerical control, implementation change, or child agent was run.

Only this new review companion was authored. The parent owns implementation and the receiving [research account](overnight2-d-followup-and-research-2026-10-07.md); prior subjects and reviews remain outside this review's write scope. Implementation acceptance and actual finite-history admission remain open.

Final editorial receipt: repeat `shasum -a 256` returned the unchanged subject identity `1519c42858c4c0d8863dec9cc7ba3cee07991eb36547138bf8bc72750082593e`. File-scoped `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/braid-program/analysis/overnight2-d-dense-anchoring-independent-review.md` emitted no whitespace diagnostics (difference exit status 1). Explicit `test -f` checks passed for all three local link destinations; there are no fragment targets. All controls in this review were exact algebraic derivations, not executed numerical checks.
