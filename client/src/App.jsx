import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import TestScore from './pages/TestScore';
import Attendance from './pages/Attendance';
import NoPage from './pages/NoPage';
import Navbar from './components/Navbar';
import Calendar from './pages/Calendar';
import TimeTable from './pages/TimeTable';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Expense from './pages/Expense';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
     
      <BrowserRouter>
     <Navbar/>
      <Routes>
      
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
          <Route path="/test" element={<TestScore />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/calendar" element={< Calendar />} />
          <Route path="/timetable" element={< TimeTable />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="*" element={<NoPage />} />
       
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
