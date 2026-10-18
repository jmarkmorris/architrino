// Execution identity of a v3 EOM request, shared by the browser and Node
// clients. The normalized execution is the one the service resolves and
// digests: every control with its default filled in, nothing else.
export const EOM_V3_REQUEST = 'eom_evolution_request/v3';
export const EOM_V2_REQUEST = 'eom_evolution_request/v2';
// Scientific operations admit exactly these request schemas.
export function eomRequestVersion(request) {
  if (request?.schema === EOM_V2_REQUEST) return 'v2';
  if (request?.schema === EOM_V3_REQUEST) return 'v3';
  throw Object.assign(new Error(`Unsupported EOM request schema ${JSON.stringify(request?.schema)}; only ${EOM_V2_REQUEST} and ${EOM_V3_REQUEST} are admitted.`), { code: 'unsupported_request_schema' });
}
const EXECUTION_KEYS = ['method', 'positionIncrementBudget', 'velocityIncrementBudget', 'totalBudget', 'maxAttemptsPerStep',
  'maxLowerSignRetries', 'growthCooldownSteps', 'pairPolicy', 'groups', 'maximumAcceptedSteps'];
const mismatch = message => Object.assign(new Error(`EOM execution binding: ${message}.`), { code: 'execution_binding_mismatch' });

export const sortedJson = value => Array.isArray(value) ? value.map(sortedJson)
  : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key => [key, sortedJson(value[key])])) : value;
export const canonicalJson = value => JSON.stringify(sortedJson(value));

// The execution a v3 request declares, normalized as the service resolves
// it, and its per-invocation limit. Throws for an unknown or missing field.
export function expectedEomExecution(request) {
  const execution = request?.execution;
  if (request?.schema !== EOM_V3_REQUEST || !execution || typeof execution !== 'object' || Array.isArray(execution)) throw mismatch('a v3 request with an execution object is required');
  for (const key of Object.keys(execution)) if (!EXECUTION_KEYS.includes(key)) throw mismatch(`unknown execution field ${key}`);
  for (const key of ['method', 'positionIncrementBudget', 'velocityIncrementBudget', 'maximumAcceptedSteps']) if (execution[key] === undefined) throw mismatch(`execution.${key} is required`);
  if (!Number.isInteger(execution.maximumAcceptedSteps) || execution.maximumAcceptedSteps < 1) throw mismatch('maximumAcceptedSteps must be a declared positive integer');
  return {
    execution: {
      method: execution.method,
      positionIncrementBudget: execution.positionIncrementBudget,
      velocityIncrementBudget: execution.velocityIncrementBudget,
      totalBudget: execution.totalBudget ?? null,
      maxAttemptsPerStep: execution.maxAttemptsPerStep ?? 64,
      maxLowerSignRetries: execution.maxLowerSignRetries ?? 4,
      growthCooldownSteps: execution.growthCooldownSteps ?? 4,
      pairPolicy: execution.pairPolicy ?? 'disabled',
      groups: execution.groups ?? [],
    },
    maximumAcceptedSteps: execution.maximumAcceptedSteps,
  };
}

// SHA-256 of the canonical normalized execution, with Web Crypto.
export async function eomExecutionDigest(execution) {
  const bytes = new TextEncoder().encode(canonicalJson(execution));
  const hash = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, '0')).join('');
}

// A runtime override belongs to a resume only; evolve refuses one rather
// than disregard it.
export function refuseEomRuntimeOnEvolve(options) {
  if (options?.runtime !== undefined) throw Object.assign(new Error('A runtime override is supported only on a v3 resume, not on evolve.'), { code: 'unsupported_runtime_override' });
}

// The runtime override a v3 resume may carry: {threadCount} from 1 to 32.
export function checkedEomRuntime(request, runtime) {
  if (runtime === undefined) return undefined;
  if (request?.schema !== EOM_V3_REQUEST) throw Object.assign(new Error('A runtime override is supported only on a v3 resume.'), { code: 'unsupported_runtime_override' });
  if (!runtime || typeof runtime !== 'object' || Object.keys(runtime).some(key => key !== 'threadCount') || !Number.isInteger(runtime.threadCount) || runtime.threadCount < 1 || runtime.threadCount > 32)
    throw Object.assign(new Error('runtime must be {threadCount} with an integer from 1 to 32.'), { code: 'unsupported_runtime_override' });
  return { threadCount: runtime.threadCount };
}
