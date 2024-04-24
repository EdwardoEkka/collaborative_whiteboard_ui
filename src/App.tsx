import React,{useState} from 'react';
import MainLog from './components/main_log';
import DrawBoard from './components/board';

function App() {
  const [brushSize, setBrushSize] = useState(5);
  const [eraserMode, setEraserMode] = useState(false);
  const [brushColor, setBrushColor] = useState('#000000');
  return (
    <div className="App">
      {/* <MainLog/> */}
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

export default App;
