import React, { useState } from "react";
import { render } from "react-dom";

const Popup = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

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
    cursor:pointer
  }

  body{
    width:auto;
  }

  #start_auto{
    display:none;
    text-align:center;
  }

  #form_data {
    padding: 5px;
    display: flex;
    flex-direction: row;
    gap: 5px;
    width:auto;
  }
  .loader {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 5px solid blue;
    border-right: 5px solid green;
    border-bottom: 5px solid red;
    border-left: 5px solid pink;
    width: 18px;
    height: 18px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
    margin-left:auto;
    margin-right:auto;
  }
  
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }


  #container_loader {
    flex-direction: column;
    gap: 5px;
    width:12rem; 
    margin-left:14px;
    margin-right:auto;
  }


  

  `;

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: backGroundFunction,
        args: [value],
      });
    });

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
  };

  return (
    <div>
      <style>{styles} </style>
      <form
        onSubmit={handleSubmit}
        id="form_data"
        style={{ display: loading ? "none" : "flex" }}
      >
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Enter App Name"
          required
        />
        <button type="submit" id="btn_start">
          Create
        </button>
      </form>
      <div id="container_loader" style={{ display: loading ? "flex" : "none" }}>
        <span id="text_content">Private App Creation In Progress</span>
        <div className="loader"></div>
      </div>
    </div>
  );
};

render(<Popup />, document.getElementById("root"));
