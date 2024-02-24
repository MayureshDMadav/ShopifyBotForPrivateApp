function backGroundFunction(appName) {
  try {
    let listOfIdentifiers = [
      "a[href]",
      "a[href]",
      "a[href]",
      'button[type="button"]',
      'input[type="text"]',
      'button[type="button"]',
      "a[href]",
      'input[type="checkbox"]',
      'button[type="button"]',
      "a[href]",
      "a[href]",
      'input[type="checkbox"]',
      'input[type="checkbox"]',
      'button[type="button"]',
      'button[type="button"]',
      'button[type="button"]',
      'button[type="button"]',
    ];
    let targetIdentifierName = [
      "Settings",
      "Apps and sales channels",
      "Develop apps",
      "Create an app",
      "",
      "Create app",
      "Configure Admin API scopes",
      "",
      "Save",
      "Configuration",
      "Configure",
      "",
      "",
      "Save",
      "Install app",
      "Install",
      "Reveal token once",
    ];
    setInterval(() => {
      if (targetIdentifierName.length > 0 && listOfIdentifiers.length > 0) {
        let targetIdentifiers = Array.from(
          document.querySelectorAll(listOfIdentifiers[0])
        ).filter((element) =>
          element.type !== "text" &&
          element.textContent.trim() === targetIdentifierName[0]
            ? element
            : element.name === "appName"
            ? element
            : ""
        );
        if (targetIdentifiers[0]) {
          console.log(targetIdentifiers[0]);
          if (
            targetIdentifiers[0].href ||
            targetIdentifiers[0].type === "button"
          ) {
            targetIdentifiers[0].click();
          } else if (targetIdentifiers[0].type === "text") {
            targetIdentifiers[0].value = appName;
            const inputEvent = new Event("input", { bubbles: true });
            inputEvent.simulated = true;
            targetIdentifiers[0].dispatchEvent(inputEvent);
            const inputChangeEvent = new Event("change", { bubbles: true });
            targetIdentifiers[0].dispatchEvent(inputChangeEvent);
            const inputBlurEvent = new Event("blur", { bubbles: true });
            targetIdentifiers[0].dispatchEvent(inputBlurEvent);
          } else if (targetIdentifiers[0].type === "checkbox") {
            let targetElement = document.querySelectorAll(
              "input[type='checkbox']"
            );
            targetElement.forEach((element) => {
              if (element.checked == false) {
                element.click();
              }
            });
          }
          listOfIdentifiers.shift();
          targetIdentifierName.shift();
        }
      }
    }, 2000);
  } catch (error) {
    console.error("Error:", error);
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "executeScript") {
    const appName = message.value;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: backGroundFunction,
        args: [appName],
      });
    });
  }
});
