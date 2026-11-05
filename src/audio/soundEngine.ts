/**
 * Web Audio API Engine for "The Gate — From Darkness to Light"
 * Provides 100% royalty-free, zero-dependency, synchronized audio:
 * - Dark World: Ominous sub-bass drone, eerie mist resonance, planchette wood gliding sounds
 * - Heavenly World: Multivoice choral opera, soprano formant harmonics, orchestral string swell,
 *   celestial chimes/bells, dramatic crescendo for Jesus reveal, and meditative peaceful backdrop.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.8;

  // Dark world nodes
  private darkGain: GainNode | null = null;
  private darkOsc1: OscillatorNode | null = null;
  private darkOsc2: OscillatorNode | null = null;
  private darkFilter: BiquadFilterNode | null = null;

  // Heavenly world nodes
  private heavenGain: GainNode | null = null;
  private choirNodes: { osc: OscillatorNode; gain: GainNode; filter: BiquadFilterNode }[] = [];
  private sopranoNodes: { osc: OscillatorNode; gain: GainNode; filter: BiquadFilterNode }[] = [];
  private bellOscs: OscillatorNode[] = [];
  private chimeTimer: any = null;

  constructor() {
    // AudioContext will be initialized on user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const target = this.isMuted ? 0 : this.volume;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // --- DARK WORLD AUDIO ---
  public startDarkAmbience() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.stopHeavenAmbience(0.4);

    const now = this.ctx.currentTime;
    this.darkGain = this.ctx.createGain();
    this.darkGain.gain.setValueAtTime(0.001, now);
    this.darkGain.gain.linearRampToValueAtTime(0.35, now + 1.5);
    this.darkGain.connect(this.masterGain);

    // Deep sub-drone
    this.darkOsc1 = this.ctx.createOscillator();
    this.darkOsc1.type = 'sawtooth';
    this.darkOsc1.frequency.setValueAtTime(55, now); // A1 note

    this.darkOsc2 = this.ctx.createOscillator();
    this.darkOsc2.type = 'sine';
    this.darkOsc2.frequency.setValueAtTime(82.4, now); // E2 note

    this.darkFilter = this.ctx.createBiquadFilter();
    this.darkFilter.type = 'lowpass';
    this.darkFilter.frequency.setValueAtTime(120, now);
    this.darkFilter.Q.setValueAtTime(3, now);

    this.darkOsc1.connect(this.darkFilter);
    this.darkOsc2.connect(this.darkFilter);
    this.darkFilter.connect(this.darkGain);

    this.darkOsc1.start();
    this.darkOsc2.start();
  }

  public playPlanchetteGlide() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    // Wood friction / whisper noise burst
    const bufferSize = this.ctx.sampleRate * 0.25;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.12));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(380, now);
    filter.Q.setValueAtTime(2, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
  }

  public playLetterHover() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    // Mystic high resonant ping
    osc.frequency.setValueAtTime(660, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.3);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(now + 0.3);
  }

  public stopDarkAmbience(fadeDuration = 0.5) {
    if (!this.ctx || !this.darkGain) return;
    const now = this.ctx.currentTime;
    this.darkGain.gain.setValueAtTime(this.darkGain.gain.value, now);
    this.darkGain.gain.linearRampToValueAtTime(0.001, now + fadeDuration);

    setTimeout(() => {
      try {
        this.darkOsc1?.stop();
        this.darkOsc2?.stop();
        this.darkOsc1?.disconnect();
        this.darkOsc2?.disconnect();
        this.darkGain?.disconnect();
      } catch {}
      this.darkOsc1 = null;
      this.darkOsc2 = null;
      this.darkGain = null;
    }, fadeDuration * 1000 + 50);
  }

  // --- HEAVENLY WORLD OPERA ---

  /**
   * Phase 1: Begins exactly when flash triggers and first angels appear.
   * Sacred choral choir chords ("Ahhh" vocal formants) fade in.
   */
  public startHeavenlyOpera() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    // Silence dark world immediately
    this.stopDarkAmbience(0.1);
    this.stopHeavenAmbience(0.1);

    const now = this.ctx.currentTime;
    this.heavenGain = this.ctx.createGain();
    this.heavenGain.gain.setValueAtTime(0.001, now);
    // Smooth, majestic fade in
    this.heavenGain.gain.linearRampToValueAtTime(0.48, now + 2.0);
    this.heavenGain.connect(this.masterGain);

    // Choral harmony in F Major / D minor celestial voicing: F3 (174.6Hz), A3 (220Hz), C4 (261.6Hz), E4 (329.6Hz)
    const choirFreqs = [174.61, 220.0, 261.63, 329.63, 440.0];

    this.choirNodes = choirFreqs.map((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Vocal formant filter (simulating open "Ah" vowel chamber)
      const filter = this.ctx!.createBiquadFilter();
      filter.type = 'bandpass';
      // Center near classical choral vowel formants (~850Hz)
      filter.frequency.setValueAtTime(750 + idx * 80, now);
      filter.Q.setValueAtTime(3.5, now);

      const gain = this.ctx!.createGain();
      gain.gain.setValueAtTime(0.14, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.heavenGain!);

      osc.start();
      return { osc, gain, filter };
    });

    // Start subtle celestial bell chimes
    this.startChimes();
  }

  /**
   * Phase 2: As Jesus appears in the center, choral and orchestra swell.
   * Soprano high voices enter and crescendo to peak glory!
   */
  public crescendoForJesus() {
    if (!this.ctx || !this.heavenGain) return;
    const now = this.ctx.currentTime;

    // Swell main heavenly gain
    this.heavenGain.gain.setValueAtTime(this.heavenGain.gain.value, now);
    this.heavenGain.gain.linearRampToValueAtTime(0.9, now + 3.0);

    // High Soprano solo voices entering (A5 = 880Hz, C6 = 1046.5Hz, E6 = 1318.5Hz)
    const sopranoFreqs = [523.25, 659.25, 880.0, 1046.5];

    this.sopranoNodes = sopranoFreqs.map((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Formant filter for soprano resonance ("Oooo/Ahhh" soprano ring)
      const filter = this.ctx!.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq * 1.2, now);
      filter.Q.setValueAtTime(4.0, now);

      const gain = this.ctx!.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.15 + idx * 0.04, now + 2.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.heavenGain!);

      osc.start();
      return { osc, gain, filter };
    });

    // Dramatic cathedral chime chord at the peak
    this.playCathedralBell(now + 2.8);
  }

  /**
   * Phase 3: After Jesus is fully revealed, music softens smoothly to peaceful,
   * warm background choir while user reads the reflective answer.
   */
  public settleToPeacefulAmbience() {
    if (!this.ctx || !this.heavenGain) return;
    const now = this.ctx.currentTime;

    this.heavenGain.gain.setValueAtTime(this.heavenGain.gain.value, now);
    this.heavenGain.gain.linearRampToValueAtTime(0.32, now + 3.5);

    // Gently soften soprano intensity
    this.sopranoNodes.forEach(({ gain }) => {
      try {
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.linearRampToValueAtTime(0.03, now + 3.0);
      } catch {}
    });
  }

  private playCathedralBell(time: number) {
    if (!this.ctx || !this.heavenGain) return;
    const freqs = [523.25, 659.25, 783.99, 1046.5]; // C Major triad chime

    freqs.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      const gain = this.ctx!.createGain();
      gain.gain.setValueAtTime(0.15, time);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 4.0);

      osc.connect(gain);
      gain.connect(this.heavenGain!);

      osc.start(time);
      osc.stop(time + 4.0);
    });
  }

  private startChimes() {
    this.stopChimes();
    const chimePitches = [880, 987.77, 1174.66, 1318.51, 1567.98];

    const triggerRandomChime = () => {
      if (!this.ctx || !this.heavenGain) return;
      const now = this.ctx.currentTime;
      const pitch = chimePitches[Math.floor(Math.random() * chimePitches.length)];

      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(gain);
      gain.connect(this.heavenGain);

      osc.start(now);
      osc.stop(now + 1.8);
    };

    this.chimeTimer = setInterval(triggerRandomChime, 2200);
  }

  private stopChimes() {
    if (this.chimeTimer) {
      clearInterval(this.chimeTimer);
      this.chimeTimer = null;
    }
  }

  public stopHeavenAmbience(fadeDuration = 1.0) {
    this.stopChimes();
    if (!this.ctx || !this.heavenGain) return;

    const now = this.ctx.currentTime;
    this.heavenGain.gain.setValueAtTime(this.heavenGain.gain.value, now);
    this.heavenGain.gain.linearRampToValueAtTime(0.0001, now + fadeDuration);

    setTimeout(() => {
      this.choirNodes.forEach(({ osc, gain, filter }) => {
        try {
          osc.stop();
          osc.disconnect();
          gain.disconnect();
          filter.disconnect();
        } catch {}
      });
      this.sopranoNodes.forEach(({ osc, gain, filter }) => {
        try {
          osc.stop();
          osc.disconnect();
          gain.disconnect();
          filter.disconnect();
        } catch {}
      });
      this.choirNodes = [];
      this.sopranoNodes = [];
      try {
        this.heavenGain?.disconnect();
      } catch {}
      this.heavenGain = null;
    }, fadeDuration * 1000 + 100);
  }

  public stopAll(fadeDuration = 0.5) {
    this.stopDarkAmbience(fadeDuration);
    this.stopHeavenAmbience(fadeDuration);
  }
}

export const soundEngine = new SoundEngine();
