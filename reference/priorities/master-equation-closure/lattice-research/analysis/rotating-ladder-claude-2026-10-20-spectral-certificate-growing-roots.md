# Rotating ladder: certified growing characteristic roots about certified balances

## Result

Three growing characteristic roots of the delayed first variation of the untwisted rotating alternating ladder are certified. Each is certified uniformly over an admitted balance box, by a one-dimensional complex Krawczyk test on $\det\Delta(\lambda;q,p)$. Each is a simple zero, unique in its box, with real part bounded away from zero. These are formal modes $\mathbf c\,e^{\lambda T}e^{iqk}$ of the linear equation; nothing is claimed about nonlinear solutions.

| Case | Box (relayed by the PI) | Sector | $\lambda/\omega$ (certified enclosure) | $\operatorname{Re}\lambda$ in units $c_f^3/K$ |
| --- | --- | --- | --- | --- |
| (a) $R=0.4$, speed $0.872$ | $\delta\in[2.214455363,2.214456923]$, $\varepsilon\in[0.8722131646,0.8722132227]$ | $q=0$, $p=+1$ (in-step) | $[0.546507,0.546562]+i\,[1.051977,1.052034]$ | $[1.19167,1.19180]$ |
| (b) $R=1000$, speed $0.0138$ | B0: $\delta\in[3.34503529238,3.34503529306]$, $\varepsilon\in[0.0138408142416,0.0138408143198]$ | $q=0$, $p=+1$ (in-step) | $[0.06888499,0.06888537]+i\,[0.6064445,0.6064450]$ | $[9.53424,9.53430]\times10^{-7}$ |
| (c) $R=0.4$, speed $0.872$ | as (a) | $q=0$, $p=-1$ (alternating rung) | $[0.510147,0.510206]+i\,[0.943650,0.943712]$ | $[1.11239,1.11252]$ |

Every enclosure is outward-rounded and holds for every $(\delta,\varepsilon)$ in its box; the conjugates are roots as well. In the unit ladder (times in units of $R$) the real parts are $\operatorname{Re}\lambda R\in[0.476671,0.476719]$, $[9.53424,9.53430]\times10^{-4}$ and $[0.444957,0.445008]$.

Case (b) is the oscillation that is neutral in the zero-delay comparison: its zero-delay limit is the pair $\pm0.591\,i\,\omega$ of the adjudication. The certificate gives it a growth rate of at least $0.0688849\,\omega$ at $R=1000$, so the growth comes from the delay. The values agree with the adjudication's float roots: $(0.54653445+1.05200555i)\,\omega$; the in-step pair $0.0689+0.6064i$; and the alternating-rung growth rate $0.5102$. Its frequency, not printed there, is found here to be $0.94368\,\omega$.

**Claim grade.** Derived by certified interval computation (mpmath 1.3.0 `iv`, a declared primitive dependency), under the assumptions of the stage-1 note ([spectral certificate](rotating-ladder-claude-2026-10-20-spectral-certificate.md)): the boxes contain the balances, which is the untwisted-certificate worker's claim, with review pending; the adjudication's first-variation matrices; and the existence proof's Lemmas 1 and 2. The agreement with the adjudication's numbers is corroboration between instruments, not independent evidence for the formula; control C7 is the independent check of the matrix.

## Method

The evaluator is `ladder_spectral_iv.py` from the stage-1 note, used unchanged; its review copy is frozen. The new driver is `growing_roots.py`. It works in the unit ladder: lengths and times in $R$, $c_f=K=1$, $\Lambda=\lambda/\omega$, $\mu=\lambda R=\Lambda\varepsilon$, and $R$ explicit (here $0.4$ or $1000$). The steps are as follows.

