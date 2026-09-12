# Background and Simple Action

An [architrino](../../../foundations/architrino.md) is a primitive pointlike carrier with one of two polarities and no primitive mass property. It emits a causal wake: expanding spherical surfaces centered on its earlier positions. Its acceleration is the sum of contributions from earlier emissions whose surfaces reach its current position. “Simple action” here names this causal response; it does not identify a scalar functional whose variation has been proved to generate the motion.

The background is fixed absolute time times Euclidean space. Free paths are straight. Accelerations come only from delayed causal hits, with line-of-action direction and transmitter-side acceleration weight, never from background curvature.

## Dynamical Geometry

The arena is [absolute time](../../../foundations/absolute-time.md), a common time coordinate $T$, together with the [Euclidean void](../../../foundations/euclidean-void.md), ordinary three-dimensional space: $\mathcal{M}=\mathbb{R}\times\mathbb{R}^3$. Each simultaneity slice $\Sigma_T=\{T\}\times\mathbb{R}^3$ is the spatial snapshot at time $T$ and carries the flat spatial metric $h_{ij}=\delta_{ij}$, the identity matrix in Cartesian coordinates.

A worldline $\mathbf X(T)$ records position through absolute time; its velocity is $\mathbf V(T)=d\mathbf X/dT$ and its acceleration is $\mathbf A(T)=d^2\mathbf X/dT^2$. In the absence of interaction, $\mathbf A=\mathbf0$, so the path is uniform and straight as time advances. This is the free-motion postulate in the fixed background, not a conclusion about geometry reconstructed by physical observers.

## Causal Roots and Their Weights

Let $o$ label a transmitter and $o'$ a receiver. At reception time $T_r$, a wake emitted at $T_t<T_r$ has radius $c_f(T_r-T_t)$, where $c_f>0$ is its fixed propagation speed in the Euclidean void. Its center remains at $\mathbf X_o(T_t)$. A causal root is an emission time satisfying
$$
\|\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)\|=c_f(T_r-T_t)
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-a8349ac32e45787a)

The equation selects the part of the transmitter's path history that reaches the receiver now. Write $r(T_r;T_t)=\|\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)\|$ for their separation. At a noncoincident hit, the outward surface normal is
$$
\hat{\mathbf{r}}
=
\frac{\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)}
{\|\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)\|}
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-a7da923f089a140d)

The per-hit acceleration is collinear with this radius from emission point to receiver; the polarity sign determines its orientation. No cross product or right-hand-rule term enters the primitive rule.

Define the causal support function $g(T_r;T_t)=r(T_r;T_t)-c_f(T_r-T_t)$. On differentiable histories with $r>0$, at a simple root where $\partial_{T_t}g\ne0$, differentiation gives
$$
\begin{aligned}
D_t&=\partial_{T_t}g
=c_f-\hat{\mathbf r}\cdot\mathbf V_o(T_t),\\
D_r&=-\partial_{T_r}g
=c_f-\hat{\mathbf r}\cdot\mathbf V_{o'}(T_r),\\
\frac{dT_t}{dT_r}&=\frac{D_r}{D_t},
\qquad
W^{\mathrm{acc}}=\frac{c_f}{|D_t|}.
\end{aligned}
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-64ee29567fb2e6aa)

Here $D_t$ is the transmitter-time derivative at fixed reception time; a simple root has $D_t\ne0$. The receiver factor $D_r$ gives the signed root-playback rate through $dT_t/dT_r$: differentiating $g(T_r;T_t(T_r))=0$ yields $-D_r+D_t\,dT_t/dT_r=0$. Both factors have speed units. The dimensionless acceleration weight $W^{\mathrm{acc}}$ describes how emission times bunch at a received root, whereas playback describes how that root moves as reception time advances.

## Regular History Domain

Fix a finite member set, reception interval $[T_0,T_1]$, and retained history depth $h>0$, with compatible continuously differentiable position histories on $[T_0-h,T_1]$. For each ordered transmitter-receiver pair, the retained root set is
$$
\mathcal C_{o'\leftarrow o}(T_r)
=\{T_t\in(T_r-h,T_r):g(T_r;T_t)=0\}.
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-6e68e862aa5efb32)

The regular formula below assumes a uniformly finite count of these roots, positive separation $r\ge d_{\min}>0$, a transmitter-Jacobian floor $|D_t|\ge d_t>0$, and positive delay margins from both retained endpoints. Here $d_{\min}$ is a length floor and $d_t$ is a speed floor. A retained branch chart is the record of those roots and their continued identities over the reception interval. Its all-root account requires existence and uniqueness in the active-root neighborhoods and positive bounds on $|g|$ over the remaining retained domain outside the declared endpoint exclusions. Naming a root or observing $D_t\ne0$ does not establish that account.

Self-hits use $o=o'$ and satisfy the same regular conditions. Strict delay excludes the zero-delay self coincidence; it supplies no continuation through its birth. At a caustic, where $D_t=0$, or at a separation-floor or endpoint-margin failure, the regular formula ceases to apply. Continuation requires a separately specified event or regularization rule with its boundary terms; see the [Master Equation branch chart](../../../dynamics/master-equation.md#branch-chart-closure-object). No finite-width prescription or singular-limit theorem is defined here.

