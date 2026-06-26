export type PlatformType = 'game' | 'web' | 'app';

export interface ProjectType {
  id: string;
  title: string;
  subtitle: string;
  category: PlatformType;
  description: string;
  image: string;
  tags: string[];
  specs: {
    engine?: string;
    tech?: string[];
    performance?: string;
    platforms?: string[];
  };
}

export interface PlannerState {
  platform: PlatformType;
  aesthetic: 'synth' | 'swiss' | 'brutalist';
  scope: 'light' | 'standard' | 'enterprise';
  features: string[];
}

export interface ParticleConfig {
  color: string;
  lineColor: string;
  particleCountFactor: number; // e.g. 12000 (standard), 6000 (dense), 24000 (sparse)
  speed: number;
}
