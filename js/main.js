
document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");
    const navLinks = document.querySelectorAll(".nav-link");
    const currentYear = document.getElementById("currentYear");

    // Año automático
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Efecto del encabezado al desplazarse
    window.addEventListener("scroll", () => {
        header?.classList.toggle("scrolled", window.scrollY > 20);
    });

    // Abrir y cerrar menú móvil
    menuToggle?.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Cerrar menú" : "Abrir menú"
        );
    });

    // Cerrar menú al seleccionar una opción
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navigation?.classList.remove("open");
            menuToggle?.classList.remove("active");
            menuToggle?.setAttribute("aria-expanded", "false");
            menuToggle?.setAttribute("aria-label", "Abrir menú");
        });
    });

    // Marcar sección activa al navegar
    const sections = document.querySelectorAll(
        "#inicio, #servicios, #soluciones, #tecnologias, #nosotros"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${entry.target.id}`
                        );
                    });
                }
            });
        }, {
            rootMargin: "-30% 0px -60% 0px"
        });

        sections.forEach(section => observer.observe(section));
    }
});
