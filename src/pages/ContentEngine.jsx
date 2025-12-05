import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FileText, Share2, Eye, BarChart3, CheckCircle, ArrowRight,
  PenTool, Bot, Rss, Database, Globe, Search, Zap,
  Twitter, Linkedin, Instagram, Facebook, Youtube, 
  Podcast, BookOpen, MessageSquare, Send, Code, Link2,
  RefreshCw, Clock, Target, Layers, ChevronRight
} from 'lucide-react'
import PublicNav from '../components/PublicNav'

const phases = [
  {
    number: '01',
    title: 'Content Preparation',
    subtitle: 'AI-Optimized Creation',
    icon: PenTool,
    color: 'cyan',
    steps: [
      { title: 'AI Article Generation', desc: 'Generate SEO-optimized articles using GPT-4, Claude, or custom models' },
      { title: 'Semantic Analysis', desc: 'Extract entities, keywords, and topic relationships automatically' },
      { title: 'JSON-LD Schema', desc: 'Auto-generate Article/BlogPosting schema with all required fields' },
      { title: 'AI Artifact Files', desc: 'Create YAML/JSON artifacts for LLM training signals' },
      { title: 'Vector Embeddings', desc: 'Store in Pinecone, Qdrant, or Weaviate for AI retrieval' },
    ]
  },
  {
    number: '02',
    title: 'Website Deployment',
    subtitle: 'Technical SEO Setup',
    icon: Globe,
    color: 'blue',
    steps: [
      { title: 'Clean URL Publishing', desc: 'Publish with SEO-friendly URLs and SSL enabled' },
      { title: 'Schema Attachment', desc: 'Inject JSON-LD schema into HTML head automatically' },
      { title: 'Social Metadata', desc: 'Add OpenGraph, Twitter Card, and LinkedIn Card tags' },
      { title: 'Sitemap Generation', desc: 'Auto-generate and submit sitemap.xml, RSS, and Atom feeds' },
      { title: 'Performance Optimization', desc: 'Ensure page load < 2 seconds for crawler efficiency' },
    ]
  },
  {
    number: '03',
    title: 'Cross-Platform Publishing',
    subtitle: 'Authority Boost',
    icon: Share2,
    color: 'magenta',
    steps: [
      { title: 'Authority Platforms', desc: 'Auto-post to Medium, LinkedIn Articles, Substack, Dev.to, Hackernoon' },
      { title: 'Social Networks', desc: 'Distribute to Twitter/X, Threads, Instagram, Facebook, TikTok, Pinterest' },
      { title: 'Podcast Conversion', desc: 'Convert to audio for Apple Podcasts, Spotify, Google Podcasts' },
      { title: 'Video Descriptions', desc: 'Create YouTube descriptions and video metadata' },
      { title: 'Community Posts', desc: 'Share to Reddit, Quora Spaces, Skool communities' },
    ]
  },
  {
    number: '04',
    title: 'Search & AI Submission',
    subtitle: 'Crawler Registration',
    icon: Search,
    color: 'lime',
    steps: [
      { title: 'Google Search Console', desc: 'Submit to Google for Gemini ingestion' },
      { title: 'Bing Webmaster', desc: 'Feed Copilot, ChatGPT, and OpenAI Search' },
      { title: 'Brave Search API', desc: 'Influence Claude, Perplexity, and DuckDuckGo' },
      { title: 'RSS Aggregators', desc: 'Submit feeds to major aggregators for multi-LLM indexing' },
      { title: 'AI Crawler Whitelist', desc: 'Configure robots.txt for optimal AI crawler access' },
    ]
  },
  {
    number: '05',
    title: 'AI Visibility Testing',
    subtitle: 'LLM Recognition',
    icon: Eye,
    color: 'purple',
    steps: [
      { title: 'Automated LLM Queries', desc: 'Test "What is [Brand]?" across GPT, Claude, Gemini, Grok' },
      { title: 'Visibility Scoring', desc: 'Get index status, relevance score, and confidence metrics' },
      { title: 'Entity Verification', desc: 'Confirm semantic anchors and topic weighting' },
      { title: 'Gap Analysis', desc: 'Identify missing entities and authority gaps' },
      { title: 'Recommendations', desc: 'Get actionable steps to improve AI recognition' },
    ]
  },
  {
    number: '06',
    title: 'Authority Boosting',
    subtitle: 'If Low Visibility',
    icon: Target,
    color: 'orange',
    steps: [
      { title: 'Backlink Generation', desc: 'Press releases, guest posts, forum posts, industry directories' },
      { title: 'Internal Linking', desc: 'Auto-add 3-5 internal links to boost article authority' },
      { title: 'Supporting Content', desc: 'Create related articles for entity reinforcement' },
      { title: 'Glossary Terms', desc: 'Add branded terms for anchor text indexing' },
      { title: 'Explainer Videos', desc: 'Generate video content for YouTube transcript indexing' },
    ]
  },
]

