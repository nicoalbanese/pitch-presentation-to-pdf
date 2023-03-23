document.getElementById("exportBtn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
  
      // Send a message to the content script to start the export process
      chrome.tabs.sendMessage(tab.id, { action: "exportPresentation" });

      const statusMessage = document.getElementById("statusMessage");
      const instructions = document.getElementById("instructions");
      instructions.style.display = "none";
      statusMessage.innerText = "EXPORTING";
      statusMessage.style.display = "block"
    });
  });
  