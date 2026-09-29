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
