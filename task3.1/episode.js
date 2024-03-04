function createList(items) {
    const list = document.createElement('ul');
    list.classList.add('list-group', 'mb-4');
    items.forEach(text => {
        const item = document.createElement('li');
        item.textContent = text;
        item.classList.add('list-group-item');
        list.appendChild(item);
    });
    return list;
}

export function render(data, planets, species) {
    const container = document.createElement('div');
    container.classList.add('container', 'py-4');

    const planetsList = createList(planets.map(planet => planet.result.properties.name));
    const speciesList = createList(species.map(sp => sp.result.properties.name));

    const heading = document.createElement('h1');
    heading.innerHTML = `${data.result.properties.title}<br>Эпизод ${data.result.uid}`;

    const paragraph = document.createElement('p');
    paragraph.textContent = data.result.properties.opening_crawl;

    const headingPlanets = document.createElement('h2');
    headingPlanets.textContent = 'Planets';

    const headingSpecies = document.createElement('h2');
    headingSpecies.textContent = 'Species';

    const backButton = document.createElement('a');
    backButton.href = 'index.html';
    backButton.classList.add('btn', 'btn-primary');
    backButton.textContent = 'Back to episodes';

    container.appendChild(heading);
    container.appendChild(paragraph);
    container.appendChild(headingPlanets);
    container.appendChild(planetsList);
    container.appendChild(headingSpecies);
    container.appendChild(speciesList);
    container.appendChild(backButton);

    return container;
}
