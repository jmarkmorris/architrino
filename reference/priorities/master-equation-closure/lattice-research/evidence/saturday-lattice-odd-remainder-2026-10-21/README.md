# Evidence for the signed odd remainder of the localized lattice family (2026-10-21)

This folder holds the instruments and review record of the lattice task of the Saturday research agents of 2026-10-21 (owner task `saturday-agent-lattice-2026-10-21`), for the notes [The reflected odd remainder of the localized lattice family: its exact cubic and the signed lattice sums](../../analysis/saturday-lattice-odd-remainder-2026-10-21.md) (chunk 1) and its companion barrier note (chunk 2). The notes' lemmas are hand derivations. The instruments evaluate exact closed forms and lattice sums from declared constants; they integrate nothing and evaluate no nonlinear solution history (KC1 samples prescribed exponential source histories), and their agreement with the derivations is not independent evidence except where a known case names an independent reference.

## Chunk 1: `odd_cubic.py`

[`odd_cubic.py`](odd_cubic.py) takes one argument, the JSON file it writes. It imports, unchanged and by file path, the accepted [`band_barrier.py`](../saturday-lattice-growth-2026-10-20/band_barrier.py) (SHA-256 `1a581dca4db57e1358356a75d0cb7c8704402414fd9e1f9ea5d1cf8f7533bdd6`), and through it the frozen accepted instruments, only for the interval exponential (`mpmath.iv`, 50 digits) and rational rounding helpers. Importing them runs the extension instrument's lattice census; no accepted lattice sum is used in chunk 1.

**What it computes.** At every site of the cube $\max_i\lvert\ell_i\rvert\le5$ it evaluates the cubic $C_\ell(a;J)$ of Lemma O.1 exactly in $\mathbb Q(1/\sqrt N)$, $N=r^2$, for the jets $(t\Lambda^kw)_k$, $\Lambda=2.7952$, $t\in\{1,-1,2\}$, and six input pairs $(a,w)$; separates the parts of degree one, two and three in the jets; adds them over shells (degree two with the sign $\sigma_\ell$); multiplies by $e^{-j\Lambda\sqrt N}$ and evaluates with interval arithmetic; adds an analytic tail bound for the sites outside the cube; and forms the component enclosures and norm bounds of Proposition O.4.

**Known cases.** KC1–KC4 run before the shell sums; KC5 checks the accumulated shell sums before their interval evaluation. A failure writes the partial record and exits 2.

| Stage | What is compared | Kind of reference | Result |
| --- | --- | --- | --- |
| KC1 | exact $C_\ell$ against $[\mathcal O_\ell(s\alpha,s\bar\Phi)]/(2s^3)$ of the true row, causal root solved at 50 digits, $s=10^{-5}$, five offsets, random rational $\alpha$, $\mathbf w$ | independent numerical evaluation that does not use the formula | pass, largest relative difference $5.0\times10^{-10}$ |
| KC2 | lattice census of the cube against $r_3(1),\dots,r_3(12)$ | classical counts | pass |
| KC3 | per-site majorant $M_\ell\ge\lvert C_\ell\rvert$ on 299 random rational configurations (300 draws, one zero offset skipped) | float sample | pass, largest ratio $0.3762$ |
| KC4 | symmetric-form norm $\max(\lvert k_1\rvert,\lvert k_1+6k_2\rvert/3)$ against a sampled supremum for $(k_1,k_2)=(3,-2)$ | hand value, float sample | pass |
| KC5 | exact vanishing, shell by shell, of $K_{21}[e_1,e_1,e_1]_{2,3}$ and $K_{21}[e_1,e_1,e_2]_{1,3}$ | consequence of cubic invariance, exact | pass |

After the targets, a consistency check compares the reduced form of Lemma O.3 with a direct floating sum over the cube of half-width 4 at one rational direction: relative difference $7.3\times10^{-7}$, the size of that sum's truncation. It is not a known case for a target.

