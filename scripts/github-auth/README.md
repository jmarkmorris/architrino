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
