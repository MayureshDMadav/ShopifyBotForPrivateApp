import React from "react";
import { render } from "react-dom";

const Popup = () => {
  let styles = `
  #btn_start{
    background-color: #4CAF50; 
    color:white;
    padding:5px 10px;
    width:100%;
    font-size:14px;
    border:none;
    border-radius:5px;
    text-transform:Uppercase;
    text-align:center;
  }

  body{
    width:auto;
  }

  #start_auto{
    display:none;
    text-align:center;
  }

  #container{
    display:grid;
    justify-content:center;
    width:100%;
  }
  `;

  const background = () => {
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
              targetIdentifiers[0].value = "Gokwik";
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
  };

  const processRequest = async () => {
    let para = document.querySelector("#start_auto");
    let button = document.querySelector("#btn_start");
    button.style.display = "none";
    para.style.display = "block";

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: background,
    });
  };

  return (
    <div>
      <style>{styles} </style>
      <input type="text" name="EnterName" />
      <button onClick={processRequest} id="btn_start" type="submit">
        Start
      </button>
      <p id="start_auto">Automation In Progress..</p>
    </div>
  );
};

render(<Popup />, document.getElementById("root"));
