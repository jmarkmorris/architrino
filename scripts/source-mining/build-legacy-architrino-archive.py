#!/usr/bin/env python3
"""Build archive-level mining artifacts for the legacy Architrino WordPress site.

The script retrieves public WordPress posts, writes full cleaned text only under
the platform temporary directory, then writes compact source-mining reports under
reference/priorities.
It is intentionally deterministic: topic labels, duplicate grouping, and corpus
coverage scores are heuristics for triage, not canonization.
"""

from __future__ import annotations

import argparse
import collections
import dataclasses
import datetime as dt
import hashlib
import html
import json
import math
import re
import sys
import tempfile
import textwrap
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from pathlib import Path
from typing import Iterable


ROOT = Path(__file__).resolve().parents[2]
SOURCE_MINING_DIR = ROOT / "reference" / "priorities" / "source-mining"
LIBRARY_TABLE_PATH = SOURCE_MINING_DIR / "legacy-architrino-wordpress-library-posts.md"
REPORT_DIR = SOURCE_MINING_DIR / "archive-analysis"
TMP_ROOT = Path(tempfile.gettempdir()) / "architrino-archive-mining"
TMP_TEXT_DIR = TMP_ROOT / "clean-text"
POSTS_JSONL = TMP_ROOT / "legacy-architrino-posts.jsonl"
CARDS_JSONL = TMP_ROOT / "legacy-architrino-idea-cards.jsonl"
CLUSTERS_JSON = TMP_ROOT / "legacy-architrino-clusters.json"
TMP_ROOT_DISPLAY = "${TMPDIR:-/tmp}/architrino-archive-mining"
TMP_TEXT_DIR_DISPLAY = f"{TMP_ROOT_DISPLAY}/clean-text"
POSTS_JSONL_DISPLAY = f"{TMP_ROOT_DISPLAY}/legacy-architrino-posts.jsonl"
CARDS_JSONL_DISPLAY = f"{TMP_ROOT_DISPLAY}/legacy-architrino-idea-cards.jsonl"
CLUSTERS_JSON_DISPLAY = f"{TMP_ROOT_DISPLAY}/legacy-architrino-clusters.json"

WP_API = "https://public-api.wordpress.com/wp/v2/sites/architrino.wordpress.com/posts"


STOPWORDS = {
    "about",
    "above",
    "across",
    "after",
    "again",
    "against",
    "almost",
    "along",
    "also",
    "although",
    "always",
    "among",
    "another",
    "because",
    "before",
    "being",
    "been",
    "between",
    "both",
    "can",
    "could",
    "does",
    "doing",
    "done",
    "down",
    "during",
    "each",
    "either",
    "every",
    "from",
    "have",
    "having",
    "here",
    "into",
    "itself",
    "just",
    "know",
    "like",
    "make",
    "many",
    "more",
    "most",
    "much",
    "perhaps",
    "post",
    "posts",
    "must",
    "need",
    "only",
    "other",
    "over",
    "same",
    "should",
    "some",
    "such",
    "than",
    "that",
    "their",
    "them",
    "then",
    "ther",
    "there",
    "these",
    "they",
    "thing",
    "this",
    "those",
    "through",
    "under",
    "until",
    "very",
    "want",
    "will",
    "what",
    "when",
    "where",
    "which",
    "while",
    "with",
    "without",
    "would",
    "your",
}


DOMAIN_GENERIC_TERMS = {
    "architrino",
    "architrinos",
    "assemblies",
    "assembly",
    "brian",
    "book",
    "charge",
    "charges",
    "energy",
    "eric",
    "garrett",
    "hacker",
    "keating",
    "kirsten",
    "lisi",
    "look",
    "mark",
    "matter",
    "model",
    "nature",
    "number",
    "particle",
    "particles",
    "physics",
    "point",
    "published",
    "sabine",
    "space",
    "spacetime",
    "stacy",
    "theory",
    "think",
    "thought",
    "time",
    "triton",
    "universe",
    "videos",
    "watching",
}


LEGACY_TERM_MAP = [
    (
        "NPQG",
        "legacy NPQG source framing; translate only durable content into current Architrino Assembly Architecture language",
        ["npqg", "neoclassical physics and quantum gravity"],
    ),
    (
        "point charge",
        "architrino, point transceiver, polarity unit, or point potential depending on context",
        ["point charge", "point charges", "charge path", "electric point"],
    ),
    (
        "spacetime aether",
        "Noether sea or spacetime medium, with Euclidean void kept distinct from medium contents",
        ["spacetime aether", "aether", "ether", "vacuum gas", "spacetime gas"],
    ),
    (
        "field",
        "causal wake at substrate level; effective field only in continuum or comparison language",
        ["field", "fields", "field line", "field shell"],
    ),
    (
        "legacy source-time potential",
        "causal-delay potential or path-history contribution",
        ["delayed potential", "delay potential", "source history", "path history"],
    ),
    (
        "time dimension",
        "absolute time plus derived clock observables; do not import fundamental spacetime-time ontology",
        ["time dimension", "curled up dimension", "dimension of time", "proper time"],
    ),
    (
        "personality charge",
        "axial architrino, axial layer, axial pattern, or polarity bookkeeping where current canon supports it",
        ["personality charge", "personality charges", "polar personality"],
    ),
    (
        "dipole",
        "binary when the source means an electrino:positrino base assembly; keep dipole for comparison only",
        ["dipole", "dipoles", "tri-dipole", "tri-dipoles"],
    ),
    (
        "wave shell",
        "causal isochron, wake front, or causal wake surface",
        ["wave shell", "wavefront", "shell", "spherical wave"],
    ),
]


