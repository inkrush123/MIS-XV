// Crear el Intersection Observer para las animaciones de vestimenta
const observerOptions = {
    root: null,
    // Disparar incluso cuando el elemento esté cerca de entrar (20% antes de entrar)
    rootMargin: '0px 0px -20% 0px',
    // Umbral reducido para disparar las animaciones antes (más sensible al scroll)
    threshold: 0.25
};

console.log('[observer] Inicializando observer con opciones:', observerOptions);
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target && entry.target.id;
        const isVisible = entry.isIntersecting;
        console.log(`[observer] entrada detectada id=${id} isIntersecting=${isVisible} ratio=${entry.intersectionRatio}`);

        // SECCION 4 - Vestimenta
        if (id === 'seccion4') {
            const vestimentaItems = document.querySelectorAll('.vestimenta-item');
            vestimentaItems.forEach(item => item.classList.toggle('visible', isVisible));
        }

        // SECCION 5 - Cartas (se muestra/oculta en secuencia)
        if (id === 'seccion5') {
            const cartas = document.querySelectorAll('.carta-item');
            if (isVisible) {
                cartas.forEach((carta, idx) => setTimeout(() => carta.classList.add('visible'), idx * 120));
            } else {
                // Remover en orden inverso para un efecto agradable
                Array.from(cartas).reverse().forEach((carta, idx) => setTimeout(() => carta.classList.remove('visible'), idx * 80));
            }
        }

        // SECCION 6 - Nombramientos (carta-4) -> aparecer una vez y quedarse visible
        if (id === 'seccion6') {
            const carta4 = document.querySelector('.carta-item.carta-4');
            if (carta4 && isVisible) {
                if (!carta4.classList.contains('visible')) {
                    carta4.classList.add('visible');
                    console.log('[observer] seccion6: carta-4 ahora visible (persistente)');
                }
            }
        }

        // SECCION 7 - Itinerario
        if (id === 'seccion7') {
            const itinerario = document.querySelector('.itinerario-content');
            if (itinerario) itinerario.classList.toggle('visible', isVisible);
        }

        // SECCIONES 8/9/10 - Galería: mostrar fotos escalonadas al entrar y ocultar al salir
        if (['seccion8', 'seccion9', 'seccion10'].includes(id)) {
            const fotos = entry.target.querySelectorAll('.foto-item');
            if (isVisible) {
                fotos.forEach((foto, idx) => setTimeout(() => foto.classList.add('visible'), idx * 200));
            } else {
                Array.from(fotos).reverse().forEach((foto, idx) => setTimeout(() => foto.classList.remove('visible'), idx * 120));
            }
        }
    });
}, observerOptions);

// Comenzar a observar la sección de vestimenta
document.addEventListener('DOMContentLoaded', () => {
    const seccionVestimenta = document.getElementById('seccion4');
    if (seccionVestimenta) {
        observer.observe(seccionVestimenta);
    }
    const seccionCartas = document.getElementById('seccion5');
    if (seccionCartas) {
        observer.observe(seccionCartas);
    }
    const seccionNombramientos = document.getElementById('seccion6');
    if (seccionNombramientos) {
        observer.observe(seccionNombramientos);
    }
    const seccionItinerario = document.getElementById('seccion7');
    if (seccionItinerario) {
        observer.observe(seccionItinerario);
    }
    // Observar secciones de galería
    const seccionesGaleria = ['seccion8', 'seccion9', 'seccion10'];
    seccionesGaleria.forEach(id => {
        const seccion = document.getElementById(id);
        if (seccion) {
            observer.observe(seccion);
        }
    });
    // Fallback: si la seccion de cartas ya está visible en carga, añadir visible inmediatamente
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (rect.top < window.innerHeight && rect.bottom > 0);
    }

    // Aplicar estado inicial (toggle) según visibilidad al cargar
    if (seccionCartas) {
        const cartas = document.querySelectorAll('.carta-item');
        const inView = isElementInViewport(seccionCartas);
        if (inView) {
            cartas.forEach((carta, idx) => setTimeout(() => carta.classList.add('visible'), idx * 120));
        } else {
            cartas.forEach(carta => carta.classList.remove('visible'));
        }
    }
    // Fallback para nombramientos (removido: carta-4 eliminada)
    // Fallback para itinerario
    const seccionItinerarioEl = document.getElementById('seccion7');
    if (seccionItinerarioEl) {
        const itinerario = document.querySelector('.itinerario-content');
        if (itinerario) itinerario.classList.toggle('visible', isElementInViewport(seccionItinerarioEl));
    }
    // Reintentar al terminar de cargar recursos pesados
    window.addEventListener('load', () => {
        if (seccionCartas && isElementInViewport(seccionCartas)) {
            const cartas = document.querySelectorAll('.carta-item');
            cartas.forEach((carta, idx) => setTimeout(() => carta.classList.add('visible'), idx * 120));
        }
    });

    // --- Fallback por scroll para carta-4 (diagnóstico y robustez) ---
    const carta4El = document.querySelector('.carta-item.carta-4');
    function checkCarta4Visibility() {
        if (!carta4El) return;
        if (carta4El.classList.contains('visible')) return; // ya visible, nada que hacer
        const rect = carta4El.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        // Si la carta está dentro del 85% inferior del viewport, activarla
        if (rect.top < vh * 0.85 && rect.bottom > 0) {
            console.log('[fallback] Activando carta-4 por fallback de scroll. rect.top=', rect.top, 'vh=', vh);
            carta4El.classList.add('visible');
        }
    }

    // throttle con rAF
    let rafScheduled = false;
    function onScrollFallback() {
        if (rafScheduled) return;
        rafScheduled = true;
        requestAnimationFrame(() => {
            rafScheduled = false;
            checkCarta4Visibility();
        });
    }

    window.addEventListener('scroll', onScrollFallback, { passive: true });
    window.addEventListener('resize', onScrollFallback);
    // ejecutar una vez en carga
    checkCarta4Visibility();

    // Diagnóstico: escuchar carga/error de la imagen de carta-4
    if (carta4El) {
        const img = carta4El.querySelector('img');
        if (img) {
            if (img.complete) {
                console.log('[diag] imagen carta-4 ya cargada:', img.src);
            } else {
                img.addEventListener('load', () => console.log('[diag] imagen carta-4 carga OK:', img.src));
                img.addEventListener('error', () => console.error('[diag] imagen carta-4 FALLÓ al cargar:', img.src));
            }
        } else {
            console.warn('[diag] carta-4 no contiene <img>');
        }
    } else {
        console.warn('[diag] carta-4 no encontrada en el DOM (fallback)');
    }
});