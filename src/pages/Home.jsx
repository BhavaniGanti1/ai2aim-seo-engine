import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Zap, Target, TrendingUp, Users, BarChart3, Brain, Sparkles, 
  ArrowRight, Play, CheckCircle, Star, ChevronRight, Rocket,
  MessageSquare, Mail, Globe, Shield, FileText, Share2,
  Youtube, Twitter, Linkedin, Instagram, Facebook, Rss,
  Bot, PenTool, Send, Eye, Database, Search, Layers
} from 'lucide-react'
import PublicNav from '../components/PublicNav'

const stats = [
  { value: '500%', label: 'Average ROI Increase', icon: TrendingUp },
  { value: '10M+', label: 'Content Pieces Generated', icon: FileText },
  { value: '50K+', label: 'Social Posts Automated', icon: Share2 },
  { value: '99.9%', label: 'Platform Uptime', icon: Shield },
]

const platforms = [
  { name: 'Twitter/X', icon: Twitter, color: '#1DA1F2' },
  { name: 'LinkedIn', icon: Linkedin, color: '#0A66C2' },
  { name: 'Instagram', icon: Instagram, color: '#E4405F' },
  { name: 'Facebook', icon: Facebook, color: '#1877F2' },
  { name: 'YouTube', icon: Youtube, color: '#FF0000' },
  { name: 'Medium', icon: FileText, color: '#00AB6C' },
]

const workflow = [
  {
    phase: 'Content Creation',
    icon: PenTool,
    color: 'cyan',
    steps: ['AI-powered article generation', 'SEO optimization', 'Semantic analysis', 'JSON-LD schema creation']
  },
  {
    phase: 'Multi-Platform Publishing',
    icon: Share2,
    color: 'magenta',
    steps: ['Auto-post to 20+ platforms', 'Platform-specific formatting', 'Scheduled publishing', 'Cross-platform syndication']
  },
  {
    phase: 'AI Visibility',
    icon: Eye,
    color: 'lime',
    steps: ['LLM indexing optimization', 'GPT/Claude/Gemini recognition', 'Entity extraction', 'Knowledge graph building']
  },
  {
    phase: 'Analytics & Growth',
    icon: BarChart3,
    color: 'purple',
    steps: ['Real-time performance tracking', 'AI visibility scoring', 'Engagement analytics', 'ROI measurement']
  },
]

const features = [
  {
    icon: Brain,
    title: 'AI Content Brain',
    description: 'Generate SEO-optimized articles, blog posts, and social content using advanced AI models.',
    tag: 'Core Feature'
  },
  {
    icon: Share2,
    title: 'Auto Social Publishing',
    description: 'Automatically distribute content across Twitter, LinkedIn, Instagram, Facebook, YouTube & more.',
    tag: 'Automation'
  },
  {
    icon: Search,
    title: 'LLM Visibility Engine',
    description: 'Ensure GPT, Claude, Gemini, and Grok can find and reference your content.',
    tag: 'AI Indexing'
  },
  {
    icon: Database,
    title: 'Semantic Embeddings',
    description: 'Store content in vector databases for AI retrieval and enhanced discoverability.',
    tag: 'Advanced'
  },
  {
    icon: Rss,
    title: 'RSS & Sitemap Automation',
    description: 'Auto-generate and submit sitemaps, RSS feeds, and AI artifact files.',
    tag: 'Technical SEO'
  },
  {
    icon: Layers,
    title: 'Multi-Format Conversion',
    description: 'Convert articles to podcasts, videos, social posts, and newsletter content.',
    tag: 'Content Repurposing'
  },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Head of Content, TechFlow',
    content: 'AI2Aim reduced our content production time by 80%. Our articles now rank on Google AND get cited by ChatGPT.',
    rating: 5
  },
  {
    name: 'Marcus Johnson',
    role: 'Growth Lead, ScaleUp.io',
    content: 'The auto-publishing feature is a game-changer. One click and our content is everywhere.',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'CMO, Enterprise Corp',
    content: 'Finally, a tool that understands AI visibility. Our brand is now recognized by every major LLM.',
    rating: 5
  },
]

const aiCrawlers = [
  'OpenAI GPT', 'Google Gemini', 'Anthropic Claude', 'xAI Grok', 
  'Perplexity', 'Bing Copilot', 'Meta AI', 'Brave Search'
]

