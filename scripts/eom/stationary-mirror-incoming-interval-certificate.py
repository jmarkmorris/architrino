#!/usr/bin/env python3
"""Independent interval method-of-steps witness, never a production evolution.
Incoming mirror chart only; stops before first speed equality. Each whole-panel
Taylor remainder bounds A' by the differentiated delayed equation. Binary64
operations round outward; exact Fraction input conversion. No EOM imports.
"""
import argparse, bisect, hashlib, json, math, time
from fractions import Fraction as F
from pathlib import Path

INF=float('inf')
def down(x): return math.nextafter(x,-INF)
def up(x): return math.nextafter(x,INF)
class I:
    __slots__=('lo','hi')
    def __init__(self,lo,hi=None):
        self.lo=float(lo); self.hi=self.lo if hi is None else float(hi)
        assert self.lo<=self.hi and math.isfinite(self.lo) and math.isfinite(self.hi)
    @staticmethod
    def exact(q):
        q=F(q); x=float(q); f=F(x)
        return I(down(x) if f>q else x,up(x) if f<q else x)
    def __add__(self,b):
        b=iv(b); return I(down(self.lo+b.lo),up(self.hi+b.hi))
    __radd__=__add__
    def __neg__(self): return I(-self.hi,-self.lo)
    def __sub__(self,b): return self+-iv(b)
    def __rsub__(self,b): return iv(b)+-self
    def __mul__(self,b):
        b=iv(b); v=[self.lo*b.lo,self.lo*b.hi,self.hi*b.lo,self.hi*b.hi]
        return I(down(min(v)),up(max(v)))
    __rmul__=__mul__
    def __truediv__(self,b):
        b=iv(b); assert b.lo>0 or b.hi<0
        v=[self.lo/b.lo,self.lo/b.hi,self.hi/b.lo,self.hi/b.hi]
        return I(down(min(v)),up(max(v)))
    def __rtruediv__(self,b): return iv(b)/self
    def intersect(self,b): return I(max(self.lo,b.lo),min(self.hi,b.hi))
    def row(self): return [repr(self.lo),repr(self.hi)]
def iv(x): return x if isinstance(x,I) else I(x)
ZERO=I(0); HALF=I(.5)
GEXACT=F('10.304229970992187')*F('0.1666666666666666666666666666666667')**2
G=I.exact(GEXACT)

