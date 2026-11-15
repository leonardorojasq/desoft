
document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");
    const navLinks = document.querySelectorAll(".nav-link");
    const currentYear = document.getElementById("currentYear");

    // AÑO AUTOMÁTICO DEL FOOTER
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // EFECTO DEL HEADER AL HACER SCROLL
    const updateHeader = () => {
        header?.classList.toggle("scrolled", window.scrollY > 20);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    // MENÚ RESPONSIVE
    const closeMenu = () => {
        navigation?.classList.remove("open");
        menuToggle?.classList.remove("active");
        menuToggle?.setAttribute("aria-expanded", "false");
        menuToggle?.setAttribute("aria-label", "Abrir menú");
    };

    menuToggle?.addEventListener("click", () => {
        if (!navigation) return;

        const isOpen = navigation.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Cerrar menú" : "Abrir menú"
        );
    });

    // CERRAR MENÚ AL SELECCIONAR UN ENLACE
    navLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // CERRAR MENÚ AL HACER CLIC FUERA
    document.addEventListener("click", event => {
        if (
            navigation?.classList.contains("open") &&
            !navigation.contains(event.target) &&
            !menuToggle?.contains(event.target)
        ) {
            closeMenu();
        }
    });

    // CERRAR MENÚ CON ESCAPE
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    // NAVEGACIÓN ACTIVA EN INDEX
    const sections = document.querySelectorAll(
        "#inicio, #servicios, #soluciones, #azure, #inteligencia-artificial, #tecnologias, #nosotros"
    );

    if ("IntersectionObserver" in window && sections.length) {
        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const activeLink = document.querySelector(
                    `.nav-link[href="#${entry.target.id}"]`
                );

                if (activeLink) {
                    navLinks.forEach(link => {
                        link.classList.toggle("active", link === activeLink);
                    });
                }
            });
        }, {
            rootMargin: "-30% 0px -60% 0px"
        });

        sections.forEach(section => sectionObserver.observe(section));
    }

    // FILTROS DEL PORTAFOLIO
    const filterButtons = document.querySelectorAll(".portfolio-filter");
    const portfolioCards = document.querySelectorAll(".portfolio-card");

    if (filterButtons.length && portfolioCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                const selectedFilter = button.dataset.filter;

                // ACTUALIZAR BOTÓN ACTIVO
                filterButtons.forEach(filterButton => {
                    const isActive = filterButton === button;

                    filterButton.classList.toggle("active", isActive);
                    filterButton.setAttribute(
                        "aria-pressed",
                        String(isActive)
                    );
                });

                // FILTRAR PROYECTOS
                portfolioCards.forEach(card => {
                    const category = card.dataset.category;
                    const shouldShow =
                        selectedFilter === "all" ||
                        category === selectedFilter;

                    card.hidden = !shouldShow;
                });
            });
        });
    }

    // CERRAR MENÚ AL CAMBIAR A ESCRITORIO
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });
});
