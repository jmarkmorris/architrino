// Inventory of named studied response forms, not an execution authorization.
// Speed-domain labels and projected ceiling rules are separate comparison axes.
export const SURFACE_RESEARCH_VARIANTS=Object.freeze([
 ['Canonical','Implemented','../master-equation-closure/equation-variants/manuscript.md#2-canonical-master-equation'],
 ['Logarithmic','Implemented','../master-equation-closure/equation-variants/manuscript.md#3-logarithmic-response'],
 ['Amplitude gradient','Bounded research only','../master-equation-closure/equation-variants/manuscript.md#6-amplitude-gradient-response-on-the-selected-regular-pair-domain'],
 ['Maxwell-shaped transmitter response','Research only','../master-equation-closure/equation-variants/manuscript.md#7-complete-maxwell-shaped-transmitter-response'],
 ['Maxwell-shaped receiver response','Research only','../master-equation-closure/equation-variants/manuscript.md#8-complete-maxwell-shaped-receiver-response'],
 ['Instantaneous Weber-inspired response','Research comparison only','../master-equation-closure/equation-variants/manuscript.md#9-weber-inspired-relative-motion-response'],
 ['Delayed Weber adaptation','Research only','../master-equation-closure/equation-variants/manuscript.md#9a-selected-delayed-weber-adaptation'],
 ['Darwin-inspired comparison','Low-speed comparison only','../master-equation-closure/equation-variants/manuscript.md#10-darwin-inspired-low-speed-interaction-comparison'],
 ['Finite-width reception','Historical screen; no further execution authority','../master-equation-closure/equation-variants/manuscript.md#11-finite-width-wake-reception'],
 ['Self-history / velocity memory','Withdrawn historical comparison','../master-equation-closure/equation-variants/manuscript.md#12-history-based-self-response-and-emission-recoil'],
 ['Time-symmetric direct interaction','Withdrawn historical comparison','../master-equation-closure/equation-variants/manuscript.md#14-time-symmetric-direct-interaction'],
 ['Other radial powers','Historical bounded screen','../master-equation-closure/equation-variants/manuscript.md#15-other-radial-response-powers'],
 ['Multiplier-free linear delayed comparison','Historical side comparison','../master-equation-closure/collinear-research/analysis/multiplier-free-linear-delayed-comparison.md']
]);
export function renderSurfaceResearchVariants(select,host){
 const group=document.createElement('optgroup');group.label='Studied forms without a Surface EOM provider';
 for(const [name,status] of SURFACE_RESEARCH_VARIANTS.slice(2)){const option=document.createElement('option');option.disabled=true;option.textContent=`${name} · ${status}`;group.append(option);}select.append(group);
 const p=document.createElement('p');p.textContent='13 named studied response forms are listed here, including the baseline, separate instantaneous/delayed Weber forms, and the linear side comparison. Only two have Surface EOM providers. Speed regimes are counted separately. Research results do not imply an executable provider or permission for new investigations.';host.append(p);
 for(const [name,status,path] of SURFACE_RESEARCH_VARIANTS){const row=document.createElement('p'),a=document.createElement('a');a.textContent=name;a.href='reference/priorities/app-surface/'+path;row.append(a,document.createTextNode(' · '+status));host.append(row);}
 const extra=document.createElement('p');extra.textContent='Transported wake state remains a proposal with unspecified constitutive maps. Projected ceiling responses and terminal-coincidence rules are additional studied boundary specifications; the speed menu here supplies domain/halt policies, not those responses.';host.append(extra);
}
