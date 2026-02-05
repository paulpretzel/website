document.addEventListener("DOMContentLoaded", () => {
    
    // 1. SELECT ELEMENTS
    const curtain = document.getElementById('loader-curtain');
    const links = document.querySelectorAll('a');

    // 2. FADE IN (Reveal the page on load)
    // We use a small timeout to ensure the CSS has loaded
    setTimeout(() => {
        curtain.classList.add('curtain-hidden');
    }, 100); // 100ms delay

    // 3. HANDLE CLICKS (Fade out before leaving)
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('href');

            // Only run transition for internal pages (html files)
            // Ignore hash links (#contact) or empty links
            if (target.includes('.html') && target !== window.location.pathname) {
                e.preventDefault(); // STOP the browser from jumping immediately

                // Bring the curtain back (Fade to Black)
                curtain.classList.remove('curtain-hidden');

                // Wait 500ms for fade to finish, then go to new page
                setTimeout(() => {
                    window.location.href = target;
                }, 500);
            }
        });
    });
});
