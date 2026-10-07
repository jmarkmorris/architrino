#!/usr/bin/env python
"""Bounded exact prepared-layer coordinate series; no scalar terminal phase."""
from __future__ import annotations
import argparse
import hashlib
import importlib.util
import json
import resource
import sys
import time
from fractions import Fraction as F
from pathlib import Path

HELPER = Path(__file__).with_name("authorized-cases-ten-hour-coordinator-b-normal-form.py")
HELPER_SHA = "8d1321fecab362257a94c3dfd7e4b9e81e595ecd8f9926e24af0483b964d4aef"
assert hashlib.sha256(HELPER.read_bytes()).hexdigest() == HELPER_SHA
SPEC = importlib.util.spec_from_file_location("frozen_b_gaussian_helper", HELPER)
MODULE = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = MODULE
SPEC.loader.exec_module(MODULE)
C, I = MODULE.C, MODULE.I
N = 6
START = time.monotonic()
LAST = START
LIMIT = 120.0
OPS = 0
STAGE = "startup"


def budget(force=False):
    global LAST, OPS
    OPS += 1
    if not force and OPS % 1024:
        return
    now = time.monotonic()
    assert now - START < LIMIT, "internal deadline"
    assert resource.getrusage(resource.RUSAGE_SELF).ru_maxrss < 2 * 1024**3, "RSS budget"
    if force or now - LAST > 20:
        print(json.dumps({"stage": STAGE, "operations": OPS, "wall_seconds": now - START}), flush=True)
        LAST = now


def const(c=0):
    return [c if isinstance(c, C) else C(F(c))] + [C()] * N


def add(a, b):
    return [x + y for x, y in zip(a, b)]


def scale(a, c):
    return [x * c for x in a]


def shift(a, n):
    return [C()] * n + a[:N + 1 - n]


def mul(a, b):
    out = [C()] * (N + 1)
    for j, x in enumerate(a):
        budget()
        if x:
            for k in range(N + 1 - j):
                if b[k]:
                    out[j + k] = out[j + k] + x * b[k]
    return out


def inverse(a):
    c = a[0]
    assert c
    ci = c.conj() * F(1, c.r * c.r + c.i * c.i)
    out = [ci]
    for n in range(1, N + 1):
        out.append(-sum((a[j] * out[n - j] for j in range(1, n + 1)), C()) * ci)
    return out


def power(a, alpha):
    assert a[0] == C(F(1))
    u = add(a, const(-1))
    out, term, coefficient = const(1), const(1), F(1)
    for n in range(1, N + 1):
        term = mul(term, u)
        coefficient *= (alpha - n + 1) / n
        out = add(out, scale(term, coefficient))
    return out


def powers(a, n):
    out = [const(1)]
    for _ in range(n):
        out.append(mul(out[-1], a))
    return out


def evaluate_map(maps, q, qb, delta):
    maxq = max(key[1] for row in maps for key, re, im in row)
    maxqb = max(key[2] for row in maps for key, re, im in row)
    dp, qp, bp = powers(delta, N), powers(q, maxq), powers(qb, maxqb)
    result = []
    for row in maps:
        value = const()
        for (n, j, k), re, im in row:
            if n <= N:
                value = add(value, scale(mul(dp[n], mul(qp[j], bp[k])), C(F(re), F(im))))
        result.append(value)
    return result