function Home() {
  const [activePhase, setActivePhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % workflow.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-void">
      <PublicNav />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neon-cyan/10 via-void to-void" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
              </span>
              <span className="text-gray-300 text-sm">AI-Powered Content Automation Platform</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight"
            >
              <span className="text-white">Create, Publish &</span>
              <br />
              <span className="bg-gradient-to-r from-neon-cyan via-electric-blue to-neon-magenta bg-clip-text text-transparent">
                Dominate AI Search
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Generate SEO-optimized content, auto-publish to 20+ platforms, and ensure 
              <span className="text-white font-medium"> GPT, Claude, Gemini & Grok </span>
              recognize your brand.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-neon-cyan to-electric-blue rounded-xl text-white font-semibold text-lg shadow-lg shadow-neon-cyan/25 hover:shadow-neon-cyan/40 transition-shadow"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link to="/demo">
                <button className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-semibold hover:bg-white/10 transition-all">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </button>
              </Link>
            </motion.div>

            {/* Platform Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-6 mb-8"
            >
              <span className="text-gray-500 text-sm">Auto-publish to:</span>
              <div className="flex items-center gap-4">
                {platforms.map((platform) => (
                  <div
                    key={platform.name}
                    className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group hover:bg-white/10 transition-colors"
                    title={platform.name}
                  >
                    <platform.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                ))}
                <span className="text-gray-500 text-sm">+14 more</span>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <stat.icon className="w-6 h-6 text-neon-cyan mx-auto mb-3" />
                <p className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-neon-cyan text-sm font-semibold tracking-wider uppercase mb-4 block">
              Complete Workflow
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              From Content to AI Recognition
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our end-to-end pipeline ensures your content gets indexed by every major AI system
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {workflow.map((phase, index) => {
              const colorClasses = {
                cyan: { bg: 'bg-neon-cyan/10', border: 'border-neon-cyan/30', text: 'text-neon-cyan' },
                magenta: { bg: 'bg-neon-magenta/10', border: 'border-neon-magenta/30', text: 'text-neon-magenta' },
                lime: { bg: 'bg-neon-lime/10', border: 'border-neon-lime/30', text: 'text-neon-lime' },
                purple: { bg: 'bg-plasma-purple/10', border: 'border-plasma-purple/30', text: 'text-plasma-purple' },
              }
              const colors = colorClasses[phase.color]
              const isActive = activePhase === index

              return (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActivePhase(index)}
                  className={`relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    isActive 
                      ? `${colors.bg} ${colors.border}` 
                      : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="absolute -top-3 left-6">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                      Phase {index + 1}
                    </span>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4 mt-2`}>
                    <phase.icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{phase.phase}</h3>
                  <ul className="space-y-2">
                    {phase.steps.map((step) => (
                      <li key={step} className="flex items-start gap-2 text-sm text-gray-400">
                        <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isActive ? colors.text : 'text-gray-600'}`} />
                        {step}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* AI Visibility Section */}
      <section className="py-24 bg-gradient-to-b from-void via-obsidian/50 to-void">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-neon-lime text-sm font-semibold tracking-wider uppercase mb-4 block">
                AI Visibility Engine
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                Make LLMs Recognize Your Content
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Our proprietary AI indexing system ensures your content gets discovered by ChatGPT, 
                Claude, Gemini, Grok, and 50+ AI crawlers. We handle schema markup, semantic embeddings, 
                and multi-platform syndication automatically.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'JSON-LD Schema & AI Artifact Generation',
                  'Semantic Embedding Storage (Pinecone, Qdrant)',
                  'OpenGraph, Twitter Card & LinkedIn Card Metadata',
                  'Automated Sitemap & RSS Feed Submission',
                  'AI Visibility Scoring & Monitoring'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-neon-lime/20 flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-neon-lime" />
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/content-engine">
                <button className="flex items-center gap-2 text-neon-cyan font-semibold hover:gap-3 transition-all">
                  Learn about Content Engine
                  <ChevronRight className="w-5 h-5" />
                </button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-obsidian rounded-2xl border border-white/10 p-8">
                <div className="text-sm text-gray-500 mb-4">AI Systems That Index Your Content:</div>
                <div className="grid grid-cols-2 gap-3">
                  {aiCrawlers.map((crawler, index) => (
                    <motion.div
                      key={crawler}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan/20 to-electric-blue/20 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-neon-cyan" />
                      </div>
                      <span className="text-sm text-white font-medium">{crawler}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-xl bg-neon-lime/5 border border-neon-lime/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4 text-neon-lime" />
                    <span className="text-neon-lime text-sm font-semibold">Visibility Score</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '94%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-neon-lime to-neon-cyan rounded-full"
                      />
                    </div>
                    <span className="text-white font-bold">94%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-electric-blue text-sm font-semibold tracking-wider uppercase mb-4 block">
              Platform Features
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Everything You Need to Scale
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A complete content automation suite built for modern marketers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-neon-cyan/30 hover:bg-neon-cyan/[0.02] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan/10 to-electric-blue/10 flex items-center justify-center group-hover:from-neon-cyan/20 group-hover:to-electric-blue/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-neon-cyan" />
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-white/5 px-2 py-1 rounded-full">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-void via-obsidian/30 to-void">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-neon-magenta text-sm font-semibold tracking-wider uppercase mb-4 block">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
              Loved by Content Teams
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-electric-blue flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{testimonial.name}</p>
                    <p className="text-gray-500 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl bg-gradient-to-br from-neon-cyan/10 via-electric-blue/10 to-neon-magenta/10 border border-white/10 p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                Ready to Automate Your Content?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of marketers using AI2AIM to create, publish, and dominate AI search results.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-8 py-4 bg-white text-void font-bold rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    Start Free Trial
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link to="/contact">
                  <button className="px-8 py-4 text-white font-semibold hover:text-neon-cyan transition-colors">
                    Talk to Sales
                  </button>
                </Link>
              </div>
              <p className="text-gray-500 text-sm mt-6">No credit card required • 14-day free trial</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-electric-blue flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="font-display font-bold text-xl text-white">AI2AIM</span>
              </div>
              <p className="text-gray-500 text-sm max-w-xs">
                The AI-powered content automation platform for modern marketers.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/content-engine" className="hover:text-white transition-colors">Content Engine</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/demo" className="hover:text-white transition-colors">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">© 2024 AI2AIM. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {[Twitter, Linkedin, Youtube].map((Icon, index) => (
                <a key={index} href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
