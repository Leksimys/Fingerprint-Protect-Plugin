document.addEventListener('DOMContentLoaded', function() {
  var headerModificationSwitch = document.getElementById('header-modification-switch');

  chrome.storage.sync.get('headerModification', function(data) {
     var isEnabled = data.headerModification !== undefined ? data.headerModification : true;
    headerModificationSwitch.checked = isEnabled;
    chrome.runtime.sendMessage({ module: 'headerModification', enabled: isEnabled });
  });

  headerModificationSwitch.addEventListener('change', function() {
    var enabled = headerModificationSwitch.checked;
    chrome.runtime.sendMessage({ module: 'headerModification', enabled: enabled });
    chrome.storage.sync.set({ headerModification: enabled });
  });
});

chrome.runtime.onMessage.addListener(function(message) {
  if (message.module === 'headerModification') {
    var headerModificationSwitch = document.getElementById('header-modification-switch');
    headerModificationSwitch.checked = message.enabled;
  }
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (var key in changes) {
    if (key === 'headerModification') {
      var headerModificationSwitch = document.getElementById('header-modification-switch');
      headerModificationSwitch.checked = changes[key].newValue;
    }
  }
});
