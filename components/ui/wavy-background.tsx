"use client"
import { cn } from "@/lib/utils"
import type React from "react"

import { useEffect, useRef } from "react"

interface WavyBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
  animate?: boolean
  colors?: string[]
}

export function WavyBackground({
  children,
  className,
  colors = ["rgba(167, 139, 250, 0.05)", "rgba(175, 180, 240, 0.05)", "rgba(220, 160, 240, 0.06)"],
  animate = true,
  ...props
}: WavyBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const waveRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)
  const xRef = useRef<number[]>(Array.from({ length: 4 }, () => Math.random() * 100))
  const yRef = useRef<number[]>(Array.from({ length: 4 }, () => Math.random() * 100))
  const amplitudeRef = useRef<number[]>(Array.from({ length: 4 }, () => Math.random() * 20 + 10))
  const frequencyRef = useRef<number[]>(Array.from({ length: 4 }, () => Math.random() * 0.02 + 0.01))
  const speedRef = useRef<number[]>(Array.from({ length: 4 }, () => Math.random() * 0.001 + 0.0005))

  useEffect(() => {
    if (!animate) return

    const container = containerRef.current
    const wave = waveRef.current
    if (!container || !wave) return

    const calculateWavePosition = (t: number) => {
      const points: [number, number][] = []
      const width = container.offsetWidth
      const height = container.offsetHeight
      const segment = width / 30

      for (let i = 0; i <= 30; i++) {
        const x = i * segment
        let y = 0

        for (let j = 0; j < 4; j++) {
          const xPos = (x + xRef.current[j]) % width
          y += Math.sin(t * speedRef.current[j] + xPos * frequencyRef.current[j]) * amplitudeRef.current[j]
        }

        points.push([x, height / 2 + y])
      }

      return points
    }

    const createWavePath = (points: [number, number][]) => {
      const width = container.offsetWidth
      const height = container.offsetHeight
      const segments = points
        .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${Math.min(Math.max(0, y), height)}`)
        .join(" ")
      return `${segments} L${width},${height} L0,${height}Z`
    }

    const renderWave = () => {
      const time = Date.now()
      const points = calculateWavePosition(time)
      const paths = Array.from({ length: colors.length }, (_, i) => {
        const yOffset = (i + 1) * 20
        const adjustedPoints = points.map(([x, y]) => [x, y + yOffset * Math.sin(x * 0.01 + time * 0.001)])
        return createWavePath(adjustedPoints as [number, number][])
      })

      // Update SVG paths
      const svgPaths = wave.querySelectorAll("path")
      paths.forEach((path, i) => {
        if (svgPaths[i]) {
          svgPaths[i].setAttribute("d", path)
        }
      })

      animationRef.current = requestAnimationFrame(renderWave)
    }

    renderWave()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [animate, colors.length])

  return (
    <div ref={containerRef} className={cn("h-full w-full overflow-hidden", className)} {...props}>
      <div ref={waveRef} className="absolute inset-0">
        <svg className="h-full w-full">
          {colors.map((color, i) => (
            <path key={i} fill={color} />
          ))}
        </svg>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

