import { motion } from 'framer-motion'
import BackToTop from './components/BackToTop'
import Particles from './components/Particles'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import CustomCursor from './components/CustomCursor'
import { useTheme } from './hooks/useTheme'
import { useT } from './i18n'
import About from './sections/About'
import Contact from './sections/Contact'
import Experience from './sections/Experience'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Skills from './sections/Skills'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const t = useT()

  return (
    <div className="relative min-h-screen">
      <Particles />
      <a
        href="#main"
        className="sr-only z-[80] rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-mint focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        {t('skip')}
      </a>

      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <ScrollProgress />
      <CustomCursor />

      <motion.main
        id="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </motion.main>

      <Footer />
      <BackToTop />
    </div>
  )
}
