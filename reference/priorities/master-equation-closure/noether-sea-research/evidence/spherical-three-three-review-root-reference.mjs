// Independent rational-cell enclosure, not the subject's fixed-point node method.
// Trigonometry: exact rational alternating series at cell midpoint, then
// a derivative-one Lipschitz enclosure over the entire argument cell.
import assert from 'node:assert/strict';
const gcd=(a,b)=>{a=a<0n?-a:a;while(b){const r=a%b;a=b;b=r;}return a;};
function q(n,d=1n){n=BigInt(n);d=BigInt(d);assert.ok(d!==0n);if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return[n/g,d/g];}
const plus=(a,b)=>q(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const minus=(a,b)=>plus(a,[-b[0],b[1]]);
const times=(a,b)=>q(a[0]*b[0],a[1]*b[1]);
const over=(a,b)=>q(a[0]*b[1],a[1]*b[0]);
const cmp=(a,b)=>a[0]*b[1]<b[0]*a[1]?-1:a[0]*b[1]>b[0]*a[1]?1:0;
const low=(a,b)=>cmp(a,b)<0?a:b,high=(a,b)=>cmp(a,b)>0?a:b;
const zero=q(0),one=q(1),two=q(2),point=a=>[a,a];
const sum=(a,b)=>[plus(a[0],b[0]),plus(a[1],b[1])];
const diff=(a,b)=>[minus(a[0],b[1]),minus(a[1],b[0])];
function product(a,b){const p=[times(a[0],b[0]),times(a[0],b[1]),times(a[1],b[0]),times(a[1],b[1])];return[p.reduce(low),p.reduce(high)];}
function sq(a){const x=times(a[0],a[0]),y=times(a[1],a[1]);return[cmp(a[0],zero)<=0&&cmp(a[1],zero)>=0?zero:low(x,y),high(x,y)];}
function trigPoint(x,sine){
  assert.ok(cmp(x,zero)>=0&&cmp(x,q(6))<=0);
  let p=sine?1:0,term=sine?x:one,total=term;
  const x2=times(x,x),last=sine?25:24;
  while(p<last){term=over(times(q(-1),times(term,x2)),q((p+1)*(p+2)));p+=2;total=plus(total,term);}
  const next=over(times(q(-1),times(term,x2)),q((p+1)*(p+2)));
  // Both last included terms are positive; subsequent tails alternate and
  // decrease since x^2 <= 36 < (p+1)(p+2), and later denominators grow.
  assert.ok(cmp(next,zero)<=0);
  return[plus(total,next),total];
}
function trigCell(u,beta,sine){
  const middle=over(plus(u[0],u[1]),two),radius=times(beta,over(minus(u[1],u[0]),two));
  const t=trigPoint(times(beta,middle),sine);
  return[minus(t[0],radius),plus(t[1],radius)];
}
function H(u,beta,epsilon){
  const a=diff(point(two),sq(u));
  const z=product(point(over(two,beta)),u);
  const cross=diff(product(z,trigCell(u,beta,false)),product(a,trigCell(u,beta,true)));
  return sum(sum(sq(a),sq(z)),product(point(q(2*epsilon)),cross));
}
const exact=a=>`${a[0]}/${a[1]}`;
const approx=a=>Number(a[0])/Number(a[1]);
const show=a=>({exact:a.map(exact),approx:a.map(approx)});
const mode=process.argv[2];
if(mode==='controls'){
  assert.equal(cmp(plus(q(1,2),q(1,3)),q(5,6)),0);
  assert.deepEqual(sq([q(-2),q(3)]),[zero,q(9)]);
  assert.deepEqual(trigPoint(zero,true),[zero,zero]);
  assert.deepEqual(trigPoint(zero,false),[one,one]);
  for(const e of [-1,1])assert.deepEqual(H(point(zero),q(3,2),e),[q(4),q(4)]);
  const sn=trigPoint(one,true),cs=trigPoint(one,false);
  assert.ok(cmp(sn[0],q(5,6))>0&&cmp(sn[1],q(101,120))<0);
  assert.ok(cmp(cs[0],q(1,2))>0&&cmp(cs[1],q(13,24))<0);
  const knownCell=trigCell([q(0),q(1,10)],one,true);
  assert.ok(cmp(knownCell[0],zero)<=0&&cmp(knownCell[1],zero)>=0);
  assert.ok(cmp(knownCell[1],one)<0);
  console.log(JSON.stringify({mode,status:'passed',rationalAddition:'5/6',straddlingSquare:['0','9'],HZero:'4',sinOne:show(sn),cosOne:show(cs),knownCell:show(knownCell)}));
}else if(mode==='target'){
  const bounds=[];
  for(const [beta,e] of [[q(3,2),-1],[q(3,2),1],[q(3),-1]]){
    let minimum=null,index=-1;
    for(let k=0;k<400;k++){
      const h=H([q(k,200),q(k+1,200)],beta,e);
      if(minimum===null||cmp(h[0],minimum)<0){minimum=h[0];index=k;}
    }
    assert.ok(cmp(minimum,zero)>0);
    bounds.push({beta:exact(beta),epsilon:e,cells:400,width:'1/200',minimumLower:exact(minimum),approxLower:approx(minimum),minimumCell:[`${index}/200`,`${index+1}/200`]});
  }
  const signs=[43,44,115,116].map(k=>({u:`${k}/100`,H:show(H(point(q(k,100)),q(3),1))}));
  const raw=[43,44,115,116].map(k=>H(point(q(k,100)),q(3),1));
  assert.ok(cmp(raw[0][0],zero)>0&&cmp(raw[1][1],zero)<0&&cmp(raw[2][1],zero)<0&&cmp(raw[3][0],zero)>0);
  const cos28=trigPoint(q(14,5),false);assert.ok(cmp(cos28[1],q(-47,50))<0);
  console.log(JSON.stringify({mode,status:'passed',method:'exact rational whole-cell enclosures; alternating-tail bounds and trigonometric derivative-one bound',cf:1,R:1,bounds,foldSigns:signs,cos28:show(cos28)}));
}else throw Error('Choose controls or target');
