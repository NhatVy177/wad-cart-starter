# AI-LOG

**Student ID:** 23120192  
**Date:** 2026-09-29  

## 2026-09-29 — Reading the assignment and creating the brief
- **Tool:** Claude Opus 4.6.
- **Asked for:** Extract requirements from README and create a strict `brief.md` for the AI to follow.
- **Kept:** The core requirements, formulas, and error cases (negative price/qty).
- **Changed:** Nothing.
- **Rejected:** Nothing.
- **By hand:** Reviewed the generated brief to ensure no missing constraints (like ESM and no dependencies).

## 2026-09-29 — Harness setup: AGENTS.md and CI
- **Tool:** Claude Opus 4.6.
- **Asked for:** Create a rules file (`AGENTS.md`) and a CI workflow (`ci.yml`) to enforce Node 22 and pure JS.
- **Kept:** The CI workflow running `npm ci` and `npm test` on push.
- **Changed:** Renamed the initially proposed `rules.md` to `AGENTS.md` to properly match the convention.
- **Rejected:** The initial CI used Node 20. I rejected this and forced Node 22 to exactly match the session slides.
- **By hand:** Ran `npm install` locally to ensure a clean setup.

## 2026-09-29 — Format gate: Prettier
- **Tool:** Claude Opus 4.6.
- **Asked for:** Add Prettier as a formatting gate without violating the "no runtime dependencies" rule.
- **Kept:** Added `"lint": "prettier --check ."` to `package.json` scripts, and kept `.prettierrc.json` and `.gitattributes` to enforce consistent LF line endings and styling.
- **Changed:** Pinned Prettier to an exact version (`3.9.9`) in `devDependencies`. 
- **Rejected:** The AI initially left `devDependencies` empty. I rejected this because the format script wouldn't work on CI without installing Prettier.
- **By hand:** Ran `npm run lint:fix` to auto-format everything cleanly.

## 2026-09-29 — Implementing cartTotal and tests
- **Tool:** Claude Opus 4.6.
- **Asked for:** Implement `cartTotal` and tests strictly following `brief.md`.
- **Kept:** The use of `reduce` for subtotal, `Math.round()` for integers, and original test cases.
- **Changed:** Changed a test name from "qty = 1" to "qty = 3" because the mock data actually used 3 items.
- **Rejected:** Nothing.
- **By hand:** Reviewed the `throw new RangeError(...)` syntax manually.

## 2026-09-29 — Enhancing edge-case validation
- **Tool:** Claude Opus 4.6.
- **Asked for:** Add validation to throw `RangeError` if price is NaN, Infinity, or not a number.
- **Kept:** 3 new test assertions for `NaN`, `Infinity`, and String.
- **Changed:** Re-wrote the validation in `src/cart.js` using `typeof !== 'number'` and `!Number.isFinite()` to catch all weird data types effectively.
- **Rejected:** A naive `< 0` check which would have missed `NaN` or Strings.
- **By hand:** Ran `npm test` to verify all 26 tests pass successfully.

## 2026-09-29 — SELF_ASSESSMENT_REPORT.md
- **Tool:** Claude Opus 4.6.
- **Asked for:** Write the self-assessment report based on the official 5-criterion rubric.
- **Kept:** The 5-row table and the "What I did not manage" section.
- **Changed:** Nothing.
- **Rejected:** The AI initially hallucinated a fake 14-row rubric structure. I rejected it completely and forced it to use the official 100-point 5-row rubric from the PDF.
- **By hand:** Checked the final ZIP structure before submission.
