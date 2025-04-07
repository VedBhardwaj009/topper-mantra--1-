"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

export function SparklesCore({
  id,
  className,
  background,
  minSize,
  maxSize,
  particleDensity,
  particleColor,
  particleOpacity,
  speed,
  ...props
}: {
  id: string
  className?: string
  background?: string
  minSize?: number
  maxSize?: number
  particleCount?: number
  particleDensity?: number
  particleColor?: string
  particleOpacity?: number
  speed?: number
  children?: React.ReactNode
  [key: string]: any
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<
    Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
    }>
  >([])

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    const density = particleDensity || 100
    const particleCount = Math.floor((width * height) / (10000 / density))
    const minParticleSize = minSize || 0.5
    const maxParticleSize = maxSize || 1.5
    const particleSpeed = speed || 1

    const newParticles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * (maxParticleSize - minParticleSize) + minParticleSize,
      speedX: (Math.random() - 0.5) * particleSpeed,
      speedY: (Math.random() - 0.5) * particleSpeed,
      opacity: Math.random() * (particleOpacity || 1),
    }))

    setParticles(newParticles)

    const animationFrame = requestAnimationFrame(animate)
    let previousTimestamp: number | null = null

    function animate(timestamp: number) {
      if (!containerRef.current) return

      if (previousTimestamp === null) {
        previousTimestamp = timestamp
        requestAnimationFrame(animate)
        return
      }

      const deltaTime = timestamp - previousTimestamp
      previousTimestamp = timestamp

      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let newX = particle.x + particle.speedX * deltaTime * 0.03
          let newY = particle.y + particle.speedY * deltaTime * 0.03

          // Wrap around the screen
          if (newX < 0) newX = width + newX
          if (newX > width) newX = newX - width
          if (newY < 0) newY = height + newY
          if (newY > height) newY = newY - height

          return {
            ...particle,
            x: newX,
            y: newY,
          }
        }),
      )

      requestAnimationFrame(animate)
    }

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [particleDensity, minSize, maxSize, speed, particleOpacity])

  return (
    <div ref={containerRef} id={id} className={cn("h-full w-full", className)} {...props}>
      <div
        className="absolute inset-0"
        style={{
          background: background || "transparent",
        }}
      />
      <div className="absolute inset-0">
        <svg className="absolute inset-0 h-full w-full">
          {particles.map((particle, index) => (
            <circle
              key={index}
              cx={particle.x}
              cy={particle.y}
              r={particle.size}
              fill={particleColor || "#FFF"}
              opacity={particle.opacity}
            />
          ))}
        </svg>
      </div>
    </div>
  )
}

