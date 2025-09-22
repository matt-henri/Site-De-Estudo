// --- script.js APRIMORADO ---

document.addEventListener('DOMContentLoaded', function() {
    // Referências aos elementos do DOM
    const header = document.querySelector('.header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navDesktop = document.querySelector('.nav-desktop');
    const navLinks = document.querySelectorAll('.nav-link');
    const links = document.querySelectorAll('a[href^="#"]');
    const buttons = document.querySelectorAll('.btn-primary, .btn-contact');

    // --- NOVA FUNCIONALIDADE: Animações de Entrada ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplica animação de entrada aos elementos
    const animatedElements = document.querySelectorAll('.tech-card, .content-block, .hero-text');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // --- NOVA FUNCIONALIDADE: Tooltip Informativo ---
    function createTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 0.5rem 0.75rem;
            border-radius: 0.5rem;
            font-size: 0.9rem;
            pointer-events: none;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            z-index: 1000;
            max-width: 200px;
            text-align: center;
        `;
        document.body.appendChild(tooltip);

        element.addEventListener('mouseenter', (e) => {
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        });

        element.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(-10px)';
        });
    }

    // Adiciona tooltips aos cards de tecnologia
    document.querySelectorAll('.tech-card').forEach(card => {
        const title = card.querySelector('h3').textContent;
        let tooltipText = '';
        
        switch(title) {
            case 'Uso Básico':
                tooltipText = 'Aprenda os primeiros passos com smartphone e tablet';
                break;
            case 'Segurança':
                tooltipText = 'Proteja-se de golpes e navegue com segurança';
                break;
            case 'Bancos':
                tooltipText = 'Use apps bancários sem sair de casa';
                break;
            case 'Redes Sociais':
                tooltipText = 'Conecte-se com família e amigos';
                break;
            case 'Lazer':
                tooltipText = 'Entretenimento e diversão digital';
                break;
            case 'Saúde':
                tooltipText = 'Gerencie sua saúde com tecnologia';
                break;
        }
        
        if (tooltipText) {
            createTooltip(card, tooltipText);
        }
    });

    // --- NOVA FUNCIONALIDADE: Botão "Voltar ao Topo" ---
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: var(--gradiente-botao);
        color: white;
        font-size: 1.5rem;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.25);
    `;
    document.body.appendChild(backToTopBtn);

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- NOVA FUNCIONALIDADE: Indicador de Progresso de Leitura ---
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--gradiente-botao);
        z-index: 1001;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    // --- FUNCIONALIDADE APRIMORADA: Menu Mobile com correção ---
    function toggleMobileMenu() {
        if (!mobileMenuBtn || !navDesktop) return;
        
        mobileMenuBtn.classList.toggle('is-open');
        navDesktop.classList.toggle('is-open');
        
        // Previne scroll quando menu está aberto
        document.body.style.overflow = mobileMenuBtn.classList.contains('is-open') ? 'hidden' : '';
    }

    // Adiciona a função ao escopo global para uso no HTML
    window.toggleMobileMenu = toggleMobileMenu;


    // Fecha o menu mobile ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuBtn.classList.contains('is-open')) {
                toggleMobileMenu();
            }
        });
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !navDesktop.contains(e.target)) {
            if (mobileMenuBtn.classList.contains('is-open')) {
                toggleMobileMenu();
            }
        }
    });

    // --- FUNCIONALIDADE APRIMORADA: Scroll Suave e Indicadores ---
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- FUNCIONALIDADE APRIMORADA: Efeitos de Scroll com múltiplas funcionalidades ---
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
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        // Atualiza header
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Atualiza barra de progresso
        progressBar.style.width = scrollPercent + '%';

        // Mostra/esconde botão voltar ao topo
        if (scrollTop > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.transform = 'translateY(20px)';
        }
    };
    
    window.addEventListener('scroll', debounce(handleScroll, 16)); // ~60fps

    // --- NOVA FUNCIONALIDADE: Feedback Visual Aprimorado para Botões ---
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Efeito ripple
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const diameter = Math.max(rect.width, rect.height);
            const radius = diameter / 2;

            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                background-color: rgba(255, 255, 255, 0.6);
                width: ${diameter}px;
                height: ${diameter}px;
                left: ${e.clientX - rect.left - radius}px;
                top: ${e.clientY - rect.top - radius}px;
                pointer-events: none;
            `;

            // Adiciona animação CSS se não existir
            if (!document.querySelector('#ripple-style')) {
                const style = document.createElement('style');
                style.id = 'ripple-style';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            // Remove o elemento após a animação
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Efeito hover aprimorado
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // --- NOVA FUNCIONALIDADE: Mensagens de Encorajamento ---
    const encouragementMessages = [
        "Você está indo muito bem! Continue explorando.",
        "Que orgulho! Você está dominando a tecnologia.",
        "Parabéns! Cada clique é um passo rumo à independência digital.",
        "Excelente! Você está se tornando um expert digital.",
        "Muito bem! A tecnologia está ao seu alcance."
    ];

    let interactionCount = 0;
    const showEncouragement = () => {
        interactionCount++;
        if (interactionCount % 5 === 0) { // A cada 5 interações
            const message = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
            
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--gradiente-botao);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 0.75rem;
                max-width: 300px;
                box-shadow: 0 4px 12px rgba(0, 123, 255, 0.25);
                z-index: 1002;
                transform: translateX(350px);
                transition: transform 0.4s ease;
                font-size: 0.95rem;
                line-height: 1.4;
            `;
            notification.textContent = message;
            document.body.appendChild(notification);

            // Anima entrada
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);

            // Remove após 4 segundos
            setTimeout(() => {
                notification.style.transform = 'translateX(350px)';
                setTimeout(() => notification.remove(), 400);
            }, 4000);
        }
    };

    // Adiciona contador de interações
    document.addEventListener('click', showEncouragement);



    console.log('🎉 Site de Inclusão Digital carregado com sucesso!');
    console.log('📱 Funcionalidades interativas ativadas');
});

// --- FUNÇÃO UTILITÁRIA: Controle de Fonte ---
let currentFontSize = 16;
function adjustFontSize(direction) {
    if (direction === 'increase' && currentFontSize < 24) {
        currentFontSize += 2;
    } else if (direction === 'decrease' && currentFontSize > 12) {
        currentFontSize -= 2;
    }
    document.documentElement.style.fontSize = currentFontSize + 'px';
    localStorage.setItem('preferred_font_size', currentFontSize);
}

// Carrega tamanho de fonte salvo
const savedFontSize = localStorage.getItem('preferred_font_size');
if (savedFontSize) {
    currentFontSize = parseInt(savedFontSize);
    document.documentElement.style.fontSize = currentFontSize + 'px';
}

// Expõe função para uso global
window.adjustFontSize = adjustFontSize;