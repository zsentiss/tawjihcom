 // ===== FONCTIONS DE BASE =====

// Fonction de notification
window.showNotification = function(message, type = 'success', duration = 4000) {
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : type === 'warning' ? 'exclamation' : 'info'}-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Supprimer après la durée spécifiée
    setTimeout(() => {
        notification.remove();
    }, duration);
};

// Fonction pour charger les données si nécessaires
window.loadDataIfNeeded = function() {
    if (window.jobsData.length === 0) {
        console.log("🔄 Chargement des données métiers...");
        // Les données sont déjà chargées via les fichiers séparés
    }
    
    if (window.formationsData.length === 0) {
        console.log("🔄 Chargement des données formations...");
        // Les données sont déjà chargées via les fichiers séparés
    }
};

// Menu mobile (version simplifiée pour remplacer l'ancienne)
window.initApp = function() {
    console.log("🚀 Initialisation de l'application...");
    
    // Initialiser le thème
    if (typeof initTheme === 'function') {
        initTheme();
    }
    
    // Initialiser le menu mobile
    if (typeof initMobileMenu === 'function') {
        initMobileMenu();
    }
    
    // Initialiser le scroll doux
    if (typeof initSmoothScroll === 'function') {
        initSmoothScroll();
    }
    
    // Charger les données si nécessaires
    loadDataIfNeeded();
};

// Fonction de notification (version améliorée)
window.showNotification = function(message, type = 'success', duration = 4000) {
    // Limiter à 3 notifications maximum
    const existingNotifications = document.querySelectorAll('.notification');
    if (existingNotifications.length >= 3) {
        existingNotifications[0].remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : type === 'warning' ? 'exclamation' : 'info'}-circle"></i>
        <span>${message}</span>
    `;
    
    // Style CSS pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 12px;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease ${duration - 300}ms forwards;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        max-width: 350px;
        ${type === 'success' ? 'background: #27ae60; color: white; border-left: 5px solid #229954;' :
          type === 'error' ? 'background: #e74c3c; color: white; border-left: 5px solid #c0392b;' :
          type === 'warning' ? 'background: #f39c12; color: white; border-left: 5px solid #d68910;' :
          'background: #3498db; color: white; border-left: 5px solid #2980b9;'}
    `;
    
    document.body.appendChild(notification);
    
    // Ajouter les animations CSS si elles n'existent pas
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, duration);
};
console.log("✅ Fonctions de base chargées");