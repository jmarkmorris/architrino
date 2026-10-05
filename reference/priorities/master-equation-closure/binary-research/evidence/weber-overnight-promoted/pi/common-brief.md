# Common brief for all weber-overnight workers (PI-authored, read-only for workers)

Run: Weber-inspired investigation launched by the operator. The first ten-hour run (02:31Z–12:31Z) was interrupted after its first phase; the continuation run started 2026-10-05T12:50Z with an eight-hour clock: final-hour freeze 19:50Z, deadline 20:50Z, or earlier on a checked NO GO. Check `date -u` as you work. The continuation is driven in rounds of about 100 minutes; return your report by the end of your round even if work remains, stating exactly where to resume.

Internet: use only `mcp__workspace__web_fetch`; never use browser tools (they stop the whole run on approval prompts). If a fetch fails, record it and continue.

Model: every agent in this run is Fable 5.1 at high reasoning effort.

Repository: `/Users/markmorris/vibe/architrino` for Read/Write/Edit file tools; the same checkout is `/sessions/upbeat-blissful-allen/mnt/architrino` inside the bash sandbox (`mcp__workspace__bash`). Use absolute paths.

## Mandatory reading before work

1. `AGENTS.md` (full).
2. `reference/office-of-research/specialists/specialist.md` and your assigned role file.
3. `reference/op/operator-explanation-standard.md` and the parts of `content/markdown/aaa/archie/academic-style-guide.md` needed for writing a self-contained academic treatment (definitions at first use, plain prose, claim grades).
4. `reference/priorities/master-equation-closure/brainstorming.md`, section "Proposed ten-hour Maxwell and Weber investigations" (lines ~465–527): the shared contract.
5. `reference/priorities/master-equation-closure/equation-variants/manuscript.md`, Section 1 (notation) and Section 9 (the law).

## The selected law (frozen for this run)

For members $i\ne j$ with present separation $r=\|\mathbf X_i(T)-\mathbf X_j(T)\|>0$, $\mathbf e=(\mathbf X_i-\mathbf X_j)/r$, $\sigma_{ij}=\operatorname{sign}(q_iq_j)$, $K_{ij}=\kappa|q_iq_j|>0$:

$$\mathbf A_{i\leftarrow j}=\frac{\sigma_{ij}K_{ij}}{r^2}\Big[1+\lambda_{\mathrm W}\frac{\dot r^2}{c_f^2}+\mu_{\mathrm W}\frac{r\ddot r}{c_f^2}\Big]\mathbf e,\qquad \mathbf A_{j\leftarrow i}=-\mathbf A_{i\leftarrow j},\qquad \mathbf X_i''=\sum_{j\ne i}\mathbf A_{i\leftarrow j}.$$

Dots are absolute-time derivatives of the present separation. Frozen values: $\lambda_{\mathrm W}=-1/2$, $\mu_{\mathrm W}=1$, $c_f=1$, equal fixed positive coupling $K_{ij}=K$; numerical work uses $K=1$, so lengths are in units of $K/c_f^2$ and the dimensionless separation is $x=rc_f^2/K$. Support is instantaneous (present-time); no causal delay is inserted. No self term (the simultaneous self pair $r=0$ is outside the definition). Opposite polarity ($\sigma=-1$) is the attraction target; same polarity ($\sigma=+1$) is a control; keep their singular coefficients separate. The zero-coefficient case $\lambda_{\mathrm W}=\mu_{\mathrm W}=0$ is the instantaneous inverse-square control; it is NOT the delayed canonical Master Equation. Architrinos have no mass: every member receives the full acceleration (unit integration weights). Speak of acceleration, not force.

Speed domains: unrestricted, inclusive ceiling $\|\mathbf V_i\|\le c_f$, strict ceiling $\|\mathbf V_i\|<c_f$. These are admissibility labels only; no clamp, projection, braking multiplier, softened core or boundary response is selected. A speed comparison is made in the absolute (void) frame; state any assumption about the centre-of-mass velocity.

Forbidden: fitting coefficients, changing $\lambda_{\mathrm W},\mu_{\mathrm W},c_f$ or coupling per target, inserting delays, softening, silently switching branches past a singular acceleration matrix.

## Tools and evidence rules

- Python is forbidden in this run: the shared venv is a macOS build and cannot execute in the Linux sandbox, and system `python3` is not a fallback (AGENTS.md). Use Node.js (v22, ESM `.mjs`, no external packages) for numerics. `bc` is available.
- Every instrument passes a known case before its target use, and that pass is recorded first (AGENTS.md, Claim Grading).
- Grade every claim derived / measured / inferred / guessed, name the instrument and its domain for measured claims, and state a checkable falsifier.
- Separate: exact solution, local (linear) stability, finite numerical survival, global persistence.
- Mathematical invariants of this adapted law are not primitive physical energy or momentum accounts; say so where you state them.
- Never use the words "retard", "retarded" or variants; use causal-delay terminology.
- Do not import standard-physics results as premises; the historical Weber law is a comparison structure only.
- Markdown: no manual hard wraps in prose; `$...$` inline, `$$...$$` display on their own lines; relative links; write $\mathbb{A}\mathbb{A}\mathbb{A}$ in that form.
- No Git writes of any kind (no add/commit/stash/reset/checkout). Do not edit any file outside your assigned write scope. Do not touch Maxwell files (`*maxwell*`). Preserve unrelated work; the tree is dirty with other agents' work and that is normal.
- Bulky runtime output goes under `.local-data/master-equation-closure/weber-overnight/<binary|collinear|ring|review>/`; scratch under `.tmp/weber-overnight/<your-subdir>/`.
