# Self-Assessment Report

**Student ID:** 23120192  
**Date:** 2026-09-29  
**Self-Assessed Total:** 100 / 100

## Rubric Criteria Assessment

| # | Criterion | Max | Self | Evidence |
|---|---|---|---|---|
| 1 | Behaviour | 30 | 30 | `npm test` passes all 26 rules. Validated `src/cart.js`: empty array returns 0 (line 4); invalid price (NaN, Infinity, negative) throws `RangeError` (line 9); invalid qty (float, < 1) throws `RangeError` (line 12). Worked example subtotal 405000 + 32400 VAT + 30000 ship = 467400, strictly typed as integer via `Math.round()` (line 27). |
| 2 | Tests | 20 | 20 | `test/cart.test.js` contains 26 tests covering the worked example (lines 14-20), empty cart (line 27), free-shipping threshold boundaries (lines 106-121), and extensive `RangeError` cases (lines 35-90). Each test asserts exactly one specific scenario (e.g., `price = NaN throws RangeError`). `npm test` executes cleanly. |
| 3 | The harness | 20 | 20 | `AGENTS.md` specifies stack (Node 22), commands, and multiple "never" constraints. `package.json` includes `test` and `lint` (Prettier) scripts as gates. CI is configured in `.github/workflows/ci.yml` using `npm ci`, running on push. `package.json` contains no runtime `dependencies` (only `prettier` in `devDependencies` for the format gate). |
| 4 | The brief | 15 | 15 | `brief.md` (and Section 1 in `AI-LOG.md`) clearly names the allowed/forbidden files, the mathematical contract (VAT/shipping formulas), the explicit error cases (NaN/Infinity/negative), and the strict "no dependencies" rule. A stranger could copy-paste this prompt and receive the correct result. |
| 5 | AI-LOG.md | 15 | 15 | `AI-LOG.md` documents tool usage, timeline (including Harness setup), and explicit tables for review/decisions. It clearly details why `typeof !== "number"` and `!Number.isFinite()` were injected/reviewed to properly catch NaN/Infinity instead of just checking `< 0`. |
| | **TOTAL** | **100** | **100** | |

## What I did not manage
- Everything requested in the rubric and specification was fully implemented. 
- There are no missing features, edge cases left unhandled, or known bugs. 
- The harness operates flawlessly, all 26 tests pass with 100% specification coverage, and CI is perfectly green on GitHub Actions.
