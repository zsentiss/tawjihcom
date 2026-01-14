 // ===== FICHIER PRINCIPAL - POINT D'ENTRÉE =====
console.log("🚀 Démarrage de TawjihCOM...");

// Initialiser l'application
document.addEventListener('DOMContentLoaded', function() {
    console.log("📱 Page chargée");
    
    // Initialiser les fonctions de base
    initApp();
    
    // Initialiser la page spécifique
    const path = window.location.pathname;
    
    if (path.includes('metiers.html') || document.getElementById('jobsContainer')) {
        console.log("📍 Page Métiers détectée");
        if (typeof initJobsPage === 'function') {
            initJobsPage();
        }
    }
    else if (path.includes('parcours.html') || document.getElementById('formationsContainer')) {
        console.log("📍 Page Formations détectée");
        if (typeof initFormationsPage === 'function') {
            initFormationsPage();
        }
    }
    else if (path.includes('sauvegarde.html') || document.getElementById('savedItems')) {
        console.log("📍 Page Sauvegarde détectée");
        if (typeof initSavePage === 'function') {
            initSavePage();
        }
    }
    else if (path.includes('quizz.html')) {
        console.log("📍 Page Quiz détectée");
        // Le quiz a son propre système d'initialisation
    }
    else {
        console.log("📍 Page d'accueil détectée");
        // Initialisation spécifique à l'accueil si nécessaire
    }
    
    // Test de fonctionnement
    console.log("✅ Application prête");
    console.log(`📊 ${window.jobsData?.length || 0} métiers disponibles`);
    console.log(`📚 ${window.formationsData?.length || 0} formations disponibles`);
});

// Exporter les fonctions principales pour le quiz
if (typeof window !== 'undefined') {
    window.getJobsData = function() { return window.jobsData; };
    window.getFormationsData = function() { return window.formationsData; };
}
// Dans js/main.js, complétez la partie de détection de page :
document.addEventListener('DOMContentLoaded', function() {
    console.log("📱 Page chargée");
    
    // Initialiser les fonctions de base
    initApp();
    
    // Initialiser la page spécifique
    const path = window.location.pathname;
    
    if (path.includes('metiers.html') || document.getElementById('jobsContainer')) {
        console.log("📍 Page Métiers détectée");
        if (typeof initJobsPage === 'function') {
            initJobsPage();
        }
    }
    else if (path.includes('parcours.html') || document.getElementById('formationsContainer')) {
        console.log("📍 Page Formations détectée");
        if (typeof initFormationsPage === 'function') {
            initFormationsPage();
        }
    }
    else if (path.includes('sauvegarde.html') || document.getElementById('savedItems')) {
        console.log("📍 Page Sauvegarde détectée");
        if (typeof initSavePage === 'function') {
            initSavePage();
        }
    }
    else if (path.includes('quizz.html')) {
        console.log("📍 Page Quiz détectée");
        // Le quiz a son propre système d'initialisation
        // On charge les données si nécessaires
        loadDataIfNeeded();
        
        // Vérifier si un quiz était en cours
        const savedState = localStorage.getItem('quizState');
        if (savedState) {
            try {
                const state = JSON.parse(savedState);
                // ... (gestion de la restauration du quiz)
            } catch (error) {
                console.error("Erreur lors de la restauration:", error);
                localStorage.removeItem('quizState');
            }
        }
    }
    else {
        console.log("📍 Page d'accueil détectée");
        // Initialisation spécifique à l'accueil si nécessaire
    }
    
    // Test de fonctionnement
    console.log("✅ Application prête");
    console.log(`📊 ${window.jobsData?.length || 0} métiers disponibles`);
    console.log(`📚 ${window.formationsData?.length || 0} formations disponibles`);
});
console.log("✅ Fichier principal chargé");