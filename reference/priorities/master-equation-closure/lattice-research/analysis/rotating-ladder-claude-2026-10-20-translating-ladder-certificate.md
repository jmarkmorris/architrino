# A ladder that translates without rotating: closed-form spacing and certified speed

## Result

An infinite untwisted ladder of opposite-polarity pairs that does not rotate, translating rigidly along its axis, satisfies the unchanged Master Equation at the rung spacing and speed below, and, among speeds in the stated strip, only there (this certificate does not classify all speeds):

$$
\frac dR=\delta_*=\frac{2\pi}{\operatorname{arccosh}\bigl(3+\sqrt{10}\bigr)}=2.508313533302\ldots,\qquad \lvert u\rvert=u_*\in[0.8433854,\ 0.8433856],
$$

in units $K=c_f=1$, and for each sign of the velocity $u_*$ is the only such speed in that interval. The spacing is exact; the speed is certified by outward-rounded interval arithmetic. The radius $R$ drops out of the conditions, so the same balance holds at every radius. The configuration was found by the [twisted-geometry worker](rotating-ladder-claude-2026-10-20-twisted-geometry.md) as the end of the returning twisted branch; the closed form and this certificate are the Principal Investigator's.

**Claim grade.** Derived: the reduction to one equation, the closed form for $\delta_*$ and the radial formula below. Derived by computer-assisted proof: existence and uniqueness of $u_*$ in the stated interval, with mpmath 1.3.0 interval arithmetic as a declared primitive dependency. The exact linearity of the axial acceleration in $u$ is the twisted-geometry worker's derivation (its note, Section 6), which the PI checked numerically and which Codex accepted as derived (review record entry 2026-10-20T22:54:29Z); this certificate depends on it. The certificate itself was independently reviewed and accepted (entry 2026-10-20T23:19:17Z; see the review section).

## Configuration and conditions

For every integer $k$ a positive member is at $((-1)^kR,0,kd+uT)$ and a negative member at $(-(-1)^kR,0,kd+uT)$, for all time $T$, with $\lvert u\rvert<1$. Viewed from the side there are two rails along which the polarity alternates, as in the rotating ladder, but nothing rotates. Every member moves with the same uniform velocity $u\,\mathbf e_z$, which is below wake speed, so by the argument of the existence proof's Lemma 1 (a source path with speed below one has exactly one positive causal root, and a receiver's own path has none) each source contributes exactly one row and no member receives a positive-delay self row. The translation by $d$ with a half turn, the half turn with exchange of polarities, and time shifts combined with axial translation carry the positive member of rung 0 at time 0 to every member at every time, so the law holds everywhere when it holds there. No acceleration is required, since the motion is uniform. Take that receiver at $(1,0,0)$ in units of $R$. Its tangential acceleration vanishes by reflection in the plane $y=0$, which contains every member and maps the configuration to itself.

**Axial condition.** The twisted-geometry worker's identity gives $A_z=u\,Z_u(\delta,\pi)$ exactly for non-rotating translation. On the untwisted lattice the rows of rungs $\pm k$ combine into $2\sigma u(b^2-z^2)/(b^2+z^2)^2$, with $b$ the transverse and $z$ the axial separation. Summing with the classical alternating sums $\sum_{k\ne0}(-1)^k/k^2=-\pi^2/6$ and $\sum_k(-1)^k c/(k^2+c^2)=\pi/\sinh(\pi c)$, differentiated in $c$, gives with $y=2\pi/\delta$

$$
Z_u(\delta,\pi)=\frac{\pi^2}{\delta^2}\Bigl[\frac16-\frac{\cosh y}{\sinh^2y}\Bigr].
$$

At the rotating ladder's balanced spacing this is $-0.14227$, the first-order braking coefficient recorded in the [original paper](rotating-alternating-ladder.md); the identity shows it is exact for every non-rotating translation. Because $\cosh y/\sinh^2y$ decreases strictly in $y>0$, $Z_u$ has exactly one zero, where $\sinh^2y=6\cosh y$, that is $\cosh^2y-6\cosh y-1=0$, $\cosh y=3+\sqrt{10}$. So for $u\ne0$ the axial condition holds exactly when $\delta=\delta_*$. Checked at 30 digits: $Z_u(\delta_*)=0$ to working precision, and the closed form agrees with the direct lattice sum at $\delta=3$ ($-0.0999206800529\ldots$).

