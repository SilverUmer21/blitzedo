import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, ArrowUpRight, Cpu, Gamepad2, Code2, Globe, ShieldCheck, Terminal, Sparkles } from 'lucide-react';
import { PortfolioInteractiveCanvas } from './ui/portfolio-interactive-canvas';

export const FeaturedProjects: React.FC = () => {
  // --- GAME: Project CINDER State ---
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [playerX, setPlayerX] = useState(50); // percentage 0-100
  const [lasers, setLasers] = useState<{ id: number; x: number; y: number }[]>([]);
  const [asteroids, setAsteroids] = useState<{ id: number; x: number; y: number; speed: number }[]>([]);
  const gameAreaRef = useRef<HTMLDivElement | null>(null);
  const playerXRef = useRef(50);
  
  // High-performance physics refs
  const lasersRef = useRef<{ id: number; x: number; y: number }[]>([]);
  const asteroidsRef = useRef<{ id: number; x: number; y: number; speed: number }[]>([]);
  const scoreRef = useRef(0);

  // ==================== PROJECT CINDER (GAME) LOGIC ====================
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    scoreRef.current = 0;
    setAsteroids([]);
    asteroidsRef.current = [];
    setLasers([]);
    lasersRef.current = [];
    setPlayerX(50);
    playerXRef.current = 50;
  };

  // Handle ship movement inside game card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gameState !== 'playing' || !gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const clampedX = Math.max(5, Math.min(95, x));
    setPlayerX(clampedX);
    playerXRef.current = clampedX;
  };

  const handleShoot = () => {
    if (gameState !== 'playing') return;
    const newLaser = { id: Date.now() + Math.random(), x: playerXRef.current, y: 80 };
    lasersRef.current.push(newLaser);
    setLasers([...lasersRef.current]);
  };

  // Game Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    let lastTime = performance.now();
    let animationFrameId: number;

    const gameLoop = (time: number) => {
      const delta = time - lastTime;
      
      // Update physics at fixed ~30 ticks per second for steady playable pace
      if (delta >= 33) {
        lastTime = time;

        // 1. Move and filter lasers
        lasersRef.current = lasersRef.current
          .map((l) => ({ ...l, y: l.y - 4.5 }))
          .filter((l) => l.y > 0);

        // 2. Move asteroids
        asteroidsRef.current = asteroidsRef.current.map((a) => ({
          ...a,
          y: a.y + a.speed,
        }));

        // 3. Collision Check: Laser vs Asteroid
        let hitLasers: number[] = [];
        let hitAsteroids: number[] = [];

        lasersRef.current.forEach((l) => {
          asteroidsRef.current.forEach((a) => {
            if (Math.abs(l.x - a.x) < 8 && Math.abs(l.y - a.y) < 8) {
              hitLasers.push(l.id);
              hitAsteroids.push(a.id);
            }
          });
        });

        if (hitAsteroids.length > 0) {
          scoreRef.current += 100 * hitAsteroids.length;
          setScore(scoreRef.current);
          
          // Remove hit entities
          lasersRef.current = lasersRef.current.filter((l) => !hitLasers.includes(l.id));
          asteroidsRef.current = asteroidsRef.current.filter((a) => !hitAsteroids.includes(a.id));
        }

        // 4. Collision Check: Asteroid vs Player Ship
        const playerHit = asteroidsRef.current.some((a) => {
          return a.y > 85 && a.y < 95 && Math.abs(a.x - playerXRef.current) < 10;
        });

        if (playerHit) {
          setGameState('gameover');
          return;
        }

        // Filter out bottom out-of-bounds asteroids
        asteroidsRef.current = asteroidsRef.current.filter((a) => a.y < 100);

        // Spawn new Asteroids at highly playable pace and speeds
        if (Math.random() < 0.05 && asteroidsRef.current.length < 4) {
          asteroidsRef.current.push({
            id: Date.now() + Math.random(),
            x: Math.random() * 80 + 10,
            y: 0,
            speed: Math.random() * 0.7 + 0.6, // Slower fall speeds for a very fun, retro arcade-style balance
          });
        }

        // Single-frame batch sync to React state for UI rendering
        setLasers([...lasersRef.current]);
        setAsteroids([...asteroidsRef.current]);
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState]);

  // Delivered Projects Data
  const deliveredProjects = [
    {
      id: 'avalanch',
      title: 'Project Avalanche',
      client: 'CoreTech Interactive',
      type: 'Real-Time Physics Simulation',
      year: '2025',
      description: 'A highly scalable spatial solver simulating over 50,000 active rigid bodies inside distributed web environments. Built for absolute synchronization accuracy and minimal frame times.',
      tags: ['Rust', 'WebAssembly', 'WebSockets', 'Tailwind'],
    },
    {
      id: 'apex',
      title: 'Project Apex',
      client: 'Zenith Media Corp',
      type: 'Cloud Architecture & Streaming',
      year: '2025',
      description: 'Delivered a high-throughput edge video delivery pipeline routing live segments globally under 20ms of edge latency. Handles up to 2.5 million concurrent requests.',
      tags: ['Go', 'Kubernetes', 'gRPC', 'Edge CDN'],
    },
    {
      id: 'neon',
      title: 'Project Neon',
      client: 'Apex Game Studio',
      type: 'Creative Level Builder Toolchain',
      year: '2024',
      description: 'Designed a high-end desktop level authoring environment featuring instant hot-reloading, multi-threaded asset optimization, and a customizable layout engine.',
      tags: ['React', 'Electron', 'TypeScript', 'WebAssembly'],
    },
    {
      id: 'solis',
      title: 'Project Solis',
      client: 'Solis Prime Group',
      type: 'High-Security Liquidity SaaS',
      year: '2026',
      description: 'Built a secure multi-layered ledger and transaction processing system with instant automated clearing, cryptographic authentication layers, and real-time ledger metrics.',
      tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Cryptography'],
    }
  ];

  return (
    <section id="projects" className="py-24 md:py-32 border-t border-border bg-void text-white relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Active System Heading */}
        <div className="mb-12">
          <span className="text-red-500 font-mono text-sm font-bold tracking-widest uppercase block mb-3">
            ACTIVE SYSTEM LAB // SIMULATOR
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white uppercase leading-none">
            ACTIVE SHADER RESEARCH
          </h2>
        </div>

        {/* Bento Grid: Active Game (Cinder) Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-24">
          
          {/* Left Column: Playable Minigame Showcase - Span 7 */}
          <div className="lg:col-span-7 bg-ink border border-border/80 p-6 md:p-8 rounded-2xl flex flex-col justify-between min-h-[500px] relative overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            
            <div className="relative z-10 flex justify-between items-center mb-6">
              <span className="text-red-500 font-mono text-xs font-bold tracking-widest flex items-center gap-2">
                <Gamepad2 className="h-4.5 w-4.5" /> ACTIVE CORE // FLUID RECONCILIATION
              </span>
              <span className="text-gray-300 font-mono text-xs">CINDER_V1.2_STABLE</span>
            </div>

            {/* PLAYABLE MINIGAME INNER CONTAINER */}
            <div className="my-2 flex-grow relative bg-void border border-border overflow-hidden select-none min-h-[280px] rounded-lg">
              {gameState === 'idle' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent pointer-events-none" />
                  <p className="text-white font-space text-lg font-bold mb-4 uppercase tracking-wider">PROJECT CINDER SIMULATION</p>
                  <p className="text-gray-200 text-sm mb-6 max-w-xs font-sans leading-relaxed">
                    Test the sub-millisecond input responsiveness of our core vector mechanics directly in this sandbox.
                  </p>
                  <motion.button 
                    onClick={startGame}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="px-6 py-3.5 bg-blitz-red text-white text-xs font-mono font-bold uppercase tracking-widest hover:bg-red-700 transition-colors flex items-center gap-2 cursor-pointer rounded-xl active:scale-[0.98] shadow-lg shadow-red-600/20"
                  >
                    <Play className="h-4 w-4 fill-white" /> INITIALIZE SIMULATION
                  </motion.button>
                </div>
              )}

              {gameState === 'playing' && (
                <div 
                  ref={gameAreaRef}
                  onMouseMove={handleMouseMove}
                  onClick={handleShoot}
                  className="absolute inset-0 cursor-crosshair overflow-hidden"
                >
                  {/* Dashboard Score */}
                  <div className="absolute top-3 left-4 font-mono text-xs text-white/80 flex gap-4 bg-void/85 px-3 py-1.5 rounded border border-border/50">
                    <span>SCORE: <strong className="text-red-500 font-bold">{score}</strong></span>
                    <span>SHIELD: <strong className="text-green-400 font-bold">100%</strong></span>
                  </div>
                  
                  {/* Lasers */}
                  {lasers.map((l) => (
                    <div 
                      key={l.id} 
                      className="absolute w-1 h-3.5 bg-red-500"
                      style={{ left: `${l.x}%`, top: `${l.y}%`, transform: 'translateX(-50%)' }}
                    />
                  ))}

                  {/* Asteroids */}
                  {asteroids.map((a) => (
                    <div 
                      key={a.id} 
                      className="absolute w-4 h-4 bg-white border border-blitz-red"
                      style={{ left: `${a.x}%`, top: `${a.y}%`, transform: 'translateX(-50%) rotate(45deg)' }}
                    />
                  ))}

                  {/* Player Ship */}
                  <div 
                    className="absolute bottom-4 flex flex-col items-center"
                    style={{ left: `${playerX}%`, transform: 'translateX(-50%)', transition: 'left 0.05s ease-out' }}
                  >
                    <div className="w-1 h-3 bg-blitz-red mb-1 animate-pulse" />
                    <div className="w-6 h-2 bg-white" />
                    <div className="w-10 h-1 bg-blitz-red" />
                  </div>
                </div>
              )}

              {gameState === 'gameover' && (
                <div className="absolute inset-0 bg-void/90 flex flex-col items-center justify-center p-6 text-center">
                  <p className="text-red-500 font-space text-2xl font-bold tracking-tight mb-2">SIMULATION TERMINATED</p>
                  <p className="text-white text-sm mb-5 font-mono">CORE DEFLECTION OVERLOADED // SCORE: {score}</p>
                  <motion.button 
                    onClick={startGame}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="px-6 py-3 bg-white text-black text-xs font-mono font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center gap-2 cursor-pointer rounded-full active:scale-[0.98] shadow-lg shadow-white/10"
                  >
                    <RotateCcw className="h-4 w-4" /> RESET ENGINE
                  </motion.button>
                </div>
              )}
            </div>

            <div className="flex gap-6 border-t border-border pt-5 mt-4 text-xs font-mono text-gray-200">
              <div className="flex-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-red-500">Performance</div>
                <div className="text-white font-medium">120 FPS // Ultra Latency</div>
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-red-500">Render pipeline</div>
                <div className="text-white font-medium">Native Canvas Vector</div>
              </div>
            </div>
          </div>

          {/* Right Column: Technical Spec Sheet - Span 5 */}
          <div className="lg:col-span-5 bg-[#0c0c0d] border border-border/80 p-6 md:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <span className="text-red-500 font-mono text-xs font-bold tracking-widest block mb-3 uppercase">
                SPECIFICATIONS SHEET
              </span>
              <h3 className="text-3xl font-display font-extrabold tracking-tight text-white mb-4 uppercase leading-none">
                PROJECT CINDER
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed mb-6 font-sans font-normal">
                A hyper-responsive retro action core designed to stress-test high-speed user inputs, deterministic physics loops, and smooth multi-layer rendering directly within high-performance web spaces.
              </p>

              <div className="space-y-4 border-t border-white/5 pt-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold mb-1">DETERMINISTIC SIMULATION</h4>
                  <p className="text-gray-100 font-sans text-xs">Physics updates run at a static 30Hz frame step decoupled from visual refresh rate to preserve synchronization consistency.</p>
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold mb-1">PLATFORM COMPATIBILITY</h4>
                  <p className="text-gray-100 font-sans text-xs">Architected for compilation into custom WebAssembly cores and native wrapper runtimes on modern consoles (PS5, Switch).</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-6 mt-6">
              <div className="flex flex-wrap gap-2">
                {['C++', 'WebAssembly', 'HTML5 Canvas', 'Framer Motion'].map((tech) => (
                  <span key={tech} className="text-xs font-mono tracking-wider px-3 py-1 bg-[#121214] border border-border/80 text-white rounded-md">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ==================== STUDIO PORTFOLIO HERO WITH INTEGRATED MATRIX CANVAS ==================== */}
        <div className="mt-28 mb-20">
          <div className="mb-10">
            <span className="text-red-500 font-mono text-sm font-bold tracking-widest uppercase block mb-3">
              DELIVERED SYSTEMS & RECURSIVE MATRIX WORK HISTORY
            </span>
            <h3 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white uppercase leading-none">
              STUDIO PORTFOLIO
            </h3>
            <p className="text-gray-200 text-sm md:text-base max-w-2xl mt-4 leading-relaxed">
              Interact with our live vector matrix that dynamically renders the portfolio heading. Below, explore our high-end delivered commercial and independent digital engineering artifacts.
            </p>
          </div>

          <div className="mb-16">
            <PortfolioInteractiveCanvas />
          </div>
        </div>

        {/* Delivered Systems Grid */}
        <div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {deliveredProjects.map((proj) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="border border-border/80 bg-[#0c0c0d] p-8 rounded-2xl relative flex flex-col justify-between min-h-[280px] transition-all duration-300 hover:scale-[1.01] hover:border-blitz-red hover:shadow-[0_0_35px_rgba(220,38,38,0.08)] group"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-red-500 font-mono text-xs font-bold tracking-widest uppercase block mb-2">
                        {proj.type.toUpperCase()}
                      </span>
                      {/* Changed card title font to font-space (Space Grotesk) to improve readability of copy */}
                      <h4 className="text-2xl font-space font-bold text-white uppercase group-hover:text-red-500 transition-colors duration-200">
                        {proj.title}
                      </h4>
                    </div>
                    <span className="font-mono text-xs text-gray-400 group-hover:text-red-500 font-bold transition-colors duration-200">
                      //{proj.year}
                    </span>
                  </div>

                  <p className="text-gray-100 text-sm md:text-base leading-relaxed font-sans font-normal mb-8">
                    {proj.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono tracking-wider px-2.5 py-1 bg-[#121214] border border-border/80 text-white rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-mono text-gray-300 group-hover:text-white flex items-center gap-1 transition-colors duration-200 font-medium">
                    CLIENT: {proj.client.toUpperCase()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
export default FeaturedProjects;
