const { createClerkClient } = require('@clerk/clerk-sdk-node');

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

async function clerkAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    console.error('No authorization header');
    return res.status(401).json({ error: 'No token' });
  }
  const token = header.replace('Bearer ', '');
  console.log('Token received:', token.substring(0, 20) + '...');
  try {
    const decoded = await clerk.verifyToken(token, {
      clockSkewInMs: 60000 // Allow 60 seconds clock skew
    });
    console.log('Token verified for user:', decoded.sub);
    req.auth = decoded;
    next();
  } catch (e) {
    console.error('Clerk auth error:', e.message, e.errors);
    return res.status(401).json({ error: 'Invalid token: ' + e.message });
  }
}
module.exports = clerkAuth;