**Results.** 44 shells; tail allowance $T_{\rm tail}=6.13\times10^{-5}$ per raw evaluation, giving component allowances $T_{\rm tail}/2$ ($\kappa_2$, $\kappa_B'$), $2T_{\rm tail}$ ($\kappa''$) and $T_{\rm tail}$ (the others); enclosures as in Proposition O.4; norm bounds $N_{21}=10.9259$, $N_{12}=1.9832$, $N_{03}=0.0962$ (decimal ceilings of $10.92588$, $1.98317$, $0.09613$). The flag `all_targets_pass` records only that the tail bound is below $10^{-3}$ and that the reduced-form consistency check is below $10^{-3}$.

**Run.** Run oc1, version 1, run id `abea5a63-e92e-4f0a-be54-8195b6df61b4`, requested 2026-10-21T02:55:42.562Z, finished 02:56:41.889Z, through the owned-compute supervisor with `/Users/markmorris/vibe/.venv/bin/python`, exit code 0, empty standard error and wrapper files. By the author's report, unverified by the retained records, the source was edited only before its first run. These records show one disclosed completed run with a matching copy of its executed source; they do not by themselves prove an exhaustive execution or edit history. Outputs are kept outside Git in `.local-data/aaa-work-threads/saturday-agents-2026-10-21/lattice/`.

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `odd_cubic.py` (v1) | 17,492 | `153208b4545c5e6fcc7c92e99ff15b3839e7946e37e384c045a4d71c578d0c8f` |
| `oc_run1.json` | 4,506 | `1f410dc3f7453a5d80c9b673808eac6f7c2ef3cfc9b1f57e3d15171b196bd657` |
| `oc_run1.out` | 1,548 | `e9a8f08789807721eb90727e39e4e898f4c30e4d27bd6cc8893ea0e623a554e0` |
| `odd_cubic.run1-source.py` (copy of the run source) | 17,492 | `153208b4545c5e6fcc7c92e99ff15b3839e7946e37e384c045a4d71c578d0c8f` |

**Exploration, not evidence.** Before the instrument, three scratch scripts in `.tmp/saturday-agents-2026-10-21/lattice/` ran through the supervisor, and one disclosed completed supervisor run is retained for each: `explore1.py` (SHA-256 `5c5f0840…951d`, run `d736a57c-8ecf-45fb-b14e-48b01906a1c7`, 02:40:27Z; float version of the cubic formula checked against the 50-digit odd part, and pure-mode sums), `explore2.py` (`a9e3c910…e46d`, run `1e093f35-35d5-4052-86fd-3b85a32206e2`, 02:45:21Z; float invariant constants and sampled maxima) and `explore3.py` (`2f250…1778`, run `b833ca40-f400-44cb-b046-716df8ed38c8`, 02:47:00Z; orientation scan of a barrier with the half-odd part replaced by the main signed term). They chose the method and the declared endpoints of chunk 2. The notes quote one exploration figure, labelled as such.

## Chunk 2: `odd_barrier.py`

[`odd_barrier.py`](odd_barrier.py) serves the note [The signed odd remainder completed](../../analysis/saturday-lattice-odd-remainder-2026-10-21-barrier.md). It imports, unchanged and by file path, `odd_cubic.py` (this folder, frozen after run oc1) for the per-site majorant, the exact cubic and the 50-digit odd part, and the accepted [`sharp_barrier.py`](../saturday-lattice-growth-2026-10-20/sharp_barrier.py) (SHA-256 `ff44e809c2b201c8c6a59d9dc554d1ca7dc97ede5ada5291402c1a15911dc9cc`) for the tube sizes of Lemmas T.1 and G.2, the constants of Lemma H.1, the bracket polynomial of Lemma L.3, the receiver coefficient, the lower envelopes of Proposition H.4, the bounded concave-maximum certificate and the growth and time functions. Declared inputs from chunk 1: $N_{21}=10.9259$, $N_{12}=1.9832$, $N_{03}=0.0962$.

**What it computes.** The lattice sums $L(j,k)=\sum_{\ell\ne0}e^{-j\underline\lambda r}r^{-k}$, $1\le j\le10$, $-6\le k\le10$, over the cube of half-width $8$ grouped by $r^2$, with interval exponentials and an analytic tail ($24m^2+2$ sites with largest coordinate $m\ge9$, $m\le r\le\sqrt3m$, summed to $m=400$, plus $10^{-300}$); the majorant-series constants of Lemma K; the remainder polynomial of Lemma R and the deviation polynomial of Proposition D as exact polynomials in $A$, the source scale and $1/r$, summed with $L(j,k)$; the estimate $F_{\rm odd}$ with the accepted brackets and receiver coefficient at the declared tube sizes; for the declared pairs the caps, barrier, start, coefficient signs and parts; the value at the accepted endpoint; times, growth and all-label tables; the central bound for $\varepsilon=10^{-37},\dots,10^{-300}$ near its maximizing seed size; and the certificates of Proposition H (accepted chart from $0.0500$ and all charts from $0.0580$, in steps of $0.0001$).

| Stage | What is compared | Kind of reference | Result |
| --- | --- | --- | --- |
| KC1 | enclosed $L(1,k)\le S_k(a)$, $L(2,k)\le S_k(2a)$, $k=2,3,4$ | accepted declared sums (a larger rate gives smaller sums) | pass |
| KC2 | majorant $c_{20}$, $c_{30}$ equal Lemma H.1 exactly; $c_{11},c_{02},c_{21},c_{12},c_{03}$ at least Lemma H.1, at $v=0.0096617$ | accepted formulas | pass |
| KC3 | majorant $c_{40}=120$ at rest | exact Legendre norm | pass |
| KC4 | remainder bound of Lemma R above the true $\lvert\mathcal O_\ell-2C_\ell\rvert$ at actual amplitude, four offsets; row and causal root computed internally at 50 digits, the cubic, difference and bound compared in floating arithmetic | independent numerical evaluation; floating sample | pass (ratios $0.0049$, $0.0063$, $0.0128$, $0.0036$) |
| KC5 | the accepted builder reproduces $C_LF_{\rm H}(0.047,0.011045)=0.0107938493\ldots$ | accepted value (chunk 6, independently reproduced by its review) | pass |

The flag `all_targets_pass` aggregates the caps, barrier, start, sign and degree conditions of the four declared pairs and the positivity of the central bound at $10^{-37}$; it does not aggregate the certificates, the small-amplitude table or the value at the accepted endpoint, which are recorded separately in the output.

**Run.** Run ob1, version 1, run id `4f75b559-354e-4cdc-84d9-a8d77b979300`, requested 2026-10-21T03:08:48.948Z, finished 03:08:52.888Z, exit code 0, empty standard error and wrapper files.

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `odd_barrier.py` (v1) | 23,006 | `503ecff471428f002dbe9a6cd09cbab362790b87975774ac83690c8cce6ffd46` |
| `ob_run1.json` | 14,653 | `10a5c2bd7e53007a8654948548487674d3c48167137391c3cc5e548fe62701c8` |
| `ob_run1.out` | 9,700 | `0fff406fd3386c9e0e1e383cc682e797c8f3654f298f306969251745a6dd0060` |
| `odd_barrier.run1-source.py` (copy of the run source) | 23,006 | `503ecff471428f002dbe9a6cd09cbab362790b87975774ac83690c8cce6ffd46` |

**Chronology and exploration, not evidence.** Before the formal run the exploration `explore4.py` (`.tmp/saturday-agents-2026-10-21/lattice/`, SHA-256 `d6e2ccb0…d8d7`) imported this instrument's functions, not its `main()`, and evaluated $F_{\rm odd}$ on a quarter-grid of coefficients with tube constants built at the largest admissible $y$ for each seed size. Its first run (`d2dbe951-3d05-4174-afdb-0d753c8b5751`, 03:06:20Z, output `x4a.out`) failed because the lattice sums did not yet cover $j=6$; the range was widened in both files to $j\le10$, $-6\le k\le10$, and the second run (`0ed7416b-0c7e-40f1-bede-906afa4eaafe`, 03:07:48Z, output `x4.out`, SHA-256 `73da4072…0900`) chose the declared pairs. By the author's report, after the exploration had loaded the module and before the formal run, the source received the declared pairs (previously placeholders) and target T5 (the small-amplitude table), and no function used by the exploration changed; no pre-change snapshot of the source was retained, so this account is not verified by the records. The known cases therefore precede the formal barrier target loop, while the exploration had evaluated the same functions earlier. Separately, the hand logarithms $\ln(0.053/0.047)/2.8033$, $\ln(0.064/0.052)/2.8033$ and the part shares quoted in the note were checked by one shell call to the shared Python outside the supervisor (arithmetic only).

## Codex review

Command, for round $R$ of chunk $K$:

```text
/Applications/ChatGPT.app/Contents/Resources/codex-cli/bin/codex exec -m gpt-6.1-sol -c model_reasoning_effort=high -s read-only --ephemeral -C /Users/markmorris/vibe/architrino -o <evidence>/review/chunkK-reply-roundR.md "$(cat <evidence>/review/chunkK-request-roundR.md)" </dev/null
```

| Chunk, round | Started | Finished | Request SHA-256 | Reply SHA-256 | Disposition |
| --- | --- | --- | --- | --- | --- |
| 1, 1 | 03:02:11Z | 03:15:08Z | `27582e0e1a64e7a79ca2ad904ee08c473151ff5a108d81b7024a31d8a4a43f66` | `632ec8cfe671a42e4ff714495122ab007aea7bd15c6b9affebdbc98fc9693d34` | ACCEPT AFTER CORRECTIONS (SIGN, SYM, TAIL, ORDER, COUNT, HISTORY) |
| 2, 1 | 03:15:18Z | 03:27:41Z | `94fb8be209933367bae471e8ec67bbb1f183b9f59ba818045a4585980c6b6dd1` | `5ef4fbfdd86e6e817f3f69bf11f43033ce4014f05aae5d2b4f65d33b3b92a1bc` | ACCEPT AFTER CORRECTIONS, conditional on chunk 1 (OB-G, OB-E, OB-C) |
| 1, 2 | 03:16:55Z | 03:24:43Z | `1cad844b80d607648e88f3bde3cbff61cf131708ececc96e9f4c9dde250633fb` | `107898fdf3d677f7a5e2d4efd6223e38e20fd01f407d514b4f591f89104f0861` | ACCEPT AFTER CORRECTIONS (HISTORY-2) |
| 1, 3 | 03:29:42Z | 03:38:02Z | `37028e0931883b3aab4cb4385e26bcfac867d4075d846ac078d60805273f4cd7` | `dc19d7e9b908ba02fb0935622f03b84a30264636f5556fd1cad510f0ebd52c78` | ACCEPT |
| 2, 2 | 03:29:42Z | 03:38:54Z | `3e6c82a91fdce9f71bf39ca090ca6c4e780088e742ce6135e4197fd51c72bfa5` | `f6a97b1f54cca75b8df0e28b0280570695ac62c6de310b32743eeef8761db1ca` | ACCEPT |

Both chunks are accepted: chunk 1 at subject `805adc0a4846e91f34191970a724d4ab7c32506cfe5d0b6f1b7d3f0dccd12876` (30,888 bytes) and chunk 2 at subject `60d90a4c951310e0378f50574f90ebb3843de4901ed5769506715b83b044b5e3` (33,036 bytes), both with this README at `cf8e3fbf5a37bc512a11ebc3a0f21292449f6d9f4b3dcfab734152c09f0d97e0` (11,666 bytes, retained at `.local-data/aaa-work-threads/saturday-agents-2026-10-21/lattice/README-round2.md`). After acceptance this README received only this review table and the paragraph below. Times are those of `date -u` immediately before each call and after it returned; the round-2/round-3 pair ran in parallel. Each reply's standard error may contain a harmless authentication message from an unrelated MCP server.

**Exploration after chunk 2 (not evidence, not reviewed).** Three further floating explorations, and an unrun draft instrument for a row-wise treatment that did not improve the estimate, are recorded in [exploration-next-lever.md](exploration-next-lever.md) with the precise next missing estimate.
