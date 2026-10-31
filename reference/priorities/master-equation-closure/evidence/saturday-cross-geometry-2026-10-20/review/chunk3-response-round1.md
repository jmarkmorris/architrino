# Chunk 3, round 1: author response

Reply read in full: `review/chunk3-reply-round1.md` (disposition ACCEPT AFTER CORRECTIONS).

| Finding | Change |
| --- | --- |
| P-ARR | The opening explanation, Theorem P and Corollary P.1 now speak of *comparison paths* and their crossing times. Theorem P: "$T^\eta$ is the infimum over the reference's arriving members of the crossing times of their comparison paths; ... the comparison path of every reference-arriving member crosses speed one exactly once, within $C\varepsilon$ of $T_*$, with incoming rate at least $\beta_0/4$, and the solution follows every comparison path up to $T^\eta$". The opening says explicitly that "a later crossing is a crossing of a comparison path, not an established arrival of the population". Corollary P.1 is reworded the same way. Section 6 says "unattained infimum of comparison crossing times". |
| P-EXT | The definition of an admitted extension in Step 6 now requires each member's path to be continuously differentiable with locally absolutely continuous velocity and to satisfy the equation almost everywhere on every interval before its first time at speed one, including across $T^\eta$, and to continue afterwards in a class of Theorem A′. Step 6 then argues: all tube roots are emitted before $a$, so member $i$'s acceleration is the fixed field while its speed is below one; with the required regularity across $T^\eta$, ODE uniqueness gives equality with $\mathbf z_i$ up to its first time at speed one, which is therefore $t_i^\eta$. |
| P-MAR | The event-window choice now keeps non-arriving reference comparison speeds at most $1-3m_0/4$ on $[a,b]$ (with $\delta\le m_0/(4\bar A')$), and Step 5 concludes $1-3m_0/4+C_4\varepsilon\le1-m_0/2$ once $C_4\varepsilon\le m_0/4$. |
| P-WIN | The weighted form of Lemma D now first shows that both roots satisfy $s\le t-\rho_j\le t-\gamma-h<t-\gamma$ and applies Lemma D on the truncated windows $W_j\cap(-\infty,t-\gamma]$, which contain both roots and the interval between them; the offset $h$ and $K_\mu$ are retained. |

New identity: `reference/priorities/master-equation-closure/analysis/saturday-cross-geometry-continuation-2026-10-20-persistence.md`, SHA-256 `e51324f3f61b6e3805f451fe593b8d03c888da4ca8a0c5bac6f3dce08086659e`, 25,051 bytes. Checks: KaTeX 359 spans render; 10 links resolve; `git diff --no-index --check` clean (exit 1, no output).
