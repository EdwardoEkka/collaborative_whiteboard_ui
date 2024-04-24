import React,{useState} from 'react';
import DrawBoard from './board';

function Main_Board() {
  const [brushSize, setBrushSize] = useState(5);
  const [eraserMode, setEraserMode] = useState(false);
  const [brushColor, setBrushColor] = useState('#000000');
  return (
    <div >

      <DrawBoard
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        brushColor={brushColor}
        setBrushColor={setBrushColor}
        eraserMode={eraserMode}
        setEraserMode={setEraserMode}
      />
    </div>
  );
}

export default Main_Board;
