"use client"

import { useEffect, useRef, useState } from "react"
import { ShieldCheck, Play, RotateCcw, Cpu, Sparkles } from "lucide-react"

const COLOR = "#FFFFFF"
const HIT_COLOR = "#222224"
const BACKGROUND_COLOR = "#080809"
const BALL_COLOR = "#EF4444" // Crimson red to match Blitzedo theme
const PADDLE_COLOR = "#EF4444"
const LETTER_SPACING = 1
const WORD_SPACING = 3

const PIXEL_MAP = {
  S: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  U: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  D: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
  ],
  I: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  O: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  P: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
  ],
  R: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
  ],
  F: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
  ],
  L: [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
}

interface Pixel {
  x: number
  y: number
  size: number
  hit: boolean
}

interface Ball {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
}

interface Paddle {
  x: number
  y: number
  width: number
  height: number
  targetY: number
  isVertical: boolean
}

export function PortfolioInteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const ballRef = useRef<Ball>({ x: 0, y: 0, dx: 0, dy: 0, radius: 0 })
  const paddlesRef = useRef<Paddle[]>([])
  const scaleRef = useRef(1)
  
  const [stats, setStats] = useState({
    activePixels: 0,
    totalPixels: 0,
    hits: 0,
    speed: 3,
    isMuted: true,
  })

  // Trigger game reset externally
  const handleReset = () => {
    if (canvasRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      canvasRef.current.width = rect.width
      canvasRef.current.height = rect.height
      scaleRef.current = Math.min(canvasRef.current.width / 1000, canvasRef.current.height / 500)
      
      // Reinitialize
      initializeGame()
    }
  }

  const initializeGame = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const scale = scaleRef.current
    const LARGE_PIXEL_SIZE = 8 * scale
    const SMALL_PIXEL_SIZE = 6 * scale
    const BALL_SPEED = 3 * scale

    pixelsRef.current = []
    const words = ["STUDIO", "PORTFOLIO"]

    const calculateWordWidth = (word: string, pixelSize: number) => {
      return (
        word.split("").reduce((width, letter) => {
          const letterWidth = PIXEL_MAP[letter as keyof typeof PIXEL_MAP]?.[0]?.length ?? 0
          return width + letterWidth * pixelSize + LETTER_SPACING * pixelSize
        }, 0) -
        LETTER_SPACING * pixelSize
      )
    }

    const totalWidthLarge = calculateWordWidth(words[0], LARGE_PIXEL_SIZE)
    const totalWidthSmall = calculateWordWidth(words[1], SMALL_PIXEL_SIZE)
    const totalWidth = Math.max(totalWidthLarge, totalWidthSmall)
    const scaleFactor = (canvas.width * 0.7) / totalWidth

    const adjustedLargePixelSize = LARGE_PIXEL_SIZE * scaleFactor
    const adjustedSmallPixelSize = SMALL_PIXEL_SIZE * scaleFactor

    const largeTextHeight = 5 * adjustedLargePixelSize
    const smallTextHeight = 5 * adjustedSmallPixelSize
    const spaceBetweenLines = 4 * adjustedLargePixelSize
    const totalTextHeight = largeTextHeight + spaceBetweenLines + smallTextHeight

    let startY = (canvas.height - totalTextHeight) / 2

    words.forEach((word, wordIndex) => {
      const pixelSize = wordIndex === 0 ? adjustedLargePixelSize : adjustedSmallPixelSize
      const totalWidth = wordIndex === 0 
        ? calculateWordWidth(word, adjustedLargePixelSize)
        : calculateWordWidth(word, adjustedSmallPixelSize)

      let startX = (canvas.width - totalWidth) / 2

      word.split("").forEach((letter) => {
        const pixelMap = PIXEL_MAP[letter as keyof typeof PIXEL_MAP]
        if (!pixelMap) return

        for (let i = 0; i < pixelMap.length; i++) {
          for (let j = 0; j < pixelMap[i].length; j++) {
            if (pixelMap[i][j]) {
              const x = startX + j * pixelSize
              const y = startY + i * pixelSize
              pixelsRef.current.push({ x, y, size: pixelSize, hit: false })
            }
          }
        }
        startX += (pixelMap[0].length + LETTER_SPACING) * pixelSize
      })
      startY += wordIndex === 0 ? largeTextHeight + spaceBetweenLines : 0
    })

    // Update state stats
    setStats(prev => ({
      ...prev,
      totalPixels: pixelsRef.current.length,
      activePixels: pixelsRef.current.length,
      hits: 0,
      speed: Math.round(BALL_SPEED)
    }))

    // Initialize ball position near top center-right
    const ballStartX = canvas.width * 0.8
    const ballStartY = canvas.height * 0.25

    ballRef.current = {
      x: ballStartX,
      y: ballStartY,
      dx: -BALL_SPEED,
      dy: BALL_SPEED,
      radius: adjustedLargePixelSize / 2,
    }

    const paddleWidth = Math.max(4, adjustedLargePixelSize)
    const paddleLength = 12 * adjustedLargePixelSize

    paddlesRef.current = [
      {
        x: 10,
        y: canvas.height / 2 - paddleLength / 2,
        width: paddleWidth,
        height: paddleLength,
        targetY: canvas.height / 2 - paddleLength / 2,
        isVertical: true,
      },
      {
        x: canvas.width - 10 - paddleWidth,
        y: canvas.height / 2 - paddleLength / 2,
        width: paddleWidth,
        height: paddleLength,
        targetY: canvas.height / 2 - paddleLength / 2,
        isVertical: true,
      },
      {
        x: canvas.width / 2 - paddleLength / 2,
        y: 10,
        width: paddleLength,
        height: paddleWidth,
        targetY: canvas.width / 2 - paddleLength / 2,
        isVertical: false,
      },
      {
        x: canvas.width / 2 - paddleLength / 2,
        y: canvas.height - 10 - paddleWidth,
        width: paddleLength,
        height: paddleWidth,
        targetY: canvas.width / 2 - paddleLength / 2,
        isVertical: false,
      },
    ]
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      scaleRef.current = Math.min(canvas.width / 1000, canvas.height / 500)
      initializeGame()
    }

    const updateGame = () => {
      const ball = ballRef.current
      const paddles = paddlesRef.current

      ball.x += ball.dx
      ball.y += ball.dy

      // Wall rebounds with slight random variation to prevent loops
      if (ball.y - ball.radius < 0) {
        ball.y = ball.radius
        ball.dy = -ball.dy + (Math.random() - 0.5) * 0.2
      } else if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius
        ball.dy = -ball.dy + (Math.random() - 0.5) * 0.2
      }

      if (ball.x - ball.radius < 0) {
        ball.x = ball.radius
        ball.dx = -ball.dx + (Math.random() - 0.5) * 0.2
      } else if (ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width - ball.radius
        ball.dx = -ball.dx + (Math.random() - 0.5) * 0.2
      }

      // Paddles logic
      paddles.forEach((paddle) => {
        if (paddle.isVertical) {
          if (
            ball.x - ball.radius < paddle.x + paddle.width &&
            ball.x + ball.radius > paddle.x &&
            ball.y > paddle.y &&
            ball.y < paddle.y + paddle.height
          ) {
            ball.dx = -ball.dx * 1.001 // Extremely slight speed boost on hits
          }
        } else {
          if (
            ball.y - ball.radius < paddle.y + paddle.height &&
            ball.y + ball.radius > paddle.y &&
            ball.x > paddle.x &&
            ball.x < paddle.x + paddle.width
          ) {
            ball.dy = -ball.dy * 1.001
          }
        }
      })

      // Smart paddles tracking
      paddles.forEach((paddle) => {
        if (paddle.isVertical) {
          paddle.targetY = ball.y - paddle.height / 2
          paddle.targetY = Math.max(10, Math.min(canvas.height - paddle.height - 10, paddle.targetY))
          paddle.y += (paddle.targetY - paddle.y) * 0.12
        } else {
          paddle.targetY = ball.x - paddle.width / 2
          paddle.targetY = Math.max(10, Math.min(canvas.width - paddle.width - 10, paddle.targetY))
          paddle.x += (paddle.targetY - paddle.x) * 0.12
        }
      })

      // Ball / Pixel grid micro-collisions
      let hitsIncrement = 0
      pixelsRef.current.forEach((pixel) => {
        if (
          !pixel.hit &&
          ball.x + ball.radius > pixel.x &&
          ball.x - ball.radius < pixel.x + pixel.size &&
          ball.y + ball.radius > pixel.y &&
          ball.y - ball.radius < pixel.y + pixel.size
        ) {
          pixel.hit = true
          hitsIncrement++
          
          const centerX = pixel.x + pixel.size / 2
          const centerY = pixel.y + pixel.size / 2
          if (Math.abs(ball.x - centerX) > Math.abs(ball.y - centerY)) {
            ball.dx = -ball.dx
          } else {
            ball.dy = -ball.dy
          }
        }
      })

      if (hitsIncrement > 0) {
        setStats(prev => {
          const newActive = Math.max(0, prev.activePixels - hitsIncrement)
          return {
            ...prev,
            activePixels: newActive,
            hits: prev.hits + hitsIncrement
          }
        })
      }
    }

    const drawGame = () => {
      if (!ctx) return

      ctx.fillStyle = BACKGROUND_COLOR
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw subtle grid points inside the retro matrix
      ctx.strokeStyle = "rgba(239, 68, 68, 0.05)"
      ctx.lineWidth = 1
      const gridSize = 30
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw pixels
      pixelsRef.current.forEach((pixel) => {
        ctx.fillStyle = pixel.hit ? HIT_COLOR : COLOR
        ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size)
        
        // Add tiny white/red frame around active pixels for premium finish
        if (!pixel.hit) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
          ctx.strokeRect(pixel.x, pixel.y, pixel.size, pixel.size)
        }
      })

      // Draw ball with glow effect
      ctx.shadowBlur = 8
      ctx.shadowColor = BALL_COLOR
      ctx.fillStyle = BALL_COLOR
      ctx.beginPath()
      ctx.arc(ballRef.current.x, ballRef.current.y, ballRef.current.radius, 0, Math.PI * 2)
      ctx.fill()
      
      // Reset shadows
      ctx.shadowBlur = 0

      // Draw paddles
      ctx.fillStyle = PADDLE_COLOR
      paddlesRef.current.forEach((paddle) => {
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
      })
    }

    let animationFrameId: number
    const gameLoop = () => {
      updateGame()
      drawGame()
      animationFrameId = requestAnimationFrame(gameLoop)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    
    // Scroll reveal: Reset and start game when section enters the viewport (only once)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          initializeGame()
          observer.disconnect() // Triggers only one time and doesn't reset on future scrolls
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(container)

    gameLoop()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Interactive canvas component */}
      <div className="lg:col-span-8 flex flex-col">
        <div 
          ref={containerRef} 
          className="w-full relative overflow-hidden bg-[#080809] min-h-[300px] md:min-h-[400px] flex-grow rounded-2xl border border-border/80 shadow-2xl group cursor-pointer"
          title="Click 'RESET GRID' below if you want to rebuild the letters!"
        >
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full block"
            aria-label="Studio Portfolio Pong Canvas"
          />
          
          {/* Subtle Corner Overlay Info tags */}
          <div className="absolute top-4 left-4 font-mono text-[9px] text-white/40 tracking-widest pointer-events-none uppercase">
            BLITZEDO MATRIX GRAPHICS // V3.0
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[9px] text-red-500/80 tracking-widest pointer-events-none uppercase flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" /> CORE ENGINE ACTIVE
          </div>
        </div>
      </div>

      {/* Side HUD panel to control and display parameters */}
      <div className="lg:col-span-4 bg-[#0c0c0d] border border-border/80 p-8 rounded-2xl flex flex-col justify-between">
        <div className="space-y-6">
          <div>
            <span className="text-red-500 font-mono text-xs font-bold tracking-widest block mb-1 uppercase flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5" /> SYSTEM GRAPHICS NODE
            </span>
            <h4 className="text-xl font-space font-bold text-white uppercase tracking-tight">PORTFOLIO MATRIX</h4>
          </div>
          
          <div className="space-y-3 font-mono text-xs text-gray-200">
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-gray-400">FPS RESOLUTION:</span>
              <span className="text-white font-bold">60FPS // STABLE</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-gray-400">RESOLVE STATE:</span>
              <span className="text-red-500 font-bold">ACTIVE DESTRUCT</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-gray-400">GRID SOLVED:</span>
              <span className="text-white">
                {stats.totalPixels > 0 
                  ? `${Math.round(((stats.totalPixels - stats.activePixels) / stats.totalPixels) * 100)}%`
                  : "0%"
                }
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-gray-400">PIXELS hit:</span>
              <span className="text-red-400 font-bold">{stats.hits} / {stats.totalPixels}</span>
            </div>
          </div>

          <p className="text-gray-300 text-xs leading-relaxed font-sans font-normal">
            We render our portfolio vectors using raw 2D canvases, bypassing bulky client-side frame engines. This interactive HUD represents our core philosophy: <strong>high performant interactive development</strong>.
          </p>
        </div>

        <div className="pt-6 border-t border-white/5 space-y-4">
          <button
            onClick={handleReset}
            className="w-full py-3 bg-red-600/10 border border-red-500/30 text-white font-mono font-bold text-xs uppercase tracking-widest hover:bg-red-500/20 hover:border-red-500 transition-all rounded flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <RotateCcw className="h-3.5 w-3.5" /> REBUILD MATRIX
          </button>
          
          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400 justify-center">
            <ShieldCheck className="h-3.5 w-3.5 text-green-400" />
            <span>OPTIMIZED VECTOR SOLVER</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioInteractiveCanvas
