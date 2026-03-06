import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import NavigationMenu from '../widget/navigationMenu'
import CelebrationBackground from '../../components/CelebrationBackground'
import './modules.css'

const operatorPairs = [
  { id: 1,  term: '==',                description: "Comparison — checks if two values are equal." },
  { id: 2,  term: '!=',                description: "Comparison — checks if two values are NOT equal." },
  { id: 3,  term: '>= / <=',           description: "Comparison — checks if a value is greater/less than or equal to another." },
  { id: 4,  term: '&&',                description: "Logical AND — true only when both conditions are true." },
  { id: 5,  term: '||',                description: "Logical OR — true when at least one condition is true." },
  { id: 6,  term: '!',                 description: "Logical NOT — inverts a boolean value (true becomes false)." },
  { id: 7,  term: '++',                description: "Increment — increases a variable's value by 1." },
  { id: 8,  term: '+=',                description: "Assignment — adds a value to a variable and stores the result back." },
  { id: 9,  term: 'const',             description: "Declares a variable whose value can never be changed after assignment." },
  { id: 10, term: '(int) x',           description: "Explicit cast — manually converts a value to the specified type." },
  { id: 11, term: 'int.Parse()',        description: "Converts a string to an integer; throws an error if the string is invalid." },
  { id: 12, term: 'Convert.ToInt32()', description: "Converts a value to a 32-bit integer, handling null safely." },
  { id: 13, term: '.ToString()',        description: "Converts any value to its string representation." },
  { id: 14, term: 'a ? b : c',         description: "Ternary operator — shorthand if-else: returns b if a is true, else c." },
]

function MatchPairOperators() {
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
    setTerms([...operatorPairs].sort(() => Math.random() - 0.5))
    setDescriptions([...operatorPairs].sort(() => Math.random() - 0.5))
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
      if (newCorrect.size === operatorPairs.length) {
        const fa = attempts + 1, fm = mistakes
        setTimeout(() => {
          const cs = operatorPairs.length, ca = ((cs / fa) * 100).toFixed(1)
          const saved = localStorage.getItem('quiz_matchpairoperators')
          if (saved) {
            const data = JSON.parse(saved), h = data.attemptHistory || []
            h.push({ score: cs, accuracy: parseFloat(ca), mistakes: fm, date: new Date().toISOString() })
            localStorage.setItem('quiz_matchpairoperators', JSON.stringify({ score: cs, bestScore: cs, accuracy: parseFloat(ca), bestAccuracy: Math.max(...h.map(a => a.accuracy)), mistakes: fm, total: operatorPairs.length, completed: true, attemptHistory: h, lastAttempt: new Date().toISOString() }))
          } else {
            localStorage.setItem('quiz_matchpairoperators', JSON.stringify({ score: cs, bestScore: cs, accuracy: parseFloat(ca), bestAccuracy: parseFloat(ca), mistakes: fm, total: operatorPairs.length, completed: true, attemptHistory: [{ score: cs, accuracy: parseFloat(ca), mistakes: fm, date: new Date().toISOString() }], lastAttempt: new Date().toISOString() }))
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
    setTerms([...operatorPairs].sort(() => Math.random() - 0.5)); setDescriptions([...operatorPairs].sort(() => Math.random() - 0.5))
    setMatches({}); setSelectedTerm(null); setCorrectMatches(new Set()); setWrongMatches({}); setScore(0); setShowResult(false); setAttempts(0); setMistakes(0)
  }

  if (showResult) {
    const accuracy = ((operatorPairs.length / attempts) * 100).toFixed(1)
    return (
      <><NavigationMenu /><CelebrationBackground score={score} total={operatorPairs.length} />
        <div className="quiz-container"><div className="result-card">
          <h1>All Matched! 🎉</h1>
          <div className="score-display"><div className="score-number">{score}</div><div className="score-total">out of {operatorPairs.length}</div></div>
          <div className="score-percentage">{Math.round((score / operatorPairs.length) * 100)}%</div>
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
          <h2>Operators &amp; Type Casting — Match Pairs</h2>
          <div className="progress-info"><span>Matched: {correctMatches.size}/{operatorPairs.length}</span><span>Attempts: {attempts}</span></div>
        </div>
        <div className="question-card" onClick={e => e.target === e.currentTarget && setSelectedTerm(null)}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <p style={{ color: '#888', fontSize: '0.95rem', margin: 0 }}>{swapColumns ? 'Click a description, then its matching syntax' : 'Click a syntax term, then its matching description'}</p>
            <button onClick={() => setSwapColumns(!swapColumns)} style={{ padding: '0.5rem 1rem', background: 'rgba(100,108,255,0.1)', border: '1px solid rgba(100,108,255,0.3)', borderRadius: '8px', color: '#646cff', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' }} onMouseOver={e => e.target.style.background = 'rgba(100,108,255,0.2)'} onMouseOut={e => e.target.style.background = 'rgba(100,108,255,0.1)'}>⇄ Swap Columns</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <h3 style={{ color: '#646cff', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '600', textAlign: 'center' }}>{swapColumns ? 'Descriptions' : 'Syntax'}</h3>
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
              <h3 style={{ color: '#646cff', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '600', textAlign: 'center' }}>{swapColumns ? 'Syntax' : 'Descriptions'}</h3>
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

export default MatchPairOperators
