"""Independent closed collinear source-piece comparison control only."""
from pathlib import Path
import importlib.util,hashlib,json
p=Path(__file__).with_name('authorized-cases-ten-hour-e-residual-v3.py')
assert hashlib.sha256(p.read_bytes()).hexdigest()=='1aea647e4f61c9cc9636e54119c581f6a013352930c1569e6d905ae5661cbee0'
s=importlib.util.spec_from_file_location('e_source_control',p);r=importlib.util.module_from_spec(s);s.loader.exec_module(r)
I,iv,mp=r.I,r.iv,r.mp;j=r.j
# Actual source q(S)=S^3/6 for S>=0, zero for S<=0: C2 seam.
# Extension P=0. Choose exact actual emission S=1/10 and receiver X=2.
# Then q=1/6000, v=1/200, a=1/10, T=2+1/10-1/6000.
# The extension root is T-2=599/6000; both clocks and responses are exact.
R=I(2)-I(1)/6000;v=I(1)/200
actual=(1+v)/(R**2*(1-v));extension=I(1)/4
row=r.prop.jacobian(iv.mpf([r.lower(R),2]),[I(1),I(0),I(0)],[iv.mpf([0,r.upper(v)]),I(0),I(0)],[iv.mpf([0,r.upper(I(1)/10)]),I(0),I(0)],[I(0)]*3,[I(0)]*3)
coef=r.prop.source_from_partials(row,I(1)/100,I(2)-I(1)/6000,I(0),I(0))
correction=coef['Px']/6000+coef['Pv']/200+coef['Pa']/10
assert r.upper(correction)>=r.upper(abs(actual-extension))
assert r.upper(correction)<mp.mpf('.103')
clock_difference=I(1)/10-I(599)/6000
assert r.upper(clock_difference)<=r.upper((I(1)/6000)/(1-I(1)/100))
print(json.dumps({'passed':True,'case':'exact C2 cubic source versus constant extension; independently closed collinear roots and full response','actualRoot':'1/10','extensionRoot':'599/6000','exactResponseDifference':j.bound(actual-extension),'correctionUpper':j.upstr(r.upper(correction)),'clockDifference':j.bound(clock_difference)},indent=2))
