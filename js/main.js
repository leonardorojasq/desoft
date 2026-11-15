
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
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 20);
        }
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

    // REVELAR ELEMENTOS AL DESPLAZARSE
    const animatedElements = document.querySelectorAll(
        ".portfolio-card, .portfolio-hero-stats div"
    );

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        animatedElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        animatedElements.forEach(element => {
            element.classList.add("visible");
        });
    }

    // EVITAR ESTADOS INCORRECTOS AL CAMBIAR EL TAMAÑO
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });
});
