import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import NavigationMenu from '../widget/navigationMenu'
import CelebrationBackground from '../../components/CelebrationBackground'
import './modules.css'

const arrayListPairs = [
  { id: 1,  term: "int[] nums",          description: "Declares a variable that holds a fixed-size array of integers." },
  { id: 2,  term: "new int[5]",          description: "Allocates an array with exactly 5 slots, all set to 0 by default." },
  { id: 3,  term: "nums.Length",         description: "Property that returns the total number of elements in an array." },
  { id: 4,  term: "nums[i]",             description: "Accesses the element at index i in the array (zero-based)." },
  { id: 5,  term: "Array.Sort(nums)",    description: "Sorts all elements in an array in ascending order." },
  { id: 6,  term: "Array.Reverse(nums)", description: "Reverses the order of all elements in an array." },
  { id: 7,  term: "List<int>",           description: "A dynamic collection of integers that can grow or shrink at runtime." },
  { id: 8,  term: ".Add(item)",          description: "Appends an element to the end of a list." },
  { id: 9,  term: ".Remove(item)",       description: "Removes the first occurrence of a value from a list." },
  { id: 10, term: ".Contains(item)",     description: "Returns true if the specified value exists in the list." },
  { id: 11, term: ".Count",              description: "Returns the number of elements currently in a list." },
  { id: 12, term: ".Clear()",            description: "Removes all elements from a list, leaving it empty." },
  { id: 13, term: ".Insert(i, item)",    description: "Inserts an element at a specific index, shifting the rest right." },
  { id: 14, term: ".IndexOf(item)",      description: "Returns the index of the first matching element, or -1 if not found." },
]

function MatchPairArrayList() {
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
    setTerms([...arrayListPairs].sort(() => Math.random() - 0.5))
    setDescriptions([...arrayListPairs].sort(() => Math.random() - 0.5))
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

      if (newCorrect.size === arrayListPairs.length) {
        const finalAttempts = attempts + 1
        const finalMistakes = mistakes
        setTimeout(() => {
          const currentScore = arrayListPairs.length
          const currentAccuracy = ((currentScore / finalAttempts) * 100).toFixed(1)
          const saved = localStorage.getItem('quiz_matchpairarraylist')

          if (saved) {
            const data = JSON.parse(saved)
            const history = data.attemptHistory || []
            history.push({ score: currentScore, accuracy: parseFloat(currentAccuracy), mistakes: finalMistakes, date: new Date().toISOString() })
            const bestAccuracy = Math.max(...history.map(a => a.accuracy))
            localStorage.setItem('quiz_matchpairarraylist', JSON.stringify({
              score: currentScore, bestScore: currentScore,
              accuracy: parseFloat(currentAccuracy), bestAccuracy,
              mistakes: finalMistakes, total: arrayListPairs.length,
              completed: true, attemptHistory: history, lastAttempt: new Date().toISOString()
            }))
          } else {
            localStorage.setItem('quiz_matchpairarraylist', JSON.stringify({
              score: currentScore, bestScore: currentScore,
              accuracy: parseFloat(currentAccuracy), bestAccuracy: parseFloat(currentAccuracy),
              mistakes: finalMistakes, total: arrayListPairs.length,
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
    setTerms([...arrayListPairs].sort(() => Math.random() - 0.5))
    setDescriptions([...arrayListPairs].sort(() => Math.random() - 0.5))
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
    const accuracy = ((arrayListPairs.length / attempts) * 100).toFixed(1)
    return (
      <>
        <NavigationMenu />
        <CelebrationBackground score={score} total={arrayListPairs.length} />
        <div className="quiz-container">
          <div className="result-card">
            <h1>All Matched! 🎉</h1>
            <div className="score-display">
              <div className="score-number">{score}</div>
              <div className="score-total">out of {arrayListPairs.length}</div>
            </div>
            <div className="score-percentage">
              {Math.round((score / arrayListPairs.length) * 100)}%
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
          <h2>Arrays &amp; Lists — Match Pairs</h2>
          <div className="progress-info">
            <span>Matched: {correctMatches.size}/{arrayListPairs.length}</span>
            <span>Attempts: {attempts}</span>
          </div>
        </div>

        <div className="question-card" onClick={handleBackgroundClick}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <p style={{ color: '#888', fontSize: '0.95rem', margin: 0 }}>
              {swapColumns
                ? 'Click a description, then its matching syntax'
                : 'Click a syntax term, then its matching description'}
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <h3 style={{ color: '#646cff', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '600', textAlign: 'center' }}>
                {swapColumns ? 'Descriptions' : 'Syntax'}
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
                        ? ['0 0 0 0px rgba(251,191,36,0)', '0 0 0 3px rgba(251,191,36,0.8)', '0 0 0 0px rgba(251,191,36,0)']
                        : '0 0 0 0px rgba(0,0,0,0)',
                      borderColor: isSelected ? '#fbbf24' : 'rgba(255,255,255,0.1)'
                    }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    style={{
                      height: '64px',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      fontSize: swapColumns ? '0.8rem' : '0.9rem',
                      fontWeight: swapColumns ? '400' : '600',
                      fontFamily: swapColumns ? 'inherit' : "'Consolas', 'Monaco', monospace",
                      padding: '0.5rem',
                      opacity: isCorrect ? 0.3 : 1
                    }}
                  >
                    {swapColumns ? item.description : item.term}
                  </motion.button>
                )
              })}
            </div>

            {/* Right column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <h3 style={{ color: '#646cff', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '600', textAlign: 'center' }}>
                {swapColumns ? 'Syntax' : 'Descriptions'}
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
                      height: '64px',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      fontSize: swapColumns ? '0.9rem' : '0.8rem',
                      fontWeight: swapColumns ? '600' : '400',
                      fontFamily: swapColumns ? "'Consolas', 'Monaco', monospace" : 'inherit',
                      padding: '0.5rem',
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

export default MatchPairArrayList
