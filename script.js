// SETUP THE CANVAS
const canvas = document.getElementById('webgl');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// CHARACTERS
const binary = "10";
const characters = binary.split("");

// COLUMNS
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];
for (let x = 0; x < columns; x++) { drops[x] = 1; }

// PAUSE LOGIC
const pauseBtn = document.getElementById('pauseBtn');
let isPaused = false;
let animationId; 

function draw() {
    // 1. Fade old frame
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Text Style
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        // Color Randomizer (Cyan vs Green)
        if (Math.random() > 0.90) {
            ctx.fillStyle = "#00ffff"; 
        } else {
            ctx.fillStyle = "#00ff41"; 
        }

        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset logic
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }

    // 3. Loop Control
    if (!isPaused) {
        // REVERTED SPEED: 33ms (Standard 30fps)
        animationId = setTimeout(draw, 33);
    }
}

// TOGGLE FUNCTION
pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused; 

    if (isPaused) {
        pauseBtn.innerText = "RESUME SYSTEM";
    } else {
        pauseBtn.innerText = "PAUSE SYSTEM";
        draw(); // Restart the loop
    }
});

// Start Loop
draw();

// RESIZE HANDLER
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const newColumns = canvas.width / fontSize;
    for (let x = 0; x < newColumns; x++) {
        if (!drops[x]) drops[x] = 1;
    }
});
