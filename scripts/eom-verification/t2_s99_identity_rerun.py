#!/usr/bin/env python3
"""Tier-2 SS99 identity rerun (supplementary extraction 2026-07-15b).

The supplementary fixture key `supplementary_extraction_2026_07_15b` of
reference/priorities/app-solver/evidence/t2-t4-fixture-data-2026-07-15.json
fixes the three conventions that blocked the first Tier-2 pass:

  * per-hit weight: strength_rec*strength_src * pol_rec*pol_src *
    (D_T*D_s)/(D_s^2+soft^2) / r^2  -- SIGNED branch factors (no absolute
    value), r^2 unregularized, roots with r <= 1e-8 skipped  ->  Ctx
    w_mode "signed";
  * partner-wake-only enumeration scope (same-source roots excluded from
    both the SS96 and SS99 bookings)  ->  include_self=False;
  * proxy-sea construction for odd pairIndex rows: exactly three
    source-only sites (ids sea:0..2), center (0,0,0), equatorial circle of
    radius 2.2, phases pi/12 + 2*pi*k/3, rotating at omega = +0.7 (positive
    sense), polarities (+1,-1,+1), hit-weight strength 0.12, chargeUnits 0,
    dynamic=false (excluded from the kappa* fit, pump, and charge ledgers),
    co-drifting with the assembly;
  * coarse rows booked at coarseCycleSamples = 1; the sampling ladder
    (3/6/12/24) replays the best row's config AT ITS OWN COARSE DRIFT.

Subcommands:
  sweep    identification sweep (object x pairIndex grid x drift grid, N=1)
  ladder   sampling ladder 3/6/12/24 on one row at dps rungs
  certify  one (object, pair, drift, N) row at dps rungs

Raw JSON/JSONL under .tmp/eom-verification/; heartbeats to
.tmp/eom-verification/t2b-heartbeat.log.
"""

from __future__ import annotations

import argparse
import json
import sys
import time
from fractions import Fraction as F
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from t2_epsilon_bind_lib import (  # noqa: E402
    Ctx, RootWall, build_section99, measure_section99,
)

OUT_DIR = Path(__file__).resolve().parents[2] / ".tmp" / "eom-verification"
HB_LOG = OUT_DIR / "t2b-heartbeat.log"


def _hb(tag):
    def hb(msg):
        HB_LOG.parent.mkdir(parents=True, exist_ok=True)
        with HB_LOG.open("a", encoding="utf-8") as fh:
            fh.write(f"{time.strftime('%H:%M:%S')} [{tag}] {msg}\n")
    return hb


def _append_jsonl(row, path: Path):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as fh:
        fh.write(json.dumps(row) + "\n")


def _done_keys(path: Path):
    keys = set()
    if path.exists():
        for line in path.read_text(encoding="utf-8").splitlines():
            try:
                row = json.loads(line)
                keys.add(row.get("row_key"))
            except json.JSONDecodeError:
                pass
    return keys


def _measure(obj, pair, drift, n, dps, tag):
    electron = obj == "electron"
    config = build_section99(pair, electron=electron, drift=F(drift))
    ctx = Ctx(dps=dps, w_mode="signed")
    started = time.monotonic()
    try:
        row = measure_section99(config, ctx, n, heartbeat=_hb(tag),
                                include_self=False)
        row["status"] = "ok"
    except RootWall as exc:
        row = {"label": config.label, "status": "NOT-VERIFIABLE",
               "wall_kind": exc.kind, "wall_detail": exc.detail}
    row["row_key"] = f"{obj}:pair{pair}:u{drift}:N{n}:dps{dps}"
    row["object"] = obj
    row["pair_index"] = pair
    row["drift_token"] = drift
    row["wall_seconds"] = round(time.monotonic() - started, 2)
    return row


def cmd_sweep(args):
    out = OUT_DIR / args.out
    done = _done_keys(out)
    pairs = args.pairs if args.pairs is not None else (
        range(4) if args.object == "electron" else range(12))
    for pair in pairs:
        for drift in args.drifts:
            key = f"{args.object}:pair{pair}:u{drift}:N{args.samples}:dps{args.dps}"
            if key in done:
                continue
            row = _measure(args.object, pair, drift, args.samples, args.dps,
                           tag=f"sweep-{args.object}")
            _append_jsonl(row, out)
            print(f"sweep {row['row_key']}: kappa={row.get('kappa_star')} "
                  f"eps={row.get('epsilon_bind')} "
                  f"wall={row.get('wall_seconds')}s", flush=True)
    print("sweep complete", flush=True)


def cmd_ladder(args):
    out = OUT_DIR / args.out
    done = _done_keys(out)
    for dps in args.dps:
        for n in args.samples:
            key = f"{args.object}:pair{args.pair}:u{args.drift}:N{n}:dps{dps}"
            if key in done:
                continue
            row = _measure(args.object, args.pair, args.drift, n, dps,
                           tag=f"ladder-{args.object}")
            _append_jsonl(row, out)
            print(f"ladder {row['row_key']}: kappa={row.get('kappa_star')} "
                  f"eps={row.get('epsilon_bind')} "
                  f"wall={row.get('wall_seconds')}s", flush=True)
    print("ladder complete", flush=True)


def main() -> int:
    parser = argparse.ArgumentParser()
    sub = parser.add_subparsers(dest="cmd", required=True)

    ps = sub.add_parser("sweep")
    ps.add_argument("--object", choices=["photon", "electron"], required=True)
    ps.add_argument("--pairs", type=int, nargs="+", default=None)
    ps.add_argument("--drifts", nargs="+", required=True)
    ps.add_argument("--samples", type=int, default=1)
    ps.add_argument("--dps", type=int, default=20)
    ps.add_argument("--out", required=True)
    ps.set_defaults(func=cmd_sweep)

    pl = sub.add_parser("ladder")
    pl.add_argument("--object", choices=["photon", "electron"], required=True)
    pl.add_argument("--pair", type=int, required=True)
    pl.add_argument("--drift", required=True)
    pl.add_argument("--samples", type=int, nargs="+", default=[3, 6, 12, 24])
    pl.add_argument("--dps", type=int, nargs="+", default=[30, 40])
    pl.add_argument("--out", required=True)
    pl.set_defaults(func=cmd_ladder)

    args = parser.parse_args()
    args.func(args)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