**Radial condition.** Members on the receiver's own side of the axis ($b=0$) contribute no radial component. Each rung has exactly one member on the far side ($b=2$), with polarity product $\sigma_k=-(-1)^k$. For a uniformly moving source at present axial offset $z_k=k\delta$ the delay is

$$
\tau_k=\frac{-u z_k+s_k}{1-u^2},\qquad s_k=\sqrt{z_k^2+4(1-u^2)},
$$

and the transmitter-side factor satisfies $\tau_kD_k=\tau_k(1-u^2)+uz_k=s_k$, so the radial row is $2\sigma_k/(\tau_k^2s_k)$. Adding rungs $k$ and $-k$ uses $\tau_k\tau_{-k}=(z_k^2+4)/(1-u^2)$ and $\tau_k^2+\tau_{-k}^2=2(s_k^2+u^2z_k^2)/(1-u^2)^2$, and gives

$$
A_r(u)=-\frac{\sqrt{1-u^2}}4-4\sum_{k\ge1}(-1)^k\,\frac{k^2\delta^2(1+u^2)+4(1-u^2)}{\sqrt{k^2\delta^2+4(1-u^2)}\,(k^2\delta^2+4)^2}.
$$

The balance is $A_r(u)=0$. At $u=0$ this is minus the static inward sum, $-0.148$ at $\delta_*$: a ladder at rest at this spacing is pulled toward its axis. Uniform motion reduces the pull, and at $u_*$ it vanishes.

**Tails.** For $k\ge1$ and $\delta>2$, with $a=k^2\delta^2$, the numerator is at most $(a+4)(1+u^2)\le2(a+4)$ and the square root at least $k\delta$, so each term is at most $2/(k\delta)^3$ and the omitted sum beyond $N$ is at most $1/(\delta^3N^2)$, contributing at most $4/(\delta^3N^2)$ to $A_r$. The $u$-derivative of each term is $u[2(a-4)S^2+4\mathcal N]/(S^3(a+4)^2)$ with $S^2=a+4(1-u^2)$ and $\mathcal N$ the numerator, at most $3\lvert u\rvert/(k\delta)^3$ for $a\ge4$, so the derivative tail contributes at most $4\cdot3\lvert u\rvert/(2\delta^3N^2)=6\lvert u\rvert/(\delta^3N^2)$; the instrument uses the larger value $12\lvert u\rvert/(\delta^3N^2)$, a valid over-estimate.

## Certificate

The instrument is `translating_ladder_certificate.py` in `../evidence/rotating-ladder-claude-2026-10-20/translating-ladder-pi-certificate/`, mpmath `iv` at 30 digits, with $\delta_*$ evaluated as an interval from its closed form. Known cases ran first, in the same invocation, and the target is refused unless they pass: at $u=0$, $\delta=3$ the interval value of $A_r$ contains minus the 30-digit direct static sum $-0.1768524463546\ldots$; at $u=0.5$, $\delta=3$ it agrees with the PI's separately written raw three-vector evaluator (`.tmp/rotating-ladder/pi/helix_pi_check.py`, frozen at 21:55Z before any worker result) to $3\times10^{-16}$, the raw evaluator also giving zero tangential acceleration to $10^{-17}$.

| Attempt | $N$ | Bracket in $u$ | $A_r$ at ends | $A_r'$ over bracket | Outcome |
| --- | --- | --- | --- | --- | --- |
| pilot | $4000$ | $[0.84338547,\,0.84338548]$ | both enclose $0$ | $[0.492213,\,0.492214]$ | not certified: the tail bound $1.6\times10^{-8}$ exceeds the signal across the bracket |
| target | $20000$ | $[0.8433854,\,0.8433856]$ | $[-3.81,-3.68]\times10^{-8}$, $[6.03,6.17]\times10^{-8}$ | $[0.4922136,\,0.4922142]$ | certified |