TOPICS = [
    {
        "id": "master_equation_dynamics",
        "title": "Master equation, causal wakes, and potential/action",
        "destinations": [
            "content/markdown/aaa/foundations",
            "content/markdown/aaa/dynamics",
            "reference/priorities/master-equation-closure",
            "reference/priorities/equation-mapping",
        ],
        "claim_bucket": "derivation or closure target",
        "priority": 10,
        "keywords": [
            "action",
            "causal wake",
            "causal contact",
            "delay",
            "delayed",
            "emission time",
            "equation of motion",
            "field speed",
            "jefimenko",
            "lagrangian",
            "line of action",
            "potential",
            "scalar potential",
            "self action",
            "source history",
            "vector potential",
            "virial",
            "wake",
        ],
    },
    {
        "id": "nested_shell_braid_noether_core",
        "title": "Noether core, binary, self-hit, and nested shell braid",
        "destinations": [
            "content/markdown/aaa/noether-braid",
            "content/markdown/aaa/dynamics",
            "reference/priorities/braid-nested-shell-causal-closure",
            "reference/priorities/braid-retained-branch-closure",
        ],
        "claim_bucket": "derivation or closure target",
        "priority": 10,
        "keywords": [
            "binary",
            "braid",
            "core",
            "dipole",
            "dyad",
            "nested",
            "noether",
            "orbit",
            "planck scale",
            "self hit",
            "self-hit",
            "spin",
            "standing wave",
            "symmetry breaking",
            "tri binary",
            "tri-binary",
        ],
    },
    {
        "id": "standard_model_assembly",
        "title": "Standard Model assembly and particle mappings",
        "destinations": [
            "content/markdown/aaa/quantum",
            "content/markdown/aaa/noether-braid",
            "reference/priorities/standard-model-closure",
            "reference/priorities/braid-mass-response-map",
        ],
        "claim_bucket": "derivation or closure target",
        "priority": 9,
        "keywords": [
            "antimatter",
            "boson",
            "charge",
            "color",
            "fermion",
            "flavor",
            "gluon",
            "higgs",
            "lepton",
            "mass",
            "neutrino",
            "pdg",
            "quark",
            "standard model",
            "strong force",
            "weak force",
            "w boson",
            "z boson",
        ],
    },
    {
        "id": "photon_quantum_measurement",
        "title": "Photon, quantum, measurement, and wavefunction bridges",
        "destinations": [
            "content/markdown/aaa/quantum",
            "content/markdown/aaa/dynamics",
            "reference/priorities/quantum-closure",
            "reference/priorities/photon-app",
        ],
        "claim_bucket": "effective summary",
        "priority": 8,
        "keywords": [
            "bell",
            "bohmian",
            "collapse",
            "epr",
            "entanglement",
            "malus",
            "measurement",
            "photon",
            "polarization",
            "quantum",
            "wave function",
            "wavefunction",
        ],
    },
    {
        "id": "spacetime_medium_gravity",
        "title": "Spacetime medium, gravity, Lorentz, and clock recovery",
        "destinations": [
            "content/markdown/aaa/spacetime",
            "content/markdown/aaa/dynamics",
            "reference/priorities/cross-theory-mapping",
            "reference/priorities/proof-programs",
        ],
        "claim_bucket": "ontology",
        "priority": 9,
        "keywords": [
            "absolute distance",
            "absolute relativity",
            "aether",
            "equivalence principle",
            "general relativity",
            "gravity",
            "lorentz",
            "mach",
            "metric",
            "noether sea",
            "relativity",
            "spacetime",
            "time",
            "vacuum",
        ],
    },
    {
        "id": "cosmology_cmb_redshift",
        "title": "Cosmology, redshift, CMB, and large-scale history",
        "destinations": [
            "content/markdown/aaa/cosmology",
            "content/markdown/aaa/spacetime",
            "reference/priorities/cosmology-closure",
            "reference/priorities/dark-sector",
        ],
        "claim_bucket": "effective summary",
        "priority": 8,
        "keywords": [
            "big bang",
            "cmb",
            "cosmic web",
            "cosmology",
            "dark energy",
            "dark matter",
            "expansion",
            "friedmann",
            "galaxy",
            "globular",
            "hubble",
            "inflation",
            "lambda",
            "quasar",
            "redshift",
            "steady state",
        ],
    },
    {
        "id": "strong_field_black_holes",
        "title": "Black holes, Planck cores, horizons, and strong fields",
        "destinations": [
            "content/markdown/aaa/spacetime",
            "content/markdown/aaa/cosmology",
            "reference/priorities/strong-field-closure",
            "reference/priorities/cosmology-closure",
        ],
        "claim_bucket": "speculation",
        "priority": 7,
        "keywords": [
            "accretion",
            "black hole",
            "ccc",
            "censorship",
            "horizon",
            "jet",
            "planck core",
            "singularity",
            "smbh",
            "supermassive",
        ],
    },
    {
        "id": "thermodynamics_radiation_entropy",
        "title": "Thermodynamics, radiation, entropy, and spectra",
        "destinations": [
            "content/markdown/aaa/dynamics",
            "content/markdown/aaa/cosmology",
            "reference/priorities/equation-mapping",
            "reference/priorities/cosmology-closure",
        ],
        "claim_bucket": "derivation or closure target",
        "priority": 8,
        "keywords": [
            "blackbody",
            "entropy",
            "fusion",
            "heat",
            "kinetic energy",
            "planck law",
            "radiation",
            "radioactivity",
            "temperature",
            "thermal",
            "virial",
            "wien",
        ],
    },
    {
        "id": "external_theory_mapping",
        "title": "External theory mapping and source leads",
        "destinations": [
            "content/markdown/aaa/philosophy-history/theory-mapping.md",
            "reference/priorities/cross-theory-mapping",
            "reference/priorities/source-mining",
        ],
        "claim_bucket": "historical/provenance only",
        "priority": 5,
        "keywords": [
            "assembly theory",
            "bohmian",
            "chang",
            "e8",
            "effective theory",
            "lattice qcd",
            "loop quantum gravity",
            "mapping",
            "penrose",
            "qcd",
            "string theory",
            "superfluid",
            "supersymmetry",
        ],
    },
    {
        "id": "philosophy_history_method",
        "title": "Philosophy, history of science, and method",
        "destinations": [
            "content/markdown/aaa/philosophy-history",
            "content/markdown/aaa/philosophy-history/perspectives.md",
            "reference/priorities/future-physics-cosmology",
        ],
        "claim_bucket": "historical/provenance only",
        "priority": 4,
        "keywords": [
            "academia",
            "false narrative",
            "funding",
            "institution",
            "method",
            "occam",
            "ontology",
            "philosophy",
            "reality",
            "scientific method",
        ],
    },
    {
        "id": "technology_ai_operations",
        "title": "AI, simulation, technology, and operational planning",
        "destinations": [
            "reference/priorities/source-mining",
            "reference/priorities/future-physics-cosmology",
            "reference/priorities/simulations",
        ],
        "claim_bucket": "speculation",
        "priority": 3,
        "keywords": [
            "ai",
            "animation",
            "app",
            "closure",
            "computation",
            "memory",
            "prediction",
            "research institute",
            "simulation",
            "technology",
        ],
    },
]


