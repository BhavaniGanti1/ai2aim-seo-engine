import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Brain, Target, TrendingUp, MessageSquare, BarChart3, Shield,
  Zap, Users, Mail, Globe, Layers, RefreshCw, ArrowRight,
  CheckCircle, Sparkles, Bot, Palette, Clock, PieChart,
  FileText, Share2, Eye, Database, Search, Rss, Code, Send
} from 'lucide-react'
import PublicNav from '../components/PublicNav'

const mainFeatures = [
  {
    icon: Brain,
    title: 'AI Content Generation',
    description: 'Generate SEO-optimized articles, blog posts, and social media content using GPT-4, Claude, and custom AI models. Our Content Brain understands your brand voice and creates compelling content at scale.',
    benefits: ['Multi-model support (GPT-4, Claude, Gemini)', 'Brand voice training', 'SEO optimization built-in', 'Bulk content generation'],
    color: 'cyan'
  },
  {
    icon: Share2,
    title: 'Auto Social Publishing',
    description: 'Automatically distribute your content across 20+ platforms including Twitter, LinkedIn, Instagram, Facebook, Medium, and more. Platform-specific formatting and scheduling included.',
    benefits: ['20+ platform integrations', 'Smart scheduling', 'Platform-specific formatting', 'Cross-posting automation'],
    color: 'magenta'
  },
  {
    icon: Eye,
    title: 'AI Visibility Engine',
    description: 'Ensure your content gets indexed by ChatGPT, Claude, Gemini, Grok, and all major LLMs. We handle schema markup, semantic embeddings, and multi-platform syndication automatically.',
    benefits: ['LLM indexing optimization', 'JSON-LD schema generation', 'Semantic embeddings', 'Visibility scoring'],
    color: 'lime'
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track content performance across all platforms in real-time. Monitor AI visibility scores, engagement metrics, and ROI with our comprehensive analytics suite.',
    benefits: ['Real-time metrics', 'Cross-platform analytics', 'AI visibility scoring', 'ROI tracking'],
    color: 'purple'
  },
]

const additionalFeatures = [
  { icon: Database, title: 'Vector Embeddings', description: 'Store content in Pinecone, Qdrant, or Weaviate for AI retrieval' },
  { icon: Rss, title: 'RSS & Sitemap', description: 'Auto-generate and submit feeds to all major aggregators' },
  { icon: Code, title: 'JSON-LD Schema', description: 'Automatic schema.org markup for enhanced indexing' },
  { icon: RefreshCw, title: 'Content Repurposing', description: 'Convert articles to podcasts, videos, and social posts' },
  { icon: Clock, title: 'Smart Scheduling', description: 'AI-powered optimal posting time recommendations' },
  { icon: Shield, title: 'Brand Consistency', description: 'Maintain voice and style across all content' },
  { icon: Users, title: 'Team Collaboration', description: 'Multi-user workspaces with role-based access' },
  { icon: Mail, title: 'Newsletter Integration', description: 'Auto-generate email content from your articles' },
  { icon: Globe, title: 'Multi-language', description: 'Create and publish content in 50+ languages' },
]

function Features() {
  const colorClasses = {
    cyan: { bg: 'bg-neon-cyan/10', text: 'text-neon-cyan', border: 'border-neon-cyan/20' },
    magenta: { bg: 'bg-neon-magenta/10', text: 'text-neon-magenta', border: 'border-neon-magenta/20' },
    lime: { bg: 'bg-neon-lime/10', text: 'text-neon-lime', border: 'border-neon-lime/20' },
    purple: { bg: 'bg-plasma-purple/10', text: 'text-plasma-purple', border: 'border-plasma-purple/20' },
  }

  return (
    <div className="min-h-screen bg-void">
      <PublicNav />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neon-cyan/5 via-void to-void" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 mb-6">
              <Sparkles className="w-4 h-4 text-neon-cyan" />
              <span className="text-neon-cyan text-sm font-medium">Platform Features</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
              Everything You Need
              <br />
              <span className="text-neon-cyan">In One Platform</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              A complete AI-powered content automation suite designed for modern marketers who want to scale their content and dominate AI search results.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-neon-cyan to-electric-blue rounded-xl text-white font-semibold shadow-lg shadow-neon-cyan/25"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/demo">
                <button className="px-8 py-4 text-gray-300 font-semibold hover:text-white transition-colors">
                  Watch Demo
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          {mainFeatures.map((feature, index) => {
            const isEven = index % 2 === 0
            const colors = colorClasses[feature.color]

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 mb-24`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div className={`inline-flex p-3 rounded-xl ${colors.bg} mb-6`}>
                    <feature.icon className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                    {feature.title}
                  </h2>
                  <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {feature.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center gap-3">
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 ${colors.text}`} />
                        <span className="text-gray-300 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div className="flex-1">
                  <div className={`p-8 rounded-2xl ${colors.bg} border ${colors.border}`}>
                    <div className="aspect-video bg-void/50 rounded-xl flex items-center justify-center">
                      <feature.icon className={`w-20 h-20 ${colors.text} opacity-30`} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-24 bg-gradient-to-b from-void via-obsidian/30 to-void">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              And Much More
            </h2>
            <p className="text-gray-400 text-lg">
              Every tool you need, all in one platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-neon-cyan/20 hover:bg-neon-cyan/[0.02] transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-neon-cyan/10 group-hover:bg-neon-cyan/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-neon-cyan" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Start your free 14-day trial today. No credit card required.
            </p>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-neon-cyan to-electric-blue rounded-xl text-white font-bold text-lg shadow-lg shadow-neon-cyan/25"
              >
                Start Free Trial
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Features
