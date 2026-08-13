import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, Loader2, Mail, Send } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/icons'
import Reveal from '../components/Reveal'
import { profile } from '../data/profile'
import { useT } from '../i18n'
import { sendMessage } from '../lib/sendEmail'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initialState = { name: '', email: '', message: '' }

function validate(field, value, t) {
  if (field === 'name') {
    if (!value.trim()) return t('contact.errors.nameRequired')
    if (value.trim().length < 2) return t('contact.errors.nameShort')
  }
  if (field === 'email') {
    if (!value.trim()) return t('contact.errors.emailRequired')
    if (!EMAIL_RE.test(value.trim())) return t('contact.errors.emailInvalid')
  }
  if (field === 'message') {
    if (!value.trim()) return t('contact.errors.messageRequired')
    if (value.trim().length < 10) return t('contact.errors.messageShort')
  }
  return ''
}

export default function Contact() {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const reduce = useReducedMotion()
  const t = useT()

  const contactLinks = [
    { id: 'email', label: profile.email, href: `mailto:${profile.email}`, icon: Mail },
    { id: 'github', label: 'GitHub', href: profile.socials.github, icon: GithubIcon },
    { id: 'linkedin', label: 'LinkedIn', href: profile.socials.linkedin, icon: LinkedinIcon },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value, t) }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setErrors((prev) => ({ ...prev, [name]: validate(name, value, t) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = {
      name: validate('name', values.name, t),
      email: validate('email', values.email, t),
      message: validate('message', values.message, t),
    }
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    setStatus('sending')
    const result = await sendMessage(values)
    if (result.ok) {
      setStatus('success')
      setValues(initialState)
    } else {
      setStatus('error')
    }
  }

  const inputClass = (field) =>
    `w-full rounded-xl border bg-paper px-4 py-3 text-sm text-gray-800 transition-colors duration-200 placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:outline-none dark:bg-ink dark:text-mint dark:placeholder:text-ink-muted/60 ${
      errors[field]
        ? 'border-red-400 focus:border-red-400'
        : 'border-line focus:border-primary dark:border-ink-line dark:focus:border-primary-600'
    }`

  return (
    <section
      id="contact"
      className="scroll-mt-28 border-t border-line bg-paper/50 py-20 sm:py-28 dark:border-ink-line dark:bg-ink-soft/30"
    >
      <div className="section-shell grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <span className="font-mono text-xs font-semibold tracking-[0.25em] text-primary uppercase dark:text-primary-600">
              {t('contact.eyebrow')}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display mt-3 text-3xl font-bold text-balance text-gray-900 sm:text-4xl dark:text-mint">
              {t('contact.title')}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 max-w-md text-base leading-relaxed text-gray-600 dark:text-ink-muted">
              {t('contact.intro')}
            </p>
          </Reveal>

          <ul className="mt-8 space-y-3">
            {contactLinks.map(({ id, label, href, icon: Icon }, i) => (
              <Reveal key={id} delay={0.22 + i * 0.06}>
                <li>
                  <a
                    href={href}
                    target={id === 'email' ? undefined : '_blank'}
                    rel={id === 'email' ? undefined : 'noreferrer'}
                    className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-paper hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none dark:text-mint dark:hover:bg-ink-soft dark:hover:text-primary-600"
                  >
                    <span className="flex size-9 items-center justify-center rounded-lg border border-line text-gray-500 transition-colors group-hover:border-primary group-hover:text-primary dark:border-ink-line dark:text-ink-muted dark:group-hover:text-primary-600">
                      <Icon className="size-4" strokeWidth={1.9} />
                    </span>
                    {label}
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-line bg-paper p-6 shadow-card sm:p-8 dark:border-ink-line dark:bg-ink-soft">
            <AnimatePresence mode="wait" initial={false}>
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center py-14 text-center"
                  role="status"
                >
                  <CheckCircle2 className="size-12 text-primary dark:text-primary-600" strokeWidth={1.6} />
                  <h3 className="font-display mt-5 text-xl font-bold text-gray-900 dark:text-mint">
                    {t('contact.successTitle')}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-gray-600 dark:text-ink-muted">
                    {t('contact.successBodyBefore')}{' '}
                    <code className="font-mono text-xs text-primary dark:text-primary-600">
                      src/lib/sendEmail.js
                    </code>{' '}
                    {t('contact.successBodyAfter')}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-6 rounded-xl border border-line px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none dark:border-ink-line dark:text-mint dark:hover:text-primary-600"
                  >
                    {t('contact.sendAnother')}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-display text-lg font-bold text-gray-900 dark:text-mint">
                    {t('contact.formTitle')}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-ink-muted">
                    {t('contact.requiredBefore')}{' '}
                    <span className="text-primary dark:text-primary-600">*</span>{' '}
                    {t('contact.requiredAfter')}
                  </p>

                  <div className="mt-6 space-y-5">
                    <div>
                      <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-gray-800 dark:text-mint">
                        {t('contact.name')} <span className="text-primary dark:text-primary-600">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder={t('contact.namePlaceholder')}
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        className={inputClass('name')}
                      />
                      {errors.name && (
                        <p id="contact-name-error" className="mt-1.5 text-xs text-red-500" role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-gray-800 dark:text-mint">
                        {t('contact.email')} <span className="text-primary dark:text-primary-600">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder={t('contact.emailPlaceholder')}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        className={inputClass('email')}
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="mt-1.5 text-xs text-red-500" role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-gray-800 dark:text-mint">
                        {t('contact.message')} <span className="text-primary dark:text-primary-600">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        placeholder={t('contact.messagePlaceholder')}
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                        className={`${inputClass('message')} resize-y`}
                      />
                      {errors.message && (
                        <p id="contact-message-error" className="mt-1.5 text-xs text-red-500" role="alert">
                          {errors.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {status === 'error' && (
                    <p className="mt-4 text-sm text-red-500" role="alert">
                      {t('contact.errorBody')}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-mint shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-card-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="size-4 animate-spin" strokeWidth={2.2} />
                        {t('contact.sending')}
                      </>
                    ) : (
                      <>
                        {t('contact.submit')}
                        <Send className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.2} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