These assumptions describe a retained calculation. Equality with the full history law additionally requires the omitted total contribution to vanish. Otherwise, an account of excluded endpoint neighborhoods, older emissions, and transmitters outside the retained member set must supply a declared truncation bound for the resulting approximation. The finite root set alone proves no delayed-history completeness or assembly stability.

## Continuous Emission and Acceleration

The [constant-time emission postulate](../../../foundations/architrino.md#constant-time-emission-measure-postulate) assigns equal signed measure to equal absolute-time emission intervals. Let $q_o$ be the fixed signed polarity amplitude of transmitter $o$. In the [Master Equation normalization](../../../dynamics/master-equation.md#autonomous-emission-labeled-wake-transport), the emission interval $dT_t$ carries measure $d\mu_o=c_fq_o\,dT_t$. On its sphere of radius $R=c_f(T_r-T_t)>0$, the area density is
$$
\varrho_{o,T_t}^{\mathrm{surf}}(T_r)
=\frac{d\mu_o}{4\pi R^2}
=\frac{c_fq_o\,dT_t}{4\pi R^2}.
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-9c165fd0ccf57a2d)

Here $\varrho^{\mathrm{surf}}$ is signed measure per surface area, and $4\pi R^2$ is that area. Integrating it over the sphere returns $d\mu_o$, not a full $q_o$ assigned independently to every member of a continuous family. This is a kinematic measure convention; it derives neither an energy current nor momentum transport.

At fixed reception time, the Dirac distribution $\delta(g)$ selects the emission roots. For a continuous scalar or vector factor $f(T_t)$ on the regular retained domain, changing variables from $T_t$ to $g$ separately around each simple root gives
$$
c_f\int_{(T_r-h,T_r)} f(T_t)\,\delta(g(T_r;T_t))\,dT_t
=\sum_{T_t\in\mathcal C_{o'\leftarrow o}(T_r)}
\frac{c_f f(T_t)}{|D_t(T_r;T_t)|}.
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-ca9a7334a66b7f31)

The integral is over the open retained interval; neither endpoint, including zero-delay self coincidence, contributes. The absolute derivative occurs because each root contributes its positive integration measure regardless of the sign of $D_t$. This single emission-time collapse supplies $W^{\mathrm{acc}}$ once. The inverse-square factor comes from surface area; the playback ratio $D_r/D_t$ supplies no additional instantaneous strength.

With the radial-response postulate, the [Master Equation](../../../dynamics/master-equation.md#the-master-equation-canonical-form) restricted to this retained domain is
$$
\mathbf A_{o'}^{\mathrm{ret}}(T_r)
=\sum_o\sum_{T_t\in\mathcal C_{o'\leftarrow o}(T_r)}
\kappa\,\sigma_{oo'}|q_oq_{o'}|
\frac{W^{\mathrm{acc}}(T_r;T_t)}{r^2(T_r;T_t)}
\hat{\mathbf r}(T_r;T_t).
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-817cee980597181e)

Here $\mathbf A_{o'}^{\mathrm{ret}}$ is the retained acceleration, the outer sum runs over the declared transmitters, $q_{o'}$ is the receiver's signed polarity amplitude, $\sigma_{oo'}=\operatorname{sign}(q_oq_{o'})$, and $\kappa>0$ is the coupling constant with geometric normalization such as $1/(4\pi)$ absorbed. The geometry and weight in each summand use that ordered pair. The product $\kappa|q_oq_{o'}|$ has acceleration-times-area units. Like polarities give $\sigma_{oo'}=+1$, directed away from the emission point; unlike polarities give $-1$, directed toward it. Each distinct ordered root contributes once, including any admitted self-root.

The derivative and root-collapse identities are derived on the declared regular domain. The constant-emission and radial-response rules are substrate postulates used by this acceleration law; the identities do not independently prove those postulates.

## Persistent Hits and the Meaning of Action

A simple causal root can persist over a whole reception interval. In normalized wake-speed units $c_f=1$, prescribe $\mathbf X_o(T)=(0,0,0)$ and $\mathbf X_{o'}(T)=(1,0,0)$. Then $T_t=T_r-1$, $D_t=D_r=1$, and $W^{\mathrm{acc}}=1$ at every reception time whose retained window contains that root. The law assigns the same nonzero per-hit acceleration throughout the interval. This derived prescribed-history example tests temporal support; the stationary pair is not asserted to solve the coupled motion equations or to be an equilibrium.

Thus a hit names a contribution at a receiver event, not necessarily an isolated pulse. Tracking root births or departures as numerical events does not make motion inertial between them. Motion is inertial on an interval only when the total acceleration vanishes throughout it, either because there are no active contributions or because their vectors cancel. A finite impulse means a velocity change $\Delta\mathbf V=\int\mathbf A\,dT_r$ over a specified interval with an established integral; its existence through a singular transition requires a separate argument.

The [Causal Action Functional](../../../dynamics/causal-action-functional.md) defines a scalar history-comparison statistic, distinct from a proved variational generator. Variational closure would require a functional whose complete variation, including receiver and transmitter appearances, admitted self-history, and endpoint terms, reproduces the same acceleration law. An independent energy or conservation account must also use the same histories and boundaries, as specified in [Delay Dynamics Energy](delay-dynamics-energy.md#accepted-construction-routes). Those obligations remain open; continuous wake geometry and the regular root sum do not settle them.
