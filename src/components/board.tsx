import React, { useState, useEffect, useRef } from "react";
import Konva from "konva";
import { Stage, Layer, Line } from "react-konva";
import io, { Socket } from "socket.io-client";
import axios from "axios";

interface DrawBoardProps {
  brushSize: number;
  setBrushSize: React.Dispatch<React.SetStateAction<number>>;
  brushColor: string;
  setBrushColor: React.Dispatch<React.SetStateAction<string>>;
  eraserMode: boolean;
  setEraserMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawBoard: React.FC<DrawBoardProps> = ({
  brushSize,
  setBrushSize,
  brushColor,
  setBrushColor,
  eraserMode,
  setEraserMode,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const isDrawing = useRef(false);
  const lines = useRef<Konva.Line[]>([]);
  const undoneLines = useRef<Konva.Line[]>([]);
  const layerRef = useRef<Konva.Layer | null>(null);
  const stageRef = useRef<Konva.Stage | null>(null);

  const clearDrawingData = async () => {
    try {
      await axios.post("http://localhost:5000/clearData");
      console.log("Drawing data cleared successfully");
    } catch (error) {
      console.error("Error clearing drawing data:", error);
    }
  };

  useEffect(() => {
    // Scroll to 50% of the page height and width
    window.scrollTo(
      document.body.scrollWidth * 0.25,
      document.body.scrollHeight * 0.35
    );
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("initialDraw", (data: any[]) => {
      data.forEach((drawData) => drawLine(drawData));
    });

    socket.on("draw", (data: any) => {
      const { action, ...drawData } = data;
      if (action === "draw") {
        drawLine(drawData);
      }
    });

    socket.on("clearData", () => {
      clearDrawing();
    });

    return () => {
      socket.off("initialDraw");
      socket.off("draw");
      socket.off("clearData");
    };
  }, [socket]);

  const drawLine = (data: any) => {
    const { points, brushSize, brushColor, eraserMode } = data;
    const line = new Konva.Line({
      stroke: eraserMode ? "white" : brushColor,
      strokeWidth: eraserMode ? brushSize * 2 : brushSize,
      globalCompositeOperation: eraserMode ? "destination-out" : "source-over",
      points,
    });
    lines.current.push(line);
    layerRef.current?.add(line);
    layerRef.current?.batchDraw();
  };

  const emitDraw = (action: string, data: any) => {
    if (socket) {
      socket.emit("draw", { action, ...data });
    }
  };

  const handleMouseDown = () => {
    isDrawing.current = true;
    const pos = stageRef.current?.getPointerPosition();
    const line = new Konva.Line({
      stroke: eraserMode ? "white" : brushColor,
      strokeWidth: eraserMode ? brushSize * 2 : brushSize,
      globalCompositeOperation: eraserMode ? "destination-out" : "source-over",
      points: [pos!.x, pos!.y],
    });
    lines.current.push(line);
    layerRef.current?.add(line);

    emitDraw("draw", {
      points: [pos!.x, pos!.y],
      brushSize,
      brushColor,
      eraserMode,
    });
  };

  const handleMouseMove = () => {
    if (!isDrawing.current) {
      return;
    }
    const pos = stageRef.current?.getPointerPosition();
    if (lines.current.length > 0) {
      const lastLine = lines.current[lines.current.length - 1];
      lastLine.points([...lastLine.points(), pos!.x, pos!.y]);
      layerRef.current?.batchDraw();

      emitDraw("draw", {
        points: lastLine.points(),
        brushSize,
        brushColor,
        eraserMode,
      });
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleMouseLeave = () => {
    isDrawing.current = false;
  };

  const handleBrushSizeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBrushSize(parseInt(event.target.value));
  };

  const handleBrushColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBrushColor(event.target.value);
  };

  const toggleEraserMode = () => {
    setEraserMode((prev) => !prev);
  };

  const undo = () => {
    const line = lines.current.pop();
    if (line) {
      undoneLines.current.push(line);
      layerRef.current?.removeChildren();
      layerRef.current?.add(...lines.current);
      layerRef.current?.batchDraw();
    }
  };

  const redo = () => {
    const line = undoneLines.current.pop();
    if (line) {
      lines.current.push(line);
      layerRef.current?.add(line);
      layerRef.current?.batchDraw();
    }
  };

  const clearDrawing = () => {
    layerRef.current?.removeChildren();
    layerRef.current?.batchDraw();
  };

  const stageIRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom * 1.1);
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => prevZoom * 0.9);
  };

  return (
    <div style={{ backgroundColor: "#f2f2f2" }}>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 999,
        }}
      >
        <label htmlFor="brushSize">Brush Size: </label>
        <input
          type="range"
          id="brushSize"
          min="1"
          max="20"
          value={brushSize}
          onChange={handleBrushSizeChange}
        />
        <label htmlFor="brushColor">Brush Color: </label>
        <input
          type="color"
          id="brushColor"
          value={brushColor}
          onChange={handleBrushColorChange}
        />
        <button onClick={toggleEraserMode}>
          {eraserMode ? "Disable Eraser" : "Enable Eraser"}
        </button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        <button onClick={clearDrawingData}>Clear</button>
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
      </div>
      <div
        ref={stageIRef}
        style={{
          cursor: "crosshair",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${zoomLevel})`,
          touchAction: "none",
        }}
      >
        <Stage
          ref={stageRef}
          width={6000}
          height={6000}
          style={{
            zIndex: "100",
            backgroundColor: "#f2f2f2",
            position: "relative",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          <Layer ref={layerRef} />
        </Stage>
      </div>
    </div>
  );
};

export default DrawBoard;
