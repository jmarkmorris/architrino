# Actual local release of the asymmetric six-pole preparation

**Derived, pending independent adjudication.** The [separately frozen fourth configuration](spherical-three-three-six-pole-dynamics-configuration.md), SHA-256 `18c7823ffe6dd9cadbe66b48d17e65f3e838b891a34495195b9a047b62ea3a8d`, has an actual normally constrained continuation through physical $0\le T\le1/10$. All thirty directed partner roots sample stationary supplied poles; there are no positive-delay self roots. Every support is strictly inward on this interval:

$$
-3/125<\lambda_i(T)<-21/1000.
$$

Equal initial speed norms split immediately. With physical time and $K=c_f=1,R=10$,

$$
|\mathbf v_{P_x}(T)|=1/2-T/100+T^2/32000+O(T^3),
$$
$$
|\mathbf v_i(T)|=1/2+21T^2/160000+O(T^3),\qquad i\ne P_x.
$$

Thus the selected asymmetric direction changes the first speed derivative without changing initial positions or speed norms. The other five speed norms are exactly equal to one another on this stationary-source interval by conjugacy of their separate fixed-source equations; the whole assembly does not retain octahedral or antipodal configuration symmetry. Nothing here asserts a later reception, constant speed, recurrence, stability, energy assignment or physical origin of normal support.

## Exact history and input controls

The frozen direction table is part of the input. In particular $\mathbf d_{P_x}=(0,1,1)/\sqrt2$ and $\mathbf d_{E_x}=(0,-1,1)/\sqrt2$, while the other four directions are the common-rotation directions. Each direction has norm one and zero pole-axis component. Positions are unchanged at the six radius-ten poles and initial velocities are $\mathbf d_i/2$.

For scaled past time $s=S/10$, retain the complete great-circle preparation $\theta(s)=s(1+4s)^3/2$ on $[-1/4,0]$, stationary earlier. Physical speed is $|\theta'|$. Setting $y=1+4s$ gives $\theta'=y^2(4y-3)/2\in[-1/8,1/2]$, so the entire supplied past is sub-wake. Direct controls are $\theta'(0)=1/2$ and $\theta(-1/8)=-1/128$, $\theta'(-1/8)=-1/8$. A radial initial direction has a nonzero tangent dot product and fails the input test. Reusing the hexagon coefficient would give different nonzero controls and is rejected. These are exact algebraic controls, not instrument output.

## Complete stationary-root interval and actual continuation

Work in physical units. Bootstrap $|\mathbf v_i|<3/5$ on $0\le T\le1/10$ and retain the sphere constraint. Receiver displacement from its initial pole is less than $3/50$. For any distinct source pole $\mathbf p_j=\mathbf X_j(0)$,

$$
|\mathbf X_i(T)-\mathbf p_j|>10\sqrt2-3/50>139/10>13.
$$

The stationary candidate emission is $S_{ij}=T-|\mathbf X_i(T)-\mathbf p_j|<1/10-139/10=-69/5<-5/2$. It is therefore inside the stationary supplied history, which ends at physical time $-5/2$. This proves source availability rather than assuming it from present positions.

Whole-history speed below $3/5$ makes the causal residual strictly monotone in source time. Its past/current endpoint signs give one partner root, and the valid stationary candidate identifies it. Its transmitter factor is exactly one, and its receiver factor is greater than $2/5$. A positive-delay self root would require chord length equal to elapsed time, contrary to the strict sub-wake path-length bound. Thus the census is thirty directed partner roots, zero positive-delay self roots, with no missing preparation or generated-history hits. Delays also obey the sphere upper bound $2R=20$.

The canonical acceleration on this chart is exactly the five fixed-source field

$$
\mathbf A_i(\mathbf X)=\sum_{j\ne i}\sigma_i\sigma_j\frac{\mathbf X-\mathbf p_j}{|\mathbf X-\mathbf p_j|^3}.
$$

This is the canonical stationary-source limit with transmitter factor one. It is not a replacement interaction law. Its magnitude is below $5/13^2<3/100$. The constrained equation on the sphere is

