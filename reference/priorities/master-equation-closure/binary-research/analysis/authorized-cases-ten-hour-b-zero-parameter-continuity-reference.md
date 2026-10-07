# Terminal continuity at a hypothetical zero-speed parameter

**Independent analytical reconstruction, frozen before reading the separately assigned subject.** The accepted results do not yet prove continuity of the physical terminal vector at a hypothetical zero-speed parameter. They reduce that question exactly to locally uniform escape from bounded radii. This note proves that equivalence and a quantitative conditional obstruction: a sequence of arbitrarily late returns to one fixed radius would produce a nonzero terminal-speed gap. It does not prove that such a sequence, or any zero-speed member, exists in the admitted family.

The family remains the exact complete compatible preparation with $0<\epsilon\le e_0=2^{-200000}$, the amplitude-gradient equation, $K=c_f=1$, fixed cutoff, compatible degree-five jets, two mirror labels, and the original ordinary-root rule. No history, response, source, or equality convention is changed. The claims below are derived from the accepted all-future theorem and actual finite-prefix continuity; they are not numerical findings or a construction of an alternative dynamics.

## Accepted premises and the time normalization

Use the [exact case](authorized-cases-ten-hour-b-case.md), [quantitative adjudication](authorized-cases-ten-hour-reference-b-adjudication.md), and [finite-prefix continuity reconstruction](authorized-cases-ten-hour-b-positive-parameter-continuity-reference.md). Write

$$
X_\epsilon(T)=\frac{y_\epsilon(s)}{4\epsilon^2},
\qquad s=4\epsilon^3T,\qquad
r=|y|,\quad v=y',\quad p=r',\quad h=y\times v.
\tag{1}
$$

The physical terminal vector is $V_\infty(\epsilon)=\epsilon v_\infty(\epsilon)$. Primes on scaled quantities refer to $s$. Fix a hypothetical admitted parameter $\epsilon_*>0$ with $v_\infty(\epsilon_*)=0$, and restrict nearby parameters to a relative interval with fixed bounds $0<a\le\epsilon\le b\le e_0$. This is a neighborhood away from the excluded endpoint zero.

For every finite scaled $S$, the actual histories vary continuously in $C^2$ on their common required completed interval. That result was obtained by positive-delay steps, retaining source acceleration and using base-history jerk to transport its evaluation point. It was not inferred from analyticity of a finite coefficient chart. All histories are the original complete histories. The accepted all-future theorem gives $r>r_*=2^{-13}$, physical speeds below $1/8$, one ordinary partner root, and no positive-delay self root.

Before the first exact ballistic-tail entry, the accepted estimates give

$$
|v|^2r\le32^2,\qquad
\mathcal E=\frac{|v|^2}{2}-\frac1r-
\frac{\epsilon^2h^2}{2r^3}-\frac{4\epsilon^3p}{3r^2},
\qquad
\mathcal E'>\frac{\epsilon^3}{r^4}.
\tag{2}
$$

Here $\mathcal E$ is an auxiliary account, not physical energy. The bound applies across the nonpositive stage and the accepted finite positive-account passage; it is not continued into the ballistic tail. If the account never becomes positive, the accepted theorem gives $r\to\infty$, $v\to0$. If it becomes positive, the same actual solution reaches a finite outward entry $t_\epsilon$ with

$$
r_t\mathcal E_t=128,\qquad
r_tp_t^2\ge257,\qquad r_t|v_t|^2<259.
\tag{3}
$$

After entry, the exact delayed acceleration and radial inequalities give

$$
|y''|\le\frac{16}{r^2},\qquad
p\ge\frac{p_t}{\sqrt2}>0,\qquad
|v_\infty|<\frac{19}{\sqrt{r_t}},
\qquad
|v_\infty|^2\ge\frac{257}{2r_t}>\mathcal E_t.
\tag{4}
$$

The last lower bound follows by taking the limit of $|v|\ge p_t/\sqrt2$ and using (3). The upper bound is the accepted entry speed below $17/\sqrt{r_t}$ plus the integrated exact tail change below $2/\sqrt{r_t}$. Both use the full source-window transition already proved in the quantitative adjudication.

## The missing statement, with exact quantifiers

Consider the following property at $\epsilon_*$:

$$
\begin{gathered}
\text{For every finite }R>0\text{ there are a finite }S_R
\text{ and a relative parameter neighborhood }U_R\ni\epsilon_*\\
\text{such that }r_\epsilon(s)>R
\quad\text{for every }\epsilon\in U_R\text{ and every }s\ge S_R.
\end{gathered}
\tag{5}
$$

This is local uniform escape from bounded radii. Pointwise dispersal, which is already accepted for every parameter, has the opposite order of parameter and time quantifiers and does not imply (5).

