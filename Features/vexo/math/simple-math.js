import { prefix_vexo } from "../../../utils/util";
ChatLib.chat(`${prefix_vexo}§a1!`)

function safeMathEval(expr) {
    const cleanedExpr = expr.replace(/,/g, ".").replace(/\s+/g, "");
    // Improved tokenizer: matches numbers (including negatives/decimals) and operators
    const tokens = [];
    const regex = /(\d*\.\d+|\d+|[+\-*/^()])/g;
    let match;
    let lastToken = null;
    let i = 0;
    ChatLib.chat(`${prefix_vexo}§a2!`)
    while ((match = regex.exec(cleanedExpr)) !== null) {
        let token = match[0];
        // Handle unary minus (negative numbers)
        if (
            token === '-' &&
            (i === 0 || (lastToken && ['+', '-', '*', '/', '^', '('].includes(lastToken)))
        ) {
            // Attach minus to next number
            const nextMatch = regex.exec(cleanedExpr);
            if (nextMatch && /\d/.test(nextMatch[0])) {
                token = '-' + nextMatch[0];
            } else {
                tokens.push(token);
                lastToken = token;
                i++;
                continue;
            }
        }
        tokens.push(token);
        lastToken = token;
        i++;
    }
    ChatLib.chat(`${prefix_vexo}§a3!`)
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
            while (
                operators.length &&
                precedence[operators[operators.length-1]] >= precedence[token]
            ) {
                output.push(operators.pop());
            }
            operators.push(token);
        }
    }
    ChatLib.chat(`${prefix_vexo}§a5!`)
    while (operators.length) output.push(operators.pop());

    const stack = [];
    for (const token of output) {
        if (!isNaN(token)) {
            stack.push(parseFloat(token));
        } else {
            if (stack.length < 2) throw new Error("Invalid expression");
            const b = stack.pop();
            const a = stack.pop();
            if (token === '+') stack.push(a + b);
            else if (token === '-') stack.push(a - b);
            else if (token === '*') stack.push(a * b);
            else if (token === '/') stack.push(a / b);
            else if (token === '^') stack.push(Math.pow(a, b));
        }
    }
    ChatLib.chat(`${prefix_vexo}§a6!`)
    if (stack.length !== 1) throw new Error("Invalid expression");
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