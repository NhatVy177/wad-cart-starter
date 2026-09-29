import { test } from "node:test";
import assert from "node:assert/strict";
import { cartTotal } from "../src/cart.js";

const DEFAULT_OPTIONS = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 };

// ──────────────────────────────────────────────
// 1. WORKED EXAMPLE (from the slides / README)
// ──────────────────────────────────────────────

test("the example from the slides", () => {
  const items = [
    { name: "Áo thun", price: 180000, qty: 2 },
    { name: "Sổ tay", price: 45000, qty: 1 },
  ];
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 };
  assert.equal(cartTotal(items, options), 467400);
});

// ──────────────────────────────────────────────
// 2. EMPTY CART → returns 0 (no VAT, no shipping)
// ──────────────────────────────────────────────

test("empty array returns 0", () => {
  assert.equal(cartTotal([], DEFAULT_OPTIONS), 0);
});

// ──────────────────────────────────────────────
// 3. VALIDATION — negative price throws RangeError
// ──────────────────────────────────────────────

test("negative price throws RangeError", () => {
  const items = [{ name: "Bad", price: -1, qty: 1 }];
  assert.throws(() => cartTotal(items, DEFAULT_OPTIONS), RangeError);
});

test("very negative price throws RangeError", () => {
  const items = [{ name: "Bad", price: -999999, qty: 1 }];
  assert.throws(() => cartTotal(items, DEFAULT_OPTIONS), RangeError);
});

test("negative price in second item throws RangeError", () => {
  const items = [
    { name: "Good", price: 100000, qty: 1 },
    { name: "Bad", price: -50, qty: 2 },
  ];
  assert.throws(() => cartTotal(items, DEFAULT_OPTIONS), RangeError);
});

test("price = NaN throws RangeError", () => {
  const items = [{ name: "Bad", price: NaN, qty: 1 }];
  assert.throws(() => cartTotal(items, DEFAULT_OPTIONS), RangeError);
});

test("price = Infinity throws RangeError", () => {
  const items = [{ name: "Bad", price: Infinity, qty: 1 }];
  assert.throws(() => cartTotal(items, DEFAULT_OPTIONS), RangeError);
});

test("price is not a number throws RangeError", () => {
  const items = [{ name: "Bad", price: "10000", qty: 1 }];
  assert.throws(() => cartTotal(items, DEFAULT_OPTIONS), RangeError);
});

// ──────────────────────────────────────────────
// 4. VALIDATION — non-positive-integer qty throws RangeError
// ──────────────────────────────────────────────

test("qty = 0 throws RangeError", () => {
  const items = [{ name: "Bad", price: 100, qty: 0 }];
  assert.throws(() => cartTotal(items, DEFAULT_OPTIONS), RangeError);
});

test("qty = -1 throws RangeError", () => {
  const items = [{ name: "Bad", price: 100, qty: -1 }];
  assert.throws(() => cartTotal(items, DEFAULT_OPTIONS), RangeError);
});

test("qty = -100 throws RangeError", () => {
  const items = [{ name: "Bad", price: 100, qty: -100 }];
  assert.throws(() => cartTotal(items, DEFAULT_OPTIONS), RangeError);
});

test("qty = 1.5 (float) throws RangeError", () => {
  const items = [{ name: "Bad", price: 100, qty: 1.5 }];
  assert.throws(() => cartTotal(items, DEFAULT_OPTIONS), RangeError);
});

test("qty = 0.99 throws RangeError", () => {
  const items = [{ name: "Bad", price: 100, qty: 0.99 }];
  assert.throws(() => cartTotal(items, DEFAULT_OPTIONS), RangeError);
});

test("qty = NaN throws RangeError", () => {
  const items = [{ name: "Bad", price: 100, qty: NaN }];
  assert.throws(() => cartTotal(items, DEFAULT_OPTIONS), RangeError);
});

test("qty = Infinity throws RangeError", () => {
  const items = [{ name: "Bad", price: 100, qty: Infinity }];
  assert.throws(() => cartTotal(items, DEFAULT_OPTIONS), RangeError);
});

// ──────────────────────────────────────────────
// 5. FREE SHIPPING threshold boundary
// ──────────────────────────────────────────────

