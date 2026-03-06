import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import NavigationMenu from './widget/navigationMenu'
import Footer from './widget/footer'
import './Statistics.css'

const ALL_CHAPTERS = [
  { id: 'f1', name: 'F1: OOP & C# Basics', total: 22, group: 'Lectures' },
  { id: 'f2', name: 'F2: Scope & Refactoring', total: 14, group: 'Lectures' },
  { id: 'f3', name: 'F3: Inheritance & Polymorphism', total: 20, group: 'Lectures' },
  { id: 'f4', name: 'F4: Abstract & Interfaces', total: 22, group: 'Lectures' },
  { id: 'f5', name: 'F5: Access Modifiers & Sealed', total: 18, group: 'Lectures' },
  { id: 'f6', name: 'F6: C# Grunnleggende', total: 25, group: 'Basics' },
  { id: 'f7', name: 'F7: UniSystem', total: 31, group: 'Basics' },
  { id: 'csharpBasics', name: 'C# Basics: Beginner P1', total: 15, group: 'C# Basics' },
  { id: 'csharpLevel1', name: 'Level 1: Syntax, Vars & Loops', total: 17, group: 'Learning Path' },
  { id: 'csharpLevel2', name: 'Level 2: Methods', total: 15, group: 'Learning Path' },
  { id: 'csharpLevel3', name: 'Level 3: OOP & Classes', total: 15, group: 'Learning Path' },
  { id: 'matchpaircsharp', name: 'Match: Concepts', total: 12, group: 'Match Pairs' },
  { id: 'matchpaircsharpkeywords', name: 'Match: Keywords', total: 18, group: 'Match Pairs' },
  { id: 'matchpairarraylist', name: 'Match: Arrays & Lists', total: 14, group: 'Match Pairs' },
  { id: 'matchpairstrings', name: 'Match: Strings', total: 12, group: 'Match Pairs' },
  { id: 'matchpairoperators', name: 'Match: Operators', total: 14, group: 'Match Pairs' },
  { id: 'matchpairoop', name: 'Match: OOP', total: 14, group: 'Match Pairs' },
]

function loadChapterProgress() {
  return ALL_CHAPTERS.map(chapter => {
    const savedData = localStorage.getItem(`quiz_${chapter.id}`)
    if (savedData) {
      const data = JSON.parse(savedData)
      const attemptHistory = data.attemptHistory || []
      return {
        ...chapter,
        lastScore: data.lastScore ?? data.score ?? 0,
        attempts: attemptHistory.length,
        bestScore: data.bestScore || 0,
        totalCorrectAllAttempts: attemptHistory.reduce((sum, att) => sum + (att.score || 0), 0),
        attemptHistory,
      }
    }
    return { ...chapter, lastScore: 0, attempts: 0, bestScore: 0, totalCorrectAllAttempts: 0, attemptHistory: [] }
  })
}

