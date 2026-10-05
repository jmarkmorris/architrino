# Complete-history Cartesian scattering for the fixed uniform-memory law

## Result and scope

**Claim grade: derived candidate, requiring independent assessment.** The original canonical-plus-unit-uniform-memory law admits an explicit outgoing sufficient criterion for an opposite-polarity pair in three Cartesian dimensions. It uses the complete supplied field history, the full unit acceleration-memory window, current separation and velocities, and strict margins. Every compatible history satisfying the criterion has a unique global separated uniformly subfield future with distinct limiting Cartesian velocities and linearly growing pair separation.

The criterion is open relative to a declared complete-history speed class. Finite-prefix continuity transfers it to a neighborhood of any compatible launch that reaches it, including perturbations that need not preserve mirror symmetry or a plane. The terminal velocities vary continuously in that neighborhood.

Every already admitted uniformly subfield positive-speed mirror member of the original fixed memory family eventually reaches this outgoing criterion. This is a conditional application: the [new positive-occurrence source](alternatives-screen-2026-10-05-memory-positive-terminal-existence-independent.md) was still under independent assessment when this robustness argument was assigned. The general sufficient theorem and its conditional application do not assume that assessment's conclusion.

No instantaneous $2/3$ replacement of the memory is used. The proof uses the exact kernel mass to bound its entire future impulse, including the supplied acceleration transient. No center-of-mass conservation, angular-momentum conservation, mirror identity, plane, spectrum or event selector is invoked.

## Equation and complete input history at entry

Shift the finite entry time to $T=0$. Let $X_1,X_2:(-\infty,0]\to\mathbb R^3$ be complete separated locally $C^{2,1}$ histories, with velocities $V_i$ and accelerations $A_i$. Assume one supplied speed bound

$$
|V_i(S)|\le b_{\rm past}<1,\qquad S\le0,\quad i=1,2,
$$

and exact endpoint compatibility with the fixed equation

$$
A_i(T)=F_i(T)
-\int_0^1[V_i(T)-V_i(T-\vartheta)]\,d\vartheta.
$$

Here $F_i$ is the complete canonical ordinary self/partner acceleration with $K=c_f=1$, and the memory has $\lambda=\tau=1$. The pair has opposite polarity. Self reception is retained in the equation and will be excluded by complete subfield geometry on the constructed future.

The memory has two exact equivalent forms:

$$
H_i=-V_i(T)+X_i(T)-X_i(T-1)
=-\int_0^1(1-\vartheta)A_i(T-\vartheta)\,d\vartheta.
$$

Thus, with $k(\vartheta)=1-\vartheta$ on $[0,1]$,

$$
A_i+k*A_i=F_i,\qquad \|k\|_1=\frac12.
$$

The position-velocity form defines the ordinary causal evolution; the acceleration convolution is an identity for that same evolution. The complete supplied history fixes its old acceleration contribution. No independent acceleration initial datum is introduced.

Let

$$
d_0=|X_1(0)-X_2(0)|>0,\qquad
e=\frac{X_1(0)-X_2(0)}{d_0},\qquad
U=e\cdot[V_1(0)-V_2(0)].
$$

The vector $e$ remains fixed throughout the following estimates. It is not a moving radial unit vector. Require $U>0$, and choose two proof margins

$$
b_{\rm past}<b<1,\qquad 0<\sigma<U.
$$

Define the retained memory quantities and canonical root-bound constant

$$
J_i=\int_{-1}^{0}(1+s)^2|A_i(s)|\,ds,\qquad
C_b=\frac{(1+b)^2}{1-b},
$$

and the total impulse budgets

$$
\Lambda_i=J_i+\frac{2C_b}{\sigma d_0}.
$$

The sufficient criterion is

$$
|V_i(0)|+\Lambda_i<b\quad(i=1,2),\qquad
\Lambda_1+\Lambda_2<U-\sigma.
$$

All inequalities are strict. They are conservative sufficient conditions, not necessary conditions or optimized thresholds. They involve the actual unit memory history; small current acceleration alone is not substituted for that integral.

## All old field sources remain controlled

Provisionally suppose the complete joined history up to a future reception has speeds at most $b$. Let $d(T)=|X_1(T)-X_2(T)|$. For the partner source $S_i<T$ received by label $i$, write

$$
R_i=T-S_i=|X_i(T)-X_j(S_i)|,\qquad
N_i=\frac{X_i(T)-X_j(S_i)}{R_i},\qquad
D_i=1-N_i\cdot V_j(S_i),
\quad j\ne i.
$$

The partner residual in delay increases with monotonicity modulus at least $1-b$, starts at $-d(T)$ and tends to positive infinity. The remote-past assertion uses the complete supplied speed bound: $|X_j(T-u)|$ grows at most linearly with slope below one as $u\to\infty$. Thus there is exactly one positive partner root, including every possible old source.

