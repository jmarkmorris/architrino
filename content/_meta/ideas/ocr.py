#!/usr/bin/env python3
"""OCR a PDF by rasterizing pages with Ghostscript and reading them with Tesseract."""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


def require_binary(name: str) -> str:
    path = shutil.which(name)
    if not path:
        raise SystemExit(f"Missing required binary: {name}")
    return path


def render_pdf_to_pngs(pdf_path: Path, output_dir: Path, gs_path: str, dpi: int) -> list[Path]:
    pattern = output_dir / "page-%04d.png"
    cmd = [
        gs_path,
        "-q",
        "-dSAFER",
        "-dBATCH",
        "-dNOPAUSE",
        "-sDEVICE=pnggray",
        f"-r{dpi}",
        f"-sOutputFile={pattern}",
        str(pdf_path),
    ]
    subprocess.run(cmd, check=True)
    pages = sorted(output_dir.glob("page-*.png"))
    if not pages:
        raise SystemExit("Ghostscript did not produce any page images.")
    return pages


def ocr_page(image_path: Path, tesseract_path: str, language: str, psm: int) -> str:
    cmd = [
        tesseract_path,
        str(image_path),
        "stdout",
        "-l",
        language,
        "--psm",
        str(psm),
    ]
    result = subprocess.run(cmd, check=True, capture_output=True, text=True)
    return result.stdout.strip()


def main() -> int:
    parser = argparse.ArgumentParser(description="OCR a PDF using Ghostscript + Tesseract.")
    parser.add_argument("pdf", help="Path to the PDF file to OCR.")
    parser.add_argument(
        "-o",
        "--output",
        help="Optional path for the OCR text output. Defaults to stdout.",
    )
    parser.add_argument(
        "--dpi",
        type=int,
        default=300,
        help="Rasterization DPI for Ghostscript. Default: 300.",
    )
    parser.add_argument(
        "--lang",
        default="eng",
        help="Tesseract language code. Default: eng.",
    )
    parser.add_argument(
        "--psm",
        type=int,
        default=3,
        help="Tesseract page segmentation mode. Default: 3.",
    )
    args = parser.parse_args()

    pdf_path = Path(args.pdf).expanduser().resolve()
    if not pdf_path.is_file():
        raise SystemExit(f"PDF not found: {pdf_path}")

    tesseract_path = require_binary("tesseract")
    gs_path = require_binary("gs")

    with tempfile.TemporaryDirectory(prefix="ocr-pdf-") as tmpdir:
        tmp_path = Path(tmpdir)
        pages = render_pdf_to_pngs(pdf_path, tmp_path, gs_path, args.dpi)

        chunks: list[str] = []
        for index, page in enumerate(pages, start=1):
            text = ocr_page(page, tesseract_path, args.lang, args.psm)
            chunks.append(f"--- Page {index} ---\n{text}".rstrip())

    output_text = "\n\n".join(chunks).strip() + "\n"

    if args.output:
        output_path = Path(args.output).expanduser().resolve()
        output_path.write_text(output_text, encoding="utf-8")
    else:
        sys.stdout.write(output_text)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
