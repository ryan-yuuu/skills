---
name: open-source-vendoring-best-practices
description: >-
  Proper step-by-step procedure for bringing external code into a project —
  copying, vendoring, porting, or adapting source from a GitHub repo or other
  open-source project, and editing code that was previously brought in that way.
  Use this skill WHENEVER the user asks to copy, grab, lift, vendor, port,
  adapt, borrow, or reuse code — a file, a function, a class, or a snippet —
  from another repo, library, gist, Stack Overflow, or any open-source project,
  even if they never mention licensing. It checks the license FIRST, records
  attribution and provenance, and stops to flag risky licenses (GPL/AGPL,
  no-license, proprietary/source-available) before any code is copied. Trigger
  on phrases like "copy this from <repo>", "vendor X", "port this
  implementation", "adapt this snippet", "grab the X function from Y repo",
  "use this open-source code", "pull in this dependency's code", or when editing
  files that were previously copied from upstream.
---

# Open-source vendoring best practices

Bringing someone else's code into this project is normal and encouraged — it's
what open source is for. The risk isn't *using* the code; it's pasting it in
without checking the license, dropping the copyright notice, or losing track of
where it came from. Those mistakes are cheap to avoid up front and expensive to
untangle later (a license audit, a re-sync after a security fix, a takedown
request). This skill is the disciplined sequence that keeps the project clean.

The single most important rule: **check the license before you copy anything.**
Copying first and discovering it's GPL or unlicensed afterward is the failure
mode this skill exists to prevent.

## When this applies

