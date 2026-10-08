/**
 * GAMER'S HUB — AUDIO & HAPTICS ENGINE
 * Synthesized Web Audio API sound effects + mobile haptics with zero external assets.
 */

const SoundEngine = {
    ctx: null,
    muted: localStorage.getItem('gh-sound-muted') === 'true',

    _init() {
        if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },

    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem('gh-sound-muted', this.muted);
        if (!this.muted) {
            this._init();
            this.playTap();
        }
        return this.muted;
    },

    isMuted() {
        return this.muted;
    },

    _vibrate(ms) {
        if (!this.muted && navigator.vibrate) {
            try { navigator.vibrate(ms); } catch(e) {}
        }
    },

    // UI Tap / Card Hover
    playTap() {
        if (this.muted) return;
        this._init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.06);
        this._vibrate(10);
    },

    // Card Flip / Tile Slide
    playSlide() {
        if (this.muted) return;
        this._init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(500, this.ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.09);
        this._vibrate(12);
    },

    // Match / Merge Pop
    playPop(pitch = 1) {
        if (this.muted) return;
        this._init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440 * pitch, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880 * pitch, this.ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.14);
        this._vibrate(18);
    },

    // Invalid Move / Buzz
    playBuzz() {
        if (this.muted) return;
        this._init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(100, this.ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.2);
        this._vibrate([30, 40, 30]);
    },

    // Dice Roll Tumble
    playRoll() {
        if (this.muted) return;
        this._init();
        if (!this.ctx) return;
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                if (this.muted || !this.ctx) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(220 + Math.random() * 200, this.ctx.currentTime);
                gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.05);
            }, i * 60);
        }
        this._vibrate(25);
    },

    // Victory Fanfare
    playWin() {
        if (this.muted) return;
        this._init();
        if (!this.ctx) return;
        const notes = [440, 554, 659, 880];
        notes.forEach((freq, i) => {
            setTimeout(() => {
                if (this.muted || !this.ctx) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
                gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.35);
            }, i * 110);
        });
        this._vibrate([50, 50, 100]);
    }
};

window.SoundEngine = SoundEngine;
