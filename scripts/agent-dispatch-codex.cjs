// Portable Codex functions.exec adapter. No Node imports: tools own filesystem and transport.
// Load this local CommonJS function as documented in codex-multiprompt.md.
module.exports = async function dispatchThroughCodex({ tools, requestPath, bundlePath, threadId, senderLog, receiverLog, waitMs = 15000 }) {
  const quote = value => "'" + String(value).replace(/'/g, "'\\''") + "'";
  const command = (...args) => ['node', 'scripts/agent-dispatch-session.mjs', ...args].map(quote).join(' ');
  async function run(...args) {
    let r = await tools.exec_command({ cmd: command(...args), max_output_tokens: 16000, yield_time_ms: 1000 });
    let output = r.output;
    while (r.session_id) {
      r = await tools.write_stdin({ session_id: r.session_id, chars: '', yield_time_ms: 1000, max_output_tokens: 16000 });
      output += r.output;
    }
    if (r.exit_code !== 0) throw new Error(r.output || 'dispatch command failed');
    return JSON.parse(output);
  }
  try {
  const begin = await run('begin', bundlePath, requestPath, threadId, senderLog, receiverLog);
  const outgoing = Object.freeze(begin.arguments);
  await run('outgoing', bundlePath, JSON.stringify(outgoing));
  let hostResult;
  try { hostResult = { result: await tools.mcp__codex_app__send_message_to_thread(outgoing) }; }
  catch (error) { hostResult = { error: String(error.message ?? error) }; }
  await run('result', bundlePath, JSON.stringify(hostResult));
  // One bounded local collector handles asynchronous log arrival; no message retry.
  let r = await tools.exec_command({ cmd: command('collect', bundlePath, waitMs), max_output_tokens: 4000, yield_time_ms: 1000 });
  let output = r.output;
  while (r.session_id) { r = await tools.write_stdin({ session_id: r.session_id, chars: '', yield_time_ms: 1000, max_output_tokens: 4000 }); output += r.output; }
  const report = JSON.parse(output);
  return { bundlePath, ...report };
  } catch (error) {
    const r = await tools.exec_command({ cmd: command('fail', bundlePath, String(error.message ?? error)), max_output_tokens: 1000 });
    if (r.exit_code !== 0) throw new Error(`Dispatch failed and evidence capture failed: ${error.message}; ${r.output}`);
    return { bundlePath, ...JSON.parse(r.output) };
  }
};
