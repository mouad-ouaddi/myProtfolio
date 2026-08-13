import { useEffect, useMemo, useState } from 'react'
import { LangContext } from './langContext'

const STORAGE_KEY = 'mouad-lang'

export default function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'fr'
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      return stored === 'en' || stored === 'fr' ? stored : 'fr'
    } catch {
      return 'fr'
    }
  })

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const value = useMemo(() => ({ lang, setLang }), [lang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}
