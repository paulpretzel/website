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

// INPUTS
const speedInput = document.getElementById('speedRange');
const densityInput = document.getElementById('densityRange');

let animationId; // To track the timeout

// DRAWING FUNCTION
function draw() {
    // 1. Fade old frame
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Text Style
    ctx.font = fontSize + "px monospace";

    // 3. Get Density Value (Inverted: Higher slider = Lower random threshold)
    // Slider goes 0.5 to 0.99. 
    // We want "More Density" to mean "Resets LESS often" or "Resets MORE often"?
    // Actually: "Spawn Rate" usually means how many new drops appear.
    // In this script, a drop "spawns" when it hits the bottom and resets.
    const densityThreshold = densityInput.value; 

    for (let i = 0; i < drops.length; i++) {
        // Color Randomizer
        if (Math.random() > 0.90) {
            ctx.fillStyle = "#00ffff"; 
        } else {
            ctx.fillStyle = "#00ff41"; 
        }

        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset logic (The "Density")
        if (drops[i] * fontSize > canvas.height && Math.random() > densityThreshold) {
            drops[i] = 0;
        }

        drops[i]++;
    }

    // 4. Loop with variable speed
    // The slider value is the delay in ms. Lower = Faster.
    // We flip the logic so sliding "Right" makes it FASTER (lower delay)
    const delay = 110 - speedInput.value; 
    animationId = setTimeout(draw, delay);
}

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
