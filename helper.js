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

async function fetchAndPopulateFiles(personalAccessToken) {
    const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents`;
    const headers = new Headers({
        'Authorization': `token ${personalAccessToken}`,
        'Accept': 'application/vnd.github+json'
    });

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error('Failed to fetch files');
        }
        const files = await response.json();
        populateFileSelect(files);
    } catch (error) {
        console.error(error);
    }
}

function populateFileSelect(files) {
    const fileSelect = document.getElementById("file-select");
    fileSelect.innerHTML = ""; // Clear existing options
    files.forEach(file => {
        const option = document.createElement("option");
        option.value = file.path;
        option.textContent = file.name;
        fileSelect.appendChild(option);
    });
}

module.exports = { formatCurrency, createElement, fetchAndPopulateFiles, populateFileSelect };
