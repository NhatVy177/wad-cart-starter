# Self-Assessment Report

**Student ID:** 23120192  
**Date:** 2026-09-30  
**Self-Assessed Total:** 100 / 100

## Rubric Criteria Assessment

| # | Criterion | Max | Self | Evidence |
|---|---|---|---|---|
| 1 | Behaviour | 30 | 30 | `npm test` 29/29 green. `src/cart.js`: empty cart returns 0 (`items.length === 0`); invalid price (negative, NaN, Infinity, non-number) throws `RangeError` (the validation loop in `src/cart.js`); invalid qty (non-integer, < 1) throws `RangeError`; worked example `[{Áo thun,180000,2},{Sổ tay,45000,1}]` → subtotal 405000 + VAT 32400 + ship 30000 = 467400 returned as integer via `Math.round`. |
| 2 | Tests | 20 | 20 | `test/cart.test.js` — 29 tests, each asserting one behaviour: `"the example from the slides"` (467400); `"empty array returns 0"`; price errors: `"negative price throws RangeError"`, `"very negative price throws RangeError"`, `"negative price in second item throws RangeError"`, `"price = NaN throws RangeError"`, `"price = Infinity throws RangeError"`, `"price is not a number throws RangeError"`; second-item errors: `"invalid qty in second item throws RangeError"`, `"invalid price (NaN) in second item throws RangeError"`; qty errors: `"qty = 0"`, `"qty = -1"`, `"qty = -100"`, `"qty = 1.5 (float)"`, `"qty = 0.99"`, `"qty = NaN"`, `"qty = Infinity"`; threshold: `"subtotal just below freeShipFrom"`, `"subtotal exactly equals freeShipFrom"`, `"subtotal just above freeShipFrom"`, `"subtotal well above freeShipFrom"`; rounding: `"fractional total rounds down (.31)"`, `"fractional total at .5 rounds up"`; type: `"return value is typeof number"`, `"return value is an integer (no decimals)"`; misc: `"price = 0 is valid (free item)"`, `"three items, below threshold"`, `"multiple items crossing threshold together"`, `"single item, qty = 3, below threshold"`. `npm test` output: pass 29, fail 0. |
| 3 | The harness | 20 | 20 | `AGENTS.md` at repo root — stack (Node ≥ 22, `node:test`, Prettier), commands (`npm test`, `npm run lint`), 6 rules, 3 of them "Never". Gate: `npm run lint` (`prettier --check "src/**/*.js" "test/**/*.js"`) — green locally. CI: `.github/workflows/ci.yml` — `on: push`, Node 22, `npm ci`, `npm test`, `npm run lint`. CI green on push: https://github.com/NhatVy177/wad-cart-starter/actions/runs/36667706782 (commit 9674e9a). `prettier` is in `devDependencies` only; `src/` has no imports. |
| 4 | The brief | 15 | 15 | `brief.md` — names files to touch (`src/cart.js`, `test/cart.test.js`) and files not to touch (README, .gitignore, AGENTS.md, workflows, package.json); states contract (subtotal + VAT + shipping, `Math.round`, empty cart = 0); lists error cases (negative/NaN/Infinity/non-number price → RangeError, non-positive-integer qty → RangeError, validate before computing); states "no runtime dependencies"; "Done when" is `npm test` green and `npm run lint` green. |
| 5 | AI-LOG.md | 15 | 15 | `AI-LOG.md` — 4 entries covering: initial `npm test` red, harness/gate/brief/implementation (committed together as `0b6a74a`), document rewrites, and final review with a second AI. Each entry states tool, what was asked, what was kept/changed/rejected, what was done by hand. Specific changes traceable to the diff: AI used `< 0` for price, I caught it and forced `typeof` + `Number.isFinite`; AI omitted `devDependencies`, I caught it and pinned `prettier 3.9.9`; CI used Node 20 initially; documents were rewritten after an AI generated an incorrect 14-row rubric report. |
| | **TOTAL** | **100** | **100** | |

## What I did not manage
- `options` is not validated (e.g. negative `vatRate`, missing fields). The spec does not require it.
- No code coverage measurement — `node --test` does not report coverage percentage by default.
- No mutation testing to verify that each test would catch a regression.
- Passing `null` or a non-array as `items` throws a `TypeError` (from `.length`), not a `RangeError`. The spec does not address this case.
- Floating-point price values (e.g. `price: 0.1`) are accepted without a dedicated test.
