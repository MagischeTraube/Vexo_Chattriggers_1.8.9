import { prefix_vexo } from "../../../utils/util";

function safeMathEval(expr) {
    const cleanedExpr = expr.replace(/,/g, ".").replace(/\s+/g, "");
    const tokens = cleanedExpr.split(/([\+\-\*\/\^\(\)])/).filter(t => t !== "");

    const output = [];
    const operators = [];
    const precedence = {'^': 4, '*': 3, '/': 3, '+': 2, '-': 2};

    for (const token of tokens) {
        if (!isNaN(token)) {
            output.push(parseFloat(token));
        } else if (token === '(') {
            operators.push(token);
        } else if (token === ')') {
            while (operators.length && operators[operators.length-1] !== '(') {
                output.push(operators.pop());
            }
            operators.pop();
        } else {
            while (operators.length && precedence[operators[operators.length-1]] >= precedence[token]) {
                output.push(operators.pop());
            }
            operators.push(token);
        }
    }

    while (operators.length) output.push(operators.pop());

    const stack = [];
    for (const token of output) {
        if (!isNaN(token)) {
            stack.push(token);
        } else {
            const b = stack.pop();
            const a = stack.pop();
            if (token === '+') stack.push(a + b);
            else if (token === '-') stack.push(a - b);
            else if (token === '*') stack.push(a * b);
            else if (token === '/') stack.push(a / b);
            else if (token === '^') stack.push(Math.pow(a, b));
        }
    }

    return stack[0];
}

export const MATHCommand = register("command", (args) => {
    if (!args.length) {
        ChatLib.chat(`${prefix_vexo}Usage: /vm <expression>`);
        ChatLib.chat(`${prefix_vexo}Example: /vm (5 + 3) * 2^3`);
        return;
    }

    try {
        const expr = args.join(" ");
        const result = safeMathEval(expr);
        ChatLib.chat(`${prefix_vexo}Result: ${expr} = ${result}`);
    } catch (e) {
        ChatLib.chat(`${prefix_vexo}§cError: Invalid expression!`);
    }
}).setName("vexomath").setAlias("vm");