# AI-LOG

**Student ID:** 23120192  
**Date:** 2026-09-29  
**AI Tool used:** Google Antigravity

## 1. The Brief
Implement `cartTotal(items, options)` in `src/cart.js` — plain JavaScript, no dependencies.

**Specification (from README.md):**
- `items`: array of objects `{ name: string, price: number, qty: number }`.
- `options`: object `{ vatRate: number, freeShipFrom: number, shipFee: number }`.
- **Subtotal**: sum of (price × qty) for all items.
- **VAT**: subtotal × vatRate.
- **Shipping**: 0 if subtotal >= freeShipFrom, otherwise shipFee.
- **Total**: subtotal + VAT + shipping, rounded to the nearest whole đồng.

**Validation Rules:**
- Empty cart (no items or 0 items) returns `0` (no VAT, no shipping).
- If any item has a negative price, NaN, Infinity, or non-number price, throw `RangeError`.
- If any item has a non-integer quantity or qty < 1, throw `RangeError`.

**Files you may touch:**
- `src/cart.js` — the implementation
- `test/cart.test.js` — the test suite (must use `node:test`)

**Files you must NOT touch:**
- `package.json` (except adding format scripts/devDependencies)
- `README.md`
- `.gitignore`

The worked example (2 Áo thun @ 180000, 1 Sổ tay @ 45000, 8% VAT, 500000 threshold, 30000 fee) must return 467400. Write robust tests for edge cases.

## 2. Timeline

| Step | Time | Action | Details |
|---|---|---|---|
| 1 | 21:00 | **Harness Setup** | Created `AGENTS.md` to define constraints. Pinned Prettier in `package.json`, added `lint` script. Created `.github/workflows/ci.yml` using Node 22 and `npm ci`. |
| 2 | 21:05 | **Code Implementation** | AI wrote `src/cart.js` using `reduce` for subtotal, `Math.round` for rounding, and validation loops for price and quantity. |
| 3 | 21:10 | **Writing Tests** | AI wrote 23 tests in `test/cart.test.js` covering the worked example, empty cart, negative pricing, invalid quantities, and threshold boundaries. |
| 4 | 21:15 | **Refining Harness** | Updated `AGENTS.md` and `ci.yml` to ensure Node 22 consistency. Modified `package.json` to properly list Prettier in `devDependencies`. |
| 5 | 21:20 | **Enhancing Validation** | Expanded price validation to throw `RangeError` for NaN, Infinity, and non-number types. Added corresponding tests. |
| 6 | 21:25 | **Review & Fix** | Fixed a test name ("qty = 3" instead of "qty = 1"). Ran `npm test` and `npm run lint` to ensure green CI. |

## 3. What I Reviewed / Changed

| # | Code | What I checked | Why | Change |
|---|---|---|---|---|
| 1 | `throw new RangeError(...)` | Verified it throws `RangeError` and not `TypeError`. | The spec strictly demands `RangeError`. | None needed. |
| 2 | `Math.round(...)` | Verified rounding direction. | `toFixed()` returns a string which breaks the return type. `Math.round()` returns an integer. | None needed. |
| 3 | `subtotal >= options.freeShipFrom` | Checked the boundary condition. | Spec says "free shipping at the threshold". | None needed. |
| 4 | Harness setup | Checked if CI matches `AGENTS.md`. | Found inconsistencies (Node 20 vs 22, Prettier in scripts but not `devDependencies`). | Updated `package.json` (pinned Prettier), `ci.yml` (Node 22, `npm ci`), `AGENTS.md` (Node 22). |
| 5 | Price validation | Checked if it handles NaN and non-numbers. | A negative check `item.price < 0` doesn't catch NaN or strings. | Added `typeof !== "number"`, `!Number.isFinite()` and 3 tests. |
| 6 | Test Names | Checked if test names match their data. | One test named `qty = 1` actually used `qty = 3`. | Renamed test to `qty = 3`. |

## 4. Key Decisions

1. **Harness First:** Creating `AGENTS.md`, Prettier scripts, and CI workflow before writing logic ensures code quality and prevents regressions from the start.
2. **Robust Validation:** Added checks for `NaN`, `Infinity`, and `typeof !== "number"` for `price`. While `< 0` catches negative numbers, it fails to reject malformed inputs like strings or `NaN`.
3. **Empty Cart Short-Circuit:** The code checks `!items || items.length === 0` right at the beginning and returns `0`, avoiding unnecessary computation of subtotal, VAT, and shipping.
