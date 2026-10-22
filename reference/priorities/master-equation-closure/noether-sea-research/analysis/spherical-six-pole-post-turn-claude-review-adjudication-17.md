# Six-pole post-turn campaign, review: adjudication 17 (the FIRST SUPPORT TURN re-certified on the rebuilt chain, on my own evaluations)

Written 2026-10-21 by the review role, after my granted runs GP5b and GP5a. The criteria are those of [adjudication 11](spherical-six-pole-post-turn-claude-review-adjudication-11.md)(c)3.

## 1. Inputs (measured; rebuilt chain R1′–R6′ only)

Both runs used ddl10 (`67a82d34…`, unchanged) at $K=4$, with `--own` R1′–R6′. All their controls passed (audit9, R1–R3, I1–I4), and every history read was reconstructed.

| run | PID | UTC | exit | wall | band record sha256 |
|---|---|---|---|---|---|
| GP5b, steps 406–437 | 762 | 03:43:28–03:44:03 | 0 | 34.43 s | `2faa0c4d2c184e93927cf5cb1c8bb8ab559d12045c421b33b8c21ab5ed98a6eb` |
| GP5a, steps 371–405 | 1101 | 03:46:11–03:46:46 | 0 | 35.70 s | `d1d583aeab5612a49805e34d8d818297b28f8e5de0f2371e566753c35550b33c` |

The controls json for both is `db51eadf…`. The out files are `bcd67925…` (GP5b) and `c9a873ff…` (GP5a); the out.time files are `2e7e4fe7…` and `50dbd3d5…`.

What the two runs give:
- **Upper lemma.** $\sup l'\le\min(A_u+U^+\Delta,\;B_u+L^-\Delta,\;\dots)$ is NEGATIVE on every whole step 371–409: 35 of 35 steps in GP5a and steps 406–409 in GP5b.
- **Refined $l''$ is POSITIVE on every whole step 373–436.** Its lower bound rises from $+0.00001$ at 373 to $+0.0035$ near 400, then falls to $+0.000091$ at 436. Step 437 is undecided, $[-0.000076,+0.0345]$.
- **My own end values of $l'$:**
  - at 409: $[-0.0033510,\,-0.0000877]$, NEGATIVE;
  - at 436: $[+0.0000354,\,+0.0050077]$, POSITIVE;
  - at 437: $[+0.0001722,\,+0.0052311]$, POSITIVE (from GP3).

## 2. Certificate (derived)

1. **$l'<0$ at every instant from the accepted step 275 to the true step-409 end.**
   - Steps 371–409 rest on my upper lemma on the rebuilt chain.
   - Steps 275–370 rest on the earlier turning-point campaign's whole-step exclusion. That campaign used frozen accepted records built by box steps, with no affine form, so the serializer defect does not touch it. I cite it as the October synthesis does (F1, "the preceding campaign's admitted exclusion"). I have not re-read it in this session.
2. **$l'(t_{436})>0$.**
3. **$l''>0$ on every whole step 410–436**, so $l'$ increases strictly there.

Hence $l'$ has exactly one zero after step 275 and up to $t_{436}$. The crossing is strict, from negative to positive. It is a strict local MINIMUM of $l$; since $l<0$, it is a maximum of the inward support magnitude. It is the FIRST support turn since step 275.

**Ruling.** FIRST SIGNED-SUPPORT TURN: RE-CERTIFIED, UNIQUE and STRICT, on my own evaluations of the rebuilt chain. With the padded reading,

$$t_{s1}\in(5.956684593623649597167959,\ 6.226684709182828044891367),\qquad T\in(59.5668459,\,62.2668471).$$

This is one step NARROWER at the top than the suspended October bracket, which ended at the 437 end, because my 436-end value is now positive.

**Link to the second support turn** ([adjudication 16](spherical-six-pole-post-turn-claude-review-adjudication-16.md)). The derivation runs in three pieces:

- **Up to the 436 end.** '>0 20 20 12 61 79 80 81 98 701 33 100 204 250 395 398 399 400t_{s1},t_{436}] by strict increase.
- **Step 437.** The lower lemma gives +\min(L_{437},0)\Delta=0.0000354-0.0000008>01
- **Steps 438–531.** The GP4a and GP4b lemma covers them (adjudication 16).

So '>0 every instant from  the 531 end. The second support turn is therefore the NEXT zero of ' the first.

**Grade.** DERIVED from measured enclosures: my own end values and $l''$ rows on the rebuilt chain, plus the earlier campaign's frozen exclusion before 371. Shared premises are the stored-rate premise, the frozen step instrument, the cm49 inclusion with the signed serializer, padded reads and the intersection premise.

**Falsifiers.**
- A proved $l'\ge0$ at an instant before the 409 end.
- A proved $l''\le0$ on part of steps 410–436.
- A rerun of end 436 with $l'\le0$.
