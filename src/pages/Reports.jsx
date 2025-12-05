import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, Download, Calendar, Filter, TrendingUp, TrendingDown,
  PieChart as PieIcon, BarChart2, Activity, Mail, Share2
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ComposedChart, Bar, Line, Legend
} from 'recharts'
import ChartCard from '../components/ChartCard'
import { emailStats, contentData, revenueData } from '../data/mockData'

const reportTemplates = [
  { id: 1, name: 'Monthly Performance', icon: BarChart2, color: 'cyan', downloads: 234 },
  { id: 2, name: 'Campaign Analysis', icon: Activity, color: 'magenta', downloads: 189 },
  { id: 3, name: 'Audience Insights', icon: PieIcon, color: 'lime', downloads: 156 },
  { id: 4, name: 'Email Metrics', icon: Mail, color: 'orange', downloads: 98 },
  { id: 5, name: 'Social Performance', icon: Share2, color: 'purple', downloads: 142 },
]

const savedReports = [
  { id: 1, name: 'Q3 2024 Marketing Report', date: 'Nov 28, 2024', size: '2.4 MB', type: 'PDF' },
  { id: 2, name: 'Campaign ROI Analysis', date: 'Nov 25, 2024', size: '1.8 MB', type: 'Excel' },
  { id: 3, name: 'Audience Growth Report', date: 'Nov 20, 2024', size: '3.1 MB', type: 'PDF' },
  { id: 4, name: 'Email Campaign Summary', date: 'Nov 15, 2024', size: '980 KB', type: 'PDF' },
  { id: 5, name: 'Social Media Analytics', date: 'Nov 10, 2024', size: '2.2 MB', type: 'Excel' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-obsidian/95 backdrop-blur-xl border border-neon-cyan/30 rounded-xl p-4 shadow-lg">
        <p className="text-gray-400 text-sm mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const colorMap = {
  cyan: { bg: 'bg-neon-cyan/20', text: 'text-neon-cyan', border: 'border-neon-cyan/30' },
  magenta: { bg: 'bg-neon-magenta/20', text: 'text-neon-magenta', border: 'border-neon-magenta/30' },
  lime: { bg: 'bg-neon-lime/20', text: 'text-neon-lime', border: 'border-neon-lime/30' },
  orange: { bg: 'bg-solar-orange/20', text: 'text-solar-orange', border: 'border-solar-orange/30' },
  purple: { bg: 'bg-plasma-purple/20', text: 'text-plasma-purple', border: 'border-plasma-purple/30' },
}

function Reports() {
  const [dateRange, setDateRange] = useState('30d')

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
            Reports & Analytics
          </h1>
          <p className="text-gray-400">
            Generate and download comprehensive marketing reports.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-dark/50 rounded-xl p-1">
            {['7d', '30d', '90d', 'YTD'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  dateRange === range
                    ? 'bg-neon-cyan/20 text-neon-cyan'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-xl text-void font-semibold hover:shadow-neon-cyan transition-all">
            <Download className="w-5 h-5" />
            Export All
          </button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm">Emails Sent</span>
            <span className="text-neon-lime text-xs">+12.5%</span>
          </div>
          <p className="text-3xl font-display font-bold text-white">
            {emailStats.sent.toLocaleString()}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm">Open Rate</span>
            <span className="text-neon-lime text-xs">+3.2%</span>
          </div>
          <p className="text-3xl font-display font-bold text-white">
            {emailStats.openRate}%
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm">Click Rate</span>
            <span className="text-neon-cyan text-xs">+1.8%</span>
          </div>
          <p className="text-3xl font-display font-bold text-white">
            {emailStats.clickRate}%
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm">Conversions</span>
            <span className="text-neon-magenta text-xs">+5.4%</span>
          </div>
          <p className="text-3xl font-display font-bold text-white">
            {emailStats.converted.toLocaleString()}
          </p>
        </motion.div>
      </div>

      {/* Revenue & Leads Chart */}
      <ChartCard title="Revenue & Leads Correlation" subtitle="Monthly trends comparison" delay={0.5}>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00f5ff" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#00f5ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
              <XAxis dataKey="name" stroke="#666" fontSize={12} />
              <YAxis yAxisId="left" stroke="#666" fontSize={12} tickFormatter={(v) => `$${v/1000}k`} />
              <YAxis yAxisId="right" orientation="right" stroke="#666" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#00f5ff"
                fill="url(#revenueGrad)"
                strokeWidth={2}
                name="Revenue"
              />
              <Bar
                yAxisId="right"
                dataKey="leads"
                fill="#8b5cf6"
                radius={[4, 4, 0, 0]}
                name="Leads"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Report Templates & Saved Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Templates */}
        <ChartCard title="Report Templates" subtitle="Quick-generate reports" delay={0.6}>
          <div className="space-y-3">
            {reportTemplates.map((template, index) => {
              const colors = colorMap[template.color]
              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-slate-dark/30 rounded-xl border border-slate-dark hover:border-neon-cyan/30 transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${colors.bg}`}>
                      <template.icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <div>
                      <p className="text-white font-medium">{template.name}</p>
                      <p className="text-gray-500 text-sm">{template.downloads} downloads</p>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg bg-slate-dark opacity-0 group-hover:opacity-100 transition-all hover:bg-neon-cyan/20">
                    <Download className="w-5 h-5 text-neon-cyan" />
                  </button>
                </motion.div>
              )
            })}
          </div>
        </ChartCard>

        {/* Saved Reports */}
        <ChartCard title="Saved Reports" subtitle="Previously generated reports" delay={0.7}>
          <div className="space-y-3">
            {savedReports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.05 }}
                className="flex items-center justify-between p-4 bg-slate-dark/30 rounded-xl border border-slate-dark hover:border-neon-cyan/30 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-plasma-purple/20">
                    <FileText className="w-5 h-5 text-plasma-purple" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{report.name}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>{report.date}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        report.type === 'PDF' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                      }`}>
                        {report.type}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="p-2 rounded-lg bg-slate-dark opacity-0 group-hover:opacity-100 transition-all hover:bg-neon-cyan/20">
                  <Download className="w-5 h-5 text-neon-cyan" />
                </button>
              </motion.div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Content Performance */}
      <ChartCard title="Top Performing Content" subtitle="Content engagement metrics" delay={0.9}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-dark">
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Content</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Views</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Engagement</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Shares</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm w-1/4">Performance</th>
              </tr>
            </thead>
            <tbody>
              {contentData.map((content, index) => {
                const maxViews = Math.max(...contentData.map(c => c.views))
                const percentage = (content.views / maxViews) * 100
                return (
                  <motion.tr
                    key={content.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.05 }}
                    className="border-b border-slate-dark/50 hover:bg-slate-dark/30 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <span className="text-white font-medium">{content.title}</span>
                    </td>
                    <td className="py-4 px-4 text-right text-gray-300">
                      {content.views.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={content.engagement > 8 ? 'text-neon-lime' : 'text-gray-300'}>
                        {content.engagement}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-gray-300">
                      {content.shares.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="w-full bg-slate-dark rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: 1.2 + index * 0.05, duration: 0.5 }}
                          className="h-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta"
                        />
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  )
}

export default Reports

