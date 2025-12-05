import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../App'
import { Loader2, Zap } from 'lucide-react'

function AuthCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login } = useAuth()

  useEffect(() => {
    const userParam = searchParams.get('user')
    const error = searchParams.get('error')

    if (error) {
      console.error('Auth error:', error)
      navigate('/login?error=' + encodeURIComponent(error))
      return
    }

    if (userParam) {
      try {
        const userData = JSON.parse(decodeURIComponent(userParam))
        console.log('Google login successful:', userData)
        
        // Save user to auth context
        login(userData)
        
        // Redirect to dashboard
        navigate('/dashboard')
      } catch (err) {
        console.error('Failed to parse user data:', err)
        navigate('/login?error=Failed to process login')
      }
    } else {
      navigate('/login')
    }
  }, [searchParams, login, navigate])

  return (
    <div className="min-h-screen bg-void flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan to-electric-blue flex items-center justify-center">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <span className="font-display font-bold text-2xl text-white">AI2AIM</span>
        </div>
        
        <Loader2 className="w-8 h-8 text-neon-cyan animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Signing you in...</p>
      </div>
    </div>
  )
}

export default AuthCallback

