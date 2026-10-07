# The actual sixth-jet seam and the higher-order phase boundary

**Status: derived subject, unreviewed.** Fix $\epsilon=2^{-200000}$, $K=c_f=1$, $R_0=2^{399998}$ and exactly the [complete prepared history](authorized-cases-ten-hour-b-case.md). The [local sixth-jet reconstruction](authorized-cases-ten-hour-reference-b-sixth-adjudication.md) is independently accepted. The [quantified compact-mode candidate](authorized-cases-ten-hour-b-quantified-compact-mode.md) remains unreviewed. This document derives a property of the actual neutral history and identifies the derivative inventory missing from a higher-order preparation-to-turn calculation. It does not substitute an oscillator or another equation.

## 1. The release sixth-jet jump is nonzero

The actual root at release samples the recent degree-five polynomial. That polynomial has $y^{(6)}(0-)=0$. On the first generated method interval the sampled source is analytic, and the implicit root has a nonzero denominator. The local equation therefore gives analytic one-sided generated derivatives at release. This statement concerns each side separately; it does not smooth their join.

At zero propagation parameter, the central solution with the limiting initial state $y=e_1$, $y'=e_2$ is $(\cos s,\sin s)$. Substitution gives the analytical control $y^{(6)}(0)=-e_1$. The actual initial tangential speed differs from one by $O(\epsilon^2)$, and the accepted generated-sixth estimate compares its right trace with the smooth central sixth jet. The central jet is a rational function of the initial state, with bounded derivative on the same separated state box. Consequently the actual jump

$$
J_0=y^{(6)}(0+)-y^{(6)}(0-)
$$

satisfies the explicit safe bound

$$
|J_0+e_1|\le2^{40100}\epsilon^2<\epsilon,
\qquad |J_0|>3/4.
\tag{1}
$$

Thus the selected complete history is genuinely $C^{5,1}$ at release and is not $C^6$ there. This is a property of its fixed polynomial preparation, not an arbitrary member of a larger history class. It cannot be removed by declaring the right-generated history smooth.

## 2. Exact neutral propagation of that jump

Write $s_0=0$, and recursively define $s_n$ by the actual source clock

$$
s_d(s_n)=s_{n-1},\qquad n\ge1.
\tag{2}
$$

The admitted clock is strictly increasing with derivative bounded away from zero. Each $s_n$ therefore exists uniquely. The positive minimum delay on every finite separated interval prevents a finite accumulation, so $s_n\to\infty$. The cutoff joins in the older negative past are never sampled: the source clock starts inside the fixed recent polynomial and only increases.

On successive open method intervals, the history is piecewise analytic. Its derivatives through five remain continuous at the joins. In four reception derivatives of the exact acceleration row, the only discontinuous source datum is the sixth jet. Its exact matrix coefficient is

$$
B_n=\frac{4\epsilon^2}{L_nD_n^3}\,n_n n_n^{\mathsf T}c_n^4,
\qquad c_n=s_d'(s_n)>0.
\tag{3}
$$

All other factors and lower-jet terms have matching one-sided values. Hence the jump transmission is exactly

$$
J_n=y^{(6)}(s_n+)-y^{(6)}(s_n-)=B_nJ_{n-1}.
\tag{4}
$$

No derivative of a discontinuous sixth jet is used in deriving (4): it is the difference of the two one-sided fourth derivatives of the row. In particular there is no unrecorded impulse in the continuous position, velocity or acceleration.

For the first reception, $s_1<4\epsilon$. The global speed bound first gives $r>1-2^{15}\epsilon>0.99$ over this short interval. The admitted acceleration bound then keeps the speed below three, improving the displacement to $|y(s_1)-e_1|<16\epsilon$. Therefore $L_1\in[1.9,2.1]$, $D_1\in[.99,1.01]$, $c_1\in[.98,1.02]$, and $n_1\cdot J_0<-0.99$, with enormous strict slack at the selected parameter. Equations (3)–(4) give, for example,

$$
\epsilon^2<|J_1|<3\epsilon^2.
\tag{5}
$$

The generated trajectory is thus not $C^6$ even after the source clock first clears release.

## 3. The projections never erase the seam

