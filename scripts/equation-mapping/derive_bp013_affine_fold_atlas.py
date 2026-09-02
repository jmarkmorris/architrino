#!/usr/bin/env python3
"""Emit the exact affine fold-sheet manifest for the first BP-013 quotient.

The manifest is a symbolic topology reduction.  It does not perform interval
root enclosure or evaluate any acceleration row.
"""

from __future__ import annotations

import json


PHASE_FORMS = (
    (0, 0, 0),
    (1, 0, 0),
    (1, 1, 0),
    (1, 1, 1),
)


def difference(left: tuple[int, ...], right: tuple[int, ...]) -> tuple[int, ...]:
    return tuple(a - b for a, b in zip(left, right, strict=True))


forms: dict[tuple[int, ...], list[tuple[int, int]]] = {}
for receiver, receiver_form in enumerate(PHASE_FORMS):
    for transmitter, transmitter_form in enumerate(PHASE_FORMS):
        form = difference(receiver_form, transmitter_form)
        forms.setdefault(form, []).append((receiver, transmitter))

if len(forms) != 13 or len(forms[(0, 0, 0)]) != 4:
    raise AssertionError("unexpected directed-channel affine-form census")

sheets = []
for form, owners in sorted(forms.items()):
    sign = 0 if form == (0, 0, 0) else (1 if next(value for value in form if value) > 0 else -1)
    # L(beta) lies in [0, 12*pi) on the declared speed domain.  Positive
    # differences require 2*l*pi-L in (0,2*pi); negative differences require
    # it in (-2*pi,0).  The zero form includes beta=1 at l=0.
    lobe_indices = range(0, 6) if sign <= 0 else range(1, 7)
    for lobe_index in lobe_indices:
        sheets.append({
            "gapCoefficients": list(form),
            "owners": [list(owner) for owner in owners],
            "differenceSign": sign,
            "lobeIndex": lobe_index,
            "equation": "dot(gapCoefficients,[g0,g1,g2]) + L(beta) - 2*lobeIndex*pi = 0",
        })

if len(sheets) != 78:
    raise AssertionError("unexpected feasible-sign fold-sheet count")

print(json.dumps({
    "schema": "braid-program/bp013-affine-fold-atlas.v1",
    "phaseForms": [list(form) for form in PHASE_FORMS],
    "directedChannelCount": 16,
    "distinctDifferenceFormCount": len(forms),
    "rawSheetCount": 16 * 7,
    "deduplicatedSheetCount": 13 * 7,
    "signFeasibleSheetCount": len(sheets),
    "sheets": sheets,
    "claimBoundary": "exact symbolic fold-sheet manifest only; no chamber-feasibility, D4-equivalence, root-ownership, interval-cover, or balance claim",
}, indent=2))
