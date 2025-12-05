import { motion } from 'framer-motion'

function ChartCard({ title, subtitle, children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`glass-card p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-display font-semibold text-white">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white bg-slate-dark/50 rounded-lg transition-colors">
            7D
          </button>
          <button className="px-3 py-1.5 text-xs font-medium text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/30 rounded-lg">
            30D
          </button>
          <button className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white bg-slate-dark/50 rounded-lg transition-colors">
            90D
          </button>
        </div>
      </div>
      {children}
    </motion.div>
  )
}

export default ChartCard

