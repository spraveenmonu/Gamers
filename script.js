/**
 * GAMER'S HUB — PREMIUM EDITION
 * Main App Controller
 */

const App = {
    user: {
        name: localStorage.getItem('gh-user-name') || 'Guest',
        totalWins: parseInt(localStorage.getItem('gh-total-wins')) || 0
    },

    currentGameId: null,
    currentGameModule: null,

    // Simple HTML escape to prevent XSS from user input
    _esc(str) {
        const d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    },

    GAMES_DATA: [
        { id: 'tic-tac-toe',   title: 'Tactical Toe',  desc: '3×3 duel against unbeatable minimax AI.', icon: '✕○',  bg: 'ttt-bg',    accent: 'var(--cyan)',    status: 'ONLINE', hasSetup: true },
        { id: 'candy-crush',   title: 'Cyber Crush',   desc: 'Match 3 neon gems to score big.',           icon: '💎',  bg: 'candy-bg',  accent: 'var(--magenta)', status: 'ONLINE', hasSetup: false },
        { id: 'memory',        title: 'Memory Pulse',  desc: 'Flip & match cards against the clock.',     icon: '🧠',  bg: 'memory-bg', accent: 'var(--cyan)',    status: 'ONLINE', hasSetup: true },
        { id: '2048',          title: 'Cyber 2048',    desc: 'Slide & merge tiles to reach 2048.',        icon: '⊞',   bg: 'g2048-bg',  accent: 'var(--yellow)',  status: 'ONLINE', hasSetup: false },
        { id: 'snakes-ladders',title: 'Snake Quest',   desc: 'Race to 100. Ladders up, snakes down!',     icon: '🐍',  bg: 'snakes-bg', accent: 'var(--green)',   status: 'ONLINE', hasSetup: true },
        { id: 'ludo',          title: 'Ludo Legends',  desc: 'Classic board game with token strategy.',  icon: '🎲',  bg: 'ludo-bg',   accent: 'var(--yellow)',  status: 'ONLINE', hasSetup: true },
        { id: 'sudoku',        title: 'Sudoku Nexus',  desc: 'Solve the 9×9 logic number grid.',         icon: '⑨',   bg: 'sudoku-bg', accent: 'var(--purple)',  status: 'ONLINE', hasSetup: true },
        { id: 'queens',        title: 'Royal Queens',  desc: 'Place 8 queens — no conflicts allowed.',   icon: '👑',  bg: 'queens-bg', accent: '#ffd700',       status: 'ONLINE', hasSetup: false },
        { id: 'puzzle',        title: 'Slide Master',  desc: 'Arrange tiles with minimum moves.',         icon: '⧉',   bg: 'puzzle-bg', accent: 'var(--cyan)',    status: 'ONLINE', hasSetup: false },
        { id: 'crossclimb',    title: 'Word Climb',    desc: 'Change one letter at a time to the goal.', icon: 'Aa',  bg: 'cross-bg',  accent: 'var(--cyan)',    status: 'ONLINE', hasSetup: false },
        { id: 'tango',         title: 'Logic Tango',   desc: 'Fill the binary grid by the rules.',       icon: '01',  bg: 'tango-bg',  accent: 'var(--purple)',  status: 'ONLINE', hasSetup: false },
        { id: 'zip',           title: 'Speed Zip',     desc: 'Tap the target before time runs out!',     icon: '⚡',  bg: 'zip-bg',    accent: 'var(--red)',     status: 'ONLINE', hasSetup: false },
        { id: 'math-sprint',   title: 'Math Sprint',   desc: 'Rapid-fire arithmetic challenge.',         icon: '∑',   bg: 'tango-bg',  accent: 'var(--green)',   status: 'ONLINE', hasSetup: false },
        { id: 'color-fill',    title: 'Color Fill',    desc: 'Flood-fill grid from origin in max moves.', icon: '🎨',  bg: 'memory-bg', accent: 'var(--purple)',  status: 'ONLINE', hasSetup: false },
        { id: 'connections',   title: 'Connections',   desc: 'Group 4 words that share a category.',    icon: '🔗',  bg: 'cross-bg',  accent: 'var(--magenta)', status: 'ONLINE', hasSetup: false }
    ],

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.checkAuth();
        this.renderGames();
        this.updateUI();
        this.initCyberEffects();
    },

    initCyberEffects() {
        // Desktop cursor glow tracker
        const glow = document.getElementById('cursor-glow');
        if (glow && window.matchMedia('(pointer: fine)').matches) {
            glow.style.opacity = '1';
            window.addEventListener('mousemove', e => {
                glow.style.left = e.clientX + 'px';
                glow.style.top = e.clientY + 'px';
            });
        }
        // Subtitle scramble effect
        const sub = document.getElementById('lobby-sub');
        if (sub) {
            const original = 'SYS_VER 4.2.0 // NEURAL CONSOLE';
            const chars = '01#$%/&<>[]*!=+';
            let iter = 0;
            const timer = setInterval(() => {
                sub.textContent = original.split('').map((c, i) => {
                    if (i < iter) return original[i];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('');
                if (iter >= original.length) clearInterval(timer);
                iter += 1;
            }, 30);
        }
    },

    cacheDOM() {
        this.el = {
            profileGate:      document.getElementById('profile-gate'),
            mainDashboard:    document.getElementById('main-dashboard'),
            gameSetupScreen:  document.getElementById('game-setup-screen'),
            gameViewport:     document.getElementById('game-viewport'),
            gameContent:      document.getElementById('game-content-container'),
            gameTitleBar:     document.getElementById('game-title-bar'),
            userNameInput:    document.getElementById('user-name-input'),
            enterHubBtn:      document.getElementById('enter-hub-btn'),
            totalWinsEl:      document.getElementById('total-wins'),
            backToHub:        document.getElementById('back-to-hub'),
            backToDashboard:  document.getElementById('back-to-dashboard'),
            startGameBtn:     document.getElementById('start-game-btn'),
            setupOptions:     document.getElementById('setup-options'),
            gameContainer:    document.getElementById('game-container'),
            gameSearch:       document.getElementById('game-search'),
            leaderboardList:  document.getElementById('leaderboard-list'),
            clearRankings:    document.getElementById('clear-rankings-btn'),
            winModal:         document.getElementById('win-modal'),
            winTitle:         document.getElementById('win-title'),
            winMessage:       document.getElementById('win-message'),
            closeWinModal:    document.getElementById('close-win-modal'),
            playAgainBtn:     document.getElementById('play-again-modal-btn'),
            restartBtn:       document.getElementById('restart-game-btn'),
            headerUser:       document.getElementById('header-user'),
            openCoachBtn:     document.getElementById('open-coach-btn'),
            gameCoachBtn:     document.getElementById('game-coach-btn'),
            coachModal:       document.getElementById('coach-modal'),
            closeCoachModal:  document.getElementById('close-coach-modal'),
            coachTabGuide:    document.getElementById('coach-tab-guide'),
            coachTabCheatsheet: document.getElementById('coach-tab-cheatsheet'),
            tabBtnGuide:      document.getElementById('tab-btn-guide'),
            tabBtnCheatsheet: document.getElementById('tab-btn-cheatsheet'),
            coachGamePills:   document.getElementById('coach-game-pills'),
            coachGuideBody:   document.getElementById('coach-guide-body'),
            cheatsheetGrid:   document.getElementById('cheatsheet-grid'),
            soundToggleBtn:   document.getElementById('sound-toggle-btn')
        };
    },

    bindEvents() {
        this.el.enterHubBtn.onclick   = () => { if (window.SoundEngine) SoundEngine.playTap(); this.handleAuth(); };
        this.el.userNameInput.onkeydown = e => { if (e.key === 'Enter') { if (window.SoundEngine) SoundEngine.playTap(); this.handleAuth(); } };
        if (this.el.userNameInput) {
            this.el.userNameInput.addEventListener('input', () => {
                const badge = document.getElementById('input-tag-badge');
                if (badge) {
                    badge.textContent = this.el.userNameInput.value.trim().length > 0 ? '⚡' : '🎮';
                }
            });
        }
        this.el.backToDashboard.onclick = () => { if (window.SoundEngine) SoundEngine.playTap(); this.showDashboard(); };
        this.el.backToHub.onclick     = () => { if (window.SoundEngine) SoundEngine.playTap(); this.closeGameViewport(); };
        this.el.gameSearch.oninput    = e => this.renderGames(e.target.value);
        this.el.clearRankings.onclick = () => { if (window.SoundEngine) SoundEngine.playBuzz(); this.clearAllData(); };
        if (this.el.openCoachBtn) this.el.openCoachBtn.onclick = () => { if (window.SoundEngine) SoundEngine.playTap(); this.openCoachModal(); };
        if (this.el.gameCoachBtn) this.el.gameCoachBtn.onclick = () => { if (window.SoundEngine) SoundEngine.playTap(); this.openCoachModal(this.currentGameId); };
        if (this.el.closeCoachModal) this.el.closeCoachModal.onclick = () => { if (window.SoundEngine) SoundEngine.playTap(); this.closeCoachModal(); };
        
        if (this.el.soundToggleBtn && window.SoundEngine) {
            this.el.soundToggleBtn.onclick = () => {
                const muted = SoundEngine.toggleMute();
                this.el.soundToggleBtn.textContent = muted ? '🔇 MUTED' : '🔊 SOUND';
                this.el.soundToggleBtn.classList.toggle('sound-on', !muted);
            };
            const muted = SoundEngine.isMuted();
            this.el.soundToggleBtn.textContent = muted ? '🔇 MUTED' : '🔊 SOUND';
            this.el.soundToggleBtn.classList.toggle('sound-on', !muted);
        }

        this.el.closeWinModal.onclick = () => {
            this.el.winModal.classList.remove('show');
            document.getElementById('confetti').innerHTML = '';
            this.closeGameViewport();
        };
        this.el.playAgainBtn.onclick = () => {
            if (window.SoundEngine) SoundEngine.playTap();
            this.el.winModal.classList.remove('show');
            document.getElementById('confetti').innerHTML = '';
            // Restart same game
            if (this.currentGameModule && this.currentGameModule.restart) {
                this.currentGameModule.restart();
            } else {
                this.launchGame(this._lastOptions || {});
            }
        };
        this.el.restartBtn.onclick = () => {
            if (window.SoundEngine) SoundEngine.playTap();
            if (this.currentGameModule && this.currentGameModule.restart) {
                this.currentGameModule.restart();
            } else {
                this.launchGame(this._lastOptions || {});
            }
        };
        // Escape key to go back
        this._escHandler = (e) => {
            if (e.key === 'Escape') {
                if (this.el.coachModal && this.el.coachModal.classList.contains('show')) {
                    this.closeCoachModal();
                } else if (this.el.winModal.classList.contains('show')) {
                    this.el.winModal.classList.remove('show');
                    document.getElementById('confetti').innerHTML = '';
                    this.closeGameViewport();
                } else if (!this.el.gameViewport.classList.contains('hidden')) {
                    this.closeGameViewport();
                } else if (!this.el.gameSetupScreen.classList.contains('hidden')) {
                    this.showDashboard();
                }
            }
        };
        window.addEventListener('keydown', this._escHandler);
    },

    setQuickTag(tag) {
        if (this.el.userNameInput) {
            this.el.userNameInput.value = tag;
            this.el.userNameInput.focus();
            const badge = document.getElementById('input-tag-badge');
            if (badge) badge.textContent = '⚡';
            if (window.SoundEngine) SoundEngine.playTap();
        }
    },

    randomizeTag() {
        const prefixes = ['NEO', 'CYBER', 'ZERO', 'VORTEX', 'NEXUS', 'PULSE', 'SHADOW', 'QUANTUM', 'HYPER', 'CHRONO'];
        const suffixes = ['NINJA', 'GHOST', 'RUNNER', 'VIPER', 'BLADE', 'WARP', 'PILOT', 'STRIKE', 'TITAN', 'SPARK'];
        const num = Math.floor(10 + Math.random() * 89);
        const p = prefixes[Math.floor(Math.random() * prefixes.length)];
        const s = suffixes[Math.floor(Math.random() * suffixes.length)];
        const tag = `${p}_${s}${Math.random() > 0.4 ? num : ''}`.slice(0, 15);
        if (this.el.userNameInput) {
            this.el.userNameInput.value = tag;
            this.el.userNameInput.focus();
            const badge = document.getElementById('input-tag-badge');
            if (badge) badge.textContent = '⚡';
            if (window.SoundEngine) SoundEngine.playTap();
        }
    },

    logout() {
        localStorage.removeItem('gh-user-name');
        this.user.name = 'Guest';
        if (this.el.userNameInput) {
            this.el.userNameInput.value = '';
            const badge = document.getElementById('input-tag-badge');
            if (badge) badge.textContent = '🎮';
        }
        this.el.mainDashboard.classList.add('hidden');
        this.el.gameSetupScreen.classList.add('hidden');
        this.el.gameViewport.classList.add('hidden');
        this.el.profileGate.classList.remove('hidden');
        if (this.el.userNameInput) this.el.userNameInput.focus();
        if (window.SoundEngine) SoundEngine.playTap();
    },

    checkAuth() {
        if (localStorage.getItem('gh-user-name')) {
            this.user.name = localStorage.getItem('gh-user-name');
            this.showDashboard();
        }
    },

    handleAuth() {
        const name = this.el.userNameInput.value.trim();
        if (name) {
            this.user.name = name;
            localStorage.setItem('gh-user-name', name);
            this.showDashboard();
        }
    },

    showDashboard() {
        this.el.profileGate.classList.add('hidden');
        this.el.gameSetupScreen.classList.add('hidden');
        this.el.gameViewport.classList.add('hidden');
        this.el.mainDashboard.classList.remove('hidden');
        this.renderGames(this.el.gameSearch.value);
        this.updateUI();
    },

    updateUI() {
        const newWins = parseInt(localStorage.getItem('gh-total-wins')) || 0;
        this.animateWinsCount(newWins);
        this.user.totalWins = newWins;
        if (this.el.headerUser) {
            this.el.headerUser.innerHTML = `<span>👤 ${this._esc(this.user.name)}</span><span class="switch-tag-hint" title="Switch Gamer Tag">↻ SWITCH</span>`;
            this.el.headerUser.onclick = () => {
                this.logout();
            };
        }
        this.renderLeaderboard();
    },

    animateWinsCount(target) {
        if (!this.el.totalWinsEl) return;
        const start = parseInt(this.el.totalWinsEl.textContent) || 0;
        if (start === target) {
            this.el.totalWinsEl.textContent = target;
            return;
        }
        this.el.totalWinsEl.classList.remove('badge-pop');
        void this.el.totalWinsEl.offsetWidth; // trigger reflow
        this.el.totalWinsEl.classList.add('badge-pop');
        const duration = 400;
        const startTime = performance.now();
        const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const current = Math.round(start + (target - start) * progress);
            this.el.totalWinsEl.textContent = current;
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    },

    getGameScore(gameId) {
        const scores = JSON.parse(localStorage.getItem('gh-game-scores')) || {};
        return scores[gameId] || 0;
    },

    renderGames(filter = '') {
        const q = filter.toLowerCase();
        const filtered = this.GAMES_DATA.filter(g =>
            g.title.toLowerCase().includes(q) || g.desc.toLowerCase().includes(q)
        );
        this.el.gameContainer.innerHTML = filtered.map((g, idx) => `
            <div class="game-card stagger-in" style="--card-accent: ${g.accent}; animation-delay: ${idx * 45}ms;" onclick="if(window.SoundEngine) SoundEngine.playTap(); App.openSetup('${g.id}')">
                <div class="hud-corner-brackets"></div>
                <div class="game-card-sys-tag">SYS//${g.status}</div>
                <div class="game-bg ${g.bg}"></div>
                <div class="game-icon-wrapper" style="color: ${g.accent}; text-shadow: 0 0 14px ${g.accent};">${g.icon}</div>
                <div class="game-info">
                    <h3>${g.title}</h3>
                    <p>${g.desc}</p>
                    <div class="game-card-score">
                        <span class="score-dot"></span>
                        WINS <span>${this.getGameScore(g.id)}</span>
                    </div>
                </div>
                <button class="play-btn">INITIALIZE</button>
            </div>
        `).join('');
    },

    openSetup(gameId) {
        this.currentGameId = gameId;
        const game = this.GAMES_DATA.find(g => g.id === gameId);

        if (game && game.hasSetup) {
            this.el.mainDashboard.classList.add('hidden');
            this.el.gameSetupScreen.classList.remove('hidden');
            document.getElementById('setup-title').innerHTML = `Setup <span>${game.title}</span>`;

            if (gameId === 'tic-tac-toe') {
                this.el.setupOptions.innerHTML = `
                    <div class="setup-step">
                        <label>CHOOSE YOUR OPPONENT</label>
                        <div class="option-grid">
                            <button class="option-btn active" id="opt-ai" onclick="App.setTTTMode('ai')">🤖 COMPUTER</button>
                            <button class="option-btn" id="opt-p2" onclick="App.setTTTMode('p2')">👤 PLAYER 2</button>
                        </div>
                    </div>
                    <div id="p2-name-step" class="setup-step hidden">
                        <label>PLAYER 2 NAME</label>
                        <input type="text" id="p2-name-input" class="glass-input" placeholder="Enter name..." autocomplete="off">
                    </div>`;
                this.tttMode = 'ai';
                this.el.startGameBtn.onclick = () => {
                    const p2Input = document.getElementById('p2-name-input');
                    const p2Name = p2Input ? p2Input.value.trim() || 'Player 2' : 'Player 2';
                    this.launchGame({ mode: this.tttMode, p2Name });
                };
            } else if (gameId === 'memory') {
                this.el.setupOptions.innerHTML = `
                    <div class="setup-step">
                        <label>DIFFICULTY</label>
                        <div class="option-grid">
                            <button class="option-btn active" id="diff-easy" onclick="App.setMemDiff('easy')">😊 EASY (4×4)</button>
                            <button class="option-btn" id="diff-hard" onclick="App.setMemDiff('hard')">💀 HARD (6×5)</button>
                        </div>
                    </div>`;
                this.memDiff = 'easy';
                this.el.startGameBtn.onclick = () => this.launchGame({ difficulty: this.memDiff });
            } else if (gameId === 'sudoku') {
                this.el.setupOptions.innerHTML = `
                    <div class="setup-step">
                        <label>DIFFICULTY</label>
                        <div class="option-grid">
                            <button class="option-btn active" id="sdk-easy" onclick="App.setSudokuDiff('easy')">😊 EASY</button>
                            <button class="option-btn" id="sdk-hard" onclick="App.setSudokuDiff('hard')">💀 HARD</button>
                        </div>
                    </div>`;
                this.sudokuDiff = 'easy';
                this.el.startGameBtn.onclick = () => this.launchGame({ difficulty: this.sudokuDiff });
            } else if (gameId === 'ludo' || gameId === 'snakes-ladders') {
                const gName = gameId === 'ludo' ? 'Ludo' : 'Snake Quest';
                this._mpPlayers = 2; this._mpHumans = 1;
                this.el.setupOptions.innerHTML = `
                    <div class="setup-step">
                        <label>NUMBER OF PLAYERS</label>
                        <div class="option-grid">
                            <button class="option-btn active" id="mp-2" onclick="App.setMPCount(2)">2 Players</button>
                            <button class="option-btn" id="mp-3" onclick="App.setMPCount(3)">3 Players</button>
                            <button class="option-btn" id="mp-4" onclick="App.setMPCount(4)">4 Players</button>
                        </div>
                    </div>
                    <div class="setup-step">
                        <label>HUMAN PLAYERS</label>
                        <div class="option-grid" id="mp-humans-grid">
                            <button class="option-btn active" id="mp-h1" onclick="App.setMPHumans(1)">1 Human</button>
                            <button class="option-btn" id="mp-h2" onclick="App.setMPHumans(2)">2 Humans</button>
                        </div>
                    </div>
                    <p class="setup-hint" id="mp-hint">1 human + 1 AI</p>`;
                this.el.startGameBtn.onclick = () => this.launchGame({ totalPlayers: this._mpPlayers, humanPlayers: this._mpHumans });
            }
        } else {
            this.launchGame({});
        }
    },

    setTTTMode(mode) {
        this.tttMode = mode;
        document.getElementById('opt-ai').classList.toggle('active', mode === 'ai');
        document.getElementById('opt-p2').classList.toggle('active', mode === 'p2');
        document.getElementById('p2-name-step').classList.toggle('hidden', mode === 'ai');
    },

    setMemDiff(diff) {
        this.memDiff = diff;
        document.getElementById('diff-easy').classList.toggle('active', diff === 'easy');
        document.getElementById('diff-hard').classList.toggle('active', diff === 'hard');
    },

    setSudokuDiff(diff) {
        this.sudokuDiff = diff;
        document.getElementById('sdk-easy').classList.toggle('active', diff === 'easy');
        document.getElementById('sdk-hard').classList.toggle('active', diff === 'hard');
    },

    setMPCount(n) {
        this._mpPlayers = n;
        [2,3,4].forEach(v => document.getElementById('mp-'+v).classList.toggle('active', v===n));
        // Clamp humans
        if (this._mpHumans > n) this._mpHumans = n;
        // Rebuild humans grid
        const grid = document.getElementById('mp-humans-grid');
        if (grid) {
            let html = '';
            for (let h = 1; h <= n; h++) {
                const active = h === this._mpHumans ? 'active' : '';
                html += `<button class="option-btn ${active}" id="mp-h${h}" onclick="App.setMPHumans(${h})">${h} Human${h>1?'s':''}</button>`;
            }
            grid.innerHTML = html;
        }
        this._updateMPHint();
    },

    setMPHumans(h) {
        this._mpHumans = h;
        for (let i = 1; i <= 4; i++) {
            const btn = document.getElementById('mp-h'+i);
            if (btn) btn.classList.toggle('active', i===h);
        }
        this._updateMPHint();
    },

    _updateMPHint() {
        const hint = document.getElementById('mp-hint');
        const ai = this._mpPlayers - this._mpHumans;
        if (hint) hint.textContent = `${this._mpHumans} human${this._mpHumans>1?'s':''} + ${ai} AI${ai>1?'s':''}`;
    },

    destroyCurrentGame() {
        if (this.currentGameModule && this.currentGameModule.destroy) {
            this.currentGameModule.destroy();
        }
        this.currentGameModule = null;
    },

    launchGame(options = {}) {
        this._lastOptions = options;
        // Always destroy previous game first to clean up listeners/timers
        this.destroyCurrentGame();
        this.el.gameSetupScreen.classList.add('hidden');
        this.el.mainDashboard.classList.add('hidden');
        this.el.gameViewport.classList.remove('hidden');
        this.el.gameViewport.classList.remove('view-exiting');
        this.el.gameViewport.classList.add('view-entering');
        setTimeout(() => this.el.gameViewport.classList.remove('view-entering'), 350);
        this.el.gameContent.innerHTML = '';

        const game = this.GAMES_DATA.find(g => g.id === this.currentGameId);
        this.el.gameTitleBar.innerText = game ? game.title.toUpperCase() : '';

        const modules = {
            'tic-tac-toe':    TicTacToe,
            'candy-crush':    CandyCrush,
            'memory':         MemoryMatch,
            '2048':           Game2048,
            'snakes-ladders': SnakesLadders,
            'ludo':           Ludo,
            'sudoku':         Sudoku,
            'queens':         QueensPuzzle,
            'puzzle':         SlidePuzzle,
            'crossclimb':     Crossclimb,
            'tango':          Tango,
            'zip':            ZipSpeed,
            'math-sprint':    MathSprint,
            'color-fill':     ColorFill,
            'connections':    Connections
        };

        const mod = modules[this.currentGameId];
        if (mod) {
            this.currentGameModule = mod;
            mod.init(this.el.gameContent, options);
        }
    },

    closeGameViewport() {
        if (!this.el.gameViewport.classList.contains('hidden')) {
            this.el.gameViewport.classList.add('view-exiting');
            setTimeout(() => {
                this.el.gameViewport.classList.remove('view-exiting');
                this.destroyCurrentGame();
                this.showDashboard();
            }, 240);
        } else {
            this.destroyCurrentGame();
            this.showDashboard();
        }
    },

    logWin(gameName, score = 1) {
        this.user.totalWins += score;
        localStorage.setItem('gh-total-wins', this.user.totalWins);

        let rankings = JSON.parse(localStorage.getItem('gh-rankings')) || [];
        let entry = rankings.find(r => r.name === this.user.name);
        if (entry) entry.score += score;
        else rankings.push({ name: this.user.name, score });
        rankings.sort((a, b) => b.score - a.score);
        localStorage.setItem('gh-rankings', JSON.stringify(rankings.slice(0, 10)));

        let gameScores = JSON.parse(localStorage.getItem('gh-game-scores')) || {};
        gameScores[this.currentGameId] = (gameScores[this.currentGameId] || 0) + score;
        localStorage.setItem('gh-game-scores', JSON.stringify(gameScores));

        this.celebrate(gameName);
        this.updateUI();
    },

    celebrate(gameName) {
        if (window.SoundEngine) SoundEngine.playWin();
        this.el.winTitle.innerHTML = 'YOU <span>WON!</span>';
        this.el.winMessage.innerText = gameName ? `Dominated ${gameName}!` : 'Incredible skills!';
        this.el.winModal.classList.add('show');
        this.firePoppers();
    },

    firePoppers() {
        const container = document.getElementById('confetti');
        container.innerHTML = '';
        const colors = ['#f43f5e','#6366f1','#10b981','#f59e0b','#38bdf8','#ff4d94','#a855f7','#fbbf24'];
        const burst = (ox, oy, count, spread) => {
            for (let i = 0; i < count; i++) {
                const p = document.createElement('div');
                p.className = 'popper-particle';
                const angle = (Math.random() * spread) - (spread / 2) - 90;
                const rad   = (angle * Math.PI) / 180;
                const vel   = 250 + Math.random() * 600;
                const dx    = Math.cos(rad) * vel;
                const dy    = Math.sin(rad) * vel;
                const dur   = 1.2 + Math.random() * 1.5;
                const size  = 5 + Math.random() * 10;
                const color = colors[Math.floor(Math.random() * colors.length)];
                const br    = ['50%','3px','0'][Math.floor(Math.random() * 3)];
                p.style.cssText = `left:${ox}%;bottom:${oy}%;width:${size}px;height:${size}px;background:${color};border-radius:${br};box-shadow:0 0 8px ${color};--dx:${dx}px;--dy:${dy}px;--dur:${dur}s;--rot:${Math.random()*1080}deg;`;
                container.appendChild(p);
            }
        };
        burst(5, 10, 70, 90);
        burst(95, 10, 70, 90);
        burst(50, 100, 40, 360);
        setTimeout(() => { container.innerHTML = ''; }, 4000);
    },

    renderLeaderboard() {
        const rankings = JSON.parse(localStorage.getItem('gh-rankings')) || [];
        const medals = ['🥇','🥈','🥉'];
        this.el.leaderboardList.innerHTML = rankings.map((r, i) => `
            <li>
                <span class="rank-name">${medals[i] || (i+1)+'.'} ${r.name}</span>
                <span class="rank-score">${r.score} PTS</span>
            </li>
        `).join('') || '<li style="justify-content:center;opacity:0.4;">No rankings yet</li>';
    },

    clearAllData() {
        const btn = this.el.clearRankings;
        if (!btn) return;
        // Two-click confirmation pattern (confirm() can be blocked by some environments)
        if (btn.dataset.confirming === 'true') {
            localStorage.removeItem('gh-user-name');
            localStorage.removeItem('gh-total-wins');
            localStorage.removeItem('gh-rankings');
            localStorage.removeItem('gh-game-scores');
            localStorage.removeItem('gh-2048-best');
            this.user.name = 'Guest';
            this.user.totalWins = 0;
            // Show login gate again
            this.el.mainDashboard.classList.add('hidden');
            this.el.profileGate.classList.remove('hidden');
            btn.textContent = 'RESET ALL DATA';
            btn.dataset.confirming = 'false';
            btn.classList.remove('confirming');
            this.updateUI();
        } else {
            btn.dataset.confirming = 'true';
            btn.textContent = '⚠ TAP AGAIN TO CONFIRM';
            btn.classList.add('confirming');
            // Auto-cancel after 3 seconds
            setTimeout(() => {
                if (btn.dataset.confirming === 'true') {
                    btn.textContent = 'RESET ALL DATA';
                    btn.dataset.confirming = 'false';
                    btn.classList.remove('confirming');
                }
            }, 3000);
        }
    },

    /* ══════════════════════ COACH SYSTEM METHODS ══════════════════════ */
    openCoachModal(initialGameId = null) {
        if (!this.el.coachModal) return;
        this.el.coachModal.classList.add('show');
        const targetId = initialGameId || this.currentGameId || 'tic-tac-toe';
        this.switchCoachTab('guide');
        this.renderCoachPills(targetId);
        this.renderCoachGuide(targetId);
        this.renderCheatSheet();
    },

    closeCoachModal() {
        if (this.el.coachModal) this.el.coachModal.classList.remove('show');
    },

    switchCoachTab(tab) {
        const isGuide = tab === 'guide';
        if (this.el.coachTabGuide) this.el.coachTabGuide.classList.toggle('hidden', !isGuide);
        if (this.el.coachTabCheatsheet) this.el.coachTabCheatsheet.classList.toggle('hidden', isGuide);
        if (this.el.tabBtnGuide) this.el.tabBtnGuide.classList.toggle('active', isGuide);
        if (this.el.tabBtnCheatsheet) this.el.tabBtnCheatsheet.classList.toggle('active', !isGuide);
    },

    renderCoachPills(activeId) {
        if (!this.el.coachGamePills || typeof CoachData === 'undefined') return;
        this.el.coachGamePills.innerHTML = CoachData.games.map(g => `
            <button class="coach-pill ${g.id === activeId ? 'active' : ''}" onclick="App.selectCoachGame('${g.id}')">
                <span>${g.icon}</span> ${g.title}
            </button>
        `).join('');
    },

    selectCoachGame(gameId) {
        this.renderCoachPills(gameId);
        this.renderCoachGuide(gameId);
    },

    renderCoachGuide(gameId) {
        if (!this.el.coachGuideBody || typeof CoachData === 'undefined') return;
        const g = CoachData.getGame(gameId) || CoachData.games[0];
        if (!g) return;

        this.el.coachGuideBody.innerHTML = `
            <div class="guide-header-badge">
                <div class="guide-header-title">
                    <span class="guide-header-icon">${g.icon}</span>
                    <div>
                        <h3 style="color:${g.color};">${g.title}</h3>
                        <span style="font-size:0.75rem;color:var(--text-secondary);font-weight:700;">OFFICIAL STRATEGY DOSSIER</span>
                    </div>
                </div>
                <button class="guide-play-now-btn" onclick="App.launchFromCoach('${g.id}')">▶ PLAY NOW</button>
            </div>

            <div class="guide-section">
                <div class="guide-sec-title">📖 Rules Recap</div>
                <div class="guide-rules-box">${g.rules}</div>
            </div>

            <div class="guide-section">
                <div class="guide-sec-title">🎯 Best Strategy (Ordered by Priority)</div>
                <ul class="guide-list">
                    ${g.strategies.map((s, i) => `
                        <li>
                            <span class="guide-num">${i + 1}</span>
                            <div>${s}</div>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div class="guide-section">
                <div class="guide-sec-title">⚠️ Common Mistakes to Avoid</div>
                <ul class="guide-list">
                    ${g.mistakes.map(m => `
                        <li>
                            <span class="guide-warn-icon">✖</span>
                            <div>${m}</div>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div class="guide-section">
                <div class="guide-sec-title">💡 Practice Tip to Improve Over Time</div>
                <div class="guide-practice-box">
                    <span>⚡</span>
                    <div>${g.practiceTip}</div>
                </div>
            </div>
        `;
    },

    launchFromCoach(gameId) {
        this.closeCoachModal();
        this.openSetup(gameId);
    },

    renderCheatSheet() {
        if (!this.el.cheatsheetGrid || typeof CoachData === 'undefined') return;
        this.el.cheatsheetGrid.innerHTML = CoachData.games.map(g => `
            <div class="cheatsheet-card" onclick="App.viewGameFromCheatSheet('${g.id}')">
                <div class="cs-card-header">
                    <span class="cs-card-icon">${g.icon}</span>
                    <span class="cs-card-title" style="color:${g.color};">${g.title}</span>
                </div>
                <ul class="cs-tips-list">
                    ${g.cheatSheetTips.map(t => `<li>${t}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    },

    viewGameFromCheatSheet(gameId) {
        this.switchCoachTab('guide');
        this.selectCoachGame(gameId);
    }
};

window.addEventListener('DOMContentLoaded', () => App.init());
window.App = App;