The strict speed chord inequality excludes every positive-delay self root. The partner range and transmitter factor satisfy

$$
\frac{d(T)}{1+b}\le R_i\le\frac{d(T)}{1-b},
\qquad D_i\ge1-b.
$$

The range inequalities follow by comparing $X_j(S_i)$ with $X_j(T)$ across the complete interval. They do not require the source to be generated after entry.

For opposite polarity the canonical partner acceleration is $F_i=-N_i/(R_i^2D_i)$. Consequently

$$
|F_i(T)|\le\frac{C_b}{d(T)^2}.
$$

Only this norm bound is needed. The received directions need not be opposite, simultaneous, planar or aligned with the fixed vector $e$.

## Exact future impulse estimate with the supplied memory transient

For any finite generated interval $[0,L]$, the exact convolution identity gives

$$
|A_i(T)|\le |F_i(T)|
+\int_0^1(1-\vartheta)|A_i(T-\vartheta)|\,d\vartheta.
$$

Integrate over $T\in[0,L]$. The part with generated acceleration is at most one-half of $\int_0^L|A_i|$. The supplied negative-time contribution is bounded by

$$
\begin{aligned}
&\int_0^1\int_T^1(1-\vartheta)
|A_i(T-\vartheta)|\,d\vartheta\,dT\\
&\qquad=
\int_{-1}^0
\left[\int_{-s}^{1}(1-\vartheta)\,d\vartheta\right]
|A_i(s)|\,ds
=\frac12J_i.
\end{aligned}
$$

For $L<1$ the corresponding contribution is smaller. Rearrangement proves the exact conservative estimate

$$
\int_0^L|A_i(T)|\,dT
\le 2\int_0^L|F_i(T)|\,dT+J_i.
$$

The factor two is the absolute-value bound $(1-\|k\|_1)^{-1}$, not a claimed response coefficient. The signed asymptotic coefficient $2/3$ is neither assumed nor needed.

If the fixed-axis relative velocity satisfies

$$
e\cdot[V_1(T)-V_2(T)]\ge\sigma,
$$

then $e\cdot[X_1(T)-X_2(T)]\ge d_0+\sigma T$, and hence $d(T)\ge d_0+\sigma T$. Therefore

$$
\int_0^\infty |F_i(T)|\,dT
\le\frac{C_b}{\sigma d_0},
$$

as long as the provisional chart survives. The preceding finite-interval identity yields $\int_0^L|A_i|\le\Lambda_i$ on every such interval, without discarding any old field source or old memory sample.

## Closing the Cartesian outgoing chart and ordinary continuation

Start with the provisional inequalities $|V_i|\le b$ and $e\cdot(V_1-V_2)\ge\sigma$. The impulse bounds imply

$$
|V_i(T)|\le |V_i(0)|+\Lambda_i<b,
$$

and

$$
e\cdot[V_1(T)-V_2(T)]
\ge U-\Lambda_1-\Lambda_2>\sigma.
$$

Thus neither boundary can be the first loss of the chart. In particular $d(T)\ge d_0+\sigma T>0$, so no collision precedes it. These estimates close simultaneously, rather than assuming that separation has already become linear.

There is also no hidden finite ordinary endpoint. On each finite interval, position is bounded by the speed ceiling, separation has the positive floor $d_0$, partner delay has floor $d_0/(1+b)$, and transmitter factor has floor $1-b$. The complete past bound puts all partner sources in one finite preceding interval. The unit memory requires only the additional retained interval of length one.

The acceleration remains bounded. Indeed, the exact convolution and a running-supremum argument give

$$
\sup_{[-1,L]}|A_i|
\le\max\left\{
\sup_{[-1,0]}|A_i|,\,
2\sup_{[0,L]}|F_i|
\right\}
\le
\max\left\{\sup_{[-1,0]}|A_i|,\frac{2C_b}{d_0^2}\right\}.
$$

The retained source velocities are locally Lipschitz, and the implicit root estimate is locally Lipschitz on these margins. The exact position-velocity memory formula adds a current linear term and a fixed old position sample. Ordinary steps shorter than the partner delay floor and the unit memory delay therefore extend the solution. Complete-history compatibility gives the initial ordinary solution, and these bounds continue it uniquely for all future time.

## Cartesian scattering and its quantitative remainder

Letting $L\to\infty$ in the impulse estimate gives $A_i\in L^1([0,\infty))$. Consequently

$$
V_i(T)\to V_{i,\infty},\qquad
|V_{i,\infty}-V_i(0)|\le\Lambda_i,
$$

and

$$
e\cdot(V_{1,\infty}-V_{2,\infty})
\ge U-\Lambda_1-\Lambda_2>\sigma.
$$

