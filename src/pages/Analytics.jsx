import { motion } from 'framer-motion'
import { 
  Eye, MousePointer, Clock, Percent, Globe, Monitor, Smartphone, Tablet
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, RadialBarChart, RadialBar, Legend
} from 'recharts'
import KPICard from '../components/KPICard'
import ChartCard from '../components/ChartCard'
import { weeklyData, geoData, contentData } from '../data/mockData'

const deviceData = [
  { name: 'Desktop', value: 58, fill: '#00f5ff' },
  { name: 'Mobile', value: 32, fill: '#ff00ff' },
  { name: 'Tablet', value: 10, fill: '#39ff14' },
]

const browserData = [
  { name: 'Chrome', users: 45000, fill: '#00f5ff' },
  { name: 'Safari', users: 28000, fill: '#8b5cf6' },
  { name: 'Firefox', users: 12000, fill: '#ff6b35' },
  { name: 'Edge', users: 8000, fill: '#39ff14' },
  { name: 'Other', users: 5000, fill: '#666' },
]

const pageViews = [
  { page: '/home', views: 45200, bounce: 32 },
  { page: '/products', views: 32100, bounce: 28 },
  { page: '/pricing', views: 28400, bounce: 45 },
  { page: '/about', views: 18200, bounce: 38 },
  { page: '/contact', views: 12800, bounce: 25 },
  { page: '/blog', views: 22400, bounce: 35 },
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

function Analytics() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          Analytics Overview
        </h1>
        <p className="text-gray-400">
          Deep dive into your website and campaign performance metrics.
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Page Views"
          value="2.4M"
          change="+15.3%"
          changeType="increase"
          icon={Eye}
          color="cyan"
          delay={0}
        />
        <KPICard
          title="Unique Visitors"
          value="847K"
          change="+12.8%"
          changeType="increase"
          icon={MousePointer}
          color="magenta"
          delay={0.1}
        />
        <KPICard
          title="Avg. Session"
          value="4m 32s"
          change="+8.4%"
          changeType="increase"
          icon={Clock}
          color="lime"
          delay={0.2}
        />
        <KPICard
          title="Bounce Rate"
          value="34.2%"
          change="-5.1%"
          changeType="increase"
          icon={Percent}
          color="purple"
          delay={0.3}
        />
      </div>

      {/* Weekly Performance */}
      <ChartCard title="Weekly Performance" subtitle="Impressions, clicks, and conversions" delay={0.4}>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
              <XAxis dataKey="day" stroke="#666" fontSize={12} />
              <YAxis yAxisId="left" stroke="#666" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke="#666" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar yAxisId="left" dataKey="impressions" fill="#00f5ff" radius={[4, 4, 0, 0]} name="Impressions" />
              <Bar yAxisId="left" dataKey="clicks" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Clicks" />
              <Bar yAxisId="right" dataKey="conversions" fill="#39ff14" radius={[4, 4, 0, 0]} name="Conversions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Device & Browser */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Device Distribution" subtitle="Traffic by device type" delay={0.5}>
          <div className="flex items-center justify-between">
            <div className="h-64 w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {deviceData.map((device) => (
                <div key={device.name} className="flex items-center gap-4">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${device.fill}20` }}>
                    {device.name === 'Desktop' ? <Monitor className="w-5 h-5" style={{ color: device.fill }} /> :
                     device.name === 'Mobile' ? <Smartphone className="w-5 h-5" style={{ color: device.fill }} /> :
                     <Tablet className="w-5 h-5" style={{ color: device.fill }} />}
                  </div>
                  <div>
                    <p className="text-white font-medium">{device.name}</p>
                    <p className="text-gray-400 text-sm">{device.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Browser Usage" subtitle="Top browsers by users" delay={0.6}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={browserData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" horizontal={false} />
                <XAxis type="number" stroke="#666" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#666" fontSize={12} width={70} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="users" radius={[0, 4, 4, 0]} name="Users">
                  {browserData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Geographic Distribution */}
      <ChartCard title="Geographic Distribution" subtitle="Top countries by traffic" delay={0.7}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-dark">
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Country</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Visitors</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Revenue</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm w-1/3">Distribution</th>
              </tr>
            </thead>
            <tbody>
              {geoData.map((country, index) => {
                const maxVisitors = Math.max(...geoData.map(c => c.visitors))
                const percentage = (country.visitors / maxVisitors) * 100
                return (
                  <motion.tr
                    key={country.country}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.05 }}
                    className="border-b border-slate-dark/50 hover:bg-slate-dark/30 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-neon-cyan" />
                        <span className="text-white font-medium">{country.country}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right text-gray-300">
                      {country.visitors.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right text-neon-lime">
                      ${country.revenue.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="w-full bg-slate-dark rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: 1 + index * 0.05, duration: 0.5 }}
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

      {/* Top Pages */}
      <ChartCard title="Top Pages" subtitle="Most visited pages" delay={0.9}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pageViews.map((page, index) => (
            <motion.div
              key={page.page}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.05 }}
              className="p-4 bg-slate-dark/30 rounded-xl border border-slate-dark hover:border-neon-cyan/30 transition-colors"
            >
              <p className="text-neon-cyan font-mono text-sm mb-2">{page.page}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-display font-bold text-white">{page.views.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">views</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium text-solar-orange">{page.bounce}%</p>
                  <p className="text-xs text-gray-500">bounce</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ChartCard>
    </div>
  )
}

export default Analytics

