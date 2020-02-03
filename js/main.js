document.addEventListener('DOMContentLoaded', () => {
    // bind player buttons
    const playerButtons = document.querySelectorAll('.bcplayer-container>svg');
    for (const playerButton of playerButtons) {
        playerButton.addEventListener('click', event => {
            const container = playerButton.parentElement;
            const bcplayer = container.querySelector('iframe');
            playerButton.classList.toggle('hide');
            bcplayer.classList.toggle('show');
        });
    }

});



