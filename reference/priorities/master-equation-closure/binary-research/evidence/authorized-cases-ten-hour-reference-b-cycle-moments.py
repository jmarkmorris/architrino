import sympy as S,json,sys
c,e=S.symbols('c e');w=1+e*c;P2=e**2*(1-c*c)
def mean(z):
    ans=0
    for (k,),a in S.Poly(S.expand(z),c).terms():
        if k%2==0:ans+=a*S.binomial(k,k//2)/2**k
    return S.factor(ans)
if sys.argv[1]=='known':
    assert mean(1)==1 and mean(c)==0 and mean(c*c)==S.Rational(1,2) and mean(c**4)==S.Rational(3,8)
    print(json.dumps({'passed':True,'controls':['constant mean one','odd cosine mean zero','cosine squared mean one half','cosine fourth mean three eighths']}));sys.exit()
k5=S.Rational(2,15)*w*(54*P2-21*w*w+2*w)
I5=S.Rational(4,5)*P2*w*(-8*P2+17*w*w+w)+(P2+2*w*(w-1))*k5
print(json.dumps({'meanK5':str(mean(k5)),'meanI5':str(mean(I5))},indent=2))
