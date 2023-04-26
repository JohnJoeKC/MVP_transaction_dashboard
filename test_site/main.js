let editor;

function initMonacoEditor() {
  require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min/vs' }});
  require(['vs/editor/editor.main'], function() {
    editor = monaco.editor.create(document.getElementById('monaco-editor-container'), {
      value: "",
      language: "plaintext",
      theme: "vs-dark",
      automaticLayout: true,
    });
  });
}

initMonacoEditor();

require.config({
  paths: {
    'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min/vs'
  }
});

require(['vs/editor/editor.main'], function () {
  editor = monaco.editor.create(document.getElementById('monaco-editor-container'), {
    value: [
      'print("Hello, world!")',
    ].join('\n'),
    language: 'python'
  });

  editor.updateOptions({ theme: 'vs-dark' });

  // Call fetchAndPopulateFilesDirectly() once, after editor initialization
  fetchAndPopulateFilesDirectly();
});

async function fetchAndPopulateFilesDirectly() {
  const repoOwner = "JohnJoeKC";
  const repoName = "MVP_transaction_dashboard";
  const taskFolderPath = "candidates/candidate_0/task";

  try {
    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${taskFolderPath}`);
    const files = await response.json();
    populateFileSelect(files);
  } catch (error) {
    console.error("Error fetching repository content:", error);
  }
}

function populateFileSelect(files) {
  const fileSelect = document.getElementById("file-select");

  files.forEach(file => {
    const option = document.createElement("option");
    option.value = file.path;
    option.textContent = file.name;
    fileSelect.appendChild(option);
  });

  fileSelect.addEventListener("change", async function () {
    const filePath = this.value;
    const fileContent = await fetchFileContent(filePath);
    editor.setValue(fileContent);
  });
}

async function fetchFileContent(filePath) {
  const repoOwner = "JohnJoeKC";
  const repoName = "MVP_transaction_dashboard";

  try {
    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`);
    const file = await response.json();
    const fileContent = atob(file.content);
    return fileContent;
  } catch (error) {
    console.error("Error fetching file content:", error);
  }
}
