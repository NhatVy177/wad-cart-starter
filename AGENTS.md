# Project Rules — cartTotal (CSC13008 · IA#1)

## Stack
- **Language:** JavaScript (ES modules)
- **Runtime:** Node.js ≥ 22
- **Test runner:** `node --test` (built-in, no framework)
- **Formatter:** Prettier (pinned in `devDependencies`)
- **Runtime dependencies:** none — `cartTotal` uses only built-in JS
- **Dev dependencies:** `prettier` only — for formatting checks

## Commands
| Task | Command |
|------|---------|
| Run tests | `npm test` |
| Check formatting | `npm run lint` |
| Fix formatting | `npm run lint:fix` |

## Rules
1. **Never** add runtime dependencies — the function must work with plain JS only.
2. **Never** use `toFixed()` for the final return value — it returns a string, not a number.
3. **Never** modify `package.json`'s `"type": "module"` — ESM is required.
4. All tests must assert the **specification**, not the implementation details.
5. Every test must be able to fail for exactly **one reason**.
6. The function signature `cartTotal(items, options)` must not change.

## Files the assistant may touch
- `src/cart.js` — the implementation
- `test/cart.test.js` — the test suite

## Files the assistant must NOT touch
- `package.json` — do not change (lint gate already set up)
- `README.md`
- `.gitignore`
- `.github/workflows/`

## Before you finish
1. Run `npm test` — all tests must pass.
2. Run `npm run lint` — no formatting errors.
3. Read the diff (`git diff`) — nothing outside scope.
4. Do not add files, dependencies, or scripts beyond what is listed above.
