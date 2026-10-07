"""Plot a closed admission receipt's whole-cell bounds; no new validation claim."""
import argparse,hashlib,json,math,os
from pathlib import Path
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[4]
OUT=ROOT/'.local-data/master-equation-closure/overnight2-d'

def series(receipt):
    records=receipt['records'];n=receipt['cells']
    if type(n)is not int or n<1 or len(records)!=n:raise ValueError('cell count')
    edges=[0.];values=[]
    for k,row in enumerate(records):
        if row['cell']!=k or not math.isfinite(row['t'])or row['t']<=edges[-1]:raise ValueError('ordered cells')
        members=row['members']
        if len(members)!=8 or [m['i']for m in members]!=list(range(8)):raise ValueError('member inventory')
        errors=[m['error_upper']for m in members]
        if any(not math.isfinite(x)or x<=0 for x in errors):raise ValueError('positive finite error bounds required')
        edges.append(row['t']);values.append(max(errors))
    if receipt['end']!=edges[-1]or receipt['velocity_error_upper']!=values[-1]:raise ValueError('endpoint mismatch')
    return edges,values

def controls():
    def row(k,t,e):return dict(cell=k,t=t,members=[dict(i=i,error_upper=e+i)for i in range(8)])
    known=dict(cells=2,end=3.,velocity_error_upper=9.,records=[row(0,1.,1.),row(1,3.,2.)])
    assert series(known)==([0.,1.,3.],[8.,9.])
    for bad in [{**known,'cells':3},{**known,'end':4.},{**known,'velocity_error_upper':8.}]:
        try:series(bad)
        except ValueError:pass
        else:raise RuntimeError('invalid plot inventory accepted')
    assert hashlib.sha256(b'abc').hexdigest()=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    print('PASS known whole-cell stairs and invalid receipt inventory, SHA256abc',flush=True)

def target(args):
    source=OUT/(args.admission+'.json');review=HERE/args.review
    raw=source.read_bytes();review_raw=review.read_bytes();receipt=json.loads(raw)
    edges,values=series(receipt)
    # A step is constant over its complete reception cell. Connecting endpoint
    # values by sloping lines would not display the certified whole-cell bound.
    cache=ROOT/'.tmp/overnight2-d/matplotlib';cache.mkdir(parents=True,exist_ok=True)
    os.environ['MPLCONFIGDIR']=str(cache)
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    fig,ax=plt.subplots(figsize=(10,5.5),layout='constrained')
    fig.patch.set_facecolor('#faf9f5');ax.set_facecolor('#ffffff')
    ax.axvspan(edges[-1],67.,color='#e8e7e3',label='Later history not admitted by this receipt')
    ax.stairs(values,edges,baseline=None,color='#146a73',linewidth=2,label='Maximum certified velocity-error bound')
    ax.axhline(.001,color='#a2532c',linestyle='--',linewidth=1,label='Selected velocity allowance: 0.001')
    ax.axvline(45.99609375,color='#876b95',linestyle=':',linewidth=1,label='Earlier coarse diagnostic limit: 45.996')
    ax.axvline(47.16796875,color='#565173',linestyle=':',linewidth=1,label='Earlier refined diagnostic limit: 47.168')
    ax.set(xlim=(0.,67.),ylim=(min(values)/2,.002),yscale='log',xlabel='Reception time (wake speed = 1)',ylabel='Whole-cell velocity-error upper bound')
    ax.set_title('Original eight-member release: admitted finite history',loc='left',fontsize=14,pad=16)
    ax.grid(axis='y',which='major',alpha=.18)
    ax.legend(loc='upper left',fontsize=8,framealpha=.95)
    ax.text(.02,-.19,f"Accepted receipt ends at {edges[-1]:.6f}. Required source cutoff: 66.976347. Conditional tail entry: 2732.383882.\nThe earlier diagnostic used another reference; its failure is not an actual-error lower bound.",transform=ax.transAxes,fontsize=8,va='top')
    png=OUT/(args.output+'.png');meta=OUT/(args.output+'.json')
    if png.exists()or meta.exists():raise ValueError('plot output exists')
    with png.open('xb')as fp:fig.savefig(fp,format='png',dpi=170)
    plt.close(fig)
    sha=lambda b:hashlib.sha256(b).hexdigest()
    result=dict(grade='visualization of recorded whole-cell bounds; no new mathematical validation',admission=str(source.relative_to(ROOT)),admission_sha256=sha(raw),review=str(review.relative_to(ROOT)),review_sha256=sha(review_raw),source_sha256=sha(Path(__file__).read_bytes()),image_sha256=sha(png.read_bytes()),cells=receipt['cells'],end=receipt['end'])
    with meta.open('x')as fp:json.dump(result,fp,indent=2);fp.write('\n')
    print(json.dumps(result),flush=True)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--admission');p.add_argument('--review');p.add_argument('--output',default='admission-final-plot');args=p.parse_args();controls()
    if args.mode=='target':target(args)
