# Independent geometry check for the multiplier-free linear comparison

This report was derived independently of the repaired trajectory instrument. It checks the causal-root geometry and event transitions analytically; it does not independently measure a complete trajectory. The selected preparation is $x(T)=a$ for $T\leq0$, $a=0.5$, release at rest, $k=0.2862286103053385$, and $c_f=1$. Labels persist through contact: the partner of the initially right-hand member has position $-x(T)$. The held past is imposed preparation, not released-equation equilibrium.

## Equation and root census

The selected linear spatial numerator replaces the inverse-square numerator while retaining the causal-arrival and transmitter-density rules. This is an exploratory equation, not the unmodified Master Equation. The [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md) supplies the transmitter weight $1/|D_t|$, the exclusion of the zero-delay self diagonal, and the distinction between simple roots and caustic transit. No receiver multiplier is present.

For every earlier partner root $S<T$, write $d=x(T)+x(S)$ and require $T-S=|d|$. For every earlier self root, write $e=x(T)-x(S)$ and require $T-S=|e|$. The acceleration is

$$
x''(T)=-k\sum_{\text{partner roots}}\frac{d}{|1+\operatorname{sgn}(d)v(S)|}+k\sum_{\text{self roots}}\frac{e}{|1-\operatorname{sgn}(e)v(S)|},\qquad v=x'.
$$

The opposite polarity gives the minus sign for the partner; the same polarity gives the plus sign for self history. The weight depends on emission velocity. Omitting the absolute value is justified only after proving its sign on the current root chart.

**Derived root census below wake speed.** Suppose the complete earlier history on the relevant interval satisfies $|v|\leq1-\epsilon$ with $\epsilon>0$. For fixed reception time, the partner residual $S+|x(T)+x(S)|-T$ is strictly increasing, with slope at least $\epsilon$ wherever its absolute value is differentiable. It tends to $-\infty$ in the held past and equals $2|x(T)|$ at $S=T$. There is exactly one earlier partner root when $x(T)\neq0$, and only the zero-delay boundary root when $x(T)=0$. The self residual $S+|x(T)-x(S)|-T$ is also strictly increasing and equals zero at $S=T$; hence it has no earlier root. This is a geometric consequence of the history bound, not permission to omit self roots after that bound fails.

## Independent controls and contact continuation

The ordinary instantaneous comparison has exact solution and invariant

$$
x(T)=a\cos(\sqrt{2k}T),\qquad v(T)=-a\sqrt{2k}\sin(\sqrt{2k}T),\qquad E=\frac12v^2+kx^2=ka^2.
$$

These are mathematical controls, without a primitive mass interpretation. While the delayed partner emission remains in the held past, its exact solution is

$$
x(T)=2a\cos(\sqrt{k}T)-a,\qquad v(T)=-2a\sqrt{k}\sin(\sqrt{k}T).
$$

The interval ends when $S=0$, equivalently $T=x(T)+a$, or at an earlier root-chart event. Direct substitution proves these formulas before any numerical use. Neither formula contains the modified logarithmic invariant or the transformed variable $\operatorname{artanh}v$.