1. Locate the root in float by Newton iteration on the midpoints of the interval determinant, starting from the adjudication's value; for case (c), from a grid of seeds.
2. Apply the Krawczyk operator $K(B)=m-Yf(m)+(1-Yf'(B))(B-m)$ to a square $B$ in the $\Lambda$-plane, with $f=\det\Delta(\cdot;q,p)$, $Y\approx1/f'(B)$, and $f(m)$, $f'(B)$ enclosed over the whole parameter box. Half-widths $10^{-6},10^{-5},\dots$ are tried in order.
3. If $K(B)\subset\operatorname{int}B$, then for every parameter value in the box $f$ has exactly one zero in $B$, it is simple, and it lies in $K(B)$. The certificate reports $K(B)$.

Every attempt, failed or successful, is recorded in the receipts.

**Tail constants at speed 0.872 (rechecked).** Lemma T of the stage-1 note holds for every $\varepsilon<1$. With $D_m=1-\varepsilon^2=0.23924$ its constants are $C_u=198.18$ and $C_w=17.47$, against $4.2$ and $1.0$ at $R=1000$. The exponential factor dominates nonetheless. With $\operatorname{Re}\mu\ge0.445$, $\delta\ge2.2144$ and $N=80$ rungs the delayed tail is below $1.3\times10^{-37}$ and its derivative's below $2.3\times10^{-35}$. The instantaneous sum, carried to $N_s=20000$, has tail $2C_u/(\delta^3N_s^2)=9.1\times10^{-8}$. That is the largest tail at $R=0.4$, yet it is below the width contributed by the parameter box. For case (b), $N=4000$ (forced by $\operatorname{Re}\mu\approx9.5\times10^{-4}$, about $e^{-0.0032}$ per rung) gives delayed tails $4.6\times10^{-13}$ (value) and $6.2\times10^{-9}$ (derivative), and $N_s=50000$ gives $8.6\times10^{-11}$.

## Controls (run on the new driver, at the new parameters, before any target)

- **Causal roots at $\varepsilon=0.872$ (C1).** For $(\nu,k)\in\{\pm1\}\times\{0,1,2,7,60\}$ on the R = 0.4 box, $\Phi$ changes strict sign across each enclosure widened by $10^{-8}\tau$. This is an inclusion test separate from the Newton step. The enclosure widths, $4\times10^{-8}$ to $9\times10^{-5}$, are set by the width of the $\delta$ box.
- **Krawczyk known case.** For $z=20e^{-z}$ the routine contracts on offset $10^{-3}$ boxes around the Lambert values $W_0(20)$ and $W_{\pm1}(20)$ and contains them.
- **Direct evaluation at R = 0.4 (C7).** At the box midpoint, every member of rungs $\lvert k\rvert\le600$ was moved along its exact path plus $\eta$ times a complex mode, every causal root was re-solved, and the receiver's acceleration was differenced centrally. This uses the law only. Four cases were run: $(\Lambda,q/\pi,p)=(0.5465+1.052i,0,+1)$, $(0.51+0.8i,0,-1)$, $(0.9-0.3i,0.6,+1)$ and $(0.2+2i,1,-1)$. The difference from the evaluator falls by about 100 per tenfold reduction of $\eta$, to between $8\times10^{-11}$ and $6\times10^{-10}$ at $\eta=10^{-5}$, against responses of order $0.2$ to $0.8$.
- **Symmetry roots on the R = 0.4 box (C3).** With $N=N_s=20000$, $\Delta(0;0,+1)$ annihilates uniform axial translation and rigid rotation, and $\Delta(-i\omega;\pi,-1)$ annihilates $(1,-i,0)$. All three enclosures contain zero, with widths $2.1\times10^{-3}$, $2.1\times10^{-3}$ and $8.2\times10^{-3}$ in units of $R\varepsilon^2$. The widths are set by the $\operatorname{Re}\lambda=0$ tail, which is proportional to $C_w\varepsilon/N$. The radial vector at $\Lambda=0$ and the wrong-sector translation leave $2.59$ and $1.10$. The rotation identity holds only because the summed acceleration is exactly centripetal, so it is also a check, to that width, that the box holds a balance.

At $R=1000$ the stage-1 controls apply unchanged: the same evaluator, B0 lying inside the float box tested there, and C7 at the $R=1000$ parameters.

## Float census at R = 0.4, q = 0 (measured, not certified)

Newton from 21 seeds with $0.3\le\operatorname{Re}\Lambda\le0.7$, $0\le\operatorname{Im}\Lambda\le1.8$ found the following roots with $\operatorname{Re}\Lambda>0.02$. This is a sampled search, not a complete count.

- Sector $p=+1$: $0.5465344+1.0520055i$, and a real root $0.0458$.
- Sector $p=-1$: $0.5101764\pm0.9436811i$, and a real root $0.31599$. The real root matches the adjudication's axial opposite-displacement root, $0.316$.

## What is not shown, and falsifiers

Not shown: that these roots are the fastest growing; any root census; other wavenumbers; the correctness of the boxes or of mpmath; any nonlinear statement.

Falsifiers:

- A parameter point in a box, and an independent evaluation of $\det\Delta$, with no zero in the corresponding $K(B)$ (or two zeros in $B$), would refute the certificate. The boxes $B$ and $K(B)$ are in `growing-roots-cert_*.json`.
- A direct perturbed-path evaluation, as in C7, that does not match the matrix to second order in $\eta$ would refute the evaluator at these parameters.
- For case (b), a zero-delay comparison in which the in-step pair at $q=0$, $p=+1$ grows would refute the reading that its growth comes from the delay.

## Files, reproduction and state

Evidence directory: `reference/priorities/master-equation-closure/lattice-research/evidence/rotating-ladder-claude-2026-10-20/spectral-certificate/`. The new files are listed below; the stage-1 and stage-2 files are untouched (sha256 rechecked).

| File | Content |
| --- | --- |
| `growing_roots.py` | The new driver. |
| `growing-roots-controls04.json` | Controls at R = 0.4. |
| `growing-roots-locate04.json` | The float census. |
| `growing-roots-cert_a.json`, `growing-roots-cert_b.json`, `growing-roots-cert_c.json` | The three certificates, with every Krawczyk attempt. |

Reproduction, from that directory, with `../../../../../../../../.venv/bin/python growing_roots.py PART`:

- `controls04` took 130 s.
- `cert_a` took 60 s; precomputation 59 s, Krawczyk 0.3 s per attempt.
- `cert_b` took 203 s; precomputation 171 s, Krawczyk 10 s.
- `locate04` took 132 s.
- `cert_c 0.5101764161099249 0.9436811099104595` took 85 s.

The certificate runs and `locate04` ran in parallel, so their times depend on load. Nothing is left running.

## Independent review disposition

Codex reviewed this note and its receipts as frozen (note SHA-256 `813716a05b4489cb7fc45a49fb661977afb8288e20c093897e84797e3c5ba70d`) in the [shared review record](../../../../op/agent-chats/2026-10-20-rotating-ladder-six-hour/chat.md), entry 2026-10-20T23:19:17Z, and accepted all three certificates as computer-assisted derived results under the declared interval primitive and reviewed balance boxes. It reran them (every non-timing field reproduced), reconstructed the Krawczyk contraction operator and bounded it in a weighted maximum norm (below $0.020521$, $0.000786387$ and $0.024052$ for the three cases), and checked that the axial factor of the full determinant excludes zero on each whole root box, so each certified simple zero lies in the in-plane block. The fast-speed tail use is valid (it needs speed below one, not small speed); exact $R=2/5$ is enclosed from the decimal string. Reporting corrections: JSON endpoint numbers produced by nearest-float conversion are readings, not outward endpoints (the certifying inclusions precede conversion, and the note's printed enclosures are safe); $C_w=17.47$ and the instantaneous tail $9.1\times10^{-8}$ are approximations, with safe upper displays $17.471$ and $9.13\times10^{-8}$. A certificate at one speed locates a root; it does not by itself certify the path joining that root to the zero-delay neutral root, which rests on the numerical study and the small-speed analysis.
