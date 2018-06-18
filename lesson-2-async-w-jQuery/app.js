/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        // jqeury request 
        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
                Authorization: 'Client-ID 1f4d297e9a9667128678468a647b8c3250b84df4fbe9cc3f23e85b7483e091a0'
            }
        }).done(addImage);

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
        $.ajax({url:`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=02bb12b4f2ac4838a2fabbbfdbae6dba`}).done(addArticles);
        function addArticles(readings) {
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