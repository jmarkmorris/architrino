"""Inject a capture failure after the private receipt exists; no oracle changes."""
import sys
from pathlib import Path
bridge_path=Path('scripts/eom/execute-f5-prehistory-handoff.py').resolve()
__file__=str(bridge_path)
code=compile(bridge_path.read_bytes(),str(bridge_path),'exec')
namespace={'__name__':'f5_failure_control','__file__':str(bridge_path)}
exec(code,namespace)
output=Path('.local-data/braid-analysis/f5-current-handoff-post-write-control').resolve()
original=namespace['Bound'].scan
injected=[]
def scan(bound,collect=False):
    if (output/'.pending-stage.json').exists():
        injected.append(True)
        raise ValueError('injected post-write capture failure')
    return original(bound,collect)
namespace['Bound'].scan=scan
sys.argv=['bridge','--stage','produce','--plan','reference/priorities/development-process-review/evidence/f5-current-handoff/current-plan.json','--plan-sha256','c49985786aa359685e6f8b5b08cf6000e9ffed9198b346a9156731ab1280885e','--bridge-sha256','90541a35f5609388dd16c1f91539909629e3d3da86b7f5699ae574dc2af89211','--out-dir',str(output)]
status=namespace['main']()
assert status==1 and injected and (output/'.pending-stage.json').is_file()
assert not (output/'stage.json').exists()
print('Post-write capture failure rejected; no public stage receipt; private diagnostic retained.')
