import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Student from './components/Student';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="/" element={<Login />} /> */}
        {/* <Route path="/dashboard/student" component={Student} /> qeshtu duhet mu bo mbasi e lidh log in me student po nihere po e ndreqim faqen e student */}
        <Route exact path="/" element={<Student />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;