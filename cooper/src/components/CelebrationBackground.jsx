import { motion } from 'framer-motion'

export default function CelebrationBackground({ score, total }) {
  const success = score / total >= 0.7
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: success ? 1 : 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        background: success ? 'radial-gradient( circle at 50% 30%, rgba(34,197,94,0.15), transparent 60%)' : 'transparent'
      }}
    />
  )
}
