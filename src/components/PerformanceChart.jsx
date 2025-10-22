import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function PerformanceChart({ performanceHistory, agentName }) {
  if (!performanceHistory || performanceHistory.length === 0) {
    return null
  }

  const chartData = performanceHistory.map((point, index) => ({
    index,
    pnl: point.pnl,
    time: new Date(point.timestamp).toLocaleTimeString()
  }))

  const minPnl = Math.min(...chartData.map(d => d.pnl))
  const maxPnl = Math.max(...chartData.map(d => d.pnl))
  const isPositive = chartData[chartData.length - 1]?.pnl >= 0

  return (
    <div className="mt-4 h-32">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <XAxis 
            dataKey="index" 
            hide
          />
          <YAxis 
            domain={[minPnl * 0.95, maxPnl * 1.05]}
            hide
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              borderRadius: '4px',
              padding: '8px'
            }}
            labelStyle={{ color: '#FFD700', fontSize: '12px' }}
            itemStyle={{ color: isPositive ? '#4ADE80' : '#F87171', fontSize: '12px' }}
            formatter={(value) => [`$${value.toFixed(2)}`, 'PnL']}
            labelFormatter={(index) => chartData[index]?.time || ''}
          />
          <Line 
            type="monotone" 
            dataKey="pnl" 
            stroke={isPositive ? '#4ADE80' : '#F87171'}
            strokeWidth={2}
            dot={false}
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
