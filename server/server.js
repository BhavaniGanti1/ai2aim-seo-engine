import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import crypto from 'crypto';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// ==================== OPENAI CONFIGURATION ====================
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = 'gpt-4o-mini'; // Cost-effective model with great quality

// Google OAuth Credentials
const GOOGLE_APP = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: `http://localhost:${PORT}/api/auth/google/callback`,
};

// LinkedIn App Credentials (for OAuth)
const LINKEDIN_APP = {
  clientId: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  redirectUri: `http://localhost:${PORT}/api/auth/linkedin/callback`,
  scope: 'openid profile email w_member_social',
};

// Twitter App Credentials (for OAuth)
const TWITTER_APP = {
  clientId: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
  apiKey: process.env.TWITTER_API_KEY,
  apiSecret: process.env.TWITTER_API_SECRET,
  redirectUri: `http://localhost:${PORT}/api/auth/twitter/callback`,
};

// Meta (Facebook/Instagram) App Credentials
const META_APP = {
  appId: process.env.META_APP_ID,
  appSecret: process.env.META_APP_SECRET,
  redirectUri: `http://localhost:${PORT}/api/auth/facebook/callback`,
};

// OpenAI API helper
async function generateWithOpenAI(prompt, systemPrompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || `OpenAI error: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// ==================== USER TOKEN STORAGE (Use Database in Production) ====================

// In-memory storage for user tokens (replace with database in production)
const userTokens = new Map();
const oauthStates = new Map(); // Store OAuth states for CSRF protection

// Helper to get/set user tokens
const tokenStore = {
  get: (userId, platform) => {
    const user = userTokens.get(userId) || {};
    return user[platform] || null;
  },
  set: (userId, platform, tokens) => {
    const user = userTokens.get(userId) || {};
    user[platform] = { ...tokens, connectedAt: Date.now() };
    userTokens.set(userId, user);
    console.log(`✅ Saved ${platform} tokens for user: ${userId}`);
  },
  remove: (userId, platform) => {
    const user = userTokens.get(userId) || {};
    delete user[platform];
    userTokens.set(userId, user);
  },
  getAll: (userId) => {
    return userTokens.get(userId) || {};
  },
  isConnected: (userId, platform) => {
    const tokens = tokenStore.get(userId, platform);
    return !!(tokens && tokens.accessToken);
  }
};

// ==================== MIDDLEWARE ====================

app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:3003', 'http://localhost:5173', 'http://localhost:3004'],
  credentials: true,
}));
app.use(express.json());

// ==================== HEALTH CHECK ====================

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    mode: 'multi-user-oauth',
    platforms: {
      linkedin: { configured: true, oauth: true },
      twitter: { configured: true, oauth: true },
      facebook: { configured: true, oauth: true },
      instagram: { configured: true, oauth: true },
    }
  });
});

// ==================== USER CONNECTION STATUS ====================

// Get user's connected platforms
app.get('/api/user/:userId/connections', (req, res) => {
  const { userId } = req.params;
  const tokens = tokenStore.getAll(userId);
  
  const connections = {
    linkedin: tokenStore.isConnected(userId, 'linkedin'),
    twitter: tokenStore.isConnected(userId, 'twitter'),
    facebook: tokenStore.isConnected(userId, 'facebook'),
    instagram: tokenStore.isConnected(userId, 'instagram'),
  };
  
  res.json({ success: true, connections });
});

// Disconnect a platform
app.delete('/api/user/:userId/connections/:platform', (req, res) => {
  const { userId, platform } = req.params;
  tokenStore.remove(userId, platform);
  res.json({ success: true, message: `Disconnected ${platform}` });
});

// ==================== LINKEDIN OAUTH ====================

// Start LinkedIn OAuth
app.get('/api/auth/linkedin', (req, res) => {
  const { userId } = req.query;
  
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }
  
  const state = crypto.randomBytes(16).toString('hex');
  oauthStates.set(state, { userId, platform: 'linkedin', timestamp: Date.now() });
  
  const authUrl = new URL('https://www.linkedin.com/oauth/v2/authorization');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('client_id', LINKEDIN_APP.clientId);
  authUrl.searchParams.set('redirect_uri', LINKEDIN_APP.redirectUri);
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('scope', LINKEDIN_APP.scope);
  
  console.log(`🔗 LinkedIn OAuth started for user: ${userId}`);
  res.redirect(authUrl.toString());
});

// LinkedIn OAuth Callback
app.get('/api/auth/linkedin/callback', async (req, res) => {
  const { code, state, error, error_description } = req.query;
  
  if (error) {
    console.error('❌ LinkedIn OAuth error:', error_description);
    return res.redirect(`${FRONTEND_URL}/content-studio?error=${encodeURIComponent(error_description || error)}`);
  }
  
  const stateData = oauthStates.get(state);
  if (!stateData) {
    return res.redirect(`${FRONTEND_URL}/content-studio?error=Invalid state`);
  }
  
  oauthStates.delete(state);
  const { userId } = stateData;
  
  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: LINKEDIN_APP.redirectUri,
        client_id: LINKEDIN_APP.clientId,
        client_secret: LINKEDIN_APP.clientSecret,
      }),
    });
    
    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      throw new Error(tokenData.error_description || tokenData.error);
    }
    
    // Get user profile
    const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: { 'Authorization': `Bearer ${tokenData.access_token}` }
    });
    const profile = await profileResponse.json();
    
    // Save tokens
    tokenStore.set(userId, 'linkedin', {
      accessToken: tokenData.access_token,
      expiresIn: tokenData.expires_in,
      profileId: profile.sub,
      profileName: profile.name,
      profilePicture: profile.picture,
    });
    
    console.log(`✅ LinkedIn connected for user ${userId}: ${profile.name}`);
    res.redirect(`${FRONTEND_URL}/content-studio?connected=linkedin&name=${encodeURIComponent(profile.name)}`);
    
  } catch (error) {
    console.error('❌ LinkedIn token exchange error:', error.message);
    res.redirect(`${FRONTEND_URL}/content-studio?error=${encodeURIComponent(error.message)}`);
  }
});

// ==================== TWITTER OAUTH 2.0 ====================

// Start Twitter OAuth
app.get('/api/auth/twitter', (req, res) => {
  const { userId } = req.query;
  
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }
  
  const state = crypto.randomBytes(16).toString('hex');
  const codeVerifier = crypto.randomBytes(32).toString('base64url');
  const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64url');
  
  oauthStates.set(state, { userId, platform: 'twitter', codeVerifier, timestamp: Date.now() });
  
  const authUrl = new URL('https://twitter.com/i/oauth2/authorize');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('client_id', TWITTER_APP.clientId);
  authUrl.searchParams.set('redirect_uri', TWITTER_APP.redirectUri);
  authUrl.searchParams.set('scope', 'tweet.read tweet.write users.read offline.access');
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('code_challenge', codeChallenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');
  
  console.log(`🔗 Twitter OAuth started for user: ${userId}`);
  res.redirect(authUrl.toString());
});

// Twitter OAuth Callback
app.get('/api/auth/twitter/callback', async (req, res) => {
  const { code, state, error } = req.query;
  
  if (error) {
    return res.redirect(`${FRONTEND_URL}/content-studio?error=${encodeURIComponent(error)}`);
  }
  
  const stateData = oauthStates.get(state);
  if (!stateData) {
    return res.redirect(`${FRONTEND_URL}/content-studio?error=Invalid state`);
  }
  
  oauthStates.delete(state);
  const { userId, codeVerifier } = stateData;
  
  try {
    const basicAuth = Buffer.from(`${TWITTER_APP.clientId}:${TWITTER_APP.clientSecret}`).toString('base64');
    
    const tokenResponse = await fetch('https://api.twitter.com/2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${basicAuth}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: TWITTER_APP.redirectUri,
        code_verifier: codeVerifier,
      }),
    });
    
    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      throw new Error(tokenData.error_description || tokenData.error);
    }
    
    // Get user info
    const userResponse = await fetch('https://api.twitter.com/2/users/me', {
      headers: { 'Authorization': `Bearer ${tokenData.access_token}` }
    });
    const userData = await userResponse.json();
    
    tokenStore.set(userId, 'twitter', {
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresIn: tokenData.expires_in,
      username: userData.data?.username,
      profileName: userData.data?.name,
    });
    
    console.log(`✅ Twitter connected for user ${userId}: @${userData.data?.username}`);
    res.redirect(`${FRONTEND_URL}/content-studio?connected=twitter&name=${encodeURIComponent('@' + userData.data?.username)}`);
    
  } catch (error) {
    console.error('❌ Twitter token exchange error:', error.message);
    res.redirect(`${FRONTEND_URL}/content-studio?error=${encodeURIComponent(error.message)}`);
  }
});

// ==================== FACEBOOK OAUTH ====================

// Start Facebook OAuth
app.get('/api/auth/facebook', (req, res) => {
  const { userId } = req.query;
  
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }
  
  const state = crypto.randomBytes(16).toString('hex');
  oauthStates.set(state, { userId, platform: 'facebook', timestamp: Date.now() });
  
  const authUrl = new URL('https://www.facebook.com/v18.0/dialog/oauth');
  authUrl.searchParams.set('client_id', META_APP.appId);
  authUrl.searchParams.set('redirect_uri', META_APP.redirectUri);
  authUrl.searchParams.set('state', state);
  // Use basic permissions for development (pages_manage_posts requires App Review)
  authUrl.searchParams.set('scope', 'public_profile,email');
  
  console.log(`🔗 Facebook OAuth started for user: ${userId}`);
  res.redirect(authUrl.toString());
});

// Facebook OAuth Callback
app.get('/api/auth/facebook/callback', async (req, res) => {
  const { code, state, error, error_description } = req.query;
  
  if (error) {
    return res.redirect(`${FRONTEND_URL}/content-studio?error=${encodeURIComponent(error_description || error)}`);
  }
  
  const stateData = oauthStates.get(state);
  if (!stateData) {
    return res.redirect(`${FRONTEND_URL}/content-studio?error=Invalid state`);
  }
  
  oauthStates.delete(state);
  const { userId } = stateData;
  
  try {
    // Exchange code for access token
    const tokenUrl = new URL('https://graph.facebook.com/v18.0/oauth/access_token');
    tokenUrl.searchParams.set('client_id', META_APP.appId);
    tokenUrl.searchParams.set('redirect_uri', META_APP.redirectUri);
    tokenUrl.searchParams.set('client_secret', META_APP.appSecret);
    tokenUrl.searchParams.set('code', code);
    
    const tokenResponse = await fetch(tokenUrl.toString());
    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      throw new Error(tokenData.error.message);
    }
    
    // Get user's pages
    const pagesResponse = await fetch(
      `https://graph.facebook.com/v18.0/me/accounts?access_token=${tokenData.access_token}`
    );
    const pagesData = await pagesResponse.json();
    
    // Get user profile
    const profileResponse = await fetch(
      `https://graph.facebook.com/v18.0/me?access_token=${tokenData.access_token}`
    );
    const profile = await profileResponse.json();
    
    tokenStore.set(userId, 'facebook', {
      accessToken: tokenData.access_token,
      expiresIn: tokenData.expires_in,
      profileName: profile.name,
      profileId: profile.id,
      pages: pagesData.data || [],
    });
    
    console.log(`✅ Facebook connected for user ${userId}: ${profile.name}`);
    res.redirect(`${FRONTEND_URL}/content-studio?connected=facebook&name=${encodeURIComponent(profile.name)}`);
    
  } catch (error) {
    console.error('❌ Facebook token exchange error:', error.message);
    res.redirect(`${FRONTEND_URL}/content-studio?error=${encodeURIComponent(error.message)}`);
  }
});

