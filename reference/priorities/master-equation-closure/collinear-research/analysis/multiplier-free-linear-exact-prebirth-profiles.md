# Exact prebirth source profiles for conditional two-row continuation

The independently accepted exact held release reaches an upward event with receiver clock $P\in(6.45,7.84)$, negative position, and acceleration strictly above the upward-germ threshold. The source profiles and composed finite comparisons establish this connection from the accepted prebirth history and event geometry. They supply the regularity and positive coefficient margins needed to apply the separate [generic fate theorem](multiplier-free-linear-recross-fate.md). That application permits both a global family with no turn and choices leading to finite event accumulation with no finite incoming acceleration trace. It does not select one future or identify the exact released solution with the recorded numerical $c_0=-0.03$ member. The [exact-release independent check](multiplier-free-linear-exact-release-independent-check.md) owns independent acceptance; the [fate continuation report](multiplier-free-linear-recross-fate-continuation.md) owns the numerical witness and its separate limitations.

## Source rows and scope

The scenario uses $c_f=1$, the exact decimal $k=0.2862286103053385$, and the multiplier-free signed linear-numerator acceleration law. The accepted prebirth history is $x(s)$ for $s\le12.4$, with strictly increasing clocks $P_s=s+x(s)$ and $Q_s=s-x(s)$. For a receiver clock level $p$, define

$$
s_Q(p)=Q_s^{-1}(p),\qquad s_P(p)=P_s^{-1}(p),\qquad D_Q=1-v(s_Q),\qquad D_P=1+v(s_P).
$$

The two retained rows combine as

$$
R(T,p)=k\left[\frac{T-s_Q}{D_Q}-\frac{T-s_P}{D_P}\right]=\alpha(p)T+\beta(p),
$$

$$
\alpha=k\left(\frac1{D_Q}-\frac1{D_P}\right),\qquad
\beta=k\left(\frac{s_P}{D_P}-\frac{s_Q}{D_Q}\right).
$$

This formula presupposes that these are precisely the retained rows in the receiver chart. The profile instrument does not impose that ledger on a later receiver. Its positive-delay check requires $T\ge12.41>\max(s_Q,s_P)$ for every covered panel. The lower time is below the separately accepted first-speed interval, so any receiver later than that event meets the time premise.

The accepted endpoint gives a guaranteed $Q_s(12.4)$ lower bound $11.526328300038166\ldots$. The target ends a further $10^{-12}$ below that bound so both root endpoints are strictly isolated. The requested strip from there to $11.55$ is explicitly uncovered. Its inverse $Q$ source requires history beyond the accepted ordinary prefix; event geometry must supply that bridge.

## Interval construction and regularity

The instrument `scripts/collinear-research/linear-exact-prebirth-profiles.py` uses exact fractions and outward rounding to a $2^{-96}$ grid. Its input adapter supplies exact quintic reference polynomials with independently accepted whole-cell position and velocity error radii. Monotone clock inversion encloses the true source roots, and polynomial interval ranges expanded by those radii enclose the true velocities. The adapter also supplies accepted bounds on the actual source acceleration, not merely reference-polynomial acceleration. Each panel records source intervals, denominator floors, positive-delay margin, coefficients, acceleration at the time floor, and derivative bounds.

Write $M_Q,M_P$ for bounds on actual source acceleration and $J_Q,J_P$ for bounds on its derivative almost everywhere. The reciprocal-clock derivative gives

$$
|\alpha'|\le k\left(\frac{M_Q}{D_Q^3}+\frac{M_P}{D_P^3}\right),
$$

$$
|\beta'|\le k\left(\frac1{D_Q^2}+\frac{|s_Q|M_Q}{D_Q^3}+\frac1{D_P^2}+\frac{|s_P|M_P}{D_P^3}\right).
$$

All denominators in these inequalities use the recorded lower floors. Differentiating once more yields the panel bounds

$$
|\alpha''|\le k\sum_{j\in\{Q,P\}}\left(\frac{J_j}{D_j^4}+\frac{3M_j^2}{D_j^5}\right),
$$

$$
|\beta''|\le k\sum_{j\in\{Q,P\}}\left(\frac{3M_j+|s_j|J_j}{D_j^4}+\frac{3|s_j|M_j^2}{D_j^5}\right).
$$

