let allCharacters = [];

async function loadCharacters() {

    const response =
        await fetch("Assets/Data/characters.json");

    allCharacters =
        await response.json();
}

/* ========================= */
/* FILTER DROPDOWNS */
/* ========================= */

function renderCharacters(characters) {

    const container =
        document.getElementById(
            "character-grid"
        );

    container.innerHTML = "";

    characters.forEach(character => {

        const card =
            document.createElement("a");

        card.href =
            `character.html?id=${character.id}`;

        card.innerHTML = `

            <img
                src="${character.image}"
                alt="${character.name}"
            >

            <div class="character-card-content">

                <h3>${character.name}</h3>

                <p class="card-title">
                    ${character.aliases[0] || ""}
                </p>

                <p class="card-species">
                    ${character.species}
                </p>

            </div>

        `;

        container.appendChild(card);
    });
}


loadCharacters();
console.log(allCharacters);