$$
\mathbf X_i''=(I-\mathbf n_i\mathbf n_i^{\mathsf T})\mathbf A_i-|\mathbf v_i|^2\mathbf n_i/10,
\quad \mathbf n_i=\mathbf X_i/10.
$$

Therefore $|\mathbf X_i''|<3/100+9/250=33/500$. Integration gives $||\mathbf v_i|-1/2|<33/5000$, which improves the speed bootstrap strictly. Smoothness of the fixed-source vector field away from its poles, tangency of the constrained state and the strict bounds close the ordinary local solution through $T=1/10$. It follows that these stationary candidates and all-root conclusions hold for an actual continuation. No future trajectory was prescribed. Simultaneous distinct-member separation exceeds $10\sqrt2-3/25>69/5$, so no collision threatens this interval.

## Release acceleration and exact first splitting

Let $a,b,c$ be distinct coordinate axes, and let $\mathbf n=\mathbf e_a$ for receiver $P_a$. Its antipodal opposite-polarity source contributes $-\mathbf n/(4R^2)$. The two signed sources on axis $b$ contribute $-\mathbf e_b/(\sqrt2R^2)$, and similarly for axis $c$. Thus

$$
\mathbf A_{P_a}(0)=-\frac{\mathbf e_a}{4R^2}-\frac{\mathbf e_b+\mathbf e_c}{\sqrt2R^2},\qquad
\mathbf A_{E_a}(0)=-\mathbf A_{P_a}(0).
$$

The radial component is $-1/(4R^2)$ for every receiver. The tangent component has magnitude $1/R^2$. Since support is normal,

$$
\frac{d}{dT}|\mathbf v_i|\bigg|_{0}=\mathbf d_i\cdot\mathbf A_i(0).
$$

For $P_x$, its cap direction is opposite to the tangent acceleration, giving $-1/R^2=-1/100$. For all five common-rotation directions the two tangent components cancel, giving zero. At release all six supports equal

$$
\lambda_i(0)=-\frac{1/4}{R}+\frac1{4R^2}=-9/400.
$$

This checks the radius factors independently: the centripetal term scales as $R^{-1}$ at fixed physical speed, and the stationary canonical contribution as $R^{-2}$.

For the first nonzero speed change in the other five members, put $W_i=|\mathbf v_i|^2$. On the smooth stationary-source chart, $W_i'=2\mathbf v_i\cdot\mathbf A_i$ and

$$
W_i''=2\mathbf X_i''\cdot\mathbf A_i+2\mathbf v_i^{\mathsf T}(D\mathbf A_i)\mathbf v_i.
$$

At the initial pole, paired transverse source axes contribute only mixed normal/tangent Jacobian entries: their tangent quadratic forms cancel because their polarities are opposite. The antipodal source contributes $-I/(8R^3)$ on the tangent plane. Hence, for every selected tangent direction,

$$
\mathbf v_i^{\mathsf T}(D\mathbf A_i)\mathbf v_i=-\frac1{32R^3},\qquad
\mathbf X_i''\cdot\mathbf A_i=\frac1{R^4}+\frac1{16R^3}.
$$