const socialPlatforms = [
  { name: 'Twitter/X', icon: Twitter, category: 'Social' },
  { name: 'LinkedIn', icon: Linkedin, category: 'Social' },
  { name: 'Instagram', icon: Instagram, category: 'Social' },
  { name: 'Facebook', icon: Facebook, category: 'Social' },
  { name: 'YouTube', icon: Youtube, category: 'Video' },
  { name: 'Medium', icon: BookOpen, category: 'Blog' },
  { name: 'Substack', icon: FileText, category: 'Blog' },
  { name: 'Dev.to', icon: Code, category: 'Blog' },
  { name: 'Threads', icon: MessageSquare, category: 'Social' },
  { name: 'Pinterest', icon: Share2, category: 'Social' },
  { name: 'Reddit', icon: MessageSquare, category: 'Community' },
  { name: 'Quora', icon: MessageSquare, category: 'Community' },
  { name: 'Spotify', icon: Podcast, category: 'Podcast' },
  { name: 'Apple Podcasts', icon: Podcast, category: 'Podcast' },
  { name: 'TikTok', icon: Share2, category: 'Video' },
  { name: 'Hackernoon', icon: FileText, category: 'Blog' },
]

const aiCrawlers = [
  { name: 'OpenAI GPT', type: 'LLM' },
  { name: 'Google Gemini', type: 'LLM' },
  { name: 'Anthropic Claude', type: 'LLM' },
  { name: 'xAI Grok', type: 'LLM' },
  { name: 'Perplexity', type: 'Search' },
  { name: 'Bing Copilot', type: 'LLM' },
  { name: 'Brave Search', type: 'Search' },
  { name: 'Googlebot', type: 'Crawler' },
  { name: 'Bingbot', type: 'Crawler' },
  { name: 'Meta AI', type: 'LLM' },
  { name: 'DuckDuckGo', type: 'Search' },
  { name: 'Common Crawl', type: 'Crawler' },
]

