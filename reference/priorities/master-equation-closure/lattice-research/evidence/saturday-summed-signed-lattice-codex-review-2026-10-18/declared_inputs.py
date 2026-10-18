"""Evaluate the frozen independent reference using the subject's rounded inputs.

Only the decimal input table is taken from the peer packet. No peer code import.
The independent reference was authored and first run before inspecting peer code.
"""
import signed_reference as ref
from fractions import Fraction as F
import json

if __name__=='__main__':
    ref.run()  # All recorded known controls precede this input-table evaluation.
    original=ref.chart
    table={F(1,16):dict(eta='1.40062',s1='.09459',mu='.83946',c20='8.7669',c11='4.3806',c02='3.4784',c30='44.3076',c21='29.9313',c12='21.0215',c03='12.5491',E='57.346'),
           F(1,20):dict(eta='1.30935',s1='.08842',mu='.83528',c20='8.3344',c11='4.032',c02='3.0877',c30='41.762',c21='27.3783',c12='18.6112',c03='10.7057',E='53.672')}
    def declared(rho):
        par=original(rho)
        for k,v in table[rho].items():
            assert F(v)>=par[k],(rho,k)
            par[k]=F(v)
        return par
    ref.chart=declared
    p,parts,total=ref.evaluate(F(1,16),F('.0277'),F('22.5')*F('.0277')**2)
    assert total<F('.0130739')
    p20,parts20,total20=ref.evaluate(F(1,20),F('.0211'),F('.01424672'))
    assert total20<F('.0056628')
    eps=F('.00646'); d=F('.0277'); theta=F('.9308')
    log_hi=ref.log_bounds(d/(eps*F('.1144')))[1]
    # Rationalize the exponent enclosure before its Taylor evaluation.
    # This avoids enormous intermediate fractions from composing series.
    assert theta*log_hi<F('3.4')
    linear_hi=eps*F('.0763')*ref.exp_bounds(F('3.4'))[1]
    correction=F('22.5')*d*d
    assert linear_hi<correction
    assert F('.1144')*F('2.8953')/F('2.6952')<F('.1229')
    assert F('2.8953')/F('2.6952')<F('1.0743')
    print('DECLARED INPUTS AND UNIFORM GROWTH COMPARISON',flush=True)
    print(json.dumps(dict(new_total=float(total),new_parts=list(map(float,parts)),old_total=float(total20),old_parts=list(map(float,parts20)),growth_at_epsmax_upper=float(linear_hi-correction),growth_linear_upper=float(linear_hi),largest_component='half-odd, then brackets, then receiver cubic'),indent=2))