**Derived reduction:** under the accepted premises above, physical terminal-vector continuity at a hypothetical zero-speed parameter $\epsilon_*$ is equivalent to (5). Thus (5), or an estimate implying it, is an exact remaining uniform-tail obligation. The proof of both directions follows.

## Uniform escape implies continuity

Take $R$ large and choose $S_R,U_R$ from (5). Enlarge $S_R$ to a finite $S$ so that $|v_{\epsilon_*}(S)|$ is as small as desired; this is possible because the base member has zero terminal velocity. Finite-prefix continuity permits shrinking $U_R$ so that every $|v_\epsilon(S)|$ is correspondingly small.

For a neighboring zero-speed member, $v_\infty(\epsilon)=0$ already. For a positive member whose exact tail entry occurs after $S$, (5) and (4) give

$$
|v_\infty(\epsilon)|<\frac{19}{\sqrt R}.
\tag{6}
$$

For a positive member already in its exact tail at $S$, equations (3)–(4) imply

$$
|v_\epsilon(S)|\ge\sqrt{\frac{257}{2r_t}},
\qquad
|v_\infty(\epsilon)|
<\frac{19\sqrt2}{\sqrt{257}}|v_\epsilon(S)|
<2|v_\epsilon(S)|.
\tag{7}
$$

Consequently, for all nearby parameters,

$$
|V_\infty(\epsilon)|
\le b\max\left\{2|v_\epsilon(S)|,\frac{19}{\sqrt R}\right\}.
\tag{8}
$$

First choose $R$ and then the finite time and neighborhood. The right side can be made arbitrarily small. Since $V_\infty(\epsilon_*)=0$, this proves continuity of the full vector, without needing any angular-limit continuity.

This proof does not incorrectly assert a uniform positive lower radial speed across the zero member. In particular, the constants from positive-branch openness may degenerate as that member is approached. Instead (7) handles members that entered early, while (6) handles arbitrarily late entry at a uniformly large radius.

## A late fixed-radius return creates a terminal-speed gap

Suppose (5) fails. Then for some fixed radius $R_0$, there are $\epsilon_j\to\epsilon_*$ and $s_j\to\infty$ such that $r_{\epsilon_j}(s_j)\le R_0$. Enlarge the fixed radius to $R=\max(1,R_0)$; failure remains. For each $j$, let

$$
M_j=\max_{0\le s\le s_j}r_{\epsilon_j}(s).
\tag{9}
$$

Finite-prefix continuity and $r_{\epsilon_*}(s)\to\infty$ imply $M_j\to\infty$: for any fixed large value choose one finite base reception exceeding that value, then use its parameter-continuous radius and $s_j$ eventually beyond it. For large $j$, a maximizing reception $\sigma_j$ is interior because $r(0)=1$ and $r(s_j)\le R<M_j$. Thus $p(\sigma_j)=0$.

Let $\tau_j>\sigma_j$ be the first subsequent reception with $r(\tau_j)=R$. Such a reception exists by continuity. There cannot have been an exact tail entry at or before $\sigma_j$, because the tail radius is strictly increasing; nor can an entry lie between $\sigma_j$ and $\tau_j$, because its radius would exceed $R$ and would then increase forever. Hence the whole interval $[\sigma_j,\tau_j]$ lies in the accepted pre-tail chart (2).

At the outer maximum, $p=0$ and $h^2\le r^2|v|^2\le1024r$, so the account obeys

$$
\mathcal E(\sigma_j)
\ge-\frac1{M_j}-\frac{512b^2}{M_j^2}.
\tag{10}
$$

The right side tends to zero. No sign of the account at the maximum is assumed. Now take the last crossing $\alpha_j$ of $2R$ before $\tau_j$. On $[\alpha_j,\tau_j]$, the radius stays in $[R,2R]$; radial monotonicity is unnecessary. The speed bound in (2) gives $|p|\le32/\sqrt R$, so the elapsed crossing time is at least $R^{3/2}/32$. Equation (2) therefore yields

$$
\begin{aligned}
\mathcal E(\tau_j)-\mathcal E(\alpha_j)
&\ge\frac{a^3}{(2R)^4}(\tau_j-\alpha_j)\\
&\ge\frac{a^3}{512R^{5/2}}.
\end{aligned}
\tag{11}
$$

Account increase from $\sigma_j$ to $\alpha_j$, together with (10), implies that for all sufficiently large $j$,

$$
\mathcal E(\tau_j)\ge
\delta_R:=\frac{a^3}{1024R^{5/2}}>0.
\tag{12}
$$

Each such member consequently has a positive terminal branch. Its account continues to increase only until its own tail entry, which is enough: $\mathcal E_t\ge\delta_R$. The accepted lower bound (4) gives the fixed physical gap

$$
|V_\infty(\epsilon_j)|
>a\sqrt{\delta_R}>0.
\tag{13}
$$

