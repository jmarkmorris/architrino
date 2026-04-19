#!/usr/bin/env python3
"""Regenerate the live PDG tool and report artifacts in one pass.

This script is intentionally separate from the canonical five-command
``pdgfeed.py`` CLI. It owns the local development/publish refresh path for the
generated PDG artifacts that feed the reports and the live ``pdgedit`` picker.
"""

from __future__ import annotations

import argparse
import shutil
import sys
from pathlib import Path
from typing import Any


REPO_ROOT = Path(__file__).resolve().parents[2]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from scripts.pdg import pdgfeed_runtime, pdgsolve
from scripts.pdg.pdgfeed_model import DEFAULT_SUPPORTED_REACTION_CSV


DEFAULT_SOURCE = "pdg-reactions"
DEFAULT_PDG_LIVE_MANIFEST_PATH = pdgsolve.DEFAULT_TMP_DIR / "manifest.v1.json"


def remove_path(path: Path) -> None:
    if path.exists():
        path.unlink()


def clear_live_pdg_artifacts(
    *,
    source: str = DEFAULT_SOURCE,
    pdgsolve_tmp_dir: Path = pdgsolve.DEFAULT_TMP_DIR,
    supported_csv_path: Path = DEFAULT_SUPPORTED_REACTION_CSV,
    list_report_path: Path | None = None,
    supported_report_path: Path | None = None,
    summary_report_path: Path | None = None,
) -> None:
    shutil.rmtree(pdgsolve_tmp_dir, ignore_errors=True)
    remove_path(list_report_path or pdgfeed_runtime.list_markdown_output_path(source))
    remove_path(supported_report_path or pdgfeed_runtime.supported_markdown_output_path(source))
    remove_path(summary_report_path or pdgfeed_runtime.summary_markdown_output_path(source))
    remove_path(supported_csv_path)


def refresh_live_pdg_artifacts(
    database_url: str | None = None,
    *,
    source: str = DEFAULT_SOURCE,
    api: Any | None = None,
    pdgsolve_tmp_dir: Path = pdgsolve.DEFAULT_TMP_DIR,
    live_manifest_path: Path = DEFAULT_PDG_LIVE_MANIFEST_PATH,
    result_corpus_output_dir: Path | None = None,
    result_corpus_index_path: Path | None = None,
    pdgedit_output_dir: Path | None = None,
    pdgedit_manifest_path: Path | None = None,
    supported_csv_path: Path = DEFAULT_SUPPORTED_REACTION_CSV,
    list_report_path: Path | None = None,
    supported_report_path: Path | None = None,
    summary_report_path: Path | None = None,
) -> dict[str, Path]:
    if source != DEFAULT_SOURCE:
        raise ValueError(f"Unsupported source: {source}")

    result_corpus_output_dir = result_corpus_output_dir or (pdgsolve_tmp_dir / "results")
    result_corpus_index_path = result_corpus_index_path or (pdgsolve_tmp_dir / "result-corpus.v1.json")
    pdgedit_output_dir = pdgedit_output_dir or (pdgsolve_tmp_dir / "pdgedit" / "documents")
    pdgedit_manifest_path = pdgedit_manifest_path or (pdgsolve_tmp_dir / "pdgedit" / "manifest.v1.json")
    live_manifest_path = live_manifest_path or (pdgsolve_tmp_dir / "manifest.v1.json")
    list_report_path = list_report_path or pdgfeed_runtime.list_markdown_output_path(source)
    supported_report_path = supported_report_path or pdgfeed_runtime.supported_markdown_output_path(source)
    summary_report_path = summary_report_path or pdgfeed_runtime.summary_markdown_output_path(source)

    clear_live_pdg_artifacts(
        source=source,
        pdgsolve_tmp_dir=pdgsolve_tmp_dir,
        supported_csv_path=supported_csv_path,
        list_report_path=list_report_path,
        supported_report_path=supported_report_path,
        summary_report_path=summary_report_path,
    )

    api = api or pdgfeed_runtime.connect_pdg(database_url, pedantic=False)
    cases = pdgfeed_runtime.build_cases_by_source(source, database_url, api=api)
    list_report_path = pdgfeed_runtime.write_live_reaction_list_report(
        source,
        database_url,
        api=api,
        cases=cases,
        output_path=list_report_path,
    )

    manifest = pdgfeed_runtime.build_live_manifest_payload(database_url, api=api)
    pdgfeed_runtime.write_json(live_manifest_path, manifest)

    supported_rows = pdgfeed_runtime.build_live_supported_reaction_csv_rows(
        database_url,
        api=api,
        manifest=manifest,
    )
    pdgfeed_runtime.write_supported_reaction_csv(supported_csv_path, supported_rows)
    pdgfeed_runtime.write_supported_reaction_markdown(supported_report_path, supported_rows)

    probability_deciles = pdgfeed_runtime.build_live_branching_probability_deciles(
        database_url,
        api=api,
        source=source,
    )
    summary_report_path = pdgfeed_runtime.write_live_reaction_summary_report(
        source,
        database_url,
        api=api,
        manifest=manifest,
        supported_rows=supported_rows,
        probability_deciles=probability_deciles,
        output_path=summary_report_path,
    )

    result_corpus_index = pdgsolve.solve_manifest_payload(
        manifest,
        output_dir=result_corpus_output_dir,
        pdgedit_output_dir=pdgedit_output_dir,
        pdgedit_manifest_path=pdgedit_manifest_path,
    )
    pdgsolve.write_json(result_corpus_index_path, result_corpus_index)

    return {
        "listReportPath": list_report_path,
        "supportedCsvPath": supported_csv_path,
        "supportedReportPath": supported_report_path,
        "summaryReportPath": summary_report_path,
        "liveManifestPath": live_manifest_path,
        "resultCorpusOutputDir": result_corpus_output_dir,
        "resultCorpusIndexPath": result_corpus_index_path,
        "pdgeditOutputDir": pdgedit_output_dir,
        "pdgeditManifestPath": pdgedit_manifest_path,
    }


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Regenerate live PDG report and pdgedit artifacts.")
    parser.add_argument(
        "--database-url",
        help="Optional database URL passed through to pdg.connect(...) for PDG database reads.",
    )
    parser.add_argument(
        "--source",
        choices=(DEFAULT_SOURCE,),
        default=DEFAULT_SOURCE,
        help="Choose the live PDG source to refresh.",
    )
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    output_paths = refresh_live_pdg_artifacts(
        args.database_url,
        source=args.source,
    )
    for key in (
        "listReportPath",
        "supportedCsvPath",
        "supportedReportPath",
        "summaryReportPath",
        "liveManifestPath",
        "resultCorpusIndexPath",
        "pdgeditManifestPath",
    ):
        print(pdgfeed_runtime.format_output_path(output_paths[key]))
    return 0


__all__ = [
    "DEFAULT_PDG_LIVE_MANIFEST_PATH",
    "DEFAULT_SOURCE",
    "clear_live_pdg_artifacts",
    "main",
    "parse_args",
    "refresh_live_pdg_artifacts",
]


if __name__ == "__main__":
    raise SystemExit(main())
