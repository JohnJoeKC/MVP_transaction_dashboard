function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function createElement(tag, attributes, ...children) {
    const element = document.createElement(tag);

    for (const [attr, value] of Object.entries(attributes || {})) {
        element.setAttribute(attr, value);
    }

    for (const child of children) {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else {
            element.appendChild(child);
        }
    }

    return element;
}

const { PythonShell } = require('python-shell');
const openai = require('openai');

// Replace this with your OpenAI API key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
openai.apiKey = OPENAI_API_KEY;

async function execPythonCode(code, stdin) {
    return new Promise((resolve, reject) => {
        const options = {
            mode: 'text',
            pythonOptions: ['-u'],
            args: [code, stdin]
        };

        PythonShell.runString(code, options, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}

async function callOpenAI(prompt) {
    const result = await openai.Completion.create({
        engine: 'davinci-codex',
        prompt: prompt,
        max_tokens: 50,
        n: 1,
        stop: null,
        temperature: 0.5
    });

    return result.choices[0].text;
}

module.exports = { execPythonCode, callOpenAI, formatCurrency, createElement };
