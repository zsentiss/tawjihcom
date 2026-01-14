// ===== FONCTIONS DU QUIZ D'ORIENTATION =====
console.log("🧠 Chargement du module Quiz...");

// Données des questions (copiez vos 15 questions complètes ici)
const quizQuestions = [
    {
        id: 1,
        question: "Tu préfères travailler avec des humains, des machines, ou des outils ?",
        options: [
            { text: "Avec des humains", tags: ["relationnel", "equipe", "humain"] },
            { text: "Avec des machines", tags: ["technique", "manuel", "mecanique"] },
            { text: "Avec des outils/logiciels", tags: ["technique", "digital", "logiciel"] }
        ]
    },
    {
        id: 2,
        question: "Le domaine médical ou de la santé t'intéresse ?",
        options: [
            { text: "Oui, beaucoup", tags: ["sante", "medical", "soin", "aide"] },
            { text: "Non, pas du tout", tags: [] },
            { text: "Un peu", tags: ["sante", "decouverte"] }
        ]
    },
    {
        id: 3,
        question: "Tu es plutôt quelqu'un de logique et analytique ?",
        options: [
            { text: "Oui, très", tags: ["logique", "analyse", "chiffres", "maths"] },
            { text: "Non, je suis plus créatif", tags: ["creatif", "imagination", "artistique"] },
            { text: "Les deux", tags: ["logique", "creatif", "polyvalent"] }
        ]
    },
    {
        id: 4,
        question: "Les nouvelles technologies t'attirent ?",
        options: [
            { text: "Oui, beaucoup", tags: ["technologie", "digital", "innovation", "informatique"] },
            { text: "Non, pas spécialement", tags: ["manuel", "traditionnel", "nature"] },
            { text: "Un peu", tags: ["digital", "curiosite"] }
        ]
    },
    {
        id: 5,
        question: "Tu préfères travailler en intérieur ou en extérieur ?",
        options: [
            { text: "En extérieur, j'ai besoin de nature", tags: ["nature", "exterieur", "physique", "terrain"] },
            { text: "En intérieur, au chaud et au sec", tags: ["interieur", "bureau", "confort", "calme"] },
            { text: "Un mélange des deux", tags: ["variete", "polyvalence", "diversite"] }
        ]
    },
    {
        id: 6,
        question: "L'idée de travailler avec des animaux te parle ?",
        options: [
            { text: "Oui, beaucoup !", tags: ["animaux", "nature", "soin", "veterinaire"] },
            { text: "Non, pas spécialement", tags: [] },
            { text: "Pourquoi pas", tags: ["animaux", "decouverte"] }
        ]
    },
    {
        id: 7,
        question: "Tu aimes organiser, planifier, mettre de l'ordre ?",
        options: [
            { text: "Oui, j'adore ça", tags: ["organisation", "methode", "precision", "gestion"] },
            { text: "Non, je suis plutôt spontané", tags: ["improvisation", "flexibilite", "creatif"] },
            { text: "Ça dépend des situations", tags: ["adaptable", "pragmatique"] }
        ]
    },
    {
        id: 8,
        question: "L'art sous toutes ses formes t'intéresse ?",
        options: [
            { text: "Oui, énormément", tags: ["art", "creation", "esthetique", "culture", "design"] },
            { text: "Non, ce n'est pas mon domaine", tags: [] },
            { text: "Je suis amateur/amatrice", tags: ["culture", "loisir", "esthetique"] }
        ]
    },
    {
        id: 9,
        question: "Tu préfères travailler avec ton corps ou ton mental ?",
        options: [
            { text: "Avec mon corps, être actif physiquement", tags: ["physique", "manuel", "mouvement", "sport"] },
            { text: "Avec mon mental, réflexion et stratégie", tags: ["mental", "reflexion", "strategie", "analyse"] },
            { text: "Les deux équitablement", tags: ["polyvalence", "equilibre", "complet"] }
        ]
    },
    {
        id: 10,
        question: "Le droit, les lois, la justice sont des sujets qui te passionnent ?",
        options: [
            { text: "Oui, beaucoup", tags: ["droit", "justice", "argumentation", "ethique", "societe"] },
            { text: "Non, pas mon truc", tags: [] },
            { text: "Je m'y intéresse modérément", tags: ["societe", "culture generale"] }
        ]
    },
    {
        id: 11,
        question: "Tu aimes expliquer, transmettre, enseigner ?",
        options: [
            { text: "Oui, c'est gratifiant", tags: ["enseignement", "transmission", "pedagogie", "communication"] },
            { text: "Non, je préfère apprendre", tags: ["apprentissage", "curiosite", "decouverte"] },
            { text: "Parfois", tags: ["communication", "partage"] }
        ]
    },
    {
        id: 12,
        question: "Tu serais prêt à beaucoup voyager pour ton travail ?",
        options: [
            { text: "Oui, c'est un rêve !", tags: ["voyage", "aventure", "international", "mobilite"] },
            { text: "Non, je préfère rester près de chez moi", tags: ["stabilite", "local", "famille"] },
            { text: "Quelques déplacements occasionnels", tags: ["mobilite_moderee", "flexibilite"] }
        ]
    },
    {
        id: 13,
        question: "Tu préfères un travail plutôt routinier ou qui change chaque jour ?",
        options: [
            { text: "Routinier, j'aime la stabilité", tags: ["routine", "organisation", "stabilite", "predictible"] },
            { text: "Qui change, j'aime la variété", tags: ["variete", "imprevu", "adaptation", "dynamique"] },
            { text: "Un équilibre des deux", tags: ["equilibre", "flexibilite"] }
        ]
    },
    {
        id: 14,
        question: "Tu es attiré(e) par le monde des affaires et du commerce ?",
        options: [
            { text: "Oui, beaucoup", tags: ["commerce", "business", "vente", "negociation", "gestion"] },
            { text: "Non, pas vraiment", tags: [] },
            { text: "Ça dépend", tags: ["economie", "decouverte"] }
        ]
    },
    {
        id: 15,
        question: "Quelle est ta relation avec les chiffres ?",
        options: [
            { text: "J'adore les chiffres et les calculs", tags: ["chiffres", "mathematiques", "analyse", "precision"] },
            { text: "Je préfère les lettres et les mots", tags: ["lettres", "langues", "ecriture", "communication"] },
            { text: "Je suis à l'aise avec les deux", tags: ["polyvalence", "equilibre"] }
        ]
    }
];

