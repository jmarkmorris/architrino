// Selection and discovery only. EOM remains the admission/certification owner.
export function eomModelOptions(capabilities, { constraint = 'none', method = 'numerical', errorBoundChecking } = {}) {
  if (capabilities?.schema !== 'eom_equation_capabilities/v1') throw new TypeError('EOM equation capabilities required.');
  return capabilities.compositions.filter(row => row.implemented &&
    (row.constraint ?? (row.geometries ? 'surface' : 'none')) === constraint &&
    (row.method ?? 'numerical') === method &&
    (errorBoundChecking === undefined || row.errorBoundChecking?.includes(errorBoundChecking))).map(row => ({
    id: row.id, name: row.name, speedDomains: [...row.speedDomains],
    defaultSpeedDomain: row.defaultSpeedDomain ?? 'unrestricted',
    chartPolicies: row.chartPolicies ? [...row.chartPolicies] : null,
    errorBoundChecking: row.errorBoundChecking ? [...row.errorBoundChecking] : null,
    executionMethods: row.executionMethods ? [...row.executionMethods] : ['ordinary'],
    acceptanceBoundary: row.acceptanceBoundary ?? row.reason,
    preparation: row.preparation ?? null, solutionDomain: row.solutionDomain ?? null,
  }));
}

export function selectEomModel(capabilities, {
  compositionId = 'canonical/v1', constraint = 'none', method = 'numerical',
  errorBoundChecking, speedDomain = 'unrestricted', boundaryPolicy = speedDomain === 'unrestricted' ? 'none' : 'halt',
} = {}) {
  const row = eomModelOptions(capabilities, { constraint, method, errorBoundChecking }).find(option => option.id === compositionId);
  if (!row || !row.speedDomains.includes(speedDomain) || boundaryPolicy !== (speedDomain === 'unrestricted' ? 'none' : 'halt'))
    throw Object.assign(new Error('The EOM service does not advertise this equation, constraint and speed-domain combination.'), { code: 'unsupported_model_combination' });
  return { compositionId, constraint, method, speedDomain, boundaryPolicy };
}
