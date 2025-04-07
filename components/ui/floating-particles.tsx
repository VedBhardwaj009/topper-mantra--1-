"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface FloatingParticlesProps extends React.HTMLAttributes<HTMLDivElement> {
  quantity?: number
  particleColor?: string
  className?: string
}

export function FloatingParticles({
  quantity = 30,
  particleColor = "#8a3ffc",
  className,
  ...props
}: FloatingParticlesProps) {
  const [particles, setParticles] = useState<
    Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      blurAmount: number
    }>
  >([])

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const { width, height } = containerRef.current.getBoundingClientRect()

    // Initialize particles
    const initialParticles = Array.from({ length: quantity }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      blurAmount: Math.floor(Math.random() * 3),
    }))

    setParticles(initialParticles)

    // Animation loop
    const animationFrame = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let newX = particle.x + particle.speedX
          let newY = particle.y + particle.speedY

          // Bounce off edges
          if (newX <= 0 || newX >= width) {
            particle.speedX *= -1
            newX = particle.x + particle.speedX
          }

          if (newY <= 0 || newY >= height) {
            particle.speedY *= -1
            newY = particle.y + particle.speedY
          }

          return {
            ...particle,
            x: newX,
            y: newY,
          }
        }),
      )
    }, 50)

    return () => clearInterval(animationFrame)
  }, [quantity])

  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden", className)} {...props}>
      <div className="relative h-full w-full">
        {particles.map((particle, index) => (
          <div
            key={index}
            className="absolute rounded-full transform-gpu transition-transform duration-500"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particleColor,
              opacity: particle.opacity,
              filter: `blur(${particle.blurAmount}px)`,
              boxShadow: `0 0 ${particle.size * 2}px ${particleColor}`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

