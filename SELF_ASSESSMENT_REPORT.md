# Self-Assessment Report

**Student ID:** 23120192  
**Date:** 2026-09-29  
**Self-Assessed Total:** 100 / 100

## Rubric Criteria Assessment

| # | Criterion | Max | Self | Evidence |
|---|---|---|---|---|
| 1 | Behaviour | 30 | 30 | `npm test` 29/29 green. `src/cart.js`: empty cart returns 0 (`items.length === 0`); invalid price (negative, NaN, Infinity, non-number) throws `RangeError` (validation loop lines 7–17); invalid qty (non-integer, < 1) throws `RangeError`; worked example `[{Áo thun,180000,2},{Sổ tay,45000,1}]` → subtotal 405000 + VAT 32400 + ship 30000 = 467400 returned as integer via `Math.round`. |
| 2 | Tests | 20 | 20 | `test/cart.test.js` — 29 tests, each asserting one behaviour: test `"the example from the slides"` (467400), `"empty array returns 0"`, 3 negative-price tests, 3 type-error tests (NaN, Infinity, string), 2 second-item validation tests (`"invalid qty in second item"`, `"invalid price (NaN) in second item"`), 7 qty-error tests, 4 threshold-boundary tests, 2 rounding tests, 2 integer-type tests (`"return value is typeof number"`, `"return value is an integer (no decimals)"`), and 4 multi-item tests. `npm test` output: pass 29, fail 0. |
| 3 | The harness | 20 | 20 | `AGENTS.md` at repo root — stack (Node ≥ 22, `node:test`, Prettier), commands (`npm test`, `npm run lint`), and 6 "Never" rules. Gate: `npm run lint` (`prettier --check "src/**/*.js" "test/**/*.js"`) — green locally. CI: `.github/workflows/ci.yml` — `on: push`, Node 22, `npm ci`, `npm test`, `npm run lint`. `prettier` is in `devDependencies` only; `src/` has no imports. |
| 4 | The brief | 15 | 15 | `brief.md` — names files to touch (`src/cart.js`, `test/cart.test.js`) and files not to touch (README, .gitignore, AGENTS.md, workflows, package.json); states contract (subtotal + VAT + shipping, `Math.round`, empty cart = 0); lists error cases (negative/NaN/Infinity/non-number price → RangeError, non-positive-integer qty → RangeError, validate before computing); states "no runtime dependencies"; "Done when" is `npm test` green and `npm run lint` green. |
| 5 | AI-LOG.md | 15 | 15 | `AI-LOG.md` — 5 entries. Each states tool (Claude Opus 4.6 or none), what was asked, what was kept, what was changed and why, what was rejected, what was done by hand. Specific changes traceable to the diff: AI used `< 0` for price, I caught it and forced `typeof` + `Number.isFinite`; AI omitted `devDependencies`, I caught it and pinned `prettier 3.9.9`; CI used Node 20, I forced Node 22. |
| | **TOTAL** | **100** | **100** | |

## What I did not manage
- `options` is not validated (e.g. negative `vatRate`). The spec does not require it, so this is intentional.
- No code coverage measurement — `node --test` does not report coverage percentage by default.
- No mutation testing to verify that each test would catch a regression.
- The `cart.js` validation loop iterates all items even after finding the first invalid one; an early-exit version would be slightly more efficient, but correctness is identical.
