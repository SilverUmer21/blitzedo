import React, { useEffect, useRef } from 'react';

interface BlitzParticleBgProps {
    particleColor?: string;
    lineColor?: string; // Hex or base color e.g. "220, 38, 38"
    mouseRadius?: number;
    densityFactor?: number; // e.g. 12000 (standard), 6000 (dense)
    speedFactor?: number; // multiplier e.g. 1
}

const BlitzParticleBg: React.FC<BlitzParticleBgProps> = ({
    particleColor = 'rgba(220, 38, 38, 0.75)',
    lineColor = '220, 38, 38',
    mouseRadius = 200,
    densityFactor = 12000,
    speedFactor = 1
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const mouse = { x: null as number | null, y: null as number | null, radius: mouseRadius };

        class Particle {
            x: number;
            y: number;
            directionX: number;
            directionY: number;
            size: number;
            color: string;

            constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
                this.x = x;
                this.y = y;
                this.directionX = directionX * speedFactor;
                this.directionY = directionY * speedFactor;
                this.size = size;
                this.color = color;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                if (!canvas) return;
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }

                // Interactive repulsion matching original high-fidelity AetherFlow reference
                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        this.x -= (dx / distance) * force * 2.2;
                        this.y -= (dy / distance) * force * 2.2;
                    }
                }

                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            if (!canvas) return;
            particles = [];
            let numberOfParticles = (canvas.height * canvas.width) / densityFactor;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                let directionX = (Math.random() - 0.5) * 0.4;
                let directionY = (Math.random() - 0.5) * 0.4;
                particles.push(new Particle(x, y, directionX, directionY, size, particleColor));
            }
        }

        const resizeCanvas = () => {
            if (!canvas) return;
            canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
            init(); 
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const connect = () => {
            if (!canvas || !ctx) return;
            const limit = particles.length;
            
            for (let a = 0; a < limit; a++) {
                for (let b = a + 1; b < limit; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = dx * dx + dy * dy;
                    
                    if (distance < 12000) {
                        const opacityValue = (1 - (distance / 12000)) * 0.7;
                        
                        let isMouseClose = false;
                        if (mouse.x !== null && mouse.y !== null) {
                            const dx_mouse_a = particles[a].x - mouse.x;
                            const dy_mouse_a = particles[a].y - mouse.y;
                            if (dx_mouse_a * dx_mouse_a + dy_mouse_a * dy_mouse_a < mouse.radius * mouse.radius) {
                                isMouseClose = true;
                            }
                        }

                        if (isMouseClose) {
                            ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.95})`;
                        } else {
                            ctx.strokeStyle = `rgba(${lineColor}, ${opacityValue})`;
                        }
                        
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            if (!canvas || !ctx) return;
            animationFrameId = requestAnimationFrame(animate);
            ctx.fillStyle = '#000000'; // Pure solid black background
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            connect();
        };
        
        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        };
        
        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(animationFrameId);
        };
    }, [particleColor, lineColor, mouseRadius, densityFactor, speedFactor]);

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full block"
            id="blitz-canvas"
        />
    );
};

export default BlitzParticleBg;