def invert_map(maps, qold, eta):
    global STAGE
    q, qb, delta = qold, [c.conj() for c in qold], eta
    for step in range(N // 2 + 1):
        STAGE = f"inverse-coordinate-iteration-{step}"
        budget(True)
        mq, mb, ms = evaluate_map(maps, q, qb, delta)
        q, qb, delta = add(qold, add(q, scale(mq, -1))), add([c.conj() for c in qold], add(qb, scale(mb, -1))), mul(eta, inverse(ms))
    mq, mb, ms = evaluate_map(maps, q, qb, delta)
    assert mq == qold and mb == [c.conj() for c in qold]
    assert mul(delta, ms) == eta, "full forward parameter residual"
    assert qb == [c.conj() for c in q] and all(c.i == 0 for c in delta)
    return q, delta


def polynomial_at(coefficients, sigma, derivative=False):
    values = [F(c) for c in coefficients]
    if derivative:
        values = [j * values[j] for j in range(1, len(values))]
    out = F(0)
    for v in reversed(values):
        out = out * sigma + v
    return out


def layer_input(layer):
    y, v = [const(), const()], [const(), const()]
    rows = layer["coefficients"]
    assert len(rows) == 15 and layer["passed"]
    for n, pieces in enumerate(rows):
        for axis in range(2):
            y[axis][n] = C(polynomial_at(pieces[5][axis], F(200)))
            if n:
                v[axis][n - 1] = C(polynomial_at(pieces[5][axis], F(200), True))
    r = power(add(mul(y[0], y[0]), mul(y[1], y[1])), F(1, 2))
    h = add(mul(y[0], v[1]), scale(mul(y[1], v[0]), -1))
    p = mul(add(mul(y[0], v[0]), mul(y[1], v[1])), inverse(r))
    w = mul(mul(h, h), inverse(r))
    u = mul(h, p)
    qold = add(add(w, const(-1)), scale(u, I))
    eta = shift(inverse(h), 1)
    return qold, eta


def known():
    global N
    N = 6
    assert hashlib.sha256(b"abc").hexdigest() == "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
    e = shift(const(1), 1)
    assert inverse(add(const(1), e)) == [C(F((-1)**j)) for j in range(N + 1)]
    root = power(add(const(1), e), F(1, 2))
    assert mul(root, root) == add(const(1), e)
    assert polynomial_at(["1", "2", "3"], F(2)) == 17
    assert polynomial_at(["1", "2", "3"], F(2), True) == 14
    # Solvable real triangular map Q=q+delta²/2, eta=delta(1+delta²/3).
    maps = [[[[0, 1, 0], "1", "0"], [[2, 0, 0], "1/2", "0"]],
            [[[0, 0, 1], "1", "0"], [[2, 0, 0], "1/2", "0"]],
            [[[0, 0, 0], "1", "0"], [[2, 0, 0], "1/3", "0"]]]
    q, delta = invert_map(maps, const(), e)
    assert delta[1] == C(F(1)) and delta[3] == C(F(-1, 3)) and delta[5] == C(F(1, 3))
    assert q[2] == C(F(-1, 2)) and q[4] == C(F(1, 3)) and q[6] == C(F(-7, 18))
    return {"passed": True, "controls": ["SHA256abc", "frozen Gaussian helper binding", "series inverse",
        "square-root identity", "exact polynomial value/derivative", "separately solvable inverse map through degree6",
        "complete forward residual and conjugacy"]}


def save(path, data):
    payload = json.dumps(data, indent=2, sort_keys=True) + "\n"
    assert len(payload.encode()) <= 32 * 1024**2
    assert not path.exists(), "preserve output"
    path.parent.mkdir(parents=True, exist_ok=True)
    assert sum(p.stat().st_size for p in path.parent.glob("*.json")) + len(payload.encode()) <= 32 * 1024**2
    path.write_text(payload)


def main():
    global N, LIMIT
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", choices=("known", "target"), required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--known-receipt", type=Path)
    parser.add_argument("--layer", type=Path)
    parser.add_argument("--layer-sha256")
    parser.add_argument("--normal-form", type=Path)
    parser.add_argument("--normal-form-sha256")
    parser.add_argument("--deadline-seconds", type=float, default=120)
    args = parser.parse_args()
    assert 1 <= args.deadline_seconds <= 3600
    LIMIT = args.deadline_seconds
    digest = hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    if args.mode == "known":
        result = known()
    else:
        assert args.layer and args.layer_sha256 and args.normal_form and args.normal_form_sha256 and args.known_receipt
        known_receipt = json.loads(args.known_receipt.read_text())
        assert known_receipt["passed"] and known_receipt["instrument_sha256"] == digest
        assert hashlib.sha256(args.layer.read_bytes()).hexdigest() == args.layer_sha256
        assert hashlib.sha256(args.normal_form.read_bytes()).hexdigest() == args.normal_form_sha256
        N = 16
        qold, eta = layer_input(json.loads(args.layer.read_text()))
        q, delta = invert_map(json.loads(args.normal_form.read_text())["forward_map"], qold, eta)
        assert q[:3] == [C()] * 3 and q[3] == C(F(0), F(-8, 3)), "exact prepared cubic seed"
        assert delta[:3] == [C(), C(F(1)), C()]
        result = {"passed": True, "layer_sha256": args.layer_sha256, "normal_form_sha256": args.normal_form_sha256,
            "q_coefficients": [[str(c.r), str(c.i)] for c in q], "delta_coefficients": [str(c.r) for c in delta],
            "known_receipt_sha256": hashlib.sha256(args.known_receipt.read_bytes()).hexdigest(),
            "boundary": "exact finite initial-coordinate series; analytic remainder and independent audit remain separate"}
    result.update({"mode": args.mode, "instrument_sha256": digest, "helper_sha256": HELPER_SHA,
        "wall_seconds": time.monotonic() - START, "operations": OPS})
    save(args.output, result)
    print(json.dumps({"complete": True, "mode": args.mode, "output": str(args.output), "sha256": hashlib.sha256(args.output.read_bytes()).hexdigest(), "wall_seconds": result["wall_seconds"]}), flush=True)


if __name__ == "__main__":
    main()
