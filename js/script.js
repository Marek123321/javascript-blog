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
    console.log(targetUrl);
    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(targetUrl);
    console.log(targetArticle);
    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
}




// for (let i = 0; i < links.length; i++) {
//     console.log(links[i]);
// }

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

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
        titleList.insertAdjacentHTML("beforebegin", linkHTML);
        html = html + linkHTML;
        console.log(html);
    }
    titleList.innerHTML = html;
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
console.log(links);
for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}