"""Capture disposable pilot execution output identities; no source modification."""
import argparse
import hashlib
import json
from pathlib import Path


def identity(raw):
    return {'sha256':hashlib.sha256(raw).hexdigest(),'bytes':len(raw),'newlineCount':raw.count(b'\n')}

if __name__=='__main__':
    assert identity(b'abc')=={'sha256':'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad','bytes':3,'newlineCount':0}
    assert identity(b'a\nb\n')['newlineCount']==2
    ap=argparse.ArgumentParser();ap.add_argument('--run-dir',required=True);a=ap.parse_args();root=Path(a.run_dir).resolve()
    names=['calculation.stdout.json','calculation.stderr.log','test.stdout.log','test.stderr.log']
    names+=sorted(str(p.relative_to(root)) for p in (root/'cases').glob('*/test.stdout.log'))
    report={'schema':'option-b-real-chain-disposable-artifacts/v1','knownCase':'passed before reading outputs',
            'owner':'development-process-review / Option B bounded pilot',
            'claimBoundary':'bounded scalar-gradient execution and eight controlled metadata/source cases; no production acceptance',
            'sourceManifest':'manifest.json','resultReport':'report.json',
            'reproduction':'Run run_pilot.py using the exact commit and supported environment documented in the analysis report, with a new empty work-root; then run capture_artifacts.py --run-dir <that directory>.',
            'retention':'raw outputs are disposable scratch data; exact timing bytes need not reproduce; retain compact report and instruments',
            'artifacts':[{'relativePath':n,'observedPath':str(root/n),**identity((root/n).read_bytes())} for n in names]}
    (root/'artifacts.json').write_text(json.dumps(report,indent=2)+'\n')
    print('PASS: known identities; captured '+str(len(names))+' output artifacts')
