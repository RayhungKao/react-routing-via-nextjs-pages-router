import { useState, useRef, useEffect } from "react";

export default function ImageZoomAdvanced() {
  const [file, setFile] = useState();
  const [scale, setScale] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const downloadRef = useRef(null);
  const maxScale = 3.0;
  const minScale = 1.0;
  const scaleAmount = 0.1;
  const CanvasWidth = 500,
    CanvasHeight = 500;

  function handleChange(e) {
    if (e.target.files.length !== 0) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  }

  function handleWheel(e) {
    e.preventDefault();

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    // Calculate the mouse position relative to the canvas
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (e.deltaY < 0) {
      if (scale === maxScale) return;

      // Scroll down, zoom in
      setScale((prevScale) => Math.min(prevScale + scaleAmount, maxScale));

      // Move the canvas center towards the mouse position
      setOffset((prevOffset) => {
        const proportion = (maxScale - minScale) * 5;
        return {
          x: prevOffset.x - (mouseX - canvas.width / 2) / proportion,
          y: prevOffset.y - (mouseY - canvas.height / 2) / proportion,
        };
      });
    } else {
      if (scale === minScale) return;

      // Scroll up, zoom out
      setScale((prevScale) => {
        const newScale = Math.max(prevScale - scaleAmount, minScale);

        // Calculate the proportion of smoothly zoom out
        const proportion =
          prevScale === minScale
            ? 0
            : (prevScale - newScale) / (prevScale - minScale);

        // Move the canvas center towards the original center position
        setOffset((prevOffset) => ({
          x: prevOffset.x * (1 - proportion),
          y: prevOffset.y * (1 - proportion),
        }));

        return newScale;
      });
    }
  }

  function handleMouseMove(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (isPanning) {
      const widthDistanceCanDrag = (CanvasWidth * scale - CanvasWidth) / 2;
      const heightDistanceCanDrag = (CanvasHeight * scale - CanvasHeight) / 2;

      // Move the canvas center by the distance the mouse has dragged and set the difference to the offset
      setOffset((prevOffset) => {
        const newOffsetX = prevOffset.x + (mouseX - mousePosition.x);
        const newOffsetY = prevOffset.y + (mouseY - mousePosition.y);

        if (
          newOffsetX > widthDistanceCanDrag ||
          newOffsetX < widthDistanceCanDrag * -1
        ) {
          return prevOffset; // Return the previous offset if the new offset is out of bounds
        }

        if (
          newOffsetY > heightDistanceCanDrag ||
          newOffsetY < heightDistanceCanDrag * -1
        ) {
          return prevOffset; // Return the previous offset if the new offset is out of bounds
        }

        return {
          x: newOffsetX,
          y: newOffsetY,
        };
      });
    }

    setMousePosition({ x: mouseX, y: mouseY });
  }

  function handleImageDragStart() {
    setIsPanning(true);
  }

  function handleImageDragStop() {
    setIsPanning(false);
  }

  function handleMouseLeave() {
    setIsPanning(false);
  }

  useEffect(() => {
    if (file) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const img = new Image();
      img.onload = function () {
        canvas.width = CanvasWidth;
        canvas.height = CanvasHeight;

        // Set centerX and centerY to the center of the canvas
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Calculate the scaled image size after applying the zoom level
        const scaledWidth = canvas.width * scale;
        const scaledHeight = canvas.height * scale;

        // Calculate dx and dy as the top-left origin of the image
        const dx = centerX - scaledWidth / 2;
        const dy = centerY - scaledHeight / 2;

        // Moves the image with the canvas context by the current offset
        context.translate(offset.x, offset.y);

        // Draw the image onto the canvas with scaling
        context.drawImage(img, dx, dy, scaledWidth, scaledHeight);

        // Set the href of the download link to the data URL of the canvas
        downloadRef.current.href = canvas.toDataURL("image/png");
      };
      img.src = file;
    }
  }, [file, scale, offset]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener("wheel", handleWheel);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleImageDragStart);
    canvas.addEventListener("mouseup", handleImageDragStop);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleImageDragStart);
      canvas.removeEventListener("mouseup", handleImageDragStop);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mousePosition, isPanning]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Image zoom in/out (advanced)</h1>
      <input type="file" onChange={handleChange} />
      {file ? (
        <div>
          <a href={file} download="image.png">
            Download file
          </a>
          <br />
          <a ref={downloadRef} download="transformed-image.png">
            Download Transformed Image
          </a>
          <h2>以滑鼠位置為中心縮放-可使用滑鼠滾輪、可拖曳</h2>
          <span>
            Zoom Level: {scale.toFixed(1)}x / {maxScale.toFixed(1)}
          </span>
          <p /> Mouse Position in canvas: X: {mousePosition.x.toFixed(0)}, Y:
          {mousePosition.y.toFixed(0)}
          <p /> Offset from canvas center X: {offset.x.toFixed(0)}, Y:
          {offset.y.toFixed(0)}
        </div>
      ) : null}
      <br />
      <canvas
        ref={canvasRef}
        style={
          file
            ? {
                margin: "10px auto",
                borderStyle: "solid",
              }
            : null
        }
      />
    </div>
  );
}
