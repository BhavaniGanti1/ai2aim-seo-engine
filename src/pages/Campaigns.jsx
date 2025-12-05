import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, Search, Filter, MoreVertical, Play, Pause, Eye, Edit2, Trash2,
  TrendingUp, Users, DollarSign, Target, Calendar, Clock
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts'
import ChartCard from '../components/ChartCard'
import { campaignData } from '../data/mockData'

const campaignPerformance = [
  { day: 'Mon', campaign1: 120, campaign2: 180, campaign3: 90 },
  { day: 'Tue', campaign1: 150, campaign2: 200, campaign3: 110 },
  { day: 'Wed', campaign1: 180, campaign2: 220, campaign3: 130 },
  { day: 'Thu', campaign1: 140, campaign2: 190, campaign3: 100 },
  { day: 'Fri', campaign1: 200, campaign2: 250, campaign3: 150 },
  { day: 'Sat', campaign1: 90, campaign2: 130, campaign3: 70 },
  { day: 'Sun', campaign1: 70, campaign2: 100, campaign3: 50 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-obsidian/95 backdrop-blur-xl border border-neon-cyan/30 rounded-xl p-4 shadow-lg">
        <p className="text-gray-400 text-sm mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

function CampaignCard({ campaign, index }) {
  const [showMenu, setShowMenu] = useState(false)
  const progressPercent = (campaign.spent / campaign.budget) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-6 relative group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{campaign.name}</h3>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
            campaign.status === 'active' 
              ? 'bg-neon-lime/20 text-neon-lime'
              : campaign.status === 'paused'
              ? 'bg-solar-orange/20 text-solar-orange'
              : 'bg-plasma-purple/20 text-plasma-purple'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              campaign.status === 'active' ? 'bg-neon-lime pulse-dot' :
              campaign.status === 'paused' ? 'bg-solar-orange' : 'bg-plasma-purple'
            }`} />
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </span>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-lg hover:bg-slate-dark transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-48 bg-obsidian border border-slate-dark rounded-xl shadow-lg z-10 overflow-hidden"
              >
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-dark transition-colors">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-dark transition-colors">
                  <Edit2 className="w-4 h-4" />
                  Edit Campaign
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-dark transition-colors">
                  {campaign.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {campaign.status === 'active' ? 'Pause' : 'Resume'}
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-400">Budget Utilization</span>
          <span className="text-white font-medium">{progressPercent.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-slate-dark rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
            className={`h-2 rounded-full ${
              progressPercent > 80 ? 'bg-solar-orange' : 'bg-gradient-to-r from-neon-cyan to-neon-magenta'
            }`}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
          <span>${campaign.spent.toLocaleString()} spent</span>
          <span>${campaign.budget.toLocaleString()} budget</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Users className="w-4 h-4 text-neon-cyan" />
          </div>
          <p className="text-xl font-display font-bold text-white">{campaign.leads}</p>
          <p className="text-xs text-gray-500">Leads</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Target className="w-4 h-4 text-neon-magenta" />
          </div>
          <p className="text-xl font-display font-bold text-white">{campaign.conversion}%</p>
          <p className="text-xs text-gray-500">Conv. Rate</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp className="w-4 h-4 text-neon-lime" />
          </div>
          <p className="text-xl font-display font-bold text-white">{campaign.roi}%</p>
          <p className="text-xs text-gray-500">ROI</p>
        </div>
      </div>
    </motion.div>
  )
}

function Campaigns() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredCampaigns = campaignData.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'all' || campaign.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            Campaigns
          </h1>
          <p className="text-gray-400">
            Manage and monitor your marketing campaigns.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-xl text-void font-semibold hover:shadow-neon-cyan transition-all">
          <Plus className="w-5 h-5" />
          New Campaign
        </button>
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-dark/50 border border-slate-dark rounded-xl text-gray-300 placeholder-gray-500 focus:outline-none focus:border-neon-cyan/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          {['all', 'active', 'paused', 'scheduled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterStatus === status
                  ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                  : 'bg-slate-dark/50 text-gray-400 hover:text-white'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Campaign Performance Chart */}
      <ChartCard title="Campaign Performance" subtitle="Leads generated this week" delay={0.2}>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={campaignPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
              <XAxis dataKey="day" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="campaign1" 
                stroke="#00f5ff" 
                strokeWidth={2}
                dot={{ fill: '#00f5ff', strokeWidth: 2 }}
                name="Summer Sale"
              />
              <Line 
                type="monotone" 
                dataKey="campaign2" 
                stroke="#ff00ff" 
                strokeWidth={2}
                dot={{ fill: '#ff00ff', strokeWidth: 2 }}
                name="Product Launch"
              />
              <Line 
                type="monotone" 
                dataKey="campaign3" 
                stroke="#39ff14" 
                strokeWidth={2}
                dot={{ fill: '#39ff14', strokeWidth: 2 }}
                name="Retargeting"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Campaign Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign, index) => (
          <CampaignCard key={campaign.id} campaign={campaign} index={index} />
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-400">No campaigns found matching your criteria.</p>
        </motion.div>
      )}
    </div>
  )
}

export default Campaigns

