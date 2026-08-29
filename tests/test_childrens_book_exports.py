"""Pilot source preservation and export-failure regressions; no routine book build."""

import contextlib
import copy
import io
import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from PIL import Image
from pypdf import PdfReader, PdfWriter

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "reference/learning-office/childrens-books/tools"))
import build_generation_manifest as manifest_builder
import build_review_bundle as review
import pilot_appearance as appearance
import render_book_pages as renderer


class ChildrensBookExportsTest(unittest.TestCase):
    def setUp(self):
        self.addCleanup(setattr, renderer, "PAGE_FONT", appearance.PAGE_FONT)

    @classmethod
    def setUpClass(cls):
        cls.manifest = manifest_builder.checked_manifest()
        cls.baseline = json.loads(appearance.BASELINE.read_text())
        cls.entry = cls.manifest["entries"][0]

    def test_all_sources_and_text_match_frozen_pilot(self):
        self.assertEqual(111, len(self.manifest["entries"]))
        self.assertEqual(8, len(self.manifest["books"]))
        self.assertEqual(set(self.baseline["entries"]), {e["id"] for e in self.manifest["entries"]})
        appearance.verify_sources(self.manifest["entries"], self.baseline)

    def test_export_status_does_not_depend_on_local_files(self):
        paths = self.entry["paths"]
        with patch.object(Path, "exists", return_value=False):
            result = manifest_builder.status_for(paths)
        for key in ("page_layout", "derivative_4x5", "derivative_9x16"):
            self.assertEqual(result[key], "on_demand")

    def test_default_check_needs_no_exports_or_fonts_and_never_renders(self):
        with tempfile.TemporaryDirectory() as temp:
            with patch.object(renderer, "EXPORT_ROOT", Path(temp) / "absent"), \
                 patch.object(renderer, "render_book") as render, \
                 patch.object(renderer, "verify_exports") as verify, \
                 patch.object(sys, "argv", ["export", "--book", self.entry["book_slug"], "--font", "missing.ttf"]), \
                 contextlib.redirect_stdout(io.StringIO()):
                renderer.main()
                render.assert_not_called()
                verify.assert_not_called()
                self.assertFalse((Path(temp) / "absent").exists())

    def test_unknown_book_fails(self):
        with patch.object(sys, "argv", ["export", "--book", "../escape"]):
            with self.assertRaises(SystemExit):
                renderer.main()

    def test_missing_original_fails_before_rendering(self):
        manifest = copy.deepcopy(self.manifest)
        manifest["entries"][0]["paths"]["source_png"] = "missing-pilot-source.png"
        with patch.object(renderer, "checked_manifest", return_value=manifest), \
             patch.object(renderer, "render_book") as render, \
             patch.object(sys, "argv", ["export", "--all", "--write"]):
            with self.assertRaises(FileNotFoundError):
                renderer.main()
            render.assert_not_called()

    def test_changed_story_text_is_not_silently_blessed(self):
        entry = copy.deepcopy(self.entry)
        entry["story_text"] = "Changed text"
        with self.assertRaisesRegex(ValueError, "source/text changed"):
            appearance.verify_sources([entry], self.baseline)

    def test_changed_original_is_not_silently_blessed(self):
        with tempfile.TemporaryDirectory() as temp:
            source = Path(temp) / "source.png"
            Image.new("RGB", (8, 8), "red").save(source)
            entry = copy.deepcopy(self.entry)
            entry["paths"]["source_png"] = str(source)
            with self.assertRaisesRegex(ValueError, "source/text changed"):
                appearance.verify_sources([entry], self.baseline)

    def test_missing_or_substitute_font_fails(self):
        with tempfile.TemporaryDirectory() as temp:
            missing = Path(temp) / "missing.ttf"
            with self.assertRaisesRegex(ValueError, "no font substitution"):
                appearance.require_font(missing, "page", self.baseline)
            missing.write_bytes(b"substitute font")
            with self.assertRaisesRegex(ValueError, "no font substitution"):
                appearance.require_font(missing, "page", self.baseline)

    def test_write_rejects_missing_font_before_rendering(self):
        with patch.object(renderer, "render_book") as render, \
             patch.object(sys, "argv", ["export", "--book", self.entry["book_slug"], "--write", "--font", "missing.ttf"]):
            with self.assertRaisesRegex(ValueError, "font required"):
                renderer.main()
            render.assert_not_called()

    def test_manifest_rejects_old_or_tampered_export_paths(self):
        stored = copy.deepcopy(self.manifest)
        stored["entries"][0]["paths"]["page_landscape_png"] = "content/unwanted.png"
        with tempfile.TemporaryDirectory() as temp:
            path = Path(temp) / "manifest.json"
            path.write_text(json.dumps(stored))
            with patch.object(manifest_builder, "OUT", path):
                with self.assertRaisesRegex(ValueError, "manifest drift"):
                    manifest_builder.checked_manifest()

    def test_export_root_symlink_fails_before_rendering(self):
        with tempfile.TemporaryDirectory() as temp:
            directory = Path(temp)
            target = directory / "outside"
            target.mkdir()
            link = directory / "exports"
            link.symlink_to(target, target_is_directory=True)
            with patch.object(renderer, "EXPORT_ROOT", link), \
                 patch.object(renderer, "require_font", return_value=Path("unused.ttf")), \
                 patch.object(renderer, "render_book") as render, \
                 patch.object(sys, "argv", ["export", "--book", self.entry["book_slug"], "--write"]):
                with self.assertRaisesRegex(ValueError, "symlink"):
                    renderer.main()
                render.assert_not_called()
                self.assertEqual([], list(target.iterdir()))

    def test_png_signature_detects_pixel_changes(self):
        with tempfile.TemporaryDirectory() as temp:
            path = Path(temp) / "image.png"
            Image.new("RGB", (20, 10), "white").save(path)
            before = appearance.image_signature(path)
            Image.new("RGB", (20, 10), "purple").save(path)
            self.assertNotEqual(before, appearance.image_signature(path))

    def test_pdf_comparison_ignores_dates_but_detects_page_order(self):
        with tempfile.TemporaryDirectory() as temp:
            red, blue = Image.new("RGB", (20, 10), "red"), Image.new("RGB", (20, 10), "blue")
            a, b, c = [Path(temp) / f"{name}.pdf" for name in "abc"]
            red.save(a, save_all=True, append_images=[blue], creationDate="D:20260101000000Z")
            red.save(b, save_all=True, append_images=[blue], creationDate="D:20260102000000Z")
            blue.save(c, save_all=True, append_images=[red])
            self.assertEqual(appearance.pdf_signature(a), appearance.pdf_signature(b))
            self.assertNotEqual(appearance.pdf_signature(a), appearance.pdf_signature(c))

    def test_broken_review_link_fails(self):
        with tempfile.TemporaryDirectory() as temp:
            pdf = Path(temp) / "book.pdf"
            directory = Path(temp) / "review"
            directory.mkdir()
            (directory / "index.html").write_text('<a href="../missing.pdf">PDF</a>')
            with patch.object(review, "pdf_path", return_value=pdf):
                with self.assertRaisesRegex(ValueError, "missing local review target"):
                    review.verify_review("book")

    def test_pdf_rotation_is_not_ignored_as_metadata(self):
        with tempfile.TemporaryDirectory() as temp:
            original, rotated = Path(temp) / "original.pdf", Path(temp) / "rotated.pdf"
            Image.new("RGB", (20, 10), "red").save(original)
            writer = PdfWriter()
            writer.add_page(PdfReader(original).pages[0].rotate(90))
            writer.write(rotated)
            with self.assertRaisesRegex(ValueError, "rotation or crop"):
                appearance.pdf_signature(rotated)


if __name__ == "__main__":
    unittest.main()
