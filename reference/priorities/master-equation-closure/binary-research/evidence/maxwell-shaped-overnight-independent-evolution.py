"""Independent adaptive DOP853 comparison for neutral delayed mirror pairs.

Source X is one seventh-degree DOP853 dense position polynomial. Source V and
A are its first/second derivatives, not the solver's separate V dense output.
History seams and interpolation defects are measured approximations. This is
not the EOM solver and does not certify continuous solution error.
"""
import argparse
import bisect
import importlib.util
import json
import math
import time
from pathlib import Path
import numpy as np
from scipy.integrate import DOP853

_response_path=Path(__file__).with_name('maxwell-shaped-overnight-independent-response.py')
_spec=importlib.util.spec_from_file_location('independent_response', _response_path)
response=importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(response)


class PositionPolynomial:
    def __init__(self, dense):
        self.t0, self.t1 = dense.t_old, dense.t
        self.h=self.t1-self.t0
        self.dense=dense
        coefficients=np.zeros((1,3))
        for i, f in enumerate(reversed(dense.F)):
            coefficients[0]+=f[:3]
            extended=np.zeros((len(coefficients)+1,3))
            if i%2==0:
                extended[1:]=coefficients
            else:
                extended[:-1]=coefficients
                extended[1:]-=coefficients
            coefficients=extended
        coefficients[0]+=dense.y_old[:3]
        self.coefficients=coefficients
        self.first=np.arange(1,len(coefficients))[:,None]*coefficients[1:]/self.h
        self.second=np.arange(1,len(self.first))[:,None]*self.first[1:]/self.h
        self.speed_upper=self.bernstein_norm_bound(self.first)
        self.acceleration_upper=self.bernstein_norm_bound(self.second)

    @staticmethod
    def bernstein_norm_bound(coefficients):
        degree=len(coefficients)-1
        controls=np.zeros_like(coefficients)
        for i in range(degree+1):
            for k in range(i+1):
                controls[i]+=coefficients[k]*math.comb(i,k)/math.comb(degree,k)
        return float(max(np.linalg.norm(z) for z in controls))

    def at(self, t):
        z=(t-self.t0)/self.h
        return tuple(np.array([np.polynomial.polynomial.polyval(z,c[:,k]) for k in range(3)])
                     for c in [self.coefficients,self.first,self.second])


class History:
    def __init__(self, past):
        self.past=past
        self.segments=[]
        self.ends=[]
        self.max_v_seam=0.
        self.max_a_seam=0.
        self.max_solver_velocity_defect=0.

    def at(self, t):
        if t<=0:
            return self.past(t)
        if not self.ends or t>self.ends[-1]+2e-12*max(1.,t):
            raise RuntimeError('source request ahead of accepted history')
        index=min(bisect.bisect_left(self.ends,t),len(self.ends)-1)
        return self.segments[index].at(t)

    def append(self, dense):
        segment=PositionPolynomial(dense)
        if self.segments:
            prior=self.segments[-1].at(segment.t0)
        else:
            prior=self.past(0.)
        right=segment.at(segment.t0)
        self.max_v_seam=max(self.max_v_seam,float(np.linalg.norm(prior[1]-right[1])))
        self.max_a_seam=max(self.max_a_seam,float(np.linalg.norm(prior[2]-right[2])))
        for z in [0.,.25,.5,.75,1.]:
            t=segment.t0+z*segment.h
            self.max_solver_velocity_defect=max(self.max_solver_velocity_defect,
                float(np.linalg.norm(segment.at(t)[1]-dense(t)[3:6])))
        self.segments.append(segment)
        self.ends.append(segment.t1)
        return segment


def prepare(beta, law):
    assert beta in [.1,.2,.3] and law in ['E','full']
    r=1/(4*beta*beta)
    omega=beta/r
    def circle(t):
        angle=omega*t
        n=np.array([math.cos(angle),math.sin(angle),0.])
        v=beta*np.array([-math.sin(angle),math.cos(angle),0.])
        return r*n,v,-beta*omega*n
    x0,u0,a_circle=circle(0.)
    def source(s):
        return tuple(-z for z in circle(s))
    hit=response.reference(source,x0,0.,u0,beta)
    launch_a=-hit[law]
    da=launch_a-a_circle
    an=float(np.linalg.norm(da))
    delay=-hit['S']
    delta=min(delay/8,(1-beta)/(12*an),math.sqrt(r/(8*an))) if an else delay/8
    def past(t):
        x,v,a=circle(t)
        if t<=-delta:
            return x,v,a
        z=t/delta
        f=.5*delta*delta*z*z*(1+z)**3
        fp=delta*z*(1+z)**2*(1+2.5*z)
        fpp=1+9*z+18*z*z+10*z**3
        return x+da*f,v+da*fp,a+da*fpp
    specification=dict(K=1,cf=1,members=2,polarities=[1,-1],geometry='complete mirror planar',
                       law=law,beta=beta,r=r,omega=omega,delta=delta,da=da,
                       past_speed_bound=(1+3*beta)/4,
                       past_separation_floor=15*r/8,
                       past='complete circle through -delta; polynomial endpoint patch through zero',
                       root_support='all ordinary partner roots; no positive-delay self roots by theorem',
                       launch_a=launch_a,launch=x0.tolist()+u0.tolist(),
                       stopping='first monitored guard, separated-domain loss, source-ahead request or horizon')
    endpoint_error=float(np.linalg.norm(past(0.)[2]-launch_a))
    assert endpoint_error<1e-13
    return past,specification


