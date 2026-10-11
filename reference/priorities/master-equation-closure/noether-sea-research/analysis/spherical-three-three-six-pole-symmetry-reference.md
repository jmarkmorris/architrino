# Independent six-pole history symmetry, speed and signed support

## Scope and frozen input

This independently authored analytical reference treats exactly the three preparations in the [six-pole plan](spherical-three-three-six-pole-plan.md), with $K=c_f=1$, $R=10$, initial speed $1/2$, and normal constraint only. The plan was measured by `shasum -a 256` before writing: `b66ecf15b903624c2007228f8613df59f52d40ae83378c6beee1c269da4b8b43`. No new six-pole peer subject or reference was read. The Emmy Noether role is an analytical lens, not evidence. This is a derived local theorem, not measured evolution or an all-time claim.

Admission was successful and untruncated at 22:28:27.672 UTC on October 10, dispatch `90caa8ca-dd86-4a38-862c-b9ccee34100c`. The retained payload was verified; its transport field was separately false and is not claimed verified. New exploration stops 23:26:02 UTC, hard closeout 23:41:02 UTC. This document owns no synthesis or production edit.

## Complete preparation and elementary controls

Write $y=1+4s$. On $-1/4\le s\le0$,

$$
\theta(s)=\frac{(y-1)y^3}{8},\qquad
\theta'(s)=\frac{y^2(4y-3)}2,
$$

so $-27/2048\le\theta\le0$ and $-1/8\le\theta'\le1/2$. Physical speed is $|\theta'|$, since $T=Rs$ and $|\partial_\theta\mathbf X|=R$. The supplied negative history is therefore globally sub-wake-speed. At the stationary seam it is $C^2$; at release it supplies position and velocity, not the canonical right acceleration. No $C^2$ match to the supplied left acceleration at zero is assumed.

Analytical controls, not outputs of a new instrument: $(\mathbf e_x,\mathbf e_y)$ has tangent dot product zero and direction norm one; replacing the direction by $\mathbf e_x$ fails tangency and is rejected. The exact nonzero preparation value is $\theta(-1/8)=-1/128$, while $\theta(0)=0$ and $\theta'(0)=1/2$. Every selected direction is tangent and unit: rotation is a normalized cross product, cap direction is the normalized component of $\mathbf w$ perpendicular to $\mathbf e_a$, and the broken negative direction shares the positive tangent plane. These checks prohibit silently reprojecting invalid data.

During preparation each position is displaced from its pole by at most $R|\theta|<7/50$; hence any distinct pair remains separated by more than $10\sqrt2-7/25>13$. The far past is exactly stationary. The preparation is external initial data, not an actual solution claim.

## Kernel and a certified actual interval

For each ordinary arrival let $r=|\mathbf X_i(T)-\mathbf X_j(S)|=T-S>0$ and $\mathbf N=(\mathbf X_i(T)-\mathbf X_j(S))/r$. The selected law is

$$
\mathbf A_i=\sum_{j,S}\frac{p_i p_j\mathbf N}{r^2|1-\mathbf N\cdot\mathbf v_j(S)|},\qquad
\lambda_i=-\frac{|\mathbf v_i|^2}{R}-\mathbf n_i\cdot\mathbf A_i.
$$

The whole-history speed bound $V<1$ makes the causal root function strictly monotone in the source time, with derivative magnitude at least $1-V$. Every distinct source has exactly one root; the stationary remote past supplies the other endpoint. A positive-delay self root would require a chord equal to elapsed time although path length is at most $V$ times that time, an impossibility. Thus the complete census is five roots per receiver, thirty directed roots total, and zero positive-delay self roots. The receiver factor is not an acceleration weight.

Here is a bootstrap establishing actual normal-constrained motion on the physical interval $0\le T\le1$. Stop at the first failure of $|\mathbf v_i|<3/5$ or this endpoint. A receiver moves by less than $3/5$ from its initial pole. Its distance to any *other old pole* exceeds $10\sqrt2-3/5>13$. The candidate stationary root is therefore $S=T-r<1-13=-12<-R/4=-5/2$. The whole-history speed bound is $3/5$, so this candidate is the unique root. All thirty roots consequently sample exactly stationary source poles throughout this bootstrap. Their transmitter factors are exactly one, their delays exceed 13, and source-seam margin exceeds $19/2$ in physical time. Current pair separation is at least $10\sqrt2-6/5>12$.

