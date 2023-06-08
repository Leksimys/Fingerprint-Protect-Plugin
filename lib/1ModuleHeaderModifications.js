var userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134',
  'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0.1 Safari/604.3.5',
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:67.0) Gecko/20100101 Firefox/67.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Safari/605.1.15",
];
var index = 0;
var headerModificationEnabled = true;

function modifyHeaders(details) {
  if (headerModificationEnabled) {
    details.requestHeaders = details.requestHeaders.map(header => {
      if (header.name === 'User-Agent') {
        header.value = userAgents[index++ % userAgents.length];
      } else if (header.name === 'Accept-Language') {
        header.value = 'en-US,en;q=0.5';
      } else if (header.name === 'Referer') {
        return null;
      }
      return header;
    }).filter(header => header !== null);
  }
  return { requestHeaders: details.requestHeaders };
}

chrome.webRequest.onBeforeSendHeaders.addListener(
  modifyHeaders,
  { urls: ['<all_urls>'] },
  ['blocking', 'requestHeaders', 'extraHeaders']
);

chrome.runtime.onMessage.addListener(function (message) {
  if (message.module === 'headerModification') {
    headerModificationEnabled = message.enabled;
  }
});
