"""Separate exact clock-chain application to frozen symbolic field derivatives."""
import copy,json
from pathlib import Path
from fractions import Fraction as Q
def column(FR,Fv,angle,R,acc,clock):
    return [(Q(FR[k])-sum(Q(Fv[k][j])*Q(acc[j]) for j in range(2))-Q(clock[1])*Q(angle[k])/Q(R))/(1+Q(clock[0])) for k in range(2)]
assert column(['0','-1/12'],[['0','0'],['0','0']],['0','0'],'2',['0','0'],['0','0'])==[0,-Q(1,12)]
assert column(['3','-2'],[['1','2'],['-1','3']],['4','6'],'2',['1','-1'],['1','2'])==[0,-2]
print('Known clock-chain rational controls passed before synthetic fixture extension.',flush=True)
base=Path('.local-data/master-equation-closure/binary-research/authorized-cases-ten-hour/reference')
old=json.loads((base/'transverse-physical-u-symbolic-controls-v1.json').read_text()); assert old['passed']
fixtures=[]
for item in old['fixtures']:
    for clock in [['0','0'],['-1/5','2/5'],item['tuple'][1:3]]:
        f=copy.deepcopy(item);f['clockV']=clock;f['label']+=' clock '+','.join(clock)
        R=f['tuple'][0];acc=f['tuple'][5:7]
        for v in f['fields'].values():
            normal=column(v['FR'],v['Fv'],v['Ftheta'],R,acc,clock)
            v['AX']=[[str(normal[k]),str(Q(v['Ftheta'][k])/Q(R))] for k in range(2)]
        fixtures.append(f)
assert fixtures[3]['fields']['q']['AX'][1][0]=='-1/12'
out={**old,'independentConstruction':old['independentConstruction']+'; separate exact prescribed-clock chain','fixtures':fixtures}
dest=base/'transverse-clock-symbolic-controls-v1.json';assert not dest.exists();dest.write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({'passed':True,'out':str(dest)}))
