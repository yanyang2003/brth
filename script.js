document.querySelector('.glow-on-hover').addEventListener('click', () => {
    alert('还没想好展示什么');
    alert('骗你的^~^,有惊喜呦');
    alert('你在期待什么^-^');
    alert('这么相信我？');
    alert('好了，不骗你了，准备接受这比较潦草的网页吧');
});

// Add scroll animation
const sections = document.querySelectorAll('.container');
const options = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.style.animation = `fadeIn 2s forwards`;
        observer.unobserve(entry.target);
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});
const container = document.getElementById('cai');
const button = document.getElementById('button1');
function movebutton() {
    const maxX = container.offsetWidth - button.offsetWidth;
    const maxY = container.offsetHeight - button.offsetHeight;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
}

setInterval(movebutton, 500);