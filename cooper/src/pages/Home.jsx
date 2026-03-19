import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import '../App.css'
import './Home.css'
import NavigationMenu from './widget/navigationMenu'
import CustomMenu from './widget/customMenu'
import Footer from './widget/footer'

const ROADS = [
  {
    id: 'road1', label: 'Road 1', subtitle: 'C# Foundations',
    stages: [
      { name: 'Foundations', icon: '🌱', color: '#10b981', steps: [
        { key: 'csharpBasics', to: '/csharp-basics', title: 'Beginner P1' },
        { key: 'csharpLevel1', to: '/csharp-level1', title: 'Level 1' },
        { key: 'matchpaircsharp', to: '/match-pair-csharp', title: 'Match: Concepts' },
        { key: 'matchpaircsharpkeywords', to: '/match-pair-csharp-keywords', title: 'Match: Keywords' },
      ]},
      { name: 'Core Skills', icon: '⚡', color: '#646cff', steps: [
        { key: 'f1', to: '/f1', title: 'F1 Quiz' },
        { key: 'csharpLevel2', to: '/csharp-level2', title: 'Level 2' },
        { key: 'matchpairstrings', to: '/match-pair-strings', title: 'Match: Strings' },
        { key: 'matchpairoperators', to: '/match-pair-operators', title: 'Match: Ops' },
      ]},
      { name: 'Collections', icon: '📦', color: '#f59e0b', steps: [
        { key: 'f2', to: '/f2', title: 'F2 Quiz' },
        { key: 'f3', to: '/f3', title: 'F3 Quiz' },
        { key: 'matchpairarraylist', to: '/match-pair-array-list', title: 'Match: Arrays' },
        { key: 'f4', to: '/f4', title: 'F4 Quiz' },
      ]},
      { name: 'Advanced OOP', icon: '🏆', color: '#ef4444', steps: [
        { key: 'csharpLevel3', to: '/csharp-level3', title: 'Level 3' },
        { key: 'matchpairoop', to: '/match-pair-oop', title: 'Match: OOP' },
        { key: 'f5', to: '/f5', title: 'F5 Quiz' },
      ]},
    ]
  },
  {
    id: 'road2', label: 'Road 2', subtitle: 'Methods & Strings',
    stages: [
      { name: 'Methods', icon: '⚙️', color: '#3b82f6', steps: [
        { key: 'csharpLevel2', to: '/csharp-level2', title: 'Level 2' },
        { key: 'matchpairstrings', to: '/match-pair-strings', title: 'Match: Strings' },
        { key: 'f2', to: '/f2', title: 'F2 Quiz' },
      ]},
      { name: 'Operators', icon: '🔧', color: '#8b5cf6', steps: [
        { key: 'matchpairoperators', to: '/match-pair-operators', title: 'Match: Ops' },
        { key: 'csharpBasics', to: '/csharp-basics', title: 'Beginner' },
        { key: 'matchpaircsharpkeywords', to: '/match-pair-csharp-keywords', title: 'Match: Keys' },
      ]},
    ]
  },
  {
    id: 'road3', label: 'Road 3', subtitle: 'Loops & Collections',
    stages: [
      { name: 'Loops', icon: '🔄', color: '#f59e0b', steps: [
        { key: 'csharpLevel1', to: '/csharp-level1', title: 'Level 1' },
        { key: 'matchpairarraylist', to: '/match-pair-array-list', title: 'Match: Arrays' },
        { key: 'f4', to: '/f4', title: 'F4 Quiz' },
      ]},
      { name: 'Strings & Data', icon: '📊', color: '#10b981', steps: [
        { key: 'matchpairstrings', to: '/match-pair-strings', title: 'Match: Strings' },
        { key: 'f3', to: '/f3', title: 'F3 Quiz' },
        { key: 'matchpairoperators', to: '/match-pair-operators', title: 'Match: Ops' },
      ]},
    ]
  },
  {
    id: 'road4', label: 'Road 4', subtitle: 'OOP Sprint',
    stages: [
      { name: 'Classes', icon: '🏛️', color: '#ef4444', steps: [
        { key: 'csharpLevel3', to: '/csharp-level3', title: 'Level 3' },
        { key: 'matchpairoop', to: '/match-pair-oop', title: 'Match: OOP' },
        { key: 'f3', to: '/f3', title: 'F3 Quiz' },
      ]},
      { name: 'Inheritance', icon: '🧬', color: '#9333ea', steps: [
        { key: 'f5', to: '/f5', title: 'F5 Quiz' },
        { key: 'matchpaircsharp', to: '/match-pair-csharp', title: 'Match: Concepts' },
        { key: 'f1', to: '/f1', title: 'F1 Quiz' },
      ]},
    ]
  },
  {
    id: 'road5', label: 'Road 5', subtitle: 'Full Mastery Blast',
    stages: [
      { name: 'All Lectures', icon: '🚀', color: '#ec4899', steps: [
        { key: 'f1', to: '/f1', title: 'F1 Quiz' },
        { key: 'f2', to: '/f2', title: 'F2 Quiz' },
        { key: 'f3', to: '/f3', title: 'F3 Quiz' },
        { key: 'f4', to: '/f4', title: 'F4 Quiz' },
        { key: 'f5', to: '/f5', title: 'F5 Quiz' },
      ]},
      { name: 'All Levels', icon: '🏆', color: '#ffd700', steps: [
        { key: 'csharpLevel1', to: '/csharp-level1', title: 'Level 1' },
        { key: 'csharpLevel2', to: '/csharp-level2', title: 'Level 2' },
        { key: 'csharpLevel3', to: '/csharp-level3', title: 'Level 3' },
      ]},
    ]
  },
  {
    id: 'road6', label: 'Road 6', subtitle: 'UniSystem Project',
    stages: [
      { name: 'Model Classes', icon: '🏛️', color: '#06b6d4', steps: [
        { key: 'uniStudent', to: '/uni-student', title: 'Student.cs' },
        { key: 'uniAnsatt', to: '/uni-ansatt', title: 'Ansatt.cs' },
        { key: 'uniBok', to: '/uni-bok', title: 'Bok.cs' },
        { key: 'uniKurs', to: '/uni-kurs', title: 'Kurs.cs' },
        { key: 'uniLan', to: '/uni-lan', title: 'Lån.cs' },
      ]},
      { name: 'Theory Quizzes', icon: '🧠', color: '#14b8a6', steps: [
        { key: 'uniAnsattTheory', to: '/uni-ansatt-theory', title: 'Ansatt Theory' },
        { key: 'uniStudentTheory', to: '/uni-student-theory', title: 'Student Theory' },
        { key: 'uniBokTheory', to: '/uni-bok-theory', title: 'Bok Theory' },
        { key: 'uniLanTheory', to: '/uni-lan-theory', title: 'Lan Theory' },
        { key: 'uniKursTheory', to: '/uni-kurs-theory', title: 'Kurs Theory' },
      ]},
      { name: 'Service Classes', icon: '⚙️', color: '#8b5cf6', steps: [
        { key: 'uniKursSystem', to: '/uni-kurs-system', title: 'KursSystem.cs' },
        { key: 'uniBibliotekSystem', to: '/uni-bibliotek-system', title: 'BibliotekSystem.cs' },
        { key: 'uniProgram', to: '/uni-program', title: 'Program.cs' },
      ]},
    ]
  },
]

