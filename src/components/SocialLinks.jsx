import { profile } from '../data/profile'
import { GithubIcon, LinkedinIcon } from './icons'

const links = [
  { id: 'github', label: 'GitHub', icon: GithubIcon, href: profile.socials.github },
  { id: 'linkedin', label: 'LinkedIn', icon: LinkedinIcon, href: profile.socials.linkedin },
]

export default function SocialLinks({ className = '', iconClassName = '' }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {links.map(({ id, label, icon: Icon, href }) => (
        <li key={id}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            title={label}
            className={`inline-flex size-10 items-center justify-center rounded-full border border-line text-gray-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-mint focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none dark:border-ink-line dark:text-ink-muted dark:hover:border-primary-600 dark:hover:bg-primary dark:hover:text-mint ${iconClassName}`}
          >
            <Icon className="size-[18px]" strokeWidth={1.8} />
          </a>
        </li>
      ))}
    </ul>
  )
}