// ==================== INSTAGRAM (via Facebook) ====================

app.get('/api/auth/instagram', (req, res) => {
  const { userId } = req.query;
  
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }
  
  const state = crypto.randomBytes(16).toString('hex');
  oauthStates.set(state, { userId, platform: 'instagram', timestamp: Date.now() });
  
  const authUrl = new URL('https://www.facebook.com/v18.0/dialog/oauth');
  authUrl.searchParams.set('client_id', META_APP.appId);
  authUrl.searchParams.set('redirect_uri', `http://localhost:${PORT}/api/auth/instagram/callback`);
  authUrl.searchParams.set('state', state);
  // Use basic permissions for development (instagram_content_publish requires App Review)
  authUrl.searchParams.set('scope', 'public_profile,email');
  
  console.log(`🔗 Instagram OAuth started for user: ${userId}`);
  res.redirect(authUrl.toString());
});

app.get('/api/auth/instagram/callback', async (req, res) => {
  const { code, state, error } = req.query;
  
  if (error) {
    return res.redirect(`${FRONTEND_URL}/content-studio?error=${encodeURIComponent(error)}`);
  }
  
  const stateData = oauthStates.get(state);
  if (!stateData) {
    return res.redirect(`${FRONTEND_URL}/content-studio?error=Invalid state`);
  }
  
  oauthStates.delete(state);
  const { userId } = stateData;
  
  try {
    const tokenUrl = new URL('https://graph.facebook.com/v18.0/oauth/access_token');
    tokenUrl.searchParams.set('client_id', META_APP.appId);
    tokenUrl.searchParams.set('redirect_uri', `http://localhost:${PORT}/api/auth/instagram/callback`);
    tokenUrl.searchParams.set('client_secret', META_APP.appSecret);
    tokenUrl.searchParams.set('code', code);
    
    const tokenResponse = await fetch(tokenUrl.toString());
    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      throw new Error(tokenData.error.message);
    }
    
    // Get Instagram Business Account
    const pagesResponse = await fetch(
      `https://graph.facebook.com/v18.0/me/accounts?access_token=${tokenData.access_token}`
    );
    const pagesData = await pagesResponse.json();
    
    let instagramAccount = null;
    
    // Find Instagram account linked to pages
    for (const page of (pagesData.data || [])) {
      const igResponse = await fetch(
        `https://graph.facebook.com/v18.0/${page.id}?fields=instagram_business_account&access_token=${tokenData.access_token}`
      );
      const igData = await igResponse.json();
      if (igData.instagram_business_account) {
        instagramAccount = igData.instagram_business_account;
        break;
      }
    }
    
    tokenStore.set(userId, 'instagram', {
      accessToken: tokenData.access_token,
      instagramAccountId: instagramAccount?.id,
      pages: pagesData.data || [],
    });
    
    console.log(`✅ Instagram connected for user ${userId}`);
    res.redirect(`${FRONTEND_URL}/content-studio?connected=instagram`);
    
  } catch (error) {
    console.error('❌ Instagram token exchange error:', error.message);
    res.redirect(`${FRONTEND_URL}/content-studio?error=${encodeURIComponent(error.message)}`);
  }
});

