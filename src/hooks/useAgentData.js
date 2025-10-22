import { useState, useEffect, useCallback } from 'react'

const generateMockAgents = () => [
  {
    id: 1,
    name: 'DeepSeek',
    model: 'DeepSeek-V3',
    pnl: 2847.32,
    status: 'active',
    reasoning: 'Detected bullish momentum in DeFi sector. Executing multi-leg arbitrage strategy across AMM pools.',
    performanceHistory: []
  },
  {
    id: 2,
    name: 'Grok',
    model: 'Grok-2',
    pnl: -156.78,
    status: 'analyzing',
    reasoning: 'Market volatility spike detected. Recalibrating risk parameters and adjusting position sizes.',
    performanceHistory: []
  },
  {
    id: 3,
    name: 'ChatGPT',
    model: 'GPT-4',
    pnl: 1923.45,
    status: 'active',
    reasoning: 'Whale movement analysis indicates potential price breakout. Positioning for momentum capture.',
    performanceHistory: []
  },
  {
    id: 4,
    name: 'Claude',
    model: 'Claude 3.5 Sonnet',
    pnl: 567.89,
    status: 'active',
    reasoning: 'Cross-chain yield farming opportunities identified. Optimizing gas costs for maximum efficiency.',
    performanceHistory: []
  },
  {
    id: 5,
    name: 'Gemini',
    model: 'Gemini 2.0 Flash',
    pnl: -89.23,
    status: 'standby',
    reasoning: 'Waiting for confirmation signals. Market conditions not meeting entry criteria for swing trades.',
    performanceHistory: []
  }
]

export default function useAgentData() {
  const [agents, setAgents] = useState(() => {
    const initialAgents = generateMockAgents()
    const now = Date.now()
    // Initialize with some historical data points
    return initialAgents.map(agent => ({
      ...agent,
      performanceHistory: Array.from({ length: 20 }, (_, i) => ({
        timestamp: now - (20 - i) * 15000, // 15 seconds apart
        pnl: agent.pnl - (20 - i) * (Math.random() - 0.5) * 50
      }))
    }))
  })
  const [refreshing, setRefreshing] = useState(false)

  const refreshData = useCallback(() => {
    setRefreshing(true)
    
    // Simulate data update with small random changes
    setAgents(prevAgents => 
      prevAgents.map(agent => {
        const newPnl = agent.pnl + (Math.random() - 0.5) * 100
        const newHistoryPoint = {
          timestamp: Date.now(),
          pnl: newPnl
        }
        
        return {
          ...agent,
          pnl: newPnl,
          status: Math.random() > 0.8 ? 
            ['active', 'analyzing', 'standby'][Math.floor(Math.random() * 3)] : 
            agent.status,
          performanceHistory: [...agent.performanceHistory.slice(-19), newHistoryPoint]
        }
      })
    )

    setTimeout(() => setRefreshing(false), 800)
  }, [])

  useEffect(() => {
    const interval = setInterval(refreshData, 5000)
    return () => clearInterval(interval)
  }, [refreshData])

  const topPerformer = agents.reduce((top, agent) => 
    agent.pnl > top.pnl ? agent : top
  , agents[0])

  return { agents, topPerformer, refreshing }
}