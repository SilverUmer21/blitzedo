import { useState } from 'react';
import BlitzedoLanding from './components/blitzedo-landing';
import { SandboxConfig } from './components/particle-sandbox';

export default function App() {
  const [sandboxConfig, setSandboxConfig] = useState<SandboxConfig>({
    particleColor: 'rgba(220, 38, 38, 0.75)',
    lineColor: '220, 38, 38',
    mouseRadius: 200,
    densityFactor: 12000,
    speedFactor: 1,
    themeName: 'red',
  });

  return (
    <div className="relative min-h-screen bg-void w-full overflow-hidden">
      <BlitzedoLanding 
        sandboxConfig={sandboxConfig} 
        setSandboxConfig={setSandboxConfig}
      />
    </div>
  );
}
