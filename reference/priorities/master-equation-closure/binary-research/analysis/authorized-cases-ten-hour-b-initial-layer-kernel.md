# The first value correction transmitted by the supplied sixth seam

**Status: derived preparation-specific candidate, unreviewed.** Fix $\epsilon=2^{-200000}$, $K=c_f=1$, $R_0=2^{399998}$ and the identical [complete past](authorized-cases-ten-hour-b-case.md). This identifies one term the proposed finite phase map has to carry from the degree-five preparation. The degree-five recent polynomial is retained exactly, including its missing sixth derivative and every transmitted seam. No smoother supplied past is chosen.

Let $Y$ be the actual admitted path and let $Z$ be the finite autonomous comparison solving $Z''=F^{[16]}(Z,Z';\epsilon)$ with exactly the same release position and velocity. The comparison is used only on $[-3\epsilon,200\epsilon]$. It is the analytic finite field already admitted in the [value assessment](authorized-cases-ten-hour-reference-b-value-adjudication.md), not a replacement history. Let $e_1,e_2$ be the release frame, with $Y(0)=Z(0)=e_1$ and $Y'(0)=Z'(0)=h_0e_2$.

## 1. The leading defect of the recent polynomial

At zero parameter the comparison is the central unit circle. Its sixth release jet is $-e_1$. The recent supplied polynomial omits that term. If $a\ge0$ is a bounded scaled negative time, the three leading differences at $s=-a\epsilon$ are therefore

$$
\begin{aligned}
P_\epsilon-Z&=\frac{a^6\epsilon^6}{720}e_1+\text{higher terms},\\
P_\epsilon'-Z'&=-\frac{a^5\epsilon^5}{120}e_1+\text{higher terms},\\
P_\epsilon''-Z''&=\frac{a^4\epsilon^4}{24}e_1+\text{higher terms}.
\end{aligned}
\tag{1}
$$

The compatible second-through-fifth jets are not assumed equal to the comparison jets. Their feedback is bounded below and enters the row two orders later than the displayed terms.

At the zero-parameter release geometry, the exact selected row has the following derivatives with respect to radial source data: source position has coefficient $1$, source velocity has coefficient $2\epsilon$, and source acceleration has coefficient $2\epsilon^2$. These follow by differentiating the exact row at $L=2$, $n=e_1$, $D=1$. The velocity derivative uses both its explicit numerator and the three denominator powers. With $\sigma=s/\epsilon$, the leading source time is $(\sigma-2)\epsilon$. Thus (1) gives the radial kernel

$$
f(\sigma)=\frac{(2-\sigma)^6}{720}
-\frac{(2-\sigma)^5}{60}
+\frac{(2-\sigma)^4}{12},\qquad 0\le\sigma\le2.
\tag{2}
$$

Set $f=0$ for $\sigma>2$. Its first four factors vanish at the source-clearance endpoint. This extension is a value kernel; it does not erase the actual sixth seam.

The scalar factor in (2) is $a^4(a^2-12a+60)/720$ with $a=2-\sigma$. It is nonnegative on the entire first window, and positive in its interior. Direct polynomial integration gives

$$
\int_0^2 f(\sigma)\,d\sigma
=\frac8{315}-\frac8{45}+\frac8{15}
=\frac8{21}.
\tag{3}
$$

These are exact polynomial identities, not fitted numerical observations.

## 2. Compatible-jet feedback cannot change the leading kernel

Write $d_m=J_m-Z^{(m)}(0)$ for $2\le m\le5$ and use the scaled jet norm

$$
D_J=\max_{2\le m\le5}\epsilon^{m-2}|d_m|.
\tag{4}
$$

On a recent source interval of length at most $3\epsilon$, these coefficient differences contribute at most $2^6\epsilon^2D_J$, $2^6\epsilon D_J$ and $2^6D_J$ to source position, velocity and acceleration respectively. The row weights are $1,\epsilon,\epsilon^2$, so their common acceleration contribution has size at most a constant times $\epsilon^2D_J$.

The same estimate holds for the three differentiated compatibility equations after multiplying reception derivative $k$ by $\epsilon^k$. One direct bound uses the scaled complex reception variable $\sigma=s/\epsilon$ on a disk of radius $2^{-8}$. The implicit source root remains in the original polynomial interval and has denominator above $1/2$. The weighted value Lipschitz constant $2^{20}$, the finite polynomial factors and the Cauchy cost for $k\le3$ fit inside $2^{60}$. Receiver-jet feedback has the same $\epsilon^2$ factor because release position and velocity are fixed, and a receiver second derivative first enters a twice differentiated row. Hence the compatibility difference map has Lipschitz bound $2^{60}\epsilon^2$ in (4).

The comparison flow exists analytically on its admitted time disk $2^{-80}$; its jets through seven on this short interval are below $2^{1000}$. Its sixth jet differs from $-e_1$ by at most $2^{11000}\epsilon^2$, using its zero first parameter coefficient and the release velocity. The degree-five truncation of that flow therefore supplies a weighted compatibility defect below $2^{12000}\epsilon^6$. The comparison's own exact-row consistency error and its three reception derivatives are much smaller: the admitted analytic consistency bound remains of degree seventeen after these bounded time differentiations. Consequently

$$
D_J\le2^{60}\epsilon^2D_J+2^{12000}\epsilon^6,
\qquad
D_J\le2^{12001}\epsilon^6.
\tag{5}
$$

In (1), the compatible-jet correction is consequently of order $\epsilon^8$, $\epsilon^7$ and $\epsilon^6$ respectively. The smooth comparison Taylor remainder gives orders $\epsilon^7$, $\epsilon^6$ and $\epsilon^5$. Thus the omitted terms there are bounded by $2^{12030}$ times these latter powers, uniformly for $0\le a\le3$. After applying the row weights, their common order is $\epsilon^7$. This establishes why compatible release jets do not cancel the displayed sixth-order value kernel.

As a more detailed finite check, differentiation of (2) at zero predicts the leading compatible-jet differences

$$
\begin{aligned}
d_2&=\tfrac89\epsilon^6e_1+O(C\epsilon^7),\\
d_3&=-\tfrac85\epsilon^5e_1+O(C\epsilon^6),\\
d_4&=2\epsilon^4e_1+O(C\epsilon^5),\\
d_5&=-\tfrac43\epsilon^3e_1+O(C\epsilon^4).
\end{aligned}
\tag{6}
$$

These use the release derivatives only, where compatibility through order five exists. No seventh actual derivative is used. A common $C=2^{150000}$ covers the finite Taylor, root and Cauchy factors above.

## 3. Root transport and the actual short interval

On $0\le s\le200\epsilon$, the admitted speed and acceleration bounds keep the radius close to one and the speed below three. The source delay is $2\epsilon+O(2^{20}\epsilon^2)$. Replacing its exact negative source time by $(\sigma-2)\epsilon$ in (1) changes the weighted row by at most a fixed multiple of $2^{12050}\epsilon^7$. Near clearance, the fourth-order zero of (2) makes the same bound valid even when the exact source time has crossed zero before or after $2\epsilon$.

Let $S_A$ be the supremum of $|Y''-Z''|$ on the interval. Since both initial states agree, their generated position and velocity discrepancies are bounded by $s^2S_A/2$ and $sS_A$. Insert these into the exact source row, retaining its acceleration weight $\epsilon^2$. The strict source-clock margin transports roots before data are compared. The resulting feedback factor is less than $2^{100}\epsilon^2$; the finite comparison's exact-row consistency remains negligible. Thus the initial supremum closes with $S_A\le2^{13000}\epsilon^6$.

Substitution back into the row leaves generated-state feedback of order $2^{13120}\epsilon^8$. On the first source window the omitted polynomial and row Taylor terms are of order $2^{12100}\epsilon^7$. After original source clearance only the generated-state feedback and the much smaller comparison consistency remain. Their integral over the entire interval has order $\epsilon^9$, while the first-window error integral has order $\epsilon^8$. A safe combined velocity estimate is therefore

$$
\boxed{
\left|Y'(200\epsilon)-Z'(200\epsilon)
-\frac8{21}\epsilon^7e_1\right|
\le2^{150000}\epsilon^8.
}
\tag{7}
$$

The same integrations give $|Y-Z|\le2^{150010}\epsilon^8$ there. The leading term in (7) is strictly positive radially at the fixed parameter because its relative error is at most $2^{-50000}$. This is an actual comparison between the given preparation and its local finite autonomous flow, with the complete supplied history retained.

## 4. Its contribution to the prepared amplitude

Evaluate the same admitted compact function $B=A/H^{3/2}$ on both states at $s_a=200\epsilon$, calling the results $B_Y,B_Z$. Both use the original degree-six center and the original fixed norm; no new phase or amplitude convention is selected. Their radial mode at that time has $q=-(8/3)\epsilon^3+O(C\epsilon^5)$ and $z=O(C\epsilon^4)$. The leading change in (7) therefore decreases its amplitude:

$$
\frac{\Delta A}{A}
=\frac{(8/21)\epsilon^7}{-(8/3)\epsilon^3}
+\text{higher terms}
=-\frac17\epsilon^4+\text{higher terms}.
$$

The position discrepancy contributes only at relative order six because the potential derivative is of order $\epsilon^4$ there. The angular-scale change contributes at relative order eight. Norm differentiation, the known cubic lower bound, and (7) give the conservative candidate

$$
\boxed{
\left|\frac{B_Y}{B_Z}-1+\frac17\epsilon^4\right|
\le2^{160000}\epsilon^5.
}
\tag{8}
$$

Thus the first finite initial-layer correction caused specifically by the missing supplied sixth jet has a signed quartic relative coefficient. It does not alter the already accepted quadratic preparation coefficient or the proposed transported quadratic correction. It is one concrete higher-order input for an eventual finite phase map. Its error is still far too large to classify the final near-parabolic phase after the leading $\epsilon^{-9}$ amplification.

## Review boundary and falsifiers

The candidate depends on the signs and coefficients of all three weighted source variations in (1)–(2), the compatibility contraction in (5), exact root transport across the first clearance, and the actual/comparison norm matching in (8). A failure of any of these withdraws the corresponding signed statement. In particular, the compatible jets must not be silently replaced by the smooth flow's jets, and a source root must not be replaced by a fixed delay beyond its proved error. The smooth comparison is only an analytical control with the same present state.

The only checks used here are finite differentiation, elementary polynomial integration, and the admitted local row/flow bounds. No new target instrument, trajectory, numerical tail, smoother supplied history, physical-energy premise, seventh actual derivative, Python job or Git mutation was used. Independent review remains required before any candidate coefficient is integrated into the achieved result.
