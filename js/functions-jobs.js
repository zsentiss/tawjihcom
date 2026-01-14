 // ===== FONCTIONS POUR LES MÉTIERS =====

// Initialisation page métiers
window.initJobsPage = function() {
    console.log("🔧 Initialisation page Métiers");
    loadDataIfNeeded();
    setupJobsSearch();
    generateFilterButtons();
    displayJobs();
};

// Configuration de la recherche
function setupJobsSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            window.appState.currentSearchTerm = this.value.trim();
            applyCombinedFilters();
        });
    }
}

// Générer les boutons de filtre
function generateFilterButtons() {
    const domains = ['tous'];
    window.jobsData.forEach(job => {
        if (!domains.includes(job.domaine)) {
            domains.push(job.domaine);
        }
    });

    const filterContainer = document.getElementById('filterButtons');
    if (filterContainer) {
        filterContainer.innerHTML = '';
        domains.forEach(domain => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            if (domain === 'tous') btn.classList.add('active');
            btn.textContent = domain;
            btn.addEventListener('click', () => filterJobs(domain));
            filterContainer.appendChild(btn);
        });
    }
}

// Filtrer les métiers
window.filterJobs = function(domain) {
    window.appState.currentFilter = domain;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === domain) {
            btn.classList.add('active');
        }
    });
    applyCombinedFilters();
};

// Appliquer les filtres combinés
function applyCombinedFilters() {
    let filteredJobs = window.jobsData;
    
    if (window.appState.currentFilter !== 'tous') {
        filteredJobs = filteredJobs.filter(job => job.domaine === window.appState.currentFilter);
    }
    
    if (window.appState.currentSearchTerm !== '') {
        const searchTerm = window.appState.currentSearchTerm.toLowerCase();
        filteredJobs = filteredJobs.filter(job => 
            job.nom.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm) ||
            job.competences.toLowerCase().includes(searchTerm) ||
            job.domaine.toLowerCase().includes(searchTerm)
        );
    }
    
    displayFilteredJobs(filteredJobs);
}

