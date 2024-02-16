import { useState } from "react";

export default function WelcomeLimitInput() {
  const [value, setValue] = useState("defaultValue");
  const [inputValue, setInputValue] = useState("");

  function handleValueChange(e) {
    setInputValue(e.target.value);
  }
  function handleSubmit() {
    setValue(inputValue);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>homework 01: Welcome Page (Advanced: input limit)</h2>
      <p>Welcome, {value}</p>
      <section>
        <div>
          Any input
          <input
            value={inputValue}
            onChange={handleValueChange}
            placeholder="any input"
          />
        </div>
        <div>
          Numbers only
          <input
            placeholder="numbers only"
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
          />
        </div>
        <div>
          English letters only:
          <input
            placeholder="english letters only"
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^a-zA-Z]/g, "");
            }}
          />
        </div>
        <div>
          Max Length is 5<input placeholder="maxLength is 5" maxLength={5} />
        </div>
      </section>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