test("subtotal just below freeShipFrom → shipping charged", () => {
  // subtotal = 499999, vat = 39999.92, ship = 30000
  // total = 569998.92 → 569999
  const items = [{ name: "Just under", price: 499999, qty: 1 }];
  assert.equal(cartTotal(items, DEFAULT_OPTIONS), 569999);
});

test("subtotal exactly equals freeShipFrom → free shipping", () => {
  // subtotal = 500000, vat = 40000, ship = 0
  // total = 540000
  const items = [{ name: "Exact", price: 500000, qty: 1 }];
  assert.equal(cartTotal(items, DEFAULT_OPTIONS), 540000);
});

test("subtotal just above freeShipFrom → free shipping", () => {
  // subtotal = 500001, vat = 40000.08, ship = 0
  // total = 540001.08 → 540001
  const items = [{ name: "Just over", price: 500001, qty: 1 }];
  assert.equal(cartTotal(items, DEFAULT_OPTIONS), 540001);
});

test("subtotal well above freeShipFrom → free shipping", () => {
  const items = [{ name: "Luxury", price: 1000000, qty: 3 }];
  // subtotal = 3000000, vat = 240000, ship = 0
  assert.equal(cartTotal(items, DEFAULT_OPTIONS), 3240000);
});

// ──────────────────────────────────────────────
// 6. ROUNDING — result is a whole đồng
// ──────────────────────────────────────────────

test("fractional total rounds down (.31)", () => {
  // price = 33333, qty = 1, vatRate = 0.07
  // subtotal = 33333, vat = 2333.31, ship = 30000
  // total = 65666.31 → 65666
  const items = [{ name: "Odd", price: 33333, qty: 1 }];
  const options = { vatRate: 0.07, freeShipFrom: 500000, shipFee: 30000 };
  assert.equal(cartTotal(items, options), 65666);
});

test("fractional total at .5 rounds up", () => {
  // price = 5, qty = 1, vatRate = 0.1
  // subtotal = 5, vat = 0.5, ship = 30000
  // total = 30005.5 → 30006
  const items = [{ name: "Tiny", price: 5, qty: 1 }];
  const options = { vatRate: 0.1, freeShipFrom: 500000, shipFee: 30000 };
  assert.equal(cartTotal(items, options), 30006);
});

test("return value is an integer (typeof number, no decimals)", () => {
  const items = [{ name: "Test", price: 33333, qty: 1 }];
  const options = { vatRate: 0.07, freeShipFrom: 500000, shipFee: 30000 };
  const result = cartTotal(items, options);
  assert.equal(typeof result, "number");
  assert.equal(Number.isInteger(result), true);
});

// ──────────────────────────────────────────────
// 7. GENERAL — price = 0 is valid
// ──────────────────────────────────────────────

test("price = 0 is valid (free item)", () => {
  const items = [{ name: "Free sticker", price: 0, qty: 5 }];
  // subtotal = 0, vat = 0, ship = 30000 (below threshold)
  assert.equal(cartTotal(items, DEFAULT_OPTIONS), 30000);
});

// ──────────────────────────────────────────────
// 8. MULTIPLE ITEMS — various combinations
// ──────────────────────────────────────────────

test("three items, below threshold", () => {
  const items = [
    { name: "A", price: 50000, qty: 1 },
    { name: "B", price: 30000, qty: 2 },
    { name: "C", price: 10000, qty: 3 },
  ];
  // subtotal = 50000 + 60000 + 30000 = 140000
  // vat = 11200, ship = 30000 → 181200
  assert.equal(cartTotal(items, DEFAULT_OPTIONS), 181200);
});

test("multiple items crossing threshold together", () => {
  const items = [
    { name: "X", price: 300000, qty: 1 },
    { name: "Y", price: 250000, qty: 1 },
  ];
  // subtotal = 550000 >= 500000 → free shipping
  // vat = 44000 → 594000
  assert.equal(cartTotal(items, DEFAULT_OPTIONS), 594000);
});

test("single item, qty = 3, below threshold", () => {
  const items = [{ name: "Bút", price: 15000, qty: 3 }];
  // subtotal = 45000, vat = 3600, ship = 30000 → 78600
  assert.equal(cartTotal(items, DEFAULT_OPTIONS), 78600);
});
