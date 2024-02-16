import { useState } from "react";

export default function ComponentDragDrop() {
  const [newComponents, setNewComponents] = useState([]);
  const [idCounter, setIdCounter] = useState(0);
  
  function handleAddComponent() {
    setNewComponents((prevComponents) => [
      ...prevComponents,
      { id: idCounter },
    ]);
    setIdCounter(idCounter + 1);
  }

  function handleRemoveComponent() {
    setNewComponents((prevComponents) => prevComponents.slice(0, -1));
  }

  function handleRemoveArbitraryComponent(id) {
    setNewComponents(prevComponents => prevComponents.filter(component => component.id !== id));
  }

  function handleMoveUp(id) {
    setNewComponents(prevComponents => {
      const index = prevComponents.findIndex(component => component.id === id);
      if (index === 0) return prevComponents; // If it's the first item, it can't move up
      return [
        ...prevComponents.slice(0, index - 1),
        prevComponents[index],
        prevComponents[index - 1],
        ...prevComponents.slice(index + 1)
      ];
    });
  }

  function handleMoveDown(id) {
    setNewComponents(prevComponents => {
      const index = prevComponents.findIndex(component => component.id === id);
      if (index === prevComponents.length - 1) return prevComponents; // If it's the last item, it can't move down
      return [
        ...prevComponents.slice(0, index),
        prevComponents[index + 1],
        prevComponents[index],
        ...prevComponents.slice(index + 2)
      ];
    });
  }

  function handleDragStart(e, id) {
    e.dataTransfer.setData("id", id);
    console.log("drag start")
  }

  function handleDragOver(e) {
    e.preventDefault();
    console.log("drag over")
  }

  function handleDrop(e, id) {
    const draggedId = e.dataTransfer.getData("id");
    const draggedIndex = newComponents.findIndex(component => component.id === Number(draggedId));
    const dropIndex = newComponents.findIndex(component => component.id === id);

    const newComponentList = [...newComponents];
    const temp = newComponentList[draggedIndex];
    newComponentList[draggedIndex] = newComponentList[dropIndex];
    newComponentList[dropIndex] = temp;

    setNewComponents(newComponentList);
    console.log("drop")
  }
  
  return (
    <div style={{ textAlign: "center" }}>
      <h2>
        homework 02: ComponentAdd/Remove (Advanced: drag n drop, remove any
        component)
      </h2>
      <button onClick={handleAddComponent}>Add Component</button>
      <button onClick={handleRemoveComponent}>Remove Component</button>
      <br />
      {newComponents.map((newComponents) => (
        <div
          key={newComponents.id}
          draggable
          onDragStart={(e) => handleDragStart(e, newComponents.id)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, newComponents.id)}
          style={{
            width: "70%",
            height: "20px",
            margin: "10px auto",
            borderStyle: "dashed",
          }}
        >
          {`Here's new component:`} {newComponents.id}
          <button onClick={() => handleRemoveArbitraryComponent(newComponents.id)}>Remove Component</button>
          <button onClick={() => handleMoveUp(newComponents.id)}>Move Up</button>
          <button onClick={() => handleMoveDown(newComponents.id)}>Move Down</button>
        </div>
      ))}
    </div>
  );
}
