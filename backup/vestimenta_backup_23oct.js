// Crear el Intersection Observer para las animaciones de vestimenta
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Si la sección es visible, activar las animaciones
            if (entry.target && entry.target.id === 'seccion4') {
                const vestimentaItems = document.querySelectorAll('.vestimenta-item');
                vestimentaItems.forEach(item => item.classList.add('visible'));
                observer.unobserve(entry.target);
            }

            if (entry.target && entry.target.id === 'seccion5') {
                const cartas = document.querySelectorAll('.carta-item');
                // Añadir visible en orden con pequeños delays (CSS maneja transition-delay)
                cartas.forEach((carta, idx) => {
                    // Añadir clase con un ligero timeout para garantizar secuencia
                    setTimeout(() => carta.classList.add('visible'), idx * 120);
                });
                observer.unobserve(entry.target);
            }
            
            if (entry.target && entry.target.id === 'seccion6') {
                // Mostrar la carta-4 dentro de la sección de nombramientos
                const carta4 = document.querySelector('.carta-item.carta-4');
                if (carta4) {
                    setTimeout(() => carta4.classList.add('visible'), 50);
                }
                observer.unobserve(entry.target);
            }

            if (entry.target && entry.target.id === 'seccion7') {
                // Mostrar el contenido del itinerario desde arriba hacia abajo
                const itinerario = document.querySelector('.itinerario-content');
                if (itinerario) {
                    setTimeout(() => itinerario.classList.add('visible'), 60);
                }
                observer.unobserve(entry.target);
            }

            // Manejar las secciones de galería
            if (entry.target && ['seccion8', 'seccion9', 'seccion10'].includes(entry.target.id)) {
                const fotos = entry.target.querySelectorAll('.foto-item');
                fotos.forEach((foto, idx) => {
                    setTimeout(() => foto.classList.add('visible'), idx * 200);
                });
                observer.unobserve(entry.target);
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

    if (seccionCartas && isElementInViewport(seccionCartas)) {
        const cartas = document.querySelectorAll('.carta-item');
        cartas.forEach((carta, idx) => setTimeout(() => carta.classList.add('visible'), idx * 120));
    }
    // Fallback para nombramientos (carta-4)
    const seccionNombramientosEl = document.getElementById('seccion6');
    if (seccionNombramientosEl && isElementInViewport(seccionNombramientosEl)) {
        const carta4 = document.querySelector('.carta-item.carta-4');
        if (carta4) setTimeout(() => carta4.classList.add('visible'), 50);
    }
    // Fallback para itinerario
    const seccionItinerarioEl = document.getElementById('seccion7');
    if (seccionItinerarioEl && isElementInViewport(seccionItinerarioEl)) {
        const itinerario = document.querySelector('.itinerario-content');
        if (itinerario) setTimeout(() => itinerario.classList.add('visible'), 60);
    }
    // Reintentar al terminar de cargar recursos pesados
    window.addEventListener('load', () => {
        if (seccionCartas && isElementInViewport(seccionCartas)) {
            const cartas = document.querySelectorAll('.carta-item');
            cartas.forEach((carta, idx) => setTimeout(() => carta.classList.add('visible'), idx * 120));
        }
    });
});