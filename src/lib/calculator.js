// Library of calculator functions used by CLI and tests

// Supported operations:
// - add: addition
// - sub: subtraction
// - mul: multiplication
// - div: division (throws on division by zero)

function ensureArray(nums) {
  if (!Array.isArray(nums)) throw new TypeError('Operands must be an array');
  if (nums.length < 2) throw new Error('At least two operands are required');
  const converted = nums.map(n => {
    const v = Number(n);
    if (!Number.isFinite(v)) throw new TypeError('All operands must be valid numbers');
    return v;
  });
  return converted;
}

function add(nums) {
  const a = ensureArray(nums);
  return a.reduce((s, x) => s + x, 0);
}

function sub(nums) {
  const a = ensureArray(nums);
  return a.reduce((x, y) => x - y);
}

function mul(nums) {
  const a = ensureArray(nums);
  return a.reduce((p, x) => p * x, 1);
}

function div(nums) {
  const a = ensureArray(nums);
  for (let i = 1; i < a.length; i++) {
    if (a[i] === 0) throw new Error('Division by zero');
  }
  return a.reduce((x, y) => x / y);
}

module.exports = { add, sub, mul, div };