// Variables du quiz
let currentQuestionIndex = 0;
let userAnswers = [];
let userProfileTags = [];

// ===== FONCTIONS PRINCIPALES =====

function startSimpleQuiz() {
    console.log("🚀 Démarrage du quiz simple");
    
    // Réinitialiser
    currentQuestionIndex = 0;
    userAnswers = [];
    userProfileTags = [];
    
    // Changer l'affichage
    document.getElementById('introContainer').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'none';
    document.getElementById('pauseContainer').style.display = 'none';
    document.getElementById('questionContainer').style.display = 'block';
    
    // Afficher la première question
    displayQuestion(currentQuestionIndex);
}

function displayQuestion(index) {
    if (index >= quizQuestions.length) {
        showQuizResults();
        return;
    }
    
    const question = quizQuestions[index];
    
    // Mettre à jour le texte de la question
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('questionCounter').innerHTML = `<i class="fas fa-question-circle"></i> Question ${index + 1}/${quizQuestions.length}`;
    
    // Mettre à jour la progression
    const progressPercent = ((index) / quizQuestions.length) * 100;
    document.getElementById('progressFill').style.width = `${progressPercent}%`;
    document.getElementById('progressText').textContent = `Question ${index + 1}/${quizQuestions.length}`;
    
    // Afficher les réponses
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    question.options.forEach((option, i) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.innerHTML = `
            <div class="answer-letter">${String.fromCharCode(65 + i)}</div>
            <div class="answer-text">${option.text}</div>
        `;
        btn.onclick = () => selectAnswer(index, i, option.tags);
        answersContainer.appendChild(btn);
    });
}

function selectAnswer(questionIndex, answerIndex, tags) {
    console.log(`Question ${questionIndex + 1}: Réponse ${String.fromCharCode(65 + answerIndex)}`);
    
    // Enregistrer la réponse
    userAnswers.push({
        questionId: questionIndex,
        optionIndex: answerIndex,
        tags: tags
    });
    
    // Ajouter les tags au profil
    if (tags && tags.length > 0) {
        tags.forEach(tag => {
            if (tag && tag.trim() !== '' && !userProfileTags.includes(tag)) {
                userProfileTags.push(tag);
            }
        });
    }
    
    console.log("Tags actuels:", userProfileTags);
    
    // Passer à la question suivante
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        showQuizResults();
    }
}

