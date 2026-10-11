#!/bin/bash
# Build a variant = base snapshot with selected files replaced from another snapshot (or a patch applied), then run the ladder.
# usage: variant_run.sh <name> <base-commit> <donor-commit> <file1> [file2 ...]
set -u
I3=/Users/markmorris/vibe/architrino/.tmp/saturday-serial/i3
NAME=$1; BASE=$2; DONOR=$3; shift 3
V=$I3/var-$NAME
rm -rf "$V"; mkdir -p "$V"
(cd $I3/snap-$BASE && tar -cf - --exclude build --exclude 'ladder-six.*' --exclude '*.log' . ) | tar -xf - -C "$V"
for f in "$@"; do cp "$I3/snap-$DONOR/$f" "$V/$f"; done
cmake -S "$V/src/eom" -B "$V/build" -DCMAKE_BUILD_TYPE=Release > "$V/configure.log" 2>&1 && cmake --build "$V/build" --target eom_borg_shadow_cli --parallel 6 > "$V/build.log" 2>&1 || { echo "$NAME: build failed"; grep -m3 "error" "$V/build.log"; exit 3; }
(cd "$V" && node scripts/eom/run-borg-eom-refinement-ladder.mjs build/eom_borg_shadow_cli 6 > ladder-six.json 2> ladder-six.err)
/Users/markmorris/vibe/.venv/bin/python - "$V/ladder-six.json" "$NAME" <<'PY'
import json,sys
d=json.load(open(sys.argv[1])); c=d['cases'][0]
fails=[s.get('failureCode','')[:60] for g in c['diagnostics'] for s in g.get('stepFailures',[]) if s.get('status')!='accepted']
print(sys.argv[2], '| step 0.01:', c['status'], [g.get('code') for g in c['diagnostics']], '| strict', d['strictControlPassed'], '| other rows', [x['status'] for x in d['cases'][1:]], '| deltas', [float('%.4g'%r['maximumStateDelta']) for r in d['refinementDeltas']], '| rejected:', len(fails), fails[:1])
PY
