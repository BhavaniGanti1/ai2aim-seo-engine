import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, ChevronLeft, ChevronRight, TrendingUp, PenTool, Zap,
  CheckCircle, Search, Send, Loader2, Copy, RefreshCw, Check,
  Twitter, Linkedin, Instagram, Facebook, Youtube, FileText,
  MessageSquare, Globe, Share2, Users, Star,
  Calendar, AlertCircle, X, LogIn, Server, Wifi, WifiOff, Link2, Unlink
} from 'lucide-react'
import { 
  checkBackendHealth, 
  getUserConnections, 
  connectPlatform, 
  generateContent, 
  postToPlatform,
  getCurrentUserId 
} from '../services/oauth'

const trendingTopics = [
  {
    category: 'SEO',
    title: 'Local SEO Optimization for 2025',
    description: 'New Google algorithm updates favor local businesses with fresh, schema-rich content.',
  },
  {
    category: 'AI Marketing',
    title: 'How AI is Transforming Content Creation',
    description: 'Leverage AI tools to create personalized, engaging content at scale.',
  },
  {
    category: 'Social Media',
    title: 'LinkedIn Algorithm Changes 2025',
    description: 'New engagement patterns and content formats that drive visibility.',
  },
  {
    category: 'Content Strategy',
    title: 'Video-First Content Strategies',
    description: 'Short-form video dominates social platforms with 3x engagement rates.',
  },
]

const socialPlatforms = [
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#0A66C2', maxLength: 3000 },
  { id: 'twitter', name: 'Twitter/X', icon: Twitter, color: '#1DA1F2', maxLength: 280 },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: '#1877F2' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E4405F', requiresMedia: true },
  { id: 'youtube', name: 'YouTube', icon: Youtube, color: '#FF0000', comingSoon: true },
  { id: 'medium', name: 'Medium', icon: FileText, color: '#00AB6C', comingSoon: true },
  { id: 'threads', name: 'Threads', icon: MessageSquare, color: '#000000', comingSoon: true },
  { id: 'reddit', name: 'Reddit', icon: Globe, color: '#FF4500', comingSoon: true },
]

