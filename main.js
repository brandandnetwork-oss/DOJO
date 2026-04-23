document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up, .fade-in-right').forEach((el) => {
        observer.observe(el);
    });

    // Form submission handling to Google Sheets
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    // REEMPLAZA ESTA URL CON LA QUE TE DÉ GOOGLE APPS SCRIPT
    const scriptURL = 'https://script.google.com/macros/s/AKfycbx0w2DRh2jaYzr245lEAVZ3Y596RfarXq_2v4S2durWfB1ICWqSwU3cdy3D_gTjF9GsVg/exec';

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Enviando datos...';
            btn.disabled = true;

            // Recopilar los datos del formulario
            const formData = new FormData();
            formData.append('Nombre', document.getElementById('name').value);
            formData.append('Negocio', document.getElementById('business').value);
            formData.append('Telefono', document.getElementById('phone').value);
            formData.append('Email', document.getElementById('email').value);

            // Enviar a Google Sheets
            fetch(scriptURL, { method: 'POST', body: formData })
                .then(response => {
                    form.classList.add('hidden');
                    formSuccess.classList.remove('hidden');
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    btn.innerText = 'Error al enviar. Intenta de nuevo.';
                    btn.disabled = false;
                });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });
});
