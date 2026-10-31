# Six-pole post-turn campaign, review: adjudication 19 (the radial zero, the speed maximum and the radial maximum, re-derived on the rebuilt chain from existing outputs; a note on negative source speeds)

Written 2026-10-21 by the review role. No new compute: every number is read with `node` from my GP2 (`47f11448…`) and GP3 (`89f6e7a0…`) audit records on R1′–R6′, which are [adjudications 14](spherical-six-pole-post-turn-claude-review-adjudication-14.md) and [15](spherical-six-pole-post-turn-claude-review-adjudication-15.md).

## (a) Canonical radial acceleration zero: RE-CERTIFIED, unique (derived)

**End signs (my own evaluation).**

| end | $r$ |
|---|---|
| 382 | NEGATIVE |
| 383 | undecided |
| 384 | POSITIVE |

**Uniqueness.** On each whole step, $r'=-l'-2wa$ holds pointwise. I enclose it from three outer whole-step boxes: my whole-step $l'$ (audit `dlambda_dt`), the record's whole-step $w$ box `VS`, and my whole-step law $a$. The enclosure is POSITIVE on every whole step 355–385. On 383 it is $[+0.0461,+0.0538]$; on 384, $[+0.0462,+0.0540]$.

**Result.** Exactly one zero, strictly increasing:

$$t\in(5.686684593623649597167959,\ 5.706684709182828044891367),\qquad T\in(56.867,\,57.067).$$

It coincides with the suspended October bracket (consistency). It is not a support event.

## (b) Speed maximum: RE-CERTIFIED, unique (derived)

**End signs (my own evaluation).** $w>0$ at every end from 226 to 250.

| end | $a$ |
|---|---|
| 238 | POSITIVE |
| 239 | undecided |
| 240 | NEGATIVE |

**Uniqueness.** My whole-step jerk enclosure is NEGATIVE on every whole step 226–250, including 239 and 240. This is my audit's own jerk, which is checked to meet the stored rate box. So $a$ decreases strictly and has one zero, with $w>0$.

**Result.** A strict local MAXIMUM of the speed:

$$t\in(4.246684593623649597167959,\ 4.266684709182828044891367),\qquad T\in(42.467,\,42.667).$$

The earlier speed-maximum campaign's box-record certificate is unaffected in any case.

## (c) Canonical radial maximum after the path turn: EXISTENCE certified; uniqueness open (derived)

**End signs of my own $r'$.**

| ends | $r'$ |
|---|---|
| 556, 557 | POSITIVE; at 557, $[+0.00068,+0.01656]$ |
| 558–565 | undecided |
| 566–570 | NEGATIVE; at 566, $[-0.01809,-0.00076]$ |

**Result.** $r$ attains a local maximum in

$$(7.436684593623649597167959,\ 7.526684709182828044891367),\qquad T\in(74.367,\,75.267).$$

**Not determined.** Uniqueness needs a whole-step sign of $r''$, which was not run. The order relative to the path turn is also NOT decided on the rebuilt chain. The path turn lies in $(t_{556},t_{558})$, and my $r'$ at 558 is undecided. The suspended chain's S6 had $r'(t_{558})>0$, but that evidence is suspended.

## Note: negative source speeds in my audit (derived from the code; one limitation)

My audit kernels evaluate the transmitter factors in the general signed form. This is audit7, lines 100–107, inherited through audit10:
- for the two meridional classes, $D=1-\sigma v'M/r$;
- for the antipode, $D=1+v'\sin(d/2)$.

The radial-rate form `d_mer` carries $v'$ and the source acceleration with their signs. No step assumes $v'>0$; GP3 audited steps 558–570, where $w<0$, with no failure. On the admitted chart, $M<0$ (adjudication 5), so when $v'$ becomes negative each class factor moves to the other side of 1. That needs no code change.

**Limitation.** None of my audit's KNOWN controls uses $v'<0$; its known cases have $v'\ge0$. Correctness for negative source speed therefore rests on the signed closed forms, which is inferred, plus cross-code agreement with the subject. The support's geomx X2 and X4 test the shared closed forms at $w'\in[-0.20,-0.10]$, but that is the support's code, not mine. A known control with $v'<0$ in a new audit version would close this. It is not needed for any ruling made so far, because every delayed source speed through step 615 is positive.
