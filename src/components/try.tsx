import React, { useRef, useEffect, useState } from 'react';

type Coordinate = {
  x: number;
  y: number;
};

type Line = Coordinate[];

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if (context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear canvas first

      lines.forEach((line) => {
        if (line.length === 0) return;

        context.beginPath();
        line.forEach((point, index) => {
          const { x, y } = point;
          if (index === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        });
        context.stroke();
      });
    }
  }, [lines]);

  const startDrawing = ({ nativeEvent }: React.MouseEvent) => {
    const { offsetX, offsetY } = nativeEvent;
    setLines((prevLines) => [...prevLines, [{ x: offsetX, y: offsetY }]]);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }: React.MouseEvent) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    setLines((prevLines) => {
      const linesCopy = [...prevLines];
      const lastLine = linesCopy[linesCopy.length - 1];
      if (lastLine) {
        lastLine.push({ x: offsetX, y: offsetY });
      }
      return linesCopy;
    });
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div>
      <canvas
        width="500" // Replace with your preferred values
        height="500" // Replace with your preferred values
        ref={canvasRef}
        style={{ border: '1px solid black' }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
      />
    </div>
  );
};

export default CanvasComponent;