// Lightweight FPS & Device Performance Monitor
class FPSMonitor {
  constructor() {
    this.fps = 60;
    this.frames = 0;
    this.prevTime = performance.now();
    this.listeners = new Set();
    this.lowPowerMode = false;
    this.running = false;
    this.rafId = null;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.prevTime = performance.now();
    this.tick = this.tick.bind(this);
    this.rafId = requestAnimationFrame(this.tick);
  }

  stop() {
    this.running = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    if (!this.running) this.start();
    return () => {
      this.listeners.delete(listener);
      if (this.listeners.size === 0) this.stop();
    };
  }

  tick() {
    if (!this.running) return;
    this.frames++;
    const time = performance.now();
    if (time >= this.prevTime + 1000) {
      this.fps = Math.round((this.frames * 1000) / (time - this.prevTime));
      this.frames = 0;
      this.prevTime = time;

      const newLowPower = this.fps < 45;
      if (newLowPower !== this.lowPowerMode) {
        this.lowPowerMode = newLowPower;
        this.listeners.forEach((fn) => fn(this.fps, this.lowPowerMode));
      }
    }
    this.rafId = requestAnimationFrame(this.tick);
  }
}

export const fpsMonitor = new FPSMonitor();
