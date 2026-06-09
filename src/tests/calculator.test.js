const { add, sub, mul, div } = require('../lib/calculator');

describe('Calculator library', () => {
  describe('Addition', () => {
    test('adds 2 + 3 -> 5', () => {
      expect(add([2, 3])).toBe(5);
    });

    test('adds multiple operands', () => {
      expect(add([1, 2, 3, 4])).toBe(10);
    });

    test('handles numeric strings', () => {
      expect(add(['2', '3'])).toBe(5);
    });
  });

  describe('Subtraction', () => {
    test('10 - 4 -> 6', () => {
      expect(sub([10, 4])).toBe(6);
    });

    test('left-to-right subtraction with multiple operands', () => {
      expect(sub([20, 5, 3])).toBe(12); // 20 - 5 - 3 = 12
    });
  });

  describe('Multiplication', () => {
    test('45 * 2 -> 90', () => {
      expect(mul([45, 2])).toBe(90);
    });

    test('multiplying with zero yields zero', () => {
      expect(mul([3, 0, 5])).toBe(0);
    });
  });

  describe('Division', () => {
    test('20 / 5 -> 4', () => {
      expect(div([20, 5])).toBe(4);
    });

    test('left-to-right division with multiple operands', () => {
      expect(div([100, 2, 5])).toBe(10); // 100 / 2 / 5 = 10
    });

    test('throws on division by zero', () => {
      expect(() => div([10, 0])).toThrow('Division by zero');
    });
  });

  describe('Validation and errors', () => {
    test('throws if less than two operands provided', () => {
      expect(() => add([1])).toThrow();
    });

    test('throws on non-numeric inputs', () => {
      expect(() => add([1, 'foo'])).toThrow();
    });
  });
});