// Afficher les métiers filtrés
function displayFilteredJobs(jobs) {
    const container = document.getElementById('jobsContainer');
    if (!container) return;
    
    if (jobs.length === 0) {
        container.innerHTML = `
            <div class="card" style="text-align: center; padding: 40px;">
                <h3><i class="fas fa-search"></i> Aucun métier trouvé</h3>
                <p>Essayez avec d'autres termes de recherche ou changez de filtre.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    jobs.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.innerHTML = `
            <div class="job-header">
                <h3>${job.nom}</h3>
                <p>Domaine: ${job.domaine}</p>
            </div>
            <div class="job-content">
                <p>${job.description}</p>
                <div class="job-detail">
                    <i class="fas fa-money-bill-wave"></i>
                    <span><strong>Salaire:</strong> ${job.salaire}</span>
                </div>
                <div class="job-detail">
                    <i class="fas fa-graduation-cap"></i>
                    <span><strong>Études:</strong> ${job.etudes}</span>
                </div>
                <div class="job-detail">
                    <i class="fas fa-tools"></i>
                    <span><strong>Compétences:</strong> ${job.competences}</span>
                </div>
                <div class="job-detail">
                    <i class="fas fa-road"></i>
                    <span><strong>Parcours:</strong> ${job.parcours}</span>
                </div>
                <button class="btn btn-save" onclick="saveJob(${job.id})" style="margin-top: 15px; width: 100%;">
                    <i class="fas fa-save"></i> Sauvegarder
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Afficher tous les métiers
function displayJobs() {
    applyCombinedFilters();
}
// Ajoutez après setupJobsSearch()
function setupAdvancedFilters() {
    const filterEtudes = document.getElementById('filterEtudes');
    const filterSalaire = document.getElementById('filterSalaire');
    const filterBac = document.getElementById('filterBac');
    
    if (filterEtudes) {
        filterEtudes.addEventListener('change', applyCombinedFilters);
    }
    if (filterSalaire) {
        filterSalaire.addEventListener('change', applyCombinedFilters);
    }
    if (filterBac) {
        filterBac.addEventListener('change', applyCombinedFilters);
    }
}

// Modifiez applyCombinedFilters() pour inclure les nouveaux filtres :
function applyCombinedFilters() {
    let filteredJobs = window.jobsData;
    
    // Filtre par domaine
    if (window.appState.currentFilter !== 'tous') {
        filteredJobs = filteredJobs.filter(job => job.domaine === window.appState.currentFilter);
    }
    
    // Recherche texte
    if (window.appState.currentSearchTerm !== '') {
        const searchTerm = window.appState.currentSearchTerm.toLowerCase();
        filteredJobs = filteredJobs.filter(job => 
            job.nom.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm) ||
            job.competences.toLowerCase().includes(searchTerm) ||
            job.domaine.toLowerCase().includes(searchTerm)
        );
    }
    
    // NOUVEAUX FILTRES
    const etudesFilter = document.getElementById('filterEtudes')?.value;
    const salaireFilter = document.getElementById('filterSalaire')?.value;
    const bacFilter = document.getElementById('filterBac')?.value;
    
    if (etudesFilter && etudesFilter !== 'tous') {
        filteredJobs = filteredJobs.filter(job => {
            const etudes = job.etudes;
            if (etudesFilter === 'court') return etudes.includes('+2') || etudes.includes('+3');
            if (etudesFilter === 'moyen') return etudes.includes('+4') || etudes.includes('+5');
            if (etudesFilter === 'long') return etudes.includes('+6') || etudes.includes('+7');
            return true;
        });
    }
    
    if (salaireFilter && salaireFilter !== 'tous') {
        filteredJobs = filteredJobs.filter(job => {
            const salaire = job.salaire;
            const montant = parseInt(salaire.split('-')[0].replace(/\D/g, ''));
            if (salaireFilter === 'bas') return montant < 8000;
            if (salaireFilter === 'moyen') return montant >= 8000 && montant < 15000;
            if (salaireFilter === 'eleve') return montant >= 15000;
            return true;
        });
    }
    
    if (bacFilter && bacFilter !== 'tous') {
        filteredJobs = filteredJobs.filter(job => {
            if (bacFilter === 'Toutes') return true;
            return job.bac === bacFilter;
        });
    }
    
    displayFilteredJobs(filteredJobs);
}

// Dans initJobsPage(), ajoutez :
window.initJobsPage = function() {
    console.log("🔧 Initialisation page Métiers");
    loadDataIfNeeded();
    setupJobsSearch();
    generateFilterButtons();
    setupAdvancedFilters(); // ← AJOUTEZ CETTE LIGNE
    displayJobs();
};
// ===== COMPARATEUR DE MÉTIERS =====

// Initialiser le comparateur
window.initComparator = function() {
    const select1 = document.getElementById('compareJob1');
    const select2 = document.getElementById('compareJob2');
    
    if (!select1 || !select2) return;
    
    // Vider les selects
    select1.innerHTML = '<option value="">-- Choisir un métier --</option>';
    select2.innerHTML = '<option value="">-- Choisir un métier --</option>';
    
    // Remplir avec tous les métiers
    window.jobsData.forEach(job => {
        const option1 = document.createElement('option');
        option1.value = job.id;
        option1.textContent = job.nom;
        select1.appendChild(option1.cloneNode(true));
        select2.appendChild(option1);
    });
};

// Fonction de comparaison
window.compareTwoJobs = function() {
    const job1Id = parseInt(document.getElementById('compareJob1').value);
    const job2Id = parseInt(document.getElementById('compareJob2').value);
    
    if (!job1Id || !job2Id) {
        showNotification('Veuillez sélectionner 2 métiers à comparer', 'warning');
        return;
    }
    
    if (job1Id === job2Id) {
        showNotification('Veuillez sélectionner 2 métiers différents', 'warning');
        return;
    }
    
    const job1 = window.jobsData.find(j => j.id === job1Id);
    const job2 = window.jobsData.find(j => j.id === job2Id);
    
    if (!job1 || !job2) {
        showNotification('Métiers non trouvés', 'error');
        return;
    }
    
    displayComparison(job1, job2);
};

// Afficher la comparaison
function displayComparison(job1, job2) {
    const container = document.getElementById('comparisonResults');
    if (!container) return;
    
    // Extraire les données numériques des salaires
    const salaire1 = extractSalaire(job1.salaire);
    const salaire2 = extractSalaire(job2.salaire);
    
    // Déterminer les "gagnants"
    const winnerSalaire = salaire1.moyen > salaire2.moyen ? job1.id : job2.id;
    const winnerEtudes = getEtudesLevel(job1.etudes) < getEtudesLevel(job2.etudes) ? job1.id : job2.id;
    
    container.innerHTML = `
        <h4><i class="fas fa-chart-line"></i> Résultats de la comparaison</h4>
        
        <div class="comparison-table">
            <div class="comparison-header">Critères</div>
            <div class="comparison-header">${job1.nom}</div>
            <div class="comparison-header">${job2.nom}</div>
            
            <!-- Salaire -->
            <div class="comparison-item"><strong>Salaire moyen</strong></div>
            <div class="comparison-item ${winnerSalaire === job1.id ? 'winner' : ''}">
                ${salaire1.moyen.toLocaleString()} DH
                ${winnerSalaire === job1.id ? '<br><small>🏆 Meilleur</small>' : ''}
            </div>
            <div class="comparison-item ${winnerSalaire === job2.id ? 'winner' : ''}">
                ${salaire2.moyen.toLocaleString()} DH
                ${winnerSalaire === job2.id ? '<br><small>🏆 Meilleur</small>' : ''}
            </div>
            
            <!-- Durée études -->
            <div class="comparison-item"><strong>Durée études</strong></div>
            <div class="comparison-item ${winnerEtudes === job1.id ? 'winner' : ''}">
                ${job1.etudes}
                ${winnerEtudes === job1.id ? '<br><small>📚 Plus rapide</small>' : ''}
            </div>
            <div class="comparison-item ${winnerEtudes === job2.id ? 'winner' : ''}">
                ${job2.etudes}
                ${winnerEtudes === job2.id ? '<br><small>📚 Plus rapide</small>' : ''}
            </div>
            
            <!-- Domaine -->
            <div class="comparison-item"><strong>Domaine</strong></div>
            <div class="comparison-item">${job1.domaine}</div>
            <div class="comparison-item">${job2.domaine}</div>
            
            <!-- Compétences -->
            <div class="comparison-item"><strong>Compétences clés</strong></div>
            <div class="comparison-item" style="text-align: left;">${job1.competences.split(', ').map(c => `• ${c}`).join('<br>')}</div>
            <div class="comparison-item" style="text-align: left;">${job2.competences.split(', ').map(c => `• ${c}`).join('<br>')}</div>
        </div>
        
        <div style="margin-top: 20px; display: flex; gap: 15px; justify-content: center;">
            <button class="btn btn-small" onclick="saveJob(${job1.id})">
                <i class="fas fa-save"></i> Sauvegarder ${job1.nom}
            </button>
            <button class="btn btn-small" onclick="saveJob(${job2.id})">
                <i class="fas fa-save"></i> Sauvegarder ${job2.nom}
            </button>
            <button class="btn btn-small btn-secondary" onclick="clearComparison()">
                <i class="fas fa-times"></i> Effacer
            </button>
        </div>
    `;
    
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth' });
}

// Fonctions utilitaires
function extractSalaire(salaireStr) {
    // Convertir "8 000 - 50 000 DH" en moyenne
    const numbers = salaireStr.match(/\d+/g);
    if (!numbers || numbers.length < 2) return { min: 0, max: 0, moyen: 0 };
    
    const min = parseInt(numbers[0].replace(/\s/g, ''));
    const max = parseInt(numbers[1].replace(/\s/g, ''));
    return {
        min: min,
        max: max,
        moyen: Math.round((min + max) / 2)
    };
}

function getEtudesLevel(etudesStr) {
    // Donner un score : + petit = études plus courtes
    if (etudesStr.includes('+2')) return 2;
    if (etudesStr.includes('+3')) return 3;
    if (etudesStr.includes('+4')) return 4;
    if (etudesStr.includes('+5')) return 5;
    if (etudesStr.includes('+6')) return 6;
    if (etudesStr.includes('+7')) return 7;
    return 5; // Par défaut
}

function clearComparison() {
    document.getElementById('compareJob1').value = '';
    document.getElementById('compareJob2').value = '';
    document.getElementById('comparisonResults').style.display = 'none';
}

// Initialiser le comparateur quand la page métiers charge
window.initJobsPage = function() {
    console.log("🔧 Initialisation page Métiers");
    loadDataIfNeeded();
    setupJobsSearch();
    generateFilterButtons();
    displayJobs();
    initComparator(); // ← AJOUTEZ CETTE LIGNE
};
console.log("✅ Fonctions métiers chargées");