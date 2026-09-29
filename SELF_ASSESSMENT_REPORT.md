# Self-Assessment Report — IA #1: cartTotal

**Student ID:** 23120192  
**Date:** 2026-09-29  
**Self-Assessed Total:** 100 / 100

---

## Rubric Criteria Assessment

| # | Criterion | Max | Self | Evidence |
|---|-----------|-----|------|----------|
| 1 | **Behaviour — worked example returns 467400** | 10 | 10 | `npm test` → `✔ the example from the slides`. Calculation: 2×180000 + 1×45000 = 405000 subtotal, 405000×0.08 = 32400 VAT, 30000 shipping (405000 < 500000). Total = 467400. See [`test/cart.test.js`](test/cart.test.js) line 14–20. |
| 2 | **Behaviour — empty cart returns 0** | 5 | 5 | Test `✔ empty array returns 0` passes. Implementation short-circuits: `if (!items \|\| items.length === 0) return 0;` — no VAT, no shipping computed. See [`src/cart.js`](src/cart.js) line 4. |
| 3 | **Behaviour — negative price throws RangeError** | 5 | 5 | Three tests pass: `negative price throws RangeError` (price=-1), `very negative price throws RangeError` (price=-999999), `negative price in second item throws RangeError`. All confirm `RangeError` is thrown. See [`test/cart.test.js`](test/cart.test.js) lines 33–47. |
| 4 | **Behaviour — non-integer qty throws RangeError** | 5 | 5 | Seven tests pass: qty=0, qty=-1, qty=-100, qty=1.5, qty=0.99, qty=NaN, qty=Infinity — all throw `RangeError`. Uses `Number.isInteger(item.qty) && item.qty >= 1`. See [`test/cart.test.js`](test/cart.test.js) lines 53–82. |
| 5 | **Behaviour — result is rounded to whole đồng** | 5 | 5 | Tests `fractional total rounds down (.31)` (65666.31→65666), `fractional total at .5 rounds up` (30005.5→30006), and `return value is an integer` (Number.isInteger check) all pass. Uses `Math.round()`. See [`test/cart.test.js`](test/cart.test.js) lines 107–126. |
| 6 | **Code quality — plain JS, no dependencies** | 5 | 5 | `package.json` has zero `dependencies` or `devDependencies`. `src/cart.js` uses only built-in JS: `Number.isInteger`, `Array.prototype.reduce`, `Math.round`. No npm packages installed. |
| 7 | **Code quality — clear, readable implementation** | 5 | 5 | Function is 28 lines with section comments: validation, subtotal, VAT, shipping, rounding. Variable names match spec terms (`subtotal`, `vat`, `shipping`). Each step maps 1-to-1 with the spec in README.md. |
| 8 | **Tests — original test preserved and passing** | 5 | 5 | Original test `the example from the slides` preserved verbatim at lines 14–20 of `cart.test.js`. Same items, same options, same assertion. |
| 9 | **Tests — comprehensive edge-case coverage** | 10 | 10 | 23 tests total covering every spec requirement: empty cart (1), negative price (3), invalid qty (7 cases including NaN, Infinity), free shipping boundary (4 cases: just below, exact, just above, well above), rounding (3), price=0 valid (1), multiple items (3). See full listing in [`test/cart.test.js`](test/cart.test.js). |
| 10 | **AI-LOG — complete session log** | 10 | 10 | `AI-LOG.md` includes: (1) full brief with spec, (2) timeline table with 7 timestamped steps, (3) complete source code listing, (4) review/change table with 6 rows, (5) 4 key decisions with rationale, (6) lessons learned. |
| 11 | **AI-LOG — evidence of human review** | 10 | 10 | Section 4 "What I Reviewed / Changed" documents 6 design decisions examined. Section 5 "Key Decisions" explains rationale for RangeError type, Math.round choice, >= for threshold, and empty cart short-circuit. Each decision references the spec. |
| 12 | **Brief — clear problem specification** | 5 | 5 | Brief (Section 1 of AI-LOG) contains the complete spec from README.md including: items/options structure, subtotal/VAT/shipping formulas, empty cart rule, validation rules, rounding requirement, and the worked example (467400). |
| 13 | **Self-assessment — per-criterion with evidence** | 5 | 5 | This document: one row per rubric criterion, each with specific file references, line numbers, test names, and calculation evidence. |
| 14 | **Submission — correct zip format & contents** | 5 | 5 | Zip `23120192_100.zip` follows `<StudentID>_<total>.zip` format. Contains: repository with `npm test` green (23/23), brief (in AI-LOG Section 1), `AI-LOG.md`, `SELF_ASSESSMENT_REPORT.md`, `chatlog.md`. |
| | **TOTAL** | **100** | **100** | |

---

## Evidence Summary

### `npm test` output — 23/23 pass
```
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

### Files in submission
| File | Purpose |
|------|---------|
| `src/cart.js` | Implementation of `cartTotal()` — 28 lines, pure JS |
| `test/cart.test.js` | 23 test cases covering all spec requirements |
| `AI-LOG.md` | Complete AI session log with brief, timeline, review |
| `SELF_ASSESSMENT_REPORT.md` | This file — per-criterion self-assessment |
| `chatlog.md` | Full conversation log with AI assistant |
| `README.md` | Original starter README (unchanged) |
| `package.json` | Original starter config (unchanged) |
