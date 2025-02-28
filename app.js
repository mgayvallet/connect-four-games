document.addEventListener('DOMContentLoaded', () => {
    let scoreJoueur1 = 0;
    let scoreJoueur2 = 0;
    let joueurActuel = "PLAYER 1";
    let partieEnCours = true;
    let tempsRestant = 15;
    let colonneSelectionnee = 3; // Définir la colonne du milieu par défaut
    const grille = Array(6).fill().map(() => Array(7).fill(""));
    let timerInterval;

    const restartButton = document.querySelector('.headerBtn.heading-xs:last-child');
    const menuButton = document.querySelector('#menu');
    const btnPlay = document.querySelector('.btnPlay');
    const start = document.querySelector('.start');
    const timeElement = document.querySelector('.time');
    const playerText = document.querySelector('.time p');
    const timerText = document.querySelector('.time h3');
    const curseur = document.querySelector('.curseur');
    const btnGamesRules = document.querySelector('#btnGamesRules');
    const footer = document.querySelector('footer');

    btnPlay.addEventListener('click', () => {
        start.style.display = 'none';
        startGame();
    });

    restartButton.addEventListener('click', () => {
        startGame();
    });

    btnGamesRules.addEventListener('click', () => {
        const rulesOverlay = document.createElement('div');
        rulesOverlay.innerHTML = `
            <section class="secRules">
                <div class="divRls">
                    <h2 class="h2R heading-l">RULES</h2>
                    <div class="divObj">
                        <h3 class="heading-s">OBJECTIVE</h3>
                        <p>Be the first player to connect 4 of the same colored discs in a row (either vertically, horizontally, or diagonally).</p>
                    </div>
                    <div class="divHplay">
                        <h3 class="heading-s">HOW TO PLAY</h3>
                        <ol>
                            <li>Red goes first in the first game.</li>
                            <li>Players must alternate turns, and only one disc can be dropped in each turn. </li>
                            <li>The game ends when there is a 4-in-a-row or a stalemate.</li>
                            <li>The starter of the previous game goes second on the next game.</li>
                        </ol>
                    </div>
                </div>
                <img src="asset/Group 2.png" alt="logoValider" class="logoValider">
            </section>`
        document.body.appendChild(rulesOverlay);

        const logoValider = document.querySelector('.logoValider');
        logoValider.addEventListener('click', () => rulesOverlay.remove());
    });


    menuButton.addEventListener('click', () => {
        const pauseOverlay = document.createElement('div');
        pauseOverlay.innerHTML = `
            <section class="secPause">
                <div class="secPs">
                    <h2 class="h2P heading-l">PAUSE</h2>
                    <button class="btnBlanc btnP heading-m" id="continuer">CONTINUE GAME</button>
                    <button class="btnBlanc btnP heading-m" id="restart">RESTART</button>
                    <button class="btnRose btnP heading-m">QUIT GAME</button>
                </div>
            </section>`;
        document.body.appendChild(pauseOverlay);

        pauseOverlay.querySelector('#continuer').addEventListener('click', () => pauseOverlay.remove());
        pauseOverlay.querySelector('#restart').addEventListener('click', () => {
            startGame();
            pauseOverlay.remove();
        });
    });

    function startGame() {
        scoreJoueur1 = 0;
        scoreJoueur2 = 0;
        joueurActuel = "PLAYER 1";
        tempsRestant = 15;
        colonneSelectionnee = 3; 
        grille.forEach(row => row.fill(""));
        partieEnCours = true;
        updateGridDisplay();
        startTimer();
        updateCurrentPlayerDisplay();
        updateCurseur();
    }

    function startTimer() {
        tempsRestant = 15;
        updateTimerDisplay();
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            tempsRestant--;
            updateTimerDisplay();
            if (tempsRestant <= 0) {
                clearInterval(timerInterval);
                switchPlayer();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        timerText.textContent = `${tempsRestant}s`;
    }

    function switchPlayer() {
        joueurActuel = (joueurActuel === "PLAYER 1") ? "PLAYER 2" : "PLAYER 1";
        updateCurrentPlayerDisplay();
        startTimer();
    }

    function updateCurrentPlayerDisplay() {
        timeElement.style.backgroundImage = joueurActuel === "PLAYER 1" ? "url('asset/RectangleRose.png')" : "url('asset/RectangleJ.png')";
        playerText.textContent = `${joueurActuel}’S TURN`;
        playerText.style.color = joueurActuel === "PLAYER 1" ? "white" : "black";
        timerText.style.color = joueurActuel === "PLAYER 1" ? "white" : "black";
    }

    function placeToken() {
        if (!partieEnCours) return;

        for (let row = 5; row >= 0; row--) { 
            if (grille[row][colonneSelectionnee] === "") { 
                grille[row][colonneSelectionnee] = (joueurActuel === "PLAYER 1") ? "X" : "O"; 
                updateGridDisplay(); 
                checkWinner(); 
                switchPlayer();
                return; 
            }
        }
    }

    function updateGridDisplay() {
        const gridButtons = document.querySelectorAll('.grid-games .grid');
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                let cell = gridButtons[row * 7 + col];
                cell.style.backgroundColor = grille[row][col] === "X" ? "#fd6687" : grille[row][col] === "O" ? "#ffce67" : "transparent";
            }
        }
    }

    document.addEventListener('keydown', (event) => {
        if (event.code === 'ArrowRight' && colonneSelectionnee < 6) {
            colonneSelectionnee++;
        } else if (event.code === 'ArrowLeft' && colonneSelectionnee > 0) {
            colonneSelectionnee--;
        } else if (event.code === 'Space') {
            placeToken();
        }
        updateCurseur();
    });

    function updateCurseur() {
        if (curseur) {
            curseur.style.left = `${colonneSelectionnee * 50}px`;
        }
    }

    function checkWinner() {
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                if (grille[row][col] !== "") {
                    if (
                        checkDirection(row, col, 1, 0) ||
                        checkDirection(row, col, 0, 1) ||
                        checkDirection(row, col, 1, 1) ||
                        checkDirection(row, col, 1, -1)
                    ) {
                        endGame(grille[row][col]);
                        return;
                    }
                }
            }
        }
    }

    function checkDirection(row, col, dRow, dCol) {
        let player = grille[row][col];
        for (let i = 1; i < 4; i++) {
            let newRow = row + dRow * i;
            let newCol = col + dCol * i;
            if (newRow < 0 || newRow >= 6 || newCol < 0 || newCol >= 7 || grille[newRow][newCol] !== player) {
                return false;
            }
        }
        return true;
    }

    function endGame(winner) {
        partieEnCours = false;
        clearInterval(timerInterval);
        if (winner === "X") {
            footer.style.backgroundColor = "#fd6687";
        } else if (winner === "O") {
            footer.style.backgroundColor = "#ffce67";
        }
    }
});
