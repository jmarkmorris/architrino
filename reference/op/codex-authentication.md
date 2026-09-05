# Codex Authentication

Responses and working-document capture follow the [operator explanation standard](operator-explanation-standard.md); explanatory prose follows the [academic style guide](../../content/markdown/aaa/archie/academic-style-guide.md).

Use this note to choose, check, or change the local Codex sign-in method. It is an operator procedure, not a credential store.

## Security Rule

Never place an API key, access token, session file, or credential value in this repository, a Markdown file, a shell history export, an issue, or chat. This document uses only environment-variable names and commands that keep credential values out of terminal output.

Treat file-based credential caches such as `~/.codex/auth.json` as passwords. Do not commit, copy into the repository, paste into tickets, or share them in chat.

## Check The Active Method

```bash
codex login status
```

Use the result to determine whether the local CLI is using ChatGPT sign-in or API-key authentication. For the desktop app or IDE extension, check the active account or key status in its profile menu.

## Sign In With ChatGPT

For subscription-backed local use, clear the current Codex session and complete the browser flow:

```bash
codex logout
codex login
```

Do not delete `~/.codex` to troubleshoot ordinary sign-in changes. It can contain settings, session information, and file-based cached credentials. Use the supported logout and login commands first.

## Sign In With An API Key

For approved usage-based local or automation workflows, obtain the key through the OpenAI Platform account and provide it through the already-configured environment variable:

```bash
printenv OPENAI_API_KEY | codex login --with-api-key
```

Run this only in a trusted local shell where `OPENAI_API_KEY` is already supplied securely. Do not create a file containing the key, paste the key into this document, or run a command that prints its value for inspection.

API-key usage follows the OpenAI Platform account's billing and data-handling settings; ChatGPT sign-in follows the ChatGPT workspace's permissions and policies. Use the method appropriate to the intended environment.

## Troubleshooting

1. Run `codex login status`.
2. Run `codex logout`, then repeat the intended supported sign-in flow.
3. For browser-login failures, inspect the dedicated `codex-login.log` under Codex's configured log directory before changing or deleting local state.
4. In managed environments, confirm whether workspace policy restricts the login method or workspace.

For current command behavior and credential-storage details, see the official [Codex authentication guide](https://learn.chatgpt.com/docs/auth).
