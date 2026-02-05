// --- PART 1: MATRIX RAIN CANVAS ---
const canvas = document.getElementById('webgl');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const binary = "10";
const characters = binary.split("");
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];
for (let x = 0; x < columns; x++) { drops[x] = 1; }

// PAUSE LOGIC
const pauseBtn = document.getElementById('pauseBtn');
let isPaused = false;
let animationId; 

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        if (Math.random() > 0.90) { ctx.fillStyle = "#00ffff"; } 
        else { ctx.fillStyle = "#00ff41"; }

        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }

    if (!isPaused) {
        animationId = setTimeout(draw, 33);
    }
}

pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused; 
    if (isPaused) { pauseBtn.innerText = "RESUME SYSTEM"; } 
    else { pauseBtn.innerText = "PAUSE SYSTEM"; draw(); }
});

draw();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const newColumns = canvas.width / fontSize;
    for (let x = 0; x < newColumns; x++) { if (!drops[x]) drops[x] = 1; }
});


// --- PART 2: TYPEWRITER EFFECT ---
const textToType = "ENGINEER. MAKER. MENTOR.";
const typeTarget = document.getElementById('typewriter');
let charIndex = 0;

function typeWriter() {
    if (charIndex < textToType.length) {
        // Add one character
        const char = textToType.charAt(charIndex);
        
        // We set the innerHTML to the current text + the blinking cursor span
        typeTarget.innerHTML = textToType.substring(0, charIndex + 1) + '<span class="cursor"></span>';
        
        charIndex++;
        setTimeout(typeWriter, 100); // Speed: 100ms per character
    } else {
        // Finished typing: keep the cursor blinking
        typeTarget.innerHTML = textToType + '<span class="cursor"></span>';
    }
}

// Start typing when page loads
window.onload = typeWriter;
