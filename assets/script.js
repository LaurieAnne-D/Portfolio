"use strict";

const nav = document.querySelector(".navLinks-ctn");
const clickableElement = document.querySelector('.clickable');

function handleClick() {
    if (clickableElement.classList.contains('fa-water')) {
        clickableElement.classList.remove('fa-ellipsis-vertical');
        clickableElement.classList.toggle('fa-xmark');
        nav.classList.toggle('navplay');
    } else if (clickableElement.classList.contains('fa-xmark')) {
        clickableElement.classList.remove('fa-xmark');
        clickableElement.classList.toggle('fa-water');
        nav.classList.toggle('navplay');
    }
}

clickableElement.addEventListener('click', handleClick);

function skillsCtn() {
    const skillsCtn = document.querySelector(".skills");
    const skillsCtnt = document.querySelector('.iconsCtn');
    let clone = skillsCtnt.cloneNode(true);

    skillsCtn.appendChild(clone);
}


fetch('assets/projets.json')
    .then(response => response.json())
    .then(projets => {
        const projetContainer = document.querySelector(".projectsCtn");
        let currentIndex = 0;

        function showProjects() {
            projets.forEach((projet, index) => {
                const li = document.createElement("li");
                const figure = document.createElement("figure");
                const figcaption = document.createElement("figcaption");
                const coverImg = document.createElement("img");
                const h2 = document.createElement("h2");
                const p = document.createElement("p");
                const pSee = document.createElement("p");

                const descriptionModal = projet.description;
                const projetTitle = projet.title;

               
                li.id = `project-${index}`;

                li.className = "project";
                if (index === currentIndex) {
                    li.classList.add("active");
                }
                coverImg.src = projet.cover;
                h2.textContent = projet.title;
                p.textContent = projet.subtitle;
                pSee.textContent = "Voir le projet";
                pSee.classList.add("seeProject");


                pSee.addEventListener('click', function () {
                    openModal(projetTitle, descriptionModal, projet.url, projet.infos, projet.languages, projet.demo,);
                });



                figure.appendChild(coverImg);
                figcaption.appendChild(h2);
                figcaption.appendChild(p);
                figcaption.appendChild(pSee);
                li.appendChild(figure);
                figure.appendChild(figcaption);
                projetContainer.appendChild(li);
            });
        }

        function showProject(index) {
            const activeProject = document.querySelector(".project.active");
            if (activeProject) {
                activeProject.classList.remove("active");
            }
            const projectToShow = document.querySelectorAll(".project")[index];
            projectToShow.classList.add("active");
        }

        function prevProject() {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = projets.length - 1;
            }
            showProject(currentIndex);
        }

        function nextProject() {
            currentIndex++;
            if (currentIndex >= projets.length) {
                currentIndex = 0;
            }
            showProject(currentIndex);
        }


        showProjects();

        const chevronLeft = document.querySelector(".fa-chevron-left");
        const chevronRight = document.querySelector(".fa-chevron-right");

        chevronLeft.addEventListener('click', prevProject);
        chevronRight.addEventListener('click', nextProject);
    })
    .catch(error => {
        console.error('Une erreur s\'est produite lors du chargement du fichier JSON :', error);
    });




function openModal(title, descriptions, urls, infos, languages, demo) {
    const modalCtn = document.querySelector(".main");
    const modal = document.createElement("div");
    const modalContent = document.createElement("section");
    const modalHeader = document.createElement("header");
    const modalTitle = document.createElement("h1");
    const modalCloseIcon = document.createElement("i");
    const wave = document.querySelector(".fa-water");
    const modalMain = document.createElement("main");
    const modalFooter = document.createElement("footer");
    const closeModalBottom = document.createElement("p");
    const closeModalBttmIcon = document.createElement("i");

    modalTitle.textContent = title;
    closeModalBottom.textContent = "Fermer";
    
    

    modal.classList.add("modal");
    modal.classList.remove("modalNone");
    modalContent.classList.add("modalContent");
    modalHeader.classList.add("modalHeader");
    modalMain.classList.add("modalMain");
    modalFooter.classList.add("modalFooter");
    modalCloseIcon.classList.add("fa-solid", "fa-xmark");
    closeModalBttmIcon.classList.add("fa-solid", "fa-square-xmark");
    closeModalBottom.classList.add("closeModalBottom");


    modalCtn.insertBefore(modal, modalCtn.firstChild);
    modal.appendChild(modalContent);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalMain);
    modalContent.appendChild(modalFooter);
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(modalCloseIcon);
    modalFooter.appendChild(closeModalBottom);
    closeModalBottom.appendChild(closeModalBttmIcon);

    displayDemo(modalMain, demo);
    displayDescriptions(modalMain, descriptions);
    displayURLs(modalMain, urls);
    displayInfosAndLanguages(modalMain, infos, languages);

    modalContent.appendChild(modalFooter);

    modalCloseIcon.addEventListener('click', closeModal);
    wave.addEventListener('click', closeModal);
    closeModalBottom.addEventListener('click', closeModal);

    document.body.classList.add('modal-open');

   
    setTimeout(() => {
        modal.classList.add('open');
    }, 100); 
}


function displayDemo(container, demo) {
    if (!demo) return;
    const demoImg = document.createElement("img");
    demoImg.src = demo;
    container.appendChild(demoImg);
}


// Fonction pour créer un élément HTML avec du texte et l'ajouter à un conteneur
function createAndAppendElement(element, text) {
    const el = document.createElement(element);
    el.textContent = text;
    return el;
}

