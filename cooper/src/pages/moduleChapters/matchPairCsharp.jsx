import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import NavigationMenu from '../widget/navigationMenu'
import CelebrationBackground from '../../components/CelebrationBackground'
import './modules.css'

const csharpPairs = [
  { id: 1, term: "Main()", description: "Entry point where every C# program starts executing." },
  { id: 2, term: "Console.WriteLine()", description: "Prints text to the console and moves cursor to a new line." },
  { id: 3, term: "var", description: "Keyword that lets the compiler automatically infer the variable type." },
  { id: 4, term: "double", description: "Data type that stores a 64-bit decimal number." },
  { id: 5, term: "Console.ReadLine()", description: "Reads a line of text entered by the user as a string." },
  { id: 6, term: "% (modulo)", description: "Operator that returns the remainder after division." },
  { id: 7, term: ".Length", description: "Property that returns the number of characters in a string." },
  { id: 8, term: "break", description: "Exits a loop or switch case immediately." },
  { id: 9, term: "continue", description: "Skips the rest of the current iteration and jumps to the next." },
  { id: 10, term: "nums[0]", description: "Accesses the first element of an array (zero-indexed)." },
  { id: 11, term: "bool", description: "A type that can only hold true or false." },
  { id: 12, term: "Math", description: "Built-in class providing methods like Sqrt(), Abs(), and Max()." },
]