Consequently $W_i''(0)=2/R^4+1/(16R^3)=21/80000$ for all six. At initial speed one half, the speed second derivative is $W_i''-2(W_i')^2$. It is $1/16000$ for $P_x$ and $21/80000$ for the other five, yielding the opening Taylor formulas. Smooth fixed-source equations justify the right-side $O(T^3)$ remainders; no numerical fit or trajectory approximation establishes these coefficients.

## Which finite-interval equalities survive

The complete supplied directions break antipodal pairing on the x axis: $\mathbf v_{P_x}(0)+\mathbf v_{E_x}(0)=(0,0,1/\sqrt2)\ne0$. Thus positions do not remain a rigid octahedron and the whole solution cannot retain the old antipodal assembly symmetry. The y and z pairs remain antipodal on this interval because their independent fixed-source equations are conjugate under inversion with polarity exchange and have paired initial states.

For speed equality among the five unmodified members, use the same fixed-source conjugacies: cyclic coordinate permutations preserve the signed pole set and common-rotation directions; inversion exchanges polarities and maps the corresponding receiver field with the required sign. These transformations map any unmodified initial receiver problem to any other. They need not map the entire asymmetric six-member moving configuration to itself because, on this interval, each actual receiver equation samples only the stationary supplied poles. Uniqueness of those ordinary receiver equations makes the five speed norms identical. This limited decoupling ceases to be an available premise once nonstationary source history is received; no such later conclusion is made.

## Uniform inward normal support

The derivative of one inverse-square vector kernel has operator norm $2/r^3$. On each straight segment from the initial receiver pole to its displaced position, distance from every distinct fixed source stays above 13. Thus $\|D\mathbf A_i\|<10/13^3<1/200$ and

$$
|\mathbf A_i(T)-\mathbf A_i(0)|<3/10000.
$$

Also $|\mathbf n_i(T)-\mathbf n_i(0)|<3/500$ and $|\mathbf A_i(0)|=\sqrt{17}/400<11/1000$. Therefore

$$
|\mathbf n_i(T)\cdot\mathbf A_i(T)+1/400|
<3/10000+(3/500)(11/1000)=183/500000<1/2500.
$$

The radial canonical component lies in $(-29/10000,-21/10000)$. The earlier acceleration estimate places speed in $(49/100,51/100)$. Substituting these bounds into the exact support formula yields

$$
\lambda_i>-\frac{(51/100)^2}{10}+\frac{21}{10000}>-3/125,
\qquad
\lambda_i<-\frac{(49/100)^2}{10}+\frac{29}{10000}<-21/1000.
$$

The support is strictly inward for every receiver throughout the actual interval. Its equality across members at release does not imply equal later support. This is a constrained acceleration requirement, with no constitutive provider or mass-based interpretation.

## Independence, falsifiers and preservation

The reference was authored after freezing the exact configuration and before reading any new six-pole peer reference. It uses canonical signed kernel geometry and an ordinary stationary-history continuation argument, not another worker's result. Shared definitions and prior repository law remain shared premises. Analytical controls include the valid/invalid tangent directions, nonzero preparation value and derivative, stationary transmitter factor one, antipodal-source sign, and the path-length contradiction excluding self hits. Falsifiers are a failed direction or history control, a nonstationary emission on the claimed interval, incomplete causal census, wrong signed Jacobian/projection, loss of a bootstrap margin, or incorrect support scaling. A measured trajectory is neither produced nor required for this local derived claim.

Fresh direct `sed` reads rechecked `src/eom/include/architrino/eom/CoupledEvolution.hpp` lines 40–197, `src/eom/src/CoupledEvolution.cpp` lines 627–674 and 3380–3445, and the evolution contract lines 104–125. In those inspected request/construction fields, no normal-sphere support input is declared; canonical snapshot totals feed predictor histories and the contract excludes a future constraint curve as input. This is a scoped software observation, not a global absence or numerical capability claim. No EOM run, competing solver, scientific instrument/job, lease or extra agent was launched. All new evidence is analytical. Resource and replay costs remain unprofiled; local retention is not verified backup recovery. The admitted bundle preserves the input baseline and transport limitation. Only the new dynamics configuration and this reference are authored; every earlier frozen subject is preserved. Independent adjudication and coordinator integration are the next dependencies. Exploration cutoff remains 23:26:02 UTC and hard closeout 23:41:02 UTC; this bounded assignment does not select a successor.

Measured closing receipt: `shasum -a 256` matched the frozen plan `b66ecf15b903624c2007228f8613df59f52d40ae83378c6beee1c269da4b8b43` and exact configuration identity after the reference was authored. Scoped `git diff --no-index --check /dev/null` on the reference emitted no whitespace diagnostics; status one denotes the new-file difference. No renderer or target computation was run. Issued commands returned; no owned scientific job was launched and no global-idleness assertion is made. These source/identity checks are separate from mathematical acceptance. This is the frozen substantive checkpoint and completed bounded reference before new peer exposure.
