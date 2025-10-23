// --- CUENTA REGRESIVA ---
function actualizarCuentaRegresiva() {
    // Fecha objetivo: 29 de noviembre (mes 10, ya que los meses son de 0 a 11) a las 3 PM (15:00:00)
    // Cambia el año si es necesario
    const fechaObjetivo = new Date('November 29, 2025 15:00:00').getTime(); 
    
    const ahora = new Date().getTime();
    const distancia = fechaObjetivo - ahora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById('dias').innerHTML = String(dias).padStart(2, '0');
    document.getElementById('horas').innerHTML = String(horas).padStart(2, '0');
    document.getElementById('minutos').innerHTML = String(minutos).padStart(2, '0');
    document.getElementById('segundos').innerHTML = String(segundos).padStart(2, '0');

    // Si la cuenta regresiva termina
    if (distancia < 0) {
        clearInterval(x);
        document.getElementById('countdown-section').innerHTML = '<div class="container-centered">¡Llegó el Gran Día!</div>';
    }
}

// Actualiza la cuenta regresiva cada segundo
const x = setInterval(actualizarCuentaRegresiva, 1000);
actualizarCuentaRegresiva(); // Ejecuta una vez al cargar para evitar el parpadeo inicial


// --- SCROLLREVEAL (Animaciones al hacer scroll) ---
ScrollReveal().reveal('.reveal-zoom', {
    duration: 900,
    scale: 0.6,
    opacity: 0,
    easing: 'ease-in-out',
    distance: '0px'
});

ScrollReveal().reveal('.reveal-left-out', {
    duration: 1000,
    origin: 'left',
    distance: '100%', // Viene desde el 100% de la izquierda (fuera de la pantalla)
    opacity: 0,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Easing suave
});

ScrollReveal().reveal('.reveal-right-out', {
    duration: 1000,
    origin: 'right',
    distance: '100%', // Viene desde el 100% de la derecha (fuera de la pantalla)
    opacity: 0,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Easing suave
});

// Animación escalonada para las unidades de la cuenta regresiva
ScrollReveal().reveal('.contenedor-cuenta .unidad', {
    duration: 700,
    distance: '30px',
    origin: 'bottom',
    opacity: 0,
    interval: 100 // Retraso entre cada elemento
});

// Animación escalonada para las cartas de eventos
ScrollReveal().reveal('.cartas-contenedor .carta', {
    duration: 800,
    distance: '50px',
    origin: 'bottom',
    opacity: 0,
    interval: 100 // Retraso entre cada carta
});

// Animación para el itinerario (zoom, como "poco a poco")
ScrollReveal().reveal('#itinerario .itinerario-img', {
    duration: 1200,
    scale: 0.8,
    opacity: 0,
    easing: 'ease-in-out',
    distance: '0px'
});

// Animación escalonada para la galería de momentos
ScrollReveal().reveal('.galeria-item', {
    duration: 600,
    distance: '50px',
    origin: 'right', // Desplazamiento de derecha a izquierda
    opacity: 0,
    easing: 'ease-in-out',
    interval: 150 // Retraso entre cada imagen
});
