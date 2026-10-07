# Independent review of the finite outer-radius exclusion

## Verdict and scope

Claim grade: derived. The frozen [outer-radius theorem](overnight-c-outer-radius-bound.md), SHA-256 `ec0181f9c0b09bbdc7c7c1afc6cf52a973535059a541e1c39cb0753f552833c3`, is valid. No mathematical defect was found. Under the stated unchanged logarithmic equation, an exact three-neutral-pair common-center circular configuration with $r_1=1<r_2<r_3$, arbitrary phases, and $|\omega|r_3<1$ cannot have $r_3\ge400$.

The independently reconstructed argument retains all five ordinary partner contributions to one inner receiver. A preceding scalar-contraction bound forces one cross-pair source close to that receiver. The norm of its individual logarithmic contribution then exceeds the sum of the maximum possible cancellation from the other four sources and the prescribed circular acceleration. This is a full-vector contradiction on a continuous domain, not numerical sampling or a completed interval cover.

The ratio 400 is conservative, not established as optimal. The result gives no existence verdict within $r_3<400$, no full-class exclusion, and no result for superfield or wake-speed histories, stability, dynamical contact, or noncircular paths. A bounded radius range does not make the remaining ordinary parameter domain compact: collision and source-speed boundaries remain excluded. The reviewer role supplies no scientific acceptance authority; the parent owns integration.

## Equation and root accounting

