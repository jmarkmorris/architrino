# A curvature-refined slow-rotation exclusion

## Result and assumptions

Claim grade: derived, pending independent review. The same fixed logarithmic equation and complete three-pair geometry as the [independently checked slow theorem](overnight-c-slow-rotation-independent-review.md) admit no exact circular balance for

$$
r_1=1,\quad r_2\in[6/5,7/5],\quad r_3\in[8/5,9/5],
\quad 0\le|\omega|\le3/100,
$$

with arbitrary phases. The improvement uses two exact estimates: the cancellation between a source's positional displacement and its transmitter weight, and the complementary distances to the two endpoints of each antipodal pair. No equation, coefficient, root rule or event prescription changes. The proof extends the bounded slow exclusion; it does not establish the initial higher-speed search box or any exact reference.

The complete paths are $X_{a,s}(t)=s r_a e^{i(\omega t+\phi_a)}$ for all real $t$, with polarity $q_{a,s}=s$ and fixed $K_{\log}=c_f=1$. The selected acceleration sums $q_iq_j z/(|z|^2|D|)$ over all causal roots, with $z=X_i(0)-X_j(-\tau)$, $|z|=\tau>0$ and $D=1-n\cdot\dot X_j(-\tau)$. The maximum speed here is $27/500<1$. The complete-root proof in the [frozen first theorem](overnight-c-slow-rotation-exclusion.md#complete-root-census), using only strict subfield speed and separation, therefore applies throughout this enlarged interval: thirty directed partner roots, no positive-delay self roots, and $D\ge473/500$. That proof's numerical speed bound is replaced here by the explicitly enlarged bound; its monotonicity argument is unchanged.

## Exact cancellation using the average source velocity

Fix one directed root. Let $y=x_i-x_j$ be the present chord, $z=x_i-X_j(-\tau)=\tau n$ the delayed chord, $d=|y|$, and

$$
u=\frac{X_j(0)-X_j(-\tau)}{\tau},\qquad
v_j=|\omega|r_j,\qquad
\overline D=1-n\cdot u.
$$

Here $u$ is the source velocity averaged over the emission-to-reception interval. It is an algebraic comparison quantity, not a replacement for the equation's emission velocity. We have $y=\tau(n-u)$, $|u|\le v_j$, and $\overline D\ge1-v_j>0$.

Write $u=a n+b$, where $a=n\cdot u$ and $b\cdot n=0$. Direct subtraction, using $|n-u|^2=(1-a)^2+|b|^2$, gives

$$
\frac{n}{\tau\overline D}-\frac{y}{d^2}
=\frac{|b|^2n+(1-a)b}
{\tau\overline D\,|n-u|^2}.
$$

Taking its norm yields an exact cancellation identity:

$$
\left|\frac{z}{|z|^2\overline D}-\frac{y}{d^2}\right|
=\frac{|b|}{\overline D\,d}
\le\frac{v_j}{(1-v_j)d}.
$$

The purely longitudinal part of the average velocity cancels. This is why treating displacement and source weight as unrelated errors, as in the first theorem, loses a factor of two in the leading estimate.

The actual weight still uses the emission velocity $V_e=\dot X_j(-\tau)$. Circular kinematics gives $|\ddot X_j|=\omega^2r_j$ at every time, so integration over the same interval proves

$$
|u-V_e|
\le\frac1\tau\int_0^\tau \omega^2r_j s\,ds
=\frac{\omega^2r_j\tau}{2}.
$$

Since both $D$ and $\overline D$ are at least $1-v_j$,

$$
\left|\frac{z}{|z|^2D}-\frac{z}{|z|^2\overline D}\right|
=\frac{|D-\overline D|}{\tau D\overline D}
\le\frac{\omega^2r_j}{2(1-v_j)^2}.
$$

Combining the two exact comparisons bounds the complete per-hit difference from the stationary logarithmic row:

$$
\left|\frac{z}{|z|^2D}-\frac{y}{d^2}\right|
\le\frac{|\omega|r_j}{(1-v_j)d}
+\frac{\omega^2r_j}{2(1-v_j)^2}.
$$

This is a uniform finite-speed inequality. It is not a truncated asymptotic expansion, and the curvature term retains the entire discrepancy between average and emission velocity.

## Complementary antipodal distances

For two radii $a<b$ at relative phase $\phi$, the distances to the two antipodal endpoints are

$$
d_\pm=\sqrt{a^2+b^2\pm2ab\cos\phi}.
$$

The function $(c-x)^{-1/2}+(c+x)^{-1/2}$ is even and increases with $|x|$ for $|x|<c$. Therefore

$$
\frac1{d_-}+\frac1{d_+}
\le\frac1{b-a}+\frac1{b+a}.
$$

Among the eight directed rows between the two neutral pairs, four have each of these distances. After multiplying the refined row error by the receiver radius and using $v=\max_jv_j\le(9/5)|\omega|$, the first error term contributes at most

$$
\frac{4|\omega|ab}{1-v}
\left(\frac1{b-a}+\frac1{b+a}\right).
$$

The ratio inside this expression, including $ab$, is $2ab^2/(b^2-a^2)$. Its derivative with respect to $a$ is positive and with respect to $b$ is negative. Its three maxima on the selected radius intervals are therefore

$$
\frac{72}{11},\qquad\frac{128}{39},\qquad\frac{896}{75}.
$$

The six intrapair rows contribute at most $|\omega|\sum_a r_a/(1-v)$ to this first error. Thus the first term in the bound for the scalar contraction is

$$
E_1\le\frac{C|\omega|}{1-(9/5)|\omega|},\qquad
C=\frac{21}{5}+4\left(\frac{72}{11}+\frac{128}{39}+\frac{896}{75}\right)
=\frac{979157}{10725}.
$$

The curvature term contributes

$$
E_2\le\frac{\omega^2}{2(1-v)^2}\sum_{i\ne j}r_ir_j
\le\frac{727\omega^2}{25(1-(9/5)|\omega|)^2}.
$$

For the final inequality, every ordered product is positive and increases with either radius. Evaluating the whole ordered sum at the largest allowed radii gives $(2\sum_a r_a)^2-2\sum_a r_a^2=1454/25$, so the factor one-half gives $727/25$.

## Strict circular contradiction

The unchanged stationary identity is $V_0=\sum_i x_i\cdot A_i^0=-3$. Exact circular acceleration would require $V=-\omega^2I$ with $I\le62/5$. The refined correction therefore requires $3\le E_1+E_2+\omega^2I$. Each upper bound increases with $|\omega|$ on the stated interval. At $|\omega|=3/100$,

$$
E_1+E_2+\omega^2I
\le\frac{979157}{338195}+\frac{6543}{223729}+\frac{279}{25000}
=3-\frac{4679079917}{72711925000}<3.
$$

The strictly positive rational margin is approximately $0.06435$. It excludes every radius and phase in the declared domain. Falsifiers are an error in the cancellation identity, the integrated source-acceleration estimate, complementary-distance maximum, directed multiplicity, rational constants, or a full-vector exact history in this box.

## Validation status

The exact constants were checked with shared-venv `fractions.Fraction` only after its known control $1/2+1/3=5/6$ passed. That arithmetic returned $C=979157/10725$, the three endpoint terms displayed above, and margin $4679079917/72711925000$. This is an author-side arithmetic receipt, not an independent review. The analytical identities and extension remain pending separate checking; the earlier independently checked theorem is preserved unchanged.
