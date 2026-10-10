# Independent adjudication of the first hexagon extension reference

**Verdict: accepted on the stated finite interval.** The frozen [review reference](spherical-three-three-hexagon-extension-review-reference.md), SHA-256 `784194b6e3da71a0358f65c58decf96106c2fe881c17f27a1d047e1276c719c3`, proves actual continuation through $T_F+1/5$, positive tangent acceleration, the complete root census, four stationary nonleading sources, and inward signed support on that interval. The claimed enclosure $-1/16<\lambda<-11/200000$ is valid. No later continuation or exclusion of intermediate pre-feedback support zeros is accepted here.

This adjudication was written after the independently derived [symmetry reference](spherical-three-three-hexagon-extension-symmetry-reference.md) was frozen with SHA-256 `aeeebdf99f0cf86192001f491fdaa22895e7848711ec3dbc0c91c81cd654d71f`. That reference independently closed the same actual endpoint and a stronger support enclosure before exposure to this subject. The present check reconstructs the subject's particular inequalities and supplies a different radial derivative simplification. Neither reference was modified. The [extension plan](spherical-three-three-hexagon-extension-plan.md) retains scope and deadlines; coordinator acceptance and synthesis are separate from this verdict.

## Canonical geometry and scope

The scenario remains $K=c_f=1$, $R=10$, $t=T/10$, with persistent alternating labels and the prescribed negative-time preparation $p(s)=s(1+4s)^3/4$ on $[-1/4,0]$, zero earlier. Only normal support enforces the sphere. Let $u=q'$, and $x_k=k\pi/6+[P(s_k)-q]/2$. Direct subtraction of two unit-circle positions gives chord length $2\sin x_k$ and chord direction $(\sin x_k,-\cos x_k)$ in the receiver radial/tangent frame. The source tangent dotted with this direction is $-\cos x_k$, so the canonical acceleration weight is $1/[1+P'(s_k)\cos x_k]$. Projecting the signed chord contribution gives exactly the subject's $F$ and $N$, and the radius scaling gives $q''=F/10$ and $\lambda=(-u^2-N/10)/10$. The receiver factor enters the implicit-root derivative only.

The inherited event bounds $3/4<t_F<9/10$, $3/16<q_F<29/80$, $1/4<u_F<19/40$ and $\ell_F<-7/4000$ are already independently accepted, as identified in the frozen support and motion adjudications. They are initial data for this new continuation proof, not new measured trajectory values. In particular the event speed bound is stronger than merely positive speed, and the support estimate is used only at the admitted event.

For a complete-history speed bound $V<1/2$, the fixed-reception causal function is strictly monotone in emission time. Its endpoint signs give one root for each distinct partner; its derivative has magnitude above $1/2$. A positive-delay self root would require a same-path chord equal to its delay, although the path length is smaller than half that delay. It is therefore absent rather than excluded by a selected rule. Simultaneous minimum separation one and the source displacement estimate give $1\le d+Vd$, hence $d>2/3$. These arguments apply to every directed label, producing thirty partner roots and no positive-delay self roots.

## Source classification and actual continuation

The subject bootstraps $1/5<u<1/2$, $q<3/8$ for $0\le h=t-t_F\le1/50$. Every source is already available before $t_F$, since $s=t-d<t_F+1/50-2/3<t_F$. This is the essential method-of-steps fact: the new ordinary equation reads a previously generated history, not its unknown future.

The nonleading source proof is valid. At feedback, the trailing-minus-leading stationary distance is $2\sqrt3\sin(q_F/2)$. Using $\sqrt3>5/3$ and $\sin z\ge z-z^3/6$ yields

$$
2\sqrt3\sin(q_F/2)>
\frac{10}{3}\left(\frac3{32}-\frac{(3/32)^3}{6}\right)
=\frac{10225}{32768}=\frac3{10}+\frac{1973}{163840}.
$$

The static distance order on $0<q<\pi/6$ is leading, trailing, second, fourth, opposite. Thus all four nonleading stationary candidates start before $-3/10$. Each static chord has phase derivative of magnitude at most one. Candidate emission consequently advances by less than $h+(q-q_F)<3h/2\le3/100$. Every candidate stays before $-27/100<-1/4$, so it is a root of the actual stationary past. Root uniqueness identifies it with the actual root. The argument establishes the source domain first and does not assume its conclusion in the acceleration estimate.

