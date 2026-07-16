#!/usr/bin/env python3
"""Tier-2 epsilon_bind cross-verification CLI (blind reduction author).

Subcommands:
  s96                independent §96 selected-row reduction
  s99-identify       float-grade sweep over all declared §99 candidates
  s99-certify        precision-controlled measurement of one §99 row
  s99-sweep          one (object, index, drift, samples) row (detached runs)

Reproduction commands are recorded in the appended evidence section.
Raw results land under .tmp/eom-verification/.
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
    Ctx, RootWall, build_section99, measure_section96, measure_section99,
)

OUT_DIR = Path(__file__).resolve().parents[2] / ".tmp" / "eom-verification"


def _hb(stream):
    def hb(msg):
        print(f"heartbeat {msg}", file=stream, flush=True)
    return hb


def _dump(payload, out: Path):
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {out}")


def _wall_record(exc: RootWall):
    return {"status": "NOT-VERIFIABLE", "wall_kind": exc.kind,
            "wall_detail": exc.detail}


def cmd_s96(args):
    results = {}
    for dps in args.dps:
        for include_self in ([True, False] if args.self_variants else
                             [not args.exclude_self]):
            ctx = Ctx(dps=dps)
            try:
                row = measure_section96(ctx, rounded_tokens=args.rounded_tokens,
                                        n_samples=args.samples,
                                        heartbeat=_hb(sys.stderr),
                                        include_self=include_self)
            except RootWall as exc:
                row = _wall_record(exc)
            key = f"dps{dps}_{'withSelf' if include_self else 'partnerOnly'}"
            results[key] = row
            print(f"s96 {key}: kappa={row.get('kappa_star_per_site_rows')} "
                  f"eps={row.get('epsilon_bind')}", flush=True)
    _dump(results, OUT_DIR / args.out)


def cmd_s99_identify(args):
    electron = args.object == "electron"
    indices = args.pairs if args.pairs else range(4 if electron else 12)
    rows = []
    started = time.monotonic()
    for idx in indices:
        for drift_token in args.drifts:
            drift = F(drift_token)
            config = build_section99(idx, electron=electron, drift=drift)
            for n in args.samples:
                ctx = Ctx(dps=args.dps)
                try:
                    row = measure_section99(config, ctx, n,
                                            heartbeat=_hb(sys.stderr),
                                            include_self=not args.exclude_self)
                except RootWall as exc:
                    row = {"label": config.label, "cycle_samples": n,
                           **_wall_record(exc)}
                row["include_self_roots"] = not args.exclude_self
                row["wall_seconds_total"] = round(time.monotonic() - started, 1)
                rows.append(row)
                jsonl = OUT_DIR / (args.out + ".jsonl")
                jsonl.parent.mkdir(parents=True, exist_ok=True)
                with jsonl.open("a", encoding="utf-8") as fh:
                    fh.write(json.dumps(row) + "\n")
                print(f"identify {config.label} N={n}: "
                      f"kappa={row.get('kappa_star')} eps={row.get('epsilon_bind')}",
                      flush=True)
    _dump({"object": args.object, "dps": args.dps, "rows": rows},
          OUT_DIR / args.out)


def cmd_s99_certify(args):
    electron = args.object == "electron"
    results = {}
    for dps in args.dps:
        config = build_section99(args.pair_index, electron=electron,
                                 drift=F(args.drift))
        ctx = Ctx(dps=dps)
        try:
            row = measure_section99(config, ctx, args.samples,
                                    heartbeat=_hb(sys.stderr),
                                    include_self=not args.exclude_self)
        except RootWall as exc:
            row = _wall_record(exc)
        results[f"dps{dps}"] = row
        print(f"certify {config.label} N={args.samples} dps={dps}: "
              f"kappa={row.get('kappa_star')} eps={row.get('epsilon_bind')}",
              flush=True)
    _dump(results, OUT_DIR / args.out)


def main() -> int:
    parser = argparse.ArgumentParser()
    sub = parser.add_subparsers(dest="cmd", required=True)

    p96 = sub.add_parser("s96")
    p96.add_argument("--dps", type=int, nargs="+", default=[40, 60])
    p96.add_argument("--samples", type=int, default=3)
    p96.add_argument("--rounded-tokens", action="store_true")
    p96.add_argument("--exclude-self", action="store_true")
    p96.add_argument("--self-variants", action="store_true",
                     help="run both with-self and partner-only bookings")
    p96.add_argument("--out", default="t2-section96.json")
    p96.set_defaults(func=cmd_s96)

    pid = sub.add_parser("s99-identify")
    pid.add_argument("--object", choices=["photon", "electron"], required=True)
    pid.add_argument("--dps", type=int, default=20)
    pid.add_argument("--samples", type=int, nargs="+", default=[1, 3])
    pid.add_argument("--drifts", nargs="+", default=["0"])
    pid.add_argument("--pairs", type=int, nargs="+", default=None)
    pid.add_argument("--exclude-self", action="store_true")
    pid.add_argument("--out", required=True)
    pid.set_defaults(func=cmd_s99_identify)

    pc = sub.add_parser("s99-certify")
    pc.add_argument("--object", choices=["photon", "electron"], required=True)
    pc.add_argument("--pair-index", type=int, required=True)
    pc.add_argument("--drift", default="0")
    pc.add_argument("--samples", type=int, required=True)
    pc.add_argument("--dps", type=int, nargs="+", default=[40, 60])
    pc.add_argument("--exclude-self", action="store_true")
    pc.add_argument("--out", required=True)
    pc.set_defaults(func=cmd_s99_certify)

    args = parser.parse_args()
    args.func(args)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
