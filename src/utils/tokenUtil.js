import jwt from 'jsonwebtoken';

export function generateTokens(user) {
  const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

  if (!ACCESS_SECRET || !REFRESH_SECRET) {
    throw new Error('JWT secret(s) is not defined');
  }

  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    ACCESS_SECRET,
    { expiresIn: '15m' }
  );
  const refreshToken = jwt.sign(
    { id: user._id },
    REFRESH_SECRET,
    { expiresIn: '7d' }
  );
  return { accessToken, refreshToken };
}

export function verifyAccessToken(token) {
  const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
  return jwt.verify(token, ACCESS_SECRET);
}

export function verifyRefreshToken(token) {
  const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;
  return jwt.verify(token, REFRESH_SECRET);
}