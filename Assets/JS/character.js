let allCharacters = [];

async function loadCharacters() {

    const response =
        await fetch("data/characters.json");

    allCharacters =
        await response.json();

    generateFilters();

    applyFilters();
}

/* ========================= */
/* FILTER DROPDOWNS */
/* ========================= */

function generateFilters() {

    const organizationFilter =
        document.getElementById(
            "organization-filter"
        );

    const speciesFilter =
        document.getElementById(
            "species-filter"
        );

    /* ORGANIZATIONS */

    const organizations = [
        ...new Set(
            allCharacters.flatMap(
                character => character.affiliations
            )
        )
    ];

    organizations.sort();

    organizations.forEach(org => {

        const option =
            document.createElement("option");

        option.value = org;
        option.textContent = org;

        organizationFilter.appendChild(option);
    });

    /* SPECIES */

    const species = [
        ...new Set(
            allCharacters.map(
                character => character.species
            )
        )
    ];

    species.sort();

    species.forEach(speciesName => {

        const option =
            document.createElement("option");

        option.value = speciesName;
        option.textContent = speciesName;

        speciesFilter.appendChild(option);
    });

    /* URL FILTER */

    const params =
        new URLSearchParams(window.location.search);

    const org =
        params.get("organization");

    if (org) {

        organizationFilter.value = org;

        document.getElementById(
            "archive-title"
        ).textContent = org;
    }
}

/* ========================= */
/* APPLY FILTERS */
/* ========================= */

function applyFilters() {

    const search =
        document.getElementById("search")
            .value
            .toLowerCase();

    const organization =
        document.getElementById(
            "organization-filter"
        ).value;

    const species =
        document.getElementById(
            "species-filter"
        ).value;

    let filtered =
        allCharacters.filter(character => {

            const matchesSearch =
                character.name
                    .toLowerCase()
                    .includes(search);

            const matchesOrganization =
                organization === "all" ||

                character.affiliations
                    .includes(organization);

            const matchesSpecies =
                species === "all" ||

                character.species === species;

            return (
                matchesSearch &&
                matchesOrganization &&
                matchesSpecies
            );
        });

    renderCharacters(filtered);
}

/* ========================= */
/* RENDER CARDS */
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

        card.classList.add(
            "character-card",
            character.organizationColor
        );

        card.innerHTML = `

            <img
                src="${character.image}"
                alt="${character.name}"
            >

            <div class="character-card-content">

                <h3>${character.name}</h3>

                <p class="card-title">
                    ${character.titles[0] || ""}
                </p>

                <p class="card-species">
                    ${character.species}
                </p>

            </div>

        `;

        container.appendChild(card);
    });
}

/* ========================= */
/* EVENT LISTENERS */
/* ========================= */

document
    .getElementById("search")
    .addEventListener(
        "input",
        applyFilters
    );

document
    .getElementById("organization-filter")
    .addEventListener(
        "change",
        applyFilters
    );

document
    .getElementById("species-filter")
    .addEventListener(
        "change",
        applyFilters
    );

loadCharacters();