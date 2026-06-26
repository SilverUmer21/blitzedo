import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal, Sparkles, CheckCircle, ArrowRight, Layers, DollarSign, Calendar, Copy, ChevronRight, Check } from 'lucide-react';
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

    const logs = [
      '>> INITIALIZING BLITZ BLUEPRINT PARSER_v2.0...',
      '>> LOADING CONFIGURATION BLOCKS...',
      `>> INGESTING PLATFORM VALUE: [${planner.platform.toUpperCase()}]`,
      `>> RESOLVING AESTHETIC PRINCIPLE: [${planner.aesthetic.toUpperCase()}]`,
      `>> CALCULATING STRUCTURAL SCOPE: [${planner.scope.toUpperCase()}]`,
      '>> EXAMINING SELECTED ARTIFACT FEATS...',
      ...planner.features.map(f => `>> MODULE INJECTED: [${f.toUpperCase()}]`),
      '>> SPACING OPTIMIZATION: 8px BASE GRID CONFIRMED',
      '>> RESOLVING DEPENDENCY CHAINS...',
      '>> COMPILING TECHNICAL SPECIFICATION...',
      '>> VALIDATING SECURITY ROLES AND EXCLUSIONS...',
      '>> GENERATING UNIQUE SYSTEM BLUEPRINT ID...',
      '>> COMPILE SUCCESSFUL. BLUEPRINT DEPLOYED.'
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setTerminalLogs((prev) => [...prev, log]);
        if (index === logs.length - 1) {
          // Generate final output
          setTimeout(() => {
            const blueprintId = `BLZ-${planner.platform.substring(0,2).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
            
            // Calculate pseudo specs
            let duration = '4-6 Weeks';
            let stack = ['Vite', 'React', 'Tailwind v4'];
            let arch = 'Client SPA // Edge Deployment';

            if (planner.scope === 'standard') {
              duration = '8-10 Weeks';
              stack.push('Express Server', 'Firebase Firestore');
              arch = 'Full-Stack Server // Durable Cloud Persistence';
            } else if (planner.scope === 'enterprise') {
              duration = '14-16 Weeks';
              stack.push('Express Server', 'Google Cloud SQL', 'Drizzle ORM');
              arch = 'High-Availability Cluster // Relational Database Cluster';
            }

            if (planner.features.includes('ai')) {
              stack.push('@google/genai SDK', 'Gemini Models');
            }
            if (planner.features.includes('realtime')) {
              stack.push('Socket.io Websockets');
            }

            setCompiledBlueprint({
              id: blueprintId,
              duration,
              stack: Array.from(new Set(stack)),
              architecture: arch,
              complexity: planner.scope === 'light' ? 'Optimized' : planner.scope === 'standard' ? 'Symmetric' : 'High-Octane Core'
            });
            setCompiling(false);
            setStep(3);
          }, 600);
        }
      }, index * 250);
    });
  };

  const copyBlueprintId = () => {
    if (!compiledBlueprint) return;
    navigator.clipboard.writeText(compiledBlueprint.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="planner" className="py-24 md:py-32 border-t border-border bg-ink relative overflow-hidden">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.015)_1px,transparent_1px)] bg-[size:100%_48px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-blitz-red font-mono text-xs tracking-widest uppercase block mb-3">
            COMPILER ENGINE
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white leading-[0.88] uppercase">
            BLITZ COMPILER
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Live Specs */}
          <div className="lg:col-span-4 space-y-8">
            <p className="text-ash text-sm leading-relaxed max-w-sm font-sans font-normal">
              Architect your ideal system. Select your building blocks and let our dynamic engine map the structural specifications.
            </p>

            {/* Realtime Live Config Visualizer */}
            <div className="border border-border/80 p-6 bg-void/50 space-y-5 rounded-2xl">
              <span className="text-[10px] font-mono tracking-wider text-ash/40 uppercase block border-b border-border/40 pb-3">
                LIVE CONFIG MONITOR
              </span>
              
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center py-1 border-b border-border/20">
                  <span className="text-ash/50">MEDIUM:</span>
                  <span className="text-white font-bold uppercase">
                    {platformOptions.find(o => o.id === planner.platform)?.label.split(' ')[0] || planner.platform}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border/20">
                  <span className="text-ash/50">AESTHETIC:</span>
                  <span className="text-white font-bold uppercase">
                    {planner.aesthetic === 'swiss' ? 'SWISS MINIMAL' : planner.aesthetic === 'synth' ? 'NEON SYNTH' : 'BRUTALIST'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border/20">
                  <span className="text-ash/50">ARCH SCALE:</span>
                  <span className="text-white font-bold uppercase">
                    {planner.scope === 'light' ? 'MVP' : planner.scope === 'standard' ? 'CLASSIC' : 'INFINITY'}
                  </span>
                </div>
                <div className="pt-2">
                  <span className="text-ash/50 block mb-2 text-[10px]">ACTIVE MODULES:</span>
                  {planner.features.length === 0 ? (
                    <span className="text-blitz-red uppercase text-[10px]">No modules selected</span>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {planner.features.map((feat) => (
                        <span key={feat} className="text-[9px] bg-blitz-red/10 border border-blitz-red/30 px-2 py-0.5 rounded text-white uppercase font-bold">
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
            <div className="flex justify-between items-center mb-10 border-b border-border pb-6 font-mono text-xs text-ash">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-white' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center border ${step >= 1 ? 'border-blitz-red bg-blitz-red text-white' : 'border-border'}`}>1</span>
                <span>STRUCTURE</span>
              </div>
              <div className="w-8 h-[1px] bg-border" />
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-white' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center border ${step >= 2 ? 'border-blitz-red bg-blitz-red text-white' : 'border-border'}`}>2</span>
                <span>FEATURES</span>
              </div>
              <div className="w-8 h-[1px] bg-border" />
              <div className={`flex items-center gap-2 ${step >= 3 ? 'text-white' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center border ${step >= 3 ? 'border-blitz-red bg-blitz-red text-white' : 'border-border'}`}>3</span>
                <span>BLUEPRINT</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
            {/* STEP 1: Platform & Aesthetic & Scope */}
            {step === 1 && !compiling && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Platform selection */}
                <div>
                  <label className="block text-white font-display text-sm font-extrabold uppercase mb-4 tracking-wider">
                    Select Digital Medium
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {platformOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setPlanner((p) => ({ ...p, platform: opt.id as PlatformType }))}
                        className={`text-left p-5 border transition-all cursor-pointer ${
                          planner.platform === opt.id
                            ? 'border-blitz-red bg-blitz-red/5'
                            : 'border-border bg-ink/30 hover:border-white/20'
                        }`}
                      >
                        <span className="block font-display font-bold text-sm text-white mb-1">{opt.label}</span>
                        <span className="block text-ash text-xs leading-relaxed">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Aesthetic Selection */}
                <div>
                  <label className="block text-white font-display text-sm font-extrabold uppercase mb-4 tracking-wider">
                    Creative Vibe / Aesthetic Direction
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {aestheticOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setPlanner((p) => ({ ...p, aesthetic: opt.id as any }))}
                        className={`text-left p-5 border transition-all cursor-pointer ${
                          planner.aesthetic === opt.id
                            ? 'border-blitz-red bg-blitz-red/5'
                            : 'border-border bg-ink/30 hover:border-white/20'
                        }`}
                      >
                        <span className="block font-display font-bold text-sm text-white mb-1">{opt.label}</span>
                        <span className="block text-ash text-xs leading-relaxed">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scope Selection */}
                <div>
                  <label className="block text-white font-display text-sm font-extrabold uppercase mb-4 tracking-wider">
                    Scale & Architectural Complexity
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {scopeOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setPlanner((p) => ({ ...p, scope: opt.id as any }))}
                        className={`text-left p-5 border transition-all cursor-pointer ${
                          planner.scope === opt.id
                            ? 'border-blitz-red bg-blitz-red/5'
                            : 'border-border bg-ink/30 hover:border-white/20'
                        }`}
                      >
                        <span className="block font-display font-bold text-sm text-white mb-1">{opt.label}</span>
                        <span className="block text-ash text-xs leading-relaxed">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="flex justify-end pt-6 border-t border-border">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    CONTINUE BUILD <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Feature Selections */}
            {step === 2 && !compiling && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <label className="block text-white font-display text-sm font-extrabold uppercase mb-4 tracking-wider">
                    Select Architectural Core Modules
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {featureOptions.map((opt) => {
                      const isSelected = planner.features.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          onClick={() => toggleFeature(opt.id)}
                          className={`text-left p-5 border transition-all flex items-start gap-4 cursor-pointer ${
                            isSelected
                              ? 'border-blitz-red bg-blitz-red/5'
                              : 'border-border bg-ink/30 hover:border-white/20'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-sm border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${isSelected ? 'border-blitz-red bg-blitz-red text-white' : 'border-border bg-void'}`}>
                            {isSelected && <Check className="h-3.5 w-3.5" />}
                          </div>
                          <div>
                            <span className="block font-display font-bold text-sm text-white mb-1">{opt.label}</span>
                            <span className="block text-ash text-xs leading-relaxed">{opt.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="flex justify-between pt-6 border-t border-border">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-border text-white hover:text-white hover:bg-white/5 font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    BACK
                  </button>
                  <button
                    onClick={runCompiler}
                    className="px-6 py-3 bg-blitz-red text-white font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    COMPILE BLUEPRINT <ChevronRight className="h-4 w-4" />
                  </button>
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
                className="font-mono text-xs text-white space-y-2 h-[350px] flex flex-col justify-between"
              >
                <div className="bg-void border border-border p-5 rounded overflow-y-auto flex-grow space-y-1 scrollbar-none h-64">
                  <div className="flex items-center gap-2 text-blitz-red font-bold mb-3 border-b border-border pb-2">
                    <Terminal className="h-3.5 w-3.5 animate-pulse" /> SYSTEM ARCH_COMPILER v2.0
                  </div>
                  {terminalLogs.map((log, index) => (
                    <div key={index} className="leading-relaxed text-white/90">
                      {log}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center border-t border-border pt-4">
                  <span className="text-ash flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-blitz-red rounded-full animate-ping" /> PROCESSING CORE PARAMETERS...
                  </span>
                  <span className="text-blitz-red font-bold">
                    {Math.round((terminalLogs.length / 13) * 100)}%
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
                {/* Visual Blueprint Output */}
                <div className="border border-border p-6 md:p-8 bg-ink/20 space-y-6 relative">
                  {/* Decorative corner tag */}
                  <div className="absolute top-0 right-0 bg-blitz-red text-white text-[9px] font-mono font-bold px-3 py-1 uppercase tracking-widest">
                    SYSTEM OK
                  </div>

                  {/* Blueprint ID and Title */}
                  <div className="flex justify-between items-start border-b border-border pb-4">
                    <div>
                      <span className="text-blitz-red font-mono text-[10px] tracking-widest block mb-1">BLUEPRINT ID CODE</span>
                      <h4 className="text-xl md:text-2xl font-mono font-bold text-white flex items-center gap-2 select-all">
                        {compiledBlueprint.id}
                        <button 
                          onClick={copyBlueprintId}
                          className="text-ash hover:text-white p-1 transition-colors cursor-pointer"
                          title="Copy ID"
                        >
                          {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-ash font-mono text-[10px] block mb-1">PARSED DESIGN</span>
                      <span className="text-sm font-bold uppercase text-white font-display">{planner.aesthetic} vibe</span>
                    </div>
                  </div>

                  {/* Quick specs grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border border-border bg-void/50 p-4">
                      <span className="text-ash font-mono text-[9px] tracking-wider block mb-1 uppercase"><Calendar className="h-3 w-3 inline mr-1 text-blitz-red" /> Estimated Timeline</span>
                      <span className="text-sm font-semibold">{compiledBlueprint.duration}</span>
                    </div>
                    <div className="border border-border bg-void/50 p-4">
                      <span className="text-ash font-mono text-[9px] tracking-wider block mb-1 uppercase"><Layers className="h-3 w-3 inline mr-1 text-blitz-red" /> Core System Architecture</span>
                      <span className="text-sm font-semibold">{compiledBlueprint.architecture}</span>
                    </div>
                    <div className="border border-border bg-void/50 p-4">
                      <span className="text-ash font-mono text-[9px] tracking-wider block mb-1 uppercase"><DollarSign className="h-3.5 w-3.5 inline mr-1 text-blitz-red" /> Engine Rig Complexity</span>
                      <span className="text-sm font-semibold">{compiledBlueprint.complexity}</span>
                    </div>
                  </div>

                  {/* Suggested Stack Blocks */}
                  <div>
                    <span className="text-ash font-mono text-[10px] tracking-wider block mb-3 uppercase">COMPILED DEPENDENCY STACK</span>
                    <div className="flex flex-wrap gap-2">
                      {compiledBlueprint.stack.map((item: string, idx: number) => (
                        <span key={idx} className="bg-void border border-border px-3 py-1 font-mono text-xs text-white">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* System confirmation footer */}
                  <div className="border-t border-border pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-ash font-mono text-[10px]">
                    <span className="flex items-center gap-1.5 text-green-400">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full" /> ALL DEPENDENCIES RESOLVED IN LOCAL COMPILER
                    </span>
                    <span>COORDINATES REPLICABLE ON STANDBY</span>
                  </div>
                </div>

                {/* Next Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-border">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-border text-white hover:text-white hover:bg-white/5 font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
                  >
                    RESET PARSER ENGINE
                  </button>

                  <a
                    href="#contact"
                    className="px-6 py-3 bg-blitz-red text-white font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                  >
                    DEPLOY BLUEPRINT TO CREATIVE TEAM <ArrowRight className="h-4 w-4" />
                  </a>
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
