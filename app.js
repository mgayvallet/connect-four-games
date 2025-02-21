const menu = document.querySelector('#menu');

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