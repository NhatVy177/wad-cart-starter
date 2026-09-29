# Chatlog — IA #1: cartTotal

**Student ID:** 23120192  
**AI Tool:** Google Antigravity (Claude Opus 4.6 Thinking)  
**Date:** 2026-09-29

---

## Conversation Log

### User Prompt #1

> Implement `cartTotal(items, options)` in `src/cart.js` — plain JavaScript, no dependencies.
> 
> Start from the starter repository: https://github.com/fithcmus/wad-cart-starter — it has `package.json`, one failing test and `.gitignore`. Run `npm test` and watch it fail before you write anything.
>
> The specification is on slides 24-25 of the session 2 deck and in the starter's README:
> - subtotal plus VAT plus shipping
> - free shipping at the threshold
> - an empty cart returns 0
> - a negative price or a non-integer quantity throws RangeError
> - the result is a number rounded to the whole đồng
> - The worked example returns 467400.

---

### AI Response #1 — Project Analysis

The AI analyzed the project structure:

```
wad-cart-starter/
├── .gitignore          (node_modules/, .env)
├── package.json        (ESM, "test": "node --test")
├── README.md           (full specification)
├── src/
│   └── cart.js         (stub: throw new Error('not implemented'))
└── test/
    └── cart.test.js    (1 test: expects cartTotal to return 467400)
```

Key observations:
- ESM project (`"type": "module"`)
- Node.js built-in test runner (`node --test`)
- Zero dependencies — must stay that way

---

### AI Action #2 — Run `npm test` (RED)

```
> cart-starter@1.0.0 test
> node --test

✖ the example from the slides (2.1042ms)
  Error: not implemented
      at cartTotal (file:///D:/Nam4/Web/wad-cart-starter/src/cart.js:3:9)
ℹ tests 1 | pass 0 | fail 1
```

**Result:** 1 test fails with `Error: not implemented` — confirmed RED state.

---

### AI Action #3 — Implement `cartTotal`

The AI generated the following implementation in `src/cart.js`:

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

**Design decisions identified:**
1. Empty cart check first (short-circuit)
2. Validation before computation (fail-fast)
3. `price < 0` — price=0 is valid (free item)
4. `Number.isInteger(qty) && qty >= 1` — rejects 0, negatives, floats, NaN, Infinity
5. `>=` for free shipping threshold (not `>`)
6. `Math.round()` for rounding to whole đồng

---

### AI Action #4 — Run `npm test` (GREEN)

```
> cart-starter@1.0.0 test
> node --test

✔ the example from the slides (0.8868ms)
ℹ tests 1 | pass 1 | fail 0
```

**Result:** Test passes — confirmed GREEN state.

---

### AI Action #5 — Add Comprehensive Tests (v1: 14 tests)

Added 13 additional tests. All 14/14 pass.

---

### User Prompt #2

> Need to aim for 100/100. Expand test coverage to cover every edge case.

---

### AI Action #6 — Expand Tests (v2: 23 tests)

Reviewed coverage gaps and added:
- `qty = NaN` → RangeError
- `qty = Infinity` → RangeError
- `qty = 0.99` → RangeError
- `qty = -100` → RangeError
- `very negative price` (price=-999999) → RangeError
- `negative price in second item` → RangeError
- `subtotal just below freeShipFrom` (499999) → shipping charged
- `subtotal just above freeShipFrom` (500001) → free shipping
- `subtotal well above freeShipFrom` (3×1000000) → free shipping
- `price = 0 is valid` (free item) → only shipping
- `three items, below threshold` → correct total
- `multiple items crossing threshold together` → free shipping
- `return value is an integer` → Number.isInteger check

Final test run:

```
> cart-starter@1.0.0 test
> node --test

✔ the example from the slides (3.8955ms)
✔ empty array returns 0 (0.8837ms)
✔ negative price throws RangeError (2.5913ms)
✔ very negative price throws RangeError (0.6354ms)
✔ negative price in second item throws RangeError (0.7731ms)
✔ qty = 0 throws RangeError (0.5182ms)
✔ qty = -1 throws RangeError (0.603ms)
✔ qty = -100 throws RangeError (0.5702ms)
✔ qty = 1.5 (float) throws RangeError (0.6471ms)
✔ qty = 0.99 throws RangeError (0.9454ms)
✔ qty = NaN throws RangeError (0.5104ms)
✔ qty = Infinity throws RangeError (0.3835ms)
✔ subtotal just below freeShipFrom → shipping charged (0.2097ms)
✔ subtotal exactly equals freeShipFrom → free shipping (0.8873ms)
✔ subtotal just above freeShipFrom → free shipping (0.7141ms)
✔ subtotal well above freeShipFrom → free shipping (0.4333ms)
✔ fractional total rounds down (.31) (0.4672ms)
✔ fractional total at .5 rounds up (0.5171ms)
✔ return value is an integer (typeof number, no decimals) (0.4133ms)
✔ price = 0 is valid (free item) (0.5296ms)
✔ three items, below threshold (0.2957ms)
✔ multiple items crossing threshold together (0.2391ms)
✔ single item, qty = 1, below threshold (0.2059ms)
ℹ tests 23 | pass 23 | fail 0
```

**Result:** 23/23 tests pass.

---

### AI Action #7 — Create Deliverables

Created:
- `AI-LOG.md` — Complete session log with brief, timeline, code, review table (7 items), 5 key decisions, lessons learned
- `SELF_ASSESSMENT_REPORT.md` — 14 criteria, each with evidence, total 100/100
- `chatlog.md` — This file
- `23120192_100.zip` — Submission package

---

## End of Conversation
