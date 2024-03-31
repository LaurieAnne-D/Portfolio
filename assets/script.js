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

skillsCtn();


fetch('assets/projets.json')
    .then(response => response.json())
    .then(projets => {
        console.log(projets);
        const projetContainer = document.querySelector(".projectsCtn");

        for (const projet of projets) {
            const li = document.createElement("li");
            const coverImg = document.createElement("img");
            const projectInfo = document.createElement("div");
            const infoIcon = document.createElement("i");

            const descriptionModal = projet.description;
            const projetTitle = projet.title;

            li.id = projetTitle;
            coverImg.src = projet.cover;

            projectInfo.classList.add("projectInfo");
            infoIcon.classList.add("fa-solid", "fa-circle-plus");


            if (projet.languages) {
                projet.languages.forEach(langage => {
                    const langageP = document.createElement("p");
                    langageP.textContent = ` ${langage}`;
                    projectInfo.appendChild(langageP);
                });
            }

            if (projet.infos) {
                projet.infos.forEach(info => {
                    const infoP = document.createElement("p");
                    infoP.textContent = ` ${info}`;
                    projectInfo.appendChild(infoP);
                });
            }

            li.appendChild(coverImg);
            li.appendChild(projectInfo);
            projectInfo.appendChild(infoIcon);
            projetContainer.appendChild(li);

            infoIcon.addEventListener('click', function () {
                openModal(projetTitle, descriptionModal, projet.url, projet.infos, projet.languages, projet.demo,);
            });

        }
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
    const modalIcon = document.createElement("i");
    const wave = document.querySelector(".fa-water");

    modalTitle.textContent = title;

    modal.classList.add("modal");
    modal.classList.remove("modalNone");
    modalContent.classList.add("modalContent");
    modalHeader.classList.add("modalHeader");
    modalIcon.classList.add("fa-solid", "fa-xmark");

    modalCtn.insertBefore(modal, modalCtn.firstChild);
    modal.appendChild(modalContent);
    modalContent.appendChild(modalHeader);
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(modalIcon);

    displayDemo(modalContent, demo);
    displayDescriptions(modalContent, descriptions);
    displayURLs(modalContent, urls);
    displayInfos(modalContent, infos);
    displayLanguages(modalContent, languages);

    modalIcon.addEventListener('click', closeModal);
    wave.addEventListener('click', closeModal);

    document.body.classList.add('modal-open');
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
    const urlsTitle = document.createElement("h2");
    urlsTitle.textContent = "URLs";
    container.appendChild(urlsTitle);
    urls.forEach(url => {
        const urlTitle = document.createElement("h3");
        urlTitle.textContent = "Link";
        container.appendChild(urlTitle);
        for (const [name, link] of Object.entries(url)) {
            const urlP = document.createElement("p");
            urlP.innerHTML = `<a href="${link}" target="_blank">${name}</a>`;
            container.appendChild(urlP);
        }
    });
}

function displayInfos(container, infos) {
    if (!infos) return;
    const infosTitle = document.createElement("h2");
    infosTitle.textContent = "Infos";
    container.appendChild(infosTitle);
    infos.forEach(info => {
        const infoP = document.createElement("p");
        infoP.textContent = info;
        container.appendChild(infoP);
    });
}

function displayLanguages(container, languages) {
    if (!languages) return;
    const languagesTitle = document.createElement("h2");
    languagesTitle.textContent = "Languages";
    container.appendChild(languagesTitle);
    languages.forEach(language => {
        const languageP = document.createElement("p");
        languageP.textContent = language;
        container.appendChild(languageP);
    });
}

function closeModal() {
    const modal = document.querySelector(".modal");
    modal.classList.remove("modal");
    modal.classList.add("modalNone");
    document.body.classList.remove('modal-open');
}
