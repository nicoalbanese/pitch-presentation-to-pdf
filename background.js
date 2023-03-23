chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'captureTab') {
      chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
        sendResponse(dataUrl);
      });
    }
  
    return true;
  });
  