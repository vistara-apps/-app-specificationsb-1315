import { useState, useEffect, useCallback } from 'react'

const generateMockAgents = () => [
  {
    id: 1,
    name: 'ALPHA-7',
    pnl: 2847.32,
    status: 'active',
    reasoning: 'Detected bullish momentum in DeFi sector. Executing multi-leg arbitrage strategy across AMM pools.'
  },
  {
    id: 2,
    name: 'SIGMA-3',
    pnl: -156.78,
    status: 'analyzing',
    reasoning: 'Market volatility spike detected. Recalibrating risk parameters and adjusting position sizes.'
  },
  {
    id: 3,
    name: 'DELTA-9',
    pnl: 1923.45,
    status: 'active',
    reasoning: 'Whale movement analysis indicates potential price breakout. Positioning for momentum capture.'
  },
  {
    id: 4,
    name: 'GAMMA-1',
    pnl: 567.89,
    status: 'active',
    reasoning: 'Cross-chain yield farming opportunities identified. Optimizing gas costs for maximum efficiency.'
  },
  {
    id: 5,
    name: 'BETA-5',
    pnl: -89.23,
    status: 'standby',
    reasoning: 'Waiting for confirmation signals. Market conditions not meeting entry criteria for swing trades.'
  },
  {
    id: 6,
    name: 'OMEGA-2',
    pnl: 3421.67,
    status: 'active',
    reasoning: 'Algorithm detected MEV opportunity. Front-running prevention protocol activated for profit extraction.'
  }
]

export default function useAgentData() {
  const [agents, setAgents] = useState(generateMockAgents())
  const [refreshing, setRefreshing] = useState(false)

  const refreshData = useCallback(() => {
    setRefreshing(true)
    
    // Simulate data update with small random changes
    setAgents(prevAgents => 
      prevAgents.map(agent => ({
        ...agent,
        pnl: agent.pnl + (Math.random() - 0.5) * 100,
        status: Math.random() > 0.8 ? 
          ['active', 'analyzing', 'standby'][Math.floor(Math.random() * 3)] : 
          agent.status
      }))
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