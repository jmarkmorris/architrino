#!/bin/bash
# Export one commit's solver, driver and Borg app sources into a task-owned scratch directory (git archive; no worktree),
# build the EOM solver there, and run that commit's own unmodified six-path refinement ladder.
# usage: snapshot_run.sh <commit>
set -u
ROOT=/Users/markmorris/vibe/architrino
C=$1
S=$ROOT/.tmp/saturday-serial/i3/snap-$C
if [ ! -d "$S" ]; then
  mkdir -p "$S" && (cd $ROOT && git --no-optional-locks archive "$C" src/eom scripts/eom src/apps package.json | tar -x -C "$S") || { echo "export failed"; exit 2; }
fi
if [ -f "$S/src/apps/borg/data/certified-budget-identities.v1.json" ] && [ ! -f "$S/content/generated/borg/certified-budget-identities.v1.js" ]; then mkdir -p "$S/content/generated/borg" && cp $ROOT/content/generated/borg/*.js "$S/content/generated/borg/"; fi
if [ ! -x "$S/build/eom_borg_shadow_cli" ]; then
  cmake -S "$S/src/eom" -B "$S/build" -DCMAKE_BUILD_TYPE=Release > "$S/configure.log" 2>&1 && cmake --build "$S/build" --target eom_borg_shadow_cli --parallel 6 > "$S/build.log" 2>&1 || { echo "build failed"; tail -3 "$S/build.log"; exit 3; }
fi
(cd "$S" && node scripts/eom/run-borg-eom-refinement-ladder.mjs build/eom_borg_shadow_cli 6 > ladder-six.json 2> ladder-six.err); echo "driver exit=$?"
/Users/markmorris/vibe/.venv/bin/python - "$S/ladder-six.json" <<'PY'
import json,sys
try:
    d=json.load(open(sys.argv[1]))
except Exception as e:
    print('no json', e); print(open(sys.argv[1].replace('.json','.err')).read()[:600]); sys.exit(0)
print('strictControlPassed', d['strictControlPassed'], 'threadParity', d['deterministicThreadParity'], 'deltas', [round(r['maximumStateDelta'],12) for r in d['refinementDeltas']])
for c in d['cases']:
    fails=[(s.get('status'), s.get('failureCode')) for g in c['diagnostics'] for s in g.get('stepFailures',[]) if s.get('status')!='accepted']
    print(' ', c['id'], c['step'], c['status'], c.get('failureCode'), [g.get('code') for g in c['diagnostics']], fails[:3])
PY
