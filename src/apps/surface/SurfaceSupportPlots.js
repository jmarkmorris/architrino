import {borgPolarityCss} from '../borg/BorgOrbitTrails.mjs';
import {buildSurfaceSupportData,surfaceSupportSummary,longestSupportSpan,supportRowsConnect,supportMidpoint} from './SurfaceSupportData.js';

const NS='http://www.w3.org/2000/svg',H=180,L=72,R=18,TOP=22,BOTTOM=28;
const fmt=x=>Number(x).toPrecision(4),interval=p=>`≈ [${fmt(p[0])}, ${fmt(p[1])}]`;
const dash=['','8 3','2 3','10 3 2 3','5 3','1 3'];
function svgElement(name,attrs={},text){const e=document.createElementNS(NS,name);for(const [k,v]of Object.entries(attrs))e.setAttribute(k,String(v));if(text!==undefined)e.textContent=text;return e;}

export function createSurfaceSupportPlots({host,jump,select,highlight}){
  let W=760;
  host.innerHTML=`<div class="support-heading"><div><h2>Normal support acceleration</h2><p>Additional acceleration needed to keep each path on the surface. Positive is outward; negative is inward along the local surface normal.</p></div><label class="support-arrows"><input type="checkbox" id="support-arrows">Direction arrows</label></div>
    <p class="support-empty">Load a recorded run to inspect support histories.</p>
    <div class="support-content" hidden>
      <div class="support-window"><label>From T<input name="from" type="number" step="any"></label><label>To T<input name="to" type="number" step="any"></label><button type="button" data-window="apply">Apply window</button><button type="button" data-window="full">Full range</button><button type="button" data-window="available">Longest complete span</button></div>
      <p class="support-window-message" role="status"></p><div class="support-members" aria-label="Support curves"></div><p class="support-overlap"></p>
      <svg class="support-chart support-signed" viewBox="0 0 ${W} ${H}" role="img" tabindex="0" aria-label="Signed normal support acceleration versus absolute time. Click to seek; left and right arrows move playback."></svg>
      <h3>Sum of support magnitudes · all architrinos</h3><svg class="support-chart support-total" viewBox="0 0 ${W} ${H}" role="img" tabindex="0" aria-label="Sum of absolute support accelerations versus absolute time. Click to seek; left and right arrows move playback."></svg>
      <div class="support-summary" aria-live="polite"></div><p class="support-inspection"></p><p class="support-note"></p>
    </div>`;
  const $=s=>host.querySelector(s),content=$('.support-content'),empty=$('.support-empty'),signed=$('.support-signed'),total=$('.support-total'),legend=$('.support-members');
  let data=null,windowStart=0,windowEnd=1,time=0,selected=null,hovered=null,hidden=new Set();
  const x=t=>L+(t-windowStart)/(windowEnd-windowStart)*(W-L-R);
  function selectMember(id){selected=id;select(id);styleSelection();}
  function styleSelection(){
    const active=hovered??selected;
    for(const e of signed.querySelectorAll('[data-member]')){const id=e.getAttribute('data-member');e.style.opacity=active&&id!==active?'.28':'1';if(e.classList.contains('support-trace'))e.setAttribute('stroke-width',id===active?'2.8':'1.5');}
    for(const b of legend.querySelectorAll('button'))b.setAttribute('aria-pressed',String(b.dataset.member===selected));
  }
  function hover(id){hovered=id;highlight(id??selected);styleSelection();}
  function setWindow(a,b){
    if(!data||!Number.isFinite(a)||!Number.isFinite(b)||a<data.domain.start||b>data.domain.end||!(b>a)){$('.support-window-message').textContent='Choose an increasing window inside the recorded time range.';return;}
    windowStart=a;windowEnd=b;$('[name=from]').value=String(a);$('[name=to]').value=String(b);$('.support-window-message').textContent=`Window T = ${fmt(a)} … ${fmt(b)}. Click either graph to move playback.`;render();
  }
  $('[data-window=apply]').onclick=()=>setWindow(Number($('[name=from]').value),Number($('[name=to]').value));
  $('[data-window=full]').onclick=()=>data&&setWindow(data.domain.start,data.domain.end);
  $('[data-window=available]').onclick=()=>{const span=data&&longestSupportSpan(data);if(span)setWindow(...span);else $('.support-window-message').textContent='No nonzero complete support span is available.';};
  for(const svg of [signed,total]){
    svg.addEventListener('click',e=>{if(!data)return;const rect=svg.getBoundingClientRect(),pixel=(e.clientX-rect.left)*W/rect.width;if(pixel<L||pixel>W-R)return;jump(windowStart+(pixel-L)/(W-L-R)*(windowEnd-windowStart));});
    svg.addEventListener('keydown',e=>{if(!data||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const t=e.key==='Home'?windowStart:e.key==='End'?windowEnd:time+(e.key==='ArrowLeft'?-1:1)*(windowEnd-windowStart)/100;jump(Math.max(windowStart,Math.min(windowEnd,t)));});
  }
  function axes(svg,min,max,label){
    svg.replaceChildren();svg.append(svgElement('title',{},label));
    const y=v=>TOP+(max-v)/(max-min)*(H-TOP-BOTTOM);
    for(let i=0;i<4;i++){const value=min+(max-min)*i/3,yy=y(value);svg.append(svgElement('line',{x1:L,x2:W-R,y1:yy,y2:yy,stroke:'#473454','stroke-width':'.5'}),svgElement('text',{x:L-8,y:yy+4,'text-anchor':'end'},fmt(value)));}
    for(let i=0;i<5;i++){const t=windowStart+(windowEnd-windowStart)*i/4;svg.append(svgElement('text',{x:x(t),y:H-7,'text-anchor':'middle'},fmt(t)));}
    svg.append(svgElement('text',{x:L,y:12},'Acceleration · cf = 1'),svgElement('text',{x:W-R,y:12,'text-anchor':'end'},'Absolute time T'));
    const zero=y(0);svg.append(svgElement('line',{x1:L,x2:W-R,y1:zero,y2:zero,stroke:'#e6d9ef','stroke-width':'1',class:'support-zero'}));
    return y;
  }
  function visibleRows(rows){return rows.filter(r=>r.kind==='slab'?r.time[1]>=windowStart&&r.time[0]<=windowEnd:r.clock>=windowStart&&r.clock<=windowEnd);}
  function drawRows(svg,rows,y,color,style,id){
    let band='',line='',points='',previous=null;
    const pos=v=>Number.isFinite(v)?v.toFixed(3):'0';
    for(const r of rows){
      if(!r.value){previous=null;continue;}
      const t=r.clock,lo=r.value[0],hi=r.value[1],mid=supportMidpoint(r.value);
      let a=x(Math.max(windowStart,r.time[0])),b=x(Math.min(windowEnd,r.time[1]));
      if(b<a){previous=null;continue;}
      if(r.kind==='slab'){
        band+=`M${pos(a)},${pos(y(hi))}H${pos(b)}V${pos(y(lo))}H${pos(a)}Z`;
        line+=`${previous&&supportRowsConnect(previous,r)?'L':'M'}${pos(a)},${pos(y(mid))}H${pos(b)}`;
      }else{
        // Time whiskers preserve uncertain endpoints. Connecting midpoint lines
        // are illustrative only; a missing observation always breaks the line.
        a=Math.max(L,Math.min(W-R,a));b=Math.max(a+.4,Math.min(W-R,b));
        band+=`M${pos(a)},${pos(y(hi))}H${pos(b)}V${pos(y(lo))}H${pos(a)}Z`;
        line+=`${previous&&supportRowsConnect(previous,r)?'L':'M'}${pos(x(t))},${pos(y(mid))}`;
        points+=`M${pos(x(t)-1)},${pos(y(mid))}h2`;
      }
      previous=r;
    }
    const attrs=id?{'data-member':id}:{};
    const bounds=svgElement('path',{d:band,fill:color,'fill-opacity':'.13',stroke:color,'stroke-opacity':'.3','stroke-width':'.6',...attrs});
    const trace=svgElement('path',{d:line,fill:'none',stroke:color,'stroke-width':'1.5','stroke-dasharray':style,class:'support-trace',...attrs});
    const dots=svgElement('path',{d:points,fill:'none',stroke:color,'stroke-width':'2',...attrs});
    if(id)for(const e of [bounds,trace,dots]){e.addEventListener('pointerenter',()=>hover(id));e.addEventListener('pointerleave',()=>hover(null));e.addEventListener('click',()=>selectMember(id));}
    svg.append(bounds,trace,dots);
  }
  function render(){
    if(!data)return;
    W=Math.max(300,signed.clientWidth||760);for(const svg of [signed,total])svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
    const shown=data.members.filter(m=>!hidden.has(m.pathId));
    let magnitude=0;for(const m of shown)for(const r of visibleRows(m.rows))if(r.value)magnitude=Math.max(magnitude,Math.abs(r.value[0]),Math.abs(r.value[1]));
    magnitude=magnitude?magnitude*1.12:1;
    const sy=axes(signed,-magnitude,magnitude,'Normal support acceleration. Positive outward; negative inward.');
    signed.append(svgElement('text',{x:L+6,y:TOP+12},'+ outward'),svgElement('text',{x:L+6,y:H-BOTTOM-5},'− inward'));
    shown.forEach(m=>drawRows(signed,visibleRows(m.rows),sy,borgPolarityCss(m.charge),dash[data.members.indexOf(m)%dash.length],m.pathId));
    let maximum=0;for(const r of visibleRows(data.total))if(r.value)maximum=Math.max(maximum,r.value[1]);
    const ty=axes(total,0,maximum?maximum*1.12:1,'Sum of support magnitudes for the complete population.');
    drawRows(total,visibleRows(data.total),ty,'#d8b4ff','');
    for(const svg of [signed,total])svg.append(svgElement('line',{class:'support-cursor',x1:x(time),x2:x(time),y1:TOP,y2:H-BOTTOM,stroke:'#fff','stroke-dasharray':'3 3','pointer-events':'none'}));
    const summary=surfaceSupportSummary(data,windowStart,windowEnd),summaryHost=$('.support-summary');summaryHost.replaceChildren();
    if(summary.available){for(const [label,value]of [['Mean total support',summary.mean],['Mean per architrino',summary.perMember]]){const card=document.createElement('div'),name=document.createElement('span'),number=document.createElement('strong');name.textContent=label+(summary.estimated?' · sampled estimate':' · slab bounds');number.textContent=interval(value);card.append(name,number);summaryHost.append(card);}}
    else{const p=document.createElement('p');p.textContent='Window mean unavailable. '+summary.reason+(summary.duration?` Recorded support covers approximately ${fmt(summary.covered)} of ${fmt(summary.duration)} time units in this window.`:'')+' Use Longest complete span to inspect a covered window.';summaryHost.append(p);}
    $('.support-note').textContent=data.kind==='sample'?'Whiskers show rounded recorded value/time bounds. Lines join observation midpoints for display only; gaps remain blank. Means use time-weighted trapezoids on available adjacent observations and lower endpoint clocks: sampled estimates, not certified averages or event times. All-population totals include hidden curves.':'Bands show rounded support projections over recorded reception slabs; lines show band midpoints. Window means integrate magnitude-sum slab bounds only with complete coverage. Projection uses the retained position tube on the same reception domain. These display reductions add no scientific qualification. All-population totals include hidden curves.';
    styleSelection();setTime(time);
  }
  function setTime(t){
    time=t;for(const svg of [signed,total]){const cursor=svg.querySelector('.support-cursor');if(cursor){cursor.setAttribute('x1',x(t));cursor.setAttribute('x2',x(t));cursor.style.display=t<windowStart||t>windowEnd?'none':'';}}
    if(!data)return;
    const member=data.members.find(m=>m.pathId===selected)??data.members[0];
    const nearest=member.rows.reduce((best,r)=>!best||Math.abs(r.clock-t)<Math.abs(best.clock-t)?r:best,null);
    const aggregate=data.total.reduce((best,r)=>!best||Math.abs(r.clock-t)<Math.abs(best.clock-t)?r:best,null);
    const rowText=r=>!r?.value?'Not retained':`${interval(r.value)} at T ≈ [${fmt(r.time[0])}, ${fmt(r.time[1])}]`;
    const direction=!nearest?.value?'':nearest.value[0]>0?' · outward':nearest.value[1]<0?' · inward':nearest.value[0]===0&&nearest.value[1]===0?' · zero':' · sign unresolved';
    $('.support-inspection').textContent=`${member.label}, nearest recorded support: ${rowText(nearest)}${direction}. Nearest all-member magnitude sum: ${rowText(aggregate)}. These are recorded-domain readouts, not instantaneous values at the playback cursor.`;
  }
  function setRecord(record){
    data=buildSurfaceSupportData(record);hidden.clear();hovered=null;legend.replaceChildren();content.hidden=!data;empty.hidden=!!data;
    empty.textContent='Load a recorded run to inspect support histories.';
    if(!data)return;
    selected=data.members[0].pathId;
    for(const [i,m]of data.members.entries()){
      const wrap=document.createElement('span'),check=document.createElement('input'),button=document.createElement('button');wrap.className='support-member';check.type='checkbox';check.checked=true;check.setAttribute('aria-label',`Show ${m.label} support curve`);check.onchange=()=>{check.checked?hidden.delete(m.pathId):hidden.add(m.pathId);render();};button.type='button';button.dataset.member=m.pathId;button.textContent=`${m.label} ${m.charge>0?'(+)':'(−)'}`;button.title=`Select ${m.label}`;button.style.setProperty('--member-color',borgPolarityCss(m.charge));
      const swatch=svgElement('svg',{viewBox:'0 0 28 6',width:28,height:6,'aria-hidden':'true'});swatch.append(svgElement('line',{x1:0,x2:28,y1:3,y2:3,stroke:borgPolarityCss(m.charge),'stroke-width':2,'stroke-dasharray':dash[i%dash.length]}));button.prepend(swatch);
      button.onclick=()=>selectMember(m.pathId);button.onpointerenter=()=>hover(m.pathId);button.onpointerleave=()=>hover(null);button.onfocus=()=>hover(m.pathId);button.onblur=()=>hover(null);wrap.append(check,button);legend.append(wrap);
    }
    const groups=new Map();for(const m of data.members){const key=JSON.stringify(m.rows.map(r=>[r.time,r.value]));const group=groups.get(key)??[];group.push(m.label);groups.set(key,group);}
    const overlaps=[...groups.values()].filter(g=>g.length>1);$('.support-overlap').textContent=overlaps.length?overlaps.map(g=>`${g.length} recorded curves coincide: ${g.join(', ')}.`).join(' ')+' Every member is counted in the total.':'Each curve keeps its member identity; bands may overlap.';
    $('[data-window=available]').disabled=!longestSupportSpan(data);
    if(data.domain.end>data.domain.start)setWindow(data.domain.start,data.domain.end);
    else{content.hidden=true;empty.hidden=false;empty.textContent='No nonzero recorded support interval yet.';}
  }
  const resize=new ResizeObserver(()=>{if(data&&signed.clientWidth&&Math.abs(signed.clientWidth-W)>.5)render();});resize.observe(signed);
  return {setRecord,setTime,select(id){selected=id;styleSelection();if(data)setTime(time);},dispose(){resize.disconnect();host.replaceChildren();}};
}
