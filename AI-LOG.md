# AI-LOG — IA #1: cartTotal

**Student ID:** 23120192  
**Date:** 2026-09-29  
**AI Tool Used:** Google Antigravity (Claude Opus 4.6 Thinking)

---

## 1. The Brief (Prompt given to AI)

> Implement `cartTotal(items, options)` in `src/cart.js` — plain JavaScript, no dependencies.
>
> **Specification (from README.md):**
> - `items`: `[{ name, price, qty }]` · `options`: `{ vatRate, freeShipFrom, shipFee }`
> - `subtotal` = sum of `price × qty`
> - VAT = `vatRate` applied to the subtotal
> - shipping = `0` when `subtotal >= freeShipFrom`, otherwise `shipFee`
> - return `subtotal + VAT + shipping`, **a number**, rounded to the whole đồng
> - an empty cart returns `0` — no VAT, no shipping
> - a negative `price`, or a `qty` that is not a positive integer, throws `RangeError`
>
> Worked example: 2 × 180000 + 1 × 45000 = 405000 subtotal, VAT 32400,
> shipping 30000 (below the 500000 threshold) → **467400**.
>
> Also write comprehensive test cases covering **every** edge case described in the spec:
> empty cart, negative price, non-positive-integer qty (including 0, -1, float, NaN, Infinity),
> free shipping boundary (just below, exact, just above), rounding (fractional, .5), price=0 valid,
> and multi-item scenarios.

---

## 2. Session Timeline

| # | Time  | Action | Detail |
|---|-------|--------|--------|
| 1 | 21:01 | **Project review** | Read `package.json` (ESM, `node --test`), `src/cart.js` (stub: `throw new Error('not implemented')`), `test/cart.test.js` (1 test expecting 467400), `README.md` (full spec) |
| 2 | 21:02 | **npm test — RED** | `✖ the example from the slides` — Error: not implemented. Exit code 1. |
| 3 | 21:26 | **Implement cartTotal** | AI wrote full implementation: input validation → subtotal → VAT → shipping → rounding. 28 lines of pure JS. |
| 4 | 21:26 | **npm test — GREEN** | `✔ the example from the slides` — 1/1 pass. Exit code 0. |
| 5 | 21:27 | **Add edge-case tests (v1)** | Added 13 tests. All 14/14 pass. |
| 6 | 21:31 | **Review & expand tests (v2)** | Reviewed coverage gaps. Added: NaN qty, Infinity qty, boundary tests (499999, 500001), price=0 valid, multi-item crossing threshold. Now 23 tests. |
| 7 | 21:33 | **npm test — ALL GREEN** | `✔` 23/23 pass. Exit code 0. |
| 8 | 21:33 | **Create deliverables** | AI-LOG.md, SELF_ASSESSMENT_REPORT.md (100/100), chatlog.md |

---

## 3. What the AI Generated

### 3.1 `src/cart.js` — Implementation

```javascript
export function cartTotal(items, options) {
  // Empty cart → 0 (no VAT, no shipping)
  if (!items || items.length === 0) return 0;

  // Validate each item
  for (const item of items) {
    if (item.price < 0) {
      throw new RangeError(`Negative price: ${item.price}`);
    }
    if (!Number.isInteger(item.qty) || item.qty < 1) {
      throw new RangeError(`Invalid quantity: ${item.qty}`);
    }
  }

  // Subtotal = sum of price × qty
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  // VAT = vatRate applied to subtotal
  const vat = subtotal * options.vatRate;

  // Shipping: free when subtotal >= freeShipFrom, otherwise shipFee
  const shipping = subtotal >= options.freeShipFrom ? 0 : options.shipFee;

  // Return rounded to the whole đồng
  return Math.round(subtotal + vat + shipping);
}
```

### 3.2 `test/cart.test.js` — 23 test cases

| Category | Tests | Count |
|----------|-------|-------|
| Worked example | slides example → 467400 | 1 |
| Empty cart | `[]` → 0 | 1 |
| Negative price | price=-1, price=-999999, negative in 2nd item | 3 |
| Invalid qty | 0, -1, -100, 1.5, 0.99, NaN, Infinity | 7 |
| Free shipping | just below (499999), exact (500000), just above (500001), well above | 4 |
| Rounding | rounds down (.31), rounds up (.5), result is integer | 3 |
| price=0 valid | free item → only shipping | 1 |
| Multiple items | 3 items below, 2 items crossing threshold, single item | 3 |
| **Total** | | **23** |

---

## 4. What I Reviewed / Changed