The derivative-of-acceleration bound is obtained from the selected one-partner subcritical source row. If $\sigma$ is the source receiver's direction, its emitted root obeys $C_\sigma(e)=s-\sigma x(s)$ and $|e'|\le(1+|v(s)|)/D$. For source delay $\Delta=s-e$ and source acceleration bound $M_e$, differentiation gives

$$
|a'(s)|\le k\left[\frac{1+|e'|}{D}+\frac{\Delta M_e|e'|}{D^2}\right].
$$

The instrument bounds both one-sided sectors if a source interval crosses contact. The acceleration is continuous there and vanishes at contact, while its derivative may jump. Thus locally bounded one-sided derivatives imply Lipschitz acceleration across contact. Release-source joins similarly permit derivative jumps. The requested source bands exclude the held-release clock images $P_s(0)=0.5$ and $Q_s(0)=-0.5$. The required regularity is $C^{1,1}$ for $\alpha,\beta$, with second derivatives bounded almost everywhere; a global smoothness claim is unnecessary.

## Recorded profile bands

The 503 panels have nominal width $0.01$. The following decimal summaries are measured from their exact rational endpoint records; the rational records govern subsequent comparisons.

| Clock band | Coefficient information | Receiver acceleration information |
| --- | --- | --- |
| $[6.5,10.11]$ | $\alpha>0$, overall lower bound $0.000333960606$ | Positivity of slope alone does not ensure positive acceleration |
| $[10.11,10.12]$ | $\alpha$ sign unresolved | $R(12.41,p)<0$ throughout |
| $[10.12,11.526328300037166]$ | $-0.086681344\le\alpha\le-0.000248224$ | $R(T,p)\le-0.5158924789$ for every $T\ge12.41$ |
| $[6.5,8.31]$ | $\alpha>0$ | $R(T,p)\ge0.0020969616$ for every $T\ge12.41$ |
| $[8.31,8.32]$ | $\alpha>0$ | Sign of $R(12.41,p)$ unresolved |
| $[8.32,11.526328300037166]$ | Mixed slope signs | $R(12.41,p)<0$; future-time negativity needs an additional time bound where $\alpha>0$ |
| $[6.5,7.5]$ | $\alpha\ge0.2926247650$ | $R(T,p)\ge1.422311804$ for $T\ge12.41$ |
| $[7.1,7.2]$ | $\alpha\ge0.8234775328$ | $R(T,p)\ge3.477101568$ for $T\ge12.41$ |

## Conditional speed and time comparisons

For a decreasing receiver clock define $w=-(1+v)>0$ and $Y=w^2$. The equations are

$$
\frac{dT}{dp}=-Y^{-1/2},\qquad \frac{dY}{dp}=2R(T,p).
$$

Here $Y$ denotes squared clock speed, not position. On a negative-slope panel, $\alpha\le0$ makes $R(T,p)$ no larger than its bound at the current earliest receiver time. If that upper bound is $-n<0$, clock decrease $d$ gives $Y_{\rm next}\ge Y_{\rm in}+2nd$ and

$$
\Delta T\le\frac{2d}{\sqrt{Y_{\rm in}}+\sqrt{Y_{\rm in}+2nd}}.
$$

Evaluating a lower acceleration bound over the resulting time window bounds $Y_{\rm next}$ above. The panel then also gives $\Delta T\ge d/\sqrt{Y_{\rm next,upper}}$. The helper `negative_comparison(panels,Pentry,Pexit,Tlo,Thi,Ylo,Yhi)` chains both time bounds and both squared-speed bounds, checking continuous panel coverage, positive delay, nonpositive slope, and strictly negative acceleration. Every entry state remains an independently supplied premise.

As an explicitly illustrative comparison, entry clock $11.526328300037166\ldots$, $T\in[12.84,13.21]$, and $Y\in[0.1,11]$ produce at clock $10.12$ the enclosure $T\in[13.2472028927,14.9013577035]$, $Y\in[1.7346164513,12.7997328735]$. This example is not an actual event enclosure. The broader transition below clock $10.12$ still needs a positive $Y$ support check and a receiver-time cap. The `regular_comparison` helper uses a strict positive floor on each panel, initially half its incoming lower bound, and retries weaker floors if needed. It bounds positive acceleration by the resulting finite time window and stops at the first failed support inequality. A failed budget is an obstruction to that comparison, not evidence that the trajectory ends. The older `support_comparison` provides a simpler fixed-floor budget.

On a positive-slope later band, `positive_action` sums the lower row bounds at a fixed earlier receiver-time floor. For decreasing clock, $Y(p)=Y(p_0)-2\int_p^{p_0}R(T(u),u)\,du$. If this lower action exceeds an independently supplied entry upper bound on $Y$, no continuation with $Y>0$ can reach the exit clock. Identifying the intervening event and its admissible continuations requires the separate germ theorem. The helper also reports a uniform acceleration floor, allowing comparison with the upward-germ threshold $2\sqrt{k}\le1.070006748213$.

The sharper, still conditional geometry input associated with `221142.343085Z` supplies top-clock $T\in[13.329642778119,15.451137299782]$, $Y\in[0.660314244756,8.385850934611]$. Its bridge source coverage was flagged for repair and these numbers are not accepted inputs. Applied conditionally, the negative-band comparison gives at clock $10.12$ $T\in[13.7868677311,16.6345328231]$, $Y\in[2.3539469482,10.4148743689]$. The subsequent support comparison reaches clock $7.84$ while the uniform acceleration floor on $[6.5,7.84]$ is $1.0838383896>2\sqrt{k}$. Thus later loss of the support estimate at clock $7.82$ occurs within a band where the germ threshold is already satisfied; it is not a failure to reach that band. The remaining action estimate to clock $6.5$ is $10.4244312064$, below the squared-speed upper bound $11.3527750658$ by approximately $0.928344$. A sharper upper bound or a wider lower clock band is required to force an event using this comparison. `top221142-conditional-comparison.json` freezes its complete conditional inputs and outputs.

The first repaired geometry receipt `221442.464396Z` encloses the top entry by $T\in[13.329642778119,15.451137300578]$, $Y\in[0.660314175757,8.385850934620]$. It was subsequently superseded by `221650.985233Z`, which also corrects the positive-delay upper bound across the prefix/incoming source split. Both earlier comparisons remain conditional historical evidence. The original source panels are supplemented by 20 new panels covering $[6.3,6.5]$, with the same accepted history input and analytic controls before the widened target. All extension panels have positive $\alpha$ and positive acceleration at time $12.41$.

The helper `positive_action_with_time` retains cancellation by evaluating the two rows directly at the receiver-time floor. Under the hypothesis that no zero of $Y$ has yet occurred, positive acceleration gives $Y_{\rm next}\le Y_{\rm in}-2R_{\rm lower}d$ and $\Delta T\ge d/\sqrt{Y_{\rm in,upper}}$. Increasing the time floor strengthens later acceleration bounds because $\alpha\ge0$. The helper stops if the proposed upper bound on $Y$ is nonpositive; it never evaluates a square root of that proposal. An exact constant-positive-acceleration control establishes this stopping behavior before the target.

Starting from the closed support state at clock $7.84$, this stronger comparison leaves an upper bound $Y\le0.2667228189$ at clock $6.5$ and then forces loss of $Y>0$ before reaching the lower endpoint of the panel $[6.45,6.46]$. The proposed upper bound there is $-0.0092540105$. The uniform direct-row acceleration floor across the entire possible event band $[6.45,7.84]$ is $1.1185621453>2\sqrt{k}$; every traversed panel has nonnegative $\alpha$. Thus the earlier $0.928344$ action deficit has been resolved at the conditional comparison level. This is a candidate event-forcing certificate, not an accepted event assertion until the repaired geometry input, widened source panels, and new comparison helpers pass independent review. The complete frozen candidate is `.local-data/collinear-research/linear-exact-prebirth-profiles/final-transfer-221442/`, including exact entry provenance, profile receipt hashes, known controls, subject snapshot, and every comparison panel. Classification and continuation of the forced zero require the separate germ and complete-ledger argument.

The final two-correction receipt `221650.985233Z` supplies $T\in[13.329642778119,15.451137303461]$, $Y\in[0.660313926032,8.385850934652]$. The accepted namespace `final-transfer-221650` copies this receipt and both original and widened source-panel receipts before calculation, reads their exact rational endpoints, and records the controls before running the target. Assuming no prior zero, the comparison produces a negative proposed upper bound $-0.009254002326$ at the lower endpoint of the panel $[6.45,6.46]$. It therefore forces a zero somewhere in the entire possible event band $(6.45,7.84)$; the counterfactual failing panel does not localize the zero to that last panel. The uniform acceleration floor is $1.118562145186>2\sqrt{k}$, and the smallest coefficient lower bound on the possible event band is $\alpha\ge0.266481041244>0$.

The accepted event-time enclosure is $T\in[14.470361503222,22.119421355512]$. Its upper endpoint follows from $w'= -R\le-H_{\min}$: from the closed entry state, time to a zero of $w$ is at most $\sqrt{Y_{\rm entry,upper}}/H_{\min}$. The position satisfies $x=p-T\le7.84-14.470361503222=-6.630361503222<0$. Source coordinate, velocity and denominator ranges, true source acceleration and derivative bounds, and coefficient derivative bounds are serialized for the compact possible-event band. Maximum recorded bounds are $|\alpha'|\le8.575559$, $|\beta'|\le65.506008$, $|\alpha''|\le2614.643$, and $|\beta''|\le18289.308$ almost everywhere. These supply local $C^{1,1}$ regularity for the germ argument. Independent review also derives the complete two-row census and regular event-neighborhood premises. Together these connect the exact held release to the upward event and permit the separate generic global family with no turn. The generic family's allowed future choices remain distinct from identifying the exact numerical $c_0=-0.03$ member or assigning its later fate.

## Evidence record and acceptance scope

The input is the immutable accepted adapter namespace `.local-data/collinear-research/linear-exact-release-defect/adapters/20261003T212800.961633Z/`: `profile.json` SHA-256 `479dadde092276b05e2ef78b60b8e022d0ebce49917e973598e7dbab3534529d`, and `adapter-subject.py` SHA-256 `37b05f9fb5647d5663f42227ea015bb729d026e07de5e4e3f316e3028597dcf5`. Profile receipt `.local-data/collinear-research/linear-exact-prebirth-profiles/20261003T220136.394801Z/panels.json` freezes copies of both inputs and the generating subject. Its 503-panel run took 71.52 seconds, with advancing ten-second heartbeats.

Before the real profile target, exact affine-history coefficient and acceleration controls and quadratic-history inverse/velocity controls passed and were recorded in `known.json`. The later comparison helper passed a separate constant-acceleration control before its conditional example: $R=-2$, unit clock decrease, and initial $Y=1$ give exact final $Y=5$; the time increment solves $dT^2+dT=1$, and both outward time bounds enclose that solution. `comparison-known.json` and `comparison-subject.py` preserve that later version separately from the original panel generator.

The input history is independently accepted. Independent static and exact-interval review first accepted all 503 panels, their hashes and source coverage, coefficient formulas, weak derivative bounds, and negative comparison mathematics at conditional two-row scope. Final independent rational replay then accepted the repaired `221650.985233Z` geometry input, all 20 extension panels, the negative chain, strict supported transition through the selected clock $7.84$ entry, and every direct-row forcing and receiver-time-floor update. Complete census and $C^{1,1}$ event-neighborhood premises were independently derived. Thus the final composition is accepted as an actual connection from the exact held release to the upward event, rather than remaining merely conditional on an unverified entry.

Valid and failing constant-acceleration support controls, an exact constant-row action integral, and a constant-positive-acceleration forcing control passed before their targets. Earlier illustrative and `221142`/`221442` receipts remain preserved at their original conditional historical scope; acceptance of `final-transfer-221650` does not retroactively validate their defective input premises. The independent reference is the separately authored rational replay and row/census derivation, not equality with the generating subject. A falsifier is a missed actual source root or velocity outside a recorded panel interval, a nonpositive recorded denominator, an acceleration or derivative bound contradicted by the declared row algebra, a coverage gap, or an omitted retained row. The exact-release connection supports application of the separate generic continuation theorem; it does not determine a physical selector or establish membership of the recorded numerical $c_0=-0.03$ branch.
