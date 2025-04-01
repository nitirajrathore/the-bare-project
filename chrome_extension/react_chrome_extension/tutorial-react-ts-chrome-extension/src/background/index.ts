// Listen for when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed/updated');
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    console.log('Received message:', request);
    // Handle different message types here
    if (request.type === 'EXAMPLE_MESSAGE') {
      // Do something
      sendResponse({ status: 'success' });
    }
    // Return true if you want to use sendResponse asynchronously
    return true;
  }
);

// Example of how to handle browser action clicks
chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    // You can send messages to content scripts
    chrome.tabs.sendMessage(tab.id, {
      type: 'TOGGLE_FEATURE'
    });
  }
});