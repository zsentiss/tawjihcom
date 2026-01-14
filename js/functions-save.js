 // ===== FONCTIONS DE SAUVEGARDE =====

// Sauvegarder un métier
window.saveJob = function(jobId) {
    let saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    if (!saved.includes(jobId)) {
        saved.push(jobId);
        localStorage.setItem('savedJobs', JSON.stringify(saved));
        showNotification('✅ Métier sauvegardé !', 'success');
        if (typeof updateSavedItems === 'function') {
            updateSavedItems();
        }
    } else {
        showNotification('⚠️ Ce métier est déjà sauvegardé.', 'warning');
    }
};

// Sauvegarder une formation
window.saveFormation = function(formationId) {
    let saved = JSON.parse(localStorage.getItem('savedFormations') || '[]');
    if (!saved.includes(formationId)) {
        saved.push(formationId);
        localStorage.setItem('savedFormations', JSON.stringify(saved));
        showNotification('✅ Formation sauvegardée !', 'success');
        if (typeof updateSavedItems === 'function') {
            updateSavedItems();
        }
    } else {
        showNotification('⚠️ Cette formation est déjà sauvegardée.', 'warning');
    }
};

// Mettre à jour les éléments sauvegardés
window.updateSavedItems = function() {
    const container = document.getElementById('savedItems');
    if (!container) return;
    
    // Vérifier si les données sont chargées
    if (window.jobsData.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px;">Chargement des données...</p>';
        setTimeout(() => {
            loadDataIfNeeded();
            updateSavedItems();
        }, 100);
        return;
    }
    
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const savedFormations = JSON.parse(localStorage.getItem('savedFormations') || '[]');
    
    let html = '';
    
    if (savedJobs.length === 0 && savedFormations.length === 0) {
        // QUAND AUCUNE SAUVEGARDE
        html = `
            <div style="background: #f8f9fa; border-radius: 10px; padding: 20px; margin-bottom: 30px; border-left: 4px solid var(--vert);">
                <h4 style="color: var(--rouge); margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-info-circle"></i> Information
                </h4>
                <p style="color: #555;">
                    Vous n'avez pas encore sauvegardé de métier ou de formation.
                </p>
            </div>
            
            <div style="text-align: center; padding: 40px; background: white; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
                <i class="fas fa-bookmark fa-4x" style="color: var(--bleu); opacity: 0.7; margin-bottom: 20px;"></i>
                <h3 style="color: var(--rouge); margin-bottom: 15px;">Aucune sauvegarde</h3>
                <p style="color: #666; margin-bottom: 25px; max-width: 500px; margin-left: auto; margin-right: auto;">
                    Explorez les métiers et les parcours, et cliquez sur "Sauvegarder" pour les ajouter ici.
                </p>
                <div>
                    <a href="metiers.html" class="btn" style="margin: 5px;">
                        <i class="fas fa-briefcase"></i> Explorer les métiers
                    </a>
                    <a href="parcours.html" class="btn btn-secondary" style="margin: 5px;">
                        <i class="fas fa-road"></i> Voir les formations
                    </a>
                </div>
            </div>
        `;
    } else {
        // QUAND IL Y A DES SAUVEGARDES
        html = `
            <div style="background: #f8f9fa; border-radius: 10px; padding: 20px; margin-bottom: 30px; border-left: 4px solid var(--vert);">
                <h4 style="color: var(--rouge); margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-info-circle"></i> Information
                </h4>
                <p style="color: #555; margin-bottom: 10px;">
                    Vous avez <strong>${savedJobs.length} métier(s)</strong> et <strong>${savedFormations.length} formation(s)</strong> sauvegardé(s).
                </p>
            </div>
        `;
        
        // Afficher les métiers sauvegardés
        if (savedJobs.length > 0) {
            html += '<h3 style="color: #2c3e50; margin-top: 20px; margin-bottom: 25px; padding-bottom: 10px; border-bottom: 2px solid var(--rouge);"><i class="fas fa-briefcase"></i> Métiers Sauvegardés</h3>';
            html += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 25px;">';
            
            savedJobs.forEach(id => {
                const job = window.jobsData.find(j => j.id === id);
                if (job) {
                    html += createSavedJobHTML(job);
                }
            });
            html += '</div>';
        }
        
        // Afficher les formations sauvegardées
        if (savedFormations.length > 0) {
            html += '<h3 style="color: #2c3e50; margin-top: 40px; margin-bottom: 25px; padding-bottom: 10px; border-bottom: 2px solid var(--rouge);"><i class="fas fa-university"></i> Formations Sauvegardées</h3>';
            html += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 25px;">';
            
            savedFormations.forEach(id => {
                const formation = window.formationsData.find(f => f.id === id);
                if (formation) {
                    html += createSavedFormationHTML(formation);
                }
            });
            html += '</div>';
        }
    }
    
    container.innerHTML = html;
};

