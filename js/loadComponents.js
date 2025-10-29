// Cargar componentes dinámicamente
async function loadComponent(elementId, componentPath) {
    console.log(`Intentando cargar: ${componentPath}`);
    try {
        const response = await fetch(componentPath);
        console.log(`Respuesta de ${componentPath}:`, response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        console.log(`HTML recibido de ${componentPath}:`, html.substring(0, 100));
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const component = doc.querySelector('nav') || doc.querySelector('footer');
        
        if (component) {
            const container = document.getElementById(elementId);
            if (container) {
                container.innerHTML = component.outerHTML;
                console.log(`✓ Componente ${elementId} cargado exitosamente`);
            } else {
                console.error(`✗ No se encontró el elemento con id: ${elementId}`);
            }
        } else {
            console.error(`✗ No se encontró nav o footer en ${componentPath}`);
        }
    } catch (error) {
        console.error(`✗ Error cargando componente ${componentPath}:`, error);
    }
}

// Cargar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, iniciando carga de componentes...');
    console.log('Ruta actual:', window.location.pathname);
    
    // Ruta relativa desde pages/
    loadComponent('navbar-component', 'components/navbar.html');
    loadComponent('footer-component', 'components/footer.html');
});