ABANDONED_MARKERS = [
    "i was confused",
    "long ago confusion",
    "does not make sense",
    "old idea",
    "obsolete",
    "abandoned",
    "was wrong",
    "wrong path",
]

SPECULATION_MARKERS = [
    "conjecture",
    "daydream",
    "guess",
    "hypothesis",
    "imagine",
    "maybe",
    "musing",
    "prediction",
    "speculate",
    "what if",
]

POLEMIC_MARKERS = [
    "debunked",
    "false narrative",
    "fraud",
    "fubar",
    "nonsense",
    "woo",
    "take the l",
    "poor mit",
]


@dataclasses.dataclass
class PostRecord:
    id: int
    title: str
    date: str
    year: str
    url: str
    status: str
    slug: str
    tags: list[str]
    categories: list[str]
    outbound_links: list[str]
    mined_marker_present: bool
    raw_html_hash: str
    word_count: int
    text_path: str
    text: str


@dataclasses.dataclass
class IdeaCard:
    id: str
    post_id: int
    title: str
    date: str
    url: str
    status: str
    topic_id: str
    topic_title: str
    claim_bucket: str
    destinations: list[str]
    word_count: int
    terms: list[str]
    normalized_terms: list[str]
    risk_flags: list[str]
    text: str


class TextAndLinkParser(HTMLParser):
    block_tags = {
        "address",
        "article",
        "aside",
        "blockquote",
        "br",
        "div",
        "figcaption",
        "figure",
        "footer",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "header",
        "hr",
        "li",
        "main",
        "ol",
        "p",
        "pre",
        "section",
        "table",
        "td",
        "th",
        "tr",
        "ul",
    }

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts: list[str] = []
        self.links: list[str] = []
        self.skip_depth = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        tag = tag.lower()
        if tag in {"script", "style", "noscript"}:
            self.skip_depth += 1
            return
        if self.skip_depth:
            return
        if tag in self.block_tags:
            self.parts.append("\n")
        if tag == "a":
            attr_map = dict(attrs)
            href = attr_map.get("href")
            if href:
                self.links.append(href)

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()
        if tag in {"script", "style", "noscript"} and self.skip_depth:
            self.skip_depth -= 1
            return
        if self.skip_depth:
            return
        if tag in self.block_tags:
            self.parts.append("\n")

    def handle_data(self, data: str) -> None:
        if not self.skip_depth:
            self.parts.append(data)


def repair_url(url: str) -> str:
    if url.startswith("https://johnmarkmorris.com"):
        return "https://architrino.wordpress.com" + url.removeprefix("https://johnmarkmorris.com")
    if url.startswith("http://johnmarkmorris.com"):
        return "https://architrino.wordpress.com" + url.removeprefix("http://johnmarkmorris.com")
    if url.startswith("https://www.architrino.com"):
        return "https://architrino.wordpress.com" + url.removeprefix("https://www.architrino.com")
    if url.startswith("http://www.architrino.com"):
        return "https://architrino.wordpress.com" + url.removeprefix("http://www.architrino.com")
    if url.startswith("https://architrino.com"):
        return "https://architrino.wordpress.com" + url.removeprefix("https://architrino.com")
    if url.startswith("http://architrino.com"):
        return "https://architrino.wordpress.com" + url.removeprefix("http://architrino.com")
    return url


def normalized_url(url: str) -> str:
    repaired = repair_url(url.strip())
    parsed = urllib.parse.urlparse(repaired)
    path = parsed.path
    if not path.endswith("/"):
        path += "/"
    return urllib.parse.urlunparse(("https", parsed.netloc.lower(), path, "", "", ""))


def slug_from_url(url: str) -> str:
    path = urllib.parse.urlparse(url).path.strip("/")
    slug = path.split("/")[-1] if path else "post"
    slug = re.sub(r"[^a-zA-Z0-9._-]+", "-", slug).strip("-").lower()
    return slug or "post"


def clean_html(html_text: str) -> tuple[str, list[str]]:
    parser = TextAndLinkParser()
    parser.feed(html_text or "")
    parser.close()
    raw = html.unescape("".join(parser.parts)).replace("\xa0", " ")
    lines = []
    for line in raw.splitlines():
        line = re.sub(r"\s+", " ", line).strip()
        if line:
            lines.append(line)
    text = "\n\n".join(lines)
    links = []
    seen = set()
    for href in parser.links:
        href = html.unescape(href).strip()
        if href.startswith("//"):
            href = "https:" + href
        if not href.startswith(("http://", "https://")):
            continue
        if "wp.com" in href and "architrino" not in href:
            continue
        if href not in seen:
            links.append(href)
            seen.add(href)
    return text, links


def tokenize(text: str) -> list[str]:
    tokens = []
    for token in re.findall(r"[a-zA-Z][a-zA-Z0-9_-]{2,}", text.lower()):
        token = token.replace("_", "-")
        if token in STOPWORDS:
            continue
        if len(token) < 4 and token not in {"cmb", "qcd", "pdg", "epr"}:
            continue
        tokens.append(token)
    return tokens


def top_terms(text: str, limit: int = 14) -> list[str]:
    counts = collections.Counter(tokenize(text))
    for common in DOMAIN_GENERIC_TERMS:
        counts.pop(common, None)
    return [term for term, _ in counts.most_common(limit)]


def phrase_score(text_lc: str, keyword: str) -> int:
    keyword_lc = keyword.lower()
    if " " in keyword_lc or "-" in keyword_lc:
        return 4 if keyword_lc in text_lc else 0
    return min(3, len(re.findall(rf"\b{re.escape(keyword_lc)}\b", text_lc)))


