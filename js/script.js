'use strict';
// document.getElementById('test-button').addEventListener('click', function () {
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
// });

// const links = document.querySelectorAll('.titles a');

// for (let link of links) {
//     console.log(link);
// }

// for (let i = 0; i < links.length; i++) {
//     console.log(links[i]);
// }

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

const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}