The leading emission starts at zero and increases. A useful explicit justification for the subject's positive half-angle statement is that any positive emission lies before $t_F$, where the already generated phase is increasing, so $0\le P(s_1)\le q_F\le q(t)$. Hence $a-q/2\le x_1\le a$, with $a=\pi/6$. Its source velocity is positive, giving $D_{t,1}>1$ and $s_1'<3/2$. Thus $s_1<3/100$. The early generated-source bounds then yield $w=P(s_1)<1/125$ and $v=P'(s_1)<13/50$. At the left endpoint $s_1=w=0$ and $v=1/4$; strict positive-source inequalities apply only for $h>0$. The earlier actual source interval lies before preparation arrives at its own receivers, so these early-source estimates are applicable.

The five tangent-term bounds also pass a direct reconstruction. The stationary leading magnitude is below $9/4$: $x_0=a-q/2>1/3$ gives $\sin x_0>13/40$, and $\cos x_0<19/20$, so its magnitude is below $380/169<9/4$. Positive source phase and velocity reduce this leading term. The central term is below $(3/16)/[4(49/50)^2]<1/20$. The fourth term is at most $1/6$. For the second negative term, $\sin(b-q/2)>3/4$ and $\cos(b-q/2)<2/3$ imply magnitude below $8/27<1/3$. The trailing term has sine above $1/2$ and cosine magnitude below $7/8$, hence magnitude below $7/8$. These are independent term inequalities; none treats all delayed phases as identical.

It follows that $-29/24<F<37/15$. Integration over $h\le1/50$ gives exactly

$$
\frac{2971}{12000}<u<\frac{7199}{15000},\qquad
q<\frac{149}{400}<\frac38.
$$

These improve the bootstrap strictly. All source functions are known, the roots stay ordinary, and the vector field is locally Lipschitz in the receiver variables. Complete-history velocity remains below $1/2$. Bounded ordinary continuation therefore reaches the declared endpoint. The cyclic relabeling/global-polarity symmetry and plane reflection preserve both complete history and canonical law, so uniqueness preserves the rigid hexagon and equal instantaneous speeds. This supplies actual motion, not evaluation of a prescribed rotating curve.

## Independent check of positive speed drift

For $A(x,v)=\cos x/[4\sin^2x(1+v\cos x)]$, increasing either argument decreases $A$ on the leading chart. The loss due to velocity at fixed $x_0$ is

$$
A(x_0,0)\frac{v\cos x_0}{1+v\cos x_0}
<\frac94\frac{13}{63}=\frac{13}{28}.
$$

Direct differentiation gives

$$
-A_x=\frac{1+\cos^2x+2v\cos^3x}{4\sin^3x(1+v\cos x)^2}.
$$

On the entire source-phase interpolation, its numerator is below $63/25$ and its denominator exceeds $4(13/40)^3$, yielding $40320/2197<19$. The phase shift is $w/2<1/250$. With the independently established static bound $f_0(q)>3q$ and $q\ge q_F>3/16$, this proves

$$
F>\frac9{16}-\frac{13}{28}-\frac{19}{250}
=\frac{311}{14000}>0.
$$

Thus $u\ge u_F$ and $q-q_F<h/2\le1/100$. There is no linearization about an equilibrium and no assumption of constant speed. The subject's positive acceleration claim is accepted throughout the new interval.

## Separate radial derivative reference

The subject's $N_F(q)$ holds the leading source at phase zero with velocity $1/4$ and the other sources stationary. For the actual leading source, increasing its phase and velocity increases $\sin x(1+v\cos x)$: the partial derivatives are $\cos x+v\cos(2x)>0$ and $\sin x\cos x>0$. Here $0<x<\pi/4$. Its negative radial contribution therefore becomes less negative, proving $N\ge N_F(q)$ by direct canonical comparison.

The second positive term and the trailing negative term increase $N_F$ with receiver phase. Only the leading negative term, central negative term and fourth positive term need lower derivative bounds. For the leading magnitude put $c=\cos x_0$. Its phase derivative is

$$
B'(q)=\frac{c+(2c^2-1)/4}{8\sin^2x_0(1+c/4)^2}
=\frac{G(c)}{8\sin^2x_0},\qquad
G(c)=\frac{c+c^2/2-1/4}{(1+c/4)^2}.
$$

