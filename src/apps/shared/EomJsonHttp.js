export async function postEomJson(fetchImpl, endpoint, body, signal, serviceName = 'EOM', headers = {}) {
  const response = await fetchImpl(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body), signal });
  const text = await response.text();
  let payload;
  try { payload = JSON.parse(text); } catch { payload = { error: text || `HTTP ${response.status}` }; }
  if (!response.ok) {
    const error = new Error(payload?.error ?? `${serviceName} service returned HTTP ${response.status}.`);
    if (payload?.retainedFailure) error.retainedFailure = payload.retainedFailure;
    error.httpStatus = response.status; error.retryable = response.status >= 500 || response.status === 408 || response.status === 429;
    if (typeof payload?.code === 'string') error.code = payload.code;
    throw error;
  }
  return payload;
}
