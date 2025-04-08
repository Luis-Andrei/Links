// Configurações iniciais
document.addEventListener('DOMContentLoaded', function () {
    // Inicializa todas as functionalities
    initializeDarkMode();
    initializeAnimations();
    initializeLinkCards();
    initializeVisitCounter();
    initializeDarkModeToggle();
    initializeTypewriterEffect();
    initializeSmoothScroll();
    initializeParallax();
    initializeNotifications();
    initializeAnalytics();
});

// Função para inicializar o modo escuro
function initializeDarkMode() {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('darkMode');

    if (savedMode === 'true' || (savedMode === null && prefersDarkMode)) {
        document.body.classList.add('dark-mode');
    }

    // Monitora mudanças na preferência do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem('darkMode') === null) {
            document.body.classList.toggle('dark-mode', e.matches);
        }
    });
}

// Função para inicializar as animações
function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        observer.observe(element);
    });
}

// Função para inicializar os cards de links
function initializeLinkCards() {
    document.querySelectorAll('.link-card').forEach(card => {
        // Efeito de clique
        card.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');

            // Animação de clique
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 300);

            // Efeito ripple
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.left = e.clientX + 'px';
            ripple.style.top = e.clientY + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);

            // Confetti
            createConfetti();

            // Notificação
            showNotification('Redirecionando...', 'info');

            // Redireciona após a animação
            setTimeout(() => {
                window.open(href, '_blank');
            }, 500);
        });

        // Efeito de hover
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });
}

// Função para inicializar o contador de visitas
function initializeVisitCounter() {
    let visits = localStorage.getItem('visits');
    if (!visits) {
        visits = 1;
    } else {
        visits = parseInt(visits) + 1;
    }
    localStorage.setItem('visits', visits);

    // Mostra notificação na primeira visita
    if (visits === 1) {
        showNotification('Bem-vindo! Esta é sua primeira visita.', 'success');
    }
}

// Função para inicializar o botão de modo escuro
function initializeDarkModeToggle() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ?
        '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        this.innerHTML = document.body.classList.contains('dark-mode') ?
            '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));

        showNotification(
            document.body.classList.contains('dark-mode') ?
                'Modo escuro ativado' : 'Modo claro ativado',
            'info'
        );
    });
}

// Função para efeito de máquina de escrever
function initializeTypewriterEffect() {
    const profileText = document.querySelector('.profile p');
    // Check if profileText exists before trying to access textContent
    if (!profileText) return;
    const text = profileText.textContent;
    profileText.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            profileText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    typeWriter();
}

// Função para scroll suave
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Função para efeito parallax
function initializeParallax() {
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        document.body.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    });
}

// Função para mostrar notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' :
        type === 'error' ? 'fas fa-exclamation-circle' :
            'fas fa-info-circle';

    notification.appendChild(icon);
    notification.appendChild(document.createTextNode(message));

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Função para criar confete
function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
    const confetti = document.createElement('div');
    confetti.className = 'confetti';

    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.appendChild(piece);
    }

    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
}

// Função para analytics básico
function initializeAnalytics() {
    // Registra tempo de permanência
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        console.log(`Tempo de permanência: ${timeSpent} segundos`);
    });

    // Registra resolução da tela
    console.log(`Resolução: ${window.innerWidth}x${window.innerHeight}`);

    // Registra navegador
    console.log(`Navegador: ${navigator.userAgent}`);
} 