import { useState } from "react";

export default function ComponentAddRemove() {
  const [newComponents, setNewComponents] = useState([]);

  function handleAddComponent() {
    setNewComponents((prevComponents) => [
      ...prevComponents,
      { id: prevComponents.length },
    ]);
  }

  function handleRemoveComponent() {
    setNewComponents((prevComponents) => prevComponents.slice(0, -1));
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>homework 02: ComponentAdd/Remove</h2>
      <button onClick={handleAddComponent}>Add Component</button>
      <button onClick={handleRemoveComponent}>Remove Component</button>
      <br />
      {newComponents.map((newComponents) => (
        <div
          key={newComponents.id}
          style={{
            width: "70%",
            height: "20px",
            margin: "10px auto",
            borderStyle: "dashed",
          }}
        >
          {`Here's new component:`} {newComponents.id}
        </div>
      ))}
    </div>
  );
}
