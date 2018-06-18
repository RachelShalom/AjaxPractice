(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
     
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        const unsplashRequest = new XMLHttpRequest();
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload = addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID 1f4d297e9a9667128678468a647b8c3250b84df4fbe9cc3f23e85b7483e091a0');
        unsplashRequest.send();

        function addImage(){
         const data=JSON.parse(this.responseText);
         let htmlContent='';
         if(data && data.results && data.results[0]){
         const firstImage= data.results[0];
         htmlContent=`<figure>
         <img
         src="${firstImage.urls.regular}"
         alt="${searchedForText}">	
         <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
       </figure>`
         }else{
          htmlContent='afterbegin','<div class= "eroor-no-image"> no results for this search </div>';
         }
         responseContainer.insertAdjacentHTML('afterbegin',htmlContent);
         
        }
        function addArticles () {
        let htmlContent='';
        const data= JSON.parse( this.responseText);
        const articles = data.response.docs;
        if(data && data.response.docs){
            for(var i=0; i<articles.length; i++){
             htmlContent+=`<li class="article"><h2><a href="${articles[i].web_url}">${articles[i].snippet}</a></h2></li>`
            }
        }else{
            htmlContent=`<div> no results found</div>`
        }
        responseContainer.insertAdjacentHTML('beforeend',htmlContent);
        }
        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=02bb12b4f2ac4838a2fabbbfdbae6dba`);
        articleRequest.send();

    });
})();
