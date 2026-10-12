# BHL-001 Independent Check of the Matched-Pair Enclosure Radius — 2026-10-11

This receipt records the separately authored check of the matched-pair enclosure radius selected under BHL-001. The theorem is owned by Codex in [analysis/matched-pair-enclosure-theorem.md](../analysis/matched-pair-enclosure-theorem.md); this instrument was written by Claude without reading that proof's working or any earlier scratch evaluator, from the frozen kernel formula and the jointly reviewed radius alone. The exchange is recorded in the [execution conversation](../../../op/agent-chats/2026-10-11-bhl-001-execution/chat.md).

## Instrument

[check-matched-pair-enclosure.mjs](check-matched-pair-enclosure.mjs) is a Node script using exact rational arithmetic over BigInt numerators and denominators. Every kernel value, residual, radius and comparison is exact; norms are compared through their squares so no square root is taken, and the instances are chosen so that every emission-to-reception distance is a rational number, by placing sources on the receiver's axis or by using the Pythagorean triple $(101,5100,5101)$. The kernel per hit is $K(\mathbf x,\mathbf v)=\mathbf n/(r^2D)$ with $\mathbf n=(\mathbf X_r-\mathbf x)/r$ and $D=1-\mathbf n\cdot\mathbf v$, at $c_f=1$. The radius checked is the jointly reviewed form with $|\kappa q_r|\epsilon=1$,

$$
B=\frac{(2\nu_s+v^+)\,\ell^+}{(r^-)^3\nu_s^3}+\frac{w^++a^+\ell^+/\nu_s}{(r^-)^2\nu_s^2}.
$$

Run with `node reference/priorities/app-barnes-hut/evidence/check-matched-pair-enclosure.mjs`; the retained output is [bhl-001-independent-check-output-2026-10-11.txt](bhl-001-independent-check-output-2026-10-11.txt). The frozen instrument has SHA-256 `5891f62ef7f560a4264b1d0457b54a88096185d4fd640bdeb85809156218811f`. The script stops with exit status 2 before any target instance if the known case fails, and exits nonzero on any failed check. Its membership helper follows the theorem's strict-interior rule: strict endpoint signs certify presence, strictly same-sided signs certify absence, and an exact endpoint zero is ambiguous and rejected.

## Known case recorded first

Before any target instance, the instrument evaluated a static source at distance $2$ on the receiver's axis with zero velocity and returned exactly $(0,0,1/4)$, the analytic value. It also confirmed the sign of the transmitter-factor position derivative at one point: moving the source along its own velocity direction raises $D$, consistent with $\nabla_{\mathbf x}D=+P\mathbf v/r$. This second check is a one-point sign confirmation, not a derivative certificate.

## Results

| Control | What was checked | Result |
| --- | --- | --- |
| Static pair | Receiver at origin, members at $z=10\pm1/200$, slab $[-20,0]$, zero velocity | Both roots present by the monotone sign rule; exact pair sum equals the closed form $2R\ell/(R^2-\ell^2/4)^2$ in $z$ and vanishes in $x,y$; $\lvert\text{pair}\rvert^2\le B^2$ with $\lvert\text{pair}\rvert\approx2.0000\times10^{-5}$ and $B\approx2.0030\times10^{-5}$; pair radius is about $10^{-3}$ of the unpaired absolute sum; two-slice admission at member slice $10^{-6}$ fails for this instance, whose distance floor is $r^-=R-\ell/2=1999/200$ at $R=10$, and holds in a separate formula evaluation at $r^-=28$ |
| Mixed membership | Same pair, slab $[-10,0]$ | Farther member has $g(-10)=1/200>0$ and is certified absent; nearer member present; the test rejects the pair; the retained single contribution exceeds the pair radius, confirming the one-root-missing counterexample |
| Both absent | Same pair, slab $[-5,-1]$ | Both endpoint residuals strictly positive for both members, so both are certified absent and the pair emits exactly zero |
| Endpoint boundary | Same pair, slab $[-(R+\ell/2),0]$ | The farther member's lower endpoint residual is exactly zero, so it is classified ambiguous, neither present nor absent, and the pair is rejected |
| Nonzero acceleration | Receiver at origin, $T_r=0$, members on the $z$ axis with $z_\pm(S)=R_\pm+cS^2$, $c=2/125$, $R_+=10$, $R_-=369/40$, slab $[-15,-10]$ | Exact rational roots $S_+=-25/2$ and $S_-=-45/4$, both strictly interior by the sign rule; Bernstein control vectors computed independently give $r^-=433/40$, $v^+=12/25$, $a^+=4/125$ equal to the exact acceleration $2c$, $\ell^+=31/40$, $w^+=0$; sampled positions, speeds, separation and acceleration at ten rational emission times respect those bounds; $\lvert K_+-K_-\rvert=17/10125\le B\approx0.00811$ |
| Affine moving pair | $\mathbf X_\pm(S)=(\pm a,0,\pm uS)$, $a=101/5100$, $R=1$, $L=5101/5100$, $u=1/10$, $T_r=L$ | $a^2+R^2=L^2$ exactly; both residuals vanish at $S=0$; exact difference equals the reviewed closed form $(1-u^2R^2/L^2)^{-1}(-\ell/L^3,0,2uR^2/L^4)$; with conservative rational hypotheses $r^-=999/1000$, $v^+=1/10$, $\nu_s=9/10$, $\ell^+=1061/25500$, $w^+=1/5$, $a^+=0$ over slab $[-1/100,1/100]$, $\lvert K_+-K_-\rvert^2\le B^2$ with $B\approx0.356$; the position-only radius fails to enclose |
| Review table | Coefficients $(A,C)$ and admission widths for $(v^+,w^+)=(1/200,1/100)$ and $(1/4,1/2)$ at $\ell^+=1/100$ | Widths at $d=102$ and $d=943$ are below $2\times10^{-6}$ and at $d=101$ and $d=942$ above it; $1414^2<2\times10^6\le1415^2$ |

All 30 checks passed; exit status 0.

## What this establishes and what it does not

**Claim grade: measured** by the instrument above, over exact rational instances. The radius encloses the exact two-root pair contribution in a static instance, in a moving affine instance with velocity dipole, and in an axis-aligned quadratic instance with nonzero acceleration whose inputs were derived from Bernstein control vectors; the membership rule accepts strictly interior roots, certifies both-absent, rejects the one-root-missing instance and rejects an exact endpoint root; and the reviewed table arithmetic is exact. The affine instance's root membership was established from its exact roots at $S=0$, inside the slab, rather than from the endpoint sign rule, because the endpoint distances are not rational squares; the hypotheses $r^-$ and $\ell^+$ for that instance are conservative rational bounds taken from the $z$ coordinate and the triangle inequality. The instrument does not produce outward floating-point intervals, does not treat general cubic histories beyond one axis-aligned quadratic, covers off-axis geometry only through the single affine instance rather than arbitrary geometry, verifies the Bernstein input inequalities only at sampled emission times rather than over the whole slab, and does not check the theorem's proof text. Agreement between this instrument and the closed forms in the review is agreement between two separately authored evaluations of the same formulas; it is not evidence about the Master Equation or about any evolved assembly. Falsifier: any exact instance satisfying the theorem's hypotheses whose two-root pair contribution lies outside $[-B,B]^3$.
