# Distinguishing signed cancellation from residual enclosure refinement

Status: derived postprocessing method, frozen after known controls and before reading any target pieces or subject target values. This supplements the [independent reference protocol](authorized-cases-followup-a-independent-protocol.md). It launches no residual, source-root or physical target. Its only target input will be the frozen independent receipt already being produced.

For a retained piece $[m-\ell,m+\ell]$ of width $h=2\ell$, let $D_m$ enclose the midpoint residual and $D_1$ enclose its derivative on the whole piece. Let $N_0=\sup_{z\in D_m}|z|$ and $N_1=\sup_{z\in D_1}|z|$, computed with outward interval Euclidean norms. Lipschitz integration gives $|d(m+s)|\le N_0+N_1|s|$. For final time $T\ge m+\ell$ and $w=T-m$, therefore

$$
\int|d(t)|\,dt\le hN_0+\ell^2N_1=:M_{1,p},
$$

$$
\int(T-t)|d(t)|\,dt\le w(hN_0+\ell^2N_1)=:M_{2,p}.
\tag{1}
$$

These inequalities follow from $\int|s|=\ell^2$ and $\int(w-s)|s|=w\ell^2$. They use the exact same retained partition, root brackets and derivative enclosures as the signed reference. Summing yields magnitude-only residual allowances $M_1,M_2$. Adding the unchanged nonlinear-difference balls yields valid endpoint bounds for this alternative construction.

Also retain $P_k=\sum_p\sup_{z\in I_{k,p}}|z|$, where $I_{k,p}$ is the already certified signed piece-integral box, and $S_k=\sup_{z\in I_k}|z|$ for the global signed-integral box. Both $P_k$ and $S_k$ give endpoint residual allowances. The difference $P_k-S_k$ compares a triangle-bound construction with vector accumulation while holding all piece integrals fixed. It is a difference of enclosures, not by itself a measured amount of true physical cancellation.

A rigorous lower diagnostic uses $P_k^-:=\sum_p\inf_{z\in I_{k,p}}|z|$, with an outward lower interval norm. For the actual piece integrals $J_{k,p}$,

$$
\sum_p|J_{k,p}|-\left|\sum_pJ_{k,p}\right|\ge P_k^- - S_k.
\tag{2}
$$

A positive right side proves genuine cancellation between the retained vector integrals. A nonpositive right side is inconclusive; it does not prove absence of cancellation. Equation (2) is distinct from comparing a finer unsigned quadrature with the old coarse v9 residual bounds.

The [postprocessing instrument](../evidence/authorized-cases-followup-a-independent-diagnostic.mjs) passed analytical controls before any target-piece read. For $d=2t-1$ on $[0,1]$, the exact magnitude integrals are $1/2,1/4$ and the signed integrals are $0,-1/6$. Constant $d=(3,4)$ gives identical signed and unsigned values $5,5/2$. Positive affine $d=1+2t$ has no sign cancellation, yet (1) gives $5/2$ while its signed first integral is $2$; this explicitly checks that enclosure slack must not be mislabeled cancellation. The two half-piece affine primitives $-1/4,+1/4$ give a certified between-piece cancellation lower bound of $1/2$ up to outward rounding.

The final source SHA-256 is `fb6f6ed784b29be7c836fd028398c9b803ed2fac9b531fb5cb1414b52f82637b`; the matching known receipt is `430eccbe6052cb387c922928487e221789a939ecf7ad351dc0f6af4223a31ebf` at `.local-data/master-equation-closure/binary-research/authorized-cases-followup/a-independent/diagnostic-known-v2.json`. The earlier known-v1 receipt is preserved; it predates addition of the certified lower diagnostic and was never used on target data. Both known runs completed in the foreground without a scientific target.

The diagnostic must bind the unchanged independent producer identity and exactly 128 cells with eight pieces each. It reports exact rational allowances and receipt hashes. It neither changes the frozen producer nor evaluates new source data. Any efficacy claim must distinguish the old v9 bound, same-partition magnitude-only bound, piece-integral triangle bound and global signed bound. No extrapolation to a later actual endpoint is licensed.