function showQuizResults() {
    console.log("🎯 Affichage des résultats");
    console.log("Nombre de tags:", userProfileTags.length);
    console.log("Tags:", userProfileTags);
    
    // Calculer les recommandations
    const recommendedJobs = calculateRecommendations();
    
    // Afficher les résultats
    document.getElementById('questionContainer').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'block';
    
    displayResults(recommendedJobs);
}

// ===== FONCTION CORRIGÉE : CALCUL DES RECOMMANDATIONS =====

function calculateRecommendations() {
    console.log("📊 Calcul des recommandations...");
    
    // Récupérer les données métiers
    let jobs = [];
    if (typeof window.jobsData !== 'undefined' && window.jobsData.length > 0) {
        jobs = window.jobsData;
    } else {
        console.error("❌ Aucune donnée métiers !");
        return getDefaultJobs();
    }
    
    console.log(`✅ ${jobs.length} métiers chargés`);
    
    let scoredJobs = [];
    
    // Pour chaque métier
    jobs.forEach(job => {
        // Vérifier si le métier a des tags
        if (!job.tagsQuiz || !Array.isArray(job.tagsQuiz) || job.tagsQuiz.length === 0) {
            // Si pas de tags, on donne un score minimum
            scoredJobs.push({
                ...job,
                matchPercentage: 30 + Math.floor(Math.random() * 20), // 30-50%
                matchingTags: [],
                matchCount: 0
            });
            return;
        }
        
        let matchCount = 0;
        let matchingTags = [];
        
        // SIMPLIFIÉ : Si l'utilisateur a des tags médicaux et le métier est médical → SCORE ÉLEVÉ
        const userHasMedical = userProfileTags.some(tag => 
            tag.includes('sante') || tag.includes('medical') || tag.includes('soin')
        );
        
        const jobIsMedical = job.domaine.includes('SANTÉ') || 
                            job.nom.includes('Médecin') || 
                            job.nom.includes('Pharmacien') || 
                            job.nom.includes('Infirmier');
        
        // SIMPLIFIÉ : Si l'utilisateur a des tags techniques et le métier est technique → SCORE ÉLEVÉ
        const userHasTechnical = userProfileTags.some(tag => 
            tag.includes('technique') || tag.includes('digital') || tag.includes('informatique')
        );
        
        const jobIsTechnical = job.domaine.includes('INGÉNIERIE') || 
                              job.domaine.includes('TECHNOLOGIE');
        
               // DÉTERMINER LE POURCENTAGE DE BASE
        let basePercentage;
        
        // Comparer les tags normalement
        if (job.tagsQuiz && Array.isArray(job.tagsQuiz)) {
            job.tagsQuiz.forEach(jobTag => {
                userProfileTags.forEach(userTag => {
                    if (simpleTagMatch(jobTag, userTag)) {
                        matchCount++;
                        if (!matchingTags.includes(jobTag)) {
                            matchingTags.push(jobTag);
                        }
                    }
                });
            });
        }

        // Calcul RÉALISTE du pourcentage
        const questionsAnswered = userAnswers.length;
        if (questionsAnswered === 0) {
            basePercentage = 30 + Math.floor(Math.random() * 20); // 30-50%
        } else {
            // Pourcentage basé sur les correspondances réelles
            const maxPossibleMatches = job.tagsQuiz ? job.tagsQuiz.length * 2 : 10;
            
            if (matchCount > 0) {
                // Formule réaliste : (correspondances / maximum possible) * 100
                basePercentage = Math.round((matchCount / maxPossibleMatches) * 100);
                
                // Ajouter un petit bonus pour les bonnes correspondances
                if (basePercentage > 70) basePercentage += 5;
                if (basePercentage > 50) basePercentage += 3;
                
                // Limiter entre 40% et 95%
                basePercentage = Math.min(95, Math.max(40, basePercentage));
            } else {
                // Pas de correspondance = score bas
                basePercentage = 20 + Math.floor(Math.random() * 20); // 20-40%
            }
        }
        
        // AJOUTER UN BONUS POUR LES MÉTIERS POPULAIRES
        let bonus = 0;
        const popularJobs = ["Médecin", "Pharmacien", "Ingénieur d'État", "Développeur Informatique", "Avocat"];
        if (popularJobs.includes(job.nom)) {
            bonus += 10;
        }
        
        // FINAL PERCENTAGE (entre 40% et 95%)
        const finalPercentage = Math.min(95, Math.max(40, basePercentage + bonus));
        
        scoredJobs.push({
            id: job.id,
            nom: job.nom,
            domaine: job.domaine,
            description: job.description,
            salaire: job.salaire,
            etudes: job.etudes,
            competences: job.competences,
            matchPercentage: finalPercentage,
            matchingTags: matchingTags,
            matchCount: matchCount
        });
    });
    
    console.log(`${scoredJobs.length} métiers notés`);
    
    // Trier par pourcentage
    scoredJobs.sort((a, b) => b.matchPercentage - a.matchPercentage);
    
    // Prendre les 5 premiers
    const topJobs = scoredJobs.slice(0, 5);
    
    console.log("Top 5 métiers:", topJobs.map(j => ({ nom: j.nom, pourcentage: j.matchPercentage })));
    
    return topJobs;
}

