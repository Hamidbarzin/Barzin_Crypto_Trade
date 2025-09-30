import React, { useState, useEffect } from 'react'

const SparklineMini = ({ data = [], height = 'var(--mini-spark-h)', color = 'var(--accent-primary)' }) => {
  const [RechartsComponents, setRechartsComponents] = useState(null)

  // Lazy load Recharts
  useEffect(() => {
    const loadRecharts = async () => {
      try {
        const RechartsModule = await import('recharts')
        const { AreaChart, Area, ResponsiveContainer } = RechartsModule
        setRechartsComponents({ AreaChart, Area, ResponsiveContainer })
      } catch (error) {
        console.error('Failed to load Recharts:', error)
      }
    }
    
    loadRecharts()
  }, [])

  // Generate sample data if none provided
  const chartData = data.length > 0 ? data : Array.from({ length: 20 }, (_, i) => ({
    value: Math.random() * 100 + 50 + Math.sin(i * 0.5) * 20
  }))

  // Fallback sparkline using SVG
  if (!RechartsComponents) {
    const points = chartData.map((item, index) => {
      const x = (index / (chartData.length - 1)) * 100
      const y = 100 - ((item.value - Math.min(...chartData.map(d => d.value))) / 
        (Math.max(...chartData.map(d => d.value)) - Math.min(...chartData.map(d => d.value)))) * 100
      return `${x},${y}`
    }).join(' ')

    return (
      <div style={{ height }} className="w-full">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id={`gradient-${Math.random()}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
              <stop offset="100%" stopColor={color} stopOpacity="0"/>
            </linearGradient>
          </defs>
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="2"
            points={points}
            className="animate-pulse"
          />
        </svg>
      </div>
    )
  }

  const { AreaChart, Area, ResponsiveContainer } = RechartsComponents

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
            dot={false}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SparklineMini