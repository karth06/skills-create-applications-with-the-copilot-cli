#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations:
// - add: addition
// - sub: subtraction
// - mul: multiplication
// - div: division

// Usage examples:
// node src/calculator.js add 1 2 3    -> 6
// node src/calculator.js sub 10 3    -> 7
// node src/calculator.js mul 2 4     -> 8
// node src/calculator.js div 8 2     -> 4

function printHelp() {
  console.log("Usage: node src/calculator.js <operation> <num1> <num2> [<num3> ...]");
  console.log("");
  console.log("Operations:");
  console.log("  add   - addition");
  console.log("  sub   - subtraction (left-to-right)");
  console.log("  mul   - multiplication");
  console.log("  div   - division (left-to-right, errors on division by zero)");
  console.log("");
  console.log("Examples:");
  console.log("  node src/calculator.js add 1 2 3");
  console.log("  node src/calculator.js div 10 2");
}

function errorExit(msg) {
  console.error(msg);
  process.exitCode = 1;
  // allow process to exit naturally with non-zero code
}

function toNumbers(args) {
  const nums = args.map(a => {
    const n = Number(a);
    return Number.isFinite(n) ? n : NaN;
  });
  return nums;
}

function validateNumbers(nums) {
  for (let i = 0; i < nums.length; i++) {
    if (!Number.isFinite(nums[i])) return false;
  }
  return true;
}

function run() {
  const argv = process.argv.slice(2);
  if (argv.length === 0 || argv.includes('--help') || argv.includes('-h')) {
    printHelp();
    return;
  }

  const op = argv[0];
  const operands = argv.slice(1);

  if (operands.length < 2) {
    errorExit('Error: Provide an operation and at least two numeric operands. Use --help for usage.');
    return;
  }

  const nums = toNumbers(operands);
  if (!validateNumbers(nums)) {
    errorExit('Error: All operands must be valid numbers.');
    return;
  }

  let result;
  switch (op) {
    case 'add':
    case '+':
      result = nums.reduce((a, b) => a + b, 0);
      break;
    case 'sub':
    case '-':
      result = nums.reduce((a, b) => a - b);
      break;
    case 'mul':
    case '*':
    case 'x':
      result = nums.reduce((a, b) => a * b, 1);
      break;
    case 'div':
    case '/':
      // Check for division by zero in subsequent operands
      for (let i = 1; i < nums.length; i++) {
        if (nums[i] === 0) {
          errorExit('Error: Division by zero detected.');
          return;
        }
      }
      result = nums.reduce((a, b) => a / b);
      break;
    default:
      errorExit(`Error: Unknown operation '${op}'. Use --help to see supported operations.`);
      return;
  }

  // Print result and exit with success (0)
  // For integers that are close to integer, print without excessive decimals
  if (Number.isFinite(result) && Math.abs(result - Math.round(result)) < Number.EPSILON) {
    console.log(Math.round(result));
  } else {
    console.log(result);
  }
}

run();