def assign_topic(text: str) -> dict:
    text_lc = text.lower()
    best_topic = TOPICS[-1]
    best_score = -1
    for topic in TOPICS:
        score = sum(phrase_score(text_lc, keyword) for keyword in topic["keywords"])
        title_lc = text_lc[:300]
        score += sum(2 for keyword in topic["keywords"] if keyword in title_lc)
        if score > best_score:
            best_topic = topic
            best_score = score
    if best_score <= 0:
        return next(topic for topic in TOPICS if topic["id"] == "philosophy_history_method")
    return best_topic


def normalized_terms(text: str) -> list[str]:
    text_lc = text.lower()
    found = []
    for legacy, current, markers in LEGACY_TERM_MAP:
        if any(marker in text_lc for marker in markers):
            found.append(f"{legacy} -> {current}")
    return found


def risk_flags(text: str, title: str) -> list[str]:
    haystack = f"{title}\n{text}".lower()
    flags = []
    if any(marker in haystack for marker in ABANDONED_MARKERS):
        flags.append("abandoned-or-corrected-language")
    if any(marker in haystack for marker in SPECULATION_MARKERS):
        flags.append("speculation-marker")
    if any(marker in haystack for marker in POLEMIC_MARKERS):
        flags.append("polemic-marker")
    if "npqg" in haystack or "point charge" in haystack or "aether" in haystack:
        flags.append("legacy-terminology")
    return flags


def fetch_json_page(page: int, per_page: int) -> tuple[list[dict], dict[str, str]]:
    params = urllib.parse.urlencode(
        {
            "per_page": str(per_page),
            "page": str(page),
            "_embed": "wp:term",
            "context": "view",
        }
    )
    url = f"{WP_API}?{params}"
    request = urllib.request.Request(
        url,
        headers={
            "Accept": "application/json",
            "User-Agent": "architrino-source-mining/1.0",
        },
    )
    with urllib.request.urlopen(request, timeout=60) as response:
        data = json.loads(response.read().decode("utf-8"))
        headers = {key.lower(): value for key, value in response.headers.items()}
    return data, headers


def fetch_posts(per_page: int = 100, limit: int | None = None) -> list[dict]:
    posts: list[dict] = []
    page = 1
    total_pages: int | None = None
    while True:
        data, headers = fetch_json_page(page, per_page)
        posts.extend(data)
        if total_pages is None and headers.get("x-wp-totalpages"):
            total_pages = int(headers["x-wp-totalpages"])
        if limit and len(posts) >= limit:
            return posts[:limit]
        if not data:
            break
        if total_pages is not None and page >= total_pages:
            break
        page += 1
    return posts


def extract_terms(post: dict) -> tuple[list[str], list[str]]:
    categories: list[str] = []
    tags: list[str] = []
    term_groups = post.get("_embedded", {}).get("wp:term", [])
    for group in term_groups:
        for term in group:
            name = html.unescape(term.get("name", "")).strip()
            taxonomy = term.get("taxonomy", "")
            if not name:
                continue
            if taxonomy == "category":
                categories.append(name)
            elif taxonomy == "post_tag":
                tags.append(name)
    return categories, tags


def load_library_statuses() -> dict[str, dict[str, str]]:
    statuses: dict[str, dict[str, str]] = {}
    if not LIBRARY_TABLE_PATH.exists():
        return statuses
    pattern = re.compile(
        r"^\| (?P<date>\d{4}-\d{2}-\d{2}) \| (?P<title>.*?) \| (?P<status>.*?) \| \[link\]\((?P<url>https?://[^)]+)\) \|$"
    )
    for line in LIBRARY_TABLE_PATH.read_text(encoding="utf-8").splitlines():
        match = pattern.match(line)
        if not match:
            continue
        data = match.groupdict()
        url = normalized_url(data["url"])
        statuses[url] = {
            "date": data["date"],
            "title": data["title"],
            "status": data["status"],
        }
    return statuses


def build_post_records(api_posts: list[dict], status_map: dict[str, dict[str, str]]) -> list[PostRecord]:
    records: list[PostRecord] = []
    for post in api_posts:
        title = clean_html(post.get("title", {}).get("rendered", ""))[0] or f"post-{post.get('id')}"
        raw_html = post.get("content", {}).get("rendered", "") or ""
        text, outbound_links = clean_html(raw_html)
        excerpt_text, excerpt_links = clean_html(post.get("excerpt", {}).get("rendered", "") or "")
        if excerpt_text and excerpt_text not in text:
            text = f"{excerpt_text}\n\n{text}".strip()
        for link in excerpt_links:
            if link not in outbound_links:
                outbound_links.append(link)
        url = normalized_url(post.get("link", ""))
        categories, tags = extract_terms(post)
        status = status_map.get(url, {}).get("status", "unknown")
        marker_source = " ".join([raw_html, post.get("excerpt", {}).get("rendered", ""), title, *tags])
        slug = slug_from_url(url)
        date = (post.get("date") or "")[:10]
        year = date[:4] if date else "unknown"
        raw_hash = hashlib.sha256(raw_html.encode("utf-8")).hexdigest()[:16]
        text_path = TMP_TEXT_DIR / f"{date}-{slug}.txt"
        records.append(
            PostRecord(
                id=int(post.get("id", 0)),
                title=title,
                date=date,
                year=year,
                url=url,
                status=status,
                slug=slug,
                tags=tags,
                categories=categories,
                outbound_links=outbound_links[:40],
                mined_marker_present="MINED" in marker_source,
                raw_html_hash=raw_hash,
                word_count=len(tokenize(text)),
                text_path=str(text_path),
                text=text,
            )
        )
    records.sort(key=lambda item: (item.date, item.title), reverse=True)
    return records


