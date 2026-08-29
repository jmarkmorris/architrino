from __future__ import annotations

import hashlib
import json
import subprocess
import tempfile
import unittest
from decimal import Decimal, getcontext
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
PROTOCOL_PATH = (
    REPO_ROOT
    / "src/prescribed-path-analysis/protocols/"
    "orthogonal-plane-weave-fold-limiting-exclusion-protocol.v1.json"
)
CERTIFICATE_PATH = (
    REPO_ROOT
    / "scripts/prescribed-path-analysis/oracle/"
    "orthogonal_plane_weave_fold_limit_certificate.py"
)
RECEIPT_PATH = (
    REPO_ROOT
    / "reference/priorities/braid-program/evidence/"
    "2026-08-29-orthogonal-plane-weave-fold-limiting-exclusion.v1.json"
)


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


class OrthogonalPlaneWeaveFoldLimitCertificateTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        getcontext().prec = 120
        cls.protocol = json.loads(PROTOCOL_PATH.read_text(encoding="utf-8"))
        cls.receipt = json.loads(RECEIPT_PATH.read_text(encoding="utf-8"))

    def test_frozen_inputs_and_extension_provenance_match(self) -> None:
        provenance = self.receipt["provenance"]
        self.assertEqual(provenance["protocolSha256"], sha256(PROTOCOL_PATH))
        self.assertEqual(
            provenance["certificateSha256"], sha256(CERTIFICATE_PATH)
        )
        for key in (
            "ordinaryCertificate",
            "ordinaryOracle",
            "masterEquation",
            "sixWorldlineSubject",
        ):
            path = REPO_ROOT / provenance["frozenInputs"][f"{key}Path"]
            self.assertEqual(
                provenance["frozenInputs"][f"{key}Sha256"], sha256(path)
            )

    def test_all_fourteen_boxes_are_closed_by_the_declared_partition(self) -> None:
        self.assertEqual(
            self.receipt["classificationCounts"],
            {
                "coincident-self-boundary": 1,
                "persistent-circular-fold": 6,
                "transverse-cross-binary-fold": 7,
            },
        )
        self.assertEqual(self.receipt["foldBoxCount"], 14)
        self.assertEqual(self.receipt["closedFoldBoxCount"], 14)
        self.assertEqual(self.receipt["unresolvedFoldBoxes"], [])
        self.assertEqual(
            self.receipt["disposition"],
            "bounded no-balance theorem for the fixed-phase locus",
        )

    def test_each_box_has_no_root_exclusion_and_root_side_dominance(self) -> None:
        for row in self.receipt["foldBoxes"]:
            other = row["otherRowsOverWholeBox"]
            interval = other["componentInterval"]
            lower = Decimal(interval["lower"])
            upper = Decimal(interval["upper"])
            self.assertTrue(upper < 0 or lower > 0)
            self.assertTrue(other["componentExcludesZeroOnNoRootSide"])
            self.assertGreater(Decimal(other["minimumAbsoluteH_x"]), 0)
            self.assertGreater(Decimal(other["minimumAbsoluteD_t"]), 0)
            dominance = row["rootSideDominance"]
            self.assertGreater(
                Decimal(dominance["combinedContributionMagnitudeLowerBound"]),
                0,
            )
            self.assertGreater(Decimal(dominance["signedDominanceMargin"]), 0)
            self.assertTrue(dominance["excludesBalance"])
            self.assertTrue(row["boxClosed"])

    def test_interior_folds_are_nondegenerate_and_correctly_routed(self) -> None:
        for row in self.receipt["foldBoxes"]:
            exact = row["exactFold"]
            if exact["classification"] == "coincident-self-boundary":
                interval = exact["remainingComponent"]
                self.assertGreater(Decimal(interval["lower"]), 0)
                self.assertTrue(exact["remainingComponentExcludesZero"])
                continue
            for field in ("H_xx", "g_TtTt"):
                interval = exact[field]
                lower = Decimal(interval["lower"])
                upper = Decimal(interval["upper"])
                self.assertTrue(upper < 0 or lower > 0)
            if exact["classification"] == "persistent-circular-fold":
                self.assertIn("D_r=D_t=0 exactly", exact["receiverSideFactor"])
            else:
                self.assertIn("D_r=1 exactly", exact["receiverSideFactor"])

    def test_ordinary_and_fold_widths_cover_the_declared_domain(self) -> None:
        coverage = self.receipt["coverageAccounting"]
        self.assertEqual(Decimal(coverage["domainWidth"]), Decimal("11.75"))
        self.assertEqual(
            Decimal(coverage["priorCertifiedOrdinaryWidth"])
            + Decimal(coverage["closedFoldBoxWidth"]),
            Decimal(coverage["domainWidth"]),
        )
        self.assertLess(
            abs(Decimal(coverage["accountingResidual"])), Decimal("1e-100")
        )

    def test_receipt_reproduces_byte_for_byte(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "receipt.json"
            subprocess.run(
                [
                    str(REPO_ROOT.parent / ".venv/bin/python"),
                    str(CERTIFICATE_PATH),
                    "--write-receipt",
                    str(output),
                ],
                cwd=REPO_ROOT,
                check=True,
            )
            self.assertEqual(output.read_bytes(), RECEIPT_PATH.read_bytes())

    def test_claim_boundary_does_not_escape_the_fixed_locus(self) -> None:
        scope = self.receipt["modelScope"]
        self.assertTrue(scope["doesNotDefineNewFoldLaw"])
        self.assertFalse(scope["fieldSpeedCeilingApplied"])
        exclusions = set(scope["doesNotEstablish"])
        self.assertTrue(
            {
                "retention",
                "stability",
                "failure of other relative phasings",
                "any N>3 braid family",
            }
            <= exclusions
        )


if __name__ == "__main__":
    unittest.main()
