"""Candidate-only comparison of one uniquely selected displayed maximum."""
import re

def compare(text, output):
    matches=re.findall(r'Across five step refinements, the largest component residual was \$(\d+\.\d+)\\times10\^\{(-?\d+)\}\$',text)
    if len(matches)!=1:raise ValueError('Expected exactly one displayed maximum')
    mantissa,exponent=matches[0]
    shown=float(mantissa)*10**int(exponent)
    tolerance=10**(int(exponent)-len(mantissa.split('.')[1]))/2
    actual=output['maximumAbsoluteResidualAcrossRows']
    return {'status':'pass' if abs(shown-actual)<=tolerance else 'reject','displayed':shown,'actual':actual,'tolerance':tolerance,'coverage':'one displayed maximum only'}

def preflight():
    known='Across five step refinements, the largest component residual was $2.12\\times10^{-12}$'
    assert compare(known,{'maximumAbsoluteResidualAcrossRows':2.12e-12})['status']=='pass'
    assert compare(known,{'maximumAbsoluteResidualAcrossRows':0.5})['status']=='reject'
    for text in ['',known+known]:
        try:compare(text,{'maximumAbsoluteResidualAcrossRows':2.12e-12})
        except ValueError:pass
        else:raise AssertionError('Ambiguous or missing display accepted')
    return 'PASS literal result match, wrong-result rejection, missing/duplicate rejection'
