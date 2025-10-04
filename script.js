document.addEventListener("DOMContentLoaded", function () {

    const themeToggler = document.getElementById('theme-toggler');
    const body = document.body;
    const navbar = document.querySelector('.navbar');

    // Quick runtime check: warn if important elements are missing (helps debugging)
    (function checkRequiredElements() {
        const checks = [
            { sel: '#theme-toggler', name: 'Theme toggler (id="theme-toggler")' },
            { sel: '#typing-text', name: 'Typing text (id="typing-text")' },
            { sel: '.navbar', name: 'Navbar (.navbar)' },
            { sel: '#serviceModal', name: 'Service modal (id="serviceModal")' },
            { sel: '#serviceModalBody', name: 'Service modal body (id="serviceModalBody")' },
            { sel: '#serviceModalLabel', name: 'Service modal label (id="serviceModalLabel")' },
            { sel: '.filter-btn', name: 'Project filter buttons (.filter-btn)' },
            { sel: '.project-card', name: 'Project cards (.project-card)' },
            { sel: '#view-all-btn', name: 'View All button (id="view-all-btn")' },
            { sel: '#visible-count', name: 'Visible count (id="visible-count")' },
            { sel: '#total-count', name: 'Total count (id="total-count")' },
            { sel: '.certificate-download-btn', name: 'Certificate download buttons (.certificate-download-btn)' },
            { sel: '.download-cv-btn', name: 'Download resume button (.download-cv-btn)' },
            { sel: '.testimonial-slide', name: 'Testimonial slides (.testimonial-slide)' },
            { sel: '.indicator', name: 'Carousel indicators (.indicator)' },
            { sel: '#contactForm', name: 'Contact form (id="contactForm")' }
        ];

        const missing = checks.filter(c => !document.querySelector(c.sel));
        if (missing.length) {
            console.warn('script.js: The following expected elements are missing from the page DOM:');
            missing.forEach(m => console.warn(` - ${m.name} (selector: '${m.sel}')`));
        } else {
            console.info('script.js: All expected DOM elements found.');
        }
    })();

    // --- 1. THEME SWITCHER ---
    const applyTheme = (theme) => {
        body.setAttribute('data-bs-theme', theme);
        if (theme === 'dark') {
            themeToggler.classList.remove('fa-sun');
            themeToggler.classList.add('fa-moon');
        } else {
            themeToggler.classList.remove('fa-moon');
            themeToggler.classList.add('fa-sun');
        }
        localStorage.setItem('theme', theme);
    };

    themeToggler.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);


    // --- 2. NAVBAR SCROLL EFFECT ---
    const scrollDownBtn = document.querySelector('.scroll-down-wrapper');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
            if (scrollDownBtn) {
                scrollDownBtn.classList.add('hidden');
            }
        } else {
            navbar.classList.remove('navbar-scrolled');
            if (scrollDownBtn) {
                scrollDownBtn.classList.remove('hidden');
            }
        }
    });

    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', () => {
            const statsSection = document.querySelector('.stats');
            if (statsSection) {
                statsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }


    // --- 3. TYPING ANIMATION ---
    const typingTextElement = document.getElementById('typing-text');
    const textArray = ["Hi, I'm Nuha Anam", "A Web Developer", "A UI/UX Enthusiast", "A BCA Student", "AI Websites Builder"];
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typingTextElement.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typingTextElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            setTimeout(type, 500);
        }
    }
    type();


    // --- 4. SCROLL ANIMATIONS (INTERSECTION OBSERVER) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                entry.target.classList.remove('animate');
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });

    // Observe all elements that need animation
    const elementsToAnimate = document.querySelectorAll('.timeline-item, .skill-item, h1, h2.section-title, .section__title, .timeline-section h2, .service-card, .project-card, .certificate-card, .testimonial-card, .contact-card, #contactForm, footer, .social-icon, .copyright-text');
    elementsToAnimate.forEach((el, index) => {
        // Apply a small, staggered delay to each element for a nice effect
        el.style.animationDelay = `${(index % 6) * 0.1}s`;
        observer.observe(el);
    });


    // --- 5. SERVICE MODAL FUNCTIONALITY ---
    const serviceModalEl = document.getElementById('serviceModal');
    const serviceModal = (serviceModalEl && typeof bootstrap !== 'undefined') ? new bootstrap.Modal(serviceModalEl) : null;
    const serviceModalBody = document.getElementById('serviceModalBody');
    const serviceModalLabel = document.getElementById('serviceModalLabel');

    const serviceContent = {
        'project-designing': {
            title: 'Project Designing & Development',
            content: `
                <div class="service-detail">
                    <h5>Complete Project Lifecycle</h5>
                    <p>I provide end-to-end project design and development services, from initial concept to final deployment. My approach ensures scalable, maintainable, and efficient solutions.</p>
                    <h6>What I Offer:</h6>
                    <ul>
                        <li><strong>Requirements Analysis:</strong> Thorough understanding of client needs and business objectives</li>
                        <li><strong>System Architecture:</strong> Designing robust and scalable technical architectures</li>
                        <li><strong>Technology Selection:</strong> Choosing the right tools and frameworks for your project</li>
                        <li><strong>Implementation Planning:</strong> Detailed development roadmap and timeline</li>
                        <li><strong>Quality Assurance:</strong> Comprehensive testing and deployment strategies</li>
                    </ul>
                    <h6>Technologies I Work With:</h6>
                    <p>HTML5, CSS3, Bootstrap, JavaScript, and modern web development tools.</p>
                </div>`
        },
        'ui-ux-designer': {
            title: 'UI/UX Design & User Experience',
            content: `
                <div class="service-detail">
                    <h5>User-Centered Design Solutions</h5>
                    <p>I create intuitive and engaging user interfaces that prioritize user experience. My designs are not just beautiful—they solve real problems and create meaningful interactions.</p>
                    <h6>Design Process:</h6>
                    <ul>
                        <li><strong>User Research:</strong> Understanding user needs and behaviors</li>
                        <li><strong>Wireframing:</strong> Creating low-fidelity layouts and user flows</li>
                        <li><strong>Prototyping:</strong> Interactive prototypes for user testing</li>
                        <li><strong>Visual Design:</strong> High-fidelity designs with attention to detail</li>
                        <li><strong>Usability Testing:</strong> Iterating based on user feedback</li>
                    </ul>
                    <h6>Tools & Skills:</h6>
                    <p>Canva, Figma, user testing methodologies, accessibility standards, and design systems.</p>
                </div>`
        },
        'visual-designing': {
            title: 'Visual Design & Branding',
            content: `
                <div class="service-detail">
                    <h5>Creative Visual Solutions</h5>
                    <p>I create compelling visual identities and designs that communicate your brand story effectively. From logos to marketing materials, I ensure consistency and impact.</p>
                    <h6>Services Include:</h6>
                    <ul>
                        <li><strong>Brand Identity:</strong> Logo design, color palettes, typography</li>
                        <li><strong>Marketing Materials:</strong> Brochures, posters, social media graphics</li>
                        <li><strong>Digital Assets:</strong> Website graphics, app icons, illustrations</li>
                        <li><strong>Print Design:</strong> Business cards, letterheads, packaging</li>
                        <li><strong>Brand Guidelines:</strong> Comprehensive style guides for consistency</li>
                    </ul>
                    <h6>Design Tools:</h6>
                    <p>Canva, Figma, and various design software for creating compelling visuals.</p>
                </div>`
        },
        'image-video-generation': {
            title: 'AI-Powered Image & Video Generation',
            content: `
                <div class="service-detail">
                    <h5>AI-Enhanced Content Creation</h5>
                    <p>Leveraging cutting-edge AI technologies to create stunning visuals and videos. I combine artistic vision with AI capabilities to produce unique, high-quality content efficiently.</p>
                    <h6>AI Services:</h6>
                    <ul>
                        <li><strong>Custom Images:</strong> AI-generated artwork, illustrations, and graphics</li>
                        <li><strong>Video Content:</strong> AI-assisted video editing and effects</li>
                        <li><strong>Content Enhancement:</strong> Improving existing images and videos with AI</li>
                        <li><strong>Style Transfer:</strong> Applying artistic styles to photos and videos</li>
                        <li><strong>Automated Workflows:</strong> Streamlining content creation processes</li>
                    </ul>
                    <h6>AI Tools & Platforms:</h6>
                    <p>Midjourney, DALL-E, Stable Diffusion, Runway ML, Leonardo AI, and various AI content creation platforms.</p>
                </div>`
        }
    };

    document.querySelectorAll('.see-more-btn').forEach(button => {
        button.addEventListener('click', function () {
            const serviceType = this.getAttribute('data-service');
            const serviceData = serviceContent[serviceType];

            if (serviceData) {
                if (serviceModalLabel) serviceModalLabel.textContent = serviceData.title;
                if (serviceModalBody) serviceModalBody.innerHTML = serviceData.content;
                if (serviceModal) serviceModal.show();
            }
        });
    });

    // --- 6. PROJECT FILTERING & VIEW ALL (FIXED LOGIC) ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const viewAllBtn = document.getElementById('view-all-btn');
    const visibleCountEl = document.getElementById('visible-count');
    const totalCountEl = document.getElementById('total-count');
    const projectsPerPage = 6;
    let currentFilter = 'all';
    let isExpanded = false;

    // This is the new central function to control project visibility
    function updateProjectVisibility() {
        let visibleCounter = 0;

        // First, get a list of all cards that match the current filter
        const filteredCards = Array.from(projectCards).filter(card =>
            currentFilter === 'all' || card.getAttribute('data-category') === currentFilter
        );

        // Update the total count based on the filtered list
        totalCountEl.textContent = filteredCards.length;

        // Now, iterate through ALL cards to show/hide them
        projectCards.forEach(card => {
            const matchesFilter = currentFilter === 'all' || card.getAttribute('data-category') === currentFilter;

            if (matchesFilter) {
                // If expanded, show all. If not, only show up to the limit.
                if (isExpanded || visibleCounter < projectsPerPage) {
                    card.style.display = 'block';
                    visibleCounter++;
                } else {
                    card.style.display = 'none';
                }
            } else {
                card.style.display = 'none';
            }
        });

        // Update the visible count text
        visibleCountEl.textContent = visibleCounter;

        // Update the "View All" button state
        if (filteredCards.length <= projectsPerPage) {
            viewAllBtn.style.display = 'none'; // Hide button if not enough projects to expand
        } else {
            viewAllBtn.style.display = 'inline-flex'; // Show it otherwise
            if (isExpanded) {
                viewAllBtn.querySelector('.btn-text').textContent = 'Show Less';
                viewAllBtn.querySelector('i').className = 'fas fa-chevron-up';
            } else {
                viewAllBtn.querySelector('.btn-text').textContent = 'View All';
                viewAllBtn.querySelector('i').className = 'fas fa-chevron-down';
            }
        }
    }

    // Add click listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            currentFilter = this.getAttribute('data-filter');
            isExpanded = false; // Reset expansion state on new filter
            updateProjectVisibility();
        });
    });

    // Add click listener to the "View All" button
    viewAllBtn.addEventListener('click', function () {
        isExpanded = !isExpanded; // Toggle the expansion state
        updateProjectVisibility();

        // If collapsing, scroll to the top of the projects section for better UX
        if (!isExpanded) {
            document.querySelector('.projects-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });

    // Initial setup on page load
    updateProjectVisibility();


    // --- 7. CERTIFICATE DOWNLOAD FUNCTIONALITY ---
    document.querySelectorAll('.certificate-download-btn').forEach(button => {
        button.addEventListener('click', function () {
            const certType = this.getAttribute('data-cert') || 'certificate';
            const certTitleEl = this.closest('.certificate-content') && this.closest('.certificate-content').querySelector('.certificate-title');
            const certName = certTitleEl ? certTitleEl.textContent : certType;
            const link = document.createElement('a');
            link.href = '#'; // In a real app, this would be the file path
            link.download = `${certType}-certificate.pdf`;
            link.click();
            showToastMessage(`Downloading ${certName}...`, 'success');
        });
    });

    // Reusable function for showing toast messages
    function showToastMessage(message, type = 'info') {
        const existingMessage = document.querySelector('.toast-message');
        if (existingMessage) existingMessage.remove();

        const messageEl = document.createElement('div');
        messageEl.className = `toast-message ${type}`;
        messageEl.textContent = message;
        const baseStyle = 'position: fixed; top: 20px; right: 20px; padding: 1rem 1.5rem; border-radius: 8px; font-weight: 500; z-index: 10000; transition: all 0.3s ease; transform: translateX(120%);';
        const successStyle = 'background: linear-gradient(135deg, #27ae60, #2ecc71); color: white;';
        const errorStyle = 'background: linear-gradient(135deg, #e74c3c, #c0392b); color: white;';
        const infoStyle = 'background: rgba(0,0,0,0.8); color: white;';
        messageEl.style.cssText = baseStyle + (type === 'success' ? successStyle : type === 'error' ? errorStyle : infoStyle);
        document.body.appendChild(messageEl);

        // Slide in
        setTimeout(() => { messageEl.style.transform = 'translateX(0)'; }, 10);
        // Auto-hide
        setTimeout(() => {
            messageEl.style.transform = 'translateX(120%)';
            setTimeout(() => messageEl.remove(), 300);
        }, 4000);
    }


    // --- 8. RESUME DOWNLOAD FUNCTIONALITY ---
    const downloadCvBtn = document.querySelector('.download-cv-btn');
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', function () {
            const resumeType = this.getAttribute('data-resume') || 'resume';
            const link = document.createElement('a');
            link.href = './NUHA ANAM P.pdf'; // Path to the resume file
            link.download = `${resumeType}.pdf`;
            link.click();
            showToastMessage('Resume downloaded successfully!', 'success');
        });
    }


    // --- 9. TESTIMONIALS CAROUSEL FUNCTIONALITY ---
    class TestimonialsCarousel {
        constructor() {
            this.slides = document.querySelectorAll('.testimonial-slide');
            this.indicators = document.querySelectorAll('.indicator');
            this.prevBtn = document.querySelector('#prev-btn');
            this.nextBtn = document.querySelector('#next-btn');
            if (!this.slides.length) return; // Don't run if no slides exist
            this.currentSlide = 0;
            this.slideCount = this.slides.length;
            this.autoPlayInterval = null;
            this.autoPlayDelay = 5000;
            this.init();
        }
        init() {
            if (this.prevBtn) this.prevBtn.addEventListener('click', () => { this.prevSlide(); this.resetAutoPlay(); });
            if (this.nextBtn) this.nextBtn.addEventListener('click', () => { this.nextSlide(); this.resetAutoPlay(); });
            if (this.indicators && this.indicators.length === this.slideCount) {
                this.indicators.forEach((ind, i) => ind.addEventListener('click', () => { this.goToSlide(i); this.resetAutoPlay(); }));
            } else if (this.indicators && this.indicators.length > 0) {
                // If indicator count mismatches slides, attach safe handlers to existing indicators
                this.indicators.forEach((ind, i) => ind.addEventListener('click', () => { this.goToSlide(Math.min(i, this.slideCount - 1)); this.resetAutoPlay(); }));
            }
            this.startAutoPlay();
            this.showSlide(0);
        }
        showSlide(index) {
            this.slides.forEach(slide => slide.classList.remove('active'));
            if (this.indicators) this.indicators.forEach(ind => ind.classList.remove('active'));
            if (this.slides[index]) this.slides[index].classList.add('active');
            if (this.indicators && this.indicators[index]) this.indicators[index].classList.add('active');
            this.currentSlide = index;
        }
        nextSlide() { this.showSlide((this.currentSlide + 1) % this.slideCount); }
        prevSlide() { this.showSlide((this.currentSlide - 1 + this.slideCount) % this.slideCount); }
        goToSlide(index) { this.showSlide(index); }
        startAutoPlay() { this.autoPlayInterval = setInterval(() => this.nextSlide(), this.autoPlayDelay); }
        stopAutoPlay() { clearInterval(this.autoPlayInterval); }
        resetAutoPlay() { this.stopAutoPlay(); this.startAutoPlay(); }
    }
    new TestimonialsCarousel();


    // --- 9. CONTACT FORM FUNCTIONALITY ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const submitBtn = this.querySelector('.submit-btn');
            const formData = new FormData(this);
            if (!formData.get('name') || !formData.get('email') || !formData.get('message')) {
                showToastMessage('Please fill in all required fields.', 'error');
                return;
            }
            submitBtn.innerHTML = '<span class="btn-text">Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            setTimeout(() => {
                submitBtn.innerHTML = '<span class="btn-text">Send Message</span><i class="fas fa-paper-plane"></i>';
                submitBtn.disabled = false;
                showToastMessage('Message sent successfully!', 'success');
                this.reset();
            }, 2000);
        });
    }


    // --- 10. SCROLL TO TOP BUTTON ---
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top-btn';
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});