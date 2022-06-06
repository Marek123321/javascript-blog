'use strict';
const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authourCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
}
const titleClickHandler = function (e) {
    e.preventDefault();
    for (let i = 0; i < links.length; i++) {
        links[i].classList.remove('active');
    }
    this.classList.add('active');
    let articles = document.querySelectorAll('.posts .post');
    for (let article of articles) {
        article.classList.remove('active');
    }
    const articleSelector = e.target;
    let targetUrl = articleSelector.parentNode.getAttribute('href');
    const targetArticle = document.querySelector(targetUrl);
    targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post .post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optAuthorListSelector = '.authors';

function generateTitleLinks(customSelector = '') {
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = ""
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = "";
    for (let i = 0; i < articles.length; i++) {
        const articleId = document.querySelector(`.posts .post:nth-child(${i+1})`).getAttribute('id');
        const articleTitle = articles[i].querySelector(optTitleSelector).innerHTML;
        const linkHTMLData = {
            id: articleId,
            title: articleTitle
        };
        const linkHTML = templates.articleLink(linkHTMLData);
        html = html + linkHTML;
    }
    titleList.innerHTML = html;
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}

function calculateTagsParams(tags) {
    const params = {
        max: 0,
        min: 999999
    }
    for (let tag in tags) {
        if (tags[tag] > params.max) {
            params.max = tags[tag];
        }
        if (tags[tag] < params.min) {
            params.min = tags[tag];
        }
    }

    return params;
}

function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    let classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return optCloudClassPrefix + classNumber;
}

function generateTags() {
    let allTags = {};
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
        const tagsWrapper = article.querySelector(optArticleTagsSelector);
        const articleTag = article.getAttribute('data-tags');
        /* split tags into array */
        const articleTagsArray = articleTag.split(" ");
        // console.log(articleTagsArray);
        let linkHTML = "";
        for (let tag of articleTagsArray) {
            // linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
            const linkHTMLData = {
                id: tag,
                title: tag
            };
            const linkHTML = templates.articleLink(linkHTMLData);
            tagsWrapper.innerHTML += linkHTML + " ";
            // console.log(tag);
            /* [NEW] check if this link is NOT already in allTags */
            if (!allTags[tag]) { // jeśli allTags NIE MA klucza tag
                allTags[tag] = 1;
            } else {
                allTags[tag]++;
            }
            // console.log(allTags[tag]);
        }

        const tagList = document.querySelector(optTagsListSelector);
        const tagsParams = calculateTagsParams(allTags);
        // let allTagsHTML = '';
        const allTagsData = {
            tags: []
        };

        for (let tag in allTags) {
            // const tagLinkHTML = `<li><a href="#tag-${tag}" class="${calculateTagClass(allTags[tag], tagsParams)}">${tag}</a></li>`;
            allTagsData.tags.push({
                tag: tag,
                count: allTags[tag],
                className: calculateTagClass(allTags[tag], tagsParams)
            });
        }
        tagList.innerHTML = templates.tagCloudLink(allTagsData);
        // console.log(allTagsData);
    }
}

generateTags();

function tagClickHandler(event) {
    event.preventDefault();
    const href = this.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    for (let activeTag of activeTags) {
        activeTag.classList.remove("active");
    }
    const foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');
    for (let foundTagLink of foundTagLinks) {
        foundTagLink.classList.add("active");
    }
    generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
    const linksToTags = document.querySelectorAll('.list li a');
    for (let linkToTag of linksToTags) {
        linkToTag.addEventListener('click', tagClickHandler)
    }
}

addClickListenersToTags();

function calculateAuthorParams(authors) {
    const params = {
        max: 0,
        min: 999999
    }
    for (let author in authors) {
        if (authors[author] > params.max) {
            params.max = authors[author];
        }
        if (authors[author] < params.min) {
            params.min = authors[author];
        }
    }
    console.log(params);

    return params;
}

function generateAuthors() {
    let allAuthors = {};
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
        const authorWrapper = article.querySelector(optArticleAuthorSelector);
        const articleAuthor = article.getAttribute('data-author');
        const articleAuthorDashRemoved = articleAuthor.replace("-", " ");
        const authorHTML = `by ${articleAuthor}`;
        // authorWrapper.innerHTML = `<a href="#${articleAuthor}"><span>${authorHTML}</span></a>`;
        const linkHTMLData = {
            id: articleAuthor,
            title: authorHTML
        };
        const linkHTML = templates.articleLink(linkHTMLData);
        authorWrapper.innerHTML = linkHTML;
        // console.log(authorWrapper);
        // console.log(articleAuthor);

        /* [NEW] check if this link is NOT already in allAuthors */
        if (!allAuthors[articleAuthor]) { // jeśli allAuthors NIE MA klucza articleAuthor
            allAuthors[articleAuthor] = 1;
        } else {
            allAuthors[articleAuthor]++;
        }
        // console.log(allAuthors[articleAuthor]);
        const authorList = document.querySelector(optAuthorListSelector);
        const authorParams = calculateAuthorParams(allAuthors);
        let allAuthorHTML = '';
        const allAuthorsData = {
            authors: []
        };
        for (let author in allAuthors) {
            const authorLinkHTML = `<li><a href="#tag-${author}" class="${calculateTagClass(allAuthors[author], authorParams)}">${author}</a></li>`;
            allAuthorHTML += authorLinkHTML;
            allAuthorsData.authors.push({
                author: author,
                count: allAuthors[author],
                className: calculateTagClass(allAuthors[author], authorParams)
            });
        }
        // authorList.innerHTML = allAuthorHTML;
        // authorList.innerHTML = templates.authourCloudLink(allAuthorsData);
        // console.log(authorList.innerHTML);
    }
}

generateAuthors();

function authorClickHandler(e) {
    e.preventDefault();
    const articleAuthortag = this.firstChild.getAttribute('href')
    const articleAuthor = articleAuthortag.replace("#", "");
    // console.log(articleAuthortag);
    generateTitleLinks('[data-author="' + articleAuthor + '"]');
}

function addClickListenersToAuthors() {
    const linksToAuthors = document.querySelectorAll('.post .post-author');
    for (let linkToAuthor of linksToAuthors) {
        linkToAuthor.addEventListener('click', authorClickHandler)
    }
}

addClickListenersToAuthors();