def split_into_cards(post: PostRecord, min_words: int = 70, max_words: int = 260) -> list[IdeaCard]:
    paragraphs = [para.strip() for para in post.text.split("\n\n") if para.strip()]
    cards: list[IdeaCard] = []
    chunk: list[str] = []
    chunk_words = 0

    def flush() -> None:
        nonlocal chunk, chunk_words
        if not chunk:
            return
        text = "\n\n".join(chunk).strip()
        words = tokenize(text)
        if len(words) < min_words and cards:
            cards[-1].text = f"{cards[-1].text}\n\n{text}".strip()
            cards[-1].word_count = len(tokenize(cards[-1].text))
            cards[-1].terms = top_terms(cards[-1].text)
            cards[-1].normalized_terms = normalized_terms(cards[-1].text)
            cards[-1].risk_flags = risk_flags(cards[-1].text, post.title)
        elif len(words) >= 25:
            topic = assign_topic(f"{post.title}\n{text}")
            card_index = len(cards) + 1
            cards.append(
                IdeaCard(
                    id=f"{post.id}-{card_index:03d}",
                    post_id=post.id,
                    title=post.title,
                    date=post.date,
                    url=post.url,
                    status=post.status,
                    topic_id=topic["id"],
                    topic_title=topic["title"],
                    claim_bucket=topic["claim_bucket"],
                    destinations=list(topic["destinations"]),
                    word_count=len(words),
                    terms=top_terms(f"{post.title}\n{text}"),
                    normalized_terms=normalized_terms(f"{post.title}\n{text}"),
                    risk_flags=risk_flags(text, post.title),
                    text=text,
                )
            )
        chunk = []
        chunk_words = 0

    for para in paragraphs:
        words = tokenize(para)
        if len(words) < 8:
            continue
        if chunk and chunk_words + len(words) > max_words:
            flush()
        chunk.append(para)
        chunk_words += len(words)
    flush()
    return cards


def term_set(text: str, limit: int = 80) -> set[str]:
    counts = collections.Counter(tokenize(text))
    return {term for term, _ in counts.most_common(limit)}


def jaccard(a: set[str], b: set[str]) -> float:
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


def cluster_cards(cards: list[IdeaCard]) -> list[dict]:
    clusters: list[dict] = []
    by_topic: dict[str, list[IdeaCard]] = collections.defaultdict(list)
    for card in cards:
        by_topic[card.topic_id].append(card)

    cluster_id = 1
    for topic_id, topic_cards in sorted(by_topic.items()):
        topic_clusters: list[dict] = []
        for card in topic_cards:
            card_terms = set(card.terms) or term_set(card.text, 40)
            best: tuple[float, dict | None] = (0.0, None)
            for cluster in topic_clusters:
                score = jaccard(card_terms, cluster["term_set"])
                if score > best[0]:
                    best = (score, cluster)
            if best[1] is not None and best[0] >= 0.18:
                cluster = best[1]
                cluster["cards"].append(card)
                cluster["term_counter"].update(card_terms)
                cluster["term_set"] = set(term for term, _ in cluster["term_counter"].most_common(60))
            else:
                topic_clusters.append(
                    {
                        "cards": [card],
                        "term_counter": collections.Counter(card_terms),
                        "term_set": set(card_terms),
                    }
                )
        for cluster in topic_clusters:
            cluster_cards_list: list[IdeaCard] = cluster["cards"]
            term_counter = cluster["term_counter"]
            label_terms = [term for term, _ in term_counter.most_common(5)]
            representative = select_representative_cards(cluster_cards_list, limit=4)
            duplicate_pairs = count_duplicate_pairs(cluster_cards_list)
            topic = next(t for t in TOPICS if t["id"] == topic_id)
            flags = collections.Counter(flag for c in cluster_cards_list for flag in c.risk_flags)
            source_urls = {c.url for c in cluster_cards_list}
            status_counts = collections.Counter(c.status for c in cluster_cards_list)
            cluster_record = {
                "id": f"C{cluster_id:03d}",
                "topic_id": topic_id,
                "topic_title": topic["title"],
                "claim_bucket": topic["claim_bucket"],
                "destinations": topic["destinations"],
                "priority": topic["priority"],
                "label": ", ".join(label_terms[:4]) or topic["title"],
                "terms": label_terms[:12],
                "card_count": len(cluster_cards_list),
                "source_count": len(source_urls),
                "open_source_count": sum(1 for url in source_urls if any(c.url == url and c.status == "open" for c in cluster_cards_list)),
                "status_counts": dict(status_counts),
                "risk_flags": dict(flags),
                "duplicate_pair_count": duplicate_pairs,
                "representative": [card_to_reference(c) for c in representative],
            }
            clusters.append(cluster_record)
            cluster_id += 1

    clusters.sort(
        key=lambda c: (
            -c["priority"],
            -c["open_source_count"],
            -c["source_count"],
            c["topic_title"],
            c["label"],
        )
    )
    for index, cluster in enumerate(clusters, start=1):
        cluster["rank"] = index
    return clusters


def select_representative_cards(cards: list[IdeaCard], limit: int) -> list[IdeaCard]:
    scored = []
    for card in cards:
        score = card.word_count
        if card.status == "open":
            score += 120
        if "abandoned-or-corrected-language" in card.risk_flags:
            score -= 80
        if "polemic-marker" in card.risk_flags:
            score -= 60
        scored.append((score, card.date, card.id, card))
    scored.sort(reverse=True)
    result = []
    seen_urls = set()
    for _, _, _, card in scored:
        if card.url in seen_urls:
            continue
        result.append(card)
        seen_urls.add(card.url)
        if len(result) >= limit:
            break
    return result


def count_duplicate_pairs(cards: list[IdeaCard]) -> int:
    if len(cards) < 2:
        return 0
    sets = [(card.id, term_set(card.text, 80)) for card in cards]
    pairs = 0
    for i in range(len(sets)):
        for j in range(i + 1, len(sets)):
            if jaccard(sets[i][1], sets[j][1]) >= 0.72:
                pairs += 1
    return pairs


def card_to_reference(card: IdeaCard) -> dict:
    return {
        "title": card.title,
        "date": card.date,
        "url": card.url,
        "status": card.status,
        "card_id": card.id,
        "terms": card.terms[:6],
        "risk_flags": card.risk_flags,
    }


def build_corpus_index() -> list[dict]:
    docs = []
    roots = [
        ROOT / "content" / "markdown" / "aaa",
        ROOT / "reference" / "priorities",
    ]
    for base in roots:
        if not base.exists():
            continue
        for path in sorted(base.rglob("*.md")):
            if REPORT_DIR in path.parents:
                continue
            rel = path.relative_to(ROOT).as_posix()
            if rel.startswith("content/generated/"):
                continue
            if rel in {
                "reference/priorities/source-mining/legacy-architrino-wordpress-library-posts.md",
                "reference/priorities/source-mining/source-mining-history.md",
                "reference/priorities/source-mining/source-mining.md",
            }:
                continue
            try:
                text = path.read_text(encoding="utf-8")
            except UnicodeDecodeError:
                continue
            docs.append(
                {
                    "path": rel,
                    "text_lc": text.lower(),
                    "terms": term_set(text, 2000),
                }
            )
    return docs


