import './toastModal.css'
import logo from '../../assets/day17favi.svg'

function ToastModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <h2 className="modal-title">About This Quiz App</h2>
        <div className="toast-modal-divider"></div>
        <div className="modal-body">
          <p>Welcome to the <strong>UX Interaction Design Quiz App</strong>!</p>
          <h3>Purpose</h3>
          <p>This application helps students practice course concepts through interactive quizzes.</p>
        </div>
        <div className="toast-modal-divider"></div>
        <div className="modal-footer">
          <img src={logo} alt="Day17 Logo" className="modal-logo" />
          <p className="modal-creator">Created by Danny Nguyen Le</p>
        </div>
      </div>
    </div>
  )
}

export default ToastModal
