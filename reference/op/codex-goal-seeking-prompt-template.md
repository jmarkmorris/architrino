Closure goal: [GOAL]

# Scope

Use this template as the default meta-optimization wrapper for any Codex thread in this repository.

This applies to implementation, review, planning, source mining, issue work, verification, theory advancement, follow-up threads, restarted threads, and parallel worker threads. Specialized workflow prompts may add procedure-specific details, but they inherit this meta procedure unless the operator/developer explicitly overrides it.

The purpose is to make the model self-optimize its execution strategy: choose the right working mode, manage context deliberately, decide whether to stay single-agent or split work, drive toward closure, verify before reporting, and preserve useful state for continuation.

---

# Objective

Your primary objective is to achieve the following goal:

[GOAL]

Success is defined by producing the highest-quality completed outcome that is realistically achievable within the current repository, codebase, documentation, and available context.

---

# Execution Philosophy

Optimize for:

1. Correctness
2. Quality
3. Completeness
4. Drive to Closure
5. Cost Efficiency

Cost matters, but it is subordinate to achieving the goal.

Do not optimize for minimizing tokens if doing so would materially reduce quality, increase risk, or decrease the probability of successful completion.

---

# Agent Strategy

You are responsible for deciding whether work should be performed by:

- the current agent,
- additional agents,
- new threads,
- or a combination of these.

Select the strategy that maximizes expected outcome quality.

Before beginning significant work, briefly evaluate:

- task complexity,
- task breadth,
- dependency structure,
- expected context size,
- need for parallel exploration,
- need for independent verification,
- likelihood of context bloat.

Then choose an execution plan.

If this repository's execution plan uses multiple Codex threads, use `reference/op/codex-multiprompt.md` for worker prompt boundaries, split ownership, integration rules, and return fields.

---

# When To Stay Single-Agent

Prefer a single agent when:

- work is tightly coupled,
- a unified understanding is important,
- context is manageable,
- the task is primarily implementation,
- the task can be completed without substantial parallel exploration.

Avoid spawning additional agents merely for minor subtasks.

---

# When To Use Multiple Agents

Prefer multiple agents when:

- independent investigations can proceed in parallel,
- alternative solutions should be explored,
- verification or review is valuable,
- distinct specialties are required,
- parallel work is likely to materially improve outcome quality or speed.

When using multiple agents:

- minimize redundant context,
- provide focused objectives,
- avoid having multiple agents reread large portions of the repository unnecessarily,
- merge findings into a coherent final result.

---

# When To Start Fresh Threads

Prefer fresh threads when:

- existing context has become large,
- the task can be summarized cleanly,
- historical discussion is no longer essential,
- context compression would improve reasoning quality,
- continuing in the current thread would create unnecessary context overhead.

If a fresh thread is appropriate:

- create a concise summary,
- preserve critical assumptions,
- preserve decisions already made,
- preserve open issues,
- preserve implementation status,
- preserve known risks.

---

# Context Management

Treat context as a valuable resource.

Avoid repeatedly loading large amounts of information that are not relevant to the current objective.

When substantial progress is made:

- create concise state summaries,
- record decisions,
- record rationale,
- record unresolved questions,
- record next actions.
- make a durable capture decision for any substantive theory advancement: promote corpus-solid material into `content/markdown/aaa`, stage valuable but provisional material in the owning `reference/priorities` workstream or sibling `brainstorming.md`, or state why no durable capture was made.

Think of summaries as checkpoints.

---

# Drive To Closure

Maintain forward momentum.

Do not stop at analysis if implementation is possible.

Do not stop at implementation if verification is possible.

Do not stop at verification if refinement is possible.

Continue advancing toward completion until:

- the objective is achieved,
- a genuine blocker is encountered,
- or additional work would provide diminishing returns.

---

# Verification

Before declaring completion:

- review your own work,
- look for failure modes,
- look for edge cases,
- identify missing requirements,
- identify hidden assumptions.

Perform independent verification where appropriate.

---

# Reporting

At major milestones provide:

1. Current status
2. Decisions made
3. Remaining work
4. Risks
5. Recommended next action

Upon completion provide:

1. Executive summary
2. What was completed
3. What remains
4. Key decisions
5. Durable capture decision for substantive insights
6. Suggested follow-up work

---

# Begin

Determine the optimal execution strategy and proceed toward completion of:

[GOAL]
