import { useState, useRef, useEffect } from "react";

export default function CanvasLoadImage() {
  const [file, setFile] = useState();
  const [angle, setAngle] = useState(0);
  const [blur, setBlur] = useState(0);
  const canvasRef = useRef(null);
  const downloadRef = useRef(null);

  function handleChange(e) {
    if (e.target.files.length !== 0) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  }

  function handleRotateClockwise() {
    setAngle((prevAngle) => prevAngle + 90);
  }

  function handleRotateCounterclockwise() {
    setAngle((prevAngle) => prevAngle - 90);
  }

  function handleBlurChange(e) {
    setBlur(e.target.value);
  }

  useEffect(() => {
    if (file) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const img = new Image();
      img.onload = function () {
        canvas.width = Math.max(img.width, img.height);
        canvas.height = Math.max(img.width, img.height);

        // Translate to the center of the canvas
        context.translate(canvas.width / 2, canvas.height / 2);
        // Rotate the context by 90 degrees (in radians)
        context.rotate((angle * Math.PI) / 180);
        // Translate back to the top left corner
        context.translate(-canvas.width / 2, -canvas.height / 2);

        // Apply a blur filter to the context
        context.filter = `blur(${blur}px)`;

        // Draw the image at the canvas center after rotating
        const dx = canvas.width / 2 - img.width / 2;
        const dy = canvas.height / 2 - img.height / 2;
        context.drawImage(img, dx, dy, img.width, img.height);

        // Set the href of the download link to the data URL of the canvas
        const dataUrl = canvas.toDataURL("image/png");
        downloadRef.current.href = dataUrl;
      };
      img.src = file;
    }
  }, [file, angle, blur]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Canvas Image Upload</h1>
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
          <br />
          <br />
          <button onClick={handleRotateClockwise}>Rotate Clockwise</button>
          <button onClick={handleRotateCounterclockwise}>
            Rotate Counterclockwise
          </button>
          <div>
            <input
              type="range"
              min="0"
              max="20"
              value={blur}
              onChange={handleBlurChange}
            />
            Blur Level: {blur * 5}%
          </div>
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
