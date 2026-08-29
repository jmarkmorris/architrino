#!/usr/bin/env python3
"""Close the fixed-phase orthogonal-plane weave fold boxes by limits.

This extension treats the committed ordinary interval oracle as a frozen
dependency.  It removes each target fold sheet, interval-encloses every other
phase-zero contribution across the whole declared fold box, and proves that
the born target sheet dominates on the root side.  Exact folds are routed by
the already-canonical caustic rules in the Master Equation.
"""

from __future__ import annotations

import argparse
import hashlib
import importlib.util
import json
import sys
from pathlib import Path
from typing import Any

import mpmath as mp


REPO_ROOT = Path(__file__).resolve().parents[3]
DEFAULT_PROTOCOL = (
    REPO_ROOT
    / "src/prescribed-path-analysis/protocols/"
    "orthogonal-plane-weave-fold-limiting-exclusion-protocol.v1.json"
)
DEFAULT_RECEIPT = (
    REPO_ROOT
    / "reference/priorities/braid-program/evidence/"
    "2026-08-29-orthogonal-plane-weave-fold-limiting-exclusion.v1.json"
)
RECEIPT_SCHEMA = (
    "braid-program/orthogonal-plane-weave-fold-limiting-exclusion-receipt.v1"
)


def sha256_bytes(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


def token(value: Any, digits: int = 40) -> str:
    if value == 0:
        return "0"
    return mp.nstr(
        value,
        n=digits,
        strip_zeros=False,
        min_fixed=-20,
        max_fixed=20,
    )


def iv_bounds(value: Any) -> tuple[mp.mpf, mp.mpf]:
    lower_raw, upper_raw = value._mpi_
    return mp.mpf(lower_raw), mp.mpf(upper_raw)


def iv_record(value: Any, digits: int = 40) -> dict[str, str]:
    lower, upper = iv_bounds(value)
    return {"lower": token(lower, digits), "upper": token(upper, digits)}


def load_frozen_oracle(path: Path) -> Any:
    spec = importlib.util.spec_from_file_location(
        "frozen_orthogonal_plane_weave_interval_oracle", path
    )
    if spec is None or spec.loader is None:
        raise RuntimeError(f"cannot load frozen oracle {path}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


def validate_protocol(packet: dict[str, Any], protocol_path: Path) -> None:
    expected = (
        "prescribed-path-analysis/"
        "orthogonal-plane-weave-fold-limiting-exclusion-protocol.v1"
    )
    if packet.get("schema") != expected:
        raise ValueError("unsupported fold-limit protocol schema")
    if protocol_path != DEFAULT_PROTOCOL.resolve():
        raise ValueError("v1 fold-limit certificate accepts only the canonical protocol")
    domain = packet["domain"]
    if domain["fieldSpeed"] != "1" or domain["beta"] != ["0.25", "12"]:
        raise ValueError("the normalized bounded domain must remain frozen")
    for key in (
        "ordinaryCertificate",
        "ordinaryOracle",
        "masterEquation",
        "sixWorldlineSubject",
    ):
        path = REPO_ROOT / packet["frozenInputs"][f"{key}Path"]
        expected_hash = packet["frozenInputs"][f"{key}Sha256"]
        if sha256_bytes(path.read_bytes()) != expected_hash:
            raise ValueError(f"frozen input changed: {path}")


def sheet_key(sheet: Any) -> tuple[str, int, str]:
    return sheet.kind, sheet.lobe_index, sheet.side


def is_target_sheet(sheet: Any, target: dict[str, Any]) -> bool:
    return (
        sheet.kind == target["kind"]
        and sheet.lobe_index == int(target["lobeIndex"])
    )


def filtered_other_tubes(
    oracle: Any,
    beta_lower: mp.mpf,
    beta_upper: mp.mpf,
    target: dict[str, Any],
    lobes_by_kind: dict[str, list[Any]],
    steps: int,
    inflation: mp.mpf,
) -> list[Any]:
    beta_values = [beta_lower, (beta_lower + beta_upper) / 2, beta_upper]
    sheets_by_beta: list[dict[tuple[str, int, str], Any]] = []
    for beta in beta_values:
        sheets = [
            sheet
            for sheet in oracle.sheets_at_beta(beta, lobes_by_kind, steps)
            if not is_target_sheet(sheet, target)
        ]
        sheets_by_beta.append({sheet_key(sheet): sheet for sheet in sheets})
    keys = set(sheets_by_beta[0])
    if any(set(sheets) != keys for sheets in sheets_by_beta[1:]):
        raise ValueError("a non-target root topology changes inside a fold box")
    tubes = []
    for key in sorted(keys):
        values = [sheets[key].x_lower for sheets in sheets_by_beta]
        exemplar = sheets_by_beta[1][key]
        tubes.append(
            oracle.RootSheet(
                exemplar.kind,
                exemplar.lobe_index,
                exemplar.side,
                min(values) - inflation,
                max(values) + inflation,
            )
        )
    return tubes


def relevant_component(kind: str) -> tuple[str, int]:
    if kind == "self":
        return "tangent", 1
    if kind == "partner":
        return "tangent", -1
    if kind == "plus":
        return "planeNormal", -1
    if kind == "minus":
        return "planeNormal", 1
    raise ValueError(kind)


def target_projection_interval(kind: str, x_interval: Any) -> Any:
    if kind == "self":
        return mp.iv.sin(x_interval)
    if kind == "partner":
        return -mp.iv.sin(x_interval)
    if kind == "plus":
        return mp.iv.cos(x_interval)
    if kind == "minus":
        return -mp.iv.cos(x_interval)
    raise ValueError(kind)


def target_root_side_bound(
    oracle: Any,
    target: dict[str, Any],
    box_lower: mp.mpf,
    box_upper: mp.mpf,
    lobes_by_kind: dict[str, list[Any]],
    steps: int,
) -> dict[str, Any]:
    kind = target["kind"]
    lobe_index = int(target["lobeIndex"])
    fold_x_lower = mp.mpf(target["xLower"])
    fold_x_upper = mp.mpf(target["xUpper"])
    upper_target_sheets = [
        sheet
        for sheet in oracle.sheets_at_beta(box_upper, lobes_by_kind, steps)
        if sheet.kind == kind and sheet.lobe_index == lobe_index
    ]
    expected_count = 1 if kind == "self" and lobe_index == 0 else 2
    if len(upper_target_sheets) != expected_count:
        raise ValueError(
            f"expected {expected_count} born target roots, got "
            f"{len(upper_target_sheets)} for {(kind, lobe_index)}"
        )
    x_lower = mp.mpf("0") if expected_count == 1 else fold_x_lower
    x_upper = max(
        [fold_x_upper] + [sheet.x_upper for sheet in upper_target_sheets]
    )
    beta_interval = mp.iv.mpf([str(box_lower), str(box_upper)])
    x_interval = mp.iv.mpf([str(x_lower), str(x_upper)])
    hx = oracle.cp_value(kind, x_interval) - 2 * x_interval / (beta_interval**2)
    hx_lower, hx_upper = iv_bounds(hx)
    hx_max = max(abs(hx_lower), abs(hx_upper))
    if hx_max <= 0:
        raise ValueError("target H_x upper bound is not positive")
    if expected_count == 1:
        sinc_lower = 1 - (x_upper**2) / 6
        if sinc_lower <= 0:
            raise ValueError("self-boundary sinc lower bound failed")
        per_root_lower = (
            2 * box_lower * sinc_lower / (x_upper * hx_max)
        )
        projection_lower = sinc_lower
    else:
        projection = target_projection_interval(kind, x_interval)
        projection_lower, projection_upper = iv_bounds(projection)
        if projection_lower <= 0:
            raise ValueError(
                f"target projection sign is unresolved for {(kind, lobe_index)}: "
                f"[{projection_lower},{projection_upper}]"
            )
        per_root_lower = (
            2 * box_lower * projection_lower / ((x_upper**2) * hx_max)
        )
    combined_lower = expected_count * per_root_lower
    return {
        "bornRootCount": expected_count,
        "xHull": [token(x_lower, 70), token(x_upper, 70)],
        "projectionMagnitudeLowerBound": token(projection_lower, 40),
        "maximumAbsoluteH_xOverHull": token(hx_max, 40),
        "perRootContributionMagnitudeLowerBound": token(per_root_lower, 40),
        "combinedContributionMagnitudeLowerBound": token(combined_lower, 40),
        "combinedLowerMpf": combined_lower,
    }


def fold_differential_record(
    oracle: Any,
    target: dict[str, Any],
) -> dict[str, Any]:
    kind = target["kind"]
    x_interval = mp.iv.mpf([target["xLower"], target["xUpper"]])
    beta_interval = mp.iv.mpf([target["betaLower"], target["betaUpper"]])
    hxx = oracle.cpp_value(kind, x_interval) - 2 / (beta_interval**2)
    hxx_lower, hxx_upper = iv_bounds(hxx)
    if hxx_lower <= 0 <= hxx_upper:
        raise ValueError(f"H_xx does not exclude zero for {kind}")
    delay = x_interval / beta_interval
    g_tt = (beta_interval**3) * hxx / (2 * x_interval)
    g_tt_lower, g_tt_upper = iv_bounds(g_tt)
    if g_tt_lower <= 0 <= g_tt_upper:
        raise ValueError(f"g_tt does not exclude zero for {kind}")
    if kind in ("self", "partner"):
        classification = "persistent-circular-fold"
        d_r = "D_r=D_t=0 exactly by delay-only circular symmetry"
        exact_disposition = (
            "persistent D_t=0 interval; outside the canonical finite-impulse "
            "fold lemma and therefore not a balanced pointwise history"
        )
    else:
        classification = "transverse-cross-binary-fold"
        d_r = "D_r=1 exactly from F_phi and the fold equation"
        exact_disposition = (
            "nondegenerate transverse caustic; canonical acceleration has no "
            "finite pointwise value at the fold, while the born-pair limit "
            "diverges in one transverse component"
        )
    return {
        "classification": classification,
        "delay": iv_record(delay),
        "H_xx": iv_record(hxx),
        "g_TtTt": iv_record(g_tt),
        "receiverSideFactor": d_r,
        "exactFoldDisposition": exact_disposition,
    }


def build_receipt(
    protocol_path: Path,
    protocol_bytes: bytes,
    packet: dict[str, Any],
) -> dict[str, Any]:
    validate_protocol(packet, protocol_path)
    digits = int(packet["numerics"]["decimalDigits"])
    steps = int(packet["numerics"]["bisectionSteps"])
    inflation = mp.mpf(packet["numerics"]["rootTubeInflation"])
    minimum_margin = mp.mpf(packet["numerics"]["minimumDominanceMargin"])
    mp.mp.dps = digits + 30
    mp.iv.dps = digits

    frozen = packet["frozenInputs"]
    ordinary_path = REPO_ROOT / frozen["ordinaryCertificatePath"]
    ordinary = json.loads(ordinary_path.read_text(encoding="utf-8"))
    oracle_path = REPO_ROOT / frozen["ordinaryOraclePath"]
    oracle = load_frozen_oracle(oracle_path)
    oracle.mp.mp.dps = digits + 30
    oracle.mp.iv.dps = digits
    maximum_x = mp.mpf(ordinary["domain"]["dimensionlessEmissionAngle"][1])
    lobes_by_kind = {
        kind: oracle.find_lobes(kind, maximum_x, steps)
        for kind in oracle.KINDS
    }

    box_records = []
    unresolved = []
    classifications = {
        "coincident-self-boundary": 0,
        "persistent-circular-fold": 0,
        "transverse-cross-binary-fold": 0,
    }
    for box in ordinary["foldInventory"]["boxes"]:
        if len(box["folds"]) != 1:
            raise ValueError("v1 expects one isolated fold per box")
        target = box["folds"][0]
        kind = target["kind"]
        lobe_index = int(target["lobeIndex"])
        box_lower = mp.mpf(box["beta"][0])
        box_upper = mp.mpf(box["beta"][1])
        other_tubes = filtered_other_tubes(
            oracle,
            box_lower,
            box_upper,
            target,
            lobes_by_kind,
            steps,
            inflation,
        )
        tangent, normal, minimum_hx, minimum_dt = (
            oracle.interval_transverse_components(
                box_lower, box_upper, other_tubes
            )
        )
        component_name, sign = relevant_component(kind)
        other_component = tangent if component_name == "tangent" else normal
        other_lower, other_upper = iv_bounds(other_component)
        no_root_excludes = other_upper < 0 or other_lower > 0
        target_bound = target_root_side_bound(
            oracle,
            target,
            box_lower,
            box_upper,
            lobes_by_kind,
            steps,
        )
        target_lower = target_bound.pop("combinedLowerMpf")
        dominance_margin = (
            target_lower + other_lower
            if sign > 0
            else target_lower - other_upper
        )
        root_side_excludes = dominance_margin > minimum_margin

        if kind == "self" and lobe_index == 0:
            classification = "coincident-self-boundary"
            classifications[classification] += 1
            exact_disposition = {
                "classification": classification,
                "nontrivialSelfRootAtBetaOne": (
                    "absent exactly because 2-2*cos(x)<x^2 for x>0"
                ),
                "coincidentSelfRoot": "excluded by the canonical convention",
                "remainingComponent": iv_record(other_component),
                "remainingComponentExcludesZero": no_root_excludes,
            }
        else:
            exact_disposition = fold_differential_record(oracle, target)
            classification = exact_disposition["classification"]
            classifications[classification] += 1

        passed = no_root_excludes and root_side_excludes
        if not passed:
            unresolved.append(
                {
                    "kind": kind,
                    "lobeIndex": lobe_index,
                    "noRootSideExcludes": no_root_excludes,
                    "rootSideExcludes": root_side_excludes,
                }
            )
        box_records.append(
            {
                "kind": kind,
                "lobeIndex": lobe_index,
                "betaBox": box["beta"],
                "foldBetaEnclosure": [
                    target["betaLower"],
                    target["betaUpper"],
                ],
                "relevantComponent": component_name,
                "targetContributionSign": "positive" if sign > 0 else "negative",
                "otherRowsOverWholeBox": {
                    "componentInterval": iv_record(other_component),
                    "componentExcludesZeroOnNoRootSide": no_root_excludes,
                    "rootTubeCount": len(other_tubes) + 2,
                    "minimumAbsoluteH_x": token(minimum_hx, 40),
                    "minimumAbsoluteD_t": token(minimum_dt, 40),
                },
                "rootSideDominance": {
                    **target_bound,
                    "signedDominanceMargin": token(dominance_margin, 40),
                    "excludesBalance": root_side_excludes,
                },
                "exactFold": exact_disposition,
                "boxClosed": passed,
            }
        )

    ordinary_width = mp.mpf(
        ordinary["coverageAccounting"]["certifiedOrdinaryWidth"]
    )
    fold_width = mp.fsum(
        mp.mpf(box["betaBox"][1]) - mp.mpf(box["betaBox"][0])
        for box in box_records
    )
    domain_width = mp.mpf("12") - mp.mpf("0.25")
    coverage_residual = domain_width - ordinary_width - fold_width
    disposition = (
        "bounded no-balance theorem for the fixed-phase locus"
        if not unresolved
        else "unresolved fold boxes remain"
    )
    return {
        "schema": RECEIPT_SCHEMA,
        "date": "2026-08-29",
        "authority": "canonical fold-limit extension of a frozen independent ordinary certificate",
        "disposition": disposition,
        "logicalCertificate": {
            "ordinaryDomain": ordinary["disposition"],
            "foldBoxRule": (
                "Below each interior lobe minimum the target pair is absent "
                "and the remaining transverse sum excludes zero. Above it, "
                "the born pair has a same-signed transverse contribution "
                "whose certified lower bound dominates every other row."
            ),
            "exactFoldRule": (
                "Persistent D_t=0 circular folds fail the canonical chart; "
                "transverse folds have no finite pointwise acceleration; the "
                "beta_f=1 coincident root is excluded and its remaining "
                "ordinary tangent sum is nonzero."
            ),
            "conclusion": (
                "No beta_f in [0.25,12] satisfies every-phase pointwise "
                "Master Equation acceleration balance on the fixed relative-"
                "phase orthogonal-plane history."
            ),
        },
        "domain": packet["domain"],
        "modelScope": packet["claimBoundary"],
        "provenance": {
            "protocolPath": protocol_path.relative_to(REPO_ROOT).as_posix(),
            "protocolSha256": sha256_bytes(protocol_bytes),
            "certificatePath": Path(__file__).relative_to(REPO_ROOT).as_posix(),
            "certificateSha256": sha256_bytes(Path(__file__).read_bytes()),
            "frozenInputs": frozen,
            "mpmathVersion": mp.__version__,
            "decimalDigits": digits,
            "reproductionCommand": (
                'VIRTUAL_ENV="${AAA_VENV:-../.venv}" '
                '"${AAA_VENV:-../.venv}/bin/python" '
                "scripts/prescribed-path-analysis/oracle/"
                "orthogonal_plane_weave_fold_limit_certificate.py "
                "--write-receipt reference/priorities/braid-program/evidence/"
                "2026-08-29-orthogonal-plane-weave-fold-limiting-exclusion.v1.json"
            ),
        },
        "canonicalFoldLaw": packet["canonicalFoldLaw"],
        "analyticalReduction": packet["analyticalReduction"],
        "classificationCounts": classifications,
        "foldBoxCount": len(box_records),
        "closedFoldBoxCount": sum(row["boxClosed"] for row in box_records),
        "unresolvedFoldBoxes": unresolved,
        "foldBoxes": box_records,
        "coverageAccounting": {
            "domainWidth": token(domain_width),
            "priorCertifiedOrdinaryWidth": token(ordinary_width),
            "closedFoldBoxWidth": token(fold_width),
            "accountedWidth": token(ordinary_width + fold_width),
            "accountingResidual": token(coverage_residual, 40),
        },
        "claimGrades": {
            "canonicalFoldRouting": "derived in the frozen Master Equation",
            "foldClassification": "derived from exact circular and cross-phase identities",
            "boxExclusion": "measured by directed interval arithmetic with analytical dominance bounds",
            "boundedFixedLocusConclusion": "derived from the ordinary and fold-box partition",
        },
        "falsifiers": packet["falsifiers"],
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--protocol", type=Path, default=DEFAULT_PROTOCOL)
    parser.add_argument("--write-receipt", type=Path, default=DEFAULT_RECEIPT)
    parser.add_argument("--stdout", action="store_true")
    args = parser.parse_args()
    protocol_path = args.protocol.resolve()
    protocol_bytes = protocol_path.read_bytes()
    packet = json.loads(protocol_bytes)
    receipt = build_receipt(protocol_path, protocol_bytes, packet)
    rendered = json.dumps(receipt, ensure_ascii=False, indent=2) + "\n"
    if args.stdout:
        print(rendered, end="")
    else:
        args.write_receipt.write_text(rendered, encoding="utf-8")


if __name__ == "__main__":
    main()