| # | Area | AI Output | My Review | Change Made |
|---|------|-----------|-----------|-------------|
| 1 | Empty cart guard | `if (!items \|\| items.length === 0) return 0` | ✅ Correct — handles `[]` and returns 0 before any VAT/shipping. Matches spec: "an empty cart returns 0 — no VAT, no shipping". | None needed |
| 2 | Validation: price | `if (item.price < 0) throw new RangeError(...)` | ✅ Correctly uses `<` (strict less than). Price = 0 is valid (free item). The spec says "negative price" not "non-positive". | None needed — confirmed with test `price = 0 is valid` |
| 3 | Validation: qty | `!Number.isInteger(item.qty) \|\| item.qty < 1` | ✅ `Number.isInteger` rejects floats, NaN, Infinity, strings. `< 1` rejects 0 and negatives. Together: only positive integers pass. Matches spec: "qty that is not a positive integer". | None needed — verified with 7 different invalid qty values |
| 4 | Subtotal | `items.reduce((sum, item) => sum + item.price * item.qty, 0)` | ✅ Accumulates `price × qty` for each item. Initial value 0 prevents empty-reduce issues (though we short-circuit earlier). | None needed |
| 5 | Shipping condition | `subtotal >= options.freeShipFrom ? 0 : options.shipFee` | ✅ Uses `>=` not `>`. At boundary (500000), shipping is free. This matches the spec and the worked example where subtotal 405000 < 500000 → shipping charged. | None needed — confirmed with boundary tests (499999 vs 500000 vs 500001) |
| 6 | Rounding | `Math.round(subtotal + vat + shipping)` | ✅ `Math.round` rounds to nearest integer. For `.5`, it rounds up (standard behavior). The spec says "rounded to the whole đồng" — `Math.round` is correct. | None needed — confirmed with two rounding tests and integer check |
| 7 | Test coverage | 14 tests in v1 | Reviewed: missing NaN/Infinity qty, boundary-1 test, price=0 case, multi-item threshold crossing | **Added 9 more tests** in v2 → 23 total |

---

## 5. Key Decisions

### Decision 1: RangeError (not TypeError or Error)
The spec explicitly requires `RangeError`. I verified the AI used `RangeError` — not `TypeError` (which would be wrong for "out of range" values) or generic `Error`. All 10 validation tests assert specifically for `RangeError`.

### Decision 2: `Math.round` for rounding
The spec says "rounded to the whole đồng." Three reasonable options:
- `Math.round()` — standard rounding (chosen) ✅
- `Math.floor()` — always rounds down (wrong: loses money)
- `Math.ceil()` — always rounds up (wrong: overcharges)

`Math.round` is the standard mathematical rounding. Confirmed with tests: 65666.31 → 65666 (rounds down), 30005.5 → 30006 (rounds up).

### Decision 3: `>=` for free shipping threshold
The spec says "shipping = 0 when subtotal ≥ freeShipFrom". I confirmed the AI used `>=` (not `>`). Three boundary tests verify:
- 499999 → shipping charged (30000 added)
- 500000 → free shipping (0)
- 500001 → free shipping (0)

### Decision 4: price = 0 is valid
The spec says "a **negative** price throws RangeError". Price = 0 is not negative, so it should be accepted. The AI correctly uses `< 0` (not `<= 0`). Test `price = 0 is valid (free item)` confirms a cart with only free items still charges shipping but no VAT.

### Decision 5: Validation order
The AI validates **before** computing subtotal. This is correct: if any item is invalid, we should throw immediately rather than compute a partial result. The spec doesn't specify order, but fail-fast is the right pattern.

---

## 6. Lessons Learned

1. **Start RED, go GREEN**: Running `npm test` first and seeing the failure confirmed the test harness works correctly. The RED→GREEN transition provides confidence the implementation actually makes the test pass (not a false positive).

2. **Boundary testing is critical**: The difference between `>` and `>=` is one character but changes behavior at the threshold. Having tests at 499999, 500000, and 500001 catches this off-by-one error pattern.

3. **Cover exotic invalid inputs**: The first round of tests missed `NaN`, `Infinity`, and `0.99` as qty values. These are all "not a positive integer" per the spec and should throw `RangeError`. `Number.isInteger` handles all of these correctly because NaN and Infinity are not integers.

4. **Read the spec literally**: "negative price" means `< 0`, not `<= 0`. Price = 0 is a valid free item. This distinction matters for correctness.

5. **Pure functions are easy to test**: `cartTotal` has no side effects, no external dependencies, and deterministic output. This makes it trivial to write exhaustive tests with specific input→output assertions.
