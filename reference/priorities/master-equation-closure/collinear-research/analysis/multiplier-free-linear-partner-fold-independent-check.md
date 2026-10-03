# Independent coupled check of the inherited partner fold

The corrected linear delayed law admits a unique local transit through the first inherited partner fold under the explicit hypotheses below. Velocity remains continuous, acceleration is locally integrable, and the two folding partner roots disappear because their causal equation has no solution on the far side. They are not suppressed by an event rule. This is a **derived conditional local theorem**, not certification that the exact selected release reaches this event or any later numerical turn.

This derivation was completed without consulting numerical trajectory states for the fold. Its inputs are the [complete selected law](multiplier-free-linear-delayed-comparison.md#preparation-and-complete-law), the [local self-birth theorem](multiplier-free-linear-independent-check.md#local-coupled-continuation-through-a-transversal-self-birth), and the causal-root conventions in the [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md). Wake speed is $c_f=1$. The only selected spatial modification is the signed linear numerator with coefficient $k>0$. No receiver multiplier, cap, smoothing length, root exclusion or event impulse is introduced.

## History, complete ledger and local hypotheses

The persistent opposite-polarity pair has positions $x(T)$ and $-x(T)$, signed velocity $v=x'$, and maps $P(S)=S+x(S)$, $Q(S)=S-x(S)$. A positive-distance partner root solves $P(S)=Q(T)$, has $d=x(T)+x(S)=T-S>0$, and contributes

$$
-k\frac{T-S}{|P'(S)|}.
$$

Every other partner and self root remains included according to the complete law. The absolute denominator makes the two folding terms have the same sign, although their source-map orientations differ.

Let $S_*$ be the first negative wake-speed crossing, where the preceding self-birth theorem gives $v(S_*)=-1$ and a continuous velocity with unequal acceleration traces $-B$ and $-b$, $B,b>0$. Thus $P$ has a local maximum $P_*=P(S_*)$ with one-sided expansions

$$
P(S_*+s)=P_*-\frac12Bs^2+O(|s|^3)\quad(s<0),\qquad P(S_*+s)=P_*-\frac12bs^2+O(s^3)\quad(s>0).
$$

The folds inherit those two curvatures; replacing both by one smooth curvature loses the coefficient of the singular acceleration. Assume the source history is fixed and one-sided $C^3$ near $S_*$, with its corresponding one-sided derivative expansions. More generally the proof needs the source branches to have the differentiability needed for the regularized functions below to be locally Lipschitz.

Consider an incoming reception interval ending at $T_f>S_*$ with $Q(T)\uparrow P_*$. Require:

1. **Separated source data:** the two folding emission times and every remaining root lie at least a fixed positive delay before reception. All source data used in a sufficiently small reception neighborhood consequently belong to the already determined history.
2. **Transverse receiver crossing:** $w(T)=1-v(T)\geq\epsilon>0$ on the incoming neighborhood. The receiver crosses the fold level rather than becoming tangent to it.
3. **Regular remaining roots:** their source denominators stay bounded away from zero, their displacement signs stay fixed, and their total signed acceleration $R(T,X)$ is bounded and locally Lipschitz in receiver time and position on the tube of interest. This allows piecewise smooth past source data with bounded local variation.
4. **Complete census:** immediately before the event there are exactly three partner roots and one self root. Exactly two of these are the positive-distance roots near $S_*$. The other partner root and the self root persist regularly. Every inactive monotone sector of $P,Q$ has a positive gap from its receiver target, the held tail is included, and no other event occurs simultaneously.
5. **Bounded reception tube:** reception time and position remain in a finite tube where the preceding hypotheses hold as $Q\uparrow P_*$. No assertion of a globally complete ledger is inferred from the local fold expansion alone.

The complete census and its inactive gaps are a hypothesis to verify from the full selected history. They are not a conclusion of a two-root local calculation. The theorem proves that this ledger changes from three partner roots and one self root to one partner root and one self root. It does not prove that some uninspected history has this ledger.

## Resolving both source branches

Put $\delta=P_*-Q(T)>0$ and $r=\sqrt{\delta}$. The two source branches satisfy $P(S_\pm(r))=P_*-r^2$, with

$$
S_-(r)=S_*-\sqrt{2/B}\,r+O(r^2),\qquad S_+(r)=S_*+\sqrt{2/b}\,r+O(r^2).
$$

To check their regularity rather than relying only on these expansions, write $P_*-P(S_*+s)=s^2h_\pm(s)$ on either side, where $h_-(0)=B/2$, $h_+(0)=b/2$ and each $h$ is positive and continuously differentiable. The map $r=|s|\sqrt{h_\pm(s)}$ has a nonzero one-sided derivative at zero and therefore a locally continuously differentiable inverse with bounded derivative. The corresponding denominator has

$$
|P'(S_-(r))|=\sqrt{2B}\,r+O(r^2),\qquad |P'(S_+(r))|=\sqrt{2b}\,r+O(r^2).
$$

The total magnitude of the folding acceleration and its regularized version are

$$
A_f(r,T)=k\left(\frac{T-S_-(r)}{|P'(S_-(r))|}+\frac{T-S_+(r)}{|P'(S_+(r))|}\right),\qquad G(r,T)=rA_f(r,T).
$$

The quotients $r/|P'(S_\pm(r))|$ extend continuously and locally Lipschitz to $r=0$ under the stated source regularity. Thus $G$ does also, with

$$
G(0,T)=\frac{k(T-S_*)}{\sqrt2}\left(\frac1{\sqrt B}+\frac1{\sqrt b}\right).
$$

In particular define $C_f=G(0,T_f)>0$. The two roots reinforce. A signed-orientation cancellation would change the selected law and is barred here.

## Coupled incoming dynamics in the square-root coordinate

On the incoming side the full acceleration is $v'=R(T,x)-A_f(r,T)$. The receiver relation gives $\delta'=v-1=-w$, hence $dr/dT=-w/(2r)$. Since $Q=T-x=P_*-r^2$, position is exactly $x=T-P_*+r^2$. The coupled system becomes

$$
\frac{dT}{dr}=-\frac{2r}{1-v},\qquad \frac{dv}{dr}=\frac{2\left[G(r,T)-rR(T,T-P_*+r^2)\right]}{1-v}.
$$

These equations evolve the receiver as well as its fold distance; they do not insert a prescribed path into a fixed-source integral. Both right sides are locally Lipschitz in $T,v$ at $r=0$ when $1-v$ has a positive lower bound. Their explicit dependence on $r$ is regular. Successive integration on a sufficiently small interval is a contraction because the integral length multiplies a bounded Lipschitz constant. This proves existence and uniqueness of the incoming extension to $r=0$ from any nearby incoming state within the tube.

The endpoint velocity is finite rather than an additional uncontrolled assumption. In the incoming tube $G$ and $R$ are bounded and $1-v\geq\epsilon$; the displayed equations therefore bound both $dT/dr$ and $dv/dr$ on the finite $r$ interval. They have finite limits $T_f,v_f$ at $r=0$, with $w_f=1-v_f\geq\epsilon$. The right side at the endpoint gives

$$
v(r)=v_f+\frac{2C_f}{w_f}r+O(r^2),\qquad T(r)=T_f-\frac{r^2}{w_f}+O(r^3).
$$

The receiver-time asymptotics follow by inversion:

$$
v(T)=v_f+\frac{2C_f}{\sqrt{w_f}}\sqrt{T_f-T}+O(T_f-T),\qquad
v'(T)=-\frac{C_f}{\sqrt{w_f}}(T_f-T)^{-1/2}+O(1).
$$

The singular acceleration is locally integrable and the velocity loss over the final incoming window of width $\eta$ is $2C_f\sqrt{\eta/w_f}+O(\eta)$. In particular it vanishes as the window shrinks. There is no finite atom at $T_f$ and no velocity jump to choose.

## Unique outgoing transit and root transition

For $Q>P_*$ the source maximum has no nearby solutions to $P(S)=Q$. The two local roots are absent because the arrival equation has no roots there. The regular partner and self roots remain by hypothesis, and the inactive-sector gaps exclude additional births. Solve the full remaining equation

$$
x'=v,\qquad v'=R(T,x),\qquad (x(T_f),v(T_f))=(T_f-P_*,v_f).
$$

The bounded locally Lipschitz function $R$ gives a unique short outgoing solution by the same integral contraction. By continuity its $Q'=1-v$ remains positive near $T_f$, so it lies on the required $Q>P_*$ side and cannot immediately re-enter the two-root domain. Positive delays let the small outgoing interval use already fixed source history for all remaining roots; this is an actual method-of-steps argument, not replacement of unknown source data by a frozen rule.

Joining incoming and outgoing solutions gives $x\in C^1$ and locally absolutely continuous velocity, satisfying the complete law almost everywhere. Incoming acceleration is unbounded but integrable; outgoing acceleration has a finite trace. The divergent root expression at the single fold instant is interpreted by this integrable transit, consistently with the Master Equation's ordinary caustic-transit convention. No pointwise infinite acceleration is assigned as an enduring state.

Uniqueness also holds across the joining event in this class. Any continuous-velocity, locally absolutely continuous solution with the same full past has the same incoming square-root evolution and endpoint. Its positive $Q'$ forces the same outgoing root census and the same regular outgoing initial-value problem. A velocity jump would require an acceleration atom, which this law's local fold integral does not supply. An arbitrary waiting interval at $Q=P_*$ would contradict $Q'>0$. Neither is an alternative within the theorem's solution class.

## Verdict, limits and falsifiers

| Question | Derived answer under the hypotheses |
| --- | --- |
| Do unequal source curvatures invalidate ordinary square-root transit? | No. They change its coefficient to $k(T_f-S_*)(B^{-1/2}+b^{-1/2})/\sqrt2$; both roots remain included. |
| Is fixed-path integrability the only result? | No. The regular square-root receiver system proves a unique coupled incoming endpoint, and the regular outgoing equation proves a unique short continuation. |
| What happens to the complete local ledger? | Three partner roots and one self root become one partner root and one self root; exactly the two fold roots lose real causal solutions. |
| Does the event require a new physical law? | No. It uses the selected linear numerator and every existing absolute transmitter weight. |
| Is a genuine obstruction established? | No, under these hypotheses. Degenerate or simultaneous events outside them remain unresolved. |
| What geometry advances? | Conditional short local evolved transit through this inherited fold is established. The exact selected-release fold location and subsequent braking, turn or return are not certified by this theorem. |

The theorem does not cover receiver tangency $1-v_f=0$, zero source curvature, simultaneous source and reception events, zero delay, another grazing root, a root accumulation, uncontrolled inactive-sector gaps, or a characteristic source interval. It also does not establish globally unique generalized solutions outside the continuous-velocity, locally integrable class. A numerical candidate is not promoted merely because this theorem identifies its possible local mechanism; its complete historical hypotheses must be checked independently.

Operator-checkable falsifiers are: a different singular coefficient with these same one-sided curvatures and absolute weights; a nonintegrable incoming acceleration while the stated transversality and bounded-numerator conditions hold; two distinct continuous-velocity local transits with the same full history and the stated regular-root/gap hypotheses; or another admitted root in a sector claimed to have a positive gap. Inspect $P(S)=Q(T)$ on both sides of $S_*$, all other monotone $P,Q$ sectors, the complete held tail, source Jacobians and receiver $Q'$. Finding a violated hypothesis withdraws application to that trajectory; it does not refute the conditional theorem.

Only this new report was written for the fold assignment. No numerical trajectory, script, historical proof or production path was changed. Source targets were checked by filesystem existence, and whitespace validation used `git diff --check` for this report; those document checks are separate from the analytical proof.