The admitted all-future speed bound, including the complete older history, is $|y'|<2^{13}$. Put $\beta=2^{13}\epsilon<1/32$. At adjacent seam receptions write $y_n=y(s_n)$. The delay identity and speed bound imply

$$
|y_n-y_{n-1}|\le\beta L_n,
\qquad L_n=|y_n+y_{n-1}|.
$$

For $e_n=y_n/|y_n|$, the elementary normalized-vector inequality gives

$$
|n_n-e_n|\le\frac{2\beta}{1-\beta},
\qquad |n_{n+1}-e_n|\le\frac{2\beta}{1-\beta}.
\tag{6}
$$

The same middle endpoint is used in both comparisons. Hence

$$
n_{n+1}\cdot n_n
=1-\tfrac12|n_{n+1}-n_n|^2>31/32.
\tag{7}
$$

Writing $a_n=4\epsilon^2c_n^4/(L_nD_n^3)>0$, the exact product is

$$
J_n=\left(\prod_{j=1}^n a_j\right)
(n_1\cdot J_0)
\left(\prod_{j=2}^n n_j\cdot n_{j-1}\right)n_n.
\tag{8}
$$

Every finite product is nonzero. The actual seam survives every finite generation, although its magnitude decreases very rapidly. The global lower radius $2^{-13}$, transmitter/clock margins and (3) give the loose upper estimate

$$
|J_n|\le2(2^{20}\epsilon^2)^n.
\tag{9}
$$

For any $s\in(s_n,s_{n+1})$, the actual causal interval $[s_d(s),s]$ contains $s_n$ in its interior. Thus every such sampled interval contains a nonzero sixth-derivative jump. A bounded seventh source derivative on the entire interval is unavailable at every stage, not just at release. At the isolated receptions $s=s_n$, seams can lie at the two endpoints instead; this does not restore a uniform whole-window derivative bound in a neighborhood. In distributional notation, the seventh derivative has an atom $J_n\delta_{s_n}$ at that seam. This is a statement about the derivative of a bounded jump, not a physical impulse prescription.

## 4. What this obstructs and what it leaves possible

The accepted special seventh-order **value** remainder is consistent with these jumps. It uses central tracking of the bounded sixth coefficient, not a bounded seventh derivative. The normal-form difference $R_7=y''-F^{[6]}(y,y';\epsilon)$ has fourth-derivative jump $J_n$, because the fourth time derivative of the smooth finite field $F^{[6]}(y,y')$ uses only actual jets through five and is continuous. Consequently $R_7$ does not have a bounded fifth weak time derivative on a window containing $s_n$.

Two proposed shortcuts are therefore unavailable on the selected member: applying a classical Taylor remainder requiring seven or more bounded source derivatives across a whole causal window, and repeatedly differentiating the seventh-order value remainder as though it retained its order and regularity. Either shortcut would change the derivative hypothesis rather than prove it.

This is not an impossibility theorem for more accurate value estimates. Equation (9) shows why. After five transmissions, the sixth jump is already bounded by a constant times $\epsilon^{10}$ near the initial scale. Its direct sixth-order Taylor contribution has an additional six propagation powers. An argument which explicitly carries the seam locations and jump terms may therefore be much sharper than a generic $C^{5,1}$ bound. Such an argument must also bound the higher derivatives on each analytic open piece and their endpoint behavior. No uniform piecewise higher-jet inventory, high-order neutral transport, or all-seam summation is supplied by the accepted sixth-jet theorem. Tracking the seams is allowed; replacing the past to eliminate them is not.

## 5. Why the compact sixth-order precision does not yet locate the last passage

This subsection is an error-budget diagnosis for the specified route, not a second actual evolution or a proof that every possible terminal argument needs the same order. In the central cycle control, the leading cubic increments satisfy

$$
\Delta_{\rm lead}\log H=\frac{2\pi\gamma}{H^3},\qquad
\Delta_{\rm lead}(H^3)=6\pi\gamma=8\pi\epsilon^3,
\qquad \gamma=\tfrac43\epsilon^3.
\tag{10}
$$

If the compact preparation invariant is denoted $B=A/H^{3/2}$, its leading seed is $\kappa\epsilon^3$, where $\kappa=4\sqrt2/3$. The central comparison boundary $A=1/\sqrt2$ corresponds to

