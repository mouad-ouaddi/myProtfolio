import nodemailer from 'nodemailer'

export async function sendContactEmail(config, { name, email, message }) {
  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: Number(config.SMTP_PORT) || 465,
    secure: true,
    auth: { user: config.SMTP_USER, pass: config.SMTP_PASS },
  })

  await transporter.sendMail({
    from: `"${name}" <${config.SMTP_FROM}>`,
    replyTo: `"${name}" <${email}>`,
    to: config.SMTP_TO,
    subject: `Portfolio contact - ${name}`,
    text: `Nom: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Nom :</strong> ${name}</p><p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p><p><strong>Message :</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`,
  })
}