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
        loadDataIfNeeded();
    }
    else {
        console.log("📍 Page d'accueil détectée");
    }
    
    // Test de fonctionnement
    console.log("✅ Application prête");
    console.log(`📊 ${window.jobsData?.length || 0} métiers disponibles`);
    console.log(`📚 ${window.formationsData?.length || 0} formations disponibles`);
});

// Exporter les fonctions principales
if (typeof window !== 'undefined') {
    window.getJobsData = function() { return window.jobsData; };
    window.getFormationsData = function() { return window.formationsData; };
}

console.log("✅ Fichier principal chargé");