// Fonction SIMPLIFIÉE de comparaison de tags
function simpleTagMatch(tag1, tag2) {
    if (!tag1 || !tag2) return false;
    
    // Convertir en minuscules et enlever accents
    const normalize = (str) => {
        return str.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z]/g, "");
    };
    
    const t1 = normalize(tag1);
    const t2 = normalize(tag2);
    
    // Correspondance exacte ou partielle
    return t1 === t2 || t1.includes(t2) || t2.includes(t1);
}

function getDefaultJobs() {
    // Métiers par défaut avec bons pourcentages
    return [
        {
            id: 1,
            nom: "Médecin",
            domaine: "SANTÉ & MÉDECINE",
            description: "Diagnostique et soigne les maladies. Peut exercer à l'hôpital ou en cabinet.",
            salaire: "8 000 - 50 000 DH",
            etudes: "Bac + 7 à +12",
            competences: "Résistance au stress, empathie, précision",
            matchPercentage: 85,
            matchingTags: ["sante", "medical", "humain"],
            matchCount: 3
        },
        {
            id: 8,
            nom: "Ingénieur d'État",
            domaine: "INGÉNIERIE & TECHNOLOGIE",
            description: "Conçoit, innove et résout des problèmes techniques complexes dans divers secteurs.",
            salaire: "8 000 - 30 000 DH",
            etudes: "Bac + 5",
            competences: "Esprit logique, créativité, gestion de projet",
            matchPercentage: 78,
            matchingTags: ["technique", "logique", "innovation"],
            matchCount: 3
        },
        {
            id: 10,
            nom: "Développeur Informatique",
            domaine: "INGÉNIERIE & TECHNOLOGIE",
            description: "Crée des logiciels, des applications ou des sites web. Métier très demandé.",
            salaire: "7 000 - 25 000 DH",
            etudes: "Bac + 2 à +5",
            competences: "Logique, patience, créativité",
            matchPercentage: 75,
            matchingTags: ["informatique", "digital", "logique"],
            matchCount: 3
        },
        {
            id: 14,
            nom: "Avocat",
            domaine: "DROIT, GESTION & COMMERCE",
            description: "Défend les intérêts des clients en justice et les conseille dans leurs démarches juridiques.",
            salaire: "6 000 - 50 000 DH",
            etudes: "Bac + 5 + Stage + Examen",
            competences: "Éloquence, esprit d'analyse, résistance au stress",
            matchPercentage: 72,
            matchingTags: ["droit", "justice", "argumentation"],
            matchCount: 3
        },
        {
            id: 19,
            nom: "Professeur",
            domaine: "ÉDUCATION, SOCIAL & SÉCURITÉ",
            description: "Enseigne une matière dans un collège ou lycée public.",
            salaire: "6 000 - 13 000 DH",
            etudes: "Bac + 5 + Concours",
            competences: "Pédagogie, patience, autorité bienveillante",
            matchPercentage: 68,
            matchingTags: ["enseignement", "transmission", "patience"],
            matchCount: 3
        }
    ];
}

