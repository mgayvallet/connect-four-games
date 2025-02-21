const menu = document.querySelector('#menu');
const btnGamesRules = document.querySelector('#btnGamesRules');

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
        </section>
    `;
    document.body.appendChild(rulesOverlay);

    const retour = rulesOverlay.querySelector('.logoValider');
    retour.addEventListener('click', () => {
        document.body.removeChild(rulesOverlay);
    });
});

menu.addEventListener('click', () => {
    const pauseOverlay = document.createElement('div');
    pauseOverlay.innerHTML = `
        <section class="secPause">
            <div class="secPs">
                <h2 class="h2P heading-l">PAUSE</h2>
                <button class="btnBlanc btnP heading-m" id="continuer">CONTINUE GAME</button>
                <button class="btnBlanc btnP heading-m">RESTART</button>
                <button class="btnRose btnP heading-m">QUIT GAME</button>
            </div>
        </section>
    `;
    document.body.appendChild(pauseOverlay);

    const continueButton = pauseOverlay.querySelector('#continuer');
    continueButton.addEventListener('click', () => {
        document.body.removeChild(pauseOverlay);
    });
});