Thus failure of (5) implies failure of terminal continuity at the hypothetical zero member. Conversely, continuity rules out the sequence and hence implies (5), completing the equivalence.

The argument establishes an implication about any actual returning parameter sequence. It does not construct one. It also covers a member that has crossed to positive account while still incoming: the accepted pre-tail passage retains account increase and the same speed chart until the outward tail entry. There is no assumption that positive account immediately makes the radius increase.

## Source windows, scaling, and what is still unproved

All inequalities above concern the original complete-history solutions. Their clocks satisfy $s-s_d=\epsilon L$, $(16/9)r\le L\le(16/7)r$, source-segment radii between $5r/7$ and $9r/7$, and $D\ge7/8$. The source clock increases from a value greater than $-3\epsilon$. Finite-prefix continuity includes the common required past down to $-3b$, retaining the fixed older preparation for the global root census. No return argument changes that past or applies the generated equation to it.

At every return reception the full source segment remains part of the accepted pre-tail estimates. At a positive tail entry the source may precede its own tail entry; that case belongs to the already accepted complete transition estimate, not to an assumption that both reception and source are outgoing simultaneously. The present reduction neither requires nor claims a new all-future acceleration-integral bound on the neighboring zero-speed branches.

Because $a\le\epsilon\le b$, scaled local uniform escape (5) is equivalent to physical local uniform escape. In one direction, given a physical radius $L$, take $R=4b^2L$ and the physical time $S_R/(4a^3)$. In the other, given a scaled radius $R$, take physical radius $R/(4a^2)$ and scaled time $4b^3T_R$. These comparisons retain both the parameter-dependent length and time factors in (1). The speed gap (13) is explicitly physical.

The [zero-branch phase correction](authorized-cases-ten-hour-b-zero-branch-phase-correction.md), with its [independent adjudication](authorized-cases-ten-hour-reference-b-zero-branch-adjudication.md), bounds $h$ and the total angular advance along an individual hypothetical zero branch. Those are pointwise branch results. Their constants and finite angular horizon do not by themselves exclude a nearby trajectory following that branch for longer and longer times, turning at larger and larger radii, and returning to a fixed radius. Likewise, positive-branch openness controls a neighborhood of a positive member; it supplies no uniform neighborhood across this zero branch.

The missing assertion is therefore (5), not finite-prefix continuity of the neutral/history flow. That finite-prefix continuity has already been proved with actual source acceleration. A valid future closure could prove (5) directly, or establish a common outgoing radius barrier preserved by all nearby complete histories. Merely knowing $r_\epsilon\to\infty$ separately for each $\epsilon$, or integrating $16/r^2$ without a uniform radial lower-growth bound, does not close the question.

No existence or nonexistence of zero-speed parameters, no actual return sequence, no discontinuity, and no zero-speed continuity theorem is established here. The independently checkable new result is the equivalence and conditional quantitative return obstruction.

## Validation, provenance, and closure

Analytical controls are the exact annular crossing estimate in (11), the finite arithmetic comparison $19\sqrt2/\sqrt{257}<2$, and differentiation of the physical scale in (1). No new computational instrument, numerical trajectory, symbolic target, Python process, or long-running job was used. Existing frozen subjects and references were not edited.

Falsifiers for the reduction are precise: failure of the accepted speed/account bounds on an incoming pre-tail passage invalidates (10)–(12); a tail that can turn inward invalidates the placement of $\tau_j$ before entry; loss of actual finite-prefix continuity invalidates $M_j\to\infty$; or failure of the terminal upper/lower bounds in (4) invalidates one direction of the equivalence. To prove continuity, the outstanding task is to establish (5) for this exact family. To disprove it, an actual admitted sequence returning to one fixed radius after unbounded excursions is required.

Source identities measured by standard SHA-256 hashing before this freeze:

| Source | SHA-256 |
| --- | --- |
| Exact family | f71e4d62ac98f7de0ab0b958166b70a5e816e0945e1572fd07bbf84b695274cb |
| Quantitative all-future adjudication | de94d663737d7d004cd2dcbf39f52ea0b4d23742f68d47eaf50de4e08dc071a5 |
| Own finite-prefix and positive-branch continuity reference | 5dd032f7dce567efaaf6adc76ff61ed9babee1677fc84ee68125f496d5ac0674 |
| Zero-branch phase correction | c94f90ea18d2ec09681a343c607757639053c50f402738552575d83bd84e0f8f |
| Zero-branch independent adjudication | 759c78b87e087ccfcbb6516d493a529949aea77ad769e70762dc57f4272dddb3 |

This is the independent reference freeze for the final bounded zero-parameter question. The separately assigned subject's conclusions were not requested or read before this freeze. Subsequent comparison belongs in a separate assessment, leaving this reference unchanged.