function displayResults(jobs) {
    console.log("Affichage des résultats pour", jobs.length, "métiers");
    
    // === CORRECTION : CALCUL DE LA BARRE DE CONFIANCE GLOBALE ===
    // Au lieu de calculer une moyenne, on prend le MAXIMUM des pourcentages
    const maxConfidence = jobs.length > 0 
        ? Math.max(...jobs.map(job => job.matchPercentage))
        : 50;
    
    // OU on calcule une moyenne ÉLEVÉE
    const avgConfidence = jobs.length > 0 
        ? Math.round(jobs.reduce((sum, job) => sum + job.matchPercentage, 0) / jobs.length)
        : 50;
    
    // Utiliser la plus grande des deux valeurs
    const confidenceToShow = Math.max(maxConfidence, avgConfidence, 70);
    
    console.log("Confidence à afficher:", confidenceToShow, "(max:", maxConfidence, ", avg:", avgConfidence, ")");
    
    // Mettre à jour la barre de confiance GLOBALE (en haut des résultats)
    const confidenceFill = document.getElementById('confidenceFill');
    const confidencePercent = document.getElementById('confidencePercent');
    
    if (confidenceFill) {
        confidenceFill.style.width = `${confidenceToShow}%`;
        confidenceFill.style.transition = 'width 1s ease';
    }
    
    if (confidencePercent) {
        confidencePercent.textContent = `${confidenceToShow}%`;
    }
    
    // Mettre à jour le texte
    const resultsSubtitle = document.getElementById('resultsSubtitle');
    if (resultsSubtitle) {
        if (confidenceToShow >= 80) {
            resultsSubtitle.textContent = "Excellent ! Vos réponses correspondent fortement à ces métiers.";
        } else if (confidenceToShow >= 60) {
            resultsSubtitle.textContent = "Bonnes correspondances ! Voici les métiers qui vous conviennent.";
        } else {
            resultsSubtitle.textContent = "Voici des métiers qui pourraient vous intéresser.";
        }
    }
    
    // Afficher les métiers
    const container = document.getElementById('jobsRecommendations');
    container.innerHTML = '';
    
    if (jobs.length === 0) {
        container.innerHTML = `
            <div class="job-recommendation">
                <h4>Aucun métier ne correspond exactement</h4>
                <p>Essayez de refaire le quiz avec des réponses différentes.</p>
                <button onclick="restartSmartQuiz()" class="btn btn-small">
                    <i class="fas fa-redo"></i> Refaire le quiz
                </button>
            </div>
        `;
        return;
    }
    
    jobs.forEach((job, index) => {
        const jobElement = document.createElement('div');
        jobElement.className = 'job-recommendation';
        
        // Déterminer la couleur selon le pourcentage
        let percentageColor = '#e74c3c'; // Rouge par défaut
        if (job.matchPercentage >= 80) percentageColor = '#27ae60'; // Vert
        else if (job.matchPercentage >= 65) percentageColor = '#f39c12'; // Orange
        else if (job.matchPercentage >= 50) percentageColor = '#3498db'; // Bleu
        
        jobElement.innerHTML = `
            <div class="job-match" style="background: ${percentageColor}">
                ${job.matchPercentage}% de correspondance
            </div>
            <h4>${index + 1}. ${job.nom}</h4>
            <p><strong>Domaine:</strong> ${job.domaine}</p>
            <p>${job.description}</p>
            
            <div class="job-details" style="margin: 15px 0; background: #f8f9fa; padding: 15px; border-radius: 8px;">
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
            </div>
            
            ${job.matchingTags && job.matchingTags.length > 0 ? `
            <div style="margin: 15px 0;">
                <p style="font-weight: bold; margin-bottom: 8px; color: var(--rouge);">
                    <i class="fas fa-check-circle"></i> Points communs avec votre profil :
                </p>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${job.matchingTags.map(tag => `
                        <span style="background: #e8f4fc; padding: 5px 12px; border-radius: 15px; font-size: 0.85rem; color: #3498db;">
                            ${getTagLabel(tag)}
                        </span>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            <div class="job-actions">
                <button class="btn btn-small" onclick="saveJob(${job.id})">
                    <i class="fas fa-save"></i> Sauvegarder
                </button>
                <button class="btn btn-small btn-secondary" onclick="viewJob(${job.id})">
                    <i class="fas fa-eye"></i> Voir détails
                </button>
            </div>
        `;
        container.appendChild(jobElement);
    });
}

function getTagLabel(tag) {
    const labels = {
        "relationnel": "Travail en équipe",
        "sante": "Santé",
        "medical": "Médical",
        "soin": "Soin",
        "logique": "Esprit logique",
        "technique": "Aptitudes techniques",
        "digital": "Numérique",
        "informatique": "Informatique",
        "organisation": "Organisation",
        "art": "Art",
        "creatif": "Créativité",
        "enseignement": "Enseignement",
        "droit": "Droit",
        "justice": "Justice",
        "commerce": "Commerce",
        "chiffres": "Chiffres",
        "lettres": "Lettres"
    };
    
    return labels[tag] || tag;
}

// ===== FONCTIONS DE NAVIGATION =====

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        userAnswers.pop();
        
        // Recalculer les tags
        userProfileTags = [];
        userAnswers.forEach(answer => {
            if (answer.tags && answer.tags.length > 0) {
                answer.tags.forEach(tag => {
                    if (tag && tag.trim() !== '' && !userProfileTags.includes(tag)) {
                        userProfileTags.push(tag);
                    }
                });
            }
        });
        
        displayQuestion(currentQuestionIndex);
    }
}

