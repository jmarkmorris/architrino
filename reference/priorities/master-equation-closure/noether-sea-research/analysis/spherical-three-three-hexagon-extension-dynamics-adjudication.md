# Independent adjudication of the extension support and source reference

## Verdict and scope

**Accepted within its stated finite domain.** The [symmetry reference](spherical-three-three-hexagon-extension-symmetry-reference.md) proves actual continuation through $T_F+1/5$, increasing common speed, strictly inward support, exactly thirty ordinary partner roots with no positive-delay self roots, and four stationary nonleading sources per receiver. Its later nonleading preparation-seam lower bound is accepted only conditionally on continuation in the stated phase/speed chart; it does not extend actual motion to that later time.

This adjudication follows successful untruncated admission of dispatch `74916445-34ab-4a27-b877-37e576137519` at 19:13:03 UTC on October 10, 2026. The existing helper verified the target and plan against the retained machine-computed source baseline. Payload verification succeeded; provider transport verification remains false in the separate receipt. The review target and the [own dynamics subject](spherical-three-three-hexagon-extension-dynamics.md) were frozen before peer comparison and are preserved unchanged. This companion contains the verdict; it does not rewrite either side or the coordinator's synthesis.

## Independent reconstruction of continuation and history

I reconstructed the chord projections using a receiver on the positive horizontal axis. For source offset $2x$, receiver-minus-source chord is $2\sin x(\sin x,-\cos x)$, giving radial projection $\sin x$, tangent projection $-\cos x$, and transmitter factor $1+v_s\cos x$. The reference retains this factor in acceleration and uses the separate receiver factor only for playback. Its signs and scale $u'=F/10$, $\lambda=(-u^2-N/10)/10$ agree with the canonical selected law.

The source completeness argument is valid on the full history, not merely its present coordinates. Under the tentative speed bound $|u|<1/2$, a partner's causal function is strictly monotone with derivative magnitude bounded below by $1/2$, and the endpoint signs give one root. The self chord is strictly shorter than the elapsed time, excluding every positive-delay self root. The simultaneous separation bound gives $d>2/3$, which exceeds the proposed step length $1/50$; all required source times are therefore earlier than $t_F$. This supplies a legitimate method-of-steps interval with known history.

The reference's stationary candidates supply a stronger nonleading margin than simply transporting the old small margin. Independently subtracting the two nearest stationary distances gives

$$
d_5^0(q_F)-d_1^0(q_F)=2\sqrt3\sin(q_F/2)>\frac8{25}.
$$

The reference's weaker replacement $\sqrt3>12/7$ already suffices: exact evaluation of its cubic-sine lower expression exceeds $8/25$ by $1373/1433600$. Thus the trailing stationary emission starts below $-8/25$. Its distance derivative in phase is

$$
\frac{d}{dq}d_5^0(q)=-\frac12\sin(q/2)+\frac{\sqrt3}{2}\cos(q/2)>0.
$$

For positive receiver speed, candidate emission advances at rate below one, staying below $-3/10$ through $h=1/50$. The remaining three stationary candidates are earlier by the strict distance ordering. Since they lie below $-1/4$, these are valid candidates in the correct source history and become the actual roots by uniqueness. The claimed $1/20$ preparation margin is therefore accepted.

For the leading source, the initial playback bound gives $s_1<3/50$. The accepted early phase comparison makes its phase less than $1/50$, below the receiver phase $q_F>3/16$. Its half-angle is acute and source velocity positive, so $D_{t,1}>1$ and playback improves to $s_1'<3/2$. At $s_1\le3/100$, the early phase comparison yields $q(s_1)<1/125$. This entire source interval precedes preparation arrival, permitting its own static-source bound $q''<(33/40)/125$. Integration over length $3/100$ gives a speed increase below $1/1000$, as claimed. These are statements about known generated early motion, not a prescribed current path.

Reconstructing the signed tangent estimates gives $-3/2<F<3$. For example $x_1>1/3$ implies $\sin x_1>13/40$, so the leading term is below $400/169$; the central and fourth positive terms are below $1/20$ and at most $1/6$. The two negative magnitudes are below $4/9$ and one. The resulting speed interval is strictly inside $(0,1/2)$, and phase remains below $149/400<3/8$. These strict improvements, source availability, positive denominators, and local Lipschitz regularity close the actual continuation rather than just a formal estimate. No endpoint equality is being treated as an interior source event.

## Positive acceleration and transported speed

The derivative formula for $A(x,v)=\cos x/[4\sin^2x(1+v\cos x)]$ was differentiated independently. It gives

$$
|A_x|=\frac{\cos^2x}{2\sin^3x(1+v\cos x)}+
\frac1{4\sin x(1+v\cos x)^2},\quad
|A_v|=\frac{\cos^2x}{4\sin^2x(1+v\cos x)^2}.
$$

The stated bounds $|A_x|<16$, $|A_v|<12/5$ hold throughout the interpolation between the reference source and the actual source. The phase and velocity losses total less than $16/250+12/5000=83/1250<7/100$. Subtracting this from the stated $L(q)$ leaves a strictly positive value on both bins. Thus $F>0$ and speed increases on the whole extension.

The transported lower bound is also valid across the bin boundary. Direct differentiation of the two displayed pieces gives $U'=L/5$ away from $q=1/5$, while $U$ itself is continuous there. Since $d(u^2)/dq=F/5$ along the now proved increasing motion, integrating the piecewise inequality gives

