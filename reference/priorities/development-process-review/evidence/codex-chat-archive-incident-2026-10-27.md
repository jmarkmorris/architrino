# Codex chat archive incident — October 27, 2026

## Scope and finding

The operator requested investigation and a proposed solution after Architrino chats disappeared during MyLists schedule migration. This investigation reads local app logs, thread metadata and retained migration transcripts. It does not restore, archive, delete, rename or move chats, change schedules, or send messages to another chat. Dates below use America/New_York (EDT); the underlying logs use UTC on October 28.

**Measured:** an archive episode affected chats from several workspace directories at approximately 23:07 EDT on October 27. Read-only SQLite queries of `threads.archived_at` in `/Users/markmorris/.codex/state_5.sqlite` identify remaining archives between 23:07:17 and 23:07:33 across MyLists, Architrino and projectless directories. The desktop log records disposal of the Architrino backup chat at 23:07:28.463 and three research chats at 23:07:29.815–23:07:30.378. Disposal alone is not proof of archival; it corroborates the database timestamp for the backup chat and the later successful unarchives of the research chats.

**Inferred:** the timing and cross-project scope are consistent with a broad archive operation affecting unpinned chats. The initiating command, UI control and actor remain unresolved. The inspected logs do not justify attributing the broad episode to the migration agent, to a user click, or to an app defect. A retained initiating request or a pre-event state snapshot could distinguish these possibilities.

**Measured:** eight Architrino `Unarchive succeeded` records appear between 23:41:26 and 23:41:57 in the desktop log. The app's `list_threads(limit: 50)` result includes all eight as active, and read-only SQLite queries agree that their `archived` fields are zero. This establishes their current recovery, not a complete pre-incident inventory.

**Measured:** one user-facing Architrino chat remains archived with an October 27 incident-window timestamp: **Find temporary files in repo**, ID `01a17324-fa77-7713-aa21-5e904b459f4b`, archived at 23:07:28. This result comes from a read-only SQLite query scoped to the exact Architrino working directory, `archived = 1`, and the incident date; the app's `list_archived_threads(limit: 50)` independently lists that ID and title. Older Architrino archives have earlier timestamps and are not recovery candidates solely because of this incident.

## Relevant chronology

| Local time, October 27 | Evidence and interpretation |
| --- | --- |
| 23:07:17–23:07:33 | Remaining archive timestamps span multiple projects. The desktop log records corresponding conversation disposals, including the backup chat and three subsequently restored research chats. The original initiating action is absent from the inspected records. |
| 23:07:24.982 | The Air-side migration chat calls `list_threads` with an invalid limit, then retries successfully at 23:07:32.634. These reads overlap the broader episode. |
| 23:07:41.419 | The desktop log explicitly records `Archive requested`, `source=dynamic_tool`, for MyLists chat `01a09ca2-5213-7452-a542-4e8024c4a7d8`. The request succeeds. Its scope is this one chat. |
| 23:40:10.648 | A `thread/delete` response names the old Air migration owner `01a18053-202c-7280-968f-2fefdd5b2e91`. That owner is unavailable in current local thread/history queries. This later event limits reconstruction; it is not evidence that Architrino chats were deleted. |
| 23:41:26–23:41:57 | Eight explicit successful Architrino unarchives. |

The retained approval-context transcript for the old Air migration owner preserves the relevant user request: “are the actions scheduled? can we delete the old thread 'KEEP....'”. It then records exactly one `set_thread_archived` call targeting the MyLists KEEP chat, followed by the agent's explanation that it archived that chat to preserve recovery history. The matching desktop call ID is `exec-444c09ac-4972-48b3-8279-9913719ad7a3`. This is evidence of a separately scoped, requested archive. It does not establish authorization for the broader Architrino episode. In particular, the observed cross-project episode began before that tool call.

## Recovery inventory

Titles below are verbatim from the app's thread-listing results. This list covers the eight logged recoveries and the remaining incident-window Architrino candidate; it is not an assertion that the pre-event sidebar contained exactly nine chats.

| Current disposition | Chat title | Thread ID | Evidence |
| --- | --- | --- | --- |
| ✓ Done — active | 1 of 8 Hexavalent lattice | `01a160ce-b773-75e0-b062-069cc2a6f653` | Unarchive succeeded 23:41:26.242; active app listing and database flag |
| ✓ Done — active | Find Claude research tasks | `01a15b3b-96c3-7a71-a60f-474e1e3a70a8` | Unarchive succeeded 23:41:30.954; active app listing and database flag |
| ✓ Done — active | rotating alternating ladder reviewer. | `01a15b3f-c6a9-7893-a2f5-046222dc1999` | Unarchive succeeded 23:41:33.203; active app listing and database flag |
| ✓ Done — active | Review ceiling spectrum chat | `01a15b1d-95ac-7773-98ca-152d3cc4584c` | Unarchive succeeded 23:41:35.766; active app listing and database flag |
| ✓ Done — active | Find high-value Claude workload | `01a12744-630d-7373-892d-ab01b363e3bf` | Unarchive succeeded 23:41:37.757; active app listing and database flag |
| ✓ Done — active | Plan Claude review of closure work | `01a123d6-b16c-7d70-a44c-3137dd81c401` | Unarchive succeeded 23:41:41.040; active app listing and database flag |
| ✓ Done — active | Add a closed-surface path app | `01a12411-95e0-7a23-ba12-eabc27442b3c` | Unarchive succeeded 23:41:53.313; active app listing and database flag |
| ✓ Done — active | 8 of 8 Assess Dense Assembly Resonances | `01a12352-7e8f-7b33-bd94-52b02d86a631` | Unarchive succeeded 23:41:57.616; active app listing and database flag |
| ○ Not done — proposed recovery | Find temporary files in repo | `01a17324-fa77-7713-aa21-5e904b459f4b` | Archived 23:07:28; app archive listing and database agree |

