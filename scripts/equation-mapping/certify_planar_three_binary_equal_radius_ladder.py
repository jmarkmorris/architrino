#!/usr/bin/env python3
"""Certify the finite equal-radius planar three-binary ladder.

This independently authored oracle implements the exact integer-level circular
root ledger with mpmath's outward-rounded ``libmpi`` interval arithmetic. Point
solves are proposals only: endpoint signs and a fixed root-Jacobian sign certify
every branch enclosure. The accepted display rows are inputs, not an evaluator;
their decimal speeds must lie inside the independently certified zero brackets.
"""

from __future__ import annotations

import argparse
import hashlib
import inspect
import json
import sys
from dataclasses import dataclass
from pathlib import Path

import mpmath as mp
import mpmath.libmp.libelefun as libelefun
import mpmath.libmp.libmpi as libmpi


ROOT = Path(__file__).resolve().parents[2]
CONFIGURATION_OWNER = ROOT / "reference/priorities/braid-program/configurations"
SCALAR_THEOREM_EVIDENCE = ROOT / (
    "reference/priorities/braid-program/evidence/"
    "2026-08-29-planar-three-binary-circular-balance-ladder.md"
)
FROZEN_SCALAR_THEOREM_EVIDENCE_SHA256 = (
    "1669066391ac4ba783be843b7f77fa11d3d9c3332085d3cbea570b8cc2ae3e54"
)
CONFIGURATION_PATTERN = "equal-radius-planar-three-binary-balance-beta-*.v3.json"

POINT_DPS = 120
INTERVAL_DPS = 80
ROOT_PROPOSAL_TOLERANCE_TOKEN = "1e-90"
ROOT_CERTIFICATE_RADIUS_TOKEN = "1e-65"
ROOT_CERTIFICATE_EXPANSIONS = 24
FOLD_BISECTION_STEPS = 330
FOLD_NEIGHBORHOOD_HALVINGS = 16
INITIAL_FOLD_DELTA_FACTOR_TOKEN = "0.005"
MAXIMUM_BOXES_PER_TOPOLOGY = 500_000
MAXIMUM_DEPTH = 64
MINIMUM_BETA_WIDTH_TOKEN = "1e-18"
ROOT_REFINE_STEPS = 100


class CertificateFailure(RuntimeError):
    pass


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def I(lower_value, upper_value=None):
    if upper_value is None:
        return mp.iv.mpf(lower_value)
    return mp.iv.mpf([lower_value, upper_value])


def lower(value) -> mp.mpf:
    return mp.mpf(value.a)


def upper(value) -> mp.mpf:
    return mp.mpf(value.b)


def strict_sign(value) -> int | None:
    if lower(value) > 0:
        return 1
    if upper(value) < 0:
        return -1
    return None


def absolute_upper(value) -> mp.mpf:
    return max(abs(lower(value)), abs(upper(value)))


def interval_string(value, digits=45) -> list[str]:
    return [mp.nstr(lower(value), digits), mp.nstr(upper(value), digits)]


def point_string(value, digits=45) -> str:
    return mp.nstr(value, digits)


def canonical_digest(paths: list[Path]) -> str:
    digest = hashlib.sha256()
    for path in paths:
        relative = str(path.relative_to(ROOT)).encode()
        payload = path.read_bytes()
        digest.update(len(relative).to_bytes(8, "big"))
        digest.update(relative)
        digest.update(len(payload).to_bytes(8, "big"))
        digest.update(payload)
    return digest.hexdigest()


def source_rows() -> tuple[dict[int, dict[str, object]], list[Path]]:
    paths = sorted(CONFIGURATION_OWNER.glob(CONFIGURATION_PATTERN))
    rows: dict[int, dict[str, object]] = {}
    for path in paths:
        packet = json.loads(path.read_text())
        parameters = packet.get("geometry", {}).get("balanceParameters", {})
        odd_fold = parameters.get("oddFoldIndex")
        beta = parameters.get("betaDecimal")
        root_count = parameters.get("directedRootCount")
        if not isinstance(odd_fold, int) or odd_fold < 1 or odd_fold % 2 != 1:
            raise CertificateFailure(f"invalid odd fold index in {path}")
        topology = odd_fold + 1
        if topology in rows:
            raise CertificateFailure(f"duplicate T{topology:03d} source row")
        if not isinstance(beta, str) or not isinstance(root_count, int):
            raise CertificateFailure(f"incomplete source row in {path}")
        rows[topology] = {
            "path": str(path.relative_to(ROOT)),
            "beta": beta,
            "directedRootCount": root_count,
            "sourceSha256": parameters.get("sourceSha256"),
        }
    if sorted(rows) != list(range(2, 201, 2)):
        raise CertificateFailure("source configurations do not cover T02 through T200")
    return rows, paths


