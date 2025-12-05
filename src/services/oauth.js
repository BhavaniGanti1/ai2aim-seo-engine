// Backend API URL
const API_BASE_URL = 'http://localhost:4000/api';

// Get current user ID from localStorage
export const getCurrentUserId = () => {
  const user = JSON.parse(localStorage.getItem('ai2aim_user') || '{}');
  return user.id || user.email || 'demo_user';
};

// ==================== CONNECTION STATUS ====================

// Check which platforms the user has connected
export const getUserConnections = async () => {
  try {
    const userId = getCurrentUserId();
    const response = await fetch(`${API_BASE_URL}/user/${userId}/connections`);
    const data = await response.json();
    return data.connections || {};
  } catch (error) {
    console.error('Failed to get connections:', error);
    return { linkedin: false, twitter: false, facebook: false, instagram: false };
  }
};

// Disconnect a platform
export const disconnectPlatform = async (platform) => {
  try {
    const userId = getCurrentUserId();
    const response = await fetch(`${API_BASE_URL}/user/${userId}/connections/${platform}`, {
      method: 'DELETE'
    });
    return response.ok;
  } catch (error) {
    console.error('Failed to disconnect:', error);
    return false;
  }
};

// ==================== OAUTH CONNECT ====================

// Start OAuth flow for a platform
export const connectPlatform = (platform) => {
  const userId = getCurrentUserId();
  const authUrl = `${API_BASE_URL}/auth/${platform}?userId=${encodeURIComponent(userId)}`;
  
  // Open in same window (will redirect back after auth)
  window.location.href = authUrl;
};

// Open OAuth in popup window
export const connectPlatformPopup = (platform) => {
  const userId = getCurrentUserId();
  const authUrl = `${API_BASE_URL}/auth/${platform}?userId=${encodeURIComponent(userId)}`;
  
  const width = 600;
  const height = 700;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  const popup = window.open(
    authUrl,
    `${platform}_oauth`,
    `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no`
  );

  return popup;
};

// ==================== CONTENT GENERATION ====================

export const generateContent = async (topic, seoOptimized = true, platform = 'linkedin') => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, seoOptimized, platform })
    });

    const data = await response.json();
    
    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to generate content');
    }

    return data;
  } catch (error) {
    console.error('Content generation error:', error);
    throw error;
  }
};

// ==================== POSTING ====================

export const postToPlatform = async (platform, content, mediaUrl = null) => {
  const userId = getCurrentUserId();
  
  try {
    const response = await fetch(`${API_BASE_URL}/post/${platform}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, content, mediaUrl })
    });

    const data = await response.json();
    
    // If needs authentication, return auth info
    if (data.needsAuth) {
      return {
        success: false,
        needsAuth: true,
        platform,
        error: data.error
      };
    }
    
    if (!response.ok || !data.success) {
      throw new Error(data.error || `Failed to post to ${platform}`);
    }

    return data;
  } catch (error) {
    console.error(`${platform} post error:`, error);
    throw error;
  }
};

// ==================== HEALTH CHECK ====================

export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    return data.status === 'ok';
  } catch (error) {
    console.error('Backend not running:', error.message);
    return false;
  }
};

// ==================== LEGACY EXPORTS (for compatibility) ====================

// Handle OAuth callback (legacy - now handled by backend)
export const handleOAuthCallback = (platform, code, state) => {
  return {
    accessToken: `token_${platform}_${Date.now()}`,
    refreshToken: `refresh_${platform}_${Date.now()}`,
    expiresIn: 3600,
    connected: true,
  };
};

export const tokenStorage = {
  isConnected: async (platform) => {
    const connections = await getUserConnections();
    return connections[platform] || false;
  },
  initialize: () => {
    // No-op for compatibility
  },
  save: (platform, tokens) => {
    // No-op - backend handles token storage now
    console.log(`Token save requested for ${platform} - handled by backend`);
  }
};

export const socialMediaAPI = {
  postToPlatform: async (platformId, content, title = '') => {
    return postToPlatform(platformId, content);
  }
};

export default {
  getCurrentUserId,
  getUserConnections,
  disconnectPlatform,
  connectPlatform,
  connectPlatformPopup,
  generateContent,
  postToPlatform,
  checkBackendHealth,
};
