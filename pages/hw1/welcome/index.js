import { useState } from "react";

export default function Welcome() {
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
      <h2>homework 01: Welcome Page</h2>
      <p>Welcome, {value}</p>
      <input value={inputValue} onChange={handleValueChange} />
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