function Statistics() {
  const [chapterProgress, setChapterProgress] = useState([])

  useEffect(() => {
    setChapterProgress(loadChapterProgress())
  }, [])

  const totalQuestions = ALL_CHAPTERS.reduce((sum, ch) => sum + ch.total, 0)
  const completedChapters = chapterProgress.filter(ch => ch.attempts > 0).length
  const totalCorrectLastAttempt = chapterProgress.reduce((sum, ch) => sum + ch.lastScore, 0)
  const totalCorrectAllAttempts = chapterProgress.reduce((sum, ch) => sum + ch.totalCorrectAllAttempts, 0)
  const totalQuestionsAttempted = chapterProgress.filter(ch => ch.attempts > 0).reduce((sum, ch) => sum + ch.total, 0)
  const accuracyPercentage = totalQuestionsAttempted > 0
    ? ((totalCorrectLastAttempt / totalQuestionsAttempted) * 100).toFixed(1)
    : 0

  const getGradientColor = (percentage) => {
    if (percentage >= 80) return 'linear-gradient(180deg, #22c55e, #16a34a)'
    if (percentage >= 60) return 'linear-gradient(180deg, #84cc16, #65a30d)'
    if (percentage >= 40) return 'linear-gradient(180deg, #fbbf24, #f59e0b)'
    if (percentage >= 20) return 'linear-gradient(180deg, #fb923c, #f97316)'
    return 'linear-gradient(180deg, #ef4444, #dc2626)'
  }

  const groups = ['Lectures', 'Basics', 'Learning Path', 'C# Basics', 'Match Pairs']

  const handleReset = () => {
    if (confirm('Reset ALL quiz statistics? This cannot be undone.')) {
      ALL_CHAPTERS.forEach(ch => localStorage.removeItem(`quiz_${ch.id}`))
      setChapterProgress(loadChapterProgress())
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <NavigationMenu />
      <div className="statistics-container">
        <div className="stats-header">
          <h1>📊 Your Statistics</h1>
          <p>Track your progress across all {ALL_CHAPTERS.length} quizzes</p>
        </div>

        <div className="stats-overview">
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-content">
              <div className="stat-value">{completedChapters}/{ALL_CHAPTERS.length}</div>
              <div className="stat-label">Quizzes Attempted</div>
              <div className="stat-sublabel">{totalQuestions} questions total</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-value">{totalCorrectLastAttempt}</div>
              <div className="stat-label">Correct (Last Attempt)</div>
              <div className="stat-sublabel">{accuracyPercentage}% accuracy</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <div className="stat-value">{totalCorrectAllAttempts}</div>
              <div className="stat-label">Total Correct (All Attempts)</div>
              <div className="stat-sublabel">counts toward medals</div>
            </div>
          </div>
        </div>

        {groups.map(group => {
          const chapters = chapterProgress.filter(ch => ch.group === group)
          return (
            <div key={group} className="chapter-stats">
              <h2>📚 {group}</h2>
              <div className="bar-graph-container">
                {chapters.map(chapter => (
                  <div key={chapter.id} className="bar-graph-item">
                    <div className="bar-graph-label">
                      <span className="chapter-name">{chapter.name}</span>
                      <span className="chapter-score">
                        {chapter.attempts > 0 ? `${chapter.attempts} attempt${chapter.attempts > 1 ? 's' : ''}` : 'Not started'}
                      </span>
                    </div>
                    {chapter.attemptHistory.length > 0 ? (
                      <div className="attempts-graph">
                        {[...chapter.attemptHistory].reverse().map((attempt, reverseIndex) => {
                          const index = chapter.attemptHistory.length - 1 - reverseIndex
                          const percentage = (attempt.score / chapter.total) * 100
                          return (
                            <div key={index} className="attempt-bar-wrapper">
                              <span className="attempt-percentage">{percentage.toFixed(0)}%</span>
                              <div className="attempt-bar-container">
                                <div className="attempt-bar" style={{ height: `${percentage}%`, background: getGradientColor(percentage) }} />
                              </div>
                              <div className="attempt-label">
                                <span className="attempt-number">#{index + 1}</span>
                                <span className="attempt-score">{attempt.score}/{chapter.total}</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="no-attempts"><p>No attempts yet. Start the quiz to see your progress!</p></div>
                    )}
                    <div className="bar-graph-stats">
                      {chapter.attempts > 0 && (
                        <>
                          <span>Best: {chapter.bestScore}/{chapter.total} ({((chapter.bestScore / chapter.total) * 100).toFixed(0)}%)</span>
                          <span>Avg: {(chapter.attemptHistory.reduce((sum, att) => sum + att.score, 0) / chapter.attemptHistory.length / chapter.total * 100).toFixed(0)}%</span>
                          <span>Latest: {chapter.lastScore}/{chapter.total}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        <div className="chapter-stats">
          <h2>Detailed Progress</h2>
          <div className="chapter-stats-list">
            {chapterProgress.map(chapter => (
              <div key={chapter.id} className="chapter-stat-card">
                <div className="chapter-stat-header">
                  <h3>{chapter.name}</h3>
                  <span className="chapter-stat-score">
                    {chapter.attempts > 0
                      ? `${chapter.lastScore}/${chapter.total} (${((chapter.lastScore / chapter.total) * 100).toFixed(0)}%)`
                      : 'Not started'}
                  </span>
                </div>
                <div className="chapter-progress-bar">
                  <div className="chapter-progress-fill" style={{ width: `${(chapter.lastScore / chapter.total) * 100}%` }} />
                </div>
                <div className="chapter-stat-info">
                  <span>Total: {chapter.total} questions</span>
                  {chapter.attempts > 0 && (
                    <span className="chapter-accuracy">{chapter.attempts} attempt{chapter.attempts > 1 ? 's' : ''}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-actions">
          <a href="/" className="stats-button primary">Continue Learning</a>
          <button className="stats-button secondary" onClick={handleReset}>Reset All Statistics</button>
        </div>
      </div>
      <Footer />
    </motion.div>
  )
}

export default Statistics