class Incoming:
    def __init__(self,power):
        assert 8<=power<=20
        self.h=2.0**(-power); self.g=G
        self.ts=[0.0]; self.ys=[HALF]; self.us=[ZERO]
        self.a0=[]; self.ap=[]
        self.hlo=[.5]; self.hhi=[.5]
        self.min_dt=1.0; self.min_radius=1.0
        self.max_source=0.0
    def evaluate(self,s):
        if s<0: return HALF,ZERO,ZERO
        if s==self.ts[-1]:
            if s==0: return HALF,ZERO,self.g
            aa=self.a0[-1]+self.ap[-1]*self.h
            return self.ys[-1],self.us[-1],aa
        j=max(0,min(len(self.a0)-1,bisect.bisect_right(self.ts,s)-1))
        d=I(s)-self.ts[j]
        y=self.ys[j]-self.us[j]*d-self.a0[j]*d*d/2-self.ap[j]*d*d*d/6
        u=self.us[j]+self.a0[j]*d+self.ap[j]*d*d/2
        a=self.a0[j]+self.ap[j]*d
        return y,I(max(0,u.lo),u.hi),I(max(0,a.lo),a.hi)
    def source_box(self,s):
        assert s.lo>=-20 and s.hi<=self.ts[-1]
        yl,ul,al=self.evaluate(s.lo); yr,ur,ar=self.evaluate(s.hi)
        # A has a right jump at release; all subsequent A are increasing.
        return I(yr.lo,yl.hi),I(max(0,ul.lo),ur.hi),I(max(0,al.lo),ar.hi)
    def source(self,z):
        if z.hi<.5:
            s=z-HALF
            assert s.lo>=-20 and s.hi<=self.ts[-1]
            return s,HALF,ZERO,ZERO
        assert z.hi<self.hlo[-1], ('source_not_completed',z.row(),self.hlo[-1])
        j=bisect.bisect_left(self.hhi,z.lo)-1
        k=bisect.bisect_right(self.hlo,z.hi)
        sl=down(z.lo-.5) if j<0 else self.ts[j]
        sh=self.ts[min(k,len(self.ts)-1)]
        s=I(sl,sh)
        for _ in range(3):
            sy,su,sa=self.source_box(s)
            d=I(1)-su
            assert d.lo>0
            m=(s.lo+s.hi)/2
            ym,_,_=self.evaluate(m)
            proposal=I(m)+(z-(I(m)+ym))/d
            s=s.intersect(proposal)
        sy,su,sa=self.source_box(s)
        return s,sy,su,sa
    def acceleration(self,t,y):
        s,sy,su,sa=self.source(t-y)
        r=y+sy; d=I(1)-su
        assert r.lo>0 and d.lo>0
        return self.g/(r*r*d),(s,sy,su,sa,r,d)
    def step(self):
        t=self.ts[-1]; y=self.ys[-1]; u=self.us[-1]; h=self.h
        assert y.lo-h>0 and u.hi<1
        a0,_=self.acceleration(I(t),y)
        # Bootstrap tube only until first u=1; source queries use completed past.
        yt=I(down(y.lo-h),y.hi)
        at,geo=self.acceleration(I(t,t+h),yt)
        ut=I(max(0,u.lo),min(1,up(u.hi+up(at.hi*h))))
        s,sy,su,sa,r,d=geo
        apr=at*(2*(ut+su)/(r*d)+sa*(1+ut)/(d*d))
        apr=I(max(0,apr.lo),apr.hi)
        yn=y-u*h-a0*h*h/2-apr*h*h*h/6
        un=u+a0*h+apr*h*h/2
        self.min_dt=min(self.min_dt,d.lo); self.min_radius=min(self.min_radius,r.lo)
        self.max_source=max(self.max_source,s.hi)
        if un.hi>=1:
            return {'a0':a0.row(),'acceleration_tube':at.row(),'acceleration_derivative_tube':apr.row(),
                    'trial_velocity':un.row(),'source_time':s.row(),'source_y':sy.row(),'source_u':su.row(),
                    'radius':r.row(),'dt':d.row()}
        self.a0.append(a0); self.ap.append(apr)
        self.ts.append(t+h); self.ys.append(yn); self.us.append(un)
        hh=I(t+h)+yn
        assert hh.lo>self.hlo[-1] and hh.hi>self.hhi[-1], 'nonmonotone_search_bounds'
        self.hlo.append(hh.lo); self.hhi.append(hh.hi)
        return None
    def event_box(self,cap):
        t=self.ts[-1]; y=self.ys[-1]; u=self.us[-1]
        yt=I(down(y.lo-cap),y.hi)
        acc,geo=self.acceleration(I(t,up(t+cap)),yt)
        delta=(I(1)-u)/acc
        assert delta.hi<cap and delta.lo>0
        event=I(t)+delta
        event_y=I(down(y.lo-delta.hi),up(y.hi-down(u.lo*delta.lo)))
        s,sy,su,sa,r,d=geo
        assert event_y.lo>0 and s.hi<event.lo and d.lo>0
        return {'time':event.row(),'half_position':event_y.row(),'separation':(2*event_y).row(),
                'partner_emission':s.row(),'partner_distance':r.row(),'partner_transmitter_factor':d.row(),
                'acceleration':acc.row(),'cap':repr(cap),'delta':delta.row(),
                'ordered_partner_roots':[1,1],'ordered_positive_delay_self_roots':[0,0],
                'diagonal':'excluded','scope':'continuous_interval_incoming_chart',
                'census_method':'monotone_partner_residual_and_strict_self_integral_on_complete_incoming_history'}
    def result(self):
        return {'accepted_panels':len(self.a0),'accepted_time':repr(self.ts[-1]),
                'y':self.ys[-1].row(),'u':self.us[-1].row(),'min_transmitter_factor':repr(self.min_dt),
                'min_partner_distance':repr(self.min_radius),'max_source_time':repr(self.max_source)}

