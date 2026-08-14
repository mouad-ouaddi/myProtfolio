// ---------------------------------------------------------------------------
// EMAIL SERVICE - Own backend (/api/send)
// ---------------------------------------------------------------------------
// Sends contact messages through the Vercel serverless function in api/send.js
// (Nodemailer + Gmail SMTP). Keeps the same signature/contract so Contact.jsx
// needs no changes: { ok: boolean, error?: string }
// ---------------------------------------------------------------------------

export async function sendMessage({ name, email, message }) {
  try {
    const res = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })

    const data = await res.json()
    if (!res.ok || !data.ok) {
      return { ok: false, error: data.error || `Request failed (${res.status})` }
    }

    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Network error' }
  }
}
