document.addEventListener('DOMContentLoaded', () => {
    const scroller = document.getElementById('scroller');
    const sections = document.querySelectorAll('.section');
    const navDots = document.getElementById('nav-dots');
    
    // Создаем точки навигации
    sections.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.dataset.index = index;
        navDots.appendChild(dot);
        
        dot.addEventListener('click', () => {
            sections[index].scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Обновляем активную точку
    function updateActiveDot() {
        const scrollPosition = scroller.scrollTop;
        const dots = document.querySelectorAll('.dot');
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop - 50 && 
                scrollPosition < sectionTop + sectionHeight - 50) {
                dots.forEach(d => d.classList.remove('active'));
                dots[index].classList.add('active');
            }
        });
    }
    
    // Обработка скролла
    scroller.addEventListener('scroll', updateActiveDot);
    
    // Обработка клавиатуры
    document.addEventListener('keydown', (e) => {
        const currentSectionIndex = Math.floor(scroller.scrollTop / window.innerHeight);
        
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            const nextSection = sections[currentSectionIndex + 1];
            if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
            e.preventDefault();
        }
        
        if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            const prevSection = sections[currentSectionIndex - 1];
            if (prevSection) prevSection.scrollIntoView({ behavior: 'smooth' });
            e.preventDefault();
        }
    });
    
    // Инициализация
    updateActiveDot();


    const wheel = document.querySelector('.wheel');
    const mouse = document.querySelector('.mouse');
    const container = document.querySelector('.container');
    const animationDuration = 2000; // Длительность одного цикла в мс
    const wheelHeight = 50; // Высота колесика
    const mouseHeight = mouse.offsetHeight;
    
    // Функция анимации колесика
    function animateWheel(time) {
        // Рассчитываем прогресс анимации (0-1)
        const progress = (time % animationDuration) / animationDuration;
        
        // Рассчитываем новую позицию колесика
        // Используем синусоиду для плавного движения вверх-вниз
        const position = (1 - Math.sin(progress * Math.PI)) * (mouseHeight - wheelHeight);
        
        // Применяем позицию
        wheel.style.transform = `translateY(${position / 2}px)`;
        
        // Продолжаем анимацию
        requestAnimationFrame(animateWheel);
    }
    
    // Запускаем анимацию
    requestAnimationFrame(animateWheel);
    
    // Добавляем интерактивность при наведении
    mouse.addEventListener('mouseenter', () => {
        mouse.style.transform = 'scale(1.05)';
        mouse.style.transition = 'transform 0.3s ease';
    });
    
    mouse.addEventListener('mouseleave', () => {
        mouse.style.transform = 'scale(1)';
    });
    
    // Эффект при клике
    mouse.addEventListener('mousedown', () => {
        mouse.style.transform = 'scale(0.95)';
        mouse.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    });
    
    mouse.addEventListener('mouseup', () => {
        mouse.style.transform = 'scale(1.05)';
        mouse.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.5)';
    });
});