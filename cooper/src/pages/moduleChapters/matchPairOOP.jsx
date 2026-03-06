import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import NavigationMenu from '../widget/navigationMenu'
import CelebrationBackground from '../../components/CelebrationBackground'
import './modules.css'

const oopPairs = [
  { id: 1,  term: ': ParentClass',    description: "C# syntax for inheriting from another class (e.g. class Dog : Animal)." },
  { id: 2,  term: 'virtual',          description: "Marks a parent method that child classes are allowed to override." },
  { id: 3,  term: 'override',         description: "Redefines a virtual method from the parent class in the child class." },
  { id: 4,  term: 'base',             description: "Refers to the parent class — used to call its constructor or methods." },
  { id: 5,  term: 'abstract class',   description: "Cannot be instantiated directly; forces subclasses to implement its abstract members." },
  { id: 6,  term: 'interface',        description: "A contract of method signatures that a class must implement, with no body." },
  { id: 7,  term: 'enum',             description: "A named set of constant integer values (e.g. Days.Monday)." },
  { id: 8,  term: 'get; set;',        description: "Auto-property shorthand for reading and writing a class field." },
  { id: 9,  term: 'protected',        description: "Accessible inside the same class and by any subclass, but not from outside." },
  { id: 10, term: 'sealed',           description: "Prevents a class from being further subclassed (no inheritance allowed)." },
  { id: 11, term: 'Constructor',      description: "A special method with the same name as the class, called automatically when an object is created." },
  { id: 12, term: 'throw',            description: "Manually raises an exception to signal that something went wrong." },
  { id: 13, term: 'finally',          description: "A block that always runs after try/catch, regardless of whether an exception occurred." },
  { id: 14, term: 'is',               description: "Checks whether an object is an instance of a specific type (returns bool)." },
]

