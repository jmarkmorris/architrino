# Next deciding question: coupled balance on the alternating gap simplex

## Remaining domain

The current [C report](overnight2-c-followup-and-research-2026-10-07.md) records the independently reconstructed exclusion of nonalternating equal-radius configurations and its radial residual margin. The remaining equal-radius problem has alternating cyclic polarity. The [speed-bound companion](overnight2-c-equal-radius-speed-bound.md) supplies the proposed sharper necessary condition $2v^2(1+v)>1$, with its review status owned by the main report. The present note is a parent-derived exact reformulation awaiting independent reconstruction before use as a new exclusion; it does not assert a solution or a universal tangential sign.

Keep all original assumptions and the unchanged second-allocation clock. This next item remains within the selected equal-radius boundary investigation, not a new history family or expanded numerical cover.

## Three linked angular gaps

Order the three positive endpoints counterclockwise. Write their consecutive positive-to-positive gaps as $G_1,G_2,G_3$, each in $(0,\pi)$, with $G_1+G_2+G_3=2\pi$. Define complementary gaps

$$
\xi_i=\pi-G_i>0,\qquad \xi_1+\xi_2+\xi_3=\pi.
$$

These variables parameterize the alternating domain by one open two-dimensional simplex, preserving the phases rather than treating causal angles independently. Normalize the common radius to one, retain $0<v\le1$, and use the checked inverse angle map $\alpha_v(\beta)=H_v^{-1}(\beta)$, where $H_v(\alpha)=\alpha-2v\sin(\alpha/2)$.

For $0<\beta<2\pi$, define

$$
R_v(\beta)=\frac1{1-v\cos(\alpha_v(\beta)/2)},\qquad
B_v(\beta)=\frac{\cot(\alpha_v(\beta)/2)}{1-v\cos(\alpha_v(\beta)/2)}.
$$

For $0<\beta<\pi$, package the complete neutral pair into

$$
P_v(\beta)=R_v(\beta)-R_v(\beta+\pi),\qquad
Q_v(\beta)=B_v(\beta)-B_v(\beta+\pi).
$$

Use cyclic indices, so $\xi_0=\xi_3$. At the $i$th positive receiver, the preceding positive endpoint is clockwise $G_{i-1}=\pi-\xi_{i-1}$ away, while the following positive endpoint is clockwise $2\pi-G_i=\pi+\xi_i$ away. Adding their negative antipodes and the receiver's own antipode gives the six exact necessary scalar equations

$$
P_v(\pi-\xi_{i-1})-P_v(\xi_i)=R_v(\pi)-2v^2,
$$

$$
Q_v(\pi-\xi_{i-1})-Q_v(\xi_i)=B_v(\pi),
\qquad i=1,2,3.
$$

The factor $1/2$ in each physical row has been removed by multiplying the complete equation by two. All fifteen positive-receiver partner rows are retained, with the thirty-row full system recovered by antipodal symmetry and no positive self roots. For the regular alternating hexagon, $\xi_1=\xi_2=\xi_3=\pi/3$, and all three receiver equations coincide; that hand check confirms the cyclic indexing but does not verify the general reduction independently.

The tangential kernel is strictly decreasing:

$$
\frac{dB_v}{d\beta}=-\frac{1-v\cos^3(\alpha/2)}{2\sin^2(\alpha/2)[1-v\cos(\alpha/2)]^3}<0,
\qquad \alpha=\alpha_v(\beta).
$$

Consequently $P_v$ and $Q_v$ are positive on $(0,\pi)$. Their differences in the coupled equations can nevertheless have either sign; positivity of the individual pair functions does not establish balance or a sign for the complete sum.

## A concrete joint formulation and stopping criterion

Put $C_v(x)=(P_v(x),Q_v(x))$ and $L_v=(R_v(\pi)-2v^2,B_v(\pi))$. Exactness requires

$$
C_v(\pi-\xi_{i-1})-C_v(\xi_i)=L_v
$$

at all three vertices of the same gap simplex. This retains radial and signed-tangential correlations that separate interval signs or an unrestricted total-tangential shortcut lose. The next task is to reconstruct this formulation independently and derive a restriction on these linked translated-curve intersections, or exhibit the precise obstruction to such a restriction. Injectivity or convexity of $C_v$ must be proved; neither is an assumption.

A deciding result would be an admitted full-vector reference, a continuous exclusion on a declared part of this remaining domain, or a proved limitation identifying what a different method must retain. A finite grid with no small residual would not decide the simplex, and a total-tangential counterexample outside radial balance would not refute a sign condition restricted to the radial equations. No additional subdivision budget or broad optimizer run is selected in this note.
