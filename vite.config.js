import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { sendContactEmail } from './server/sendMail.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'contact-api',
        configureServer(server) {
          server.middlewares.use('/api/send', (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }))
              return
            }

            let body = ''
            req.on('data', (chunk) => (body += chunk))
            req.on('end', async () => {
              try {
                const { name, email, message } = JSON.parse(body)

                if (!name || !email || !message) {
                  res.statusCode = 400
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ ok: false, error: 'Missing required fields' }))
                  return
                }

                if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS || !env.SMTP_FROM || !env.SMTP_TO) {
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ ok: false, error: 'SMTP configuration missing' }))
                  return
                }

                await sendContactEmail(env, { name, email, message })
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ ok: true }))
              } catch (err) {
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ ok: false, error: err instanceof Error ? err.message : 'Failed to send' }))
              }
            })
          })
        },
      },
    ],
  }
})