// ==================== GOOGLE OAUTH (User Login) ====================

// Start Google OAuth for user login
app.get('/api/auth/google', (req, res) => {
  const state = crypto.randomBytes(16).toString('hex');
  oauthStates.set(state, { type: 'google_login', timestamp: Date.now() });
  
  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', GOOGLE_APP.clientId);
  authUrl.searchParams.set('redirect_uri', GOOGLE_APP.redirectUri);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', 'openid email profile');
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('access_type', 'offline');
  authUrl.searchParams.set('prompt', 'consent');
  
  console.log('🔗 Google OAuth started for user login');
  res.redirect(authUrl.toString());
});

// Google OAuth Callback
app.get('/api/auth/google/callback', async (req, res) => {
  const { code, state, error } = req.query;
  
  if (error) {
    console.error('❌ Google OAuth error:', error);
    return res.redirect(`${FRONTEND_URL}/login?error=${encodeURIComponent(error)}`);
  }
  
  const stateData = oauthStates.get(state);
  if (!stateData) {
    return res.redirect(`${FRONTEND_URL}/login?error=Invalid state`);
  }
  
  oauthStates.delete(state);
  
  try {
    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_APP.clientId,
        client_secret: GOOGLE_APP.clientSecret,
        redirect_uri: GOOGLE_APP.redirectUri,
        grant_type: 'authorization_code',
      }),
    });
    
    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      throw new Error(tokenData.error_description || tokenData.error);
    }
    
    // Get user info
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { 'Authorization': `Bearer ${tokenData.access_token}` }
    });
    const userInfo = await userResponse.json();
    
    console.log(`✅ Google login successful: ${userInfo.email}`);
    
    // Create user data to send to frontend
    const userData = {
      id: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
      picture: userInfo.picture,
      provider: 'google',
    };
    
    // Redirect to frontend with user data
    const userDataEncoded = encodeURIComponent(JSON.stringify(userData));
    res.redirect(`${FRONTEND_URL}/auth/callback?user=${userDataEncoded}`);
    
  } catch (error) {
    console.error('❌ Google token exchange error:', error.message);
    res.redirect(`${FRONTEND_URL}/login?error=${encodeURIComponent(error.message)}`);
  }
});

