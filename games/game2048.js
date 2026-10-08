// ╔══════════════════════════════════════════════════════════════════╗
// ║        CYBER 2048 — Neon Inset Panel, Swipes & Audio FX         ║
// ╚══════════════════════════════════════════════════════════════════╝

const Game2048 = {
    MIN_SWIPE: 30,

    init(container) {
        this.container  = container;
        this.score      = 0;
        this.best       = parseInt(localStorage.getItem('gh-2048-best')) || 0;
        this.won        = false;
        this.over       = false;
        this.board      = Array(16).fill(0);
        this.mergedIdxs = [];
        this._add();
        this._add();
        this._buildUI();
        this._bindKeys();
        this._bindSwipe();
    },

    _buildUI() {
        this.container.innerHTML = `
            <div class="ttt-container" style="max-width:440px;">
                <div class="g2048-header" style="display:flex;justify-content:space-between;align-items:center;width:100%;margin-bottom:16px;">
                    <div class="g2048-title" style="font-family:var(--font-heading);font-size:1.6rem;font-weight:900;letter-spacing:2px;color:white;">
                        CYBER <span style="color:var(--yellow);text-shadow:var(--glow-yellow);">2048</span>
                    </div>
                    <div class="g2048-scores" style="display:flex;gap:10px;">
                        <div class="g2048-score-box" style="padding:8px 16px;border-radius:12px;background:rgba(10,12,26,0.8);border:1px solid var(--glass-border);text-align:center;font-family:var(--font-mono);font-size:0.65rem;color:var(--text-dim);">
                            SCORE<br><span id="g2048-score" style="font-size:1.2rem;font-weight:900;color:var(--cyan);text-shadow:0 0 10px rgba(0,240,255,0.4);">0</span>
                        </div>
                        <div class="g2048-score-box" style="padding:8px 16px;border-radius:12px;background:rgba(10,12,26,0.8);border:1px solid var(--glass-border);text-align:center;font-family:var(--font-mono);font-size:0.65rem;color:var(--text-dim);">
                            BEST<br><span id="g2048-best" style="font-size:1.2rem;font-weight:900;color:var(--green);text-shadow:0 0 10px rgba(57,255,136,0.4);">${this.best}</span>
                        </div>
                    </div>
                </div>

                <div style="position:relative;width:100%;max-width:400px;">
                    <div class="grid-2048" id="g2048"></div>
                    <div id="g2048-overlay" style="display:none;position:absolute;inset:0;background:rgba(5,6,13,0.88);border-radius:18px;-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);flex-direction:column;align-items:center;justify-content:center;gap:14px;z-index:20;border:1px solid var(--glass-border);">
                        <div class="cyber-glitch-logo" data-text="SYSTEM//JAMMED" style="font-size:1.8rem;color:var(--red);text-shadow:0 0 18px var(--red);">SYSTEM//JAMMED</div>
                        <p style="font-family:var(--font-mono);font-size:0.85rem;color:var(--text-dim);">NO COGNITIVE MOVES REMAIN</p>
                        <button class="glass-btn primary cyber-btn-primary" onclick="Game2048.restart()" style="width:auto;padding:12px 28px;margin-top:6px;">REBOOT SYSTEM</button>
                    </div>
                </div>

                <p id="g2048-msg" class="game-status-msg" style="font-family:var(--font-mono);font-size:0.8rem;color:var(--text-dim);margin-top:10px;">
                    [SWIPE / ARROWS / WASD TO MERGE NEURAL TILES]
                </p>

                <div style="display:flex;gap:12px;margin-top:10px;">
                    <button class="glass-btn small" onclick="Game2048.restart()" style="width:auto;padding:10px 24px;font-family:var(--font-heading);letter-spacing:1px;">RESET MATRIX</button>
                </div>
            </div>`;
        this._render();
    },

    _render() {
        const g = document.getElementById('g2048');
        if (!g) return;
        g.innerHTML = this.board.map((v, i) => {
            const isPop = this.mergedIdxs.includes(i) ? 'pop' : '';
            return `<div class="tile-2048 ${isPop}" data-val="${v}">${v || ''}</div>`;
        }).join('');
        this.mergedIdxs = [];
    },

    _add() {
        const empty = this.board.map((v, i) => v === 0 ? i : null).filter(v => v !== null);
        if (empty.length) {
            const pick = empty[Math.floor(Math.random() * empty.length)];
            this.board[pick] = Math.random() < 0.9 ? 2 : 4;
            this.mergedIdxs.push(pick);
        }
    },

    _slide(dir) {
        let moved = false;
        let mergedScore = 0;
        this.mergedIdxs = [];

        for (let i = 0; i < 4; i++) {
            let line = [];
            for (let j = 0; j < 4; j++) {
                const idx = this._idx(dir, i, j);
                if (this.board[idx]) line.push({ val: this.board[idx], originalIdx: idx });
            }

            for (let j = 0; j < line.length - 1; j++) {
                if (line[j].val === line[j+1].val) {
                    const merged = line[j].val * 2;
                    line[j].val = merged;
                    line.splice(j + 1, 1);
                    mergedScore += merged;
                    this.score += merged;

                    if (merged === 2048 && !this.won) {
                        this.won = true;
                        if (window.SoundEngine) SoundEngine.playWin();
                        setTimeout(() => App.logWin('Cyber 2048'), 150);
                    }
                    moved = true;
                }
            }

            while (line.length < 4) line.push({ val: 0, originalIdx: -1 });

            line.forEach((item, j) => {
                const idx = this._idx(dir, i, j);
                if (this.board[idx] !== item.val) moved = true;
                this.board[idx] = item.val;
            });
        }

        if (moved) {
            if (mergedScore > 0 && window.SoundEngine) {
                SoundEngine.playPop(1 + Math.min(mergedScore / 64, 2));
            } else if (window.SoundEngine) {
                SoundEngine.playSlide();
            }
        }

        return moved;
    },

    _idx(dir, i, j) {
        if (dir === 0) return i * 4 + j;         // Left
        if (dir === 1) return i * 4 + (3 - j);   // Right
        if (dir === 2) return j * 4 + i;         // Up
        if (dir === 3) return (3 - j) * 4 + i;   // Down
    },

    _move(dir) {
        if (this.over) return;
        const moved = this._slide(dir);
        if (moved) {
            this._add();
            this._render();
            const sEl = document.getElementById('g2048-score');
            if (sEl) sEl.textContent = this.score;
            if (this.score > this.best) {
                this.best = this.score;
                localStorage.setItem('gh-2048-best', this.best);
                const bEl = document.getElementById('g2048-best');
                if (bEl) bEl.textContent = this.best;
            }
            if (this._isGameOver()) {
                this.over = true;
                const overlay = document.getElementById('g2048-overlay');
                if (overlay) overlay.style.display = 'flex';
                if (window.SoundEngine) SoundEngine.playBuzz();
            }
        }
    },

    _isGameOver() {
        if (this.board.includes(0)) return false;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const v = this.board[i * 4 + j];
                if (j < 3 && v === this.board[i * 4 + j + 1]) return false;
                if (i < 3 && v === this.board[(i+1) * 4 + j]) return false;
            }
        }
        return true;
    },

    _bindKeys() {
        this.destroy();
        this._handler = e => {
            const map = {
                ArrowLeft: 0, a: 0, A: 0,
                ArrowRight: 1, d: 1, D: 1,
                ArrowUp: 2, w: 2, W: 2,
                ArrowDown: 3, s: 3, S: 3
            };
            if (e.key in map) {
                e.preventDefault();
                this._move(map[e.key]);
            }
        };
        window.addEventListener('keydown', this._handler);
    },

    _bindSwipe() {
        const el = this.container;
        let startX, startY;
        this._touchStart = e => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        };
        this._touchEnd = e => {
            const dx = e.changedTouches[0].clientX - startX;
            const dy = e.changedTouches[0].clientY - startY;
            if (Math.abs(dx) < this.MIN_SWIPE && Math.abs(dy) < this.MIN_SWIPE) return;
            if (Math.abs(dx) > Math.abs(dy)) {
                this._move(dx > 0 ? 1 : 0);
            } else {
                this._move(dy > 0 ? 3 : 2);
            }
        };
        el.addEventListener('touchstart', this._touchStart, { passive: true });
        el.addEventListener('touchend', this._touchEnd, { passive: true });
    },

    restart() {
        if (window.SoundEngine) SoundEngine.playTap();
        this.destroy();
        this.init(this.container);
    },

    destroy() {
        if (this._handler) {
            window.removeEventListener('keydown', this._handler);
            this._handler = null;
        }
        if (this._touchStart && this.container) {
            this.container.removeEventListener('touchstart', this._touchStart);
            this.container.removeEventListener('touchend', this._touchEnd);
            this._touchStart = null;
            this._touchEnd = null;
        }
    }
};
