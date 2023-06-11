{
  /* DISPLAY ARTICLE AFTER CLICK */
  const titleClickHandler = function(event){
    console.log(event);
    console.log('Link was clicked!');

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    event.preventDefault();
    const clickedElement = this;
    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute("href");
    console.log('href: ', articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log('article: ', targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
    console.log('targetArticle:', clickedElement);
  }

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

  /* GENERATE TITLE LIST */
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  function generateTitleLinks(){

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    console.log('titles: ', titleList);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles){

      /* get the article id */
      const articleID = article.getAttribute("id");
      console.log('article ID: ', articleID);

      /* find the title element and get the title from the title element*/
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log('article title: ', articleTitle);

      /* create HTML of the link */

      /* insert link into titleList */
    }
  }

  generateTitleLinks();
}