// HTML pour un métier sauvegardé
function createSavedJobHTML(job) {
    return `
        <div class="saved-item">
            <div class="saved-item-header">
                <span class="saved-item-type">Métier</span>
                <h4>${job.nom}</h4>
                <div class="saved-domain"><i class="fas fa-tag"></i> ${job.domaine}</div>
            </div>
            <div class="saved-item-content">
                <p class="saved-description">${job.description}</p>
                <div class="saved-details">
                    <div class="saved-detail-item">
                        <i class="fas fa-money-bill-wave"></i>
                        <div>
                            <div class="saved-detail-label">Salaire</div>
                            <div class="saved-detail-value">${job.salaire}</div>
                        </div>
                    </div>
                    <div class="saved-detail-item">
                        <i class="fas fa-graduation-cap"></i>
                        <div>
                            <div class="saved-detail-label">Études</div>
                            <div class="saved-detail-value">${job.etudes}</div>
                        </div>
                    </div>
                    <div class="saved-detail-item">
                        <i class="fas fa-road"></i>
                        <div>
                            <div class="saved-detail-label">Parcours type</div>
                            <div class="saved-detail-value">${job.parcours}</div>
                        </div>
                    </div>
                </div>
                <div class="saved-actions">
                    <button class="btn btn-small" onclick="removeSavedJob(${job.id})">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                </div>
            </div>
        </div>
    `;
}

