import { TrendingUp, TrendingDown, Bot, Cpu } from 'lucide-react'
import Waveform from './Waveform'
import PerformanceChart from './PerformanceChart'

export default function AgentCard({ agent, isTopPerformer, refreshing }) {
  const isPositive = agent.pnl >= 0
  const statusColor = agent.status === 'active' ? 'text-green-400' : 
                     agent.status === 'analyzing' ? 'text-yellow-400' : 
                     'text-red-400'

  return (
    <div className={`
      relative p-4 sm:p-6 rounded-lg transition-all duration-300 retro-scan
      ${isTopPerformer ? 'top-performer pixel-glow' : 'card-glow'}
      ${refreshing ? 'animate-refresh-pulse' : ''}
    `}>
      {/* Top row: Agent info and PnL */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <Bot className="text-gold-400 flex-shrink-0" size={20} />
            <h3 className="text-lg sm:text-xl font-semibold text-white font-mono">
              {agent.name}
            </h3>
            {isTopPerformer && (
              <span className="text-xs bg-gold-400 text-black px-2 py-1 rounded-full font-semibold pixel-text">
                TOP
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 ml-8">
            <Cpu size={14} className="text-gray-400" />
            <span className="text-xs text-gray-400 font-mono">
              {agent.model}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {isPositive ? (
            <TrendingUp className="text-green-400" size={18} />
          ) : (
            <TrendingDown className="text-red-400" size={18} />
          )}
          <span className={`font-mono font-bold text-lg sm:text-xl ${
            isPositive ? 'text-green-400' : 'text-red-400'
          }`}>
            {isPositive ? '+' : ''}${agent.pnl.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-2 h-2 rounded-full ${
          agent.status === 'active' ? 'bg-green-400 animate-pulse' : 
          agent.status === 'analyzing' ? 'bg-yellow-400 animate-pulse' : 
          'bg-red-400'
        }`} />
        <span className={`text-sm font-medium ${statusColor} capitalize`}>
          {agent.status}
        </span>
      </div>

      {/* Performance Chart */}
      <PerformanceChart 
        performanceHistory={agent.performanceHistory}
        agentName={agent.name}
      />

      {/* Reasoning with waveform */}
      <div className="flex items-start gap-3 mt-4">
        <div className="mt-1 flex-shrink-0">
          <Waveform />
        </div>
        <p className="text-sm text-gray-300 leading-relaxed flex-1">
          {agent.reasoning}
        </p>
      </div>
    </div>
  )
}