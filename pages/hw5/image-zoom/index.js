import { useState, useRef, useEffect } from "react";

export default function ImageZoom() {
  const [file, setFile] = useState();
  const [scale, setScale] = useState(1);
  const canvasRef = useRef(null);
  const downloadRef = useRef(null);

  function handleChange(e) {
    if (e.target.files.length !== 0) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  }

  function handleZoomChange(e) {
    setScale(e.target.valueAsNumber);
  }

  function handleWheel(e) {
    e.preventDefault();
    const scaleAmount = 0.1;

    if (e.deltaY < 0) {
      // Scroll down, zoom in
      setScale((prevScale) => Math.min(prevScale + scaleAmount, 3));
    } else {
      // Scroll up, zoom out
      setScale((prevScale) => Math.max(prevScale - scaleAmount, 0.5));
    }
  }

  useEffect(() => {
    if (file) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const img = new Image();
      img.onload = function () {
        canvas.width = 500;
        canvas.height = 500;

        // Set centerX and centerY to the center of the canvas
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Calculate the scaled image size after applying the zoom level
        const scaledWidth = canvas.width * scale;
        const scaledHeight = canvas.height * scale;

        // Calculate dx and dy as the top-left origin of the image
        const dx = centerX - scaledWidth / 2;
        const dy = centerY - scaledHeight / 2;

        // Draw the image onto the canvas with scaling
        context.drawImage(img, dx, dy, scaledWidth, scaledHeight);

        // Set the href of the download link to the data URL of the canvas
        downloadRef.current.href = canvas.toDataURL("image/png");
      };
      img.src = file;
    }
  }, [file, scale]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener("wheel", handleWheel);

    return () => {
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Image zoom in/out</h1>
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
          <h2>中心點縮放-可使用滑鼠滾輪</h2>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={scale}
            onChange={handleZoomChange}
          />
          <span>Zoom Level: {scale.toFixed(1)}x</span>
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
