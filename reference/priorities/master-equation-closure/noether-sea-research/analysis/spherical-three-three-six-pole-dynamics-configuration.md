# Frozen fourth six-pole preparation

**Exact selected input, frozen before target reasoning.** This additional pattern retains the [six-pole plan](spherical-three-three-six-pole-plan.md), SHA-256 `b66ecf15b903624c2007228f8613df59f52d40ae83378c6beee1c269da4b8b43`, with $K=c_f=1,R=10$, positive poles $P_x,P_y,P_z$ and negative opposite poles $E_x,E_y,E_z$. Initial physical velocities are $\mathbf v_i=\mathbf d_i/2$. Only $P_x$ uses its opposite-cap direction; the other five use common-rotation directions.

| Label | Unit position $\mathbf n_i$ | Unit direction $\mathbf d_i$ |
| --- | --- | --- |
| $P_x$ | $(1,0,0)$ | $(0,1,1)/\sqrt2$ |
| $E_x$ | $(-1,0,0)$ | $(0,-1,1)/\sqrt2$ |
| $P_y$ | $(0,1,0)$ | $(-1,0,1)/\sqrt2$ |
| $E_y$ | $(0,-1,0)$ | $(1,0,-1)/\sqrt2$ |
| $P_z$ | $(0,0,1)$ | $(1,-1,0)/\sqrt2$ |
| $E_z$ | $(0,0,-1)$ | $(-1,1,0)/\sqrt2$ |

Each direction has exactly two components of magnitude $1/\sqrt2$ and zero component along its pole axis, so its norm is one and its tangent dot product is zero. No renormalization or pole movement is used. This fourth pattern is separate from cases 1, 2 and 3 and from every hexagon history.

For physical past time $S=10s$, the complete supplied history is

$$
\mathbf X_i(10s)=10[\mathbf n_i\cos\theta(s)+\mathbf d_i\sin\theta(s)],
\quad \theta(s)=0\ (s\le-1/4),\quad
\theta(s)=\tfrac12s(1+4s)^3\ (-1/4\le s\le0).
$$

Positive time is actual canonical all-root transmitter acceleration with normal sphere support only. Normal support is $\lambda_i=-|\mathbf v_i|^2/10-\mathbf n_i(T)\cdot\mathbf A_i$, positive outward. No tangent controller or prescribed future is selected.

Analytical input controls: $(1,0,0)$ with tangent direction $(0,1,0)$ has the expected zero dot product and unit norm; the invalid radial direction $(1,0,0)$ has dot product one and is rejected. The selected preparation gives $\theta'(0)=1/2$, and at $s=-1/8$ gives $\theta=-1/128$, $\theta'=-1/8$. These nonzero controls distinguish this coefficient from the hexagon's coefficient. Input falsifiers are a wrong direction sign, nonzero tangent dot product, nonunit norm, wrong polarity or changed preparation coefficient.

Dispatch `a696816b-f26b-466e-8bd5-554bc8d7e949` was admitted untruncated at 2026-10-10 22:34:27 UTC with verified 2804-byte payload and plan identity; provider transport remains separately unverified. This file freezes the configuration before the separately authored target reference. No new six-pole peer reference has been read. No scientific instrument/job or additional agent is allocated or launched. Exploration cutoff remains 23:26:02 UTC and hard closeout 23:41:02 UTC.