For the complete histories $X_{a,\sigma}(t)=\sigma r_a e^{i(\omega t+\phi_a)}$ and unit polarities $q_{a,\sigma}=\sigma$, the [logarithmic equation owner](../../equation-variants/logarithmic-potential/manuscript.md#master-equation-before-and-after-a-logarithmic-replacement) gives each ordinary hit at $K_{\log}=c_f=1$ as

$$
A_{ij}=q_iq_j\frac{n_{ij}}{\tau_{ij}|D_{ij}|},\qquad
X_i(t)-X_j(t-\tau_{ij})=\tau_{ij}n_{ij},
\qquad D_{ij}=1-n_{ij}\cdot\dot X_j(t-\tau_{ij}).
$$

Fix any finite allowed configuration and let $u=|\omega|$. For source speed $u r_j<1$, distance minus delay strictly decreases with slope bound $-(1-u r_j)$ in the Lipschitz sense. For different members it is positive at zero, because different radii cannot coincide and same-pair members are antipodal. It is negative beyond $r_i+r_j$. Hence there is exactly one positive root per directed partner channel, and it is ordinary because $D\ge1-u r_j>0$. Self distance minus delay starts at zero and becomes strictly negative. Thus there are 30 directed ordinary partner roots and no positive self root, even when parameters approach the speed boundary from within the allowed domain.

At the positive radius-one receiver the five source labels are its own negative antipode, two members of the middle pair, and two members of the outer pair. Their five roots exhaust its acceleration. Reflection changes the sign of $\omega$ and the phases without changing the scalar estimates, so the bounds in terms of $u$ cover both angular directions, including $u=0$.

## Forced close cross-pair source

The [independently reviewed separated-radius condition](overnight-c-separated-radius-independent-review.md#monotonicity-and-exact-corners) excludes $r_2\ge6$, $r_3\ge30$. Therefore a hypothetical exact configuration with $s=r_3\ge400$ has $r_2<6$. The [independently reviewed finite separation estimate](overnight-c-distant-outer-independent-review.md#outer-rows-and-the-necessary-inequality) then applies with the fixed $M=6$:

$$
d\le\frac{12M^2}{(s-M)(2-H_M(s))},\qquad
H_M(s)=\frac{6M^2+8Ms}{(s-M)^2}+\frac{4M^2}{s^2},
$$

whenever $H_M(s)<2$. Here $d>0$ is the minimum present distance among the four inner members. This input is a proved finite inequality involving all internal and outer contributions, not a conjectured limiting configuration.

For $s>M$,

$$
H_M'(s)=-\frac{8Ms+20M^2}{(s-M)^3}-\frac{8M^2}{s^3}<0.
$$

Once $H_M<2$, both $s-M$ and $2-H_M(s)$ are positive and increasing. Their product increases, so the upper bound for $d$ decreases. At $S=400$, exact independent arithmetic gives

$$
H_6(S)=\frac{48889281}{388090000}<2,
\qquad
d\le\delta:=\frac{425520000}{727290719}<1
\quad(s\ge S).
$$

Write the unit receiver as $x$ with $|x|=1$, and the middle endpoints as $\pm y$. Since the same-pair distances are $2$ and $2r_2>2$, the minimum $d<1$ is cross-pair. The four cross distances consist of two copies each of $|x-y|$ and $|x+y|$. Thus, after choosing which middle source is called nearby, one source is at distance $d$ from the positive receiver $x$. Denote its position by $y_*$, so $|x-y_*|=d$. The opposite source is $-y_*$ and

$$
|x+y_*|=|2x-(x-y_*)|\ge2-d\ge2-\delta>1.
$$

No polarity swap or persistent-label reassignment is needed: this designation only selects a source for a norm bound. The nearby source may have either sign, which cannot change the norm of its contribution.

## Two-sided delay and contribution bounds

For a fixed receiver, a source with speed at most $v<1$, and present separation $h>0$, let $z$ be the causal chord. Its length is the delay $\tau$. The difference between present and emitted source positions has norm at most $v\tau$. The triangle and reverse-triangle inequalities give

$$
h\le(1+v)\tau,\qquad \tau\le h+v\tau,
\qquad
\frac{h}{1+v}\le\tau\le\frac{h}{1-v}.
$$

Also $1-v\le D\le1+v$ and $D>0$. A unit-polarity row has norm $1/(\tau D)$, so

$$
\frac{1-v}{(1+v)h}\le|A_{ij}|
\le\frac{1+v}{(1-v)h}.
$$

These bounds do not assume emission and reception directions coincide. They use the actual source velocity in $D$ and the entire source displacement during the delay.

In the present domain the middle sources have speed $u r_2\le M/S=v=3/200$, and $u\le U=1/S=1/400$. Therefore the nearby row obeys

$$
|A_{\mathrm{near}}|\ge
\frac{1-v}{(1+v)\delta}
=\frac{727290719}{438480000}.
$$

The opposite middle endpoint has present separation at least $2-\delta$, so the upper counterpart gives

$$
|A_{\mathrm{far}}|\le
\frac{1+v}{(1-v)(2-\delta)}
=\frac{147640015957}{202725103286}.
$$

Each is one row, because each source has exactly one ordinary root. The second middle endpoint stays farther than one from this receiver, so two nearby rows cannot appear through the antipodal geometry.

## Remaining three sources and the vector contradiction

For the receiver's own antipode, $\tau_0\le2$ and $u<1/400$ imply $x_0=u\tau_0/2<1/400<\pi/2$. The exact antipodal formula is $D_0=1+u\sin x_0\ge1$, including the static case. The general lower delay bound with present distance two and speed $u$ gives $\tau_0\ge2/(1+u)$. Consequently

$$
|A_{\mathrm{own}}|\le\frac{1+u}{2}\le\frac{401}{800}.
$$

For an outer source at radius $s$ and a unit receiver, the delayed chord length is at least $s-1$. If $\theta$ is its delayed angle, the Euclidean identity

$$
\ell^2-s^2\sin^2\theta=(1-s\cos\theta)^2\ge0
$$

gives $|n\cdot V_j|\le u$, hence $D\ge1-u\ge1-1/s$. The two outer row norms therefore sum to at most $2s/(s-1)^2$. Its derivative is $-2(s+1)/(s-1)^3<0$, so

$$
|A_{\mathrm{outer},+}|+|A_{\mathrm{outer},-}|
\le\frac{2S}{(S-1)^2}=\frac{800}{159201}.
$$

This retains the actual outer contributions even if their full speeds approach one. The improved projection bound depends on the small receiver radius, not a uniform gap between the outer source speed and one.

Circular kinematics at radius one requires a vector of norm $u^2\le U^2=1/160000$. Rearranging the full vector equation to isolate the nearby row and applying the triangle inequality would require

$$
|A_{\mathrm{near}}|\le R:=
\frac{401}{800}
+\frac{147640015957}{202725103286}
+\frac{800}{159201}
+\frac1{160000}.
$$

Independent exact summation and subtraction give

$$
R=\frac{3187534568705719565843}{2581923133458758880000},
$$

$$
\frac{727290719}{438480000}-R
=\frac{95265590168624957827777}{224627312610912022560000}>0.
$$

Thus the required triangle inequality fails, for either polarity of the nearby source and every relative phase. All five partner rows and the prescribed circular acceleration are accounted for. This excludes the entire stated domain, including $s=400$, and does not require a continuity argument at coincidence or at source speed one.

## Controls, receipts, and falsifiers

The [independent rational checker](../evidence/overnight-c-review-outer-radius-exact.py) imports no subject implementation or numerical search. Its [known-first controls](../evidence/overnight-c-review-outer-radius-controls.json) passed before target execution: elementary rational division; a stationary source for which both delay and contribution bounds are exact; a constant radial-velocity causal geometry with $\tau=2$, speed $1/4$, present distance $3/2$, and contribution norm $2/3$; the static antipodal norm $1/2$; and antipodal near/far distances at positions $1$ and $\pm5/4$. These verify geometry and arithmetic, not existence of a six-member circular solution.

The later [target receipt](../evidence/overnight-c-review-outer-radius-target.json) returned every displayed rational constant and the strictly positive final margin. Both shared-venv commands exited zero, in this order:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-outer-radius-exact.py controls > reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-outer-radius-controls.json
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-outer-radius-exact.py target --controls reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-outer-radius-controls.json > reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-outer-radius-target.json
```

Checker SHA-256: `76bf854c2f4598ac56f229cb8edd14cfb809ead7dd6be1a824e0459ed2e36e17`. Target mode requires a successful controls receipt matching that checker hash. Before review, `shasum -a 256` matched the assigned subject identity, and the live Specialist directory was relisted and the assigned role reread.

Scoped validation: standard-library `ast.parse` accepted the new checker under the shared venv, exit 0. Final `shasum -a 256` retained the subject and checker identities. `git diff --no-index --check /dev/null` on this new report emitted no whitespace diagnostics, returning 1 for the difference from an empty source.

The conclusion would be overturned by an omitted ordinary root, a failure of the prior finite-separation inequality, incorrect antipodal pairing, a reversed delay or source-factor bound, an uncounted cancellation contribution, failure of the monotonicity argument, a nonpositive exact margin, or an exact allowed configuration with $r_3\ge400$. The checker can falsify arithmetic claims directly; the full mathematical derivation and ordinary-root assumptions must be revisited for a geometric counterexample.

Only this report and the three `overnight-c-review-outer-radius-*` evidence companions were authored. No frozen subject, previous review, shared owner, production file, or runtime cover was modified. No numerical search, sustained job, or cover replay was performed. No mathematical blocker was found; parent integration and any acceptance disposition remain separate.
