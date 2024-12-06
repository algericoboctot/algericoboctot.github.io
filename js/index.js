document.addEventListener('DOMContentLoaded', () => {

        let sidebarNav = document.querySelector('.sidebar-nav');
        let main = document.querySelector('.main');
        let headerMobileBtn = document.querySelector('.head__menu-btn');
        let sidebarMobileBtn = document.querySelector('.sidebar-nav__menu-btn ');
        let header = document.querySelector('.header');
        let skillsProficiency = document.querySelectorAll('.skills__proficiency progress');
        const skillsSection = document.getElementById('skills-proficiency');

        const headerMobileButton = () => {
                headerMobileBtn.addEventListener('click', () => {
                main.classList.add('active-sidebar');
                sidebarNav.classList.add('show');
                sidebarNav.classList.remove('hide'); 
            });
        }
    
        const sideBarButton = () => {
            sidebarMobileBtn.addEventListener('click', () => {
                main.classList.remove('active-sidebar');
                sidebarNav.classList.remove('show');
                sidebarNav.classList.add('hide');
            });
        }
    
        const sideBarWrapper = () => {
            sidebarNav.addEventListener('click', (event) => {
                if (event.target === sidebarNav) {
                    main.classList.remove('active-sidebar');
                    sidebarNav.classList.remove('show');
                    sidebarNav.classList.add('hide');
                }
            });
        }

        const removeBackgroundInDesktop = () => {
            if (!main) return;

            const maxWidth = 768; // Maximum width

            if (window.innerWidth <= maxWidth) {
                // Resize logic for smaller screens
                if (sidebarNav.classList.contains('show')) {
                    main.classList.add('active-sidebar');
                }
            } else {
                if (sidebarNav.classList.contains('show')) {
                    main.classList.add('active-sidebar');
                }
                main.classList.remove('active-sidebar');
            }
        }

        window.addEventListener('resize', removeBackgroundInDesktop);

        const scrollToHeader = () => {
            const headerHeight = header.offsetHeight;

            window.addEventListener('scroll', () => {
            if (window.scrollY > headerHeight) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            });
        }

        const skillProficiency = () => {

            skillsProficiency.forEach((skill) => {
                const targetValue = parseInt(skill.getAttribute('value'), 10);
                const percentageDisplay = skill.previousElementSibling?.querySelector('.skill-percentage');
                let currentValue = 0;

                if (targetValue === 0 || targetValue === '') {
                    // If the target value is zero, immediately set the percentage to 0%
                    skill.value = 0;
                    percentageDisplay.textContent = `0%`;
                    return;
                }

                const interval = setInterval(() => {
                    currentValue++;
                    skill.value = currentValue;
                    
                    percentageDisplay.textContent = `${currentValue}%`;

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
                observer.disconnect(); // Stop observing after the animation starts
              }
            });
        }

        if (skillsSection) {
            const observer = new IntersectionObserver(handleIntersection, {
              root: null, // Observe in the viewport
              threshold: 0.4, // Trigger when 30% of the element is visible
            });
        
            observer.observe(skillsSection);
        }

        headerMobileButton();
        sideBarButton();
        sideBarWrapper();
        removeBackgroundInDesktop();
        scrollToHeader();
});



