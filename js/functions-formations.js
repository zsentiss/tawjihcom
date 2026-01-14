 // ===== FONCTIONS POUR LES FORMATIONS =====

// Initialisation page formations
window.initFormationsPage = function() {
    console.log("📚 Initialisation page Formations");
    loadDataIfNeeded();
    setupFormationFilters();
    setupFormationSearch();
    displayFormations();
    updateResultsCount();
};

// Configuration des filtres formations
function setupFormationFilters() {
    setupVilleFilters();
    setupDomaineFilters();
    setupTypeFilters();
    setupBacFilters();
    setupBacFiliereFilters(); 
}

function setupVilleFilters() {
    const villes = ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 'Safi', 'Benguerir', 'Kénitra', 'Oujda', 'El Jadida', 'Tétouan', 'Ifrane', 'Youssoufia'];
    const container = document.getElementById('villeFilters');
    
    if (container) {
        // VIDER le conteneur d'abord
        container.innerHTML = '';
        
        // 1. AJOUTER LE BOUTON "TOUTES" en PREMIER
        const btnToutes = document.createElement('button');
        btnToutes.className = 'filter-btn active';
        btnToutes.textContent = 'Toutes';
        btnToutes.dataset.filter = 'toutes';
        btnToutes.addEventListener('click', () => {
            document.querySelectorAll('#villeFilters .filter-btn').forEach(b => b.classList.remove('active'));
            btnToutes.classList.add('active');
            window.appState.formationFilters.ville = 'toutes';
            displayFormations();
            updateResultsCount();
        });
        container.appendChild(btnToutes);
        
        // 2. AJOUTER TOUTES LES VILLES
        villes.forEach(ville => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.textContent = ville;
            btn.dataset.filter = ville;
            btn.addEventListener('click', () => {
                document.querySelectorAll('#villeFilters .filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                window.appState.formationFilters.ville = ville;
                displayFormations();
                updateResultsCount();
            });
            container.appendChild(btn);
        });
    }
}

function setupDomaineFilters() {
    const domaines = ['tous'];
    window.formationsData.forEach(formation => {
        if (!domaines.includes(formation.categorie)) {
            domaines.push(formation.categorie);
        }
    });
    
    const container = document.getElementById('domaineFilters');
    if (container) {
        container.innerHTML = '';
        domaines.forEach(domaine => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.textContent = domaine === 'tous' ? 'Tous' : domaine;
            btn.dataset.filter = domaine;
            if (domaine === 'tous') btn.classList.add('active');
            btn.addEventListener('click', () => {
                document.querySelectorAll('#domaineFilters .filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                window.appState.formationFilters.domaine = domaine;
                displayFormations();
                updateResultsCount();
            });
            container.appendChild(btn);
        });
    }
}

function setupTypeFilters() {
    const typeButtons = document.querySelectorAll('#typeFilters .filter-btn');
    typeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#typeFilters .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            window.appState.formationFilters.type = btn.dataset.filter;
            displayFormations();
            updateResultsCount();
        });
    });
}

function setupBacFilters() {
    const bacButtons = document.querySelectorAll('#bacFilters .filter-btn');
    bacButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#bacFilters .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            window.appState.formationFilters.bac = parseInt(btn.dataset.filter);
            displayFormations();
            updateResultsCount();
        });
    });
}

// Configuration recherche formations
function setupFormationSearch() {
    const searchInput = document.getElementById('searchFormation');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            window.appState.formationFilters.search = searchInput.value.trim();
            displayFormations();
            updateResultsCount();
        });
    }
}

