# CRW-005 Birthday Cake For The Observer Era review — 2026-09-13

## Scope and disposition

Read the complete five-line [comic leaf](../../../../content/markdown/aaa/archie/comics/birthday-cake-for-observer-era.md), visually inspected its original full-resolution [artwork](../../../../content/assets/images/comics/birthday-cake-for-observer-era.png), and read its selected-keeper entry in [Single-Panel Prototypes](../../../office-of-learning/comics/single-panel-prototypes.md), line 433. The joke is evaluated in its comic context, not as a literal theorem or empirical cosmology result. Only the leaf caption and this receipt were written; no artwork, thumbnails, shared records, runtime, generators or Git/index state were changed.

Baseline source SHA-256: `932b15185b9dfae3ecd4a9063eb3a71b940fc9485f26bd0bdd9680322831d6c9`.

Final source SHA-256: `30ee0311f19136c4c71e47b0f08730c027bc22b92196aab848bfe449c0bdb1af`.

Original/final artwork SHA-256: `b54cb4a6c3495e3a775e7b0a8adf435da485009187a506ed75828c1befc73bc6`.

Scoped initial `git --no-optional-locks status --short` was empty. One medium finding repaired; no artwork defect or new visual requirement was identified in this bounded inspection.

## BC-01 — Medium: inference boundary versus asserted prior history

The caption said evidence starts after earlier physical history “has already happened.” That asserts an earlier history rather than stating the intended limit on inference. The caption now says dating the observer-era reconstruction does not by itself establish the age of the whole physical history.

Independent reasoning: restricting a history to an observed interval can leave multiple earlier extensions indistinguishable on that interval. Non-identification of those extensions neither proves a longer history nor proves a beginning at the interval boundary. Additional dynamical and observational constraints can narrow the possibilities; the caption does not reject them or claim that existing cosmological age estimates are arbitrary.

Visual evidence supports the narrower caption. The artwork labels the cake “current observer-era reconstruction,” answers the whole-universe candle question with “Start with the era we can date,” and explicitly says “Do not frost over the proof burden.” Its “13.8 billion-ish” prop, humorous archive labels, characters and approved composition remain untouched. The image does not serve as a new numerical age measurement or a proof of a fixed-void past.

## Verification

A new marked-based nested image/link extractor first passed a known nested image-with-link control, returning one link and one image reference in order. Only then was it applied to HEAD and the final leaf. Both references are byte-identical to baseline and resolve to the existing original image; the title is unchanged. The leaf contains no mathematical spans or displays. Direct whitespace validation passed.

The original image was read with `view_image`; its contents were actually inspected, rather than inferred from its filename. Source and image hashes were calculated independently with Node crypto and `shasum -a 256`. Final scoped `git diff --check HEAD` and direct receipt path/whitespace checks cover the authored files, including the new receipt omitted by ordinary Git diff.

## Remaining scope

This review does not certify cosmological age inference, prove an earlier universe era, alter approved artwork, or broaden into the comic collection. No chapter-local blocker remains. The coordinator owns shared review integration.