// Fonction principale pour afficher les descriptions dans un conteneur
function displayDescriptions(container, descriptions) {
    for (const desc of descriptions) {
        if (typeof desc === 'object' && desc.title && desc.client && desc.details) {
            // Traiter une description sous forme d'objet
            const { title, client, details } = desc;
            const descCtn = document.createElement("section");

            descCtn.classList.add("mission");

            container.appendChild(descCtn);
            descCtn.appendChild(createAndAppendElement("h2", title));
            descCtn.appendChild(createAndAppendElement("p", client)).classList.add("client");


            for (const [title, detail] of Object.entries(details)) {
                const detailsCtn = document.createElement("section");
                const detailTitle = document.createElement("h3");
                const detailP = document.createElement("p");

                detailTitle.textContent = title;
                detailP.textContent = detail;

                detailsCtn.appendChild(detailTitle);
                detailsCtn.appendChild(detailP);
                descCtn.appendChild(detailsCtn);

                if (title === "Présentation") {
                    detailsCtn.classList.add("presentation");
                }

                if (title === "Objectifs") {
                    detailsCtn.classList.add("objectifs");
                }
            }
        } else {
            console.error('Description format not recognized:', desc);
        }
    }
}



function displayURLs(container, urls) {
    if (!urls) return;
    const urlSctn = document.createElement("section");
    const urlCtn = document.createElement("div");

    urlSctn.classList.add("liens");
    urlCtn.classList.add("urlCtn");

    urlSctn.appendChild(urlCtn);
    container.appendChild(urlSctn);
    urls.forEach(url => {
        const urlTitle = document.createElement("h3");

        urlTitle.textContent = "Liens";
        urlSctn.appendChild(urlTitle);
        for (const [name, link] of Object.entries(url)) {
            const urlP = document.createElement("p");
            const linkIcon = document.createElement("i");

            linkIcon.classList.add("fa-solid", "fa-square-arrow-up-right");
            urlP.innerHTML = `<a href="${link}" target="_blank">${name}</a>`;
            urlP.appendChild(linkIcon);
            urlCtn.appendChild(urlP);
        }
    });
}

function displayInfosAndLanguages(container, infos, languages) {
    if (!infos && !languages) return;

    const infosLanguagesSection = document.createElement("section");
    const infosLanguagesCtn = document.createElement("div");
    infosLanguagesSection.classList.add("infos-languages");


    const sectionTitle = document.createElement("h3");
    sectionTitle.textContent = "Informations et Langages";
    infosLanguagesSection.appendChild(sectionTitle);


    if (infos && infos.length > 0) {
        const infosCtn = document.createElement("section");
        infosCtn.classList.add("infos");
        const infosTitle = document.createElement("h3");
        infosTitle.textContent = "Infos";
        infosCtn.appendChild(infosTitle);
        infos.forEach(info => {
            const infoP = document.createElement("p");
            infoP.textContent = info;
            infosCtn.appendChild(infoP);
        });
        infosLanguagesCtn.appendChild(infosCtn);
    }


    if (languages && languages.length > 0) {
        const languagesCtn = document.createElement("section");
        languagesCtn.classList.add("languages");
        const languagesTitle = document.createElement("h3");
        languagesTitle.textContent = "Langages";
        languagesCtn.appendChild(languagesTitle);
        languages.forEach(language => {
            const languageP = document.createElement("p");
            languageP.textContent = language;
            languagesCtn.appendChild(languageP);
        });
        infosLanguagesCtn.appendChild(languagesCtn);
    }


    infosLanguagesSection.appendChild(infosLanguagesCtn);
    container.appendChild(infosLanguagesSection);
}

function closeModal() {
    const modal = document.querySelector(".modal");
    modal.classList.remove("open"); 
    document.body.classList.remove('modal-open');
    setTimeout(() => {
        modal.remove();
    }, 300); 
}



async function fetchData() {
    try {
        const response = await fetch('assets/experiences.json');
        if (!response.ok) {
            throw new Error('La réponse du serveur n\'est pas valide. Code d\'erreur : ' + response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Une erreur est survenue lors de la récupération des données :', error);
    }
}


async function displayData() {
    const careerSection = document.querySelector('.career');
    const experiences = await fetchData();

    const experiencesCntn = document.createElement('div');

    if (experiences) {
        experiences.forEach(experience => {

            const section = document.createElement('section');
            const header = document.createElement('div');

            section.appendChild(header);

            const title = document.createElement('h3');
            title.textContent = experience.Poste;
            header.appendChild(title);

            const careerIcon = document.createElement('i');
            careerIcon.classList = experience.icon;
            header.appendChild(careerIcon);

            const date = document.createElement('p');
            date.textContent = experience.Date;
            section.appendChild(date);

            const company = document.createElement('p');
            company.textContent = experience.Entreprise;
            section.appendChild(company);

            experiencesCntn.appendChild(section);
            careerSection.appendChild(experiencesCntn);

            section.addEventListener('click', function () {
                openModal(experience.Poste, experience.Date);
                displayExperienceDetails(experience)
                const modalContent = document.querySelector('.modalContent');
                modalContent.classList.add("modalContentCareer");

            })
        });
    } else {
        console.error('Aucune donnée d\'expérience récupérée.');
    }
}

function displayExperienceDetails(experience) {
    const modalMain = document.querySelector('.modalMain');

    const experienceDetails = document.createElement('div');
    experienceDetails.innerHTML = `
        <p>Entreprise : ${experience.Entreprise}</p>
        <p>Date : ${experience.Date}</p>
        <h3>Expérience :</h3>
        <ul>
            ${experience.Expérience.map(exp => `
                <li>
                    <h4>${exp.title}</h4>
                    <ul>
                        ${exp.description.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </li>
            `).join('')}
        </ul>
    `;
    modalMain.appendChild(experienceDetails);
}


displayData();

