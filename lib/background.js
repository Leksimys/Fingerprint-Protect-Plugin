var modules = {
  headerModification: {
    enabled: true,
    toggle: function(enabled) {
      this.enabled = enabled;
      chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab) {
          chrome.tabs.sendMessage(tab.id, { module: "headerModification", enabled: enabled });
        });
      });
    },
  },
};

chrome.runtime.onInstalled.addListener(function() {
  // Устанавливаем состояние модуля по умолчанию при установке или обновлении расширения
  chrome.storage.sync.get("headerModification", function(data) {
    if (data.headerModification === undefined) {
      chrome.storage.sync.set({ headerModification: true });
    }
  });
});

chrome.runtime.onStartup.addListener(function() {
  // Включаем модуль при старте расширения
  chrome.storage.sync.get("headerModification", function(data) {
    modules.headerModification.enabled = data.headerModification !== undefined ? data.headerModification : true;
    sendModuleStates();
  });
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  var module = modules[message.module];
  if (module) {
    module.toggle(message.enabled);
    var moduleState = {};
    moduleState[message.module] = message.enabled;
    chrome.storage.sync.set(moduleState);
  }
});

function sendModuleStates() {
  var moduleStates = {};
  for (var key in modules) {
    if (modules.hasOwnProperty(key)) {
      moduleStates[key] = modules[key].enabled;
    }
  }
  chrome.runtime.sendMessage(moduleStates);
}

// Отправляем сообщение с текущим состоянием модуля при запуске расширения
sendModuleStates();
