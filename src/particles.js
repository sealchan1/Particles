class Particles {

    constructor() {

        const window = document.getElementById('window');
        const windowContext = window.getContext('2d');

        windowContext.fillStyle = 'green';
        windowContext.fillRect(10, 10, 150, 100);

    }

}

new Particles();