@dataclass(frozen=True)
class Fold:
    q: int
    xi: object
    beta: object


@dataclass(frozen=True)
class Branch:
    level: int
    side: str


@dataclass(frozen=True)
class BoxResult:
    tangential: object
    derivative: object
    radial: object
    minimum_transversality: mp.mpf


class Oracle:
    def __init__(self):
        mp.mp.dps = POINT_DPS
        mp.iv.dps = INTERVAL_DPS
        self.pi = mp.pi
        self.pi_interval = mp.iv.pi
        self.fold_cache: dict[int, Fold] = {}
        self.root_cache: dict[tuple[str, int, str], object] = {}
        self.point_ledger_cache: dict[tuple[str, int], BoxResult] = {}

    def fold_function_interval(self, x: mp.mpf, q: int):
        xx = I(x)
        return mp.iv.sin(xx) / mp.iv.cos(xx) - xx - q * self.pi_interval / 6

    def fold(self, q: int) -> Fold:
        if q in self.fold_cache:
            return self.fold_cache[q]
        if q == 0:
            result = Fold(0, I(0), I(1))
            self.fold_cache[q] = result
            return result
        lo = mp.mpf(0)
        hi = self.pi / 2 - mp.mpf("1e-8")
        if strict_sign(self.fold_function_interval(lo, q)) != -1:
            raise CertificateFailure(f"fold {q}: lower sign not certified")
        if strict_sign(self.fold_function_interval(hi, q)) != 1:
            raise CertificateFailure(f"fold {q}: upper sign not certified")
        for _ in range(FOLD_BISECTION_STEPS):
            middle = (lo + hi) / 2
            sign = strict_sign(self.fold_function_interval(middle, q))
            if sign == -1:
                lo = middle
            elif sign == 1:
                hi = middle
            else:
                lo -= mp.mpf("1e-75")
                hi += mp.mpf("1e-75")
                break
        result = Fold(q, I(lo, hi), 1 / mp.iv.cos(I(lo, hi)))
        self.fold_cache[q] = result
        return result

    def level_interval(self, level: int):
        return level * self.pi_interval / 6

    def root_residual_interval(self, beta: mp.mpf, v: mp.mpf, level: int):
        return I(beta) * mp.iv.sin(I(v)) - I(v) - self.level_interval(level)

    def root_proposal(self, beta: mp.mpf, level: int, side: str) -> mp.mpf:
        target = mp.mpf(level) * self.pi / 6
        function = lambda v: beta * mp.sin(v) - v - target
        turning = mp.acos(1 / beta) if beta > 1 else mp.mpf(0)
        cap = self.pi - mp.mpf("1e-20")
        if side == "rising":
            left, right = mp.mpf(0), turning
        elif level < 0:
            left, right = mp.mpf(0), cap
        else:
            left, right = turning, cap
        try:
            return mp.findroot(
                function,
                (left, right),
                solver="anderson",
                tol=mp.mpf(ROOT_PROPOSAL_TOLERANCE_TOKEN),
                maxsteps=120,
                verify=False,
            )
        except (ValueError, ZeroDivisionError):
            return mp.findroot(
                function,
                (left + right) / 2,
                tol=mp.mpf(ROOT_PROPOSAL_TOLERANCE_TOKEN),
                maxsteps=120,
                verify=False,
            )

    def root_at(self, beta: mp.mpf, level: int, side: str):
        key = (mp.nstr(beta, 105), level, side)
        if key in self.root_cache:
            return self.root_cache[key]
        proposal = self.root_proposal(beta, level, side)
        radius = mp.mpf(ROOT_CERTIFICATE_RADIUS_TOKEN)
        expected_left = -1 if side == "rising" else 1
        expected_jacobian = 1 if side == "rising" else -1
        for _ in range(ROOT_CERTIFICATE_EXPANSIONS):
            lo = max(mp.mpf(0), proposal - radius)
            hi = min(self.pi - mp.mpf("1e-30"), proposal + radius)
            candidate = I(lo, hi)
            jacobian = I(beta) * mp.iv.cos(candidate) - 1
            if (
                strict_sign(self.root_residual_interval(beta, lo, level)) == expected_left
                and strict_sign(self.root_residual_interval(beta, hi, level)) == -expected_left
                and strict_sign(jacobian) == expected_jacobian
            ):
                self.root_cache[key] = candidate
                return candidate
            radius *= 10
        raise CertificateFailure(
            f"root enclosure failed beta={mp.nstr(beta, 30)} m={level} side={side}"
        )

    @staticmethod
    def branches(topology: int) -> list[Branch]:
        result = [Branch(level, "descending") for level in range(-5, 0)]
        if topology >= 1:
            result.append(Branch(0, "descending"))
            for level in range(1, topology):
                result.append(Branch(level, "rising"))
                result.append(Branch(level, "descending"))
        return result

    def root_over(self, beta_lo: mp.mpf, beta_hi: mp.mpf, branch: Branch):
        at_lo = self.root_at(beta_lo, branch.level, branch.side)
        at_hi = self.root_at(beta_hi, branch.level, branch.side)
        if branch.side == "rising":
            return I(lower(at_hi), upper(at_lo))
        return I(lower(at_lo), upper(at_hi))

    def ledger_box(self, beta_lo: mp.mpf, beta_hi: mp.mpf, topology: int) -> BoxResult:
        cache_key = (mp.nstr(beta_lo, 105), topology)
        if beta_lo == beta_hi and cache_key in self.point_ledger_cache:
            return self.point_ledger_cache[cache_key]
        beta = I(beta_lo, beta_hi)
        tangential = I(0)
        derivative = I(0)
        radial = I(0)
        minimum_transversality = mp.inf
        for branch in self.branches(topology):
            v = self.root_over(beta_lo, beta_hi, branch)
            sine = mp.iv.sin(v)
            cosine = mp.iv.cos(v)
            jacobian = beta * cosine - 1
            expected = 1 if branch.side == "rising" else -1
            if strict_sign(jacobian) != expected:
                raise CertificateFailure(
                    f"branch transversality unresolved T{topology:03d} "
                    f"m={branch.level} {branch.side}"
                )
            absolute_jacobian = jacobian if expected == 1 else -jacobian
            minimum_transversality = min(
                minimum_transversality, lower(absolute_jacobian)
            )
            polarity = -1 if branch.level % 2 else 1
            sine2 = sine * sine
            a = cosine / sine2
            tangential += polarity * a / (4 * absolute_jacobian)
            radial += polarity / (4 * sine * absolute_jacobian)
            dv = -sine / jacobian
            a_v = -(1 + cosine * cosine) / (sine2 * sine)
            jacobian_prime = cosine - beta * sine * dv
            derivative += polarity * (
                a_v * dv / absolute_jacobian
                - a * expected * jacobian_prime / (absolute_jacobian * absolute_jacobian)
            ) / 4
        result = BoxResult(tangential, derivative, radial, minimum_transversality)
        if beta_lo == beta_hi:
            self.point_ledger_cache[cache_key] = result
        return result

    def fold_neighborhood(self, q: int) -> tuple[dict[str, object], mp.mpf]:
        fold = self.fold(q)
        fold_hi = upper(fold.beta)
        initial_delta = mp.mpf(INITIAL_FOLD_DELTA_FACTOR_TOKEN) / fold_hi**3
        polarity = -1 if q % 2 else 1
        regular_topology = q if q >= 1 else 0
        attempts = []
        for halving in range(FOLD_NEIGHBORHOOD_HALVINGS + 1):
            delta = initial_delta / (2**halving)
            cut = fold_hi + delta
            regular_bound = absolute_upper(
                self.ledger_box(lower(fold.beta), cut, regular_topology).tangential
            )
            beta = I(lower(fold.beta), cut)
            newborn_lower = mp.mpf(0)
            if q == 0:
                descending = self.root_at(cut, 0, "descending")
                v = I(0, upper(descending))
                cosine_lower = lower(mp.iv.cos(v))
                jacobian_upper = absolute_upper(beta * mp.iv.cos(v) - 1)
                newborn_lower = cosine_lower / (4 * jacobian_upper)
            else:
                rising = self.root_at(cut, q, "rising")
                descending = self.root_at(cut, q, "descending")
                for v in (
                    I(lower(rising), upper(fold.xi)),
                    I(lower(fold.xi), upper(descending)),
                ):
                    cosine_lower = lower(mp.iv.cos(v))
                    jacobian_upper = absolute_upper(beta * mp.iv.cos(v) - 1)
                    if cosine_lower <= 0 or jacobian_upper <= 0:
                        newborn_lower = mp.mpf(-1)
                        break
                    newborn_lower += cosine_lower / (4 * jacobian_upper)
            passed = newborn_lower > regular_bound
            attempts.append(
                {
                    "halving": halving,
                    "delta": point_string(delta),
                    "regularTangentialAbsoluteUpper": point_string(regular_bound),
                    "newbornTangentialAbsoluteLower": point_string(newborn_lower),
                    "passed": passed,
                }
            )
            if passed:
                return {
                    "foldIndex": q,
                    "foldBeta": interval_string(fold.beta),
                    "cutBeta": point_string(cut),
                    "sign": polarity,
                    "attempts": attempts,
                }, cut
        raise CertificateFailure(f"fold-neighborhood dominance unresolved at q={q}")

    def refine_unique_root(self, lo: mp.mpf, hi: mp.mpf, topology: int):
        left_sign = strict_sign(self.ledger_box(lo, lo, topology).tangential)
        right_sign = strict_sign(self.ledger_box(hi, hi, topology).tangential)
        if left_sign is None or right_sign is None or left_sign == right_sign:
            raise CertificateFailure(f"T{topology:03d}: root lacks endpoint signs")
        for _ in range(ROOT_REFINE_STEPS):
            middle = (lo + hi) / 2
            sign = strict_sign(self.ledger_box(middle, middle, topology).tangential)
            if sign is None:
                raise CertificateFailure(f"T{topology:03d}: point sign unresolved")
            if sign == left_sign:
                lo = middle
            else:
                hi = middle
        box = self.ledger_box(lo, hi, topology)
        if strict_sign(box.derivative) is None or strict_sign(box.radial) != -1:
            raise CertificateFailure(f"T{topology:03d}: zero derivative/radial unresolved")
        return {
            "betaBracket": [point_string(lo, 55), point_string(hi, 55)],
            "endpointSigns": [left_sign, right_sign],
            "derivative": interval_string(box.derivative, 40),
            "radial": interval_string(box.radial, 40),
            "minimumBranchTransversality": point_string(
                box.minimum_transversality, 40
            ),
            "simple": True,
            "inwardRadial": True,
        }

    def certify_compact(self, topology: int, lo: mp.mpf, hi: mp.mpf):
        stack = [(lo, hi, 0)]
        sign_boxes = 0
        monotone_boxes = 0
        processed = 0
        maximum_depth = 0
        unique_cells: list[tuple[mp.mpf, mp.mpf]] = []
        minimum_transversality = mp.inf
        while stack:
            left, right, depth = stack.pop()
            processed += 1
            maximum_depth = max(maximum_depth, depth)
            if processed > MAXIMUM_BOXES_PER_TOPOLOGY:
                raise CertificateFailure(f"T{topology:03d}: resource box cap exceeded")
            try:
                box = self.ledger_box(left, right, topology)
            except CertificateFailure as error:
                if "branch transversality unresolved" not in str(error):
                    raise
                if depth >= MAXIMUM_DEPTH or right - left <= mp.mpf(MINIMUM_BETA_WIDTH_TOKEN):
                    raise
                middle = (left + right) / 2
                stack.extend(((middle, right, depth + 1), (left, middle, depth + 1)))
                continue
            minimum_transversality = min(
                minimum_transversality, box.minimum_transversality
            )
            if strict_sign(box.tangential) is not None:
                sign_boxes += 1
                continue
            derivative_sign = strict_sign(box.derivative)
            if derivative_sign is not None:
                left_sign = strict_sign(
                    self.ledger_box(left, left, topology).tangential
                )
                right_sign = strict_sign(
                    self.ledger_box(right, right, topology).tangential
                )
                if left_sign is not None and right_sign is not None:
                    if left_sign == right_sign:
                        monotone_boxes += 1
                        continue
                    consistent = (
                        derivative_sign == 1 and left_sign < right_sign
                    ) or (derivative_sign == -1 and left_sign > right_sign)
                    if consistent:
                        unique_cells.append((left, right))
                        monotone_boxes += 1
                        continue
            if depth >= MAXIMUM_DEPTH or right - left <= mp.mpf(MINIMUM_BETA_WIDTH_TOKEN):
                raise CertificateFailure(
                    f"T{topology:03d}: unresolved beta box "
                    f"[{point_string(left)},{point_string(right)}]"
                )
            middle = (left + right) / 2
            stack.extend(((middle, right, depth + 1), (left, middle, depth + 1)))
        return {
            "topologyIntervalId": f"T{topology:03d}",
            "compactBeta": [point_string(lo), point_string(hi)],
            "branchCountPerReceiver": len(self.branches(topology)),
            "directedRootCount": 6 * len(self.branches(topology)),
            "processedBoxes": processed,
            "signDefiniteBoxes": sign_boxes,
            "derivativeMonotoneBoxes": monotone_boxes,
            "maximumDepth": maximum_depth,
            "minimumCertifiedBranchTransversality": point_string(
                minimum_transversality, 40
            ),
            "zeros": [
                self.refine_unique_root(left, right, topology)
                for left, right in unique_cells
            ],
            "evenMultiplicityZerosExcluded": True,
        }