At $\delta_*$ the radial acceleration therefore changes strict sign across the bracket and is strictly increasing on it, so it has exactly one zero $u_*$ there, and $u_*<1$. With the axial and tangential conditions above, the ladder translating at $u_*$ (or $-u_*$, by reflection of the axis) satisfies the law at every member and every time, all sums converging absolutely (radial rows of the paired rungs fall as $k^{-3}$, individual axial rows as $k^{-2}$). The run took 16 s.

Within the strip of speeds in the bracket and any spacing, the solution is unique: for $u\ne0$ the axial condition forces $\delta=\delta_*$, and then the radial condition has one zero.

## Independent corroboration

Codex, reviewing the twisted-geometry worker's results (review record entry 2026-10-20T22:54:29Z), independently derived the same paired radial expression $A_r(\delta,u)$ from the raw rows, accepted the axial identity and the closed form for $\delta_*$ as derived, and found by a 55-digit numerical sum $\lvert u\rvert=0.84338547606729845545\ldots$, inside the certified bracket; its raw three-vector evaluator, frozen before any Claude result, gives a radial residual of $-6.2\times10^{-15}$ at 32768 rungs with tangential and axial residuals below $4\times10^{-17}$. These are numerical references, not a review of this certificate's interval computation.

## Meaning and limits

This is an exact moving balance of a structure that does not rotate. A stationary ladder of opposite pairs at this spacing has inward acceleration on every member (no collapse evolution is computed here); the same ladder moving uniformly at $0.843$ of wake speed, at the one spacing at which the axial braking of its alternating neighbours vanishes, is in exact equilibrium under the delayed law. It is the end point of the family of rotating and translating twisted balances. It is infinite, and nothing is claimed about finite segments. Its stability is under investigation by the geometry worker (formal modes only). It is a reference solution, not a retained assembly or a carrier.

## Falsifiers

- A raw evaluation of the full law at $\delta_*$ and a speed in the bracket whose radial acceleration does not change sign across the bracket, beyond the stated tail.
- An axial acceleration at $\omega=0$ that is not exactly linear in $u$ (the identity), or a zero of $Z_u(\delta,\pi)$ other than $\delta_*$.
- A tangential acceleration that does not vanish at $\omega=0$, $\alpha=\pi$.

## Reproduction

From the evidence directory, with the shared venv: `translating_ladder_certificate.py 20000 0.8433854 0.8433856 certificate-N20000.json` (16 s). SHA-256 at 2026-10-20T22:47:34Z: script `b3daace4d9ff7379f0850f0e257429d1067633591f40854b2766b4983b9a9b00`, receipt `certificate-N20000.json` `608af64208d0b958e92d47c8dd97fde37bcb61a241a98094a1617c4d5e4a1a19`, failed pilot receipt `pilot-N4000.json` `4e936c7d99e5a98f95a421b55997204eab91c112fe9873d02fbe896a6cc95e38`.

## Independent review disposition

Codex reviewed this certificate as frozen (note SHA-256 `1ab2cf8b92202bfa5742862a2399cad2ac0b2110f6b7028bd9fac38fc1c8dfb2`, script `b3daace4d9ff7379f0850f0e257429d1067633591f40854b2766b4983b9a9b00`, receipt `608af64208d0b958e92d47c8dd97fde37bcb61a241a98094a1617c4d5e4a1a19`) in the [shared review record](../../../../op/agent-chats/2026-10-20-rotating-ladder-six-hour/chat.md), entry 2026-10-20T23:19:17Z, and accepted it as a computer-assisted derived result under the declared interval primitive: the term and derivative tail bounds are correct (the derivative coefficient $3$ is conservative; $2$ suffices since the numerator is at most $2a$ for $a\ge4$), the formula and tails are transcribed correctly, an exact-input rerun reproduced every non-timing receipt field, and the full-law conditions (absolute convergence before pairing, admissibility, transport of the receiver condition to every member and time, vanishing tangential rows in the plane $y=0$) hold. Uniqueness is within the rigid untwisted equal-radius ansatz in the stated speed strips, not a global classification. The PI applied the requested scope wording above. The connection of this balance to the returning twisted branch is the measured $R=1000$ (and $R=100$) continuation, not part of this certificate.
