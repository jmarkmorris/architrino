# The remaining infinite regime has a regular invertible limit flow

## Scope and premises

Claim grade: derived candidate awaiting independent assessment. Retain the actual sufficiently small logarithmic perturbation family from the [method admission](authorized-cases-ten-hour-c-spiral-method-admission.md), with coefficient one, $c_f=1$, all ordinary roots, and unchanged self treatment. No new preparation, numerical amplitude, or response is selected.

The accepted [compact infinite-regime theorem](authorized-cases-ten-hour-c-spiral-compact-infinite-regime.md) gives every infinite strict member positive lower bounds for normalized radius and tangential speed, comparable complete causal radii, a positive source denominator, and $C^2$ precompactness on compact positive scaled-time windows. Its normalized complete limits obey the same logarithmic equation with speed at most one and the complete root census. The accepted [unit-limit geometry](authorized-cases-ten-hour-c-spiral-unit-limit-geometry.md) says that every late near-unit sequence has $n\cdot v\to0$.

This note derives a receiver-clock margin, finite-arc backward reconstruction, and an invertible flow on the compact limiting history set. These statements sharpen the exact remaining return problem. They do not establish a uniform total-speed margin, convergence to the spiral, a periodic orbit, or selection of an actual member's finite versus infinite branch.

## 1. Both clock factors have positive margins

Write

$$
N=1-n\cdot v,\qquad D=1+n\cdot v_s,\qquad
\frac{ds}{dt}=\frac ND.
$$

The source factor already satisfies $D\ge d_0>0$ eventually. The receiver factor also has an eventual positive margin:

$$
N\ge n_0>0.
\tag{1}
$$

Otherwise a sequence with $N\to0$ would have $n\cdot v\to1$, hence $|v|\to1$ since the actual branch is strictly subfield. The accepted all-subsequence unit-limit conclusion instead gives $n\cdot v\to0$, a contradiction. Since $N,D\le2$, it follows that

$$
\frac{n_0}{2}\le s'(t)\le\frac2{d_0}
\tag{2}
$$

on the late generated path. The same margins pass to every complete normalized limiting trajectory on all compact positive-time windows. Thus its source clock is strictly increasing and has a bounded inverse rate, even if its speed touches one.

There is a direct limiting check: at a unit point of a complete at-most-unit limiting trajectory, the speed has a local maximum, so $v\cdot v'=0$. The nonzero logarithmic acceleration gives $n\cdot v=0$ and hence $N=1$. A vanishing receiver factor cannot hide at a regular unit touch.

## 2. A linear equation recovers the delay from a known curve

For an exact complete normalized limiting trajectory $Q(t)$, use $t>0$ for scaled physical time and let $a=Q''$. The partner acceleration never vanishes. The curve itself therefore determines

$$
n=-\frac a{|a|},\qquad
|a|=\frac1{RD}.
$$

The causal derivative identity gives

$$
R'=1-\frac ND
=1-|a|NR.
\tag{3}
$$

For a known curve, this is a linear scalar differential equation for $R$. Its coefficient $|a|N$ is continuous on every compact positive interval and is determined by the curve. A single known delay value therefore determines $R$ uniquely throughout such an interval, both forwards and backwards. Once $R$ is known,

$$
s(t)=t-R(t),\qquad
Q(s(t))=R(t)n(t)-Q(t).
\tag{4}
$$

The second identity is the actual mirror-partner chord equation. The strict source-clock increase in (2) makes (4) a reconstruction of the curve on an entire preceding source interval, rather than a set of ambiguously ordered source points.

No extra equation is introduced: (3) is an identity along the unchanged logarithmic solution. It is not used to generate a freely chosen past.

## 3. One sufficiently long finite arc determines the whole limiting trajectory

Consider two complete normalized limiting trajectories satisfying the compact-regime bounds. Suppose they agree, in a common orientation and scale, on $[a,b]\subset(0,\infty)$, where

$$
b>39a.
\tag{5}
$$

The accepted source ratio gives $s(b)\ge b/39>a$ for each trajectory. Hence both partner sources at $b$ lie inside the common known arc. The complete partner root is unique, so its delay value $R(b)$ is identical for both curves.

Equation (3), applied backwards on $[a,b]$, forces the two delay functions to agree throughout that interval. Equation (4) then forces the two curves to agree on $[s(a),s(b)]$. Because $s(b)>a$, this recovered interval joins the already known one, extending their agreement to $[s(a),b]$.

The compact-regime radius floor gives $R(t)\ge r(t)\ge c_r t$ for some $c_r>0$ on a complete normalized trajectory. Thus

$$
0<s(a)\le(1-c_r)a<a.
\tag{6}
$$

Repeat the same reconstruction with the new left endpoint. Condition (5) remains true, the right endpoint $b$ stays fixed, and successive left endpoints tend geometrically to zero. The curves therefore agree on all of $(0,b]$.

Forward uniqueness among existing viable complete trajectories is local and elementary. On a compact positive reception interval, the common positive delay floor keeps source events a definite distance behind the receiver. Once the past curves agree, a sufficiently short next interval has all source events in that common past. The ordinary source equation gives a locally Lipschitz partner acceleration as a function of receiver position, and the two curves solve the same local integral equation with the same position and velocity. They agree there. Repeating this argument gives agreement for all $t>b$.

