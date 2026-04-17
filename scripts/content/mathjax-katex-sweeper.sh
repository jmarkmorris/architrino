#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-.}"

if ! command -v rg >/dev/null 2>&1; then
  echo "rg not found; install ripgrep or pass file list manually." >&2
  exit 1
fi

files=$(rg --files -g "*.md" "$ROOT")

for f in $files; do
  perl -0pi -e '
    my %sup = ("⁰"=>"0","¹"=>"1","²"=>"2","³"=>"3","⁴"=>"4","⁵"=>"5","⁶"=>"6","⁷"=>"7","⁸"=>"8","⁹"=>"9","⁻"=>"-");
    sub sup_to_ascii {
      my ($s) = @_;
      $s =~ s/([⁰¹²³⁴⁵⁶⁷⁸⁹⁻])/$sup{$1}/g;
      return $s;
    }

    s/â/-/g;
    s/â/--/g;
    s/â/-/g;
    s/â/"/g;
    s/â/"/g;
    s/â/'"'"'/g;
    s/â¢/*/g;
    s/â¦/.../g;
    s/â£/g/g;
    s/â/->/g;
    s/â/<->/g;
    s/â¤/<=/g;
    s/â¥/>=/g;
    s/â€œ/"/g;
    s/â€ť/"/g;
    s/â€ś/"/g;
    s/â€™/'"'"'/g;
    s/â†’/->/g;
    s/â†/<->/g;
    s/Â±/+\/-/g;
    s/Â½/1\/2/g;
    s/Ã—/x/g;
    s/ÃƒÂ×/x/g;
    s/ÃƒÂ—/x/g;
    s/ÃƒÂ‰/E/g;
    s/Ã‰/E/g;
    s/Ã©/e/g;
    s/Ã¶/o/g;
    s/Ã–/O/g;
    s/Ã¼/u/g;
    s/Ãœ/U/g;
    s/Ã¡/a/g;
    s/Ã /a/g;
    s/Ã¨/e/g;
    s/Ãª/e/g;
    s/Ã¢/a/g;
    s/Ã®/i/g;
    s/Ã¯/i/g;
    s/Ã´/o/g;
    s/Ã±/n/g;
    s/Ã§/c/g;
    s/Â//g;

    s/€Â“/-/g;
    s/€Â“A/-/g;
    s/†Â’/->/g;

    s/ÃŽÂµ/\\epsilon/g;
    s/ÃŽÂº/\\kappa/g;
    s/ÃƒÂŽÂµ/\\epsilon/g;
    s/ÃƒÂŽÂº/\\kappa/g;

    s/脙聣lie/Elie/g;
    s/脙聣/Elie/g;
    s/脙聴/x/g;
    s/€聯/-/g;
    s/聠聮/->/g;
    s/脦碌/\\epsilon/g;
    s/脙聨碌/\\epsilon/g;
    s/脦潞/\\kappa/g;
    s/脙聨潞/\\kappa/g;

    s/\\\[/\$\$/g;
    s/\\\]/\$\$/g;
    s/\$\\Lambda\$CDM/\$\\Lambda\\mathrm{CDM}\$/g;
    s/ΛCDM/\$\\Lambda\\mathrm{CDM}\$/g;
    s/H₀/\$H_0\$/g;
    s/σ₈/\$\\sigma_8\$/g;
    s/S₈/\$S_8\$/g;
    s/t₀/\$t_0\$/g;
    s/s₀/\$s_0\$/g;

    s/1\/r²/1\/r^2/g;
    s/1\/r³/1\/r^3/g;

    s/\^\{\}//g;

    s/10([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)/"10^{" . sup_to_ascii($1) . "}"/ge;
    s/([0-9])([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)/"$1^{" . sup_to_ascii($2) . "}"/ge;
  ' "$f"
done

inline_compat_matches="$(
  rg -n --glob "*.md" '\\\\\\(|\\\\\\)' "$ROOT" \
    --glob '!AGENTS.md' \
    --glob '!content/markdown/aaa/archie/academic-style-guide.md' \
    --glob '!content/markdown/aaa/archie/mathematics-style-guide.md' \
    || true
)"

if [[ -n "$inline_compat_matches" ]]; then
  echo "warning: inline \\(...\\) delimiters remain in authored markdown." >&2
  echo 'prefer $...$ for inline math unless a renderer-specific validated case requires otherwise.' >&2
  echo "review these occurrences:" >&2
  printf '%s\n' "$inline_compat_matches" >&2
fi

exit 0
