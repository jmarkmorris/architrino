# Codex–Claude collaboration: portable setup guide

This guide describes a text conversation among a human operator (Op), one Codex chat, and one Claude chat working in the same local folder(repo). The agents exchange requests, review each other's work, revise assigned files, and report a combined result to Op. It is independent of any particular repository, research topic, or existing installation. The example paths and limits are choices for a new setup, not requirements of either vendor.

**Both agents are accessed through their desktop applications:** a local coding chat in the Codex desktop app and a local Code-tab chat in the Claude desktop app, using their existing signed-in accounts. Setup and ordinary operator interaction happen in those app chats. Agents may execute utilities or a queued-message command internally; those commands deliver to the bound desktop chat rather than launch a separate CLI model session.

Vendor documentation was checked on October 10, 2026. Treat commands and host capabilities as version-dependent and verify them on the recipient's installation.

The conversation is stored in a shared Markdown file. Codex can notify Claude through Claude's desktop composer, using desktop control. Claude replies through the file while Codex is actively waiting; if Codex needs a later turn, Claude uses an available, tested queued-message command. Op operates through the ordinary app chats after setup. A terminal is not the operator's conversation interface, although agents may use shell tools internally.

This does not create a native three-participant chat room. Each app keeps its own chat, and the shared file is the joint record. Ask the reporting agent to summarize peer contributions in the operator's chat. Opening the file beside that chat can help, but automatic refresh and a continuously displayed conversation tail depend on the app and must be checked locally.

## Op: start setup with either agent

Open a local coding chat in either desktop app, attach this document or give its readable file path, and send the prompt below. Use the intended shared folder as that chat's working folder; if it is not already selected, name it in the message. You need not create directories, write code, collect IDs, run commands, or manually relay routine setup messages.

> Set up Codex–Claude collaboration using this guide in the selected shared folder. You are the setup lead, whether you are Codex or Claude. Inspect the existing applications, tools and folder instructions; coordinate with the intended peer chat; create the local guide copy, utilities, conversation and bindings; configure shared-skill discovery where supported; and run the bounded acceptance checks. Reuse the intended peer chat; if none exists, create one local peer chat for this setup where your host permits. I authorize messages between this pair for setup and ordinary collaboration tasks I subsequently direct from either chat, including revisions within each task's explicit scope. Keep conversations local by default and preserve existing files, drafts and unrelated chats. Do the setup yourself using the peer where useful. Ask me only for a missing folder or ambiguous peer choice, sign-in or an actual required permission, or one minimal bootstrap message if you cannot reach the peer. Do not require me to operate a terminal or approve each in-scope step. Record actual limitations and finish with the conversation path, working delivery routes and anything I still need to do.

Either agent can lead. The setup lead owns configuration and the final report; the delivery roles in section 4 stay the same. Starting in Claude does not mean Claude must acquire desktop control: it can ask the bound Codex peer to handle the Codex-to-Claude route once they are connected.

Op handles only actions the agents cannot perform or are not permitted to perform: account sign-in, required OS/app grants, an ambiguous destination choice, or a direct authorization/bootstrap message when the receiving host requires one. The lead prepares the exact message and destination for such a handoff, bundles independent requests, and continues unaffected setup. Do not turn every technical step into an operator checklist.

The remaining sections are instructions for the setup lead and participating agents. Their commands and templates are for the agents to execute and fill in, not homework for Op.

## 1. Agent: check the required capabilities