function MatchPairCsharp() {
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
    const shuffledTerms = [...csharpPairs].sort(() => Math.random() - 0.5)
    const shuffledDescriptions = [...csharpPairs].sort(() => Math.random() - 0.5)
    setTerms(shuffledTerms)
    setDescriptions(shuffledDescriptions)
  }, [])

  const handleTermClick = (item) => {
    if (correctMatches.has(item.id)) return

    if (selectedTerm?.id === item.id) {
      setSelectedTerm(null)
      setFlashEffect(null)
      return
    }

    setFlashEffect('selected')
    setTimeout(() => setFlashEffect(null), 400)
    setSelectedTerm(item)
  }

  const handleDescriptionClick = (desc) => {
    if (!selectedTerm) return
    if (correctMatches.has(desc.id)) return

    setAttempts(prev => prev + 1)

    if (selectedTerm.id === desc.id) {
      setFlashEffect('correct')
      setTimeout(() => setFlashEffect(null), 600)

      const newMatches = { ...matches, [selectedTerm.id]: desc.id }
      const newCorrect = new Set([...correctMatches, selectedTerm.id])
      setMatches(newMatches)
      setCorrectMatches(newCorrect)
      setScore(prev => prev + 1)
      setSelectedTerm(null)

      const newWrong = { ...wrongMatches }
      delete newWrong[selectedTerm.id]
      setWrongMatches(newWrong)

      if (newCorrect.size === csharpPairs.length) {
        const finalAttempts = attempts + 1
        const finalMistakes = mistakes
        setTimeout(() => {
          const currentScore = csharpPairs.length
          const currentAccuracy = ((currentScore / finalAttempts) * 100).toFixed(1)
          const saved = localStorage.getItem('quiz_matchpaircsharp')

          if (saved) {
            const data = JSON.parse(saved)
            const history = data.attemptHistory || []
            history.push({ score: currentScore, accuracy: parseFloat(currentAccuracy), mistakes: finalMistakes, date: new Date().toISOString() })
            const bestAccuracy = Math.max(...history.map(a => a.accuracy))
            localStorage.setItem('quiz_matchpaircsharp', JSON.stringify({
              score: currentScore, bestScore: currentScore,
              accuracy: parseFloat(currentAccuracy), bestAccuracy,
              mistakes: finalMistakes, total: csharpPairs.length,
              completed: true, attemptHistory: history, lastAttempt: new Date().toISOString()
            }))
          } else {
            localStorage.setItem('quiz_matchpaircsharp', JSON.stringify({
              score: currentScore, bestScore: currentScore,
              accuracy: parseFloat(currentAccuracy), bestAccuracy: parseFloat(currentAccuracy),
              mistakes: finalMistakes, total: csharpPairs.length,
              completed: true,
              attemptHistory: [{ score: currentScore, accuracy: parseFloat(currentAccuracy), mistakes: finalMistakes, date: new Date().toISOString() }],
              lastAttempt: new Date().toISOString()
            }))
          }

          setShowResult(true)
        }, 500)
      }
    } else {
      setFlashEffect('wrong')
      setTimeout(() => setFlashEffect(null), 600)
      setMistakes(prev => prev + 1)

      const termId = selectedTerm.id
      setWrongMatches(prev => ({ ...prev, [termId]: desc.id }))
      setTimeout(() => {
        setWrongMatches(prev => {
          const updated = { ...prev }
          delete updated[termId]
          return updated
        })
        setSelectedTerm(null)
      }, 1000)
    }
  }

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) setSelectedTerm(null)
  }

  const handleRestart = () => {
    setTerms([...csharpPairs].sort(() => Math.random() - 0.5))
    setDescriptions([...csharpPairs].sort(() => Math.random() - 0.5))
    setMatches({})
    setSelectedTerm(null)
    setCorrectMatches(new Set())
    setWrongMatches({})
    setScore(0)
    setShowResult(false)
    setAttempts(0)
    setMistakes(0)
  }

  if (showResult) {
    const accuracy = ((csharpPairs.length / attempts) * 100).toFixed(1)
    return (
      <>
        <NavigationMenu />
        <CelebrationBackground score={score} total={csharpPairs.length} />
        <div className="quiz-container">
          <div className="result-card">
            <h1>All Matched! 🎉</h1>
            <div className="score-display">
              <div className="score-number">{score}</div>
              <div className="score-total">out of {csharpPairs.length}</div>
            </div>
            <div className="score-percentage">
              {Math.round((score / csharpPairs.length) * 100)}%
            </div>
            <p style={{ color: '#888', fontSize: '1rem', marginTop: '1rem' }}>
              Accuracy: {accuracy}% • {attempts} attempts • {mistakes} mistake{mistakes !== 1 ? 's' : ''}
            </p>
            <div className="button-group">
              <button onClick={handleRestart} className="restart-button">Try Again</button>
              <a href="/" className="home-link">Back to Home</a>
            </div>
          </div>
        </div>
      </>
    )
  }

  const leftColumn = swapColumns ? descriptions : terms
  const rightColumn = swapColumns ? terms : descriptions

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavigationMenu />
      <div className="quiz-container">
        <div className="quiz-header">
          <h2>C# Concepts — Match Pairs</h2>
          <div className="progress-info">
            <span>Matched: {correctMatches.size}/{csharpPairs.length}</span>
            <span>Attempts: {attempts}</span>
          </div>
        </div>

        <div className="question-card" onClick={handleBackgroundClick}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <p style={{ color: '#888', fontSize: '0.95rem', margin: 0 }}>
              {swapColumns
                ? 'Click a description, then its matching term'
                : 'Click a term, then its matching description'}
            </p>
            <button
              onClick={() => setSwapColumns(!swapColumns)}
              style={{
                padding: '0.5rem 1rem',
                background: 'rgba(100, 108, 255, 0.1)',
                border: '1px solid rgba(100, 108, 255, 0.3)',
                borderRadius: '8px',
                color: '#646cff',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseOver={e => e.target.style.background = 'rgba(100, 108, 255, 0.2)'}
              onMouseOut={e => e.target.style.background = 'rgba(100, 108, 255, 0.1)'}
            >
              ⇄ Swap Columns
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
            {/* Left column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{ color: '#646cff', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '600', textAlign: 'center' }}>
                {swapColumns ? 'Descriptions' : 'Terms'}
              </h3>
              {leftColumn.map((item) => {
                const isSelected = selectedTerm?.id === item.id
                const isCorrect = correctMatches.has(item.id)
                const isWrong = wrongMatches[item.id] !== undefined

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => swapColumns ? handleDescriptionClick(item) : handleTermClick(item)}
                    className={`option-button ${isWrong ? 'wrong' : ''}`}
                    disabled={isCorrect}
                    animate={{
                      boxShadow: isSelected && flashEffect === 'selected'
                        ? ['0 0 0 0px rgba(251, 191, 36, 0)', '0 0 0 3px rgba(251, 191, 36, 0.8)', '0 0 0 0px rgba(251, 191, 36, 0)']
                        : '0 0 0 0px rgba(0,0,0,0)',
                      borderColor: isSelected ? '#fbbf24' : 'rgba(255,255,255,0.1)'
                    }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    style={{
                      height: '80px',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      fontSize: swapColumns ? '0.85rem' : '0.95rem',
                      fontWeight: swapColumns ? '400' : '600',
                      fontFamily: swapColumns ? 'inherit' : "'Consolas', 'Monaco', monospace",
                      padding: '0.75rem',
                      opacity: isCorrect ? 0.3 : 1
                    }}
                  >
                    {swapColumns ? item.description : item.term}
                  </motion.button>
                )
              })}
            </div>

            {/* Right column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{ color: '#646cff', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '600', textAlign: 'center' }}>
                {swapColumns ? 'Terms' : 'Descriptions'}
              </h3>
              {rightColumn.map((item) => {
                const isMatched = correctMatches.has(item.id)
                const isWrongTarget = Object.values(wrongMatches).includes(item.id)

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => swapColumns ? handleTermClick(item) : handleDescriptionClick(item)}
                    className={`option-button ${isWrongTarget ? 'wrong' : ''}`}
                    disabled={isMatched}
                    animate={{
                      boxShadow: flashEffect === 'correct' && Object.keys(matches).includes(String(item.id))
                        ? ['0 0 0 0px rgba(34,197,94,0)', '0 0 0 3px rgba(34,197,94,0.8)', '0 0 0 0px rgba(34,197,94,0)']
                        : flashEffect === 'wrong' && isWrongTarget
                          ? ['0 0 0 0px rgba(239,68,68,0)', '0 0 0 3px rgba(239,68,68,0.8)', '0 0 0 0px rgba(239,68,68,0)']
                          : '0 0 0 0px rgba(0,0,0,0)'
                    }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    style={{
                      height: '80px',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      fontSize: swapColumns ? '0.95rem' : '0.85rem',
                      fontWeight: swapColumns ? '600' : '400',
                      fontFamily: swapColumns ? "'Consolas', 'Monaco', monospace" : 'inherit',
                      padding: '0.75rem',
                      opacity: isMatched ? 0.3 : 1
                    }}
                  >
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

export default MatchPairCsharp