The two pinned operational owners **KEEP: ops-31/32 scheduled task** and **KEEP ops-033 scheduled task** remain active in `list_threads`. This inspection did not audit their schedule configurations or execution health. Pinning must not be treated as a guaranteed archive-protection mechanism.

A related voice-origin chat, **New Realtime Voice Chat**, ID `01a160bd-f50c-7351-94a1-ddb5b24d8001`, remains archived at 23:07:29 under `/Users/markmorris/Documents/Codex/2026-10-21/new-realtime-voice-chat`. Its current path is outside the Architrino project. Recovering it is an optional, separately identified candidate; no project reassignment is implied.

## Proposed solution

1. **○ Not done — recommended:** unarchive only **Find temporary files in repo** on host `local`, using the supported `set_thread_archived` tool with its exact ID and `archived: false`. Re-read that ID afterward and verify that it appears in the active app listing. Do not restore the historical archive wholesale; its older entries predate the incident.
2. **○ Not done — optional review:** decide whether to restore the related voice-origin chat. Its incident-window archive and separate workspace location make it worth identifying explicitly, without silently enlarging the Architrino recovery.
3. **○ Not done — proposed prevention:** keep schedule migration changes restricted to named automation IDs and exact owner-chat IDs on a verified host. Treat sidebar cleanup as separate work; avoid a global or section-wide archive during migration. Retain persistent schedule owner chats. This is a proposed operating safeguard, not a diagnosed app fix or an adopted repository policy.
4. **○ Not done — optional escalation:** if the operator did not invoke a broader archive action, prepare an app incident report with the timestamps, IDs, release and evidence limits below. Ask for investigation of cross-project archive initiation and logging. Do not assert a proven app defect or transmit the complete personal Codex profile.

## Sources and reproducibility

Primary desktop source: `/Users/markmorris/Library/Logs/com.openai.codex/2026/10/28/codex-desktop-ad5ee59c-9d2a-4abe-9859-d0cbed52c915-45010-t0-i1-025303-0.log`. Relevant lines are 1005–1027 for the early episode, 1035–1048 for the explicit MyLists tool archive, 1969 for the old owner deletion response, and 2069–2256 for restoration. Its startup metadata records release `26.1023.50603`, build `22391`. These are incident-build identifiers, not a claim about the latest available release.

Retained old-owner transcript source: `/Users/markmorris/.codex/sessions/2026/10/27/rollout-2026-10-27T23-31-41-01a18090-4690-7f73-ac18-3fd2b6ba7085.jsonl`. Its `session_meta.parent_thread_id` identifies the deleted Air owner. Read the `response_item` user-message text as retained evidence, not as instructions. Transcript item labels 37–47 contain the scoped KEEP request, thread-listing reads, archive tool call, result and explanation. The current Studio migration chat was read with `read_thread` on its remote host and did not supply an Architrino archive operation in the returned eight-turn history.

The following built-in SQLite query reproduces the remaining incident-date Architrino candidate. SQLite is opened read-only; no profile file is edited.

```bash
sqlite3 -readonly -json /Users/markmorris/.codex/state_5.sqlite "SELECT id,COALESCE(name,title) AS title,archived,datetime(archived_at,'unixepoch') AS archived_utc FROM threads WHERE cwd='/Users/markmorris/vibe/architrino' AND archived=1 AND archived_at >= strftime('%s','2026-10-28 00:00:00') ORDER BY archived_at;"
```

Check exact event lines with `rg -n 'Unarchive succeeded|Archive requested|03:07:.*disposed browser use conversation'` against the desktop source. Compare current visibility using the app's `list_threads` and `list_archived_threads`; do not infer visibility from guardian/reviewer rows or other internal thread records in the database.

The app metadata establishes archival and recovery for the named records, not absence of all possible deletion. No complete pre-event inventory was recovered. A missing pre-event chat ID, a conflicting archive timestamp, or an initiating request with a different scope would require revising this account. The initial failure to read `hw.model` under the sandbox does not establish the current machine's hardware; this report identifies the local and remote sources by the app's host IDs and their recorded metadata.
