const statusMessage = document.getElementById("statusMessage");
const instructions = document.getElementById("instructions");
const inactiveMessage = document.getElementById("inactiveMessage");

document.getElementById("exportBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];

    // Send a message to the content script to start the export process
    chrome.tabs.sendMessage(tab.id, { action: "exportPresentation" });

    instructions.style.display = "none";
    statusMessage.innerText = "EXPORTING";
    statusMessage.style.display = "block";
  });
});

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var tab = tabs[0];
  var url = tab.url;

  if (url.includes("pitch.com")) {
    instructions.style.display = "block";
  } else {
    inactiveMessage.style.display = "block";
  }
  console.log(url);
});
