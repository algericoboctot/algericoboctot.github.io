const renderSkillsExperiences = (items) => {
    const ul = document.querySelector('.skills__experience ul');
    if (!ul || !items) return;
    ul.innerHTML = items.map(item => `
        <li>
            <div class="w-1/3 flex flex-wrap flex-col items-center">${item.icon}</div>
            <div class="w-2/3">
                <h4>${item.name}</h4>
                <span>${item.experience}</span>
            </div>
        </li>
    `).join('');
}

const renderSkillsProficiency = (items) => {
    const ul = document.querySelector('.skills__proficiency ul');
    if (!ul || !items) return;
    ul.innerHTML = items.map(item => `
        <li>
            <div>
                <label for="${item.id}">${item.label}</label>
                <span class="skill-percentage">0</span>
            </div>
            <progress id="${item.id}" value="${item.value}" max="100">${item.value}%</progress>
        </li>
    `).join('');
}

const renderExperience = (items) => {
    const ul = document.querySelector('.experience ul');
    if (!ul || !items) return;
    ul.innerHTML = items.map(item => `
        <li>
            <h3>${item.title}</h3>
            <h4>${item.company}</h4>
            <span>${item.period}</span>
            ${item.paragraphs.map(p => `<p>${p}</p>`).join('')}
        </li>
    `).join('');
}

const renderPortfolio = (items) => {
    const ul = document.querySelector('.portfolio ul');
    if (!ul || !items) return;
    ul.innerHTML = items.map(item => `
        <li>
            <a href="${item.url}"${item.target ? ` target="${item.target}"` : ''}>
                <img class="object-cover" src="${item.image}" alt="${item.alt}" loading="lazy">
                <span class="portfolio__title">${item.alt}</span>
            </a>
        </li>
    `).join('');
}

window.loadSiteContent = async () => {
    try {
        const res = await fetch('./data.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        renderSkillsExperiences(data.skillsExperiences);
        renderSkillsProficiency(data.skillsProficiency);
        renderExperience(data.experience);
        renderPortfolio(data.portfolio);
    } catch (err) {
        console.error('Failed to load data.json:', err);
    }
}
