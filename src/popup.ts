function openOptionPage () {
  chrome.runtime.openOptionsPage();
}

document
  .getElementById('button')
  .addEventListener('click', function() {
    openOptionPage()
  })

openOptionPage()