The terminal velocities are distinct and the pair separates linearly. Integrating the velocity limits gives

$$
X_i(T)=V_{i,\infty}T+o(T),\qquad
d(T)\sim|V_{1,\infty}-V_{2,\infty}|T.
$$

Individual terminal velocity need not be nonzero for an arbitrary history satisfying the criterion; positive relative terminal velocity is guaranteed.

A stronger remainder follows directly from the exact memory equation. Choose a finite $T_1\ge1$ so $d_1=d_0+\sigma T_1\ge4\sigma$, and put $w(T)=(d_0+\sigma T)^2$ for $T\ge T_1-1$. For $T\ge T_1$ and $0\le\vartheta\le1$,

$$
\frac{w(T)}{w(T-\vartheta)}
\le\left(\frac{d_1}{d_1-\sigma}\right)^2
\le\frac{16}{9}.
$$

Multiplying the absolute-value convolution by $w(T)$ therefore gives a weighted memory norm at most $8/9<1$, while $w(T)|F_i(T)|\le C_b$. The initial weighted acceleration on $[T_1-1,T_1]$ is bounded. A running-supremum estimate gives a finite constant

$$
C_i=\max\left\{\sup_{[T_1-1,T_1]}w(T)|A_i(T)|,\ 9C_b\right\}
$$

such that

$$
|A_i(T)|\le\frac{C_i}{(d_0+\sigma T)^2},\qquad T\ge T_1.
$$

This bound includes all memory transients through their retained weighted initial value. It implies

$$
|V_i(T)-V_{i,\infty}|
\le\frac{C_i}{\sigma(d_0+\sigma T)},
$$

and

$$
X_i(T)=V_{i,\infty}T+O(\log(2+T)).
$$

No finite asymptotic position intercept is claimed. The logarithmic bound follows by integrating the displayed velocity error, without assuming a central asymptotic orbit or replacing the filter by a local response.

## Relative openness for complete three-dimensional histories

Fix a supplied speed ceiling $b_{\rm past}<b$. Consider the class of complete separated locally $C^{2,1}$ compatible histories satisfying that ceiling, with convergence in $C^2$ on every compact old-time interval. The outgoing quantities $d_0,e,U$ and $J_i$ depend continuously on the histories in this topology: the first three use endpoint positions and velocities, and $J_i$ uses only the compact unit acceleration window.

The strict criterion is therefore open relative to this complete-history class. Arbitrarily distant old paths need not converge uniformly in position or phase. Their uniform speed ceiling is the retained global condition that excludes remote extra roots and supplies the same root bounds. This distinction matters for complete circular tails, whose phases need not converge uniformly over infinite old time when their frequency changes.

At any finite future time, nearby histories with this common complete-past ceiling have all accessible partner sources in a common compact old interval. On it, implicit-root displacement is bounded by the positional discrepancy divided by the transmitter margin; bounded source acceleration controls displaced velocity evaluation. The exact memory samples add at most one unit to the required retained interval. Integral difference estimates on successive causal steps give finite-prefix continuity of positions, velocities and accelerations.

In a sufficiently small neighborhood of a strict outgoing history, choose common slightly weakened $\sigma$ and speed margin and a common positive lower separation. The acceleration-memory data and all finite-prefix acceleration bounds are locally bounded. The weighted late estimate above then has a locally uniform constant. Splitting terminal velocity into a finite prefix plus its uniformly small tail proves that $V_{i,\infty}$ depends continuously on the complete history in this neighborhood.

No symmetry constraint appears in this class or proof. Compatible nonmirror and noncoplanar perturbations are allowed. Compatibility is a genuine constraint, so openness is stated relative to compatible histories rather than to arbitrary endpoint jets.

For clarity, this compatible class has small nonsymmetric perturbations. Start with a small three-dimensional compact-history perturbation retaining the speed and separation margins. Choose a short final patch width less than one and less than every release partner delay. A polynomial correction with zero value and first derivative at release, second derivative one there, and zero jets through second order at its old seam can correct each endpoint acceleration by the discrepancy from the actual received law. The partner sources and the memory sample at time $-1$ lie outside that patch, while current position and velocity are unchanged by the correction. Its coefficient therefore enforces compatibility exactly without a new fixed-point problem. Taking the original perturbation small preserves the strict margins and the outgoing criterion. This construction supplies admissible perturbations; it changes neither the selected equation nor the original family.

## Every admitted positive-speed mirror member eventually qualifies

Condition on a fixed member of the original memory circle-tail family having its admitted global uniformly subfield future and positive terminal speed $V_*>0$. Its positions are $q,-q$, with

$$
q'(T)\to V_*n_\infty,\qquad
q(T)/T\to V_*n_\infty.
$$

At a late entry time $T_0$, take $e=q(T_0)/|q(T_0)|$. Then

