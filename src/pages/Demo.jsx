import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Play, Pause, Volume2, VolumeX, Maximize, X, ArrowRight,
  CheckCircle, Clock, Users, Zap
} from 'lucide-react'
import PublicNav from '../components/PublicNav'

const demoFeatures = [
  { icon: Zap, title: 'AI Campaign Optimization', duration: '2:30' },
  { icon: Users, title: 'Smart Audience Targeting', duration: '3:15' },
  { icon: CheckCircle, title: 'Automated Reporting', duration: '1:45' },
]

function Demo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="min-h-screen bg-void">
      <PublicNav />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
              See AI2AIM <span className="gradient-text">in Action</span>
            </h1>
            <p className="text-xl text-gray-400">
              Watch how AI2AIM transforms marketing campaigns with the power of artificial intelligence.
            </p>
          </motion.div>

          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <div className="glass-card overflow-hidden">
              {/* Video Container */}
              <div className="relative aspect-video bg-slate-dark">
                {/* Placeholder/Thumbnail */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-obsidian to-slate-dark">
                  <div className="text-center">
                    <motion.button
                      onClick={() => setShowModal(true)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-24 h-24 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta flex items-center justify-center mb-6 shadow-neon-cyan mx-auto"
                    >
                      <Play className="w-10 h-10 text-void ml-1" />
                    </motion.button>
                    <h3 className="text-2xl font-display font-bold text-white mb-2">
                      AI2AIM Marketing Revolution
                    </h3>
                    <p className="text-gray-400">
                      <Clock className="w-4 h-4 inline mr-1" />
                      5 minute overview
                    </p>
                  </div>
                </div>

                {/* Video Grid Overlay */}
                <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
              </div>

              {/* Video Controls */}
              <div className="p-4 bg-obsidian/50 border-t border-slate-dark flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-lg hover:bg-slate-dark transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white" />
                    )}
                  </button>
                  <div className="flex-1 max-w-md">
                    <div className="h-1 bg-slate-dark rounded-full overflow-hidden">
                      <div className="h-full w-0 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-full" />
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">0:00 / 5:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-lg hover:bg-slate-dark transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </button>
                  <button
                    onClick={() => setShowModal(true)}
                    className="p-2 rounded-lg hover:bg-slate-dark transition-colors"
                  >
                    <Maximize className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Demos */}
      <section className="py-20 bg-obsidian/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Feature Tutorials
            </h2>
            <p className="text-gray-400">
              Deep dive into specific features with our detailed tutorials
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demoFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card overflow-hidden group cursor-pointer"
              >
                <div className="aspect-video bg-slate-dark relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-4 rounded-full bg-white/10 group-hover:bg-neon-cyan/20 transition-colors">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-void/80 rounded text-xs text-white">
                    {feature.duration}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-neon-cyan/10">
                      <feature.icon className="w-5 h-5 text-neon-cyan" />
                    </div>
                    <h3 className="font-semibold text-white">{feature.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold text-white mb-6">
              Ready to Transform Your Marketing?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Start your free 14-day trial and experience the power of AI marketing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-xl text-void font-bold text-lg"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/contact">
                <button className="px-8 py-4 bg-white/5 border border-white/20 rounded-xl text-white font-semibold hover:bg-white/10 transition-all">
                  Schedule a Demo
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/90 backdrop-blur-xl"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-6xl aspect-video bg-obsidian rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-void/50 hover:bg-void transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            {/* Actual Video Player */}
            <video 
              className="w-full h-full object-contain"
              controls
              autoPlay
              src="/AI2Aim_%20Marketing%20Revolution.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default Demo

