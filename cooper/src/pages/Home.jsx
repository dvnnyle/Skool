import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import '../App.css'
import './Home.css'
import NavigationMenu from './widget/navigationMenu'
import CustomMenu from './widget/customMenu'
import Footer from './widget/footer'

function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false)
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
