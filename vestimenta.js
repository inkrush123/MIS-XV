// Crear el Intersection Observer para las animaciones de vestimenta
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target && entry.target.id;
        const isVisible = entry.isIntersecting;

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

        // SECCION 6 - Nombramientos (carta-4)
        if (id === 'seccion6') {
            const carta4 = document.querySelector('.carta-item.carta-4');
            if (carta4) carta4.classList.toggle('visible', isVisible);
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
    // Fallback para nombramientos (carta-4)
    const seccionNombramientosEl = document.getElementById('seccion6');
    if (seccionNombramientosEl) {
        const carta4 = document.querySelector('.carta-item.carta-4');
        if (carta4) carta4.classList.toggle('visible', isElementInViewport(seccionNombramientosEl));
    }
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
});