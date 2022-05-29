'use strict';
// document.getElementById('test-button').addEventListener('click', function () {
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
// });

const titleClickHandler = function (e) {
    e.preventDefault();
    /* remove class 'active' from all article links  */
    for (let i = 0; i < links.length; i++) {
        links[i].classList.remove('active');
    }
    /* add class 'active' to the clicked link */
    this.classList.add('active');
    /* remove class 'active' from all articles */
    let articles = document.querySelectorAll('.posts .post');
    for (let article of articles) {
        article.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */
    const articleSelector = e.target;
    let targetUrl = articleSelector.parentNode.getAttribute('href');
    // console.log(targetUrl);
    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(targetUrl);
    // console.log(targetArticle);
    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
}




// for (let i = 0; i < links.length; i++) {
//     console.log(links[i]);
// }

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks() {

    /* remove contents of titleList - remove list link content in left col */
    // for (let i = 0; i < links.length; i++) {
    //     document.querySelector(`a[href="#article-${i+1}"] span`).innerHTML = "";
    // }
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = ""
    /* find all articles and save them to variable: articles */
    const articles = document.querySelectorAll(optArticleSelector);

    let html = "";

    /* for each article */
    for (let i = 0; i < articles.length; i++) {
        /* get the article id */
        const articleId = document.querySelector(`.posts .post:nth-child(${i+1})`).getAttribute('id');
        // console.log(articleId)
        /* find the title element */
        const articleTitle = articles[i].querySelector(optTitleSelector).innerHTML;
        // console.log(articleTitle);
        /* get the title from the title element */

        /* create HTML of the link */
        const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
        // console.log(linkHTML);
        /* insert link into titleList */
        // titleList.innerHTML = titleList.innerHTML + linkHTML;
        // titleList.insertAdjacentHTML("beforebegin", linkHTML);
        html = html + linkHTML;
        // console.log(html);
    }
    titleList.innerHTML = html;
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
// console.log(links);
for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}

function generateTags() {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (let article of articles) {
        /* find tags wrapper */
        const tagsWrapper = article.querySelector(optArticleTagsSelector);
        /* make html variable with empty string */
        let html = "";
        /* get tags from data-tags attribute */
        const articleTag = article.getAttribute('data-tags');
        // console.log(articleTag);
        /* split tags into array */
        const articleTagsArray = articleTag.split(" ");
        // console.log(articleTagsArray);
        /* START LOOP: for each tag */
        let linkHTML = "";
        for (let i = 0; i < articleTagsArray.length; i++) {
            /* generate HTML of the link */
            linkHTML = `<li><a href="#tag-${articleTagsArray[i]}">${articleTagsArray[i]}</a></li>`;
            // console.log(linkHTML);
            /* add generated code to html variable */
            tagsWrapper.innerHTML += linkHTML + " ";
            /* END LOOP: for each tag */
        }
        /* insert HTML of all the links into the tags wrapper */

        /* END LOOP: for every article: */
    }
}

generateTags();

function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    // console.log(href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    // console.log(tag);
    /* find all tag links with class active */
    document.querySelectorAll('.post-tags .list .active').classList.remove('active');
    clickedElement.classList.add('active');
    const activeTag = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(activeTag);
    /* START LOOP: for each active tag link */

    /* remove class active */

    /* END LOOP: for each active tag link */

    /* find all tag links with "href" attribute equal to the "href" constant */

    /* START LOOP: for each found tag link */

    /* add class active */

    /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags() {
    /* find all links to tags */
    const linksToTags = document.querySelectorAll('.list li a');
    /* START LOOP: for each link */
    for (let linkToTag of linksToTags) {
        /* add tagClickHandler as event listener for that link */
        linkToTag.addEventListener('click', tagClickHandler)
        /* END LOOP: for each link */
    }
}

addClickListenersToTags();