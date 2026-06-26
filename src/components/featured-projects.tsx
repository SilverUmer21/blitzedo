import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Activity, ArrowUpRight, ShieldCheck, Cpu, RefreshCw, Smartphone, Monitor, Gamepad2, Sparkles } from 'lucide-react';

export const FeaturedProjects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'game' | 'web' | 'app'>('all');

  // --- GAME: Project CINDER State ---
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [playerX, setPlayerX] = useState(50); // percentage 0-100
  const [lasers, setLasers] = useState<{ id: number; x: number; y: number }[]>([]);
  const [asteroids, setAsteroids] = useState<{ id: number; x: number; y: number; speed: number }[]>([]);
  const gameAreaRef = useRef<HTMLDivElement | null>(null);

  // --- WEB: Telemetry CRM State ---
  const [serverStatus, setServerStatus] = useState<'nominal' | 'spiked' | 'stabilizing'>('nominal');
  const [telemetryData, setTelemetryData] = useState<number[]>([40, 45, 42, 50, 48, 55, 52, 60, 58, 62, 65, 60]);
  const [activeConnections, setActiveConnections] = useState(1240);

  // --- APP: Zenith Wallet State ---
  const [balances, setBalances] = useState({ BTC: 0.124, ETH: 1.84, BLITZ: 4500 });
  const [swapFrom, setSwapFrom] = useState<'BTC' | 'ETH'>('ETH');
  const [swapAmount, setSwapAmount] = useState('0.5');
  const [swapStatus, setSwapStatus] = useState<'idle' | 'swapping' | 'success'>('idle');

  // ==================== PROJECT CINDER (GAME) LOGIC ====================
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setAsteroids([]);
    setLasers([]);
  };

  // Handle ship movement inside game card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gameState !== 'playing' || !gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setPlayerX(Math.max(5, Math.min(95, x)));
  };

  const handleShoot = () => {
    if (gameState !== 'playing') return;
    setLasers((prev) => [...prev, { id: Date.now(), x: playerX, y: 80 }]);
  };

  // Game Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      // Move Lasers
      setLasers((prev) => prev.map((l) => ({ ...l, y: l.y - 6 })).filter((l) => l.y > 0));

      // Move and Spawn Asteroids
      setAsteroids((prev) => {
        // Spawn chance
        let updated = prev.map((a) => ({ ...a, y: a.y + a.speed }));
        
        // Filter out off-screen asteroids and check collision with player
        const active = updated.filter((a) => {
          if (a.y > 90) {
            // Collision with bottom/player zone
            if (Math.abs(a.x - playerX) < 15) {
              setGameState('gameover');
              return false;
            }
          }
          return a.y < 100;
        });

        if (Math.random() < 0.08 && active.length < 5) {
          active.push({
            id: Date.now() + Math.random(),
            x: Math.random() * 90 + 5,
            y: 0,
            speed: Math.random() * 1.5 + 1.2,
          });
        }

        return active;
      });

      // Collision Detection Laser vs Asteroid
      setLasers((currentLasers) => {
        let hitLasers: number[] = [];
        setAsteroids((currentAsteroids) => {
          let hitAsteroids: number[] = [];
          
          currentLasers.forEach((l) => {
            currentAsteroids.forEach((a) => {
              // Simple box collision
              if (Math.abs(l.x - a.x) < 8 && Math.abs(l.y - a.y) < 8) {
                hitLasers.push(l.id);
                hitAsteroids.push(a.id);
                setScore((s) => s + 100);
              }
            });
          });

          return currentAsteroids.filter((a) => !hitAsteroids.includes(a.id));
        });
        return currentLasers.filter((l) => !hitLasers.includes(l.id));
      });

    }, 30);

    return () => clearInterval(interval);
  }, [gameState, playerX]);

  // ==================== TELEMETRY LOGIC (WEB) ====================
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryData((prev) => {
        const next = [...prev.slice(1)];
        let base = 50;
        if (serverStatus === 'spiked') {
          base = 85 + Math.random() * 10;
        } else if (serverStatus === 'stabilizing') {
          base = 65 + Math.random() * 5;
        } else {
          base = 45 + Math.random() * 10;
        }
        next.push(Math.round(base));
        return next;
      });

      setActiveConnections((prev) => {
        const delta = serverStatus === 'spiked' ? 120 : (Math.random() > 0.5 ? 4 : -4);
        return Math.max(800, prev + delta);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [serverStatus]);

  const triggerSpike = () => {
    setServerStatus('spiked');
    setTimeout(() => {
      setServerStatus('stabilizing');
      setTimeout(() => {
        setServerStatus('nominal');
      }, 4000);
    }, 2000);
  };

  // ==================== WALLET SWAP LOGIC (APP) ====================
  const handleSwap = () => {
    if (swapStatus !== 'idle') return;
    const amountNum = parseFloat(swapAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    if (swapFrom === 'ETH' && balances.ETH < amountNum) return;
    if (swapFrom === 'BTC' && balances.BTC < amountNum) return;

    setSwapStatus('swapping');

    setTimeout(() => {
      setBalances((prev) => {
        const updated = { ...prev };
        if (swapFrom === 'ETH') {
          updated.ETH = Number((prev.ETH - amountNum).toFixed(4));
          updated.BLITZ = Math.round(prev.BLITZ + amountNum * 2500);
        } else {
          updated.BTC = Number((prev.BTC - amountNum).toFixed(4));
          updated.BLITZ = Math.round(prev.BLITZ + amountNum * 42000);
        }
        return updated;
      });
      setSwapStatus('success');
      setTimeout(() => setSwapStatus('idle'), 2500);
    }, 2000);
  };

  return (
    <section id="projects" className="py-24 md:py-32 border-t border-border bg-void text-white relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <div className="text-blitz-red font-semibold text-xs tracking-widest uppercase mb-3">
              PRODUCTION HEAVYWEIGHTS
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight">
              FEATURED WORKS
            </h2>
          </div>
          
          {/* Custom Minimal Tabs */}
          <div className="flex gap-2 bg-ink p-1 rounded border border-border">
            {(['all', 'game', 'web', 'app'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-blitz-red text-white'
                    : 'text-ash hover:text-white hover:bg-white/5'
                }`}
              >
                {tab === 'all' ? 'All Pillar' : tab}s
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLUMN 1: Retro Bullet-Hell Showcase (GAME) - Span 7 */}
          <AnimatePresence mode="popLayout">
            {(activeTab === 'all' || activeTab === 'game') && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="col-span-1 lg:col-span-7 bg-ink border border-border p-8 flex flex-col justify-between h-[580px] relative overflow-hidden"
              >
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-blitz-red font-mono text-xs tracking-widest flex items-center gap-2">
                      <Gamepad2 className="h-4 w-4" /> ENGINE // PLATFORM
                    </span>
                    <span className="text-ash font-mono text-xs">CINDER_V1.1_STABLE</span>
                  </div>
                  
                  <h3 className="text-3xl font-display font-extrabold tracking-tight text-white mb-2">
                    PROJECT CINDER
                  </h3>
                  <p className="text-ash text-sm max-w-md leading-relaxed">
                    A hyper-responsive retro rogue-lite game built on custom-crafted light canvas loops. Click inside to steer and shoot.
                  </p>
                </div>

                {/* PLAYABLE MINIGAME INNER CONTAINER */}
                <div className="my-6 flex-grow relative bg-void border border-border overflow-hidden select-none">
                  {gameState === 'idle' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <div className="absolute inset-0 bg-gradient-to-t from-void to-transparent pointer-events-none" />
                      <p className="text-white font-display text-lg font-bold mb-4">TEST GAMEPLAY SYSTEM</p>
                      <button 
                        onClick={startGame}
                        className="px-6 py-3 bg-blitz-red text-white text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <Play className="h-4 w-4 fill-white" /> INITIALIZE SIMULATION
                      </button>
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
                      <div className="absolute top-3 left-3 font-mono text-xs text-white/40 flex gap-4">
                        <span>SCORE: <strong className="text-blitz-red">{score}</strong></span>
                        <span>SHIELD: <strong className="text-green-500">100%</strong></span>
                      </div>
                      
                      {/* Lasers */}
                      {lasers.map((l) => (
                        <div 
                          key={l.id} 
                          className="absolute w-1 h-3 bg-red-500 shadow-sm"
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
                      <p className="text-blitz-red font-display text-2xl font-bold tracking-tight mb-2">SIMULATION TERMINATED</p>
                      <p className="text-ash text-xs mb-4 font-mono">CORE DEFLECTION OVERLOADED // SCORE: {score}</p>
                      <button 
                        onClick={startGame}
                        className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <RotateCcw className="h-4 w-4" /> RESET ENGINE
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 border-t border-border pt-4">
                  <div className="flex-1">
                    <div className="text-[10px] font-mono text-ash uppercase">Performance</div>
                    <div className="text-sm font-semibold">120 FPS // Ultra Latency</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-mono text-ash uppercase">Target Platforms</div>
                    <div className="text-sm font-semibold">Steam, PlayStation 5, Switch</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* COLUMN 2: Full-Stack Web Telemetry (WEB) - Span 5 */}
          <AnimatePresence mode="popLayout">
            {(activeTab === 'all' || activeTab === 'web') && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="col-span-1 lg:col-span-5 bg-ink border border-border p-8 flex flex-col justify-between h-[580px] relative overflow-hidden"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-blitz-red font-mono text-xs tracking-widest flex items-center gap-2">
                      <Activity className="h-4 w-4" /> WEBS // TELEMETRY
                    </span>
                    <span className="text-ash font-mono text-xs">AETHER_FLOW_CLOUD</span>
                  </div>
                  
                  <h3 className="text-3xl font-display font-extrabold tracking-tight text-white mb-2">
                    AETHER CRM
                  </h3>
                  <p className="text-ash text-sm leading-relaxed mb-4">
                    Enterprise web infrastructures crafted with custom server-side pipelines. Check live performance and trigger traffic simulation.
                  </p>
                </div>

                {/* LIVE CRM CHART MOCKUP */}
                <div className="my-4 bg-void p-6 border border-border relative overflow-hidden flex flex-col justify-between h-56">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-[10px] font-mono text-ash uppercase">Current Traffic Load</div>
                      <div className="text-2xl font-mono font-bold text-white flex items-center gap-2">
                        {activeConnections} <span className="text-xs text-green-400">rps</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={triggerSpike}
                      disabled={serverStatus !== 'nominal'}
                      className={`px-3 py-1.5 font-mono text-[10px] uppercase border tracking-widest transition-colors cursor-pointer ${
                        serverStatus === 'nominal'
                          ? 'border-blitz-red text-blitz-red hover:bg-blitz-red hover:text-white'
                          : 'border-white/10 text-ash cursor-not-allowed'
                      }`}
                    >
                      {serverStatus === 'nominal' ? 'SPIKE INGRESS' : 'PROCESSING...'}
                    </button>
                  </div>

                  {/* SVG Chart Wave */}
                  <div className="h-24 w-full flex items-end">
                    <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgb(220, 38, 38)" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="rgb(220, 38, 38)" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Area */}
                      <path
                        d={`M 0 40 ${telemetryData.map((val, idx) => `L ${(idx / (telemetryData.length - 1)) * 100} ${40 - (val / 100) * 35}`).join(' ')} L 100 40 Z`}
                        fill="url(#chartGrad)"
                        className="transition-all duration-500 ease-out"
                      />
                      
                      {/* Line */}
                      <path
                        d={telemetryData.map((val, idx) => `${idx === 0 ? 'M' : 'L'} ${(idx / (telemetryData.length - 1)) * 100} ${40 - (val / 100) * 35}`).join(' ')}
                        fill="none"
                        stroke="rgb(220, 38, 38)"
                        strokeWidth="1.5"
                        className="transition-all duration-500 ease-out"
                      />
                    </svg>
                  </div>

                  <div className="flex justify-between font-mono text-[9px] text-ash border-t border-white/5 pt-2">
                    <span>STATUS: <span className={serverStatus === 'nominal' ? 'text-green-400' : 'text-blitz-red font-bold animate-pulse'}>{serverStatus.toUpperCase()}</span></span>
                    <span>SERVER LOAD: {telemetryData[telemetryData.length - 1]}%</span>
                  </div>
                </div>

                <div className="flex gap-4 border-t border-border pt-4">
                  <div className="flex-1">
                    <div className="text-[10px] font-mono text-ash uppercase">Global Response</div>
                    <div className="text-sm font-semibold">14ms Edge Latency</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-mono text-ash uppercase">Architecture</div>
                    <div className="text-sm font-semibold">Serverless Caching</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* COLUMN 3: Zenith Crypto Wallet (MOBILE APP) - Span 5 */}
          <AnimatePresence mode="popLayout">
            {(activeTab === 'all' || activeTab === 'app') && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="col-span-1 lg:col-span-5 bg-ink border border-border p-8 flex flex-col justify-between h-[580px] relative overflow-hidden"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-blitz-red font-mono text-xs tracking-widest flex items-center gap-2">
                      <Smartphone className="h-4 w-4" /> APPS // DECENTRALIZED
                    </span>
                    <span className="text-ash font-mono text-xs">ZENITH_APP_V3</span>
                  </div>
                  
                  <h3 className="text-3xl font-display font-extrabold tracking-tight text-white mb-2">
                    ZENITH APPS
                  </h3>
                  <p className="text-ash text-sm leading-relaxed">
                    Ultra-fluid cross-platform mobile apps for finance and web3. Test the built-in gasless swap mechanism below.
                  </p>
                </div>

                {/* SWAP CARD MOCKUP */}
                <div className="my-4 bg-void p-5 border border-border relative overflow-hidden flex flex-col justify-between h-56">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[10px] font-mono text-ash">ZENITH SWAP GATEWAY</span>
                    <div className="flex gap-3 text-xs font-mono text-white/50">
                      <span>ETH: {balances.ETH}</span>
                      <span>BTC: {balances.BTC}</span>
                    </div>
                  </div>

                  <div className="space-y-2 my-2">
                    {/* Amount input */}
                    <div className="flex justify-between items-center bg-ink/50 p-2.5 border border-border rounded">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-mono text-ash">YOU SEND</span>
                        <input
                          type="number"
                          value={swapAmount}
                          onChange={(e) => setSwapAmount(e.target.value)}
                          className="bg-transparent text-white font-mono text-sm focus:outline-none w-24 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                      <select 
                        value={swapFrom} 
                        onChange={(e) => setSwapFrom(e.target.value as 'BTC' | 'ETH')}
                        className="bg-void text-xs font-mono text-white border border-border px-2 py-1 focus:outline-none"
                      >
                        <option value="ETH">ETH</option>
                        <option value="BTC">BTC</option>
                      </select>
                    </div>

                    {/* Receive preview */}
                    <div className="flex justify-between items-center bg-ink/50 p-2.5 border border-border rounded">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-mono text-ash">YOU GET</span>
                        <span className="text-sm font-mono text-white">
                          {Number(swapAmount) > 0 ? (Number(swapAmount) * (swapFrom === 'ETH' ? 2500 : 42000)).toLocaleString() : '0'}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-blitz-red font-bold">BLITZ</span>
                    </div>
                  </div>

                  {/* Swap Trigger Button */}
                  <button 
                    onClick={handleSwap}
                    disabled={swapStatus !== 'idle'}
                    className="w-full py-2.5 bg-blitz-red text-white font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {swapStatus === 'idle' && (
                      <>EXECUTE DEFI SWAP</>
                    )}
                    {swapStatus === 'swapping' && (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" /> COMMITTING TRANSACTION
                      </>
                    )}
                    {swapStatus === 'success' && (
                      <>
                        <ShieldCheck className="h-4 w-4 text-white" /> SUCCESS // BLITZ INJECTED
                      </>
                    )}
                  </button>
                </div>

                <div className="flex gap-4 border-t border-border pt-4">
                  <div className="flex-1">
                    <div className="text-[10px] font-mono text-ash uppercase">Sync Latency</div>
                    <div className="text-sm font-semibold">&lt; 100ms Global</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-mono text-ash uppercase">Wallet Bal</div>
                    <div className="text-sm font-semibold">{balances.BLITZ} BLITZ</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* COLUMN 4: Creative Labs Showcase - Span 7 */}
          <AnimatePresence mode="popLayout">
            {(activeTab === 'all') && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="col-span-1 lg:col-span-7 bg-ink border border-border p-8 flex flex-col justify-between h-[580px] relative overflow-hidden"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-blitz-red font-mono text-xs tracking-widest flex items-center gap-2">
                      <Cpu className="h-4 w-4" /> RESEARCH & EXPERIMENTS
                    </span>
                    <span className="text-ash font-mono text-xs">BLITZ_LABS_09</span>
                  </div>
                  
                  <h3 className="text-3xl font-display font-extrabold tracking-tight text-white mb-2">
                    EXPERIMENTAL PHYSICS
                  </h3>
                  <p className="text-ash text-sm max-w-md leading-relaxed">
                    Developing and stress-testing cutting-edge physical vectors, custom shaders, and hyper-responsive user controls that represent the next-generation interfaces.
                  </p>
                </div>

                {/* VISUAL INTERACTIVE PHYSICS CANVAS CONTAINER */}
                <div className="my-6 bg-void border border-border overflow-hidden h-64 relative group select-none">
                  <div className="absolute inset-0 bg-radial-gradient from-blitz-red/10 to-transparent pointer-events-none" />
                  
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <span className="text-[9px] font-mono text-white/40">VIRTUAL PHYSICS ENGINE</span>
                      <span className="text-[9px] font-mono text-white/40">VECTOR FIELD: INVERSE SQUARE</span>
                    </div>

                    <div className="w-full h-32 flex items-center justify-around">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                          key={i}
                          animate={{
                            height: [40, 120, 60, 140, 40],
                            y: [0, -10, 5, -5, 0]
                          }}
                          transition={{
                            duration: 2 + i * 0.3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-4 bg-gradient-to-t from-blitz-red to-white border border-border"
                        />
                      ))}
                    </div>

                    <div className="text-center">
                      <p className="text-[10px] font-mono text-ash">
                        HOVER / CLICK TO INJECT WAVE FORCES
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 border-t border-border pt-4">
                  <div className="flex-1">
                    <div className="text-[10px] font-mono text-ash uppercase">Render pipeline</div>
                    <div className="text-sm font-semibold">WebGPU / Canvas2D</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-mono text-ash uppercase">Lab Status</div>
                    <div className="text-sm font-semibold">9 Active Experiments</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};
