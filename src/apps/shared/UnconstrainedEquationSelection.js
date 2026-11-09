// These are equation identities, independent of the selected speed domain.
// The EOM provider remains the admission authority for history/checking limits.
export function unconstrainedEquationSelection({compositionId='canonical/v1',speedDomain='unrestricted'}={}){
  if(!['canonical/v1','logarithmic/v1'].includes(compositionId))throw new Error('Choose a supported master equation variant.');
  if(!['unrestricted','inclusive','strict'].includes(speedDomain))throw new Error('Choose a supported speed domain.');
  return {compositionId,constraint:'none',speedDomain,boundaryPolicy:speedDomain==='unrestricted'?'none':'halt'};
}
