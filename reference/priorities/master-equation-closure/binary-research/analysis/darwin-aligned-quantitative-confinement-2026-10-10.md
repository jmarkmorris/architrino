# Quantitative confinement of the aligned instantaneous Darwin comparison

The DC-100 circle with the common normal velocity $0.005$ added is not an equilibrium, but it is confined for all time under the selected instantaneous comparison law. Its separation remains between $100$ and $100+1/360$. A separate preparation, obtained by slightly lowering the tangential speed at separation $100$, is an exact drifting aligned circle. Both belong to the explicit conserved-energy region proved below, at the fixed inherited momentum. This supplies the finite-preparation admission missing from the [governing correction addendum](darwin-overnight-addendum-2026-10-10.md#3-the-preparation-dc-100-plus-a-common-velocity-along-the-normal-is-near-a-circle-not-on-one).

**Claim grade: derived and independently reviewed by Claude**, with exact rational inequalities checked by the [separately captured arithmetic certificate](../evidence/darwin-aligned-confinement-certificate.mjs). Section 6 distinguishes arithmetic replay from the independent reconstruction. The certificate evaluates this proof's inequalities; it is not a second mathematical derivation or a trajectory instrument. No numerical evolution was launched.

## 1. Selected equation and reduced variables

The equation is the instantaneous functional of [equation-variants Section 10](../../equation-variants/manuscript.md#10-darwin-inspired-low-speed-interaction-comparison), with opposite polarities, unit weights, $K=c_f=1$, no self term and no kinetic correction. This is an expressly selected comparison equation, not the delayed Master Equation. Its momentum, angular and energy-like invariants below are mathematical invariants of that functional, not physical accounts.

Write $\boldsymbol\rho=\mathbf X_1-\mathbf X_2=r\mathbf e$, $\mathbf R=(\mathbf X_1+\mathbf X_2)/2$, $\mathbf U=\dot{\mathbf R}$ and $M=-(I+\mathbf e\mathbf e^{\mathsf T})/(2r)$. Translation invariance gives

$$
\mathbf P=2(I+M)\mathbf U,\qquad \mathbf U=\frac12(I+M)^{-1}\mathbf P.
$$

The relative velocity coefficients are $a(r)=1+1/r$ and $b(r)=1+1/(2r)$. Take the fixed nonzero momentum as polar axis, let $\chi$ be the latitude of $\mathbf e$, and let $\phi$ be its azimuth. Put

$$
D(r)=br^2=r^2+\frac r2,\quad
\beta_1(r)=\frac r{r-1},\quad \beta_2(r)=\frac{2r}{2r-1},\quad
q=|\mathbf P|^2,\quad j=\frac12D\cos^2\chi\,\dot\phi,\quad J=j^2.
$$

The first Routh reduction eliminates the centre velocity at fixed $\mathbf P$; the second eliminates the azimuth at fixed $j$. Because the relative velocity form is diagonal, the remaining kinetic expression is positive on $r>1$. Direct substitution in the full invariant gives the exact conserved quantity

$$
E=\frac a4\dot r^2+\frac D4\dot\chi^2+V(r,\chi;J,q),
$$

$$
V(r,\chi;J,q)=\frac{J}{D\cos^2\chi}-\frac1r+
\frac q4\left[\beta_2+(\beta_1-\beta_2)\sin^2\chi\right].
\tag{1}
$$

These reductions follow from the functional and its cyclic coordinates, as in the frozen investigation's Sections 7 and 13.1. They do not assume a physical momentum law or a boost symmetry. In particular, the common velocity must be reconstructed from fixed momentum when $r$ changes.

## 2. Two exactly specified preparations

Take $\mathbf R(0)=0$, $\mathbf X_1(0)=(50,0,0)$ and $\mathbf X_2(0)=(-50,0,0)$, with

$$
\mathbf V_1(0)=(0,u,1/200),\qquad
\mathbf V_2(0)=(0,-u,1/200).
\tag{2}
$$

The inherited momentum is $\mathbf P_0=(0,0,199/20000)$, so

$$
q=\frac{39601}{400000000},\qquad
J_m=g(100)=\frac{40401}{802},\qquad
g(r)=\frac{(2r+1)^2}{2(4r+1)}.
$$

**Original near-circle preparation.** Set $u=u_m=\sqrt{2/401}$. Then $J=J_m$, $r=100$, $\chi=\dot r=\dot\chi=0$. The radial potential derivative is exactly

$$
\partial_r V(100,0;J_m,q)=-\frac1{800000000}.
\tag{3}
$$

**Exact aligned circle at the same separation and momentum.** The corrected balance is $J=g(r)[1-qr^2/(2(2r-1)^2)]$. At $r=100$ it gives

$$
J_c=\frac{79999}{80000}J_m=\frac{3232039599}{64160000},\qquad
u=u_c=\sqrt{\frac{79999}{16040000}}.
\tag{4}
$$

With this choice both radial and latitude derivatives of $V$ vanish. The relative motion is the exact circle with angular rate $u_c/50$; the centre moves with constant velocity $(0,0,1/200)$. Equations (2) and (4), rather than a rounded decimal speed, specify the exact initial state. The original preparation and this circle have the same momentum but different angular invariants.

## 3. An explicit region and its boundary barrier

Fix $\mathbf P=\mathbf P_0$ and allow $J_c\le J\le J_m$. Let

$$
I=[99.99,100.01],\qquad |\chi|\le\eta=10^{-4},\qquad
m=9\times10^{-7},\quad M_*=11\times10^{-7},\quad
A=\frac1{800000000},\quad B=10^{-11}.
$$

Here $m$ and $M_*$ bound the radial second derivative, $A$ bounds the slope at the reference radius, and $B$ is the admitted initial energy excess above $V(100,0;J,q)$. These are exact rational constants.

**Theorem.** Every initial state in the interior of this region, with the stated momentum and angular-invariant interval and

$$
E-V(100,0;J,q)<B,
\tag{5}
$$

has a solution for all time. It stays in the interior, retains a regular velocity Hessian and remains within the declared comparison domain, separation at least $20$ and member speed at most $0.1$. The reduced confinement is modulo azimuthal phase and centre translation. It is not a bound on full positions.

**Proof.** Put $F(r)=V(r,0;J,q)$, $l=99.99$ and $h=100.01$. Differentiating (1),

$$
F''(r)=J\frac{6r^2+3r+1/2}{D(r)^3}-\frac2{r^3}+
\frac{2q}{(2r-1)^3}.
\tag{6}
$$

For all $r\in I$ and $J_c\le J\le J_m$, an exact rational lower bound is

$$
J_c\frac{6l^2+3l+1/2}{D(h)^3}-\frac2{l^3}>m.
\tag{7}
$$

The omitted $q$ term is positive. Reversing the endpoint choices in the positive and negative terms of (6), and bounding the positive $q$ term at $l$, gives $F''<M_*$. At $r=100$, the derivative varies linearly in $J$ between $0$ and $-A$, so $-A\le F'(100)\le0$. Taylor's integral formula therefore gives, for $x=r-100$,

$$
F(r)\ge F(100)+F'(100)x+\frac m2x^2
\ge F(100)-\varepsilon,
\qquad \varepsilon=\frac{A^2}{2m}=\frac1{1152000000000}.
\tag{8}
$$

At either radial endpoint $|x|=1/100$, the excess over $F(100)$ is at least

$$
\frac m2\left(\frac1{100}\right)^2-\frac A{100}
=\frac{13}{400000000000}=3.25\times10^{-11}>B.
\tag{9}
$$

The latitude contribution is positive:

$$
V(r,\chi)-F(r)=\frac{J}{D(r)}\tan^2\chi+
\frac q4(\beta_1-\beta_2)\sin^2\chi
\ge\frac{J_c}{D(h)}\chi^2.
\tag{10}
$$

This uses $\beta_1>\beta_2$ for $r>1$ and $|\tan\chi|\ge|\chi|$ in this chart. At $|\chi|=\eta$, equations (8) and (10) give the excess at least

$$
\frac{J_c}{D(h)}\eta^2-\varepsilon
=\frac{2286759970829}{46435438599552000000000}
>4.9\times10^{-11}>B.
\tag{11}
$$

The kinetic terms of $E$ are nonnegative. A first exit through any configuration boundary would require an energy excess greater than $B$, contradicting (5) and conservation. Equations (8) and (5) also give

$$
\frac a4\dot r^2+\frac D4\dot\chi^2<B+\varepsilon.
\tag{12}
$$

For each $J$ in the interval the radial potential has a unique minimum in $I$: $F'(100)\le0$, its derivative is increasing by (7), and $F'(100.00127)>0$ even at $J=J_m$. Thus this is an explicit energy neighbourhood of the aligned-circle family, rather than confinement about a non-equilibrium spectrum.

The full Hessian eigenvalues are $1\pm1/r$ and $1\pm1/(2r)$, the latter twice each. On $I$ its smallest eigenvalue exceeds $0.98$, its largest is less than $1.02$, its determinant exceeds $0.98^6$ and its condition number is less than $1.04$. Neither frozen implicit-solve obstruction threshold can be reached.

Reconstruction uses $\dot\phi=2j/(D\cos^2\chi)$ and $\mathbf U=(I+M)^{-1}\mathbf P_0/2$. Throughout the confined region, the common speed is less than $0.006$; the relative tangential half-speed is less than $0.072$; and (12) bounds each radial and latitude half-speed by $0.000005$. These bounds follow from $\cos\chi\ge1-\eta^2/2$, $J\le J_m$, $a\ge1$ and $D\ge D(l)$; the rational certificate checks their squared inequalities. Consequently

$$
|\mathbf V_i|<0.006+0.072+0.000005+0.000005
=0.07801<0.1.
\tag{13}
$$

The reduced variables, velocities and cyclic azimuth modulo $2\pi$ stay in a compact subset of a regular coordinate chart. The full autonomous equation depends on relative positions and velocities, and the reconstructed centre velocity is bounded. Local existence can therefore be extended across every finite time; the drifting centre creates no finite-time obstruction. The same conserved-energy argument applies in both time directions. This proves the theorem. $\square$

## 4. A sufficient finite initial-data neighbourhood

At each selected $J$ with fixed $\mathbf P_0$, the following box is admitted by (5):

$$
|r(0)-100|\le10^{-3},\qquad |\chi(0)|\le10^{-5},\qquad
|\dot r(0)|\le10^{-6},\qquad |\dot\chi(0)|\le10^{-8}.
\tag{14}
$$

This is a neighbourhood within the stated invariant fibers. A tangential speed above the original mirror value, or a changed momentum, falls outside the displayed parameter interval. To check it, write $\xi=10^{-5}$. The radial potential excess is at most $A10^{-3}+M_*10^{-6}/2$. The latitude excess is at most

$$
\frac{J_m}{D(l)}\frac{\xi^2}{(1-\xi^2/2)^2}
+\frac q4\beta_1(l)\xi^2.
$$

Here $|\sin\chi|\le|\chi|$, $\cos\chi\ge1-\chi^2/2$, and $0<\beta_1-\beta_2<\beta_1(l)$. The two initial kinetic terms total at most $[(1+1/l)10^{-12}+D(h)10^{-16}]/4$. Adding these rational upper bounds gives less than $3\times10^{-12}<B$. This proves admission of (14), including both preparations (2). The azimuthal speed is reconstructed from the selected $j$; it is not an additional freely chosen velocity in this fixed-invariant box. Momentum changes and a neighbourhood uniform through zero momentum are outside this quantitative statement.

## 5. Sharper conclusion for the original preparation

For the original $J=J_m$ preparation, $E=F(100)$ and $F'(100)=-A$. Keeping the completed square in (8) gives

$$
\frac a4\dot r^2+\frac D4\dot\chi^2+
\frac{J_m}{D(h)}\chi^2+
\frac m2\left(r-100-\frac1{720}\right)^2
\le\varepsilon.
\tag{15}
$$

Thus, for all time,

$$
100\le r\le100+\frac1{360},\qquad
|\chi|<\frac1{75000},\qquad
|\dot r|<\frac1{500000},\qquad
|\dot\chi|<\frac1{50000000}.
\tag{16}
$$

The exact preparation has $\chi=\dot\chi=0$. The reflection symmetry $\chi\mapsto-\chi$ and uniqueness of the regular reduced equation preserve this invariant plane. Its radial motion is periodic between $100$ and a unique second turning point: $F$ is strictly convex, its slope at $100$ is negative, and its outer turning slope is positive. The one-dimensional energy equation is $\dot r^2=4[F(100)-F(r)]/a(r)$; its travel-time integral is finite at both simple turning endpoints. The sign changes of the exact rational evaluations further locate

$$
100.00125<r_c<100.00127,\qquad
100.00250<r_{\mathrm{outer}}<100.00254.
\tag{17}
$$

These are proven brackets, not inferred first-order shifts. Radial periodicity does not assert a closed relative spatial orbit: the azimuth may advance by a different angle each radial period. The centre remains a drifting cyclic coordinate. The narrow region was chosen for simple explicit rational bounds and is not sharp: on this invariant plane the potential tends to $q/4$ at infinity, about $0.00499$ above the original starting energy, whereas $B=10^{-11}$ only sets the local admission margin.

## 6. Evidence, review and falsifiers

The arithmetic certificate imports no subject implementation and integrates nothing. It uses reduced BigInt fractions and exact cross multiplication. Before any target it checks rational arithmetic against known answers and, at zero momentum for $r=2,20,100$, checks zero circle residual and the independent closed-form curvature $8/[r(4r+1)(2r+1)]$. All controls printed PASS before target evaluation; all target inequalities passed with process exit 0 on October 10, 2026. Reproduction command:

```bash
node reference/priorities/master-equation-closure/binary-research/evidence/darwin-aligned-confinement-certificate.mjs
```

The independent mathematical question is whether the functional really yields (1), and whether the inequalities and continuation reasoning imply the stated conclusion. Agreement with the certificate alone checks arithmetic consequences of this proof. Claude separately derived the energy reduction and original invariant-plane confinement and turning points before reading the proposed constants. For the finite box theorem, it independently rechecked the displayed rational inequalities and checked the first-exit barrier and global continuation argument by reasoning; it accepted the proof at that scope. Its [governing assessment](darwin-overnight-addendum-2026-10-10.md#8-update-2026-10-10t1916z-the-finite-preparation-is-now-admitted-by-proof) records that review. Its own [rational recheck](../evidence/darwin-aligned-confinement-recheck.mjs), SHA-256 `5ca01493e5995561d2ca6a8bc7edd7f285bc4676d61e671001d47111a086aa49`, imports no subject code: nine controls passed before twenty-two targets, all PASS with exit 0. Its derivative-difference controls use float comparisons of exact rational quotients; its target assertions are exact rational. The two scripts share the independently derived potential formula, so their agreement checks implementation of the ensuing inequalities; the mathematical derivations and reasoning provide the separate proof review. Claude's preliminary float turning-point and minimum values were within (17), and are supporting diagnostics rather than the exact bracket evidence.

The theory claims above are derived for the stated comparison law and invariant domains. Operator-checkable falsifiers are a different exact energy reduction from the selected functional, failure of any displayed rational inequality, or a correctly certified exact-law trajectory admitted by (5) that reaches the boundary, leaves the member-speed domain or contradicts (16). A rounded trajectory without a validated error bound cannot falsify an exact confinement theorem merely by leaving its narrowest bound. No delayed-law persistence, physical accounts, general drift, uniform zero-momentum statement or measured aligned run follows.

Source coverage is the frozen investigation's Sections 7, 13.1 and 13.5, the governing addendum, and the separate [Codex review](darwin-codex-review-2026-10-10.md). Before development, Node SHA-256 measured the frozen investigation at `640ef664e67ef0ff1538efc22d91500b6ee804ac8afb62ee211ca5ce39ee4ce1` and the governing addendum at `18bfc22cb5f07eee357690e7ba040bb4fb707cde680e78f69fe394eabefb000f`. The investigation remains unchanged. Claude subsequently added the dated review update to its own addendum, retaining the earlier derivation and explicitly superseding its former unchecked-admission statement. The updated addendum has SHA-256 `78e3bc7971de600a97acd0ad3733c30f2dbda809f7265fb76d47394f551381c6`. The original finite run and its prescribed controls remain unlaunched; this work resolves their mathematical preparation/admission prerequisite.

The operator selected the bounded follow-up on October 10, 2026. The [shared conversation](../../../../op/agent-chats/2026-10-10-lattice-darwin-followup/chat.md) records the Codex–Claude allocation and subsequent review. Source, certificate and review hashes belong in its final receipt rather than inside a self-referential hash.