// HTML pour une formation sauvegardée
function createSavedFormationHTML(formation) {
    return `
        <div class="saved-item">
            <div class="saved-item-header">
                <span class="saved-item-type" style="background: ${formation.type === 'Public' ? '#27ae60' : formation.type === 'Privé' ? '#3498db' : '#f39c12'}">${formation.type}</span>
                <h4>${formation.nom}</h4>
                <div class="saved-domain"><i class="fas fa-map-marker-alt"></i> ${formation.ville}</div>
            </div>
            <div class="saved-item-content">
                <p class="saved-description">${formation.description}</p>
                <div class="formation-info">
                    <span class="info-tag"><i class="fas fa-clock"></i> ${formation.duree}</span>
                    <span class="info-tag"><i class="fas fa-chart-line"></i> ${formation.tauxReussite}</span>
                    <span class="info-tag"><i class="fas fa-star"></i> Bac ${formation.noteBacMin}+</span>
                </div>
                <p style="margin-top: 15px; color: #555; font-size: 0.9rem;"><strong>Conditions:</strong> ${formation.conditions}</p>
                <div class="saved-actions">
                    <button class="btn btn-small" onclick="removeSavedFormation(${formation.id})">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                    ${formation.lien !== '#' ? `
                    <a href="${formation.lien}" target="_blank" class="btn btn-small btn-secondary">
                        <i class="fas fa-external-link-alt"></i> Site web
                    </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// Supprimer un métier sauvegardé
window.removeSavedJob = function(jobId) {
    let saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    saved = saved.filter(id => id !== jobId);
    localStorage.setItem('savedJobs', JSON.stringify(saved));
    updateSavedItems();
    showNotification('🗑️ Métier supprimé des sauvegardes', 'info');
};

// Supprimer une formation sauvegardée
window.removeSavedFormation = function(formationId) {
    let saved = JSON.parse(localStorage.getItem('savedFormations') || '[]');
    saved = saved.filter(id => id !== formationId);
    localStorage.setItem('savedFormations', JSON.stringify(saved));
    updateSavedItems();
    showNotification('🗑️ Formation supprimée des sauvegardes', 'info');
};

// Générer PDF
window.generatePDF = function() {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    const savedFormations = JSON.parse(localStorage.getItem('savedFormations') || '[]');
    
    if (savedJobs.length === 0 && savedFormations.length === 0) {
        showNotification('Aucun métier ou formation sauvegardé.', 'warning');
        return;
    }
    
    showNotification('📄 Génération du PDF en cours...', 'info');
    
    // Utiliser la méthode simplifiée pour W3Schools
    const content = generatePDFContent(savedJobs, savedFormations);
    
    // Créer une nouvelle fenêtre avec le contenu
    const printWindow = window.open('', '_blank');
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    
    // Attendre un peu puis imprimer
    setTimeout(() => {
        printWindow.print();
        showNotification('✅ PDF prêt pour impression !', 'success');
    }, 500);
};

// Générer le contenu PDF simplifié
function generatePDFContent(savedJobs, savedFormations) {
    const jobs = savedJobs.map(id => window.jobsData.find(j => j.id === id)).filter(j => j);
    const formations = savedFormations.map(id => window.formationsData.find(f => f.id === id)).filter(f => f);
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>TawjihCOM - Mes Sauvegardes</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
                h1 { color: #780811; border-bottom: 2px solid #91b2cf; padding-bottom: 10px; }
                h2 { color: #780811; margin-top: 30px; border-left: 4px solid #caebb9; padding-left: 10px; }
                .section { margin: 20px 0; padding: 15px; background: #f9f9f9; border-radius: 5px; }
                .stat { display: inline-block; padding: 5px 15px; margin: 0 10px 10px 0; background: #91b2cf; color: white; border-radius: 15px; }
                .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 0.9em; text-align: center; }
            </style>
        </head>
        <body>
            <h1>📚 TawjihCOM - Mes Sauvegardes</h1>
            <p>Généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
            
            <div class="stat">${jobs.length} métiers</div>
            <div class="stat">${formations.length} formations</div>
            
            ${jobs.length > 0 ? `
            <h2>Métiers Sauvegardés</h2>
            ${jobs.map(job => `
                <div class="section">
                    <h3>${job.nom}</h3>
                    <p><strong>Domaine:</strong> ${job.domaine}</p>
                    <p><strong>Description:</strong> ${job.description}</p>
                    <p><strong>Salaire:</strong> ${job.salaire}</p>
                    <p><strong>Études:</strong> ${job.etudes}</p>
                    <p><strong>Parcours type:</strong> ${job.parcours}</p>
                </div>
            `).join('')}
            ` : ''}
            
            ${formations.length > 0 ? `
            <h2>Formations Sauvegardées</h2>
            ${formations.map(formation => `
                <div class="section">
                    <h3>${formation.nom}</h3>
                    <p><strong>Ville:</strong> ${formation.ville} | <strong>Type:</strong> ${formation.type}</p>
                    <p><strong>Description:</strong> ${formation.description}</p>
                    <p><strong>Durée:</strong> ${formation.duree} | <strong>Réussite:</strong> ${formation.tauxReussite}</p>
                    <p><strong>Conditions:</strong> ${formation.conditions}</p>
                </div>
            `).join('')}
            ` : ''}
            
            <div class="footer">
                <p>Document généré via TawjihCOM - Plateforme d'orientation pour les jeunes marocains</p>
                <p>Projet 2025 - Zineb Sentissi</p>
            </div>
        </body>
        </html>
    `;
}

// Initialiser la page de sauvegarde
// Initialiser la page de sauvegarde
window.initSavePage = function() {
    console.log("💾 Initialisation page Sauvegarde");
    updateSavedItems();
    addClearAllButton();
};

// Ajouter les boutons de contrôle
function addClearAllButton() {
    const savedContainer = document.getElementById('savedItems');
    if (!savedContainer) return;
    
    // Vérifier si les boutons existent déjà
    if (document.querySelector('#saveControls')) return;
    
    // Créer un conteneur pour les boutons
    const controlsDiv = document.createElement('div');
    controlsDiv.id = 'saveControls';
    controlsDiv.style.cssText = `
        display: flex;
        gap: 15px;
        justify-content: center;
        margin: 30px 0;
        flex-wrap: wrap;
    `;
    
    // Créer le bouton "Générer PDF" (style ancien)
    const pdfBtn = document.createElement('button');
    pdfBtn.className = 'btn';
    pdfBtn.innerHTML = '<i class="fas fa-file-pdf"></i> Générer PDF';
    pdfBtn.onclick = generatePDF;
    
    // Créer le bouton "Tout effacer" (bleu)
    const clearBtn = document.createElement('button');
    clearBtn.className = 'btn';
    clearBtn.innerHTML = '<i class="fas fa-trash-alt"></i> Tout effacer';
    clearBtn.onclick = clearAllSaved;
    clearBtn.style.background = 'var(--bleu)';
    clearBtn.style.color = 'white';
    
    // Ajouter les boutons au conteneur
    controlsDiv.appendChild(pdfBtn);
    controlsDiv.appendChild(clearBtn);
    
    // Insérer les boutons après le contenu des sauvegardes
    savedContainer.insertAdjacentElement('afterend', controlsDiv);
}


// Tout effacer
window.clearAllSaved = function() {
    const confirmMessage = "Voulez-vous vraiment supprimer TOUTES vos sauvegardes ?\n\nCette action est irréversible.\n\n• Métiers sauvegardés : " + (JSON.parse(localStorage.getItem('savedJobs') || '[]').length) + "\n• Formations sauvegardées : " + (JSON.parse(localStorage.getItem('savedFormations') || '[]').length);
    
    if (confirm(confirmMessage)) {
        localStorage.removeItem('savedJobs');
        localStorage.removeItem('savedFormations');
        localStorage.removeItem('quizNote'); // Optionnel : supprimer aussi les notes du quiz
        
        updateSavedItems();
        showNotification('🗑️ Toutes les sauvegardes ont été supprimées.', 'info');
        
        // Recharger la page pour voir les changements
        setTimeout(() => {
            location.reload();
        }, 1500);
    }
};
console.log("✅ Fonctions de sauvegarde chargées");