# Correction to the exact entering preparation

**Derived correction, separately frozen.** The [original subject](spherical-three-three-preparation-reception-dynamics.md), SHA-256 `8a6dfe6a64f3627e5e83435fdc9ab1a0c49a4825940a020b9159e24339f7ec80`, remains unchanged. Its entering polynomial, derivative and right third derivative are incorrect by a factor of four. The selected complete history remains $p(s)=s(1+4s)^3/4$ for $-1/4\le s\le0$, stationary earlier, with generated actual positive-time motion. Setting $\zeta=s+1/4$ gives exactly

$$
p=-4\zeta^3+16\zeta^4,\quad p'=-12\zeta^2+64\zeta^3,\quad p''=-24\zeta+192\zeta^2,\quad p'''=-24+384\zeta.
$$

The right third derivative at the stationary seam is $-24$, while the left derivative is zero. The source is $C^2$ there. The old fourfold expressions are rejected as exact history and must not be used in an acceleration kernel or trajectory calculation.

Independent nonzero controls expose the discrepancy: at $s=-1/8$, direct evaluation of the selected history gives $p=-1/256$, $p'=-1/16$; the rejected expressions give $-1/64$ and $-1/4$. At $s=0$, the selected derivative is $1/4$, whereas the rejected expression gives one. The seam-zero test alone is insufficient because both polynomials vanish through second derivative at zero increment.

The original zero-increment inequality also needs the precise endpoint form $0\le\zeta\le3\eta$ for $\eta\ge0$, with strict upper inequality when $\eta>0$. On the admitted trailing chart, playback improves to $0<s_5'<1$, so $0<\zeta<\eta\le1/100$ for positive increment. At the event itself $\zeta=\eta=0$.

The [independent adjudication and reconstruction](spherical-three-three-preparation-reception-review-adjudication.md), SHA-256 `6fc97a9485704a160280f48a3a696daed4206a88c94e89c0478eec119ba5400e`, proves that the conservative actual-motion theorem survives using only the correct selected history. The pre-event reception proof uses stationary trailing data and is unaffected by the polynomial error. On $0\le\zeta\le3/100$, the corrected phase and velocity are nonpositive, so the negative-cosine trailing chart has $D_{t,5}\ge1$. Those are the properties required by the post-event tangent bounds. For $0<\zeta<1/100$, the sharper estimates $|p|<1/250000$ and $|p'|<3/2500$ hold, and imply the old looser bounds $1/62500$ and $3/625$. These are conservative bounds, not alternate exact data.

Accordingly the separately reconstructed $t_0<t_E<11/10$, actual continuation through $t_E+1/100$, thirty ordinary partner roots/no positive-delay self roots, source availability and separation, $C^1$ acceleration/support, and $-19/600<\lambda<7/500$ remain accepted within that adjudication's exact scope. Physical post-event duration is $1/10$ because $T=10t$. No numerical trajectory using the rejected polynomial is accepted. Later support sign remains open pending a separate refinement.

The scenario remains $K=c_f=1,R=10$, alternating equatorial hexagon, initial speed $1/4$, canonical all-root transmitter acceleration and normal support only. No other case or history is substituted. Falsifiers are a failed direct polynomial substitution, loss of the stated sign/chart margins for the corrected source, or failure of the independent reconstruction's strict continuation margins. This correction changes no frozen source or reference and does not replace the independent verdict.

Dispatch `df3bc3b4-66f9-48fa-9735-afefa415d4f8` was admitted untruncated at 2026-10-10 22:29:08 UTC, with verified 3256-byte payload and three source identities; provider transport remained separately unverified. The assignment bundle under `.local-data/agent-dispatch/preparation-reception-dynamics-correction-support-20261010-2229` retains receipts. This is the first saved correction checkpoint. No scientific instrument, numerical evolution, job, lease or extra agent was launched; all reasoning is analytical and replay/resource cost is unprofiled. Local capture is not verified backup recovery. A separate support companion is the next assigned dependency, with exploration cutoff 23:26:02 UTC and hard closeout 23:41:02 UTC unchanged.