The field reduces exactly, receiver by receiver, to

$$
\mathbf A_i(\mathbf x)=\sum_{j\ne i}p_i p_j\frac{\mathbf x-R\mathbf n_j(0)}{|\mathbf x-R\mathbf n_j(0)|^3}.
$$

This is a static-source reduction of the canonical equation on the certified interval, with the receiver's own old pole omitted because there is no positive-delay self root. It is not a static approximation to arriving preparation. The bound $|\mathbf A_i|\le5/169<3/100$ gives $|d|\mathbf v_i|/dT|<3/100$, since normal support contributes no speed derivative. Hence

$$
\frac{47}{100}<|\mathbf v_i(T)|<\frac{53}{100}<\frac35.
$$

The smooth constrained vector field away from the five old poles preserves the sphere and closes the bootstrap by ordinary local existence and continuation. Its right acceleration is $\mathbf B_i-|\mathbf v_i|^2\mathbf n_i/R$, with $\mathbf B_i$ the tangent projection of $\mathbf A_i$. All root, separation and source margins remain strict through the endpoint. This establishes an actual solution, not merely a prescribed path. It makes no claim to first preparation reception or to feedback beyond this interval.

## Full-history symmetry and equal speeds

An orthogonal map together with a label permutation and, if needed, a *global* polarity reversal preserves every polarity product, chord, transmitter factor, complete root, and normal constraint. It carries a solution of the same supplied history to a solution. Local uniqueness then preserves every such symmetry of the whole supplied history. Equal norms at one event alone are insufficient; the following explicit transitive actions are the reason equality persists here.

Let $C$ cyclically permute the axes and let $Q$ swap any two axes. Then $C\mathbf w=Q\mathbf w=\mathbf w$. For rotation directions, the cross-product identity for orthogonal matrices gives $C\mathbf d_a=\mathbf d_{Ca}$ and $Q\mathbf d_a=-\mathbf d_{Qa}$.

- **Common rotation pattern.** The cyclic action permutes each polarity triangle. Inversion $-I$ exchanges $P_a$ and $E_a$, including their opposite directions, with a global polarity reversal. Together these actions are transitive on all six complete histories. Antipodal pairing persists for the actual solution; all six speed magnitudes and all six signed supports are equal. Neither the past great circles nor this argument establishes later rigid rotation.
- **Opposite-cap pattern.** Every coordinate permutation maps the positive cap directions into one another. Inversion exchanges the two caps with opposite directions and global polarity reversal. This action is transitive on all six histories, so both antipodal pairing and equal speeds/supports persist. The reflection interchanging the two axes other than $a$ also confines each positive trajectory to its corresponding meridional plane; it does not freeze its latitude or speed.
- **Broken-antipodal pattern.** Inversion alone fails: it would reverse a direction that the preparation keeps equal at opposite poles. Nevertheless $-Q$ maps $P_a$ to $E_{Qa}$ and maps its direction to $-Q\mathbf d_a=\mathbf d_{Qa}$, precisely the required broken negative direction. It also maps $E_a$ back to $P_{Qa}$ with the required direction. Together with $C$, this is a transitive whole-history action, with global polarity reversal for $-Q$. Thus all six speeds and supports remain equal, despite the absence of antipodal pairing. In fact $(\mathbf X_{P_a}+\mathbf X_{E_a})'(0)=\mathbf d_a\ne0$, proving immediate departure from antipodal pairing.

These symmetries apply on any subsequently admitted unique ordinary-root continuation of the same history, but only $[0,1]$ is certified here. No guarantee of all-time continuation is included. The broken case is therefore not an example of speed splitting: it breaks one spatial pairing while retaining a different transitive symmetry.

There is an additional exact comparison within the stationary-source interval. The positive receivers in the common and broken cases have identical initial data and identical five old source sites and polarities. Their actual positive trajectories coincide on $[0,1]$ by uniqueness of the same reduced equation. Transitivity then makes their scalar speed and support histories identical across *both* cases on that interval. Their negative trajectories and complete supplied recent histories are different. This scalar agreement is no evidence of continued agreement after their different preparations arrive.

