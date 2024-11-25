function showSurprise() {
    document.getElementById('surprise').classList.remove('hidden');
    document.querySelector('.glow-on-hover').classList.add('hidden');
    //document.getElementById("myaudio").play;
    var audio=document.createElement('audio');
    audio.src='4269757760.mp3';
    audio.autoplay=true;
    document.getElementById("audio-container").appendChild(audio);

    startConfetti();
}

function startConfetti() {
    const canvas = document.getElementById('birthdayCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 200;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 4 + 1,
            d: Math.random() * particleCount,
            color: `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},0.8)`
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particleCount; i++) {
            const p = particles[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
            ctx.fillStyle = p.color;
            ctx.fill();
        }
        update();
    }

    let angle = 0;
    function update() {
        angle += 0.01;
        for (let i = 0; i < particleCount; i++) {
            const p = particles[i];
            p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
            p.x += Math.sin(angle) * 2;

            if (p.x > canvas.width + 5 || p.x < -5 || p.y > canvas.height) {
                if (i % 3 > 0) {
                    particles[i] = { x: Math.random() * canvas.width, y: -10, r: p.r, d: p.d, color: p.color };
                } else {
                    if (Math.sin(angle) > 0) {
                        particles[i] = { x: -5, y: Math.random() * canvas.height, r: p.r, d: p.d, color: p.color };
                    } else {
                        particles[i] = { x: canvas.width + 5, y: Math.random() * canvas.height, r: p.r, d: p.d, color: p.color };
                    }
                }
            }
        }
    }

    setInterval(draw, 33);
}
