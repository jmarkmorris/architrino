#!/usr/bin/env python3
from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]
NODE_RENDER_SCRIPT = REPO_ROOT / "scripts" / "pdgedit" / "render-reference-svg.mjs"
NODE_CONTACT_SHEET_SCRIPT = REPO_ROOT / "scripts" / "export-pdgedit-review.mjs"
DEFAULT_SPEC_JSON = REPO_ROOT / "src" / "apps" / "pdgedit" / "pdgedit-tiles.json"
DEFAULT_GROUP_SPEC_JSON = REPO_ROOT / "src" / "apps" / "pdgedit" / "pdgedit-review-groups.json"
DEFAULT_OUTPUT_DIR = Path(__file__).resolve().parent


def run_command(argv: list[str], *, capture_stdout: bool = False) -> int:
    completed = subprocess.run(
        argv,
        cwd=REPO_ROOT,
        text=True,
        capture_output=capture_stdout,
    )
    if capture_stdout and completed.stdout:
        sys.stdout.write(completed.stdout)
    if completed.stderr:
        sys.stderr.write(completed.stderr)
    return completed.returncode


def build_batch_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Generate JS-rendered pdgedit reference SVG files from the shared JSON catalogs."
    )
    parser.add_argument(
        "--spec-json",
        default=str(DEFAULT_SPEC_JSON),
        help="Shared pdgedit tile JSON catalog. Defaults to src/apps/pdgedit/pdgedit-tiles.json.",
    )
    parser.add_argument(
        "--output-dir",
        default=str(DEFAULT_OUTPUT_DIR),
        help="Directory for generated SVG files. Defaults to the glyph.py directory.",
    )
    parser.add_argument(
        "--output-prefix",
        default="pdgedit-tile-",
        help="Filename prefix for generated SVG files. Defaults to pdgedit-tile-.",
    )
    parser.add_argument(
        "--group-spec-json",
        default=str(DEFAULT_GROUP_SPEC_JSON),
        help="Shared pdgedit review-group JSON catalog. Defaults to src/apps/pdgedit/pdgedit-review-groups.json.",
    )
    parser.add_argument(
        "--group-output-prefix",
        default="pdgedit-group-",
        help="Filename prefix for generated pdgedit group SVG files. Defaults to pdgedit-group-.",
    )
    parser.add_argument(
        "--top-count",
        default="N",
        help="Replacement text for N count placeholders. Defaults to N.",
    )
    parser.add_argument(
        "--bottom-count",
        default="M",
        help="Replacement text for M count placeholders. Defaults to M.",
    )
    return parser


def build_single_parser(kind: str) -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description=f"Render one JS-backed pdgedit {kind} reference SVG."
    )
    parser.add_argument("key", help=f"pdgedit {kind} key to render.")
    parser.add_argument(
        "--spec-json",
        default=str(DEFAULT_SPEC_JSON),
        help="Shared pdgedit tile JSON catalog.",
    )
    parser.add_argument(
        "--group-spec-json",
        default=str(DEFAULT_GROUP_SPEC_JSON),
        help="Shared pdgedit review-group JSON catalog.",
    )
    parser.add_argument(
        "--output-dir",
        default=str(DEFAULT_OUTPUT_DIR),
        help="Directory for default output files.",
    )
    parser.add_argument(
        "--output",
        help="Output file path. Defaults to the glyph.py directory with the standard prefix.",
    )
    parser.add_argument(
        "--stdout",
        action="store_true",
        help="Write the rendered SVG to stdout instead of a file.",
    )
    parser.add_argument(
        "--top-count",
        default="N",
        help="Replacement text for N count placeholders. Defaults to N.",
    )
    parser.add_argument(
        "--bottom-count",
        default="M",
        help="Replacement text for M count placeholders. Defaults to M.",
    )
    return parser


def run_batch(argv: list[str]) -> int:
    args = build_batch_parser().parse_args(argv)
    return run_command(
        [
            "node",
            str(NODE_RENDER_SCRIPT),
            "--spec-json",
            str(Path(args.spec_json).resolve()),
            "--group-spec-json",
            str(Path(args.group_spec_json).resolve()),
            "--output-dir",
            str(Path(args.output_dir).resolve()),
            "--output-prefix",
            args.output_prefix,
            "--group-output-prefix",
            args.group_output_prefix,
            "--top-count",
            args.top_count,
            "--bottom-count",
            args.bottom_count,
        ]
    )


def run_single(kind: str, argv: list[str]) -> int:
    args = build_single_parser(kind).parse_args(argv)
    command = [
        "node",
        str(NODE_RENDER_SCRIPT),
        "--spec-json",
        str(Path(args.spec_json).resolve()),
        "--group-spec-json",
        str(Path(args.group_spec_json).resolve()),
        "--output-dir",
        str(Path(args.output_dir).resolve()),
        "--top-count",
        args.top_count,
        "--bottom-count",
        args.bottom_count,
    ]
    command.extend(["--tile-key" if kind == "tile" else "--group-key", args.key])
    if args.output:
        command.extend(["--output", str(Path(args.output).resolve())])
    if args.stdout:
        command.append("--stdout")
    return run_command(command, capture_stdout=args.stdout)


def run_contact_sheet(argv: list[str]) -> int:
    return run_command(["node", str(NODE_CONTACT_SHEET_SCRIPT), *argv])


def main(argv: list[str] | None = None) -> int:
    argv = list(sys.argv[1:] if argv is None else argv)
    if argv:
        subcommand = argv[0]
        if subcommand == "tile":
            return run_single("tile", argv[1:])
        if subcommand == "group":
            return run_single("group", argv[1:])
        if subcommand == "contact-sheet":
            return run_contact_sheet(argv[1:])
    return run_batch(argv)


if __name__ == "__main__":
    raise SystemExit(main())
