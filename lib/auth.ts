// import { cookies } from "next/headers"

// Fixed admin credentials (in a real app, these would be in the database)
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD_HASH = "$2b$10$rBJlYSrUhUXIBtIvZlDSJOJMOVBB.JK.vtB5xJJyZOhCnXcXEcKIm" // 'admin123'

export async function login(username: string, password: string) {
  if (username !== ADMIN_USERNAME) {
    return { success: false, message: "Usuário inválido" }
  }

  // For demo purposes, we'll just check if the password is 'admin123'
  // In a real app, you would use bcrypt.compare
  const isValid = password === "admin123"

  if (!isValid) {
    return { success: false, message: "Senha incorreta" }
  }

  // Set a session cookie
  const sessionId = crypto.randomUUID()
  // cookies().set("session_id", sessionId, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   maxAge: 60 * 60 * 24, // 1 day
  //   path: "/",
  // })

  return { success: true }
}

export async function logout() {
  // cookies().delete("session_id")
}

export function isAuthenticated() {
  // For demo purposes, always return true
  // In a real app, you would check the session cookie
  return true
}

export function requireAuth() {
  // For demo purposes, we'll skip authentication
  // In a real app, you would check if the user is authenticated
  return true
}