A separate simplification avoids the subject's numerator/denominator certificate. Differentiation shows

$$
G'(c)=\frac{9/8+3c/4}{(1+c/4)^3}>0.
$$

Hence $G(c)\le G(1)=4/5$ and $B'<(4/5)/[8(13/40)^2]=160/169<1$. The central magnitude derivative is $\sin(q/2)/[8\cos^2(q/2)]<(3/16)/[8(49/50)^2]<1/40$. The fourth decreasing positive term has derivative magnitude at most $(1/2)/(8\cdot3/4)=1/12$. Thus, independently,

$$
N_F'(q)>-\frac{160}{169}-\frac1{40}-\frac1{12}
=-\frac{21397}{20280}>-\frac{16}{15}>-\frac65.
$$

This proves the subject's required $-6/5$ lower derivative bound with room to spare and by different algebra. At the event $N=N_F(q_F)$, so its signed-support propagation follows:

$$
\ell=-u^2-N/10
\le-u_F^2-N_F(q)/10
<\ell_F+\frac3{25}(q-q_F)
<-\frac7{4000}+\frac3{2500}=-\frac{11}{20000}.
$$

All actual-source comparisons retain the transmitter factor. No stationary-source first integral has been extended beyond its domain. For the lower enclosure, each radial magnitude is below $1/(2dD_t)<3/4$, so $|N|<15/4$; together with $u^2<1/4$ this yields $\ell>-5/8$. Dividing by ten gives precisely the subject's physical enclosure $-1/16<\lambda<-11/200000$. Both signs and radius factors pass. There is no support zero anywhere on this closed feedback interval.

## Seams, limitations and next dependency

The six leading roots encounter release at the left endpoint, then sample generated motion. The twenty-four other roots remain before preparation with margin above $1/50$. Source positions and velocities match at release, but source angular acceleration jumps from six to zero. The root-reduced canonical acceleration and support remain continuous and locally Lipschitz; their derivatives may jump. No smooth acceleration matching is needed for the continuation theorem and no impulse or new event rule is inserted. No other seam is crossed on this interval.

Accepted claims are exactly the finite continuation, increasing speed, full source/root ledger and inward support enclosure above. Additional support zeros between first preparation arrival and first feedback remain undecided. No motion after $T_F+1/5$, first nonleading preparation reachability, recurrence, stability, physical support provider or energy map follows. Falsifiers are a failed explicit inequality, incorrect transmitter projection, wrong radius scaling, source values outside already generated history, loss of root completeness or strict bootstrap, or reversed radial comparison.

The useful next selected-history obligation is to reclose the phase/source and support estimates for a further interval, preferably toward the trailing preparation-arrival boundary. The coarse $3/8$ phase chart has only $1/400$ margin here, so iteration with unchanged constants is not justified. The frozen independent symmetry reference gives the next candidate seam equation and a positive current margin, but does not claim the event is reached. Coordinator selection remains necessary for assigning that next bounded slice; this verdict itself does not expand the motion domain.

## Admission and preservation receipt

The adjudication dispatch `5f2e8c95-baf1-418b-9377-368ad86a450c` was admitted untruncated at 2026-10-10 19:12:59 UTC, with payload verified and provider transport unverified. Before exposure/editing, `shasum -a 256` matched the assigned plan identity `568ceea281d0254c1cc754d88bec33b91a60f973f070965f49fc792134bc9b66`, subject identity `784194b6e3da71a0358f65c58decf96106c2fe881c17f27a1d047e1276c719c3`, and independently frozen symmetry identity `aeeebdf99f0cf86192001f491fdaa22895e7848711ec3dbc0c91c81cd654d71f`. No new mathematical instrument, target run, numerical evolution, job or lease was launched; analytical identities above supply the independent check. Cost and regeneration effort remain unprofiled. Only this new companion was authored for the adjudication; the original evidence and retained dispatch receipts remain unchanged. Integration belongs to the coordinator, and this bounded verdict is ready for that join.

Measured closing checks: `shasum -a 256` reproduced all three identities just listed. The scoped `git diff --no-index --check /dev/null` on this companion emitted no whitespace diagnostics (exit one denotes the new-file difference). Its three relative Markdown targets were read and their identities checked in this lane. These receipts establish scoped bytes and hygiene, not an additional independent proof. There is no owned scientific process because none was launched by this lane; no global-idle claim is made.
