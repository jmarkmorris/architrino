# Logarithmic ring: zero-to-wake and T05–T20 continuous sign census

Date: 2026-10-03. **Authorized variation: inverse-distance logarithmic response, every positive-delay self root retained.** This result is separate from the unchanged Master Equation. Numerical settings are $K_{\log}=c_f=1$, with fixed dimensionless coupling $k=1$; $K_{\log}$ has dimensions of speed squared. Subject instrument: [ring_logarithmic_extended_census_20261003.py](../../../../../scripts/braid-program/ring_logarithmic_extended_census_20261003.py), SHA-256 `e6d7a8f4775fdbf7025398803f96ee44f55726ce3149490540da4f97f36d30fc`. **Grade: computer-assisted derived continuous-domain candidate, frozen for separate independent adjudication.**

## Result and boundaries

The complete logarithmic tangential coefficient is positive on $0<\beta\le1$, and has sign $(-1)^{\ell-1}$ throughout every ordinary open cell T$\ell$, $5\le\ell\le20$. The coefficient cannot vanish there, so no regular alternating six-member logarithmic circle is exact at any positive radius in these domains. Radius cancels from the tangential balance; multiplication by any fixed positive $k$ cannot create a zero. That last inference uses the [derived logarithmic equation and radius cancellation](ring-logarithmic-variation-2026-10-03.md), as checked by its [separate adjudication](ring-logarithmic-independent-adjudication-2026-10-03.md).

Combined with the frozen [T01–T04 continuous-cell subject](ring-logarithmic-finite-cell-census-2026-10-03.md), this covers all positive speeds below the twentieth upper birth, apart from the excluded positive-speed fold endpoints. The twentieth birth is defined exactly by

$$
\sqrt{b_{20}^2-1}-\arccos(1/b_{20})=20\pi/6,
\qquad b_{20}=12.001084781872981\ldots.
$$

The displayed number is a diagnostic; the receipt's outward binary bracket defines the certified boundary. The combined statement requires acceptance of both independent adjudications. At $\beta=0$ the static tangential coefficient is zero but the inherited logarithmic radial coefficient is $-1/2$, so that static circle also fails balance for positive coupling. No first exact logarithmic reference has been found, and no stability spectrum is calculated. The signs through twenty cells do not establish a parity theorem for infinitely many cells, or exclude another member inventory, a deformed circle, a nonplanar history or a singular event rule. The prior fixed-coupling obstruction to an unbounded speed ladder is a separate asymptotic theorem, not an extension of this finite census.

**Falsifier:** a missing root, invalid parametric root enclosure or birth bracket, uncovered speed, failed derivative or fold-strip bound, or an independently certified tangential zero in a declared ordinary domain overturns that domain's exclusion. Fold endpoints have $D=0$ and are not regular balances under this result; no event rule is supplied.

## Complete chart and the origin strip

Put $h=\pi/6$, $F_\beta(x)=\beta\sin x-x$ and $D=1-\beta\cos x$. The complete coefficient is

$$
C_t(\beta)=\frac12\sum_{m,r}\frac{(-1)^m\cot x_{m,r}}{|D_{m,r}|},
\qquad F_\beta(x_{m,r})=mh,\quad 0<x_{m,r}<\pi.
$$

At $0\le\beta\le1$, $F_\beta$ is strictly decreasing on $(0,\pi)$, so exactly the five descending partner levels $m=-5,\ldots,-1$ occur per receiver. There are thirty directed partner hits and no positive-delay self hits, including at equality $\beta=1$. Level zero's coincident endpoint is not a positive-delay root. Equality introduces no singular partner denominator: every retained root has $x>0$ and $D>0$.

Along one descending root, implicit differentiation gives $x'=\sin x/D$ and

