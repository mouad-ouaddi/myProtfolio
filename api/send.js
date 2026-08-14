import { sendContactEmail } from '../server/sendMail.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' })
    return
  }

  const { name, email, message } = req.body ?? {}

  if (!name || !email || !message) {
    res.status(400).json({ ok: false, error: 'Missing required fields' })
    return
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.SMTP_FROM || !process.env.SMTP_TO) {
    res.status(500).json({ ok: false, error: 'SMTP configuration missing' })
    return
  }

  try {
    await sendContactEmail(process.env, { name, email, message })
    res.status(200).json({ ok: true })
  } catch (err) {
    res.status(500).json({ ok: false, error: err instanceof Error ? err.message : 'Failed to send' })
  }
}