## Release field and first nonzero speed changes

Use a positive receiver at $R\mathbf e_a$, and write $\mathbf e_b,\mathbf e_c$ for the other two axes and $\mathbf h=(\mathbf e_b+\mathbf e_c)/\sqrt2$. Pairing each positive transverse source with its negative opposite gives

$$
\mathbf A_0=-\frac{\mathbf e_a}{4R^2}-\frac{\mathbf h}{R^2},\qquad
A_n=-\frac1{4R^2},\qquad \mathbf B=-\frac{\mathbf h}{R^2}.
$$

For example, one transverse pair contributes $[(\mathbf e_a-\mathbf e_b)-(\mathbf e_a+\mathbf e_b)]/(2\sqrt2R^2)=-\mathbf e_b/(\sqrt2R^2)$; the antipodal negative source contributes $-\mathbf e_a/(4R^2)$. The derivative of $\mathbf r/r^3$ is $I/r^3-3\mathbf r\mathbf r^\mathsf T/r^5$. Consequently

$$
D\mathbf A=\frac{3}{2\sqrt2R^3}[\mathbf e_a(\mathbf e_b+\mathbf e_c)^\mathsf T+(\mathbf e_b+\mathbf e_c)\mathbf e_a^\mathsf T]
-\frac{I-3\mathbf e_a\mathbf e_a^\mathsf T}{8R^3}.
$$

For any tangent initial $\mathbf v$ of norm $v=1/2$,

