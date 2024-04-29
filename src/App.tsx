import React,{useState} from 'react';
import Main_Board from './components/Main_Board';
import { UserProvider } from "./components/userContext";
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Room from './components/page';
import Authen from './components/cloak_test';





function App() {
  return (
    <div className="App">
      <Router>
                <UserProvider>
                    <Routes>
                    <Route path="/" element={<Authen/>}/>
                    <Route path="/board" element={<Main_Board/>} />
                    <Route path="/auth" element={<Room/>}/>
                    </Routes>
                </UserProvider>
            </Router>
    </div>
  );
}

export default App;
