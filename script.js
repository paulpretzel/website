// SETUP THE CANVAS
const canvas = document.getElementById('webgl');
const ctx = canvas.getContext('2d');

// Set canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// CHARACTERS (Binary 1s and 0s)
const binary = "10";
// You can add more characters like "10XY" if you want a messier look
const characters = binary.split("");

// COLUMN SETUP
const fontSize = 14;
const columns = canvas.width / fontSize; // Number of columns for the rain

// DROPS ARRAY
// An array of drops - one per column
// 1 = y co-ordinate of the drop (initially at the top)
const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

// DRAWING FUNCTION
function draw() {
    // 1. Fade effect (Instead of clearing the screen, we draw a translucent black layer)
    // This creates the "trails" behind the falling text
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Text Settings
    ctx.fillStyle = "#00ff41"; // Matrix Neon Green
    ctx.font = fontSize + "px monospace";

    // 3. Loop through drops
    for (let i = 0; i < drops.length; i++) {
        // Pick a random character
        const text = characters[Math.floor(Math.random() * characters.length)];
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // 4. Random Reset
        // If drop is at bottom of screen, send it back to top randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Increment y coordinate
        drops[i]++;
    }
}

// RUN ANIMATION (30 milliseconds = ~30 Frames Per Second)
setInterval(draw, 33);

// HANDLE WINDOW RESIZE
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Re-calculate columns so the rain covers the new width
    const newColumns = canvas.width / fontSize;
    for (let x = 0; x < newColumns; x++) {
        // Preserve existing drops if possible, otherwise start new ones
        if (!drops[x]) drops[x] = 1;
    }
});
