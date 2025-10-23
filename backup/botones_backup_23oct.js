// botonés.js - añade listeners a los elementos con clase "boton" y abre la URL indicada en data-url-placeholder

document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('a.boton');
    if (!botones || botones.length === 0) return;

    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            // Obtener la URL del atributo data-url-placeholder
            const url = boton.getAttribute('data-url-placeholder');
            if (url && url.trim().length > 0) {
                // abrir en nueva pestaña
                window.open(url.trim(), '_blank');
            } else {
                // Si no hay URL, hacer un pequeño feedback visual
                boton.classList.add('sin-url');
                setTimeout(() => boton.classList.remove('sin-url'), 700);
            }
        });
    });
});
