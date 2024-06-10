import React from 'react';
import './App.css'
import VideoList from './components/VideoList';
import Admin from './components/Admin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin/>} />
        <Route path="/" exact element={<VideoList/>} />
      </Routes>
    </Router>
  );
}

export default App;
