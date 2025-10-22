import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

const CRYPTO_ASSETS = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP' }
]

export default function CryptoPricing() {
  const [prices, setPrices] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const ids = CRYPTO_ASSETS.map(asset => asset.id).join(',')
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
        )
        const data = await response.json()
        setPrices(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching crypto prices:', error)
        // Use mock data if API fails
        const mockPrices = {}
        CRYPTO_ASSETS.forEach(asset => {
          mockPrices[asset.id] = {
            usd: Math.random() * 50000,
            usd_24h_change: (Math.random() - 0.5) * 10
          }
        })
        setPrices(mockPrices)
        setLoading(false)
      }
    }

    fetchPrices()
    const interval = setInterval(fetchPrices, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="pixelated-card p-6">
        <h2 className="text-xl font-bold text-gold-400 mb-4 pixel-text">
          TOP 5 BLUE CHIP ASSETS
        </h2>
        <div className="text-gray-400">Loading prices...</div>
      </div>
    )
  }

  return (
    <div className="pixelated-card p-6 mb-8">
      <h2 className="text-xl font-bold text-gold-400 mb-4 pixel-text">
        TOP 5 BLUE CHIP ASSETS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {CRYPTO_ASSETS.map(asset => {
          const priceData = prices[asset.id]
          const price = priceData?.usd || 0
          const change24h = priceData?.usd_24h_change || 0
          const isPositive = change24h >= 0

          return (
            <div 
              key={asset.id}
              className="pixel-border p-4 bg-gradient-to-br from-gray-900 to-black"
            >
              <div className="text-gold-400 font-bold text-lg pixel-text mb-1">
                {asset.symbol}
              </div>
              <div className="text-white font-mono text-xl mb-2">
                ${price.toLocaleString('en-US', { 
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2 
                })}
              </div>
              <div className={`flex items-center gap-1 text-sm font-semibold ${
                isPositive ? 'text-green-400' : 'text-red-400'
              }`}>
                {isPositive ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
                {isPositive ? '+' : ''}{change24h.toFixed(2)}%
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