$$
d_0=2|q(T_0)|\to\infty,\qquad
U=2e\cdot q'(T_0)\to2V_*.
$$

Choose a fixed $\sigma$ with $0<\sigma<2V_*$ and a fixed $b<1$ strictly above the member's complete supplied-and-generated speed bound. Both the individual speed margins and $U-\sigma$ are then positive for sufficiently late entry.

It remains to control the entire unit acceleration-memory window, not merely the terminal velocity. The canonical forcing tends to zero by the complete root bounds and diverging separation. It is globally bounded, and the exact convolution plus the bounded supplied unit acceleration gives a global acceleration bound $M_A$.

For every fixed integer $N$, iterate the exact identity at a sufficiently late physical time:

$$
A_i(T)=\sum_{j=0}^{N-1}(-1)^j(k^{*j}*F_i)(T)
+(-1)^N(k^{*N}*A_i)(T).
$$

Each convolution has support in $[0,j]$ and mass $2^{-j}$. The finite sum tends to zero as $T\to\infty$, while the last term is at most $2^{-N}M_A$. Letting first $T\to\infty$ and then $N\to\infty$ proves $A_i(T)\to0$. This argument keeps the exact memory and its old contribution; it does not infer acceleration decay solely from a velocity limit.

Thus the entry quantities

$$
J_i(T_0)=
\int_{T_0-1}^{T_0}(1+s-T_0)^2|A_i(s)|\,ds
$$

tend to zero. Also $2C_b/(\sigma d_0)\to0$. Therefore all strict outgoing inequalities hold at sufficiently late finite entry. This proves qualification of each such positive-speed member without selecting a numerical entry time or launch parameter.

Finally, take a slightly larger complete-past speed ceiling than this base member's global bound, still below $b$. Finite-prefix continuity from its original launch keeps nearby compatible nonmirror/noncoplanar histories within the ordinary domain through the chosen entry and preserves the strict outgoing inequalities there. The theorem then continues those perturbed histories globally. Terminal-velocity continuity also keeps both individual terminal magnitudes positive for a sufficiently small neighborhood of the original nonzero mirror limits.

Existence of a positive member in the original family can be supplied by an independently admitted positive-occurrence theorem. Until that premise is admitted, this last application remains conditional. The quantitative outgoing criterion itself is independent of that premise.

## Falsifiers, exclusions and source identities

The criterion is refuted by an extra root under the complete subfield hypothesis, failure of the all-old-source range inequality, an incorrect supplied-memory weight in the integrated convolution, or a trajectory losing its speed or fixed-axis separation margin despite the strict impulse budgets. A finite ordinary endpoint with all displayed compact-history margins intact would invalidate continuation. Failure of the weighted convolution contraction would invalidate the stated velocity and position remainder bounds.

For robustness, the decisive failure would be loss of finite-prefix continuity on the declared complete-history speed class, or lack of a locally uniform late impulse bound. For the conditional mirror application, acceleration decay is separately proved from the exact filter; its failure would have to contradict that finite-iteration and geometric-tail argument.

The theorem does not cover a supplied superfield segment, omitted remote history, a modified memory kernel, arbitrary additional particles, a finite-time unit-speed arrival, or post-event continuation. It proves scattering relative to distinct terminal Cartesian velocities, not a conserved center of mass, a plane, an angular-momentum law or finite position intercepts.

Source identities measured with shasum -a 256 before authoring:

| Source | SHA-256 |
| --- | --- |
| [Canonical root-weight owner](../../../../../content/markdown/aaa/dynamics/master-equation.md) | 8a106d615611efe5b6baf8705a47f03edcf53ffe13d7998fb7af86432c139f7f |
| [Original memory equation and complete preparation](alternatives-screen-2026-10-05-memory-formulation.md) | e77ae06dccda7f06f0f11302d0d50dd270be5192b88f989d3e3cfa3424103d3a |
| [Admitted-form memory global theorem](alternatives-screen-2026-10-05-memory-global-dispersal.md) | b8066d75120561fe0ded282d6ccc34a9f525d7e526dd1073696b0f13d2936a71 |
| [Positive-occurrence candidate, used only conditionally](alternatives-screen-2026-10-05-memory-positive-terminal-existence-independent.md) | df3617b3d8429d75e6af2f364ecc01f33171be0c1b12d648b89cf8ad74be6819 |

Validation is analytical: complete residual monotonicity, the two-sided range inequality, exact old-memory integral, simultaneous strict bootstrap, weighted kernel contraction and finite-prefix continuity are explicit above. No numerical target, executable checker, Python process, background computation or local-memory substitution is used. Only this new scattering source is authored; antecedents and shared owners remain unchanged. Scoped whitespace and final source hashes are checked after creation.
