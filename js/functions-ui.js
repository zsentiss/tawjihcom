 // ===== FONCTIONS D'INTERFACE UTILISATEUR =====
console.log("🎨 Chargement des fonctions UI...");

// Menu mobile amélioré
window.initMobileMenu = function() {
    const menuBtn = document.getElementById('menuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            menuBtn.innerHTML = mainNav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Fermer le menu en cliquant ailleurs
        document.addEventListener('click', function(e) {
            if (!e.target.closest('nav') && !e.target.closest('.menu-btn')) {
                mainNav.classList.remove('active');
                if (menuBtn) {
                    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    }
};

// Mettre en surbrillance les résultats de recherche
window.highlightSearchResults = function(searchTerm) {
    if (!searchTerm) return;
    
    const jobs = document.querySelectorAll('.job-card');
    const regex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    
    jobs.forEach(job => {
        const text = job.textContent;
        if (regex.test(text)) {
            job.style.boxShadow = '0 0 0 3px var(--vert)';
            job.style.border = '2px solid var(--rouge)';
        } else {
            job.style.boxShadow = '';
            job.style.border = '';
        }
    });
};

// Animation de chargement
window.showLoading = function(elementId, message = 'Chargement...') {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `
            <div class="loading-indicator">
                <div class="loading-spinner"></div>
                <p>${message}</p>
            </div>
        `;
    }
};

window.hideLoading = function(elementId) {
    const element = document.getElementById(elementId);
    if (element && element.querySelector('.loading-indicator')) {
        element.innerHTML = '';
    }
};

// Gestion des onglets
window.initTabs = function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const tabButtons = container.querySelectorAll('.tab-btn');
    const tabContents = container.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Désactiver tous les onglets
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Activer l'onglet sélectionné
            button.classList.add('active');
            const tabId = button.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });
};

// Animation de scroll doux
window.initSmoothScroll = function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Gestion des formulaires
window.validateForm = function(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            field.style.borderColor = '';
        }
    });
    
    return isValid;
};

// Mise à jour du compteur de caractères
window.initCharCounter = function(textareaId, counterId, maxLength) {
    const textarea = document.getElementById(textareaId);
    const counter = document.getElementById(counterId);
    
    if (textarea && counter) {
        textarea.addEventListener('input', function() {
            const remaining = maxLength - this.value.length;
            counter.textContent = `${remaining} caractères restants`;
            
            if (remaining < 0) {
                counter.style.color = '#e74c3c';
                this.value = this.value.substring(0, maxLength);
            } else if (remaining < 50) {
                counter.style.color = '#f39c12';
            } else {
                counter.style.color = '#27ae60';
            }
        });
    }
};

// Copier dans le presse-papier
window.copyToClipboard = function(text, elementId = null) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Texte copié dans le presse-papier !', 'success');
        
        if (elementId) {
            const element = document.getElementById(elementId);
            if (element) {
                const originalText = element.textContent;
                element.textContent = '✓ Copié !';
                setTimeout(() => {
                    element.textContent = originalText;
                }, 2000);
            }
        }
    }).catch(err => {
        console.error('Erreur lors de la copie:', err);
        showNotification('Erreur lors de la copie', 'error');
    });
};

// Gestion des thèmes (clair/sombre)
window.toggleTheme = function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    showNotification(`Thème ${newTheme === 'dark' ? 'sombre' : 'clair'} activé`, 'info');
};

// Initialiser le thème au chargement
window.initTheme = function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        themeToggle.addEventListener('click', toggleTheme);
    }
};

// Confirmation avant action
window.confirmAction = function(message, callback) {
    if (confirm(message)) {
        if (typeof callback === 'function') {
            callback();
        }
    }
};

console.log("✅ Fonctions UI chargées");