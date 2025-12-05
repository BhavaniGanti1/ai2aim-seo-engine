import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Search, User, Sparkles, LogOut, Settings, ChevronDown } from 'lucide-react'
import { useAuth } from '../App'

function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const notifications = [
    { id: 1, title: 'Campaign "Summer Sale" hit 1000 leads!', time: '5 min ago', unread: true },
    { id: 2, title: 'Weekly report is ready to download', time: '1 hour ago', unread: true },
    { id: 3, title: 'New AI insights available for your campaigns', time: '3 hours ago', unread: false },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 bg-obsidian/80 backdrop-blur-xl border-b border-slate-dark/50 flex items-center justify-between px-6 sticky top-0 z-40"
    >
      {/* Search */}
      <div className="relative flex-1 max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search campaigns, analytics, reports..."
          className="w-full pl-12 pr-4 py-2.5 bg-slate-dark/50 border border-slate-dark rounded-xl text-gray-300 placeholder-gray-500 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/30 transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-gray-500">
          <kbd className="px-1.5 py-0.5 bg-slate-dark rounded border border-gray-700">⌘</kbd>
          <kbd className="px-1.5 py-0.5 bg-slate-dark rounded border border-gray-700">K</kbd>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 ml-6">
        {/* AI Assistant Button */}
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 border border-neon-cyan/30 rounded-xl text-neon-cyan hover:shadow-neon-cyan transition-all">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">AI Assist</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl bg-slate-dark/50 hover:bg-slate-dark transition-colors group"
          >
            <Bell className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-neon-magenta rounded-full pulse-dot" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-80 bg-obsidian border border-slate-dark rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-4 border-b border-slate-dark">
                  <h3 className="font-semibold text-white">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-slate-dark/50 hover:bg-slate-dark/30 cursor-pointer transition-colors ${
                        notification.unread ? 'bg-neon-cyan/5' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {notification.unread && (
                          <div className="w-2 h-2 mt-2 bg-neon-cyan rounded-full flex-shrink-0" />
                        )}
                        <div className={notification.unread ? '' : 'ml-5'}>
                          <p className="text-sm text-white">{notification.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-slate-dark">
                  <button className="w-full text-center text-sm text-neon-cyan hover:underline">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 pl-4 border-l border-slate-dark"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-plasma-purple to-neon-magenta flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-56 bg-obsidian border border-slate-dark rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-4 border-b border-slate-dark">
                  <p className="font-medium text-white">{user?.name || 'User'}</p>
                  <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-slate-dark rounded-lg transition-colors">
                    <User className="w-4 h-4" />
                    Profile Settings
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-slate-dark rounded-lg transition-colors">
                    <Settings className="w-4 h-4" />
                    Account Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
