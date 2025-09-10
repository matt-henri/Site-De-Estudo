// --- script.js ---

document.addEventListener('DOMContentLoaded', function() {
    // Referências aos elementos do DOM
    const header = document.querySelector('.header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navDesktop = document.querySelector('.nav-desktop'); // Usaremos para o menu mobile

    // --- Funcionalidade do Menu Mobile ---
    // Apenas para telas pequenas, o nav-desktop se tornará o menu mobile
    mobileMenuBtn.addEventListener('click', function() {
        // Alterna a classe 'is-open' no botão para animar o ícone
        this.classList.toggle('is-open'); 
        // Alterna a classe 'is-open' na navegação para mostrar/esconder o menu
        navDesktop.classList.toggle('is-open'); 
    });

    // --- Scroll Suave para links internos ---
    const links = document.querySelectorAll('a[href^="#"]');
    
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

    // --- Efeito de rolagem no Header ---
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Animação de Clique nos Botões ---
    const buttons = document.querySelectorAll('.btn-primary, .btn-contact');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Adiciona e remove a classe 'clicked' para a animação CSS
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 150);
        });
    });
});