$$
D'=-\cos x+\frac{\beta\sin^2x}{D},
\qquad
\frac{d}{d\beta}\left(\frac{(-1)^m\cot x}{2D}\right)
=-\frac{(-1)^m(1+\cos x\,D')}{2\sin x\,D^2}.
$$

At zero speed the five static rows sum to $C_t(0)=0$ exactly. Their exact derivative sum is $(2-\sqrt3)/2>0$. The new interval derivative instrument encloses all five moving roots over $[0,10^{-3}]$ and obtains

$$
0.1313754<C_t'(\beta)<0.1365755.
$$

Consequently $C_t(\beta)>0.1313754\,\beta>0$ throughout $0<\beta\le10^{-3}$. This argument proves positivity arbitrarily close to zero without asserting a uniform positive constant on that punctured interval. Above it, 175 adjoining certified speed boxes cover $[10^{-3},1]$ and give $C_t>0.00000475009$. The derivative bound and the regular boxes overlap at their shared endpoint. The static formula, differentiated implicit equation and completeness theorem are derived; the outward interval admissions are computer-assisted candidates pending independent reconstruction.

## Higher cells, complete roots and singular left strips

Write $b_0=1$ and $\sqrt{b_q^2-1}-\arccos(1/b_q)=qh$. T$\ell$ is the ordinary open interval $b_{\ell-1}<\beta<b_\ell$, with $q=\ell-1$. Its complete roots are the six descending levels $m=-5,\ldots,0$ and both concavity branches of every $1\le m\le q$. Thus each receiver has $6+2q$ hits and the full directed census has $6(6+2q)$ hits. Across all receivers the positive-delay self census is $6(1+2\lfloor q/6\rfloor)$. These include every positive-delay self root; no cap or response multiplier is added.

For each ordinary speed box, the frozen endpoint-root primitive certifies opposite endpoint residual signs and the correct concavity branch, then uses $x'=\sin x/D$ to enclose every intermediate root by its endpoint hull. The signed $D$ intervals stay strictly on their branch. The complete outward sum must have the requested strict sign before a box is accepted. All accepted speed boxes are sorted and share exactly adjoining endpoints. The regular cover ends at the outward bracket of the next birth by continuing only the outgoing cell's ordinary sheets into that tiny bracket. At every physical speed below the exact next birth they are the complete census; this continuation is only a one-sided boundary enclosure, not a full-kernel evaluation beyond a new root birth.

Every left-fold strip admitted the same width $10^{-5}$ and $\rho=0.01$; none required the declared smaller proposal boxes. On a strip put $B=\sqrt{\beta^2-1}$ and $x_*=\arccos(1/\beta)$. The exact moving-center identity

$$
M(\beta)-F_\beta(x_*+y)=B(1-\cos y)+y-\sin y
$$

places both newborn roots in $x_*\pm\rho$ when the maximum birth-height gap is less than $B(1-\cos\rho)-(\rho-\sin\rho)$. The instrument certifies that inequality outward, bounds all older ordinary rows, and verifies that the complete new-root tube lies strictly below $\pi/2$, with positive cotangent lower bound $c$ and absolute factor upper bound $d$. For newborn polarity product $\sigma=(-1)^q$, the two new rows obey $\sigma C_t^{\rm new}\ge c/d$. A positive outward lower bound for $c/d-|C_t^{\rm old}|$ gives the full strip's sign arbitrarily close to the excluded fold. The stored `newbornMagnitudeLower` is a lower proxy, not an upper enclosure of the divergent newborn response. This is the same analytic argument stated in the frozen four-cell subject, evaluated on new complete high-cell certificates.

The following table gives conservative lower diagnostics, rounded downward from authoritative outward lower endpoints. Each final receipt contains the full root enclosures, adjoining cover and analytic strip, rather than only this summary.

| Cell | Sign | Regular boxes | Complete directed hits | Positive-delay self hits | Whole-cell signed coefficient lower bound | Left-strip dominance lower bound |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| T05 | $+$ | 14 | 84 | 6 | $0.0036191$ | $8.3007$ |
| T06 | $-$ | 14 | 96 | 6 | $0.00014868$ | $6.0654$ |
| T07 | $+$ | 15 | 108 | 18 | $0.0033787$ | $4.6352$ |
| T08 | $-$ | 16 | 120 | 18 | $0.0093088$ | $3.6629$ |
| T09 | $+$ | 16 | 132 | 18 | $0.0035488$ | $2.9672$ |
| T10 | $-$ | 16 | 144 | 18 | $0.00011280$ | $2.4531$ |
| T11 | $+$ | 20 | 156 | 18 | $0.00053677$ | $2.0606$ |
| T12 | $-$ | 22 | 168 | 18 | $0.00083178$ | $1.7550$ |
| T13 | $+$ | 24 | 180 | 30 | $0.0018118$ | $1.5115$ |
| T14 | $-$ | 25 | 192 | 30 | $0.0019653$ | $1.3149$ |
| T15 | $+$ | 26 | 204 | 30 | $0.0023571$ | $1.1534$ |
| T16 | $-$ | 26 | 216 | 30 | $0.00057635$ | $1.0195$ |
| T17 | $+$ | 27 | 228 | 30 | $0.0016750$ | $0.90697$ |
| T18 | $-$ | 27 | 240 | 30 | $0.00018751$ | $0.81173$ |
| T19 | $+$ | 28 | 252 | 42 | $0.0019841$ | $0.73018$ |
| T20 | $-$ | 28 | 264 | 42 | $0.00063612$ | $0.66006$ |

There are 344 regular boxes across T05–T20. The signed bound means $\sigma C_t$; it does not reverse the reported actual acceleration sign.

## Controls, frozen dependencies and receipts

The new instrument imports the frozen four-cell script as an admitted root and interval-sum primitive, hash `39b2a1803847bd5026f9395d9a7067cf3fcf542860c6ed44b0519bc36e9cf103`. That primitive enforces the original point proposal identity `0eecb7dd023d958a1936bf544ac144a658f640de78157b607dacd305c9aa5e16`. The new instrument calls neither frozen record nor target functions, and writes only its own receipt owner. Reuse of those primitives is declared implementation dependence; these target receipts do not adjudicate their own mathematics independently.

Before every final target, the new current-identity known stage recorded the exact static tangential sum, exact derivative $(2-\sqrt3)/2$, the analytic descending root $\beta=2\pi/3$, $m=1$, $x=\pi/2$, the fold inverse giving $\beta=2$ at independently specified height $\sqrt3-\pi/3$, and the moving-center identity against direct trigonometric evaluation. The target gate rejects changed wrapper, primitive or proposal identities. All final jobs used the shared venv, 110-digit point proposals and 85-digit outward interval arithmetic. Decimal diagnostics are not used as certificate endpoints; exact binary tuples in the original receipt bytes are authoritative.

Final receipts are under `.local-data/ring-exploration/logarithmic-extended-census/`. Representative identities and the aggregate diagnostic manifest are:

| Receipt | SHA-256 |
| --- | --- |
| `known.json` | `96d093cb8b1ed9a729755bcadabb2385bd81aafb2e20bb81a3fb5cf00d8564ec` |
| `T00.json` | `84ebb5e9867e5e202f3725bdf1a82cea6c905c252c0d852fda40b5766b1c8158` |
| `T05.json` | `71a6163db66685d1bf87515f72ab0f7a4a4b46f854cb63d8811429139f64f832` |
| `T10.json` | `8fd268496d997b2184e68bf5e276e2a01a4365e95b642a0d664511bb01049693` |
| `T15.json` | `18c037476e9a651139f495a9f9646b656b73018efc3f8e165a6a1a396489cbe9` |
| `T20.json` | `6784296221b3007260a0eb6d3e0d3fc7d3c472d38a24c41b84a76349cea41595` |
| `summary.json` | `648e104f6196e134f952da3aefd38254ca0a10bc0369c58591fdb0875f4d3462` |

The summary names and hashes all seventeen target receipts; it contains decimal diagnostics only, and is not an exact-endpoint verifier. Its SHA-256 and JSON extraction controls ran before target extraction. Every final scientific target completed with exit zero and `passed:true`. The per-process monotonic timers measured 60.30 seconds for T00 and 15.11–87.15 seconds for the higher cells while jobs ran concurrently in bounded waves. Maximum subdivision depth was fifteen for T00 and five for the higher cells. The scientific cover budget was 20000 attempts/depth forty; exhaustion would have emitted an explicit incomplete receipt. Progress receipts were observable during the longer jobs. These measured invocation times are not an extrapolated cost model.

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_logarithmic_extended_census_20261003.py known
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_logarithmic_extended_census_20261003.py low
# Run each cell separately, 5 through 20, keeping every job observed.
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_logarithmic_extended_census_20261003.py target --cell 5
```

Recommended next action: independently reconstruct the low-speed derivative and all new high-cell fold strips and regular covers, then integrate only the accepted finite domain. Beyond $b_{20}$, a continuous sign theorem needs a new argument or new complete interval covers. A stability calculation requires an exact admitted logarithmic configuration. This work leaves the frozen four-cell subject and all shared owner documents, indexes, queues, ranks, scores, equations and scenarios unchanged.
