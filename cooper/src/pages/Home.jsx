import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import '../App.css'
import './Home.css'
import NavigationMenu from './widget/navigationMenu'
import CustomMenu from './widget/customMenu'
import Footer from './widget/footer'

const LEARNING_ROAD = [
  {
    stage: 'Stage 1 · Foundations',
    icon: '🌱',
    color: '#10b981',
    steps: [
      { key: 'csharpBasics', to: '/csharp-basics', emoji: '🟢', title: 'Beginner P1', count: '15q' },
      { key: 'csharpLevel1', to: '/csharp-level1', emoji: '🗺️', title: 'Level 1', count: '17q' },
      { key: 'matchpaircsharp', to: '/match-pair-csharp', emoji: '🔗', title: 'Match: Concepts', count: '12p' },
      { key: 'matchpaircsharpkeywords', to: '/match-pair-csharp-keywords', emoji: '📝', title: 'Match: Keywords', count: '18p' },
    ]
  },
  {
    stage: 'Stage 2 · Core Skills',
    icon: '⚡',
    color: '#646cff',
    steps: [
      { key: 'f1', to: '/f1', emoji: '🎓', title: 'F1 Quiz', count: '22q' },
      { key: 'csharpLevel2', to: '/csharp-level2', emoji: '⚙️', title: 'Level 2', count: '15q' },
      { key: 'matchpairstrings', to: '/match-pair-strings', emoji: '💬', title: 'Match: Strings', count: '12p' },
      { key: 'matchpairoperators', to: '/match-pair-operators', emoji: '⚙️', title: 'Match: Operators', count: '14p' },
    ]
  },
  {
    stage: 'Stage 3 · Collections',
    icon: '📦',
    color: '#f59e0b',
    steps: [
      { key: 'f2', to: '/f2', emoji: '📘', title: 'F2 Quiz', count: '14q' },
      { key: 'f3', to: '/f3', emoji: '🔒', title: 'F3 Quiz', count: '16q' },
      { key: 'matchpairarraylist', to: '/match-pair-array-list', emoji: '📦', title: 'Match: Arrays', count: '14p' },
      { key: 'f4', to: '/f4', emoji: '📚', title: 'F4 Quiz', count: '18q' },
    ]
  },
  {
    stage: 'Stage 4 · Advanced OOP',
    icon: '🏆',
    color: '#ef4444',
    steps: [
      { key: 'csharpLevel3', to: '/csharp-level3', emoji: '🏛️', title: 'Level 3', count: '15q' },
      { key: 'matchpairoop', to: '/match-pair-oop', emoji: '🦠', title: 'Match: OOP', count: '14p' },
      { key: 'f5', to: '/f5', emoji: '🧬', title: 'F5 Quiz', count: '18q' },
    ]
  }
]

const LEARNING_ROAD_2 = [
  {
    stage: 'Stage A · Lecture Series',
    icon: '📖',
    color: '#3b82f6',
    steps: [
      { key: 'f1', to: '/f1', emoji: '🎓', title: 'F1 Quiz', count: '22q' },
      { key: 'f2', to: '/f2', emoji: '📘', title: 'F2 Quiz', count: '14q' },
      { key: 'f3', to: '/f3', emoji: '🔒', title: 'F3 Quiz', count: '16q' },
    ]
  },
  {
    stage: 'Stage B · Collections',
    icon: '📦',
    color: '#f59e0b',
    steps: [
      { key: 'f4', to: '/f4', emoji: '📚', title: 'F4 Quiz', count: '18q' },
      { key: 'matchpairarraylist', to: '/match-pair-array-list', emoji: '📦', title: 'Match: Arrays', count: '14p' },
      { key: 'matchpairstrings', to: '/match-pair-strings', emoji: '💬', title: 'Match: Strings', count: '12p' },
    ]
  },
  {
    stage: 'Stage C · OOP Mastery',
    icon: '🔬',
    color: '#8b5cf6',
    steps: [
      { key: 'f5', to: '/f5', emoji: '🧬', title: 'F5 Quiz', count: '18q' },
      { key: 'matchpairoop', to: '/match-pair-oop', emoji: '🦠', title: 'Match: OOP', count: '14p' },
      { key: 'matchpairoperators', to: '/match-pair-operators', emoji: '⚙️', title: 'Match: Ops', count: '14p' },
      { key: 'matchpaircsharp', to: '/match-pair-csharp', emoji: '🔗', title: 'Match: Concepts', count: '12p' },
    ]
  },
  {
    stage: 'Stage D · Full Mastery',
    icon: '💪',
    color: '#9370db',
    steps: [
      { key: 'csharpLevel1', to: '/csharp-level1', emoji: '🗺️', title: 'Level 1', count: '17q' },
      { key: 'csharpLevel2', to: '/csharp-level2', emoji: '⚙️', title: 'Level 2', count: '15q' },
      { key: 'csharpLevel3', to: '/csharp-level3', emoji: '🏛️', title: 'Level 3', count: '15q' },
      { key: 'matchpaircsharpkeywords', to: '/match-pair-csharp-keywords', emoji: '📝', title: 'Match: Keys', count: '18p' },
    ]
  }
]

