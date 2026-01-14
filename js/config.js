 // ===== CONFIGURATION GLOBALE =====
console.log("⚙️ Chargement de la configuration...");

// Variables globales
window.appConfig = {
    version: "1.0.0",
    author: "Zineb Sentissi",
    project: "TawjihCOM 2025"
};

// Variables d'état de l'application
window.appState = {
    currentFilter: 'tous',
    currentSearchTerm: '',
    formationFilters: {
        ville: 'toutes',
        domaine: 'tous',
        type: 'tous',
        bac: 0,
        bacFiliere: 'toutes',
        search: ''
    },
    quizState: {
        currentQuestionIndex: 0,
        userAnswers: [],
        userProfileTags: []
    }
};

// Initialiser les tableaux globaux vides
window.jobsData = [];
window.formationsData = [];

console.log("✅ Configuration chargée");