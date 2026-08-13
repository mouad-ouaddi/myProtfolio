import { useEffect, useState } from 'react'

export function useTypewriter(
  words,
  { typeSpeed = 70, deleteSpeed = 38, pause = 1700, disabled = false } = {}
) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState(disabled ? (words[0] ?? '') : '')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (disabled || words.length === 0) return
    const word = words[index] ?? ''
    let timer
    if (!deleting && text === word) {
      timer = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    } else {
      timer = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? deleteSpeed : typeSpeed
      )
    }
    return () => clearTimeout(timer)
  }, [text, deleting, index, words, pause, typeSpeed, deleteSpeed, disabled])

  return { text, showCaret: !disabled }
}
