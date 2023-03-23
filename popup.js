document.getElementById("exportBtn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
  
      // Send a message to the content script to start the export process
      chrome.tabs.sendMessage(tab.id, { action: "exportPresentation" });
    });
  });
  