def score_coverage(clusters: list[dict], corpus_docs: list[dict]) -> None:
    for cluster in clusters:
        query_terms = set(cluster["terms"][:10])
        query_terms = {term for term in query_terms if term not in STOPWORDS and len(term) >= 4}
        query_terms = query_terms - DOMAIN_GENERIC_TERMS
        scored_docs = []
        if len(query_terms) >= 3:
            for doc in corpus_docs:
                overlap = query_terms & doc["terms"]
                phrase_hits = 0
                for term in cluster["terms"][:5]:
                    if len(term) >= 5 and term not in DOMAIN_GENERIC_TERMS and term in doc["text_lc"]:
                        phrase_hits += 1
                score = len(overlap) + phrase_hits
                if score >= 2:
                    scored_docs.append((score, doc["path"], sorted(overlap)[:8]))
            scored_docs.sort(reverse=True)
            top_docs = [
                {
                    "path": path,
                    "score": score,
                    "terms": terms,
                }
                for score, path, terms in scored_docs[:5]
            ]
        else:
            top_docs = []
        top_score = top_docs[0]["score"] if top_docs else 0
        if top_score >= 7 and len(top_docs) >= 2:
            coverage = "likely captured"
        elif top_score >= 3:
            coverage = "partially captured"
        else:
            coverage = "needs review"
        if cluster["claim_bucket"] == "historical/provenance only" and coverage == "needs review":
            coverage = "historical review"
        cluster["corpus_coverage"] = coverage
        cluster["corpus_hits"] = top_docs


def cluster_current_use_score(cluster: dict) -> float:
    score = cluster["priority"] * 3 + cluster["open_source_count"] * 2 + cluster["source_count"]
    if cluster["corpus_coverage"] == "needs review":
        score += 8
    elif cluster["corpus_coverage"] == "partially captured":
        score += 4
    else:
        score -= 2
    flags = cluster.get("risk_flags", {})
    score -= flags.get("polemic-marker", 0) * 2
    score -= flags.get("abandoned-or-corrected-language", 0) * 3
    if cluster["claim_bucket"] in {"derivation or closure target", "ontology"}:
        score += 5
    if cluster["claim_bucket"] == "historical/provenance only":
        score -= 4
    return score


def build_topic_routes(clusters: list[dict]) -> list[dict]:
    by_topic: dict[str, list[dict]] = collections.defaultdict(list)
    for cluster in clusters:
        by_topic[cluster["topic_id"]].append(cluster)

    routes = []
    for topic in TOPICS:
        topic_clusters = by_topic.get(topic["id"], [])
        if not topic_clusters:
            continue
        coverage_counts = collections.Counter(cluster["corpus_coverage"] for cluster in topic_clusters)
        risk_counts = collections.Counter()
        term_counts = collections.Counter()
        representative_refs = []
        seen_urls = set()
        for cluster in sorted(topic_clusters, key=cluster_current_use_score, reverse=True):
            risk_counts.update(cluster.get("risk_flags", {}))
            for term in cluster.get("terms", []):
                if term not in DOMAIN_GENERIC_TERMS and term not in STOPWORDS:
                    term_counts[term] += max(1, cluster.get("source_count", 1))
            sorted_refs = sorted(
                cluster.get("representative", []),
                key=lambda ref: (ref.get("status") != "open", ref.get("date", "")),
            )
            for ref in sorted_refs:
                if ref["url"] in seen_urls:
                    continue
                representative_refs.append(ref)
                seen_urls.add(ref["url"])
                if len(representative_refs) >= 5:
                    break
            if len(representative_refs) >= 5:
                continue

        open_source_estimate = sum(cluster.get("open_source_count", 0) for cluster in topic_clusters)
        source_estimate = sum(cluster.get("source_count", 0) for cluster in topic_clusters)
        pressure = coverage_counts.get("needs review", 0) * 2 + coverage_counts.get("partially captured", 0)
        route_score = topic["priority"] * 4 + pressure + open_source_estimate
        routes.append(
            {
                "topic_id": topic["id"],
                "topic_title": topic["title"],
                "claim_bucket": topic["claim_bucket"],
                "destinations": topic["destinations"],
                "cluster_count": len(topic_clusters),
                "source_estimate": source_estimate,
                "open_source_estimate": open_source_estimate,
                "coverage_counts": dict(coverage_counts),
                "risk_counts": dict(risk_counts),
                "terms": [term for term, _ in term_counts.most_common(8)],
                "representative": representative_refs,
                "route_score": route_score,
            }
        )
    routes.sort(key=lambda route: (-route["route_score"], route["topic_title"]))
    return routes


def write_jsonl(path: Path, rows: Iterable[dict]) -> None:
    with path.open("w", encoding="utf-8") as handle:
        for row in rows:
            handle.write(json.dumps(row, ensure_ascii=False, sort_keys=True))
            handle.write("\n")


def write_tmp_artifacts(posts: list[PostRecord], cards: list[IdeaCard], clusters: list[dict]) -> None:
    TMP_TEXT_DIR.mkdir(parents=True, exist_ok=True)
    for post in posts:
        Path(post.text_path).write_text(post.text, encoding="utf-8")
    write_jsonl(POSTS_JSONL, (post_to_dict(post, include_text=False) for post in posts))
    write_jsonl(CARDS_JSONL, (dataclasses.asdict(card) for card in cards))
    CLUSTERS_JSON.write_text(json.dumps(clusters, ensure_ascii=False, indent=2, sort_keys=True), encoding="utf-8")


def post_to_dict(post: PostRecord, include_text: bool = False) -> dict:
    data = dataclasses.asdict(post)
    if not include_text:
        data.pop("text", None)
    return data


def markdown_link(title: str, url: str) -> str:
    clean_title = title.replace("|", "\\|").replace("\n", " ").strip()
    return f"[{clean_title}]({url})"


def short_destinations(destinations: list[str], limit: int = 2) -> str:
    return "<br>".join(f"`{destination}`" for destination in destinations[:limit])


