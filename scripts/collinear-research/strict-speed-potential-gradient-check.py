"""Independent scalar finite-difference check; no simulator imports."""
import json, math
from scipy.optimize import brentq
G=.2862286103053385; ell=.5

def scalar(x,t,b,w):
    f=lambda s:t-s-abs(x-(b+w*s))
    left=t-1
    while f(left)<0:left=t-2*(t-left)
    s=brentq(f,left,t,xtol=5e-15)
    return -G/math.sqrt((x-b-w*s)**2+ell**2)

def check(x,t,b,w,vr):
    eps=1e-5
    gradient=(scalar(x+eps,t,b,w)-scalar(x-eps,t,b,w))/(2*eps)
    n=math.copysign(1,x-b-w*t)
    R=abs(x-b-w*t)/(1-n*w)
    expected=-G*n*R/(R*R+ell*ell)**1.5/(1-n*w)*(1-vr*vr)
    got=-gradient*(1-vr*vr)
    return {'source_velocity':w,'receiver_velocity':vr,'acceleration_formula':expected,'negative_gradient_with_gain':got,'absolute_difference':abs(got-expected)}
# Known stationary source: derivative of -G/sqrt(x^2+ell^2).
control=check(1,0,0,0,0)
assert control['absolute_difference']<1e-9
print(json.dumps({'known_stationary_control':'passed',**control}))
for args in [(1,2,-1,.4,-.3),(-1,2,1,-.4,.3),(1,2,0,-.4,.3)]:
    r=check(*args);assert r['absolute_difference']<1e-8;print(json.dumps(r))