function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [roadCompletion, setRoadCompletion] = useState({})
  const [streak, setStreak] = useState({ count: 0, longest: 0 })
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
    
    const completion = {}
    LEARNING_ROAD.forEach(stage => {
      stage.steps.forEach(step => {
        const d = localStorage.getItem(`quiz_${step.key}`)
        completion[step.key] = d ? (JSON.parse(d).attempts || 0) : 0
      })
    })
    LEARNING_ROAD_2.forEach(stage => {
      stage.steps.forEach(step => {
        if (!(step.key in completion)) {
          const d = localStorage.getItem(`quiz_${step.key}`)
          completion[step.key] = d ? (JSON.parse(d).attempts || 0) : 0
        }
      })
    })
    setRoadCompletion(completion)

    const today = new Date().toISOString().split('T')[0]
    const raw = localStorage.getItem('study_streak')
    const sd = raw ? JSON.parse(raw) : { date: '', count: 0, longest: 0 }
    let newCount = sd.count
    let newLongest = sd.longest
    if (sd.date !== today) {
      const yest = new Date()
      yest.setDate(yest.getDate() - 1)
      const yesterdayStr = yest.toISOString().split('T')[0]
      newCount = sd.date === yesterdayStr ? sd.count + 1 : 1
      newLongest = Math.max(newCount, sd.longest)
      localStorage.setItem('study_streak', JSON.stringify({ date: today, count: newCount, longest: newLongest }))
    }
    setStreak({ count: newCount, longest: newLongest })

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

  const allRoadSteps = LEARNING_ROAD.flatMap(s => s.steps)
  const roadComplete = allRoadSteps.every(s => (roadCompletion[s.key] || 0) >= 1)
  let foundCurrent = false
  const stepStatuses = {}
  const stepNums = {}
  let rStepNum = 0
  allRoadSteps.forEach(step => {
    rStepNum++
    stepNums[step.key] = rStepNum
    if ((roadCompletion[step.key] || 0) >= 1) {
      stepStatuses[step.key] = 'completed'
    } else if (!foundCurrent) {
      stepStatuses[step.key] = 'current'
      foundCurrent = true
    } else {
      stepStatuses[step.key] = 'upcoming'
    }
  })

  const allRoadSteps2 = LEARNING_ROAD_2.flatMap(s => s.steps)
  const roadComplete2 = allRoadSteps2.every(s => (roadCompletion[s.key] || 0) >= 2)
  let foundCurrent2 = false
  const stepStatuses2 = {}
  const stepNums2 = {}
  let rStepNum2 = 0
  allRoadSteps2.forEach(step => {
    rStepNum2++
    stepNums2[step.key] = rStepNum2
    if ((roadCompletion[step.key] || 0) >= 2) {
      stepStatuses2[step.key] = 'completed'
    } else if (!foundCurrent2 && roadComplete) {
      stepStatuses2[step.key] = 'current'
      foundCurrent2 = true
    } else {
      stepStatuses2[step.key] = 'upcoming'
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
          <a href="#lectures" className="toc-link">Lectures</a>
          <a href="#learning-path" className="toc-link">Learning Path</a>
          <a href="#match-pairs" className="toc-link">Match Pairs</a>
          <a href="#csharp-basics" className="toc-link">C# Basics</a>
          <a href="#unisystem" className="toc-link">UniSystem</a>
        </nav>
      </aside>

      <aside className="road-panel">
        <div className="road-panel-header">
          <h3>Road</h3>
          {streak.count > 0 && (
            <div className="road-streak">
              <span>🔥</span>
              <span>{streak.count}</span>
            </div>
          )}
        </div>
        <div className="road-panel-nodes">
          {LEARNING_ROAD.map((stage, si) => (
            <div key={si} className="road-panel-stage" style={{ '--stage-color': stage.color }}>
              <div className="road-panel-stage-label">
                <span>{stage.icon}</span>
                <span>{stage.stage.split(' · ')[1]}</span>
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
        {roadComplete && (
          <div className="road-panel-complete">
            <span>🏆</span>
            <span>Road 1 Complete!</span>
          </div>
        )}

        {roadComplete && (
          <>
            <div className="road-panel-road2-unlock">
              <span>⚔️ Road 2 Unlocked</span>
              <span className="road2-unlock-sub">Repeat each quiz twice for mastery</span>
            </div>
            <div className="road-panel-nodes">
              {LEARNING_ROAD_2.map((stage, si) => (
                <div key={si} className="road-panel-stage" style={{ '--stage-color': stage.color }}>
                  <div className="road-panel-stage-label">
                    <span>{stage.icon}</span>
                    <span>{stage.stage.split(' · ')[1]}</span>
                  </div>
                  {stage.steps.map((step, i) => {
                    const status = stepStatuses2[step.key] || 'upcoming'
                    return (
                      <div key={step.key} className="road-panel-item">
                        {i > 0 && <div className={`road-panel-line${status === 'completed' ? ' done' : ''}`} />}
                        <Link to={step.to} className={`road-panel-node ${status}`}>
                          <div className="road-panel-circle">
                            {status === 'completed' ? '✓' : stepNums2[step.key]}
                          </div>
                          <span className="road-panel-title">{step.title}</span>
                        </Link>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
            {roadComplete2 && (
              <div className="road-panel-complete road2-complete">
                <span>💎</span>
                <span>Mastery Complete!</span>
              </div>
            )}
          </>
        )}
      </aside>

      <div className="home-content">
        <h1 className="home-title">Teamwork & Group Dynamics</h1>
        <p>Master the fundamentals of effective teamwork</p>
        
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
