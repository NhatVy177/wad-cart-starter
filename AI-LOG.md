# AI-LOG

**Student ID:** 23120192

---

## 2026-09-29 — Initial red run
- **Tool:** None.
- **Asked for:** —
- **By hand:** Cloned `fithcmus/wad-cart-starter`, ran `npm test` — 1 test, 1 fail, `Error: not implemented` at `src/cart.js`. Created `NhatVy177/wad-cart-starter` on GitHub and switched remote to point there. This confirmed the harness worked before any code was written.

---

## 2026-09-29 — Harness, Prettier gate, brief, and implementation (committed together as `0b6a74a`)
- **Tool:** Claude Opus 4.6 (Antigravity IDE).
- **Asked for:** (1) `AGENTS.md` rules file and `.github/workflows/ci.yml`; (2) Prettier as format gate; (3) `brief.md`; (4) `cartTotal` implementation and tests.
- **Kept:** CI structure (`npm ci`, `npm test`, `npm run lint` on push). Prettier pinned in `devDependencies`. Brief structure (Task, Files, Contract, Error cases, Done when). Core logic: `reduce` for subtotal, `Math.round` for return, `>=` for free-shipping threshold, validation loop before any calculation.
- **Changed:** Renamed proposed `rules.md` to `AGENTS.md`. CI initially used Node 20 — I forced Node 22 to match the session 2 slides. AI left `devDependencies` empty — I caught this and pinned `prettier@3.9.9` explicitly. AI used `item.price < 0` to check price — I caught that this misses `NaN`, `Infinity`, and strings, and forced `typeof item.price !== "number" || !Number.isFinite(item.price) || item.price < 0`. AI kept the starter comment `// Implement cartTotal here` — I removed it. AI included `!items ||` guard (not in spec) — I removed it. These four steps were done in one working session and committed together.
- **Rejected:** First version of `brief.md` was just the assignment text copied in; I rejected it and wrote a proper brief with files, contract, error cases, and "no dependencies". First version of `SELF_ASSESSMENT_REPORT.md` had 14 rows invented by the AI against a rubric it had not read; I rejected it entirely.
- **By hand:** Ran `npm test` (26/26 green at this point) and `npm run lint` (clean). Read every diff before accepting.

---

## 2026-09-29–30 — Document rewrites after rubric review
- **Tool:** Claude Opus 4.6 (Antigravity IDE).
- **Asked for:** Rewrite `AI-LOG.md`, `brief.md`, and `SELF_ASSESSMENT_REPORT.md` to match the real 5-criterion rubric.
- **Kept:** The 5-entry log structure. Evidence lines pointing to specific test names and file names.
- **Changed:** Removed 14-row invented rubric from report and replaced with 5-row real rubric. Rewrote brief from assignment text to a proper prompt with files, contract, errors, and "done when" conditions. Added `.prettierrc.json` and `.gitattributes` to enforce LF line endings on Windows.
- **Rejected:** Draft report that used line numbers as evidence (line numbers shift when code changes).
- **By hand:** Cross-checked each evidence line in the report against the actual file to make sure it was true.

---

## 2026-09-30 — Review with a second AI assistant and rewrite of documents
- **Tool:** Claude Sonnet 4.6 (Antigravity IDE chat session — no direct repo access).
- **Asked for:** Review of code, tests, brief, AI-LOG, and self-assessment against the rubric checklist.
- **Kept / applied by me:** Split `"return value is an integer (typeof number, no decimals)"` into two separate tests (`"return value is typeof number"` and `"return value is an integer (no decimals)"`). Added two second-item validation tests: `"invalid qty in second item throws RangeError"` and `"invalid price (NaN) in second item throws RangeError"`. Removed the starter comment from `src/cart.js`. Removed `!items ||` guard. Fixed `AGENTS.md` to align with `brief.md` on `package.json` and added `.github/workflows/` to the not-touch list. Fixed self-assessment: removed wrong "loop doesn't exit early" bullet (throw exits immediately), changed "6 Never rules" to "6 rules, 3 of them Never", removed line numbers from evidence, added CI run link, corrected self-assessed total to 95.
- **Rejected:** Suggestion to keep total at 100 — I chose 95 as a more calibrated estimate (Behaviour 30, Tests 19, Harness 19, Brief 14, AI-LOG 13).
- **By hand:** Re-ran `npm test` (29/29 green) and `npm run lint` (clean). Checked CI run #6 at https://github.com/NhatVy177/wad-cart-starter/actions/runs/36666267461 — Success on commit `04a0abd`.
