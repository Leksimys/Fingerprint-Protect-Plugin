// Определение модулей и их свойств
var modules = {
  headerModification: {
    enabled: true,
    toggle: function(enabled) {
      // Включает или выключает модуль, в зависимости от переданного значения
      this.enabled = enabled;
      // Отправляет сообщение о новом состоянии модуля всем вкладкам
      chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab) {
          chrome.tabs.sendMessage(tab.id, { module: "headerModification", enabled: enabled });
        });
      });
    },
  },
};

// Обработчик события при установке или обновлении расширения
chrome.runtime.onInstalled.addListener(function(details) {
  // Если расширение установлено или обновлено
  if (details.reason === 'install' || details.reason === 'update') {
    // Устанавливает модуль headerModification в состояние "включено" и сохраняет это состояние в хранилище
    chrome.storage.sync.set({ headerModification: true }, function() {
      modules.headerModification.enabled = true;
      sendModuleStates();
    });
  }
});

// Отправляет сообщение с текущим состоянием модуля при запуске расширения
sendModuleStates();
