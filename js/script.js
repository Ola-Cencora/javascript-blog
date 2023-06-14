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
    const articleSelector = clickedElement.getAttribute('href');
    console.log('href: ', articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log('article: ', targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
    console.log('targetArticle:', clickedElement);
  };


  /* GENERATE TITLE LIST */
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

  function generateTitleLinks(){

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    console.log('titles: ', titleList);
    titleList.innerHTML = '';

    let html = ''; // needed to insert link into titleList
    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles){

      /* [DONE] get the article id */
      const articleID = article.getAttribute('id');
      console.log('article ID: ', articleID);

      /* [DONE] find the title element and get the title from the title element*/
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log('article title: ', articleTitle);

      /* [DONE] create HTML of the link */
      const linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

      /* [DONE] insert link into titleList */
      //titleList.innerHTML = titleList.innerHTML + linkHTML;
      //titleList.insertAdjacentHTML("beforeend", linkHTML); // works

      html = html + linkHTML;
      console.log('html: ', html);
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log('links: ',links);

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  /* [DONE] GENERATE TAGS FOR EVERY ARTICLE */
  function generateTags(){

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article: */
    for(let article of articles){

      /* [DONE] find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      console.log('tags wrapper: ', tagsWrapper);

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log('tags: ', articleTags);

      /* [DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log('tags array: ', articleTagsArray);

      /* [DONE] START LOOP: for each tag */
      for(let tag of articleTagsArray){
        console.log('tag: ', tag);

        /* [DONE] generate HTML of the link */
       const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>&nbsp;';
       console.log('link: ', linkHTML);

        /* [DONE] add generated code to html variable */
        html = html + linkHTML;
        console.log('html: ', html);

      /* [DONE] END LOOP: for each tag */
      }

      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;

    /* [DONE] END LOOP: for every article: */
    }
  }

  generateTags();
}