function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [roadCompletion, setRoadCompletion] = useState({})
  const [roadStore, setRoadStore] = useState({ completedRoads: [], baselines: {} })
  const [streak, setStreak] = useState(0)
  const [stats, setStats] = useState({
      completedQuestions: 0,
      correctAnswers: 0,
      totalCorrectFromAllAttempts: 0,
      totalQuestions: 0
    })

  const loadStats = () => {
    const modules = [
      { id: 'f1', total: 22 },
      { id: 'f2', total: 14 },
      { id: 'f3', total: 16 },
      { id: 'f4', total: 18 },
      { id: 'f5', total: 18 },
      { id: 'csharpBasics', total: 15 },
      { id: 'csharpLevel1', total: 17 },
      { id: 'csharpLevel2', total: 15 },
      { id: 'csharpLevel3', total: 15 },
      { id: 'matchpaircsharp', total: 12 },
      { id: 'matchpaircsharpkeywords', total: 18 },
      { id: 'matchpairarraylist', total: 14 },
      { id: 'matchpairstrings', total: 12 },
      { id: 'matchpairoperators', total: 14 },
      { id: 'matchpairoop', total: 14 },
      { id: 'uniStudent', total: 15 },
      { id: 'uniAnsatt', total: 15 },
      { id: 'uniBok', total: 15 },
      { id: 'uniKurs', total: 15 },
      { id: 'uniLan', total: 15 },
      { id: 'uniKursSystem', total: 15 },
      { id: 'uniBibliotekSystem', total: 15 },
      { id: 'uniProgram', total: 15 },
      { id: 'uniAnsattTheory', total: 8 },
      { id: 'uniStudentTheory', total: 8 },
      { id: 'uniBokTheory', total: 8 },
      { id: 'uniLanTheory', total: 8 },
      { id: 'uniKursTheory', total: 8 },
    ]
    
    let totalCompleted = 0
    let totalCorrect = 0
    let totalCorrectAllAttempts = 0
    const totalQuestionsAll = modules.reduce((sum, m) => sum + (m.total || 0), 0)
    
    modules.forEach(module => {
      const storedData = localStorage.getItem(`quiz_${module.id}`)
      if (storedData) {
        const parsed = JSON.parse(storedData)
        let questionsAnswered = parsed.questionsAnswered || 0
        const attempts = parsed.attempts || 0
        
        if (!parsed.questionsAnswered && attempts > 0) {
          questionsAnswered = module.total
        }
        
        totalCompleted += questionsAnswered
        totalCorrect += parsed.lastScore ?? parsed.score ?? 0
        totalCorrectAllAttempts += (parsed.attemptHistory?.reduce((sum, att) => sum + (att.score || 0), 0) || 0)
      }
    })
    
    // Road completion tracking with baselines
    const allStepKeys = new Set()
    ROADS.forEach(road => road.stages.forEach(stage => stage.steps.forEach(s => allStepKeys.add(s.key))))
    const quizAttempts = {}
    allStepKeys.forEach(key => {
      const d = localStorage.getItem(`quiz_${key}`)
      const parsed = d ? JSON.parse(d) : null
      quizAttempts[key] = parsed ? (parsed.attempts || parsed.attemptHistory?.length || 0) : 0
    })
    setRoadCompletion(quizAttempts)

    const rawStore = localStorage.getItem('road_store')
    let rs = rawStore ? JSON.parse(rawStore) : { completedRoads: [], baselines: {} }
    const activeIdx = ROADS.findIndex(r => !rs.completedRoads.includes(r.id))
    if (activeIdx >= 0) {
      const activeRoad = ROADS[activeIdx]
      const baseline = rs.baselines[activeRoad.id] || {}
      const allDone = activeRoad.stages.flatMap(s => s.steps).every(s => quizAttempts[s.key] > (baseline[s.key] || 0))
      if (allDone) {
        rs = { ...rs, completedRoads: [...rs.completedRoads, activeRoad.id] }
        const nextRoad = ROADS[activeIdx + 1]
        if (nextRoad) {
          const nextBaseline = {}
          nextRoad.stages.flatMap(s => s.steps).forEach(s => { nextBaseline[s.key] = quizAttempts[s.key] })
          rs = { ...rs, baselines: { ...rs.baselines, [nextRoad.id]: nextBaseline } }
        }
        localStorage.setItem('road_store', JSON.stringify(rs))
      }
    }
    setRoadStore(rs)

    // Streak: only counts after Road 1 is complete
    if (rs.completedRoads.includes('road1')) {
      const today = new Date().toISOString().split('T')[0]
      const raw = localStorage.getItem('study_streak')
      const sd = raw ? JSON.parse(raw) : { date: '', count: 0 }
      let newCount = sd.count
      if (sd.date !== today) {
        const yest = new Date()
        yest.setDate(yest.getDate() - 1)
        newCount = sd.date === yest.toISOString().split('T')[0] ? sd.count + 1 : 1
        localStorage.setItem('study_streak', JSON.stringify({ date: today, count: newCount }))
      }
      setStreak(newCount)
    } else {
      setStreak(0)
    }

    setStats({
      completedQuestions: totalCompleted,
      correctAnswers: totalCorrect,
      totalCorrectFromAllAttempts: totalCorrectAllAttempts,
      totalQuestions: totalQuestionsAll
    })
  }

  useEffect(() => {
    loadStats()
    const handleStorageChange = () => {
      loadStats()
    }
    window.addEventListener('storage', handleStorageChange)

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadStats()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleTocClick = (e) => {
      const link = e.target.closest('.toc-link')
      if (!link) return
      
      e.preventDefault()
      const targetId = link.getAttribute('href').substring(1)
      const targetElement = document.getElementById(targetId)
      
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        targetElement.classList.add('pulse-effect')
        setTimeout(() => {
          targetElement.classList.remove('pulse-effect')
        }, 1500)
      }
    }

    const tocNav = document.querySelector('.toc-nav')
    if (tocNav) {
      tocNav.addEventListener('click', handleTocClick)
    }

    return () => {
      if (tocNav) {
        tocNav.removeEventListener('click', handleTocClick)
      }
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const activeRoadIdx = ROADS.findIndex(r => !roadStore.completedRoads.includes(r.id))
  const allRoadsComplete = activeRoadIdx === -1
  const displayRoadIdx = allRoadsComplete ? ROADS.length - 1 : activeRoadIdx
  const activeRoad = ROADS[displayRoadIdx]
  const baseline = roadStore.baselines?.[activeRoad?.id] || {}
  const activeSteps = activeRoad ? activeRoad.stages.flatMap(s => s.steps) : []
  let foundCurrent = false
  const stepStatuses = {}
  const stepNums = {}
  let stepNum = 0
  activeSteps.forEach(step => {
    stepNum++
    stepNums[step.key] = stepNum
    const done = (roadCompletion[step.key] || 0) > (baseline[step.key] || 0)
    if (done) {
      stepStatuses[step.key] = 'completed'
    } else if (!foundCurrent && !allRoadsComplete) {
      stepStatuses[step.key] = 'current'
      foundCurrent = true
    } else {
      stepStatuses[step.key] = allRoadsComplete ? 'completed' : 'upcoming'
    }
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavigationMenu />
      <CustomMenu />
      <aside className="table-of-contents">
        <h3>List</h3>
        <nav className="toc-nav">
          <a href="#unisystem-theory" className="toc-link">UniSystem Theory</a>
          <a href="#unisystem" className="toc-link">UniSystem</a>
          <a href="#lectures" className="toc-link">Lectures</a>
          <a href="#learning-path" className="toc-link">Learning Path</a>
          <a href="#match-pairs" className="toc-link">Match Pairs</a>
          <a href="#csharp-basics" className="toc-link">C# Basics</a>
        </nav>
      </aside>

      <aside className="road-panel">
        <div className="road-panel-header">
          <h3>{allRoadsComplete ? '🏆 Mastered' : activeRoad?.label}</h3>
          {streak > 0 && (
            <div className="road-streak">
              <span>🔥</span>
              <span>{streak}</span>
            </div>
          )}
        </div>
        <div className="road-panel-dots">
          {ROADS.map((r, i) => (
            <div
              key={r.id}
              className={`road-dot${roadStore.completedRoads.includes(r.id) ? ' done' : i === displayRoadIdx ? ' active' : ''}`}
              title={r.label}
            />
          ))}
        </div>
        {activeRoad && (
          <div className="road-panel-subtitle">{activeRoad.subtitle}</div>
        )}
        <div className="road-panel-nodes">
          {activeRoad?.stages.map((stage, si) => (
            <div key={si} className="road-panel-stage" style={{ '--stage-color': stage.color }}>
              <div className="road-panel-stage-label">
                <span>{stage.icon}</span>
                <span>{stage.name}</span>
              </div>
              {stage.steps.map((step, i) => {
                const status = stepStatuses[step.key] || 'upcoming'
                return (
                  <div key={step.key} className="road-panel-item">
                    {i > 0 && <div className={`road-panel-line${status === 'completed' ? ' done' : ''}`} />}
                    <Link to={step.to} className={`road-panel-node ${status}`}>
                      <div className="road-panel-circle">
                        {status === 'completed' ? '✓' : stepNums[step.key]}
                      </div>
                      <span className="road-panel-title">{step.title}</span>
                    </Link>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        {allRoadsComplete && (
          <div className="road-panel-complete road2-complete">
            <span>💎</span>
            <span>All Roads Complete!</span>
          </div>
        )}
      </aside>

      <div className="home-content">
        <h1 className="home-title">C# Learning Hub</h1>
        <p>Master C# from the ground up — quizzes, match pairs & guided roads</p>
        
        <div className="gamification-wrapper">
          <div className="medal-milestones-inline">
            <div className="achievement-medal-item bronze" data-unlocked={stats.totalCorrectFromAllAttempts >= 400}>
              <img src="/icons/bronze-medal.svg" alt="Bronze Medal" className="medal-icon bronze-icon" />
              <div className="medal-details">
                <h4>Bronze</h4>
                <div className="medal-progress-bar">
                  <div className="medal-progress-fill" style={{ width: `${Math.min((Math.max(0, stats.totalCorrectFromAllAttempts) / 400) * 100, 100)}%` }}></div>
                </div>
                <span className="medal-count">{Math.min(Math.max(0, stats.totalCorrectFromAllAttempts), 400)}/400</span>
              </div>
            </div>
            
            <div className="achievement-medal-item silver" data-unlocked={stats.totalCorrectFromAllAttempts >= 800}>
              <img src="/icons/silver-medal.svg" alt="Silver Medal" className="medal-icon silver-icon" />
              <div className="medal-details">
                <h4>Silver</h4>
                <div className="medal-progress-bar">
                  <div className="medal-progress-fill" style={{ width: `${Math.min((Math.max(0, stats.totalCorrectFromAllAttempts) / 800) * 100, 100)}%` }}></div>
                </div>
                <span className="medal-count">{Math.min(Math.max(0, stats.totalCorrectFromAllAttempts), 800)}/800</span>
              </div>
            </div>
            
            <div className="achievement-medal-item gold" data-unlocked={stats.totalCorrectFromAllAttempts >= 1200}>
              <img src="/icons/gold-medal.svg" alt="Gold Medal" className="medal-icon gold-icon" />
              <div className="medal-details">
                <h4>Gold</h4>
                <div className="medal-progress-bar">
                  <div className="medal-progress-fill" style={{ width: `${Math.min((Math.max(0, stats.totalCorrectFromAllAttempts) / 1200) * 100, 100)}%` }}></div>
                </div>
                <span className="medal-count">{Math.min(Math.max(0, stats.totalCorrectFromAllAttempts), 1200)}/1200</span>
              </div>
            </div>
            
            <div className="achievement-medal-item emerald" data-unlocked={stats.totalCorrectFromAllAttempts >= 1600}>
              <img src="/icons/emerald.svg" alt="Emerald" className="medal-icon emerald-icon" />
              <div className="medal-details">
                <h4>Emerald</h4>
                <div className="medal-progress-bar">
                  <div className="medal-progress-fill" style={{ width: `${Math.min((Math.max(0, stats.totalCorrectFromAllAttempts) / 1600) * 100, 100)}%` }}></div>
                </div>
                <span className="medal-count">{Math.min(Math.max(0, stats.totalCorrectFromAllAttempts), 1600)}/1600</span>
              </div>
            </div>
            
            <div className="achievement-medal-item platinum" data-unlocked={stats.totalCorrectFromAllAttempts >= 1800}>
              <img src="/icons/platinum.svg" alt="Platinum" className="medal-icon platinum-icon" />
              <div className="medal-details">
                <h4>Platinum</h4>
                <div className="medal-progress-bar">
                  <div className="medal-progress-fill" style={{ width: `${Math.min((Math.max(0, stats.totalCorrectFromAllAttempts) / 1800) * 100, 100)}%` }}></div>
                </div>
                <span className="medal-count">{Math.min(Math.max(0, stats.totalCorrectFromAllAttempts), 1800)}/1800</span>
              </div>
            </div>
            
            <div className="achievement-medal-item diamond" data-unlocked={stats.totalCorrectFromAllAttempts >= 2000}>
              <img src="/icons/diamond.svg" alt="Diamond" className="medal-icon diamond-icon" />
              <div className="medal-details">
                <h4>Diamond</h4>
                <div className="medal-progress-bar">
                  <div className="medal-progress-fill" style={{ width: `${Math.min((Math.max(0, stats.totalCorrectFromAllAttempts) / 2000) * 100, 100)}%` }}></div>
                </div>
                <span className="medal-count">{Math.min(Math.max(0, stats.totalCorrectFromAllAttempts), 2000)}/2000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="chapter-list" id="unisystem-theory">
          <div className="chapter-divider">
            <span>UniSystem Theory</span>
          </div>
          <div className="chapters-grid">
            <Link to="/uni-ansatt-theory" className="chapter-button">
              <h3>🧑‍💼 Ansatt Theory</h3>
              <p>class, public, string, constructor, namespace, relasjon til Lån</p>
              <span className="question-count">8 questions</span>
            </Link>
            <Link to="/uni-student-theory" className="chapter-button">
              <h3>👤 Student Theory</h3>
              <p>StudentID, feltforståelse, constructor, namespace og relasjoner</p>
              <span className="question-count">8 questions</span>
            </Link>
            <Link to="/uni-bok-theory" className="chapter-button">
              <h3>📖 Bok Theory</h3>
              <p>string/int, bokfelter, constructor-logikk, relasjon til Lån</p>
              <span className="question-count">8 questions</span>
            </Link>
            <Link to="/uni-lan-theory" className="chapter-button">
              <h3>🔖 Lån Theory</h3>
              <p>BokID, BrukerID, BrukerNavn, BrukerType, constructor og namespace</p>
              <span className="question-count">8 questions</span>
            </Link>
            <Link to="/uni-kurs-theory" className="chapter-button">
              <h3>📚 Kurs Theory</h3>
              <p>List&lt;Student&gt;, kapasitet, constructor og klasse-relasjoner</p>
              <span className="question-count">8 questions</span>
            </Link>
          </div>
        </div>

        <div className="chapter-list" id="unisystem">
          <div className="chapter-divider">
            <span>UniSystem</span>
          </div>
          <div className="chapters-grid">
            <Link to="/unisystem" className="chapter-button">
              <h3>🏫 UniSystem Kode</h3>
              <p>Annotert C# kildekode — Student, Ansatt, Kurs, Bok, Lån og mer</p>
              <span className="question-count">8 filer</span>
            </Link>
            <Link to="/uni-student" className="chapter-button">
              <h3>👤 Student.cs</h3>
              <p>Namespace, class, public fields, constructor, objekter</p>
              <span className="question-count">15 questions</span>
            </Link>
            <Link to="/uni-ansatt" className="chapter-button">
              <h3>🧑‍💼 Ansatt.cs</h3>
              <p>Klasse med 3 felter, konstruktør, sammenligning med Student</p>
              <span className="question-count">15 questions</span>
            </Link>
            <Link to="/uni-bok" className="chapter-button">
              <h3>📖 Bok.cs</h3>
              <p>Mixed types, 5-param constructor, TilgjengeligeEksemplarer</p>
              <span className="question-count">15 questions</span>
            </Link>
            <Link to="/uni-kurs" className="chapter-button">
              <h3>📚 Kurs.cs</h3>
              <p>List&lt;Student&gt;, generics, composition, using System.Collections</p>
              <span className="question-count">15 questions</span>
            </Link>
            <Link to="/uni-lan" className="chapter-button">
              <h3>🔖 Lån.cs</h3>
              <p>4 string fields, BrukerType, data vs service class</p>
              <span className="question-count">15 questions</span>
            </Link>
            <Link to="/uni-kurs-system" className="chapter-button">
              <h3>⚙️ KursSystem.cs</h3>
              <p>const, List&lt;Kurs&gt;, foreach, Find(), lambda, Remove()</p>
              <span className="question-count">15 questions</span>
            </Link>
            <Link to="/uni-bibliotek-system" className="chapter-button">
              <h3>🏛️ BibliotekSystem.cs</h3>
              <p>To lister, nullable Lån?, break, nested foreach, &amp;&amp;</p>
              <span className="question-count">15 questions</span>
            </Link>
            <Link to="/uni-program" className="chapter-button">
              <h3>▶️ Program.cs</h3>
              <p>static void Main, while(running), int.Parse, #nullable disable</p>
              <span className="question-count">15 questions</span>
            </Link>
          </div>
        </div>
        <div className="chapter-list" id="lectures">
          <div className="chapter-divider">
            <span>Lectures</span>
          </div>
          <div className="chapters-grid">
            <Link to="/f1" className="chapter-button starred">
              <div className="star-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ffd700">
                  <polygon points="12,2 15,10 23,10 17,15 19,23 12,18 5,23 7,15 1,10 9,10" />
                </svg>
              </div>
              <h3>🎓 F1 Quiz</h3>
              <p>OOP, C# types, control flow, methods</p>
              <span className="question-count">22 questions</span>
            </Link>
            <Link to="/f2" className="chapter-button">
              <h3>📘 F2 Quiz</h3>
              <p>Scope, refactoring, projects, classes, methods</p>
              <span className="question-count">14 questions</span>
            </Link>
            <Link to="/f3" className="chapter-button">
              <h3>🔒 F3 Quiz</h3>
              <p>Encapsulation, access modifiers, properties, constructors</p>
              <span className="question-count">16 questions</span>
            </Link>
            <Link to="/f4" className="chapter-button">
              <h3>📚 F4 Quiz</h3>
              <p>Collections, arrays, lists, loops, LINQ basics</p>
              <span className="question-count">18 questions</span>
            </Link>
            <Link to="/f5" className="chapter-button">
              <h3>🧬 F5 Quiz</h3>
              <p>Inheritance, override, base/new, access modifiers</p>
              <span className="question-count">18 questions</span>
            </Link>
          </div>
        </div>

        <div className="chapter-list" id="learning-path">
          <div className="chapter-divider">
            <span>Learning Path</span>
          </div>
          <div className="chapters-grid">
            <Link to="/csharp-level1" className="chapter-button">
              <h3>🗺️ Level 1</h3>
              <p>Syntax, output, variables, types, loops, arrays</p>
              <span className="question-count">17 questions</span>
            </Link>
            <Link to="/csharp-level2" className="chapter-button">
              <h3>⚙️ Level 2</h3>
              <p>Methods, parameters, return values, overloading</p>
              <span className="question-count">15 questions</span>
            </Link>
            <Link to="/csharp-level3" className="chapter-button">
              <h3>🏛️ Level 3</h3>
              <p>OOP, classes, constructors, inheritance, interfaces, enums</p>
              <span className="question-count">15 questions</span>
            </Link>
          </div>
        </div>

        <div className="chapter-list" id="match-pairs">
          <div className="chapter-divider">
            <span>Match Pairs</span>
          </div>
          <div className="chapters-grid">
            <Link to="/match-pair-csharp" className="chapter-button">
              <h3>🔗 Concepts</h3>
              <p>Match C# keywords and concepts to their descriptions</p>
              <span className="question-count">12 pairs</span>
            </Link>
            <Link to="/match-pair-csharp-keywords" className="chapter-button">
              <h3>📝 Keywords</h3>
              <p>namespace, this, new, static, foreach, try/catch, List methods and more</p>
              <span className="question-count">18 pairs</span>
            </Link>
            <Link to="/match-pair-array-list" className="chapter-button">
              <h3>📦 Arrays &amp; Lists</h3>
              <p>Array syntax, sorting, List&lt;T&gt; methods: Add, Remove, Insert, IndexOf and more</p>
              <span className="question-count">14 pairs</span>
            </Link>
            <Link to="/match-pair-strings" className="chapter-button">
              <h3>💬 Strings</h3>
              <p>Interpolation, concatenation, ToUpper, Substring, Replace, IndexOf, escape chars</p>
              <span className="question-count">12 pairs</span>
            </Link>
            <Link to="/match-pair-operators" className="chapter-button">
              <h3>⚙️ Operators</h3>
              <p>Comparison, logical, assignment operators, type casting and const</p>
              <span className="question-count">14 pairs</span>
            </Link>
            <Link to="/match-pair-oop" className="chapter-button">
              <h3>🦠 OOP</h3>
              <p>override, virtual, base, abstract, interface, enum, properties, exceptions</p>
              <span className="question-count">14 pairs</span>
            </Link>
          </div>
        </div>

        <div className="chapter-list" id="csharp-basics">
          <div className="chapter-divider">
            <span>C# Basics</span>
          </div>
          <div className="chapters-grid">
            <Link to="/learn-csharp" className="chapter-button">
              <h3>📗 Intro til C#</h3>
              <p>Klasser, objekter, metoder, OOP-prinsipper</p>
              <span className="question-count">Quiz</span>
            </Link>
            <Link to="/csharp-basics" className="chapter-button">
              <h3>🟢 Beginner P1</h3>
              <p>Variables, types, output, methods, loops, classes</p>
              <span className="question-count">15 questions</span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
      
      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
          ↑
        </button>
      )}
    </motion.div>
  )
}

export default Home
