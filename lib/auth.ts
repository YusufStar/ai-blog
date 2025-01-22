import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'

const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key'
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key)
}

export async function decrypt(token: string) {
  const { payload } = await jwtVerify(token, key)
  return payload
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10)
}

export async function comparePasswords(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword)
}

export async function verifyAuth(token: string) {
  try {
    const verified = await decrypt(token)
    return verified
  } catch (err) {
    throw new Error('Your token has expired.')
  }
} 