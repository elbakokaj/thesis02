import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Student from './components/Student';
import Admin from './components/Admin';
import Professor from './components/Professor';
import ForgetPassword from './components/ForgetPassword';
import 'chart.js/auto';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={<Student />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route path="/professor" element={<Professor />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;