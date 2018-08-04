(function() {
  const editor = document.querySelector('.editor-text');
  const previewer = document.querySelector('.previewer-output');

  function convertToMarkdown() {
    let userText = this.value;
    previewer.innerHTML = marked(userText);
  }

  editor.addEventListener('change', convertToMarkdown);
  editor.addEventListener('keyup', convertToMarkdown);
}())