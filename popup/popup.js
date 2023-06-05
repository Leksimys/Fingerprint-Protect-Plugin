document.addEventListener('DOMContentLoaded', function() {
  var headerModificationToggle = document.getElementById('header-modification-toggle');

  chrome.storage.sync.get('headerModification', function(data) {
    var isEnabled = data.headerModification !== undefined ? data.headerModification : true;
    headerModificationToggle.checked = isEnabled;
    chrome.runtime.sendMessage({ module: 'headerModification', enabled: isEnabled });
  });

  headerModificationToggle.addEventListener('change', function() {
    var enabled = headerModificationToggle.checked;
    chrome.runtime.sendMessage({ module: 'headerModification', enabled: enabled });
    chrome.storage.sync.set({ headerModification: enabled });
  });
});

// Отправляем сообщение с текущим состоянием модуля при запуске расширения
chrome.runtime.sendMessage({ module: 'headerModification' });
