# AI-LOG

**Student ID:** 23120192  
**Date:** 2026-09-29  

## 2026-09-29 — Setup harness and rules file
- **Tool:** Claude Opus 4.6.
- **Asked for:** Create `AGENTS.md` rules file and `.github/workflows/ci.yml` for Node 22 CI.
- **Kept:** The CI workflow structure: `npm ci`, `npm test`, `npm run lint` on every push.
- **Changed:** The AI initially proposed `rules.md` as the filename; I renamed it to `AGENTS.md` to match the Antigravity tool convention. The CI initially used Node 20; I forced Node 22 to match the session 2 slides.
- **Rejected:** Nothing else.
- **By hand:** Read the generated `AGENTS.md` line by line to verify all "never" constraints were correct.

## 2026-09-29 — Add Prettier format gate
- **Tool:** Claude Opus 4.6.
- **Asked for:** Add Prettier as a format gate (devDependency only, `npm run lint` script).
- **Kept:** `prettier` pinned at `3.9.9` in `devDependencies`; `"lint": "prettier --check \"src/**/*.js\" \"test/**/*.js\""` and `"lint:fix"` scripts in `package.json`; `.prettierrc.json` and `.gitattributes` to enforce LF line endings.
- **Changed:** The AI initially left `devDependencies` empty. I caught this: Prettier must be installed for CI to run `npm run lint`. I explicitly requested it be pinned in `devDependencies`.
- **Rejected:** Nothing.
- **By hand:** Ran `npm run lint:fix` locally to verify formatting was clean before committing.

## 2026-09-29 — Write brief.md
- **Tool:** Claude Opus 4.6.
- **Asked for:** Write a `brief.md` following the rubric and slides: files to touch, contract, error cases, "no dependencies".
- **Kept:** The overall structure (Task, Files, Constraints, Contract, Error cases, Worked example, Done when).
- **Changed:** "Done when" originally said "100% coverage" — not verifiable, changed to `npm test` green and `npm run lint` green. Also aligned the `package.json` restriction with `AGENTS.md`.
- **Rejected:** Nothing.
- **By hand:** Reviewed to confirm all 4 rubric requirements for the brief were present: allowed files, contract, error cases, no dependencies.

## 2026-09-29 — Implement cartTotal and tests
- **Tool:** Claude Opus 4.6.
- **Asked for:** Implement `cartTotal` per `brief.md`, write tests using `node:test`.
- **Kept:** Core logic: `reduce` for subtotal, `Math.round` for return value, `>=` for free-shipping threshold, validation loop before any calculation.
- **Changed:** The AI used `item.price < 0` to check price. I caught that this misses `NaN`, `Infinity`, and strings. I asked for `typeof item.price !== "number" || !Number.isFinite(item.price) || item.price < 0`. Also removed starter comment `// Implement cartTotal here` and removed the `!items ||` guard (not in spec). Renamed one test from "qty = 1" to "qty = 3" to match actual test data.
- **Rejected:** Nothing.
- **By hand:** Ran `npm test` (29/29 green) and `npm run lint` (clean) to verify.

## 2026-09-29 — Roa soát checklist từ slide
- **Tool:** None.
- **Asked for:** —
- **By hand:** Checked each item from the slide marking checklist:
  - ✅ No dependency added (only `prettier` as devDep, `src/` imports nothing).
  - ✅ `Math.round` used, not `toFixed` — `cartTotal(...) === 467400` passes.
  - ✅ `qty: 0`, `qty: 1.5`, `price: -1` all throw `RangeError`.
  - ✅ Tests assert the spec (hardcoded expected values), not the implementation.
  - Tách test `"return value is an integer"` thành 2 test riêng (`typeof` và `Number.isInteger`).
  - Thêm 2 test kiểm tra item lỗi ở vị trí thứ hai (chứng minh validate trước khi tính).
