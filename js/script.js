{'use strict';

  const opts = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    cloudClassCount: '4',
    cloudClassPrefix: 'tag-size-',
    tagsListSelector: '.tags.list',
    articleAuthorSelector: '.post-author',
    authorsListSelector: '.authors.list'
  };


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

  function generateTitleLinks(customSelector = ''){
    console.log('custom selector: ', customSelector);

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(opts.titleListSelector);
    console.log('titles: ', titleList);
    titleList.innerHTML = '';

    let html = ''; // needed to insert link into titleList
    /* [DONE] for each article */
    const articles = document.querySelectorAll(opts.articleSelector + customSelector);
    console.log('article selector + custom selector: ', articles);
    for(let article of articles){

      /* [DONE] get the article id */
      const articleID = article.getAttribute('id');
      console.log('article ID: ', articleID);

      /* [DONE] find the title element and get the title from the title element*/
      const articleTitle = article.querySelector(opts.titleSelector).innerHTML;
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


  const calculateTagsParams = function(tags){

    const params = {max: 0, min: 99999};

    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times ');

      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }

    return params;
  };

  const calculateTagClass = function(count, params){

    //const classNumber = Math.floor( 0.5 * 5 +1 );
    //const classNumber = Math.floor( ( 3 / 6 ) * opts.cloudClassCount +1 );
    //const classNumber = Math.floor( ( ( 4 - 1 ) / ( 7 - 1 ) ) * opts.cloudClassCount + 1 );
    const classNumber = Math.floor( ( ( count - params.min ) / ( params.max - params.min ) ) * opts.cloudClassCount + 1 );

    return opts.cloudClassPrefix + classNumber;
  };


  /* GENERATE TAGS FOR EVERY ARTICLE */
  function generateTags(){

    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(opts.articleSelector);

    /* [DONE] START LOOP: for every article: */
    for(let article of articles){

      /* [DONE] find tags wrapper */
      const tagsWrapper = article.querySelector(opts.articleTagsSelector);
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

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
          /* [NEW] add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

      /* [DONE] END LOOP: for each tag */
      }

      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;

    /* [DONE] END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(opts.tagsListSelector);


    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){

      /* [NEW] generate code of a link and add it to allTagsHTML */
      const taglinkHTML = calculateTagClass(allTags[tag], tagsParams);
      console.log('link: ', taglinkHTML);
      allTagsHTML += '<li><a class="' + taglinkHTML + '" href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

    /* [NEW] END LOOP: for each tag in allTags: */
    }

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }

  generateTags();

  /* ADD ACTION AFTER CLICK ON TAG */
  function tagClickHandler(event){
    console.log(event);
    console.log('Tag was clicked!');

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('clicked element: ', clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href: ', href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log(tag);

    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"');

    /* START LOOP: for each active tag link */
    for(let activeTag of activeTags){

      /* remove class active */
      activeTag.classList.remove('active');

    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log(tagLinks);

    /* START LOOP: for each found tag link */
    for(let tagLink of tagLinks){

      /* add class active */
      tagLink.classList.add('active');

    /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('.post-tags a[href^="#tag-"], .tags a[href^="#tag-"] ');

    /* START LOOP: for each link */
    for(let tagLink of tagLinks){

      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();



  const calculateAuthorsParams = function(authors){

    const params = {max: 0, min: 99999};

    for(let author in authors){
      console.log(author + ' wrote ' + authors[author] + ' articles ');

      params.max = Math.max(authors[author], params.max);
      params.min = Math.min(authors[author], params.min);
    }

    return params;
  };

  /* GENERATE AUTHOR FOR EVERY ARTICLE */
  function generateAuthors(){

    /* [NEW] create a new variable allAuthors with an empty object */
    let allAuthors = {};

    /* [] find all articles */
    const articles = document.querySelectorAll(opts.articleSelector);

    /* [] START LOOP: for every article: */
    for(let article of articles){

      /* [] find authors wrapper */
      const authorWrapper = article.querySelector(opts.articleAuthorSelector);
      console.log('author wrapper: ', authorWrapper);

      /* [] make html variable with empty string */
      let html = '';

      /* [] get authors from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      console.log('author: ', articleAuthor);

      /* [] generate HTML of the link */
      const linkHTML = '<span>by </span><a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';
      console.log('link: ', linkHTML);

      /* [] add generated code to html variable */
      html = html + linkHTML;
      console.log('html: ', html);

      /* [NEW] check if this link is NOT already in allAuthors */
      if(!allAuthors[articleAuthor]) {
        /* [NEW] add generated code to allAuthors array */
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }

      /* [] insert HTML of all the links into the tags wrapper */
      authorWrapper.innerHTML = html;

    /* [] END LOOP: for every article: */
    }

    /* [NEW] find list of authors in right column */
    const authorsList = document.querySelector(opts.authorsListSelector);

    const authorsParams = calculateAuthorsParams(allAuthors);
    console.log('authorsParams: ', authorsParams);


    /* [NEW] create variable for all links HTML code */
    let allAuthorsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let articleAuthor in allAuthors){

      /* [NEW] generate code of a link and add it to allAuthorsHTML */
      const authorlinkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>';
      console.log('link: ', authorlinkHTML);
      allAuthorsHTML += authorlinkHTML + ' (' + allAuthors[articleAuthor] + ') ';

    /* [NEW] END LOOP: for each tag in allTags: */
    }

    /*[NEW] add HTML from allAuthorsHTML to authorsList */
    authorsList.innerHTML = allAuthorsHTML;
  }

  generateAuthors();


  /* ADD ACTION AFTER CLICK ON AUTHOR */
  function authorClickHandler(event){
    console.log(event);
    console.log('Author was clicked!');

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('clicked element: ', clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href: ', href);

    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
    console.log(author);

    /* find all author links with class active */
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"');

    /* START LOOP: for each active author link */
    for(let activeAuthor of activeAuthors){

      /* remove class active */
      activeAuthor.classList.remove('active');

    /* END LOOP: for each active author link */
    }

    /* find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

    console.log(authorLinks);

    /* START LOOP: for each found author link */
    for(let authorLink of authorLinks){

      /* add class active */
      authorLink.classList.add('active');

    /* END LOOP: for each found author link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors(){

    /* find all links to author */
    const authorLinks = document.querySelectorAll('.post-author a[href^="#author-"], .authors a[href^="#author-"] ');

    /* START LOOP: for each link */
    for(let authorLink of authorLinks){

      /* add tagClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
    }
  }

  addClickListenersToAuthors();

}