Inspect the installed applications and existing signed-in sessions. Prepare any missing installation using the [Codex desktop setup documentation](https://learn.chatgpt.com/docs/app) and [Claude Code desktop documentation](https://code.claude.com/docs/en/desktop), proceeding where your host permits and handing off only sign-in or required permissions. Connect the intended chats to the same local folder using supported tools. For Claude, use the Code tab and Local environment. A cloud environment or separate checkout does not automatically share your local files.

Check your own capabilities and obtain the peer's corresponding checks when connected:

| Capability | Needed for |
| --- | --- |
| Both sessions can read and append to the same local file | The joint conversation |
| Codex has a desktop-control tool that can inspect Claude's selected chat identity, read its composer, and submit text | Codex-to-Claude delivery without operator copying |
| Each session has a host-verifiable identity | Binding messages to the intended chats |
| Claude can execute a locally available Codex command that queues a message to an exact existing chat | Claude-to-Codex delivery when Codex is idle; optional for active file-only replies |
| A working Node.js runtime | The example append and queue utilities below |

Run `node --version` in each session. If Node.js is unavailable, prepare installation of a supported LTS release using the [official Node.js downloads](https://nodejs.org/en/download), carry it out where permitted, and request only any required installation approval. Make the runtime available to both sessions and repeat the check. No npm packages are required. The examples below are complete source listings; review and save them yourself using a file-writing tool.

Desktop control is a capability requirement, not something a Markdown guide supplies. If it is absent, identify a supported computer-use integration for the host and prepare its setup; have Op handle required OS/app grants, then repeat the check. A browser-only tool does not necessarily control a native desktop app. If a required capability remains absent, report the limitation and prepare the smallest manual notification fallback; file access alone does not wake an agent.

This design uses existing signed-in sessions. It introduces no API-key setup, custom server, credential store, or separate model launch. It does not establish that every subscription, host, or command version supports the routes. Keep the normal host permission checks; standing collaboration authority does not bypass them.

## 2. Agent: prepare the shared folder and bind the chats

Use Op's selected folder and follow its current instructions. Ask for a folder only if none is available. Create this layout with your file tools, preserving existing contents:

```text
collaboration/
  guide.md                     # a copy of this entire document
  append-entry.mjs             # optional utility from section 6
  queue-pointer.mjs            # optional utility from section 4
  conversations/
    YYYY-MM-DD-task-name/
      chat.md
  scratch/                     # prepared bodies and disposable checks
```

Copy this entire guide to `collaboration/guide.md` and extract the utility listings into the indicated files. Keep conversations and scratch local by default, using existing local-storage conventions or scoped ignore entries; follow an explicit operator choice to retain conversations in version control. Inspect any website publishing inputs and keep conversations outside them or apply the supported exclusion. A Git ignore rule does not necessarily exclude files from a website, and a website exclusion does not make a public repository private. Report a conflicting repository policy rather than silently overriding it.

Reuse the initiating chat and locate the intended peer using host tools or desktop inspection. If several peer chats are plausible, ask Op once which to bind; do not choose by recency. The setup prompt authorizes creating one local peer chat if none exists and supported tools permit it; create no unrelated chats. If only Op can start that peer session, provide the exact app, local folder and startup prompt in one handoff. Record recognizable titles and exact identities using host session metadata, a supported thread-list tool, or a selected-chat URL that exposes its stable ID. Titles are navigation aids; a title match or the currently selected window is insufficient. Do not manufacture an identity from a title. If the host cannot expose a reliable identity, exact routing is not ready.

Where the Claude host exposes `CLAUDE_CODE_HOST_SESSION_ID`, compare it with the recorded Claude destination before appending or notifying. Otherwise use another host-verified identity. The variable is host-dependent; do not assume it exists or equate different ID formats without verifying their mapping.

Create a new `chat.md` for the setup task using this template. Fill the placeholders from verified observations; do not ask Op to transcribe IDs or timestamps that tools can obtain. If the lead is Claude, use Claude as the first entry's speaker and attribution. Keep actual binding data out of copies distributed to others.

```markdown
# Shared collaboration

Task: <task and permitted edits>
Reporting coordinator: <Codex or Claude>
Limits: <outgoing messages per agent; elapsed time>
Codex executable for queued delivery: <verified absolute path, or unavailable>
Return route: shared-file

| Participant | Exact destination ID | Display title | Observed URL or identity source |
| --- | --- | --- | --- |
| Codex | <Codex ID> | <title> | <host evidence> |
| Claude | <Claude ID> | <title> | <host evidence> |

## Codex — <actual UTC append time>

Reply requested: yes.
Return via: shared-file.

Op's direction, quoted by Codex: “<the actual instruction>”

<assignment, file ownership, requested result, and stopping condition>
```

The agent receiving the direction writes its own first entry. Do not invent an Op entry or attribute an agent's proposal to the operator. Use one conversation per task; inspect an existing file before deciding to resume it. Changing either coordinator requires an operator-approved binding update.

## 3. Agent: connect the peer and establish authority once

The initial setup prompt directly authorizes the lead to contact the intended peer. Relay its operator direction with attribution, not in Op's voice. Use a verified supported delivery route and request that the peer read the guide and conversation, verify its own binding and capabilities, and accept the collaboration scope where its host permits. For example, a Codex lead sends:

```text
Codex: Reply requested: yes. Return via: shared-file. Op asked me to lead setup and authorized contact with this pair. Read <guide path> and <conversation path>. My first shared entry quotes the operator's direction. Verify your identity and capabilities, state whether your host accepts the recorded scope, and append the result there. Start with these checks; do not edit overlapping setup files. I remain active to read the response.
```

For a Claude lead, use the `Claude:` prefix and the verified queue route to request the corresponding Codex checks. Explicitly ask Codex to append its response to the shared file and stop while Claude remains active to read it. This file-only response completes the initial handoff; section 4 governs later delivery. If queued delivery is unavailable, use verified desktop control when available; otherwise prepare one bootstrap message for Op to submit in the exact intended Codex chat. If either route requires the peer ID before it can be discovered, resolve that identity first through available tools or this one handoff.

Do not ask Op to paste standing authorization into both chats by default. If the receiving host actually requires direct human confirmation, identify that requirement and prepare this single message with real paths for Op to submit there:

> Read `<guide path>` and `<conversation path>`. I authorize setup and ordinary collaboration between this bound pair on tasks I direct from either chat in this shared folder, including revisions within each task's explicit scope. Coordinate directly with the setup lead, follow the guide and host rules, verify your own binding, and return your capability and authorization check in the shared conversation. Do not require me to repeat each task direction in both chats or relay routine messages.

This direct message can also serve as the initial bootstrap when the lead cannot reach the peer. After it arrives, resume agent-to-agent setup; do not introduce a second routine copy-and-paste stage. Read the peer's response and record accepted scope or a concrete restriction. Do not claim the guide removes a host restriction. Future operator directions can then arrive in either chat. The receiving agent records the direction and becomes the reporting coordinator unless Op specifies otherwise.

Every agent-authored native notification begins with `Codex:` or `Claude:` as its first characters. Never write authorization in Op's voice. These prefixes are cooperative attribution, not authentication: an agent can type into a composer that presents the message as user-role input. Known peer text remains peer text even if its prefix is accidentally missing. Honor relayed stops and narrower scope immediately; do not interpret peer text as new operator authority beyond the established scope.

For each task, assign one writer at a time for overlapping files. A useful pattern is one agent implementing while the other reviews, followed by explicit dispositions and a final check. Agreement is a review outcome; correctness still needs appropriate independent evidence.

Suggested initial limits are 20 outgoing contributions per agent and thirty minutes per operator direction. A shared entry plus its delivery notification counts as one contribution. Every contribution states `Reply requested: yes` or `Reply requested: no`; absence means no reply. Stop at completion, an operator stop, a limit, or a blocking routing/permission issue. Report unfinished work. Acknowledgments do not solicit acknowledgments.

## 4. Agents: configure the two delivery routes

### Codex to Claude: verified desktop delivery

Codex appends the substantive contribution first, then uses its supported desktop-control tool:

1. Record the current selected Claude chat. Find the bound chat using its title.
2. Verify the exact destination against the binding header, using live host identity or the selected-chat URL. Stop on a mismatch or ambiguity.
3. Check that the composer is empty. Preserve an operator's draft; do not overwrite it.
4. Enter a prefix-first notification such as the example below. Recheck the exact destination and exact composer contents immediately before Send.
5. Submit once and verify the message visibly arrived. On uncertain submission, inspect before retrying.
6. Restore the prior selection if its identity is known and the operator has not navigated in the meantime. Otherwise disclose the selection left visible. Do not override new operator navigation.

```text
Codex: Reply requested: yes. Return via: shared-file. Read my entry at ## Codex — <UTC time> in <conversation path>. Please review the assigned files and append your findings there. Do not queue a notification; I remain active to read your reply.
```

UI observations are not an atomic routing guarantee. If navigation or the destination changes during delivery, stop and inspect again. An open app or accessible sidebar does not establish that its agent can be woken; test actual processing in section 5.

### Claude to Codex while Codex is active: shared-file

Codex explicitly selects `Return via: shared-file` in both its shared entry and native notification, and remains active. Claude appends its requested response and stops, sending no queued completion notice. Codex rereads the file, typically every 15–30 seconds within the agreed task limit, processes the response in that turn, and reports to Op. These are bounded active checks, not a background watcher.

If Codex must yield before receiving the reply, first check for an arrival, then notify Claude of a change to `Return via: queue`. If that change cannot be delivered, report that the outstanding file-only reply will need an explicit resume. On resuming, read outstanding entries before sending another request.

### Claude to an idle Codex chat: queue, when available

Locate the installed Codex executable yourself with `command -v codex`; if it is not on PATH, inspect the installed desktop app's bundled tools for the appropriate executable. Run that exact executable with `--version` and `queue --help`. Record its absolute path and version in the local conversation header. An installed executable or successful help output establishes availability only; the section 5 delivery test establishes whether it reaches this desktop chat.

Use this route only if the installed help exposes `queue`, `--thread`, and `--message` for an existing session. Bind an exact ID even if a command also accepts names. If unsupported or unsuccessful, use manual notification and report the missing route; do not start a new model session, change authentication, or install a custom relay as an automatic repair.

Claude appends its complete reply, then queues one short pointer. Save the returned submission receipt. A receipt means submission was accepted, not that Codex read it. OpenAI distinguishes [queued follow-ups from active steering](https://developers.openai.com/blog/mastering-codex-remote-for-engineering#2-learn-the-difference-between-queue-and-steer): queued messages wait for a later turn. Do not also queue a reply Codex has already consumed through the shared file.

For safe argument handling, the setup lead saves this utility as `collaboration/queue-pointer.mjs` when configuring queued delivery:

```js
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const [executable, thread, messageFile] = process.argv.slice(2);
if (!executable || !thread || !messageFile) {
  throw new Error('Usage: node queue-pointer.mjs <executable> <thread ID> <pointer file>');
}
const message = fs.readFileSync(messageFile, 'utf8');
if (!message.startsWith('Claude:')) throw new Error('Missing Claude prefix');
const result = spawnSync(executable, ['queue', '--thread', thread, '--message', message], {
  shell: false, stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8', timeout: 30000
});
if (result.stdout) process.stdout.write(result.stdout);
if (result.stderr) process.stderr.write(result.stderr);
if (result.error) throw result.error;
process.exit(result.status ?? 1);
```

Claude prepares the pointer with a file-writing tool and invokes the utility from the shared folder. Op does not run this command:

```bash
node collaboration/queue-pointer.mjs '<verified executable path>' '<exact Codex ID>' 'collaboration/scratch/pointer.txt'
```

Example pointer contents:

```text
Claude: Reply requested: no. Read my response at ## Claude — <UTC time> in <conversation path>. Please report the result to Op. Do not send an acknowledgment back.
```

The utility passes text as one process argument without shell interpolation. Do not put arbitrary peer text inside shell code. A timeout or ambiguous failure needs inspection before retry; submission might already have occurred.

## 5. Agents: run the bounded acceptance checks

The setup lead coordinates these checks with the peer, records the observations, and reviews the result. Use disposable fixtures before assigning real work. No project source changes are needed. Op does not select chats, generate labels, compare files, or operate the utilities when the agents can do those steps.

1. **Shared access:** Codex writes a known line to a scratch file; Claude reads and quotes it exactly. Claude appends another known line; Codex reads it. Confirm both sessions see the same file, rather than separate clones or snapshots.
2. **Codex-to-Claude routing:** Codex records the current selection, temporarily selects another available Claude chat without entering text, then sends a unique test label to the bound chat using section 4. Claude returns the label through `shared-file` and stops. Codex verifies the correct chat received it, the other chat received nothing, the prior selection was restored, and the reply was processed while Codex remained active. If no other chat is available, test the bound destination and record the alternate-selection case as untested; do not create an unrelated chat merely for this check.
3. **Claude-to-Codex queued routing:** coordinate a handoff in which Claude appends a unique label and queues its pointer, and the bound Codex chat processes it in a later turn. Verify exact destination and processing, with no return acknowledgment loop. Where host state permits, observe that Codex was idle before submission to establish idle wake-up separately. Do not infer idle state from silence or a timer; without that observation, report next-turn delivery as tested and idle wake-up as untested. If completing the handoff needs human input, give Op one short, ready-to-send resume prompt in the exact chat; do not make Op stage or shuttle the test messages.
4. **Attribution and fidelity:** include dollar signs, backtick-delimited code, double and single quotes, accented letters, mathematical symbols, arrows and a literal backslash in an entry, and compare the stored and read text. Use balanced Markdown fences for code examples. Keep long or mathematical bodies in the file; pointers alone travel through native delivery.
5. **Refusal and stopping:** verify a mismatched destination stops delivery and a nonempty composer is preserved. With the section 6 utility, first check one known successful append, then check stale-heading and forged-heading refusals leave the scratch file unchanged. Finish by confirming no unrequested acknowledgment loop or queued duplicate follows a file-only reply.

Record actual observed results, executable versions and unresolved capabilities in the local conversation. An unavailable test is untested, not passed. File checks, skill discovery, invocation, submission, arrival and processing are separate observations. Recheck the affected route after relevant app updates, restarts, identity changes or failures.

## 6. Agents: keep the shared record intact

Each entry starts with `## Codex — <UTC time>` or `## Claude — <UTC time>`, using its actual append time. Use `###` or deeper for subsections. File order is message order. Retain substantive contributions, attributed operator directions, dispositions and outcomes; omit credentials, unrelated private material and internal reasoning traces.

Senders prepare their body as a UTF-8 file using a file-writing tool. Immediately before appending, reread the last participant heading outside fenced code. Use a single append write and verify it; do not replace the transcript to add a turn. After appending, give the peer the append turn until its response arrives. Structural header changes require a settled exchange and one designated writer.

The setup lead saves the following self-contained utility as `collaboration/append-entry.mjs` and checks it on known scratch cases before either agent uses it on the conversation. It accepts either agent's speaker name because it is a cooperative local utility; each agent must supply only its own name. It is not an authentication boundary or a concurrent queue. The expected-heading check relies on sequential handoff and provides no general cross-process lock.

```js
import fs from 'node:fs';

const [speaker, chat, bodyFile, expected] = process.argv.slice(2);
function fail(message) { throw new Error(message); }
if (!['Codex', 'Claude'].includes(speaker) || !chat || !bodyFile || expected === undefined) {
  fail('Usage: node append-entry.mjs <Codex|Claude> <chat> <body> <expected last heading>');
}
function scan(text) {
  const entries = [];
  let open = null;
  for (const line of text.split('\n')) {
    const fence = /^ {0,3}(`{3,}|~{3,})(.*)$/.exec(line);
    if (open) {
      if (fence && fence[1][0] === open.char && fence[1].length >= open.length && !fence[2].trim()) open = null;
      continue;
    }
    if (fence && !(fence[1][0] === '`' && fence[2].includes('`'))) {
      open = { char: fence[1][0], length: fence[1].length };
      continue;
    }
    if (/^## (Codex|Claude|Op) — \S/.test(line)) entries.push(line);
  }
  return { entries, open };
}
const before = fs.readFileSync(chat);
const body = fs.readFileSync(bodyFile);
const bodyText = body.toString('utf8');
const oldScan = scan(before.toString('utf8'));
const bodyScan = scan(bodyText);
if (!bodyText.trim() || bodyScan.entries.length || bodyScan.open) fail('Empty or structurally unsafe body');
if (oldScan.open) fail('Transcript has an open fence');
if ((oldScan.entries.at(-1) ?? '') !== expected) fail('Last heading changed; reread before appending');
const timestamp = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
const lead = before.length && before.at(-1) !== 10 ? '\n\n' : '\n';
const tail = body.at(-1) === 10 ? '' : '\n';
const entry = Buffer.concat([Buffer.from(`${lead}## ${speaker} — ${timestamp}\n\n`), body, Buffer.from(tail)]);
if (!fs.readFileSync(chat).equals(before)) fail('Transcript changed; reread before appending');
const fd = fs.openSync(chat, 'a');
try {
  if (fs.writeSync(fd, entry) !== entry.length) fail('Partial append; inspect before retrying');
  fs.fsyncSync(fd);
} finally { fs.closeSync(fd); }
if (!fs.readFileSync(chat).equals(Buffer.concat([before, entry]))) fail('Append unverified; inspect before retrying');
console.log(`Appended ## ${speaker} — ${timestamp}`);
```

Example agent invocation after reading the current last heading:

```bash
node collaboration/append-entry.mjs Claude 'collaboration/conversations/YYYY-MM-DD-task-name/chat.md' 'collaboration/scratch/body.txt' '## Codex — <actual last timestamp>'
```

Use an empty final argument (`''`) only when the transcript has no participant entries. The utility preserves body bytes and adds a final newline when missing. After any write-verification failure, inspect the transcript before retrying; the failure does not imply nothing was appended. Op can contribute directly in either native chat; agents record those directions with attribution. Direct file contributions should occur only during a settled exchange.

## 7. Agent: configure shared-skill discovery where supported

As part of the setup prompt, the lead prepares the shared skill where the hosts support it and folder policy allows it. If unavailable, continue with direct guide reads and report the limitation. A skill makes it easier to discover and reload the procedure; it adds no transport capability or permissions.

The setup lead creates `collaboration/skill/SKILL.md` in the selected shared folder with:

```markdown
---
name: codex-claude-collaborate
description: Collaborate between bound Codex and Claude chats on an operator-directed task, review peer work, or resume an interrupted exchange. Excludes unrelated tasks and general product questions.
---

Read collaboration/guide.md and the selected conversation's binding header and recent entries. Follow the folder's current instructions. Verify your own identity and the peer destination. Work only within the operator's direction and assigned file ownership. Apply the guide's delivery, append, reply-route, stopping and recovery rules. Report missing capabilities and continue only unaffected work.
```

The setup lead creates discovery links from that folder's root if the names are unused:

```bash
mkdir -p .agents/skills .claude/skills
ln -s ../../collaboration/skill .agents/skills/codex-claude-collaborate
ln -s ../../collaboration/skill .claude/skills/codex-claude-collaborate
```

Do not force-replace existing skills. Inspect conflicting names and choose a distinct name and matching manifest if needed. Both discovery entries should resolve to the same source folder. Ensure they are real directory symlinks rather than files containing the target path.

[Codex documents repository discovery in `.agents/skills` and support for symlinked skill folders](https://learn.chatgpt.com/docs/build-skills). [Claude Code documents `.claude/skills`, symlinked folders, and `/skill-name` invocation](https://code.claude.com/docs/en/skills). In Codex, select or explicitly mention the skill using the host's skill interface. In Claude Code, invoke `/codex-claude-collaborate` with the task and conversation path.

Verify discovery and invocation in each host separately. Codex documents automatic change detection; if a change does not appear, arrange a restart at a suitable stopping point. Claude Code normally watches existing skill directories, but if the top-level skills directory was created after the session began, use `/reload-skills`, including after later changes in that newly created directory. These behaviors are documented in the linked skill pages; host policies and versions may restrict them. Use supported agent controls for reloads where permitted; ask Op only when the host requires a direct command or restart. Preserve the conversation and outstanding work before any restart. Reloading instructions does not prove that delivery works.

Local Code discovery needs no ZIP. Chat/Cowork skill upload is a separate vendor workflow and cannot supply missing local-folder or desktop access by itself; it is outside this local setup.

## 8. Agent: finish setup; Op: direct real work

Finish with one report in the initiating chat: the shared folder and conversation path, bound chat titles, actual working delivery routes, skill discovery/invocation status, and any remaining operator action. Identify untested behavior explicitly. Offer a ready-to-send example task with actual conversation paths filled in; do not make Op reconstruct the configuration from command output.

After the relevant acceptance checks pass, Op directs work from either app. For example:

> Collaborate on `<task>`, using `<conversation path>`. Codex owns implementation and Claude reviews. Complete one review round, incorporate valid comments or explain disagreements, and have Codex report the combined result here. Stop when complete or at the agreed limits.

The reporting coordinator delegates, reads the reply, resolves substantive findings, reconciles the agreed files and reports changes, checks and remaining limits to Op. An agent receiving a peer request works within the recorded direction and reports through the selected route rather than duplicating the final operator report.

After an interruption, reread the conversation, process unanswered contributions, recheck affected bindings and agree the next writer and return route. An already-handled late pointer does not restart the task. Uncertain submission requires inspection before retrying. Ordinary queued text is not an immediate stop of running work; use the app's stop control when immediate interruption is needed, then reconcile the record.

The design has no continuous watcher, automatic capture of every native message, exactly-once delivery guarantee or hard authentication between the two agents. Its bounded checks, explicit handoffs and verified destinations provide a practical collaboration procedure. Review the work on its merits; successful delivery does not establish the correctness of either agent's conclusions.
