(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
            headers: {
                Authorization: 'Client-ID 1f4d297e9a9667128678468a647b8c3250b84df4fbe9cc3f23e85b7483e091a0'
            }
        }).then(response => response.json()).then(addImage).catch(e => requestError(e, 'image'));
        function addImage(images) {
            let htmlContent = '';
            if (images && images.results && images.results[0]) {
                const firstImage = images.results[0];
                htmlContent = `<figure>
                <img
                src="${firstImage.urls.regular}"
                alt="${searchedForText}">	
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`
            } else {
                htmlContent = 'afterbegin', '<div class= "eroor-no-image"> no results for this search </div>';
            }
            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);

        }
        function requestError(e, part) {
            console.log(e);
            responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
        }
        //request for the ny times
        fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=02bb12b4f2ac4838a2fabbbfdbae6dba`).then(response => response.json()).then(addArticles)
        .catch(e => requestError(e, 'articles'))
        function addArticles(readings) {
            debugger;
            let htmlContent = '';
            const articles = readings.response.docs;
            if (readings && readings.response.docs) {
                for (var i = 0; i < articles.length; i++) {
                    htmlContent += `<li class="article"><h2><a href="${articles[i].web_url}">${articles[i].snippet}</a></h2></li>`
                }
            } else {
                htmlContent = `<div> no results found</div>`
            }
            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }

    });
})();