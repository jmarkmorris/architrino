# Numerical cells ending at the original source fronts

## Question and boundary

The first high-order comparison through time 67 has small smooth-cell residuals but larger residuals in cells crossing the original source-zero acceleration jumps. A source front is a reception at which a partner's causal source time passes through zero, the prescribed initial velocity jump. The geometric monitor for channel $j\to i$ is

$$
F_{ij}(t)=t-|\mathbf Q_i(t)-\mathbf X_j(0)|.
$$

This note proposes a numerical construction that ends a comparison cell at each such front. It changes neither the original kick nor the selected delayed acceleration law. It adds no velocity reset, reflection, contact rule, root exclusion or physical smoothing. Its result is an approximate continuous reference; its residual and event-location error still require independent enclosure before actual-history admission.

## Smooth branch used to locate the next front

Before a channel reaches its first source-zero front, its source time is negative. Its contribution therefore depends only on the prescribed rigid past for that channel. Extend the same rigid formula analytically beyond zero solely to construct a smooth trial numerical step. On the part of that step before the actual source-zero reception, the extension is identical to the selected source history. Any trial continuation beyond the earliest front is discarded.

Channels whose fronts have already occurred use the ordinary completed positive comparison history and its compatible velocity. At each accepted node, the finite set of channels that have not yet crossed is retained explicitly. Each trial uses the complete negative formula for those channels and the ordinary history for the others. No channel is omitted. Under a whole-path speed bound below one, each monitor $F_{ij}$ is strictly increasing, so the earliest zero among the pending channels is the first point at which the trial branch could cease to represent the original source-time domain.

The numerical procedure is therefore: construct one smooth trial cell; evaluate the front monitors using that cell's declared position polynomial; locate every pending crossing in the cell; retain only the portion ending at the earliest one; and restart numerical integration with the crossed channels on their ordinary source branch. If no monitor crosses, retain the complete trial cell. A numerical source-front list or point root is not by itself a proof that all fronts were found; whole-cell speed and monitor bounds remain required.

The analytic extension is a local integration device for the already specified negative branch. Its discarded part is not an authorized physical continuation. Residual measurements on every retained cell use the original full reference history, without that extension. Any difference between the ideal front and its numerical localization then appears in the residual and must be paid for over a validated event interval.

## Restricting the comparison polynomial

Let the trial cell have width $h$ and a factored degree-seven position polynomial $P(q)$, $q=(t-a)/h$, as in the [anchoring theorem](overnight2-d-dense-anchoring.md). If its first front occurs at normalized coordinate $\theta\in(0,1]$, the retained polynomial is $P(\theta u)$ on $0\le u\le1$, with width $h_*=\theta h$. Its new endpoint position and velocity are $P(\theta)$ and $P_q'(\theta)/h$. The latter is the existing left derivative, not a physical velocity jump.

The coefficient of $u^k$ is the old coefficient of $q^k$ multiplied by $\theta^k$. Its four highest coefficients therefore determine a new factored correction through the already proved anchoring identities. Together with the original left node and these new endpoint data, the retained polynomial equals the restriction in exact arithmetic. This construction preserves position and velocity continuity when the next comparison cell starts from the same endpoint data. Floating evaluation and refactoring discrepancies are numerical representation errors, not an exact-arithmetic identity.

A channel may be switched to its ordinary positive source branch only at its recorded numerical front. Exactly equal encoded roots may share a node; different encoded roots are not silently called simultaneous. A cell whose width cannot be represented usefully must stop with a close-front limitation rather than be hidden by an arbitrary physical event ordering.

## Controls, evidence and falsifiers

An independent polynomial restriction control uses $P(q)=q^5$, $\theta=1/2$: its new endpoint is $1/32$, its physical derivative there is $5/16$ for $h=1$, and the restricted polynomial is $u^5/32$ with width $1/2$. A scalar equation with constant acceleration on either side of a prescribed front gives exact quadratic segments; joining their position and velocity while changing acceleration checks that numerical splitting does not introduce a velocity reset. A stationary source and an approaching straight receiver give the exact front time $d/(1+v)$ when the initial separation is $d>0$ and the receiver approaches with speed $v<1$.

The branch construction is falsified if a retained interval uses an analytically extended source after its original front without a quantified event-location allowance, or if a crossed channel is omitted or counted twice. Polynomial restriction is falsified by a changed value or derivative on the retained interval. A claimed continuous comparison is falsified by differing position or velocity traces at a retained node. A numerical run alone establishes none of the complete-history, exact-root or residual bounds needed for actual membership.

## Development status

This is a proposed response to a measured residual concentration, within the existing authorization to test a separately controlled lower-residual approximation. Independent mathematical review and known controls precede target interpretation. The original dense, quintic and signed outputs remain unchanged. The parent owns implementation and the [current research account](overnight2-d-followup-and-research-2026-10-07.md).
