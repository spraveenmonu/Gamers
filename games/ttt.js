// ╔══════════════════════════════════════════════════════════════════╗
// ║        TACTICAL TOE — Minimax AI, SVG Draws & Motion FX         ║
// ╚══════════════════════════════════════════════════════════════════╝

const TicTacToe = {
    init(container, options = {}) {
        this.mode    = options.mode || 'ai';
        this.p2Name  = options.p2Name || 'Player 2';
        this.p1Name  = App.user.name || 'Player 1';
        this.scores  = { p1: 0, p2: 0, draw: 0 };
        this._build(container);
    },

    _build(container) {
        this.container = container;
        const opp = this.mode === 'ai' ? '🤖 Computer' : this.p2Name;
        container.innerHTML = `
            <div class="ttt-container" style="max-width:440px;">
                <div class="ttt-scoreboard">
                    <div class="ttt-score-box x-side">
                        <div class="ttt-score-name">${this.p1Name}</div>
                        <div class="ttt-score-num" id="s-p1">0</div>
                    </div>
                    <div class="ttt-score-box draw-side">
                        <div class="ttt-score-name">DRAW</div>
                        <div class="ttt-score-num" id="s-draw">0</div>
                    </div>
                    <div class="ttt-score-box o-side">
                        <div class="ttt-score-name">${opp}</div>
                        <div class="ttt-score-num" id="s-p2">0</div>
                    </div>
                </div>

                <div class="ttt-info-bar">
                    <div class="player-stat active" id="p1-stat">${this.p1Name} (X)</div>
                    <div class="vs">VS</div>
                    <div class="player-stat" id="p2-stat">${opp} (O)</div>
                </div>

                <div class="ttt-board-wrapper">
                    <div class="ttt-board" id="ttt-board">
                        ${Array(9).fill().map((_, i) => `
                            <div class="ttt-cell" data-idx="${i}" tabindex="0" role="button" aria-label="Square ${i+1}"></div>
                        `).join('')}
                    </div>
                    <div id="ttt-win-overlay"></div>
                </div>

                <p id="ttt-status" class="game-status-msg">Your turn, ${this.p1Name}!</p>
                <div style="display:flex;gap:12px;margin-top:6px;">
                    <button class="glass-btn small" onclick="TicTacToe.newRound()" style="padding:10px 24px;">NEW ROUND</button>
                </div>
            </div>`;

        this._resetBoard();
        this._bindCells();
        this._bindKeyboard();
    },

    _resetBoard() {
        this.board     = Array(9).fill(null);
        this.active    = true;
        this.isPlayerX = true;

        const boardEl = document.getElementById('ttt-board');
        if (boardEl) boardEl.classList.remove('shake-subtle');

        const overlay = document.getElementById('ttt-win-overlay');
        if (overlay) overlay.innerHTML = '';

        document.querySelectorAll('.ttt-cell').forEach(c => {
            c.innerHTML   = '';
            c.className   = 'ttt-cell';
        });

        this._updateStatus(`Your turn, ${this.p1Name}!`);
        this._updateTurnUI();
    },

    _bindCells() {
        document.querySelectorAll('.ttt-cell').forEach(c => {
            c.addEventListener('click', () => this.humanMove(parseInt(c.dataset.idx)));
            c.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.humanMove(parseInt(c.dataset.idx));
                }
            });
        });
    },

    _bindKeyboard() {
        this._keyHandler = (e) => {
            if (!this.active) return;
            const keyNum = parseInt(e.key);
            if (!isNaN(keyNum) && keyNum >= 1 && keyNum <= 9) {
                // Key 1-9 mapped directly to cell index 0-8
                this.humanMove(keyNum - 1);
            }
        };
        window.addEventListener('keydown', this._keyHandler);
    },

    newRound() {
        if (window.SoundEngine) SoundEngine.playTap();
        this._resetBoard();
    },

    humanMove(idx) {
        if (!this.active || this.board[idx]) return;

        // In AI mode, disallow human clicks during AI turn
        if (this.mode === 'ai' && !this.isPlayerX) return;

        const symbol = this.isPlayerX ? 'X' : 'O';
        this._place(idx, symbol);
        if (window.SoundEngine) SoundEngine.playSlide();

        const win = this._checkWin(this.board, symbol);
        if (win)            return this._endGame(symbol, win);
        if (this._isFull()) return this._endGame(null, null);

        this.isPlayerX = !this.isPlayerX;
        this._updateTurnUI();

        if (this.mode === 'ai') {
            this._triggerAiTurn();
        }
    },

    _triggerAiTurn() {
        const statusEl = document.getElementById('ttt-status');
        if (statusEl) {
            statusEl.textContent = '🤖 AI is calculating optimal response...';
            statusEl.classList.add('pulse-thinking');
        }

        setTimeout(() => {
            if (!this.active) return;
            if (statusEl) statusEl.classList.remove('pulse-thinking');

            const move = this._minimax(this.board, true).index;
            this._place(move, 'O');
            if (window.SoundEngine) SoundEngine.playPop(1.1);

            const win = this._checkWin(this.board, 'O');
            if (win)            return this._endGame('O', win);
            if (this._isFull()) return this._endGame(null, null);

            this.isPlayerX = true;
            this._updateTurnUI();
        }, 400);
    },

    _place(idx, symbol) {
        this.board[idx] = symbol;
        const cell = document.querySelector(`.ttt-cell[data-idx="${idx}"]`);
        if (!cell) return;

        cell.classList.add(symbol.toLowerCase());

        if (symbol === 'X') {
            cell.innerHTML = `
                <svg class="ttt-svg-icon" viewBox="0 0 80 80">
                    <path class="ttt-draw-path" d="M 18 18 L 62 62" stroke="var(--x-color)" stroke-width="9" stroke-linecap="round" fill="none"/>
                    <path class="ttt-draw-path-2" d="M 62 18 L 18 62" stroke="var(--x-color)" stroke-width="9" stroke-linecap="round" fill="none"/>
                </svg>`;
        } else {
            cell.innerHTML = `
                <svg class="ttt-svg-icon" viewBox="0 0 80 80">
                    <circle class="ttt-draw-circle" cx="40" cy="40" r="24" stroke="var(--o-color)" stroke-width="9" stroke-linecap="round" fill="none"/>
                </svg>`;
        }
    },

    _checkWin(board, p) {
        const lines = [
            [0,1,2], [3,4,5], [6,7,8], // rows
            [0,3,6], [1,4,7], [2,5,8], // columns
            [0,4,8], [2,4,6]          // diagonals
        ];
        for (const l of lines) {
            if (l.every(i => board[i] === p)) return l;
        }
        return null;
    },

    _isFull() {
        return this.board.every(c => c !== null);
    },

    _minimax(board, isMaximizing, depth = 0) {
        const aiWin  = this._checkWin(board, 'O');
        const humWin = this._checkWin(board, 'X');
        if (aiWin)  return { score:  10 - depth };
        if (humWin) return { score: -10 + depth };

        const empty = board.map((v, i) => v === null ? i : null).filter(v => v !== null);
        if (!empty.length) return { score: 0 };

        let best = isMaximizing ? { score: -Infinity } : { score: Infinity };
        for (const i of empty) {
            board[i] = isMaximizing ? 'O' : 'X';
            const result = this._minimax(board, !isMaximizing, depth + 1);
            board[i] = null;
            result.index = i;
            if (isMaximizing) {
                if (result.score > best.score) best = result;
            } else {
                if (result.score < best.score) best = result;
            }
        }
        return best;
    },

    _drawWinLine(winLine) {
        const overlay = document.getElementById('ttt-win-overlay');
        if (!overlay) return;

        // Line map for 300x300 overlay coordinates
        const lineCoords = {
            '0,1,2': { x1: 20,  y1: 50,  x2: 280, y2: 50  },
            '3,4,5': { x1: 20,  y1: 150, x2: 280, y2: 150 },
            '6,7,8': { x1: 20,  y1: 250, x2: 280, y2: 250 },
            '0,3,6': { x1: 50,  y1: 20,  x2: 50,  y2: 280 },
            '1,4,7': { x1: 150, y1: 20,  x2: 150, y2: 280 },
            '2,5,8': { x1: 250, y1: 20,  x2: 250, y2: 280 },
            '0,4,8': { x1: 25,  y1: 25,  x2: 275, y2: 275 },
            '2,4,6': { x1: 275, y1: 25,  x2: 25,  y2: 275 }
        };

        const key = winLine.join(',');
        const coords = lineCoords[key] || { x1: 20, y1: 50, x2: 280, y2: 50 };

        overlay.innerHTML = `
            <svg class="ttt-win-line-overlay" viewBox="0 0 300 300">
                <line class="ttt-win-line-path"
                    x1="${coords.x1}" y1="${coords.y1}"
                    x2="${coords.x2}" y2="${coords.y2}" />
            </svg>`;
    },

    _endGame(symbol, winLine) {
        this.active = false;
        const statusEl = document.getElementById('ttt-status');
        if (statusEl) statusEl.classList.remove('pulse-thinking');

        if (winLine) {
            this._drawWinLine(winLine);
            winLine.forEach(i => {
                const cell = document.querySelector(`.ttt-cell[data-idx="${i}"]`);
                if (cell) cell.classList.add('winner');
            });
        }

        if (!symbol) {
            this.scores.draw++;
            document.getElementById('s-draw').textContent = this.scores.draw;
            this._updateStatus("It's a Draw! 🤝 (Optimal Minimax Play)");
            if (window.SoundEngine) SoundEngine.playBuzz();

            // Subtle shake on draw
            const boardEl = document.getElementById('ttt-board');
            if (boardEl) boardEl.classList.add('shake-subtle');
        } else if (symbol === 'X') {
            this.scores.p1++;
            document.getElementById('s-p1').textContent = this.scores.p1;
            this._updateStatus(`${this.p1Name} Wins! 🎉`);
            App.logWin('Tactical Toe');
        } else {
            this.scores.p2++;
            document.getElementById('s-p2').textContent = this.scores.p2;
            const name = this.mode === 'ai' ? 'Computer' : this.p2Name;
            this._updateStatus(`${name} Wins!`);
            if (this.mode === 'p2') App.logWin('Tactical Toe');
            else if (window.SoundEngine) SoundEngine.playBuzz();
        }
    },

    _updateStatus(msg) {
        const el = document.getElementById('ttt-status');
        if (el) el.textContent = msg;
    },

    _updateTurnUI() {
        const p1 = document.getElementById('p1-stat');
        const p2 = document.getElementById('p2-stat');
        const opp = this.mode === 'ai' ? 'Computer' : this.p2Name;
        if (p1) p1.classList.toggle('active', this.isPlayerX);
        if (p2) p2.classList.toggle('active', !this.isPlayerX);
        if (this.active) {
            this._updateStatus(`Turn: ${this.isPlayerX ? this.p1Name : opp}`);
        }
    },

    restart() {
        if (window.SoundEngine) SoundEngine.playTap();
        this._resetBoard();
    },

    destroy() {
        if (this._keyHandler) {
            window.removeEventListener('keydown', this._keyHandler);
        }
    }
};
