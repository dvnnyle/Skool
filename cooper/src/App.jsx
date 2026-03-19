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
import CsharpBasics from './pages/moduleChapters/csharpBasics'
import CsharpLevel1 from './pages/moduleChapters/csharpLevel1'
import CsharpLevel2 from './pages/moduleChapters/csharpLevel2'
import CsharpLevel3 from './pages/moduleChapters/csharpLevel3'
import MatchPairCsharp from './pages/moduleChapters/matchPairCsharp'
import MatchPairCsharpKeywords from './pages/moduleChapters/matchPairCsharpKeywords'
import MatchPairArrayList from './pages/moduleChapters/matchPairArrayList'
import MatchPairStrings from './pages/moduleChapters/matchPairStrings'
import MatchPairOperators from './pages/moduleChapters/matchPairOperators'
import MatchPairOOP from './pages/moduleChapters/matchPairOOP'
import UniSystemCode from './pages/UniSystemCode'
import UniStudent from './pages/moduleChapters/uniStudent'
import UniAnsatt from './pages/moduleChapters/uniAnsatt'
import UniBok from './pages/moduleChapters/uniBok'
import UniKurs from './pages/moduleChapters/uniKurs'
import UniLan from './pages/moduleChapters/uniLan'
import UniKursSystem from './pages/moduleChapters/uniKursSystem'
import UniBibliotekSystem from './pages/moduleChapters/uniBibliotekSystem'
import UniProgram from './pages/moduleChapters/uniProgram'
import UniAnsattTheory from './pages/moduleChapters/uniAnsattTheory'
import UniStudentTheory from './pages/moduleChapters/uniStudentTheory'
import UniBokTheory from './pages/moduleChapters/uniBokTheory'
import UniLanTheory from './pages/moduleChapters/uniLanTheory'
import UniKursTheory from './pages/moduleChapters/uniKursTheory'

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
        <Route path="/csharp-basics" element={<CsharpBasics key="csharp-basics" />} />
        <Route path="/csharp-level1" element={<CsharpLevel1 key="csharp-level1" />} />
        <Route path="/csharp-level2" element={<CsharpLevel2 key="csharp-level2" />} />
        <Route path="/csharp-level3" element={<CsharpLevel3 key="csharp-level3" />} />
        <Route path="/match-pair-csharp" element={<MatchPairCsharp key="match-pair-csharp" />} />
        <Route path="/match-pair-csharp-keywords" element={<MatchPairCsharpKeywords key="match-pair-csharp-keywords" />} />
        <Route path="/match-pair-array-list" element={<MatchPairArrayList key="match-pair-array-list" />} />
        <Route path="/match-pair-strings" element={<MatchPairStrings key="match-pair-strings" />} />
        <Route path="/match-pair-operators" element={<MatchPairOperators key="match-pair-operators" />} />
        <Route path="/match-pair-oop" element={<MatchPairOOP key="match-pair-oop" />} />
        <Route path="/unisystem" element={<UniSystemCode key="unisystem" />} />
        <Route path="/uni-student" element={<UniStudent key="uni-student" />} />
        <Route path="/uni-ansatt" element={<UniAnsatt key="uni-ansatt" />} />
        <Route path="/uni-bok" element={<UniBok key="uni-bok" />} />
        <Route path="/uni-kurs" element={<UniKurs key="uni-kurs" />} />
        <Route path="/uni-lan" element={<UniLan key="uni-lan" />} />
        <Route path="/uni-kurs-system" element={<UniKursSystem key="uni-kurs-system" />} />
        <Route path="/uni-bibliotek-system" element={<UniBibliotekSystem key="uni-bibliotek-system" />} />
        <Route path="/uni-program" element={<UniProgram key="uni-program" />} />
        <Route path="/uni-ansatt-theory" element={<UniAnsattTheory key="uni-ansatt-theory" />} />
        <Route path="/uni-student-theory" element={<UniStudentTheory key="uni-student-theory" />} />
        <Route path="/uni-bok-theory" element={<UniBokTheory key="uni-bok-theory" />} />
        <Route path="/uni-lan-theory" element={<UniLanTheory key="uni-lan-theory" />} />
        <Route path="/uni-kurs-theory" element={<UniKursTheory key="uni-kurs-theory" />} />
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
