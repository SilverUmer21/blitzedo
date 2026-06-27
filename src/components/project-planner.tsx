import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Terminal, Sparkles, CheckCircle, ArrowRight, Layers, 
  DollarSign, Calendar, Copy, ChevronRight, Check, Settings, 
  Code, FileCode, Activity, Download, Layout, Database, 
  Lock, Zap, Users, Wrench, Network 
} from 'lucide-react';
import { PlannerState, PlatformType } from '../types';

export const ProjectPlanner: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [planner, setPlanner] = useState<PlannerState>({
    platform: 'web',
    aesthetic: 'swiss',
    scope: 'standard',
    features: ['db', 'auth'],
  });

  const [compiling, setCompiling] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [compiledBlueprint, setCompiledBlueprint] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'spec' | 'diagram' | 'json'>('spec');

  // Constants
  const platformOptions = [
    { id: 'game', label: 'Immersive Game', desc: 'Custom engines, physics, retro-shooters or canvas interactions.' },
    { id: 'web', label: 'Web Application', desc: 'SaaS platforms, cloud infrastructure, and dynamic server-side dashboards.' },
    { id: 'app', label: 'Mobile Application', desc: 'React Native / Swift applications with secure offline caching.' },
  ];

  const aestheticOptions = [
    { id: 'swiss', label: 'Minimalist Swiss', desc: 'Asymmetrical alignment, extreme negative space, clean display fonts.' },
    { id: 'synth', label: 'Neon Synth', desc: 'High-contrast neon red lines, vector frames, and retro grid layouts.' },
    { id: 'brutalist', label: 'Brutalist Tech', desc: 'Heavy raw borders, monospaced lettering, and strict layout blocks.' },
  ];

  const scopeOptions = [
    { id: 'light', label: 'Vanguard MVP', desc: 'Lightweight proof-of-concept for pre-seed testing or immediate launch.' },
    { id: 'standard', label: 'Production Classic', desc: 'Standard scalable model with complete database & authorization.' },
    { id: 'enterprise', label: 'Infinity Engine', desc: 'Enterprise high-availability architecture with custom server integrations.' },
  ];

  const featureOptions = [
    { id: 'db', label: 'Durable Database', desc: 'Firestore or Relational Cloud SQL persistent schemas.' },
    { id: 'auth', label: 'Secure Auth', desc: 'Firebase authentication with modern verification.' },
    { id: 'realtime', label: 'Websocket Sync', desc: 'Real-time multi-user communication and live channels.' },
    { id: 'canvas', label: 'Interactive Canvas', desc: 'WebGPU / Canvas2D customized rendering systems.' },
    { id: 'ai', label: 'Gemini Agentic Lab', desc: 'Google GenAI server-side models for smart features.' },
    { id: 'payment', label: 'Payment API', desc: 'Secure Stripe processing gateway proxy.' },
  ];

  const toggleFeature = (id: string) => {
    setPlanner((prev) => {
      const active = prev.features.includes(id)
        ? prev.features.filter((f) => f !== id)
        : [...prev.features, id];
      return { ...prev, features: active };
    });
  };

  const runCompiler = () => {
    setCompiling(true);
    setTerminalLogs([]);
    setCompiledBlueprint(null);
    setActiveTab('spec');

    const logs = [
      '⚡ [blitz] Initializing BLITZ Compiler Core v3.1.2...',
      `⚙️ [blitz] Ingesting architectural target: platform: [${planner.platform.toUpperCase()}], scope: [${planner.scope.toUpperCase()}]`,
      `🎨 [blitz] Binding creative aesthetic constraints: [${planner.aesthetic.toUpperCase()}]`,
      '📦 [npm] Ingesting peer dependencies...',
      '🔍 [npm] Resolving package constraints for react, typescript, and tailwind...',
      '🛠️ [bundler] Vite core compilation initiated...',
      `   transforming modules (48) for [${planner.platform.toUpperCase()}] bundle...`,
      '   transforming: src/main.tsx',
      '   transforming: src/App.tsx',
      '   transforming: src/index.css',
      '✓ [bundler] 48 modules compiled and optimization steps applied.',
      `🔧 [compiler] Injecting architectural core modules...`,
      ...planner.features.map(f => `   ↳ MODULE BINDING: [${f.toUpperCase()}]`),
      '⚡ [system] Spacing optimization: 8px base fluid grid confirmed.',
      '🔒 [security] Validating CORS and strict CSP route boundaries...',
      '💿 [database] Generating initial database schema migrations...',
      '📦 [emission] Emitting compiled asset tree to ./dist:',
      `   dist/assets/index.js      ${planner.scope === 'light' ? '128.4' : planner.scope === 'standard' ? '184.2' : '312.6'} kB  │ gzip: ${planner.scope === 'light' ? '36.2' : planner.scope === 'standard' ? '54.1' : '88.3'} kB`,
      `   dist/assets/index.css     ${planner.aesthetic === 'swiss' ? '14.2' : '22.8'} kB  │ gzip: 4.8 kB`,
      '🎉 [system] Blueprint successfully compiled and verified.',
      '🚀 [blitz] COMPILE COMPLETED. DEPLOYING SPECIFICATION OBJECT...'
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setTerminalLogs((prev) => [...prev, log]);
        if (index === logs.length - 1) {
          // Generate final output
          setTimeout(() => {
            const blueprintId = `BLZ-${planner.platform.substring(0,2).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
            
            // Calculate specs
            let duration = '4-6 Weeks';
            let stack = ['Vite', 'React', 'Tailwind v4', 'TypeScript'];
            let arch = 'Client SPA // Edge CDN Deployment';
            let complexity = 'Optimized';
            let database = 'Local Storage Cache';
            let hosting = 'Cloudflare Pages / Vercel Edge';

            if (planner.scope === 'standard') {
              duration = '8-10 Weeks';
              stack.push('Express Server', 'Firebase Firestore');
              arch = 'Full-Stack Server // Durable Cloud Persistence';
              complexity = 'Symmetric';
              database = 'Firebase Firestore NoSQL';
              hosting = 'Google Cloud Run';
            } else if (planner.scope === 'enterprise') {
              duration = '14-16 Weeks';
              stack.push('Express Server', 'Google Cloud SQL (PostgreSQL)', 'Drizzle ORM');
              arch = 'HA Multi-Region Cluster // Relational Database';
              complexity = 'High-Octane Core';
              database = 'Cloud SQL PostgreSQL';
              hosting = 'GCP Google Kubernetes Engine';
            }

            if (planner.features.includes('ai')) {
              stack.push('@google/genai SDK', 'Gemini Models');
            }
            if (planner.features.includes('realtime')) {
              stack.push('Socket.io Websockets');
            }
            if (planner.features.includes('auth')) {
              stack.push('Firebase Authentication / OAuth2');
            }
            if (planner.features.includes('payment')) {
              stack.push('Stripe SDK / Proxy Router');
            }

            setCompiledBlueprint({
              id: blueprintId,
              duration,
              stack: Array.from(new Set(stack)),
              architecture: arch,
              complexity,
              database,
              hosting,
              specDetails: {
                targetPlatform: planner.platform,
                creativeVibe: planner.aesthetic,
                architectureComplexity: planner.scope,
                modulesSelected: planner.features,
                version: '3.1.2',
                compiledTimestamp: new Date().toISOString()
              }
            });
            setCompiling(false);
            setStep(3);
          }, 600);
        }
      }, index * 120); // Faster log steps for a premium snappy feel
    });
  };

  const copyBlueprintId = () => {
    if (!compiledBlueprint) return;
    navigator.clipboard.writeText(compiledBlueprint.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSpec = () => {
    if (!compiledBlueprint) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(compiledBlueprint, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `blitz-spec-${compiledBlueprint.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section id="planner" className="py-24 md:py-32 border-t border-border bg-ink relative overflow-hidden">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.015)_1px,transparent_1px)] bg-[size:100%_48px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-red-500 font-mono text-sm font-bold tracking-widest uppercase block mb-3">
            COMPILER ENGINE
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white leading-[0.88] uppercase">
            BLITZ COMPILER
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Live Specs */}
          <div className="lg:col-span-4 space-y-8">
            <p className="text-gray-200 text-sm md:text-base leading-relaxed max-w-sm font-sans font-normal">
              Architect your ideal system. Select your building blocks and let our dynamic engine map the structural specifications.
            </p>

            {/* Realtime Live Config Visualizer */}
            <div className="border border-border/80 p-6 bg-void/50 space-y-5 rounded-2xl">
              <span className="text-xs font-mono tracking-wider text-gray-300 uppercase block border-b border-border/40 pb-3 font-semibold">
                LIVE CONFIG MONITOR
              </span>
              
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center py-1 border-b border-border/20">
                  <span className="text-gray-400 font-medium">MEDIUM:</span>
                  <span className="text-white font-bold uppercase">
                    {platformOptions.find(o => o.id === planner.platform)?.label.split(' ')[0] || planner.platform}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border/20">
                  <span className="text-gray-400 font-medium">AESTHETIC:</span>
                  <span className="text-white font-bold uppercase">
                    {planner.aesthetic === 'swiss' ? 'SWISS MINIMAL' : planner.aesthetic === 'synth' ? 'NEON SYNTH' : 'BRUTALIST'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border/20">
                  <span className="text-gray-400 font-medium">ARCH SCALE:</span>
                  <span className="text-white font-bold uppercase">
                    {planner.scope === 'light' ? 'MVP' : planner.scope === 'standard' ? 'CLASSIC' : 'INFINITY'}
                  </span>
                </div>
                <div className="pt-2">
                  <span className="text-gray-400 block mb-2 text-xs font-medium">ACTIVE MODULES:</span>
                  {planner.features.length === 0 ? (
                    <span className="text-red-500 font-bold uppercase text-xs">No modules selected</span>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {planner.features.map((feat) => (
                        <span key={feat} className="text-[10px] bg-red-500/10 border border-red-500/30 px-2.5 py-0.5 rounded text-white uppercase font-bold">
                          {feat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Steps Card */}
          <div className="lg:col-span-8 bg-void border border-border p-8 md:p-10 rounded-2xl relative">
            
            {/* Progress Indicators */}
            <div className="flex justify-between items-center mb-10 border-b border-border pb-6 font-mono text-xs text-gray-300">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-white' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center border ${step >= 1 ? 'border-red-500 bg-red-500 text-white font-bold' : 'border-border'}`}>1</span>
                <span>STRUCTURE</span>
              </div>
              <div className="w-8 h-[1px] bg-border" />
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-white' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center border ${step >= 2 ? 'border-red-500 bg-red-500 text-white font-bold' : 'border-border'}`}>2</span>
                <span>FEATURES</span>
              </div>
              <div className="w-8 h-[1px] bg-border" />
              <div className={`flex items-center gap-2 ${step >= 3 ? 'text-white' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center border ${step >= 3 ? 'border-red-500 bg-red-500 text-white font-bold' : 'border-border'}`}>3</span>
                <span>BLUEPRINT</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
            {/* STEP 1: Platform & Aesthetic & Scope */}
            {step === 1 && !compiling && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-8"
              >
                {/* Platform selection */}
                <div>
                  <label className="block text-white font-display text-sm font-extrabold uppercase mb-4 tracking-wider flex items-center gap-2">
                    <Layout className="h-4 w-4 text-red-500" /> Select Digital Medium
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {platformOptions.map((opt) => {
                      const Icon = opt.id === 'game' ? Activity : opt.id === 'web' ? Layout : Layers;
                      const isSelected = planner.platform === opt.id;
                      return (
                        <motion.button
                          key={opt.id}
                          onClick={() => setPlanner((p) => ({ ...p, platform: opt.id as PlatformType }))}
                          whileHover={{ scale: 1.03, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          className={`text-left p-5 border transition-all cursor-pointer rounded-xl flex flex-col justify-between h-36 ${
                            isSelected
                              ? 'border-red-500 bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.1)]'
                              : 'border-border bg-ink/30 hover:border-white/20'
                          }`}
                        >
                          <div className="flex justify-between items-start w-full">
                            <span className="block font-display font-bold text-sm text-white">{opt.label}</span>
                            <Icon className={`h-4 w-4 ${isSelected ? 'text-red-500' : 'text-gray-400'}`} />
                          </div>
                          <span className="block text-gray-200 text-xs leading-relaxed mt-2">{opt.desc}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Aesthetic Selection */}
                <div>
                  <label className="block text-white font-display text-sm font-extrabold uppercase mb-4 tracking-wider flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-red-500" /> Creative Vibe / Aesthetic Direction
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {aestheticOptions.map((opt) => {
                      const Icon = opt.id === 'swiss' ? Code : opt.id === 'synth' ? Zap : Terminal;
                      const isSelected = planner.aesthetic === opt.id;
                      return (
                        <motion.button
                          key={opt.id}
                          onClick={() => setPlanner((p) => ({ ...p, aesthetic: opt.id as any }))}
                          whileHover={{ scale: 1.03, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          className={`text-left p-5 border transition-all cursor-pointer rounded-xl flex flex-col justify-between h-36 ${
                            isSelected
                              ? 'border-red-500 bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.1)]'
                              : 'border-border bg-ink/30 hover:border-white/20'
                          }`}
                        >
                          <div className="flex justify-between items-start w-full">
                            <span className="block font-display font-bold text-sm text-white">{opt.label}</span>
                            <Icon className={`h-4 w-4 ${isSelected ? 'text-red-500' : 'text-gray-400'}`} />
                          </div>
                          <span className="block text-gray-200 text-xs leading-relaxed mt-2">{opt.desc}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Scope Selection */}
                <div>
                  <label className="block text-white font-display text-sm font-extrabold uppercase mb-4 tracking-wider flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-red-500" /> Scale & Architectural Complexity
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {scopeOptions.map((opt) => {
                      const Icon = opt.id === 'light' ? Wrench : opt.id === 'standard' ? Settings : Network;
                      const isSelected = planner.scope === opt.id;
                      return (
                        <motion.button
                          key={opt.id}
                          onClick={() => setPlanner((p) => ({ ...p, scope: opt.id as any }))}
                          whileHover={{ scale: 1.03, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          className={`text-left p-5 border transition-all cursor-pointer rounded-xl flex flex-col justify-between h-36 ${
                            isSelected
                              ? 'border-red-500 bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.1)]'
                              : 'border-border bg-ink/30 hover:border-white/20'
                          }`}
                        >
                          <div className="flex justify-between items-start w-full">
                            <span className="block font-display font-bold text-sm text-white">{opt.label}</span>
                            <Icon className={`h-4 w-4 ${isSelected ? 'text-red-500' : 'text-gray-400'}`} />
                          </div>
                          <span className="block text-gray-200 text-xs leading-relaxed mt-2">{opt.desc}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="flex justify-end pt-6 border-t border-white/5">
                  <motion.button
                    onClick={() => setStep(2)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="px-8 py-3.5 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-all duration-200 flex items-center gap-2.5 cursor-pointer rounded-full active:scale-[0.98] shadow-lg"
                  >
                    CONTINUE BUILD <ChevronRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Feature Selections */}
            {step === 2 && !compiling && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <label className="block text-white font-display text-sm font-extrabold uppercase mb-4 tracking-wider flex items-center gap-2">
                    <Database className="h-4 w-4 text-red-500" /> Select Architectural Core Modules
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {featureOptions.map((opt) => {
                      const isSelected = planner.features.includes(opt.id);
                      return (
                        <motion.button
                          key={opt.id}
                          onClick={() => toggleFeature(opt.id)}
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          className={`text-left p-5 border transition-all flex items-start gap-4 cursor-pointer rounded-xl ${
                            isSelected
                              ? 'border-red-500 bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.08)]'
                              : 'border-border bg-ink/30 hover:border-white/20'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${isSelected ? 'border-red-500 bg-red-500 text-white' : 'border-border bg-void'}`}>
                            {isSelected && <Check className="h-3.5 w-3.5" />}
                          </div>
                          <div>
                            <span className="block font-display font-bold text-sm text-white mb-1">{opt.label}</span>
                            <span className="block text-gray-200 text-xs leading-relaxed">{opt.desc}</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="flex justify-between pt-6 border-t border-white/5">
                  <motion.button
                    onClick={() => setStep(1)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="px-6 py-3.5 border border-white/10 hover:border-white hover:bg-white/5 text-white font-mono font-bold text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer rounded-full active:scale-[0.98]"
                  >
                    BACK
                  </motion.button>
                  <motion.button
                    onClick={runCompiler}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="px-8 py-3.5 bg-red-600 text-white font-mono font-bold text-xs uppercase tracking-widest hover:bg-red-500 transition-all duration-300 flex items-center gap-2 cursor-pointer rounded-full active:scale-[0.98] group shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] border border-red-500/30"
                  >
                    COMPILE BLUEPRINT
                    <svg
                      className="ml-[0.1em] h-3.5 w-3.5 transition-none text-white"
                      fill="none"
                      viewBox="0 0 10 10"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="[stroke-dasharray:32] [stroke-dashoffset:32] transition-[stroke-dashoffset] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:[stroke-dashoffset:0]"
                      />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* COMPILING TERMINAL ANIMATION */}
            {compiling && (
              <motion.div
                key="compiling"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-mono text-xs text-white space-y-4 h-[380px] flex flex-col justify-between"
              >
                <div className="bg-void border border-border/80 p-5 rounded-xl overflow-y-auto flex-grow space-y-1.5 scrollbar-none h-72 shadow-inner shadow-black/80">
                  <div className="flex justify-between items-center text-red-500 font-bold mb-3 border-b border-border/40 pb-2">
                    <span className="flex items-center gap-2">
                      <Terminal className="h-4.5 w-4.5 animate-pulse" /> BLITZ REALTIME BUNDLER v3.1.2
                    </span>
                    <span className="text-[10px] bg-red-500/15 px-2 py-0.5 rounded text-red-400">ACTIVE COMPILATION</span>
                  </div>
                  {terminalLogs.map((log, index) => (
                    <div key={index} className="leading-relaxed text-gray-300 font-mono tracking-wide text-[11px] whitespace-pre-wrap">
                      {log}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center border-t border-border/35 pt-4">
                  <span className="text-gray-300 flex items-center gap-2.5 font-sans font-medium text-xs">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                    COMPILING STRUCTURAL SPECIFICATION OBJECTS...
                  </span>
                  <span className="text-red-500 font-bold font-mono text-sm">
                    {Math.min(100, Math.round((terminalLogs.length / 21) * 100))}%
                  </span>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Compiled Output Blueprint */}
            {step === 3 && compiledBlueprint && !compiling && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Tab Navigation */}
                <div className="flex border-b border-border/40 pb-px gap-2">
                  <button
                    onClick={() => setActiveTab('spec')}
                    className={`px-5 py-3 font-mono text-xs font-bold uppercase border-b-2 transition-all cursor-pointer ${
                      activeTab === 'spec'
                        ? 'border-red-500 text-white'
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    System Spec
                  </button>
                  <button
                    onClick={() => setActiveTab('diagram')}
                    className={`px-5 py-3 font-mono text-xs font-bold uppercase border-b-2 transition-all cursor-pointer ${
                      activeTab === 'diagram'
                        ? 'border-red-500 text-white'
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    Flow Diagram
                  </button>
                  <button
                    onClick={() => setActiveTab('json')}
                    className={`px-5 py-3 font-mono text-xs font-bold uppercase border-b-2 transition-all cursor-pointer ${
                      activeTab === 'json'
                        ? 'border-red-500 text-white'
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    Raw JSON Blueprint
                  </button>
                </div>

                {/* Tab Content 1: SPEC */}
                {activeTab === 'spec' && (
                  <div className="border border-border p-6 md:p-8 bg-ink/20 space-y-6 relative rounded-2xl">
                    {/* Decorative corner tag */}
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-mono font-bold px-3 py-1 uppercase tracking-widest rounded-bl-xl rounded-tr-xl">
                      SYSTEM INTEGRAL
                    </div>

                    {/* Blueprint ID and Title */}
                    <div className="flex justify-between items-start border-b border-border/40 pb-4">
                      <div>
                        <span className="text-red-500 font-mono text-[10px] font-bold tracking-widest block mb-1">BLUEPRINT ID CODE</span>
                        <h4 className="text-xl md:text-2xl font-mono font-bold text-white flex items-center gap-2">
                          {compiledBlueprint.id}
                          <button 
                            onClick={copyBlueprintId}
                            className="text-gray-300 hover:text-white p-1 transition-colors cursor-pointer"
                            title="Copy ID"
                          >
                            {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-300 font-mono text-[10px] block mb-1">PARSED DESIGN</span>
                        <span className="text-sm font-bold uppercase text-white font-display">
                          {planner.aesthetic === 'swiss' ? 'SWISS MINIMAL' : planner.aesthetic === 'synth' ? 'NEON SYNTH' : 'BRUTALIST TECH'}
                        </span>
                      </div>
                    </div>

                    {/* Quick specs grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="border border-border/40 bg-void/50 p-4 rounded-xl">
                        <span className="text-gray-300 font-mono text-[10px] tracking-wider block mb-1.5 uppercase flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-red-500" /> ESTIMATED TIMELINE
                        </span>
                        <span className="text-sm font-semibold text-white">{compiledBlueprint.duration}</span>
                      </div>
                      <div className="border border-border/40 bg-void/50 p-4 rounded-xl">
                        <span className="text-gray-300 font-mono text-[10px] tracking-wider block mb-1.5 uppercase flex items-center gap-1">
                          <Layers className="h-3 w-3 text-red-500" /> ARCHITECTURE MODEL
                        </span>
                        <span className="text-sm font-semibold text-white truncate block">{compiledBlueprint.architecture}</span>
                      </div>
                      <div className="border border-border/40 bg-void/50 p-4 rounded-xl">
                        <span className="text-gray-300 font-mono text-[10px] tracking-wider block mb-1.5 uppercase flex items-center gap-1">
                          <Cpu className="h-3 w-3 text-red-500" /> RIG COMPLEXITY
                        </span>
                        <span className="text-sm font-semibold text-white">{compiledBlueprint.complexity}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      <div className="border border-border/40 bg-void/50 p-4 rounded-xl">
                        <span className="text-gray-300 font-mono text-[10px] tracking-wider block mb-1.5 uppercase flex items-center gap-1">
                          <Database className="h-3 w-3 text-red-500" /> PRIMARY STORAGE DATABASE
                        </span>
                        <span className="text-sm font-semibold text-white">{compiledBlueprint.database}</span>
                      </div>
                      <div className="border border-border/40 bg-void/50 p-4 rounded-xl">
                        <span className="text-gray-300 font-mono text-[10px] tracking-wider block mb-1.5 uppercase flex items-center gap-1">
                          <Network className="h-3 w-3 text-red-500" /> DEPLOYMENT INFRASTRUCTURE
                        </span>
                        <span className="text-sm font-semibold text-white">{compiledBlueprint.hosting}</span>
                      </div>
                    </div>

                    {/* Suggested Stack Blocks */}
                    <div className="space-y-2">
                      <span className="text-gray-300 font-mono text-[10px] tracking-wider block uppercase">COMPILED STACK BINDINGS</span>
                      <div className="flex flex-wrap gap-2">
                        {compiledBlueprint.stack.map((item: string, idx: number) => (
                          <span key={idx} className="bg-void border border-border/40 px-3.5 py-1.5 font-mono text-xs text-white rounded-lg font-bold shadow-sm">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* System confirmation footer */}
                    <div className="border-t border-border/40 pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-gray-300 font-mono text-[11px]">
                      <span className="flex items-center gap-1.5 text-green-400">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> DEPENDENCIES SUCCESSFULLY VERIFIED & SCATTERED
                      </span>
                      <span>LOCAL BACKPLANE SYNCED</span>
                    </div>
                  </div>
                )}

                {/* Tab Content 2: DIAGRAM */}
                {activeTab === 'diagram' && (
                  <div className="font-mono text-[11px] leading-relaxed text-gray-300 bg-void border border-border p-6 rounded-2xl relative overflow-x-auto space-y-5">
                    <div className="flex justify-between items-center text-red-500 font-bold border-b border-border/40 pb-3">
                      <span className="flex items-center gap-2">
                        <Network className="h-4.5 w-4.5" /> COMPILED ARCHITECTURE TOPOLOGY MAP
                      </span>
                      <span className="text-[9px] bg-red-500/15 px-2.5 py-0.5 rounded text-red-400">1:1 RIG RELATION</span>
                    </div>
                    
                    <div className="space-y-3 min-w-[650px] py-4 px-2">
                      {/* Diagram Row 1 */}
                      <div className="flex items-center gap-4 justify-between">
                        <div className="border-2 border-red-500 bg-red-500/10 p-3 rounded-xl w-48 text-center shadow-lg">
                          <span className="font-bold text-white block">CLIENT VIEWPORT</span>
                          <span className="block text-[8px] text-gray-400 mt-1 font-normal uppercase">React SPA / {planner.aesthetic} vibe</span>
                        </div>
                        
                        <div className="flex-1 flex items-center justify-center font-bold text-red-500/60">
                          ━━━━━━━━━━━━❯
                        </div>

                        <div className="border border-border/80 bg-ink/40 p-3 rounded-xl w-48 text-center">
                          <span className="font-bold text-white block">BLITZ ROUTER</span>
                          <span className="block text-[8px] text-gray-400 mt-1 font-normal uppercase">{planner.platform === 'app' ? 'Native Scaffold' : 'SPA Edge Layer'}</span>
                        </div>

                        {planner.features.includes('auth') ? (
                          <>
                            <div className="flex-1 flex items-center justify-center font-bold text-yellow-500/60">
                              ━━━━━━━━❯
                            </div>
                            <div className="border-2 border-yellow-500/50 bg-yellow-500/10 p-3 rounded-xl w-48 text-center">
                              <span className="font-bold text-white block">AUTH MODULE</span>
                              <span className="block text-[8px] text-gray-400 mt-1 font-normal uppercase">Firebase Identity</span>
                            </div>
                          </>
                        ) : (
                          <div className="w-16" />
                        )}
                      </div>

                      {/* Connection Divider Row */}
                      <div className="h-8 flex justify-around items-center w-full min-w-[650px]">
                        <div className="w-48 flex justify-center">
                          <div className="h-8 w-px border-l-2 border-dashed border-red-500/40" />
                        </div>
                        <div className="w-48" />
                        <div className="w-48 flex justify-center">
                          <div className="h-8 w-px border-l-2 border-dashed border-border/40" />
                        </div>
                        {planner.features.includes('auth') && (
                          <div className="w-48 flex justify-center">
                            <div className="h-8 w-px border-l-2 border-dashed border-yellow-500/30" />
                          </div>
                        )}
                      </div>

                      {/* Diagram Row 2 */}
                      <div className="flex items-center gap-4 justify-between">
                        {planner.scope !== 'light' ? (
                          <div className="border-2 border-green-500/50 bg-green-500/10 p-3 rounded-xl w-48 text-center shadow-lg">
                            <span className="font-bold text-white block">EXPRESS ENDPOINT</span>
                            <span className="block text-[8px] text-gray-400 mt-1 font-normal uppercase">Node.js Server Proxies</span>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-600/30 p-3 rounded-xl w-48 text-center text-gray-500">
                            Serverless Static
                          </div>
                        )}

                        <div className="flex-1 flex items-center justify-center font-bold text-green-500/60">
                          ━━━━━━━━━━━━❯
                        </div>

                        <div className="border-2 border-blue-500 bg-blue-500/10 p-3 rounded-xl w-48 text-center shadow-lg">
                          <span className="font-bold text-white block">STORAGE UNIT</span>
                          <span className="block text-[8px] text-gray-400 mt-1 font-normal uppercase">{compiledBlueprint.database}</span>
                        </div>

                        {planner.features.includes('ai') ? (
                          <>
                            <div className="flex-1 flex items-center justify-center font-bold text-purple-500/60">
                              ━━━━━━━━❯
                            </div>
                            <div className="border-2 border-purple-500 bg-purple-500/10 p-3 rounded-xl w-48 text-center">
                              <span className="font-bold text-white block">GEMINI COGNITION</span>
                              <span className="block text-[8px] text-gray-400 mt-1 font-normal uppercase">Google GenAI Client</span>
                            </div>
                          </>
                        ) : (
                          <div className="w-16" />
                        )}
                      </div>
                    </div>

                    <div className="text-[10px] text-gray-400 border-t border-border/30 pt-3 leading-relaxed">
                      * Interactive nodes bind the selected database ({compiledBlueprint.database}) and host target ({compiledBlueprint.hosting}) dynamically.
                    </div>
                  </div>
                )}

                {/* Tab Content 3: RAW JSON */}
                {activeTab === 'json' && (
                  <div className="space-y-4">
                    <div className="relative font-mono text-[11px] bg-void/90 p-5 rounded-2xl border border-border/40 max-h-80 overflow-y-auto shadow-inner shadow-black/80">
                      <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
                        <button 
                          onClick={copyBlueprintId}
                          className="text-gray-300 hover:text-white bg-ink/90 hover:bg-black px-3 py-1.5 rounded-lg border border-border/60 transition-colors flex items-center gap-1.5 cursor-pointer text-[10px] font-bold"
                        >
                          {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                          {copied ? 'Copied' : 'Copy Spec'}
                        </button>
                        <button 
                          onClick={handleDownloadSpec}
                          className="text-gray-300 hover:text-white bg-ink/90 hover:bg-black px-3 py-1.5 rounded-lg border border-border/60 transition-colors flex items-center gap-1.5 cursor-pointer text-[10px] font-bold"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Export File
                        </button>
                      </div>
                      <pre className="text-white/95 leading-relaxed pt-8 overflow-x-auto">{JSON.stringify(compiledBlueprint, null, 2)}</pre>
                    </div>
                    <p className="text-gray-400 text-[10px] font-mono leading-relaxed">
                      * Real configuration specification. Feed this payload directly into the Blitz scaffold script to reproduce the scaffold on your local terminal environment.
                    </p>
                  </div>
                )}

                {/* Next Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/5">
                  <motion.button
                    onClick={() => setStep(1)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="px-6 py-3.5 border border-white/10 text-white hover:text-white hover:bg-white/5 font-mono font-bold text-xs uppercase tracking-widest transition-all duration-200 flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center rounded-full active:scale-[0.98]"
                  >
                    RESET PARSER ENGINE
                  </motion.button>

                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="px-8 py-3.5 bg-red-600 text-white font-mono font-bold text-xs uppercase tracking-widest hover:bg-red-500 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer w-full sm:w-auto rounded-full active:scale-[0.98] group shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] border border-red-500/30"
                  >
                    DEPLOY BLUEPRINT TO CREATIVE TEAM
                    <svg
                      className="ml-[0.1em] h-3.5 w-3.5 transition-none text-white"
                      fill="none"
                      viewBox="0 0 10 10"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="[stroke-dasharray:32] [stroke-dashoffset:32] transition-[stroke-dashoffset] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:[stroke-dashoffset:0]"
                      />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
};