$$
\mathbf v\cdot D\mathbf A\mathbf v=-\frac{v^2}{8R^3},\quad
v'=\frac{\mathbf v\cdot\mathbf B}{v},\quad
v''=\frac{|\mathbf B|^2+\mathbf v\cdot D\mathbf A\mathbf v-A_n v^2/R-(v')^2}{v}.
$$

These derivatives are right derivatives of the generated actual solution. They are not derivatives of the supplied great-circle extrapolation.

For common rotation and broken-antipodal directions, $\mathbf v\cdot\mathbf h=0$, so

$$
v'(0)=0,\qquad v''(0)=\frac2{R^4}+\frac1{16R^3}=\frac{21}{80000}>0,
$$

and therefore

$$
v(T)=\frac12+\frac{21}{160000}T^2+O(T^3).
$$

For opposite-cap directions, $\mathbf v=\mathbf h/2$, giving

$$
v'(0)=-\frac1{R^2}=-\frac1{100},\qquad
v''(0)=\frac1{16R^3}=\frac1{16000},
$$

and

$$
v(T)=\frac12-\frac{T}{100}+\frac{T^2}{32000}+O(T^3).
$$

Thus rotation and broken pairing initially accelerate in speed at second order, whereas the cap pattern initially decreases speed at first order. Smoothness provides a nonzero neighborhood for these strict signs, but the Taylor remainder here is not used to claim monotonic speed throughout the full unit interval. Equal later speeds within each preparation coexist with variable speed.

## Signed support and its first change

At release all cases have

$$
\lambda(0)=-\frac1{4R}+\frac1{4R^2}=-\frac9{400}<0.
$$

Differentiate $\lambda=-v^2/R-\mathbf n\cdot\mathbf A$ on the stationary-source interval. Since $\mathbf n'=\mathbf v/R$,

$$
\lambda'(0)=-\frac{3\mathbf v\cdot\mathbf B}{R}-\mathbf n\cdot D\mathbf A\mathbf v
=\frac{3(v_b+v_c)}{2\sqrt2R^3}.
$$

It vanishes for rotation and broken pairing; for cap motion it is $3/(4R^3)=3/4000>0$. For the first nonzero support change in the former two cases, the following second-derivative calculation avoids assuming any invariant physical energy. Put $v^2=1/4$ and $\mathbf a=\mathbf B-v^2\mathbf n/R$. The transverse positive/negative pairs cancel in $\mathbf n\cdot D^2\mathbf A[\mathbf v,\mathbf v]$, leaving the antipodal term:

$$
\mathbf n\cdot D^2\mathbf A[\mathbf v,\mathbf v]=\frac{3v^2}{16R^4},\qquad
\mathbf n\cdot D\mathbf A\mathbf a=-\frac3{2R^5}-\frac{v^2}{4R^4}.
$$

Also

$$
\mathbf n''\cdot\mathbf A=\frac1{R^5}+\frac{v^2}{4R^4},\qquad
2\mathbf n'\cdot D\mathbf A\mathbf v=-\frac{v^2}{4R^4}.
$$

It follows that $(\mathbf n\cdot\mathbf A)''=-1/(2R^5)-v^2/(16R^4)$. Since $(v')^2+vv''=1/R^4+v^2/(8R^3)$ for every selected tangent direction,

$$
\lambda''(0)=-\frac3{2R^5}-\frac{3v^2}{16R^4}=-\frac{63}{3200000}<0.
$$

Thus common rotation and broken pairing first make the support more inward at second order:

$$
\lambda(T)=-\frac9{400}-\frac{63}{6400000}T^2+O(T^3).
$$

Cap motion first makes it less inward:

$$
\lambda(T)=-\frac9{400}+\frac3{4000}T-\frac{63}{6400000}T^2+O(T^3).
$$

No support zero is implied by this truncated expansion. A separate whole-interval bound proves there is none on $[0,1]$. Along each receiver's segment from its pole, all five distances remain greater than 13, so $\|D\mathbf A\|\le10/2197<1/200$. Since displacement is less than $3/5$, $|\mathbf A-\mathbf A_0|<3/1000$, while $|\mathbf n-\mathbf n_0|<3/50$ and $|\mathbf A_0|=\sqrt{17}/(4R^2)<11/1000$. Therefore

$$
|\mathbf n\cdot\mathbf A-A_n(0)|<\frac3{1000}+\frac{33}{50000},\qquad
|\mathbf n\cdot\mathbf A|<\frac{31}{5000}.
$$

Combining the speed enclosure $47/100<v<53/100$ with the support formula yields, for every member of every preparation,

$$
-\frac7{200}<\lambda(T)<-\frac3{200}<0\qquad(0\le T\le1).
$$

The deliberately widened rational enclosure follows because the sharper lower endpoint is $-3429/100000>-7/200$ and the sharper upper endpoint is $-1589/100000<-3/200$. This is mathematical inward support required by the selected sphere constraint; it supplies no physical medium law.

## Checks, falsifiers and preservation boundary

The root proof uses the full history speed bound, not a root deletion rule. Stationary roots are independently admitted by their explicit source times. The kernel derivative and antipodal/transverse decomposition above are separately checkable closed forms; there is no common implementation, numeric root scan or evolution replay behind the result. A failed direction norm, changed preparation amplitude, extra positive-delay root, nonstationary source on the claimed interval, or a missing global polarity reversal defeats the corresponding claim. In particular, treating inversion alone as a broken-pattern symmetry would be false; the needed map is inversion composed with an odd coordinate permutation.

All derivatives concern the canonical right solution with externally supplied past. The strict speed and support Taylor signs are local; full-unit-interval speed monotonicity and later preparation reception remain undecided here. The unit-interval inward-support enclosure is explicit and derived. No physical energy, recurrence, rigid rotation, stability spectrum or all-time surface coverage is established. No EOM solver capability claim was needed or made, so no remembered interface limitation is used as evidence.

Only this new reference is written. The prior preparation-reception symmetry adjudication was measured before writing at SHA-256 `896f32c62163acc2e4120bc3307e9923f73341bb0d5462ffcbabf1a0c7bbbede` and is preserved. The plan and prior adjudication will be rehashed after this reference is frozen; scoped whitespace validation uses `git diff --no-index --check /dev/null` on this file. Its single relative Markdown target is the directly read plan. No new instrument, scientific numerical calculation, job or child agent was launched. Runtime, regeneration and backup costs are unprofiled; local file preservation is not a backup assertion. No global-idle claim is made. The bounded independent derivation is complete with saved evidence; independent peer adjudication and root integration are the next dependency, not an authorized self-selected successor.