// Afficher les formations filtrées
function displayFormations() {
    const container = document.getElementById('formationsContainer');
    const noResults = document.getElementById('noResults');
    if (!container) return;

    const filtered = window.formationsData.filter(formation => {
        const filters = window.appState.formationFilters;
        
        if (filters.ville !== 'toutes' && formation.ville !== filters.ville) return false;
        if (filters.domaine !== 'tous' && formation.categorie !== filters.domaine) return false;
        
        if (filters.type !== 'tous') {
            if (filters.type === 'Gratuit') {
                if (formation.type !== 'Gratuit') return false;
            } else if (formation.type !== filters.type) {
                return false;
            }
        }
        
        if (filters.bac > 0 && formation.noteBacMin < filters.bac) return false;
        // Ajoutez ce filtre avec les autres
if (filters.bacFiliere !== 'toutes') {
    // Logique simple : certaines formations sont pour certaines filières
    if (filters.bacFiliere === 'Scientifique') {
        if (!formation.categorie.includes('SANTÉ') && 
            !formation.categorie.includes('INGÉNIERIE') &&
            !formation.categorie.includes('ARCHITECTURE')) {
            return false;
        }
    }
    if (filters.bacFiliere === 'Littéraire') {
        if (!formation.categorie.includes('DROIT') &&
            !formation.categorie.includes('ENSEIGNEMENT') &&
            !formation.categorie.includes('ARTS')) {
            return false;
        }
    }
    if (filters.bacFiliere === 'Économique') {
        if (!formation.categorie.includes('COMMERCE') &&
            !formation.categorie.includes('GESTION')) {
            return false;
        }
    }
    if (filters.bacFiliere === 'Technique') {
        if (!formation.categorie.includes('TECHNIQUES') &&
            !formation.nom.includes('BTS') &&
            !formation.nom.includes('OFPPT')) {
            return false;
        }
    }
}
        if (filters.search !== '') {
            const searchTerm = filters.search.toLowerCase();
            if (!formation.nom.toLowerCase().includes(searchTerm) &&
                !formation.ville.toLowerCase().includes(searchTerm) &&
                !formation.categorie.toLowerCase().includes(searchTerm) &&
                !formation.description.toLowerCase().includes(searchTerm)) {
                return false;
            }
        }
        
        return true;
    });

    if (filtered.length === 0) {
        container.style.display = 'none';
        if (noResults) noResults.style.display = 'block';
    } else {
        container.style.display = 'grid';
        if (noResults) noResults.style.display = 'none';
        container.innerHTML = '';
        
        filtered.forEach(formation => {
            const card = document.createElement('div');
            card.className = 'formation-card';
            card.innerHTML = `
                <div class="formation-header">
                    <span class="formation-badge">${formation.type}</span>
                    <h3>${formation.nom}</h3>
                    <div class="formation-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${formation.ville}</span>
                    </div>
                </div>
                <div class="formation-content">
                    <p>${formation.description}</p>
                    <div class="formation-details">
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <div>
                                <div class="detail-label">Durée</div>
                                <div class="detail-value">${formation.duree}</div>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-chart-line"></i>
                            <div>
                                <div class="detail-label">Réussite</div>
                                <div class="detail-value">${formation.tauxReussite}</div>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-graduation-cap"></i>
                            <div>
                                <div class="detail-label">Bac min</div>
                                <div class="detail-value">${formation.noteBacMin}/20</div>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-tag"></i>
                            <div>
                                <div class="detail-label">Domaine</div>
                                <div class="detail-value">${formation.categorie}</div>
                            </div>
                        </div>
                    </div>
                    <div class="formation-conditions">
                        <p><strong>Conditions:</strong> ${formation.conditions}</p>
                    </div>
                    <div class="formation-actions">
                        <a href="${formation.lien}" target="_blank" class="btn">
                            <i class="fas fa-external-link-alt"></i> Site officiel
                        </a>
                        <button class="btn btn-save" onclick="saveFormation(${formation.id})">
                            <i class="fas fa-save"></i> Sauvegarder
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }
}

// Mettre à jour le compteur de résultats
function updateResultsCount() {
    const countElement = document.getElementById('resultsCount');
    if (countElement) {
        const count = window.formationsData.filter(formation => {
            const filters = window.appState.formationFilters;
            
            if (filters.ville !== 'toutes' && formation.ville !== filters.ville) return false;
            if (filters.domaine !== 'tous' && formation.categorie !== filters.domaine) return false;
            
            if (filters.type !== 'tous') {
                if (filters.type === 'Gratuit') {
                    if (formation.type !== 'Gratuit') return false;
                } else if (formation.type !== filters.type) {
                    return false;
                }
            }
            
            if (filters.bac > 0 && formation.noteBacMin < filters.bac) return false;
            
            if (filters.search !== '') {
                const searchTerm = filters.search.toLowerCase();
                if (!formation.nom.toLowerCase().includes(searchTerm) &&
                    !formation.ville.toLowerCase().includes(searchTerm) &&
                    !formation.categorie.toLowerCase().includes(searchTerm) &&
                    !formation.description.toLowerCase().includes(searchTerm)) {
                    return false;
                }
            }
            
            return true;
        }).length;
        countElement.textContent = count;
    }
}
// Modifiez setupBacFiliereFilters() pour être comme ça :
function setupBacFiliereFilters() {
    const container = document.getElementById('bacFiliereFilters');
    if (!container) return;
    
    // Vérifier que les boutons existent
    const buttons = container.querySelectorAll('.filter-btn');
    if (buttons.length === 0) return;
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#bacFiliereFilters .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            window.appState.formationFilters.bacFiliere = btn.dataset.filter;
            displayFormations();
            updateResultsCount();
        });
    });
}

// Modifiez displayFormations() - cherchez où on filtre par bacFiliere :
// REMPLACEZ toute cette partie compliquée :
if (filters.bacFiliere !== 'toutes') {
    // Logique simple : certaines formations sont pour certaines filières
    if (filters.bacFiliere === 'Scientifique') {
        if (!formation.categorie.includes('SANTÉ') && 
            !formation.categorie.includes('INGÉNIERIE') &&
            !formation.categorie.includes('ARCHITECTURE')) {
            return false;
        }
    }
    // ... etc ...
}

// PAR CE CODE SIMPLE ET FONCTIONNEL :
if (filters.bacFiliere && filters.bacFiliere !== 'toutes') {
    // Mapping simple entre filière bac et catégories de formation
    const filiereMapping = {
        'Scientifique': ['SANTÉ', 'INGÉNIERIE', 'ARCHITECTURE', 'AGRONOMIE & ENVIRONNEMENT'],
        'Littéraire': ['DROIT & SCIENCES SOCIALES', 'ENSEIGNEMENT', 'ARTS & DESIGN', 'INFORMATION & COMMUNICATION'],
        'Économique': ['COMMERCE & GESTION', 'DROIT & SCIENCES SOCIALES'],
        'Technique': ['TECHNIQUES & MÉTIERS', 'INGÉNIERIE', 'NUMÉRIQUE']
    };
    
    const categoriesAcceptees = filiereMapping[filters.bacFiliere] || [];
    if (!categoriesAcceptees.includes(formation.categorie)) {
        return false;
    }
}
console.log("✅ Fonctions formations chargées");