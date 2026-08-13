// ---------------------------------------------------------------------------
// EMAIL SERVICE STUB
// ---------------------------------------------------------------------------
// This module intentionally does NOT send emails yet. It is the single place
// to plug in a real service later (EmailJS, Resend, a backend endpoint, etc.).
//
// To connect a real service:
//   1. Replace the body of `sendMessage` with your provider's call.
//   2. Keep the same signature so the Contact section needs no changes.
//   3. Remove the artificial delay and keep the return contract:
//      { ok: boolean, error?: string }
// ---------------------------------------------------------------------------

/**
 * Sends a contact message.
 * @param {{ name: string, email: string, message: string }} payload
 * @returns {Promise<{ ok: boolean, error?: string }>}
 */
export async function sendMessage({ name, email, message }) {
  // TODO: connect a real email/API service here.
  // Example (EmailJS):
  //   await emailjs.send('YOUR_SERVICE', 'YOUR_TEMPLATE', { name, email, message })
  //
  // Example (fetch to your own backend):
  //   const res = await fetch('/api/contact', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ name, email, message }),
  //   })
  //   if (!res.ok) throw new Error('Request failed')

  void name
  void email
  void message

  await new Promise((resolve) => setTimeout(resolve, 800))

  return { ok: true }
}
