import { useContext } from 'react'
import { LangContext } from './langContext'
import { texts } from './texts'

export function useI18n() {
  return useContext(LangContext)
}

// Interpolate placeholders like {name} with provided values.
function interpolate(str, vars = {}) {
  return str.replace(/\{(\w+)\}/g, (match, key) => vars[key] ?? match)
}

// Tiny path-based translator: t('contact.errors.nameShort', { ...vars }).
export function useT() {
  const { lang } = useI18n()
  return (path, vars) => {
    const dict = texts[lang] ?? texts.fr
    const fallback = texts.fr
    let value = dict
    let fb = fallback
    for (const key of path.split('.')) {
      value = value?.[key]
      fb = fb?.[key]
    }
    return interpolate(typeof value === 'string' ? value : (typeof fb === 'string' ? fb : path), vars)
  }
}

// Select a localized value from a { fr, en } object.
export function tr(value, lang) {
  if (!value) return value
  if (typeof value !== 'object') return value
  return value[lang] ?? value.fr
}
