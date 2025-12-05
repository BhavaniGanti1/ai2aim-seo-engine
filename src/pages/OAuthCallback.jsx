import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Loader2, Zap } from 'lucide-react'
import { tokenStorage, handleOAuthCallback } from '../services/oauth'

function OAuthCallback() {
  const { platform } = useParams()
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState('processing') // processing, success, error
  const [message, setMessage] = useState('')

  useEffect(() => {
    const processCallback = async () => {
      try {
        const code = searchParams.get('code')
        const state = searchParams.get('state')
        const error = searchParams.get('error')

        if (error) {
          throw new Error(searchParams.get('error_description') || 'Authorization denied')
        }

        if (!code) {
          throw new Error('No authorization code received')
        }

        // Handle the OAuth callback
        const tokens = handleOAuthCallback(platform, code, state)
        
        // Save tokens
        tokenStorage.save(platform, tokens)

        setStatus('success')
        setMessage(`Successfully connected to ${platform}!`)

        // Notify parent window and close popup
        if (window.opener) {
          window.opener.postMessage({
            type: 'OAUTH_SUCCESS',
            platform: platform,
            tokens: tokens
          }, window.location.origin)
          
          // Close popup after short delay
          setTimeout(() => window.close(), 2000)
        }
      } catch (err) {
        setStatus('error')
        setMessage(err.message || 'Failed to authenticate')

        if (window.opener) {
          window.opener.postMessage({
            type: 'OAUTH_ERROR',
            platform: platform,
            error: err.message
          }, window.location.origin)
        }
      }
    }

    processCallback()
  }, [platform, searchParams])

  return (
    <div className="min-h-screen bg-void flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8 text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan to-electric-blue flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <span className="font-display font-bold text-2xl text-white">AI2AIM</span>
          </div>

          {/* Status */}
          {status === 'processing' && (
            <div>
              <div className="w-16 h-16 rounded-full bg-neon-cyan/10 flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-8 h-8 text-neon-cyan animate-spin" />
              </div>
              <h2 className="text-xl font-display font-bold text-white mb-2">
                Connecting...
              </h2>
              <p className="text-gray-400">
                Completing authentication with {platform}
              </p>
            </div>
          )}

          {status === 'success' && (
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="w-16 h-16 rounded-full bg-neon-lime/20 flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-8 h-8 text-neon-lime" />
              </motion.div>
              <h2 className="text-xl font-display font-bold text-white mb-2">
                Connected!
              </h2>
              <p className="text-gray-400 mb-4">{message}</p>
              <p className="text-gray-500 text-sm">
                This window will close automatically...
              </p>
            </div>
          )}

          {status === 'error' && (
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4"
              >
                <XCircle className="w-8 h-8 text-red-500" />
              </motion.div>
              <h2 className="text-xl font-display font-bold text-white mb-2">
                Connection Failed
              </h2>
              <p className="text-gray-400 mb-4">{message}</p>
              <button
                onClick={() => window.close()}
                className="px-6 py-2 bg-slate-dark rounded-lg text-white font-medium hover:bg-slate-dark/80 transition-colors"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default OAuthCallback

