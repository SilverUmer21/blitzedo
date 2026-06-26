import React from 'react';
import { Sliders, Zap, Eye, RefreshCw, Sparkles } from 'lucide-react';

export interface SandboxConfig {
  particleColor: string;
  lineColor: string;
  mouseRadius: number;
  densityFactor: number;
  speedFactor: number;
  themeName: string;
}

interface ParticleSandboxProps {
  config: SandboxConfig;
  onChange: (newConfig: SandboxConfig) => void;
}

export const ParticleSandbox: React.FC<ParticleSandboxProps> = ({ config, onChange }) => {
  const themes = [
    {
      name: 'BLITZ RED',
      particleColor: 'rgba(220, 38, 38, 0.75)',
      lineColor: '220, 38, 38',
      themeName: 'red',
    },
    {
      name: 'CYBER WHITE',
      particleColor: 'rgba(255, 255, 255, 0.75)',
      lineColor: '255, 255, 255',
      themeName: 'white',
    },
    {
      name: 'MOLTEN GOLD',
      particleColor: 'rgba(217, 119, 6, 0.75)',
      lineColor: '217, 119, 6',
      themeName: 'gold',
    },
  ];

  const handleThemeChange = (theme: typeof themes[0]) => {
    onChange({
      ...config,
      particleColor: theme.particleColor,
      lineColor: theme.lineColor,
      themeName: theme.themeName,
    });
  };

  const handleSliderChange = (key: keyof SandboxConfig, value: number) => {
    onChange({
      ...config,
      [key]: value,
    });
  };

  const resetConfig = () => {
    onChange({
      particleColor: 'rgba(220, 38, 38, 0.75)',
      lineColor: '220, 38, 38',
      mouseRadius: 200,
      densityFactor: 12000,
      speedFactor: 1,
      themeName: 'red',
    });
  };

  return (
    <div className="bg-ink border border-border p-6 md:p-8 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Dynamic line vector decor */}
      <div className="absolute top-0 right-0 w-24 h-[1px] bg-blitz-red" />
      <div className="absolute top-0 right-0 w-[1px] h-24 bg-blitz-red" />

      <div>
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-blitz-red font-mono text-xs tracking-widest flex items-center gap-1.5 mb-1">
              <Sliders className="h-3.5 w-3.5" /> FIELD MANIPULATOR
            </span>
            <h3 className="text-2xl font-display font-extrabold tracking-tight text-white">
              VECTOR SANDBOX
            </h3>
          </div>
          <button
            onClick={resetConfig}
            className="text-ash hover:text-white p-2 border border-border bg-void hover:bg-white/5 transition-colors cursor-pointer"
            title="Reset sandbox values"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        <p className="text-ash text-xs leading-relaxed mb-8">
          The background is not pre-rendered. Customize the canvas speed, node proximity, and color fields live using the telemetry sliders below.
        </p>

        {/* Sliders and Selectors */}
        <div className="space-y-6">
          {/* Color Schemes */}
          <div>
            <span className="block text-[10px] font-mono text-white/50 uppercase tracking-wider mb-3">
              SELECT SPECTRAL CHANNEL
            </span>
            <div className="grid grid-cols-3 gap-2">
              {themes.map((theme) => (
                <button
                  key={theme.themeName}
                  onClick={() => handleThemeChange(theme)}
                  className={`py-2 text-[10px] font-mono border uppercase tracking-wider transition-all cursor-pointer ${
                    config.themeName === theme.themeName
                      ? 'border-blitz-red text-white bg-blitz-red/5'
                      : 'border-border text-ash hover:text-white hover:border-white/20'
                  }`}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>

          {/* Velocity Speed Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-mono text-white/50">
              <span>NODE VELOCITY</span>
              <span className="text-white">{config.speedFactor.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3"
              step="0.1"
              value={config.speedFactor}
              onChange={(e) => handleSliderChange('speedFactor', parseFloat(e.target.value))}
              className="w-full h-1 bg-void border border-border appearance-none cursor-pointer accent-blitz-red focus:outline-none"
            />
          </div>

          {/* Particle Density */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-mono text-white/50">
              <span>FIELD DENSITY (NODE CAP)</span>
              <span className="text-white">
                {config.densityFactor === 6000 ? 'Dense' : config.densityFactor === 12000 ? 'Symmetric' : 'Sparse'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Sparse', value: 20000 },
                { label: 'Standard', value: 12000 },
                { label: 'Dense', value: 6000 },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleSliderChange('densityFactor', item.value)}
                  className={`py-1.5 text-[9px] font-mono border uppercase tracking-widest transition-colors cursor-pointer ${
                    config.densityFactor === item.value
                      ? 'border-white text-white'
                      : 'border-border text-ash hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Deflection Radius */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-mono text-white/50">
              <span>MOUSE DEFLECTION RADIUS</span>
              <span className="text-white">{config.mouseRadius}px</span>
            </div>
            <input
              type="range"
              min="50"
              max="350"
              step="10"
              value={config.mouseRadius}
              onChange={(e) => handleSliderChange('mouseRadius', parseInt(e.target.value))}
              className="w-full h-1 bg-void border border-border appearance-none cursor-pointer accent-blitz-red focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="border-t border-border pt-4 mt-8 flex justify-between items-center text-ash font-mono text-[9px]">
        <span className="flex items-center gap-1">
          <Eye className="h-3 w-3 text-blitz-red animate-pulse" /> ENGINE ATTACHED
        </span>
        <span>LATENCY: ZERO // GPU ACTIVE</span>
      </div>
    </div>
  );
};
