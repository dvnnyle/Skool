import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import NavigationMenu from './widget/navigationMenu'
import '../components/CelebrationBackground'
import moduleData from '../../dataBank/modul1a.json'
import './moduleChapters/modules.css'

function Module1A() {
  const hasQuestions = Array.isArray(moduleData) && moduleData.length > 0

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <NavigationMenu />
      <div className="quiz-page">
        <div className="quiz-container">
          <div className="result-card" style={{ textAlign: 'center' }}>
            <h1>Module 1A: Group Psychology</h1>
            <p className="section-description">Forelesning 1 — start from scratch</p>

            {!hasQuestions && (
              <>
                <p style={{ color: '#93a4b8' }}>No questions yet. Add content to dataBank/modul1a.json.</p>
                <div className="button-group" style={{ marginTop: '12px' }}>
                  <Link to="/" className="home-link">Back to Home</Link>
                </div>
              </>
            )}

            {hasQuestions && (
              <>
                <p style={{ color: '#93a4b8' }}>Questions found: {moduleData.length}. Rendering will be implemented next.</p>
                <div className="button-group" style={{ marginTop: '12px' }}>
                  <Link to="/" className="home-link">Back to Home</Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Module1A
