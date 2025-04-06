document.addEventListener('DOMContentLoaded', () => {
    // Adiciona efeito de ripple nos cards
    const cards = document.querySelectorAll('.link-card');

    cards.forEach(card => {
        card.addEventListener('click', function (e) {
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;

            let ripple = document.createElement('span');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.className = 'ripple';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Animação de entrada dos elementos
    const profile = document.querySelector('.profile');
    const links = document.querySelectorAll('.link-card');
    const footer = document.querySelector('footer');

    // Adiciona classe para animar entrada
    profile.classList.add('fade-in');

    links.forEach((link, index) => {
        setTimeout(() => {
            link.classList.add('fade-in');
        }, 200 * (index + 1));
    });

    setTimeout(() => {
        footer.classList.add('fade-in');
    }, 200 * (links.length + 1));
});

// Adiciona animação ao clicar nos links
const links = document.querySelectorAll('.link-card');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        // Não aplica animação no link do portfólio (página interna)
        if (!link.classList.contains('portfolio')) {
            e.preventDefault();
            link.classList.add('clicked');

            setTimeout(() => {
                window.open(link.href, '_blank');
                link.classList.remove('clicked');
            }, 300);
        }
    });
}); 