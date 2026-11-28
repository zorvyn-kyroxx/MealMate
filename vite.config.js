import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

const hasServiceRoleKey = (key) => {
  if (!key) return false
  if (key.startsWith('sb_secret_')) return true

  const payload = key.split('.')[1]
  if (!payload) return false

  try {
    const base64Payload = payload.replace(/-/g, '+').replace(/_/g, '/')
    const claims = JSON.parse(Buffer.from(base64Payload, 'base64').toString('utf8'))
    return claims.role === 'service_role'
  } catch {
    return false
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const browserKeys = [
    env.VITE_SUPABASE_PUBLISHABLE_KEY,
    env.VITE_SUPABASE_ANON_KEY
  ]
  const serviceRoleVariable = Object.entries(env).find(([name, value]) =>
    value && name.startsWith('VITE_') && /service.?role|secret/i.test(name)
  )

  if (browserKeys.some(hasServiceRoleKey) || serviceRoleVariable) {
    throw new Error('Supabase service-role/secret keys must not be used in VITE_ frontend variables.')
  }

  return {
    plugins: [react()],
    server: {
      host: true, // Listens on all local IPs (e.g. 0.0.0.0) so devices on your Wi-Fi can connect
      port: 5173
    }
  }
})
