from __future__ import annotations

import hashlib
import importlib.util
import json
import sys
import unittest
from decimal import Decimal, getcontext
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
ORACLE_PATH = (
    REPO_ROOT
    / "scripts/prescribed-path-analysis/oracle/"
    "orthogonal_plane_weave_interval_oracle.py"
)
PROTOCOL_PATH = (
    REPO_ROOT
    / "src/prescribed-path-analysis/protocols/"
    "orthogonal-plane-weave-fold-separated-interval-protocol.v1.json"
)
RECEIPT_PATH = (
    REPO_ROOT
    / "reference/priorities/braid-program/evidence/"
    "2026-08-29-orthogonal-plane-weave-fold-separated-interval.v1.json"
)
FROZEN_RECEIPT_PATH = (
    REPO_ROOT
    / "reference/priorities/braid-program/evidence/"
    "2026-08-29-orthogonal-plane-weave-complete-cycle.receipt.v1.json"
)


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


class OrthogonalPlaneWeaveIntervalOracleTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        getcontext().prec = 120
        cls.protocol = json.loads(PROTOCOL_PATH.read_text(encoding="utf-8"))
        cls.receipt = json.loads(RECEIPT_PATH.read_text(encoding="utf-8"))
        cls.frozen_receipt = json.loads(
            FROZEN_RECEIPT_PATH.read_text(encoding="utf-8")
        )
        spec = importlib.util.spec_from_file_location(
            "orthogonal_plane_weave_interval_oracle", ORACLE_PATH
        )
        assert spec is not None and spec.loader is not None
        cls.oracle = importlib.util.module_from_spec(spec)
        sys.modules[spec.name] = cls.oracle
        spec.loader.exec_module(cls.oracle)
        cls.oracle.mp.mp.dps = 110
        cls.oracle.mp.iv.dps = 80

    def test_oracle_is_bound_to_frozen_subject_without_importing_it(self) -> None:
        provenance = self.receipt["provenance"]
        self.assertEqual(provenance["protocolSha256"], sha256(PROTOCOL_PATH))
        self.assertEqual(provenance["oracleSha256"], sha256(ORACLE_PATH))
        frozen = provenance["frozenSubject"]
        self.assertEqual(frozen["sha256"], sha256(REPO_ROOT / frozen["path"]))
        self.assertEqual(
            frozen["evidencePath"],
            self.frozen_receipt["rawArtifact"]["historicalRepositoryPath"],
        )
        self.assertEqual(
            frozen["evidenceSha256"],
            self.frozen_receipt["rawArtifact"]["sha256"],
        )
        source = ORACLE_PATH.read_text(encoding="utf-8")
        self.assertNotIn("OrthogonalPlaneWeaveBalance", source)
        self.assertNotIn("analyze-circular-self-hit-binary", source)

    def test_fold_brackets_are_complete_ordered_and_sign_changing(self) -> None:
        folds = [
            fold
            for box in self.receipt["foldInventory"]["boxes"]
            for fold in box["folds"]
        ]
        self.assertEqual(len(folds), 14)
        self.assertEqual(
            [fold["kind"] for fold in folds],
            [
                "self",
                "minus",
                "partner",
                "plus",
                "self",
                "minus",
                "partner",
                "plus",
                "self",
                "minus",
                "partner",
                "plus",
                "self",
                "minus",
            ],
        )
        for fold in folds[1:]:
            lower = self.oracle.mp.mpf(fold["xLower"])
            upper = self.oracle.mp.mpf(fold["xUpper"])
            self.assertLess(lower, upper)
            lower_value = self.oracle.fold_value(fold["kind"], lower)
            upper_value = self.oracle.fold_value(fold["kind"], upper)
            self.assertLessEqual(lower_value * upper_value, 0)
            self.assertLess(
                Decimal(fold["betaLower"]), Decimal(fold["betaUpper"])
            )

    def test_ordinary_cells_and_fold_boxes_partition_full_beta_domain(self) -> None:
        ordinary = self.receipt["ordinaryCertificate"]
        self.assertEqual(ordinary["candidateOrUnresolvedOrdinaryCellCount"], 0)
        self.assertEqual(ordinary["certifiedCellCount"], 497)
        segments = [
            (Decimal(row["beta"][0]), Decimal(row["beta"][1]), "ordinary")
            for row in ordinary["certifiedCells"]
        ]
        segments.extend(
            (Decimal(box["beta"][0]), Decimal(box["beta"][1]), "fold")
            for box in self.receipt["foldInventory"]["boxes"]
        )
        segments.sort()
        self.assertEqual(segments[0][0], Decimal("0.25"))
        self.assertEqual(segments[-1][1], Decimal("12"))
        for left, right in zip(segments, segments[1:]):
            self.assertEqual(left[1], right[0])
        accounting = self.receipt["coverageAccounting"]
        self.assertLess(abs(Decimal(accounting["accountingResidual"])), Decimal("1e-100"))

    def test_every_ordinary_cell_has_a_nonzero_transverse_witness(self) -> None:
        for row in self.receipt["ordinaryCertificate"]["certifiedCells"]:
            witness = row["tangent"] if row["witness"] == "tangent" else row["planeNormal"]
            lower = Decimal(witness["lower"])
            upper = Decimal(witness["upper"])
            self.assertTrue(upper < 0 or lower > 0)
            self.assertGreater(row["rootTubeCount"], 0)
            self.assertGreater(Decimal(row["minimumAbsoluteH_x"]), 0)
            self.assertGreater(Decimal(row["minimumAbsoluteD_t"]), 0)

    def test_independent_seed_control_agrees_with_frozen_subject(self) -> None:
        seed = next(
            row
            for row in self.receipt["pointControls"]
            if row["beta"].startswith("3.070356625390253")
        )
        subject = self.frozen_receipt["frozenControls"][
            "seedPhaseZeroReceiverA1Plus"
        ]
        self.assertEqual(seed["rootCount"], 10)
        self.assertLess(
            abs(Decimal(seed["tangent"]) - Decimal(str(subject["tangent"]))),
            Decimal("5e-11"),
        )
        self.assertLess(
            abs(
                Decimal(seed["planeNormal"])
                - Decimal(str(subject["planeNormal"]))
            ),
            Decimal("5e-11"),
        )
        self.assertLess(
            Decimal(
                self.receipt["rootCertification"]
                ["maximumPointControlAbsoluteRootResidual"]
            ),
            Decimal("1e-50"),
        )

    def test_claim_boundary_stays_narrow(self) -> None:
        scope = self.receipt["modelScope"]
        self.assertEqual(scope["model"], "default uncapped canonical Master Equation")
        self.assertFalse(scope["fieldSpeedCeilingApplied"])
        exclusions = set(scope["doesNotEstablish"])
        self.assertTrue({"retention", "stability", "any N>3 braid family"} <= exclusions)
        self.assertEqual(
            self.receipt["disposition"],
            "ordinary domain excluded with explicit unresolved fold boxes",
        )


if __name__ == "__main__":
    unittest.main()