$$
H_c^3=\frac1{2B^2}\sim\frac9{64}\epsilon^{-6}.
\tag{11}
$$

A relative uncertainty $\alpha$ in $B$ changes this comparison scale relatively by order $\alpha$. Dividing the resulting $H_c^3$ uncertainty by the leading single-cycle increment in (10) gives a cycle-count uncertainty of order $\alpha\epsilon^{-9}$. These are frozen central-cycle integrals, not exact discrete increments for the delayed trajectory. The sixth-order signed inequality controls $\alpha$ by order $C\epsilon$; its magnitude budget alone therefore permits an uncertainty of order $C\epsilon^{-8}$ cycles. Making the fixed parameter smaller improves the compact amplitude estimate while worsening this particular last-cycle uncertainty.

The actual account accuracy has the same scale requirement without relying on that cycle-count interpretation. At an actual radial turn the needed account margin is $\gamma h^{-5}$. In normalized account units $H^2\mathcal E$, this is exactly

$$
H^2\gamma h^{-5}=\tfrac43\delta^3e^{-5\delta^2/\rho}.
\tag{12}
$$

Near a central parabolic pericenter, $\rho$ is near $1/2$. At zero parameter the derivative of both $J$ and $H^2\mathcal E$ with respect to $\rho$ is $P_0(\rho)=\rho^{-2}-\rho^{-3}$, nonzero there. Keeping the known reversible coordinate correction explicitly, a turn-chart error in $J$ therefore transfers to normalized account error with a coefficient near one. An order-one amplitude then requires $\alpha$ below a fixed multiple of $\delta^3$ to resolve a strict passage margin. Treating the reversible quadratic correction itself as uncertainty would be still worse; it is larger than the cubic margin and must be retained.

The compact candidate supplies an earlier actual scale $H>\epsilon^{-2}/16$ and the admitted $H$ is increasing. At every subsequent turn, $\delta^3<2^{12}\epsilon^9$. Thus the required relative precision is at least of order $\epsilon^9$, up to an explicit fixed factor, even without claiming that the final angular scale remains comparable from above. The reported compact envelope $\alpha<2^{-20000}$ at the exact dyadic member is much wider: $\epsilon^9=2^{-1800000}$. Ignoring only fixed chart factors, those two error envelopes differ by $2^{1780000}$. This is a comparison of rigorous upper bounds and a required margin scale, not a measurement of the actual error or a proof that it attains its upper bound.

For this global magnitude-budget route to locate a final passage with a one-cycle margin, it would need relative prepared-invariant accuracy at least of order $\epsilon^9$, followed by a separate actual near-critical section analysis. If an order-$m$ value remainder were integrated by the same absolute method, its additive error in $B$ would be order $\epsilon^{m-3}$, hence relative error order $\epsilon^{m-6}$ against the cubic seed. An order beyond fifteen would be a safe power-count target for that particular strategy; order fifteen alone would still require explicit constants and a strict margin. This count does not prove that a lower-order signed cancellation or invariant mechanism cannot decide the branch.

The actual seam calculation explains why simply asking for a smooth fifteenth-order Taylor expansion is not an available continuation of the current proof. A higher-precision correlated calculation must retain the piecewise analytic history and its nonzero neutral seams, or find a signed identity which avoids that expansion. The actual terminal deficit remains unresolved. The new compact candidate, even if accepted, supplies an earlier negative pericenter and the correct large angular scale, not the final phase modulo a passage.

## Falsifiers and computation closure

The actual-history claims are falsified by a zero release sixth jump despite (1), an omitted discontinuous term in the one-sided row subtraction, a vanishing projection contrary to (6)–(7), or a causal window at a reception strictly between successive $s_n$ which contains no propagated seam. The error-budget statements are falsified by the corresponding algebraic powers or cycle control being wrong; they are not assertions that the actual delayed error realizes the worst-case budget.

Only analytical controls and deductions from the admitted history were used. No target computation, trajectory, physical-law modification, history smoothing, changed dyadic member, external source, Python process or Git mutation occurred. Document validation checks syntax and routing only.