// Helper function to strip markdown
const stripMarkdown = (text) => {
  return text
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^[-*+]\s+/gm, '• ')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/^>\s+/gm, '')
    .replace(/---+/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function ContentStudio() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentTopic, setCurrentTopic] = useState(0)
  const [ideaText, setIdeaText] = useState('')
  const [selectedIdea, setSelectedIdea] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState(null)
  const [seoOptimized, setSeoOptimized] = useState(true)
  const [selectedPlatforms, setSelectedPlatforms] = useState([])
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishResults, setPublishResults] = useState({})
  const [copied, setCopied] = useState(false)
  const [backendStatus, setBackendStatus] = useState('checking')
  const [connections, setConnections] = useState({})
  const [isLoadingConnections, setIsLoadingConnections] = useState(true)
  const [connectingPlatform, setConnectingPlatform] = useState(null)
  const [notification, setNotification] = useState(null)

  // Check for OAuth callback params
  useEffect(() => {
    const connected = searchParams.get('connected')
    const error = searchParams.get('error')
    const name = searchParams.get('name')
    
    if (connected) {
      setNotification({
        type: 'success',
        message: `Successfully connected to ${connected}${name ? ` as ${name}` : ''}!`
      })
      // Refresh connections
      loadConnections()
      // Clear URL params
      setSearchParams({})
    }
    
    if (error) {
      setNotification({
        type: 'error',
        message: `Connection failed: ${error}`
      })
      setSearchParams({})
    }
  }, [searchParams, setSearchParams])

  // Auto-hide notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  // Check backend and load connections
  useEffect(() => {
    const init = async () => {
      const healthy = await checkBackendHealth()
      setBackendStatus(healthy ? 'online' : 'offline')
      
      if (healthy) {
        await loadConnections()
      }
    }
    init()
    
    // Refresh every 30 seconds
    const interval = setInterval(init, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadConnections = async () => {
    setIsLoadingConnections(true)
    try {
      const conns = await getUserConnections()
      setConnections(conns)
      
      // Auto-select connected platforms
      const connectedPlatforms = Object.entries(conns)
        .filter(([_, connected]) => connected)
        .map(([platform]) => platform)
      setSelectedPlatforms(connectedPlatforms)
    } catch (error) {
      console.error('Failed to load connections:', error)
    }
    setIsLoadingConnections(false)
  }

  const handleConnect = (platform) => {
    setConnectingPlatform(platform)
    connectPlatform(platform)
  }

  const nextTopic = () => setCurrentTopic((prev) => (prev + 1) % trendingTopics.length)
  const prevTopic = () => setCurrentTopic((prev) => (prev - 1 + trendingTopics.length) % trendingTopics.length)

  const handleCreateIdea = () => {
    if (ideaText.trim()) {
      setSelectedIdea({ title: ideaText, category: 'Custom' })
      setGeneratedContent(null)
      setPublishResults({})
    }
  }

  const handleSelectTrending = () => {
    setSelectedIdea(trendingTopics[currentTopic])
    setIdeaText(trendingTopics[currentTopic].title)
    setGeneratedContent(null)
    setPublishResults({})
  }

  const handleGenerate = async () => {
    if (!selectedIdea) return
    
    if (backendStatus !== 'online') {
      setNotification({ type: 'error', message: 'Backend server is not running!' })
      return
    }
    
    setIsGenerating(true)
    setGeneratedContent(null)
    setPublishResults({})
    
    try {
      const result = await generateContent(selectedIdea.title, seoOptimized, 'linkedin')
      
      setGeneratedContent({
        title: selectedIdea.title,
        rawContent: result.content,
        content: stripMarkdown(result.content),
        seoScore: result.seoScore,
        readability: result.readability,
        keywords: result.keywords,
        wordCount: result.wordCount,
      })
    } catch (error) {
      setNotification({ type: 'error', message: error.message })
    }
    
    setIsGenerating(false)
  }

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const togglePlatform = (platformId) => {
    const platform = socialPlatforms.find(p => p.id === platformId)
    if (platform?.comingSoon) return
    
    // Check if connected
    if (!connections[platformId]) {
      // Not connected - start OAuth
      handleConnect(platformId)
      return
    }

    // Clear previous results for this platform
    setPublishResults(prev => {
      const newResults = { ...prev }
      delete newResults[platformId]
      return newResults
    })

    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    )
  }

  const handlePublish = async () => {
    if (!generatedContent || selectedPlatforms.length === 0) return
    
    if (backendStatus !== 'online') {
      setNotification({ type: 'error', message: 'Backend server is not running!' })
      return
    }
    
    setIsPublishing(true)
    // Don't clear all results - keep previous publish results visible
    
    let successfulPosts = 0
    let failedPosts = 0
    
    for (const platformId of selectedPlatforms) {
      // Check if connected
      if (!connections[platformId]) {
        setPublishResults(prev => ({
          ...prev,
          [platformId]: { success: false, error: 'Not connected', needsAuth: true }
        }))
        failedPosts++
        continue
      }
      
      try {
        setPublishResults(prev => ({ ...prev, [platformId]: { status: 'publishing' } }))
        
        const result = await postToPlatform(platformId, generatedContent.content)
        
        if (result.needsAuth) {
          setPublishResults(prev => ({
            ...prev,
            [platformId]: { success: false, needsAuth: true, error: 'Please reconnect' }
          }))
          failedPosts++
        } else {
          setPublishResults(prev => ({
            ...prev,
            [platformId]: { success: true, ...result }
          }))
          successfulPosts++
        }
      } catch (error) {
        setPublishResults(prev => ({
          ...prev,
          [platformId]: { success: false, error: error.message }
        }))
        failedPosts++
      }
    }
    
    setIsPublishing(false)
    
    // Show success notification
    if (successfulPosts > 0) {
      setNotification({
        type: 'success',
        message: `🎉 Successfully published to ${successfulPosts} platform${successfulPosts > 1 ? 's' : ''}!${failedPosts > 0 ? ` (${failedPosts} failed)` : ''}`
      })
    } else if (failedPosts > 0) {
      setNotification({
        type: 'error',
        message: `Failed to publish. Please check your connections.`
      })
    }
  }

  const connectedCount = Object.values(connections).filter(Boolean).length
  const successCount = Object.values(publishResults).filter(r => r.success).length

  return (
    <div className="space-y-6">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg ${
              notification.type === 'success' 
                ? 'bg-neon-lime/20 border border-neon-lime/50 text-neon-lime'
                : 'bg-red-500/20 border border-red-500/50 text-red-400'
            }`}
          >
            <div className="flex items-center gap-3">
              {notification.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span>{notification.message}</span>
              <button onClick={() => setNotification(null)} className="ml-2">
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Content Studio</h1>
          <p className="text-gray-400">Create, optimize, and publish content across all platforms</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm ${
            backendStatus === 'online' 
              ? 'bg-neon-lime/10 border border-neon-lime/30 text-neon-lime'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}>
            {backendStatus === 'online' ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            {backendStatus === 'online' ? 'Backend Online' : 'Backend Offline'}
          </div>
        </div>
      </motion.div>

      {/* Backend Warning */}
      {backendStatus === 'offline' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <Server className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-red-400 font-semibold mb-1">Backend Server Not Running</h4>
              <p className="text-gray-400 text-sm mb-2">Start the backend server:</p>
              <code className="block p-2 bg-void rounded text-neon-cyan text-sm">
                cd server && npm install && node server.js
              </code>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Trending Topics */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Trending Topics</h2>
            
            <div className="relative">
              <div className="mb-4">
                <span className="text-xs font-semibold text-neon-cyan uppercase tracking-wider">
                  {trendingTopics[currentTopic].category}
                </span>
                <h3 className="text-lg font-semibold text-white mt-1">{trendingTopics[currentTopic].title}</h3>
                <p className="text-gray-400 text-sm mt-2">{trendingTopics[currentTopic].description}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <button onClick={prevTopic} className="p-2 rounded-lg hover:bg-white/5"><ChevronLeft className="w-5 h-5 text-gray-400" /></button>
                <div className="flex items-center gap-2">
                  {trendingTopics.map((_, index) => (
                    <button key={index} onClick={() => setCurrentTopic(index)}
                      className={`w-2 h-2 rounded-full ${index === currentTopic ? 'bg-neon-cyan' : 'bg-gray-600'}`} />
                  ))}
                </div>
                <button onClick={nextTopic} className="p-2 rounded-lg hover:bg-white/5"><ChevronRight className="w-5 h-5 text-gray-400" /></button>
              </div>
              
              <button onClick={handleSelectTrending} className="w-full mt-4 py-2 text-sm text-neon-cyan border border-neon-cyan/30 rounded-lg hover:bg-neon-cyan/10">
                Use This Topic
              </button>
            </div>
          </motion.div>

          {/* Idea Composer */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-neon-magenta" />
              <h2 className="text-lg font-semibold text-white">Idea Composer</h2>
            </div>
            
            <textarea
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              placeholder="What content do you want to create?"
              className="w-full h-32 px-4 py-3 bg-slate-dark/50 border border-slate-dark rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan/50 resize-none"
            />
            
            <button onClick={handleCreateIdea} disabled={!ideaText.trim()}
              className="w-full mt-4 py-3 bg-gradient-to-r from-neon-cyan to-electric-blue rounded-xl text-white font-semibold disabled:opacity-50">
              Create Idea
            </button>
          </motion.div>
        </div>

        {/* Middle Column - Content Generator */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Content Generator</h2>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={seoOptimized} onChange={(e) => setSeoOptimized(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-600 bg-slate-dark text-neon-cyan" />
                  <span className="flex items-center gap-1 text-sm text-gray-400"><Search className="w-4 h-4" />SEO</span>
                </label>
                <button onClick={handleGenerate} disabled={!selectedIdea || isGenerating}
                  className="px-4 py-2 bg-neon-cyan rounded-lg text-void font-semibold text-sm disabled:opacity-50 flex items-center gap-2">
                  {isGenerating ? <><Loader2 className="w-4 h-4 animate-spin" />Generating...</> : 'Generate All'}
                </button>
              </div>
            </div>

            {!selectedIdea && !generatedContent && (
              <div className="py-12 text-center text-gray-500">Select an idea to generate content</div>
            )}

            {selectedIdea && !generatedContent && !isGenerating && (
              <div className="py-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-neon-cyan/10 flex items-center justify-center mx-auto mb-4">
                  <PenTool className="w-8 h-8 text-neon-cyan" />
                </div>
                <h3 className="text-white font-medium mb-2">Ready to Generate</h3>
                <p className="text-gray-400 text-sm mb-4">"{selectedIdea.title}"</p>
                <button onClick={handleGenerate} className="px-6 py-2 bg-neon-cyan rounded-lg text-void font-semibold text-sm">
                  Generate Content
                </button>
              </div>
            )}

            {isGenerating && (
              <div className="py-12 text-center">
                <Loader2 className="w-12 h-12 text-neon-cyan animate-spin mx-auto mb-4" />
                <h3 className="text-white font-medium">Generating with AI...</h3>
              </div>
            )}

            {generatedContent && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-neon-lime" />
                    <span className="text-neon-lime font-medium">Content Generated</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={handleCopy} className="p-2 rounded-lg hover:bg-white/5">
                      {copied ? <Check className="w-4 h-4 text-neon-lime" /> : <Copy className="w-4 h-4 text-gray-400" />}
                    </button>
                    <button onClick={handleGenerate} className="p-2 rounded-lg hover:bg-white/5">
                      <RefreshCw className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-dark/50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-neon-cyan">{generatedContent.seoScore}</p>
                    <p className="text-xs text-gray-500">SEO Score</p>
                  </div>
                  <div className="p-3 bg-slate-dark/50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-neon-lime">{generatedContent.readability}</p>
                    <p className="text-xs text-gray-500">Readability</p>
                  </div>
                  <div className="p-3 bg-slate-dark/50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-white">{generatedContent.wordCount}</p>
                    <p className="text-xs text-gray-500">Words</p>
                  </div>
                </div>

                <div className="max-h-48 overflow-y-auto p-4 bg-slate-dark/30 rounded-xl">
                  <p className="text-sm text-gray-300 whitespace-pre-wrap">{generatedContent.content}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {generatedContent.keywords.map((keyword) => (
                    <span key={keyword} className="px-2 py-1 bg-neon-cyan/10 text-neon-cyan text-xs rounded-full">{keyword}</span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Publish Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Publish</h2>
              <span className="text-xs text-neon-lime">{connectedCount} Connected</span>
            </div>
            
            {!generatedContent ? (
              <div className="py-8 text-center text-gray-500">Generate content first to publish</div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-400 text-sm">Click to connect or select platforms:</p>
                
                <div className="grid grid-cols-4 gap-3">
                  {socialPlatforms.map((platform) => {
                    const isConnected = connections[platform.id]
                    const isSelected = selectedPlatforms.includes(platform.id)
                    const result = publishResults[platform.id]
                    
                    return (
                      <button
                        key={platform.id}
                        onClick={() => togglePlatform(platform.id)}
                        disabled={isPublishing || platform.comingSoon}
                        className={`relative p-3 rounded-xl border transition-all ${
                          platform.comingSoon
                            ? 'bg-slate-dark/20 border-slate-dark/30 opacity-40 cursor-not-allowed'
                            : result?.success
                            ? 'bg-neon-lime/10 border-neon-lime/50'
                            : result?.success === false
                            ? 'bg-red-500/10 border-red-500/50'
                            : isConnected && isSelected
                            ? 'bg-white/5 border-neon-cyan/50'
                            : isConnected
                            ? 'bg-slate-dark/30 border-neon-lime/30 hover:border-neon-lime/50'
                            : 'bg-slate-dark/20 border-slate-dark/50 hover:border-gray-500'
                        }`}
                      >
                        {/* Status indicators */}
                        {result?.status === 'publishing' && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-cyan rounded-full flex items-center justify-center">
                            <Loader2 className="w-3 h-3 text-void animate-spin" />
                          </div>
                        )}
                        {result?.success && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-lime rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-void" />
                          </div>
                        )}
                        {result?.success === false && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <X className="w-3 h-3 text-white" />
                          </div>
                        )}
                        {platform.comingSoon && (
                          <div className="absolute -top-1 -right-1 px-1 bg-gray-600 rounded text-[8px] text-white">Soon</div>
                        )}
                        {!isConnected && !platform.comingSoon && !result && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                            <Link2 className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                        
                        <platform.icon 
                          className="w-5 h-5 mx-auto mb-1"
                          style={{ color: isConnected ? platform.color : '#666' }}
                        />
                        <p className="text-xs text-center text-gray-400 truncate">
                          {isConnected ? platform.name : 'Connect'}
                        </p>
                      </button>
                    )
                  })}
                </div>

                {/* Connection hint */}
                {connectedCount === 0 && (
                  <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                    <p className="text-orange-400 text-sm flex items-center gap-2">
                      <LogIn className="w-4 h-4" />
                      Click any platform to connect your account
                    </p>
                  </div>
                )}

                {/* Publish Results */}
                {Object.keys(publishResults).length > 0 && (
                  <div className="space-y-2 mt-4">
                    <h4 className="text-sm font-semibold text-white mb-2">Publishing Results:</h4>
                    {Object.entries(publishResults).map(([platformId, result]) => {
                      const platform = socialPlatforms.find(p => p.id === platformId)
                      if (!platform || result.status === 'publishing') return null
                      
                      return (
                        <motion.div 
                          key={platformId}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`p-4 rounded-xl flex items-center justify-between ${
                            result.success 
                              ? 'bg-gradient-to-r from-neon-lime/20 to-neon-cyan/10 border border-neon-lime/40' 
                              : 'bg-red-500/10 border border-red-500/30'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              result.success ? 'bg-neon-lime/20' : 'bg-red-500/20'
                            }`}>
                              {result.success 
                                ? <CheckCircle className="w-5 h-5 text-neon-lime" /> 
                                : <X className="w-5 h-5 text-red-400" />
                              }
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-white block">{platform.name}</span>
                              <span className={`text-xs ${result.success ? 'text-neon-lime' : 'text-red-400'}`}>
                                {result.success ? '✓ Published successfully!' : result.error || 'Failed'}
                              </span>
                            </div>
                          </div>
                          {result.success && result.url && (
                            <a 
                              href={result.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="px-4 py-2 bg-neon-cyan/20 text-neon-cyan text-sm font-semibold rounded-lg hover:bg-neon-cyan/30 transition-colors flex items-center gap-2"
                            >
                              View Post <Share2 className="w-4 h-4" />
                            </a>
                          )}
                          {!result.success && result.needsAuth && (
                            <button 
                              onClick={() => handleConnect(platformId)} 
                              className="px-4 py-2 bg-orange-500/20 text-orange-400 text-sm font-semibold rounded-lg hover:bg-orange-500/30"
                            >
                              Reconnect
                            </button>
                          )}
                        </motion.div>
                      )
                    })}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePublish}
                    disabled={selectedPlatforms.filter(p => connections[p]).length === 0 || isPublishing}
                    className="flex-1 py-3 bg-gradient-to-r from-neon-lime to-neon-cyan rounded-xl text-void font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isPublishing ? (
                      <><Loader2 className="w-5 h-5 animate-spin" />Publishing...</>
                    ) : successCount > 0 ? (
                      <><Check className="w-5 h-5" />Published to {successCount} Platform{successCount > 1 ? 's' : ''}</>
                    ) : (
                      <><Send className="w-5 h-5" />Publish to {selectedPlatforms.filter(p => connections[p]).length} Platform{selectedPlatforms.filter(p => connections[p]).length !== 1 ? 's' : ''}</>
                    )}
                  </button>
                  
                  <button className="p-3 rounded-xl border border-slate-dark hover:border-white/20" title="Schedule">
                    <Calendar className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Column - AI Score */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-neon-cyan" />
                <h2 className="text-lg font-semibold text-white">AI2AimScore</h2>
              </div>
              <span className="px-2 py-1 bg-neon-cyan/10 text-neon-cyan text-xs font-semibold rounded">Pro</span>
            </div>

            <div className="relative w-40 h-40 mx-auto mb-6">
              <svg className="w-full h-full -rotate-90">
                <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <circle cx="80" cy="80" r="70" fill="none" stroke="url(#scoreGradient)" strokeWidth="8"
                  strokeLinecap="round" strokeDasharray={`${(72 / 100) * 440} 440`} />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#39ff14" />
                    <stop offset="100%" stopColor="#00f5ff" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-display font-bold text-neon-lime">72</span>
                <span className="text-gray-500 text-sm">Overall</span>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Trust', value: 80, color: '#00f5ff' },
                { label: 'Presence', value: 68, color: '#39ff14' },
                { label: 'Recency', value: 65, color: '#39ff14' },
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-400 text-sm">{metric.label}</span>
                    <span className="font-semibold" style={{ color: metric.color }}>{metric.value}</span>
                  </div>
                  <div className="h-2 bg-slate-dark rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${metric.value}%` }}
                      transition={{ duration: 1, delay: 0.5 }} className="h-full rounded-full" style={{ backgroundColor: metric.color }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Connected Accounts */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-neon-magenta" />
                <h2 className="text-lg font-semibold text-white">Connected Accounts</h2>
              </div>
              <button onClick={loadConnections} className="p-1 rounded hover:bg-white/5">
                <RefreshCw className={`w-4 h-4 text-gray-400 ${isLoadingConnections ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {isLoadingConnections ? (
              <div className="py-4 text-center">
                <Loader2 className="w-6 h-6 text-neon-cyan animate-spin mx-auto" />
              </div>
            ) : (
              <div className="space-y-2">
                {socialPlatforms.filter(p => !p.comingSoon).map((platform) => {
                  const isConnected = connections[platform.id]
                  
                  return (
                    <div key={platform.id} className="flex items-center justify-between p-3 bg-slate-dark/30 rounded-xl">
                      <div className="flex items-center gap-3">
                        <platform.icon className="w-5 h-5" style={{ color: isConnected ? platform.color : '#666' }} />
                        <span className="text-white text-sm">{platform.name}</span>
                      </div>
                      {isConnected ? (
                        <span className="text-xs text-neon-lime flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Connected
                        </span>
                      ) : (
                        <button onClick={() => handleConnect(platform.id)}
                          className="text-xs text-neon-cyan hover:underline flex items-center gap-1">
                          <LogIn className="w-3 h-3" /> Connect
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ContentStudio
