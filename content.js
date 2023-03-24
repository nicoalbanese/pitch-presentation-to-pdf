async function captureSlides() {
    const slideCountElement = document.querySelector('.player-v2-chrome-controls-slide-count');
    const totalSlides = parseInt(slideCountElement.textContent.split(' / ')[1]);
  
    const nextButton = document.querySelector('.player-v2--button[aria-label="next"]');
  
    const slideImages = [];
  
    for (let i = 0; i < totalSlides; i++) {
      const dataUrl = await new Promise((resolve) => {
        setTimeout(() => {
          chrome.runtime.sendMessage({ type: 'captureTab' }, (dataUrl) => {
            resolve(dataUrl);
          });
        }, 1000);
      });
  
      slideImages.push(dataUrl);
  
      if (i < totalSlides - 1) {
        nextButton.click();
      }
    }
  
    return slideImages;
  }
  
  async function exportPresentation() {
    // Ensure we're on the first slide before starting the capture process
    await goToFirstSlide();
  
    const slideImages = await captureSlides();
  
    const pdf = new window.jspdf.jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [1920, 980],
    });
  
    slideImages.forEach((image, index) => {
      if (index > 0) {
        pdf.addPage();
      }
      pdf.addImage(image, "PNG", 0, 0, 1920, 980);
    });
  
    pdf.save("presentation.pdf");
  }
  
  async function goToFirstSlide() {
    const slideCountElement = document.querySelector(".player-v2-chrome-controls-slide-count");
    const slideCountText = slideCountElement.textContent;
    const [currentSlide, totalSlides] = slideCountText.split(" / ").map(Number);
  
    if (currentSlide !== 1) {
      const firstSlideBtn = document.querySelector('div.dash[data-test-id="dash-0"][idx="0"]');
      firstSlideBtn.click();
  
      // Wait for the slide to change and make sure the current slide is 1
      await new Promise((resolve) => {
        const observer = new MutationObserver(() => {
          if (slideCountElement.textContent.startsWith("1 /")) {
            observer.disconnect();
            resolve();
          }
        });
  
        observer.observe(slideCountElement, { childList: true, subtree: true });
      });
  
      // Add a short delay to ensure slide navigation is complete before capturing
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  
// Add the following function:
function init() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "exportPresentation") {
        exportPresentation();
        sendResponse({ success: true });
      }
    });
  }
  
  // Call the init function
  init();
  