def known():
    # Exact rational arithmetic checks precede any dynamical input.
    x=I.exact(F(1,3)); y=I.exact(F(2,7))
    for box,q in [(x+y,F(13,21)),(x-y,F(1,21)),(x*y,F(2,21)),(x/y,F(7,6))]:
        assert F(box.lo)<=q<=F(box.hi)
    # Constant acceleration: u0=1/4,A=3/2 => first u=1 after exactly1/2.
    delta=(I(1)-I(.25))/I(1.5)
    assert F(delta.lo)<=F(1,2)<=F(delta.hi)
    assert not (delta.lo<=.6<=delta.hi)
    # Stationary source exact inverse H(s)=s+1/2.
    m=Incoming(10); s,sy,su,sa=m.source(I(.125))
    assert s.lo<=-.375<=s.hi and sy.lo==.5 and sy.hi==.5 and su.hi==0
    # Held-source analytic r=cos²theta, t=(theta+sin theta cos theta)/sqrt(2G).
    import mpmath as mp
    mp.mp.dps=80; gg=mp.mpf(GEXACT.numerator)/GEXACT.denominator
    for _ in range(256): assert m.step() is None
    errors=[]
    for j in [0,16,64,128,256]:
        tt=mp.mpf(m.ts[j]); theta=mp.findroot(lambda q:q+mp.sin(q)*mp.cos(q)-mp.sqrt(2*gg)*tt,(0,.4))
        yy=mp.cos(theta)**2-mp.mpf('.5'); uu=mp.sqrt(2*gg)*mp.tan(theta)
        for box,value in [(m.ys[j],yy),(m.us[j],uu)]:
            assert mp.mpf(box.lo)<=value<=mp.mpf(box.hi),(j,box.row(),str(value))
        errors.append({'time':repr(m.ts[j]),'y':m.ys[j].row(),'u':m.us[j].row()})
    def exact_source(z):
        if z<mp.mpf('.5'): return z-mp.mpf('.5'),mp.mpf('.5'),mp.mpf('0'),mp.mpf('0')
        theta=mp.findroot(lambda q:(q+mp.sin(q)*mp.cos(q))/mp.sqrt(2*gg)+mp.cos(q)**2-mp.mpf('.5')-z,(0,.4))
        ss=(theta+mp.sin(theta)*mp.cos(theta))/mp.sqrt(2*gg)
        yy=mp.cos(theta)**2-mp.mpf('.5'); uu=mp.sqrt(2*gg)*mp.tan(theta)
        return ss,yy,uu,gg/(yy+mp.mpf('.5'))**2
    inverse_controls=[]
    for z in [I(.625),I(.5-2**-13,.5+2**-13)]:
        boxes=m.source(z)
        for zz in [z.lo,z.hi]:
            for box,value in zip(boxes,exact_source(mp.mpf(zz))):
                assert mp.mpf(box.lo)<=value<=mp.mpf(box.hi),(z.row(),box.row(),str(value))
        inverse_controls.append({'image':z.row(),'source':[box.row() for box in boxes]})
    return {'status':'passed','known':'rational_operations_constant_acceleration_stationary_inverse_held_source_moving_inverse_release_join','samples':errors,'inverse_controls':inverse_controls}

def main():
    p=argparse.ArgumentParser(); p.add_argument('--known',action='store_true'); p.add_argument('--power',type=int,default=12)
    p.add_argument('--through',type=float,default=1.58); p.add_argument('--known-receipt'); p.add_argument('--output',required=True)
    a=p.parse_args(); start=time.monotonic(); sha=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    if a.known: out=known()
    else:
        receipt=json.loads(Path(a.known_receipt).read_text()); assert receipt['status']=='passed'
        m=Incoming(a.power); stopped=None; heartbeat=time.monotonic()
        while m.ts[-1]<a.through:
            stopped=m.step()
            if stopped: break
            if time.monotonic()-heartbeat>10:
                print(json.dumps({'progress':m.result(),'wall_seconds':time.monotonic()-start}),flush=True); heartbeat=time.monotonic()
        out={'status':'bounded_incoming_event' if stopped else 'requested_end','step':repr(m.h),'state':m.result(),'stopping_panel':stopped,
             'event':m.event_box(max(m.h*2, .0005)) if stopped else None,
             'strength_exact':str(GEXACT),'proof':'integrated_whole_panel_A_prime_remainder','eom_imports':False}
        out['trajectory']=[{'time':repr(t),'y':y.row(),'u':u.row()} for t,y,u in zip(m.ts,m.ys,m.us)]
    out.update(source_sha256=sha,wall_seconds=time.monotonic()-start)
    Path(a.output).write_text(json.dumps(out,indent=2)+'\n'); print(json.dumps({k:v for k,v in out.items() if k!='trajectory'}),flush=True)
if __name__=='__main__': main()
