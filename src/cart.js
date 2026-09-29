// Implement cartTotal here. See README.md for the specification.
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