function pauseQuiz() {
    document.getElementById('questionContainer').style.display = 'none';
    document.getElementById('pauseContainer').style.display = 'block';
}

function resumeQuiz() {
    document.getElementById('pauseContainer').style.display = 'none';
    document.getElementById('questionContainer').style.display = 'block';
}

function saveAndExit() {
    const quizState = {
        timestamp: new Date().getTime(),
        userProfileTags: userProfileTags || [],
        userAnswers: userAnswers || []
    };
    
    if (currentQuestionIndex < quizQuestions.length && userAnswers.length > 0) {
        quizState.currentQuestionIndex = currentQuestionIndex;
        quizState.quizPhase = 'questions';
    } else if (document.getElementById('resultContainer') && 
               document.getElementById('resultContainer').style.display === 'block') {
        quizState.quizPhase = 'results';
        quizState.currentQuestionIndex = quizQuestions.length;
    }
    
    localStorage.setItem('quizState', JSON.stringify(quizState));
    window.location.href = 'index.html';
}

function saveQuizResults() {
    const jobs = calculateRecommendations();
    if (jobs && jobs.length > 0) {
        // Sauvegarder les 3 premiers métiers
        jobs.slice(0, 3).forEach(job => {
            if (typeof window.saveJob === 'function') {
                window.saveJob(job.id);
            }
        });
        showNotification('✅ Vos résultats ont été sauvegardés !', 'success');
    } else {
        showNotification('⚠️ Aucun résultat à sauvegarder.', 'warning');
    }
}

function viewJob(jobId) {
    // Sauvegarder d'abord
    if (typeof window.saveJob === 'function') {
        window.saveJob(jobId);
    }
    
    // Rediriger vers la page métiers
    window.location.href = 'metiers.html';
}

function restartSmartQuiz() {
    // Nettoyer l'état précédent
    localStorage.removeItem('quizState');
    
    // Réinitialiser les variables
    currentQuestionIndex = 0;
    userAnswers = [];
    userProfileTags = [];
    
    // Revenir à l'introduction
    document.getElementById('introContainer').style.display = 'block';
    document.getElementById('questionContainer').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'none';
    document.getElementById('pauseContainer').style.display = 'none';
    
    console.log("🔄 Quiz réinitialisé");
}

function savePersonalNote() {
    const note = document.getElementById('personalNote').value;
    if (note.trim()) {
        localStorage.setItem('quizNote', note);
        showNotification('✅ Note sauvegardée !', 'success');
    }
}

function loadPersonalNote() {
    const note = localStorage.getItem('quizNote');
    if (note) {
        document.getElementById('personalNote').value = note;
    }
}

function clearQuizState() {
    localStorage.removeItem('quizState');
    localStorage.removeItem('quizNote');
    console.log("🗑️ État du quiz nettoyé");
}

// Fonction de notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : type === 'warning' ? 'exclamation' : 'info'}-circle"></i>
        <span>${message}</span>
    `;
    
    // Style
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
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 3s forwards;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        max-width: 350px;
        ${type === 'success' ? 'background: #27ae60; color: white;' :
          type === 'error' ? 'background: #e74c3c; color: white;' :
          type === 'warning' ? 'background: #f39c12; color: white;' :
          'background: #3498db; color: white;'}
    `;
    
    document.body.appendChild(notification);
    
    // Ajouter l'animation CSS si pas déjà présente
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
    }, 3000);
}

// ===== EXPOSER LES FONCTIONS GLOBALEMENT =====
window.startSimpleQuiz = startSimpleQuiz;
window.restartSmartQuiz = restartSmartQuiz;
window.previousQuestion = previousQuestion;
window.pauseQuiz = pauseQuiz;
window.resumeQuiz = resumeQuiz;
window.saveAndExit = saveAndExit;
window.saveQuizResults = saveQuizResults;
window.viewJob = viewJob;
window.savePersonalNote = savePersonalNote;
window.loadPersonalNote = loadPersonalNote;
window.clearQuizState = clearQuizState;
window.showNotification = showNotification;

console.log("✅ Module Quiz COMPLET chargé - Pourcentages corrigés");