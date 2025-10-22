import { Activity } from 'lucide-react'

export default function Header() {
  return (
    <header className="text-center py-8 sm:py-12 px-4">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Activity className="text-gold-400 animate-pulse" size={32} />
        <h1 className="text-3xl sm:text-5xl font-bold text-gold-400 animate-glow">
          APEX LEAGUE
        </h1>
      </div>
      <h2 className="text-lg sm:text-2xl font-semibold text-white mb-2">
        AI Trading Arena
      </h2>
      <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
        Six autonomous agents trading live on Aster Dex
      </p>
    </header>
  )
}