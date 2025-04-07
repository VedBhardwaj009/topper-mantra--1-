"use client"
import { cn } from "@/lib/utils"
import type React from "react"
import { useEffect, useRef, useState } from "react"

export function BackgroundBeams({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const ref = useRef<HTMLDivElement>(null)
  const [beams, setBeams] = useState<
    {
      x: number
      y: number
      size: number
      intensity: number
      speedX: number
      speedY: number
    }[]
  >([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Initialize beams
    const newBeams = []
    for (let i = 0; i < 20; i++) {
      newBeams.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 0.5,
        intensity: Math.random() * 0.5 + 0.2,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
      })
    }
    setBeams(newBeams)

    const interval = setInterval(() => {
      setBeams((prevBeams) =>
        prevBeams.map((beam) => ({
          ...beam,
          x: beam.x + beam.speedX,
          y: beam.y + beam.speedY,
          // Reset position if out of bounds
          ...(beam.x < 0 || beam.x > window.innerWidth
            ? { x: Math.random() * window.innerWidth, speedX: -beam.speedX }
            : {}),
          ...(beam.y < 0 || beam.y > window.innerHeight
            ? { y: Math.random() * window.innerHeight, speedY: -beam.speedY }
            : {}),
        })),
      )
    }, 50)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(interval)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "h-full w-full overflow-hidden [mask-image:radial-gradient(1000px_at_50%_50%,white,transparent)]",
        className,
      )}
      {...props}
    >
      <svg className="pointer-events-none absolute z-0 h-full w-full opacity-50">
        <defs>
          <radialGradient
            id="radial-gradient"
            cx={mousePosition.x}
            cy={mousePosition.y}
            r="700"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="rgba(120, 58, 180, 0.3)" />
            <stop offset="100%" stopColor="rgba(120, 58, 180, 0)" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#radial-gradient)" />
        <g>
          {beams.map((beam, index) => (
            <circle
              key={index}
              cx={beam.x}
              cy={beam.y}
              r={beam.size * 50}
              fill={`rgba(123, 97, 255, ${beam.intensity * 0.3})`}
              style={{
                mixBlendMode: "screen",
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

