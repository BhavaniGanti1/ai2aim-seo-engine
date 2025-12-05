import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

function KPICard({ title, value, change, changeType, icon: Icon, color, delay = 0 }) {
  const colorClasses = {
    cyan: {
      bg: 'from-neon-cyan/20 to-neon-cyan/5',
      border: 'border-neon-cyan/30',
      icon: 'bg-neon-cyan/20 text-neon-cyan',
      shadow: 'group-hover:shadow-neon-cyan',
    },
    magenta: {
      bg: 'from-neon-magenta/20 to-neon-magenta/5',
      border: 'border-neon-magenta/30',
      icon: 'bg-neon-magenta/20 text-neon-magenta',
      shadow: 'group-hover:shadow-neon-magenta',
    },
    lime: {
      bg: 'from-neon-lime/20 to-neon-lime/5',
      border: 'border-neon-lime/30',
      icon: 'bg-neon-lime/20 text-neon-lime',
      shadow: 'group-hover:shadow-[0_0_20px_rgba(57,255,20,0.5)]',
    },
    orange: {
      bg: 'from-solar-orange/20 to-solar-orange/5',
      border: 'border-solar-orange/30',
      icon: 'bg-solar-orange/20 text-solar-orange',
      shadow: 'group-hover:shadow-[0_0_20px_rgba(255,107,53,0.5)]',
    },
    purple: {
      bg: 'from-plasma-purple/20 to-plasma-purple/5',
      border: 'border-plasma-purple/30',
      icon: 'bg-plasma-purple/20 text-plasma-purple',
      shadow: 'group-hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]',
    },
  }

  const styles = colorClasses[color] || colorClasses.cyan

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`glass-card p-6 group cursor-pointer transition-all duration-300 ${styles.shadow}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${styles.icon}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
          changeType === 'increase' 
            ? 'bg-neon-lime/20 text-neon-lime' 
            : 'bg-red-500/20 text-red-400'
        }`}>
          {changeType === 'increase' ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {change}
        </div>
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-display font-bold text-white">{value}</p>
    </motion.div>
  )
}

export default KPICard