def render_reference_links(representatives: list[dict], limit: int = 3) -> str:
    links = []
    for ref in representatives[:limit]:
        links.append(f"{ref['date']} {markdown_link(ref['title'], ref['url'])} ({ref['status']})")
    return "<br>".join(links)


def coverage_pressure_text(route: dict) -> str:
    counts = route["coverage_counts"]
    return (
        f"needs review {counts.get('needs review', 0)}, "
        f"partial {counts.get('partially captured', 0)}, "
        f"likely {counts.get('likely captured', 0)}"
    )


def risk_pressure_text(route: dict) -> str:
    counts = route["risk_counts"]
    notes = []
    if counts.get("legacy-terminology"):
        notes.append("translate legacy terms")
    if counts.get("speculation-marker"):
        notes.append("separate speculation")
    if counts.get("polemic-marker"):
        notes.append("remove polemic")
    if counts.get("abandoned-or-corrected-language"):
        notes.append("check later corrections")
    return ", ".join(notes) if notes else "low explicit risk flags"


def render_report(posts: list[PostRecord], cards: list[IdeaCard], clusters: list[dict]) -> str:
    now = dt.datetime.now().strftime("%Y-%m-%d")
    status_counts = collections.Counter(post.status for post in posts)
    year_counts = collections.Counter(post.year for post in posts)
    coverage_counts = collections.Counter(cluster["corpus_coverage"] for cluster in clusters)
    topic_counts = collections.Counter(card.topic_title for card in cards)
    flag_counts = collections.Counter(flag for card in cards for flag in card.risk_flags)
    topic_routes = build_topic_routes(clusters)

    lines = [
        "# Legacy Architrino Archive Mining Report",
        "",
        "This is an archive-level source-mining triage report. It does not mark individual posts mined, does not update durable completion status, and does not promote claims into the reader-facing corpus. Full cleaned post text is kept only in platform temporary artifacts. Website `MINED` markers, if present in legacy HTML or metadata, are retained only as non-authoritative audit metadata.",
        "",
        "## Source Map",
        "",
        "| Field | Value |",
        "| --- | --- |",
        f"| Generated | {now} |",
        "| Source root | [Architrino WordPress](https://architrino.wordpress.com/) |",
        "| API source | `https://public-api.wordpress.com/wp/v2/sites/architrino.wordpress.com/posts` |",
        f"| Posts retrieved | `{len(posts)}` |",
        f"| Idea cards | `{len(cards)}` |",
        f"| Idea clusters | `{len(clusters)}` |",
        f"| Local post JSONL | `{POSTS_JSONL_DISPLAY}` |",
        f"| Local idea-card JSONL | `{CARDS_JSONL_DISPLAY}` |",
        f"| Local cluster JSON | `{CLUSTERS_JSON_DISPLAY}` |",
        f"| Local clean-text directory | `{TMP_TEXT_DIR_DISPLAY}` |",
        "",
        "## Method",
        "",
        "The pass retrieves public WordPress records, strips HTML into local text artifacts, segments posts into idea cards, applies a deterministic topic taxonomy, groups similar cards by keyword-set overlap, flags legacy terminology and high-risk language, and compares cluster terms against `content/markdown/aaa` plus `reference/priorities`. Coverage labels are triage hints only.",
        "",
        "## Inventory",
        "",
        "| Metric | Count |",
        "| --- | ---: |",
        f"| Posts | {len(posts)} |",
        f"| Complete in durable table | {status_counts.get('complete', 0)} |",
        f"| Open in durable table | {status_counts.get('open', 0)} |",
        f"| Unknown table status | {status_counts.get('unknown', 0)} |",
        f"| Posts with visible legacy `MINED` marker in API HTML or metadata, non-authoritative | {sum(1 for post in posts if post.mined_marker_present)} |",
        f"| Cards carrying legacy terminology flags | {flag_counts.get('legacy-terminology', 0)} |",
        f"| Cards carrying speculation markers | {flag_counts.get('speculation-marker', 0)} |",
        f"| Cards carrying polemic markers | {flag_counts.get('polemic-marker', 0)} |",
        f"| Cards carrying abandoned/corrected markers | {flag_counts.get('abandoned-or-corrected-language', 0)} |",
        "",
        "## Year Counts",
        "",
        "| Year | Posts |",
        "| --- | ---: |",
    ]
    for year, count in sorted(year_counts.items(), reverse=True):
        lines.append(f"| {year} | {count} |")

    lines.extend(
        [
            "",
            "## Topic Counts",
            "",
            "| Topic | Cards |",
            "| --- | ---: |",
        ]
    )
    for topic, count in topic_counts.most_common():
        lines.append(f"| {topic} | {count} |")

    lines.extend(
        [
            "",
            "## Corpus Coverage Snapshot",
            "",
            "| Coverage label | Clusters |",
            "| --- | ---: |",
        ]
    )
    for label, count in coverage_counts.most_common():
        lines.append(f"| {label} | {count} |")

    lines.extend(
        [
            "",
            "## Archive-Level Topic Routes",
            "",
            "These routes are the strongest archive-level areas to inspect next. They are not automatically approved recommendations; each route should become either an ordinary per-source mining batch or a focused topic sweep.",
            "",
            "| Rank | Topic route | Coverage pressure | Open-source estimate | Main signals | Likely destinations | Representative posts |",
            "| ---: | --- | --- | ---: | --- | --- | --- |",
        ]
    )
    for index, route in enumerate(topic_routes[:12], start=1):
        lines.append(
            "| "
            + " | ".join(
                [
                    str(index),
                    route["topic_title"],
                    coverage_pressure_text(route),
                    str(route["open_source_estimate"]),
                    ", ".join(route["terms"][:6]) or "-",
                    short_destinations(route["destinations"]),
                    render_reference_links(route["representative"]),
                ]
            )
            + " |"
        )

    lines.extend(
        [
            "",
            "## Term Normalization Map",
            "",
            "| Legacy signal | Current review target |",
            "| --- | --- |",
        ]
    )
    for legacy, current, _ in LEGACY_TERM_MAP:
        lines.append(f"| {legacy} | {current} |")

    lines.extend(
        [
            "",
            "## Filtered Historical/High-Risk Material",
            "",
            "The archive contains useful history but also legacy ontology, polemic, and abandoned framing. This pass does not import those claims. It keeps them as traceability flags so later ordinary mining can rewrite only durable content in current terminology.",
            "",
            "| Risk flag | Idea cards |",
            "| --- | ---: |",
        ]
    )
    for flag, count in flag_counts.most_common():
        lines.append(f"| {flag} | {count} |")

    lines.extend(
        [
            "",
            "## Next Operating Modes",
            "",
            "1. Use a candidate-gap route for an ordinary post-by-post mining batch, starting with the representative open posts.",
            "2. Use topic-sweep mode when the operator asks what the legacy archive says about one concept across many posts.",
            "3. Use the platform temporary JSONL artifacts as the retrieval cache, but keep durable queue and status accounting in `reference/priorities/source-mining/`.",
        ]
    )
    return "\n".join(lines) + "\n"


