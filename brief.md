# Brief — cartTotal

## Task
Implement `cartTotal(items, options)` in `src/cart.js` to ensure the existing failing test passes, and write robust tests in `test/cart.test.js`.

## Files you may touch
- `src/cart.js` — the implementation.
- `test/cart.test.js` — add comprehensive tests; keep the existing starter test untouched.

Do **not** touch: `README.md`, `.gitignore`, `AGENTS.md`, or any GitHub workflow files. Do not change `package.json` (its `prettier` devDependency is already set up — do not add anything else).

## Constraints
- **No runtime dependencies.** The function must use plain JavaScript only (ES modules). `package.json` already contains `prettier` as a devDependency for our `lint` gate — do not change this or install anything else.
- Tests must strictly use `node:test` and `node:assert/strict`.
- Export signature must be exactly: `export function cartTotal(items, options)`.
- Use `Math.round` for rounding to the nearest whole đồng, never `toFixed()`.
- Do not invent extra libraries, classes, or helper functions. Keep it clean and readable.

## Contract
- `items`: an array of `{ name, price, qty }`.
- `options`: `{ vatRate, freeShipFrom, shipFee }`.
- `subtotal` = sum of `price × qty`.
- `vat` = `subtotal × vatRate`.
- `shipping` = `0` if `subtotal >= freeShipFrom`, otherwise `shipFee` (evaluated before VAT).
- Total = `subtotal + vat + shipping`, rounded to the nearest integer.
- Empty cart (`items.length === 0`): return `0` immediately (no VAT, no shipping).

## Error cases
- `price`: If price is negative, `NaN`, `Infinity`, or not a number, throw `RangeError`.
- `qty`: If qty is negative, `0`, float/decimal, `NaN`, or `Infinity`, throw `RangeError`.
- Validate all items **before** calculating the subtotal.
- Do not invent any other custom error types.

## Worked example (must hold)
`cartTotal([{name:'Áo thun',price:180000,qty:2},{name:'Sổ tay',price:45000,qty:1}], {vatRate:0.08, freeShipFrom:500000, shipFee:30000})`
→ subtotal 405000, VAT 32400, shipping 30000 → **467400**

## Tests to write
Write exhaustive tests covering:
1. The worked example (`467400`).
2. Empty cart returns `0`.
3. Validation: `price < 0`, `price = NaN`, `price = Infinity`, `price` is a string.
4. Validation: `qty = 0`, `qty < 0`, `qty = 1.5`, `qty = NaN`, `qty = Infinity`.
5. Free shipping boundaries: just below, exactly at, and just above `freeShipFrom`.
6. Fractional totals that round up and round down.
7. A free item (`price = 0`) is processed successfully without errors.

## Done when
`npm test` green, `npm run lint` green, only `src/cart.js` and `test/cart.test.js` changed.
