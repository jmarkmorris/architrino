"""Source-bound replay of frozen references; reproducibility, not independence."""
import argparse, hashlib, importlib.util, json
from datetime import datetime, timezone
from pathlib import Path
BASE=Path(__file__).parent
OUT=Path('.local-data/master-equation-closure/binary-research/alternatives-screen-2026-10-05/adjudication')

def load(name):
    path=BASE/f'alternatives-screen-2026-10-05-independent-{name}.py'
    spec=importlib.util.spec_from_file_location('audit_'+name,path)
    module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
    return module,hashlib.sha256(path.read_bytes()).hexdigest()

def main(known):
    circle,ch=load('circle');cartesian,th=load('cartesian')
    hashes={'circle':ch,'cartesian':th}
    result={'utc':datetime.now(timezone.utc).isoformat(),'source_sha256':hashes,'grade':'source-bound reproduction of frozen references, not independent scientific evidence'}
    if known:
        result['circle']=circle.known(); result['cartesian']=cartesian.known()
        assert result['circle']['passed'] and result['cartesian']['passed']
        name='replay-known.json'
    else:
        earlier=json.loads((OUT/'replay-known.json').read_text())
        assert earlier['source_sha256']==hashes
        for tag,module,receipt in [('circle',circle,'circle-balance.json'),('cartesian',cartesian,'cartesian-target.json')]:
            actual=module.target();expected=json.loads((module.OUT/receipt).read_text())
            assert actual==expected
            result[tag]={'matches_retained_json_exactly':True,'receipt_sha256':hashlib.sha256((module.OUT/receipt).read_bytes()).hexdigest(),'output':actual}
        name='replay-target.json'
    OUT.mkdir(parents=True,exist_ok=True);path=OUT/name;assert not path.exists()
    path.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({key:value for key,value in result.items() if key not in ['circle','cartesian']},indent=2))
    print('Known controls passed' if known else 'Both target JSON values equal retained receipts exactly')

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--known',action='store_true');parser.add_argument('--target',action='store_true');a=parser.parse_args();assert a.known!=a.target
    main(a.known)
