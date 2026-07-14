from __future__ import annotations

import json
import subprocess
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class NativeBorgProcessTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls._temporary = tempfile.TemporaryDirectory(prefix="eom-borg-process-")
        cls.build = Path(cls._temporary.name)
        subprocess.run(
            [
                "cmake",
                "-S",
                str(ROOT / "src/eom"),
                "-B",
                str(cls.build),
                "-DCMAKE_BUILD_TYPE=Release",
            ],
            check=True,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        subprocess.run(
            ["cmake", "--build", str(cls.build), "--parallel", "4"],
            check=True,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        cls.binary = cls.build / "eom_borg_shadow_cli"

    @classmethod
    def tearDownClass(cls) -> None:
        cls._temporary.cleanup()

    def test_native_process_extends_continuous_history_and_returns_only_published_segments(self) -> None:
        protocol = "\n".join(
            (
                "EOM_BORG_NATIVE_V0",
                "\t".join(
                    (
                        "RUN",
                        "native-process-static",
                        "2",
                        "2.1",
                        "0.1",
                        "0.1",
                        "1",
                        "1",
                        "1e-10",
                        "1e-8",
                        "1e-8",
                        "1e-8",
                        "1e-8",
                        "2",
                        "1",
                    )
                ),
                "PATH\tp\t1\t1\t1",
                "SEG\t0\t2\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0",
                "END",
                "",
            )
        )
        completed = subprocess.run(
            [str(self.binary), "borg-shadow-v0"],
            input=protocol,
            check=True,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        response = json.loads(completed.stdout)
        self.assertEqual(response["schema"], "eom_borg_native_response/v0")
        self.assertEqual(response["status"], "completed")
        self.assertEqual(response["evidenceStatus"], "executable_architecture_evidence")
        self.assertEqual(response["acceptedEndTime"], "2.1000000000000001")
        self.assertEqual(response["acceptedStepCount"], 1)
        self.assertEqual(response["rejectedStepCount"], 0)
        self.assertEqual(response["haltCode"], "")
        self.assertEqual(response["publishedExtensions"][0]["pathId"], "p")
        self.assertGreater(
            len(response["publishedExtensions"][0]["segments"]), 0
        )

    def test_native_process_rejects_state_only_and_malformed_protocol_inputs(self) -> None:
        completed = subprocess.run(
            [str(self.binary), "borg-shadow-v0"],
            input="EOM_BORG_NATIVE_V0\nRUN\tbad\n",
            check=False,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        self.assertNotEqual(completed.returncode, 0)
        self.assertIn("invalid RUN record", completed.stderr)


if __name__ == "__main__":
    unittest.main()