$$
u^2>U(q)-\frac7{500}(q-q_F)>U(q)-\frac7{50000}.
$$

The derivative jump of $U$ does not obstruct this absolutely continuous comparison. It would be incorrect to assert a conserved stationary-source first integral at the current receiver; the reference does not do so.

## Independent radial reconstruction and arithmetic evidence

The actual leading radial denominator is increasing in source phase and speed, since its half-angle is below $\pi/4$ and $\cos x+v\cos 2x>0$. Therefore $N\ge N_F(q)$. The endpoint choices in the radial table are valid: upper receiver phase for leading and central negative magnitudes, lower phase for trailing magnitude, lower phase for the second positive term, and upper phase for the fourth positive term.

Rather than replay a peer output, I used the separately authored, frozen dynamics rational implementation as the basis of a new [adjudication checker](../evidence/spherical-three-three-hexagon-extension-dynamics-adjudication-rationals.mjs). The peer reference contains no target program. The checker reconstructs the five endpoint quantities from angle-addition formulas, exact rational arithmetic and alternating sine/cosine polynomial bounds, using the dynamics implementation's own rational bracket for $\sqrt3/2$. Only the new companion's target bins and comparisons changed; the original checker is frozen. This is independent of the reference's hand-constructed table, but it is not an independent reference for my own earlier checker implementation.

Its [six known and negative controls](../evidence/spherical-three-three-hexagon-extension-dynamics-adjudication-controls.json) passed before its [fourteen targets](../evidence/spherical-three-three-hexagon-extension-dynamics-adjudication-target.json) ran. All fourteen targets passed with retained positive exact rational margins. The ten radial targets reconstruct each table entry, two check the rational square-root bracket, one checks the new source-distance margin, and one checks the final transported-support comparison. Both invocations returned exit zero. The tool checks rational arithmetic consequences; the geometry, monotonicity, root coverage and continuation argument are the analytical reconstruction above.

The reconstructed sums exceed $-648/1000>-13/20$ on the first bin and $-707/1000>-71/100$ on the second. Combining them with the transported speed bound yields, in the weaker second bin,

$$
\ell<-\frac{287}{4000}+\frac7{50000}+\frac{71}{1000}
=-\frac{61}{100000}<-\frac3{5000}.
$$

The first bin is more negative. The lower support bound follows by discarding negative radial terms, bounding each positive term by $1/3$, and using $u<1/2$. Thus the reference's whole-interval enclosure

$$
-\frac1{30}<\lambda<-\frac3{50000}<0
$$

is accepted. It excludes every support zero in the claimed extension. It leaves the older preparation-to-feedback support itinerary unresolved, as the reference explicitly states.

## Later event statement and regularity

The first possible nonleading preparation class is the trailing nearest source, because its stationary distance is the least among the four nonleading distances on the stated chart. A preparation reception satisfies $t=d_5^0(q(t))-1/4$. Starting from candidate emission below $-8/25$, advancement by less than elapsed time makes arrival before $t_F+7/100$ impossible **if** positive speed and this phase chart continue that far. The reference labels this restriction correctly. The accepted actual endpoint remains $t_F+1/50$; neither eventual arrival nor actual continuation to $t_F+7/100$ is proved here.

The source release at the left endpoint has continuous position and velocity but an acceleration jump; the canonical acceleration/support remains continuous while a reception derivative may jump. All later leading emissions in the current interval are strictly positive and remain in the early generated release. The four other emissions stay below $-3/10$. Thus no new source seam occurs in the extension. Preparation's matching position, velocity and acceleration would make its future seam smoother, but that fact alone supplies no later trajectory.

## Preservation, reproduction and next dependency

Reproduce the new arithmetic evidence from the repository root in this order:

```bash
node reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-hexagon-extension-dynamics-adjudication-rationals.mjs controls
node reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-hexagon-extension-dynamics-adjudication-rationals.mjs target
node scripts/agent-dispatch.mjs verify .local-data/agent-dispatch/hexagon-extension-dynamics-adjudicate-20261010-191139/packet.json
git diff --no-index --check /dev/null reference/priorities/master-equation-closure/noether-sea-research/analysis/spherical-three-three-hexagon-extension-dynamics-adjudication.md
```

The review target, own initial subject and own initial checker are hash-checked at handoff without editing them. The new files are this companion, its matching adjudication checker, and its two JSON outputs; diagnostic identities and byte counts are retained in the admitted bundle. No shared integration, numerical evolution, source-law change, scientific job, process lease or extra agent was used. Arithmetic cost/resource use is unprofiled; no trajectory exists to replay, and retained local files are not an archive/restore guarantee. The worker's issued commands returned; this is not a global process census.

Falsifiers include an incorrect canonical projection, an invalid source-history interval, a missing root, failed strict bootstrap improvement, failed endpoint monotonicity or rational comparison, incorrect integration across the continuous piecewise $U$, or promotion of the conditional later-seam bound to reached motion. No subject correction is required by this review. The coordinator receives the accepted finite-domain verdict and owns integration. A useful next bounded obligation is a later actual continuation step with fresh phase/headroom and nonleading preparation margins; it must retain the conditional-versus-reached distinction and receive its own independent review.
