const themeToggle = document.getElementById("themeToggle");
const projectForm = document.getElementById("projectForm");
const projectsContainer = document.getElementById("projectsContainer");

// Dark Mode
themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    themeToggle.textContent =
        document.body.classList.contains("dark-mode") ? "☀️" : "🌓";
});

// Add New Project
projectForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("projTitle").value.trim();
    const description = document.getElementById("projDesc").value.trim();
    const link = document.getElementById("projLink").value.trim();

    if (!title || !description) {
        alert("Please enter the project title and description.");
        return;
    }

    // Project Card
    const projectBox = document.createElement("div");
    projectBox.className = "project-box";

    // Project Title
    const heading = document.createElement("h3");
    heading.textContent = title;

    // Project Description
    const paragraph = document.createElement("p");
    paragraph.textContent = description;

    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";

    deleteButton.addEventListener("click", function () {
        projectBox.remove();
    });

    projectBox.appendChild(heading);
    projectBox.appendChild(deleteButton);
    projectBox.appendChild(paragraph);

    // Project Link (optional)
    if (link) {
        try {
            const projectURL = new URL(link);

            if (projectURL.protocol === "https:" ||
                projectURL.protocol === "http:") {

                const linkButton = document.createElement("a");
                linkButton.className = "project-btn";
                linkButton.textContent = "View Project";
                linkButton.href = projectURL.href;
                linkButton.target = "_blank";
                linkButton.rel = "noopener noreferrer";

                projectBox.appendChild(linkButton);
            } else {
                alert("Please enter a valid HTTP or HTTPS project link.");
                return;
            }
        } catch (error) {
            alert("Please enter a valid project URL.");
            return;
        }
    }

    // Show Project on Website
    projectsContainer.appendChild(projectBox);

    // Clear Form
    projectForm.reset();
});
