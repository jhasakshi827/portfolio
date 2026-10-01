document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       1. MOBILE NAVIGATION
    ========================================================= */

    const mobileMenu = document.querySelector(".mobile-menu-button");
    const navMenu = document.querySelector(".nav-links");

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener("click", () => {
            navMenu.classList.toggle("open");
            mobileMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                mobileMenu.classList.remove("active");
            });
        });
    }


    /* =========================================================
       2. SMOOTH SCROLL
    ========================================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            e.preventDefault();

            const header = document.querySelector(".site-header");
            const headerHeight = header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                20;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });

    });


    /* =========================================================
       3. SCROLL REVEAL ANIMATION
    ========================================================= */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =========================================================
       4. SKILL PROGRESS BARS
    ========================================================= */

    const progressBars = document.querySelectorAll(".progress span");

    if ("IntersectionObserver" in window) {

        const progressObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const bar = entry.target;
                        const progress = bar.dataset.progress;

                        if (progress) {
                            bar.style.width = `${progress}%`;
                        }

                        observer.unobserve(bar);
                    }

                });

            },
            {
                threshold: 0.3
            }
        );

        progressBars.forEach(bar => {
            progressObserver.observe(bar);
        });

    } else {

        progressBars.forEach(bar => {

            const progress = bar.dataset.progress;

            if (progress) {
                bar.style.width = `${progress}%`;
            }

        });

    }


    /* =========================================================
       5. ACTIVE NAVIGATION
    ========================================================= */

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    if ("IntersectionObserver" in window && sections.length) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const currentId = entry.target.getAttribute("id");

                        navigationLinks.forEach(link => {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") ===
                                `#${currentId}`
                            ) {
                                link.classList.add("active");
                            }

                        });

                    }

                });

            },
            {
                rootMargin: "-20% 0px -60% 0px",
                threshold: 0
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    /* =========================================================
       6. SCROLL PROGRESS BAR
    ========================================================= */

    const scrollProgress = document.querySelector("#scrollProgress");

    function updateScrollProgress() {

        if (!scrollProgress) return;

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (documentHeight <= 0) {
            scrollProgress.style.width = "0%";
            return;
        }

        const progress =
            (scrollTop / documentHeight) * 100;

        scrollProgress.style.width = `${progress}%`;
    }

    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );

    updateScrollProgress();


    /* =========================================================
       7. CARD TILT EFFECT
    ========================================================= */

    const tiltCards = document.querySelectorAll(".tilt-card");

    tiltCards.forEach(card => {

        card.addEventListener("mousemove", event => {

            if (window.innerWidth < 800) return;

            const rect = card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -3;

            const rotateY =
                ((x - centerX) / centerX) * 3;

            card.style.setProperty(
                "--mouse-x",
                `${x}px`
            );

            card.style.setProperty(
                "--mouse-y",
                `${y}px`
            );

            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-4px)`;
        });


        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";

        });

    });


    /* =========================================================
       8. FILE EXPLORER INTERACTION
    ========================================================= */

    const explorerRows = document.querySelectorAll(".tree-row");

    const explorerMap = {
        home: "developer.js",
        about: "profile.txt",
        skills: "skills.json",
        experience: "experience.log",
        projects: "projects.php",
        education: "education.json",
        contact: "contact.sh"
    };


    explorerRows.forEach(row => {

        row.addEventListener("click", () => {

            explorerRows.forEach(item => {
                item.classList.remove("active");
            });

            row.classList.add("active");

            const fileName =
                row.dataset.file ||
                row.textContent.trim();

            const targetFile =
                explorerMap[fileName] ||
                fileName;

            console.log(
                `%c[portfolio] Opening ${targetFile}`,
                "color:#00ff9c;font-weight:bold;"
            );

        });

    });


    /* =========================================================
       9. NAVIGATION → FILE EXPLORER
    ========================================================= */

    navigationLinks.forEach(link => {

        link.addEventListener("click", () => {

            const target = link
                .getAttribute("href")
                ?.replace("#", "");

            explorerRows.forEach(row => {
                row.classList.remove("active");
            });

            const matchingRow =
                document.querySelector(
                    `.tree-row[data-section="${target}"]`
                );

            if (matchingRow) {
                matchingRow.classList.add("active");
            }

        });

    });


    /* =========================================================
       10. FOOTER YEAR
    ========================================================= */

    const footerYear = document.querySelector("#footerYear");

    if (footerYear) {
        footerYear.textContent =
            new Date().getFullYear();
    }


    /* =========================================================
       11. EXTERNAL LINKS
    ========================================================= */

    document.querySelectorAll("a").forEach(link => {

        const href = link.getAttribute("href");

        if (
            href &&
            (
                href.startsWith("http://") ||
                href.startsWith("https://")
            )
        ) {

            link.setAttribute("target", "_blank");

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }

    });


    /* =========================================================
       12. KEYBOARD SHORTCUT
       Press "/" to focus navigation
    ========================================================= */

    document.addEventListener("keydown", event => {

        if (
            event.key === "/" &&
            !["INPUT", "TEXTAREA"].includes(
                document.activeElement.tagName
            )
        ) {

            event.preventDefault();

            const firstNav =
                document.querySelector(".nav-links a");

            if (firstNav) {
                firstNav.focus();
            }

        }

    });


    /* =========================================================
       13. CODE EDITOR LINE HOVER
    ========================================================= */

    const codeLines =
        document.querySelectorAll(".code-line");

    codeLines.forEach(line => {

        line.addEventListener("mouseenter", () => {
            line.classList.add("line-active");
        });

        line.addEventListener("mouseleave", () => {
            line.classList.remove("line-active");
        });

    });


    /* =========================================================
       14. TERMINAL TYPEWRITER
    ========================================================= */

    const terminalCommand =
        document.querySelector(".terminal-command");

    if (terminalCommand) {

        const command =
            terminalCommand.dataset.command ||
            "npm run developer";

        terminalCommand.textContent = "";

        let index = 0;

        function typeCommand() {

            if (index < command.length) {

                terminalCommand.textContent +=
                    command.charAt(index);

                index++;

                setTimeout(typeCommand, 65);

            }

        }

        setTimeout(typeCommand, 800);

    }


    /* =========================================================
       15. TERMINAL CURSOR BLINK
    ========================================================= */

    const terminalCursors =
        document.querySelectorAll(".terminal-cursor");

    terminalCursors.forEach(cursor => {

        let visible = true;

        setInterval(() => {

            visible = !visible;

            cursor.style.opacity =
                visible ? "1" : "0";

        }, 500);

    });


    /* =========================================================
       16. API STATUS WINDOW
    ========================================================= */

    const apiCards =
        document.querySelectorAll(".api-card");

    apiCards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.classList.add("api-active");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("api-active");
        });

    });


    /* =========================================================
       17. BACKGROUND PARALLAX GLOW
    ========================================================= */

    const glowOne =
        document.querySelector(".glow-one");

    const glowTwo =
        document.querySelector(".glow-two");


    document.addEventListener("mousemove", event => {

        if (window.innerWidth < 900) return;

        const x =
            (event.clientX / window.innerWidth) - 0.5;

        const y =
            (event.clientY / window.innerHeight) - 0.5;


        if (glowOne) {

            glowOne.style.transform =
                `translate(${x * 35}px, ${y * 35}px)`;

        }


        if (glowTwo) {

            glowTwo.style.transform =
                `translate(${x * -25}px, ${y * -25}px)`;

        }

    });


    /* =========================================================
       18. PROJECT CARD HOVER
    ========================================================= */

    const projectCards =
        document.querySelectorAll(".project-card");

    projectCards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.classList.add("project-hover");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("project-hover");
        });

    });


    /* =========================================================
       19. WEBSITE STRIP ANIMATION
    ========================================================= */

    const websiteStrip =
        document.querySelector(".website-strip");

    if (websiteStrip) {

        websiteStrip.addEventListener("mouseenter", () => {
            websiteStrip.classList.add("active");
        });

        websiteStrip.addEventListener("mouseleave", () => {
            websiteStrip.classList.remove("active");
        });

    }


    /* =========================================================
       20. CONTACT BUTTON FEEDBACK
    ========================================================= */

    const contactButtons =
        document.querySelectorAll(".contact-btn");

    contactButtons.forEach(button => {

        button.addEventListener("click", () => {

            button.classList.add("clicked");

            setTimeout(() => {
                button.classList.remove("clicked");
            }, 500);

        });

    });


    /* =========================================================
       21. RESUME DOWNLOAD TRACKING
    ========================================================= */

    const resumeLink =
        document.querySelector(".resume-link");

    if (resumeLink) {

        resumeLink.addEventListener("click", () => {

            console.log(
                "%c[portfolio] Resume requested",
                "color:#00ff9c;font-weight:bold;"
            );

        });

    }


    /* =========================================================
       22. COPY EMAIL
    ========================================================= */

    const emailElements =
        document.querySelectorAll(
            '[data-copy-email]'
        );

    emailElements.forEach(element => {

        element.addEventListener("click", async () => {

            const email =
                element.dataset.copyEmail;

            if (!email) return;

            try {

                await navigator.clipboard.writeText(email);

                const originalText =
                    element.textContent;

                element.textContent =
                    "Email Copied ✓";

                setTimeout(() => {
                    element.textContent =
                        originalText;
                }, 1500);

            } catch (error) {

                console.log(
                    "Unable to copy email."
                );

            }

        });

    });


    /* =========================================================
       23. CURRENT YEAR
    ========================================================= */

    document.querySelectorAll(
        "[data-current-year]"
    ).forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =========================================================
       24. REDUCED MOTION SUPPORT
    ========================================================= */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (prefersReducedMotion) {

        document.documentElement.classList.add(
            "reduce-motion"
        );

    }


    /* =========================================================
       25. INITIAL PORTFOLIO CONSOLE MESSAGE
    ========================================================= */

    console.log(
        "%c Arya Sakshi Jha — Developer Portfolio ",
        "background:#17012c;color:#ffffff;padding:8px 14px;font-size:14px;font-weight:bold;"
    );

    console.log(
        "%cWordPress • Elementor • JavaScript • React.js • PHP",
        "color:#00ff9c;font-size:12px;"
    );

});