function MatchPairOOP() {
  const [terms, setTerms] = useState([])
  const [descriptions, setDescriptions] = useState([])
  const [selectedTerm, setSelectedTerm] = useState(null)
  const [correctMatches, setCorrectMatches] = useState(new Set())
  const [wrongMatches, setWrongMatches] = useState({})
  const [matches, setMatches] = useState({})
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [swapColumns, setSwapColumns] = useState(false)
  const [flashEffect, setFlashEffect] = useState(null)

  useEffect(() => {
    setTerms([...oopPairs].sort(() => Math.random() - 0.5))
    setDescriptions([...oopPairs].sort(() => Math.random() - 0.5))
  }, [])

  const handleTermClick = (item) => {
    if (correctMatches.has(item.id)) return
    if (selectedTerm?.id === item.id) { setSelectedTerm(null); setFlashEffect(null); return }
    setFlashEffect('selected'); setTimeout(() => setFlashEffect(null), 400); setSelectedTerm(item)
  }

  const handleDescriptionClick = (desc) => {
    if (!selectedTerm || correctMatches.has(desc.id)) return
    setAttempts(prev => prev + 1)
    if (selectedTerm.id === desc.id) {
      setFlashEffect('correct'); setTimeout(() => setFlashEffect(null), 600)
      const newMatches = { ...matches, [selectedTerm.id]: desc.id }
      const newCorrect = new Set([...correctMatches, selectedTerm.id])
      setMatches(newMatches); setCorrectMatches(newCorrect); setScore(prev => prev + 1); setSelectedTerm(null)
      const newWrong = { ...wrongMatches }; delete newWrong[selectedTerm.id]; setWrongMatches(newWrong)
      if (newCorrect.size === oopPairs.length) {
        const fa = attempts + 1, fm = mistakes
        setTimeout(() => {
          const cs = oopPairs.length, ca = ((cs / fa) * 100).toFixed(1)
          const saved = localStorage.getItem('quiz_matchpairoop')
          if (saved) {
            const data = JSON.parse(saved), h = data.attemptHistory || []
            h.push({ score: cs, accuracy: parseFloat(ca), mistakes: fm, date: new Date().toISOString() })
            localStorage.setItem('quiz_matchpairoop', JSON.stringify({ score: cs, bestScore: cs, accuracy: parseFloat(ca), bestAccuracy: Math.max(...h.map(a => a.accuracy)), mistakes: fm, total: oopPairs.length, completed: true, attemptHistory: h, lastAttempt: new Date().toISOString() }))
          } else {
            localStorage.setItem('quiz_matchpairoop', JSON.stringify({ score: cs, bestScore: cs, accuracy: parseFloat(ca), bestAccuracy: parseFloat(ca), mistakes: fm, total: oopPairs.length, completed: true, attemptHistory: [{ score: cs, accuracy: parseFloat(ca), mistakes: fm, date: new Date().toISOString() }], lastAttempt: new Date().toISOString() }))
          }
          setShowResult(true)
        }, 500)
      }
    } else {
      setFlashEffect('wrong'); setTimeout(() => setFlashEffect(null), 600); setMistakes(prev => prev + 1)
      const tid = selectedTerm.id
      setWrongMatches(prev => ({ ...prev, [tid]: desc.id }))
      setTimeout(() => { setWrongMatches(prev => { const u = { ...prev }; delete u[tid]; return u }); setSelectedTerm(null) }, 1000)
    }
  }

  const handleRestart = () => {
    setTerms([...oopPairs].sort(() => Math.random() - 0.5)); setDescriptions([...oopPairs].sort(() => Math.random() - 0.5))
    setMatches({}); setSelectedTerm(null); setCorrectMatches(new Set()); setWrongMatches({}); setScore(0); setShowResult(false); setAttempts(0); setMistakes(0)
  }

  if (showResult) {
    const accuracy = ((oopPairs.length / attempts) * 100).toFixed(1)
    return (
      <><NavigationMenu /><CelebrationBackground score={score} total={oopPairs.length} />
        <div className="quiz-container"><div className="result-card">
          <h1>All Matched! 🎉</h1>
          <div className="score-display"><div className="score-number">{score}</div><div className="score-total">out of {oopPairs.length}</div></div>
          <div className="score-percentage">{Math.round((score / oopPairs.length) * 100)}%</div>
          <p style={{ color: '#888', fontSize: '1rem', marginTop: '1rem' }}>Accuracy: {accuracy}% • {attempts} attempts • {mistakes} mistake{mistakes !== 1 ? 's' : ''}</p>
          <div className="button-group"><button onClick={handleRestart} className="restart-button">Try Again</button><a href="/" className="home-link">Back to Home</a></div>
        </div></div>
      </>
    )
  }

  const leftColumn = swapColumns ? descriptions : terms
  const rightColumn = swapColumns ? terms : descriptions

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <NavigationMenu />
      <div className="quiz-container">
        <div className="quiz-header">
          <h2>OOP Concepts — Match Pairs</h2>
          <div className="progress-info"><span>Matched: {correctMatches.size}/{oopPairs.length}</span><span>Attempts: {attempts}</span></div>
        </div>
        <div className="question-card" onClick={e => e.target === e.currentTarget && setSelectedTerm(null)}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <p style={{ color: '#888', fontSize: '0.95rem', margin: 0 }}>{swapColumns ? 'Click a description, then its matching keyword' : 'Click a keyword, then its matching description'}</p>
            <button onClick={() => setSwapColumns(!swapColumns)} style={{ padding: '0.5rem 1rem', background: 'rgba(100,108,255,0.1)', border: '1px solid rgba(100,108,255,0.3)', borderRadius: '8px', color: '#646cff', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' }} onMouseOver={e => e.target.style.background = 'rgba(100,108,255,0.2)'} onMouseOut={e => e.target.style.background = 'rgba(100,108,255,0.1)'}>⇄ Swap Columns</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <h3 style={{ color: '#646cff', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '600', textAlign: 'center' }}>{swapColumns ? 'Descriptions' : 'Keywords'}</h3>
              {leftColumn.map(item => {
                const isSelected = selectedTerm?.id === item.id, isCorrect = correctMatches.has(item.id), isWrong = wrongMatches[item.id] !== undefined
                return (
                  <motion.button key={item.id} onClick={() => swapColumns ? handleDescriptionClick(item) : handleTermClick(item)} className={`option-button ${isWrong ? 'wrong' : ''}`} disabled={isCorrect}
                    animate={{ boxShadow: isSelected && flashEffect === 'selected' ? ['0 0 0 0px rgba(251,191,36,0)', '0 0 0 3px rgba(251,191,36,0.8)', '0 0 0 0px rgba(251,191,36,0)'] : '0 0 0 0px rgba(0,0,0,0)', borderColor: isSelected ? '#fbbf24' : 'rgba(255,255,255,0.1)' }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    style={{ height: '64px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: swapColumns ? '0.8rem' : '0.9rem', fontWeight: swapColumns ? '400' : '600', fontFamily: swapColumns ? 'inherit' : "'Consolas','Monaco',monospace", padding: '0.5rem', opacity: isCorrect ? 0.3 : 1 }}>
                    {swapColumns ? item.description : item.term}
                  </motion.button>
                )
              })}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <h3 style={{ color: '#646cff', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '600', textAlign: 'center' }}>{swapColumns ? 'Keywords' : 'Descriptions'}</h3>
              {rightColumn.map(item => {
                const isMatched = correctMatches.has(item.id), isWrongTarget = Object.values(wrongMatches).includes(item.id)
                return (
                  <motion.button key={item.id} onClick={() => swapColumns ? handleTermClick(item) : handleDescriptionClick(item)} className={`option-button ${isWrongTarget ? 'wrong' : ''}`} disabled={isMatched}
                    animate={{ boxShadow: flashEffect === 'correct' && Object.keys(matches).includes(String(item.id)) ? ['0 0 0 0px rgba(34,197,94,0)', '0 0 0 3px rgba(34,197,94,0.8)', '0 0 0 0px rgba(34,197,94,0)'] : flashEffect === 'wrong' && isWrongTarget ? ['0 0 0 0px rgba(239,68,68,0)', '0 0 0 3px rgba(239,68,68,0.8)', '0 0 0 0px rgba(239,68,68,0)'] : '0 0 0 0px rgba(0,0,0,0)' }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    style={{ height: '64px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: swapColumns ? '0.9rem' : '0.8rem', fontWeight: swapColumns ? '600' : '400', fontFamily: swapColumns ? "'Consolas','Monaco',monospace" : 'inherit', padding: '0.5rem', opacity: isMatched ? 0.3 : 1 }}>
                    {swapColumns ? item.term : item.description}
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default MatchPairOOP
