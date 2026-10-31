# Twisted helix fold certificate: full spacing cover joined

## Result

The [fold certificate](rotating-ladder-claude-2026-10-20-twisted-fold-certificate.md) covered the spacing interval $\delta=d/R\in[2.8700,\,2.9245]$ at $R=1000$ with 218 certified pieces. It joined only the stretch $[2.8835,2.91075]$. All 217 joins of the cover are now certified, so the whole of $[2.8700,2.9245]$ is one continuous ($C^1$) curve of exact balances $y(\delta)=(\omega R,u,\alpha)(\delta)$. The joins are the 108 gap patches of the earlier run (`fold-patches.json`) and 109 new ones (`fold-patches-2.json`, all certified, none failed or skipped). Each gap patch is a certified piece that overlaps both neighbours, with its box strictly inside both neighbouring boxes.

Both $0.878\pi$ balances of the [main certificate](rotating-ladder-claude-2026-10-20-twisted-certificate.md) lie on this curve. For each of them, the solution enclosure in $(d/R,\omega R,u)$ lies inside a chain piece's spacing interval and $(\omega R,u)$-box, and $0.878\pi$ lies inside that piece's $\alpha$-box. The lower balance is in the piece centred at $\delta=2.870375$ and the upper in the piece centred at $\delta=2.924125$. By uniqueness in those boxes, each is the curve's solution at its spacing.

All four $d\alpha/d\delta$ sign sub-pieces now lie on the chain. The sign of $d\alpha/d\delta$ (outward-rounded intervals) is:

| Spacing $\delta$ | $d\alpha/d\delta$ | Sign |
| --- | --- | --- |
| $2.8706$ | $[-0.0779,-0.0401]$ | negative |
| $2.886$ | $[-0.03204,-0.01700]$ | negative |
| $2.908$ | $[0.01639,0.03091]$ | positive |
| $2.924$ | $[0.0407,0.0755]$ | positive |

The two balances at the same twist $0.878\pi$ are therefore the two arms of one certified curve, which passes through a turning point in the twist. The minimum $\alpha_{\min}\in[0.877746339\pi,0.877753479\pi]$ stated in the fold note is unchanged.

**Claim grade:** derived, under the same lemmas, the frozen instrument (`twisted_certificate.py`, SHA-256 `75885d17…9722`) and the mpmath 1.3.0 `iv` dependency. Three things are not claimed:

- that the fold is quadratic (no second-derivative enclosure was made);
- anything about the curve outside $[2.8700,2.9245]$;
- a connection to the α-parametrized branch, which was not attempted.

## Provenance

- **Drivers.** The new driver `fold_patch2.py` (SHA-256 `8b38516d…`) uses the frozen `fold_patch.py` construction and skips pairs already certified. The assembly script `fold_final2.py` (`385c77f5…`) combines both patch receipts and checks the 0.878π balances and the sign sub-pieces against the chain.
- **Receipts.** `fold-patches-2.json` (`d1607e95…`) and `fold-check-receipt-2.json` (`31248f0f…`).
- **Run.** Owned supervisor, 60 s heartbeat, hard deadline ending 03:00Z. It was launched with the tool's background option as the PI directed and finished at 02:55:52Z with exit 0 after 771 s. Nothing remains running.

**Falsifier:** a gap patch or piece whose box holds no solution or two solutions for some $\delta$ in it.
