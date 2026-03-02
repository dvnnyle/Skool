import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Statistics from './pages/Statistics'
import LearnCSharp from './pages/learnCSharp'
import F1 from './pages/moduleChapters/f1'
import F2 from './pages/moduleChapters/f2'
import F3 from './pages/moduleChapters/f3'
import F4 from './pages/moduleChapters/f4'
import F5 from './pages/moduleChapters/f5'
import F6 from './pages/moduleChapters/f6'
import F7 from './pages/moduleChapters/f7'
import UniSystemCode from './pages/UniSystemCode'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home key="home" />} />
        <Route path="/home" element={<Home key="home2" />} />
        <Route path="/statistics" element={<Statistics key="stats" />} />
        <Route path="/learn-csharp" element={<LearnCSharp key="csharp" />} />
        <Route path="/f1" element={<F1 key="f1" />} />
        <Route path="/f2" element={<F2 key="f2" />} />
        <Route path="/f3" element={<F3 key="f3" />} />
        <Route path="/f4" element={<F4 key="f4" />} />
        <Route path="/f5" element={<F5 key="f5" />} />
        <Route path="/f6" element={<F6 key="f6" />} />
        <Route path="/f7" element={<F7 key="f7" />} />
        <Route path="/unisystem" element={<UniSystemCode key="unisystem" />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App