Any time code originates outside this repo: a GitHub repo, a library you're
vendoring instead of installing, a function ported from another language, a
gist, a Stack Overflow answer, or a blog snippet. It also applies when you're
asked to *edit* code that was previously copied in this way — see
[Editing already-vendored code](#editing-already-vendored-code).

It does **not** apply to code you're writing yourself, to dependencies pulled in
through a normal package manager (npm/pip/cargo resolve licenses through the
manifest — that's a different, lighter process), or to refactoring existing
first-party code.

---

## The workflow

### 1. Find and read the license — before copying

Locate the license that governs the code you want:

- Look for `LICENSE`, `LICENSE.md`, `LICENSE.txt`, `COPYING`, or a "License"
  section in the README at the repo root.
- **Check the specific file or folder you're taking.** A repo can be
  mixed-license: a permissive project may contain a vendored dependency under a
  different license, or a single file may carry its own header. The license that
  matters is the one on *the code you're copying*, not just the repo's headline
  license.
- With the `gh` CLI you can read the detected license without cloning:
  `gh api repos/<owner>/<repo>/license --jq '.license.spdx_id'`.

Record the **copyright holder(s)** and **year(s)** verbatim from the notice —
you'll reproduce them in the attribution.

### 2. Classify the license and decide go / stop

Match the license to the table below. Permissive licenses are the green-light
path and the focus of this skill; everything else is a **stop-and-flag** case.

| License | Class | Action |
|---|---|---|
| MIT, ISC, BSD-2/3-Clause, Apache-2.0, Unlicense, 0BSD, CC0 | **Permissive** | ✅ Continue the workflow |
| MPL-2.0, LGPL, EPL | Weak copyleft | ⚠️ Stop & flag |
| GPL-2.0, GPL-3.0, AGPL-3.0 | Strong copyleft | ⚠️ Stop & flag |
| No license file anywhere | All rights reserved | ⚠️ Stop & flag |
| BSL, SSPL, Commons Clause, "non-commercial", custom/"source-available" | Restricted | ⚠️ Stop & flag |

**On the permissive path, keep going.** A couple of specifics worth honoring:

- **Apache-2.0** adds a patent grant, requires you to preserve any `NOTICE`
  file from the source, and requires *stating significant changes* you make.
- **BSD/MIT/ISC** just need the copyright line + license text preserved.

**On any stop-and-flag case, do not copy.** Instead, pause and tell the user:

1. The license you found and what class it is.
2. The *specific* risk in plain language — e.g. "GPL-3.0 is strong copyleft:
   distributing this code can require the whole project to be released under
   GPL-3.0," or "There's no license file, which means all rights are reserved —
   it's not legally safe to copy even though the code is public."
3. What would make it acceptable — e.g. "This is fine if this project is also
   GPL-3.0," or "We could ask the author to add a license / grant permission,"
   or "We could use it as a separate linked component rather than copying it in."

Then let the user decide. Don't proceed on a guess — license risk is the user's
call, not yours. Keep this explanation short and concrete; don't lecture on
copyleft theory.

### 3. Capture provenance

Before you copy, write down where it's coming from. You'll need this to apply
upstream security fixes, re-sync later, or answer an audit:

- Source repo URL
- Exact commit SHA (preferred) or release tag / version
- Today's date
- Which file(s) / function(s) you're taking

`gh api repos/<owner>/<repo>/commits/<branch> --jq '.sha'` gives you the current
SHA if you're copying from the default branch.

### 4. Detect the project's attribution convention

Before creating anything new, see how this project already credits third-party
code, and match it. Look, in order, for:

- A notices file: `THIRD_PARTY_LICENSES`, `THIRD-PARTY-NOTICES`, `NOTICE`,
  `NOTICES`, `CREDITS`.
- A bundled-license directory: `licenses/`, `third_party/`, `vendor/`.
- Existing copied files that carry an attribution header — copy that style.

If none exists, default to a `THIRD_PARTY_LICENSES` file at the repo root plus
preserved file headers. Consistency matters more than which convention you pick.

### 5. Copy the code and preserve notices

- Bring the code in.
- **Keep any existing copyright/license header intact.** Stripping it is the
  single most common — and most serious — way to violate a permissive license.
- If the file had no header but the license requires attribution, add a short
  one pointing back to the source:

  ```
  // Source: https://github.com/<owner>/<repo> @ <sha>
  // License: MIT — Copyright (c) <year> <holder>
  ```

### 6. Record attribution

Add an entry to the notices file from step 4. Include the component name, source
URL, the commit/version, the SPDX license id, and the **full license text** (for
MIT/BSD/ISC, the copyright line + the short license body). The license text only
needs to appear once per distinct copyright holder, not once per file. See
`references/notice-template.md` for a ready-to-fill entry.

### 7. Mark your modifications

If you change the borrowed code, note what changed — a header line like
`// Adapted from <repo>@<sha>: <summary of changes>` is enough. Apache-2.0
*requires* stating significant changes; for the other permissive licenses it's
courtesy that pays off every time you need to re-sync with upstream or figure
out months later which lines are yours.

### 8. Make it traceable in git

Where possible, split the work into two commits:

1. **Vendor unmodified** — `Vendor <component> from <repo>@<sha> (MIT)` with the
   code exactly as upstream.
2. **Adapt** — your edits and integration in a separate commit.

This makes "theirs vs. ours" obvious in `git log` and lets you diff cleanly
against future upstream versions. If two commits aren't practical, at least
state the boundary clearly in the commit message. (Commit only when the user has
asked you to — otherwise just stage the change and note the suggested split.)

### 9. Report a compliance summary

Close the loop so the user can verify obligations were met. Use this template:

```
Copied: <component / file(s)>
From:   <repo URL> @ <sha or version>
License: <SPDX id> (<permissive | …>)
Attribution: <path to notices file / header> ✅
Modifications: <none | summary, noted in <file>>
Obligations: <e.g. "MIT — copyright notice + license text preserved">
```

---

## Editing already-vendored code

If you're asked to edit code that was previously copied from an open-source
project, the license and provenance steps are likely already done — look for an
existing attribution entry or a source header first.

- **If attribution exists:** you're picking up at step 7. Mark your
  modifications, leave the existing copyright notice in place (don't delete the
  original author's line just because you're changing the code), and keep the
  change traceable.
- **If no attribution exists but the code is clearly external** (a stray header,
  an obvious port, a comment like "from such-and-such"): treat it as a fresh
  intake and run the full workflow to retroactively record what's missing.

---

## The minimal version

For a small or personal project, the non-negotiable core is three steps:

> **Check the license** (including the stop-and-flag off-ramp) → **preserve the
> notice** → **record the attribution.**

Everything else — provenance capture, two-commit hygiene, modification
markers — is what makes this scale to a real codebase and an eventual audit.
Apply it in full when the stakes warrant; never skip the core three.
