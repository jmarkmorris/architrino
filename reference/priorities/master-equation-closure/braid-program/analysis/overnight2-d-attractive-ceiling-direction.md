# A conditional direction bound for an attractive capped receiver

## Purpose and scope

A large mutual acceleration need not produce a large change in speed when the receiver is already on the selected ceiling: its forward component is removed after the complete partner sum. Its tangential component can still turn the velocity toward the delayed partner. This note gives a sufficient bound for that directional tracking in the presence of the other six contributions. It uses the selected unit-weight attractive acceleration from the [geometry owner](overnight-d-finite-geometry-enclosure.md#translating-one-receiver-while-holding-a-reference-source-path-fixed) and the original [inclusive ceiling response](overnight-d-finite-history-error.md#purpose-and-status), with $K=c_f=c_a=1$.

The statement is conditional on an exact ordinary continuation, a receiver already on the ceiling, an attractive mutual channel and a complete bound for all other acceleration contributions. It supplies neither these entry conditions for the original balance-0 preparations nor coincidence, a lower ordinary-factor bound or continuation through a degenerate root. It is an additional preparation-specific proof route to investigate, not a transfer of another preparation's contact theorem. The [independent derivation and exact controls](overnight2-d-attractive-ceiling-direction-independent-review.md) accept this conditional theorem. The separately reviewed floating endpoint screen does not establish actual entry.

## Variables and proposed invariant region

Let $v=V_i(t)$ be the receiver velocity, let $s=t-R$ be the selected source time, and let

$$
n=\frac{X_i(t)-X_j(s)}R,\qquad D=1-n\cdot V_j(s)>0,\qquad |n|=1,\qquad R>0.
$$

The source satisfies $|V_j|\le1$, so $D\le2$. The attractive mutual acceleration is $-\kappa n$, where $\kappa=1/(DR^2)$. Write the sum of the other six contributions as $E$, with a verified bound $|E|\le B$ over the entire proposed interval. Thus the complete raw acceleration is $A=-\kappa n+E$. This decomposition does not project the contributions separately.

On the unit sphere, define the chordal directional error

$$
z=|v+n|,\qquad c=-n\cdot v=1-\frac{z^2}{2},\qquad D_r=1-n\cdot v=2-\frac{z^2}{2}.
$$

Small $z$ means that the receiver moves almost directly toward the partner's delayed position. Choose positive constants $k$ and $\bar R$, and consider the region $z\le kR$, $0<R\le\bar R$. The coefficient $k$ converts delayed range into a dimensionless chord bound in the selected normalized variables. Require

$$
k\bar R<\sqrt2,
\qquad
1-\frac{k^2\bar R^2}{2}>2B\bar R^2,
$$

and the strict boundary inequality

$$
k\left(1-\frac{k^2\bar R^2}{4}\right)>2+2B\bar R+2k\bar R.
$$

These are sufficient conditions, not claimed necessary conditions.

## The complete acceleration keeps the ceiling active

Inside the proposed region,

$$
v\cdot A=\kappa c+v\cdot E
\ge\frac{1-k^2\bar R^2/2}{2\bar R^2}-B>0.
$$

Consequently the selected ceiling response removes a strictly positive forward component of the complete sum and gives

$$
\dot v=(I-vv^{\mathsf T})(-\kappa n+E).
$$

It is tangent to the unit sphere. Starting on the sphere, the receiver remains there as long as this region and the ordinary continuation persist. This uses the already selected projected dynamics, not a replacement equation or a projection of the mutual contribution before adding the other six. The strict forward inequality also prevents an inward departure from the ceiling at a first boundary contact while these conditions hold.

## Exact delayed-direction motion

Differentiating the causal relation on the ordinary branch gives

$$
\dot s=\frac{D_r}{D},\qquad
\dot R=1-\frac{D_r}{D},\qquad
\dot n=\frac{(I-nn^{\mathsf T})[v-V_j(s)D_r/D]}R.
$$

No source-acceleration bound is used in these identities. With $q=(1-z^2/4)^{1/2}$, the unit vectors satisfy $|(I-nn^{\mathsf T})v|=zq$. Hence

$$
|\dot n|\le\frac{zq+D_r/D}{R}\le\frac{z+D_r/D}{R}.
$$

The estimate retains the same $D$ as the mutual acceleration. Replacing it by an unrelated worst-case bound before comparing the two terms would lose the cancellation used next. The identities are applied only where the source velocity and ordinary implicit root give locally absolutely continuous variables; a velocity-jump trace crossing requires its own treatment.

## The directional boundary points inward

At $z>0$, differentiating $z^2=2(1+n\cdot v)$ and using the projected equation yields

$$
\dot z\le-\kappa z\left(1-\frac{z^2}{4}\right)+q(B+|\dot n|)
\le-\frac{z(1-z^2/4)}{DR^2}+B+\frac{z+D_r/D}{R}.
$$

To check a first exit from $z\le kR$, evaluate at its boundary $z=kR>0$. The $z/R$ term cancels the constant part of $k\dot R$, giving

$$
\frac{d}{dt}(z-kR)
\le\frac{-k(1-k^2R^2/4)+BDR+D_r+kD_rR}{DR}.
$$

Because $0<D\le2$ and $0\le D_r\le2$, its numerator is at most

$$
-k\left(1-\frac{k^2\bar R^2}{4}\right)+2+2B\bar R+2k\bar R<0.
$$

Thus the vector field points strictly into the directional region at every ordinary positive-range boundary point. A first-exit argument preserves $z\le kR$ from an admitted initial condition while the external bound and ordinary continuation hold. The bound does not require a uniform numerical lower bound for $D$ to state this boundary sign; the existence of each ordinary root still requires $D>0$. It does not authorize reaching or crossing $D=0$.

## Keeping the delayed range below its upper boundary

Within the directional region,

$$
\dot R=1-\frac{D_r}{D}\le1-\frac{D_r}{2}=\frac{z^2}{4}\le\frac{k^2R^2}{4}.
$$

In particular, before any first exit through $R=\bar R$, $\dot R\le k^2\bar R^2/4$. If $R(t_0)\le R_*<\bar R$ and an interval length $h>0$ obeys

$$
R_*+\frac{k^2\bar R^2h}{4}<\bar R,
$$

then that upper-range exit is impossible before $t_0+h$. Combining the two boundary arguments gives the conditional result on every existing ordinary part of this interval: the receiver stays on the ceiling, $z\le kR$ and $R<\bar R$. A loss through zero range, a nonordinary root, a source trace outside the assumed smooth class, or failure of the external bound is not excluded. The statement supplies no positive lower bound for $R$ or for $D$ and no lower bound on the rate of present separation.

## Exact controls and original-preparation obligations

A normalized rational example uses $k=3$, $\bar R=1/100$, $B=3$, $R_*=9/1000$ and $h=1/1000$. The directional boundary has left side $119973/40000$ and right side $53/25$, leaving positive margin $35173/40000$. The forward condition compares $19991/20000$ with $3/5000$, and the upper-range estimate is $9/1000+9/40000000<1/100$. These are exact sufficient-condition controls, not certified parameters of an original release.

For the projected-response identity, take $n=(1,0,0)$, $v=(-3/5,4/5,0)$ and $E=0$. The mutual contribution gives $\dot v=(-16\kappa/25,-12\kappa/25,0)$ and the fixed-direction part of $d(z^2)/dt$ is $-32\kappa/25$. For a stationary source with $R=2$ at that instantaneous geometry, $D=1$, $D_r=8/5$, $\dot s=8/5$, $\dot R=-3/5$ and $\dot n=(0,2/5,0)$. These separate controls check the response and causal differentiation formulas; they do not omit the moving-direction term in a full application.

The earlier original balance-0 external-six estimates are numerical-history diagnostics over a short window, not admitted exact values of $B$. The retained close-pair snapshots likewise do not supply an exact capped entry state. An actual application must independently establish those conditions, both directed mutual signs, the complete source branch and the upper-range/directional entry inequalities for each receiver. The [mean directional deficit](overnight2-d-approach-delay-geometry.md) needed to control delayed range relative to present separation remains a separate history condition. A bound for $|v+n|$ alone must not be substituted for that mean source-path deficit.

Shared-venv exact-rational controls passed the displayed condition margins, projected tangent response, stationary-source clock/direction derivatives and their combined instantaneous derivative. With the stationary-source control's $R=2$ and $\kappa=1/4$, the complete derivative is $d(z^2)/dt=8/25>0$, explicitly showing why attraction alone does not make the directional error decrease at every range. The retained receipt is `attractive-ceiling-direction-controls.json` under the task runtime owner. These controls do not establish a dynamical application, and independent review remains pending.

An ordinary exact trajectory meeting every stated premise but crossing the directional or upper-range boundary would refute this conditional result. A false projected-response identity or causal derivative would refute its derivation. A small numerical angle, large raw mutual row or bounded external-six diagnostic does not establish the premises. No new numerical release has been run and no actual coincidence claim is made.
