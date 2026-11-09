// Built-in Surface compositions. Speed-domain policy is a separate selection.
export const SURFACE_EQUATION_VARIANTS=Object.freeze([
  {id:'canonical-surface/v1',name:'Canonical · inverse-square',description:'Canonical interaction with artificial normal surface support.'},
  {id:'logarithmic-surface/v1',name:'Logarithmic potential · inverse-distance',description:'Experimental logarithmic interaction with artificial normal surface support. Its coupling has a different scale; equal numeric couplings do not match the two interactions.'},
]);
export function surfaceEquationVariant(id){const row=SURFACE_EQUATION_VARIANTS.find(v=>v.id===id);if(!row)throw new Error('Choose a supported Surface equation variant.');return row;}