def calculate(first_topology: int, maximum_topology: int) -> dict[str, object]:
    if sha256(SCALAR_THEOREM_EVIDENCE) != FROZEN_SCALAR_THEOREM_EVIDENCE_SHA256:
        raise CertificateFailure("frozen scalar theorem evidence changed")
    if not (0 <= first_topology <= maximum_topology <= 200):
        raise CertificateFailure("topology range must satisfy 0 <= first <= maximum <= 200")
    rows, source_paths = source_rows()
    oracle = Oracle()
    intervals = []
    fold_neighborhoods = []
    for topology in range(first_topology, maximum_topology + 1):
        if topology == 0:
            left = mp.mpf("0.05")
        else:
            neighborhood, left = oracle.fold_neighborhood(topology - 1)
            fold_neighborhoods.append(neighborhood)
        right = lower(oracle.fold(topology).beta)
        result = oracle.certify_compact(topology, left, right)
        expected = 1 if topology >= 2 and topology % 2 == 0 else 0
        if len(result["zeros"]) != expected:
            raise CertificateFailure(
                f"T{topology:03d}: got {len(result['zeros'])} zeros, expected {expected}"
            )
        result["expectedUniqueZeroCount"] = expected
        result["passed"] = True
        if expected:
            source = rows[topology]
            bracket = result["zeros"][0]["betaBracket"]
            beta = mp.mpf(source["beta"])
            if not mp.mpf(bracket[0]) < beta < mp.mpf(bracket[1]):
                raise CertificateFailure(f"T{topology:03d}: source beta escaped bracket")
            if source["directedRootCount"] != result["directedRootCount"]:
                raise CertificateFailure(f"T{topology:03d}: source root count mismatch")
            result["sourceBinding"] = source
        intervals.append(result)
        print(
            f"[equal-radius-ladder] T{topology:03d} "
            f"boxes={result['processedBoxes']} zeros={len(result['zeros'])} "
            f"minJ={result['minimumCertifiedBranchTransversality']}",
            file=sys.stderr,
            flush=True,
        )
    total_boxes = sum(result["processedBoxes"] for result in intervals)
    return {
        "schema": "braid-program/planar-three-binary-equal-radius-ladder-certificate.v1",
        "claimGrade": "computer-assisted derived finite zero census",
        "frozenInputs": {
            "scalarTheoremEvidence": str(SCALAR_THEOREM_EVIDENCE.relative_to(ROOT)),
            "scalarTheoremEvidenceSha256": FROZEN_SCALAR_THEOREM_EVIDENCE_SHA256,
            "sourceConfigurationPattern": str(
                (CONFIGURATION_OWNER / CONFIGURATION_PATTERN).relative_to(ROOT)
            ),
            "sourceConfigurationCount": len(source_paths),
            "sourceConfigurationCollectionSha256": canonical_digest(source_paths),
        },
        "arithmetic": {
            "kernel": "mpmath 1.3 libmpi arbitrary-precision interval arithmetic",
            "outwardRounding": (
                "lower endpoints use round_floor and upper endpoints use "
                "round_ceiling, including trigonometric range reduction"
            ),
            "libmpiPath": str(Path(inspect.getsourcefile(libmpi)).resolve()),
            "libmpiSha256": sha256(Path(inspect.getsourcefile(libmpi)).resolve()),
            "libelefunPath": str(Path(inspect.getsourcefile(libelefun)).resolve()),
            "libelefunSha256": sha256(Path(inspect.getsourcefile(libelefun)).resolve()),
            "pointDecimalDigits": POINT_DPS,
            "intervalDecimalDigits": INTERVAL_DPS,
        },
        "analyticExhaustionBasis": {
            "rootEquation": "F_beta(v)=beta sin(v)-v=m pi/6 on 0<v<pi",
            "concavity": "F_beta''(v)=-beta sin(v)<0",
            "branchCountPerReceiver": "5 in T000 and 2t+4 in T_t for t>=1",
            "directedRootCount": "30 in T000 and 12t+24 in T_t for t>=1",
        },
        "resourcePolicy": {
            "maximumBoxesPerTopology": MAXIMUM_BOXES_PER_TOPOLOGY,
            "maximumSubdivisionDepth": MAXIMUM_DEPTH,
            "minimumBetaWidth": MINIMUM_BETA_WIDTH_TOKEN,
            "failureMode": "fail closed on every unresolved fold, root, ledger, derivative, or radial interval",
        },
        "foldNeighborhoods": fold_neighborhoods,
        "intervals": intervals,
        "summary": {
            "firstTopology": f"T{first_topology:03d}",
            "lastTopology": f"T{maximum_topology:03d}",
            "certifiedIntervalCount": len(intervals),
            "certifiedUniqueZeroCount": sum(len(result["zeros"]) for result in intervals),
            "processedBoxes": total_boxes,
            "maximumSubdivisionDepth": max(result["maximumDepth"] for result in intervals),
            "minimumBranchTransversality": point_string(
                min(
                    mp.mpf(result["minimumCertifiedBranchTransversality"])
                    for result in intervals
                ),
                40,
            ),
            "allPassed": True,
        },
        "claimBoundary": (
            "outward-rounded finite zero count only for the exact equal-radius, "
            "regular-phase planar three-binary circular acceleration ledger with c_f=1; "
            "no completeness above the last certified topology, global tail theorem, "
            "release, retention, stability, binding, physical spectrum, or scientific acceptance"
        ),
        "falsifier": (
            "a missed admissible branch, failed source-row inclusion, extra or missing zero, "
            "non-simple zero, non-inward radial coefficient, failed outward rounding, or "
            "unresolved interval box"
        ),
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--first-topology", type=int, default=37)
    parser.add_argument("--max-topology", type=int, default=200)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    packet = calculate(args.first_topology, args.max_topology)
    payload = json.dumps(packet, indent=2, sort_keys=True) + "\n"
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(payload)
        print(
            json.dumps(
                {
                    "output": str(args.output),
                    "outputSha256": sha256(args.output),
                    "summary": packet["summary"],
                },
                indent=2,
            )
        )
    else:
        print(payload, end="")


if __name__ == "__main__":
    main()
