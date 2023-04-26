require.config({
    paths: {
      'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min/vs'
    }
  });
  
  let editor;
  require(['vs/editor/editor.main'], function () {
    editor = monaco.editor.create(document.getElementById('monaco-editor-container'), {
      value: [
        'print("Hello, world!")',
      ].join('\n'),
      language: 'python'
    });
  
    editor.updateOptions({ theme: 'vs-dark' });
  });
  