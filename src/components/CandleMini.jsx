import React, { useEffect, useRef, useState } from 'react'

const CandleMini = ({ isVisible = true, color = 'cyan' }) => {
  const chartContainerRef = useRef(null)
  const chartRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Sample OHLC data for demonstration
  const sampleOHLC = [
    { time: '2024-01-01', open: 42000, high: 43000, low: 41000, close: 42500, volume: 1000 },
    { time: '2024-01-02', open: 42500, high: 44000, low: 42000, close: 43800, volume: 1200 },
    { time: '2024-01-03', open: 43800, high: 44500, low: 43000, close: 43200, volume: 800 },
    { time: '2024-01-04', open: 43200, high: 45000, low: 43000, close: 44800, volume: 1500 },
    { time: '2024-01-05', open: 44800, high: 46000, low: 44500, close: 45500, volume: 1300 },
    { time: '2024-01-06', open: 45500, high: 46500, low: 45000, close: 45200, volume: 900 },
    { time: '2024-01-07', open: 45200, high: 47000, low: 45000, close: 46800, volume: 1600 },
    { time: '2024-01-08', open: 46800, high: 48000, low: 46500, close: 47500, volume: 1400 }
  ]

  useEffect(() => {
    if (!isVisible || !chartContainerRef.current) return

    const loadChart = async () => {
      try {
        // Lazy import lightweight-charts
        const { createChart, ColorType } = await import('lightweight-charts')
        
        if (!chartContainerRef.current) return

        // Create chart
        const chart = createChart(chartContainerRef.current, {
          layout: {
            background: { type: ColorType.Solid, color: '#0b0b0e' },
            textColor: '#9aa4b2',
          },
          grid: {
            vertLines: { color: '#1f2937' },
            horzLines: { color: '#1f2937' },
          },
          rightPriceScale: {
            borderVisible: false,
          },
          timeScale: {
            borderVisible: false,
            timeVisible: false,
            secondsVisible: false,
          },
          crosshair: {
            mode: 0, // Normal crosshair mode
          },
        })

        // Color mappings
        const colorMap = {
          orange: '#f97316',
          blue: '#3b82f6', 
          purple: '#a855f7',
          indigo: '#6366f1',
          cyan: '#22d3ee'
        }
        const upColor = colorMap[color] || '#22d3ee'
        
        // Add candlestick series
        const candleSeries = chart.addCandlestickSeries({
          upColor: upColor,
          downColor: '#ef4444',
          borderVisible: false,
          wickUpColor: upColor,
          wickDownColor: '#ef4444',
        })

        // Add volume series
        const volumeSeries = chart.addHistogramSeries({
          priceFormat: {
            type: 'volume',
          },
          priceScaleId: '',
          color: 'rgba(34, 211, 238, 0.35)',
          base: 0,
          scaleMargins: {
            top: 0.8,
            bottom: 0,
          },
        })

        // Set data
        candleSeries.setData(sampleOHLC)
        volumeSeries.setData(sampleOHLC.map(d => ({
          time: d.time,
          value: d.volume
        })))

        // Resize function
        const handleResize = () => {
          if (chartContainerRef.current && chart) {
            const chartHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--chart-h')) || 224
            chart.applyOptions({
              width: chartContainerRef.current.clientWidth,
              height: chartHeight
            })
          }
        }

        // Initial resize
        handleResize()
        
        // Add resize listener
        window.addEventListener('resize', handleResize)

        // Store chart reference for cleanup
        chartRef.current = chart

        setIsLoaded(true)

        // Cleanup function
        return () => {
          window.removeEventListener('resize', handleResize)
          if (chartRef.current) {
            chartRef.current.remove()
            chartRef.current = null
          }
        }
      } catch (error) {
        console.error('Candle fallback - Failed to load lightweight-charts:', error)
        // Fallback will be rendered instead
      }
    }

    loadChart()

    return () => {
      if (chartRef.current) {
        chartRef.current.remove()
        chartRef.current = null
      }
    }
  }, [isVisible])

  // Fallback chart using simple SVG if lightweight-charts fails
  if (!isLoaded) {
    return (
      <div 
        ref={chartContainerRef}
        className="w-full bg-[#0b0b0e] rounded-lg flex items-center justify-center"
        style={{ height: 'var(--chart-h)' }}
      >
        <div className="text-center">
          <div className="w-full h-32 flex items-end justify-center space-x-1 mb-2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-4 bg-gradient-to-t from-[var(--accent-primary)] to-[var(--success)] animate-pulse"
                style={{
                  height: `${Math.random() * 60 + 20}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
          <div className="text-xs text-[var(--text-secondary)]">Chart Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={chartContainerRef}
      className="w-full rounded-lg overflow-hidden"
      style={{ height: 'var(--chart-h)' }}
    />
  )
}

export default CandleMini