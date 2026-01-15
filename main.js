// ===========================
// BINARIO MATRIX STYLE
// ===========================

class BinaryDigit {
    constructor(container, columns, containerHeight) {
        this.container = container;
        this.containerHeight = containerHeight;

        this.digit = document.createElement('div');
        this.digit.className = 'binary-digit';
        this.digit.textContent = Math.random() > 0.5 ? '1' : '0';

        // Posición inicial
        const spacingX = container.offsetWidth / columns;
        this.x = Math.random() * (columns - 1) * spacingX;
        this.y = Math.random() * containerHeight * -0.5; // empieza arriba del contenedor

        // Tamaño y color
        this.size = 14 + Math.random() * 10;
        this.digit.style.fontSize = `${this.size}px`;
        this.digit.style.left = `${this.x}px`;

        const colors = ['#22d3ee', '#3b82f6', '#10b981', '#facc15']; // cian, azul, verde, amarillo
        this.digit.style.color = colors[Math.floor(Math.random() * colors.length)];

        this.speed = 30 + Math.random() * 60; // velocidad en px/s

        container.appendChild(this.digit);
    }

    update(deltaTime) {
        this.y += this.speed * deltaTime / 1000; // moverse según deltaTime

        if (this.y > this.containerHeight + 20) { // ligeramente fuera del contenedor
            this.y = -20;
            this.digit.textContent = Math.random() > 0.5 ? '1' : '0';
        }

        this.digit.style.top = `${this.y}px`;
    }
}

class BinaryField {
    constructor(containerId = 'binaryContainer', columns = 12, rows = 8) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.containerHeight = this.container.getBoundingClientRect().height || 420;

        this.digits = [];
        for (let i = 0; i < columns * rows; i++) {
            this.digits.push(new BinaryDigit(this.container, columns, this.containerHeight));
        }

        this.lastTime = performance.now();
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(currentTime) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.digits.forEach(d => d.update(deltaTime));

        requestAnimationFrame(this.animate.bind(this));
    }
}

// ===========================
// INICIALIZAR CUANDO EL DOM ESTÉ LISTO
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    new BinaryField('binaryContainer', 12, 8);
});
