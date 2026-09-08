#!/usr/bin/env node
// Explicit credential selection; not an authorization grant or a sandbox.
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../../', import.meta.url));
const helperPath = path.join(root, '.local-data/github-auth/keychain-token');
function fail(message) { console.error(message); process.exit(1); }
const cli = process.argv.slice(2);
let context = 'codex-architrino';
if (cli[0] === '--context') { cli.shift(); context = cli.shift(); }
if (!['codex-architrino', 'claude-architrino'].includes(context)) fail('Unknown Architrino context; no credential accessed.');
const [client, ...args] = cli;
if (!['git', 'gh'].includes(client) || !args.length) fail('Usage: node scripts/github-auth/run.mjs <git|gh> <arguments>');
// Refuse common credential-disclosure and login-changing operations.
if (client === 'git' && args.some(a => ['credential', 'credential-fill'].includes(a))) fail('Credential inspection is not supported.');
if (client === 'gh' && args[0] === 'auth') fail('Shared-login and token-display commands are not supported. Use API identity checks.');
if (args.some(a => ['--verbose', '--include'].includes(a))) fail('Verbose authentication output is not supported.');
const selected = spawnSync(helperPath, ['credential', context, 'get'], {
  input: 'protocol=https\nhost=github.com\npath=jmarkmorris/architrino.git\n\n', encoding: 'utf8',
});
if (selected.status !== 0) fail('Selected Keychain credential unavailable; no fallback attempted.');
const tokenLine = selected.stdout.split('\n').find(line => line.startsWith('password='));
if (!tokenLine) fail('Selected credential missing; no fallback attempted.');
const env = { ...process.env, GH_TOKEN: tokenLine.slice(9), GH_HOST: 'github.com', GH_REPO: 'jmarkmorris/architrino', GH_PROMPT_DISABLED: '1', GIT_TERMINAL_PROMPT: '0' };
for (const key of Object.keys(env)) {
  if (key.startsWith('GIT_TRACE') || key.startsWith('GIT_CONFIG_KEY_') || key.startsWith('GIT_CONFIG_VALUE_') || ['GH_DEBUG', 'DEBUG', 'GITHUB_TOKEN', 'GIT_CURL_VERBOSE', 'GIT_CONFIG_COUNT'].includes(key)) delete env[key];
}
// Hook subprocesses inherit this command-scoped Git credential routing too.
const quote = value => "'" + value.replaceAll("'", "'\\''") + "'";
const settings = [ ['credential.helper', ''], ['credential.helper', `!${quote(helperPath)} credential ${context}`], ['credential.useHttpPath', 'true'] ];
env.GIT_CONFIG_COUNT = String(settings.length);
settings.forEach(([key, value], i) => { env[`GIT_CONFIG_KEY_${i}`] = key; env[`GIT_CONFIG_VALUE_${i}`] = value; });
const result = spawnSync(client, args, { cwd: root, env, stdio: 'inherit' });
if (result.error) fail('Could not start selected client.');
process.exit(result.status ?? 1);
