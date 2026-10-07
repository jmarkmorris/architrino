"""Cache composition with controls kept outside pending scientific binding."""
import argparse,importlib.util,json
from pathlib import Path
HERE=Path(__file__).resolve().parent
sp=importlib.util.spec_from_file_location('cached_entry',HERE/'overnight2-d-cached-source-admission.py');base=importlib.util.module_from_spec(sp);sp.loader.exec_module(base)
run=base.run;old_bind=run.bind

def bind(receipt,alternates=None):
    return old_bind(receipt,alternates)+[Path(__file__).resolve()]

def controls():
    base.old_controls();base.cache.controls(base.front);base.state['cache']=None
    # The inherited global controls finish with ready=True. When main has
    # captured a real domain, the next binding must be that domain itself.
    if base.base.context['expected'] is None:
        paths=bind(dict(dependencies=[]))
        if Path(__file__).resolve()not in paths or HERE/'overnight2-d-cached-source-admission.py'not in paths:raise RuntimeError('guarded cache entry bindings')
    print(json.dumps(dict(control='cache controls preserve pending real-domain binding; entry bindings checked in control-only context',status='PASS')),flush=True)

run.controls=controls;run.bind=bind
if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('mode',choices=['controls','target']);a.add_argument('--tag',default='mesh-reference-t67');a.add_argument('--domain',default='mesh-region-t67');a.add_argument('--residual',default='adaptive-residual-mesh-first80');a.add_argument('--resume');a.add_argument('--cells',type=int,default=80);a.add_argument('--alpha',default='.2');a.add_argument('--minimum-trial',type=float,default=1e-12);a.add_argument('--velocity-limit',type=float,default=.001);a.add_argument('--wall',type=float,default=1500.);a.add_argument('--output',default='guarded-cache-admission-pilot');base.main(a.parse_args())
