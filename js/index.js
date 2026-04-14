document.addEventListener('DOMContentLoaded', async () => {

        let sidebarNav = document.querySelector('.sidebar-nav');
        let bodyElement = document.querySelector('.body');
        let headerMobileBtn = document.querySelector('.head__menu-btn');
        let sidebarMobileBtn = document.querySelector('.sidebar-nav__menu-btn');
        let header = document.querySelector('.header');
        const skillsSection = document.getElementById('skills-proficiency');
        let header__menu_links = document.querySelectorAll('.header__nav a');
        let sidebar_menu_links = document.querySelectorAll('.sidebar-nav__menu a');

        const headerHeight = header.offsetHeight;

        const removeSidebarClasses = () => {
            bodyElement.classList.remove('active-sidebar');
            sidebarNav.classList.remove('show');
            sidebarNav.classList.add('hide');
        }

        const headerMobileButton = () => {
                headerMobileBtn.addEventListener('click', () => {
                bodyElement.classList.add('active-sidebar');
                sidebarNav.classList.add('show');
                sidebarNav.classList.remove('hide');
            });
        }

        const sideBarButton = () => {
            sidebarMobileBtn.addEventListener('click', removeSidebarClasses);
        }

        const sideBarWrapper = () => {
            sidebarNav.addEventListener('click', (event) => {
                if (event.target === sidebarNav) {
                    removeSidebarClasses();
                }
            });
        }

        const removeBackdropInDesktop = () => {
            if (!bodyElement) return;

            const maxWidth = 768;

            if (window.innerWidth <= maxWidth) {
                if (sidebarNav.classList.contains('show')) {
                    bodyElement.classList.add('active-sidebar');
                }
            } else {
                if (sidebarNav.classList.contains('show')) {
                    bodyElement.classList.add('active-sidebar');
                }
                bodyElement.classList.remove('active-sidebar');
            }
        }

        window.addEventListener('resize',removeBackdropInDesktop);

        const scrollToHeader = () => {
            if (window.scrollY > headerHeight) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', scrollToHeader);

        const skillProficiency = () => {
            const skillsProficiency = document.querySelectorAll('.skills__proficiency progress');
            skillsProficiency.forEach((skill) => {
                const targetValue = parseInt(skill.getAttribute('value'), 10);
                const percentageDisplay = skill.previousElementSibling?.querySelector('.skill-percentage');
                let currentValue = 0;

                if (targetValue === 0 || targetValue === '') {
                    skill.value = 0;
                    if (percentageDisplay) percentageDisplay.textContent = `0%`;
                    return;
                }

                const interval = setInterval(() => {
                    currentValue++;
                    skill.value = currentValue;

                    if (percentageDisplay) percentageDisplay.textContent = `${currentValue}%`;

                    if (currentValue >= targetValue) {
                        clearInterval(interval);
                        return;
                    }
                }, 10);
            });
        }

        function handleIntersection(entries, observer) {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                skillProficiency();
                observer.disconnect();
              }
            });
        }

        const observeSkills = () => {
            if (!skillsSection) return;
            const observer = new IntersectionObserver(handleIntersection, {
                root: null,
                threshold: 0.4,
            });
            observer.observe(skillsSection);
        }

        const smoothScrollTo = (targetId) => {
            if (targetId === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const targetElement = document.getElementById(targetId);
            if (!targetElement) return;
            setTimeout(() => {
                const headerOffset = header?.offsetHeight || 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }, 100);
        }

        const headerMenuLinks = () => {
            header__menu_links.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    smoothScrollTo(this.getAttribute('href').substring(1));
                });
            });
        }

        const sidebarMenuLinks = () => {
            sidebar_menu_links.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    removeSidebarClasses();
                    smoothScrollTo(this.getAttribute('href').substring(1));
                });
            });
        }

        removeSidebarClasses();
        headerMobileButton();
        sideBarButton();
        sideBarWrapper();
        removeBackdropInDesktop();
        scrollToHeader();
        headerMenuLinks();
        sidebarMenuLinks();

        if (typeof window.loadSiteContent === 'function') {
            await window.loadSiteContent();
        }
        observeSkills();
});