The use of uniqueness here is confined to the exact at-most-unit complete trajectories already supplied by compactness. Their self-root census is empty, and their partner root stays ordinary. No superfield single-partner continuation is substituted for the full law.

We conclude that two such trajectories sharing an arc of ratio greater than 39 are the same entire positive-time trajectory. This does not claim that a short point observation determines an arbitrary physical preparation, nor that the original held tail can be reconstructed through a region where its prescribed path did not obey the generated equation.

## 4. Compact limiting history states carry a two-sided continuous flow

Fix $H>\log39$. For the actual infinite branch, put $w=t-s_0$ and normalize a complete past window by current scale and angle:

$$
\Phi_t(u)=\frac{e^{-i\theta(t)}x(s_0+wu)}w,
\qquad e^{-H}\le u\le1.
\tag{7}
$$

The current point $\Phi_t(1)$ is positive real. This removes the overall spatial rotation and scale while retaining the full sampled window. Use the $C^2$ topology on these curves; position and velocity information is retained. Let $\Omega$ be the set of all limits of $\Phi_{t_j}$ for $t_j\to\infty$.

Precompactness makes $\Omega$ nonempty and compact. Every state extends to a complete exact limiting trajectory on $u>0$ by the diagonal extraction already used in the compact-regime proof. Section 3 shows that this extension is unique: its finite history window has endpoint ratio $e^H>39$. Thus an element of $\Omega$ determines one entire trajectory up to the scale and rotation already fixed in (7).

A logarithmic-time shift by $\tau$ follows that trajectory from current scaled time one to $e^\tau$, then renormalizes its position window by $e^\tau$ and its current angle. Call this map $\mathcal S_\tau$. The exact similarity symmetry and ordinary-root equation make these maps compose by addition of $\tau$.

The maps are continuous on $\Omega$. One can verify this without inventing a continuation outside the domain: on each finite positive-time interval, the uniform source margins and compact bounds give continuous dependence for existing trajectories by the same local integral-equation estimate used above. Alternatively, compactness supplies convergent subsequences of the shifted trajectories; every such subsequential limit extends the given limiting input state, so the uniqueness in Section 3 forces the same output. This proves convergence of the full sequence.

For $\tau\ge0$, $\mathcal S_\tau(\Omega)\subset\Omega$ follows by shifting the defining actual times. Conversely, for any state obtained at times $t_j$, shift those times backwards by a fixed amount in logarithmic time and extract a subsequence. Their limiting state maps forward to the given one, so $\mathcal S_\tau$ is onto. It is injective because two states with the same shifted window have, by Section 3, the same complete limiting trajectory. Compactness then makes its inverse continuous. Thus $\{\mathcal S_\tau\}_{\tau\in\mathbb R}$ is a two-sided continuous flow on $\Omega$.

This conclusion excludes loss of past information inside the attained compact limit set. It does not remove the finite history from the equation or turn the evolution into a finite-dimensional system.

## 5. The precise remaining obstruction

The infinite branch's remaining alternatives are invariant trajectories of this compact, ordinary, two-sided limiting flow. A unit point in the set has the accepted outward grazing geometry and both clock margins; it does not represent a singular source or a freely selectable continuation. The [continuous boundary criterion](authorized-cases-ten-hour-c-spiral-continuous-boundary-criterion.md) supplies the stronger local first-arrival interpretation separately, within its complete strict incoming-past hypotheses.

If the scalar speed converges, the accepted asymptotic-shape result selects the exact spiral history in $\Omega$. If it does not, the present argument does not identify the invariant set. A recurrent nonconstant history or a nontrivial connection returning toward the spiral is not ruled out merely by backward uniqueness. Ordinary differential equations also admit nontrivial connections despite unique histories; uniqueness alone is not a global return theorem.

The attained nonlinear exit-set question therefore remains substantive: do its forward trajectories enter a proved finite-event region, return asymptotically to the spiral, or approach another viable compact invariant history? The new result isolates that question from degenerating clocks, discarded self roots, and ambiguous reconstructed pasts. No one of those three outcomes is selected here.

## Controls and falsifiers

The exact admitted logarithmic spiral is the known control for (3): $R=(1-\lambda)t$, $s=\lambda t$, and the exact balances make the identity hold. Its source and receiver clock factors are positive, and its normalized state is a fixed point. The parameter triple remains bound to the certified rectangle in the admission; no printed decimal substitute is used.

Falsifiers are a late sequence with $N\to0$ that does not trigger the accepted unit-sequence conclusion; a missing factor or sign in (3); two different ordinary partner roots within the same common known arc; a failure of source-clock monotonicity in (4); failure of the positive normalized radius floor needed in (6); or a limiting state with two complete extensions despite the finite-arc reconstruction. The compact flow statement also depends on using a window longer than $\log39$ and retaining the complete state topology.

Only this new analytical subject is written. No numerical instrument, target solver, extra history, or source law is introduced. Earlier subjects and all independent references remain frozen; shared integration belongs to the parent coordinator. Independent assessment is required before acceptance.
