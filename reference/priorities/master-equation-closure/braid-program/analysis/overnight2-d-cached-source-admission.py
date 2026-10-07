"""Whole-piece source-box cache inside the frozen matrix consumer only."""
import argparse,importlib.util
from pathlib import Path
HERE=Path(__file__).resolve().parent
def load(name,file):
    sp=importlib.util.spec_from_file_location(name,HERE/file);m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);return m
base=load('global_entry','overnight2-d-global-taylor-admission.py');cache=load('piece_cache','overnight2-d-piece-box-cache.py')
run=base.run;front=run.d.ad.fronts
old_matrix=run.d.matrix_region;old_boxes=front.source_boxes;old_bind=run.bind;old_controls=run.controls
state=dict(cache=None)

def source_boxes(data,nodes,H,j,s):
    if s.lo<=0:return old_boxes(data,nodes,H,j,s)
    current=state['cache']
    if current is None or current['data']is not data:
        current=cache.build(data,nodes);state['cache']=current
    return cache.boxes(current,data,nodes,j,s,front)

def matrix_region(data,nodes,H,g,separation,P,Z):
    if front.source_boxes is not old_boxes:raise RuntimeError('source-box consumer already replaced')
    front.source_boxes=source_boxes
    try:
        B,C,meta=old_matrix(data,nodes,H,g,separation,P,Z)
        meta['source_box_method']='whole-positive-piece-cache'if meta['source_interval'][0]>0 else'original-complete-source'
        return B,C,meta
    finally:front.source_boxes=old_boxes

def bind(receipt,alternates=None):
    return old_bind(receipt,alternates)+[Path(__file__).resolve(),HERE/'overnight2-d-piece-box-cache.py',HERE/'overnight2-d-dense-region.py']

def controls():
    old_controls();cache.controls(front);state['cache']=None
    if Path(__file__).resolve()not in bind(dict(dependencies=[])):raise RuntimeError('cached entry binding')

def main(args):
    try:base.main(args)
    finally:state['cache']=None;front.source_boxes=old_boxes

run.d.matrix_region=matrix_region;run.bind=bind;run.controls=controls
if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('mode',choices=['controls','target']);a.add_argument('--tag',default='mesh-reference-t67');a.add_argument('--domain',default='mesh-region-t67');a.add_argument('--residual',default='adaptive-residual-mesh-first80');a.add_argument('--resume');a.add_argument('--cells',type=int,default=80);a.add_argument('--alpha',default='.2');a.add_argument('--minimum-trial',type=float,default=1e-12);a.add_argument('--velocity-limit',type=float,default=.001);a.add_argument('--wall',type=float,default=1500.);a.add_argument('--output',default='cached-source-admission-pilot');main(a.parse_args())
