// --- script.js ---

document.addEventListener('DOMContentLoaded', function() {
    // Referências aos elementos do DOM
    const header = document.querySelector('.header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navDesktop = document.querySelector('.nav-desktop');
    const navLinks = document.querySelectorAll('.nav-link');
    const links = document.querySelectorAll('a[href^="#"]');
    const buttons = document.querySelectorAll('.btn-primary, .btn-contact');

    // --- Funcionalidade do Menu Mobile ---
    mobileMenuBtn.addEventListener('click', function() {
        // Alterna a classe 'is-open' no botão para animar o ícone
        this.classList.toggle('is-open'); 
        // Alterna a classe 'is-open' na navegação para mostrar/esconder o menu
        navDesktop.classList.toggle('is-open'); 
    });

    // Fecha o menu mobile ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuBtn.classList.contains('is-open')) {
                mobileMenuBtn.classList.remove('is-open');
                navDesktop.classList.remove('is-open');
            }
        });
    });

    // --- Scroll Suave para links internos ---
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Efeito de rolagem no Header com Debounce para performance ---
    // A função debounce limita a frequência com que uma função é executada.
    // Neste caso, a função de rolagem só será executada 200ms após o usuário parar de rolar.
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    const handleScroll = () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', debounce(handleScroll, 100));

    // --- Animação de Clique nos Botões ---
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 150);
        });
    });
});