import { motion } from 'framer-motion'
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Target,
  Activity,
  Eye,
  MousePointer,
  ShoppingCart
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, ComposedChart, Line, Legend
} from 'recharts'
import KPICard from '../components/KPICard'
import ChartCard from '../components/ChartCard'
import { revenueData, trafficData, campaignData, funnelData, realtimeData } from '../data/mockData'

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

function Dashboard() {
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
            Marketing Dashboard
          </h1>
          <p className="text-gray-400">
            Welcome back! Here's what's happening with your campaigns.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 px-4 py-2 bg-neon-lime/10 border border-neon-lime/30 rounded-xl text-neon-lime text-sm">
            <Activity className="w-4 h-4" />
            <span className="pulse-dot w-2 h-2 bg-neon-lime rounded-full" />
            Live Data
          </span>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value="$892,450"
          change="+23.5%"
          changeType="increase"
          icon={DollarSign}
          color="cyan"
          delay={0}
        />
        <KPICard
          title="Active Leads"
          value="12,842"
          change="+18.2%"
          changeType="increase"
          icon={Users}
          color="magenta"
          delay={0.1}
        />
        <KPICard
          title="Conversion Rate"
          value="5.74%"
          change="+2.1%"
          changeType="increase"
          icon={Target}
          color="lime"
          delay={0.2}
        />
        <KPICard
          title="Campaign ROI"
          value="342%"
          change="-4.2%"
          changeType="decrease"
          icon={TrendingUp}
          color="purple"
          delay={0.3}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <ChartCard title="Revenue Overview" subtitle="Monthly revenue vs target" delay={0.4} className="lg:col-span-2">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00f5ff" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#00f5ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#00f5ff"
                  fill="url(#revenueGradient)"
                  strokeWidth={2}
                  name="Revenue"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#ff00ff"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Target"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Traffic Sources */}
        <ChartCard title="Traffic Sources" subtitle="Visitor distribution" delay={0.5}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {trafficData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                  <span className="text-xs text-gray-400 truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Users */}
        <ChartCard title="Real-time Users" subtitle="Active users today" delay={0.6}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={realtimeData}>
                <defs>
                  <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#39ff14" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#39ff14" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
                <XAxis dataKey="time" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#39ff14"
                  fill="url(#usersGradient)"
                  strokeWidth={2}
                  name="Active Users"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Conversion Funnel */}
        <ChartCard title="Conversion Funnel" subtitle="Customer journey stages" delay={0.7}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" horizontal={false} />
                <XAxis type="number" stroke="#666" fontSize={12} />
                <YAxis dataKey="stage" type="category" stroke="#666" fontSize={12} width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} name="Count">
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Campaign Table */}
      <ChartCard title="Active Campaigns" subtitle="Campaign performance overview" delay={0.8}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-dark">
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Campaign</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Status</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Budget</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Spent</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Leads</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Conv. Rate</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">ROI</th>
              </tr>
            </thead>
            <tbody>
              {campaignData.map((campaign, index) => (
                <motion.tr
                  key={campaign.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="border-b border-slate-dark/50 hover:bg-slate-dark/30 transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="text-white font-medium">{campaign.name}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'active' 
                        ? 'bg-neon-lime/20 text-neon-lime'
                        : campaign.status === 'paused'
                        ? 'bg-solar-orange/20 text-solar-orange'
                        : 'bg-plasma-purple/20 text-plasma-purple'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right text-gray-300">
                    ${campaign.budget.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right text-gray-300">
                    ${campaign.spent.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right text-gray-300">
                    {campaign.leads.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right text-gray-300">
                    {campaign.conversion}%
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className={campaign.roi > 200 ? 'text-neon-lime' : 'text-gray-300'}>
                      {campaign.roi}%
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  )
}

export default Dashboard