def coupled_hit(history,x,u,t,q_guard,root_tolerance):
    delay=2*float(np.linalg.norm(x))
    assert delay>0
    for iteration in range(10000):
        s=t-delay
        xs,vs,aas=history.at(s)
        rv=x+xs
        R=float(np.linalg.norm(rv))
        bound=abs(R-delay)/(1-q_guard)
        if bound<=root_tolerance*max(1.,delay):
            n=rv/R
            D=1+float(np.dot(n,vs))
            assert D>0
            geometry=dict(S=s,R=R,n=n,v=-vs,a=-aas,D=D,
                          root_residual=R-delay,root_error_estimate=bound,
                          root_iterations=iteration+1)
            return {**geometry,**response.response_at_root(x,u,geometry)}
        delay=R
    raise RuntimeError('complete contraction did not converge')


def evolve(beta,law,horizon,max_step,rtol,atol,q_guard=.98,root_tolerance=2e-13,sample_every=.5):
    past,specification=prepare(beta,law)
    history=History(past)
    y0=np.concatenate(past(0.)[:2])
    def rhs(t,y):
        hit=coupled_hit(history,y[:3],y[3:],t,q_guard,root_tolerance)
        return np.concatenate((y[3:],-hit[law]))
    solver=DOP853(rhs,0.,y0,horizon,rtol=rtol,atol=atol,max_step=max_step)
    records=[]
    max_defect=0.
    stop='horizon'
    start=time.monotonic()
    last_sample=-sample_every
    while solver.status=='running':
        radius=float(np.linalg.norm(solver.y[:3]))
        solver.max_step=min(max_step,.2*2*radius/(1+q_guard))
        solver.step()
        if solver.status=='failed':
            stop='DOP853 step failed'
            break
        segment=history.append(solver.dense_output())
        for z in [0.,.25,.5,.75,1.]:
            t=segment.t0+z*segment.h
            x,u,a=segment.at(t)
            hit=coupled_hit(history,x,u,t,q_guard,root_tolerance)
            defect=float(np.linalg.norm(a+hit[law]))
            max_defect=max(max_defect,defect)
        t=solver.t
        x,u,a=history.at(t)
        hit=coupled_hit(history,x,u,t,q_guard,root_tolerance)
        radius=float(np.linalg.norm(x))
        speed=float(np.linalg.norm(u))
        vr=float(np.dot(x,u)/radius)
        vt=float((x[0]*u[1]-x[1]*u[0])/radius)
        if t-last_sample>=sample_every or speed>=q_guard or t==horizon:
            records.append(dict(t=t,x=x,u=u,a=a,radius=radius,separation=2*radius,
                                speed=speed,radial_velocity=vr,tangential_velocity=vt,
                                angle=math.atan2(x[1],x[0]),angular_rate=vt/radius,
                                S=hit['S'],R=hit['R'],D=hit['D'],
                                delayed_source_acceleration=hit['a'],
                                root_residual=hit['root_residual'],
                                root_error_estimate=hit['root_error_estimate'],
                                partner_roots=1,self_roots=0,
                                segment_speed_upper=segment.speed_upper))
            last_sample=t
        if segment.speed_upper>=q_guard:
            stop='retained polynomial speed bound reaches monitored guard'
            break
        if radius<=1e-8:
            stop='positive separation guard'
            break
    return dict(specification=specification,numerical_contract=dict(method='DOP853',
                history='seventh-degree position dense polynomial; V=dX/dt; A=d2X/dt2',
                rtol=rtol,atol=atol,max_step=max_step,q_guard=q_guard,
                root_tolerance=root_tolerance,sample_every=sample_every),
                stop=stop,t=solver.t,steps=len(history.segments),rhs_evaluations=solver.nfev,
                wall_seconds=time.monotonic()-start,records=records,
                max_equation_defect_sampled=max_defect,
                max_velocity_seam=history.max_v_seam,max_acceleration_seam=history.max_a_seam,
                max_solver_velocity_defect=history.max_solver_velocity_defect,
                scope='measured floating-point reference; no continuous trajectory certificate')


