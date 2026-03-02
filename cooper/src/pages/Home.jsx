import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import '../App.css'
import './Home.css'
import NavigationMenu from './widget/navigationMenu'
import CustomMenu from './widget/customMenu'
import Footer from './widget/footer'

function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const location = useLocation()
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
      { id: 'f3', total: 20 },
      { id: 'f4', total: 22 },
      { id: 'f5', total: 18 },
      { id: 'f6', total: 25 },
      { id: 'f7', total: 31 }
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
        totalCorrect += parsed.lastScore || 0
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
  }, [location])

  useEffect(() => {
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
        <h3>Contents</h3>
        <nav className="toc-nav">
          <a href="#basics" className="toc-link">Basics</a>
          <a href="#lectured" className="toc-link">Lectures</a>
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

        <div className="chapter-list" id="basics">
          <div className="chapter-divider">
            <span>Basics</span>
          </div>
          <div className="chapters-grid">
            <Link to="/f6" className="chapter-button">
              <h3>💡 C# Grunnleggende</h3>
              <p>Typer, løkker, metoder, samlinger og feilhåndtering</p>
              <span className="question-count">25 questions</span>
            </Link>

            <Link to="/f7" className="chapter-button">
              <h3>🏫 UniSystem</h3>
              <p>Kurs- og biblioteksystem – klasser, lister, metoder og kontrollflyt</p>
              <span className="question-count">31 questions</span>
            </Link>
          </div>
        </div>

        <div className="chapter-list" id="lectured">
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
              <h3>📚 F2 Quiz</h3>
              <p>Scope, refactoring, C# syntax, classes</p>
              <span className="question-count">14 questions</span>
            </Link>

            <Link to="/f3" className="chapter-button">
              <h3>📖 F3 Quiz</h3>
              <p>Inheritance, virtual, override, polymorphism</p>
              <span className="question-count">20 questions</span>
            </Link>

            <Link to="/f4" className="chapter-button">
              <h3>📝 F4 Quiz</h3>
              <p>Abstract classes, interfaces, contracts</p>
              <span className="question-count">22 questions</span>
            </Link>

            <Link to="/f5" className="chapter-button">
              <h3>🚀 F5 Quiz</h3>
              <p>Access modifiers, inheritance, sealed</p>
              <span className="question-count">18 questions</span>
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
