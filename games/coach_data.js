/**
 * GAMER'S HUB — ARCADE COACH & STRATEGY DATA
 * Comprehensive rules, prioritized strategies, mistakes, and cheat sheet tips for all 15 arcade games.
 */

const CoachData = {
    games: [
        {
            id: 'tic-tac-toe',
            title: 'Tactical Toe',
            icon: '✕○',
            color: '#38bdf8',
            rules: 'Played on a 3×3 grid where players alternate placing X and O. First to align 3 symbols horizontally, vertically, or diagonally wins. Against the unbeatable minimax AI, optimal play guarantees a draw.',
            strategies: [
                'Take the center square first (or opposite corners if responding) to maximize diagonal and orthogonal threats.',
                'Block opponent two-in-a-rows immediately; defense always supersedes setup moves.',
                'Create dual-threat forks (two simultaneous winning lines) to force a win if the opponent ever errs.'
            ],
            mistakes: [
                'Playing edge squares early on instead of corners or center.',
                'Tunnel-visioning on your own attack while missing opponent forks.',
                'Expecting an outright win against the AI without waiting for a blunder.'
            ],
            practiceTip: 'Drill all 8 opening responses to center vs corner starts until drawing as O becomes muscle memory.',
            cheatSheetTips: [
                'Always fight for center or corners on turn 1.',
                'Prioritize blocking opponent 2-in-a-rows over starting new lines.',
                'Setup two-way forks to trap human opponents; play for clean draws vs AI.'
            ]
        },
        {
            id: 'candy-crush',
            title: 'Cyber Crush',
            icon: '💎',
            color: '#ff4d94',
            rules: 'Swap adjacent neon gems to align 3 or more of matching color. Cleared gems vanish and new ones fall from above. 4- and 5-gem matches and cascading combos award exponential bonus scores.',
            strategies: [
                'Prioritize matches at the bottom of the board to trigger cascades and reshuffles at the top.',
                'Look for 4- and 5-gem opportunities before settling for standard 3-gem matches.',
                'Scan the board from bottom to top so you do not accidentally disrupt potential big matches.'
            ],
            mistakes: [
                'Constantly making quick 3-gem matches at the top of the board.',
                'Missing L-shapes or 5-in-a-row setups due to rushing moves.',
                'Ignoring how falling columns will shift adjacent tiles.'
            ],
            practiceTip: 'Before each move, pause 3 seconds to verify if an existing line can be upgraded into a 4- or 5-match.',
            cheatSheetTips: [
                'Play low on the board to trigger free chain reactions.',
                'Prioritize 4- and 5-gem combos over basic 3-matches.',
                'Scan bottom-up to prevent breaking set-ups above.'
            ]
        },
        {
            id: 'memory',
            title: 'Memory Pulse',
            icon: '🧠',
            color: '#8b5cf6',
            rules: 'A timed card matching duel on a face-down grid. Flip two cards each turn; matched pairs stay face-up, while mismatched cards flip back. Clear all pairs before the countdown hits zero.',
            strategies: [
                'Anchor mental coordinates using spatial quadrants (e.g. top-left, bottom-right) rather than random browsing.',
                'Assign quick verbal labels or associations to card art (e.g., "sword top-2", "ruby mid-right").',
                'Flip newly unexplored cards first, then match with previously remembered locations on card two.'
            ],
            mistakes: [
                'Blindly clicking random cards under time pressure without memorizing previous flips.',
                'Flipping a known card first and then guessing the second card.',
                'Panicking when the timer runs low instead of maintaining a steady systematic scan.'
            ],
            practiceTip: 'Practice recalling grid coordinates by rows (Row 1 Col 2) to build rapid spatial indexing.',
            cheatSheetTips: [
                'Scan systematically row-by-row or quadrant-by-quadrant.',
                'Flip the unknown tile first, then pair with the memorized tile.',
                'Name cards silently out loud to activate dual visual-auditory memory.'
            ]
        },
        {
            id: '2048',
            title: 'Cyber 2048',
            icon: '⊞',
            color: '#edc22e',
            rules: 'Slide all grid tiles in four cardinal directions on a 4×4 board. Colliding tiles with equal values merge into their sum, and a new 2 or 4 spawns each turn. Reach 2048 before the board jams.',
            strategies: [
                'Lock your highest-value tile permanently into one designated corner (e.g. bottom-left).',
                'Build a descending snake monotonic chain along the boundary wall leading to your anchor corner.',
                'Never swipe in the forbidden direction (e.g. Up if your corner is at the bottom) unless 100% forced.'
            ],
            mistakes: [
                'Swiping in all four directions aimlessly, dislodging the high-value corner anchor.',
                'Letting the row containing your king tile get emptied and invaded by low-value spawns.',
                'Merging prematurely when keeping tiles organized is safer.'
            ],
            practiceTip: 'Play rounds committing to only 3 directional keys (Down, Left, Right) to build disciplined corner play.',
            cheatSheetTips: [
                'Lock your highest tile in a fixed corner permanently.',
                'Strictly avoid swiping in the opposite direction of your anchor.',
                'Maintain descending values in a contiguous snake along walls.'
            ]
        },
        {
            id: 'snakes-ladders',
            title: 'Snake Quest',
            icon: '🐍',
            color: '#ef4444',
            rules: 'Turn-based race from tile 1 to 100. Players take turns rolling a die and moving forward. Landing on a ladder base climbs upward; landing on a snake head drags you down. First to reach 100 wins.',
            strategies: [
                'Track high-risk danger zones: identify snake heads in your next 1-6 roll window.',
                'Recognize momentum swings: early snake hits are easily recovered; late snakes (tiles 80-99) decide matches.',
                'Maintain steady pacing and focus on landing safety rather than reckless advancement.'
            ],
            mistakes: [
                'Assuming the game is lost early after a snake hit.',
                'Losing focus on endgame squares where exact rolls may be required.',
                'Ignoring opponent positioning relative to upcoming mega-ladders.'
            ],
            practiceTip: 'Memorize the key ladder shortcuts (e.g. tile 28 to 84) to evaluate realistic board velocity.',
            cheatSheetTips: [
                'Monitor danger zones 1-6 tiles ahead of your current token.',
                'Don’t tilt on early setbacks; high ladders can flip the lead instantly.',
                'Focus on late-game safety zones near square 100.'
            ]
        },
        {
            id: 'ludo',
            title: 'Ludo Legends',
            icon: '🎲',
            color: '#f59e0b',
            rules: 'Each player navigates 4 tokens around the board. A roll of 6 releases a token from base and earns a bonus roll. Land on opponents to send them home (except on star safe squares). Guide all 4 home to win.',
            strategies: [
                'Get all 4 tokens out of base early to maximize flexible move options for every roll.',
                'Camp tokens on star safe squares and use them as strike bases to capture trailing enemies.',
                'Never leave a solitary token 1 to 6 steps ahead of an opponent unless absolutely forced.'
            ],
            mistakes: [
                'Racing a single token all the way home while leaving the remaining three trapped in base.',
                'Leaving vulnerable tokens just ahead of opponent striking distance.',
                'Passing up safe square parking spots when an opponent is stalking behind you.'
            ],
            practiceTip: 'Count die distances: always keep your tokens 7+ tiles ahead or safely behind opponents.',
            cheatSheetTips: [
                'Mobilize all tokens out of base early to create movement flexibility.',
                'Use colored/star safe squares as shields and launchpads.',
                'Prioritize capturing enemy pieces to wipe out their board tempo.'
            ]
        },
        {
            id: 'sudoku',
            title: 'Sudoku Nexus',
            icon: '⑨',
            color: '#4facfe',
            rules: 'Fill a 9×9 grid divided into nine 3×3 boxes so that digits 1 through 9 appear exactly once in every row, column, and 3×3 box without duplicates.',
            strategies: [
                'Find "naked singles": squares where 8 other digits are already eliminated by intersecting row, column, and box.',
                'Find "hidden singles": digits that have only one possible placement left within a box or line.',
                'Use cross-hatching across adjacent 3×3 boxes to rapidly pinpoint candidates for common numbers.'
            ],
            mistakes: [
                'Guessing numbers without logical proof, which creates cascading errors.',
                'Failing to scan all 3 constraints (row, column, AND 3×3 box) before entering a digit.',
                'Ignoring pencil marks / candidate tracking on hard difficulty.'
            ],
            practiceTip: 'Start each puzzle by cross-hatching digits 1 through 9 in numerical order to snatch all free singles.',
            cheatSheetTips: [
                'Scan the most populated rows, columns, and 3×3 boxes first.',
                'Cross-hatch numbers 1-9 to identify obvious naked singles.',
                'Never guess—every valid cell has an airtight deduction path.'
            ]
        },
        {
            id: 'queens',
            title: 'Royal Queens',
            icon: '👑',
            color: '#f6d365',
            rules: 'Place 8 queens on an 8×8 chessboard so that no two queens threaten each other. No two queens may share the same row, column, or diagonal line.',
            strategies: [
                'Place exactly one queen per column/row systematically using knight-move spacing (2 over, 1 up/down).',
                'Avoid the outer corners and edges early, as they restrict diagonal placement options.',
                'Work column-by-column from left to right; backtrack immediately when a column has zero safe squares.'
            ],
            mistakes: [
                'Placing queens randomly without checking major and minor diagonal sightlines.',
                'Clustering multiple queens in the center four squares early.',
                'Hesitating to undo/backtrack 2 steps back when deadlocks occur.'
            ],
            practiceTip: 'Memorize the standard non-attacking knight-step pattern offset for the first 4 columns.',
            cheatSheetTips: [
                'Place exactly one queen per row and column.',
                'Use knight-move offsets between queens to dodge diagonals.',
                'Backtrack systematically column by column when blocked.'
            ]
        },
        {
            id: 'puzzle',
            title: 'Slide Master',
            icon: '⧉',
            color: '#a8edea',
            rules: 'Slide numbered tiles into the single open space to arrange tiles in numerical order (1 through 8 or 15) with the empty space in the bottom-right corner in the fewest moves possible.',
            strategies: [
                'Solve row by row from top to bottom: complete Row 1 first, then Row 2, then solve the remaining bottom area.',
                'For the last two tiles of a row (e.g. 3 and 4), position tile 4 directly under tile 3, then rotate them into place together.',
                'Preserve completed rows above; never break a finished top row to move lower tiles.'
            ],
            mistakes: [
                'Trying to place tiles randomly all over the board simultaneously.',
                'Forcing the last tile of a row into place directly, breaking previously placed neighbors.',
                'Moving tiles aimlessly without a planned 3-step rotation.'
            ],
            practiceTip: 'Practice the corner-tuck rotation: lock tile (N-1) in corner, tuck tile (N) below it, cycle into place.',
            cheatSheetTips: [
                'Solve top-to-bottom, row-by-row; never disturb completed rows.',
                'Pair the last two tiles of a row into a tandem corner cycle.',
                'Finish by rotating the final bottom-left 2×2 block into order.'
            ]
        },
        {
            id: 'crossclimb',
            title: 'Word Climb',
            icon: 'Aa',
            color: '#00f2fe',
            rules: 'Transform a starting word into a target word by changing exactly one letter at a time. Every intermediary step must be an authentic dictionary word. Solve in minimal steps.',
            strategies: [
                'Compare start and goal words to identify shared letters and prioritize fixing mismatched positions.',
                'Target high-utility pivot vowels (A, E, O) and common consonants (R, S, T) to expand valid anagram branches.',
                'Work bidirectionally: if stuck moving forward from start, brainstorm one valid step backward from the target word.'
            ],
            mistakes: [
                'Introducing rare letters (Z, X, Q) that create dead-end words with no valid transitions.',
                'Changing letters that already match the target word unnecessarily.',
                'Forgetting that past common 3- or 4-letter nouns and verbs make the safest stepping stones.'
            ],
            practiceTip: 'When stuck, write down all single-letter rhyming variants of the current word before committing a move.',
            cheatSheetTips: [
                'Identify differing letters and change them one at a time.',
                'Pivot through common vowels (E, A, O) and frequent endings.',
                'Work backward from the goal word if the forward path dead-ends.'
            ]
        },
        {
            id: 'tango',
            title: 'Logic Tango',
            icon: '01',
            color: '#7028e4',
            rules: 'Fill the binary grid with 0s and 1s (Sun/Moon symbols). No more than two identical symbols may be adjacent in any row or column. Each row and column must contain an equal number of each symbol. No two rows or columns can be identical.',
            strategies: [
                'Apply the "three-in-a-row" rule: whenever you see two identical symbols side-by-side (00), cap both ends with the opposite symbol (1-0-0-1).',
                'Apply the "sandwich" rule: whenever two identical symbols have one space between them (0_0), the middle must be the opposite (0-1-0).',
                'Count row/col totals: once a line has reached its maximum quota of 0s, fill all remaining cells with 1s.'
            ],
            mistakes: [
                'Allowing 3 identical symbols in a line by missing diagonal vs orthogonal line checks.',
                'Forgetting to count completed counts per line before guessing.',
                'Failing to compare nearly-complete rows to prevent identical duplicate lines.'
            ],
            practiceTip: 'Scan systematically in two passes: first pass for pairs/sandwiches, second pass for line counts.',
            cheatSheetTips: [
                'Cap any pair (00 -> 1001) to block illegal triplets.',
                'Fill the sandwich gap (0_0 -> 010) immediately.',
                'Count symbols per line; once half is full, the rest is forced.'
            ]
        },
        {
            id: 'zip',
            title: 'Speed Zip',
            icon: '⚡',
            color: '#ff0844',
            rules: 'Fast-paced reaction arcade. Tap or click dynamic moving targets within the arena before the shrinking window expires. Faster taps score higher multipliers.',
            strategies: [
                'Keep your mouse cursor or finger centered in the arena to minimize transit distance to any spawn point.',
                'Focus soft vision on the entire arena rather than fixating on the last tapped spot.',
                'Maintain a steady tapping rhythm; tense hands slow reaction time by 40-60ms.'
            ],
            mistakes: [
                'Leaving the cursor resting on the perimeter edges after a click.',
                'Spamming clicks erratically and triggering miss penalties.',
                'Tensing finger muscles between rounds.'
            ],
            practiceTip: 'Practice resetting cursor to the exact geometric center immediately after every successful tap.',
            cheatSheetTips: [
                'Always reset cursor/finger to arena center after every tap.',
                'Use peripheral vision to spot spawn animations instantly.',
                'Stay relaxed; smooth rhythm beats jerky panic clicks.'
            ]
        },
        {
            id: 'math-sprint',
            title: 'Math Sprint',
            icon: '∑',
            color: '#10b981',
            rules: 'Rapid-fire arithmetic game. Solve addition, subtraction, and multiplication problems against a brisk timer. Speed and accuracy both dictate the final score.',
            strategies: [
                'Use last-digit elimination: calculate only the units digit of the answer to eliminate 2-3 multiple-choice options instantly.',
                'Decompose tough numbers to friendly base-10 anchors (e.g. 17×6 = (10×6) + (7×6) = 60 + 42 = 102).',
                'Round and compensate for subtraction (e.g. 83 - 29 = 83 - 30 + 1 = 54).'
            ],
            mistakes: [
                'Calculating the full multi-digit answer from scratch when choices differ by final digit.',
                'Second-guessing correct answers and draining clock seconds.',
                'Rushing blindly and tapping incorrect options, killing multipliers.'
            ],
            practiceTip: 'Drill units-digit arithmetic (e.g. 7 + 8 ends in 5; 4 × 7 ends in 8) for instantaneous option elimination.',
            cheatSheetTips: [
                'Inspect the last digit of the answer to discard wrong choices fast.',
                'Break complex operations into round tens and single digits.',
                'Accuracy protects your streak multiplier—never guess wildly.'
            ]
        },
        {
            id: 'color-fill',
            title: 'Color Fill',
            icon: '🎨',
            color: '#a855f7',
            rules: 'Flood-fill puzzle starting from the top-left corner. Pick colors from the palette to absorb adjacent connected tiles of that color. Flood the entire board in a uniform color within the move limit.',
            strategies: [
                'Choose the color that absorbs the maximum number of new perimeter tiles on each turn.',
                'Aim your expansion path toward large single-color clusters located in the board interior.',
                'Count required steps backward from corner goals to ensure you do not run dry on moves.'
            ],
            mistakes: [
                'Picking colors that only expand by 1 tile while ignoring huge adjacent color blocks.',
                'Neglecting distant corners until the last few moves.',
                'Picking the color your flood zone already is (wasting moves).'
            ],
            practiceTip: 'Count the border perimeter of each color choice before tapping to guarantee positive net expansion.',
            cheatSheetTips: [
                'Pick colors that absorb the largest border territory.',
                'Target bridges that unlock isolated large color islands.',
                'Expand diagonally outward toward the bottom-right corner.'
            ]
        },
        {
            id: 'connections',
            title: 'Connections',
            icon: '🔗',
            color: '#3b82f6',
            rules: 'Group 16 words into 4 distinct sets of 4 words that share a hidden category. Only 4 mistakes permitted. Words often belong to clever wordplay, pop culture, compound prefixes, or deliberate red-herring traps.',
            strategies: [
                'Identify red herrings first: if 5 or 6 words seem to fit a category, DO NOT guess it yet—find the tight 4-word set first.',
                'Look for lateral wordplay (homophones, palindromes, words that follow/precede a common word, rhyme schemes).',
                'Solve the most specific, unambiguous category first to eliminate false overlap candidates for remaining words.'
            ],
            mistakes: [
                'Falling for obvious traps by submitting 4 words when a 5th word also clearly shares the trait.',
                'Burning through all 4 lives on the same category without testing other word groups.',
                'Focusing exclusively on literal definitions while ignoring spelling or prefix patterns.'
            ],
            practiceTip: 'Group words mentally into candidate clusters of 4 on scratch paper before submitting your first attempt.',
            cheatSheetTips: [
                'Beware 5-word traps: find the intruder before submitting.',
                'Test wordplay categories (fill-in-the-blank, homophones, anagrams).',
                'Lock in the tightest, most specific category first to clear noise.'
            ]
        }
    ],

    getGame(id) {
        return this.games.find(g => g.id === id);
    }
};

if (typeof module !== 'undefined') {
    module.exports = CoachData;
}
