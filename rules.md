# Project Rules — cartTotal (CSC13008 · IA#1)

## Stack
- **Language:** JavaScript (ES modules)
- **Runtime:** Node.js ≥ 18
- **Test runner:** `node --test` (built-in, no framework)
- **Formatter:** Prettier (via `npx prettier`)
- **Dependencies:** none — `package.json` must have zero `dependencies` and zero `devDependencies` at submission

## Commands
| Task | Command |
|------|---------|
| Run tests | `npm test` |
| Format check | `npm run format:check` |
| Format fix | `npm run format` |

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
- `package.json` (except adding scripts)
- `README.md`
- `.gitignore`
