# GitHub credential routing pilot

This macOS pilot stores the Codex–Architrino fine-grained PAT as a separately named Keychain item. The operator enters it at a hidden terminal prompt; it is never accepted as a command argument. It does not modify Git configuration, the GitHub CLI login, existing Keychain credentials, or repository remotes. Separate credentials under one macOS account are routing separation, not a security boundary between applications with equivalent local access.

From the repository root, after the compiled helper is prepared:

```bash
.local-data/github-auth/keychain-token install codex-architrino
```

Paste the token from the password manager at the hidden prompt and press Return. A duplicate entry is not overwritten. Keep the password-manager copy for recovery. Installation alone does not make ordinary Git or GitHub CLI commands select the token. The explicit Codex–Architrino route below is verified for authenticated API access and a real push. Installation alone does not configure ordinary commands. The shared GitHub CLI OAuth login has been removed.

The helper's credential mode implements Git's protocol and restricts lookup to the exact HTTPS GitHub repository. Its output contains the secret for Git's private consumption; never run it to display or inspect the token. Other repository requests return `quit=true`. Check mode reports readability without exposing the value. The explicit client route below supplies CLI token injection and authenticated Git access.

Build on macOS with Swift and Security.framework:

```bash
mkdir -p .local-data/github-auth /private/tmp/architrino-swift-cache
swiftc -module-cache-path /private/tmp/architrino-swift-cache scripts/github-auth/keychain-token.swift -o .local-data/github-auth/keychain-token
```

The executable is ignored local output. The initial known-case controls passed for refusing a different repository, an unknown context, and noninteractive installation. These controls accessed no real credentials and establish rejection behavior only; they do not establish successful Keychain installation or GitHub authentication.

## Explicit client route

After installation, use this route for the Codex–Architrino pilot:

```bash
node scripts/github-auth/run.mjs gh api user --jq .login
node scripts/github-auth/run.mjs git ls-remote --exit-code origin HEAD
```

The runner reads the selected Keychain entry privately, supplies the token to GitHub CLI through its process environment, and supplies Git with an exact-repository credential helper. Its child processes inherit this routing. No persistent Git or shared CLI login configuration is changed. Plain `git` or `gh` commands outside this route still use their previous configuration. The helper does not establish isolation against other applications running as the same macOS user, and does not grant publication authority or replace the guarded publication procedure. Never approve a broad reusable command prefix for this wrapper; review the actual Git operation being invoked.

Initial live verification succeeded for an authenticated GitHub account query matching the intended owner and the Architrino repository metadata query using the selected PAT. The explicit runner also completed the account query and a Git remote listing. Architrino is public, so the Git listing alone does not prove authenticated Git write access. Repository metadata permissions describe account capability and do not certify every fine-grained token permission. A subsequent authorized publication pushed successfully through this route and verified the remote branch tip equals the local commit. Other API write permissions are not inferred from that push. The shared CLI OAuth login was removed and the operator completed GitHub-side revocation.

## MyLists installation context

The storage helper also accepts `codex-mylists`, selecting its own Keychain service and exact `jmarkmorris/MyLists` repository. A compiled copy is installed at `/Users/markmorris/.local/bin/repo-keychain-token` so installation does not require invoking a binary inside Architrino. The token remains in Keychain. This repository's `run.mjs` still routes Architrino only; MyLists owns its separate command routing.

## Claude Code Local setup

The shared helper supports `claude-architrino` and `claude-mylists` as distinct Keychain services. Existing Codex service names remain unchanged. Use Claude Desktop's Code mode with Local selected for this Mac helper; the inspected Cowork Linux session cannot execute it. These are explicit credential routes, not shared GitHub CLI logins.

From any directory in a Mac terminal, install the operator-created Claude–Architrino token:

```bash
"$HOME/.local/bin/repo-keychain-token" install claude-architrino
```

Enter the token only at the hidden prompt. From the Architrino repository root, Claude selects its route explicitly:

```bash
node scripts/github-auth/run.mjs --context claude-architrino gh api user --jq .login
node scripts/github-auth/run.mjs --context claude-architrino git ls-remote --exit-code origin HEAD
```

Omitting `--context` retains the existing Codex–Architrino default. This runner rejects MyLists contexts because its working directory is Architrino; MyLists command routing remains owned by that repository. The helper can store MyLists tokens independently. Plain commands and the desktop's built-in PR status integration do not automatically inherit this explicit route.

Validation on 2026-09-08: the compiled helper's non-secret `describe` operation returned the exact expected four service names, preserving both installed Codex names. Known-case controls rejected unknown contexts, another repository, noninteractive installation, and extra install arguments without accessing Keychain. `node --test tests/github-auth-routing.test.js` passed synthetic routing checks for both clients, the legacy default, Claude selection, secret-debug-variable removal, and no fallback when the selected helper fails. These controls do not establish live Claude authentication or token permissions; token installation and real-client verification remain pending.

After operator installation, host-run `--context claude-architrino gh api user --jq .login` returned the intended owner and the repository API query returned `jmarkmorris/architrino`. This verifies the installed Claude token and explicit route for those reads. Claude Code Local subsequently reported both commands succeeded from its own session. This does not establish all fine-grained permissions or publication; the repository permissions object describes account capabilities rather than certifying token write access.

The preserved Codex default was rechecked after the helper update with `node scripts/github-auth/run.mjs gh api user --jq .login`; it returned `jmarkmorris` with exit status zero after the operator answered a macOS Keychain access prompt. This establishes continued authenticated identity access through the default route, not a new publication test.