**Derived local contact result.** Let a first transverse contact occur at $T_c$ with $x(T_c)=0$, $v(T_c)=v_c\neq0$, and a uniform strict speed margin on the complete preceding history and a neighborhood of contact. Then the unique partner root approaches $S=T_c$; there is no older root left over at contact. The correct expansion is given in the [independent affine check](multiplier-free-linear-self-birth-to-fold-independent-check.md#exact-affine-control-and-correction-of-the-earlier-contact-coefficient): with $\sigma=\operatorname{sgn}(x(T))$, $d=2x(T)/(1+\sigma v_c)+o(|T-T_c|)$ and $x\prime\prime=-2kx(T)/(1+\sigma v_c)^2+o(|T-T_c|)$. Incoming and outgoing slopes differ. The following earlier first-order formulas are retained as **withdrawn historical expressions**, superseded by that exact substitution; they must not be reused:

$$
d=\frac{2x(T)}{1-\operatorname{sgn}(x(T))v_c}+o(|T-T_c|),\qquad x''(T)=-\frac{2kx(T)}{1-v_c^2}+o(|T-T_c|).
$$

The acceleration tends to zero from both sides. The spatial numerator therefore permits a regular local passage, without reversal, waiting, contact impulse or receiver response. The outgoing branch uses the opposite direction of $d$, while its velocity remains continuous. On a history neighborhood with a uniform speed margin, the implicit arrival map has a bounded inverse slope and the velocity evaluations have bounded local variation; this is the regular local continuation setting. This result is conditional on reaching subcritical contact. It does not by itself prove a particular crossing time, turn or return for the selected release.

## First transversal wake-speed crossing and self birth

A speed-one endpoint is not, for this equation, a proof of dynamical termination. It invalidates the strict-speed census and requires a new chart. Consider the first crossing $v(T_*)=-1$, with regular partner acceleration tending to $-B$, $B>0$, and no older self roots. Suppose a continuation has a finite right acceleration trace $-b$, $b>0$. Put $t=T-T_*$ and $s=S-T_*$. The local history expansions are

$$
x(T_*+s)=x_*-s-\frac12Bs^2+o(s^2)\quad(s<0),\qquad x(T_*+t)=x_*-t-\frac12bt^2+o(t^2)\quad(t>0).
$$

The new backward self root has $e<0$. Its arrival condition is $T+x(T)=S+x(S)$ and therefore

$$
s=-\sqrt{b/B}\,t+o(t),\qquad e=-(1+\sqrt{b/B})t+o(t),\qquad |1+v(S)|=\sqrt{Bb}\,t+o(t).
$$

**Derived necessary right trace.** The self acceleration has the finite negative limit

$$
A_{\mathrm{self},+}=-k\left(\frac1B+\frac1{\sqrt{Bb}}\right),\qquad b=B+\frac{k}{B}+\frac{k}{\sqrt{Bb}}.
$$

The matching equation has exactly one positive solution, since its left side increases strictly and the variable part of its right side decreases strictly. It satisfies $b>B$. In particular a continuation with unchanged acceleration $b=B$ fails the equation. The local self contribution is bounded, so this mechanism needs no velocity jump; it changes the acceleration trace. For a first $v=+1$ crossing driven toward greater positive speed, reflection gives the same magnitude equation and a positive self contribution.

This calculation is a necessary compatibility condition for a piecewise twice differentiable, continuously differentiable continuation. It is not an existence or uniqueness proof for that continuation: the root and trajectory must solve the full equation together, with the complete ledger retained. A numerical integration which continues the old self-free equation has evolved another model. A speed-one crossing with $B=0$, simultaneous partner degeneracy, or a contact at the same event is outside this quadratic expansion.

## Nonzero-delay folds and exact remaining burden

The root equations can be enumerated without assuming monotonicity. Define $P(S)=S+x(S)$ and $Q(S)=S-x(S)$. Positive-distance partner roots solve $P(S)=Q(T)$, negative-distance partner roots solve $Q(S)=P(T)$, negative-distance self roots solve $P(S)=P(T)$, and positive-distance self roots solve $Q(S)=Q(T)$, always checking $S<T$ and the distance sign. Every monotone segment between extrema of $P$ or $Q$ can contribute a root. Crossing either wake speed creates an extremum and can invalidate a one-root bracket.

**Derived ordinary fold estimate.** At a nonzero-delay root with $D_t=0$, nonzero second emission derivative, and nonzero receiver crossing derivative, the two local roots move as $S-S_*\sim\pm C\sqrt{|T-T_*|}$. The linear numerator tends to a nonzero finite signed distance there, so each acceleration contribution is generally proportional to $|T-T_*|^{-1/2}$. It is unbounded pointwise but locally integrable in reception time. The two absolute-Jacobian terms with the same signed distance reinforce; they do not cancel by assigning opposite root orientations. The Master Equation's ordinary caustic-transit discussion independently establishes this integrability mechanism for bounded numerators.

A fold consequently ends a regular simple-root chart, but does not alone establish a genuine no-continuation obstruction. The remaining burden is a complete fold ledger and a coupled trajectory through the event in the intended locally integrable class. A persistent characteristic interval, infinite-order degeneracy, accumulation of roots with divergent summed acceleration, or incompatible simultaneous diagonal birth is not covered. Those cases need their actual local analysis; no cap, softening or root suppression follows from numerical difficulty.

## Scope of the independent result

This section records the initial independent derivation, before the subsequent numerical prefix and local coupled theorem below. The final theorem supersedes the initial local-existence gap under its explicit hypotheses; the later fold/global obligations remain unresolved.

| Event | Established analytically | What remains unestablished here |
| --- | --- | --- |
| Subcritical contact | Unique partner root collapses to the boundary; no self roots; zero limiting acceleration; regular local passage is compatible | Whether and when the selected release reaches the event, and later turn/return |
| First transversal wake-speed crossing | Local self-root birth has a bounded nonzero contribution; any finite acceleration trace must change according to the matching equation | Full coupled continuation and uniqueness beyond that event |
| Ordinary positive-delay fold | Singular acceleration is locally integrable when the stated transversality conditions hold | Complete trajectory, complete ledger and event chart for a specific fold |

The preceding analytical report was completed before any selected-release numerical timeline was consulted or calculated. Its local results alone establish no global oscillation, escape or indefinite growth. The independent prefix calculation below subsequently supplies bounded numerical passage, braking, turn and return evidence; it does not establish a coupled continuation beyond self birth.

Falsifiers are explicit: an earlier partner/self root under the uniform strict-speed hypotheses would refute the monotone-residual census; a nonzero contact acceleration with those hypotheses would refute the contact expansion; a self-free or continuous-acceleration continuation satisfying the full equation across a transversal speed crossing would refute the trace calculation; a divergent reception-time integral at a certified ordinary transverse positive-delay fold with bounded numerator would refute the fold estimate. Check these against the complete emitted history and both $P,Q$ root families, rather than against a single numerical bracket.

Repository validation for the initial analytical assignment: this report alone was the assigned write scope. The subsequent numerical assignment additionally authorizes the distinct instrument and ignored receipts below. Source links were checked by filesystem existence; the analytical derivations above are the independent reference, not a document validator or same-implementation parity result.

## Independently authored subfield prefix computation

On the subsequent assignment, the separate [independent prefix instrument](../../../../../scripts/collinear-research/multiplier-free-linear-independent-prefix.py) was authored and run without reading the repaired parent instrument or its results. It integrates $x,v$ directly by fourth-order Runge–Kutta stages, interpolates source position by cubic Hermite polynomials, and takes source velocity as the derivative of that polynomial. It brackets the unique partner root only within the subfield history class proved above. It includes no receiver multiplier, transformed velocity variable or numerical cap law. It stops at a declared speed margin of $10^{-7}$; this is a numerical approach to the equality event, not an imposed ceiling or a mathematical obstruction.

Known controls were run and their passing receipt saved before any target run. The exact ordinary oscillator at $T=8$ gave maximum position/velocity error $8.83\times10^{-14}$; the ordinary crossing-speed control gave $1.17\times10^{-14}$; the exact held-source state at $T=0.5$ gave $1.36\times10^{-15}$. The Hermite interpolator first passed an exact straight-line input. Every accepted polynomial history segment is checked at its velocity extrema, not only at endpoints; this bound checker passed the exact Hermite case with zero endpoint velocities and peak velocity $1.5$ before the final target reruns. These controls verify known uses of the instrument, not every later trajectory state or a rigorous enclosure of the actual solution.

| Maximum time step | First contact time / speed magnitude | First turn distance | Return contact time / speed magnitude | Second turn distance | Estimated first wake-speed equality time |
| --- | --- | --- | --- | --- | --- |
| $1/1024$ | $1.94229674883$ / $0.45713566654$ | $0.84666093261$ | $6.94697125611$ / $0.78776219305$ | $1.79824249558$ | $12.41188233949$ |
| $1/2048$ | $1.94229674833$ / $0.45713566158$ | $0.84666091989$ | $6.94697123881$ / $0.78776213787$ | $1.79824220716$ | $12.41188221691$ |
| $1/4096$ | $1.94229674858$ / $0.45713565933$ | $0.84666091317$ | $6.94697123022$ / $0.78776214945$ | $1.79824231021$ | $12.41188224595$ |

These values are **measured** by the independent prefix instrument. Agreement across steps supports the quoted six-decimal event values, but is not a rigorous error enclosure. The finest first turn occurs at $T=4.75725197350$, and the second at $T=10.42650498623$. The numerical endpoint is $T=12.41188208089$, $x=0.86179524528$, $v=-0.99999990109$, with acceleration $-0.59921620894$. The equality time is a **local linear estimate**, obtained by dividing the remaining speed gap by the endpoint acceleration magnitude; the instrument has not evolved through equality. The endpoint is at positive separation, before the third contact. The finest sampled partner-denominator minimum is $0.21223968771$ and maximum arrival-equation residual is $1.25\times10^{-14}$; these are sampled diagnostics, not continuous certification.

**Derived braking interpretation, applied to measured events.** In the strict-subfield chart the signed partner distance keeps the sign of $x$ on each separated segment: changing that sign requires the partner root to reach zero delay, hence contact. Immediately after the first passage, $x<0$, $v<0$, the partner numerator has $d<0$, and its positive Jacobian gives $x''>0$. This is outgoing braking under the intended equation. The measured first turn reverses the direction without prescription, and the measured second contact supplies return evidence. The same sign argument supplies braking after that return. This completes a bounded intended comparison: the ordinary oscillator repeats at amplitude $0.5$ and crossing speed $a\sqrt{2k}$, while this delayed prefix has two distinct crossing speeds and increasing turn distances. It does not prove indefinite growth.

Reproduction, in order:

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/multiplier-free-linear-independent-prefix.py --known
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/multiplier-free-linear-independent-prefix.py --h 0.0009765625 --end 16
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/multiplier-free-linear-independent-prefix.py --h 0.00048828125 --end 16
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/multiplier-free-linear-independent-prefix.py --h 0.000244140625 --end 16
```

Receipts are distinct from the parent calculation, under `.local-data/collinear-research/multiplier-free-linear-independent/`. All runs completed as watched foreground jobs, with a fixed 15-second heartbeat available for longer runs. These target runs took less than three seconds each. The independent reference is the exact controls and separately derived root/contact analysis; step refinement is consistency evidence.

## Disposition of numerical extension beyond the prefix

**Earlier evidence boundary.** This section records the independent prefix instrument's original stopping grade and the exploratory extension then available. The later [resolved-release calculation and independent audit](multiplier-free-linear-self-birth-to-fold.md) supply new numerical third-contact and partner-fold evidence from a different subject; they do not relabel this prefix instrument as a postbirth solver. Continuous exact-release enclosure and later turns remain open.

After the independent prefix receipts had been reported, the coordinating agent described an all-root exploratory extension through $T=24$, with degraded refinement near a first caustic around $T=16$. That description is supplied context; neither its instrument nor its retained trajectory was inspected here. It therefore adds no independent event evidence to this report.

The coordinator subsequently identified the first sampled partner-root fold near $T=13.1001$; the later turn near $T=16.3$ is where the refinement deterioration is conspicuous. The earlier approximate description did not locate the first fold correctly. These are parent-instrument measurements, not an independent postbirth numerical check. The local theorem appended below separately closes the short self-birth existence question, while leaving later coupled folds unresolved.

The required distinction is precise. Passing through self birth numerically is an exploratory coupled trajectory candidate. Justified coupled continuation requires the self-birth trace relation above, a complete root census including each monotone $P,Q$ sector, and a demonstrated locally integrable event solution with continuous velocity and no artificial event impulse. At a fold it additionally requires the actual normal-form and receiver-transversality conditions, correct simultaneous root accounting, and a controlled convergence statement for the integrated acceleration. Agreement on prebirth events does not verify these new event mechanisms. Degraded refinement near the caustic prevents using later turns or contacts as established geometry. Neither that numerical difficulty nor the loss of the simple-root chart proves a genuine physical or mathematical no-go.

| Geometry/history | Old factor-bearing evidence | Corrected independently measured stopping event | Judgment |
| --- | --- | --- | --- |
| Symmetric held pair, linear delayed spatial numerator | Three passages and two turns through $T=16$, under a quadratic receiver multiplier | Two passages and two turns, then approach to first wake-speed equality at positive separation near $T=12.411882$ | Intended comparison repaired; baseline geometry beyond birth unresolved. The old third-passage result cannot be transferred. No new postbirth geometry advance is established. |

Falsifier for the bounded prefix evidence: an independently authored all-root calculation within the subfield domain contradicting these event values beyond the reported discretization spread. Falsifier for any proposed later advance: failure of complete root census, self-birth trace compatibility, event integral convergence, or stability of the claimed event under independently checked numerical refinement. No standing test regime or production EOM modification is introduced.

## Local coupled continuation through a transversal self birth

The preceding trace calculation leaves an existence question. The following **derived conditional theorem** closes that local question in an explicit regularity class. It was developed after the prefix results, using a source-time coordinate proposed by the coordinating agent and checking its signs, complete local census and contraction independently. It does not independently certify that the exact selected release reaches the measured equality state, and does not establish continuation through a later fold.

Shift the first negative wake-speed crossing to reception time $T=0$. Assume the given prebirth history is three times continuously differentiable locally on the left, with $x(0)=x_*>0$, $v(0)=-1$, $x''(0-)=-B$, $B>0$, and $|v(S)|<1$ for all earlier times. Assume the unique surviving partner root is at a strictly earlier time, with positive distance and a denominator bounded away from zero in a neighborhood. Its inward acceleration magnitude $A(T,X)$ is a smooth function of the receiver time and position there, determined entirely by the fixed prebirth source history, with $A(0,x_*)=B$. Assume the global past is the held-release history, so its partner residual has the monotone strict-subfield census already proved, and no other roots can approach from infinity. These hypotheses are part of the theorem, not a new physical response law.

**Theorem.** There is a unique local continuation in the class $x\in C^1$, piecewise $C^2$, with a finite strictly negative right acceleration trace, whose velocity crosses to $v<-1$. It uses exactly the surviving older partner root and one new self root. It has no velocity jump or assigned contact rule. The right acceleration magnitude $b>B$ is the unique solution of the matching equation above.

**Complete local census.** Near the event $P(S)=S+x(S)$ is strictly increasing for earlier $S<0$ and strictly decreasing for the sought current $T>0$; $Q(S)=S-x(S)$ remains strictly increasing through the event. The self equation $P(S)=P(T)$ therefore has exactly one earlier root $S=-q<0$. Its delay is $T+q>0$ and its signed displacement is negative. The other self equation $Q(S)=Q(T)$ has no earlier root. The older positive-distance partner root persists by its assumed nonzero denominator. New partner roots in the recent segment cannot occur: the equations would require equality between values of $P$ near $x_*$ and values of $Q$ near $-x_*$, which remain separated by a positive gap since $x_*>0$. The earlier monotone partner census and the held tail exclude additional distant roots. Thus the two-root ledger is complete locally, without a root-exclusion convention.

For $q>0$, let $p(q)=P'(-q)=1+v(-q)>0$. The past Taylor expansion gives $p(q)=Bq+O(q^2)$. Parameterize the future by its earlier self source $S=-q$, set $w=-(1+v)>0$, and impose the exact self-arrival relation $P(T)=P(-q)$. It determines $X=P(-q)-T$, not an extra trajectory prescription. Differentiating and applying both root contributions gives

$$
\frac{dT}{dq}=\frac{p(q)}w,\qquad \frac{d(w^2)}{dq}=2A\bigl(T,P(-q)-T\bigr)p(q)+2k(T+q).
$$

Indeed, the self acceleration is $-k(T+q)/p(q)$ and $dw/dT=A+k(T+q)/p(q)$; multiplication by $dT/dq$ proves the second equation. These equations contain the full selected local acceleration, including the new self root.

Put $z=T/q$, $W=w/q$, and $L(q)=p(q)/q$, with $L(0)=B$. Then

$$
qz'=\frac{L(q)}W-z,\qquad qW'=\frac{A(qz,P(-q)-qz)L(q)+k(z+1)}W-W.
$$

The fixed point at $q=0$ has $z_0=B/W_0>0$ and

$$
W_0^2=B^2+k(z_0+1),\qquad b=\frac{W_0^2}B.
$$

Eliminating $W_0$ gives exactly $b=B+k/B+k/\sqrt{Bb}$. The fixed point is unique and positive. The Jacobian of the right side with respect to $(z,W)$ there is

$$
J=\begin{pmatrix}-1&-B/W_0^2\\ k/W_0&-2\end{pmatrix},\qquad \operatorname{tr}J=-3,\qquad \det J=2+\frac{kB}{W_0^3}>0.
$$

Both eigenvalues have negative real part: if real, their positive product and negative sum make both negative; if complex, their real parts are half the trace. This sign matters because a nonzero homogeneous solution of $qy'=Jy$ diverges toward $q=0$. The bounded solution can consequently be selected by its incoming history rather than an arbitrary outgoing parameter.

**Existence and uniqueness proof.** Write $y=(z-z_0,W-W_0)$ and the system as $qy'=Jy+R(q,y)$. Smoothness gives $R(q,0)=O(q)$ and, on a sufficiently small tube, $\|R(q,y)-R(q,\widetilde y)\|\leq\delta\|y-\widetilde y\|$ with arbitrarily small $\delta$ after shrinking the tube and time interval. For some $C,\mu>0$, the matrix exponential satisfies $\|\exp(J\log(q/s))\|\leq C(s/q)^\mu$ for $0<s\leq q$. Choose $\mu$ below the smallest decay rate if a repeated eigenvalue requires absorbing a logarithmic factor. The bounded solution satisfies the integral equation

$$
y(q)=\int_0^q\exp\!\bigl(J\log(q/s)\bigr)R(s,y(s))\,\frac{ds}s.
$$

In the norm $\sup_{0<q\leq q_0}\|y(q)\|/q$, the $O(q)$ forcing is bounded by $C/(\mu+1)$ times its coefficient, and the difference of two images is bounded by $C\delta/(\mu+1)$ times their difference. Choose the tube so this factor is below one, then $q_0$ small enough that the image remains in the tube. Successive substitution converges uniformly in this norm, proving existence with $y=O(q)$. For uniqueness among bounded solutions approaching the fixed point, the unweighted supremum bound has contraction factor $C\delta/\mu<1$ after a further shrink. Any such solution obeys the same integral equation: the boundary term from a lower limit $s_0$ tends to zero as $s_0\to0$ by the exponential bound. This establishes uniqueness in the stated finite-trace class.

Since $T'(q)=L(q)/W(q)>0$, $T$ has a local inverse. Recovering $x=P(-q)-T$ gives $x'(T)=-1-w$ and $w/T\to W_0/z_0=b$. Hence $x$ and velocity join continuously to the prebirth history, its right acceleration tends to $-b$, and the new self contribution remains bounded. No distributional velocity impulse appears. This completes the coupled local theorem rather than only a trace compatibility calculation.

The exact limits are material. The theorem does not cover $B=0$, simultaneous contact $x_*=0$, a degenerate older partner root, earlier supersonic history with extra roots, nonfinite acceleration trace, or a later fold. It is uniqueness within the regular finite-trace continuation class, not a claim that every generalized solution is unique. The measured prefix's positive separation and finite incoming acceleration are consistent with its hypotheses, but numerical consistency does not certify the exact event or its continuous historical margins.

The resulting geometry judgment is therefore refined: self birth is locally continuable under these explicit incoming-history conditions, so it is not a no-go for the selected linear numerator. This is a justified short local extension theorem, distinct from the parent numerical candidate beyond birth. Later outgoing braking, another turn or return after the first supersonic event remains unresolved until the later root transitions are independently controlled. A complete solution satisfying these hypotheses but failing to admit the stated local finite-trace continuation would falsify the theorem; a second such continuation with the same full past would falsify its uniqueness claim.
