import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Schedule from './components/Schedule';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Schedule />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
