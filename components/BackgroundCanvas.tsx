import React, { useEffect, useRef } from 'react';

const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let animationFrameId: number;

    const config = { 
      starCount: width < 768 ? 50 : 120, 
      connectionDistance: 100, 
      meteorChance: 0.003 
    };

    class Star {
      x: number = 0;
      y: number = 0;
      z: number = 0;
      size: number = 0;
      opacity: number = 0;
      vx: number = 0;
      vy: number = 0;

      constructor() { this.reset(true); }
      
      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * width;
        this.size = (1 - this.z / width) * 1.2 + 0.3;
        this.opacity = (1 - this.z / width) * 0.7 + 0.1;
        this.vx = (Math.random() - 0.5) * 0.05;
        this.vy = (Math.random() - 0.5) * 0.05;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Meteor {
      x: number = 0;
      y: number = 0;
      length: number = 0;
      speed: number = 0;
      angle: number = 0;
      active: boolean = true;
      opacity: number = 1;

      constructor() { this.reset(); }
      
      reset() {
        // Random start position outside visible area
        const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
        
        if (side === 0) { // Top
            this.x = Math.random() * width;
            this.y = -50;
        } else if (side === 1) { // Right
            this.x = width + 50;
            this.y = Math.random() * height;
        } else if (side === 2) { // Bottom
            this.x = Math.random() * width;
            this.y = height + 50;
        } else { // Left
            this.x = -50;
            this.y = Math.random() * height;
        }

        // Random target inside visible area to ensure it crosses screen
        const targetX = Math.random() * width;
        const targetY = Math.random() * height;
        
        this.angle = Math.atan2(targetY - this.y, targetX - this.x);
        
        this.length = Math.random() * 80 + 20;
        this.speed = Math.random() * 10 + 5;
        this.active = true;
        this.opacity = 1;
      }
      
      update() {
        if (!this.active) return;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity -= 0.01;
        // Extended bounds check
        if (this.y > height + 200 || this.y < -200 || this.x > width + 200 || this.x < -200 || this.opacity <= 0) this.active = false;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        if (!this.active) return;
        const tailX = this.x - Math.cos(this.angle) * this.length;
        const tailY = this.y - Math.sin(this.angle) * this.length;
        const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(0, 242, 255, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(0, 242, 255, 0)`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }
    }

    const initStars = () => {
      stars = [];
      for (let i = 0; i < config.starCount; i++) stars.push(new Star());
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      
      stars.forEach(star => {
        star.update();
        star.draw(ctx);
      });

      // Connections
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < config.connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      // Meteors
      if (Math.random() < config.meteorChance) meteors.push(new Meteor());
      meteors.forEach((m, i) => {
        m.update();
        m.draw(ctx);
        if (!m.active) meteors.splice(i, 1);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
      config.starCount = width < 768 ? 50 : 120;
      initStars();
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default BackgroundCanvas;