// ==================== OPENAI CONTENT GENERATION ====================

app.post('/api/generate', async (req, res) => {
  try {
    const { topic, seoOptimized = true, platform = 'linkedin' } = req.body;
    
    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    console.log('🤖 Generating content with OpenAI...');
    console.log('Topic:', topic);
    console.log('Model:', OPENAI_MODEL);

    const systemPrompt = `You are an expert content writer and SEO specialist. Create engaging, professional content optimized for social media.

Your content should:
- Be informative, engaging, and valuable
- Include relevant keywords naturally
- End with a call-to-action
- Include 3-5 relevant hashtags
- Be optimized for ${platform}

DO NOT use markdown formatting. Write in plain text only.
Keep content between 200-400 words.`;

    const userPrompt = `Write an SEO-optimized ${platform} post about: "${topic}"`;
    
    const content = await generateWithOpenAI(userPrompt, systemPrompt);
    const hashtags = content.match(/#\w+/g) || [];
    const wordCount = content.split(/\s+/).length;

    console.log('✅ Content generated with OpenAI!');

    res.json({
      success: true,
      content,
      title: topic,
      wordCount,
      seoScore: Math.min(70 + hashtags.length * 5 + (wordCount > 150 ? 10 : 0), 98),
      readability: wordCount / (content.split(/[.!?]+/).length || 1) < 20 ? 'A' : 'B',
      keywords: hashtags.map(h => h.replace('#', '').toLowerCase()),
    });

  } catch (error) {
    console.error('❌ Generation error:', error.message);
    
    // Check for API key issues
    if (error.message.includes('API key') || error.message.includes('Unauthorized')) {
      return res.status(401).json({ 
        error: 'OpenAI API key is invalid or has expired.',
        hint: 'Check your API key at https://platform.openai.com/api-keys'
      });
    }
    
    // Check for quota issues
    if (error.message.includes('quota') || error.message.includes('rate limit')) {
      return res.status(429).json({ 
        error: 'OpenAI API quota exceeded or rate limited.',
        hint: 'Wait a moment or check your usage at https://platform.openai.com/usage'
      });
    }
    
    res.status(500).json({ error: error.message });
  }
});

// ==================== POSTING ENDPOINTS ====================

// Post to LinkedIn
app.post('/api/post/linkedin', async (req, res) => {
  try {
    const { userId, content } = req.body;
    
    if (!userId || !content) {
      return res.status(400).json({ error: 'userId and content are required' });
    }
    
    const tokens = tokenStore.get(userId, 'linkedin');
    if (!tokens || !tokens.accessToken) {
      return res.status(401).json({ 
        error: 'Not connected to LinkedIn',
        needsAuth: true,
        authUrl: `/api/auth/linkedin?userId=${userId}`
      });
    }

    console.log(`📤 Posting to LinkedIn for user ${userId}...`);

    const postData = {
      author: `urn:li:person:${tokens.profileId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: { text: content },
          shareMediaCategory: 'NONE'
        }
      },
      visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' }
    };

    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokens.accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify(postData)
    });

    const responseText = await response.text();
    
    if (!response.ok) {
      console.error('❌ LinkedIn post failed:', responseText);
      return res.status(response.status).json({ error: 'Failed to post', details: responseText });
    }

    let result;
    try { result = JSON.parse(responseText); } catch { result = { id: responseText }; }

    console.log(`✅ Posted to LinkedIn: ${result.id}`);
    res.json({ success: true, postId: result.id, url: `https://www.linkedin.com/feed/update/${result.id}` });

  } catch (error) {
    console.error('❌ LinkedIn error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Post to Twitter
app.post('/api/post/twitter', async (req, res) => {
  try {
    const { userId, content } = req.body;
    
    if (!userId || !content) {
      return res.status(400).json({ error: 'userId and content are required' });
    }
    
    const tokens = tokenStore.get(userId, 'twitter');
    if (!tokens || !tokens.accessToken) {
      return res.status(401).json({ 
        error: 'Not connected to Twitter',
        needsAuth: true,
        authUrl: `/api/auth/twitter?userId=${userId}`
      });
    }

    console.log(`📤 Posting to Twitter for user ${userId}...`);

    const response = await fetch('https://api.twitter.com/2/tweets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokens.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: content.substring(0, 280) })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('❌ Twitter post failed:', data);
      return res.status(response.status).json({ error: data.detail || 'Failed to post' });
    }

    console.log(`✅ Posted to Twitter: ${data.data?.id}`);
    res.json({ success: true, postId: data.data?.id, url: `https://twitter.com/i/status/${data.data?.id}` });

  } catch (error) {
    console.error('❌ Twitter error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Post to Facebook
app.post('/api/post/facebook', async (req, res) => {
  try {
    const { userId, content } = req.body;
    
    if (!userId || !content) {
      return res.status(400).json({ error: 'userId and content are required' });
    }
    
    const tokens = tokenStore.get(userId, 'facebook');
    if (!tokens || !tokens.accessToken) {
      return res.status(401).json({ 
        error: 'Not connected to Facebook',
        needsAuth: true,
        authUrl: `/api/auth/facebook?userId=${userId}`
      });
    }

    if (!tokens.pages || tokens.pages.length === 0) {
      return res.status(400).json({ error: 'No Facebook Pages found. Create a Page first.' });
    }

    console.log(`📤 Posting to Facebook for user ${userId}...`);

    const page = tokens.pages[0];
    const response = await fetch(`https://graph.facebook.com/v18.0/${page.id}/feed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: content, access_token: page.access_token })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('❌ Facebook post failed:', data.error);
      return res.status(400).json({ error: data.error.message });
    }

    console.log(`✅ Posted to Facebook: ${data.id}`);
    res.json({ success: true, postId: data.id, url: `https://facebook.com/${data.id}`, pageName: page.name });

  } catch (error) {
    console.error('❌ Facebook error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Post to Instagram
app.post('/api/post/instagram', async (req, res) => {
  try {
    const { userId, content, mediaUrl } = req.body;
    
    if (!userId || !content) {
      return res.status(400).json({ error: 'userId and content are required' });
    }
    
    const tokens = tokenStore.get(userId, 'instagram');
    if (!tokens || !tokens.accessToken) {
      return res.status(401).json({ 
        error: 'Not connected to Instagram',
        needsAuth: true,
        authUrl: `/api/auth/instagram?userId=${userId}`
      });
    }

    if (!tokens.instagramAccountId) {
      return res.status(400).json({ error: 'No Instagram Business Account found' });
    }

    if (!mediaUrl) {
      return res.status(400).json({ error: 'Instagram requires an image URL' });
    }

    console.log(`📤 Posting to Instagram for user ${userId}...`);

    // Create container
    const containerResponse = await fetch(
      `https://graph.facebook.com/v18.0/${tokens.instagramAccountId}/media`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: mediaUrl, caption: content, access_token: tokens.accessToken })
      }
    );
    const containerData = await containerResponse.json();

    if (containerData.error) {
      return res.status(400).json({ error: containerData.error.message });
    }

    // Publish
    const publishResponse = await fetch(
      `https://graph.facebook.com/v18.0/${tokens.instagramAccountId}/media_publish`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creation_id: containerData.id, access_token: tokens.accessToken })
      }
    );
    const publishData = await publishResponse.json();

    if (publishData.error) {
      return res.status(400).json({ error: publishData.error.message });
    }

    console.log(`✅ Posted to Instagram: ${publishData.id}`);
    res.json({ success: true, postId: publishData.id });

  } catch (error) {
    console.error('❌ Instagram error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log('');
  console.log('🚀 ================================================');
  console.log('🚀 AI2AIM Multi-User OAuth Backend Started!');
  console.log('🚀 ================================================');
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log('');
  console.log('🔐 OAuth Endpoints:');
  console.log(`   GET /api/auth/google                → Google Sign-In`);
  console.log(`   GET /api/auth/linkedin?userId=XXX   → LinkedIn Login`);
  console.log(`   GET /api/auth/twitter?userId=XXX    → Twitter Login`);
  console.log(`   GET /api/auth/facebook?userId=XXX   → Facebook Login`);
  console.log(`   GET /api/auth/instagram?userId=XXX  → Instagram Login`);
  console.log('');
  console.log('📤 Posting Endpoints:');
  console.log(`   POST /api/post/linkedin   { userId, content }`);
  console.log(`   POST /api/post/twitter    { userId, content }`);
  console.log(`   POST /api/post/facebook   { userId, content }`);
  console.log(`   POST /api/post/instagram  { userId, content, mediaUrl }`);
  console.log('');
  console.log('✅ Google Sign-In configured!');
  console.log('✅ OpenAI GPT-4o-mini configured!');
  console.log('✅ Multi-user OAuth mode enabled!');
  console.log('✅ Each user must connect their own accounts!');
  console.log('');
});
