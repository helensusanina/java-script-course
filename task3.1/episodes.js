export function render(data) {
    const container = document.createElement('div');
    container.classList.add('container', 'py-4');

    for (const episode of data.result) {
        const episodeCard = document.createElement('div');
        episodeCard.classList.add('card', 'my-2');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h4');
        title.classList.add('card-title');
        title.textContent = episode.properties.title;

        const titleEpisode = document.createElement('h5');
        titleEpisode.classList.add('card-subtitle');
        titleEpisode.textContent = `Эпизод ${episode.uid}`;

        const detailsBut = document.createElement('a');
        detailsBut.classList.add('btn', 'btn-primary');
        detailsBut.textContent = 'Подробнее';
        detailsBut.href = `?episode=${episode.uid}`;

        cardBody.append(title);
        cardBody.append(titleEpisode);
        cardBody.append(detailsBut);
        episodeCard.append(cardBody);
        container.append(episodeCard);
    }

    return container;
}