function ContentEngine() {
  const [activePhase, setActivePhase] = useState(0)

  const colorClasses = {
    cyan: { bg: 'bg-neon-cyan', text: 'text-neon-cyan', border: 'border-neon-cyan', light: 'bg-neon-cyan/10' },
    blue: { bg: 'bg-electric-blue', text: 'text-electric-blue', border: 'border-electric-blue', light: 'bg-electric-blue/10' },
    magenta: { bg: 'bg-neon-magenta', text: 'text-neon-magenta', border: 'border-neon-magenta', light: 'bg-neon-magenta/10' },
    lime: { bg: 'bg-neon-lime', text: 'text-neon-lime', border: 'border-neon-lime', light: 'bg-neon-lime/10' },
    purple: { bg: 'bg-plasma-purple', text: 'text-plasma-purple', border: 'border-plasma-purple', light: 'bg-plasma-purple/10' },
    orange: { bg: 'bg-solar-orange', text: 'text-solar-orange', border: 'border-solar-orange', light: 'bg-solar-orange/10' },
  }

  return (
    <div className="min-h-screen bg-void">
      <PublicNav />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-electric-blue/10 via-void to-void" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/30 mb-6">
              <Zap className="w-4 h-4 text-electric-blue" />
              <span className="text-electric-blue text-sm font-medium">Content Automation Engine</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
              Complete AI Content
              <br />
              <span className="text-electric-blue">Workflow System</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              From content creation to AI recognition - our 6-phase workflow ensures your articles 
              get indexed by every major LLM including GPT, Claude, Gemini, and Grok.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3 bg-electric-blue rounded-xl text-white font-semibold"
                >
                  Start Creating
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/demo">
                <button className="px-6 py-3 text-gray-300 font-medium hover:text-white transition-colors">
                  See Demo
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Workflow Phases */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-neon-cyan text-sm font-semibold tracking-wider uppercase mb-4 block">
              6-Phase Workflow
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              How Content Gets AI-Indexed
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The exact process used by major corporations to ensure LLMs recognize their content
            </p>
          </motion.div>

          {/* Phase Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {phases.map((phase, index) => {
              const colors = colorClasses[phase.color]
              return (
                <button
                  key={phase.number}
                  onClick={() => setActivePhase(index)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activePhase === index
                      ? `${colors.light} ${colors.text} border ${colors.border}/30`
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <span className="text-xs font-bold">{phase.number}</span>
                  <span className="hidden sm:inline">{phase.title}</span>
                </button>
              )
            })}
          </div>

          {/* Active Phase Content */}
          <motion.div
            key={activePhase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          >
            {/* Phase Info */}
            <div>
              {(() => {
                const phase = phases[activePhase]
                const colors = colorClasses[phase.color]
                return (
                  <div className={`p-8 rounded-2xl ${colors.light} border ${colors.border}/20`}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-2xl ${colors.bg}/20 flex items-center justify-center`}>
                        <phase.icon className={`w-8 h-8 ${colors.text}`} />
                      </div>
                      <div>
                        <span className={`text-sm font-bold ${colors.text}`}>Phase {phase.number}</span>
                        <h3 className="text-2xl font-display font-bold text-white">{phase.title}</h3>
                        <p className="text-gray-400">{phase.subtitle}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {phase.steps.map((step, index) => (
                        <motion.div
                          key={step.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-4 rounded-xl bg-void/50"
                        >
                          <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${colors.text}`} />
                          <div>
                            <h4 className="text-white font-medium">{step.title}</h4>
                            <p className="text-gray-400 text-sm">{step.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              })()}
            </div>

            {/* Visual */}
            <div className="space-y-6">
              {/* Code Preview */}
              <div className="rounded-2xl bg-obsidian border border-white/10 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-gray-500 text-sm">ai-artifact.yaml</span>
                </div>
                <pre className="p-4 text-sm overflow-x-auto">
                  <code className="text-gray-300">
{`aiartifact:
  type: article
  version: 1.0
  canonical_url: https://ai2aim.com/blog/post
  title: "AI Marketing Automation Guide"
  
  key_entities:
    - AI2Aim
    - marketing automation
    - AI visibility
    - content optimization
    
  semantic_hints:
    - topic: "AI-powered marketing"
    - industry: "MarTech"
    - audience: "marketers"
    
  schema_type: BlogPosting
  author: "AI2Aim Team"
  date_published: "2024-01-15"`}
                  </code>
                </pre>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-3xl font-display font-bold text-neon-cyan">50+</p>
                  <p className="text-gray-500 text-sm">AI Crawlers Supported</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-3xl font-display font-bold text-neon-lime">20+</p>
                  <p className="text-gray-500 text-sm">Publishing Platforms</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-24 bg-gradient-to-b from-void via-obsidian/50 to-void">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-neon-magenta text-sm font-semibold tracking-wider uppercase mb-4 block">
              Auto-Publishing
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              One Click, Everywhere
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Automatically distribute your content to 20+ platforms with platform-specific formatting
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {socialPlatforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-neon-cyan/30 hover:bg-neon-cyan/5 transition-all group"
              >
                <platform.icon className="w-6 h-6 text-gray-400 group-hover:text-neon-cyan transition-colors" />
                <span className="text-xs text-gray-500 group-hover:text-white transition-colors">{platform.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Crawlers */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-neon-lime text-sm font-semibold tracking-wider uppercase mb-4 block">
                AI Crawler Support
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                50+ AI Indexing Pipelines
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                We support all major AI crawlers including mainstream LLMs, social AI crawlers, 
                content platform crawlers, podcast crawlers, and knowledge graph builders.
              </p>
              <div className="space-y-3">
                {[
                  'Mainstream AI Crawlers (OpenAI, Google, Anthropic)',
                  'Social AI Crawlers (X/Grok, Meta AI, TikTok)',
                  'Content Platform Crawlers (Medium, Substack, Ghost)',
                  'Podcast & Audio Crawlers (Spotify, Apple, Audible)',
                  'Knowledge Graph Builders (Schema.org, Wikidata)'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-neon-lime flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {aiCrawlers.map((crawler, index) => (
                  <motion.div
                    key={crawler.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="w-4 h-4 text-neon-cyan" />
                      <span className="text-xs text-gray-500">{crawler.type}</span>
                    </div>
                    <p className="text-white font-medium text-sm">{crawler.name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to Automate Your Content?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Start creating AI-optimized content that gets recognized by every major LLM.
            </p>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-neon-cyan to-electric-blue rounded-xl text-white font-bold text-lg shadow-lg shadow-neon-cyan/25"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <p className="text-gray-500 text-sm mt-4">No credit card required • 14-day free trial</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ContentEngine

