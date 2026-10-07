"""Known-first exact rational endpoint audit; no subject imports."""
import argparse
from fractions import Fraction as F
import hashlib
import json
from pathlib import Path
import time
from datetime import datetime, timezone


def sign(q):
    return (q > 0) - (q < 0)


def square_comparison(root_argument, rational_endpoint):
    return sign(F(rational_endpoint) ** 2 - F(root_argument))


def run(stage):
    if stage == "known":
        checks = {
            "lower_sqrt_two": square_comparison(2, "7/5") == -1,
            "upper_sqrt_two": square_comparison(2, "3/2") == 1,
            "exact_sqrt_four": square_comparison(4, 2) == 0,
            "signed_rational_sum": F(1, 3) - F(1, 2) == F(-1, 6),
        }
        return {"checks": checks, "passed": all(checks.values())}
    root_checks = [
        ("3", "433/250", -1), ("3", "1733/1000", 1),
        ("146/25", "2417/1000", 1),
        ("221/100", "1487/1000", 1),
        ("97/16", "1231/500", -1),
        ("145/64", "301/200", -1),
    ]
    rows = [{"argument": q, "endpoint": e,
             "squared_difference": str(F(e)**2-F(q)),
             "expected_sign": s, "passed": square_comparison(q, e) == s}
            for q, e, s in root_checks]
    upper = F(1000, 1732) - F(1000, 2417) - F(250, 1487)
    lower = F(1000, 1733) - F(1000, 2462) - F(250, 1505)
    return {"root_rows": rows, "u_at_11_over_10_upper": str(upper),
            "u_at_9_over_8_lower": str(lower),
            "passed": all(row["passed"] for row in rows) and upper < 0 < lower}


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--stage", required=True, choices=("known", "target"))
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()
    start = time.perf_counter()
    result = run(args.stage)
    result.update(stage=args.stage, utc=datetime.now(timezone.utc).isoformat(),
                  wall_seconds=time.perf_counter()-start,
                  instrument_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest())
    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("x") as stream:
        json.dump(result, stream, indent=2, sort_keys=True)
        stream.write("\n")
    print(json.dumps(result, sort_keys=True))
    raise SystemExit(0 if result["passed"] else 1)
