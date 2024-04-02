import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import TestScore from './pages/TestScore';
import Attendance from './pages/Attendance';
import NoPage from './pages/NoPage';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
          <Route path="/test" element={<TestScore />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="*" element={<NoPage />} />
       
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