def render_clusters_report(clusters: list[dict]) -> str:
    lines = [
        "# Legacy Architrino Idea Clusters",
        "",
        "This table is generated by `scripts/source-mining/build-legacy-architrino-archive.py`. It is a deterministic archive triage map, not a corpus approval list.",
        "",
        "| Rank | Cluster | Topic | Bucket | Coverage | Cards | Sources | Risk flags | Representative posts |",
        "| ---: | --- | --- | --- | --- | ---: | ---: | --- | --- |",
    ]
    for cluster in clusters:
        flags = ", ".join(f"{key}:{value}" for key, value in sorted(cluster.get("risk_flags", {}).items())) or "-"
        lines.append(
            "| "
            + " | ".join(
                [
                    str(cluster["rank"]),
                    cluster["label"],
                    cluster["topic_title"],
                    cluster["claim_bucket"],
                    cluster["corpus_coverage"],
                    str(cluster["card_count"]),
                    str(cluster["source_count"]),
                    flags,
                    render_reference_links(cluster["representative"], limit=2),
                ]
            )
            + " |"
        )
    return "\n".join(lines) + "\n"


def render_candidate_gaps_report(clusters: list[dict]) -> str:
    routes = build_topic_routes(clusters)
    lines = [
        "# Legacy Architrino Candidate Gaps",
        "",
        "This queue is for selecting future ordinary source-mining batches and topic sweeps. A row here does not mean the route is true or corpus-ready; it means the archive contains enough signal to justify targeted review.",
        "",
        "| Rank | Candidate route | Why inspect | Main signals | Likely destinations | Starting posts |",
        "| ---: | --- | --- | --- | --- | --- |",
    ]
    for index, route in enumerate(routes, start=1):
        why = (
            f"{route['cluster_count']} cluster(s), open-source estimate {route['open_source_estimate']}, "
            f"{coverage_pressure_text(route)}; {risk_pressure_text(route)}"
        )
        lines.append(
            "| "
            + " | ".join(
                [
                    str(index),
                    route["topic_title"],
                    why,
                    ", ".join(route["terms"][:8]) or "-",
                    short_destinations(route["destinations"], limit=3),
                    render_reference_links(route["representative"], limit=4),
                ]
            )
            + " |"
        )
    return "\n".join(lines) + "\n"


def write_reports(posts: list[PostRecord], cards: list[IdeaCard], clusters: list[dict]) -> None:
    REPORT_DIR.mkdir(parents=True, exist_ok=True)
    (REPORT_DIR / "legacy-architrino-archive-mining-report.md").write_text(
        render_report(posts, cards, clusters), encoding="utf-8"
    )
    (REPORT_DIR / "legacy-architrino-idea-clusters.md").write_text(
        render_clusters_report(clusters), encoding="utf-8"
    )
    (REPORT_DIR / "legacy-architrino-candidate-gaps.md").write_text(
        render_candidate_gaps_report(clusters), encoding="utf-8"
    )


def load_cached_posts() -> list[dict]:
    if not POSTS_JSONL.exists():
        raise FileNotFoundError(f"No cached posts at {POSTS_JSONL}")
    posts = []
    for line in POSTS_JSONL.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        posts.append(json.loads(line))
    converted = []
    for post in posts:
        converted.append(
            {
                "id": post["id"],
                "title": {"rendered": post["title"]},
                "date": post["date"],
                "link": post["url"],
                "content": {"rendered": Path(post["text_path"]).read_text(encoding="utf-8")},
                "excerpt": {"rendered": ""},
                "_embedded": {
                    "wp:term": [
                        [{"name": name, "taxonomy": "category"} for name in post.get("categories", [])],
                        [{"name": name, "taxonomy": "post_tag"} for name in post.get("tags", [])],
                    ]
                },
            }
        )
    return converted


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Build archive-level source-mining artifacts for legacy Architrino WordPress posts."
    )
    parser.add_argument("--write", action="store_true", help="write /tmp artifacts and tracked markdown reports")
    parser.add_argument("--use-cache", action="store_true", help="use cached /tmp post artifacts instead of fetching")
    parser.add_argument("--limit", type=int, default=None, help="limit posts for test runs")
    parser.add_argument("--per-page", type=int, default=100, help="WordPress API page size")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    status_map = load_library_statuses()
    if args.use_cache:
        api_posts = load_cached_posts()
    else:
        api_posts = fetch_posts(per_page=args.per_page, limit=args.limit)
    posts = build_post_records(api_posts, status_map)
    cards = [card for post in posts for card in split_into_cards(post)]
    clusters = cluster_cards(cards)
    corpus_docs = build_corpus_index()
    score_coverage(clusters, corpus_docs)
    clusters.sort(
        key=lambda c: (
            -cluster_current_use_score(c),
            c["topic_title"],
            c["label"],
        )
    )
    for index, cluster in enumerate(clusters, start=1):
        cluster["rank"] = index

    if args.write:
        TMP_ROOT.mkdir(parents=True, exist_ok=True)
        write_tmp_artifacts(posts, cards, clusters)
        write_reports(posts, cards, clusters)

    print(
        textwrap.dedent(
            f"""
            Legacy Architrino archive mining pass
            Posts: {len(posts)}
            Idea cards: {len(cards)}
            Clusters: {len(clusters)}
            Reports: {REPORT_DIR if args.write else 'not written; pass --write'}
            Tmp artifacts: {TMP_ROOT if args.write else 'not written; pass --write'}
            """
        ).strip()
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
