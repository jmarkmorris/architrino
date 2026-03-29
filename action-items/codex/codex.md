
## Process Reminder

- In the next repo-process follow-up branch/PR, update `repo.md` guidance so the standard PR flow goes beyond draft creation and explicitly marks the PR `ready for review` when the work is genuinely reviewable.

## API vs. plan usage instructions.

The Codex CLI does **not** expose a clean “mode switch”. Let’s strip this down to what actually works in practice.

There are **only two real selectors**:

1. Environment variable `OPENAI_API_KEY`
2. Whether you are logged in via browser (`codex login`)

And **environment variables win**.

If a key is present, Codex uses the API. Period.

If no key is present, Codex falls back to your ChatGPT Plus/Pro login.

---

# Switch FROM API Key → TO Plus/Pro Plan

Goal: Make Codex ignore the API key and use your ChatGPT subscription.

### Step 1 — Remove the API key from your shell

Check first:

```bash
echo $OPENAI_API_KEY
```

If you see anything → it’s active.

Disable it (current session):

```bash
unset OPENAI_API_KEY
```

---

### Step 2 — Save chat history and then Clear old Codex credentials

```bash
cp -r ~/.codex/sessions ~/codex_backup_sessions
```

This avoids stale auth confusion.

```bash
rm -f ~/.codex
```

---

### Step 3 — Log in via browser

Now authenticate to ChatGPT:

```bash
codex login
```

Browser opens → sign in → approve.

This binds Codex to your Plus/Pro account.

---

### Result

Now:

* No API key
* Using subscription

---

## Related Action Items

- [cruft-sprawl](../cruft-sprawl/cruft-sprawl.md)
- [composer-reaction](../composer-reaction/composer-reaction.md)
- [chapter-authoring](../chapter-authoring/chapter-authoring.md)

## Related AAA Notes

- [software-architecture-and-maintenance](../../content/markdown/aaa/archie/software-architecture-and-maintenance.md)
- [about-the-webapp](../../content/markdown/aaa/archie/about-the-webapp.md)
- [navigation-and-controls](../../content/markdown/aaa/archie/navigation-and-controls.md)
