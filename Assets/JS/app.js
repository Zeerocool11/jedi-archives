async function loadCharacters() {

    const response = await fetch("../Data/characters.json");

    const characters = await response.json();

    generateCharacterDropdown(characters);

    generateRecentCharacters(characters);
}

function generateCharacterDropdown(characters) {

    const dropdown = document.getElementById("character-dropdown");

    characters.forEach(character => {

        const li = document.createElement("li");

        li.innerHTML = `
            <a href="character.html?id=${character.id}">
                ${character.name}
            </a>
        `;

        dropdown.appendChild(li);
    });
}

function generateRecentCharacters(characters) {

    const container = document.getElementById("recent-characters");

    characters.slice(0, 6).forEach(character => {

        const card = document.createElement("a");

        card.href = `character.html?id=${character.id}`;

        card.classList.add(
            "character-card",
            character.organizationColor
        );

        card.innerHTML = `

            <img src="${character.image}" alt="${character.name}">

            <div class="character-card-content">
                <h3>${character.name}</h3>
                <p>${character.species}</p>
            </div>

        `;

        container.appendChild(card);
    });
}

loadCharacters();

