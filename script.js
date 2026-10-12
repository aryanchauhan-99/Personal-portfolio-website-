// Dark Mode Toggle Logic
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Load data from LocalStorage or use fallback default sample data
let defaultProjects = [
    {
        id: 1,
        title: "Premium SaaS Dashboard",
        desc: "An enterprise-grade metrics tracker built with modern web technologies, real-time sync charts, and clean responsive glassmorphic layouts.",
        link: "https://github.com"
    }
];

let projects = JSON.parse(localStorage.getItem('myPortfolioProjects')) || defaultProjects;

const container = document.getElementById('projectsContainer');
const form = document.getElementById('projectForm');

// Function to Render Projects List
function renderProjects() {
    container.innerHTML = '';
    if (projects.length === 0) {
        container.innerHTML = '<p style="opacity:0.6;">No projects listed. Add one below!</p>';
        return;
    }
    projects.forEach(project => {
        const box = document.createElement('div');
        box.className = 'project-box';
        box.innerHTML = `
            <h3>${project.title}</h3>
            <button class="delete-btn" onclick="deleteProject(${project.id})">Delete</button>
            <p>${project.desc}</p>
            <a href="${project.link}" target="_blank" class="project-btn">View Live Project</a>
        `;
        container.appendChild(box);
    });
}

// Save to LocalStorage Helper
function saveToStorage() {
    localStorage.setItem('myPortfolioProjects', JSON.stringify(projects));
}

// Add Project Form Handling
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('projTitle').value;
    const desc = document.getElementById('projDesc').value;
    let link = document.getElementById('projLink').value.trim();

    // Auto-append https:// protocol if absent
    if (!link.startsWith('http://') && !link.startsWith('https://')) {
        link = 'https://' + link;
    }

    const newProject = {
        id: Date.now(), 
        title,
        desc,
        link
    };

    projects.push(newProject);
    saveToStorage();
    renderProjects();
    form.reset(); 
});

// Delete Project Action Logic
function deleteProject(id) {
    projects = projects.filter(p => p.id !== id);
    saveToStorage();
    renderProjects();
}

// Initial Load
renderProjects();
