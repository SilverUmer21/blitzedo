import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Gamepad2, Smartphone, CheckCircle, ShieldCheck, Sparkles, Send, Globe } from 'lucide-react';
import { FeaturedProjects } from './featured-projects';
import { ProjectPlanner } from './project-planner';
import BlitzParticleBg from './ui/blitz-particle-bg';
import { SandboxConfig } from '../types';

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
      <header className="fixed top-0 left-0 w-full z-50 border-b border-border/80 bg-void/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="text-2xl font-display font-extrabold tracking-tight text-white flex items-center gap-1.5">
              BLITZEDO<span className="text-blitz-red font-mono">.</span>
            </span>
          </a>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-10 font-mono text-xs tracking-widest text-ash">
            <a href="#projects" className="hover:text-white transition-colors duration-200">PROJECTS</a>
            <a href="#planner" className="hover:text-white transition-colors duration-200">COMPILER</a>
            <a href="#about" className="hover:text-white transition-colors duration-200">PILLARS</a>
          </nav>

          {/* Action Call / Get In Touch */}
          <div className="flex items-center gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="px-6 py-2.5 border border-red-500/30 hover:border-red-500 text-white bg-red-500/5 hover:bg-red-500/10 text-xs font-mono font-bold tracking-widest transition-all duration-300 uppercase cursor-pointer rounded-full active:scale-[0.98] flex items-center gap-1.5 group shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]"
            >
              Get In Touch
              <svg
                className="ml-[0.1em] h-3.5 w-3.5 transition-none text-red-500"
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
            className="text-3xl sm:text-6xl md:text-8xl font-display font-extrabold tracking-tight text-white mb-8 uppercase leading-[0.95] sm:leading-[0.88]"
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
            <motion.a
              href="#planner"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="px-8 py-4 bg-red-600 text-white hover:bg-red-500 transition-all duration-300 flex items-center gap-2.5 w-full sm:w-auto justify-center cursor-pointer rounded-full font-mono text-xs font-bold tracking-widest active:scale-[0.98] group shadow-[0_0_25px_rgba(220,38,38,0.25)] hover:shadow-[0_0_35px_rgba(220,38,38,0.45)] border border-red-500/30"
            >
              RUN BLUEPRINT COMPILER
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
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="px-8 py-4 border border-white/10 bg-white/[0.02] text-white hover:bg-white/[0.08] hover:border-red-500/40 transition-all duration-300 flex items-center gap-2.5 w-full sm:w-auto justify-center cursor-pointer rounded-full font-mono text-xs font-bold tracking-widest active:scale-[0.98] group hover:shadow-[0_0_25px_rgba(239,68,68,0.1)]"
            >
              EXPLORE RECENT WORKS
              <svg
                className="ml-[0.1em] h-3.5 w-3.5 transition-none text-red-500"
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
                  <span className="font-mono text-xs text-red-500 font-bold group-hover:text-blitz-red transition-colors duration-300">
                    01
                  </span>
                </div>
                
                <p className="text-gray-200 text-sm leading-relaxed font-sans mb-8 group-hover:text-white transition-colors duration-300">
                  Unity and Unreal projects from prototype to launch. Level design, mechanics, UI, and the full production pipeline.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-mono tracking-wider px-3 py-1 bg-[#121214] border border-border/80 text-white rounded-md group-hover:border-blitz-red/20 group-hover:text-white transition-all duration-300">
                  Unity
                </span>
                <span className="text-[10px] font-mono tracking-wider px-3 py-1 bg-[#121214] border border-border/80 text-white rounded-md group-hover:border-blitz-red/20 group-hover:text-white transition-all duration-300">
                  Unreal
                </span>
                <span className="text-[10px] font-mono tracking-wider px-3 py-1 bg-[#121214] border border-border/80 text-white rounded-md group-hover:border-blitz-red/20 group-hover:text-white transition-all duration-300">
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
                  <span className="font-mono text-xs text-red-500 font-bold group-hover:text-blitz-red transition-colors duration-300">
                    02
                  </span>
                </div>
                
                <p className="text-gray-200 text-sm leading-relaxed font-sans mb-8 group-hover:text-white transition-colors duration-300">
                  Landing pages and web apps that perform. Next.js, React, and the modern stack — built to be fast, not just to look fast.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-mono tracking-wider px-3 py-1 bg-[#121214] border border-border/80 text-white rounded-md group-hover:border-blitz-red/20 group-hover:text-white transition-all duration-300">
                  Next.js
                </span>
                <span className="text-[10px] font-mono tracking-wider px-3 py-1 bg-[#121214] border border-border/80 text-white rounded-md group-hover:border-blitz-red/20 group-hover:text-white transition-all duration-300">
                  React
                </span>
                <span className="text-[10px] font-mono tracking-wider px-3 py-1 bg-[#121214] border border-border/80 text-white rounded-md group-hover:border-blitz-red/20 group-hover:text-white transition-all duration-300">
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
                  <span className="font-mono text-xs text-red-500 font-bold group-hover:text-blitz-red transition-colors duration-300">
                    03
                  </span>
                </div>
                
                <p className="text-gray-200 text-sm leading-relaxed font-sans mb-8 group-hover:text-white transition-colors duration-300">
                  Mobile products designed from interaction up. We handle UX research, interface design, and cross-platform engineering.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-mono tracking-wider px-3 py-1 bg-[#121214] border border-border/80 text-white rounded-md group-hover:border-blitz-red/20 group-hover:text-white transition-all duration-300">
                  React Native
                </span>
                <span className="text-[10px] font-mono tracking-wider px-3 py-1 bg-[#121214] border border-border/80 text-white rounded-md group-hover:border-blitz-red/20 group-hover:text-white transition-all duration-300">
                  Flutter
                </span>
                <span className="text-[10px] font-mono tracking-wider px-3 py-1 bg-[#121214] border border-border/80 text-white rounded-md group-hover:border-blitz-red/20 group-hover:text-white transition-all duration-300">
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
            <span className="text-red-500 font-mono text-sm font-bold tracking-widest uppercase block">
              SECURE CONTACT PORTAL
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight uppercase">
              FORGE YOUR SYSTEM
            </h2>
            <p className="text-gray-200 text-sm md:text-base max-w-md mx-auto leading-relaxed">
              Initiate a dialogue. Submit your coordinate blueprints or project specs directly to our active development teams.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-void/90 border border-border p-8 md:p-12 rounded-xl shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-white/90 uppercase tracking-widest font-bold">
                    IDENTIFICATION / NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. Director Sterling"
                    className="w-full bg-ink border border-border px-4 py-3.5 text-white placeholder-white/40 text-sm font-sans focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-all rounded"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-white/90 uppercase tracking-widest font-bold">
                    ROUTING / EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState(p => ({ ...p, email: e.target.value }))}
                    placeholder="e.g. sterling@vanguard.io"
                    className="w-full bg-ink border border-border px-4 py-3.5 text-white placeholder-white/40 text-sm font-sans focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-all rounded"
                  />
                </div>
              </div>

              {/* Project Category */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-white/90 uppercase tracking-widest font-bold">
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
                      className={`py-3 text-xs font-mono border uppercase tracking-wider transition-all cursor-pointer rounded ${
                        formState.projectType === cat.id
                          ? 'border-red-500 bg-red-500/10 text-white font-bold shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                          : 'border-border text-gray-200 hover:text-white hover:border-white/40 bg-ink/40'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-white/90 uppercase tracking-widest font-bold">
                  PROJECT SCOPE / MESSAGE DETAILS
                </label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState(p => ({ ...p, message: e.target.value }))}
                  placeholder="Outline the parameters of your system ideation or insert a blueprint hash code..."
                  className="w-full bg-ink border border-border px-4 py-3.5 text-white placeholder-white/40 text-sm font-sans focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-all resize-none rounded"
                />
              </div>

              {/* Submit / Status */}
              <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/5">
                <span className="text-xs font-mono text-gray-200 flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="h-4.5 w-4.5 text-green-400" /> SECURE SSL ENCRYPTED CONNECTION
                </span>

                <motion.button
                  type="submit"
                  disabled={submitting || formSubmitted}
                  whileHover={submitting || formSubmitted ? {} : { scale: 1.04, y: -1 }}
                  whileTap={submitting || formSubmitted ? {} : { scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="px-8 py-4 bg-red-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-red-500 transition-all flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer disabled:bg-white/20 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(220,38,38,0.25)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] rounded-full group"
                >
                  {submitting ? (
                    <>TRANSMITTING...</>
                  ) : formSubmitted ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-400" /> SYSTEM DEPLOYED
                    </>
                  ) : (
                    <span className="flex items-center gap-2">
                      TRANSMIT SPECIFICATIONS
                      <svg
                        className="h-3.5 w-3.5 transition-none text-white animate-pulse"
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
                    </span>
                  )}
                </motion.button>
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
