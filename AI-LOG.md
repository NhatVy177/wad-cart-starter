# AI-LOG

**Student ID:** 23120192  
**Date:** 2026-09-29  

## 2026-09-29 — Setup Harness and Implement cartTotal
Tool: Google Antigravity
Asked for: Implement cartTotal spec with plain JS and write tests using node:test.
Kept: The core logic of using `.reduce` for subtotal, `Math.round()` for the final return, and most of the 23 test cases.
Changed: The test name "single item, qty = 1" was changed to "qty = 3" to match the actual dummy data. Updated the CI workflow to strictly use Node 22 instead of Node 20 to match the course slides.
Rejected: The AI initially assumed `package.json` had no `devDependencies`. I rejected this and explicitly pinned `prettier` in `devDependencies` to create a working format gate (`npm run lint`).
By hand: Created the `AGENTS.md` rules file to define boundaries.

## 2026-09-29 — Enhance Price Validation Edge Cases
Tool: Google Antigravity
Asked for: Add validation to throw RangeError if price is NaN, Infinity, or not a number.
Kept: The 3 new test assertions for NaN, Infinity, and String price.
Changed: Adjusted the validation logic in `src/cart.js`. AI initially suggested checking `typeof item.price !== "number"`, I kept it but ensured it was combined with `!Number.isFinite()` to catch both NaN and Infinity efficiently.
Rejected: None.
By hand: Ran `npm run lint:fix` to auto-format the new code blocks perfectly.
