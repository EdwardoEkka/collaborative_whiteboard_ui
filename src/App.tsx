import React,{useState} from 'react';
import MainLog from './components/main_log';
import Main_Board from './components/Main_Board';
import { UserProvider } from "./components/userContext";
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Room from './components/page';

function App() {
  return (
    <div className="App">
      <Router>
                <UserProvider>
                    <Routes>
                    <Route path="/" element={<Room/>} />
                    <Route path="/board" element={<Main_Board/>} />
                    <Route path="/log" element={<MainLog/>} />
                    </Routes>
                </UserProvider>
            </Router>
    </div>
  );
}

export default App;
