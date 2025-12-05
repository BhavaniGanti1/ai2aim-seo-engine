import { motion } from 'framer-motion'
import { 
  Users, UserPlus, UserCheck, UserX, Mail, Phone, MapPin, Calendar
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts'
import KPICard from '../components/KPICard'
import ChartCard from '../components/ChartCard'
import { audienceAge, socialData } from '../data/mockData'

const interestData = [
  { interest: 'Technology', value: 85 },
  { interest: 'Marketing', value: 78 },
  { interest: 'Business', value: 72 },
  { interest: 'Finance', value: 65 },
  { interest: 'Design', value: 58 },
  { interest: 'Education', value: 52 },
]

const engagementData = [
  { name: 'High', value: 35, fill: '#39ff14' },
  { name: 'Medium', value: 45, fill: '#00f5ff' },
  { name: 'Low', value: 15, fill: '#ff6b35' },
  { name: 'Inactive', value: 5, fill: '#666' },
]

const recentLeads = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@company.com', source: 'LinkedIn', status: 'new', date: '2 min ago' },
  { id: 2, name: 'Michael Chen', email: 'mchen@tech.io', source: 'Organic', status: 'contacted', date: '15 min ago' },
  { id: 3, name: 'Emily Brown', email: 'emily.b@startup.co', source: 'Referral', status: 'qualified', date: '1 hour ago' },
  { id: 4, name: 'David Kim', email: 'dkim@enterprise.com', source: 'Paid Ads', status: 'new', date: '2 hours ago' },
  { id: 5, name: 'Lisa Wang', email: 'lwang@corp.net', source: 'Email', status: 'contacted', date: '3 hours ago' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-obsidian/95 backdrop-blur-xl border border-neon-cyan/30 rounded-xl p-4 shadow-lg">
        <p className="text-gray-400 text-sm mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.color || entry.fill }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

function Audience() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          Audience Insights
        </h1>
        <p className="text-gray-400">
          Understand your audience demographics and behavior.
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Contacts"
          value="156,842"
          change="+8.4%"
          changeType="increase"
          icon={Users}
          color="cyan"
          delay={0}
        />
        <KPICard
          title="New This Month"
          value="4,521"
          change="+23.1%"
          changeType="increase"
          icon={UserPlus}
          color="magenta"
          delay={0.1}
        />
        <KPICard
          title="Active Users"
          value="89,234"
          change="+5.7%"
          changeType="increase"
          icon={UserCheck}
          color="lime"
          delay={0.2}
        />
        <KPICard
          title="Churned"
          value="1,245"
          change="-12.3%"
          changeType="increase"
          icon={UserX}
          color="orange"
          delay={0.3}
        />
      </div>

      {/* Demographics & Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Demographics */}
        <ChartCard title="Age Demographics" subtitle="Audience distribution by age and gender" delay={0.4}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={audienceAge}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
                <XAxis dataKey="age" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="male" fill="#00f5ff" radius={[4, 4, 0, 0]} name="Male" />
                <Bar dataKey="female" fill="#ff00ff" radius={[4, 4, 0, 0]} name="Female" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Engagement Levels */}
        <ChartCard title="Engagement Levels" subtitle="User activity distribution" delay={0.5}>
          <div className="flex items-center justify-between h-72">
            <div className="w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={engagementData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {engagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 pr-4">
              {engagementData.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                  <div>
                    <p className="text-white text-sm font-medium">{item.name}</p>
                    <p className="text-gray-500 text-xs">{item.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Interests Radar */}
      <ChartCard title="Audience Interests" subtitle="Top interest categories" delay={0.6}>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={interestData}>
              <PolarGrid stroke="#1a1a2e" />
              <PolarAngleAxis dataKey="interest" stroke="#666" fontSize={12} />
              <PolarRadiusAxis stroke="#666" fontSize={10} />
              <Radar
                name="Interest Score"
                dataKey="value"
                stroke="#00f5ff"
                fill="#00f5ff"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Recent Leads */}
      <ChartCard title="Recent Leads" subtitle="Latest contacts added to your database" delay={0.7}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-dark">
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Contact</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Source</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Status</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Added</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead, index) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  className="border-b border-slate-dark/50 hover:bg-slate-dark/30 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-plasma-purple to-neon-magenta flex items-center justify-center text-white font-semibold">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-white font-medium">{lead.name}</p>
                        <p className="text-gray-500 text-sm">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-300">{lead.source}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      lead.status === 'new' 
                        ? 'bg-neon-cyan/20 text-neon-cyan'
                        : lead.status === 'contacted'
                        ? 'bg-plasma-purple/20 text-plasma-purple'
                        : 'bg-neon-lime/20 text-neon-lime'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right text-gray-400 text-sm">
                    {lead.date}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>

      {/* Social Media Followers */}
      <ChartCard title="Social Media Following" subtitle="Followers across platforms" delay={0.9}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {socialData.map((platform, index) => (
            <motion.div
              key={platform.platform}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.05 }}
              className="p-4 bg-slate-dark/30 rounded-xl border border-slate-dark hover:border-neon-cyan/30 transition-colors text-center"
            >
              <p className="text-gray-400 text-sm mb-2">{platform.platform}</p>
              <p className="text-2xl font-display font-bold text-white mb-1">
                {(platform.followers / 1000).toFixed(1)}K
              </p>
              <p className={`text-xs font-medium ${platform.growth > 10 ? 'text-neon-lime' : 'text-neon-cyan'}`}>
                +{platform.growth}% growth
              </p>
            </motion.div>
          ))}
        </div>
      </ChartCard>
    </div>
  )
}

export default Audience

