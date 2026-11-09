// Shared presentation policy; omitted historical EOM requests retain strict semantics.
export const ERROR_BOUND_CHECKING_DEFAULT='none';
export function errorBoundChecking(request){const mode=request?.numerics?.errorBoundChecking??'strict';if(!['none','strict'].includes(mode))throw new Error('Error bound checking must be none or strict.');return mode;}