def history_controls():
    records=[]
    # Known neutral delayed-acceleration equation: a(t)=exp(lambda*tau)*a(t-tau).
    lam,tau=.1,.5
    def exact(t):
        x=np.array([math.exp(lam*t),0.,0.])
        return x,lam*x,lam*lam*x
    history=History(exact)
    def rhs(t,y):
        return np.concatenate((y[3:],math.exp(lam*tau)*history.at(t-tau)[2]))
    solver=DOP853(rhs,0.,np.concatenate(exact(0.)[:2]),3.,
                  rtol=1e-12,atol=1e-13,max_step=.05)
    max_x=max_v=max_a=0.
    while solver.status=='running':
        solver.step()
        assert solver.status!='failed'
        segment=history.append(solver.dense_output())
        for z in [0.,.25,.5,.75,1.]:
            t=segment.t0+z*segment.h
            measured=segment.at(t)
            expected=exact(t)
            max_x=max(max_x,float(np.linalg.norm(measured[0]-expected[0])))
            max_v=max(max_v,float(np.linalg.norm(measured[1]-expected[1])))
            max_a=max(max_a,float(np.linalg.norm(measured[2]-expected[2])))
    assert max_x<1e-9 and max_v<1e-8 and max_a<1e-7,(max_x,max_v,max_a)
    records.append(dict(case='neutral exponential delayed source acceleration',
                        lambda_value=lam,delay=tau,horizon=3.,errors=dict(x=max_x,v=max_v,a=max_a),
                        max_velocity_seam=history.max_v_seam,
                        max_acceleration_seam=history.max_a_seam,
                        max_solver_velocity_defect=history.max_solver_velocity_defect))
    # Analytic first-window inverse-square motion from rest: eta+sin eta=2t sqrt(2k/r^3).
    r,k=2.,1.
    def rest(t):
        return np.array([r,0.,0.]),np.zeros(3),np.array([-k/r**2,0.,0.])
    def known(t):
        target=2*t*math.sqrt(2*k/r**3)
        eta=target/2
        for _ in range(10):
            eta-=(eta+math.sin(eta)-target)/(1+math.cos(eta))
        x=r*(1+math.cos(eta))/2
        v=-math.sqrt(2*k/r)*math.tan(eta/2)
        return np.array([x,0.,0.]),np.array([v,0.,0.]),np.array([-k/x**2,0.,0.])
    history=History(rest)
    def rhs(t,y):
        return np.concatenate((y[3:],np.array([-k/y[0]**2,0.,0.])))
    solver=DOP853(rhs,0.,np.concatenate(rest(0.)[:2]),.5,
                  rtol=1e-12,atol=1e-13,max_step=.025)
    maximum=np.zeros(3)
    while solver.status=='running':
        solver.step()
        assert solver.status!='failed'
        segment=history.append(solver.dense_output())
        for z in [0.,.25,.5,.75,1.]:
            t=segment.t0+z*segment.h
            measured=segment.at(t)
            expected=known(t)
            maximum=np.maximum(maximum,[np.linalg.norm(m-e) for m,e in zip(measured,expected)])
    assert max(maximum)<1e-7,maximum
    records.append(dict(case='inverse-square radial first window analytic eta reference',
                        r=r,k=k,horizon=.5,errors=maximum,
                        max_velocity_seam=history.max_v_seam,
                        max_acceleration_seam=history.max_a_seam))
    return dict(passed=True,controls=records,
                scope='known analytic controls before coupled Maxwell target use')


if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--controls-only',action='store_true')
    parser.add_argument('--beta',type=float,default=.3)
    parser.add_argument('--law',choices=['E','full'],default='E')
    parser.add_argument('--horizon',type=float,default=35.)
    parser.add_argument('--max-step',type=float,default=.05)
    parser.add_argument('--rtol',type=float,default=1e-10)
    parser.add_argument('--atol',type=float,default=1e-12)
    parser.add_argument('--guard',type=float,default=.98)
    parser.add_argument('--output',required=True)
    args=parser.parse_args()
    result=dict(known_history_controls=history_controls())
    if not args.controls_only:
        result['target']=evolve(args.beta,args.law,args.horizon,args.max_step,args.rtol,args.atol,args.guard)
    path=Path(args.output)
    path.parent.mkdir(parents=True,exist_ok=True)
    path.write_text(json.dumps(response.jsonable(result),indent=2)+'\n')
    summary=dict(passed=result['known_history_controls']['passed'])
    if 'target' in result:
        target=result['target']
        summary.update({k:target[k] for k in ['stop','t','steps','wall_seconds',
                       'max_equation_defect_sampled','max_acceleration_seam']})
    print(json.dumps(summary))
