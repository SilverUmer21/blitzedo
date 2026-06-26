import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Terminal, ArrowRight, Gamepad2, Monitor, Smartphone, MessageSquare, ChevronRight, CheckCircle, ShieldCheck, Cpu, Sparkles, Send, Globe } from 'lucide-react';
import { FeaturedProjects } from './featured-projects';
import { ProjectPlanner } from './project-planner';
import { ParticleSandbox, SandboxConfig } from './particle-sandbox';
import BlitzParticleBg from './ui/blitz-particle-bg';

interface BlitzedoLandingProps {
  sandboxConfig: SandboxConfig;
  setSandboxConfig: (cfg: SandboxConfig) => void;
}

export const BlitzedoLanding: React.FC<BlitzedoLandingProps> = ({
  sandboxConfig,
  setSandboxConfig,
}) => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '', projectType: 'web' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
      setFormState({ name: '', email: '', message: '', projectType: 'web' });
      setTimeout(() => setFormSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <div className="bg-void text-white font-sans min-h-screen selection:bg-blitz-red selection:text-white">
      
      {/* Dynamic Ambient Background Canvas */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <BlitzParticleBg 
          key={JSON.stringify(sandboxConfig)} 
          particleColor={sandboxConfig.particleColor}
          lineColor={sandboxConfig.lineColor}
          mouseRadius={sandboxConfig.mouseRadius}
          densityFactor={sandboxConfig.densityFactor}
          speedFactor={sandboxConfig.speedFactor}
        />
      </div>

      {/* Sticky Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-50 border-b border-border/80 bg-void/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="text-2xl font-display font-extrabold tracking-tight text-white flex items-center gap-1.5">
              BLITZEDO<span className="text-blitz-red font-mono">.</span>
            </span>
          </a>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-wider">
            <a href="#projects" className="text-ash hover:text-white transition-colors">PROJECTS</a>
            <a href="#planner" className="text-ash hover:text-white transition-colors">COMPILER</a>
            <a href="#sandbox-section" className="text-ash hover:text-white transition-colors">SANDBOX</a>
            <a href="#about" className="text-ash hover:text-white transition-colors">PILLARS</a>
            <a href="#contact" className="text-ash hover:text-white transition-colors">GET IN TOUCH</a>
          </nav>

          {/* Action Call / Get In Touch */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="px-5 py-2.5 border border-blitz-red text-white hover:bg-blitz-red/10 text-xs font-mono font-bold tracking-widest transition-all duration-300 uppercase cursor-pointer relative overflow-hidden shadow-[0_0_15px_rgba(220,38,38,0.1)] hover:shadow-[0_0_25px_rgba(220,38,38,0.25)] rounded-sm"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Display Header with Syne */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="text-5xl md:text-8xl font-display font-extrabold tracking-tight text-white mb-8 uppercase leading-[0.88]"
          >
            We build <span className="text-blitz-red">high-octane</span> digital products<span className="text-blitz-red">.</span>
          </motion.h1>

          {/* Action buttons with modern glowing hover states */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#planner"
              className="relative group overflow-hidden px-8 py-4 border border-blitz-red bg-blitz-red/10 text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer shadow-[0_0_15px_rgba(220,38,38,0.15)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:bg-blitz-red rounded-sm"
            >
              <span className="relative z-10 flex items-center gap-2 font-mono text-xs">
                RUN BLUEPRINT COMPILER <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </a>
            <a
              href="#projects"
              className="relative group overflow-hidden px-8 py-4 border border-white/20 bg-ink/30 text-white hover:text-white hover:border-white text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer hover:bg-white/5 rounded-sm"
            >
              <span className="relative z-10 flex items-center gap-2 font-mono text-xs">
                EXPLORE RECENT WORKS <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300 text-blitz-red" />
              </span>
            </a>
          </motion.div>
        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
          <span className="text-[10px] font-mono tracking-widest">SCROLL</span>
          <div className="w-[1px] h-10 bg-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-blitz-red animate-[bounce_1.5s_infinite]" />
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD / THREE LANES SECTION */}
      <section id="about" className="py-24 md:py-32 border-t border-border bg-void/95 text-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="mb-12">
            <span className="text-blitz-red font-mono text-xs tracking-widest uppercase block mb-3">
              WHAT WE BUILD
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white leading-[0.88] uppercase">
              Three lanes. One studio.
            </h2>
          </div>

          {/* Three Lanes Grid Cards with Spotlight Focus effect */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 group/grid">
            
            {/* Card 01: Game Design & Dev */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="border border-border bg-[#0c0c0d] p-8 md:p-10 rounded-2xl relative flex flex-col justify-between min-h-[350px] transition-all duration-500 hover:scale-[1.02] hover:border-blitz-red hover:shadow-[0_0_35px_rgba(220,38,38,0.15)] group-hover/grid:opacity-60 hover:!opacity-100 group"
            >
              {/* Subtle top red glow bar on hover */}
              <div className="absolute top-0 left-10 right-10 h-[1.5px] bg-gradient-to-r from-transparent via-blitz-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-ink/40 border border-border flex items-center justify-center text-white group-hover:text-blitz-red group-hover:border-blitz-red/30 transition-all duration-300">
                      <Gamepad2 className="h-6 w-6 group-hover:rotate-6 transition-transform" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-bold tracking-tight text-white">
                      Game Design & Dev
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-ash/30 group-hover:text-blitz-red transition-colors duration-300">
                    01
                  </span>
                </div>
                
                <p className="text-ash text-sm leading-relaxed font-sans mb-8 group-hover:text-white/90 transition-colors duration-300">
                  Unity and Unreal projects from prototype to launch. Level design, mechanics, UI, and the full production pipeline.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-mono tracking-wider px-3 py-1 bg-[#121214] border border-border/80 text-ash rounded-md group-hover:border-blitz-red/20 group-hover:text-white transition-all duration-300">
                  Unity
                </span>
                <span className="text-[10px] font-mono tracking-wider px-3 py-1 bg-[#121214] border border-border/80 text-ash rounded-md group-hover:border-blitz-red/20 group-hover:text-white transition-all duration-300">
                  Unreal
                </span>
                <span className="text-[10px] font-mono tracking-wider px-3 py-1 bg-[#121214] border border-border/80 text-ash rounded-md group-hover:border-blitz-red/20 group-hover:text-white transition-all duration-300">
                  Godot
                </span>
              </div>
            </motion.div>

            {/* Card 02: Web Development */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="border border-border bg-[#0c0c0d] p-8 md:p-10 rounded-2xl relative flex flex-col justify-between min-h-[350px] transition-all duration-500 hover:scale-[1.02] hover:border-blitz-red hover:shadow-[0_0_35px_rgba(220,38,38,0.15)] group-hover/grid:opacity-60 hover:!opacity-100 group"
            >
              {/* Subtle top red glow bar on hover */}
              <div className="absolute top-0 left-10 right-10 h-[1.5px] bg-gradient-to-r from-transparent via-blitz-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-ink/40 border border-border flex items-center justify-center text-white group-hover:text-blitz-red group-hover:border-blitz-red/30 transition-all duration-300">
                      <Globe className="h-6 w-6 group-hover:rotate-6 transition-transform" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-bold tracking-tight text-white">
                      Web Development
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-ash/30 group-hover:text-blitz-red transition-colors duration-300">
                    02
                  </span>
                </div>
                
                <p className="text-ash text-sm leading-relaxed font-sans mb-8 group-hover:text-white/90 transition-colors duration-300">
                  Landing pages and web apps that perform. Next.js, React, and the modern stack — built to be fast, not just to look fast.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-mono tracking-wider px-3 py-1 bg-[#121214] border border-border/80 text-ash rounded-md group-hover:border-blitz-red/20 group-hover:text-white transition-all duration-300">
                  Next.js
                </span>
                <span className="text-[10px] font-mono tracking-wider px-3 py-1 bg-[#121214] border border-border/80 text-ash rounded-md group-hover:border-blitz-red/20 group-hover:text-white transition-all duration-300">
                  React
                </span>
                <span className="text-[10px] font-mono tracking-wider px-3 py-1 bg-[#121214] border border-border/80 text-ash rounded-md group-hover:border-blitz-red/20 group-hover:text-white transition-all duration-300">
                  TypeScript
                </span>
              </div>
            </motion.div>

            {/* Card 03: App Design & Dev */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="border border-border bg-[#0c0c0d] p-8 md:p-10 rounded-2xl relative flex flex-col justify-between min-h-[350px] transition-all duration-500 hover:scale-[1.02] hover:border-blitz-red hover:shadow-[0_0_35px_rgba(220,38,38,0.15)] group-hover/grid:opacity-60 hover:!opacity-100 group"
            >
              {/* Subtle top red glow bar on hover */}
              <div className="absolute top-0 left-10 right-10 h-[1.5px] bg-gradient-to-r from-transparent via-blitz-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-ink/40 border border-border flex items-center justify-center text-white group-hover:text-blitz-red group-hover:border-blitz-red/30 transition-all duration-300">
                      <Smartphone className="h-6 w-6 group-hover:rotate-6 transition-transform" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-bold tracking-tight text-white">
                      App Design & Dev
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-ash/30 group-hover:text-blitz-red transition-colors duration-300">
                    03
                  </span>
                </div>
                
                <p className="text-ash text-sm leading-relaxed font-sans mb-8 group-hover:text-white/90 transition-colors duration-300">
                  Mobile products designed from interaction up. We handle UX research, interface design, and cross-platform engineering.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-mono tracking-wider px-3 py-1 bg-[#121214] border border-border/80 text-ash rounded-md group-hover:border-blitz-red/20 group-hover:text-white transition-all duration-300">
                  React Native
                </span>
                <span className="text-[10px] font-mono tracking-wider px-3 py-1 bg-[#121214] border border-border/80 text-ash rounded-md group-hover:border-blitz-red/20 group-hover:text-white transition-all duration-300">
                  Flutter
                </span>
                <span className="text-[10px] font-mono tracking-wider px-3 py-1 bg-[#121214] border border-border/80 text-ash rounded-md group-hover:border-blitz-red/20 group-hover:text-white transition-all duration-300">
                  iOS/Android
                </span>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* FEATURED PROJECTS BENTO GRID */}
      <FeaturedProjects />

      {/* DYNAMIC BLUEPRINT PLANNER */}
      <ProjectPlanner />

      {/* LIVE INTERACTIVE VECTOR SANDBOX SECTION */}
      <section id="sandbox-section" className="py-24 md:py-32 border-t border-border bg-void/90 text-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Telemetry info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-5 space-y-6"
            >
              <span className="text-blitz-red font-mono text-xs tracking-widest uppercase">
                NODE MANIPULATOR LAB
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight uppercase">
                COORDINATE TELEMETRY
              </h2>
              <p className="text-ash text-sm leading-relaxed">
                Take control of the ambient canvas particles that cover our environment. Watch how changes to velocity and density values alter rendering calculations and physical coordinates live inside this browser instance.
              </p>
              
              {/* Telemetry coordinate simulator readout */}
              <div className="border border-border p-5 bg-ink/90 font-mono text-[10px] text-white/90 space-y-1">
                <div className="text-blitz-red border-b border-border pb-1.5 mb-2 flex justify-between uppercase">
                  <span>VECTOR_STATE_MONITOR</span>
                  <span className="animate-pulse">● FEED ACTIVE</span>
                </div>
                <div className="flex justify-between">
                  <span>PARTICLE_COLOR:</span>
                  <span>{sandboxConfig.particleColor}</span>
                </div>
                <div className="flex justify-between">
                  <span>VELOCITY_STRETCH:</span>
                  <span>{sandboxConfig.speedFactor}x</span>
                </div>
                <div className="flex justify-between">
                  <span>DENSITY_CAP:</span>
                  <span>{sandboxConfig.densityFactor} (denominator)</span>
                </div>
                <div className="flex justify-between">
                  <span>DEFLECTION_ZONE:</span>
                  <span>{sandboxConfig.mouseRadius}px</span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-white/5 mt-1.5 text-ash">
                  <span>RENDER_CLOCK:</span>
                  <span>{new Date().toISOString().substring(11, 19)}</span>
                </div>
              </div>
            </motion.div>

            {/* Sandbox panel */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <ParticleSandbox config={sandboxConfig} onChange={setSandboxConfig} />
            </motion.div>

          </div>
        </div>
      </section>

      {/* CONTACT PORTAL SECTION */}
      <section id="contact" className="py-24 md:py-32 border-t border-border bg-ink/95 text-white relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16 space-y-4"
          >
            <span className="text-blitz-red font-mono text-xs tracking-widest uppercase block">
              SECURE CONTACT PORTAL
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight uppercase">
              FORGE YOUR SYSTEM
            </h2>
            <p className="text-ash text-sm max-w-md mx-auto">
              Initiate a dialogue. Submit your coordinate blueprints or project specs directly to our active development teams.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-void/90 border border-border p-8 md:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono text-white/50 uppercase tracking-widest">
                    IDENTIFICATION / NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. Director Sterling"
                    className="w-full bg-ink border border-border px-4 py-3.5 text-white placeholder-white/20 text-sm font-sans focus:outline-none focus:border-blitz-red"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono text-white/50 uppercase tracking-widest">
                    ROUTING / EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState(p => ({ ...p, email: e.target.value }))}
                    placeholder="e.g. sterling@vanguard.io"
                    className="w-full bg-ink border border-border px-4 py-3.5 text-white placeholder-white/20 text-sm font-sans focus:outline-none focus:border-blitz-red"
                  />
                </div>
              </div>

              {/* Project Category */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono text-white/50 uppercase tracking-widest">
                  PROJECT SPECIFICATION CATEGORY
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'game', label: 'Immersive Game' },
                    { id: 'web', label: 'Enterprise Web' },
                    { id: 'app', label: 'High-End App' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFormState(p => ({ ...p, projectType: cat.id }))}
                      className={`py-2.5 text-[10px] font-mono border uppercase tracking-wider transition-all cursor-pointer ${
                        formState.projectType === cat.id
                          ? 'border-blitz-red bg-blitz-red/5 text-white'
                          : 'border-border text-ash hover:text-white hover:border-white/20'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono text-white/50 uppercase tracking-widest">
                  PROJECT SCOPE / MESSAGE DETAILS
                </label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState(p => ({ ...p, message: e.target.value }))}
                  placeholder="Outline the parameters of your system ideation or insert a blueprint hash code..."
                  className="w-full bg-ink border border-border px-4 py-3.5 text-white placeholder-white/20 text-sm font-sans focus:outline-none focus:border-blitz-red resize-none"
                />
              </div>

              {/* Submit / Status */}
              <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-[10px] font-mono text-ash flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-green-400" /> SECURE SSL ENCRYPTED CONNECTION
                </span>

                <button
                  type="submit"
                  disabled={submitting || formSubmitted}
                  className="px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer disabled:bg-white/50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>TRANSMITTING...</>
                  ) : formSubmitted ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-600" /> SYSTEM DEPLOYED
                    </>
                  ) : (
                    <>
                      TRANSMIT SPECIFICATIONS <Send className="h-3.5 w-3.5 text-black" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </motion.div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-void border-t border-border relative z-10 text-ash text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 font-mono">
          <div>
            <span>&copy; {new Date().getFullYear()} BLITZEDO PRODUCTION HOUSE. ALL RIGHTS PRESERVED.</span>
          </div>
          <div className="flex gap-6">
            <span>SPEED: SUB-SECOND</span>
            <span>ACCURACY: SYMMETRIC</span>
            <span>PING: OK</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
export default BlitzedoLanding;
